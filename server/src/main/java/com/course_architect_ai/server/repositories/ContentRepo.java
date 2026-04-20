package com.course_architect_ai.server.repositories;

import com.course_architect_ai.server.entities.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ContentRepo extends JpaRepository<Content, String> {
    Optional<Content> findByIdAndUserId(final String id, final UUID userId);

    int countByCourseId(final UUID courseId);
}
