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

const powaiLocalities = [
  {
    name: 'Powai Lake',
    slug: 'powai-lake',
    students: '160+',
    highlight: 'Premium Lake View Area',
    priority: 'high',
  },
  {
    name: 'Hiranandani Gardens',
    slug: 'hiranandani-gardens',
    students: '200+',
    highlight: 'Township Hub',
    priority: 'high',
  },
  {
    name: 'JVLR Area',
    slug: 'jvlr-powai',
    students: '120+',
    highlight: 'Corporate Corridor',
    priority: 'high',
  },
  {
    name: 'Chandivali',
    slug: 'chandivali',
    students: '140+',
    highlight: 'Adjacent Premium',
    priority: 'high',
  },
  {
    name: 'IIT Bombay Area',
    slug: 'iit-bombay-area',
    students: '90+',
    highlight: 'Academic Excellence Zone',
    priority: 'high',
  },
  {
    name: 'Vikhroli (W)',
    slug: 'vikhroli-west',
    students: '100+',
    highlight: 'Godrej Green Belt',
    priority: 'medium',
  },
  {
    name: 'Kanjurmarg',
    slug: 'kanjurmarg',
    students: '85+',
    highlight: 'Growing Hub',
    priority: 'medium',
  },
  {
    name: 'Nahar Amrit Shakti',
    slug: 'nahar-amrit-shakti',
    students: '75+',
    highlight: 'Premium Enclave',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Premium online coaching - no need to travel through Powai-LBS traffic. World-class teaching from home.',
  },
  {
    icon: Users,
    title: 'Tech-Professional Batches (10-15)',
    description:
      'Exclusive batches for Powai IT families with personalized attention and premium support.',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Expert doctors and teachers from premier medical institutions. Quality Powai IT families expect.',
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
      'Morning, afternoon, and evening batches to complement your IB/IGCSE school schedule.',
  },
  {
    icon: Shield,
    title: 'Stress-Free Learning',
    description: 'No LBS Marg traffic stress. Study in comfort from your Hiranandani apartment.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '355', icon: Star },
  { label: 'Powai Students', value: '720+', icon: Users },
  { label: 'IB/IGCSE Schools', value: '12+', icon: GraduationCap },
]

const faqs = [
  {
    question: 'Why do Powai students choose online NEET coaching?',
    answer:
      "Powai's tech-forward families understand the power of online learning. With IIT Bombay in the neighborhood, excellence in education is expected. Our online classes offer AIIMS faculty at your fingertips, without LBS Marg traffic. Save 2+ hours daily on commute to coaching centers in Andheri or Dadar.",
  },
  {
    question: 'Which areas in Powai do you serve?',
    answer:
      'We serve all Powai localities including Hiranandani Gardens, Powai Lake area, JVLR corridor, Chandivali, IIT Bombay surroundings, Vikhroli West, Kanjurmarg, and Nahar complexes. Students from any Powai township can join our online live classes.',
  },
  {
    question: 'What is the fee for premium NEET coaching in Powai?',
    answer:
      "Our complete NEET Biology course ranges from Rs 24,000 to Rs 68,000 per year depending on the program chosen. This matches Powai's premium education standards while offering superior flexibility and personalized attention. EMI options available for IT professionals.",
  },
  {
    question: 'How does this compare to coaching centers in Andheri?',
    answer:
      'Unlike physical coaching centers where batches have 50-100 students, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention. Plus, you save 2+ hours on Mumbai traffic daily - time that can be used for self-study.',
  },
  {
    question: 'Do you support IB/IGCSE students from Powai schools?',
    answer:
      'Yes! We specialize in international curriculum students. Many of our Powai students are from Hiranandani Foundation School, Powai International School, Ryan International, and other premium schools. Our faculty knows how to bridge IB/IGCSE Biology with NEET requirements.',
  },
  {
    question: 'What medical colleges can Powai students target?',
    answer:
      'With proper NEET preparation, Powai students can target top colleges like Grant Medical College, KEM Hospital, Seth GS Medical College, Lokmanya Tilak Municipal Medical College, and all-India institutes like AIIMS and JIPMER.',
  },
]

const premiumSchools = [
  'Hiranandani Foundation School',
  'Powai International School',
  'Ryan International Powai',
  'VIBGYOR High Powai',
  'Don Bosco International School',
  'Lodha World School',
  'DSB International School',
  'Kendriya Vidyalaya IIT',
  'DAV Public School Powai',
  'Orchid International School',
]

const whyPowai = [
  {
    icon: Sparkles,
    title: 'Tech-Forward Learning',
    description:
      'Get world-class NEET coaching using the same digital excellence Powai IT families trust. Interactive platform, AI-powered analytics.',
  },
  {
    icon: Building,
    title: 'IIT Bombay Quality Standards',
    description:
      'With IIT Bombay in the neighborhood, Powai expects excellence. Our faculty and methods meet those high standards.',
  },
  {
    icon: GraduationCap,
    title: 'International School Expert',
    description:
      'We understand IB, IGCSE, Cambridge. Our faculty knows how to prepare international school students for NEET.',
  },
]

export default function NeetCoachingPowaiPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_powai', {
        event_category: 'conversion',
        event_label: 'neet_coaching_powai_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Powai"
        citySlug="powai-mumbai"
        state="Maharashtra"
        localities={powaiLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="720"
        coordinates={{ lat: '19.1176', lng: '72.9060' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-900 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Mumbai&apos;s Tech Hub | Premium NEET Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Powai</span>, Mumbai
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Hiranandani Gardens | Powai Lake | JVLR | Chandivali | IIT Bombay Area
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Tech-forward NEET Biology coaching for Powai&apos;s IT families. 98% success rate,
              AIIMS faculty, zero traffic commute. Join 720+ students from Hiranandani and Powai
              schools.
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
                  className="border-white text-white hover:bg-white hover:text-blue-900"
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

      {/* Powai Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across Powai & Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Hiranandani Gardens to IIT Bombay area - premium coaching for every Powai
              locality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {powaiLocalities.map((locality, index) => (
              <div
                key={locality.slug}
               className="animate-fadeInUp">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-cyan-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="text-2xl font-bold text-cyan-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
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

      {/* Why Powai Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Powai&apos;s Tech Families Choose Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Digital excellence meets premium education - designed for Powai&apos;s tech-forward
              families.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyPowai.map((item, index) => (
              <div
                key={item.title}
                className="bg-cyan-50 rounded-xl p-8 border border-cyan-100 animate-fadeInUp"
              >
                <item.icon className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Powai Schools Trust Us
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
                <feature.icon className="w-12 h-12 text-cyan-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Powai
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-cyan-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Powai&apos;s Elite NEET Aspirants
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS faculty, tech-forward platform. IB/IGCSE specialists!
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
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Powai Areas</span>
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
