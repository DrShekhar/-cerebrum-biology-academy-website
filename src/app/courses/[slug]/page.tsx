import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { detailedCourses } from '@/data/detailedCourses'
import { CourseDetailPage } from '@/components/courses/CourseDetailPage'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = detailedCourses.find((course) => course.slug === params.slug)

  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }

  return {
    title: course.seoTitle || course.title,
    description: course.seoDescription || course.description,
    keywords: `NEET biology course, ${course.targetClass} class preparation, biology coaching, medical entrance`,
    authors: [{ name: 'Cerebrum Biology Academy' }],
    openGraph: {
      title: course.seoTitle || course.title,
      description: course.seoDescription || course.description,
      images: [course.gallery[0] || '/courses/default-course-og.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.seoTitle || course.title,
      description: course.seoDescription || course.description,
      images: [course.gallery[0] || '/courses/default-course-og.jpg'],
    },
  }
}

export async function generateStaticParams() {
  return detailedCourses.map((course) => ({
    slug: course.slug,
  }))
}

export default function CoursePage({ params }: Props) {
  const course = detailedCourses.find((course) => course.slug === params.slug)

  if (!course) {
    notFound()
  }

  return <CourseDetailPage course={course} />
}
