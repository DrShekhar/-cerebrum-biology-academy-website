# AI-Generated Content Fix List

## Summary

This document lists all remaining AI-generated content patterns that need to be fixed to make the website appear more authentically human-crafted.

**Generated:** 2025-12-26
**Total Issues Identified:** 50 buzzword instances + 54 placeholder images + ~12 SEO keyword stuffing issues

---

## CRITICAL PRIORITY: Placeholder Images (54 files)

These SVG placeholders are disguised as JPG/PNG files and MUST be replaced with real photos:

### Faculty Photos (5 fake, 1 real)

| File                                  | Status   | Action                  |
| ------------------------------------- | -------- | ----------------------- |
| `public/faculty/dr-shekhar-singh.jpg` | REAL     | Keep                    |
| `public/faculty/dr-amit-singh.jpg`    | FAKE SVG | Replace with real photo |
| `public/faculty/dr-anita-verma.jpg`   | FAKE SVG | Replace with real photo |
| `public/faculty/dr-priya-sharma.jpg`  | FAKE SVG | Replace with real photo |
| `public/faculty/dr-vikram-joshi.jpg`  | FAKE SVG | Replace with real photo |
| `public/faculty/prof-meera-gupta.jpg` | FAKE SVG | Replace with real photo |

### Student/Testimonial Photos (9 files)

All files in `public/testimonials/` are SVG placeholders.

### Avatar Images (7 files)

All files in `public/avatars/` are SVG placeholders.

### Additional Directories

- `public/images/students/` - 6 fake files
- `public/images/testimonials/` - 16 fake files
- `public/images/toppers/` - 6 fake files
- `public/video-thumbnails/` - 3 fake files

**Run detection script:** `node scripts/detect-placeholder-images.js`

---

## HIGH PRIORITY: AI Buzzword Fixes

### Files Already Fixed (12 instances removed):

- `src/app/interactive-learning/page.tsx`
- `src/app/adaptive-testing/page.tsx`
- `src/app/services/online-classes/page.tsx`
- `src/app/services/international/page.tsx`
- `src/data/faculty.ts`

### Remaining Files to Fix (50 instances):

#### App Pages (User-Facing - FIX FIRST)

| File                                           | Line     | Current Text                          | Suggested Fix              |
| ---------------------------------------------- | -------- | ------------------------------------- | -------------------------- |
| `src/app/online-biology-classes/page.tsx`      | 81       | "Seamless sync across devices"        | "Syncs across devices"     |
| `src/app/neet-online/page.tsx`                 | 30       | "seamless experience"                 | "smooth experience"        |
| `src/app/neet-online/page.tsx`                 | 236      | "works seamlessly across all devices" | "works across all devices" |
| `src/app/biology-tutor-dwarka/page.tsx`        | 88       | "ensures seamless learning"           | "ensures smooth learning"  |
| `src/app/neet-biology-tutor-online/page.tsx`   | 296      | "seamless learning"                   | "smooth learning"          |
| `src/app/boards/state-boards/page.tsx`         | 97       | "Seamless transition"                 | "Smooth transition"        |
| `src/app/boards/cbse/page.tsx`                 | 163      | "Seamless integration"                | "Direct integration"       |
| `src/app/ai-features/page.tsx`                 | 12       | "cutting-edge AI-powered"             | "AI-powered"               |
| `src/app/ai-education-demo/CeriAIShowcase.tsx` | 1349     | "cutting-edge technology"             | "modern technology"        |
| `src/app/claudechat-demo/page.tsx`             | 55,78,82 | "Revolutionary" (3x)                  | "Advanced" or "Innovative" |

#### Component Files

| File                                                  | Line            | Current Text        | Suggested Fix       |
| ----------------------------------------------------- | --------------- | ------------------- | ------------------- |
| `src/components/claudechat/ClaudeChatBoard.tsx`       | 2,226           | "Revolutionary"     | "Advanced"          |
| `src/components/claudechat/EnhancedVoiceChat.tsx`     | 3               | "Revolutionary"     | "Advanced"          |
| `src/components/claudechat/ARBiologyLab.tsx`          | 2               | "Revolutionary"     | "Advanced"          |
| `src/components/booking/TestimonialCarousel.tsx`      | 54              | "revolutionary"     | "effective"         |
| `src/components/layout/SophisticatedHero.tsx`         | 177             | "revolutionary"     | "innovative"        |
| `src/components/voice/VoiceTestBoard.tsx`             | 109             | "revolutionary"     | "advanced"          |
| `src/components/education/HarvardLevelContent.tsx`    | 103,124,167,321 | "cutting-edge" (4x) | "latest", "current" |
| `src/components/ai/AIFeaturesHub.tsx`                 | 227             | "cutting-edge"      | "advanced"          |
| `src/components/ai/Collaboration.tsx`                 | 565             | "seamless"          | "smooth"            |
| `src/components/trust/FacultyCredentialsShowcase.tsx` | 849             | "cutting-edge"      | "current"           |
| `src/components/counselor/MobileInstallPrompt.tsx`    | 137             | "seamless"          | "smooth"            |

#### Data Files

| File                                       | Line                       | Current Text        | Suggested Fix |
| ------------------------------------------ | -------------------------- | ------------------- | ------------- |
| `src/data/nriCountries.ts`                 | 549,610,802,1268,1706,1714 | "seamless" (6x)     | "smooth"      |
| `src/data/seo-landing/class-11-content.ts` | 102                        | "seamlessly"        | "smoothly"    |
| `src/data/seo-landing/class-12-content.ts` | 436                        | "Seamless"          | "Complete"    |
| `src/data/seo-landing/topics-content.ts`   | 176,510                    | "seamless" (2x)     | "smooth"      |
| `src/data/locationData.ts`                 | 238,403                    | "cutting-edge" (2x) | "advanced"    |
| `src/data/localities.ts`                   | 10110                      | "cutting-edge"      | "modern"      |
| `src/data/implementationTimeline.ts`       | 267                        | "Seamless"          | "Smooth"      |

#### API Routes (Lower Priority - Internal)

| File                                      | Line                        | Issue                                |
| ----------------------------------------- | --------------------------- | ------------------------------------ |
| `src/app/api/payments/route.ts`           | 165,202,274,358,423,521,663 | "revolutionary_features", "seamless" |
| `src/app/api/subscription-tiers/route.ts` | 429                         | "revolutionary_features"             |

---

## MEDIUM PRIORITY: Code Comments & Internal Files

These are less visible but still contribute to AI-generated perception if audited:

### Library Files with Code Comments

- `src/lib/claudechat/claudeChatCore.ts` - Lines 2, 197
- `src/lib/collaboration/RealtimeCollaborationEngine.ts` - Lines 2, 355
- `src/lib/ai/AdaptiveLearningEngine.ts` - Line 2
- `src/lib/assessment/AutomatedAssessmentEngine.ts` - Lines 2, 558
- `src/lib/virtual-lab/VirtualLabEngine.ts` - Lines 2, 278, 284
- `src/lib/study-rooms/StudyRoomEngine.ts` - Line 546

---

## LOW PRIORITY: SEO Metadata Keyword Stuffing

### Issue

`src/lib/seo/metadata.ts` contains 40+ keywords per page meta, which is considered over-optimization.

### Recommendation

Reduce to 5-8 highly relevant keywords per page.

---

## Quick Fix Commands

### Find all remaining buzzwords:

```bash
grep -rn --include="*.tsx" --include="*.ts" -iE "seamless|cutting.edge|revolutionary" src/
```

### Run placeholder image detection:

```bash
node scripts/detect-placeholder-images.js
```

### After fixes, verify:

```bash
npm run type-check
npm run build
```

---

## Replacement Reference Guide

| AI Buzzword     | Better Alternatives                             |
| --------------- | ----------------------------------------------- |
| "seamless"      | "smooth", "easy", "direct", "simple"            |
| "seamlessly"    | "smoothly", "easily", "directly"                |
| "cutting-edge"  | "modern", "current", "latest", "advanced"       |
| "revolutionary" | "innovative", "advanced", "effective", "proven" |
| "comprehensive" | "complete", "full", "thorough"                  |
| "unlock"        | "access", "gain", "achieve"                     |
| "journey"       | "progress", "path", "experience"                |
| "realm"         | "field", "area", "domain"                       |
| "leverage"      | "use", "apply", "utilize"                       |
| "elevate"       | "improve", "enhance", "raise"                   |

---

## Progress Tracking

- [x] Audit completed
- [x] Detection script created
- [x] Fixed 12 buzzword instances in 5 files
- [x] Fixed ClaudeChat demo page with authentic language
- [x] Fixed AI features page descriptions
- [x] Fixed testimonial carousel quotes
- [x] Fixed hero/marketing sections (SophisticatedHero, VoiceTestBoard)
- [x] Fixed ClaudeChat components (ClaudeChatBoard, EnhancedVoiceChat, ARBiologyLab)
- [x] Fixed nriCountries.ts (6 instances)
- [ ] Fix remaining buzzwords in other data files (~20 instances)
- [ ] Replace 54 placeholder images with real photos
- [ ] Reduce SEO keyword stuffing
- [ ] Final verification build
