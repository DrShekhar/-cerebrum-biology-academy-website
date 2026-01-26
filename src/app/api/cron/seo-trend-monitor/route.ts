/**
 * SEO Content Machine - Trend Monitor Cron Job
 *
 * Monitors Google Trends and other trend sources for NEET-related topics.
 * Runs 3 times daily (9 AM, 3 PM, 9 PM IST) to catch trending search queries.
 *
 * Vercel Cron: 0 9,15,21 * * * (3x daily)
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/utils/logger'
import {
  addToQueue,
  canGenerateContent,
  getOrCreateMonthlyLimits,
} from '@/lib/seo-marketing/queueService'
import { prisma } from '@/lib/prisma'

// CRON secret for Vercel
const CRON_SECRET = process.env.CRON_SECRET

// Base NEET-related topics to monitor
const NEET_SEED_TOPICS = [
  'neet 2026',
  'neet biology',
  'neet preparation',
  'neet syllabus',
  'neet cutoff',
  'neet result',
  'neet counselling',
  'medical entrance exam',
  'nta neet',
  'neet admit card',
]

// Topics that indicate high-value SEO opportunities
const HIGH_VALUE_PATTERNS = [
  /neet.*20\d{2}/i, // NEET year-specific
  /neet.*(result|cutoff|counselling|admit)/i, // Action topics
  /neet.*(chapter|topic|syllabus)/i, // Study topics
  /(class 11|class 12).*(biology|neet)/i, // Class-specific
  /neet.*(rank|score|marks)/i, // Performance topics
  /mbbs.*(admission|seat|college)/i, // Admission topics
]

// Seasonal topics based on NEET calendar
const SEASONAL_TOPICS: Record<number, string[]> = {
  // October-December: Registration and preparation
  10: ['neet 2026 registration', 'neet preparation tips', 'neet biology study plan'],
  11: ['neet application form', 'neet important chapters', 'neet biology weightage'],
  12: ['neet revision strategy', 'neet mock tests', 'neet biology previous year questions'],
  // January-March: Intensive preparation
  1: ['neet last 3 months preparation', 'neet crash course', 'neet biology important diagrams'],
  2: ['neet admit card', 'neet exam center', 'neet biology quick revision'],
  3: ['neet exam day tips', 'neet biology last minute revision', 'neet answer key'],
  // April-May: Exam time
  4: ['neet exam date', 'neet exam pattern', 'neet biology expected questions'],
  5: ['neet 2026 result date', 'neet expected cutoff', 'neet rank predictor'],
  // June-September: Results and counselling
  6: ['neet result analysis', 'neet cutoff 2026', 'neet counselling dates'],
  7: ['neet counselling process', 'neet college prediction', 'mbbs admission 2026'],
  8: ['neet mop up round', 'neet state counselling', 'medical college ranking'],
  9: ['neet 2027 preparation', 'neet dropper strategy', 'neet repeater tips'],
}

interface TrendItem {
  topic: string
  keywords: string[]
  trendScore: number
  source: string
}

/**
 * GET handler - for status checking
 */
export async function GET(request: NextRequest) {
  const currentMonth = new Date().getMonth() + 1
  const seasonalTopics = SEASONAL_TOPICS[currentMonth] || []

  return NextResponse.json({
    service: 'SEO Trend Monitor',
    status: 'active',
    schedule: '9 AM, 3 PM, 9 PM IST (3x daily)',
    currentMonth,
    seasonalTopics,
    seedTopics: NEET_SEED_TOPICS.slice(0, 5),
  })
}

/**
 * POST handler - triggered by Vercel Cron
 */
export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    logger.warn('Unauthorized cron request', { service: 'seo-trend-monitor' })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    logger.info('Starting trend monitor cron job', { service: 'seo-trend-monitor' })

    // Check if we can generate content
    const canGenerate = await canGenerateContent('BLOG_POST')
    if (!canGenerate.allowed) {
      logger.info('Cannot generate from trends - limit reached', {
        service: 'seo-trend-monitor',
        reason: canGenerate.reason,
      })
      return NextResponse.json({
        success: false,
        message: canGenerate.reason,
      })
    }

    // Check remaining budget
    const limits = await getOrCreateMonthlyLimits()
    if (limits.remainingBudget < 0.05) {
      logger.info('Insufficient budget for trend monitoring', {
        service: 'seo-trend-monitor',
        remaining: limits.remainingBudget,
      })
      return NextResponse.json({
        success: false,
        message: `Insufficient budget: $${limits.remainingBudget.toFixed(2)} remaining`,
      })
    }

    // Get trending topics from various sources
    const trendingTopics: TrendItem[] = []

    // 1. Add seasonal topics based on current month
    const currentMonth = new Date().getMonth() + 1
    const seasonalTopics = SEASONAL_TOPICS[currentMonth] || []
    for (const topic of seasonalTopics) {
      trendingTopics.push({
        topic,
        keywords: topic.split(' ').filter((w) => w.length > 2),
        trendScore: 80, // High base score for seasonal topics
        source: 'seasonal_calendar',
      })
    }

    // 2. Try to fetch Google Trends data (fallback to static if unavailable)
    try {
      const googleTrends = await fetchGoogleTrendsRelated()
      trendingTopics.push(...googleTrends)
    } catch (error) {
      logger.warn('Google Trends fetch failed, using fallback', {
        service: 'seo-trend-monitor',
        error: error instanceof Error ? error.message : 'Unknown',
      })
    }

    // 3. Add dynamically generated topics based on patterns
    const dynamicTopics = generateDynamicTopics()
    trendingTopics.push(...dynamicTopics)

    if (trendingTopics.length === 0) {
      logger.info('No trending topics found', { service: 'seo-trend-monitor' })
      return NextResponse.json({
        success: true,
        message: 'No trending topics to process',
        queued: 0,
      })
    }

    // Sort by trend score and deduplicate
    const sortedTopics = [
      ...new Map(trendingTopics.map((t) => [t.topic.toLowerCase(), t])).values(),
    ]
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, 10) // Top 10 topics

    // Check for duplicates and queue content
    const queuedItems: string[] = []

    for (const trend of sortedTopics) {
      // Check if already covered recently
      const isDuplicate = await checkRecentlyCovered(trend.topic)
      if (isDuplicate) {
        logger.info('Topic recently covered, skipping', {
          service: 'seo-trend-monitor',
          topic: trend.topic,
        })
        continue
      }

      // Check if it matches high-value patterns
      const isHighValue = HIGH_VALUE_PATTERNS.some((pattern) => pattern.test(trend.topic))

      // Add to queue
      const queueItem = await addToQueue({
        type: 'BLOG_POST',
        triggerSource: 'TREND_DETECTED',
        topic: formatTopicForBlog(trend.topic),
        keywords: trend.keywords,
        priority: isHighValue ? 'HIGH' : 'NORMAL',
      })

      if (queueItem) {
        queuedItems.push(queueItem.id)
        logger.info('Trend topic queued', {
          service: 'seo-trend-monitor',
          queueId: queueItem.id,
          topic: trend.topic,
          score: trend.trendScore,
          source: trend.source,
        })

        // Limit to 2 items per run to control costs
        if (queuedItems.length >= 2) break
      }
    }

    logger.info('Trend monitor completed', {
      service: 'seo-trend-monitor',
      topicsAnalyzed: sortedTopics.length,
      queued: queuedItems.length,
    })

    return NextResponse.json({
      success: true,
      message: `Queued ${queuedItems.length} trend-based content`,
      topicsAnalyzed: sortedTopics.length,
      queued: queuedItems.length,
      queueIds: queuedItems.map((id) => id.substring(0, 8)),
      topTrends: sortedTopics.slice(0, 5).map((t) => ({
        topic: t.topic,
        score: t.trendScore,
        source: t.source,
      })),
    })
  } catch (error) {
    logger.error('Trend monitor cron failed', {
      service: 'seo-trend-monitor',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal error during trend monitoring',
      },
      { status: 500 }
    )
  }
}

/**
 * Fetch related trends from Google Trends API
 * Note: This is a simplified version - full implementation would use actual API
 */
async function fetchGoogleTrendsRelated(): Promise<TrendItem[]> {
  const trends: TrendItem[] = []

  // Try to fetch trending searches from Google Trends
  // This uses the public trending page which may be rate-limited
  try {
    const response = await fetch(
      'https://trends.google.com/trends/api/dailytrends?hl=en-IN&tz=-330&geo=IN',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CerebrumBot/1.0)',
        },
        next: { revalidate: 3600 },
      }
    )

    if (response.ok) {
      const text = await response.text()
      // Google returns JSONP-like response, need to clean it
      const jsonStr = text.replace(/^\)\]\}',\s*/, '')

      try {
        const data = JSON.parse(jsonStr)
        const trendingSearches = data?.default?.trendingSearchesDays?.[0]?.trendingSearches || []

        for (const search of trendingSearches) {
          const title = search?.title?.query || ''
          // Only include NEET-related trends
          if (isNeetRelated(title)) {
            trends.push({
              topic: title.toLowerCase(),
              keywords: title.toLowerCase().split(' '),
              trendScore: parseInt(search?.formattedTraffic?.replace(/[^0-9]/g, '') || '0') / 1000,
              source: 'google_trends',
            })
          }
        }
      } catch {
        // JSON parsing failed, use fallback
      }
    }
  } catch {
    // Fetch failed, use fallback data
  }

  return trends
}

/**
 * Generate dynamic topics based on current trends and patterns
 */
function generateDynamicTopics(): TrendItem[] {
  const topics: TrendItem[] = []
  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1

  // Time-sensitive topics
  const timeSensitiveFormats = [
    `neet ${nextYear} preparation guide`,
    `neet ${nextYear} biology syllabus`,
    `neet ${nextYear} important chapters`,
    `best books for neet ${nextYear}`,
    `neet ${nextYear} exam pattern changes`,
    `neet biology weightage ${nextYear}`,
    `neet ${nextYear} preparation strategy`,
  ]

  for (const topic of timeSensitiveFormats) {
    topics.push({
      topic,
      keywords: topic.split(' ').filter((w) => w.length > 2 && !/^\d+$/.test(w)),
      trendScore: 60,
      source: 'dynamic_generator',
    })
  }

  // Evergreen topics with high search volume
  const evergreenTopics = [
    'how to score 180 in neet biology',
    'neet biology most repeated questions',
    'ncert vs reference books for neet biology',
    'neet biology diagram questions tips',
    'neet biology important topics chapter wise',
  ]

  for (const topic of evergreenTopics) {
    topics.push({
      topic,
      keywords: topic.split(' ').filter((w) => w.length > 2),
      trendScore: 50,
      source: 'evergreen_topics',
    })
  }

  return topics
}

/**
 * Check if a topic is NEET-related
 */
function isNeetRelated(text: string): boolean {
  const neetKeywords = [
    'neet',
    'nta',
    'mbbs',
    'medical entrance',
    'biology exam',
    'medical college',
    'aiims',
    'jipmer',
  ]

  const lowerText = text.toLowerCase()
  return neetKeywords.some((keyword) => lowerText.includes(keyword))
}

/**
 * Check if topic was recently covered
 */
async function checkRecentlyCovered(topic: string): Promise<boolean> {
  const normalizedTopic = topic.toLowerCase().replace(/[^a-z0-9]/g, '')

  // Check content generated in last 30 days
  const recentItems = await prisma.content_generation_queue.findMany({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      topic: true,
    },
  })

  for (const item of recentItems) {
    const existingNormalized = item.topic.toLowerCase().replace(/[^a-z0-9]/g, '')

    // Check for high similarity
    if (existingNormalized === normalizedTopic) return true
    if (calculateTopicSimilarity(normalizedTopic, existingNormalized) > 0.7) return true
  }

  return false
}

/**
 * Calculate topic similarity
 */
function calculateTopicSimilarity(topic1: string, topic2: string): number {
  const words1 = new Set(topic1.split(/\s+/))
  const words2 = new Set(topic2.split(/\s+/))

  const intersection = [...words1].filter((w) => words2.has(w)).length
  const union = new Set([...words1, ...words2]).size

  return union > 0 ? intersection / union : 0
}

/**
 * Format topic into a proper blog title
 */
function formatTopicForBlog(topic: string): string {
  // Capitalize first letter of each word
  const formatted = topic
    .split(' ')
    .map((word) => {
      // Keep certain words lowercase
      const lowercaseWords = ['for', 'in', 'on', 'the', 'and', 'or', 'of', 'to', 'a', 'an']
      if (lowercaseWords.includes(word.toLowerCase())) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')

  // Ensure first word is capitalized
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
