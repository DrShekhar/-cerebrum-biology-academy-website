'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { SecurityEvent } from '../../lib/security/browserSecurity'
import { BehavioralProfile } from '../../lib/security/behavioralAnalysis'

interface SecurityAlert {
  id: string
  type: 'security' | 'behavioral' | 'session' | 'question'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  userId: string
  userName?: string
  sessionId: string
  timestamp: number
  isRead: boolean
  isResolved: boolean
  metadata: any
}

interface ActiveSession {
  sessionId: string
  userId: string
  userName: string
  testId: string
  testTitle: string
  startTime: number
  currentQuestion: number
  totalQuestions: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  violations: number
  lastActivity: number
  deviceInfo: {
    browser: string
    os: string
    location?: string
  }
}

interface SecurityMetrics {
  totalActiveSessions: number
  totalAlerts: number
  criticalAlerts: number
  highRiskSessions: number
  averageRiskLevel: number
  violationsLast24h: number
  terminatedSessions: number
  behavioralAnomalies: number
}

interface MonitoringProps {
  onAlert: (alert: SecurityAlert) => void
  onSessionTerminate: (sessionId: string, reason: string) => void
}

export function SecurityMonitoringDashboard({ onAlert, onSessionTerminate }: MonitoringProps) {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([])
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalActiveSessions: 0,
    totalAlerts: 0,
    criticalAlerts: 0,
    highRiskSessions: 0,
    averageRiskLevel: 0,
    violationsLast24h: 0,
    terminatedSessions: 0,
    behavioralAnomalies: 0
  })
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(5000)

  // Real-time data fetching
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchSecurityData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  // Initial data load
  useEffect(() => {
    fetchSecurityData()
  }, [])

  const fetchSecurityData = useCallback(async () => {
    try {
      // In a real implementation, these would be API calls
      const [alertsData, sessionsData, metricsData] = await Promise.all([
        fetchAlerts(),
        fetchActiveSessions(),
        fetchMetrics()
      ])

      setAlerts(alertsData)
      setActiveSessions(sessionsData)
      setMetrics(metricsData)
    } catch (error) {
      console.error('Failed to fetch security data:', error)
    }
  }, [])

  const fetchAlerts = async (): Promise<SecurityAlert[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        type: 'security',
        severity: 'critical',
        title: 'Multiple Tab Switches Detected',
        description: 'User switched tabs 5 times in 2 minutes',
        userId: 'user123',
        userName: 'John Doe',
        sessionId: 'session123',
        timestamp: Date.now() - 300000,
        isRead: false,
        isResolved: false,
        metadata: { tabSwitches: 5, timeWindow: 120 }
      },
      {
        id: '2',
        type: 'behavioral',
        severity: 'high',
        title: 'Suspicious Answer Pattern',
        description: 'Answering questions too quickly consistently',
        userId: 'user456',
        userName: 'Jane Smith',
        sessionId: 'session456',
        timestamp: Date.now() - 600000,
        isRead: false,
        isResolved: false,
        metadata: { averageTime: 3.2, expectedTime: 45 }
      }
    ]
  }

  const fetchActiveSessions = async (): Promise<ActiveSession[]> => {
    // Mock data - replace with actual API call
    return [
      {
        sessionId: 'session123',
        userId: 'user123',
        userName: 'John Doe',
        testId: 'test1',
        testTitle: 'NEET Biology Mock Test 1',
        startTime: Date.now() - 1800000,
        currentQuestion: 15,
        totalQuestions: 180,
        riskLevel: 'critical',
        violations: 7,
        lastActivity: Date.now() - 30000,
        deviceInfo: {
          browser: 'Chrome 121',
          os: 'Windows 11',
          location: 'Mumbai, India'
        }
      },
      {
        sessionId: 'session456',
        userId: 'user456',
        userName: 'Jane Smith',
        testId: 'test1',
        testTitle: 'NEET Biology Mock Test 1',
        startTime: Date.now() - 2400000,
        currentQuestion: 25,
        totalQuestions: 180,
        riskLevel: 'high',
        violations: 3,
        lastActivity: Date.now() - 15000,
        deviceInfo: {
          browser: 'Safari 17',
          os: 'macOS 14',
          location: 'Delhi, India'
        }
      }
    ]
  }

  const fetchMetrics = async (): Promise<SecurityMetrics> => {
    // Mock data - replace with actual API call
    return {
      totalActiveSessions: 47,
      totalAlerts: 23,
      criticalAlerts: 3,
      highRiskSessions: 8,
      averageRiskLevel: 2.3,
      violationsLast24h: 156,
      terminatedSessions: 12,
      behavioralAnomalies: 34
    }
  }

  const handleAlertAction = (alertId: string, action: 'read' | 'resolve' | 'escalate') => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId
          ? {
              ...alert,
              isRead: action === 'read' ? true : alert.isRead,
              isResolved: action === 'resolve' ? true : alert.isResolved
            }
          : alert
      )
    )
  }

  const handleSessionTerminate = (sessionId: string) => {
    const session = activeSessions.find(s => s.sessionId === sessionId)
    if (session) {
      const reason = 'Terminated by admin due to security violations'
      onSessionTerminate(sessionId, reason)

      // Remove from active sessions
      setActiveSessions(prev => prev.filter(s => s.sessionId !== sessionId))

      // Create alert for termination
      const terminationAlert: SecurityAlert = {
        id: `term_${Date.now()}`,
        type: 'session',
        severity: 'high',
        title: 'Session Terminated',
        description: `Session terminated for user ${session.userName}`,
        userId: session.userId,
        userName: session.userName,
        sessionId,
        timestamp: Date.now(),
        isRead: false,
        isResolved: true,
        metadata: { reason, violations: session.violations }
      }

      setAlerts(prev => [terminationAlert, ...prev])
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours}h ${minutes % 60}m ago`
    return `${minutes}m ago`
  }

  const formatDuration = (startTime: number) => {
    const duration = Date.now() - startTime
    const hours = Math.floor(duration / 3600000)
    const minutes = Math.floor((duration % 3600000) / 60000)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Security Monitoring Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time test integrity monitoring and threat detection</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Auto-refresh:</label>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded px-3 py-1"
              disabled={!autoRefresh}
            >
              <option value={5000}>5s</option>
              <option value={10000}>10s</option>
              <option value={30000}>30s</option>
              <option value={60000}>1m</option>
            </select>
            <button
              onClick={fetchSecurityData}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Now
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Sessions</p>
              <p className="text-3xl font-bold text-blue-600">{metrics.totalActiveSessions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              👥
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-600">{metrics.criticalAlerts}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              🚨
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Risk Sessions</p>
              <p className="text-3xl font-bold text-orange-600">{metrics.highRiskSessions}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              ⚠️
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Violations (24h)</p>
              <p className="text-3xl font-bold text-purple-600">{metrics.violationsLast24h}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
            <p className="text-sm text-gray-600">Security violations and suspicious activities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} ${
                    !alert.isRead ? 'border-l-4 border-l-current' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{alert.type}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatTime(alert.timestamp)}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      User: {alert.userName || alert.userId}
                    </span>
                    <div className="flex space-x-2">
                      {!alert.isRead && (
                        <button
                          onClick={() => handleAlertAction(alert.id, 'read')}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark Read
                        </button>
                      )}
                      {!alert.isResolved && (
                        <button
                          onClick={() => handleAlertAction(alert.id, 'resolve')}
                          className="text-xs text-green-600 hover:text-green-800"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Active Test Sessions</h2>
            <p className="text-sm text-gray-600">Live monitoring of ongoing tests</p>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activeSessions.map((session) => (
                <div
                  key={session.sessionId}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 cursor-pointer"
                  onClick={() => setSelectedSession(
                    selectedSession === session.sessionId ? null : session.sessionId
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(session.riskLevel)}`}>
                        {session.riskLevel.toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{session.userName}</span>
                    </div>
                    <div className="text-xs text-gray-500">{formatDuration(session.startTime)}</div>
                  </div>

                  <div className="text-sm text-gray-600 mb-2">{session.testTitle}</div>

                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>Q {session.currentQuestion}/{session.totalQuestions}</span>
                    <span>{session.violations} violations</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(session.currentQuestion / session.totalQuestions) * 100}%` }}
                    ></div>
                  </div>

                  {selectedSession === session.sessionId && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">Device:</span>
                          <div>{session.deviceInfo.browser}</div>
                          <div>{session.deviceInfo.os}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <div>{session.deviceInfo.location || 'Unknown'}</div>
                          <div>Last activity: {formatTime(session.lastActivity)}</div>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSessionTerminate(session.sessionId)
                          }}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                        >
                          Terminate Session
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600"
                        >
                          Flag for Review
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Violation Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Violation Trends</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tab Switching</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">142</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Copy/Paste</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-sm font-medium">67</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fullscreen Exit</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <span className="text-sm font-medium">34</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">DevTools</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-sm font-medium">23</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {metrics.averageRiskLevel.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Average Risk Score</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-red-600">Critical (4.0+)</span>
                <span>3 sessions</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-orange-600">High (3.0-3.9)</span>
                <span>8 sessions</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-yellow-600">Medium (2.0-2.9)</span>
                <span>15 sessions</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-600">Low (0-1.9)</span>
                <span>21 sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Browser Security</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Behavioral Analysis</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Session Integrity</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Question Security</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">AI Monitoring</span>
              <span className="text-sm font-medium text-orange-600">Learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityMonitoringDashboard