import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { getRateLimiter } from '@/lib/ratelimit/config'
import { getIdentifier, checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit/middleware'

// SECURITY: Strict input validation schema
const searchParamsSchema = z.object({
  q: z.string().max(200).optional().default(''),
  category: z
    .enum([
      'CELL_BIOLOGY',
      'MOLECULAR_BIOLOGY',
      'GENETICS',
      'HUMAN_PHYSIOLOGY',
      'PLANT_PHYSIOLOGY',
      'REPRODUCTION',
      'ECOLOGY',
      'EVOLUTION',
      'BIOTECHNOLOGY',
      'MICROORGANISMS',
    ])
    .optional(),
  class: z.coerce.number().int().min(11).max(12).optional(),
  chapter: z.coerce.number().int().min(1).max(30).optional(),
  source: z
    .enum([
      'WIKIMEDIA',
      'BIOICONS',
      'SERVIER',
      'PHYLOPIC',
      'AI_GENERATED',
      'BIORENDER',
      'CUSTOM_UPLOAD',
      'NCERT_REFERENCE',
    ])
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  offset: z.coerce.number().int().min(0).max(10000).optional().default(0),
})

export async function GET(request: NextRequest) {
  try {
    // SECURITY: Rate limit to prevent abuse
    const identifier = getIdentifier(request)
    const limiter = getRateLimiter('publicSearch')
    const rateLimitResult = await checkRateLimit(limiter, identifier)
    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult)
    }

    const { searchParams } = new URL(request.url)

    // SECURITY: Validate and sanitize all input parameters
    const parseResult = searchParamsSchema.safeParse({
      q: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      class: searchParams.get('class') || undefined,
      chapter: searchParams.get('chapter') || undefined,
      source: searchParams.get('source') || undefined,
      limit: searchParams.get('limit') || undefined,
      offset: searchParams.get('offset') || undefined,
    })

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid parameters',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { q: query, category, class: ncertClass, chapter: ncertChapter, source, limit, offset } = parseResult.data

    const where: any = {
      isActive: true,
    }

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query.toLowerCase() } },
        { keywords: { has: query.toLowerCase() } },
        { ncertFigureTitle: { contains: query, mode: 'insensitive' } },
        { ncertChapterName: { contains: query, mode: 'insensitive' } },
        { subcategory: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (category) where.category = category
    if (ncertClass) where.ncertClass = ncertClass
    if (ncertChapter) where.ncertChapter = ncertChapter
    if (source) where.source = source

    const [diagrams, total] = await Promise.all([
      prisma.diagram_assets.findMany({
        where,
        orderBy: [{ qualityScore: 'desc' }, { usageCount: 'desc' }],
        take: limit,
        skip: offset,
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          subcategory: true,
          source: true,
          license: true,
          thumbnailUrl: true,
          fileUrl: true,
          qualityScore: true,
          isVerified: true,
          ncertClass: true,
          ncertChapter: true,
          ncertChapterName: true,
          ncertFigureNo: true,
          ncertFigureTitle: true,
          tags: true,
          usageCount: true,
          labeledParts: true,
        },
      }),
      prisma.diagram_assets.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        diagrams,
        pagination: { total, limit, offset, hasMore: offset + limit < total },
      },
    })
  } catch (error) {
    console.error('Diagram search error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search diagrams' },
      { status: 500 }
    )
  }
}
