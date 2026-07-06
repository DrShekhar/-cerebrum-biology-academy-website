# Student Dashboard — Audit, Roadmap & Build Plan (Jul 6, 2026)

3-agent code audit (video/live-class, materials/grading/profile, dashboards/stats); evidence-verified. Predecessor plan archived at `STUDENT_DASHBOARD_ROADMAP_2025_10_ARCHIVED.md`. **Principle: reuse the large working stack; build only listed gaps.**

## A. INVENTORY

### Works end-to-end (wire, don't rebuild)
- **Cloudflare video stack**: video_lectures/progress/checkpoints; signed-URL playback + tier/enrollment gate (`api/lms/videos`, `lib/lms/cloudflareStream.ts`); player `/learn/[lectureId]` (SecureVideoPlayer, delta progress, in-video quiz); admin upload; CF status webhook. *Hidden behind course pages.*
- **Live-class data**: class_sessions (meetingLink/status/recordingUrl fields); `api/student/sessions` (enrollment-scoped upcoming/today/past); `UpcomingSessionsWidget` (mounted ONLY on /student/attendance; dashboards show a HARDCODED next-class countdown).
- **CBT**: `/cbt` + `api/cbt/session*` + **`api/cbt/attempts`** (history + inProgressId resume) + review + AI Coach feedback (Jul 6).
- **MCQ**: `api/mcq/*` rich filters (ncertClass/chapter/difficulty/PYQ/olympiad); widgets DailyChallengeCard, SpacedReviewWidget, MCQAnalyticsWidget, NEETReadinessMeter, StudyHeatmap; PracticeTab.
- **Stats**: `analytics/performance` (topicPerformance/strengths/weaknesses), `analytics/comparative` (rank/percentile), `progress/[userId]` (topic mastery), `test-attempts`, `student/gradebook` (practice transcript only), `student/work-tracking`, gamification XP/streak/badges/**goals (real, gamification_goals)** + XP history tab.
- **Homework — assignments track**: FULL loop (teacher create → grade+feedback write `submissions/[id]/grade/route.ts:77` → student detail shows both).
- **Materials**: study_materials + student gate (`api/student/materials:61-79`: FREE / material_access / enrollment courseId); blob upload server-side; download/view tracking.
- **Parent**: per-child attendance/homework/tests real (tests keyed freeUserId=user.id convention). **Admin**: active-student KPIs (Jul 6).

### Gotchas (audit-verified)
- `users` has **NO grade column**; grade scattered in profile Json (`currentClass`|`grade`|`class` from 3 different signup paths). Canonical: **enrollments→courses.class** (StudentClass: CLASS_9/11/12/DROPPER/FOUNDATION).
- `/dashboard` = canonical login target w/ 7-tab shell but fetches ONLY test-attempts+gamification. `/student/dashboard` lean; `/dashboard/student` PRO analytics (gated).
- Admin PDF uploader BUG: `MaterialUploader.tsx:138` missing x-csrf-token → 403 (route :48 requires); form never sets accessLevel/courseId → new PDFs invisible until PATCHed.
- `student/assignments` LIST omits feedback (route :124-131); AssignmentCard:75 + WorksheetList render grade, not feedback text.
- Worksheet + test_assignment grading: teacher WRITE paths missing (no /api/teacher/worksheets*; test teacherFeedback never written; release only flips status).
- No profile photo anywhere (no column/upload/UI; mock avatars only). study_plans model = orphan. `/video-lectures` pages = YouTube marketing, not LMS.
- material_access rows written ONLY by payment auto-grant (grantedBy 'system').
- Counselor has ZERO academic view of converted students (CRM only).

### Build list (the only genuinely missing pieces)
1. **Recordings pipeline**: nothing writes class_sessions.recordingUrl; no session↔video link; teacher update schema lacks recordingUrl. Build: (i) optional Zoom auto-create on session create; (ii) `/api/zoom/recording-webhook` → `cloudflareStreamService.uploadFromUrl` (exists) → create video_lectures+study_materials with session.courseId → enrolled students inherit access via existing gate; (iii) recordingUrl in teacher PATCH as manual fallback.
2. **Video library**: no list endpoint (only single ?videoId=). Build `GET /api/student/videos` (by ACTIVE-enrollment courseIds + video_progress badges) + dashboard tab.
3. **PDF assignment**: per-STUDENT → `POST /api/admin/materials/assign` writing material_access(userId, materialId, grantedBy=admin) + student picker UI; per-CLASS → additive `study_materials.requiredClass "StudentClass"` col (SQL) matched vs student's enrollment class in the student materials gate; fix uploader CSRF bug + add accessLevel/courseId/requiredClass fields to admin uploader UI.
4. **Unified feedback feed**: `GET /api/student/feedback` aggregating assignments+worksheets+test_assignments (grade, feedback, gradedAt, type, title); fix assignments-list feedback omission; teacher PATCH routes for worksheet + test_assignment feedback so comments flow; render feedback text in cards.
5. **Profile photo**: `avatarUrl` inside users.profile Json (NO migration) + `POST /api/user/avatar` (Vercel Blob pattern from certificates/LMS) + header avatar + settings upload.
6. **Grade resolver**: `src/lib/student/context.ts` `getStudentContext(userId)` → { grade (enrollments→courses.class; fallback profile keys), courseIds/names, tier, trialDays } — single source for all filtering.
7. **`GET /api/student/summary`**: one call for dashboard header: name/avatar/grade/courses/streak/XP/level/tier/counts (due homework, upcoming class time, unread feedback).
8. **Counselor academics**: `GET /api/counselor/students/[userId]/academics` (gate: converted lead assignedToId or ADMIN; reuse admin aggregations: avg score/tests/attendance/recent grades) + "Academics" tab on ENROLLED lead detail. Admin per-student drill-down reuses the same endpoint shape.
9. **Demo seed**: `prisma/seed-demo-student.ts` — demo student (avatar, CLASS_12 enrollment in 2 courses), upcoming+past class_sessions (past with recordingUrl), video_lectures w/ progress, assigned study_materials, graded assignments w/ teacher feedback, worksheet, test_attempts, CBT session, XP/goals/badges, attendance, notices. ALL rows tagged (`tags:['demo-seed']` / id prefix `demo_`) for later replacement/cleanup.

## B. DASHBOARD DESIGN (rebuild `/dashboard` in place — keep tab shell)
**Header band**: avatar (photo/initials) · name · grade chip (e.g. "Class 12 · Dropper") · course chips · streak flame · XP level ring · tier/trial badge. Quick actions: Resume mock (cbt/attempts.inProgressId) · Join today's class · Ask a doubt.

**Tabs**: 1 Overview (readiness meter, streak, next live class [UpcomingSessionsWidget], due homework, daily challenge, latest teacher comments) · 2 Live Classes (upcoming+join; past with recording→/learn) · 3 Videos (new library) · 4 Practice/MCQ (grade-aware deep-links `?ncertClass=`) · 5 Mock Tests (CBT history+resume+AI feedback links) · 6 Homework (assignments+worksheets, grades+feedback inline) · 7 Progress (topic mastery + trend + rank; link PRO analytics) · 8 Materials (personal+class+course PDFs) · 9 Goals (goals+XP history).
After parity: redirect `/student/dashboard` → `/dashboard`.

## C. EXECUTION PHASES
- **P0 Foundations**: (a) grade resolver lib; (b) /api/student/summary; (c) avatar upload+header; (d) demo seed. → header + Overview real.
- **P1 Wire sections**: mount UpcomingSessionsWidget (kill hardcoded countdown); CBT tab (cbt/attempts); Homework tab + fix feedback in list API + cards; Practice deep-links via resolver; Progress tab (fold analytics/performance + progress/[userId]); Materials tab; Goals tab.
- **P2 Pipelines**: student videos endpoint+tab; PDF assignment (assign endpoint + requiredClass SQL + admin uploader fixes incl. CSRF); unified feedback feed + teacher worksheet/test feedback routes.
- **P2.5 Market-parity features** (user-approved Jul 6 from `LMS_BEST_FEATURES_RESEARCH.md` recs 1–8):
  1. **Mistake Notebook** (S/M) — auto-compile wrong CBT/MCQ answers into a per-student notebook; feed SpacedReviewWidget until mastered. Data already in test_attempts/test_sessions.
  2. **Weekly parent WhatsApp report** (M) — attendance/scores/streak/homework composer cron → §F broadcast-list sender. Blocked on Meta WA env keys (owner).
  3. **Post-mock analysis v2** (S) — extend CBT AI Coach: silly-error vs concept-gap classification + time-per-question breakdown.
  4. **Streak freeze + weekly Biology League** (S/M) — on existing XP/streak tables (Duolingo-verified mechanics).
  5. **NEET rank predictor** (S/M) — static NTA marks→AIR table from mock scores; fixes advertised-but-missing neet-tools-registry route.
  6. **Adaptive Daily Challenge** (M) — daily 10-Q set picked from weak topics via analytics/performance.
  7. **At-risk inactivity alerts** (M) — no-login/no-practice threshold → counselor CRM task + parent WA nudge (reuses fixed task subsystem).
  8. **Recordings pipeline + video library** — already P2/P3 build items; confirmed table stakes vs Allen/PW.
- **P3 Staff+recordings**: counselor academics endpoint+tab; admin drill-down; Zoom recording webhook → CF pipeline; optional Zoom auto-create.
- **P4 Polish**: redirects, mobile pass, empty states, demo-content cleanup script.

## D. DB CHANGES (additive only; owner-run script pattern)
- `ALTER TABLE study_materials ADD COLUMN IF NOT EXISTS "requiredClass" "StudentClass";`
- (P3, optional) `ALTER TABLE class_sessions ADD COLUMN IF NOT EXISTS "videoLectureId" TEXT;`
- Nothing else — avatar lives in profile Json.

## E. KEY FILES
Dashboard: `app/dashboard/page.tsx`, `components/dashboard/PersonalizedStudentDashboard.tsx`, `components/dashboard/tabs/*`. Video: `lib/lms/cloudflareStream.ts`, `api/lms/videos`, `app/learn/[lectureId]`. Live: `api/student/sessions`, `components/student/UpcomingSessionsWidget.tsx`, `api/teacher/sessions*`, `api/zoom/signature`. Materials: `api/student/materials`, `api/admin/lms/materials*`, `components/admin/MaterialUploader.tsx`. Homework: `api/teacher/assignments*`, `api/student/assignments*`, `api/student/worksheets*`. Stats: `api/analytics/*`, `api/progress/[userId]`, `api/cbt/attempts`, `api/student/gradebook`. Profile: `api/user/profile`, users.profile Json (schema:3114).

## F. GROUPS/BATCHES + PARENT COMMS (owner addition, Jul 6)
**Groups (batches)**: admin manually creates groups and adds students; assign videos/PDFs/tests to the WHOLE group. Additive design (no breaking changes):
- New tables (SQL script): `student_groups(id, name, description, classLevel "StudentClass"?, createdBy, createdAt)`; `student_group_members(groupId, userId, addedBy, addedAt, UNIQUE(groupId,userId))`; `group_content(groupId, materialId?/videoLectureId?/testTemplateId?, assignedBy, assignedAt)`.
- Student materials/videos gates add one OR-branch: `group_content JOIN student_group_members ON userId`. Admin UI: /admin/groups (create, member picker, assign-content).
- This SUPERSEDES the `requiredClass` column idea in §A.3 — groups are more flexible (a group CAN be a class).
**Parent comms — design decision (WhatsApp-groups replacement)**: use the **Broadcast List model, NOT groups**: parents are members of a group in OUR DB; every outbound message is an INDIVIDUAL WhatsApp template send via the Meta Cloud API sender (W5, built) — parents can never see each other's numbers (privacy by design; this is exactly how WhatsApp Business API works — there is NO group API, which is a feature here). Components: admin/counselor "Message group" composer → fan-out individual sends (rate-limited, logged in crm_communications) + in-app NoticeBoard mirror (notices system already real) + parent dashboard already exists. Two-way: replies land in the existing /api/whatsapp/webhook inbound → counselor Messages inbox. Staff comms: same mechanism with a staff group + role gate.
