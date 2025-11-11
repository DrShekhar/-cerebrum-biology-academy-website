/**
 * AI Message Generation Service
 * Uses Anthropic Claude API to generate contextual WhatsApp messages for counselors
 * Week 1 Quick Win: Smart Message Drafts
 */

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface LeadContext {
  studentName: string
  parentName?: string
  phone: string
  email?: string
  stage: string
  priority: 'HOT' | 'WARM' | 'COLD'
  source?: string
  lastContactedAt?: Date
  communicationHistory?: {
    type: string
    message: string
    sentAt: Date
  }[]
  notes?: string
  interests?: string
  demoScheduled?: boolean
  offerSent?: boolean
}

export interface MessageGenerationOptions {
  intent:
    | 'follow_up'
    | 'demo_reminder'
    | 'offer_follow_up'
    | 'payment_reminder'
    | 'general'
    | 'custom'
  tone?: 'professional' | 'friendly' | 'persuasive'
  maxLength?: number
  includeCallToAction?: boolean
  customInstructions?: string
}

export interface GeneratedMessage {
  message: string
  rationale?: string
  suggestedTiming?: string
}

/**
 * Generate AI-powered WhatsApp message based on lead context
 */
export async function generateWhatsAppMessage(
  leadContext: LeadContext,
  options: MessageGenerationOptions
): Promise<GeneratedMessage> {
  try {
    const prompt = buildPrompt(leadContext, options)

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: options.maxLength || 300,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const messageContent = response.content[0]
    if (messageContent.type !== 'text') {
      throw new Error('Unexpected response format from Claude')
    }

    const generatedText = messageContent.text.trim()

    return parseGeneratedMessage(generatedText)
  } catch (error) {
    console.error('Error generating AI message:', error)
    throw new Error(
      error instanceof Error
        ? `AI message generation failed: ${error.message}`
        : 'AI message generation failed'
    )
  }
}

/**
 * Build comprehensive prompt for Claude based on lead context
 */
function buildPrompt(leadContext: LeadContext, options: MessageGenerationOptions): string {
  const {
    studentName,
    parentName,
    stage,
    priority,
    source,
    lastContactedAt,
    communicationHistory,
    notes,
    interests,
    demoScheduled,
    offerSent,
  } = leadContext

  const { intent, tone = 'friendly', includeCallToAction = true, customInstructions } = options

  const toneInstructions = {
    professional: 'Use a professional, respectful tone appropriate for educational counseling.',
    friendly: 'Use a warm, friendly tone that builds rapport while remaining professional.',
    persuasive: 'Use a persuasive, encouraging tone that highlights benefits and creates urgency.',
  }

  const intentInstructions = {
    follow_up: `This is a follow-up message after initial contact. Focus on building rapport and offering value.`,
    demo_reminder: 'This is a reminder about an upcoming demo class. Be enthusiastic and helpful.',
    offer_follow_up:
      'Following up on a course offer. Address potential concerns and emphasize value.',
    payment_reminder: 'Gentle payment reminder. Be understanding but clear about deadlines.',
    general: 'General check-in message. Be helpful and offer assistance.',
    custom: customInstructions || 'Create an appropriate message based on the context.',
  }

  let contextInfo = `
You are a professional educational counselor for Cerebrum Biology Academy, which specializes in NEET Biology coaching with a 95%+ success rate.

**Lead Information:**
- Student Name: ${studentName}
${parentName ? `- Parent Name: ${parentName}` : ''}
- Current Stage: ${stage}
- Priority: ${priority}
${source ? `- Lead Source: ${source}` : ''}
${lastContactedAt ? `- Last Contacted: ${formatRelativeTime(lastContactedAt)}` : ''}

**Context:**
${notes ? `- Notes: ${notes}` : ''}
${interests ? `- Interests: ${interests}` : ''}
- Demo Scheduled: ${demoScheduled ? 'Yes' : 'No'}
- Offer Sent: ${offerSent ? 'Yes' : 'No'}
`

  if (communicationHistory && communicationHistory.length > 0) {
    contextInfo += `\n**Recent Communication History:**\n`
    communicationHistory.slice(-3).forEach((comm) => {
      contextInfo += `- ${comm.type}: "${comm.message.substring(0, 100)}..." (${formatRelativeTime(comm.sentAt)})\n`
    })
  }

  const prompt = `${contextInfo}

**Your Task:**
Generate a WhatsApp message for ${studentName} with the following requirements:

1. **Intent:** ${intentInstructions[intent]}
2. **Tone:** ${toneInstructions[tone]}
3. **Length:** Keep it concise (2-4 sentences, max ${options.maxLength || 300} characters)
4. **Format:**
   - Use natural, conversational language appropriate for WhatsApp
   - Include emojis sparingly (1-2 max) if appropriate for the tone
   - Address the student${parentName ? ' or parent' : ''} by name
   - Reference specific context from their journey (demo, offer, etc.) if relevant
5. **Call to Action:** ${includeCallToAction ? 'Include a clear, specific call to action' : 'No call to action needed'}
6. **Academy Details:** Cerebrum Biology Academy | NEET Biology Coaching | 95%+ Success Rate

**Important Guidelines:**
- Be genuinely helpful, not pushy or salesy
- Show understanding of their situation and timeline
- Personalize based on the provided context
- Use Indian English conventions and phrasing
- Keep it WhatsApp-appropriate (friendly but professional)
- DO NOT include placeholder text like [Student Name] - use actual names
- DO NOT include URLs unless specifically relevant

Generate ONLY the WhatsApp message text. Do not include any explanations, labels, or meta-commentary.
The message should be ready to copy-paste and send directly.`

  return prompt
}

/**
 * Parse the generated message from Claude
 */
function parseGeneratedMessage(text: string): GeneratedMessage {
  const cleanedMessage = text.replace(/^"|"$/g, '').trim()

  return {
    message: cleanedMessage,
  }
}

/**
 * Format relative time for context
 */
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-IN')
}

/**
 * Validate API key is configured
 */
export function isAIConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY
}

/**
 * Get suggested intent based on lead context
 */
export function suggestIntent(leadContext: LeadContext): MessageGenerationOptions['intent'] {
  const { stage, demoScheduled, offerSent } = leadContext

  if (stage === 'DEMO_SCHEDULED' && demoScheduled) {
    return 'demo_reminder'
  }

  if (stage === 'OFFER_SENT' && offerSent) {
    return 'offer_follow_up'
  }

  if (stage === 'PAYMENT_PENDING') {
    return 'payment_reminder'
  }

  if (stage === 'NEW_LEAD' || stage === 'CONTACTED') {
    return 'follow_up'
  }

  return 'general'
}
