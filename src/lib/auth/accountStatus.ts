/**
 * Whether a staff/user account has been disabled (offboarded or suspended) and
 * must be refused at every login and session-validation path.
 *
 * A staff "delete" is a soft-delete: the DELETE handler sets isActive=false and
 * profile.status='deleted'. Two signals are checked because rows deleted before
 * isActive syncing existed still carry only profile.status='deleted' with
 * isActive=true. Legacy rows predate the isActive column (null/undefined) and
 * must stay enabled — ONLY an explicit isActive===false or a deleted/suspended
 * status disables an account, so ordinary students (no profile.status) are never
 * locked out.
 */
export function isAccountDisabled(user: { isActive?: boolean | null; profile?: unknown }): boolean {
  if (user?.isActive === false) return true
  const status = (user?.profile as { status?: string } | null | undefined)?.status
  return status === 'deleted' || status === 'suspended'
}
