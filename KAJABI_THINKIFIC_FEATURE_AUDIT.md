# Kajabi + Thinkific Feature Audit — Cohorts, Course Creation, Advanced (Jul 6, 2026)

Kajabi = creator-commerce OS (marketing automation is its moat); Thinkific = learning-first course platform (assessments/prerequisites/groups are its moat). Compared vs `STUDENT_DASHBOARD_ROADMAP.md` (incl. §F groups + WA broadcast design), P2.5 (top-10 adds) and P2.6 (LearnWorlds adoptions: transcripts/chapters, auto certificates, video drop-off analytics, sequential unlock/drip, AI quiz-from-content, PWA push). §4 folds in LearnWorlds + PW/Allen/Khan course-creation patterns. Sources at bottom.

## 1. Feature Inventory (K = Kajabi better, T = Thinkific better, = tie)

### Course builder & content
- [=] Modular builder (modules→lessons), video/PDF/audio/quiz lesson types; both support live-session lesson types
- [T] Delivery modes: self-paced, drip, cohort-style, evergreen/expiring content — more controls, had cohorts years before Kajabi (2025)
- [K] AI outline/content generation ("Cofounder" assistant); AI video transcription, subtitles, AI dubbing/translation
- [T] AI quiz generator from text lessons

### Assessments
- [T] Clear winner: quiz + exam (Brillium) + survey + assignment (manual review gate); randomized banks, time limits, attempt limits, pass thresholds; auto-certificates on completion rules
- [K] Quizzes only; no lesson-level prerequisite enforcement (students can skip ahead)

### Learning paths / prerequisites
- [T] Complete-in-order enforcement, min-%-video-watched gates, pass-assessment-to-unlock — per lesson/section
- [K] Drip only (date/offset), no hard prerequisite controls

### Live & cohort delivery (deep-dive in §2)
- [K] Native Live Rooms (≤200 participants) inside the course — no Zoom needed
- [T] Live lessons via Zoom integration only
- [K] Cohort-Based Course editor: per-module drip by fixed calendar date (whole cohort in sync) + auto email on unlock
- [T] Groups: cohort org + reporting + bulk enrollment (strongest group ADMIN tooling)

### Communities & social
- [K] Community spaces w/ challenges, points, badges, leaderboards, event calendar; coaching portal (1:1/group, video calls, collaborative notes)
- [T] Spaces linked to courses (auto-invite on enroll); no community gamification

### Gamification
- [K] Community challenges/points/leaderboard; [T] none

### Mobile
- [=] Both: student app; branded white-label app at higher tiers; push notifications

### Analytics
- [T] Course engagement, progress reports, retention graphs, video metrics, custom dashboards, user-table filters, group-scoped reports + CSV
- [K] Revenue/funnel analytics stronger; learning analytics weaker

### Marketing automation & commerce (Kajabi's moat)
- [K] Visual flow builder w/ conditional branching; event triggers (purchase, module completed, "goes quiet") → email/offer/tag sequences; funnels, landing pages, email marketing, upsells all native
- [=] Checkout, subscriptions, bundles, coupons, affiliates on both

## 2. Cohort/Batch Deep-Dive vs Our §F Groups Design

### What the leaders do
| Mechanic | Kajabi | Thinkific |
|---|---|---|
| Cohort entity | Cohort-Based Course (offer-scoped) | Group (org-wide label) |
| Drip | Per-module: fixed calendar date (cohort-synced) OR days-after-access | Drip schedule per course; enrollment expiry dates |
| Enrollment | Offer purchase/grant windows | CSV bulk import w/ `Group_names` column; bulk enroll/unenroll to courses; group sign-up links |
| Cohort community | Space per cohort + event calendar view | Space linked to course (auto-invite) |
| Live per cohort | Live Rooms sessions on the cohort calendar | Zoom lessons scheduled per course |
| Group analytics | Weak | Group progress report: per-member % complete, started/completed/activated/expiry dates, CSV export |
| Delegated visibility | — | **Group Analyst role**: third party sees ONLY their group's progress |
| Release comms | Auto email on module unlock | Manual (parallel email campaign) |
| Waitlists | Via forms/funnels, not native | Not native |

### §F design review — solid core, missing 6 things (all additive)
1. **Batch dates**: `student_groups.startDate DATE?, endDate DATE?` — enables cohort-relative logic; endDate doubles as access expiry.
2. **Cohort drip**: `group_content.releaseAt TIMESTAMP?` + `dayOffset INT?` (days after group.startDate). Student gates filter `releaseAt <= now()`. Kajabi's cohort-sync drip; supersedes per-student drip for live batches.
3. **Sessions belong to batches**: `class_sessions.groupId TEXT?` — live schedule, attendance, recordings inherit batch scope; `api/student/sessions` adds a membership OR-branch (mirrors §F materials-gate branch).
4. **Group-scoped notices**: `notices.groupId TEXT?` → NoticeBoard + WA broadcast composer target a batch, not all-parents.
5. **Batch progress report**: `GET /api/admin/groups/[id]/progress` — per member: % content consumed, tests taken/avg, attendance, last-active + CSV. Thinkific's most-used group feature; counselor/teacher scope = Group Analyst analog (no new role).
6. **Bulk membership**: CSV/paste import + multi-select in /admin/groups; `duplicate group` action for next batch cycle.

Skip: native waitlists (CRM lead pipeline IS our waitlist), group sign-up links (admissions counselor-mediated), per-cohort community feed beyond notices (forum exists; revisit post-launch).

## 3. Recommendations (S ≤1 day, M 2-4 days, L 1-2 wks)

**Already covered — don't re-plan**: at-risk "goes quiet" triggers (P2.5), auto-certificates + prerequisites + AI quiz gen + push (P2.6), parent fan-out (§F broadcast), leaderboard (P2.5 league).

1. **§F schema additions before building groups** — S. The 3 columns + 2 nullable FKs from §2 into the §F SQL script NOW — near-zero cost pre-build, expensive retrofit.
2. **Batch progress report + CSV** — M. Highest-leverage staff feature of this audit; reuses admin-KPI + parent-dashboard aggregations.
3. **Cohort drip via group_content.releaseAt** — S/M once #1 lands. Fold into P2.6 sequential-unlock as its live-batch variant — ONE drip mechanism (see §4.9).
4. **Batch-scoped sessions + notices** — M. Makes §F groups the spine of daily ops, not just content ACLs.
5. **Learning-event automations into CRM** — M. Kajabi's flow-builder pattern on our rails: mock completion / score jump → parent WA congrats + counselor note; trial student finishing demo content → HOT lead task. Extends P2.5 at-risk cron into positive + negative triggers.
6. **Bulk membership import + group duplicate** — S/M. Admin QoL; do with /admin/groups build.

**Skip deliberately**: Live Rooms (Zoom + recordings pipeline planned), visual funnel builder (CRM + crons cover), coaching portal, memberships/podcasts, Brillium-style external exams (CBT stronger), community gamification (ours exceeds it).

## 4. COURSE CREATION Deep-Dive (Kajabi, Thinkific, LearnWorlds + NEET-market patterns)

### 4.1 Builder UX (curriculum/outline editor)
- **Thinkific**: chapters→lessons tree, full drag-drop reordering; 6 starter templates (blank, mini-course, flagship, pre-sell); per-lesson draft checkboxes — best ergonomics
- **Kajabi**: modules→lessons; page-level display templates (Premier/Momentum) + template store; AI generates outline from topic
- **LearnWorlds**: sections→learning activities (richest activity palette); Course Manager hub for cross-course ops
- **PW/Allen**: no exposed builders — content-ops teams + the fixed NCERT syllabus IS the template. **Khan**: content keys into a skill/mastery taxonomy, not freeform courses — the pattern worth copying (§4.9 #7, §5.3)

### 4.2 Content types at authoring
- **LearnWorlds** (widest): video, interactive ebook, PDF, audio, SCORM/HTML5, LTI/H5P, live-session placeholder, survey, social activity
- **Thinkific**: video, audio, PDF, quiz/exam/survey/assignment, Google Docs embed, Zoom live lesson, downloads, evergreen/expiring
- **Kajabi**: video (Wistia-hosted), audio/podcast, PDF/downloads, assessments, Live Room lesson, coaching sessions

### 4.3 Authoring workflow (draft/preview/publish, versioning, cloning, roles)
- Draft→preview→publish on all three; Thinkific per-lesson draft flags; LearnWorlds course-level Draft + Access-tab status
- **Clone course**: all three (copy lands as Draft = "last term's course as template"). LearnWorlds goes further: **Clone & SYNC** — cloned sections stay linked to source, edits propagate
- Co-instructors: Thinkific ≤10 instructors w/ revenue share; LearnWorlds instructor role accounts; Kajabi weakest (single-creator DNA)
- Versioning: NONE of them do real version history — industry-wide gap, don't copy

### 4.4 Bulk operations
- **Thinkific Content Uploader** (best-in-class): drag-drop 44 file types in bulk → auto-creates one lesson per file inside a chapter
- **Kajabi**: bulk upload ≤20 videos → auto-creates a module; **unified Media Library** — every asset uploaded once, tagged, reusable anywhere, sortable by last-used
- **LearnWorlds**: bulk content upload; file-naming conventions auto-create typed activities (`certificate_<title>` → cert activity)

### 4.5 Quiz/assessment authoring
- **LearnWorlds**: question bank + **XLS import via premade template** (closest analog to our JSON batch pipeline); AI question generation from lesson content
- **Thinkific**: quiz/exam/survey/assignment; randomized banks, attempt limits; AI quiz generator; Brillium for formal exams
- **Kajabi**: quizzes only, no banks — weakest
- Industry import formats: CSV→QTI (Canvas), GIFT (Moodle), Word converters; XLS/CSV template is the pragmatic standard

### 4.6 AI authoring
- **Kajabi Cofounder**: topic→outline→lesson drafts + landing/email copy; transcription, subtitles, AI dubbing
- **LearnWorlds AI**: 200+ instructional-design prompts, 38 functions; outline/lesson/quiz generation; video → subtitles/TOC/embedded questions
- **Thinkific**: AI quiz generator (narrower)
- For us: outline generators irrelevant (NEET syllabus fixed); AI QUIZ generation + AI video enrichment are the transferable pieces (P2.6 recs 1/5)

### 4.7 Drip/scheduling at authoring time
- Kajabi: per-module drip by fixed date (cohort-sync) or days-after-access, set inside builder; auto-email on unlock
- Thinkific: drip + prerequisite/min-watch gates per lesson at authoring
- LearnWorlds: drip + sequential-unlock completion rules per activity

### 4.8 Pricing/packaging attached to courses
- All three: course→offer/bundle/subscription/payment-plan at publish; Kajabi's offer system slickest (one course, many offers)
- Us: courses already carry pricing + fee-plans/coupons in admin — no gap worth chasing

### 4.9 OUR minimal ADMIN COURSE BUILDER (recommendation)
Current: courses = bare Prisma rows, NO authoring UI; content attaches via 4 independent tables (study_materials.courseId, video_lectures, class_sessions, assignments); no ordering/sections; uploaders exist (Material uploader CSRF bug = build item 3) but no curriculum view.

**Design call: ONE new table over existing content tables — do NOT migrate content into a new CMS.** study_materials + video_lectures already ARE the media library (Kajabi's best idea); missing is only the ordered tree arranging existing rows into a syllabus:

```sql
CREATE TABLE course_items (
  id TEXT PRIMARY KEY, "courseId" TEXT NOT NULL,
  "sectionTitle" TEXT NOT NULL,          -- flat label; tree = GROUP BY section, ORDER BY sortOrder
  "sortOrder" INT NOT NULL,
  "itemType" TEXT NOT NULL,              -- MATERIAL | VIDEO | TEST_TEMPLATE | ASSIGNMENT | LIVE_PLACEHOLDER | NCERT_CHAPTER_PRACTICE
  "refId" TEXT,                          -- FK into matching content table (null for placeholders)
  "isDraft" BOOLEAN DEFAULT true,
  "releaseAt" TIMESTAMP, "dayOffset" INT -- SAME drip semantics as §2 group_content; group assignment overrides course default
);
```

Feature set, priority order:
1. **Course CRUD UI** (`/admin/courses` over existing columns incl. class, pricing) — S
2. **Curriculum tree editor** (`/admin/courses/[id]/builder`): sections + drag-drop ordered items; "attach existing" pickers over study_materials/video_lectures/test-templates; draft flag per item; student course page renders tree w/ progress badges — M/L (core build)
3. **Clone course**: duplicate course row + course_items (refs SHARED, not copied — LearnWorlds Clone-&-Sync for free); lands as draft — S
4. **Bulk add**: multi-file upload → auto-create material/video rows + appended course_items (Thinkific pattern; CF + blob upload exist) — M
5. **XLS/CSV question import** → teacher review queue → MCQ bank (LearnWorlds template pattern; JSON batch seeding is precedent) — M
6. **Preview-as-student** (renders student course page via P0 demo-seed identity) — S/M
7. Skip: page-design templates, SCORM/LTI, outline AI, versioning, co-instructor revenue share

Access control unchanged: enrollment/tier/group gates keep working — course_items is presentation + ordering + drip only. LIVE_PLACEHOLDER renders next matching class_session (batch-scoped after §2.3).

## 5. ADVANCED FEATURES WORTH HAVING (judgment call, ranked — only what I'd actually build)

1. **Zoom attendance auto-tracking** — M. Zoom participant-report webhook → attendance rows keyed to class_sessions (which gain groupId in §2). Parent WA weekly report, batch progress report, and at-risk alerts ALL consume attendance; manual marking is the weakest link in that chain today. Highest system-wide payoff here.
2. **Lightweight anti-cheat for at-home CBT mocks** — S/M. Per-attempt question+option shuffle, fullscreen-exit/tab-blur counters logged to the attempt, impossible-speed flags surfaced in the AI Coach report + teacher view. Keeps batch ranks honest WITHOUT webcam proctoring (skip that: invasive, L effort, parent backlash, shared family devices).
3. **NCERT chapter taxonomy table** — M. Canonical `ncert_chapters` (class, unit, chapter, weightage) that MCQs (already carry ncertClass/chapter), video_lectures, materials, and mock topics key into. Infrastructure that multiplies existing plans: P2.5 mastery map, §4.9 builder pickers ("attach Chapter 12 practice"), content-gap detection ("no video for Ch. 7"), Khan-style prerequisite hints. Taxonomy-first beats course-first.
4. **Community Q&A with instructor-endorsed answers** — M. Forum exists (secured Jul 5) but floats free; scope threads to course/batch, add "Verified by faculty" badge + route unanswered >24h to a teacher queue. Converts doubt-solving from 1:1 WhatsApp (invisible, repeated) into a searchable asset — PW Saarthi's moat, async version.
5. **Owner revenue/LTV dashboard** — M. Batch fill rate, collections aging (fee-plans exist), per-course LTV, trial→paid conversion by source. All tables exist (enrollments, payments, leads); one aggregation endpoint + a page. CRM audits showed lead data exists but no owner-level money view.
6. **Activate the existing referral engine** — S/M. /api/referral is live (Mar-2026 audit) but has no student-facing loop: "refer a friend" dashboard card w/ WA share deep-link + coupon reward on conversion. Indian coaching admissions are referral-dominated; near-zero build.

**Skips, with reasons**: webcam proctoring (above); plagiarism detection (MCQ-centric, no essay volume); white-label B2B school licensing (real strategic option later — §F groups + batch progress report is exactly the seed infrastructure — but a business decision, not a build item now); accessibility overhaul as a project (instead enforce alt-text/contrast/keyboard rules inside new builder + dashboard work as it ships; P2.6 CF transcripts double as the biggest a11y win); Hindi AI dubbing (tempting via Kajabi pattern, but content strategy first).

## Sources
Kajabi: [product](https://www.kajabi.com/product), [online courses](https://www.kajabi.com/product/online-courses), [cohort drip blog](https://www.kajabi.com/blog/course-drip-by-date-cohort-programs), [drip docs](https://help.kajabi.com/en/articles/12695113-schedule-and-drip-content-in-courses), [cohort editor](https://help.kajabi.com/en/articles/12695120-customize-your-cohort-based-course), [bulk video upload](https://help.kajabi.com/en/articles/12695148-how-to-bulk-upload-videos-in-a-product), [Media Library](https://www.kajabi.com/blog/online-business-media-library), [import lesson/quiz](https://help.kajabi.com/hc/en-us/articles/8302882880283-How-to-Import-a-Course-Lesson-or-Quiz), [course templates](https://help.kajabi.com/hc/en-us/articles/360043671033-Customizing-Your-Course-Pages-With-Course-Templates), [Kajabi Evolved](https://www.courseplatformsreview.com/blog/kajabi-evolved/) · Thinkific: [courses](https://www.thinkific.com/features/courses/), [Course Builder](https://support.thinkific.com/hc/en-us/articles/360030371754-The-Thinkific-Course-Builder), [Content Uploader](https://support.thinkific.com/hc/en-us/articles/360030373034-Bulk-Importer), [Duplicating a Course](https://support.thinkific.com/hc/en-us/articles/360030372154-Duplicating-a-Course), [Groups](https://support.thinkific.com/hc/en-us/articles/360030350854-Groups), [bulk enroll](https://support.thinkific.com/hc/en-us/articles/360030351374-Bulk-Enroll-and-Unenroll-Students), [Group Analysts](https://support.thinkific.com/hc/en-us/articles/360030735853-Group-Analysts), [progress reports](https://support.thinkific.com/hc/en-us/articles/360030369974-Progress-Reports) · LearnWorlds: [clone course](https://support.learnworlds.com/support/solutions/articles/12000003638-how-to-duplicate-clone-a-course), [Clone & Sync](https://www.learnworlds.com/product/updates/content-clone-sync/), [bulk upload](https://support.learnworlds.com/support/solutions/articles/12000101758-how-to-bulk-upload-course-content), [creating courses + XLS import](https://support.learnworlds.com/support/solutions/articles/12000079954-general-overview-creating-courses), [AI](https://www.learnworlds.com/product/features/ai/) · Formats: [Canvas CSV→QTI](https://dl.sps.northwestern.edu/canvas/2021/06/add-quiz-questions-to-canvas-by-converting-csv-files-to-qti-zip-files/), [Moodle import](https://docs.moodle.org/501/en/Import_questions) · Comparisons: [Zapier](https://zapier.com/blog/thinkific-vs-kajabi/), [Learning Revolution](https://www.learningrevolution.net/kajabi-vs-thinkific/), [group.app](https://www.group.app/blog/thinkific-vs-kajabi-a-comprehensive-review/)
