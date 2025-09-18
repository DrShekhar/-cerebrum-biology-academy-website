'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react'
import { logError } from '@/lib/errors'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  level?: 'page' | 'section' | 'component'
  showErrorDetails?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string | null
}

export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0
  private maxRetries = 3

  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    this.setState({
      error,
      errorInfo,
      errorId,
    })

    logError(error, {
      errorBoundary: true,
      level: this.props.level || 'component',
      errorId,
      retryCount: this.retryCount,
      componentStack: errorInfo.componentStack,
      errorInfo,
    })

    if (process.env.NODE_ENV === 'production') {
      // In production, we could send to monitoring service
      console.error('ErrorBoundary caught an error:', {
        errorId,
        message: error.message,
        level: this.props.level,
      })
    }
  }

  handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: null,
      })
    }
  }

  handleReset = () => {
    this.retryCount = 0
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          level={this.props.level || 'component'}
          onRetry={this.handleRetry}
          onReset={this.handleReset}
          canRetry={this.retryCount < this.maxRetries}
          retryCount={this.retryCount}
          showErrorDetails={this.props.showErrorDetails}
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string | null
  level: 'page' | 'section' | 'component'
  onRetry: () => void
  onReset: () => void
  canRetry: boolean
  retryCount: number
  showErrorDetails?: boolean
}

function ErrorFallback({
  error,
  errorInfo,
  errorId,
  level,
  onRetry,
  onReset,
  canRetry,
  retryCount,
  showErrorDetails = false,
}: ErrorFallbackProps) {
  const isPageLevel = level === 'page'
  const isProduction = process.env.NODE_ENV === 'production'

  if (level === 'component') {
    return (
      <div className="p-4 border-2 border-red-200 bg-red-50 rounded-lg">
        <div className="flex items-center space-x-2 text-red-700 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Component Error</span>
        </div>
        <p className="text-red-600 text-sm mb-3">
          Something went wrong with this component. Please try refreshing.
        </p>
        {canRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="text-red-700 border-red-300 hover:bg-red-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry ({retryCount + 1}/{3})
          </Button>
        )}
      </div>
    )
  }

  if (level === 'section') {
    return (
      <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Section Unavailable</h3>
          <p className="text-red-600 mb-4">
            This section encountered an error and couldn't load properly.
          </p>
          <div className="flex justify-center space-x-3">
            {canRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                className="text-red-700 border-red-300 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="text-red-700 border-red-300 hover:bg-red-100"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Page level error
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>

        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Our team has been notified and we're
          working to fix this issue.
        </p>

        {errorId && (
          <div className="bg-gray-100 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600">
              Error ID: <code className="font-mono text-gray-800">{errorId}</code>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {canRetry && (
            <Button
              variant="primary"
              onClick={onRetry}
              className="flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => (window.location.href = '/')}
            className="flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = '/contact')}
            className="flex items-center justify-center"
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>

        {/* Error details for development */}
        {!isProduction && showErrorDetails && error && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <div className="bg-gray-100 rounded-lg p-4 overflow-auto">
              <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                <strong>Error:</strong> {error.message}
                {'\n\n'}
                <strong>Stack:</strong> {error.stack}
                {errorInfo && '\n\n'}
                <strong>Component Stack:</strong> {errorInfo?.componentStack}
              </pre>
            </div>
          </details>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Still having issues? Contact us at{' '}
            <a
              href="mailto:support@cerebrumbiologyacademy.com"
              className="text-blue-600 hover:underline"
            >
              support@cerebrumbiologyacademy.com
            </a>{' '}
            or call{' '}
            <a href="tel:+918826444334" className="text-blue-600 hover:underline">
              +91 88264 44334
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// Specialized error boundaries for specific use cases

export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary level="page" showErrorDetails={process.env.NODE_ENV === 'development'}>
      {children}
    </ErrorBoundary>
  )
}

export function SectionErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <ErrorBoundary level="section" fallback={fallback}>
      {children}
    </ErrorBoundary>
  )
}

export function ComponentErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <ErrorBoundary level="component" fallback={fallback}>
      {children}
    </ErrorBoundary>
  )
}
