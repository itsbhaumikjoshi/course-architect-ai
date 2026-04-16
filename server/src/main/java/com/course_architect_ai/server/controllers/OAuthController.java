package com.course_architect_ai.server.controllers;

import com.course_architect_ai.server.dtos.auth.AuthResponse;
import com.course_architect_ai.server.services.GoogleOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/callback")
public class OAuthController {

    @Autowired
    private GoogleOAuthService googleOAuthService;

    @GetMapping("/google")
    public ResponseEntity<AuthResponse> callback(@RequestParam("code") String code) {
        return ResponseEntity.status(200).body(googleOAuthService.callback(code));
    }

}
