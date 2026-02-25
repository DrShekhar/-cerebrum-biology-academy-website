# Delhi NCR SEO Fix Plan
## Created: Feb 25, 2026
## Status: IN PROGRESS

### Investigation Result
All 126 planned SEO pages exist and are building correctly (2,978 pages in build).
No blocking issues (robots.txt, middleware, noindex all clean).
The audit agents missed programmatic pages generated via [localSlug] dynamic routes.
Work needed is structural/schema fixes only.

---

## Batch 1: CRITICAL — Schema & Structured Data Fixes

- [ ] 1. Fix South Extension opening hours (00:00-23:59 → 08:00-20:00 / 10:00-18:00)
- [ ] 2. Fix Rohini opening hours (00:00-23:59 → 08:00-20:00 / 10:00-18:00)
- [ ] 3. Fix priceRange on all 5 locations (₹₹/$$  → ₹45,000 - ₹1,80,000)
- [ ] 4. Add LocalBusiness schema to Gurugram layout.tsx (currently missing, only Service type)
- [ ] 5. Fix Delhi layout — add Sunday hours (currently Mon-Sat only)

## Batch 2: HIGH — Internal Linking & Consistency

- [ ] 6. Add Noida + Ghaziabad to cross-links on South Extension, Rohini, Faridabad pages
- [ ] 7. Add Noida + Ghaziabad to VisitOurCenters in InternalCrossLinks.tsx
- [ ] 8. Fix center count text: "4 centers" → "6 centers" on locations page + affected pages
- [ ] 9. Add H2 question headings to all 7 location pages
- [ ] 10. Add location-specific stats (replace generic "67+ AIIMS" with per-center numbers)

## Batch 3: MEDIUM — Content & Quality

- [ ] 11. Add Gurugram school mentions (DPS, Pathways, Shri Ram, GD Goenka)
- [ ] 12. Add FAQ schema to Gurugram layout.tsx
- [ ] 13. Add Event schema to Delhi and Noida layouts
- [ ] 14. Fix Delhi layout vague address ("Near South Extension" → actual address)
- [ ] 15. Add Ghaziabad street address reference
