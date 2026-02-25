# Delhi NCR SEO Fix Plan
## Created: Feb 25, 2026
## Status: Batch 1+2 DONE, Batch 3 remaining

### Investigation Result
All 126 planned SEO pages exist and are building correctly (2,978 pages in build).
No blocking issues (robots.txt, middleware, noindex all clean).
The audit agents missed programmatic pages generated via [localSlug] dynamic routes.
Work needed is structural/schema fixes only.

### Commits
- `b0e02dd3` — Batch 1+2: Schema fixes + cross-linking + center consistency
- (pending) — Revert all hours to 24/7 (user serves global online students)

---

## Batch 1: CRITICAL — Schema & Structured Data Fixes

- [x] 1. ~~Fix South Extension opening hours~~ → Reverted to 24/7 (global online students)
- [x] 2. ~~Fix Rohini opening hours~~ → Reverted to 24/7 (global online students)
- [x] 3. Fix priceRange on all 6 locations (₹₹/$$ → ₹45,000 - ₹1,80,000)
- [x] 4. Add LocalBusiness + FAQ schema to Gurugram layout.tsx
- [x] 5. Fix Delhi layout — add Sunday hours + fix vague address

## Batch 2: HIGH — Internal Linking & Consistency

- [x] 6. Add Noida + Ghaziabad to cross-links on South Extension, Rohini, Faridabad pages
- [x] 7. Add Noida + Ghaziabad to VisitOurCenters in InternalCrossLinks.tsx
- [x] 8. Fix center count + show all 6 actual centers on locations index page
- [ ] 9. Add H2 question headings to all 7 location pages
- [ ] 10. Add location-specific stats (replace generic "67+ AIIMS" with per-center numbers)

## Batch 3: MEDIUM — Content & Quality

- [x] 11. Add Gurugram school mentions (done via FAQ schema — DPS, Pathways, Shri Ram, GD Goenka)
- [x] 12. Add FAQ schema to Gurugram layout.tsx (5 FAQs with school mentions)
- [ ] 13. Add Event schema to Delhi and Noida layouts
- [x] 14. Fix Delhi layout vague address (done — "D 35, South Extension Part 2")
- [ ] 15. Add Ghaziabad street address reference
