package com.cloudplayground.model.entity;

import com.cloudplayground.model.enums.ThemeStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity representing a theme's activation status and connection information
 */
@Entity
@Table(name = "theme_status")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThemeStatusEntity {

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private ThemeStatus status;

    @Column(name = "namespace", length = 100)
    private String namespace;

    @Column(name = "deployment_name", length = 100)
    private String deploymentName;

    @Column(name = "service_name", length = 100)
    private String serviceName;

    @Column(name = "service_endpoint", length = 255)
    private String serviceEndpoint;

    @Column(name = "connection_info", columnDefinition = "TEXT")
    private String connectionInfo;

    @Column(name = "activated_at")
    private LocalDateTime activatedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @PreUpdate
    @PrePersist
    public void updateTimestamp() {
        updatedAt = LocalDateTime.now();
    }
}
