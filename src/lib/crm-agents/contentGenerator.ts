/**
 * Content Generator Agent
 *
 * AI-powered agent that generates marketing content, message templates,
 * and personalized communications for the CRM.
 */

import { BaseAgent, AgentContext, AgentResponse } from './base'
import { AgentType } from '@/generated/prisma'

const SYSTEM_PROMPT = `You are an AI Content Generator for Cerebrum Biology Academy, India's premier NEET biology coaching institute run by Dr. Shekhar C Singh.

You create compelling, engaging content for various purposes:
1. WhatsApp message templates
2. Email campaigns
3. SMS notifications
4. Marketing messages
5. Demo reminders
6. Payment reminders
7. Success story highlights
8. Course announcements

BRAND VOICE:
- Professional yet warm
- Educational and informative
- Encouraging but not pushy
- Culturally appropriate for Indian students and parents
- Focused on NEET success and career in medicine

KEY DIFFERENTIATORS TO HIGHLIGHT:
- Expert faculty led by Dr. Shekhar C Singh
- Comprehensive NCERT-based biology curriculum
- Proven track record of NEET success
- Personalized attention and doubt clearing
- Flexible learning options (online/offline)

CONTENT GUIDELINES:
- WhatsApp: Concise, use emojis sparingly, include clear CTA
- Email: Professional structure, can be detailed, include links
- SMS: Under 160 characters, urgent/action-oriented
- Always include personalization placeholders: {{name}}, {{course}}, etc.

Respond in JSON format:
{
  "content": {
    "whatsapp": "<WhatsApp version>",
    "email": {
      "subject": "<email subject>",
      "body": "<email body>"
    },
    "sms": "<SMS version under 160 chars>"
  },
  "contentType": "<type of content>",
  "targetAudience": "<who this is for>",
  "placeholders": ["<placeholder1>", "<placeholder2>"],
  "callToAction": "<primary CTA>",
  "bestTimeToSend": "<recommended timing>",
  "abTestSuggestions": [
    {
      "element": "<what to test>",
      "variant": "<alternative version>"
    }
  ]
}`

interface ContentResult {
  content: {
    whatsapp: string
    email: {
      subject: string
      body: string
    }
    sms: string
  }
  contentType: string
  targetAudience: string
  placeholders: string[]
  callToAction: string
  bestTimeToSend: string
  abTestSuggestions: Array<{
    element: string
    variant: string
  }>
}

export type ContentType =
  | 'WELCOME'
  | 'DEMO_REMINDER'
  | 'DEMO_FOLLOWUP'
  | 'OFFER_ANNOUNCEMENT'
  | 'PAYMENT_REMINDER'
  | 'COURSE_UPDATE'
  | 'SUCCESS_STORY'
  | 'EXAM_TIPS'
  | 'ENROLLMENT_CONFIRMATION'
  | 'RE_ENGAGEMENT'
  | 'CUSTOM'

export class ContentGeneratorAgent extends BaseAgent {
  constructor() {
    super(AgentType.CONTENT_GENERATOR, SYSTEM_PROMPT)
    this.maxTokens = 2500
  }

  async execute(context: AgentContext): Promise<AgentResponse> {
    const contentType = context.metadata?.contentType as ContentType | undefined
    const customPrompt = context.metadata?.customPrompt as string | undefined

    if (!contentType && !customPrompt) {
      return {
        success: false,
        message: 'Content type or custom prompt is required',
        error: 'MISSING_CONTENT_TYPE',
      }
    }

    try {
      this.log('info', `Generating content: type=${contentType || 'CUSTOM'}`)

      // Build the content generation prompt
      const userMessage = this.buildContentPrompt(contentType, customPrompt, context.metadata)

      // Get AI response
      const response = await this.chat([{ role: 'user', content: userMessage }])

      // Parse the response
      const result = this.parseJSON<ContentResult>(response)
      if (!result) {
        return {
          success: false,
          message: 'Failed to parse content result',
          error: 'PARSE_ERROR',
        }
      }

      this.log('info', `Content generated: type=${result.contentType}`)

      return {
        success: true,
        message: 'Content generated successfully',
        data: {
          whatsapp: result.content.whatsapp,
          email: result.content.email,
          sms: result.content.sms,
          contentType: result.contentType,
          targetAudience: result.targetAudience,
          placeholders: result.placeholders,
          callToAction: result.callToAction,
          bestTimeToSend: result.bestTimeToSend,
          abTestSuggestions: result.abTestSuggestions,
        },
        nextSteps: [
          'Review and customize the generated content',
          'Replace placeholders with actual values',
          `Best time to send: ${result.bestTimeToSend}`,
          'Consider A/B testing the suggestions',
        ],
      }
    } catch (error) {
      this.log('error', 'Content generation failed', error)
      return {
        success: false,
        message: 'Content generation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private buildContentPrompt(
    contentType?: ContentType,
    customPrompt?: string,
    metadata?: Record<string, unknown>
  ): string {
    const contentTypePrompts: Record<ContentType, string> = {
      WELCOME: `Generate a warm welcome message for a new lead who just signed up.
        Include introduction to Cerebrum Biology Academy, what to expect, and next steps.`,

      DEMO_REMINDER: `Generate a demo class reminder message.
        Include date/time placeholder, preparation tips, and Zoom link placeholder.
        Create urgency but be polite.`,

      DEMO_FOLLOWUP: `Generate a follow-up message after a demo class.
        Thank them for attending, ask for feedback, and include enrollment CTA.`,

      OFFER_ANNOUNCEMENT: `Generate an exciting offer announcement message.
        Include discount percentage placeholder, validity period, and limited seats urgency.`,

      PAYMENT_REMINDER: `Generate a gentle payment reminder message.
        Include amount due placeholder, due date, payment link, and support contact.`,

      COURSE_UPDATE: `Generate a course update announcement.
        Include new feature/update details and how it benefits students.`,

      SUCCESS_STORY: `Generate a success story highlight message.
        Include student name placeholder, achievement, and motivational CTA.`,

      EXAM_TIPS: `Generate a helpful exam preparation tips message.
        Include practical biology/NEET tips and link to free resources.`,

      ENROLLMENT_CONFIRMATION: `Generate an enrollment confirmation message.
        Include course name, start date, access instructions, and welcome to the family.`,

      RE_ENGAGEMENT: `Generate a re-engagement message for inactive leads.
        Be warm, not pushy. Include what's new and a compelling reason to reconnect.`,

      CUSTOM: customPrompt || 'Generate a general marketing message for NEET biology coaching.',
    }

    const prompt = contentType ? contentTypePrompts[contentType] : contentTypePrompts.CUSTOM

    let additionalContext = ''
    if (metadata?.courseName) {
      additionalContext += `\nCourse: ${metadata.courseName}`
    }
    if (metadata?.offerDetails) {
      additionalContext += `\nOffer Details: ${JSON.stringify(metadata.offerDetails)}`
    }
    if (metadata?.targetStage) {
      additionalContext += `\nTarget Lead Stage: ${metadata.targetStage}`
    }

    return `${prompt}${additionalContext}

Generate content in all three formats (WhatsApp, Email, SMS) with appropriate length and tone for each channel.
Include relevant placeholders like {{name}}, {{course}}, {{date}}, {{amount}}, etc.
Make sure the content is culturally appropriate for Indian students and parents preparing for NEET.`
  }

  /**
   * Generate welcome message content
   */
  async generateWelcome(): Promise<AgentResponse> {
    return this.execute({
      metadata: { contentType: 'WELCOME' as ContentType },
    })
  }

  /**
   * Generate demo reminder content
   */
  async generateDemoReminder(demoDate: string, demoTime: string): Promise<AgentResponse> {
    return this.execute({
      metadata: {
        contentType: 'DEMO_REMINDER' as ContentType,
        demoDate,
        demoTime,
      },
    })
  }

  /**
   * Generate offer announcement
   */
  async generateOfferAnnouncement(
    discountPercentage: number,
    validUntil: string,
    courseName: string
  ): Promise<AgentResponse> {
    return this.execute({
      metadata: {
        contentType: 'OFFER_ANNOUNCEMENT' as ContentType,
        offerDetails: { discountPercentage, validUntil, courseName },
      },
    })
  }

  /**
   * Generate custom content
   */
  async generateCustom(prompt: string): Promise<AgentResponse> {
    return this.execute({
      metadata: {
        contentType: 'CUSTOM' as ContentType,
        customPrompt: prompt,
      },
    })
  }
}
