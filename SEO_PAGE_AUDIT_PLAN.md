# SEO Landing Pages - Comprehensive Audit & Optimization Plan

## Audit Checklist (9 Pages)

### Pages to Audit:

1. `/neet-biology-coaching-delhi-ncr`
2. `/neet-biology-class-11`
3. `/neet-biology-class-12`
4. `/neet-biology-study-material`
5. `/neet-biology-preparation-tips`
6. `/class-11-biology-tuition`
7. `/class-12-biology-tuition`
8. `/class-12-board-biology-preparation`
9. `/cbse-biology-coaching-delhi`

---

## Phase 1: Mobile Responsiveness Check

### Critical Mobile Elements:

- [ ] Hero section text readable on mobile (375px width)
- [ ] Buttons accessible with thumb (min 48px height)
- [ ] No horizontal scroll
- [ ] Form fields properly sized
- [ ] Images/graphics scale appropriately
- [ ] Navigation works on mobile
- [ ] Footer links accessible

### Responsive Breakpoints to Test:

- **Mobile:** 375px (iPhone SE)
- **Tablet:** 768px (iPad)
- **Desktop:** 1280px+

### Current Status:

✅ Using Tailwind responsive classes (`md:`, `lg:`, `sm:`)
✅ Flex layouts switch to column on mobile (`flex-col sm:flex-row`)
✅ Text scales appropriately (`text-4xl md:text-5xl lg:text-6xl`)

---

## Phase 2: WhatsApp CTA Prominence

### What to Check:

- [ ] FloatingCTA (green WhatsApp button) visible on all pages?
- [ ] Positioned prominently (bottom-right corner)?
- [ ] z-index correct (not hidden behind other elements)?
- [ ] Mobile: bottom-20 positioning (above StickyCTA)?
- [ ] Desktop: bottom-8 right-8 positioning?
- [ ] Visible on scroll (after 2s delay)?

### Expected Behavior:

- **Mobile:** Green floating button at bottom-right (z-60)
- **Desktop:** Larger button with label "Talk to AIIMS Expert"
- **Always visible:** Yes (2s delay for initial load)
- **Click action:** Opens WhatsApp with context-aware message

### Current Implementation:

```tsx
// Mobile: bottom-20 sm:bottom-24 right-3 sm:right-4 z-[60]
// Desktop: bottom-8 right-8 z-[70]
```

**ISSUE TO CHECK:** Does StickyCTA overlap with FloatingCTA?

- StickyCTA: z-40, bottom-0 (fixed bar)
- FloatingCTA: z-60/z-70, bottom-20/bottom-8
- Should be fine, but verify visually

---

## Phase 3: SEO Optimization

### Meta Tags Check:

- [ ] **Title:** Under 60 characters, includes primary keyword
- [ ] **Description:** Under 155 characters, includes CTA
- [ ] **Keywords:** Includes primary + secondary keywords
- [ ] **OG Tags:** title, description, image set
- [ ] **Canonical URL:** Correct and unique per page

### H1/H2 Structure:

- [ ] **One H1 per page** with primary keyword
- [ ] **4-6 H2 tags** with secondary keywords
- [ ] Semantic hierarchy (H1 → H2 → H3)
- [ ] Keywords used naturally (not stuffed)

### Schema Markup:

- [ ] LocalBusiness schema present?
- [ ] Course schema present?
- [ ] Breadcrumb schema (if applicable)?
- [ ] Organization schema?

### Images & Alt Text:

- [ ] All images have descriptive alt text
- [ ] Images are optimized (lazy loading)
- [ ] No missing image sources

### Internal Linking:

- [ ] Link to related pages (other courses)
- [ ] Link to blog posts (if relevant)
- [ ] Footer links to all important pages
- [ ] Breadcrumbs (if applicable)

---

## Phase 4: Conversion Optimization

### Above the Fold (Hero):

- [ ] Clear value proposition in H1
- [ ] Subheadline explains benefit
- [ ] Primary CTA visible ("Book Free Demo")
- [ ] Secondary CTA available ("Call Now")
- [ ] Trust badges displayed (15+ Years, 10K Students, 99%)
- [ ] Phone number click-to-call

### Lead Form:

- [ ] Simple form (Name, Phone, Class)
- [ ] Clear submit CTA ("Book Free Demo Class")
- [ ] Google Ads conversion tracking integrated
- [ ] WhatsApp alternative offered
- [ ] Form validation works
- [ ] Success message after submission

### Trust Signals:

- [ ] Years of experience mentioned
- [ ] Student count highlighted
- [ ] Success rate visible (99%)
- [ ] Faculty credentials shown
- [ ] Results/testimonials present
- [ ] Social proof (selections, scores)

### USPs Section:

- [ ] 8-10 clear unique selling points
- [ ] Icons for visual appeal
- [ ] Benefits-focused language
- [ ] Concise descriptions

### FAQ Section:

- [ ] 5-7 keyword-rich questions
- [ ] Answers address objections
- [ ] Schema markup for rich snippets
- [ ] Accordion UI for easy scanning

### Location Section:

- [ ] Address displayed (South Extension)
- [ ] Phone number click-to-call
- [ ] Google Maps embed
- [ ] Service areas mentioned (Delhi NCR)

### Sticky CTA Bar:

- [ ] Appears after scroll (300px)
- [ ] "Call Now" + "Book Demo" buttons
- [ ] Phone number visible on mobile
- [ ] Doesn't overlap with WhatsApp button
- [ ] Clear CTA copy

---

## Phase 5: Performance Check

### Page Speed:

- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse SEO score = 100
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.5s

### Bundle Size:

- [ ] No unnecessary dependencies loaded
- [ ] Images optimized (WebP format)
- [ ] Lazy loading enabled
- [ ] Code splitting implemented

---

## Optimization Recommendations

### High Priority (P0):

1. **Add WhatsApp CTA to Hero Section**
   - Current: Only "Book Demo" and "Call Now"
   - Add: "Chat on WhatsApp" button as tertiary CTA
   - Reason: WhatsApp has higher engagement than forms

2. **Add Schema Markup**
   - LocalBusiness schema for SEO
   - Course schema for rich snippets
   - FAQ schema for featured snippets

3. **Add Breadcrumbs**
   - Home > NEET Biology > [Page Name]
   - Helps SEO and UX

### Medium Priority (P1):

4. **Add Testimonials Section**
   - Student success stories
   - Video testimonials (link to existing 5 videos)
   - Before/after score improvements

5. **Add Urgency Elements**
   - "Limited seats: 3/15 filled"
   - "Batch starting: Feb 5, 2026"
   - "Early bird discount: Ends in 48h"

6. **Improve Mobile CTA Visibility**
   - Larger buttons on mobile
   - Sticky CTA bar on mobile too
   - WhatsApp button more prominent

### Low Priority (P2):

7. **Add Live Chat**
   - Aria sales agent integration
   - Instant response for queries

8. **Add Exit Intent Popup**
   - Capture leads before they leave
   - Offer: Free demo or study material

9. **Add Social Proof**
   - Live counter: "12 students joined today"
   - Recent enrollments
   - Real-time notifications

---

## Testing Protocol

### Manual Testing (Required):

1. Open each page on localhost:3000
2. Resize browser to mobile width (375px)
3. Check:
   - Text readability
   - Button sizes (thumb-friendly)
   - Form usability
   - WhatsApp button visibility
   - No horizontal scroll
4. Test on real devices:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1280px+)

### Automated Testing:

```bash
# Run Lighthouse audit
npm run lighthouse

# Run mobile responsiveness tests
npm run test:e2e -- mobile-responsiveness.spec.ts
```

---

## Implementation Plan

### Step 1: Quick Fixes (30 min)

- [ ] Verify WhatsApp CTA visible on all pages
- [ ] Fix any mobile responsiveness issues
- [ ] Ensure forms work correctly

### Step 2: SEO Enhancements (1 hour)

- [ ] Add schema markup to all pages
- [ ] Verify all meta tags correct
- [ ] Add breadcrumbs component
- [ ] Check internal linking

### Step 3: Conversion Optimization (1 hour)

- [ ] Add WhatsApp CTA to hero sections
- [ ] Add urgency elements
- [ ] Enhance trust signals
- [ ] Add testimonials section reference

### Step 4: Testing & Validation (30 min)

- [ ] Test all pages on mobile/tablet/desktop
- [ ] Run Lighthouse audits
- [ ] Verify Google Ads tracking
- [ ] Check form submissions

---

## Success Metrics

### SEO:

- ✅ Lighthouse SEO score: 100/100
- ✅ All meta tags present and optimized
- ✅ Schema markup validated
- ✅ Mobile-friendly test: Pass

### Conversion:

- ✅ WhatsApp CTA visible on all pages
- ✅ Form submission works
- ✅ Google Ads tracking fires
- ✅ Phone click-to-call works

### Performance:

- ✅ Lighthouse Performance: 90+/100
- ✅ LCP < 2.5s
- ✅ CLS < 0.1
- ✅ Mobile-optimized

---

## Next Steps After Audit

1. **Commit improvements** to Git
2. **Deploy to production** via Vercel
3. **Verify live pages** on cerebrumbiologyacademy.com
4. **Set up Google Ads campaigns** targeting these pages
5. **Monitor conversion rates** via Google Analytics
6. **A/B test CTAs** to optimize conversion

---

**Audit Started:** 2026-01-20
**Expected Completion:** 2-3 hours
**Priority:** HIGH - Blocking Google Ads launch
