/**
 * Comprehensive Agent System for Cerebrum Biology Academy
 *
 * This system provides a complete agentic workflow for non-technical users
 * to develop, test, and deploy features without writing code.
 */

// ============================================================================
// AGENT TYPES & ENUMS
// ============================================================================

export enum AgentTier {
  PLANNING = 'planning',
  DEVELOPMENT = 'development',
  QUALITY = 'quality',
  DEPLOYMENT = 'deployment',
  MONITORING = 'monitoring',
  COORDINATION = 'coordination',
}

export enum AgentType {
  // Tier 1: Planning Agents
  PRODUCT_MANAGER = 'product_manager',
  ARCHITECTURE_REVIEW = 'architecture_review',

  // Tier 2: Development Agents
  UI_UX_DEVELOPER = 'ui_ux_developer',
  BACKEND_DEVELOPER = 'backend_developer',
  DATABASE_MIGRATION = 'database_migration',
  INTEGRATION = 'integration',

  // Tier 3: Quality Assurance Agents
  CODE_QUALITY = 'code_quality',
  UNIT_TEST = 'unit_test',
  E2E_TEST = 'e2e_test',
  SECURITY_AUDIT = 'security_audit',

  // Tier 4: Deployment Agents
  BUILD_VALIDATION = 'build_validation',
  GIT_OPERATIONS = 'git_operations',
  DEPLOYMENT = 'deployment',
  ROLLBACK = 'rollback',

  // Tier 5: Monitoring Agents
  PERFORMANCE_MONITOR = 'performance_monitor',
  ERROR_TRACKING = 'error_tracking',
  ANALYTICS = 'analytics',

  // Tier 6: Coordination Agents
  MASTER_ORCHESTRATOR = 'master_orchestrator',
  LEARNING = 'learning',
  DOCUMENTATION = 'documentation',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  BLOCKED = 'blocked',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
}

export enum TaskPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface AgentConfig {
  id: string
  type: AgentType
  tier: AgentTier
  name: string
  description: string
  enabled: boolean
  priority: number
  dependencies: AgentType[]
  capabilities: string[]
  modelConfig: ModelConfig
  retryConfig?: RetryConfig
  timeoutMs?: number
}

export interface ModelConfig {
  provider: 'anthropic' | 'openai'
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
}

export interface RetryConfig {
  maxRetries: number
  backoffMs: number
  exponentialBackoff: boolean
}

// ============================================================================
// TASK INTERFACES
// ============================================================================

export interface AgentTask {
  id: string
  type: string
  agentType: AgentType
  status: TaskStatus
  priority: TaskPriority
  title: string
  description: string
  input: Record<string, any>
  output?: Record<string, any>
  error?: AgentError
  dependencies: string[]
  createdAt: Date
  startedAt?: Date
  completedAt?: Date
  retryCount: number
  metadata: Record<string, any>
}

export interface AgentError {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
  recoverable: boolean
}

// ============================================================================
// WORKFLOW INTERFACES
// ============================================================================

export interface FeatureRequest {
  id: string
  userRequest: string
  parsedRequirements?: Requirements
  technicalSpec?: TechnicalSpecification
  implementationPlan?: ImplementationPlan
  status: WorkflowStatus
  createdAt: Date
  createdBy: string
}

export interface Requirements {
  title: string
  description: string
  userStories: UserStory[]
  acceptanceCriteria: string[]
  technicalRequirements: string[]
  securityRequirements: string[]
  performanceRequirements: string[]
  dependencies: string[]
}

export interface UserStory {
  role: string
  action: string
  benefit: string
  acceptanceCriteria: string[]
}

export interface TechnicalSpecification {
  architecture: ArchitectureDecision[]
  database: DatabaseChanges
  api: APIEndpoint[]
  ui: UIComponent[]
  integrations: Integration[]
  security: SecurityMeasure[]
  testing: TestingStrategy
}

export interface ArchitectureDecision {
  decision: string
  rationale: string
  alternatives: string[]
  consequences: string[]
}

export interface DatabaseChanges {
  models: PrismaModel[]
  migrations: Migration[]
  seeds?: SeedData[]
}

export interface PrismaModel {
  name: string
  fields: PrismaField[]
  relations: PrismaRelation[]
  indexes?: PrismaIndex[]
}

export interface PrismaField {
  name: string
  type: string
  required: boolean
  unique: boolean
  default?: any
  attributes?: string[]
}

export interface PrismaRelation {
  field: string
  targetModel: string
  type: 'one-to-one' | 'one-to-many' | 'many-to-many'
}

export interface PrismaIndex {
  fields: string[]
  unique: boolean
}

export interface Migration {
  name: string
  description: string
  up: string
  down: string
}

export interface SeedData {
  model: string
  data: Record<string, any>[]
}

export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  description: string
  authentication: boolean
  authorization?: string[]
  requestBody?: Record<string, any>
  responseBody?: Record<string, any>
  errorCodes: string[]
}

export interface UIComponent {
  name: string
  type: 'page' | 'component' | 'layout'
  path?: string
  description: string
  props?: Record<string, any>
  state?: string[]
  dependencies: string[]
}

export interface Integration {
  service: string
  purpose: string
  apiKeys: string[]
  configuration: Record<string, any>
}

export interface SecurityMeasure {
  type: 'authentication' | 'authorization' | 'encryption' | 'validation' | 'sanitization'
  description: string
  implementation: string
}

export interface TestingStrategy {
  unitTests: TestSuite[]
  e2eTests: TestSuite[]
  coverage: {
    minimum: number
    target: number
  }
}

export interface TestSuite {
  name: string
  description: string
  tests: TestCase[]
}

export interface TestCase {
  name: string
  description: string
  steps: string[]
  expectedResult: string
}

export interface ImplementationPlan {
  phases: ImplementationPhase[]
  estimatedDuration: string
  risks: Risk[]
  rollbackPlan: string[]
}

export interface ImplementationPhase {
  name: string
  description: string
  tasks: AgentTask[]
  estimatedDuration: string
  dependencies: string[]
}

export interface Risk {
  description: string
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  mitigation: string
}

export enum WorkflowStatus {
  CREATED = 'created',
  PLANNING = 'planning',
  ARCHITECTURE_REVIEW = 'architecture_review',
  DEVELOPMENT = 'development',
  TESTING = 'testing',
  DEPLOYMENT_PREP = 'deployment_prep',
  DEPLOYING = 'deploying',
  DEPLOYED = 'deployed',
  FAILED = 'failed',
  ROLLED_BACK = 'rolled_back',
}

// ============================================================================
// AGENT EXECUTION INTERFACES
// ============================================================================

export interface AgentContext {
  featureRequest: FeatureRequest
  currentPhase: string
  completedTasks: AgentTask[]
  pendingTasks: AgentTask[]
  artifacts: Artifact[]
  environment: Environment
}

export interface Artifact {
  id: string
  type: ArtifactType
  name: string
  path?: string
  content?: string
  metadata: Record<string, any>
  createdBy: AgentType
  createdAt: Date
}

export enum ArtifactType {
  CODE_FILE = 'code_file',
  TEST_FILE = 'test_file',
  MIGRATION = 'migration',
  DOCUMENTATION = 'documentation',
  BUILD_OUTPUT = 'build_output',
  TEST_RESULT = 'test_result',
  DEPLOYMENT_LOG = 'deployment_log',
}

export interface Environment {
  projectRoot: string
  nodeVersion: string
  packageManager: 'npm' | 'yarn' | 'pnpm'
  framework: string
  database: string
  deploymentTarget: string
  envVars: Record<string, string>
}

// ============================================================================
// AGENT RESPONSE INTERFACES
// ============================================================================

export interface AgentResponse {
  taskId: string
  agentType: AgentType
  status: TaskStatus
  result?: AgentResult
  error?: AgentError
  artifacts?: Artifact[]
  nextTasks?: AgentTask[]
  duration: number
  timestamp: Date
}

export interface AgentResult {
  success: boolean
  message: string
  data: Record<string, any>
  recommendations?: string[]
  warnings?: string[]
}

// ============================================================================
// ORCHESTRATOR INTERFACES
// ============================================================================

export interface OrchestratorConfig {
  maxConcurrentTasks: number
  taskQueueSize: number
  healthCheckInterval: number
  enableLearning: boolean
  enableMonitoring: boolean
  logLevel: 'debug' | 'info' | 'warn' | 'error'
}

export interface WorkflowExecution {
  id: string
  featureRequestId: string
  status: WorkflowStatus
  currentPhase: string
  tasks: AgentTask[]
  artifacts: Artifact[]
  startTime: Date
  endTime?: Date
  duration?: number
  metrics: WorkflowMetrics
}

export interface WorkflowMetrics {
  totalTasks: number
  completedTasks: number
  failedTasks: number
  skippedTasks: number
  averageTaskDuration: number
  buildSuccessRate: number
  testCoverage?: number
  deploymentSuccess: boolean
}

// ============================================================================
// COMMUNICATION INTERFACES
// ============================================================================

export interface AgentMessage {
  id: string
  from: AgentType
  to: AgentType | 'orchestrator' | 'user'
  type: MessageType
  content: any
  timestamp: Date
  priority: TaskPriority
}

export enum MessageType {
  TASK_ASSIGNMENT = 'task_assignment',
  TASK_COMPLETE = 'task_complete',
  TASK_FAILED = 'task_failed',
  REQUEST_ASSISTANCE = 'request_assistance',
  STATUS_UPDATE = 'status_update',
  USER_NOTIFICATION = 'user_notification',
  SYSTEM_EVENT = 'system_event',
}

// ============================================================================
// LEARNING & ANALYTICS INTERFACES
// ============================================================================

export interface LearningData {
  pattern: string
  frequency: number
  successRate: number
  examples: string[]
  lastSeen: Date
}

export interface AgentPerformance {
  agentType: AgentType
  totalTasks: number
  successfulTasks: number
  failedTasks: number
  averageDuration: number
  errorPatterns: Record<string, number>
}

// ============================================================================
// USER INTERFACE
// ============================================================================

export interface UserCommand {
  command: string
  featureDescription: string
  options?: {
    skipTests?: boolean
    autoApprove?: boolean
    deployImmediately?: boolean
    branch?: string
  }
}

export interface UserNotification {
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  details?: string[]
  actions?: NotificationAction[]
  timestamp: Date
}

export interface NotificationAction {
  label: string
  action: string
  destructive?: boolean
}
