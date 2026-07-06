# LearnWorlds Course-Feature Audit vs Our Stack (Jul 6, 2026)

LearnWorlds = all-in-one course-commerce LMS (15,000+ academies). Audited against `STUDENT_DASHBOARD_ROADMAP.md` inventory + planned **P2.5** (8 net-new items from `LMS_BEST_FEATURES_RESEARCH.md` top-10: mistake notebook, post-mock analysis v2, streak freeze + league, rank predictor, adaptive daily challenge, at-risk alerts, NCERT mastery map, ARIA photo doubts; parent WA report + recordings pipeline were already §F / build items 1-2). Sources at bottom.

## 1. LearnWorlds Feature Inventory

### Course builder & content types
- Drag-and-drop course builder: sections → lessons → activities of mixed types
- Content types: video, interactive ebook (text+media+interactivity units), PDF/downloadables, SCORM/HTML5 packages, LTI activities (H5P etc.), live sessions, surveys, social activities
- AI-assisted authoring: edit-in-place content editor, ebook polish, marketing copy

### Interactive video (their standout)
- In-video questions at timestamps (MCQ + open-ended); video pauses until answered
- Auto-extracted transcripts + AI-generated/translated subtitles + video summaries
- Auto table-of-contents / chapters inside the player
- Branching video paths (answer determines next segment)
- Video analytics: drop-off points, engagement hotspots, rewatch heatmaps

### Assessments & question banks
- Quiz/exam builder: graded exams w/ time limits, self-assessments, randomized pools
- AI question generation FROM lesson content (auto-quiz a lesson)
- Assignments with instructor review; survey builder for feedback

### Certificates
- Auto-issued completion certificates, fully branded, digitally verifiable

### Drip & scheduling
- Drip-feed content on a schedule (release module N on day X / after enrollment + N days)

### Learning paths & prerequisites
- Sequential navigation (must finish activity A before B unlocks)
- Prerequisite completion rules per activity/course; Learning Paths across courses; Learning Collections (free-order curated sets)

### Communities & social
- Community Spaces: private social-network feed, member profiles, moderation
- Per-course discussions; posts/comments tied to lessons

### Gamification
- Badges on milestones, leaderboards, points — lightweight vs Duolingo-class

### Mobile app
- White-label branded iOS/Android app builder; offline-friendly consumption; push notifications (new lesson, live session reminders) — big completion-rate lever

### Analytics & reports
- Course insights: enrollments, completion %, per-activity progress funnels
- User segments: group learners by behavior/performance/enrollment status; act on segments (email, offers)
- Video analytics (above); scheduled email reports; read-only "reporter" admin role
- AI Insights Hub: natural-language questions about academy data → instant charts

### AI features (2025)
- AI Course Creator: outline → sections → lessons → activities from a topic prompt (200+ instructional-design prompts, 38 functions)
- AI quiz generation, AI video interactivity (subtitles, TOC, embedded questions), AI-driven personalized paths based on performance, AI feedback drafts

### Site/page builder & commerce
- Website + popup builder, full white-label; checkout, bundles, subscriptions, installments, coupons/auto-offers, bulk licensing, affiliate program

## 2. Worth Stealing? — vs Our Stack

| LearnWorlds capability | Us | Notes (roadmap §) |
|---|---|---|
| In-video questions | HAVE | SecureVideoPlayer in-video quiz (§A) |
| Video transcripts/chapters/subtitles | MISSING | Cloudflare Stream supports auto-captions — unexploited |
| Branching video | MISSING | Skip — authoring cost >> NEET value |
| Video drop-off analytics | PARTIAL | video_progress rows exist; no teacher-facing view |
| Quiz/exam engine + banks | HAVE (stronger) | CBT + 10k MCQ bank beats their generic engine |
| AI question generation from content | MISSING | We hand-authored 10k Qs; useful for teachers on NEW material |
| Assignments w/ review | HAVE/PARTIAL | Full loop on assignments; worksheet/test feedback gaps = build item 4 |
| Completion certificates | PARTIAL | Cert blob pattern exists (§E); no auto-issue on course/test completion |
| Drip content | MISSING | Cohort-based live batches partly substitute; still useful for self-paced courses |
| Prerequisites / sequential unlock | MISSING | No gating; NCERT mastery map (P2.5) is the softer NEET-appropriate version |
| Learning paths across courses | PARTIAL | enrollments + courses exist; no cross-course sequencing |
| Community spaces / discussions | PARTIAL | Forum exists (secured Jul 5) but not wired into course/dashboard experience |
| Badges/leaderboards/points | HAVE + P2.5 | XP/badges/goals live; league = P2.5 |
| Branded mobile app + push | MISSING | Responsive web only; no push notifications at all |
| Course insights (completion funnels) | PARTIAL | Admin KPIs + analytics exist; no per-course activity funnel |
| User segments (behavior grouping) | PARTIAL | §F groups = manual; no behavior-based segments; at-risk alerts (P2.5) covers the #1 use case |
| Scheduled reports / reporter role | MISSING | Parent WA report (§F) covers parents; no admin/teacher scheduled reports |
| AI Insights (NL analytics chat) | MISSING | Nice-to-have; Anthropic API in place if ever wanted |
| AI course creator | MISSING | Skip — our content moat is expert-authored |
| Drip emails/popups/affiliates/bundles | HAVE-ish | Razorpay + fee-plans/coupons + tiers cover commerce needs |
| SCORM/LTI | MISSING | Skip — irrelevant to a single-academy stack |

## 3. Recommendations (S ≤1 day, M 2-4 days, L 1-2 wks)

**Already covered — do NOT re-plan** (P0-P2.5 items subsume the LearnWorlds equivalent): progress dashboards (P0/P1), leaderboard (P2.5 league), AI personalization (P2.5 adaptive challenge + mistake notebook), at-risk segments' top use case (P2.5 alerts), parent reporting (§F WA report), recordings (build items 1-2).

Net-new, worth adopting, in priority order:

1. **Video transcripts + chapters via Cloudflare Stream auto-captions** — S/M. Enable CF caption generation on upload, render transcript + clickable chapter TOC in `/learn/[lectureId]`. Their flagship differentiator, nearly free for us since CF Stream ships it; also aids low-bandwidth revision and English-second-language students.
2. **Auto completion certificates** — S/M. Auto-issue branded certificate on course completion / mock-series milestones using the existing certificate blob pattern; verifiable URL. High parent-visible value, shareable (organic marketing), trivially built on what exists.
3. **Teacher-facing video engagement analytics** — M. Aggregate existing video_progress into per-lecture drop-off/completion charts on the teacher/admin side; pairs with recordings pipeline (P3). Tells faculty which lecture segments lose students.
4. **Sequential unlock / drip for self-paced courses** — M. Optional `unlockAfter` (prerequisite lesson or day-offset) on course items, enforced in the student video/materials gates. Enables selling self-paced recorded courses (dropper revision packs) — a revenue line LearnWorlds academies live on.
5. **AI quiz-from-content for teachers** — M. Teacher pastes/uploads lesson notes → Anthropic API drafts MCQs into a review queue (never straight to students). Speeds weekly-test authoring; keeps expert-in-the-loop quality.
6. **Web push notifications (PWA)** — M/L. Class-starting, homework-due, streak-about-to-break pushes. LearnWorlds' single biggest completion-rate lever we lack; do after P2.5 (WhatsApp covers parents; push targets students).
7. **Per-course completion funnel in admin** — M. Enrollment → first video → 50% → completed funnel per course from existing tables. Defer until self-paced courses exist (rec 4).

**Skip deliberately**: branching video, SCORM/LTI, AI course creator, site-builder parity, NL analytics chat (revisit post-launch), native app builder (PWA push first — full app is L/XL and our audience is web+WhatsApp).

## Sources
[LearnWorlds features](https://www.learnworlds.com/features/) · [Flexible courses](https://www.learnworlds.com/product/features/flexible-courses/) · [AI features](https://www.learnworlds.com/product/features/ai/) · [AI course creator docs](https://www.learnworlds.com/docs/ai-course-creator/) · [Community explained](https://support.learnworlds.com/support/solutions/articles/12000105092-community-in-learnworlds-collections-spaces-and-course-discussions-explained) · [Learning Revolution review](https://www.learningrevolution.net/learnworlds-review/) · [teachng features review](https://teachng.com/reviews/learnworlds-features/) · [group.app review](https://www.group.app/blog/learnworlds/) · [Learning Light](https://www.learninglight.com/learnworlds/)
