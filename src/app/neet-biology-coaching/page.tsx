'use client'

import {
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  Microscope,
  Brain,
  Clock,
  Laptop,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const credentials = [
  { label: 'AIIMS Alumni', value: 'Faculty' },
  { label: 'Teaching Experience', value: '15+ Years' },
  { label: 'Students Taught', value: '10,000+' },
  { label: 'AIIMS Selections', value: '67+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Average Score Boost', value: '40%' },
]

const features = [
  {
    icon: Brain,
    title: 'Conceptual Clarity',
    description: 'Deep understanding through visual learning and NCERT-focused approach.',
  },
  {
    icon: Target,
    title: 'NEET-Focused',
    description: 'Syllabus aligned with NEET pattern. Topic-wise question bank practice.',
  },
  {
    icon: Video,
    title: 'Live + Recorded',
    description: 'Interactive live classes with lifetime access to recorded lectures.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'WhatsApp support for immediate doubt resolution anytime.',
  },
  {
    icon: Microscope,
    title: 'Mock Tests',
    description: 'Regular NEET-pattern mock tests with detailed analysis.',
  },
  {
    icon: Clock,
    title: 'Flexible Batches',
    description: 'Morning, evening, and weekend batches available.',
  },
]

const neetCoachingLinks = [
  {
    name: 'Best NEET Coaching',
    href: '/best-neet-coaching',
    desc: 'Top-rated NEET coaching institute',
  },
  { name: 'NEET Coaching Centre', href: '/neet-coaching-centre', desc: 'Expert coaching centers' },
  {
    name: 'NEET Coaching Institute',
    href: '/neet-coaching-institute',
    desc: 'Premier NEET institute',
  },
  { name: 'NEET Classes', href: '/neet-classes', desc: 'Regular NEET preparation classes' },
  { name: 'NEET Preparation', href: '/neet-preparation', desc: 'Complete NEET prep guide' },
  { name: 'NEET Biology Classes', href: '/neet-biology-classes', desc: 'Focused biology classes' },
]

const onlineNeetLinks = [
  { name: 'Online NEET Coaching', href: '/online-neet-coaching', desc: 'Live online classes' },
  {
    name: 'NEET Online Classes',
    href: '/neet-online-classes',
    desc: 'Interactive online sessions',
  },
  { name: 'NEET Online Course', href: '/neet-online-course', desc: 'Complete online program' },
  { name: 'NEET Online', href: '/neet-online', desc: 'All online resources' },
]

const neetToolsLinks = [
  { name: 'NEET Biology MCQ', href: '/neet-biology-mcq', desc: 'Practice MCQs' },
  { name: 'NEET 2026 Exam Date', href: '/neet-2026-exam-date', desc: 'Important dates' },
  { name: 'NEET 2026 Cutoff', href: '/neet-2026-cutoff', desc: 'Expected cutoffs' },
  { name: 'NEET Biology Syllabus', href: '/neet-biology-syllabus-2026', desc: 'Complete syllabus' },
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', desc: 'Predict your rank' },
  { name: 'NEET College Predictor', href: '/neet-college-predictor', desc: 'Find your college' },
]

const biologyLinks = [
  { name: 'Biology Tutor', href: '/biology-tutor', desc: 'Expert biology tutoring' },
  { name: 'Biology Tutors Near Me', href: '/biology-tutors-near-me', desc: 'Local biology tutors' },
  { name: 'Biology Home Tutor', href: '/biology-home-tutor', desc: 'Home tutoring options' },
  {
    name: 'Biology Tutor State Boards',
    href: '/biology-tutor-state-boards',
    desc: 'State board tutors',
  },
]

const faqs = [
  {
    question: 'What makes Cerebrum the best NEET biology coaching?',
    answer:
      'Cerebrum offers AIIMS-trained faculty with 15+ years experience, 98% success rate, comprehensive study materials, 24/7 doubt support, and personalized attention in small batches of 15-20 students.',
  },
  {
    question: 'Is online NEET coaching as effective as offline?',
    answer:
      'Yes! Our online coaching includes live interactive classes, recorded lectures for revision, digital study materials, and the same doubt resolution support as offline. Many students score 650+ with our online program.',
  },
  {
    question: 'What is the fee structure for NEET biology coaching?',
    answer:
      'Our fees vary by program type - Foundation (Class 9-10), Regular (Class 11-12), and Dropper batches. Contact us for detailed fee structure and available scholarships.',
  },
  {
    question: 'Do you provide study materials and test series?',
    answer:
      'Yes, we provide comprehensive NCERT-based study materials, chapter-wise notes, 5000+ MCQs, and regular mock tests following the exact NEET pattern.',
  },
]

export default function NEETBiologyCoachingPage() {
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
      <section className="relative bg-gradient-to-br from-green-800 via-green-800 to-cyan-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              NEET Biology Specialists
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Biology</span> Coaching
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS-Trained Faculty | 98% Success Rate | 67+ AIIMS Selections
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Join India&apos;s premier NEET Biology coaching institute. Expert faculty,
              comprehensive study materials, live classes, and 24/7 doubt support to help you
              achieve your medical dream.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">{cred.value}</div>
                  <div className="text-xs opacity-80">{cred.label}</div>
                </div>
              ))}
            </div>
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
              Why Choose Our NEET Biology Coaching?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that has helped 1,50,000+ students crack NEET
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages - NEET Coaching */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore NEET Coaching Options
            </h2>
            <p className="text-lg text-gray-600">Find the perfect coaching program for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neetCoachingLinks.map((link, index) => (
              <div
                key={link.href}
               className="animate-fadeInUp">
                <Link
                  href={link.href}
                  className="block bg-green-50 rounded-xl p-6 hover:bg-green-100 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                        {link.name}
                      </h3>
                      <p className="text-sm text-gray-600">{link.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online NEET Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full mb-4">
              <Laptop className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-blue-700 font-medium">Online Learning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Online Classes
            </h2>
            <p className="text-lg text-gray-600">Learn from anywhere with our online programs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {onlineNeetLinks.map((link, index) => (
              <div
                key={link.href}
               className="animate-fadeInUp">
                <Link
                  href={link.href}
                  className="block bg-white rounded-xl p-6 shadow hover:shadow-lg transition group"
                >
                  <Video className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">
                    {link.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{link.desc}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Tools & Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Tools & Resources
            </h2>
            <p className="text-lg text-gray-600">Free tools to help your NEET preparation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neetToolsLinks.map((link, index) => (
              <div
                key={link.href}
               className="animate-fadeInUp">
                <Link
                  href={link.href}
                  className="block bg-purple-50 rounded-xl p-6 hover:bg-purple-100 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-700">
                        {link.name}
                      </h3>
                      <p className="text-sm text-gray-600">{link.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biology Tutoring Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Biology Tutoring Options
            </h2>
            <p className="text-lg text-gray-600">Personalized biology learning</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {biologyLinks.map((link, index) => (
              <div
                key={link.href}
               className="animate-fadeInUp">
                <Link
                  href={link.href}
                  className="block bg-white rounded-xl p-6 shadow hover:shadow-lg transition group"
                >
                  <Microscope className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                    {link.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{link.desc}</p>
                </Link>
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
              Frequently Asked Questions
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
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey Today</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Book a free demo class and experience our teaching methodology!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
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
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-teacher"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Teacher
            </Link>
            <Link
              href="/online-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Classes
            </Link>
            <Link
              href="/neet-foundation-class-9"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Foundation Course
            </Link>
            <Link
              href="/international-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              International
            </Link>
            <Link
              href="/best-biology-books-for-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
