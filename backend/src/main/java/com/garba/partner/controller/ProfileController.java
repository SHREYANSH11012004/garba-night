package com.garba.partner.controller;

import com.garba.partner.domain.StudentProfile;
import com.garba.partner.dto.ProfileRequest;
import com.garba.partner.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // TODO: Actually fetch the userId from the authenticated user token
    private String getCurrentUserId() {
        // Extract authenticated user's email (used as userId) from SecurityContext
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName(); // assuming email is set as principal name
        }
        throw new IllegalStateException("User not authenticated");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile() {
        try {
            StudentProfile profile = profileService.getProfileByUserId(getCurrentUserId());
            return ResponseEntity.ok(Map.of("status", "success", "data", profile));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createProfile(@Validated @RequestBody ProfileRequest request) {
        StudentProfile profile = profileService.createOrUpdateProfile(getCurrentUserId(), request);
        return ResponseEntity.ok(Map.of("status", "success", "data", profile));
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateProfile(@Validated @RequestBody ProfileRequest request) {
        StudentProfile profile = profileService.createOrUpdateProfile(getCurrentUserId(), request);
        return ResponseEntity.ok(Map.of("status", "success", "data", profile));
    }
}
