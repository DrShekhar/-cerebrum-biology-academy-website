'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  Star,
  Video,
  MessageCircle,
  Play,
  Headphones,
  MapPin,
  GraduationCap,
  Building,
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

const delhiNCRLocations = [
  { area: 'Greater Noida', distance: 'Center Location', mode: 'Offline + Online' },
  { area: 'Noida', distance: '15 km', mode: 'Online + Hybrid' },
  { area: 'Delhi (South)', distance: '40 km', mode: 'Online Preferred' },
  { area: 'Delhi (East)', distance: '25 km', mode: 'Online + Hybrid' },
  { area: 'Ghaziabad', distance: '20 km', mode: 'Online + Hybrid' },
  { area: 'Faridabad', distance: '45 km', mode: 'Online Preferred' },
  { area: 'Gurugram', distance: '55 km', mode: 'Online' },
  { area: 'Indirapuram', distance: '15 km', mode: 'Online + Hybrid' },
]

const whyDelhiNCR = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty in Delhi NCR',
    description: 'Dr. Shekhar C Singh, AIIMS Alumnus, teaching in Greater Noida since 2010.',
  },
  {
    icon: Building,
    title: 'Former Narayana Head',
    description: 'Academic Head experience at Narayana, bringing proven methodologies.',
  },
  {
    icon: Trophy,
    title: 'Top Delhi NCR Results',
    description: 'students from Delhi NCR selected in NEET with top AIRs.',
  },
  {
    icon: MapPin,
    title: 'Convenient Location',
    description: 'Center in Greater Noida, accessible from all parts of Delhi NCR.',
  },
  {
    icon: Video,
    title: 'Online Option Available',
    description: 'Join online if commute is an issue. Same quality, same faculty.',
  },
  {
    icon: Users,
    title: 'Small Batch Teaching',
    description: 'Maximum 25 students for personalized attention and mentoring.',
  },
]

const faqs = [
  {
    question: 'Where is the best NEET Biology tutor in Delhi NCR?',
    answer:
      'Cerebrum Biology Academy in Greater Noida offers the best NEET Biology coaching in Delhi NCR. Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head, provides expert coaching. Students from Delhi, Noida, Ghaziabad, Faridabad, and Gurugram join us for quality education.',
  },
  {
    question: 'Can students from Delhi join classes in Greater Noida?',
    answer:
      'Yes! Many students from Delhi travel to Greater Noida for classes. With improved connectivity via Noida-Greater Noida Expressway and upcoming Metro, commute is convenient. Alternatively, we offer online classes for those who prefer learning from home.',
  },
  {
    question: 'Do you offer home tuition in Delhi NCR?',
    answer:
      "We don't offer home tuition as our structured classroom/online environment is more effective. However, our online classes are equivalent to having a personal tutor at home. For students in Greater Noida, we have convenient center-based classes.",
  },
  {
    question: 'How does your coaching compare to Kota coaching?',
    answer:
      "We offer Kota-level quality without the need to relocate. Dr. Shekhar Singh's teaching methodology, developed through years at premier institutes, is comparable to top Kota faculties. Many of our students have outperformed students from expensive Kota coaching.",
  },
  {
    question: 'What areas of Delhi NCR do you cover?',
    answer:
      'We have students from all parts of Delhi NCR - South Delhi, East Delhi, Noida, Greater Noida, Ghaziabad, Indirapuram, Faridabad, and Gurugram. Our center is in Greater Noida with online classes available for distant students.',
  },
]

export default function BestNEETBiologyTutorDelhiNCRPage() {
  const heroAnim = useScrollAnimation()
  const locationsHeaderAnim = useScrollAnimation()
  const whyHeaderAnim = useScrollAnimation()
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
            '@type': 'LocalBusiness',
            name: 'Cerebrum Biology Academy',
            description: 'Best NEET Biology Tutor in Delhi NCR',
            url: 'https://cerebrumbiologyacademy.com',
            telephone: '+91-88264-44334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'IN',
            },
            areaServed: ['Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Faridabad', 'Gurugram'],
            founder: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              description: 'AIIMS Alumnus, Former Narayana Academic Head',
            },
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
              <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
              Serving All Delhi NCR
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best NEET Biology Tutor in <span className="text-yellow-400">Delhi NCR</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Delhi | Noida | Greater Noida | Ghaziabad | Faridabad
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Get top NEET Biology coaching from{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus and former Narayana Academic Head</strong>.
              The best NEET Biology tutor accessible to all of Delhi NCR.
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

              <Link href="/contact">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Get Directions
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">6+</div>
                <div className="text-sm opacity-80">Cities Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">67+</div>
                <div className="text-sm opacity-80">NCR Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years in NCR</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={locationsHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              locationsHeaderAnim.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Serving All Delhi NCR
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Center in Greater Noida with online classes for distant students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {delhiNCRLocations.map((loc, index) => (
              <div
                key={loc.area}
                className="bg-white rounded-lg p-5 shadow-md animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-bold text-gray-900">{loc.area}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-2">{loc.distance}</p>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  {loc.mode}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Delhi NCR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={whyHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              whyHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us in Delhi NCR
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyDelhiNCR.map((item, index) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-100 animate-fade-in-up"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Best NEET Coaching in Delhi NCR!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join the top NEET Biology tutor. Book your free demo today!
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
              href="/neet-biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Tutor
            </Link>
            <Link
              href="/biology-tutor-greater-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Greater Noida Tutor
            </Link>
            <Link
              href="/biology-tutor-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Noida Tutor
            </Link>
            <Link
              href="/neet-biology-tutor-online"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
