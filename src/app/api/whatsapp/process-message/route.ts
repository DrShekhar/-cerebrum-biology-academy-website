/**
 * WhatsApp Message Processing API
 * Manual endpoint for processing WhatsApp messages
 * Used for testing and direct message processing
 */

import { NextRequest, NextResponse } from 'next/server'
import { WhatsAppMessageProcessor } from '@/lib/whatsapp/messageProcessor'

interface ProcessMessageRequest {
  phoneNumber: string
  studentName?: string
  message: {
    type: 'text' | 'audio' | 'image'
    content: string | { audioId?: string; imageId?: string; caption?: string }
  }
  context?: {
    conversationId?: string
    previousMessageId?: string
  }
}

interface ProcessMessageResponse {
  success: boolean
  response?: {
    text: string
    interactiveButtons?: any
    neetRelevance: string
    ncertReference: string
  }
  error?: string
  rateLimitExceeded?: boolean
}

export async function POST(request: NextRequest): Promise<NextResponse<ProcessMessageResponse>> {
  try {
    const body: ProcessMessageRequest = await request.json()

    // Validate request
    if (!body.phoneNumber || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: phoneNumber and message',
        },
        { status: 400 }
      )
    }


    const messageProcessor = new WhatsAppMessageProcessor()

    // Create educational message object
    const educationalMessage = {
      messageId: `manual_${Date.now()}`,
      from: body.phoneNumber,
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'manual',
      studentName: body.studentName || 'Student',
      timestamp: new Date().toISOString(),
      type: body.message.type,
      content: formatMessageContent(body.message),
      context: body.context,
    }

    // Process the message
    await messageProcessor.processEducationalMessage(educationalMessage)

    return NextResponse.json({
      success: true,
      response: {
        text: 'Message processed successfully. Response sent via WhatsApp.',
        neetRelevance: 'Check WhatsApp for detailed NEET-relevant explanation',
        ncertReference: 'NCERT references included in WhatsApp response',
      },
    })
  } catch (error: any) {
    console.error('❌ Message processing failed:', error)

    if (error.message?.includes('rate limit')) {
      return NextResponse.json(
        {
          success: false,
          rateLimitExceeded: true,
          error: 'Daily question limit exceeded (50 questions per day)',
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process message',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const phoneNumber = searchParams.get('phoneNumber')

  if (!phoneNumber) {
    return NextResponse.json(
      {
        error: 'phoneNumber parameter required',
      },
      { status: 400 }
    )
  }

  try {
    const messageProcessor = new WhatsAppMessageProcessor()

    // Get student information and stats
    const studentStats = await getStudentStats(phoneNumber)

    return NextResponse.json({
      success: true,
      studentStats,
    })
  } catch (error) {
    console.error('❌ Failed to get student stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve student information',
      },
      { status: 500 }
    )
  }
}

function formatMessageContent(message: ProcessMessageRequest['message']): any {
  switch (message.type) {
    case 'text':
      return {
        text: message.content as string,
        type: 'text_question',
      }

    case 'audio':
      const audioContent = message.content as { audioId?: string }
      return {
        audioId: audioContent.audioId,
        isVoiceNote: true,
        type: 'voice_question',
      }

    case 'image':
      const imageContent = message.content as { imageId?: string; caption?: string }
      return {
        imageId: imageContent.imageId,
        caption: imageContent.caption || '',
        type: 'diagram_question',
      }

    default:
      return {
        raw: message.content,
        type: 'unknown',
      }
  }
}

async function getStudentStats(phoneNumber: string): Promise<{
  questionsToday: number
  totalQuestions: number
  dailyLimit: number
  canAskMore: boolean
  topTopics: string[]
  preferredLanguage: string
  joinDate: string
}> {
  // This would integrate with the StudentTracker
  // For now, return mock data
  return {
    questionsToday: 5,
    totalQuestions: 25,
    dailyLimit: 50,
    canAskMore: true,
    topTopics: ['Cell Biology', 'Genetics', 'Plant Biology'],
    preferredLanguage: 'english',
    joinDate: new Date().toISOString().split('T')[0],
  }
}
