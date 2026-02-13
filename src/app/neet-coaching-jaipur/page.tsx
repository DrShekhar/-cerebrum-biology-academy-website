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
  Heart,
  Target,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { RelatedCityLinks } from '@/components/seo/RelatedCityLinks'
import { CitySchema } from '@/components/seo/CitySchema'

const jaipurLocalities = [
  {
    name: 'Vaishali Nagar',
    slug: 'vaishali-nagar',
    students: '380+',
    highlight: 'Premium Residential',
    priority: 'high',
  },
  {
    name: 'Mansarovar',
    slug: 'mansarovar',
    students: '350+',
    highlight: 'Educational Hub',
    priority: 'high',
  },
  {
    name: 'Malviya Nagar',
    slug: 'malviya-nagar-jaipur',
    students: '320+',
    highlight: 'Central Jaipur',
    priority: 'high',
  },
  {
    name: 'Raja Park',
    slug: 'raja-park',
    students: '290+',
    highlight: 'Coaching Center',
    priority: 'high',
  },
  {
    name: 'Tonk Road',
    slug: 'tonk-road',
    students: '270+',
    highlight: 'South Jaipur',
    priority: 'high',
  },
  {
    name: 'Jagatpura',
    slug: 'jagatpura',
    students: '240+',
    highlight: 'Growing Hub',
    priority: 'high',
  },
  {
    name: 'C-Scheme',
    slug: 'c-scheme',
    students: '260+',
    highlight: 'Elite Area',
    priority: 'high',
  },
  {
    name: 'Pratap Nagar',
    slug: 'pratap-nagar',
    students: '200+',
    highlight: 'Residential Zone',
    priority: 'medium',
  },
  {
    name: 'Sanganer',
    slug: 'sanganer',
    students: '180+',
    highlight: 'Airport Area',
    priority: 'medium',
  },
  {
    name: 'Jhotwara',
    slug: 'jhotwara',
    students: '170+',
    highlight: 'North Jaipur',
    priority: 'medium',
  },
  {
    name: 'Sitapura',
    slug: 'sitapura',
    students: '190+',
    highlight: 'Industrial Zone',
    priority: 'medium',
  },
  {
    name: 'Ajmer Road',
    slug: 'ajmer-road',
    students: '210+',
    highlight: 'West Corridor',
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution - same as Kota coaching quality',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: "Unlike Kota's 200+ batches, get personal attention for every student",
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Kota-Level Results',
    description: 'Get Kota-quality results without leaving the Pink City',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to fit your schedule',
  },
  {
    icon: Shield,
    title: 'Stay in Jaipur',
    description: "No Kota migration needed - get top coaching from Rajasthan's capital",
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'Rajasthan Students', value: '3,500+', icon: Users },
  { label: 'Areas Covered', value: '12+', icon: MapPin },
]

const faqs = [
  {
    question: 'Why should Jaipur students choose online coaching over Kota migration?',
    answer:
      "Jaipur is just 200 km from Kota, but migration still costs Rs 3-4 lakhs annually. Our online coaching delivers same quality teaching at Rs 24,000-48,000 per year. Stay in the Pink City with family, save money, and get personalized attention that Kota's crowded classrooms cannot provide. Our 98% success rate equals Kota's top institutes.",
  },
  {
    question: 'Which areas in Jaipur do you serve?',
    answer:
      'We serve all major Jaipur localities including Vaishali Nagar, Mansarovar, Malviya Nagar, Raja Park, Tonk Road, Jagatpura, C-Scheme, Pratap Nagar, Sanganer, Jhotwara, Sitapura, Ajmer Road, and all surrounding areas. Students from any Jaipur or Rajasthan district can join our online live classes.',
  },
  {
    question: 'What is the fee for NEET coaching in Jaipur?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - a fraction of Kota migration costs. We offer EMI options and merit scholarships specifically for Rajasthan students.',
  },
  {
    question: 'How is this different from Kota coaching?',
    answer:
      "While Kota institutes have 200-500 students per batch, we limit batches to 10-15 students. This means every doubt gets addressed, every student gets personal attention. Plus, our 100% Biology focus fills the gap that Kota's PCM-heavy approach creates. Students score 340+ in Biology with us.",
  },
  {
    question: 'Do you understand Rajasthan board patterns?',
    answer:
      'Yes! We have specialized batches for Rajasthan board (RBSE) students. Our faculty understands the RBSE syllabus, exam patterns, and how to balance board exams with NEET preparation. Many of our Jaipur students have scored 90%+ in boards while also cracking NEET.',
  },
  {
    question: 'What about Rajasthan state quota for medical colleges?',
    answer:
      'Rajasthan has excellent state quota medical colleges like SMS Medical College, RNT Medical College, JLN Medical College. With 85% state quota, Rajasthan students have great opportunities. Our coaching helps you maximize your score for better state quota seats.',
  },
]

const premiumSchools = [
  'Maharaja Sawai Man Singh Vidyalaya',
  "St. Xavier's School",
  'Neerja Modi School',
  'Jayshree Periwal',
  'MGD Girls School',
  'Seedling Modern Public',
  'Delhi Public School',
  'St. Angela Sophia',
  'Subodh Public School',
  'Kendriya Vidyalaya',
]

const whyJaipur = [
  {
    icon: Target,
    title: 'Kota Alternative',
    description:
      'Just 200 km from Kota, but why migrate? Get same quality results from Jaipur at 1/5th the cost.',
  },
  {
    icon: Zap,
    title: 'Biology Specialist',
    description:
      'While Kota focuses on Physics & Chemistry, we specialize 100% in Biology. Fill the gap, score 340+.',
  },
  {
    icon: GraduationCap,
    title: 'Rajasthan Expert',
    description:
      'We understand RBSE patterns, Jaipur school schedules, and local challenges. Personalized support for Rajasthan students.',
  },
]

const medicalColleges = [
  'SMS Medical College Jaipur',
  'RNT Medical College Udaipur',
  'JLN Medical College Ajmer',
  'Dr. SN Medical College Jodhpur',
  'GMC Kota',
  'SP Medical College Bikaner',
]

export default function NeetCoachingJaipurPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_jaipur', {
        event_category: 'conversion',
        event_label: 'neet_coaching_jaipur_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      <CitySchema
        cityName="Jaipur"
        citySlug="jaipur"
        state="Rajasthan"
        localities={jaipurLocalities.map((l) => l.name)}
        faqs={faqs}
        studentCount="3500"
        coordinates={{ lat: '26.9124', lng: '75.7873' }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-900 via-pink-700 to-pink-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              The Pink City | Kota-Level Results at Home
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching in Jaipur</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Vaishali Nagar | Mansarovar | Malviya Nagar | Raja Park | C-Scheme
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Why migrate to Kota when you can get same results from Jaipur? AIIMS trained
              faculties, 98% success rate, live interactive classes. Join 3,500+ Rajasthan
              students achieving NEET success from home.
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
                  className="border-white text-white hover:bg-white hover:text-pink-900"
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

      {/* Jaipur vs Kota Section */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Jaipur vs Kota: Why Migrate 200 km?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get Kota-level results without the migration headache and cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
             className="animate-fadeInUp">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-red-600 mb-6">❌ Kota Migration</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>200+ students per batch - no personal attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Rs 3-4 lakhs annual cost (coaching + hostel + food)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Away from family support during crucial years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Mental pressure and homesickness common</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">•</span>
                    <span>Biology often neglected in PCM-heavy curriculum</span>
                  </li>
                </ul>
              </div>
            </div>

            <div
             className="animate-fadeInUp">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-6">✓ Cerebrum from Jaipur</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>10-15 students per batch - every doubt addressed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>Rs 24,000-48,000 annual cost - save 80%+</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>Stay with family in the Pink City</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>Stress-free learning environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3">•</span>
                    <span>100% Biology focus - score 340+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jaipur Localities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across All Jaipur Localities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Vaishali Nagar to Sanganer, C-Scheme to Sitapura - we serve students from every
              corner of Jaipur and Rajasthan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jaipurLocalities.map((locality, index) => (
              <div
                key={locality.slug}
               className="animate-fadeInUp">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
                    locality.priority === 'high' ? 'ring-2 ring-pink-600' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{locality.name}</h3>
                    <MapPin className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="text-2xl font-bold text-pink-600 mb-1">{locality.students}</div>
                  <div className="text-sm text-gray-500">{locality.highlight}</div>
                  {locality.priority === 'high' && (
                    <div className="mt-2 inline-flex items-center text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Demand
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rajasthan Medical Colleges */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Into Top Rajasthan Medical Colleges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rajasthan has 85% state quota seats. Our coaching is designed to help you secure seats
              in Rajasthan&apos;s prestigious medical colleges.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {medicalColleges.map((college, index) => (
              <div
                key={college}
                className="bg-white px-6 py-4 rounded-xl shadow-lg animate-fadeInUp"
              >
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-pink-600 mr-2" />
                  <span className="font-semibold text-gray-900">{college}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Jaipur Students Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Jaipur Students Choose Online NEET Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyJaipur.map((item, index) => (
              <div
                key={item.title}
                className="bg-pink-50 rounded-xl p-8 border border-pink-100 animate-fadeInUp"
              >
                <item.icon className="w-12 h-12 text-pink-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Students from These Jaipur Schools Trust Us
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
              Why Choose Cerebrum for NEET Coaching in Jaipur?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-pink-600 mb-4" />
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
              Frequently Asked Questions - NEET Coaching Jaipur
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-pink-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Cities Section */}
      <RelatedCityLinks currentCity="jaipur" variant="default" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-pink-600 to-pink-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from the Pink City
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 3,500+ Rajasthan students. Kota-level
              results without migration!
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
                  className="border-white text-white hover:bg-white hover:text-pink-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>All Jaipur Areas</span>
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
                <span>Kota Alternative</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
