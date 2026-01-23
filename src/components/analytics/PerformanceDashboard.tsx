'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { UserTestHistory, TestAnalytics, MockTest } from '@/types/mockTest'
import {
  BarChart3,
  TrendingUp,
  Trophy,
  Target,
  Calendar,
  Users,
  Star,
  Award,
  Brain,
  Zap,
  Download,
  Share2,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
  BookOpen,
  AlertTriangle,
  Activity,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface PerformanceDashboardProps {
  userHistory: UserTestHistory
  testAnalytics: TestAnalytics[]
  availableTests: MockTest[]
  userClass: 'class-11' | 'class-12' | 'dropper'
}

export function PerformanceDashboard({
  userHistory,
  testAnalytics,
  availableTests,
  userClass,
}: PerformanceDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'progress' | 'insights'>(
    'overview'
  )
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Calculate key metrics
  const keyMetrics = useMemo(() => {
    const recentTests = userHistory.recentTests.slice(0, 10)
    const currentScore = recentTests[0]?.percentage || 0
    const previousScore = recentTests[1]?.percentage || 0
    const improvement = currentScore - previousScore

    return {
      currentScore,
      previousScore,
      improvement,
      totalTests: userHistory.totalTests,
      averageScore: userHistory.averageScore,
      bestScore: userHistory.bestScore,
      testsThisWeek: recentTests.filter((test) => {
        const testDate = new Date(test.date)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return testDate >= weekAgo
      }).length,
      consistencyScore: Math.round(
        recentTests.reduce((acc, test) => acc + test.percentage, 0) / recentTests.length || 0
      ),
    }
  }, [userHistory])

  // Progress trend data
  const progressData = useMemo(() => {
    return userHistory.progressTrend.slice(-12).map((point, index) => ({
      ...point,
      index,
      improvement:
        index > 0 ? point.averageScore - userHistory.progressTrend[index - 1].averageScore : 0,
    }))
  }, [userHistory])

  // Subject performance analysis
  const subjectPerformance = useMemo(() => {
    return userHistory.subjectStrengths.map((subject) => ({
      ...subject,
      grade:
        subject.averageScore >= 85
          ? 'A'
          : subject.averageScore >= 70
            ? 'B'
            : subject.averageScore >= 55
              ? 'C'
              : 'D',
      color:
        subject.averageScore >= 85
          ? 'text-green-600'
          : subject.averageScore >= 70
            ? 'text-blue-600'
            : subject.averageScore >= 55
              ? 'text-yellow-600'
              : 'text-red-600',
      bgColor:
        subject.averageScore >= 85
          ? 'bg-green-50'
          : subject.averageScore >= 70
            ? 'bg-blue-50'
            : subject.averageScore >= 55
              ? 'bg-yellow-50'
              : 'bg-red-50',
    }))
  }, [userHistory])

  // Performance insights
  const insights = useMemo(() => {
    const insights = []

    if (keyMetrics.improvement > 10) {
      insights.push({
        type: 'success',
        icon: TrendingUp,
        title: 'Excellent Progress!',
        description: `Your score improved by ${keyMetrics.improvement}% in the latest test.`,
        action: 'Keep up the momentum',
      })
    } else if (keyMetrics.improvement < -10) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Performance Dip',
        description: `Your score dropped by ${Math.abs(keyMetrics.improvement)}%. Let's analyze what happened.`,
        action: 'Review weak areas',
      })
    }

    if (keyMetrics.testsThisWeek >= 3) {
      insights.push({
        type: 'success',
        icon: Target,
        title: 'Great Consistency!',
        description: `You've taken ${keyMetrics.testsThisWeek} tests this week.`,
        action: 'Maintain this rhythm',
      })
    } else if (keyMetrics.testsThisWeek === 0) {
      insights.push({
        type: 'info',
        icon: Calendar,
        title: 'Time to Practice',
        description: 'No tests taken this week. Regular practice is key to improvement.',
        action: 'Take a test today',
      })
    }

    const weakestSubject = subjectPerformance.sort((a, b) => a.averageScore - b.averageScore)[0]
    if (weakestSubject && weakestSubject.averageScore < 60) {
      insights.push({
        type: 'warning',
        icon: BookOpen,
        title: 'Focus Area Identified',
        description: `${weakestSubject.subject} needs attention (${weakestSubject.averageScore}% average).`,
        action: 'Practice more questions',
      })
    }

    return insights
  }, [keyMetrics, subjectPerformance])

  // Tabs configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: Trophy },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'insights', label: 'Insights', icon: Brain },
  ]

  // Metric cards
  const metricCards = [
    {
      title: 'Current Score',
      value: `${keyMetrics.currentScore}%`,
      change: keyMetrics.improvement,
      icon: Trophy,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Best Score',
      value: `${keyMetrics.bestScore}%`,
      change: keyMetrics.bestScore - keyMetrics.averageScore,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Average Score',
      value: `${keyMetrics.averageScore}%`,
      change: keyMetrics.consistencyScore - keyMetrics.averageScore,
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Tests Taken',
      value: keyMetrics.totalTests.toString(),
      change: keyMetrics.testsThisWeek,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
            <p className="text-gray-600">Track your progress and identify areas for improvement</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricCards.map((metric, index) => (
              <motion.div
                key={metric.title}
                className="bg-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}
                  >
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  {metric.change !== 0 && (
                    <div
                      className={`flex items-center text-sm font-medium ${
                        metric.change > 0
                          ? 'text-green-600'
                          : metric.change < 0
                            ? 'text-red-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {metric.change > 0 ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                      ) : metric.change < 0 ? (
                        <ArrowDown className="w-4 h-4 mr-1" />
                      ) : (
                        <Minus className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(metric.change)}
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Performance Insights */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Insights</h2>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-l-4 ${
                    insight.type === 'success'
                      ? 'bg-green-50 border-green-600'
                      : insight.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start">
                    <insight.icon
                      className={`w-6 h-6 mr-3 mt-0.5 ${
                        insight.type === 'success'
                          ? 'text-green-600'
                          : insight.type === 'warning'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                      <p className="text-gray-700 mb-3">{insight.description}</p>
                      <Button variant="outline" size="sm">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Test Performance */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Test Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Test</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userHistory.recentTests.slice(0, 5).map((test, index) => (
                    <tr key={test.testId} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{test.testTitle}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div
                          className={`font-semibold ${
                            test.percentage >= 80
                              ? 'text-green-600'
                              : test.percentage >= 60
                                ? 'text-blue-600'
                                : test.percentage >= 40
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                          }`}
                        >
                          {test.percentage}%
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-700">
                          {test.rank ? `#${test.rank.toLocaleString()}` : 'N/A'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-700">
                          {new Date(test.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-8">
          {/* Subject-wise Performance */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject-wise Performance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {subjectPerformance.map((subject, index) => (
                <div key={subject.subject} className={`${subject.bgColor} rounded-2xl p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{subject.subject}</h3>
                    <div
                      className={`w-8 h-8 rounded-full ${subject.color} bg-white flex items-center justify-center font-bold`}
                    >
                      {subject.grade}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-700 mb-1">
                        <span>Average Score</span>
                        <span>{subject.averageScore}%</span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${subject.color.replace('text-', 'bg-')}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.averageScore}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      <span>Tests Attempted: {subject.testsAttempted}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance Distribution */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Score Distribution</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {userHistory.recentTests.filter((t) => t.percentage >= 80).length}
                </div>
                <div className="text-sm text-gray-700">Excellent (80%+)</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {
                    userHistory.recentTests.filter((t) => t.percentage >= 60 && t.percentage < 80)
                      .length
                  }
                </div>
                <div className="text-sm text-gray-700">Good (60-79%)</div>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {
                    userHistory.recentTests.filter((t) => t.percentage >= 40 && t.percentage < 60)
                      .length
                  }
                </div>
                <div className="text-sm text-gray-700">Average (40-59%)</div>
              </div>
              <div className="bg-red-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {userHistory.recentTests.filter((t) => t.percentage < 40).length}
                </div>
                <div className="text-sm text-gray-700">Needs Work (below 40%)</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-8">
          {/* Progress Chart */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Score Progression</h2>
            <div className="h-80 flex items-end justify-between space-x-2 bg-gray-50 rounded-2xl p-6">
              {progressData.map((point, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-full transition-all duration-1000"
                    style={{ height: `${(point.averageScore / 100) * 100}%` }}
                  />
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {new Date(point.date).toLocaleDateString('en', { month: 'short' })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userHistory.achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(achievement.earnedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-8">
          {/* AI-Powered Insights */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Insights</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Learning Pattern Analysis</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Based on your test patterns, you perform best during morning hours (9-11 AM) with
                  an average score 15% higher than evening tests. Consider scheduling important
                  practice sessions during this time.
                </p>
                <Button variant="outline" size="sm">
                  View Detailed Analysis
                </Button>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-50 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Speed vs Accuracy</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  You tend to rush through questions, spending average 45 seconds per question.
                  Students who take 60-75 seconds per question show 12% higher accuracy. Consider
                  slowing down slightly for better results.
                </p>
                <Button variant="outline" size="sm">
                  Practice Time Management
                </Button>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Activity className="w-8 h-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Consistency Analysis</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Your performance shows high variability (±18% from average). Top performers
                  maintain consistency within ±8%. Focus on regular revision and concept
                  strengthening rather than attempting new topics.
                </p>
                <Button variant="outline" size="sm">
                  Get Study Plan
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Peer Comparison */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Peer Comparison (
              {userClass === 'class-11'
                ? 'Class 11'
                : userClass === 'class-12'
                  ? 'Class 12'
                  : 'Droppers'}
              )
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.round((keyMetrics.averageScore / 75) * 100)}%ile
                </div>
                <div className="text-gray-600">Your Percentile</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  +{keyMetrics.improvement > 0 ? keyMetrics.improvement : 0}%
                </div>
                <div className="text-gray-600">Above Average</div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.max(0, 85 - keyMetrics.averageScore)}%
                </div>
                <div className="text-gray-600">To Top 10%</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
