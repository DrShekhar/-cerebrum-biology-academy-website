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
  Train,
  Building,
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

const indirapuramAreas = [
  { name: 'Ahinsa Khand', distance: '7 km', metro: 'Vaishali Metro', landmark: 'Shipra Mall' },
  { name: 'Niti Khand', distance: '8 km', metro: 'Vaishali Metro', landmark: 'Near NH-24' },
  { name: 'Shakti Khand', distance: '7 km', metro: 'Vaishali Metro', landmark: 'Residential Hub' },
  { name: 'Nyay Khand', distance: '9 km', metro: 'Vaishali Metro', landmark: 'Commercial Area' },
  { name: 'Gyan Khand', distance: '8 km', metro: 'Vaishali Metro', landmark: 'Schools Hub' },
  { name: 'Abhay Khand', distance: '7 km', metro: 'Vaishali Metro', landmark: 'Park Area' },
  { name: 'Vaibhav Khand', distance: '9 km', metro: 'Vaishali Metro', landmark: 'Premium Sector' },
  { name: 'Vasundhara', distance: '6 km', metro: 'Vaishali Metro', landmark: 'Adjacent Area' },
]

const whyChooseUs = [
  {
    icon: Building,
    title: 'Indirapuram Specialist',
    description: 'Dedicated coaching for Indirapuram students with local understanding.',
  },
  {
    icon: GraduationCap,
    title: 'AIIMS Faculty',
    description: 'Learn from Dr. Shekhar C Singh, AIIMS Alumnus with 15+ years experience.',
  },
  {
    icon: Target,
    title: '67+ AIIMS Selections',
    description: 'Proven track record with many students from Indirapuram area.',
  },
  {
    icon: Star,
    title: 'Easy Commute',
    description: 'Well connected via Vaishali Metro and NH-24.',
  },
]

const faqs = [
  {
    question: 'How far is your center from Shipra Mall Indirapuram?',
    answer:
      'Our center in Greater Noida is about 7-8 km from Shipra Mall, which is 15-20 minutes by road. You can also take the Aqua Line from Vaishali Metro. Many students from all Khands of Indirapuram attend our classes.',
  },
  {
    question: 'Which Indirapuram areas do your students come from?',
    answer:
      'We have students from all parts of Indirapuram - Ahinsa Khand, Niti Khand, Shakti Khand, Nyay Khand, Gyan Khand, Abhay Khand, and Vaibhav Khand. Parents appreciate the quality teaching with AIIMS faculty.',
  },
  {
    question: 'What is the best route from Indirapuram?',
    answer:
      'From Indirapuram, you can take NH-24 towards Greater Noida (15-20 mins) or take metro to Vaishali and switch to Aqua Line. Both routes are convenient and well-connected.',
  },
  {
    question: 'Do you offer pickup services for Indirapuram students?',
    answer:
      'While we do not offer pickup, many parents form carpools from Indirapuram. We also have excellent online classes for students who prefer learning from home.',
  },
]

export default function BiologyTutorIndirapuramPage() {
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
            name: 'Cerebrum Biology Academy - Indirapuram',
            description:
              'Best Biology Tutor for Indirapuram students - NEET & Board exam preparation',
            url: 'https://cerebrumbiologyacademy.com/biology-tutor-indirapuram',
            telephone: '+91-88264-44334',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              addressCountry: 'IN',
            },
            areaServed: ['Indirapuram', 'Ahinsa Khand', 'Niti Khand', 'Shakti Khand', 'Vaishali'],
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
              <Building className="w-5 h-5 mr-2 text-yellow-400" />
              All Khands of Indirapuram Covered
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tutor in <span className="text-yellow-400">Indirapuram</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NEET & Board Preparation | Shipra Mall Area | Metro Connected
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Expert Biology coaching for Indirapuram students from all Khands. Learn from{' '}
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
                <div className="text-2xl font-bold">67+</div>
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
                <Train className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm opacity-80">Min via Metro</div>
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
              Indirapuram Sectors We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Students from all Khands of Indirapuram attend our classes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indirapuramAreas.map((area, index) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MapPin className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{area.distance} from center</p>
                <div className="flex items-center text-sm text-blue-600 mb-1">
                  <Train className="w-4 h-4 mr-1" />
                  {area.metro}
                </div>
                <p className="text-sm text-gray-400">{area.landmark}</p>
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
              Why Indirapuram Students Choose Us
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Indirapuram Students, Join Us!</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Quality NEET coaching with AIIMS faculty
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
              href="/biology-tutor-ghaziabad"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Ghaziabad
            </Link>
            <Link
              href="/biology-tutor-vaishali"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Vaishali
            </Link>
            <Link
              href="/biology-tutor-noida"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Noida
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
