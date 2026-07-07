# Course Builder Plan — LearnWorlds/Thinkific Parity on Our Stack

**Date:** July 7, 2026
**Basis:** 3-agent audit — LearnWorlds feature/tier research, Thinkific feature/tier research, full codebase audit of the existing course stack.
**Rules honored:** additive-only DB migrations, never hurt prospect flow, build locally before commit, ask before push.

---

## 1. Executive summary

LearnWorlds' and Thinkific's most valuable features are almost all **already present in our backend**: curriculum hierarchy (courses → chapters → topics → study_materials → video_lectures), drip + prerequisites (`chapters.releaseAt`, `chapters.requiresPrevious`), Cloudflare Stream with signed URLs and device limits, in-video quiz checkpoints, timestamped video notes, AI outline generation, question banks + full test engine, certificates with QR verification, multi-currency `course_pricing`, fee plans/installments, coupons, and a Zoom→Stream recording pipeline.

What's missing is the **admin authoring surface**: `/admin/courses` is a shallow read-only grid with dead buttons and a create form whose fields (instructor/capacity/schedule/startDate) are silently discarded because the `courses` model has no such columns. The real curriculum builder lives unlinked at `/teacher/courses/[courseId]/builder` with ▲▼ reordering only.

Plan: 4 phases. Phase 1 builds the unified admin course workspace (tabs: Curriculum, Pricing, Settings, Students, Analytics). Phase 2 adds the "most popular" builder features (drag-and-drop, bulk upload, drip-by-enrollment, quiz-as-lesson, AI quiz generator). Phase 3 is commerce polish. Phase 4 is student-side polish. One small additive migration (Phase 1) + one enum/column addition (Phase 2).

---

## 2. Competitive audit distilled

### LearnWorlds (Starter $29 / Pro Trainer $99 / Learning Center $299 / Enterprise)
- Builder: Course → Sections → ~20 activity types (video, ebook, PDF, SCORM, audio, embeds, live sessions, exams, assignments, certificates-as-activities). Drag-and-drop outline.
- **Interactive video** (flagship, $299 tier): in-video questions that pause playback, overlays/CTAs/hotspots, AI transcripts (click-to-seek), auto-subtitles + translation, auto-generated in-video questions.
- Assessments: 16+ question types, question banks/pools, randomization, timed exams, weighted scoring, gradebook, AI feedback on open answers.
- Drip: by calendar date OR days-since-enrollment; per-section; manual unlock per learner. Prerequisite navigation is $299-tier.
- AI (all tiers, credit-metered): course planner (outline), content editor, assessment designer, video AI, analytics Q&A.
- $299 tier gates: interactive video, prerequisites, white-label, API/webhooks/SSO, bulk ops, custom roles, unlimited SCORM, AI insights.
- Users pick it for: interactive video, all-in-one depth, assessment engine, branding. Complaints: complexity, $299 wall, weak gamification.

### Thinkific (Basic $49 / Start $99 / Grow $199 / Plus ~$1k custom)
- Builder: Chapters → Lessons (2 levels), true drag-and-drop, **bulk content uploader** (N files → N lessons), course templates, duplicate course.
- Lesson types: video, text, audio, presentation (slides+narration), PDF, download, multimedia (any iframe), quiz, survey, assignment, exam (Brillium paid), live lesson (Zoom).
- Quizzes: MCQ-only natively (acknowledged weakness); randomized question banks; XLSX import; serious exams outsourced to Brillium (Grow+).
- Drip: days-after-enrollment / days-after-course-start / fixed date. Prerequisites: effectively Plus-only (Learning Paths); "compliance" settings force linear progression + min quiz score + video watch-through (Start+).
- Commerce (the moat): subscriptions, payment plans, bundles, memberships, coupons, order bumps, after-purchase upsell flows, abandoned-cart, gifting, group orders/B2B (Grow+).
- AI: outline generator + quiz generator (all paid); learner-facing "Thinker" AI tutor Plus-only.
- Certificates (Start+): auto-issue at 100%, template designer, expiry dates, Accredible integration.
- Users pick it for: ease of use, 0% transaction fees, integrated checkout, app store. Complaints: shallow quizzes, design limits, no free plan.

### "Most popular" intersection (what both charge premium for, ranked by citation frequency)
1. Drag-and-drop curriculum builder (ease of authoring)
2. Drip scheduling (esp. days-after-enrollment)
3. Question banks + randomized quizzes inside the course flow
4. Certificates on completion
5. AI outline + AI quiz generation
6. Payment plans / subscriptions / bundles
7. Interactive video (LearnWorlds-specific)
8. Progress tracking + compliance rules (watch-through, sequential)

---

## 3. Gap analysis (ours vs theirs)

### Already OWN (schema + APIs live; some lack UI)
| Feature | Where |
|---|---|
| Curriculum hierarchy (3 levels — deeper than Thinkific) | `courses`→`chapters`→`topics`→`study_materials`(+`video_lectures`) |
| Drip (fixed date) + prerequisites | `chapters.releaseAt`, `chapters.requiresPrevious`; enforced in `/api/enrollments/[courseId]` |
| Secure video + DRM | `src/lib/lms/cloudflareStream.ts`, signed URLs, `lms_device_sessions` limits |
| In-video questions | `video_checkpoints` + `/api/teacher/videos/[id]/checkpoints` |
| In-video TOC + timestamped notes | `video_chapters`, `video_notes` (with AI summary) |
| AI course outline | `/api/teacher/builder/[courseId]/ai-outline` + `AIOutlinePanel` |
| Question banks / exams / OMR | `question_banks`, `test_templates`, `test_sessions`, `test_attempts`, OMR suite |
| Certificates + templates + QR verification | `certificates`, `certificate_templates`, `/api/certificates/claim` |
| Live classes + auto recording ingest | `class_sessions` + `src/lib/zoom/recordingPipeline.ts` → Stream |
| Multi-currency pricing | `course_pricing` (8 currencies) + `/api/courses/pricing` (geo-aware) |
| Payment plans / installments / coupons | `fee_plans`, `installments`, `coupons`, counselor FeePlan UI |
| Student portal (progress, gradebook, doubts, AI tutor) | `src/app/student/**`, CERI/ARIA |
| Cohorts + per-group content grants | `student_groups`, `group_content` |

### PARTIAL (backend exists, UI missing or wrong surface)
- Curriculum builder UI exists but: teacher-area only (`/teacher/courses/[courseId]/builder`), unlinked from `/admin/courses`, ▲▼ reorder not drag-drop.
- `course_pricing` has NO admin write UI (rows seeded by hand).
- Admin course list: dead buttons (Analytics/Students/Pause/Eye/Settings), fabricated fields (rating 0, capacity 300, completionRate 0), "Advanced Filter" toast stub.
- Create/Edit course forms collect instructor/maxCapacity/startDate/schedule → **silently discarded** (no columns).
- Ratings/review count fields exist on materials/lectures — no student submission UI.
- Checkpoints/notes exist — player surfacing incomplete.

### MISSING
- Course lifecycle (draft/published/archived) — only `isActive` boolean.
- Course thumbnail/media, instructor FK, SEO fields on courses.
- Drag-and-drop reordering.
- Bulk content uploader UI (multi-file → auto-lessons).
- Drip by days-after-enrollment.
- Assessments attached INSIDE curriculum (tests are a parallel system).
- AI quiz generation from chapter content.
- Bundles / subscriptions / order bumps (deliberately deprioritized — counselor-led sales).
- Per-course student community (deprioritized; forum exists elsewhere).

---

## 4. Implementation plan

### Phase 1 — Unified Admin Course Workspace  ★ start here
**Goal:** one place where an admin manages everything about a course. Route: `/admin/courses/[courseId]` with tabs **Curriculum | Pricing | Settings | Students | Analytics**.

**Migration #1 (additive) — `courses` columns:**
```sql
ALTER TABLE courses ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'PUBLISHED'; -- DRAFT|PUBLISHED|ARCHIVED (existing rows stay live)
ALTER TABLE courses ADD COLUMN IF NOT EXISTS "thumbnailUrl" TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS "instructorId" TEXT REFERENCES users(id);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS "startDate" TIMESTAMP(3);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS "scheduleInfo" TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS "maxCapacity" INTEGER;
```
(+ `prisma/manual-migrations/` SQL + `scripts/apply-course-workspace.sh`, schema.prisma sync, `npx prisma generate`.)

**Work items:**
1. `src/app/admin/courses/[courseId]/page.tsx` — tabbed workspace shell (kit PageHeader; tab state in `?tab=`).
2. **Curriculum tab**: extract the teacher builder page body into `src/components/courses/builder/CourseBuilder.tsx`; teacher page and admin tab both render it (role prop). Reuses `/api/teacher/builder/*` (already allows ADMIN).
3. **Pricing tab**: new `GET/PUT /api/admin/courses/[courseId]/pricing` — CRUD `course_pricing` rows (all 8 currencies grid + enable toggle), edit `totalFees`. Show which currencies fall back to INR conversion.
4. **Settings tab**: name/description/type/class/duration + NEW real fields (status, thumbnail upload via existing blob storage, instructor picker from TEACHER users, startDate, scheduleInfo, maxCapacity, syllabus/features editors). Publish/Unpublish/Archive actions.
5. **Students tab**: enrollments for this course (reuse EnrollmentDashboard filtered by courseId, or DataTable over `/api/admin/enrollments?courseId=`).
6. **Analytics tab**: per-course slice of `/api/admin/courses/performance` + material view counts.
7. Fix `/admin/courses` list page: cards link to workspace; remove fabricated fields (show real enrollment count, chapters count, status chip); kill dead buttons; wire Pause/Start to status.
8. Fix Create/Edit forms: persist the new columns; stop discarding input. Public course queries: add `status: 'PUBLISHED'`-or-legacy filter ONLY on student/public reads (`isActive` remains honored) — verify no live course disappears (prospect-flow rule).

**Verify:** create draft course → invisible to students until publish; edit pricing in 2 currencies → `/api/courses/pricing` serves them; builder edits from admin tab appear on student curriculum; build + type-check.

### Phase 2 — Builder power features (the "most popular" list)
1. **Drag-and-drop**: dnd-kit (already a dependency, used on CRM Kanban) on chapters + topics lists in CourseBuilder; persists via existing `orderIndex` PATCH (add bulk-reorder endpoint `PATCH /api/teacher/builder/[courseId]/reorder` for one-shot writes).
2. **Bulk content uploader**: multi-file drop zone in builder chapter view → loops existing `/api/lms/upload` create_upload (tus) per file → auto-creates one study_material per file, titled from filename, appended in order. Progress list UI.
3. **Drip by enrollment date** — Migration #2 (additive): `ALTER TABLE chapters ADD COLUMN IF NOT EXISTS "dripDaysAfterEnroll" INTEGER;` Student curriculum API (`/api/enrollments/[courseId]`) locks chapter if `releaseAt > now` OR `enrolledAt + dripDays > now`. Builder UI: per-chapter "release N days after enrollment" input beside the date picker.
4. **Quiz-as-lesson**: additive column `study_materials.testTemplateId TEXT NULL` + MaterialType enum value `TEST` (`ALTER TYPE ... ADD VALUE`). Builder: "Add assessment" picks an existing test_template (or creates draft). Student curriculum renders it as a lesson row linking into the existing test-taking flow; completion = test_attempt submitted.
5. **AI quiz generator**: `POST /api/teacher/builder/[courseId]/ai-quiz` — reads chapter/topic material text (PDF text + titles), calls Anthropic (existing client patterns), returns draft MCQs → review UI (like AIOutlinePanel) → apply writes into `question_banks` + creates a test_template attached per #4.

**Verify:** drag reorder persists after refresh; 10-file bulk upload creates 10 ordered lessons; enrollment-drip locks/unlocks correctly for two test students enrolled on different dates; AI quiz draft → apply → student can take it.

### Phase 3 — Commerce polish (deprioritized: sales are counselor-led)
- Coupon manager surfaced inside workspace Pricing tab (coupons table exists).
- Payment-plan presets per course (map fee_plans templates to course) shown at checkout.
- Optional: bundles (new `course_bundles` additive table) and "add test series" order bump at checkout. Only if self-serve checkout volume justifies it.

### Phase 4 — Student-side polish
- Ratings/reviews: `POST /api/student/materials/[id]/rate` writing existing rating fields + aggregate display on course page.
- Surface `video_checkpoints` + `video_notes` fully in SecureVideoPlayer (LearnWorlds-parity interactive video).
- Cloudflare Stream auto-captions → transcript panel (CF `/captions` API; click-to-seek).
- Completion rules: auto-suggest certificate claim at 100%; optional sequential-completion toggle per course (Thinkific "compliance").

---

## 5. Explicitly out of scope (deliberate)
- SCORM import (no B2B/corporate requirement), SSO, white-label multi-school, affiliates/funnels, abandoned-cart email, branded mobile app, per-course community (staff comms + forum already exist), subscriptions/memberships unless user asks.

## 6. Sequencing & risk
- Phase 1 → 2 → 4 → 3. Each phase = several small commits, build-verified; per-push permission as always.
- Risk watch: (a) `status` column must NOT hide existing live courses from prospects — default 'PUBLISHED' + verify public queries; (b) enum ADD VALUE must run before code referencing it deploys; (c) builder extraction must keep teacher flow byte-identical; (d) `prisma generate` never during a running build.
