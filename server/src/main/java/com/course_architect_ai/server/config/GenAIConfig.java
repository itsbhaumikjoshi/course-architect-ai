package com.course_architect_ai.server.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "gen.ai.api")
public class GenAIConfig {

    private String key;

    public GenAIConfig() {}

    public GenAIConfig(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
