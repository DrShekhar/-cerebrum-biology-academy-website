// Lead Export API - CSV/Excel export for reporting
// GET: Export leads with filtering options

import { NextRequest, NextResponse } from 'next/server'
import { withAdmin, ValidatedSession } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { LeadStage, Priority, LeadSource } from '@/generated/prisma'

interface ExportLead {
  id: string
  studentName: string
  email: string | null
  phone: string
  courseInterest: string
  stage: string
  priority: string
  source: string
  counselorName: string | null
  counselorEmail: string | null
  score: number | null
  createdAt: string
  lastContactedAt: string | null
  nextFollowUpAt: string | null
  convertedAt: string | null
  lostAt: string | null
  lostReason: string | null
  communicationsCount: number
  tasksCount: number
  demoBooked: boolean
  demoCompleted: boolean
}

async function handleGET(
  request: NextRequest,
  _session: ValidatedSession
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)

    // Filter parameters
    const format = searchParams.get('format') || 'csv' // csv or json
    const stage = searchParams.get('stage') as LeadStage | null
    const priority = searchParams.get('priority') as Priority | null
    const source = searchParams.get('source') as LeadSource | null
    const counselorId = searchParams.get('counselorId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const includeContent = searchParams.get('includeContent') === 'true'
    const limit = Math.min(parseInt(searchParams.get('limit') || '10000'), 50000)

    // Build query
    const whereClause: Record<string, unknown> = {}

    if (stage) whereClause.stage = stage
    if (priority) whereClause.priority = priority
    if (source) whereClause.source = source
    if (counselorId) whereClause.assignedToId = counselorId

    if (startDate || endDate) {
      whereClause.createdAt = {}
      if (startDate) (whereClause.createdAt as Record<string, Date>).gte = new Date(startDate)
      if (endDate) (whereClause.createdAt as Record<string, Date>).lte = new Date(endDate)
    }

    // Fetch leads with related data
    const leads = await prisma.leads.findMany({
      where: whereClause,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        users: {
          select: { name: true, email: true },
        },
        demo_bookings: {
          select: { demoCompleted: true },
        },
        _count: {
          select: {
            crm_communications: true,
            tasks: true,
          },
        },
      },
    })

    // Transform to export format
    const exportData: ExportLead[] = leads.map((lead) => ({
      id: lead.id,
      studentName: lead.studentName,
      email: lead.email,
      phone: lead.phone,
      courseInterest: lead.courseInterest,
      stage: lead.stage,
      priority: lead.priority,
      source: lead.source,
      counselorName: lead.users?.name || null,
      counselorEmail: lead.users?.email || null,
      score: lead.score,
      createdAt: lead.createdAt.toISOString(),
      lastContactedAt: lead.lastContactedAt?.toISOString() || null,
      nextFollowUpAt: lead.nextFollowUpAt?.toISOString() || null,
      convertedAt: lead.convertedAt?.toISOString() || null,
      lostAt: lead.lostAt?.toISOString() || null,
      lostReason: lead.lostReason,
      communicationsCount: lead._count.crm_communications,
      tasksCount: lead._count.tasks,
      demoBooked: !!lead.demoBookingId,
      demoCompleted: lead.demo_bookings?.demoCompleted || false,
    }))

    // Optionally include content_leads
    let contentLeadsExport: Array<{
      id: string
      name: string | null
      email: string | null
      phone: string
      source: string | null
      captureType: string
      engagementScore: number | null
      articleSlug: string | null
      createdAt: string
    }> = []

    if (includeContent) {
      const contentLeads = await prisma.content_leads.findMany({
        where: startDate || endDate
          ? {
              createdAt: {
                ...(startDate && { gte: new Date(startDate) }),
                ...(endDate && { lte: new Date(endDate) }),
              },
            }
          : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })

      contentLeadsExport = contentLeads.map((lead) => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.whatsappPhone,
        source: lead.source,
        captureType: lead.captureType,
        engagementScore: lead.engagementScore,
        articleSlug: lead.articleSlug,
        createdAt: lead.createdAt.toISOString(),
      }))
    }

    // Return based on format
    if (format === 'json') {
      return NextResponse.json({
        success: true,
        data: {
          leads: exportData,
          contentLeads: includeContent ? contentLeadsExport : undefined,
          exportedAt: new Date().toISOString(),
          totalLeads: exportData.length,
          totalContentLeads: contentLeadsExport.length,
        },
      })
    }

    // Generate CSV
    const csvRows: string[] = []

    // Headers
    const headers = [
      'ID',
      'Student Name',
      'Email',
      'Phone',
      'Course Interest',
      'Stage',
      'Priority',
      'Source',
      'Counselor Name',
      'Counselor Email',
      'Score',
      'Created At',
      'Last Contacted',
      'Next Follow-Up',
      'Converted At',
      'Lost At',
      'Lost Reason',
      'Communications',
      'Tasks',
      'Demo Booked',
      'Demo Completed',
    ]
    csvRows.push(headers.join(','))

    // Data rows
    for (const lead of exportData) {
      const row = [
        escapeCSV(lead.id),
        escapeCSV(lead.studentName),
        escapeCSV(lead.email || ''),
        escapeCSV(lead.phone),
        escapeCSV(lead.courseInterest),
        escapeCSV(lead.stage),
        escapeCSV(lead.priority),
        escapeCSV(lead.source),
        escapeCSV(lead.counselorName || ''),
        escapeCSV(lead.counselorEmail || ''),
        lead.score?.toString() || '',
        escapeCSV(lead.createdAt),
        escapeCSV(lead.lastContactedAt || ''),
        escapeCSV(lead.nextFollowUpAt || ''),
        escapeCSV(lead.convertedAt || ''),
        escapeCSV(lead.lostAt || ''),
        escapeCSV(lead.lostReason || ''),
        lead.communicationsCount.toString(),
        lead.tasksCount.toString(),
        lead.demoBooked ? 'Yes' : 'No',
        lead.demoCompleted ? 'Yes' : 'No',
      ]
      csvRows.push(row.join(','))
    }

    // Add content leads if requested
    if (includeContent && contentLeadsExport.length > 0) {
      csvRows.push('') // Empty row
      csvRows.push('CONTENT LEADS')
      csvRows.push(
        ['ID', 'Name', 'Email', 'Phone', 'Source', 'Capture Type', 'Engagement Score', 'Article', 'Created At'].join(
          ','
        )
      )

      for (const lead of contentLeadsExport) {
        const row = [
          escapeCSV(lead.id),
          escapeCSV(lead.name || ''),
          escapeCSV(lead.email || ''),
          escapeCSV(lead.phone),
          escapeCSV(lead.source || ''),
          escapeCSV(lead.captureType),
          lead.engagementScore?.toString() || '',
          escapeCSV(lead.articleSlug || ''),
          escapeCSV(lead.createdAt),
        ]
        csvRows.push(row.join(','))
      }
    }

    const csv = csvRows.join('\n')
    const filename = `leads-export-${new Date().toISOString().split('T')[0]}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting leads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export leads' },
      { status: 500 }
    )
  }
}

// Helper to escape CSV values
function escapeCSV(value: string): string {
  if (!value) return ''
  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (value.includes(',') || value.includes('\n') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

// POST: Generate export with custom columns (advanced)
async function handlePOST(
  request: NextRequest,
  session: ValidatedSession
): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { columns, filters, format = 'csv' } = body

    // Log export request for audit
    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        userId: session.userId,
        action: 'LEADS_EXPORTED',
        description: `Exported leads with filters: ${JSON.stringify(filters || {})}`,
        metadata: { columns, filters, format },
      },
    })

    // For now, redirect to GET with query params
    const queryParams = new URLSearchParams()
    if (format) queryParams.set('format', format)
    if (filters?.stage) queryParams.set('stage', filters.stage)
    if (filters?.priority) queryParams.set('priority', filters.priority)
    if (filters?.source) queryParams.set('source', filters.source)
    if (filters?.counselorId) queryParams.set('counselorId', filters.counselorId)
    if (filters?.startDate) queryParams.set('startDate', filters.startDate)
    if (filters?.endDate) queryParams.set('endDate', filters.endDate)
    if (filters?.includeContent) queryParams.set('includeContent', 'true')

    // Create internal URL and call GET
    const url = new URL(request.url)
    url.search = queryParams.toString()

    return handleGET(new NextRequest(url), session)
  } catch (error) {
    console.error('Error in export POST:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process export request' },
      { status: 500 }
    )
  }
}

export const GET = withAdmin(handleGET)
export const POST = withAdmin(handlePOST)
