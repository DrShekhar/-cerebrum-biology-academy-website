// API Version Information Endpoint
// Provides information about supported API versions

import { NextRequest, NextResponse } from 'next/server'
import { getVersionInfo, createVersionedResponse, getApiVersion } from '@/lib/api/versioning'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

/**
 * GET /api/version
 * Returns information about available API versions
 */
export async function GET(req: NextRequest) {
  const version = getApiVersion(req)
  const versionInfo = getVersionInfo()

  return createVersionedResponse(
    {
      success: true,
      data: versionInfo,
      meta: {
        requestedVersion: version,
        timestamp: new Date().toISOString(),
      },
    },
    version
  )
}
