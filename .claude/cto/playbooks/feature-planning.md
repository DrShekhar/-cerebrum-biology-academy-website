# Feature Planning Playbook

Standard process for planning and scoping new features.

---

## 🎯 Planning Goals

1. **Clarity** - Everyone understands what we're building
2. **Scope** - Clear boundaries on what's included/excluded
3. **Feasibility** - Technical approach is sound
4. **Impact** - Understand user/business value

---

## 📋 Feature Planning Template

```markdown
# Feature: [Name]

## 1. Overview

**One-liner**: [What is this feature in one sentence?]
**Owner**: [Who is responsible?]
**Priority**: P0 / P1 / P2 / P3
**Target Date**: [When should this ship?]

## 2. Problem Statement

[What problem are we solving? Who has this problem?]

## 3. User Stories

As a [user type], I want to [action] so that [benefit].

- [ ] Story 1
- [ ] Story 2
- [ ] Story 3

## 4. Success Metrics

How will we measure if this feature is successful?

| Metric     | Current | Target |
| ---------- | ------- | ------ |
| [Metric 1] | X       | Y      |
| [Metric 2] | X       | Y      |

## 5. Scope

### In Scope (MVP)

- ✅ [Feature 1]
- ✅ [Feature 2]

### Out of Scope (Future)

- ❌ [Feature 3]
- ❌ [Feature 4]

## 6. Technical Approach

### Architecture

[High-level technical approach]

### Database Changes

[New tables, schema changes]

### API Endpoints

[New endpoints needed]

### UI Components

[New components/pages]

### Dependencies

[External services, libraries]

## 7. Risks & Mitigations

| Risk     | Impact       | Mitigation       |
| -------- | ------------ | ---------------- |
| [Risk 1] | High/Med/Low | [How to address] |

## 8. Timeline

| Phase    | Duration | Deliverable       |
| -------- | -------- | ----------------- |
| Design   | X days   | Figma mockups     |
| Backend  | X days   | API endpoints     |
| Frontend | X days   | UI implementation |
| Testing  | X days   | Test coverage     |
| Launch   | X days   | Production deploy |

## 9. Open Questions

- [ ] Question 1?
- [ ] Question 2?
```

---

## 🔍 Discovery Phase

Before planning, answer these questions:

### User Research

1. Who is the primary user?
2. What is their current pain point?
3. How are they solving this today?
4. What would delight them?

### Business Validation

1. How does this align with company goals?
2. What's the revenue/growth impact?
3. What's the opportunity cost?
4. Why now vs. later?

### Technical Feasibility

1. Is this possible with our current stack?
2. What dependencies exist?
3. Are there performance concerns?
4. What's the maintenance burden?

---

## 📊 Prioritization Framework

Use RICE scoring:

| Factor         | Description              | Scale              |
| -------------- | ------------------------ | ------------------ |
| **R**each      | How many users impacted? | 1-10               |
| **I**mpact     | How much value per user? | 0.25, 0.5, 1, 2, 3 |
| **C**onfidence | How sure are we?         | 50%, 80%, 100%     |
| **E**ffort     | Person-months to build   | Actual estimate    |

**RICE Score = (Reach × Impact × Confidence) / Effort**

### Priority Levels

- **P0**: Ship this week (critical bug, urgent feature)
- **P1**: Ship this month (important, scheduled)
- **P2**: Ship this quarter (nice to have)
- **P3**: Backlog (future consideration)

---

## 🏗️ Technical Scoping

### Estimation Guidelines

| Task Type           | Typical Duration |
| ------------------- | ---------------- |
| Simple CRUD         | 1-2 days         |
| Complex feature     | 3-5 days         |
| New integration     | 5-10 days        |
| Architecture change | 1-2 weeks        |

### Estimation Multipliers

- First time doing something: **1.5x**
- External dependencies: **1.5x**
- Unclear requirements: **2x**
- Multiple developers: **1.2x per person**

### Definition of Done

```
□ Code complete and reviewed
□ Tests written and passing
□ Documentation updated
□ Deployed to staging
□ QA verified
□ Metrics instrumented
□ Rolled out to production
□ Monitored for issues
```

---

## 📐 Design Considerations

### For Cerebrum Specifically

| Pattern           | Usage                         |
| ----------------- | ----------------------------- |
| Server Components | Static content, SEO pages     |
| Client Components | Interactive UI, forms         |
| API Routes        | Data mutations, external APIs |
| Server Actions    | Form submissions              |

### Mobile First

- Design for mobile viewport first
- Test on slow connections
- Ensure touch-friendly targets (44px min)

### Accessibility

- Keyboard navigable
- Screen reader compatible
- Color contrast compliant

---

## 🚀 Launch Checklist

### Pre-Launch

```
□ Feature flag enabled (if applicable)
□ Staging tested thoroughly
□ Performance benchmarked
□ Error monitoring in place
□ Rollback plan documented
□ Support team briefed
```

### Launch Day

```
□ Deploy during low-traffic window
□ Monitor error rates closely
□ Check key metrics
□ Be available for quick fixes
```

### Post-Launch

```
□ Analyze success metrics
□ Gather user feedback
□ Document learnings
□ Plan iterations
```

---

## 📝 Example: AI Doubt Solver Feature

```markdown
# Feature: AI Doubt Solver

## 1. Overview

**One-liner**: Let students get instant biology doubt resolution using AI
**Owner**: CTO
**Priority**: P1
**Target Date**: February 2026

## 2. Problem Statement

Students have doubts while studying at night when teachers aren't available.
Currently they wait until next class or use generic AI (not NEET-focused).

## 3. User Stories

- As a student, I want to ask biology doubts and get instant answers
- As a student, I want answers with NCERT references
- As a student, I want to see similar questions for practice

## 4. Success Metrics

| Metric                | Current  | Target     |
| --------------------- | -------- | ---------- |
| Doubt resolution time | 24 hours | < 1 minute |
| Student satisfaction  | N/A      | > 4.5/5    |
| Daily active users    | 0        | 500        |

## 5. Scope

### In Scope (MVP)

- ✅ Text-based doubt asking
- ✅ AI-generated answer with NCERT citations
- ✅ Follow-up questions
- ✅ History of past doubts

### Out of Scope (Future)

- ❌ Image-based questions
- ❌ Voice input
- ❌ Live teacher escalation
- ❌ Diagram generation

## 6. Technical Approach

- Use Claude API for answer generation
- Store doubt history in Supabase
- RAG with NCERT content for citations
- Rate limit: 10 doubts/day for free users
```
