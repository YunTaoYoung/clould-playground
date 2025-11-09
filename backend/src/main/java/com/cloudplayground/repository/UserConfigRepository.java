package com.cloudplayground.repository;

import com.cloudplayground.model.entity.UserConfigEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for UserConfig entities
 */
@Repository
public interface UserConfigRepository extends JpaRepository<UserConfigEntity, String> {

    /**
     * Find configuration by key
     */
    Optional<UserConfigEntity> findByConfigKey(String configKey);
}
