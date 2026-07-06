# Dashboard Endpoint Audit — Built vs Connected (Jul 6, 2026)

4-agent audit: admin, student, teacher+parent, counselor. Method: every dashboard page traced to the endpoints it calls (incl. imported components); every called endpoint checked for existence + real-Prisma-vs-mock; reverse sweep for endpoints with zero UI callers.

## Global numbers

- **461 API routes built** under `src/app/api`
- **~343 referenced** by code; **118 with no in-code caller**
  - of which legitimately external: 14 crons (Vercel scheduler), 2 webhooks (Razorpay etc.), ~9 test/dev routes
  - **≈90 true orphan candidates**, clustered: `agents/*` (11, AI sales-agent suite), `ai/*` (7, an entire unused AI test engine: start/submit/results), `whatsapp/*` (7), `admin/*` (8), `diagrams` (4), `leads` (4), `certificates` (3), `lms` (3), `calendar` (2)…

## Health by dashboard

| Dashboard | Verdict |
|---|---|
| **Student** (`/dashboard`, `/student/*`) | ✅ Healthiest. Everything traces to real Prisma. 2 defects (below). Old memory notes STALE: Performance Snapshot is real now; neet-tools pages (rank/college predictor, study planner) EXIST now. `/dashboard`, `/student/dashboard`, `/dashboard/student` are 3 distinct pages, not dupes. |
| **Teacher** (`/teacher/*`) | ✅ Very good. 22 endpoints real + wired. 1 placeholder field, 1 dead button, 1 missing detail page. |
| **Parent** (`/parent/*`) | ✅ Fully real (7 endpoints). Only `/parent/schedule` is a "coming soon" stub. |
| **Counselor** (`/counselor/*`) | ✅ Core CRM real & wired (Kanban, tasks, followups, payments, fee-plans, WhatsApp). June-2026 fixes verified LIVE and called. 2 pages fetch non-existent endpoints; 1 fake-persistence API. |
| **Admin** (`/admin/*`) | ⚠️ Most rot. Core (analytics, students, leads, payments, coupons, courses, demo-slots, OMR, LMS, gallery, marketing) is real — incl. 2 upgrades since the old audit (faculty + marketing now real Prisma). But: whole `/admin/tests` section broken, several mock pages, dead buttons. |

## BROKEN / MOCK (ranked by user harm)

1. **Student fee enquiry silently discarded** — `student/fees/page.tsx:162` posts to `/api/feedback`, which is **in-memory demo storage** (`route.ts:5`, id = `Math.random()`): every installment/scholarship enquiry is lost on redeploy and never reaches CRM/admin. *Only student write that loses data. Fix first.*
2. **`/admin/tests` entirely broken** — `admin/tests/page.tsx:92,178,195` calls `/api/admin/tests(+/{id},/duplicate)` which **do not exist**. Create + analytics subpages are "coming soon" stubs.
3. **Counselor pages fetching 404s** — `counselor/page.tsx` + `counselor/notifications/page.tsx` → `/api/counselor/notifications` (no route); `counselor/schedule/page.tsx` → `/api/counselor/sessions` (no route).
4. **Fake persistence** — `admin/settings/notifications/page.tsx:141` "saves" via setTimeout (success toast, writes nothing); `api/counselor/lead-scoring/rules/route.ts:12-38` returns hardcoded rules, POST "stores in memory" (nothing).
5. **Teacher test-assignment "View" 404s** — links to `/teacher/test-assignment/[id]` which was never built; its two data endpoints (`[id]/submissions`, `[id]/release`) exist, work, and are orphaned by the same missing page.
6. **Student worksheet click 404s** — `worksheets/page.tsx:20` navigates to `/student/worksheets/[id]` (page missing; its API route exists, orphaned).
7. **Mock pages rendered as real** — `admin/students/active` (hardcoded array), `admin/content/keywords` (hardcoded rankings), `admin/lms/analytics` (all-zero tiles), `admin/content/analytics` (endpoint missing).
8. **Dead UI** — admin dashboard: 4 Quick Actions + 5 "View all/report" buttons no onClick (`admin/page.tsx:~367-513`); teacher Notifications button (`teacher/page.tsx:158`); `/admin/mcq` hub page missing (subpages work).
9. **Placeholder data** — `api/teacher/dashboard/route.ts:157,162`: upcomingClasses always `batch:'All Students', studentsCount:0`.
10. **Minor** — Kanban stage-drag PATCH writes no `activities` row (stage changes missing from lead timeline); `/api/analytics/dashboard` serves hardcoded serverLoad/perf metrics to admin+teacher overview pages.

## ORPHANED (built, working, zero callers — candidates to wire or delete)

**Wire (valuable, just needs a button/page):**
- `/api/admin/leads/backfill` — the June content_leads→CRM backfill; no UI ever calls it (the 37 stranded leads still stranded unless run by curl)
- `/api/admin/leads/merge-duplicates` — dedup tool, no UI
- `/api/admin/leads/export` + `/api/admin/leads/assign` — export/assign, no UI
- `/api/teacher/test-assignments/[id]/{submissions,release}` — wire via the missing detail page (#5)
- `/api/student/worksheets/[id]` — wire via missing page (#6)
- `/api/admin/mcq/import-batch` — bulk import, no UI
- `/api/counselor/offers` + `/offers/create` — offers never creatable from UI (only PDF generation wired)

**Delete candidates (dead weight):**
- `/api/agents/*` (11 routes: qualify-lead, call-prep, transcribe, generate-*) — AI sales-agent suite, zero callers
- `/api/ai/test/*` (start/submit/results/[testId]) + `/api/ai/question-generator`, `/api/ai/test-generation` — parallel unused AI test engine
- `/api/whatsapp/*` orphans (7), `/api/admin/webhooks*` (3, no admin page), `/api/admin/{ai-metrics,data-retention,seed-topics}`, `/api/counselor/{payment-link/generate, leads/score, payments/reminders/{run,upcoming}}`, `/api/progress/enrollment/[id]`, `/api/analytics/{interactions,topic,test-session,whatsapp-stats,facebook-conversion}`, `/api/mcq/community/ai-screen`, `/api/auth/{csrf-token,settings,counselor/send-otp,counselor/verify-otp}`, `/api/admin/gallery/reorder`

## Corrections to previous audits (now stale)
- `admin/settings/faculty` → REAL (`/api/admin/faculty` uses prisma.users) — was flagged mock
- Admin marketing → REAL Prisma (`crm_communications`, `marketing_campaigns`) — was "InstantDB mock"
- Student Performance Snapshot → REAL from `test_attempts` (fabricated chart/next-class removed)
- neet-tools-registry targets (rank predictor, college predictor, study-plan-generator) → pages EXIST now

## Recommended fix order
1. `/api/feedback` → persist to Prisma + upsertLead (student money-enquiries currently vanish)
2. Counselor notifications + sessions: build the 2 missing routes (or stop fetching)
3. `/admin/tests`: either build `/api/admin/tests` CRUD or point the page at existing `/api/tests`
4. Teacher test-assignment `[id]` detail page (wires 2 orphaned endpoints, fixes 404)
5. Student worksheets `[id]` page (same pattern)
6. Small: notifications fake-save, lead-scoring rules mock, teacher upcomingClasses placeholder, dead buttons, `/admin/mcq` hub, Kanban stage-change activity row
7. Wire the CRM tools: backfill + merge-duplicates + export buttons on `/admin/leads`
8. Bulk-delete the dead route clusters (agents/*, ai/test/*, whatsapp orphans) after sign-off
