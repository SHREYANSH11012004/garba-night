package com.garba.partner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiscoveryProfileDTO {
    private String publicId; // The user ID, keeping it separate from DB _id if needed
    private String displayName;
    private String photoUrl;
    private int year;
    private String section;
    private String department;
    private String garbaLevel;
    private String favoriteSong;
    private String garbaStyle;
    private String bio;
    private int compatibility; // Calculated value
}
