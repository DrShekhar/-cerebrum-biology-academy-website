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
  CheckCircle,
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

const greaterNoidaAreas = [
  { name: 'Knowledge Park', distance: '0 km', landmark: 'Our Center Location', highlight: true },
  { name: 'Pari Chowk', distance: '2 km', metro: 'Pari Chowk Metro' },
  { name: 'Alpha 1', distance: '3 km', metro: 'Alpha 1 Metro' },
  { name: 'Alpha 2', distance: '4 km', metro: 'Alpha 2 Metro' },
  { name: 'Beta 1', distance: '5 km', metro: 'Beta 1 Metro' },
  { name: 'Beta 2', distance: '4 km', metro: 'Beta 2 Metro' },
  { name: 'Delta 1', distance: '6 km', metro: 'Delta 1 Metro' },
  { name: 'Gamma 1', distance: '5 km', metro: 'Gamma 1 Metro' },
]

const whyChooseUs = [
  {
    icon: Building2,
    title: 'Our Home Base',
    description: 'This is where our center is located. Zero travel time for local students.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience.',
  },
  {
    icon: Target,
    title: '500+ NEET Selections',
    description: 'Proven track record with students from Greater Noida and beyond.',
  },
  {
    icon: Star,
    title: 'Complete Infrastructure',
    description: 'Well-equipped classroom, library, and dedicated doubt-solving sessions.',
  },
]

const features = [
  'Live offline classes with AIIMS faculty',
  'Small batches of 20-25 students',
  'Daily Practice Problems (DPPs)',
  'Weekly tests and performance tracking',
  'Dedicated doubt-solving sessions',
  'Complete study material provided',
  'Parent-teacher meetings',
  'WhatsApp support for quick doubts',
]

const faqs = [
  {
    question: 'Where exactly is your center in Greater Noida?',
    answer:
      'Our center is located in Knowledge Park area of Greater Noida. It is well connected via Aqua Line metro (Knowledge Park Metro Station). Exact location will be shared upon enquiry. You can visit for a free demo class.',
  },
  {
    question: 'What are the batch timings?',
    answer:
      'We offer multiple batch timings: Morning Batch (6:00 AM - 9:00 AM), Afternoon Batch (2:00 PM - 5:00 PM), and Evening Batch (6:00 PM - 9:00 PM). Weekend intensive batches are also available.',
  },
  {
    question: 'Is Aqua Line metro connected to your center?',
    answer:
      'Yes! Aqua Line metro runs through Greater Noida with multiple stations. Knowledge Park metro station is closest to our center. Students from Noida, Noida Extension, and other areas can easily reach us.',
  },
  {
    question: 'What is included in the fee?',
    answer:
      'Fee includes: (1) All classroom sessions, (2) Complete study material, (3) Daily Practice Problems, (4) Weekly tests with analysis, (5) Doubt sessions, (6) Mock tests, (7) WhatsApp support. No hidden charges.',
  },
]

export default function BiologyTutorGreaterNoidaPage() {
  const heroAnim = useScrollAnimation()
  const areasHeaderAnim = useScrollAnimation()
  const whyHeaderAnim = useScrollAnimation()
  const featuresAnim = useScrollAnimation()
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
            name: 'Cerebrum Biology Academy - Greater Noida',
            description: 'Best Biology Tutor in Greater Noida - NEET & Board exam preparation',
            url: 'https://www.cerebrumbiologyacademy.com/biology-tutor-greater-noida',
            telephone: '+91-88264-44334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'IN',
            },
            areaServed: ['Greater Noida', 'Knowledge Park', 'Pari Chowk', 'Alpha', 'Beta', 'Delta', 'Gamma'],
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
            <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 border border-yellow-400/50">
              <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
              OUR CENTER LOCATION
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tutor in{' '}
              <span className="text-yellow-400">Greater Noida</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NEET & Board Preparation | Our Home Base | Offline & Online Classes
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Welcome to our center! Learn Biology from <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong>.
              Visit us for a <strong>FREE demo class</strong> today.
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
                <div className="text-2xl font-bold">Aqua</div>
                <div className="text-sm opacity-80">Line Metro</div>
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
              Greater Noida Sectors We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our center is in Knowledge Park - accessible to all Greater Noida sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {greaterNoidaAreas.map((area, index) => (
              <div
                key={area.name}
                className={`rounded-xl p-6 shadow-lg animate-fade-in-up ${
                  area.highlight
                    ? 'bg-gradient-to-br from-green-600 to-blue-600 text-white border-2 border-yellow-400'
                    : 'bg-white border border-gray-100'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className={`w-8 h-8 mb-4 ${area.highlight ? 'text-yellow-400' : 'text-green-600'}`} />
                <h3 className={`text-lg font-bold mb-2 ${area.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {area.name}
                </h3>
                <p className={`text-sm mb-1 ${area.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                  {area.distance} from center
                </p>
                {area.metro && (
                  <div className={`flex items-center text-sm ${area.highlight ? 'text-yellow-300' : 'text-blue-600'}`}>
                    <Train className="w-4 h-4 mr-1" />
                    {area.metro}
                  </div>
                )}
                {area.landmark && (
                  <p className={`text-sm font-medium ${area.highlight ? 'text-yellow-300' : 'text-green-600'}`}>
                    {area.landmark}
                  </p>
                )}
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
              Why Greater Noida Students Choose Us
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

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div
            ref={featuresAnim.ref}
            className={`transition-all duration-600 ${
              featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              What You Get at Our Center
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center bg-white rounded-lg p-4 shadow-sm animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
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
                className="bg-gray-50 rounded-xl p-8 shadow-lg animate-fade-in-up"
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
              Visit Our Center Today!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Book a free demo class and experience our teaching
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
              href="/biology-tutor-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Noida
            </Link>
            <Link
              href="/biology-tutor-noida-extension"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Noida Extension
            </Link>
            <Link
              href="/biology-tutor-noida-sector-62"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Sector 62
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
