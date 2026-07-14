/**
 * Apply ONLY the class_reminder_log migration (dedup ledger for the
 * class-reminders cron) — the migration named in chat. Additive + idempotent
 * (IF NOT EXISTS).
 * Source: prisma/manual-migrations/2026-07-12_add_class_reminder_log.sql
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
  return noComments
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
}

async function main() {
  const file = 'prisma/manual-migrations/2026-07-12_add_class_reminder_log.sql'
  const stmts = splitSql(fs.readFileSync(file, 'utf8'))
  for (const s of stmts) await prisma.$executeRawUnsafe(s)

  // Verify in the same connection.
  const rows = await prisma.$queryRawUnsafe<{ exists: boolean }[]>(
    `SELECT to_regclass('public.class_reminder_log') IS NOT NULL AS exists`
  )
  console.log(
    `Applied class_reminder_log (${stmts.length} statement(s)). table_exists=${rows?.[0]?.exists}`
  )
}

main()
  .catch((e) => {
    console.error('Failed:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
