'use client'

import { useWebSocket, useWebSocketMessage } from '@/hooks/useWebSocket'
import { WebSocketClient } from './client'
import {
  StudyMetricsPayload,
  CollaborativeSessionPayload,
  NotificationPayload,
  SystemStatusPayload,
} from './types'

export function LiveStudyMetricsExample() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    reconnect: true,
    heartbeatInterval: 30000,
    enableMockMode: true,
    debug: true,
  })

  useWebSocketMessage<StudyMetricsPayload>(
    new WebSocketClient({
      url: 'wss://api.cerebrumbiologyacademy.com/ws',
      enableMockMode: true,
    }),
    'study_metrics_update',
    (metrics) => {
      console.log('Study metrics updated:', metrics)
    }
  )

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Live Study Metrics</h3>
        <div className="flex items-center space-x-2">
          <div
            className={`h-2 w-2 rounded-full ${socket.isConnected ? 'bg-green-600' : 'bg-red-500'}`}
          />
          <span className="text-sm text-gray-600">{socket.status}</span>
          {socket.isConnected && socket.latency > 0 && (
            <span className="text-xs text-gray-400">{socket.latency}ms</span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-md bg-blue-50 p-4">
          <div className="text-sm font-medium text-blue-900">Study Hours Today</div>
          <div className="mt-1 text-2xl font-bold text-blue-600">3.5 hrs</div>
        </div>

        <div className="rounded-md bg-green-50 p-4">
          <div className="text-sm font-medium text-green-900">Progress</div>
          <div className="mt-1 text-2xl font-bold text-green-600">67%</div>
        </div>

        <div className="rounded-md bg-purple-50 p-4">
          <div className="text-sm font-medium text-purple-900">Study Streak</div>
          <div className="mt-1 text-2xl font-bold text-purple-600">15 days</div>
        </div>
      </div>

      {socket.error && (
        <div className="mt-4 rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">Error: {socket.error.message}</p>
          <button
            onClick={socket.reconnect}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Retry Connection
          </button>
        </div>
      )}
    </div>
  )
}

export function CollaborativeStudySessionExample() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
    debug: true,
  })

  useWebSocketMessage<CollaborativeSessionPayload>(
    new WebSocketClient({
      url: 'wss://api.cerebrumbiologyacademy.com/ws',
      enableMockMode: true,
    }),
    'collaborative_session_update',
    (session) => {
      console.log('Collaborative session updated:', session)
    }
  )

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Genetics Study Group</h3>
        <p className="text-sm text-gray-600">2 students studying together</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-500"></div>
          <div>
            <div className="text-sm font-medium text-gray-900">Priya Sharma</div>
            <div className="text-xs text-gray-500">Joined 10 mins ago</div>
          </div>
          <div className="ml-auto">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-600"></span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-purple-500"></div>
          <div>
            <div className="text-sm font-medium text-gray-900">Rahul Kumar</div>
            <div className="text-xs text-gray-500">Joined 5 mins ago</div>
          </div>
          <div className="ml-auto">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-600"></span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Connection Status:</span>
          <span
            className={`font-medium ${socket.isConnected ? 'text-green-600' : 'text-gray-400'}`}
          >
            {socket.isConnected ? 'Live' : 'Disconnected'}
          </span>
        </div>
      </div>
    </div>
  )
}

export function LiveNotificationsExample() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
    debug: true,
  })

  useWebSocketMessage<NotificationPayload>(
    new WebSocketClient({
      url: 'wss://api.cerebrumbiologyacademy.com/ws',
      enableMockMode: true,
    }),
    'notification',
    (notification) => {
      console.log('New notification:', notification)
    }
  )

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Notifications</h3>
        <p className="text-sm text-gray-600">Real-time updates and alerts</p>
      </div>

      <div className="space-y-3">
        <div className="rounded-md border border-green-200 bg-green-50 p-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">New Achievement</p>
              <p className="mt-1 text-xs text-green-700">
                You have unlocked the Study Streak Master badge!
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Study Reminder</p>
              <p className="mt-1 text-xs text-blue-700">Time for your scheduled Biology revision</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>Connected via WebSocket</span>
        <span>{socket.isConnected ? 'Live updates' : 'Reconnecting...'}</span>
      </div>
    </div>
  )
}

export function SystemStatusExample() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
    debug: true,
  })

  useWebSocketMessage<SystemStatusPayload>(
    new WebSocketClient({
      url: 'wss://api.cerebrumbiologyacademy.com/ws',
      enableMockMode: true,
    }),
    'system_status',
    (status) => {
      console.log('System status updated:', status)
    }
  )

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <p className="text-sm text-gray-600">Real-time system health monitoring</p>
      </div>

      <div className="mb-4 rounded-md bg-green-50 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-900">All Systems Operational</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">API</span>
          <span className="font-medium text-green-600">Operational</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Database</span>
          <span className="font-medium text-green-600">Operational</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Cache</span>
          <span className="font-medium text-green-600">Operational</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Storage</span>
          <span className="font-medium text-green-600">Operational</span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Uptime: 99.99%</span>
          <span>
            {socket.isConnected ? (
              <span className="text-green-600">Live</span>
            ) : (
              <span className="text-gray-400">Offline</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export function WebSocketDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">WebSocket Dashboard</h1>
          <p className="mt-2 text-gray-600">Real-time updates powered by WebSocket connections</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <LiveStudyMetricsExample />
          <CollaborativeStudySessionExample />
          <LiveNotificationsExample />
          <SystemStatusExample />
        </div>
      </div>
    </div>
  )
}
