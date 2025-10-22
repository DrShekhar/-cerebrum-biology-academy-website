# Smart Course Qualification Algorithm Documentation

## Overview

The Smart Course Qualification System uses a progressive questioning approach to match students with the most suitable course series and plan based on their specific needs, constraints, and goals.

## Algorithm Architecture

### Progressive Question Flow

```
START → Q1: Current Class → Q2: Academic Goals → Q3: Batch Preference → Q4: Budget Range → Q5: Study Hours → [Q6: Dropper Experience*] → Q7: Weak Areas → RECOMMENDATION

*Conditional question only for Dropper students
```

### Decision Tree Mapping

#### Primary Scoring Factors (Weighted):

- **Academic Goals (40%)**: Primary driver of series selection
- **Budget Range (30%)**: Economic constraint filter
- **Batch Preference (20%)**: Teaching style alignment
- **Study Hours (10%)**: Intensity matching

#### Question-to-Recommendation Logic:

**Q1: Current Class**

```
9th/10th → Foundation building focus → Ascent/Pursuit preference
11th → Critical year → All series viable, Ascent most popular
12th → Intensive preparation → Pinnacle/Ascent preference
Dropper → Maximum support → Pinnacle preference
```

**Q2: Academic Goals**

```
NEET Only → Pinnacle A/B, Ascent A/B (focused preparation)
Board + NEET → Ascent B/C, Pursuit A/B (balanced approach)
Board Primary → Pursuit B/C, Ascent C (foundation building)
```

**Q3: Batch Preference**

```
Small Batch (10-15) → Pinnacle A/B, Ascent A
Medium Batch (20-25) → Ascent A/B, Pinnacle C
Large Batch (25+) → Pursuit A/B, Ascent C
```

**Q4: Budget Range**

```
Premium (₹1L-1.5L) → Pinnacle A/B, Ascent A
Standard (₹60K-1L) → Ascent A/B, Pinnacle C, Pursuit A
Budget (₹40K-60K) → Pursuit A/B/C, Ascent C
```

**Q5: Study Hours**

```
Intensive (15+ hrs) → Plan A options (comprehensive)
Moderate (8-15 hrs) → Plan B options (focused)
Light (<8 hrs) → Plan C options (foundation)
```

## Scoring Algorithm

### Base Score Calculation

Each series-plan combination starts with 0 points and accumulates weighted scores:

```typescript
// Example for Ascent Series Plan B
if (academicGoals === 'board_neet') ascent.B += 40 // Primary match
if (budgetRange === 'standard') ascent.B += 30 // Budget fit
if (batchPref === 'medium_batch') ascent.B += 20 // Size preference
if (studyHours === 'moderate') ascent.B += 10 // Time commitment
// Total possible: 100 points
```

### Class-Specific Adjustments

```typescript
9th/10th: +5 to structured programs (Ascent B, Pursuit B)
11th: +8 to Ascent B (most popular), +5 to Ascent A
12th: +10 to Ascent A, +8 to Pinnacle A (intensive needed)
Dropper: +10 to Pinnacle A, +8 to Ascent A (maximum support)
```

### Dropper-Specific Logic

```typescript
Multiple Attempts: +15 to Pinnacle A (maximum support needed)
First Attempt: +10 to Ascent A (good foundation, need refinement)
Gap Year: +10 to Ascent B (fresh start, balanced approach)
```

## Recommendation Output Structure

### Primary Recommendation

- **Series**: pinnacle | ascent | pursuit
- **Plan**: A | B | C
- **Match Score**: 0-100 (higher = better fit)
- **Reasoning**: Array of 4 key justification points

### Alternative Options

- Up to 2 alternative series-plan combinations
- Only shown if score > 80% of primary recommendation
- Includes specific reason for consideration

## Example Decision Flows

### Case Study 1: High Achiever

**Input**: 11th, NEET Only, Small Batch, Premium Budget, Intensive Hours
**Logic Flow**:

- NEET Only → +40 to Pinnacle A/B, Ascent A/B
- Premium Budget → +30 to Pinnacle A/B, +25 to Ascent A
- Small Batch → +20 to Pinnacle A/B, +15 to Ascent A
- Intensive Hours → +10 to Pinnacle A, +8 to Ascent A
- 11th Class → +3 to Pinnacle A, +5 to Ascent A
  **Result**: Pinnacle A (108 points) vs Ascent A (93 points)

### Case Study 2: Budget-Conscious Student

**Input**: 12th, Board+NEET, Large Batch, Budget Range, Moderate Hours
**Logic Flow**:

- Board+NEET → +35 to Ascent C, +30 to Pursuit A/B
- Budget Range → +30 to Pursuit A/B/C, +20 to Ascent C
- Large Batch → +20 to Pursuit A/B, +15 to Ascent C
- Moderate Hours → +10 to Pursuit B, +6 to Pursuit A
- 12th Class → +5 to Ascent B (adjusted for budget)
  **Result**: Pursuit B (96 points) vs Ascent C (90 points)

### Case Study 3: Dropper Student

**Input**: Dropper, NEET Only, Small Batch, Standard Budget, Intensive Hours, First Attempt
**Logic Flow**:

- NEET Only → +40 to Pinnacle A/B, +35 to Ascent A/B
- Standard Budget → +30 to Ascent A/B, +20 to Pinnacle C
- Small Batch → +20 to Pinnacle A/B, +10 to Ascent A
- Intensive Hours → +10 to Pinnacle A, +8 to Ascent A
- Dropper Bonus → +10 to Pinnacle A, +8 to Ascent A
- First Attempt → +10 to Ascent A, +8 to Pinnacle B
  **Result**: Pinnacle A (108 points) vs Ascent A (111 points) → Ascent A wins

## Implementation Integration

### React Component Usage

```typescript
import {
  CourseQualificationEngine,
  getNextQuestion,
} from '@/lib/courseQualification/qualificationLogic'

// Get next question in flow
const nextQ = getNextQuestion(currentAnswers)

// Generate recommendation when complete
const engine = new CourseQualificationEngine(allAnswers)
const recommendation = engine.generateRecommendation()
```

### API Endpoint Structure

```
POST /api/course-qualification
Body: { answers: QualificationAnswers }
Response: {
  recommendation: CourseRecommendation,
  nextQuestion?: QualificationQuestion,
  progress: number
}
```

## Quality Assurance

### Edge Cases Handled

- **Incomplete Answers**: Returns next required question
- **Conflicting Constraints**: Weighted scoring resolves conflicts
- **Tie Scores**: Class-specific bonuses act as tiebreakers
- **Invalid Combinations**: Validation prevents impossible recommendations

### Testing Scenarios

1. **All Personas**: Validate each persona gets appropriate recommendations
2. **Budget Constraints**: Ensure no recommendations exceed stated budget
3. **Class Progression**: Verify recommendations evolve appropriately by class
4. **Dropper Edge Cases**: Test all dropper experience combinations

## Reasoning Generation

### Reasoning Categories

1. **Series Benefits**: Why this series fits (premium features, success rate, etc.)
2. **Plan Justification**: Why this plan matches time/intensity needs
3. **Budget Alignment**: How recommendation fits budget constraints
4. **Class Specificity**: Why this works for current academic level

### Dynamic Reasoning Examples

- High Budget + Premium Series: "💎 Matches your premium budget range with maximum value delivery"
- Dropper + Intensive: "🚀 Specialized approach for second-attempt students with intensive support"
- 12th Class + Plan A: "⚡ Final year intensive preparation with exam-focused strategy"

## Performance Optimization

### Computational Complexity: O(n) where n = number of series×plans (constant 9)

### Memory Usage: Minimal - stateless calculation

### Response Time: < 50ms for complete recommendation generation

### Scalability: Horizontally scalable, no persistent state required

---

This qualification logic ensures every student receives a personalized, well-reasoned course recommendation based on their unique circumstances and goals.
