/**
 * Apply ONLY the push_subscriptions migration (web-push / VAPID storage) —
 * the migration named in chat. Additive + idempotent (IF NOT EXISTS).
 * Source: prisma/manual-migrations/2026-07-04_add_push_subscriptions.sql
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
  const file = 'prisma/manual-migrations/2026-07-04_add_push_subscriptions.sql'
  const stmts = splitSql(fs.readFileSync(file, 'utf8'))
  for (const s of stmts) await prisma.$executeRawUnsafe(s)
  console.log(`Applied push_subscriptions (${stmts.length} statement(s)).`)
}

main()
  .catch((e) => {
    console.error('Failed:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
