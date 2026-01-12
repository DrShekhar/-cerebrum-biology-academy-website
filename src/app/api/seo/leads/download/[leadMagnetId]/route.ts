import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { leadMagnetId: string } }) {
  try {
    const { leadMagnetId } = params
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 })
    }

    const lead = await prisma.content_leads.findUnique({
      where: { id: leadId },
      select: { id: true, leadMagnetId: true },
    })

    if (!lead || lead.leadMagnetId !== leadMagnetId) {
      return NextResponse.json({ error: 'Invalid lead or download link' }, { status: 403 })
    }

    const leadMagnet = await prisma.lead_magnets.findUnique({
      where: { id: leadMagnetId },
      select: { id: true, title: true, fileUrl: true, fileType: true },
    })

    if (!leadMagnet) {
      return NextResponse.json({ error: 'Lead magnet not found' }, { status: 404 })
    }

    if (!leadMagnet.fileUrl) {
      return NextResponse.json(
        { error: 'Download file not available yet. Please check your email.' },
        { status: 404 }
      )
    }

    return NextResponse.redirect(leadMagnet.fileUrl)
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Failed to process download' }, { status: 500 })
  }
}
