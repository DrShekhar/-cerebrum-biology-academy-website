/**
 * INP (Interaction to Next Paint) Optimization Utilities
 *
 * These utilities help reduce interaction latency by:
 * 1. Yielding to main thread between heavy operations
 * 2. Deferring non-critical work
 * 3. Breaking up long tasks
 */

/**
 * Yields to the main thread to allow rendering and other high-priority tasks
 * Uses scheduler.yield() if available (Chrome 115+), falls back to setTimeout
 */
export async function yieldToMain(): Promise<void> {
  if ('scheduler' in globalThis && 'yield' in (globalThis as any).scheduler) {
    return (globalThis as any).scheduler.yield()
  }
  return new Promise((resolve) => setTimeout(resolve, 0))
}

/**
 * Runs a task with automatic yielding for better INP
 * Breaks up long tasks by yielding after each chunk
 */
export async function runWithYielding<T>(
  tasks: Array<() => T | Promise<T>>,
  options: { yieldAfterMs?: number } = {}
): Promise<T[]> {
  const { yieldAfterMs = 50 } = options
  const results: T[] = []
  let lastYield = performance.now()

  for (const task of tasks) {
    const result = await task()
    results.push(result)

    const elapsed = performance.now() - lastYield
    if (elapsed > yieldAfterMs) {
      await yieldToMain()
      lastYield = performance.now()
    }
  }

  return results
}

/**
 * Defers a callback to run during idle time
 * Falls back to setTimeout if requestIdleCallback is not available
 */
export function runWhenIdle(callback: () => void, options?: IdleRequestOptions): number {
  if (typeof requestIdleCallback !== 'undefined') {
    return requestIdleCallback(callback, options)
  }
  return setTimeout(callback, 1) as unknown as number
}

/**
 * Cancels a deferred idle callback
 */
export function cancelIdleRun(id: number): void {
  if (typeof cancelIdleCallback !== 'undefined') {
    cancelIdleCallback(id)
  } else {
    clearTimeout(id)
  }
}

/**
 * Creates an interaction-optimized click handler
 * Yields to main thread before running the handler for better INP
 */
export function createOptimizedHandler<T extends (...args: any[]) => any>(
  handler: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // Yield to allow visual feedback first
    await yieldToMain()
    return handler(...args)
  }
}

/**
 * Debounces a function with optional leading edge execution
 * Useful for scroll/resize handlers that can impact INP
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  options: { leading?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  const { leading = false } = options

  return function (...args: Parameters<T>) {
    lastArgs = args

    if (timeoutId === null && leading) {
      fn(...args)
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      if (lastArgs && !leading) {
        fn(...lastArgs)
      }
      timeoutId = null
    }, wait)
  }
}

/**
 * Throttles a function using requestAnimationFrame
 * Better for scroll/resize than time-based throttling
 */
export function throttleRAF<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null
  let lastArgs: Parameters<T> | null = null

  return function (...args: Parameters<T>) {
    lastArgs = args

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          fn(...lastArgs)
        }
        rafId = null
      })
    }
  }
}

/**
 * Hook-friendly wrapper for running non-critical effects
 * Use in useEffect to defer heavy initialization
 */
export function deferredEffect(effect: () => void | (() => void)): () => void {
  let cleanup: void | (() => void)
  const idleId = runWhenIdle(() => {
    cleanup = effect()
  }, { timeout: 1000 })

  return () => {
    cancelIdleRun(idleId)
    if (typeof cleanup === 'function') {
      cleanup()
    }
  }
}
