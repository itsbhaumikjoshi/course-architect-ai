package com.course_architect_ai.server.services;

import com.course_architect_ai.server.config.Constants;
import com.course_architect_ai.server.config.GoogleOAuthConfig;
import com.course_architect_ai.server.dtos.JWTPayload;
import com.course_architect_ai.server.dtos.auth.AuthResponse;
import com.course_architect_ai.server.entities.User;
import com.course_architect_ai.server.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;

@Service
public class GoogleOAuthService {

    private final GoogleOAuthConfig googleOAuthConfig;
    private final SecureRandom secureRandom;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final WebClient webClient;

    public GoogleOAuthService(
            GoogleOAuthConfig googleOAuthConfig,
            WebClient webClient
    ) {
        this.googleOAuthConfig = googleOAuthConfig;
        this.webClient = webClient;
        secureRandom = new SecureRandom();
    }

    public AuthResponse callback(String code) {
        Map<String, Object> tokenResponse = webClient.post()
                .uri("https://oauth2.googleapis.com/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .bodyValue(
                        "code=" + code +
                                "&client_id=" + googleOAuthConfig.getClientId() +
                                "&client_secret=" + googleOAuthConfig.getClientSecret() +
                                "&redirect_uri=" + googleOAuthConfig.getReidretUri() +
                                "&grant_type=authorization_code"
                )
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        String accessToken = (String) tokenResponse.get("access_token");

        Map<String, Object> userInfo = webClient.get()
                .uri("https://www.googleapis.com/oauth2/v2/userinfo")
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        String email = (String) userInfo.get("email");
        String firstName = (String) userInfo.get("given_name");
        String lastName = (String) userInfo.get("family_name");
        byte[] bytes = new byte[32];
        String password = Base64.getEncoder().withoutPadding().encodeToString(bytes);
        User user = userRepo.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User(
                            firstName != null ? firstName : "Google",
                            lastName != null ? lastName : "User",
                            email,
                            password
                    );
                    return userRepo.save(newUser);
                });
        String token = jwtService.create(new JWTPayload(user.getEmail(), user.getId()));
        return new AuthResponse(token);
    }

}
