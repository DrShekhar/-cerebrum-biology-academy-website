-- 🗄️ Supabase Row Level Security Setup for Cerebrum Biology Academy
-- Constitutional compliance: Data security at Harvard Medical School standards

-- Enable RLS on all tables
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "enrollments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "payments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "test_attempts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "demo_bookings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "communication_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "analytics_events" ENABLE ROW LEVEL SECURITY;

-- Student data protection policy
CREATE POLICY "Students can only access their own data" ON "users"
FOR ALL TO authenticated
USING (id = auth.uid() OR EXISTS (
    SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'ADMIN'
));

-- Enrollment access policy
CREATE POLICY "Students can only see their enrollments" ON "enrollments"
FOR ALL TO authenticated
USING ("userId" = auth.uid() OR EXISTS (
    SELECT 1 FROM "users" WHERE id = auth.uid() AND role IN ('ADMIN', 'TEACHER')
));

-- Payment security policy
CREATE POLICY "Payment data protection" ON "payments"
FOR ALL TO authenticated
USING ("userId" = auth.uid() OR EXISTS (
    SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'ADMIN'
));

-- Test attempt privacy
CREATE POLICY "Test attempt privacy" ON "test_attempts"
FOR ALL TO authenticated
USING ("freeUserId" = auth.uid() OR EXISTS (
    SELECT 1 FROM "users" WHERE id = auth.uid() AND role IN ('ADMIN', 'TEACHER')
));

-- Demo booking access
CREATE POLICY "Demo booking access" ON "demo_bookings"
FOR ALL TO authenticated
USING ("userId" = auth.uid() OR EXISTS (
    SELECT 1 FROM "users" WHERE id = auth.uid() AND role IN ('ADMIN', 'TEACHER')
));

-- Communication logs security
CREATE POLICY "Communication privacy" ON "communication_logs"
FOR ALL TO authenticated
USING ("userId" = auth.uid() OR EXISTS (
    SELECT 1 FROM "users" WHERE id = auth.uid() AND role IN ('ADMIN', 'TEACHER')
));

-- Analytics privacy
CREATE POLICY "Analytics privacy" ON "analytics_events"
FOR ALL TO authenticated
USING ("userId" = auth.uid() OR EXISTS (
    SELECT 1 FROM "users" WHERE id = auth.uid() AND role = 'ADMIN'
));

-- Enable real-time for educational features
ALTER publication supabase_realtime ADD TABLE "test_attempts";
ALTER publication supabase_realtime ADD TABLE "enrollments";
ALTER publication supabase_realtime ADD TABLE "communication_logs";
ALTER publication supabase_realtime ADD TABLE "analytics_events";

-- Educational Performance Indexes for Cerebrum Biology Academy
-- Harvard Medical School data quality standards

-- Student Performance Analytics
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_attempts_performance
ON "test_attempts" USING GIN ("topicWiseScore");

-- Educational Content Search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_chapter_notes_search
ON "chapter_notes" USING GIN (to_tsvector('english', content));

-- Student Progress Tracking
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_enrollments_progress
ON "enrollments" ("userId", "currentProgress", "lastAccessDate");

-- Payment Performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_payments_status_date
ON "payments" ("status", "createdAt", "userId");

-- Communication Analytics
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_communication_logs_perf
ON "communication_logs" ("type", "status", "sentAt");

-- Quiz Performance Analytics
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_performance
ON "questions" ("topic", "difficulty", "totalAttempts", "correctAttempts");

-- Student Analytics
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_perf
ON "analytics_events" ("eventType", "createdAt", "userId");

-- Demo Booking Efficiency
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_demo_bookings_conversion
ON "demo_bookings" ("status", "createdAt", "convertedToEnrollment");

-- User Activity Tracking
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_activity
ON "users" ("role", "lastActiveAt", "createdAt");

-- Course Performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_enrollment_perf
ON "courses" ("type", "class", "isActive");