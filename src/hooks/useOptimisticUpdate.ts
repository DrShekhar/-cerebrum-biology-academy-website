import { useState, useCallback, useRef } from 'react'

interface OptimisticUpdateOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  rollbackDelay?: number
}

interface OptimisticState<T> {
  data: T
  isLoading: boolean
  isOptimistic: boolean
  error: Error | null
}

/**
 * Custom hook for optimistic UI updates
 * Provides instant feedback before server confirmation
 *
 * @example
 * const { data, update, isLoading, isOptimistic } = useOptimisticUpdate(initialData)
 *
 * await update(
 *   newValue,
 *   async () => api.updateData(newValue)
 * )
 */
export function useOptimisticUpdate<T>(initialData: T, options: OptimisticUpdateOptions<T> = {}) {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isLoading: false,
    isOptimistic: false,
    error: null,
  })

  const serverDataRef = useRef<T>(initialData)
  const rollbackTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const update = useCallback(
    async (optimisticValue: T | ((current: T) => T), serverUpdate: () => Promise<T>) => {
      // Clear any pending rollback
      if (rollbackTimerRef.current) {
        clearTimeout(rollbackTimerRef.current)
      }

      // Calculate optimistic value
      const newValue =
        typeof optimisticValue === 'function'
          ? (optimisticValue as (current: T) => T)(state.data)
          : optimisticValue

      // Store current server data for rollback
      serverDataRef.current = state.data

      // Apply optimistic update immediately
      setState({
        data: newValue,
        isLoading: true,
        isOptimistic: true,
        error: null,
      })

      try {
        // Perform server request
        const serverResponse = await serverUpdate()

        // Update with server response
        setState({
          data: serverResponse,
          isLoading: false,
          isOptimistic: false,
          error: null,
        })

        serverDataRef.current = serverResponse
        options.onSuccess?.(serverResponse)

        return serverResponse
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Update failed')

        // Rollback to previous server state
        setState({
          data: serverDataRef.current,
          isLoading: false,
          isOptimistic: false,
          error: err,
        })

        options.onError?.(err)
        throw err
      }
    },
    [state.data, options]
  )

  const reset = useCallback(() => {
    setState({
      data: serverDataRef.current,
      isLoading: false,
      isOptimistic: false,
      error: null,
    })
  }, [])

  return {
    data: state.data,
    isLoading: state.isLoading,
    isOptimistic: state.isOptimistic,
    error: state.error,
    update,
    reset,
  }
}
