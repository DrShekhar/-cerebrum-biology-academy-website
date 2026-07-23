import { NextRequest, NextResponse } from 'next/server'
import { addSecurityHeaders, getJWTSecret } from '@/lib/auth/config'
import { addCSPHeaders } from '@/lib/security/csp'
import { compressResponseMiddleware } from '@/lib/middleware/compression'
import { jwtVerify } from 'jose'
import { getToken } from 'next-auth/jwt'
import { aeoCitationRedirects, cityHubBrokenLinkRedirects } from '@/config/seo-redirects.mjs'

// Vercel caps next.config routes (redirects + rewrites + headers) at 2048.
// These two large EXACT-MATCH redirect lists are served from middleware instead
// (a Map lookup doesn't count against that limit) — same 301 behaviour, so
// prospect/SEO flow is unchanged. Keep ONLY exact-match (no wildcard) arrays here.
const middlewareRedirects = new Map<string, string>(
  [...aeoCitationRedirects, ...cityHubBrokenLinkRedirects].map((r) => [r.source, r.destination])
)

// SECURITY: JWT secret is now imported from @/lib/auth/config (single source of truth)
// This ensures tokens created with TokenUtils are verified with the same secret

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
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/international',
  '/hi',
  '/ta',
  '/biology-notes',
  '/biology-notes-for-neet',
  '/checkout',
  '/enrollments',
  // Public tool/calculator pages
  '/calculator',
  '/neet-tools',
  '/neet-exam-countdown',
  '/neet-score-calculator',
  '/neet-college-predictor',
  '/neet-rank-predictor',
  '/neet-readiness-quiz',
  '/neet-study-plan-generator',
  // Public content pages
  '/scholarship',
  '/referral',
  '/reviews',
  '/video-lectures',
  '/interactive-learning',
  '/learning-path',
  '/mobile-app',
  '/community',
  '/verify-certificate',
  '/status',
  '/offline',
  '/dropper',
  '/enrollment',
  '/book-free-demo',
  '/locations',
  '/resources',
  // Public SEO pages
  '/neet-result-analysis',
  '/neet-biology-mcq',
  '/neet-biology-mcq-practice',
  '/biodiversity-notes-neet',
  '/neet-crash-course',
  '/neet-preparation-guide',
  '/neet-2026-preparation',
  '/neet-biology-notes-pdf',
  '/reproduction-notes-neet',
  '/plant-kingdom-notes-neet',
  '/neet-coaching-fee-gurugram',
  '/best-biology-books-for-neet',
  '/neet-biology-weekend-batch',
  '/live-biology-classes-neet',
  '/genetics-biology-tuition',
  '/dna-biology-tuition',
  '/biology-topics',
  // Additional SEO page prefixes (matched with route + '-' for city variants)
  '/12th-board',
  '/how-to-prepare',
  '/neet-toppers',
  '/compare',
  '/which-neet-coaching',
  '/which-is-better',
  '/best-neet',
  '/affordable-neet',
  '/is-coaching-necessary',
  '/free-neet',
  '/online-neet',
  '/1-year-neet',
  '/2-year-neet',
  '/home-biology',
  '/cbse-biology',
  '/ncert-biology',
  '/class-12-board',
  '/neet-foundation',
  '/neet-evening',
  '/neet-weekend',
  '/neet-dropper',
  '/neet-test-series',
  '/neet-scholarship',
  '/complement-aakash',
  '/complement-allen',
  '/aakash-alternative',
  '/allen-alternative',
  '/fiitjee-alternative',
  '/narayana-alternative',
  '/physics-wallah-alternative',
  '/top-10-neet',
  '/all-locations',
  '/states',
  '/batch-types',
]

// Check if path matches public routes
// Match exact route, route + '/' (subpages), and route + '-' (SEO variants like /neet-coaching-noida)
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (route === '/') return pathname === '/'
    return (
      pathname === route || pathname.startsWith(route + '/') || pathname.startsWith(route + '-')
    )
  })
}

// Define admin routes
function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin') || pathname.startsWith('/api/admin')
}

// Define protected routes that REQUIRE authentication
// Everything NOT in this list is public by default (visible to Google)
function isProtectedRoute(pathname: string): boolean {
  const protectedPrefixes = [
    '/dashboard',
    '/student',
    '/profile',
    '/test',
    '/teacher',
    '/counselor',
    '/consultant',
    '/select-role',
    '/settings',
    '/practice',
    '/adaptive-testing',
    '/ai-features',
    '/analytics',
    '/portal',
    '/voice-training',
    '/whatsapp-course-selector',
    '/claudechat',
    '/counselor-poc',
    '/demo-feedback',
    '/login',
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

// Try to get user from the session cookie.
// P0 auth unification: REAL NextAuth (JWE) sessions are checked first; the
// legacy HS256 custom JWT decode is kept only for back-compat until those
// sessions expire.
async function getUserFromToken(
  req: NextRequest
): Promise<{ userId: string; role: string } | null> {
  // 1) Real NextAuth session (encrypted JWE, decoded via next-auth/jwt)
  const nextAuthSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  const debugAuth = req.nextUrl.searchParams.get('__authdbg') === '1'
  if (debugAuth) {
    console.log('[mw-auth] secretPresent=%s', !!nextAuthSecret)
  }
  if (nextAuthSecret) {
    for (const secureCookie of [true, false]) {
      // Auth.js v5 salts the session JWE with the cookie NAME, so getToken must
      // be told both the cookie name and the matching salt — otherwise the
      // decrypt silently fails and a valid session reads as logged-out (which
      // made every /admin, /teacher, /counselor, /parent route bounce a
      // signed-in user back to /sign-in). Pass them explicitly.
      const cookieName = secureCookie ? '__Secure-authjs.session-token' : 'authjs.session-token'
      try {
        if (debugAuth) {
          const raw = await getToken({
            req,
            secret: nextAuthSecret,
            secureCookie,
            cookieName,
            salt: cookieName,
            raw: true,
          })
          console.log(
            '[mw-auth] secureCookie=%s cookiePresent=%s rawLen=%s',
            secureCookie,
            !!raw,
            typeof raw === 'string' ? raw.length : 0
          )
        }
        const token = await getToken({
          req,
          secret: nextAuthSecret,
          secureCookie,
          cookieName,
          salt: cookieName,
        })
        if (debugAuth) {
          console.log(
            '[mw-auth] secureCookie=%s decoded=%s keys=%s',
            secureCookie,
            !!token,
            token ? Object.keys(token).join(',') : '-'
          )
        }
        const userId = (token?.id as string | undefined) || token?.sub
        if (token && userId) {
          return {
            userId,
            role: ((token.role as string) || 'STUDENT').toUpperCase(),
          }
        }
      } catch (e) {
        if (debugAuth) {
          console.log('[mw-auth] secureCookie=%s threw=%s', secureCookie, (e as Error)?.message)
        }
        // Fall through to the legacy verifier
      }
    }
  }

  // 2) Legacy custom HS256 JWT (forged authjs cookie / MSG91 auth-token)
  try {
    const sessionToken =
      req.cookies.get('__Secure-authjs.session-token')?.value ||
      req.cookies.get('authjs.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value ||
      req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('auth-token')?.value

    if (!sessionToken) {
      return null
    }

    const secret = new TextEncoder().encode(getJWTSecret())
    const { payload } = await jwtVerify(sessionToken, secret)
    const decoded = payload as unknown as FirebaseSessionPayload

    if (decoded && decoded.id) {
      return {
        userId: decoded.id,
        role: (decoded.role || 'student').toUpperCase(),
      }
    }
    return null
  } catch {
    return null
  }
}

/**
 * True when the request carries a NextAuth session cookie (secure or dev name,
 * including the chunked `.0` variant Auth.js writes for large sessions).
 *
 * Why this exists: edge middleware decodes the session JWE with getToken(),
 * but the encrypted-session decrypt is unreliable in the edge runtime for our
 * config — a genuinely signed-in user can read as logged-out here even though
 * the Node-runtime auth() (used by every page/layout and /api/auth/session)
 * decodes the exact same cookie fine. Rather than bounce a valid user at the
 * edge, we let a request that HAS a session cookie fall through to the page's
 * own Node-side guard, which does the authoritative auth() check. API routes
 * stay hard-gated by their own requireAdminAuth/requireAuth, so no data is
 * exposed by this fallthrough — the page shell is all that renders before the
 * server component's auth() decides.
 */
function hasNextAuthSessionCookie(req: NextRequest): boolean {
  return Boolean(
    req.cookies.get('__Secure-authjs.session-token')?.value ||
      req.cookies.get('authjs.session-token')?.value ||
      req.cookies.get('__Secure-authjs.session-token.0')?.value ||
      req.cookies.get('authjs.session-token.0')?.value
  )
}

/**
 * Paths that must be hidden from India IPs. Used by the geo-gate below.
 *
 * China-region cluster (HK / Shanghai / Beijing + HKDSE) targets local +
 * expat international-school families. Indian traffic almost never converts
 * here and dilutes our India NEET authority in Google ranking signals.
 *
 * The geo-gate fires in middleware (not the page component) because the
 * /ib-biology/[city] route is statically generated (dynamicParams=false +
 * generateStaticParams), so any runtime header check inside the page would
 * be bypassed by the static cache. Middleware runs on every request before
 * the static cache is hit.
 */
const HIDE_FROM_INDIA_PATHS = new Set<string>([
  // P1 cluster (IB China + HKDSE)
  '/ib-biology/hong-kong',
  '/ib-biology/shanghai',
  '/ib-biology/beijing',
  '/dse-biology-tutor-hong-kong',
  // P2 cluster (AP Shanghai + AP HK + CNBO + HKBO + IBO China)
  '/ap-biology-tutor-shanghai',
  '/ap-biology-tutor-hong-kong',
  '/cnbo-coaching',
  '/hkbo-coaching',
  '/ibo-coaching-china',
  // P3 cluster (6 IB school-feeders + Shenzhen city + AP Beijing)
  '/ib-biology-tutor-shanghai-american-school',
  '/ib-biology-tutor-scie-shenzhen',
  '/ib-biology-tutor-wab-beijing',
  '/ib-biology-tutor-isb-beijing',
  '/ib-biology-tutor-cis-hong-kong',
  '/ib-biology-tutor-li-po-chun-uwc',
  '/ib-biology/shenzhen',
  '/ap-biology-tutor-beijing',
])

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // SEO redirects relocated from next.config to stay under Vercel's 2048-route
  // cap. Exact-match 301s; run first so they behave like config redirects.
  const relocatedRedirect = middlewareRedirects.get(pathname)
  if (relocatedRedirect) {
    return NextResponse.redirect(new URL(relocatedRedirect, req.url), 301)
  }

  // ============================================
  // GEO: Hide China-region cluster from India IPs
  // ============================================
  // Runs on Vercel before the static-page cache is served, so it gates even
  // pre-rendered routes like /ib-biology/[city]. Note: middleware is NOT
  // invoked for statically-generated pages in `next dev` — verify behaviour
  // post-deploy by curling the URL with an India IP (or via Vercel's
  // edge-region testing).
  if (HIDE_FROM_INDIA_PATHS.has(pathname)) {
    const country = (
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('x-debug-country') ||
      ''
    ).toUpperCase()
    if (country === 'IN') {
      return new NextResponse(
        '<!doctype html><html><head><title>404 - Not Found</title><meta name="robots" content="noindex"></head><body><h1>404 - Page Not Found</h1></body></html>',
        {
          status: 404,
          headers: { 'content-type': 'text/html; charset=utf-8', 'x-geo-blocked': 'IN' },
        }
      )
    }
  }

  // ============================================
  // SEO: Redirect www to non-www (canonical domain)
  // ============================================
  // EXCEPTION: /api/auth/* must NOT be redirected. NEXTAUTH_URL is www, so the
  // OAuth callback (and the whole NextAuth handshake) runs on www. A 301 here
  // fires BEFORE NextAuth's handler and discards the Set-Cookie it would emit —
  // so the session cookie never gets minted and Google/Facebook login lands on
  // an "Authentication Required" loop. Let auth complete on www; the session
  // cookie carries Domain=.cerebrumbiologyacademy.com (see auth.ts) so it's
  // still valid once the app redirects the user to the apex host.
  if (hostname.startsWith('www.') && !pathname.startsWith('/api/auth')) {
    const newUrl = new URL(req.url)
    newUrl.host = hostname.replace('www.', '')
    return NextResponse.redirect(newUrl, { status: 301 })
  }

  // ============================================
  // SEO: Normalize blog tag URLs (spaces/uppercase → slugified)
  // Fixes ~500 GSC 404s from old sitemap that generated unslugified tag URLs
  // ============================================
  if (pathname.startsWith('/blog/tag/')) {
    const rawTag = decodeURIComponent(pathname.slice('/blog/tag/'.length))
    const normalized = rawTag.toLowerCase().replace(/\s+/g, '-')
    if (normalized !== rawTag) {
      return NextResponse.redirect(new URL(`/blog/tag/${normalized}`, req.url), 301)
    }
  }

  // Block demo/test pages in production
  const blockedPrefixes = [
    '/demo',
    '/color-palette',
    '/ai-education-demo',
    '/ceri-ai-demo',
    '/claudechat-demo',
    '/counselor-demo',
    '/security-demo',
    '/testing-demo',
    '/toast-demo',
    '/simple-test-gen',
    '/test-voice',
    '/test-learning',
    '/test-platform',
    '/onboarding/demo',
    '/support/demo',
    '/api/demo',
    '/api/placeholder',
    '/api/cache/demo',
    '/brand-studio',
    '/claudechat-standalone',
    '/api/test',
  ]
  if (process.env.NODE_ENV === 'production') {
    const isBlocked = blockedPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
    )
    if (isBlocked) {
      return NextResponse.redirect(new URL('/', req.url), { status: 302 })
    }
  }

  // SEO: Add X-Robots-Tag headers for query-param and transactional pages.
  // Must be called BEFORE early returns so public routes also get noindex on filtered URLs.
  function addRobotsHeaders(response: NextResponse) {
    const searchParams = req.nextUrl.searchParams
    const hasSearchQuery = searchParams.has('search') || searchParams.has('q')
    const hasFilterQuery = searchParams.has('source')
    if (hasSearchQuery || hasFilterQuery) {
      response.headers.set('X-Robots-Tag', 'noindex, follow')
    }
    if (
      req.nextUrl.search &&
      (pathname.startsWith('/demo-booking') ||
        pathname.startsWith('/enrollments') ||
        pathname.startsWith('/neet-biology-mcq') ||
        pathname.startsWith('/thank-you'))
    ) {
      response.headers.set('X-Robots-Tag', 'noindex, follow')
    }

    // Defensive noindex on internal / dashboard / auth / staff / utility routes.
    // These pages either gate behind auth client-side or are role-scoped portals;
    // none should ever surface in Google search results. Belt-and-suspenders with
    // the auth-protected redirect logic below.
    const noindexPrefixes = [
      '/admin',
      '/consultant',
      '/counselor',
      '/parent',
      '/student',
      '/teacher',
      '/dashboard',
      '/auth',
      '/sign-in',
      '/sign-up',
      '/onboarding',
      '/purchase',
      '/free-resources/admin',
      '/neet-tools/quiz-competition',
    ]
    if (
      noindexPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'))
    ) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    }

    // SEO (2026-07 Wave 0.2): noindex thin scaled-content doorways in the plain
    // neet-coaching family. They stay LIVE for visitors + internal links
    // (follow) — only the index signal is withdrawn, to protect the subdomain's
    // quality signal. Their parent city hub carries the ranking intent.
    //  - school-name doorways: /neet-coaching-<school>-<city>-students (no real
    //    search volume, near-identical copy)
    //  - single-city fees doorways: /neet-coaching-fees-<city> (thin duplicates;
    //    the comparison hub /neet-coaching-fees-comparison stays indexed)
    const isSchoolDoorway = /^\/neet-coaching-[a-z0-9-]+-students$/.test(pathname)
    const isFeesCityDoorway =
      pathname.startsWith('/neet-coaching-fees-') && pathname !== '/neet-coaching-fees-comparison'
    if (isSchoolDoorway || isFeesCityDoorway) {
      response.headers.set('X-Robots-Tag', 'noindex, follow')
    }
  }

  // PERFORMANCE: Check public routes BEFORE JWT verification to skip auth on 90%+ of traffic
  if (isPublicRoute(pathname)) {
    const response = NextResponse.next()
    addSecurityHeaders(response)
    addCSPHeaders(response)
    addRobotsHeaders(response)
    response.cookies.set('x-pathname', pathname, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60,
      path: '/',
    })
    return response
  }

  // ALLOW-BY-DEFAULT: If the route is not explicitly protected or admin,
  // let it through without authentication (so Google can crawl all SEO pages)
  if (!isProtectedRoute(pathname) && !isAdminRoute(pathname) && !pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    addSecurityHeaders(response)
    addCSPHeaders(response)
    addRobotsHeaders(response)
    response.cookies.set('x-pathname', pathname, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60,
      path: '/',
    })
    return response
  }

  const authResult = await getUserFromToken(req)
  const userId = authResult?.userId || null
  const userRole = authResult?.role || null
  // Edge middleware can't always decrypt a valid session JWE (see
  // hasNextAuthSessionCookie). When we couldn't decode a userId but the request
  // clearly carries a session cookie, don't bounce or role-redirect at the
  // edge — let the request through to the page's Node-side auth() guard.
  const hasSession = !userId && hasNextAuthSessionCookie(req)

  // For protected/admin routes, require authentication
  if (!userId && !hasSession && (isProtectedRoute(pathname) || isAdminRoute(pathname))) {
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
    // Signed-in non-admin OR signed-out: render the login page. Forward the
    // pathname as a REQUEST header so the admin layout can detect the /admin/login
    // route and skip its server-side session redirect. Without this the layout
    // sees an empty pathname and bounces signed-out users to /sign-in — making the
    // admin login page unreachable for its intended audience.
    const loginRequestHeaders = new Headers(req.headers)
    loginRequestHeaders.set('x-pathname', pathname)
    return addSecurityHeaders(NextResponse.next({ request: { headers: loginRequestHeaders } }))
  }

  // Protected teacher routes - require TEACHER or ADMIN role
  if (pathname.startsWith('/teacher/')) {
    if (!userId && !hasSession) {
      return NextResponse.redirect(
        new URL('/sign-in?redirect_url=' + encodeURIComponent(pathname), req.url)
      )
    }
    if (userId && userRole !== 'TEACHER' && userRole !== 'ADMIN') {
      // Redirect non-teachers to their appropriate dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Protected counselor routes - require COUNSELOR or ADMIN role
  if (
    pathname.startsWith('/counselor') &&
    pathname !== '/counselor-poc' &&
    pathname !== '/counselor/login'
  ) {
    if (!userId && !hasSession) {
      const loginUrl = new URL('/sign-in', req.url)
      loginUrl.searchParams.set('redirect_url', pathname)
      return NextResponse.redirect(loginUrl)
    }
    if (userId && userRole !== 'COUNSELOR' && userRole !== 'ADMIN') {
      // Redirect non-counselors to their appropriate dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Protected parent routes - require PARENT or ADMIN role
  if (pathname.startsWith('/parent/')) {
    if (!userId && !hasSession) {
      return NextResponse.redirect(
        new URL('/sign-in?redirect_url=' + encodeURIComponent(pathname), req.url)
      )
    }
    if (userId && userRole !== 'PARENT' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Protected student routes - require STUDENT or ADMIN role
  if (pathname.startsWith('/student/')) {
    if (!userId && !hasSession) {
      return NextResponse.redirect(
        new URL('/sign-in?redirect_url=' + encodeURIComponent(pathname), req.url)
      )
    }
    if (userId && userRole !== 'STUDENT' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Protected admin routes - require ADMIN role
  if (isAdminRoute(pathname) && pathname !== '/admin/login') {
    if (!userId && !hasSession) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    if (userId && userRole !== 'ADMIN') {
      // Redirect non-admins to their appropriate dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    // Log admin access for security audit
    if (process.env.NODE_ENV === 'production' && userId) {
      const clientIP =
        req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
      console.log(
        `Admin access: userId=${userId} role=${userRole} accessed ${pathname} from ${clientIP} at ${new Date().toISOString()}`
      )
    }
  }

  // Protected general routes
  if (isProtectedRoute(pathname) && !userId && !hasSession) {
    const loginUrl = new URL('/sign-in', req.url)
    loginUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // API route protection - admin APIs.
  // The edge gate is defense-in-depth; each /api/admin route additionally runs
  // requireAdminAuth() in the Node runtime (which decodes the session reliably).
  // So when the edge couldn't decode a userId but a session cookie is present,
  // let the request reach the route's own Node-side guard instead of 401-ing a
  // real admin whose JWE the edge simply failed to decrypt.
  if (pathname.startsWith('/api/admin/')) {
    if (!userId && !hasSession) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userId && userRole !== 'ADMIN') {
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
    if (!userId && !hasSession) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userId && userRole !== 'TEACHER' && userRole !== 'ADMIN') {
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
    if (!userId && !hasSession) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      )
    }
    if (userId && userRole !== 'COUNSELOR' && userRole !== 'ADMIN') {
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

  // API route protection - consultant APIs. Session required at the edge;
  // the fine-grained gate (a `consultants` profile row, or ADMIN) needs the
  // DB and lives in each route via requireConsultantAccess().
  if (pathname.startsWith('/api/consultant/')) {
    if (!userId && !hasSession) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Authentication required' }, { status: 401 })
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
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60,
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

  // SEO: Add noindex ONLY for search/filter query params (not pagination)
  const searchParams = req.nextUrl.searchParams
  const hasSearchQuery = searchParams.has('search') || searchParams.has('q')
  const hasFilterQuery = searchParams.has('source')
  if (hasSearchQuery || hasFilterQuery) {
    response.headers.set('X-Robots-Tag', 'noindex, follow')
  }
  // Noindex for transactional/filtered pages with query params
  if (
    req.nextUrl.search &&
    (pathname.startsWith('/demo-booking') ||
      pathname.startsWith('/enrollments') ||
      pathname.startsWith('/neet-biology-mcq') ||
      pathname.startsWith('/thank-you'))
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
