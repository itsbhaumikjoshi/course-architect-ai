package com.course_architect_ai.server.controllers;

import com.course_architect_ai.server.dtos.CourseCreateRequest;
import com.course_architect_ai.server.dtos.CourseUpdateTitleRequest;
import com.course_architect_ai.server.entities.Course;
import com.course_architect_ai.server.security.UserInfo;
import com.course_architect_ai.server.services.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/{id}")
    public ResponseEntity<Course> find(@AuthenticationPrincipal UserInfo userInfo, @Valid @PathVariable UUID id) {
        return ResponseEntity.status(200).body(courseService.find(id, userInfo.getId()));
    }

    @GetMapping("/")
    public ResponseEntity<Course[]> findAllForUser(@AuthenticationPrincipal UserInfo userInfo) {
        return ResponseEntity.status(200).body(
                courseService.findAllForUser(userInfo.getId())
        );
    }

    @PostMapping()
    public ResponseEntity<Course> create(@AuthenticationPrincipal UserInfo userInfo, @Valid @RequestBody CourseCreateRequest courseCreateRequest) throws Exception {
        return ResponseEntity.status(201).body(
                courseService.create(
                        courseCreateRequest,
                        userInfo.to()
                )
        );
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<Course> updateTitle(
            @AuthenticationPrincipal UserInfo userInfo,
            @Valid @PathVariable UUID courseId,
            @RequestBody CourseUpdateTitleRequest courseUpdateTitleRequest
    ) {
        return ResponseEntity.status(200).body(
                courseService.updateTitle(
                        courseId,
                        userInfo.getId(),
                        courseUpdateTitleRequest.getTitle()
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@AuthenticationPrincipal UserInfo userInfo, @Valid @PathVariable UUID id) {
        courseService.remove(id, userInfo.getId());
        return ResponseEntity.noContent().build();
    }
}
