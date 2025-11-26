import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getCategoryBySlug } from '@/lib/blog/mdx'
import { BlogPostPage } from '@/components/blog/BlogPostPage'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const postData = getPostBySlug(slug)

  if (!postData) {
    return {
      title: 'Article Not Found',
    }
  }

  const { meta } = postData
  const category = getCategoryBySlug(meta.category)

  return {
    title: meta.seoTitle || meta.title,
    description: meta.seoDescription || meta.excerpt,
    keywords: meta.tags.join(', '),
    authors: [{ name: meta.author.name }],
    openGraph: {
      title: meta.seoTitle || meta.title,
      description: meta.seoDescription || meta.excerpt,
      images: [meta.featuredImage],
      type: 'article',
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      authors: [meta.author.name],
      tags: meta.tags,
      section: category?.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.seoTitle || meta.title,
      description: meta.seoDescription || meta.excerpt,
      images: [meta.featuredImage],
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/blog/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const postData = getPostBySlug(slug)

  if (!postData || !postData.meta.isPublished) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)
  const category = getCategoryBySlug(postData.meta.category)

  return (
    <BlogPostPage
      meta={postData.meta}
      content={postData.content}
      toc={postData.toc}
      relatedPosts={relatedPosts}
      category={category}
    />
  )
}
