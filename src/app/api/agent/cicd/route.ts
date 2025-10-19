import { NextRequest, NextResponse } from 'next/server'
import { createCICDAgent } from '@/lib/ai/claude-agent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * CI/CD Agent API Endpoint
 *
 * POST /api/agent/cicd
 *
 * Usage:
 * curl -X POST http://localhost:3000/api/agent/cicd \
 *   -H "Content-Type: application/json" \
 *   -d '{"action": "analyze", "issueType": "build"}'
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, issueType, directory, platform, buildCommand, issue, workflow } = body

    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
    }

    // Create and run the CI/CD agent
    const response = await createCICDAgent()

    return NextResponse.json({
      success: true,
      message: 'CI/CD Agent executed successfully',
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('CI/CD Agent error:', error)
    return NextResponse.json(
      {
        error: 'Failed to execute CI/CD agent',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    agent: 'CI/CD Pipeline Agent',
    features: [
      'Analyze codebase',
      'Check build logs',
      'Verify deployment config',
      'Run local builds',
      'Fix common issues',
      'Setup GitHub Actions',
    ],
    timestamp: new Date().toISOString(),
  })
}
