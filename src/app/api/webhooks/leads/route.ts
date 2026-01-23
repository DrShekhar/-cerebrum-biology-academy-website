/**
 * Generic Webhook Receiver for External Lead Sources
 * Handles leads from: Sulekha, JustDial, Google Ads, Meta Ads, Direct Calls
 *
 * POST /api/webhooks/leads
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import crypto from 'crypto'
import { emailService } from '@/lib/email/emailService'
import { emailTemplates } from '@/lib/email/templates'

// Generic lead schema - flexible to accommodate different sources
const genericLeadSchema = z.object({
  source: z.string(),
  studentName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(10),
  courseInterest: z.string().optional(),
  city: z.string().optional(),
  grade: z.string().optional(),
  message: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  // Source-specific fields (stored in metadata)
  metadata: z.record(z.string(), z.unknown()).optional(),
  // Security
  signature: z.string().optional(),
  timestamp: z.string().optional(),
})

// Type for raw webhook payloads from various sources
type SourcePayload = Record<string, unknown>

// Type for Meta Ads field data array
interface MetaFieldData {
  name: string
  values?: string[]
}

// Type for existing lead from database
interface ExistingLeadRecord {
  id: string
  email: string | null
  phone: string
  courseInterest: string | null
  assignedToId: string | null
  assignedTo: {
    name: string
    email: string
  } | null
}

type LeadSource =
  | 'sulekha'
  | 'justdial'
  | 'google_ads'
  | 'meta_ads'
  | 'direct_call'
  | 'manual'
  | 'other'

interface ParsedLead {
  studentName: string
  email?: string
  phone: string
  courseInterest: string
  city?: string
  grade?: string
  message?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  metadata?: Record<string, unknown>
}

/**
 * Source-specific parsers
 * Each parser normalizes the source's payload into our standard format
 */
// Helper to safely get string from unknown payload
const getString = (value: unknown): string | undefined => {
  return typeof value === 'string' ? value : undefined
}

const parsers: Record<LeadSource, (payload: SourcePayload) => ParsedLead> = {
  sulekha: (payload: SourcePayload): ParsedLead => {
    return {
      studentName: getString(payload.name) || getString(payload.customer_name) || 'Unknown',
      email: getString(payload.email),
      phone: getString(payload.phone) || getString(payload.mobile) || getString(payload.contact_number) || '',
      courseInterest: getString(payload.requirement) || getString(payload.course) || 'Biology Coaching',
      city: getString(payload.city) || getString(payload.location),
      grade: getString(payload.class) || getString(payload.student_class),
      message: getString(payload.message) || getString(payload.description),
      utmSource: 'sulekha',
      utmMedium: 'lead_aggregator',
      utmCampaign: getString(payload.campaign_id),
      metadata: {
        sulekhaLeadId: payload.lead_id,
        sulekhaCategory: payload.category,
        leadQuality: getString(payload.quality) || 'standard',
        rawPayload: payload,
      },
    }
  },

  justdial: (payload: SourcePayload): ParsedLead => {
    return {
      studentName: getString(payload.name) || getString(payload.customer_name) || 'Unknown',
      email: getString(payload.email),
      phone: getString(payload.phone) || getString(payload.mobile) || '',
      courseInterest: getString(payload.requirement) || getString(payload.service_required) || 'Biology Coaching',
      city: getString(payload.city) || getString(payload.area),
      grade: getString(payload.class),
      message: getString(payload.query) || getString(payload.message),
      utmSource: 'justdial',
      utmMedium: 'lead_aggregator',
      utmCampaign: getString(payload.campaign_id),
      metadata: {
        justdialLeadId: payload.lead_id,
        justdialCategory: payload.category,
        area: payload.area,
        pincode: payload.pincode,
        rawPayload: payload,
      },
    }
  },

  google_ads: (payload: SourcePayload): ParsedLead => {
    // Google Lead Form Extension format
    const formData = (payload.form_data || payload.user_column_data || {}) as SourcePayload
    return {
      studentName: getString(formData.full_name) || getString(formData.name) || 'Unknown',
      email: getString(formData.email),
      phone: getString(formData.phone_number) || getString(formData.phone) || '',
      courseInterest: getString(formData.course) || getString(formData.interested_in) || 'Biology Coaching',
      city: getString(formData.city),
      grade: getString(formData.class) || getString(formData.grade),
      message: getString(formData.message) || getString(formData.comments),
      utmSource: 'google_ads',
      utmMedium: 'cpc',
      utmCampaign: getString(payload.campaign_id) || getString(payload.google_key),
      metadata: {
        googleLeadId: payload.lead_id || payload.google_key,
        campaignName: payload.campaign_name,
        adGroupName: payload.ad_group_name,
        formId: payload.form_id,
        gclid: payload.gclid,
        rawPayload: payload,
      },
    }
  },

  meta_ads: (payload: SourcePayload): ParsedLead => {
    // Facebook/Instagram Lead Ads format
    const fieldData = (payload.field_data || []) as MetaFieldData[]
    const getField = (name: string): string | undefined => {
      const field = fieldData.find((f: MetaFieldData) => f.name === name)
      return field?.values?.[0]
    }

    return {
      studentName: getField('full_name') || getField('name') || 'Unknown',
      email: getField('email'),
      phone: getField('phone_number') || getField('phone') || '',
      courseInterest: getField('course') || getField('interested_in') || 'Biology Coaching',
      city: getField('city'),
      grade: getField('class') || getField('grade'),
      message: getField('message') || getField('comments'),
      utmSource: 'facebook',
      utmMedium: 'social',
      utmCampaign: getString(payload.campaign_id),
      metadata: {
        facebookLeadId: payload.leadgen_id || payload.id,
        formId: payload.form_id,
        adId: payload.ad_id,
        campaignName: payload.campaign_name,
        adName: payload.ad_name,
        rawPayload: payload,
      },
    }
  },

  direct_call: (payload: SourcePayload): ParsedLead => {
    return {
      studentName: getString(payload.name) || getString(payload.caller_name) || 'Unknown',
      email: getString(payload.email),
      phone: getString(payload.phone) || getString(payload.caller_number) || '',
      courseInterest: getString(payload.course) || getString(payload.inquiry) || 'Biology Coaching',
      city: getString(payload.city),
      grade: getString(payload.class),
      message: getString(payload.notes) || getString(payload.call_summary),
      utmSource: 'direct_call',
      utmMedium: 'phone',
      utmCampaign: getString(payload.campaign),
      metadata: {
        callDuration: payload.call_duration,
        callRecording: payload.recording_url,
        callerId: payload.caller_id,
        callTime: payload.call_time,
        rawPayload: payload,
      },
    }
  },

  manual: (payload: SourcePayload): ParsedLead => {
    // For manually added leads (from form, admin panel, etc.)
    return {
      studentName: getString(payload.studentName) || getString(payload.name) || 'Unknown',
      email: getString(payload.email),
      phone: getString(payload.phone) || '',
      courseInterest: getString(payload.courseInterest) || 'Biology Coaching',
      city: getString(payload.city),
      grade: getString(payload.grade) || getString(payload.class),
      message: getString(payload.message) || getString(payload.notes),
      utmSource: getString(payload.utmSource) || 'manual',
      utmMedium: getString(payload.utmMedium) || 'direct',
      utmCampaign: getString(payload.utmCampaign),
      metadata: {
        addedBy: getString(payload.addedBy) || 'system',
        source: getString(payload.source) || 'manual_entry',
        rawPayload: payload,
      },
    }
  },

  other: (payload: SourcePayload): ParsedLead => {
    // Generic parser for unknown sources
    return {
      studentName: getString(payload.name) || getString(payload.studentName) || 'Unknown',
      email: getString(payload.email),
      phone: getString(payload.phone) || getString(payload.mobile) || '',
      courseInterest: getString(payload.course) || getString(payload.interest) || 'Biology Coaching',
      city: getString(payload.city),
      grade: getString(payload.grade) || getString(payload.class),
      message: getString(payload.message) || getString(payload.notes),
      utmSource: getString(payload.source) || 'other',
      utmMedium: 'unknown',
      utmCampaign: getString(payload.campaign),
      metadata: {
        rawPayload: payload,
      },
    }
  },
}

/**
 * Verify webhook signature for security
 * Different sources use different signature methods
 */
function verifySignature(
  source: LeadSource,
  payload: SourcePayload,
  signature?: string,
  _timestamp?: string
): boolean {
  // For now, return true - implement signature verification per source
  // In production, verify signatures based on each platform's method

  if (!signature) {
    // Allow unsigned webhooks in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Webhook from ${source} has no signature (dev mode)`)
      return true
    }
    return false
  }

  // Implement signature verification per source
  switch (source) {
    case 'google_ads':
      // Verify Google's signature using HMAC SHA-256
      // Google sends: X-Goog-Signature header with HMAC of request body
      const googleSecret = process.env.WEBHOOK_SECRET_GOOGLE_ADS
      if (!googleSecret) {
        console.warn('WEBHOOK_SECRET_GOOGLE_ADS not configured')
        return process.env.NODE_ENV === 'development'
      }

      try {
        const expectedSignature = crypto
          .createHmac('sha256', googleSecret)
          .update(JSON.stringify(payload))
          .digest('hex')

        const isValidGoogle =
          signature &&
          crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))

        if (!isValidGoogle) {
          console.error('Invalid Google Ads webhook signature')
        }

        return isValidGoogle
      } catch (error) {
        console.error('Google signature verification error:', error)
        return false
      }

    case 'meta_ads':
      // Verify Facebook's signature using HMAC SHA-256
      // Facebook sends: X-Hub-Signature-256 header with sha256=<signature>
      const metaSecret = process.env.WEBHOOK_SECRET_META_ADS
      if (!metaSecret) {
        console.warn('WEBHOOK_SECRET_META_ADS not configured')
        return process.env.NODE_ENV === 'development'
      }

      try {
        // Facebook signature format: "sha256=<signature>"
        const signatureHash = signature?.replace('sha256=', '') || ''

        const expectedMetaSignature = crypto
          .createHmac('sha256', metaSecret)
          .update(JSON.stringify(payload))
          .digest('hex')

        const isValidMeta =
          signatureHash &&
          crypto.timingSafeEqual(Buffer.from(signatureHash), Buffer.from(expectedMetaSignature))

        if (!isValidMeta) {
          console.error('Invalid Meta Ads webhook signature')
        }

        return isValidMeta
      } catch (error) {
        console.error('Meta signature verification error:', error)
        return false
      }

    case 'sulekha':
    case 'justdial':
      // These typically use API keys or IP whitelisting
      // Can add API key verification if provided by these platforms
      const sulekhaSecret = process.env.WEBHOOK_SECRET_SULEKHA
      const justdialSecret = process.env.WEBHOOK_SECRET_JUSTDIAL

      if (source === 'sulekha' && sulekhaSecret && signature) {
        try {
          const expectedSulekhaSignature = crypto
            .createHmac('sha256', sulekhaSecret)
            .update(JSON.stringify(payload))
            .digest('hex')

          return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSulekhaSignature)
          )
        } catch (error) {
          console.error('Sulekha signature verification error:', error)
          return false
        }
      }

      if (source === 'justdial' && justdialSecret && signature) {
        try {
          const expectedJustdialSignature = crypto
            .createHmac('sha256', justdialSecret)
            .update(JSON.stringify(payload))
            .digest('hex')

          return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedJustdialSignature)
          )
        } catch (error) {
          console.error('Justdial signature verification error:', error)
          return false
        }
      }

      return true

    default:
      return true
  }
}

/**
 * Check for duplicate leads (by phone or email)
 */
async function checkDuplicate(
  phone: string,
  email?: string
): Promise<{ isDuplicate: boolean; existingLead?: ExistingLeadRecord }> {
  const existingLead = await prisma.leads.findFirst({
    where: {
      OR: [{ phone }, email ? { email } : {}].filter(Boolean),
    },
    include: {
      assignedTo: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  if (existingLead) {
    return {
      isDuplicate: true,
      existingLead: existingLead as ExistingLeadRecord,
    }
  }

  return { isDuplicate: false }
}

/**
 * Assign lead to counselor (round-robin)
 */
async function assignCounselor() {
  // Get all counselors
  const counselors = await prisma.users.findMany({
    where: { role: 'COUNSELOR' },
    include: {
      _count: {
        select: {
          assignedLeads: {
            where: {
              stage: {
                notIn: ['ENROLLED', 'ACTIVE_STUDENT', 'LOST'],
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  if (counselors.length === 0) {
    // Create default counselor if none exists
    return await prisma.users.create({
      data: {
        email: 'counselor@cerebrumbiologyacademy.com',
        name: 'Default Counselor',
        role: 'COUNSELOR',
        phone: '+918826444334',
      },
    })
  }

  // Round-robin: assign to counselor with fewest active leads
  const counselor = counselors.reduce((prev, current) =>
    prev._count.assignedLeads < current._count.assignedLeads ? prev : current
  )

  return counselor
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Determine source from payload or header
    const sourceHeader = request.headers.get('x-lead-source') || body.source || 'other'
    const source = sourceHeader.toLowerCase() as LeadSource

    console.log(`📥 Webhook received from source: ${source}`)

    // Verify signature (if provided)
    const signature = request.headers.get('x-signature') || body.signature
    const timestamp = request.headers.get('x-timestamp') || body.timestamp

    if (!verifySignature(source, body, signature, timestamp)) {
      console.error(`❌ Invalid signature from ${source}`)
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 })
    }

    // Parse lead data using source-specific parser
    const parser = parsers[source] || parsers.other
    const leadData = parser(body)

    console.log(`📋 Parsed lead data:`, {
      name: leadData.studentName,
      phone: leadData.phone,
      source,
    })

    // Check for duplicates
    const { isDuplicate, existingLead } = await checkDuplicate(leadData.phone, leadData.email)

    if (isDuplicate) {
      console.log(`⚠️ Duplicate lead detected: ${leadData.phone}`)

      // Update existing lead with new information
      await prisma.leads.update({
        where: { id: existingLead.id },
        data: {
          lastContactedAt: new Date(),
          // Update other fields if they're empty
          email: existingLead.email || leadData.email,
          courseInterest: existingLead.courseInterest || leadData.courseInterest,
        },
      })

      // Log activity
      await prisma.activities.create({
        data: {
          userId: existingLead.assignedToId,
          leadId: existingLead.id,
          action: 'DUPLICATE_LEAD_DETECTED',
          description: `Duplicate lead submission from ${source}. Lead already exists with counselor ${existingLead.assignedTo.name}.`,
          metadata: leadData.metadata,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Duplicate lead detected and updated',
        leadId: existingLead.id,
        isDuplicate: true,
      })
    }

    // Assign counselor
    const counselor = await assignCounselor()

    // Create new lead
    const lead = await prisma.leads.create({
      data: {
        studentName: leadData.studentName,
        email: leadData.email,
        phone: leadData.phone,
        courseInterest: leadData.courseInterest || 'Biology Coaching',
        stage: 'NEW_LEAD',
        priority: source === 'google_ads' || source === 'meta_ads' ? 'HOT' : 'WARM',
        source: `${source}${leadData.metadata?.campaignName ? ` - ${leadData.metadata.campaignName}` : ''}`,
        assignedToId: counselor.id,
        nextFollowUpAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      },
    })

    // Create follow-up task
    const task = await prisma.tasks.create({
      data: {
        title: `New lead from ${source} - ${leadData.studentName}`,
        description: `New lead received from ${source}.\n\nStudent: ${leadData.studentName}\nPhone: ${leadData.phone}\nEmail: ${leadData.email || 'Not provided'}\nCourse Interest: ${leadData.courseInterest}\nCity: ${leadData.city || 'Not provided'}\nGrade: ${leadData.grade || 'Not provided'}\n\nMessage: ${leadData.message || 'No message'}\n\nPlease contact within 2 hours for best conversion.`,
        type: 'FOLLOW_UP_CALL',
        priority: source === 'google_ads' || source === 'meta_ads' ? 'HIGH' : 'MEDIUM',
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: 'PENDING',
        leadId: lead.id,
        assignedToId: counselor.id,
        createdById: counselor.id,
        isAutoGenerated: true,
        triggerEvent: `webhook_${source}`,
      },
    })

    // Log activity
    await prisma.activities.create({
      data: {
        userId: counselor.id,
        leadId: lead.id,
        action: 'LEAD_CREATED',
        description: `New lead created from ${source} webhook. Auto-assigned to ${counselor.name}.`,
        metadata: {
          source,
          ...leadData.metadata,
          utmSource: leadData.utmSource,
          utmMedium: leadData.utmMedium,
          utmCampaign: leadData.utmCampaign,
        },
      },
    })

    // Send welcome email (non-blocking)
    if (leadData.email) {
      emailService
        .send({
          to: leadData.email,
          subject: 'Welcome to Cerebrum Biology Academy!',
          html: emailTemplates.leadWelcome({
            studentName: leadData.studentName,
            counselorName: counselor.name,
            counselorPhone: counselor.phone || '+91 88264 44334',
            counselorEmail: counselor.email,
            source: `${source}${leadData.metadata?.campaignName ? ` (${leadData.metadata.campaignName})` : ''}`,
          }),
        })
        .then((result) => {
          if (result.success) {
            console.log(`📧 Welcome email sent to ${leadData.email} via ${result.provider}`)
          } else {
            console.error(`📧 Failed to send welcome email to ${leadData.email}:`, result.error)
          }
        })
        .catch((error) => {
          console.error(`📧 Email service error:`, error)
        })
    }

    console.log(`✅ Lead created successfully:`, {
      leadId: lead.id,
      taskId: task.id,
      counselor: counselor.name,
      source,
    })

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      leadId: lead.id,
      taskId: task.id,
      assignedTo: counselor.name,
      source,
    })
  } catch (error) {
    console.error('❌ Webhook processing error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process webhook',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// GET endpoint for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Generic Lead Webhook Receiver',
    endpoints: {
      POST: '/api/webhooks/leads',
    },
    supportedSources: [
      'sulekha',
      'justdial',
      'google_ads',
      'meta_ads',
      'direct_call',
      'manual',
      'other',
    ],
    usage: {
      headers: {
        'x-lead-source': 'sulekha | justdial | google_ads | meta_ads | direct_call',
        'x-signature': 'optional signature for verification',
        'x-timestamp': 'optional timestamp',
      },
      body: 'Source-specific payload - will be parsed automatically',
    },
  })
}
