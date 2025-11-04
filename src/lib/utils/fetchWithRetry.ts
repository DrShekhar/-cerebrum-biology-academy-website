/**
 * Retry Utility for API Calls
 * Implements exponential backoff retry logic for failed requests
 */

export interface RetryOptions {
  maxRetries?: number
  initialDelayMs?: number
  maxDelayMs?: number
  backoffMultiplier?: number
  retryOn?: (error: any, response?: Response) => boolean
  onRetry?: (attempt: number, error: any) => void
}

export interface FetchWithRetryOptions extends RequestInit {
  retryOptions?: RetryOptions
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
  retryOn: (error: any, response?: Response) => {
    if (response) {
      if (response.status === 429) return true
      if (response.status >= 500) return true
      return false
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true
    }
    return true
  },
  onRetry: (attempt: number, error: any) => {
    console.log(`Retry attempt ${attempt} after error:`, error)
  },
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

export async function fetchWithRetry(
  url: string,
  options?: FetchWithRetryOptions
): Promise<Response> {
  const { retryOptions, ...fetchOptions } = options || {}
  const config = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions }

  let lastError: any
  let lastResponse: Response | undefined

  for (let attempt = 0; attempt < config.maxRetries; attempt++) {
    try {
      const response = await fetch(url, fetchOptions)

      if (response.ok || !config.retryOn(null, response)) {
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
        throw error
      }

      if (!config.retryOn(error)) {
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

  throw lastError || new Error('Max retries reached')
}

export function createRetryConfig(overrides?: Partial<RetryOptions>): RetryOptions {
  return {
    ...DEFAULT_RETRY_OPTIONS,
    ...overrides,
  }
}

export async function fetchWithRetryAndTimeout(
  url: string,
  options?: FetchWithRetryOptions & { timeout?: number }
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options || {}

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetchWithRetry(url, {
      ...fetchOptions,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export class RetryableError extends Error {
  constructor(
    message: string,
    public readonly cause?: any,
    public readonly response?: Response
  ) {
    super(message)
    this.name = 'RetryableError'
  }
}
