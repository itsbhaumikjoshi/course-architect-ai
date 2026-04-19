package com.course_architect_ai.server.services;

import com.course_architect_ai.server.dtos.JWTPayload;
import com.course_architect_ai.server.dtos.auth.AuthRequest;
import com.course_architect_ai.server.dtos.auth.AuthResponse;
import com.course_architect_ai.server.dtos.auth.RegisterRequest;
import com.course_architect_ai.server.entities.User;
import com.course_architect_ai.server.errors.NotFoundException;
import com.course_architect_ai.server.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional(readOnly = true)
    public AuthResponse login(AuthRequest authRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
        ));

        User user = userRepo.findByEmail(authRequest.getEmail()).orElseThrow(() -> new NotFoundException("User with email: " + authRequest.getEmail() + " does not exists."));
        String token = issueJWTToken(user);

        return new AuthResponse(token);
    }

    @Transactional
    public AuthResponse register(final RegisterRequest registerRequest) {
        if (userRepo.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword())
        );

        User savedUser = userRepo.save(user);
        String token = issueJWTToken(savedUser);

        return new AuthResponse(token);
    }

    private String issueJWTToken(User user) {
        JWTPayload jwtPayload = new JWTPayload(
                user.getEmail(),
                user.getId()
        );
        return jwtService.create(jwtPayload);
    }

}
