package com.course_architect_ai.server.filters;

import com.course_architect_ai.server.entities.User;
import com.course_architect_ai.server.repositories.UserRepo;
import com.course_architect_ai.server.security.UserInfo;
import com.course_architect_ai.server.services.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return "POST".equalsIgnoreCase(request.getMethod())
                && ("/login".equals(path) || "/register".equals(path));
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        if(request.getCookies() == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = null;

        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("sid")) {
                token = cookie.getValue();
                break;
            }
        }

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            Claims claims = jwtService.verify(token).getPayload();
            UUID userId = UUID.fromString(String.valueOf(claims.get("user_id")));
            String email = claims.get("email", String.class);

            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new JwtException("User not found"));

            if (!Objects.equals(user.getEmail(), email)) {
                throw new JwtException("Token email mismatch");
            }

            UserInfo principal = UserInfo.from(user);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            principal,
                            null,
                            principal.getAuthorities()
                    );

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            request.setAttribute("authenticatedUser", principal);

            filterChain.doFilter(request, response);
        } catch (JwtException | IllegalArgumentException ex) {
            SecurityContextHolder.clearContext();
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
        }
    }
}
