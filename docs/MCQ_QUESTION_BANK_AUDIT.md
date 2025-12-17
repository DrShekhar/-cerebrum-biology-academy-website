# MCQ Question Bank Quality Audit Report

**Date:** December 17, 2025
**Auditor:** Claude Code
**Scope:** Full question bank quality assessment against NEET PYQ standards

---

## Executive Summary

| Metric                    | Value         | Status                      |
| ------------------------- | ------------- | --------------------------- |
| Total Questions           | 3,776         | ✅ Good volume              |
| PYQ Questions             | 1,518 (40.2%) | ✅ Strong PYQ coverage      |
| With Explanations         | 100%          | ✅ Excellent                |
| Verified                  | 100%          | ⚠️ May need re-verification |
| **Overall Quality Score** | **6.5/10**    | ⚠️ Needs improvement        |

---

## Critical Issues (Priority: HIGH)

### 1. Answer Distribution Imbalance ❌

**NEET Standard:** ~25% each for A, B, C, D

**Current Distribution:**
| Answer | Count | Percentage | Deviation |
|--------|-------|------------|-----------|
| A | 1,031 | 27.30% | +2.3% |
| B | 1,967 | **52.09%** | **+27.1%** |
| C | 668 | 17.69% | -7.3% |
| D | 84 | **2.22%** | **-22.8%** |

**Impact:** Students can exploit this pattern. Option B is correct >50% of the time, D is almost never correct.

**Breakdown by Type:**

- **PYQ Questions:** B=58%, C=26%, A=13%, D=3%
- **Non-PYQ Questions:** B=49%, A=37%, C=13%, D=2%

**Recommendation:** Redistribute answers to achieve 23-27% for each option.

---

### 2. Difficulty Distribution Imbalance ⚠️

**NEET Standard:** ~30% Easy, ~50% Medium, ~20% Hard

**Current Distribution:**
| Difficulty | Count | Percentage | Expected |
|------------|-------|------------|----------|
| EASY | 1,720 | 45.55% | ~30% |
| MEDIUM | 1,853 | 49.07% | ~50% |
| HARD | 203 | **5.38%** | ~20% |

**Impact:** Question bank lacks challenging questions for advanced practice.

**Recommendation:** Add 500+ HARD questions to reach 15-20% coverage.

---

### 3. Data Format Inconsistencies ❌

**26 questions have inconsistent data format:**

- Options stored as escaped JSON strings instead of arrays
- Correct answer stored as text ("Water") instead of letter ("B")

**Affected Question IDs:**

- cmhbi2k6g000cilyuqvzbc1g1
- cmhbi2k7g000dilyu18xuirjf
- cmhbi2k8d000eilyul60nd8ny
- (and 23 more)

**Impact:** May cause display/grading errors in the application.

**Recommendation:** Run migration script to normalize format.

---

### 4. Duplicate Questions ⚠️

**15+ questions with duplicates found:**
| Question | Duplicates |
|----------|------------|
| "AIDS is caused by:" | 4 copies |
| "Restriction enzymes are also called:" | 3 copies |
| "The functional unit of kidney is:" | 3 copies |
| "BOD stands for:" | 3 copies |
| "Interferons are:" | 3 copies |

**Recommendation:** Deduplicate and merge statistics.

---

## Moderate Issues (Priority: MEDIUM)

### 5. Topic Misclassification

Some questions under "Genetics and Evolution" are actually "Human Health and Disease":

- Typhoid (Salmonella typhi)
- Common cold (Rhinovirus)
- Malaria (Plasmodium)
- Amoebiasis (Entamoeba)

**Recommendation:** Review and reclassify 50+ questions.

---

### 6. PYQ Year Distribution Uneven

| Year      | Count | Notes        |
| --------- | ----- | ------------ |
| 2024      | 8     | Very low     |
| 2023      | 20    | Low          |
| 2022      | 17    | Low          |
| 2021      | 10    | Very low     |
| 2020      | 847   | Bulk of PYQs |
| 2019      | 591   | Good         |
| 2018-2014 | 25    | Very sparse  |

**Recommendation:** Add more recent PYQs (2021-2024) for relevance.

---

### 7. Leading Answer Options

Many non-PYQ questions have obvious correct answers:

- "All of these: using CNG, catalytic converters, and maintaining vehicles properly"
- "Combination of awareness, legislation, technology, and lifestyle changes"

**Impact:** Students can identify correct answer without content knowledge.

**Recommendation:** Rewrite options to be equally plausible.

---

## Positive Findings ✅

### 1. Explanation Quality: GOOD

| Quality                | Count | Percentage |
| ---------------------- | ----- | ---------- |
| Medium (100-200 chars) | 2,561 | 68%        |
| Good (200-400 chars)   | 1,174 | 31%        |
| Short (<100 chars)     | 41    | 1%         |

Most explanations cite NCERT page numbers and provide adequate detail.

### 2. Topic Coverage: COMPREHENSIVE

| Topic                       | Count |
| --------------------------- | ----- |
| Human Physiology            | 577   |
| Ecology                     | 477   |
| Reproduction                | 436   |
| Diversity in Living World   | 425   |
| Plant Physiology            | 417   |
| Genetics and Evolution      | 373   |
| Biology and Human Welfare   | 339   |
| Structural Organisation     | 301   |
| Biotechnology               | 228   |
| Cell Structure and Function | 170   |

### 3. Answer Accuracy: VERIFIED

Spot-checked 50+ questions across topics:

- Cell biology answers: ✅ Accurate
- Genetics answers: ✅ Accurate
- Human physiology: ✅ Accurate
- Ecology concepts: ✅ Accurate

### 4. NCERT Alignment: GOOD

Most questions reference specific NCERT pages and chapters.

---

## Recommendations Summary

### Immediate Actions (Week 1)

1. **Fix format inconsistencies** - Run data migration for 26 questions
2. **Remove duplicates** - Deduplicate 15+ question sets
3. **Fix answer distribution** - Randomize existing questions

### Short-term Actions (Month 1)

4. **Add HARD questions** - Target 500+ new difficult questions
5. **Add recent PYQs** - Add 2021-2024 NEET questions
6. **Rewrite leading options** - Fix ~100 obvious answer patterns

### Long-term Actions (Quarter 1)

7. **Topic reclassification** - Audit and fix topic assignments
8. **Quality scoring** - Implement automated quality checks
9. **Answer redistribution** - Ensure 23-27% per option

---

## Data Migration Script Requirements

```sql
-- Fix format inconsistencies (to be run by developer)
-- 1. Parse escaped JSON options into proper arrays
-- 2. Convert text answers to letter format (A/B/C/D)
-- 3. Remove duplicate questions (keep highest totalAttempts)
```

---

## Conclusion

The question bank has **good foundational content** with comprehensive topic coverage and accurate answers. However, significant **statistical imbalances** (answer distribution, difficulty levels) and **data quality issues** (format, duplicates) need addressing before the platform can match true NEET PYQ quality standards.

**Priority:** Address the answer distribution bias immediately, as it's the most exploitable weakness that undermines the educational value of the platform.
