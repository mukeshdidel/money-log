package com.mukesh.moneyLogBackend.Repository;

import com.mukesh.moneyLogBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByActivationToken(String activationToken);
    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);
}
