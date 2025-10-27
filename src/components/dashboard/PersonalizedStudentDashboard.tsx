'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  AlertTriangle,
  Brain,
  Calendar,
  CheckCircle,
  BarChart3,
  Zap,
  Users,
  MessageCircle,
  Video,
  Download,
  Bell,
  Settings,
  Star,
  Trophy,
  Timer,
  PieChart,
  Activity,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface StudySession {
  id: string
  subject: string
  chapter: string
  duration: number
  score?: number
  date: string
  type: 'study' | 'practice' | 'test'
}

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

interface NEETProgress {
  currentScore: number
  targetScore: number
  improvement: number
  rank: number
  percentile: number
  strongAreas: string[]
  weakAreas: WeakArea[]
}

export function PersonalizedStudentDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [studyTimer, setStudyTimer] = useState(0)
  const [isStudying, setIsStudying] = useState(false)
  const [currentSession, setCurrentSession] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [freeUserId, setFreeUserId] = useState<string | null>(null)

  // Real data from API
  const [neetProgress, setNeetProgress] = useState<NEETProgress>({
    currentScore: 0,
    targetScore: 540,
    improvement: 0,
    rank: 0,
    percentile: 0,
    strongAreas: [],
    weakAreas: [],
  })

  const [recentSessions, setRecentSessions] = useState<StudySession[]>([])

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

  // Fetch test attempts and calculate progress
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true)
        const userId = user?.id || freeUserId
        if (!userId) return

        // Fetch test attempts
        const attemptsResponse = await fetch(`/api/test-attempts?freeUserId=${userId}`)
        const attemptsData = await attemptsResponse.json()

        // Fetch test sessions
        const sessionsResponse = await fetch(`/api/test-sessions?freeUserId=${userId}`)
        const sessionsData = await sessionsResponse.json()

        if (attemptsData.success && attemptsData.data.attempts.length > 0) {
          const attempts = attemptsData.data.attempts

          // Calculate average score and improvement
          const scores = attempts.map((a: any) => a.score)
          const avgScore = Math.round(
            scores.reduce((a: number, b: number) => a + b, 0) / scores.length
          )
          const latestScore = scores[0]
          const previousScore = scores.length > 1 ? scores[1] : latestScore
          const improvement = latestScore - previousScore

          // Collect all strength and weakness areas
          const allStrongAreas = new Set<string>()
          const allWeakAreas = new Map<string, { count: number; topics: Set<string> }>()

          attempts.forEach((attempt: any) => {
            attempt.strengthAreas?.forEach((area: string) => allStrongAreas.add(area))
            attempt.weaknessAreas?.forEach((area: string) => {
              if (!allWeakAreas.has(area)) {
                allWeakAreas.set(area, { count: 0, topics: new Set() })
              }
              const weakArea = allWeakAreas.get(area)!
              weakArea.count++
            })
          })

          // Build weak areas with recommendations
          const weakAreas: WeakArea[] = Array.from(allWeakAreas.entries())
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 5)
            .map(([chapter, data]) => ({
              chapter,
              topic: 'Multiple concepts',
              difficulty: data.count >= 3 ? 'high' : data.count >= 2 ? 'medium' : 'low',
              improvement: -data.count,
              recommendedStudyTime: data.count * 30,
            }))

          setNeetProgress({
            currentScore: avgScore,
            targetScore: 540,
            improvement,
            rank: attempts[0]?.rank || 0,
            percentile: attempts[0]?.percentage || 0,
            strongAreas: Array.from(allStrongAreas).slice(0, 5),
            weakAreas,
          })

          // Transform sessions to study sessions format
          const transformedSessions = attempts.slice(0, 5).map((attempt: any) => ({
            id: attempt.id,
            subject: 'Biology',
            chapter: attempt.testTemplate.title,
            duration: Math.round(attempt.timeSpent / 60),
            score: attempt.percentage,
            date: attempt.createdAt,
            type:
              attempt.testTemplate.type === 'PRACTICE_TEST'
                ? 'practice'
                : attempt.testTemplate.type === 'MOCK_TEST'
                  ? 'test'
                  : 'study',
          }))

          setRecentSessions(transformedSessions)
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setIsLoading(false)
      }
    }

    if (user?.id || freeUserId) {
      fetchDashboardData()
    }
  }, [user?.id, freeUserId])

  // Study Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStudying])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startStudySession = (chapter: string) => {
    setCurrentSession(chapter)
    setIsStudying(true)
    setStudyTimer(0)
  }

  const pauseStudySession = () => {
    setIsStudying(false)
  }

  const stopStudySession = () => {
    setIsStudying(false)
    setStudyTimer(0)
    setCurrentSession('')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading your dashboard data...</p>
        </div>
      </div>
    )
  }

  // Empty state - no tests taken yet
  if (recentSessions.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 via-teal-50 to-gold-50">
        <div className="bg-white shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.name || 'Student'}! 🎓
                </h1>
                <p className="text-gray-600">Start your NEET Biology mastery journey</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-navy-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Take your first practice test to unlock personalized insights, track your progress,
              and master NEET Biology concepts with our AI-powered learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/mock-tests"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-navy-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Target className="w-5 h-5 mr-2" />
                Take Your First Test
              </a>
              <a
                href="/practice"
                className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-teal-600 hover:text-teal-600 transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Practice Questions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-teal-50 to-gold-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name || 'Student'}! 🎓
                </h1>
                <p className="text-gray-600">Your NEET Biology mastery journey continues</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Current Score</div>
                <div className="text-2xl font-bold text-blue-600">
                  {neetProgress.currentScore}/720
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Rank</div>
                <div className="text-2xl font-bold text-green-600">#{neetProgress.rank}</div>
              </div>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
              { id: 'study', label: 'Study Session', icon: BookOpen },
              { id: 'weak-areas', label: 'Weak Areas', icon: AlertTriangle },
              { id: 'practice', label: 'Practice Tests', icon: Target },
              { id: 'schedule', label: 'Study Schedule', icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* NEET Score Prediction Card */}
              <div className="bg-gradient-to-r from-teal-600 to-navy-700 rounded-2xl p-8 text-white">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">🎯 NEET Score Prediction</h3>
                    <div className="space-y-2">
                      <div className="text-blue-100">Current Biology Score</div>
                      <div className="text-4xl font-bold">{neetProgress.currentScore}/720</div>
                      <div className="flex items-center space-x-2">
                        <ArrowUp className="w-4 h-4 text-green-300" />
                        <span className="text-green-300">
                          +{neetProgress.improvement} from last test
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Target Progress</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress to Target (540/720)</span>
                          <span>
                            {Math.round(
                              (neetProgress.currentScore / neetProgress.targetScore) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-blue-400 rounded-full h-3">
                          <div
                            className="bg-white h-3 rounded-full transition-all duration-1000"
                            style={{
                              width: `${Math.min((neetProgress.currentScore / neetProgress.targetScore) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-blue-100">
                        {neetProgress.targetScore - neetProgress.currentScore} marks to target
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">National Ranking</h4>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">#{neetProgress.rank}</div>
                      <div className="text-blue-100">{neetProgress.percentile}th percentile</div>
                      <div className="text-blue-100">Top 5.8% nationally</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-blue-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.round(recentSessions.reduce((acc, s) => acc + s.duration, 0) / 60)}h
                    </span>
                  </div>
                  <div className="text-gray-600">Total Study Time</div>
                  <div className="text-sm text-blue-600">{recentSessions.length} sessions</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {neetProgress.percentile}%
                    </span>
                  </div>
                  <div className="text-gray-600">Average Score</div>
                  <div
                    className={`text-sm ${neetProgress.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {neetProgress.improvement >= 0 ? '+' : ''}
                    {neetProgress.improvement} from last test
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-green-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {recentSessions.length}
                    </span>
                  </div>
                  <div className="text-gray-600">Tests Completed</div>
                  <div className="text-sm text-green-600">
                    {neetProgress.strongAreas.length} strong areas
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-teal-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      {neetProgress.rank || '-'}
                    </span>
                  </div>
                  <div className="text-gray-600">National Rank</div>
                  <div className="text-sm text-teal-600">
                    {neetProgress.percentile}th percentile
                  </div>
                </div>
              </div>

              {/* Strong Areas & Weak Areas */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star className="w-6 h-6 text-yellow-500 mr-2" />
                    Strong Areas
                  </h3>
                  <div className="space-y-4">
                    {neetProgress.strongAreas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="font-medium text-gray-900">{area}</span>
                        </div>
                        <span className="text-green-600 font-semibold">85%+</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-4">
                    {neetProgress.weakAreas.slice(0, 3).map((area, index) => (
                      <div key={index} className="p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{area.chapter}</span>
                          <span
                            className={`text-sm px-2 py-1 rounded ${
                              area.difficulty === 'high'
                                ? 'bg-red-100 text-red-600'
                                : area.difficulty === 'medium'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {area.difficulty}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{area.topic}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Recommended: {area.recommendedStudyTime} min/day
                          </span>
                          <button
                            onClick={() => startStudySession(area.chapter)}
                            className="text-blue-600 text-sm hover:underline"
                          >
                            Start Practice →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-6 h-6 text-blue-500 mr-2" />
                  Recent Study Sessions
                </h3>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${
                            session.type === 'study'
                              ? 'bg-blue-100'
                              : session.type === 'practice'
                                ? 'bg-green-100'
                                : 'bg-navy-100'
                          }`}
                        >
                          {session.type === 'study' ? (
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          ) : session.type === 'practice' ? (
                            <Zap className="w-5 h-5 text-green-600" />
                          ) : (
                            <Target className="w-5 h-5 text-navy-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{session.chapter}</div>
                          <div className="text-sm text-gray-600">
                            {session.duration} min • {session.type} •{' '}
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {session.score && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{session.score}%</div>
                          <div className="text-sm text-gray-600">Score</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'study' && (
            <motion.div
              key="study"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Study Timer */}
              <div className="bg-gradient-to-r from-navy-600 to-teal-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">🎯 Focus Study Session</h2>
                  <div className="text-6xl font-mono font-bold mb-6">{formatTime(studyTimer)}</div>
                  {currentSession && (
                    <div className="text-teal-200 mb-6">Studying: {currentSession}</div>
                  )}
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => startStudySession('Current Chapter')}
                      disabled={isStudying}
                      className="flex items-center space-x-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start</span>
                    </button>
                    <button
                      onClick={pauseStudySession}
                      disabled={!isStudying}
                      className="flex items-center space-x-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </button>
                    <button
                      onClick={stopStudySession}
                      className="flex items-center space-x-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Study Options */}
              <div className="grid md:grid-cols-3 gap-6">
                {neetProgress.weakAreas.map((area, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{area.chapter}</h3>
                    <p className="text-gray-600 mb-4">{area.topic}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        Recommended: {area.recommendedStudyTime} min
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          area.difficulty === 'high'
                            ? 'bg-red-100 text-red-600'
                            : area.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {area.difficulty}
                      </span>
                    </div>
                    <button
                      onClick={() => startStudySession(area.chapter)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Session
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
