'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  MapPin,
  Users,
  CheckCircle2,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Building,
  Globe,
  Phone,
  Clock,
  Navigation,
  Shield,
  Sparkles,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  LocationIllustration,
  OnlineClassIllustration,
} from '@/components/illustrations/SEOIllustrations'

const offlineCenters = [
  {
    name: 'Rohini Center',
    address: 'Sector 7, Rohini, Delhi - 110085',
    landmark: 'Near Rohini West Metro Station',
    timing: 'Mon-Sat: 8 AM - 8 PM',
    phone: '+91 88264 44334',
    highlight: true,
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    name: 'Gurugram Center',
    address: 'Sector 14, Gurugram, Haryana',
    landmark: 'Near HUDA City Centre',
    timing: 'Mon-Sat: 8 AM - 8 PM',
    phone: '+91 88264 44334',
    highlight: false,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    name: 'South Extension Center',
    address: 'South Extension Part 2, Delhi',
    landmark: 'Near South Ex Metro',
    timing: 'Mon-Sat: 9 AM - 7 PM',
    phone: '+91 88264 44334',
    highlight: false,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    name: 'Faridabad Center',
    address: 'Sector 15, Faridabad, Haryana',
    landmark: 'Near Badkhal Chowk',
    timing: 'Mon-Sat: 8 AM - 8 PM',
    phone: '+91 88264 44334',
    highlight: false,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
]

const onlineFeatures = [
  {
    icon: Users,
    title: 'Same AIIMS-Trained Faculty',
    description: 'Learn from the exact same teachers as offline students',
  },
  {
    icon: Video,
    title: 'Live Interactive Sessions',
    description: 'Real-time classes, not recorded videos',
  },
  {
    icon: GraduationCap,
    title: 'Small Batches (15-20)',
    description: 'Personal attention for every student',
  },
  {
    icon: MessageCircle,
    title: '24/7 WhatsApp Support',
    description: 'Instant doubt resolution anytime',
  },
]

const faqs = [
  {
    question: 'Which is the best center to join?',
    answer:
      'All our centers have the same quality of teaching and faculty. Choose the one nearest to your location. Rohini is our flagship center with the highest student strength.',
  },
  {
    question: 'Is online teaching as effective as offline?',
    answer:
      'Our online teaching is highly effective with live interactive sessions, the same faculty, and small batches. Many online students have secured top NEET ranks. Choose based on your preference and commute convenience.',
  },
  {
    question: 'Can I switch between online and offline?',
    answer:
      'Yes, we offer hybrid options. You can attend offline when convenient and switch to online when needed. This flexibility is especially helpful during exam times.',
  },
  {
    question: 'Do you have centers outside Delhi NCR?',
    answer:
      'Currently, our offline centers are only in Delhi NCR. However, students from all over India and abroad join our online batches with excellent results.',
  },
]

const stats = [
  { value: '4', label: 'Centers', sublabel: 'Delhi NCR' },
  { value: '15+', label: 'States', sublabel: 'Online Students' },
  { value: '98%', label: 'Success', sublabel: 'NEET 2024' },
  { value: '500+', label: 'Students', sublabel: 'Online Batch' },
]

export default function BiologyTeacherNearMePage() {
  const [isInDelhiNCR, setIsInDelhiNCR] = useState<boolean | null>(null)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    const savedLocation = localStorage.getItem('userInDelhiNCR')
    if (savedLocation !== null) {
      setIsInDelhiNCR(savedLocation === 'true')
    } else {
      setShowLocationModal(true)
    }
  }, [])

  const handleLocationSelect = (inDelhi: boolean) => {
    setIsInDelhiNCR(inDelhi)
    localStorage.setItem('userInDelhiNCR', String(inDelhi))
    setShowLocationModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Location Modal - Premium Design */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Where are you located?
            </h3>
            <p className="text-gray-500 text-center mb-8">
              This helps us show you the most relevant options
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleLocationSelect(true)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <Building className="w-5 h-5" />
                Delhi NCR (can attend offline)
              </button>
              <button
                onClick={() => handleLocationSelect(false)}
                className="w-full py-4 bg-gray-100 text-gray-900 rounded-2xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-3"
              >
                <Globe className="w-5 h-5" />
                Outside Delhi NCR (online only)
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section - Premium Gradient Design */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                <Shield className="w-4 h-4 mr-2 text-yellow-300" />
                Trusted by 5,000+ NEET aspirants
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Biology Teacher <span className="text-yellow-300">Near Me</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
                4 Offline Centers in Delhi NCR
              </p>
              <p className="text-lg text-white/70 mb-8">
                {isInDelhiNCR === true
                  ? 'Great! Visit our nearest center for in-person classes.'
                  : isInDelhiNCR === false
                    ? 'Join online from anywhere - same faculty, same results!'
                    : 'Find biology coaching near you or join online from anywhere.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/demo-booking">
                  <Button
                    size="xl"
                    className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Book Free Demo
                  </Button>
                </Link>

                <button
                  onClick={() => setShowLocationModal(true)}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Change Location
                </button>
              </div>

              {/* Stats Grid - Glassmorphism */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
                  >
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/90 font-medium">{stat.label}</div>
                    <div className="text-xs text-white/60">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <LocationIllustration className="w-full max-w-lg mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offline Centers - Premium Cards */}
      {isInDelhiNCR !== false && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4 mr-2" />4 Centers in Delhi NCR
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Offline Centers
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Visit any of our centers for in-person biology coaching
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {offlineCenters.map((center, index) => (
                <motion.div
                  key={center.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative rounded-3xl p-8 ${center.bgColor} border ${center.borderColor} hover:shadow-xl transition-all duration-300 group`}
                >
                  {center.highlight && (
                    <div className="absolute -top-3 left-6">
                      <span className="inline-flex items-center bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs px-4 py-1.5 rounded-full font-semibold shadow-lg">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Flagship Center
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-2xl ${center.iconBg}`}>
                      <Building className={`w-6 h-6 ${center.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{center.name}</h3>
                      <p className="text-gray-600">{center.landmark}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className={`w-5 h-5 ${center.iconColor}`} />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className={`w-5 h-5 ${center.iconColor}`} />
                      <span>{center.timing}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone className={`w-5 h-5 ${center.iconColor}`} />
                      <a
                        href={`tel:${center.phone.replace(/\s/g, '')}`}
                        className="hover:underline"
                      >
                        {center.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href="/demo-booking" className="flex-1">
                      <Button
                        className={`w-full bg-gradient-to-r ${center.color} text-white hover:shadow-lg`}
                      >
                        Book Visit
                      </Button>
                    </Link>
                    <a
                      href={`tel:${center.phone.replace(/\s/g, '')}`}
                      className={`p-3 rounded-xl ${center.iconBg} hover:scale-105 transition-transform`}
                    >
                      <Phone className={`w-5 h-5 ${center.iconColor}`} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Online Classes Section - Feature Cards */}
      <section className={`py-20 ${isInDelhiNCR === false ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4 mr-2" />
                Pan-India Online Classes
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                {isInDelhiNCR === false
                  ? 'Learn Online from Anywhere'
                  : 'Online Classes Also Available'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {isInDelhiNCR === false
                  ? 'Get the same quality teaching from the comfort of your home'
                  : 'Prefer learning from home? Join our online batches'}
              </p>

              {/* Feature Cards - Green accent like mock-tests page */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {onlineFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-50 rounded-xl">
                        <feature.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/demo-booking">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <Video className="w-5 h-5 mr-2" />
                  Try Free Online Demo
                </Button>
              </Link>
            </motion.div>

            {/* Right - Illustration + Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <OnlineClassIllustration className="w-full max-w-md mx-auto mb-8" />

              {/* Student Count Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white">
                <Globe className="w-12 h-12 mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-3">Students from 15+ States</h3>
                <p className="text-emerald-100 mb-6">
                  Maharashtra, Karnataka, Tamil Nadu, Kerala, Gujarat, Rajasthan, UP, Bihar, West
                  Bengal and more. Plus NRI students from UAE, USA, UK!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-emerald-100">Online Students</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-sm text-emerald-100">Success Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Online vs Offline: What's Best for You?
            </h2>
          </motion.div>

          <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="p-6 font-semibold">Feature</div>
              <div className="p-6 font-semibold text-center border-x border-white/20">Offline</div>
              <div className="p-6 font-semibold text-center">Online</div>
            </div>
            {[
              { feature: 'Faculty Quality', offline: 'AIIMS Alumni', online: 'Same Faculty' },
              { feature: 'Batch Size', offline: '30-40 students', online: '15-20 students' },
              { feature: 'Doubt Resolution', offline: 'In-class', online: '24/7 WhatsApp' },
              { feature: 'Flexibility', offline: 'Fixed timing', online: 'Recorded backup' },
              {
                feature: 'Study Material',
                offline: 'Physical books',
                online: 'Digital + Physical',
              },
              { feature: 'Cost', offline: 'Standard', online: '20% lower' },
            ].map((row, index) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="p-5 font-medium text-gray-900">{row.feature}</div>
                <div className="p-5 text-center text-gray-700 border-x border-gray-200">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {row.offline}
                  </div>
                </div>
                <div className="p-5 text-center text-gray-700">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {row.online}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section - Accordion Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Gradient */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {isInDelhiNCR
                ? 'Visit our nearest center or join online - your choice!'
                : "Join our online batches and learn from India's best biology faculty!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  size="xl"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold shadow-xl hover:shadow-2xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/biology-teacher', label: 'Biology Teacher' },
              { href: '/best-biology-teacher-for-neet', label: 'Best Biology Teacher for NEET' },
              { href: '/biology-tutors-near-me', label: 'Biology Tutors Near Me' },
              { href: '/online-biology-classes', label: 'Online Biology Classes' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full text-gray-700 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
