package com.course_architect_ai.server.repositories;

import com.course_architect_ai.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepo extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(final String email);

    boolean existsByEmail(final String email);
}
