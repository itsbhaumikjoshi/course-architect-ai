package com.course_architect_ai.server.adapters;

import com.course_architect_ai.server.config.Constants;
import com.course_architect_ai.server.config.GenAIConfig;
import com.course_architect_ai.server.errors.GenAIException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Component
public class GenAI {

    private final WebClient webClient;
    private final ObjectMapper mapper;

    public GenAI(GenAIConfig genAIConfig) {
        mapper = new ObjectMapper();
        this.webClient = WebClient
                .builder()
                .baseUrl(Constants.GEN_AI_URL)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Authorization", "Bearer " + genAIConfig.getKey())
                .build();
    }

    public String fetch(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", Constants.MODEL,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );
        return webClient
                .post()
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(
                        status -> !status.is2xxSuccessful(),
                        response -> response.bodyToMono(String.class)
                                .map(error -> new GenAIException(
                                        "Groq API error: " + response.statusCode() + ": " + error
                                ))
                )
                .bodyToMono(String.class)
                .map(this::extractText)
                .block();
    }

    private String extractText(String json) {
        try {
            String text = mapper.readTree(json)
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            if (text == null || text.isBlank()) {
                throw new RuntimeException("Empty content in OpenAI response: " + json);
            }

            return text;
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse OpenAI response: " + e.getMessage(), e);
        }
    }
}
