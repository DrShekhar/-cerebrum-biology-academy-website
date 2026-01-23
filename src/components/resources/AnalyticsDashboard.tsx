'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BarChart2,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Zap,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

interface PerformanceData {
  subject: string
  score: number
  improvement: number
  questionsAttempted: number
  timeSpent: number // in minutes
  strongTopics: string[]
  weakTopics: string[]
  trend: 'up' | 'down' | 'stable'
}

interface StudyAnalytics {
  totalStudyTime: number // minutes
  averageSessionTime: number
  questionsAnswered: number
  accuracyRate: number
  improvementRate: number
  consistencyScore: number
  predictions: {
    neetRank: number
    probabilityRange: string
    recommendedStudyHours: number
  }
  weeklyProgress: Array<{
    week: string
    questionsAnswered: number
    accuracy: number
    timeSpent: number
  }>
  topicPerformance: PerformanceData[]
}

interface AnalyticsDashboardProps {
  className?: string
  userId?: string
}

const AnalyticsDashboard = ({ className, userId }: AnalyticsDashboardProps) => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('month')
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'time' | 'questions'>(
    'accuracy'
  )

  // Sample analytics data
  const analytics: StudyAnalytics = {
    totalStudyTime: 2547, // minutes
    averageSessionTime: 45,
    questionsAnswered: 1847,
    accuracyRate: 78.5,
    improvementRate: 12.3,
    consistencyScore: 85,
    predictions: {
      neetRank: 15000,
      probabilityRange: '10,000 - 20,000',
      recommendedStudyHours: 6,
    },
    weeklyProgress: [
      { week: 'Week 1', questionsAnswered: 245, accuracy: 72, timeSpent: 420 },
      { week: 'Week 2', questionsAnswered: 289, accuracy: 75, timeSpent: 485 },
      { week: 'Week 3', questionsAnswered: 312, accuracy: 78, timeSpent: 512 },
      { week: 'Week 4', questionsAnswered: 356, accuracy: 82, timeSpent: 578 },
    ],
    topicPerformance: [
      {
        subject: 'Cell Biology',
        score: 92,
        improvement: 8.5,
        questionsAttempted: 245,
        timeSpent: 420,
        strongTopics: ['Cell Structure', 'Organelles'],
        weakTopics: ['Cell Division'],
        trend: 'up',
      },
      {
        subject: 'Genetics',
        score: 68,
        improvement: -2.1,
        questionsAttempted: 198,
        timeSpent: 380,
        strongTopics: ["Mendel's Laws"],
        weakTopics: ['Molecular Genetics', 'Chromosomes'],
        trend: 'down',
      },
      {
        subject: 'Human Physiology',
        score: 85,
        improvement: 5.2,
        questionsAttempted: 312,
        timeSpent: 465,
        strongTopics: ['Digestive System', 'Respiratory System'],
        weakTopics: ['Nervous System'],
        trend: 'up',
      },
      {
        subject: 'Plant Physiology',
        score: 74,
        improvement: 0.3,
        questionsAttempted: 167,
        timeSpent: 298,
        strongTopics: ['Photosynthesis'],
        weakTopics: ['Plant Hormones', 'Transpiration'],
        trend: 'stable',
      },
      {
        subject: 'Ecology',
        score: 79,
        improvement: 6.8,
        questionsAttempted: 201,
        timeSpent: 342,
        strongTopics: ['Ecosystems'],
        weakTopics: ['Biodiversity'],
        trend: 'up',
      },
    ],
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDownIcon className="h-4 w-4 text-red-500" />
      case 'stable':
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-600'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={cn('max-w-7xl mx-auto', className)}>
      {/* Header */}
      <div className="bg-indigo-500 text-white rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
            <p className="text-lg opacity-90">
              Track your progress and identify areas for improvement
            </p>
          </div>
          <BarChart2 className="h-12 w-12 opacity-80" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{analytics.accuracyRate}%</div>
            <div className="text-sm opacity-90">Overall Accuracy</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{Math.floor(analytics.totalStudyTime / 60)}h</div>
            <div className="text-sm opacity-90">Total Study Time</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{analytics.questionsAnswered}</div>
            <div className="text-sm opacity-90">Questions Solved</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{analytics.consistencyScore}%</div>
            <div className="text-sm opacity-90">Consistency Score</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* NEET Rank Prediction */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">NEET Rank Prediction</h3>
                <p className="text-gray-600 text-sm">Based on current performance</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                ~{analytics.predictions.neetRank.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Predicted Rank Range: {analytics.predictions.probabilityRange}
              </div>

              <div className="bg-gray-50 border border-purple-200 rounded-lg p-4">
                <div className="text-sm font-medium text-purple-800 mb-2">📚 Recommendation</div>
                <div className="text-sm text-purple-700">
                  Study {analytics.predictions.recommendedStudyHours} hours daily to improve rank by
                  5,000+ positions
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Confidence Level</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Weekly Progress</h3>
              <div className="flex gap-2">
                {(['accuracy', 'time', 'questions'] as const).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize',
                      selectedMetric === metric
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple Chart Visualization */}
            <div className="space-y-4">
              {analytics.weeklyProgress.map((week, index) => {
                let value, maxValue, label
                switch (selectedMetric) {
                  case 'accuracy':
                    value = week.accuracy
                    maxValue = 100
                    label = `${value}%`
                    break
                  case 'time':
                    value = week.timeSpent
                    maxValue = 600
                    label = `${Math.floor(value / 60)}h ${value % 60}m`
                    break
                  case 'questions':
                    value = week.questionsAnswered
                    maxValue = 400
                    label = `${value} questions`
                    break
                }

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium">{week.week}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(value / maxValue) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-24 text-sm text-right font-medium">{label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-6">Subject-wise Performance</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analytics.topicPerformance.map((topic, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">{topic.subject}</h4>
                {getTrendIcon(topic.trend)}
              </div>

              {/* Score Circle */}
              <div className="text-center mb-4">
                <div
                  className={cn(
                    'w-20 h-20 rounded-full border-4 flex items-center justify-center mx-auto mb-2',
                    getScoreColor(topic.score)
                  )}
                >
                  <span className="text-2xl font-bold">{topic.score}%</span>
                </div>
                <div className="text-sm text-gray-600">
                  {topic.improvement >= 0 ? '+' : ''}
                  {topic.improvement.toFixed(1)}% this month
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{topic.questionsAttempted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Study Time:</span>
                  <span className="font-medium">
                    {Math.floor(topic.timeSpent / 60)}h {topic.timeSpent % 60}m
                  </span>
                </div>
              </div>

              {/* Strong/Weak Topics */}
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-green-700 mb-1">✅ Strong Areas</div>
                  <div className="flex flex-wrap gap-1">
                    {topic.strongTopics.map((strongTopic, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                      >
                        {strongTopic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-red-700 mb-1">⚠️ Needs Work</div>
                  <div className="flex flex-wrap gap-1">
                    {topic.weakTopics.map((weakTopic, idx) => (
                      <span
                        key={idx}
                        className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full"
                      >
                        {weakTopic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items & Recommendations */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold">Priority Action Items</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-red-800">Focus on Genetics</div>
                <div className="text-sm text-red-700">
                  Score decreased by 2.1%. Review Molecular Genetics concepts.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-yellow-800">Increase Study Consistency</div>
                <div className="text-sm text-yellow-700">
                  Study at least 45 minutes daily to maintain momentum.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-blue-800">Practice More MCQs</div>
                <div className="text-sm text-blue-700">
                  Solve 50 questions daily to improve speed and accuracy.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Achievements This Month</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-green-800">Cell Biology Mastery</div>
                <div className="text-sm text-green-700">
                  Achieved 92% accuracy - excellent improvement!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-green-800">Study Streak Record</div>
                <div className="text-sm text-green-700">12-day streak - your longest yet!</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-green-800">Speed Improvement</div>
                <div className="text-sm text-green-700">
                  25% faster question solving compared to last month.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <div className="text-sm font-medium text-purple-800 mb-2">🎯 Next Goal</div>
            <div className="text-sm text-purple-700">
              Reach 85% overall accuracy to improve your predicted NEET rank to under 10,000!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
