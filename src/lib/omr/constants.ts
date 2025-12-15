import { OMRSubjectType } from '@/generated/prisma'

export const OMR_PASSWORD = '156265'

export const SUBJECT_TYPE_CONFIG: Record<
  OMRSubjectType,
  {
    label: string
    shortLabel: string
    totalQuestions: number
    totalMarks: number
    sections: { name: string; start: number; end: number }[]
    targetClasses: string[]
  }
> = {
  BIOLOGY_XI: {
    label: 'BIOLOGY XI',
    shortLabel: 'BIO XI',
    totalQuestions: 45,
    totalMarks: 180,
    sections: [{ name: 'Biology', start: 1, end: 45 }],
    targetClasses: ['11th'],
  },
  BIOLOGY_XII: {
    label: 'BIOLOGY XII',
    shortLabel: 'BIO XII',
    totalQuestions: 45,
    totalMarks: 180,
    sections: [{ name: 'Biology', start: 1, end: 45 }],
    targetClasses: ['12th'],
  },
  BIOLOGY_XI_XII: {
    label: 'BIOLOGY XI+XII',
    shortLabel: 'BIO XI+XII',
    totalQuestions: 90,
    totalMarks: 360,
    sections: [
      { name: 'Biology XI', start: 1, end: 45 },
      { name: 'Biology XII', start: 46, end: 90 },
    ],
    targetClasses: ['12th', 'Dropper'],
  },
  NEET_MOCK: {
    label: 'Full Length NEET MOCK (PCB)',
    shortLabel: 'NEET MOCK',
    totalQuestions: 180,
    totalMarks: 720,
    sections: [
      { name: 'Physics', start: 1, end: 45 },
      { name: 'Chemistry', start: 46, end: 90 },
      { name: 'Biology', start: 91, end: 180 },
    ],
    targetClasses: ['11th', '12th', 'Dropper'],
  },
}

export const SUBMISSION_WINDOWS = {
  '11th': { start: '09:30', end: '12:00' },
  '12th': { start: '10:30', end: '12:00' },
  Dropper: { start: '10:30', end: '12:00' },
}

export const ANSWER_OPTIONS = ['A', 'B', 'C', 'D'] as const

export const MARKS_CONFIG = {
  correct: 4,
  wrong: -1,
  unattempted: 0,
}
