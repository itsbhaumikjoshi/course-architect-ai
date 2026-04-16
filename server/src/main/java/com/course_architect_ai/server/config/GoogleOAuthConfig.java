package com.course_architect_ai.server.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.Name;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "google.oauth")
public class GoogleOAuthConfig {

    @Name("client.secret")
    private String clientSecret;

    @Name("client.id")
    private String clientId;

    @Name("redirect.uri")
    private String reidretUri;

    public GoogleOAuthConfig() {}

    public GoogleOAuthConfig(String clientSecret, String clientId, String redirectUri) {
        this.clientSecret = clientSecret;
        this.clientId = clientId;
        this.reidretUri = redirectUri;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getReidretUri() {
        return reidretUri;
    }

    public void setReidretUri(String reidretUri) {
        this.reidretUri = reidretUri;
    }
}
