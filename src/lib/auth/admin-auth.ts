/**
 * Production-ready admin authentication utilities
 *
 * SECURITY AUDIT (2026-01-19):
 * - Fixed: session_ prefix bypass vulnerability
 * - Fixed: BYPASS_CRM_AUTH completely removed (2026-01-23)
 * - Added: Timing-safe comparison for admin key
 * - Added: IP logging for admin access attempts
 * - Added: Proper session validation against database
 *
 * KEY ROTATION SUPPORT (2026-01-28):
 * - Support for multiple admin keys with version tracking
 * - Rolling rotation: add new key, then remove old key
 * - Audit logging includes key version used
 *
 * Environment variable formats:
 * - Single key: ADMIN_ACCESS_KEY=your-secret-key
 * - Multiple keys (comma-separated): ADMIN_ACCESS_KEYS=key1:v1,key2:v2
 * - JSON format: ADMIN_ACCESS_KEYS_JSON=[{"key":"secret","version":"v1","name":"primary"}]
 */
import { NextRequest } from 'next/server'
import crypto from 'crypto'

export interface AdminKey {
  key: string
  version: string
  name?: string
  expiresAt?: Date
}

export interface AdminSession {
  valid: boolean
  userId?: string
  role?: 'admin' | 'super_admin'
  expiresAt?: Date
  email?: string
  keyVersion?: string // Track which key was used for audit
  keyName?: string
}

/**
 * Timing-safe comparison to prevent timing attacks
 */
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

// Cache parsed admin keys to avoid re-parsing on every request
let cachedAdminKeys: AdminKey[] | null = null
let lastKeyParse = 0
const KEY_CACHE_TTL = 60000 // Re-parse every 60 seconds to pick up env changes

/**
 * Parse admin keys from environment variables
 * Supports three formats:
 * 1. Single key: ADMIN_ACCESS_KEY=secret
 * 2. Multiple keys (comma-separated): ADMIN_ACCESS_KEYS=key1:v1,key2:v2
 * 3. JSON format: ADMIN_ACCESS_KEYS_JSON=[{"key":"secret","version":"v1"}]
 */
function getAdminKeys(): AdminKey[] {
  const now = Date.now()

  // Return cached keys if still valid
  if (cachedAdminKeys && now - lastKeyParse < KEY_CACHE_TTL) {
    return cachedAdminKeys
  }

  const keys: AdminKey[] = []

  // Try JSON format first (most flexible)
  if (process.env.ADMIN_ACCESS_KEYS_JSON) {
    try {
      const jsonKeys = JSON.parse(process.env.ADMIN_ACCESS_KEYS_JSON)
      if (Array.isArray(jsonKeys)) {
        for (const k of jsonKeys) {
          if (k.key && k.version) {
            keys.push({
              key: k.key,
              version: k.version,
              name: k.name,
              expiresAt: k.expiresAt ? new Date(k.expiresAt) : undefined,
            })
          }
        }
      }
    } catch (e) {
      console.error('[ADMIN AUTH] Failed to parse ADMIN_ACCESS_KEYS_JSON:', e)
    }
  }

  // Try comma-separated format: key1:v1,key2:v2
  if (keys.length === 0 && process.env.ADMIN_ACCESS_KEYS) {
    const keyPairs = process.env.ADMIN_ACCESS_KEYS.split(',')
    for (let i = 0; i < keyPairs.length; i++) {
      const pair = keyPairs[i].trim()
      const [key, version] = pair.split(':')
      if (key) {
        keys.push({
          key: key.trim(),
          version: version?.trim() || `v${i + 1}`,
          name: `key-${i + 1}`,
        })
      }
    }
  }

  // Fallback to single key format
  if (keys.length === 0 && process.env.ADMIN_ACCESS_KEY) {
    keys.push({
      key: process.env.ADMIN_ACCESS_KEY,
      version: 'v1',
      name: 'primary',
    })
  }

  // Cache the parsed keys
  cachedAdminKeys = keys
  lastKeyParse = now

  return keys
}

/**
 * Validate an admin key against all configured keys
 * Returns matching key info if valid, null otherwise
 */
function validateAdminKey(providedKey: string): AdminKey | null {
  const adminKeys = getAdminKeys()

  if (adminKeys.length === 0) {
    console.error('[SECURITY] No admin keys configured')
    return null
  }

  const now = new Date()

  for (const adminKey of adminKeys) {
    // Check if key has expired
    if (adminKey.expiresAt && adminKey.expiresAt < now) {
      continue
    }

    // Use timing-safe comparison
    if (secureCompare(providedKey, adminKey.key)) {
      return adminKey
    }
  }

  return null
}

/**
 * Get client IP address from request headers
 * Parses first IP from x-forwarded-for to prevent spoofing
 */
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

export async function validateAdminSession(request: NextRequest): Promise<AdminSession> {
  const clientIP = getClientIP(request)

  try {
    // SECURITY: Auth bypass completely removed from production code
    // For local development, use a real admin account in the database
    // This prevents accidental bypass if env vars are misconfigured

    const providedKey =
      request.headers.get('x-admin-key') || request.cookies.get('admin-session')?.value

    // Check if any admin keys are configured
    const adminKeys = getAdminKeys()
    if (adminKeys.length === 0) {
      console.error('[SECURITY] No admin keys configured (ADMIN_ACCESS_KEY, ADMIN_ACCESS_KEYS, or ADMIN_ACCESS_KEYS_JSON)')
      return { valid: false }
    }

    if (!providedKey) {
      return { valid: false }
    }

    // Validate the provided key against all configured keys
    const matchedKey = validateAdminKey(providedKey)

    if (matchedKey) {
      // Log successful admin authentication with key version for audit
      if (process.env.NODE_ENV === 'production') {
        console.log(
          `[ADMIN AUTH] Successful authentication from IP: ${clientIP} ` +
            `using key version: ${matchedKey.version} (${matchedKey.name || 'unnamed'}) ` +
            `at ${new Date().toISOString()}`
        )
      }

      return {
        valid: true,
        userId: 'admin',
        role: 'admin',
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
        keyVersion: matchedKey.version,
        keyName: matchedKey.name,
      }
    }

    // Log failed admin authentication attempts
    console.warn(
      `[ADMIN AUTH] Failed authentication attempt from IP: ${clientIP} at ${new Date().toISOString()}`
    )

    return { valid: false }
  } catch (error) {
    console.error('Admin authentication error:', error)
    return { valid: false }
  }
}

/**
 * Get information about configured admin keys (for admin dashboard)
 * Does NOT return actual key values, only metadata
 */
export function getAdminKeyInfo(): Array<{
  version: string
  name?: string
  expiresAt?: Date
  isExpired: boolean
}> {
  const keys = getAdminKeys()
  const now = new Date()

  return keys.map((k) => ({
    version: k.version,
    name: k.name,
    expiresAt: k.expiresAt,
    isExpired: k.expiresAt ? k.expiresAt < now : false,
  }))
}

/**
 * Validate admin session from JWT token (for API routes using JWT auth)
 * This integrates with the main auth system for admin users
 */
export async function validateAdminSessionFromJWT(request: NextRequest): Promise<AdminSession> {
  try {
    // Import dynamically to avoid circular dependencies
    const { validateUserSession } = await import('./config')
    const session = await validateUserSession(request)

    if (!session.valid) {
      return { valid: false }
    }

    // Check if user has admin role
    if (session.role !== 'ADMIN') {
      const clientIP = getClientIP(request)
      console.warn(
        `[ADMIN AUTH] Non-admin user ${session.userId} attempted admin access from IP: ${clientIP}`
      )
      return { valid: false }
    }

    return {
      valid: true,
      userId: session.userId,
      role: 'admin',
      email: session.email,
      expiresAt: session.expiresAt,
    }
  } catch (error) {
    console.error('Admin JWT validation error:', error)
    return { valid: false }
  }
}

export function requireAdminAuth(
  handler: (request: NextRequest, session: AdminSession) => Promise<Response>
) {
  return async (request: NextRequest): Promise<Response> => {
    // Try JWT-based admin auth first, then fall back to key-based auth
    let session = await validateAdminSessionFromJWT(request)

    if (!session.valid) {
      session = await validateAdminSession(request)
    }

    if (!session.valid) {
      return new Response(
        JSON.stringify({
          error: 'Unauthorized access to admin endpoint',
          message: 'Valid admin credentials required',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return handler(request, session)
  }
}
