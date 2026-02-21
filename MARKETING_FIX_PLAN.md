# Cerebrum Biology Academy - Marketing Fix Implementation Plan

> Generated: 10 February 2026
> Based on: Marketing Readiness Audit (Score: 5.2/10)
> Goal: Fix all critical marketing issues to achieve 8+/10 readiness

---

## Overview

This plan is broken into **8 phases**, each sized to fit within a single context window.
Each phase produces 1-3 PRs with atomic, focused commits.

**Status Legend:** `[ ]` Pending | `[x]` Complete | `[~]` In Progress

---

## Phase 1: Critical Quick Fixes (5-10 min each)
> Priority: CRITICAL | Impact: Very High | Effort: Minimal
> Files touched: 3-4 files, non-overlapping

- [x] **PR #58**: Fix dead "Book Demo" href="#" on pricing page
  - File: `src/app/neet-coaching-fees/page.tsx` (line ~588)
  - Change: `href="#"` → `href="/book-free-demo"`
  - Also fix any other dead CTAs on the same page

- [x] **PR #58** (same PR): Fix wrong email domain on contact page
  - File: `src/app/contact/page.tsx` (line ~172)
  - Change: `cerebrum.academy` → `cerebrumbiologyacademy.com`

- [x] **PR #58** (same PR): Fix missing brochure PDF links
  - File: `src/app/contact/page.tsx` (line ~187)
  - File: `src/components/admissions/AdmissionsHeroStatic.tsx` (line ~66)
  - Change: dead brochure links → WhatsApp message "Send me the brochure"

- [x] **PR #58** (same PR): Fix pre-filled WhatsApp template blanks
  - Search for unfilled `{courseName}`, `{className}` in WhatsApp messages
  - Replace with context-aware defaults or generic complete messages

---

## Phase 2: Desktop Fallback Form for Demo Booking
> Priority: CRITICAL | Impact: Very High (recovers ~300 leads/month) | Effort: 4-6 hrs
> Files touched: 2-3 files

- [x] **PR #60**: Add desktop fallback form on /book-free-demo
  - Device detection: mobile → WhatsApp redirect, desktop → inline form
  - Form: Name, Phone, Class, Center, Preferred Day → submits via WhatsApp
  - Sidebar with benefits + direct WhatsApp/call buttons

- [x] **PR #60** (same PR): Consolidate duplicate demo pages
  - /demo-booking now redirects to /book-free-demo (canonical)

---

## Phase 3: Lead Magnet PDF Creation (Top 3)
> Priority: HIGH | Impact: High | Effort: 8-12 hrs
> These are actual content PDFs for download gating

- [ ] **PR #60**: NEET Biology Chapter-wise Weightage 2026 PDF
  - Create branded PDF with chapter-wise marks distribution
  - Upload to public/lead-magnets/ directory
  - Update src/data/leadMagnets.ts with correct file path

- [ ] **PR #61**: Biology Mnemonics Collection PDF
  - Create branded PDF with top 50 biology mnemonics for NEET
  - Upload and link in lead magnets data

- [ ] **PR #62**: NEET Previous Year Questions (Biology) PDF
  - Create branded PDF with categorized PYQs (last 5 years)
  - Upload and link in lead magnets data

---

## Phase 4: Social Proof & Trust Signals
> Priority: HIGH | Impact: High | Effort: 3-5 hrs
> Files touched: 3-4 components

- [ ] **PR #63**: Replace fake Google reviews with real testimonials
  - File: `src/components/social-proof/GoogleReviewsWidget.tsx`
  - Replace hardcoded sample reviews with curated real testimonials
  - Add proper attribution (student name, batch, NEET score)

- [ ] **PR #63** (same PR): Surface results on conversion pages
  - Add results/success stats banner to:
    - `src/app/neet-coaching-fees/page.tsx` (pricing page)
    - `src/app/page.tsx` (homepage, if not already there)
  - Import from existing /results data

- [ ] **PR #63** (same PR): Add "Meet Your Teacher" section
  - Create or enhance faculty showcase component
  - Add to course pages and pricing page
  - Include Dr. Shekhar's AIIMS credentials prominently

---

## Phase 5: Blog CTA Enhancement & Email Capture
> Priority: HIGH | Impact: High | Effort: 4-6 hrs
> Files touched: 3-4 blog/content components

- [ ] **PR #64**: Add email-first capture to blog
  - File: `src/components/blog/BlogPostPage.tsx`
  - Add email capture form (newsletter signup) alongside phone capture
  - "Get Weekly NEET Biology Tips" opt-in
  - Store emails via existing API or new endpoint

- [ ] **PR #64** (same PR): Enhance RelatedResources with course-specific links
  - File: `src/components/blog/RelatedResources.tsx`
  - Map blog post categories to specific course pages
  - Add topic-aware CTA (e.g., "Physiology post → Class 12 course")

---

## Phase 6: Missing High-Value Comparison Pages
> Priority: MEDIUM-HIGH | Impact: High (SEO) | Effort: 6-8 hrs
> New pages capturing competitor comparison traffic

- [ ] **PR #65**: Cerebrum vs Allen NEET Coaching comparison page
  - File: `src/app/cerebrum-vs-allen/page.tsx`
  - SEO-optimized comparison with structured data
  - Fair comparison highlighting Cerebrum's unique strengths

- [ ] **PR #66**: Cerebrum vs Aakash Institute comparison page
  - File: `src/app/cerebrum-vs-aakash/page.tsx`
  - Similar structure to Allen comparison

- [ ] **PR #67**: Batch Types Explained page
  - File: `src/app/batch-types/page.tsx`
  - Regular vs Weekend vs Crash Course vs Online
  - Help parents choose the right batch

---

## Phase 7: Enrollment Frontend & Payment Flow
> Priority: MEDIUM | Impact: High | Effort: 8-12 hrs
> Activate the already-built Razorpay backend

- [ ] **PR #68**: Create enrollment page with Razorpay integration
  - File: `src/app/enroll/page.tsx`
  - Connect to existing `/api/enrollment/create-order` and `/api/enrollment/verify`
  - Course selection → Student details → Payment → Confirmation
  - Update "Enroll Now" CTAs across site to point here

---

## Phase 8: Final Optimizations & QA
> Priority: MEDIUM | Impact: Medium | Effort: 4-6 hrs

- [ ] **PR #69**: NEET Coaching Fees Comparison Delhi page
  - Position Cerebrum's pricing against competitors
  - Target "neet coaching fees delhi" keyword

- [ ] **PR #70**: Student success case study pages (3-5 stories)
  - Individual pages with detailed student journeys
  - Strong social proof + long-tail SEO

- [ ] Final TypeScript check: `npx tsc --noEmit`
- [ ] Production build verification: `npm run build`

---

## Execution Notes

### Git Workflow (per PR):
```bash
git checkout main && git pull origin main
git checkout -b fix/descriptive-branch-name
# ... make changes ...
git add <specific-files>
git commit -m "fix: description"
git push origin fix/descriptive-branch-name
gh pr create --title "..." --body "..."
gh pr merge <number> --merge
git checkout main && git pull origin main
```

### Cross-Context-Window Continuity:
1. This file (`MARKETING_FIX_PLAN.md`) persists in the repo
2. After each phase, update checkboxes `[ ]` → `[x]`
3. Each new context window should: `cat MARKETING_FIX_PLAN.md` first
4. Continue from the first unchecked `[ ]` item

### Contact Info (use consistently):
- Phone: +91 88264 44334
- Email: info@cerebrumbiologyacademy.com
- WhatsApp: wa.me/918826444334
- Address: Block D, South Extension Part 2, New Delhi 110049

### Auth: Use the GitHub token provided in the conversation context
