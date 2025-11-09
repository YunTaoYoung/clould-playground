package com.cloudplayground.repository;

import com.cloudplayground.model.entity.ExerciseHistoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for ExerciseHistory entities
 */
@Repository
public interface ExerciseHistoryRepository extends JpaRepository<ExerciseHistoryEntity, Long> {

    /**
     * Find history records by theme and exercise ID
     */
    List<ExerciseHistoryEntity> findByThemeIdAndExerciseIdOrderByCreatedAtDesc(String themeId, String exerciseId);

    /**
     * Find history records by theme and exercise ID with pagination
     */
    Page<ExerciseHistoryEntity> findByThemeIdAndExerciseId(String themeId, String exerciseId, Pageable pageable);

    /**
     * Find all history records for a theme
     */
    List<ExerciseHistoryEntity> findByThemeIdOrderByCreatedAtDesc(String themeId);

    /**
     * Find successful history records
     */
    List<ExerciseHistoryEntity> findByThemeIdAndExerciseIdAndSuccessTrueOrderByCreatedAtDesc(String themeId, String exerciseId);

    /**
     * Count history records for an exercise
     */
    long countByThemeIdAndExerciseId(String themeId, String exerciseId);
}
