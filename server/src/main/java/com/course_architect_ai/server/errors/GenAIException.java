package com.course_architect_ai.server.errors;

public class GenAIException extends RuntimeException {
    public GenAIException(String msg) {
        super(msg);
    }
}
