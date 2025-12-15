import { OMRSubjectType, OMRPaperStatus, OMRAnswerKeyStatus } from '@/generated/prisma'

export type AnswerOption = 'A' | 'B' | 'C' | 'D' | null

export interface SubmittedAnswers {
  [questionNo: string]: AnswerOption
}

export interface SectionConfig {
  name: string
  start: number
  end: number
}

export interface SectionResult {
  total: number
  attempted: number
  correct: number
  wrong: number
  unattempted: number
  marks: number
  maxMarks: number
  percentage: number
}

export interface QuestionResult {
  questionNo: number
  section: string
  studentAnswer: AnswerOption
  correctAnswer: string
  isCorrect: boolean
  marks: number
  explanation?: string
  topic?: string
}

export interface CalculationResult {
  totalQuestions: number
  totalAttempted: number
  totalCorrect: number
  totalWrong: number
  totalUnattempted: number
  marksObtained: number
  maxMarks: number
  percentage: number
  sectionResults: Record<string, SectionResult>
  questionResults: QuestionResult[]
}

export interface OMRPaperWithKeys {
  id: string
  paperCode: string
  title: string
  description: string | null
  subjectType: OMRSubjectType
  targetClass: string
  totalQuestions: number
  totalMarks: number
  marksPerCorrect: number
  marksPerWrong: number
  marksPerUnattempted: number
  sections: SectionConfig[] | null
  examDate: Date
  submissionStart: Date
  submissionEnd: Date
  hasVerifiedKey: boolean
  verifiedKeyUploadedAt: Date | null
  status: OMRPaperStatus
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  answerKeys: AnswerKey[]
}

export interface AnswerKey {
  id: string
  paperId: string
  questionNo: number
  section: string | null
  correctAnswer: string
  explanation: string | null
  topic: string | null
  subtopic: string | null
  difficulty: string | null
  keyStatus: OMRAnswerKeyStatus
  verifiedBy: string | null
  verifiedAt: Date | null
}

export interface OMRSubmissionInput {
  paperId: string
  studentName: string
  studentPhone: string
  studentEmail?: string
  studentClass: string
  studentRollNo?: string
  submittedAnswers: SubmittedAnswers
  useVerifiedKey: boolean
}

export interface OMRResultResponse {
  success: boolean
  submissionId: string
  result: CalculationResult
  paper: {
    paperCode: string
    title: string
    subjectType: OMRSubjectType
  }
  keyType: 'verified' | 'unverified'
  submittedAt: Date
}
