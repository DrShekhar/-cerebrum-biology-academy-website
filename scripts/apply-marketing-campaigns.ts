/**
 * Apply ONLY the marketing_campaigns migration (admin marketing section table) —
 * the migration named in chat. Additive + idempotent (IF NOT EXISTS).
 * Source: prisma/manual-migrations/2026-07-03_add_marketing_campaigns.sql
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
  // $$-aware split: don't break on semicolons inside DO $$ ... $$ blocks.
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

async function main() {
  const file = 'prisma/manual-migrations/2026-07-03_add_marketing_campaigns.sql'
  const stmts = splitSql(fs.readFileSync(file, 'utf8'))
  for (const s of stmts) await prisma.$executeRawUnsafe(s)
  console.log(`Applied marketing_campaigns (${stmts.length} statement(s)).`)
}

main()
  .catch((e) => {
    console.error('Failed:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
