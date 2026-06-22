# LMS End-to-End Audit + "Finish-It" Roadmap

**Date:** 22 Jun 2026 · **Method:** 4 parallel auditors traced the pipeline (courses → enrollment → video → assessments → progress → certificates) against real code + `prisma/schema.prisma` + the generated client.

## Headline
**You have a real, custom LMS — the data/backend layer is ~80–90% built and genuinely works.** Enrollment, payments→activation, the assessment engine, materials gating, certificate *generation*, and progress analytics are all real Prisma (not mocked). The old "missing models faked via `as any` → 500" worry does **not** apply to the LMS models — they're all real.

**What's missing is the last mile of wiring + config**, concentrated in five places:
1. **No video player page** — the course player exists but nothing renders it (students can't watch videos today).
2. **Cloudflare Stream signing is broken + keys unset** — even with a player, signed video won't play.
3. **No automatic certificate issuance** — generation works, but nothing triggers it on completion.
4. **A split test pipeline** — tests created one way are never scored.
5. **3 student-facing components show hardcoded/fake data** — a paying student sees someone else's scores.

Plus several **env keys are unset**, which silently block payments→enrollment and video.

---

## Layer-by-layer status

### 1. Courses + Enrollment — ✅ WORKS (1 security gap)
- Models `courses`, `course_pricing`, `chapters`, `batches`, `enrollments`, `material_access` all real.
- Payment → enrollment activation **works** end-to-end: Razorpay/Cashfree webhook + verify route both flip enrollment to ACTIVE and grant `material_access` transactionally + idempotently (`api/payments/webhook/route.ts:177-257`, `verify/route.ts:152-210`). Enrollment create supplies `id`+`updatedAt` (old "throws" note is **stale/fixed**).
- Public catalog (`/courses`) is **static** (`courseSystemData.ts`), decoupled from the DB `courses` table — by design (marketing); checkout passes a real DB `courseId`.
- ⚠️ **P1 security gap:** material **download/file** access only checks `isPublished`, not enrollment/entitlement (`api/student/materials/[id]/download/route.ts:39`); raw `fileUrl` is exposed in the list response. A non-entitled signed-in user who gets a material ID/URL can fetch it. *Fix:* re-run the access check + serve via signed/proxied URL.
- 🔧 **Config blocker:** `RAZORPAY_WEBHOOK_SECRET`/`KEY_SECRET` must be set or the webhook 500s/401s and **enrollments never activate**.

### 2. Video playback + progress — ⚠️ PARTIAL — student CANNOT watch a course video today
The backend is real and correct; three independent blockers stop delivery:
- **No player surface (P0):** `src/components/lms/SecureVideoPlayer.tsx` (725 lines, complete — hls.js, progress reporting, watermark) is **never imported anywhere**. There is **no lesson/course-player page** in `src/app`. The save-progress loop exists in the component but is dangling.
- **Signed playback broken (P0):** `src/lib/lms/cloudflareStream.ts:212-298` hand-rolls the RS256 JWT and imports a PKCS#1 PEM as `pkcs8` → throws → returns null. And the keys (`CLOUDFLARE_STREAM_KEY_ID/_KEY_PEM`) aren't in `.env`, so it falls back to an **unsigned** URL — but videos are uploaded with `requireSignedURLs:true` → **403**. *Fix:* use Cloudflare's `/stream/{uid}/token` mint endpoint instead of hand-rolling, set the keys.
- **Videos never reach READY:** `CLOUDFLARE_STREAM_WEBHOOK_SECRET` unset → prod webhooks rejected → `uploadStatus` stays PROCESSING → playback returns "still processing."
- Models (`video_lectures/chapters/notes/progress`) real; `/api/lms/videos` + progress upsert real. ⚠️ no enrollment gate in `getVideoForPlayback`.

### 3. Assessments — ✅ WORKS (strongest area), 1 split to unify
- All models real. MCQ submit/questions, scoring (incl. negative marking, MTF partial), and persistence to `test_attempts`/`test_analytics` are **real** — no hardcoded scores.
- ⚠️ **Split test pipeline (P1):** two incompatible flows — Pipeline A (`test_attempts`+`test_questions`, created by `/api/test/session`) vs Pipeline B (`test_sessions`+`user_question_responses`+`test_analytics`, scored by `/api/test/[id]/submit`). A session created via `/test/session` is **never scored** (submit reads a table the create flow never seeds). *Fix:* standardize the take-test UI on Pipeline B end-to-end.
- ⚠️ **"Live" quiz = HTTP polling** (2–10s, `quiz-competition/[roomCode]/host/page.tsx:219`), not true realtime (no WebSocket/SSE). Fine for teacher-controlled rounds; add SSE if true-live needed.

### 4. Certificates — ✅ generation WORKS, ❌ auto-issuance MISSING
- Generation is **real**: `@react-pdf/renderer` + QR + upload to Vercel Blob, 3 templates (`lib/certificates/certificateGenerator.ts`). View/download/public-verify UI all exist.
- ❌ **P1:** `/api/certificates/issue` is admin-only and **has zero callers** — nothing issues a certificate on course/test completion. *Fix:* call the generator from the completion path (enrollment→COMPLETED, or `/api/test/[id]/submit` when passed a certification template).

### 5. Student experience — ⚠️ data layer real, but 3 components show FAKE data
- ❌ **P0 integrity — `components/learning/PersonalizedLearningPath.tsx:41-104` is fully hardcoded** (score 485, target 540, weak areas, streak 12). **Every paying student sees an identical fabricated learning path.** APIs to fix it already exist (`/api/test-attempts`, `/api/enrollments`, `/api/progress/enrollment/[id]`). Fix first.
- ❌ **P1 — `enrollments/page.tsx` (MyEnrollments)**: fake "Next Class … Today 4:00 PM", "Avg Progress 15%", "Quiz 4.8", dead resume buttons.
- ❌ **P1 — `/student/dashboard` "Today's Focus"** hardcoded + inert Notifications button.
- ✅ Performance Snapshot is **already fixed** (real `test_attempts` now). Enrollments list, per-enrollment progress, materials gating+progress, analytics service, and `notices` are all **real Prisma**.
- ⚠️ **Duplication:** two student dashboards exist (`/dashboard/student` real-analytics PRO view + `/student/dashboard` default) — consolidate.
- Missing: **gradebook aggregation** (only flat attempt list), **batch timetable** visibility to students, **content drip** (no `daysAfterEnrollment`/unlock dates).
- Notifications: `notices` is the real channel; `content_notifications` is dead — wire the bell to `/api/notices` or remove it.

---

## "Finish-It" Roadmap (prioritized)

### P0 — make it a working video LMS + stop showing fake data
1. **Build the course-lesson player page** (`/lms/lectures/[id]` or `/learn/[course]/[lesson]`): fetch `GET /api/lms/videos?videoId=`, render `SecureVideoPlayer`, wire `onProgress → POST /api/lms/videos`. *(Player + API + models already exist — this is the single highest-value item.)*
2. **Fix Cloudflare Stream signed playback:** swap hand-rolled JWT for CF's `/stream/{uid}/token` endpoint; set `CLOUDFLARE_STREAM_KEY_ID`, `_KEY_PEM`, `_WEBHOOK_SECRET`; register the Stream webhook.
3. **Add enrollment gate** to `getVideoForPlayback`.
4. **Fix `PersonalizedLearningPath.tsx`** to fetch real data (APIs exist).

### P1 — complete the learning loop + close gaps
5. **Auto-issue certificates** on completion (call the existing generator from the completion path).
6. **Unify the test pipeline** on `test_sessions`/`user_question_responses`/`test_analytics`.
7. **Gate material download/file** by entitlement + signed URLs.
8. **De-fake** `MyEnrollments` + `/student/dashboard` "Today's Focus"; wire resume buttons + notifications bell to existing APIs.
9. **Config:** set `RAZORPAY_WEBHOOK_SECRET`/`KEY_SECRET`, Cloudflare Stream keys, notification keys (Interakt/WhatsApp/email).

### P2 — polish & scale
10. Gradebook aggregation (per-course/subject transcript), student batch timetable, content drip (`daysAfterEnrollment`/unlock), consolidate the two student dashboards, live-quiz SSE for true realtime.

---

## Bottom line
This confirms the build-vs-buy call: **you're ~80% to a full LMS and the remaining 20% is wiring + config, not a rebuild.** The make-or-break item is **#1 — the video player page** (everything behind it already exists). Buying a third-party LMS now would mean discarding all of the above to re-acquire features you already have.
