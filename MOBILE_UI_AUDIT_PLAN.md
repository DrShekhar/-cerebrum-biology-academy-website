# Mobile UI/UX + Google Ads Audit — Fix Plan

**Date**: Mar 5, 2026 | **Total**: 49 findings | 7 CRITICAL | 16 HIGH | 16 MEDIUM | 10 LOW

## Phase 1: CRITICAL Fixes — COMPLETE

### 1A. CSS Variable + Z-Index Stack (4 CRITICALs) — DONE
- [x] `--mobile-nav-safe-height` was already defined (false positive)
- [x] Standardized z-index: header z-100, burger z-110/111, modal z-120/121
- [x] Fixed scroll-padding-top: 80px for sticky header
- [x] Removed inline style override (zIndex: 999) on HeaderHybrid

### 1B. Google Ads Enhanced Conversions (2 CRITICALs) — DONE
- [x] Implemented real `trackEnhancedConversion()` with user data (email, phone, name)
- [x] Wired BookingForm to pass name to enhanced conversions
- [ ] GCLID offline conversion import (blocked: needs Google Ads API credentials)

## Phase 2: HIGH Fixes — COMPLETE

### 2A. Touch Targets — DONE
- [x] Input.tsx: h-12 min-h-[48px]
- [x] BookingForm.tsx: all selects/date/time get min-h-[48px]
- [x] WhatsAppLeadGate: all inputs/buttons min-h-[48px], close button 44px
- [x] ReferralInput: input and button min-h-[48px]
- [x] AriaInput: buttons h-11 min-h-[44px], input min-h-[44px]
- [x] Modal.tsx: max-h-[calc(100dvh-2rem)], close button 44px touch target

### 2B. Form UX — DONE
- [x] WhatsAppLeadGate: red border on error + aria-invalid
- [x] Phone inputs: inputMode="numeric" on 7 key conversion forms
- [x] BookingForm, DemoBookingForm, LeadCaptureModal, ExitIntentPopup (x2), LeadForm, WhatsAppLeadGate

### 2C. Performance Quick Wins — DONE
- [x] geistMono font: display 'swap' → 'optional'
- [x] Removed unused dns-prefetch (giscus.app, zyrosite.com)
- [x] HeaderHybrid: removed all inline styles, converted to Tailwind classes
- [x] GA/FB Pixel: already deferred 3-5s+ (no change needed)

### 2D. Z-Index Full Normalization — DONE
- [x] SearchMenu: z-[9999] → z-[115]
- [x] ExitIntentPopup: z-[9999] → z-[125]
- [x] StickyMobileCallBar: z-[9999] → z-[90]
- [x] Toast: z-[20000] → z-[140]
- [x] WhatsAppDesktopModal: z-[200] → z-[125]
- [x] Updated zIndex.ts constants to match actual hierarchy

## Phase 3: MEDIUM + LOW (Remaining)
- [ ] Homepage skeleton min-heights (CLS fix) — already has minHeight: 384px
- [ ] Exit intent skip on conversion pages — DONE
- [ ] Facebook Pixel event tracking — needs FB Pixel ID
- [ ] Cookie consent banner — separate task
- [ ] Large component splitting (TestCreationInterface 2461 lines) — not on critical path
- [ ] GCLID format validation — needs Google Ads API access
- [ ] RouteChangeIndicator z-[9999] — cosmetic, rarely visible
- [ ] StudyWithMePage z-[9999/10000] — niche feature page

## Z-Index Hierarchy (Final)

| Level | Component | Z-Index |
|-------|-----------|---------|
| Base | Content | 0-10 |
| Sticky | Sticky elements | 50 |
| Float | Floating CTAs | 70-80 |
| Bottom | Mobile call bar | 90 |
| Header | Sticky header | 100 |
| Burger | Menu backdrop/panel | 110/111 |
| Search | Search overlay | 115 |
| Modal | Radix Dialog | 120/121 |
| Exit | Exit intent popup | 125 |
| WhatsApp | Lead gate, desktop modal | 125-130 |
| Toast | Notifications | 140 |

## Commits
1. `cd9eaa93` — wire lead capture, nurturing & communication systems
2. `21cc9bcb` — clean up overlapping floating buttons, remove ad blocker popup
3. `48495f55` — normalize z-index stack, add scroll-padding-top
4. `7691ba0a` — implement Google Ads enhanced conversions
5. `5417b623` — enforce WCAG touch targets (min 44-48px)
6. `8388afd6` — improve form UX (error states, inputMode numeric)
7. `59ea9ff4` — optimize font loading, remove unused dns-prefetch
8. `a21549ba` — remove inline style override (z-index 999 → 100)
9. `fde21de4` — suppress exit intent on conversion pages
10. `9a22747d` — normalize remaining z-index values to 0-150
11. `86cc227b` — normalize WhatsAppDesktopModal z-index
