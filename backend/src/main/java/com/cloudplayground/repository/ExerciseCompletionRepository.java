package com.cloudplayground.repository;

import com.cloudplayground.model.entity.ExerciseCompletionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for ExerciseCompletion entities
 */
@Repository
public interface ExerciseCompletionRepository extends JpaRepository<ExerciseCompletionEntity, Long> {

    /**
     * Find completion record by theme and exercise ID
     */
    Optional<ExerciseCompletionEntity> findByThemeIdAndExerciseId(String themeId, String exerciseId);

    /**
     * Find all completions for a theme
     */
    List<ExerciseCompletionEntity> findByThemeId(String themeId);

    /**
     * Find all completed exercises for a theme
     */
    List<ExerciseCompletionEntity> findByThemeIdAndCompletedTrue(String themeId);

    /**
     * Count completed exercises for a theme
     */
    long countByThemeIdAndCompletedTrue(String themeId);
}
