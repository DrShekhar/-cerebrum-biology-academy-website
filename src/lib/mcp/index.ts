/**
 * Cerebrum Biology Academy MCP Server
 * Main exports for AI-powered education infrastructure
 * Revenue Potential: ₹5,00,00,000+ monthly
 */

export { CerebrumMCPServer } from './mcpServer'
export { StudentSupportAgent } from './tools/studentSupport'
export { ContentGeneratorAgent } from './tools/contentGenerator'
export { AnalyticsAgent } from './tools/analytics'
export { CommunicationAgent } from './tools/communication'
export { SecurityManager } from './security/encryption'
export { ComplianceManager } from './security/compliance'
export { AuditLogger } from './security/audit'
export { BiologyConfig } from './config/education'
export { AgentConfig } from './config/agents'

// Types and interfaces
export type {
  MCPServerConfig,
  EducationalAgent,
  StudentQuery,
  BiologyTopic,
  NEETCurriculum,
  StudentProgress,
  ParentEngagement,
  SecurityPolicy,
  AuditLog,
} from './types'
