// Core types for Ceri AI system

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  isStreaming?: boolean
  metadata?: MessageMetadata
}

export interface MessageMetadata {
  model?: string
  tokens?: number
  cached?: boolean
  latency?: number
}

export interface Conversation {
  id: string
  userId?: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  title?: string
  tags?: string[]
}

export interface StreamResponse {
  text: string
  done: boolean
  error?: string
}

export interface CacheConfig {
  enabled: boolean
  ttl: number // seconds
  keyPrefix: string
}

export interface StudyPlan {
  id: string
  userId: string
  title: string
  subjects: StudySubject[]
  dailySchedule: DailySchedule[]
  createdAt: Date
  updatedAt: Date
}

export interface StudySubject {
  name: string
  chapters: Chapter[]
  priority: 'high' | 'medium' | 'low'
  completed: number // percentage
}

export interface Chapter {
  id: string
  title: string
  topics: string[]
  estimatedHours: number
  completed: boolean
  notes?: string
}

export interface DailySchedule {
  date: Date
  subjects: string[]
  tasks: StudyTask[]
  totalHours: number
}

export interface StudyTask {
  id: string
  title: string
  subject: string
  chapter: string
  duration: number // minutes
  priority: 'high' | 'medium' | 'low'
  completed: boolean
}

export interface DiagramData {
  id: string
  title: string
  category: BiologyCategory
  svgPath: string
  interactiveElements: InteractiveElement[]
  description: string
}

export type BiologyCategory =
  | 'cell-biology'
  | 'genetics'
  | 'evolution'
  | 'ecology'
  | 'human-anatomy'
  | 'plant-anatomy'
  | 'biochemistry'
  | 'molecular-biology'

export interface InteractiveElement {
  id: string
  label: string
  description: string
  coordinates: { x: number; y: number }
  highlightPath?: string
}

export interface LatexConfig {
  displayMode: boolean
  throwOnError: boolean
  strict: boolean
  trust: boolean
  macros: Record<string, string>
}

export interface WhatsAppMessage {
  from: string
  to: string
  body: string
  mediaUrl?: string
  messageId: string
  timestamp: Date
}

export interface WhatsAppSession {
  phoneNumber: string
  conversationId: string
  lastMessageAt: Date
  messageCount: number
  isActive: boolean
}
