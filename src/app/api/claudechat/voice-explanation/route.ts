/**
 * API Route: Voice Explanation
 * Generate Shekhar Sir's voice synthesis for biology explanations
 */

import { NextRequest, NextResponse } from 'next/server'
import { Anthropic } from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

interface VoiceRequest {
  concept: string
  description: string
  neetRelevance: string
  voice: 'shekhar-sir' | 'ai-study-buddy' | 'motivational-coach'
  language: 'english' | 'hindi' | 'hinglish'
  emotion: 'encouraging' | 'explaining' | 'celebrating' | 'questioning'
  speed?: number
}

interface VoiceResponse {
  audioUrl: string
  duration: number
  transcript: string
  teachingStyle: string
}

export async function POST(request: NextRequest) {
  try {
    const voiceRequest: VoiceRequest = await request.json()

    // Generate enhanced educational script
    const script = await generateEducationalScript(voiceRequest)

    // Generate voice audio (mock implementation)
    const voiceResponse = await generateVoiceAudio(script, voiceRequest)

    return NextResponse.json(voiceResponse)
  } catch (error) {
    console.error('Voice explanation error:', error)
    return NextResponse.json({ error: 'Failed to generate voice explanation' }, { status: 500 })
  }
}

async function generateEducationalScript(request: VoiceRequest): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 800,
      messages: [
        {
          role: 'user',
          content: `You are Shekhar Sir, a beloved NEET Biology teacher known for making complex concepts simple and memorable.

Generate an audio script for explaining this biology concept:

Concept: ${request.concept}
Description: ${request.description}
NEET Relevance: ${request.neetRelevance}

Requirements:
- Voice: ${request.voice}
- Language: ${request.language}
- Emotion: ${request.emotion}
- Teaching style: Encouraging, clear, with examples
- Include memory tricks or mnemonics
- Add enthusiasm and motivation
- Keep it 60-90 seconds when spoken
- Use simple language that builds confidence

Make it sound like a caring teacher who wants every student to succeed in NEET!`,
        },
      ],
    })

    const content = response.content[0]
    if (content.type === 'text') {
      return enhanceScriptForVoice(content.text, request)
    }

    return generateFallbackScript(request)
  } catch (error) {
    console.error('Script generation error:', error)
    return generateFallbackScript(request)
  }
}

function enhanceScriptForVoice(script: string, request: VoiceRequest): string {
  let enhanced = script

  // Add voice-specific enhancements
  switch (request.voice) {
    case 'shekhar-sir':
      enhanced = addTeacherPersonality(enhanced)
      break
    case 'ai-study-buddy':
      enhanced = addFriendlyTone(enhanced)
      break
    case 'motivational-coach':
      enhanced = addMotivationalElements(enhanced)
      break
  }

  // Add language-specific elements
  if (request.language === 'hindi') {
    enhanced = addHindiPhrases(enhanced)
  } else if (request.language === 'hinglish') {
    enhanced = addHinglishMix(enhanced)
  }

  // Add emotion-specific elements
  switch (request.emotion) {
    case 'encouraging':
      enhanced = `Great question! ${enhanced} You're doing excellent work in Biology!`
      break
    case 'explaining':
      enhanced = `Let me explain this clearly. ${enhanced} Does this make sense?`
      break
    case 'celebrating':
      enhanced = `Fantastic! ${enhanced} You're mastering NEET Biology!`
      break
    case 'questioning':
      enhanced = `Think about this: ${enhanced} What do you think happens next?`
      break
  }

  return enhanced
}

function addTeacherPersonality(script: string): string {
  return script
    .replace(/\./g, '. *pause*')
    .replace(/important/gi, '*emphasis* important *emphasis*')
    .replace(/remember/gi, '*gentle* remember *gentle*')
}

function addFriendlyTone(script: string): string {
  return `Hey buddy! ${script} Let's keep learning together!`
}

function addMotivationalElements(script: string): string {
  return `Champion! ${script} You've got this! Every concept you learn gets you closer to your NEET success!`
}

function addHindiPhrases(script: string): string {
  return script
    .replace(/understand/gi, 'samjho')
    .replace(/remember/gi, 'yaad rakho')
    .replace(/good/gi, 'bahut accha')
}

function addHinglishMix(script: string): string {
  return script
    .replace(/very important/gi, 'bahut important')
    .replace(/understand/gi, 'samjho')
    .replace(/good/gi, 'accha')
}

async function generateVoiceAudio(script: string, request: VoiceRequest): Promise<VoiceResponse> {
  try {
    // Mock voice generation for demo
    // In production, integrate with ElevenLabs, Azure Cognitive Services, or custom TTS

    const mockAudioUrl = generateMockAudio(script, request)
    const duration = estimateDuration(script)

    return {
      audioUrl: mockAudioUrl,
      duration,
      transcript: script,
      teachingStyle: getTeachingStyle(request.voice),
    }
  } catch (error) {
    console.error('Voice generation error:', error)
    throw error
  }
}

function generateMockAudio(script: string, request: VoiceRequest): string {
  // Generate a mock audio URL
  // In production, this would be actual TTS generation
  const encodedScript = encodeURIComponent(script)
  const voiceParams = `voice=${request.voice}&lang=${request.language}&emotion=${request.emotion}`

  return `/api/tts/generate?text=${encodedScript}&${voiceParams}`
}

function estimateDuration(script: string): number {
  // Estimate duration based on word count (average 150 words per minute)
  const wordCount = script.split(' ').length
  const wordsPerMinute = 150
  return Math.ceil((wordCount / wordsPerMinute) * 60) // Duration in seconds
}

function getTeachingStyle(voice: string): string {
  switch (voice) {
    case 'shekhar-sir':
      return 'Authoritative yet caring, like a experienced teacher who has helped thousands of students succeed'
    case 'ai-study-buddy':
      return 'Friendly and supportive, like a study partner who learns alongside you'
    case 'motivational-coach':
      return 'Energetic and inspiring, focused on building confidence and determination'
    default:
      return 'Clear and educational'
  }
}

function generateFallbackScript(request: VoiceRequest): string {
  return `Let me explain ${request.concept} in a simple way. ${request.description} This is important for NEET because ${request.neetRelevance}. Keep practicing, and you'll master this concept!`
}

// Enhanced voice synthesis configurations
export const VOICE_CONFIGS = {
  'shekhar-sir': {
    baseModel: 'shekhar-sir-v2.0',
    characteristics: {
      warmth: 0.8,
      authority: 0.9,
      patience: 0.95,
      clarity: 0.9,
      enthusiasm: 0.7,
    },
    voiceParams: {
      pitch: 0.0, // Neutral
      speed: 0.9, // Slightly slower for clarity
      emphasis: 0.8,
      breathiness: 0.3,
    },
  },
  'ai-study-buddy': {
    baseModel: 'friendly-ai-v1.5',
    characteristics: {
      warmth: 0.9,
      authority: 0.6,
      patience: 0.8,
      clarity: 0.85,
      enthusiasm: 0.9,
    },
    voiceParams: {
      pitch: 0.1, // Slightly higher
      speed: 1.0, // Normal speed
      emphasis: 0.7,
      breathiness: 0.4,
    },
  },
  'motivational-coach': {
    baseModel: 'coach-v1.0',
    characteristics: {
      warmth: 0.7,
      authority: 0.8,
      patience: 0.7,
      clarity: 0.8,
      enthusiasm: 0.95,
    },
    voiceParams: {
      pitch: 0.05,
      speed: 1.1, // Slightly faster for energy
      emphasis: 0.9,
      breathiness: 0.2,
    },
  },
}

// Language-specific enhancements
export const LANGUAGE_ENHANCEMENTS = {
  english: {
    pronunciation: 'clear-american',
    intonation: 'educational',
    pauses: 'natural',
  },
  hindi: {
    pronunciation: 'clear-hindi',
    intonation: 'respectful',
    pauses: 'cultural',
  },
  hinglish: {
    pronunciation: 'mixed-clear',
    intonation: 'friendly',
    pauses: 'natural',
  },
}
