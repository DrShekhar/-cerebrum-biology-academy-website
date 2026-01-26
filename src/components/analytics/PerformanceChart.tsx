'use client'

import React from 'react'
import type { UserPerformanceData } from '@/lib/types/analytics'

interface PerformanceChartProps {
  data: UserPerformanceData
  period: 'week' | 'month' | 'quarter'
}

export function PerformanceChart({ data, period }: PerformanceChartProps) {
  const maxScore = Math.max(...data.progressTrend.map((point) => point.score))
  const minScore = Math.min(...data.progressTrend.map((point) => point.score))

  return (
    <div className="space-y-4">
      {/* Score Trend Line Chart */}
      <div className="h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent rounded-lg"></div>
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="40"
              y1={160 - y * 1.2}
              x2="380"
              y2={160 - y * 1.2}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map((y) => (
            <text
              key={y}
              x="30"
              y={165 - y * 1.2}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {y}%
            </text>
          ))}

          {/* Performance line */}
          {data.progressTrend.length > 1 && (
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data.progressTrend
                .map((point, index) => {
                  const x = 40 + index * (340 / (data.progressTrend.length - 1))
                  const y = 160 - point.score * 1.2
                  return `${x},${y}`
                })
                .join(' ')}
            />
          )}

          {/* Data points */}
          {data.progressTrend.map((point, index) => {
            const x = 40 + index * (340 / Math.max(1, data.progressTrend.length - 1))
            const y = 160 - point.score * 1.2
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:fill-blue-700 cursor-pointer"
              >
                <title>{`${point.score.toFixed(1)}% on ${point.date.toLocaleDateString()}`}</title>
              </circle>
            )
          })}

          {/* X-axis labels */}
          {data.progressTrend.slice(0, 5).map((point, index) => {
            const x = 40 + index * (340 / Math.max(1, Math.min(4, data.progressTrend.length - 1)))
            return (
              <text key={index} x={x} y="185" textAnchor="middle" className="text-xs fill-gray-500">
                {point.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            )
          })}
        </svg>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">{data.totalTests}</div>
          <div className="text-sm text-gray-600">Total Tests</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {Math.round(data.averageScore * 100) / 100}%
          </div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-xl font-bold text-orange-600">
            {Math.round(data.totalStudyTime / 60)}m
          </div>
          <div className="text-sm text-gray-600">Study Time</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-xl font-bold text-purple-600">{data.currentStreak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>

      {/* Study Pattern Heatmap */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Study Pattern (Last 30 Days)</h4>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-500 p-1">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - (34 - i))
            const hasActivity = data.progressTrend.some(
              (point) => point.date.toDateString() === date.toDateString()
            )
            return (
              <div
                key={i}
                className={`h-6 rounded-sm ${
                  hasActivity ? 'bg-green-600' : date > new Date() ? 'bg-gray-100' : 'bg-gray-200'
                }`}
                title={date.toLocaleDateString()}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
