'use client'

import { useCallback } from 'react'
import { logError } from '@/lib/errors'

interface ErrorDetails {
  action?: string
  component?: string
  userId?: string
  severity?: string
  additional?: Record<string, any>
}

export function useErrorHandler() {
  const handleError = useCallback((error: Error, details?: ErrorDetails) => {
    logError(error, {
      ...details,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      timestamp: new Date().toISOString(),
      source: 'useErrorHandler',
    })
  }, [])

  const handleAsyncError = useCallback(
    async (asyncOperation: () => Promise<any>, details?: ErrorDetails) => {
      try {
        return await asyncOperation()
      } catch (error) {
        if (error instanceof Error) {
          handleError(error, details)
        } else {
          handleError(new Error(String(error)), details)
        }
        throw error
      }
    },
    [handleError]
  )

  const safeAsyncOperation = useCallback(
    async <T>(
      asyncOperation: () => Promise<T>,
      fallbackValue: T,
      details?: ErrorDetails
    ): Promise<T> => {
      try {
        return await asyncOperation()
      } catch (error) {
        if (error instanceof Error) {
          handleError(error, { ...details, severity: 'warning' })
        } else {
          handleError(new Error(String(error)), { ...details, severity: 'warning' })
        }
        return fallbackValue
      }
    },
    [handleError]
  )

  return {
    handleError,
    handleAsyncError,
    safeAsyncOperation,
  }
}

// Hook for handling form submission errors
export function useFormErrorHandler() {
  const { handleError } = useErrorHandler()

  const handleFormError = useCallback(
    (error: Error, formName: string, formData?: Record<string, any>) => {
      handleError(error, {
        action: 'form_submission',
        component: formName,
        additional: {
          formData: formData ? Object.keys(formData) : undefined, // Only log field names, not values
        },
      })
    },
    [handleError]
  )

  return { handleFormError }
}

// Hook for handling API errors
export function useApiErrorHandler() {
  const { handleError } = useErrorHandler()

  const handleApiError = useCallback(
    (error: Error, endpoint: string, method: string = 'GET', status?: number) => {
      handleError(error, {
        action: 'api_request',
        additional: {
          endpoint,
          method,
          status,
        },
      })
    },
    [handleError]
  )

  return { handleApiError }
}
