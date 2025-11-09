package com.cloudplayground.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity representing an exercise completion record
 */
@Entity
@Table(name = "exercise_completion")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseCompletionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "theme_id", nullable = false, length = 50)
    private String themeId;

    @Column(name = "exercise_id", nullable = false, length = 50)
    private String exerciseId;

    @Column(name = "completed")
    @Builder.Default
    private Boolean completed = false;

    @Column(name = "score")
    private Integer score;

    @Column(name = "passed")
    private Boolean passed;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
