import { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  Newspaper,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET 2025 Updates & NTA Announcements | Latest News | Cerebrum Biology Academy',
  description:
    'Stay updated with latest NEET 2025 exam dates, NTA announcements, syllabus changes, application forms, and important notifications. Get expert guidance from Cerebrum Biology Academy.',
  keywords: [
    'NEET 2025 updates',
    'NTA announcements',
    'NEET exam date 2025',
    'NEET application form',
    'NEET syllabus changes',
    'NTA NEET latest news',
    'NEET 2025 notification',
    'NEET exam pattern changes',
    'neet ki taiyari',
    'NEET news today',
  ],
  openGraph: {
    title: 'NEET 2025 Updates & NTA Announcements | Cerebrum',
    description: 'Latest NEET exam updates, dates, syllabus changes, and NTA notifications.',
    url: 'https://cerebrumbiologyacademy.com/neet-updates',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-updates',
  },
}

// Important NEET dates and timeline
const NEET_TIMELINE_2025 = [
  {
    event: 'NTA NEET 2025 Notification',
    expectedDate: 'February 2025',
    status: 'expected',
    description: 'Official notification with exam date and application details',
  },
  {
    event: 'NEET 2025 Application Form',
    expectedDate: 'February-March 2025',
    status: 'expected',
    description: 'Online application process begins on nta.ac.in',
  },
  {
    event: 'NEET 2025 Application Correction',
    expectedDate: 'March 2025',
    status: 'expected',
    description: 'Window for correcting application form details',
  },
  {
    event: 'NEET 2025 Admit Card',
    expectedDate: 'April 2025',
    status: 'expected',
    description: 'Download admit card from NTA website',
  },
  {
    event: 'NEET 2025 Exam Date',
    expectedDate: 'May 2025 (Expected)',
    status: 'expected',
    description: 'NEET UG examination conducted across India',
  },
  {
    event: 'NEET 2025 Answer Key',
    expectedDate: 'May-June 2025',
    status: 'expected',
    description: 'Provisional and final answer keys released',
  },
  {
    event: 'NEET 2025 Result',
    expectedDate: 'June 2025',
    status: 'expected',
    description: 'Results and scorecards available on NTA portal',
  },
  {
    event: 'NEET 2025 Counselling',
    expectedDate: 'July-August 2025',
    status: 'expected',
    description: 'MCC and state counselling for admissions',
  },
]

// Recent updates/news items
const RECENT_UPDATES = [
  {
    title: 'NEET 2025 Expected to Follow Similar Pattern',
    date: 'January 2025',
    category: 'Exam Pattern',
    summary:
      'Based on NTA trends, NEET 2025 is expected to follow the same 200 question, 720 marks pattern. No major syllabus changes anticipated.',
    isImportant: false,
  },
  {
    title: 'NTA Portal Updates for NEET Registration',
    date: 'December 2024',
    category: 'Registration',
    summary:
      'NTA has updated its portal with improved security features. Students should ensure Aadhaar-linked mobile for OTP verification.',
    isImportant: true,
  },
  {
    title: 'NCERT New Textbooks for NEET 2025',
    date: 'November 2024',
    category: 'Syllabus',
    summary:
      'NCERT has released updated Biology textbooks. Students should prepare from both old and new editions until NTA clarifies syllabus source.',
    isImportant: true,
  },
]

// Quick FAQs
const QUICK_FAQS = [
  {
    question: 'When will NEET 2025 notification be released?',
    answer:
      'NEET 2025 notification is expected in February 2025. NTA typically releases notifications 3-4 months before the exam date.',
  },
  {
    question: 'What is the expected NEET 2025 exam date?',
    answer:
      'Based on previous years, NEET 2025 is expected to be held in the first week of May 2025. Official date will be confirmed in the notification.',
  },
  {
    question: 'Will there be any syllabus changes in NEET 2025?',
    answer:
      'As of now, no major syllabus changes have been announced. NEET 2025 is expected to follow NCERT Class 11 and 12 syllabus for Biology, Physics, and Chemistry.',
  },
  {
    question: 'How to apply for NEET 2025?',
    answer:
      'Applications will be available on nta.ac.in. You need valid documents (Aadhaar, Class 10 & 12 marksheets, photo, signature) and application fee for registration.',
  },
]

export default function NEETUpdatesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUICK_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'NEET 2025 Updates & NTA Announcements',
    description: 'Latest NEET exam updates, dates, and NTA notifications',
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    dateModified: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 px-4 py-2 rounded-full text-sm mb-6">
              <Bell className="w-4 h-4 text-amber-300" />
              <span className="text-amber-200">Stay Updated with NTA</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              NEET 2025 Updates & NTA Announcements
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              Get the latest NEET exam dates, syllabus changes, application forms, and important
              notifications from NTA. Expert analysis by Cerebrum Biology Academy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://nta.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Visit NTA Website
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent('Hi, I want to join the NEET updates WhatsApp group')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Join Updates Group
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Alert Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800">Stay Alert for Official Updates</h3>
            <p className="text-amber-700 text-sm">
              Always verify information from the official NTA website (nta.ac.in). Beware of fake
              notifications circulating on social media.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                NEET 2025 Important Dates Timeline
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {NEET_TIMELINE_2025.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 flex items-start gap-4 ${idx !== NEET_TIMELINE_2025.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.status === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {item.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{item.event}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.expectedDate}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Updates */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-blue-600" />
                Recent Updates & Analysis
              </h2>
              <div className="space-y-4">
                {RECENT_UPDATES.map((update, idx) => (
                  <article
                    key={idx}
                    className={`bg-white rounded-xl border p-5 ${
                      update.isImportant ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {update.category}
                          </span>
                          <span className="text-xs text-gray-500">{update.date}</span>
                          {update.isImportant && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                              Important
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{update.title}</h3>
                        <p className="text-sm text-gray-600">{update.summary}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {QUICK_FAQS.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: 'NTA Official Website', href: 'https://nta.ac.in', external: true },
                  {
                    label: 'NEET Application Portal',
                    href: 'https://neet.nta.nic.in',
                    external: true,
                  },
                  { label: 'NEET Syllabus 2025', href: '/neet-syllabus', external: false },
                  {
                    label: 'Previous Year Papers',
                    href: '/neet-previous-papers',
                    external: false,
                  },
                  { label: 'NEET Preparation Tips', href: '/neet-preparation-tips', external: false },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-blue-600">
                      {link.label}
                    </span>
                    {link.external ? (
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Start Your NEET Preparation</h3>
              <p className="text-blue-100 text-sm mb-4">
                Join Cerebrum Biology Academy and get expert guidance for NEET 2025 with 98% success rate.
              </p>
              <Link
                href="/book-free-demo"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2 rounded-lg text-sm transition-colors w-full justify-center"
              >
                Book Free Demo Class
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* WhatsApp Updates */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Get Instant Updates
              </h3>
              <p className="text-green-700 text-sm mb-4">
                Join our WhatsApp group for instant NEET updates, tips, and important notifications.
              </p>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent('Hi, I want to join the NEET updates group')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors w-full justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                Join WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
