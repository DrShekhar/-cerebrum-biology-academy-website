# Gurugram SEO Pages Implementation Plan

## Overview
Create high-value SEO pages targeting underserved keywords for the Gurugram market.

---

## Phase 1: Olympiad Pages (Critical Priority)

### 1.1 `/biology-olympiad-coaching-gurugram/`
**Target Keywords:**
- "biology olympiad coaching gurugram" (140-220/mo)
- "olympiad preparation gurugram"
- "science olympiad biology gurugram"

**Page Structure:**
- Hero: "Biology Olympiad Coaching in Gurugram | IBO, NSEB, INBO Preparation"
- Olympiad pathways explained (IBO → NSEB → INBO)
- Syllabus coverage (6 categories)
- Faculty credentials (Olympiad mentors)
- Success stories (Olympiad achievers)
- Course options (Olympiad Foundation, Intensive)
- FAQs (5-7 questions)
- Video testimonials section
- NEET Tools widget
- Internal links to NSEB, IBO specific pages

**Schemas:**
- EducationalOrganization
- Course (Olympiad courses)
- FAQPage
- BreadcrumbList

---

### 1.2 `/nseb-coaching-gurugram/`
**Target Keywords:**
- "nseb coaching gurugram" (100-160/mo)
- "nseb preparation gurugram"
- "national standard examination biology gurugram"

**Page Structure:**
- Hero: "NSEB Coaching in Gurugram | National Standard Examination in Biology"
- NSEB exam pattern & eligibility
- Complete NSEB syllabus (theory + practical)
- Preparation timeline (6-month plan)
- Stage-wise preparation (NSEB → INBO → IBO)
- Practice resources (PYQs, mock tests)
- Faculty (Olympiad specialists)
- FAQs specific to NSEB
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course (NSEB Preparation)
- FAQPage
- HowTo (NSEB preparation steps)
- BreadcrumbList

---

### 1.3 `/ibo-preparation-gurugram/`
**Target Keywords:**
- "ibo preparation gurugram" (40-80/mo)
- "international biology olympiad gurugram"
- "ibo coaching gurugram"

**Page Structure:**
- Hero: "IBO Preparation in Gurugram | International Biology Olympiad Coaching"
- IBO pathway (India selection process)
- Complete IBO syllabus (25 topics, 6 categories)
- Training camp preparation
- Practical exam focus
- Success metrics (past IBO participants)
- Course options with pricing
- FAQs
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course
- FAQPage
- BreadcrumbList

---

## Phase 2: NEET Foundation Pages

### 2.1 `/neet-foundation-class-9-gurugram/`
**Target Keywords:**
- "neet foundation class 9 gurugram" (380-500/mo)
- "class 9 neet preparation gurugram"
- "early neet coaching class 9"

**Page Structure:**
- Hero: "NEET Foundation for Class 9 in Gurugram | Start Early, Score High"
- 4-year advantage messaging
- Class 9 syllabus mapped to NEET
- Foundation vs Regular coaching comparison
- Weekly schedule sample
- Board + NEET dual preparation
- Premium school students (DPS, Scottish High, etc.)
- Parent testimonials
- FAQs (5-7)
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course (NEET Foundation Class 9)
- FAQPage
- BreadcrumbList
- AggregateRating

---

### 2.2 `/neet-foundation-class-10-gurugram/`
**Target Keywords:**
- "neet foundation class 10 gurugram" (280-400/mo)
- "class 10 neet preparation gurugram"
- "2-year neet prep gurugram"

**Page Structure:**
- Hero: "NEET Foundation for Class 10 in Gurugram | 2-Year Head Start"
- 2-year advantage messaging
- Class 10 board + NEET overlap (40% concepts)
- Detailed syllabus mapping
- Success stories (Foundation → NEET toppers)
- Batch options (Weekend, Weekday)
- FAQs
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course
- FAQPage
- BreadcrumbList

---

### 2.3 `/class-9-biology-tuition-gurugram/`
**Target Keywords:**
- "class 9 biology tuition gurugram" (480-600/mo)
- "class 9 biology coaching gurugram"
- "9th biology tuition gurugram"

**Page Structure:**
- Hero: "Class 9 Biology Tuition in Gurugram | CBSE, ICSE Board Preparation"
- Board-specific curriculum coverage
- NCERT + Reference book approach
- Chapter-wise breakdown
- Practical/Lab support
- School-specific batches
- Affordable pricing
- FAQs
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course
- FAQPage
- BreadcrumbList

---

### 2.4 `/class-10-biology-coaching-gurugram/`
**Target Keywords:**
- "class 10 biology coaching gurugram" (420-550/mo)
- "class 10 biology tuition gurugram"
- "10th biology coaching gurugram"

**Page Structure:**
- Hero: "Class 10 Biology Coaching in Gurugram | Board Exam Excellence"
- Board exam focus
- Complete syllabus coverage
- Diagram & practical emphasis
- Mock test series
- School coordination
- FAQs
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course
- FAQPage
- BreadcrumbList

---

## Phase 3: Dropper/Repeater Pages

### 3.1 `/neet-dropper-batch-2025-26-gurugram/`
**Target Keywords:**
- "neet dropper batch gurugram" (400-600/mo)
- "neet repeater coaching gurugram"
- "neet 2nd attempt gurugram"

**Page Structure:**
- Hero: "NEET Dropper Batch 2025-26 in Gurugram | Transform Your Score"
- Year-long intensive program
- Score improvement data (+150 marks average)
- Personalized study plans
- Mental health & motivation support
- Success stories (Dropper → Doctor)
- Flexible timings (morning/evening)
- FAQs
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course
- FAQPage
- BreadcrumbList
- AggregateOffer

---

### 3.2 `/one-year-dropper-course-gurugram/`
**Target Keywords:**
- "one year dropper course gurugram" (120-180/mo)
- "neet 1 year course gurugram"
- "intensive dropper coaching gurugram"

**Page Structure:**
- Hero: "One Year NEET Dropper Course in Gurugram | Complete Transformation"
- 12-month curriculum breakdown
- Phase-wise preparation (Foundation → Advanced → Revision → Mock)
- Daily schedule sample
- Comparison with crash courses
- Fee structure with EMI
- FAQs
- Video testimonials
- NEET Tools widget

**Schemas:**
- Course
- FAQPage
- BreadcrumbList

---

## Implementation Approach

### File Structure
```
src/app/
├── biology-olympiad-coaching-gurugram/
│   └── page.tsx
├── nseb-coaching-gurugram/
│   └── page.tsx
├── ibo-preparation-gurugram/
│   └── page.tsx
├── neet-foundation-class-9-gurugram/
│   └── page.tsx
├── neet-foundation-class-10-gurugram/
│   └── page.tsx
├── class-9-biology-tuition-gurugram/
│   └── page.tsx
├── class-10-biology-coaching-gurugram/
│   └── page.tsx
├── neet-dropper-batch-2025-26-gurugram/
│   └── page.tsx
└── one-year-dropper-course-gurugram/
    └── page.tsx
```

### Common Components to Include
1. `VideoTestimonialsSection` - Video success stories
2. `NEETToolsWidget` - Free NEET tools
3. `QuickAnswers` - AEO-optimized Q&A
4. Schema markup (JSON-LD)
5. Breadcrumb navigation
6. Internal linking to related pages
7. CTA buttons (Demo booking, Call, WhatsApp)
8. Mobile sticky bar

### Execution Order
1. Phase 1.1: `/biology-olympiad-coaching-gurugram/` (main olympiad hub)
2. Phase 1.2: `/nseb-coaching-gurugram/` (highest demand olympiad)
3. Phase 1.3: `/ibo-preparation-gurugram/` (premium segment)
4. Phase 2.1: `/neet-foundation-class-9-gurugram/` (highest volume)
5. Phase 2.2: `/neet-foundation-class-10-gurugram/`
6. Phase 2.3: `/class-9-biology-tuition-gurugram/` (highest volume overall)
7. Phase 2.4: `/class-10-biology-coaching-gurugram/`
8. Phase 3.1: `/neet-dropper-batch-2025-26-gurugram/`
9. Phase 3.2: `/one-year-dropper-course-gurugram/`

---

## Expected Impact

| Page | Monthly Search Volume | Expected Traffic (60% CTR) |
|------|----------------------|---------------------------|
| class-9-biology-tuition-gurugram | 480-600 | 290-360 |
| neet-foundation-class-9-gurugram | 380-500 | 230-300 |
| class-10-biology-coaching-gurugram | 420-550 | 250-330 |
| neet-dropper-batch-gurugram | 400-600 | 240-360 |
| neet-foundation-class-10-gurugram | 280-400 | 170-240 |
| biology-olympiad-coaching-gurugram | 140-220 | 85-130 |
| one-year-dropper-course-gurugram | 120-180 | 70-110 |
| nseb-coaching-gurugram | 100-160 | 60-100 |
| ibo-preparation-gurugram | 40-80 | 25-50 |

**Total Estimated Monthly Traffic: 1,420-1,980 new visitors**

---

## Status

- [ ] Phase 1.1: biology-olympiad-coaching-gurugram
- [ ] Phase 1.2: nseb-coaching-gurugram
- [ ] Phase 1.3: ibo-preparation-gurugram
- [ ] Phase 2.1: neet-foundation-class-9-gurugram
- [ ] Phase 2.2: neet-foundation-class-10-gurugram
- [ ] Phase 2.3: class-9-biology-tuition-gurugram
- [ ] Phase 2.4: class-10-biology-coaching-gurugram
- [ ] Phase 3.1: neet-dropper-batch-2025-26-gurugram
- [ ] Phase 3.2: one-year-dropper-course-gurugram
