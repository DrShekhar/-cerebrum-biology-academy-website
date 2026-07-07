-- First-class UTM attribution on leads (smart-CRM wave 3, additive).
-- Previously UTM lived only in activities.metadata JSON — unqueryable for
-- source-ROI reporting.
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utmSource" TEXT;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utmMedium" TEXT;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utmCampaign" TEXT;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utmTerm" TEXT;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utmContent" TEXT;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "referrerUrl" TEXT;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "fbclid" TEXT;
CREATE INDEX IF NOT EXISTS "leads_utmSource_utmCampaign_idx" ON "leads"("utmSource", "utmCampaign");
