-- Shared task / request board (Jul 8 2026, additive).
-- A single accountable list on the admin panel that ANY staff or student/parent
-- can add to. Items stay OPEN until a staff member resolves them — nothing is
-- lost. Backs the student "raise a ticket / feature request" surfaces too.
-- Status/category/role kept as TEXT (no enum) to avoid enum-ordering migration
-- risk; the app validates the allowed values.

CREATE TABLE IF NOT EXISTS "shared_tasks" (
  "id"             TEXT PRIMARY KEY,
  "title"          TEXT NOT NULL,
  "detail"         TEXT,
  "category"       TEXT NOT NULL DEFAULT 'OTHER',   -- SUPPORT|TECH|FEES|FEATURE|ACADEMIC|OTHER
  "priority"       TEXT NOT NULL DEFAULT 'MEDIUM',  -- LOW|MEDIUM|HIGH
  "status"         TEXT NOT NULL DEFAULT 'OPEN',    -- OPEN|IN_PROGRESS|RESOLVED|WONT_DO
  "createdById"    TEXT NOT NULL,
  "createdByRole"  TEXT NOT NULL,                   -- STUDENT|PARENT|TEACHER|COUNSELOR|ADMIN
  "createdByName"  TEXT,
  "assignedToId"   TEXT,
  "resolvedById"   TEXT,
  "resolvedAt"     TIMESTAMP(3),
  "resolutionNote" TEXT,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "shared_tasks_status_createdAt_idx" ON "shared_tasks"("status", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS "shared_tasks_createdById_idx" ON "shared_tasks"("createdById");
CREATE INDEX IF NOT EXISTS "shared_tasks_assignedToId_idx" ON "shared_tasks"("assignedToId");
