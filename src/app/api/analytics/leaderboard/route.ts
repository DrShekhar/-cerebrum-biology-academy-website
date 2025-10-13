import { NextRequest, NextResponse } from 'next/server'
import { leaderboardService } from '@/lib/analytics/leaderboardService'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') as 'global' | 'grade' | 'subject' | 'topic' || 'global'
    const period = searchParams.get('period') as 'daily' | 'weekly' | 'monthly' | 'allTime' || 'weekly'
    const filter = searchParams.get('filter') // for grade, subject, or topic
    const limit = parseInt(searchParams.get('limit') || '50')
    const userId = searchParams.get('userId')

    let leaderboard

    switch (type) {
      case 'global':
        leaderboard = await leaderboardService.getGlobalLeaderboard(period, limit)
        break
      case 'grade':
        if (!filter) {
          return NextResponse.json({ error: 'Grade filter is required' }, { status: 400 })
        }
        leaderboard = await leaderboardService.getGradeLeaderboard(filter, period, limit)
        break
      case 'subject':
        if (!filter) {
          return NextResponse.json({ error: 'Subject filter is required' }, { status: 400 })
        }
        leaderboard = await leaderboardService.getSubjectLeaderboard(filter, period, limit)
        break
      case 'topic':
        if (!filter) {
          return NextResponse.json({ error: 'Topic filter is required' }, { status: 400 })
        }
        leaderboard = await leaderboardService.getTopicLeaderboard(filter, period, limit)
        break
      default:
        return NextResponse.json({ error: 'Invalid leaderboard type' }, { status: 400 })
    }

    // Enrich leaderboard with achievements and streaks
    const enrichedLeaderboard = await leaderboardService.enrichLeaderboard(leaderboard)

    // Add user position if userId is provided
    if (userId) {
      const userPosition = await leaderboardService.getUserPosition(userId, type, period, filter)
      enrichedLeaderboard.userPosition = userPosition
    }

    return NextResponse.json({
      success: true,
      data: enrichedLeaderboard
    })

  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}