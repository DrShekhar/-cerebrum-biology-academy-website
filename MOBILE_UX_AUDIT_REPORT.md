# Mobile UX Audit Report - Cerebrum Biology Academy

**Date:** December 24, 2025
**Viewport Tested:** 375x812 (iPhone X/11/12/13 standard)
**Pages Tested:** Homepage, Blog List, Blog Post, Courses, Demo Booking

---

## Executive Summary

A comprehensive mobile UX audit was conducted on https://cerebrumbiologyacademy.com using a mobile viewport (375x812px). The site is **generally functional** on mobile with good touch target compliance for most interactive elements. However, several **critical layout issues** and **readability concerns** were identified that could impact user experience.

### Overall Assessment

- ✅ **Good:** Navigation structure, touch targets mostly compliant (44px+)
- ⚠️ **Needs Attention:** Horizontal overflow, small text sizes, decorative element overflow
- ❌ **Critical:** Elements exceeding viewport width causing horizontal scroll

---

## Critical Issues (Must Fix)

### 1. Horizontal Overflow - Multiple Elements

**Severity:** CRITICAL
**Impact:** Causes horizontal scrolling, breaks layout integrity
**Location:** Multiple pages

#### Issues Found:

1. **Decorative Background Elements** (600px-1387px wide on 375px viewport)
   - Animated gradient divs with `absolute` positioning
   - Classes: `absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic`
   - Width: 1387px (370% of viewport!)

2. **Container Elements** (376px on 375px viewport)
   - Various wrapper divs exceeding viewport by 1px
   - Likely caused by padding/border calculations

**File Location:**

```
Likely in hero/banner components - check:
- src/app/page.tsx (homepage)
- src/components/sections/* (hero sections)
```

**Fix Required:**

```css
/* Ensure all positioned elements stay within viewport */
.hero-decorative-elements {
  max-width: 100vw;
  overflow: hidden;
}

/* Or use containment */
.hero-container {
  position: relative;
  overflow: hidden; /* Clip children */
}
```

**Screenshot Evidence:**

- `homepage-mobile-initial` - Shows decorative overflow
- All page screenshots show 1px overflow issues

---

### 2. Small Touch Targets (Below 44px Minimum)

**Severity:** HIGH
**Impact:** Difficult to tap on mobile, accessibility violation
**Standard:** iOS recommends 44x44px minimum

#### Elements Affected:

1. **Phone Number Links** (98x20px)
   - Text: `+918826444334`
   - Multiple instances in footer
   - **File:** Check footer component

2. **"Watch Video" Buttons** (95x40px)
   - Height is acceptable, but width is below minimum
   - Multiple instances on homepage

3. **Carousel Dots** (12x12px and 32x12px)
   - Extremely small, unusable on touch devices
   - **File:** Carousel/slider components

4. **Skip to Main Content Link** (1x1px when not focused)
   - Accessibility link, acceptable as it's for keyboard users

**File Location:**

```
src/components/navigation/BurgerMenu.tsx - ✅ Already compliant (44x44px)
Footer component - ❌ Phone links too small
Carousel/Testimonials - ❌ Navigation dots too small
```

**Fix Required:**

```tsx
// Phone links - add padding
<a
  href="tel:+918826444334"
  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-4 py-3"
>
  +918826444334
</a>

// Carousel dots - increase size
<button
  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full"
  aria-label="Go to slide 1"
/>
```

---

## High Priority Issues

### 3. Text Readability - Font Sizes Below 16px

**Severity:** HIGH
**Impact:** Hard to read on mobile, poor UX
**Standard:** Minimum 16px recommended for mobile body text

#### Elements with Small Text (12-14px):

1. **Logo Subtitle** - 12px
   - Text: "Biology Academy"
   - Class: `text-xs text-slate-600`

2. **Badge Text** - 12px
   - Text: "98%", "#1 NEET Biology Coaching"
   - Multiple badge components

3. **CTA Button Text** - 14px
   - "Free Demo", "Enroll Now", "Login"
   - Class: `text-sm`

4. **Descriptive Text** - 14px
   - Hero descriptions, testimonials
   - Class: `text-sm xs:text-base`

**File Locations:**

```
src/components/layout/Header.tsx - Logo subtitle
src/components/ui/Badge.tsx or similar - Badge text
src/components/ui/Button.tsx - Button text sizing
```

**Fix Required:**

```tsx
// Update Tailwind classes for mobile-first
<p className="text-base sm:text-lg"> {/* 16px base instead of 14px */}

// Or update tailwind.config.ts
fontSize: {
  'xs': '0.8125rem', // 13px instead of 12px
  'sm': '0.9375rem', // 15px instead of 14px
  'base': '1rem',     // 16px
}
```

---

### 4. Blog Post - Lead Capture Form Layout

**Severity:** MEDIUM
**Impact:** May not be prominently visible
**Location:** `/blog/[slug]` pages

**Findings:**

- Email subscription form exists in footer ("Stay Updated")
- Form is functional with proper input sizing
- However, no dedicated lead capture form found before footer on blog posts
- Only standard footer newsletter signup visible

**Screenshot Evidence:**

- `blog-post-mobile-bottom-form` - Shows footer form only
- `blog-post-mobile-lead-form` - Content area, no prominent lead form

**Recommendation:**
Consider adding a more prominent lead capture CTA mid-article or after article content (before footer):

```tsx
// Add to blog post layout after content
<LeadCaptureCard
  title="Get NEET Biology Study Tips"
  description="Join 10,000+ students getting weekly study strategies"
  className="my-8"
/>
```

**File Location:**

```
src/app/blog/[slug]/page.tsx - Blog post layout
Create: src/components/blog/LeadCaptureCard.tsx
```

---

## Medium Priority Issues

### 5. Fixed/Sticky Elements - Z-Index Management

**Findings:**

- Header uses `sticky` positioning - ✅ Working correctly
- Toast container at z-index 20000 - Extremely high
- Burger menu overlay at z-100, panel at z-101

**Concern:**
Very high z-index values (20,000) can cause stacking issues and are typically unnecessary.

**File Location:**

```
src/components/layout/Header.tsx - sticky header
src/components/ui/Toast.tsx or notification system - z-20000
src/components/navigation/BurgerMenu.tsx - z-100/101 (reasonable)
```

**Recommendation:**

```css
/* Establish z-index scale in globals.css or theme */
:root {
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-toast: 1080;
}

/* Update toast container */
.toast-container {
  z-index: var(--z-toast); /* 1080 instead of 20000 */
}
```

---

### 6. Console Warnings

**Findings:**

```
[warn] Clerk: Loaded with development keys - should not be in production
[warn] Clerk: "afterSignInUrl" prop deprecated, use "fallbackRedirectUrl"
```

**Impact:** Development artifacts visible, deprecated API usage

**File Location:**

```
Search for: "afterSignInUrl" in src/
Likely in: src/app/layout.tsx or auth configuration
```

**Fix:**

```tsx
// Replace deprecated prop
<ClerkProvider
  fallbackRedirectUrl="/dashboard"  // Instead of afterSignInUrl
  forceRedirectUrl="/dashboard"     // If redirect should be forced
>
```

---

## Low Priority Issues / Observations

### 7. Search Modal Auto-Open Behavior

**Observation:**
When scrolling on homepage, search modal appeared automatically. This might be intentional UX but could be jarring.

**Screenshot:** `homepage-mobile-scrolled` shows search modal open

**File Location:**

```
src/components/navigation/SearchMenu.tsx
Check scroll event listeners in header components
```

---

### 8. Mobile Bottom Navigation

**Positive Finding:** ✅
Mobile bottom navigation bar is present and functional with proper touch targets:

- Home, Tests, Progress, Chat, Profile tabs
- Icons clearly visible
- Adequate spacing between items

**File Location:**

```
src/components/layout/MobileBottomNav.tsx - ✅ Well implemented
```

---

## Page-by-Page Breakdown

### Homepage (/)

- ✅ Hero section loads correctly
- ✅ CTA buttons visible and accessible
- ⚠️ Decorative overflow elements (1387px wide)
- ⚠️ Some text below 16px
- ✅ Stats cards responsive
- ✅ Burger menu functional

**Screenshots:**

- `homepage-mobile-initial` - Initial load
- `homepage-mobile-scrolled` - After scroll (search modal visible)

---

### Blog List (/blog)

- ✅ Hero section with stats (56+ articles, 23M+ reads)
- ✅ Clean layout, good spacing
- ✅ Footer email form functional
- ℹ️ Shows "NaN" for average read time (data issue)

**Screenshots:**

- `blog-mobile-initial` - Blog list hero
- `blog-mobile-bottom` - Footer with email subscription

---

### Blog Post (/blog/[slug])

- ✅ "Back to Blog" navigation present
- ✅ Category tags visible
- ✅ Content readable
- ✅ Table of contents accessible
- ⚠️ No dedicated lead capture before footer
- ⚠️ Some small text in content area

**Screenshots:**

- `blog-post-mobile-top` - Article header
- `blog-post-mobile-lead-form` - Mid-content (table view)
- `blog-post-mobile-bottom-form` - Footer area

---

### Courses (/courses)

- ✅ Hero section clear
- ✅ Stats cards (5 programs, 306 capacity, etc.)
- ✅ Course cards well-formatted
- ✅ CTA buttons prominent ("Book Free Demo Class", "Enroll Now")
- ✅ Tier badges (Pinnacle, Ascent, Pursuit) visible

**Screenshots:**

- `courses-mobile-initial` - Hero
- `courses-mobile-scrolled` - Course cards

---

### Demo Booking (/demo-booking)

- ✅ Clear two-step process indicator
- ✅ Date picker accessible
- ✅ Social proof elements (847+ bookings, 4.9/5 rating)
- ✅ Benefits cards with icons
- ✅ Testimonials carousel
- ⚠️ Carousel navigation dots too small (12x12px)

**Screenshots:**

- `demo-booking-mobile-initial` - Form and stats
- `demo-booking-mobile-form` - Benefits section

---

## Technical Audit Data

### Viewport Analysis

```json
{
  "testedViewport": { "width": 375, "height": 812 },
  "deviceProfile": "iPhone X/11/12/13",
  "orientation": "portrait"
}
```

### Elements Exceeding Viewport

```
1. Decorative gradient div: 1387px (370% overflow)
2. Background animation div: 1387px (370% overflow)
3. Container divs: 376px (1px overflow - rounding issue)
4. Hero background: 600px (160% overflow)
```

### Touch Target Compliance

- **Total Interactive Elements Tested:** 50+
- **Compliant (≥44px):** ~40 (80%)
- **Non-Compliant (<44px):** ~10 (20%)
  - Carousel dots: 3 instances
  - Phone links: 4 instances
  - Small text links: 3 instances

### Font Size Distribution

- **12px:** ~10 elements (badges, labels)
- **14px:** ~20 elements (buttons, links, descriptions)
- **16px+:** Majority of body text ✅
- **Headings:** Appropriately sized (24px+) ✅

---

## Recommendations Summary

### Immediate Actions (This Week)

1. **Fix horizontal overflow** - Add `overflow: hidden` to hero containers
2. **Increase carousel dot sizes** - 12px → 44px minimum
3. **Fix phone link touch targets** - Add padding to meet 44x44px
4. **Update deprecated Clerk props** - Remove console warnings

### Short Term (Next Sprint)

1. **Audit all text sizes** - Ensure minimum 16px for readability
2. **Normalize z-index scale** - Reduce from 20000 to <1100 range
3. **Add blog lead capture** - Create prominent CTA in blog posts
4. **Test "Watch Video" buttons** - Increase width to 44px minimum

### Long Term (Ongoing)

1. **Establish design system** - Document minimum sizes, z-index scale
2. **Add mobile-specific tests** - Playwright tests for touch targets
3. **Implement touch heatmap** - Analytics to identify problem areas
4. **Regular mobile audits** - Quarterly reviews of new features

---

## Positive Findings ✅

1. **Burger Menu Implementation** - Excellent!
   - File: `src/components/navigation/BurgerMenu.tsx`
   - 44x44px touch target ✅
   - Smooth animations ✅
   - Accessible ARIA labels ✅
   - Scroll locking when open ✅
   - Portal rendering to avoid z-index issues ✅

2. **Mobile Bottom Navigation** - Well implemented
   - Proper spacing and touch targets
   - Clear icons and labels

3. **Form Inputs** - Appropriately sized
   - Demo booking form fields are touch-friendly
   - Email subscription inputs adequate

4. **Overall Layout** - Responsive
   - Grid systems adapt well to mobile
   - Images scale appropriately
   - No major broken layouts

---

## Files Requiring Updates

### Critical

```
1. Hero/Background Components
   - src/app/page.tsx
   - src/components/sections/Hero*.tsx
   - Add: overflow: hidden to parent containers

2. Carousel/Slider Components
   - src/components/ui/Carousel.tsx (or similar)
   - Increase navigation dot size to 44x44px

3. Footer Component
   - src/components/layout/Footer.tsx
   - Add padding to phone number links
```

### High Priority

```
4. Typography Configuration
   - tailwind.config.ts
   - Increase base font sizes for mobile

5. Toast/Notification System
   - src/components/ui/Toast.tsx or notification component
   - Reduce z-index from 20000 to ~1080

6. Clerk Configuration
   - src/app/layout.tsx or auth setup
   - Update deprecated props
```

### Medium Priority

```
7. Blog Post Template
   - src/app/blog/[slug]/page.tsx
   - Add lead capture component

8. Button Component
   - src/components/ui/Button.tsx
   - Review text-sm classes, consider text-base for mobile
```

---

## Testing Checklist

Use this checklist for future mobile updates:

- [ ] All interactive elements ≥ 44x44px
- [ ] No horizontal scroll on any page
- [ ] Font sizes ≥ 16px for body text
- [ ] Touch targets have adequate spacing (8px+)
- [ ] Fixed/sticky elements don't block content
- [ ] Forms are easily fillable on mobile
- [ ] Modals/overlays can be dismissed
- [ ] Z-index conflicts resolved
- [ ] No console errors or warnings
- [ ] Page load time < 3 seconds on 3G

---

## Tools Used

- **Browser DevTools:** Viewport simulation
- **Puppeteer MCP:** Automated testing and screenshots
- **Manual Testing:** Visual inspection and interaction testing

---

## Next Steps

1. **Prioritize fixes** by severity (Critical → High → Medium)
2. **Create tickets** for each issue in project management system
3. **Assign owners** for implementation
4. **Test fixes** on real devices (not just emulators)
5. **Deploy to staging** and re-audit
6. **Production deployment** after validation

---

## Appendix: Screenshots

All screenshots saved and referenced in this report:

- `homepage-mobile-initial`
- `homepage-mobile-scrolled`
- `blog-mobile-initial`
- `blog-mobile-bottom`
- `blog-post-mobile-top`
- `blog-post-mobile-lead-form`
- `blog-post-mobile-bottom-form`
- `courses-mobile-initial`
- `courses-mobile-scrolled`
- `demo-booking-mobile-initial`
- `demo-booking-mobile-form`

---

**Report Prepared By:** Claude Code Mobile Audit Tool
**Review Status:** Ready for Development Team Review
**Follow-up:** Schedule fixes and re-audit in 2 weeks
