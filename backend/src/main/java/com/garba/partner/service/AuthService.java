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

    public AuthResponse register(RegisterRequest request) {
        // Simple verification that it's a college email
        if (!(request.getEmail().endsWith("@jssaten.ac.in") || request.getEmail().endsWith("@jssuninoida.edu.in"))) {
            throw new IllegalArgumentException("Only JSSATEN (@jssaten.ac.in) and JSSUNINOIDA (@jssuninoida.edu.in) email domains are allowed.");
        }

        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalStateException("Email already in use.");
        }

        User user = User.builder()
                .collegeIdentity(request.getCollegeIdentity())
                .email(request.getEmail())
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
