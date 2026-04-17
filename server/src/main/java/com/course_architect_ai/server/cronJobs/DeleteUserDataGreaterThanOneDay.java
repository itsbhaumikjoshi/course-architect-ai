package com.course_architect_ai.server.cronJobs;

import com.course_architect_ai.server.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/*
 This is a side project. No data will be held for more than
 24 hours, except dev creds.
 */

@Component
public class DeleteUserDataGreaterThanOneDay {

    @Autowired
    private UserRepo userRepo;

    @Scheduled(fixedRate = 86400000)
    public void deleteData() {
        try {
            LocalDateTime cutoff = LocalDateTime.now().minusHours(24);
            userRepo.deleteYesterdayUsers(cutoff);
        } catch (Error e) {
        }
    }
}
