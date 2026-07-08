/**
 * Catalog of grantable permissions for the admin per-user permission editor.
 *
 * Two kinds live here:
 *  - Feature capabilities (ai:tutor, feature:cbt-simulator, …) — product
 *    features an admin can grant to, or WITHDRAW from, an individual user
 *    (e.g. revoke AI access from a paying student who misuses it).
 *  - Operational permissions (the ROLE_PERMISSIONS keys) — fine-tune what an
 *    individual staff member can do beyond / below their role default.
 *
 * The effective set for a user = role default (ROLE_PERMISSIONS) + per-user
 * GRANT overrides − per-user DENY overrides (DENY wins). See permissions.ts.
 */

import type { UserRole } from './config'

export interface PermissionDef {
  key: string
  label: string
  description: string
  category: string
  /** Roles this permission is relevant to (for grouping/visibility in the UI). */
  appliesTo: UserRole[]
  /**
   * For FEATURE capabilities that are not part of ROLE_PERMISSIONS: whether an
   * applicable role gets it by default (true = on, admin withdraws via DENY;
   * false = off, admin must GRANT). Ignored for operational permissions, whose
   * default comes from ROLE_PERMISSIONS.
   */
  grantedByDefault?: boolean
}

const ALL_ROLES: UserRole[] = ['STUDENT', 'PARENT', 'TEACHER', 'COUNSELOR', 'ADMIN']

export const PERMISSION_CATALOG: PermissionDef[] = [
  // ── AI & smart features (the headline: grant/withdraw per user) ───────────
  {
    key: 'ai:tutor',
    label: 'AI Tutor (CERI/ARIA)',
    description: 'Chat with the AI biology tutor. Withdraw to cut off a misusing user.',
    category: 'AI & smart features',
    appliesTo: ['STUDENT', 'PARENT'],
    grantedByDefault: true,
  },
  {
    key: 'ai:doubt-solver',
    label: 'AI Doubt Solver',
    description: 'Photo/text → instant AI step-by-step solution.',
    category: 'AI & smart features',
    appliesTo: ['STUDENT'],
    grantedByDefault: true,
  },
  {
    key: 'feature:flashcards',
    label: 'Smart Flashcards',
    description: 'Spaced-repetition flashcards over the question bank.',
    category: 'AI & smart features',
    appliesTo: ['STUDENT'],
    grantedByDefault: true,
  },
  {
    key: 'feature:cbt-simulator',
    label: 'CBT Exam Simulator',
    description: 'Full NEET-style computer-based test simulator.',
    category: 'Learning features',
    appliesTo: ['STUDENT'],
    grantedByDefault: true,
  },
  {
    key: 'content:premium',
    label: 'Premium content bypass',
    description: 'Access tier-locked videos & materials regardless of coaching tier.',
    category: 'Learning features',
    appliesTo: ['STUDENT'],
  },

  // ── Teacher operational permissions ───────────────────────────────────────
  {
    key: 'test:create',
    label: 'Create tests',
    description: 'Create test assignments.',
    category: 'Teaching',
    appliesTo: ['TEACHER'],
  },
  {
    key: 'test:edit',
    label: 'Edit tests',
    description: 'Edit test assignments.',
    category: 'Teaching',
    appliesTo: ['TEACHER'],
  },
  {
    key: 'class:manage',
    label: 'Manage classes',
    description: 'Attendance, sessions, schedule.',
    category: 'Teaching',
    appliesTo: ['TEACHER'],
  },
  {
    key: 'assignment:create',
    label: 'Create assignments',
    description: 'Create & grade assignments.',
    category: 'Teaching',
    appliesTo: ['TEACHER'],
  },

  // ── Counselor operational permissions ─────────────────────────────────────
  {
    key: 'lead:view',
    label: 'View leads',
    description: 'See assigned leads in the CRM.',
    category: 'CRM',
    appliesTo: ['COUNSELOR'],
  },
  {
    key: 'lead:assign',
    label: 'Assign leads',
    description: 'Reassign leads between counselors.',
    category: 'CRM',
    appliesTo: ['COUNSELOR'],
  },
  {
    key: 'communication:send',
    label: 'Send communications',
    description: 'Send WhatsApp/email to leads.',
    category: 'CRM',
    appliesTo: ['COUNSELOR'],
  },
  {
    key: 'feeplan:create',
    label: 'Create fee plans',
    description: 'Create fee plans & installments.',
    category: 'CRM',
    appliesTo: ['COUNSELOR'],
  },
  {
    key: 'offer:create',
    label: 'Create offers',
    description: 'Create discount offers for leads.',
    category: 'CRM',
    appliesTo: ['COUNSELOR'],
  },

  // ── Shared ────────────────────────────────────────────────────────────────
  {
    key: 'reports:view',
    label: 'View reports',
    description: 'Access analytics & reports.',
    category: 'Shared',
    appliesTo: ALL_ROLES,
  },
]

export const PERMISSION_BY_KEY: Record<string, PermissionDef> = Object.fromEntries(
  PERMISSION_CATALOG.map((p) => [p.key, p])
)

export const PERMISSION_CATEGORIES: string[] = Array.from(
  new Set(PERMISSION_CATALOG.map((p) => p.category))
)
