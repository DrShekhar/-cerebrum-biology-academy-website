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

export type QuestionType =
  | 'MCQ'
  | 'DIAGRAM'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'MULTIPLE_SELECT'
  | 'MATCH_FOLLOWING'
  | 'NUMERICAL'
  | 'ASSERTION_REASON'
  | 'STATEMENT_BASED'
  | 'COUNTING_TYPE'
  | 'SEQUENCE_ORDER'

export interface MCQQuestion {
  id: string
  type?: QuestionType
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
  // NCERT fields
  isNcertBased?: boolean
  ncertClass?: number
  ncertChapter?: number
  ncertChapterName?: string
  ncertFigure?: string
  ncertPage?: number
  neetWeightage?: string
  isNeetImportant?: boolean
  // Diagram fields
  diagrams?: QuestionDiagram[]
}

export interface QuestionDiagram {
  id: string
  diagramId: string
  position: 'above' | 'inline' | 'below' | 'side'
  caption?: string
  highlightedParts?: string[]
  markedLabel?: string
  diagram: {
    id: string
    name: string
    fileUrl?: string
    svgContent?: string
    labeledParts?: { label: string; name: string; function?: string }[]
  }
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
  softPromptAfter: 999999, // Disabled - only prompt once at hardPromptAfter
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
// TOPIC DEFINITIONS (Based on NCERT Biology Syllabus)
// ============================================

// Main topics based on NCERT Units
// Class 9 & 10 foundation topics + Class 11 & 12 NEET topics
export const BIOLOGY_TOPICS = [
  // Class 9 & 10 Foundation
  'Foundation Biology (Class 9)',
  'Foundation Biology (Class 10)',
  // Class 11 Units
  'Diversity in Living World',
  'Structural Organisation',
  'Cell Structure and Function',
  'Plant Physiology',
  'Human Physiology',
  // Class 12 Units
  'Reproduction',
  'Genetics and Evolution',
  'Biology and Human Welfare',
  'Biotechnology',
  'Ecology',
] as const

export type BiologyTopic = (typeof BIOLOGY_TOPICS)[number]

// Chapters within each topic/unit (Based on NCERT textbooks)
export const BIOLOGY_CHAPTERS: Record<BiologyTopic, string[]> = {
  // Class 9 - Foundation Biology
  'Foundation Biology (Class 9)': [
    'The Fundamental Unit of Life',
    'Tissues',
    'Diversity in Living Organisms',
    'Why Do We Fall Ill',
    'Natural Resources',
    'Improvement in Food Resources',
  ],
  // Class 10 - Foundation Biology
  'Foundation Biology (Class 10)': [
    'Life Processes',
    'Control and Coordination',
    'How Do Organisms Reproduce',
    'Heredity and Evolution',
    'Our Environment',
    'Sustainable Management of Natural Resources',
  ],
  // Class 11 - Unit 1: Diversity in Living World
  'Diversity in Living World': [
    'The Living World',
    'Biological Classification',
    'Plant Kingdom',
    'Animal Kingdom',
  ],
  // Class 11 - Unit 2: Structural Organisation
  'Structural Organisation': [
    'Morphology of Flowering Plants',
    'Anatomy of Flowering Plants',
    'Structural Organisation in Animals',
  ],
  // Class 11 - Unit 3: Cell Structure and Function
  'Cell Structure and Function': [
    'Cell - The Unit of Life',
    'Biomolecules',
    'Cell Cycle and Cell Division',
  ],
  // Class 11 - Unit 4: Plant Physiology
  'Plant Physiology': [
    'Transport in Plants',
    'Mineral Nutrition',
    'Photosynthesis in Higher Plants',
    'Respiration in Plants',
    'Plant Growth and Development',
  ],
  // Class 11 - Unit 5: Human Physiology
  'Human Physiology': [
    'Digestion and Absorption',
    'Breathing and Exchange of Gases',
    'Body Fluids and Circulation',
    'Excretory Products and Their Elimination',
    'Locomotion and Movement',
    'Neural Control and Coordination',
    'Chemical Coordination and Integration',
  ],
  // Class 12 - Unit 6: Reproduction
  Reproduction: [
    'Reproduction in Organisms',
    'Sexual Reproduction in Flowering Plants',
    'Human Reproduction',
    'Reproductive Health',
  ],
  // Class 12 - Unit 7: Genetics and Evolution
  'Genetics and Evolution': [
    'Principles of Inheritance and Variation',
    'Molecular Basis of Inheritance',
    'Evolution',
  ],
  // Class 12 - Unit 8: Biology and Human Welfare
  'Biology and Human Welfare': ['Human Health and Diseases', 'Microbes in Human Welfare'],
  // Class 12 - Unit 9: Biotechnology
  Biotechnology: ['Biotechnology - Principles and Processes', 'Biotechnology and Its Applications'],
  // Class 12 - Unit 10: Ecology
  Ecology: [
    'Organisms and Populations',
    'Ecosystem',
    'Biodiversity and Conservation',
    'Environmental Issues',
  ],
}

// PYQ Years
export const PYQ_YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015] as const

export type PYQYear = (typeof PYQ_YEARS)[number]
