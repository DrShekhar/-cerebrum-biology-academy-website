'use client'

import {
  MapPin,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Globe,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const westIndiaStates = [
  {
    name: 'Maharashtra',
    slug: 'maharashtra',
    students: '720+',
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane'],
    priority: 'high',
  },
  {
    name: 'Gujarat',
    slug: 'gujarat',
    students: '480+',
    cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
    priority: 'high',
  },
  {
    name: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    students: '380+',
    cities: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
    priority: 'medium',
  },
  {
    name: 'Goa',
    slug: 'goa',
    students: '85+',
    cities: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
    priority: 'medium',
  },
  {
    name: 'Chhattisgarh',
    slug: 'chhattisgarh',
    students: '180+',
    cities: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution from Delhi NCR faculty',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personal attention for every student from Mumbai to Indore',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors trained at premier Delhi medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Evening and weekend batches for West India students',
  },
  {
    icon: Wifi,
    title: 'High-Quality Streaming',
    description: 'Optimized for good internet infrastructure in major cities',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'West India Students', value: '1,845+', icon: Users },
  { label: 'States Covered', value: '5', icon: MapPin },
]

const faqs = [
  {
    question: 'Why choose Delhi coaching over Mumbai/Pune local coaching?',
    answer:
      'Delhi coaching has a different approach - more competitive, strategy-focused, and backed by AIIMS alumni experience. Our 98% success rate speaks for itself. Plus, Mumbai coaching centers charge Rs 2-3 lakhs while we offer the same quality at Rs 48,000 maximum.',
  },
  {
    question: 'What are the class timings for West India students?',
    answer:
      'We have evening batches starting from 5 PM and 7 PM IST, plus weekend intensive batches. Since Maharashtra, Gujarat, and MP are in IST zone, timing is very convenient. All classes are recorded for revision.',
  },
  {
    question: 'Do you cover Maharashtra State Board syllabus?',
    answer:
      'NEET is 100% based on NCERT curriculum, not state boards. However, Maharashtra State Board largely follows NCERT pattern. We focus entirely on NCERT which ensures complete NEET preparation regardless of your school board.',
  },
  {
    question: 'Is there any disadvantage studying from home vs relocating to Kota?',
    answer:
      'None at all! Our online students get the same faculty, same materials, and same attention. The advantage is you save Rs 2-3 lakhs in relocation costs, stay with family for emotional support, and study in a comfortable environment. Our results prove online is equally effective.',
  },
  {
    question: 'Do you provide study material delivery to West India?',
    answer:
      'Yes! We courier printed study materials to all addresses in Maharashtra, Gujarat, MP, Goa, and Chhattisgarh. Digital materials are available instantly. Major cities like Mumbai, Pune, Ahmedabad receive materials within 3-4 days.',
  },
]

const whyOnline = [
  {
    icon: Globe,
    title: 'Save Lakhs on Relocation',
    description:
      'Why spend Rs 3+ lakhs on Kota/Delhi relocation? Get the same quality coaching at home for a fraction of cost.',
  },
  {
    icon: GraduationCap,
    title: 'Delhi Faculty Quality',
    description:
      'Access AIIMS-trained faculty from Delhi NCR. Same competitive coaching culture, delivered online.',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description:
      'Multiple toppers from Mumbai and Ahmedabad. West India students excel with our guidance.',
  },
]

export default function NeetCoachingWestIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_west_india', {
        event_category: 'conversion',
        event_label: 'neet_coaching_west_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-900 via-orange-800 to-yellow-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2" />
              Serving All West Indian States Online
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching for West India</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Maharashtra | Gujarat | Madhya Pradesh | Goa | Chhattisgarh
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              From Mumbai to Indore - get Delhi NCR quality NEET coaching at home. AIIMS-trained
              faculty, 98% success rate, and proven results from West India students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-yellow-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across All West Indian States
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the financial capital Mumbai to the education hub Pune - we serve students from
              every corner of West India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {westIndiaStates.map((state, index) => (
              <div key={state.slug} className="animate-fadeInUp">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    state.priority === 'high' ? 'ring-2 ring-amber-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{state.name}</h3>
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">{state.students}</div>
                  <div className="text-sm text-gray-500 mb-3">Students enrolled</div>
                  <div className="flex flex-wrap gap-1">
                    {state.cities.slice(0, 5).map((city) => (
                      <span
                        key={city}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {city}
                      </span>
                    ))}
                    {state.cities.length > 5 && (
                      <span className="text-xs bg-amber-100 text-yellow-600 px-2 py-1 rounded">
                        +{state.cities.length - 5} more
                      </span>
                    )}
                  </div>
                  {state.priority === 'high' && (
                    <div className="mt-3 inline-flex items-center text-xs bg-amber-100 text-yellow-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Student Count
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City-Specific Pages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore NEET Coaching by City
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find detailed information about NEET coaching in your city
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto">
            {[{ name: 'Mumbai', href: '/neet-coaching-mumbai' }].map((city, index) => (
              <div key={city.href} className="animate-fadeInUp">
                <Link
                  href={city.href}
                  className="flex items-center justify-center p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-all hover:shadow-md"
                >
                  <MapPin className="w-4 h-4 mr-2 text-yellow-600" />
                  <span className="font-medium text-gray-800">{city.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why West India Students Choose Our Online Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyOnline.map((item, index) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-100 animate-fadeInUp"
              >
                <item.icon className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Coaching in West India?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching West India
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-gray-50 rounded-xl p-8 animate-fadeInUp">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from West India Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 1,845+ West India students. No Kota
              migration required!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-white text-yellow-700 hover:bg-gray-100"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-yellow-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>5 States Covered</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Save Rs 2.5+ Lakhs</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
