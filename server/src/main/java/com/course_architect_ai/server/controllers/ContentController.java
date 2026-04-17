package com.course_architect_ai.server.controllers;

import com.course_architect_ai.server.entities.Content;
import com.course_architect_ai.server.security.UserInfo;
import com.course_architect_ai.server.services.ContentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/courses")
public class ContentController {

    @Autowired
    private ContentService contentService;

    /*
        The string ID is constructed as `courseId + '#' + contentId`.
        The reason for this is that each course will have multiple contents,
        and for each course, the contents shall be sorted (1, 2, 3, ...).
     */
    @GetMapping("{courseId}/contents/{contentId}")
    public ResponseEntity<Content> find(@AuthenticationPrincipal UserInfo userInfo, @PathVariable String courseId, @PathVariable String contentId) {
        return ResponseEntity.status(200).body(
                contentService.find(courseId + '#' + contentId, userInfo.getId())
        );
    }

    @PutMapping("{courseId}/contents/{contentId}")
    public ResponseEntity<Content> enhance(@AuthenticationPrincipal UserInfo userInfo, @PathVariable String courseId, @PathVariable String contentId) throws JsonMappingException, JsonProcessingException {
        return ResponseEntity.status(200).body(
                contentService.enhance(courseId + '#' + contentId, userInfo.getId())
        );
    }

}
