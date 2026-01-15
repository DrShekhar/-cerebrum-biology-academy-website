import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getCategoryBySlug } from '@/lib/blog/mdx'
import { BlogPostPage } from '@/components/blog/BlogPostPage'
import { BreadcrumbSchema, COMMON_BREADCRUMBS } from '@/components/seo'
import { ArticleSchema } from '@/components/seo/ContentFreshness'

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

// Return 404 for any slug not in generateStaticParams
export const dynamicParams = false

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const postData = getPostBySlug(slug)

  if (!postData || !postData.meta.isPublished) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)
  const category = getCategoryBySlug(postData.meta.category)
  const { meta } = postData

  return (
    <>
      {/* Breadcrumb Navigation + Schema */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <BreadcrumbSchema items={COMMON_BREADCRUMBS.blog(meta.title)} />
      </div>
      {/* Article Schema for E-E-A-T */}
      <ArticleSchema
        title={meta.title}
        description={meta.excerpt}
        datePublished={meta.publishedAt}
        dateModified={meta.updatedAt || meta.publishedAt}
        author={{ name: meta.author.name }}
        keywords={meta.tags}
      />
      <BlogPostPage
        meta={meta}
        content={postData.content}
        toc={postData.toc}
        relatedPosts={relatedPosts}
        category={category}
      />
    </>
  )
}
