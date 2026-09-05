package com.garba.partner.service;

import com.garba.partner.domain.StudentProfile;
import com.garba.partner.dto.ProfileRequest;
import com.garba.partner.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final StudentProfileRepository profileRepository;

    public StudentProfile getProfileByUserId(String userId) {
        return profileRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
    }

    public StudentProfile createOrUpdateProfile(String userId, ProfileRequest request) {
        Optional<StudentProfile> existing = profileRepository.findByUserId(userId);
        
        StudentProfile profile = existing.orElse(StudentProfile.builder().userId(userId).build());
        
        profile.setDisplayName(request.getDisplayName());
        profile.setPhotoUrl(request.getPhotoUrl());
        profile.setGender(request.getGender());
        profile.setRollNumber(request.getRollNumber());
        profile.setYear(request.getYear());
        profile.setSection(request.getSection());
        profile.setDepartment(request.getDepartment());
        profile.setGarbaLevel(request.getGarbaLevel());
        profile.setFavoriteSong(request.getFavoriteSong());
        profile.setGarbaStyle(request.getGarbaStyle());
        profile.setBio(request.getBio());
        profile.setAvailability(request.getAvailability());
        
        if (existing.isEmpty()) {
            profile.setProfileStatus("ACTIVE");
        }
        
        return profileRepository.save(profile);
    }
}
