package com.garba.partner.repository;

import com.garba.partner.domain.Match;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface MatchRepository extends MongoRepository<Match, String> {
    Optional<Match> findByPairKey(String pairKey);
    List<Match> findByUserAOrUserB(String userA, String userB);
}
