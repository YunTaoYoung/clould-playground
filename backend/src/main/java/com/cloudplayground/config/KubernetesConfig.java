package com.cloudplayground.config;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.util.Config;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Kubernetes client configuration
 */
@Configuration
@Slf4j
public class KubernetesConfig {

    @Value("${kubernetes.config.in-cluster:false}")
    private boolean inCluster;

    @Value("${kubernetes.namespace:cloud-playground}")
    private String defaultNamespace;

    /**
     * Create Kubernetes API client
     * Uses default kubeconfig from ~/.kube/config when not running in-cluster
     */
    @Bean
    public ApiClient kubernetesClient() {
        try {
            ApiClient client;
            if (inCluster) {
                log.info("Initializing Kubernetes client from in-cluster configuration");
                client = Config.fromCluster();
            } else {
                log.info("Initializing Kubernetes client from default kubeconfig");
                client = Config.defaultClient();
            }

            // Set reasonable timeouts
            client.setConnectTimeout(30000); // 30 seconds
            client.setReadTimeout(30000);

            io.kubernetes.client.openapi.Configuration.setDefaultApiClient(client);

            log.info("Kubernetes client initialized successfully");
            log.info("Default namespace: {}", defaultNamespace);

            return client;
        } catch (Exception e) {
            log.error("Failed to initialize Kubernetes client: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize Kubernetes client", e);
        }
    }

    @Bean
    public String kubernetesNamespace() {
        return defaultNamespace;
    }
}
