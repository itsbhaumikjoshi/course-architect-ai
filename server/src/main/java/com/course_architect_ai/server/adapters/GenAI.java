package com.course_architect_ai.server.adapters;

import com.course_architect_ai.server.config.Constants;
import com.course_architect_ai.server.config.GenAIConfig;
import com.google.genai.Client;
import org.springframework.stereotype.Component;

@Component
public class GenAI {

    private Client client;

    public GenAI(GenAIConfig genAIConfig) {
        client = new Client.Builder().apiKey(genAIConfig.getKey()).build();
    }

    public String fetch(String prompt) {
        return client.models.generateContent(
                Constants.model,
                Constants.genPrompt(prompt),
                null
        ).text();
    }
}
