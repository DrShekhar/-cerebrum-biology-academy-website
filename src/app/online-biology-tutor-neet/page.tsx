'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Dna,
  Brain,
  Microscope,
  TrendingUp,
  Zap,
  Headphones,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

const neetExpertise = [
  {
    icon: Target,
    title: 'NEET Pattern Mastery',
    description:
      'Deep understanding of NEET question patterns, marking scheme, and frequently asked topics.',
  },
  {
    icon: Dna,
    title: '100% NCERT Focus',
    description:
      'Our online teaching is centered around NCERT - the primary source for 95% of NEET Biology questions.',
  },
  {
    icon: Brain,
    title: 'Conceptual Clarity',
    description:
      'Building strong foundations through live interactive sessions for tackling any question variation.',
  },
  {
    icon: Microscope,
    title: 'PYQ Analysis',
    description: '15+ years of previous year questions analyzed and integrated into online teaching.',
  },
  {
    icon: TrendingUp,
    title: 'Score Improvement',
    description:
      'Average 40% improvement in Biology scores. Online students achieve similar results as offline.',
  },
  {
    icon: Zap,
    title: 'Quick Revision',
    description: 'Recorded lectures + revision sessions for last-minute preparation anytime, anywhere.',
  },
]

const neetResults = [
  { year: '2024', selections: '450+', topRank: 'AIR 234' },
  { year: '2023', selections: '420+', topRank: 'AIR 189' },
  { year: '2022', selections: '380+', topRank: 'AIR 312' },
]

const faqs = [
  {
    question: 'Can I crack NEET with online biology coaching?',
    answer:
      'Absolutely! Our online students have achieved similar results to offline students. Many have scored 340+ in Biology. The key is consistent attendance, practice, and utilizing recorded lectures for revision.',
  },
  {
    question: 'How are online NEET biology classes conducted?',
    answer:
      'Live interactive classes via Zoom/Google Meet with Dr. Shekhar C Singh and team. You can ask questions in real-time. All classes are recorded for revision. We also have WhatsApp doubt support.',
  },
  {
    question: 'What is the syllabus coverage for NEET Biology online?',
    answer:
      'Complete NEET syllabus including Botany and Zoology from Class 11 and 12. 100% NCERT coverage plus additional topics for competitive edge. Previous year questions are integrated throughout.',
  },
  {
    question: 'Do online students get the same study material?',
    answer:
      'Yes! All online students receive comprehensive digital study material including notes, NCERT solutions, previous year papers, chapter-wise MCQs, and weekly test series - same quality as offline.',
  },
]

export default function OnlineBiologyTutorNeetPage() {
  const heroAnim = useScrollAnimation()
  const expertiseHeaderAnim = useScrollAnimation()
  const resultsHeaderAnim = useScrollAnimation()
  const faqsHeaderAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Online NEET Biology Coaching',
            description: 'Live interactive online NEET Biology preparation by AIIMS faculty',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            instructor: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              description: 'AIIMS Alumnus, Former Narayana Academic Head',
            },
            courseMode: 'online',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              500+ Medical Selections
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Online <span className="text-yellow-400">NEET Biology Tutor</span>
            </h1>

            <h2 className="text-xl md:text-2xl text-blue-100 mb-4">
              Live Classes | AIIMS Faculty | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Master NEET Biology online with{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head</strong>.
              Live interactive classes with NCERT-focused teaching that has produced 500+ medical
              selections.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Online Demo
                </Button>
              </Link>

              <Link href="/neet-coaching">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  NEET 2026 Course
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-100">Medical Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">360/360</div>
                <div className="text-sm text-blue-100">Perfect Scores</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Pan-India</div>
                <div className="text-sm text-blue-100">Online Access</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-blue-100">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={expertiseHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              expertiseHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Online NEET Teaching Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Same quality teaching as offline, now accessible from anywhere in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neetExpertise.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={resultsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              resultsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our NEET Results
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {neetResults.map((result, index) => (
              <div
                key={result.year}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center border-2 border-green-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-3xl font-bold text-green-600 mb-2">NEET {result.year}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">{result.selections}</div>
                <div className="text-gray-600 mb-4">Selections</div>
                <div className="bg-green-600 text-white px-4 py-2 rounded-full inline-block">
                  Top Rank: {result.topRank}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            ref={faqsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              faqsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Crack NEET Biology?</h2>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Join 500+ successful students. Book your free online demo today!
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

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
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
              href="/online-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Biology Tutor
            </Link>
            <Link
              href="/neet-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Tutor
            </Link>
            <Link
              href="/online-biology-tutor-droppers"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Dropper Online Course
            </Link>
            <Link
              href="/neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
