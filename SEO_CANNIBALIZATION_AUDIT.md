# SEO CANNIBALIZATION & NAVIGATION AUDIT
## Cerebrum Biology Academy Website

Date: March 4, 2026

---

## EXECUTIVE SUMMARY

**Critical Findings**: 3 major SEO cannibalization issues affecting 70+ pages
- Multiple pages competing for identical search queries
- Users confused by overlapping content
- Authority fragmentation across duplicate pages

**Impact**: High CTR loss, lower rankings, user frustration

---

## 1. DUPLICATE ABOUT PAGES (CRITICAL)

| Page | URL | Purpose |
|------|-----|---------|
| Primary | `/about` | Company information (in main navigation) |
| Duplicate | `/about-cerebrum-biology-academy` | Same content, orphaned |

**SEO Issue**: Authority split, two pages competing for "about cerebrum" queries

**Files**:
- Primary: `src/app/about/page.tsx` (47,773 bytes - comprehensive)
- Duplicate: `src/app/about-cerebrum-biology-academy/page.tsx` (32,128 bytes)

**User Impact**:
- Navigation shows `/about`
- Old links/backlinks may point to `/about-cerebrum-biology-academy`
- Users see conflicting information

**Fix**: Add redirect in `src/config/seo-redirects.mjs`:
```javascript
{ source: '/about-cerebrum-biology-academy', destination: '/about', permanent: true }
```

---

## 2. BIOLOGY TUITION vs BIOLOGY TUTOR (CRITICAL)

**Issue**: Both terms target identical audiences with overlapping pages

### Page Count:
- **Tuition**: 1 root + 11 area pages + 3 class pages = **15 pages**
- **Tutor**: 1 root + 40+ area pages + 6 class pages = **50+ pages**

### Direct Overlaps (Same City):
```
/biology-tuition-noida         vs  /biology-tutor-noida
/biology-tuition-ghaziabad     vs  /biology-tutor-ghaziabad
/biology-tuition-faridabad     vs  /biology-tutor-faridabad
/biology-tuition-south-delhi   vs  /biology-tutor-south-delhi
/biology-tuition-gurugram      vs  /biology-tutor-gurugram
```

**Files**:
- Tuition: `src/app/biology-tuition*/page.tsx` (15 pages)
- Tutor: `src/app/biology-tutor*/page.tsx` (50+ pages)

**SEO Problem**:
- Both target queries like "best biology tuition in noida" and "biology tutor in noida"
- Google must choose which to rank
- Metadata overlap unclear (both say "best biology tuition/tutor")

**User Confusion**:
- User searches "biology tuition noida"
- Site shows either `/biology-tuition-noida` OR `/biology-tutor-noida`
- Inconsistent experience
- Unclear what's the difference

**Root Cause**: Not differentiated in content
- If tuition = multiple tutors/group classes, tutor = 1:1
- If same service = should consolidate

**Fix Options**:
1. **Option A**: Keep only `/biology-tutor-*` pages (single most common term)
   - Redirect all `/biology-tuition-*` → `/biology-tutor-*`

2. **Option B**: Keep tuition for GROUP classes, tutor for 1:1
   - Update metadata to distinguish
   - Update content to clarify difference
   - Redirect redundant pages

---

## 3. BEST/TOP/WHICH/AFFORDABLE NEET COACHING (CRITICAL)

**Issue**: 4-5 pages per city all targeting "best neet coaching in [city]" keywords

### By City:

**Faridabad** (5 pages):
- `/best-neet-coaching-faridabad`
- `/top-10-neet-coaching-faridabad`
- `/top-5-neet-coaching-faridabad`
- `/which-neet-coaching-is-best-in-faridabad`
- `/affordable-neet-coaching-faridabad`

**Ghaziabad** (4 pages):
- `/best-neet-coaching-ghaziabad`
- `/top-10-neet-coaching-ghaziabad`
- `/which-neet-coaching-is-best-in-ghaziabad`
- `/affordable-neet-coaching-ghaziabad`

**Gurugram** (5 pages):
- `/best-neet-coaching-gurugram`
- `/top-5-neet-coaching-gurugram`
- `/top-10-neet-coaching-gurugram`
- `/which-neet-coaching-is-best-in-gurugram`
- `/affordable-neet-coaching-gurugram`

**Greater Noida** (4 pages):
- `/best-neet-coaching-greater-noida`
- `/top-10-neet-coaching-greater-noida`
- `/which-neet-coaching-is-best-in-greater-noida`
- `/affordable-neet-coaching-greater-noida`

**Noida** (4 pages):
- `/best-neet-coaching-noida`
- `/top-10-neet-coaching-noida`
- `/which-neet-coaching-is-best-in-noida`
- `/affordable-neet-coaching-noida`

**Total**: ~22 pages competing for the same keywords

**Files**: `src/app/{best,top-*,which,affordable}-neet-coaching-*/page.tsx`

**User Experience Example**:
```
Search: "best neet coaching in gurugram"
Results shown (random):
  - best-neet-coaching-gurugram
  - top-10-neet-coaching-gurugram  ← Same content, different URL
  - which-neet-coaching-is-best-in-gurugram ← Still same topic
```

**SEO Problem**:
- Only ONE page will rank for main query
- Other pages "steal" long-tail traffic
- Authority fragmented across 5 URLs
- If Googlebot crawls page 1 first, pages 2-5 barely get indexed

**Severity**: HIGHEST - directly blocks main keyword rankings

**Fix**: Keep 1 canonical per city, redirect others
```javascript
// Consolidation strategy per city:
{ source: '/top-10-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
{ source: '/top-5-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
{ source: '/which-neet-coaching-is-best-in-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
{ source: '/affordable-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
```

---

## 4. LOCATION PAGE STRATEGY CONFUSION

**Pattern**:
- `/locations/[city]` - Hub pages (in main nav)
- `/best-neet-coaching-[city]` - Article pages
- `/neet-coaching-[city]` - Directory pages (implied)
- `/affordable-neet-coaching-[city]` - Category pages

**Example: Gurugram**
```
/locations/gurugram              ← Hub page (navigation)
/best-neet-coaching-gurugram     ← Article/comparison
/neet-coaching-gurugram          ← Directory (if exists)
/affordable-neet-coaching-gurugram ← Category page
```

**Question**: Should location hub be canonical or article?

**Recommendation**:
- Location hub (`/locations/[city]`) = main resource
- Best/affordable/top = supporting content linked FROM location hub
- Not competing with it

---

## 5. BIOLOGY CLASS-SPECIFIC OVERLAPS

**Class 11** (3 pages):
- `/biology-tuition-class-11` (tuition)
- `/biology-tutor-class-11-cbse` (tutor + board)
- `/biology-tutor-class-11-icse` (tutor + board)

**Class 12** (3 pages):
- `/biology-tuition-class-12` (tuition)
- `/biology-tutor-class-12-cbse` (tutor + board)
- `/biology-tutor-class-12-icse` (tutor + board)

**Issue**: Unclear if class-specific is better target or generic is

**Files**: `src/app/biology-tuition-class-*/page.tsx` and `src/app/biology-tutor-class-*-*/page.tsx`

**Recommendation**: Decide on primary strategy (tuition OR tutor), then consolidate

---

## 6. BLOG NAVIGATION REDUNDANCY

**Location**: `src/data/navigationConfig.ts` (lines 241-263)

**Problem**: Three different nav items point to same URL with different labels:
```javascript
{
  id: 'all-posts',
  title: 'All Articles',
  href: '/blog',  // ← Same URL
}
{
  id: 'neet-preparation',
  title: 'NEET Preparation Tips',
  href: '/blog',  // ← Same URL
}
{
  id: 'biology-concepts',
  title: 'Biology Concepts',
  href: '/blog',  // ← Same URL
}
```

**User Confusion**:
- Which menu item should I click?
- Are they different pages?
- What's the difference?

**Fix**: Either:
1. Use different URLs with filters: `/blog?category=preparation`
2. Link to specific blog posts or categories
3. Keep only ONE blog entry in navigation

---

## 7. ORPHAN PAGES

**Identified**:
- `/about-cerebrum-biology-academy` - Not linked from nav, should redirect to `/about`
- Possibly others outside `/demo/`

**Recommendation**: Audit all pages in `src/app/` not linked from:
- `navigationConfig.ts`
- `footerNavigationConfig`
- `seo-redirects.mjs`
- Sitemap or internal links

---

## 8. POTENTIAL REDIRECT CONFLICTS

**Pattern**: Some old pages like `/faculty` and `/testimonials` were removed in the GSC fix, but check if:
- `src/config/seo-redirects.mjs` still has entries for them
- They conflict with new real pages

**Files to check**:
- `src/config/seo-redirects.mjs` (entire file)
- Run `scripts/audit-redirects.mjs` to verify no chains/conflicts

---

## CONSOLIDATED SUMMARY TABLE

| Issue | Severity | Pages | Impact |
|-------|----------|-------|--------|
| About duplicate | 🔴 CRITICAL | 2 | Authority split on company info |
| Biology tuition vs tutor | 🔴 CRITICAL | 50+ | Keyword cannibalization for "biology tuition" queries |
| Best/top/which/affordable coaching | 🔴 CRITICAL | 22 | Blocks main keyword rankings (worst impact) |
| Location page overlap | 🟠 HIGH | 7+ | Unclear information architecture |
| Class-specific overlaps | 🟠 HIGH | 6+ | Keyword fragmentation |
| Blog nav redundancy | 🟡 MEDIUM | 1 | UX confusion only |
| Orphan pages | 🟡 MEDIUM | 2-5 | Wasted crawl budget |
| Possible redirect conflicts | 🟡 MEDIUM | Unknown | Risk of broken links |

---

## RECOMMENDED FIXES (Priority Order)

### 1. IMMEDIATE (This Week)
```javascript
// Add to src/config/seo-redirects.mjs
{ source: '/about-cerebrum-biology-academy', destination: '/about', permanent: true }
```

### 2. HIGH PRIORITY (Week 1-2)
Consolidate Best/Top/Which/Affordable coaching pages:
- Keep `/best-neet-coaching-[city]` as canonical
- Redirect all other patterns to it
- ~20 redirects total

### 3. HIGH PRIORITY (Week 1-2)
Resolve biology-tuition vs biology-tutor:
- Decide which term to standardize
- Redirect ~30 pages

### 4. MEDIUM PRIORITY (Week 2-3)
- Fix blog navigation (use unique URLs or labels)
- Remove orphan pages or create redirects
- Verify all location page links correct

### 5. POST-FIX
- Monitor search console for "removed from index" pages
- Check rankings for affected keywords
- Update internal linking to point to new canonicals
- Request re-indexing in GSC

---

## NEXT ACTIONS

1. **Stakeholder alignment**: Confirm which term (tuition vs tutor) and which page type (best vs top vs which) should be canonical
2. **Create redirect batch**: ~50 redirects needed
3. **Test redirect chains**: Run `scripts/audit-redirects.mjs` after each batch
4. **Monitor GSC**: Track "Crawl" → "Live" stats after deployment
5. **Plan re-indexing request**: GSC requires 2-4 weeks after fixes

---

## FILES TO MODIFY

1. `src/config/seo-redirects.mjs` - Add consolidation redirects
2. `src/data/navigationConfig.ts` - Fix blog navigation redundancy
3. Optionally:
   - `src/app/best-neet-coaching*/page.tsx` - Update metadata if keeping multiple
   - `src/app/biology-tu[ition|tor]*/page.tsx` - Clarify differences if keeping both

---

## SUPPORTING DATA

- Total pages analyzed: 1,673 route files
- Pages with metadata: 500+
- Overlapping keyword pages: 70+
- Direct duplicates: 2-3
- Potential cannibalizing pages: 25+
