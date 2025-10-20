'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  Brain,
  Zap,
  BarChart3,
  PieChart,
  Signal,
  RefreshCw,
  Eye,
  Download,
  Share,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  AlertTriangle,
  Info,
  X
} from 'lucide-react'

interface MetricData {
  id: string
  label: string
  value: number
  previousValue: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  changePercent: number
  icon: React.ReactNode
  color: string
  format?: 'number' | 'percentage' | 'time' | 'score'
}

interface SystemMetric {
  id: string
  name: string
  value: number
  status: 'healthy' | 'warning' | 'critical'
  threshold: number
  unit: string
}

interface ActivityEvent {
  id: string
  type: 'login' | 'doubt_resolved' | 'test_completed' | 'achievement' | 'error'
  user: string
  description: string
  timestamp: Date
  metadata?: any
}

interface AlertData {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: Date
  dismissed: boolean
}

export function RealTimeMetrics() {
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [updateInterval, setUpdateInterval] = useState(5000) // 5 seconds
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<'dashboard' | 'detailed'>('dashboard')
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('6h')

  // Performance Metrics
  const [performanceMetrics, setPerformanceMetrics] = useState<MetricData[]>([
    {
      id: 'active_users',
      label: 'Active Users',
      value: 247,
      previousValue: 231,
      unit: 'users',
      trend: 'up',
      changePercent: 6.9,
      icon: <Users className="w-4 h-4" />,
      color: 'blue',
      format: 'number'
    },
    {
      id: 'doubts_resolved',
      label: 'Doubts Resolved/Hour',
      value: 42,
      previousValue: 38,
      unit: 'doubts',
      trend: 'up',
      changePercent: 10.5,
      icon: <Brain className="w-4 h-4" />,
      color: 'purple',
      format: 'number'
    },
    {
      id: 'avg_response_time',
      label: 'Avg Response Time',
      value: 2.3,
      previousValue: 2.8,
      unit: 'seconds',
      trend: 'down',
      changePercent: -17.9,
      icon: <Zap className="w-4 h-4" />,
      color: 'green',
      format: 'time'
    },
    {
      id: 'test_completion_rate',
      label: 'Test Completion Rate',
      value: 87.5,
      previousValue: 84.2,
      unit: '%',
      trend: 'up',
      changePercent: 3.9,
      icon: <Target className="w-4 h-4" />,
      color: 'orange',
      format: 'percentage'
    },
    {
      id: 'avg_accuracy',
      label: 'Average Accuracy',
      value: 79.2,
      previousValue: 77.8,
      unit: '%',
      trend: 'up',
      changePercent: 1.8,
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'indigo',
      format: 'percentage'
    },
    {
      id: 'study_time',
      label: 'Study Time/Student',
      value: 4.7,
      previousValue: 4.3,
      unit: 'hours',
      trend: 'up',
      changePercent: 9.3,
      icon: <Clock className="w-4 h-4" />,
      color: 'teal',
      format: 'time'
    }
  ])

  // System Health Metrics
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { id: 'cpu_usage', name: 'CPU Usage', value: 45, status: 'healthy', threshold: 80, unit: '%' },
    { id: 'memory_usage', name: 'Memory Usage', value: 62, status: 'healthy', threshold: 85, unit: '%' },
    { id: 'response_time', name: 'API Response Time', value: 120, status: 'healthy', threshold: 500, unit: 'ms' },
    { id: 'error_rate', name: 'Error Rate', value: 0.8, status: 'healthy', threshold: 5, unit: '%' },
    { id: 'database_conn', name: 'DB Connections', value: 23, status: 'healthy', threshold: 100, unit: 'conns' },
    { id: 'cache_hit_rate', name: 'Cache Hit Rate', value: 94.5, status: 'healthy', threshold: 90, unit: '%' }
  ])

  // Real-time Activity Feed
  const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>([
    {
      id: '1',
      type: 'doubt_resolved',
      user: 'Priya S.',
      description: 'Cell division query resolved in 2.1s',
      timestamp: new Date(Date.now() - 1000 * 30),
      metadata: { topic: 'Cell Biology', difficulty: 'Medium' }
    },
    {
      id: '2',
      type: 'test_completed',
      user: 'Arjun K.',
      description: 'Genetics mock test - Score: 85%',
      timestamp: new Date(Date.now() - 1000 * 45),
      metadata: { score: 85, questions: 40, time: '35 mins' }
    },
    {
      id: '3',
      type: 'login',
      user: 'Sneha R.',
      description: 'Started study session',
      timestamp: new Date(Date.now() - 1000 * 62),
      metadata: { location: 'Mumbai' }
    },
    {
      id: '4',
      type: 'achievement',
      user: 'Vikram M.',
      description: 'Unlocked "Genetics Master" badge',
      timestamp: new Date(Date.now() - 1000 * 78),
      metadata: { badge: 'Genetics Master', streak: 7 }
    },
    {
      id: '5',
      type: 'error',
      user: 'System',
      description: 'Image analysis timeout (resolved)',
      timestamp: new Date(Date.now() - 1000 * 95),
      metadata: { error_code: 'TIMEOUT_001', resolved: true }
    }
  ])

  // Live Alerts
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: '1',
      type: 'success',
      title: 'Performance Improved',
      message: 'Average response time decreased by 18% in the last hour',
      timestamp: new Date(Date.now() - 1000 * 300),
      dismissed: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Peak Usage Detected',
      message: '247 concurrent users - highest today',
      timestamp: new Date(Date.now() - 1000 * 600),
      dismissed: false
    }
  ])

  const intervalRef = useRef<NodeJS.Timeout>()

  // Simulate real-time updates
  useEffect(() => {
    const updateMetrics = () => {
      setIsRefreshing(true)

      // Update performance metrics with realistic variations
      setPerformanceMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
        let newValue = metric.value * (1 + variation)

        // Apply realistic constraints
        switch (metric.id) {
          case 'active_users':
            newValue = Math.max(200, Math.min(500, Math.round(newValue)))
            break
          case 'doubts_resolved':
            newValue = Math.max(20, Math.min(80, Math.round(newValue)))
            break
          case 'avg_response_time':
            newValue = Math.max(1.0, Math.min(5.0, Number(newValue.toFixed(1))))
            break
          case 'test_completion_rate':
            newValue = Math.max(70, Math.min(95, Number(newValue.toFixed(1))))
            break
          case 'avg_accuracy':
            newValue = Math.max(65, Math.min(90, Number(newValue.toFixed(1))))
            break
          case 'study_time':
            newValue = Math.max(3.0, Math.min(8.0, Number(newValue.toFixed(1))))
            break
        }

        const changePercent = ((newValue - metric.previousValue) / metric.previousValue) * 100
        const trend = changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable'

        return {
          ...metric,
          previousValue: metric.value,
          value: newValue,
          changePercent: Number(changePercent.toFixed(1)),
          trend
        }
      }))

      // Update system metrics
      setSystemMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 0.2
        let newValue = metric.value * (1 + variation)

        // Apply realistic constraints
        switch (metric.id) {
          case 'cpu_usage':
          case 'memory_usage':
            newValue = Math.max(20, Math.min(90, Number(newValue.toFixed(1))))
            break
          case 'response_time':
            newValue = Math.max(80, Math.min(400, Math.round(newValue)))
            break
          case 'error_rate':
            newValue = Math.max(0.1, Math.min(3.0, Number(newValue.toFixed(1))))
            break
          case 'database_conn':
            newValue = Math.max(15, Math.min(80, Math.round(newValue)))
            break
          case 'cache_hit_rate':
            newValue = Math.max(85, Math.min(98, Number(newValue.toFixed(1))))
            break
        }

        const status = newValue > metric.threshold
          ? (metric.id === 'cache_hit_rate' ? 'healthy' : 'warning')
          : (metric.id === 'cache_hit_rate' ? 'warning' : 'healthy')

        return { ...metric, value: newValue, status }
      }))

      // Occasionally add new activity
      if (Math.random() < 0.3) {
        const newActivity: ActivityEvent = {
          id: Date.now().toString(),
          type: ['doubt_resolved', 'test_completed', 'login', 'achievement'][Math.floor(Math.random() * 4)] as any,
          user: ['Priya S.', 'Arjun K.', 'Sneha R.', 'Vikram M.', 'Ravi P.', 'Kavya N.'][Math.floor(Math.random() * 6)],
          description: 'New activity detected',
          timestamp: new Date(),
          metadata: {}
        }

        setActivityFeed(prev => [newActivity, ...prev.slice(0, 9)])
      }

      setLastUpdated(new Date())

      setTimeout(() => setIsRefreshing(false), 500)
    }

    intervalRef.current = setInterval(updateMetrics, updateInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [updateInterval])

  const formatValue = (value: number, format?: string, unit?: string) => {
    switch (format) {
      case 'percentage':
        return `${value}%`
      case 'time':
        return unit === 'seconds' ? `${value}s` : unit === 'hours' ? `${value}h` : `${value}${unit}`
      case 'score':
        return `${value}/100`
      default:
        return `${value}${unit ? ` ${unit}` : ''}`
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-3 h-3 text-green-500" />
      case 'down':
        return <ArrowDown className="w-3 h-3 text-red-500" />
      default:
        return <Minus className="w-3 h-3 text-gray-400" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'doubt_resolved':
        return <Brain className="w-4 h-4 text-purple-500" />
      case 'test_completed':
        return <Target className="w-4 h-4 text-green-500" />
      case 'login':
        return <Users className="w-4 h-4 text-blue-500" />
      case 'achievement':
        return <CheckCircle className="w-4 h-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Signal className={`w-5 h-5 ${isConnected ? 'text-green-500' : 'text-red-500'}`} />
            <span className="text-sm font-medium text-gray-700">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            {isRefreshing && <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('dashboard')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'dashboard' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'detailed' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Detailed
            </button>
          </div>

          {/* Action Buttons */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Alerts */}
      <AnimatePresence>
        {alerts.filter(alert => !alert.dismissed).map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
              alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {alert.type === 'error' ? <AlertTriangle className="w-5 h-5" /> :
                 alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                 alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-medium">{alert.title}</h4>
                <p className="text-sm opacity-90">{alert.message}</p>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 p-1 rounded-md hover:bg-white/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                <div className={`text-${metric.color}-600`}>
                  {metric.icon}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' :
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {Math.abs(metric.changePercent)}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatValue(metric.value, metric.format, metric.unit)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                vs {formatValue(metric.previousValue, metric.format, metric.unit)} previous
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-500" />
            System Health
          </h3>
          <div className="space-y-3">
            {systemMetrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{metric.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          metric.status === 'healthy' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  metric.status === 'healthy' ? 'bg-green-500' :
                  metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            Live Activity Feed
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activityFeed.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Intl.RelativeTimeFormat().format(
                        Math.round((activity.timestamp.getTime() - Date.now()) / (1000 * 60)),
                        'minute'
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {Object.entries(activity.metadata).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          {key}: {String(value)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}