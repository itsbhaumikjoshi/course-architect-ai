package com.course_architect_ai.server.controllers;

import com.course_architect_ai.server.dtos.auth.AuthRequest;
import com.course_architect_ai.server.dtos.auth.AuthResponse;
import com.course_architect_ai.server.dtos.auth.RegisterRequest;
import com.course_architect_ai.server.services.AuthService;
import com.google.common.net.HttpHeaders;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Value("${jwt.expires.in}")
    private long expiresInMin;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        AuthResponse authResponse = authService.login(authRequest);
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

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        AuthResponse authResponse = authService.register(registerRequest);
        ResponseCookie responseCookie = ResponseCookie.from("sid", authResponse.getToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(expiresInMin * 60)
                .sameSite("Strict")
                .build();
        return ResponseEntity
                .status(201)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(authResponse);
    }
}
