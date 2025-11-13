-- Disable Row Level Security (RLS) on CRM tables
-- This allows Prisma ORM to write directly to tables without Supabase auth layer
-- IMPORTANT: Only for development/testing. Production should use RLS policies.

-- Core CRM tables
ALTER TABLE "User" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Task" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Communication" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Activity" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Note" DISABLE ROW LEVEL SECURITY;

-- Payment and enrollment tables
ALTER TABLE "FeePlan" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Installment" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "FeePayment" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Offer" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Enrollment" DISABLE ROW LEVEL SECURITY;

-- Demo and templates
ALTER TABLE "DemoBooking" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "MessageTemplate" DISABLE ROW LEVEL SECURITY;

-- Notification tracking
ALTER TABLE "Notification" DISABLE ROW LEVEL SECURITY;

-- Verification: Show RLS status for all tables
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'User', 'Lead', 'Task', 'Communication', 'Activity', 'Note',
    'FeePlan', 'Installment', 'FeePayment', 'Offer', 'Enrollment',
    'DemoBooking', 'MessageTemplate', 'Notification'
  )
ORDER BY tablename;
