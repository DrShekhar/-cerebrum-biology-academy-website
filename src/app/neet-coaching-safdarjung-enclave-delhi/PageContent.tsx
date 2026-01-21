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
  Building,
  Stethoscope,
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

const safdarjungAreas = [
  { name: 'Safdarjung Enclave', distance: '28 km', landmark: 'Near AIIMS' },
  { name: 'Green Park', distance: '26 km', landmark: 'Near Green Park Metro' },
  { name: 'Hauz Khas', distance: '24 km', landmark: 'Near IIT Delhi' },
  { name: 'SDA Market', distance: '27 km', landmark: 'Near Safdarjung Development Area' },
  { name: 'Safdarjung Hospital Area', distance: '25 km', landmark: 'Near Safdarjung Hospital' },
  { name: 'Kidwai Nagar', distance: '23 km', landmark: 'Near AIIMS Metro' },
  { name: 'Jor Bagh', distance: '22 km', landmark: 'Near Lodhi Garden' },
  { name: 'Andrews Ganj', distance: '26 km', landmark: 'Near South Extension' },
]

const whyChooseUs = [
  {
    icon: Stethoscope,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus - perfect for students near AIIMS campus.',
  },
  {
    icon: Target,
    title: '500+ NEET Selections',
    description: 'Proven track record with students from Safdarjung area and South Delhi.',
  },
  {
    icon: GraduationCap,
    title: 'Medical Focus',
    description: 'Specialized coaching for students aspiring to join AIIMS, Safdarjung Hospital, and other medical colleges.',
  },
  {
    icon: Star,
    title: 'Top Results',
    description: 'Students from Safdarjung area scored 680+ in NEET with our guidance.',
  },
]

const faqs = [
  {
    question: 'Do you have a coaching center in Safdarjung Enclave?',
    answer:
      'Our main center is in Greater Noida. For Safdarjung Enclave students, we offer premium live online classes. Being near AIIMS, many students here are highly motivated for NEET - our AIIMS faculty understands exactly what it takes to crack NEET and get into top medical colleges.',
  },
  {
    question: 'How does being near AIIMS help my NEET preparation?',
    answer:
      'Our founder Dr. Shekhar C Singh is an AIIMS alumnus. He provides insider knowledge about what AIIMS looks for in students, tips from actual AIIMS experience, and motivation by sharing real stories from AIIMS. Safdarjung area students benefit from this medical ecosystem mindset.',
  },
  {
    question: 'What schools do your Safdarjung area students come from?',
    answer:
      'We have students from Sardar Patel Vidyalaya, DPS RK Puram, Modern School Barakhamba, Springdales, and other premier schools. Many students from Green Park, Hauz Khas, and SDA also join our classes.',
  },
  {
    question: 'Do you cover CBSE Board along with NEET?',
    answer:
      'Yes! Our comprehensive program covers both CBSE Class 11-12 Biology syllabus and NEET preparation. We ensure students score 95%+ in boards while preparing for NEET competitively.',
  },
]

export default function PageContent() {
  const heroAnim = useScrollAnimation()
  const areasHeaderAnim = useScrollAnimation()
  const whyHeaderAnim = useScrollAnimation()
  const faqsHeaderAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cerebrum Biology Academy - NEET Coaching Safdarjung Enclave',
    description: 'Best NEET Coaching for Safdarjung Enclave students - Near AIIMS Delhi, AIIMS Faculty',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-safdarjung-enclave-delhi',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: ['Safdarjung Enclave', 'Green Park', 'Hauz Khas', 'SDA', 'Kidwai Nagar', 'Jor Bagh'],
    priceRange: '$$',
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Stethoscope className="w-5 h-5 mr-2 text-yellow-400" />
              Near AIIMS Delhi | AIIMS Faculty
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Coaching in{' '}
              <span className="text-yellow-400">Safdarjung Enclave</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Best Biology Coaching Near AIIMS | Medical Entrance Expert
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET coaching for students in Safdarjung Enclave, Green Park, Hauz Khas & nearby areas.
              Learn from <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong> - the perfect mentor for future doctors.
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

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Safdarjung%20Enclave%20and%20interested%20in%20NEET%20coaching"
                target="_blank" rel="noopener noreferrer"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-green-400 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
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
                <Stethoscope className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">AIIMS</div>
                <div className="text-sm opacity-80">Faculty</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">680+</div>
                <div className="text-sm opacity-80">Top Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Covered */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={areasHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              areasHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Safdarjung Enclave & Nearby Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online NEET coaching for students near AIIMS Delhi campus
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safdarjungAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{area.distance} from center</p>
                <p className="text-sm text-gray-400">{area.landmark}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={whyHeaderAnim.ref}
            className={`text-center mb-16 transition-all duration-600 ${
              whyHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Safdarjung Area Students Choose Us
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
      <section className="py-12 md:py-20 bg-gray-50">
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
      <section className="py-12 md:py-20 bg-gradient-to-r from-green-600 via-green-700 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Future Doctors from Safdarjung Area, Join Us!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Premium NEET coaching with AIIMS faculty - perfect for students near AIIMS
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

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Safdarjung%20Enclave%20and%20interested%20in%20NEET%20coaching"
                target="_blank" rel="noopener noreferrer"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-green-400 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
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
              href="/biology-tutor-hauz-khas"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Hauz Khas
            </Link>
            <Link
              href="/neet-coaching-vasant-kunj-delhi"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Vasant Kunj
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
