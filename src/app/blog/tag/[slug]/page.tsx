import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/blog/mdx'
import { TagArchivePage } from '@/components/blog/TagArchivePage'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tagName = decodeURIComponent(slug).replace(/-/g, ' ')
  const posts = getPostsByTag(tagName)

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `${tagName} - NEET Biology Blog | Cerebrum Biology Academy`,
    description: `Browse ${posts.length} articles tagged with "${tagName}" for NEET Biology preparation.`,
    openGraph: {
      title: `${tagName} - NEET Biology Blog`,
      description: `Articles tagged with ${tagName}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/blog/tag/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tagObj) => ({
    slug: tagObj.tag.toLowerCase().replace(/\s+/g, '-'),
  }))
}

// Return 404 for any slug not in generateStaticParams
export const dynamicParams = false

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const tagName = decodeURIComponent(slug).replace(/-/g, ' ')
  const posts = getPostsByTag(tagName)

  // Also try with original slug as tag name
  const postsAlt = posts.length === 0 ? getPostsByTag(slug) : posts

  if (postsAlt.length === 0) {
    notFound()
  }

  return <TagArchivePage tag={tagName} posts={postsAlt} />
}
