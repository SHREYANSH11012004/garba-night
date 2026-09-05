package com.garba.partner.controller;

import com.garba.partner.domain.DecisionState;
import com.garba.partner.domain.PartnerDecision;
import com.garba.partner.service.DecisionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/decisions")
@RequiredArgsConstructor
public class DecisionController {

    private final DecisionService decisionService;

    private String getCurrentUserId() {
        // Extract authenticated user's email (used as userId) from SecurityContext
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        throw new IllegalStateException("User not authenticated");
    }

    @PostMapping("/{targetPublicId}/accept")
    public ResponseEntity<?> accept(@PathVariable String targetPublicId) {
        try {
            PartnerDecision decision = decisionService.recordDecision(getCurrentUserId(), targetPublicId, DecisionState.ACCEPTED);
            return ResponseEntity.ok(Map.of("status", "success", "data", decision));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @PostMapping("/{targetPublicId}/reject")
    public ResponseEntity<?> reject(@PathVariable String targetPublicId) {
        try {
            PartnerDecision decision = decisionService.recordDecision(getCurrentUserId(), targetPublicId, DecisionState.REJECTED);
            return ResponseEntity.ok(Map.of("status", "success", "data", decision));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @PostMapping("/{targetPublicId}/wait")
    public ResponseEntity<?> waitDecision(@PathVariable String targetPublicId) {
        try {
            PartnerDecision decision = decisionService.recordDecision(getCurrentUserId(), targetPublicId, DecisionState.WAITING);
            return ResponseEntity.ok(Map.of("status", "success", "data", decision));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
