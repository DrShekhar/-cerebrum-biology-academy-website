# LMS Fix Plan — 2026-07-23

Source: five-agent end-to-end code audit (student core, student assessment, student engagement, teacher portal, content pipeline) run 2026-07-23. Companion to `CRM_FIX_PLAN_2026_07_23.md` (all CRM phases shipped). Every item is backed by a verified `file:line` finding.

Audit verdict in one line: the LMS core is real (authoring → Cloudflare Stream → gated delivery; all teacher↔student loops close), but assessment data is fragmented across four disconnected stores, two student-visible features are broken/empty, and the fees portal can't take money.

Legend: **P0** = broken student-facing / security / revenue · **P1** = data-unification with direct student value · **P2** = engagement loop gaps · **P3** = platform hygiene & owner decisions.

---

## Phase 1 — P0: Broken, insecure, or losing revenue (3–4 days)

### 1.1 Fix "My Notes" (guaranteed 500)
**Finding:** `src/app/api/student/notes/route.ts:93-131` queries the CRM `notes` model (leadId/content-string, schema:2013) for student-note columns that don't exist (`studentId, noteType, isFavorite, isArchived, tags, …`); the route documents the drift and casts `any`. Every open of `/student/notes` errors.

- Add a `student_notes` model (additive migration — low risk): `id, studentId FK users, title, content Json, noteType, courseId?, chapterId?, topicId?, tags String[], isFavorite, isArchived, lastEditedAt, createdAt, updatedAt`, indexes on `(studentId, isArchived)`.
- Point `/api/student/notes` (+ `[id]` PUT/DELETE) at it; delete the `as any` casts so tsc protects it again.
- **Migration note:** needs `prisma migrate` against prod DB — schedule with a deploy; additive only, no data movement.
- Verify: create/edit/favorite/archive/delete from the UI; tsc green without casts.

### 1.2 Wire checkout into the fees portal (dead "Pay Now")
**Finding:** `student/fees/page.tsx:362-366` "Pay Now" merely links to `/student/payments`, which has no checkout action at all — while a complete Razorpay chain exists (`api/payments/create-order`, `api/payments/verify` with HMAC → enrollment ACTIVE → material_access → tier → WhatsApp/email confirmation).

- On `/student/payments`, add a Pay action per pending installment/fee: call `create-order` with the installment context, open Razorpay checkout (pattern already exists in the enrollment purchase flow — reuse that component), verify via existing `/api/payments/verify`.
- Ensure verify marks the right `installments`/`fee_payments` row paid (extend its metadata if needed) so the CRM fee-plan view and the student page agree.
- Verify: test-mode Razorpay payment updates installment status + payment history on both student and counselor fee views.

### 1.3 Close the gamification IDOR
**Finding:** `GET /api/gamification/route.ts:28` free-user branch returns any `free_users` record by query param with no session check (paid branch checks at `:35`).

- Require: session user matches, OR the request carries the freeUserId that only the client itself stores — minimum fix: if a session exists, ignore query params and use the session identity; if no session, rate-limit and return only non-PII aggregates (or 401). Verify with a curl for another user's id.

### 1.4 Un-block ADMIN from teacher Questions & Analytics
**Finding:** `api/teacher/questions/route.ts:13` and `api/teacher/analytics/route.ts:13` use strict `role !== 'TEACHER'`, 401-ing ADMIN/owner although the portal UI admits them (middleware allows TEACHER|ADMIN).

- Switch both to the shared `requireTeacher()` (TEACHER|ADMIN) used everywhere else. 15 minutes.

### 1.5 Worksheets: give the shell content or hide it
**Finding:** no `worksheets.create` exists anywhere in src/scripts/prisma (`api/teacher/worksheets/route.ts:5-7` documents "authored via admin builder" — but no such builder path exists either). Students see an empty list forever; the taking/grading machinery is complete.

- Cheapest real fix: add worksheet authoring to the teacher API + a create form on `/teacher/worksheets` (model exists; mirror the assignments-create pattern, enrolled-course scoped, PUBLISHED flag).
- If worksheets aren't wanted yet: hide the student/teacher nav entries instead. **Owner call — recommend building the create path; the rest already works.**

---

## Phase 2 — P1: Assessment unification (4–5 days)

The one structural fix with the most student-visible value. Current stores:
`test_assignment_submissions` (assigned tests) / `test_attempts` (public tests → Gradebook) / `user_question_responses` (CBT → Mistakes+Mastery) / `mcq_user_stats` (anonymous MCQ).

### 2.1 Assigned tests → per-question responses
On submit (`api/student/tests/[id]/route.ts:319-374`, where server-side scoring already iterates each question), also write `user_question_responses` rows (userId, questionId, isCorrect, selectedAnswer, source:'ASSIGNED_TEST'). Instantly populates Mistakes notebook + Mastery map with assigned-test data. Guard: only for questions that exist in the `questions` bank (AI-generated ones do — they're persisted).

### 2.2 Gradebook reads all test sources
`api/student/gradebook/route.ts` currently reads only `test_attempts` keyed by freeUserId. Extend to UNION: completed `test_assignment_submissions` (score/total/topic already stored) + `test_attempts`. Present one transcript with a source tag. (Don't migrate stores — just read both.)

### 2.3 Link MCQ practice to accounts
`mcq_user_stats` already has an unused `userId` column. Two steps:
- On MCQ submit (`api/mcq/submit/route.ts`): if a session exists, stamp `userId` alongside `freeUserId`.
- On login/signup: one-time merge — client sends its localStorage `mcq_free_user_id`; server links that `mcq_user_stats`/`mcq_practice_sessions` history to the account (claim endpoint, idempotent). Practice history then survives signup — this is your free→paid bridge.
- Optionally also write `user_question_responses` from MCQ submits (per-question rows) so Mistakes/Mastery cover practice; volume consideration: ~1 row per answer, indexed — fine.

### 2.4 Reports counters
`api/student/work-tracking/route.ts:71-93` hardcodes teacher assigned/checked counters to 0. Now derivable: assigned = `assignment_submissions`/`test_assignment_submissions`/`worksheet_submissions` created for the student in range; checked = those GRADED. Replace zeros with real counts; delete the unused `work_tracking` model note (leave table for later removal).

---

## Phase 3 — P2: Engagement loop gaps (2–3 days)

### 3.1 Mentor booking notifications
`api/student/mentor-bookings/route.ts` books transactionally but notifies nobody. Add fire-and-forget: `notifyStaff` bell + WhatsApp/email to the mentor (channel senders exist from CRM work) and a confirmation to the student. Same on cancel.

### 3.2 AI Tutor hardening
`api/ai/tutor/route.ts`: (a) add rate limiting (per-user daily cap — pattern exists in `api/doubts/ai-solve`'s permission gate; add a counter) and a token cap; (b) remove the system-prompt claims about MCP tools that aren't wired (`:74-84`) OR actually wire the two easy ones (question lookup + weak-areas from `user_question_responses` — both are single Prisma queries passed as tool results); (c) fix the guest mismatch — page offers the tutor to freeUserId guests but API 401s: gate the page entry on `isPaidUser` like the dashboard button already does.
Same rate-limit treatment for `api/doubts/ai-solve` (currently unlimited per permission-holder).

### 3.3 Doubt status machine
`api/student/doubts/[id]/messages/route.ts:81-89`: `ANSWERED` branch unreachable (if/else-if ordering) — first teacher reply should set ANSWERED (or keep IN_PROGRESS until student marks resolved — pick one semantic and make the branch reachable).

### 3.4 Auto-issue certificates (optional, small)
`issueCertificate` is only called by admin issue + student claim. Add a call from the enrollment-progress recompute when progress hits 100% (idempotent guard already exists). **Owner call** — self-claim may be the intended friction.

### 3.5 Gamification: make the new tables real
XP totals/streak are real; `gamification_xp_events` and `gamification_user_badges` have no writers, so the XP breakdown and badge showcase render empty. Wire `recordMcqXp`/`awardBadge` (both exist, uncalled) into `api/mcq/submit` and test submit paths — then the dashboard's breakdown/badges light up from real activity.

---

## Phase 4 — P3: Platform hygiene & owner decisions (schedule separately)

1. **Two course catalogs** (decision needed): public `/courses` marketing pages render hardcoded `src/data/*` while the builder authors DB `courses`. Options: (a) keep split deliberately (marketing pages are SEO-tuned static content; LMS is delivery) but add a "publish to catalog" bridge, or (b) migrate marketing pages to read DB. Recommend (a) short-term with an explicit mapping field (`courses.marketingSlug`) so the two stay linked.
2. **Dual question sources**: retire `src/data/questions/*` usage in `resources/test-generator` and `teacher/test-assignment/create` in favor of the DB `questions` API (bank is populated; the hardcoded files then become seed archives).
3. **Teacher scoping**: `api/teacher/{courses,students,videos,worksheets}` return everything. Add instructor/batch scoping once teaching assignments are modeled (needs `courses.instructorId` to actually be set — column exists).
4. **Zoom meeting provisioning**: session create takes a pasted link; the Zoom server-to-server API could create meetings (creds already expected by recordings pipeline). Nice-to-have.
5. **Batch-targeted notices**: unmatched because enrollments carry no batch FK (`api/notices/route.ts:88`). Either derive batch from `student_group_members` in the notices query (cheap, recommended) or drop the BATCH target type from the composer.
6. **Recordings pipeline activation** (ops, not code): set `ZOOM_WEBHOOK_SECRET_TOKEN`, `CLOUDFLARE_ACCOUNT_ID/API_TOKEN`, `CLOUDFLARE_STREAM_WEBHOOK_SECRET` in Vercel; configure Zoom event subscription for `recording.completed`. Then live-class recordings auto-appear in student libraries.
7. **Adaptive testing** (decision): current page is a marketing demo over an in-memory engine (sessions lost on cold start, no Prisma model). Either de-link it from real-feature navigation or invest in persistence. Recommend de-link now.
8. **Dead schema cleanup** (with the next migration): `chapter_notes`, `ncert_chapters`, `question_diagrams`, `work_tracking` (after 2.4), plus assignment-attachment upload (teacher create page takes URL strings — reuse the student Blob upload).
9. **Teacher assignment attachments**: `teacher/assignments/create/page.tsx:51,134` stores pasted URLs; wire the existing Vercel Blob upload endpoint.
10. **Stale redirect**: `lib/userFlow.ts:213` maps TEACHER → nonexistent `/teacher/dashboard`; fix to `/teacher`.

---

## Sequencing & effort

| Order | Work | Est. |
|---|---|---|
| 1 | 1.3 IDOR + 1.4 ADMIN 401s + 3.3 doubt status + P4.10 redirect (quick wins batch) | 0.5 d |
| 2 | 1.1 student_notes schema + route (needs prod migration) | 1 d |
| 3 | 1.2 fees checkout | 1–1.5 d |
| 4 | 1.5 worksheet authoring (or hide) | 0.5–1 d |
| 5 | 2.1 + 2.2 assigned tests → responses + unified gradebook | 1.5 d |
| 6 | 2.3 MCQ account linking (+ optional per-question rows) | 1–1.5 d |
| 7 | 2.4 reports counters | 0.5 d |
| 8 | 3.1 mentor notifications + 3.2 AI hardening + 3.5 gamification wiring | 1.5–2 d |
| 9 | Phase 4 items, individually | scheduled |

Total phases 1–3: ~8–10 focused days. Items needing a prod DB migration: 1.1 (new table), P4.8 (drops). Owner decisions: 1.5 (build vs hide worksheets), 3.4 (auto-certificates), P4.1 (catalog strategy), P4.7 (adaptive testing).

## Verification gates

- `npx tsc --noEmit` stays green (1.1 removes `as any` casts — real coverage returns).
- Playwright: student notes CRUD; fees test-mode payment → installment paid; assigned test → appears in gradebook + mistakes; MCQ as guest → login → history claimed.
- Security re-check: gamification endpoint with foreign ids → 401/403; teacher Questions/Analytics as ADMIN → 200.
- After 3.5: XP breakdown non-empty after an MCQ session.
