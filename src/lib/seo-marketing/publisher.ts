/**
 * SEO Content Machine - Publisher Service
 *
 * Handles publishing of approved content to the website.
 * Converts generated content to MDX and writes to filesystem.
 */

import { promises as fs } from 'fs'
import path from 'path'
import { logger } from '@/lib/utils/logger'
import { getQueueItem, updateQueueStatus, getApprovedItems } from './queueService'
import { sendPublishedNotification } from './approvalService'
import type { ContentGenerationType } from '@/generated/prisma'

// Base paths for different content types
const CONTENT_PATHS: Record<ContentGenerationType, string> = {
  BLOG_POST: 'content/blog',
  NEWS_ARTICLE: 'content/news',
  SEO_LANDING_PAGE: 'src/app/(marketing)/neet-biology',
  SOCIAL_POST: 'content/social', // Not typically file-based, but included for completeness
  LEAD_MAGNET: 'content/lead-magnets',
}

// Base URL for the website
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cerebrumbiologyacademy.com'

// ============================================
// TYPES
// ============================================

interface PublishResult {
  success: boolean
  publishedUrl?: string
  filePath?: string
  error?: string
}

interface ParsedContent {
  frontmatter: Record<string, any>
  content: string
  pageData?: Record<string, any>
}

// ============================================
// MAIN PUBLISHING FUNCTION
// ============================================

/**
 * Publish a single approved content item
 */
export async function publishContent(queueItemId: string): Promise<PublishResult> {
  const item = await getQueueItem(queueItemId)

  if (!item) {
    return { success: false, error: 'Queue item not found' }
  }

  if (item.status !== 'APPROVED') {
    return { success: false, error: `Invalid status: ${item.status}. Expected APPROVED.` }
  }

  if (!item.generatedContent) {
    return { success: false, error: 'No generated content found' }
  }

  try {
    // Parse the generated content
    let parsed: ParsedContent
    try {
      parsed = JSON.parse(item.generatedContent)
    } catch {
      return { success: false, error: 'Failed to parse generated content JSON' }
    }

    // Get the appropriate path based on content type
    const basePath = CONTENT_PATHS[item.type]
    if (!basePath) {
      return { success: false, error: `Unknown content type: ${item.type}` }
    }

    let filePath: string
    let publishedUrl: string

    switch (item.type) {
      case 'BLOG_POST':
        const blogResult = await publishBlogPost(
          parsed,
          item.generatedSlug || generateSlug(item.topic)
        )
        filePath = blogResult.filePath
        publishedUrl = blogResult.url
        break

      case 'NEWS_ARTICLE':
        const newsResult = await publishNewsArticle(
          parsed,
          item.generatedSlug || generateSlug(item.topic)
        )
        filePath = newsResult.filePath
        publishedUrl = newsResult.url
        break

      case 'SEO_LANDING_PAGE':
        const pageResult = await publishLandingPage(
          parsed,
          item.generatedSlug || generateSlug(item.topic)
        )
        filePath = pageResult.filePath
        publishedUrl = pageResult.url
        break

      default:
        return { success: false, error: `Unsupported content type: ${item.type}` }
    }

    // Update queue status to PUBLISHED
    await updateQueueStatus(queueItemId, 'PUBLISHED', {
      publishedUrl,
      publishedAt: new Date(),
    })

    // Send WhatsApp notification
    await sendPublishedNotification(queueItemId, publishedUrl)

    logger.info('Content published successfully', {
      service: 'seo-publisher',
      queueItemId,
      type: item.type,
      publishedUrl,
      filePath,
    })

    return { success: true, publishedUrl, filePath }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown publishing error'

    logger.error('Failed to publish content', {
      service: 'seo-publisher',
      queueItemId,
      error: errorMessage,
    })

    // Update status to FAILED
    await updateQueueStatus(queueItemId, 'FAILED', {
      errorMessage: `Publishing failed: ${errorMessage}`,
    })

    return { success: false, error: errorMessage }
  }
}

/**
 * Publish all approved content items
 */
export async function publishAllApproved(): Promise<{
  published: number
  failed: number
  results: PublishResult[]
}> {
  const approvedItems = await getApprovedItems()

  if (approvedItems.length === 0) {
    logger.info('No approved content to publish', { service: 'seo-publisher' })
    return { published: 0, failed: 0, results: [] }
  }

  logger.info(`Publishing ${approvedItems.length} approved items`, {
    service: 'seo-publisher',
  })

  const results: PublishResult[] = []
  let published = 0
  let failed = 0

  for (const item of approvedItems) {
    const result = await publishContent(item.id)
    results.push(result)

    if (result.success) {
      published++
    } else {
      failed++
    }

    // Small delay between publishes to avoid overwhelming the system
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  logger.info('Batch publishing complete', {
    service: 'seo-publisher',
    published,
    failed,
    total: approvedItems.length,
  })

  return { published, failed, results }
}

// ============================================
// CONTENT TYPE SPECIFIC PUBLISHERS
// ============================================

/**
 * Publish a blog post to MDX file
 */
async function publishBlogPost(
  content: ParsedContent,
  slug: string
): Promise<{ filePath: string; url: string }> {
  const { frontmatter, content: body } = content

  // Build MDX content with frontmatter
  const mdxContent = buildMdxContent(
    {
      title: frontmatter.title,
      excerpt: frontmatter.excerpt || frontmatter.summary,
      date: new Date().toISOString().split('T')[0],
      author: frontmatter.author || 'Cerebrum Biology Academy',
      category: frontmatter.category || 'NEET Preparation',
      tags: frontmatter.tags || [],
      readTime: frontmatter.readTime || calculateReadTime(body),
      featured: frontmatter.featured || false,
      published: true,
    },
    body
  )

  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)

  // Ensure directory exists
  await ensureDirectoryExists(path.dirname(filePath))

  // Write the file
  await fs.writeFile(filePath, mdxContent, 'utf-8')

  const url = `${BASE_URL}/blog/${slug}`

  return { filePath, url }
}

/**
 * Publish a news article to MDX file
 */
async function publishNewsArticle(
  content: ParsedContent,
  slug: string
): Promise<{ filePath: string; url: string }> {
  const { frontmatter, content: body } = content

  const mdxContent = buildMdxContent(
    {
      title: frontmatter.title,
      excerpt: frontmatter.excerpt || frontmatter.summary,
      date: new Date().toISOString().split('T')[0],
      author: frontmatter.author || 'Cerebrum Biology Academy',
      category: frontmatter.category || 'NEET News',
      sourceUrl: frontmatter.sourceUrl,
      tags: frontmatter.tags || ['NEET 2026', 'News'],
      readTime: frontmatter.readTime || calculateReadTime(body),
      published: true,
    },
    body
  )

  const filePath = path.join(process.cwd(), 'content/news', `${slug}.mdx`)

  await ensureDirectoryExists(path.dirname(filePath))
  await fs.writeFile(filePath, mdxContent, 'utf-8')

  const url = `${BASE_URL}/news/${slug}`

  return { filePath, url }
}

/**
 * Publish a landing page as a Next.js page component
 */
async function publishLandingPage(
  content: ParsedContent,
  slug: string
): Promise<{ filePath: string; url: string }> {
  const { pageData } = content

  if (!pageData) {
    throw new Error('Landing page requires pageData')
  }

  // Generate the page component
  const pageContent = generateLandingPageComponent(pageData, slug)

  // Create directory for the page
  const pageDirPath = path.join(process.cwd(), 'src/app/(marketing)/neet-biology', slug)

  await ensureDirectoryExists(pageDirPath)

  // Write page.tsx
  const filePath = path.join(pageDirPath, 'page.tsx')
  await fs.writeFile(filePath, pageContent, 'utf-8')

  const url = `${BASE_URL}/neet-biology/${slug}`

  return { filePath, url }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Build MDX content with frontmatter
 */
function buildMdxContent(frontmatter: Record<string, any>, body: string): string {
  const frontmatterLines = ['---']

  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      frontmatterLines.push(`${key}:`)
      for (const item of value) {
        frontmatterLines.push(`  - "${item}"`)
      }
    } else if (typeof value === 'boolean') {
      frontmatterLines.push(`${key}: ${value}`)
    } else if (typeof value === 'number') {
      frontmatterLines.push(`${key}: ${value}`)
    } else {
      // Escape quotes in strings
      const escapedValue = String(value).replace(/"/g, '\\"')
      frontmatterLines.push(`${key}: "${escapedValue}"`)
    }
  }

  frontmatterLines.push('---')
  frontmatterLines.push('')
  frontmatterLines.push(body)

  return frontmatterLines.join('\n')
}

/**
 * Generate a React component for landing pages
 */
function generateLandingPageComponent(pageData: Record<string, any>, slug: string): string {
  const { title, metaDescription, heroTitle, heroSubtitle, sections } = pageData

  return `import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/seo/LandingPageTemplate'

export const metadata: Metadata = {
  title: '${escapeTemplateString(title)} | Cerebrum Biology Academy',
  description: '${escapeTemplateString(metaDescription)}',
  openGraph: {
    title: '${escapeTemplateString(title)}',
    description: '${escapeTemplateString(metaDescription)}',
    type: 'website',
  },
}

const pageData = ${JSON.stringify(pageData, null, 2)}

export default function ${toPascalCase(slug)}Page() {
  return <LandingPageTemplate data={pageData} />
}
`
}

/**
 * Generate URL-friendly slug from text
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60)
}

/**
 * Calculate read time in minutes
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Ensure directory exists, create if not
 */
async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath)
  } catch {
    await fs.mkdir(dirPath, { recursive: true })
  }
}

/**
 * Convert slug to PascalCase for component names
 */
function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Escape special characters for template strings
 */
function escapeTemplateString(str: string): string {
  return str.replace(/'/g, "\\'").replace(/\n/g, ' ').trim()
}
