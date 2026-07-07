-- Guarded apply of the phoneNormalized unique index.
-- ABORTS (no changes) if duplicate phoneNormalized groups still exist —
-- run POST /api/admin/leads/merge-duplicates first.
DO $$
DECLARE dupes integer;
BEGIN
  SELECT count(*) INTO dupes FROM (
    SELECT "phoneNormalized" FROM "leads"
    WHERE "phoneNormalized" IS NOT NULL
    GROUP BY "phoneNormalized" HAVING count(*) > 1
  ) d;
  IF dupes > 0 THEN
    RAISE EXCEPTION 'Cannot create unique index: % duplicate phoneNormalized group(s) remain. Run /api/admin/leads/merge-duplicates first.', dupes;
  END IF;
END $$;

-- NULLs are allowed to repeat (rows with an unparseable/short phone).
CREATE UNIQUE INDEX IF NOT EXISTS "leads_phoneNormalized_unique"
  ON "leads" ("phoneNormalized")
  WHERE "phoneNormalized" IS NOT NULL;
