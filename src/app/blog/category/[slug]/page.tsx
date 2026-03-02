import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategoryBySlug, blogCategories } from '@/lib/blog/mdx'
import { CategoryArchivePage } from '@/components/blog/CategoryArchivePage'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Biology Blog | Cerebrum Academy`,
    description: `Read expert articles about ${category.name.toLowerCase()}. Latest biology tips, NEET preparation guides, and study strategies from Cerebrum Biology Academy.`,
    openGraph: {
      title: `${category.name} - Biology Blog | Cerebrum Academy`,
      description: `Read expert articles about ${category.name.toLowerCase()}. Latest biology tips, NEET preparation guides, and study strategies from Cerebrum Biology Academy.`,
      type: 'website',
      url: `https://cerebrumbiologyacademy.com/blog/category/${slug}`,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/blog/category/${slug}`,
    },
    robots: { index: false, follow: true },
  }
}

export async function generateStaticParams() {
  return Object.keys(blogCategories).map((slug) => ({
    slug,
  }))
}

// Return 404 for any slug not in generateStaticParams
export const dynamicParams = false

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = getPostsByCategory(slug)

  return <CategoryArchivePage category={category} posts={posts} />
}
