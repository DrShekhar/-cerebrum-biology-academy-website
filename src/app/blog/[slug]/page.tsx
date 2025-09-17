import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blog'
import { BlogPostPage } from '@/components/blog/BlogPostPage'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.featuredImage],
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((post) => post.slug === slug)

  if (!post || !post.isPublished) {
    notFound()
  }

  return <BlogPostPage post={post} />
}
