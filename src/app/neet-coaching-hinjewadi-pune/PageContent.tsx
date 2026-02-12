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
  Gem,
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

const hinjewAreas = [
  { name: 'Hinjewadi Phase 1', distance: '12 km', landmark: 'IT Hub' },
  { name: 'Hinjewadi Phase 2', distance: '13 km', landmark: 'IT Park' },
  { name: 'Rajiv Gandhi IT Park', distance: '12 km', landmark: 'Tech Hub' },
  { name: 'Wakad', distance: '10 km', landmark: 'Premium Residential' },
  { name: 'Pune City Centre', distance: '14 km', landmark: 'Commercial District' },
  { name: 'Mahape', distance: '11 km', landmark: 'IT Area' },
  { name: 'Sus', distance: '15 km', landmark: 'Satellite Town' },
  { name: 'Pirangut', distance: '16 km', landmark: 'Expanding Area' },
]

const whyChooseUs = [
  {
    icon: Gem,
    title: 'IT Corridor Specialist',
    description:
      'Hinjewadi is Pune\'s largest IT corridor with Rajiv Gandhi Infotech Park. We specialize in coaching for IT professional families and high-achieving students.',
  },
  {
    icon: Target,
    title: '67+ AIIMS Selections',
    description: 'Proven track record with students from elite IT corridor schools in Pune.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description:
      "Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience coaching motivated IT professionals' children.",
  },
  {
    icon: Star,
    title: 'Top Results',
    description: 'Hinjewadi students scored 685+ in NEET with multiple AIIMS admissions.',
  },
]

const faqs = [
  {
    question: 'Do you have a coaching center in Hinjewadi?',
    answer:
      'Our main center is in Greater Noida. For Hinjewadi residents, we offer premium live online NEET classes. Many IT professionals prefer online coaching for convenience. Our comprehensive material and recorded lectures ensure continuous preparation.',
  },
  {
    question: 'How do you support IT professional families?',
    answer:
      'We understand IT families value quality and results. We offer flexible schedules, detailed progress reports, personalized attention, and result-oriented teaching tailored for busy professionals.',
  },
  {
    question: 'Which schools do Hinjewadi students attend?',
    answer:
      'We have students from top Pune schools including Cathedral School, Symbiosis, and elite institutions in the IT corridor.',
  },
  {
    question: 'Is online coaching suitable for IT families?',
    answer:
      'Absolutely! Online coaching offers maximum flexibility for IT professionals. Students can attend classes during free hours and watch recordings as needed.',
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
  name: 'Cerebrum Biology Academy - NEET Coaching Hinjewadi',
  description: 'Best NEET Coaching for Hinjewadi - Premium IT corridor coaching',
  url: 'https://cerebrumbiologyacademy.com/neet-coaching-hinjewadi-pune',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Hinjewadi', 'Rajiv Gandhi IT Park', 'Wakad', 'Pune'],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div ref={heroAnim.ref} className={`text-center max-w-4xl mx-auto transition-all duration-700 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Gem className="w-5 h-5 mr-2 text-yellow-400" />
              IT Corridor Coaching | AIIMS Faculty
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              NEET Coaching in <span className="text-yellow-400">Hinjewadi</span>
            </h1>
            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Premium Biology Coaching for Pune's IT Corridor
            </h2>
            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Exclusive NEET coaching for Hinjewadi and Rajiv Gandhi IT Park residents. Learn from <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong> - trusted by IT families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
              <a href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Hinjewadi%20and%20interested%20in%20NEET%20coaching" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="xl" className="border-green-400 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </a>
              <a href="tel:+918826444334">
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-slate-900">
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
                <Gem className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">IT Hub</div>
                <div className="text-sm opacity-80">Focused</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">685+</div>
                <div className="text-sm opacity-80">Top Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={areasHeaderAnim.ref} className={`text-center mb-16 transition-all duration-600 ${areasHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Hinjewadi & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online NEET coaching for Pune&apos;s IT corridor and premium residential areas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hinjewAreas.map((area, index) => (
              <div key={area.name} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <MapPin className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{area.distance} from center</p>
                <p className="text-sm text-gray-400">{area.landmark}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div ref={whyHeaderAnim.ref} className={`text-center mb-16 transition-all duration-600 ${whyHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Hinjewadi Families Choose Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
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

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div ref={faqsHeaderAnim.ref} className={`text-center mb-16 transition-all duration-600 ${faqsHeaderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-white rounded-xl p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
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

      <section className="py-12 md:py-20 bg-gradient-to-r from-slate-700 via-slate-800 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div ref={ctaAnim.ref} className={`transition-all duration-600 ${ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Hinjewadi Students, Excel in NEET!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Premium NEET coaching for IT corridor families
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button variant="secondary" size="xl" className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
              <a href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Hinjewadi%20and%20interested%20in%20NEET%20coaching" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="xl" className="border-green-400 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </a>
              <a href="tel:+918826444334">
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-slate-800">
                  <Headphones className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>


      <PricingSection cityName="Hinjewadi" />
      <CostComparisonSection cityName="Hinjewadi" />

      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/neet-coaching-pune" className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition">
              Pune NEET Hub
            </Link>
            <Link href="/neet-coaching-kalyani-nagar-pune" className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition">
              Kalyani Nagar Coaching
            </Link>
            <Link href="/neet-biology-tutor-online" className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition">
              Online Classes
            </Link>
          </div>
        </div>
      </section>
      <RelatedCityLinks currentCity="hinjewadi-pune" variant="default" />
    </div>
  )
}
