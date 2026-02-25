# Audit Fix Plan — Cerebrum Biology Academy
## Created: Feb 25, 2026

### Batch 1: CRITICAL (Fix Before Launch)
- [x] 1. Fix 4 broken links in MobileFullscreenMenu.tsx
  - `/courses/neet` → `/courses/neet-complete`
  - `/courses/dropper` → `/courses/neet-dropper`
  - `/account` → `/dashboard`
  - `/search` → remove (no search page exists)
- [x] 2. Create /locations/ghaziabad page (layout.tsx + page.tsx)
  - Model after faridabad layout/page pattern
  - Include LocalBusiness schema, FAQ schema, event schema, breadcrumbs
  - Areas: Indirapuram, Vaishali, Raj Nagar, Vasundhara, Loni, Sahibabad, Mohan Nagar
- [x] 3. Fix All-Locations page URLs — Delhi NCR section
  - Map `/neet-coaching-*` slugs to actual `/locations/*` routes where they exist
- [x] 4. Fix opening hours in contactInfo.ts
  - Change from 00:00-23:59 to 08:00-20:00 weekdays, 10:00-18:00 Sunday
- [x] 5. Add demo form conversion tracking (client-side after success)

### Batch 2: HIGH PRIORITY
- [x] 6. Add internal links from best-neet-coaching page city cards to location pages
- [ ] 7. Configure real Facebook Pixel, GTM, Razorpay, WhatsApp credentials → SKIP (need user credentials)
- [x] 8. Activate AEO components on key pages (faq, courses, locations)
- [x] 9. Add cross-location linking between Delhi NCR cities
- [x] 10. Vary review counts per location

### Batch 3: MEDIUM PRIORITY
- [x] 11. Add H2 question headings for featured snippets/PAA on key pages
- [x] 12. Add source citations (NCERT, NTA references)
- [x] 13. Add Google Maps embeds to main location pages
- [x] 14. Add "last updated" dates using ContentFreshness component
- [ ] 15. Set up Google call forwarding numbers → SKIP (Google Ads config, not code)
