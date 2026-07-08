/**
 * Per-user permission resolution.
 *
 * Effective(user) = role default − DENY overrides + GRANT overrides, where the
 * role default comes from ROLE_PERMISSIONS for operational permissions and from
 * the catalog's `grantedByDefault` for feature capabilities. There is at most
 * one override row per (user, permission), so there is no GRANT/DENY tie.
 *
 * Expired overrides (expiresAt in the past) are ignored — they fall back to the
 * default automatically.
 */

import { prisma } from '@/lib/prisma'
import { ROLE_PERMISSIONS, type UserRole } from './config'
import { PERMISSION_BY_KEY } from './permissionCatalog'

export type OverrideEffect = 'GRANT' | 'DENY'

/** Whether the role grants this permission BEFORE per-user overrides. */
export function isDefaultGranted(permission: string, role: UserRole): boolean {
  if (role === 'ADMIN') return true // ROLE_PERMISSIONS.ADMIN === ['*']
  const rolePerms = ROLE_PERMISSIONS[role] || []
  if (rolePerms.includes('*') || rolePerms.includes(permission)) return true
  // Feature capability not in ROLE_PERMISSIONS: use the catalog default.
  const def = PERMISSION_BY_KEY[permission]
  return !!(def && def.grantedByDefault && def.appliesTo.includes(role))
}

type OverrideRow = { permission: string; effect: string; expiresAt: Date | null }

function activeOverrides(rows: OverrideRow[]): Map<string, OverrideEffect> {
  const now = Date.now()
  const map = new Map<string, OverrideEffect>()
  for (const r of rows) {
    if (r.expiresAt && r.expiresAt.getTime() < now) continue // expired → ignore
    if (r.effect === 'GRANT' || r.effect === 'DENY') map.set(r.permission, r.effect)
  }
  return map
}

/** Resolve a single permission for a user (role + persisted overrides). */
export async function userHasPermission(
  userId: string,
  role: UserRole,
  permission: string
): Promise<boolean> {
  const base = isDefaultGranted(permission, role)
  try {
    const row = await prisma.user_permission_overrides.findUnique({
      where: { userId_permission: { userId, permission } },
      select: { permission: true, effect: true, expiresAt: true },
    })
    if (!row) return base
    const eff = activeOverrides([row]).get(permission)
    if (eff === 'GRANT') return true
    if (eff === 'DENY') return false
    return base
  } catch {
    // Never let an override-lookup failure harden a default-open feature into
    // a lockout — fall back to the role default.
    return base
  }
}

/** All active overrides for a user, as a map keyed by permission. */
export async function getUserOverrides(userId: string): Promise<Map<string, OverrideEffect>> {
  try {
    const rows = await prisma.user_permission_overrides.findMany({
      where: { userId },
      select: { permission: true, effect: true, expiresAt: true },
    })
    return activeOverrides(rows)
  } catch {
    return new Map()
  }
}
