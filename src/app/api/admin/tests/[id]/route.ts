import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE = archive (isActive=false), not a hard delete — attempts/sessions
// reference templates and history must survive.
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const existing = await prisma.test_templates.findUnique({
      where: { id },
      select: { id: true },
    })
    if (!existing) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    await prisma.test_templates.update({
      where: { id },
      data: { isActive: false, isPublished: false, updatedAt: new Date() },
      select: { id: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[admin/tests/[id]] DELETE failed:', error)
    return NextResponse.json({ error: 'Failed to delete test' }, { status: 500 })
  }
}
