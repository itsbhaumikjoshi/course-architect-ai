package com.course_architect_ai.server.services;

import com.course_architect_ai.server.config.Constants;
import com.course_architect_ai.server.config.YTConfig;
import com.course_architect_ai.server.errors.YTException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service    
public class YTService {

    private final WebClient webClient;

    private String API_KEY;

    private final ObjectMapper mapper;

    public YTService(WebClient.Builder webClientBuilder, YTConfig ytConfig) {
        this.webClient = webClientBuilder
                .baseUrl(Constants.YT_VIDEO_URL)
                .build();
        this.API_KEY = ytConfig.getKey();
        mapper = new ObjectMapper();
    }

    public String searchVideos(String query) throws JsonMappingException, JsonProcessingException {
        String response = webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/search")
                .queryParam("part", "snippet")
                .queryParam("q", query)
                .queryParam("type", "video")
                .queryParam("maxResults", 10)
                .queryParam("key", API_KEY)
                .build())
            .retrieve()
                .bodyToMono(String.class)
                .block();
        JsonNode json = mapper.readTree(response);

        if (json.has("error"))
            throw new YTException("YouTube API error: " + json.path("error").toString());

        JsonNode items = json.path("items");
        if (!items.isArray() || items.size() == 0)
            throw new YTException("No videos found for query: " + query);

        String videoId = json.path("items")
                .get(0)
                .path("id")
                .path("videoId")
                .asText();

        if (videoId == null || videoId.isEmpty())
            throw new YTException("Invalid videoId " + videoId + " in response");

        return Constants.YT_VIDEO_WATCH_URL + videoId;
    }

}
