'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { AIErrorBoundary } from '@/components/ai/AIErrorBoundary'
import { ErrorInfo } from 'react'

interface AIErrorContextType {
  reportError: (error: Error, context?: any) => void
  isProduction: boolean
  debugMode: boolean
}

const AIErrorContext = createContext<AIErrorContextType | undefined>(undefined)

interface AIErrorProviderProps {
  children: ReactNode
  debugMode?: boolean
  enableReporting?: boolean
  fallback?: ReactNode
}

export function AIErrorProvider({
  children,
  debugMode = process.env.NODE_ENV === 'development',
  enableReporting = true,
  fallback,
}: AIErrorProviderProps) {
  const isProduction = process.env.NODE_ENV === 'production'

  const reportError = (error: Error, context?: any) => {
    console.error('AI System Error:', error, context)

    if (enableReporting && isProduction) {
      // In production, send to error tracking service
      // Example: Sentry, LogRocket, or custom analytics
      try {
        // errorTrackingService.captureException(error, { extra: context })
      } catch (reportingError) {
        console.error('Failed to report error:', reportingError)
      }
    }
  }

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    reportError(error, { errorInfo, component: 'AIErrorBoundary' })
  }

  const contextValue: AIErrorContextType = {
    reportError,
    isProduction,
    debugMode,
  }

  return (
    <AIErrorContext.Provider value={contextValue}>
      <AIErrorBoundary onError={handleError} showDebugInfo={debugMode} fallback={fallback}>
        {children}
      </AIErrorBoundary>
    </AIErrorContext.Provider>
  )
}

export function useAIError() {
  const context = useContext(AIErrorContext)
  if (context === undefined) {
    throw new Error('useAIError must be used within an AIErrorProvider')
  }
  return context
}

// HOC to wrap components with AI error boundary
export function withAIErrorProtection<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: ReactNode
    debugMode?: boolean
  }
) {
  const ProtectedComponent = (props: P) => (
    <AIErrorProvider debugMode={options?.debugMode} fallback={options?.fallback}>
      <Component {...props} />
    </AIErrorProvider>
  )

  ProtectedComponent.displayName = `withAIErrorProtection(${
    Component.displayName || Component.name
  })`

  return ProtectedComponent
}

export default AIErrorProvider
