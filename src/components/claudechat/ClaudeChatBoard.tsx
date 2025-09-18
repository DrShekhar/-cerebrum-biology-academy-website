/**
 * ClaudeChat Board - Revolutionary AI-Powered Education Platform
 * The "iPhone of Education" - Complete integrated learning experience
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Camera,
  Mic,
  MessageSquare,
  BookOpen,
  Users,
  TrendingUp,
  Settings,
  Bell,
  Award,
  Target,
  Brain,
  Zap,
  Heart,
  Star,
} from 'lucide-react'

import ARBiologyLab from './ARBiologyLab'
import VoiceChat from './VoiceChat'
import DigitalWhiteboard from './DigitalWhiteboard'

interface StudySession {
  id: string
  startTime: Date
  endTime?: Date
  topicsStudied: string[]
  questionsAsked: number
  conceptsMastered: number
  timeSpent: number
  engagement: number
}

interface StudentProgress {
  totalStudyTime: number
  conceptsMastered: number
  neetScore: number
  weakAreas: string[]
  strongAreas: string[]
  motivationLevel: number
  confidenceLevel: number
}

interface ClaudeChatBoardProps {
  studentId: string
  studentName: string
  onSessionComplete?: (session: StudySession) => void
}

export function ClaudeChatBoard({
  studentId,
  studentName,
  onSessionComplete,
}: ClaudeChatBoardProps) {
  const [activeTab, setActiveTab] = useState<'voice' | 'ar' | 'whiteboard' | 'dashboard'>('voice')
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null)
  const [studentProgress, setStudentProgress] = useState<StudentProgress>({
    totalStudyTime: 0,
    conceptsMastered: 0,
    neetScore: 0,
    weakAreas: [],
    strongAreas: [],
    motivationLevel: 0.8,
    confidenceLevel: 0.7,
  })
  const [aiPersonality, setAiPersonality] = useState<
    'motivational-coach' | 'study-partner' | 'exam-warrior'
  >('study-partner')
  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string; type: 'success' | 'info' | 'warning' }>
  >([])

  // Start new study session
  const startSession = () => {
    const session: StudySession = {
      id: `session_${Date.now()}`,
      startTime: new Date(),
      topicsStudied: [],
      questionsAsked: 0,
      conceptsMastered: 0,
      timeSpent: 0,
      engagement: 0,
    }

    setCurrentSession(session)
    addNotification('Study session started! 🚀', 'success')
  }

  // End study session
  const endSession = () => {
    if (!currentSession) return

    const completedSession: StudySession = {
      ...currentSession,
      endTime: new Date(),
      timeSpent: Math.round(
        (new Date().getTime() - currentSession.startTime.getTime()) / 1000 / 60
      ), // minutes
    }

    setCurrentSession(null)
    onSessionComplete?.(completedSession)
    addNotification(
      `Great session! You studied for ${completedSession.timeSpent} minutes 🎉`,
      'success'
    )
  }

  // Add notification
  const addNotification = (message: string, type: 'success' | 'info' | 'warning') => {
    const notification = {
      id: `notif_${Date.now()}`,
      message,
      type,
    }

    setNotifications((prev) => [notification, ...prev.slice(0, 4)])

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
    }, 5000)
  }

  // Handle voice message
  const handleVoiceMessage = (message: any) => {
    if (currentSession) {
      setCurrentSession((prev) =>
        prev
          ? {
              ...prev,
              questionsAsked: prev.questionsAsked + 1,
            }
          : null
      )
    }
  }

  // Handle AR detection
  const handleARDetection = (detection: any) => {
    if (currentSession && !currentSession.topicsStudied.includes(detection.concept)) {
      setCurrentSession((prev) =>
        prev
          ? {
              ...prev,
              topicsStudied: [...prev.topicsStudied, detection.concept],
              conceptsMastered: prev.conceptsMastered + 1,
            }
          : null
      )
    }

    addNotification(`New concept detected: ${detection.concept}`, 'info')
  }

  // Calculate engagement score
  const calculateEngagement = (): number => {
    if (!currentSession) return 0

    const timeActive = (new Date().getTime() - currentSession.startTime.getTime()) / 1000 / 60
    const questionsPerMinute = timeActive > 0 ? currentSession.questionsAsked / timeActive : 0

    return Math.min(1, questionsPerMinute * 0.5 + currentSession.conceptsMastered * 0.1)
  }

  // Get motivation message
  const getMotivationMessage = (): string => {
    const hour = new Date().getHours()
    const engagement = calculateEngagement()

    if (hour < 12) {
      return 'Good morning, champion! Ready to conquer Biology today? 🌅'
    } else if (hour < 17) {
      return "Afternoon power session! You're doing amazing! ⚡"
    } else {
      return 'Evening excellence! Every minute counts for NEET success! 🌟'
    }
  }

  // Tab configuration
  const tabs = [
    {
      id: 'voice' as const,
      name: 'Voice Chat',
      icon: Mic,
      description: 'Ask questions in English, Hindi, or Hinglish',
    },
    {
      id: 'ar' as const,
      name: 'AR Lab',
      icon: Camera,
      description: 'Point camera at diagrams for instant explanations',
    },
    {
      id: 'whiteboard' as const,
      name: 'Whiteboard',
      icon: MessageSquare,
      description: 'Draw and collaborate on biology diagrams',
    },
    {
      id: 'dashboard' as const,
      name: 'Progress',
      icon: TrendingUp,
      description: 'Track your learning journey',
    },
  ]

  return (
    <div className="claudechat-board min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center space-x-2">
                <Brain className="w-8 h-8" />
                <span>ClaudeChat Board</span>
              </h1>
              <p className="opacity-90">Revolutionary AI-Powered Biology Learning</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Student Info */}
              <div className="text-right">
                <div className="font-medium">Hello, {studentName}! 👋</div>
                <div className="text-sm opacity-90">{getMotivationMessage()}</div>
              </div>

              {/* Session Status */}
              {currentSession ? (
                <button
                  onClick={endSession}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  End Session
                </button>
              ) : (
                <button
                  onClick={startSession}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Start Learning
                </button>
              )}

              {/* Notifications */}
              <div className="relative">
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Session Info */}
          {currentSession && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">{currentSession.questionsAsked}</div>
                  <div className="text-sm opacity-90">Questions Asked</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{currentSession.conceptsMastered}</div>
                  <div className="text-sm opacity-90">Concepts Learned</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {Math.round(
                      (new Date().getTime() - currentSession.startTime.getTime()) / 1000 / 60
                    )}
                    m
                  </div>
                  <div className="text-sm opacity-90">Study Time</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {Math.round(calculateEngagement() * 100)}%
                  </div>
                  <div className="text-sm opacity-90">Engagement</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg shadow-lg max-w-sm ${
                notification.type === 'success'
                  ? 'bg-green-500 text-white'
                  : notification.type === 'warning'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-blue-500 text-white'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'voice' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎤 Voice Chat with Shekhar Sir
              </h2>
              <p className="text-gray-600 mb-8">
                Ask any Biology question in English, Hindi, or Hinglish and get instant explanations
                in Shekhar Sir's voice
              </p>
            </div>
            <VoiceChat onMessage={handleVoiceMessage} defaultLanguage="english" autoSpeak={true} />
          </div>
        )}

        {activeTab === 'ar' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">📱 AR Biology Lab</h2>
              <p className="text-gray-600 mb-8">
                Point your camera at any Biology diagram or real object to see AI-powered overlays
                and explanations
              </p>
            </div>
            <ARBiologyLab
              onDetection={handleARDetection}
              onVoiceExplanation={(audioUrl) => console.log('Voice explanation:', audioUrl)}
            />
          </div>
        )}

        {activeTab === 'whiteboard' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">✏️ Interactive Whiteboard</h2>
              <p className="text-gray-600 mb-8">
                Draw Biology diagrams, take notes, and collaborate with other students in real-time
              </p>
            </div>
            <DigitalWhiteboard
              roomId={`room_${studentId}`}
              isCollaborative={true}
              onSave={(data) => console.log('Whiteboard saved:', data)}
              onVoiceAnnotation={(annotation) =>
                addNotification(`Voice note: ${annotation}`, 'info')
              }
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Learning Progress</h2>
              <p className="text-gray-600 mb-8">
                Track your Biology mastery journey and NEET preparation progress
              </p>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {studentProgress.conceptsMastered}
                    </div>
                    <div className="text-sm text-gray-600">Concepts Mastered</div>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {studentProgress.totalStudyTime}h
                    </div>
                    <div className="text-sm text-gray-600">Total Study Time</div>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {studentProgress.neetScore}
                    </div>
                    <div className="text-sm text-gray-600">Predicted NEET Score</div>
                  </div>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {Math.round(studentProgress.motivationLevel * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Motivation Level</div>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* AI Personality Selector */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🤖 AI Study Buddy Personality
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 'motivational-coach' as const,
                    name: 'Motivational Coach',
                    description: 'High energy, encouraging, celebrates every achievement',
                    emoji: '🔥',
                  },
                  {
                    id: 'study-partner' as const,
                    name: 'Study Partner',
                    description: 'Friendly, supportive, learns alongside you',
                    emoji: '📚',
                  },
                  {
                    id: 'exam-warrior' as const,
                    name: 'Exam Warrior',
                    description: 'Focused, strategic, optimizes for NEET success',
                    emoji: '⚔️',
                  },
                ].map((personality) => (
                  <div
                    key={personality.id}
                    onClick={() => setAiPersonality(personality.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      aiPersonality === personality.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{personality.emoji}</div>
                    <div className="font-medium text-gray-900">{personality.name}</div>
                    <div className="text-sm text-gray-600">{personality.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Recent Achievements</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'First Voice Question',
                    description: 'Asked your first question using voice chat',
                    earned: true,
                  },
                  {
                    title: 'AR Explorer',
                    description: 'Used AR Lab to analyze biology diagrams',
                    earned: true,
                  },
                  {
                    title: 'Study Streak',
                    description: 'Studied for 7 days in a row',
                    earned: false,
                  },
                  {
                    title: 'Concept Master',
                    description: 'Mastered 50 biology concepts',
                    earned: false,
                  },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    >
                      {achievement.earned ? (
                        <Star className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-600'}`}
                      >
                        {achievement.title}
                      </div>
                      <div
                        className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}
                      >
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {!currentSession && (
        <button
          onClick={startSession}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <Zap className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  )
}

export default ClaudeChatBoard
