package com.course_architect_ai.server.services;

import com.course_architect_ai.server.adapters.GenAI;
import com.course_architect_ai.server.config.Constants;
import com.course_architect_ai.server.config.GenAIConfig;
import com.course_architect_ai.server.dtos.genai.create.Chapter;
import com.course_architect_ai.server.dtos.genai.create.SerializeChapter;
import com.course_architect_ai.server.entities.Content;
import com.course_architect_ai.server.errors.EnhanceException;
import com.course_architect_ai.server.errors.NotFoundException;
import com.course_architect_ai.server.repositories.ContentRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ContentService {

    @Autowired
    private ContentRepo contentRepo;

    private final GenAI genAI;

    private ObjectMapper mapper;

    public ContentService(GenAIConfig genAIConfig) {
        genAI = new GenAI(genAIConfig);
        mapper = new ObjectMapper();
    }

    /*
        The string ID is constructed as `course_id + '#' + Long.toString(seq_content_id)`.
        The reason for this is that each course will have multiple contents,
        and for each course, the contents shall be sorted (1, 2, 3, ...).
     */
    public Content find(final String id, final UUID userId) {
        return contentRepo.findByIdAndUserId(id, userId).orElseThrow(() -> new NotFoundException("Content with id: " + id + " for " + userId + " does not exists"));
    }

    public Content enhance(final String id, final UUID userId) throws JsonMappingException, JsonProcessingException {
        Content content = find(id, userId);
        if(content.getCourse().isEnhanced()) {
            throw new EnhanceException("Any content from the course is already enhanced. This is a side project, so you cannot enhance any more of the course content.");
        }
        String prompt = Constants.getCourseEnhancementPrompt(
                content.getText()
        );
        String response = genAI.fetch(prompt);
        Chapter chapter = mapper.readValue(response, Chapter.class);
        SerializeChapter serializeChapter = new SerializeChapter(chapter.getSegments(), chapter.getQuiz());
        String text = mapper.writeValueAsString(serializeChapter);
        content.setText(text);
        contentRepo.save(content);
        return content;
    }

    public void create(final Content content) {
        contentRepo.save(content);
    }
}
