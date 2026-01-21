# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Cerebrum Biology Academy, please report it to **security@cerebrumbiologyacademy.com**.

**DO NOT** open a public GitHub issue for security vulnerabilities.

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

We will acknowledge your report within 48 hours and provide a detailed response within 7 days.

---

## Security Measures

### 1. Authentication & Authorization

- **NextAuth v5** with session-based authentication
- OTP verification for phone-based authentication
- Device session tracking (max 3 devices per student)
- Role-based access control (Admin, Counselor, Student, Parent)
- Secure password hashing (bcrypt with 12 rounds)

### 2. API Security

- **Rate Limiting**: Upstash Redis-based rate limiting on all API routes
  - Auth endpoints: 5 requests per 15 minutes
  - Payment endpoints: 3 requests per hour
  - AI endpoints: 10 requests per minute
  - General API: 30 requests per minute
  - Public endpoints: 60 requests per minute

- **Input Validation**: Zod schema validation on all API inputs
- **CORS**: Configured for cerebrumbiologyacademy.com only
- **Security Headers**:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: restricted

### 3. Data Protection

- **PII Redaction**: Automatic redaction of sensitive data in logs
  - Email addresses, phone numbers, credit cards
  - Aadhaar, PAN card numbers
  - API keys, passwords, tokens

- **Encryption**:
  - All data in transit encrypted (TLS 1.3)
  - Sensitive database fields encrypted at rest
  - Environment variables never committed to git

- **Database Security**:
  - PostgreSQL with Supabase
  - Connection pooling for performance
  - Prepared statements (Prisma ORM) prevent SQL injection
  - Row-Level Security (RLS) - **TODO: Enable for multi-tenant isolation**

### 4. Payment Security

- **Razorpay Integration**:
  - PCI-DSS compliant payment processing
  - Webhook signature verification (Svix)
  - No credit card data stored in our database
  - Payment logs with PII redaction

### 5. Monitoring & Auditing

- **Sentry Error Tracking**: Real-time error monitoring
- **OpenTelemetry**: Distributed tracing for performance
- **Security Audit Logs**: All sensitive operations logged
  - Login attempts (failed and successful)
  - Payment transactions
  - Admin actions
  - Data exports

### 6. Code Security

- **TypeScript**: Type safety to prevent runtime errors
- **ESLint**: Security-focused linting rules
- **Dependency Scanning**: Automated npm audit in CI/CD
- **Secret Scanning**: Pre-commit hooks prevent secret commits
- **Code Review**: All changes require peer review

---

## Security Best Practices for Developers

### Environment Variables

Never commit `.env` files to git:

```bash
# ❌ NEVER DO THIS
git add .env.local

# ✅ Use .env.example instead
cp .env.example .env.local
# Then fill in actual values locally
```

### API Route Security Checklist

When creating a new API route:

- [ ] Add rate limiting (`withRateLimit`)
- [ ] Validate inputs with Zod schema
- [ ] Check authentication (`auth()`)
- [ ] Verify authorization (user role)
- [ ] Use PII-safe logging (`safeLog`)
- [ ] Handle errors gracefully (no stack traces in production)
- [ ] Add security headers

Example:

```typescript
import { withRateLimit } from '@/lib/security/rateLimiter'
import { safeLog } from '@/lib/security/logger'
import { auth } from '@/lib/auth/config'

export const POST = withRateLimit(async (req: NextRequest) => {
  const session = await auth()
  if (!session) {
    safeLog.warn('Unauthorized access attempt')
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // ... route logic
})
```

### Database Query Security

Always use Prisma's parameterized queries:

```typescript
// ❌ VULNERABLE (SQL Injection)
await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`

// ✅ SAFE
await prisma.user.findUnique({ where: { email } })
```

### Input Validation

Always validate user input with Zod:

```typescript
import { z } from 'zod'

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[6-9]\d{9}$/), // Indian mobile
})

const data = CreateUserSchema.parse(req.body)
```

---

## Known Security Limitations

### 1. Database Row-Level Security (RLS)

**Status**: ⚠️ **Not Enabled**

**Risk**: Without RLS, a compromised API could potentially access data across tenants.

**Mitigation**: Application-level authorization checks in all API routes.

**Roadmap**: Enable RLS in Q1 2026 (see `docs/DATABASE_SECURITY.md`)

### 2. TypeScript Strict Mode

**Status**: ⚠️ **Disabled**

**Risk**: Potential runtime errors from type mismatches.

**Mitigation**: Gradual migration in progress (`tsconfig.strict.json`).

**Roadmap**: Full strict mode by Q2 2026

### 3. Undici Vulnerability (CVE-2024-XXXX)

**Status**: ⚠️ **Known Low-Severity Issue**

**Affected**: @vercel/blob dependency

**Risk**: Low - Resource exhaustion in HTTP response decompression

**Mitigation**: Monitoring in place, no production impact observed

**Roadmap**: Update when @vercel/blob releases patched version

---

## Security Checklist

### Pre-Deployment

- [ ] Run `npm audit` (no high/critical vulnerabilities)
- [ ] Run `npm run test:security`
- [ ] Run `npm run type-check`
- [ ] Verify `.env` files not in git
- [ ] Review recent code changes for security issues
- [ ] Check rate limits are configured
- [ ] Verify CORS settings
- [ ] Test authentication flows
- [ ] Validate input sanitization

### Post-Deployment

- [ ] Monitor Sentry for new errors
- [ ] Check rate limit effectiveness
- [ ] Review security audit logs
- [ ] Verify payment webhooks
- [ ] Test login flows
- [ ] Check SSL certificate validity

---

## Security Tools & Scripts

### Pre-Deploy Security Check

```bash
npm run test:security
```

Runs:
- Environment variable validation
- Secret scanning
- Dependency vulnerability check
- TypeScript compilation
- Security header verification
- Git secret check

### Bundle Size Monitoring

```bash
node scripts/bundle-size-check.js
```

Checks if bundle sizes are within limits (performance security).

### TypeScript Strict Check

```bash
npm run type-check:strict
```

Runs TypeScript in strict mode on new files.

---

## Incident Response Plan

### In Case of Security Breach

1. **Immediate Actions** (0-1 hour):
   - Disable compromised accounts
   - Rotate all API keys and secrets
   - Block malicious IPs at Vercel edge
   - Notify security team

2. **Investigation** (1-24 hours):
   - Review security audit logs
   - Identify scope of breach
   - Document timeline
   - Preserve evidence

3. **Remediation** (24-48 hours):
   - Deploy patches
   - Notify affected users
   - Reset passwords (if needed)
   - Update security measures

4. **Post-Mortem** (1 week):
   - Root cause analysis
   - Update security policies
   - Implement preventive measures
   - Team training

---

## Contact

- **Security Email**: security@cerebrumbiologyacademy.com
- **General Support**: support@cerebrumbiologyacademy.com
- **Phone**: +91-88264-44334

---

**Last Updated**: January 21, 2026
**Next Review**: April 21, 2026
