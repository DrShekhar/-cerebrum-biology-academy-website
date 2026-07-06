# Zoom → Cloudflare Recordings Pipeline (P3, Jul 7 2026)

**Goal**: after the class, the recording lands in the student's account automatically.

## Flow

1. Teacher hosts the class on Zoom (cloud recording ON).
2. Zoom fires `recording.completed` → `POST /api/zoom/webhook` (signature-verified, 200s immediately, work runs after the response).
3. `src/lib/zoom/recordingPipeline.ts` matches the meeting to a `class_sessions` row:
   - a) `class_sessions.meetingId` = Zoom meeting id (digits-only compare), or the meeting UUID;
   - b) `class_sessions.meetingLink` contains the meeting id (`zoom.us/j/<id>` links);
   - c) `host_id` → teacher (`users.profile.zoomUserId`, admin-set JSON key) → that teacher's nearest un-linked session within ±6h of the recording start.
4. The best MP4 (speaker view preferred, else largest) is copied server-side into Cloudflare Stream (`/copy` via existing `uploadFromUrl`).
5. A **published** `study_materials` (VIDEO, `accessLevel: ENROLLED`, `courseId` from the session, category "Class Recordings") + `video_lectures` row are created; existing enrollment gates apply — every student with an ACTIVE enrollment in the course sees it in the Videos tab and can play it at `/learn/<lectureId>`.
6. The session gets `videoLectureId` + `recordingUrl = /learn/<lectureId>` → shows on `/api/student/sessions` past sessions and as a status chip on the teacher sessions page.
7. When Cloudflare finishes processing, the existing CF webhook (`/api/lms/webhook`) flips the lecture to READY.

**Idempotent** on the Zoom meeting UUID (stored in `video_lectures.metadata.zoomMeetingUuid`) — re-delivered webhooks never duplicate.

**Fail-soft**: if the Cloudflare copy fails, the raw Zoom play/download URL is written to `class_sessions.recordingUrl` (students still get a link) and the full context is kept in `class_sessions.metadata.zoomRecording` for a manual re-run.

**Unmatched recordings** (no session found) are logged (`[zoom-recording] No class_sessions match`) and skipped; the recording stays in the Zoom account.

## Required env

| Var                                              | Purpose                                                                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ZOOM_WEBHOOK_SECRET_TOKEN`                      | **NEW** — the Zoom app's "Secret Token" (Feature → Event Subscriptions). Used for both the URL-validation challenge and `x-zm-signature` verification. |
| `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_API_TOKEN` | existing — Cloudflare Stream copy + playback tokens.                                                                                                   |
| `CLOUDFLARE_STREAM_WEBHOOK_SECRET`               | existing — CF processing-status webhook (`/api/lms/webhook`).                                                                                          |

## Owner activation checklist

1. Run `bash scripts/apply-session-recording-link.sh` (adds `class_sessions.videoLectureId`, idempotent).
2. In the Zoom Server-to-Server OAuth app → **Feature → Event Subscriptions**:
   - Add subscription, event: **Recording → All Recordings have completed** (`recording.completed`).
   - Endpoint URL: `https://cerebrumbiologyacademy.com/api/zoom/webhook` (validate — requires step 3 deployed first).
   - Copy the app's **Secret Token** → set `ZOOM_WEBHOOK_SECRET_TOKEN` in Vercel env, redeploy, then click Validate.
3. Ensure teachers' meetings use **cloud recording** (Zoom account setting: Record to cloud, MP4).
4. For matching to work best, sessions should be created with `meetingId` or a `meetingLink` containing the Zoom meeting id (the teacher Session form already has both fields). Optional fallback: set `zoomUserId` inside a teacher's `users.profile` JSON to enable host-id + time-window matching (also needed later for concurrent-Zoom per-teacher hosting).
5. Verify: `GET /api/zoom/webhook` returns `configured: true`; host a test meeting, stop recording, wait for Zoom's email, then check the teacher sessions page chip (Processing → Ready) and the student Videos tab.
