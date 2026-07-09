-- YouTube-style free video hub. Additive + idempotent.
CREATE TABLE IF NOT EXISTS "video_playlists" (
  "id" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0, "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "video_playlists_pkey" PRIMARY KEY ("id")
);
CREATE TABLE IF NOT EXISTS "video_items" (
  "id" TEXT NOT NULL, "playlistId" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT,
  "youtubeId" TEXT, "videoLectureId" TEXT, "thumbnailUrl" TEXT, "durationLabel" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0, "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "video_items_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "video_items_playlistId_sortOrder_idx" ON "video_items" ("playlistId", "sortOrder");
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'video_items_playlistId_fkey') THEN
    ALTER TABLE "video_items" ADD CONSTRAINT "video_items_playlistId_fkey"
    FOREIGN KEY ("playlistId") REFERENCES "video_playlists" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
