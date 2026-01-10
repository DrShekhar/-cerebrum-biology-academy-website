# Authentication Session Precedence Rules

## Overview

The Cerebrum Biology Academy application uses a **dual-authentication system** during its migration from NextAuth/custom JWT to Clerk. This document explains how the two systems interact and which takes precedence in different scenarios.

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MIDDLEWARE LAYER                            │
│                     (middleware.ts - Clerk)                        │
│                                                                     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │  Public Routes  │    │ Protected Routes│    │  Admin Routes   │ │
│  │   (no auth)     │    │ (Clerk userId)  │    │(Clerk + role)   │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           API LAYER                                 │
│                                                                     │
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │     Clerk-Protected APIs    │  │    Legacy Auth APIs           ││
│  │  /api/admin/*, /api/teacher/│  │  /api/auth/*, /api/test/*     ││
│  │  (middleware handles auth)  │  │  (validateUserSession)        ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## Session Precedence Order

### 1. Middleware Level (Clerk - PRIMARY)

**File**: `middleware.ts`

Clerk middleware runs FIRST on all requests and has highest precedence:

```typescript
export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const userRole = sessionClaims?.metadata?.role?.toUpperCase()

  // All protected routes require Clerk userId
  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(signInUrl)
  }
})
```

**Behavior**:
- If Clerk session exists → user is authenticated at middleware level
- If no Clerk session → redirected to `/sign-in` for protected routes
- Role checking uses `sessionClaims.metadata.role` from Clerk Dashboard

### 2. API Route Level (Legacy Auth - SECONDARY)

**File**: `src/lib/auth/config.ts` → `validateUserSession()`

Some API routes (especially OTP/phone auth) use legacy authentication:

```typescript
// Precedence within validateUserSession():
1. NextAuth session via auth() helper
2. Manual NextAuth cookie parsing (__Secure-authjs.session-token, etc.)
3. Custom JWT from 'auth-token' cookie or Authorization header
```

**Routes Still Using Legacy Auth**:
- `/api/auth/signin` - Custom email/password login
- `/api/auth/signup` - Custom registration
- `/api/auth/change-password` - Password change (uses `withAuth` middleware)
- `/api/auth/refresh` - Token refresh
- `/api/test/*` - Test-taking APIs
- `/api/questions/*` - Question management
- `/api/progress/*` - Progress tracking

## Public Routes (No Auth Required)

Defined in `middleware.ts`:

```typescript
const isPublicRoute = createRouteMatcher([
  '/',
  '/courses(.*)',
  '/about',
  '/contact',
  '/blog(.*)',
  '/gallery(.*)',
  '/pricing(.*)',
  '/results(.*)',
  '/faculty(.*)',
  '/demo-booking(.*)',
  '/admissions(.*)',
  '/faq(.*)',
  '/testimonials(.*)',
  '/timetable(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/auth/(.*)',
  '/api/auth/(.*)',      // OTP login endpoints
  '/api/public/(.*)',
  '/api/webhooks/(.*)',
])
```

## Role-Based Access Control

### Middleware Level (Clerk)

```typescript
// Admin routes require ADMIN role from Clerk session claims
if (pathname.startsWith('/api/admin/')) {
  if (!userId) return 401
  if (userRole !== 'ADMIN') return 403
}

// Teacher routes allow TEACHER or ADMIN
if (pathname.startsWith('/api/teacher/')) {
  if (userRole !== 'TEACHER' && userRole !== 'ADMIN') return 403
}

// Counselor routes allow COUNSELOR or ADMIN
if (pathname.startsWith('/api/counselor/')) {
  if (userRole !== 'COUNSELOR' && userRole !== 'ADMIN') return 403
}
```

### API Level (Legacy `withRole` Middleware)

**File**: `src/lib/auth/middleware.ts`

```typescript
// Allows specific roles
export function withRole(allowedRoles: UserRole[], handler) {
  return withAuth(async (request, session) => {
    if (!allowedRoles.includes(session.role)) {
      return 403 // INSUFFICIENT_PERMISSIONS
    }
    return handler(request, session)
  })
}

// Convenience wrappers
export const withAdmin = (h) => withRole(['ADMIN'], h)
export const withTeacher = (h) => withRole(['TEACHER', 'ADMIN'], h)
export const withCounselor = (h) => withRole(['COUNSELOR', 'ADMIN'], h)
export const withStudent = (h) => withRole(['STUDENT'], h)
```

## Conflict Resolution

When both auth systems could apply:

| Scenario | Resolution |
|----------|------------|
| Clerk session + Legacy session | Clerk takes precedence (middleware runs first) |
| Clerk session only | User authenticated everywhere |
| Legacy session only | Only works on `/api/auth/*` routes |
| No sessions | Unauthenticated |

### Example Flow

1. User visits `/dashboard`:
   - Middleware checks Clerk `userId` → if missing, redirect to `/sign-in`

2. User calls `/api/auth/change-password`:
   - Middleware: Route is in `isPublicRoute` (`/api/auth/*`) → passes through
   - API Route: `withAuth` middleware calls `validateUserSession()`
   - `validateUserSession` checks: NextAuth → Cookie → JWT

3. User calls `/api/admin/users`:
   - Middleware checks Clerk `userId` AND `userRole === 'ADMIN'`
   - If both pass → request proceeds to API handler

## Client-Side Authentication

**File**: `src/contexts/AuthContext.tsx`

The `AuthContext` provides client-side state for legacy auth:

```typescript
// Checks auth status via /api/auth/refresh
const initializeAuth = async () => {
  const response = await fetch('/api/auth/refresh', {
    method: 'GET',
    credentials: 'include',
  })
  if (response.ok && data.valid) {
    setUser(data.user)
  }
}
```

**Note**: For Clerk-protected routes, use Clerk's `useAuth()` or `useUser()` hooks instead.

## Migration Status

### ✅ Active (Keep)
- `PasswordUtils` - Password hashing/validation
- `ROLE_PERMISSIONS` - Permission definitions
- `addSecurityHeaders` - Security headers
- `ALLOWED_ORIGINS` - CORS configuration

### ⚠️ Deprecated (To Be Removed)
- `TokenUtils` - Use Clerk session tokens
- `SessionManager` - Use Clerk session management
- `CookieManager` - Use Clerk cookie handling
- `validateUserSession` - Use `auth()` from `@clerk/nextjs/server`
- `requireAuth`/`optionalAuth` - Use Clerk middleware
- `AuthRateLimit` - Use Clerk's built-in rate limiting

### 📋 Migration TODO
- [ ] Migrate `/api/auth/*` routes to Clerk
- [ ] Migrate `/api/test/*` to Clerk authentication
- [ ] Migrate `/api/questions/*` to Clerk authentication
- [ ] Migrate `/api/progress/*` to Clerk authentication
- [ ] Remove legacy auth code after migration complete

## Security Considerations

1. **Session Claims Setup**: Role must be configured in Clerk Dashboard:
   ```json
   { "metadata": "{{user.public_metadata}}" }
   ```

2. **Cookie Security**: Both systems use:
   - `httpOnly: true` - Prevents XSS access
   - `secure: true` (production) - HTTPS only
   - `sameSite: 'lax'` - CSRF protection

3. **Token Expiration**:
   - Clerk: Managed automatically
   - Legacy JWT: 15 minutes access, 7 days refresh

4. **Rate Limiting**:
   - Legacy: `AuthRateLimit` class (in-memory, deprecated)
   - Recommended: Use Upstash Redis rate limiting

## Debugging Auth Issues

### Check Clerk Session
```typescript
// Server Component / API Route
import { auth } from '@clerk/nextjs/server'
const { userId, sessionClaims } = await auth()
console.log('Clerk:', { userId, role: sessionClaims?.metadata?.role })
```

### Check Legacy Session
```typescript
// API Route
import { validateUserSession } from '@/lib/auth/config'
const session = await validateUserSession(request)
console.log('Legacy:', { valid: session.valid, role: session.role })
```

### Debug Headers (Development Only)
When `NODE_ENV === 'development'` and user is authenticated:
- `X-Clerk-User-ID`: Clerk user ID
- `X-User-Role`: User role from session claims
