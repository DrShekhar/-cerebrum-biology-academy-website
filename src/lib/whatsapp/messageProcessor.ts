/**
 * WhatsApp Message Processor for Biology Education
 * Handles text, voice, and image questions from students
 * Integrates with Claude/GPT-4 for intelligent responses
 */

import { Anthropic } from '@anthropic-ai/sdk'
import { SONNET } from '@/lib/ai/models'
import OpenAI from 'openai'
import { WhatsAppService } from './whatsappService'
import { StudentTracker } from './studentTracker'
import { VoiceTranscriptionService } from './voiceTranscription'
import { ImageAnalysisService } from './imageAnalysis'
import { NCERTReferenceService } from './ncertReference'

let anthropic: Anthropic | null = null
let openai: OpenAI | null = null

function getClaude(): Anthropic {
  if (!anthropic && process.env.ANTHROPIC_API_KEY) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }
  if (!anthropic) {
    throw new Error('Anthropic API key not configured')
  }
  return anthropic
}

function getOpenAI(): OpenAI {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  if (!openai) {
    throw new Error('OpenAI API key not configured')
  }
  return openai
}

interface EducationalMessage {
  messageId: string
  from: string
  phoneNumberId: string
  studentName: string
  timestamp: string
  type: string
  content: any
  context?: any
}

interface MessageStatus {
  messageId: string
  status: string
  recipientId: string
  timestamp: string
}

interface BiologyResponse {
  explanation: string
  examples: string[]
  neetRelevance: string
  ncertReference: string
  followUpQuestions: string[]
  difficulty: 'basic' | 'intermediate' | 'advanced'
  topic: string
  subtopic: string
}

export class WhatsAppMessageProcessor {
  private whatsappService: WhatsAppService
  private studentTracker: StudentTracker
  private voiceTranscription: VoiceTranscriptionService
  private imageAnalysis: ImageAnalysisService
  private ncertReference: NCERTReferenceService

  constructor() {
    this.whatsappService = new WhatsAppService()
    this.studentTracker = new StudentTracker()
    this.voiceTranscription = new VoiceTranscriptionService()
    this.imageAnalysis = new ImageAnalysisService()
    this.ncertReference = new NCERTReferenceService()
  }

  async processEducationalMessage(message: EducationalMessage): Promise<void> {
    try {
      console.log(`🎓 Processing educational message from ${message.studentName}`)

      // Check rate limiting (50 questions per day)
      const canProcess = await this.studentTracker.checkRateLimit(message.from)
      if (!canProcess) {
        await this.sendRateLimitMessage(message.from, message.phoneNumberId)
        return
      }

      // Extract and process question based on type
      let questionText = ''
      let mediaAnalysis = null

      switch (message.content.type) {
        case 'text_question':
          questionText = message.content.text
          break

        case 'voice_question':
          questionText = await this.processVoiceMessage(message)
          break

        case 'diagram_question':
          const imageResult = await this.processImageMessage(message)
          questionText = imageResult.question
          mediaAnalysis = imageResult.analysis
          break

        case 'button_response':
          questionText = await this.processButtonResponse(message)
          break

        default:
          await this.sendUnsupportedMessage(message.from, message.phoneNumberId)
          return
      }

      if (!questionText) {
        await this.sendClarificationMessage(message.from, message.phoneNumberId)
        return
      }

      // Check if question is biology/NEET relevant
      const relevanceCheck = await this.checkBiologyRelevance(questionText)
      if (!relevanceCheck.isRelevant) {
        await this.sendOffTopicMessage(
          message.from,
          message.phoneNumberId,
          relevanceCheck.suggestion
        )
        return
      }

      // Get conversation context
      const conversationHistory = await this.studentTracker.getConversationHistory(message.from, 5)

      // Generate educational response
      const biologyResponse = await this.generateBiologyResponse(
        questionText,
        mediaAnalysis,
        conversationHistory,
        message.studentName
      )

      // Send response to student
      await this.sendEducationalResponse(
        message.from,
        message.phoneNumberId,
        biologyResponse,
        message.studentName
      )

      // Track interaction
      await this.studentTracker.logInteraction(message.from, {
        messageId: message.messageId,
        question: questionText,
        response: biologyResponse,
        timestamp: message.timestamp,
        type: message.content.type,
      })

      console.log(`✅ Successfully processed question from ${message.studentName}`)
    } catch (error) {
      console.error(`❌ Error processing message:`, error)
      await this.sendErrorResponse(
        message.from,
        message.phoneNumberId,
        'Sorry, I encountered an error. Please try asking your question again! 🤖'
      )
    }
  }

  private async processVoiceMessage(message: EducationalMessage): Promise<string> {
    try {
      // Download audio file from WhatsApp
      const audioUrl = await this.whatsappService.getMediaUrl(message.content.audioId)

      // Transcribe voice note
      const transcription = await this.voiceTranscription.transcribeAudio(audioUrl)

      console.log(`🎤 Voice transcription: "${transcription}"`)
      return transcription
    } catch (error) {
      console.error('Voice transcription failed:', error)
      throw new Error('Failed to process voice message')
    }
  }

  private async processImageMessage(
    message: EducationalMessage
  ): Promise<{ question: string; analysis: any }> {
    try {
      // Download image from WhatsApp
      const imageUrl = await this.whatsappService.getMediaUrl(message.content.imageId)

      // Analyze image for biology content
      const analysis = await this.imageAnalysis.analyzeBiologyDiagram(
        imageUrl,
        message.content.caption
      )

      const question =
        message.content.caption ||
        `Explain this biology diagram: ${analysis.identifiedStructures.join(', ')}`

      console.log(`📸 Image analysis: ${analysis.topic} - ${analysis.confidence}% confidence`)
      return { question, analysis }
    } catch (error) {
      console.error('Image analysis failed:', error)
      throw new Error('Failed to process image')
    }
  }

  private async processButtonResponse(message: EducationalMessage): Promise<string> {
    const buttonReply = message.content.buttonReply

    if (buttonReply) {
      switch (buttonReply.id) {
        case 'explain_more':
          return `Please explain in more detail: ${buttonReply.title}`
        case 'show_example':
          return `Can you give me an example of: ${buttonReply.title}`
        case 'related_questions':
          return `What are some related concepts to: ${buttonReply.title}`
        default:
          return buttonReply.title
      }
    }

    return 'Could you please clarify your question?'
  }

  private async checkBiologyRelevance(
    question: string
  ): Promise<{ isRelevant: boolean; suggestion?: string }> {
    try {
      const response = await getClaude().messages.create({
        model: SONNET,
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: `You are a biology teacher. Analyze if this question is related to biology, life sciences, or NEET preparation:

Question: "${question}"

Respond with JSON:
{
  "isRelevant": true/false,
  "confidence": 0.0-1.0,
  "topic": "biology topic if relevant",
  "suggestion": "helpful suggestion if not relevant"
}`,
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        const analysis = JSON.parse(content.text)
        return {
          isRelevant: analysis.isRelevant && analysis.confidence > 0.6,
          suggestion: analysis.suggestion,
        }
      }
    } catch (error) {
      console.error('Relevance check failed:', error)
    }

    // Default to relevant if check fails
    return { isRelevant: true }
  }

  private async generateBiologyResponse(
    question: string,
    mediaAnalysis: any,
    conversationHistory: any[],
    studentName: string
  ): Promise<BiologyResponse> {
    try {
      const contextPrompt = this.buildContextPrompt(
        question,
        mediaAnalysis,
        conversationHistory,
        studentName
      )

      const response = await getClaude().messages.create({
        model: SONNET,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: contextPrompt,
          },
        ],
      })

      const content = response.content[0]
      if (content.type === 'text') {
        const biologyResponse = JSON.parse(content.text)

        // Add NCERT reference
        const ncertRef = await this.ncertReference.findReference(
          biologyResponse.topic,
          biologyResponse.subtopic
        )
        biologyResponse.ncertReference = ncertRef

        return biologyResponse
      }
    } catch (error) {
      console.error('Response generation failed:', error)
    }

    // Fallback response
    return {
      explanation: `Thank you for your question about "${question}". This is an important biology concept that requires detailed explanation.`,
      examples: ['Let me provide a clear example to help you understand this concept.'],
      neetRelevance: 'This topic is frequently tested in NEET Biology section.',
      ncertReference: 'Please refer to your NCERT Biology textbook for additional details.',
      followUpQuestions: [
        'Would you like me to explain any specific part?',
        'Do you have questions about related concepts?',
        'Shall we practice some MCQs on this topic?',
      ],
      difficulty: 'intermediate',
      topic: 'General Biology',
      subtopic: 'Concept Explanation',
    }
  }

  private buildContextPrompt(
    question: string,
    mediaAnalysis: any,
    conversationHistory: any[],
    studentName: string
  ): string {
    const historyContext =
      conversationHistory.length > 0
        ? `Previous conversation:\n${conversationHistory.map((h) => `Q: ${h.question}\nA: ${h.response.explanation}`).join('\n\n')}`
        : 'No previous conversation'

    const mediaContext = mediaAnalysis
      ? `Image analysis: Detected ${mediaAnalysis.topic} diagram with structures: ${mediaAnalysis.identifiedStructures.join(', ')}`
      : 'No image provided'

    return `You are Shekhar Sir, an expert NEET Biology teacher at Cerebrum Biology Academy.
Student ${studentName} has asked: "${question}"

${mediaContext}
${historyContext}

Provide a comprehensive educational response in JSON format:
{
  "explanation": "Clear, concise explanation (max 250 words) with emojis for engagement",
  "examples": ["2-3 relevant examples or analogies"],
  "neetRelevance": "Specific NEET importance and expected marks",
  "followUpQuestions": ["3 questions to test understanding"],
  "difficulty": "basic/intermediate/advanced",
  "topic": "main biology topic",
  "subtopic": "specific subtopic"
}

Guidelines:
- Use simple, encouraging language suitable for NEET students
- Include relevant emojis for better engagement
- Focus on conceptual understanding
- Mention real-life applications where possible
- Keep explanation under 250 words
- End with motivation for NEET preparation`
  }

  private async sendEducationalResponse(
    phoneNumber: string,
    phoneNumberId: string,
    response: BiologyResponse,
    studentName: string
  ): Promise<void> {
    // Main educational response
    const mainMessage =
      `🧬 *${response.topic} - ${response.subtopic}*\n\n` +
      `${response.explanation}\n\n` +
      `💡 *Examples:*\n${response.examples.map((ex) => `• ${ex}`).join('\n')}\n\n` +
      `🎯 *NEET Relevance:* ${response.neetRelevance}\n\n` +
      `📚 *Reference:* ${response.ncertReference}\n\n` +
      `❓ *Test Your Understanding:*\n${response.followUpQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\n` +
      `Ready for your next question! 💪`

    await this.whatsappService.sendMessage({ phone: phoneNumber, message: mainMessage })

    // Send interactive buttons for follow-up
    await this.sendFollowUpButtons(phoneNumber, phoneNumberId, response.topic)
  }

  private async sendFollowUpButtons(
    phoneNumber: string,
    phoneNumberId: string,
    topic: string
  ): Promise<void> {
    const interactiveMessage = {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: {
          text: `Want to explore ${topic} further? 🤔`,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'explain_more',
                title: '📚 Explain More',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'show_example',
                title: '💡 More Examples',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'related_questions',
                title: '🔗 Related Topics',
              },
            },
          ],
        },
      },
    }

    await this.whatsappService.sendInteractiveMessage(phoneNumberId, interactiveMessage)
  }

  async sendErrorResponse(
    phoneNumber: string,
    phoneNumberId: string,
    message: string
  ): Promise<void> {
    await this.whatsappService.sendMessage({ phone: phoneNumber, message })
  }

  async sendTextMessage(
    phoneNumber: string,
    phoneNumberId: string,
    message: string
  ): Promise<void> {
    await this.whatsappService.sendMessage({ phone: phoneNumber, message })
  }

  private async sendRateLimitMessage(phoneNumber: string, phoneNumberId: string): Promise<void> {
    const message =
      `🚫 *Daily Question Limit Reached*\n\n` +
      `You've reached your daily limit of 50 questions. This helps us provide quality responses to all students! 📚\n\n` +
      `✨ Your limit resets at midnight\n` +
      `💎 Upgrade to premium for unlimited questions\n\n` +
      `Keep studying! 💪`

    await this.whatsappService.sendMessage({ phone: phoneNumber, message })
  }

  private async sendOffTopicMessage(
    phoneNumber: string,
    phoneNumberId: string,
    suggestion?: string
  ): Promise<void> {
    const message =
      `🤖 *Cerebrum Biology Study Buddy*\n\n` +
      `This bot specializes in Biology and NEET preparation. ${suggestion || 'Please ask biology-related questions!'}\n\n` +
      `📚 Topics covered:\n` +
      `• Cell Biology & Genetics\n` +
      `• Plant & Animal Physiology\n` +
      `• Ecology & Environment\n` +
      `• Human Biology\n` +
      `• NEET Previous Years\n\n` +
      `What would you like to learn today? 🧬`

    await this.whatsappService.sendMessage({ phone: phoneNumber, message })
  }

  private async sendUnsupportedMessage(phoneNumber: string, phoneNumberId: string): Promise<void> {
    const message =
      `🤖 *Message Type Not Supported*\n\n` +
      `I can help you with:\n` +
      `📝 Text questions\n` +
      `🎤 Voice notes\n` +
      `📸 Biology diagrams/images\n\n` +
      `Please send your biology question in one of these formats! 📚`

    await this.whatsappService.sendMessage({ phone: phoneNumber, message })
  }

  private async sendClarificationMessage(
    phoneNumber: string,
    phoneNumberId: string
  ): Promise<void> {
    const message =
      `🤔 *Could you clarify your question?*\n\n` +
      `I couldn't understand your question clearly. Please try:\n\n` +
      `📝 Typing your question clearly\n` +
      `🎤 Recording a clear voice note\n` +
      `📸 Sending an image with caption\n\n` +
      `Example: "What is photosynthesis?" 🌱`

    await this.whatsappService.sendMessage({ phone: phoneNumber, message })
  }

  async trackMessageStatus(status: MessageStatus): Promise<void> {
    try {
      await this.studentTracker.updateMessageStatus(status)
      console.log(`📊 Tracked message status: ${status.messageId} - ${status.status}`)
    } catch (error) {
      console.error('Failed to track message status:', error)
    }
  }
}
