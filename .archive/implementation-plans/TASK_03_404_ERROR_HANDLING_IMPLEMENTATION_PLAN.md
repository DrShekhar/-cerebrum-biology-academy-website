# Task 03: Fix 404 Error Handling Implementation Plan

## Current Status Analysis (As of 2025-10-01)

### 🔴 Critical Issue Identified

**Problem**: Invalid URLs return HTTP 200 status instead of 404

**Test Result**:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/non-existent-page
# Returns: 200  ❌ Should return: 404
```

**Root Cause**:

- Next.js App Router has `/src/app/not-found.tsx` component
- Component displays 404 UI correctly
- BUT doesn't set HTTP status code to 404
- This impacts SEO and proper error handling

---

## Implementation Plan

### Step 1: Update not-found.tsx to Return Proper Status Code (5 minutes)

**Current Issue**: Client component doesn't set HTTP status

**Solution**: Add `notFound()` function call or use headers

**File**: `/src/app/not-found.tsx`

```typescript
// BEFORE (current - line 9)
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100...">
    // ... rest of component
  )
}

// AFTER (with proper status)
import { headers } from 'next/headers'

export default async function NotFound() {
  // Force 404 status code
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100...">
    // ... rest of component (unchanged)
  )
}

// Alternative: Export metadata with status
export const metadata = {
  title: '404 - Page Not Found',
}
```

**Note**: In Next.js 15 App Router, the `not-found.tsx` file should automatically set 404 status. If not working, need to check middleware or layout interference.

---

### Step 2: Check Middleware for Status Code Overrides (5 minutes)

**File to Check**: `/middleware.ts`

**What to Look For**:

- Any code that modifies response status
- Any redirects or rewrites affecting 404 pages
- Any blanket 200 responses

**Potential Issue**:

```typescript
// Bad pattern (overrides 404)
export function middleware(request: Request) {
  const response = NextResponse.next()
  response.headers.set('X-Custom-Header', 'value')
  // This might be resetting status to 200
  return response
}
```

**Fix if needed**:

```typescript
export function middleware(request: Request) {
  const response = NextResponse.next()
  // Preserve original status code
  if (response.status === 404) {
    return response // Don't modify 404 responses
  }
  response.headers.set('X-Custom-Header', 'value')
  return response
}
```

---

### Step 3: Add Explicit notFound() Call for Dynamic Routes (5 minutes)

**Issue**: Dynamic routes might not trigger not-found.tsx automatically

**Solution**: Add explicit `notFound()` calls in API routes and pages

**Example - API Route**:

```typescript
// File: src/app/api/[...catchall]/route.ts (if it exists)
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    { error: 'Not Found', message: 'API endpoint does not exist' },
    { status: 404 }
  )
}

export async function POST() {
  return NextResponse.json(
    { error: 'Not Found', message: 'API endpoint does not exist' },
    { status: 404 }
  )
}

// Export for all HTTP methods
export { GET as PUT, GET as DELETE, GET as PATCH }
```

**Example - Dynamic Page**:

```typescript
// src/app/[...slug]/page.tsx
import { notFound } from 'next/navigation'

export default function CatchAllPage({ params }: { params: { slug: string[] } }) {
  // Always trigger 404 for catch-all routes
  notFound()
}
```

---

### Step 4: Test All Scenarios (10 minutes)

**Test Cases**:

1. **Invalid Static Route**:

```bash
curl -I http://localhost:3001/non-existent-page
# Expected: HTTP/1.1 404 Not Found
```

2. **Invalid API Route**:

```bash
curl -I http://localhost:3001/api/non-existent
# Expected: HTTP/1.1 404 Not Found
```

3. **Invalid Dynamic Route**:

```bash
curl -I http://localhost:3001/courses/invalid-course-id
# Expected: HTTP/1.1 404 Not Found (or redirect if course doesn't exist)
```

4. **Valid Routes Still Work**:

```bash
curl -I http://localhost:3001/
# Expected: HTTP/1.1 200 OK

curl -I http://localhost:3001/courses
# Expected: HTTP/1.1 200 OK
```

5. **API Routes Return JSON 404**:

```bash
curl -s http://localhost:3001/api/non-existent | jq .
# Expected: {"error": "Not Found", ...}
```

---

### Step 5: Add Custom Error Pages (Optional - 10 minutes)

**Additional Error Pages to Consider**:

1. **src/app/error.tsx** - For 500 errors:

```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

2. **src/app/global-error.tsx** - For root-level errors:

```typescript
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

---

### Step 6: SEO Optimization for 404 Pages (5 minutes)

**Add to not-found.tsx**:

```typescript
export const metadata = {
  title: '404 - Page Not Found | Cerebrum Biology Academy',
  description:
    'The page you are looking for could not be found. Browse our NEET biology courses or contact support.',
  robots: 'noindex, follow', // Don't index 404 pages
}
```

---

## Time Breakdown

| Step      | Task                          | Estimated Time | Complexity |
| --------- | ----------------------------- | -------------- | ---------- |
| 1         | Update not-found.tsx          | 5 min          | Low        |
| 2         | Check middleware              | 5 min          | Low        |
| 3         | Add catch-all routes          | 5 min          | Low        |
| 4         | Test all scenarios            | 10 min         | Low        |
| 5         | Custom error pages (optional) | 10 min         | Low        |
| 6         | SEO optimization              | 5 min          | Low        |
| **TOTAL** |                               | **40 minutes** |            |

---

## Success Criteria

### Must Have (MVP)

- ✅ Invalid URLs return HTTP 404 status code
- ✅ Invalid API routes return JSON 404 responses
- ✅ not-found.tsx displays proper UI
- ✅ SEO robots.txt excludes 404 pages

### Should Have

- ✅ Custom error page for 500 errors
- ✅ Proper logging of 404 requests
- ✅ User-friendly error messages

### Nice to Have (Future)

- 🔄 404 tracking in analytics
- 🔄 Automated redirect suggestions
- 🔄 Custom 404 pages per section

---

## Technical Details

### Next.js 15 App Router 404 Handling

**Automatic 404 Handling**:

- `not-found.tsx` at any route level
- Next.js automatically sets 404 status when this file is rendered
- Works for both pages and layouts

**Programmatic 404**:

```typescript
import { notFound } from 'next/navigation'

// In a page component
export default function Page({ params }) {
  const data = await fetchData(params.id)
  if (!data) {
    notFound() // Triggers not-found.tsx
  }
  return <div>{data.title}</div>
}
```

**API Route 404**:

```typescript
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ error: 'Not Found' }, { status: 404 })
}
```

---

## Common Pitfalls

### Pitfall 1: Middleware Overriding Status

```typescript
// ❌ Bad: Middleware resets status to 200
export function middleware(request: Request) {
  const response = NextResponse.next()
  return response // Might reset status
}

// ✅ Good: Preserve original status
export function middleware(request: Request) {
  const response = NextResponse.next()
  if (response.status !== 200) {
    return response // Preserve error status
  }
  // ... rest of middleware logic
  return response
}
```

### Pitfall 2: Client-Side Navigation

```typescript
// ❌ Bad: Doesn't set status on client-side nav
<Link href="/non-existent">Click</Link>

// ✅ Good: Server-side redirect with status
// Use notFound() in the page component
```

### Pitfall 3: API Routes Without Status

```typescript
// ❌ Bad: Returns 200 with error message
export async function GET() {
  return NextResponse.json({ error: 'Not Found' })
}

// ✅ Good: Returns 404 status
export async function GET() {
  return NextResponse.json({ error: 'Not Found' }, { status: 404 })
}
```

---

## Testing Strategy

### Manual Testing

```bash
# Test 1: Invalid page
curl -I http://localhost:3001/invalid-page
# Should see: HTTP/1.1 404 Not Found

# Test 2: Invalid API
curl -I http://localhost:3001/api/invalid
# Should see: HTTP/1.1 404 Not Found

# Test 3: Valid page
curl -I http://localhost:3001/
# Should see: HTTP/1.1 200 OK
```

### Automated Testing (Future)

```typescript
// test/404-handling.test.ts
describe('404 Error Handling', () => {
  it('returns 404 for invalid pages', async () => {
    const res = await fetch('/non-existent')
    expect(res.status).toBe(404)
  })

  it('returns 404 for invalid API routes', async () => {
    const res = await fetch('/api/non-existent')
    expect(res.status).toBe(404)
    const json = await res.json()
    expect(json.error).toBe('Not Found')
  })
})
```

---

## Impact

### SEO Impact

- **Before**: Search engines index invalid pages as 200 OK (bad for SEO)
- **After**: Search engines properly recognize 404s and don't index them
- **Benefit**: Cleaner site indexing, better search rankings

### User Experience

- **Before**: Users see 404 UI but unclear if it's an error
- **After**: Clear HTTP status + user-friendly error page
- **Benefit**: Better error communication

### Monitoring

- **Before**: Can't track 404 errors in logs
- **After**: Proper HTTP status allows error tracking
- **Benefit**: Can identify broken links and fix them

---

## Related Files

### Files to Modify

1. `/src/app/not-found.tsx` - Add status code handling
2. `/middleware.ts` - Check for status code overrides
3. `/src/app/[...slug]/page.tsx` (create if needed) - Catch-all 404

### Files to Reference

1. Next.js 15 App Router docs - Error Handling
2. HTTP Status Code specifications (RFC 7231)

---

**Created**: 2025-10-01
**Status**: Ready for Implementation
**Assigned To**: Claude Code
**Priority**: P1 (High - SEO Impact)
