# Full Code Audit — Jun 12, 2026 (UI/UX · Content · Links · Code/Perf/Security)

Four parallel agents. This is the deepest pass and it found issues earlier sweeps missed —
including two things I'd previously reported as fixed/working that are not.

## ⚠️ Two corrections to earlier reports
1. **"Broken internal links fixed" was incomplete.** The earlier pass fixed `href=` props but NOT
   the `url:`-field links rendered from data files. **251 unique internal links still 404** — 190
   in `src/data/city-seo/city-hub-data.ts` alone (rendered by CityHubPage on 100+ city pages).
2. **"Parent dashboard 100% real" was wrong.** It calls `prisma.tests` — a model that **does not
   exist** → 500. It's one of ~20 missing models (whole feature areas non-functional).

---

## CRITICAL — deploy-blocking / data-loss (fix before relying on these features)

### Code / data integrity (the `prisma` mock-union type hides ALL of these from tsc)
- **~20 Prisma models referenced by live code don't exist** → those endpoints 500:
  gamification (×5 models, 49 calls), consultant/commissions/referrals (×4, 49 calls), notices (×2),
  worksheets (×2), wall_of_achievers (×2), self_evaluations, **`tests` (parent dashboard + child tests)**,
  pending_conversions, work_tracking. Fix: add models + migrate, or these features are dead.
- **~133 `.create()` calls omit required `id`; ~65 omit required `updatedAt`** (id has `@id` no default;
  updatedAt has no `@updatedAt`). Includes **`/api/enrollment/route.ts:62` (enrollment creation throws)**,
  admission-application users/enrollments, activities/analytics/communication_logs. One-line schema fix
  fixes most: add `@default(cuid())` to those id cols + `@updatedAt` to those updatedAt cols.
- **`prisma.demoBooking` typo** (`leads/demo-booking/route.ts:42`) — model is `demo_bookings`.
- **Counselor money features silently don't persist**: `lib/counselor/feePlanService.ts` +
  `lib/counselor/whatsapp.ts` write via the InstantDB **mock** (`@/lib/db`), not Prisma → fee plans,
  offers, payments, WhatsApp logs all lost. 5 live routes. Migrate to Prisma.
- **`admin/students` activities.create** uses `entityType/entityId/performedBy` (non-existent) — and
  demo-booking cancel/feedback activities omit id+userId. (Note: the CRM-form activities were fixed
  earlier; these are OTHER call sites.)

### Payments — money-loss masking
- **`payments/verify:265`** returns `verified:true` (200) after the DB transaction fails post-signature
  → student paid but not enrolled, no retry. **`payments/cashfree/webhook:169`** returns 200 in catch →
  Cashfree never retries. **`payment/verify:52`** has no idempotency guard (replay re-confirms).

### Security
- **2 stored-XSS sinks**: `free-resources/AnnouncementBanner.tsx:56` + `free-resources/[id]/page.tsx:176`
  render admin/DB HTML via dangerouslySetInnerHTML with no sanitization — and the project already has
  `lib/security/htmlSanitizer.ts.sanitizeHtml()` unused. Pipe both through it.
- **PII in logs**: full phone (phone-auth.ts:126), emails (auth.ts), full payment objects
  (razorpayService.ts:502/518). Stripped in prod by removeConsole but error/warn-level remain.
- Weak `Math.random()` webhook secret (`admin/webhooks/route.ts:259` → crypto.randomBytes);
  latent `executeRaw` footgun (0 callers — lock down).

## HIGH

### Links (251 broken, full list in /tmp/realbroken.json from the agent run)
- `city-hub-data.ts` (190): `localities`/`relatedCities` `url:` fields → dead routes (Punjab/Haryana
  area pages, sector pages). Rendered by CityHubPage.tsx:658,743 on 100+ pages.
- `seo-landing/*` content (25): `/resources/*` + `/tools/*` namespace mismatch (real tools are
  top-level slugs). `/tools/rank-predictor`, `/tools/college-predictor` in 5+ files.
- Hard-coded JSX (22): `biology-classes-delhi/page.tsx:128-137` (9 area links), `neet-coaching-punjab`,
  `parent/concerns` → `/parent/{attendance,tests,homework}`, InternalLinkingWidget (10),
  RelatedPages (3), **BreadcrumbSchema.tsx:209 `/glossary` leaks into JSON-LD**.
- **6 dead WhatsApp CTAs**: board pages use `<Button href=...>` but ui/Button renders `<button>` and
  ignores href (gujarat/wb/up/tn/maharashtra/telangana board PageContent).
- 953 internal links point at redirect sources (301 hops) — top: /biology-classes-gurgaon (81),
  /neet-coaching-gurgaon (57). Hygiene.
- Social-handle fragmentation: 3 Facebook variants, 2 Instagram, 4 YouTube, multiple Twitter/LinkedIn
  — only one real per platform, rest 404. Plus fabricated-looking LinkedIn faculty handles
  (FacultyCredentialsShowcase) + 1 placeholder Google-review link (neet-coaching-rohini:522).
- 33 orphaned money pages (MCAT/DAT/USMLE/USABO/GAMSAT city pages, vertical pricing hubs) — no inbound links.

### Content
- **Rating contradiction**: canonical 5.0/38 vs visible 4.8/4.7/4.5 and review counts 847 / 1,247 / 500+
  across ~20 pages. Schema/trust risk. Route all through CEREBRUM_METRICS.
- **Non-compliant claims**: "100% Selection Rate" (IntensiveNEETBiologyPage:366), "Guaranteed admission"
  (4 files) — contradict the 98% standard + the site's own "we don't claim 100%". Soften.
- **"XYZ Coaching" placeholder** in canonical metrics.ts:365 (Gurugram landmark) → renders to users/schema.
- AIIMS selections 67+ (canonical) vs 65+ (35 pages) vs 85+ (5). Standardize 67+.
- "Updated for NEET 2025" / "NEET 2025 Final Mock" stale labels (resources pages + a multi-page
  infographic). Bump to 2026. Hardcoded "© 2026" in 2 components.
- **Identical testimonial** (Priya M./Rahul K., verbatim) on 11 free-resource pages; "Sarah" testimonial
  on 5+ international pages with rotating surnames. Fabrication/duplicate signal.
- Legal pages (privacy/terms/refund) render `new Date()` as "Last updated" → appears revised daily.
- Indexable ~0-word stubs: `/curriculum`, `/about/media` ("coming soon"), biology-notes, usabo-past-papers.

### UI/UX & a11y
- **Two fixed bottom bars overlap on mobile** site-wide (MobileBottomNav z-50 + Footer Call bar z-50).
- **LeadCaptureForm** (high-traffic): no `<form onSubmit>` (Enter doesn't submit) + no real double-submit
  guard (double-taps open 2 WhatsApp tabs).
- **EnrollmentForm** (checkout): no inline validation, no autoComplete/inputMode, labels not associated.
- Mobile bottom nav has no "Menu" entry → About/Results/Resources/Contact unreachable from the bar
  (a full drawer exists but is never opened); FloatingCTA mobile bar is permanently `hidden`.
- Blog posts render double `<h1>` (title + markdown `#`). Carousel/lightbox/pager icon buttons lack
  aria-label. parent/ portal has no loading.tsx/error.tsx (teacher/consultant lack error.tsx).
- Design-system: emerald/indigo/rogue-hex used as accents in high-multiplier SEO templates + ui/ loaders.
- 3 comparison tables crush (no min-w) at 375px instead of scrolling.

## MEDIUM / LOW
- Dead/unmounted components with divergent nav (HeaderServer, MobileFullscreenMenu, StickyMobileCallBar,
  EmotionalHeroSection, etc.) — delete to prevent someone wiring a stale variant.
- Duplicate utilities: phone-normalize reimplemented 9+ times (canonical lib/utils/phone.ts ignored);
  formatCurrency ~20 inline copies; 4+ WhatsApp sender stacks.
- Tech debt: `as any` ×694, console.log in prod paths ×834, eslint-disable ×39, TODO/FIXME ~41,
  @ts-ignore 0 (clean).
- Perf: pricing/neet-coaching/courses-neet-complete are top-level 'use client' (ship body as JS);
  purchase/[courseId] + free-resources/[id] have no metadata. Otherwise well-optimized (framer-motion
  gone, 0 raw <img>, analytics lazy).

## The root cause worth fixing once
`src/lib/prisma.ts:350` exports `prisma` as a mock-union `as any` → **tsc cannot see any Prisma field/
model/enum drift**. Properly typing the export as `PrismaClient` would surface ~200 of the runtime bugs
above at compile time. Highest-leverage single change.
