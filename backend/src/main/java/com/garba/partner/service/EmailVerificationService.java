package com.garba.partner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.HexFormat;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private static final String OTP_PREFIX = "email-verification:otp:";
    private static final String COOLDOWN_PREFIX = "email-verification:cooldown:";
    private static final String VERIFIED_PREFIX = "email-verification:verified:";

    private final StringRedisTemplate redisTemplate;
    private final JavaMailSender mailSender;
    private final CollegeEmailValidator emailValidator;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.email-verification.otp-ttl-seconds:600}")
    private long otpTtlSeconds;

    @Value("${app.email-verification.resend-cooldown-seconds:60}")
    private long resendCooldownSeconds;

    @Value("${app.email-verification.verified-ttl-seconds:900}")
    private long verifiedTtlSeconds;

    @Value("${app.email-verification.from:}")
    private String fromAddress;

    public void sendOtp(String email) {
        String normalizedEmail = emailValidator.normalizeAndValidate(email);
        String cooldownKey = COOLDOWN_PREFIX + normalizedEmail;
        if (Boolean.TRUE.equals(redisTemplate.hasKey(cooldownKey))) {
            throw new IllegalStateException("Please wait before requesting another verification code.");
        }

        String otp = String.format("%06d", secureRandom.nextInt(1_000_000));
        redisTemplate.opsForValue().set(
                OTP_PREFIX + normalizedEmail,
                hash(otp),
                Duration.ofSeconds(otpTtlSeconds));
        redisTemplate.opsForValue().set(
                cooldownKey,
                "1",
                Duration.ofSeconds(resendCooldownSeconds));

        SimpleMailMessage message = new SimpleMailMessage();
        if (!fromAddress.isBlank()) {
            message.setFrom(fromAddress);
        }
        message.setTo(normalizedEmail);
        message.setSubject("Your Garba Partner verification code");
        message.setText("Your Garba Partner verification code is " + otp
                + ". It expires in 10 minutes. If you did not request this, ignore this email.");
        mailSender.send(message);
    }

    public String verifyOtp(String email, String otp) {
        String normalizedEmail = emailValidator.normalizeAndValidate(email);
        if (otp == null || !otp.matches("\\d{6}")) {
            throw new IllegalArgumentException("Enter the six-digit verification code.");
        }

        String storedHash = redisTemplate.opsForValue().get(OTP_PREFIX + normalizedEmail);
        if (storedHash == null || !MessageDigest.isEqual(
                storedHash.getBytes(StandardCharsets.UTF_8),
                hash(otp).getBytes(StandardCharsets.UTF_8))) {
            throw new IllegalArgumentException("Invalid or expired verification code.");
        }

        redisTemplate.delete(OTP_PREFIX + normalizedEmail);
        String verificationToken = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(
                VERIFIED_PREFIX + normalizedEmail,
                verificationToken,
                Duration.ofSeconds(verifiedTtlSeconds));
        return verificationToken;
    }

    public void consumeVerification(String email, String verificationToken) {
        String normalizedEmail = emailValidator.normalizeAndValidate(email);
        String key = VERIFIED_PREFIX + normalizedEmail;
        String storedToken = redisTemplate.opsForValue().get(key);
        if (verificationToken == null || storedToken == null
                || !MessageDigest.isEqual(
                        storedToken.getBytes(StandardCharsets.UTF_8),
                        verificationToken.getBytes(StandardCharsets.UTF_8))) {
            throw new IllegalArgumentException("Verify this email before creating an account.");
        }
        redisTemplate.delete(key);
    }

    private String hash(String value) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                    .digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (java.security.NoSuchAlgorithmException exception) {
            throw new IllegalStateException("Unable to prepare verification code.", exception);
        }
    }
}