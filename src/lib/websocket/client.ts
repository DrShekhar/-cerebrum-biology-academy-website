'use client'

import {
  WebSocketConfig,
  WebSocketMessage,
  WebSocketMessageType,
  WebSocketState,
  WebSocketStatus,
} from './types'

export class WebSocketClient {
  private socket: WebSocket | null = null
  private config: Required<WebSocketConfig>
  private state: WebSocketState
  private heartbeatTimer: NodeJS.Timeout | null = null
  private reconnectTimer: NodeJS.Timeout | null = null
  private connectionTimeoutTimer: NodeJS.Timeout | null = null
  private listeners: Map<string, Set<(message: WebSocketMessage) => void>> = new Map()
  private mockInterval: NodeJS.Timeout | null = null
  private lastPingTime: number = 0

  constructor(config: WebSocketConfig) {
    this.config = {
      url: config.url,
      reconnect: config.reconnect ?? true,
      reconnectAttempts: config.reconnectAttempts ?? 5,
      reconnectInterval: config.reconnectInterval ?? 3000,
      heartbeatInterval: config.heartbeatInterval ?? 30000,
      connectionTimeout: config.connectionTimeout ?? 10000,
      enableQueue: config.enableQueue ?? true,
      enableMockMode: config.enableMockMode ?? false,
      debug: config.debug ?? false,
      onConnect: config.onConnect ?? (() => {}),
      onDisconnect: config.onDisconnect ?? (() => {}),
      onError: config.onError ?? (() => {}),
      onMessage: config.onMessage ?? (() => {}),
    }

    this.state = {
      status: 'disconnected',
      error: null,
      lastConnected: null,
      reconnectAttempts: 0,
      messageQueue: [],
      latency: 0,
    }
  }

  connect(): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.log('Already connected')
      return
    }

    if (this.config.enableMockMode) {
      this.log('Starting in mock mode')
      this.startMockMode()
      return
    }

    this.updateStatus('connecting')

    try {
      this.socket = new WebSocket(this.config.url)

      this.connectionTimeoutTimer = setTimeout(() => {
        if (this.state.status === 'connecting') {
          this.log('Connection timeout')
          this.handleConnectionError(new Error('Connection timeout'))
        }
      }, this.config.connectionTimeout)

      this.socket.onopen = () => this.handleOpen()
      this.socket.onclose = (event) => this.handleClose(event)
      this.socket.onerror = (event) => this.handleError(event)
      this.socket.onmessage = (event) => this.handleMessage(event)
    } catch (error) {
      this.handleConnectionError(error as Error)
    }
  }

  disconnect(): void {
    this.clearTimers()

    if (this.config.enableMockMode) {
      this.stopMockMode()
    }

    if (this.socket) {
      this.socket.close(1000, 'Client disconnect')
      this.socket = null
    }

    this.updateStatus('disconnected')
    this.config.onDisconnect('Manual disconnect')
  }

  send(type: WebSocketMessageType, payload: any): void {
    const message: WebSocketMessage = {
      type,
      payload,
      timestamp: Date.now(),
      messageId: this.generateMessageId(),
    }

    this.sendMessage(message)
  }

  sendMessage(message: WebSocketMessage): void {
    if (this.config.enableMockMode) {
      this.log('Mock send:', message)
      return
    }

    if (this.socket?.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message))
        this.log('Sent:', message)
      } catch (error) {
        this.log('Send error:', error)
        if (this.config.enableQueue) {
          this.queueMessage(message)
        }
      }
    } else if (this.config.enableQueue) {
      this.queueMessage(message)
      this.log('Queued:', message)
    }
  }

  reconnect(): void {
    this.state.reconnectAttempts = 0
    this.connect()
  }

  on(type: WebSocketMessageType, handler: (message: WebSocketMessage) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(handler)

    return () => {
      const handlers = this.listeners.get(type)
      if (handlers) {
        handlers.delete(handler)
      }
    }
  }

  getState(): WebSocketState {
    return { ...this.state }
  }

  getQueuedMessages(): WebSocketMessage[] {
    return [...this.state.messageQueue]
  }

  clearQueue(): void {
    this.state.messageQueue = []
  }

  private handleOpen(): void {
    this.log('Connected')
    this.clearConnectionTimeout()
    this.updateStatus('connected')
    this.state.lastConnected = Date.now()
    this.state.reconnectAttempts = 0
    this.config.onConnect()
    this.startHeartbeat()
    this.flushMessageQueue()
  }

  private handleClose(event: CloseEvent): void {
    this.log('Disconnected:', event.code, event.reason)
    this.clearTimers()
    this.updateStatus('disconnected')
    this.config.onDisconnect(event.reason || `Code: ${event.code}`)

    if (this.config.reconnect && this.state.reconnectAttempts < this.config.reconnectAttempts) {
      this.scheduleReconnect()
    }
  }

  private handleError(event: Event): void {
    this.log('Socket error:', event)
    const error = new Error('WebSocket error occurred')
    this.state.error = error
    this.config.onError(error)
  }

  private handleConnectionError(error: Error): void {
    this.log('Connection error:', error)
    this.clearConnectionTimeout()
    this.updateStatus('error')
    this.state.error = error
    this.config.onError(error)

    if (this.config.reconnect && this.state.reconnectAttempts < this.config.reconnectAttempts) {
      this.scheduleReconnect()
    }
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data)
      this.log('Received:', message)

      if (message.type === 'pong') {
        this.state.latency = Date.now() - this.lastPingTime
        this.log('Latency:', this.state.latency, 'ms')
      }

      this.config.onMessage(message)
      this.notifyListeners(message)
    } catch (error) {
      this.log('Message parse error:', error)
    }
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.lastPingTime = Date.now()
        this.send('ping', { timestamp: this.lastPingTime })
      }
    }, this.config.heartbeatInterval)
  }

  private scheduleReconnect(): void {
    this.state.reconnectAttempts++
    this.updateStatus('reconnecting')

    const delay = this.config.reconnectInterval * Math.pow(1.5, this.state.reconnectAttempts - 1)
    this.log(
      `Reconnecting in ${delay}ms (attempt ${this.state.reconnectAttempts}/${this.config.reconnectAttempts})`
    )

    this.reconnectTimer = setTimeout(() => {
      this.connect()
    }, delay)
  }

  private flushMessageQueue(): void {
    if (this.state.messageQueue.length > 0) {
      this.log('Flushing', this.state.messageQueue.length, 'queued messages')
      const queue = [...this.state.messageQueue]
      this.state.messageQueue = []
      queue.forEach((message) => this.sendMessage(message))
    }
  }

  private queueMessage(message: WebSocketMessage): void {
    this.state.messageQueue.push(message)
    if (this.state.messageQueue.length > 100) {
      this.state.messageQueue.shift()
    }
  }

  private notifyListeners(message: WebSocketMessage): void {
    const handlers = this.listeners.get(message.type)
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(message)
        } catch (error) {
          this.log('Listener error:', error)
        }
      })
    }
  }

  private updateStatus(status: WebSocketStatus): void {
    this.state.status = status
    this.log('Status:', status)
  }

  private clearTimers(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    this.clearConnectionTimeout()
  }

  private clearConnectionTimeout(): void {
    if (this.connectionTimeoutTimer) {
      clearTimeout(this.connectionTimeoutTimer)
      this.connectionTimeoutTimer = null
    }
  }

  private startMockMode(): void {
    this.updateStatus('connected')
    this.state.lastConnected = Date.now()
    this.config.onConnect()

    this.mockInterval = setInterval(() => {
      this.generateMockData()
    }, 5000)
  }

  private stopMockMode(): void {
    if (this.mockInterval) {
      clearInterval(this.mockInterval)
      this.mockInterval = null
    }
  }

  private generateMockData(): void {
    const mockTypes: WebSocketMessageType[] = [
      'study_metrics_update',
      'collaborative_session_update',
      'notification',
      'system_status',
    ]

    const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)]
    const message: WebSocketMessage = {
      type: randomType,
      payload: this.getMockPayload(randomType),
      timestamp: Date.now(),
      messageId: this.generateMessageId(),
    }

    this.log('Mock message:', message)
    this.config.onMessage(message)
    this.notifyListeners(message)
  }

  private getMockPayload(type: WebSocketMessageType): any {
    switch (type) {
      case 'study_metrics_update':
        return {
          userId: 'mock-user-123',
          studyHours: Math.floor(Math.random() * 10) + 1,
          progress: Math.floor(Math.random() * 100),
          currentTopic: 'Cell Biology',
          sessionDuration: Math.floor(Math.random() * 3600),
          streak: Math.floor(Math.random() * 30),
        }

      case 'collaborative_session_update':
        return {
          sessionId: 'session-' + Date.now(),
          topic: 'Genetics Study Group',
          participants: [
            {
              userId: 'user-1',
              userName: 'Priya Sharma',
              avatarUrl: '/avatars/1.jpg',
              joinedAt: Date.now() - 600000,
            },
            {
              userId: 'user-2',
              userName: 'Rahul Kumar',
              avatarUrl: '/avatars/2.jpg',
              joinedAt: Date.now() - 300000,
            },
          ],
          activeUsers: 2,
        }

      case 'notification':
        const notifications = [
          {
            title: 'New Achievement',
            message: 'You have unlocked the "Study Streak Master" badge!',
            type: 'success' as const,
          },
          {
            title: 'Study Reminder',
            message: 'Time for your scheduled Biology revision',
            type: 'info' as const,
          },
          {
            title: 'New Message',
            message: 'Dr. Shekhar replied to your query',
            type: 'info' as const,
          },
        ]
        const notification = notifications[Math.floor(Math.random() * notifications.length)]
        return {
          id: 'notif-' + Date.now(),
          ...notification,
          priority: 'medium' as const,
        }

      case 'system_status':
        return {
          status: 'operational' as const,
          services: {
            api: true,
            database: true,
            cache: true,
            storage: true,
          },
          uptime: 99.99,
          lastCheck: Date.now(),
        }

      default:
        return {}
    }
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[WebSocket]', ...args)
    }
  }
}
