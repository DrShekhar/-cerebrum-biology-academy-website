/**
 * SEO Content Machine - News Monitor Cron Job
 *
 * Monitors NTA and NEET-related news feeds every 2 hours.
 * Auto-generates news articles for breaking stories.
 *
 * Vercel Cron: 0 * /2 * * * (every 2 hours)
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

// News sources to monitor
const NEWS_SOURCES = [
  {
    name: 'NTA Official',
    url: 'https://nta.ac.in/Notice',
    keywords: ['NEET', 'NTA', 'exam', 'result', 'admit card', 'registration'],
  },
  {
    name: 'Education News',
    rssUrl: 'https://news.google.com/rss/search?q=NEET+2026+exam&hl=en-IN&gl=IN&ceid=IN:en',
    keywords: ['NEET 2026', 'NEET UG', 'NTA NEET', 'medical entrance'],
  },
]

// Keywords that indicate high-priority news
const PRIORITY_KEYWORDS = [
  'result',
  'admit card',
  'date sheet',
  'exam date',
  'registration',
  'application',
  'syllabus change',
  'pattern change',
  'notice',
  'official',
  'breaking',
  'urgent',
]

interface NewsItem {
  title: string
  description?: string
  link?: string
  pubDate?: string
  source: string
}

/**
 * GET handler - for status checking
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    service: 'SEO News Monitor',
    status: 'active',
    schedule: 'Every 2 hours',
    sources: NEWS_SOURCES.map((s) => s.name),
    priorityKeywords: PRIORITY_KEYWORDS.slice(0, 5),
  })
}

/**
 * POST handler - triggered by Vercel Cron
 */
export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    logger.warn('Unauthorized cron request', { service: 'seo-news-monitor' })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    logger.info('Starting news monitor cron job', { service: 'seo-news-monitor' })

    // Check if we can generate content
    const canGenerate = await canGenerateContent('NEWS_ARTICLE')
    if (!canGenerate.allowed) {
      logger.info('Cannot generate news - limit reached', {
        service: 'seo-news-monitor',
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
      logger.info('Insufficient budget for news monitoring', {
        service: 'seo-news-monitor',
        remaining: limits.remainingBudget,
      })
      return NextResponse.json({
        success: false,
        message: `Insufficient budget: $${limits.remainingBudget.toFixed(2)} remaining`,
      })
    }

    // Fetch news from all sources
    const allNews: NewsItem[] = []

    for (const source of NEWS_SOURCES) {
      try {
        const newsItems = await fetchNewsFromSource(source)
        allNews.push(...newsItems)
      } catch (error) {
        logger.warn(`Failed to fetch from ${source.name}`, {
          service: 'seo-news-monitor',
          error: error instanceof Error ? error.message : 'Unknown',
        })
      }
    }

    if (allNews.length === 0) {
      logger.info('No news found from sources', { service: 'seo-news-monitor' })
      return NextResponse.json({
        success: true,
        message: 'No relevant news found',
        checked: NEWS_SOURCES.length,
        queued: 0,
      })
    }

    // Filter for NEET-related news
    const relevantNews = filterRelevantNews(allNews)

    if (relevantNews.length === 0) {
      logger.info('No relevant NEET news found', {
        service: 'seo-news-monitor',
        totalFound: allNews.length,
      })
      return NextResponse.json({
        success: true,
        message: 'No relevant NEET news found',
        checked: NEWS_SOURCES.length,
        totalItems: allNews.length,
        queued: 0,
      })
    }

    // Check for duplicates and add to queue
    const queuedItems: string[] = []

    for (const news of relevantNews.slice(0, 3)) {
      // Limit to 3 news items per run
      // Check if similar news already exists in queue
      const isDuplicate = await checkDuplicate(news.title)
      if (isDuplicate) {
        logger.info('Skipping duplicate news', {
          service: 'seo-news-monitor',
          title: news.title.substring(0, 50),
        })
        continue
      }

      // Determine priority based on keywords
      const isHighPriority = PRIORITY_KEYWORDS.some((keyword) =>
        news.title.toLowerCase().includes(keyword.toLowerCase())
      )

      // Add to queue
      const queueItem = await addToQueue({
        type: 'NEWS_ARTICLE',
        triggerSource: 'NEWS_FEED',
        topic: news.title,
        keywords: extractKeywords(news.title),
        sourceUrl: news.link,
        priority: isHighPriority ? 'HIGH' : 'NORMAL',
      })

      if (queueItem) {
        queuedItems.push(queueItem.id)
        logger.info('News article queued', {
          service: 'seo-news-monitor',
          queueId: queueItem.id,
          title: news.title.substring(0, 50),
          priority: isHighPriority ? 'HIGH' : 'NORMAL',
        })
      }
    }

    logger.info('News monitor completed', {
      service: 'seo-news-monitor',
      sourcesChecked: NEWS_SOURCES.length,
      totalFound: allNews.length,
      relevant: relevantNews.length,
      queued: queuedItems.length,
    })

    return NextResponse.json({
      success: true,
      message: `Queued ${queuedItems.length} news articles`,
      checked: NEWS_SOURCES.length,
      totalItems: allNews.length,
      relevantItems: relevantNews.length,
      queued: queuedItems.length,
      queueIds: queuedItems.map((id) => id.substring(0, 8)),
    })
  } catch (error) {
    logger.error('News monitor cron failed', {
      service: 'seo-news-monitor',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal error during news monitoring',
      },
      { status: 500 }
    )
  }
}

/**
 * Fetch news from a single source
 */
async function fetchNewsFromSource(source: (typeof NEWS_SOURCES)[0]): Promise<NewsItem[]> {
  const items: NewsItem[] = []

  if (source.rssUrl) {
    // Fetch RSS feed
    try {
      const response = await fetch(source.rssUrl, {
        headers: {
          'User-Agent': 'Cerebrum Biology Academy News Bot/1.0',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const xmlText = await response.text()
      const parsedItems = parseRssFeed(xmlText, source.name)
      items.push(...parsedItems)
    } catch (error) {
      logger.warn(`RSS fetch failed for ${source.name}`, {
        service: 'seo-news-monitor',
        error: error instanceof Error ? error.message : 'Unknown',
      })
    }
  }

  // For non-RSS sources, we could add web scraping later
  // For now, just return what we have

  return items
}

/**
 * Parse RSS feed XML to news items
 */
function parseRssFeed(xml: string, sourceName: string): NewsItem[] {
  const items: NewsItem[] = []

  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  const titleRegex = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/
  const descRegex = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/
  const linkRegex = /<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/
  const dateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/

  let match
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]

    const titleMatch = titleRegex.exec(itemXml)
    const descMatch = descRegex.exec(itemXml)
    const linkMatch = linkRegex.exec(itemXml)
    const dateMatch = dateRegex.exec(itemXml)

    if (titleMatch) {
      items.push({
        title: decodeHtmlEntities(titleMatch[1].trim()),
        description: descMatch ? decodeHtmlEntities(descMatch[1].trim()) : undefined,
        link: linkMatch ? linkMatch[1].trim() : undefined,
        pubDate: dateMatch ? dateMatch[1].trim() : undefined,
        source: sourceName,
      })
    }
  }

  return items
}

/**
 * Filter news for NEET relevance
 */
function filterRelevantNews(items: NewsItem[]): NewsItem[] {
  const neetKeywords = [
    'neet',
    'nta',
    'medical entrance',
    'mbbs admission',
    'biology',
    'neet ug',
    'neet 2025',
    'neet 2026',
    'medical college',
  ]

  return items.filter((item) => {
    const text = `${item.title} ${item.description || ''}`.toLowerCase()
    return neetKeywords.some((keyword) => text.includes(keyword))
  })
}

/**
 * Check if similar news already exists in queue
 */
async function checkDuplicate(title: string): Promise<boolean> {
  // Normalize title for comparison
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '')

  // Check recent queue items (last 7 days)
  const recentItems = await prisma.content_generation_queue.findMany({
    where: {
      type: 'NEWS_ARTICLE',
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      topic: true,
    },
  })

  // Check for similar titles (simple similarity)
  for (const item of recentItems) {
    const existingNormalized = item.topic.toLowerCase().replace(/[^a-z0-9]/g, '')

    // If titles share significant overlap, consider duplicate
    if (existingNormalized === normalizedTitle) return true

    // Check for 70% similarity
    const similarity = calculateSimilarity(normalizedTitle, existingNormalized)
    if (similarity > 0.7) return true
  }

  return false
}

/**
 * Calculate simple string similarity
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const matchCount = shorter.split('').filter((char, i) => longer[i] === char).length

  return matchCount / longer.length
}

/**
 * Extract keywords from title
 */
function extractKeywords(title: string): string[] {
  const stopWords = [
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did',
    'will',
    'would',
    'could',
    'should',
    'may',
    'might',
    'must',
    'shall',
    'can',
    'this',
    'that',
    'these',
    'those',
    'what',
    'which',
    'who',
    'whom',
  ]

  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.includes(word))

  // Keep unique words and limit to 5
  return [...new Set(words)].slice(0, 5)
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}
