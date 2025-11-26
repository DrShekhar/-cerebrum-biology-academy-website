export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
export type NEETWeightage = 'High' | 'Medium' | 'Low'
export type TargetAudience = 'Student' | 'Parent' | 'Both'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    role: string
    image: string
  }
  category: BlogCategory
  tags: string[]
  featuredImage: string
  publishedAt: string
  updatedAt: string
  readTime: number
  isPublished: boolean
  seoTitle?: string
  seoDescription?: string
  views?: number
  difficulty?: Difficulty
  neetChapter?: string
  neetWeightage?: NEETWeightage
  targetAudience?: TargetAudience
  keyTakeaways?: string[]
  relatedPosts?: string[]
}

export interface BlogPostMeta {
  title: string
  slug: string
  excerpt: string
  author: {
    name: string
    role: string
    image?: string
  }
  category: string
  tags: string[]
  featuredImage?: string
  publishedAt: string
  updatedAt?: string
  readTime?: number
  isPublished?: boolean
  seoTitle?: string
  seoDescription?: string
  views?: number
  difficulty?: Difficulty
  neetChapter?: string
  neetWeightage?: NEETWeightage
  targetAudience?: TargetAudience
  keyTakeaways?: string[]
  relatedPosts?: string[]
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
}

export interface BlogStats {
  totalPosts: number
  totalViews: number
  totalReads: number
  avgReadTime: number
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
}
