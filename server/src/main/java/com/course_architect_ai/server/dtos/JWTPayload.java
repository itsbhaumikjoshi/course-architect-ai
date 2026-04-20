package com.course_architect_ai.server.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class JWTPayload {

    @Email
    @NotNull
    private String email;

    @NotNull
    private UUID id;

    public JWTPayload() {}

    public JWTPayload(@NotNull String email, @NotNull UUID id) {
        this.email = email;
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "JWTPayload{" +
                "email='" + email + '\'' +
                ", id=" + id +
                '}';
    }
}
