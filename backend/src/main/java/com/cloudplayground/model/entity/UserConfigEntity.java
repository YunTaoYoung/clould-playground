package com.cloudplayground.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity representing user configuration settings
 */
@Entity
@Table(name = "user_config")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserConfigEntity {

    @Id
    @Column(name = "config_key", length = 100)
    private String configKey;

    @Column(name = "config_value", columnDefinition = "TEXT")
    private String configValue;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PreUpdate
    @PrePersist
    public void updateTimestamp() {
        updatedAt = LocalDateTime.now();
    }
}
