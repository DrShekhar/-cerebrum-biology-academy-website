// Unified AI Chat API - Simplified version for immediate deployment
// Complex AI features temporarily disabled to resolve build issues

import { NextRequest, NextResponse } from 'next/server'

// Force Node.js runtime
export const runtime = 'nodejs'

interface ChatRequest {
  message: string
  context?: {
    subject?: string
    studentLevel?: string
    language?: string
    sessionId?: string
    userId?: string
  }
  options?: {
    provider?: string
    model?: 'fast' | 'default' | 'premium'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequest
    const { message, context } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Simple response generation (placeholder until AI client is fixed)
    const response = {
      success: true,
      message: `Thank you for your question about Biology! Our AI service is being upgraded. For immediate assistance, please contact us at +91 88264 44334 or visit our website.

Your question: "${message}"

We'll have our advanced AI features back online shortly.`,
      metadata: {
        provider: 'fallback',
        model: 'simple',
        responseTime: 100,
        cached: false,
        cost: 0,
        tokensUsed: 0,
      },
      context: {
        sessionId: context?.sessionId || `session_${Date.now()}`,
        messageId: `msg_${Date.now()}`,
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('AI Chat Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process chat message',
        message:
          'I apologize, but I encountered an error. Please try again or contact support at +91 88264 44334.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// GET endpoint for chat capabilities and status
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'operational',
      capabilities: {
        providers: ['fallback'],
        defaultProvider: 'fallback',
        models: ['simple'],
        features: ['Basic text chat', 'Contact information', 'Service status'],
      },
      message: 'AI services are being upgraded. Advanced features will be available soon.',
      contact: '+91 88264 44334',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: 'Service unavailable',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
