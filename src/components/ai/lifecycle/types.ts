export interface TestLifecycle {
  id: string
  title: string
  status: 'draft' | 'published' | 'scheduled' | 'archived' | 'practice'
  version: string
  createdAt: string
  lastModified: string
  publishedAt?: string
  scheduledFor?: string
  createdBy: string
  totalQuestions: number
  totalMarks: number
  duration: number
  participants: number
  completionRate: number
  averageScore: number
}

export interface DraftVersion {
  id: string
  version: string
  timestamp: string
  changes: string
  author: string
}

export interface DraftSettings {
  autoSave: boolean
  saveInterval: number
  versions: DraftVersion[]
  collaborators: string[]
  lastSaved: string
}

export interface AccessRestrictions {
  ipWhitelist: string[]
  deviceLimit: number
  browserRequirements: string[]
}

export interface SecuritySettings {
  preventCopyPaste: boolean
  preventPrintScreen: boolean
  lockdownBrowser: boolean
  webcamMonitoring: boolean
}

export interface PublishSettings {
  publishImmediately: boolean
  publishDate?: string
  publishTime?: string
  notifyStudents: boolean
  notificationMessage: string
  accessRestrictions: AccessRestrictions
  securitySettings: SecuritySettings
}

export interface AvailabilityWindow {
  id: string
  name: string
  start: string
  end: string
  timezone: string
  isActive: boolean
}

export interface ReminderNotifications {
  enabled: boolean
  intervals: number[]
}

export interface ScheduleSettings {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  timezone: string
  gracePeriod: number
  autoExtensions: boolean
  reminderNotifications: ReminderNotifications
  availabilityWindows: AvailabilityWindow[]
}

export interface QuestionUpdates {
  refreshContent: boolean
  updateDifficulty: boolean
  addNewQuestions: boolean
  removeOutdated: boolean
}

export interface CloneSettings {
  newTitle: string
  targetYear: string
  preserveSchedule: boolean
  updateQuestions: boolean
  resetAnalytics: boolean
  cloneType: 'exact' | 'updated' | 'template'
  questionUpdates: QuestionUpdates
}

export interface TimeLimit {
  enabled: boolean
  duration: number
}

export interface PracticeModeSettings {
  allowUnlimitedAttempts: boolean
  showAnswersImmediately: boolean
  showExplanations: boolean
  showScoreAfterEach: boolean
  enableHints: boolean
  randomizeQuestions: boolean
  timeLimit: TimeLimit
  feedbackLevel: 'none' | 'basic' | 'detailed' | 'comprehensive'
}

export interface AnswerKeySettings {
  includeExplanations: boolean
  includeReferences: boolean
  includeMarkingScheme: boolean
  format: 'pdf' | 'html' | 'word' | 'excel'
  accessLevel: 'public' | 'teachers' | 'restricted'
  watermark: string
  generateQRCode: boolean
  includeStatistics: boolean
}

export interface AccessControl {
  requireCompletion: boolean
  minimumScore: number
  waitPeriod: number
}

export interface SolutionReleaseSettings {
  releaseType: 'immediate' | 'scheduled' | 'manual'
  releaseDate?: string
  releaseTime?: string
  accessControl: AccessControl
  contentLevel: 'answers' | 'explanations' | 'detailed' | 'complete'
  distributionMethod: 'platform' | 'email' | 'download' | 'all'
}

export interface AffectedStudent {
  id: string
  name: string
  originalScore: number
  newScore?: number
  improvement: number
}

export interface RegradeOptions {
  regradeType: 'partial' | 'complete' | 'specific_questions'
  selectedQuestions: string[]
  reason: string
  notifyStudents: boolean
  preserveOriginalScores: boolean
  approvalRequired: boolean
  regradeBy: string
  deadline: string
  affectedStudents: AffectedStudent[]
}

export type LifecycleTab =
  | 'draft'
  | 'publish'
  | 'schedule'
  | 'clone'
  | 'practice'
  | 'answers'
  | 'solutions'
  | 'regrade'
