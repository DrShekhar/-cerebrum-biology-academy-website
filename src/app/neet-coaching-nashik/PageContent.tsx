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
  Flame,
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

const nashikAreas = [
  { name: 'Nashik', distance: '8 km', landmark: 'City Center' },
  { name: 'College Road', distance: '12 km', landmark: 'Education Hub' },
  { name: 'Gangapur Road', distance: '10 km', landmark: 'Residential Area' },
  { name: 'Panchavati', distance: '6 km', landmark: 'Religious Area' },
  { name: 'CIDCO', distance: '14 km', landmark: 'Business District' },
  { name: 'Satpur', distance: '16 km', landmark: 'Industrial Area' },
  { name: 'Deolali', distance: '18 km', landmark: 'Cantonment' },
  { name: 'Nashik Road', distance: '20 km', landmark: 'Highway Area' },
]

const whyChooseUs = [
  {
    icon: Flame,
    title: 'Wine Country Excellence',
    description:
      'Nashik\'s wine country families value premium education. Our NEET coaching matches the expectations of affluent, education-focused families in Maharashtra\'s premier wine region.',
  },
  {
    icon: Target,
    title: '12000+ Nashik Aspirants',
    description:
      'Nashik has 12000+ NEET aspirants annually with weak NEET focus region - creating strong competitive advantage for serious students who choose us.',
  },
  {
    icon: GraduationCap,
    title: 'Online NEET Classes',
    description:
      'Expert live online classes covering complete NEET syllabus. Access from College Road, Gangapur Road, or any Nashik location with recorded sessions for flexible learning.',
  },
  {
    icon: Star,
    title: 'Maharashtra NEET Leaders',
    description:
      'Proven track record with students from BYK College area, Fravashi Academy, KTHM College. Strong results in competitive Maharashtra NEET landscape.',
  },
]

const faqs = [
  {
    question: 'Do you have a physical coaching center in Nashik?',
    answer:
      'Our main center is in Greater Noida, but we offer premium live online NEET classes accessible across Nashik - from College Road to Gangapur Road and all areas. Our online model suits Nashik families perfectly with flexible timings, recorded lectures, and doubt clearing sessions you can access anytime.',
  },
  {
    question: 'Is NEET coaching effective for Nashik students?',
    answer:
      'Yes! Nashik has 12000+ NEET aspirants annually. While NEET focus is weak in the region, this creates opportunity - serious students who choose dedicated coaching gain competitive advantage. Our comprehensive online coaching ensures Nashik students can compete nationally.',
  },
  {
    question: 'What schools do your Nashik students come from?',
    answer:
      'We have students from BYK College area schools, Fravashi Academy, KTHM College, and other premier Nashik institutions. Our coaching is suitable for students from all educational backgrounds and medium of instruction.',
  },
  {
    question: 'How do wine country families benefit from your coaching?',
    answer:
      'Nashik\'s wine country families appreciate our structured, result-oriented approach. Fixed schedules, regular progress reports, and focus on top results align with values of educated, successful families. Online format allows flexibility without compromising on quality coaching.',
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
  name: 'Cerebrum Biology Academy - NEET Coaching Nashik',
  description: 'Best Online NEET Coaching for Nashik students - Wine Country Excellence',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-nashik',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Nashik', 'College Road', 'Gangapur Road', 'Panchavati', 'CIDCO', 'Satpur', 'Deolali', 'Nashik Road'],
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
              <Flame className="w-5 h-5 mr-2 text-yellow-400" />
              Wine Country Premium Education | Maharashtra NEET Leaders
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Coaching in <span className="text-yellow-400">Nashik</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Premium Biology Coaching for Maharashtra&apos;s Wine Country Families
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert online NEET classes for Nashik, College Road, Gangapur Road, and all nearby areas.
              <strong> Strong competitive advantage</strong> in a weak NEET focus region. Proven results with
              12000+ aspirants annually.
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Nashik%20and%20interested%20in%20NEET%20coaching"
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
                <div className="text-2xl font-bold">12000+</div>
                <div className="text-sm opacity-80">Nashik Aspirants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Flame className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Premium</div>
                <div className="text-sm opacity-80">Wine Country Focus</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-80">Successful Students</div>
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
              Nashik & Nearby Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online NEET coaching accessible across all of Nashik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nashikAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{area.distance} from city center</p>
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
              Why Nashik Families Choose Us
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
              Nashik Students, Dominate NEET Online!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Premium online NEET coaching for wine country families - gain competitive advantage in Maharashtra
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Nashik%20and%20interested%20in%20NEET%20coaching"
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
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-coaching-tier2-cities"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Tier-2 Cities Hub
            </Link>
            <Link
              href="/biology-tutor-online"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online Biology Tutor
            </Link>
            <Link
              href="/neet-biology-tutor-online"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Online Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
