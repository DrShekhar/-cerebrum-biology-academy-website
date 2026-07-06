/**
 * Student-groups provisioning guard
 *
 * The student_groups / student_group_members / group_content tables are
 * created by an owner-run SQL script (scripts/apply-student-groups.sh) and
 * may not exist in every environment yet. Every admin groups endpoint must
 * fail soft with a clear 400 instead of a 500 when the tables are missing.
 */

import { NextResponse } from 'next/server'

export const GROUPS_NOT_PROVISIONED_MESSAGE =
  'Student groups are not provisioned yet. Run scripts/apply-student-groups.sh, then retry.'

// P2021: table does not exist, P2022: column does not exist,
// P2010: raw query failed (older Prisma surfaces missing tables this way)
export function isGroupsNotProvisioned(error: unknown): boolean {
  const code = (error as { code?: string } | null)?.code
  return code === 'P2021' || code === 'P2022' || code === 'P2010'
}

export function groupsNotProvisionedResponse() {
  return NextResponse.json(
    { success: false, error: GROUPS_NOT_PROVISIONED_MESSAGE },
    { status: 400 }
  )
}
