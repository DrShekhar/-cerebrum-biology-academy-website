'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  MessageCircle,
  Play,
  Headphones,
  MapPin,
  Star,
  GraduationCap,
  Target,
  Train,
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

const vaishaliAreas = [
  { name: 'Vaishali Sector 1', distance: '10 km', metro: 'Vaishali Metro', landmark: 'Near Metro Station' },
  { name: 'Vaishali Sector 2', distance: '10 km', metro: 'Vaishali Metro', landmark: 'Residential Hub' },
  { name: 'Vaishali Sector 3', distance: '11 km', metro: 'Vaishali Metro', landmark: 'Mahagun Mall' },
  { name: 'Vaishali Sector 4', distance: '11 km', metro: 'Vaishali Metro', landmark: 'Schools Area' },
  { name: 'Vaishali Sector 5', distance: '12 km', metro: 'Vaishali Metro', landmark: 'Commercial Hub' },
  { name: 'Vaishali Sector 6', distance: '12 km', metro: 'Vaishali Metro', landmark: 'Near Indirapuram' },
  { name: 'Kaushambi', distance: '13 km', metro: 'Kaushambi Metro', landmark: 'Anand Vihar ISBT' },
  { name: 'Indirapuram', distance: '8 km', metro: 'Vaishali Metro', landmark: 'Shipra Mall' },
]

const whyChooseUs = [
  {
    icon: Train,
    title: 'Metro Connected',
    description: 'Direct Aqua Line from Vaishali Metro to Greater Noida.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience.',
  },
  {
    icon: Target,
    title: '500+ NEET Selections',
    description: 'Proven track record with students from Vaishali and nearby areas.',
  },
  {
    icon: Star,
    title: 'Convenient Location',
    description: 'Easy access for Vaishali, Kaushambi, and Indirapuram students.',
  },
]

const faqs = [
  {
    question: 'How do I reach your center from Vaishali Metro?',
    answer:
      'From Vaishali Metro, you can take the Aqua Line directly to Greater Noida. The journey takes about 25-30 minutes. Alternatively, you can drive via NH-24 which takes 15-20 minutes.',
  },
  {
    question: 'Do you have students from Vaishali sectors?',
    answer:
      'Yes! We have many students from all Vaishali sectors (1-6), Kaushambi, and surrounding areas. Parents appreciate that we offer quality teaching with AIIMS faculty.',
  },
  {
    question: 'What makes your coaching better than local Vaishali centers?',
    answer:
      'Our AIIMS faculty, proven track record of 500+ NEET selections, and comprehensive study material set us apart. Many parents prefer quality over convenience for their children\'s future.',
  },
  {
    question: 'Are online classes available for Vaishali students?',
    answer:
      'Yes! We offer both offline and online classes. Our online platform provides live interactive sessions, recorded lectures, and practice tests - perfect for students who prefer learning from home.',
  },
]

export default function BiologyTutorVaishaliPage() {
  const heroAnim = useScrollAnimation()
  const areasHeaderAnim = useScrollAnimation()
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
            name: 'Cerebrum Biology Academy - Vaishali',
            description: 'Best Biology Tutor for Vaishali students - NEET & Board exam preparation',
            url: 'https://cerebrumbiologyacademy.com/biology-tutor-vaishali',
            telephone: '+91-88264-44334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'IN',
            },
            areaServed: ['Vaishali', 'Vaishali Sector 1-6', 'Kaushambi', 'Indirapuram'],
            priceRange: '$$',
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
              <Train className="w-5 h-5 mr-2 text-yellow-400" />
              Direct Metro from Vaishali Station
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tutor in{' '}
              <span className="text-yellow-400">Vaishali</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NEET & Board Preparation | Vaishali Metro | Ghaziabad
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert Biology coaching for Vaishali students.
              Learn from <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong>.
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

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-80">NEET Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm opacity-80">Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Train className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm opacity-80">Min via Metro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Covered */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={areasHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              areasHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Vaishali & Nearby Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Students from all Vaishali sectors and Kaushambi attend our classes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vaishaliAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{area.distance} from center</p>
                <div className="flex items-center text-sm text-blue-600 mb-1">
                  <Train className="w-4 h-4 mr-1" />
                  {area.metro}
                </div>
                <p className="text-sm text-gray-400">{area.landmark}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={whyHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              whyHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Vaishali Students Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
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
              Vaishali Students, Join Us!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Quality NEET coaching with AIIMS faculty
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
              href="/biology-tutor-ghaziabad"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Ghaziabad
            </Link>
            <Link
              href="/biology-tutor-indirapuram"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Indirapuram
            </Link>
            <Link
              href="/biology-tutor-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Noida
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
