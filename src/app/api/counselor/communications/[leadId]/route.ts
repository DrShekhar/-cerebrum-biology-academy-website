/**
 * API Route: Communication History for Lead
 * GET /api/counselor/communications/[leadId] - Fetch all communications for a lead
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// Query parameters schema
const querySchema = z.object({
  type: z.enum(['WHATSAPP', 'EMAIL', 'CALL', 'SMS']).optional(),
  direction: z.enum(['INBOUND', 'OUTBOUND']).optional(),
  status: z.enum(['PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED']).optional(),
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('50'),
})

async function handleGET(req: NextRequest, session: any) {
  try {
    // Extract leadId from URL path
    const pathParts = req.nextUrl.pathname.split('/')
    const leadId = pathParts[pathParts.length - 1]

    if (!leadId || leadId === 'route') {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead ID is required',
        },
        { status: 400 }
      )
    }

    // Verify lead exists and belongs to current counselor's organization
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { id: true, studentName: true },
    })

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
        },
        { status: 404 }
      )
    }

    // Parse query parameters
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())
    const validatedQuery = querySchema.parse(searchParams)

    // Build where clause
    const where: any = {
      leadId,
    }

    if (validatedQuery.type) {
      where.type = validatedQuery.type
    }

    if (validatedQuery.direction) {
      where.direction = validatedQuery.direction
    }

    if (validatedQuery.status) {
      where.status = validatedQuery.status
    }

    // Calculate pagination
    const page = parseInt(validatedQuery.page)
    const limit = parseInt(validatedQuery.limit)
    const skip = (page - 1) * limit

    // Fetch communications with pagination
    const [communications, total] = await Promise.all([
      prisma.communication.findMany({
        where,
        include: {
          sentBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          sentAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.communication.count({ where }),
    ])

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit)
    const hasMore = page < totalPages

    return NextResponse.json({
      success: true,
      data: communications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
      },
      lead: {
        id: lead.id,
        studentName: lead.studentName,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error fetching communication history:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch communication history',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
