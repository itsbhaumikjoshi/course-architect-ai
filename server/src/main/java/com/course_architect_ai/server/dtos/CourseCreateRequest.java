package com.course_architect_ai.server.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CourseCreateRequest {

    @NotNull
    @NotBlank
    @Size(min = 10, max = 150)
    private String prompt;

    public CourseCreateRequest() {}

    public CourseCreateRequest(String prompt) {
        this.prompt = prompt;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    @Override
    public String toString() {
        return "CourseCreateRequest{" +
                "prompt='" + prompt + '\'' +
                '}';
    }
}
