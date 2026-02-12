'use client'

import { motion } from 'framer-motion'
import {
  Stethoscope,
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
  MapPin,
  Play,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const medicalExams = [
  {
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    description: 'The primary entrance exam for MBBS, BDS, BAMS, BHMS in India',
    students: '1,200+',
  },
  {
    name: 'AIIMS',
    fullName: 'All India Institute of Medical Sciences',
    description: 'Now merged with NEET, preparation covers all AIIMS-level concepts',
    students: '400+',
  },
  {
    name: 'JIPMER',
    fullName: 'Jawaharlal Institute of Postgraduate Medical Education',
    description: 'Merged with NEET, our teaching includes JIPMER-pattern questions',
    students: '200+',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution, not pre-recorded videos',
  },
  {
    icon: Users,
    title: 'Small Batches (15-20)',
    description: 'Personal attention for every medical aspirant, unlike 200+ batch sizes',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert doctors and teachers trained at premier medical institutions',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, mock tests included',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to fit your schedule',
  },
  {
    icon: Shield,
    title: 'Study from Home',
    description: 'No need to relocate - get quality coaching from your city',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score 2024', value: '695', icon: Star },
  { label: 'Medical Selections', value: '500+', icon: GraduationCap },
  { label: 'States Covered', value: '25+', icon: MapPin },
]

const faqs = [
  {
    question: 'Which medical entrance exams can I prepare for?',
    answer:
      'Our coaching prepares you for NEET (which now includes AIIMS and JIPMER patterns). NEET is the single entrance exam for all medical colleges in India - government and private MBBS, BDS, BAMS, BHMS programs.',
  },
  {
    question: 'How is online medical coaching effective?',
    answer:
      'Our 98% success rate proves online coaching is MORE effective than traditional methods. Live interactive classes, small batches (15-20), instant doubt resolution, and recorded lectures for revision give better results.',
  },
  {
    question: 'What subjects do you cover?',
    answer:
      'We specialize in Biology (Zoology + Botany) which is 50% of NEET. Our comprehensive coverage includes Physics and Chemistry concepts integrated with Biology topics. Focus on Biology gives maximum marks improvement.',
  },
  {
    question: 'Can I join from any city in India?',
    answer:
      'Yes! Our online medical entrance coaching is available pan-India. We have students from 25+ states including Rajasthan, UP, Maharashtra, Karnataka, Tamil Nadu, Gujarat, Kerala, Delhi NCR, and more.',
  },
  {
    question: 'What is the fee for medical entrance coaching?',
    answer:
      'Our complete program ranges from ₹45,000 to ₹1,56,000 per year depending on course and tier. Class 9-10: ₹45,000-₹90,000, Class 11: ₹48,000-₹98,000, Class 12/Dropper: ₹70,000-₹1,56,000. All include study materials, mock tests, and doubt sessions.',
  },
]

const statesCovered = [
  'Rajasthan',
  'Uttar Pradesh',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Gujarat',
  'Kerala',
  'Delhi NCR',
  'Telangana',
  'West Bengal',
  'Madhya Pradesh',
  'Bihar',
  'Punjab',
  'Haryana',
  'Andhra Pradesh',
]

export default function OnlineMedicalCoachingIndiaPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_medical_india', {
        event_category: 'conversion',
        event_label: 'online_medical_coaching_india_page',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-cyan-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Stethoscope className="w-5 h-5 mr-2" />
              Your Path to MBBS Starts Here
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Online <span className="text-yellow-300">Medical Entrance Coaching</span> India
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              NEET • AIIMS • JIPMER Preparation • 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Prepare for medical entrance exams from home. Expert AIIMS trained faculty, live
              interactive classes, proven methodology. Join 1,50,000+ students from 25+ Indian states
              pursuing their MBBS dream.
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
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View All Programs
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

      {/* Medical Exams Section */}
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
              Medical Entrance Exams We Cover
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive preparation for all major medical entrance examinations in India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {medicalExams.map((exam, index) => (
              <motion.div
                key={exam.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-10 h-10 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{exam.name}</h3>
                    <div className="text-green-600 font-semibold">{exam.students} Students</div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-3">{exam.fullName}</p>
                <p className="text-gray-700">{exam.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose Our Medical Coaching?
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
                className="bg-gray-50 rounded-xl p-8"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* States Coverage Section */}
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
              Pan-India Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Students from 25+ states trust our online medical coaching.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {statesCovered.map((state, index) => (
              <motion.span
                key={state}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
              >
                {state}
              </motion.span>
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
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your Journey to MBBS Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculty, affordable fees. Your MBBS dream is within
              reach!
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
                <span>NEET + AIIMS + JIPMER</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Live Classes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>25+ States</span>
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
