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

// Agent factory
export { createAgent, AgentFactory } from './factory'

// Processor
export { AgentProcessor } from './processor'
