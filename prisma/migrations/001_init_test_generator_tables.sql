-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'PARENT', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE');

-- CreateEnum
CREATE TYPE "StudentClass" AS ENUM ('CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PaymentPlan" AS ENUM ('FULL', 'QUARTERLY', 'MONTHLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "DemoBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('RAZORPAY_UPI', 'RAZORPAY_CARD', 'RAZORPAY_NETBANKING', 'RAZORPAY_WALLET', 'BANK_TRANSFER', 'CASH', 'CHEQUE');

-- CreateEnum
CREATE TYPE "CommunicationType" AS ENUM ('WELCOME_MESSAGE', 'DEMO_CONFIRMATION', 'DEMO_REMINDER', 'ENROLLMENT_CONFIRMATION', 'PAYMENT_REMINDER', 'COURSE_UPDATE', 'MARKETING_MESSAGE', 'SUPPORT_MESSAGE', 'FEEDBACK_REQUEST', 'CUSTOM_MESSAGE');

-- CreateEnum
CREATE TYPE "CommunicationChannel" AS ENUM ('WHATSAPP', 'EMAIL', 'SMS', 'PHONE_CALL', 'IN_APP_NOTIFICATION');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MCQ', 'SHORT_ANSWER', 'DIAGRAM', 'TRUE_FALSE', 'FILL_BLANK', 'MULTIPLE_SELECT', 'MATCH_FOLLOWING', 'NUMERICAL');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD', 'EXPERT');

-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('PRACTICE', 'MOCK_TEST', 'PREVIOUS_YEAR', 'CONCEPT_BUILDER', 'COMPETITIVE');

-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('PRACTICE_TEST', 'MOCK_TEST', 'FULL_TEST', 'QUICK_TEST', 'ADAPTIVE_TEST', 'TIMED_TEST', 'DIAGNOSTIC_TEST');

-- CreateEnum
CREATE TYPE "TestCategory" AS ENUM ('TOPIC_WISE', 'SUBJECT_WISE', 'FULL_SYLLABUS', 'CHAPTER_WISE', 'DIFFICULTY_WISE', 'PREVIOUS_YEAR', 'MIXED');

-- CreateEnum
CREATE TYPE "TestSessionStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'EXPIRED', 'ABANDONED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "QuestionBankCategory" AS ENUM ('NEET_PREVIOUS_YEAR', 'CBSE_BOARD', 'NCERT_BASED', 'COMPETITIVE', 'CONCEPT_BUILDER', 'CUSTOM', 'PRACTICE_SET');

-- CreateEnum
CREATE TYPE "ResponseMode" AS ENUM ('TEST_MODE', 'PRACTICE_MODE', 'REVIEW_MODE', 'STUDY_MODE');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('QUESTION', 'DISCUSSION', 'TIP', 'RESOURCE', 'ANNOUNCEMENT');

-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('FIRST_TEST', 'STREAK_7_DAYS', 'STREAK_30_DAYS', 'TOPIC_MASTER', 'SPEED_DEMON', 'PERFECTIONIST', 'COMMUNITY_HELPER', 'BOOKWORM');

-- Create indexes for performance optimization
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_last_active ON users("lastActiveAt");

-- Create indexes for test sessions (critical for real-time performance)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_sessions_token ON test_sessions("sessionToken");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_sessions_user_status ON test_sessions("userId", status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_sessions_free_user_status ON test_sessions("freeUserId", status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_sessions_template_submitted ON test_sessions("testTemplateId", "submittedAt");

-- Create indexes for questions (for fast question retrieval)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_topic_difficulty ON questions(topic, difficulty);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_curriculum_grade ON questions(curriculum, grade);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_subject_type ON questions(subject, type);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_popularity ON questions("popularityScore");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_active_verified ON questions("isActive", "isVerified");

-- Create indexes for user responses (for analytics)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_responses_user_answered ON user_question_responses("userId", "answeredAt");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_responses_free_user_answered ON user_question_responses("freeUserId", "answeredAt");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_responses_question_correct ON user_question_responses("questionId", "isCorrect");

-- Create indexes for user progress tracking
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_progress_topic_mastery ON user_progress(topic, "masteryScore");

-- Create indexes for test templates
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_templates_type_category ON test_templates(type, category);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_templates_curriculum_grade ON test_templates(curriculum, grade);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_templates_active_published ON test_templates("isActive", "isPublished");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_templates_popularity ON test_templates("popularityScore");

-- Create partial indexes for better performance on filtered queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_questions_active_only ON questions(id) WHERE "isActive" = true;
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_sessions_active ON test_sessions(id) WHERE status IN ('IN_PROGRESS', 'PAUSED');
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_test_templates_published ON test_templates(id) WHERE "isPublished" = true;

-- Add performance reports indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_performance_reports_type_period ON performance_reports("reportType", "periodStart");

-- Question bank indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_question_bank_questions_bank_order ON question_bank_questions("questionBankId", "orderIndex");