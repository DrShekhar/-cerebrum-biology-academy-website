import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getCategoryBySlug } from '@/lib/blog/mdx'
import { BlogPostPage } from '@/components/blog/BlogPostPage'
import { BreadcrumbSchema, COMMON_BREADCRUMBS, HowToSchema } from '@/components/seo'
import { TechArticleSchema } from '@/components/seo/TechArticleSchema'
import { HOWTO_CONFIGS } from '@/data/howto-schemas'

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
      {/* Breadcrumb Schema (SEO only, no visual — BlogCategoryNav handles navigation) */}
      <BreadcrumbSchema items={COMMON_BREADCRUMBS.blog(meta.title)} showSchemaOnly />
      {/* Enhanced Article Schema for E-E-A-T + AEO + Rich Snippets */}
      <TechArticleSchema
        title={meta.title}
        description={meta.seoDescription || meta.excerpt}
        author={{
          name: meta.author.name,
          role: meta.author.role || 'NEET Biology Expert',
          url: 'https://cerebrumbiologyacademy.com/faculty',
        }}
        publishedAt={meta.publishedAt}
        updatedAt={meta.updatedAt || meta.publishedAt}
        featuredImage={meta.featuredImage}
        url={`https://cerebrumbiologyacademy.com/blog/${slug}`}
        category={category?.name || meta.category}
        tags={meta.tags}
        readTime={meta.readTime}
        wordCount={meta.readTime ? meta.readTime * 200 : undefined}
        articleType="BlogPosting"
        educationalLevel={meta.targetAudience?.includes('Class 11') ? 'Class 11' : 'Class 12'}
        teaches={meta.keyTakeaways || ['NEET Biology']}
        learningResourceType="Blog Post"
        proficiencyLevel={meta.difficulty === 'beginner' ? 'Beginner' : meta.difficulty === 'advanced' ? 'Advanced' : 'Intermediate'}
      />
      {/* HowTo Schema for preparation guide posts - Google rich snippet eligibility */}
      {HOWTO_CONFIGS[slug] && (
        <HowToSchema
          name={HOWTO_CONFIGS[slug].name}
          description={HOWTO_CONFIGS[slug].description}
          steps={HOWTO_CONFIGS[slug].steps}
          totalTime={HOWTO_CONFIGS[slug].totalTime}
          image={meta.featuredImage}
          url={`https://cerebrumbiologyacademy.com/blog/${slug}`}
        />
      )}
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
