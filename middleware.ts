import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple admin authentication middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // For now, we'll use a simple admin key approach
    // In production, this should use proper session-based authentication
    const adminKey = request.headers.get('x-admin-key') || request.cookies.get('admin-session')?.value
    
    // Temporary admin access - replace with proper authentication
    const isAdminAuthenticated = adminKey === 'admin-demo-2024' || 
                                adminKey === process.env.ADMIN_ACCESS_KEY ||
                                pathname === '/admin/login'

    if (!isAdminAuthenticated) {
      // Redirect to login page instead of showing admin content
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Security headers for all requests
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  // Prevent admin routes from being cached
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}