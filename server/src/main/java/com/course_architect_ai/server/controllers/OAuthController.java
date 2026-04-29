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
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import com.course_architect_ai.server.errors.NotFoundException;
import com.course_architect_ai.server.errors.ForbiddenException;
import com.course_architect_ai.server.errors.EnhanceException;
import io.jsonwebtoken.JwtException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import com.course_architect_ai.server.errors.MaxLimitReachedException;
import com.course_architect_ai.server.errors.GenAIException;

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
    public ResponseEntity<Void> callback(@RequestParam(value = "code", required = false) String code) {
        try {
            if (code == null || code.isEmpty()) {
                throw new IllegalArgumentException("code is required");
            }
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
        } catch (Exception e) {
            String errorMessage = e.getMessage() != null && !e.getMessage().isEmpty() ? e.getMessage() : "Something went wrong";
            String errorCode = "INTERNAL_SERVER_ERROR";

            if (e instanceof IllegalArgumentException) {
                errorCode = "BAD_REQUEST";
            } else if (e instanceof NotFoundException) {
                errorCode = "NOT_FOUND";
            } else if (e instanceof ForbiddenException) {
                errorCode = "FORBIDDEN";
            } else if (e instanceof EnhanceException) {
                errorCode = "BAD_REQUEST";
            } else if (e instanceof JwtException) {
                errorCode = "BAD_REQUEST";
            } else if (e instanceof ConstraintViolationException) {
                errorCode = "BAD_REQUEST";
            } else if (e instanceof DataIntegrityViolationException) {
                errorCode = "BAD_REQUEST";
            } else if (e instanceof MaxLimitReachedException) {
                errorCode = "TOO_MANY_REQUEST";
            } else if (e instanceof GenAIException) {
                errorCode = "GEN_AI_EXCEPTION";
            }

            String baseRedirectUrl = frontEndUrl.endsWith("/") ? frontEndUrl : frontEndUrl + "/";
            String redirectUrl = String.format("%s?error=%s&code=%s",
                    baseRedirectUrl,
                    URLEncoder.encode(errorMessage, StandardCharsets.UTF_8),
                    URLEncoder.encode(errorCode, StandardCharsets.UTF_8));

            return ResponseEntity
                    .status(302)
                    .location(URI.create(redirectUrl))
                    .build();
        }
    }

}
