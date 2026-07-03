-- Additive: create the canonical system/automation user.
-- Background writers (CRM agents, automation rules, assessment engine) reference
-- userId/createdById = 'system' on activities/notes/followup_rules. Without a
-- matching users row those inserts silently fail the FK constraint.
-- Idempotent; no DROPs. Apply with: prisma db push  (or run directly)

INSERT INTO "users" ("id", "email", "name", "role", "createdAt", "updatedAt")
VALUES (
  'system',
  'system@cerebrumbiologyacademy.com',
  'System (Automation)',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT ("id") DO NOTHING;
