package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepo extends JpaRepository<Profile, Integer> {
    Optional<Profile> findByEmail(String email);
    Optional<Profile> findByActivationToken(String activationToken);
}
