import Link from 'next/link'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'

interface BlogPost {
  title: string
  slug: string
  category: 'neet-preparation' | 'study-tips' | 'neet-coaching' | 'chapter-guides'
  readTime: number
  excerpt: string
}

interface BlogRecapWidgetProps {
  variant?: 'compact' | 'full'
  category?: string
}

// Hardcoded top posts data for internal blog cross-promotion
const TOP_BLOG_POSTS: BlogPost[] = [
  {
    title: 'NEET Biology Chapter-Wise Weightage 2026',
    slug: '/blog/neet-biology-chapter-wise-weightage-2026-advanced',
    category: 'chapter-guides',
    readTime: 8,
    excerpt: 'Complete breakdown of NEET Biology chapter weightage and difficulty analysis.',
  },
  {
    title: 'How to Score 340+ in NEET Biology',
    slug: '/blog/how-to-score-340-plus-in-neet-biology-expert-strategy',
    category: 'study-tips',
    readTime: 12,
    excerpt: 'Expert strategies and time management tips to ace NEET Biology.',
  },
  {
    title: 'Best NEET Coaching in Delhi NCR 2026',
    slug: '/blog/best-neet-coaching-delhi-ncr-2026-comparison',
    category: 'neet-coaching',
    readTime: 15,
    excerpt: 'Detailed comparison of top NEET coaching centers in Delhi NCR.',
  },
  {
    title: 'NEET Dropper Year Complete Guide 2026',
    slug: '/blog/neet-dropper-year-complete-guide-2026',
    category: 'study-tips',
    readTime: 14,
    excerpt: 'Everything you need to know about taking a gap year for NEET preparation.',
  },
  {
    title: 'CBSE Biology Board Exam Prep 2026',
    slug: '/blog/cbse-biology-board-exam-preparation-2026',
    category: 'study-tips',
    readTime: 10,
    excerpt: 'Comprehensive preparation strategy for CBSE Board Biology exam.',
  },
  {
    title: '100+ Biology Mnemonics for NEET',
    slug: '/blog/biology-mnemonics-neet-preparation',
    category: 'study-tips',
    readTime: 9,
    excerpt: 'Essential mnemonics to memorize complex biological concepts easily.',
  },
  {
    title: 'NEET Biology PYQ Analysis 2019-2025',
    slug: '/blog/neet-biology-previous-year-questions-analysis',
    category: 'neet-preparation',
    readTime: 11,
    excerpt: 'In-depth analysis of previous year NEET Biology questions and patterns.',
  },
  {
    title: 'Online vs Offline NEET Coaching 2026',
    slug: '/blog/online-vs-offline-neet-coaching-2026',
    category: 'neet-coaching',
    readTime: 7,
    excerpt: 'Compare pros and cons of online and offline NEET coaching options.',
  },
  {
    title: '50 Must-Practice NEET Biology Diagrams',
    slug: '/blog/neet-biology-diagrams-practice-guide',
    category: 'chapter-guides',
    readTime: 13,
    excerpt: 'Collection of important biology diagrams that frequently appear in NEET.',
  },
  {
    title: 'NEET 2026 Exam Pattern & Changes',
    slug: '/blog/neet-2026-exam-pattern-changes',
    category: 'neet-preparation',
    readTime: 6,
    excerpt: 'Latest NEET 2026 exam pattern, marking scheme, and important updates.',
  },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'neet-preparation': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  'study-tips': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  'neet-coaching': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  'chapter-guides': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
}

function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    'neet-preparation': 'NEET Prep',
    'study-tips': 'Study Tips',
    'neet-coaching': 'Coaching',
    'chapter-guides': 'Chapter Guide',
  }
  return labels[cat] || cat
}

export function BlogRecapWidget({ variant = 'full', category }: BlogRecapWidgetProps) {
  // Filter posts by category if provided
  const filteredPosts = category
    ? TOP_BLOG_POSTS.filter((post) => post.category === category).slice(0, 6)
    : TOP_BLOG_POSTS.slice(0, 6)

  if (filteredPosts.length === 0) {
    return null
  }

  // Compact variant: simple list with minimal styling
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <BookOpen className="w-5 h-5 mr-2 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recommended Reading</h3>
        </div>

        <ul className="space-y-3">
          {filteredPosts.map((post, index) => (
            <li key={index} className="group">
              <Link
                href={post.slug}
                className="flex items-start justify-between p-3 rounded-lg hover:bg-white transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors text-sm leading-snug">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{post.readTime} min read</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 flex-shrink-0 ml-2 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Full variant: card layout with excerpts
  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center mb-2">
            <BookOpen className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Blog Resources</h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Explore curated articles to enhance your NEET preparation journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => {
            const colors = CATEGORY_COLORS[post.category]
            return (
              <Link key={index} href={post.slug}>
                <article className="h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col group">
                  {/* Category badge */}
                  <div className={`px-4 pt-4 pb-2 ${colors.bg} border-b ${colors.border}`}>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.text} bg-white border ${colors.border}`}
                    >
                      {getCategoryLabel(post.category)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">{post.readTime} min</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors" />
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
