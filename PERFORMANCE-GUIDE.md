# Performance Optimization Guide

## 🎯 Problem: Site Keeps Getting Slow

Your site performance degrades over time because **every new feature adds weight**, even with lazy loading. This guide shows you how to maintain fast performance permanently.

---

## ✅ Proven Solution (96/100 Performance Score)

### Results from Gurgaon Page Optimization

| Metric            | Before      | After           | Improvement |
| ----------------- | ----------- | --------------- | ----------- |
| Performance Score | 77/100      | **96/100**      | +19 points  |
| LCP               | 5.7s (Poor) | **1.8s (Good)** | 68% faster! |
| Best Practices    | 75/100      | **93/100**      | +18 points  |
| SEO               | 100/100     | **100/100**     | Perfect ✅  |

---

## 🔧 What Was Fixed

### 1. Removed Framer Motion from Hero Section ⚡

**Impact:** Removed ~50KB JavaScript from critical path, improved LCP by 3.9 seconds

**Before (Heavy - 50KB in critical path):**

```tsx
import { motion } from 'framer-motion'
;<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h1>Hero Content</h1>
</motion.div>
```

**After (Lightweight - CSS only):**

```tsx
<div className="animate-fade-in-up">
  <h1>Hero Content</h1>
</div>
```

**Why This Works:**

- CSS animations run on compositor thread (non-blocking)
- No JavaScript parsing/execution required for first paint
- Content appears immediately, animates smoothly
- Framer Motion still used below-the-fold for complex animations

### 2. Removed Duplicate Google Ads Script 🚫

**Impact:** Eliminated render-blocking script from `<head>`

**Before (Blocking):**

```html
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11121440988"></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'AW-11121440988')
  </script>
</head>
```

**After (Non-blocking):**

```html
<head>
  {/* Google Ads loaded by GoogleAnalytics component with lazyOnload strategy */}
</head>
```

The GoogleAnalytics component (src/components/analytics/GoogleAnalytics.tsx) already loads gtag with `strategy="lazyOnload"`, so the duplicate script was unnecessary and harmful.

---

## 📋 Performance Optimization Checklist

Use this checklist for **every new page or feature** to prevent performance degradation:

### Hero Section (Above-the-Fold)

- [ ] Use CSS animations instead of Framer Motion
- [ ] Use `animate-fade-in-up` class (defined in layout.tsx critical CSS)
- [ ] No large images without `priority` prop
- [ ] No blocking JavaScript

### Below-the-Fold Content

- [ ] Use `whileInView` for Framer Motion animations (lazy trigger)
- [ ] Lazy load heavy components (Chatbot, Sales Agent, Exit Intent)
- [ ] Use `loading="lazy"` on all images and iframes
- [ ] Defer non-critical scripts

### Before Committing

- [ ] Run `npm run build` to check bundle size
- [ ] Run Lighthouse audit (target: 90+ performance)
- [ ] Test on 3 screen sizes (375px, 768px, 1280px+)
- [ ] Check Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 🎨 CSS Animation Classes Available

These classes are defined in `src/app/layout.tsx` critical CSS and can be used anywhere:

| Class                | Animation          | Use Case                      |
| -------------------- | ------------------ | ----------------------------- |
| `animate-fade-in-up` | Fade in + slide up | Hero sections, card entrances |
| `animate-pulse`      | Pulsing opacity    | Loading states, attention     |

**Example Usage:**

```tsx
// Hero section
<div className="animate-fade-in-up">
  <h1>Best NEET Coaching</h1>
</div>

// Loading state
<div className="animate-pulse">
  <div className="h-8 bg-gray-200 rounded"></div>
</div>
```

---

## 🚫 Common Performance Mistakes to Avoid

### ❌ DON'T: Use Framer Motion in Hero Sections

```tsx
// Heavy - loads 50KB Framer Motion before first paint
import { motion } from 'framer-motion'
;<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  {/* Hero content */}
</motion.div>
```

### ✅ DO: Use CSS Animations for Critical Content

```tsx
// Lightweight - CSS only
<div className="animate-fade-in-up">{/* Hero content */}</div>
```

---

### ❌ DON'T: Load Heavy Scripts in `<head>`

```html
<!-- Blocks page load -->
<head>
  <script async src="https://www.googletagmanager.com/gtag/js"></script>
</head>
```

### ✅ DO: Use `lazyOnload` Strategy

```tsx
// src/components/analytics/GoogleAnalytics.tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
```

---

### ❌ DON'T: Use Framer Motion for Simple Hover Effects

```tsx
// Overkill - loads entire Framer Motion library
<motion.button whileHover={{ scale: 1.05 }}>Click Me</motion.button>
```

### ✅ DO: Use CSS Transitions

```tsx
// Lightweight - CSS only
<button className="transition-transform hover:scale-105">Click Me</button>
```

---

## 📊 How to Monitor Performance

### 1. Run Lighthouse Before Each Deploy

```bash
# Test specific page
npx lighthouse https://cerebrumbiologyacademy.com/your-page --view

# Target scores:
# Performance: 90+
# SEO: 100
# Accessibility: 90+
# Best Practices: 90+
```

### 2. Check Core Web Vitals

```bash
# From Chrome DevTools:
# 1. Open DevTools → Performance tab
# 2. Click "Record" → Reload page → Stop
# 3. Check:
#    - LCP < 2.5s (Good)
#    - FID < 100ms (Good)
#    - CLS < 0.1 (Good)
```

### 3. Monitor Bundle Size

```bash
# Check total bundle size
npm run build

# Analyze bundle composition
npx @next/bundle-analyzer
```

---

## 🎓 Pattern to Apply to Other Pages

Follow this exact pattern for Noida, Ghaziabad, and other location pages:

### Step 1: Read the Page

```bash
# Identify all motion.div in hero section
grep -n "motion.div" src/app/neet-coaching-noida/page.tsx
```

### Step 2: Replace Framer Motion in Hero

```tsx
// Before:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-center max-w-4xl mx-auto"
>

// After:
<div className="text-center max-w-4xl mx-auto animate-fade-in-up">
```

### Step 3: Keep Framer Motion Below-the-Fold

```tsx
// Below-the-fold sections can keep whileInView animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Testimonials, FAQs, etc. */}
</motion.div>
```

### Step 4: Test and Deploy

```bash
# Format
npx prettier --write src/app/neet-coaching-noida/page.tsx

# Commit
git add src/app/neet-coaching-noida/page.tsx
git commit -m "perf: Replace Framer Motion with CSS animations in hero"
git push

# Wait 2 minutes, then test
npx lighthouse https://cerebrumbiologyacademy.com/neet-coaching-noida --view
```

---

## 🔄 Why Performance Keeps Degrading

### Root Cause: Feature Accumulation

Your site has accumulated features over time:

- 8+ context providers (I18n, Auth, Tracking, Toast, Trust, Personalization, Motion)
- 10+ dynamic components (Analytics, PWA, Trial Banner, Footer, Mobile Nav, FloatingCTA, Exit Intent, Chatbot, Sales Agent)

**Every new feature adds weight, even with lazy loading.**

### Solution: Audit and Remove

Periodically audit your site and remove unused features:

```bash
# Find unused components
npx depcheck

# Remove unused dependencies
npm uninstall <unused-package>

# Check bundle impact
npm run build
```

---

## 📝 Quick Reference

### High-Traffic Pages to Optimize First

1. ✅ `/neet-coaching-gurugram` - **96/100 performance** (DONE)
2. 🔄 `/neet-coaching-noida` - Apply same pattern
3. 🔄 `/neet-coaching-ghaziabad` - Apply same pattern
4. 🔄 `/neet-coaching-delhi` - Apply same pattern
5. 🔄 Homepage `/` - Apply same pattern

### Expected Performance Targets

- **Performance:** 90-96/100
- **LCP:** < 2.5s (Good)
- **FCP:** < 1.8s (Good)
- **CLS:** < 0.1 (Good)
- **SEO:** 100/100
- **Best Practices:** 90+/100

---

## 🚀 Next Steps

1. **Apply this pattern to Noida page** (highest traffic after Gurugram)
2. **Remove unused features** from layout.tsx (audit context providers)
3. **Set up automated Lighthouse testing** in CI/CD
4. **Monitor Core Web Vitals** in Google Search Console

---

## 📞 Questions?

If you need help applying this pattern to other pages, refer to:

- This guide: `PERFORMANCE-GUIDE.md`
- Optimized example: `src/app/neet-coaching-gurugram/page.tsx`
- Critical CSS: `src/app/layout.tsx` (lines 206-306)

**Remember:** Simple is fast. CSS animations beat JavaScript every time for critical content.
