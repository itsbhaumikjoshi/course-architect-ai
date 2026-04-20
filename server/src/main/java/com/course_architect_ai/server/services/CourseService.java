package com.course_architect_ai.server.services;

import com.course_architect_ai.server.adapters.GenAI;
import com.course_architect_ai.server.config.Constants;
import com.course_architect_ai.server.config.GenAIConfig;
import com.course_architect_ai.server.dtos.CourseCreateRequest;
import com.course_architect_ai.server.dtos.genai.create.GenAICourse;
import com.course_architect_ai.server.entities.Content;
import com.course_architect_ai.server.entities.Course;
import com.course_architect_ai.server.entities.User;
import com.course_architect_ai.server.errors.MaxLimitReachedException;
import com.course_architect_ai.server.errors.NotFoundException;
import com.course_architect_ai.server.repositories.CourseRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepo;
    @Autowired
    private ContentService contentService;

    private GenAI genAI;
    private final ObjectMapper mapper;

    public CourseService(GenAIConfig genAIConfig, WebClient webClient) {
        mapper = new ObjectMapper();
        this.genAI = new GenAI(genAIConfig);
    }

    @Transactional
    public Course create(final CourseCreateRequest courseCreateRequest, final User user) throws JsonProcessingException, JsonMappingException {
        int totalCourses = courseRepo.countByUserId(user.getId());
        if(totalCourses >= 5) {
            throw new MaxLimitReachedException("One user can have at most 5 courses");
        }
        String response = genAI.fetch(
                Constants.getCourseCreationPrompt(
                        courseCreateRequest.getPrompt()
                )
        );
        GenAICourse genAICourse = mapper.readValue(response, GenAICourse.class);
        Course course = new Course();
        course.setTitle(genAICourse.getTitle());
        course.setDescription(genAICourse.getDescription());
        course.setUser(user);
        courseRepo.save(course);
        course.setUserId(user.getId());
        // create content for the course
        for(int i = 0, n = genAICourse.getChapters().size(); i < n; i++) {
            Content content = new Content();
            content.setUser(user);
            content.setCourse(course);
            content.setId(course.getId().toString() + '#' + i);
            String text = mapper.writeValueAsString(genAICourse.getChapters().get(i));
            content.setText(text);
            contentService.create(content);
        }
        return course;
    }

    public Course find(final UUID id, final UUID userId) {
        return courseRepo.findByIdAndUserId(id, userId).orElseThrow(() -> new NotFoundException("Course not found with " + id + " for " + userId + " does not exists"));
    }

    public Course[] findAllForUser(final UUID userId) {
        return courseRepo.findByUserId(userId);
    }

    public Course updateTitle(final UUID id, final UUID userId, final String title) {
        Course course = find(id, userId);
        course.setTitle(title);
        courseRepo.save(course);
        return course;
    }

    @Transactional
    public void remove(final UUID id, final UUID userId) {
        Course course = find(id, userId);
        contentService.deleteAllWithCourseId(course.getId());
        courseRepo.deleteByIdAndUserId(id, userId);
    }
}
