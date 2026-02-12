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
  Palette,
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

const hauzKhasAreas = [
  { name: 'Hauz Khas', distance: '20 km', landmark: 'Near IIT Delhi' },
  { name: 'Hauz Khas Village', distance: '21 km', landmark: 'Near Deer Park' },
  { name: 'Green Park', distance: '22 km', landmark: 'Near Green Park Metro' },
  { name: 'SDA', distance: '21 km', landmark: 'Near IIT Gate' },
  { name: 'Safdarjung Enclave', distance: '24 km', landmark: 'Near AIIMS' },
  { name: 'Gulmohar Park', distance: '25 km', landmark: 'Near Max Hospital' },
  { name: 'Sarvapriya Vihar', distance: '23 km', landmark: 'Near IIT Campus' },
  { name: 'JNU Campus', distance: '26 km', landmark: 'Near JNU' },
]

const whyChooseUs = [
  {
    icon: Palette,
    title: 'Creative Learning Hub',
    description:
      "Hauz Khas is known for creativity. Our innovative teaching methods match the area's academic vibe.",
  },
  {
    icon: Target,
    title: '67+ AIIMS Selections',
    description:
      'Strong results with students from DPS RK Puram, Sardar Patel, and JNU area schools.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Expert Tutor',
    description: 'Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience teaching Biology.',
  },
  {
    icon: Star,
    title: 'Near IIT/JNU Hub',
    description:
      'Quality matching the academic standards of IIT Delhi and JNU neighborhood students.',
  },
]

const faqs = [
  {
    question: 'Do you offer Biology tutoring in Hauz Khas?',
    answer:
      'We offer premium live online Biology tutoring for Hauz Khas students. While Hauz Khas is near the IIT coaching hub, our online approach saves commute time and offers personalized attention that matches or exceeds traditional tutoring.',
  },
  {
    question: 'How do your sessions compare to IIT area coaching?',
    answer:
      'Hauz Khas students often compare us with Kalu Sarai coaching. Our AIIMS faculty, smaller batches, and personalized approach offer equal quality with added convenience. Many families near IIT Delhi prefer our modern online tutoring.',
  },
  {
    question: 'What makes Hauz Khas students different?',
    answer:
      'Hauz Khas students typically come from academically strong families near JNU and IIT. They appreciate our rigorous approach, conceptual depth, and high standards. Our teaching style matches their intellectual curiosity.',
  },
  {
    question: 'Do you cover both NEET and board exams?',
    answer:
      'Yes! Our Biology tutoring covers CBSE boards and NEET comprehensively. We ensure strong NCERT foundation while building advanced problem-solving skills. Hauz Khas students consistently score 90+ in boards and 650+ in NEET.',
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
  name: 'Cerebrum Biology Academy - Biology Tutor Hauz Khas',
  description: 'Best Biology Tutor for Hauz Khas students - Near IIT Delhi Educational Hub',
  url: 'https://cerebrumbiologyacademy.com/biology-tutor-hauz-khas',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Hauz Khas', 'Hauz Khas Village', 'Green Park', 'SDA', 'Safdarjung Enclave'],
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
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            ref={heroAnim.ref}
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Palette className="w-5 h-5 mr-2 text-yellow-400" />
              Near IIT/JNU Hub | AIIMS Faculty
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tutor in <span className="text-yellow-400">Hauz Khas</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Expert Biology Tutoring Near Delhi&apos;s Academic Hub
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Personalized Biology tutoring for Hauz Khas, Green Park, SDA & nearby areas. Learn
              from <strong>Dr. Shekhar C Singh, AIIMS Alumnus</strong> - quality matching IIT area
              standards.
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
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Hauz%20Khas%20and%20interested%20in%20Biology%20tutoring"
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
                <div className="text-2xl font-bold">67+</div>
                <div className="text-sm opacity-80">NEET Selections</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Palette className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">Creative</div>
                <div className="text-sm opacity-80">Teaching</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Building className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">670+</div>
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
              Hauz Khas & Nearby Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Online Biology tutoring for students near IIT Delhi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hauzKhasAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-purple-600 mb-4" />
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
              Why Hauz Khas Families Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                  <MessageCircle className="w-6 h-6 mr-3 text-purple-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            ref={ctaAnim.ref}
            className={`transition-all duration-600 ${
              ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Hauz Khas Students, Master Biology!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Premium Biology tutoring matching IIT area&apos;s academic excellence
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
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Call: +91-88264-44334
                </Button>
              </a>

              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20am%20from%20Hauz%20Khas%20and%20interested%20in%20Biology%20tutoring"
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
              href="/neet-coaching-green-park-delhi"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Green Park NEET
            </Link>
            <Link
              href="/neet-coaching-south-delhi"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              South Delhi Hub
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
