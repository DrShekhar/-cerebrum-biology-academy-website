# CERI CTO Agent Memory

## Project Context

- **Project**: Cerebrum Biology Academy
- **Tech Stack**: Next.js 15, Supabase, Prisma, Vercel
- **Auth**: NextAuth v5 + Firebase Phone Auth

## Recent Decisions

- 2025-01-19: Implemented Firebase Phone OTP authentication flow
- 2025-01-19: Cookie setting changed from `cookies().set()` to `response.cookies.set()` for reliability
- 2025-01-19: Added `__Secure-` cookie prefix for production HTTPS

## Technical Debt

- [ ] Rate limiting is in-memory (per-instance) - migrate to Upstash Redis when traffic increases
- [ ] Phone normalization logic duplicated in 2 files - extract to shared utility
- [ ] Add structured logging with request IDs for debugging

## Performance Benchmarks

- Auth API response time: ~200-400ms (includes Firebase + DB)
- Rate limit: In-memory Map (works for low traffic)

## Security Considerations

- ✅ Firebase token re-verification implemented (`firebase-verify.ts`)
- ✅ Webhook signature verification with HMAC-SHA256 + timing-safe comparison
- ✅ Rate limiting on auth endpoints
- ✅ Production fails hard if AUTH_SECRET missing
- ✅ `__Secure-` cookie prefix in production
- ✅ Token age validation prevents replay attacks

## Code Review Log

### 2025-01-19 - Auth System Review

**Files**: firebase-session, webhooks/firebase, firebase-verify
**Verdict**: ✅ APPROVED FOR PRODUCTION
**Scores**:

- Type Safety: 9/10
- Error Handling: 9/10
- Security: 9/10
- Documentation: 8/10

**Action Items**:

- [ ] Add unit tests for auth routes
- [ ] Consider Upstash Redis for distributed rate limiting
