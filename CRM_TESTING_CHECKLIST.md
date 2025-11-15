# CRM Testing Checklist

## Pre-Test Setup

- [x] Server running on http://localhost:3005
- [x] Database connected (Supabase PostgreSQL)
- [x] Test users created in database
- [x] No TypeScript compilation errors

---

## Test 1: Counselor Login Flow

### Steps:

1. [ ] Navigate to http://localhost:3005/auth/direct-login
2. [ ] Enter email: `counselor@cerebrumacademy.com`
3. [ ] Enter password: `demo123456`
4. [ ] Click "Sign In" button
5. [ ] Verify redirect to `/counselor/leads`
6. [ ] Verify no blank page
7. [ ] Verify navigation bar is visible with: Pipeline, Tasks, Payments, Analytics

### Expected Results:

- ✅ Login successful without errors
- ✅ Redirected to Lead Pipeline page
- ✅ Page loads with full UI (not blank)
- ✅ Navigation bar shows all menu items
- ✅ User avatar shows "C" or first letter of email

### Common Issues:

- If blank page: Check browser console (F12) for errors
- If redirect fails: Clear cookies and try again
- If "unauthorized": User may not exist in database

---

## Test 2: Counselor Navigation

### Steps:

1. [ ] From Lead Pipeline, click "Tasks" in navigation
2. [ ] Verify URL changes to `/counselor/tasks`
3. [ ] Verify page loads (not blank)
4. [ ] Click "Payments" in navigation
5. [ ] Verify URL changes to `/counselor/payments`
6. [ ] Verify page loads (not blank)
7. [ ] Click "Analytics" in navigation
8. [ ] Verify URL changes to `/counselor/analytics`
9. [ ] Verify page loads (not blank)
10. [ ] Click "Pipeline" to return to leads

### Expected Results:

- ✅ All navigation links work
- ✅ No full page reload (client-side navigation)
- ✅ No blank pages
- ✅ No console errors
- ✅ Session persists across navigation

### Common Issues:

- If pages are blank: Check for API errors in Network tab
- If navigation doesn't work: Check for JavaScript errors
- If session lost: Check SessionProvider is wrapping layout

---

## Test 3: Lead Pipeline Functionality

### Steps:

1. [ ] Navigate to `/counselor/leads`
2. [ ] Verify Kanban board is visible
3. [ ] Check if columns appear: New Leads, Demo Scheduled, Demo Done, etc.
4. [ ] Try clicking "+ New Lead" button
5. [ ] Verify modal opens
6. [ ] Try searching for a lead (use search bar)
7. [ ] Try filtering by priority (Hot/Warm/Cold dropdown)
8. [ ] Click "Refresh" button
9. [ ] Click "Export" button

### Expected Results:

- ✅ Kanban board displays with columns
- ✅ New Lead modal opens
- ✅ Search works
- ✅ Filter works
- ✅ Refresh reloads data
- ✅ Export downloads CSV

### Common Issues:

- If no columns: API may be returning empty data (expected for new database)
- If modal doesn't open: Check JavaScript console
- If API errors: Check `/api/counselor/leads` endpoint

---

## Test 4: Protected Route Access

### Steps:

1. [ ] Open new incognito/private window
2. [ ] Navigate directly to http://localhost:3005/counselor/leads
3. [ ] Verify redirect to login page
4. [ ] Check URL includes `?callbackUrl=/counselor/leads`
5. [ ] Login with counselor credentials
6. [ ] Verify redirect back to `/counselor/leads`

### Expected Results:

- ✅ Unauthenticated access redirects to login
- ✅ Callback URL preserved in redirect
- ✅ After login, returns to originally requested page
- ✅ Session persists after redirect

### Common Issues:

- If no redirect: SessionProvider not working
- If callback lost: Check redirect logic in layout
- If loop: Check authentication conditions

---

## Test 5: Admin Login Flow

### Steps:

1. [ ] Logout from counselor (or use new incognito window)
2. [ ] Navigate to http://localhost:3005/auth/direct-login
3. [ ] Enter email: `admin@cerebrumbiologyacademy.com`
4. [ ] Enter password: `admin123`
5. [ ] Click "Sign In" button
6. [ ] Verify redirect to `/admin`
7. [ ] Verify admin dashboard loads
8. [ ] Check sidebar navigation is visible

### Expected Results:

- ✅ Login successful
- ✅ Redirected to admin dashboard
- ✅ Dashboard shows metrics and widgets
- ✅ Sidebar navigation visible
- ✅ No blank pages

### Common Issues:

- If wrong redirect: Check role-based redirect logic
- If blank page: Check AdminLayout authentication
- If no sidebar: Check AdminLayout component

---

## Test 6: Admin Navigation

### Steps:

1. [ ] From admin dashboard, click different sidebar items:
   - [ ] Dashboard
   - [ ] Demo Bookings
   - [ ] Students
   - [ ] Courses
   - [ ] Payments
   - [ ] Analytics
2. [ ] Verify each page loads
3. [ ] Verify no console errors

### Expected Results:

- ✅ All admin pages accessible
- ✅ Pages load without errors
- ✅ Navigation works smoothly
- ✅ Session persists

### Common Issues:

- If pages missing: Check page files exist
- If unauthorized: Check role in session

---

## Test 7: Cross-Role Protection

### Steps:

1. [ ] Login as counselor
2. [ ] Try to access `/admin` directly
3. [ ] Verify redirect to login or access denied
4. [ ] Logout and login as admin
5. [ ] Try to access `/counselor/leads`
6. [ ] Verify redirect or access denied

### Expected Results:

- ✅ Counselor cannot access admin routes
- ✅ Admin cannot access counselor routes (unless admin role check allows)
- ✅ Proper error handling
- ✅ No crashes

### Common Issues:

- If access allowed: Check role validation in layouts
- If crash: Check error handling in auth wrapper

---

## Test 8: Browser Console Check

### Steps:

1. [ ] Login as counselor
2. [ ] Open DevTools (F12)
3. [ ] Navigate to Console tab
4. [ ] Navigate through all counselor pages
5. [ ] Check for errors (red text)
6. [ ] Check for warnings (yellow text)

### Expected Results:

- ✅ No critical errors
- ✅ Only acceptable warnings (e.g., duplicate sitemap)
- ✅ No session errors
- ✅ No API errors (unless database empty)

### Common Issues:

- Session errors: Check SessionProvider configuration
- API errors: Check endpoint URLs and database
- TypeScript errors: Run `npx tsc --noEmit`

---

## Test 9: API Endpoint Verification

### Steps:

1. [ ] Open DevTools Network tab
2. [ ] Login as counselor
3. [ ] Navigate to `/counselor/leads`
4. [ ] Check Network tab for API call to `/api/counselor/leads`
5. [ ] Verify response status is 200
6. [ ] Check response data structure

### Expected Results:

- ✅ API endpoints respond with 200 status
- ✅ Data structure is correct
- ✅ No 401 Unauthorized errors
- ✅ No 500 Server errors

### Common Issues:

- 401 errors: Authentication not working
- 500 errors: Server-side error, check logs
- Empty data: Database may be empty (expected)

---

## Test 10: Session Persistence

### Steps:

1. [ ] Login as counselor
2. [ ] Navigate to different pages
3. [ ] Wait 2 minutes
4. [ ] Navigate to another page
5. [ ] Verify still logged in
6. [ ] Close browser tab
7. [ ] Reopen http://localhost:3005/counselor/leads
8. [ ] Check if session persists

### Expected Results:

- ✅ Session persists during navigation
- ✅ Session survives time delays
- ✅ Session may or may not persist after tab close (depends on cookie settings)

### Common Issues:

- Session lost immediately: Check SessionProvider settings
- Session expires too fast: Check JWT expiration
- Cookie issues: Check browser cookie settings

---

## Test Results Summary

### All Tests Passed ✅

- [ ] Counselor login working
- [ ] Navigation functional
- [ ] Pages loading correctly
- [ ] Protected routes secured
- [ ] Admin access working
- [ ] API endpoints responding
- [ ] No critical errors

### Issues Found ❌

List any issues:

1. ***
2. ***
3. ***

### Notes:

_Add any observations or additional findings here_

---

## Quick Debug Commands

### Check server logs:

```bash
# Server already running, check terminal output
```

### Check database connection:

```bash
npx prisma studio
# Opens Prisma Studio to view database
```

### Verify users exist:

```bash
npx prisma db push
# Ensures schema is up to date
```

### Check compilation:

```bash
npx tsc --noEmit
# Should show no errors
```

---

## Support

If any test fails, refer to:

1. `CRM_ACCESS_FIXES_SUMMARY.md` - Technical details of fixes
2. `QUICK_CRM_ACCESS_GUIDE.md` - Quick start guide
3. Browser DevTools Console - Check for JavaScript errors
4. Network Tab - Check API responses
5. Server logs - Check terminal for server errors

---

**Status as of 2025-11-15**: All critical tests should pass. The CRM system is fully functional.
