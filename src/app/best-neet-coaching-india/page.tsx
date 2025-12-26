'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Shield,
  Target,
  MapPin,
  Play,
  ArrowRight,
  MessageCircle,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const comparisonData = [
  {
    institute: 'Cerebrum Academy',
    successRate: '98%',
    batchSize: '15-20',
    fees: '₹45,000-₹1,56,000',
    highlight: true,
  },
  { institute: 'Allen Career', successRate: '65%', batchSize: '200-400', fees: '₹1,50,000+' },
  { institute: 'Aakash Institute', successRate: '62%', batchSize: '150-300', fees: '₹1,40,000+' },
  {
    institute: 'Kota Coaching',
    successRate: '60%',
    batchSize: '200-500',
    fees: '₹2,50,000+ (total)',
  },
]

const majorCities = [
  { city: 'Delhi NCR', areas: 'Laxmi Nagar, Dwarka, Noida, Gurgaon', students: '800+' },
  { city: 'Mumbai', areas: 'Andheri, Thane, Borivali', students: '320+' },
  { city: 'Bangalore', areas: 'Koramangala, Indiranagar, Whitefield', students: '280+' },
  { city: 'Hyderabad', areas: 'Ameerpet, Kukatpally, HITEC City', students: '260+' },
  { city: 'Chennai', areas: 'T. Nagar, Anna Nagar, Velachery', students: '240+' },
  { city: 'Kolkata', areas: 'Salt Lake, Ballygunge, Howrah', students: '180+' },
  { city: 'Pune', areas: 'Kothrud, Hinjewadi, Shivaji Nagar', students: '160+' },
  { city: 'Jaipur', areas: 'Vaishali Nagar, Mansarovar, C-Scheme', students: '150+' },
]

const whyChooseUs = [
  {
    icon: Trophy,
    title: '98% Success Rate',
    description: 'Highest success rate among all NEET coaching institutes in India',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Only 15-20 students per batch for maximum personal attention',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert teachers with 15+ years experience from top medical institutions',
  },
  {
    icon: Target,
    title: 'Proven Results',
    description: 'Top scorer 695 marks, 100+ students in top 10,000 AIR every year',
  },
  {
    icon: Shield,
    title: 'Safe Learning',
    description: 'Study from home - no need to relocate to Kota or other cities',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Morning, afternoon, and evening batches to suit your routine',
  },
]

const faqs = [
  {
    question: 'Which is the best NEET coaching in India?',
    answer:
      'Cerebrum Biology Academy is ranked among the best NEET coaching institutes in India with a 98% success rate, highest in the industry. Unlike large institutes like Allen or Aakash with batch sizes of 200-400, we maintain small batches of 15-20 students for personalized attention.',
  },
  {
    question: 'How does Cerebrum compare with Kota coaching?',
    answer:
      'While Kota coaching costs ₹2.5L+ annually (including fees, accommodation, food), Cerebrum offers the same quality at ₹45,000-₹1,56,000. Our success rate (98%) is higher than Kota average (60%), and students stay safe at home.',
  },
  {
    question: 'Is online coaching as effective as classroom coaching?',
    answer:
      'Our results prove online coaching is MORE effective. With smaller batches, instant doubt resolution, and personalized attention, our students consistently outperform those from large classroom institutes. Plus, no time wasted in commuting.',
  },
  {
    question: 'What is the fee structure for NEET coaching?',
    answer:
      'Our NEET Biology courses range from ₹45,000 to ₹1,56,000 per year depending on the program and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12: ₹70,000-₹1,56,000.',
  },
]

export default function BestNeetCoachingIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_best_india', {
        event_category: 'conversion',
        event_label: 'best_neet_coaching_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-700 to-green-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Trophy className="w-5 h-5 mr-2" />
              #1 Ranked NEET Coaching Institute in India
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching</span> in India 2025
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              98% Success Rate • AIIMS Trained Faculty • 2,500+ Students
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Compare with Allen, Aakash, Kota coaching - see why students from Delhi NCR, Mumbai,
              Bangalore, Hyderabad, Chennai choose Cerebrum Academy for NEET preparation.
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

              <Link href="/compare/kota-vs-online">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-900"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Compare with Kota
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">695</div>
                <div className="text-sm opacity-80">Top Score 2024</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm opacity-80">Students</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <MapPin className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">25+</div>
                <div className="text-sm opacity-80">States Covered</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table Section */}
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
              Compare Top NEET Coaching Institutes in India
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Data-driven comparison of success rates, batch sizes, and fees across leading
              institutes.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <th className="px-6 py-4 text-left font-bold">Institute</th>
                    <th className="px-6 py-4 text-center font-bold">Success Rate</th>
                    <th className="px-6 py-4 text-center font-bold">Batch Size</th>
                    <th className="px-6 py-4 text-center font-bold">Annual Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.institute}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`border-b border-gray-200 ${row.highlight ? 'bg-green-50' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {row.highlight && <Trophy className="w-5 h-5 mr-2 text-yellow-500" />}
                          <span
                            className={`font-semibold ${row.highlight ? 'text-green-700' : 'text-gray-900'}`}
                          >
                            {row.institute}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-center font-bold ${row.highlight ? 'text-green-600' : 'text-gray-700'}`}
                      >
                        {row.successRate}
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${row.highlight ? 'text-green-600' : 'text-gray-700'}`}
                      >
                        {row.batchSize}
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${row.highlight ? 'text-green-600 font-bold' : 'text-gray-700'}`}
                      >
                        {row.fees}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
              Why Cerebrum is India's Best NEET Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <item.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Coverage Section */}
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
              Students from Major Indian Cities
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {majorCities.map((city, index) => (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{city.city}</h3>
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">{city.students}</div>
                <div className="text-sm text-gray-500">{city.areas}</div>
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
              Frequently Asked Questions
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
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join India's Best NEET Coaching Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculty, affordable fees. Start your journey to MBBS!
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
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Small Batches</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Affordable Fees</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
