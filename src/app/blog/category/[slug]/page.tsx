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
    title: `${category.name} - NEET Biology Blog | Cerebrum Biology Academy`,
    description: `${category.description}. Read our latest articles on ${category.name.toLowerCase()} for NEET preparation.`,
    openGraph: {
      title: `${category.name} - NEET Biology Blog`,
      description: category.description,
      type: 'website',
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/blog/category/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(blogCategories).map((slug) => ({
    slug,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = getPostsByCategory(slug)

  return <CategoryArchivePage category={category} posts={posts} />
}
