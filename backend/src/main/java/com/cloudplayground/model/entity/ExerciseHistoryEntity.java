package com.cloudplayground.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity representing an exercise execution history record
 */
@Entity
@Table(name = "exercise_history")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "theme_id", nullable = false, length = 50)
    private String themeId;

    @Column(name = "exercise_id", nullable = false, length = 50)
    private String exerciseId;

    @Column(name = "code", nullable = false, columnDefinition = "TEXT")
    private String code;

    @Column(name = "result", columnDefinition = "TEXT")
    private String result;

    @Column(name = "execution_time_ms")
    private Long executionTimeMs;

    @Column(name = "success")
    private Boolean success;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
