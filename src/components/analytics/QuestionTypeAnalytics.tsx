'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Types for question performance analytics
interface QuestionTypePerformance {
  questionType: 'single-correct' | 'assertion-reason' | 'match-following' | 'diagram-based' | 'multiple-correct' | 'numerical' | 'statement-based'
  totalAttempted: number
  totalCorrect: number
  averageTime: number
  averageScore: number
  accuracyPercentage: number
  difficultyBreakdown: {
    easy: { attempted: number; correct: number; accuracy: number }
    medium: { attempted: number; correct: number; accuracy: number }
    hard: { attempted: number; correct: number; accuracy: number }
  }
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

interface QuestionTypeAnalyticsProps {
  studentId?: string
  timeRange?: 'week' | 'month' | 'quarter' | 'all'
  className?: string
}

const QuestionTypeAnalytics: React.FC<QuestionTypeAnalyticsProps> = ({
  studentId,
  timeRange = 'month',
  className
}) => {
  const [performanceData, setPerformanceData] = useState<QuestionTypePerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Mock data for demonstration - in real implementation, this would come from API
  useEffect(() => {
    const mockData: QuestionTypePerformance[] = [
      {
        questionType: 'single-correct',
        totalAttempted: 150,
        totalCorrect: 135,
        averageTime: 45,
        averageScore: 3.6,
        accuracyPercentage: 90,
        difficultyBreakdown: {
          easy: { attempted: 60, correct: 58, accuracy: 96.7 },
          medium: { attempted: 70, correct: 63, accuracy: 90 },
          hard: { attempted: 20, correct: 14, accuracy: 70 }
        },
        strengths: ['Quick recall', 'Strong NCERT foundation'],
        weaknesses: ['Complex application questions'],
        recommendations: ['Practice more hard-level questions', 'Focus on conceptual clarity']
      },
      {
        questionType: 'assertion-reason',
        totalAttempted: 45,
        totalCorrect: 32,
        averageTime: 95,
        averageScore: 2.8,
        accuracyPercentage: 71.1,
        difficultyBreakdown: {
          easy: { attempted: 15, correct: 14, accuracy: 93.3 },
          medium: { attempted: 25, correct: 16, accuracy: 64 },
          hard: { attempted: 5, correct: 2, accuracy: 40 }
        },
        strengths: ['Understanding assertions', 'Basic reasoning'],
        weaknesses: ['Complex causal relationships', 'Advanced reasoning'],
        recommendations: ['Practice logical reasoning', 'Study cause-effect relationships']
      },
      {
        questionType: 'match-following',
        totalAttempted: 30,
        totalCorrect: 25,
        averageTime: 120,
        averageScore: 3.3,
        accuracyPercentage: 83.3,
        difficultyBreakdown: {
          easy: { attempted: 12, correct: 11, accuracy: 91.7 },
          medium: { attempted: 15, correct: 12, accuracy: 80 },
          hard: { attempted: 3, correct: 2, accuracy: 66.7 }
        },
        strengths: ['Pattern recognition', 'Systematic matching'],
        weaknesses: ['Time management', 'Complex relationships'],
        recommendations: ['Practice timed matching exercises', 'Learn shortcut techniques']
      },
      {
        questionType: 'diagram-based',
        totalAttempted: 40,
        totalCorrect: 28,
        averageTime: 85,
        averageScore: 2.8,
        accuracyPercentage: 70,
        difficultyBreakdown: {
          easy: { attempted: 15, correct: 13, accuracy: 86.7 },
          medium: { attempted: 20, correct: 13, accuracy: 65 },
          hard: { attempted: 5, correct: 2, accuracy: 40 }
        },
        strengths: ['Basic structure identification', 'Label recognition'],
        weaknesses: ['Function analysis', 'Complex diagrams'],
        recommendations: ['Practice more diagram interpretation', 'Study anatomical details']
      },
      {
        questionType: 'multiple-correct',
        totalAttempted: 25,
        totalCorrect: 15,
        averageTime: 110,
        averageScore: 2.4,
        accuracyPercentage: 60,
        difficultyBreakdown: {
          easy: { attempted: 10, correct: 8, accuracy: 80 },
          medium: { attempted: 12, correct: 6, accuracy: 50 },
          hard: { attempted: 3, correct: 1, accuracy: 33.3 }
        },
        strengths: ['Identifying obvious answers', 'Partial marking strategy'],
        weaknesses: ['Avoiding negative marking', 'Complete accuracy'],
        recommendations: ['Practice elimination techniques', 'Study marking schemes']
      },
      {
        questionType: 'numerical',
        totalAttempted: 20,
        totalCorrect: 12,
        averageTime: 140,
        averageScore: 2.4,
        accuracyPercentage: 60,
        difficultyBreakdown: {
          easy: { attempted: 8, correct: 7, accuracy: 87.5 },
          medium: { attempted: 10, correct: 4, accuracy: 40 },
          hard: { attempted: 2, correct: 1, accuracy: 50 }
        },
        strengths: ['Basic calculations', 'Formula application'],
        weaknesses: ['Complex multi-step problems', 'Time pressure'],
        recommendations: ['Practice calculation speed', 'Learn formula shortcuts']
      },
      {
        questionType: 'statement-based',
        totalAttempted: 35,
        totalCorrect: 24,
        averageTime: 100,
        averageScore: 2.7,
        accuracyPercentage: 68.6,
        difficultyBreakdown: {
          easy: { attempted: 15, correct: 13, accuracy: 86.7 },
          medium: { attempted: 15, correct: 9, accuracy: 60 },
          hard: { attempted: 5, correct: 2, accuracy: 40 }
        },
        strengths: ['Individual statement evaluation', 'True/false identification'],
        weaknesses: ['Complex logical relationships', 'Combined evaluation'],
        recommendations: ['Practice statement analysis', 'Study logical reasoning']
      }
    ]

    // Simulate loading delay
    setTimeout(() => {
      setPerformanceData(mockData)
      setLoading(false)
    }, 1000)
  }, [studentId, timeRange])

  const getQuestionTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'single-correct': 'Single Correct',
      'assertion-reason': 'Assertion-Reason',
      'match-following': 'Match Following',
      'diagram-based': 'Diagram Based',
      'multiple-correct': 'Multiple Correct',
      'numerical': 'Numerical',
      'statement-based': 'Statement Based'
    }
    return labels[type] || type
  }

  const getQuestionTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'single-correct': 'blue',
      'assertion-reason': 'purple',
      'match-following': 'orange',
      'diagram-based': 'cyan',
      'multiple-correct': 'emerald',
      'numerical': 'indigo',
      'statement-based': 'teal'
    }
    return colors[type] || 'gray'
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-700 bg-green-100'
    if (accuracy >= 75) return 'text-yellow-700 bg-yellow-100'
    if (accuracy >= 60) return 'text-orange-700 bg-orange-100'
    return 'text-red-700 bg-red-100'
  }

  if (loading) {
    return (
      <div className={cn("p-6 bg-white rounded-lg shadow-sm border border-gray-200", className)}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("p-6 bg-white rounded-lg shadow-sm border border-gray-200", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Question Type Performance</h2>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Total Questions</h3>
          <p className="text-2xl font-bold text-blue-900">
            {performanceData.reduce((sum, data) => sum + data.totalAttempted, 0)}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm font-medium text-green-800 mb-1">Overall Accuracy</h3>
          <p className="text-2xl font-bold text-green-900">
            {Math.round(
              (performanceData.reduce((sum, data) => sum + data.totalCorrect, 0) /
               performanceData.reduce((sum, data) => sum + data.totalAttempted, 0)) * 100
            )}%
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h3 className="text-sm font-medium text-purple-800 mb-1">Average Time</h3>
          <p className="text-2xl font-bold text-purple-900">
            {Math.round(
              performanceData.reduce((sum, data) => sum + data.averageTime, 0) / performanceData.length
            )}s
          </p>
        </div>
      </div>

      {/* Question Type Performance Grid */}
      <div className="space-y-4">
        {performanceData.map((data, index) => {
          const color = getQuestionTypeColor(data.questionType)
          const isSelected = selectedType === data.questionType

          return (
            <div
              key={index}
              onClick={() => setSelectedType(isSelected ? null : data.questionType)}
              className={cn(
                "p-4 border rounded-lg transition-all duration-200 cursor-pointer",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    `bg-${color}-100 text-${color}-800`
                  )}>
                    {getQuestionTypeLabel(data.questionType)}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {data.totalAttempted} attempted
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "px-2 py-1 rounded text-sm font-medium",
                    getAccuracyColor(data.accuracyPercentage)
                  )}>
                    {data.accuracyPercentage.toFixed(1)}%
                  </span>
                  <span className="text-gray-500 text-sm">
                    {data.averageTime}s avg
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={cn("h-2 rounded-full", `bg-${color}-500`)}
                  style={{ width: `${data.accuracyPercentage}%` }}
                ></div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                  {/* Difficulty Breakdown */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Difficulty Breakdown</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(data.difficultyBreakdown).map(([difficulty, stats]) => (
                        <div key={difficulty} className="p-2 bg-gray-50 rounded text-center">
                          <p className="text-xs text-gray-600 uppercase">{difficulty}</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {stats.accuracy.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {stats.correct}/{stats.attempted}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths and Weaknesses */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {data.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {data.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-red-700 flex items-center gap-2">
                            <span className="text-red-500">⚠</span>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {data.recommendations.map((recommendation, idx) => (
                        <li key={idx} className="text-sm text-blue-700 flex items-center gap-2">
                          <span className="text-blue-500">→</span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          Click on any question type to view detailed analysis and recommendations
        </p>
      </div>
    </div>
  )
}

export default QuestionTypeAnalytics