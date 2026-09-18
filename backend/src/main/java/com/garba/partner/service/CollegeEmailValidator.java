package com.garba.partner.service;

import org.springframework.stereotype.Component;

@Component
public class CollegeEmailValidator {

    public String normalizeAndValidate(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email is required.");
        }

        String normalizedEmail = email.trim().toLowerCase();
        if (!(normalizedEmail.endsWith("@jssaten.ac.in")
                || normalizedEmail.endsWith("@jssuninoida.edu.in"))) {
            throw new IllegalArgumentException(
                    "Only JSSATEN (@jssaten.ac.in) and JSSUNINOIDA (@jssuninoida.edu.in) email domains are allowed.");
        }
        return normalizedEmail;
    }
}