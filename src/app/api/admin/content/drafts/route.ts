import { NextRequest, NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'
import { getFirebaseAdmin } from '@/lib/firebase/admin'

type DraftStatus = 'draft' | 'in_review' | 'approved' | 'rejected' | 'published' | 'archived'

interface DraftItem {
  id: string
  type: string
  status: DraftStatus
  priority: string
  createdAt: string
  updatedAt: string
  title: string
  excerpt?: string
  author?: string
  wordCount?: number
  tags?: string[]
}

async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  // SECURITY: Auth bypass only works in non-production environments
  // Using server-side env var (not NEXT_PUBLIC_) to prevent client exposure
  if (process.env.BYPASS_CRM_AUTH === 'true' && process.env.NODE_ENV !== 'production') {
    console.log('[DEV MODE] Bypassing admin auth for drafts API (non-production only)')
    return true
  }

  // Warn if bypass is attempted in production
  if (process.env.BYPASS_CRM_AUTH === 'true' && process.env.NODE_ENV === 'production') {
    console.error('[SECURITY WARNING] BYPASS_CRM_AUTH is set in production but ignored')
  }

  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return false
    }

    const token = authHeader.split('Bearer ')[1]
    const admin = await getFirebaseAdmin()
    await admin.auth().verifyIdToken(token)
    return true
  } catch {
    return false
  }
}

function getDraftsFromFileSystem(): DraftItem[] {
  const draftsDir = path.join(process.cwd(), 'content', 'drafts')
  const drafts: DraftItem[] = []

  const subDirs = ['blog', 'news', 'landing', 'social', 'leads']

  for (const subDir of subDirs) {
    const dirPath = path.join(draftsDir, subDir)
    if (!fs.existsSync(dirPath)) continue

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'))
    for (const file of files) {
      const filePath = path.join(dirPath, file)
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        const frontmatter = content.frontmatter || {}

        drafts.push({
          id: content.id,
          type: content.type,
          status: content.status,
          priority: content.priority || 'normal',
          createdAt: content.createdAt,
          updatedAt: content.updatedAt,
          title: frontmatter.title || content.keyword || 'Untitled',
          excerpt: frontmatter.excerpt || frontmatter.summary,
          author: frontmatter.author?.name,
          wordCount: content.wordCount,
          tags: frontmatter.tags,
        })
      } catch {
        // Skip invalid files
      }
    }
  }

  return drafts.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

function findDraftFile(draftId: string): string | null {
  const draftsDir = path.join(process.cwd(), 'content', 'drafts')
  const subDirs = ['blog', 'news', 'landing', 'social', 'leads']

  for (const subDir of subDirs) {
    const dirPath = path.join(draftsDir, subDir)
    if (!fs.existsSync(dirPath)) continue

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'))
    for (const file of files) {
      const filePath = path.join(dirPath, file)
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        if (content.id === draftId) {
          return filePath
        }
      } catch {
        continue
      }
    }
  }

  return null
}

function updateDraftStatus(draftId: string, newStatus: DraftStatus): boolean {
  const filePath = findDraftFile(draftId)
  if (!filePath) return false

  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    content.status = newStatus
    content.updatedAt = new Date().toISOString()
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
    return true
  } catch {
    return false
  }
}

function publishDraft(draftId: string): { success: boolean; error?: string; path?: string } {
  const filePath = findDraftFile(draftId)
  if (!filePath) return { success: false, error: 'Draft not found' }

  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    if (content.status !== 'approved' && content.status !== 'draft') {
      return { success: false, error: `Cannot publish draft with status: ${content.status}` }
    }

    if (content.type === 'BLOG_POST') {
      const draft = content
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
${frontmatter.keyTakeaways.map((t: string) => `  - "${t}"`).join('\n')}
---

${draft.content}
`

      const blogDir = path.join(process.cwd(), 'content', 'blog')
      const blogPath = path.join(blogDir, `${frontmatter.slug}.mdx`)

      fs.writeFileSync(blogPath, mdxContent)

      // Update draft status
      draft.status = 'published'
      draft.updatedAt = new Date().toISOString()
      fs.writeFileSync(filePath, JSON.stringify(draft, null, 2))

      return { success: true, path: blogPath }
    }

    return { success: false, error: `Publishing ${content.type} not yet implemented` }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}

export async function GET(request: NextRequest) {
  try {
    const isAuthed = await verifyAdminAuth(request)
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const drafts = getDraftsFromFileSystem()
    return NextResponse.json({ drafts })
  } catch (error) {
    console.error('Error fetching drafts:', error)
    return NextResponse.json({ error: 'Failed to fetch drafts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthed = await verifyAdminAuth(request)
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { draftId, action } = body

    if (!draftId || !action) {
      return NextResponse.json({ error: 'Missing draftId or action' }, { status: 400 })
    }

    switch (action) {
      case 'approve': {
        const success = updateDraftStatus(draftId, 'approved')
        return NextResponse.json({ success })
      }
      case 'reject': {
        const success = updateDraftStatus(draftId, 'rejected')
        return NextResponse.json({ success })
      }
      case 'publish': {
        const result = publishDraft(draftId)
        return NextResponse.json(result)
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing action:', error)
    return NextResponse.json({ error: 'Failed to process action' }, { status: 500 })
  }
}
