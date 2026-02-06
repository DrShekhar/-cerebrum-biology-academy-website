import { NextRequest, NextResponse } from 'next/server'
import { ntaAnnouncements, type AnnouncementType } from '@/data/nta-announcements'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const type = searchParams.get('type') as AnnouncementType | null

  let filtered = [...ntaAnnouncements]

  if (type) {
    filtered = filtered.filter((a) => a.type === type)
  }

  filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const results = filtered.slice(0, limit)

  return NextResponse.json({
    success: true,
    data: results,
    total: filtered.length,
  })
}
