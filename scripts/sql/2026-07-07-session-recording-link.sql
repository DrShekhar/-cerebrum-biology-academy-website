-- Jul 7 2026: Zoom -> Cloudflare recordings pipeline — session <-> video link.
-- Additive only; safe to re-run (IF NOT EXISTS everywhere).
-- Links a class_sessions row to the processed recording in video_lectures.

ALTER TABLE "class_sessions" ADD COLUMN IF NOT EXISTS "videoLectureId" TEXT;

CREATE INDEX IF NOT EXISTS "class_sessions_videoLectureId_idx"
  ON "class_sessions"("videoLectureId");
