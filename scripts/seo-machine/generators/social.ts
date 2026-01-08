#!/usr/bin/env npx tsx
/**
 * SEO Marketing Machine - Social Media Repurposer
 *
 * Converts blog posts and news articles into social media content.
 *
 * Usage:
 *   npm run seo:social --source blog/draft-id
 *   npm run seo:social --source blog/draft-id --platforms twitter,linkedin
 *   npm run seo:social --blog "human-reproduction" --platforms all
 *
 * This creates draft social posts that you review before posting.
 */

import * as fs from 'fs'
import * as path from 'path'
import { randomUUID } from 'crypto'
import {
  SocialPostDraft,
  SocialPostContent,
  SocialPlatform,
  SocialGenerationInput,
  BlogDraft,
  NewsDraft,
  DEFAULT_CONFIG,
} from '../../../src/lib/seo-marketing/types'

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logHeader(title: string) {
  console.log('')
  log('═'.repeat(60), 'cyan')
  log(`  ${title}`, 'bright')
  log('═'.repeat(60), 'cyan')
  console.log('')
}

function generateId(): string {
  return `social-${Date.now()}-${randomUUID().substring(0, 8)}`
}

function ensureDraftDir(): string {
  const draftDir = path.join(process.cwd(), DEFAULT_CONFIG.draftsDir, 'social')
  if (!fs.existsSync(draftDir)) {
    fs.mkdirSync(draftDir, { recursive: true })
  }
  return draftDir
}

function saveDraft(id: string, content: object): string {
  const draftDir = ensureDraftDir()
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

// Load source content (blog or news draft)
function loadSourceContent(sourceId: string): BlogDraft | NewsDraft | null {
  const draftsDir = path.join(process.cwd(), DEFAULT_CONFIG.draftsDir)
  const searchDirs = ['blog', 'news']

  for (const dir of searchDirs) {
    const dirPath = path.join(draftsDir, dir)
    if (!fs.existsSync(dirPath)) continue

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.json'))
    for (const file of files) {
      const filePath = path.join(dirPath, file)
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        if (content.id === sourceId || file.includes(sourceId)) {
          return content
        }
      } catch {
        continue
      }
    }
  }

  return null
}

// Load published blog by slug
function loadPublishedBlog(slug: string): { title: string; content: string; excerpt: string } | null {
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const mdxPath = path.join(blogDir, `${slug}.mdx`)

  if (!fs.existsSync(mdxPath)) return null

  const content = fs.readFileSync(mdxPath, 'utf-8')
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

  if (!frontmatterMatch) return null

  const frontmatter = frontmatterMatch[1]
  const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/)
  const excerptMatch = frontmatter.match(/excerpt:\s*"([^"]+)"/)
  const body = content.replace(/^---[\s\S]*?---\n/, '')

  return {
    title: titleMatch ? titleMatch[1] : slug,
    excerpt: excerptMatch ? excerptMatch[1] : '',
    content: body,
  }
}

// ============================================
// CONTENT GENERATORS
// ============================================

function generateTwitterThread(
  title: string,
  content: string,
  keyTakeaways: string[],
  tags: string[]
): string[] {
  const thread: string[] = []
  const hashtags = tags.slice(0, 3).map((t) => `#${t.replace(/\s+/g, '')}`).join(' ')

  // Tweet 1: Hook
  thread.push(
`🧬 THREAD: ${title}

A comprehensive breakdown for NEET 2026 aspirants 👇

${hashtags} #NEET2026`
  )

  // Tweet 2-N: Key takeaways
  keyTakeaways.forEach((takeaway, i) => {
    thread.push(
`${i + 2}/ ${takeaway}`
    )
  })

  // Final tweet: CTA
  thread.push(
`📚 Want detailed notes and expert guidance?

Join Cerebrum Biology Academy - taught by AIIMS faculty.

✅ Free demo class available
📱 WhatsApp: wa.me/917980078875

#NEETBiology #BiologyCoaching`
  )

  return thread
}

function generateLinkedInPost(
  title: string,
  excerpt: string,
  keyTakeaways: string[],
  tags: string[]
): string {
  const hashtags = tags.slice(0, 5).map((t) => `#${t.replace(/\s+/g, '')}`).join(' ')

  return `📖 ${title}

${excerpt}

Here are the key takeaways for NEET aspirants:

${keyTakeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}

---

At Cerebrum Biology Academy, we help students master these concepts with:
✅ Expert faculty from AIIMS
✅ Conceptual clarity over rote learning
✅ Personalized attention

Preparing for NEET 2026? Let's connect.

📱 WhatsApp: +91 7980078875
🌐 Website: cerebrumbiologyacademy.com

${hashtags} #NEETPreparation #BiologyEducation #MedicalAspirants`
}

function generateInstagramCaption(
  title: string,
  excerpt: string,
  keyTakeaways: string[],
  tags: string[]
): { caption: string; hashtags: string[] } {
  const caption = `📚 ${title}

${excerpt}

Save this post for quick revision! 💾

🔬 Key Points:
${keyTakeaways.slice(0, 5).map((t) => `• ${t}`).join('\n')}

---
Ready to ace NEET Biology?
DM us or click the link in bio!

#NEETBiology #NEET2026 #BiologyNotes`

  const hashtags = [
    'NEETBiology',
    'NEET2026',
    'BiologyNotes',
    'NEETPreparation',
    'MedicalAspirants',
    'BiologyClass12',
    'NCERTBiology',
    'CerebrumBiology',
    ...tags.map((t) => t.replace(/\s+/g, '')),
  ].slice(0, 30)

  return { caption, hashtags }
}

function generateWhatsAppBroadcast(
  title: string,
  excerpt: string,
  keyTakeaways: string[]
): string {
  return `🧬 *${title}*

${excerpt}

*Quick Revision Points:*
${keyTakeaways.slice(0, 5).map((t, i) => `${i + 1}. ${t}`).join('\n')}

📖 *Read full article:* cerebrumbiologyacademy.com/blog

---
Want personalized NEET Biology coaching?
Reply YES or call us! 📞`
}

// ============================================
// MAIN GENERATOR
// ============================================

async function generateSocialPosts(
  input: SocialGenerationInput
): Promise<SocialPostDraft[]> {
  const drafts: SocialPostDraft[] = []

  // Extract content from source
  let title = ''
  let content = ''
  let excerpt = ''
  let keyTakeaways: string[] = []
  let tags: string[] = []

  if (input.sourceId) {
    // Try loading from drafts first
    const source = loadSourceContent(input.sourceId)

    if (source) {
      if (source.type === 'BLOG_POST') {
        const blog = source as BlogDraft
        title = blog.frontmatter.title
        excerpt = blog.frontmatter.excerpt
        content = blog.content
        keyTakeaways = blog.frontmatter.keyTakeaways
        tags = blog.frontmatter.tags
      } else if (source.type === 'NEWS_ARTICLE') {
        const news = source as NewsDraft
        title = news.frontmatter.headline
        excerpt = news.frontmatter.summary
        content = news.content
        keyTakeaways = news.keyUpdates
        tags = news.frontmatter.tags
      }
    } else {
      // Try loading published blog by slug
      const published = loadPublishedBlog(input.sourceId)
      if (published) {
        title = published.title
        excerpt = published.excerpt
        content = published.content
        keyTakeaways = ['[Extract key points from content]']
        tags = ['NEET', 'Biology']
      }
    }
  }

  if (!title && input.sourceSummary) {
    title = 'NEET Biology Tips'
    excerpt = input.sourceSummary
    content = input.sourceSummary
    keyTakeaways = input.sourceSummary.split('.').filter((s) => s.trim()).slice(0, 5)
    tags = ['NEET', 'Biology']
  }

  if (!title) {
    throw new Error('No source content found. Provide --source <draft-id> or --summary <text>')
  }

  // Generate content for each platform
  for (const platform of input.platforms) {
    const id = generateId()
    const now = new Date().toISOString()

    let postContent: SocialPostContent = {}

    switch (platform) {
      case 'twitter':
        postContent.thread = generateTwitterThread(title, content, keyTakeaways, tags)
        break

      case 'linkedin':
        postContent.longFormPost = generateLinkedInPost(title, excerpt, keyTakeaways, tags)
        break

      case 'instagram': {
        const insta = generateInstagramCaption(title, excerpt, keyTakeaways, tags)
        postContent.caption = insta.caption
        postContent.hashtags = insta.hashtags
        break
      }

      case 'whatsapp':
        postContent.broadcastMessage = generateWhatsAppBroadcast(title, excerpt, keyTakeaways)
        break

      default:
        continue
    }

    const draft: SocialPostDraft = {
      id,
      type: 'SOCIAL_POST',
      status: 'draft',
      priority: 'normal',
      createdAt: now,
      updatedAt: now,
      generatedBy: 'claude',
      platform,
      sourceContentId: input.sourceId,
      content: postContent,
    }

    drafts.push(draft)
  }

  return drafts
}

// ============================================
// CLI HANDLER
// ============================================

async function main() {
  const args = parseArgs()

  logHeader('Social Media Repurposer')

  // Get source
  const sourceId =
    (args.source as string) ||
    (args.blog as string) ||
    (args.news as string) ||
    (args.positional as string)

  const summary = args.summary as string

  if (!sourceId && !summary) {
    log('Error: Source content required', 'red')
    log('Usage:', 'yellow')
    log('  npm run seo:social --source draft-123', 'cyan')
    log('  npm run seo:social --blog human-reproduction', 'cyan')
    log('  npm run seo:social --summary "Your content summary"', 'cyan')
    process.exit(1)
  }

  // Get platforms
  const platformsArg = (args.platforms as string) || 'all'
  let platforms: SocialPlatform[]

  if (platformsArg === 'all') {
    platforms = ['twitter', 'linkedin', 'instagram', 'whatsapp']
  } else {
    platforms = platformsArg.split(',').map((p) => p.trim()) as SocialPlatform[]
  }

  log(`Source: ${sourceId || 'custom summary'}`, 'blue')
  log(`Platforms: ${platforms.join(', ')}`, 'blue')
  console.log('')

  try {
    const input: SocialGenerationInput = {
      sourceType: summary ? 'custom' : sourceId?.startsWith('news') ? 'news' : 'blog',
      sourceId: sourceId || undefined,
      sourceSummary: summary || undefined,
      platforms,
      tone: (args.tone as any) || 'educational',
    }

    const drafts = await generateSocialPosts(input)

    if (drafts.length === 0) {
      log('No drafts generated. Check source content.', 'red')
      process.exit(1)
    }

    // Save all drafts
    const savedPaths: string[] = []
    for (const draft of drafts) {
      const filePath = saveDraft(draft.id, draft)
      savedPaths.push(filePath)
    }

    log('✅ Social media drafts created!', 'green')
    console.log('')

    for (const draft of drafts) {
      const platformEmoji: Record<SocialPlatform, string> = {
        twitter: '🐦',
        linkedin: '💼',
        instagram: '📸',
        whatsapp: '💬',
        youtube: '🎬',
      }

      log(`${platformEmoji[draft.platform]} ${draft.platform.toUpperCase()}`, 'bright')
      log(`   ID: ${draft.id}`, 'cyan')

      // Show preview
      if (draft.content.thread) {
        log(`   Thread: ${draft.content.thread.length} tweets`, 'cyan')
        log(`   Preview: "${draft.content.thread[0].substring(0, 80)}..."`, 'cyan')
      }
      if (draft.content.longFormPost) {
        log(`   Post: ${draft.content.longFormPost.length} chars`, 'cyan')
      }
      if (draft.content.caption) {
        log(`   Caption: ${draft.content.caption.length} chars`, 'cyan')
        log(`   Hashtags: ${draft.content.hashtags?.length || 0}`, 'cyan')
      }
      if (draft.content.broadcastMessage) {
        log(`   Broadcast: ${draft.content.broadcastMessage.length} chars`, 'cyan')
      }
      console.log('')
    }

    log('═'.repeat(60), 'yellow')
    log('  NEXT STEPS', 'bright')
    log('═'.repeat(60), 'yellow')
    console.log('')
    log('1. Review drafts in content/drafts/social/', 'blue')
    log('2. Edit content as needed', 'blue')
    log('3. Copy to respective platforms', 'blue')
    console.log('')

    // Show sample content
    log('═'.repeat(60), 'magenta')
    log('  SAMPLE CONTENT PREVIEW', 'bright')
    log('═'.repeat(60), 'magenta')
    console.log('')

    for (const draft of drafts) {
      log(`--- ${draft.platform.toUpperCase()} ---`, 'bright')
      if (draft.content.thread) {
        console.log(draft.content.thread.slice(0, 2).join('\n\n'))
        log('... [more tweets in draft file]', 'cyan')
      }
      if (draft.content.longFormPost) {
        console.log(draft.content.longFormPost.substring(0, 500) + '...')
      }
      if (draft.content.caption) {
        console.log(draft.content.caption)
      }
      if (draft.content.broadcastMessage) {
        console.log(draft.content.broadcastMessage)
      }
      console.log('')
    }
  } catch (error) {
    log(`Error: ${error}`, 'red')
    process.exit(1)
  }
}

// Show help if no arguments
if (process.argv.length <= 2) {
  logHeader('Social Media Repurposer - Help')
  console.log(`
${colors.bright}REPURPOSE BLOG POSTS${colors.reset}
  npm run seo:social --source draft-123-abc
  npm run seo:social --blog human-reproduction
  npm run seo:social --blog neet-syllabus-guide

${colors.bright}REPURPOSE NEWS ARTICLES${colors.reset}
  npm run seo:social --news draft-456-xyz

${colors.bright}FROM CUSTOM SUMMARY${colors.reset}
  npm run seo:social --summary "NEET 2026 dates announced by NTA"

${colors.bright}SELECT PLATFORMS${colors.reset}
  npm run seo:social --source draft-123 --platforms twitter
  npm run seo:social --source draft-123 --platforms twitter,linkedin
  npm run seo:social --source draft-123 --platforms all

${colors.bright}OPTIONS${colors.reset}
  --source      Draft ID to repurpose
  --blog        Blog slug (published or draft)
  --news        News draft ID
  --summary     Custom content summary
  --platforms   twitter, linkedin, instagram, whatsapp, all
  --tone        educational, professional, casual, urgent

${colors.bright}OUTPUT${colors.reset}
  Drafts saved to: content/drafts/social/
  Review before posting to platforms.

${colors.bright}EXAMPLE WORKFLOW${colors.reset}
  1. Generate blog: npm run seo:blog "Cell Division"
  2. Review and publish blog
  3. Repurpose: npm run seo:social --blog cell-division
  4. Review social drafts
  5. Copy to Twitter/LinkedIn/Instagram
`)
  process.exit(0)
}

main().catch(console.error)
