'use client'

import React, { useState, useEffect } from 'react'
import { ABTestingService, ABTestResults } from '@/lib/abTesting/abTestingService'
import {
  BarChart2,
  Trophy,
  AlertTriangle,
  Clock,
  Users,
  MousePointerClick,
  BadgeCheck,
  Play,
} from 'lucide-react'

interface ABTestDashboardProps {
  testId?: string
  showAllTests?: boolean
}

export function ABTestDashboard({ testId, showAllTests = true }: ABTestDashboardProps) {
  const [selectedTest, setSelectedTest] = useState<string>(testId || 'hero_section')
  const [results, setResults] = useState<ABTestResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadTestResults()
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadTestResults, 30000)
    return () => clearInterval(interval)
  }, [selectedTest])

  const loadTestResults = async () => {
    setLoading(true)
    try {
      // Get results from our A/B testing service
      const testResults = ABTestingService.getTestResults(selectedTest)
      setResults(testResults)

      // Also fetch from API for server-side data
      const response = await fetch(`/api/analytics/ab-test?testName=${selectedTest}`)
      if (response.ok) {
        const apiData = await response.json()
        // Merge with local results if needed
      }
    } catch (error) {
      console.error('Failed to load test results:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const refreshData = () => {
    setRefreshing(true)
    loadTestResults()
  }

  const exportData = () => {
    const data = ABTestingService.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ab-test-data-${selectedTest}-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading && !results) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const activeTests = ABTestingService.getAllActiveTests()

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-blue-600" />
            A/B Test Analytics
          </h2>
          <p className="text-gray-600 mt-1">Monitor and analyze test performance</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {refreshing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Clock className="h-4 w-4" />
            )}
            Refresh
          </button>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <BarChart2 className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Test Selector */}
      {showAllTests && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Test</label>
          <select
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {activeTests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.name} ({test.status})
              </option>
            ))}
          </select>
        </div>
      )}

      {results && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Visitors</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {Object.values(results.variants).reduce((sum, v) => sum + v.visitors, 0)}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Total Conversions</span>
              </div>
              <div className="text-2xl font-bold text-green-900">
                {Object.values(results.variants).reduce((sum, v) => sum + v.conversions, 0)}
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Best Conversion Rate</span>
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {Math.max(...Object.values(results.variants).map((v) => v.conversionRate)).toFixed(
                  1
                )}
                %
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Confidence</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900">
                {results.statisticalSignificance.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Test Status & Recommendation */}
          <div className="mb-8">
            <div
              className={`p-4 rounded-lg border-l-4 ${
                results.recommendedAction === 'stop_winner'
                  ? 'bg-green-50 border-green-400'
                  : results.recommendedAction === 'stop_inconclusive'
                    ? 'bg-yellow-50 border-yellow-400'
                    : 'bg-blue-50 border-blue-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {results.recommendedAction === 'stop_winner' && (
                  <Trophy className="h-5 w-5 text-green-600" />
                )}
                {results.recommendedAction === 'stop_inconclusive' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
                {results.recommendedAction === 'continue' && (
                  <Play className="h-5 w-5 text-blue-600" />
                )}
                <span className="font-semibold">
                  {results.recommendedAction === 'stop_winner' && 'Winner Found!'}
                  {results.recommendedAction === 'stop_inconclusive' && 'Inconclusive Results'}
                  {results.recommendedAction === 'continue' && 'Test In Progress'}
                </span>
              </div>
              <p className="text-gray-700">
                {results.recommendedAction === 'stop_winner' &&
                  'Statistical significance achieved. You can implement the winning variant.'}
                {results.recommendedAction === 'stop_inconclusive' &&
                  'Test has run for sufficient time but results are not statistically significant.'}
                {results.recommendedAction === 'continue' &&
                  'Continue testing to reach statistical significance.'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Running for {results.durationDays} days • Target: 95% confidence
              </p>
            </div>
          </div>

          {/* Variant Comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Variant Performance</h3>
            {Object.entries(results.variants).map(([variantId, variant]) => (
              <div
                key={variantId}
                className={`border rounded-lg p-4 ${variant.isWinner ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{variant.name}</h4>
                    {variant.isWinner && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        Winner
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {variant.conversionRate.toFixed(2)}%
                    </div>
                    {variant.liftOverControl !== undefined && variant.liftOverControl !== 0 && (
                      <div
                        className={`text-sm ${variant.liftOverControl > 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {variant.liftOverControl > 0 ? '+' : ''}
                        {variant.liftOverControl.toFixed(1)}% lift
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full ${variant.isWinner ? 'bg-green-600' : 'bg-blue-500'}`}
                    style={{
                      width: `${Math.min(100, (variant.conversionRate / Math.max(...Object.values(results.variants).map((v) => v.conversionRate))) * 100)}%`,
                    }}
                  ></div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Visitors</div>
                    <div className="font-medium">{variant.visitors}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Conversions</div>
                    <div className="font-medium">{variant.conversions}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Confidence</div>
                    <div className="font-medium">{variant.confidence.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conversion Funnel Analysis */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">
                This feature shows how users progress through conversion steps. Implementation
                requires funnel tracking integration.
              </div>
            </div>
          </div>
        </>
      )}

      {/* Debug Panel (Development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Debug Information</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div>Test ID: {selectedTest}</div>
            <div>User ID: {ABTestingService.getUserId()}</div>
            <div>
              Assignment: {JSON.stringify(ABTestingService.getTestAssignment(selectedTest))}
            </div>
            <div>Local Storage Events: {ABTestingService.exportData().events.length}</div>
          </div>
        </div>
      )}
    </div>
  )
}
