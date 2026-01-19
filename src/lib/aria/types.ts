/**
 * ARIA Sales Agent - TypeScript Interfaces
 * Defines types for the AI-powered sales agent system
 */

export type Language = 'en' | 'hi'

export type LeadStage = 'chat' | 'name' | 'phone' | 'class' | 'complete'

export type MessageSender = 'user' | 'bot'

export type MessageType = 'text' | 'card' | 'carousel' | 'date-picker' | 'quick-actions'

export interface AriaMessage {
  id: string
  text: string
  sender: MessageSender
  timestamp: Date
  type?: MessageType
  quickActions?: string[]
  metadata?: {
    intent?: string
    language?: Language
    isStreaming?: boolean
  }
}

export interface LeadData {
  name: string
  phone: string
  studentClass: string
  city?: string
  email?: string
  score: number
  interests: string[]
  source: string
  language: Language
}

export interface ConversationState {
  sessionId: string
  messages: AriaMessage[]
  leadData: LeadData
  leadStage: LeadStage
  language: Language
  lastActivity: Date
  isNewVisitor: boolean
  visitCount: number
}

export interface AriaChatRequest {
  message: string
  conversationHistory: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
  language?: Language
  context?: {
    currentPage?: string
    leadStage?: LeadStage
    leadData?: Partial<LeadData>
  }
}

export interface AriaChatResponse {
  text: string
  intent?: string
  suggestedActions?: string[]
  shouldCaptureInfo?: {
    type: 'name' | 'phone' | 'class' | 'city'
    prompt: string
  }
  language: Language
}

export interface AriaAnalyticsEvent {
  event:
    | 'aria_opened'
    | 'aria_closed'
    | 'aria_message_sent'
    | 'aria_ai_response'
    | 'aria_lead_capture_started'
    | 'aria_lead_captured'
    | 'aria_demo_booked'
    | 'aria_whatsapp_clicked'
    | 'aria_language_changed'
    | 'aria_proactive_shown'
    | 'aria_proactive_accepted'
    | 'aria_proactive_dismissed'
    | 'aria_error'
  params?: Record<string, string | number | boolean>
}

export interface ProactiveEngagementConfig {
  exitIntentDelay: number
  timeOnPageDelay: number
  scrollDepthThreshold: number
  pricingPageDelay: number
  returningVisitorDelay: number
}

export interface ConversationPersistenceConfig {
  storageKey: string
  maxMessages: number
  expiryDays: number
}
