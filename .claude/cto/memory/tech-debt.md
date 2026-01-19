# Technical Debt Register

Tracking known issues, shortcuts, and improvements needed.

---

## 🔴 Critical (Fix ASAP)

### TD-001: TypeScript Errors (~100 remaining)
**Introduced**: Initial development
**Impact**: Code quality, potential runtime bugs
**Effort**: Medium (2-3 days)
**Status**: In Progress

**Details**:
- ~100 errors remaining after Prisma type fixes
- Mostly component prop types
- `ignoreBuildErrors: true` is a temporary workaround

**Fix Plan**:
1. Audit remaining errors by category
2. Fix component prop types
3. Remove `ignoreBuildErrors: true`

---

### TD-002: Blog Pagination Bug
**Introduced**: Unknown
**Impact**: User experience, SEO (duplicate content)
**Effort**: Low (1 day)
**Status**: Not Started

**Details**:
- Page 2, 3, etc. show same content as Page 1
- May be client-side state issue or API bug

**Fix Plan**:
1. Debug pagination component
2. Check API endpoint for page parameter handling
3. Test all pagination scenarios

---

## 🟠 High Priority (Fix This Month)

### TD-003: Firebase + Supabase Dual Auth
**Introduced**: ADR-001 decision
**Impact**: Complexity, maintenance burden
**Effort**: High (1-2 weeks)
**Status**: Planned for Q1 2026

**Details**:
- Two auth systems to maintain
- Firebase for phone OTP only
- Supabase for database

**Fix Plan**:
1. Evaluate Supabase phone auth maturity
2. Create migration plan
3. Migrate existing users
4. Remove Firebase dependencies

---

### TD-004: Large SEO Data Files
**Introduced**: SEO landing page implementation
**Impact**: Bundle size, tree-shaking
**Effort**: Medium (2-3 days)
**Status**: Not Started

**Details**:
- SEO data files are large
- All loaded even when not needed
- Affects initial bundle size

**Fix Plan**:
1. Split data by city/category
2. Use dynamic imports
3. Implement proper code splitting

---

### TD-005: Client Components in SEO Pages
**Introduced**: Initial development
**Impact**: Performance, SEO (hydration)
**Effort**: Medium (3-5 days)
**Status**: Not Started

**Details**:
- SEO landing pages use client components
- Could be server components for better SEO
- Currently requires client-side hydration

**Fix Plan**:
1. Audit which components need client-side
2. Convert stateless components to server
3. Test SEO impact

---

## 🟡 Medium Priority (Fix This Quarter)

### TD-006: Inconsistent Error Handling
**Introduced**: Gradual
**Impact**: User experience, debugging
**Effort**: Medium (3-5 days)
**Status**: Not Started

**Details**:
- Some API routes have inconsistent error responses
- Not all errors are user-friendly
- Logging is inconsistent

**Fix Plan**:
1. Create error handling utilities
2. Standardize error response format
3. Add proper logging

---

### TD-007: Missing Database Indexes
**Introduced**: Unknown
**Impact**: Query performance at scale
**Effort**: Low (1 day)
**Status**: Not Started

**Details**:
- Some frequent queries may lack indexes
- Need to audit query patterns
- Add indexes for common lookups

**Fix Plan**:
1. Analyze slow query logs
2. Identify missing indexes
3. Add via Prisma migration

---

### TD-008: Outdated Dependencies
**Introduced**: Time
**Impact**: Security, features
**Effort**: Low-Medium (1-2 days)
**Status**: Recurring

**Details**:
- Dependencies need regular updates
- Some have deprecation warnings
- Security patches may be pending

**Fix Plan**:
1. Run `npm audit`
2. Update non-breaking changes
3. Plan breaking change updates

---

## 🟢 Low Priority (Nice to Have)

### TD-009: Test Coverage
**Introduced**: MVP development
**Impact**: Code confidence
**Effort**: High (ongoing)
**Status**: Not Started

**Details**:
- Test coverage is low
- Critical paths not tested
- E2E tests minimal

**Fix Plan**:
1. Add tests for critical paths
2. Set up CI test requirements
3. Gradually increase coverage

---

### TD-010: Documentation Gaps
**Introduced**: Fast development
**Impact**: Onboarding, maintenance
**Effort**: Medium (ongoing)
**Status**: In Progress

**Details**:
- Some components lack documentation
- API endpoints not fully documented
- Setup instructions could be clearer

**Fix Plan**:
1. Document as you go
2. Add JSDoc comments
3. Create API documentation

---

## 📊 Tech Debt Summary

| Priority | Count | Estimated Effort |
|----------|-------|------------------|
| 🔴 Critical | 2 | 3-4 days |
| 🟠 High | 3 | 2-3 weeks |
| 🟡 Medium | 3 | 1-2 weeks |
| 🟢 Low | 2 | Ongoing |

**Total Estimated Debt**: ~6-8 weeks of work

---

## 🔄 Review Schedule

- **Weekly**: Check if any low → high priority
- **Sprint**: Plan 1-2 debt items per sprint
- **Quarterly**: Major debt reduction sprint

---

## Template for New Debt

```markdown
### TD-XXX: [Title]
**Introduced**: [When/Why]
**Impact**: [What's affected]
**Effort**: [Low/Medium/High + estimate]
**Status**: [Not Started/In Progress/Done]

**Details**:
[Description of the issue]

**Fix Plan**:
1. Step 1
2. Step 2
3. Step 3
```
