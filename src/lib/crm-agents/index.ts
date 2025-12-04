/**
 * CRM AI Agents Module
 *
 * Export all CRM agent implementations and utilities
 */

// Base infrastructure
export {
  BaseAgent,
  AgentTaskManager,
  getLeadContext,
  getCommunicationContext,
  type AgentContext,
  type AgentResponse,
  type AgentAction,
  type AgentTaskInput,
} from './base'

// Individual agents
export { LeadQualifierAgent } from './leadQualifier'
export { NurtureAgent } from './nurture'
export { CallPrepAgent } from './callPrep'
export { ContentGeneratorAgent } from './contentGenerator'
export { CallTranscriptionService } from './callTranscription'
export { CallSummaryAgent } from './callSummary'
export { ActionItemExtractorAgent } from './actionItemExtractor'
export { ProductAgent } from './productAgent'
export type { CourseRecommendation, OfferSuggestion, UpsellOpportunity } from './productAgent'

// Agent factory
export { createAgent, AgentFactory } from './factory'

// Processor
export { AgentProcessor } from './processor'

// Triggers (automatic agent invocation)
export {
  triggerLeadQualification,
  triggerCallPrep,
  triggerCallAnalysis,
  triggerNurtureMessage,
  triggerStageChange,
  triggerDemoCompleted,
  triggerScheduledFollowUps,
  triggerContentGeneration,
  triggerProductRecommendation,
  triggerDemoProductMatch,
  triggerOfferGeneration,
} from './triggers'
