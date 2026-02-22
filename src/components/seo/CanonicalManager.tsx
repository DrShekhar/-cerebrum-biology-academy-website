/**
 * CanonicalManager - Auto-generates canonical URLs for all pages
 * Client component that normalizes URLs and prevents duplicate content issues
 *
 * Features:
 * - Automatic canonical URL generation
 * - URL normalization (removes trailing slashes, lowercases, removes tracking params)
 * - Self-referential canonical for proper indexing
 * - Handles parameter variations that should resolve to same content
 * - Next.js 15 compatible with App Router
 *
 * SEO Impact:
 * - Prevents duplicate content issues in Google Search Console
 * - Consolidates link equity to single URL
 * - Improves crawl efficiency by reducing crawl budget waste
 * - Works with HTTP/HTTPS and www/non-www variations
 *
 * Usage:
 * Add to any page layout or use in root layout:
 * <CanonicalManager />
 */

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface CanonicalManagerProps {
  /**
   * Optional override for canonical URL
   * If provided, this will be used instead of auto-generated
   */
  overrideCanonical?: string

  /**
   * Query parameters to exclude from canonical URL
   * By default, excludes common tracking params: utm_*, gclid, fbclid
   */
  excludeParams?: string[]

  /**
   * Whether to include trailing slash
   * Default: false (removes trailing slash)
   */
  includeTrailingSlash?: boolean

  /**
   * Custom domain for canonical
   * Default: https://cerebrumbiologyacademy.com
   */
  domain?: string
}

/**
 * Normalize URL by removing common tracking parameters
 */
function normalizeUrl(
  pathname: string,
  searchParams: URLSearchParams,
  excludeParams: string[] = [],
  includeTrailingSlash: boolean = false
): string {
  // Default params to exclude (tracking & analytics)
  const defaultExcludeParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'ms_clkid', '_ga']

  const paramsToExclude = [...defaultExcludeParams, ...excludeParams]

  // Build clean query string
  const cleanParams = new URLSearchParams()
  searchParams.forEach((value, key) => {
    if (!paramsToExclude.includes(key)) {
      cleanParams.append(key, value)
    }
  })

  // Build normalized path
  let normalizedPath = pathname.toLowerCase()

  // Remove trailing slash unless specified
  if (!includeTrailingSlash && normalizedPath.endsWith('/') && normalizedPath !== '/') {
    normalizedPath = normalizedPath.slice(0, -1)
  }

  // Add query string if params exist
  const queryString = cleanParams.toString()
  if (queryString) {
    return `${normalizedPath}?${queryString}`
  }

  return normalizedPath
}

/**
 * CanonicalManager Component
 * Automatically injects canonical tag into page head
 */
export function CanonicalManager({
  overrideCanonical,
  excludeParams = [],
  includeTrailingSlash = false,
  domain = 'https://cerebrumbiologyacademy.com',
}: CanonicalManagerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Use override if provided
    if (overrideCanonical) {
      updateCanonicalTag(overrideCanonical)
      return
    }

    // Generate canonical URL
    const normalizedPath = normalizeUrl(
      pathname,
      searchParams,
      excludeParams,
      includeTrailingSlash
    )

    // Ensure domain has no trailing slash for concat
    const cleanDomain = domain.endsWith('/') ? domain.slice(0, -1) : domain

    const canonicalUrl = `${cleanDomain}${normalizedPath}`

    // Ensure it's a valid URL
    try {
      new URL(canonicalUrl)
      updateCanonicalTag(canonicalUrl)
    } catch (error) {
      console.error('Invalid canonical URL:', canonicalUrl, error)
    }
  }, [pathname, searchParams, overrideCanonical, excludeParams, includeTrailingSlash, domain])

  return null
}

/**
 * Helper function to create or update canonical tag in document head
 */
function updateCanonicalTag(canonicalUrl: string): void {
  // Find existing canonical tag
  let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null

  // Create if doesn't exist
  if (!canonicalTag) {
    canonicalTag = document.createElement('link')
    canonicalTag.rel = 'canonical'
    document.head.appendChild(canonicalTag)
  }

  // Update href
  canonicalTag.href = canonicalUrl
}

/**
 * Hook for getting current normalized canonical URL
 * Useful for meta tags, sharing, etc.
 */
export function useCanonicalUrl(
  overrideCanonical?: string,
  excludeParams: string[] = [],
  includeTrailingSlash: boolean = false,
  domain: string = 'https://cerebrumbiologyacademy.com'
): string {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (overrideCanonical) {
    return overrideCanonical
  }

  const normalizedPath = normalizeUrl(
    pathname,
    searchParams,
    excludeParams,
    includeTrailingSlash
  )

  const cleanDomain = domain.endsWith('/') ? domain.slice(0, -1) : domain

  return `${cleanDomain}${normalizedPath}`
}

/**
 * Alternative: Server-side canonical generator for use in metadata
 * Usage: In page.tsx metadata export
 *
 * export const metadata: Metadata = {
 *   alternates: {
 *     canonical: 'https://cerebrumbiologyacademy.com/page-name'
 *   }
 * }
 */
export function generateCanonicalUrl(
  pathname: string,
  domain: string = 'https://cerebrumbiologyacademy.com'
): string {
  const cleanDomain = domain.endsWith('/') ? domain.slice(0, -1) : domain
  const normalizedPath = pathname.toLowerCase()
  const cleanPath =
    normalizedPath.endsWith('/') && normalizedPath !== '/'
      ? normalizedPath.slice(0, -1)
      : normalizedPath

  return `${cleanDomain}${cleanPath}`
}
