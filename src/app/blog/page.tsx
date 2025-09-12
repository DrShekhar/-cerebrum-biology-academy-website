import { Metadata } from 'next'
import { BlogListingPage } from '@/components/blog/BlogListingPage'

export const metadata: Metadata = {
  title: 'NEET Biology Blog | Study Tips & Preparation Strategies',
  description:
    'Expert NEET biology preparation tips, study strategies, and educational content by AIIMS faculty. Master biology concepts for medical entrance success.',
  keywords:
    'NEET biology blog, medical entrance preparation, biology study tips, NEET strategy, AIIMS faculty guidance',
  openGraph: {
    title: 'NEET Biology Blog | Expert Study Tips & Strategies',
    description:
      'Master NEET Biology with expert tips, preparation strategies, and study guides by AIIMS faculty.',
    images: ['/blog/neet-biology-blog-og.jpg'],
  },
}

export default function BlogPage() {
  return <BlogListingPage />
}
