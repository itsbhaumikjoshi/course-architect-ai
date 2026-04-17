package com.course_architect_ai.server.dtos.genai.create;

import java.util.List;

public class SerializeChapter {

    private List<Segment> segments;
    private List<Quiz> quiz;

    private SerializeChapter() {};

    public SerializeChapter(List<Segment> segments, List<Quiz> quiz) {
        this.segments = segments;
        this.quiz = quiz;
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
        return "SerializeChapter{" +
                "segments=" + segments +
                ", quiz=" + quiz +
                '}';
    }
}
