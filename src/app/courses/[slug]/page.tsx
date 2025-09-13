import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { coursePrograms } from '@/data/courseSystemData'
import { detailedCourses } from '@/data/detailedCourses'
import { CourseDetailPage } from '@/components/courses/CourseDetailPage'
import { EnhancedCourseDetailPage } from '@/components/courses/EnhancedCourseDetailPage'

interface Props {
  params: Promise<{ slug: string }>
}

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
      openGraph: {
        title: `${newCourse.name} | Cerebrum Biology Academy`,
        description: newCourse.description,
        images: ['/courses/course-og-image.jpg'],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${newCourse.name} | Cerebrum Biology Academy`,
        description: newCourse.description,
        images: ['/courses/course-og-image.jpg'],
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
      openGraph: {
        title: oldCourse.seoTitle || oldCourse.title,
        description: oldCourse.seoDescription || oldCourse.description,
        images: [oldCourse.gallery[0] || '/courses/default-course-og.jpg'],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: oldCourse.seoTitle || oldCourse.title,
        description: oldCourse.seoDescription || oldCourse.description,
        images: [oldCourse.gallery[0] || '/courses/default-course-og.jpg'],
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
    return <EnhancedCourseDetailPage course={newCourse} />
  }

  // Fallback to old course system  
  const oldCourse = detailedCourses.find((course) => course.slug === slug)
  if (oldCourse) {
    return <CourseDetailPage course={oldCourse} />
  }

  notFound()
}