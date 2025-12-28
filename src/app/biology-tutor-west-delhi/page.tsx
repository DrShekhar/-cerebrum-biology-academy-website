'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Trophy,
  Users,
  CheckCircle,
  BookOpen,
  MessageCircle,
  Play,
  Headphones,
  MapPin,
  Clock,
  Star,
  GraduationCap,
  Target,
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

const westDelhiAreas = [
  { name: 'Janakpuri', distance: '45 km from center', available: 'Online' },
  { name: 'Dwarka', distance: '50 km from center', available: 'Online' },
  { name: 'Rajouri Garden', distance: '40 km from center', available: 'Online' },
  { name: 'Paschim Vihar', distance: '42 km from center', available: 'Online' },
  { name: 'Tilak Nagar', distance: '38 km from center', available: 'Online' },
  { name: 'Vikaspuri', distance: '43 km from center', available: 'Online' },
  { name: 'Uttam Nagar', distance: '44 km from center', available: 'Online' },
  { name: 'Subhash Nagar', distance: '38 km from center', available: 'Online' },
]

const whyChooseUs = [
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years teaching experience.',
  },
  {
    icon: Target,
    title: 'Proven Results',
    description: '500+ students selected in NEET. Many from West Delhi localities.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Online classes available for West Delhi students. Multiple batch options.',
  },
  {
    icon: Star,
    title: 'Personal Attention',
    description: 'Small batch size of 20-25 students ensures individual focus.',
  },
]

const faqs = [
  {
    question: 'Do you have a center in West Delhi?',
    answer:
      'Our main center is in Greater Noida. For West Delhi students, we highly recommend our live online classes which provide the same quality teaching without the long commute. Online classes save 3-4 hours of daily travel time.',
  },
  {
    question: 'Are online classes suitable for NEET preparation?',
    answer:
      'Absolutely! Our online program is comprehensive with live interactive classes, recorded lectures for revision, daily practice problems, and regular mock tests. Many NEET toppers from West Delhi studied with us online.',
  },
  {
    question: 'What are the batch timings for West Delhi students?',
    answer:
      'We offer multiple batches - Morning (6-9 AM), Afternoon (2-5 PM), and Evening (6-9 PM). Weekend intensive batches are also available. Choose timing that suits your school schedule.',
  },
  {
    question: 'Can Dwarka students attend offline classes?',
    answer:
      'Yes, Dwarka students can attend our Greater Noida center. Metro connectivity via Blue Line makes it accessible. However, for daily classes, online mode is more practical and equally effective.',
  },
]

export default function BiologyTutorWestDelhiPage() {
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
            name: 'Cerebrum Biology Academy - West Delhi',
            description: 'Best Biology Tutor for West Delhi students - NEET & Board exam preparation',
            url: 'https://cerebrumbiologyacademy.com/biology-tutor-west-delhi',
            telephone: '+91-88264-44334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'IN',
            },
            areaServed: [
              'Janakpuri',
              'Dwarka',
              'Rajouri Garden',
              'Paschim Vihar',
              'Tilak Nagar',
              'Vikaspuri',
              'Uttam Nagar',
              'Subhash Nagar',
            ],
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
              <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
              Serving West Delhi Students
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tutor in{' '}
              <span className="text-yellow-400">West Delhi</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NEET & Board Exam Preparation | Live Online Classes
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert Biology coaching for students in Janakpuri, Dwarka, Rajouri Garden,
              and all West Delhi areas. Learn from{' '}
              <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong>.
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
                <GraduationCap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">AIIMS</div>
                <div className="text-sm opacity-80">Faculty</div>
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
              West Delhi Areas We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online classes available for all West Delhi localities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {westDelhiAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{area.distance}</p>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {area.available}
                </span>
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
              Why West Delhi Students Choose Us
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
              West Delhi Students, Join Us!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience quality NEET coaching from the comfort of your home
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
              href="/best-neet-biology-tutor-delhi-ncr"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Delhi NCR Coaching
            </Link>
            <Link
              href="/biology-tutor-dwarka"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Dwarka
            </Link>
            <Link
              href="/biology-tutor-janakpuri"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Janakpuri
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
