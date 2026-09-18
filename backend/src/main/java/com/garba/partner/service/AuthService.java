package com.garba.partner.service;

import com.garba.partner.domain.Role;
import com.garba.partner.domain.User;
import com.garba.partner.domain.UserStatus;
import com.garba.partner.dto.AuthRequest;
import com.garba.partner.dto.AuthResponse;
import com.garba.partner.dto.RegisterRequest;
import com.garba.partner.repository.UserRepository;
import com.garba.partner.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CollegeEmailValidator collegeEmailValidator;
    private final EmailVerificationService emailVerificationService;

    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = collegeEmailValidator.normalizeAndValidate(request.getEmail());

        Optional<User> existingUser = userRepository.findByEmail(normalizedEmail);
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Email already in use.");
        }

        emailVerificationService.consumeVerification(normalizedEmail, request.getVerificationToken());

        User user = User.builder()
                .collegeIdentity(request.getCollegeIdentity())
                .email(normalizedEmail)
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .status(UserStatus.ACTIVE) // For now assume active
                .build();

        user = userRepository.save(user);
        String jwtToken = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new IllegalStateException("Account is not active.");
        }

        String jwtToken = jwtService.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .build();
    }
}
