/**
 * Apply ONLY the users.isActive migration — the migration named in chat, to
 * repair the broken new-lead capture (users.isActive filter referenced but the
 * column never existed). Additive + idempotent (ADD COLUMN IF NOT EXISTS).
 * Source: prisma/manual-migrations/2026-07-14_add_users_isActive.sql
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
  const file = 'prisma/manual-migrations/2026-07-14_add_users_isActive.sql'
  const stmts = splitSql(fs.readFileSync(file, 'utf8'))
  for (const s of stmts) await prisma.$executeRawUnsafe(s)

  const rows = await prisma.$queryRawUnsafe<{ exists: boolean }[]>(
    `SELECT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_schema='public' AND table_name='users' AND column_name='isActive'
     ) AS exists`
  )
  console.log(
    `Applied users.isActive (${stmts.length} statement(s)). column_exists=${rows?.[0]?.exists}`
  )
}

main()
  .catch((e) => {
    console.error('Failed:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
