'use client'

import { useMemo } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Award,
  Calculator,
  Target,
  BarChart3,
  PieChart,
} from 'lucide-react'

interface CourseData {
  id: string
  seriesId: 'pinnacle' | 'ascent' | 'pursuit'
  planId: 'A' | 'B' | 'C'
  name: string
  price: number
  totalHours: number
  batchSize: number
  successRate: number
  features: {
    liveClasses: number
    mockTests: number
    personalMentor: boolean
    testSeries: boolean
    parentCounseling: boolean
  }
}

interface StudentProfile {
  currentClass: string
  studyHours: number
  budget: number
  previousScore?: number
}

interface ComparisonAnalyticsProps {
  courses: CourseData[]
  studentProfile?: StudentProfile
  className?: string
}

interface AnalyticsInsight {
  type: 'positive' | 'negative' | 'neutral'
  title: string
  description: string
  icon: React.ComponentType<any>
  value?: string
}

export default function ComparisonAnalytics({
  courses,
  studentProfile,
  className = '',
}: ComparisonAnalyticsProps) {
  const analytics = useMemo(() => {
    if (courses.length === 0) return null

    // Calculate key metrics
    const priceRange = {
      min: Math.min(...courses.map((c) => c.price)),
      max: Math.max(...courses.map((c) => c.price)),
      avg: Math.round(courses.reduce((sum, c) => sum + c.price, 0) / courses.length),
    }

    const valueAnalysis = courses
      .map((course) => ({
        ...course,
        costPerHour: Math.round(course.price / course.totalHours),
        costPerClass: Math.round(course.price / course.features.liveClasses),
        valueScore: calculateValueScore(course),
      }))
      .sort((a, b) => b.valueScore - a.valueScore)

    const bestValue = valueAnalysis[0]
    const mostAffordable = courses.reduce((min, course) =>
      course.price < min.price ? course : min
    )
    const highestSuccess = courses.reduce((max, course) =>
      course.successRate > max.successRate ? course : max
    )

    // Generate insights
    const insights: AnalyticsInsight[] = []

    // Price insights
    if (priceRange.max - priceRange.min > 50000) {
      insights.push({
        type: 'neutral',
        title: 'Wide Price Range',
        description: `Courses range from ₹${(priceRange.min / 1000).toFixed(0)}K to ₹${(priceRange.max / 1000).toFixed(0)}K - consider your budget carefully`,
        icon: DollarSign,
        value: `₹${((priceRange.max - priceRange.min) / 1000).toFixed(0)}K difference`,
      })
    }

    // Value insights
    if (bestValue.costPerHour < 100) {
      insights.push({
        type: 'positive',
        title: 'Excellent Value',
        description: `${bestValue.name} offers exceptional value at just ₹${bestValue.costPerHour}/hour`,
        icon: TrendingUp,
        value: `₹${bestValue.costPerHour}/hour`,
      })
    }

    // Budget compatibility
    if (studentProfile?.budget) {
      const withinBudget = courses.filter((c) => c.price <= studentProfile.budget)
      const overBudget = courses.filter((c) => c.price > studentProfile.budget)

      if (withinBudget.length > 0) {
        insights.push({
          type: 'positive',
          title: 'Budget-Friendly Options',
          description: `${withinBudget.length} course${withinBudget.length > 1 ? 's' : ''} fit within your ₹${(studentProfile.budget / 1000).toFixed(0)}K budget`,
          icon: Calculator,
          value: `${withinBudget.length}/${courses.length} courses`,
        })
      }

      if (overBudget.length > 0) {
        insights.push({
          type: 'negative',
          title: 'Budget Consideration',
          description: `${overBudget.length} course${overBudget.length > 1 ? 's exceed' : ' exceeds'} your budget by ₹${Math.min(...overBudget.map((c) => c.price - studentProfile.budget)) / 1000}K+`,
          icon: TrendingDown,
          value: `₹${(Math.min(...overBudget.map((c) => c.price - studentProfile.budget)) / 1000).toFixed(0)}K over`,
        })
      }
    }

    // Success rate insights
    if (highestSuccess.successRate > 95) {
      insights.push({
        type: 'positive',
        title: 'Exceptional Success Rate',
        description: `${highestSuccess.name} has an outstanding ${highestSuccess.successRate}% NEET success rate`,
        icon: Award,
        value: `${highestSuccess.successRate}%`,
      })
    }

    // Batch size insights
    const smallBatch = courses.find((c) => c.batchSize <= 15)
    if (smallBatch) {
      insights.push({
        type: 'positive',
        title: 'Personal Attention',
        description: `${smallBatch.name} offers small batches of ${smallBatch.batchSize} students for maximum attention`,
        icon: Users,
        value: `${smallBatch.batchSize} students`,
      })
    }

    return {
      priceRange,
      valueAnalysis,
      bestValue,
      mostAffordable,
      highestSuccess,
      insights,
    }
  }, [courses, studentProfile])

  function calculateValueScore(course: CourseData): number {
    let score = 0

    // Cost efficiency (40% weight)
    const costPerHour = course.price / course.totalHours
    if (costPerHour < 100) score += 40
    else if (costPerHour < 150) score += 30
    else if (costPerHour < 200) score += 20
    else score += 10

    // Success rate (30% weight)
    score += (course.successRate / 100) * 30

    // Features (20% weight)
    const featureScore = [
      course.features.personalMentor,
      course.features.testSeries,
      course.features.parentCounseling,
    ].filter(Boolean).length
    score += (featureScore / 3) * 20

    // Batch size (10% weight)
    if (course.batchSize <= 15) score += 10
    else if (course.batchSize <= 25) score += 7
    else score += 4

    return Math.round(score)
  }

  if (!analytics || courses.length === 0) {
    return (
      <div className={`bg-gray-50 rounded-xl p-8 text-center ${className}`}>
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Add courses to see detailed comparison analytics</p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center">
          <BarChart3 className="w-6 h-6 mr-3" />
          <h3 className="text-xl font-bold">Comparison Analytics</h3>
        </div>
        <p className="text-indigo-100 mt-2">
          AI-powered insights to help you make the best decision
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className="bg-green-50 rounded-lg p-4 text-center border border-green-200 animate-fadeInUp"
          >
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-900">
              ₹{(analytics.priceRange.min / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-green-700">Most Affordable</div>
            <div className="text-xs text-gray-600 mt-1">{analytics.mostAffordable.name}</div>
          </div>

          <div
            className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200 animate-fadeInUp"
          >
            <Calculator className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-900">
              ₹{analytics.bestValue.costPerHour}
            </div>
            <div className="text-sm text-blue-700">Best Value/Hour</div>
            <div className="text-xs text-gray-600 mt-1">{analytics.bestValue.name}</div>
          </div>

          <div
            className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200 animate-fadeInUp"
          >
            <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-900">
              {analytics.highestSuccess.successRate}%
            </div>
            <div className="text-sm text-purple-700">Highest Success</div>
            <div className="text-xs text-gray-600 mt-1">{analytics.highestSuccess.name}</div>
          </div>

          <div
            className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200 animate-fadeInUp"
          >
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-900">
              {analytics.valueAnalysis[0].valueScore}
            </div>
            <div className="text-sm text-orange-700">Top Value Score</div>
            <div className="text-xs text-gray-600 mt-1">{analytics.valueAnalysis[0].name}</div>
          </div>
        </div>

        {/* Value Analysis Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Value Analysis Breakdown
          </h4>

          <div className="space-y-4">
            {analytics.valueAnalysis.map((course, index) => {
              const percentage = (course.valueScore / 100) * 100
              const barColor =
                index === 0 ? 'bg-green-600' : index === 1 ? 'bg-blue-500' : 'bg-gray-400'

              return (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-900">{course.name}</span>
                    <span className="text-gray-600">{course.valueScore}/100</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹{course.costPerHour}/hour</span>
                    <span>{course.successRate}% success</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            AI-Powered Insights
          </h4>

          {analytics.insights.map((insight, index) => {
            const IconComponent = insight.icon
            const colorClasses = {
              positive: 'bg-green-50 border-green-200 text-green-900',
              negative: 'bg-red-50 border-red-200 text-red-900',
              neutral: 'bg-blue-50 border-blue-200 text-blue-900',
            }

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${colorClasses[insight.type]}`}
              >
                <div className="flex items-start">
                  <IconComponent className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-semibold">{insight.title}</h5>
                      {insight.value && (
                        <span className="text-sm font-mono bg-white px-2 py-1 rounded">
                          {insight.value}
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-90">{insight.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recommendation Summary */}
        <div className="bg-gray-50 rounded-lg p-6 border border-blue-200">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            Our Recommendation
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
              <div>
                <div className="font-semibold text-gray-900">{analytics.bestValue.name}</div>
                <div className="text-sm text-gray-600">
                  Best overall value with {analytics.bestValue.valueScore}/100 score
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">
                  ₹{analytics.bestValue.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">₹{analytics.bestValue.costPerHour}/hour</div>
              </div>
            </div>

            {studentProfile && (
              <div className="text-sm text-gray-600">
                <strong>Personalized Note:</strong> Based on your profile (Class{' '}
                {studentProfile.currentClass},{studentProfile.studyHours}h/week study time, ₹
                {(studentProfile.budget / 1000).toFixed(0)}K budget), this course offers the best
                balance of features, success rate, and value for money.
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            📊 Download Full Report
          </button>
          <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            💬 Discuss with Expert
          </button>
        </div>
      </div>
    </div>
  )
}
