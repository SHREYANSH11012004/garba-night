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
@Document(collection = "blocks")
public class Block {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String blockerUserId;
    private String blockedUserId;

    @CreatedDate
    private Instant createdAt;
}
