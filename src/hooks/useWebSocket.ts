'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { WebSocketClient } from '@/lib/websocket/client'
import {
  WebSocketConfig,
  WebSocketMessage,
  WebSocketMessageType,
  WebSocketStatus,
  WebSocketHookReturn,
} from '@/lib/websocket/types'

export function useWebSocket(config: WebSocketConfig): WebSocketHookReturn {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected')
  const [error, setError] = useState<Error | null>(null)
  const [latency, setLatency] = useState<number>(0)
  const clientRef = useRef<WebSocketClient | null>(null)

  const updateLatency = useCallback(() => {
    if (clientRef.current) {
      const state = clientRef.current.getState()
      setLatency(state.latency)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const enhancedConfig: WebSocketConfig = {
      ...config,
      onConnect: () => {
        setStatus('connected')
        setError(null)
        config.onConnect?.()
      },
      onDisconnect: (reason) => {
        setStatus('disconnected')
        config.onDisconnect?.(reason)
      },
      onError: (err) => {
        setStatus('error')
        setError(err)
        config.onError?.(err)
      },
      onMessage: (message) => {
        if (message.type === 'pong') {
          updateLatency()
        }
        config.onMessage?.(message)
      },
    }

    const client = new WebSocketClient(enhancedConfig)
    clientRef.current = client

    client.connect()

    return () => {
      client.disconnect()
      clientRef.current = null
    }
  }, [config.url, config.enableMockMode, updateLatency])

  const send = useCallback((type: WebSocketMessageType, payload: any) => {
    if (clientRef.current) {
      clientRef.current.send(type, payload)
    }
  }, [])

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (clientRef.current) {
      clientRef.current.sendMessage(message)
    }
  }, [])

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect()
    }
  }, [])

  const reconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.reconnect()
    }
  }, [])

  const getQueuedMessages = useCallback((): WebSocketMessage[] => {
    if (clientRef.current) {
      return clientRef.current.getQueuedMessages()
    }
    return []
  }, [])

  const clearQueue = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.clearQueue()
    }
  }, [])

  return {
    status,
    error,
    isConnected: status === 'connected',
    latency,
    send,
    sendMessage,
    disconnect,
    reconnect,
    getQueuedMessages,
    clearQueue,
  }
}

export function useWebSocketMessage<T = any>(
  socket: WebSocketHookReturn | WebSocketClient,
  messageType: WebSocketMessageType,
  handler: (payload: T) => void
): void {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!socket) return

    if (socket instanceof WebSocketClient) {
      return socket.on(messageType, (message) => {
        handlerRef.current(message.payload as T)
      })
    }
  }, [socket, messageType])
}
