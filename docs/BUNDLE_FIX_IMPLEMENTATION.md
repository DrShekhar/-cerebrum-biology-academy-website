# Bundle Size Fix - Implementation Guide

This guide provides **copy-paste ready** code for fixing the bundle size issues identified in the audit.

---

## 1. Install Bundle Analyzer (5 minutes)

### Step 1: Install Package

```bash
npm install --save-dev @next/bundle-analyzer
```

### Step 2: Update next.config.mjs

**File: `/Users/drshekhar/cerebrum-biology-academy-website/next.config.mjs`**

Add this at the top (after existing imports):

```javascript
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
```

Then change the export at the bottom from:

```javascript
export default withSentryConfig(withMDX(nextConfig), { ... })
```

To:

```javascript
export default withBundleAnalyzer(
  withSentryConfig(withMDX(nextConfig), {
    // ... existing Sentry config
  })
)
```

### Step 3: Run Analysis

```bash
ANALYZE=true npm run build
```

This will open an interactive HTML report in your browser showing exactly what's in each chunk.

---

## 2. Fix Barrel Exports (Critical)

### Problem Files Identified

1. `src/components/illustrations/blog/index.ts` - 50+ exports
2. `src/lib/validation/index.ts`
3. `src/lib/images/index.ts`
4. `src/components/courses/index.ts`

### Solution: Create a Migration Script

**File: `/Users/drshekhar/cerebrum-biology-academy-website/scripts/fix-barrel-imports.js`**

```javascript
#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * This script fixes barrel import issues by replacing imports like:
 *   import { Component } from '@/components/illustrations/blog'
 * With direct imports:
 *   import { Component } from '@/components/illustrations/blog/Component'
 */

const BARREL_PATHS = {
  '@/components/illustrations/blog': 'src/components/illustrations/blog',
  '@/lib/validation': 'src/lib/validation',
  '@/lib/images': 'src/lib/images',
  '@/components/courses': 'src/components/courses',
  '@/components/checkout': 'src/components/checkout',
}

function findExportsInBarrel(barrelPath) {
  const indexPath = path.join(process.cwd(), barrelPath, 'index.ts')
  if (!fs.existsSync(indexPath)) return []

  const content = fs.readFileSync(indexPath, 'utf-8')
  const exports = []

  // Match: export { ComponentName } from './ComponentName'
  const namedExportRegex = /export\s+{\s*(\w+)\s*}\s+from\s+['"]\.\/(\w+)['"]/g
  let match
  while ((match = namedExportRegex.exec(content)) !== null) {
    exports.push({
      name: match[1],
      file: match[2],
    })
  }

  return exports
}

function fixImportsInFile(filePath, barrelAlias, barrelPath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  const exports = findExportsInBarrel(barrelPath)
  let changed = false

  exports.forEach(({ name, file }) => {
    // Match: import { Name } from '@/components/illustrations/blog'
    const importRegex = new RegExp(
      `import\\s+{([^}]*\\b${name}\\b[^}]*)}\\s+from\\s+['"]${barrelAlias.replace(/\//g, '\\/')}['"]`,
      'g'
    )

    if (importRegex.test(content)) {
      // Replace with direct import
      content = content.replace(importRegex, (match, imports) => {
        const importList = imports
          .split(',')
          .map((i) => i.trim())
          .filter((i) => i)

        // If importing multiple items, only fix the matched one
        if (importList.length === 1 && importList[0] === name) {
          // Simple case: only one import
          changed = true
          return `import { ${name} } from '${barrelAlias}/${file}'`
        } else if (importList.includes(name)) {
          // Complex case: multiple imports - split them
          const others = importList.filter((i) => i !== name)
          changed = true
          return `import { ${name} } from '${barrelAlias}/${file}'
import { ${others.join(', ')} } from '${barrelAlias}'`
        }
        return match
      })
    }
  })

  if (changed) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ Fixed imports in: ${filePath}`)
    return true
  }
  return false
}

function findTsxFiles(dir) {
  const files = []
  const items = fs.readdirSync(dir)

  items.forEach((item) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findTsxFiles(fullPath))
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath)
    }
  })

  return files
}

// Main execution
console.log('🔍 Finding files with barrel imports...\n')

let totalFixed = 0

Object.entries(BARREL_PATHS).forEach(([alias, barrelPath]) => {
  console.log(`\n📦 Processing barrel: ${alias}`)

  const srcDir = path.join(process.cwd(), 'src')
  const files = findTsxFiles(srcDir)

  files.forEach((file) => {
    if (fixImportsInFile(file, alias, barrelPath)) {
      totalFixed++
    }
  })
})

console.log(`\n✨ Fixed ${totalFixed} files`)

// Run prettier
console.log('\n🎨 Running prettier...')
try {
  execSync('npm run format', { stdio: 'inherit' })
} catch (error) {
  console.error('⚠️  Prettier failed, run manually: npm run format')
}

console.log('\n✅ Done! Run `npm run type-check` to verify.')
```

**Make it executable:**

```bash
chmod +x scripts/fix-barrel-imports.js
```

**Run it:**

```bash
node scripts/fix-barrel-imports.js
```

### Manual Fix Example

If you prefer manual fixes, here's the pattern:

**Before:**

```typescript
// src/app/some-page/page.tsx
import { KotaVsOnlineIllustration } from '@/components/illustrations/blog'
```

**After:**

```typescript
// src/app/some-page/page.tsx
import { KotaVsOnlineIllustration } from '@/components/illustrations/blog/KotaVsOnlineIllustration'
```

---

## 3. Remove framer-motion from SEO Pages

### Step 1: Create CSS Animation Utilities

**File: `/Users/drshekhar/cerebrum-biology-academy-website/src/lib/animations.ts`**

```typescript
/**
 * CSS-based animations to replace framer-motion
 * Saves 90KB per page that uses these instead of framer-motion
 */

export const animations = {
  // Fade in from bottom (most common use case)
  fadeInUp: 'animate-fadeInUp',

  // Simple fade in
  fadeIn: 'animate-fadeIn',

  // Slide in from right
  slideInRight: 'animate-slideInRight',

  // Slide in from left
  slideInLeft: 'animate-slideInLeft',

  // Scale up (for buttons, cards)
  scaleIn: 'animate-scaleIn',

  // Stagger children (for lists)
  staggerChildren: 'animate-stagger-children',
} as const

// Utility function for intersection observer animations
export function useScrollAnimation(ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref])
}
```

**File: `/Users/drshekhar/cerebrum-biology-academy-website/tailwind.config.ts`**

Add to theme.extend:

```typescript
module.exports = {
  theme: {
    extend: {
      animation: {
        // Fade animations
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        fadeInDown: 'fadeInDown 0.6s ease-out forwards',

        // Slide animations
        slideInRight: 'slideInRight 0.5s ease-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',

        // Scale animations
        scaleIn: 'scaleIn 0.3s ease-out forwards',

        // Stagger children
        'stagger-children': 'stagger 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        stagger: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

### Step 2: Migration Script for framer-motion Removal

**File: `/Users/drshekhar/cerebrum-biology-academy-website/scripts/remove-framer-motion.js`**

```javascript
#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * This script replaces simple framer-motion animations with CSS
 * Run on SEO/marketing pages only (not interactive dashboards)
 */

const SEO_PAGE_PATTERNS = [
  'src/app/neet-coaching-*',
  'src/app/biology-tuition-*',
  'src/app/biology-notes/*',
  'src/app/class-*',
  'src/app/pre-neet-*',
]

function replaceFramerMotion(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  let changed = false

  // Check if file uses framer-motion
  if (!content.includes("from 'framer-motion'")) {
    return false
  }

  // Remove framer-motion import
  content = content.replace(/import\s+{\s*motion\s*}\s+from\s+['"]framer-motion['"]\s*\n?/g, '')
  changed = true

  // Replace simple motion.div with className animations
  // Pattern: <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
  content = content.replace(
    /<motion\.div\s+initial={{[^}]*opacity:\s*0[^}]*y:\s*20[^}]*}}\s+animate={{[^}]*opacity:\s*1[^}]*y:\s*0[^}]*}}[^>]*>/g,
    '<div className="animate-fadeInUp">'
  )
  content = content.replace(/<\/motion\.div>/g, '</div>')

  // Replace motion.section similarly
  content = content.replace(
    /<motion\.section\s+initial={{[^}]*opacity:\s*0[^}]*y:\s*20[^}]*}}\s+animate={{[^}]*opacity:\s*1[^}]*y:\s*0[^}]*}}[^>]*>/g,
    '<section className="animate-fadeInUp">'
  )
  content = content.replace(/<\/motion\.section>/g, '</section>')

  // Replace simple fade-in
  content = content.replace(
    /<motion\.(div|section)\s+initial={{[^}]*opacity:\s*0[^}]*}}\s+animate={{[^}]*opacity:\s*1[^}]*}}[^>]*>/g,
    '<$1 className="animate-fadeIn">'
  )

  if (changed) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ Removed framer-motion from: ${filePath}`)
    return true
  }

  return false
}

// Find SEO pages
const glob = require('glob')
const files = glob.sync('src/app/**/page.tsx')

let count = 0
files.forEach((file) => {
  // Only process SEO pages
  if (
    file.includes('neet-coaching') ||
    file.includes('biology-tuition') ||
    file.includes('biology-notes') ||
    file.includes('class-') ||
    file.includes('pre-neet')
  ) {
    if (replaceFramerMotion(file)) {
      count++
    }
  }
})

console.log(`\n✨ Removed framer-motion from ${count} SEO pages`)
console.log('\n⚠️  Manual review required for complex animations')
console.log('Run: npm run type-check && npm run lint')
```

**Run it:**

```bash
npm install -g glob
node scripts/remove-framer-motion.js
```

### Step 3: Manual Migration Example

**Before (with framer-motion):**

```typescript
'use client'

import { motion } from 'framer-motion'

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <h1>NEET Coaching</h1>
    </motion.div>
  )
}
```

**After (with CSS animations):**

```typescript
export default function Page() {
  return (
    <div className="container mx-auto animate-fadeInUp">
      <h1>NEET Coaching</h1>
    </div>
  )
}
```

**For interactive elements that need framer-motion:**

```typescript
import dynamic from 'next/dynamic'

// Lazy load motion only where needed
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
)

export default function InteractivePage() {
  return (
    <div>
      <div className="animate-fadeInUp">Static content</div>

      {/* Only load framer-motion for this interactive element */}
      <MotionDiv
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Interactive button
      </MotionDiv>
    </div>
  )
}
```

---

## 4. Add Dynamic Imports to Heavy Components

### Identify Heavy Components

Run this after bundle analyzer is installed:

```bash
# Find largest page chunks
ls -lhS .next/static/chunks/app/**/*.js | head -20
```

### Common Heavy Components to Lazy Load

**File: `/Users/drshekhar/cerebrum-biology-academy-website/src/app/admin/dashboard/page.tsx`**

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy admin components
const AnalyticsDashboard = dynamic(
  () => import('@/components/admin/AnalyticsDashboard'),
  {
    loading: () => (
      <div className="h-96 animate-pulse bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg" />
    ),
    ssr: false, // Admin dashboard doesn't need SSR
  }
)

const UserManagementTable = dynamic(
  () => import('@/components/admin/UserManagementTable'),
  {
    loading: () => <div className="h-64 animate-pulse bg-gray-100 rounded-lg" />,
    ssr: false,
  }
)

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AnalyticsDashboard />
      <UserManagementTable />
    </div>
  )
}
```

**File: `/Users/drshekhar/cerebrum-biology-academy-website/src/app/student/certificates/page.tsx`**

```typescript
import dynamic from 'next/dynamic'

// PDF generation is heavy - lazy load it
const CertificateGenerator = dynamic(
  () => import('@/components/pdf/CertificateGenerator'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading certificate generator...</p>
        </div>
      </div>
    ),
    ssr: false, // PDF generation must be client-side
  }
)

export default function CertificatesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Certificates</h1>
      <CertificateGenerator />
    </div>
  )
}
```

**File: `/Users/drshekhar/cerebrum-biology-academy-website/src/app/tests/[testId]/page.tsx`**

```typescript
import dynamic from 'next/dynamic'

// Test interface is complex - lazy load
const TestInterface = dynamic(
  () => import('@/components/tests/TestInterface'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading test...</h2>
          <p className="text-gray-500 mt-2">Preparing your test interface</p>
        </div>
      </div>
    ),
  }
)

export default function TestPage({ params }: { params: { testId: string } }) {
  return <TestInterface testId={params.testId} />
}
```

---

## 5. Verification Checklist

After implementing fixes, verify with these commands:

```bash
# 1. Type check
npm run type-check

# 2. Lint
npm run lint

# 3. Build
npm run build

# 4. Analyze bundle
ANALYZE=true npm run build

# 5. Check sizes
du -sh .next
du -sh .vercel/output

# 6. Test in browser
npm run dev
# Visit affected pages and verify animations still work
```

---

## 6. Expected Results

After completing these fixes:

| Metric              | Before | After  | Improvement   |
| ------------------- | ------ | ------ | ------------- |
| Largest chunk       | 2.8MB  | <500KB | 82% reduction |
| Total bundle        | 3.6GB  | <500MB | 86% reduction |
| framer-motion pages | 538    | <50    | 91% reduction |
| Deployment size     | 189MB  | <100MB | 47% reduction |

---

## 7. Rollback Plan

If anything breaks:

```bash
# Rollback git changes
git checkout HEAD -- src/

# Or revert specific file
git checkout HEAD -- src/app/some-page/page.tsx

# Reinstall dependencies if needed
npm ci
```

---

## Next Steps

1. **Start with bundle analyzer** - identify the 2.8MB chunk
2. **Fix 5 SEO pages** - prove framer-motion removal works
3. **Run barrel import script** - automated fix for most issues
4. **Add dynamic imports** - target heavy components
5. **Monitor** - track bundle size in CI/CD

---

**Questions?** Check the main audit document: `docs/BUNDLE_AUDIT_2025.md`
