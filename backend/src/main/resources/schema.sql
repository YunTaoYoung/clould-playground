-- Cloud Playground Database Schema
-- H2 Database

-- Theme Status Table
-- Tracks the activation status and connection info for each theme
CREATE TABLE IF NOT EXISTS theme_status (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL, -- NOT_ACTIVATED, ACTIVATING, RUNNING, STOPPING, STOPPED
    namespace VARCHAR(100),
    deployment_name VARCHAR(100),
    service_name VARCHAR(100),
    service_endpoint VARCHAR(255), -- host:port
    connection_info TEXT, -- JSON format for connection details
    activated_at TIMESTAMP,
    updated_at TIMESTAMP,
    error_message TEXT
);

-- Exercise Completion Table
-- Records which exercises have been completed by the user
CREATE TABLE IF NOT EXISTS exercise_completion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    theme_id VARCHAR(50) NOT NULL,
    exercise_id VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score INT,
    passed BOOLEAN,
    completed_at TIMESTAMP,
    UNIQUE(theme_id, exercise_id)
);

-- Exercise History Table
-- Stores all exercise attempts with code and results
CREATE TABLE IF NOT EXISTS exercise_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    theme_id VARCHAR(50) NOT NULL,
    exercise_id VARCHAR(50) NOT NULL,
    code TEXT NOT NULL,
    result TEXT, -- JSON format for result data
    execution_time_ms BIGINT,
    success BOOLEAN,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for exercise_history table
CREATE INDEX IF NOT EXISTS idx_theme_exercise ON exercise_history (theme_id, exercise_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON exercise_history (created_at);

-- User Configuration Table
-- Stores user preferences and settings
CREATE TABLE IF NOT EXISTS user_config (
    config_key VARCHAR(100) PRIMARY KEY,
    config_value TEXT,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default configuration
INSERT INTO user_config (config_key, config_value, description) VALUES
('kubernetes.namespace', 'cloud-playground', 'Default Kubernetes namespace for resources'),
('theme.auto.cleanup', 'false', 'Automatically cleanup resources on theme deactivation'),
('history.max.records', '1000', 'Maximum number of history records to keep per exercise');
