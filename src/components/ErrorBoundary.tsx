'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { Button } from '@/components/ui/Button'
import { logger } from '@/lib/utils/logger'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void; errorId?: string | null }>
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void
  resetKeys?: any[]
  name?: string
}

const DefaultErrorFallback = ({
  error,
  resetError,
  errorId,
}: {
  error?: Error
  resetError: () => void
  errorId?: string | null
}) => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4 max-w-md">
          An unexpected error occurred while loading this section. Please try again.
        </p>
        {errorId && (
          <p className="text-xs text-gray-400 mb-4">
            Reference: <code className="font-mono">{errorId}</code>
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <Button onClick={resetError} variant="primary">
          Try Again
        </Button>
        <Button onClick={() => (window.location.href = '/')} variant="secondary">
          Go Home
        </Button>
      </div>

      {isDevelopment && error && (
        <details className="mt-6 text-left max-w-2xl w-full">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
            Error Details (Development Only)
          </summary>
          <div className="text-xs bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <p className="font-mono text-red-600 mb-2">{error.toString()}</p>
            {error.stack && (
              <pre className="font-mono text-gray-700 whitespace-pre-wrap">{error.stack}</pre>
            )}
          </div>
        </details>
      )}
    </div>
  )
}

function generateBoundaryErrorId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `ERR-${timestamp}-${random}`.toUpperCase()
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = generateBoundaryErrorId()
    return { hasError: true, error, errorId }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = this.state.errorId || generateBoundaryErrorId()

    logger.error(`Error Boundary: ${this.props.name || 'Unknown'}`, {
      errorId,
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    })

    if (typeof window !== 'undefined') {
      import('@sentry/nextjs')
        .then((Sentry) => {
          Sentry.captureException(error, {
            contexts: {
              react: {
                componentStack: errorInfo.componentStack,
              },
            },
            tags: {
              errorBoundary: this.props.name || 'unknown',
              errorId,
            },
          })
        })
        .catch(() => {
          // Sentry not available, continue
        })

      try {
        fetch('/api/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            errorId,
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            boundary: this.props.name || 'unknown',
            url: window.location.href,
            userAgent: window.navigator.userAgent,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {})
      } catch {
        // Silent fail for error reporting
      }
    }

    if (this.props.onError) {
      this.props.onError(error, errorInfo, errorId)
    }

    this.setState({
      errorInfo,
      errorId,
    })
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Reset error boundary if resetKeys change
    if (this.state.hasError && this.props.resetKeys) {
      const hasResetKeyChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      )

      if (hasResetKeyChanged) {
        this.resetError()
      }
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error || undefined}
          resetError={this.resetError}
          errorId={this.state.errorId}
        />
      )
    }

    return this.props.children
  }
}

/**
 * Specialized Error Boundaries for different contexts
 */

export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      name="PageErrorBoundary"
      fallback={({ error, resetError, errorId }) => {
        const isDevelopment = process.env.NODE_ENV === 'development'

        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <div className="max-w-lg w-full text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h1>
                <p className="text-gray-600 mb-4">
                  We encountered an unexpected error while loading this page. This has been
                  automatically reported to our team.
                </p>
                <div className="bg-gray-100 rounded-lg px-4 py-2 inline-block mb-6">
                  <p className="text-sm text-gray-500">
                    Reference ID: <code className="font-mono text-gray-700">{errorId}</code>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <Button onClick={resetError} variant="primary">
                  Try Again
                </Button>
                <Button onClick={() => window.location.reload()} variant="secondary">
                  Reload Page
                </Button>
                <Button onClick={() => (window.location.href = '/')} variant="secondary">
                  Go Home
                </Button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500 mb-2">
                  Still having trouble? Contact us at{' '}
                  <a
                    href="mailto:support@cerebrumbiologyacademy.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@cerebrumbiologyacademy.com
                  </a>
                </p>
                <p className="text-xs text-gray-400">
                  Please include the Reference ID above when contacting support.
                </p>
              </div>

              {isDevelopment && error && (
                <details className="mt-6 text-left bg-red-50 rounded-lg p-4">
                  <summary className="cursor-pointer text-sm font-medium text-red-800 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="text-xs bg-white p-3 rounded border border-red-200 overflow-x-auto">
                    <p className="font-mono text-red-600 mb-2 break-words">{error.toString()}</p>
                    {error.stack && (
                      <pre className="font-mono text-gray-700 whitespace-pre-wrap text-xs">
                        {error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        )
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export function ComponentErrorBoundary({ children, name }: { children: ReactNode; name?: string }) {
  return (
    <ErrorBoundary
      name={`Component: ${name || 'unknown'}`}
      fallback={({ error, resetError }) => (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-sm font-medium text-red-800">Failed to load {name || 'component'}</p>
          </div>
          <Button onClick={resetError} variant="secondary" className="text-xs">
            Retry
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

export function APIErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      name="APIErrorBoundary"
      fallback={({ resetError }) => (
        <div className="p-6 text-center bg-yellow-50 rounded-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Connection Error</h3>
          <p className="text-gray-600 mb-4">Unable to fetch data from server</p>
          <Button onClick={resetError} variant="primary">
            Retry
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
