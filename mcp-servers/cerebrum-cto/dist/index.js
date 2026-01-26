#!/usr/bin/env node
/**
 * Cerebrum CTO MCP Server
 *
 * Provides AI-powered tools for the CERI (Cerebrum Engineering & Research Intelligence) agent.
 *
 * Tools:
 * - codebase_search: Semantic search across the codebase
 * - tech_debt_list: List and prioritize technical debt
 * - dependency_audit: Check for outdated/vulnerable dependencies
 * - performance_check: Run Lighthouse/bundle analysis
 * - memory_read: Read CTO memory files
 * - memory_update: Update CTO memory files
 *
 * Resources:
 * - edtech_news: Fetch latest EdTech news
 * - competitor_updates: Track competitor changes
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { searchCodebase } from './tools/codebase-search.js'
import { listTechDebt, addTechDebt } from './tools/tech-debt-tracker.js'
import { auditDependencies } from './tools/dependency-auditor.js'
import { checkPerformance } from './tools/performance-monitor.js'
import { readMemory, updateMemory } from './tools/memory-manager.js'
import { fetchEdtechNews } from './resources/edtech-news.js'
import { getCompetitorUpdates } from './resources/competitor-watch.js'
// Initialize MCP server
const server = new Server(
  {
    name: 'cerebrum-cto',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
)
// ============================================
// TOOLS
// ============================================
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'codebase_search',
        description:
          'Semantic search across the Cerebrum codebase. Use for finding relevant code, patterns, or implementations.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description:
                'Natural language search query (e.g., "authentication logic", "payment processing")',
            },
            fileTypes: {
              type: 'array',
              items: { type: 'string' },
              description: 'File extensions to search (e.g., [".ts", ".tsx"])',
            },
            maxResults: {
              type: 'number',
              description: 'Maximum number of results (default: 10)',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'tech_debt_list',
        description: 'List all tracked technical debt items with priorities and status.',
        inputSchema: {
          type: 'object',
          properties: {
            priority: {
              type: 'string',
              enum: ['critical', 'high', 'medium', 'low', 'all'],
              description: 'Filter by priority level',
            },
            status: {
              type: 'string',
              enum: ['open', 'in_progress', 'done', 'all'],
              description: 'Filter by status',
            },
          },
        },
      },
      {
        name: 'tech_debt_add',
        description: 'Add a new technical debt item to the tracker.',
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Brief title of the debt item' },
            description: { type: 'string', description: 'Detailed description' },
            priority: {
              type: 'string',
              enum: ['critical', 'high', 'medium', 'low'],
            },
            effort: { type: 'string', description: 'Estimated effort (e.g., "2 days")' },
            impact: { type: 'string', description: 'What is affected' },
          },
          required: ['title', 'priority'],
        },
      },
      {
        name: 'dependency_audit',
        description:
          'Audit project dependencies for outdated packages and security vulnerabilities.',
        inputSchema: {
          type: 'object',
          properties: {
            checkSecurity: {
              type: 'boolean',
              description: 'Run npm audit for security issues',
            },
            checkOutdated: {
              type: 'boolean',
              description: 'Check for outdated packages',
            },
          },
        },
      },
      {
        name: 'performance_check',
        description: 'Run performance analysis on the website.',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL to analyze (default: production URL)',
            },
            type: {
              type: 'string',
              enum: ['lighthouse', 'bundle', 'both'],
              description: 'Type of analysis',
            },
          },
        },
      },
      {
        name: 'memory_read',
        description: 'Read CTO memory files (decisions, learnings, roadmap, tech-debt).',
        inputSchema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              enum: ['decisions', 'learnings', 'roadmap', 'tech-debt', 'all'],
              description: 'Which memory file to read',
            },
          },
          required: ['file'],
        },
      },
      {
        name: 'memory_update',
        description: 'Append content to a CTO memory file.',
        inputSchema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              enum: ['decisions', 'learnings', 'roadmap', 'tech-debt'],
              description: 'Which memory file to update',
            },
            content: {
              type: 'string',
              description: 'Content to append (markdown format)',
            },
          },
          required: ['file', 'content'],
        },
      },
    ],
  }
})
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params
  try {
    switch (name) {
      case 'codebase_search':
        return await searchCodebase(args)
      case 'tech_debt_list':
        return await listTechDebt(args)
      case 'tech_debt_add':
        return await addTechDebt(args)
      case 'dependency_audit':
        return await auditDependencies(args)
      case 'performance_check':
        return await checkPerformance(args)
      case 'memory_read':
        return await readMemory(args)
      case 'memory_update':
        return await updateMemory(args)
      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        }
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    }
  }
})
// ============================================
// RESOURCES
// ============================================
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'cerebrum://edtech-news',
        name: 'EdTech News',
        description: 'Latest news and trends in educational technology',
        mimeType: 'application/json',
      },
      {
        uri: 'cerebrum://competitor-updates',
        name: 'Competitor Updates',
        description: 'Recent changes from NEET coaching competitors',
        mimeType: 'application/json',
      },
      {
        uri: 'cerebrum://neet-updates',
        name: 'NEET Exam Updates',
        description: 'Latest NTA announcements and exam updates',
        mimeType: 'application/json',
      },
    ],
  }
})
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params
  switch (uri) {
    case 'cerebrum://edtech-news':
      return await fetchEdtechNews()
    case 'cerebrum://competitor-updates':
      return await getCompetitorUpdates()
    case 'cerebrum://neet-updates':
      // TODO: Implement NTA news fetching
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({ message: 'NEET updates coming soon' }),
          },
        ],
      }
    default:
      throw new Error(`Unknown resource: ${uri}`)
  }
})
// ============================================
// START SERVER
// ============================================
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Cerebrum CTO MCP server running on stdio')
}
main().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
//# sourceMappingURL=index.js.map
