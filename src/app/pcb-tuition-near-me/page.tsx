'use client'

import { motion } from 'framer-motion'
import {
  Users,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  Brain,
  Award,
  FileText,
  TrendingUp,
  Atom,
  FlaskConical,
  Microscope,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const pcbSubjects = [
  {
    subject: 'Physics',
    icon: Atom,
    neetMarks: '180',
    description: 'Mechanics, Optics, Modern Physics, Electromagnetism',
    color: 'bg-blue-100 border-blue-400 text-blue-800',
    iconColor: 'text-blue-600',
  },
  {
    subject: 'Chemistry',
    icon: FlaskConical,
    neetMarks: '180',
    description: 'Organic, Inorganic, Physical Chemistry',
    color: 'bg-orange-100 border-orange-400 text-orange-800',
    iconColor: 'text-orange-600',
  },
  {
    subject: 'Biology',
    icon: Microscope,
    neetMarks: '360',
    description: 'Botany, Zoology, Human Physiology, Genetics',
    color: 'bg-green-100 border-green-400 text-green-800',
    iconColor: 'text-green-600',
  },
]

const tuitionFeatures = [
  {
    icon: Brain,
    title: 'Expert Faculty for All 3 Subjects',
    description:
      'AIIMS doctors for Biology, IIT graduates for Physics & Chemistry. Best-in-class teaching.',
  },
  {
    icon: Target,
    title: 'NEET-Focused Integrated Curriculum',
    description: 'All three subjects taught with NEET pattern and board exam requirements in mind.',
  },
  {
    icon: Users,
    title: 'Small Batch PCB Classes',
    description: 'Limited to 15-20 students for personalized attention in all three subjects.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Study Materials',
    description: 'Complete notes, DPPs, and test series for Physics, Chemistry, and Biology.',
  },
  {
    icon: Video,
    title: 'Integrated Online Classes',
    description: 'Live interactive sessions for all PCB subjects. Attend from anywhere.',
  },
  {
    icon: TrendingUp,
    title: 'Combined Performance Tracking',
    description:
      'Track progress across all subjects with detailed analytics and improvement plans.',
  },
]

const locations = [
  'Delhi',
  'Noida',
  'Gurgaon',
  'Ghaziabad',
  'Faridabad',
  'Greater Noida',
  'Rohini',
  'Dwarka',
  'South Delhi',
  'East Delhi',
]

const credentials = [
  { label: 'Faculty', value: 'AIIMS/IIT' },
  { label: 'Experience', value: '15+ Years' },
  { label: 'Students', value: '10,000+' },
  { label: 'NEET Selections', value: '2,500+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'All 3 Subjects', value: 'PCB' },
]

const faqs = [
  {
    question: 'Do you offer tuition for all three PCB subjects?',
    answer:
      'Yes! We offer comprehensive tuition for Physics, Chemistry, and Biology - all three subjects essential for NEET. While our specialty is Biology (taught by AIIMS doctors), we have expert IIT faculty for Physics and Chemistry as well.',
  },
  {
    question: 'Can I take only Biology tuition or do I need to enroll for all PCB?',
    answer:
      'You can choose! We offer both options - Biology-only courses as well as complete PCB packages. Many students opt for our Biology course while taking Physics/Chemistry elsewhere. However, our integrated PCB package offers better value and coordinated preparation.',
  },
  {
    question: 'What are the class timings for PCB tuition?',
    answer:
      'We have multiple batches to accommodate different schedules. Weekday evening batches (5-8 PM covering one subject per day), Weekend intensive batches (covering all subjects), and integrated daily batches for droppers.',
  },
  {
    question: 'Is online PCB tuition effective?',
    answer:
      'Absolutely! Our online PCB tuition features live interactive classes with separate sessions for each subject, recorded lectures for revision, digital practice tests, and 24/7 doubt support via WhatsApp. Students from across India have achieved excellent NEET scores through our online program.',
  },
]

export default function PcbTuitionNearMePage() {
  const [userLocation, setUserLocation] = useState<string>('')

  useEffect(() => {
    const saved = localStorage.getItem('userLocation')
    if (saved) {
      setUserLocation(saved)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-900 via-yellow-800 to-yellow-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              PCB Tuition {userLocation ? `in ${userLocation}` : 'Near You'}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">PCB Tuition</span> Near Me
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Physics + Chemistry + Biology | Complete NEET Preparation
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Looking for quality PCB tuition near you? Get expert coaching for Physics, Chemistry,
              and Biology from AIIMS doctors and IIT faculty. Perfect for NEET aspirants across
              Delhi NCR and beyond!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
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
                  View PCB Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">{cred.value}</div>
                  <div className="text-xs opacity-80">{cred.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PCB Subjects Overview */}
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
              Complete PCB for NEET (720 Marks)
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert coaching for all three subjects. Biology carries the highest weightage!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pcbSubjects.map((subject, index) => (
              <motion.div
                key={subject.subject}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl p-8 border-2 ${subject.color} shadow-lg`}
              >
                <subject.icon className={`w-16 h-16 ${subject.iconColor} mb-4`} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{subject.subject}</h3>
                <div className="text-3xl font-bold mb-2">{subject.neetMarks} Marks</div>
                <p className="text-gray-700">{subject.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations We Serve */}
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
              PCB Tuition Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Offline centers in Delhi NCR + Online classes for students everywhere
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-orange-50 border border-orange-200 rounded-lg px-6 py-3 flex items-center"
              >
                <MapPin className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-gray-800 font-medium">{location}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Not in Delhi NCR? Our <strong>online PCB tuition</strong> serves students across India
              and abroad!
            </p>
          </div>
        </div>
      </section>

      {/* Why Our PCB Tuition */}
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
              Why Choose Our PCB Tuition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrated preparation for all three subjects with expert faculty
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tuitionFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete PCB Package
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Live Classes - All 3 Subjects',
              'Recorded Lecture Access',
              'Comprehensive Notes',
              'Subject-wise DPPs',
              'Chapter Tests',
              'Full Mock Tests',
              'NEET PYQs Analysis',
              '24/7 Doubt Support',
              'Performance Analytics',
              'Board Exam Prep',
              'NEET Strategy Sessions',
              'Mentorship Support',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
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
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-orange-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-yellow-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your PCB Journey Today</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Complete NEET preparation with expert coaching in Physics, Chemistry & Biology!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-white text-orange-700 hover:bg-gray-100"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
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
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-tuition-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tuition Near Me
            </Link>
            <Link
              href="/biology-neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
            </Link>
            <Link
              href="/biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Classes
            </Link>
            <Link
              href="/biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
