package com.course_architect_ai.server.controllers;

import com.course_architect_ai.server.entities.User;
import com.course_architect_ai.server.security.UserInfo;
import com.course_architect_ai.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public User me(@AuthenticationPrincipal UserInfo userInfo) {
        return userInfo.to();
    }
}
