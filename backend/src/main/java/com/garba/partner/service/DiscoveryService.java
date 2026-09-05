package com.garba.partner.service;

import com.garba.partner.domain.StudentProfile;
import com.garba.partner.dto.DiscoveryProfileDTO;
import com.garba.partner.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiscoveryService {

    private final StudentProfileRepository profileRepository;

    public List<DiscoveryProfileDTO> getEligibleProfiles(String currentUserId) {
        // In a real application, we would filter out profiles that the current user has already decided on,
        // blocked, or that don't match the event policy.
        
        List<StudentProfile> allProfiles = profileRepository.findAll();
        
        return allProfiles.stream()
                .filter(p -> !p.getUserId().equals(currentUserId))
                .filter(p -> "ACTIVE".equals(p.getProfileStatus()))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    private DiscoveryProfileDTO mapToDto(StudentProfile profile) {
        return DiscoveryProfileDTO.builder()
                .publicId(profile.getUserId())
                .displayName(profile.getDisplayName())
                .photoUrl(profile.getPhotoUrl())
                .year(profile.getYear())
                .section(profile.getSection())
                .department(profile.getDepartment())
                .garbaLevel(profile.getGarbaLevel())
                .favoriteSong(profile.getFavoriteSong())
                .garbaStyle(profile.getGarbaStyle())
                .bio(profile.getBio())
                // Calculate a mock compatibility score (in a real app, this would be computed)
                .compatibility((int) (Math.random() * 40 + 60)) // Random score between 60 and 100
                .build();
    }
}
