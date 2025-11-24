import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { logger } from '@/lib/utils/logger'
import prisma from '@/lib/prisma'

export interface AdminVerificationResult {
  authorized: boolean
  message?: string
  adminId?: string
  adminEmail?: string
}

export async function verifyAdminAccess(request: NextRequest): Promise<AdminVerificationResult> {
  try {
    // DEV MODE: Bypass authentication during development
    if (process.env.BYPASS_CRM_AUTH === 'true') {
      console.log('[DEV MODE] Bypassing admin verification')
      return {
        authorized: true,
        adminId: 'dev-admin-id',
        adminEmail: 'dev@cerebrumbiologyacademy.com',
      }
    }

    const authHeader = request.headers.get('authorization')
    const apiKey = request.headers.get('x-api-key')

    if (apiKey) {
      return await verifyApiKey(apiKey)
    }

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      return await verifyBearerToken(token)
    }

    const session = await auth()
    if (session) {
      return await verifySession(session)
    }

    return {
      authorized: false,
      message: 'No valid authentication found. Provide API key, bearer token, or valid session.',
    }
  } catch (error) {
    logger.error('Admin verification error', error)
    return {
      authorized: false,
      message: 'Authentication verification failed',
    }
  }
}

async function verifyApiKey(apiKey: string): Promise<AdminVerificationResult> {
  const validApiKey = process.env.ADMIN_API_KEY

  if (!validApiKey) {
    logger.warn('ADMIN_API_KEY not configured')
    return {
      authorized: false,
      message: 'Admin API key not configured on server',
    }
  }

  if (apiKey !== validApiKey) {
    logger.warn('Invalid API key attempt')
    return {
      authorized: false,
      message: 'Invalid API key',
    }
  }

  return {
    authorized: true,
    adminEmail: 'api-key-access',
  }
}

async function verifyBearerToken(token: string): Promise<AdminVerificationResult> {
  try {
    const validToken = process.env.ADMIN_BEARER_TOKEN

    if (!validToken) {
      return {
        authorized: false,
        message: 'Bearer token authentication not configured',
      }
    }

    if (token !== validToken) {
      return {
        authorized: false,
        message: 'Invalid bearer token',
      }
    }

    return {
      authorized: true,
      adminEmail: 'bearer-token-access',
    }
  } catch (error) {
    logger.error('Bearer token verification error', error)
    return {
      authorized: false,
      message: 'Token verification failed',
    }
  }
}

async function verifySession(session: any): Promise<AdminVerificationResult> {
  try {
    if (!session.user || !session.user.email) {
      return {
        authorized: false,
        message: 'Invalid session data',
      }
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        role: true,
      },
    })

    if (!user) {
      return {
        authorized: false,
        message: 'User not found',
      }
    }

    if (user.role !== 'ADMIN' && user.role !== 'SUPERADMIN') {
      logger.warn('Non-admin user attempted admin access', { userId: user.id, email: user.email })
      return {
        authorized: false,
        message: 'Admin privileges required',
      }
    }

    return {
      authorized: true,
      adminId: user.id,
      adminEmail: user.email,
    }
  } catch (error) {
    logger.error('Session verification error', error)
    return {
      authorized: false,
      message: 'Session verification failed',
    }
  }
}

export async function requireAdminRole(allowedRoles: string[] = ['ADMIN', 'SUPERADMIN']) {
  return async (request: NextRequest): Promise<AdminVerificationResult> => {
    const verification = await verifyAdminAccess(request)

    if (!verification.authorized) {
      return verification
    }

    if (verification.adminId) {
      const user = await prisma.user.findUnique({
        where: { id: verification.adminId },
        select: { role: true },
      })

      if (!user || !allowedRoles.includes(user.role)) {
        return {
          authorized: false,
          message: `Requires one of: ${allowedRoles.join(', ')}`,
        }
      }
    }

    return verification
  }
}
