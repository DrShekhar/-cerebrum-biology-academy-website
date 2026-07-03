-- PHASE 2 (run ONLY after de-duplicating leads):
--   1. Apply 2026-07-03_add_leads_phoneNormalized.sql (column + backfill).
--   2. Run POST /api/admin/leads/merge-duplicates (dryRun first, then real).
--   3. Confirm zero remaining dupes:
--        SELECT "phoneNormalized", COUNT(*) FROM "leads"
--        WHERE "phoneNormalized" IS NOT NULL
--        GROUP BY "phoneNormalized" HAVING COUNT(*) > 1;
--      This must return 0 rows, otherwise the unique index creation will FAIL.
--   4. Then apply this file.
-- After this, upsertLead can be switched to an atomic upsert on phoneNormalized
-- to fully eliminate the concurrent-duplicate-lead race.
-- NULLs are allowed to repeat under a Postgres unique index (rows with an
-- unparseable/short phone stay NULL and don't conflict).

CREATE UNIQUE INDEX IF NOT EXISTS "leads_phoneNormalized_unique"
  ON "leads" ("phoneNormalized")
  WHERE "phoneNormalized" IS NOT NULL;
