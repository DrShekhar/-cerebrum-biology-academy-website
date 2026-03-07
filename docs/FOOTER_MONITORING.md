# Footer Reorganization — Monitoring & Rollback Plan

**Date**: March 7, 2026
**Change**: Footer reorganized from 12+ sections/80+ links to 6 sections/~35 links with mobile accordion, sticky CTA, and 3 hub pages absorbing removed links.

---

## 1. GA4 Events (Automatic)

Three custom events are now tracked automatically via `src/lib/analytics/footerTracking.ts`:

| Event Name | Parameters | Fires When |
|---|---|---|
| `footer_link_click` | `link_text`, `link_url`, `section_name` | Any footer link clicked |
| `footer_section_toggle` | `section_name`, `action` (open/close) | Mobile accordion toggled |
| `footer_subscribe` | `method` (email/whatsapp/both) | Newsletter subscribe succeeds |

**GA4 Setup**: Go to GA4 > Admin > Custom Definitions > Create Custom Dimensions for `section_name`, `link_text`, `link_url`, `method`, `action`.

**Report**: GA4 > Explore > Free Form > Rows: `section_name` + `link_text`, Values: Event Count. Filter: `footer_link_click`.

---

## 2. Google Search Console — Weekly Tracking

Record these metrics every Monday morning for 8 weeks.

### Hub Pages (NEW — should trend UP)

| Week | /all-locations Imp | Clicks | /board-exam-preparation Imp | Clicks | /results Imp | Clicks |
|---|---|---|---|---|---|---|
| Week 0 (baseline) | | | | | | |
| Week 1 | | | | | | |
| Week 2 | | | | | | |
| Week 3 | | | | | | |
| Week 4 | | | | | | |
| Week 5 | | | | | | |
| Week 6 | | | | | | |
| Week 7 | | | | | | |
| Week 8 | | | | | | |

### Pages Removed from Footer (watch for drops >20%)

| Week | /neet-biology-mcq Imp | /biology-notes-for-neet Imp | /online-neet-test-series Imp | /free-neet-biology-lectures Imp | /neet-biology-study-material Imp | /neet-previous-year-questions Imp |
|---|---|---|---|---|---|---|
| Week 0 (baseline) | | | | | | |
| Week 1 | | | | | | |
| Week 2 | | | | | | |
| Week 3 | | | | | | |
| Week 4 | | | | | | |

### City Pages (should remain stable)

| Week | /locations/south-extension | /locations/rohini | /locations/gurugram | /locations/faridabad | Overall Site Imp | Indexed Pages |
|---|---|---|---|---|---|---|
| Week 0 | | | | | | |
| Week 1 | | | | | | |
| Week 2 | | | | | | |
| Week 3 | | | | | | |
| Week 4 | | | | | | |

### Board Pages (should remain stable)

| Week | /courses/cbse-biology-class-11-12 | /courses/icse-isc-biology | /courses/ib-igcse-biology | /board-exam-preparation |
|---|---|---|---|---|
| Week 0 | | | | |
| Week 1 | | | | |
| Week 2 | | | | |
| Week 3 | | | | |
| Week 4 | | | | |

### Crawl Health

| Week | Crawl Errors | New 404s | Indexed Pages | Sitemap Status |
|---|---|---|---|---|
| Week 0 | | | | |
| Week 1 | | | | |
| Week 2 | | | | |
| Week 3 | | | | |
| Week 4 | | | | |

---

## 3. Target Keywords to Monitor

Check rankings weekly in GSC Performance > Search Results > Queries:

| Page | Target Keywords |
|---|---|
| `/all-locations` | "biology classes near me", "neet coaching delhi", "neet coaching [city]" |
| `/board-exam-preparation` | "board exam biology coaching", "cbse biology coaching", "board exam preparation" |
| `/results` | "neet biology results", "cerebrum results", "cerebrum biology academy results" |
| `/locations/south-extension` | "neet coaching south extension", "biology classes south delhi" |
| `/locations/rohini` | "neet coaching rohini", "biology coaching north delhi" |
| `/locations/gurugram` | "neet coaching gurugram", "biology coaching gurgaon" |
| `/locations/faridabad` | "neet coaching faridabad" |
| `/courses/cbse-biology-class-11-12` | "cbse biology coaching", "class 12 biology tuition" |

---

## 4. Rollback Plan

### Git Reference
- **Pre-change tag**: `git checkout pre-footer-reorg` (commit `b39eca5d`)
- **Footer reorg commit**: `91adac32`
- **Mobile optimization**: `e1eb5925`
- **Tracking added**: current HEAD

### Rollback Triggers
If ANY of these occur after 4 weeks:
- **>20% drop** in impressions for any monitored page
- **>30% drop** in overall site impressions
- **Significant crawl errors** (>10 new 404s related to footer links)

### Rollback Steps
1. `git revert e1eb5925` — revert mobile optimization
2. `git revert 91adac32..HEAD` — revert all footer/hub changes
3. OR: `git checkout pre-footer-reorg -- src/components/layout/Footer.tsx` to restore just the footer

### Partial Rollback
If only specific pages drop:
- Add the dropped page's link back to the footer in its original section
- Keep the hub pages and rest of reorganization intact

---

## 5. Microsoft Clarity Heatmap

### Setup
1. Go to https://clarity.microsoft.com and create a project
2. Copy the Project ID
3. Add to `.env.local`: `NEXT_PUBLIC_CLARITY_ID=your-project-id`
4. Deploy — Clarity loads automatically via `src/components/analytics/MicrosoftClarity.tsx`

### What to Monitor
- **Scroll depth**: How far users scroll in the footer
- **Click heatmap**: Which footer links get the most clicks
- **Dead clicks**: Taps that don't register (touch target issues)
- **Rage clicks**: Repeated taps on same element (frustration signal)
- **Accordion usage**: How often mobile users expand sections

### Comparison Timeline
- **Week 0-1**: Baseline data collection with new footer
- **Week 2+**: Analyze click distribution patterns
- **Week 4**: Compare with GA4 footer_link_click data

---

## 6. Weekly Checklist

Every Monday:
- [ ] Record GSC impressions/clicks in tables above
- [ ] Check GSC for new crawl errors
- [ ] Review GA4 footer_link_click event counts
- [ ] Review GA4 footer_section_toggle patterns
- [ ] Check Clarity recordings for footer UX issues
- [ ] Verify hub pages are indexed (URL Inspection)
- [ ] Compare indexed page count vs previous week
