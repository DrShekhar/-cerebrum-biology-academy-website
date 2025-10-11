-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('STUDENT', 'PARENT', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."CourseType" AS ENUM ('NEET_COMPLETE', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION', 'CRASH_COURSE');

-- CreateEnum
CREATE TYPE "public"."StudentClass" AS ENUM ('CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION');

-- CreateEnum
CREATE TYPE "public"."EnrollmentStatus" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."PaymentPlan" AS ENUM ('FULL', 'QUARTERLY', 'MONTHLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."DemoBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('RAZORPAY_UPI', 'RAZORPAY_CARD', 'RAZORPAY_NETBANKING', 'RAZORPAY_WALLET', 'BANK_TRANSFER', 'CASH', 'CHEQUE');

-- CreateEnum
CREATE TYPE "public"."CommunicationType" AS ENUM ('WELCOME_MESSAGE', 'DEMO_CONFIRMATION', 'DEMO_REMINDER', 'ENROLLMENT_CONFIRMATION', 'PAYMENT_REMINDER', 'COURSE_UPDATE', 'MARKETING_MESSAGE', 'SUPPORT_MESSAGE', 'FEEDBACK_REQUEST', 'CUSTOM_MESSAGE');

-- CreateEnum
CREATE TYPE "public"."CommunicationChannel" AS ENUM ('WHATSAPP', 'EMAIL', 'SMS', 'PHONE_CALL', 'IN_APP_NOTIFICATION');

-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('MCQ', 'SHORT_ANSWER', 'DIAGRAM', 'TRUE_FALSE', 'FILL_BLANK');

-- CreateEnum
CREATE TYPE "public"."TestStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."PostType" AS ENUM ('QUESTION', 'DISCUSSION', 'TIP', 'RESOURCE', 'ANNOUNCEMENT');

-- CreateEnum
CREATE TYPE "public"."AchievementType" AS ENUM ('FIRST_TEST', 'STREAK_7_DAYS', 'STREAK_30_DAYS', 'TOPIC_MASTER', 'SPEED_DEMON', 'PERFECTIONIST', 'COMMUNITY_HELPER', 'BOOKWORM');

-- CreateEnum
CREATE TYPE "public"."MaterialType" AS ENUM ('PDF_NOTES', 'PDF_ASSIGNMENT', 'PDF_PRACTICE_PAPER', 'PDF_REFERENCE', 'PDF_EBOOK', 'VIDEO', 'LINK');

-- CreateEnum
CREATE TYPE "public"."AccessLevel" AS ENUM ('FREE', 'ENROLLED', 'PREMIUM', 'SPECIFIC_COURSE');

-- CreateEnum
CREATE TYPE "public"."ProgressStatus" AS ENUM ('NOT_STARTED', 'VIEWED', 'IN_PROGRESS', 'DOWNLOADED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('NEW_MATERIAL', 'ASSIGNMENT_REMINDER', 'COURSE_UPDATE', 'ANNOUNCEMENT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."NotificationStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "name" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'STUDENT',
    "passwordHash" TEXT,
    "emailVerified" TIMESTAMP(3),
    "phoneVerified" TIMESTAMP(3),
    "profile" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "public"."CourseType" NOT NULL,
    "class" "public"."StudentClass" NOT NULL,
    "duration" INTEGER NOT NULL,
    "totalFees" INTEGER NOT NULL,
    "syllabus" JSONB,
    "features" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."enrollments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" "public"."EnrollmentStatus" NOT NULL DEFAULT 'PENDING',
    "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "totalFees" INTEGER NOT NULL,
    "paidAmount" INTEGER NOT NULL DEFAULT 0,
    "pendingAmount" INTEGER NOT NULL DEFAULT 0,
    "paymentPlan" "public"."PaymentPlan" NOT NULL DEFAULT 'FULL',
    "currentProgress" INTEGER NOT NULL DEFAULT 0,
    "lastAccessDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."demo_bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "courseId" TEXT,
    "studentName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "studentClass" "public"."StudentClass",
    "preferredDate" TEXT NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "message" TEXT,
    "status" "public"."DemoBookingStatus" NOT NULL DEFAULT 'PENDING',
    "assignedTo" TEXT,
    "followUpDate" TIMESTAMP(3),
    "remindersSent" INTEGER NOT NULL DEFAULT 0,
    "demoCompleted" BOOLEAN NOT NULL DEFAULT false,
    "demoRating" INTEGER,
    "demoFeedback" TEXT,
    "convertedToEnrollment" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "demo_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enrollmentId" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    "transactionId" TEXT,
    "failureReason" TEXT,
    "installmentNumber" INTEGER,
    "totalInstallments" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."communication_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "demoBookingId" TEXT,
    "type" "public"."CommunicationType" NOT NULL,
    "channel" "public"."CommunicationChannel" NOT NULL,
    "content" TEXT NOT NULL,
    "subject" TEXT,
    "status" "public"."MessageStatus" NOT NULL DEFAULT 'SENT',
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "whatsappMessageId" TEXT,
    "emailMessageId" TEXT,
    "templateId" TEXT,
    "templateData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "communication_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."analytics_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "eventType" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "properties" JSONB,
    "pagePath" TEXT,
    "pageTitle" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "ipAddress" TEXT,
    "country" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."free_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "grade" TEXT,
    "curriculum" TEXT,
    "school" TEXT,
    "city" TEXT,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "studyStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),
    "preferences" JSONB,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "free_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chapter_notes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "curriculum" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "subject" TEXT NOT NULL DEFAULT 'Biology',
    "chapter" TEXT NOT NULL,
    "topic" TEXT,
    "content" TEXT NOT NULL,
    "summary" TEXT,
    "keyPoints" JSONB,
    "diagrams" JSONB,
    "difficulty" TEXT NOT NULL DEFAULT 'Medium',
    "estimatedTime" INTEGER,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "metaDescription" TEXT,
    "tags" JSONB,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapter_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."questions" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "subtopic" TEXT,
    "curriculum" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "type" "public"."QuestionType" NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'Medium',
    "question" TEXT NOT NULL,
    "options" JSONB,
    "correctAnswer" TEXT NOT NULL,
    "explanation" TEXT,
    "source" TEXT,
    "marks" INTEGER NOT NULL DEFAULT 1,
    "timeLimit" INTEGER,
    "tags" JSONB,
    "totalAttempts" INTEGER NOT NULL DEFAULT 0,
    "correctAttempts" INTEGER NOT NULL DEFAULT 0,
    "averageTime" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."test_attempts" (
    "id" TEXT NOT NULL,
    "freeUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topics" JSONB,
    "difficulty" TEXT NOT NULL,
    "questionCount" INTEGER NOT NULL,
    "timeLimit" INTEGER,
    "score" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "topicWiseScore" JSONB NOT NULL,
    "strengthAreas" JSONB,
    "weaknessAreas" JSONB,
    "recommendations" JSONB,
    "status" "public"."TestStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "test_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."test_questions" (
    "id" TEXT NOT NULL,
    "testAttemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedAnswer" TEXT,
    "isCorrect" BOOLEAN,
    "timeSpent" INTEGER,
    "marksAwarded" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "test_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."bookmarks" (
    "id" TEXT NOT NULL,
    "freeUserId" TEXT NOT NULL,
    "chapterNoteId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."study_plans" (
    "id" TEXT NOT NULL,
    "freeUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetExam" TEXT NOT NULL,
    "examDate" TIMESTAMP(3),
    "schedule" JSONB NOT NULL,
    "currentWeek" INTEGER NOT NULL DEFAULT 1,
    "totalWeeks" INTEGER NOT NULL,
    "completedTopics" JSONB,
    "currentTopic" TEXT,
    "overallProgress" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "study_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."forum_posts" (
    "id" TEXT NOT NULL,
    "freeUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "type" "public"."PostType" NOT NULL DEFAULT 'QUESTION',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forum_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."forum_replies" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forum_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."achievements" (
    "id" TEXT NOT NULL,
    "freeUserId" TEXT NOT NULL,
    "type" "public"."AchievementType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "currentProgress" INTEGER NOT NULL DEFAULT 0,
    "targetProgress" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "earnedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chapters" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."topics" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."study_materials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "materialType" "public"."MaterialType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "courseId" TEXT,
    "chapterId" TEXT,
    "topicId" TEXT,
    "tags" JSONB,
    "accessLevel" "public"."AccessLevel" NOT NULL DEFAULT 'ENROLLED',
    "requiredCourseId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT,
    "uploadedBy" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "totalDownloads" INTEGER NOT NULL DEFAULT 0,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "study_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."material_access" (
    "id" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "grantedBy" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "reason" TEXT,

    CONSTRAINT "material_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."material_progress" (
    "id" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "firstViewedAt" TIMESTAMP(3),
    "lastViewedAt" TIMESTAMP(3),
    "downloadedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "currentPage" INTEGER,
    "totalPages" INTEGER,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "feedback" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."content_notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "targetUserIds" JSONB,
    "targetCourseIds" JSONB,
    "sendToAll" BOOLEAN NOT NULL DEFAULT false,
    "materialId" TEXT,
    "courseId" TEXT,
    "channels" JSONB NOT NULL,
    "scheduledFor" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "status" "public"."NotificationStatus" NOT NULL DEFAULT 'DRAFT',
    "recipientCount" INTEGER NOT NULL DEFAULT 0,
    "deliveredCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "public"."sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_userId_courseId_key" ON "public"."enrollments"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpayOrderId_key" ON "public"."payments"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpayPaymentId_key" ON "public"."payments"("razorpayPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "free_users_email_key" ON "public"."free_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "chapter_notes_slug_key" ON "public"."chapter_notes"("slug");

-- CreateIndex
CREATE INDEX "chapter_notes_curriculum_grade_chapter_idx" ON "public"."chapter_notes"("curriculum", "grade", "chapter");

-- CreateIndex
CREATE INDEX "chapter_notes_slug_idx" ON "public"."chapter_notes"("slug");

-- CreateIndex
CREATE INDEX "questions_topic_difficulty_idx" ON "public"."questions"("topic", "difficulty");

-- CreateIndex
CREATE INDEX "questions_curriculum_grade_idx" ON "public"."questions"("curriculum", "grade");

-- CreateIndex
CREATE INDEX "test_attempts_freeUserId_startedAt_idx" ON "public"."test_attempts"("freeUserId", "startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "test_questions_testAttemptId_questionId_key" ON "public"."test_questions"("testAttemptId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_freeUserId_chapterNoteId_key" ON "public"."bookmarks"("freeUserId", "chapterNoteId");

-- CreateIndex
CREATE INDEX "forum_posts_topic_createdAt_idx" ON "public"."forum_posts"("topic", "createdAt");

-- CreateIndex
CREATE INDEX "chapters_courseId_orderIndex_idx" ON "public"."chapters"("courseId", "orderIndex");

-- CreateIndex
CREATE INDEX "topics_chapterId_orderIndex_idx" ON "public"."topics"("chapterId", "orderIndex");

-- CreateIndex
CREATE INDEX "study_materials_courseId_isPublished_idx" ON "public"."study_materials"("courseId", "isPublished");

-- CreateIndex
CREATE INDEX "study_materials_materialType_accessLevel_idx" ON "public"."study_materials"("materialType", "accessLevel");

-- CreateIndex
CREATE INDEX "study_materials_createdAt_idx" ON "public"."study_materials"("createdAt");

-- CreateIndex
CREATE INDEX "material_access_userId_idx" ON "public"."material_access"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "material_access_materialId_userId_key" ON "public"."material_access"("materialId", "userId");

-- CreateIndex
CREATE INDEX "material_progress_userId_status_idx" ON "public"."material_progress"("userId", "status");

-- CreateIndex
CREATE INDEX "material_progress_materialId_updatedAt_idx" ON "public"."material_progress"("materialId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "material_progress_materialId_userId_key" ON "public"."material_progress"("materialId", "userId");

-- CreateIndex
CREATE INDEX "content_notifications_status_scheduledFor_idx" ON "public"."content_notifications"("status", "scheduledFor");

-- CreateIndex
CREATE INDEX "content_notifications_materialId_idx" ON "public"."content_notifications"("materialId");

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollments" ADD CONSTRAINT "enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollments" ADD CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."demo_bookings" ADD CONSTRAINT "demo_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."demo_bookings" ADD CONSTRAINT "demo_bookings_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "public"."enrollments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."communication_logs" ADD CONSTRAINT "communication_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."communication_logs" ADD CONSTRAINT "communication_logs_demoBookingId_fkey" FOREIGN KEY ("demoBookingId") REFERENCES "public"."demo_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."test_attempts" ADD CONSTRAINT "test_attempts_freeUserId_fkey" FOREIGN KEY ("freeUserId") REFERENCES "public"."free_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."test_questions" ADD CONSTRAINT "test_questions_testAttemptId_fkey" FOREIGN KEY ("testAttemptId") REFERENCES "public"."test_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."test_questions" ADD CONSTRAINT "test_questions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookmarks" ADD CONSTRAINT "bookmarks_freeUserId_fkey" FOREIGN KEY ("freeUserId") REFERENCES "public"."free_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookmarks" ADD CONSTRAINT "bookmarks_chapterNoteId_fkey" FOREIGN KEY ("chapterNoteId") REFERENCES "public"."chapter_notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."study_plans" ADD CONSTRAINT "study_plans_freeUserId_fkey" FOREIGN KEY ("freeUserId") REFERENCES "public"."free_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."forum_posts" ADD CONSTRAINT "forum_posts_freeUserId_fkey" FOREIGN KEY ("freeUserId") REFERENCES "public"."free_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."forum_replies" ADD CONSTRAINT "forum_replies_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."forum_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achievements" ADD CONSTRAINT "achievements_freeUserId_fkey" FOREIGN KEY ("freeUserId") REFERENCES "public"."free_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chapters" ADD CONSTRAINT "chapters_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."topics" ADD CONSTRAINT "topics_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "public"."chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."study_materials" ADD CONSTRAINT "study_materials_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."study_materials" ADD CONSTRAINT "study_materials_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "public"."chapters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."study_materials" ADD CONSTRAINT "study_materials_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."material_access" ADD CONSTRAINT "material_access_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "public"."study_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."material_access" ADD CONSTRAINT "material_access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."material_progress" ADD CONSTRAINT "material_progress_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "public"."study_materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."material_progress" ADD CONSTRAINT "material_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
