/**
 * Additional TypeScript enums for types not defined in Prisma schema
 * These are used in the codebase but don't have corresponding database enums
 */

export type GamificationNotificationType =
  | 'XP_EARNED'
  | 'LEVEL_UP'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'STREAK_MILESTONE'
  | 'RANK_CHANGE'
  | 'REWARD_EARNED'
  | 'CHALLENGE_COMPLETED'
  | 'DAILY_GOAL_COMPLETED'
  | 'STREAK_AT_RISK'
  | 'DAILY_CHALLENGE'
  | 'LEADERBOARD_CHANGE'
  | 'ACHIEVEMENT_PROGRESS'

export type XpEventType =
  | 'LESSON_COMPLETED'
  | 'QUIZ_COMPLETED'
  | 'ASSIGNMENT_SUBMITTED'
  | 'TEST_COMPLETED'
  | 'ATTENDANCE_MARKED'
  | 'DAILY_LOGIN'
  | 'STREAK_MAINTAINED'
  | 'FIRST_LESSON'
  | 'PERFECT_SCORE'
  | 'BONUS_XP'
  | 'BADGE_EARNED'
  | 'DAILY_CHALLENGE'
  | 'MCQ_CORRECT'
  | 'STREAK_MILESTONE'

export type NoticeCategory =
  | 'GENERAL'
  | 'ACADEMIC'
  | 'EXAM'
  | 'FEE'
  | 'HOLIDAY'
  | 'EVENT'
  | 'URGENT'

export type NoticeTargetType =
  | 'ALL'
  | 'STUDENTS'
  | 'PARENTS'
  | 'FACULTY'
  | 'CLASS'
  | 'COURSE'
  | 'BATCH'

export type NoteType = 'TEXT' | 'DRAWING' | 'MIXED'

export type EvaluationSlot = 'MORNING' | 'AFTERNOON' | 'EVENING'

export type StreakProtectionType = 'FREEZE' | 'WEEKEND_PAUSE' | 'SICK_LEAVE' | 'EMERGENCY'

// Re-export SubmissionStatus from Prisma for consistency
export type { SubmissionStatus } from '@/generated/prisma'
