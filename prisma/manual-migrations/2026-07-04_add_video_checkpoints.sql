-- Additive: interactive-video checkpoints (in-video quizzes from the question bank).
-- Idempotent; no DROPs. Apply with: prisma db push (or run directly).

CREATE TABLE IF NOT EXISTS "video_checkpoints" (
  "id"             TEXT NOT NULL,
  "videoLectureId" TEXT NOT NULL,
  "questionId"     TEXT NOT NULL,
  "timeSeconds"    INTEGER NOT NULL,
  "isRequired"     BOOLEAN NOT NULL DEFAULT true,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "video_checkpoints_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "video_checkpoints_videoLectureId_timeSeconds_key"
  ON "video_checkpoints" ("videoLectureId", "timeSeconds");
CREATE INDEX IF NOT EXISTS "video_checkpoints_videoLectureId_idx"
  ON "video_checkpoints" ("videoLectureId");

DO $$
BEGIN
  ALTER TABLE "video_checkpoints"
    ADD CONSTRAINT "video_checkpoints_videoLectureId_fkey"
    FOREIGN KEY ("videoLectureId") REFERENCES "video_lectures" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE "video_checkpoints"
    ADD CONSTRAINT "video_checkpoints_questionId_fkey"
    FOREIGN KEY ("questionId") REFERENCES "questions" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
