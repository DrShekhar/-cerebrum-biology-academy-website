# Learnings & Insights

Things we've learned while building Cerebrum Biology Academy. Updated after each significant discovery.

---

## Build & Performance

### ✅ What Worked

- **Webpack filesystem caching** - 50-70% faster incremental builds
- **Reducing image variants** - 144→20 variants saved 20-40% build time
- **WebP only (no AVIF)** - AVIF generation too slow for minimal benefit
- **6GB memory sufficient** - Reduced from 8GB with optimizations

### ❌ What Didn't Work

- **optimizeCss: true** - Caused CSS MIME type errors on desktop
- **Full .next cleanup on prebuild** - Destroyed webpack cache, slow builds
- **AVIF image format** - 2x processing time for 5-10% size improvement

---

## Authentication

### ✅ What Worked

- **Firebase Phone Auth** - Reliable OTP for Indian numbers
- **JWT session cookies** - Own session management, not dependent on Firebase
- **Rate limiting on auth endpoints** - Prevents brute force attacks
- **Placeholder email for phone users** - `+91xxx@phone.cerebrum.local`

### ❌ What Didn't Work

- **Relying solely on Firebase session** - Needed own JWT for flexibility

---

## SEO & Content

### ✅ What Worked

- **100+ redirect rules** - Prevented 404s, preserved SEO juice
- **City-specific landing pages** - Good for local SEO
- **Blog with MDX** - Rich content with components

### ⚠️ Needs Improvement

- **Blog pagination** - Page 2+ showing same content (bug)
- **Outdated content** - Some blogs reference "2025" in titles
- **Missing dropper content** - High-demand topic not covered

---

## Database

### ✅ What Worked

- **Prisma with Supabase** - Good DX, type-safe queries
- **Connection pooling** - Via Supabase pooler URL
- **Indexing on frequent queries** - Improved performance

### ⚠️ Watch Out For

- **Prisma generate in CI** - Needs DATABASE_URL available
- **Migration timing** - Apply during low-traffic windows

---

## Deployment

### ✅ What Worked

- **Vercel deployment** - Automatic, reliable
- **Environment variable organization** - Clear naming convention
- **Standalone output** - Smaller deployment bundles

### ❌ What Didn't Work

- **Source maps in production** - 5GB builds! Disabled now.

---

## Code Quality

### ✅ What Worked

- **Generated Prisma types** - Fixed 500+ TS errors
- **globals.d.ts for Window extensions** - Proper typing for gtag, etc.
- **Consistent API response format** - `{ success, data?, error? }`

### ⚠️ Technical Debt

- **~100 remaining TS errors** - Component prop types mostly
- **Large SEO data files** - Could be split for tree-shaking
- **Client components in SEO pages** - Could be server components

---

## Template for New Learnings

```markdown
### [Category]

**Date**: YYYY-MM-DD
**Context**: [What were we trying to do?]
**Learning**: [What did we discover?]
**Action**: [What should we do differently?]
```
