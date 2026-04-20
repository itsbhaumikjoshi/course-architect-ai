package com.course_architect_ai.server.errors;

public class MaxLimitReachedException extends RuntimeException {
    public MaxLimitReachedException(String msg) {
        super(msg);
    }
}
