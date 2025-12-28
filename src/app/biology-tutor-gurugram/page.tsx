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
  Building2,
  Laptop,
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

const gurugramAreas = [
  { name: 'DLF Phase 1-5', distance: '35 km', metro: 'Rapid Metro', landmark: 'Cyber Hub' },
  { name: 'Golf Course Road', distance: '38 km', metro: 'HUDA City Centre', landmark: 'DLF Golf Course' },
  { name: 'Sohna Road', distance: '30 km', metro: 'HUDA City Centre', landmark: 'Subhash Chowk' },
  { name: 'MG Road', distance: '40 km', metro: 'MG Road Metro', landmark: 'Sahara Mall' },
  { name: 'Sector 14', distance: '42 km', metro: 'HUDA City Centre', landmark: 'Old Gurgaon' },
  { name: 'Sector 56-57', distance: '35 km', metro: 'HUDA City Centre', landmark: 'Golf Course Ext' },
  { name: 'Sector 82-84', distance: '28 km', metro: 'Dwarka Expressway', landmark: 'New Gurugram' },
  { name: 'Manesar', distance: '25 km', metro: 'NH-48', landmark: 'Industrial Hub' },
]

const whyChooseUs = [
  {
    icon: Laptop,
    title: 'Online Classes Ideal',
    description: 'Best option for Gurugram students - high-quality online learning from home.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience.',
  },
  {
    icon: Target,
    title: '500+ NEET Selections',
    description: 'Proven track record with students from across NCR including Gurugram.',
  },
  {
    icon: Star,
    title: 'Flexible Schedule',
    description: 'Weekend batches and recorded lectures for busy Gurugram families.',
  },
]

const faqs = [
  {
    question: 'Is your center accessible from Gurugram?',
    answer:
      'While our center in Greater Noida is 30-40 km from Gurugram, we strongly recommend our online classes for Gurugram students. Our online platform offers the same quality with live interactive sessions, recorded lectures, and practice tests.',
  },
  {
    question: 'Why should Gurugram students choose online classes?',
    answer:
      'Online classes save 2-3 hours of daily commute time. You get the same AIIMS faculty teaching, live doubt sessions, and comprehensive study material. Many of our top performers are online students from Gurugram.',
  },
  {
    question: 'Do you have students from Gurugram?',
    answer:
      'Yes! We have many students from DLF, Golf Course Road, Sohna Road, and other Gurugram areas. They prefer our online classes for the quality and convenience. Weekend offline batches are also available for those who can travel.',
  },
  {
    question: 'What about weekend classes for Gurugram students?',
    answer:
      'We offer weekend intensive batches where students can travel once a week for offline sessions. This is combined with online classes during weekdays, giving you the best of both worlds.',
  },
]

export default function BiologyTutorGurugramPage() {
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
            name: 'Cerebrum Biology Academy - Gurugram',
            description: 'Best Biology Tutor for Gurugram students - NEET & Board exam preparation with online classes',
            url: 'https://cerebrumbiologyacademy.com/biology-tutor-gurugram',
            telephone: '+91-88264-44334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'IN',
            },
            areaServed: ['Gurugram', 'Gurgaon', 'DLF', 'Golf Course Road', 'Sohna Road', 'MG Road'],
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
              <Laptop className="w-5 h-5 mr-2 text-yellow-400" />
              Online Classes Recommended for Gurugram
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tutor in{' '}
              <span className="text-yellow-400">Gurugram</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NEET & Board Preparation | Online + Weekend Batches | AIIMS Faculty
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert Biology coaching for Gurugram students via online classes.
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
                <Laptop className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Live</div>
                <div className="text-sm opacity-80">Online Classes</div>
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
              Gurugram Areas We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online classes available for all Gurugram localities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gurugramAreas.map((area, index) => (
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

          <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
            <Laptop className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Online Classes Recommended for Gurugram
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Save 2-3 hours of daily commute. Our online platform offers live interactive sessions,
              recorded lectures, doubt-clearing sessions, and the same quality teaching from AIIMS faculty.
            </p>
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
              Why Gurugram Students Choose Us
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
              Gurugram Students, Join Us Online!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Quality NEET coaching from the comfort of your home
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
              href="/neet-biology-tutor-online"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Classes
            </Link>
            <Link
              href="/biology-tutor-south-delhi"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              South Delhi
            </Link>
            <Link
              href="/biology-tutor-faridabad"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Faridabad
            </Link>
            <Link
              href="/biology-tutor-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Noida
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
