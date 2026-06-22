# Global-Appeal Audit — Can the site attract US & UK citizens?

**Date:** 22 Jun 2026 · **Method:** 4 parallel codebase auditors (discoverability/SEO, messaging, trust/currency/payments, conversion/UX) with file-level evidence.

## Headline
The international **infrastructure is ~80% built** — 243 US/UK/intl exam-page directories, a clean 2,172-URL sitemap (0 redirects/404s), real country schema on dedicated pages, global AEO (`llms.txt`/`ai.txt`), geo-detection API, currency components, and model-quality pages (`ap-biology-tutor-atlanta`, `a-level-biology-tutor-london`). **But the DEFAULT funnel a US/UK visitor actually hits — identity, proof, price, payment, scheduling, contact, messaging — is India-first.** A US/UK citizen today sees Indian names, rupees, an unexplained "AIIMS", IST times, a +91 WhatsApp CTA, and a checkout that cannot take their money.

## ⚠️ Cross-cutting caveat — most of this isn't even live
Branch is **33 commits ahead of `origin/main`; production last deployed June 14.** The entire geo-detection/localization layer AND the US/UK hubs built this month are **unpushed**. So the *current live* US/UK experience is the un-localized India homepage with none of the geo banner, currency switch, or section-hiding. **Action 0 = push/deploy**, or none of the below matters.

---

## P0 — Blocks US/UK acquisition or conversion

### 1. No working USD/GBP checkout (the single biggest blocker)
- Only Razorpay + Cashfree implemented, both default `currency: 'INR'` (`razorpayService.ts:52`). Stripe & PayPal are **declared but fake** — `src/lib/payments/internationalPayments.ts` calls `/api/payments/stripe/create-intent` and `/paypal/create-order` which **don't exist (404)**. No Wise.
- Checkout UI shows "UPI, Net Banking" + `₹` only (`RazorpayPayment.tsx:191,199`). International course CTAs (MCAT Houston, GAMSAT London) show $/£ but their "Enroll" is a **WhatsApp link to +91**, not a checkout.
- **A US/UK buyer cannot self-serve purchase in their currency. Fix:** implement the stubbed Stripe route, charge USD/GBP, wire international CTAs to it.

### 2. Root `/` = India-only signal; geo-nudge invisible to crawlers; hubs orphaned
- `layout.tsx:63` default title "Best NEET Biology Coaching Delhi NCR", `openGraph.locale en_IN`; `page.tsx` H1 "NEET Biology Coaching / India's #1 Institute". Googlebot-from-US sees a pure India-NEET page.
- The mitigation (`GeoSuggestionBanner`) is **client-side JS** — crawlers never see it.
- US/UK hubs (`/best-biology-tutor-usa|uk`, AP/USABO/A-Level/MCAT/GAMSAT) are **indexable but orphaned from nav** — header exposes only one `/global` link, so the 240-page cluster gets almost no internal link equity.
- **Fix:** server-rendered links from `/` → `/global` + top exam hubs; add an "International / By Exam" nav section; reciprocal hreflang `/`↔`/global`.

### 3. Demo booking is IST-only — US/UK families book and miss
- `zoomService.ts:140` hardcodes `timezone:'Asia/Kolkata'`; slots IST-only with **no TZ label** ("5:00 PM" = overnight in the US). `demo_bookings` has no `userTimezone`/UTC column; confirmations omit TZ. `LocationService` already detects the visitor TZ but is never wired in.
- **Fix:** label times "IST" + show local conversion; capture `userTimezone`; wire in existing LocationService.

### 4. Social proof ~99% Indian; credentials illegible to US/UK
- Every testimonial source is Indian/NEET/AIIMS (`realTestimonials.ts` 16/16, `studentSuccessData.ts` 1,200 procedurally Indian names, etc.). Real US/UK stories ≈ 0 and only on geo-gated `/international/[country]`, never the homepage.
- Credentials are AIIMS/JNU/IISc/NEET-rank — prestigious in India, unrecognized by a US/UK family. Western anchors (UCAS/College Board/Ofsted) appear on ~30–63 files vs thousands citing AIIMS.
- **Fix:** gather + surface real A-Level/AP/IB/MCAT outcomes to US/UK geo; translate credentials (years teaching AP/A-Level, students into US/UK med schools).

### 5. Currency: ₹-only on ~98% of pages
- Geo-pricing components exist but render on only ~47 of ~2,025 pages. `/pricing` + 500+ NEET/foundation/dropper pages show `₹` with no conversion. MCAT/DAT matrices are USD-only (no GBP) so UK buyers see $.
- FX rates are **hardcoded, stale ("Dec 2024"), split across 3 conflicting tables** (no single source of truth).
- **Fix:** wrap `/pricing` + top pages in the geo-aware price component; centralize rates with live FX.

### 6. AIIMS unglossed on ~1,171 pages + US pages explicitly diaspora-framed
- 1,188 pages mention "AIIMS"; only 17 gloss it. On a US/UK page it reads as an unexplained acronym used as the main credibility signal.
- Worse, sampled US-city exam pages **target Indians, not locals**: `mcat-biology-tutor-houston` hero "Built for the Sugar Land/Pearland/Katy Indian-American applicant cohort," keyword "NRI MCAT tutor Texas," Hindi parent consults; `usabo-coaching-seattle` "Indian small-batch coaching tradition," "Indian-American…community." A non-Indian local is explicitly not the addressee.
- **Models that get it right:** `ap-biology-tutor-atlanta`, `a-level-biology-tutor-london` (clean local framing, USD/£, College Board/UCAS, AIIMS only as a light credential).
- **Fix:** strip "Indian-American cohort"/"NRI"/Hindi framing from local-intent US/UK pages; gloss or replace AIIMS with locally-legible credentials; use the Atlanta/London templates as the standard.

---

## P1 — Erodes trust / loses leads (mostly cheap fixes)

| # | Finding | Evidence | Fix |
|---|---------|----------|-----|
| 7 | **Chatbot rejects all non-Indian phones** | `IntelligentChatbot.tsx:752` `/^(91)?[6-9]\d{9}$/` | swap for `validatePhone()` 8–15 digit |
| 8 | **Blog lead form rejects non-Indian phones** (blog = top organic entry) | `BlogPostPage.tsx:115` same regex | same one-line fix |
| 9 | **~23 NRI/intl pages WhatsApp-only, no DB capture** (same gap that made the leads drop invisible) | all `/neet-coaching-nri-*`, `/nri-students`, `/international-biology-tutor` | embed `GlobalEnquiryForm` (form→WhatsApp) |
| 10 | **hreflang self-referential, no IN↔US/UK reciprocity** + `en_UK` typo | `usabo-coaching-boston:36`, `layout.tsx:103` | shared hreflang helper; fix typo→`en_GB` |
| 11 | **Nav buries international** under "Global Programs" (4th), NRI-first | `navigationConfig.ts` | exam-native top-level entry |
| 12 | **CTAs WhatsApp/+91-only, no email/form alt; no US/UK number** | 11/14 primary CTAs WhatsApp; contact +91 only | add `mailto:`/email-form CTA; +1/+44 callback |
| 13 | **India jargon on intl pages** — CBSE/ICSE (260), lakh/crore (83), "dropper/repeater" (106) | body copy | gloss/geo-gate on non-India pages |

---

## P2 — Polish
- **US/UK spelling not per-locale** (`color` 1513 vs `colour` 9; `programme` 901 vs `program` 515; "centre" appears on a US page). Lint per region.
- **Phone normalization truncates intl numbers** to 10 digits in `/api/catalog/download` + `/api/enrollment/create-order` (`.slice(-10)`). Use detect-Indian-else-keep-full.
- **Static FX** — display-only; fine short-term.

---

## Recommended fix order
1. **Push/deploy** (Action 0) — make the existing geo layer + US/UK hubs live.
2. **Quick wins (hours):** chatbot + blog phone regex (#7,#8); `GlobalEnquiryForm` on the ~23 NRI/intl pages (#9, also fixes lead invisibility); hreflang typo + reciprocity (#10); nav exposure (#11); email CTA (#12).
3. **P0 conversion (days):** Stripe USD/GBP checkout (#1); demo-booking timezone (#3); geo-currency on `/pricing` + top pages (#5).
4. **P0 trust/messaging (ongoing):** de-diaspora the US-city exam pages + gloss AIIMS (#6); gather real US/UK testimonials (#4) — needs owner input.
5. **P2 polish** as cleanup.

**Strategic read:** you don't need more pages — you need the *default funnel* localized and the existing 240-page cluster made discoverable + payable. Two owner-dependent items gate full success: a **Stripe/PayPal account** for USD/GBP checkout, and **real US/UK student outcomes** for trust.
