'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Clock,
  Users,
  CheckCircle,
  Star,
  Play,
  Calendar,
  Brain,
  Zap,
  Trophy,
  ArrowRight,
  FileText,
  Video,
  HelpCircle,
  Download,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToppersShowcase } from '@/components/layout/NEETToppersShowcase'
import { ParentTestimonialsSection } from '@/components/layout/ParentTestimonialsSection'
import Link from 'next/link'

export default function NEET2026PreparationPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_neet2026', {
        event_category: 'conversion',
        event_label: 'neet_2026_landing_page',
        value: 1,
      })
    }
    window.location.href = '/demo-booking'
  }

  const neet2026Highlights = [
    {
      title: 'Updated Syllabus Coverage',
      description: 'Complete NEET 2026 syllabus with latest NTA patterns and NCERT-based approach',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'AI-Powered Learning',
      description: 'Personalized study plans and adaptive mock tests for targeted preparation',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: '500+ NEET Selections',
      description: '98% success rate with 500+ students in top medical colleges yearly',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'AIIMS Faculty',
      description: 'Learn from ex-AIIMS doctors and NEET biology experts with 15+ years experience',
      icon: Award,
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  const neet2026Timeline = [
    { event: 'Start Early Preparation', date: 'Now - Dec 2025', status: 'active' },
    { event: 'Complete Syllabus', date: 'Jan - Jun 2026', status: 'upcoming' },
    { event: 'NEET 2026 Registration', date: 'Expected Feb 2026', status: 'upcoming' },
    { event: 'Revision & Mock Tests', date: 'Mar - Apr 2026', status: 'upcoming' },
    { event: 'NEET 2026 Exam Date', date: 'Expected May 2026', status: 'exam' },
    { event: 'Result & Counselling', date: 'Jun - Jul 2026', status: 'upcoming' },
  ]

  const neet2026Batches = [
    {
      name: 'Class 11 Foundation (2025-26)',
      target: 'NEET 2027',
      duration: '2 Years',
      features: ['Board + NEET integrated', 'Strong foundation building', 'Early bird advantage'],
      price: '₹48,000/year',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Class 12 Intensive (2025-26)',
      target: 'NEET 2026',
      duration: '1 Year',
      features: ['Complete syllabus coverage', '100+ mock tests', 'Daily doubt sessions'],
      price: '₹65,000/year',
      color: 'from-purple-500 to-indigo-500',
      popular: true,
    },
    {
      name: 'Dropper Batch (2025-26)',
      target: 'NEET 2026',
      duration: '10 Months',
      features: ['Focused preparation', 'Weakness analysis', 'Mental conditioning'],
      price: '₹55,000/year',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Early Bird Batch',
      target: 'NEET 2026',
      duration: '18 Months',
      features: ['Extra time for preparation', 'Thorough concept building', 'Multiple revisions'],
      price: '₹75,000',
      color: 'from-green-500 to-teal-500',
    },
  ]

  const neet2026FAQs = [
    {
      question: 'When is NEET 2026 exam date?',
      answer:
        'NEET 2026 is expected to be conducted in May 2026 (tentatively first Sunday of May). NTA will release the official notification around December 2025 or January 2026.',
    },
    {
      question: 'What is the syllabus for NEET 2026?',
      answer:
        'NEET 2026 syllabus covers Physics, Chemistry, and Biology from Class 11 and 12 NCERT. Biology has 90 questions (360 marks) - highest weightage. The syllabus is expected to remain based on NCERT.',
    },
    {
      question: 'How to prepare for NEET 2026 Biology?',
      answer:
        'Focus on NCERT thoroughly, practice MCQs daily, take mock tests regularly, master diagrams, and understand concepts rather than rote learning. Start early with Class 11 concepts for strong foundation.',
    },
    {
      question: 'Is online coaching effective for NEET 2026?',
      answer:
        'Yes! Online coaching offers flexibility, recorded lectures for revision, AI-powered doubt solving, and personalized learning paths. Our hybrid model combines best of both online and offline learning.',
    },
    {
      question: 'What is the expected cut-off for NEET 2026?',
      answer:
        'Based on trends, General category may need 620+ for top government medical colleges. Our students typically score 600-680+ with dedicated preparation and our structured approach.',
    },
    {
      question: 'When should I start preparing for NEET 2026?',
      answer:
        'The best time to start is NOW! Starting early in Class 11 gives you 2 full years for comprehensive preparation. Even if you are in Class 12, starting immediately gives you 5-6 months of focused study.',
    },
  ]

  const successMetrics = [
    { label: '98%', sublabel: 'Success Rate', icon: Trophy },
    { label: '500+', sublabel: 'Selections Yearly', icon: Users },
    { label: '650+', sublabel: 'Avg Top Score', icon: Star },
    { label: '15+', sublabel: 'Years Experience', icon: Award },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Urgency Banner */}
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center flex-wrap gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold">NEET 2026 Preparation - Start Early, Score Higher!</span>
              <span className="hidden sm:inline">|</span>
              <span>New batch starting - Limited seats!</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
                <Target className="w-5 h-5 mr-2" />
                #1 NEET Biology Coaching for 2026
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                NEET 2026 <span className="text-yellow-300">Preparation</span>
                <br />
                <span className="text-3xl md:text-4xl">Your Medical Dream Starts Here</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Join India's top NEET Biology coaching with 98% success rate. Expert AIIMS faculty,
                AI-powered learning, and proven results. Get a head start for NEET 2026!
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {successMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3"
                  >
                    <metric.icon className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
                    <div className="text-2xl font-bold">{metric.label}</div>
                    <div className="text-xs opacity-80">{metric.sublabel}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book FREE Demo Class
                </Button>

                <Link href="/courses">
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-white text-white hover:bg-white hover:text-blue-600 w-full"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* NEET 2026 Timeline Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  NEET 2026 Preparation Timeline
                </h3>

                <div className="space-y-4">
                  {neet2026Timeline.map((item, index) => (
                    <motion.div
                      key={item.event}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        item.status === 'exam'
                          ? 'bg-yellow-500/20'
                          : item.status === 'active'
                            ? 'bg-green-500/20'
                            : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center">
                        <Calendar
                          className={`w-5 h-5 mr-3 ${
                            item.status === 'exam'
                              ? 'text-yellow-300'
                              : item.status === 'active'
                                ? 'text-green-300'
                                : 'text-blue-300'
                          }`}
                        />
                        <span className="text-sm font-medium">{item.event}</span>
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          item.status === 'exam'
                            ? 'text-yellow-300'
                            : item.status === 'active'
                              ? 'text-green-300'
                              : ''
                        }`}
                      >
                        {item.date}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-500/20 rounded-lg text-center">
                  <p className="text-sm font-medium">Start NOW for maximum preparation time!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Cerebrum for NEET 2026?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India's most trusted NEET Biology coaching with proven track record of 500+ medical
              selections annually.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {neet2026Highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${highlight.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <highlight.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET 2026 Batches */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              NEET 2026 Course Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right batch based on your current class and preparation level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neet2026Batches.map((batch, index) => (
              <motion.div
                key={batch.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-lg p-6 border-2 ${
                  batch.popular ? 'border-purple-500' : 'border-gray-100'
                } hover:shadow-xl transition-shadow`}
              >
                {batch.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`w-12 h-12 bg-gradient-to-r ${batch.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{batch.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                    {batch.target}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {batch.duration}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {batch.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="text-2xl font-bold text-gray-900 mb-4">{batch.price}</div>

                <Button
                  variant={batch.popular ? 'primary' : 'outline'}
                  size="sm"
                  className="w-full"
                  onClick={handleDemoBooking}
                >
                  Enroll Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">NEET 2026 FAQs</h2>
            <p className="text-xl text-gray-600">
              Common questions about NEET 2026 preparation answered by experts
            </p>
          </motion.div>

          <div className="space-y-4">
            {neet2026FAQs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Toppers */}
      <NEETToppersShowcase maxToppers={6} showVideos={true} />

      {/* Parent Testimonials */}
      <ParentTestimonialsSection />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your NEET 2026 Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 500+ students who crack NEET every year with Cerebrum Biology Academy. Expert
              faculty, proven methodology, and personalized attention await you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="secondary"
                size="xl"
                onClick={handleDemoBooking}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                <Play className="w-5 h-5 mr-2" />
                Book FREE Demo Class
              </Button>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-600 w-full"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <p className="text-sm opacity-80">
              New batch for NEET 2026 starting soon. Limited seats available!
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: neet2026FAQs.map((faq) => ({
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
    </div>
  )
}
