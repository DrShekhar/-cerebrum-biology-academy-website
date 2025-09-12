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
