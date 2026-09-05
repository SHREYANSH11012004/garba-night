package com.garba.partner.repository;

import com.garba.partner.domain.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface StudentProfileRepository extends MongoRepository<StudentProfile, String> {
    Optional<StudentProfile> findByUserId(String userId);
}
