package com.garba.partner.domain;

import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@Document(collection = "decisions")
@CompoundIndex(name = "actor_target_idx", def = "{'actorUserId': 1, 'targetUserId': 1}", unique = true)
public class PartnerDecision {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String actorUserId;
    private String targetUserId;
    private DecisionState state;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    private Instant acceptedAt;
}
