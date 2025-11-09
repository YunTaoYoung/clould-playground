import apiClient, { handleApiError, wrapApiResponse } from './apiClient';
import { API_ENDPOINTS } from '../config/api';
import { Theme, ApiResponse } from '../types';

/**
 * Theme API Service
 */
export const themeService = {
  /**
   * Get all themes
   */
  getAllThemes: async (): Promise<ApiResponse<Theme[]>> => {
    try {
      const response = await apiClient.get<Theme[]>(API_ENDPOINTS.THEMES);
      return wrapApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get theme by ID
   */
  getThemeById: async (id: string): Promise<ApiResponse<Theme>> => {
    try {
      const response = await apiClient.get<Theme>(API_ENDPOINTS.THEME_BY_ID(id));
      return wrapApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Activate theme
   */
  activateTheme: async (id: string): Promise<ApiResponse<Theme>> => {
    try {
      const response = await apiClient.post<Theme>(API_ENDPOINTS.THEME_ACTIVATE(id));
      return wrapApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Deactivate theme
   */
  deactivateTheme: async (id: string): Promise<ApiResponse<Theme>> => {
    try {
      const response = await apiClient.post<Theme>(API_ENDPOINTS.THEME_DEACTIVATE(id));
      return wrapApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get exercises for a theme
   */
  getThemeExercises: async (id: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await apiClient.get<any[]>(API_ENDPOINTS.THEME_EXERCISES(id));
      return wrapApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};

/**
 * Health check service
 */
export const healthService = {
  check: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.HEALTH);
      return wrapApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
