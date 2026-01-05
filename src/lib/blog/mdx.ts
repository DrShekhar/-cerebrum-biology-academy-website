import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPostMeta, BlogCategory, TableOfContentsItem } from '@/types/blog'

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog')

// Generate realistic viral base views based on post characteristics
function generateViralBaseViews(slug: string, category: string, publishedAt: string): number {
  // Base viral count range: 100k - 500k
  const baseMin = 100000
  const baseMax = 500000

  // Use slug hash for consistent randomness
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i)
    hash = hash & hash
  }
  const seedRandom = Math.abs(hash) / 2147483647

  // Category multipliers (some topics are more popular)
  const categoryMultipliers: Record<string, number> = {
    'neet-preparation': 1.3,
    'biology-concepts': 1.1,
    'exam-updates': 1.4,
    'chapter-guides': 1.2,
    'study-tips': 1.0,
    'success-stories': 0.9,
    'ncert-analysis': 1.15,
    mnemonics: 1.05,
  }

  // Age bonus: older posts have more views
  const postDate = new Date(publishedAt)
  const now = new Date()
  const ageInDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24))
  const ageMultiplier = 1 + Math.min(ageInDays / 365, 2) * 0.5 // Up to 2x for 2+ year old posts

  const categoryMult = categoryMultipliers[category] || 1.0
  const baseViews = baseMin + seedRandom * (baseMax - baseMin)

  return Math.floor(baseViews * categoryMult * ageMultiplier)
}

export const blogCategories: Record<string, BlogCategory> = {
  'neet-preparation': {
    id: '1',
    name: 'NEET Preparation',
    slug: 'neet-preparation',
    description: 'Comprehensive guides and strategies for NEET exam preparation',
    color: 'bg-blue-100 text-blue-800',
  },
  'biology-concepts': {
    id: '2',
    name: 'Biology Concepts',
    slug: 'biology-concepts',
    description: 'Deep dives into important biology concepts for NEET',
    color: 'bg-green-100 text-green-800',
  },
  'study-tips': {
    id: '3',
    name: 'Study Tips',
    slug: 'study-tips',
    description: 'Effective study techniques and time management strategies',
    color: 'bg-purple-100 text-purple-800',
  },
  'success-stories': {
    id: '4',
    name: 'Success Stories',
    slug: 'success-stories',
    description: 'Inspiring stories from our successful NEET toppers',
    color: 'bg-yellow-100 text-yellow-800',
  },
  'exam-updates': {
    id: '5',
    name: 'Exam Updates',
    slug: 'exam-updates',
    description: 'Latest news and updates about NEET examination',
    color: 'bg-red-100 text-red-800',
  },
  'chapter-guides': {
    id: '6',
    name: 'Chapter Guides',
    slug: 'chapter-guides',
    description: 'Chapter-wise preparation guides for NEET Biology',
    color: 'bg-indigo-100 text-indigo-800',
  },
  'ncert-analysis': {
    id: '7',
    name: 'NCERT Analysis',
    slug: 'ncert-analysis',
    description: 'Line-by-line NCERT analysis for NEET preparation',
    color: 'bg-green-100 text-green-800',
  },
  mnemonics: {
    id: '8',
    name: 'Mnemonics & Shortcuts',
    slug: 'mnemonics',
    description: 'Memory tricks and shortcuts for quick revision',
    color: 'bg-pink-100 text-pink-800',
  },
  olympiad: {
    id: '9',
    name: 'Biology Olympiad',
    slug: 'olympiad',
    description: 'USABO, IBO, and Biology Olympiad preparation guides',
    color: 'bg-teal-100 text-teal-800',
  },
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return []
  }

  const files = fs.readdirSync(BLOG_CONTENT_PATH)
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): {
  meta: BlogPostMeta
  content: string
  toc: TableOfContentsItem[]
} | null {
  const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const stats = readingTime(content)
  const toc = extractTableOfContents(content)

  const meta: BlogPostMeta = {
    title: data.title || '',
    slug: data.slug || slug,
    excerpt: data.excerpt || '',
    author: data.author || { name: 'Cerebrum Biology Academy', role: 'Editorial Team' },
    category: data.category || 'neet-preparation',
    tags: data.tags || [],
    featuredImage: data.featuredImage || '/blog/default-featured.jpg',
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt || data.publishedAt || new Date().toISOString(),
    readTime: data.readTime || Math.ceil(stats.minutes),
    isPublished: data.isPublished !== false,
    seoTitle: data.seoTitle || data.title,
    seoDescription: data.seoDescription || data.excerpt,
    views: generateViralBaseViews(
      slug,
      data.category || 'neet-preparation',
      data.publishedAt || new Date().toISOString()
    ),
    difficulty: data.difficulty,
    neetChapter: data.neetChapter,
    neetWeightage: data.neetWeightage,
    targetAudience: data.targetAudience || 'Both',
    keyTakeaways: data.keyTakeaways || [],
    relatedPosts: data.relatedPosts || [],
  }

  return { meta, content, toc }
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs()

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      return post?.meta
    })
    .filter((post): post is BlogPostMeta => post !== null && post.isPublished !== false)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return posts
}

export function getPostsByCategory(categorySlug: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === categorySlug)
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostMeta[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug)

  const scored = allPosts.map((post) => {
    let score = 0

    if (post.category === currentPost.meta.category) {
      score += 10
    }

    const sharedTags = post.tags.filter((tag) => currentPost.meta.tags.includes(tag))
    score += sharedTags.length * 3

    if (post.difficulty === currentPost.meta.difficulty) {
      score += 2
    }

    if (post.neetChapter === currentPost.meta.neetChapter) {
      score += 5
    }

    return { post, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TableOfContentsItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    toc.push({ id, title, level })
  }

  return toc
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts()
  const tagCounts: Record<string, number> = {}

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getBlogStats(): {
  totalPosts: number
  totalViews: number
  avgReadTime: number
  categories: number
} {
  const posts = getAllPosts()

  return {
    totalPosts: posts.length,
    totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
    avgReadTime: Math.round(
      posts.reduce((sum, post) => sum + (post.readTime || 0), 0) / (posts.length || 1)
    ),
    categories: Object.keys(blogCategories).length,
  }
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories[slug]
}

export function getAllCategories(): BlogCategory[] {
  return Object.values(blogCategories)
}
