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

const ballygungeAreas = [
  { name: 'Ballygunge', distance: '0 km', landmark: 'Old Money Hub' },
  { name: 'Gariahat', distance: '1 km', landmark: 'Central Market' },
  { name: 'Alipore', distance: '3 km', landmark: 'South Kolkata Elite' },
  { name: 'Bhawanipore', distance: '2 km', landmark: 'Heritage Zone' },
  { name: 'Sunny Park', distance: '4 km', landmark: 'Residential Area' },
  { name: 'Kalighat', distance: '5 km', landmark: 'South Kolkata' },
  { name: 'Maidaverry', distance: '6 km', landmark: 'Premium Locality' },
  { name: 'New Alipore', distance: '7 km', landmark: 'South East Kolkata' },
]

const whyChooseUs = [
  {
    icon: Building,
    title: 'Ballygunge Elite Community Trust',
    description:
      'Top choice for ultra-premium Ballygunge families with old money heritage. Trusted by industrialists, professionals, and established families seeking the best NEET preparation.',
  },
  {
    icon: Target,
    title: '67+ AIIMS Selections',
    description:
      'Proven track record coaching students from La Martiniere Girls, Loreto School, Shri Ramakrishna Pathamandir, and other premier Kolkata institutions.',
  },
  {
    icon: GraduationCap,
    title: 'Medical Faculty Excellence',
    description:
      'Expert NEET biology coaching by accomplished medical professionals with 15+ years experience coaching students from elite Ballygunge families.',
  },
  {
    icon: Star,
    title: 'Top AIIMS & Medical Admissions',
    description:
      'Ballygunge students achieve 690+ NEET scores and secure prestigious AIIMS, Maulana Azad, and CMC Vellore seats consistently.',
  },
]

const faqs = [
  {
    question: 'Why should I choose your NEET coaching in Ballygunge?',
    answer:
      'Ballygunge families appreciate quality, heritage, and proven results. We provide premium online NEET coaching with personalized attention matching the high standards of Ballygunge elite. Our 98% success rate and 67+ AIIMS selections demonstrate consistent excellence.',
  },
  {
    question: 'Do you offer in-person classes in Ballygunge?',
    answer:
      'Our premium NEET coaching is delivered through online live classes, offering flexibility and superior technology. Many Ballygunge families prefer online delivery for convenience. We provide recorded lectures, comprehensive study material, and regular assessments.',
  },
  {
    question: 'What schools do your Ballygunge students attend?',
    answer:
      'We coach students from La Martiniere Girls, Loreto School, Shri Ramakrishna Pathamandir, Victoria Institution, Bethune School, and other premier educational institutions in Kolkata.',
  },
  {
    question: 'How is your NEET coaching structured for competitive excellence?',
    answer:
      'Our coaching features rigorous curriculum, weekly tests, personalized feedback, doubt clearing sessions, and targeted revision. We focus on conceptual clarity and application-based learning - the foundation of NEET success.',
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
  name: 'Cerebrum Biology Academy - NEET Coaching Ballygunge',
  description: 'Best NEET Coaching for Ballygunge Kolkata - Ultra-Premium Coaching for Elite Families',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-ballygunge-kolkata',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    addressCountry: 'IN',
  },
  areaServed: ['Ballygunge', 'Gariahat', 'Alipore', 'Bhawanipore', 'South Kolkata'],
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
              <Shield className="w-5 h-5 mr-2 text-yellow-400" />
              Trusted by Ballygunge Elite | Premium Faculty
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Coaching in <span className="text-yellow-400">Ballygunge Kolkata</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Ultra-Premium NEET Coaching for Kolkata's Most Prestigious Locality
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Exclusive NEET coaching for Ballygunge, Gariahat, and surrounding elite areas. Learn from
              accomplished medical faculty trusted by <strong>industrialists and established families</strong>. Premium
              online classes with personalized attention and proven 690+ NEET scores.
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Ballygunge%20Kolkata%20and%20interested%20in%20NEET%20coaching"
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
                <Shield className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Elite</div>
                <div className="text-sm opacity-80">Family Trusted</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">690+</div>
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
              Ballygunge & Nearby Prestigious Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online NEET coaching for South Kolkata's ultra-premium localities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ballygungeAreas.map((area, index) => (
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
              Why Ballygunge Families Choose Us
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
              Ballygunge Elite, Master NEET with Premium Coaching!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Ultra-premium NEET coaching for Ballygunge's most prestigious families
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Ballygunge%20Kolkata%20and%20interested%20in%20NEET%20coaching"
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

      <PricingSection cityName="Ballygunge" />
      <CostComparisonSection cityName="Ballygunge" />

      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-coaching-kolkata"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Kolkata NEET Hub
            </Link>
            <Link
              href="/neet-coaching-salt-lake-kolkata"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Salt Lake Coaching
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
      <RelatedCityLinks currentCity="ballygunge-kolkata" variant="default" />
    </div>
  )
}
