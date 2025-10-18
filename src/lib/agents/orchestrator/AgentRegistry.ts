/**
 * Agent Registry
 *
 * Central registry for all agents in the system.
 * Manages agent configuration, registration, and retrieval.
 */

import type { AgentConfig, AgentType, AgentTier } from '../types'
import { productManagerConfig } from '../planning/ProductManagerAgent'
import { architectureReviewConfig } from '../planning/ArchitectureReviewAgent'
import { uiUxDeveloperConfig } from '../development/UIUXDeveloperAgent'
import { backendDeveloperConfig } from '../development/BackendDeveloperAgent'
import { databaseMigrationConfig } from '../development/DatabaseMigrationAgent'
import { integrationConfig } from '../development/IntegrationAgent'
import { codeQualityConfig } from '../quality/CodeQualityAgent'
import { unitTestConfig } from '../quality/UnitTestAgent'
import { e2eTestConfig } from '../quality/E2ETestAgent'
import { securityAuditConfig } from '../quality/SecurityAuditAgent'
import { buildValidationConfig } from '../deployment/BuildValidationAgent'
import { gitOperationsConfig } from '../deployment/GitOperationsAgent'
import { deploymentConfig } from '../deployment/DeploymentAgent'
import { rollbackConfig } from '../deployment/RollbackAgent'
import { performanceMonitorConfig } from '../monitoring/PerformanceMonitorAgent'
import { errorTrackingConfig } from '../monitoring/ErrorTrackingAgent'
import { analyticsConfig } from '../monitoring/AnalyticsAgent'
import { learningConfig } from '../coordination/LearningAgent'
import { documentationConfig } from '../coordination/DocumentationAgent'

export class AgentRegistry {
  private agents: Map<AgentType, AgentConfig>

  constructor() {
    this.agents = new Map()
  }

  /**
   * Register all agents in the system
   */
  async registerAllAgents(): Promise<void> {
    // Tier 1: Planning Agents
    this.registerAgent(productManagerConfig)
    this.registerAgent(architectureReviewConfig)

    // Tier 2: Development Agents
    this.registerAgent(uiUxDeveloperConfig)
    this.registerAgent(backendDeveloperConfig)
    this.registerAgent(databaseMigrationConfig)
    this.registerAgent(integrationConfig)

    // Tier 3: Quality Agents
    this.registerAgent(codeQualityConfig)
    this.registerAgent(unitTestConfig)
    this.registerAgent(e2eTestConfig)
    this.registerAgent(securityAuditConfig)

    // Tier 4: Deployment Agents
    this.registerAgent(buildValidationConfig)
    this.registerAgent(gitOperationsConfig)
    this.registerAgent(deploymentConfig)
    this.registerAgent(rollbackConfig)

    // Tier 5: Monitoring Agents
    this.registerAgent(performanceMonitorConfig)
    this.registerAgent(errorTrackingConfig)
    this.registerAgent(analyticsConfig)

    // Tier 6: Coordination Agents
    this.registerAgent(learningConfig)
    this.registerAgent(documentationConfig)

    console.log(`✅ Registered ${this.agents.size} agents`)
  }

  /**
   * Register a single agent
   */
  registerAgent(config: AgentConfig): void {
    this.agents.set(config.type, config)
  }

  /**
   * Get agent by type
   */
  getAgent(type: AgentType): AgentConfig | undefined {
    return this.agents.get(type)
  }

  /**
   * Get all agents
   */
  getAllAgents(): AgentConfig[] {
    return Array.from(this.agents.values())
  }

  /**
   * Get agents by tier
   */
  getAgentsByTier(tier: AgentTier): AgentConfig[] {
    return Array.from(this.agents.values()).filter((agent) => agent.tier === tier)
  }

  /**
   * Get enabled agents
   */
  getEnabledAgents(): AgentConfig[] {
    return Array.from(this.agents.values()).filter((agent) => agent.enabled)
  }

  /**
   * Enable/disable an agent
   */
  setAgentEnabled(type: AgentType, enabled: boolean): void {
    const agent = this.agents.get(type)
    if (agent) {
      agent.enabled = enabled
    }
  }

  /**
   * Update agent configuration
   */
  updateAgentConfig(type: AgentType, updates: Partial<AgentConfig>): void {
    const agent = this.agents.get(type)
    if (agent) {
      Object.assign(agent, updates)
    }
  }
}
