// Content Leads to CRM Leads Migration API
// Promotes qualified content_leads to the main leads table for counselor follow-up

import { NextRequest, NextResponse } from 'next/server'
import { withAdmin, ValidatedSession } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { LeadSource, LeadStage, Priority } from '@/generated/prisma'

const migrateSchema = z.object({
  // Specific content lead IDs to migrate
  contentLeadIds: z.array(z.string()).optional(),
  // Or migrate based on criteria
  criteria: z
    .object({
      minEngagementScore: z.number().min(0).max(100).optional(),
      captureTypes: z.array(z.string()).optional(),
      sources: z.array(z.string()).optional(),
      createdAfter: z.string().datetime().optional(),
      createdBefore: z.string().datetime().optional(),
    })
    .optional(),
  // Assignment options
  counselorId: z.string().optional(), // Specific counselor or round-robin if not provided
  priority: z.enum(['HOT', 'WARM', 'COLD']).optional().default('WARM'),
  // Prevent duplicates
  skipExisting: z.boolean().optional().default(true),
})

interface MigrationResult {
  migrated: number
  skipped: number
  errors: string[]
  migratedLeadIds: string[]
}

async function handlePOST(request: NextRequest, session: ValidatedSession): Promise<NextResponse> {
  try {
    const body = await request.json()
    const validatedData = migrateSchema.parse(body)

    const result: MigrationResult = {
      migrated: 0,
      skipped: 0,
      errors: [],
      migratedLeadIds: [],
    }

    // Build query for content leads
    const whereClause: Record<string, unknown> = {}

    if (validatedData.contentLeadIds?.length) {
      whereClause.id = { in: validatedData.contentLeadIds }
    } else if (validatedData.criteria) {
      const { criteria } = validatedData

      if (criteria.minEngagementScore !== undefined) {
        whereClause.engagementScore = { gte: criteria.minEngagementScore }
      }

      if (criteria.captureTypes?.length) {
        whereClause.captureType = { in: criteria.captureTypes }
      }

      if (criteria.sources?.length) {
        whereClause.source = { in: criteria.sources }
      }

      if (criteria.createdAfter) {
        whereClause.createdAt = {
          ...((whereClause.createdAt as object) || {}),
          gte: new Date(criteria.createdAfter),
        }
      }

      if (criteria.createdBefore) {
        whereClause.createdAt = {
          ...((whereClause.createdAt as object) || {}),
          lte: new Date(criteria.createdBefore),
        }
      }
    }

    // Fetch content leads to migrate
    const contentLeads = await prisma.content_leads.findMany({
      where: whereClause,
      orderBy: { engagementScore: 'desc' },
      take: 500, // Limit batch size
    })

    if (contentLeads.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No content leads match the criteria',
        data: result,
      })
    }

    // Get counselors for assignment
    const counselors = await prisma.users.findMany({
      where: {
        role: { in: ['COUNSELOR', 'ADMIN'] },
        isActive: true,
      },
      select: { id: true, name: true },
      orderBy: { leads: { _count: 'asc' } },
    })

    if (counselors.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No active counselors available for assignment' },
        { status: 400 }
      )
    }

    // Process each content lead
    let counselorIndex = 0

    for (const contentLead of contentLeads) {
      try {
        // Check if CRM lead already exists
        if (validatedData.skipExisting) {
          const existingLead = await prisma.leads.findFirst({
            where: {
              OR: [
                { email: contentLead.email || undefined },
                { phone: contentLead.whatsappPhone },
              ].filter((c) => Object.values(c).some(Boolean)),
            },
          })

          if (existingLead) {
            result.skipped++
            continue
          }
        }

        // Determine counselor assignment
        const assignedCounselorId =
          validatedData.counselorId || counselors[counselorIndex % counselors.length].id

        // Map source to LeadSource enum
        const sourceMapping: Record<string, LeadSource> = {
          blog_inline: LeadSource.WEBSITE,
          blog_sidebar: LeadSource.WEBSITE,
          exit_intent: LeadSource.WEBSITE,
          catalog_download: LeadSource.WEBSITE,
          lead_magnet: LeadSource.WEBSITE,
          whatsapp_cta: LeadSource.WHATSAPP,
        }

        const leadSource = sourceMapping[contentLead.source || ''] || LeadSource.WEBSITE

        // Determine priority based on engagement score
        let priority: Priority = validatedData.priority as Priority
        if (contentLead.engagementScore) {
          if (contentLead.engagementScore >= 70) priority = Priority.HOT
          else if (contentLead.engagementScore >= 40) priority = Priority.WARM
          else priority = Priority.COLD
        }

        // Create CRM lead
        const newLead = await prisma.leads.create({
          data: {
            id: `lead_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            studentName: contentLead.name || contentLead.email?.split('@')[0] || 'Unknown',
            email: contentLead.email,
            phone: contentLead.whatsappPhone,
            courseInterest: contentLead.articleSlug
              ? `Interest from: ${contentLead.articleSlug}`
              : 'NEET Biology',
            stage: LeadStage.NEW_LEAD,
            priority,
            source: leadSource,
            assignedToId: assignedCounselorId,
            score: contentLead.engagementScore,
            scoreBreakdown: {
              contentEngagement: contentLead.engagementScore,
              source: contentLead.source,
              captureType: contentLead.captureType,
              migratedFrom: 'content_leads',
              originalId: contentLead.id,
            },
            updatedAt: new Date(),
          },
        })

        // Create activity log
        await prisma.activities.create({
          data: {
            id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            userId: session.userId,
            leadId: newLead.id,
            action: 'LEAD_MIGRATED',
            description: `Migrated from content_leads (${contentLead.captureType})`,
            metadata: {
              contentLeadId: contentLead.id,
              source: contentLead.source,
              engagementScore: contentLead.engagementScore,
            },
          },
        })

        // Mark content lead as migrated (optional: add migrated flag to content_leads)
        await prisma.content_leads.update({
          where: { id: contentLead.id },
          data: {
            metadata: {
              ...((contentLead.metadata as object) || {}),
              migratedToLeadId: newLead.id,
              migratedAt: new Date().toISOString(),
            },
          },
        })

        result.migrated++
        result.migratedLeadIds.push(newLead.id)
        counselorIndex++
      } catch (error) {
        result.errors.push(
          `Failed to migrate ${contentLead.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migration complete: ${result.migrated} migrated, ${result.skipped} skipped`,
      data: result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error migrating leads:', error)
    return NextResponse.json({ success: false, error: 'Failed to migrate leads' }, { status: 500 })
  }
}

// GET: Preview leads that would be migrated
async function handleGET(request: NextRequest, _session: ValidatedSession): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const minScore = parseInt(searchParams.get('minScore') || '0')
    const captureType = searchParams.get('captureType')
    const source = searchParams.get('source')

    // Build query
    const whereClause: Record<string, unknown> = {}

    if (minScore > 0) {
      whereClause.engagementScore = { gte: minScore }
    }

    if (captureType) {
      whereClause.captureType = captureType
    }

    if (source) {
      whereClause.source = source
    }

    // Get content leads that haven't been migrated
    const contentLeads = await prisma.content_leads.findMany({
      where: {
        ...whereClause,
        NOT: {
          metadata: {
            path: ['migratedToLeadId'],
            not: null,
          },
        },
      },
      orderBy: { engagementScore: 'desc' },
      take: 100,
      select: {
        id: true,
        name: true,
        email: true,
        whatsappPhone: true,
        source: true,
        captureType: true,
        engagementScore: true,
        articleSlug: true,
        createdAt: true,
      },
    })

    // Check which would be duplicates
    const emails = contentLeads.map((l) => l.email).filter(Boolean) as string[]
    const phones = contentLeads.map((l) => l.whatsappPhone).filter(Boolean)

    const existingLeads = await prisma.leads.findMany({
      where: {
        OR: [{ email: { in: emails } }, { phone: { in: phones } }],
      },
      select: { email: true, phone: true },
    })

    const existingEmails = new Set(existingLeads.map((l) => l.email))
    const existingPhones = new Set(existingLeads.map((l) => l.phone))

    // Mark which leads would be new vs duplicate
    const preview = contentLeads.map((lead) => ({
      ...lead,
      wouldBeDuplicate:
        (lead.email && existingEmails.has(lead.email)) || existingPhones.has(lead.whatsappPhone),
    }))

    const newLeads = preview.filter((l) => !l.wouldBeDuplicate)
    const duplicates = preview.filter((l) => l.wouldBeDuplicate)

    return NextResponse.json({
      success: true,
      data: {
        total: preview.length,
        newLeads: newLeads.length,
        duplicates: duplicates.length,
        preview: preview.slice(0, 50),
        captureTypes: await prisma.content_leads.groupBy({
          by: ['captureType'],
          _count: { id: true },
        }),
        sources: await prisma.content_leads.groupBy({
          by: ['source'],
          _count: { id: true },
        }),
      },
    })
  } catch (error) {
    console.error('Error previewing migration:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to preview migration' },
      { status: 500 }
    )
  }
}

export const POST = withAdmin(handlePOST)
export const GET = withAdmin(handleGET)
