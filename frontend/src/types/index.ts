/**
 * Theme status enumeration
 */
export enum ThemeStatus {
  NOT_ACTIVATED = 'NOT_ACTIVATED',
  ACTIVATING = 'ACTIVATING',
  RUNNING = 'RUNNING',
  STOPPING = 'STOPPING',
  STOPPED = 'STOPPED',
  ERROR = 'ERROR'
}

/**
 * Exercise difficulty level
 */
export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

/**
 * Exercise validation type
 */
export enum ValidationType {
  AUTO = 'auto',
  MANUAL = 'manual'
}

/**
 * Theme information
 */
export interface Theme {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  icon?: string;
  status: ThemeStatus;
  namespace?: string;
  serviceEndpoint?: string;
  activatedAt?: string;
  errorMessage?: string;
}

/**
 * Exercise information
 */
export interface Exercise {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  type: string;
  setupScript?: string;
  solutionScript?: string;
  validation?: {
    type: ValidationType;
    expectedResult?: string;
    performanceThresholdMs?: number;
  };
}

/**
 * Exercise execution request
 */
export interface ExecuteRequest {
  themeId: string;
  exerciseId: string;
  code: string;
}

/**
 * Exercise execution result
 */
export interface ExecuteResult {
  success: boolean;
  result?: any;
  executionTimeMs?: number;
  errorMessage?: string;
  passed?: boolean;
}

/**
 * Exercise history record
 */
export interface ExerciseHistory {
  id: number;
  themeId: string;
  exerciseId: string;
  code: string;
  result?: string;
  executionTimeMs?: number;
  success: boolean;
  errorMessage?: string;
  createdAt: string;
}

/**
 * Exercise completion record
 */
export interface ExerciseCompletion {
  id: number;
  themeId: string;
  exerciseId: string;
  completed: boolean;
  score?: number;
  passed?: boolean;
  completedAt?: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
