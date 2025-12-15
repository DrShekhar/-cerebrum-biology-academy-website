// MCQ Practice Enhancement Types
// Comprehensive type definitions for the gamified MCQ system

import type {
  DifficultyLevel,
  CommunityQuestionStatus,
  ErrorReportType,
  ErrorReportStatus,
  BadgeCategory,
  BadgeRarity,
  LeaderboardPeriod,
} from '@/generated/prisma'

// ============================================
// QUESTION TYPES
// ============================================

export interface MCQQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation?: string
  topic: string
  subtopic?: string
  chapter?: string
  difficulty: DifficultyLevel
  isPYQ: boolean
  pyqYear?: number
  source?: 'official' | 'community'
  sourceId?: string
}

export interface QuestionFilter {
  topic?: string
  chapter?: string
  difficulty?: DifficultyLevel
  isPYQOnly?: boolean
  pyqYear?: number
  excludeIds?: string[]
  limit?: number
  offset?: number
}

export interface QuestionResponse {
  questions: MCQQuestion[]
  total: number
  hasMore: boolean
  filters: QuestionFilter
}

// ============================================
// ANSWER SUBMISSION TYPES
// ============================================

export interface AnswerSubmission {
  questionId: string
  selectedAnswer: 'A' | 'B' | 'C' | 'D'
  timeSpent: number
  sessionId: string
}

export interface AnswerResult {
  isCorrect: boolean
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation?: string
  xpEarned: number
  streakUpdated: boolean
  newStreak?: number
  badgesUnlocked?: Badge[]
  levelUp?: {
    newLevel: number
    xpRequired: number
    xpProgress: number
  }
}

// ============================================
// GAMIFICATION TYPES
// ============================================

export interface UserStats {
  id: string
  freeUserId?: string
  userId?: string
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  currentStreak: number
  longestStreak: number
  lastPracticeDate?: Date
  totalXp: number
  currentLevel: number
  levelProgress: number
  dailyChallengeCompleted: boolean
  dailyChallengeDate?: Date
  dailyChallengesTotal: number
  questionsSubmitted: number
  questionsApproved: number
  errorsReported: number
  errorsAccepted: number
  contributorRank?: string
  topicMastery?: Record<string, TopicMastery>
  weakTopics?: string[]
  strongTopics?: string[]
  badges?: string[]
}

export interface TopicMastery {
  attempted: number
  correct: number
  mastery: number
}

export interface Badge {
  id: string
  code: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  xpReward: number
  unlockedAt?: Date
}

export interface BadgeRequirement {
  type: 'streak' | 'questions' | 'accuracy' | 'contribution' | 'topic_mastery' | 'daily_challenge'
  value: number
  topic?: string
}

export interface LevelConfig {
  level: number
  name: string
  xpRequired: number
  icon: string
}

export const LEVEL_CONFIG: LevelConfig[] = [
  { level: 1, name: 'Beginner', xpRequired: 0, icon: '🌱' },
  { level: 2, name: 'Explorer', xpRequired: 100, icon: '🔍' },
  { level: 3, name: 'Learner', xpRequired: 300, icon: '📚' },
  { level: 4, name: 'Scholar', xpRequired: 600, icon: '🎓' },
  { level: 5, name: 'Expert', xpRequired: 1000, icon: '⭐' },
  { level: 6, name: 'Master', xpRequired: 1500, icon: '🏆' },
  { level: 7, name: 'Champion', xpRequired: 2500, icon: '👑' },
  { level: 8, name: 'Legend', xpRequired: 4000, icon: '🦁' },
  { level: 9, name: 'Grandmaster', xpRequired: 6000, icon: '🔮' },
  { level: 10, name: 'NEET Warrior', xpRequired: 10000, icon: '⚔️' },
]

export const XP_REWARDS = {
  correctEasy: 5,
  correctMedium: 10,
  correctHard: 15,
  firstAttemptBonus: 5,
  dailyChallengeComplete: 50,
  dailyChallengePerfect: 25,
  questionApproved: 100,
  errorReportAccepted: 50,
  streak7Days: 100,
  streak30Days: 500,
} as const

// ============================================
// LEADERBOARD TYPES
// ============================================

export interface LeaderboardEntry {
  rank: number
  freeUserId?: string
  userId?: string
  name: string
  avatar?: string
  xp: number
  accuracy: number
  questionsAnswered: number
  isCurrentUser?: boolean
}

export interface Leaderboard {
  period: LeaderboardPeriod
  periodStart: Date
  periodEnd: Date
  entries: LeaderboardEntry[]
  totalParticipants: number
  currentUserRank?: number
}

// ============================================
// DAILY CHALLENGE TYPES
// ============================================

export interface DailyChallenge {
  id: string
  date: Date
  topic?: string
  questionCount: number
  difficulty?: DifficultyLevel
  timeLimit?: number
  questionIds: string[]
  xpReward: number
  bonusXp: number
  participantCount: number
  perfectScoreCount: number
  avgScore?: number
}

export interface DailyChallengeResult {
  challengeId: string
  score: number
  totalQuestions: number
  timeSpent: number
  isPerfect: boolean
  xpEarned: number
  rank?: number
}

// ============================================
// SESSION TYPES
// ============================================

export interface PracticeSession {
  id: string
  sessionToken: string
  freeUserId?: string
  userId?: string
  topic?: string
  difficulty?: DifficultyLevel
  isPYQOnly: boolean
  pyqYear?: number
  questionsAttempted: number
  correctAnswers: number
  timeSpent: number
  xpEarned: number
  leadCaptured: boolean
  capturedAt?: Date
  startedAt: Date
  endedAt?: Date
}

export interface SessionConfig {
  topic?: string
  difficulty?: DifficultyLevel
  isPYQOnly?: boolean
  pyqYear?: number
}

// ============================================
// COMMUNITY SUBMISSION TYPES
// ============================================

export interface QuestionSubmission {
  question: string
  options: string[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  topic: string
  subtopic?: string
  chapter?: string
  difficulty: DifficultyLevel
  isPYQ?: boolean
  pyqYear?: number
  source?: string
}

export interface CommunityQuestion extends QuestionSubmission {
  id: string
  submittedBy: string
  submitterName: string
  submitterPhone?: string
  submitterEmail?: string
  status: CommunityQuestionStatus
  aiScore?: number
  aiAnalysis?: AIAnalysis
  aiScreenedAt?: Date
  aiApproved?: boolean
  reviewedBy?: string
  reviewedAt?: Date
  reviewNotes?: string
  rejectionReason?: string
  totalAttempts: number
  correctAttempts: number
  reportCount: number
  qualityScore?: number
  contributorXpAwarded: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface AIAnalysis {
  overallScore: number
  recommendation: 'APPROVE' | 'REVIEW' | 'REJECT'
  analysis: {
    accuracy: { score: number; issues: string[] }
    clarity: { score: number; issues: string[] }
    relevance: { score: number; issues: string[] }
    explanation: { score: number; issues: string[] }
  }
  suggestedImprovements: string[]
  duplicateWarning?: string
}

// ============================================
// ERROR REPORT TYPES
// ============================================

export interface ErrorReport {
  questionId?: string
  communityQuestionId?: string
  reportType: ErrorReportType
  currentAnswer: string
  suggestedAnswer?: string
  explanation: string
  evidence?: string
}

export interface ErrorReportRecord extends ErrorReport {
  id: string
  reportedBy: string
  reporterName?: string
  reporterPhone?: string
  reporterEmail?: string
  status: ErrorReportStatus
  reviewedBy?: string
  reviewedAt?: Date
  resolution?: string
  isValid?: boolean
  reporterXpAwarded: number
  createdAt: Date
}

// ============================================
// LEAD CAPTURE TYPES
// ============================================

export interface LeadCaptureData {
  phone: string
  name?: string
  email?: string
  studentClass?: 'CLASS_11' | 'CLASS_12' | 'DROPPER'
  source: 'mcq_practice'
  sessionId: string
  questionsAnswered: number
}

export interface LeadCaptureConfig {
  softPromptAfter: number
  hardPromptAfter: number
  requiredFields: ('phone' | 'name' | 'email' | 'class')[]
}

export const LEAD_CAPTURE_CONFIG: LeadCaptureConfig = {
  softPromptAfter: 5,
  hardPromptAfter: 10,
  requiredFields: ['phone'],
}

// ============================================
// CONTENT PROTECTION TYPES
// ============================================

export interface ContentProtectionConfig {
  disableTextSelection: boolean
  disableRightClick: boolean
  disableKeyboardShortcuts: boolean
  addWatermark: boolean
  watermarkText?: string
  detectDevTools: boolean
  detectScreenCapture: boolean
}

export const DEFAULT_PROTECTION_CONFIG: ContentProtectionConfig = {
  disableTextSelection: true,
  disableRightClick: true,
  disableKeyboardShortcuts: true,
  addWatermark: false,
  detectDevTools: true,
  detectScreenCapture: true,
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ============================================
// TOPIC DEFINITIONS
// ============================================

export const BIOLOGY_TOPICS = [
  'Cell Biology',
  'Biomolecules',
  'Cell Division',
  'Plant Anatomy',
  'Plant Physiology',
  'Human Physiology',
  'Reproduction',
  'Genetics',
  'Evolution',
  'Ecology',
  'Biotechnology',
  'Human Health & Diseases',
] as const

export type BiologyTopic = (typeof BIOLOGY_TOPICS)[number]

export const BIOLOGY_CHAPTERS: Record<BiologyTopic, string[]> = {
  'Cell Biology': ['Cell - The Unit of Life', 'Cell Organelles', 'Cell Membrane', 'Cell Wall'],
  Biomolecules: ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids', 'Enzymes'],
  'Cell Division': ['Cell Cycle', 'Mitosis', 'Meiosis'],
  'Plant Anatomy': ['Tissues', 'Anatomy of Root', 'Anatomy of Stem', 'Anatomy of Leaf'],
  'Plant Physiology': ['Photosynthesis', 'Respiration', 'Plant Growth', 'Plant Hormones'],
  'Human Physiology': [
    'Digestion',
    'Breathing',
    'Body Fluids & Circulation',
    'Excretion',
    'Locomotion',
    'Neural Control',
    'Chemical Coordination',
  ],
  Reproduction: [
    'Reproduction in Organisms',
    'Sexual Reproduction in Plants',
    'Human Reproduction',
    'Reproductive Health',
  ],
  Genetics: [
    'Principles of Inheritance',
    'Molecular Basis of Inheritance',
    'Chromosomal Basis of Inheritance',
  ],
  Evolution: ['Origin of Life', 'Evolution Theories', 'Human Evolution'],
  Ecology: ['Organisms & Environment', 'Ecosystem', 'Biodiversity', 'Environmental Issues'],
  Biotechnology: [
    'Principles of Biotechnology',
    'Applications of Biotechnology',
    'Genetic Engineering',
  ],
  'Human Health & Diseases': ['Human Health', 'Common Diseases', 'Immunity', 'AIDS & Cancer'],
}

// PYQ Years
export const PYQ_YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015] as const

export type PYQYear = (typeof PYQ_YEARS)[number]
