'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import {
  Phone,
  MessageCircle,
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
  Star,
  Users,
  Trophy,
  Target,
  BookOpen,
  Clock,
} from 'lucide-react'
import { Top10List, TOP_10_NEET_COACHING_GURUGRAM } from '@/components/seo/Top10ListSchema'
import {
  PeopleAlsoAsk,
  NEET_COACHING_PAA_QUESTIONS,
  generateLocationPAAQuestions,
} from '@/components/seo/PeopleAlsoAsk'
import { ComprehensiveAEOSchema } from '@/components/seo/QAPageSchema'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

const gurugramPAAQuestions = generateLocationPAAQuestions('Gurugram')

const rankingMethodology = [
  {
    criterion: 'Success Rate',
    weight: '30%',
    description: 'Percentage of students qualifying NEET with 550+ score',
    icon: Trophy,
  },
  {
    criterion: 'Faculty Quality',
    weight: '25%',
    description: 'Credentials, experience, and teaching methodology',
    icon: Users,
  },
  {
    criterion: 'Batch Size',
    weight: '20%',
    description: 'Student-teacher ratio and personal attention',
    icon: Target,
  },
  {
    criterion: 'Student Reviews',
    weight: '15%',
    description: 'Google reviews, testimonials, and word-of-mouth',
    icon: Star,
  },
  {
    criterion: 'Value for Money',
    weight: '10%',
    description: 'Fee structure relative to quality offered',
    icon: Award,
  },
]

const faqs = [
  {
    question: 'What are the top 10 NEET coaching institutes in Gurugram?',
    answer:
      'The top 10 NEET coaching in Gurugram for 2026 are: 1) Cerebrum Biology Academy (98% success, AIIMS faculty), 2) Aakash Institute, 3) Allen Career Institute, 4) FIITJEE, 5) Narayana, 6) VMC, 7) Career Point, 8) Resonance, 9) Physics Wallah, 10) Local coaching centers. Rankings are based on success rate, faculty quality, batch size, and student reviews.',
  },
  {
    question: 'Which NEET coaching has the highest success rate in Gurugram?',
    answer:
      'Cerebrum Biology Academy has the highest verified success rate of 98% for NEET Biology in Gurugram. This is achieved through small batch sizes (15-20 students), AIIMS-trained faculty, and personalized attention. For overall NEET (all subjects), large institutes report 70-80% success rates.',
  },
  {
    question: 'What is the fee range for NEET coaching in Gurugram?',
    answer:
      'NEET coaching fees in Gurugram range from ₹15,000 to ₹2,50,000 per year. Budget options like Physics Wallah cost ₹15,000-50,000. Mid-range institutes charge ₹60,000-1,20,000. Premium coaching (Aakash, Allen) costs ₹1,50,000-2,50,000. Cerebrum offers ₹45,000-1,80,000 with best value.',
  },
  {
    question: 'Should I join a big coaching or specialized coaching for NEET?',
    answer:
      'It depends on your needs. Big coaching (Aakash, Allen) is good for all-subject coverage but has large batches. Specialized coaching like Cerebrum is better if Biology is your weak area or you need personal attention. Many students use a hybrid approach - big coaching for Physics/Chemistry and Cerebrum for Biology.',
  },
  {
    question: 'Is online NEET coaching as effective as offline in Gurugram?',
    answer:
      'Yes, online NEET coaching can be equally effective with live interactive classes. Advantages include saving 2-3 hours daily commute time, flexibility, and recorded lectures for revision. Cerebrum offers both modes with same faculty and materials, with 95% online students achieving similar results as offline.',
  },
  {
    question: 'What batch size is ideal for NEET preparation?',
    answer:
      'Smaller batches (15-30 students) are ideal for NEET as they allow personalized attention and doubt resolution. Large batches (60-100 students) at big institutes can leave weaker students behind. Cerebrum maintains 15-20 students per batch - the smallest in Gurugram.',
  },
  {
    question: 'How do I choose the right NEET coaching in Gurugram?',
    answer:
      'Consider these factors: 1) Verify success rate with actual student data, 2) Check faculty credentials (AIIMS/MBBS background for Biology), 3) Attend demo classes, 4) Compare batch sizes, 5) Read Google reviews, 6) Consider distance and timings, 7) Evaluate fee vs value. We recommend visiting top 3 choices before deciding.',
  },
  {
    question: 'Can I switch coaching mid-year in Gurugram?',
    answer:
      'Yes, many students switch coaching mid-year if not satisfied. Cerebrum accepts mid-year transfers with recorded lecture catch-up support. Key considerations: refund policy of current institute, syllabus alignment, and available seats in new institute. Best to switch early rather than waste time.',
  },
]

export function Top10NEETCoachingContent() {
  return (
    <>
      {/* Comprehensive AEO Schema */}
      <ComprehensiveAEOSchema
        pageUrl="https://cerebrumbiologyacademy.com/top-10-neet-coaching-gurugram"
        pageTitle="Top 10 NEET Coaching Institutes in Gurugram 2026"
        pageDescription="Comprehensive ranking of best NEET coaching centers in Gurugram based on success rate, faculty, batch size, and student reviews."
        faqs={faqs}
        listItems={TOP_10_NEET_COACHING_GURUGRAM.map((item) => ({
          name: item.name,
          description: item.description,
        }))}
        speakableSelectors={['.speakable-intro', '.speakable-list', '.speakable-summary']}
        datePublished="2024-01-15"
        dateModified={new Date().toISOString().split('T')[0]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <Trophy className="w-4 h-4" />
                Updated for 2026 Admissions
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Top 10 NEET Coaching in Gurugram
              </h1>
              <p className="speakable-intro text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                Unbiased ranking of the best NEET coaching institutes in Gurugram based on verified
                success rates, faculty credentials, batch sizes, and 500+ student reviews.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  10 Institutes Compared
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  500+ Reviews Analyzed
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last Updated: Feb 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Ranking Methodology */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Our Ranking Methodology
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
              {rankingMethodology.map((item) => (
                <div
                  key={item.criterion}
                  className="bg-white p-4 rounded-xl border border-gray-200 text-center"
                >
                  <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-bold text-blue-600 text-lg mb-1">{item.weight}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{item.criterion}</div>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Top 10 List with Schema */}
          <Top10List
            title="Complete Ranking: Top 10 NEET Coaching in Gurugram"
            subtitle="Click on each institute to see detailed pros, cons, and features"
            items={TOP_10_NEET_COACHING_GURUGRAM}
            pageUrl="https://cerebrumbiologyacademy.com/top-10-neet-coaching-gurugram"
            className="mb-12"
          />

          {/* Why Cerebrum is #1 CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-amber-300" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Why Cerebrum Biology Academy is Ranked #1
              </h2>
              <p className="speakable-summary text-blue-100 mb-6">
                With 98% success rate, AIIMS-trained faculty, smallest batch sizes (15-20 students),
                and highest student satisfaction (4.9/5 rating), Cerebrum offers the best
                Biology-focused NEET preparation in Gurugram.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'top-10-page-cta',
                      message: WHATSAPP_MESSAGES.enquiry,
                      campaign: 'top-10-gurugram',
                    })
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp for Free Demo
                </button>
                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call {CONTACT_INFO.phone.display.primary}
                </a>
              </div>
            </div>
          </section>

          {/* People Also Ask Section */}
          <PeopleAlsoAsk
            questions={[...gurugramPAAQuestions, ...NEET_COACHING_PAA_QUESTIONS.slice(0, 4)]}
            title="People Also Ask About NEET Coaching in Gurugram"
            topicKeyword="NEET coaching Gurugram"
            className="mb-12"
          />

          {/* Detailed FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* NEET Tools Widget */}
          <NEETToolsWidget />

          {/* Related Links */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Best NEET Coaching Gurugram', href: '/best-neet-coaching-gurugram' },
                { label: 'NEET Coaching Fees Gurugram', href: '/neet-coaching-fee-gurugram' },
                { label: 'Cerebrum vs Aakash', href: '/cerebrum-vs-aakash-neet-coaching' },
                { label: 'Cerebrum vs Allen', href: '/cerebrum-vs-allen-neet-coaching' },
                { label: 'Online NEET Classes', href: '/online-neet-biology-classes' },
                { label: 'NEET Dropper Batch', href: '/neet-dropper-batch-delhi' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {link.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
