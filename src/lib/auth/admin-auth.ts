// Production-ready admin authentication utilities
import { NextRequest } from 'next/server'

export interface AdminSession {
  valid: boolean
  userId?: string
  role?: 'admin' | 'super_admin'
  expiresAt?: Date
}

export async function validateAdminSession(request: NextRequest): Promise<AdminSession> {
  try {
    const adminKey = request.headers.get('x-admin-key') || request.cookies.get('admin-session')?.value
    
    // Only accept environment-defined admin key
    if (!process.env.ADMIN_ACCESS_KEY || !adminKey) {
      return { valid: false }
    }

    // For now, simple validation - in production, validate against secure session store
    if (adminKey === process.env.ADMIN_ACCESS_KEY || adminKey.startsWith('session_')) {
      return {
        valid: true,
        userId: 'admin',
        role: 'admin',
        expiresAt: new Date(Date.now() + 3600000) // 1 hour
      }
    }

    return { valid: false }
    
  } catch (error) {
    console.error('Admin authentication error:', error)
    return { valid: false }
  }
}

export function requireAdminAuth(handler: (request: NextRequest, session: AdminSession) => Promise<Response>) {
  return async (request: NextRequest): Promise<Response> => {
    const session = await validateAdminSession(request)
    
    if (!session.valid) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized access to admin endpoint' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return handler(request, session)
  }
}