'use client'

import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Target,
  Calendar,
  Star,
  BookOpen,
  Clock,
  Trophy,
  Zap,
  ArrowUp,
  Filter,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface SuccessAnalyticsProps {
  data: {
    totalStudents: number
    successRate: number
    averageImprovement: number
    topRanks: number
    batchesCompleted: number
    studyMaterials: number
    mockTestsCompleted: number
    averageStudyHours: number
    subjectWiseStats: {
      biology: { averageScore: number; improvement: number; toppers: number }
      chemistry: { averageScore: number; improvement: number; toppers: number }
      physics: { averageScore: number; improvement: number; toppers: number }
    }
    yearlyProgress: {
      year: string
      students: number
      avgScore: number
      topRanks: number
    }[]
    batchAnalysis: {
      batchType: string
      students: number
      successRate: number
      avgImprovement: number
    }[]
    collegeAdmissions: {
      college: string
      students: number
      avgRank: number
    }[]
  }
}

export function SuccessAnalytics({ data }: SuccessAnalyticsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'toppers' | 'droppers'>('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'batches' | 'colleges'>('overview')

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    color,
    trend 
  }: {
    title: string
    value: string | number
    subtitle: string
    icon: React.ComponentType<any>
    color: string
    trend?: number
  }) => (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-600">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">+{trend}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{subtitle}</div>
    </motion.div>
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'subjects', label: 'Subject Analysis', icon: BookOpen },
    { id: 'batches', label: 'Batch Performance', icon: Users },
    { id: 'colleges', label: 'College Admissions', icon: Award },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Success Analytics Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Comprehensive analysis of student performance and achievements at Cerebrum Biology Academy
        </p>
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl font-bold">{data.totalStudents.toLocaleString()}</div>
            <div className="text-blue-100 text-sm">Total Students</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl font-bold">{data.successRate}%</div>
            <div className="text-blue-100 text-sm">Success Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl font-bold">+{data.averageImprovement}</div>
            <div className="text-blue-100 text-sm">Avg. Improvement</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="text-2xl font-bold">{data.topRanks}</div>
            <div className="text-blue-100 text-sm">Top 1000 Ranks</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Success Rate"
              value={`${data.successRate}%`}
              subtitle="Students qualifying NEET"
              icon={Trophy}
              color="bg-yellow-500"
              trend={15}
            />
            <StatCard
              title="Average Improvement"
              value={`+${data.averageImprovement}`}
              subtitle="Marks improvement"
              icon={TrendingUp}
              color="bg-green-500"
              trend={12}
            />
            <StatCard
              title="Study Hours"
              value={`${data.averageStudyHours}h`}
              subtitle="Average daily study"
              icon={Clock}
              color="bg-purple-500"
            />
            <StatCard
              title="Mock Tests"
              value={data.mockTestsCompleted.toLocaleString()}
              subtitle="Tests completed"
              icon={Target}
              color="bg-blue-500"
              trend={25}
            />
          </div>

          {/* Yearly Progress Chart */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Year-over-Year Progress</h3>
            
            <div className="relative">
              <div className="flex items-end justify-between h-64 bg-gray-50 rounded-2xl p-6">
                {data.yearlyProgress.map((year, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-16 transition-all duration-1000"
                      style={{ 
                        height: `${(year.avgScore / 720) * 100}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    >
                      <div className="text-white text-xs font-semibold p-1 text-center">
                        {year.avgScore}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-lg font-bold text-gray-900">{year.year}</div>
                      <div className="text-sm text-gray-600">{year.students} students</div>
                      <div className="text-sm text-green-600">{year.topRanks} top ranks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subject Analysis Tab */}
      {activeTab === 'subjects' && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(data.subjectWiseStats).map(([subject, stats]) => (
              <motion.div
                key={subject}
                className={`rounded-3xl shadow-lg p-8 ${
                  subject === 'biology' ? 'bg-green-50' :
                  subject === 'chemistry' ? 'bg-blue-50' : 'bg-purple-50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-4 ${
                    subject === 'biology' ? 'text-green-900' :
                    subject === 'chemistry' ? 'text-blue-900' : 'text-purple-900'
                  }`}>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className={`text-3xl font-bold ${
                        subject === 'biology' ? 'text-green-600' :
                        subject === 'chemistry' ? 'text-blue-600' : 'text-purple-600'
                      }`}>
                        {stats.averageScore}/{subject === 'biology' ? '360' : '180'}
                      </div>
                      <div className="text-gray-600">Average Score</div>
                    </div>
                    
                    <div>
                      <div className={`text-2xl font-bold ${
                        subject === 'biology' ? 'text-green-600' :
                        subject === 'chemistry' ? 'text-blue-600' : 'text-purple-600'
                      }`}>
                        +{stats.improvement}
                      </div>
                      <div className="text-gray-600">Avg. Improvement</div>
                    </div>
                    
                    <div>
                      <div className={`text-2xl font-bold ${
                        subject === 'biology' ? 'text-green-600' :
                        subject === 'chemistry' ? 'text-blue-600' : 'text-purple-600'
                      }`}>
                        {stats.toppers}
                      </div>
                      <div className="text-gray-600">160+ Scorers</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Batch Analysis Tab */}
      {activeTab === 'batches' && (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Batch Performance Analysis</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Batch Type</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Students</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Success Rate</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Avg. Improvement</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.batchAnalysis.map((batch, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{batch.batchType}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{batch.students}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            batch.successRate >= 90 ? 'bg-green-100 text-green-800' :
                            batch.successRate >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {batch.successRate}%
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-green-600 font-medium">+{batch.avgImprovement}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(batch.successRate / 20)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* College Admissions Tab */}
      {activeTab === 'colleges' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top College Admissions</h3>
            
            <div className="space-y-4">
              {data.collegeAdmissions.map((college, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{college.college}</h4>
                      <p className="text-gray-600">Average Rank: #{college.avgRank.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{college.students}</div>
                    <div className="text-gray-600 text-sm">Students Admitted</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}