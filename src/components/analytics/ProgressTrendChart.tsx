'use client'

import React from 'react'
import type { ProgressTrend } from '@/lib/types/analytics'

interface ProgressTrendChartProps {
  data: ProgressTrend[]
}

export function ProgressTrendChart({ data }: ProgressTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        No data available for the selected period
      </div>
    )
  }

  const maxScore = Math.max(...data.map(point => point.score))
  const minScore = Math.min(...data.map(point => point.score))
  const scoreRange = maxScore - minScore

  return (
    <div className="space-y-4">
      {/* Main Chart */}
      <div className="h-48 relative">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="40"
              y1={140 - (y * 1.0)}
              x2="360"
              y2={140 - (y * 1.0)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis */}
          <line x1="40" y1="40" x2="40" y2="140" stroke="#e5e7eb" strokeWidth="2" />

          {/* X-axis */}
          <line x1="40" y1="140" x2="360" y2="140" stroke="#e5e7eb" strokeWidth="2" />

          {/* Y-axis labels */}
          {[0, 25, 50, 75, 100].map(y => (
            <text
              key={y}
              x="35"
              y={145 - (y * 1.0)}
              textAnchor="end"
              className="text-xs fill-gray-500"
            >
              {y}%
            </text>
          ))}

          {/* Score trend line */}
          {data.length > 1 && (
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data.map((point, index) => {
                const x = 40 + (index * (320 / (data.length - 1)))
                const y = 140 - (point.score * 1.0)
                return `${x},${y}`
              }).join(' ')}
            />
          )}

          {/* Accuracy trend line */}
          {data.length > 1 && (
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5,5"
              points={data.map((point, index) => {
                const x = 40 + (index * (320 / (data.length - 1)))
                const y = 140 - (point.accuracy * 1.0)
                return `${x},${y}`
              }).join(' ')}
            />
          )}

          {/* Data points for scores */}
          {data.map((point, index) => {
            const x = 40 + (index * (320 / Math.max(1, data.length - 1)))
            const y = 140 - (point.score * 1.0)
            return (
              <circle
                key={`score-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:fill-blue-700 cursor-pointer"
              >
                <title>
                  Score: {point.score.toFixed(1)}% on {point.date.toLocaleDateString()}
                </title>
              </circle>
            )
          })}

          {/* Data points for accuracy */}
          {data.map((point, index) => {
            const x = 40 + (index * (320 / Math.max(1, data.length - 1)))
            const y = 140 - (point.accuracy * 1.0)
            return (
              <circle
                key={`accuracy-${index}`}
                cx={x}
                cy={y}
                r="3"
                fill="#10b981"
                className="hover:fill-green-700 cursor-pointer"
              >
                <title>
                  Accuracy: {point.accuracy.toFixed(1)}% on {point.date.toLocaleDateString()}
                </title>
              </circle>
            )
          })}

          {/* X-axis labels */}
          {data.filter((_, index) => index % Math.ceil(data.length / 5) === 0).map((point, index) => {
            const originalIndex = index * Math.ceil(data.length / 5)
            const x = 40 + (originalIndex * (320 / Math.max(1, data.length - 1)))
            return (
              <text
                key={index}
                x={x}
                y="155"
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {point.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="absolute top-2 right-2 bg-white p-2 rounded shadow-sm border">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Score</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-green-500" style={{ borderTop: '2px dashed' }}></div>
              <span>Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">
            {data.length > 0 ? data[data.length - 1].score.toFixed(1) : 0}%
          </div>
          <div className="text-xs text-gray-600">Latest Score</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">
            {data.length > 0 ? (data.reduce((sum, point) => sum + point.score, 0) / data.length).toFixed(1) : 0}%
          </div>
          <div className="text-xs text-gray-600">Average Score</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-lg font-bold text-purple-600">
            {data.reduce((sum, point) => sum + point.testsCompleted, 0)}
          </div>
          <div className="text-xs text-gray-600">Total Tests</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-lg font-bold text-orange-600">
            {Math.round(data.reduce((sum, point) => sum + point.studyTime, 0) / 60)}m
          </div>
          <div className="text-xs text-gray-600">Study Time</div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="mt-4">
        <h4 className="font-medium text-gray-900 mb-3">Trend Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Performance Trend */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">Performance Trend</h5>
            {data.length >= 2 && (
              <div className="text-sm">
                {(() => {
                  const firstHalf = data.slice(0, Math.floor(data.length / 2))
                  const secondHalf = data.slice(Math.floor(data.length / 2))
                  const firstAvg = firstHalf.reduce((sum, point) => sum + point.score, 0) / firstHalf.length
                  const secondAvg = secondHalf.reduce((sum, point) => sum + point.score, 0) / secondHalf.length
                  const trend = secondAvg - firstAvg

                  return (
                    <div className={`flex items-center gap-2 ${
                      trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      <span>
                        {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'}
                      </span>
                      <span>
                        {trend > 0 ? 'Improving' : trend < 0 ? 'Declining' : 'Stable'}
                      </span>
                      <span className="font-medium">
                        ({trend >= 0 ? '+' : ''}{trend.toFixed(1)}%)
                      </span>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>

          {/* Consistency Score */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">Consistency</h5>
            {data.length >= 2 && (
              <div className="text-sm">
                {(() => {
                  const scores = data.map(point => point.score)
                  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
                  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
                  const standardDeviation = Math.sqrt(variance)
                  const consistency = Math.max(0, 100 - standardDeviation)

                  return (
                    <div className={`flex items-center gap-2 ${
                      consistency >= 80 ? 'text-green-600' :
                      consistency >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      <span>
                        {consistency >= 80 ? '⭐' : consistency >= 60 ? '📊' : '📈'}
                      </span>
                      <span>
                        {consistency >= 80 ? 'Very Consistent' :
                         consistency >= 60 ? 'Moderately Consistent' : 'Variable'}
                      </span>
                      <span className="font-medium">
                        ({consistency.toFixed(0)}%)
                      </span>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}