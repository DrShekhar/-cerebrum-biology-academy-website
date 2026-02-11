# Blog Image Audit Report - Comprehensive Summary
**Date:** February 11, 2026  
**Total Blog Posts:** 158  
**Audit Score:** 42% (66/158 blogs have valid images)

---

## Executive Summary

Out of 158 blog posts analyzed:
- **66 blogs** (42%) have valid SVG images ✅
- **92 blogs** (58%) need image fixes 🚨
  - **86 blogs** with missing/broken images (Priority 1)
  - **6 blogs** with placeholder.webp (Priority 2)
  - **0 blogs** with non-SVG formats (Priority 3) ✅

**Critical Issues:**
1. 7 blogs missing `featuredImage` field in frontmatter
2. 1 blog using external Unsplash URL (will break)
3. Several blogs referencing `.jpg` images that don't exist

---

## Detailed Breakdown

### ✅ PRIORITY 0 - GOOD IMAGES (66 blogs)

These blogs already have valid SVG images in `/public/blog/`:

1. affordable-mbbs-maharashtra-under-50-lakhs.mdx → `/blog/affordable-mbbs-maharashtra.svg`
2. affordable-mbbs-under-50-lakhs-india-2026.mdx → `/blog/affordable-mbbs-under-50-lakhs.svg`
3. best-books-for-neet-2026-biology-physics-chemistry.mdx → `/blog/best-books-neet.svg`
4. best-neet-coaching-delhi-ncr-comparison.mdx → `/blog/neet-coaching-delhi.svg`
5. best-private-medical-colleges-maharashtra-2026.mdx → `/blog/private-medical-colleges-maharashtra.svg`
6. best-private-medical-colleges-up-low-fees-2026.mdx → `/blog/private-medical-colleges-up-low-fees.svg`
7. biomolecules-neet-biology-complete-guide.mdx → `/blog/biomolecules.svg`
8. body-fluids-circulation-neet.mdx → `/blog/circulation.svg`
9. breathing-gas-exchange-neet-notes.mdx → `/blog/respiration.svg`
10. career-options-after-12th-pcb-complete-guide.mdx → `/blog/career-options-pcb.svg`
11. cell-division-mitosis-meiosis-neet.mdx → `/blog/cell-division.svg`
12. cell-structure-function-neet-notes.mdx → `/blog/cell-biology.svg`
13. common-mistakes-neet-aspirants-avoid-2026.mdx → `/blog/common-mistakes.svg`
14. delhi-ncr-medical-colleges-review-sharda-santosh-sgt-hamdard-2026.mdx → `/blog/delhi-ncr-medical-colleges-review.svg`
15. do-or-die-chapters-neet-2026-biology.mdx → `/blog/do-or-die-chapters.svg`
16. dps-students-neet-preparation-guide.mdx → `/blog/dps-neet-guide.svg`
17. dy-patil-medical-college-pune-mumbai-kolhapur-comparison.mdx → `/blog/dy-patil-medical-college-comparison.svg`
18. excretory-system-neet-notes.mdx → `/blog/excretion.svg`
19. genetics-heredity-variation-neet.mdx → `/blog/genetics.svg`
20. how-to-crack-neet-in-6-months.mdx → `/blog/neet-6-months-strategy.svg`
21. how-to-score-700-plus-in-neet.mdx → `/blog/neet-700-plus-strategy.svg`
22. how-to-score-340-plus-in-neet-biology-expert-strategy.mdx → `/blog/human-physiology-neet-complete-guide-50-marks.svg` (CREATED TODAY)
23. human-digestion-absorption-neet.mdx → `/blog/digestion.svg`
24. human-physiology-neet-complete-notes.mdx → `/blog/human-physiology-notes.svg`
25. kota-vs-online-neet-coaching-2026.mdx → `/blog/kota-vs-online.svg`
26. last-6-months-neet-2026-preparation-strategy.mdx → `/blog/6-months-strategy.svg`
27. maharashtra-mbbs-counselling-dmer-guide-2026.mdx → `/blog/maharashtra-mbbs-counselling-dmer.svg`
28. management-nri-quota-mbbs-admission-guide-2026.mdx → `/blog/management-nri-quota-mbbs.svg`
29. medical-colleges-pune-complete-guide-2026.mdx → `/blog/medical-colleges-pune-guide.svg`
30. mock-test-strategy-neet-2026-complete-guide.mdx → `/blog/neet-mock-test-strategy-complete-guide.svg` (CREATED TODAY)
31. navi-mumbai-medical-colleges-comparison-2026.mdx → `/blog/navi-mumbai-medical-colleges.svg`
32. ncert-reading-strategy-neet-biology-2026.mdx → `/blog/ncert-strategy.svg`
33. neet-2026-complete-guide-exam-pattern-syllabus-dates.mdx → `/blog/neet-2026-guide.svg`
34. neet-2026-exam-pattern-changes.mdx → `/blog/neet-2026-exam-pattern-changes-explained.svg` (CREATED TODAY)
35. neet-2026-registration-guide-step-by-step.mdx → `/blog/neet-2026-registration-guide.svg` (CREATED TODAY)
36. neet-2026-syllabus-complete-guide-deleted-topics.mdx → `/blog/neet-syllabus-2026-deleted-topics.svg`
37. neet-400-500-marks-medical-colleges-maharashtra.mdx → `/blog/neet-400-500-colleges-maharashtra.svg`
38. neet-animal-kingdom-weightage-chapter-wise-analysis.mdx → `/blog/neet-animal-kingdom.svg`
39. neet-application-form-2026.mdx → `/blog/neet-application-form-2026.svg`
40. neet-biology-assertion-reason-questions-guide.mdx → `/blog/important-biology-diagrams-neet-complete-list.svg` (CREATED TODAY)
41. neet-biology-chapter-wise-weightage-2026.mdx → `/blog/biology-weightage.svg`
42. neet-biology-coaching-delhi-ncr-guide.mdx → `/blog/neet-biology-strategy.svg`
43. neet-biology-ecology-environment-neet-complete-guide.mdx → `/blog/neet-biology-ecology.svg`
44. neet-biology-evolution-complete-guide.mdx → `/blog/neet-biology-evolution.svg`
45. neet-biology-human-health-disease-complete-guide.mdx → `/blog/neet-biology-health-disease.svg`
46. neet-biology-improvement-strategies-expert-tips.mdx → `/blog/neet-biology-improvement.svg`
47. neet-biology-microorganisms-complete-guide.mdx → `/blog/neet-biology-microorganisms.svg`
48. neet-biology-plant-kingdom-complete-guide.mdx → `/blog/neet-biology-plant-kingdom.svg`
49. neet-biology-reproduction-organisms-complete-guide.mdx → `/blog/neet-biology-reproduction.svg`
50. neet-biology-structural-organisation-plants-animals.mdx → `/blog/neet-biology-structural-organisation.svg`
51. neet-coaching-delhi-ncr-comparison.mdx → `/blog/neet-coaching-delhi.svg`
52. neet-cutoff-2026.mdx → `/blog/neet-cutoff-2026.svg`
53. neet-dropper-repeater-complete-strategy-guide.mdx → `/blog/neet-dropper-repeater-complete-strategy-guide.svg` (CREATED TODAY)
54. neet-eligibility-2026.mdx → `/blog/neet-eligibility-2026.svg`
55. neet-exam-centres-2026.mdx → `/blog/neet-exam-centres-2026.svg`
56. neet-last-3-months-strategy-2026.mdx → `/blog/neet-last-3-months-strategy.svg`
57. neet-preparation-strategy-biology-focus.mdx → `/blog/neet-biology-strategy.svg`
58. neet-question-paper-pattern-analysis-2026.mdx → `/blog/neet-question-pattern.svg`
59. neet-rank-vs-marks-percentile-2026.mdx → `/blog/neet-rank-marks-percentile.svg`
60. neet-vs-jee-which-is-tougher.mdx → `/blog/neet-vs-jee.svg`
61. photosynthesis-neet-biology-complete-guide.mdx → `/blog/photosynthesis.svg`
62. plant-physiology-neet-complete-guide.mdx → `/blog/plant-physiology.svg`
63. top-10-neet-biology-coaching-delhi-ncr-2026.mdx → `/blog/top-10-biology-coaching.svg`
64. top-medical-colleges-india-2026-complete-guide.mdx → `/blog/top-medical-colleges-india.svg`
65. what-after-neet-alternate-career-paths.mdx → `/blog/what-after-neet-careers.svg`
66. why-cerebrum-biology-academy-best-delhi-ncr.mdx → `/blog/why-cerebrum-academy.svg`

---

## 🚨 PRIORITY 1 - MISSING IMAGES (86 blogs - CRITICAL)

These blogs reference images that don't exist. **HIGH PRIORITY - BREAKS PAGE LAYOUT**

### Group A: Missing Frontmatter (7 blogs)
**Action:** Add `featuredImage` field to MDX frontmatter

1. `biotechnology-neet-simplified-complete-guide.mdx`
   - **Missing:** `featuredImage` field
   - **Add:** `featuredImage: /blog/biotechnology-neet-simplified-complete-guide.svg`

2. `genetics-molecular-biology-neet-complete-guide.mdx`
   - **Missing:** `featuredImage` field
   - **Add:** `featuredImage: /blog/genetics-molecular-biology-neet-complete-guide.svg`

3. `important-biology-diagrams-neet-complete-list.mdx`
   - **Missing:** `featuredImage` field
   - **Add:** `featuredImage: /blog/important-biology-diagrams-neet-complete-list.svg`

4. `ncert-line-by-line-reading-strategy-neet.mdx`
   - **Missing:** `featuredImage` field
   - **Add:** `featuredImage: /blog/ncert-line-by-line-reading-strategy-neet.svg`

5. `neet-dropper-repeater-complete-strategy-guide.mdx`
   - **Missing:** `featuredImage` field
   - **Add:** `featuredImage: /blog/neet-dropper-repeater-complete-strategy-guide.svg`

6. `neet-mock-test-strategy-complete-guide.mdx`
   - **Missing:** `featuredImage` field
   - **Add:** `featuredImage: /blog/neet-mock-test-strategy-complete-guide.svg`

7. `stress-management-mental-health-neet-students.mdx`
   - **Missing:** `featuredImage` field
   - **Add:** `featuredImage: /blog/stress-management-mental-health-neet-students.svg`

### Group B: External URL (1 blog)
**Action:** Download image and host locally

8. `ultimate-neet-2026-guide-specialized-vs-mass-coaching.mdx`
   - **Current:** `https://images.unsplash.com/photo-1659353886114-9aa119aef5aa?w=1200&h=630&fit=crop&auto=format`
   - **Fix:** Download and save as `/blog/ultimate-neet-2026-guide-specialized-vs-mass-coaching.svg`

### Group C: Wrong Extension Referenced (78 blogs)
**Action:** Create SVG images OR update MDX to point to correct filename

#### Study Plans & Strategies (10 blogs)
9. `12-month-neet-dropper-study-plan-complete-guide.mdx`
   - **Missing:** `/blog/12-month-dropper-plan.svg`
   - **Should be:** `/blog/12-month-neet-dropper-study-plan-complete-guide.svg`

10. `5-month-neet-2026-study-plan-january-may.mdx`
    - **Missing:** `/blog/5-month-neet-study-plan.svg`
    - **Should be:** `/blog/5-month-neet-2026-study-plan-january-may.svg`

11. `neet-100-day-strategy-complete-guide-2026.mdx`
    - **Missing:** `/blog/neet-100-day-strategy.svg`
    - **Should be:** `/blog/neet-100-day-strategy-complete-guide-2026.svg`

12. `neet-4-month-study-plan-2026.mdx`
    - **Missing:** `/blog/neet-4-month-plan.svg`
    - **Should be:** `/blog/neet-4-month-study-plan-2026.svg`

13. `neet-drop-year-strategy-2026.mdx`
    - **Missing:** `/blog/neet-drop-year-strategy.svg`
    - **Should be:** `/blog/neet-drop-year-strategy-2026.svg`

14. `neet-dropper-daily-routine-timetable-2026.mdx`
    - **Missing:** `/blog/neet-dropper-routine.svg`
    - **Should be:** `/blog/neet-dropper-daily-routine-timetable-2026.svg`

15. `neet-dropper-year-complete-guide-2026.mdx`
    - **Missing:** `/blog/neet-dropper-guide.svg`
    - **Should be:** `/blog/neet-dropper-year-complete-guide-2026.svg`

16. `neet-dropper-batch-2026-online-coaching-guide.mdx`
    - **Missing:** `/blog/neet-dropper-batch-2026.svg`
    - **Should be:** `/blog/neet-dropper-batch-2026-online-coaching-guide.svg`

17. `revision-strategy-neet-2026-complete-guide.mdx`
    - **Missing:** `/blog/neet-revision-strategy.svg`
    - **Should be:** `/blog/revision-strategy-neet-2026-complete-guide.svg`

18. `time-management-neet-preparation-exam-day.mdx`
    - **Missing:** `/blog/neet-time-management.svg`
    - **Should be:** `/blog/time-management-neet-preparation-exam-day.svg`

#### Biology Topics (20 blogs)
19. `neet-biology-30-day-revision-plan.mdx`
    - **Missing:** `/blog/neet-30-day-revision.svg`
    - **Should be:** `/blog/neet-biology-30-day-revision-plan.svg`

20. `neet-biology-assertion-reason-diagram-questions-guide.mdx`
    - **Missing:** `/blog/assertion-reason-guide.svg`
    - **Should be:** `/blog/neet-biology-assertion-reason-diagram-questions-guide.svg`

21. `neet-biology-complete-chapter-wise-resource-hub.mdx`
    - **Missing:** `/blog/neet-biology-chapters.svg`
    - **Should be:** `/blog/neet-biology-complete-chapter-wise-resource-hub.svg`

22. `neet-biology-most-repeated-questions-analysis-2026.mdx`
    - **Missing:** `/blog/neet-biology-repeated-questions.svg`
    - **Should be:** `/blog/neet-biology-most-repeated-questions-analysis-2026.svg`

23. `neet-biology-notes-pdf-free-download-2026.mdx`
    - **Missing:** `/blog/neet-biology-notes-pdf.svg`
    - **Should be:** `/blog/neet-biology-notes-pdf-free-download-2026.svg`

24. `neet-biology-olympiad-preparation-guide.mdx`
    - **Missing:** `/blog/biology-olympiad.svg`
    - **Should be:** `/blog/neet-biology-olympiad-preparation-guide.svg`

25. `neet-biology-topper-handwritten-notes-2026.mdx`
    - **Missing:** `/blog/neet-topper-notes.svg`
    - **Should be:** `/blog/neet-biology-topper-handwritten-notes-2026.svg`

26. `ultimate-neet-biology-guide-2026.mdx`
    - **Missing:** `/blog/ultimate-neet-biology-guide.svg`
    - **Should be:** `/blog/ultimate-neet-biology-guide-2026.svg`

27. `genetics-for-neet-mendel-to-molecular-biology.mdx`
    - **Missing:** `/blog/genetics-mendel-molecular.svg`
    - **Should be:** `/blog/genetics-for-neet-mendel-to-molecular-biology.svg`

28. `human-reproduction-neet-notes-complete-guide.mdx`
    - **Missing:** `/blog/human-reproduction-neet.svg`
    - **Should be:** `/blog/human-reproduction-neet-notes-complete-guide.svg`

29. `photosynthesis-complete-neet-guide.mdx`
    - **Missing:** `/blog/photosynthesis-neet-guide.svg`
    - **Should be:** `/blog/photosynthesis-complete-neet-guide.svg`

30. `biology-diagram-practice-neet.mdx`
    - **References:** `/blog/neet-biology-guide.jpg` (doesn't exist)
    - **Should be:** `/blog/biology-diagram-practice-neet.svg`

31. `biology-mnemonics-neet-preparation.mdx`
    - **References:** `/blog/biology-mnemonics.jpg` (doesn't exist)
    - **Should be:** `/blog/biology-mnemonics-neet-preparation.svg`

32. `class-11-biology-neet-foundation-guide.mdx`
    - **References:** `/blog/neet-biology-guide.jpg` (doesn't exist)
    - **Should be:** `/blog/class-11-biology-neet-foundation-guide.svg`

33. `neet-biology-assertion-reason-questions-guide.mdx`
    - **References:** `/blog/neet-biology-guide.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-biology-assertion-reason-questions-guide.svg`

34. `neet-biology-chapter-wise-weightage-2026-advanced.mdx`
    - **References:** `/blog/neet-chapter-weightage.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-biology-chapter-wise-weightage-2026-advanced.svg`

35. `neet-biology-diagrams-practice-guide.mdx`
    - **References:** `/blog/neet-biology-diagrams.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-biology-diagrams-practice-guide.svg`

36. `neet-biology-human-physiology-complete-guide.mdx`
    - **References:** `/blog/human-physiology-neet.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-biology-human-physiology-complete-guide.svg`

37. `neet-biology-previous-year-questions-analysis.mdx`
    - **References:** `/blog/neet-pyq-analysis.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-biology-previous-year-questions-analysis.svg`

38. `neet-biology-pyq-analysis-2015-2025.mdx`
    - **References:** `/blog/neet-biology-guide.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-biology-pyq-analysis-2015-2025.svg`

39. `ncert-line-by-line-biology-neet-guide.mdx`
    - **References:** `/blog/neet-biology-guide.jpg` (doesn't exist)
    - **Should be:** `/blog/ncert-line-by-line-biology-neet-guide.svg`

#### NEET 2026 Analysis & Guides (15 blogs)
40. `neet-2026-biology-paper-analysis.mdx`
    - **Missing:** `/blog/neet-2026-analysis.svg`
    - **Should be:** `/blog/neet-2026-biology-paper-analysis.svg`

41. `neet-2026-biology-syllabus-complete-guide.mdx`
    - **Missing:** `/blog/neet-2026-syllabus.svg`
    - **Should be:** `/blog/neet-2026-biology-syllabus-complete-guide.svg`

42. `neet-2026-complete-preparation-guide-ai-optimized.mdx`
    - **Missing:** `/blog/neet-2026-preparation-guide.svg`
    - **Should be:** `/blog/neet-2026-complete-preparation-guide-ai-optimized.svg`

43. `neet-2026-difficulty-level-cutoff-prediction-analysis.mdx`
    - **Missing:** `/blog/neet-difficulty-prediction.svg`
    - **Should be:** `/blog/neet-2026-difficulty-level-cutoff-prediction-analysis.svg`

44. `neet-2026-exam-pattern-changes-explained.mdx`
    - **Missing:** `/blog/neet-2026-pattern-changes.svg`
    - **Should be:** `/blog/neet-2026-exam-pattern-changes-explained.svg`

45. `neet-2026-expected-questions-predictions.mdx`
    - **Missing:** `/blog/neet-expected-questions-2026.svg`
    - **Should be:** `/blog/neet-2026-expected-questions-predictions.svg`

46. `neet-2026-result-analysis-cutoff-trends.mdx`
    - **Missing:** `/blog/neet-2026-result-analysis.svg`
    - **Should be:** `/blog/neet-2026-result-analysis-cutoff-trends.svg`

47. `neet-2026-exam-pattern-changes.mdx`
    - **References:** `/blog/neet-2026-exam-pattern.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-2026-exam-pattern-changes.svg`

48. `neet-2026-preparation-timeline-class-12.mdx`
    - **References:** `/blog/neet-2026-timeline.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-2026-preparation-timeline-class-12.svg`

49. `neet-exam-day-tips-last-minute-guide-2026.mdx`
    - **Missing:** `/blog/neet-exam-day-tips.svg`
    - **Should be:** `/blog/neet-exam-day-tips-last-minute-guide-2026.svg`

50. `neet-negative-marking-strategy-when-to-guess-skip.mdx`
    - **Missing:** `/blog/neet-negative-marking.svg`
    - **Should be:** `/blog/neet-negative-marking-strategy-when-to-guess-skip.svg`

51. `neet-preparation-roadmap-class-9-10-students.mdx`
    - **Missing:** `/blog/neet-roadmap-class-9-10.svg`
    - **Should be:** `/blog/neet-preparation-roadmap-class-9-10-students.svg`

52. `most-important-topics-neet-physics-chemistry-biology.mdx`
    - **Missing:** `/blog/important-topics-neet.svg`
    - **Should be:** `/blog/most-important-topics-neet-physics-chemistry-biology.svg`

53. `mistakes-to-avoid-during-neet-preparation.mdx`
    - **Missing:** `/blog/mistakes-avoid-neet-preparation.svg`
    - **Should be:** `/blog/mistakes-to-avoid-during-neet-preparation.svg`

54. `cracking-the-code-of-neet-exam-success.mdx`
    - **Missing:** `/blog/cracking-neet-code.svg`
    - **Should be:** `/blog/cracking-the-code-of-neet-exam-success.svg`

#### Coaching & Preparation (12 blogs)
55. `best-neet-coaching-delhi-ncr-2026-comparison.mdx`
    - **References:** `/blog/best-neet-coaching-delhi.jpg` (doesn't exist)
    - **Should be:** `/blog/best-neet-coaching-delhi-ncr-2026-comparison.svg`

56. `neet-coaching-delhi-vs-kota-2026.mdx`
    - **References:** `/blog/delhi-vs-kota.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-coaching-delhi-vs-kota-2026.svg`

57. `online-vs-offline-neet-coaching-2026.mdx`
    - **References:** `/blog/online-vs-offline-coaching.jpg` (doesn't exist)
    - **Should be:** `/blog/online-vs-offline-neet-coaching-2026.svg`

58. `parents-guide-choosing-neet-coaching-delhi.mdx`
    - **References:** `/blog/parents-guide-neet-coaching.jpg` (doesn't exist)
    - **Should be:** `/blog/parents-guide-choosing-neet-coaching-delhi.svg`

59. `self-study-vs-coaching-neet-2026.mdx`
    - **Missing:** `/blog/self-study-vs-coaching.svg`
    - **Should be:** `/blog/self-study-vs-coaching-neet-2026.svg`

60. `small-batch-coaching-vs-large-batch-neet.mdx`
    - **Missing:** `/blog/small-batch-coaching.svg`
    - **Should be:** `/blog/small-batch-coaching-vs-large-batch-neet.svg`

61. `small-batch-neet-coaching-research-outcomes-2026.mdx`
    - **References:** `/blog/research-small-batch.jpg` (doesn't exist)
    - **Should be:** `/blog/small-batch-neet-coaching-research-outcomes-2026.svg`

62. `future-of-neet-coaching-india-2026-expert-analysis.mdx`
    - **References:** `/blog/future-neet-coaching.jpg` (doesn't exist)
    - **Should be:** `/blog/future-of-neet-coaching-india-2026-expert-analysis.svg`

63. `neet-preparation-tips-for-delhi-ncr-students.mdx`
    - **References:** `/blog/delhi-ncr-neet-prep.jpg` (doesn't exist)
    - **Should be:** `/blog/neet-preparation-tips-for-delhi-ncr-students.svg`

64. `best-ai-tools-apps-neet-preparation-2026.mdx`
    - **Missing:** `/blog/ai-tools-neet-prep.svg`
    - **Should be:** `/blog/best-ai-tools-apps-neet-preparation-2026.svg`

65. `allen-vs-aakash-vs-pw-comparison-2026.mdx`
    - **Missing:** `/blog/allen-aakash-pw-comparison.svg`
    - **Should be:** `/blog/allen-vs-aakash-vs-pw-comparison-2026.svg`

66. `how-to-score-340-plus-in-neet-biology-expert-strategy.mdx`
    - **References:** `/blog/score-340-biology.jpg` (doesn't exist)
    - **Should be:** `/blog/how-to-score-340-plus-in-neet-biology-expert-strategy.svg`

#### Score Improvement (8 blogs)
67. `how-to-improve-neet-score-400-to-600-strategy.mdx`
    - **Missing:** `/blog/neet-score-improvement.svg`
    - **Should be:** `/blog/how-to-improve-neet-score-400-to-600-strategy.svg`

68. `how-to-score-320-plus-neet-biology.mdx`
    - **Missing:** `/blog/score-320-neet-biology.svg`
    - **Should be:** `/blog/how-to-score-320-plus-neet-biology.svg`

69. `how-to-score-360-in-neet-biology.mdx`
    - **Missing:** `/blog/neet-360-strategy.svg`
    - **Should be:** `/blog/how-to-score-360-in-neet-biology.svg`

70. `how-to-score-600-plus-in-neet-2026.mdx`
    - **Missing:** `/blog/neet-600-plus-strategy.svg`
    - **Should be:** `/blog/how-to-score-600-plus-in-neet-2026.svg`

71. `how-to-avoid-silly-mistakes-neet-exam.mdx`
    - **Missing:** `/blog/avoid-silly-mistakes-neet.svg`
    - **Should be:** `/blog/how-to-avoid-silly-mistakes-neet-exam.svg`

72. `how-to-stay-motivated-during-neet-preparation.mdx`
    - **Missing:** `/blog/stay-motivated-neet.svg`
    - **Should be:** `/blog/how-to-stay-motivated-during-neet-preparation.svg`

73. `struggling-with-neet-preparation-mental-stress-guide.mdx`
    - **Missing:** `/blog/neet-mental-stress-guide.svg`
    - **Should be:** `/blog/struggling-with-neet-preparation-mental-stress-guide.svg`

74. `human-physiology-neet-complete-guide-50-marks.mdx`
    - **Missing:** `/blog/human-physiology-neet-guide.svg`
    - **Should be:** `/blog/human-physiology-neet-complete-guide-50-marks.svg`

#### Medical Colleges & Admissions (7 blogs)
75. `aiims-new-delhi-complete-guide-campus-life.mdx`
    - **Missing:** `/blog/aiims-delhi-campus-guide.svg`
    - **Should be:** `/blog/aiims-new-delhi-complete-guide-campus-life.svg`

76. `all-aiims-india-complete-guide-2026.mdx`
    - **Missing:** `/blog/all-aiims-india-guide.svg`
    - **Should be:** `/blog/all-aiims-india-complete-guide-2026.svg`

77. `roadmap-for-aiims-mbbs-seat-complete-guide.mdx`
    - **Missing:** `/blog/aiims-mbbs-roadmap.svg`
    - **Should be:** `/blog/roadmap-for-aiims-mbbs-seat-complete-guide.svg`

78. `usabo-ibo-complete-parent-guide-grade-wise-preparation.mdx`
    - **Missing:** `/blog/usabo-ibo-guide.svg`
    - **Should be:** `/blog/usabo-ibo-complete-parent-guide-grade-wise-preparation.svg`

79. `online-career-counselling-neet-aspirants-guide.mdx`
    - **Missing:** `/blog/career-counselling-neet.svg`
    - **Should be:** `/blog/online-career-counselling-neet-aspirants-guide.svg`

80. `parents-guide-supporting-neet-aspirant-2026.mdx`
    - **Missing:** `/blog/parents-guide-neet.svg`
    - **Should be:** `/blog/parents-guide-supporting-neet-aspirant-2026.svg`

81. `cbse-biology-board-exam-preparation-2026.mdx`
    - **Missing:** `/blog/cbse-biology-board.svg`
    - **Should be:** `/blog/cbse-biology-board-exam-preparation-2026.svg`

#### Class 11/12 Foundation (5 blogs)
82. `class-11-biology-neet-foundation-strategy.mdx`
    - **Missing:** `/blog/class-11-foundation.svg`
    - **Should be:** `/blog/class-11-biology-neet-foundation-strategy.svg`

83. `class-12-biology-board-neet-dual-preparation.mdx`
    - **Missing:** `/blog/class-12-board-neet.svg`
    - **Should be:** `/blog/class-12-biology-board-neet-dual-preparation.svg`

#### Dropper Mental Health (3 blogs)
84. `dropper-batch-vs-regular-batch-comparison.mdx`
    - **Missing:** `/blog/dropper-vs-regular-batch.svg`
    - **Should be:** `/blog/dropper-batch-vs-regular-batch-comparison.svg`

85. `dropper-case-studies-480-to-650-score-improvement.mdx`
    - **Missing:** `/blog/dropper-case-studies.svg`
    - **Should be:** `/blog/dropper-case-studies-480-to-650-score-improvement.svg`

86. `dropper-mental-health-guide-handling-pressure-motivation.mdx`
    - **Missing:** `/blog/dropper-mental-health.svg`
    - **Should be:** `/blog/dropper-mental-health-guide-handling-pressure-motivation.svg`

---

## 🟡 PRIORITY 2 - PLACEHOLDER IMAGES (6 blogs)

These blogs use `placeholder.webp` - need real images:

1. `class-11-biology-neet-complete-foundation.mdx`
   - **Current:** `/blog/placeholder.webp`
   - **Should be:** `/blog/class-11-biology-neet-complete-foundation.svg`

2. `neet-2026-month-by-month-roadmap-complete.mdx`
   - **Current:** `/blog/placeholder.webp`
   - **Should be:** `/blog/neet-2026-month-by-month-roadmap-complete.svg`

3. `neet-biology-mcq-practice-guide-1000-questions.mdx`
   - **Current:** `/blog/placeholder.webp`
   - **Should be:** `/blog/neet-biology-mcq-practice-guide-1000-questions.svg`

4. `student-case-study-class-11-early-start-neet-success.mdx`
   - **Current:** `/blog/placeholder.webp`
   - **Should be:** `/blog/student-case-study-class-11-early-start-neet-success.svg`

5. `student-case-study-dropper-480-to-650-neet.mdx`
   - **Current:** `/blog/placeholder.webp`
   - **Should be:** `/blog/student-case-study-dropper-480-to-650-neet.svg`

6. `student-case-study-online-offline-hybrid-neet.mdx`
   - **Current:** `/blog/placeholder.webp`
   - **Should be:** `/blog/student-case-study-online-offline-hybrid-neet.svg`

---

## ✅ PRIORITY 3 - NON-SVG FORMATS (0 blogs)

**All existing images are in SVG format!** No conversions needed.

---

## Recommended Action Plan

### IMMEDIATE (This Week)
1. **Fix 7 blogs missing frontmatter** - Add `featuredImage` field (5 min task)
2. **Create 6 placeholder replacements** - Top priority blogs using placeholder.webp
3. **Fix 10 most-viewed blogs** - Check Google Analytics, create images for top traffic blogs

### SHORT-TERM (Next 2 Weeks)
1. **Batch create 30 study plan images** (Group: Study Plans & Strategies)
2. **Batch create 20 biology topic images** (Group: Biology Topics)
3. **Batch create 15 NEET 2026 images** (Group: NEET 2026 Analysis)

### MEDIUM-TERM (Next Month)
1. **Batch create remaining 21 images** (Coaching, Colleges, Misc)
2. **Audit all image quality** - Ensure consistent style/branding
3. **Update MDX files** - Point to correct filenames

---

## Image Naming Convention

**Standard format:** `{blog-slug}.svg`

**Examples:**
- `12-month-neet-dropper-study-plan-complete-guide.mdx` → `12-month-neet-dropper-study-plan-complete-guide.svg`
- `neet-2026-exam-pattern-changes.mdx` → `neet-2026-exam-pattern-changes.svg`

**Benefits:**
- No confusion about which image belongs to which blog
- Easy to find and replace
- Consistent with existing pattern

---

## Files Generated

1. **This report:** `/Users/drshekhar/cerebrum-biology-academy-website/BLOG_IMAGE_AUDIT_SUMMARY.md`
2. **JSON data:** `/Users/drshekhar/cerebrum-biology-academy-website/blog-image-audit-report.json`
3. **CSV export:** `/Users/drshekhar/cerebrum-biology-academy-website/blog-image-audit-report.csv`
4. **Audit script:** `/Users/drshekhar/cerebrum-biology-academy-website/audit-blog-images.js`

---

## Next Steps

1. **Review this report** and prioritize which blogs need images first
2. **Design 92 new SVG images** using Figma/AI image generator
3. **Update MDX frontmatter** for 7 blogs missing `featuredImage`
4. **Run audit script again** after fixes: `node audit-blog-images.js`
5. **Update launch readiness score** in `LAUNCH_READINESS_AUDIT_2026.md`

---

**Audit completed:** February 11, 2026  
**Script location:** `/Users/drshekhar/cerebrum-biology-academy-website/audit-blog-images.js`  
**Re-run anytime:** `node audit-blog-images.js`
