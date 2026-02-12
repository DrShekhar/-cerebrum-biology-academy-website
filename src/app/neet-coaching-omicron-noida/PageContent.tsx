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
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { CityBreadcrumb } from '@/components/city/CityBreadcrumb'
import { PricingSection } from '@/components/city/PricingSection'
import { CostComparisonSection } from '@/components/city/CostComparisonSection'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'

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

const omicronAreas = [
  { name: 'Omicron Sector I', distance: '8 km', landmark: 'Main Business Hub' },
  { name: 'Omicron Sector II', distance: '9 km', landmark: 'Residential Complex' },
  { name: 'Omicron Sector III', distance: '10 km', landmark: 'Education Zone' },
  { name: 'Pari Chowk', distance: '5 km', landmark: 'Central Junction' },
  { name: 'Alpha Sector', distance: '12 km', landmark: 'Commercial Area' },
  { name: 'Beta Sector', distance: '13 km', landmark: 'Residential Zone' },
  { name: 'Knowledge Park', distance: '7 km', landmark: 'Educational Hub' },
  { name: 'Noida Extension', distance: '15 km', landmark: 'Developing Area' },
]

const whyChooseUs = [
  {
    icon: Building,
    title: 'Local to Greater Noida Hub',
    description:
      'Omicron Sector is right in our backyard - just 8-10 km from our coaching center. Convenient access for daily classes or hybrid learning options for local students.',
  },
  {
    icon: Target,
    title: '67+ AIIMS Selections',
    description:
      'Proven track record with students from DPS Greater Noida, Ryan International, and Apeejay schools in the region.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty on Campus',
    description:
      'Dr. Shekhar C Singh, AIIMS Alumnus, teaches from our Greater Noida center - you get direct access to top faculty.',
  },
  {
    icon: Star,
    title: 'Growing Middle Class Hub',
    description:
      'Omicron Sectors and surrounding areas have strong residential communities with motivated students achieving 680+ NEET scores.',
  },
]

const faqs = [
  {
    question: 'Where is your coaching center relative to Omicron Sector?',
    answer:
      'Our main center is in Greater Noida, just 8-10 km from Omicron Sector via Pari Chowk route. Omicron students have the fastest access to our center. You can attend live classes in person, join hybrid sessions, or opt for full online coaching - maximum flexibility!',
  },
  {
    question: 'Can I attend classes in-person from Omicron Sector?',
    answer:
      'Yes! Omicron Sector students are within 15-20 minute commute to our Greater Noida center during normal traffic. Many students from Omicron, Alpha, Beta, and surrounding sectors attend our in-person classes. We also offer hybrid batches combining in-person teaching with online access.',
  },
  {
    question: 'What schools do your Omicron and Greater Noida students come from?',
    answer:
      'We have students from DPS Greater Noida, Ryan International, Apeejay, and other reputable schools in Greater Noida region. Omicron Sector families have strong educational aspirations and our proximity ensures consistent, quality coaching.',
  },
  {
    question: 'Why choose Cerebrum for Omicron Sector students?',
    answer:
      'Proximity, quality, and proven results. Being just 8-10 km away, Omicron students enjoy flexible attendance options - in-person, hybrid, or full online. Our 67+ AIIMS selections, 98% success rate, and AIIMS faculty make us the obvious choice for Greater Noida region families.',
  },
]

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
  name: 'Cerebrum Biology Academy - NEET Coaching Omicron Sector',
  description: 'Best NEET Coaching for Omicron Sector, Greater Noida students - Expert AIIMS Faculty',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-omicron-noida',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Omicron Sectors I-III', 'Pari Chowk', 'Alpha', 'Beta', 'Gamma sectors', 'Knowledge Park', 'Noida Extension'],
  priceRange: '$$',
}

export default function PageContent() {
  const heroAnim = useScrollAnimation()
  const areasHeaderAnim = useScrollAnimation()
  const whyHeaderAnim = useScrollAnimation()
  const faqsHeaderAnim = useScrollAnimation()
  const ctaAnim = useScrollAnimation()

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
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Building className="w-5 h-5 mr-2 text-yellow-400" />
              Greater Noida Hub | Near Pari Chowk
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Coaching in <span className="text-yellow-400">Omicron Sector, Greater Noida</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Expert NEET Coaching for Greater Noida Middle-Class Families
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET coaching for Omicron Sectors I-III, Pari Chowk, Alpha, Beta & nearby
              areas. Learn from <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong> - just 8 km away
              from your home, trusted by growing Greater Noida residential families.
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

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Omicron%20Sector%20Greater%20Noida%20and%20interested%20in%20NEET%20coaching"
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

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">67+</div>
                <div className="text-sm opacity-80">NEET Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">680+</div>
                <div className="text-sm opacity-80">Top Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
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
              Omicron Sector & Greater Noida Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Local NEET coaching for Greater Noida and surrounding sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {omicronAreas.map((area, index) => (
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
              Why Omicron Sector Families Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
      <section className="py-12 md:py-20 bg-gradient-to-r from-slate-700 via-slate-800 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Omicron Sector Students, Crack NEET Just 8 km Away!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Closest expert NEET coaching to your home in Greater Noida
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

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Omicron%20Sector%20Greater%20Noida%20and%20interested%20in%20NEET%20coaching"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-green-400 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </a>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-slate-800"
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

      <PricingSection cityName="Omicron" />
      <CostComparisonSection cityName="Omicron" />

      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-coaching-greater-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Greater Noida Hub
            </Link>
            <Link
              href="/neet-coaching-lal-kuan-ghaziabad"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Ghaziabad Coaching
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
      <RelatedCityLinks currentCity="omicron-noida" variant="default" />
    </div>
  )
}
