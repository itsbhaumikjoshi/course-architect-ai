package com.course_architect_ai.server.dtos.genai.create;

import java.util.List;

public class Chapter {
    private String title;
    private String description;
    private List<Segment> segments;
    private List<Quiz> quiz;

    public Chapter() {}

    public Chapter(String title, String description, List<Segment> segments, List<Quiz> quiz) {
        this.title = title;
        this.description = description;
        this.segments = segments;
        this.quiz = quiz;
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

    public List<Segment> getSegments() {
        return segments;
    }

    public void setSegments(List<Segment> segments) {
        this.segments = segments;
    }

    public List<Quiz> getQuiz() {
        return quiz;
    }

    public void setQuiz(List<Quiz> quiz) {
        this.quiz = quiz;
    }

    @Override
    public String toString() {
        return "Chapter{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", segments=" + segments +
                ", quiz=" + quiz +
                '}';
    }
}
