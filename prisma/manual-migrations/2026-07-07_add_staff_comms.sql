-- Additive: internal staff communication (Jul 2026 refactor Stage 4).
-- staff_channels/members/messages = team chat; staff_notifications = the
-- bell store; notes gains threaded replies + @mentions for lead comments.
-- Idempotent — safe to re-run.

DO $$ BEGIN
  CREATE TYPE "StaffChannelType" AS ENUM ('TEAM', 'DIRECT');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "staff_channels" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "type" "StaffChannelType" NOT NULL DEFAULT 'TEAM',
  "isArchived" BOOLEAN NOT NULL DEFAULT false,
  "lastMessageAt" TIMESTAMP(3),
  "createdById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "staff_channels_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "staff_channels_createdById_fkey" FOREIGN KEY ("createdById")
    REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "staff_channels_isArchived_lastMessageAt_idx"
  ON "staff_channels" ("isArchived", "lastMessageAt");

CREATE TABLE IF NOT EXISTS "staff_channel_members" (
  "id" TEXT NOT NULL,
  "channelId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'MEMBER',
  "lastReadAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "staff_channel_members_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "staff_channel_members_channelId_fkey" FOREIGN KEY ("channelId")
    REFERENCES "staff_channels"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "staff_channel_members_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "staff_channel_members_channelId_userId_key"
  ON "staff_channel_members" ("channelId", "userId");
CREATE INDEX IF NOT EXISTS "staff_channel_members_userId_idx"
  ON "staff_channel_members" ("userId");

CREATE TABLE IF NOT EXISTS "staff_messages" (
  "id" TEXT NOT NULL,
  "channelId" TEXT NOT NULL,
  "senderId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "mentionedUserIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "attachments" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "editedAt" TIMESTAMP(3),
  "deletedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "staff_messages_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "staff_messages_channelId_fkey" FOREIGN KEY ("channelId")
    REFERENCES "staff_channels"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "staff_messages_senderId_fkey" FOREIGN KEY ("senderId")
    REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "staff_messages_channelId_createdAt_idx"
  ON "staff_messages" ("channelId", "createdAt");
CREATE INDEX IF NOT EXISTS "staff_messages_senderId_idx"
  ON "staff_messages" ("senderId");

CREATE TABLE IF NOT EXISTS "staff_notifications" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "actorId" TEXT,
  "href" TEXT NOT NULL,
  "leadId" TEXT,
  "channelId" TEXT,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "readAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "staff_notifications_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "staff_notifications_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "staff_notifications_userId_isRead_idx"
  ON "staff_notifications" ("userId", "isRead");
CREATE INDEX IF NOT EXISTS "staff_notifications_userId_createdAt_idx"
  ON "staff_notifications" ("userId", "createdAt");

-- drip sequences: counselor-authored WhatsApp sequences (definitions only;
-- the nurturing processor reading these is a separate owner-approved change)
CREATE TABLE IF NOT EXISTS "drip_sequences" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "triggerStage" TEXT NOT NULL,
  "stopOnStageChange" BOOLEAN NOT NULL DEFAULT true,
  "isActive" BOOLEAN NOT NULL DEFAULT false,
  "createdById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "drip_sequences_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "drip_sequences_triggerStage_isActive_idx"
  ON "drip_sequences" ("triggerStage", "isActive");

CREATE TABLE IF NOT EXISTS "drip_sequence_steps" (
  "id" TEXT NOT NULL,
  "sequenceId" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "delayHours" INTEGER NOT NULL,
  "channel" TEXT NOT NULL DEFAULT 'WHATSAPP',
  "body" TEXT NOT NULL,
  CONSTRAINT "drip_sequence_steps_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "drip_sequence_steps_sequenceId_fkey" FOREIGN KEY ("sequenceId")
    REFERENCES "drip_sequences"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "drip_sequence_steps_sequenceId_order_key"
  ON "drip_sequence_steps" ("sequenceId", "order");

-- notices + notice_reads: discovered ABSENT in prod (Jul 7 2026) — the
-- student noticeboard feature was silently broken. Created here so both the
-- existing student flows and the new role-targeted announcements work.
CREATE TABLE IF NOT EXISTS "notices" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'ANNOUNCEMENT',
  "targetType" TEXT NOT NULL DEFAULT 'ALL',
  "targetCourseIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "targetBatchIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "targetUserIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "groupId" TEXT,
  "priority" INTEGER NOT NULL DEFAULT 0,
  "isPinned" BOOLEAN NOT NULL DEFAULT false,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "attachments" JSONB,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "publishedAt" TIMESTAMP(3),
  "expiresAt" TIMESTAMP(3),
  "createdById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "notices_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "notices_createdById_fkey" FOREIGN KEY ("createdById")
    REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "notices_category_idx" ON "notices" ("category");
CREATE INDEX IF NOT EXISTS "notices_isActive_publishedAt_idx" ON "notices" ("isActive", "publishedAt");
CREATE INDEX IF NOT EXISTS "notices_targetType_idx" ON "notices" ("targetType");
CREATE INDEX IF NOT EXISTS "notices_createdById_idx" ON "notices" ("createdById");
CREATE INDEX IF NOT EXISTS "notices_groupId_idx" ON "notices" ("groupId");

CREATE TABLE IF NOT EXISTS "notice_reads" (
  "id" TEXT NOT NULL,
  "noticeId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "notice_reads_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "notice_reads_noticeId_fkey" FOREIGN KEY ("noticeId")
    REFERENCES "notices"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "notice_reads_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "notice_reads_noticeId_userId_key"
  ON "notice_reads" ("noticeId", "userId");
CREATE INDEX IF NOT EXISTS "notice_reads_userId_idx" ON "notice_reads" ("userId");
CREATE INDEX IF NOT EXISTS "notice_reads_noticeId_idx" ON "notice_reads" ("noticeId");

-- notices: role-targeted staff announcements (targetType 'ROLES')
ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "targetRoles" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- notes: threaded replies + mentions (lead comments)
ALTER TABLE "notes" ADD COLUMN IF NOT EXISTS "parentId" TEXT;
ALTER TABLE "notes" ADD COLUMN IF NOT EXISTS "mentionedUserIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
DO $$ BEGIN
  ALTER TABLE "notes" ADD CONSTRAINT "notes_parentId_fkey" FOREIGN KEY ("parentId")
    REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS "notes_parentId_idx" ON "notes" ("parentId");
