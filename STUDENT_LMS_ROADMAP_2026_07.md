# Student LMS + Dashboard Roadmap — "study companion" vision

**Date:** Jul 8, 2026. Design mockup (north-star): the student-dashboard Artifact (score trajectory chart, chapter-mastery heatmap, test analysis, class reminders, attendance follow-up, library, mentor/support dock). Goal: a dashboard that **tells the student what to do next and makes progress feel inevitable** — not a stat page.

---

## ⛳ STATUS UPDATE — Jul 10 2026

- **P1 — Overview redesign: ✅ SHIPPED.** DashboardHero (emerald+amber): animated score ring
  (projected /360, count-up), streak/best/tests chips, SVG score-trajectory chart w/ 85% target line
  + personal-best dot, Today's-plan card, chapter-mastery grid; designed empty states; fixed the
  0/360-vs-540 bug. **Added Jul 10:** next-class card, attendance ring, library strip (the last
  mockup widgets).
- **P2 — Data depth: ✅ mostly.** Trajectory chart done; test-analysis = the CBT evaluation report
  (per-section marks/accuracy, per-topic strengths/focus, improvement plan). Chapter mastery: a
  dashboard grid + a full **/student/syllabus** mastery map from `user_question_responses` (Jul 10).
- **P3 — Resources & classes: ⚠️ partial.** Library strip + recorded classes surfaced; mentor-slot
  booking shipped. Class **reminders** (1d/1h/15m) still need a scheduled job + push/WhatsApp keys.
- **P4 — Gamification: ⚠️ partial.** Streak/XP/flashcards/wall-of-achievers exist; student
  leaderboard + daily-goal loop + milestone badges pending.
- **P5 — Communication: ✅ mostly.** "Raise a ticket / feature request" (student requests page →
  shared_tasks board) + mentor booking shipped. 
- **P6 — Attendance follow-up: ❌** needs the scheduled-job + WhatsApp/push keys (same as CRM
  automation).
- **Admin shared Task/Request board: ✅ LIVE** — `shared_tasks` model + `/admin/tasks` board +
  student create via `/api/tasks/shared`. Pending-until-resolved, any staff/student can add.
- **NEW Jul 10:** read-only "My Batch" cohort view (`/student/batch`) from student_groups (roster +
  shared content + notices).

## Design system (locked from the mockup)
Emerald brand accent (#17924f / dark #35d17f); amber = streak/XP energy; coral/teal/violet = semantic (weak / info-tests / feature). Green-biased neutrals; designed dark mode (green-black). System font, oversized tabular numbers for scores. Motion: one load sequence (ring fill + count-up + staggered reveal), hover lift, `prefers-reduced-motion` respected. Both themes token-level.

## Audit reality check (what already exists — don't rebuild)
Backend is ~70% there. Student surfaces already REAL (Jul 8 audit): dashboard perf from test_attempts, curriculum + drip, secure video (CF keys), ratings, complete toggle, tests/CBT engine, gradebook, mistakes book, AI tutor (Anthropic), certificates claim. So most of this roadmap is **UI elevation + wiring existing data**, plus a few genuinely-new features (reminders, shared task board, attendance follow-up automation).

## Build phases (student)
### P1 — Overview redesign (the mockup) — highest impact
Rebuild `src/app/student/dashboard` to the mockup: animated score ring (predicted Biology /360), streak+XP+rank chips, **score trajectory chart** (your score vs batch avg vs target line, milestone dots), **Today's plan** next-action card, stat strip w/ sparklines, **chapter mastery heatmap**, **last-test analysis** panel, next-class card, pending work, attendance ring, help dock, library strip. Graceful zero/empty states for new students (mockup shows a mid-prep student; real one starts empty). Fix the incoherent "0/360 vs target 540" (Biology target is /360, not the full-NEET 540).

### P2 — Data depth
- Marks/milestones history: real `test_attempts` over time → trajectory chart + milestone timeline (crossed 300, streak PB, beat-batch-avg).
- Chapter mastery: aggregate `user_question_responses` by topic → heatmap + full syllabus map page.
- Test analysis report: per-test breakdown (attempted/accuracy/time-per-Q, chapter-wise correct/wrong/skipped) — CBT/periodic/practice.

### P3 — Resources & classes
- Library hub: recorded classes (resume position), class PDFs/notes (chapter-wise), books/references (NCERT/Campbell), concept videos (by topic/difficulty). Data mostly in study_materials/video_lectures.
- Classes: upcoming + recorded + class PDF per session (class_sessions). **Reminders**: 1-day / 1-hour / 15-min before (needs a scheduled job + push/WhatsApp/email — env-gated). Show reminder cadence in UI (done in mockup).

### P4 — Engagement / gamification
Streak engine, XP + levels, batch rank/leaderboard (counselor_kpis pattern exists for staff; build student version), daily-goal loop, milestone badges.

### P5 — Communication
Chat with mentor (staff comms infra exists), support team, **raise a ticket**, **feature request** — feed the admin shared task board (below).

### P6 — Attendance follow-up (retention)
Attendance ring + missed-class detection → auto follow-up ("watch the recording"), absent reporting to counselor/parent (dovetails with CRM SLA/notify infra).

## NEW: Admin shared Task / Request board (user ask Jul 8)
A task list on the **admin panel** where **any staff OR student can add a task/request**; it stays **pending until resolved**.
- Model (additive): `shared_tasks` (id, title, detail, createdById, createdByRole STAFF|STUDENT, category [support|tech|fees|feature|academic|other], priority, status [OPEN|IN_PROGRESS|RESOLVED|WONT_DO], assignedToId?, resolvedById?, resolvedAt?, createdAt). Could extend existing `tasks`/`doubt_tickets` rather than a new table — decide at build.
- Creation surfaces: student "Raise a ticket" + "Feature request" (P5) write here; staff can add from admin. 
- Admin view: `/admin/tasks` board — filter by status/category/creator, assign, mark resolved; **pending items persist and are counted** (badge). Notifications on new task (staff bell — infra exists).
- This unifies student tickets + internal to-dos into one accountable, never-lost list — exactly "if resolved then ok, else keep as pending."

## Sequencing
P1 (redesign) first — it's the visible win and reuses real data. Then P2 (depth) and the admin task board in parallel (task board is small + high-value for accountability). P3–P6 as content/keys land. Reminders + attendance follow-up depend on the same scheduled-job + WhatsApp/push keys the CRM automation needs.
