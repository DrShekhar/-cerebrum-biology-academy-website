'use client'

import React, { useMemo } from 'react'
import {
  FunnelMetrics,
  COURSE_SELECTION_FUNNEL,
} from '../../lib/analytics/conversionFunnelAnalysis'

interface ConversionFunnelChartProps {
  metrics: FunnelMetrics[]
  height?: number
  showLabels?: boolean
  showPercentages?: boolean
  colorScheme?: 'blue' | 'green' | 'purple' | 'gradient'
}

export function ConversionFunnelChart({
  metrics,
  height = 600,
  showLabels = true,
  showPercentages = true,
  colorScheme = 'gradient',
}: ConversionFunnelChartProps) {
  const processedData = useMemo(() => {
    // Filter and order metrics according to funnel steps
    const orderedMetrics = COURSE_SELECTION_FUNNEL.map((step) =>
      metrics.find((m) => m.stepId === step.id)
    ).filter(Boolean) as FunnelMetrics[]

    // Calculate funnel visualization data
    const maxEntries = Math.max(...orderedMetrics.map((m) => m.totalEntries))

    return orderedMetrics.map((metric, index) => {
      const widthPercentage = (metric.totalEntries / maxEntries) * 100
      const conversionFromPrevious =
        index > 0 ? (metric.totalEntries / orderedMetrics[index - 1].totalEntries) * 100 : 100

      return {
        ...metric,
        widthPercentage,
        conversionFromPrevious,
        position: index,
        category:
          COURSE_SELECTION_FUNNEL.find((s) => s.id === metric.stepId)?.category || 'unknown',
      }
    })
  }, [metrics])

  const getStepColor = (category: string, index: number): string => {
    const colors = {
      blue: ['bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900'],
      green: ['bg-green-600', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900'],
      purple: ['bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900'],
      gradient: [
        'bg-gradient-to-r from-blue-500 to-blue-600',
        'bg-green-600',
        'bg-gradient-to-r from-yellow-500 to-yellow-600',
        'bg-gradient-to-r from-orange-500 to-orange-600',
        'bg-red-600',
        'bg-gradient-to-r from-purple-500 to-purple-600',
      ],
    }

    if (colorScheme === 'gradient') {
      const categoryIndex = [
        'awareness',
        'interest',
        'consideration',
        'intent',
        'evaluation',
        'purchase',
      ].indexOf(category)
      return colors.gradient[categoryIndex] || colors.gradient[0]
    }

    return colors[colorScheme][index % colors[colorScheme].length]
  }

  const getTrapezoidPath = (
    width: number,
    nextWidth: number,
    stepHeight: number,
    y: number
  ): string => {
    const leftOffset = (100 - width) / 2
    const nextLeftOffset = (100 - nextWidth) / 2

    return `
      M ${leftOffset} ${y}
      L ${leftOffset + width} ${y}
      L ${nextLeftOffset + nextWidth} ${y + stepHeight}
      L ${nextLeftOffset} ${y + stepHeight}
      Z
    `
  }

  const stepHeight = height / processedData.length

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Conversion Funnel Analysis</h3>
        <p className="text-gray-600">NEET Course Selection Journey - User Flow & Drop-off Points</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Category Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          {['awareness', 'interest', 'consideration', 'intent', 'evaluation', 'purchase'].map(
            (category, index) => (
              <div key={category} className="flex items-center">
                <div className={`w-4 h-4 rounded mr-2 ${getStepColor(category, index)}`}></div>
                <span className="capitalize text-gray-700">{category}</span>
              </div>
            )
          )}
        </div>

        {/* Funnel Visualization */}
        <div className="relative" style={{ height: `${height}px` }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            {processedData.map((step, index) => {
              const nextStep = processedData[index + 1]
              const y = index * stepHeight

              if (!nextStep) {
                // Last step - render as rectangle
                const leftOffset = (100 - step.widthPercentage) / 2
                return (
                  <rect
                    key={step.stepId}
                    x={`${leftOffset}%`}
                    y={y}
                    width={`${step.widthPercentage}%`}
                    height={stepHeight - 2}
                    className={`${getStepColor(step.category, index)} opacity-80 hover:opacity-100 transition-opacity`}
                    rx="4"
                  />
                )
              }

              // Render trapezoid connecting to next step
              return (
                <path
                  key={step.stepId}
                  d={getTrapezoidPath(
                    step.widthPercentage,
                    nextStep.widthPercentage,
                    stepHeight - 2,
                    y
                  )}
                  className={`${getStepColor(step.category, index)} opacity-80 hover:opacity-100 transition-opacity`}
                  fill="currentColor"
                />
              )
            })}
          </svg>

          {/* Step Labels and Metrics */}
          {processedData.map((step, index) => {
            const y = index * stepHeight + stepHeight / 2
            const isLargeStep = step.widthPercentage > 60

            return (
              <div
                key={`label-${step.stepId}`}
                className="absolute flex items-center justify-between w-full px-4"
                style={{ top: `${y - 20}px`, height: '40px' }}
              >
                {/* Left side - Step name and metrics */}
                <div className={`flex flex-col ${isLargeStep ? 'text-white' : 'text-gray-900'}`}>
                  {showLabels && (
                    <div className="font-semibold text-sm truncate max-w-xs">{step.stepName}</div>
                  )}
                  <div className="text-xs opacity-90">
                    {step.totalEntries.toLocaleString()} users
                    {index > 0 && showPercentages && (
                      <span className="ml-2">
                        ({step.conversionFromPrevious.toFixed(1)}% from previous)
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side - Conversion rate */}
                {showPercentages && (
                  <div className={`text-right ${isLargeStep ? 'text-white' : 'text-gray-900'}`}>
                    <div className="font-bold text-lg">{step.conversionRate.toFixed(1)}%</div>
                    <div className="text-xs opacity-90">conversion</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {processedData[0]?.totalEntries.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600">Total Visitors</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {processedData[processedData.length - 1]?.totalEntries.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600">Completed Journey</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {processedData.length > 0
                ? (
                    (processedData[processedData.length - 1]?.totalEntries /
                      processedData[0]?.totalEntries) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </div>
            <div className="text-sm text-gray-600">Overall Conversion</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {processedData.length > 0
                ? Math.max(...processedData.map((s) => s.dropOffRate)).toFixed(1)
                : 0}
              %
            </div>
            <div className="text-sm text-gray-600">Highest Drop-off</div>
          </div>
        </div>

        {/* Detailed Step Breakdown */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Step Performance Details</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Step
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Drop-off
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processedData.map((step) => (
                  <tr key={step.stepId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{step.stepName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          step.category === 'awareness'
                            ? 'bg-blue-100 text-blue-800'
                            : step.category === 'interest'
                              ? 'bg-green-100 text-green-800'
                              : step.category === 'consideration'
                                ? 'bg-yellow-100 text-yellow-800'
                                : step.category === 'intent'
                                  ? 'bg-orange-100 text-orange-800'
                                  : step.category === 'evaluation'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {step.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {step.totalEntries.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              step.conversionRate >= 80
                                ? 'bg-green-600'
                                : step.conversionRate >= 60
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${step.conversionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900 min-w-0">
                          {step.conversionRate.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {step.averageTimeSpent.toFixed(0)}s
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {step.dropOffRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Companion component for real-time funnel monitoring
export function LiveFunnelMonitor({ userId }: { userId: string }) {
  const [currentStepData, setCurrentStepData] = React.useState<{
    stepId: string
    stepName: string
    timeSpent: number
    category: string
  } | null>(null)

  React.useEffect(() => {
    // Subscribe to real-time funnel events
    const eventSource = new EventSource(`/api/analytics/funnel/live?userId=${userId}`)

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'step_enter') {
        setCurrentStepData({
          stepId: data.stepId,
          stepName: data.stepName,
          timeSpent: 0,
          category: data.category,
        })
      }
    }

    return () => eventSource.close()
  }, [userId])

  React.useEffect(() => {
    if (!currentStepData) return

    const interval = setInterval(() => {
      setCurrentStepData((prev) =>
        prev
          ? {
              ...prev,
              timeSpent: prev.timeSpent + 1,
            }
          : null
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [currentStepData?.stepId])

  if (!currentStepData) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm">Live Funnel Tracking</h4>
        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
      </div>
      <div className="text-xs text-gray-600 mb-1">
        Current Step: <span className="font-medium">{currentStepData.stepName}</span>
      </div>
      <div className="text-xs text-gray-600 mb-1">
        Category: <span className="capitalize font-medium">{currentStepData.category}</span>
      </div>
      <div className="text-xs text-gray-600">
        Time Spent:{' '}
        <span className="font-medium">
          {Math.floor(currentStepData.timeSpent / 60)}m {currentStepData.timeSpent % 60}s
        </span>
      </div>
    </div>
  )
}
