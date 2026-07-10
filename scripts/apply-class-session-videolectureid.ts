/**
 * Apply ONLY the class_sessions.videoLectureId column (+ its index) — the exact
 * fix named in chat: `ALTER TABLE class_sessions ADD COLUMN IF NOT EXISTS
 * "videoLectureId" TEXT`. This unblocks Prisma reads of class_sessions, i.e.
 * /api/student/sessions and the dashboard "Next class" / "Library" widgets, so
 * the seeded recorded class becomes visible. Additive + idempotent.
 */
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.$executeRawUnsafe(
    'ALTER TABLE "class_sessions" ADD COLUMN IF NOT EXISTS "videoLectureId" TEXT'
  )
  await prisma.$executeRawUnsafe(
    'CREATE INDEX IF NOT EXISTS "class_sessions_videoLectureId_idx" ON "class_sessions" ("videoLectureId")'
  )
  console.log('Applied: class_sessions.videoLectureId column + index.')
}

main()
  .catch((e) => {
    console.error('Failed:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
