import { NextRequest, NextResponse } from 'next/server'
import { performanceAnalytics } from '@/lib/analytics/performanceService'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const grade = searchParams.get('grade')

    if (!userId || !grade) {
      return NextResponse.json({ error: 'User ID and grade are required' }, { status: 400 })
    }

    const comparativeAnalytics = await performanceAnalytics.getComparativeAnalytics(userId, grade)

    return NextResponse.json({
      success: true,
      data: comparativeAnalytics,
    })
  } catch (error) {
    console.error('Error fetching comparative analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch comparative analytics' }, { status: 500 })
  }
}
