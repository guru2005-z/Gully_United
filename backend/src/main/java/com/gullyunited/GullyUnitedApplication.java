package com.gullyunited;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GullyUnitedApplication {

    public static void main(String[] args) {
        SpringApplication.run(GullyUnitedApplication.class, args);
    }
}
