/**
 * True when a query failed because the relation/column does not exist yet in
 * the database — i.e. a manual migration is still pending. Lets a route degrade
 * gracefully (serve an empty result rather than 500) until the owner applies
 * the migration, instead of showing a hard error on a public/reachable page.
 *
 * P2021 = table does not exist. P2022 = column does not exist.
 * See prisma/manual-migrations/2026-07-21_apply_pending_feature_and_event_tables.sql
 */
export function isMissingRelationError(error: unknown): boolean {
  const code = (error as { code?: unknown } | null)?.code
  return code === 'P2021' || code === 'P2022'
}
