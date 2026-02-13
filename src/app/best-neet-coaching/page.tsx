'use client'

import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Medal,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const whyBest = [
  {
    icon: Trophy,
    title: '98% Success Rate',
    description: 'Highest selection rate in Delhi NCR. Our students consistently outperform.',
    stat: '98%',
  },
  {
    icon: Users,
    title: '1,50,000+ Selections',
    description: 'Over 15 years, we have helped thousands achieve their medical dreams.',
    stat: '1,50K+',
  },
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: "Learn from doctors and experts trained at India's premier medical institutions.",
    stat: '100%',
  },
  {
    icon: Star,
    title: 'Top Score 720/720',
    description: 'Our students have achieved perfect scores in NEET examinations.',
    stat: '720',
  },
]

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution and personalized attention.',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Maximum 10-15 students per batch for focused learning environment.',
  },
  {
    icon: BookOpen,
    title: 'Complete Study Material',
    description: 'NCERT-based notes, previous year questions, and comprehensive mock tests.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Morning, afternoon, and evening batches to suit your schedule.',
  },
  {
    icon: Target,
    title: 'Regular Assessments',
    description: 'Weekly tests and monthly mock exams with detailed performance analysis.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Doubt Support',
    description: 'WhatsApp support for instant doubt resolution anytime, anywhere.',
  },
]

const successMetrics = [
  { label: 'Success Rate', value: '98%', icon: Trophy },
  { label: 'Top Score', value: '720', icon: Star },
  { label: 'Total Selections', value: '15K+', icon: Users },
  { label: 'Years Experience', value: '15+', icon: Award },
]

const faqs = [
  {
    question: 'What makes Cerebrum the best NEET coaching?',
    answer:
      'Cerebrum Biology Academy stands out with a 98% success rate, AIIMS-trained faculty, small batch sizes (10-15 students), comprehensive study material, and personalized attention. Our 15+ years of experience and 1,50,000+ selections prove our teaching methodology works.',
  },
  {
    question: 'How is the teaching quality at Cerebrum?',
    answer:
      'All our faculty members are either doctors or trained at premier medical institutions like AIIMS. We follow NCERT-based curriculum with additional competitive exam preparation. Every student gets personalized attention with our small batch approach.',
  },
  {
    question: 'What are the fees for the best NEET coaching?',
    answer:
      'Our complete NEET Biology course ranges from Rs 24,000 to Rs 48,000 per year, significantly lower than other top coaching institutes. We offer EMI options and merit scholarships for deserving students.',
  },
  {
    question: 'Do you provide online coaching as well?',
    answer:
      'Yes! We offer both offline classes at our 4 centers (Rohini, Gurugram, South Extension, Faridabad) and live online classes. Online students get the same quality teaching with recorded lectures for revision.',
  },
  {
    question: 'What study material is provided?',
    answer:
      'We provide comprehensive NCERT-based study notes, chapter-wise question banks, previous year NEET papers with solutions, topic-wise mock tests, and full-length NEET simulations. All materials are prepared by our expert faculty.',
  },
]

const comparison = [
  {
    feature: 'Success Rate',
    cerebrum: '98%',
    others: '60-70%',
    winner: 'cerebrum',
  },
  {
    feature: 'Batch Size',
    cerebrum: '10-15 students',
    others: '50-100 students',
    winner: 'cerebrum',
  },
  {
    feature: 'Faculty',
    cerebrum: 'AIIMS Trained',
    others: 'Mixed',
    winner: 'cerebrum',
  },
  {
    feature: 'Doubt Support',
    cerebrum: '24/7 WhatsApp',
    others: 'Limited hours',
    winner: 'cerebrum',
  },
  {
    feature: 'Annual Fee',
    cerebrum: 'Rs 24K-48K',
    others: 'Rs 1-2 Lakhs',
    winner: 'cerebrum',
  },
  {
    feature: 'Personal Attention',
    cerebrum: 'High',
    others: 'Low',
    winner: 'cerebrum',
  },
]

export default function BestNeetCoachingPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_best_coaching', {
        event_category: 'conversion',
        event_label: 'best_neet_coaching_page',
        value: 1,
      })
    }
  }

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
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="text-center max-w-4xl mx-auto animate-fadeInUp"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Medal className="w-5 h-5 mr-2 text-yellow-300" />
              Rated #1 NEET Coaching in Delhi NCR
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">NEET Coaching</span> in India
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              98% Success Rate | AIIMS Trained Faculty | 1,50,000+ Selections
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Looking for the best coaching for NEET? Join India&apos;s top-rated NEET coaching with
              proven results, expert faculty, and personalized attention. Start your medical journey
              today!
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

      {/* Why We're the Best */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why We&apos;re the Best NEET Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers don&apos;t lie. Here&apos;s why students and parents trust us for NEET
              preparation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyBest.map((item, index) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-lg text-center animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{item.stat}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div
            className="text-center mb-16 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              How We Compare to Other Coaching
            </h2>
            <p className="text-xl text-gray-600">
              See why Cerebrum is the best choice for NEET preparation
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-3 bg-blue-600 text-white font-bold">
              <div className="p-4">Feature</div>
              <div className="p-4 text-center bg-blue-700">Cerebrum</div>
              <div className="p-4 text-center">Others</div>
            </div>
            {comparison.map((row, index) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="p-4 font-medium text-gray-900">{row.feature}</div>
                <div className="p-4 text-center bg-blue-50 font-bold text-blue-600">
                  {row.cerebrum}
                  <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                </div>
                <div className="p-4 text-center text-gray-600">{row.others}</div>
              </div>
            ))}
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
              Features of Best NEET Coaching
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-8 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
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
              Frequently Asked Questions - Best NEET Coaching
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-gray-50 rounded-xl p-8 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join India&apos;s Best NEET Coaching Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              98% success rate, AIIMS trained faculty, 1,50,000+ selections. Your medical dream
              starts here!
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
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>1,50,000+ Selections</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Small Batches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-coaching-centre"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Centre
            </Link>
            <Link
              href="/neet-coaching-institute"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Institute
            </Link>
            <Link
              href="/neet-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Classes
            </Link>
            <Link
              href="/neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Classes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
