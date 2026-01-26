# Debugging Playbook

Systematic approaches to debugging issues in Cerebrum Biology Academy.

---

## 🎯 Debugging Philosophy

1. **Understand before fixing** - Know why it's broken
2. **Reproduce reliably** - Can you make it happen consistently?
3. **Isolate the problem** - Narrow down the scope
4. **Fix the root cause** - Don't just patch symptoms
5. **Verify the fix** - Test thoroughly before closing

---

## 🔍 Debugging Decision Tree

```
Issue Reported
     │
     ▼
Can you reproduce it?
     │
     ├─ NO → Gather more info (logs, screenshots, steps)
     │
     ▼ YES
     │
Is it a frontend or backend issue?
     │
     ├─ FRONTEND → Check browser console, network tab
     │
     ├─ BACKEND → Check server logs, API response
     │
     ▼ UNCLEAR
     │
Check the data flow end-to-end
```

---

## 🖥️ Frontend Debugging

### Browser DevTools Checklist

```
□ Console tab - JavaScript errors
□ Network tab - API calls failing?
□ Elements tab - DOM structure correct?
□ Application tab - LocalStorage, cookies correct?
□ Performance tab - Rendering issues?
```

### Common Frontend Issues

| Symptom          | Likely Cause                   | Solution                           |
| ---------------- | ------------------------------ | ---------------------------------- |
| Page blank       | JS error, hydration mismatch   | Check console errors               |
| Styling broken   | CSS not loading, wrong classes | Check Network tab, inspect element |
| Data not showing | API error, state not updated   | Check Network tab, React DevTools  |
| Infinite loading | Promise not resolving          | Add timeout, check error handling  |
| Wrong data       | Stale cache, wrong props       | Clear cache, check data flow       |

### React/Next.js Specific

```typescript
// Debug component renders
useEffect(() => {
  console.log('Component mounted', { props, state })
  return () => console.log('Component unmounted')
}, [])

// Debug state changes
useEffect(() => {
  console.log('State changed:', stateValue)
}, [stateValue])

// Debug suspense boundaries
<Suspense fallback={<div>Loading... (debug)</div>}>
  <Component />
</Suspense>
```

### Hydration Errors

Common causes:

1. Date/time differences between server and client
2. Browser extensions modifying DOM
3. Conditional rendering based on `window`

Fix:

```typescript
// Use dynamic import with ssr: false
const ClientOnly = dynamic(() => import('./Component'), { ssr: false })

// Or use useEffect for client-only logic
const [isClient, setIsClient] = useState(false)
useEffect(() => setIsClient(true), [])
```

---

## 🗄️ Backend Debugging

### API Route Checklist

```
□ Is the route being hit? (Add console.log)
□ Are the request params/body correct?
□ Is authentication working?
□ Is the database query correct?
□ Is the response format correct?
```

### Prisma/Database Debugging

```typescript
// Enable Prisma query logging
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})

// Debug a specific query
const result = await prisma.user.findMany({
  where: { email: 'test@test.com' },
})
console.log('Query result:', JSON.stringify(result, null, 2))

// Check raw query
const rawResult = await prisma.$queryRaw`SELECT * FROM users WHERE email = 'test@test.com'`
```

### Common Backend Issues

| Symptom       | Likely Cause                  | Solution                          |
| ------------- | ----------------------------- | --------------------------------- |
| 500 error     | Unhandled exception           | Check server logs                 |
| 401/403       | Auth issue                    | Check token, session, permissions |
| 404           | Wrong route, missing resource | Check URL, database               |
| Slow response | Database query, external API  | Add timing logs                   |
| Timeout       | Long operation, deadlock      | Add timeouts, check queries       |

### Logging Best Practices

```typescript
// Structured logging
console.log(
  JSON.stringify({
    event: 'api_request',
    endpoint: '/api/users',
    method: 'POST',
    userId: user.id,
    duration: Date.now() - startTime,
    status: 'success',
  })
)

// Error logging with context
console.error(
  JSON.stringify({
    event: 'api_error',
    endpoint: '/api/users',
    error: error.message,
    stack: error.stack,
    requestBody: body,
  })
)
```

---

## 🌐 Network/API Debugging

### cURL Commands for Testing

```bash
# Test GET endpoint
curl -X GET https://cerebrumbiologyacademy.com/api/health

# Test POST with body
curl -X POST https://cerebrumbiologyacademy.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'

# Test with auth token
curl -X GET https://cerebrumbiologyacademy.com/api/user/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Common Network Issues

| Symptom    | Likely Cause                  | Solution                      |
| ---------- | ----------------------------- | ----------------------------- |
| CORS error | Missing CORS headers          | Add headers in next.config.js |
| SSL error  | Certificate issue             | Check domain configuration    |
| Timeout    | Server slow, firewall         | Check server logs, ping       |
| 502/503    | Server down, deployment issue | Check Vercel dashboard        |

---

## 🔐 Authentication Debugging

### Firebase Auth Issues

```typescript
// Debug Firebase auth state
import { onAuthStateChanged } from 'firebase/auth'

onAuthStateChanged(auth, (user) => {
  console.log('Auth state:', user ? 'Logged in' : 'Logged out')
  if (user) {
    console.log('User:', user.uid, user.phoneNumber)
  }
})

// Debug token
const token = await user.getIdToken()
console.log('Token:', token.substring(0, 50) + '...')
```

### Session/Cookie Issues

```typescript
// Debug cookies in API route
export async function GET(request: NextRequest) {
  const cookies = request.cookies
  console.log('All cookies:', cookies.getAll())

  const sessionToken = cookies.get('authjs.session-token')
  console.log('Session token:', sessionToken)
}
```

---

## 📊 Database Debugging

### Supabase-Specific

```sql
-- Check table structure
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users';

-- Check recent records
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- Check for missing data
SELECT * FROM users WHERE email IS NULL;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'users';
```

### Connection Issues

```typescript
// Test database connection
try {
  await prisma.$connect()
  console.log('Database connected successfully')
} catch (error) {
  console.error('Database connection failed:', error)
}
```

---

## 🚨 Production Debugging

### Sentry Error Tracking

```typescript
// Capture custom error with context
Sentry.captureException(error, {
  extra: {
    userId: user.id,
    action: 'createPayment',
    paymentData: { amount, currency },
  },
})

// Set user context
Sentry.setUser({ id: user.id, email: user.email })

// Add breadcrumb
Sentry.addBreadcrumb({
  category: 'payment',
  message: 'User initiated payment',
  level: 'info',
})
```

### Production Log Analysis

```bash
# Vercel logs (via CLI)
vercel logs cerebrumbiologyacademy.com --follow

# Filter for errors
vercel logs cerebrumbiologyacademy.com | grep -i error

# Last 100 lines
vercel logs cerebrumbiologyacademy.com -n 100
```

---

## 📝 Bug Report Template

```markdown
## Bug Report: [Title]

### Description

[What's happening vs. what should happen]

### Steps to Reproduce

1. Go to [page]
2. Click [button]
3. Enter [data]
4. See error

### Expected Behavior

[What should happen]

### Actual Behavior

[What actually happens]

### Environment

- Browser: [Chrome 120, Safari 17, etc.]
- Device: [Desktop, iPhone 14, etc.]
- User type: [Student, Admin, etc.]

### Screenshots/Logs

[Attach relevant screenshots, console errors, network logs]

### Frequency

[Always, sometimes, once]

### Workaround

[Any known workaround?]
```

---

## ⚡ Quick Debug Commands

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Check for circular dependencies
npx madge --circular src/

# Analyze bundle size
ANALYZE=true npm run build

# Test production locally
npm run build && npm run start
```
