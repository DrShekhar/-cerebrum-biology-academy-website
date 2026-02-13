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

const southMumbaiLocalities = [
  {
    name: 'Colaba',
    slug: 'colaba',
    students: '95+',
    highlight: 'Heritage Premium',
    priority: 'high',
  },
  {
    name: 'Cuffe Parade',
    slug: 'cuffe-parade',
    students: '80+',
    highlight: 'Ultra Premium Enclave',
    priority: 'high',
  },
  {
    name: 'Malabar Hill',
    slug: 'malabar-hill',
    students: '75+',
    highlight: 'Elite Address',
    priority: 'high',
  },
  {
    name: 'Breach Candy',
    slug: 'breach-candy',
    students: '65+',
    highlight: 'Exclusive Premium',
    priority: 'high',
  },
  {
    name: 'Pedder Road',
    slug: 'pedder-road',
    students: '70+',
    highlight: 'Billionaire Row',
    priority: 'high',
  },
  {
    name: 'Worli',
    slug: 'worli',
    students: '120+',
    highlight: 'Sea Link Adjacent',
    priority: 'high',
  },
  {
    name: 'Nepean Sea Road',
    slug: 'nepean-sea-road',
    students: '55+',
    highlight: 'Heritage Premium',
    priority: 'high',
  },
  {
    name: 'Marine Drive',
    slug: 'marine-drive',
    students: '60+',
    highlight: "Queen's Necklace",
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to travel out of South Mumbai. World-class teaching from your sea-view apartment.',
  },
  {
    icon: Users,
    title: 'Ultra-Elite Batches (8-12)',
    description:
      'Exclusive micro-batches for South Mumbai students with white-glove personalized attention.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Expert doctors and teachers from premier medical institutions. Quality befitting South Mumbai.',
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
    description:
      'Morning, afternoon, and evening batches to complement your international school schedule.',
  },
  {
    icon: Shield,
    title: 'Stress-Free Learning',
    description:
      'No traveling to Dadar or Andheri. Study in comfort from Malabar Hill or Cuffe Parade.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '362', icon: Star },
  { label: 'SoBo Students', value: '480+', icon: Users },
  { label: 'Elite Schools', value: '18+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do South Mumbai students choose online NEET coaching?',
    answer:
      "South Mumbai's elite schools like Cathedral, Campion, and JBCN have demanding schedules and high standards. Our online classes offer the same premium experience - top faculty, small batches - without the need to travel to suburban coaching hubs. Why sit in traffic when you can get AIIMS faculty on your screen?",
  },
  {
    question: 'Which areas in South Mumbai do you serve?',
    answer:
      'We serve all South Mumbai localities including Colaba, Cuffe Parade, Malabar Hill, Breach Candy, Pedder Road, Worli, Nepean Sea Road, Marine Drive, Walkeshwar, Kemps Corner, and Tardeo. Students from any SoBo address can join our online live classes.',
  },
  {
    question: 'What is the fee for premium NEET coaching in South Mumbai?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. For South Mumbai families, we offer premium concierge support and ultra-small batches. EMI options available.',
  },
  {
    question: 'How does this compare to coaching centers in Dadar or Churchgate?',
    answer:
      'Unlike physical coaching centers where batches have 50-100 students, our South Mumbai batches are limited to 8-12 students. This means every doubt gets addressed, every student gets personal attention. Quality that matches South Mumbai standards.',
  },
  {
    question: 'Do you understand international school curriculums?',
    answer:
      'Absolutely! We specialize in IB, IGCSE, A-Levels, and Cambridge curriculum students. Many of our South Mumbai students are from Cathedral, Campion, JBCN, and Bombay International School. Our faculty bridges international curriculum with NEET Biology seamlessly.',
  },
  {
    question: 'What medical colleges can South Mumbai students target?',
    answer:
      'With proper NEET preparation, South Mumbai students can target top colleges like Grant Medical College (closest to SoBo), Seth GS Medical College, KEM Hospital, and all-India institutes like AIIMS Delhi, JIPMER, and Armed Forces Medical College.',
  },
]

const premiumSchools = [
  'Cathedral & John Connon School',
  'Campion School',
  'JBCN International School',
  'Bombay International School',
  'Dhirubhai Ambani International',
  'The Study School',
  'Tridha School',
  'Queen Mary School',
  'J.B. Petit School',
  'BD Somani International',
]

const whySouthMumbai = [
  {
    icon: Sparkles,
    title: 'Concierge-Level Service',
    description:
      'White-glove education service for South Mumbai families. Dedicated mentor, priority doubt resolution, parent updates.',
  },
  {
    icon: Building,
    title: 'International School Expert',
    description:
      'We understand IB, IGCSE, A-Levels. Our faculty knows Cathedral, Campion, JBCN curriculums and how to prepare for NEET.',
  },
  {
    icon: GraduationCap,
    title: 'Elite Student Network',
    description:
      "Study with peers from South Mumbai's top schools. Network with motivated students from elite institutions.",
  },
]

export default function NeetCoachingSouthMumbaiPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_south_mumbai', {
        event_category: 'conversion',
        event_label: 'neet_coaching_south_mumbai_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="South Mumbai"
        citySlug="south-mumbai"
        state="Maharashtra"
        localities={southMumbaiLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="480"
        coordinates={{ lat: '18.9322', lng: '72.8312' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-700 to-zinc-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Mumbai&apos;s Elite Address | Premium NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in South Mumbai</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Colaba | Cuffe Parade | Malabar Hill | Breach Candy | Pedder Road | Worli
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Ultra-premium NEET Biology coaching for South Mumbai&apos;s elite schools. 98%
              success rate, AIIMS faculty, concierge service. Join 480+ students from Cathedral,
              Campion, JBCN.
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
                  className="border-white text-white hover:bg-white hover:text-slate-900"
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

      {/* South Mumbai Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across South Mumbai&apos;s Elite Addresses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Colaba to Worli, Malabar Hill to Marine Drive - premium coaching for every SoBo
              locality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {southMumbaiLocalities.map((locality, index) => (
              <div
                key={locality.slug}
               className="animate-fadeInUp">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-slate-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      Elite Area
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why South Mumbai Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why South Mumbai&apos;s Elite Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ultra-premium education meets convenience - designed for South Mumbai&apos;s
              discerning families.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whySouthMumbai.map((item, index) => (
              <div
                key={item.title}
                className="bg-slate-50 rounded-xl p-8 border border-slate-100 animate-fadeInUp"
              >
                <item.icon className="w-12 h-12 text-slate-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These South Mumbai Schools Trust Us
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
                <feature.icon className="w-12 h-12 text-slate-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching South Mumbai
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-slate-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-700 via-slate-600 to-zinc-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join South Mumbai&apos;s Elite NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS faculty, concierge service. International school
              specialists!
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
                  className="border-white text-white hover:bg-white hover:text-slate-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All SoBo Areas</span>
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
                <span>IB/IGCSE Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
