'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { HeatmapDataPoint, HeatmapAnalyzer } from '../../lib/heatmap/heatmapTracking'

interface HeatmapVisualizationProps {
  dataPoints: HeatmapDataPoint[]
  width: number
  height: number
  type: 'click' | 'scroll' | 'hover'
  overlay?: boolean
  opacity?: number
}

export function HeatmapVisualization({
  dataPoints,
  width,
  height,
  type,
  overlay = false,
  opacity = 0.7,
}: HeatmapVisualizationProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const heatmapData = useMemo(() => {
    switch (type) {
      case 'click':
        return HeatmapAnalyzer.generateClickHeatmap(dataPoints)
      case 'scroll':
        return HeatmapAnalyzer.generateScrollHeatmap(dataPoints)
      case 'hover':
        return HeatmapAnalyzer.generateClickHeatmap(
          dataPoints.filter((p) => p.eventType === 'hover')
        )
      default:
        return []
    }
  }, [dataPoints, type])

  useEffect(() => {
    if (!canvas || heatmapData.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Create gradient for heatmap
    const createRadialGradient = (x: number, y: number, intensity: number) => {
      const radius = Math.max(20, intensity * 50)
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgba(255, 0, 0, ${intensity * opacity})`)
      gradient.addColorStop(0.5, `rgba(255, 255, 0, ${intensity * opacity * 0.5})`)
      gradient.addColorStop(1, 'rgba(255, 255, 0, 0)')
      return gradient
    }

    // Draw heatmap points
    if (type === 'scroll') {
      // For scroll heatmap, draw horizontal bars
      heatmapData.forEach((point: any) => {
        const gradient = ctx.createLinearGradient(0, point.y, width, point.y)
        gradient.addColorStop(0, 'rgba(255, 255, 0, 0)')
        gradient.addColorStop(0.5, `rgba(255, 0, 0, ${point.intensity * opacity})`)
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, point.y, width, 20)
      })
    } else {
      // For click/hover heatmaps, draw circular gradients
      heatmapData.forEach((point: any) => {
        ctx.fillStyle = createRadialGradient(point.x, point.y, point.intensity)
        ctx.beginPath()
        ctx.arc(point.x, point.y, Math.max(20, point.intensity * 50), 0, 2 * Math.PI)
        ctx.fill()
      })
    }
  }, [canvas, heatmapData, width, height, type, opacity])

  return (
    <canvas
      ref={setCanvas}
      width={width}
      height={height}
      className={`${overlay ? 'absolute inset-0 pointer-events-none' : ''}`}
      style={{
        zIndex: overlay ? 10 : 1,
        mixBlendMode: overlay ? 'multiply' : 'normal',
      }}
    />
  )
}

interface InteractiveHeatmapProps {
  dataPoints: HeatmapDataPoint[]
  children: React.ReactNode
}

export function InteractiveHeatmap({ dataPoints, children }: InteractiveHeatmapProps) {
  const [heatmapType, setHeatmapType] = useState<'click' | 'scroll' | 'hover'>('click')
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div className="relative">
      {/* Heatmap Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border">
        <h4 className="font-semibold mb-3">Heatmap Visualization</h4>

        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="show-heatmap"
            checked={showHeatmap}
            onChange={(e) => setShowHeatmap(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="show-heatmap" className="text-sm">
            Show Heatmap
          </label>
        </div>

        {showHeatmap && (
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Heatmap Type</label>
              <select
                value={heatmapType}
                onChange={(e) => setHeatmapType(e.target.value as any)}
                className="w-full text-sm border rounded px-2 py-1"
              >
                <option value="click">Click Heatmap</option>
                <option value="hover">Hover Heatmap</option>
                <option value="scroll">Scroll Heatmap</option>
              </select>
            </div>

            <div className="text-xs text-gray-500">Data Points: {dataPoints.length}</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        {children}

        {/* Heatmap Overlay */}
        {showHeatmap && dimensions.width > 0 && (
          <HeatmapVisualization
            dataPoints={dataPoints}
            width={dimensions.width}
            height={dimensions.height}
            type={heatmapType}
            overlay={true}
            opacity={0.6}
          />
        )}
      </div>
    </div>
  )
}

interface HeatmapStatsProps {
  dataPoints: HeatmapDataPoint[]
}

export function HeatmapStats({ dataPoints }: HeatmapStatsProps) {
  const stats = useMemo(() => {
    const totalInteractions = dataPoints.length
    const uniqueUsers = new Set(dataPoints.map((p) => p.userId)).size
    const uniqueSessions = new Set(dataPoints.map((p) => p.sessionId)).size

    const eventCounts = dataPoints.reduce(
      (acc, point) => {
        acc[point.eventType] = (acc[point.eventType] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const topElements = Object.entries(
      dataPoints.reduce(
        (acc, point) => {
          const key = point.elementId || point.elementClass || point.elementTag || 'unknown'
          acc[key] = (acc[key] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      )
    )
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)

    const hourlyData = dataPoints.reduce(
      (acc, point) => {
        const hour = new Date(point.timestamp).getHours()
        acc[hour] = (acc[hour] || 0) + 1
        return acc
      },
      {} as Record<number, number>
    )

    return {
      totalInteractions,
      uniqueUsers,
      uniqueSessions,
      eventCounts,
      topElements,
      hourlyData,
    }
  }, [dataPoints])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Overview Stats */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Interactions</span>
            <span className="font-semibold">{stats.totalInteractions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Unique Users</span>
            <span className="font-semibold">{stats.uniqueUsers.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sessions</span>
            <span className="font-semibold">{stats.uniqueSessions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg per User</span>
            <span className="font-semibold">
              {stats.uniqueUsers > 0 ? (stats.totalInteractions / stats.uniqueUsers).toFixed(1) : 0}
            </span>
          </div>
        </div>
      </div>

      {/* Event Type Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Event Types</h3>
        <div className="space-y-3">
          {Object.entries(stats.eventCounts).map(([eventType, count]) => (
            <div key={eventType} className="flex justify-between items-center">
              <span className="text-gray-600 capitalize">{eventType.replace('_', ' ')}</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(count / stats.totalInteractions) * 100}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-sm">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Elements */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Most Interacted Elements</h3>
        <div className="space-y-2">
          {stats.topElements.map(([element, count], index) => (
            <div key={element} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 truncate flex-1 mr-2">
                {index + 1}. {element}
              </span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Activity */}
      <div className="bg-white p-6 rounded-lg shadow md:col-span-2 lg:col-span-3">
        <h3 className="text-lg font-semibold mb-4">Activity by Hour</h3>
        <div className="flex items-end space-x-1 h-32">
          {Array.from({ length: 24 }, (_, hour) => {
            const count = stats.hourlyData[hour] || 0
            const maxCount = Math.max(...Object.values(stats.hourlyData))
            const height = maxCount > 0 ? (count / maxCount) * 100 : 0

            return (
              <div key={hour} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${height}%` }}
                  title={`${hour}:00 - ${count} interactions`}
                ></div>
                <span className="text-xs text-gray-500 mt-1">{hour}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Element-specific heatmap overlay
export function ElementHeatmapOverlay({
  element,
  dataPoints,
  className = '',
}: {
  element: string
  dataPoints: HeatmapDataPoint[]
  className?: string
}) {
  const stats = useMemo(() => {
    return HeatmapAnalyzer.getElementInteractionStats(dataPoints, element)
  }, [dataPoints, element])

  const intensity = useMemo(() => {
    const maxInteractions = 100 // Threshold for maximum intensity
    return Math.min(stats.totalInteractions / maxInteractions, 1)
  }, [stats.totalInteractions])

  if (stats.totalInteractions === 0) return null

  const getIntensityColor = (intensity: number) => {
    if (intensity > 0.8) return 'bg-red-500'
    if (intensity > 0.6) return 'bg-orange-500'
    if (intensity > 0.4) return 'bg-yellow-500'
    if (intensity > 0.2) return 'bg-green-500'
    return 'bg-blue-500'
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        className={`absolute top-0 right-0 ${getIntensityColor(intensity)} text-white text-xs px-2 py-1 rounded-bl-lg`}
        style={{ opacity: 0.8 }}
      >
        {stats.totalInteractions}
      </div>
      <div
        className={`absolute inset-0 ${getIntensityColor(intensity)} rounded`}
        style={{ opacity: intensity * 0.2 }}
      ></div>
    </div>
  )
}
