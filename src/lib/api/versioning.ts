// API Versioning Strategy for Cerebrum Biology Academy
// Implements comprehensive version management and compatibility

import { NextRequest, NextResponse } from 'next/server'

/**
 * API Version Configuration
 */
export const API_VERSIONS = {
  V1: 'v1',
  V2: 'v2',
  CURRENT: 'v1', // Current stable version
  LATEST: 'v1', // Latest available version
  DEPRECATED: [], // Versions that are deprecated but still functional
  SUNSET: [], // Versions that will be removed soon
} as const

export type ApiVersion = (typeof API_VERSIONS)[keyof Omit<
  typeof API_VERSIONS,
  'CURRENT' | 'LATEST' | 'DEPRECATED' | 'SUNSET'
>]

/**
 * Version detection strategy
 */
export enum VersionStrategy {
  HEADER = 'header', // X-API-Version or Accept: application/vnd.cerebrum.v1+json
  URL_PREFIX = 'url_prefix', // /api/v1/...
  QUERY_PARAM = 'query_param', // ?api-version=v1
  ACCEPT_HEADER = 'accept_header', // Accept: application/vnd.cerebrum.v1+json
}

/**
 * Version configuration
 */
export interface VersionConfig {
  version: ApiVersion
  isDeprecated: boolean
  isSunset: boolean
  sunsetDate?: string
  replacementVersion?: ApiVersion
  features: string[]
  breakingChanges: string[]
}

/**
 * Version registry
 */
export const VERSION_REGISTRY: Record<string, VersionConfig> = {
  v1: {
    version: 'v1',
    isDeprecated: false,
    isSunset: false,
    features: [
      'User authentication',
      'Course management',
      'Test sessions',
      'Analytics',
      'Demo bookings',
      'Enrollment',
      'Payments',
      'WhatsApp integration',
    ],
    breakingChanges: [],
  },
  v2: {
    version: 'v2',
    isDeprecated: false,
    isSunset: false,
    features: [
      'Enhanced authentication with OAuth',
      'Real-time notifications',
      'Advanced analytics',
      'GraphQL support',
      'Webhook subscriptions',
    ],
    breakingChanges: [
      'Authentication response format changed',
      'Test session API restructured',
      'Error response format standardized',
    ],
  },
}

/**
 * Extract API version from request
 */
export function extractApiVersion(
  req: NextRequest,
  strategy: VersionStrategy = VersionStrategy.HEADER
): ApiVersion | null {
  switch (strategy) {
    case VersionStrategy.HEADER:
      // Check X-API-Version header
      const headerVersion = req.headers.get('X-API-Version')
      if (headerVersion && isValidVersion(headerVersion)) {
        return headerVersion as ApiVersion
      }
      break

    case VersionStrategy.URL_PREFIX:
      // Extract from URL path /api/v1/...
      const urlMatch = req.nextUrl.pathname.match(/\/api\/(v\d+)\//)
      if (urlMatch && isValidVersion(urlMatch[1])) {
        return urlMatch[1] as ApiVersion
      }
      break

    case VersionStrategy.QUERY_PARAM:
      // Check ?api-version=v1
      const queryVersion = req.nextUrl.searchParams.get('api-version')
      if (queryVersion && isValidVersion(queryVersion)) {
        return queryVersion as ApiVersion
      }
      break

    case VersionStrategy.ACCEPT_HEADER:
      // Parse Accept header: application/vnd.cerebrum.v1+json
      const acceptHeader = req.headers.get('Accept') || ''
      const acceptMatch = acceptHeader.match(/application\/vnd\.cerebrum\.(v\d+)\+json/)
      if (acceptMatch && isValidVersion(acceptMatch[1])) {
        return acceptMatch[1] as ApiVersion
      }
      break
  }

  return null
}

/**
 * Get API version with fallback strategy
 */
export function getApiVersion(req: NextRequest): ApiVersion {
  // Try multiple strategies in order of preference
  const strategies = [
    VersionStrategy.URL_PREFIX,
    VersionStrategy.HEADER,
    VersionStrategy.ACCEPT_HEADER,
    VersionStrategy.QUERY_PARAM,
  ]

  for (const strategy of strategies) {
    const version = extractApiVersion(req, strategy)
    if (version) {
      return version
    }
  }

  // Default to current version
  return API_VERSIONS.CURRENT as ApiVersion
}

/**
 * Check if version string is valid
 */
export function isValidVersion(version: string): boolean {
  return Object.values(API_VERSIONS).includes(version as any)
}

/**
 * Get version configuration
 */
export function getVersionConfig(version: ApiVersion): VersionConfig | null {
  return VERSION_REGISTRY[version] || null
}

/**
 * Check if version is deprecated
 */
export function isVersionDeprecated(version: ApiVersion): boolean {
  const config = getVersionConfig(version)
  return config?.isDeprecated || false
}

/**
 * Check if version is sunset (being removed)
 */
export function isVersionSunset(version: ApiVersion): boolean {
  const config = getVersionConfig(version)
  return config?.isSunset || false
}

/**
 * Add versioning headers to response
 */
export function addVersionHeaders(response: NextResponse, version: ApiVersion): NextResponse {
  const config = getVersionConfig(version)

  // Add current version header
  response.headers.set('X-API-Version', version)

  // Add latest version header
  response.headers.set('X-API-Latest-Version', API_VERSIONS.LATEST)

  // Add deprecation warning if needed
  if (config?.isDeprecated) {
    response.headers.set('Deprecation', 'true')
    if (config.sunsetDate) {
      response.headers.set('Sunset', config.sunsetDate)
    }
    if (config.replacementVersion) {
      response.headers.set('X-API-Replacement-Version', config.replacementVersion)
    }
  }

  // Add sunset warning if needed
  if (config?.isSunset && config.sunsetDate) {
    response.headers.set('Sunset', config.sunsetDate)
    if (config.replacementVersion) {
      response.headers.set('X-API-Replacement-Version', config.replacementVersion)
    }
  }

  // Add link to API documentation
  response.headers.set('Link', `</docs/api/${version}>; rel="documentation"`)

  return response
}

/**
 * Create versioned API response
 */
export function createVersionedResponse(
  data: any,
  version: ApiVersion,
  status = 200
): NextResponse {
  const response = NextResponse.json(data, { status })
  return addVersionHeaders(response, version)
}

/**
 * Version compatibility checker
 */
export function checkVersionCompatibility(
  requestedVersion: ApiVersion,
  requiredFeatures: string[]
): { compatible: boolean; missingFeatures: string[] } {
  const config = getVersionConfig(requestedVersion)

  if (!config) {
    return {
      compatible: false,
      missingFeatures: requiredFeatures,
    }
  }

  const missingFeatures = requiredFeatures.filter((feature) => !config.features.includes(feature))

  return {
    compatible: missingFeatures.length === 0,
    missingFeatures,
  }
}

/**
 * Version migration helper
 */
export interface VersionMigration {
  fromVersion: ApiVersion
  toVersion: ApiVersion
  transformRequest?: (data: any) => any
  transformResponse?: (data: any) => any
  warnings?: string[]
}

/**
 * Version migration registry
 */
export const VERSION_MIGRATIONS: VersionMigration[] = [
  {
    fromVersion: 'v1',
    toVersion: 'v2',
    transformResponse: (data: any) => {
      // Example: Transform v1 response to v2 format
      if (data.user) {
        return {
          ...data,
          user: {
            ...data.user,
            // Add v2 specific fields
            avatar: data.user.profile?.avatar || null,
            metadata: data.user.profile || {},
          },
        }
      }
      return data
    },
    warnings: ['Authentication response format changed', 'Some fields have been restructured'],
  },
]

/**
 * Apply version migration
 */
export function applyVersionMigration(
  data: any,
  fromVersion: ApiVersion,
  toVersion: ApiVersion,
  type: 'request' | 'response'
): { data: any; warnings: string[] } {
  const migration = VERSION_MIGRATIONS.find(
    (m) => m.fromVersion === fromVersion && m.toVersion === toVersion
  )

  if (!migration) {
    return { data, warnings: [] }
  }

  const transform = type === 'request' ? migration.transformRequest : migration.transformResponse

  return {
    data: transform ? transform(data) : data,
    warnings: migration.warnings || [],
  }
}

/**
 * Version middleware wrapper
 */
export function withApiVersion<T = any>(
  handler: (req: NextRequest, version: ApiVersion) => Promise<NextResponse<T>>
) {
  return async (req: NextRequest): Promise<NextResponse<T>> => {
    // Extract API version from request
    const version = getApiVersion(req)

    // Check if version is valid
    if (!isValidVersion(version)) {
      return NextResponse.json(
        {
          error: 'Invalid API version',
          message: `Version '${version}' is not supported`,
          supportedVersions: Object.values(API_VERSIONS).filter(
            (v) => typeof v === 'string' && v.startsWith('v')
          ),
        },
        { status: 400 }
      ) as NextResponse<T>
    }

    // Check if version is sunset
    if (isVersionSunset(version)) {
      const config = getVersionConfig(version)
      return NextResponse.json(
        {
          error: 'API version sunset',
          message: `Version '${version}' has been sunset and is no longer available`,
          sunsetDate: config?.sunsetDate,
          replacementVersion: config?.replacementVersion || API_VERSIONS.LATEST,
        },
        { status: 410 }
      ) as any
    }

    // Execute handler with version
    const response = await handler(req, version)

    // Add version headers
    return addVersionHeaders(response, version)
  }
}

/**
 * Generate version info for /api/version endpoint
 */
export function getVersionInfo() {
  return {
    current: API_VERSIONS.CURRENT,
    latest: API_VERSIONS.LATEST,
    deprecated: API_VERSIONS.DEPRECATED,
    sunset: API_VERSIONS.SUNSET,
    supported: Object.keys(VERSION_REGISTRY),
    versions: VERSION_REGISTRY,
  }
}
