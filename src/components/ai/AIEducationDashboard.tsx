'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnhancedChatInterface } from './EnhancedChatInterface'
import { TestCreationInterface } from './TestCreationInterface'
import { ViewAnalytics } from './ViewAnalytics'
import { RealTimeMetrics } from './RealTimeMetrics'
import AITestGeneration from './AITestGeneration'
import { DashboardSkeleton } from '../ui/LoadingSkeleton'
import { useToast } from '../ui/Toast'
import { SyllabusCard, StudyHoursCard, TestScoreCard, StreakCard } from './ProgressCard'
import { ActivityHistoryModal } from './ActivityHistoryModal'
import { SettingsPanel } from './SettingsPanel'
import { fetchWithRetry } from '@/lib/utils/fetchWithRetry'
import { ProgressCardSkeleton } from './skeletons/ProgressCardSkeleton'
import { MetricCardSkeleton } from './skeletons/MetricsSkeleton'
import { useAuth } from '@/hooks/useAuth'
import { BiologyScoreDisplay } from '@/components/ui/BiologyScoreDisplay'
import {
  Brain,
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  Lightbulb,
  MessageCircle,
  FileText,
  BarChart3,
  Zap,
  Star,
  ChevronRight,
  Play,
  Pause,
  Settings,
  Bell,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Activity,
  PieChart,
  GraduationCap,
  Microscope,
  X,
  Send,
  Menu,
  RefreshCw,
} from 'lucide-react'
// import { aiEducationOrchestrator } from '@/lib/ai/AIEducationOrchestrator' // Commented out for Edge Runtime compatibility

interface AIMetrics {
  totalQuestions: number
  doubtsResolved: number
  studyTime: number
  accuracy: number
  progress: number
  predictions: {
    examScore: number
    readiness: number
    rank: number
  }
}

interface RecentActivity {
  id: string
  type: 'doubt' | 'assessment' | 'study' | 'achievement'
  title: string
  description: string
  timestamp: Date
  success: boolean
  icon: React.ReactNode
}

export function AIEducationDashboard() {
  const { showToast } = useToast()
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<
    'overview' | 'tutor' | 'assessment' | 'testgen' | 'analytics' | 'metrics'
  >('overview')
  const [timeFilter, setTimeFilter] = useState<'week' | 'month'>('week')
  const [notifications, setNotifications] = useState(3)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [freeUserId, setFreeUserId] = useState<string | null>(null)

  const [metrics, setMetrics] = useState<AIMetrics>({
    totalQuestions: 0,
    doubtsResolved: 0,
    studyTime: 0,
    accuracy: 0,
    progress: 0,
    predictions: {
      examScore: 0,
      readiness: 0,
      rank: 0,
    },
  })

  const [progressData, setProgressData] = useState({
    syllabus: { completed: 0, total: 100 },
    studyHours: { hours: 0, target: 400 },
    testScore: { score: 0, maxScore: 100 },
    streak: { days: 0, bestStreak: 0 },
  })

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'doubt',
      title: 'Cell Division Doubt Resolved',
      description: 'Explained mitosis vs meiosis with diagrams',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      success: true,
      icon: <Brain className="w-4 h-4" />,
    },
    {
      id: '2',
      type: 'assessment',
      title: 'Genetics Mock Test',
      description: 'Score: 34/40 (85%)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      success: true,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Weekly Goal Achieved',
      description: 'Completed 15 hours of study',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      success: true,
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: '4',
      type: 'study',
      title: 'Photosynthesis Notes',
      description: 'Generated personalized study material',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      success: true,
      icon: <BookOpen className="w-4 h-4" />,
    },
  ])

  const [showChatInterface, setShowChatInterface] = useState(false)
  const [showTestCreation, setShowTestCreation] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showRealTimeMetrics, setShowRealTimeMetrics] = useState(false)
  const [showActivityHistory, setShowActivityHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{
      id: string
      text: string
      sender: 'user' | 'ai'
      timestamp: Date
      type?: 'text' | 'explanation' | 'recommendation'
    }>
  >([])
  const [chatInput, setChatInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)

  // Get or create freeUserId for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      let storedFreeUserId = localStorage.getItem('freeUserId')
      if (!storedFreeUserId) {
        storedFreeUserId = `free_${Date.now()}_${Math.random().toString(36).substring(7)}`
        localStorage.setItem('freeUserId', storedFreeUserId)
      }
      setFreeUserId(storedFreeUserId)
    }
  }, [isAuthenticated])

  // Fetch dashboard data from APIs
  const fetchDashboardData = useCallback(
    async (showLoadingState = true) => {
      try {
        if (showLoadingState) {
          setIsLoading(true)
          setIsInitialLoading(true)
        }
        setError(null)

        const userId = user?.id || freeUserId
        if (!userId) return

        // Parallel fetch for performance with retry logic
        const [progressRes, statsRes, predictionsRes] = await Promise.allSettled([
          fetchWithRetry(`/api/user/progress?userId=${userId}`, {
            retryOptions: {
              maxRetries: 3,
              onRetry: (attempt) => {
                console.log(`Retrying progress fetch (attempt ${attempt})`)
              },
            },
          }),
          fetchWithRetry(`/api/user/dashboard-stats?userId=${userId}`, {
            retryOptions: {
              maxRetries: 2,
              onRetry: (attempt) => {
                console.log(`Retrying dashboard stats fetch (attempt ${attempt})`)
              },
            },
          }),
          fetchWithRetry(`/api/analytics/predictions?userId=${userId}`, {
            retryOptions: {
              maxRetries: 2,
              onRetry: (attempt) => {
                console.log(`Retrying predictions fetch (attempt ${attempt})`)
              },
            },
          }),
        ])

        // Process progress data
        if (progressRes.status === 'fulfilled') {
          const progressData = await progressRes.value.json()
          if (progressData.success) {
            const data = progressData.data
            setProgressData({
              syllabus: {
                completed: data.syllabus.completed,
                total: data.syllabus.total,
              },
              studyHours: {
                hours: data.studyHours.total,
                target: data.studyHours.target,
              },
              testScore: {
                score: data.biologyScore.current,
                maxScore: data.biologyScore.target,
              },
              streak: {
                days: data.streak.current,
                bestStreak: data.streak.best,
              },
            })

            setMetrics((prev) => ({
              ...prev,
              progress: data.syllabus.percentage,
              studyTime: data.studyHours.total,
            }))
          }
        } else {
          console.error('Failed to fetch progress:', progressRes.reason)
        }

        // Process dashboard stats
        if (statsRes.status === 'fulfilled') {
          const statsData = await statsRes.value.json()
          if (statsData.success) {
            const data = statsData.data
            setMetrics((prev) => ({
              ...prev,
              totalQuestions: data.totalQuestions,
              accuracy: data.accuracy,
              doubtsResolved: Math.round(data.totalQuestions * 0.2),
            }))
          }
        } else {
          console.error('Failed to fetch stats:', statsRes.reason)
        }

        // Process predictions
        if (predictionsRes.status === 'fulfilled') {
          const predictionsData = await predictionsRes.value.json()
          if (predictionsData.success) {
            const data = predictionsData.data
            setMetrics((prev) => ({
              ...prev,
              predictions: {
                examScore: data.predictedScore.neet,
                readiness: data.readinessScore,
                rank: data.expectedRank,
              },
            }))
          }
        } else {
          console.error('Failed to fetch predictions:', predictionsRes.reason)
        }

        setLastUpdated(new Date())
        setIsInitialLoading(false)
        setIsLoading(false)

        if (showLoadingState) {
          showToast('success', 'Dashboard Loaded', 'Welcome back! Your latest stats are ready.')
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
        setIsInitialLoading(false)
        setIsLoading(false)
        showToast('error', 'Load Failed', 'Unable to fetch dashboard data. Please try again.', 7000)
      }
    },
    [user?.id, freeUserId, showToast]
  )

  // Initial data load
  useEffect(() => {
    if (user?.id || freeUserId) {
      fetchDashboardData()
    }
  }, [user?.id, freeUserId, fetchDashboardData])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000

    const interval = setInterval(() => {
      if (user?.id || freeUserId) {
        fetchDashboardData(false)
      }
    }, AUTO_REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [user?.id, freeUserId, fetchDashboardData])

  // Button handlers
  const handleNotifications = () => {
    showToast(
      'info',
      '3 New Notifications',
      '1. Study recommendation\n2. Quiz reminder\n3. Achievement unlocked!',
      7000
    )
    setNotifications(0)
  }

  const handleSettings = () => {
    setShowSettings(true)
  }

  const handleViewDetails = () => {
    showToast('info', 'Analytics', 'Opening detailed performance analytics...', 3000)
    setTimeout(() => setActiveTab('analytics'), 500)
  }

  const handleViewAll = () => {
    setShowActivityHistory(true)
  }

  const handleStartConversation = async (
    message?: string,
    type?: 'text' | 'image' | 'voice',
    file?: File
  ) => {
    if (message === 'start' || !showChatInterface) {
      setShowChatInterface(true)
      setActiveTab('tutor')

      // Add welcome message from AI
      const welcomeMessage = {
        id: `msg_${Date.now()}`,
        text: "Hello! I'm your enhanced Biology AI tutor. 🧬 I can help you with:\n\n📝 Text questions and explanations\n📸 Image analysis (diagrams, microscopy, specimens)\n🎤 Voice doubts and audio responses\n\nWhat would you like to learn about today?",
        sender: 'ai' as const,
        timestamp: new Date(),
        type: 'text' as const,
      }

      setChatMessages([welcomeMessage])
      return
    }

    // Handle different types of messages
    if (type === 'image' && file) {
      await handleImageMessage(message, file)
    } else if (type === 'voice' && file) {
      await handleVoiceMessage(message, file)
    } else {
      await sendChatMessage(message)
    }
  }

  const handleImageMessage = async (message: string, imageFile: File) => {
    // Add user message with image
    const imageUrl = URL.createObjectURL(imageFile)
    const userMessage = {
      id: `msg_${Date.now()}_user`,
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'image' as const,
      imageUrl: imageUrl,
    }

    setChatMessages((prev) => [...prev, userMessage])
    setIsChatLoading(true)

    try {
      // Call image analysis API
      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('question', message || 'Analyze this biology image')
      formData.append('context', 'NEET Biology')

      const response = await fetch('/api/ai/image-analysis', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Image analysis failed: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        const aiMessage = {
          id: `msg_${Date.now()}_ai`,
          text: result.data.analysis.full_response,
          sender: 'ai' as const,
          timestamp: new Date(),
          type: 'explanation' as const,
          analysis: result.data.analysis,
        }
        setChatMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error('Image analysis failed')
      }
    } catch (error) {
      console.error('Image analysis error:', error)
      const errorMessage = {
        id: `msg_${Date.now()}_error`,
        text: "Sorry, I couldn't analyze the image. Please try again with a clearer biology-related image.",
        sender: 'ai' as const,
        timestamp: new Date(),
        type: 'text' as const,
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleVoiceMessage = async (message: string, audioFile: File) => {
    // Add user voice message
    const userMessage = {
      id: `msg_${Date.now()}_user`,
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'voice' as const,
    }

    setChatMessages((prev) => [...prev, userMessage])
    setIsChatLoading(true)

    try {
      // Call voice processing API
      const formData = new FormData()
      formData.append('audio', audioFile)
      formData.append('action', 'transcribe_and_answer')
      formData.append('context', 'NEET Biology')

      const response = await fetch('/api/ai/voice-processing', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Voice processing failed: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        // Show transcription
        const transcriptionMessage = {
          id: `msg_${Date.now()}_transcription`,
          text: `🎤 You said: "${result.data.transcription.text}"`,
          sender: 'ai' as const,
          timestamp: new Date(),
          type: 'text' as const,
        }
        setChatMessages((prev) => [...prev, transcriptionMessage])

        // Show AI response
        if (result.data.ai_response) {
          const aiMessage = {
            id: `msg_${Date.now()}_ai`,
            text: result.data.ai_response.text,
            sender: 'ai' as const,
            timestamp: new Date(),
            type: 'explanation' as const,
            audioUrl: result.data.audio_response
              ? `data:audio/mp3;base64,${result.data.audio_response.audio_base64}`
              : undefined,
          }
          setChatMessages((prev) => [...prev, aiMessage])
        }
      } else {
        throw new Error('Voice processing failed')
      }
    } catch (error) {
      console.error('Voice processing error:', error)
      const errorMessage = {
        id: `msg_${Date.now()}_error`,
        text: "Sorry, I couldn't process your voice message. Please try again or type your question.",
        sender: 'ai' as const,
        timestamp: new Date(),
        type: 'text' as const,
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsChatLoading(false)
    }
  }

  const sendChatMessage = async (message: string) => {
    if (!message.trim() || isChatLoading) return

    // Add user message
    const userMessage = {
      id: `msg_${Date.now()}_user`,
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
      type: 'text' as const,
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput('')
    setIsChatLoading(true)

    try {
      // Call AI API for real response
      const response = await fetch('/api/ai/education-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resolve_doubt',
          data: {
            studentId: 'demo-student',
            question: message,
            context: {
              topic: 'General Biology',
              difficulty: 'intermediate',
            },
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        const aiMessage = {
          id: `msg_${Date.now()}_ai`,
          text: result.data.response.answer,
          sender: 'ai' as const,
          timestamp: new Date(),
          type: 'explanation' as const,
        }
        setChatMessages((prev) => [...prev, aiMessage])

        // Add recommendations if available
        if (result.data.recommendations && result.data.recommendations.length > 0) {
          const recommendationMessage = {
            id: `msg_${Date.now()}_rec`,
            text: `📚 Study Recommendations:\n${result.data.recommendations
              .slice(0, 3)
              .map((rec: string, i: number) => `${i + 1}. ${rec}`)
              .join('\n')}`,
            sender: 'ai' as const,
            timestamp: new Date(),
            type: 'recommendation' as const,
          }
          setTimeout(() => {
            setChatMessages((prev) => [...prev, recommendationMessage])
          }, 1000)
        }
      } else {
        throw new Error('AI response failed')
      }
    } catch (error) {
      console.error('Chat message error:', error)
      const errorMessage = {
        id: `msg_${Date.now()}_error`,
        text: "Sorry, I'm having trouble processing your question right now. Please try again in a moment.",
        sender: 'ai' as const,
        timestamp: new Date(),
        type: 'text' as const,
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleCreateTest = () => {
    console.log('Create Test button clicked - Opening test creation interface')
    setShowTestCreation(true)
  }

  const handleTestCreationSubmit = async (testConfig: any) => {
    setIsLoading(true)
    setShowTestCreation(false)

    try {
      console.log('🧪 Generating test with configuration:', testConfig)

      showToast(
        'info',
        'Creating AI Test',
        `Generating ${testConfig.totalQuestions} questions across ${testConfig.selectedTopics.length} topics...`,
        4000
      )

      // Call the test generation API
      const response = await fetch('/api/ai/test-generation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testConfig),
      })

      const result = await response.json()

      if (result.success) {
        const generatedTest = result.data

        showToast(
          'success',
          'Test Generated Successfully!',
          `${generatedTest.title} - ${generatedTest.questions.length} questions ready!`,
          6000
        )

        // Update metrics
        setMetrics((prev) => ({
          ...prev,
          totalQuestions: prev.totalQuestions + generatedTest.questions.length,
        }))

        console.log('Generated test stored:', generatedTest)
      } else {
        showToast(
          'error',
          'Test Generation Failed',
          result.error || 'Unknown error occurred. Please try again.',
          5000
        )
      }
    } catch (error) {
      console.error('Test generation error:', error)
      showToast(
        'error',
        'Network Error',
        'Failed to generate test. Please check your connection.',
        5000
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewAnalytics = () => {
    console.log('Opening comprehensive analytics dashboard')
    setShowAnalytics(true)
  }

  const tabColors = {
    overview: 'from-purple-500 to-pink-500',
    tutor: 'from-blue-500 to-cyan-500',
    assessment: 'from-green-500 to-emerald-500',
    testgen: 'from-indigo-500 to-purple-500',
    analytics: 'from-orange-500 to-red-500',
    metrics: 'from-teal-500 to-cyan-500',
  }

  // Helper function to get time since last update
  const getTimeSinceUpdate = () => {
    if (!lastUpdated) return ''
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000 / 60)
    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff} min ago`
    const hours = Math.floor(diff / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-10 h-10 bg-gray-300 rounded-xl"></div>
                <div className="h-6 w-48 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProgressCardSkeleton />
            <ProgressCardSkeleton />
            <ProgressCardSkeleton />
            <ProgressCardSkeleton />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Cerebrum Biology Academy AI
                  </h1>
                  <p className="text-sm text-gray-500">Your Personal Biology Tutor</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => fetchDashboardData(false)}
                disabled={isLoading}
                aria-label="Refresh dashboard"
                title={lastUpdated ? `Last updated ${getTimeSinceUpdate()}` : 'Refresh'}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleNotifications}
                className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button
                onClick={handleSettings}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            {lastUpdated && (
              <div className="text-xs text-gray-500 mt-2">Last updated {getTimeSinceUpdate()}</div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs - Responsive */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl p-1 rounded-2xl mb-8">
          <div className="hidden md:flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'tutor', label: 'AI Tutor', icon: Brain },
              { id: 'assessment', label: 'Assessment', icon: FileText },
              { id: 'testgen', label: 'Test Generation', icon: Zap },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'metrics', label: 'Live Metrics', icon: Activity },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tabColors[tab.id as keyof typeof tabColors]} text-white shadow-xl backdrop-blur-lg transform scale-105`
                    : 'text-gray-600 hover:text-gray-800 hover:backdrop-blur-md hover:bg-white/20'
                }`}
                aria-label={`Switch to ${tab.label} tab`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="font-medium flex items-center">
                <Menu className="w-4 h-4 mr-2" />
                {
                  [
                    { id: 'overview', label: 'Overview' },
                    { id: 'tutor', label: 'AI Tutor' },
                    { id: 'assessment', label: 'Assessment' },
                    { id: 'testgen', label: 'Test Generation' },
                    { id: 'analytics', label: 'Analytics' },
                    { id: 'metrics', label: 'Live Metrics' },
                  ].find((t) => t.id === activeTab)?.label
                }
              </span>
              <ChevronRight
                className={`w-5 h-5 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`}
              />
            </button>

            {mobileMenuOpen && (
              <div className="mt-2 space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'tutor', label: 'AI Tutor', icon: Brain },
                  { id: 'assessment', label: 'Assessment', icon: FileText },
                  { id: 'testgen', label: 'Test Generation', icon: Zap },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'metrics', label: 'Live Metrics', icon: Activity },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-white/50'
                    }`}
                    aria-label={`Switch to ${tab.label} tab`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Visual Progress Cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <SyllabusCard
                    completed={progressData.syllabus.completed}
                    total={progressData.syllabus.total}
                    change="+5%"
                    showMilestones={true}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <StudyHoursCard
                    hours={progressData.studyHours.hours}
                    target={progressData.studyHours.target}
                    change="+8h"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TestScoreCard
                    score={progressData.testScore.score}
                    maxScore={progressData.testScore.maxScore}
                    change="+2.5%"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <StreakCard
                    days={progressData.streak.days}
                    bestStreak={progressData.streak.bestStreak}
                    change="+3 days"
                  />
                </motion.div>
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* AI Predictions */}
                <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                      <Zap className="w-5 h-5 mr-2 sm:mr-3 text-yellow-500" />
                      AI Predictions
                    </h3>
                    <button
                      onClick={handleViewDetails}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      {
                        label: 'Predicted Biology Score',
                        value: Math.round(metrics.predictions.examScore / 2),
                        max: 360,
                        color: 'purple',
                        icon: GraduationCap,
                        showTotal: true,
                        totalValue: metrics.predictions.examScore,
                      },
                      {
                        label: 'Exam Readiness',
                        value: metrics.predictions.readiness,
                        max: 100,
                        color: 'blue',
                        icon: CheckCircle,
                      },
                      {
                        label: 'Expected Rank',
                        value: metrics.predictions.rank,
                        max: 10000,
                        color: 'green',
                        icon: Award,
                        isRank: true,
                      },
                    ].map((prediction, index) => {
                      const iconColorClass =
                        prediction.color === 'purple'
                          ? 'text-purple-500'
                          : prediction.color === 'blue'
                            ? 'text-blue-500'
                            : 'text-green-500'

                      const gradientClass =
                        prediction.color === 'purple'
                          ? 'bg-gradient-to-r from-purple-400 to-purple-600'
                          : prediction.color === 'blue'
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                            : 'bg-gradient-to-r from-green-400 to-green-600'

                      return (
                        <motion.div
                          key={prediction.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="backdrop-blur-lg bg-white/20 rounded-xl p-4 sm:p-6 border border-white/30 shadow-lg"
                        >
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <prediction.icon
                              className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColorClass}`}
                            />
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                              {prediction.isRank ? 'Lower is Better' : 'Target'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 sm:mb-3">{prediction.label}</p>
                          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                            {prediction.isRank ? '#' : ''}
                            {prediction.value}
                            {!prediction.isRank && prediction.max > 100 ? `/${prediction.max}` : ''}
                            {!prediction.isRank && prediction.max <= 100 ? '%' : ''}
                          </p>
                          {prediction.showTotal && (
                            <p className="text-xs text-gray-500 mb-2">
                              Total NEET: {prediction.totalValue}/720
                            </p>
                          )}
                          {!prediction.isRank && (
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                              <div
                                className={`${gradientClass} h-2 sm:h-2.5 rounded-full transition-all duration-500`}
                                style={{ width: `${(prediction.value / prediction.max) * 100}%` }}
                              ></div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                    {[
                      {
                        label: 'Ask AI Tutor',
                        icon: MessageCircle,
                        colorClass: 'bg-gradient-to-r from-blue-500 to-blue-600',
                        onClick: () => setActiveTab('tutor'),
                      },
                      {
                        label: 'Take Practice Test',
                        icon: FileText,
                        colorClass: 'bg-gradient-to-r from-green-500 to-green-600',
                        onClick: () => setActiveTab('testgen'),
                      },
                      {
                        label: 'Study Materials',
                        icon: BookOpen,
                        colorClass: 'bg-gradient-to-r from-purple-500 to-purple-600',
                        onClick: () => showToast('info', 'Study Materials', 'Coming soon!', 3000),
                      },
                      {
                        label: 'Performance Analysis',
                        icon: BarChart3,
                        colorClass: 'bg-gradient-to-r from-orange-500 to-orange-600',
                        onClick: () => setActiveTab('analytics'),
                      },
                    ].map((action) => (
                      <motion.button
                        key={action.label}
                        onClick={action.onClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 ${action.colorClass} text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium min-h-[44px]`}
                        aria-label={action.label}
                      >
                        <action.icon className="w-4 h-4" />
                        <span>{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                      <Activity className="w-5 h-5 mr-2 sm:mr-3 text-green-500" />
                      Recent Activity
                    </h3>
                    <button
                      onClick={handleViewAll}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 backdrop-blur-lg bg-white/20 rounded-lg border border-white/30 hover:shadow-lg transition-shadow"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            activity.type === 'doubt'
                              ? 'bg-purple-100 text-purple-600'
                              : activity.type === 'assessment'
                                ? 'bg-green-100 text-green-600'
                                : activity.type === 'achievement'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Intl.RelativeTimeFormat().format(
                              Math.round((activity.timestamp.getTime() - Date.now()) / (1000 * 60)),
                              'minute'
                            )}
                          </p>
                        </div>
                        {activity.success && (
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                    <PieChart className="w-5 h-5 mr-2 sm:mr-3 text-indigo-500" />
                    Learning Progress
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setTimeFilter('week')}
                      className={`text-sm px-3 py-1 rounded-lg font-medium ${
                        timeFilter === 'week'
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      This Week
                    </button>
                    <button
                      onClick={() => setTimeFilter('month')}
                      className={`text-sm px-3 py-1 rounded-lg font-medium ${
                        timeFilter === 'month'
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      This Month
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {[
                    { subject: 'Cell Biology', progress: 85, colorClass: 'text-purple-500' },
                    { subject: 'Genetics', progress: 72, colorClass: 'text-blue-500' },
                    { subject: 'Ecology', progress: 90, colorClass: 'text-green-500' },
                    { subject: 'Physiology', progress: 68, colorClass: 'text-orange-500' },
                  ].map((subject, index) => (
                    <motion.div
                      key={subject.subject}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-200"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - subject.progress / 100)}`}
                            className={`${subject.colorClass} transition-all duration-1000`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-800">
                            {subject.progress}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{subject.subject}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tutor' && (
            <motion.div
              key="tutor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
              style={{ pointerEvents: 'all' }}
            >
              <EnhancedChatInterface
                isOpen={showChatInterface}
                onClose={() => setShowChatInterface(false)}
                messages={chatMessages}
                onSendMessage={handleStartConversation}
                isLoading={isChatLoading}
              />
            </motion.div>
          )}

          {activeTab === 'assessment' && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
              style={{ pointerEvents: 'all' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Smart Assessment</h2>
                <p className="text-gray-600 mb-8">
                  AI-generated tests adapted to your learning level
                </p>

                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log(
                      'Assessment tab Create Test button clicked - Generating real AI test'
                    )
                    handleCreateTest()
                  }}
                  disabled={isLoading}
                  whileHover={isLoading ? {} : { scale: 1.05 }}
                  whileTap={isLoading ? {} : { scale: 0.98 }}
                  className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ pointerEvents: 'all', zIndex: 10 }}
                >
                  {isLoading ? 'Generating Test...' : 'Create Test'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'testgen' && (
            <motion.div
              key="testgen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: 'all' }}
            >
              <AITestGeneration />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
              style={{ pointerEvents: 'all' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Performance Analytics</h2>
                <p className="text-gray-600 mb-8">
                  Deep insights into your learning patterns and progress
                </p>

                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log(
                      'Analytics View Analytics button clicked - Generating real AI analytics'
                    )
                    handleViewAnalytics()
                  }}
                  disabled={isLoading}
                  whileHover={isLoading ? {} : { scale: 1.05 }}
                  whileTap={isLoading ? {} : { scale: 0.98 }}
                  className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ pointerEvents: 'all', zIndex: 10 }}
                >
                  {isLoading ? 'Analyzing Data...' : 'View Analytics'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl"
              style={{ pointerEvents: 'all' }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-teal-500" />
                  Real-Time Performance Metrics
                </h2>
                <p className="text-gray-600">
                  Live monitoring of system performance, user activity, and learning analytics
                </p>
              </div>

              <RealTimeMetrics />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Test Creation Interface */}
        <TestCreationInterface
          isOpen={showTestCreation}
          onClose={() => setShowTestCreation(false)}
          onCreateTest={handleTestCreationSubmit}
        />

        {/* View Analytics Interface */}
        <ViewAnalytics isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} />

        {/* Activity History Modal */}
        <ActivityHistoryModal
          isOpen={showActivityHistory}
          onClose={() => setShowActivityHistory(false)}
        />

        {/* Settings Panel */}
        <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
      </div>
    </div>
  )
}

export default AIEducationDashboard
