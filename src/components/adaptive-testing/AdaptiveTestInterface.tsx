/**
 * Adaptive Test Interface - Main Component
 * Real-time adaptive testing interface with comprehensive analytics
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  Timer,
  Activity,
  Pause,
  Play,
  SkipForward,
  RefreshCw,
  Award,
  Zap,
  Eye,
  BookOpen,
  Gauge
} from 'lucide-react'

// Types
interface AdaptiveTestSession {
  id: string
  state: 'initializing' | 'active' | 'paused' | 'completed'
  progressMetrics: {
    itemsCompleted: number
    estimatedCompletion: number
    timeElapsed: number
    accuracyTrend: 'improving' | 'stable' | 'declining'
    engagementLevel: number
  }
}

interface TestItem {
  id: string
  type: 'mcq' | 'short_answer' | 'numerical'
  question: string
  options?: string[]
  difficulty: number
  estimatedTime: number
  topic: string
  subtopic: string
  hints?: string[]
}

interface RealTimeAnalytics {
  performance: {
    currentAbility: number
    accuracy: number
    speed: number
    engagement: number
  }
  progress: {
    itemsCompleted: number
    estimatedCompletion: number
    timeElapsed: number
    currentLevel: number
    learningPhase: string
    masteryAreas: string[]
    strugglingAreas: string[]
  }
  adaptations: {
    totalAdjustments: number
    recentChanges: string[]
    effectiveness: number
  }
  predictions: {
    finalScore: number
    timeRemaining: number
    successProbability: number
    learningVelocity: number
  }
  gaps?: {
    totalGaps: number
    criticalGaps: number
    recommendations: string[]
  }
  recommendations: string[]
}

interface AdaptiveTestInterfaceProps {
  testConfiguration: {
    testType: string
    curriculum: string
    grade: string
    topics: string[]
    timeLimit: number
    minItems: number
    maxItems: number
  }
  onTestComplete: (results: any) => void
  onTestPause?: () => void
  onTestResume?: () => void
}

const AdaptiveTestInterface: React.FC<AdaptiveTestInterfaceProps> = ({
  testConfiguration,
  onTestComplete,
  onTestPause,
  onTestResume
}) => {
  // State management
  const [session, setSession] = useState<AdaptiveTestSession | null>(null)
  const [currentItem, setCurrentItem] = useState<TestItem | null>(null)
  const [analytics, setAnalytics] = useState<RealTimeAnalytics | null>(null)
  const [instructions, setInstructions] = useState<string[]>([])

  // UI state
  const [testStarted, setTestStarted] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number>(3)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Timing
  const [itemStartTime, setItemStartTime] = useState<Date | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize test session
  useEffect(() => {
    initializeSession()
  }, [])

  // Timer management
  useEffect(() => {
    if (testStarted && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [testStarted, timeRemaining])

  // Real-time analytics updates
  useEffect(() => {
    if (session && testStarted) {
      const interval = setInterval(fetchAnalytics, 5000) // Update every 5 seconds
      return () => clearInterval(interval)
    }
  }, [session, testStarted])

  const initializeSession = async () => {
    setLoading(true)
    setError(null)

    try {
      // Create session
      const createResponse = await fetch('/api/adaptive-testing/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testConfiguration)
      })

      if (!createResponse.ok) {
        throw new Error('Failed to create test session')
      }

      const createData = await createResponse.json()

      if (!createData.success) {
        throw new Error(createData.error || 'Failed to create session')
      }

      setSession(createData.session)
      setTimeRemaining(testConfiguration.timeLimit * 60) // Convert to seconds

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize test')
    } finally {
      setLoading(false)
    }
  }

  const startTest = async () => {
    if (!session) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/adaptive-testing/${session.id}/start`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to start test')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to start test')
      }

      setSession(data.session)
      setCurrentItem(data.firstItem)
      setInstructions(data.instructions)
      setTestStarted(true)
      setItemStartTime(new Date())

      // Initial analytics fetch
      await fetchAnalytics()

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start test')
    } finally {
      setLoading(false)
    }
  }

  const submitResponse = async () => {
    if (!session || !currentItem || !selectedAnswer || !itemStartTime) return

    setLoading(true)
    setError(null)

    try {
      const responseTime = (Date.now() - itemStartTime.getTime()) / 1000 // seconds
      const isCorrect = selectedAnswer === currentItem.options?.[0] // Simplified - would check actual correct answer

      const response = await fetch(`/api/adaptive-testing/${session.id}/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: currentItem.id,
          response: isCorrect,
          responseTime,
          confidence
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit response')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit response')
      }

      // Handle test completion
      if (data.sessionComplete) {
        await completeTest()
        return
      }

      // Continue with next item
      setCurrentItem(data.nextItem)
      setSelectedAnswer(null)
      setConfidence(3)
      setShowHints(false)
      setItemStartTime(new Date())

      // Show adaptations if any
      if (data.adaptations?.length > 0) {
        showAdaptationFeedback(data.adaptations)
      }

      // Update analytics
      await fetchAnalytics()

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit response')
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    if (!session) return

    try {
      const response = await fetch(`/api/adaptive-testing/${session.id}/analytics`)

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAnalytics(data.analytics)
        }
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
    }
  }

  const completeTest = async () => {
    if (!session) return

    setLoading(true)

    try {
      const response = await fetch(`/api/adaptive-testing/${session.id}/complete`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to complete test')
      }

      const data = await response.json()

      if (data.success) {
        onTestComplete(data)
      } else {
        throw new Error(data.error || 'Failed to complete test')
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete test')
    } finally {
      setLoading(false)
    }
  }

  const pauseTest = () => {
    setTestStarted(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    onTestPause?.()
  }

  const resumeTest = () => {
    setTestStarted(true)
    onTestResume?.()
  }

  const handleTimeUp = () => {
    // Auto-submit current response or handle timeout
    completeTest()
  }

  const showAdaptationFeedback = (adaptations: string[]) => {
    // Show brief notification about adaptations
    // This could be implemented with a toast notification system
    console.log('Adaptations applied:', adaptations)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getAbilityLevel = (theta: number): string => {
    if (theta > 1.5) return 'Advanced'
    if (theta > 0.5) return 'Proficient'
    if (theta > -0.5) return 'Developing'
    if (theta > -1.5) return 'Beginning'
    return 'Below Basic'
  }

  // Loading state
  if (loading && !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          <div className="text-lg font-medium">Initializing Adaptive Test...</div>
          <div className="text-gray-600">Preparing personalized assessment</div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 mx-auto text-red-600" />
          <div className="text-lg font-medium text-red-800">Test Error</div>
          <div className="text-gray-600">{error}</div>
          <button
            onClick={initializeSession}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Test not started
  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl border-2 border-blue-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-indigo-500 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-indigo-500 bg-clip-text text-transparent">
                Adaptive Test
              </h1>
            </div>
            <p className="text-gray-600">
              AI-powered assessment that adapts to your performance in real-time
            </p>
          </div>

          {/* Test Configuration */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-medium">{testConfiguration.curriculum}</div>
              <div className="text-sm text-gray-600">Curriculum</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="font-medium">Grade {testConfiguration.grade}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Timer className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-medium">{testConfiguration.timeLimit} min</div>
              <div className="text-sm text-gray-600">Time Limit</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Activity className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="font-medium">{testConfiguration.minItems}-{testConfiguration.maxItems}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
          </div>

          {/* Instructions */}
          {instructions.length > 0 && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                Instructions
              </h3>
              <ul className="space-y-2">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={startTest}
              disabled={loading}
              className="bg-indigo-500 text-white px-8 py-4 rounded-xl hover:bg-indigo-600 transition-all disabled:opacity-50 flex items-center gap-2 mx-auto text-lg font-medium"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Starting Test...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Adaptive Test
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Active test interface
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header with controls and analytics toggle */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Progress */}
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">
                  Question {analytics?.progress.itemsCompleted || 0} of {testConfiguration.maxItems}
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round(analytics?.progress.estimatedCompletion || 0)}% Complete
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2">
              <Timer className={`w-5 h-5 ${timeRemaining < 300 ? 'text-red-600' : 'text-green-600'}`} />
              <div>
                <div className="font-medium">{formatTime(timeRemaining)}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>

            {/* Current Ability */}
            {analytics && (
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium">{getAbilityLevel(analytics.performance.currentAbility)}</div>
                  <div className="text-sm text-gray-600">Current Level</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Analytics Toggle */}
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showAnalytics
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              Analytics
            </button>

            {/* Pause/Resume */}
            <button
              onClick={testStarted ? pauseTest : resumeTest}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
            >
              {testStarted ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Resume
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Question Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentItem && (
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border p-6"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentItem.difficulty > 0.5 ? 'bg-red-100 text-red-700' :
                      currentItem.difficulty > 0 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {currentItem.difficulty > 0.5 ? 'Hard' :
                       currentItem.difficulty > 0 ? 'Medium' : 'Easy'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {currentItem.topic} • {currentItem.subtopic}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    ~{currentItem.estimatedTime} min
                  </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-4">{currentItem.question}</h2>

                  {/* MCQ Options */}
                  {currentItem.type === 'mcq' && currentItem.options && (
                    <div className="space-y-3">
                      {currentItem.options.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedAnswer === option
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="font-medium">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confidence Slider */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How confident are you in your answer?
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Not sure</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={confidence}
                      onChange={(e) => setConfidence(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600">Very confident</span>
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-sm font-medium">
                      {['Very low', 'Low', 'Medium', 'High', 'Very high'][confidence - 1]}
                    </span>
                  </div>
                </div>

                {/* Hints */}
                {currentItem.hints && currentItem.hints.length > 0 && (
                  <div className="mb-6">
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHints ? 'Hide Hints' : 'Show Hints'}
                    </button>
                    {showHints && (
                      <div className="mt-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <ul className="space-y-2">
                          {currentItem.hints.map((hint, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span className="text-yellow-800">{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={submitResponse}
                  disabled={!selectedAnswer || loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <SkipForward className="w-4 h-4" />
                      Submit Answer
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Analytics Panel */}
        {showAnalytics && analytics && (
          <div className="space-y-4">
            {/* Performance Metrics */}
            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <span className="font-medium">{analytics.performance.accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Speed</span>
                  <span className="font-medium">{analytics.performance.speed}/min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="font-medium">{analytics.performance.engagement}%</span>
                </div>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Learning Progress
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phase</div>
                  <div className="font-medium capitalize">{analytics.progress.learningPhase}</div>
                </div>
                {analytics.progress.masteryAreas.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Strong Areas</div>
                    <div className="flex flex-wrap gap-1">
                      {analytics.progress.masteryAreas.slice(0, 3).map((area, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {analytics.progress.strugglingAreas.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Focus Areas</div>
                    <div className="flex flex-wrap gap-1">
                      {analytics.progress.strugglingAreas.slice(0, 3).map((area, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Adaptations */}
            {analytics.adaptations.totalAdjustments > 0 && (
              <div className="bg-white rounded-xl border p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  AI Adaptations
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Adjustments</span>
                    <span className="font-medium">{analytics.adaptations.totalAdjustments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Effectiveness</span>
                    <span className="font-medium">{analytics.adaptations.effectiveness}%</span>
                  </div>
                  {analytics.adaptations.recentChanges.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Recent</div>
                      <div className="text-xs text-gray-500">
                        {analytics.adaptations.recentChanges.slice(-1)[0]}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Predictions */}
            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Predictions
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Final Score</span>
                  <span className="font-medium">{analytics.predictions.finalScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Time Remaining</span>
                  <span className="font-medium">{Math.round(analytics.predictions.timeRemaining)} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium">{Math.round(analytics.predictions.successProbability * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {analytics.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Recommendations
                </h3>
                <div className="space-y-2">
                  {analytics.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdaptiveTestInterface