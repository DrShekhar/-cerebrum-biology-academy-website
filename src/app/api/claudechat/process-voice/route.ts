/**
 * API Route: Process Voice Input
 * Handle multi-language voice questions and generate appropriate responses
 */

import { NextRequest, NextResponse } from 'next/server'
import { Anthropic } from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

interface VoiceRequest {
  transcript: string
  language: 'english' | 'hindi' | 'hinglish'
  confidence: number
  conversationHistory?: Array<{
    type: 'user' | 'assistant'
    content: string
    timestamp: string
  }>
}

interface VoiceResponse {
  text: string
  audioUrl: string
  confidence: number
  detectedIntent: string
  suggestedQuestions: string[]
  biologyTopic: string
  neetRelevance: string
}

export async function POST(request: NextRequest) {
  try {
    const voiceRequest: VoiceRequest = await request.json()

    // Validate input
    if (!voiceRequest.transcript?.trim()) {
      return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })
    }

    // Process the voice input
    const response = await processVoiceInput(voiceRequest)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Voice processing error:', error)
    return NextResponse.json({ error: 'Failed to process voice input' }, { status: 500 })
  }
}

async function processVoiceInput(request: VoiceRequest): Promise<VoiceResponse> {
  try {
    // Analyze the voice input with Claude
    const analysis = await analyzeVoiceInput(request)

    // Generate educational response
    const educationalResponse = await generateEducationalResponse(analysis, request)

    // Generate voice audio
    const audioUrl = await generateVoiceAudio(educationalResponse, request.language)

    return {
      text: educationalResponse.text,
      audioUrl,
      confidence: analysis.confidence,
      detectedIntent: analysis.intent,
      suggestedQuestions: educationalResponse.followUpQuestions,
      biologyTopic: analysis.biologyTopic,
      neetRelevance: educationalResponse.neetRelevance,
    }
  } catch (error) {
    console.error('Voice processing failed:', error)
    throw error
  }
}

async function analyzeVoiceInput(request: VoiceRequest) {
  const conversationContext =
    request.conversationHistory?.map((msg) => `${msg.type}: ${msg.content}`).join('\n') ||
    'No previous conversation'

  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: `You are Shekhar Sir, expert NEET Biology teacher. Analyze this student's voice input:

Student Question: "${request.transcript}"
Language: ${request.language}
Confidence: ${request.confidence}

Previous Conversation:
${conversationContext}

Analyze and return JSON:
{
  "intent": "question_type (explanation, clarification, doubt, test, etc.)",
  "biologyTopic": "main biology topic/concept",
  "difficulty": "beginner/intermediate/advanced",
  "confidence": 0.0-1.0,
  "emotionalState": "confused/curious/frustrated/confident",
  "keyWords": ["important", "terms"],
  "misconceptions": ["common", "misconceptions", "to", "address"]
}

Focus on understanding the student's learning needs.`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type === 'text') {
    try {
      return JSON.parse(content.text)
    } catch {
      // Fallback parsing
      return parseAnalysisFromText(content.text, request)
    }
  }

  return generateFallbackAnalysis(request)
}

async function generateEducationalResponse(analysis: any, request: VoiceRequest) {
  const languageInstruction = getLanguageInstruction(request.language)

  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 800,
    messages: [
      {
        role: 'user',
        content: `You are Shekhar Sir, beloved NEET Biology teacher. Generate a response for this student:

Student Analysis: ${JSON.stringify(analysis)}
Original Question: "${request.transcript}"
Language: ${request.language}

${languageInstruction}

Generate a comprehensive educational response with:
1. Clear, encouraging explanation (2-3 sentences)
2. Simple example or analogy
3. NEET exam relevance and expected marks
4. Memory trick or mnemonic if applicable
5. 3 follow-up questions to test understanding

Response Format:
{
  "text": "complete response text for voice synthesis",
  "explanation": "main explanation",
  "example": "simple example/analogy",
  "neetRelevance": "exam importance and marks",
  "memoryTrick": "mnemonic or memory aid",
  "followUpQuestions": ["question1", "question2", "question3"]
}

Make it sound like a caring teacher who wants every student to succeed!`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type === 'text') {
    try {
      return JSON.parse(content.text)
    } catch {
      return parseEducationalResponseFromText(content.text)
    }
  }

  return generateFallbackEducationalResponse(request)
}

function getLanguageInstruction(language: string): string {
  switch (language) {
    case 'hindi':
      return `Respond in clear Hindi. Use simple scientific terms with Hindi explanations.
      Example: "Photosynthesis को प्रकाश संश्लेषण कहते हैं..."`

    case 'hinglish':
      return `Respond in natural Hinglish (Hindi-English mix). Use English scientific terms with Hindi explanations.
      Example: "Photosynthesis का मतलब है plants में food बनाना..."`

    case 'english':
    default:
      return `Respond in clear, simple English suitable for Indian NEET students.`
  }
}

async function generateVoiceAudio(response: any, language: string): Promise<string> {
  try {
    // Call voice synthesis API
    const voiceResponse = await fetch('/api/claudechat/voice-explanation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        concept: 'Student Question Response',
        description: response.text,
        neetRelevance: response.neetRelevance,
        voice: 'shekhar-sir',
        language,
        emotion: 'explaining',
      }),
    })

    const audioData = await voiceResponse.json()
    return audioData.audioUrl
  } catch (error) {
    console.error('Voice generation failed:', error)
    return generateFallbackAudio(response.text, language)
  }
}

function generateFallbackAudio(text: string, language: string): string {
  // Generate fallback audio URL for TTS
  const encodedText = encodeURIComponent(text)
  return `/api/tts/speak?text=${encodedText}&lang=${language}&voice=shekhar-sir`
}

function parseAnalysisFromText(text: string, request: VoiceRequest) {
  return {
    intent: extractIntent(request.transcript),
    biologyTopic: extractBiologyTopic(request.transcript),
    difficulty: 'intermediate',
    confidence: 0.8,
    emotionalState: 'curious',
    keyWords: extractKeyWords(request.transcript),
    misconceptions: [],
  }
}

function generateFallbackAnalysis(request: VoiceRequest) {
  return {
    intent: 'explanation',
    biologyTopic: 'General Biology',
    difficulty: 'intermediate',
    confidence: 0.7,
    emotionalState: 'curious',
    keyWords: request.transcript.split(' ').filter((word) => word.length > 3),
    misconceptions: [],
  }
}

function parseEducationalResponseFromText(text: string) {
  return {
    text: text,
    explanation: text.substring(0, 200),
    example: 'Let me give you a simple example to understand this concept.',
    neetRelevance: 'This is an important topic for NEET Biology preparation.',
    memoryTrick: 'Remember this concept with regular practice.',
    followUpQuestions: [
      'Can you explain this concept in your own words?',
      'What questions do you have about this topic?',
      'Would you like to practice some related questions?',
    ],
  }
}

function generateFallbackEducationalResponse(request: VoiceRequest) {
  return {
    text: `Thank you for your question about "${request.transcript}". This is an important concept in Biology. Let me explain it clearly for your NEET preparation.`,
    explanation: 'This is a fundamental concept in Biology.',
    example: 'Let me provide a simple example to illustrate this.',
    neetRelevance: 'This topic is frequently asked in NEET examinations.',
    memoryTrick: 'Practice regularly to master this concept.',
    followUpQuestions: [
      'Would you like me to explain any specific part?',
      'Do you have any related questions?',
      'Shall we practice some questions on this topic?',
    ],
  }
}

// Helper functions for analysis
function extractIntent(transcript: string): string {
  const questionWords = ['what', 'how', 'why', 'when', 'where', 'explain', 'define']
  const lowerTranscript = transcript.toLowerCase()

  if (questionWords.some((word) => lowerTranscript.includes(word))) {
    return 'explanation'
  }

  if (lowerTranscript.includes('difference') || lowerTranscript.includes('compare')) {
    return 'comparison'
  }

  if (lowerTranscript.includes('example')) {
    return 'example_request'
  }

  return 'general_question'
}

function extractBiologyTopic(transcript: string): string {
  const biologyTopics = {
    photosynthesis: ['photosynthesis', 'light reaction', 'dark reaction', 'chlorophyll'],
    respiration: ['respiration', 'breathing', 'cellular respiration', 'glycolysis'],
    genetics: ['genetics', 'dna', 'rna', 'gene', 'chromosome', 'heredity'],
    evolution: ['evolution', 'natural selection', 'adaptation', 'species'],
    ecology: ['ecosystem', 'environment', 'food chain', 'producer', 'consumer'],
    anatomy: ['heart', 'brain', 'kidney', 'liver', 'organ', 'system'],
    cell_biology: ['cell', 'nucleus', 'mitochondria', 'ribosome', 'organelle'],
    plant_biology: ['plant', 'flower', 'root', 'stem', 'leaf', 'fruit'],
  }

  const lowerTranscript = transcript.toLowerCase()

  for (const [topic, keywords] of Object.entries(biologyTopics)) {
    if (keywords.some((keyword) => lowerTranscript.includes(keyword))) {
      return topic.replace('_', ' ')
    }
  }

  return 'General Biology'
}

function extractKeyWords(transcript: string): string[] {
  const words = transcript.toLowerCase().split(' ')
  const biologicalTerms = [
    'cell',
    'nucleus',
    'dna',
    'rna',
    'protein',
    'enzyme',
    'chromosome',
    'photosynthesis',
    'respiration',
    'metabolism',
    'genetics',
    'evolution',
    'ecosystem',
    'biodiversity',
    'anatomy',
    'physiology',
    'organ',
    'tissue',
    'bacteria',
    'virus',
    'plant',
    'animal',
    'human',
    'blood',
    'heart',
    'brain',
    'muscle',
    'bone',
    'reproduction',
    'development',
  ]

  return words.filter((word) => biologicalTerms.includes(word) || word.length > 5).slice(0, 5)
}
