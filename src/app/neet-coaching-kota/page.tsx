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
  Zap,
  Target,
  Heart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const kotaLocalities = [
  {
    name: 'Talwandi',
    slug: 'talwandi',
    students: '450+',
    highlight: 'Coaching Hub Center',
    priority: 'high',
  },
  {
    name: 'Mahaveer Nagar',
    slug: 'mahaveer-nagar',
    students: '380+',
    highlight: 'Premium Coaching Area',
    priority: 'high',
  },
  {
    name: 'Rajeev Gandhi Nagar',
    slug: 'rajeev-gandhi-nagar',
    students: '420+',
    highlight: 'Allen HQ Area',
    priority: 'high',
  },
  {
    name: 'Kunhari',
    slug: 'kunhari',
    students: '340+',
    highlight: 'Student Residential Hub',
    priority: 'high',
  },
  {
    name: 'Vigyan Nagar',
    slug: 'vigyan-nagar',
    students: '310+',
    highlight: 'Educational Zone',
    priority: 'high',
  },
  {
    name: 'Jawahar Nagar',
    slug: 'jawahar-nagar',
    students: '290+',
    highlight: 'Central Kota',
    priority: 'high',
  },
  {
    name: 'Gumanpura',
    slug: 'gumanpura',
    students: '260+',
    highlight: 'Traditional Area',
    priority: 'medium',
  },
  {
    name: 'Borkhera',
    slug: 'borkhera',
    students: '240+',
    highlight: 'Growing Hub',
    priority: 'medium',
  },
  {
    name: 'Rangbari',
    slug: 'rangbari',
    students: '220+',
    highlight: 'Affordable Area',
    priority: 'medium',
  },
  {
    name: 'Indraprastha',
    slug: 'indraprastha',
    students: '200+',
    highlight: 'Industrial Zone',
    priority: 'medium',
  },
  {
    name: 'Dadabari',
    slug: 'dadabari',
    students: '180+',
    highlight: 'Commercial Area',
    priority: 'medium',
  },
  {
    name: 'Keshavpura',
    slug: 'keshavpura',
    students: '160+',
    highlight: 'Residential Zone',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Same quality as Kota top faculties - live teaching with instant doubt resolution from your room',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Unlike crowded Kota classrooms of 200+ students, get personalized attention',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests - everything included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to complement your Kota schedule',
  },
  {
    icon: Shield,
    title: 'Mental Health Focus',
    description: 'Stress-free learning environment - no pressure, only performance improvement',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Kota Students', value: '5,000+', icon: Users },
  { label: 'Biology Specialist', value: '100%', icon: Target },
]

const faqs = [
  {
    question: 'Why do Kota students need additional Biology coaching?',
    answer:
      'Most Kota coaching institutes focus heavily on Physics and Chemistry. Biology often gets less attention despite contributing 360 marks (50% of NEET). Many Kota students score 550+ in PC but struggle in Biology. Our specialized Biology coaching fills this gap, helping students score 340+ in Biology alone.',
  },
  {
    question: "How can online coaching compete with Kota's physical coaching institutes?",
    answer:
      "Our online classes offer what Kota's 200+ student batches cannot - personalized attention. With just 10-15 students per batch, every doubt gets addressed. Plus, save 2-3 hours daily on commuting between hostels and coaching centers. Our 98% success rate proves online is equally effective.",
  },
  {
    question: 'Which areas in Kota do you serve?',
    answer:
      "We serve students from all Kota localities including Talwandi, Mahaveer Nagar, Rajeev Gandhi Nagar, Kunhari, Vigyan Nagar, Jawahar Nagar, Gumanpura, Borkhera, and all other areas. Whether you're near Allen, Resonance, or any other institute, you can join our online classes.",
  },
  {
    question: 'What is the fee for Biology coaching in Kota?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than adding another Kota coaching. This is pure Biology specialization at a fraction of the cost. EMI options and merit scholarships available.',
  },
  {
    question: 'Can I continue my existing Kota coaching while joining Cerebrum?',
    answer:
      'Absolutely! Most of our Kota students are already enrolled in Allen, Resonance, or other institutes for Physics and Chemistry. Our flexible evening and weekend batches are designed specifically to complement your existing Kota schedule.',
  },
  {
    question: 'How do you handle the intense Kota competition pressure?',
    answer:
      'We understand the mental pressure in Kota. Our approach is supportive, not stressful. Regular performance tracking, doubt sessions, and counseling support help students stay motivated. Many students report feeling less overwhelmed after joining our structured Biology program.',
  },
]

const competitorComparison = [
  {
    feature: 'Batch Size',
    kota: '200-500 students',
    cerebrum: '10-15 students',
    winner: 'cerebrum',
  },
  {
    feature: 'Biology Focus',
    kota: 'Combined with PCM',
    cerebrum: '100% Biology Specialist',
    winner: 'cerebrum',
  },
  {
    feature: 'Doubt Resolution',
    kota: 'Group sessions',
    cerebrum: 'Individual attention',
    winner: 'cerebrum',
  },
  {
    feature: 'Study Material',
    kota: 'Generic for all subjects',
    cerebrum: 'Biology-specific NCERT based',
    winner: 'cerebrum',
  },
  {
    feature: 'Flexibility',
    kota: 'Fixed timings',
    cerebrum: 'Multiple batch options',
    winner: 'cerebrum',
  },
]

const whyKota = [
  {
    icon: Target,
    title: 'Biology Gap Filler',
    description:
      'Kota excels in Physics & Chemistry but Biology often lacks attention. We fill exactly that gap with specialized Biology coaching.',
  },
  {
    icon: Heart,
    title: 'Mental Wellness Priority',
    description:
      'Kota pressure is real. Our supportive environment and manageable batches help students thrive without burnout.',
  },
  {
    icon: Zap,
    title: 'Complement, Not Replace',
    description:
      'Continue your Allen/Resonance coaching for PCM. Add Cerebrum for Biology excellence. Best of both worlds.',
  },
]

const topCoachingCenters = [
  'Allen Career Institute',
  'Resonance',
  'Bansal Classes',
  'Motion Education',
  'Career Point',
  'Vibrant Academy',
  'Nucleus Education',
  'Etoos India',
]

export default function NeetCoachingKotaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_kota', {
        event_category: 'conversion',
        event_label: 'neet_coaching_kota_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Kota"
        citySlug="kota"
        state="Rajasthan"
        localities={kotaLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="150000"
        coordinates={{ lat: '25.2138', lng: '75.8648' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-orange-700 to-orange-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              India&apos;s Coaching Capital | 2.5 Lakh Aspirants
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Biology Coaching in Kota</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Talwandi | Mahaveer Nagar | Rajeev Gandhi Nagar | Kunhari | Vigyan Nagar
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Score 340+ in Biology while continuing your Kota PCM coaching. 5,000+ Kota students
              trust our specialized Biology program. Fill the Biology gap that most Kota institutes
              miss.
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
                  className="border-white text-white hover:bg-white hover:text-orange-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <div key={metric.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fadeInUp">
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Kota Biology Problem Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              The Hidden Problem in Kota Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Most Kota students score 550+ in Physics & Chemistry but struggle in Biology.
              Here&apos;s why and how we solve it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-6">❌ The Problem</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Kota institutes focus 70% on Physics & Chemistry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Biology batches have 200-500 students - no personal attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Biology contributes 360 marks (50%) but gets 30% time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Students score 280-300 in Biology, losing 60-80 marks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Result: Good AIR in PCM, poor overall NEET rank</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="animate-fadeInUp">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-6">✓ Our Solution</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>100% Biology specialized coaching - our only focus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>Small batches of 10-15 students with personal attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>AIIMS-trained faculty with deep Biology expertise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>Students score 340+ in Biology after joining</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>Result: Combined with Kota PCM = Top NEET Ranks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kota Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Biology Coaching Across All Kota Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Talwandi to Vigyan Nagar, we serve students from every corner of Kota&apos;s
              coaching ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kotaLocalities.map((locality, index) => (
              <div key={locality.slug} className="animate-fadeInUp">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-orange-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Demand Area
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Kota Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why 1,000+ Kota Students Added Cerebrum
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complement your Kota coaching with specialized Biology excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyKota.map((item, index) => (
              <div key={item.title} className="bg-orange-50 rounded-xl p-8 border border-orange-100 animate-fadeInUp">
                <item.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Kota Institutes Trust Us
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {topCoachingCenters.map((center, index) => (
                <span key={center} className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm animate-fadeInUp">
                  {center}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Kota Coaching vs Cerebrum Biology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See why specialized Biology coaching makes the difference.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-0 bg-gray-100 p-4 font-bold text-center">
              <div>Feature</div>
              <div>Typical Kota Institute</div>
              <div className="text-orange-600">Cerebrum Biology</div>
            </div>
            {competitorComparison.map((row, index) => (
              <div key={row.feature} className="grid grid-cols-3 gap-0 p-4 border-b last:border-b-0 text-center items-center animate-fadeInUp">
                <div className="font-medium text-gray-900">{row.feature}</div>
                <div className="text-gray-600">{row.kota}</div>
                <div
                  className={`${row.winner === 'cerebrum' ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}
                >
                  {row.cerebrum}
                  {row.winner === 'cerebrum' && (
                    <CheckCircle className="w-4 h-4 inline ml-2 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Biology in Kota?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="bg-gray-50 rounded-xl p-8 shadow-lg animate-fadeInUp">
                <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching Kota
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="bg-white rounded-xl p-8 animate-fadeInUp">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="kota" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Fill Your Biology Gap - Score 340+ in NEET
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 5,000+ Kota students. Complement your
              Kota coaching today!
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
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Kota Areas</span>
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
                <span>Flexible Schedule</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
