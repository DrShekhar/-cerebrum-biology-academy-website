/**
 * Follow-up Template Renderer
 *
 * This module handles the rendering of follow-up message templates
 * with lead data placeholder substitution.
 */

export interface TemplateVariables {
  [key: string]: string | number | boolean | null | undefined
}

/**
 * Available template variables that can be used in templates
 */
export const TEMPLATE_VARIABLES: Record<string, string> = {
  studentName: 'Student name',
  email: 'Email address',
  phone: 'Phone number',
  courseInterest: 'Interested course',
  stage: 'Current lead stage',
  priority: 'Lead priority (HOT/WARM/COLD)',
  score: 'Lead score (0-100)',
  assignedCounselor: 'Assigned counselor name',
  counselorEmail: 'Counselor email',
  counselorPhone: 'Counselor phone',
  source: 'Lead source',
  createdDate: 'Lead creation date',
  lastContactDate: 'Last contact date',
  nextFollowUpDate: 'Next follow-up date',
  demoDate: 'Demo scheduled date',
  offerAmount: 'Latest offer amount',
  communicationCount: 'Total communications',
  taskCount: 'Pending tasks count',
  daysSinceCreation: 'Days since lead was created',
  daysSinceContact: 'Days since last contact',
}

/**
 * Render a template with lead data
 *
 * @param template - The template object with content and variables
 * @param lead - The lead data object
 * @returns Rendered template string with replaced placeholders
 */
export function renderTemplate(template: any, lead: any): string {
  if (!template || !template.content) {
    return ''
  }

  const variables = extractVariables(lead)
  let rendered = template.content

  Object.keys(variables).forEach((key) => {
    const value = variables[key]
    const placeholder = `{{${key}}}`
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')

    rendered = rendered.replace(regex, String(value ?? ''))
  })

  rendered = handleConditionals(rendered, variables)

  return rendered.trim()
}

/**
 * Extract variables from lead data
 */
function extractVariables(lead: any): TemplateVariables {
  const counselor = lead.users || lead.assignedTo
  const latestDemo = lead.demo_bookings?.[0]
  const latestOffer = lead.offers?.[0]

  const createdDate = lead.createdAt ? new Date(lead.createdAt) : null
  const lastContactDate = lead.lastContactedAt ? new Date(lead.lastContactedAt) : null
  const nextFollowUpDate = lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt) : null

  const daysSinceCreation = createdDate
    ? Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const daysSinceContact = lastContactDate
    ? Math.floor((Date.now() - lastContactDate.getTime()) / (1000 * 60 * 60 * 24))
    : null

  return {
    studentName: lead.studentName || 'there',
    email: lead.email || '',
    phone: lead.phone || '',
    courseInterest: lead.courseInterest || '',
    stage: formatStage(lead.stage),
    priority: lead.priority || 'WARM',
    score: lead.score || 0,
    assignedCounselor: counselor?.name || 'Your counselor',
    counselorEmail: counselor?.email || '',
    counselorPhone: counselor?.phone || '',
    source: formatSource(lead.source),
    createdDate: createdDate ? formatDate(createdDate) : '',
    lastContactDate: lastContactDate ? formatDate(lastContactDate) : '',
    nextFollowUpDate: nextFollowUpDate ? formatDate(nextFollowUpDate) : '',
    demoDate: latestDemo?.scheduledAt ? formatDate(new Date(latestDemo.scheduledAt)) : '',
    offerAmount: latestOffer?.totalAmount || '',
    communicationCount: lead._count?.crm_communications || lead._count?.communications || 0,
    taskCount: lead._count?.tasks || 0,
    daysSinceCreation,
    daysSinceContact: daysSinceContact ?? '',
  }
}

/**
 * Handle conditional content in templates
 * Syntax: {{#if variable}}content{{/if}}
 */
function handleConditionals(content: string, variables: TemplateVariables): string {
  const conditionalRegex = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g

  return content.replace(conditionalRegex, (match, variableName, conditionalContent) => {
    const value = variables[variableName]

    if (value && value !== '' && value !== 0 && value !== false) {
      return conditionalContent
    }

    return ''
  })
}

/**
 * Format stage enum to human-readable text
 */
function formatStage(stage: string | null | undefined): string {
  if (!stage) return 'New Lead'

  const stageMap: Record<string, string> = {
    NEW_LEAD: 'New Lead',
    DEMO_SCHEDULED: 'Demo Scheduled',
    DEMO_COMPLETED: 'Demo Completed',
    OFFER_SENT: 'Offer Sent',
    NEGOTIATING: 'Negotiating',
    PAYMENT_PLAN_CREATED: 'Payment Plan Created',
    ENROLLED: 'Enrolled',
    ACTIVE_STUDENT: 'Active Student',
    LOST: 'Lost',
  }

  return stageMap[stage] || stage
}

/**
 * Format source enum to human-readable text
 */
function formatSource(source: string | null | undefined): string {
  if (!source) return 'Unknown'

  const sourceMap: Record<string, string> = {
    MANUAL_ENTRY: 'Manual Entry',
    WALK_IN: 'Walk-in',
    PHONE_CALL: 'Phone Call',
    WEBSITE: 'Website',
    REFERRAL: 'Referral',
    SOCIAL_MEDIA: 'Social Media',
    EMAIL_CAMPAIGN: 'Email Campaign',
    OTHER: 'Other',
  }

  return sourceMap[source] || source
}

/**
 * Format date to readable string
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Validate template content for valid placeholders
 */
export function validateTemplate(content: string): {
  valid: boolean
  invalidPlaceholders: string[]
  validPlaceholders: string[]
} {
  const placeholderRegex = /\{\{(\w+)\}\}/g
  const matches = [...content.matchAll(placeholderRegex)]

  const foundPlaceholders = matches.map((match) => match[1])
  const validKeys = Object.keys(TEMPLATE_VARIABLES)

  const invalidPlaceholders = foundPlaceholders.filter((p) => !validKeys.includes(p))
  const validPlaceholders = foundPlaceholders.filter((p) => validKeys.includes(p))

  return {
    valid: invalidPlaceholders.length === 0,
    invalidPlaceholders,
    validPlaceholders,
  }
}

/**
 * Get preview of template with sample data
 */
export function previewTemplate(content: string): string {
  const sampleLead = {
    studentName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    courseInterest: 'Biology Advanced',
    stage: 'DEMO_COMPLETED',
    priority: 'HOT',
    score: 85,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastContactedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextFollowUpAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    users: {
      name: 'Sarah Williams',
      email: 'sarah@cerebrumacademy.com',
      phone: '+1234567891',
    },
    demo_bookings: [
      {
        scheduledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
    offers: [
      {
        totalAmount: 15000,
      },
    ],
    _count: {
      crm_communications: 5,
      tasks: 2,
    },
  }

  const template = { content }
  return renderTemplate(template, sampleLead)
}
