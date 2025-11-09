/**
 * API configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 30000, // 30 seconds
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Health check
  HEALTH: '/health',

  // Theme management
  THEMES: '/themes',
  THEME_BY_ID: (id: string) => `/themes/${id}`,
  THEME_ACTIVATE: (id: string) => `/themes/${id}/activate`,
  THEME_DEACTIVATE: (id: string) => `/themes/${id}/deactivate`,
  THEME_EXERCISES: (id: string) => `/themes/${id}/exercises`,

  // Exercise execution
  EXECUTE: '/exercises/execute',
  EXERCISE_HISTORY: (themeId: string, exerciseId: string) =>
    `/exercises/${themeId}/${exerciseId}/history`,
  EXERCISE_COMPLETION: (themeId: string, exerciseId: string) =>
    `/exercises/${themeId}/${exerciseId}/completion`,

  // User configuration
  CONFIG: '/config',
};
