package com.course_architect_ai.server.services;

import com.course_architect_ai.server.config.JWTConfig;
import com.course_architect_ai.server.dtos.JWTPayload;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class JWTService {
    private final JWTConfig jwtConfig;

    public JWTService(JWTConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    private SecretKey signingKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtConfig.getSecret()));
    }

    public String create(JWTPayload jwtPayload) {
        Instant now = Instant.now();
        Instant expiry = now.plus(Duration.ofMinutes(jwtConfig.getExpiresIn()));

        return Jwts.builder()
                .subject(jwtPayload.getEmail())
                .claim("email", jwtPayload.getEmail())
                .claim("user_id", jwtPayload.getId())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(signingKey())
                .compact();
    }

    public Jws<Claims> verify(String token) {
        return Jwts.parser()
                .verifyWith(signingKey())
                .build()
                .parseSignedClaims(token);
    }
}
