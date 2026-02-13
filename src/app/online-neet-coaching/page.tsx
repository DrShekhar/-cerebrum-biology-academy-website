'use client'

import Link from 'next/link'
import {
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  Video,
  Phone,
  Globe,
  Wifi,
  Monitor,
  MessageCircle,
  FileText,
} from 'lucide-react'

const onlineFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    desc: 'Real-time classes with two-way interaction. Ask questions, get instant answers.',
  },
  {
    icon: Monitor,
    title: 'HD Video Lectures',
    desc: '500+ hours of recorded lectures accessible 24/7 for revision anytime.',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Resolution',
    desc: 'Dedicated doubt sessions with faculty. Get your queries resolved within 24 hours.',
  },
  {
    icon: FileText,
    title: 'Digital Study Material',
    desc: 'Comprehensive PDF notes, practice MCQs, and previous year papers.',
  },
  {
    icon: Globe,
    title: 'Learn from Anywhere',
    desc: 'Access classes from any device - laptop, tablet, or smartphone.',
  },
  {
    icon: Wifi,
    title: 'Low Bandwidth Friendly',
    desc: 'Optimized streaming for stable learning even with slower internet.',
  },
]

const whyOnline = [
  { title: 'Same Faculty', desc: 'AIIMS-trained teachers from our offline batches' },
  { title: 'Flexible Timing', desc: 'Multiple batch timings - 6 AM, 4 PM, 7 PM' },
  { title: 'Cost Effective', desc: 'Save on travel and accommodation costs' },
  { title: 'Recorded Access', desc: 'Missed a class? Watch the recording anytime' },
  { title: 'Pan-India Reach', desc: 'Join from any city, town, or village in India' },
  { title: 'Personal Mentoring', desc: 'One-on-one guidance from assigned mentor' },
]

const faqs = [
  {
    question: 'What is the best online coaching for NEET?',
    answer:
      'The best online NEET coaching combines experienced faculty, live interactive classes, comprehensive study material, and proven results. Cerebrum Biology Academy offers all these with AIIMS-trained faculty and 67+ AIIMS selections.',
  },
  {
    question: 'How effective is online NEET coaching compared to offline?',
    answer:
      'Our online NEET coaching is equally effective as offline with the same faculty, curriculum, and study material. Students can interact in real-time, get doubts cleared, and access recorded lectures for revision.',
  },
  {
    question: 'What features does your online NEET coaching include?',
    answer:
      'Our online coaching includes live classes, 500+ hours of recorded lectures, digital study material, practice tests, doubt sessions, progress tracking, and personal mentoring - all accessible from any device.',
  },
  {
    question: 'Can I switch from online to offline coaching?',
    answer:
      'Yes, students can switch between online and offline modes. If you move to Delhi NCR, you can transfer to our offline centers at Rohini, Gurugram, South Extension, or Faridabad.',
  },
]

export default function OnlineNeetCoachingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
      <section className="relative overflow-hidden bg-blue-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center animate-fadeInUp"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Globe className="mr-1 inline h-4 w-4" />
              Pan-India Online Classes Available
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Online NEET Coaching
            </h1>
            <p className="mb-8 text-xl text-blue-100">
              Join India&apos;s best online NEET coaching with AIIMS-trained faculty. Live
              interactive classes, recorded lectures, and complete study material. 67+ AIIMS
              selections!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
              >
                Book Free Demo
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '67+', label: 'AIIMS Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students Online' },
              { icon: Star, value: '98%', label: 'Success Rate' },
              { icon: Clock, value: '500+', label: 'Video Hours' },
            ].map((stat, index) => (
              <div key={index} className="rounded-xl bg-white p-6 text-center shadow-lg animate-fadeInUp"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              What&apos;s Included in Online NEET Coaching
            </h2>
            <p className="text-lg text-gray-600">
              Complete NEET preparation from the comfort of home
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {onlineFeatures.map((feature, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <feature.icon className="mb-4 h-10 w-10 text-blue-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Online */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Choose Online Coaching?</h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 md:grid-cols-2">
              {whyOnline.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-lg animate-fadeInUp"
                >
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-lg animate-fadeInUp"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore More Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/neet-online-classes"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              NEET Online Classes
            </Link>
            <Link
              href="/neet-online-course"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              NEET Online Course
            </Link>
            <Link
              href="/neet-online"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              NEET Online
            </Link>
            <Link
              href="/best-neet-coaching"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Best NEET Coaching
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fadeInUp">
            <h2 className="mb-4 text-3xl font-bold">Start Your Online NEET Journey</h2>
            <p className="mb-8 text-xl text-blue-100">
              Join thousands of students preparing for NEET 2026 online!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
              >
                Book Free Online Demo
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Call: +91 88264 44334
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
