import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  Target,
  Zap,
  BookOpen,
  ArrowRight,
  Award,
} from 'lucide-react'

export const metadata: Metadata = {
  title: '1 Year NEET Course Noida 2026 | Class 12 + Dropper',
  description:
    'Join 1-year NEET course in Noida for Class 12 students & droppers. Complete syllabus in 12 months. Sector 62. Intensive coaching. Call 99536-43938!',
  keywords: [
    '1 year neet course noida',
    'one year neet coaching noida',
    '12 months neet course',
    'neet 2026 one year course',
    'class 12 neet integrated course',
    'neet dropper 1 year course',
    'intensive neet coaching noida',
    'neet crash course 1 year',
    'complete neet in 1 year',
    'neet biology 1 year course',
  ],
  openGraph: {
    title: '1 Year NEET Course Noida 2026',
    description:
      'Complete NEET biology syllabus in 12 months! Ideal for Class 12 students and droppers.',
    url: 'https://cerebrumbiologyacademy.com/1-year-neet-course-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/1-year-neet-course-noida',
  },
}

const coursePhases = [
  {
    phase: 'Phase 1',
    duration: 'April - August',
    months: '5 months',
    focus: 'Complete Theory',
    description:
      'Class 11 + Class 12 complete theory coverage. Foundation building with NCERT focus.',
    hours: '300+ hours',
  },
  {
    phase: 'Phase 2',
    duration: 'September - November',
    months: '3 months',
    focus: 'Revision + Practice',
    description: 'Full syllabus revision. NEET pattern MCQ practice. Previous year papers.',
    hours: '200+ hours',
  },
  {
    phase: 'Phase 3',
    duration: 'December - February',
    months: '3 months',
    focus: 'Mock Tests + Weak Areas',
    description: 'Full-length mock tests. Weak area identification and focused improvement.',
    hours: '200+ hours',
  },
  {
    phase: 'Phase 4',
    duration: 'March - April',
    months: '2 months',
    focus: 'Final Revision',
    description: 'Exam strategy. High-yield topics revision. Last-minute preparation.',
    hours: '100+ hours',
  },
]

const idealFor = [
  'Class 12 students wanting integrated NEET + Board prep',
  'NEET droppers taking one more attempt',
  'Students who scored below 500 in previous NEET',
  'Those who started NEET prep late in Class 11',
  'Students switching from engineering to medical',
]

const faqs = [
  {
    question: 'What is the 1-year NEET course structure?',
    answer:
      'Phase 1 (Apr-Aug): Complete Class 11+12 theory, Phase 2 (Sep-Nov): Revision + NEET pattern practice, Phase 3 (Dec-Feb): Mock tests + weak area focus, Phase 4 (Mar-Apr): Final revision + exam strategy. Total: 800+ hours of biology coaching.',
  },
  {
    question: 'Who should join 1-year course?',
    answer:
      'Ideal for: 1) Class 12 students wanting integrated coaching, 2) NEET droppers taking one more attempt, 3) Students who scored below 500 in previous NEET, 4) Those who started late in Class 11. Not recommended for complete beginners.',
  },
  {
    question: 'What is the fee for 1-year NEET course?',
    answer:
      '1-year complete course: ₹65,000-85,000 (includes all modules). Breakdown: Tuition ₹60,000 + Material ₹10,000 + Tests ₹5,000 + Doubt sessions included. Scholarship available based on previous NEET/board scores. EMI available.',
  },
  {
    question: 'Is 1 year enough to crack NEET?',
    answer:
      'Yes, if you: 1) Have basic Class 11 foundation, 2) Can dedicate 8-10 hours daily, 3) Follow the structured plan strictly. Many of our 1-year students score 600+ in NEET. Key is consistency and completing 5000+ MCQs.',
  },
  {
    question: 'How is 1-year course different from regular 2-year?',
    answer:
      'Key differences: 1) Faster pace (2x speed), 2) More daily hours (4-5 hrs vs 2-3 hrs), 3) Lesser buffer time for revision, 4) Higher self-study requirement, 5) More intensive testing schedule. Requires more dedication but equally effective.',
  },
  {
    question: 'What is the daily schedule for 1-year batch?',
    answer:
      'Typical day: Morning batch 8 AM - 12 PM (theory) + Evening 5-7 PM (practice/tests). Total 6 hours daily. Alternative: Morning only 8 AM - 2 PM for droppers who need more self-study time. Both options available.',
  },
  {
    question: 'Can I complete syllabus if joining in June/July?',
    answer:
      'Yes, with adjusted pace! Late joiner support: 1) Extra classes for missed chapters, 2) Recorded sessions for catch-up, 3) One-on-one doubt sessions, 4) Slightly faster pace. Many students join till August and still complete syllabus.',
  },
  {
    question: 'What test series is included?',
    answer:
      '1-year program includes: 50+ chapter tests, 15 full syllabus tests, 10 NEET pattern mocks, 5 AIIMS pattern tests, Daily practice MCQs (20/day). All India rank provided in mock tests. Performance analytics shared weekly.',
  },
]

export default function OneYearNEETCourseNoida() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-700 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-yellow-500 text-red-900 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Intensive 12-Month Program
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">1 Year NEET Course in Noida</h1>
            <p className="text-xl text-red-100 mb-8">
              Complete NEET biology syllabus in 12 months! Ideal for Class 12 students and droppers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+919953643938"
                className="bg-yellow-500 text-red-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
              >
                <Phone className="w-5 h-5" />
                Call 99536-43938
              </a>
              <Link
                href="/2-year-neet-course-noida"
                className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition"
              >
                2-Year Course Option
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">12 Months</div>
              <div className="text-gray-600">Course Duration</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">800+ Hrs</div>
              <div className="text-gray-600">Total Teaching</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">250+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Phases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">1-Year Course Structure</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {coursePhases.map((phase, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {phase.phase}
                      </span>
                      <h3 className="text-xl font-bold mt-2">{phase.focus}</h3>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{phase.duration}</p>
                      <p className="text-sm text-gray-500">{phase.months}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{phase.description}</p>
                  <p className="text-sm font-medium text-red-600">{phase.hours} of coaching</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Who Should Join 1-Year Course?</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {idealFor.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-lg">
                  <Target className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why 1 Year Works */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why 1-Year Course Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Zap className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Intensive Focus</h3>
              <p className="text-gray-600">
                No distractions. 100% focus on NEET for 12 months. Concentrated effort yields faster
                results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <BookOpen className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Proven Curriculum</h3>
              <p className="text-gray-600">
                Our 1-year syllabus is designed by AIIMS faculty. Covers exactly what NEET tests,
                nothing extra.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Award className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Track Record</h3>
              <p className="text-gray-600">
                98% of our 1-year students qualify NEET. Many score 600+ with dedicated preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Typical Daily Schedule</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white py-4 px-6">
                <h3 className="text-xl font-bold">Option A: Full Day (Recommended for Droppers)</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-28 text-center font-bold text-red-600">8 AM - 12 PM</div>
                  <div className="flex-1 bg-red-50 p-3 rounded-lg">Theory Classes (4 hours)</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-28 text-center font-bold text-red-600">12 - 2 PM</div>
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">Lunch + Rest</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-28 text-center font-bold text-red-600">2 - 5 PM</div>
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">Self-Study / Library</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-28 text-center font-bold text-red-600">5 - 7 PM</div>
                  <div className="flex-1 bg-red-50 p-3 rounded-lg">Practice + Tests (2 hours)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
              <div className="bg-gray-600 text-white py-4 px-6">
                <h3 className="text-xl font-bold">
                  Option B: Evening Only (For Class 12 Students)
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-28 text-center font-bold text-gray-600">5 - 8 PM</div>
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    Theory + Practice (3 hours weekdays)
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-28 text-center font-bold text-gray-600">Sat 9 AM - 1 PM</div>
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    Extra Classes + Tests (4 hours)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">1-Year Course Pricing</h2>
          <div className="max-w-xl mx-auto">
            <div className="bg-white border-2 border-red-400 rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white py-4 text-center">
                <h3 className="text-2xl font-bold">1-Year NEET Biology 2026</h3>
                <p className="text-red-200">April 2025 - April 2026</p>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-red-600">₹65,000 - 85,000</span>
                  <p className="text-sm text-gray-500 mt-1">Complete 1-year program</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>800+ hours of classroom teaching</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Complete NEET biology study material</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>50+ chapter tests + 15 full mocks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Daily MCQ practice (20 questions/day)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Doubt sessions + WhatsApp support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Scholarship based on previous scores</span>
                  </li>
                </ul>
                <a
                  href="tel:+919953643938"
                  className="block w-full bg-red-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Enroll Now - Call 99536-43938
                </a>
                <p className="text-center text-sm text-gray-500 mt-3">EMI options available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Center Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-4">1-Year Program Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold">Sector 62</p>
                    <p className="text-gray-600">Noida, UP 201301</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-semibold">Next Batch Starts</p>
                    <p className="text-gray-600">April 2025 (New Session)</p>
                    <p className="text-gray-600">Late joining accepted till August</p>
                  </div>
                </div>
                <a
                  href="tel:+919953643938"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  <Phone className="w-5 h-5" />
                  Book Free Counseling
                </a>
              </div>
              <div className="md:w-1/2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d77.3683!3d28.6271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSector%2062%2C%20Noida!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your 1-Year NEET Journey</h2>
          <p className="text-xl text-red-100 mb-8">
            Limited seats in 2026 batch. Early enrollment gets scholarship benefits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919953643938"
              className="bg-yellow-500 text-red-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call Now: 99536-43938
            </a>
            <Link
              href="/neet-coaching-noida"
              className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: '1 Year NEET Course Noida',
            description:
              'Intensive 1-year NEET biology coaching for Class 12 students and droppers',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            timeRequired: 'P12M',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Offline',
              duration: 'P12M',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
