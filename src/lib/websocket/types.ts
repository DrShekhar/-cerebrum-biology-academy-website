export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'error'

export type WebSocketMessageType =
  | 'ping'
  | 'pong'
  | 'study_metrics_update'
  | 'collaborative_session_update'
  | 'notification'
  | 'system_status'
  | 'user_joined'
  | 'user_left'
  | 'achievement_unlocked'
  | 'message'
  | 'error'

export interface WebSocketMessage<T = any> {
  type: WebSocketMessageType
  payload: T
  timestamp: number
  messageId: string
}

export interface StudyMetricsPayload {
  userId: string
  studyHours: number
  progress: number
  currentTopic?: string
  sessionDuration: number
  streak: number
}

export interface CollaborativeSessionPayload {
  sessionId: string
  topic: string
  participants: {
    userId: string
    userName: string
    avatarUrl?: string
    joinedAt: number
  }[]
  activeUsers: number
}

export interface NotificationPayload {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  priority: 'low' | 'medium' | 'high'
  actionUrl?: string
  actionText?: string
}

export interface SystemStatusPayload {
  status: 'operational' | 'degraded' | 'maintenance' | 'outage'
  services: {
    api: boolean
    database: boolean
    cache: boolean
    storage: boolean
  }
  uptime: number
  lastCheck: number
}

export interface AchievementPayload {
  id: string
  title: string
  description: string
  icon: string
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface WebSocketConfig {
  url: string
  reconnect?: boolean
  reconnectAttempts?: number
  reconnectInterval?: number
  heartbeatInterval?: number
  connectionTimeout?: number
  enableQueue?: boolean
  enableMockMode?: boolean
  debug?: boolean
  onConnect?: () => void
  onDisconnect?: (reason?: string) => void
  onError?: (error: Error) => void
  onMessage?: (message: WebSocketMessage) => void
}

export interface WebSocketState {
  status: WebSocketStatus
  error: Error | null
  lastConnected: number | null
  reconnectAttempts: number
  messageQueue: WebSocketMessage[]
  latency: number
}

export interface WebSocketHookReturn {
  status: WebSocketStatus
  error: Error | null
  isConnected: boolean
  latency: number
  send: (type: WebSocketMessageType, payload: any) => void
  sendMessage: (message: WebSocketMessage) => void
  disconnect: () => void
  reconnect: () => void
  getQueuedMessages: () => WebSocketMessage[]
  clearQueue: () => void
}
