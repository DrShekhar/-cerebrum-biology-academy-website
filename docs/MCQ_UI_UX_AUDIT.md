# NEET Biology MCQ Practice - UI/UX Audit Report

**Date:** December 2024
**Focus:** Student Focus & Concentration During MCQ Practice
**URL:** https://cerebrumbiologyacademy.com/neet-biology-mcq

---

## Executive Summary

The MCQ practice page has good gamification features but suffers from **attention fragmentation** that hurts student focus. The current design presents too many competing elements, making it difficult for students to concentrate on what matters most: **solving the question**.

**Focus Score: 5/10** - Significant room for improvement

---

## Critical Issues (High Priority)

### 1. Attention Fragmentation During Quiz

**Problem:** When quiz is active, students see:

- Question card (LEFT)
- Stats panel with 6+ metrics (RIGHT)
- Progress bar (TOP)
- Quick action buttons: Leaderboard, Submit Question, Daily Challenge (BOTTOM)
- Breadcrumb navigation (TOP)
- CTA section visible on scroll (BOTTOM)

**Impact:** Student's eye constantly drawn away from the question
**Fix:** Implement "Focus Mode" - collapse/hide sidebar and remove quick actions during active answering

### 2. Visual Hierarchy Problems

| Element       | Current State           | Recommended                             |
| ------------- | ----------------------- | --------------------------------------- |
| Question Text | `text-base` (16px)      | `text-lg` (18px) for better readability |
| Options       | `text-sm` (14px)        | `text-base` (16px)                      |
| Topic Label   | `text-xs` - hard to see | `text-sm` with better contrast          |
| Timer         | Small pill in corner    | More prominent but not distracting      |

### 3. Layout Issues

**Problem:** Large empty gap between question card (max-w-2xl = 672px) and sidebar (w-64 = 256px) on large screens

**Screen widths:**

- Container: max-w-7xl (1280px)
- Question: max-w-2xl (672px)
- Sidebar: w-64 (256px)
- Gap: ~350px wasted space

**Fix:** Center the question card or use golden ratio layout

---

## UI Issues (from Screenshot Analysis)

### Typography

| Issue                        | Location          | Fix                                   |
| ---------------------------- | ----------------- | ------------------------------------- |
| **Inconsistent "NEET" font** | Page title        | Use consistent font-family            |
| **Small topic label**        | Question card     | Increase to `text-sm`, use pill badge |
| **Cramped progress text**    | Quiz progress bar | Add more spacing                      |

### Visual Consistency

| Issue                              | Location      | Fix                                                                          |
| ---------------------------------- | ------------- | ---------------------------------------------------------------------------- |
| **Answer option styling mismatch** | After answer  | Unselected options (B,C,D) should have consistent styling with selected      |
| **Button style mismatch**          | Sidebar       | "View Leaderboard" (filled) vs "Daily Challenge" (outlined) - pick one style |
| **Multiple green shades**          | Various       | Define consistent green palette                                              |
| **"+15 XP" underemphasis**         | Feedback area | Make reward more celebratory                                                 |

### Feedback & Rewards

| Issue                | Current             | Recommended                                       |
| -------------------- | ------------------- | ------------------------------------------------- |
| **Correct feedback** | Simple "✓ Correct!" | Add animation, sound option, confetti for streaks |
| **XP reward**        | Small text          | Animated counter, floating +XP                    |
| **Streak display**   | Small fire emoji    | Larger, animated streak counter                   |

---

## UX Issues (Focus-Related)

### 1. Timer Confusion

**Current:** Timer shows "29s" with no context
**Problems:**

- Unclear if counting UP or DOWN
- No indication of what happens at limit
- Causes anxiety for some students

**Fix Options:**

- Add label: "Time taken: 29s"
- Or remove timer visibility, show only after answer
- Add setting to hide/show timer

### 2. Skip Button Placement

**Current:** Small "Skip →" button in top-right corner
**Problem:** Too far from answer options, easy to miss

**Fix:** Place skip button below options, styled as secondary action

### 3. Keyboard Shortcuts Hidden

**Current:** "Press 1-4 or A-D to select" in 10px gray text
**Problem:** Power users don't know about shortcuts

**Fix:**

- Show hint more prominently on first visit
- Add keyboard icon to question header
- Tutorial on first use

### 4. Lead Capture Interruptions

**Current:** Modal appears after 3 questions, then 5 questions
**Problem:** Breaks flow and concentration

**Fix:**

- Move to end of session
- Or use non-modal inline prompt
- Track completion rate before vs after lead capture

### 5. Progress Redundancy

**Current:** Progress shown in:

1. Quiz progress bar: "Q 1/20"
2. Stats panel: "Questions: 1"
3. Session stats: "This Session - Questions: 1"

**Problem:** Redundant information, cognitive load

**Fix:** Single source of truth in progress bar, sidebar shows different metrics

---

## Focus-Mode Enhancement Proposal

### Design Concept: "Zen Mode" for Practice

```
┌─────────────────────────────────────────────────────────────┐
│  [←]  Q 3/20  •  ✓ 2/2 (100%)  •  ⏱ 45s     [≡ Menu]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ECOLOGY  •  MEDIUM                                       │
│                                                             │
│    Integrated Pest Management (IPM) involves:              │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │  A  Using multiple methods to control pests...  │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │  B  Only chemical pesticides                    │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │  C  Only biological control                     │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │  D  Ignoring pest problems                      │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│              [Skip Question]    [1-4 to select]            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Changes:**

1. **Full-width question card** - No sidebar during active answering
2. **Minimal header** - Just progress, accuracy, timer, menu
3. **Centered content** - Focus naturally drawn to question
4. **Sidebar as overlay** - Click menu to see stats
5. **Celebration on answer** - Full-screen confetti for streaks

---

## Performance Issues

### Bundle Size Impact

| Component          | Uses framer-motion                   | Priority |
| ------------------ | ------------------------------------ | -------- |
| `page.tsx`         | Yes (AnimatePresence for questions)  | HIGH     |
| `QuestionCard.tsx` | Yes (motion.button, AnimatePresence) | HIGH     |
| `StatsPanel.tsx`   | Yes (motion.div for progress)        | MEDIUM   |

**Recommendation:** Convert to CSS animations like other pages

---

## Enhancement Roadmap

### Phase 1: Quick Wins (1-2 days)

| Task                               | Impact | Effort |
| ---------------------------------- | ------ | ------ |
| Fix typography sizes               | HIGH   | LOW    |
| Add "Focus Mode" toggle            | HIGH   | MEDIUM |
| Improve correct/incorrect feedback | MEDIUM | LOW    |
| Fix button style consistency       | LOW    | LOW    |
| Center question card properly      | MEDIUM | LOW    |

### Phase 2: Focus Improvements (3-5 days)

| Task                                 | Impact      | Effort |
| ------------------------------------ | ----------- | ------ |
| Convert framer-motion to CSS         | HIGH (perf) | MEDIUM |
| Implement collapsible sidebar        | HIGH        | MEDIUM |
| Add timer visibility toggle          | MEDIUM      | LOW    |
| Improve keyboard shortcut visibility | MEDIUM      | LOW    |
| Move lead capture to session end     | MEDIUM      | MEDIUM |

### Phase 3: Delight Features (1 week)

| Task                       | Impact | Effort |
| -------------------------- | ------ | ------ |
| Add celebration animations | MEDIUM | MEDIUM |
| Sound effects (optional)   | LOW    | LOW    |
| Streak celebrations        | MEDIUM | MEDIUM |
| Session summary screen     | MEDIUM | MEDIUM |

---

## Success Metrics

| Metric                     | Current (Est.) | Target  |
| -------------------------- | -------------- | ------- |
| Avg. questions per session | ~5             | 15+     |
| Session duration           | ~3 min         | 10+ min |
| Return rate (next day)     | Unknown        | 30%+    |
| Questions before bounce    | ~3             | 10+     |

---

## Files to Modify

```
src/app/neet-biology-mcq/page.tsx          # Main page layout
src/components/mcq/QuestionCard.tsx        # Question display
src/components/mcq/StatsPanel.tsx          # Stats sidebar
src/components/mcq/LeadCaptureModal.tsx    # Lead capture timing
src/app/globals.css                        # Animation classes
```

---

## Appendix: Screenshot Issues Summary

From the provided screenshot, specific issues identified:

1. ✗ "NEET" title font inconsistent
2. ✗ "Ecology" topic label too small
3. ✗ Large gap between question and sidebar
4. ✗ Progress text cramped
5. ✗ Answer option styling inconsistent (A green, B/C/D gray)
6. ✗ Button styles mismatch in sidebar
7. ✗ Multiple green shades
8. ✗ "+15 XP" not prominent enough
9. ✗ "Correct!" banner understated
10. ✗ "Progress to Level 2: 0%" confusing after earning XP
11. ✗ "Unlock Explanations" CTA alignment
12. ✗ Timer "29s" - direction unclear
13. ✗ Breadcrumb link color not distinct
14. ✗ Day Streak "0" with fire emoji contradictory

---

**Prepared by:** Claude Code Analysis
**Review Status:** Ready for Implementation
