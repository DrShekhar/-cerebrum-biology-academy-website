'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Scale,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Video,
  FileText,
  MessageCircle,
  GraduationCap,
  Star,
  ArrowRight,
  Plus,
  X,
  IndianRupee,
  BookOpen,
  Target,
  Award,
  Sparkles,
} from 'lucide-react'

interface Course {
  id: string
  name: string
  slug: string
  price: number
  duration: string
  mode: string
  batchSize: string
  liveClasses: boolean
  recordedLectures: boolean
  studyMaterial: boolean
  testSeries: boolean
  doubtClearing: boolean
  mentorship: boolean
  mockTests: number
  practiceQuestions: number
  validity: string
  rating: number
  students: number
  highlights: string[]
}

const allCourses: Course[] = [
  {
    id: 'dropper-batch',
    name: 'NEET Dropper Batch',
    slug: 'dropper-batch',
    price: 55000,
    duration: '12 Months',
    mode: 'Live + Recorded',
    batchSize: '50 Students',
    liveClasses: true,
    recordedLectures: true,
    studyMaterial: true,
    testSeries: true,
    doubtClearing: true,
    mentorship: true,
    mockTests: 30,
    practiceQuestions: 10000,
    validity: '18 Months',
    rating: 4.9,
    students: 2500,
    highlights: [
      'Daily 6-hour live classes',
      'Personal mentor assigned',
      'Weekly performance review',
      'Hostel facility available',
    ],
  },
  {
    id: 'foundation-course',
    name: 'NEET Foundation',
    slug: 'foundation-course',
    price: 25000,
    duration: '18 Months',
    mode: 'Hybrid',
    batchSize: '100 Students',
    liveClasses: true,
    recordedLectures: true,
    studyMaterial: true,
    testSeries: true,
    doubtClearing: true,
    mentorship: false,
    mockTests: 20,
    practiceQuestions: 7500,
    validity: '24 Months',
    rating: 4.7,
    students: 1800,
    highlights: [
      'Board + NEET integrated',
      'Weekend batches available',
      'Concept-based teaching',
      'Regular parent updates',
    ],
  },
  {
    id: 'crash-course',
    name: 'NEET Crash Course',
    slug: 'crash-course',
    price: 15000,
    duration: '3 Months',
    mode: 'Live Online',
    batchSize: '150 Students',
    liveClasses: true,
    recordedLectures: true,
    studyMaterial: true,
    testSeries: true,
    doubtClearing: true,
    mentorship: false,
    mockTests: 15,
    practiceQuestions: 5000,
    validity: '6 Months',
    rating: 4.6,
    students: 3200,
    highlights: [
      'High-yield topics focus',
      'Quick revision approach',
      'PYQ intensive practice',
      'Last 3 months strategy',
    ],
  },
  {
    id: 'test-series',
    name: 'NEET Test Series',
    slug: 'test-series',
    price: 5000,
    duration: '6 Months',
    mode: 'Online',
    batchSize: 'Unlimited',
    liveClasses: false,
    recordedLectures: false,
    studyMaterial: false,
    testSeries: true,
    doubtClearing: false,
    mentorship: false,
    mockTests: 50,
    practiceQuestions: 15000,
    validity: '12 Months',
    rating: 4.5,
    students: 5000,
    highlights: [
      '50 chapter-wise tests',
      '20 full mock tests',
      'All India ranking',
      'Detailed analytics',
    ],
  },
  {
    id: 'biology-only',
    name: 'Biology Mastery',
    slug: 'biology-only',
    price: 18000,
    duration: '8 Months',
    mode: 'Live + Recorded',
    batchSize: '75 Students',
    liveClasses: true,
    recordedLectures: true,
    studyMaterial: true,
    testSeries: true,
    doubtClearing: true,
    mentorship: false,
    mockTests: 25,
    practiceQuestions: 8000,
    validity: '12 Months',
    rating: 4.8,
    students: 1500,
    highlights: [
      'Only Biology focused',
      'NCERT line-by-line',
      'Diagram mastery',
      '360/360 target approach',
    ],
  },
]

export default function CourseComparePage() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    'dropper-batch',
    'foundation-course',
  ])
  const [showSelector, setShowSelector] = useState(false)

  const selectedCourseData = selectedCourses
    .map((id) => allCourses.find((c) => c.id === id))
    .filter(Boolean) as Course[]

  const addCourse = (courseId: string) => {
    if (selectedCourses.length < 3 && !selectedCourses.includes(courseId)) {
      setSelectedCourses([...selectedCourses, courseId])
    }
    setShowSelector(false)
  }

  const removeCourse = (courseId: string) => {
    if (selectedCourses.length > 1) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    }
  }

  const availableCourses = allCourses.filter((c) => !selectedCourses.includes(c.id))

  const stats = [
    { icon: Scale, value: '5', label: 'Courses to Compare' },
    { icon: Users, value: '14,000+', label: 'Active Students' },
    { icon: Star, value: '4.7', label: 'Average Rating' },
    { icon: Award, value: '94%', label: 'Success Rate' },
  ]

  const FeatureRow = ({
    label,
    getValue,
    icon: Icon,
  }: {
    label: string
    getValue: (course: Course) => React.ReactNode
    icon: React.ElementType
  }) => (
    <tr className="border-b border-gray-100">
      <td className="flex items-center gap-2 py-4 pr-4 text-sm font-medium text-gray-700">
        <Icon className="h-4 w-4 text-gray-400" />
        {label}
      </td>
      {selectedCourseData.map((course) => (
        <td key={course.id} className="py-4 text-center text-sm text-gray-900">
          {getValue(course)}
        </td>
      ))}
    </tr>
  )

  const BooleanCell = ({ value }: { value: boolean }) =>
    value ? (
      <CheckCircle className="mx-auto h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="mx-auto h-5 w-5 text-gray-300" />
    )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-700 py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              <Scale className="h-4 w-4" />
              Side-by-Side Comparison
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Compare NEET
              <span className="block text-blue-300">Courses</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100">
              Compare features, pricing, and benefits of our NEET preparation courses side-by-side
              to make an informed decision.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Course Comparison</h2>
            {selectedCourses.length < 3 && (
              <button
                onClick={() => setShowSelector(true)}
                className="flex items-center gap-2 rounded-lg border-2 border-dashed border-blue-300 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:border-blue-500 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4" />
                Add Course
              </button>
            )}
          </div>

          {/* Course Selector Modal */}
          {showSelector && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Add Course to Compare</h3>
                  <button
                    onClick={() => setShowSelector(false)}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-2">
                  {availableCourses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => addCourse(course.id)}
                      className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{course.name}</div>
                        <div className="text-sm text-gray-600">
                          ₹{course.price.toLocaleString()}
                        </div>
                      </div>
                      <Plus className="h-5 w-5 text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comparison Cards */}
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <div className="min-w-[600px] md:min-w-[800px]">
              {/* Course Headers */}
              <div
                className="mb-6 grid gap-4"
                style={{ gridTemplateColumns: `200px repeat(${selectedCourseData.length}, 1fr)` }}
              >
                <div />
                {selectedCourseData.map((course) => (
                  <div
                    key={course.id}
                    className="relative rounded-xl border border-gray-200 bg-white p-6 text-center shadow-lg"
                  >
                    {selectedCourses.length > 1 && (
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{course.name}</h3>
                    <div className="mb-2 flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.students}+ students)</span>
                    </div>
                    <div className="mb-4 text-3xl font-bold text-blue-600">
                      ₹{course.price.toLocaleString()}
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-lg">
                <table className="w-full">
                  <tbody>
                    {/* Basic Info */}
                    <tr className="bg-gray-50">
                      <td
                        colSpan={selectedCourseData.length + 1}
                        className="px-4 py-3 text-sm font-semibold text-gray-900"
                      >
                        Basic Information
                      </td>
                    </tr>
                    <FeatureRow label="Duration" icon={Clock} getValue={(c) => c.duration} />
                    <FeatureRow label="Mode" icon={Video} getValue={(c) => c.mode} />
                    <FeatureRow label="Batch Size" icon={Users} getValue={(c) => c.batchSize} />
                    <FeatureRow label="Validity" icon={Clock} getValue={(c) => c.validity} />

                    {/* Features */}
                    <tr className="bg-gray-50">
                      <td
                        colSpan={selectedCourseData.length + 1}
                        className="px-4 py-3 text-sm font-semibold text-gray-900"
                      >
                        Features Included
                      </td>
                    </tr>
                    <FeatureRow
                      label="Live Classes"
                      icon={Video}
                      getValue={(c) => <BooleanCell value={c.liveClasses} />}
                    />
                    <FeatureRow
                      label="Recorded Lectures"
                      icon={Video}
                      getValue={(c) => <BooleanCell value={c.recordedLectures} />}
                    />
                    <FeatureRow
                      label="Study Material"
                      icon={BookOpen}
                      getValue={(c) => <BooleanCell value={c.studyMaterial} />}
                    />
                    <FeatureRow
                      label="Test Series"
                      icon={FileText}
                      getValue={(c) => <BooleanCell value={c.testSeries} />}
                    />
                    <FeatureRow
                      label="Doubt Clearing"
                      icon={MessageCircle}
                      getValue={(c) => <BooleanCell value={c.doubtClearing} />}
                    />
                    <FeatureRow
                      label="Personal Mentorship"
                      icon={GraduationCap}
                      getValue={(c) => <BooleanCell value={c.mentorship} />}
                    />

                    {/* Quantity Features */}
                    <tr className="bg-gray-50">
                      <td
                        colSpan={selectedCourseData.length + 1}
                        className="px-4 py-3 text-sm font-semibold text-gray-900"
                      >
                        Content Volume
                      </td>
                    </tr>
                    <FeatureRow
                      label="Mock Tests"
                      icon={Target}
                      getValue={(c) => (
                        <span className="font-semibold text-blue-600">{c.mockTests}</span>
                      )}
                    />
                    <FeatureRow
                      label="Practice Questions"
                      icon={FileText}
                      getValue={(c) => (
                        <span className="font-semibold text-blue-600">
                          {c.practiceQuestions.toLocaleString()}+
                        </span>
                      )}
                    />
                  </tbody>
                </table>

                {/* Highlights */}
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                  <div className="text-sm font-semibold text-gray-900">Course Highlights</div>
                </div>
                <div
                  className="grid gap-4 p-4"
                  style={{ gridTemplateColumns: `200px repeat(${selectedCourseData.length}, 1fr)` }}
                >
                  <div />
                  {selectedCourseData.map((course) => (
                    <div key={course.id}>
                      <ul className="space-y-2">
                        {course.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Course Cards */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">All Available Courses</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Quick overview of all our NEET preparation courses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating} • {course.students}+ students
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      ₹{course.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{course.duration}</div>
                  </div>
                </div>

                <ul className="mb-4 space-y-2">
                  {course.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  {!selectedCourses.includes(course.id) && selectedCourses.length < 3 && (
                    <button
                      onClick={() => addCourse(course.id)}
                      className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-50"
                    >
                      Compare
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              How to Choose the Right Course?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Consider these factors when selecting your NEET preparation course
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Clock,
                title: 'Time Available',
                desc: 'Full-time students can opt for intensive programs, while working students may prefer flexible options.',
              },
              {
                icon: Target,
                title: 'Target Score',
                desc: 'Aiming for top colleges? Go for comprehensive programs with mentorship and test series.',
              },
              {
                icon: IndianRupee,
                title: 'Budget',
                desc: 'Choose based on your budget. All courses offer good value, but features vary.',
              },
              {
                icon: BookOpen,
                title: 'Learning Style',
                desc: 'Prefer live interaction? Choose live classes. Self-study types can opt for recorded lectures.',
              },
            ].map((factor, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 text-center"
              >
                <factor.icon className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{factor.title}</h3>
                <p className="text-sm text-gray-600">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">Still Confused?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Let our Course Finder recommend the perfect course based on your specific needs and
            preferences.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/courses/finder"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 transition-all hover:bg-gray-100"
            >
              <Sparkles className="h-5 w-5" />
              Try Course Finder
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-blue-600"
            >
              Talk to Counselor
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
