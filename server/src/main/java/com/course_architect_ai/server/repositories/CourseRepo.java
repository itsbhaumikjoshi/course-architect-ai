package com.course_architect_ai.server.repositories;

import com.course_architect_ai.server.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CourseRepo extends JpaRepository<Course, UUID> {
    Optional<Course> findByIdAndUserId(final UUID id, final UUID userId);

    void deleteByIdAndUserId(final UUID id, final UUID userId);

    Course[] findByUserId(final UUID userId);
}
