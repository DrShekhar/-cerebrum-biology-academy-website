import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { EnhancedCoursesListingPage } from '@/components/courses/EnhancedCoursesListingPage'

export const metadata: Metadata = generatePageMetadata('courses')

export default function CoursesPage() {
  return <EnhancedCoursesListingPage />
}
