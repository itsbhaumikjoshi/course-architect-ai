package com.course_architect_ai.server.repositories;

import com.course_architect_ai.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface UserRepo extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(final String email);

    boolean existsByEmail(final String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.email <> 'dev@test.com' AND u.createdAt < :cutoff")
    int deleteYesterdayUsers(@Param("cutoff") LocalDateTime cutoff);
}
