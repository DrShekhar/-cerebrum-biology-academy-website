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
  Briefcase,
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

const gandhinagarAreas = [
  { name: 'Gandhinagar', distance: '8 km', landmark: 'State Capital' },
  { name: 'Sector 1-10', distance: '6 km', landmark: 'Central Sectors' },
  { name: 'Sector 11-20', distance: '10 km', landmark: 'Residential Area' },
  { name: 'Infocity', distance: '12 km', landmark: 'IT Hub' },
  { name: 'GIFT City', distance: '15 km', landmark: 'Financial Hub' },
  { name: 'Pethapur', distance: '18 km', landmark: 'Industrial Area' },
  { name: 'Kalol', distance: '20 km', landmark: 'Nearby City' },
  { name: 'Adalaj', distance: '16 km', landmark: 'Heritage Area' },
]

const whyChooseUs = [
  {
    icon: Briefcase,
    title: 'Government Families First Choice',
    description:
      'Gandhinagar is home to Gujarat government headquarters. Government families prioritize quality education. Our premium NEET coaching matches their expectations for structured, result-oriented preparation.',
  },
  {
    icon: Target,
    title: 'Gujarat State Capital Hub',
    description:
      'As Gujarat\'s state capital, Gandhinagar attracts high-achieving families. Our coaching serves educated, ambitious families seeking best NEET preparation for their children.',
  },
  {
    icon: GraduationCap,
    title: 'Online NEET Classes',
    description:
      'Expert live online NEET classes from sectors 1-30, Infocity, GIFT City, and across Gandhinagar. Recorded sessions for flexibility, live doubt clearing, personalized batches.',
  },
  {
    icon: Star,
    title: 'Premium School Network',
    description:
      'Strong results with students from DPS Gandhinagar, Udgam School, Calorx Olive International. Proven success with top schools in Gujarat capital.',
  },
]

const faqs = [
  {
    question: 'Do you have a physical coaching center in Gandhinagar?',
    answer:
      'Our main center is in Greater Noida, but we provide premium live online NEET classes accessible across Gandhinagar - all sectors (1-30), Infocity, GIFT City, and nearby areas. The online model suits government families perfectly with flexibility and world-class teaching.',
  },
  {
    question: 'Is NEET coaching suitable for Gandhinagar government families?',
    answer:
      'Absolutely! Government families in Gandhinagar appreciate structured, discipline-based education. Our NEET coaching mirrors these values - fixed schedules, regular assessments, progress reports, and proven results. Many government officer children have secured top NEET ranks with us.',
  },
  {
    question: 'What schools do your Gandhinagar students come from?',
    answer:
      'We have students from DPS Gandhinagar, Udgam School, Calorx Olive International, and other premier Gandhinagar schools. Our coaching serves all educational backgrounds and medium of instruction.',
  },
  {
    question: 'How does GIFT City advantage help NEET aspirants?',
    answer:
      'GIFT City symbolizes Gandhinagar\'s emergence as a global financial hub. Families relocating to Gandhinagar for government/GIFT City positions value quality education. Our online coaching provides seamless learning continuity for such families, combining global standards with focused NEET preparation.',
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
  name: 'Cerebrum Biology Academy - NEET Coaching Gandhinagar',
  description: 'Best Online NEET Coaching for Gandhinagar students - Gujarat State Capital Excellence',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-gandhinagar',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Gandhinagar', 'Sector 1-30', 'Infocity', 'GIFT City', 'Pethapur', 'Kalol', 'Adalaj', 'Kudasan'],
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
      <CityBreadcrumb cityName="Gandhinagar" stateName="Gujarat" stateSlug="gujarat" />
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
              <Briefcase className="w-5 h-5 mr-2 text-yellow-400" />
              Government Hub | GIFT City Advantage
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Coaching in <span className="text-yellow-400">Gandhinagar</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Premium Biology Coaching for Gujarat's State Capital Families
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert online NEET classes for Gandhinagar, all sectors (1-30), GIFT City, Infocity, and nearby areas.
              Perfect for <strong>government families</strong> and GIFT City professionals seeking quality NEET preparation.
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Gandhinagar%20and%20interested%20in%20online%20NEET%20coaching"
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
                <div className="text-2xl font-bold">Premium</div>
                <div className="text-sm opacity-80">Government Families</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">GIFT City</div>
                <div className="text-sm opacity-80">Professional Hub</div>
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
              Gandhinagar & Nearby Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online NEET coaching across all of Gandhinagar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gandhinagarAreas.map((area, index) => (
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
              Why Gandhinagar Families Choose Us
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
              Gandhinagar Students, Achieve NEET Excellence!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Premium online NEET coaching for state capital families - structured, results-focused, globally standard
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Gandhinagar%20and%20interested%20in%20online%20NEET%20coaching"
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


      <PricingSection cityName="Gandhinagar" />
      <CostComparisonSection cityName="Gandhinagar" />
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
      <RelatedCityLinks currentCity="gandhinagar" variant="default" />
    </div>
  )
}
