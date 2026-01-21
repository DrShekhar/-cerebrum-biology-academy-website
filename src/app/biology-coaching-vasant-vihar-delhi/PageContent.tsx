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
  Globe,
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

const vasantViharAreas = [
  { name: 'Vasant Vihar', distance: '28 km', landmark: 'Near Priya Cinema' },
  { name: 'Shantiniketan', distance: '27 km', landmark: 'Near American Embassy School' },
  { name: 'Westend', distance: '29 km', landmark: 'Near Vasant Vihar Market' },
  { name: 'Poorvi Marg', distance: '26 km', landmark: 'Near British School' },
  { name: 'Anand Niketan', distance: '25 km', landmark: 'Near Japanese Embassy' },
  { name: 'Shanti Path', distance: '24 km', landmark: 'Embassy Area' },
  { name: 'Chanakyapuri', distance: '23 km', landmark: 'Diplomatic Enclave' },
  { name: 'RK Puram', distance: '26 km', landmark: 'Near Sector 8 Market' },
]

const whyChooseUs = [
  {
    icon: Globe,
    title: 'IB/IGCSE Expert',
    description: 'Specialized in IB Biology HL/SL, IGCSE Biology, and Cambridge curriculum alongside CBSE/NEET.',
  },
  {
    icon: Target,
    title: '500+ NEET Selections',
    description: 'Proven track record with students from diplomatic families and international schools.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience teaching diverse curricula.',
  },
  {
    icon: Star,
    title: 'International Results',
    description: 'Students scored 7 in IB Biology, A* in IGCSE, and 680+ in NEET.',
  },
]

const faqs = [
  {
    question: 'Do you teach IB Biology for Vasant Vihar students?',
    answer:
      'Yes! We specialize in IB Biology (HL & SL), covering all topics including Paper 1, 2, 3, and Internal Assessment. Many students from American Embassy School, British School, and Pathways World School study with us. Our AIIMS faculty brings deep conceptual understanding that helps score 7 in IB Biology.',
  },
  {
    question: 'Can you help with IGCSE Biology alongside NEET preparation?',
    answer:
      'Absolutely! Many Vasant Vihar students do IGCSE in Class 10 and then switch to CBSE/NEET track. We help students excel in IGCSE Biology (Cambridge/Edexcel) while building a strong foundation for NEET. This dual-track approach is very popular among embassy area families.',
  },
  {
    question: 'Do you have experience with students from diplomatic families?',
    answer:
      'Yes, we have taught many children of diplomats and expatriates. We understand the unique challenges - frequent relocations, different curricula backgrounds, and international university aspirations. Our flexible online format works perfectly for such families.',
  },
  {
    question: 'What schools do your Vasant Vihar area students come from?',
    answer:
      'We have students from American Embassy School, British School Delhi, Pathways World School, Sanskriti School, Vasant Valley School, DPS Vasant Kunj, and Modern School. Both international curriculum (IB/IGCSE) and Indian curriculum (CBSE/NEET) students benefit from our teaching.',
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
    name: 'Cerebrum Biology Academy - Biology Coaching Vasant Vihar',
    description: 'Best Biology Coaching for Vasant Vihar - IB Biology, IGCSE, CBSE, NEET Preparation',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-vihar-delhi',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: ['Vasant Vihar', 'Shantiniketan', 'Westend', 'Anand Niketan', 'Chanakyapuri', 'RK Puram'],
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
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2 text-yellow-400" />
              IB | IGCSE | CBSE | NEET
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Coaching in{' '}
              <span className="text-yellow-400">Vasant Vihar</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              IB Biology Expert | IGCSE Specialist | NEET Coaching
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium Biology coaching for Vasant Vihar, Shantiniketan, Embassy area & South Delhi.
              Expert in <strong>IB, IGCSE, CBSE & NEET</strong> - taught by <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong>.
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
                  className="border-white text-white hover:bg-white hover:text-indigo-900"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Vasant%20Vihar%20and%20interested%20in%20Biology%20coaching"
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
                <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">IB/IGCSE</div>
                <div className="text-sm opacity-80">Expert</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">7/A*</div>
                <div className="text-sm opacity-80">IB/IGCSE Scores</div>
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
              Vasant Vihar & Embassy Area
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online Biology coaching for international and Indian curriculum students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vasantViharAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-indigo-600 mb-4" />
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
              Why Vasant Vihar Families Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  <MessageCircle className="w-6 h-6 mr-3 text-indigo-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Vasant Vihar Students, Excel in Biology!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              IB, IGCSE, CBSE or NEET - we have you covered with expert coaching
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
                  className="border-white text-white hover:bg-white hover:text-indigo-700"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Vasant%20Vihar%20and%20interested%20in%20Biology%20coaching"
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
              href="/biology-tutor-defence-colony"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Defence Colony
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
