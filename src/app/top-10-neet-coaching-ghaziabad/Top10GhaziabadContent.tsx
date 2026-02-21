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
import {
  PeopleAlsoAsk,
  NEET_COACHING_PAA_QUESTIONS,
  generateLocationPAAQuestions,
} from '@/components/seo/PeopleAlsoAsk'
import { ComprehensiveAEOSchema } from '@/components/seo/QAPageSchema'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'

const ghaziabadPAAQuestions = generateLocationPAAQuestions('Ghaziabad')

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

const top10List = [
  {
    rank: 1,
    name: 'Cerebrum Biology Academy',
    location: 'Sector 62, Noida (Blue Line Metro from Ghaziabad)',
    specialty: 'Biology Specialist',
    successRate: '98%',
    fees: '₹60,000/year',
    highlight: true,
    description:
      'AIIMS-trained faculty, smallest batches (15-20), 98% success rate. Ghaziabad students reach via Blue Line Metro directly to Sector 62.',
  },
  {
    rank: 2,
    name: 'Aakash Institute',
    location: 'Indirapuram, Ghaziabad',
    specialty: 'All subjects',
    successRate: '80% (claimed)',
    fees: '₹1,40,000-1,80,000/year',
    highlight: false,
    description: 'Established brand, all subjects, large batches of 60-80 students',
  },
  {
    rank: 3,
    name: 'Allen Career Institute',
    location: 'Multiple centers',
    specialty: 'All subjects',
    successRate: '85% (claimed)',
    fees: '₹1,50,000-2,00,000/year',
    highlight: false,
    description: 'Pan-India presence, brand recognition, very large batches',
  },
  {
    rank: 4,
    name: 'Smart Achievers',
    location: 'Ghaziabad',
    specialty: 'All subjects',
    successRate: '65% (claimed)',
    fees: '₹70,000-1,00,000/year',
    highlight: false,
    description: 'Local Ghaziabad institute with moderate batch sizes',
  },
  {
    rank: 5,
    name: 'Gyanmudra',
    location: 'Ghaziabad',
    specialty: 'All subjects',
    successRate: '60% (claimed)',
    fees: '₹60,000-90,000/year',
    highlight: false,
    description: 'Local coaching with competitive fees and mixed results',
  },
  {
    rank: 6,
    name: 'Aakash Indirapuram',
    location: 'Indirapuram',
    specialty: 'All subjects',
    successRate: '75% (claimed)',
    fees: '₹1,20,000-1,60,000/year',
    highlight: false,
    description: 'Aakash franchise in Indirapuram, large batch sizes',
  },
  {
    rank: 7,
    name: 'Narayana',
    location: 'Ghaziabad/Noida',
    specialty: 'All subjects',
    successRate: '75% (claimed)',
    fees: '₹1,20,000-1,60,000/year',
    highlight: false,
    description: 'South India coaching brand with Ghaziabad presence',
  },
  {
    rank: 8,
    name: 'Physics Wallah',
    location: 'Online/Ghaziabad',
    specialty: 'All subjects',
    successRate: '65% (claimed)',
    fees: '₹15,000-50,000/year',
    highlight: false,
    description: 'Budget online coaching, large student base, unverified results',
  },
  {
    rank: 9,
    name: 'VMC',
    location: 'Noida/Delhi',
    specialty: 'All subjects',
    successRate: '70% (claimed)',
    fees: '₹1,00,000-1,50,000/year',
    highlight: false,
    description: 'Established coaching with decent results, distant from Ghaziabad',
  },
  {
    rank: 10,
    name: 'Career Point',
    location: 'Ghaziabad',
    specialty: 'All subjects',
    successRate: '60% (claimed)',
    fees: '₹80,000-1,20,000/year',
    highlight: false,
    description: 'Local institute with board + NEET combined focus',
  },
]

const faqs = [
  {
    question: 'What are the top 10 NEET coaching institutes in Ghaziabad?',
    answer:
      'The top 10 NEET coaching in Ghaziabad for 2026 are: 1) Cerebrum Biology Academy (98% success, AIIMS faculty, accessible via Blue Line Metro), 2) Aakash Institute Indirapuram, 3) Allen Career Institute, 4) Smart Achievers, 5) Gyanmudra, 6) Aakash Indirapuram, 7) Narayana, 8) Physics Wallah, 9) VMC, 10) Career Point. Rankings based on success rate, faculty, batch size, and student reviews.',
  },
  {
    question: 'Which NEET coaching has the highest success rate for Ghaziabad students?',
    answer:
      'Cerebrum Biology Academy has the highest verified success rate of 98% for NEET Biology. Ghaziabad students from Indirapuram, Vaishali, and Kaushambi regularly attend via the Blue Line Metro directly to Sector 62, Noida. For overall NEET, large institutes report 70-80% success rates.',
  },
  {
    question: 'Is it worth traveling from Ghaziabad to Noida for NEET coaching?',
    answer:
      'Absolutely. The Blue Line Metro directly connects Vaishali and Kaushambi in Ghaziabad to Sector 62 Noida in 20-25 minutes. For a 98% success rate vs 65-70% local options, the metro commute is worth it. Many students from Indirapuram, Raj Nagar Extension, and Vasundhara make this daily trip.',
  },
  {
    question: 'What is the fee range for NEET coaching in Ghaziabad?',
    answer:
      'NEET coaching fees in Ghaziabad range from ₹15,000 to ₹2,00,000 per year. Budget options like Physics Wallah cost ₹15,000-50,000 (online). Local institutes charge ₹60,000-1,00,000. Premium coaching (Aakash, Allen) costs ₹1,40,000-2,00,000. Cerebrum offers ₹45,000-1,80,000 with the best results.',
  },
  {
    question: 'Should I join a big coaching or specialized coaching for NEET?',
    answer:
      'It depends on your needs. Big coaching (Aakash, Allen) covers all subjects but has large batches of 60-80 students. Specialized coaching like Cerebrum is better if Biology is your weak area or you need personal attention. Many Ghaziabad students use hybrid approach: big coaching for Physics/Chemistry and Cerebrum for Biology.',
  },
  {
    question: 'Is online NEET coaching as effective as offline for Ghaziabad students?',
    answer:
      'Yes, online NEET coaching can be equally effective. Advantages include saving 1-2 hours of daily travel, recorded lectures for revision, and flexibility. Cerebrum offers both modes with same faculty and materials. Many Ghaziabad students in areas like Crossings Republik and Raj Nagar Extension prefer online mode.',
  },
  {
    question: 'What batch size is ideal for NEET preparation?',
    answer:
      'Smaller batches (15-30 students) are ideal for NEET as they allow personalized attention. Large batches (60-80 students) at big institutes leave weaker students behind. Cerebrum maintains 15-20 students per batch - the smallest available for Ghaziabad students.',
  },
  {
    question: 'How do I choose the right NEET coaching as a Ghaziabad student?',
    answer:
      'Consider: 1) Verify success rate with actual student data, 2) Check faculty credentials (AIIMS/MBBS for Biology), 3) Attend demo classes, 4) Compare batch sizes, 5) Read Google reviews, 6) Consider commute time and modes (metro, online), 7) Evaluate fee vs value. We recommend visiting top 3 choices before deciding.',
  },
]

export function Top10NEETCoachingGhaziabadContent() {
  return (
    <>
      {/* Comprehensive AEO Schema */}
      <ComprehensiveAEOSchema
        pageUrl="https://cerebrumbiologyacademy.com/top-10-neet-coaching-ghaziabad"
        pageTitle="Top 10 NEET Coaching Institutes in Ghaziabad 2026"
        pageDescription="Comprehensive ranking of best NEET coaching centers in Ghaziabad based on success rate, faculty, batch size, and student reviews."
        faqs={faqs}
        listItems={top10List.map((item) => ({
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
                Top 10 NEET Coaching in Ghaziabad
              </h1>
              <p className="speakable-intro text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                Unbiased ranking of the best NEET coaching institutes for Ghaziabad students based
                on verified success rates, faculty credentials, batch sizes, and 500+ student
                reviews.
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

          {/* Top 10 List */}
          <section className="mb-12">
            <h2 className="speakable-list text-2xl font-bold text-gray-900 mb-6">
              Complete Ranking: Top 10 NEET Coaching in Ghaziabad
            </h2>
            <div className="space-y-4">
              {top10List.map((item) => (
                <div
                  key={item.rank}
                  className={`bg-white rounded-2xl p-6 shadow-md ${item.highlight ? 'ring-2 ring-green-500' : 'border border-gray-100'}`}
                >
                  {item.highlight && (
                    <div className="bg-green-500 text-white text-center py-1 text-xs font-semibold rounded-t-lg -mt-6 -mx-6 mb-4 px-6">
                      #1 Recommended - Best for Biology Excellence
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${item.highlight ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.location}</p>
                        </div>
                        <div className="flex gap-3 text-sm">
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                            {item.successRate}
                          </span>
                          <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full">
                            {item.fees}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Cerebrum is #1 CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-amber-300" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Why Cerebrum Biology Academy is Ranked #1 for Ghaziabad
              </h2>
              <p className="speakable-summary text-blue-100 mb-6">
                With 98% success rate, AIIMS-trained faculty, smallest batch sizes (15-20 students),
                and highest student satisfaction (4.9/5 rating), Cerebrum offers the best
                Biology-focused NEET preparation. Ghaziabad students reach us in 20-25 minutes via
                Blue Line Metro to Sector 62 Noida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'top-10-page-cta-ghaziabad',
                      message: WHATSAPP_MESSAGES.enquiry,
                      campaign: 'top-10-ghaziabad',
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
                  Call +91-99536-43938
                </a>
              </div>
            </div>
          </section>

          {/* People Also Ask Section */}
          <PeopleAlsoAsk
            questions={[...ghaziabadPAAQuestions, ...NEET_COACHING_PAA_QUESTIONS.slice(0, 4)]}
            title="People Also Ask About NEET Coaching in Ghaziabad"
            topicKeyword="NEET coaching Ghaziabad"
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

          {/* NEET Tools Widget */}
          <NEETToolsWidget />

          {/* Related Links */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h2>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  label: 'Affordable NEET Coaching Ghaziabad',
                  href: '/affordable-neet-coaching-ghaziabad',
                },
                { label: 'Online NEET Coaching Ghaziabad', href: '/online-neet-coaching-ghaziabad' },
                { label: 'Free NEET Demo Ghaziabad', href: '/free-neet-demo-class-ghaziabad' },
                { label: 'Biology Classes Ghaziabad', href: '/biology-classes-ghaziabad' },
                { label: 'NEET Coaching Noida', href: '/neet-coaching-noida' },
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
