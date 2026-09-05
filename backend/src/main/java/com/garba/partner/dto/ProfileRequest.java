package com.garba.partner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequest {
    @NotBlank(message = "Name is required")
    private String displayName;
    
    private String photoUrl;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotBlank(message = "Roll number is required")
    private String rollNumber;
    
    @Min(1)
    @Max(5)
    private int year;
    
    private String section;
    
    @NotBlank(message = "Department is required")
    private String department;
    
    private String garbaLevel;
    private String favoriteSong;
    private String garbaStyle;
    private String bio;
    private String availability;
}
