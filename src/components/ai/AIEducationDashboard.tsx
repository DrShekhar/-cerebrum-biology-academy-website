'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnhancedChatInterface } from './EnhancedChatInterface'
import { TestCreationInterface } from './TestCreationInterface'
import { ViewAnalytics } from './ViewAnalytics'
import { RealTimeMetrics } from './RealTimeMetrics'
import AITestGeneration from './AITestGeneration'
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
  Send
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
  const [activeTab, setActiveTab] = useState<'overview' | 'tutor' | 'assessment' | 'testgen' | 'analytics' | 'metrics'>('overview')
  const [timeFilter, setTimeFilter] = useState<'week' | 'month'>('week')
  const [notifications, setNotifications] = useState(3)
  const [metrics, setMetrics] = useState<AIMetrics>({
    totalQuestions: 1247,
    doubtsResolved: 156,
    studyTime: 284,
    accuracy: 87.5,
    progress: 76,
    predictions: {
      examScore: 650,
      readiness: 82,
      rank: 1250
    }
  })

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'doubt',
      title: 'Cell Division Doubt Resolved',
      description: 'Explained mitosis vs meiosis with diagrams',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      success: true,
      icon: <Brain className="w-4 h-4" />
    },
    {
      id: '2',
      type: 'assessment',
      title: 'Genetics Mock Test',
      description: 'Score: 34/40 (85%)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      success: true,
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Weekly Goal Achieved',
      description: 'Completed 15 hours of study',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      success: true,
      icon: <Award className="w-4 h-4" />
    },
    {
      id: '4',
      type: 'study',
      title: 'Photosynthesis Notes',
      description: 'Generated personalized study material',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      success: true,
      icon: <BookOpen className="w-4 h-4" />
    }
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [showTestCreation, setShowTestCreation] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showRealTimeMetrics, setShowRealTimeMetrics] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string
    text: string
    sender: 'user' | 'ai'
    timestamp: Date
    type?: 'text' | 'explanation' | 'recommendation'
  }>>([])
  const [chatInput, setChatInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        doubtsResolved: prev.doubtsResolved + Math.floor(Math.random() * 2),
        studyTime: prev.studyTime + Math.floor(Math.random() * 5)
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Button handlers
  const handleNotifications = () => {
    alert('📢 You have 3 new notifications!\n\n1. New study recommendation available\n2. Biology quiz reminder\n3. Achievement unlocked: Study Streak!')
    setNotifications(0)
  }

  const handleSettings = () => {
    alert('⚙️ Settings panel would open here\n\nFeatures:\n• Notification preferences\n• Study goals\n• AI tutoring settings\n• Account management')
  }

  const handleViewDetails = () => {
    alert('📊 Detailed analytics view\n\nShowing:\n• Performance trends\n• Topic-wise breakdown\n• Study pattern analysis\n• Improvement suggestions')
  }

  const handleViewAll = () => {
    alert('📋 All activities view\n\nComplete history of:\n• Doubt sessions\n• Practice tests\n• Study materials\n• Achievements')
  }

  const handleStartConversation = async (message?: string, type?: 'text' | 'image' | 'voice', file?: File) => {
    if (message === 'start' || !showChatInterface) {
      setShowChatInterface(true)
      setActiveTab('tutor')

      // Add welcome message from AI
      const welcomeMessage = {
        id: `msg_${Date.now()}`,
        text: "Hello! I'm your enhanced Biology AI tutor. 🧬 I can help you with:\n\n📝 Text questions and explanations\n📸 Image analysis (diagrams, microscopy, specimens)\n🎤 Voice doubts and audio responses\n\nWhat would you like to learn about today?",
        sender: 'ai' as const,
        timestamp: new Date(),
        type: 'text' as const
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
      imageUrl: imageUrl
    }

    setChatMessages(prev => [...prev, userMessage])
    setIsChatLoading(true)

    try {
      // Call image analysis API
      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('question', message || 'Analyze this biology image')
      formData.append('context', 'NEET Biology')

      const response = await fetch('/api/ai/image-analysis', {
        method: 'POST',
        body: formData
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
          analysis: result.data.analysis
        }
        setChatMessages(prev => [...prev, aiMessage])
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
        type: 'text' as const
      }
      setChatMessages(prev => [...prev, errorMessage])
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
      type: 'voice' as const
    }

    setChatMessages(prev => [...prev, userMessage])
    setIsChatLoading(true)

    try {
      // Call voice processing API
      const formData = new FormData()
      formData.append('audio', audioFile)
      formData.append('action', 'transcribe_and_answer')
      formData.append('context', 'NEET Biology')

      const response = await fetch('/api/ai/voice-processing', {
        method: 'POST',
        body: formData
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
          type: 'text' as const
        }
        setChatMessages(prev => [...prev, transcriptionMessage])

        // Show AI response
        if (result.data.ai_response) {
          const aiMessage = {
            id: `msg_${Date.now()}_ai`,
            text: result.data.ai_response.text,
            sender: 'ai' as const,
            timestamp: new Date(),
            type: 'explanation' as const,
            audioUrl: result.data.audio_response ?
              `data:audio/mp3;base64,${result.data.audio_response.audio_base64}` : undefined
          }
          setChatMessages(prev => [...prev, aiMessage])
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
        type: 'text' as const
      }
      setChatMessages(prev => [...prev, errorMessage])
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
      type: 'text' as const
    }

    setChatMessages(prev => [...prev, userMessage])
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
              difficulty: 'intermediate'
            }
          }
        })
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
          type: 'explanation' as const
        }
        setChatMessages(prev => [...prev, aiMessage])

        // Add recommendations if available
        if (result.data.recommendations && result.data.recommendations.length > 0) {
          const recommendationMessage = {
            id: `msg_${Date.now()}_rec`,
            text: `📚 Study Recommendations:\n${result.data.recommendations.slice(0, 3).map((rec: string, i: number) => `${i + 1}. ${rec}`).join('\n')}`,
            sender: 'ai' as const,
            timestamp: new Date(),
            type: 'recommendation' as const
          }
          setTimeout(() => {
            setChatMessages(prev => [...prev, recommendationMessage])
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
        type: 'text' as const
      }
      setChatMessages(prev => [...prev, errorMessage])
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

      // Show initial message
      alert(`📝 Creating AI Test...\n\n• ${testConfig.totalQuestions} questions\n• ${testConfig.selectedTopics.length} topics selected\n• ${testConfig.difficultyDistribution.easy}% Easy, ${testConfig.difficultyDistribution.moderate}% Moderate, ${testConfig.difficultyDistribution.difficult}% Difficult\n\nGenerating your personalized NEET Biology test...`)

      // Call the test generation API
      const response = await fetch('/api/ai/test-generation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testConfig)
      })

      const result = await response.json()

      if (result.success) {
        const generatedTest = result.data

        alert(`✅ Test Generated Successfully!\n\n${generatedTest.title}\n\n📊 Test Details:\n• ${generatedTest.questions.length} questions generated\n• Estimated time: ${generatedTest.metadata.estimatedTime} minutes\n• Topics covered: ${generatedTest.metadata.topicCoverage.length}\n• Difficulty score: ${generatedTest.metadata.difficultyScore}/3.0\n• NEET alignment: ${generatedTest.metadata.neetAlignment}%\n\nYour personalized test is ready! Click OK to continue...`)

        // Update activity feed (in a real app, this would update the global activity state)
        console.log('New test generation activity:', {
          id: Date.now().toString(),
          type: 'assessment',
          title: generatedTest.title,
          description: `Generated ${generatedTest.questions.length}-question AI test`,
          timestamp: new Date(),
          success: true
        })

        // Update metrics
        setMetrics(prev => ({
          ...prev,
          totalQuestions: prev.totalQuestions + generatedTest.questions.length
        }))

        // Store the generated test (in a real app, this would go to a database)
        console.log('Generated test stored:', generatedTest)

      } else {
        alert(`❌ Test Generation Failed\n\nError: ${result.error || 'Unknown error occurred'}\n\nPlease try again with different settings.`)
      }
    } catch (error) {
      console.error('Test generation error:', error)
      alert('❌ Network Error\n\nFailed to generate test due to network issues.\nPlease check your connection and try again.')
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
    metrics: 'from-teal-500 to-cyan-500'
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
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm p-1 rounded-2xl mb-8 border border-white/20">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'tutor', label: 'AI Tutor', icon: Brain },
            { id: 'assessment', label: 'Assessment', icon: FileText },
            { id: 'testgen', label: 'Test Generation', icon: Zap },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'metrics', label: 'Live Metrics', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tabColors[tab.id as keyof typeof tabColors]} text-white shadow-lg transform scale-105`
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
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
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Doubts Resolved',
                    value: metrics.doubtsResolved,
                    change: '+12',
                    icon: Brain,
                    color: 'from-purple-500 to-pink-500',
                    bgColor: 'from-purple-50 to-pink-50'
                  },
                  {
                    title: 'Study Time',
                    value: `${metrics.studyTime}h`,
                    change: '+8h',
                    icon: Clock,
                    color: 'from-blue-500 to-cyan-500',
                    bgColor: 'from-blue-50 to-cyan-50'
                  },
                  {
                    title: 'Accuracy',
                    value: `${metrics.accuracy}%`,
                    change: '+2.5%',
                    icon: Target,
                    color: 'from-green-500 to-emerald-500',
                    bgColor: 'from-green-50 to-emerald-50'
                  },
                  {
                    title: 'Progress',
                    value: `${metrics.progress}%`,
                    change: '+5%',
                    icon: TrendingUp,
                    color: 'from-orange-500 to-red-500',
                    bgColor: 'from-orange-50 to-red-50'
                  }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${metric.bgColor} p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                          <span className="text-green-600 font-medium">{metric.change}</span>
                          <span className="text-gray-500 ml-1">this week</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Predictions */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                      AI Predictions
                    </h3>
                    <button
                      onClick={handleViewDetails}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: 'Predicted NEET Score',
                        value: metrics.predictions.examScore,
                        max: 720,
                        color: 'purple',
                        icon: GraduationCap
                      },
                      {
                        label: 'Exam Readiness',
                        value: metrics.predictions.readiness,
                        max: 100,
                        color: 'blue',
                        icon: CheckCircle
                      },
                      {
                        label: 'Expected Rank',
                        value: metrics.predictions.rank,
                        max: 10000,
                        color: 'green',
                        icon: Award,
                        isRank: true
                      }
                    ].map((prediction, index) => (
                      <motion.div
                        key={prediction.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="bg-white/80 rounded-xl p-4 border border-white/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <prediction.icon className={`w-5 h-5 text-${prediction.color}-500`} />
                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            {prediction.isRank ? 'Lower is Better' : 'Target'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{prediction.label}</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {prediction.isRank ? '#' : ''}{prediction.value}
                          {!prediction.isRank && prediction.max > 100 ? `/${prediction.max}` : ''}
                          {!prediction.isRank && prediction.max <= 100 ? '%' : ''}
                        </p>
                        {!prediction.isRank && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className={`bg-gradient-to-r from-${prediction.color}-400 to-${prediction.color}-600 h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${(prediction.value / prediction.max) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      { label: 'Ask AI Tutor', icon: MessageCircle, color: 'blue' },
                      { label: 'Take Practice Test', icon: FileText, color: 'green' },
                      { label: 'Study Materials', icon: BookOpen, color: 'purple' },
                      { label: 'Performance Analysis', icon: BarChart3, color: 'orange' }
                    ].map((action) => (
                      <button
                        key={action.label}
                        className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-${action.color}-500 to-${action.color}-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium`}
                      >
                        <action.icon className="w-4 h-4" />
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-green-500" />
                      Recent Activity
                    </h3>
                    <button
                      onClick={handleViewAll}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg border border-white/30 hover:shadow-md transition-shadow"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activity.type === 'doubt' ? 'bg-purple-100 text-purple-600' :
                          activity.type === 'assessment' ? 'bg-green-100 text-green-600' :
                          activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.description}
                          </p>
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
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-indigo-500" />
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { subject: 'Cell Biology', progress: 85, color: 'purple' },
                    { subject: 'Genetics', progress: 72, color: 'blue' },
                    { subject: 'Ecology', progress: 90, color: 'green' },
                    { subject: 'Physiology', progress: 68, color: 'orange' }
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
                            className={`text-${subject.color}-500 transition-all duration-1000`}
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
              style={{ pointerEvents: 'all' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Smart Assessment</h2>
                <p className="text-gray-600 mb-8">AI-generated tests adapted to your learning level</p>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Assessment tab Create Test button clicked - Generating real AI test')
                    handleCreateTest()
                  }}
                  disabled={isLoading}
                  className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ pointerEvents: 'all', zIndex: 10 }}
                >
                  {isLoading ? 'Generating Test...' : 'Create Test'}
                </button>
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
              style={{ pointerEvents: 'all' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Performance Analytics</h2>
                <p className="text-gray-600 mb-8">Deep insights into your learning patterns and progress</p>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Analytics View Analytics button clicked - Generating real AI analytics')
                    handleViewAnalytics()
                  }}
                  disabled={isLoading}
                  className={`bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ pointerEvents: 'all', zIndex: 10 }}
                >
                  {isLoading ? 'Analyzing Data...' : 'View Analytics'}
                </button>
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
              style={{ pointerEvents: 'all' }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-teal-500" />
                  Real-Time Performance Metrics
                </h2>
                <p className="text-gray-600">Live monitoring of system performance, user activity, and learning analytics</p>
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
        <ViewAnalytics
          isOpen={showAnalytics}
          onClose={() => setShowAnalytics(false)}
        />
      </div>
    </div>
  )
}

export default AIEducationDashboard