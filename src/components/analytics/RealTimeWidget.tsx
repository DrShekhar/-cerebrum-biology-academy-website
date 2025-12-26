'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Activity, Users, BookOpen, TrendingUp, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { LiveAnalytics } from '@/lib/types/analytics'

interface RealTimeWidgetProps {
  className?: string
}

export function RealTimeWidget({ className }: RealTimeWidgetProps) {
  const [data, setData] = useState<LiveAnalytics | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    // Initialize Server-Sent Events connection
    const connectSSE = () => {
      try {
        const eventSource = new EventSource('/api/analytics/events')
        eventSourceRef.current = eventSource

        eventSource.onopen = () => {
          setIsConnected(true)
          console.log('Real-time analytics connected')
        }

        eventSource.onmessage = (event) => {
          try {
            const eventData = JSON.parse(event.data)
            setData(eventData)
            setLastUpdate(new Date())
          } catch (error) {
            console.error('Error parsing SSE data:', error)
          }
        }

        eventSource.onerror = (error) => {
          console.error('SSE connection error:', error)
          setIsConnected(false)

          // Attempt to reconnect after 5 seconds
          setTimeout(() => {
            if (eventSourceRef.current?.readyState === EventSource.CLOSED) {
              connectSSE()
            }
          }, 5000)
        }

        eventSource.addEventListener('close', () => {
          setIsConnected(false)
          console.log('Real-time analytics disconnected')
        })
      } catch (error) {
        console.error('Error setting up SSE:', error)
        setIsConnected(false)
      }
    }

    connectSSE()

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
    }
  }, [])

  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Real-time Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-pulse text-gray-500">Connecting to real-time data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Real-time Analytics
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-600 animate-pulse' : 'bg-red-500'
            }`}
          />
        </CardTitle>
        {lastUpdate && (
          <p className="text-sm text-gray-500">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-600">Active Users</span>
              </div>
              <div className="text-xl font-bold text-blue-900">{data.activeUsers}</div>
            </div>

            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Tests Today</span>
              </div>
              <div className="text-xl font-bold text-green-900">{data.completedTestsToday}</div>
            </div>
          </div>

          {/* Average Score */}
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-600">Average Score Today</span>
            </div>
            <div className="text-xl font-bold text-purple-900">
              {data.averageScoreToday.toFixed(1)}%
            </div>
          </div>

          {/* Active Sessions */}
          {data.activeSessions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Live Test Sessions ({data.activeSessions.length})
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {data.activeSessions.slice(0, 5).map((session, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                  >
                    <span className="text-gray-600">
                      Question {session.currentQuestion}/{session.totalQuestions}
                    </span>
                    <span
                      className={`font-medium ${
                        session.status === 'active'
                          ? 'text-green-600'
                          : session.status === 'paused'
                            ? 'text-yellow-600'
                            : 'text-gray-600'
                      }`}
                    >
                      {session.accuracy.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Topics */}
          {data.popularTopics.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Popular Topics</h4>
              <div className="space-y-2">
                {data.popularTopics.slice(0, 3).map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{topic.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{topic.testsAttempted}</span>
                      <span className="text-xs text-gray-500">
                        {topic.averageScore.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Summary */}
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{data.performance.totalTests}</div>
                <div className="text-xs text-gray-600">Total Tests</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{data.performance.totalUsers}</div>
                <div className="text-xs text-gray-600">Total Users</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RealTimeStats() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    completedToday: 0,
    averageScore: 0,
    topPerformers: [],
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics/real-time')
        const data = await response.json()

        if (data.success) {
          setStats({
            activeUsers: data.data.activeUsers,
            completedToday: data.data.completedTestsToday,
            averageScore: data.data.averageScoreToday,
            topPerformers: data.data.dashboard?.topPerformers || [],
          })
        }
      } catch (error) {
        console.error('Error fetching real-time stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
        <span className="text-gray-600">{stats.activeUsers} online</span>
      </div>
      <div className="text-gray-600">{stats.completedToday} tests today</div>
      <div className="text-gray-600">{stats.averageScore.toFixed(1)}% avg score</div>
    </div>
  )
}
