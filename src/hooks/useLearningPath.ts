'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  PersonalizedLearningEngine,
  type StudentProfile,
  type LearningPath,
  type StudySession,
} from '@/lib/learning/PersonalizedLearningEngine'
import { useAuth } from './useAuth'

interface UseLearningPathReturn {
  learningPath: LearningPath | null
  isLoading: boolean
  error: string | null
  regeneratePath: () => void
  updateProgress: (sessionId: string, score: number, timeSpent: number) => void
  getDailySchedule: (date: string) => StudySession[]
  getProgressAnalytics: () => {
    overallProgress: number
    timeUtilization: number
    strongestTopics: string[]
    needsAttention: string[]
    projectedScore: number
  } | null
  completedSessions: string[]
  addCompletedSession: (sessionId: string) => void
}

export function useLearningPath(): UseLearningPathReturn {
  const { user, isAuthenticated } = useAuth()
  const [learningEngine] = useState(new PersonalizedLearningEngine())
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [completedSessions, setCompletedSessions] = useState<string[]>([])

  // Mock student profile - in production, this would come from API
  const getStudentProfile = useCallback((): StudentProfile | null => {
    if (!user) return null

    return {
      id: user.id,
      name: user.name || 'Student',
      email: user.email || '',
      currentScore: 485,
      targetScore: 540,
      timeToExam: 180, // 6 months
      studyHoursPerDay: 4,
      learningStyle: 'visual',
      preferredDifficulty: 'challenging',
      strongAreas: ['Cell Biology', 'Ecology', 'Human Physiology'],
      weakAreas: [
        {
          chapter: 'Genetics',
          topic: 'Molecular Basis of Inheritance',
          difficulty: 'high',
          currentScore: 65,
          targetScore: 85,
          priorityLevel: 9,
          estimatedStudyTime: 40,
          recommendedDailyTime: 90,
          improvement: -5,
          lastPracticed: '2025-09-18T10:00:00Z',
        },
        {
          chapter: 'Plant Physiology',
          topic: 'Photosynthesis',
          difficulty: 'medium',
          currentScore: 72,
          targetScore: 88,
          priorityLevel: 7,
          estimatedStudyTime: 25,
          recommendedDailyTime: 60,
          improvement: -3,
          lastPracticed: '2025-09-17T14:00:00Z',
        },
        {
          chapter: 'Evolution',
          topic: 'Molecular Evolution',
          difficulty: 'medium',
          currentScore: 78,
          targetScore: 90,
          priorityLevel: 6,
          estimatedStudyTime: 20,
          recommendedDailyTime: 45,
          improvement: -2,
          lastPracticed: '2025-09-16T16:00:00Z',
        },
      ],
      completedChapters: [
        'Cell: The Unit of Life',
        'Biomolecules',
        'Structural Organisation in Animals',
        'Transport in Plants',
        'Body Fluids and Circulation',
        'Reproduction in Organisms',
        'Human Reproduction',
        'Organisms and Populations',
        'Ecosystem',
      ],
      currentStreak: 12,
      totalStudyTime: 450,
    }
  }, [user])

  // Generate learning path
  const generatePath = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const profile = getStudentProfile()
      if (!profile) {
        throw new Error('Student profile not available')
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const path = learningEngine.generateLearningPath(profile)
      setLearningPath(path)

      // Load completed sessions from localStorage
      const saved = localStorage.getItem(`completed_sessions_${profile.id}`)
      if (saved) {
        setCompletedSessions(JSON.parse(saved))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate learning path')
    } finally {
      setIsLoading(false)
    }
  }, [learningEngine, getStudentProfile])

  // Regenerate path
  const regeneratePath = useCallback(() => {
    generatePath()
  }, [generatePath])

  // Update progress and adapt path
  const updateProgress = useCallback(
    (sessionId: string, score: number, timeSpent: number) => {
      if (!learningPath) return

      const performanceData = [
        {
          sessionId,
          actualScore: score,
          timeSpent,
          difficulty: 'medium', // This would come from the session
        },
      ]

      const adaptedPath = learningEngine.adaptLearningPath(learningPath, performanceData)
      setLearningPath(adaptedPath)

      // Save to localStorage (in production, this would be an API call)
      localStorage.setItem(`learning_path_${learningPath.studentId}`, JSON.stringify(adaptedPath))
    },
    [learningPath, learningEngine]
  )

  // Get daily schedule
  const getDailySchedule = useCallback(
    (date: string): StudySession[] => {
      if (!learningPath) return []
      return learningEngine.generateDailySchedule(learningPath, date)
    },
    [learningPath, learningEngine]
  )

  // Get progress analytics
  const getProgressAnalytics = useCallback(() => {
    if (!learningPath) return null
    return learningEngine.getProgressAnalytics(learningPath, completedSessions)
  }, [learningPath, learningEngine, completedSessions])

  // Add completed session
  const addCompletedSession = useCallback(
    (sessionId: string) => {
      setCompletedSessions((prev) => {
        const updated = [...prev, sessionId]

        // Save to localStorage
        const profile = getStudentProfile()
        if (profile) {
          localStorage.setItem(`completed_sessions_${profile.id}`, JSON.stringify(updated))
        }

        return updated
      })
    },
    [getStudentProfile]
  )

  // Generate path on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      generatePath()
    }
  }, [isAuthenticated, user, generatePath])

  return {
    learningPath,
    isLoading,
    error,
    regeneratePath,
    updateProgress,
    getDailySchedule,
    getProgressAnalytics,
    completedSessions,
    addCompletedSession,
  }
}
