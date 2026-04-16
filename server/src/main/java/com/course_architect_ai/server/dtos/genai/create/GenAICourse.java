package com.course_architect_ai.server.dtos.genai.create;

import java.util.List;

public class GenAICourse {
    private String title;
    private String description;
    private List<Chapter> chapters;

    public GenAICourse() {}

    public GenAICourse(String title, String description, List<Chapter> chapters) {
        this.title = title;
        this.description = description;
        this.chapters = chapters;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }

    @Override
    public String toString() {
        return "GenAICourse{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", chapters=" + chapters +
                '}';
    }
}