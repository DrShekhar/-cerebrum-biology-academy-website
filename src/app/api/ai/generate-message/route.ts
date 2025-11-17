/**
 * AI Message Generation API
 * Generates contextual WhatsApp messages using AI based on lead data and intent
 * Week 1 Quick Win: Smart Message Drafts
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import prisma from '@/lib/prisma'
import {
  generateWhatsAppMessage,
  suggestIntent,
  type LeadContext,
  type MessageGenerationOptions,
} from '@/lib/ai/messageGenerationService'
import { z } from 'zod'

// Request validation schema
const GenerateMessageSchema = z.object({
  leadId: z.string(),
  intent: z
    .enum([
      'follow_up',
      'demo_reminder',
      'offer_follow_up',
      'payment_reminder',
      'general',
      'custom',
    ])
    .optional(),
  tone: z.enum(['professional', 'friendly', 'persuasive']).optional(),
  customInstructions: z.string().optional(),
})

async function handlePOST(req: NextRequest, session: any) {
  try {
    // Parse and validate request body
    const body = await req.json()
    const validatedData = GenerateMessageSchema.parse(body)

    const { leadId, intent, tone, customInstructions } = validatedData

    // Fetch lead data with all relevant context
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        communications: {
          orderBy: { sentAt: 'desc' },
          take: 5, // Last 5 communications for context
        },
        tasks: {
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
        offers: {
          where: { status: 'PENDING' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    // Build lead context for AI
    const leadContext: LeadContext = {
      studentName: lead.studentName,
      parentName: lead.parentName || undefined,
      phone: lead.phone,
      email: lead.email || undefined,
      stage: lead.stage,
      priority: (lead.priority as 'HOT' | 'WARM' | 'COLD') || 'WARM',
      source: lead.source || undefined,
      lastContactedAt: lead.lastContactedAt || undefined,
      communicationHistory: lead.communications.map((comm) => ({
        type: comm.type,
        message: comm.message,
        sentAt: comm.sentAt,
      })),
      notes:
        lead.notes
          .map((note) => note.content)
          .join('\n')
          .trim() || undefined,
      interests: lead.courseInterest || undefined,
      demoScheduled: lead.stage === 'DEMO_SCHEDULED',
      offerSent: lead.offers.length > 0,
    }

    // Determine intent (use provided or auto-suggest)
    const messageIntent = intent || suggestIntent(leadContext)

    // Build message generation options
    const options: MessageGenerationOptions = {
      intent: messageIntent,
      tone: tone || 'friendly',
      maxLength: 300,
      includeCallToAction: true,
      customInstructions: customInstructions,
    }

    console.log('🤖 Generating AI message:', {
      leadId,
      studentName: lead.studentName,
      intent: messageIntent,
      tone: options.tone,
    })

    // Generate message using AI service
    const result = await generateWhatsAppMessage(leadContext, options)

    console.log('✅ AI message generated successfully')

    return NextResponse.json({
      success: true,
      data: {
        message: result.message,
        intent: messageIntent,
        rationale: result.rationale,
        suggestedTiming: result.suggestedTiming,
        leadContext: {
          studentName: lead.studentName,
          stage: lead.stage,
          priority: lead.priority,
        },
      },
    })
  } catch (error) {
    console.error('❌ AI message generation error:', error)

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    // Handle AI service errors
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate AI message',
      },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
