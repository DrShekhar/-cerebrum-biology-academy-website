import { unstable_cache } from 'next/cache'

interface CacheOptions {
  revalidate?: number // seconds
  tags?: string[]
}

/**
 * Creates a cached query function with Next.js 15 unstable_cache
 * @param queryFn - The async function to cache
 * @param options - Cache configuration options
 * @returns Cached version of the query function
 */
export function createCachedQuery<T>(queryFn: () => Promise<T>, options: CacheOptions) {
  return unstable_cache(queryFn, options.tags || [], {
    revalidate: options.revalidate || 300, // 5 min default
    tags: options.tags || [],
  })
}

/**
 * Predefined cache strategies for common use cases
 * Optimized for different types of data freshness requirements
 */
export const cacheStrategies = {
  // Dashboard data - moderate freshness (5 minutes)
  dashboard: {
    revalidate: 300,
    tags: ['dashboard'],
  },

  // Test data - high freshness (1 minute)
  test: {
    revalidate: 60,
    tags: ['test'],
  },

  // Progress data - moderate freshness (3 minutes)
  progress: {
    revalidate: 180,
    tags: ['progress'],
  },

  // Static content - low freshness (1 hour)
  static: {
    revalidate: 3600,
    tags: ['static'],
  },

  // Analytics data - moderate freshness (5 minutes)
  analytics: {
    revalidate: 300,
    tags: ['analytics'],
  },

  // User profile - moderate freshness (2 minutes)
  profile: {
    revalidate: 120,
    tags: ['profile'],
  },

  // Leaderboard - high freshness (30 seconds for competitive data)
  leaderboard: {
    revalidate: 30,
    tags: ['leaderboard'],
  },
}

/**
 * Invalidates cache by tags
 * Use this after data mutations to ensure fresh data
 * @param tags - Array of cache tags to invalidate
 */
export async function invalidateCache(tags: string[]) {
  const { revalidateTag } = await import('next/cache')
  tags.forEach((tag) => revalidateTag(tag))
}

/**
 * Invalidates all dashboard-related caches
 * Convenience function for common invalidation pattern
 */
export async function invalidateDashboardCache() {
  await invalidateCache(['dashboard', 'analytics', 'progress', 'profile'])
}

/**
 * Invalidates test-related caches
 * Use after test submission or creation
 */
export async function invalidateTestCache() {
  await invalidateCache(['test', 'progress', 'analytics'])
}

/**
 * Revalidates cache by path
 * Use for page-level revalidation
 * @param path - The path to revalidate (e.g., '/dashboard/student')
 */
export async function revalidatePath(path: string) {
  const { revalidatePath: nextRevalidatePath } = await import('next/cache')
  nextRevalidatePath(path)
}
