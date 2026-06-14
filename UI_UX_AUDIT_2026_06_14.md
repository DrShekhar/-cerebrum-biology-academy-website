# UI/UX Audit — 2026-06-14

5-agent parallel audit (accessibility/semantics · responsive/mobile · forms/conversion · loading-error-empty states · visual/design-system).
Grounded against `FULL_AUDIT_2026_06_12.md`; reports **current** issues (already-fixed items like LeadCaptureForm Enter/double-submit, the `/contact` form, the 6 board WhatsApp CTAs are excluded). All evidence is `file:line`.

---

## Executive summary — two systemic themes

**1. Mobile chrome is broken site-wide.** On phones the page bottom is a mess: two fixed bars overlap, the full menu is unreachable, and the main conversion CTA never renders. This is the highest-impact cluster because the audience is mobile-heavy.

**2. Design-system drift lives in the *templates*.** Banned accents (indigo 686 files, emerald 134) and 862 ad-hoc gradients are baked into the high-multiplier SEO templates — so fixing ~5 template files corrects *hundreds* of rendered pages at once.

Beyond those: paying-user portals crash to blank on any render error (no `error.tsx`), a few money-CTAs are dead no-ops, the seminar form blocks international (NRI) phones, and there's a fabricated-social-proof component that's a trust/legal landmine if ever mounted.

Net vs June: forms/a11y foundations are **much better** (skip-link, lang, landmarks, `next/image` everywhere → low CLS, gold-standard `CityInlineEnquiryForm`/`StreamlinedEnrollmentPage`). The gaps are concentrated, not pervasive.

---

## P0 — fix before/with the next deploy (high impact, bounded)

| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| P0-1 | **Two fixed bottom bars overlap on every mobile page**; content also sits behind the doubled stack | `MobileBottomNav.tsx:172` (`bottom-0 z-50 md:hidden`) + `Footer.tsx:518` (`bottom-0 z-50 lg:hidden`) | Gate the Footer call bar to `md:hidden` (or drop on mobile — bottom-nav already has Call); bump `--mobile-nav-safe-height` |
| P0-2 | **Full mobile menu unreachable** — no "Menu" tab, so the built drawer (About/Results/Resources/Contact/IB/Faculty) is dead code | `MobileBottomNav.tsx:98-131` (no Menu item) vs drawer at `:262-369` | Add a `Menu` tab to `bottomNavItems` so the existing drawer mounts |
| P0-3 | **FloatingCTA mobile Call+WhatsApp bar permanently hidden** (static `hidden`, never un-hidden) → no mobile floating CTA | `FloatingCTA.tsx:110` | `hidden` → `flex md:hidden` (reconcile with P0-1/2 so it's not a 3rd bar) |
| P0-4 | **Paying-user portals crash to blank** — `parent/`, `teacher/`, `consultant/` have no `error.tsx` (a render throw bubbles to global/blank) | `src/app/{parent,teacher,consultant}/` (no error.tsx; parent/consultant also no loading.tsx) | Add `error.tsx` (+`loading.tsx`) to all three (29 authed pages) |
| P0-5 | **Dead money-CTAs** (`<Button href>` → ui/Button renders `<button>`, ignores href = no-op) | `CourseFAQ.tsx:413-418` (Brochure + Campus Visit, both dead); `contact/page.tsx:439-447` (Campus Visit) | Wrap in `<Link href>` / add onClick; make ui/Button render `<a>` when `href` set |
| P0-6 | **Seminar form rejects all international phones** (`/^[6-9]\d{9}$/`) — NRI/global is a *paying* audience | `SeminarRegistrationForm.tsx:71` | Accept +country-code / international format |
| P0-7 | **Fabricated social-proof component** ("{name} just enrolled", `Math.random()` viewers/bookings) — dead now, trust/ASCI-legal landmine if mounted | `ui/LiveEnrollmentNotifications.tsx:57,162-208` (0 imports) | Delete the file |
| P0-8 | **`book-free-demo` inputs not in a `<form>`** → Enter doesn't submit (high-traffic demo lander); no `inputMode="tel"` | `book-free-demo/page.tsx:334-360,375` | Wrap in `<form onSubmit>`; add `inputMode="tel"` |

## P1 — high leverage / high reach (do soon)

| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| P1-1 | **Banned indigo accent in 686 files (3,553×)** — baked into SEO templates | `seo/NEETToolsWidget.tsx:71-116`, `seo/LandingPageTemplate.tsx:72,202,238` | Remap indigo→blue-600/purple-700; **start with the 5 templates** (fixes most pages) |
| P1-2 | **Banned emerald accent in 134 files (883×)** — `CityHubPage` renders **97 city pages** | `seo/CityHubPage.tsx:765-799`, `StateLandingPage.tsx`, `ComparisonLandingPage.tsx` | emerald→green in the 3 templates first |
| P1-3 | **~148 comparison/pricing tables crush at 375px** (`w-full`+`overflow-x-auto`, no `min-w`) | `re-neet-2026-…:255`, `dat-biology-pricing:78`, `ComparisonLandingPage.tsx:152` (pattern exists correctly in `PricingComparisonTable.tsx:79`) | Add `min-w-[600px]` to the inner `<table>` (mechanical bulk) |
| P1-4 | **Legacy `EnrollmentForm` (the money form)** — no inline validation, no autoComplete/inputMode, labels not associated (a11y) | `enrollment/EnrollmentForm.tsx:281-352` (gold standard: `StreamlinedEnrollmentPage.tsx:919-987`) | Retire it for StreamlinedEnrollmentPage, or bring it to that bar; confirm which renders in prod |
| P1-5 | **Blog posts emit duplicate `<h1>`** (title h1 + markdown `#`→h1) — every post | `blog/BlogPostPage.tsx:220` + `:352-360` | Map ReactMarkdown `#`→`h2` (demote rest) |
| P1-6 | **EnrollmentForm + LeadCaptureForm a11y** — labels unassociated; error regions missing `aria-live`/`role=alert` | `EnrollmentForm.tsx:289-342,281`; `LeadCaptureForm.tsx:335` | id/htmlFor pairs; `aria-live="assertive"` on errors |
| P1-7 | **~12+ search inputs + carousel/lightbox buttons missing accessible names** (incl. site-wide header search) | `StickyNavigationHeader.tsx:423`, `PhotoGallerySection.tsx:338-357`, `MobileAppPromoSection.tsx:318-341`, +9 | add `aria-label` |
| P1-8 | **`purchase/[courseId]` + `free-resources/[id]` missing metadata** (broken share previews on buy/resource paths) | `purchase/layout.tsx` (no meta); `free-resources/[id]/page.tsx` (client, no layout) | add `generateMetadata` / a layout |

## P2 — larger or design-judgment (schedule / owner input)

- **Gradient token system** — 862 distinct gradients → collapse to the approved 8; remap pink→purple, cyan→blue (104/67 files), non-brand raw hex (191 files) → tokens. Needs a design-token pass + bulk codemod.
- **De-client-ify heavy public pages** — 3 NCR `neet-coaching-{noida,faridabad,gurugram}` page.tsx are ~2,000 lines shipped as JS (LCP/TTI + ranking). Bigger refactor (server component + client islands). Also `color-palette/page.tsx` (3,077 lines) looks dev-only → candidate to delete.
- **Custom dropdowns not keyboard-operable** (CurrencySelector/CountrySelector/ModeSelector) — implement listbox roving-tabindex or use native `<select>`.
- **BottomSheet (counselor) no focus-trap/Esc**; `TopicSelector.tsx:158` `<div onClick>` no keyboard.
- **Hardcoded `© 2026`** in site-wide `SEOFooterLinks.tsx:301` (+3 others) → `getFullYear()`.
- **`formatCurrency` redefined 16×** + 23 inline `Intl.NumberFormat` → single util (₹-format drift).
- **Dead duplicate components** (HeaderServer, EmotionalHeroSection, CountdownTimer, SuccessNotifications, the standalone SuccessTicker) → delete to prevent stale-variant wiring.
- **Soft dark patterns** — static "Only N seats left / filling fast / Hurry" on ~30 pages (not random-fake, but never changes); `ExitIntentPopup` advertises a capture field it no longer renders (dead `onDownload` prop). Owner call.
- **EnrollmentForm misleading success** — claims "WhatsApp confirmation sent" even when that fetch failed (`EnrollmentForm.tsx:175-190,230`).

---

## Verified healthy (not re-flagged)
skip-link + `lang` + landmark roles; Radix/focus-trap modals (UpgradeModal, UPIPaymentModal); Toast/Input `aria-live`; **zero raw `<img>`** (all `next/image` → low CLS); no informative-image alt gaps; main `dashboard`/`admin`/`student`/`counselor` segments have loading+error; `CityInlineEnquiryForm`, `StreamlinedEnrollmentPage`, `OlympiadLeadForm`, `LeadCaptureForm` (post-fix), BlogNewsletter loading/error/success; BottomSheet/drawer scroll-lock; Suspense in 20 files. The `/contact` "no form" and 6 dead board WhatsApp CTAs from June appear fixed.

## Highest-leverage takeaway
Two small batches deliver most of the value: (a) **the mobile-chrome cluster** (P0-1/2/3 — a handful of edits to 3 components fixes navigation + conversion on every mobile page), and (b) **the 5 SEO templates** (P1-1/2/3 — indigo/emerald/table-min-w in CityHubPage/State/Comparison/Landing/NEETToolsWidget corrects hundreds of pages). Both are bounded and high-reach.
