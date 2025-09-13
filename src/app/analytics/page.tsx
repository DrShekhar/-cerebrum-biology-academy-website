'use client'

import { useState } from 'react'
import { PerformanceDashboard } from '@/components/analytics/PerformanceDashboard'
import { UserTestHistory, TestAnalytics } from '@/types/mockTest'
import { mockTests } from '@/data/mockTests'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award,
  Calendar,
  Clock,
  Target,
  Star,
  BookOpen,
  Brain,
  Zap,
  Activity
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  const [userClass, setUserClass] = useState<'class-11' | 'class-12' | 'dropper'>('class-12')

  // Mock user test history data
  const mockUserHistory: UserTestHistory = {
    userId: 'user-123',
    totalTests: 45,
    totalScore: 3150,
    averageScore: 70,
    bestScore: 89,
    recentTests: [
      {
        testId: 'test-1',
        testTitle: 'Cell Biology & Genetics Full Test',
        score: 85,
        percentage: 85,
        date: '2024-01-22T10:00:00Z',
        rank: 1250
      },
      {
        testId: 'test-2',
        testTitle: 'Plant Physiology Rapid Fire',
        score: 78,
        percentage: 78,
        date: '2024-01-20T14:30:00Z',
        rank: 2340
      },
      {
        testId: 'test-3',
        testTitle: 'Human Physiology Previous Year',
        score: 65,
        percentage: 65,
        date: '2024-01-18T11:15:00Z',
        rank: 4567
      },
      {
        testId: 'test-4',
        testTitle: 'Molecular Biology Advanced',
        score: 72,
        percentage: 72,
        date: '2024-01-15T16:45:00Z',
        rank: 3890
      },
      {
        testId: 'test-5',
        testTitle: 'Botany Comprehensive Test',
        score: 68,
        percentage: 68,
        date: '2024-01-12T09:30:00Z',
        rank: 4123
      }
    ],
    subjectStrengths: [
      {
        subject: 'Cell Biology',
        averageScore: 82,
        testsAttempted: 12
      },
      {
        subject: 'Plant Physiology',
        averageScore: 76,
        testsAttempted: 10
      },
      {
        subject: 'Human Physiology',
        averageScore: 68,
        testsAttempted: 15
      },
      {
        subject: 'Genetics',
        averageScore: 59,
        testsAttempted: 8
      }
    ],
    progressTrend: [
      { date: '2023-12-01', averageScore: 45 },
      { date: '2023-12-15', averageScore: 52 },
      { date: '2024-01-01', averageScore: 58 },
      { date: '2024-01-15', averageScore: 65 },
      { date: '2024-01-22', averageScore: 70 },
    ],
    achievements: [
      {
        id: 'first-80',
        title: 'First 80% Score',
        description: 'Achieved your first score above 80% in Cell Biology test',
        earnedDate: '2024-01-10T00:00:00Z',
        icon: 'trophy'
      },
      {
        id: 'consistency-king',
        title: 'Consistency King',
        description: 'Maintained scores above 70% for 5 consecutive tests',
        earnedDate: '2024-01-18T00:00:00Z',
        icon: 'target'
      },
      {
        id: 'improvement-champion',
        title: 'Improvement Champion',
        description: 'Improved average score by 25% over last month',
        earnedDate: '2024-01-20T00:00:00Z',
        icon: 'trending-up'
      }
    ]
  }

  // Mock test analytics data
  const mockTestAnalytics: TestAnalytics[] = [
    {
      testId: 'test-1',
      totalAttempts: 1247,
      averageScore: 67.5,
      averageTime: 2700, // 45 minutes
      completionRate: 89.2,
      questionAnalytics: [
        {
          questionId: 'q1',
          correctRate: 78.5,
          averageTime: 65,
          skipRate: 12.3,
          mostSelectedWrongAnswer: 'c'
        }
      ],
      topicDifficulty: [
        {
          topic: 'Cell Biology',
          averageScore: 72.3,
          difficultyRating: 3.2
        }
      ],
      performanceByTime: [
        {
          timeSlot: 'morning',
          averageScore: 71.2,
          attempts: 456
        },
        {
          timeSlot: 'afternoon',
          averageScore: 68.8,
          attempts: 523
        },
        {
          timeSlot: 'evening',
          averageScore: 63.4,
          attempts: 268
        }
      ]
    }
  ]

  // Check if user is logged in (mock check)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Sign up or log in to access your personalized performance analytics and track your NEET preparation progress.
          </p>
          <div className="space-y-3">
            <Button variant="primary" size="lg" className="w-full">
              Sign Up Free
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Log In
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Your Performance Analytics</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Deep insights into your NEET preparation journey with AI-powered recommendations 
              to accelerate your progress and maximize your potential.
            </p>
            
            {/* Class Selector */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-purple-100">Viewing data for:</span>
              <select
                value={userClass}
                onChange={(e) => setUserClass(e.target.value as 'class-11' | 'class-12' | 'dropper')}
                className="bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="class-11" className="text-gray-900">Class 11</option>
                <option value="class-12" className="text-gray-900">Class 12</option>
                <option value="dropper" className="text-gray-900">Dropper</option>
              </select>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Award className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold">{mockUserHistory.averageScore}%</div>
                <div className="text-purple-100 text-sm">Average Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold">{mockUserHistory.bestScore}%</div>
                <div className="text-purple-100 text-sm">Best Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Target className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold">{mockUserHistory.totalTests}</div>
                <div className="text-purple-100 text-sm">Tests Taken</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <Star className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold">{mockUserHistory.achievements.length}</div>
                <div className="text-purple-100 text-sm">Achievements</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <PerformanceDashboard
        userHistory={mockUserHistory}
        testAnalytics={mockTestAnalytics}
        availableTests={mockTests}
        userClass={userClass}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Improve Your Performance?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Use these insights to create a personalized study plan and take targeted practice tests 
            to strengthen your weak areas and maintain your strong subjects.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-green-600">
              <BookOpen className="w-5 h-5 mr-2" />
              Get Study Plan
            </Button>
            <Button variant="primary" size="xl" className="bg-white text-green-600 hover:bg-gray-100">
              <Target className="w-5 h-5 mr-2" />
              Take Targeted Test
            </Button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Brain className="w-12 h-12 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">AI Insights</div>
              <div className="text-green-100">Personalized Recommendations</div>
            </div>
            <div>
              <Activity className="w-12 h-12 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">Real-time</div>
              <div className="text-green-100">Progress Tracking</div>
            </div>
            <div>
              <Users className="w-12 h-12 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-2">Peer</div>
              <div className="text-green-100">Comparison</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Metadata moved to layout.tsx for client components