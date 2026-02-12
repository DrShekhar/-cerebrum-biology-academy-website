'use client'

import React, { useState, useEffect } from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Award,
  Clock,
  BookOpen,
  Brain,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalTests: number
    totalStudents: number
    averageScore: number
    completionRate: number
    totalAttempts: number
    activeStudents: number
  }
  performance: {
    subjectWise: Array<{
      subject: string
      averageScore: number
      completionRate: number
      studentsCount: number
      difficulty: 'Easy' | 'Medium' | 'Hard'
    }>
    difficultyWise: Array<{
      difficulty: string
      averageScore: number
      completionRate: number
      questionCount: number
    }>
    timeAnalysis: Array<{
      timeRange: string
      averageScore: number
      attempts: number
      students: number
    }>
  }
  trends: {
    weeklyProgress: Array<{
      week: string
      scores: number
      attempts: number
      newStudents: number
    }>
    topPerformers: Array<{
      studentName: string
      averageScore: number
      testsCompleted: number
      rank: number
      improvement: number
    }>
    strugglingAreas: Array<{
      topic: string
      averageScore: number
      attemptCount: number
      difficultyLevel: number
    }>
  }
  realTime: {
    activeNow: number
    testsInProgress: number
    recentSubmissions: Array<{
      studentName: string
      testName: string
      score: number
      timeAgo: string
    }>
    todaysStats: {
      testsCompleted: number
      newSignups: number
      averageScore: number
      totalTimeSpent: number
    }
  }
}

interface ViewAnalyticsProps {
  isOpen: boolean
  onClose: () => void
}

export function ViewAnalytics({ isOpen, onClose }: ViewAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'trends' | 'realtime'>(
    'overview'
  )

  // Mock data for demonstration
  const mockAnalyticsData: AnalyticsData = {
    overview: {
      totalTests: 156,
      totalStudents: 150000,
      averageScore: 78.5,
      completionRate: 89.2,
      totalAttempts: 12450,
      activeStudents: 342,
    },
    performance: {
      subjectWise: [
        {
          subject: 'Cell Biology',
          averageScore: 82.1,
          completionRate: 91.5,
          studentsCount: 1245,
          difficulty: 'Medium',
        },
        {
          subject: 'Genetics',
          averageScore: 75.8,
          completionRate: 87.3,
          studentsCount: 1156,
          difficulty: 'Hard',
        },
        {
          subject: 'Ecology',
          averageScore: 84.2,
          completionRate: 93.1,
          studentsCount: 987,
          difficulty: 'Easy',
        },
        {
          subject: 'Human Physiology',
          averageScore: 79.4,
          completionRate: 88.7,
          studentsCount: 1398,
          difficulty: 'Medium',
        },
        {
          subject: 'Plant Biology',
          averageScore: 81.6,
          completionRate: 90.2,
          studentsCount: 876,
          difficulty: 'Medium',
        },
      ],
      difficultyWise: [
        { difficulty: 'Easy', averageScore: 85.2, completionRate: 94.1, questionCount: 1245 },
        { difficulty: 'Medium', averageScore: 78.9, completionRate: 89.3, questionCount: 2156 },
        { difficulty: 'Hard', averageScore: 72.4, completionRate: 83.7, questionCount: 987 },
      ],
      timeAnalysis: [
        { timeRange: '0-30 min', averageScore: 81.2, attempts: 3456, students: 1234 },
        { timeRange: '30-60 min', averageScore: 79.8, attempts: 4567, students: 1567 },
        { timeRange: '60-90 min', averageScore: 76.5, attempts: 2345, students: 876 },
        { timeRange: '90+ min', averageScore: 74.1, attempts: 1234, students: 456 },
      ],
    },
    trends: {
      weeklyProgress: [
        { week: 'Week 1', scores: 76.2, attempts: 2145, newStudents: 45 },
        { week: 'Week 2', scores: 78.1, attempts: 2367, newStudents: 52 },
        { week: 'Week 3', scores: 79.5, attempts: 2589, newStudents: 67 },
        { week: 'Week 4', scores: 81.2, attempts: 2734, newStudents: 73 },
      ],
      topPerformers: [
        {
          studentName: 'Arjun Sharma',
          averageScore: 94.5,
          testsCompleted: 23,
          rank: 1,
          improvement: 12.3,
        },
        {
          studentName: 'Priya Patel',
          averageScore: 92.8,
          testsCompleted: 21,
          rank: 2,
          improvement: 8.7,
        },
        {
          studentName: 'Rahul Kumar',
          averageScore: 91.2,
          testsCompleted: 25,
          rank: 3,
          improvement: 15.2,
        },
        {
          studentName: 'Sneha Reddy',
          averageScore: 89.6,
          testsCompleted: 19,
          rank: 4,
          improvement: 9.8,
        },
        {
          studentName: 'Amit Singh',
          averageScore: 88.9,
          testsCompleted: 22,
          rank: 5,
          improvement: 6.4,
        },
      ],
      strugglingAreas: [
        {
          topic: 'Photosynthesis Reactions',
          averageScore: 64.2,
          attemptCount: 1245,
          difficultyLevel: 85,
        },
        { topic: 'DNA Replication', averageScore: 67.8, attemptCount: 987, difficultyLevel: 82 },
        { topic: 'Enzyme Kinetics', averageScore: 69.1, attemptCount: 876, difficultyLevel: 78 },
        {
          topic: 'Respiration Pathways',
          averageScore: 71.3,
          attemptCount: 1123,
          difficultyLevel: 75,
        },
      ],
    },
    realTime: {
      activeNow: 142,
      testsInProgress: 67,
      recentSubmissions: [
        { studentName: 'Kiran M.', testName: 'Cell Biology Quiz', score: 85, timeAgo: '2 min ago' },
        { studentName: 'Sonal K.', testName: 'Genetics Test', score: 92, timeAgo: '5 min ago' },
        { studentName: 'Ravi T.', testName: 'Ecology Assessment', score: 78, timeAgo: '8 min ago' },
        { studentName: 'Meera S.', testName: 'Physiology Mock', score: 89, timeAgo: '12 min ago' },
      ],
      todaysStats: {
        testsCompleted: 234,
        newSignups: 12,
        averageScore: 79.8,
        totalTimeSpent: 1247, // in hours
      },
    },
  }

  useEffect(() => {
    if (isOpen) {
      fetchAnalyticsData()
    }
  }, [isOpen, selectedTimeRange, selectedSubject])

  const fetchAnalyticsData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData)
      setIsLoading(false)
    }, 1000)
  }

  const refreshData = () => {
    fetchAnalyticsData()
  }

  const exportData = () => {
    // Export analytics data as CSV/PDF
    console.log('Exporting analytics data...')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                <p className="text-blue-100">Comprehensive test performance insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={refreshData}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                disabled={isLoading}
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={exportData}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-1 text-sm border border-white border-opacity-30"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-white bg-opacity-20 text-white rounded-lg px-3 py-1 text-sm border border-white border-opacity-30"
            >
              <option value="all">All Subjects</option>
              <option value="cell-biology">Cell Biology</option>
              <option value="genetics">Genetics</option>
              <option value="ecology">Ecology</option>
              <option value="physiology">Human Physiology</option>
              <option value="plant-biology">Plant Biology</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Overview', icon: Eye },
              { key: 'performance', label: 'Performance', icon: Target },
              { key: 'trends', label: 'Trends', icon: TrendingUp },
              { key: 'realtime', label: 'Real-time', icon: Zap },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Loading analytics data...</p>
              </div>
            </div>
          ) : analyticsData ? (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="backdrop-blur-lg bg-blue-500/10 rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Total Tests</h3>
                          <p className="text-3xl font-bold text-blue-600">
                            {analyticsData.overview.totalTests}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-lg bg-green-600/10 rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Total Students</h3>
                          <p className="text-3xl font-bold text-green-600">
                            {analyticsData.overview.totalStudents}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-lg bg-purple-500/10 rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Average Score</h3>
                          <p className="text-3xl font-bold text-purple-600">
                            {analyticsData.overview.averageScore}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-lg bg-orange-500/10 rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Completion Rate</h3>
                          <p className="text-3xl font-bold text-orange-600">
                            {analyticsData.overview.completionRate}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-lg bg-green-600/10 rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Total Attempts</h3>
                          <p className="text-3xl font-bold text-green-600">
                            {analyticsData.overview.totalAttempts}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-lg bg-indigo-500/10 rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Active Students</h3>
                          <p className="text-3xl font-bold text-indigo-600">
                            {analyticsData.overview.activeStudents}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Tab */}
              {activeTab === 'performance' && (
                <div className="space-y-6">
                  {/* Subject-wise Performance */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-500" />
                      Subject-wise Performance
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-4 font-medium text-gray-600">
                              Subject
                            </th>
                            <th className="text-left py-2 px-4 font-medium text-gray-600">
                              Avg Score
                            </th>
                            <th className="text-left py-2 px-4 font-medium text-gray-600">
                              Completion
                            </th>
                            <th className="text-left py-2 px-4 font-medium text-gray-600">
                              Students
                            </th>
                            <th className="text-left py-2 px-4 font-medium text-gray-600">
                              Difficulty
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {analyticsData.performance.subjectWise.map((subject, index) => (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="py-3 px-4 font-medium text-gray-800">
                                {subject.subject}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded text-sm font-medium ${
                                    subject.averageScore >= 80
                                      ? 'bg-green-100 text-green-700'
                                      : subject.averageScore >= 70
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {subject.averageScore}%
                                </span>
                              </td>
                              <td className="py-3 px-4 text-gray-600">{subject.completionRate}%</td>
                              <td className="py-3 px-4 text-gray-600">{subject.studentsCount}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    subject.difficulty === 'Easy'
                                      ? 'bg-green-100 text-green-700'
                                      : subject.difficulty === 'Medium'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {subject.difficulty}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Difficulty Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Difficulty-wise Analysis
                      </h3>
                      <div className="space-y-4">
                        {analyticsData.performance.difficultyWise.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <span className="font-medium text-gray-800">{item.difficulty}</span>
                              <p className="text-sm text-gray-600">
                                {item.questionCount} questions
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">{item.averageScore}%</p>
                              <p className="text-sm text-gray-600">
                                {item.completionRate}% completion
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Analysis</h3>
                      <div className="space-y-4">
                        {analyticsData.performance.timeAnalysis.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <span className="font-medium text-gray-800">{item.timeRange}</span>
                              <p className="text-sm text-gray-600">{item.students} students</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">{item.averageScore}%</p>
                              <p className="text-sm text-gray-600">{item.attempts} attempts</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trends Tab */}
              {activeTab === 'trends' && (
                <div className="space-y-6">
                  {/* Top Performers */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      Top Performers
                    </h3>
                    <div className="space-y-3">
                      {analyticsData.trends.topPerformers.map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {student.rank}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{student.studentName}</p>
                              <p className="text-sm text-gray-600">
                                {student.testsCompleted} tests completed
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-yellow-600">{student.averageScore}%</p>
                            <p className="text-sm text-green-600">
                              +{student.improvement}% improvement
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Struggling Areas */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                      Areas Needing Attention
                    </h3>
                    <div className="space-y-3">
                      {analyticsData.trends.strugglingAreas.map((area, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">{area.topic}</p>
                            <p className="text-sm text-gray-600">{area.attemptCount} attempts</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600">{area.averageScore}%</p>
                            <p className="text-sm text-gray-600">
                              Difficulty: {area.difficultyLevel}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Real-time Tab */}
              {activeTab === 'realtime' && (
                <div className="space-y-6">
                  {/* Today's Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-600">Tests Completed</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {analyticsData.realTime.todaysStats.testsCompleted}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-600">New Signups</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {analyticsData.realTime.todaysStats.newSignups}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-medium text-gray-600">Today's Avg Score</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 mt-1">
                        {analyticsData.realTime.todaysStats.averageScore}%
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-medium text-gray-600">Time Spent</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600 mt-1">
                        {analyticsData.realTime.todaysStats.totalTimeSpent}h
                      </p>
                    </div>
                  </div>

                  {/* Live Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-green-600" />
                        Live Activity
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-gray-700">Students Active Now</span>
                          <span className="font-bold text-green-600">
                            {analyticsData.realTime.activeNow}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-gray-700">Tests in Progress</span>
                          <span className="font-bold text-blue-600">
                            {analyticsData.realTime.testsInProgress}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Recent Submissions
                      </h3>
                      <div className="space-y-3">
                        {analyticsData.realTime.recentSubmissions.map((submission, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-800">{submission.studentName}</p>
                              <p className="text-sm text-gray-600">{submission.testName}</p>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-bold ${
                                  submission.score >= 80
                                    ? 'text-green-600'
                                    : submission.score >= 60
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                                }`}
                              >
                                {submission.score}%
                              </p>
                              <p className="text-xs text-gray-500">{submission.timeAgo}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600">Failed to load analytics data</p>
                <button
                  onClick={refreshData}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
