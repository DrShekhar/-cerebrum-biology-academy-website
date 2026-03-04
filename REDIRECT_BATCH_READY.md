# READY-TO-USE REDIRECT BATCH
## Copy-paste these redirects into src/config/seo-redirects.mjs

This file contains all 20+ redirects needed to fix SEO cannibalization issues. Ready to copy-paste directly into the redirect config.

---

## ISSUE #1: ABOUT PAGE (1 redirect)

```javascript
// About page consolidation
{
  source: '/about-cerebrum-biology-academy',
  destination: '/about',
  permanent: true,
},
```

---

## ISSUE #3: BEST/TOP/WHICH/AFFORDABLE COACHING (20 redirects)

### Faridabad (4 redirects)
```javascript
// Faridabad coaching consolidation
{ source: '/top-5-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
{ source: '/top-10-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
{ source: '/which-neet-coaching-is-best-in-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
{ source: '/affordable-neet-coaching-faridabad', destination: '/best-neet-coaching-faridabad', permanent: true },
```

### Ghaziabad (3 redirects)
```javascript
// Ghaziabad coaching consolidation
{ source: '/top-10-neet-coaching-ghaziabad', destination: '/best-neet-coaching-ghaziabad', permanent: true },
{ source: '/which-neet-coaching-is-best-in-ghaziabad', destination: '/best-neet-coaching-ghaziabad', permanent: true },
{ source: '/affordable-neet-coaching-ghaziabad', destination: '/best-neet-coaching-ghaziabad', permanent: true },
```

### Gurugram (4 redirects)
```javascript
// Gurugram coaching consolidation
{ source: '/top-5-neet-coaching-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },
{ source: '/top-10-neet-coaching-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },
{ source: '/which-neet-coaching-is-best-in-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },
{ source: '/affordable-neet-coaching-gurugram', destination: '/best-neet-coaching-gurugram', permanent: true },
```

### Greater Noida (3 redirects)
```javascript
// Greater Noida coaching consolidation
{ source: '/top-10-neet-coaching-greater-noida', destination: '/best-neet-coaching-greater-noida', permanent: true },
{ source: '/which-neet-coaching-is-best-in-greater-noida', destination: '/best-neet-coaching-greater-noida', permanent: true },
{ source: '/affordable-neet-coaching-greater-noida', destination: '/best-neet-coaching-greater-noida', permanent: true },
```

### Noida (3 redirects)
```javascript
// Noida coaching consolidation
{ source: '/top-10-neet-coaching-noida', destination: '/best-neet-coaching-noida', permanent: true },
{ source: '/which-neet-coaching-is-best-in-noida', destination: '/best-neet-coaching-noida', permanent: true },
{ source: '/affordable-neet-coaching-noida', destination: '/best-neet-coaching-noida', permanent: true },
```

---

## ISSUE #2: BIOLOGY TUITION vs TUTOR (OPTIONAL - Requires Decision)

**Decision Required First**: Keep which term?

### If keeping TUTOR as primary (redirect 15 tuition pages):

```javascript
// Biology tuition → tutor consolidation
{ source: '/biology-tuition', destination: '/biology-tutor', permanent: true },
{ source: '/biology-tuition-noida', destination: '/biology-tutor-noida', permanent: true },
{ source: '/biology-tuition-ghaziabad', destination: '/biology-tutor-ghaziabad', permanent: true },
{ source: '/biology-tuition-faridabad', destination: '/biology-tutor-faridabad', permanent: true },
{ source: '/biology-tuition-south-delhi', destination: '/biology-tutor-south-delhi', permanent: true },
{ source: '/biology-tuition-near-me', destination: '/biology-tutors-near-me', permanent: true },
{ source: '/biology-tuition-class-11', destination: '/biology-tutor-class-11-cbse', permanent: true },
{ source: '/biology-tuition-class-12', destination: '/biology-tutor-class-12-cbse', permanent: true },
{ source: '/biology-tuition-class-9-10', destination: '/biology-tutor-class-9-cbse', permanent: true },
{ source: '/biology-tuition-class-11-noida', destination: '/biology-tutor-class-11-cbse', permanent: true },
{ source: '/biology-tuition-class-12-noida', destination: '/biology-tutor-class-12-cbse', permanent: true },
// ... (remaining tuition pages if they exist)
```

### If keeping TUITION as primary (redirect 50+ tutor pages):
This would require redirecting many tutor pages. Not recommended as tutor pages are more extensive.

---

## HOW TO IMPLEMENT

### Step 1: Create new array in seo-redirects.mjs

Add this at the top of the file (after existing array definitions):

```javascript
/**
 * Cannibalization consolidation redirects
 * Merges competing pages targeting same keywords
 * Last updated: March 4, 2026
 */
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
  // BEST/TOP/WHICH/AFFORDABLE coaching consolidation
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

### Step 2: Register in next.config.mjs

Find the redirects section and add:

```javascript
const redirects = async () => {
  // ... existing redirects ...

  const allRedirects = [
    // ... existing arrays ...
    ...cannibalizationConsolidationRedirects,  // ← Add this line
  ];

  return allRedirects.map((r) => ({
    source: r.source,
    destination: r.destination,
    permanent: r.permanent,
  }));
};
```

### Step 3: Test

```bash
npm run audit:redirects
```

Expected output:
```
✓ 0 redirect chains detected
✓ 0 conflicts detected
✓ 0 duplicate entries
✓ 21 total redirects registered
```

### Step 4: Commit

```bash
git add src/config/seo-redirects.mjs
git commit -m "fix: consolidate seo cannibalization redirects

- Merge about pages (1 redirect)
- Merge best/top/which/affordable coaching (20 redirects)
- Targets 22 pages competing for same keywords
- Fixes authority fragmentation on main NEET coaching searches

Issue #4 from SEO audit"
```

---

## VERIFICATION CHECKLIST

After deployment:

- [ ] Redirects appear in next.config.mjs under redirects()
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Audit script passes: `npm run audit:redirects`
- [ ] Test in browser:
  - [ ] `/about-cerebrum-biology-academy` → redirects to `/about`
  - [ ] `/top-5-neet-coaching-gurugram` → redirects to `/best-neet-coaching-gurugram`
  - [ ] `/which-neet-coaching-is-best-in-noida` → redirects to `/best-neet-coaching-noida`

---

## MONITORING AFTER DEPLOYMENT

### Week 1-2:
- Google starts crawling redirects
- Check GSC for "Redirect errors" (should be none)
- Monitor crawl stats

### Week 2-4:
- Old URLs should disappear from index
- Canonical URLs should consolidate authority
- Monitor rankings for "best neet coaching [city]" queries

### Month 2:
- Rankings should improve for main keywords
- Traffic to canonical pages should increase
- Verify no unusual spikes in 404 errors

---

## TROUBLESHOOTING

**Problem**: "Build fails with redirect errors"
**Solution**:
- Check destinations exist (all `/best-neet-coaching-*` pages should exist)
- Run `npm run type-check` to see exact error
- Verify URL spelling exactly

**Problem**: "Redirects not working in development"
**Solution**:
- Redirects only work in production
- Test in production or staging build
- Run `npm run build` then `npm run start`

**Problem**: "Redirect creates a loop"
**Solution**:
- Verify destination page exists
- Check for chains (A→B→C)
- Run `npm run audit:redirects` to detect

---

## TOTAL IMPACT

- **Redirects**: 21 (1 about + 20 coaching)
- **Pages affected**: ~25 old URLs
- **Authority consolidated to**: ~6 canonical pages
- **Expected ranking improvement**: 2-4 weeks (after GSC re-indexes)
