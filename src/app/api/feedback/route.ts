import { NextRequest, NextResponse } from 'next/server'
import { FeedbackData, FeedbackAnalyzer } from '../../../lib/feedback/feedbackCollection'

// In-memory storage for demo purposes
// In production, use a proper database like PostgreSQL with proper schema
let feedbackData: FeedbackData[] = []

export async function POST(request: NextRequest) {
  try {
    const feedback: FeedbackData = await request.json()

    // Validate required fields
    if (!feedback.userId || !feedback.feedbackType || !feedback.data) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, feedbackType, and data are required' },
        { status: 400 }
      )
    }

    // Add timestamp if not provided
    if (!feedback.timestamp) {
      feedback.timestamp = Date.now()
    }

    // Generate ID if not provided
    if (!feedback.id) {
      feedback.id = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    // Store the feedback
    feedbackData.push(feedback)

    // Keep only last 20,000 feedback entries to prevent memory issues
    if (feedbackData.length > 20000) {
      feedbackData = feedbackData.slice(-20000)
    }

    // Send to external services
    await sendToExternalServices(feedback)

    // Trigger alerts for critical feedback
    await handleCriticalFeedback(feedback)

    return NextResponse.json({
      success: true,
      feedbackId: feedback.id,
      message: 'Feedback received successfully',
    })
  } catch (error) {
    console.error('Error storing feedback:', error)
    return NextResponse.json({ error: 'Failed to store feedback' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Query parameters
    const userId = searchParams.get('userId')
    const feedbackType = searchParams.get('feedbackType')
    const step = searchParams.get('step')
    const timeframe = searchParams.get('timeframe') || '7d'
    const limit = parseInt(searchParams.get('limit') || '100')
    const analyze = searchParams.get('analyze') === 'true'
    const format = searchParams.get('format') || 'json'

    // Calculate time range
    const now = Date.now()
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
    }
    const timeRange = timeRanges[timeframe as keyof typeof timeRanges] || timeRanges['7d']
    const fromTime = now - timeRange

    // Filter feedback data
    let filteredData = feedbackData.filter((feedback) => feedback.timestamp >= fromTime)

    if (userId) {
      filteredData = filteredData.filter((feedback) => feedback.userId === userId)
    }

    if (feedbackType) {
      filteredData = filteredData.filter((feedback) => feedback.feedbackType === feedbackType)
    }

    if (step) {
      filteredData = filteredData.filter((feedback) => feedback.context.step?.toString() === step)
    }

    // Sort by timestamp (newest first)
    filteredData.sort((a, b) => b.timestamp - a.timestamp)

    // Apply limit
    filteredData = filteredData.slice(0, limit)

    // Return analysis if requested
    if (analyze) {
      const analysis = FeedbackAnalyzer.analyzeFeedbackData(filteredData)
      return NextResponse.json({
        analysis,
        totalFeedback: filteredData.length,
        filters: { userId, feedbackType, step, timeframe },
        generatedAt: new Date().toISOString(),
      })
    }

    // Return different formats
    switch (format) {
      case 'csv':
        const csv = convertToCSV(filteredData)
        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="feedback-data.csv"',
          },
        })

      case 'summary':
        const summary = generateSummary(filteredData)
        return NextResponse.json(summary)

      default:
        return NextResponse.json({
          feedback: filteredData,
          totalCount: filteredData.length,
          filters: { userId, feedbackType, step, timeframe },
          generatedAt: new Date().toISOString(),
        })
    }
  } catch (error) {
    console.error('Error retrieving feedback:', error)
    return NextResponse.json({ error: 'Failed to retrieve feedback' }, { status: 500 })
  }
}

async function sendToExternalServices(feedback: FeedbackData): Promise<void> {
  try {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag
      gtag('event', 'feedback_submitted', {
        event_category: 'User Feedback',
        event_label: feedback.feedbackType,
        custom_parameters: {
          user_id: feedback.userId,
          step: feedback.context.step,
          feedback_type: feedback.feedbackType,
        },
      })
    }

    // Send to Slack (for critical feedback)
    if (isCriticalFeedback(feedback) && process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 Critical Feedback Alert`,
          attachments: [
            {
              color: 'danger',
              fields: [
                { title: 'Type', value: feedback.feedbackType, short: true },
                { title: 'User', value: feedback.userId, short: true },
                { title: 'Step', value: feedback.context.step?.toString() || 'N/A', short: true },
                { title: 'Details', value: JSON.stringify(feedback.data), short: false },
              ],
            },
          ],
        }),
      })
    }

    // Send to customer support system (if configured)
    if (feedback.feedbackType === 'bug_report' && process.env.SUPPORT_API_URL) {
      await fetch(process.env.SUPPORT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPPORT_API_KEY}`,
        },
        body: JSON.stringify({
          title: 'Bug Report from Course Selector',
          description: feedback.data.comment || 'No description provided',
          user_id: feedback.userId,
          metadata: feedback,
        }),
      })
    }
  } catch (error) {
    console.warn('Failed to send feedback to external services:', error)
  }
}

async function handleCriticalFeedback(feedback: FeedbackData): Promise<void> {
  if (!isCriticalFeedback(feedback)) return

  try {
    // Log critical feedback for immediate attention
    console.error('CRITICAL FEEDBACK RECEIVED:', {
      feedbackId: feedback.id,
      userId: feedback.userId,
      type: feedback.feedbackType,
      step: feedback.context.step,
      data: feedback.data,
      timestamp: new Date(feedback.timestamp).toISOString(),
    })

    // Send email alert (if configured)
    if (process.env.ALERT_EMAIL && process.env.EMAIL_API_URL) {
      await fetch(process.env.EMAIL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.ALERT_EMAIL,
          subject: 'Critical Feedback Alert - Course Selector',
          html: generateCriticalFeedbackEmail(feedback),
        }),
      })
    }
  } catch (error) {
    console.error('Failed to handle critical feedback:', error)
  }
}

function isCriticalFeedback(feedback: FeedbackData): boolean {
  // Determine if feedback requires immediate attention
  if (feedback.feedbackType === 'bug_report') return true

  // Low ratings (1-2 on any scale)
  if (feedback.data.responses) {
    const ratings = Object.values(feedback.data.responses).filter(
      (value): value is number => typeof value === 'number'
    )
    if (ratings.some((rating) => rating <= 2)) return true
  }

  // Specific rating fields
  if (feedback.data.rating && feedback.data.rating <= 2) return true
  if (feedback.data.nps_score !== undefined && feedback.data.nps_score <= 3) return true

  // Negative keywords in text responses
  const negativeKeywords = [
    'terrible',
    'awful',
    'broken',
    'unusable',
    'hate',
    'worst',
    'crash',
    'error',
  ]
  const textResponses = Object.values(feedback.data.responses || {})
    .filter((value): value is string => typeof value === 'string')
    .concat(feedback.data.comment || '')

  return textResponses.some((text) =>
    negativeKeywords.some((keyword) => text.toLowerCase().includes(keyword))
  )
}

function convertToCSV(data: FeedbackData[]): string {
  if (data.length === 0) return ''

  const headers = [
    'id',
    'userId',
    'sessionId',
    'timestamp',
    'feedbackType',
    'step',
    'stepName',
    'page',
    'data',
    'responses',
  ]

  const rows = data.map((feedback) => [
    feedback.id,
    feedback.userId,
    feedback.sessionId,
    new Date(feedback.timestamp).toISOString(),
    feedback.feedbackType,
    feedback.context.step || '',
    feedback.context.stepName || '',
    feedback.context.page,
    JSON.stringify(feedback.data),
    JSON.stringify(feedback.data.responses || {}),
  ])

  return [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n')
}

function generateSummary(data: FeedbackData[]): any {
  const totalFeedback = data.length
  const uniqueUsers = new Set(data.map((f) => f.userId)).size

  // Feedback type distribution
  const typeDistribution = data.reduce(
    (acc, feedback) => {
      acc[feedback.feedbackType] = (acc[feedback.feedbackType] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Step distribution
  const stepDistribution = data.reduce(
    (acc, feedback) => {
      const step = feedback.context.step?.toString() || 'unknown'
      acc[step] = (acc[step] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Average ratings
  const ratings: number[] = []
  data.forEach((feedback) => {
    if (feedback.data.rating) ratings.push(feedback.data.rating)
    if (feedback.data.responses) {
      Object.values(feedback.data.responses).forEach((value) => {
        if (typeof value === 'number' && value >= 1 && value <= 10) {
          ratings.push(value)
        }
      })
    }
  })

  const avgRating =
    ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : null

  // Recent feedback trends (last 24 hours vs previous 24 hours)
  const now = Date.now()
  const last24h = data.filter((f) => f.timestamp > now - 24 * 60 * 60 * 1000).length
  const previous24h = data.filter(
    (f) => f.timestamp > now - 48 * 60 * 60 * 1000 && f.timestamp <= now - 24 * 60 * 60 * 1000
  ).length

  return {
    overview: {
      totalFeedback,
      uniqueUsers,
      avgRating: avgRating ? Number(avgRating.toFixed(2)) : null,
      responseRate: totalFeedback / Math.max(uniqueUsers, 1),
    },
    distribution: {
      byType: typeDistribution,
      byStep: stepDistribution,
    },
    trends: {
      last24Hours: last24h,
      previous24Hours: previous24h,
      change:
        previous24h > 0 ? (((last24h - previous24h) / previous24h) * 100).toFixed(1) + '%' : 'N/A',
    },
    recentFeedback: data.slice(0, 5).map((feedback) => ({
      id: feedback.id,
      type: feedback.feedbackType,
      step: feedback.context.step,
      timestamp: new Date(feedback.timestamp).toISOString(),
      summary: generateFeedbackSummary(feedback),
    })),
  }
}

function generateFeedbackSummary(feedback: FeedbackData): string {
  if (feedback.data.comment) {
    return (
      feedback.data.comment.substring(0, 100) + (feedback.data.comment.length > 100 ? '...' : '')
    )
  }

  if (feedback.data.responses) {
    const textResponses = Object.values(feedback.data.responses)
      .filter((value): value is string => typeof value === 'string')
      .join(' ')
    if (textResponses) {
      return textResponses.substring(0, 100) + (textResponses.length > 100 ? '...' : '')
    }
  }

  if (feedback.data.rating) {
    return `Rating: ${feedback.data.rating}/5`
  }

  return 'No summary available'
}

function generateCriticalFeedbackEmail(feedback: FeedbackData): string {
  return `
    <html>
      <body>
        <h2 style="color: #dc2626;">Critical Feedback Alert</h2>
        <p>A critical feedback has been received that requires immediate attention.</p>

        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Feedback ID:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${feedback.id}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">User ID:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${feedback.userId}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Type:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${feedback.feedbackType}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Step:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${feedback.context.step || 'N/A'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Timestamp:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${new Date(feedback.timestamp).toISOString()}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Details:</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${generateFeedbackSummary(feedback)}</td>
          </tr>
        </table>

        <p>Please investigate this feedback promptly and take appropriate action.</p>

        <p style="color: #6b7280; font-size: 12px;">
          This alert was generated automatically by the Course Selector feedback system.
        </p>
      </body>
    </html>
  `
}
