import type { users } from '@/generated/prisma'

export type ID = string

export type Timestamp = Date | string

export interface BaseModel {
  id: ID
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface SoftDeletable {
  deletedAt?: Timestamp | null
  isDeleted?: boolean
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived'

export type SortOrder = 'asc' | 'desc'

export interface TimeRange {
  start: Timestamp
  end: Timestamp
}

export interface DateRange {
  from: Timestamp
  to: Timestamp
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Address {
  street?: string
  city?: string
  state?: string
  country: string
  zipCode?: string
  coordinates?: Coordinates
}

export interface FileUpload {
  id: ID
  name: string
  url: string
  size: number
  mimeType: string
  uploadedAt: Timestamp
}

export interface ImageAsset extends FileUpload {
  width?: number
  height?: number
  thumbnailUrl?: string
  alt?: string
}

export interface VideoAsset extends FileUpload {
  duration?: number
  thumbnailUrl?: string
  resolution?: string
}

export interface Metadata {
  [key: string]: string | number | boolean | null | undefined
}

export interface SEOData {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN' | 'COUNSELOR' | 'PARENT'

export interface BaseUser {
  id: ID
  name: string
  email: string
  phone?: string | null
  role: UserRole
  emailVerified?: Timestamp | null
  phoneVerified?: Timestamp | null
}

export type PrismaUser = users

export interface UserSession extends BaseUser {
  valid: boolean
  userId?: string
  expiresAt?: Timestamp
}

export interface SessionUser {
  id: ID
  name: string
  email: string
  role: UserRole
  image?: string | null
}

export interface AuthSession {
  user: SessionUser
  expires: string
}

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'

export type QuestionType =
  | 'MCQ'
  | 'SHORT_ANSWER'
  | 'DIAGRAM'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'MULTIPLE_SELECT'
  | 'MATCH_FOLLOWING'
  | 'NUMERICAL'

export type Curriculum = 'NEET' | 'CBSE' | 'STATE_BOARD' | 'ICSE'

export type Grade = 'CLASS_9' | 'CLASS_10' | 'CLASS_11' | 'CLASS_12' | 'DROPPER'

export type Subject = 'biology' | 'physics' | 'chemistry'

export interface QuestionFilters {
  topic?: string
  subtopic?: string
  curriculum?: Curriculum
  grade?: Grade
  subject?: Subject
  type?: QuestionType
  difficulty?: DifficultyLevel
  category?: string
  tags?: string[]
  isActive?: boolean
  isVerified?: boolean
}

export interface Topic {
  id: ID
  name: string
  slug: string
  description?: string
  parentId?: ID | null
  order?: number
  metadata?: Metadata
}

export interface Tag {
  id: ID
  name: string
  slug: string
  count?: number
  category?: string
}

export interface Achievement {
  id: ID
  title: string
  description: string
  iconUrl?: string
  criteria: Metadata
  points?: number
}

export interface Notification {
  id: ID
  userId: ID
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  actionUrl?: string
  createdAt: Timestamp
}

export interface Activity {
  id: ID
  userId: ID
  type: string
  description: string
  metadata?: Metadata
  timestamp: Timestamp
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
  group?: string
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P]
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T[P] extends object
      ? DeepReadonly<T[P]>
      : T[P]
}

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type Maybe<T> = T | null | undefined

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
