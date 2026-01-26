'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, MessageCircle, Phone } from 'lucide-react'
import { clientAIDebugger } from '@/lib/ai/clientDebugger'
import { AIDebugger } from '@/lib/ai/aiDebugger'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDebugInfo?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
  retryCount: number
}

export class AIErrorBoundary extends Component<Props, State> {
  private maxRetries = 3
  private retryTimeout: NodeJS.Timeout | null = null

  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `ai_error_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to our AI debugging system
    console.group('🚨 AI Error Boundary Caught Error')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.groupEnd()

    // Use our enhanced AI debugger for analysis
    const analysis = AIDebugger.analyzeError(error, {
      provider: 'ai_component',
      model: 'error_boundary',
      requestId: this.state.errorId,
    })

    // Log to client debugger if available
    if (typeof window !== 'undefined' && clientAIDebugger) {
      clientAIDebugger.enable?.('detailed')
    }

    this.setState({
      error,
      errorInfo,
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // Report to analytics or error tracking service
    this.reportError(error, errorInfo, analysis)
  }

  private reportError = (error: Error, errorInfo: ErrorInfo, analysis: any) => {
    try {
      // Log to console for development
      console.log('📊 AI Error Report:', {
        errorId: this.state.errorId,
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        analysis,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      })

      // In production, you could send this to your analytics service
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to your error tracking service
        // errorTrackingService.captureException(error, { extra: { analysis, errorId: this.state.errorId } })
      }
    } catch (reportingError) {
      console.error('Failed to report AI error:', reportingError)
    }
  }

  private handleRetry = () => {
    if (this.state.retryCount >= this.maxRetries) {
      console.warn('Max retry attempts reached for AI component')
      return
    }

    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }))

    // Add slight delay before retry to prevent immediate re-error
    this.retryTimeout = setTimeout(() => {
      this.forceUpdate()
    }, 1000)
  }

  private handleContactSupport = () => {
    const subject = encodeURIComponent(`AI System Error - ${this.state.errorId}`)
    const body = encodeURIComponent(`
Error ID: ${this.state.errorId}
Error Message: ${this.state.error?.message || 'Unknown error'}
Time: ${new Date().toISOString()}
URL: ${window.location.href}

Please help resolve this AI system issue.
    `)

    window.location.href = `mailto:support@cerebrumbiologyacademy.com?subject=${subject}&body=${body}`
  }

  private handleFallbackChat = () => {
    // Redirect to alternative support or contact method
    window.location.href = '/support/contact'
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }
  }

  render() {
    if (this.state.hasError) {
      // Show custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-6 bg-red-50 border-2 border-red-200 rounded-xl max-w-md mx-auto"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          </motion.div>

          <h2 className="text-xl font-bold text-red-800 mb-2 text-center">
            AI System Temporarily Unavailable
          </h2>

          <p className="text-red-600 text-center mb-4 text-sm">
            Our AI assistant encountered an unexpected error. Don't worry - we're here to help!
          </p>

          {this.props.showDebugInfo && this.state.error && (
            <motion.details
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full mb-4 p-3 bg-red-100 rounded border text-xs"
            >
              <summary className="cursor-pointer font-medium text-red-700">
                Technical Details (Click to expand)
              </summary>
              <div className="mt-2 text-red-600 font-mono text-xs overflow-auto max-h-32">
                <div className="mb-2">
                  <strong>Error ID:</strong> {this.state.errorId}
                </div>
                <div className="mb-2">
                  <strong>Message:</strong> {this.state.error.message}
                </div>
                <div className="mb-2">
                  <strong>Retry Count:</strong> {this.state.retryCount}/{this.maxRetries}
                </div>
                {this.state.error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap text-xs">
                      {this.state.error.stack.substring(0, 300)}...
                    </pre>
                  </div>
                )}
              </div>
            </motion.details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {this.state.retryCount < this.maxRetries && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleRetry}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleFallbackChat}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Support</span>
            </motion.button>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={this.handleContactSupport}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 mt-3 text-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Email Error Report</span>
          </motion.button>

          <div className="mt-4 text-xs text-red-500 text-center">
            <p>Error ID: {this.state.errorId}</p>
            <p>Time: {new Date().toLocaleString()}</p>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useAIErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    console.error('AI Hook Error:', error)

    // Analyze error
    const analysis = AIDebugger.analyzeError(error, {
      provider: 'ai_hook',
      model: 'error_handler',
      requestId: `hook_${Date.now()}`,
    })

    setError(error)

    // Auto-clear error after 5 seconds
    setTimeout(() => setError(null), 5000)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}

// Error boundary wrapper for AI components
export function withAIErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<Props>
) {
  const WrappedComponent = (props: P) => (
    <AIErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </AIErrorBoundary>
  )

  WrappedComponent.displayName = `withAIErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}

export default AIErrorBoundary
