-- CreateEnum
CREATE TYPE "public"."PaymentLinkProvider" AS ENUM ('RAZORPAY', 'CASHFREE');

-- CreateEnum
CREATE TYPE "public"."PaymentLinkStatus" AS ENUM ('ACTIVE', 'PAID', 'PARTIALLY_PAID', 'EXPIRED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."mcq_user_stats" ADD COLUMN     "badgesEarned" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isStreakAtRisk" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastStreakBreak" TIMESTAMP(3),
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "monthlyXp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streakFreezeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streakProtectedUntil" TIMESTAMP(3),
ADD COLUMN     "streakRecoveryDeadline" TIMESTAMP(3),
ADD COLUMN     "subscriptionTier" TEXT,
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weeklyXp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "subscriptionTier" TEXT;

-- CreateTable
CREATE TABLE "public"."payment_links" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "description" TEXT NOT NULL,
    "provider" "public"."PaymentLinkProvider" NOT NULL,
    "providerLinkId" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."PaymentLinkStatus" NOT NULL DEFAULT 'ACTIVE',
    "paidAt" TIMESTAMP(3),
    "paidAmount" DECIMAL(10,2),
    "remindersSent" INTEGER NOT NULL DEFAULT 0,
    "lastReminderAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gamification_xp_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "xpAmount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "relatedEntityId" TEXT,
    "relatedEntityType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gamification_xp_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gamification_user_badges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "badgeName" TEXT NOT NULL,
    "badgeDescription" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "iconUrl" TEXT,
    "xpRewarded" INTEGER NOT NULL,
    "showcased" BOOLEAN NOT NULL DEFAULT false,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gamification_user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gamification_goals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goalType" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "consecutiveCompletions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gamification_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gamification_streak_protection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "streakAtProtection" INTEGER NOT NULL,
    "xpCost" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "wasUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gamification_streak_protection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."gamification_notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gamification_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."consultants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "consultantCode" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "commissionRate" DECIMAL(5,2) NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "totalReferrals" INTEGER NOT NULL DEFAULT 0,
    "successfulReferrals" INTEGER NOT NULL DEFAULT 0,
    "totalCommission" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "paidCommission" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "pendingCommission" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."referral_links" (
    "id" TEXT NOT NULL,
    "consultantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "targetCourse" TEXT,
    "targetCampaign" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "conversionCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."referrals" (
    "id" TEXT NOT NULL,
    "consultantId" TEXT NOT NULL,
    "referralLinkId" TEXT,
    "studentName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "courseInterest" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW_LEAD',
    "source" TEXT DEFAULT 'Direct',
    "notes" TEXT,
    "enrollmentId" TEXT,
    "demoScheduledAt" TIMESTAMP(3),
    "demoCompletedAt" TIMESTAMP(3),
    "offerSentAt" TIMESTAMP(3),
    "paymentReceivedAt" TIMESTAMP(3),
    "enrolledAt" TIMESTAMP(3),
    "lostAt" TIMESTAMP(3),
    "lostReason" TEXT,
    "totalFeeAmount" DECIMAL(10,2),
    "commissionEarned" DECIMAL(10,2),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."commissions" (
    "id" TEXT NOT NULL,
    "consultantId" TEXT NOT NULL,
    "referralId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "percentage" DECIMAL(5,2) NOT NULL,
    "baseAmount" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "paymentRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pending_conversions" (
    "id" TEXT NOT NULL,
    "gclid" TEXT NOT NULL,
    "conversionAction" TEXT NOT NULL,
    "conversionDateTime" TIMESTAMP(3) NOT NULL,
    "conversionValue" DECIMAL(12,2),
    "currencyCode" TEXT DEFAULT 'INR',
    "orderId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "uploadedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pending_conversions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notices" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'ANNOUNCEMENT',
    "targetType" TEXT NOT NULL DEFAULT 'ALL',
    "targetCourseIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "targetBatchIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "targetUserIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "attachments" JSONB,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notice_reads" (
    "id" TEXT NOT NULL,
    "noticeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notice_reads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."worksheets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "courseId" TEXT,
    "chapterId" TEXT,
    "topicId" TEXT,
    "content" JSONB,
    "instructions" TEXT,
    "maxMarks" INTEGER,
    "duration" INTEGER,
    "difficulty" "public"."DifficultyLevel",
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "dueDate" TIMESTAMP(3),
    "allowLateSubmission" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "attachments" JSONB,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "worksheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."worksheet_submissions" (
    "id" TEXT NOT NULL,
    "worksheetId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "answers" JSONB,
    "attachments" JSONB,
    "grade" DOUBLE PRECISION,
    "feedback" TEXT,
    "isLate" BOOLEAN NOT NULL DEFAULT false,
    "timeSpent" INTEGER,
    "startedAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "gradedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "worksheet_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wall_of_achievers" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "studentName" TEXT NOT NULL,
    "achievement" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "score" DECIMAL(10,2),
    "rank" INTEGER,
    "badgeUrl" TEXT,
    "photoUrl" TEXT,
    "courseId" TEXT,
    "period" TEXT,
    "featuredFrom" TIMESTAMP(3),
    "featuredUntil" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wall_of_achievers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."achiever_nominations" (
    "id" TEXT NOT NULL,
    "achieverId" TEXT NOT NULL,
    "nominatedById" TEXT NOT NULL,
    "nominationType" TEXT NOT NULL DEFAULT 'PEER',
    "reason" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achiever_nominations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."self_evaluations" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "slot" TEXT NOT NULL,
    "courseId" TEXT,
    "topicsCovered" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "conceptsLearned" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "questionsAttempted" INTEGER NOT NULL DEFAULT 0,
    "questionsCorrect" INTEGER NOT NULL DEFAULT 0,
    "difficultyRating" INTEGER,
    "confidenceLevel" INTEGER,
    "studyHours" DOUBLE PRECISION,
    "notes" TEXT,
    "goals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "achievements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "struggles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "nextDayPlan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "self_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."work_tracking" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT,
    "date" DATE NOT NULL,
    "assignmentsAssigned" INTEGER NOT NULL DEFAULT 0,
    "assignmentsSubmitted" INTEGER NOT NULL DEFAULT 0,
    "assignmentsChecked" INTEGER NOT NULL DEFAULT 0,
    "testsAssigned" INTEGER NOT NULL DEFAULT 0,
    "testsAttempted" INTEGER NOT NULL DEFAULT 0,
    "testsChecked" INTEGER NOT NULL DEFAULT 0,
    "worksheetsAssigned" INTEGER NOT NULL DEFAULT 0,
    "worksheetsSubmitted" INTEGER NOT NULL DEFAULT 0,
    "worksheetsChecked" INTEGER NOT NULL DEFAULT 0,
    "classesScheduled" INTEGER NOT NULL DEFAULT 0,
    "classesAttended" INTEGER NOT NULL DEFAULT 0,
    "studyMinutes" INTEGER NOT NULL DEFAULT 0,
    "remarks" TEXT,
    "specialNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_links_providerLinkId_key" ON "public"."payment_links"("providerLinkId");

-- CreateIndex
CREATE INDEX "payment_links_leadId_status_idx" ON "public"."payment_links"("leadId", "status");

-- CreateIndex
CREATE INDEX "payment_links_createdById_idx" ON "public"."payment_links"("createdById");

-- CreateIndex
CREATE INDEX "payment_links_status_expiresAt_idx" ON "public"."payment_links"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "gamification_xp_events_userId_idx" ON "public"."gamification_xp_events"("userId");

-- CreateIndex
CREATE INDEX "gamification_xp_events_userId_eventType_idx" ON "public"."gamification_xp_events"("userId", "eventType");

-- CreateIndex
CREATE INDEX "gamification_xp_events_userId_createdAt_idx" ON "public"."gamification_xp_events"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "gamification_xp_events_relatedEntityType_idx" ON "public"."gamification_xp_events"("relatedEntityType");

-- CreateIndex
CREATE INDEX "gamification_user_badges_userId_idx" ON "public"."gamification_user_badges"("userId");

-- CreateIndex
CREATE INDEX "gamification_user_badges_userId_badgeId_idx" ON "public"."gamification_user_badges"("userId", "badgeId");

-- CreateIndex
CREATE INDEX "gamification_user_badges_userId_showcased_idx" ON "public"."gamification_user_badges"("userId", "showcased");

-- CreateIndex
CREATE INDEX "gamification_user_badges_earnedAt_idx" ON "public"."gamification_user_badges"("earnedAt");

-- CreateIndex
CREATE INDEX "gamification_goals_userId_idx" ON "public"."gamification_goals"("userId");

-- CreateIndex
CREATE INDEX "gamification_goals_userId_goalType_idx" ON "public"."gamification_goals"("userId", "goalType");

-- CreateIndex
CREATE INDEX "gamification_goals_userId_metric_isCompleted_idx" ON "public"."gamification_goals"("userId", "metric", "isCompleted");

-- CreateIndex
CREATE INDEX "gamification_goals_userId_isCompleted_endDate_idx" ON "public"."gamification_goals"("userId", "isCompleted", "endDate");

-- CreateIndex
CREATE INDEX "gamification_goals_completedAt_idx" ON "public"."gamification_goals"("completedAt");

-- CreateIndex
CREATE INDEX "gamification_goals_endDate_idx" ON "public"."gamification_goals"("endDate");

-- CreateIndex
CREATE INDEX "gamification_streak_protection_userId_idx" ON "public"."gamification_streak_protection"("userId");

-- CreateIndex
CREATE INDEX "gamification_streak_protection_userId_type_idx" ON "public"."gamification_streak_protection"("userId", "type");

-- CreateIndex
CREATE INDEX "gamification_streak_protection_userId_createdAt_idx" ON "public"."gamification_streak_protection"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "gamification_notifications_userId_idx" ON "public"."gamification_notifications"("userId");

-- CreateIndex
CREATE INDEX "gamification_notifications_userId_isRead_idx" ON "public"."gamification_notifications"("userId", "isRead");

-- CreateIndex
CREATE INDEX "gamification_notifications_userId_priority_createdAt_idx" ON "public"."gamification_notifications"("userId", "priority", "createdAt");

-- CreateIndex
CREATE INDEX "gamification_notifications_expiresAt_idx" ON "public"."gamification_notifications"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "consultants_userId_key" ON "public"."consultants"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "consultants_consultantCode_key" ON "public"."consultants"("consultantCode");

-- CreateIndex
CREATE INDEX "consultants_consultantCode_idx" ON "public"."consultants"("consultantCode");

-- CreateIndex
CREATE INDEX "consultants_userId_idx" ON "public"."consultants"("userId");

-- CreateIndex
CREATE INDEX "consultants_isActive_idx" ON "public"."consultants"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "referral_links_code_key" ON "public"."referral_links"("code");

-- CreateIndex
CREATE INDEX "referral_links_consultantId_idx" ON "public"."referral_links"("consultantId");

-- CreateIndex
CREATE INDEX "referral_links_code_idx" ON "public"."referral_links"("code");

-- CreateIndex
CREATE INDEX "referral_links_consultantId_isActive_idx" ON "public"."referral_links"("consultantId", "isActive");

-- CreateIndex
CREATE INDEX "referrals_consultantId_idx" ON "public"."referrals"("consultantId");

-- CreateIndex
CREATE INDEX "referrals_consultantId_status_idx" ON "public"."referrals"("consultantId", "status");

-- CreateIndex
CREATE INDEX "referrals_referralLinkId_idx" ON "public"."referrals"("referralLinkId");

-- CreateIndex
CREATE INDEX "referrals_phone_idx" ON "public"."referrals"("phone");

-- CreateIndex
CREATE INDEX "referrals_status_idx" ON "public"."referrals"("status");

-- CreateIndex
CREATE INDEX "referrals_createdAt_idx" ON "public"."referrals"("createdAt");

-- CreateIndex
CREATE INDEX "commissions_consultantId_idx" ON "public"."commissions"("consultantId");

-- CreateIndex
CREATE INDEX "commissions_consultantId_status_idx" ON "public"."commissions"("consultantId", "status");

-- CreateIndex
CREATE INDEX "commissions_referralId_idx" ON "public"."commissions"("referralId");

-- CreateIndex
CREATE INDEX "commissions_status_idx" ON "public"."commissions"("status");

-- CreateIndex
CREATE INDEX "commissions_createdAt_idx" ON "public"."commissions"("createdAt");

-- CreateIndex
CREATE INDEX "commissions_paidAt_idx" ON "public"."commissions"("paidAt");

-- CreateIndex
CREATE INDEX "pending_conversions_status_idx" ON "public"."pending_conversions"("status");

-- CreateIndex
CREATE INDEX "pending_conversions_gclid_idx" ON "public"."pending_conversions"("gclid");

-- CreateIndex
CREATE INDEX "pending_conversions_createdAt_idx" ON "public"."pending_conversions"("createdAt");

-- CreateIndex
CREATE INDEX "notices_category_idx" ON "public"."notices"("category");

-- CreateIndex
CREATE INDEX "notices_isActive_publishedAt_idx" ON "public"."notices"("isActive", "publishedAt");

-- CreateIndex
CREATE INDEX "notices_targetType_idx" ON "public"."notices"("targetType");

-- CreateIndex
CREATE INDEX "notices_createdById_idx" ON "public"."notices"("createdById");

-- CreateIndex
CREATE INDEX "notices_isPinned_priority_publishedAt_idx" ON "public"."notices"("isPinned", "priority", "publishedAt");

-- CreateIndex
CREATE INDEX "notice_reads_userId_idx" ON "public"."notice_reads"("userId");

-- CreateIndex
CREATE INDEX "notice_reads_noticeId_idx" ON "public"."notice_reads"("noticeId");

-- CreateIndex
CREATE UNIQUE INDEX "notice_reads_noticeId_userId_key" ON "public"."notice_reads"("noticeId", "userId");

-- CreateIndex
CREATE INDEX "worksheets_status_publishedAt_idx" ON "public"."worksheets"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "worksheets_courseId_idx" ON "public"."worksheets"("courseId");

-- CreateIndex
CREATE INDEX "worksheets_difficulty_idx" ON "public"."worksheets"("difficulty");

-- CreateIndex
CREATE INDEX "worksheets_dueDate_idx" ON "public"."worksheets"("dueDate");

-- CreateIndex
CREATE INDEX "worksheet_submissions_studentId_idx" ON "public"."worksheet_submissions"("studentId");

-- CreateIndex
CREATE INDEX "worksheet_submissions_worksheetId_idx" ON "public"."worksheet_submissions"("worksheetId");

-- CreateIndex
CREATE INDEX "worksheet_submissions_status_idx" ON "public"."worksheet_submissions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "worksheet_submissions_worksheetId_studentId_key" ON "public"."worksheet_submissions"("worksheetId", "studentId");

-- CreateIndex
CREATE INDEX "wall_of_achievers_isActive_category_idx" ON "public"."wall_of_achievers"("isActive", "category");

-- CreateIndex
CREATE INDEX "wall_of_achievers_isActive_period_idx" ON "public"."wall_of_achievers"("isActive", "period");

-- CreateIndex
CREATE INDEX "wall_of_achievers_featuredFrom_featuredUntil_idx" ON "public"."wall_of_achievers"("featuredFrom", "featuredUntil");

-- CreateIndex
CREATE INDEX "wall_of_achievers_studentId_idx" ON "public"."wall_of_achievers"("studentId");

-- CreateIndex
CREATE INDEX "achiever_nominations_nominatedById_idx" ON "public"."achiever_nominations"("nominatedById");

-- CreateIndex
CREATE INDEX "achiever_nominations_achieverId_idx" ON "public"."achiever_nominations"("achieverId");

-- CreateIndex
CREATE UNIQUE INDEX "achiever_nominations_achieverId_nominatedById_nominationTyp_key" ON "public"."achiever_nominations"("achieverId", "nominatedById", "nominationType");

-- CreateIndex
CREATE INDEX "self_evaluations_studentId_date_idx" ON "public"."self_evaluations"("studentId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "self_evaluations_studentId_date_slot_key" ON "public"."self_evaluations"("studentId", "date", "slot");

-- CreateIndex
CREATE INDEX "work_tracking_studentId_date_idx" ON "public"."work_tracking"("studentId", "date");

-- CreateIndex
CREATE INDEX "work_tracking_courseId_idx" ON "public"."work_tracking"("courseId");

-- AddForeignKey
ALTER TABLE "public"."payment_links" ADD CONSTRAINT "payment_links_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_links" ADD CONSTRAINT "payment_links_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gamification_xp_events" ADD CONSTRAINT "gamification_xp_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gamification_user_badges" ADD CONSTRAINT "gamification_user_badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gamification_goals" ADD CONSTRAINT "gamification_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gamification_streak_protection" ADD CONSTRAINT "gamification_streak_protection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."gamification_notifications" ADD CONSTRAINT "gamification_notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."consultants" ADD CONSTRAINT "consultants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."referral_links" ADD CONSTRAINT "referral_links_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "public"."consultants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."referrals" ADD CONSTRAINT "referrals_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "public"."consultants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."referrals" ADD CONSTRAINT "referrals_referralLinkId_fkey" FOREIGN KEY ("referralLinkId") REFERENCES "public"."referral_links"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."referrals" ADD CONSTRAINT "referrals_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "public"."enrollments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commissions" ADD CONSTRAINT "commissions_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "public"."consultants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commissions" ADD CONSTRAINT "commissions_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "public"."referrals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notices" ADD CONSTRAINT "notices_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notice_reads" ADD CONSTRAINT "notice_reads_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "public"."notices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notice_reads" ADD CONSTRAINT "notice_reads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."worksheet_submissions" ADD CONSTRAINT "worksheet_submissions_worksheetId_fkey" FOREIGN KEY ("worksheetId") REFERENCES "public"."worksheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."worksheet_submissions" ADD CONSTRAINT "worksheet_submissions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wall_of_achievers" ADD CONSTRAINT "wall_of_achievers_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achiever_nominations" ADD CONSTRAINT "achiever_nominations_achieverId_fkey" FOREIGN KEY ("achieverId") REFERENCES "public"."wall_of_achievers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achiever_nominations" ADD CONSTRAINT "achiever_nominations_nominatedById_fkey" FOREIGN KEY ("nominatedById") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."self_evaluations" ADD CONSTRAINT "self_evaluations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."work_tracking" ADD CONSTRAINT "work_tracking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

