export interface FormState<T = unknown> {
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
  errors: Record<string, string>
  values: T
  touched: Record<string, boolean>
}

export interface FormFieldError {
  field: string
  message: string
}

export interface FormSubmitResult<T = unknown> {
  success: boolean
  data?: T
  errors?: FormFieldError[]
  message?: string
}

export interface BaseFormData {
  [key: string]: string | number | boolean | string[] | null | undefined
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  course?: string
  message?: string
  preferredTime?: string
}

export interface InquiryFormData extends ContactFormData {
  subject?: string
  urgency?: 'low' | 'medium' | 'high'
  source?: string
}

export interface SignupFormData {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword?: string
  termsAccepted: boolean
  targetExam?: string
  currentClass?: string
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ProfileFormData {
  name: string
  email: string
  phone?: string
  bio?: string
  avatarUrl?: string
  preferences?: Record<string, unknown>
}

export interface EnrollmentFormData {
  courseId: string
  studentName: string
  email: string
  phone: string
  paymentPlan: 'full' | 'installment'
  installmentCount?: number
  referralCode?: string
  notes?: string
}

export interface PaymentFormData {
  amount: number
  currency: string
  paymentMethod: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: Record<string, string>
}

export interface QuestionSubmitFormData {
  topic: string
  subtopic?: string
  question: string
  options?: string[]
  correctAnswer: string
  explanation?: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'
  type: string
  tags?: string[]
}

export interface TestConfigFormData {
  title: string
  description?: string
  duration: number
  totalQuestions: number
  topics: string[]
  difficulty: string
  randomizeQuestions?: boolean
  showAnswers?: boolean
  passingScore?: number
}

export interface AssignmentFormData {
  title: string
  description: string
  dueDate: Date | string
  maxMarks: number
  attachments?: string[]
  courseId: string
  classId?: string
}

export interface SessionFormData {
  title: string
  description?: string
  scheduledAt: Date | string
  duration: number
  courseId: string
  meetingLink?: string
  isOnline: boolean
  maxAttendees?: number
}

export interface FeedbackFormData {
  rating: number
  comment?: string
  category?: string
  suggestions?: string
  anonymousSubmission?: boolean
}

export type FormValidationRule =
  | { type: 'required'; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'phone'; message?: string }
  | { type: 'minLength'; value: number; message?: string }
  | { type: 'maxLength'; value: number; message?: string }
  | { type: 'pattern'; value: RegExp; message?: string }
  | { type: 'custom'; validator: (value: unknown) => boolean; message?: string }

export interface FormFieldConfig {
  name: string
  label: string
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: unknown
  validation?: FormValidationRule[]
  options?: Array<{ label: string; value: string }>
}
