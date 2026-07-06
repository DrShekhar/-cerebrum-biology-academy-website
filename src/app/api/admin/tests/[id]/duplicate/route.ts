import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { mapTemplate } from '../../mapper'

export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const source = await prisma.test_templates.findUnique({ where: { id } })
    if (!source) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    const newId = randomUUID()
    const copy = await prisma.test_templates.create({
      data: {
        ...source,
        id: newId,
        title: `${source.title} (copy)`,
        slug: `${source.slug}-copy-${newId.slice(0, 8)}`,
        // A fresh copy starts as an unpublished draft with clean stats
        isPublished: false,
        publishedAt: null,
        attemptCount: 0,
        averageScore: null,
        averageTime: null,
        popularityScore: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ test: mapTemplate({ ...copy, _count: { test_sessions: 0 } }) })
  } catch (error) {
    console.error('[admin/tests/duplicate] failed:', error)
    return NextResponse.json({ error: 'Failed to duplicate test' }, { status: 500 })
  }
}
