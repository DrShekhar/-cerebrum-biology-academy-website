/**
 * Completes seed-sample-lms-content.ts: inserts the recorded-live-class
 * class_sessions row via RAW SQL, listing only columns that exist in prod.
 * (Prisma's upsert selects class_sessions.videoLectureId, which prod lacks until
 * the video_hub migration is applied — raw SQL sidesteps that.) Idempotent.
 */
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()
const OWNER_ID = '698d55a2-ce86-45d8-9da6-eaa7920e0072'
const RECORDING_URL = 'https://www.youtube.com/live/chwNnKR-mcw'

async function main() {
  const now = new Date()
  const start = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
  const end = new Date(start.getTime() + 120 * 60 * 1000)

  const n = await prisma.$executeRaw`
    INSERT INTO class_sessions
      (id, "courseId", title, description, "sessionType", "scheduledDate",
       "startTime", "endTime", duration, "teacherId", status, "recordingUrl",
       "createdAt", "updatedAt")
    VALUES
      ('cs_recorded_live_neet', 'class-11', 'NEET Biology — Live Class (Recording)',
       'Recording of a live NEET Biology class. Watch the full session below.',
       ${'REGULAR'}::"SessionType", ${start}, ${start}, ${end}, 120, ${OWNER_ID},
       ${'COMPLETED'}::"SessionStatus", ${RECORDING_URL}, ${now}, ${now})
    ON CONFLICT (id) DO UPDATE SET
      status = ${'COMPLETED'}::"SessionStatus",
      "recordingUrl" = ${RECORDING_URL},
      "updatedAt" = ${now}
  `
  console.log(`Recorded class upserted (${n} row).`)
}

main()
  .catch((e) => {
    console.error('Failed:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
