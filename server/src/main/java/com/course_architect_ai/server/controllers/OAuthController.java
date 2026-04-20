package com.course_architect_ai.server.controllers;

import com.course_architect_ai.server.dtos.auth.AuthResponse;
import com.course_architect_ai.server.services.GoogleOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/callback")
public class OAuthController {

    @Autowired
    private GoogleOAuthService googleOAuthService;

    @Value("${app.cors.allowed-origin}")
    private String frontEndUrl;

    @Value("${jwt.expires.in}")
    private long expiresInMin;

    @GetMapping("/google")
    public ResponseEntity<Void> callback(@RequestParam("code") String code) {
        AuthResponse authResponse = googleOAuthService.callback(code);
        ResponseCookie responseCookie = ResponseCookie.from("sid", authResponse.getToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(expiresInMin * 60)
                .sameSite("None")
                .build();
        return ResponseEntity
                .status(302)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .location(URI.create(frontEndUrl + "/courses"))
                .build();
    }

}
