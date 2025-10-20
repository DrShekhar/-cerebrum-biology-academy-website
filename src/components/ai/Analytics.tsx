'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Award,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Brain,
  Eye,
  Users,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  AlertTriangle,
  Info,
  Star,
  Layers,
  Globe,
  Trophy,
  Gauge
} from 'lucide-react'

// Types and Interfaces
interface ScoreDistribution {
  range: string
  count: number
  percentage: number
  expectedCount: number
  actualCount: number
}

interface DifficultyAnalysis {
  level: 'easy' | 'medium' | 'hard'
  questionCount: number
  percentage: number
  averageScore: number
  averageTime: number
  discriminationIndex: number
  recommendedPercentage: number
  status: 'optimal' | 'low' | 'high'
}

interface TimeEstimation {
  totalEstimatedTime: number
  averageTimePerQuestion: number
  fastestCompletion: number
  slowestCompletion: number
  timeDistribution: {
    range: string
    count: number
    percentage: number
  }[]
  questionTimeBreakdown: {
    questionId: string
    estimatedTime: number
    actualAverageTime: number
    difficulty: string
    topic: string
  }[]
}

interface TopicBalance {
  topic: string
  questionCount: number
  percentage: number
  totalMarks: number
  marksPercentage: number
  recommendedPercentage: number
  status: 'balanced' | 'underrepresented' | 'overrepresented'
  averageScore: number
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
}

interface LearningOutcome {
  id: string
  title: string
  description: string
  bloomsLevel: string
  questionsMapping: number
  totalQuestions: number
  coverage: number
  averageScore: number
  status: 'excellent' | 'good' | 'needs_improvement' | 'poor'
  relatedTopics: string[]
}

interface HistoricalComparison {
  testId: string
  testName: string
  date: string
  averageScore: number
  completionRate: number
  difficulty: number
  timeSpent: number
  topicScores: {
    [topic: string]: number
  }
  trend: 'improving' | 'declining' | 'stable'
}

interface AnalyticsData {
  scoreDistribution: ScoreDistribution[]
  difficultyAnalysis: DifficultyAnalysis[]
  timeEstimation: TimeEstimation
  topicBalance: TopicBalance[]
  learningOutcomes: LearningOutcome[]
  historicalComparison: HistoricalComparison[]
  overallMetrics: {
    totalQuestions: number
    totalMarks: number
    estimatedDuration: number
    difficultyScore: number
    balanceScore: number
    outcomesCoverage: number
  }
}

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scores' | 'difficulty' | 'time' | 'topics' | 'outcomes' | 'history'>('scores')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedTest, setSelectedTest] = useState('current')
  const [dateRange, setDateRange] = useState('last30days')
  const [refreshing, setRefreshing] = useState(false)

  // Mock data initialization
  useEffect(() => {
    generateMockAnalytics()
  }, [selectedTest, dateRange])

  const generateMockAnalytics = () => {
    setLoading(true)
    setTimeout(() => {
      const mockData: AnalyticsData = {
        scoreDistribution: [
          { range: '0-10%', count: 2, percentage: 3.2, expectedCount: 3, actualCount: 2 },
          { range: '11-20%', count: 5, percentage: 8.1, expectedCount: 7, actualCount: 5 },
          { range: '21-30%', count: 8, percentage: 12.9, expectedCount: 10, actualCount: 8 },
          { range: '31-40%', count: 12, percentage: 19.4, expectedCount: 12, actualCount: 12 },
          { range: '41-50%', count: 15, percentage: 24.2, expectedCount: 14, actualCount: 15 },
          { range: '51-60%', count: 10, percentage: 16.1, expectedCount: 12, actualCount: 10 },
          { range: '61-70%', count: 6, percentage: 9.7, expectedCount: 8, actualCount: 6 },
          { range: '71-80%', count: 3, percentage: 4.8, expectedCount: 4, actualCount: 3 },
          { range: '81-90%', count: 1, percentage: 1.6, expectedCount: 2, actualCount: 1 },
          { range: '91-100%', count: 0, percentage: 0, expectedCount: 1, actualCount: 0 }
        ],
        difficultyAnalysis: [
          {
            level: 'easy',
            questionCount: 15,
            percentage: 30,
            averageScore: 78.5,
            averageTime: 45,
            discriminationIndex: 0.65,
            recommendedPercentage: 30,
            status: 'optimal'
          },
          {
            level: 'medium',
            questionCount: 25,
            percentage: 50,
            averageScore: 62.3,
            averageTime: 75,
            discriminationIndex: 0.72,
            recommendedPercentage: 50,
            status: 'optimal'
          },
          {
            level: 'hard',
            questionCount: 10,
            percentage: 20,
            averageScore: 34.7,
            averageTime: 120,
            discriminationIndex: 0.58,
            recommendedPercentage: 20,
            status: 'optimal'
          }
        ],
        timeEstimation: {
          totalEstimatedTime: 180,
          averageTimePerQuestion: 3.6,
          fastestCompletion: 95,
          slowestCompletion: 175,
          timeDistribution: [
            { range: '90-110 min', count: 8, percentage: 12.9 },
            { range: '111-130 min', count: 15, percentage: 24.2 },
            { range: '131-150 min', count: 20, percentage: 32.3 },
            { range: '151-170 min', count: 12, percentage: 19.4 },
            { range: '171-180 min', count: 7, percentage: 11.3 }
          ],
          questionTimeBreakdown: [
            { questionId: 'q1', estimatedTime: 2, actualAverageTime: 2.3, difficulty: 'easy', topic: 'Cell Biology' },
            { questionId: 'q2', estimatedTime: 3, actualAverageTime: 3.8, difficulty: 'medium', topic: 'Genetics' },
            { questionId: 'q3', estimatedTime: 5, actualAverageTime: 4.2, difficulty: 'hard', topic: 'Evolution' }
          ]
        },
        topicBalance: [
          {
            topic: 'Cell Biology',
            questionCount: 12,
            percentage: 24,
            totalMarks: 48,
            marksPercentage: 24,
            recommendedPercentage: 25,
            status: 'balanced',
            averageScore: 72.4,
            difficultyDistribution: { easy: 4, medium: 6, hard: 2 }
          },
          {
            topic: 'Genetics',
            questionCount: 10,
            percentage: 20,
            totalMarks: 40,
            marksPercentage: 20,
            recommendedPercentage: 20,
            status: 'balanced',
            averageScore: 68.7,
            difficultyDistribution: { easy: 3, medium: 5, hard: 2 }
          },
          {
            topic: 'Human Physiology',
            questionCount: 15,
            percentage: 30,
            totalMarks: 60,
            marksPercentage: 30,
            recommendedPercentage: 25,
            status: 'overrepresented',
            averageScore: 65.2,
            difficultyDistribution: { easy: 5, medium: 8, hard: 2 }
          },
          {
            topic: 'Ecology',
            questionCount: 8,
            percentage: 16,
            totalMarks: 32,
            marksPercentage: 16,
            recommendedPercentage: 20,
            status: 'underrepresented',
            averageScore: 58.9,
            difficultyDistribution: { easy: 2, medium: 4, hard: 2 }
          },
          {
            topic: 'Evolution',
            questionCount: 5,
            percentage: 10,
            totalMarks: 20,
            marksPercentage: 10,
            recommendedPercentage: 10,
            status: 'balanced',
            averageScore: 54.3,
            difficultyDistribution: { easy: 1, medium: 2, hard: 2 }
          }
        ],
        learningOutcomes: [
          {
            id: 'lo1',
            title: 'Understanding Cell Structure',
            description: 'Students can identify and explain cellular components',
            bloomsLevel: 'Understanding',
            questionsMapping: 8,
            totalQuestions: 12,
            coverage: 67,
            averageScore: 74.2,
            status: 'good',
            relatedTopics: ['Cell Biology', 'Molecular Biology']
          },
          {
            id: 'lo2',
            title: 'Genetic Inheritance Analysis',
            description: 'Students can analyze inheritance patterns',
            bloomsLevel: 'Analyzing',
            questionsMapping: 6,
            totalQuestions: 10,
            coverage: 60,
            averageScore: 65.8,
            status: 'needs_improvement',
            relatedTopics: ['Genetics', 'Molecular Biology']
          },
          {
            id: 'lo3',
            title: 'Physiological Process Evaluation',
            description: 'Students can evaluate body system functions',
            bloomsLevel: 'Evaluating',
            questionsMapping: 10,
            totalQuestions: 15,
            coverage: 67,
            averageScore: 58.4,
            status: 'needs_improvement',
            relatedTopics: ['Human Physiology']
          }
        ],
        historicalComparison: [
          {
            testId: 'test_1',
            testName: 'NEET Biology Mock 1',
            date: '2024-01-15',
            averageScore: 68.5,
            completionRate: 94.2,
            difficulty: 2.3,
            timeSpent: 155,
            topicScores: {
              'Cell Biology': 72.4,
              'Genetics': 68.7,
              'Human Physiology': 65.2
            },
            trend: 'stable'
          },
          {
            testId: 'test_2',
            testName: 'NEET Biology Mock 2',
            date: '2024-01-08',
            averageScore: 65.2,
            completionRate: 91.8,
            difficulty: 2.5,
            timeSpent: 162,
            topicScores: {
              'Cell Biology': 69.1,
              'Genetics': 65.3,
              'Human Physiology': 62.8
            },
            trend: 'improving'
          },
          {
            testId: 'test_3',
            testName: 'NEET Biology Mock 3',
            date: '2024-01-01',
            averageScore: 71.2,
            completionRate: 96.5,
            difficulty: 2.1,
            timeSpent: 148,
            topicScores: {
              'Cell Biology': 75.6,
              'Genetics': 72.1,
              'Human Physiology': 68.9
            },
            trend: 'declining'
          }
        ],
        overallMetrics: {
          totalQuestions: 50,
          totalMarks: 200,
          estimatedDuration: 180,
          difficultyScore: 2.3,
          balanceScore: 85,
          outcomesCoverage: 64
        }
      }

      setAnalyticsData(mockData)
      setLoading(false)
    }, 1000)
  }

  const refreshAnalytics = () => {
    setRefreshing(true)
    setTimeout(() => {
      generateMockAnalytics()
      setRefreshing(false)
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'balanced':
      case 'excellent':
        return 'text-green-600 bg-green-100'
      case 'good':
        return 'text-blue-600 bg-blue-100'
      case 'needs_improvement':
      case 'underrepresented':
        return 'text-yellow-600 bg-yellow-100'
      case 'poor':
      case 'overrepresented':
      case 'high':
      case 'low':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <ArrowUp className="w-4 h-4 text-green-600" />
      case 'declining': return <ArrowDown className="w-4 h-4 text-red-600" />
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />
      default: return null
    }
  }

  const getBloomsLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'remembering': return 'bg-red-100 text-red-700'
      case 'understanding': return 'bg-orange-100 text-orange-700'
      case 'applying': return 'bg-yellow-100 text-yellow-700'
      case 'analyzing': return 'bg-green-100 text-green-700'
      case 'evaluating': return 'bg-blue-100 text-blue-700'
      case 'creating': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading && !analyticsData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Analyzing test data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Test Analytics
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive analytics dashboard with score predictions, difficulty analysis, time estimations, and learning outcome insights
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Selection
              </label>
              <select
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="current">Current Test</option>
                <option value="neet_mock_1">NEET Biology Mock 1</option>
                <option value="cell_bio_quiz">Cell Biology Quiz</option>
                <option value="genetics_test">Genetics Assessment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last3months">Last 3 months</option>
                <option value="last6months">Last 6 months</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshAnalytics}
              disabled={refreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Overall Metrics */}
      {analyticsData && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border text-center">
            <div className="text-2xl font-bold text-blue-600">{analyticsData.overallMetrics.totalQuestions}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="bg-white p-4 rounded-xl border text-center">
            <div className="text-2xl font-bold text-green-600">{analyticsData.overallMetrics.totalMarks}</div>
            <div className="text-sm text-gray-600">Total Marks</div>
          </div>
          <div className="bg-white p-4 rounded-xl border text-center">
            <div className="text-2xl font-bold text-purple-600">{analyticsData.overallMetrics.estimatedDuration}m</div>
            <div className="text-sm text-gray-600">Duration</div>
          </div>
          <div className="bg-white p-4 rounded-xl border text-center">
            <div className="text-2xl font-bold text-orange-600">{analyticsData.overallMetrics.difficultyScore.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
          <div className="bg-white p-4 rounded-xl border text-center">
            <div className="text-2xl font-bold text-indigo-600">{analyticsData.overallMetrics.balanceScore}%</div>
            <div className="text-sm text-gray-600">Balance</div>
          </div>
          <div className="bg-white p-4 rounded-xl border text-center">
            <div className="text-2xl font-bold text-teal-600">{analyticsData.overallMetrics.outcomesCoverage}%</div>
            <div className="text-sm text-gray-600">Coverage</div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'scores', label: 'Score Distribution', icon: BarChart3 },
            { id: 'difficulty', label: 'Difficulty', icon: Gauge },
            { id: 'time', label: 'Time Analysis', icon: Clock },
            { id: 'topics', label: 'Topic Balance', icon: PieChart },
            { id: 'outcomes', label: 'Learning Outcomes', icon: Target },
            { id: 'history', label: 'Historical', icon: TrendingUp }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {analyticsData && (
          <>
            {/* Expected Score Distribution */}
            {activeTab === 'scores' && (
              <motion.div
                key="scores"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Score Distribution Chart */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Expected vs Actual Score Distribution
                  </h3>

                  <div className="space-y-4">
                    {analyticsData.scoreDistribution.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{item.range}</span>
                          <span className="text-gray-500">
                            {item.actualCount} / {item.expectedCount} students
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">Expected</div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-400 h-3 rounded-full"
                                style={{ width: `${(item.expectedCount / Math.max(...analyticsData.scoreDistribution.map(s => s.expectedCount))) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-gray-500 mb-1">Actual</div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-600 h-3 rounded-full"
                                style={{ width: `${(item.actualCount / Math.max(...analyticsData.scoreDistribution.map(s => s.actualCount))) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Statistics */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    Score Statistics
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">67.8%</div>
                        <div className="text-sm text-blue-600">Average Score</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">85.2%</div>
                        <div className="text-sm text-green-600">Median Score</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Standard Deviation</span>
                        <span className="text-sm text-gray-600">12.4%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Highest Score</span>
                        <span className="text-sm text-gray-600">94.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Lowest Score</span>
                        <span className="text-sm text-gray-600">23.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Pass Rate (&gt;60%)</span>
                        <span className="text-sm text-gray-600">72.6%</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">Analysis Insights</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Distribution is slightly left-skewed</li>
                        <li>• More students in 41-50% range than expected</li>
                        <li>• Consider reviewing medium difficulty questions</li>
                        <li>• Overall performance aligns with expectations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Difficulty Analysis */}
            {activeTab === 'difficulty' && (
              <motion.div
                key="difficulty"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Difficulty Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {analyticsData.difficultyAnalysis.map((item) => (
                    <div key={item.level} className="bg-white rounded-xl p-6 border">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold capitalize">{item.level}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-800">{item.questionCount}</div>
                          <div className="text-sm text-gray-600">Questions ({item.percentage}%)</div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Average Score</span>
                            <span className="text-sm font-medium">{item.averageScore.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Average Time</span>
                            <span className="text-sm font-medium">{item.averageTime}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Discrimination</span>
                            <span className="text-sm font-medium">{item.discriminationIndex.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <div className="text-xs text-gray-500 mb-1">
                            Recommended: {item.recommendedPercentage}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                item.status === 'optimal' ? 'bg-green-500' :
                                item.status === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Difficulty Recommendations */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-purple-600" />
                    Difficulty Analysis & Recommendations
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Current Distribution</h4>
                      <div className="space-y-3">
                        {analyticsData.difficultyAnalysis.map((item) => (
                          <div key={item.level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full ${
                                item.level === 'easy' ? 'bg-green-500' :
                                item.level === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                              <span className="font-medium capitalize">{item.level}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{item.percentage}%</div>
                              <div className="text-xs text-gray-500">
                                {item.status === 'optimal' ? '✓' : item.status === 'high' ? '↑' : '↓'} {item.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Recommendations</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-green-800">Optimal Balance</div>
                              <div className="text-sm text-green-700">
                                Current difficulty distribution is well-balanced and follows recommended guidelines.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-blue-800">Discrimination Index</div>
                              <div className="text-sm text-blue-700">
                                Hard questions have slightly lower discrimination. Consider reviewing for clarity.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <div className="font-medium text-yellow-800">Time Management</div>
                              <div className="text-sm text-yellow-700">
                                Hard questions taking longer than expected. Ensure adequate time allocation.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Time Required Estimation */}
            {activeTab === 'time' && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Time Distribution */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Time Distribution Analysis
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{analyticsData.timeEstimation.totalEstimatedTime}m</div>
                        <div className="text-sm text-blue-600">Estimated Time</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{analyticsData.timeEstimation.averageTimePerQuestion.toFixed(1)}m</div>
                        <div className="text-sm text-green-600">Avg per Question</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {analyticsData.timeEstimation.timeDistribution.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.range}</span>
                            <span className="text-sm text-gray-500">{item.count} students ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-600 h-3 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fastest Completion</span>
                        <span className="text-sm font-medium">{analyticsData.timeEstimation.fastestCompletion}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Slowest Completion</span>
                        <span className="text-sm font-medium">{analyticsData.timeEstimation.slowestCompletion}m</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Time Breakdown */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    Question Time Analysis
                  </h3>

                  <div className="space-y-4">
                    <div className="overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Question</th>
                            <th className="text-right py-2">Estimated</th>
                            <th className="text-right py-2">Actual</th>
                            <th className="text-right py-2">Variance</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          {analyticsData.timeEstimation.questionTimeBreakdown.slice(0, 10).map((item, index) => {
                            const variance = item.actualAverageTime - item.estimatedTime
                            const variancePercentage = (variance / item.estimatedTime) * 100
                            return (
                              <tr key={index} className="border-b border-gray-100">
                                <td className="py-2">
                                  <div>
                                    <div className="font-medium">{item.questionId}</div>
                                    <div className="text-xs text-gray-500">{item.topic}</div>
                                  </div>
                                </td>
                                <td className="text-right py-2">{item.estimatedTime}m</td>
                                <td className="text-right py-2">{item.actualAverageTime.toFixed(1)}m</td>
                                <td className="text-right py-2">
                                  <span className={`font-medium ${
                                    variance > 0 ? 'text-red-600' : variance < 0 ? 'text-green-600' : 'text-gray-600'
                                  }`}>
                                    {variance > 0 ? '+' : ''}{variancePercentage.toFixed(0)}%
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">Time Management Insights</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Questions taking 20% longer than estimated: 3</li>
                        <li>• Hard questions show highest time variance</li>
                        <li>• Consider adding time warnings for longer questions</li>
                        <li>• Most students finish within allocated time</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Topic Balance Report */}
            {activeTab === 'topics' && (
              <motion.div
                key="topics"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Topic Balance Overview */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-indigo-600" />
                    Topic Balance Analysis
                  </h3>

                  <div className="space-y-4">
                    {analyticsData.topicBalance.map((topic, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{topic.topic}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(topic.status)}`}>
                              {topic.status}
                            </span>
                          </div>
                          <div className="text-right text-sm">
                            <div className="font-medium">{topic.questionCount} questions</div>
                            <div className="text-gray-500">{topic.totalMarks} marks</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Question Distribution */}
                          <div>
                            <div className="flex justify-between items-center mb-2 text-sm">
                              <span>Questions: {topic.percentage}%</span>
                              <span className="text-gray-500">Recommended: {topic.recommendedPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full ${
                                  topic.status === 'balanced' ? 'bg-green-500' :
                                  topic.status === 'overrepresented' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${(topic.percentage / topic.recommendedPercentage) * 100}%` }}
                              />
                            </div>
                          </div>

                          {/* Marks Distribution */}
                          <div>
                            <div className="flex justify-between items-center mb-2 text-sm">
                              <span>Marks: {topic.marksPercentage}%</span>
                              <span className="text-gray-500">Avg Score: {topic.averageScore.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-500 h-3 rounded-full"
                                style={{ width: `${topic.averageScore}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Difficulty Breakdown */}
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-gray-600">Difficulty breakdown:</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full" />
                              <span>Easy: {topic.difficultyDistribution.easy}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                              <span>Medium: {topic.difficultyDistribution.medium}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full" />
                              <span>Hard: {topic.difficultyDistribution.hard}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topic Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      Balance Recommendations
                    </h3>

                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-red-800">Overrepresented Topics</div>
                            <div className="text-sm text-red-700">Human Physiology (30% vs 25% recommended)</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-yellow-800">Underrepresented Topics</div>
                            <div className="text-sm text-yellow-700">Ecology (16% vs 20% recommended)</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-green-800">Well Balanced</div>
                            <div className="text-sm text-green-700">Cell Biology, Genetics, Evolution</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Performance Insights
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Highest Performing Topics</h4>
                        <div className="space-y-2">
                          {analyticsData.topicBalance
                            .sort((a, b) => b.averageScore - a.averageScore)
                            .slice(0, 3)
                            .map((topic, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                                <span className="text-sm font-medium">{topic.topic}</span>
                                <span className="text-sm text-green-600">{topic.averageScore.toFixed(1)}%</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Areas for Improvement</h4>
                        <div className="space-y-2">
                          {analyticsData.topicBalance
                            .sort((a, b) => a.averageScore - b.averageScore)
                            .slice(0, 2)
                            .map((topic, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                                <span className="text-sm font-medium">{topic.topic}</span>
                                <span className="text-sm text-red-600">{topic.averageScore.toFixed(1)}%</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Learning Outcome Mapping */}
            {activeTab === 'outcomes' && (
              <motion.div
                key="outcomes"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Learning Outcomes Overview */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Learning Outcomes Analysis
                  </h3>

                  <div className="space-y-4">
                    {analyticsData.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium">{outcome.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBloomsLevelColor(outcome.bloomsLevel)}`}>
                                {outcome.bloomsLevel}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(outcome.status)}`}>
                                {outcome.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{outcome.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{outcome.coverage}%</div>
                            <div className="text-sm text-gray-600">Coverage</div>
                            <div className="text-xs text-gray-500">
                              {outcome.questionsMapping}/{outcome.totalQuestions} questions
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{outcome.averageScore.toFixed(1)}%</div>
                            <div className="text-sm text-gray-600">Avg Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">Related Topics</div>
                            <div className="flex flex-wrap gap-1 justify-center">
                              {outcome.relatedTopics.map((topic, topicIndex) => (
                                <span key={topicIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1 text-sm">
                            <span>Question Coverage</span>
                            <span>{outcome.coverage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                outcome.coverage >= 80 ? 'bg-green-500' :
                                outcome.coverage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${outcome.coverage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bloom's Taxonomy Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-600" />
                      Bloom's Taxonomy Distribution
                    </h3>

                    <div className="space-y-3">
                      {['Remembering', 'Understanding', 'Applying', 'Analyzing', 'Evaluating', 'Creating'].map((level, index) => {
                        const count = analyticsData.learningOutcomes.filter(o => o.bloomsLevel === level).length
                        const percentage = (count / analyticsData.learningOutcomes.length) * 100
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{level}</span>
                              <span className="text-sm text-gray-500">{count} outcomes ({percentage.toFixed(0)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getBloomsLevelColor(level).split(' ')[0]}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      Outcome Performance Summary
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-green-600">
                            {analyticsData.learningOutcomes.filter(o => o.status === 'excellent' || o.status === 'good').length}
                          </div>
                          <div className="text-sm text-green-600">Well Covered</div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-yellow-600">
                            {analyticsData.learningOutcomes.filter(o => o.status === 'needs_improvement').length}
                          </div>
                          <div className="text-sm text-yellow-600">Need Attention</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Average Coverage</span>
                          <span className="text-sm font-medium">
                            {(analyticsData.learningOutcomes.reduce((sum, o) => sum + o.coverage, 0) / analyticsData.learningOutcomes.length).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Average Performance</span>
                          <span className="text-sm font-medium">
                            {(analyticsData.learningOutcomes.reduce((sum, o) => sum + o.averageScore, 0) / analyticsData.learningOutcomes.length).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-1">Recommendations</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Increase question mapping for low-coverage outcomes</li>
                          <li>• Focus on higher-order thinking skills</li>
                          <li>• Balance across Bloom's taxonomy levels</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Historical Performance Comparison */}
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Historical Trends */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Historical Performance Trends
                  </h3>

                  <div className="space-y-4">
                    {analyticsData.historicalComparison.map((test, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{test.testName}</h4>
                            <span className="text-sm text-gray-500">{test.date}</span>
                            {getTrendIcon(test.trend)}
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-800">{test.averageScore.toFixed(1)}%</div>
                            <div className="text-sm text-gray-500">Average Score</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-800">{test.completionRate.toFixed(1)}%</div>
                            <div className="text-xs text-gray-500">Completion Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-800">{test.difficulty.toFixed(1)}</div>
                            <div className="text-xs text-gray-500">Difficulty</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-800">{test.timeSpent}m</div>
                            <div className="text-xs text-gray-500">Avg Time</div>
                          </div>
                          <div className="text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              test.trend === 'improving' ? 'bg-green-100 text-green-600' :
                              test.trend === 'declining' ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {test.trend}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-2">Topic Performance</div>
                          <div className="grid grid-cols-3 gap-2">
                            {Object.entries(test.topicScores).map(([topic, score]) => (
                              <div key={topic} className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xs text-gray-600">{topic.split(' ')[0]}</div>
                                <div className="text-sm font-medium">{score.toFixed(1)}%</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparative Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-blue-600" />
                      Performance Trends
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Overall Trend Analysis</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Average scores show slight improvement over time</li>
                          <li>• Completion rates remain consistently high (&gt;90%)</li>
                          <li>• Test difficulty has been stable around 2.3</li>
                          <li>• Time management has improved</li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Score Improvement</span>
                            <span className="text-sm font-medium text-green-600">+3.3%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Completion Rate</span>
                            <span className="text-sm font-medium text-blue-600">94.2%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      Best Performing Areas
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Strongest Topics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                            <span className="text-sm">Cell Biology</span>
                            <span className="text-sm font-medium text-green-600">72.4% avg</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                            <span className="text-sm">Genetics</span>
                            <span className="text-sm font-medium text-green-600">68.7% avg</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Areas for Focus</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                            <span className="text-sm">Evolution</span>
                            <span className="text-sm font-medium text-yellow-600">54.3% avg</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                            <span className="text-sm">Ecology</span>
                            <span className="text-sm font-medium text-yellow-600">58.9% avg</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-1">Insights</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          <li>• Cell Biology shows consistent high performance</li>
                          <li>• Evolution topics need more practice questions</li>
                          <li>• Time allocation is optimal across tests</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Analytics