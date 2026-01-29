import { NextRequest, NextResponse } from 'next/server'
import { addSecurityHeaders } from '@/lib/auth/config'
import { addCSPHeaders } from '@/lib/auth/csrf'
import { compressResponseMiddleware } from '@/lib/middleware/compression'
import * as jwt from 'jsonwebtoken'

// Auth secret for verifying Firebase session tokens
// SECURITY: No fallback in production - secrets are required
const getAuthSecret = (): string => {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: AUTH_SECRET or NEXTAUTH_SECRET is required in production')
    }
    console.warn('[DEV] AUTH_SECRET not set - using development fallback')
    return 'dev-only-secret-not-for-production-use'
  }
  return secret
}

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/courses',
  '/about',
  '/contact',
  '/blog',
  '/gallery',
  '/pricing',
  '/results',
  '/faculty',
  '/demo-booking',
  '/admissions',
  '/faq',
  '/testimonials',
  '/timetable',
  '/study-with-me', // Public study session page and OBS overlay
  '/sign-in',
  '/sign-up',
  '/sign-out',
  '/unauthorized',
  '/auth',
  '/api/auth',
  '/api/public',
  '/api/webhooks',
  // Olympiad coaching pages (public SEO pages)
  '/usabo-coaching',
  '/biology-olympiad-coaching',
  '/olympiad-preparation',
  '/campbell-biology',
  '/inbo-coaching',
  '/nseb-coaching',
  // SEO landing pages (all public)
  '/neet-coaching',
  '/neet-biology',
  '/best-biology',
  '/biology-tuition',
  '/biology-coaching',
  '/biology-tutor',
  '/biology-classes',
  '/boards',
  '/services',
  '/company',
  '/support',
  '/success-stories',
  '/wall-of-achievers',
  '/free-resources',
  '/mock-tests',
  '/study-materials',
  '/school-career-seminar',
]

// Check if path matches public routes
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (route === '/') return pathname === '/'
    return pathname === route || pathname.startsWith(route + '/')
  })
}

// Define admin routes
function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
}

// Define protected routes
function isProtectedRoute(pathname: string): boolean {
  const protectedPrefixes = [
    '/dashboard',
    '/student',
    '/profile',
    '/test',
    '/teacher',
    '/counselor',
    '/select-role',
  ]
  return protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  )
}

// JWT payload from our Firebase session API
interface FirebaseSessionPayload {
  id: string
  email: string
  name?: string
  role: string
  phone?: string
  sub: string
  iat?: number
  exp?: number
}

// Try to get user from our custom JWT token
// Uses jsonwebtoken library (same as firebase-session route) for consistency
function getUserFromToken(req: NextRequest): { userId: string; role: string } | null {
  try {
    // Check for our Firebase auth session token - check both cookie variants
    const sessionToken =
      req.cookies.get('__Secure-authjs.session-token')?.value ||
      req.cookies.get('authjs.session-token')?.value

    if (!sessionToken) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Middleware] No session token found in cookies')
      }
      return null
    }

    // Use jsonwebtoken for verification (same library as token creation)
    const decoded = jwt.verify(sessionToken, getAuthSecret()) as FirebaseSessionPayload

    if (decoded && decoded.id) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Middleware] Token verified successfully for user:', decoded.id)
      }
      return {
        userId: decoded.id,
        role: (decoded.role || 'student').toUpperCase(),
      }
    }
    return null
  } catch (error) {
    // Token invalid or expired - log in development for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Middleware] Token verification failed:', error)
    }
    return null
  }
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // ============================================
  // SEO: Redirect www to non-www (canonical domain)
  // ============================================
  if (hostname.startsWith('www.')) {
    const newUrl = new URL(req.url)
    newUrl.host = hostname.replace('www.', '')
    return NextResponse.redirect(newUrl, { status: 301 })
  }

  // Get auth state from our custom JWT token (synchronous with jsonwebtoken)
  const authResult = getUserFromToken(req)
  const userId = authResult?.userId || null
  const userRole = authResult?.role || null

  // For non-public routes, require authentication
  if (!isPublicRoute(pathname) && !userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Auth routes redirect to dashboard if already logged in
  if (pathname.startsWith('/auth/') && userId) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Sign-in/sign-up pages redirect to dashboard if already logged in
  if ((pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) && userId) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Admin login page - redirect to dashboard if already admin
  if (pathname === '/admin/login') {
    if (userId && userRole === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    if (userId) {
      // User is signed in but not admin - show page
      return addSecurityHeaders(NextResponse.next())
    }
    return addSecurityHeaders(NextResponse.next())
  }

  // Protected admin routes - require admin role
  // Note: Role checking happens in AdminLayout component for better UX
  // Middleware just ensures user is authenticated
  if (isAdminRoute(pathname) && pathname !== '/admin/login') {
    if (!userId) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Log admin access
    if (process.env.NODE_ENV === 'production') {
      const clientIP =
        req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      console.log(
        `Admin access: userId=${userId} accessed ${pathname} from ${clientIP} at ${new Date().toISOString()}`
      )
    }
  }

  // Protected teacher routes
  if (pathname.startsWith('/teacher/') && !userId) {
    return NextResponse.redirect(
      new URL('/sign-in?redirect_url=' + encodeURIComponent(pathname), req.url)
    )
  }

  // Protected counselor routes
  if (pathname.startsWith('/counselor') && pathname !== '/counselor-poc' && !userId) {
    const loginUrl = new URL('/sign-in', req.url)
    loginUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Protected general routes
  if (isProtectedRoute(pathname) && !userId) {
    const loginUrl = new URL('/sign-in', req.url)
    loginUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // API route protection - admin APIs
  if (pathname.startsWith('/api/admin/')) {
    if (!userId) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userRole !== 'ADMIN') {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Admin access required',
            message: 'You need admin privileges to access this resource',
          },
          { status: 403 }
        )
      )
    }
  }

  // API route protection - teacher APIs
  if (pathname.startsWith('/api/teacher/')) {
    if (!userId) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userRole !== 'TEACHER' && userRole !== 'ADMIN') {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Teacher access required',
            message: 'You need teacher privileges to access this resource',
          },
          { status: 403 }
        )
      )
    }
  }

  // API route protection - counselor APIs
  if (pathname.startsWith('/api/counselor/')) {
    if (!userId) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userRole !== 'COUNSELOR' && userRole !== 'ADMIN') {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Counselor access required',
            message: 'You need counselor privileges to access this resource',
          },
          { status: 403 }
        )
      )
    }
  }

  // Create response with enhanced security and pass pathname to server components
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set pathname cookie for server components to read
  // This is more reliable than headers for middleware -> layout communication
  response.cookies.set('x-pathname', pathname, {
    path: '/',
    sameSite: 'strict',
    httpOnly: false, // Allow client-side access if needed
    maxAge: 60, // Short-lived - just for request/response cycle
  })

  // Preserve 404 and other error status codes
  if (response.status !== 200) {
    return response
  }

  // Apply comprehensive security headers
  addSecurityHeaders(response)
  addCSPHeaders(response)

  // PERFORMANCE: Smart caching strategy
  const isStaticPage =
    pathname === '/' ||
    pathname.startsWith('/courses') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/gallery') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/timetable')

  const isProtectedPath =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/student') ||
    pathname.startsWith('/teacher') ||
    pathname.startsWith('/counselor') ||
    pathname.startsWith('/api/')

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  // Only apply noindex to protected routes
  if (isProtectedPath) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive, noimageindex')
  }

  // SEO: Add noindex for pages with query params to prevent duplicate content
  const searchQuery = req.nextUrl.search
  const pagesWithQueryParamDuplicates = ['/blog', '/courses', '/demo-booking', '/enrollments']
  if (
    searchQuery &&
    pagesWithQueryParamDuplicates.some((p) => pathname === p || pathname.startsWith(p + '/'))
  ) {
    response.headers.set('X-Robots-Tag', 'noindex, follow')
  }

  // Production headers
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    )
  }

  // SECURITY (2026-01-28): Debug headers removed - never expose user IDs or roles in headers
  // Even in development, these can be logged by proxies, browser extensions, or debugging tools
  // Use browser DevTools Application tab to inspect cookies instead

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  )

  // Cache control
  if (isProtectedPath) {
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
    )
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  } else if (isStaticPage) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=60, s-maxage=300, stale-while-revalidate=86400'
    )
  } else {
    response.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
  }

  // Admin route logging
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set('X-Admin-Route', 'true')
  }

  // Apply compression to API responses
  if (pathname.startsWith('/api/')) {
    return await compressResponseMiddleware(req, response)
  }

  return response
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
