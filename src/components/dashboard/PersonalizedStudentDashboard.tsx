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

  // Mock data - in production, this would come from API
  const [neetProgress] = useState<NEETProgress>({
    currentScore: 485,
    targetScore: 540,
    improvement: +12,
    rank: 2847,
    percentile: 94.2,
    strongAreas: ['Cell Biology', 'Ecology', 'Human Physiology'],
    weakAreas: [
      {
        chapter: 'Genetics',
        topic: 'Molecular Basis of Inheritance',
        difficulty: 'high',
        improvement: -5,
        recommendedStudyTime: 120,
      },
      {
        chapter: 'Plant Physiology',
        topic: 'Photosynthesis',
        difficulty: 'medium',
        improvement: -3,
        recommendedStudyTime: 90,
      },
      {
        chapter: 'Evolution',
        topic: 'Molecular Evolution',
        difficulty: 'medium',
        improvement: -2,
        recommendedStudyTime: 75,
      },
    ],
  })

  const [recentSessions] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Biology',
      chapter: 'Cell Structure',
      duration: 45,
      score: 87,
      date: '2025-09-20',
      type: 'practice',
    },
    {
      id: '2',
      subject: 'Biology',
      chapter: 'Photosynthesis',
      duration: 60,
      score: 78,
      date: '2025-09-19',
      type: 'study',
    },
    {
      id: '3',
      subject: 'Biology',
      chapter: 'Genetics',
      duration: 90,
      score: 65,
      date: '2025-09-19',
      type: 'test',
    },
  ])

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

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your Learning Hub</h2>
          <p className="text-gray-600 mb-6">Please sign in to access your personalized dashboard</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
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
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
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
                    <span className="text-2xl font-bold text-gray-900">24h</span>
                  </div>
                  <div className="text-gray-600">Study Time (Week)</div>
                  <div className="text-sm text-green-600">+2.5h from last week</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">87%</span>
                  </div>
                  <div className="text-gray-600">Average Score</div>
                  <div className="text-sm text-green-600">+5% improvement</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <span className="text-2xl font-bold text-gray-900">12/15</span>
                  </div>
                  <div className="text-gray-600">Chapters Completed</div>
                  <div className="text-sm text-blue-600">3 remaining</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-purple-500" />
                    <span className="text-2xl font-bold text-gray-900">5</span>
                  </div>
                  <div className="text-gray-600">Study Streak (days)</div>
                  <div className="text-sm text-purple-600">Keep it up!</div>
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
                                : 'bg-purple-100'
                          }`}
                        >
                          {session.type === 'study' ? (
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          ) : session.type === 'practice' ? (
                            <Zap className="w-5 h-5 text-green-600" />
                          ) : (
                            <Target className="w-5 h-5 text-purple-600" />
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
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">🎯 Focus Study Session</h2>
                  <div className="text-6xl font-mono font-bold mb-6">{formatTime(studyTimer)}</div>
                  {currentSession && (
                    <div className="text-purple-200 mb-6">Studying: {currentSession}</div>
                  )}
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => startStudySession('Current Chapter')}
                      disabled={isStudying}
                      className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start</span>
                    </button>
                    <button
                      onClick={pauseStudySession}
                      disabled={!isStudying}
                      className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </button>
                    <button
                      onClick={stopStudySession}
                      className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
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
