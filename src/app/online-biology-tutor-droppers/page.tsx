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
  Headphones,
  Clock,
  TrendingUp,
  RefreshCw,
  Zap,
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

const dropperFeatures = [
  {
    icon: RefreshCw,
    title: 'Complete Revision',
    description: 'Thorough revision of Class 11 & 12 Biology with focus on weak areas.',
  },
  {
    icon: Target,
    title: 'NEET 2026 Focused',
    description: 'Intensive preparation specifically designed for NEET 2026.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Full-day online batches designed for dedicated NEET preparation.',
  },
  {
    icon: TrendingUp,
    title: 'Score Improvement',
    description: 'Proven track record of 50-100 marks improvement in Biology.',
  },
  {
    icon: Video,
    title: 'Live + Recorded',
    description: 'Live interactive classes plus recorded lectures for revision.',
  },
  {
    icon: Zap,
    title: 'Crash Courses',
    description: 'Intensive crash courses available for last-minute preparation.',
  },
]

const successStories = [
  { name: 'Previous Score', before: '240/360', after: '340/360', improvement: '+100' },
  { name: 'Previous Score', before: '200/360', after: '320/360', improvement: '+120' },
  { name: 'Previous Score', before: '280/360', after: '350/360', improvement: '+70' },
]

const faqs = [
  {
    question: 'Can droppers study online effectively?',
    answer:
      'Absolutely! Our dropper batch students have achieved excellent results studying online. The flexibility of online learning allows focused preparation without travel hassles. Many droppers actually prefer online as they can study more hours.',
  },
  {
    question: 'What is the course structure for NEET droppers?',
    answer:
      'Our 1-year dropper course includes: Complete Class 11+12 Biology revision, NCERT line-by-line coverage, 15+ years PYQ practice, weekly mock tests, daily doubt sessions, and crash course before exam. Approximately 6-8 hours of content daily.',
  },
  {
    question: 'How much can I improve my Biology score as a dropper?',
    answer:
      'With dedicated effort, droppers typically improve 50-100 marks in Biology. Our students have jumped from 200 to 320, 240 to 340, and even achieved 360/360. The key is consistent study and utilizing our complete resources.',
  },
  {
    question: 'What support do droppers get?',
    answer:
      'Droppers receive: Dedicated mentor, personalized study plan, daily doubt sessions, weekly one-on-one reviews, mental health support, and parent updates. We understand the pressure and provide complete support.',
  },
  {
    question: 'Is there a crash course for NEET 2026?',
    answer:
      'Yes! We offer NEET 2026 Biology Crash Course (3 months intensive) for droppers who join late or need focused revision. Contact us for current batch timings.',
  },
]

export default function OnlineBiologyTutorDroppersPage() {
  const heroAnim = useScrollAnimation()
  const featuresHeaderAnim = useScrollAnimation()
  const successHeaderAnim = useScrollAnimation()
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
            name: 'NEET Dropper Biology Online Course',
            description: 'Intensive online biology course for NEET droppers/repeaters',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
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

      {/* Hero */}
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
              <RefreshCw className="w-5 h-5 mr-2 text-yellow-400" />
              Dedicated Dropper Program
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Online Biology Tutor for <span className="text-yellow-400">NEET Droppers</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              1-Year Intensive Program | AIIMS Faculty | Proven Results
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Your second attempt can be your success story. Learn from{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong> in our dedicated dropper batch.
              Complete revision, intensive practice, and personalized mentoring.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

              <Link href="/courses/neet-dropper">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Dropper Course Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm opacity-80">Dropper Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">+100</div>
                <div className="text-sm opacity-80">Avg Score Jump</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm opacity-80">Max Batch Size</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={featuresHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              featuresHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Designed for Droppers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dropper program addresses the specific needs of repeaters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dropperFeatures.map((item, index) => (
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

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={successHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              successHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Dropper Success Stories
            </h2>
            <p className="text-xl text-gray-600">Real transformations from our dropper batch</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center border-2 border-green-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-gray-600 mb-4">Biology Score</div>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-red-500">{story.before}</div>
                    <div className="text-sm text-gray-500">Before</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">{story.after}</div>
                    <div className="text-sm text-gray-500">After</div>
                  </div>
                </div>
                <div className="bg-green-600 text-white px-4 py-2 rounded-full inline-block font-bold">
                  {story.improvement} Marks
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Dropper Support
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Support</h3>
              <ul className="space-y-4">
                {[
                  'Complete Class 11 + 12 Biology revision',
                  'NCERT line-by-line coverage',
                  '15+ years PYQ practice',
                  'Weekly full-length mock tests',
                  'Chapter-wise test series',
                  'Daily doubt sessions',
                  'Personal mentor assigned',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Support</h3>
              <ul className="space-y-4">
                {[
                  'Personalized study plan',
                  'Weekly one-on-one reviews',
                  'Weak area identification',
                  'Time management guidance',
                  'Stress management support',
                  'Parent progress updates',
                  '24/7 WhatsApp support',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Make Your Drop Year Count!</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join 200+ successful droppers. Book your free demo today!
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

      {/* Related */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-biology-tutor-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Online Tutor
            </Link>
            <Link
              href="/neet-biology-tutor-for-droppers"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Tutor for Droppers
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
