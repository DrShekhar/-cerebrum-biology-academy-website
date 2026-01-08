#!/usr/bin/env npx tsx
/**
 * SEO Marketing Machine - Content Generator CLI
 *
 * Usage:
 *   npm run seo:blog "Topic Title"
 *   npm run seo:blog --topic "Human Reproduction" --difficulty "Advanced"
 *   npm run seo:news --headline "NTA Announces NEET 2026 Dates" --urgent
 *   npm run seo:landing --keyword "biology tutor delhi"
 *
 * This CLI generates draft content that you review before publishing.
 */

import * as fs from 'fs'
import * as path from 'path'
import { randomUUID } from 'crypto'
import {
  SEOContentType,
  BlogDraft,
  NewsDraft,
  SEOLandingDraft,
  BlogGenerationInput,
  NewsGenerationInput,
  SEOLandingGenerationInput,
  DEFAULT_CONFIG,
  ContentPriority
} from '../../src/lib/seo-marketing/types'

// ANSI color codes for CLI output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logHeader(title: string) {
  console.log('')
  log('═'.repeat(50), 'cyan')
  log(`  ${title}`, 'bright')
  log('═'.repeat(50), 'cyan')
  console.log('')
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
}

function generateId(): string {
  return `draft-${Date.now()}-${randomUUID().substring(0, 8)}`
}

function ensureDraftDir(type: string): string {
  const draftDir = path.join(process.cwd(), DEFAULT_CONFIG.draftsDir, type)
  if (!fs.existsSync(draftDir)) {
    fs.mkdirSync(draftDir, { recursive: true })
  }
  return draftDir
}

function saveDraft(type: string, id: string, content: object): string {
  const draftDir = ensureDraftDir(type)
  const filePath = path.join(draftDir, `${id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
  return filePath
}

// Parse command line arguments
function parseArgs(): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {}
  const argv = process.argv.slice(2)

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const key = arg.substring(2)
      const nextArg = argv[i + 1]
      if (nextArg && !nextArg.startsWith('--')) {
        args[key] = nextArg
        i++
      } else {
        args[key] = true
      }
    } else if (!args.positional) {
      args.positional = arg
    }
  }

  return args
}

// ============================================
// BLOG POST GENERATOR
// ============================================

async function generateBlogPost(input: BlogGenerationInput): Promise<BlogDraft> {
  const id = generateId()
  const slug = generateSlug(input.topic)
  const now = new Date().toISOString().split('T')[0]

  // Create draft structure (Claude will fill content interactively)
  const draft: BlogDraft = {
    id,
    type: 'BLOG_POST',
    status: 'draft',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    generatedBy: 'claude',
    frontmatter: {
      title: input.topic,
      slug,
      excerpt: `[DRAFT] ${input.topic} - comprehensive guide for NEET Biology`,
      author: DEFAULT_CONFIG.defaultAuthor,
      category: 'chapter-guides',
      tags: input.keywords || ['NEET 2026', 'Biology'],
      featuredImage: `/blog/${slug}.svg`,
      publishedAt: now,
      updatedAt: now,
      readTime: 15,
      isPublished: false,
      seoTitle: `${input.topic} | NEET Biology Guide 2026`,
      seoDescription: `Complete guide on ${input.topic} for NEET 2026. Expert notes, tips, and PYQs from AIIMS faculty.`,
      difficulty: input.difficulty || 'Intermediate',
      neetChapter: input.neetChapter,
      neetWeightage: 'Medium',
      targetAudience: input.targetAudience || 'Student',
      keyTakeaways: [
        '[KEY TAKEAWAY 1 - To be filled]',
        '[KEY TAKEAWAY 2 - To be filled]',
        '[KEY TAKEAWAY 3 - To be filled]'
      ]
    },
    content: generateBlogPromptForClaude(input),
    wordCount: 0
  }

  return draft
}

function generateBlogPromptForClaude(input: BlogGenerationInput): string {
  return `
## INSTRUCTIONS FOR CLAUDE
Generate a comprehensive NEET Biology blog post on: **${input.topic}**

### Requirements:
- Difficulty: ${input.difficulty || 'Intermediate'}
- Target: ${input.targetAudience || 'NEET aspirants'}
- Chapter: ${input.neetChapter || 'General'}
- Keywords: ${input.keywords?.join(', ') || 'NEET Biology, ' + input.topic}

### Content Structure:
1. Introduction (hook + importance for NEET)
2. Key Concepts (detailed explanation)
3. NCERT Alignment (direct references)
4. Diagrams/Tables (suggest what to include)
5. Common Mistakes to Avoid
6. PYQ Analysis (pattern of questions asked)
7. Quick Revision Points
8. Practice Questions (2-3 sample MCQs)
9. CTA (join coaching / WhatsApp inquiry)

### Output:
Write the complete blog content in markdown format.
After generating, I will review and update the frontmatter.

---
[CONTENT STARTS HERE - Claude will fill this interactively]
`
}

// ============================================
// NEWS ARTICLE GENERATOR
// ============================================

async function generateNewsArticle(input: NewsGenerationInput): Promise<NewsDraft> {
  const id = generateId()
  const slug = generateSlug(input.headline)
  const now = new Date().toISOString().split('T')[0]

  const draft: NewsDraft = {
    id,
    type: 'NEWS_ARTICLE',
    status: 'draft',
    priority: input.isUrgent ? 'urgent' : 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    generatedBy: 'claude',
    frontmatter: {
      title: input.headline,
      slug,
      headline: input.headline,
      summary: input.summary || '[Summary to be filled]',
      author: DEFAULT_CONFIG.defaultAuthor,
      category: 'neet-news',
      tags: ['NEET 2026', 'NTA', 'News'],
      featuredImage: `/blog/neet-news-${now}.svg`,
      publishedAt: now,
      updatedAt: now,
      readTime: 5,
      isPublished: false,
      seoTitle: input.headline,
      seoDescription: `${input.headline}. Latest NEET news and updates for aspirants.`,
      isBreakingNews: input.isUrgent || false,
      sources: input.sourceUrl ? [{ name: 'Official Source', url: input.sourceUrl }] : [],
      relatedLinks: []
    },
    content: generateNewsPromptForClaude(input),
    keyUpdates: ['[KEY UPDATE 1]', '[KEY UPDATE 2]'],
    studentImpact: '[STUDENT IMPACT TO BE FILLED]',
    nextSteps: ['[NEXT STEP 1]', '[NEXT STEP 2]']
  }

  return draft
}

function generateNewsPromptForClaude(input: NewsGenerationInput): string {
  return `
## URGENT NEWS ARTICLE GENERATION
Headline: **${input.headline}**

### Source Information:
- URL: ${input.sourceUrl || 'Not provided'}
- Summary: ${input.summary || 'Not provided'}
- Type: ${input.announcementType || 'general'}

### Article Structure:
1. **Lead Paragraph** - Most important info first
2. **Key Updates** - Bullet point highlights
3. **Full Details** - Complete announcement details
4. **Impact on Students** - How this affects NEET aspirants
5. **What to Do Next** - Actionable steps
6. **Timeline** - Important dates if any
7. **Official Links** - Where to find more info
8. **CTA** - Subscribe to WhatsApp for instant updates

### Tone: ${input.isUrgent ? 'URGENT - Breaking news style' : 'Informative and helpful'}

---
[NEWS CONTENT STARTS HERE - Claude will fill this interactively]
`
}

// ============================================
// SEO LANDING PAGE GENERATOR
// ============================================

async function generateSEOLanding(input: SEOLandingGenerationInput): Promise<SEOLandingDraft> {
  const id = generateId()
  const slug = generateSlug(input.keyword)

  const draft: SEOLandingDraft = {
    id,
    type: 'SEO_LANDING_PAGE',
    status: 'draft',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    generatedBy: 'claude',
    keyword: input.keyword,
    classLevel: input.classLevel as any,
    location: input.location,
    pageData: {
      slug,
      title: `${input.keyword} | Cerebrum Biology Academy`,
      metaDescription: `Expert ${input.keyword} services. Join Cerebrum Biology Academy for NEET success.`,
      keywords: [input.keyword, 'NEET Biology', 'Biology coaching'],
      hero: {
        headline: `[HEADLINE FOR: ${input.keyword}]`,
        subheadline: '[SUBHEADLINE TO BE FILLED]',
        ctaText: 'Start Free Trial',
        ctaLink: `https://wa.me/${DEFAULT_CONFIG.whatsappNumber.replace('+', '')}`
      },
      painPoints: [],
      benefits: [],
      stats: [],
      faqs: [],
      testimonials: []
    }
  }

  return draft
}

function generateSEOPromptForClaude(input: SEOLandingGenerationInput): string {
  return `
## SEO LANDING PAGE GENERATION
Target Keyword: **${input.keyword}**

### Configuration:
- Class Level: ${input.classLevel || 'All'}
- Location: ${input.location || 'Not specified'}
- Focus: ${input.focusArea || 'General coaching'}

### Generate JSON with:
1. **hero** - Compelling headline targeting keyword
2. **painPoints** - 4 student struggles (icon, question, solution)
3. **benefits** - 4-6 key benefits with icons
4. **stats** - 4 trust-building numbers
5. **faqs** - 5-6 keyword-rich questions
6. **testimonials** - 2-3 student success stories

### SEO Requirements:
- Use exact keyword in headline
- Include location if provided
- Make FAQs keyword-rich for snippets
- Focus on conversion (WhatsApp CTA)

---
Return valid JSON matching SEOLandingPageData interface.
`
}

// ============================================
// MAIN CLI HANDLER
// ============================================

async function main() {
  const args = parseArgs()

  // Determine content type from script name or args
  const scriptName = process.argv[1]
  let contentType: SEOContentType = 'BLOG_POST'

  if (scriptName.includes('news') || args.news) {
    contentType = 'NEWS_ARTICLE'
  } else if (scriptName.includes('landing') || args.landing) {
    contentType = 'SEO_LANDING_PAGE'
  } else if (args.type) {
    contentType = args.type as SEOContentType
  }

  logHeader('SEO Marketing Machine - Content Generator')

  try {
    let draft: BlogDraft | NewsDraft | SEOLandingDraft
    let promptForClaude: string

    switch (contentType) {
      case 'BLOG_POST': {
        const topic = (args.positional as string) || (args.topic as string)
        if (!topic) {
          log('Error: Topic is required for blog posts', 'red')
          log('Usage: npm run seo:blog "Your Topic Title"', 'yellow')
          log('   or: npm run seo:blog --topic "Your Topic" --difficulty "Advanced"', 'yellow')
          process.exit(1)
        }

        log(`Generating blog draft: ${topic}`, 'blue')

        const input: BlogGenerationInput = {
          topic,
          difficulty: args.difficulty as any,
          targetAudience: args.audience as any,
          neetChapter: args.chapter as string,
          keywords: args.keywords ? (args.keywords as string).split(',') : undefined
        }

        draft = await generateBlogPost(input)
        promptForClaude = generateBlogPromptForClaude(input)
        break
      }

      case 'NEWS_ARTICLE': {
        const headline = (args.positional as string) || (args.headline as string)
        if (!headline) {
          log('Error: Headline is required for news articles', 'red')
          log('Usage: npm run seo:news --headline "NTA Announces NEET 2026 Dates"', 'yellow')
          process.exit(1)
        }

        log(`Generating news draft: ${headline}`, 'blue')
        if (args.urgent) {
          log('⚡ URGENT MODE - Priority fast-track enabled', 'yellow')
        }

        const input: NewsGenerationInput = {
          headline,
          sourceUrl: args.url as string,
          summary: args.summary as string,
          isUrgent: Boolean(args.urgent),
          announcementType: args.type as any
        }

        draft = await generateNewsArticle(input)
        promptForClaude = generateNewsPromptForClaude(input)
        break
      }

      case 'SEO_LANDING_PAGE': {
        const keyword = (args.positional as string) || (args.keyword as string)
        if (!keyword) {
          log('Error: Keyword is required for SEO landing pages', 'red')
          log('Usage: npm run seo:landing --keyword "biology tutor delhi"', 'yellow')
          process.exit(1)
        }

        log(`Generating SEO landing page: ${keyword}`, 'blue')

        const input: SEOLandingGenerationInput = {
          keyword,
          classLevel: args.class as string,
          location: args.location as string,
          focusArea: args.focus as any
        }

        draft = await generateSEOLanding(input)
        promptForClaude = generateSEOPromptForClaude(input)
        break
      }

      default:
        log(`Unknown content type: ${contentType}`, 'red')
        process.exit(1)
    }

    // Save draft
    const draftType = contentType.toLowerCase().replace('_', '-')
    const filePath = saveDraft(
      draftType === 'blog-post' ? 'blog' :
      draftType === 'news-article' ? 'news' :
      'landing',
      draft.id,
      draft
    )

    console.log('')
    log('✅ Draft created successfully!', 'green')
    console.log('')
    log(`Draft ID: ${draft.id}`, 'cyan')
    log(`File: ${filePath}`, 'cyan')
    log(`Status: ${draft.status}`, 'cyan')
    log(`Priority: ${draft.priority}`, 'cyan')
    console.log('')

    log('═'.repeat(50), 'yellow')
    log('  NEXT STEPS', 'bright')
    log('═'.repeat(50), 'yellow')
    console.log('')
    log('1. Copy the prompt below and paste it to Claude', 'blue')
    log('2. Claude will generate the content', 'blue')
    log('3. Review and edit the draft file', 'blue')
    log('4. Run: npm run seo:publish --id ' + draft.id, 'blue')
    console.log('')

    log('═'.repeat(50), 'green')
    log('  PROMPT FOR CLAUDE', 'bright')
    log('═'.repeat(50), 'green')
    console.log('')
    console.log(promptForClaude)
    console.log('')

  } catch (error) {
    log(`Error: ${error}`, 'red')
    process.exit(1)
  }
}

// Show help if no arguments
if (process.argv.length <= 2) {
  logHeader('SEO Marketing Machine - Help')
  console.log(`
${colors.bright}BLOG POSTS${colors.reset}
  npm run seo:blog "NEET 2026 Biology Syllabus Guide"
  npm run seo:blog --topic "Human Reproduction" --difficulty "Advanced"
  npm run seo:blog --topic "Cell Division" --chapter "Cell Cycle"

${colors.bright}NEWS ARTICLES${colors.reset}
  npm run seo:news --headline "NTA Announces NEET 2026 Date"
  npm run seo:news --headline "NEET Result Declared" --urgent
  npm run seo:news --headline "New Medical Colleges" --url "https://..."

${colors.bright}SEO LANDING PAGES${colors.reset}
  npm run seo:landing --keyword "biology tutor delhi"
  npm run seo:landing --keyword "neet coaching rohini" --class "12"
  npm run seo:landing --keyword "online biology classes" --focus "online"

${colors.bright}OPTIONS${colors.reset}
  --topic       Blog topic title
  --headline    News headline
  --keyword     Target SEO keyword
  --difficulty  Beginner | Intermediate | Advanced
  --chapter     NEET chapter name
  --class       Class level (9, 10, 11, 12, dropper)
  --location    Target location
  --urgent      Fast-track priority flag
  --url         Source URL for news

${colors.bright}WORKFLOW${colors.reset}
  1. Generate draft with this CLI
  2. Copy prompt and paste to Claude
  3. Claude generates content
  4. Review draft in content/drafts/
  5. Publish: npm run seo:publish --id <draft-id>
`)
  process.exit(0)
}

main().catch(console.error)
