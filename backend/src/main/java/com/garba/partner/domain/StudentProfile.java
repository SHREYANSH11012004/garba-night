package com.garba.partner.domain;

import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@Document(collection = "student_profiles")
public class StudentProfile {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    @Indexed(unique = true)
    private String userId;

    private String displayName;
    private String photoUrl;
    private String gender;
    private String rollNumber;
    private int year;
    private String section;
    private String department;
    
    private String garbaLevel;
    private String favoriteSong;
    private String garbaStyle;
    private String bio;
    private String availability;
    
    private String profileStatus;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
