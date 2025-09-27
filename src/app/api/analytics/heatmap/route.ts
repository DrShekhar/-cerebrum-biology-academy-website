import { NextRequest, NextResponse } from 'next/server'
import { HeatmapDataPoint } from '../../../../lib/heatmap/heatmapTracking'

// In-memory storage for demo purposes
// In production, use a proper database with proper indexing for spatial queries
let heatmapData: HeatmapDataPoint[] = []

export async function POST(request: NextRequest) {
  try {
    const dataPoint: HeatmapDataPoint = await request.json()

    // Validate required fields
    if (
      !dataPoint.userId ||
      !dataPoint.sessionId ||
      !dataPoint.eventType ||
      !dataPoint.coordinates
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Add timestamp if not provided
    if (!dataPoint.timestamp) {
      dataPoint.timestamp = Date.now()
    }

    // Store the data point
    heatmapData.push(dataPoint)

    // Keep only last 50,000 data points to prevent memory issues
    if (heatmapData.length > 50000) {
      heatmapData = heatmapData.slice(-50000)
    }

    // Optional: Send to external analytics service
    await sendToExternalAnalytics(dataPoint)

    return NextResponse.json({
      success: true,
      dataPointId: dataPoint.id,
    })
  } catch (error) {
    console.error('Error storing heatmap data:', error)
    return NextResponse.json({ error: 'Failed to store heatmap data' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Query parameters
    const userId = searchParams.get('userId')
    const sessionId = searchParams.get('sessionId')
    const eventType = searchParams.get('eventType')
    const page = searchParams.get('page')
    const elementId = searchParams.get('elementId')
    const timeframe = searchParams.get('timeframe') || '24h'
    const limit = parseInt(searchParams.get('limit') || '1000')
    const format = searchParams.get('format') || 'json' // json, csv, analysis

    // Calculate time range
    const now = Date.now()
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }
    const timeRange = timeRanges[timeframe as keyof typeof timeRanges] || timeRanges['24h']
    const fromTime = now - timeRange

    // Filter data
    let filteredData = heatmapData.filter((point) => point.timestamp >= fromTime)

    if (userId) {
      filteredData = filteredData.filter((point) => point.userId === userId)
    }

    if (sessionId) {
      filteredData = filteredData.filter((point) => point.sessionId === sessionId)
    }

    if (eventType) {
      filteredData = filteredData.filter((point) => point.eventType === eventType)
    }

    if (page) {
      filteredData = filteredData.filter((point) => point.page.url.includes(page))
    }

    if (elementId) {
      filteredData = filteredData.filter(
        (point) =>
          point.elementId === elementId ||
          point.xpath.includes(elementId) ||
          point.elementClass?.includes(elementId)
      )
    }

    // Apply limit
    filteredData = filteredData.slice(0, limit)

    // Return different formats
    switch (format) {
      case 'csv':
        const csv = convertToCSV(filteredData)
        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="heatmap-data.csv"',
          },
        })

      case 'analysis':
        const analysis = generateAnalysis(filteredData)
        return NextResponse.json(analysis)

      default:
        return NextResponse.json({
          data: filteredData,
          totalCount: filteredData.length,
          filters: { userId, sessionId, eventType, page, elementId, timeframe },
          generatedAt: new Date().toISOString(),
        })
    }
  } catch (error) {
    console.error('Error retrieving heatmap data:', error)
    return NextResponse.json({ error: 'Failed to retrieve heatmap data' }, { status: 500 })
  }
}

async function sendToExternalAnalytics(dataPoint: HeatmapDataPoint): Promise<void> {
  // Example integrations with external services
  try {
    // Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'heatmap_interaction', {
        event_category: 'User Behavior',
        event_label: dataPoint.eventType,
        custom_parameters: {
          element_id: dataPoint.elementId,
          element_tag: dataPoint.elementTag,
          page_url: dataPoint.page.url,
          coordinates: `${dataPoint.coordinates.x},${dataPoint.coordinates.y}`,
        },
      })
    }

    // Send to Hotjar (if configured)
    if (process.env.HOTJAR_ENABLED === 'true') {
      // Hotjar integration would go here
    }

    // Send to Microsoft Clarity (if configured)
    if (process.env.CLARITY_ENABLED === 'true') {
      // Clarity integration would go here
    }
  } catch (error) {
    console.warn('Failed to send to external analytics:', error)
  }
}

function convertToCSV(data: HeatmapDataPoint[]): string {
  if (data.length === 0) return ''

  const headers = [
    'id',
    'userId',
    'sessionId',
    'timestamp',
    'eventType',
    'elementId',
    'elementClass',
    'elementTag',
    'elementText',
    'x',
    'y',
    'relativeX',
    'relativeY',
    'viewportWidth',
    'viewportHeight',
    'pageUrl',
    'pageTitle',
    'step',
  ]

  const rows = data.map((point) => [
    point.id,
    point.userId,
    point.sessionId,
    new Date(point.timestamp).toISOString(),
    point.eventType,
    point.elementId || '',
    point.elementClass || '',
    point.elementTag || '',
    point.elementText || '',
    point.coordinates.x,
    point.coordinates.y,
    point.coordinates.relativeX,
    point.coordinates.relativeY,
    point.viewport.width,
    point.viewport.height,
    point.page.url,
    point.page.title,
    point.page.step || '',
  ])

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
}

function generateAnalysis(data: HeatmapDataPoint[]) {
  const totalInteractions = data.length
  const uniqueUsers = new Set(data.map((p) => p.userId)).size
  const uniqueSessions = new Set(data.map((p) => p.sessionId)).size

  // Event type distribution
  const eventTypeDistribution = data.reduce(
    (acc, point) => {
      acc[point.eventType] = (acc[point.eventType] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Most interacted elements
  const elementInteractions = data.reduce(
    (acc, point) => {
      const key = point.elementId || point.elementClass || point.elementTag || 'unknown'
      if (!acc[key]) {
        acc[key] = {
          count: 0,
          elementId: point.elementId,
          elementClass: point.elementClass,
          elementTag: point.elementTag,
          elementText: point.elementText,
        }
      }
      acc[key].count++
      return acc
    },
    {} as Record<string, any>
  )

  const topElements = Object.entries(elementInteractions)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 20)
    .map(([key, value]) => ({ element: key, ...value }))

  // Page interaction distribution
  const pageDistribution = data.reduce(
    (acc, point) => {
      const url = point.page.url
      acc[url] = (acc[url] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Time-based analysis
  const hourlyDistribution = data.reduce(
    (acc, point) => {
      const hour = new Date(point.timestamp).getHours()
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    },
    {} as Record<number, number>
  )

  // Click coordinates clustering (for click heatmap)
  const clickPoints = data.filter((p) => p.eventType === 'click')
  const clickClusters = clusterClickPoints(clickPoints)

  // User behavior patterns
  const userBehaviorPatterns = analyzeUserBehaviorPatterns(data)

  return {
    summary: {
      totalInteractions,
      uniqueUsers,
      uniqueSessions,
      avgInteractionsPerUser: uniqueUsers > 0 ? totalInteractions / uniqueUsers : 0,
      avgInteractionsPerSession: uniqueSessions > 0 ? totalInteractions / uniqueSessions : 0,
      timeRange: {
        start:
          data.length > 0
            ? new Date(Math.min(...data.map((p) => p.timestamp))).toISOString()
            : null,
        end:
          data.length > 0
            ? new Date(Math.max(...data.map((p) => p.timestamp))).toISOString()
            : null,
      },
    },
    eventTypeDistribution,
    topElements,
    pageDistribution,
    hourlyDistribution,
    clickClusters,
    userBehaviorPatterns,
    generatedAt: new Date().toISOString(),
  }
}

function clusterClickPoints(clickPoints: HeatmapDataPoint[]): Array<{
  x: number
  y: number
  count: number
  radius: number
}> {
  const clusters: Array<{ x: number; y: number; points: HeatmapDataPoint[] }> = []
  const CLUSTER_RADIUS = 30

  clickPoints.forEach((point) => {
    let addedToCluster = false

    for (const cluster of clusters) {
      const distance = Math.sqrt(
        Math.pow(cluster.x - point.coordinates.x, 2) + Math.pow(cluster.y - point.coordinates.y, 2)
      )

      if (distance <= CLUSTER_RADIUS) {
        cluster.points.push(point)
        // Update cluster center (weighted average)
        const totalPoints = cluster.points.length
        cluster.x = cluster.points.reduce((sum, p) => sum + p.coordinates.x, 0) / totalPoints
        cluster.y = cluster.points.reduce((sum, p) => sum + p.coordinates.y, 0) / totalPoints
        addedToCluster = true
        break
      }
    }

    if (!addedToCluster) {
      clusters.push({
        x: point.coordinates.x,
        y: point.coordinates.y,
        points: [point],
      })
    }
  })

  return clusters.map((cluster) => ({
    x: cluster.x,
    y: cluster.y,
    count: cluster.points.length,
    radius: Math.min(Math.max(cluster.points.length * 2, 10), 50),
  }))
}

function analyzeUserBehaviorPatterns(data: HeatmapDataPoint[]) {
  const userSessions = data.reduce(
    (acc, point) => {
      const key = `${point.userId}_${point.sessionId}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(point)
      return acc
    },
    {} as Record<string, HeatmapDataPoint[]>
  )

  const patterns = Object.entries(userSessions).map(([sessionKey, points]) => {
    const sortedPoints = points.sort((a, b) => a.timestamp - b.timestamp)
    const sessionDuration =
      sortedPoints.length > 1
        ? sortedPoints[sortedPoints.length - 1].timestamp - sortedPoints[0].timestamp
        : 0

    const interactionTypes = points.reduce(
      (acc, point) => {
        acc[point.eventType] = (acc[point.eventType] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    const pages = [...new Set(points.map((p) => p.page.url))]

    return {
      sessionKey,
      userId: sortedPoints[0].userId,
      sessionId: sortedPoints[0].sessionId,
      totalInteractions: points.length,
      sessionDuration,
      interactionTypes,
      pagesVisited: pages.length,
      pages,
      averageTimePerInteraction: sessionDuration / Math.max(points.length - 1, 1),
    }
  })

  // Calculate aggregate patterns
  const avgSessionDuration =
    patterns.reduce((sum, p) => sum + p.sessionDuration, 0) / patterns.length
  const avgInteractionsPerSession =
    patterns.reduce((sum, p) => sum + p.totalInteractions, 0) / patterns.length

  return {
    totalSessions: patterns.length,
    avgSessionDuration,
    avgInteractionsPerSession,
    sessions: patterns.slice(0, 100), // Return only first 100 sessions
  }
}
