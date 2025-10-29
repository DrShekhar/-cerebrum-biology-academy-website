'use client'

import React, { Component, ReactNode } from 'react'
import { logError, ErrorContext, ErrorSeverity } from '@/lib/errors'
import { ErrorFallback } from './ErrorFallback'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  context?: Partial<ErrorContext>
  severity?: ErrorSeverity
  showDetails?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { context, severity = 'normal', onError } = this.props

    const errorContext: ErrorContext = {
      ...context,
      severity,
      component: errorInfo.componentStack?.split('\n')[1]?.trim() || 'Unknown',
      timestamp: new Date().toISOString(),
    }

    logError(error, errorContext)

    this.setState({ errorInfo })

    if (onError) {
      onError(error, errorInfo)
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    const { hasError, error } = this.state
    const { children, fallback, showDetails = false } = this.props

    if (hasError && error) {
      if (typeof fallback === 'function') {
        return fallback(error, this.resetErrorBoundary)
      }

      if (fallback) {
        return fallback
      }

      return (
        <ErrorFallback
          error={error}
          reset={this.resetErrorBoundary}
          showDetails={showDetails}
          context={this.props.context}
        />
      )
    }

    return children
  }
}
