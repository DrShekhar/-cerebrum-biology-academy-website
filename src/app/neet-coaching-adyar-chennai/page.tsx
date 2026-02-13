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
  Shield,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Building,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { CitySchema } from '@/components/seo/CitySchema'

const adyarLocalities = [
  {
    name: 'Adyar Main',
    slug: 'adyar-main',
    students: '150+',
    highlight: 'Heritage Premium',
    priority: 'high',
  },
  {
    name: 'Besant Nagar',
    slug: 'besant-nagar',
    students: '130+',
    highlight: 'Beach Road Premium',
    priority: 'high',
  },
  {
    name: 'Thiruvanmiyur',
    slug: 'thiruvanmiyur',
    students: '120+',
    highlight: 'ECR Adjacent',
    priority: 'high',
  },
  {
    name: 'Kotturpuram',
    slug: 'kotturpuram',
    students: '95+',
    highlight: 'IIT Madras Adjacent',
    priority: 'high',
  },
  {
    name: 'Indira Nagar',
    slug: 'indira-nagar-chennai',
    students: '85+',
    highlight: 'Residential Hub',
    priority: 'high',
  },
  {
    name: 'Gandhi Nagar',
    slug: 'gandhi-nagar-adyar',
    students: '75+',
    highlight: 'Family Area',
    priority: 'medium',
  },
  {
    name: 'Shastri Nagar',
    slug: 'shastri-nagar-adyar',
    students: '70+',
    highlight: 'Growing Area',
    priority: 'medium',
  },
  {
    name: 'Kasturba Nagar',
    slug: 'kasturba-nagar',
    students: '65+',
    highlight: 'Residential',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to navigate Chennai traffic. World-class teaching from your Adyar home.',
  },
  {
    icon: Users,
    title: 'Elite Small Batches (10-15)',
    description:
      'Exclusive batches for Adyar students with personalized attention and premium support.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Expert doctors and teachers from premier medical institutions. Quality Adyar families expect.',
  },
  {
    icon: BookOpen,
    title: 'Complete Premium Package',
    description:
      'NCERT mastery, advanced materials, unlimited doubt sessions - everything included.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to complement your school schedule.',
  },
  {
    icon: Shield,
    title: 'Stress-Free Learning',
    description: 'No traffic stress. Study in comfort from Besant Nagar or Thiruvanmiyur.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '359', icon: Star },
  { label: 'Adyar Students', value: '580+', icon: Users },
  { label: 'Elite Schools', value: '15+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Adyar students choose online NEET coaching?',
    answer:
      "Adyar is Chennai's educational hub with IIT Madras, Anna University, and premium schools nearby. Our online classes offer AIIMS faculty without the traffic to T. Nagar or Anna Nagar coaching centers. Save 2+ hours daily on Chennai traffic.",
  },
  {
    question: 'Which areas in Adyar do you serve?',
    answer:
      'We serve all Adyar localities including Adyar Main, Besant Nagar, Thiruvanmiyur, Kotturpuram, Indira Nagar, Gandhi Nagar, Shastri Nagar, and Kasturba Nagar. Students from any part of South Chennai can join our online live classes.',
  },
  {
    question: 'What is the fee for premium NEET coaching in Adyar?',
    answer:
      "Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This matches Adyar's premium education standards while offering superior flexibility. EMI options available.",
  },
  {
    question: 'How does this compare to coaching centers in T. Nagar?',
    answer:
      'Unlike physical coaching centers in T. Nagar or Anna Nagar where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention.',
  },
  {
    question: 'Do you support CBSE and State Board students?',
    answer:
      'Yes! We have batches for CBSE, Tamil Nadu State Board, and international curriculum (IB, IGCSE) students. Many of our Adyar students are from Bala Vidya Mandir, PSBB, Chettinad Vidyashram, and The School KFI.',
  },
  {
    question: 'What medical colleges can Adyar students target?',
    answer:
      'With proper NEET preparation, Adyar students can target top colleges like Madras Medical College, Stanley Medical College, Kilpauk Medical College, Sri Ramachandra, and all-India institutes like AIIMS, JIPMER Puducherry, and CMC Vellore.',
  },
]

const premiumSchools = [
  'Bala Vidya Mandir',
  'PSBB School',
  'Chettinad Vidyashram',
  'The School KFI',
  'Asan Memorial',
  "St. Michael's Academy",
  'San Thome Higher Secondary',
  'Lady Andal School',
  'DAV Adyar',
  'Vidya Mandir',
]

const whyAdyar = [
  {
    icon: Sparkles,
    title: 'IIT Madras Quality Standards',
    description:
      'With IIT Madras in the neighborhood, Adyar expects excellence. Our faculty and methods meet those high standards.',
  },
  {
    icon: Building,
    title: "South Chennai's Best",
    description:
      "Designed for Adyar's discerning families. Premium infrastructure, personalized mentorship.",
  },
  {
    icon: GraduationCap,
    title: 'Elite School Expert',
    description:
      'We understand PSBB, Bala Vidya Mandir, Chettinad curriculums. Our faculty bridges school learning with NEET.',
  },
]

export default function NeetCoachingAdyarPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_adyar', {
        event_category: 'conversion',
        event_label: 'neet_coaching_adyar_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Adyar"
        citySlug="adyar-chennai"
        state="Tamil Nadu"
        localities={adyarLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="580"
        coordinates={{ lat: '13.0067', lng: '80.2565' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-rose-700 to-pink-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Chennai&apos;s Educational Hub | Premium NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Adyar</span>, Chennai
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Besant Nagar | Thiruvanmiyur | Kotturpuram | Indira Nagar | IIT Gate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Premium NEET Biology coaching for Adyar&apos;s elite schools. 98% success rate,
              AIIMS faculty, zero traffic stress. Join 580+ students from PSBB, Bala Vidya Mandir,
              Chettinad.
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
                  className="border-white text-white hover:bg-white hover:text-rose-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Premium Programs
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

      {/* Adyar Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across Adyar & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Besant Nagar to Thiruvanmiyur, Kotturpuram to Indira Nagar - premium coaching for
              South Chennai.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adyarLocalities.map((locality, index) => (
              <div
                key={locality.slug}
               className="animate-fadeInUp">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-rose-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="text-2xl font-bold text-rose-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      Premium Area
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Adyar Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Adyar&apos;s Elite Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium education meets convenience - designed for South Chennai&apos;s discerning
              families.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyAdyar.map((item, index) => (
              <div
                key={item.title}
                className="bg-rose-50 rounded-xl p-8 border border-rose-100 animate-fadeInUp"
              >
                <item.icon className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Adyar Schools Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {premiumSchools.map((school, index) => (
                <span
                  key={school}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Premium NEET Biology Coaching Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching Adyar
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-rose-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-rose-600 to-pink-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Adyar&apos;s Elite NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS faculty, premium small batches. JIPMER specialists!
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

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-rose-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Adyar Areas</span>
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
                <span>JIPMER Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
