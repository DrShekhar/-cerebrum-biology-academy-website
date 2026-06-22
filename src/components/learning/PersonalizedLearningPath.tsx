'use client'

import React, { useState, useEffect } from 'react'
import {
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Calendar,
  Brain,
  Zap,
  Trophy,
  Video,
  FileText,
  TestTube,
  Users,
} from 'lucide-react'
import {
  PersonalizedLearningEngine,
  type StudentProfile,
  type WeakArea,
  type LearningPath,
  type StudySession,
} from '@/lib/learning/PersonalizedLearningEngine'
import { useAuth } from '@/contexts/AuthContext'
import { BiologyScoreDisplay } from '@/components/ui/BiologyScoreDisplay'

export function PersonalizedLearningPath() {
  const { user, isAuthenticated } = useAuth()
  const [learningEngine] = useState(new PersonalizedLearningEngine())
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null)
  const [activeSession, setActiveSession] = useState<StudySession | null>(null)
  const [studyTimer, setStudyTimer] = useState(0)
  const [isStudying, setIsStudying] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [completedSessions, setCompletedSessions] = useState<string[]>([])

  // Real student profile — derived from the student's actual test performance
  // (/api/analytics/performance). No fabricated scores: until a student has
  // completed tests we show an onboarding empty state rather than fake data.
  const [loading, setLoading] = useState(true)
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    let cancelled = false
    if (!isAuthenticated || !user?.id) {
      setLoading(false)
      return
    }

    async function loadProfile() {
      try {
        const res = await fetch(`/api/analytics/performance?userId=${user!.id}&period=quarter`)
        const json = await res.json().catch(() => null)
        const data = json?.data
        const topics: Array<{ topic: string; accuracy: number; totalQuestions: number }> =
          data?.topicPerformance || []
        const completedTests = data?.completedTests ?? data?.totalTests ?? 0

        // No real performance yet → honest empty state, never fabricated numbers.
        if (!data || completedTests === 0 || topics.length === 0) {
          if (!cancelled) {
            setNoData(true)
            setLoading(false)
          }
          return
        }

        const avgAccuracy: number = Math.round(data.averageScore ?? 0) // percent
        // NEET-720 estimate from accuracy — a derived estimate, clearly not a claimed rank.
        const currentScore = Math.round((avgAccuracy / 100) * 720)
        const targetScore = Math.min(720, Math.max(currentScore + 60, 600))

        const weakAreas: WeakArea[] = topics
          .filter((t) => t.accuracy < 60 && t.totalQuestions >= 3)
          .sort((a, b) => a.accuracy - b.accuracy)
          .slice(0, 5)
          .map((t) => ({
            chapter: t.topic,
            topic: t.topic,
            difficulty: t.accuracy < 40 ? 'high' : t.accuracy < 55 ? 'medium' : 'low',
            currentScore: Math.round(t.accuracy),
            targetScore: Math.min(90, Math.round(t.accuracy) + 20),
            priorityLevel: Math.max(1, Math.min(10, Math.round((100 - t.accuracy) / 10))),
            estimatedStudyTime: 20,
            recommendedDailyTime: 60,
            improvement: 0,
            lastPracticed: new Date().toISOString(),
          }))

        const profile: StudentProfile = {
          id: user!.id,
          name: user!.name || 'Student',
          email: user!.email || '',
          currentScore,
          targetScore,
          timeToExam: 180,
          studyHoursPerDay: 4,
          learningStyle: 'visual',
          preferredDifficulty: 'mixed',
          strongAreas: (data.strengths as string[]) || [],
          weakAreas,
          completedChapters: [],
          currentStreak: data.currentStreak ?? 0,
          totalStudyTime: Math.round((data.totalStudyTime ?? 0) / 60), // seconds → minutes
        }

        const path = learningEngine.generateLearningPath(profile)
        if (!cancelled) {
          setCurrentPath(path)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setNoData(true)
          setLoading(false)
        }
      }
    }

    loadProfile()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user, learningEngine])

  // Study timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStudying && activeSession) {
      interval = setInterval(() => {
        setStudyTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStudying, activeSession])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startSession = (session: StudySession) => {
    setActiveSession(session)
    setIsStudying(true)
    setStudyTimer(0)
  }

  const pauseSession = () => {
    setIsStudying(false)
  }

  const completeSession = (sessionId: string) => {
    setCompletedSessions((prev) => [...prev, sessionId])
    setActiveSession(null)
    setIsStudying(false)
    setStudyTimer(0)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'text':
        return <FileText className="w-4 h-4" />
      case 'practice':
        return <TestTube className="w-4 h-4" />
      case 'test':
        return <Target className="w-4 h-4" />
      case 'interactive':
        return <Users className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'study':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'practice':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'test':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'revision':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDailySchedule = () => {
    if (!currentPath) return []
    return learningEngine.generateDailySchedule(currentPath, selectedDate + 'T00:00:00Z')
  }

  const getProgressAnalytics = () => {
    if (!currentPath) return null
    return learningEngine.getProgressAnalytics(currentPath, completedSessions)
  }

  const dailySchedule = getDailySchedule()
  const analytics = getProgressAnalytics()

  // No real performance data yet → honest onboarding state (never fabricated scores).
  if (!isAuthenticated || (!loading && (noData || !currentPath))) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {!isAuthenticated ? 'Sign in to see your learning path' : 'Your learning path is ready to begin'}
          </h2>
          <p className="text-gray-600 mb-6">
            {!isAuthenticated
              ? 'Log in to generate a study plan personalised to your test performance.'
              : 'Take your first practice test and we’ll build a personalised study plan from your real results — strong areas, focus areas and a day-by-day schedule.'}
          </p>
          <a
            href={!isAuthenticated ? '/sign-in' : '/neet-biology-mcq-practice'}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700"
          >
            {!isAuthenticated ? 'Sign in' : 'Take a practice test'}
          </a>
        </div>
      </div>
    )
  }

  // Loading real data.
  if (loading || !currentPath) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Building your learning path</h2>
          <p className="text-gray-600 mb-6">
            Analysing your test performance to personalise your plan…
          </p>
          <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🎯 Your Personalized Learning Path
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                AI-powered study plan designed to achieve your target of{' '}
                <span className="inline-flex">
                  <BiologyScoreDisplay
                    currentScore={Math.round(studentProfile.targetScore / 2)}
                    maxScore={360}
                    showLabel={false}
                    showPercentage={false}
                    size="sm"
                    className="inline-flex"
                  />
                </span>
                <span className="text-sm text-gray-500">
                  (Total: {studentProfile.targetScore}/720)
                </span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Confidence Score</div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(currentPath.confidenceScore * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">
                {analytics?.overallProgress.toFixed(1)}%
              </span>
            </div>
            <div className="text-gray-600">Overall Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${analytics?.overallProgress || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {analytics?.projectedScore || 0}
              </span>
            </div>
            <div className="text-gray-600">Projected Score</div>
            <div className="text-sm text-green-600">
              +{(analytics?.projectedScore || 0) - studentProfile.currentScore} from current
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(currentPath.totalDuration / 60)}h
              </span>
            </div>
            <div className="text-gray-600">Total Study Time</div>
            <div className="text-sm text-purple-600">
              {Math.round(analytics?.timeUtilization || 0)}% utilized
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (new Date(currentPath.estimatedCompletion).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </span>
            </div>
            <div className="text-gray-600">Days to Complete</div>
            <div className="text-sm text-orange-600">
              Target: {new Date(currentPath.estimatedCompletion).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Active Study Session */}
        {activeSession && (
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 animate-fadeInUp">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                📚 Active Study Session: {activeSession.topic}
              </h2>
              <div className="text-5xl font-mono font-bold mb-6">{formatTime(studyTimer)}</div>
              <div className="text-purple-200 mb-6">
                Target Duration: {activeSession.duration} minutes
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={pauseSession}
                  disabled={!isStudying}
                  className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={() => setIsStudying(true)}
                  disabled={isStudying}
                  className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                >
                  <Play className="w-5 h-5" />
                  <span>Resume</span>
                </button>
                <button
                  onClick={() => completeSession(activeSession.id)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Complete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Daily Schedule */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-6 h-6 text-blue-500 mr-2" />
                  Daily Schedule
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-4">
                {dailySchedule.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No sessions scheduled for this date</p>
                    <p className="text-sm">Select a different date or check back later</p>
                  </div>
                ) : (
                  dailySchedule.map((session, index) => (
                    <div
                      key={session.id}
                      className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                        completedSessions.includes(session.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-600">
                            {new Date(session.scheduledTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs border ${getSessionTypeColor(session.type)}`}
                          >
                            {session.type}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{session.topic}</div>
                            <div className="text-sm text-gray-600">{session.chapter}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{session.duration}min</span>
                          {completedSessions.includes(session.id) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <button
                              onClick={() => startSession(session)}
                              disabled={!!activeSession}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Start
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Session Resources */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {session.resources.map((resource, resourceIndex) => (
                          <div
                            key={resourceIndex}
                            className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-600"
                          >
                            {getResourceIcon(resource.type)}
                            <span>{resource.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Milestones */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                Upcoming Milestones
              </h3>
              <div className="space-y-3">
                {currentPath.milestones.slice(0, 3).map((milestone, index) => (
                  <div key={milestone.id} className="p-3 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-gray-900">{milestone.title}</div>
                    <div className="text-sm text-gray-600">{milestone.description}</div>
                    <div className="text-xs text-yellow-600 mt-1">
                      Due: {new Date(milestone.targetDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Areas Focus */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                Priority Areas
              </h3>
              <div className="space-y-3">
                {studentProfile.weakAreas.slice(0, 3).map((area, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-medium text-gray-900">{area.chapter}</div>
                    <div className="text-sm text-gray-600">{area.topic}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-orange-600">
                        {area.currentScore}% → {area.targetScore}%
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
                  </div>
                ))}
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 text-purple-500 mr-2" />
                Study Streak
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {studentProfile.currentStreak}
                </div>
                <div className="text-sm text-gray-600">Days in a row!</div>
                <div className="text-xs text-purple-600 mt-2">Keep it going! 🔥</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
