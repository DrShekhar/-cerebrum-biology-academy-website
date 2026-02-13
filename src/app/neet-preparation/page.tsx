'use client'

import {
  Target,
  Trophy,
  Star,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Calendar,
  FileText,
  Brain,
  Lightbulb,
  TrendingUp,
  BarChart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const preparationPhases = [
  {
    phase: 'Phase 1',
    title: 'Foundation Building',
    duration: '3-4 months',
    description: 'Master NCERT concepts and build strong fundamentals.',
    topics: ['NCERT thorough reading', 'Concept clarity', 'Basic problem solving'],
    icon: BookOpen,
  },
  {
    phase: 'Phase 2',
    title: 'Deep Learning',
    duration: '3-4 months',
    description: 'Advanced concepts and competitive exam level problems.',
    topics: ['Advanced questions', 'Application-based', 'Topic integration'],
    icon: Brain,
  },
  {
    phase: 'Phase 3',
    title: 'Practice & Revision',
    duration: '2-3 months',
    description: 'Intensive practice with previous years and mock tests.',
    topics: ['Previous year papers', 'Mock tests', 'Weak area focus'],
    icon: Target,
  },
  {
    phase: 'Phase 4',
    title: 'Final Revision',
    duration: '1-2 months',
    description: 'Quick revision and exam strategies for D-day.',
    topics: ['Quick revision', 'Time management', 'Exam strategies'],
    icon: TrendingUp,
  },
]

const subjectStrategy = [
  {
    subject: 'Biology',
    marks: '360 marks',
    color: 'green',
    tips: [
      'NCERT is Bible - Read line by line',
      'Focus on diagrams and flowcharts',
      'Previous year questions are gold',
      'Assertion-Reason practice daily',
    ],
  },
  {
    subject: 'Physics',
    marks: '180 marks',
    color: 'blue',
    tips: [
      'Formula mastery is key',
      'Solve numerical daily',
      'Understand concepts, not rote',
      'Practice previous year papers',
    ],
  },
  {
    subject: 'Chemistry',
    marks: '180 marks',
    color: 'purple',
    tips: [
      'Organic needs practice',
      'NCERT for Inorganic',
      'Physical - formula + concepts',
      'Daily revision of reactions',
    ],
  },
]

const studyPlan = [
  { time: '5:00 AM - 6:00 AM', activity: 'Revision of previous day', type: 'revision' },
  { time: '6:00 AM - 7:00 AM', activity: 'Morning walk/exercise', type: 'break' },
  { time: '8:00 AM - 12:00 PM', activity: 'Biology/Chemistry study', type: 'study' },
  { time: '12:00 PM - 1:00 PM', activity: 'Lunch break', type: 'break' },
  { time: '1:00 PM - 5:00 PM', activity: 'Physics study + problems', type: 'study' },
  { time: '5:00 PM - 6:00 PM', activity: 'Break/recreation', type: 'break' },
  { time: '6:00 PM - 9:00 PM', activity: 'Practice questions/tests', type: 'practice' },
  { time: '9:00 PM - 10:00 PM', activity: "Day's revision + planning", type: 'revision' },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Daily live sessions with instant doubt resolution.',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, question banks, and formula sheets.',
  },
  {
    icon: BarChart,
    title: 'Regular Assessments',
    description: 'Weekly tests with detailed performance analysis.',
  },
  {
    icon: FileText,
    title: 'Mock Test Series',
    description: 'Full-length NEET simulations with OMR practice.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'WhatsApp support for instant doubt resolution.',
  },
  {
    icon: Calendar,
    title: 'Structured Schedule',
    description: 'Day-by-day study plan covering entire syllabus.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'NCERT Coverage', value: '100%', icon: BookOpen },
  { label: 'Mock Tests', value: '50+', icon: FileText },
  { label: 'Top Score', value: '720', icon: Star },
]

const faqs = [
  {
    question: 'How to prepare for NEET 2026?',
    answer:
      'NEET 2026 preparation requires: 1) Master NCERT completely - especially Biology, 2) Create a realistic study schedule (8-10 hours daily), 3) Solve previous year papers (last 10 years), 4) Take regular mock tests, 5) Focus on weak areas, 6) Join good coaching for guidance. Our structured program covers all these aspects.',
  },
  {
    question: 'What is the best NEET preparation course?',
    answer:
      'The best NEET preparation course includes: NCERT-based curriculum, expert faculty, regular testing, doubt clearing sessions, and personalized attention. Our NEET course at Cerebrum Biology Academy covers Biology, Physics, and Chemistry with 98% success rate.',
  },
  {
    question: 'Can I crack NEET with self-study?',
    answer:
      'While self-study is possible, joining coaching significantly improves your chances. Coaching provides structured preparation, expert guidance, regular testing, peer competition, and doubt support. However, self-study hours are equally important alongside coaching.',
  },
  {
    question: 'How many hours should I study for NEET daily?',
    answer:
      'For serious NEET preparation, you should study 8-10 hours daily. This includes 4-5 hours of new learning, 2-3 hours of revision, and 2 hours of practice problems. Quality of study matters more than just hours.',
  },
  {
    question: 'What books are best for NEET preparation?',
    answer:
      'NCERT textbooks are the primary source for NEET. Additionally: Biology - MTG, Trueman; Physics - HC Verma, DC Pandey; Chemistry - MS Chauhan (Organic), OP Tandon (Inorganic). Our course provides comprehensive notes covering all these sources.',
  },
]

export default function NeetPreparationPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_preparation', {
        event_category: 'conversion',
        event_label: 'neet_preparation_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 via-cyan-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Target className="w-5 h-5 mr-2 text-yellow-300" />
              Complete NEET Preparation Guide & Course
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">NEET Preparation</span> 2025
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Complete Course | Study Plan | Mock Tests | Expert Guidance
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Start your NEET preparation with India&apos;s best coaching. Structured course
              covering Biology, Physics, Chemistry with AIIMS-trained faculty, comprehensive study
              material, and proven 98% success rate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View NEET Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Phases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Preparation Roadmap
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven 4-phase approach to crack NEET
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preparationPhases.map((phase, index) => (
              <div
                key={phase.phase}
                className="bg-white rounded-xl p-6 shadow-lg relative animate-fadeInUp"
              >
                <div className="absolute -top-3 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {phase.phase}
                </div>
                <phase.icon className="w-10 h-10 text-green-600 mb-4 mt-2" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{phase.title}</h3>
                <div className="text-sm text-green-600 font-medium mb-2">{phase.duration}</div>
                <p className="text-gray-600 text-sm mb-4">{phase.description}</p>
                <ul className="space-y-1">
                  {phase.topics.map((topic) => (
                    <li key={topic} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Strategy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Subject-wise NEET Preparation Strategy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subjectStrategy.map((subject, index) => (
              <div
                key={subject.subject}
                className={`bg-${subject.color}-50 rounded-xl p-8 border-2 border-${subject.color}-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{subject.subject}</h3>
                  <span
                    className={`bg-${subject.color}-600 text-white px-3 py-1 rounded-full text-sm font-bold`}
                  >
                    {subject.marks}
                  </span>
                </div>
                <ul className="space-y-3">
                  {subject.tips.map((tip, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <Lightbulb
                        className={`w-5 h-5 text-${subject.color}-600 mr-2 flex-shrink-0 mt-0.5`}
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our NEET Course Includes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              FAQs - NEET Preparation
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Preparation Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Complete NEET course with 98% success rate. Your medical dream is just one step away!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Complete Course</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>50+ Mock Tests</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>98% Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/best-neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best NEET Coaching
            </Link>
            <Link
              href="/neet-coaching-centre"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Centre
            </Link>
            <Link
              href="/neet-coaching-institute"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Institute
            </Link>
            <Link
              href="/neet-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Classes
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
