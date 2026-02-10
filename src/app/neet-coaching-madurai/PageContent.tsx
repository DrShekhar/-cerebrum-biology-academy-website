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
  Heart,
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

const maduraiAreas = [
  { name: 'Madurai', distance: '0 km', landmark: 'City Center' },
  { name: 'Anna Nagar', distance: '6 km', landmark: 'Residential Zone' },
  { name: 'KK Nagar', distance: '8 km', landmark: 'Premium Locality' },
  { name: 'Thirunagar', distance: '10 km', landmark: 'Growing Area' },
  { name: 'Goripalayam', distance: '7 km', landmark: 'Central Zone' },
  { name: 'Tallakulam', distance: '9 km', landmark: 'Residential Area' },
  { name: 'Mattuthavani', distance: '12 km', landmark: 'Suburban Zone' },
  { name: 'Pasumalai', distance: '5 km', landmark: 'Hilltop Area' },
]

const whyChooseUs = [
  {
    icon: Heart,
    title: 'Tamil Nadu Medical Heritage',
    description:
      "Madurai has 10,000+ NEET aspirants from premier medical families. Cerebrum understands Tamil Nadu's medical education culture and delivers specialized NEET preparation.",
  },
  {
    icon: Building,
    title: 'Near Madurai Medical College',
    description:
      'Proximity to Madurai Medical College and Meenakshi Mission medical institutions. Our coaching aligns with local medical college patterns and entrance expectations.',
  },
  {
    icon: Target,
    title: 'Tutor-Based Competition Only',
    description:
      'Madurai lacks structured NEET-only coaching centers. Most preparation is tutor-based. Cerebrum brings comprehensive, systematic online coaching at premium quality.',
  },
  {
    icon: GraduationCap,
    title: 'Expert Tamil Nadu Faculty',
    description:
      'AIIMS-trained instructors experienced in Tamil Nadu HSC + CBSE curricula. Specialized approach for both board and NEET requirements.',
  },
]

const faqs = [
  {
    question: 'Do you have a physical center in Madurai?',
    answer:
      'We offer premium online NEET classes for all Madurai students - Anna Nagar, KK Nagar, Thirunagar, Goripalayam, and beyond. Online format provides flexibility while maintaining personalized interaction through live sessions and dedicated doubt-clearing.',
  },
  {
    question: 'How is your coaching suited for Tamil Nadu medical families?',
    answer:
      'Madurai has a strong tradition of medical aspirants from leading families. We respect this heritage by combining Tamil Nadu HSC board knowledge with NEET requirements. Our approach maintains the discipline and rigor valued by medical families.',
  },
  {
    question: 'Which schools do Madurai students attend?',
    answer:
      'We have students from TVS Academy, Thiagarajar School, Lady Doak College, and other reputed institutions. These quality schools prepare disciplined students who benefit significantly from our structured NEET coaching.',
  },
  {
    question: 'How does proximity to medical colleges help NEET preparation?',
    answer:
      'Being near Madurai Medical College and Meenakshi Mission, students have direct exposure to medical education environment. Our coaching bridges local medical college expectations with all-India NEET patterns, helping students succeed in both.',
  },
  {
    question: 'What is the NEET coaching fee for Madurai students?',
    answer:
      'Our NEET Biology coaching starts from Rs 24,000/year (Foundation), Rs 36,000/year (Comprehensive), and Rs 48,000/year (Intensive). EMI and scholarships available. Madurai students save significantly versus relocating to Chennai.',
  },
  {
    question: 'Which medical colleges can Madurai students target?',
    answer:
      'Madurai students can target Madurai Medical College, AIIMS Madurai, Government Rajaji Hospital, and through strong NEET scores, Madras Medical College, CMC Vellore, JIPMER Puducherry, and AIIMS across India.',
  },
  {
    question: 'Do you cover Tamil Nadu state board for NEET preparation?',
    answer:
      'Absolutely. Our NCERT-focused teaching covers 100% of NEET syllabus. TN state board students benefit fully since NEET is entirely NCERT-based. We seamlessly bridge any curriculum differences.',
  },
  {
    question: 'How can Madurai students book a free demo?',
    answer:
      'Book a free demo class via WhatsApp at 8826444334 or through our website. Experience our AIIMS-trained faculty teaching methodology with no commitment. Most Madurai families enroll after the demo experience.',
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
  name: 'Cerebrum Biology Academy - NEET Coaching Madurai',
  description: 'Best online NEET coaching for Madurai Tamil Nadu medical families',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-madurai',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Madurai', 'Anna Nagar', 'KK Nagar', 'Thirunagar', 'Goripalayam'],
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
      <CityBreadcrumb cityName="Madurai" stateName="Tamil Nadu" stateSlug="tamil-nadu" />
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
              <Heart className="w-5 h-5 mr-2 text-yellow-400" />
              Tamil Nadu Medical Hub | Expert Online Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Online NEET Coaching in <span className="text-yellow-400">Madurai</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Premium Biology Classes for Tamil Nadu's Medical Families
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Online NEET coaching for Madurai, Anna Nagar, KK Nagar & nearby areas. Learn from
              <strong> AIIMS-trained faculty</strong> - comprehensive HSC + CBSE curriculum for
              10,000+ annual aspirants from medical families.
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Madurai%20and%20interested%20in%20NEET%20coaching"
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
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm opacity-80">Annual Aspirants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm opacity-80">Top Med Colleges</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
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
              Madurai & Nearby Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online NEET coaching accessible from every corner of Madurai city
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maduraiAreas.map((area, index) => (
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
              Why Madurai Families Choose Cerebrum
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
              Madurai, Ace NEET with Cerebrum!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert online coaching designed for Tamil Nadu medical families. World-class
              instruction, proven success.
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
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Madurai%20and%20interested%20in%20NEET%20coaching"
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


      <PricingSection cityName="Madurai" />
      <CostComparisonSection cityName="Madurai" />
      {/* Related */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-coaching-tamil-nadu"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Tamil Nadu NEET Hub
            </Link>
            <Link
              href="/biology-tutor-madurai"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor Madurai
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
      <RelatedCityLinks currentCity="madurai" variant="default" />
    </div>
  )
}
