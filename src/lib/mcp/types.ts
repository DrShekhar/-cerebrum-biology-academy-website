/**
 * Cerebrum Biology Academy MCP Types
 * TypeScript definitions for AI-powered education system
 */

import { MCPRequest, MCPResponse } from '@modelcontextprotocol/sdk'

// Core MCP Server Configuration
export interface MCPServerConfig {
  name: string
  version: string
  port: number
  host: string
  maxConnections: number
  timeout: number
  security: SecurityConfig
  redis: RedisConfig
  encryption: EncryptionConfig
}

export interface SecurityConfig {
  enableAuth: boolean
  jwtSecret: string
  encryptionKey: string
  allowedOrigins: string[]
  rateLimiting: RateLimitConfig
}

export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message: string
}

export interface RedisConfig {
  host: string
  port: number
  password?: string
  db: number
  ttl: number
}

export interface EncryptionConfig {
  algorithm: string
  keyLength: number
  ivLength: number
}

// Educational Agent Interfaces
export interface EducationalAgent {
  id: string
  name: string
  type: AgentType
  capabilities: AgentCapability[]
  isActive: boolean
  handleRequest(request: StudentQuery): Promise<AgentResponse>
}

export enum AgentType {
  STUDENT_SUPPORT = 'student_support',
  CONTENT_GENERATOR = 'content_generator',
  ANALYTICS = 'analytics',
  ADAPTIVE_LEARNING = 'adaptive_learning',
  COMMUNICATION = 'communication',
}

export enum AgentCapability {
  DOUBT_RESOLUTION = 'doubt_resolution',
  QUESTION_GENERATION = 'question_generation',
  PROGRESS_TRACKING = 'progress_tracking',
  PERSONALIZATION = 'personalization',
  PARENT_COMMUNICATION = 'parent_communication',
  REAL_TIME_CHAT = 'real_time_chat',
  PERFORMANCE_ANALYTICS = 'performance_analytics',
  CURRICULUM_MAPPING = 'curriculum_mapping',
}

// Student and Query Types
export interface StudentQuery {
  id: string
  studentId: string
  agentType: AgentType
  query: string
  context: QueryContext
  timestamp: Date
  priority: QueryPriority
}

export interface QueryContext {
  topic?: BiologyTopic
  chapter?: string
  difficulty?: DifficultyLevel
  examType?: ExamType
  previousQueries?: string[]
  studentLevel?: StudentLevel
}

export enum QueryPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum DifficultyLevel {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum ExamType {
  NEET = 'neet',
  JEE = 'jee',
  BOARDS = 'boards',
  OLYMPIAD = 'olympiad',
}

export enum StudentLevel {
  CLASS_11 = 'class_11',
  CLASS_12 = 'class_12',
  DROPOUT = 'dropout',
  REPEATER = 'repeater',
}

// Biology-Specific Types
export interface BiologyTopic {
  id: string
  name: string
  chapter: string
  unit: BiologyUnit
  subtopics: string[]
  difficulty: DifficultyLevel
  examRelevance: ExamRelevance
  prerequisites: string[]
  estimatedTime: number // in minutes
}

export enum BiologyUnit {
  DIVERSITY_OF_LIVING_ORGANISMS = 'diversity_of_living_organisms',
  STRUCTURAL_ORGANISATION = 'structural_organisation',
  CELL_STRUCTURE_FUNCTION = 'cell_structure_function',
  PLANT_PHYSIOLOGY = 'plant_physiology',
  HUMAN_PHYSIOLOGY = 'human_physiology',
  REPRODUCTION = 'reproduction',
  GENETICS_EVOLUTION = 'genetics_evolution',
  BIOLOGY_HUMAN_WELFARE = 'biology_human_welfare',
  BIOTECHNOLOGY = 'biotechnology',
  ECOLOGY = 'ecology',
}

export interface ExamRelevance {
  neetWeightage: number // 1-10 scale
  boardsWeightage: number
  frequencyInExams: number
  topicImportance: TopicImportance
}

export enum TopicImportance {
  VERY_HIGH = 'very_high',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

// NEET Curriculum Integration
export interface NEETCurriculum {
  totalMarks: number
  biologyMarks: number
  totalQuestions: number
  biologyQuestions: number
  units: NEETUnit[]
  syllabus: NEETSyllabus
}

export interface NEETUnit {
  id: string
  name: string
  chapters: NEETChapter[]
  weightage: number // percentage
  expectedQuestions: number
}

export interface NEETChapter {
  id: string
  name: string
  topics: BiologyTopic[]
  practiceQuestions: number
  mockTests: number
}

export interface NEETSyllabus {
  class11Topics: string[]
  class12Topics: string[]
  deletedTopics: string[]
  addedTopics: string[]
  lastUpdated: Date
}

// Student Progress and Analytics
export interface StudentProgress {
  studentId: string
  overallProgress: number // percentage
  unitProgress: UnitProgress[]
  strengths: BiologyTopic[]
  weaknesses: BiologyTopic[]
  timeSpent: TimeTracking
  performanceMetrics: PerformanceMetrics
  recommendations: LearningRecommendation[]
}

export interface UnitProgress {
  unit: BiologyUnit
  completed: number // percentage
  accuracy: number // percentage
  timeSpent: number // minutes
  lastAccessed: Date
}

export interface TimeTracking {
  totalStudyTime: number // minutes
  weeklyAverage: number
  monthlyTrend: number[]
  sessionDuration: number[]
  peakStudyHours: number[]
}

export interface PerformanceMetrics {
  overallAccuracy: number
  questionsSolved: number
  testsCompleted: number
  rank: StudentRank
  improvementRate: number
  consistencyScore: number
}

export interface StudentRank {
  overall: number
  inBatch: number
  inState: number
  inCountry: number
  percentile: number
}

export interface LearningRecommendation {
  type: RecommendationType
  priority: QueryPriority
  topic: BiologyTopic
  action: string
  estimatedBenefit: number
  timeline: string
}

export enum RecommendationType {
  REVISION = 'revision',
  PRACTICE = 'practice',
  CONCEPT_CLARIFICATION = 'concept_clarification',
  MOCK_TEST = 'mock_test',
  WEAK_AREA_FOCUS = 'weak_area_focus',
}

// Parent Engagement
export interface ParentEngagement {
  parentId: string
  studentId: string
  notifications: ParentNotification[]
  reports: ProgressReport[]
  communications: ParentCommunication[]
  preferences: ParentPreferences
}

export interface ParentNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  priority: QueryPriority
}

export enum NotificationType {
  PROGRESS_UPDATE = 'progress_update',
  TEST_RESULT = 'test_result',
  ATTENDANCE = 'attendance',
  PAYMENT_REMINDER = 'payment_reminder',
  ACHIEVEMENT = 'achievement',
  CONCERN = 'concern',
}

export interface ProgressReport {
  id: string
  reportType: ReportType
  period: ReportPeriod
  metrics: ReportMetrics
  insights: string[]
  recommendations: string[]
  generatedAt: Date
}

export enum ReportType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  EXAM_SPECIFIC = 'exam_specific',
}

export interface ReportPeriod {
  startDate: Date
  endDate: Date
  description: string
}

export interface ReportMetrics {
  studyTime: number
  topicsCompleted: number
  accuracy: number
  rank: number
  improvement: number
}

export interface ParentCommunication {
  id: string
  channel: CommunicationChannel
  message: string
  timestamp: Date
  isFromParent: boolean
  response?: string
  responseTime?: Date
}

export enum CommunicationChannel {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  SMS = 'sms',
  IN_APP = 'in_app',
  PHONE_CALL = 'phone_call',
}

export interface ParentPreferences {
  preferredChannel: CommunicationChannel
  notificationFrequency: NotificationFrequency
  reportFrequency: ReportType
  language: string
  timezone: string
}

export enum NotificationFrequency {
  IMMEDIATE = 'immediate',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  ONLY_IMPORTANT = 'only_important',
}

// Agent Response Types
export interface AgentResponse {
  success: boolean
  data?: any
  message: string
  timestamp: Date
  processingTime: number // milliseconds
  agent: AgentInfo
  confidence?: number // 0-1 scale
}

export interface AgentInfo {
  id: string
  name: string
  type: AgentType
  version: string
}

// Security and Compliance
export interface SecurityPolicy {
  dataEncryption: boolean
  accessLogging: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  passwordPolicy: PasswordPolicy
  dataRetention: DataRetentionPolicy
}

export interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  expiryDays: number
}

export interface DataRetentionPolicy {
  studentData: number // months
  conversationLogs: number
  analyticsData: number
  auditLogs: number
}

export interface AuditLog {
  id: string
  timestamp: Date
  userId: string
  userType: UserType
  action: AuditAction
  resource: string
  details: Record<string, any>
  ipAddress: string
  userAgent: string
  status: AuditStatus
}

export enum UserType {
  STUDENT = 'student',
  PARENT = 'parent',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  SYSTEM = 'system',
}

export enum AuditAction {
  LOGIN = 'login',
  LOGOUT = 'logout',
  QUERY = 'query',
  PROGRESS_UPDATE = 'progress_update',
  PAYMENT = 'payment',
  DATA_ACCESS = 'data_access',
  CONFIGURATION_CHANGE = 'configuration_change',
}

export enum AuditStatus {
  SUCCESS = 'success',
  FAILURE = 'failure',
  WARNING = 'warning',
}

// WebSocket and Real-time Types
export interface WebSocketMessage {
  type: MessageType
  payload: any
  timestamp: Date
  sender: string
  recipient?: string
}

export enum MessageType {
  CHAT_MESSAGE = 'chat_message',
  PROGRESS_UPDATE = 'progress_update',
  NOTIFICATION = 'notification',
  SYSTEM_MESSAGE = 'system_message',
  TYPING_INDICATOR = 'typing_indicator',
}

// Error Types
export interface MCPError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
  requestId?: string
}

export enum ErrorCode {
  INVALID_REQUEST = 'INVALID_REQUEST',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  AGENT_UNAVAILABLE = 'AGENT_UNAVAILABLE',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}
