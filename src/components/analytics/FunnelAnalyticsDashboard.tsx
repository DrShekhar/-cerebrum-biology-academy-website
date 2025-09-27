'use client'

import React, { useState, useEffect } from 'react'
import {
  FunnelEvent,
  FunnelAnalysis,
  FunnelAnalyzer,
} from '../../lib/analytics/conversionFunnelAnalysis'

export function FunnelAnalyticsDashboard({ events }: { events: FunnelEvent[] }) {
  const [analysis, setAnalysis] = useState<FunnelAnalysis | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateAnalysis = async () => {
      setLoading(true)
      const result = FunnelAnalyzer.calculateMetrics(events)
      setAnalysis(result)
      setLoading(false)
    }

    calculateAnalysis()
  }, [events])

  if (loading) return <div className="animate-pulse">Calculating funnel metrics...</div>
  if (!analysis) return <div>No data available</div>

  return (
    <div className="funnel-analytics-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Overall Conversion</h3>
          <p className="text-2xl font-bold text-green-600">
            {analysis.overallConversionRate.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{analysis.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completed Journey</h3>
          <p className="text-2xl font-bold text-blue-600">{analysis.completedJourney}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Avg Journey Time</h3>
          <p className="text-2xl font-bold">{analysis.averageJourneyTime.toFixed(1)}m</p>
        </div>
      </div>

      {analysis.bottlenecks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold text-red-800 mb-4">Critical Bottlenecks</h3>
          {analysis.bottlenecks.map((bottleneck) => (
            <div key={bottleneck.stepId} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{bottleneck.stepName}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    bottleneck.severity === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : bottleneck.severity === 'high'
                        ? 'bg-orange-100 text-orange-800'
                        : bottleneck.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {bottleneck.dropOffRate.toFixed(1)}% drop-off
                </span>
              </div>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {bottleneck.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold">Step-by-Step Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Step
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entries
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drop-off Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analysis.stepMetrics.map((metric) => (
                <tr key={metric.stepId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {metric.stepName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.totalEntries}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.totalCompletions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        metric.conversionRate >= 80
                          ? 'bg-green-100 text-green-800'
                          : metric.conversionRate >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {metric.conversionRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.averageTimeSpent.toFixed(0)}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.dropOffRate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
