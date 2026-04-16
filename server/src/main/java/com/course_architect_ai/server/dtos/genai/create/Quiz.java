package com.course_architect_ai.server.dtos.genai.create;

import java.util.List;

public class Quiz {
    private String question;
    private List<String> options;
    private int correct_option_idx;

    public Quiz() {}

    public Quiz(String question, List<String> options, int correct_option_idx) {
        this.question = question;
        this.options = options;
        this.correct_option_idx = correct_option_idx;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrect_option_idx() {
        return correct_option_idx;
    }

    public void setCorrect_option_idx(int correct_option_idx) {
        this.correct_option_idx = correct_option_idx;
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "question='" + question + '\'' +
                ", options=" + options +
                ", correct_option_idx=" + correct_option_idx +
                '}';
    }
}
