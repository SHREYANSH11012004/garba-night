package com.garba.partner.service;

import com.garba.partner.domain.DecisionState;
import com.garba.partner.domain.PartnerDecision;
import com.garba.partner.domain.Match;
import com.garba.partner.domain.MatchStatus;
import com.garba.partner.repository.PartnerDecisionRepository;
import com.garba.partner.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DecisionService {

    private final PartnerDecisionRepository decisionRepository;
    private final MatchRepository matchRepository;

    @Transactional
    public PartnerDecision recordDecision(String actorId, String targetId, DecisionState newState) {
        if (actorId.equals(targetId)) {
            throw new IllegalArgumentException("Cannot make a decision on yourself.");
        }

        PartnerDecision decision = decisionRepository.findByActorUserIdAndTargetUserId(actorId, targetId)
                .orElse(PartnerDecision.builder()
                        .actorUserId(actorId)
                        .targetUserId(targetId)
                        .state(DecisionState.NONE)
                        .build());

        // Business rule: ACCEPTED is irreversible
        if (decision.getState() == DecisionState.ACCEPTED && newState != DecisionState.ACCEPTED) {
            throw new IllegalStateException("An ACCEPTED decision cannot be changed.");
        }
        
        // Prevent WAITING -> WAITING logic bypass or simple updates without changes
        if (decision.getState() == newState) {
            return decision; // Idempotent
        }

        decision.setState(newState);
        if (newState == DecisionState.ACCEPTED) {
            decision.setAcceptedAt(Instant.now());
        }

        decision = decisionRepository.save(decision);

        // Check for mutual match if ACCEPTED
        if (newState == DecisionState.ACCEPTED) {
            Optional<PartnerDecision> reverseDecision = decisionRepository.findByActorUserIdAndTargetUserId(targetId, actorId);
            if (reverseDecision.isPresent() && reverseDecision.get().getState() == DecisionState.ACCEPTED) {
                createMutualMatch(actorId, targetId);
            }
        }

        return decision;
    }

    private void createMutualMatch(String userA, String userB) {
        String pairKey = userA.compareTo(userB) < 0 ? userA + ":" + userB : userB + ":" + userA;
        
        Optional<Match> existingMatch = matchRepository.findByPairKey(pairKey);
        if (existingMatch.isEmpty()) {
            Match match = Match.builder()
                    .pairKey(pairKey)
                    .userA(userA)
                    .userB(userB)
                    .status(MatchStatus.ACTIVE)
                    .build();
            matchRepository.save(match);
        }
    }

    public List<PartnerDecision> getDecisions(String actorId) {
        return decisionRepository.findByActorUserId(actorId);
    }
}
