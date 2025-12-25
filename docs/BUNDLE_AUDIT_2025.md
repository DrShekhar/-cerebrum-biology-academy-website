# Bundle Size & Performance Audit - December 2025

## Executive Summary

**Current State:**
- Build directory size: **3.6GB** (.next)
- Deployment size: **189MB** (.vercel/output)
- Server bundle: **381MB**
- Static assets: **27MB**
- Total deployment: **~522MB**
- Pages: **597 pages** (many SEO landing pages)

**Critical Issues Identified:**
1. ❌ **2.8MB single chunk** (29717.js) - CRITICAL BLOAT
2. ❌ **No bundle analyzer** installed
3. ⚠️ **Barrel export pattern** causing unnecessary imports
4. ⚠️ **Prisma client**: 116MB in node_modules
5. ⚠️ **Framer-motion**: 538 imports, 3MB in node_modules
6. ⚠️ **@clerk/nextjs**: 13MB in node_modules

---

## 1. Bundle Analysis - Top Chunks

```
Chunk                         Size      Issue
─────────────────────────────────────────────────────
29717.js                      2.8MB     🚨 CRITICAL - Investigate immediately
framework.js                  932KB     ✅ Normal (React/Next.js core)
common.js                     853KB     ⚠️ Review - should be split
lib.js                        453KB     ⚠️ Vendor chunks need optimization
22593.js                      275KB     ⚠️ Unknown chunk - needs investigation
71876.js                      263KB     ⚠️ Possible heavy component
66932.js                      256KB     ⚠️ Possible heavy component
ui.js                         161KB     ✅ Acceptable for UI library
```

**Action Required:** The **2.8MB chunk (29717.js)** is your #1 priority. This single file is larger than your entire app should be.

---

## 2. Dependency Analysis

### Heavy Dependencies

| Package | Size | Instances | Optimization Potential |
|---------|------|-----------|----------------------|
| `@prisma/client` | 116MB | Used in API routes | ⚠️ Server-side only - ensure not in client bundle |
| `@clerk/nextjs` | 13MB | Auth provider | ✅ Already optimized in next.config |
| `framer-motion` | 3MB | 538+ imports | 🚨 **HIGH** - Many pages over-using animations |
| `@radix-ui/*` | ~2MB | 6 packages | ✅ Already in optimizePackageImports |
| `lucide-react` | ~1.5MB | Heavy usage | ✅ Already in optimizePackageImports |

---

## 3. Import Pattern Issues

### ❌ CRITICAL: Barrel Export Pattern

**Found in:**
```typescript
// src/components/illustrations/blog/index.ts
export * from './shared'
export { KotaVsOnlineIllustration } from './KotaVsOnlineIllustration'
export { ClassStartTimeIllustration } from './ClassStartTimeIllustration'
// ... 50+ more exports
```

**Problem:** When you import ONE illustration, webpack may bundle ALL 50+ illustrations.

**Impact:** Estimated **100-500KB** unnecessary bloat per page using these imports.

**Solution:**
```typescript
// ❌ BAD - imports entire barrel
import { KotaVsOnlineIllustration } from '@/components/illustrations/blog'

// ✅ GOOD - direct import
import { KotaVsOnlineIllustration } from '@/components/illustrations/blog/KotaVsOnlineIllustration'
```

### Other Barrel Exports Found:
- `src/lib/validation/index.ts`
- `src/lib/images/index.ts`
- `src/lib/omr/index.ts`
- `src/components/courses/index.ts`
- `src/components/checkout/index.ts`
- `src/components/seo-landing/index.ts`

---

## 4. Framer Motion Overuse

### Current State
- **538+ imports** across the codebase
- Used on SEO landing pages (unnecessary for static content)
- Many pages import `motion` but use simple animations

### Analysis
```bash
# Pages with framer-motion imports (sample)
src/app/demo/join/page.tsx
src/app/demo/complete/page.tsx
src/app/faculty/[facultyId]/page.tsx
src/app/neet-coaching-west-delhi/[area]/page.tsx
src/app/neet-coaching-institute/page.tsx
# ... 530+ more
```

**Problem:** framer-motion is **90KB minified + gzipped**. Many pages only use it for basic fade/slide animations.

### Solutions

#### Strategy 1: CSS-Only Animations (Best for SEO pages)
```tsx
// ❌ BEFORE (90KB)
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// ✅ AFTER (0KB - pure CSS)
<div className="animate-fadeInUp">
  Content
</div>

// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

**Estimated Savings:** 90KB × 300 pages = **27MB** in total bundle reduction

#### Strategy 2: Lazy Load framer-motion
```tsx
// For interactive pages that genuinely need animations
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => mod.motion.div),
  { ssr: false }
)
```

#### Strategy 3: Remove from SEO Landing Pages
SEO pages are static and don't need animations for search engines.

---

## 5. Missing Bundle Analyzer

### Install and Configure

```bash
npm install --save-dev @next/bundle-analyzer
```

**File: `next.config.mjs`**
```javascript
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withSentryConfig(withMDX(nextConfig), ...))
```

**Usage:**
```bash
ANALYZE=true npm run build
```

This will generate an interactive HTML report showing:
- Exact breakdown of that 2.8MB chunk
- Which components are bundled together
- Duplicate dependencies
- Opportunities for code splitting

---

## 6. Dynamic Import Opportunities

### Components to Lazy Load

Based on bundle analysis, these components should be dynamically imported:

#### High Priority (Heavy Components)
```typescript
// 1. Rich Text Editors (if used)
const RichTextEditor = dynamic(() => import('@/components/editor/RichTextEditor'), {
  loading: () => <EditorSkeleton />,
  ssr: false
})

// 2. Charts/Visualizations
const PerformanceChart = dynamic(() => import('@/components/analytics/PerformanceChart'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  ssr: false
})

// 3. PDF Viewer (@react-pdf/renderer is heavy)
const PDFViewer = dynamic(() => import('@/components/pdf/PDFViewer'), {
  loading: () => <PDFSkeleton />,
  ssr: false
})

// 4. Video Players (if using hls.js)
const VideoPlayer = dynamic(() => import('@/components/video/VideoPlayer'), {
  loading: () => <VideoSkeleton />,
  ssr: false
})

// 5. Code Highlighters (if used for biology syntax)
const CodeBlock = dynamic(() => import('@/components/markdown/CodeBlock'), {
  ssr: true, // Can SSR but splits the bundle
})
```

#### Medium Priority (Nice to Have)
```typescript
// Admin Dashboard Components
const AdminAnalytics = dynamic(() => import('@/components/admin/Analytics'))
const AdminUserManagement = dynamic(() => import('@/components/admin/UserManagement'))

// Complex Forms
const WhatsAppIntegration = dynamic(() => import('@/components/integrations/WhatsApp'))
const PaymentGateway = dynamic(() => import('@/components/payment/RazorpayCheckout'))
```

---

## 7. Tree Shaking Verification

### Icon Libraries

**Current Config (Good ✅):**
```javascript
// next.config.mjs - already optimized
experimental: {
  optimizePackageImports: [
    'lucide-react',
    '@heroicons/react',
    '@radix-ui/react-icons',
  ],
}
```

**Import Pattern Check:**
```bash
# ✅ GOOD - Named imports detected
import { BookOpen, Clock, GraduationCap } from 'lucide-react'

# ⚠️ VERIFY - One file using double quotes
src/components/ui/Select.tsx:
import { Check, ChevronDown, ChevronUp } from "lucide-react"
```

**Recommendation:** Ensure consistent single quotes for better tree shaking.

---

## 8. Chunk Splitting Strategy

### Current Configuration (Good ✅)

```javascript
// next.config.mjs (lines 32-95)
splitChunks: {
  chunks: 'all',
  maxInitialRequests: 25,
  minSize: 20000,
  cacheGroups: {
    framework: { ... },      // React, Next.js core
    animations: { ... },     // framer-motion
    ui: { ... },            // Radix, Heroicons, Lucide
    ai: { ... },            // Anthropic, OpenAI
    forms: { ... },         // react-hook-form, zod
    lib: { ... },           // Other vendors
    common: { ... },        // Shared code
  }
}
```

**Analysis:** ✅ Configuration is well-structured

**Issue:** The 2.8MB chunk exists DESPITE good config, suggesting:
1. A specific page/route is importing too much
2. A component is pulling in heavy dependencies
3. A barrel export is breaking tree shaking

---

## 9. Prisma Client Optimization

### Current State
- **116MB** in node_modules
- Imported as: `import { PrismaClient } from '@/generated/prisma'`

### Critical Check

**Verify Prisma is NOT in client bundles:**
```bash
# Run after implementing bundle analyzer
ANALYZE=true npm run build

# Look for "@prisma/client" in client chunks
# Should ONLY appear in server-side chunks
```

### Optimization Tips

1. **Ensure singleton pattern:**
```typescript
// ✅ GOOD - lib/prisma.ts (should already exist)
import { PrismaClient } from '@/generated/prisma'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

2. **Never import in client components:**
```typescript
// ❌ BAD
'use client'
import { prisma } from '@/lib/prisma' // This will break the build!

// ✅ GOOD
// app/api/route.ts
import { prisma } from '@/lib/prisma' // Server-side only
```

3. **Generate optimized client:**
```bash
# prisma/schema.prisma
generator client {
  provider        = "prisma-client-js"
  output          = "../src/generated/prisma"
  previewFeatures = ["tracing"]
  binaryTargets   = ["native", "rhel-openssl-1.0.x"] // Vercel target
}
```

---

## 10. Build Optimization Recommendations

### High Impact (Do First)

#### 1. Install Bundle Analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

**Priority:** 🔴 **CRITICAL** - Without this, you're flying blind

**Expected Outcome:** Identify the source of the 2.8MB chunk

**Time Estimate:** 15 minutes

---

#### 2. Eliminate Barrel Exports
```bash
# Find all barrel exports
find src -name "index.ts" -o -name "index.tsx"

# Replace with direct imports
```

**Files to Fix:**
1. `src/components/illustrations/blog/index.ts` (50+ exports)
2. `src/lib/validation/index.ts`
3. `src/lib/images/index.ts`
4. `src/components/courses/index.ts`
5. `src/components/checkout/index.ts`

**Priority:** 🔴 **CRITICAL**

**Expected Outcome:** 100-500KB reduction per affected page

**Time Estimate:** 2-4 hours

---

#### 3. Remove framer-motion from SEO Pages
Target the top 100 SEO landing pages (static content pages):

```bash
# Identify candidates
grep -r "import.*framer-motion" src/app --include="*.tsx" | \
  grep -E "(neet-coaching|biology-tuition|biology-notes)" | \
  wc -l
```

Replace with CSS animations:

**Create utility file:**
```typescript
// src/lib/animations.ts
export const fadeInUpClass = "animate-fadeInUp"
export const fadeInClass = "animate-fadeIn"
export const slideInRightClass = "animate-slideInRight"
```

**Update tailwind.config.ts:**
```typescript
module.exports = {
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.5s ease-in',
        slideInRight: 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideInRight: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
}
```

**Priority:** 🟡 **HIGH**

**Expected Outcome:** 27MB total bundle reduction (90KB × 300 pages)

**Time Estimate:** 1-2 days (can be incremental)

---

#### 4. Dynamic Import Heavy Components

Add dynamic imports for these patterns:

```typescript
// app/admin/*/page.tsx
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'))

// app/student/certificates/*/page.tsx
const CertificateGenerator = dynamic(() => import('@/components/pdf/Certificate'), {
  ssr: false // PDF generation doesn't need SSR
})

// app/tests/*/page.tsx
const TestInterface = dynamic(() => import('@/components/tests/TestInterface'))
```

**Priority:** 🟡 **HIGH**

**Expected Outcome:** 200-500KB reduction on affected routes

**Time Estimate:** 4-6 hours

---

### Medium Impact (Do After High Priority)

#### 5. Optimize Images

**Current config is good**, but verify:
```javascript
// next.config.mjs
images: {
  formats: ['image/webp', 'image/avif'], // ✅ Good
  minimumCacheTTL: 31536000,             // ✅ Good
  deviceSizes: [320, 375, 420, 640, ...], // ✅ Good
}
```

**Add image optimization:**
```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'

export function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      quality={80} // Reduce from default 90
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..." // Add blur placeholder
      {...props}
    />
  )
}
```

**Priority:** 🟢 **MEDIUM**

**Expected Outcome:** Faster LCP, better Core Web Vitals

**Time Estimate:** 2-3 hours

---

#### 6. Route-Based Code Splitting

Verify Next.js is automatically splitting by route:

```bash
# After bundle analyzer is installed
ANALYZE=true npm run build

# Check that each route has its own chunk
# Verify shared code is in 'common' chunk
```

If routes are too large, split further:

```typescript
// app/some-large-page/page.tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'))
const AnotherHeavyComponent = dynamic(() => import('./AnotherHeavyComponent'))

export default function Page() {
  return (
    <>
      <HeavyComponent />
      <AnotherHeavyComponent />
    </>
  )
}
```

**Priority:** 🟢 **MEDIUM**

**Time Estimate:** 1-2 hours

---

### Low Impact (Optional Optimizations)

#### 7. Remove Unused Dependencies

Audit package.json for unused packages:

```bash
npm install -g depcheck
depcheck
```

**Candidates for removal:**
- `compression` (Next.js handles this)
- `express-rate-limit` (use Vercel edge config)
- Unused testing libraries in production

**Priority:** 🟢 **LOW**

**Expected Outcome:** 5-10MB node_modules reduction

**Time Estimate:** 1 hour

---

#### 8. Optimize Clerk Bundle

Clerk is already in optimizePackageImports, but verify:

```typescript
// Ensure you're only importing what you need
import { ClerkProvider } from '@clerk/nextjs'
// ❌ Don't import entire package
import * as Clerk from '@clerk/nextjs'
```

**Priority:** 🟢 **LOW**

**Time Estimate:** 30 minutes

---

## 11. Action Plan (Priority Order)

### Week 1: Critical Issues

1. **Day 1-2:** Install bundle analyzer and identify 2.8MB chunk source
2. **Day 3-4:** Fix barrel exports in top 10 most-used components
3. **Day 5:** Remove framer-motion from top 50 SEO landing pages

**Expected Outcome:** 1-2MB bundle reduction

---

### Week 2: High Impact Optimizations

1. **Day 1-2:** Complete framer-motion removal from remaining SEO pages
2. **Day 3-4:** Add dynamic imports to heavy components
3. **Day 5:** Verify Prisma is not in client bundles

**Expected Outcome:** Additional 500KB-1MB reduction

---

### Week 3: Polish & Verification

1. **Day 1:** Optimize images and add blur placeholders
2. **Day 2:** Review and optimize remaining barrel exports
3. **Day 3-4:** Performance testing and Core Web Vitals check
4. **Day 5:** Documentation and monitoring setup

**Expected Outcome:** Better Core Web Vitals scores

---

## 12. Monitoring & Metrics

### Set Up Bundle Size Tracking

**Create `.github/workflows/bundle-size.yml`:**
```yaml
name: Bundle Size Check

on:
  pull_request:
    branches: [main]

jobs:
  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Check bundle sizes
        run: |
          du -sh .next
          du -sh .next/static/chunks
      - name: Comment on PR
        run: |
          # Post bundle size comparison to PR
```

### Key Metrics to Track

| Metric | Current | Target | Priority |
|--------|---------|--------|----------|
| Largest chunk | 2.8MB | <250KB | 🔴 Critical |
| Total .next size | 3.6GB | <500MB | 🔴 Critical |
| Deployment size | 189MB | <100MB | 🟡 High |
| First Load JS | Unknown | <200KB | 🟡 High |
| Framer-motion usage | 538+ | <50 | 🟡 High |

---

## 13. Expected Outcomes

### Conservative Estimates

| Optimization | Bundle Reduction | Deployment Reduction |
|--------------|-----------------|---------------------|
| Fix barrel exports | 500KB-1MB | 10-20MB |
| Remove framer-motion (300 pages) | 27MB total | 50-100MB |
| Dynamic imports | 500KB-1MB | 10-20MB |
| Image optimization | N/A | 20-30MB |
| Remove unused deps | N/A | 5-10MB |
| **Total** | **28-29MB** | **95-180MB** |

### Final Target State

```
Current State          →  Target State
─────────────────────────────────────
.next:     3.6GB       →  <500MB
Deployment: 189MB      →  <100MB
Largest chunk: 2.8MB   →  <250KB
```

---

## 14. Quick Wins (Can Do Today)

### 1. Add Bundle Analyzer (15 min)
```bash
npm install --save-dev @next/bundle-analyzer
```

### 2. Fix One Barrel Export (30 min)
Replace this in 10 most-used files:
```typescript
// ❌ Before
import { Icon } from '@/components/illustrations/blog'

// ✅ After
import { Icon } from '@/components/illustrations/blog/Icon'
```

### 3. Remove framer-motion from 5 SEO pages (1 hour)
```bash
# Target these first:
src/app/neet-coaching-institute/page.tsx
src/app/neet-coaching-west-delhi/page.tsx
src/app/biology-tutor-class-9-icse/page.tsx
src/app/pre-neet-coaching/page.tsx
src/app/neet-classes/page.tsx
```

---

## 15. References & Tools

### Useful Commands

```bash
# Analyze bundle
ANALYZE=true npm run build

# Check .next size
du -sh .next

# Check deployment size
du -sh .vercel/output

# Find framer-motion usage
grep -r "from 'framer-motion'" src --include="*.tsx" | wc -l

# Find barrel exports
find src -name "index.ts" -o -name "index.tsx"

# Check largest chunks
ls -lhS .next/static/chunks/*.js | head -20
```

### Next.js Docs
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Dynamic Imports](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading)
- [Package Imports Optimization](https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports)

---

## Conclusion

Your bundle size issues are **fixable** and **high-impact**. The 2.8MB chunk is the smoking gun.

**Start with:**
1. Bundle analyzer (today)
2. Fix barrel exports (this week)
3. Remove framer-motion from SEO pages (next week)

These three actions alone should reduce your deployment from **189MB → <100MB**.

**Next Steps:**
1. Run `ANALYZE=true npm run build` after installing bundle analyzer
2. Share the analyzer report for deeper investigation
3. Pick 5 SEO pages and remove framer-motion as a proof of concept

---

**Last Updated:** December 25, 2025
**Audited By:** Claude Code
**Next Review:** After Week 1 optimizations
