import Link from 'next/link'
import {
  Trophy,
  BookOpen,
  GraduationCap,
  School,
  Award,
  ClipboardList,
} from 'lucide-react'

const courseOfferings = [
  {
    title: 'NEET Biology',
    description: 'Comprehensive NEET Biology preparation with AIIMS faculty. 98% success rate, 67+ AIIMS selections.',
    icon: Trophy,
    color: 'bg-green-50 border-green-200 text-green-800',
    iconColor: 'text-green-600',
    link: '/courses',
    tags: ['Class 11', 'Class 12', 'Dropper'],
  },
  {
    title: 'Board & CBSE Biology',
    description: 'Ace your Class 11 & 12 Board exams with deep NCERT mastery. Our students average 95%+ in Biology boards.',
    icon: BookOpen,
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: 'text-blue-600',
    link: '/courses',
    tags: ['CBSE', 'ISC', 'State Board'],
  },
  {
    title: 'Foundation Biology (Class 9 & 10)',
    description: 'Start early, win big. Build strong Biology fundamentals for NEET + Board excellence from Class 9.',
    icon: School,
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    iconColor: 'text-purple-600',
    link: '/courses/class-9-foundation',
    tags: ['Class 9', 'Class 10', 'Pre-NEET'],
  },
  {
    title: 'Biology Olympiad (NBO / IBO)',
    description: 'National Biology Olympiad & International Biology Olympiad prep. 5,900+ Olympiad MCQs in our question bank.',
    icon: Award,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    iconColor: 'text-yellow-600',
    link: '/mcq-practice',
    tags: ['NBO', 'IBO', 'NTSE', 'NSEB'],
  },
  {
    title: 'MCQ Practice Bank',
    description: '19,000+ Biology MCQs across NEET, Board, and Olympiad levels. AI-powered adaptive practice with detailed solutions.',
    icon: ClipboardList,
    color: 'bg-teal-50 border-teal-200 text-teal-800',
    iconColor: 'text-teal-600',
    link: '/mcq-practice',
    tags: ['19,000+ MCQs', 'AI-Powered', 'Free Access'],
  },
  {
    title: 'Class 11 & 12 Biology',
    description: 'Complete NCERT + competitive exam coverage. Small batches of 15 students with personal mentorship.',
    icon: GraduationCap,
    color: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    iconColor: 'text-indigo-600',
    link: '/class-11',
    tags: ['Live Classes', 'Recorded', 'Hybrid'],
  },
]

interface CourseOfferingsSectionProps {
  cityName?: string
}

export function CourseOfferingsSection({ cityName }: CourseOfferingsSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Biology Courses We Offer{cityName ? ` for ${cityName} Students` : ''}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {`India's only Biology-specialist coaching institute. From Foundation to NEET to Olympiads — we cover every Biology competitive exam.`}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseOfferings.map((course) => (
            <Link
              key={course.title}
              href={course.link}
              className={`rounded-xl border p-6 transition hover:shadow-lg ${course.color}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <course.icon className={`h-6 w-6 ${course.iconColor}`} />
                <h3 className="text-lg font-bold">{course.title}</h3>
              </div>
              <p className="text-sm mb-3 opacity-90">{course.description}</p>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/book-free-demo"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-3 font-medium text-white hover:bg-green-700 transition shadow-lg"
          >
            Book FREE Demo Class — Any Course
          </Link>
        </div>
      </div>
    </section>
  )
}
