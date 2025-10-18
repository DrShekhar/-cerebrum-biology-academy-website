#!/usr/bin/env tsx

/**
 * Agent List CLI
 *
 * Lists all available agents with their capabilities
 */

import { AgentRegistry } from '../src/lib/agents/orchestrator/AgentRegistry';

async function main() {
  const args = process.argv.slice(2);
  const tierFilter = args[0];

  console.log('\n🤖 Cerebrum Biology Academy - Available Agents\n');

  const registry = new AgentRegistry();
  await registry.registerAllAgents();

  let agents = registry.getAllAgents();

  if (tierFilter) {
    agents = registry.getAgentsByTier(tierFilter as any);
    console.log(`Filtering by tier: ${tierFilter}\n`);
  }

  console.log('='.repeat(100) + '\n');

  for (const agent of agents) {
    console.log(`\n🤖 ${agent.name}`);
    console.log(`   ID: ${agent.id}`);
    console.log(`   Type: ${agent.type}`);
    console.log(`   Tier: ${agent.tier}`);
    console.log(`   Enabled: ${agent.enabled ? '✅' : '❌'}`);
    console.log(`   Priority: ${agent.priority}/10`);
    console.log(`   Description: ${agent.description}`);

    if (agent.dependencies.length > 0) {
      console.log(`   Dependencies: ${agent.dependencies.join(', ')}`);
    }

    console.log(`   Capabilities:`);
    for (const capability of agent.capabilities) {
      console.log(`     - ${capability}`);
    }

    console.log(`   Model: ${agent.modelConfig.provider}/${agent.modelConfig.model}`);
    console.log(`   Temperature: ${agent.modelConfig.temperature}`);
    console.log(`   Max Tokens: ${agent.modelConfig.maxTokens}`);
  }

  console.log('\n' + '='.repeat(100) + '\n');
  console.log(`Total: ${agents.length} agents`);
  console.log('\nFilter by tier: npm run agent:list planning|development|quality|deployment|monitoring|coordination\n');
}

main().catch(console.error);
