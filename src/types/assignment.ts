export enum AssignmentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
}

export enum SubmissionStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  SUBMITTED = 'SUBMITTED',
  LATE = 'LATE',
  GRADED = 'GRADED',
  RESUBMIT_REQUIRED = 'RESUBMIT_REQUIRED',
}

export interface Assignment {
  id: string
  teacherId: string
  courseId?: string | null
  chapterId?: string | null
  topicId?: string | null
  title: string
  description: string
  instructions?: string | null
  maxMarks: number
  dueDate: Date | string
  allowLateSubmission: boolean
  allowResubmission: boolean
  latePenaltyPercentage: number
  status: AssignmentStatus
  attachments: string[]
  createdAt: Date | string
  updatedAt: Date | string
  publishedAt?: Date | string | null
  teacher?: {
    id: string
    name: string
    email: string
  }
  course?: {
    id: string
    name: string
  } | null
  chapter?: {
    id: string
    title: string
  } | null
  topic?: {
    id: string
    title: string
  } | null
  submissionStats?: {
    total: number
    submitted: number
    graded: number
    pending: number
    late: number
  }
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  submittedFiles: string[]
  submittedText?: string | null
  status: SubmissionStatus
  submittedAt?: Date | string | null
  grade?: number | null
  feedback?: string | null
  gradedAt?: Date | string | null
  isLate: boolean
  resubmissionCount: number
  lastResubmittedAt?: Date | string | null
  createdAt: Date | string
  updatedAt: Date | string
  assignment?: Assignment
  student?: {
    id: string
    name: string
    email: string
    phone?: string | null
  }
}

export interface CreateAssignmentInput {
  courseId?: string
  chapterId?: string
  topicId?: string
  title: string
  description: string
  instructions?: string
  maxMarks: number
  dueDate: string
  allowLateSubmission: boolean
  allowResubmission: boolean
  latePenaltyPercentage?: number
  status: AssignmentStatus
  attachments?: string[]
}

export interface UpdateAssignmentInput extends Partial<CreateAssignmentInput> {
  id: string
}

export interface SubmitAssignmentInput {
  assignmentId: string
  submittedFiles: string[]
  submittedText?: string
}

export interface GradeSubmissionInput {
  submissionId: string
  grade: number
  feedback?: string
}

export interface AssignmentFilters {
  courseId?: string
  chapterId?: string
  topicId?: string
  status?: AssignmentStatus
  search?: string
  page?: number
  limit?: number
}

export interface SubmissionFilters {
  assignmentId?: string
  studentId?: string
  status?: SubmissionStatus
  isLate?: boolean
  page?: number
  limit?: number
}

export interface AssignmentStats {
  totalAssignments: number
  draftAssignments: number
  publishedAssignments: number
  closedAssignments: number
  upcomingDeadlines: number
}

export interface StudentAssignmentStats {
  totalAssignments: number
  pendingSubmissions: number
  submittedAssignments: number
  gradedAssignments: number
  averageGrade?: number
}

export interface AssignmentNotification {
  type: 'NEW_ASSIGNMENT' | 'DEADLINE_REMINDER' | 'GRADED' | 'RESUBMIT_REQUIRED'
  assignmentId: string
  assignmentTitle: string
  recipientIds: string[]
  scheduledFor?: Date
}

export interface FileUploadResult {
  success: boolean
  fileUrl?: string
  fileName?: string
  fileSize?: number
  error?: string
}
