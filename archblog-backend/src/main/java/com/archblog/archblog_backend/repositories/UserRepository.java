package com.archblog.archblog_backend.repositories;

import com.archblog.archblog_backend.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // To find user by email (for login and token validation)
    Optional<UserEntity> findByEmail(String email);
}
