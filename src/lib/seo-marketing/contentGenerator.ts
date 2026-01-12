/**
 * SEO Content Machine - Content Generator
 *
 * Uses Claude API to generate SEO-optimized content.
 * Tracks token usage and costs, respects monthly budget limits.
 */

import { logger } from '@/lib/utils/logger'
import {
  getOrCreateMonthlyLimits,
  canGenerateContent,
  updateQueueStatus,
  recordTokenUsage,
  getQueueItem,
} from './queueService'
import type { ContentGenerationType } from '@/generated/prisma'
import type {
  BlogFrontmatter,
  BlogAuthor,
  NewsArticleFrontmatter,
  SEOLandingPageData,
} from './types'

// Claude API configuration
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const CLAUDE_MODEL = 'claude-sonnet-4-20250514'
const MAX_TOKENS = 4096

// Default author for generated content
const DEFAULT_AUTHOR: BlogAuthor = {
  name: 'Dr. Shekhar Singh',
  role: 'Founder & Senior Faculty',
}

// ============================================
// TYPES
// ============================================

export interface GeneratedBlogContent {
  frontmatter: BlogFrontmatter
  content: string
  wordCount: number
}

export interface GeneratedNewsContent {
  frontmatter: NewsArticleFrontmatter
  content: string
  keyUpdates: string[]
  studentImpact: string
  nextSteps: string[]
}

export interface GeneratedLandingPage {
  pageData: SEOLandingPageData
}

export interface GenerationResult {
  success: boolean
  content?: GeneratedBlogContent | GeneratedNewsContent | GeneratedLandingPage
  tokensUsed?: { input: number; output: number }
  costUsd?: number
  error?: string
}

interface ClaudeMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ClaudeResponse {
  id: string
  content: Array<{ type: string; text: string }>
  usage: {
    input_tokens: number
    output_tokens: number
  }
}

// ============================================
// CLAUDE API INTEGRATION
// ============================================

async function callClaude(
  systemPrompt: string,
  messages: ClaudeMessage[]
): Promise<{ response: string; usage: { input_tokens: number; output_tokens: number } }> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured')
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Claude API error: ${response.status} - ${errorText}`)
  }

  const data: ClaudeResponse = await response.json()

  return {
    response: data.content[0]?.text || '',
    usage: data.usage,
  }
}

// ============================================
// PROMPT TEMPLATES
// ============================================

const BLOG_SYSTEM_PROMPT = `You are an expert NEET Biology content writer for Cerebrum Biology Academy, a premier coaching institute in India.

Your task is to generate high-quality, SEO-optimized blog posts that:
1. Help NEET aspirants understand complex biology concepts
2. Are engaging, accurate, and exam-focused
3. Include practical study tips and exam strategies
4. Follow proper content structure with headers, lists, and key takeaways

Always write in a professional yet approachable tone. Use Indian English spelling conventions.

Output format: JSON object with "frontmatter" and "content" fields.`

const NEWS_SYSTEM_PROMPT = `You are a news writer covering NEET exam updates for Cerebrum Biology Academy.

Your task is to:
1. Write clear, factual news articles about NEET/NTA announcements
2. Explain the impact on students
3. Provide actionable next steps
4. Maintain urgency for time-sensitive content

Always verify claims and cite sources when available.

Output format: JSON object with "frontmatter", "content", "keyUpdates", "studentImpact", and "nextSteps" fields.`

const LANDING_PAGE_SYSTEM_PROMPT = `You are an SEO landing page specialist for Cerebrum Biology Academy.

Your task is to create high-converting landing page content that:
1. Targets specific keywords naturally
2. Addresses student/parent pain points
3. Highlights coaching benefits
4. Includes compelling CTAs
5. Uses proper schema-friendly structure

Focus on NEET Biology coaching in Kolkata and online tutoring services.

Output format: JSON object with "pageData" field containing all landing page sections.`

// ============================================
// CONTENT GENERATION FUNCTIONS
// ============================================

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80)
}

function calculateReadTime(content: string): number {
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / 200) // 200 words per minute average
}

/**
 * Generate a blog post
 */
export async function generateBlogPost(
  topic: string,
  keywords: string[] = [],
  additionalContext?: string
): Promise<GenerationResult> {
  // Check budget first
  const check = await canGenerateContent('BLOG_POST')
  if (!check.allowed) {
    return { success: false, error: check.reason }
  }

  const limits = await getOrCreateMonthlyLimits()
  if (limits.remainingBudget < 0.10) {
    return { success: false, error: 'Insufficient budget for content generation' }
  }

  try {
    const userPrompt = `Generate a comprehensive blog post about: "${topic}"

Target keywords: ${keywords.length > 0 ? keywords.join(', ') : 'derive from topic'}
${additionalContext ? `Additional context: ${additionalContext}` : ''}

Requirements:
- Word count: 1500-2500 words
- Include 5-7 key takeaways
- Add relevant NEET chapter reference if applicable
- Difficulty: Intermediate (suitable for Class 11-12 students)
- Include internal linking suggestions to /courses and /contact

Return a JSON object with this exact structure:
{
  "frontmatter": {
    "title": "SEO-optimized title (50-60 chars)",
    "slug": "url-friendly-slug",
    "excerpt": "Compelling meta description (150-160 chars)",
    "category": "one of: neet-preparation, chapter-guides, medical-colleges, neet-news, study-tips, success-stories, biology-concepts, exam-updates",
    "tags": ["tag1", "tag2", "tag3"],
    "featuredImage": "/images/blog/placeholder.jpg",
    "readTime": number,
    "seoTitle": "Full SEO title with brand",
    "seoDescription": "Meta description",
    "difficulty": "Beginner|Intermediate|Advanced",
    "neetChapter": "Chapter name if applicable or null",
    "neetWeightage": "High|Medium|Low or null",
    "targetAudience": "Student|Parent|Teacher|All",
    "keyTakeaways": ["takeaway1", "takeaway2", ...]
  },
  "content": "Full MDX content with proper markdown formatting, headers (##, ###), lists, bold text, and embedded CTAs"
}`

    const { response, usage } = await callClaude(BLOG_SYSTEM_PROMPT, [
      { role: 'user', content: userPrompt },
    ])

    // Parse the response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse blog content from response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    const now = new Date().toISOString()

    // Ensure all frontmatter fields are present
    const frontmatter: BlogFrontmatter = {
      title: parsed.frontmatter.title,
      slug: parsed.frontmatter.slug || generateSlug(parsed.frontmatter.title),
      excerpt: parsed.frontmatter.excerpt,
      author: DEFAULT_AUTHOR,
      category: parsed.frontmatter.category || 'neet-preparation',
      tags: parsed.frontmatter.tags || keywords,
      featuredImage: parsed.frontmatter.featuredImage || '/images/blog/placeholder.jpg',
      publishedAt: now,
      updatedAt: now,
      readTime: parsed.frontmatter.readTime || calculateReadTime(parsed.content),
      isPublished: false,
      seoTitle: parsed.frontmatter.seoTitle || `${parsed.frontmatter.title} | Cerebrum Biology Academy`,
      seoDescription: parsed.frontmatter.seoDescription || parsed.frontmatter.excerpt,
      difficulty: parsed.frontmatter.difficulty || 'Intermediate',
      neetChapter: parsed.frontmatter.neetChapter || undefined,
      neetWeightage: parsed.frontmatter.neetWeightage || undefined,
      targetAudience: parsed.frontmatter.targetAudience || 'Student',
      keyTakeaways: parsed.frontmatter.keyTakeaways || [],
    }

    const wordCount = parsed.content.split(/\s+/).length

    // Calculate cost
    const costPerInputToken = 0.000003
    const costPerOutputToken = 0.000015
    const costUsd = usage.input_tokens * costPerInputToken + usage.output_tokens * costPerOutputToken

    logger.info('Generated blog post', {
      service: 'seo-generator',
      topic,
      title: frontmatter.title,
      wordCount,
      tokens: usage,
      cost: costUsd.toFixed(4),
    })

    return {
      success: true,
      content: {
        frontmatter,
        content: parsed.content,
        wordCount,
      },
      tokensUsed: { input: usage.input_tokens, output: usage.output_tokens },
      costUsd,
    }
  } catch (error) {
    logger.error('Failed to generate blog post', {
      service: 'seo-generator',
      topic,
      error,
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Generate a news article
 */
export async function generateNewsArticle(
  headline: string,
  sourceUrl?: string,
  summary?: string
): Promise<GenerationResult> {
  const check = await canGenerateContent('NEWS_ARTICLE')
  if (!check.allowed) {
    return { success: false, error: check.reason }
  }

  const limits = await getOrCreateMonthlyLimits()
  if (limits.remainingBudget < 0.10) {
    return { success: false, error: 'Insufficient budget for content generation' }
  }

  try {
    const userPrompt = `Generate a news article about: "${headline}"

${sourceUrl ? `Source URL: ${sourceUrl}` : ''}
${summary ? `Summary: ${summary}` : ''}

Requirements:
- Focus on NEET exam implications
- Clear student impact section
- Actionable next steps for students
- Urgent but factual tone
- 600-1000 words

Return a JSON object with this exact structure:
{
  "frontmatter": {
    "title": "News headline",
    "slug": "url-slug",
    "headline": "Short attention-grabbing headline",
    "summary": "2-3 sentence summary",
    "category": "neet-news or exam-updates",
    "tags": ["tag1", "tag2"],
    "featuredImage": "/images/news/placeholder.jpg",
    "readTime": number,
    "seoTitle": "SEO title",
    "seoDescription": "Meta description",
    "isBreakingNews": boolean,
    "sources": [{"name": "source name", "url": "source url"}],
    "relatedLinks": [{"title": "link title", "url": "/related-url"}]
  },
  "content": "Full article content in markdown",
  "keyUpdates": ["update1", "update2", ...],
  "studentImpact": "How this affects NEET aspirants",
  "nextSteps": ["step1", "step2", ...]
}`

    const { response, usage } = await callClaude(NEWS_SYSTEM_PROMPT, [
      { role: 'user', content: userPrompt },
    ])

    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse news content from response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    const now = new Date().toISOString()

    const frontmatter: NewsArticleFrontmatter = {
      title: parsed.frontmatter.title,
      slug: parsed.frontmatter.slug || generateSlug(parsed.frontmatter.title),
      headline: parsed.frontmatter.headline,
      summary: parsed.frontmatter.summary,
      author: DEFAULT_AUTHOR,
      category: parsed.frontmatter.category || 'neet-news',
      tags: parsed.frontmatter.tags || [],
      featuredImage: parsed.frontmatter.featuredImage || '/images/news/placeholder.jpg',
      publishedAt: now,
      updatedAt: now,
      readTime: parsed.frontmatter.readTime || calculateReadTime(parsed.content),
      isPublished: false,
      seoTitle: parsed.frontmatter.seoTitle,
      seoDescription: parsed.frontmatter.seoDescription,
      isBreakingNews: parsed.frontmatter.isBreakingNews || false,
      sources: parsed.frontmatter.sources || [],
      relatedLinks: parsed.frontmatter.relatedLinks || [],
    }

    const costPerInputToken = 0.000003
    const costPerOutputToken = 0.000015
    const costUsd = usage.input_tokens * costPerInputToken + usage.output_tokens * costPerOutputToken

    logger.info('Generated news article', {
      service: 'seo-generator',
      headline,
      title: frontmatter.title,
      tokens: usage,
      cost: costUsd.toFixed(4),
    })

    return {
      success: true,
      content: {
        frontmatter,
        content: parsed.content,
        keyUpdates: parsed.keyUpdates || [],
        studentImpact: parsed.studentImpact || '',
        nextSteps: parsed.nextSteps || [],
      },
      tokensUsed: { input: usage.input_tokens, output: usage.output_tokens },
      costUsd,
    }
  } catch (error) {
    logger.error('Failed to generate news article', {
      service: 'seo-generator',
      headline,
      error,
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Generate an SEO landing page
 */
export async function generateLandingPage(
  keyword: string,
  classLevel?: string,
  location?: string
): Promise<GenerationResult> {
  const check = await canGenerateContent('SEO_LANDING_PAGE')
  if (!check.allowed) {
    return { success: false, error: check.reason }
  }

  const limits = await getOrCreateMonthlyLimits()
  if (limits.remainingBudget < 0.10) {
    return { success: false, error: 'Insufficient budget for content generation' }
  }

  try {
    const userPrompt = `Generate an SEO landing page for keyword: "${keyword}"

${classLevel ? `Target class level: ${classLevel}` : ''}
${location ? `Target location: ${location}` : 'Location: Kolkata / Online'}

Brand: Cerebrum Biology Academy
USP: Expert NEET Biology coaching by Dr. Shekhar Singh
CTA: WhatsApp contact - +918826444334

Return a JSON object with this structure:
{
  "pageData": {
    "slug": "url-friendly-slug",
    "title": "Page title (60 chars max)",
    "metaDescription": "Meta description (155 chars)",
    "keywords": ["keyword1", "keyword2", ...],
    "hero": {
      "headline": "Main headline with keyword",
      "subheadline": "Supporting text",
      "highlightedText": "Text to highlight",
      "ctaText": "CTA button text",
      "ctaLink": "https://wa.me/918826444334?text=..."
    },
    "painPoints": [
      {"icon": "AlertCircle", "question": "Pain point question?", "solution": "How we solve it"},
      ... (4-5 items)
    ],
    "benefits": [
      {"icon": "CheckCircle", "title": "Benefit title", "description": "Benefit description"},
      ... (4-6 items)
    ],
    "stats": [
      {"value": "95%+", "label": "Success rate"},
      ... (3-4 items)
    ],
    "faqs": [
      {"question": "FAQ question?", "answer": "Detailed answer"},
      ... (5-7 items)
    ],
    "testimonials": [
      {"name": "Student Name", "achievement": "AIQ 1234 | AIIMS Delhi", "quote": "Testimonial quote"},
      ... (3-4 items)
    ]
  }
}`

    const { response, usage } = await callClaude(LANDING_PAGE_SYSTEM_PROMPT, [
      { role: 'user', content: userPrompt },
    ])

    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse landing page content from response')
    }

    const parsed = JSON.parse(jsonMatch[0])

    const costPerInputToken = 0.000003
    const costPerOutputToken = 0.000015
    const costUsd = usage.input_tokens * costPerInputToken + usage.output_tokens * costPerOutputToken

    logger.info('Generated landing page', {
      service: 'seo-generator',
      keyword,
      title: parsed.pageData.title,
      tokens: usage,
      cost: costUsd.toFixed(4),
    })

    return {
      success: true,
      content: {
        pageData: parsed.pageData,
      },
      tokensUsed: { input: usage.input_tokens, output: usage.output_tokens },
      costUsd,
    }
  } catch (error) {
    logger.error('Failed to generate landing page', {
      service: 'seo-generator',
      keyword,
      error,
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Regenerate content with feedback (for iteration workflow)
 */
export async function regenerateWithFeedback(
  queueItemId: string,
  feedback: string
): Promise<GenerationResult> {
  const item = await getQueueItem(queueItemId)
  if (!item) {
    return { success: false, error: 'Queue item not found' }
  }

  const limits = await getOrCreateMonthlyLimits()
  if (limits.remainingBudget < 0.10) {
    return { success: false, error: 'Insufficient budget for regeneration' }
  }

  // Check iteration limit
  if (item.iterationCount >= 3) {
    return { success: false, error: 'Maximum iteration limit (3) reached' }
  }

  try {
    // Get the appropriate system prompt based on type
    let systemPrompt = BLOG_SYSTEM_PROMPT
    if (item.type === 'NEWS_ARTICLE') {
      systemPrompt = NEWS_SYSTEM_PROMPT
    } else if (item.type === 'SEO_LANDING_PAGE') {
      systemPrompt = LANDING_PAGE_SYSTEM_PROMPT
    }

    const userPrompt = `Please revise the following content based on the feedback provided.

Original content:
${item.generatedContent}

Feedback to incorporate:
${feedback}

Return the revised content in the same JSON format as the original.`

    const { response, usage } = await callClaude(systemPrompt, [
      { role: 'user', content: userPrompt },
    ])

    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse revised content from response')
    }

    const parsed = JSON.parse(jsonMatch[0])

    const costPerInputToken = 0.000003
    const costPerOutputToken = 0.000015
    const costUsd = usage.input_tokens * costPerInputToken + usage.output_tokens * costPerOutputToken

    // Update the queue item with new content
    await updateQueueStatus(queueItemId, 'REVIEW', {
      generatedContent: JSON.stringify(parsed),
      generatedTitle: parsed.frontmatter?.title || parsed.pageData?.title,
      iterationFeedback: feedback,
    })

    // Record token usage
    await recordTokenUsage(queueItemId, usage.input_tokens, usage.output_tokens)

    logger.info('Regenerated content with feedback', {
      service: 'seo-generator',
      queueItemId,
      iteration: item.iterationCount + 1,
      tokens: usage,
      cost: costUsd.toFixed(4),
    })

    return {
      success: true,
      content: parsed,
      tokensUsed: { input: usage.input_tokens, output: usage.output_tokens },
      costUsd,
    }
  } catch (error) {
    logger.error('Failed to regenerate content', {
      service: 'seo-generator',
      queueItemId,
      error,
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Process a queue item - generate content and update status
 */
export async function processQueueItem(queueItemId: string): Promise<GenerationResult> {
  const item = await getQueueItem(queueItemId)
  if (!item) {
    return { success: false, error: 'Queue item not found' }
  }

  // Update status to GENERATING
  await updateQueueStatus(queueItemId, 'GENERATING')

  let result: GenerationResult

  try {
    switch (item.type) {
      case 'BLOG_POST':
        result = await generateBlogPost(item.topic, item.keywords, item.additionalContext || undefined)
        break
      case 'NEWS_ARTICLE':
        result = await generateNewsArticle(item.topic, item.sourceUrl || undefined)
        break
      case 'SEO_LANDING_PAGE':
        result = await generateLandingPage(item.topic)
        break
      default:
        result = { success: false, error: `Unsupported content type: ${item.type}` }
    }

    if (result.success && result.content) {
      // Store generated content
      const contentJson = JSON.stringify(result.content)
      const title =
        'frontmatter' in result.content
          ? result.content.frontmatter.title
          : 'pageData' in result.content
            ? result.content.pageData.title
            : item.topic

      const slug =
        'frontmatter' in result.content
          ? result.content.frontmatter.slug
          : 'pageData' in result.content
            ? result.content.pageData.slug
            : generateSlug(item.topic)

      const excerpt =
        'frontmatter' in result.content && 'excerpt' in result.content.frontmatter
          ? result.content.frontmatter.excerpt
          : 'frontmatter' in result.content && 'summary' in result.content.frontmatter
            ? (result.content.frontmatter as NewsArticleFrontmatter).summary
            : undefined

      await updateQueueStatus(queueItemId, 'REVIEW', {
        generatedTitle: title,
        generatedSlug: slug,
        generatedContent: contentJson,
        generatedExcerpt: excerpt,
        tokensUsed: result.tokensUsed ? result.tokensUsed.input + result.tokensUsed.output : undefined,
        costUsd: result.costUsd,
      })

      // Record token usage in monthly limits
      if (result.tokensUsed) {
        await recordTokenUsage(queueItemId, result.tokensUsed.input, result.tokensUsed.output)
      }
    } else {
      // Mark as failed
      await updateQueueStatus(queueItemId, 'FAILED', {
        errorMessage: result.error || 'Unknown generation error',
      })
    }

    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    await updateQueueStatus(queueItemId, 'FAILED', { errorMessage })

    logger.error('Failed to process queue item', {
      service: 'seo-generator',
      queueItemId,
      error,
    })

    return { success: false, error: errorMessage }
  }
}

/**
 * Get estimated cost for a generation
 */
export function estimateCost(type: ContentGenerationType): number {
  // Based on average token usage per content type
  const estimates: Record<ContentGenerationType, { input: number; output: number }> = {
    BLOG_POST: { input: 800, output: 3000 },
    NEWS_ARTICLE: { input: 600, output: 1500 },
    SEO_LANDING_PAGE: { input: 700, output: 2500 },
    SOCIAL_POST: { input: 300, output: 500 },
    LEAD_MAGNET: { input: 900, output: 4000 },
  }

  const estimate = estimates[type] || { input: 500, output: 2000 }
  const costPerInputToken = 0.000003
  const costPerOutputToken = 0.000015

  return estimate.input * costPerInputToken + estimate.output * costPerOutputToken
}
