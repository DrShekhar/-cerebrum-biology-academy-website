# Cerebrum Biology Academy - Improvement Roadmap

> Generated from comprehensive code review, UI/UX analysis, user flow assessment, and technical debt audit.
> Review Date: December 4, 2025

---

## Executive Summary

| Category       | Current Score | Target Score | Priority Items               |
| -------------- | ------------- | ------------ | ---------------------------- |
| Code Quality   | 6.5/10        | 8.5/10       | 614 TS errors, security gaps |
| UI/UX          | 6.5/10        | 8.5/10       | CTA overload, accessibility  |
| User Flows     | 5.5/10        | 8.0/10       | Demo booking friction        |
| Technical Debt | High          | Low          | 281-408 hours to resolve     |

---

## Phase 1: Security & Stability (Critical - Week 1-2)

### P0 - Security Vulnerabilities

- [ ] **Re-enable counselor API authentication**
  - File: `src/middleware.ts` (line 143)
  - Issue: Auth check commented out with `// TODO: Re-enable after testing`
  - Risk: Unauthorized access to counselor endpoints
  - Effort: 2 hours

- [ ] **Remove development bypass in production**
  - File: `src/middleware.ts` (line 59)
  - Issue: `if (process.env.NODE_ENV === 'development') return NextResponse.next()`
  - Risk: Security bypass in dev mode
  - Effort: 1 hour

- [ ] **Add rate limiting to public API routes**
  - Files: `src/app/api/*/route.ts`
  - Issue: No rate limiting on demo booking, contact forms
  - Risk: DoS, spam attacks
  - Effort: 4 hours

- [ ] **Implement CSRF protection**
  - Files: All form submission handlers
  - Issue: Missing CSRF tokens
  - Effort: 4 hours

### P0 - Database Performance

- [ ] **Add missing database indexes**
  - File: `prisma/schema.prisma`
  - Indexes needed:
    - `Student.email` (unique constraint exists, add index)
    - `DemoBooking.status` + `scheduledAt` (composite)
    - `Course.isActive` + `createdAt`
    - `Testimonial.isApproved` + `rating`
    - `BlogPost.publishedAt` + `isPublished`
    - `Announcement.isActive` + `priority`
  - Effort: 3 hours

- [ ] **Resolve N+1 query patterns (211+ instances)**
  - Priority files:
    - `src/lib/actions/student.ts` - Add `include` clauses
    - `src/lib/actions/course.ts` - Batch fetch relations
    - `src/app/api/dashboard/route.ts` - Combine queries
  - Effort: 16 hours

### P1 - Dependency Updates

- [ ] **Update Anthropic SDK**
  - Current: `@anthropic-ai/sdk@0.63.0`
  - Target: `@anthropic-ai/sdk@0.71.0`
  - Reason: Security patches, new features
  - Effort: 2 hours

- [ ] **Run security audit**
  - Command: `npm audit fix`
  - Review and address any remaining vulnerabilities
  - Effort: 2 hours

---

## Phase 2: UX Quick Wins (Week 3-4)

### P1 - Homepage Decluttering

- [ ] **Reduce homepage sections from 18 to 8**
  - File: `src/app/page.tsx`
  - Keep: Hero, Courses, Faculty, Testimonials, Locations, Booking, Footer
  - Merge: Trust signals into Hero, Success stories into Testimonials
  - Remove/relocate: Video showcase, Photo gallery CTA, Success ticker
  - Effort: 8 hours

- [ ] **Consolidate floating CTAs**
  - Current: 3+ floating elements (WhatsApp, Success Ticker, Exit Intent)
  - Target: Single floating WhatsApp button
  - Files:
    - `src/components/ui/SuccessTicker.tsx`
    - `src/components/home/HomePageClient.tsx`
  - Effort: 4 hours

- [ ] **Standardize button variants**
  - Current: 13 button variants across codebase
  - Target: 5 variants (primary, secondary, outline, ghost, destructive)
  - File: `src/components/ui/PremiumDesignSystem.tsx`
  - Effort: 6 hours

### P1 - Demo Booking Simplification

- [ ] **Reduce demo booking from 4 steps to 2**
  - File: `src/app/demo-booking/page.tsx`
  - Step 1: Name, Phone, Email, Course Interest
  - Step 2: Preferred Date/Time + Confirm
  - Remove: Separate class selection, redundant confirmations
  - Effort: 8 hours

- [ ] **Add WhatsApp as primary contact method**
  - Current: Form submission only
  - Target: "Book via WhatsApp" button with pre-filled message
  - Files: All booking/contact forms
  - Effort: 4 hours

### P1 - Pricing Transparency

- [ ] **Add pricing information to course pages**
  - Files: `src/app/courses/*/page.tsx`
  - Current: "Contact for pricing"
  - Target: Display base price with "Starting from ₹X"
  - Effort: 4 hours

- [ ] **Create pricing comparison table**
  - New file: `src/components/courses/PricingTable.tsx`
  - Show: Course name, duration, price, features
  - Effort: 6 hours

### P2 - Accessibility Improvements

- [ ] **Add skip-to-content link**
  - File: `src/app/layout.tsx`
  - Add: `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>`
  - Effort: 1 hour

- [ ] **Fix focus traps in modals**
  - Files: All modal components
  - Issue: Focus can escape modal to background elements
  - Effort: 4 hours

- [ ] **Ensure touch targets are 44x44px minimum**
  - Files: All button/link components
  - Current: Some buttons are 32px height
  - Effort: 3 hours

- [ ] **Add aria-labels to icon-only buttons**
  - Files: All components with icon buttons
  - Effort: 2 hours

---

## Phase 3: Code Quality (Month 2)

### P1 - TypeScript Strict Mode

- [ ] **Fix 614 suppressed TypeScript errors**
  - File: `tsconfig.json` - Currently has `strict: false` or many `//@ts-ignore`
  - Priority order:
    1. Type `any` usage (312 instances)
    2. Null/undefined handling (198 instances)
    3. Missing return types (104 instances)
  - Effort: 40 hours

- [ ] **Enable strict TypeScript checks**
  - File: `tsconfig.json`
  - Add: `"strict": true, "noImplicitAny": true`
  - Effort: 8 hours (after fixing errors)

### P1 - Test Coverage

- [ ] **Re-enable disabled tests**
  - Files: `tests/**/*.test.ts`
  - Issue: Multiple tests skipped with `.skip` or commented out
  - Effort: 8 hours

- [ ] **Add missing test coverage**
  - Current coverage: ~45%
  - Target coverage: 70%
  - Priority:
    - API routes (0% → 80%)
    - Form validations (30% → 90%)
    - Utility functions (60% → 90%)
  - Effort: 24 hours

### P2 - Code Organization

- [ ] **Consolidate duplicate utility functions**
  - Files: `src/lib/utils.ts`, `src/lib/helpers.ts`, `src/utils/*.ts`
  - Issue: Same functions defined in multiple places
  - Effort: 8 hours

- [ ] **Extract magic numbers to constants**
  - Files: Various component files
  - Example: `delay: 2000` → `ANIMATION_DELAY_MS`
  - Effort: 4 hours

- [ ] **Remove dead code**
  - Issue: Unused exports, commented-out code blocks
  - Tool: Run `npx knip` to identify dead code
  - Effort: 4 hours

### P2 - Performance Optimizations

- [ ] **Implement proper image optimization**
  - Files: All image components
  - Current: Many images use raw URLs
  - Target: Use Next.js `<Image>` with proper sizing
  - Effort: 8 hours

- [ ] **Add proper caching headers**
  - Files: API routes, `next.config.js`
  - Current: No cache-control headers
  - Target: Appropriate caching for static/dynamic content
  - Effort: 4 hours

- [ ] **Optimize bundle size**
  - Current: Large initial JS bundle
  - Actions:
    - Audit and remove unused dependencies
    - Implement proper tree-shaking
    - Split large components
  - Effort: 8 hours

---

## Phase 4: Major Refactors (Month 3)

### P2 - Enrollment Flow Restructure

- [ ] **Redesign enrollment process**
  - Current: 6+ steps with multiple page redirects
  - Target: 3-step wizard on single page
  - Steps:
    1. Select Course + Schedule
    2. Student Details + Parent Info
    3. Payment + Confirmation
  - Effort: 24 hours

- [ ] **Add enrollment progress indicator**
  - Show: Step X of 3, estimated time remaining
  - Effort: 4 hours

### P2 - Course Comparison Tool

- [ ] **Build course comparison feature**
  - New files:
    - `src/components/courses/CourseCompare.tsx`
    - `src/app/courses/compare/page.tsx`
  - Features: Side-by-side comparison, feature matrix
  - Effort: 16 hours

### P2 - Student Portal Improvements

- [ ] **Add student onboarding flow**
  - Current: Direct dump to dashboard
  - Target: Guided tour of features
  - Effort: 12 hours

- [ ] **Implement progress tracking dashboard**
  - Show: Course progress, test scores, attendance
  - Effort: 16 hours

### P3 - Database Migration

- [ ] **Prepare for Prisma v7 migration**
  - Current: Prisma v5.x
  - Actions:
    - Review breaking changes
    - Update schema syntax
    - Test migrations
  - Effort: 8 hours

---

## Technical Debt Register

### High Priority (Address within 30 days)

| Issue                     | Location            | Impact      | Effort |
| ------------------------- | ------------------- | ----------- | ------ |
| Auth bypass in middleware | `middleware.ts:59`  | Security    | 1h     |
| Missing API auth          | `middleware.ts:143` | Security    | 2h     |
| No rate limiting          | API routes          | Security    | 4h     |
| 211+ N+1 queries          | Various             | Performance | 16h    |
| Missing DB indexes        | `schema.prisma`     | Performance | 3h     |

### Medium Priority (Address within 60 days)

| Issue                 | Location         | Impact          | Effort |
| --------------------- | ---------------- | --------------- | ------ |
| 614 TypeScript errors | Project-wide     | Maintainability | 40h    |
| 13 button variants    | UI components    | Consistency     | 6h     |
| Disabled tests        | `tests/`         | Quality         | 8h     |
| Duplicate utilities   | `lib/`, `utils/` | Maintainability | 8h     |

### Low Priority (Address within 90 days)

| Issue                    | Location     | Impact      | Effort |
| ------------------------ | ------------ | ----------- | ------ |
| Dead code removal        | Project-wide | Bundle size | 4h     |
| Image optimization       | Components   | Performance | 8h     |
| Bundle size optimization | Build config | Performance | 8h     |

---

## Monitoring & Success Metrics

### Performance Targets

| Metric     | Current | Target | Tool            |
| ---------- | ------- | ------ | --------------- |
| LCP        | ~3.5s   | <2.5s  | Lighthouse      |
| FID        | ~150ms  | <100ms | Web Vitals      |
| CLS        | ~0.15   | <0.1   | Lighthouse      |
| Initial JS | ~1.2MB  | <500KB | Bundle analyzer |

### Conversion Targets

| Metric                  | Current | Target |
| ----------------------- | ------- | ------ |
| Demo booking completion | ~35%    | >60%   |
| Homepage bounce rate    | ~55%    | <40%   |
| Time to first CTA click | ~45s    | <20s   |

### Quality Targets

| Metric              | Current | Target |
| ------------------- | ------- | ------ |
| TypeScript coverage | ~60%    | 100%   |
| Test coverage       | ~45%    | >70%   |
| Accessibility score | ~72     | >90    |

---

## Implementation Notes

### Before Starting Each Task

1. Create feature branch from `main`
2. Run existing tests to ensure baseline
3. Document any discovered issues

### After Completing Each Task

1. Run full test suite
2. Run `npm run build` to verify no build errors
3. Test on mobile viewport (375px)
4. Create PR with description of changes

### Dependencies Between Tasks

```
Phase 1 Security → Phase 2 UX (security must be fixed first)
Phase 2 Button consolidation → Phase 3 TypeScript (reduces errors)
Phase 3 TypeScript → Phase 4 Refactors (type safety enables refactoring)
```

---

## Quick Reference Commands

```bash
# Run type check
npx tsc --noEmit

# Run tests
npm test

# Check bundle size
npx @next/bundle-analyzer

# Find dead code
npx knip

# Security audit
npm audit

# Format code
npx prettier --write .
```

---

_Last updated: December 4, 2025_
_Total estimated effort: 281-350 hours_
