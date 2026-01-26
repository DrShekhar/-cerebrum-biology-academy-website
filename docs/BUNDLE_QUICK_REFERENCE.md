# Bundle Optimization - Quick Reference

## TL;DR - Critical Issues

```
🚨 CRITICAL: 2.8MB single chunk (29717.js)
🚨 CRITICAL: No bundle analyzer installed
⚠️  HIGH: Barrel exports breaking tree-shaking
⚠️  HIGH: 538+ framer-motion imports (unnecessary)
⚠️  MEDIUM: 116MB Prisma in node_modules
```

---

## Quick Commands

```bash
# 1. Install bundle analyzer (DO THIS FIRST)
npm install --save-dev @next/bundle-analyzer

# 2. Analyze current bundle
ANALYZE=true npm run build

# 3. Check sizes
du -sh .next
du -sh .vercel/output

# 4. Find framer-motion usage
grep -r "from 'framer-motion'" src --include="*.tsx" | wc -l

# 5. Find barrel exports
find src -name "index.ts" -o -name "index.tsx"

# 6. Check largest chunks
ls -lhS .next/static/chunks/*.js | head -10
```

---

## Top 5 Fixes (Priority Order)

### 1. Install Bundle Analyzer (15 min) 🔴

```bash
npm install --save-dev @next/bundle-analyzer
```

Add to `next.config.mjs`:

```javascript
import bundleAnalyzer from '@next/bundle-analyzer'
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
export default withBundleAnalyzer(withSentryConfig(withMDX(nextConfig), {...}))
```

**Impact:** Visibility into 2.8MB chunk

---

### 2. Fix Barrel Exports (2-4 hours) 🔴

**Problem:**

```typescript
// ❌ BAD - imports entire barrel
import { Icon } from '@/components/illustrations/blog'
```

**Solution:**

```typescript
// ✅ GOOD - direct import
import { Icon } from '@/components/illustrations/blog/Icon'
```

**Files to fix:**

- `src/components/illustrations/blog/index.ts`
- `src/lib/validation/index.ts`
- `src/lib/images/index.ts`
- `src/components/courses/index.ts`

**Impact:** 500KB-1MB per affected page

---

### 3. Remove framer-motion from SEO Pages (1-2 days) 🟡

**Before:**

```typescript
import { motion } from 'framer-motion' // 90KB

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>
```

**After:**

```typescript
<div className="animate-fadeInUp">
  Content
</div>
```

**Impact:** 90KB × 300 pages = 27MB total reduction

---

### 4. Add Dynamic Imports (4-6 hours) 🟡

```typescript
// Heavy components - lazy load them
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'))
const PDFViewer = dynamic(() => import('@/components/pdf/Viewer'), { ssr: false })
const TestInterface = dynamic(() => import('@/components/tests/Interface'))
```

**Impact:** 200-500KB per affected route

---

### 5. Optimize Images (2-3 hours) 🟢

```typescript
import Image from 'next/image'

<Image
  src={src}
  alt={alt}
  loading="lazy"
  quality={80}  // Reduce from 90
  placeholder="blur"
  blurDataURL="..."
/>
```

**Impact:** Better Core Web Vitals

---

## File Locations

```
Configuration:
  next.config.mjs          - Webpack config, optimizePackageImports
  tailwind.config.ts       - CSS animations

Problem Files:
  src/components/illustrations/blog/index.ts  - 50+ barrel exports
  src/lib/validation/index.ts                 - Barrel exports
  src/lib/images/index.ts                     - Barrel exports

Heavy Dependencies:
  node_modules/@prisma      - 116MB (server-side only)
  node_modules/@clerk       - 13MB
  node_modules/framer-motion - 3MB

Documentation:
  docs/BUNDLE_AUDIT_2025.md           - Full audit
  docs/BUNDLE_FIX_IMPLEMENTATION.md   - Implementation guide
```

---

## Metrics to Track

| Metric        | Current | Target | Command                                       |
| ------------- | ------- | ------ | --------------------------------------------- |
| Largest chunk | 2.8MB   | <250KB | `ls -lhS .next/static/chunks/*.js \| head -1` |
| .next size    | 3.6GB   | <500MB | `du -sh .next`                                |
| Deployment    | 189MB   | <100MB | `du -sh .vercel/output`                       |
| framer-motion | 538+    | <50    | `grep -r "from 'framer-motion'" src \| wc -l` |

---

## Red Flags to Watch For

```typescript
// ❌ Importing entire packages
import * as Icons from 'lucide-react'
import * as Clerk from '@clerk/nextjs'

// ❌ Barrel imports
import { Component } from '@/components/illustrations/blog'

// ❌ Prisma in client components
;('use client')
import { prisma } from '@/lib/prisma' // WILL BREAK

// ❌ framer-motion on static SEO pages
// app/neet-coaching-*/page.tsx
import { motion } from 'framer-motion'

// ❌ Heavy components without dynamic import
import PDFViewer from '@/components/pdf/Viewer' // Should be lazy
```

---

## Good Patterns

```typescript
// ✅ Named imports (tree-shakeable)
import { BookOpen, Clock } from 'lucide-react'

// ✅ Direct imports (no barrel)
import { Icon } from '@/components/illustrations/blog/Icon'

// ✅ Dynamic imports for heavy components
const Heavy = dynamic(() => import('@/components/Heavy'))

// ✅ CSS animations instead of framer-motion
<div className="animate-fadeInUp">Content</div>

// ✅ Prisma only in server components/API routes
// app/api/route.ts (no 'use client')
import { prisma } from '@/lib/prisma'
```

---

## Emergency Rollback

```bash
# If build breaks after changes
git status
git diff

# Rollback specific file
git checkout HEAD -- src/app/broken-page/page.tsx

# Rollback all changes
git reset --hard HEAD

# Reinstall if dependencies broken
rm -rf node_modules .next
npm ci
```

---

## Testing After Changes

```bash
# 1. Type check
npm run type-check

# 2. Build
npm run build

# 3. Bundle analysis
ANALYZE=true npm run build

# 4. Test locally
npm run dev

# 5. E2E tests
npm run test:e2e

# 6. Deploy to preview
git push  # Vercel auto-deploys
```

---

## Expected Outcomes

```
Week 1: Install analyzer + fix barrel exports
  → .next: 3.6GB → 2.5GB
  → Deployment: 189MB → 150MB

Week 2: Remove framer-motion + dynamic imports
  → .next: 2.5GB → 800MB
  → Deployment: 150MB → 100MB

Week 3: Image optimization + final polish
  → .next: 800MB → <500MB
  → Deployment: 100MB → <80MB
```

---

## Support

- **Full Audit:** `docs/BUNDLE_AUDIT_2025.md`
- **Implementation Guide:** `docs/BUNDLE_FIX_IMPLEMENTATION.md`
- **Next.js Docs:** https://nextjs.org/docs/app/building-your-application/optimizing

---

**Last Updated:** December 25, 2025
