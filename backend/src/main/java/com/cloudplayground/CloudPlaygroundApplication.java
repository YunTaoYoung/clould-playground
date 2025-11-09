package com.cloudplayground;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Cloud Playground Backend Application
 *
 * Main entry point for the Cloud Playground learning platform backend service.
 * This application provides:
 * - Kubernetes resource management for learning environments
 * - Exercise execution and validation
 * - User progress tracking
 * - Theme management
 */
@SpringBootApplication
public class CloudPlaygroundApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudPlaygroundApplication.class, args);
    }
}
