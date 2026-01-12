#!/usr/bin/env npx ts-node
/**
 * Interakt MCP Server - WhatsApp Automation
 *
 * A standalone MCP server that exposes Interakt WhatsApp API as tools
 * for Claude Code, enabling automated messaging, campaigns, and contact management.
 *
 * Usage:
 *   npx ts-node src/lib/mcp/servers/interakt-server.ts
 *
 * Or via Claude Code MCP configuration.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js'

// Import existing Interakt functions
import {
  sendWhatsAppMessage,
  sendTemplateMessage,
  sendWhatsAppOTP,
  sendLoginOTP,
  sendWelcomeMessage,
  sendDemoConfirmation,
  sendDemoReminder,
  sendEnrollmentConfirmation,
  sendPaymentConfirmation,
  sendPaymentReminder,
  sendClassReminder,
  sendTestReminder,
  sendTestResult,
  sendSpecialOffer,
  sendFollowUpMessage,
  trackUser,
  trackEvent,
  checkAPIHealth,
  isInteraktConfigured,
  AUTH_TEMPLATES,
  MARKETING_TEMPLATES,
  UTILITY_TEMPLATES,
} from '../../interakt'

// ============================================
// MCP SERVER SETUP
// ============================================

const server = new Server(
  {
    name: 'interakt-whatsapp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// ============================================
// TOOL DEFINITIONS
// ============================================

const TOOLS: Tool[] = [
  {
    name: 'send_template',
    description:
      'Send a WhatsApp template message to a recipient. Templates include: welcome_message, demo_confirmation, demo_reminder, enrollment_confirmation, payment_confirmation, payment_reminder, class_reminder, test_reminder, test_result, special_offer, follow_up, otp_verification, login_otp',
    inputSchema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          description: 'Phone number with country code (e.g., +918826444334 or 8826444334)',
        },
        template: {
          type: 'string',
          description: 'Template name (e.g., welcome_message, demo_confirmation)',
          enum: [
            'welcome_message',
            'demo_confirmation',
            'demo_reminder',
            'enrollment_confirmation',
            'payment_confirmation',
            'payment_reminder',
            'class_reminder',
            'test_reminder',
            'test_result',
            'special_offer',
            'follow_up',
            'otp_verification',
            'login_otp',
          ],
        },
        body_values: {
          type: 'array',
          items: { type: 'string' },
          description: 'Values for template placeholders in order',
        },
        header_values: {
          type: 'array',
          items: { type: 'string' },
          description: 'Values for header placeholders (if template has header)',
        },
      },
      required: ['phone', 'template'],
    },
  },
  {
    name: 'send_bulk_campaign',
    description:
      'Send a template message to multiple recipients. Useful for campaigns, reminders, or bulk notifications.',
    inputSchema: {
      type: 'object',
      properties: {
        template: {
          type: 'string',
          description: 'Template name to send',
        },
        recipients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              phone: { type: 'string', description: 'Phone number' },
              body_values: {
                type: 'array',
                items: { type: 'string' },
                description: 'Template values for this recipient',
              },
            },
            required: ['phone'],
          },
          description: 'List of recipients with their personalized values',
        },
        campaign_name: {
          type: 'string',
          description: 'Optional campaign name for tracking',
        },
        delay_ms: {
          type: 'number',
          description: 'Delay between messages in milliseconds (default: 100, max: 1000)',
          default: 100,
        },
      },
      required: ['template', 'recipients'],
    },
  },
  {
    name: 'track_user',
    description:
      'Add or update a user/contact in Interakt CRM. Use this to store user information, tags, and custom attributes.',
    inputSchema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          description: 'Phone number with country code',
        },
        user_id: {
          type: 'string',
          description: 'Optional custom user ID for linking to your system',
        },
        traits: {
          type: 'object',
          description: 'User attributes like name, email, tags, course_interest, etc.',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            course_interest: { type: 'string' },
            source: { type: 'string' },
            city: { type: 'string' },
            class: { type: 'string' },
          },
        },
      },
      required: ['phone'],
    },
  },
  {
    name: 'track_event',
    description:
      'Track a user event for analytics and automation triggers. Events can trigger automated workflows in Interakt.',
    inputSchema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          description: 'Phone number of the user',
        },
        event: {
          type: 'string',
          description:
            'Event name (e.g., demo_booked, payment_completed, class_attended, test_submitted)',
        },
        properties: {
          type: 'object',
          description: 'Optional event properties/metadata',
        },
      },
      required: ['phone', 'event'],
    },
  },
  {
    name: 'get_templates',
    description: 'List all available WhatsApp message templates with their parameters',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'check_health',
    description: 'Check if Interakt API is configured and working properly',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
]

// ============================================
// TOOL HANDLERS
// ============================================

async function handleSendTemplate(args: Record<string, unknown>): Promise<string> {
  const phone = args.phone as string
  const template = args.template as string
  const bodyValues = (args.body_values as string[]) || []
  const headerValues = (args.header_values as string[]) || []

  // Use specialized functions for common templates
  switch (template) {
    case 'welcome_message':
      const welcomeResult = await sendWelcomeMessage(phone, bodyValues[0])
      return JSON.stringify(welcomeResult, null, 2)

    case 'demo_confirmation':
      if (bodyValues.length < 3) {
        return JSON.stringify({
          success: false,
          error: 'demo_confirmation requires: name, date, time',
        })
      }
      const demoResult = await sendDemoConfirmation({
        phone,
        name: bodyValues[0],
        date: bodyValues[1],
        time: bodyValues[2],
      })
      return JSON.stringify(demoResult, null, 2)

    case 'demo_reminder':
      if (bodyValues.length < 5) {
        return JSON.stringify({
          success: false,
          error: 'demo_reminder requires: name, timeRemaining, zoomLink, topic, facultyName',
        })
      }
      const reminderResult = await sendDemoReminder({
        phone,
        name: bodyValues[0],
        timeRemaining: bodyValues[1],
        zoomLink: bodyValues[2],
        topic: bodyValues[3],
        facultyName: bodyValues[4],
      })
      return JSON.stringify(reminderResult, null, 2)

    case 'payment_reminder':
      if (bodyValues.length < 5) {
        return JSON.stringify({
          success: false,
          error: 'payment_reminder requires: name, amountDue, dueDate, courseName, paymentLink',
        })
      }
      const paymentResult = await sendPaymentReminder({
        phone,
        name: bodyValues[0],
        amountDue: bodyValues[1],
        dueDate: bodyValues[2],
        courseName: bodyValues[3],
        paymentLink: bodyValues[4],
      })
      return JSON.stringify(paymentResult, null, 2)

    case 'otp_verification':
      if (bodyValues.length < 1) {
        return JSON.stringify({ success: false, error: 'otp_verification requires: otp' })
      }
      const otpResult = await sendWhatsAppOTP({ phone, otp: bodyValues[0] })
      return JSON.stringify(otpResult, null, 2)

    default:
      // Generic template sending
      const result = await sendTemplateMessage({
        phone,
        templateName: template,
        bodyValues,
        headerValues: headerValues.length > 0 ? headerValues : undefined,
      })
      return JSON.stringify(result, null, 2)
  }
}

async function handleBulkCampaign(args: Record<string, unknown>): Promise<string> {
  const template = args.template as string
  const recipients = args.recipients as Array<{ phone: string; body_values?: string[] }>
  const campaignName = (args.campaign_name as string) || `campaign_${Date.now()}`
  const delayMs = Math.min((args.delay_ms as number) || 100, 1000) // Max 1 second delay

  const results: Array<{ phone: string; success: boolean; messageId?: string; error?: string }> = []

  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i]

    try {
      const result = await sendTemplateMessage({
        phone: recipient.phone,
        templateName: template,
        bodyValues: recipient.body_values || [],
        callbackData: `${campaignName}_${i}`,
      })

      results.push({
        phone: recipient.phone,
        success: result.success,
        messageId: result.messageId,
        error: result.error,
      })

      // Add delay between messages to respect rate limits
      if (i < recipients.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
    } catch (error) {
      results.push({
        phone: recipient.phone,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  const successful = results.filter((r) => r.success).length
  const failed = results.filter((r) => !r.success).length

  return JSON.stringify(
    {
      campaign: campaignName,
      total: recipients.length,
      successful,
      failed,
      results,
    },
    null,
    2
  )
}

async function handleTrackUser(args: Record<string, unknown>): Promise<string> {
  const phone = args.phone as string
  const userId = args.user_id as string | undefined
  const traits = args.traits as Record<string, unknown> | undefined

  const result = await trackUser({
    phone,
    userId,
    traits,
  })

  return JSON.stringify(result, null, 2)
}

async function handleTrackEvent(args: Record<string, unknown>): Promise<string> {
  const phone = args.phone as string
  const event = args.event as string
  const properties = args.properties as Record<string, unknown> | undefined

  const result = await trackEvent({
    phone,
    eventName: event,
    eventData: properties,
  })

  return JSON.stringify(result, null, 2)
}

function handleGetTemplates(): string {
  const templates = {
    authentication: Object.entries(AUTH_TEMPLATES).map(([key, template]) => ({
      key: key.toLowerCase(),
      name: template.name,
      category: template.category,
      description: template.description,
      variables: template.variables,
    })),
    marketing: Object.entries(MARKETING_TEMPLATES).map(([key, template]) => ({
      key: key.toLowerCase(),
      name: template.name,
      category: template.category,
      description: template.description,
      variables: template.variables,
    })),
    utility: Object.entries(UTILITY_TEMPLATES).map(([key, template]) => ({
      key: key.toLowerCase(),
      name: template.name,
      category: template.category,
      description: template.description,
      variables: template.variables,
    })),
  }

  return JSON.stringify(templates, null, 2)
}

async function handleCheckHealth(): Promise<string> {
  const isConfigured = isInteraktConfigured()

  if (!isConfigured) {
    return JSON.stringify({
      status: 'not_configured',
      message: 'INTERAKT_API_KEY is not set in environment variables',
      configured: false,
    })
  }

  const health = await checkAPIHealth()

  return JSON.stringify({
    ...health,
    configured: true,
    timestamp: new Date().toISOString(),
  })
}

// ============================================
// REQUEST HANDLERS
// ============================================

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    let result: string

    switch (name) {
      case 'send_template':
        result = await handleSendTemplate(args || {})
        break
      case 'send_bulk_campaign':
        result = await handleBulkCampaign(args || {})
        break
      case 'track_user':
        result = await handleTrackUser(args || {})
        break
      case 'track_event':
        result = await handleTrackEvent(args || {})
        break
      case 'get_templates':
        result = handleGetTemplates()
        break
      case 'check_health':
        result = await handleCheckHealth()
        break
      default:
        throw new Error(`Unknown tool: ${name}`)
    }

    return {
      content: [
        {
          type: 'text',
          text: result,
        },
      ],
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ success: false, error: errorMessage }),
        },
      ],
      isError: true,
    }
  }
})

// ============================================
// SERVER STARTUP
// ============================================

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)

  // Log to stderr so it doesn't interfere with MCP protocol on stdout
  console.error('Interakt MCP Server started')
  console.error(`API configured: ${isInteraktConfigured()}`)
}

main().catch((error) => {
  console.error('Failed to start Interakt MCP Server:', error)
  process.exit(1)
})
