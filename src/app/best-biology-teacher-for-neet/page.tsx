'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
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
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Lightweight scroll animation hook (replaces framer-motion)
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
      'Deep understanding of NEET question patterns, frequently asked topics, and marking scheme optimization.',
  },
  {
    icon: Dna,
    title: 'NCERT Focus',
    description:
      'Teaching methodology centered around NCERT - the primary source for 95% of NEET Biology questions.',
  },
  {
    icon: Brain,
    title: 'Conceptual Clarity',
    description:
      'Building strong foundations that help students tackle any variation of questions in the exam.',
  },
  {
    icon: Microscope,
    title: 'Previous Year Analysis',
    description: '15+ years of PYQs analyzed and integrated into teaching for better preparation.',
  },
  {
    icon: TrendingUp,
    title: 'Score Improvement',
    description:
      'Average 40% improvement in Biology scores. Many students jump from 250 to 350+ in Biology.',
  },
  {
    icon: Zap,
    title: 'Quick Revision',
    description: 'Scientifically designed revision techniques for last-minute preparation.',
  },
]

const neetResults = [
  { year: '2024', selections: '450+', topRank: 'AIR 234' },
  { year: '2023', selections: '420+', topRank: 'AIR 189' },
  { year: '2022', selections: '380+', topRank: 'AIR 312' },
  { year: '2021', selections: '350+', topRank: 'AIR 278' },
]

const faqs = [
  {
    question: 'What makes a biology teacher best for NEET?',
    answer:
      'The best NEET biology teacher should have: (1) Personal experience with medical entrances like AIIMS/NEET, (2) Deep understanding of NCERT and NEET pattern, (3) Track record of successful selections, (4) Ability to simplify complex concepts, and (5) Regular mock tests and doubt resolution. Our faculty checks all these boxes.',
  },
  {
    question: 'How important is Biology for NEET?',
    answer:
      'Biology carries 360 marks out of 720 in NEET - exactly 50% of the paper. It is the most scoring subject if prepared well. Top rankers typically score 340+ in Biology. Our teaching methodology ensures maximum marks in Biology.',
  },
  {
    question: 'Can I score 360/360 in NEET Biology?',
    answer:
      'Absolutely! Every year, several students score 360/360 in Biology. It requires thorough NCERT reading, understanding diagrams, and practicing previous year questions. Our students have scored perfect 360 multiple times.',
  },
  {
    question: 'How many hours should I study Biology for NEET?',
    answer:
      'We recommend 3-4 hours daily for Biology. Our structured classes (2 hours) + self-study (2 hours) ensure comprehensive coverage. Quality matters more than quantity - our teaching maximizes learning efficiency.',
  },
]

export default function BestBiologyTeacherForNeetPage() {
  // Scroll animation hooks for each section
  const heroAnim = useScrollAnimation()
  const expertiseHeaderAnim = useScrollAnimation()
  const resultsHeaderAnim = useScrollAnimation()
  const transformHeaderAnim = useScrollAnimation()
  const faqsHeaderAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

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
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
              2500+ NEET Selections
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Teacher</span> for NEET
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS-Trained Faculty | 360/360 Achievers | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Master NEET Biology with India&apos;s most experienced faculty. Our AIIMS-trained
              teachers have helped 2500+ students crack NEET with their proven methodology focused
              on NCERT and conceptual clarity.
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

              <Link href="/neet-coaching">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  NEET Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">2500+</div>
                <div className="text-sm text-blue-100">NEET Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">360/360</div>
                <div className="text-sm text-blue-100">Perfect Scores</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">AIR 189</div>
                <div className="text-sm text-blue-100">Best Rank</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
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
              expertiseHeaderAnim.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Our Teaching Works for NEET
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized NEET Biology preparation by faculty who understand the exam inside-out
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

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={resultsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              resultsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our NEET Results Speak
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {neetResults.map((result, index) => (
              <div
                key={result.year}
                className="bg-green-50 rounded-xl p-8 text-center border-2 border-green-100 animate-fade-in-up"
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

      {/* Biology Score Transformation */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={transformHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              transformHeaderAnim.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Biology Score Transformation
            </h2>
            <p className="text-xl text-gray-600">Real results from our students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Before Joining</span>
                <span className="text-2xl font-bold text-red-500">180/360</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div className="bg-red-500 h-4 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">After 6 Months</span>
                <span className="text-2xl font-bold text-green-600">320/360</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '89%' }}></div>
              </div>
              <p className="mt-4 text-center text-gray-600 font-medium">+140 marks improvement</p>
            </div>

            <div
              className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Before Joining</span>
                <span className="text-2xl font-bold text-red-500">220/360</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div className="bg-red-500 h-4 rounded-full" style={{ width: '61%' }}></div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">After 6 Months</span>
                <span className="text-2xl font-bold text-green-600">350/360</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '97%' }}></div>
              </div>
              <p className="mt-4 text-center text-gray-600 font-medium">+130 marks improvement</p>
            </div>

            <div
              className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Before Joining</span>
                <span className="text-2xl font-bold text-red-500">260/360</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div className="bg-red-500 h-4 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">After 6 Months</span>
                <span className="text-2xl font-bold text-green-600">360/360</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="mt-4 text-center text-gray-600 font-medium">Perfect Score Achieved!</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Master NEET Biology?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 2500+ successful students. Book your free demo today!
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

      {/* Related Pages */}
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
              href="/neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching
            </Link>
            <Link
              href="/neet-biology-syllabus-2026"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Syllabus
            </Link>
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
