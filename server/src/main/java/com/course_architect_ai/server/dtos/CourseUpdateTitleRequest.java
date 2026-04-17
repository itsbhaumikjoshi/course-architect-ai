package com.course_architect_ai.server.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CourseUpdateTitleRequest {

    @NotNull
    @NotBlank
    private String title;

    public CourseUpdateTitleRequest() {}

    public CourseUpdateTitleRequest(@NotNull String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "CourseUpdateTitleRequest{" +
                "title='" + title + '\'' +
                '}';
    }
}
