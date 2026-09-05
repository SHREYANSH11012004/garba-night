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
@Document(collection = "audit_events")
public class AuditEvent {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String actorUserId;
    private String action;
    private String targetType;
    private String targetId;
    private String requestId;
    private String result;

    @CreatedDate
    private Instant createdAt;
}
