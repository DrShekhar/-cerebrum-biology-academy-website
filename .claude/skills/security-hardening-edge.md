# Security Hardening for Edge Runtime

**Purpose:** Implement enterprise-grade security features compatible with Vercel Edge Runtime, replacing Express-based middleware.

**When to use:** After fixing middleware.ts to work with Edge Runtime, before production deployment.

---

## Problem: Express Middleware Incompatible with Edge Runtime

### Current Issue:

**File:** `/src/middleware.ts` (Lines 7-8, 54-61)

```typescript
// TEMPORARILY DISABLED: SecurityHardening uses express-rate-limit/helmet
// which don't work in Edge runtime
// import { securityHardening } from './lib/security/SecurityHardening'

// Code disabled because:
if (!isAIRoute) {
  // const securityResponse = securityHardening.securityMiddleware(request)
  // COMMENTED OUT - incompatible with Edge Runtime
}
```

**Why Disabled:**

- `express-rate-limit` requires Node.js (uses `setTimeout`, `setInterval`)
- `helmet` requires Node.js HTTP headers
- `SecurityHardening.ts` built for Express, not Next.js Edge

**Impact:**

- ⚠️ No rate limiting in middleware
- ⚠️ Security headers manually implemented
- ⚠️ No centralized security configuration

---

## Solution: Edge-Compatible Security

### Architecture

Replace Express-based security with Edge-compatible alternatives:

| Feature            | Express (OLD)        | Edge Runtime (NEW)           |
| ------------------ | -------------------- | ---------------------------- |
| Rate Limiting      | `express-rate-limit` | Vercel Edge Config + Redis   |
| Security Headers   | `helmet`             | Next.js headers + middleware |
| CORS               | `cors` middleware    | Next.js CORS handling        |
| CSRF Protection    | `csurf`              | Custom Edge implementation   |
| Request Validation | `express-validator`  | Custom Edge validation       |

---

## 1. Edge-Compatible Rate Limiting

### Using Vercel Edge Config + Redis

**File:** `/src/lib/security/EdgeRateLimiter.ts`

```typescript
/**
 * Edge Runtime Compatible Rate Limiter
 * Uses Vercel Edge Config for configuration
 * Uses Upstash Redis for distributed rate limiting
 */

import { get } from '@vercel/edge-config'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

interface RateLimitConfig {
  requests: number
  window: string // '10s', '1m', '1h'
}

class EdgeRateLimiter {
  private limiters: Map<string, Ratelimit>

  constructor() {
    this.limiters = new Map()
  }

  /**
   * Get or create rate limiter for a route
   */
  private async getLimiter(route: string): Promise<Ratelimit> {
    // Check if already created
    if (this.limiters.has(route)) {
      return this.limiters.get(route)!
    }

    // Load config from Vercel Edge Config
    const config = await this.loadConfig(route)

    // Create Redis-backed rate limiter
    const redis = Redis.fromEnv()
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.requests, config.window),
      analytics: true,
      prefix: `ratelimit:${route}`,
    })

    this.limiters.set(route, limiter)
    return limiter
  }

  /**
   * Load rate limit configuration
   */
  private async loadConfig(route: string): Promise<RateLimitConfig> {
    // Try to load from Vercel Edge Config
    try {
      const edgeConfig = await get<Record<string, RateLimitConfig>>('rateLimits')
      if (edgeConfig && edgeConfig[route]) {
        return edgeConfig[route]
      }
    } catch (error) {
      console.warn('Edge Config not available, using defaults')
    }

    // Default configurations
    const defaults: Record<string, RateLimitConfig> = {
      '/api/auth': { requests: 5, window: '15m' },
      '/api/payments': { requests: 10, window: '1h' },
      '/api/contact': { requests: 3, window: '10m' },
      '/api/signup': { requests: 2, window: '1h' },
      default: { requests: 60, window: '1m' },
    }

    return defaults[route] || defaults.default
  }

  /**
   * Check if request should be rate limited
   */
  async checkLimit(
    identifier: string,
    route: string
  ): Promise<{
    success: boolean
    limit: number
    remaining: number
    reset: number
  }> {
    const limiter = await this.getLimiter(route)

    try {
      const { success, limit, remaining, reset } = await limiter.limit(identifier)

      return {
        success,
        limit,
        remaining,
        reset,
      }
    } catch (error) {
      // If Redis unavailable, allow request but log
      console.error('Rate limiter error:', error)
      return {
        success: true,
        limit: 0,
        remaining: 0,
        reset: 0,
      }
    }
  }

  /**
   * Get client identifier from request
   */
  getIdentifier(request: Request): string {
    // Try to get real IP from headers
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }

    const realIp = request.headers.get('x-real-ip')
    if (realIp) {
      return realIp
    }

    // Fallback to CF-Connecting-IP (Cloudflare)
    const cfIp = request.headers.get('cf-connecting-ip')
    if (cfIp) {
      return cfIp
    }

    // Last resort: use user-agent + referer hash
    const ua = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || 'unknown'
    return `${ua}-${referer}`.substring(0, 50)
  }
}

// Singleton instance
export const edgeRateLimiter = new EdgeRateLimiter()
```

**Usage in Middleware:**

```typescript
// src/middleware.ts
import { edgeRateLimiter } from './lib/security/EdgeRateLimiter'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Apply rate limiting
  const identifier = edgeRateLimiter.getIdentifier(request)
  const { success, limit, remaining, reset } = await edgeRateLimiter.checkLimit(
    identifier,
    pathname
  )

  if (!success) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        limit,
        reset: new Date(reset).toISOString(),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
        },
      }
    )
  }

  // Add rate limit headers to successful requests
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', limit.toString())
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  response.headers.set('X-RateLimit-Reset', reset.toString())

  return response
}
```

---

## 2. Security Headers (Edge-Compatible)

### Replace Helmet with Next.js Headers

**File:** `/src/lib/security/EdgeSecurityHeaders.ts`

```typescript
/**
 * Edge Runtime Compatible Security Headers
 * Replaces Helmet.js for Next.js Edge Runtime
 */

import { NextResponse } from 'next/server'

interface SecurityHeadersConfig {
  contentSecurityPolicy?: boolean
  strictTransportSecurity?: boolean
  xFrameOptions?: string
  xContentTypeOptions?: boolean
  referrerPolicy?: string
  permissionsPolicy?: string
}

class EdgeSecurityHeaders {
  private config: SecurityHeadersConfig

  constructor(config: SecurityHeadersConfig = {}) {
    this.config = {
      contentSecurityPolicy: true,
      strictTransportSecurity: true,
      xFrameOptions: 'DENY',
      xContentTypeOptions: true,
      referrerPolicy: 'strict-origin-when-cross-origin',
      permissionsPolicy: 'camera=(), microphone=(), geolocation=()',
      ...config,
    }
  }

  /**
   * Apply security headers to response
   */
  applyHeaders(response: NextResponse, nonce?: string): NextResponse {
    // X-Frame-Options
    if (this.config.xFrameOptions) {
      response.headers.set('X-Frame-Options', this.config.xFrameOptions)
    }

    // X-Content-Type-Options
    if (this.config.xContentTypeOptions) {
      response.headers.set('X-Content-Type-Options', 'nosniff')
    }

    // X-XSS-Protection (deprecated but still useful)
    response.headers.set('X-XSS-Protection', '1; mode=block')

    // Referrer Policy
    if (this.config.referrerPolicy) {
      response.headers.set('Referrer-Policy', this.config.referrerPolicy)
    }

    // Strict-Transport-Security (HSTS)
    if (this.config.strictTransportSecurity) {
      response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    }

    // Permissions Policy (Feature Policy)
    if (this.config.permissionsPolicy) {
      response.headers.set('Permissions-Policy', this.config.permissionsPolicy)
    }

    // Content-Security-Policy
    if (this.config.contentSecurityPolicy) {
      const csp = this.buildCSP(nonce)
      response.headers.set('Content-Security-Policy', csp)
    }

    // Remove server information
    response.headers.delete('Server')
    response.headers.delete('X-Powered-By')

    return response
  }

  /**
   * Build Content Security Policy
   */
  private buildCSP(nonce?: string): string {
    const directives = [
      "default-src 'self'",
      nonce
        ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://vercel.live`
        : "script-src 'self' 'unsafe-inline' https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.cerebrumbiologyacademy.com",
      "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
      "media-src 'self' https: data: blob:",
      "object-src 'none'",
      "worker-src 'self' blob:",
      'upgrade-insecure-requests',
    ]

    // Add report-uri in production
    if (process.env.NODE_ENV === 'production') {
      directives.push('report-uri /api/security/csp-report')
    }

    return directives.join('; ')
  }

  /**
   * Generate cryptographic nonce for CSP
   */
  generateNonce(): string {
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array))
  }
}

// Export singleton
export const edgeSecurityHeaders = new EdgeSecurityHeaders()
```

---

## 3. CSRF Protection (Edge-Compatible)

**File:** `/src/lib/security/EdgeCSRFProtection.ts`

```typescript
/**
 * Edge Runtime Compatible CSRF Protection
 * Replaces csurf middleware
 */

import { NextRequest, NextResponse } from 'next/server'

class EdgeCSRFProtection {
  private readonly CSRF_COOKIE_NAME = 'csrf-token'
  private readonly CSRF_HEADER_NAME = 'x-csrf-token'

  /**
   * Generate CSRF token
   */
  generateToken(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array)).replace(/[+/=]/g, '')
  }

  /**
   * Set CSRF token in cookie
   */
  setToken(response: NextResponse, token: string): NextResponse {
    response.cookies.set(this.CSRF_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return response
  }

  /**
   * Verify CSRF token
   */
  async verifyToken(request: NextRequest): Promise<boolean> {
    // Skip for GET, HEAD, OPTIONS
    if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return true
    }

    // Get token from cookie
    const cookieToken = request.cookies.get(this.CSRF_COOKIE_NAME)?.value

    // Get token from header
    const headerToken = request.headers.get(this.CSRF_HEADER_NAME)

    // Both must be present and match
    if (!cookieToken || !headerToken) {
      return false
    }

    // Constant-time comparison to prevent timing attacks
    return this.constantTimeCompare(cookieToken, headerToken)
  }

  /**
   * Constant-time string comparison
   */
  private constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false
    }

    let result = 0
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i)
    }

    return result === 0
  }
}

// Export singleton
export const edgeCSRFProtection = new EdgeCSRFProtection()
```

**Usage in Middleware:**

```typescript
// src/middleware.ts
import { edgeCSRFProtection } from './lib/security/EdgeCSRFProtection'

export async function middleware(request: NextRequest) {
  // Verify CSRF for state-changing requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const isValid = await edgeCSRFProtection.verifyToken(request)

    if (!isValid) {
      return new NextResponse(JSON.stringify({ error: 'Invalid CSRF token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  const response = NextResponse.next()

  // Set CSRF token for all responses
  const token = edgeCSRFProtection.generateToken()
  edgeCSRFProtection.setToken(response, token)

  return response
}
```

---

## 4. Complete Edge-Compatible Middleware

**File:** `/src/middleware.ts` (UPDATED)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { edgeRateLimiter } from './lib/security/EdgeRateLimiter'
import { edgeSecurityHeaders } from './lib/security/EdgeSecurityHeaders'
import { edgeCSRFProtection } from './lib/security/EdgeCSRFProtection'

// Protected routes requiring authentication
const PROTECTED_ROUTES = ['/dashboard', '/admin', '/api/payments', '/api/user']

// Public routes (no auth required)
const PUBLIC_ROUTES = ['/', '/courses', '/about', '/contact', '/pricing']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip security for static assets
  if (pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // 1. RATE LIMITING
  const identifier = edgeRateLimiter.getIdentifier(request)
  const rateLimit = await edgeRateLimiter.checkLimit(identifier, pathname)

  if (!rateLimit.success) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': rateLimit.limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': rateLimit.reset.toString(),
        'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
      },
    })
  }

  // 2. CSRF PROTECTION
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const csrfValid = await edgeCSRFProtection.verifyToken(request)
    if (!csrfValid) {
      return new NextResponse(JSON.stringify({ error: 'Invalid CSRF token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  // 3. AUTHENTICATION (for protected routes)
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  const isPublic = PUBLIC_ROUTES.some((route) => pathname === route)

  if (isProtected && !isPublic) {
    const authValid = await checkAuthentication(request)
    if (!authValid) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // 4. CREATE RESPONSE
  const response = NextResponse.next()

  // 5. APPLY SECURITY HEADERS
  const nonce = edgeSecurityHeaders.generateNonce()
  edgeSecurityHeaders.applyHeaders(response, nonce)

  // 6. SET CSRF TOKEN
  const csrfToken = edgeCSRFProtection.generateToken()
  edgeCSRFProtection.setToken(response, csrfToken)

  // 7. ADD RATE LIMIT HEADERS
  response.headers.set('X-RateLimit-Limit', rateLimit.limit.toString())
  response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString())

  return response
}

async function checkAuthentication(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('auth-token')?.value
  return !!token // Simplified - implement proper JWT validation
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
```

---

## 5. Setup Instructions

### Step 1: Install Dependencies

```bash
npm install @upstash/ratelimit @upstash/redis @vercel/edge-config
```

### Step 2: Configure Upstash Redis

1. Create account at https://console.upstash.com
2. Create Redis database
3. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
4. Add to Vercel environment variables:

```bash
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
```

### Step 3: Configure Vercel Edge Config (Optional)

```bash
# Create Edge Config
vercel edge-config create rate-limits

# Add rate limit configuration
vercel edge-config set rateLimits '{
  "/api/auth": { "requests": 5, "window": "15m" },
  "/api/payments": { "requests": 10, "window": "1h" }
}'
```

### Step 4: Deploy Updated Middleware

```bash
git add src/middleware.ts src/lib/security/
git commit -m "feat: Implement Edge-compatible security middleware"
git push origin main
```

---

## Success Metrics

**Target:**

- ✅ All security features work on Edge Runtime
- ✅ Rate limiting: < 10ms overhead per request
- ✅ Security headers: 100% coverage
- ✅ CSRF protection: 100% of state-changing requests
- ✅ Zero Express dependencies

**Testing:**

```bash
# Test rate limiting
for i in {1..10}; do curl https://cerebrumbiologyacademy.com/api/test; done

# Test CSRF protection
curl -X POST https://cerebrumbiologyacademy.com/api/test
# Should return 403 without CSRF token

# Test security headers
curl -I https://cerebrumbiologyacademy.com
# Should include X-Frame-Options, CSP, etc.
```

---

_This skill replaces Express-based security with Edge-compatible solutions, enabling full security hardening on Vercel Edge Runtime._
