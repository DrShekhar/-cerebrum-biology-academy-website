# Authentication Fix Guide - Complete Implementation Plan

## 🎯 Executive Summary

**Problem:** Authentication is completely broken due to:

1. Missing AuthProvider wrapper in root layout
2. Wrong authentication hook imported in signin/signup pages
3. Conflicting dual authentication systems (InstantDB vs Prisma)
4. Type mismatches and missing methods

**Impact:** Users cannot sign in, sign up, or access protected features.

**Time to Fix:** 30 minutes - 2 hours (depending on chosen approach)

**Recommended Approach:** Quick Fix first, then architectural cleanup later.

---

## 📋 Table of Contents

1. [Critical Issues Breakdown](#critical-issues-breakdown)
2. [Quick Fix (30 minutes)](#quick-fix-30-minutes)
3. [Complete Fix (2 hours)](#complete-fix-2-hours)
4. [Testing Checklist](#testing-checklist)
5. [Troubleshooting Guide](#troubleshooting-guide)
6. [Architecture Decisions](#architecture-decisions)

---

## 🔴 Critical Issues Breakdown

### Issue #1: Missing AuthProvider Wrapper

**Severity:** CRITICAL - Blocks ALL authentication
**File:** `src/app/layout.tsx`
**Current State:** App is NOT wrapped with AuthProvider
**Impact:** Auth context undefined everywhere, all `useAuth()` calls fail

**Visual:**

```tsx
// ❌ CURRENT (BROKEN)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* Tries to use useAuth() - FAILS */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// ✅ REQUIRED (WORKING)
import { AuthProvider } from '@/contexts/AuthContext'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {' '}
          {/* Wraps entire app */}
          <Header /> {/* Now useAuth() works! */}
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
```

---

### Issue #2: Wrong Hook in Sign In Page

**Severity:** CRITICAL - Compilation error
**File:** `src/app/auth/signin/page.tsx`
**Line:** 41, 139
**Error:** `Argument of type '{ email: string; password: string; }' is not assignable to parameter of type 'string'`

**Root Cause:**

```tsx
// ❌ CURRENT (BROKEN)
import { useAuth } from '@/hooks/useAuth' // InstantDB hook

const { signInWithEmail } = useAuth()

// This function signature:
signInWithEmail: (email: string) => Promise<any> // Only takes email!

// But being called with:
await signInWithEmail({ email, password }) // Passing object with password!
```

**Two Authentication Systems Discovered:**

**System A: InstantDB** (`/src/hooks/useAuth.ts`)

- Magic link / OTP only
- Methods: `sendOtp()`, `verifyOtp()`, `signInWithEmail(email)`
- No password support
- Database: InstantDB cloud

**System B: Prisma/NextAuth** (`/src/contexts/AuthContext.tsx`)

- Email/password authentication
- Methods: `login(email, password)`, `signup(data)`, `logout()`
- Full session management
- Database: PostgreSQL via Prisma
- API routes: `/api/auth/signin`, `/api/auth/signup`

**The Problem:** Sign in page imports System A but needs System B!

**Fix:**

```tsx
// ✅ CORRECT
import { useAuth } from '@/contexts/AuthContext' // Prisma/NextAuth

const { login } = useAuth() // Has correct signature

await login(email, password) // Works!
```

---

### Issue #3: Missing 'register' Method in Sign Up

**Severity:** CRITICAL - Compilation error
**File:** `src/app/auth/signup/page.tsx`
**Lines:** 49, 112
**Error:** `Property 'register' does not exist on type...`

**Root Cause:**

```tsx
// ❌ CURRENT (BROKEN)
import { useAuth } from '@/hooks/useAuth' // InstantDB hook

const { register } = useAuth() // 'register' doesn't exist in this hook!

await register({ name, email, password }) // Method doesn't exist!
```

**What InstantDB hook provides:**

```typescript
{
  sendOtp,
  verifyOtp,
  signInWithEmail,  // NOT 'register'
  signOut,
  createUserProfile,
  // ... no 'register' method
}
```

**What AuthContext provides:**

```typescript
{
  login,
  signup,  // This is the registration method!
  logout,
  user,
  isAuthenticated,
  // ...
}
```

**Fix:**

```tsx
// ✅ CORRECT
import { useAuth } from '@/contexts/AuthContext'

const { signup } = useAuth() // Use 'signup' not 'register'

await signup({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  phone: formData.mobile,
  role: formData.role === 'student' ? 'STUDENT' : 'PARENT',
  grade: formData.currentClass,
  agreeToTerms: true,
})
```

---

### Issue #4: Dual Authentication Architecture

**Severity:** HIGH - Architectural confusion
**Impact:** Type errors, missing methods, maintenance nightmare

**Current State:**

```
┌─────────────────────────────────────────┐
│  Sign In/Sign Up Pages                  │
├─────────────────────────────────────────┤
│  Trying to use:                         │
│  - Email/password forms                 │
│  - OTP/magic link flows                 │
│  - Both simultaneously!                 │
└──────────┬──────────────────────────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
┌─────────┐   ┌──────────────┐
│InstantDB│   │Prisma/NextAuth│
│(OTP)    │   │(Email/Pass)   │
└─────────┘   └──────────────┘
   CONFLICT!
```

**Decision Required:** Choose ONE system (see Architecture Decisions section)

---

## ⚡ Quick Fix (30 minutes)

This gets authentication working immediately without architectural changes.

### Step 1: Add AuthProvider Wrapper (5 minutes)

**File:** `src/app/layout.tsx`

**Action:** Add ONE line at the top and wrap the body content

```tsx
'use client' // Add this if not already present

import { AuthProvider } from '@/contexts/AuthContext' // Add this import

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {' '}
          {/* ADD THIS LINE */}
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <MobileBottomNav />
        </AuthProvider>{' '}
        {/* ADD THIS LINE */}
      </body>
    </html>
  )
}
```

**⚠️ Important:** If layout.tsx is a Server Component, you may need to create a client wrapper:

```tsx
// Create new file: src/components/providers/Providers.tsx
'use client'

import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

// Then in layout.tsx:
import { Providers } from '@/components/providers/Providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
```

---

### Step 2: Fix Sign In Page (10 minutes)

**File:** `src/app/auth/signin/page.tsx`

**Change 1: Update Import (Line 41)**

```tsx
// ❌ REMOVE THIS:
import { useAuth } from '@/hooks/useAuth'

// ✅ ADD THIS:
import { useAuth } from '@/contexts/AuthContext'
```

**Change 2: Update Destructuring (Line ~50)**

```tsx
// ❌ REMOVE THIS:
const { sendOtp, verifyOtp, signInWithEmail, isSubmitting } = useAuth()

// ✅ ADD THIS:
const { login, isSubmitting } = useAuth()
```

**Change 3: Update Email Sign In Handler (Lines ~130-150)**

Find the function `handleEmailSignIn` and replace it:

```tsx
// ❌ REMOVE THIS:
const handleEmailSignIn = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  try {
    const result = await signInWithEmail({ email, password }) // WRONG

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Sign in failed')
    }
  } catch (err: any) {
    setError(err.message || 'Sign in failed')
  }
}

// ✅ ADD THIS:
const handleEmailSignIn = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  try {
    const result = await login(email, password, rememberMe) // CORRECT

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Sign in failed')
    }
  } catch (err: any) {
    setError(err.message || 'Sign in failed')
  }
}
```

**⚠️ Note:** If you want to keep OTP functionality, you'll need BOTH hooks:

```tsx
import { useAuth as usePrismaAuth } from '@/contexts/AuthContext'
import { useAuth as useInstantAuth } from '@/hooks/useAuth'

const { login } = usePrismaAuth() // For email/password
const { sendOtp, verifyOtp } = useInstantAuth() // For OTP (if keeping)
```

---

### Step 3: Fix Sign Up Page (10 minutes)

**File:** `src/app/auth/signup/page.tsx`

**Change 1: Update Import (Line ~22)**

```tsx
// ❌ REMOVE THIS:
import { useAuth } from '@/hooks/useAuth'

// ✅ ADD THIS:
import { useAuth } from '@/contexts/AuthContext'
```

**Change 2: Update Destructuring (Line ~49)**

```tsx
// ❌ REMOVE THIS:
const { sendOtp, verifyOtp, register, isSubmitting } = useAuth()

// ✅ ADD THIS:
const { signup, isSubmitting } = useAuth()
```

**Change 3: Update Registration Handler (Lines ~96-130)**

Find the email registration handler and update it:

```tsx
// ❌ REMOVE THIS:
const result = await register({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  mobile: formData.mobile,
  // ...
})

// ✅ ADD THIS:
const result = await signup({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  phone: formData.mobile, // Note: 'phone' not 'mobile'
  role: formData.role === 'student' ? 'STUDENT' : 'PARENT',
  grade: formData.currentClass,
  agreeToTerms: true,
})
```

**Full Handler Example:**

```tsx
const handleEmailRegistration = async (e: React.FormEvent) => {
  e.preventDefault()

  // Validation
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match')
    return
  }

  if (formData.password.length < 8) {
    setError('Password must be at least 8 characters')
    return
  }

  if (!formData.agreeToTerms) {
    setError('Please agree to the terms and conditions')
    return
  }

  setError('')

  try {
    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.mobile,
      role: formData.role === 'student' ? 'STUDENT' : 'PARENT',
      grade: formData.currentClass,
      agreeToTerms: true,
    })

    if (result.success) {
      // Success! Redirect to dashboard
      router.push('/dashboard')
    } else {
      setError(result.error || 'Registration failed')
    }
  } catch (err: any) {
    console.error('Registration error:', err)
    setError(err.message || 'Registration failed. Please try again.')
  }
}
```

---

### Step 4: Test Authentication (5 minutes)

**Test Sign Up:**

1. Go to http://localhost:3000/auth/signup
2. Fill in all fields with test data
3. Click "Sign Up"
4. Should redirect to /dashboard

**Test Sign In:**

1. Go to http://localhost:3000/auth/signin
2. Enter the email/password you just created
3. Click "Sign In"
4. Should redirect to /dashboard

**Check Database:**

```bash
# Open Prisma Studio
npx prisma studio

# Check User table
# Should see your newly created user
```

**Check Console:**

- Open browser DevTools (F12)
- Look for any errors in Console tab
- Network tab should show successful API calls to /api/auth/signin or /api/auth/signup

---

## 🏗️ Complete Fix (2 hours)

This includes Quick Fix + architectural cleanup for production readiness.

### Phase 1: Quick Fixes (30 minutes)

Complete all steps from [Quick Fix](#quick-fix-30-minutes) section above.

---

### Phase 2: Choose Authentication Architecture (30 minutes)

**Decision Point:** Which authentication system to keep?

#### Option A: Keep Prisma/NextAuth (RECOMMENDED)

**Pros:**

- ✅ More mature, production-ready
- ✅ Better session management
- ✅ Supports email/password out of the box
- ✅ API routes already implemented
- ✅ Works with your existing PostgreSQL database
- ✅ Easier to add OAuth providers later (Google, GitHub, etc.)

**Cons:**

- ❌ Requires database setup
- ❌ More complex than magic links

**Implementation:**

- Keep: `/src/contexts/AuthContext.tsx`, `/src/lib/auth.ts`, `/src/app/api/auth/*`
- Remove: `/src/hooks/useAuth.ts`, `/src/lib/db.ts`, `/src/lib/db-admin.ts`
- Update: All components to use `@/contexts/AuthContext`

---

#### Option B: Keep InstantDB

**Pros:**

- ✅ Simpler setup, no database needed
- ✅ Built-in magic link/OTP
- ✅ Hosted solution
- ✅ Good for rapid prototyping

**Cons:**

- ❌ Less mature
- ❌ Requires InstantDB account/credentials
- ❌ No password support (magic link only)
- ❌ May have scaling limitations

**Implementation:**

- Keep: `/src/hooks/useAuth.ts`, `/src/lib/db.ts`
- Remove: `/src/contexts/AuthContext.tsx`, `/src/lib/auth.ts`, `/src/app/api/auth/*`
- Add: Password support or stick with OTP-only
- Update: All components to use OTP flow

---

#### Option C: Hybrid Approach (COMPLEX - NOT RECOMMENDED)

Keep both systems for different purposes:

- Prisma for email/password (students, teachers)
- InstantDB for OTP (quick guest access)

**Only choose this if you have specific business requirements!**

---

### Phase 3: Remove Conflicting System (30 minutes)

**If you chose Prisma (Recommended):**

**Files to Delete:**

```bash
rm src/hooks/useAuth.ts
rm src/lib/db.ts
rm src/lib/db-admin.ts
# Also remove any API routes using InstantDB
```

**Files to Update:**

1. **Remove InstantDB from package.json:**

```bash
npm uninstall @instantdb/react @instantdb/admin
```

2. **Clean up environment variables:**
   Remove from `.env.local`:

```bash
# Delete these lines:
NEXT_PUBLIC_INSTANT_APP_ID=...
INSTANT_APP_ADMIN_TOKEN=...
```

3. **Update any remaining components using InstantDB**

Search for imports:

```bash
grep -r "from '@/hooks/useAuth'" src/
grep -r "from '@/lib/db'" src/
```

Change all to use AuthContext instead.

---

**If you chose InstantDB:**

**Files to Delete:**

```bash
rm -rf src/app/api/auth/
rm src/contexts/AuthContext.tsx
rm src/lib/auth.ts
```

**Files to Update:**

1. **Remove Prisma auth from package.json** (keep Prisma for other models)
2. **Update all auth components to use OTP flow**
3. **Remove password fields from forms** (if going OTP-only)

---

### Phase 4: Add Authentication Middleware (20 minutes)

**Create:** `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get auth token from cookies
  const token = request.cookies.get('auth-token')?.value
  const sessionId = request.cookies.get('session-id')?.value

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/tests']
  const authRoutes = ['/auth/signin', '/auth/signup']

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Redirect to signin if accessing protected route without auth
  if (isProtectedRoute && !token && !sessionId) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Redirect to dashboard if accessing auth routes while authenticated
  if (isAuthRoute && (token || sessionId)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/tests/:path*',
    '/auth/:path*',
  ],
}
```

---

### Phase 5: Add Environment Variables (10 minutes)

**Create or update:** `.env.local`

```bash
# Database (for Prisma)
DATABASE_URL="postgresql://username:password@localhost:5432/cerebrum_db"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Admin User (for seeding)
ADMIN_EMAIL="admin@cerebrumbiologyacademy.com"
ADMIN_PASSWORD_HASH="generate-with-bcrypt"
ADMIN_NAME="Admin User"

# Session Configuration
SESSION_SECRET="generate-another-secret"
SESSION_MAX_AGE="604800"  # 7 days in seconds

# Optional: OAuth Providers (for future)
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Generate Secrets:**

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate admin password hash (Node.js)
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('your-password', 10, (err, hash) => console.log(hash));"
```

---

### Phase 6: Test Complete Flow (10 minutes)

**Test Checklist:**

**Sign Up Flow:**

- [ ] Go to /auth/signup
- [ ] Fill form with valid data
- [ ] Click submit
- [ ] Should redirect to /dashboard
- [ ] User should appear in database
- [ ] No console errors

**Sign In Flow:**

- [ ] Sign out first
- [ ] Go to /auth/signin
- [ ] Enter correct credentials
- [ ] Should redirect to /dashboard
- [ ] Session should persist on refresh
- [ ] No console errors

**Protected Routes:**

- [ ] Sign out
- [ ] Try to access /dashboard directly
- [ ] Should redirect to /auth/signin
- [ ] Sign in
- [ ] Should redirect back to /dashboard

**Sign Out:**

- [ ] Click sign out button
- [ ] Should clear session
- [ ] Should redirect to homepage
- [ ] Protected routes should be inaccessible

---

## ✅ Testing Checklist

### Unit Tests (Manual)

**Sign Up:**

```bash
# Test Data
Name: Test User
Email: test@example.com
Password: Test123456
Phone: 9876543210
Role: Student
Class: 12
```

**Expected Results:**

- ✅ Form validation works
- ✅ API call to /api/auth/signup succeeds
- ✅ User created in database
- ✅ Session cookie set
- ✅ Redirect to /dashboard
- ✅ User data displayed correctly

**Sign In:**

```bash
Email: test@example.com
Password: Test123456
```

**Expected Results:**

- ✅ API call to /api/auth/signin succeeds
- ✅ Session cookie set
- ✅ Redirect to /dashboard
- ✅ User data loaded

**Sign Out:**

- ✅ Session cleared
- ✅ Cookies removed
- ✅ Redirect to homepage
- ✅ Cannot access protected routes

---

### Integration Tests

**Session Persistence:**

1. Sign in
2. Refresh page
3. Should remain signed in
4. User data should still be available

**Protected Routes:**

1. Sign out
2. Try accessing /dashboard
3. Should redirect to /auth/signin?callbackUrl=/dashboard
4. Sign in
5. Should redirect back to /dashboard

**Multiple Tabs:**

1. Sign in in Tab 1
2. Open Tab 2
3. Should be signed in Tab 2
4. Sign out in Tab 1
5. Tab 2 should also be signed out (after refresh)

---

### Error Handling Tests

**Invalid Credentials:**

- Email not found → Show error
- Wrong password → Show error
- Empty fields → Show validation errors

**Network Errors:**

- API timeout → Show error
- Server error → Show error
- Database error → Show error

**Edge Cases:**

- Already registered email → Show error
- Weak password → Show validation error
- SQL injection attempts → Sanitized
- XSS attempts → Sanitized

---

## 🔧 Troubleshooting Guide

### Problem: "Cannot read property 'login' of undefined"

**Cause:** AuthProvider not wrapping the app

**Solution:**

1. Check `src/app/layout.tsx`
2. Ensure `<AuthProvider>` wraps all content
3. Restart dev server
4. Clear browser cache

---

### Problem: "signInWithEmail is not a function"

**Cause:** Wrong hook imported

**Solution:**

1. Check import in signin/signup pages
2. Should be: `import { useAuth } from '@/contexts/AuthContext'`
3. NOT: `import { useAuth } from '@/hooks/useAuth'`

---

### Problem: "Property 'register' does not exist"

**Cause:** Using wrong method name

**Solution:**

- Change `register()` to `signup()`
- AuthContext provides `signup`, not `register`

---

### Problem: Sign in succeeds but no redirect

**Cause:** Missing success handling

**Solution:**

```tsx
const result = await login(email, password)
if (result.success) {
  router.push('/dashboard') // Add this
}
```

---

### Problem: TypeScript errors persist

**Cause:** Stale build cache

**Solution:**

```bash
# Clear Next.js cache
rm -rf .next
rm -rf node_modules/.cache

# Restart dev server
npm run dev
```

---

### Problem: Database errors

**Cause:** Missing DATABASE_URL or wrong credentials

**Solution:**

1. Check `.env.local` exists
2. Verify DATABASE_URL is correct
3. Run `npx prisma db push` to sync schema
4. Check database is running (PostgreSQL)

---

### Problem: Session doesn't persist

**Cause:** Cookies not being set

**Solution:**

1. Check browser allows cookies
2. Verify API route sets cookies correctly
3. Check NEXTAUTH_URL matches your domain
4. Clear browser cookies and try again

---

## 📐 Architecture Decisions

### Decision Matrix: Which Auth System?

| Criteria               | Prisma/NextAuth       | InstantDB      |
| ---------------------- | --------------------- | -------------- |
| **Production Ready**   | ✅ Yes                | ⚠️ Beta        |
| **Setup Complexity**   | ⚠️ Medium             | ✅ Easy        |
| **Database Required**  | ✅ PostgreSQL         | ❌ Hosted      |
| **Email/Password**     | ✅ Built-in           | ❌ Need custom |
| **OAuth Support**      | ✅ Easy to add        | ⚠️ Limited     |
| **Session Management** | ✅ Robust             | ⚠️ Basic       |
| **Scalability**        | ✅ High               | ⚠️ Unknown     |
| **Cost**               | ✅ Free (self-hosted) | ⚠️ Paid tiers  |
| **Community Support**  | ✅ Large              | ⚠️ Small       |
| **Type Safety**        | ✅ Excellent          | ⚠️ Good        |

**Recommendation:** **Prisma/NextAuth** for production applications.

---

### Future Enhancements

Once authentication is working, consider adding:

**Security:**

- [ ] Rate limiting on auth endpoints
- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication (2FA)
- [ ] Account lockout after failed attempts

**User Experience:**

- [ ] Social logins (Google, Facebook)
- [ ] Magic link as alternative to password
- [ ] Remember me functionality
- [ ] Auto-logout on inactivity

**Admin Features:**

- [ ] User management dashboard
- [ ] Role-based access control (RBAC)
- [ ] Audit logs
- [ ] Force password reset

---

## 📚 Reference Documentation

### API Endpoints (Prisma/NextAuth)

**Sign Up:**

```
POST /api/auth/signup
Body: {
  name: string
  email: string
  password: string (min 8 chars)
  phone?: string
  role?: "STUDENT" | "PARENT" | "TEACHER"
  grade?: string
  agreeToTerms: boolean
}
Response: {
  success: boolean
  user?: User
  error?: string
}
```

**Sign In:**

```
POST /api/auth/signin
Body: {
  email: string
  password: string
}
Response: {
  success: boolean
  user?: User
  error?: string
}
```

**Sign Out:**

```
POST /api/auth/signout
Response: {
  success: boolean
}
```

**Refresh Session:**

```
POST /api/auth/refresh
Response: {
  success: boolean
  user?: User
}
```

---

### AuthContext API

**Methods:**

```typescript
interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>
  signup: (data: SignUpData) => Promise<AuthResult>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}
```

**Usage Example:**

```tsx
import { useAuth } from '@/contexts/AuthContext'

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth()

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password')
    if (result.success) {
      // Handle success
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user?.name}</p>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
    </div>
  )
}
```

---

## 🎯 Quick Reference

### File Changes Summary

**MUST CHANGE:**

1. ✅ `src/app/layout.tsx` - Add AuthProvider wrapper
2. ✅ `src/app/auth/signin/page.tsx` - Fix imports and method calls
3. ✅ `src/app/auth/signup/page.tsx` - Fix imports and method calls

**SHOULD CHANGE (Complete Fix):** 4. ⚠️ `src/middleware.ts` - Add route protection 5. ⚠️ `.env.local` - Add environment variables 6. ⚠️ Delete conflicting auth files (InstantDB or Prisma)

**OPTIONAL (Future):** 7. 📝 Add email verification 8. 📝 Add password reset 9. 📝 Add OAuth providers 10. 📝 Add 2FA

---

## 📞 Support & Resources

**If you get stuck:**

1. **Check TypeScript Errors:**

   ```bash
   npx tsc --noEmit
   ```

2. **Check API Routes:**

   ```bash
   # Test signin
   curl -X POST http://localhost:3000/api/auth/signin \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   ```

3. **Check Database:**

   ```bash
   npx prisma studio
   # Opens visual database browser
   ```

4. **Check Logs:**
   - Browser console (F12)
   - Terminal running `npm run dev`
   - Network tab in DevTools

**Documentation Links:**

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)
- [React Context API](https://react.dev/reference/react/useContext)

---

## ✨ Summary

**Quick Fix (30 min):**

1. Add AuthProvider wrapper in layout.tsx
2. Change imports in signin.tsx to use AuthContext
3. Change imports in signup.tsx to use AuthContext
4. Update method calls (login/signup instead of signInWithEmail/register)
5. Test!

**Complete Fix (2 hours):**

- Do Quick Fix +
- Choose auth architecture
- Remove conflicting system
- Add middleware
- Set environment variables
- Comprehensive testing

**Priority:**

1. 🔴 CRITICAL: Add AuthProvider (blocks everything)
2. 🔴 CRITICAL: Fix signin page imports
3. 🔴 CRITICAL: Fix signup page imports
4. 🟡 HIGH: Choose architecture
5. 🟡 HIGH: Add middleware
6. 🟢 MEDIUM: Clean up conflicting code

**Next Steps:**

1. Implement Quick Fix
2. Test authentication works
3. Schedule Complete Fix session
4. Add security enhancements

---

**Good luck! You've got this! 🚀**

---

**Document Version:** 1.0
**Last Updated:** October 30, 2025
**Author:** Claude Code Investigation Agent

🤖 Generated with [Claude Code](https://claude.com/claude-code)
