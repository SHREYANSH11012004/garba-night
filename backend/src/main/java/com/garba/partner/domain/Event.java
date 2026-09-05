package com.garba.partner.domain;

import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;
import java.util.Map;

@Data
@Builder
@Document(collection = "events")
public class Event {
    @Id
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String name;
    private String venue;
    
    private Instant startsAt;
    private Instant registrationClosesAt;
    
    private String status;
    private Map<String, Object> settings;
}
