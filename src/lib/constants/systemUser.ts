import { prisma } from '@/lib/prisma'

/**
 * Canonical system/automation actor.
 *
 * Background writers (CRM agents, automation rules, the assessment engine) need
 * a `users` row to satisfy the userId/createdById foreign keys on activities,
 * notes and followup_rules. Historically they wrote the bare string 'system',
 * which is not a real users row → silent FK violation. This is that row's id.
 *
 * The row is created by prisma/manual-migrations/2026-07-03_add_system_user.sql
 * (and the seed). `ensureSystemUser()` is a runtime safety net that upserts it
 * once per process so these writes succeed even on a DB where the migration
 * has not been applied yet.
 */
export const SYSTEM_USER_ID = 'system'
export const SYSTEM_USER_EMAIL = 'system@cerebrumbiologyacademy.com'

let ensured = false

export async function ensureSystemUser(): Promise<string> {
  if (ensured) return SYSTEM_USER_ID
  try {
    await prisma.users.upsert({
      where: { id: SYSTEM_USER_ID },
      update: {},
      create: {
        id: SYSTEM_USER_ID,
        email: SYSTEM_USER_EMAIL,
        name: 'System (Automation)',
        role: 'ADMIN',
        updatedAt: new Date(),
      },
    })
    ensured = true
  } catch {
    // Non-fatal: callers are fire-and-forget. Worst case the individual write
    // still FK-fails and is caught, exactly as before this helper existed.
  }
  return SYSTEM_USER_ID
}
