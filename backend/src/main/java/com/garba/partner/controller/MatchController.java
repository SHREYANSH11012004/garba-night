package com.garba.partner.controller;

import com.garba.partner.domain.Match;
import com.garba.partner.domain.StudentProfile;
import com.garba.partner.repository.MatchRepository;
import com.garba.partner.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/matches")
@RequiredArgsConstructor
public class MatchController {

    private final MatchRepository matchRepository;
    private final StudentProfileRepository profileRepository;

    @GetMapping
    public ResponseEntity<?> getMatches() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Map<String, Object>> matches = matchRepository.findByUserAOrUserB(userId, userId).stream()
                .map(match -> toMatchResponse(match, userId))
                .flatMap(java.util.Optional::stream)
                .toList();
        return ResponseEntity.ok(Map.of("status", "success", "data", matches));
    }

    private java.util.Optional<Map<String, Object>> toMatchResponse(Match match, String userId) {
        String partnerId = userId.equals(match.getUserA()) ? match.getUserB() : match.getUserA();
        return profileRepository.findByUserId(partnerId).map(profile -> {
            Map<String, Object> response = new HashMap<>();
            response.put("id", match.getId());
            response.put("displayName", profile.getDisplayName());
            response.put("department", profile.getDepartment());
            response.put("photoUrl", profile.getPhotoUrl());
            response.put("status", match.getStatus().name());
            return response;
        });
    }
}