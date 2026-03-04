# SEO CANNIBALIZATION FIX PLAN
## Quick Reference for Implementation

---

## THE 3 CRITICAL ISSUES AT A GLANCE

### Issue #1: About Page Duplicate
```
Current State:
  /about                           ← Primary (in navigation)
  /about-cerebrum-biology-academy  ← Duplicate (orphaned)

Fix:
  Add 1 redirect to seo-redirects.mjs

Impact: LOW (small page rank)
Effort: 5 minutes
```

---

### Issue #2: Biology Tuition vs Tutor (50+ pages)
```
Current State:
  /biology-tuition/                    /biology-tutor/
  /biology-tuition-[area]              /biology-tutor-[area]
  /biology-tuition-class-[X]           /biology-tutor-class-[X]-[board]

Same areas overlap:
  /biology-tuition-noida       ↔  /biology-tutor-noida
  /biology-tuition-ghaziabad   ↔  /biology-tutor-ghaziabad
  /biology-tuition-faridabad   ↔  /biology-tutor-faridabad

Fix Options:
  A) Keep only /biology-tutor-* pages (redirect 15 tuition pages)
  B) Keep only /biology-tuition-* pages (redirect 50 tutor pages)
  C) Differentiate: tuition=groups, tutor=1:1 (update metadata/content + strategic redirects)

Impact: HIGH (50+ pages, major keywords)
Effort: 1-2 hours (B is easiest, A requires more redirects)
```

---

### Issue #3: Best/Top/Which/Affordable Coaching (22 pages - WORST)
```
Current State per city:
  /best-neet-coaching-[city]           ← Keep this
  /top-5-neet-coaching-[city]          ← Redirect to best
  /top-10-neet-coaching-[city]         ← Redirect to best
  /which-neet-coaching-is-best-in-[city] ← Redirect to best
  /affordable-neet-coaching-[city]     ← Redirect to best

Cities affected: faridabad, ghaziabad, gurugram, greater-noida, noida
(Some cities have 4-5 variants, others have fewer)

Fix:
  Create ~20 redirects consolidating to /best-neet-coaching-[city]

Example redirects needed:
  /top-5-neet-coaching-faridabad → /best-neet-coaching-faridabad
  /top-10-neet-coaching-faridabad → /best-neet-coaching-faridabad
  /which-neet-coaching-is-best-in-faridabad → /best-neet-coaching-faridabad
  /affordable-neet-coaching-faridabad → /best-neet-coaching-faridabad
  (repeat for each city)

Impact: CRITICAL (blocks main keyword rankings)
Effort: 2-3 hours
Priority: DO FIRST
```

---

## STEP-BY-STEP IMPLEMENTATION

### Step 1: Decision Phase (1 day)
```
Questions to answer:
1. Keep /biology-tuition or /biology-tutor as primary?
   → Affects 50+ pages
   → Easy win if you pick one and redirect the other

2. Should /affordable-neet-coaching pages remain at all?
   → Could be category filters on /best-neet-coaching-[city]
   → Or kept but clearly linked FROM /best-* pages (not competing)

3. Are /top-5 and /top-10 meant to be different content?
   → Or just different URL patterns for same page?
   → If different: update metadata to clarify difference
   → If same: consolidate to /best-neet-coaching-[city]
```

### Step 2: Create Redirect Batch (2-3 hours)

**Location**: `src/config/seo-redirects.mjs`

**Structure**: Add new array before other arrays
```javascript
// Cannibalization consolidation redirects
export const cannibalizationConsolidationRedirects = [
  // ============================================
  // About page consolidation
  // ============================================
  {
    source: '/about-cerebrum-biology-academy',
    destination: '/about',
    permanent: true,
  },

  // ============================================
  // Biology tuition → tutor consolidation
  // ============================================
  // (20+ redirects if keeping tutor as primary)

  // ============================================
  // Best/Top/Which/Affordable coaching consolidation
  // ============================================
  // Faridabad
  { source: '/top-5-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
  { source: '/top-10-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
  { source: '/which-neet-coaching-is-best-in-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
  { source: '/affordable-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },

  // Ghaziabad
  { source: '/top-10-neet-coaching-ghaziabad', destination: '/best-neet-coaching-ghaziabad', permanent: true },
  { source: '/which-neet-coaching-is-best-in-ghaziabad', destination: '/best-neet-coaching-ghaziabad', permanent: true },
  { source: '/affordable-neet-coaching-ghaziabad', destination: '/best-neet-coaching-ghaziabad', permanent: true },

  // Gurugram
  { source: '/top-5-neet-coaching-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },
  { source: '/top-10-neet-coaching-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },
  { source: '/which-neet-coaching-is-best-in-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },
  { source: '/affordable-neet-coaching-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },

  // Greater Noida
  { source: '/top-10-neet-coaching-greater-noida', destination: '/best-neet-coaching-greater-noida', permanent: true },
  { source: '/which-neet-coaching-is-best-in-greater-noida', destination: '/best-neet-coaching-greater-noida', permanent: true },
  { source: '/affordable-neet-coaching-greater-noida', destination: '/best-neet-coaching-greater-noida', permanent: true },

  // Noida
  { source: '/top-10-neet-coaching-noida', destination: '/best-neet-coaching-noida', permanent: true },
  { source: '/which-neet-coaching-is-best-in-noida', destination: '/best-neet-coaching-noida', permanent: true },
  { source: '/affordable-neet-coaching-noida', destination: '/best-neet-coaching-noida', permanent: true },
];
```

### Step 3: Register Redirects in next.config.mjs
```javascript
// In next.config.mjs, add to redirects array:
const allRedirects = [
  // existing redirects...
  ...cannibalizationConsolidationRedirects,  // ← Add this
];
```

### Step 4: Test & Verify (1 hour)
```bash
# Run audit script to check for chains, conflicts, duplicates
npm run audit:redirects

# OR manually
node scripts/audit-redirects.mjs

# Expected output: 0 chains, 0 conflicts
```

### Step 5: Deploy & Monitor (2-4 weeks)
```
1. Commit and deploy to staging first
2. Test all redirect paths in staging
3. Deploy to production
4. Monitor GSC for:
   - "Removed from index" on old URLs
   - "Live and indexed" on canonical URLs
   - 2-4 weeks before full re-indexing
5. Monitor search rankings for affected keywords
```

---

## CITIES AFFECTED BY ISSUE #3

Each city with multiple variants:
- **Faridabad**: 5 pages → 4 redirects
- **Ghaziabad**: 4 pages → 3 redirects
- **Gurugram**: 5 pages → 4 redirects
- **Greater Noida**: 4 pages → 3 redirects
- **Noida**: 4 pages → 3 redirects
- **Delhi**: 1 page (only /best-neet-coaching-delhi)
- **India**: 1 page (only /best-neet-coaching-india)
- **Root**: 1 page (only /best-neet-coaching)

**Total redirects needed**: ~20 for issue #3 alone

---

## ESTIMATED EFFORT

| Task | Effort | Owner |
|------|--------|-------|
| Decision on tuition vs tutor | 1 day | Tech Lead |
| Create redirect batch | 2-3 hours | Developer |
| Test with audit script | 1 hour | QA |
| Deploy to staging | 1 hour | DevOps |
| Monitor & verify | 2-4 weeks | SEO Lead |
| GSC re-indexing request | 15 min | SEO Lead |

**Total active time**: ~1-2 days (most time is waiting for GSC to re-index)

---

## ADDITIONAL SECONDARY FIXES

### Secondary Issue #4: Blog Navigation (LOW EFFORT)
**File**: `src/data/navigationConfig.ts` (lines 241-263)

**Current**:
```javascript
{
  id: 'all-posts',
  title: 'All Articles',
  href: '/blog',
},
{
  id: 'neet-preparation',
  title: 'NEET Preparation Tips',
  href: '/blog',  // ← Same URL!
},
{
  id: 'biology-concepts',
  title: 'Biology Concepts',
  href: '/blog',  // ← Same URL!
}
```

**Fix**: Either remove duplicate items, or use URLs with filters:
```javascript
// Option A: Remove dupes (keep only "All Articles")
// Option B: Use filters
{
  id: 'neet-preparation',
  title: 'NEET Preparation Tips',
  href: '/blog?category=preparation',
},
{
  id: 'biology-concepts',
  title: 'Biology Concepts',
  href: '/blog?category=concepts',
}
```

**Effort**: 30 minutes

---

## MONITORING AFTER FIX

### Watch these metrics:
1. **GSC Indexing Status**
   - Old URLs should go to "Excluded"
   - Canonical should stay "Live"
   - Timeline: 2-4 weeks

2. **Search Rankings**
   - "best neet coaching [city]" queries
   - Should see improvement as authority consolidates
   - Timeline: 1-3 months

3. **Google Crawl Stats**
   - 404 rate should decrease
   - Redirect chain warnings should appear initially, then clear
   - Timeline: 1-2 weeks

4. **User Metrics**
   - Bounce rate on best-neet-coaching pages
   - Click-through rate should improve
   - Timeline: Ongoing

---

## ROLLBACK PLAN (if needed)

If issue detected after deployment:
1. Remove all cannibalization redirects from next.config.mjs
2. Re-deploy
3. Wait 24 hours for Googlebot to re-crawl
4. Investigate root cause (usually:  redirect chain, 404, or redirect to non-existent page)

---

## CHECKLIST FOR COMPLETION

- [ ] Decision made: Keep which version (tuition/tutor)?
- [ ] Redirect batch created in seo-redirects.mjs
- [ ] Registered in next.config.mjs
- [ ] Test script passed (0 chains, 0 conflicts)
- [ ] Deployed to production
- [ ] Monitor GSC for 2-4 weeks
- [ ] Confirm rankings improved for main keywords
- [ ] Secondary fixes applied (blog nav)
- [ ] Document final state for future reference
