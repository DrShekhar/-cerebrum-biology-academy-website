'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, MessageCircle, X } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/constants/contactInfo'

interface Props {
  children: ReactNode
  onClose?: () => void
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorId: string
  retryCount: number
}

/**
 * Error boundary specifically designed for the ARIA sales agent widget.
 * Provides a compact, friendly fallback UI that matches the chat widget style.
 * Offers WhatsApp as a fallback communication channel when the widget fails.
 */
export class AriaErrorBoundary extends Component<Props, State> {
  private maxRetries = 2

  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorId: '',
      retryCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `aria_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ARIA Error Boundary]', {
      errorId: this.state.errorId,
      error: error.message,
      stack: error.stack?.substring(0, 500),
      componentStack: errorInfo.componentStack?.substring(0, 300),
      timestamp: new Date().toISOString(),
    })

    this.props.onError?.(error, errorInfo)
  }

  private handleRetry = () => {
    if (this.state.retryCount >= this.maxRetries) {
      return
    }

    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryCount: prev.retryCount + 1,
    }))
  }

  private handleWhatsAppFallback = () => {
    const message = `Hi! I was trying to use the ARIA chat on your website but encountered an error (ID: ${this.state.errorId}). Can you help me with my NEET Biology queries?`
    window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  }

  private handleClose = () => {
    this.props.onClose?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden w-[360px] max-w-[95vw] h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium text-sm">ARIA - Error</span>
            </div>
            {this.props.onClose && (
              <button
                onClick={this.handleClose}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Error Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Oops! Something went wrong
            </h3>

            <p className="text-slate-600 text-sm mb-6 max-w-[280px]">
              ARIA is temporarily unavailable. Don't worry - you can still reach us on WhatsApp!
            </p>

            <div className="flex flex-col gap-3 w-full max-w-[240px]">
              {/* WhatsApp Fallback - Primary CTA */}
              <button
                onClick={this.handleWhatsAppFallback}
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </button>

              {/* Retry Button */}
              {this.state.retryCount < this.maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again ({this.maxRetries - this.state.retryCount} left)</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-400 mt-6">Error ID: {this.state.errorId}</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Fallback component for when ARIA fails to load (e.g., network issues, lazy load failure).
 * This is a functional component for use outside the error boundary.
 */
export function AriaLoadingFallback({
  onRetry,
  onClose,
}: {
  onRetry?: () => void
  onClose?: () => void
}) {
  const handleWhatsApp = () => {
    const message =
      'Hi! I want to know more about NEET Biology courses at Cerebrum Biology Academy.'
    window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden w-[360px] max-w-[95vw] h-[500px] max-h-[80vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center animate-pulse">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <span className="text-white font-medium text-sm">ARIA - Loading...</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Loading Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin mb-4" />

        <h3 className="text-lg font-semibold text-slate-800 mb-2">Loading ARIA...</h3>

        <p className="text-slate-600 text-sm mb-6 max-w-[280px]">
          Taking longer than expected? Chat with us on WhatsApp instead!
        </p>

        <div className="flex flex-col gap-3 w-full max-w-[240px]">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </button>

          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Loading</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AriaErrorBoundary
