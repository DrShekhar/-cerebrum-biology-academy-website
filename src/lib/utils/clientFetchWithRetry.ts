/**
 * Client-side Retry Utility for API Calls
 * To be used in React components for making API requests with automatic retry
 */

export interface ClientRetryOptions {
  maxRetries?: number
  initialDelayMs?: number
  maxDelayMs?: number
  backoffMultiplier?: number
  onRetry?: (attempt: number, error: any) => void
  onError?: (error: any) => void
}

const DEFAULT_CLIENT_RETRY_OPTIONS: Required<Omit<ClientRetryOptions, 'onRetry' | 'onError'>> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function calculateBackoffDelay(
  attempt: number,
  initialDelay: number,
  multiplier: number,
  maxDelay: number
): number {
  const exponentialDelay = initialDelay * Math.pow(multiplier, attempt - 1)
  return Math.min(exponentialDelay, maxDelay)
}

function shouldRetry(error: any, response?: Response): boolean {
  if (response) {
    if (response.status === 429) return true
    if (response.status >= 500) return true
    return false
  }

  if (error instanceof TypeError) {
    return true
  }

  if (error.name === 'AbortError') return false

  return true
}

export async function clientFetchWithRetry(
  url: string,
  options?: RequestInit & { retryOptions?: ClientRetryOptions }
): Promise<Response> {
  const { retryOptions, ...fetchOptions } = options || {}
  const config = {
    ...DEFAULT_CLIENT_RETRY_OPTIONS,
    ...retryOptions,
  }

  let lastError: any
  let lastResponse: Response | undefined

  for (let attempt = 0; attempt < config.maxRetries; attempt++) {
    try {
      const response = await fetch(url, fetchOptions)

      if (response.ok || !shouldRetry(null, response)) {
        return response
      }

      lastResponse = response.clone()

      if (attempt === config.maxRetries - 1) {
        return response
      }

      if (config.onRetry) {
        config.onRetry(attempt + 1, new Error(`HTTP ${response.status}: ${response.statusText}`))
      }

      const delayMs = calculateBackoffDelay(
        attempt + 1,
        config.initialDelayMs,
        config.backoffMultiplier,
        config.maxDelayMs
      )
      await delay(delayMs)
    } catch (error) {
      lastError = error

      if (attempt === config.maxRetries - 1) {
        if (config.onError) {
          config.onError(error)
        }
        throw error
      }

      if (!shouldRetry(error)) {
        if (config.onError) {
          config.onError(error)
        }
        throw error
      }

      if (config.onRetry) {
        config.onRetry(attempt + 1, error)
      }

      const delayMs = calculateBackoffDelay(
        attempt + 1,
        config.initialDelayMs,
        config.backoffMultiplier,
        config.maxDelayMs
      )
      await delay(delayMs)
    }
  }

  if (lastResponse) {
    return lastResponse
  }

  const finalError = lastError || new Error('Max retries reached')
  if (config.onError) {
    config.onError(finalError)
  }
  throw finalError
}

export function useApiWithRetry() {
  const fetchWithRetry = async (
    url: string,
    options?: RequestInit & { retryOptions?: ClientRetryOptions }
  ) => {
    return clientFetchWithRetry(url, {
      ...options,
      retryOptions: {
        ...options?.retryOptions,
        onRetry: (attempt, error) => {
          console.log(`[API Retry] Attempt ${attempt}:`, error.message || error)
          options?.retryOptions?.onRetry?.(attempt, error)
        },
      },
    })
  }

  return { fetchWithRetry }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: Response
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
