import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api';
import { ApiResponse } from '../types';

/**
 * Create Axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any authentication tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
    return response;
  },
  (error: AxiosError) => {
    console.error('[API Response Error]', error);

    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = (error.response.data as any)?.message || error.message;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          console.error('Unauthorized access');
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error(`Error ${status}: ${message}`);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from server. Please check your network connection.');
    } else {
      // Error in request configuration
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to wrap API responses
 */
export const wrapApiResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
  return {
    success: true,
    data: response.data,
  };
};

/**
 * Helper function to handle API errors
 */
export const handleApiError = (error: any): ApiResponse<never> => {
  if (error.response) {
    return {
      success: false,
      error: (error.response.data as any)?.message || error.message,
    };
  } else if (error.request) {
    return {
      success: false,
      error: 'No response from server. Please check your network connection.',
    };
  } else {
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
};

export default apiClient;
