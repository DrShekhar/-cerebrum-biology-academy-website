/**
 * Apply the confirmed-missing, idempotent (IF NOT EXISTS) manual migrations to
 * the DB behind DATABASE_URL. Resolves schema drift that makes Prisma reads 500:
 *   - class_sessions.videoLectureId  (unblocks /api/student/sessions + dashboard
 *     "Next class" / "Library" widgets — the immediate blocker)
 *   - push_subscriptions, email_suppressions, marketing_campaigns tables
 *
 * Everything is additive + idempotent; safe to re-run. Uses a $$-aware splitter
 * so DO $$ … $$ blocks stay intact.
 */
import { PrismaClient } from '../src/generated/prisma'
import fs from 'fs'

const prisma = new PrismaClient()

function splitSql(sql: string): string[] {
  const noComments = sql
    .split('\n')
    .map((l) => {
      const i = l.indexOf('--')
      return i >= 0 ? l.slice(0, i) : l
    })
    .join('\n')
  const stmts: string[] = []
  let buf = ''
  let inDollar = false
  for (let i = 0; i < noComments.length; i++) {
    if (noComments.slice(i, i + 2) === '$$') {
      inDollar = !inDollar
      buf += '$$'
      i++
      continue
    }
    const ch = noComments[i]
    if (ch === ';' && !inDollar) {
      if (buf.trim()) stmts.push(buf.trim())
      buf = ''
    } else {
      buf += ch
    }
  }
  if (buf.trim()) stmts.push(buf.trim())
  return stmts
}

async function apply(label: string, statements: string[]) {
  for (const s of statements) await prisma.$executeRawUnsafe(s)
  console.log(`  ✓ ${label} (${statements.length} statement(s))`)
}

async function main() {
  // 1) The sessions-API blocker.
  await apply('class_sessions.videoLectureId', [
    'ALTER TABLE "class_sessions" ADD COLUMN IF NOT EXISTS "videoLectureId" TEXT',
    'CREATE INDEX IF NOT EXISTS "class_sessions_videoLectureId_idx" ON "class_sessions" ("videoLectureId")',
  ])

  // 2) Confirmed-missing additive tables.
  const files = [
    'prisma/manual-migrations/2026-07-04_add_push_subscriptions.sql',
    'prisma/manual-migrations/2026-07-03_add_email_suppressions.sql',
    'prisma/manual-migrations/2026-07-03_add_marketing_campaigns.sql',
  ]
  for (const f of files) {
    await apply(f.split('/').pop() as string, splitSql(fs.readFileSync(f, 'utf8')))
  }
  console.log('All pending migrations applied.')
}

main()
  .catch((e) => {
    console.error('Migration apply failed:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
