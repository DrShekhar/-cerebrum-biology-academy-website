// Test storage utilities for localStorage
import { TestResponse, TestResult } from '@/types/simpleTest'
import { ClassType } from '@/components/simple/ClassSelector'

export interface SavedTestProgress {
  testId: string
  userId: string
  userClass: ClassType
  responses: TestResponse[]
  currentQuestionIndex: number
  startTime: number
  lastSavedTime: number
}

export interface TestHistory {
  results: TestResult[]
  totalTests: number
  averageScore: number
  bestScore: number
}

// Keys for localStorage
const KEYS = {
  TEST_PROGRESS: 'test_progress',
  TEST_HISTORY: 'test_history',
  USER_PREFERENCES: 'user_preferences'
}

// Save test progress
export const saveTestProgress = (progress: SavedTestProgress): void => {
  try {
    localStorage.setItem(`${KEYS.TEST_PROGRESS}_${progress.testId}`, JSON.stringify(progress))
  } catch {
    // Storage quota exceeded or localStorage unavailable - fail silently in production
  }
}

// Get saved test progress
export const getTestProgress = (testId: string): SavedTestProgress | null => {
  try {
    const saved = localStorage.getItem(`${KEYS.TEST_PROGRESS}_${testId}`)
    if (!saved) return null
    return JSON.parse(saved) as SavedTestProgress
  } catch {
    // Invalid JSON or storage error - return null
    return null
  }
}

// Clear test progress (after completion)
export const clearTestProgress = (testId: string): void => {
  try {
    localStorage.removeItem(`${KEYS.TEST_PROGRESS}_${testId}`)
  } catch {
    // Storage error - fail silently
  }
}

// Save completed test result
export const saveTestResult = (result: TestResult): void => {
  try {
    const history = getTestHistory()
    history.results.push(result)
    history.totalTests = history.results.length
    history.averageScore = Math.round(history.results.reduce((sum, r) => sum + r.percentage, 0) / history.results.length)
    history.bestScore = Math.max(...history.results.map(r => r.percentage))

    localStorage.setItem(KEYS.TEST_HISTORY, JSON.stringify(history))
  } catch {
    // Storage error - fail silently
  }
}

// Get test history
export const getTestHistory = (): TestHistory => {
  const defaultHistory: TestHistory = {
    results: [],
    totalTests: 0,
    averageScore: 0,
    bestScore: 0
  }
  try {
    const saved = localStorage.getItem(KEYS.TEST_HISTORY)
    if (!saved) return defaultHistory
    return JSON.parse(saved) as TestHistory
  } catch {
    // Invalid JSON or storage error - return default
    return defaultHistory
  }
}

// Check if user has taken a specific test before
export const hasUserTakenTest = (testId: string): boolean => {
  const history = getTestHistory()
  return history.results.some(result => result.testId === testId)
}

// Get user's best score for a specific test
export const getBestScoreForTest = (testId: string): number => {
  const history = getTestHistory()
  const testResults = history.results.filter(result => result.testId === testId)
  return testResults.length > 0 ? Math.max(...testResults.map(r => r.percentage)) : 0
}

// Get user's attempt count for a specific test
export const getAttemptCount = (testId: string): number => {
  const history = getTestHistory()
  return history.results.filter(result => result.testId === testId).length
}

// Generate user ID if not exists (using crypto for secure random generation)
export const getUserId = (): string => {
  try {
    let userId = localStorage.getItem('userId')
    if (!userId) {
      // Use crypto.randomUUID() for secure random ID generation
      const randomId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      userId = `user_${randomId}`
      localStorage.setItem('userId', userId)
    }
    return userId
  } catch {
    // Silently handle storage errors in production
    return 'user_fallback'
  }
}