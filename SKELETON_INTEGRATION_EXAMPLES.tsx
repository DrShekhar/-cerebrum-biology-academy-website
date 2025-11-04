/**
 * SKELETON LOADERS - INTEGRATION EXAMPLES
 *
 * This file contains practical examples of integrating skeleton loaders
 * into the AIEducationDashboard component.
 */

import React, { useState, useEffect } from 'react'
import {
  ProgressCardsGridSkeleton,
  ActivityFeedSkeleton,
  PredictionsSkeleton,
  AnalyticsDashboardSkeleton,
  RealTimeMetricsSkeleton,
} from '@/components/ai/skeletons'

// ============================================================================
// EXAMPLE 1: Progress Cards with Individual Loading States
// ============================================================================

export function ProgressSectionExample() {
  const [isLoadingProgress, setIsLoadingProgress] = useState(true)
  const [progressData, setProgressData] = useState(null)

  useEffect(() => {
    // Simulate API call
    fetchProgressData()
      .then((data) => setProgressData(data))
      .finally(() => setIsLoadingProgress(false))
  }, [])

  return (
    <div>
      {isLoadingProgress ? (
        <ProgressCardsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <SyllabusCard
            completed={progressData.syllabus.completed}
            total={progressData.syllabus.total}
            change="+5%"
          />
          <StudyHoursCard
            hours={progressData.studyHours.hours}
            target={progressData.studyHours.target}
            change="+8h"
          />
          <TestScoreCard
            score={progressData.testScore.score}
            maxScore={progressData.testScore.maxScore}
            change="+2.5%"
          />
          <StreakCard
            days={progressData.streak.days}
            bestStreak={progressData.streak.bestStreak}
            change="+3 days"
          />
        </div>
      )}
    </div>
  )
}

// ============================================================================
// EXAMPLE 2: AI Predictions Section with Loading State
// ============================================================================

export function PredictionsSectionExample() {
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(true)
  const [predictions, setPredictions] = useState(null)

  useEffect(() => {
    fetchPredictions()
      .then((data) => setPredictions(data))
      .finally(() => setIsLoadingPredictions(false))
  }, [])

  if (isLoadingPredictions) {
    return <PredictionsSkeleton />
  }

  return (
    <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
          <Zap className="w-5 h-5 mr-2 sm:mr-3 text-yellow-500" />
          AI Predictions
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {predictions.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// EXAMPLE 3: Recent Activity Feed with Loading State
// ============================================================================

export function ActivitySectionExample() {
  const [isLoadingActivity, setIsLoadingActivity] = useState(true)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchRecentActivities()
      .then((data) => setActivities(data))
      .finally(() => setIsLoadingActivity(false))
  }, [])

  if (isLoadingActivity) {
    return <ActivityFeedSkeleton />
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
          <Activity className="w-5 h-5 mr-2 sm:mr-3 text-green-500" />
          Recent Activity
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// EXAMPLE 4: Complete Dashboard with Multiple Loading States
// ============================================================================

export function CompleteDashboardExample() {
  const [isLoadingProgress, setIsLoadingProgress] = useState(true)
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(true)
  const [isLoadingActivity, setIsLoadingActivity] = useState(true)

  const [progressData, setProgressData] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [activities, setActivities] = useState([])

  useEffect(() => {
    // Load progress data
    fetchProgressData()
      .then((data) => setProgressData(data))
      .finally(() => setIsLoadingProgress(false))

    // Load predictions
    fetchPredictions()
      .then((data) => setPredictions(data))
      .finally(() => setIsLoadingPredictions(false))

    // Load activities
    fetchRecentActivities()
      .then((data) => setActivities(data))
      .finally(() => setIsLoadingActivity(false))
  }, [])

  return (
    <div className="space-y-8">
      {/* Progress Cards Section */}
      {isLoadingProgress ? (
        <ProgressCardsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <SyllabusCard {...progressData.syllabus} />
          <StudyHoursCard {...progressData.studyHours} />
          <TestScoreCard {...progressData.testScore} />
          <StreakCard {...progressData.streak} />
        </div>
      )}

      {/* Predictions and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* AI Predictions */}
        <div className="lg:col-span-2">
          {isLoadingPredictions ? (
            <PredictionsSkeleton />
          ) : (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl">
              {/* Predictions content */}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {isLoadingActivity ? (
          <ActivityFeedSkeleton />
        ) : (
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-xl">
            {/* Activity content */}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// EXAMPLE 5: Analytics Tab with Loading State
// ============================================================================

export function AnalyticsTabExample() {
  const [activeTab, setActiveTab] = useState('analytics')
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true)
  const [analyticsData, setAnalyticsData] = useState(null)

  useEffect(() => {
    if (activeTab === 'analytics') {
      setIsLoadingAnalytics(true)
      fetchAnalyticsData()
        .then((data) => setAnalyticsData(data))
        .finally(() => setIsLoadingAnalytics(false))
    }
  }, [activeTab])

  return (
    <>
      {activeTab === 'analytics' && (
        <motion.div
          key="analytics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isLoadingAnalytics ? <AnalyticsDashboardSkeleton /> : <Analytics data={analyticsData} />}
        </motion.div>
      )}
    </>
  )
}

// ============================================================================
// EXAMPLE 6: Metrics Tab with Loading State
// ============================================================================

export function MetricsTabExample() {
  const [activeTab, setActiveTab] = useState('metrics')
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)
  const [metricsData, setMetricsData] = useState(null)

  useEffect(() => {
    if (activeTab === 'metrics') {
      setIsLoadingMetrics(true)
      fetchMetricsData()
        .then((data) => setMetricsData(data))
        .finally(() => setIsLoadingMetrics(false))
    }
  }, [activeTab])

  return (
    <>
      {activeTab === 'metrics' && (
        <motion.div
          key="metrics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isLoadingMetrics ? <RealTimeMetricsSkeleton /> : <RealTimeMetrics data={metricsData} />}
        </motion.div>
      )}
    </>
  )
}

// ============================================================================
// EXAMPLE 7: Conditional Loading with Error Handling
// ============================================================================

export function LoadingWithErrorExample() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <ProgressCardsGridSkeleton />
  }

  if (error) {
    return (
      <div className="backdrop-blur-xl bg-red-50 rounded-2xl p-8 border border-red-200">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  return <ProgressCards data={data} />
}

// ============================================================================
// EXAMPLE 8: Staggered Loading (Multiple Sections)
// ============================================================================

export function StaggeredLoadingExample() {
  const [loadingStates, setLoadingStates] = useState({
    progress: true,
    predictions: true,
    activity: true,
  })

  useEffect(() => {
    // Load progress first
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, progress: false }))
    }, 1000)

    // Then predictions
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, predictions: false }))
    }, 1500)

    // Finally activity
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, activity: false }))
    }, 2000)
  }, [])

  return (
    <div className="space-y-8">
      {loadingStates.progress ? <ProgressCardsGridSkeleton /> : <ProgressCards />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {loadingStates.predictions ? <PredictionsSkeleton /> : <Predictions />}
        </div>

        {loadingStates.activity ? <ActivityFeedSkeleton /> : <ActivityFeed />}
      </div>
    </div>
  )
}

// ============================================================================
// HELPER FUNCTIONS (Mock API calls)
// ============================================================================

async function fetchProgressData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    syllabus: { completed: 76, total: 100 },
    studyHours: { hours: 284, target: 400 },
    testScore: { score: 87.5, maxScore: 100 },
    streak: { days: 12, bestStreak: 30 },
  }
}

async function fetchPredictions() {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return [
    { id: 1, label: 'NEET Score', value: 650, max: 720 },
    { id: 2, label: 'Readiness', value: 82, max: 100 },
    { id: 3, label: 'Rank', value: 1250, max: 10000 },
  ]
}

async function fetchRecentActivities() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    { id: 1, type: 'doubt', title: 'Cell Division', description: 'Explained mitosis' },
    { id: 2, type: 'test', title: 'Genetics Test', description: 'Score: 85%' },
    { id: 3, type: 'achievement', title: 'Weekly Goal', description: '15 hours' },
  ]
}

async function fetchAnalyticsData() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return {
    /* analytics data */
  }
}

async function fetchMetricsData() {
  await new Promise((resolve) => setTimeout(resolve, 1800))
  return {
    /* metrics data */
  }
}

async function fetchData() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    /* generic data */
  }
}
