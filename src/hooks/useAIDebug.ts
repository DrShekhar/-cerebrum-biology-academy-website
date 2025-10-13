// React Hook for Client-Side AI Debugging
// Easy integration of AI debugging into React components

import { useEffect, useState, useCallback } from 'react'
import { clientAIDebugger, type DebugLog } from '@/lib/ai/clientDebugger'

export interface UseAIDebugOptions {
  autoEnable?: boolean
  logLevel?: 'minimal' | 'detailed' | 'verbose'
  monitorComponent?: string // Component name for tracking
}

export interface AIDebugState {
  isEnabled: boolean
  logs: DebugLog[]
  stats: any
  activeRequests: number
}

export function useAIDebug(options: UseAIDebugOptions = {}) {
  const [debugState, setDebugState] = useState<AIDebugState>({
    isEnabled: false,
    logs: [],
    stats: null,
    activeRequests: 0,
  })

  // Initialize debugging
  useEffect(() => {
    if (typeof window === 'undefined' || !clientAIDebugger) return

    if (options.autoEnable) {
      clientAIDebugger.enable(options.logLevel)
    }

    // Check if already enabled
    const isEnabled = localStorage.getItem('DEBUG_AI') === 'true'
    setDebugState((prev) => ({ ...prev, isEnabled }))

    // Log component mounting if debugging is enabled
    if (isEnabled && options.monitorComponent) {
      console.log(`🧩 Component Debug: ${options.monitorComponent} mounted`)
    }

    return () => {
      if (isEnabled && options.monitorComponent) {
        console.log(`🧩 Component Debug: ${options.monitorComponent} unmounted`)
      }
    }
  }, [options.autoEnable, options.logLevel, options.monitorComponent])

  // Enable debugging
  const enableDebug = useCallback((logLevel: 'minimal' | 'detailed' | 'verbose' = 'detailed') => {
    if (clientAIDebugger) {
      clientAIDebugger.enable(logLevel)
      setDebugState((prev) => ({ ...prev, isEnabled: true }))
    }
  }, [])

  // Disable debugging
  const disableDebug = useCallback(() => {
    if (clientAIDebugger) {
      clientAIDebugger.disable()
      setDebugState((prev) => ({ ...prev, isEnabled: false }))
    }
  }, [])

  // Get current logs
  const getLogs = useCallback(() => {
    const logs = clientAIDebugger ? (clientAIDebugger as any).logs || [] : []
    setDebugState((prev) => ({ ...prev, logs }))
    return logs
  }, [])

  // Get performance stats
  const getStats = useCallback(() => {
    const stats = clientAIDebugger ? (clientAIDebugger as any).getStats?.() || null : null
    setDebugState((prev) => ({ ...prev, stats }))
    return stats
  }, [])

  // Clear debug logs
  const clearLogs = useCallback(() => {
    if (clientAIDebugger) {
      ;(clientAIDebugger as any).clearLogs?.()
      setDebugState((prev) => ({ ...prev, logs: [] }))
    }
  }, [])

  // Log custom debug message
  const logDebug = useCallback(
    (message: string, data?: any) => {
      if (debugState.isEnabled) {
        console.group(`🧩 ${options.monitorComponent || 'Component'} Debug`)
        console.log('📝 Message:', message)
        if (data) {
          console.log('📊 Data:', data)
        }
        console.log('⏰ Timestamp:', new Date().toLocaleTimeString())
        console.groupEnd()
      }
    },
    [debugState.isEnabled, options.monitorComponent]
  )

  // Track AI request from component
  const trackAIRequest = useCallback(
    async (
      requestFn: () => Promise<any>,
      context?: { subject?: string; studentLevel?: string; provider?: string }
    ) => {
      const requestId = `comp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

      if (debugState.isEnabled) {
        console.group(`🤖 ${options.monitorComponent || 'Component'} AI Request`)
        console.log('🆔 Request ID:', requestId.slice(-6))
        console.log('🎓 Context:', context)
        console.time(`⏱️ Component Request ${requestId.slice(-6)}`)
      }

      setDebugState((prev) => ({ ...prev, activeRequests: prev.activeRequests + 1 }))

      try {
        const result = await requestFn()

        if (debugState.isEnabled) {
          console.log('✅ Request completed successfully')
          console.log('📊 Result:', {
            success: result?.success,
            provider: result?.metadata?.provider,
            tokens: result?.metadata?.tokensUsed,
            cost: result?.metadata?.cost ? `$${result.metadata.cost.toFixed(4)}` : 'N/A',
          })
          console.timeEnd(`⏱️ Component Request ${requestId.slice(-6)}`)
          console.groupEnd()
        }

        setDebugState((prev) => ({ ...prev, activeRequests: prev.activeRequests - 1 }))
        return result
      } catch (error) {
        if (debugState.isEnabled) {
          console.error('❌ Request failed:', error)
          console.timeEnd(`⏱️ Component Request ${requestId.slice(-6)}`)
          console.groupEnd()
        }

        setDebugState((prev) => ({ ...prev, activeRequests: prev.activeRequests - 1 }))
        throw error
      }
    },
    [debugState.isEnabled, options.monitorComponent]
  )

  return {
    // State
    isEnabled: debugState.isEnabled,
    logs: debugState.logs,
    stats: debugState.stats,
    activeRequests: debugState.activeRequests,

    // Actions
    enable: enableDebug,
    disable: disableDebug,
    getLogs,
    getStats,
    clearLogs,
    logDebug,
    trackAIRequest,
  }
}

// Utility hook for quick debug logging
export function useDebugLog(componentName: string) {
  const { logDebug, isEnabled } = useAIDebug({ monitorComponent: componentName })

  return useCallback(
    (message: string, data?: any) => {
      if (isEnabled) {
        logDebug(message, data)
      }
    },
    [logDebug, isEnabled]
  )
}
