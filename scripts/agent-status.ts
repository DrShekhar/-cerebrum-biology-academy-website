#!/usr/bin/env tsx

/**
 * Agent Status CLI
 *
 * Shows the status of all agents in the system
 */

import { AgentRegistry } from '../src/lib/agents/orchestrator/AgentRegistry'

async function main() {
  console.log('\n🤖 Cerebrum Biology Academy - Agent Status\n')
  console.log('='.repeat(80) + '\n')

  const registry = new AgentRegistry()
  await registry.registerAllAgents()

  const agents = registry.getAllAgents()
  const enabledAgents = registry.getEnabledAgents()

  console.log(`📊 Total Agents: ${agents.length}`)
  console.log(`✅ Enabled: ${enabledAgents.length}`)
  console.log(`❌ Disabled: ${agents.length - enabledAgents.length}\n`)

  // Group by tier
  const tiers = ['planning', 'development', 'quality', 'deployment', 'monitoring', 'coordination']

  for (const tier of tiers) {
    const tierAgents = agents.filter((a) => a.tier === tier)
    if (tierAgents.length === 0) continue

    console.log(`\n📁 ${tier.toUpperCase()} (${tierAgents.length} agents)`)
    console.log('-'.repeat(80))

    for (const agent of tierAgents) {
      const status = agent.enabled ? '✅' : '❌'
      const priority = `P${agent.priority}`
      console.log(`  ${status} ${agent.name.padEnd(35)} [${priority}] ${agent.description}`)
    }
  }

  console.log('\n' + '='.repeat(80) + '\n')
}

main().catch(console.error)
