import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { coursePrograms } from '@/data/courseSystemData'
import { detailedCourses } from '@/data/detailedCourses'
import { CourseDetailPage } from '@/components/courses/CourseDetailPage'
import { EnhancedCourseDetailPage } from '@/components/courses/EnhancedCourseDetailPage'
import { BreadcrumbSchema, COMMON_BREADCRUMBS } from '@/components/seo'
import { LearningResourceSchema } from '@/components/seo/ContentFreshness'
import { CourseDetailSchema } from '@/components/seo/CourseDetailSchema'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const newCourseParams = coursePrograms.map((course) => ({
    slug: course.id,
  }))

  const oldCourseParams = detailedCourses.map((course) => ({
    slug: course.slug,
  }))

  return [...newCourseParams, ...oldCourseParams]
}

// Return 404 for any slug not in generateStaticParams
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // First try the new course system
  const newCourse = coursePrograms.find((course) => course.id === slug)
  if (newCourse) {
    return {
      title: `${newCourse.name} | NEET Biology Coaching - Cerebrum Biology Academy`,
      description: newCourse.description,
      keywords: `NEET biology course, ${newCourse.targetClass} class preparation, biology coaching, medical entrance, ${newCourse.name}`,
      authors: [{ name: 'Cerebrum Biology Academy' }],
      alternates: {
        canonical: `https://cerebrumbiologyacademy.com/courses/${slug}`,
      },
      openGraph: {
        title: `${newCourse.name} | Cerebrum Biology Academy`,
        description: newCourse.description,
        images: [`/api/og?title=${encodeURIComponent(newCourse.name)}&subtitle=${encodeURIComponent('NEET Biology Coaching')}`],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${newCourse.name} | Cerebrum Biology Academy`,
        description: newCourse.description,
        images: [`/api/og?title=${encodeURIComponent(newCourse.name)}&subtitle=${encodeURIComponent('NEET Biology Coaching')}`],
      },
    }
  }

  // Fallback to old course system
  const oldCourse = detailedCourses.find((course) => course.slug === slug)
  if (oldCourse) {
    return {
      title: oldCourse.seoTitle || oldCourse.title,
      description: oldCourse.seoDescription || oldCourse.description,
      keywords: `NEET biology course, ${oldCourse.targetClass} class preparation, biology coaching, medical entrance`,
      authors: [{ name: 'Cerebrum Biology Academy' }],
      alternates: {
        canonical: `https://cerebrumbiologyacademy.com/courses/${slug}`,
      },
      openGraph: {
        title: oldCourse.seoTitle || oldCourse.title,
        description: oldCourse.seoDescription || oldCourse.description,
        images: [oldCourse.gallery[0] || `/api/og?title=${encodeURIComponent(oldCourse.title)}&subtitle=${encodeURIComponent('Cerebrum Biology Academy')}`],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: oldCourse.seoTitle || oldCourse.title,
        description: oldCourse.seoDescription || oldCourse.description,
        images: [oldCourse.gallery[0] || `/api/og?title=${encodeURIComponent(oldCourse.title)}&subtitle=${encodeURIComponent('Cerebrum Biology Academy')}`],
      },
    }
  }

  return {
    title: 'Course Not Found - Cerebrum Biology Academy',
    description: 'The course you are looking for could not be found.',
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params

  // First try the new course system
  const newCourse = coursePrograms.find((course) => course.id === slug)
  if (newCourse) {
    return (
      <>
        {/* Breadcrumb Navigation + Schema */}
        <div className="mx-auto max-w-7xl px-4 py-4">
          <BreadcrumbSchema items={COMMON_BREADCRUMBS.courses(newCourse.name)} />
        </div>
        {/* Learning Resource Schema for E-E-A-T */}
        <LearningResourceSchema
          name={newCourse.name}
          description={newCourse.description}
          datePublished="2024-01-01"
          dateModified={new Date().toISOString().split('T')[0]}
          author={{ name: 'Cerebrum Biology Academy' }}
          educationalLevel={`${newCourse.targetClass}, NEET`}
          learningResourceType="Course"
          keywords={['NEET Biology', newCourse.targetClass, 'Medical Entrance']}
        />
        <CourseDetailSchema
          courseName={newCourse.name}
          description={newCourse.description}
          duration={newCourse.duration.includes('2') ? 'P2Y' : newCourse.duration.includes('6') ? 'P6M' : 'P1Y'}
          price={newCourse.tiers.pinnacle.price}
          batchSize={newCourse.tiers.pinnacle.batchSize}
          targetClass={newCourse.targetClass}
          slug={newCourse.id}
          learningMode={newCourse.learningMode}
        />
        <EnhancedCourseDetailPage course={newCourse} />
      </>
    )
  }

  // Fallback to old course system
  const oldCourse = detailedCourses.find((course) => course.slug === slug)
  if (oldCourse) {
    return (
      <>
        {/* Breadcrumb Navigation + Schema */}
        <div className="mx-auto max-w-7xl px-4 py-4">
          <BreadcrumbSchema items={COMMON_BREADCRUMBS.courses(oldCourse.title)} />
        </div>
        {/* Learning Resource Schema for E-E-A-T */}
        <LearningResourceSchema
          name={oldCourse.title}
          description={oldCourse.description}
          datePublished="2024-01-01"
          dateModified={new Date().toISOString().split('T')[0]}
          author={{ name: 'Cerebrum Biology Academy' }}
          educationalLevel={`${oldCourse.targetClass}, NEET`}
          learningResourceType="Course"
          keywords={['NEET Biology', oldCourse.targetClass, 'Medical Entrance']}
        />
        <CourseDetailSchema
          courseName={oldCourse.title}
          description={oldCourse.description}
          duration={oldCourse.duration?.includes('2') ? 'P2Y' : oldCourse.duration?.includes('6') ? 'P6M' : 'P1Y'}
          price={oldCourse.pricing?.amount || 85000}
          targetClass={oldCourse.targetClass}
          slug={oldCourse.slug}
        />
        <CourseDetailPage course={oldCourse} />
      </>
    )
  }

  notFound()
}
