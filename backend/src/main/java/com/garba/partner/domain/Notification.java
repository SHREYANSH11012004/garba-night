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
@Document(collection = "notifications")
public class Notification {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String userId;
    private String type;
    private String title;
    private String body;
    private boolean read;

    @CreatedDate
    private Instant createdAt;
}
