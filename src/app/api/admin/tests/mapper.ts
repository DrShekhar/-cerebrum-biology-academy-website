// Shared mapping between test_templates rows and the /admin/tests page shape.
// Lives beside the routes (not a route file itself, so free to export).

// DB TestCategory → the page's category chips
export const CATEGORY_LABEL: Record<string, string> = {
  FULL_SYLLABUS: 'MOCK_TEST',
  CHAPTER_WISE: 'CHAPTER_TEST',
  TOPIC_WISE: 'PRACTICE',
  SUBJECT_WISE: 'PRACTICE',
  DIFFICULTY_WISE: 'PRACTICE',
  PREVIOUS_YEAR: 'NEET_PATTERN',
  MIXED: 'CUSTOM',
}

// Page's category filter → DB categories
export const CATEGORY_FILTER: Record<string, string[]> = {
  MOCK_TEST: ['FULL_SYLLABUS'],
  CHAPTER_TEST: ['CHAPTER_WISE'],
  PRACTICE: ['TOPIC_WISE', 'SUBJECT_WISE', 'DIFFICULTY_WISE'],
  NEET_PATTERN: ['PREVIOUS_YEAR'],
  CUSTOM: ['MIXED'],
}

export interface TemplateRow {
  id: string
  title: string
  description: string | null
  category: string
  difficulty: string
  timeLimit: number
  totalQuestions: number
  totalMarks: number
  isActive: boolean
  isPublished: boolean
  attemptCount: number
  averageScore: number | null
  createdAt: Date
  createdBy: string | null
  _count?: { test_sessions: number }
}

export function mapTemplate(t: TemplateRow) {
  return {
    id: t.id,
    title: t.title,
    description: t.description || '',
    status: !t.isActive ? 'ARCHIVED' : t.isPublished ? 'ACTIVE' : 'TEMPLATE',
    totalQuestions: t.totalQuestions,
    duration: t.timeLimit,
    totalMarks: t.totalMarks,
    difficulty: (t.difficulty || 'MEDIUM').toLowerCase(),
    category: CATEGORY_LABEL[t.category] || 'CUSTOM',
    createdAt: t.createdAt.toISOString(),
    createdBy: t.createdBy || 'Admin',
    timesUsed: t.attemptCount,
    avgScore: t.averageScore != null ? Math.round(t.averageScore) : 0,
    totalAttempts: t._count?.test_sessions ?? t.attemptCount,
    // Real pass-rate needs per-session pass marks; not tracked per template.
    // Report 0 rather than fabricate.
    passRate: 0,
  }
}
