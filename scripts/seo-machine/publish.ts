#!/usr/bin/env npx tsx
/**
 * SEO Marketing Machine - Content Publisher CLI
 *
 * Usage:
 *   npm run seo:publish --id draft-123456
 *   npm run seo:publish --all-approved
 *   npm run seo:review
 *
 * Manages the draft review and publishing workflow.
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  BlogDraft,
  NewsDraft,
  SEOLandingDraft,
  DraftStatus,
  SEOContentType,
  DEFAULT_CONFIG,
} from '../../src/lib/seo-marketing/types'

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
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

interface DraftFile {
  path: string
  type: string
  draft: BlogDraft | NewsDraft | SEOLandingDraft
}

// Get all draft files
function getDrafts(): DraftFile[] {
  const draftsDir = path.join(process.cwd(), DEFAULT_CONFIG.draftsDir)
  const drafts: DraftFile[] = []

  const subDirs = ['blog', 'news', 'landing', 'social', 'leads']

  for (const subDir of subDirs) {
    const dirPath = path.join(draftsDir, subDir)
    if (!fs.existsSync(dirPath)) continue

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.json'))
    for (const file of files) {
      const filePath = path.join(dirPath, file)
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        drafts.push({
          path: filePath,
          type: subDir,
          draft: content,
        })
      } catch (e) {
        // Skip invalid files
      }
    }
  }

  return drafts.sort(
    (a, b) => new Date(b.draft.createdAt).getTime() - new Date(a.draft.createdAt).getTime()
  )
}

// List all drafts
function listDrafts(statusFilter?: DraftStatus) {
  const drafts = getDrafts()

  if (drafts.length === 0) {
    log('No drafts found.', 'yellow')
    log('Create one with: npm run seo:blog "Your Topic"', 'gray')
    return
  }

  const filtered = statusFilter ? drafts.filter((d) => d.draft.status === statusFilter) : drafts

  logHeader(`Draft Queue (${filtered.length} items)`)

  // Group by status
  const byStatus: Record<string, DraftFile[]> = {}
  for (const d of filtered) {
    const status = d.draft.status
    if (!byStatus[status]) byStatus[status] = []
    byStatus[status].push(d)
  }

  const statusOrder: DraftStatus[] = [
    'draft',
    'in_review',
    'approved',
    'rejected',
    'published',
    'archived',
  ]

  for (const status of statusOrder) {
    const items = byStatus[status]
    if (!items || items.length === 0) continue

    const statusColor: Record<DraftStatus, keyof typeof colors> = {
      draft: 'yellow',
      in_review: 'blue',
      approved: 'green',
      rejected: 'red',
      published: 'gray',
      archived: 'gray',
    }

    log(`\n  ${status.toUpperCase()} (${items.length})`, statusColor[status])
    log('  ' + '─'.repeat(40), 'gray')

    for (const item of items) {
      const d = item.draft
      const title = 'frontmatter' in d ? d.frontmatter.title : (d as SEOLandingDraft).keyword
      const priority = d.priority === 'urgent' ? '⚡' : d.priority === 'high' ? '🔥' : ''
      const age = getAge(d.createdAt)

      console.log(`  ${colors.cyan}${d.id}${colors.reset}`)
      console.log(`    ${priority} ${title}`)
      console.log(`    ${colors.gray}Type: ${item.type} | Created: ${age}${colors.reset}`)
    }
  }

  console.log('')
  log('Commands:', 'bright')
  log('  npm run seo:publish --id <draft-id>    Publish a draft', 'gray')
  log('  npm run seo:approve --id <draft-id>    Approve a draft', 'gray')
  log('  npm run seo:reject --id <draft-id>     Reject a draft', 'gray')
  console.log('')
}

function getAge(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// Update draft status
function updateDraftStatus(draftId: string, newStatus: DraftStatus): boolean {
  const drafts = getDrafts()
  const draftFile = drafts.find((d) => d.draft.id === draftId)

  if (!draftFile) {
    log(`Draft not found: ${draftId}`, 'red')
    return false
  }

  draftFile.draft.status = newStatus
  draftFile.draft.updatedAt = new Date().toISOString()

  fs.writeFileSync(draftFile.path, JSON.stringify(draftFile.draft, null, 2))
  log(`✅ Draft ${draftId} marked as ${newStatus}`, 'green')
  return true
}

// Publish a blog draft
function publishBlogDraft(draftFile: DraftFile): boolean {
  const draft = draftFile.draft as BlogDraft

  // Check if content has been filled
  if (draft.content.includes('[CONTENT STARTS HERE')) {
    log('⚠️  Draft content not filled. Generate content with Claude first.', 'yellow')
    log('Copy the prompt from the draft file and paste to Claude.', 'gray')
    return false
  }

  // Generate MDX file
  const frontmatter = draft.frontmatter
  frontmatter.isPublished = true
  frontmatter.publishedAt = new Date().toISOString().split('T')[0]

  const mdxContent = `---
title: "${frontmatter.title}"
slug: ${frontmatter.slug}
excerpt: "${frontmatter.excerpt}"
author:
  name: "${frontmatter.author.name}"
  role: "${frontmatter.author.role}"
category: ${frontmatter.category}
tags: ${JSON.stringify(frontmatter.tags)}
featuredImage: "${frontmatter.featuredImage}"
publishedAt: "${frontmatter.publishedAt}"
updatedAt: "${frontmatter.updatedAt}"
readTime: ${frontmatter.readTime}
isPublished: true
seoTitle: "${frontmatter.seoTitle}"
seoDescription: "${frontmatter.seoDescription}"
views: 0
difficulty: "${frontmatter.difficulty}"
neetChapter: "${frontmatter.neetChapter || ''}"
neetWeightage: "${frontmatter.neetWeightage || 'Medium'}"
targetAudience: "${frontmatter.targetAudience}"
keyTakeaways:
${frontmatter.keyTakeaways.map((t) => `  - "${t}"`).join('\n')}
---

${draft.content}
`

  // Save to blog directory
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const blogPath = path.join(blogDir, `${frontmatter.slug}.mdx`)

  fs.writeFileSync(blogPath, mdxContent)
  log(`✅ Blog published: ${blogPath}`, 'green')

  // Update draft status
  draft.status = 'published'
  draft.updatedAt = new Date().toISOString()
  fs.writeFileSync(draftFile.path, JSON.stringify(draft, null, 2))

  return true
}

// Publish a news draft
function publishNewsDraft(draftFile: DraftFile): boolean {
  const draft = draftFile.draft as NewsDraft

  if (draft.content.includes('[NEWS CONTENT STARTS HERE')) {
    log('⚠️  News content not filled. Generate content with Claude first.', 'yellow')
    return false
  }

  const fm = draft.frontmatter
  fm.isPublished = true
  fm.publishedAt = new Date().toISOString().split('T')[0]

  const mdxContent = `---
title: "${fm.title}"
slug: ${fm.slug}
excerpt: "${fm.summary}"
author:
  name: "${fm.author.name}"
  role: "${fm.author.role}"
category: ${fm.category}
tags: ${JSON.stringify(fm.tags)}
featuredImage: "${fm.featuredImage}"
publishedAt: "${fm.publishedAt}"
updatedAt: "${fm.updatedAt}"
readTime: ${fm.readTime}
isPublished: true
seoTitle: "${fm.seoTitle}"
seoDescription: "${fm.seoDescription}"
difficulty: "Beginner"
targetAudience: "Student"
keyTakeaways:
${draft.keyUpdates.map((u) => `  - "${u}"`).join('\n')}
---

${draft.content}

## What Students Should Do

${draft.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Student Impact

${draft.studentImpact}

---

*Stay updated with the latest NEET news. [Join our WhatsApp group](https://wa.me/${DEFAULT_CONFIG.whatsappNumber.replace('+', '')}) for instant updates.*
`

  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const blogPath = path.join(blogDir, `${fm.slug}.mdx`)

  fs.writeFileSync(blogPath, mdxContent)
  log(`✅ News article published: ${blogPath}`, 'green')

  draft.status = 'published'
  draft.updatedAt = new Date().toISOString()
  fs.writeFileSync(draftFile.path, JSON.stringify(draft, null, 2))

  return true
}

// Publish an SEO landing page draft
function publishSEOLandingDraft(draftFile: DraftFile): boolean {
  const draft = draftFile.draft as SEOLandingDraft

  if (!draft.pageData.hero.headline || draft.pageData.hero.headline.includes('[')) {
    log('⚠️  SEO landing page not filled. Generate content with Claude first.', 'yellow')
    return false
  }

  // Save to SEO data directory
  const seoDir = path.join(process.cwd(), 'src', 'data', 'seo-landing', 'generated')
  if (!fs.existsSync(seoDir)) {
    fs.mkdirSync(seoDir, { recursive: true })
  }

  const seoPath = path.join(seoDir, `${draft.pageData.slug}.ts`)

  const tsContent = `// Auto-generated SEO Landing Page
// Keyword: ${draft.keyword}
// Generated: ${new Date().toISOString()}

import { SEOLandingContent } from '../types'

export const ${camelCase(draft.pageData.slug)}Content: SEOLandingContent = ${JSON.stringify(draft.pageData, null, 2)}
`

  fs.writeFileSync(seoPath, tsContent)
  log(`✅ SEO landing page published: ${seoPath}`, 'green')

  draft.status = 'published'
  draft.updatedAt = new Date().toISOString()
  fs.writeFileSync(draftFile.path, JSON.stringify(draft, null, 2))

  return true
}

function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

// Main publish function
function publishDraft(draftId: string): boolean {
  const drafts = getDrafts()
  const draftFile = drafts.find((d) => d.draft.id === draftId)

  if (!draftFile) {
    log(`Draft not found: ${draftId}`, 'red')
    return false
  }

  const draft = draftFile.draft

  // Check status
  if (draft.status !== 'approved' && draft.status !== 'draft') {
    log(`Cannot publish draft with status: ${draft.status}`, 'red')
    log('Draft must be "approved" or "draft" to publish.', 'yellow')
    return false
  }

  logHeader(`Publishing: ${draftId}`)

  switch (draft.type) {
    case 'BLOG_POST':
      return publishBlogDraft(draftFile)
    case 'NEWS_ARTICLE':
      return publishNewsDraft(draftFile)
    case 'SEO_LANDING_PAGE':
      return publishSEOLandingDraft(draftFile)
    default:
      log(`Unknown draft type: ${(draft as { type: string }).type}`, 'red')
      return false
  }
}

// Publish all approved drafts
function publishAllApproved(): number {
  const drafts = getDrafts().filter((d) => d.draft.status === 'approved')

  if (drafts.length === 0) {
    log('No approved drafts to publish.', 'yellow')
    return 0
  }

  let published = 0
  for (const draftFile of drafts) {
    if (publishDraft(draftFile.draft.id)) {
      published++
    }
  }

  return published
}

// Parse command line arguments
function parseArgs(): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {}
  const argv = process.argv.slice(2)

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg.startsWith('--')) {
      const key = arg.substring(2).replace(/-/g, '_')
      const nextArg = argv[i + 1]
      if (nextArg && !nextArg.startsWith('--')) {
        args[key] = nextArg
        i++
      } else {
        args[key] = true
      }
    }
  }

  return args
}

// Main CLI handler
async function main() {
  const args = parseArgs()

  if (args.help || Object.keys(args).length === 0) {
    logHeader('SEO Marketing Machine - Publisher')
    console.log(`
${colors.bright}LIST DRAFTS${colors.reset}
  npm run seo:review                    List all drafts
  npm run seo:review --status draft     Filter by status

${colors.bright}MANAGE DRAFTS${colors.reset}
  npm run seo:approve --id <draft-id>   Approve for publishing
  npm run seo:reject --id <draft-id>    Reject draft

${colors.bright}PUBLISH${colors.reset}
  npm run seo:publish --id <draft-id>   Publish specific draft
  npm run seo:publish --all-approved    Publish all approved

${colors.bright}STATUSES${colors.reset}
  draft       → Generated, awaiting content
  in_review   → Content ready, being reviewed
  approved    → Ready to publish
  rejected    → Needs revision
  published   → Live on site
  archived    → No longer relevant
`)
    return
  }

  // Handle review
  if (args.review || process.argv[1].includes('review')) {
    listDrafts(args.status as DraftStatus)
    return
  }

  // Handle approve
  if (args.approve) {
    if (!args.id) {
      log('Error: --id required', 'red')
      return
    }
    updateDraftStatus(args.id as string, 'approved')
    return
  }

  // Handle reject
  if (args.reject) {
    if (!args.id) {
      log('Error: --id required', 'red')
      return
    }
    updateDraftStatus(args.id as string, 'rejected')
    return
  }

  // Handle publish all approved
  if (args.all_approved) {
    const count = publishAllApproved()
    log(`Published ${count} drafts.`, 'green')
    return
  }

  // Handle single publish
  if (args.id) {
    publishDraft(args.id as string)
    return
  }

  // Default: list drafts
  listDrafts()
}

main().catch(console.error)
