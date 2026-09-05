package com.garba.partner.repository;

import com.garba.partner.domain.PartnerDecision;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface PartnerDecisionRepository extends MongoRepository<PartnerDecision, String> {
    Optional<PartnerDecision> findByActorUserIdAndTargetUserId(String actorUserId, String targetUserId);
    List<PartnerDecision> findByActorUserId(String actorUserId);
    List<PartnerDecision> findByTargetUserId(String targetUserId);
}
