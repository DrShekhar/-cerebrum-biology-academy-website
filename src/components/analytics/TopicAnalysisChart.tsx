'use client'

import React from 'react'
import type { TopicAnalytics } from '@/lib/types/analytics'

interface TopicAnalysisChartProps {
  data: TopicAnalytics[]
}

export function TopicAnalysisChart({ data }: TopicAnalysisChartProps) {
  const maxAccuracy = Math.max(...data.map((topic) => topic.accuracy))

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <div className="space-y-4">
        {data.map((topic, index) => (
          <div key={topic.topic} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 text-sm">{topic.topic}</span>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>{topic.totalQuestions} questions</span>
                <span className="font-semibold text-gray-900">
                  {Math.round(topic.accuracy * 100) / 100}%
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-out ${
                    topic.accuracy >= 80
                      ? 'bg-green-600'
                      : topic.accuracy >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>

              {/* Difficulty breakdown */}
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>
                  Easy:{' '}
                  {topic.difficulty.easy.total > 0
                    ? Math.round(
                        (topic.difficulty.easy.correct / topic.difficulty.easy.total) * 100
                      )
                    : 0}
                  %
                </span>
                <span>
                  Medium:{' '}
                  {topic.difficulty.medium.total > 0
                    ? Math.round(
                        (topic.difficulty.medium.correct / topic.difficulty.medium.total) * 100
                      )
                    : 0}
                  %
                </span>
                <span>
                  Hard:{' '}
                  {topic.difficulty.hard.total > 0
                    ? Math.round(
                        (topic.difficulty.hard.correct / topic.difficulty.hard.total) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Radar Chart (Simplified) */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-900 mb-4">Topic Mastery Overview</h4>
        <div className="relative h-64 flex items-center justify-center">
          <svg className="w-full h-full max-w-xs" viewBox="0 0 200 200">
            {/* Grid circles */}
            {[20, 40, 60, 80, 100].map((radius) => (
              <circle
                key={radius}
                cx="100"
                cy="100"
                r={radius * 0.8}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            {data.slice(0, 6).map((_, index) => {
              const angle = index * 60 - 90 // Start from top
              const x2 = 100 + 80 * Math.cos((angle * Math.PI) / 180)
              const y2 = 100 + 80 * Math.sin((angle * Math.PI) / 180)
              return (
                <line
                  key={index}
                  x1="100"
                  y1="100"
                  x2={x2}
                  y2={y2}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              )
            })}

            {/* Data polygon */}
            {data.length > 0 && (
              <polygon
                fill="rgba(59, 130, 246, 0.1)"
                stroke="#3b82f6"
                strokeWidth="2"
                points={data
                  .slice(0, 6)
                  .map((topic, index) => {
                    const angle = index * 60 - 90
                    const radius = (topic.accuracy / 100) * 80
                    const x = 100 + radius * Math.cos((angle * Math.PI) / 180)
                    const y = 100 + radius * Math.sin((angle * Math.PI) / 180)
                    return `${x},${y}`
                  })
                  .join(' ')}
              />
            )}

            {/* Data points */}
            {data.slice(0, 6).map((topic, index) => {
              const angle = index * 60 - 90
              const radius = (topic.accuracy / 100) * 80
              const x = 100 + radius * Math.cos((angle * Math.PI) / 180)
              const y = 100 + radius * Math.sin((angle * Math.PI) / 180)
              return (
                <circle key={index} cx={x} cy={y} r="3" fill="#3b82f6">
                  <title>{`${topic.topic}: ${topic.accuracy.toFixed(1)}%`}</title>
                </circle>
              )
            })}

            {/* Labels */}
            {data.slice(0, 6).map((topic, index) => {
              const angle = index * 60 - 90
              const x = 100 + 95 * Math.cos((angle * Math.PI) / 180)
              const y = 100 + 95 * Math.sin((angle * Math.PI) / 180)
              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-gray-600"
                >
                  {topic.topic.length > 10 ? topic.topic.substring(0, 10) + '...' : topic.topic}
                </text>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-medium text-green-800 mb-2">Strong Topics</h5>
          <div className="space-y-1">
            {data
              .filter((topic) => topic.accuracy >= 80)
              .slice(0, 3)
              .map((topic) => (
                <div key={topic.topic} className="text-sm text-green-700">
                  {topic.topic} ({Math.round(topic.accuracy)}%)
                </div>
              ))}
          </div>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h5 className="font-medium text-yellow-800 mb-2">Improving Topics</h5>
          <div className="space-y-1">
            {data
              .filter((topic) => topic.accuracy >= 60 && topic.accuracy < 80)
              .slice(0, 3)
              .map((topic) => (
                <div key={topic.topic} className="text-sm text-yellow-700">
                  {topic.topic} ({Math.round(topic.accuracy)}%)
                </div>
              ))}
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h5 className="font-medium text-red-800 mb-2">Focus Areas</h5>
          <div className="space-y-1">
            {data
              .filter((topic) => topic.accuracy < 60)
              .slice(0, 3)
              .map((topic) => (
                <div key={topic.topic} className="text-sm text-red-700">
                  {topic.topic} ({Math.round(topic.accuracy)}%)
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Time Analysis */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Time Efficiency Analysis</h4>
        <div className="space-y-3">
          {data.map((topic) => (
            <div
              key={topic.topic}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-900">{topic.topic}</span>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Avg Time: {Math.round(topic.averageTime)}s</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    topic.averageTime <= 60
                      ? 'bg-green-100 text-green-800'
                      : topic.averageTime <= 120
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {topic.averageTime <= 60
                    ? 'Fast'
                    : topic.averageTime <= 120
                      ? 'Moderate'
                      : 'Slow'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
