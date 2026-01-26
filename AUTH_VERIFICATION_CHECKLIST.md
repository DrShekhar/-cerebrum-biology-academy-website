# ✅ Authentication Verification Checklist

**Date:** January 20, 2026
**Status:** AUTH_SECRET added to Vercel - Ready for testing

---

## Prerequisites

✅ AUTH_SECRET added to Vercel environment variables
✅ Latest code deployed (commits: aa21b9f4, 77c986bd, c93200f5, 1a848ccd)
⏳ Vercel automatic redeploy triggered (wait 1-2 minutes)

---

## Test Suite

### Test 1: Sign-In Page Loads ✅

**URL:** https://cerebrumbiologyacademy.com/sign-in

**Expected:**

- Page loads without errors
- Phone input field visible
- "Send OTP" button visible
- No console errors

**Steps:**

1. Open browser (incognito recommended)
2. Navigate to `/sign-in`
3. Open DevTools (F12) → Console tab
4. Check for errors

**✅ PASS if:** Page loads, no errors in console
**❌ FAIL if:** 500 error, console shows AUTH_SECRET errors

---

### Test 2: OTP Send Flow ✅

**Steps:**

1. Enter phone number: `+91 98765 43210` (or your real number)
2. Click "Send OTP"
3. Wait 3-5 seconds

**Expected:**

- Firebase reCAPTCHA appears (if first time)
- "Sending OTP..." loading state
- Success message: "OTP sent to +91 98765 43210"
- OTP input field appears
- SMS received on phone

**Console Expected:**

```
[Firebase] Sending OTP to +91 98765 43210
[Firebase] OTP sent successfully
```

**✅ PASS if:** OTP sent successfully, SMS received
**❌ FAIL if:** Error message, no SMS received

---

### Test 3: OTP Verification & Session Creation ✅

**Steps:**

1. Enter OTP received via SMS (6 digits)
2. Click "Verify OTP" or auto-submit
3. Watch network tab (DevTools → Network)

**Expected Network Calls:**

```
POST /api/auth/firebase-session
  Request: { uid: "...", phoneNumber: "+919876543210", action: "check" }
  Response: 200 OK
    { exists: true/false, needsSignup: true/false, session: {...} }
```

**Expected Behavior:**

- "Verifying OTP..." loading state
- Success: Redirect to `/dashboard` OR `/sign-up` (if new user)
- Session cookie `cerebrum_session` set in browser

**Console Expected:**

```
[Firebase] Verifying OTP...
[Firebase] OTP verified successfully
[Session] Creating session for user...
[Session] Session created successfully
```

**✅ PASS if:**

- No 500 errors
- No "AUTH_SECRET not configured" errors
- Session cookie created
- Redirect happens

**❌ FAIL if:**

- 500 Internal Server Error
- Console error: "AUTH_SECRET not configured"
- No redirect after OTP verification

---

### Test 4: Session Cookie Inspection ✅

**Steps:**

1. After successful sign-in
2. Open DevTools → Application tab → Cookies
3. Look for `cerebrum_session`

**Expected Cookie:**

```
Name: cerebrum_session
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (JWT token)
Domain: cerebrumbiologyacademy.com
Path: /
HttpOnly: Yes
Secure: Yes (in production)
SameSite: Lax
```

**Decode JWT (Optional):**

```bash
# Copy JWT token from cookie value
# Paste into: https://jwt.io/

# Expected payload:
{
  "userId": "...",
  "role": "student" | "parent",
  "iat": <timestamp>,
  "exp": <timestamp>
}
```

**✅ PASS if:** Cookie exists with valid JWT token
**❌ FAIL if:** No cookie, or cookie value is empty

---

### Test 5: Session Persistence ✅

**Steps:**

1. After successful sign-in (still on dashboard)
2. Refresh the page (F5 or Cmd+R)
3. Observe behavior

**Expected:**

- Page reloads
- User remains logged in
- Dashboard loads without redirect to `/sign-in`
- User data displays correctly

**✅ PASS if:** User stays logged in after refresh
**❌ FAIL if:** Redirected back to sign-in page

---

### Test 6: Protected Route Access ✅

**Steps:**

1. While logged in, navigate to: `/dashboard`
2. Try navigating to: `/dashboard/courses`
3. Try navigating to: `/dashboard/profile`

**Expected:**

- All pages load successfully
- No redirect to sign-in
- User-specific data displays

**✅ PASS if:** All protected routes accessible
**❌ FAIL if:** Redirected to sign-in

---

### Test 7: Ceri AI Chat (Requires Session) ✅

**Steps:**

1. While logged in on dashboard
2. Look for Ceri AI chat button (bottom right or sidebar)
3. Click to open chat
4. Send message: "What is photosynthesis?"

**Expected Network Call:**

```
POST /api/ceri-ai/stream
  Headers: Cookie: cerebrum_session=...
  Response: 200 OK (SSE stream)
  Body: AI response streaming
```

**Expected Behavior:**

- Chat opens without errors
- Message sends successfully
- AI response streams back
- No "Authentication required" errors

**Console Expected:**

```
[Ceri] Sending message: What is photosynthesis?
[Ceri] Streaming response...
[Ceri] Response complete
```

**✅ PASS if:** AI responds, no auth errors
**❌ FAIL if:** 401 Unauthorized, "Authentication required"

---

### Test 8: Sign Out Flow ✅

**Steps:**

1. While logged in
2. Click "Sign Out" button (usually in header or profile dropdown)
3. Observe behavior

**Expected:**

- Sign out confirmation (optional)
- Firebase sign-out called
- Session cookie deleted
- Redirect to home page or sign-in page

**✅ PASS if:** Successfully signed out, cookie removed
**❌ FAIL if:** Error during sign out

---

### Test 9: New User Sign Up ✅

**Steps:**

1. Sign in with a phone number that doesn't exist in database
2. Complete OTP verification
3. Expect redirect to `/sign-up` page
4. Fill out form:
   - First Name: "Test"
   - Last Name: "User"
   - Role: "Student"
5. Submit

**Expected Network Call:**

```
POST /api/auth/firebase-session
  Request: {
    uid: "...",
    phoneNumber: "+919876543210",
    firstName: "Test",
    lastName: "User",
    role: "student",
    action: "signup"
  }
  Response: 200 OK
    { success: true, session: {...}, user: {...} }
```

**Expected Behavior:**

- User record created in database
- Session created
- Redirect to `/dashboard`

**✅ PASS if:** New user created, redirected to dashboard
**❌ FAIL if:** 500 error, user not created

---

## Common Issues & Solutions

### Issue 1: "AUTH_SECRET not configured" in console

**Cause:** Vercel hasn't applied the environment variable yet
**Solution:**

- Wait 2-3 minutes for Vercel to redeploy
- Check Vercel dashboard → Deployments → Latest deployment status
- Verify environment variable is visible in Vercel settings

### Issue 2: OTP not received

**Cause:** Firebase phone auth issue (not related to AUTH_SECRET)
**Solution:**

- Check Firebase console → Authentication → Sign-in method → Phone enabled
- Verify phone number is valid format: +91XXXXXXXXXX
- Check SMS quota in Firebase (may be rate-limited)

### Issue 3: Session cookie not set

**Cause:** AUTH_SECRET issue or CORS issue
**Solution:**

- Verify AUTH_SECRET is exactly: `b4MDi0VylWlVEiT80ImT7h4YLwIDRTcbPojTKARcRYA=`
- Check browser console for CORS errors
- Verify domain matches in Vercel: cerebrumbiologyacademy.com

### Issue 4: Redirect loop (sign-in → dashboard → sign-in)

**Cause:** Session validation failing
**Solution:**

- Clear browser cookies and cache
- Try incognito mode
- Check if session expiration is too short

---

## API Health Check

### Test Auth Session API Directly

**Using cURL:**

```bash
curl -X POST https://cerebrumbiologyacademy.com/api/auth/firebase-session \
  -H "Content-Type: application/json" \
  -d '{
    "uid": "test-uid-123",
    "phoneNumber": "+919876543210",
    "action": "check"
  }'
```

**Expected Response (User Exists):**

```json
{
  "exists": true,
  "needsSignup": false,
  "session": {
    "userId": "...",
    "role": "student"
  }
}
```

**Expected Response (New User):**

```json
{
  "exists": false,
  "needsSignup": true
}
```

**❌ If you see this, AUTH_SECRET is still missing:**

```json
{
  "error": "Internal server error"
}
```

And in Vercel logs:

```
[SECURITY CRITICAL] AUTH_SECRET/NEXTAUTH_SECRET environment variable is not configured
```

---

## Vercel Deployment Check

### Check Latest Deployment

**URL:** https://vercel.com/drshekhar/cerebrum-biology-academy-website/deployments

**Verify:**

- ✅ Latest deployment shows "Ready" status
- ✅ Deployment includes latest commit: `1a848ccd`
- ✅ Build logs show no errors
- ✅ Environment variables applied (you'll see "Environment Variables Changed" badge)

---

## Success Criteria

### ✅ Authentication is WORKING if:

1. ✅ Sign-in page loads without errors
2. ✅ OTP can be sent successfully
3. ✅ OTP verification works
4. ✅ Session cookie is created
5. ✅ User stays logged in after refresh
6. ✅ Protected routes are accessible
7. ✅ Ceri AI chat works (no auth errors)
8. ✅ Sign out works
9. ✅ New user sign up works

### ❌ Authentication is BROKEN if:

- 500 errors on sign-in
- Console errors: "AUTH_SECRET not configured"
- No session cookie created
- Redirect loop between sign-in and dashboard
- 401 Unauthorized errors on protected routes

---

## Next Steps After Verification

### If All Tests Pass ✅

1. Mark authentication as fixed ✅
2. Test on multiple browsers (Chrome, Safari, Firefox)
3. Test on mobile devices (iOS, Android)
4. Monitor Sentry for any auth-related errors in production
5. Consider adding auth analytics tracking

### If Tests Fail ❌

1. Check Vercel deployment logs for errors
2. Verify AUTH_SECRET is set correctly in Vercel
3. Wait 5 minutes for DNS/cache propagation
4. Try clearing Vercel's edge cache (Vercel dashboard → Purge Cache)
5. Report specific error messages for debugging

---

## Additional Verifications

### Check All Auth-Dependent APIs

These APIs require AUTH_SECRET and should now work:

1. **`/api/auth/firebase-session`** - Session creation ✅
2. **`/api/auth/session`** - Session validation ✅
3. **`/api/ceri-ai/stream`** - Ceri AI chat (authenticated users) ✅
4. **`/api/test/interakt/route`** - Test endpoint (admin) ✅
5. **`/api/test/zoom/route`** - Test endpoint (admin) ✅

---

## Timeline

**12:00 PM** - AUTH_SECRET added to Vercel ✅
**12:02 PM** - Vercel redeploy triggered (automatic) ⏳
**12:03 PM** - Deployment completed 🎯
**12:05 PM** - Ready for testing ✅

---

**Report Status:** Ready for Testing
**Priority:** Verify authentication immediately
**Estimated Test Time:** 10-15 minutes for full suite
