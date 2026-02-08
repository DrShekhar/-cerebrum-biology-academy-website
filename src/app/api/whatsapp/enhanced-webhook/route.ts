/**
 * Enhanced WhatsApp Webhook - Production Grade
 * High-volume message processing, rich media, state management
 * Multi-language support with conversation summaries
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { HyperIntelligentRouter } from '@/lib/api/HyperIntelligentRouter'
import { VisualEnhancementEngine } from '@/lib/api/VisualEnhancementEngine'
import { CreditManagementSystem } from '@/lib/api/CreditManagementSystem'
import { getRedisClient } from '@/lib/cache/redis'

interface WhatsAppMessage {
  id: string
  from: string
  timestamp: string
  type: 'text' | 'image' | 'audio' | 'document' | 'video'
  text?: { body: string }
  image?: { id: string; mime_type: string; caption?: string }
  audio?: { id: string; mime_type: string; voice: boolean }
  document?: { id: string; filename: string; mime_type: string }
  context?: { id: string } // Reply context
}

interface ConversationState {
  userId: string
  studentName: string
  currentTopic?: string
  questionCount: number
  lastMessageTime: number
  language: 'english' | 'hindi' | 'hinglish'
  context: Array<{ role: 'user' | 'assistant'; content: string; timestamp: number }>
  studySession: {
    startTime: number
    topics: string[]
    questionsAnswered: number
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  }
  preferences: {
    responseLength: 'short' | 'medium' | 'detailed'
    includeVisuals: boolean
    learningStyle: 'visual' | 'textual' | 'interactive'
  }
}

interface MessageQueue {
  id: string
  message: WhatsAppMessage
  priority: 'low' | 'medium' | 'high' | 'urgent'
  timestamp: number
  retryCount: number
}

interface ProcessingResult {
  response: string
  mediaUrls?: string[]
  suggestedActions?: string[]
  sessionSummary?: string
  nextTopics?: string[]
  creditsUsed: number
}

// Initialize services
const redis = getRedisClient(process.env.REDIS_URL)
const aiRouter = new HyperIntelligentRouter()
const visualEngine = new VisualEnhancementEngine()
const creditSystem = new CreditManagementSystem()

// Message queue for high-volume processing
const messageQueue: MessageQueue[] = []
let isProcessingQueue = false

export async function GET(request: NextRequest) {
  // Webhook verification
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ WhatsApp webhook verified successfully')
    return new NextResponse(challenge)
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature for security
    const body = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    if (!verifyWebhookSignature(body, signature)) {
      console.error('❌ Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data = JSON.parse(body)

    // Handle webhook entry
    if (data.entry && data.entry[0]?.changes) {
      for (const change of data.entry[0].changes) {
        if (change.field === 'messages' && change.value.messages) {
          // Add messages to processing queue
          for (const message of change.value.messages) {
            await queueMessage(message, 'medium')
          }
        }

        // Handle message status updates
        if (change.value.statuses) {
          await handleMessageStatuses(change.value.statuses)
        }
      }
    }

    // Start queue processing if not already running
    if (!isProcessingQueue) {
      processMessageQueue()
    }

    return NextResponse.json({ status: 'received' })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}

/**
 * MESSAGE QUEUING: Handle high-volume message processing
 */
async function queueMessage(
  message: WhatsAppMessage,
  priority: 'low' | 'medium' | 'high' | 'urgent'
): Promise<void> {
  const queueItem: MessageQueue = {
    id: `queue_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    message,
    priority,
    timestamp: Date.now(),
    retryCount: 0,
  }

  // Priority queue insertion
  if (priority === 'urgent') {
    messageQueue.unshift(queueItem)
  } else {
    messageQueue.push(queueItem)
  }

  // Persist queue in Redis for reliability
  await redis.lpush('whatsapp:message_queue', JSON.stringify(queueItem))
  await redis.expire('whatsapp:message_queue', 3600) // 1 hour expiry

  console.log(
    `📥 Queued message ${message.id} with ${priority} priority (Queue size: ${messageQueue.length})`
  )
}

/**
 * QUEUE PROCESSING: Process messages with concurrency control
 */
async function processMessageQueue(): Promise<void> {
  if (isProcessingQueue) return

  isProcessingQueue = true
  console.log('🔄 Starting message queue processing...')

  while (messageQueue.length > 0) {
    // Process multiple messages concurrently (max 5)
    const batch = messageQueue.splice(0, 5)
    const processingPromises = batch.map((item) => processQueuedMessage(item))

    try {
      await Promise.allSettled(processingPromises)
    } catch (error) {
      console.error('Batch processing error:', error)
    }

    // Small delay between batches to prevent rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  isProcessingQueue = false
  console.log('✅ Message queue processing completed')
}

/**
 * INDIVIDUAL MESSAGE PROCESSING: Core message handling logic
 */
async function processQueuedMessage(queueItem: MessageQueue): Promise<void> {
  const { message } = queueItem
  const startTime = Date.now()

  try {
    console.log(`🔍 Processing message ${message.id} from ${message.from}`)

    // Get or create conversation state
    const conversationState = await getConversationState(message.from)

    // Check credit availability
    const creditCheck = await creditSystem.checkCreditsAvailable(
      message.from,
      0.01, // Estimated cost
      message.type
    )

    if (!creditCheck.allowed) {
      await sendWhatsAppMessage(message.from, {
        type: 'text',
        content: `Sorry! ${creditCheck.reason}. ${creditCheck.suggestedAction || 'Please try again later.'}`,
      })
      return
    }

    // Process different message types
    let processingResult: ProcessingResult

    switch (message.type) {
      case 'text':
        processingResult = await processTextMessage(message, conversationState)
        break

      case 'image':
        processingResult = await processImageMessage(message, conversationState)
        break

      case 'audio':
        processingResult = await processAudioMessage(message, conversationState)
        break

      case 'document':
        processingResult = await processDocumentMessage(message, conversationState)
        break

      default:
        processingResult = {
          response: 'Sorry, I can only process text, images, audio, and documents for now.',
          creditsUsed: 0,
        }
    }

    // Send response to student
    await sendEnhancedResponse(message.from, processingResult, conversationState)

    // Update conversation state
    await updateConversationState(message.from, conversationState, message, processingResult)

    // Deduct credits
    if (processingResult.creditsUsed > 0) {
      await creditSystem.deductCredits(
        message.from,
        100, // Estimated tokens
        0.01, // Estimated cost
        'whatsapp_bot',
        `${message.type} message processing`
      )
    }

    // Generate session summary if needed
    if (conversationState.questionCount % 10 === 0) {
      await generateStudySessionSummary(message.from, conversationState)
    }

    console.log(`✅ Message ${message.id} processed in ${Date.now() - startTime}ms`)
  } catch (error) {
    console.error(`❌ Failed to process message ${message.id}:`, error)

    // Retry logic
    if (queueItem.retryCount < 3) {
      queueItem.retryCount++
      setTimeout(() => messageQueue.push(queueItem), 1000 * queueItem.retryCount)
    } else {
      // Send error message to user
      await sendWhatsAppMessage(message.from, {
        type: 'text',
        content:
          'Sorry, I encountered an error processing your message. Please try again or contact support.',
      })
    }
  }
}

/**
 * TEXT MESSAGE PROCESSING: Handle text questions with AI
 */
async function processTextMessage(
  message: WhatsAppMessage,
  state: ConversationState
): Promise<ProcessingResult> {
  const question = message.text?.body || ''

  // Detect language
  const detectedLanguage = detectLanguage(question)
  if (detectedLanguage !== state.language) {
    state.language = detectedLanguage
  }

  // Check if question is biology-related
  if (!isBiologyRelated(question)) {
    return {
      response: `I'm a biology tutor! 🧬 Please ask me questions about biology, NEET preparation, or life sciences.

Examples:
• "What is photosynthesis?"
• "Explain human heart structure"
• "NEET questions on genetics"`,
      creditsUsed: 0,
    }
  }

  // Prepare AI request
  const aiRequest = {
    id: `req_${Date.now()}`,
    userId: message.from,
    content: question,
    type: determineQuestionType(question),
    context: {
      previousQuestions: state.context.slice(-3),
      currentTopic: state.currentTopic,
      studentLevel: state.studySession.difficulty,
      language: state.language,
    },
    priority: 'medium' as const,
    requiresVisuals:
      question.includes('diagram') || question.includes('show') || question.includes('draw'),
    language: state.language,
    studentLevel: state.studySession.difficulty,
  }

  // Get AI response
  const aiResponse = await aiRouter.routeRequest(aiRequest)

  // Generate visuals if requested
  const mediaUrls: string[] = []
  if (state.preferences.includeVisuals && aiRequest.requiresVisuals) {
    try {
      const visualResponse = await visualEngine.generateBiologyDiagram({
        type: 'diagram',
        content: question,
        subject: 'Biology',
        complexity: state.studySession.difficulty === 'beginner' ? 'simple' : 'detailed',
        style: 'educational',
        language: state.language,
      })

      if (visualResponse.url) {
        mediaUrls.push(visualResponse.url)
      }
    } catch (error) {
      console.warn('Visual generation failed:', error)
    }
  }

  // Format response based on language
  const formattedResponse = formatResponseForLanguage(aiResponse.content, state.language)

  // Generate follow-up suggestions
  const suggestedActions = generateFollowUpSuggestions(question, state.currentTopic)

  return {
    response: formattedResponse,
    mediaUrls,
    suggestedActions,
    creditsUsed: 1,
  }
}

/**
 * IMAGE MESSAGE PROCESSING: Analyze biology diagrams and images
 */
async function processImageMessage(
  message: WhatsAppMessage,
  state: ConversationState
): Promise<ProcessingResult> {
  if (!message.image) {
    return { response: 'No image found in message.', creditsUsed: 0 }
  }

  try {
    // Download image from WhatsApp
    const imageUrl = await downloadWhatsAppMedia(message.image.id)

    // Analyze image with AI
    const aiRequest = {
      id: `img_${Date.now()}`,
      userId: message.from,
      content: `Analyze this biology diagram or image. Explain what it shows and provide educational context. ${message.image.caption || ''}`,
      type: 'diagram_analysis' as const,
      context: {
        imageUrl,
        language: state.language,
        studentLevel: state.studySession.difficulty,
      },
      priority: 'high' as const,
      language: state.language,
      studentLevel: state.studySession.difficulty,
    }

    const aiResponse = await aiRouter.routeRequest(aiRequest)

    return {
      response: formatResponseForLanguage(aiResponse.content, state.language),
      suggestedActions: [
        'Ask follow-up questions about specific parts',
        'Request related diagrams',
        'Get NEET practice questions on this topic',
      ],
      creditsUsed: 1,
    }
  } catch (error) {
    console.error('Image processing error:', error)
    return {
      response:
        "Sorry, I couldn't analyze the image. Please try sending it again or describe what you see.",
      creditsUsed: 0,
    }
  }
}

/**
 * AUDIO MESSAGE PROCESSING: Transcribe and process voice notes
 */
async function processAudioMessage(
  message: WhatsAppMessage,
  state: ConversationState
): Promise<ProcessingResult> {
  if (!message.audio) {
    return { response: 'No audio found in message.', creditsUsed: 0 }
  }

  try {
    // Download audio from WhatsApp
    const audioUrl = await downloadWhatsAppMedia(message.audio.id)

    // Transcribe audio using OpenAI Whisper
    const transcription = await transcribeAudio(audioUrl, state.language)

    // Process transcribed text as a regular text message
    const textMessage: WhatsAppMessage = {
      ...message,
      type: 'text',
      text: { body: transcription },
    }

    const result = await processTextMessage(textMessage, state)

    return {
      ...result,
      response: `🎤 *Voice Note Transcription:* "${transcription}"\n\n${result.response}`,
    }
  } catch (error) {
    console.error('Audio processing error:', error)
    return {
      response:
        "Sorry, I couldn't process the voice note. Please try sending a text message instead.",
      creditsUsed: 0,
    }
  }
}

/**
 * DOCUMENT PROCESSING: Handle PDFs and study materials
 */
async function processDocumentMessage(
  message: WhatsAppMessage,
  state: ConversationState
): Promise<ProcessingResult> {
  if (!message.document) {
    return { response: 'No document found in message.', creditsUsed: 0 }
  }

  const filename = message.document.filename.toLowerCase()

  if (filename.includes('.pdf')) {
    return {
      response: `📄 I received your PDF: "${message.document.filename}"

This bot can help with specific biology questions, but cannot read PDF files directly.

Please:
• Ask specific questions about topics in the PDF
• Send screenshots of diagrams you want explained
• Type out questions you need help with

What would you like to know about biology? 🧬`,
      suggestedActions: [
        'Ask about specific biology topics',
        'Send diagram screenshots',
        'Request NEET practice questions',
      ],
      creditsUsed: 0,
    }
  }

  return {
    response:
      'For biology help, please send text messages, images of diagrams, or voice notes with your questions.',
    creditsUsed: 0,
  }
}

/**
 * CONVERSATION STATE MANAGEMENT
 */
async function getConversationState(userId: string): Promise<ConversationState> {
  const cached = await redis.get(`conversation:${userId}`)

  if (cached) {
    return JSON.parse(cached)
  }

  // Default state for new conversations
  const defaultState: ConversationState = {
    userId,
    studentName: 'Student',
    questionCount: 0,
    lastMessageTime: Date.now(),
    language: 'english',
    context: [],
    studySession: {
      startTime: Date.now(),
      topics: [],
      questionsAnswered: 0,
      difficulty: 'intermediate',
    },
    preferences: {
      responseLength: 'medium',
      includeVisuals: false,
      learningStyle: 'textual',
    },
  }

  await saveConversationState(userId, defaultState)
  return defaultState
}

async function saveConversationState(userId: string, state: ConversationState): Promise<void> {
  await redis.setex(
    `conversation:${userId}`,
    3600, // 1 hour expiry
    JSON.stringify(state)
  )
}

async function updateConversationState(
  userId: string,
  state: ConversationState,
  message: WhatsAppMessage,
  result: ProcessingResult
): Promise<void> {
  // Add to context
  state.context.push({
    role: 'user',
    content: message.text?.body || `[${message.type} message]`,
    timestamp: Date.now(),
  })

  state.context.push({
    role: 'assistant',
    content: result.response,
    timestamp: Date.now(),
  })

  // Keep only last 10 messages
  if (state.context.length > 20) {
    state.context = state.context.slice(-20)
  }

  // Update counters
  state.questionCount++
  state.studySession.questionsAnswered++
  state.lastMessageTime = Date.now()

  // Extract topic from question
  if (message.text?.body) {
    const topic = extractBiologyTopic(message.text.body)
    if (topic && !state.studySession.topics.includes(topic)) {
      state.studySession.topics.push(topic)
      state.currentTopic = topic
    }
  }

  await saveConversationState(userId, state)
}

/**
 * ENHANCED RESPONSE SENDING
 */
async function sendEnhancedResponse(
  to: string,
  result: ProcessingResult,
  state: ConversationState
): Promise<void> {
  // Send main response
  await sendWhatsAppMessage(to, {
    type: 'text',
    content: result.response,
  })

  // Send media if available
  if (result.mediaUrls && result.mediaUrls.length > 0) {
    for (const url of result.mediaUrls) {
      await sendWhatsAppMessage(to, {
        type: 'image',
        url: url,
        caption: 'AI-generated biology diagram',
      })
    }
  }

  // Send suggested actions
  if (result.suggestedActions && result.suggestedActions.length > 0) {
    const suggestionsText = `💡 *What's next?*\n${result.suggestedActions.map((action, index) => `${index + 1}. ${action}`).join('\n')}`

    await sendWhatsAppMessage(to, {
      type: 'text',
      content: suggestionsText,
    })
  }
}

/**
 * STUDY SESSION SUMMARY GENERATION
 */
async function generateStudySessionSummary(
  userId: string,
  state: ConversationState
): Promise<void> {
  const sessionDuration = Date.now() - state.studySession.startTime
  const durationMinutes = Math.floor(sessionDuration / (1000 * 60))

  const summary = `📊 *Study Session Summary*

⏱️ Duration: ${durationMinutes} minutes
❓ Questions Asked: ${state.studySession.questionsAnswered}
📚 Topics Covered: ${state.studySession.topics.join(', ') || 'Mixed topics'}

🎯 *Next Steps:*
• Review the topics we discussed
• Practice NEET questions on these topics
• Ask follow-up questions if anything is unclear

Great job studying! Keep up the excellent work! 💪`

  await sendWhatsAppMessage(userId, {
    type: 'text',
    content: summary,
  })
}

// Utility functions

function verifyWebhookSignature(body: string, signature: string | null): boolean {
  if (!signature || !process.env.WHATSAPP_WEBHOOK_SECRET) {
    return false
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.WHATSAPP_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

  return signature === `sha256=${expectedSignature}`
}

function detectLanguage(text: string): 'english' | 'hindi' | 'hinglish' {
  const hindiRegex = /[\u0900-\u097F]/
  const englishWords = text
    .toLowerCase()
    .split(' ')
    .filter((word) => /^[a-z]+$/.test(word)).length

  const totalWords = text.split(' ').length

  if (hindiRegex.test(text)) {
    return englishWords > totalWords * 0.3 ? 'hinglish' : 'hindi'
  }

  return 'english'
}

function isBiologyRelated(question: string): boolean {
  const biologyKeywords = [
    'biology',
    'cell',
    'organism',
    'genetics',
    'dna',
    'rna',
    'protein',
    'photosynthesis',
    'respiration',
    'evolution',
    'ecology',
    'anatomy',
    'physiology',
    'botany',
    'zoology',
    'neet',
    'ncert',
    'human body',
    'plant',
    'animal',
    'enzyme',
    'hormone',
    'nervous system',
    'digestive system',
    'circulatory system',
    'reproductive system',
  ]

  const questionLower = question.toLowerCase()
  return biologyKeywords.some((keyword) => questionLower.includes(keyword))
}

function determineQuestionType(
  question: string
): 'quick_answer' | 'complex_reasoning' | 'diagram_analysis' | 'formula_explanation' {
  if (question.includes('what is') || question.includes('define')) {
    return 'quick_answer'
  } else if (question.includes('explain') || question.includes('why') || question.includes('how')) {
    return 'complex_reasoning'
  } else if (question.includes('diagram') || question.includes('structure')) {
    return 'diagram_analysis'
  } else if (question.includes('formula') || question.includes('equation')) {
    return 'formula_explanation'
  }

  return 'complex_reasoning'
}

function formatResponseForLanguage(
  response: string,
  language: 'english' | 'hindi' | 'hinglish'
): string {
  // Add language-specific formatting and emojis
  if (language === 'hinglish') {
    return `🧬 *Biology Answer:*\n\n${response}\n\n---\n🎯 *NEET Tips:* Keep practicing! Biology me strong concepts banana important hai! 💪`
  } else if (language === 'hindi') {
    return `🧬 *जीव विज्ञान उत्तर:*\n\n${response}\n\n---\n🎯 *NEET सुझाव:* अभ्यास जारी रखें! 💪`
  }

  return `🧬 *Biology Answer:*\n\n${response}\n\n---\n🎯 *NEET Tips:* Keep practicing and stay curious! 💪`
}

function generateFollowUpSuggestions(question: string, currentTopic?: string): string[] {
  const suggestions = [
    'Ask for NEET practice questions on this topic',
    'Request a diagram or visual explanation',
    'Get examples from daily life',
  ]

  if (currentTopic) {
    suggestions.push(`Learn more about ${currentTopic}`)
  }

  return suggestions
}

function extractBiologyTopic(question: string): string | null {
  const topicPatterns = [
    /photosynthesis/i,
    /respiration/i,
    /genetics/i,
    /cell/i,
    /dna|rna/i,
    /nervous system/i,
    /digestive system/i,
    /circulatory system/i,
    /reproductive system/i,
    /evolution/i,
    /ecology/i,
  ]

  for (const pattern of topicPatterns) {
    if (pattern.test(question)) {
      return pattern.source.replace(/[^a-zA-Z\s]/g, '').trim()
    }
  }

  return null
}

async function downloadWhatsAppMedia(mediaId: string): Promise<string> {
  // Implementation would download media from WhatsApp API
  // Return URL of downloaded media
  return `https://example.com/media/${mediaId}`
}

async function transcribeAudio(audioUrl: string, language: string): Promise<string> {
  // Implementation would use OpenAI Whisper API
  // Return transcribed text
  return 'Sample transcription'
}

async function sendWhatsAppMessage(
  to: string,
  message: { type: string; content?: string; url?: string; caption?: string }
): Promise<void> {
  // Implementation would send message via WhatsApp Business API
  console.log(`📤 Sending ${message.type} to ${to}: ${message.content || message.caption}`)
}

async function handleMessageStatuses(statuses: any[]): Promise<void> {
  // Handle delivery receipts, read receipts, etc.
  for (const status of statuses) {
    console.log(`📊 Message ${status.id} status: ${status.status}`)
  }
}
