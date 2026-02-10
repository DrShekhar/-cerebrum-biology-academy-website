# CEREBRUM BIOLOGY ACADEMY — LAUNCH READINESS AUDIT REPORT

**Date:** February 9, 2026
**Auditor:** Claude Opus 4.6
**Project:** `/Users/drshekhar/cerebrum-biology-academy-website`
**Website:** https://cerebrumbiologyacademy.com

---

## LAUNCH VERDICT: NOT READY

**Overall Score: 45/100 — Significant issues must be resolved before public launch.**

| Area | Score | Status |
|------|-------|--------|
| Content Accuracy & Completeness | 30/100 | FAIL |
| Routes & Navigation | 40/100 | FAIL |
| API & Backend Functionality | 45/100 | FAIL |
| Security | 50/100 | NEEDS WORK |
| SEO & Metadata | 70/100 | ACCEPTABLE |
| Deployment & Config | 60/100 | NEEDS WORK |
| Design & UX | 65/100 | ACCEPTABLE |
| Legal Compliance | 35/100 | FAIL |

---

## CRITICAL ISSUES (14 items — Must fix before launch)

### C1. Rickroll Video IDs in Testimonials
**File:** `src/data/testimonials.ts` (lines 13, 25, 37, 103, 113, 123)
All 6 video testimonials use YouTube ID `dQw4w9WgXcQ` (Rick Astley — "Never Gonna Give You Up"). If any student or parent clicks a video testimonial, they see a meme video. **Devastating for credibility.**
- **Fix:** Replace with real student video IDs from `src/data/realTestimonials.ts` (e.g., Sadhna Sirin: `bk6wQCh6b9w`, Abhisek: `NfhkGqOQXzk`, Nishita: `t5F8RBuHITM`).

### C2. `/terms-of-service` Redirects to `/privacy-policy`
**File:** `next.config.mjs` (line 1846)
A full Terms of Service page exists at `src/app/terms-of-service/page.tsx` but is permanently redirected to Privacy Policy. Users signing up who click "Terms" land on the wrong legal document. **Legal compliance risk.**
- **Fix:** Remove the redirect `{ source: '/terms-of-service', destination: '/privacy-policy', permanent: true }`.

### C3. `/terms` Triple Redirect Conflict
Three competing redirects for `/terms`:
1. Page file → `redirect('/terms-of-service')`
2. next.config.mjs → `/privacy-policy` (permanent 301)
3. Sign-in/Sign-up pages link to `/terms`
Users always land on Privacy Policy instead of Terms of Service.
- **Fix:** Remove the config redirect for `/terms`. Let the page file handle it.

### C4. Payment System Returns Entirely Fake Data
**File:** `src/app/api/payments/route.ts` (928 lines)
Nearly every handler returns hardcoded mock data:
- `upgradeSubscription` → fake `proratedAmount: 299`
- `cancelSubscription` → fake `refundAmount: 0`
- `processOneTimePayment` → returns `status: "completed"` without processing
- `getBillingHistory` → hardcoded fake transactions
- `demo_payment_system` action bypasses auth entirely
- **Fix:** Either implement real handlers or remove/disable these endpoints before launch.

### C5. Payment Webhook Handlers Are All Stubs
**File:** `src/app/api/webhooks/payments/route.ts` (lines 551-660)
All helper functions only `console.log` and do nothing:
```
updatePaymentStatus() → console.log only
updateSubscriptionStatus() → console.log only
sendPaymentConfirmation() → console.log only
```
- **Fix:** Implement real database updates and notification sending.

### C6. Razorpay Credentials Are Placeholder
**File:** `.env` (lines 39-41)
```
RAZORPAY_KEY_SECRET="razorpay_secret_placeholder"
RAZORPAY_WEBHOOK_SECRET="razorpay_webhook_placeholder"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_placeholder"
```
All payment/checkout flows will fail with "Payment gateway not configured".
- **Fix:** Obtain real Razorpay credentials and update Vercel environment variables.

### C7. Enrollment API Has No Authentication or Rate Limiting
**File:** `src/app/api/enrollment/create-order/route.ts` (line 32)
The POST handler has NO `auth()` or `validateUserSession()` check and NO rate limiting. An attacker could spam this endpoint to create thousands of fake user accounts and bogus enrollment records.
- **Fix:** Add authentication and rate limiting.

### C8. MockPrismaClient Can Silently Activate in Production
**File:** `src/lib/prisma.ts` (lines 10-163)
If the database connection drops, the entire app silently switches to a mock client that returns `null`/`[]` for all queries. Logins fail silently, no data loads, and no error is shown to users.
- **Fix:** In production, throw errors instead of falling back to mock data.

### C9. Wildly Inconsistent Pricing Across Pages
Prices differ on nearly every page:

| Class | Lowest Stated | Highest Stated |
|-------|--------------|----------------|
| Class 9 | 15K/yr | 90K/yr |
| Class 10 | 25K/yr | 90K/yr |
| Class 11 | 25K/yr | 98K/yr |
| Class 12 | 30K/yr | 1.56L/yr |
| Dropper | 60K/yr | 1.56L/yr |

A parent checking FAQs, then the Gurgaon page, then the pricing page will see three completely different fee structures.
- **Fix:** Create one canonical pricing source and reference it everywhere.

### C10. Hindi & Tamil Locale Pages Redirected Away
**File:** `next.config.mjs` (lines 1141, 1147)
Real Hindi (`/hi`) and Tamil (`/ta`) content pages exist with proper metadata, but are permanently redirected to `/`. The `hreflang` tags in layout.tsx reference `/hi` for Hindi — Google will flag a hreflang mismatch.
- **Fix:** Remove `/hi` and `/ta` from the redirect list.

### C11. 20+ Demo/Test Pages Publicly Accessible
These internal development pages are accessible to anyone:

| Page | Risk |
|------|------|
| `/demo/testing-suite` | Exposes test data generators |
| `/security-demo` | Shows security monitoring dashboard |
| `/claudechat-demo` | Hardcoded demo student "Rahul Sharma" |
| `/counselor-demo` | Says "No Authentication Required" |
| `/claudechat`, `/claudechat-standalone` | Internal AI chat tools |
| `/color-palette`, `/brand-studio` | Internal design tools |
| `/test-voice`, `/test-learning` | Test pages with hardcoded data |
| `/toast-demo`, `/testing-demo` | Component test pages |
| `/simple-test-gen` | Mock question generator |
| `/ceri-ai-demo` | AI demo page |
| `/onboarding/demo` | Shows "Demo Mode Active" banner |

- **Fix:** Add these to middleware protection or delete them.

### C12. `favicon.ico` Missing
**File:** `public/` directory
Browsers request `/favicon.ico` on every page load. Without it, every visit generates a 404 in server logs and Google Search Console. PNG favicons exist but the `.ico` file does not.
- **Fix:** Generate `favicon.ico` from existing PNG favicons.

### C13. WhatsApp Credentials Are All Placeholder
**File:** `.env` (lines 68-71)
```
WHATSAPP_ACCESS_TOKEN="whatsapp_token_placeholder"
WHATSAPP_PHONE_NUMBER_ID="whatsapp_phone_placeholder"
WHATSAPP_VERIFY_TOKEN="whatsapp_verify_placeholder"
WHATSAPP_WEBHOOK_SECRET="whatsapp_webhook_placeholder"
```
All WhatsApp notification routes and webhook handlers will fail silently.
- **Fix:** Configure real WhatsApp Business API credentials.

### C14. Exposed Production Secrets in Local `.env`
**File:** `.env`
Real production credentials in plaintext: Anthropic API key, OpenAI key, database password (`archana6712671`), Twilio credentials, Zoom OAuth, Cloudflare token, Redis URL.
- **Fix:** Rotate all credentials immediately. Use Vercel environment variables exclusively.

---

## HIGH PRIORITY ISSUES (18 items — Fix within first week)

### H1. Faculty Using Placeholder Avatar Images
**File:** `src/data/faculty.ts`
5 of 6 faculty members use `getPlaceholderAvatar()` (resolves to `via.placeholder.com`). Real photos exist in `/public/faculty/` but aren't being used.
- **Fix:** Update faculty data to reference `/faculty/dr-priya-sharma.jpg` etc.

### H2. Fabricated Testimonials Mixed with Real Ones
**File:** `src/data/testimonials.ts`
Contains fabricated names (Priya Sharma AIR 2,847, Arjun Patel AIR 1,234, Sarah Mitchell from Singapore) while `src/data/realTestimonials.ts` has actual verified students.
- **Fix:** Replace fabricated testimonials with real ones.

### H3. Hero CTA Links to Redirected Page
**Files:** `OptimizedHeroSection.tsx`, `HeroInteractiveWrapper.tsx`, `HeroClientInteractive.tsx`
Primary homepage CTA links to `/neet-2026-preparation` which is redirected to `/courses` in config. Unnecessary redirect on the most important user action.
- **Fix:** Either remove the redirect or update Hero CTAs to link directly to `/courses`.

### H4. `/mock-tests` Redirect Breaks 9+ Components
Redirect `/mock-tests` → `/resources/mock-tests` breaks links in: student dashboard, student courses page, error pages, TestInterface component, and Footer.
- **Fix:** Remove the redirect or update all component references.

### H5. `/pricing` Redirect Hides Real Pricing Page
A full pricing page exists at `src/app/pricing/page.tsx` but config redirects to `/neet-coaching-fee-gurugram`.
- **Fix:** Remove the redirect.

### H6. `/courses/intensive-neet-biology` Redirected Despite Being Linked
Config redirects to `/courses/class-12`. Linked from Footer and TierSelector.
- **Fix:** Remove redirect or update all links.

### H7. SEO Pages Blocked by Middleware Auth
**File:** `middleware.ts` (lines 11-60)
Many public-facing pages are NOT in the `publicRoutes` list and will redirect unauthenticated users (including Google bots) to `/sign-in`:
`/calculator`, `/neet-tools`, `/neet-exam-countdown`, `/neet-score-calculator`, `/neet-college-predictor`, `/neet-rank-predictor`, `/neet-readiness-quiz`, `/neet-study-plan-generator`, `/scholarship`, `/referral`, `/reviews`, `/video-lectures`, `/interactive-learning`, `/learning-path`, `/mobile-app`, `/community`, `/verify-certificate`, `/status`, `/offline`
- **Fix:** Add these to the `publicRoutes` list.

### H8. 50+ Missing Image Files
Entire `/public/images/gallery/` directory is missing (48+ referenced images). Also missing:
- `/images/students/student-placeholder.jpg`
- `/images/blog/placeholder.jpg`
- `/images/centers/center-exterior.jpg`
- 6 local testimonial photos (`arjun-gurgaon.jpg`, `priya-noida.jpg`, etc.)
- **Fix:** Add real images or remove references.

### H9. Fake Local Center Addresses
**File:** `src/data/localAreas.ts`
Generic fabricated addresses ("Plot No. 123, Sector 14") contradict real addresses in `src/lib/constants/contactInfo.ts`.
- **Fix:** Use real center addresses or remove fake ones.

### H10. Fake YouTube Video Links in Components
**Files:** `src/data/localTestimonials.ts`, `src/components/courses/SuccessStories.tsx`
URLs like `youtube.com/watch?v=arjun-gurgaon-story` and `youtube.com/watch?v=sample1` are not real.
- **Fix:** Replace with real video IDs or remove video links.

### H11. Google Review Placeholder Link
**File:** `src/app/neet-coaching-rohini/page.tsx` (line 556)
```
href="https://search.google.com/local/writereview?placeid=ChIJ_cerebrum_placeholder"
```
- **Fix:** Replace with actual Google Place ID.

### H12. 80+ `console.log` Statements in API Routes
Production API routes contain `console.log` with emojis, user emails, phone numbers, and session IDs. Potential PII leak in server logs.
- **Fix:** Replace with structured logger (`logger.info`, `logger.warn`).

### H13. Rate Limiting Effectively Disabled Without Redis
**File:** `src/lib/rateLimit.ts` (lines 42-58)
When Upstash Redis vars are missing, rate limiter allows ALL requests. The `.env` has `REDIS_URL` but the limiter checks for `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.
- **Fix:** Ensure Upstash env vars are set in production.

### H14. `/api/cache/demo` Has No Authentication
Both POST and GET handlers are wide open. Anyone can create fake sessions, manipulate leaderboards, run batch operations.
- **Fix:** Add auth or remove endpoint.

### H15. `/api/subscription-tiers` Exposes Internal Metrics
No auth on POST handler. Returns conversion rates, revenue mix, and `validateStudentDiscount` always returns `eligible: true`.
- **Fix:** Add auth to POST, remove internal metrics from public responses.

### H16. Legacy Demo Auth Provider Still Exists
**File:** `src/lib/auth/config.ts` (lines 1016-1058)
Exported `authOptions` contains a `'demo'` credentials provider returning hardcoded `demo@cerebrumbiologyacademy.com` user.
- **Fix:** Remove the demo provider.

### H17. Newsletter Subscribe Silently Succeeds on DB Failure
**File:** `src/app/api/newsletter/subscribe/route.ts` (lines 116-122)
Returns `success: true` even when database operation fails. Users think they're subscribed but no record exists.
- **Fix:** Return error on DB failure.

### H18. Facebook Pixel / GTM Placeholder Credentials
```
NEXT_PUBLIC_FB_PIXEL_ID="facebook_pixel_placeholder"
NEXT_PUBLIC_GTM_ID="GTM-PLACEHOLDER"
```
Ad conversion tracking will not work. Facebook Pixel may also be blocked by CSP (missing `connect.facebook.net` in script-src).
- **Fix:** Set real IDs and update CSP.

---

## MEDIUM PRIORITY ISSUES (17 items — Fix within 2 weeks)

### M1. CORS `Access-Control-Allow-Origin` Uses `www.` Domain
**File:** `next.config.mjs` (line 1983)
Set to `https://www.cerebrumbiologyacademy.com` but middleware redirects `www.` to non-www. CORS will never match.
- **Fix:** Change to `https://cerebrumbiologyacademy.com`.

### M2. `output: 'standalone'` May Cause Issues on Vercel
**File:** `next.config.mjs` (line 207)
Vercel recommends NOT using standalone mode on their platform.
- **Fix:** Remove `output: 'standalone'` for Vercel deployments.

### M3. `jsonwebtoken` Used in Edge Middleware
**File:** `middleware.ts` (line 5)
Node.js library used in Edge Runtime — fragile and may break with Next.js updates.
- **Fix:** Switch to `jose` library for JWT in middleware.

### M4. CSP Missing `frame-ancestors`, `worker-src`, and Facebook domain
**File:** `next.config.mjs` (line 1932)
- Missing `frame-ancestors 'none'` (CSP equivalent of X-Frame-Options)
- Missing `worker-src 'self'` (needed for PWA)
- Missing `https://connect.facebook.net` in `script-src`

### M5. 1800+ Redirects May Hit Limits / Slow Cold Starts
Massive redirect list in next.config.mjs. Next.js has a soft limit of ~1024.
- **Fix:** Move bulk redirects to middleware or Vercel Edge Config.

### M6. 12 Cron Jobs — High Billing Risk
**File:** `vercel.json` (lines 73-122)
Some run every 15 minutes = ~192 invocations/day from crons alone.
- **Fix:** Review and consolidate crons.

### M7. Admin Audit Log Stripped in Production
**File:** `middleware.ts` (line 233)
Uses `console.log` which is removed by production build config.
- **Fix:** Change to `console.warn()` or structured logger.

### M8. Duplicate Meta Tags in Root Layout
**File:** `src/app/layout.tsx`
`mobile-web-app-capable`, `apple-mobile-web-app-capable`, and `apple-mobile-web-app-status-bar-style` each appear twice.

### M9. Outdated "2025" References in Keywords
**File:** `src/app/layout.tsx` (line 64)
Keywords include "best NEET coaching 2025" — should be 2026.

### M10. `@types/*` Packages in Production Dependencies
**File:** `package.json` (lines 140-149)
10 `@types` packages in `dependencies` instead of `devDependencies`. Zero runtime use.

### M11. `prisma` CLI in Production Dependencies
**File:** `package.json` (line 190)
Only `@prisma/client` is needed at runtime.

### M12. Potentially Unused Heavy Dependencies
`firebase`, `firebase-admin` (auth migrated to NextAuth), `d3`, `exceljs`, `bullmq`, `ioredis` — may not be needed.

### M13. Inconsistent Success Rate Claims
Claimed as 94.2%, 94%, 96%, and 98% on different pages.

### M14. Inconsistent Student Count Claims
"2,000+ students" vs. "1,50,000+ students" on different pages.

### M15. Empty/Stub Pages
- `/curriculum` → "Coming soon..."
- `/biology-notes` → "Coming Soon!" when DB empty
- `/demo/join` → "Meeting Room Coming Soon"

### M16. Analytics Export Uses Random Data
**File:** `src/lib/analytics/exportService.ts` (line 655)
`data: dates.map(() => Math.random() * 100)` — exports contain random numbers.

### M17. Database Log Says "SQLite" Instead of "PostgreSQL"
**File:** `src/lib/prisma.ts` (line 248)
Misleading production log message.

---

## LOW PRIORITY ISSUES (8 items — Nice to fix)

| # | Issue | File |
|---|-------|------|
| L1 | SearchAction target `/search` redirects to `/` | `StructuredData.tsx` + `next.config.mjs` |
| L2 | `x-pathname` cookie set on every request with `httpOnly: false` | `middleware.ts` |
| L3 | `.env.example` uses `rzp_test` naming | `.env.example` |
| L4 | `layout-minimal.tsx` dead code | `src/app/layout-minimal.tsx` |
| L5 | `page.tsx.backup` file in source tree | `src/app/boards/state-boards/page.tsx.backup` |
| L6 | Redundant double redirects (page.tsx + config) for `/company`, `/book-demo` | Multiple files |
| L7 | www redirect duplicated in vercel.json + middleware | `vercel.json` + `middleware.ts` |
| L8 | Twitter/X link may be incorrect (`@shekharsingh`) | `src/config/routes.ts` |

---

## WHAT'S WORKING WELL

Despite the issues above, several areas are solid:

- **Security headers**: HSTS, X-Frame-Options, X-Content-Type-Options, CSP (needs minor fixes), Permissions-Policy all configured
- **Admin route protection**: All ~48 admin API routes properly use `requireAdminAuth()`
- **Student/Teacher/Counselor route protection**: Properly gated with role-based auth
- **SEO foundation**: Sitemap, robots.txt, structured data (JSON-LD), Open Graph, hreflang, Google verification all present
- **Error pages**: Custom `not-found.tsx`, `error.tsx`, `loading.tsx` at app root and in sub-routes
- **Performance optimizations**: `next/font`, `next/image`, deferred analytics loading, preconnect hints, critical CSS inlined
- **Analytics**: GA4, Google Ads, Facebook Pixel (needs real IDs), Sentry, Web Vitals all configured
- **Real testimonial data exists**: `src/data/realTestimonials.ts` has genuine student videos and data
- **PWA**: Manifest, icons (72-512px), apple-touch-icon all present
- **Domain/SSL**: Consistent domain references, HSTS preload ready, www→non-www redirect
- **Tailwind config**: Excellent mobile-first design with Indian market optimizations (3G, Hindi/RTL support)

---

## PRIORITY ACTION PLAN

### Week 1: Launch Blockers (CRITICAL)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Replace Rickroll video IDs with real testimonials | 30 min | Trust |
| 2 | Remove `/terms-of-service` → `/privacy-policy` redirect | 5 min | Legal |
| 3 | Remove `/terms` → `/privacy-policy` redirect | 5 min | Legal |
| 4 | Remove `/hi`, `/ta` from redirect list | 5 min | SEO |
| 5 | Get & set real Razorpay credentials | 2 hrs | Revenue |
| 6 | Get & set real WhatsApp Business API credentials | 2 hrs | Comms |
| 7 | Set real Facebook Pixel ID and GTM ID | 30 min | Ads |
| 8 | Add auth to `/api/enrollment/create-order` | 1 hr | Security |
| 9 | Block/delete all 20+ demo/test pages | 2 hrs | Trust |
| 10 | Generate and add `favicon.ico` | 15 min | SEO |
| 11 | Standardize pricing to one canonical source | 4 hrs | Trust |
| 12 | Rotate all exposed credentials | 2 hrs | Security |
| 13 | Remove fake payment mock data endpoints or gate behind auth | 2 hrs | Security |
| 14 | Add missing pages to middleware `publicRoutes` | 1 hr | SEO |

**Estimated total: ~16 hours**

### Week 2: High Priority Fixes

| # | Action | Effort |
|---|--------|--------|
| 1 | Fix faculty placeholder avatars | 1 hr |
| 2 | Replace fabricated testimonials with real ones | 2 hrs |
| 3 | Fix Hero CTA redirect chain | 30 min |
| 4 | Fix `/mock-tests`, `/pricing`, `/courses/intensive-neet-biology` redirects | 1 hr |
| 5 | Add missing images or remove broken references | 3 hrs |
| 6 | Replace fake center addresses with real ones | 1 hr |
| 7 | Fix fake YouTube video links | 1 hr |
| 8 | Fix Google Review placeholder link | 15 min |
| 9 | Remove 80+ console.log from API routes | 3 hrs |
| 10 | Ensure Upstash Redis env vars are set | 30 min |
| 11 | Secure `/api/cache/demo` and `/api/subscription-tiers` | 1 hr |
| 12 | Remove legacy demo auth provider | 30 min |
| 13 | Fix newsletter subscribe error handling | 30 min |

**Estimated total: ~15 hours**

### Week 3-4: Medium Priority

- Fix CORS origin
- Remove `output: 'standalone'`
- Switch to `jose` for JWT in middleware
- Fix CSP gaps
- Optimize redirect list
- Consolidate cron jobs
- Clean up dependencies
- Standardize success rate and student count claims

---

## CONCLUSION

The Cerebrum Biology Academy website has a **strong technical foundation** — security headers, SEO infrastructure, role-based auth, and performance optimizations are all well-built. However, the site is **not launch-ready** due to:

1. **Content integrity issues** — Rickroll videos, fabricated testimonials, placeholder images, inconsistent pricing
2. **Broken navigation** — 18+ pages that exist but are redirected away, including legal pages
3. **Non-functional integrations** — Razorpay, WhatsApp, Facebook Pixel, GTM all using placeholder credentials
4. **Security gaps** — Unauthenticated endpoints, exposed demo pages, mock data in production paths

**The good news:** Most fixes are straightforward (removing bad redirects, swapping placeholder data, setting real credentials). With focused effort, the site could be launch-ready in **2-3 weeks**.

---

*Report generated by Claude Opus 4.6 — February 9, 2026*
