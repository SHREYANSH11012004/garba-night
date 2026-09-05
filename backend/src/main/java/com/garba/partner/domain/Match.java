package com.garba.partner.domain;

import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@Document(collection = "matches")
public class Match {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    @Indexed(unique = true)
    private String pairKey;

    private String userA;
    private String userB;

    private MatchStatus status;

    @CreatedDate
    private Instant createdAt;
}
