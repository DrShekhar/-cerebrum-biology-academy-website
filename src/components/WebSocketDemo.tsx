'use client'

import { useWebSocket, useWebSocketMessage } from '@/hooks/useWebSocket'
import {
  StudyMetricsPayload,
  CollaborativeSessionPayload,
  NotificationPayload,
  SystemStatusPayload,
} from '@/lib/websocket/types'
import { useState, useEffect } from 'react'

export function WebSocketDemo() {
  const [studyMetrics, setStudyMetrics] = useState<StudyMetricsPayload | null>(null)
  const [collaborativeSession, setCollaborativeSession] =
    useState<CollaborativeSessionPayload | null>(null)
  const [notifications, setNotifications] = useState<NotificationPayload[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatusPayload | null>(null)
  const [messageCount, setMessageCount] = useState(0)

  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
    debug: true,
    reconnect: true,
    onConnect: () => {
      console.log('🟢 WebSocket Connected')
    },
    onDisconnect: (reason) => {
      console.log('🔴 WebSocket Disconnected:', reason)
    },
    onError: (error) => {
      console.error('❌ WebSocket Error:', error)
    },
    onMessage: (message) => {
      console.log('📨 Message received:', message.type)
      setMessageCount((prev) => prev + 1)
    },
  })

  useWebSocketMessage<StudyMetricsPayload>(socket as any, 'study_metrics_update', (data) => {
    setStudyMetrics(data)
  })

  useWebSocketMessage<CollaborativeSessionPayload>(
    socket as any,
    'collaborative_session_update',
    (data) => {
      setCollaborativeSession(data)
    }
  )

  useWebSocketMessage<NotificationPayload>(socket as any, 'notification', (data) => {
    setNotifications((prev) => [data, ...prev].slice(0, 5))
  })

  useWebSocketMessage<SystemStatusPayload>(socket as any, 'system_status', (data) => {
    setSystemStatus(data)
  })

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-8 rounded-lg border-2 border-blue-500 bg-blue-50 p-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">WebSocket Real-Time Demo</h1>
        <p className="mb-4 text-gray-600">
          Live demonstration of WebSocket functionality with mock data
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${socket.isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
            />
            <span className="text-sm font-medium">
              {socket.status.charAt(0).toUpperCase() + socket.status.slice(1)}
            </span>
          </div>

          {socket.latency > 0 && (
            <div className="rounded-md bg-white px-3 py-1 text-sm">
              <span className="text-gray-600">Latency:</span>
              <span className="ml-2 font-mono font-bold text-blue-600">{socket.latency}ms</span>
            </div>
          )}

          <div className="rounded-md bg-white px-3 py-1 text-sm">
            <span className="text-gray-600">Messages:</span>
            <span className="ml-2 font-mono font-bold text-green-600">{messageCount}</span>
          </div>

          <div className="ml-auto flex space-x-2">
            <button
              onClick={socket.reconnect}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Reconnect
            </button>
            <button
              onClick={socket.disconnect}
              className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Disconnect
            </button>
          </div>
        </div>

        {socket.error && (
          <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3">
            <p className="text-sm font-medium text-red-800">Error: {socket.error.message}</p>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">📊 Study Metrics</h2>
          {studyMetrics ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-md bg-blue-50 p-3">
                <span className="text-sm font-medium text-gray-700">Study Hours</span>
                <span className="text-xl font-bold text-blue-600">{studyMetrics.studyHours}h</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-green-50 p-3">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-xl font-bold text-green-600">{studyMetrics.progress}%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-purple-50 p-3">
                <span className="text-sm font-medium text-gray-700">Streak</span>
                <span className="text-xl font-bold text-purple-600">
                  {studyMetrics.streak} days
                </span>
              </div>
              {studyMetrics.currentTopic && (
                <div className="rounded-md bg-gray-50 p-3">
                  <span className="text-xs text-gray-600">Current Topic</span>
                  <p className="mt-1 font-medium text-gray-900">{studyMetrics.currentTopic}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">Waiting for metrics...</div>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">👥 Collaborative Session</h2>
          {collaborativeSession ? (
            <div>
              <div className="mb-3 rounded-md bg-blue-50 p-3">
                <p className="font-semibold text-gray-900">{collaborativeSession.topic}</p>
                <p className="text-sm text-gray-600">
                  {collaborativeSession.activeUsers} active participants
                </p>
              </div>
              <div className="space-y-2">
                {collaborativeSession.participants.map((p) => (
                  <div
                    key={p.userId}
                    className="flex items-center space-x-3 rounded-md border border-gray-200 p-2"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{p.userName}</p>
                      <p className="text-xs text-gray-500">
                        Joined {Math.floor((Date.now() - p.joinedAt) / 60000)} mins ago
                      </p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">Waiting for session data...</div>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">🔔 Live Notifications</h2>
          {notifications.length > 0 ? (
            <div className="space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`rounded-md border p-3 ${
                    notif.type === 'success'
                      ? 'border-green-200 bg-green-50'
                      : notif.type === 'error'
                        ? 'border-red-200 bg-red-50'
                        : notif.type === 'warning'
                          ? 'border-yellow-200 bg-yellow-50'
                          : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      notif.type === 'success'
                        ? 'text-green-900'
                        : notif.type === 'error'
                          ? 'text-red-900'
                          : notif.type === 'warning'
                            ? 'text-yellow-900'
                            : 'text-blue-900'
                    }`}
                  >
                    {notif.title}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      notif.type === 'success'
                        ? 'text-green-700'
                        : notif.type === 'error'
                          ? 'text-red-700'
                          : notif.type === 'warning'
                            ? 'text-yellow-700'
                            : 'text-blue-700'
                    }`}
                  >
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">Waiting for notifications...</div>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">🔧 System Status</h2>
          {systemStatus ? (
            <div>
              <div
                className={`mb-4 rounded-md p-3 ${
                  systemStatus.status === 'operational'
                    ? 'bg-green-50'
                    : systemStatus.status === 'degraded'
                      ? 'bg-yellow-50'
                      : 'bg-red-50'
                }`}
              >
                <p
                  className={`font-semibold ${
                    systemStatus.status === 'operational'
                      ? 'text-green-900'
                      : systemStatus.status === 'degraded'
                        ? 'text-yellow-900'
                        : 'text-red-900'
                  }`}
                >
                  {systemStatus.status.charAt(0).toUpperCase() + systemStatus.status.slice(1)}
                </p>
              </div>
              <div className="space-y-2">
                {Object.entries(systemStatus.services).map(([service, status]) => (
                  <div key={service} className="flex items-center justify-between text-sm">
                    <span className="capitalize text-gray-700">{service}</span>
                    <span className={`font-medium ${status ? 'text-green-600' : 'text-red-600'}`}>
                      {status ? '✓ Operational' : '✗ Down'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-500">Uptime: {systemStatus.uptime}%</p>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">Waiting for system status...</div>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        <h3 className="mb-3 text-lg font-bold text-gray-900">💡 Integration Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>
              <strong>Mock Mode Enabled:</strong> Currently using simulated data (perfect for
              development)
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>
              <strong>Auto-Reconnect:</strong> Connection automatically recovers from failures
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>
              <strong>Message Queue:</strong> Messages are queued when offline and sent when
              reconnected
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>
              <strong>Low Latency:</strong> Real-time updates with ping/pong monitoring
            </span>
          </li>
        </ul>

        <div className="mt-4 rounded-md bg-white p-4">
          <p className="text-xs text-gray-600">
            📚 View complete documentation at:{' '}
            <code className="rounded bg-gray-100 px-2 py-1 font-mono">
              /src/lib/websocket/README.md
            </code>
          </p>
          <p className="mt-2 text-xs text-gray-600">
            🎯 See integration examples at:{' '}
            <code className="rounded bg-gray-100 px-2 py-1 font-mono">
              /src/lib/websocket/INTEGRATION_GUIDE.md
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}
