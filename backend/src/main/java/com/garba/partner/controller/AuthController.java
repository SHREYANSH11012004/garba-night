package com.garba.partner.controller;

import com.garba.partner.dto.AuthRequest;
import com.garba.partner.dto.AuthResponse;
import com.garba.partner.dto.RegisterRequest;
import com.garba.partner.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(Map.of("status", "success", "data", response));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(Map.of("status", "success", "data", response));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(401).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
