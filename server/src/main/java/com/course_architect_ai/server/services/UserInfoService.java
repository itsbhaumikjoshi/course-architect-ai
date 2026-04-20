package com.course_architect_ai.server.services;

import com.course_architect_ai.server.entities.User;
import com.course_architect_ai.server.repositories.UserRepo;
import com.course_architect_ai.server.security.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserInfo loadUserByUsername(final String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return UserInfo.from(user);
    }
}
