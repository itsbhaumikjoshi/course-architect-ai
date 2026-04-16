package com.course_architect_ai.server.services;

import com.course_architect_ai.server.entities.Content;
import com.course_architect_ai.server.repositories.ContentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ContentService {

    @Autowired
    private ContentRepo contentRepo;

    /*
        The string ID is constructed as `course_id + '#' + Long.toString(seq_content_id)`.
        The reason for this is that each course will have multiple contents,
        and for each course, the contents shall be sorted (1, 2, 3, ...).
     */
    public Content find(final String id, final UUID userId) {
        return contentRepo.findByIdAndUserId(id, userId).orElseThrow();
    }

    public void create(final Content content) {
        contentRepo.save(content);
    }
}
