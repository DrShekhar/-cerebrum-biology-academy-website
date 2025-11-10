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
  metadata: z.record(z.any()).optional(),
  // Security
  signature: z.string().optional(),
  timestamp: z.string().optional(),
})

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
  metadata?: Record<string, any>
}

/**
 * Source-specific parsers
 * Each parser normalizes the source's payload into our standard format
 */
const parsers = {
  sulekha: (payload: any): ParsedLead => {
    return {
      studentName: payload.name || payload.customer_name || 'Unknown',
      email: payload.email,
      phone: payload.phone || payload.mobile || payload.contact_number,
      courseInterest: payload.requirement || payload.course || 'Biology Coaching',
      city: payload.city || payload.location,
      grade: payload.class || payload.student_class,
      message: payload.message || payload.description,
      utmSource: 'sulekha',
      utmMedium: 'lead_aggregator',
      utmCampaign: payload.campaign_id,
      metadata: {
        sulekhaLeadId: payload.lead_id,
        sulekhaCategory: payload.category,
        leadQuality: payload.quality || 'standard',
        rawPayload: payload,
      },
    }
  },

  justdial: (payload: any): ParsedLead => {
    return {
      studentName: payload.name || payload.customer_name || 'Unknown',
      email: payload.email,
      phone: payload.phone || payload.mobile,
      courseInterest: payload.requirement || payload.service_required || 'Biology Coaching',
      city: payload.city || payload.area,
      grade: payload.class,
      message: payload.query || payload.message,
      utmSource: 'justdial',
      utmMedium: 'lead_aggregator',
      utmCampaign: payload.campaign_id,
      metadata: {
        justdialLeadId: payload.lead_id,
        justdialCategory: payload.category,
        area: payload.area,
        pincode: payload.pincode,
        rawPayload: payload,
      },
    }
  },

  google_ads: (payload: any): ParsedLead => {
    // Google Lead Form Extension format
    const formData = payload.form_data || payload.user_column_data || {}
    return {
      studentName: formData.full_name || formData.name || 'Unknown',
      email: formData.email,
      phone: formData.phone_number || formData.phone,
      courseInterest: formData.course || formData.interested_in || 'Biology Coaching',
      city: formData.city,
      grade: formData.class || formData.grade,
      message: formData.message || formData.comments,
      utmSource: 'google_ads',
      utmMedium: 'cpc',
      utmCampaign: payload.campaign_id || payload.google_key,
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

  meta_ads: (payload: any): ParsedLead => {
    // Facebook/Instagram Lead Ads format
    const fieldData = payload.field_data || []
    const getField = (name: string) => {
      const field = fieldData.find((f: any) => f.name === name)
      return field?.values?.[0] || null
    }

    return {
      studentName: getField('full_name') || getField('name') || 'Unknown',
      email: getField('email'),
      phone: getField('phone_number') || getField('phone'),
      courseInterest: getField('course') || getField('interested_in') || 'Biology Coaching',
      city: getField('city'),
      grade: getField('class') || getField('grade'),
      message: getField('message') || getField('comments'),
      utmSource: 'facebook',
      utmMedium: 'social',
      utmCampaign: payload.campaign_id,
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

  direct_call: (payload: any): ParsedLead => {
    return {
      studentName: payload.name || payload.caller_name || 'Unknown',
      email: payload.email,
      phone: payload.phone || payload.caller_number,
      courseInterest: payload.course || payload.inquiry || 'Biology Coaching',
      city: payload.city,
      grade: payload.class,
      message: payload.notes || payload.call_summary,
      utmSource: 'direct_call',
      utmMedium: 'phone',
      utmCampaign: payload.campaign,
      metadata: {
        callDuration: payload.call_duration,
        callRecording: payload.recording_url,
        callerId: payload.caller_id,
        callTime: payload.call_time,
        rawPayload: payload,
      },
    }
  },

  manual: (payload: any): ParsedLead => {
    // For manually added leads (from form, admin panel, etc.)
    return {
      studentName: payload.studentName || payload.name,
      email: payload.email,
      phone: payload.phone,
      courseInterest: payload.courseInterest || 'Biology Coaching',
      city: payload.city,
      grade: payload.grade || payload.class,
      message: payload.message || payload.notes,
      utmSource: payload.utmSource || 'manual',
      utmMedium: payload.utmMedium || 'direct',
      utmCampaign: payload.utmCampaign,
      metadata: {
        addedBy: payload.addedBy || 'system',
        source: payload.source || 'manual_entry',
        rawPayload: payload,
      },
    }
  },

  other: (payload: any): ParsedLead => {
    // Generic parser for unknown sources
    return {
      studentName: payload.name || payload.studentName || 'Unknown',
      email: payload.email,
      phone: payload.phone || payload.mobile,
      courseInterest: payload.course || payload.interest || 'Biology Coaching',
      city: payload.city,
      grade: payload.grade || payload.class,
      message: payload.message || payload.notes,
      utmSource: payload.source || 'other',
      utmMedium: 'unknown',
      utmCampaign: payload.campaign,
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
  payload: any,
  signature?: string,
  timestamp?: string
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
      // Verify Google's signature
      // TODO: Implement Google signature verification
      return true

    case 'meta_ads':
      // Verify Facebook's signature
      // TODO: Implement Facebook signature verification
      return true

    case 'sulekha':
    case 'justdial':
      // These typically use API keys or IP whitelisting
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
): Promise<{ isDuplicate: boolean; existingLead?: any }> {
  const existingLead = await prisma.lead.findFirst({
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
      existingLead,
    }
  }

  return { isDuplicate: false }
}

/**
 * Assign lead to counselor (round-robin)
 */
async function assignCounselor() {
  // Get all counselors
  const counselors = await prisma.user.findMany({
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
    return await prisma.user.create({
      data: {
        email: 'counselor@cerebrumbiologyacademy.com',
        name: 'Default Counselor',
        role: 'COUNSELOR',
        phone: '+919876543210',
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
      await prisma.lead.update({
        where: { id: existingLead.id },
        data: {
          lastContactedAt: new Date(),
          // Update other fields if they're empty
          email: existingLead.email || leadData.email,
          courseInterest: existingLead.courseInterest || leadData.courseInterest,
        },
      })

      // Log activity
      await prisma.activity.create({
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
    const lead = await prisma.lead.create({
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
    const task = await prisma.task.create({
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
    await prisma.activity.create({
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
