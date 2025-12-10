'use client'

import { motion } from 'framer-motion'
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
  Globe,
  Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const northIndiaStates = [
  {
    name: 'Delhi NCR',
    slug: 'delhi-ncr',
    students: '1,500+',
    cities: ['Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'],
    priority: 'high',
  },
  {
    name: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    students: '800+',
    cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Prayagraj'],
    priority: 'high',
  },
  {
    name: 'Haryana',
    slug: 'haryana',
    students: '450+',
    cities: ['Faridabad', 'Ambala', 'Panipat', 'Karnal', 'Rohtak'],
    priority: 'high',
  },
  {
    name: 'Punjab',
    slug: 'punjab',
    students: '350+',
    cities: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    priority: 'medium',
  },
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    students: '500+',
    cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'],
    priority: 'high',
  },
  {
    name: 'Uttarakhand',
    slug: 'uttarakhand',
    students: '200+',
    cities: ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Haldwani'],
    priority: 'medium',
  },
  {
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    students: '150+',
    cities: ['Shimla', 'Dharamshala', 'Manali', 'Solan', 'Mandi'],
    priority: 'medium',
  },
  {
    name: 'Jammu & Kashmir',
    slug: 'jammu-kashmir',
    students: '180+',
    cities: ['Jammu', 'Srinagar', 'Anantnag', 'Baramulla'],
    priority: 'medium',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description:
      'Real-time teaching with instant doubt resolution - Delhi-quality education anywhere in North India',
  },
  {
    icon: Users,
    title: 'Small Batches (10-15)',
    description: 'Personal attention for every student from Jammu to Jaipur',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculties',
    description: 'Expert doctors and teachers trained at premier Delhi medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches across all time zones',
  },
  {
    icon: Wifi,
    title: 'Low Bandwidth Friendly',
    description: 'Optimized for smaller cities with moderate internet speeds',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '360', icon: Star },
  { label: 'North India Students', value: '4,100+', icon: Users },
  { label: 'States Covered', value: '8', icon: MapPin },
]

const faqs = [
  {
    question: 'Can students from Tier-2 and Tier-3 cities in North India join?',
    answer:
      'Absolutely! Our online platform is designed to work even with moderate internet speeds. Students from cities like Kanpur, Varanasi, Kota, Dehradun, Shimla, and smaller towns have successfully studied with us and cracked NEET. We optimize our video streaming for various bandwidth conditions.',
  },
  {
    question: 'How do live classes work for students across different North Indian states?',
    answer:
      'We conduct live interactive classes via Zoom/Google Meet. All North Indian states are in the same time zone (IST), so timing is convenient. Ask questions in real-time, participate in discussions, and interact with teachers just like a physical classroom. All classes are recorded for revision.',
  },
  {
    question: 'What is the fee for NEET coaching for North India students?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year - significantly lower than Delhi coaching centers plus you save on relocation and hostel costs. Kota institutes charge Rs 1.5-2 lakhs including hostel. We offer EMI options and merit scholarships.',
  },
  {
    question: 'Is online coaching as effective as Kota or Delhi coaching?',
    answer:
      'Our 98% success rate proves online coaching is equally effective. The key advantages: same Delhi-trained faculty, no relocation stress, study in your comfortable environment, save money on hostel/food, and maintain family support during this crucial phase.',
  },
  {
    question: 'Do you provide study material delivery to North India?',
    answer:
      'Yes! We courier printed study materials to all North Indian addresses. Digital materials are available instantly. Mock test papers and previous year question banks are provided both online and offline.',
  },
]

const whyOnline = [
  {
    icon: Globe,
    title: 'No Relocation Required',
    description:
      'Why shift to Kota or Delhi? Get the same quality education from your hometown. Stay with family during NEET preparation.',
  },
  {
    icon: Shield,
    title: 'Safe & Comfortable',
    description:
      'Study in your known environment. No hostel worries, no unknown city stress. Focus 100% on preparation.',
  },
  {
    icon: GraduationCap,
    title: 'Delhi Faculty at Your Home',
    description:
      'Access AIIMS-trained faculty from Delhi NCR without moving. Same teaching quality, zero relocation cost.',
  },
]

export default function NeetCoachingNorthIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_north_india', {
        event_category: 'conversion',
        event_label: 'neet_coaching_north_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Globe className="w-5 h-5 mr-2" />
              Serving All North Indian States Online
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching for North India</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Delhi NCR | Uttar Pradesh | Haryana | Punjab | Rajasthan | Uttarakhand | HP | J&K
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Why relocate to Kota or Delhi? Get AIIMS-trained faculty, 98% success rate, and live
              interactive classes from your hometown. Join 4,100+ North India students already
              preparing with us online.
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
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* States Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              NEET Coaching Across All North Indian States
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the mountains of Himachal to the plains of UP - we serve students from every
              corner of North India through our online platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {northIndiaStates.map((state, index) => (
              <motion.div
                key={state.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    state.priority === 'high' ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{state.name}</h3>
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{state.students}</div>
                  <div className="text-sm text-gray-500 mb-3">Students enrolled</div>
                  <div className="flex flex-wrap gap-1">
                    {state.cities.slice(0, 4).map((city) => (
                      <span
                        key={city}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {city}
                      </span>
                    ))}
                    {state.cities.length > 4 && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        +{state.cities.length - 4} more
                      </span>
                    )}
                  </div>
                  {state.priority === 'high' && (
                    <div className="mt-3 inline-flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 mr-1" />
                      High Student Count
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why North India Students Choose Online NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip the Kota migration. Get Delhi-quality education without leaving your city.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {whyOnline.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100"
              >
                <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Cost Comparison */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Cost Comparison: Online vs Kota/Delhi Relocation
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-yellow-300">Kota/Delhi Relocation</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Coaching Fees</span>
                    <span>Rs 1,50,000+</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Hostel (12 months)</span>
                    <span>Rs 1,00,000+</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Food & Living</span>
                    <span>Rs 60,000+</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Travel</span>
                    <span>Rs 20,000+</span>
                  </li>
                  <li className="flex justify-between font-bold text-lg border-t border-white/20 pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-red-300">Rs 3,30,000+</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-yellow-300">Cerebrum Online</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Coaching Fees</span>
                    <span>Rs 48,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Study at Home</span>
                    <span>Rs 0</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Family Food</span>
                    <span>Rs 0</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Internet</span>
                    <span>Rs 6,000</span>
                  </li>
                  <li className="flex justify-between font-bold text-lg border-t border-white/20 pt-2 mt-2">
                    <span>Total</span>
                    <span className="text-green-300">Rs 54,000</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-center mt-6 text-lg">
              Save <span className="font-bold text-yellow-300">Rs 2,76,000+</span> by choosing
              online coaching!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET Coaching in North India?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions - NEET Coaching North India
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from North India Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculties, 4,100+ North India students. No Kota
              migration required!
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
                <span>8 States Covered</span>
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
                <span>Save Rs 2.76 Lakhs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
