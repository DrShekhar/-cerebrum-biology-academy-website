/**
 * Agent Factory
 *
 * Creates and manages instances of CRM agents.
 */

import { AgentType } from '@/generated/prisma'
import { BaseAgent } from './base'
import { LeadQualifierAgent } from './leadQualifier'
import { NurtureAgent } from './nurture'
import { CallPrepAgent } from './callPrep'
import { ContentGeneratorAgent } from './contentGenerator'
import { CallSummaryAgent } from './callSummary'
import { ActionItemExtractorAgent } from './actionItemExtractor'

// Agent instances cache
const agentInstances: Map<AgentType, BaseAgent> = new Map()

/**
 * Create or get a cached agent instance
 */
export function createAgent(agentType: AgentType): BaseAgent | null {
  // Check cache first
  if (agentInstances.has(agentType)) {
    return agentInstances.get(agentType)!
  }

  let agent: BaseAgent | null = null

  switch (agentType) {
    case AgentType.LEAD_QUALIFIER:
      agent = new LeadQualifierAgent()
      break

    case AgentType.NURTURE:
      agent = new NurtureAgent()
      break

    case AgentType.CALL_PREP:
      agent = new CallPrepAgent()
      break

    case AgentType.CONTENT_GENERATOR:
      agent = new ContentGeneratorAgent()
      break

    case AgentType.CALL_SUMMARY:
      agent = new CallSummaryAgent()
      break

    case AgentType.ACTION_EXTRACTOR:
      agent = new ActionItemExtractorAgent()
      break

    case AgentType.CALL_TRANSCRIPTION:
      // Transcription is handled separately as a service, not an agent
      console.warn('CALL_TRANSCRIPTION should use CallTranscriptionService directly')
      return null

    default:
      console.error(`Unknown agent type: ${agentType}`)
      return null
  }

  // Cache the instance
  if (agent) {
    agentInstances.set(agentType, agent)
  }

  return agent
}

/**
 * Agent Factory class for more control
 */
export class AgentFactory {
  private static instance: AgentFactory

  private constructor() {}

  static getInstance(): AgentFactory {
    if (!AgentFactory.instance) {
      AgentFactory.instance = new AgentFactory()
    }
    return AgentFactory.instance
  }

  /**
   * Get an agent by type
   */
  getAgent(agentType: AgentType): BaseAgent | null {
    return createAgent(agentType)
  }

  /**
   * Get all available agent types
   */
  getAvailableAgentTypes(): AgentType[] {
    return [
      AgentType.LEAD_QUALIFIER,
      AgentType.NURTURE,
      AgentType.CALL_PREP,
      AgentType.CONTENT_GENERATOR,
      AgentType.CALL_SUMMARY,
      AgentType.ACTION_EXTRACTOR,
    ]
  }

  /**
   * Check if an agent type is available
   */
  isAgentAvailable(agentType: AgentType): boolean {
    return this.getAvailableAgentTypes().includes(agentType)
  }

  /**
   * Get agent description
   */
  getAgentDescription(agentType: AgentType): string {
    const descriptions: Record<AgentType, string> = {
      LEAD_QUALIFIER: 'Analyzes lead data and assigns scores, priorities, and recommended actions',
      NURTURE: 'Generates personalized follow-up messages for leads at different stages',
      CALL_PREP: 'Prepares counselors for calls with talking points and objection handling',
      CONTENT_GENERATOR: 'Creates marketing content, templates, and personalized messages',
      CALL_TRANSCRIPTION: 'Transcribes call recordings using OpenAI Whisper',
      CALL_SUMMARY: 'Analyzes call transcripts and generates summaries with insights',
      ACTION_EXTRACTOR: 'Extracts actionable tasks from call transcripts and creates CRM tasks',
    }

    return descriptions[agentType] || 'Unknown agent'
  }

  /**
   * Clear cached instances
   */
  clearCache(): void {
    agentInstances.clear()
  }
}
