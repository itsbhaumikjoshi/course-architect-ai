package com.course_architect_ai.server.services;

import com.course_architect_ai.server.adapters.GenAI;
import com.course_architect_ai.server.config.GenAIConfig;
import com.course_architect_ai.server.dtos.CourseCreateRequest;
import com.course_architect_ai.server.dtos.genai.create.GenAICourse;
import com.course_architect_ai.server.entities.Content;
import com.course_architect_ai.server.entities.Course;
import com.course_architect_ai.server.entities.User;
import com.course_architect_ai.server.errors.NotFoundException;
import com.course_architect_ai.server.repositories.CourseRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepo;
    @Autowired
    private ContentService contentService;

    private GenAI genAI;
    private final ObjectMapper mapper;

    public CourseService(GenAIConfig genAIConfig) {
        genAI = new GenAI(genAIConfig);
        mapper = new ObjectMapper();
    }

    @Transactional
    public Course create(final CourseCreateRequest courseCreateRequest, final User user) throws JsonProcessingException, JsonMappingException {
        String response = genAI.fetch(courseCreateRequest.getPrompt());
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

    public void remove(final UUID id, final UUID userId) {
        courseRepo.deleteByIdAndUserId(id, userId);
    }
}
