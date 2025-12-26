/**
 * Social Learning & Gamification - Viral features for student engagement
 * Study streaks, leaderboards, peer challenges, and social proof elements
 */

'use client'

import React, { useState, useEffect } from 'react'
import {
  Users,
  Trophy,
  Flame,
  Star,
  Zap,
  Target,
  Award,
  MessageCircle,
  Share2,
  Heart,
  Clock,
  TrendingUp,
} from 'lucide-react'

interface StudyStreak {
  currentStreak: number
  longestStreak: number
  lastStudyDate: string
  streakType: 'daily' | 'weekly'
}

interface Leaderboard {
  rank: number
  studentId: string
  name: string
  points: number
  avatar: string
  streakDays: number
  conceptsMastered: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  progress: number
  maxProgress: number
  category: 'study' | 'social' | 'mastery' | 'streak'
}

interface Challenge {
  id: string
  title: string
  description: string
  type: 'individual' | 'group'
  participants: number
  timeLeft: string
  reward: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

interface SocialLearningProps {
  studentId: string
  studentName: string
  currentPoints: number
  onChallengeJoin?: (challengeId: string) => void
  onStreakUpdate?: (streak: StudyStreak) => void
}

export function SocialLearning({
  studentId,
  studentName,
  currentPoints,
  onChallengeJoin,
  onStreakUpdate,
}: SocialLearningProps) {
  const [activeTab, setActiveTab] = useState<
    'streaks' | 'leaderboard' | 'achievements' | 'challenges'
  >('streaks')
  const [studyStreak, setStudyStreak] = useState<StudyStreak>({
    currentStreak: 12,
    longestStreak: 25,
    lastStudyDate: new Date().toISOString(),
    streakType: 'daily',
  })

  // Mock data - in production, fetch from API
  const [leaderboard] = useState<Leaderboard[]>([
    {
      rank: 1,
      studentId: '1',
      name: 'Priya Sharma',
      points: 2847,
      avatar: '👩‍🎓',
      streakDays: 23,
      conceptsMastered: 156,
    },
    {
      rank: 2,
      studentId: '2',
      name: 'Arjun Patel',
      points: 2634,
      avatar: '👨‍🎓',
      streakDays: 18,
      conceptsMastered: 142,
    },
    {
      rank: 3,
      studentId: '3',
      name: 'Ananya Singh',
      points: 2421,
      avatar: '👩‍🎓',
      streakDays: 15,
      conceptsMastered: 134,
    },
    {
      rank: 4,
      studentId: studentId,
      name: studentName,
      points: currentPoints,
      avatar: '🧑‍🎓',
      streakDays: studyStreak.currentStreak,
      conceptsMastered: 89,
    },
    {
      rank: 5,
      studentId: '5',
      name: 'Rohit Kumar',
      points: 2156,
      avatar: '👨‍🎓',
      streakDays: 11,
      conceptsMastered: 98,
    },
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: 'first_voice',
      title: 'Voice Pioneer',
      description: 'Asked your first question using voice chat',
      icon: '🎤',
      unlockedAt: new Date(),
      progress: 1,
      maxProgress: 1,
      category: 'study',
    },
    {
      id: 'ar_explorer',
      title: 'AR Explorer',
      description: 'Used AR Lab to analyze 10 biology diagrams',
      icon: '📱',
      unlockedAt: new Date(),
      progress: 10,
      maxProgress: 10,
      category: 'study',
    },
    {
      id: 'streak_master',
      title: 'Streak Master',
      description: 'Maintain a 30-day study streak',
      icon: '🔥',
      progress: studyStreak.currentStreak,
      maxProgress: 30,
      category: 'streak',
    },
    {
      id: 'concept_crusher',
      title: 'Concept Crusher',
      description: 'Master 100 biology concepts',
      icon: '🧠',
      progress: 89,
      maxProgress: 100,
      category: 'mastery',
    },
    {
      id: 'social_butterfly',
      title: 'Social Butterfly',
      description: 'Help 5 friends with their doubts',
      icon: '🦋',
      progress: 3,
      maxProgress: 5,
      category: 'social',
    },
    {
      id: 'neet_warrior',
      title: 'NEET Warrior',
      description: 'Score 95%+ in 5 practice tests',
      icon: '⚔️',
      progress: 2,
      maxProgress: 5,
      category: 'mastery',
    },
  ])

  const [challenges] = useState<Challenge[]>([
    {
      id: 'weekly_photosynthesis',
      title: 'Photosynthesis Challenge',
      description: 'Master all aspects of photosynthesis this week',
      type: 'group',
      participants: 156,
      timeLeft: '3 days',
      reward: '500 points + Badge',
      difficulty: 'medium',
      category: 'Plant Biology',
    },
    {
      id: 'human_anatomy_sprint',
      title: 'Human Anatomy Sprint',
      description: 'Complete 50 anatomy questions in 2 hours',
      type: 'individual',
      participants: 1,
      timeLeft: '1 day',
      reward: '300 points',
      difficulty: 'hard',
      category: 'Human Biology',
    },
    {
      id: 'genetics_puzzle',
      title: 'Genetics Puzzle Master',
      description: 'Solve complex inheritance patterns',
      type: 'group',
      participants: 89,
      timeLeft: '5 days',
      reward: '750 points + Special Badge',
      difficulty: 'hard',
      category: 'Genetics',
    },
  ])

  // Calculate streak status
  const getStreakStatus = () => {
    const today = new Date()
    const lastStudy = new Date(studyStreak.lastStudyDate)
    const daysDiff = Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === 0) return { status: 'active', message: 'Keep it going! 🔥' }
    if (daysDiff === 1) return { status: 'warning', message: 'Study today to maintain streak! ⚠️' }
    return { status: 'broken', message: 'Streak broken. Start fresh! 💪' }
  }

  const streakStatus = getStreakStatus()

  // Get rank color
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600'
    if (rank === 2) return 'text-gray-600'
    if (rank === 3) return 'text-amber-600'
    return 'text-gray-700'
  }

  // Get rank icon
  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  // Join challenge
  const joinChallenge = (challengeId: string) => {
    onChallengeJoin?.(challengeId)
    alert('Challenge joined! Good luck! 🚀')
  }

  return (
    <div className="social-learning bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Users className="w-8 h-8" />
              <span>Social Learning Hub</span>
            </h2>
            <p className="opacity-90">Study together, achieve together</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{currentPoints}</div>
            <div className="text-sm opacity-90">Points</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {[
            { id: 'streaks', name: 'Streaks', icon: Flame },
            { id: 'leaderboard', name: 'Leaderboard', icon: Trophy },
            { id: 'achievements', name: 'Achievements', icon: Award },
            { id: 'challenges', name: 'Challenges', icon: Target },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'streaks' && (
          <div className="space-y-6">
            {/* Current Streak */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span>Study Streak</span>
                </h3>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    streakStatus.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : streakStatus.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {streakStatus.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {studyStreak.currentStreak}
                  </div>
                  <div className="text-gray-600">Current Streak</div>
                  <div className="text-sm text-gray-500">days</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {studyStreak.longestStreak}
                  </div>
                  <div className="text-gray-600">Longest Streak</div>
                  <div className="text-sm text-gray-500">days</div>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Next milestone: 15 days</span>
                  <span>{studyStreak.currentStreak}/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(studyStreak.currentStreak / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Streak Friends */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Friends on Fire</h3>
              <div className="space-y-3">
                {[
                  { name: 'Priya Sharma', streak: 23, avatar: '👩‍🎓' },
                  { name: 'Arjun Patel', streak: 18, avatar: '👨‍🎓' },
                  { name: 'Ananya Singh', streak: 15, avatar: '👩‍🎓' },
                ].map((friend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{friend.avatar}</span>
                      <span className="font-medium">{friend.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-bold text-orange-600">{friend.streak}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                <h3 className="text-lg font-semibold text-gray-900">🏆 Weekly Leaderboard</h3>
                <p className="text-sm text-gray-600">Top students this week</p>
              </div>

              <div className="divide-y divide-gray-100">
                {leaderboard.map((student) => (
                  <div
                    key={student.studentId}
                    className={`p-4 flex items-center justify-between ${
                      student.studentId === studentId ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`text-xl font-bold ${getRankColor(student.rank)}`}>
                        {getRankIcon(student.rank)}
                      </div>
                      <div className="text-2xl">{student.avatar}</div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {student.name}
                          {student.studentId === studentId && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {student.conceptsMastered} concepts • {student.streakDays} day streak
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{student.points}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-green-600">+24</div>
                <div className="text-sm text-gray-600">Rank Change</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">Friends</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">89%</div>
                <div className="text-sm text-gray-600">Percentile</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-xl border p-4 ${
                  achievement.unlockedAt ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                  {achievement.unlockedAt && (
                    <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">✓</div>
                  )}
                </div>

                {!achievement.unlockedAt && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                    <p className="text-gray-600 mt-1">{challenge.description}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      challenge.difficulty === 'easy'
                        ? 'bg-green-100 text-green-700'
                        : challenge.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {challenge.difficulty}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{challenge.participants}</div>
                    <div className="text-sm text-gray-600">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{challenge.timeLeft}</div>
                    <div className="text-sm text-gray-600">Time Left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{challenge.reward}</div>
                    <div className="text-sm text-gray-600">Reward</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{challenge.category}</div>
                    <div className="text-sm text-gray-600">Category</div>
                  </div>
                </div>

                <button
                  onClick={() => joinChallenge(challenge.id)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Join Challenge 🚀
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialLearning
