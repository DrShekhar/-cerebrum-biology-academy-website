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
  School,
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

const eokAreas = [
  { name: 'East of Kailash', distance: '18 km', landmark: 'Near DPS EOK' },
  { name: 'Greater Kailash 1', distance: '16 km', landmark: 'Near M Block Market' },
  { name: 'Greater Kailash 2', distance: '17 km', landmark: 'Near Savitri Cinema' },
  { name: 'Nehru Place', distance: '15 km', landmark: 'IT Hub' },
  { name: 'Kailash Colony', distance: '14 km', landmark: 'Near Metro Station' },
  { name: 'Lajpat Nagar', distance: '13 km', landmark: 'Central Market' },
  { name: 'Defence Colony', distance: '12 km', landmark: 'Near Moolchand' },
  { name: 'Andrews Ganj', distance: '16 km', landmark: 'Near South Ex' },
]

const whyChooseUs = [
  {
    icon: School,
    title: 'DPS EOK Expertise',
    description: 'Deep understanding of DPS curriculum and NEET sync - ideal for DPS East of Kailash students.',
  },
  {
    icon: Target,
    title: '500+ NEET Selections',
    description: 'Proven track record with students from DPS EOK, GK, and other South Delhi schools.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience teaching DPS students.',
  },
  {
    icon: Star,
    title: 'DPS Toppers',
    description: 'Many DPS EOK students scored 95%+ in boards and 680+ in NEET with our guidance.',
  },
]

const faqs = [
  {
    question: 'Do you have special batches for DPS East of Kailash students?',
    answer:
      'Yes! We understand DPS curriculum deeply and have designed our batches to complement DPS teaching. Our timing is planned around DPS exam schedules. Many DPS EOK students have excelled in both boards and NEET with our coaching.',
  },
  {
    question: 'How do you help DPS students balance boards and NEET?',
    answer:
      'DPS follows NCERT which is perfect for NEET. We help students study NCERT in-depth with NEET perspective. Our teaching covers both board patterns (case studies, competency questions) and NEET patterns (MCQs, assertion-reasoning). Students ace both exams.',
  },
  {
    question: 'What schools do your East of Kailash area students come from?',
    answer:
      'Majority are from DPS East of Kailash. We also have students from DPS Mathura Road, DPS Noida, Amity International, Delhi Public Library School, and schools in GK and Nehru Place area.',
  },
  {
    question: 'Do you offer crash courses before NEET/boards?',
    answer:
      'Yes! We offer intensive crash courses before boards and NEET. These include daily classes, extensive test series, and previous year paper practice. Many students join our crash course alongside regular school studies.',
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
    name: 'Cerebrum Biology Academy - Biology Coaching East of Kailash',
    description: 'Best Biology Coaching for East of Kailash students - DPS EOK Expert, NEET & Board Preparation',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-east-of-kailash-delhi',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: ['East of Kailash', 'Greater Kailash', 'Nehru Place', 'Kailash Colony', 'Defence Colony'],
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
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <School className="w-5 h-5 mr-2 text-yellow-400" />
              DPS EOK Expert | Board + NEET
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Coaching in{' '}
              <span className="text-yellow-400">East of Kailash</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              DPS Curriculum Expert | NEET & Board Preparation
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium Biology coaching for DPS EOK, Greater Kailash, Nehru Place & South Delhi students.
              Learn from <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong> - expert in DPS curriculum sync.
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
                  className="border-white text-white hover:bg-white hover:text-teal-900"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20East%20of%20Kailash%20and%20interested%20in%20Biology%20coaching"
                target="_blank"
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
                <School className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">DPS</div>
                <div className="text-sm opacity-80">Expert</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">95%+</div>
                <div className="text-sm opacity-80">Board Score</div>
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
              East of Kailash & Nearby Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online Biology coaching for GK, EOK, and South-East Delhi students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eokAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-teal-600 mb-4" />
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
              Why EOK & GK Students Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  <MessageCircle className="w-6 h-6 mr-3 text-teal-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-teal-600 via-teal-700 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              DPS & GK Students, Excel in Biology!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Score 95%+ in boards and crack NEET with expert coaching
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
                  className="border-white text-white hover:bg-white hover:text-teal-700"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20East%20of%20Kailash%20and%20interested%20in%20Biology%20coaching"
                target="_blank"
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
              href="/biology-tutor-defence-colony"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Defence Colony
            </Link>
            <Link
              href="/biology-tutor-hauz-khas"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Hauz Khas
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
