/**
 * SEO Content Machine - Scheduled Blog Generator
 *
 * Runs on Monday and Thursday at 6 AM IST to generate educational blog posts.
 * Auto-adds to queue for generation and approval workflow.
 *
 * Vercel Cron: 0 6 * * 1,4 (Mon/Thu 6AM)
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/utils/logger'
import { addToQueue, canGenerateContent, getOrCreateMonthlyLimits } from '@/lib/seo-marketing/queueService'

// CRON secret for Vercel
const CRON_SECRET = process.env.CRON_SECRET

// Pre-defined blog topics for scheduled generation
const SCHEDULED_BLOG_TOPICS = [
  // NEET Preparation Topics
  {
    topic: 'How to Create an Effective NEET Biology Study Schedule',
    keywords: ['neet study plan', 'biology study schedule', 'neet preparation'],
  },
  {
    topic: 'Top 10 High-Yield Biology Chapters for NEET',
    keywords: ['neet biology chapters', 'high weightage topics', 'neet syllabus'],
  },
  {
    topic: 'Common Mistakes to Avoid in NEET Biology',
    keywords: ['neet mistakes', 'biology exam tips', 'neet preparation tips'],
  },
  {
    topic: 'NEET Biology: Diagram Questions and How to Master Them',
    keywords: ['neet diagrams', 'biology diagrams', 'labeling questions'],
  },
  {
    topic: 'NCERT vs Reference Books for NEET Biology',
    keywords: ['ncert biology', 'neet books', 'reference books neet'],
  },
  // Chapter-specific Topics
  {
    topic: 'Cell Biology: Complete NEET Preparation Guide',
    keywords: ['cell biology neet', 'cell structure', 'cytoplasm neet'],
  },
  {
    topic: 'Genetics and Evolution: Key Concepts for NEET',
    keywords: ['genetics neet', 'evolution neet', 'heredity'],
  },
  {
    topic: 'Human Physiology: Digestive System NEET Guide',
    keywords: ['digestive system', 'human physiology neet', 'digestion neet'],
  },
  {
    topic: 'Plant Physiology: Photosynthesis and Respiration for NEET',
    keywords: ['photosynthesis neet', 'plant physiology', 'respiration plants'],
  },
  {
    topic: 'Ecology and Environment: NEET Preparation Tips',
    keywords: ['ecology neet', 'environment biology', 'ecosystem neet'],
  },
  // Study Tips
  {
    topic: 'How to Revise Biology in the Last 3 Months Before NEET',
    keywords: ['neet revision', 'last minute tips', 'biology revision'],
  },
  {
    topic: 'Memory Techniques for Biology: Mnemonics and Tricks',
    keywords: ['biology mnemonics', 'memory techniques', 'neet tricks'],
  },
  {
    topic: 'How to Solve NEET Biology MCQs Faster',
    keywords: ['neet mcq tips', 'solve mcq faster', 'biology mcq'],
  },
  {
    topic: 'NEET Biology Previous Year Questions Analysis',
    keywords: ['neet pyq', 'previous year questions', 'biology pyq analysis'],
  },
  {
    topic: 'Online vs Offline Coaching for NEET Biology',
    keywords: ['neet coaching', 'online coaching', 'biology tuition'],
  },
]

/**
 * GET handler - for manual testing
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    service: 'SEO Scheduled Blogs',
    status: 'active',
    schedule: 'Monday and Thursday at 6 AM IST',
    endpoint: 'POST with CRON_SECRET to trigger',
  })
}

/**
 * POST handler - triggered by Vercel Cron
 */
export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    logger.warn('Unauthorized cron request', { service: 'seo-scheduled-blogs' })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    logger.info('Starting scheduled blog generation', { service: 'seo-scheduled-blogs' })

    // Check if we can generate content
    const canGenerate = await canGenerateContent('BLOG_POST')
    if (!canGenerate.allowed) {
      logger.info('Cannot generate blogs - limit reached', {
        service: 'seo-scheduled-blogs',
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
      logger.info('Insufficient budget for scheduled blogs', {
        service: 'seo-scheduled-blogs',
        remaining: limits.remainingBudget,
      })
      return NextResponse.json({
        success: false,
        message: `Insufficient budget: $${limits.remainingBudget.toFixed(2)} remaining`,
      })
    }

    // Select a random topic that hasn't been used recently
    // In production, we'd track which topics have been used
    const randomIndex = Math.floor(Math.random() * SCHEDULED_BLOG_TOPICS.length)
    const selectedTopic = SCHEDULED_BLOG_TOPICS[randomIndex]

    // Add to queue
    const queueItem = await addToQueue({
      type: 'BLOG_POST',
      triggerSource: 'SCHEDULED',
      topic: selectedTopic.topic,
      keywords: selectedTopic.keywords,
      priority: 'NORMAL',
    })

    if (!queueItem) {
      return NextResponse.json({
        success: false,
        message: 'Failed to add blog to queue - may be duplicate or limit reached',
      })
    }

    logger.info('Scheduled blog added to queue', {
      service: 'seo-scheduled-blogs',
      queueId: queueItem.id,
      topic: selectedTopic.topic,
    })

    return NextResponse.json({
      success: true,
      message: 'Blog topic added to generation queue',
      queueId: queueItem.id,
      topic: selectedTopic.topic,
      keywords: selectedTopic.keywords,
    })
  } catch (error) {
    logger.error('Scheduled blog generation failed', {
      service: 'seo-scheduled-blogs',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal error during blog scheduling',
      },
      { status: 500 }
    )
  }
}
