/**
 * Real-time Data Synchronization System
 * Connects live data with animation system for dynamic updates
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import { RealtimeEvent, AnimationState, EnhancedCourseData } from './integrationSchemas'

// Event types for real-time updates
export type RealtimeEventType =
  | 'course_updated'
  | 'user_interaction'
  | 'enrollment_changed'
  | 'animation_triggered'
  | 'analytics_update'
  | 'system_status'

// Real-time connection manager
export class RealtimeDataSync {
  private connections: Map<string, WebSocket> = new Map()
  private eventListeners: Map<string, Set<(event: RealtimeEvent) => void>> = new Map()
  private reconnectAttempts: Map<string, number> = new Map()
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  // Connect to real-time data stream
  connect(endpoint: string, channelId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(`${endpoint}?channel=${channelId}`)

        ws.onopen = () => {
          console.log(`✅ Connected to real-time channel: ${channelId}`)
          this.connections.set(channelId, ws)
          this.reconnectAttempts.set(channelId, 0)
          resolve()
        }

        ws.onmessage = (event) => {
          try {
            const data: RealtimeEvent = JSON.parse(event.data)
            this.broadcast(channelId, data)
          } catch (error) {
            console.error('Failed to parse real-time event:', error)
          }
        }

        ws.onclose = () => {
          console.log(`🔌 Disconnected from channel: ${channelId}`)
          this.handleReconnection(endpoint, channelId)
        }

        ws.onerror = (error) => {
          console.error(`❌ WebSocket error on channel ${channelId}:`, error)
          reject(error)
        }
      } catch (error) {
        console.error('Failed to establish WebSocket connection:', error)
        reject(error)
      }
    })
  }

  // Handle automatic reconnection
  private handleReconnection(endpoint: string, channelId: string) {
    const attempts = this.reconnectAttempts.get(channelId) || 0

    if (attempts < this.maxReconnectAttempts) {
      const delay = this.reconnectDelay * Math.pow(2, attempts) // Exponential backoff

      setTimeout(() => {
        console.log(`🔄 Reconnecting to channel ${channelId} (attempt ${attempts + 1})`)
        this.reconnectAttempts.set(channelId, attempts + 1)
        this.connect(endpoint, channelId)
      }, delay)
    } else {
      console.error(`💥 Max reconnection attempts reached for channel: ${channelId}`)
    }
  }

  // Subscribe to real-time events
  subscribe(channelId: string, callback: (event: RealtimeEvent) => void): () => void {
    if (!this.eventListeners.has(channelId)) {
      this.eventListeners.set(channelId, new Set())
    }

    this.eventListeners.get(channelId)!.add(callback)

    // Return unsubscribe function
    return () => {
      this.eventListeners.get(channelId)?.delete(callback)
    }
  }

  // Broadcast event to all subscribers
  private broadcast(channelId: string, event: RealtimeEvent) {
    const listeners = this.eventListeners.get(channelId)
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(event)
        } catch (error) {
          console.error('Error in event listener:', error)
        }
      })
    }
  }

  // Send data to server
  send(channelId: string, data: any): boolean {
    const connection = this.connections.get(channelId)
    if (connection && connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(data))
      return true
    }
    return false
  }

  // Disconnect from channel
  disconnect(channelId: string) {
    const connection = this.connections.get(channelId)
    if (connection) {
      connection.close()
      this.connections.delete(channelId)
      this.eventListeners.delete(channelId)
      this.reconnectAttempts.delete(channelId)
    }
  }

  // Disconnect all connections
  disconnectAll() {
    this.connections.forEach((_, channelId) => {
      this.disconnect(channelId)
    })
  }
}

// Global instance
export const realtimeSync = new RealtimeDataSync()

// React hook for real-time data with animation integration
export function useRealtimeData<T>(
  channelId: string,
  initialData: T,
  options: {
    endpoint?: string
    autoConnect?: boolean
    syncWithAnimation?: boolean
    onUpdate?: (data: T) => void
  } = {}
) {
  const [data, setData] = useState<T>(initialData)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const pendingUpdatesRef = useRef<T[]>([])

  const {
    endpoint = 'ws://localhost:3001/api/realtime',
    autoConnect = true,
    syncWithAnimation = true,
    onUpdate,
  } = options

  // Apply updates with animation frame synchronization
  const applyUpdates = useCallback(() => {
    if (pendingUpdatesRef.current.length > 0) {
      const latestUpdate = pendingUpdatesRef.current.pop()!
      pendingUpdatesRef.current = [] // Clear all pending updates

      setData(latestUpdate)
      onUpdate?.(latestUpdate)
    }
  }, [onUpdate])

  // Handle real-time events
  const handleRealtimeEvent = useCallback(
    (event: RealtimeEvent) => {
      try {
        const updatedData = event.data as T

        if (syncWithAnimation) {
          // Queue update for next animation frame
          pendingUpdatesRef.current.push(updatedData)

          if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(() => {
              applyUpdates()
              animationFrameRef.current = undefined
            })
          }
        } else {
          // Apply update immediately
          setData(updatedData)
          onUpdate?.(updatedData)
        }
      } catch (error) {
        console.error('Error processing real-time update:', error)
        setError(error instanceof Error ? error.message : 'Update processing failed')
      }
    },
    [syncWithAnimation, applyUpdates, onUpdate]
  )

  // Connect to real-time data
  useEffect(() => {
    if (!autoConnect) return

    let unsubscribe: (() => void) | undefined

    const connectAndSubscribe = async () => {
      try {
        setError(null)
        await realtimeSync.connect(endpoint, channelId)
        setIsConnected(true)

        unsubscribe = realtimeSync.subscribe(channelId, handleRealtimeEvent)
      } catch (error) {
        console.error('Real-time connection failed:', error)
        setError(error instanceof Error ? error.message : 'Connection failed')
        setIsConnected(false)
      }
    }

    connectAndSubscribe()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      unsubscribe?.()
      realtimeSync.disconnect(channelId)
      setIsConnected(false)
    }
  }, [channelId, endpoint, autoConnect, handleRealtimeEvent])

  // Send data through real-time connection
  const sendUpdate = useCallback(
    (updateData: Partial<T>) => {
      const success = realtimeSync.send(channelId, {
        type: 'data_update',
        data: updateData,
        timestamp: new Date().toISOString(),
      })

      if (!success) {
        setError('Failed to send update - connection not available')
      }

      return success
    },
    [channelId]
  )

  return {
    data,
    isConnected,
    error,
    sendUpdate,
    forceRefresh: () => applyUpdates(),
  }
}

// Hook for course selector real-time data
export function useRealtimeCourseData(classLevel: string, userId?: string) {
  const channelId = `courses-${classLevel}`

  return useRealtimeData<EnhancedCourseData[]>(channelId, [], {
    endpoint: 'ws://localhost:3001/api/realtime',
    autoConnect: true,
    syncWithAnimation: true,
    onUpdate: (courses) => {
      // Trigger course update animations
      console.log(`🎬 Updated ${courses.length} courses with real-time data`)
    },
  })
}

// Hook for animation state synchronization
export function useRealtimeAnimationState(sessionId: string) {
  const channelId = `animation-${sessionId}`

  const initialState: AnimationState = {
    id: crypto.randomUUID(),
    userId: '',
    sessionId,
    currentClass: 'all',
    animationPreferences: {
      reducedMotion: false,
      speed: 'normal',
      effects: ['scale', 'fade', 'spring'],
    },
    interactions: [],
    engagementMetrics: {
      timeSpent: 0,
      cardsViewed: 0,
      plansCompared: 0,
      animationsTriggered: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return useRealtimeData<AnimationState>(channelId, initialState, {
    syncWithAnimation: true,
    onUpdate: (state) => {
      // Update animation system based on new state
      console.log('🎭 Animation state synchronized:', state.engagementMetrics)
    },
  })
}

// Utility for tracking course interactions in real-time
export function trackCourseInteraction(
  courseId: string,
  action: string,
  metadata: Record<string, any> = {}
) {
  const event: RealtimeEvent = {
    id: crypto.randomUUID(),
    type: 'user_joined',
    data: {
      courseId,
      action,
      metadata,
      timestamp: new Date().toISOString(),
    },
    userId: metadata.userId || 'anonymous',
    timestamp: new Date().toISOString(),
    priority: 'medium',
  }

  // Send to analytics channel
  realtimeSync.send('analytics', event)

  // Send to course-specific channel
  realtimeSync.send(`course-${courseId}`, event)
}

// Performance monitoring for real-time system
export function useRealtimePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    connectionLatency: 0,
    updateFrequency: 0,
    errorRate: 0,
    throughput: 0,
  })

  useEffect(() => {
    const startTime = performance.now()
    const updateCount = 0
    const errorCount = 0

    const monitor = setInterval(() => {
      const currentTime = performance.now()
      const elapsed = currentTime - startTime

      setMetrics({
        connectionLatency: Math.random() * 50 + 10, // Simulated
        updateFrequency: (updateCount / elapsed) * 1000,
        errorRate: (errorCount / Math.max(updateCount, 1)) * 100,
        throughput: updateCount,
      })
    }, 5000)

    return () => clearInterval(monitor)
  }, [])

  return metrics
}
