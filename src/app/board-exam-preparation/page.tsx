import Link from 'next/link'
import {
  BookOpen,
  GraduationCap,
  ChevronRight,
  Star,
  Users,
  Trophy,
  Globe,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

const boards = [
  {
    name: 'CBSE Biology',
    badge: 'Most Popular',
    badgeColor: 'bg-green-100 text-green-800',
    description:
      'Comprehensive CBSE Biology for Class 11 & 12. NCERT-focused with NEET integration.',
    features: ['NCERT Complete Coverage', 'Chapter-wise Tests', 'Board + NEET Integrated'],
    link: '/courses/cbse-biology-class-11-12',
    borderColor: 'border-t-green-500',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    name: 'ICSE/ISC Biology',
    badge: null,
    badgeColor: '',
    description:
      'Expert ICSE & ISC Biology coaching. Detailed syllabus coverage with practical focus.',
    features: ['Practical Lab Training', 'Detailed Theory', 'ISC Board Pattern'],
    link: '/courses/icse-isc-biology',
    borderColor: 'border-t-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    name: 'IGCSE Biology',
    badge: 'International',
    badgeColor: 'bg-purple-100 text-purple-800',
    description:
      'Cambridge IGCSE Biology preparation. International curriculum with exam-focused training.',
    features: ['Cambridge Pattern', 'International Focus', 'Extended & Core'],
    link: '/courses/ib-igcse-biology',
    borderColor: 'border-t-purple-500',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    name: 'IB Biology',
    badge: 'International',
    badgeColor: 'bg-purple-100 text-purple-800',
    description:
      'IB Diploma Biology HL & SL preparation. Internal Assessment and exam preparation.',
    features: ['HL & SL Options', 'IA Guidance', 'Exam Preparation'],
    link: '/courses/ib-igcse-biology',
    borderColor: 'border-t-indigo-500',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    name: 'State Board Biology',
    badge: null,
    badgeColor: '',
    description:
      'State board Biology preparation with alignment to NEET syllabus for dual benefit.',
    features: ['State Syllabus', 'NEET Alignment', 'Regional Language'],
    link: '/courses/class-11',
    borderColor: 'border-t-orange-500',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
]

const classCards = [
  {
    title: 'Class 11 Board Prep',
    description:
      'Build a strong Biology foundation in Class 11 with board-aligned teaching and regular assessments.',
    link: '/courses/class-11',
    accentColor: 'border-t-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Class 12 Board Prep',
    description:
      'Focused Class 12 Biology preparation targeting high board scores with revision-intensive coaching.',
    link: '/courses/class-12',
    accentColor: 'border-t-green-500',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    title: 'Foundation (9th-10th)',
    description:
      'Early Biology foundation for Class 9 & 10 students preparing for competitive and board exams.',
    link: '/courses/foundation',
    accentColor: 'border-t-purple-500',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cerebrumbiologyacademy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Board Exam Preparation',
      item: 'https://cerebrumbiologyacademy.com/board-exam-preparation',
    },
  ],
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy',
  url: 'https://cerebrumbiologyacademy.com',
  description:
    'Expert Biology preparation for CBSE, ICSE, IGCSE, IB, and State Board exams with AIIMS faculty.',
  sameAs: ['https://cerebrumbiologyacademy.com'],
  hasCourse: [
    {
      '@type': 'Course',
      name: 'CBSE Biology Class 11 & 12',
      description: 'Comprehensive CBSE Biology preparation with NCERT focus and NEET integration.',
      provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
    },
    {
      '@type': 'Course',
      name: 'ICSE/ISC Biology',
      description: 'Expert ICSE and ISC Biology coaching with practical focus.',
      provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
    },
    {
      '@type': 'Course',
      name: 'IGCSE Biology',
      description: 'Cambridge IGCSE Biology preparation with international curriculum.',
      provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
    },
    {
      '@type': 'Course',
      name: 'IB Biology HL & SL',
      description: 'IB Diploma Biology preparation with IA guidance and exam training.',
      provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
    },
    {
      '@type': 'Course',
      name: 'State Board Biology',
      description: 'State board Biology preparation aligned with NEET syllabus.',
      provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
    },
  ],
}

export default function BoardExamPreparationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
              All Boards Covered
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Board Exam Biology Preparation
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
              Expert coaching for CBSE, ICSE, IGCSE, IB & State Boards — taught by AIIMS faculty
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-400/10">
                  <Globe className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">5</p>
                <p className="text-sm text-slate-400">Boards</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-400/10">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">98%</p>
                <p className="text-sm text-slate-400">Success</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-2 h-12 w-12 rounded-full bg-yellow-400/10">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">AIIMS</p>
                <p className="text-sm text-slate-400">Faculty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Choose Your Board
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Specialized Biology preparation programs tailored for every major board
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {boards.map((board) => (
              <Card
                key={board.name}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 ${board.borderColor} overflow-hidden`}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex items-center justify-center h-12 w-12 rounded-lg ${board.iconBg}`}
                    >
                      <BookOpen className={`h-6 w-6 ${board.iconColor}`} />
                    </div>
                    {board.badge && <Badge className={board.badgeColor}>{board.badge}</Badge>}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{board.name}</h3>
                  <p className="text-slate-600 mb-5 leading-relaxed">{board.description}</p>
                  <ul className="space-y-2.5 mb-6">
                    {board.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full min-h-[44px]">
                    <Link href={board.link}>
                      Explore {board.name.split(' ')[0]}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Class-wise Board Preparation
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Structured programs designed for each academic level
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {classCards.map((card) => (
              <Card
                key={card.title}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 ${card.accentColor}`}
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div
                    className={`flex items-center justify-center mx-auto mb-4 h-14 w-14 rounded-full ${card.iconBg}`}
                  >
                    <GraduationCap className={`h-7 w-7 ${card.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600 mb-5 leading-relaxed">{card.description}</p>
                  <Button asChild variant="outline" className="min-h-[44px]">
                    <Link href={card.link}>
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mx-auto mb-4 h-14 w-14 rounded-full bg-green-100">
              <Users className="h-7 w-7 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Board + NEET: Dual Benefit Approach
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Our integrated teaching methodology ensures students excel in both board exams and
              NEET simultaneously. The Biology syllabus for boards and NEET overlaps significantly —
              our AIIMS faculty leverage this overlap to deliver a unified curriculum that maximizes
              preparation efficiency. Students save time, build deeper conceptual understanding, and
              achieve top results in both exams.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="flex items-center justify-center mx-auto mb-3 h-12 w-12 rounded-full bg-green-100">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-bold text-slate-900">Same Faculty</p>
              <p className="text-sm text-slate-600 mt-1">
                AIIMS-trained teachers for both board and NEET prep
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="flex items-center justify-center mx-auto mb-3 h-12 w-12 rounded-full bg-teal-100">
                <BookOpen className="h-6 w-6 text-teal-600" />
              </div>
              <p className="font-bold text-slate-900">Integrated Syllabus</p>
              <p className="text-sm text-slate-600 mt-1">
                Unified curriculum covering board and NEET topics together
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="flex items-center justify-center mx-auto mb-3 h-12 w-12 rounded-full bg-blue-100">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-bold text-slate-900">Double Results</p>
              <p className="text-sm text-slate-600 mt-1">
                High board scores and strong NEET ranks from one program
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Board Exam Preparation Today
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have achieved top marks with Cerebrum Biology Academy
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="min-h-[44px]">
              <Link href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology.%20Please%20share%20available%20timings." target="_blank" rel="noopener noreferrer">Book a Free Demo Class</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-[44px] border-white text-white hover:bg-white/10"
            >
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
            <Link
              href="/results"
              className="text-slate-400 hover:text-white underline underline-offset-4"
            >
              See Our Results &rarr;
            </Link>
            <Link
              href="/all-locations"
              className="text-slate-400 hover:text-white underline underline-offset-4"
            >
              Find a Center Near You &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
