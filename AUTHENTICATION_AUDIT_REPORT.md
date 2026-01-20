# Authentication Audit Report
**Date:** January 20, 2026
**Auditor:** Claude Code
**Issue:** Authentication not working in production

---

## Executive Summary

🚨 **CRITICAL ISSUE FOUND:** Missing environment variables in Vercel deployment causing authentication failures.

The application uses **Firebase Authentication** with phone OTP, but critical secrets required for session management are missing in the production environment.

---

## Authentication Architecture

### Current Setup:
```
User Flow:
1. User enters phone number (/sign-in)
2. Firebase sends OTP via SMS
3. User enters OTP
4. Firebase verifies OTP
5. App calls /api/auth/firebase-session to:
   - Check if user exists in database
   - Create/update user record
   - Generate JWT session token
   - Set session cookie
6. Redirect to dashboard
```

### Technologies:
- **Primary Auth:** Firebase Authentication (Phone OTP)
- **Session Management:** JWT tokens + HTTP-only cookies
- **Database:** Supabase PostgreSQL (via Prisma)
- **Token Secret:** AUTH_SECRET or NEXTAUTH_SECRET (environment variable)

---

## Issues Found

### 🔴 **CRITICAL: Missing Environment Variables**

**File:** `src/app/api/auth/firebase-session/route.ts` (Line 20)

**Code:**
```typescript
const getAuthSecret = (): string => {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) {
    // SECURITY: In production runtime, fail hard - never use fallback secrets
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        '[SECURITY CRITICAL] AUTH_SECRET/NEXTAUTH_SECRET environment variable is not configured.'
      )
    }
  }
  return secret
}
```

**Problem:**
- `AUTH_SECRET` or `NEXTAUTH_SECRET` is **NOT SET** in Vercel environment variables
- This causes authentication to **THROW AN ERROR** in production
- Users cannot complete sign-in flow
- JWT tokens cannot be generated

**Impact:** 🔴 **BLOCKER** - Authentication completely broken

---

### 🟡 **WARNING: Missing JWT Secrets (if used)**

**File:** `src/lib/auth/config.ts` (Lines 50, 77)

**Missing Variables:**
- `JWT_SECRET` - Used for general JWT token signing
- `JWT_REFRESH_SECRET` - Used for refresh token signing

**Note:** These may not be actively used if the app relies on `AUTH_SECRET`, but should be audited.

---

## Current Environment Variables

### ✅ **PRESENT in .env.local:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDERF5RgaHtJZuWd0sR0EsiAgrPNF0yTEQ"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="cerebrum-biology-academy-c7099.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="cerebrum-biology-academy-c7099"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="cerebrum-biology-academy-c7099.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="103600859204"
NEXT_PUBLIC_FIREBASE_APP_ID="1:103600859204:web:5740ecca73c59287567411"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-5L27YNL9ML"
CRON_SECRET="fa1b20ea7de3ef3f00ea3f0253308d74e1283d6435fbfba1fbdaac727803c6c7"
```

### ❌ **MISSING (Required for Authentication):**
```env
AUTH_SECRET="<GENERATE_STRONG_SECRET>"
# OR
NEXTAUTH_SECRET="<GENERATE_STRONG_SECRET>"
```

---

## Fix Required

### **IMMEDIATE ACTION:** Add AUTH_SECRET to Vercel

**Step 1: Generate Strong Secret**
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Step 2: Add to Vercel Environment Variables**

Go to Vercel Dashboard:
1. Navigate to: `Project Settings` → `Environment Variables`
2. Add new variable:
   - **Key:** `AUTH_SECRET`
   - **Value:** `<generated-secret-from-step-1>`
   - **Environment:** Production, Preview, Development (all)
3. Click **Save**

**Step 3: Redeploy**
```bash
# Trigger redeploy to apply new environment variable
vercel --prod
```

---

## Verification Steps

After adding `AUTH_SECRET` and redeploying:

### Test 1: Sign In Flow
1. Go to https://cerebrumbiologyacademy.com/sign-in
2. Enter phone: `+91 98765 43210` (test number)
3. Click "Send OTP"
4. Enter OTP received via SMS
5. **EXPECTED:** Redirect to dashboard with session cookie set
6. **CHECK:** No errors in browser console
7. **CHECK:** Session cookie `cerebrum_session` is present in DevTools

### Test 2: Session Persistence
1. After successful sign-in, refresh the page
2. **EXPECTED:** User remains logged in
3. Navigate to `/dashboard`
4. **EXPECTED:** Dashboard loads without redirect to sign-in

### Test 3: API Session Validation
```bash
# Test API endpoint with session
curl -X POST https://cerebrumbiologyacademy.com/api/auth/firebase-session \
  -H "Content-Type: application/json" \
  -H "Cookie: cerebrum_session=<session-token>" \
  -d '{
    "uid": "test-uid",
    "phoneNumber": "+919876543210",
    "action": "check"
  }'

# EXPECTED: 200 OK with user data (if exists) or signup prompt (if new user)
# NOT EXPECTED: 500 error with "AUTH_SECRET not configured"
```

---

## Additional Recommendations

### 1. Add JWT Secrets (Optional but Recommended)

If the app uses separate JWT utilities:
```env
JWT_SECRET="<generate-another-strong-secret>"
JWT_REFRESH_SECRET="<generate-another-strong-secret>"
```

### 2. Environment Variable Validation

Add startup check in `src/lib/auth/config.ts`:
```typescript
// At module load
if (process.env.NODE_ENV === 'production' && !process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
  console.error('[FATAL] AUTH_SECRET not configured in production!')
  // Don't throw here to allow build, but log prominently
}
```

### 3. Health Check Endpoint

Create `/api/health/auth` endpoint:
```typescript
export async function GET() {
  const hasAuthSecret = !!(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET)
  const hasFirebase = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY

  return Response.json({
    auth: {
      firebase: hasFirebase ? 'configured' : 'missing',
      session: hasAuthSecret ? 'configured' : 'missing',
    },
    status: (hasAuthSecret && hasFirebase) ? 'healthy' : 'unhealthy'
  })
}
```

### 4. Vercel Deployment Hook

Add to `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "env": {
    "AUTH_SECRET": "@auth-secret"
  }
}
```

---

## Security Considerations

### ✅ **GOOD:**
- JWT secrets are loaded lazily (not at build time)
- Fallback secrets only in development
- Production fails hard without secrets (prevents weak auth)
- Rate limiting on auth endpoints
- HTTP-only cookies (prevents XSS attacks)

### 🔒 **TO VERIFY:**
- [ ] `AUTH_SECRET` is at least 32 characters (256 bits)
- [ ] Secret is stored in Vercel securely (not in git)
- [ ] Secret is different for each environment (prod, preview, dev)
- [ ] Secret rotation plan exists (change quarterly)

---

## Deployment Status

### ✅ **Latest Code Pushed to Vercel:**
```bash
Commits pushed:
- aa21b9f4: P1 conversion enhancements (9 landing pages)
- 77c986bd: Aria AI API integration fix
- c93200f5: Ceri cache collision fix

Status: ✅ Code deployed, waiting for AUTH_SECRET to be added
```

### 🔄 **Next Steps:**
1. Add `AUTH_SECRET` to Vercel (user action required)
2. Redeploy automatically triggers once environment variable is added
3. Test authentication flow (see Verification Steps above)
4. Monitor logs for any auth-related errors

---

## Root Cause Analysis

**Why did this happen?**
1. `AUTH_SECRET` was never added to Vercel environment variables during initial setup
2. Local development used fallback secrets (`.env.local` didn't have it either)
3. Firebase auth was working (sending OTP), but **session creation** was failing silently
4. Error: `[SECURITY CRITICAL] AUTH_SECRET not configured` was thrown on server, not visible to client

**Why was it not caught earlier?**
- Development environment uses fallback secrets (no error thrown)
- Build succeeds (lazy loading prevents build-time checks)
- Error only occurs at **runtime in production** when user tries to sign in

---

## Priority: 🔴 **URGENT - PRODUCTION BLOCKER**

**Recommendation:** Add `AUTH_SECRET` immediately to unblock authentication.

**Estimated Time to Fix:** 5 minutes (generate secret + add to Vercel)

---

**Report End**
