package com.garba.partner.domain;

import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@Document(collection = "reports")
public class Report {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String reporterUserId;
    private String targetUserId;
    
    private String reason;
    private String description;
    private String status;

    @CreatedDate
    private Instant createdAt;
    
    private Instant resolvedAt;
    private String resolvedBy;
}
