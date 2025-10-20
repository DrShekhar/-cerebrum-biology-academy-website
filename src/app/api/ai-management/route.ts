/**
 * AI Management API - Master Control Panel
 * Unified interface for hyper-intelligent API management
 */

import { NextRequest, NextResponse } from 'next/server'
import { HyperIntelligentRouter } from '@/lib/api/HyperIntelligentRouter'
import { VisualEnhancementEngine } from '@/lib/api/VisualEnhancementEngine'
import { CreditManagementSystem } from '@/lib/api/CreditManagementSystem'
import { VoiceSynthesis } from '@/lib/api/VoiceSynthesis'

// Lazy-load services on first request
let aiRouter: HyperIntelligentRouter | null = null
let visualEngine: VisualEnhancementEngine | null = null
let creditSystem: CreditManagementSystem | null = null
let voiceSynthesis: VoiceSynthesis | null = null

function getServices() {
  if (!aiRouter) aiRouter = new HyperIntelligentRouter()
  if (!visualEngine) visualEngine = new VisualEnhancementEngine()
  if (!creditSystem) creditSystem = new CreditManagementSystem()
  if (!voiceSynthesis) voiceSynthesis = new VoiceSynthesis()
  return { aiRouter, visualEngine, creditSystem, voiceSynthesis }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize services (sets module-level variables)
    getServices()
    const { action, data } = await request.json()

    switch (action) {
      case 'process_question':
        return await processQuestion(data)

      case 'generate_visual':
        return await generateVisual(data)

      case 'synthesize_voice':
        return await synthesizeVoice(data)

      case 'check_credits':
        return await checkCredits(data)

      case 'upgrade_tier':
        return await upgradeTier(data)

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('AI Management API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Initialize services (sets module-level variables)
    getServices()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const userId = searchParams.get('userId')

    switch (type) {
      case 'credits':
        if (!userId) {
          return NextResponse.json({ error: 'User ID required' }, { status: 400 })
        }
        const credits = await creditSystem!.getStudentCredits(userId)
        return NextResponse.json({ success: true, credits })

      case 'usage_analytics':
        if (!userId) {
          return NextResponse.json({ error: 'User ID required' }, { status: 400 })
        }
        const analytics = await creditSystem!.getUsageAnalytics(userId)
        return NextResponse.json({ success: true, analytics })

      case 'tier_comparison':
        const tiers = creditSystem!.getTierComparison()
        return NextResponse.json({ success: true, tiers })

      case 'voice_profiles':
        const profiles = voiceSynthesis!.getVoiceProfiles()
        return NextResponse.json({ success: true, profiles })

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('AI Management GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Action handlers

async function processQuestion(data: any) {
  const { userId, question, context, preferences } = data

  if (!userId || !question) {
    return NextResponse.json({ error: 'User ID and question are required' }, { status: 400 })
  }

  // Check credits first
  const creditCheck = await creditSystem!.checkCreditsAvailable(
    userId,
    0.01, // Estimated cost
    'text_question'
  )

  if (!creditCheck.allowed) {
    return NextResponse.json({
      success: false,
      error: creditCheck.reason,
      suggestedAction: creditCheck.suggestedAction,
      remaining: creditCheck.remaining,
    })
  }

  // Process question with AI router
  const aiRequest = {
    id: `req_${Date.now()}`,
    userId,
    content: question,
    type: determineQuestionType(question),
    context,
    priority: preferences?.priority || 'medium',
    requiresVisuals: preferences?.includeVisuals || false,
    language: preferences?.language || 'english',
    studentLevel: preferences?.level || 'intermediate',
  }

  const response = await aiRouter!.routeRequest(aiRequest)

  // Generate visuals if requested
  let visualResponse = null
  if (preferences?.includeVisuals && shouldGenerateVisuals(question)) {
    try {
      visualResponse = await visualEngine!.generateBiologyDiagram({
        type: 'diagram',
        content: question,
        subject: 'Biology',
        complexity: preferences?.level === 'beginner' ? 'simple' : 'detailed',
        style: 'educational',
        language: preferences?.language || 'english',
      })
    } catch (error) {
      console.warn('Visual generation failed:', error)
    }
  }

  // Generate voice response if requested
  let voiceResponse = null
  if (preferences?.includeVoice) {
    try {
      voiceResponse = await voiceSynthesis!.generateExplanationAudio(
        response.content,
        extractTopic(question),
        preferences?.language || 'english'
      )
    } catch (error) {
      console.warn('Voice synthesis failed:', error)
    }
  }

  // Deduct credits
  await creditSystem!.deductCredits(
    userId,
    response.tokens,
    response.cost,
    response.provider,
    `Question: ${question.substring(0, 50)}...`
  )

  return NextResponse.json({
    success: true,
    response: {
      content: response.content,
      provider: response.provider,
      confidence: response.confidence,
      latency: response.latency,
      cached: response.cached,
      visual: visualResponse,
      voice: voiceResponse,
      metadata: {
        tokens: response.tokens,
        cost: response.cost,
        timestamp: response.timestamp,
      },
    },
    remaining: creditCheck.remaining - 1,
  })
}

async function generateVisual(data: any) {
  const { userId, type, content, preferences } = data

  if (!userId || !content) {
    return NextResponse.json({ error: 'User ID and content are required' }, { status: 400 })
  }

  // Check credits and tier permissions
  const creditCheck = await creditSystem.checkCreditsAvailable(
    userId,
    0.04, // DALL-E cost
    'visual_generation'
  )

  if (!creditCheck.allowed) {
    return NextResponse.json({
      success: false,
      error: creditCheck.reason,
      suggestedAction: creditCheck.suggestedAction,
    })
  }

  let visualResponse

  switch (type) {
    case 'diagram':
      visualResponse = await visualEngine!.generateBiologyDiagram({
        type: 'diagram',
        content,
        subject: preferences?.subject || 'Biology',
        complexity: preferences?.complexity || 'detailed',
        style: preferences?.style || 'educational',
        language: preferences?.language || 'english',
      })
      break

    case 'molecule':
      visualResponse = await visualEngine!.generate3DMolecule(content)
      break

    case 'anatomy':
      visualResponse = await visualEngine!.generateAnatomyDiagram(
        content,
        preferences?.labels || []
      )
      break

    case 'process_flow':
      visualResponse = await visualEngine!.generateProcessFlow(content, preferences?.steps || [])
      break

    case 'formula':
      visualResponse = await visualEngine!.renderChemicalFormula(content, preferences?.context)
      break

    default:
      return NextResponse.json({ error: 'Invalid visual type' }, { status: 400 })
  }

  // Deduct credits for visual generation
  await creditSystem!.deductCredits(
    userId,
    0, // No tokens for visual generation
    visualResponse.cost,
    'visual_generation',
    `Visual: ${type} - ${content.substring(0, 50)}...`
  )

  return NextResponse.json({
    success: true,
    visual: visualResponse,
  })
}

async function synthesizeVoice(data: any) {
  const { userId, text, preferences } = data

  if (!userId || !text) {
    return NextResponse.json({ error: 'User ID and text are required' }, { status: 400 })
  }

  // Check credits
  const estimatedCost = voiceSynthesis!.estimateCost(text)
  const creditCheck = await creditSystem!.checkCreditsAvailable(
    userId,
    estimatedCost,
    'voice_synthesis'
  )

  if (!creditCheck.allowed) {
    return NextResponse.json({
      success: false,
      error: creditCheck.reason,
      suggestedAction: creditCheck.suggestedAction,
    })
  }

  const voiceResponse = await voiceSynthesis!.synthesizeTeacherVoice({
    text,
    language: preferences?.language || 'english',
    emotion: preferences?.emotion || 'explanatory',
    speed: preferences?.speed || 'normal',
    format: preferences?.format || 'mp3',
  })

  // Deduct credits
  await creditSystem!.deductCredits(
    userId,
    0, // No tokens for voice synthesis
    voiceResponse.cost,
    'voice_synthesis',
    `Voice: ${text.substring(0, 50)}...`
  )

  return NextResponse.json({
    success: true,
    voice: voiceResponse,
  })
}

async function checkCredits(data: any) {
  const { userId } = data

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const credits = await creditSystem!.getStudentCredits(userId)
  const alerts = await creditSystem!.generateBillingAlerts(userId)

  return NextResponse.json({
    success: true,
    credits,
    alerts,
  })
}

async function upgradeTier(data: any) {
  const { userId, newTier } = data

  if (!userId || !newTier) {
    return NextResponse.json({ error: 'User ID and new tier are required' }, { status: 400 })
  }

  try {
    const updatedCredits = await creditSystem!.upgradeStudentTier(userId, newTier)

    return NextResponse.json({
      success: true,
      message: `Successfully upgraded to ${newTier} tier`,
      credits: updatedCredits,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upgrade failed',
      },
      { status: 400 }
    )
  }
}

// Utility functions

function determineQuestionType(
  question: string
): 'quick_answer' | 'complex_reasoning' | 'diagram_analysis' | 'formula_explanation' {
  const questionLower = question.toLowerCase()

  if (questionLower.includes('what is') || questionLower.includes('define')) {
    return 'quick_answer'
  } else if (
    questionLower.includes('explain') ||
    questionLower.includes('why') ||
    questionLower.includes('how')
  ) {
    return 'complex_reasoning'
  } else if (
    questionLower.includes('diagram') ||
    questionLower.includes('structure') ||
    questionLower.includes('show')
  ) {
    return 'diagram_analysis'
  } else if (
    questionLower.includes('formula') ||
    questionLower.includes('equation') ||
    questionLower.includes('reaction')
  ) {
    return 'formula_explanation'
  }

  return 'complex_reasoning'
}

function shouldGenerateVisuals(question: string): boolean {
  const visualKeywords = [
    'diagram',
    'structure',
    'anatomy',
    'show',
    'draw',
    'illustrate',
    'picture',
    'image',
    'visual',
    'graph',
    'chart',
    'process',
    'cycle',
  ]

  const questionLower = question.toLowerCase()
  return visualKeywords.some((keyword) => questionLower.includes(keyword))
}

function extractTopic(question: string): string {
  const biologicalTopics = [
    'photosynthesis',
    'respiration',
    'genetics',
    'cell',
    'dna',
    'rna',
    'nervous system',
    'digestive system',
    'circulatory system',
    'reproductive system',
    'evolution',
    'ecology',
    'anatomy',
    'physiology',
  ]

  const questionLower = question.toLowerCase()

  for (const topic of biologicalTopics) {
    if (questionLower.includes(topic)) {
      return topic
    }
  }

  return 'biology'
}
