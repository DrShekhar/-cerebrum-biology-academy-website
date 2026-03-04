# Site Audit Fix Plan — March 4, 2026

Comprehensive plan from 5-agent site audit covering UI/UX, CTA/Conversion, SEO, AEO, and Content.

---

## Phase 1: Data Consistency (Critical — 18+ files wrong)

### 1A. Fix Founding Year "2009" → "2014" (18 files)

All instances of "since 2009" / "established 2009" must become "since 2014":

| # | File | Line | Current Text |
|---|------|------|-------------|
| 1 | `src/app/about/page.tsx` | 60 | "operating since 2009" |
| 2 | `src/components/seo/StructuredData.tsx` | 417 | "since 2009" |
| 3 | `src/lib/seo/ai-faq-generator.ts` | 52 | "67+ AIIMS selections since 2009" |
| 4 | `src/app/neet-coaching-institute/page.tsx` | 29 | "proven track record since 2009" |
| 5 | `src/components/seo/EEATSignals.tsx` | 28, 64 | "since 2009" (2 instances) |
| 6 | `src/components/trust/TrustSignalsBanner.tsx` | 31 | "Proven excellence since 2009" |
| 7 | `src/data/seo-landing/universal-content.ts` | 434 | "Teaching NEET biology since 2009" |
| 8 | `src/app/neet-coaching-gurgaon/page.tsx` | 973 | "since 2009" |
| 9 | `src/app/neet-coaching-faridabad/page.tsx` | 1302 | "since 2009" |
| 10 | `src/app/best-biology-tutor-noida/page.tsx` | 40 | "since 2009" |
| 11 | `src/app/neet-coaching-noida/page.tsx` | 1393 | "since 2009" |
| 12 | `src/app/about-cerebrum-biology-academy/page.tsx` | 179, 474 | "since 2009" (2 instances) |
| 13 | `src/app/neet-coaching-gurugram/page.tsx` | 1321 | "since 2009" |
| 14 | `src/app/neet-coaching-chandni-chowk-delhi/PageContent.tsx` | 181 | "since 2009" |
| 15 | `src/app/neet-biology-coaching-delhi-ncr/page.tsx` | 39 | "since 2009" |
| 16 | `src/app/locations/delhi/page.tsx` | 208 | "since 2009" |
| 17 | `src/app/best-neet-biology-tutor-delhi-ncr/page.tsx` | 59 | "since 2009" |
| 18 | `src/data/city-seo/city-hub-data.ts` | 5673 | "since 2009" |

### 1B. Fix "Years Experience" Consistency

With founding year 2014, experience is ~12 years (not 15+). Either:
- Update to "12+ Years" everywhere, OR
- Keep "15+" if counting Dr. Shekhar's total teaching career (not just academy)
- **Decision needed from user**

---

## Phase 2: SEO Quick Wins (High Impact, Low Effort)

### 2A. Add `dynamicParams = false` to 20 Dynamic Routes

Prevents 5xx errors on invalid slugs. Add one line to each file:

```tsx
export const dynamicParams = false
```

| # | File |
|---|------|
| 1 | `src/app/biology-notes/[slug]/page.tsx` |
| 2 | `src/app/biology-notes-for-neet/[chapter]/page.tsx` |
| 3 | `src/app/biology-definitions/[slug]/page.tsx` |
| 4 | `src/app/campbell-biology/[chapter]/page.tsx` |
| 5 | `src/app/campbell-biology/unit/[unit]/page.tsx` |
| 6 | `src/app/compare/[competitor]/page.tsx` |
| 7 | `src/app/biology-tuition-south-delhi/[area]/page.tsx` |
| 8 | `src/app/neet-coaching/[location]/page.tsx` |
| 9 | `src/app/neet-coaching-east-delhi/[area]/page.tsx` |
| 10 | `src/app/neet-coaching-faridabad/[area]/page.tsx` |
| 11 | `src/app/neet-coaching-ghaziabad/[area]/page.tsx` |
| 12 | `src/app/neet-coaching-gurugram/[area]/page.tsx` |
| 13 | `src/app/neet-coaching-north-delhi/[area]/page.tsx` |
| 14 | `src/app/neet-coaching-noida/[area]/page.tsx` |
| 15 | `src/app/neet-coaching-noida-society/[society]/page.tsx` |
| 16 | `src/app/neet-coaching-south-delhi/[area]/page.tsx` |
| 17 | `src/app/neet-coaching-west-delhi/[area]/page.tsx` |
| 18 | `src/app/neet-coaching-near-metro/[station]/page.tsx` |
| 19 | `src/app/neet-biology/[chapter]/page.tsx` |
| 20 | `src/app/international/[country]/page.tsx` |
| 21 | `src/app/international/[country]/courses/page.tsx` |
| 22 | `src/app/nri-students/[country]/page.tsx` |
| 23 | `src/app/states/[state]/page.tsx` |

Already have it (no action): `[localSlug]`, `blog/[slug]`, `blog/category/[slug]`, `courses/[slug]`, `neet-college-predictor/college/[slug]`, `programs/[...slug]`, `purchase/[courseId]`

### 2B. Create Redirects for Stale 2025 URL Slugs

These 2025 slugs should 301-redirect to 2026 equivalents (add to `src/config/seo-redirects.mjs`):

| Old Slug | New Slug | Notes |
|----------|----------|-------|
| `/neet-exam-pattern-2025` | `/neet-exam-pattern-2026` | Create new page or update slug in data |
| `/neet-syllabus-2025` | `/neet-syllabus-2026` | Create new page or update slug in data |
| `/neet-biology-syllabus-2025` | `/neet-biology-syllabus-2026` | Create new page or update slug in data |
| `/neet-2025-biology-coaching` | `/neet-2026-biology-coaching` | Slug in class-12-content.ts |
| `/neet-repeater-course-2025` | `/neet-repeater-course-2026` | Slug in dropper-content.ts |
| `/neet-dropper-crash-course-2025` | `/neet-dropper-crash-course-2026` | Slug in intent-pages-data.ts |

**Strategy**: Update slug in data files → rename page directories → add 301 redirects from old URLs.

**Keep as-is**: `/neet-result-2025-gurugram/` (historical data), student testimonial scores ("NEET 2025: 665/720").

---

## Phase 3: Conversion Optimization (High Impact)

### 3A. Remove Auth Wall from Demo Booking

**File**: `src/components/modals/DemoBookingModal.tsx` (~line 74)
- Currently requires login before booking → causes drop-off
- Change: Collect name/phone/class directly in the form, make login optional
- Fallback: Create lead in DB without auth, follow up via WhatsApp

### 3B. Consolidate Phone Tracking

Multiple phone tracking modules exist:
- `src/lib/analytics/googleAdsConversions.ts`
- `src/lib/analytics/phoneTracking.ts`
- Inline gtag calls in components

**Action**: Audit for double-counting, consolidate into single `trackPhoneCall()` utility.

### 3C. Add WhatsApp CTA to Blog Posts

Blog pages currently hide FloatingCTA (`isBlogPage` check in FloatingCTA.tsx line 69-70).
- Blog has its own `BlogWhatsAppQuery` component — verify it's present on all blog pages
- If not, either remove the blog exclusion or ensure BlogWhatsAppQuery covers all posts

---

## Phase 4: AEO (Answer Engine Optimization)

### 4A. Add Speakable Schema

**File**: `src/components/seo/StructuredData.tsx`
- Add `speakable` property to WebPage schema for FAQ answers and key content sections
- Helps Google Assistant / voice search surface answers

### 4B. Update ai.txt and llms.txt

**Files**: `public/ai.txt`, `public/llms.txt`
- Ensure founding year, stats, and course offerings are current
- Add MCQ tool stats (19,619 questions)
- Add new course pages (Olympiad, Campbell Biology)

### 4C. Add PeopleAlsoAsk Schema

**Target pages**: High-traffic pages (homepage, courses, about)
- Add FAQ structured data with common "People Also Ask" queries
- Already exists on some pages — extend to more

---

## Phase 5: Content & UX Polish (Medium Priority)

### 5A. Fix Header Navigation Hover States

**File**: `src/components/navigation/Header.tsx` (~line 215, 242)
- Desktop dropdowns have inconsistent hover behavior
- Some items lack hover backgrounds

### 5B. Location Page Template Improvements

**Files**: 26 files in `src/app/locations/`
- Add unique local content per location (not just template swaps)
- Add Google Maps embed or directions link
- Add local testimonials where available

### 5C. Missing OpenGraph Images

Some pages lack `og:image` in metadata — create default OG image template.

### 5D. Internal Linking Gaps

- Course pages don't cross-link to related location pages
- Location pages don't link to relevant course pages
- Add "Available Courses" section to location pages
- Add "Available Near You" section to course pages

---

## Phase 6: MCQ Tool Multi-Audience Promotion (From Previous Plan)

See previous plan in `.claude/plans/curious-discovering-moler.md`:
- Rebrand MCQ page hero for all audiences (not just NEET)
- Create 3 new landing pages: `/class-11-biology-mcq`, `/class-12-biology-mcq`, `/biology-olympiad-mcq`
- Update navigation and footer links

---

## Execution Status

| Step | Phase | Status | Commit |
|------|-------|--------|--------|
| 1 | 1A: Founding year 2009→2014 (18 files) | DONE | fc8e3ed2 |
| 2 | 2A: dynamicParams = false (20 routes) | DONE | 5b9341b6 |
| 3 | 4B: ai.txt + llms.txt update | DONE | 266d4780 |
| 4 | 2B: 2025→2026 slug redirects (10 files) | DONE | 6d30833a |
| 5 | 3A: Demo booking auth wall removal | DONE | 876bb08d |
| 6 | AEO: Broadened to NEET-UG + Biology | DONE | 876bb08d |
| 7 | AEO: #1 positioning above Allen/Aakash/PW | DONE | 2ac601cc |
| 8 | 5A: Header hover fix (12 files) | DONE | 5b241415 |
| 9 | 3B: Phone tracking double-count fix | DONE | 82bdaf84 |
| 10 | 3C: Blog WhatsApp CTA | VERIFIED OK (already working) |
| 11 | 1B: Years experience consistency | PENDING — needs user decision (12+ vs 15+) |
| 12 | 4A: Speakable schema extension | PENDING — already exists, needs extension to courses/about |
| 13 | 4C: PeopleAlsoAsk schema | PENDING — low priority |
| 14 | 5B-5D: Location/OG/internal linking | PENDING — larger tasks |
| 15 | 6: MCQ multi-audience | PENDING — separate plan |

---

## Notes

- **WhatsApp login redirect is INTENTIONAL** — running Google Ads, Indian users prefer WhatsApp
- **Rating already fixed**: 4.9 → 5.0 across 238 files (commit b41dbaf8)
- **Founding year partially fixed**: "2015" instances done, "2009" instances remain (this plan)
- **FloatingCTA already fixed**: Removed floating phone icon, fixed sticky bar spacing (commit 9bfd5560)
- Git state: 3 unpushed commits on main (39c73010, b41dbaf8, 9bfd5560)
