-- Additive: global site configuration, key-per-section rows ('general', 'notifications', ...).
-- Replaces the fake Quick Settings save on /admin/settings and the per-admin
-- users.profile.notificationSettings split-brain (system-wide settings were
-- being stored per admin user).
CREATE TABLE IF NOT EXISTS "site_settings" (
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "updatedBy" TEXT,
  CONSTRAINT "site_settings_pkey" PRIMARY KEY ("key")
);
