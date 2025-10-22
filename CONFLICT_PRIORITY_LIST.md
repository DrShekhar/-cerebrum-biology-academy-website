# 🎯 ALL 58 CONFLICTS - Priority List

## Sorted by Importance

---

## 🔴 CRITICAL (Must Decide Carefully) - 10 files

These directly affect your website functionality and user experience.

### 1. **`src/app/page.tsx`** ⭐⭐⭐⭐⭐

**What it is:** Your homepage - the most important page
**MAIN has:** Urgency banner, countdown timer, inline stats (229 lines)
**DEVELOPMENT has:** Component-based with 6 sections (19 lines)
**RECOMMENDED:** **C - Synthesize** (combine urgency + sections)
**Impact:** HIGH - This is what users see first

---

### 2. **`src/app/layout.tsx`** ⭐⭐⭐⭐⭐

**What it is:** Main layout wrapper for entire app
**MAIN has:** PWA, Analytics, Mobile nav, Advanced SEO
**DEVELOPMENT has:** Simpler layout
**RECOMMENDED:** **A - Keep MAIN** (has all features)
**Impact:** HIGH - Affects every page

---

### 3. **`src/app/globals.css`** ⭐⭐⭐⭐

**What it is:** Global styles for entire site
**MAIN has:** Latest mobile optimizations, PWA styles, performance
**DEVELOPMENT has:** Older color scheme
**RECOMMENDED:** **A - Keep MAIN** (latest optimizations)
**Impact:** HIGH - Affects entire site appearance

---

### 4. **`src/components/layout/Footer.tsx`** ⭐⭐⭐⭐

**What it is:** Footer on every page
**MAIN has:** PWA install, Analytics, Newsletter
**DEVELOPMENT has:** Better design, cleaner structure
**RECOMMENDED:** **C - Synthesize** (dev design + main features)
**Impact:** MEDIUM-HIGH - Visible on every page

---

### 5. **`src/components/layout/HeroSection.tsx`** ⭐⭐⭐⭐

**What it is:** Main hero component (from development)
**MAIN has:** Different simple version
**DEVELOPMENT has:** Professional hero with navigation
**RECOMMENDED:** **B - Use DEVELOPMENT** (better design)
**Impact:** HIGH - First thing users see

---

### 6. **`src/components/ui/Button.tsx`** ⭐⭐⭐

**What it is:** Button component used everywhere
**MAIN has:** 10+ variants, loading states, icons, analytics
**DEVELOPMENT has:** 4 basic variants
**RECOMMENDED:** **A - Keep MAIN** (more features)
**Impact:** MEDIUM - Used throughout site

---

### 7. **`src/data/courses.ts`** ⭐⭐⭐

**What it is:** Course data structure
**MAIN has:** Current course data
**DEVELOPMENT has:** Different course structure
**RECOMMENDED:** **Check which is more complete**
**Impact:** MEDIUM - Affects course pages

---

### 8. **`src/app/courses/page.tsx`** ⭐⭐⭐

**What it is:** Courses listing page
**MAIN has:** Current version
**DEVELOPMENT has:** Enhanced version with filters
**RECOMMENDED:** **B - Use DEVELOPMENT** (better UX)
**Impact:** MEDIUM - Important for conversions

---

### 9. **`src/components/layout/CoursesSection.tsx`** ⭐⭐⭐

**What it is:** Courses section component
**MAIN has:** Simpler version
**DEVELOPMENT has:** Full course grid with categories
**RECOMMENDED:** **B - Use DEVELOPMENT** (more features)
**Impact:** MEDIUM - Part of homepage

---

### 10. **`package.json`** ⭐⭐⭐

**What it is:** Project dependencies
**MAIN has:** Latest dependencies (v1.0.2)
**DEVELOPMENT has:** Older dependencies
**RECOMMENDED:** **A - Keep MAIN** (latest versions)
**Impact:** HIGH - Affects builds

---

## 🟡 MEDIUM (Important but easier to decide) - 20 files

### 11. **`src/components/layout/FacultySection.tsx`** ⭐⭐

**What it is:** Faculty profiles section
**MAIN has:** Basic version
**DEVELOPMENT has:** Full faculty profiles
**RECOMMENDED:** **B - Use DEVELOPMENT**
**Impact:** MEDIUM

---

### 12. **`src/components/layout/TestimonialsSection.tsx`** ⭐⭐

**What it is:** Student testimonials section
**MAIN has:** Simple cards
**DEVELOPMENT has:** Enhanced testimonials
**RECOMMENDED:** **B - Use DEVELOPMENT**
**Impact:** MEDIUM

---

### 13. **`src/components/layout/BookingSection.tsx`** ⭐⭐

**What it is:** Demo booking form
**MAIN has:** Basic version
**DEVELOPMENT has:** Full booking system
**RECOMMENDED:** **B - Use DEVELOPMENT**
**Impact:** MEDIUM

---

### 14. **`src/app/about/page.tsx`** ⭐⭐

**What it is:** About page
**MAIN has:** Current version
**DEVELOPMENT has:** Different content
**RECOMMENDED:** **Check which is more complete**
**Impact:** MEDIUM

---

### 15. **`src/app/contact/page.tsx`** ⭐⭐

**What it is:** Contact page
**MAIN has:** Current form
**DEVELOPMENT has:** Different form
**RECOMMENDED:** **A - Keep MAIN** (likely has integrations)
**Impact:** MEDIUM

---

### 16. **`src/app/faculty/page.tsx`** ⭐⭐

**What it is:** Faculty listing page
**MAIN has:** Current version
**DEVELOPMENT has:** Enhanced version
**RECOMMENDED:** **B - Use DEVELOPMENT**
**Impact:** MEDIUM

---

### 17. **`src/data/detailedCourses.ts`** ⭐⭐

**What it is:** Detailed course information
**MAIN has:** Current data
**DEVELOPMENT has:** Different structure
**RECOMMENDED:** **Check which is more complete**
**Impact:** MEDIUM

---

### 18. **`src/data/successStories.ts`** ⭐⭐

**What it is:** Success story data
**MAIN has:** Current stories
**DEVELOPMENT has:** Different stories
**RECOMMENDED:** **Check which has more stories**
**Impact:** MEDIUM

---

### 19. **`src/data/testimonials.ts`** ⭐⭐

**What it is:** Testimonial data
**MAIN has:** Current testimonials
**DEVELOPMENT has:** Different testimonials
**RECOMMENDED:** **Merge both datasets**
**Impact:** MEDIUM

---

### 20. **`src/components/ErrorBoundary.tsx`** ⭐⭐

**What it is:** Error handling component
**MAIN has:** Advanced error handling
**DEVELOPMENT has:** Basic version
**RECOMMENDED:** **A - Keep MAIN**
**Impact:** MEDIUM

---

### 21. **`src/lib/db.ts`** ⭐⭐

**What it is:** Database connection
**MAIN has:** Latest fixes
**DEVELOPMENT has:** Older version
**RECOMMENDED:** **A - Keep MAIN**
**Impact:** MEDIUM

---

### 22-30. **Course-related components** ⭐⭐

- `src/components/courses/CourseCard.tsx`
- `src/components/courses/CourseDetailPage.tsx`
- `src/components/courses/CourseHeroSection.tsx`
- `src/components/courses/EnhancedCourseDetailPage.tsx`
- `src/components/courses/EnhancedCoursesListingPage.tsx`
- `src/components/courses/FloatingCTABar.tsx`
- `src/components/courses/ClassFilterNav.tsx`
- `src/components/courses/index.ts`
- `src/components/enrollment/EnrollmentModal.tsx`

**RECOMMENDED:** **B - Use DEVELOPMENT** (enhanced versions)
**Impact:** MEDIUM

---

## 🟢 LOW (Easy decisions - mostly keep MAIN) - 28 files

### 31. **`.gitignore`** ⭐

**What it is:** Git ignore rules
**RECOMMENDED:** **A - Keep MAIN**
**Impact:** LOW

---

### 32. **`.husky/pre-commit`** ⭐

**What it is:** Git hook for pre-commit
**RECOMMENDED:** **A - Keep MAIN**
**Impact:** LOW

---

### 33. **`README.md`** ⭐

**What it is:** Project documentation
**RECOMMENDED:** **Either (just docs)**
**Impact:** LOW

---

### 34. **`eslint.config.mjs`** ⭐

**What it is:** Linting configuration
**RECOMMENDED:** **A - Keep MAIN**
**Impact:** LOW

---

### 35. **`package-lock.json`** ⭐

**What it is:** Dependency lock file
**RECOMMENDED:** **A - Keep MAIN** (will regenerate anyway)
**Impact:** LOW

---

### 36. **`postcss.config.mjs`** ⭐

**What it is:** PostCSS configuration
**RECOMMENDED:** **A - Keep MAIN**
**Impact:** LOW

---

### 37. **`tsconfig.json`** ⭐

**What it is:** TypeScript configuration
**RECOMMENDED:** **A - Keep MAIN**
**Impact:** LOW

---

### 38-39. **Images** ⭐

- `public/apple-touch-icon.png`
- `public/og-image.jpg`

**RECOMMENDED:** **A - Keep MAIN** (likely newer)
**Impact:** LOW

---

### 40-48. **Page files** ⭐

- `src/app/[localSlug]/page.tsx`
- `src/app/analytics/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/enrollments/page.tsx`
- `src/app/faculty/[facultyId]/page.tsx`
- `src/app/mock-tests/[subject]/[slug]/page.tsx`
- `src/app/success-stories/[studentId]/page.tsx`
- `src/app/success-stories/page.tsx`
- `src/components/local/LocalLandingPage.tsx`

**RECOMMENDED:** **A - Keep MAIN** (has latest features)
**Impact:** LOW-MEDIUM

---

### 49-55. **Component files** ⭐

- `src/components/analytics/PerformanceDashboard.tsx`
- `src/components/auth/AuthModal.tsx`
- `src/components/booking/DemoBookingModal.tsx`
- `src/components/student/MyEnrollments.tsx`
- `src/components/testimonials/ScoreComparison.tsx`
- `src/components/testimonials/StudentJourney.tsx`
- `src/components/testimonials/SuccessAnalytics.tsx`

**RECOMMENDED:** **A - Keep MAIN** (has latest features)
**Impact:** LOW-MEDIUM

---

### 56-58. **Data/Hook files** ⭐

- `src/data/blog.ts`
- `src/data/localTestimonials.ts`
- `src/hooks/useAuth.ts`

**RECOMMENDED:** **A - Keep MAIN**
**Impact:** LOW

---

## 📊 DECISION SUMMARY

| Priority    | Count    | Recommended Action               |
| ----------- | -------- | -------------------------------- |
| 🔴 CRITICAL | 10 files | Decide carefully (5-10 min each) |
| 🟡 MEDIUM   | 20 files | Quick decisions (1-2 min each)   |
| 🟢 LOW      | 28 files | Keep MAIN (instant)              |

**Total Time Estimate:**

- Critical: ~60 minutes
- Medium: ~30 minutes
- Low: ~5 minutes
- **Total: ~90 minutes**

---

## ✅ QUICK DECISION GUIDE

### **For 90% of conflicts, use this:**

| File Type                      | Default Choice          | Why                    |
| ------------------------------ | ----------------------- | ---------------------- |
| Config files (`.json`, `.mjs`) | **A - Keep MAIN**       | Latest configs         |
| Data files (`src/data/*`)      | **Check both**          | May need to merge data |
| Layout components              | **B - Use DEVELOPMENT** | Better structure       |
| Utility components             | **A - Keep MAIN**       | Latest features        |
| Images                         | **A - Keep MAIN**       | Likely newer           |
| Documentation                  | **Either**              | Not critical           |

### **Only these 5 need deep thought:**

1. `src/app/page.tsx` → Synthesize both
2. `src/app/layout.tsx` → Keep MAIN
3. `src/app/globals.css` → Keep MAIN
4. `src/components/layout/Footer.tsx` → Synthesize both
5. `package.json` → Keep MAIN

---

## 🚀 FASTEST APPROACH

**5-Minute Quick Merge:**

1. Auto-keep MAIN for all config/utility files (45 files) ✅
2. Auto-use DEVELOPMENT for layout components (8 files) ✅
3. Synthesize homepage + footer (2 files) ⏱️ 10 min
4. Check data files (3 files) ⏱️ 5 min

**Total: ~15 minutes for smart merge!**

---

Ready to start merging?
