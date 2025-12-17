package com.cloudplayground.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health check controller
 */
@RestController
@RequestMapping("/health")
@Slf4j
public class HealthController {

    @Value("${spring.application.name}")
    private String applicationName;

    @Value("${kubernetes.namespace}")
    private String kubernetesNamespace;

    /**
     * Simple health check endpoint, 随便加点comment测试下claude code github action
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("application", applicationName);
        response.put("timestamp", LocalDateTime.now());
        response.put("kubernetesNamespace", kubernetesNamespace);

        log.debug("Health check requested");
        return ResponseEntity.ok(response);
    }
}
