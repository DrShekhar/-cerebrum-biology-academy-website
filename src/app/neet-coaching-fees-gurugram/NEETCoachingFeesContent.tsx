'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  IndianRupee,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Percent,
  CreditCard,
  Gift,
  Calculator,
} from 'lucide-react'
import { useState } from 'react'
import { UrgencyBanner } from '@/components/landing-pages/UrgencyBanner'

interface FAQ {
  question: string
  answer: string
}

interface Props {
  faqs: FAQ[]
}

const feeComparison = [
  {
    institute: 'Cerebrum Biology Academy',
    highlight: true,
    class11Fee: '₹60,000 - ₹75,000',
    class12Fee: '₹70,000 - ₹85,000',
    dropperFee: '₹75,000 - ₹90,000',
    onlineFee: '₹45,000 - ₹55,000',
    batchSize: '15-20',
    subjects: 'Biology Only',
    scholarship: 'Up to 50%',
    emi: 'Yes (0% for 6 months)',
    highlights: ['AIIMS Faculty', '98% Success', 'Small Batches', 'Personalized Attention'],
  },
  {
    institute: 'Aakash Institute',
    highlight: false,
    class11Fee: '₹1,50,000 - ₹1,80,000',
    class12Fee: '₹1,60,000 - ₹2,00,000',
    dropperFee: '₹1,80,000 - ₹2,20,000',
    onlineFee: '₹80,000 - ₹1,20,000',
    batchSize: '60-100+',
    subjects: 'PCB (All)',
    scholarship: 'Via ANTHE Test',
    emi: 'Yes',
    highlights: ['All Subjects', 'Pan-India Network', 'Large Infrastructure'],
  },
  {
    institute: 'Allen Career Institute',
    highlight: false,
    class11Fee: '₹1,40,000 - ₹1,70,000',
    class12Fee: '₹1,50,000 - ₹1,90,000',
    dropperFee: '₹1,70,000 - ₹2,10,000',
    onlineFee: '₹70,000 - ₹1,00,000',
    batchSize: '60-80+',
    subjects: 'PCB (All)',
    scholarship: 'Via TALLENTEX',
    emi: 'Yes',
    highlights: ['Kota Brand', 'All Subjects', 'Study Material'],
  },
  {
    institute: 'FIITJEE',
    highlight: false,
    class11Fee: '₹1,60,000 - ₹2,00,000',
    class12Fee: '₹1,80,000 - ₹2,20,000',
    dropperFee: '₹2,00,000 - ₹2,50,000',
    onlineFee: '₹90,000 - ₹1,30,000',
    batchSize: '40-60',
    subjects: 'PCB (All)',
    scholarship: 'Via Admission Test',
    emi: 'Yes',
    highlights: ['JEE Focus (NEET secondary)', 'Premium Fees', 'IIT Brand'],
  },
  {
    institute: 'Narayana',
    highlight: false,
    class11Fee: '₹1,30,000 - ₹1,60,000',
    class12Fee: '₹1,40,000 - ₹1,80,000',
    dropperFee: '₹1,60,000 - ₹2,00,000',
    onlineFee: '₹60,000 - ₹90,000',
    batchSize: '50-80',
    subjects: 'PCB (All)',
    scholarship: 'Via Entrance Test',
    emi: 'Yes',
    highlights: ['South India Origin', 'All Subjects', 'Integrated Schools'],
  },
]

const savingsCalculation = [
  {
    program: 'Class 11 (2-Year)',
    cerebrumFee: 130000,
    competitorFee: 340000,
    savings: 210000,
    percentage: '62%',
  },
  {
    program: 'Class 12 (1-Year)',
    cerebrumFee: 75000,
    competitorFee: 180000,
    savings: 105000,
    percentage: '58%',
  },
  {
    program: 'Dropper Batch',
    cerebrumFee: 85000,
    competitorFee: 200000,
    savings: 115000,
    percentage: '57%',
  },
]

export default function NEETCoachingFeesContent({ faqs }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 px-4 py-2 rounded-full mb-6">
              <IndianRupee className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-200 text-sm font-medium">Fee Comparison 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              NEET Coaching Fees in Gurugram
            </h1>
            <p className="text-xl text-green-100 mb-6 max-w-3xl mx-auto">
              Compare fees of top NEET coaching institutes. Find the best value for your investment.
              Save up to 60% with quality coaching at Cerebrum.
            </p>
            <UrgencyBanner
              batchStartDate="Feb 10, 2026"
              seatsTotal={20}
              seatsFilled={16}
              showCountdown={true}
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Lowest Fee', value: '₹45,000/yr', icon: IndianRupee, color: 'green' },
              { label: 'Highest Fee', value: '₹2.5L/yr', icon: IndianRupee, color: 'red' },
              { label: 'Avg Scholarship', value: '20-50%', icon: Percent, color: 'blue' },
              { label: 'EMI Available', value: '0% Interest', icon: CreditCard, color: 'purple' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 text-${stat.color}-600`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Comparison Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fee Comparison: Top Institutes in Gurugram
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Detailed fee breakdown for Class 11, 12, and Dropper batches
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-4 text-left">Institute</th>
                  <th className="px-4 py-4 text-center">Class 11</th>
                  <th className="px-4 py-4 text-center">Class 12</th>
                  <th className="px-4 py-4 text-center">Dropper</th>
                  <th className="px-4 py-4 text-center">Online</th>
                  <th className="px-4 py-4 text-center">Batch Size</th>
                  <th className="px-4 py-4 text-center">Subjects</th>
                </tr>
              </thead>
              <tbody>
                {feeComparison.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      item.highlight
                        ? 'bg-green-50 border-green-200'
                        : index % 2 === 0
                          ? 'bg-white'
                          : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {item.highlight && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                            BEST VALUE
                          </span>
                        )}
                        <span className={`font-semibold ${item.highlight ? 'text-green-700' : 'text-gray-900'}`}>
                          {item.institute}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.highlights.slice(0, 2).map((h, i) => (
                          <span key={i} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-center font-medium ${item.highlight ? 'text-green-700' : ''}`}>
                      {item.class11Fee}
                    </td>
                    <td className={`px-4 py-4 text-center font-medium ${item.highlight ? 'text-green-700' : ''}`}>
                      {item.class12Fee}
                    </td>
                    <td className={`px-4 py-4 text-center font-medium ${item.highlight ? 'text-green-700' : ''}`}>
                      {item.dropperFee}
                    </td>
                    <td className={`px-4 py-4 text-center font-medium ${item.highlight ? 'text-green-700' : ''}`}>
                      {item.onlineFee}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${
                        parseInt(item.batchSize) <= 20
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.batchSize}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-sm">{item.subjects}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            * Fees are approximate and may vary. Contact institutes for exact current fees. Last updated: Jan 2026
          </p>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <Calculator className="inline w-8 h-8 mr-2 text-green-600" />
              Your Savings with Cerebrum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how much you save compared to premium institutes - without compromising on quality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {savingsCalculation.map((calc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4">{calc.program}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Competitor Fee (avg)</span>
                    <span className="text-red-600 font-medium">₹{calc.competitorFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cerebrum Fee</span>
                    <span className="text-green-600 font-medium">₹{calc.cerebrumFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">You Save</span>
                    <span className="text-green-600 font-bold text-xl">
                      ₹{calc.savings.toLocaleString()} ({calc.percentage})
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lower Fees */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Offer Lower Fees Without Compromising Quality
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Biology Focus Only',
                description: 'We specialize in Biology, not all subjects. This focus allows expert faculty and lower overhead.',
              },
              {
                icon: Users,
                title: 'Small Batches',
                description: '15-20 students vs 60-100+. Fewer students = less infrastructure needed, lower costs passed to you.',
              },
              {
                icon: Gift,
                title: 'No Fancy Marketing',
                description: 'No celebrity ads, no mall showrooms. We invest in faculty and material, not marketing.',
              },
              {
                icon: Award,
                title: 'Results Speak',
                description: '98% success rate with 15+ years track record. Quality teaching, not expensive branding.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <Percent className="inline w-8 h-8 mr-2" />
                Scholarships Available
              </h2>
              <p className="text-blue-100 mb-6">
                We believe financial constraints should not stop deserving students. Our merit-based
                scholarships help reduce your fees further.
              </p>
              <ul className="space-y-4">
                {[
                  'Up to 50% scholarship based on school marks',
                  'Additional 10% for NTSE/Olympiad qualifiers',
                  'Sibling discount: 10% off for second child',
                  'Early bird discount: 10% for admissions before March',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Scholarship Eligibility</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>90%+ in Class 10/11</span>
                  <span className="bg-green-500 px-3 py-1 rounded text-sm font-bold">50% OFF</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>80-90% in Class 10/11</span>
                  <span className="bg-green-500 px-3 py-1 rounded text-sm font-bold">30% OFF</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span>70-80% in Class 10/11</span>
                  <span className="bg-green-500 px-3 py-1 rounded text-sm font-bold">20% OFF</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Entrance Test Score</span>
                  <span className="bg-blue-500 px-3 py-1 rounded text-sm font-bold">Up to 30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions About Fees
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get Detailed Fee Structure & Scholarship Info
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Contact us for personalized fee calculation based on your eligibility
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20know%20about%20NEET%20coaching%20fees%20and%20scholarship%20options."
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Get Fee Details on WhatsApp
            </Link>
            <Link
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-900 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call: 88264-44334
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Related Pages</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'Best NEET Coaching Gurugram', url: '/best-neet-coaching-gurugram' },
              { name: 'Affordable NEET Coaching', url: '/affordable-neet-coaching-gurugram' },
              { name: 'NEET Coaching Near Me', url: '/neet-coaching-near-me-gurugram' },
              { name: 'Online NEET Classes', url: '/online-neet-classes-gurugram' },
              { name: 'NEET Study Material', url: '/neet-study-material-gurugram' },
              { name: 'NEET Dropper Batch', url: '/neet-droppers-batch-gurgaon' },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="bg-white px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors shadow-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
