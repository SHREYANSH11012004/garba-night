package com.garba.partner.controller;

import com.garba.partner.dto.DiscoveryProfileDTO;
import com.garba.partner.service.DiscoveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/discovery")
@RequiredArgsConstructor
public class DiscoveryController {

    private final DiscoveryService discoveryService;

    // TODO: Extract from SecurityContext
    private String getCurrentUserId() {
        // Extract authenticated user's email (used as userId) from SecurityContext
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        throw new IllegalStateException("User not authenticated");
    }

    @GetMapping("/profiles")
    public ResponseEntity<?> getDiscoveryProfiles() {
        List<DiscoveryProfileDTO> profiles = discoveryService.getEligibleProfiles(getCurrentUserId());
        return ResponseEntity.ok(Map.of("status", "success", "data", profiles));
    }
}
