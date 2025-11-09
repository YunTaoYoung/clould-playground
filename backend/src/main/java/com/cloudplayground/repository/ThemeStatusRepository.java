package com.cloudplayground.repository;

import com.cloudplayground.model.entity.ThemeStatusEntity;
import com.cloudplayground.model.enums.ThemeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for ThemeStatus entities
 */
@Repository
public interface ThemeStatusRepository extends JpaRepository<ThemeStatusEntity, String> {

    /**
     * Find all themes by status
     */
    List<ThemeStatusEntity> findByStatus(ThemeStatus status);

    /**
     * Find theme by ID
     */
    Optional<ThemeStatusEntity> findById(String id);

    /**
     * Check if theme exists by ID
     */
    boolean existsById(String id);
}
