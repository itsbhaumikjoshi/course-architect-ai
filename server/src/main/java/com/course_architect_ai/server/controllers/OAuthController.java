package com.course_architect_ai.server.controllers;

import com.course_architect_ai.server.dtos.auth.AuthResponse;
import com.course_architect_ai.server.services.GoogleOAuthService;
import com.google.common.net.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/callback")
public class OAuthController {

    @Autowired
    private GoogleOAuthService googleOAuthService;

    @Value("${jwt.expires.in}")
    private long expiresInMin;

    @GetMapping("/google")
    public ResponseEntity<AuthResponse> callback(@RequestParam("code") String code) {
        AuthResponse authResponse = googleOAuthService.callback(code);
        ResponseCookie responseCookie = ResponseCookie.from("sid", authResponse.getToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(expiresInMin * 60)
                .sameSite("Strict")
                .build();
        return ResponseEntity
                .status(200)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(authResponse);
    }

}
