package com.garba.partner.repository;

import com.garba.partner.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByCollegeIdentity(String collegeIdentity);
}
