# ✅ MERGE DECISION CHECKLIST

## Simple Step-by-Step Guide

Use this checklist to make decisions quickly and confidently.

---

## 🎯 HOW TO USE THIS CHECKLIST

For each conflict:

1. Read the description
2. Check the boxes as you review
3. Circle your choice (A, B, or C)
4. Move to next

---

## 🔴 CRITICAL DECISIONS (10 files)

### ☐ 1. Homepage - `src/app/page.tsx`

**What you're choosing:**

- [ ] I reviewed MAIN version (has urgency banner + countdown)
- [ ] I reviewed DEVELOPMENT version (has 6 professional sections)
- [ ] I understand what I'm getting

**Your Choice:**

- [ ] **A - Keep MAIN** → Get: Urgency features | Lose: Professional sections
- [ ] **B - Use DEVELOPMENT** → Get: All sections | Lose: Urgency features
- [x] **C - Synthesize** ⭐ RECOMMENDED → Get: EVERYTHING

**If you chose C, I'll create:**

```tsx
<UrgencyBanner /> {/* from main */}
<HeroSection /> {/* from development */}
<CoursesSection /> {/* from development */}
<FacultySection /> {/* from development */}
<TestimonialsSection /> {/* from development */}
<BookingSection /> {/* from development */}
```

---

### ☐ 2. Main Layout - `src/app/layout.tsx`

**What you're choosing:**

- [ ] I reviewed MAIN version (PWA + Analytics + Mobile Nav)
- [ ] I reviewed DEVELOPMENT version (simpler layout)
- [ ] I understand what I'm getting

**Your Choice:**

- [x] **A - Keep MAIN** ⭐ RECOMMENDED → Keep all advanced features
- [ ] **B - Use DEVELOPMENT** → Simpler but lose PWA/Analytics

---

### ☐ 3. Global Styles - `src/app/globals.css`

**What you're choosing:**

- [ ] I reviewed MAIN version (latest mobile optimizations)
- [ ] I reviewed DEVELOPMENT version (older styles)
- [ ] I understand what I'm getting

**Your Choice:**

- [x] **A - Keep MAIN** ⭐ RECOMMENDED → Keep latest optimizations
- [ ] **B - Use DEVELOPMENT** → Older color scheme

---

### ☐ 4. Footer - `src/components/layout/Footer.tsx`

**What you're choosing:**

- [ ] I reviewed MAIN version (PWA + Analytics + Newsletter)
- [ ] I reviewed DEVELOPMENT version (better design structure)
- [ ] I understand what I'm getting

**Your Choice:**

- [ ] **A - Keep MAIN** → Keep features but old design
- [ ] **B - Use DEVELOPMENT** → Better design but lose features
- [x] **C - Synthesize** ⭐ RECOMMENDED → Dev design + Main features

---

### ☐ 5. Hero Section - `src/components/layout/HeroSection.tsx`

**What you're choosing:**

- [ ] I reviewed MAIN version (simple hero)
- [ ] I reviewed DEVELOPMENT version (professional hero with navigation)
- [ ] I understand what I'm getting

**Your Choice:**

- [ ] **A - Keep MAIN** → Simple version
- [x] **B - Use DEVELOPMENT** ⭐ RECOMMENDED → Professional design

---

### ☐ 6. Button Component - `src/components/ui/Button.tsx`

**What you're choosing:**

- [ ] I reviewed MAIN version (10+ variants + loading + icons)
- [ ] I reviewed DEVELOPMENT version (4 basic variants)
- [ ] I understand what I'm getting

**Your Choice:**

- [x] **A - Keep MAIN** ⭐ RECOMMENDED → More features
- [ ] **B - Use DEVELOPMENT** → Basic functionality

---

### ☐ 7. Course Data - `src/data/courses.ts`

**What you're choosing:**

- [ ] I checked MAIN version (current course list)
- [ ] I checked DEVELOPMENT version (different structure)
- [ ] I compared which has more/better data

**Your Choice:**

- [ ] **A - Keep MAIN** → If it has latest courses
- [ ] **B - Use DEVELOPMENT** → If it has better structure
- [ ] **C - Synthesize** → If both have unique courses

**Action needed:** Open both files and compare

---

### ☐ 8. Courses Page - `src/app/courses/page.tsx`

**What you're choosing:**

- [ ] I reviewed MAIN version (current listing)
- [ ] I reviewed DEVELOPMENT version (enhanced with filters)
- [ ] I understand what I'm getting

**Your Choice:**

- [ ] **A - Keep MAIN** → Current version
- [x] **B - Use DEVELOPMENT** ⭐ RECOMMENDED → Better UX with filters

---

### ☐ 9. Courses Section - `src/components/layout/CoursesSection.tsx`

**What you're choosing:**

- [ ] I reviewed MAIN version (simpler)
- [ ] I reviewed DEVELOPMENT version (full grid with categories)
- [ ] I understand what I'm getting

**Your Choice:**

- [ ] **A - Keep MAIN** → Simpler version
- [x] **B - Use DEVELOPMENT** ⭐ RECOMMENDED → Full course grid

---

### ☐ 10. Dependencies - `package.json`

**What you're choosing:**

- [ ] I checked MAIN version (v1.0.2, latest deps)
- [ ] I checked DEVELOPMENT version (older deps)
- [ ] I understand what I'm getting

**Your Choice:**

- [x] **A - Keep MAIN** ⭐ RECOMMENDED → Latest dependencies
- [ ] **B - Use DEVELOPMENT** → Older versions

---

## 🟡 MEDIUM PRIORITY (20 files)

### Quick Decision Rule:

✅ **Layout components** → Use DEVELOPMENT (better design)
✅ **Utility components** → Keep MAIN (latest features)
✅ **Data files** → Check which has more data

---

### ☐ 11. Faculty Section - `src/components/layout/FacultySection.tsx`

- [x] **B - Use DEVELOPMENT** ⭐ (better faculty profiles)

### ☐ 12. Testimonials Section - `src/components/layout/TestimonialsSection.tsx`

- [x] **B - Use DEVELOPMENT** ⭐ (enhanced testimonials)

### ☐ 13. Booking Section - `src/components/layout/BookingSection.tsx`

- [x] **B - Use DEVELOPMENT** ⭐ (full booking system)

### ☐ 14. About Page - `src/app/about/page.tsx`

- [ ] **A - Keep MAIN** (likely has latest content)

### ☐ 15. Contact Page - `src/app/contact/page.tsx`

- [x] **A - Keep MAIN** ⭐ (has form integrations)

### ☐ 16. Faculty Page - `src/app/faculty/page.tsx`

- [ ] **B - Use DEVELOPMENT** (enhanced version)

### ☐ 17. Detailed Courses Data - `src/data/detailedCourses.ts`

- [ ] **Compare both** (check which is more complete)

### ☐ 18. Success Stories Data - `src/data/successStories.ts`

- [ ] **Compare both** (check which has more stories)

### ☐ 19. Testimonials Data - `src/data/testimonials.ts`

- [ ] **C - Synthesize** (merge both datasets if different)

### ☐ 20. Error Boundary - `src/components/ErrorBoundary.tsx`

- [x] **A - Keep MAIN** ⭐ (advanced error handling)

### ☐ 21. Database - `src/lib/db.ts`

- [x] **A - Keep MAIN** ⭐ (latest fixes)

### ☐ 22-30. Course Components (9 files)

All course-related components:

- `src/components/courses/CourseCard.tsx`
- `src/components/courses/CourseDetailPage.tsx`
- `src/components/courses/CourseHeroSection.tsx`
- `src/components/courses/EnhancedCourseDetailPage.tsx`
- `src/components/courses/EnhancedCoursesListingPage.tsx`
- `src/components/courses/FloatingCTABar.tsx`
- `src/components/courses/ClassFilterNav.tsx`
- `src/components/courses/index.ts`
- `src/components/enrollment/EnrollmentModal.tsx`

**Batch Decision:**

- [ ] **B - Use DEVELOPMENT** ⭐ (enhanced course UI)

---

## 🟢 LOW PRIORITY (28 files)

### Default Rule: Keep MAIN for all

These are config files, utilities, and documentation. Safe to keep MAIN.

### ☐ 31-58. Auto-Keep MAIN

- [x] `.gitignore` → **A - Keep MAIN**
- [x] `.husky/pre-commit` → **A - Keep MAIN**
- [x] `README.md` → **A - Keep MAIN**
- [x] `eslint.config.mjs` → **A - Keep MAIN**
- [x] `package-lock.json` → **A - Keep MAIN**
- [x] `postcss.config.mjs` → **A - Keep MAIN**
- [x] `tsconfig.json` → **A - Keep MAIN**
- [x] `public/apple-touch-icon.png` → **A - Keep MAIN**
- [x] `public/og-image.jpg` → **A - Keep MAIN**
- [x] All remaining page files → **A - Keep MAIN**
- [x] All remaining component files → **A - Keep MAIN**
- [x] All remaining data files → **A - Keep MAIN**
- [x] All remaining hook files → **A - Keep MAIN**

---

## 📊 DECISION SUMMARY

Fill this in as you go:

### Critical Decisions:

- [ ] 1. Homepage (page.tsx): A / B / C \_\_\_\_
- [ ] 2. Layout (layout.tsx): A / B \_\_\_\_
- [ ] 3. Styles (globals.css): A / B \_\_\_\_
- [ ] 4. Footer: A / B / C \_\_\_\_
- [ ] 5. Hero Section: A / B \_\_\_\_
- [ ] 6. Button: A / B \_\_\_\_
- [ ] 7. Course Data: A / B / C \_\_\_\_
- [ ] 8. Courses Page: A / B \_\_\_\_
- [ ] 9. Courses Section: A / B \_\_\_\_
- [ ] 10. Package.json: A / B \_\_\_\_

### Medium Priority:

- [ ] Layout components (11-13): Using DEVELOPMENT ✓
- [ ] Pages (14-16): Mix of both
- [ ] Data files (17-19): Need to compare
- [ ] Utilities (20-21): Using MAIN ✓
- [ ] Course components (22-30): Using DEVELOPMENT ✓

### Low Priority:

- [x] All config/utility files: Using MAIN ✓

---

## ✅ FINAL CHECKLIST

Before executing merge:

- [ ] I've made decisions on all 10 critical files
- [ ] I've reviewed my choices
- [ ] I understand I can rollback if needed
- [ ] I have backup branch created
- [ ] I'm ready to test after merge

---

## 🚀 READY TO MERGE?

Once you've checked all boxes, you can execute the merge using:

```bash
# Option 1: Use my smart script (when I create it)
./merge-with-choices.sh

# Option 2: Manual merge (step by step)
# I'll guide you through each decision
```

---

## 💡 QUICK TIPS

**If unsure:**

- Homepage → Choose C (Synthesize)
- Layout → Choose A (Keep MAIN)
- Components → Choose B (Use DEVELOPMENT)
- Config files → Choose A (Keep MAIN)
- Data files → Compare both first

**Remember:**

- You can't lose features - we're combining both!
- Backup is automatically created
- You can rollback anytime
- Test before pushing to production

---

**Estimated time to complete:** 15-20 minutes

**Questions?** Just ask before checking any box!
