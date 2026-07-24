import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Trophy, TrendingUp, ArrowRight, CheckCircle, Star, Target } from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Success Rate Gurugram | How to Compare Coaching',
  description:
    'Compare NEET coaching in Gurugram (Gurgaon) honestly. Cerebrum: 98% of our students qualify, small batches of 15-20, AIIMS faculty. What to look for beyond headline rates. Call 88264-44334!',
  keywords: [
    'neet success rate gurugram',
    'neet coaching comparison gurugram',
    'how to choose neet coaching gurugram',
    'best neet coaching gurgaon',
    'neet qualification rate coaching',
    'neet biology coaching gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Success Rate Gurugram | How to Compare Coaching',
    description:
      'Cerebrum: 98% of our students qualify NEET. How to compare coaching beyond headline rates.',
    url: 'https://cerebrumbiologyacademy.com/neet-success-rate-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-success-rate-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Success Rate Gurugram | How to Compare Coaching',
    description:
      'Compare NEET coaching in Gurugram honestly. Cerebrum: 98% of our students qualify, small batches of 15-20, AIIMS faculty. Call 88264-44334!',
  },
}

const quickAnswer = {
  question: 'What is the NEET success rate of coaching institutes in Gurugram?',
  answer:
    'Success rates vary widely, and a headline percentage on its own tells you very little. At Cerebrum Biology Academy, 98% of our students qualify NEET. What matters just as much is how that number is produced: we keep batches to 15-20 students, we teach Biology only, and classes are led by an AIIMS alumnus. A rate from a small, attentive batch is a very different thing from a rate averaged across thousands.',
}

const cerebrumStats = [
  {
    label: 'Qualify NEET',
    value: '98%',
    icon: Trophy,
    description: 'Across our programmes',
  },
  {
    label: 'Batch Size',
    value: '15-20',
    icon: Star,
    description: 'Personal attention, not a crowd',
  },
  {
    label: 'Faculty',
    value: 'AIIMS',
    icon: Target,
    description: 'Dr. Shekhar C Singh, 15+ years',
  },
  {
    label: 'Focus',
    value: 'Biology',
    icon: TrendingUp,
    description: 'Biology only, so coverage goes deeper',
  },
]

const howToCompare = [
  {
    title: 'Ask about batch size',
    description:
      'A 98% rate from a batch of 20 is not the same as 98% averaged across thousands. Ask how many students share one teacher.',
  },
  {
    title: 'Ask who actually teaches',
    description:
      'Find out who stands in front of your class every day, not just the name on the banner. At Cerebrum it is Dr. Shekhar C Singh, an AIIMS alumnus with 15+ years of experience.',
  },
  {
    title: 'Ask about subject depth',
    description:
      'Biology is roughly half your NEET marks. A Biology-only setup can cover it more deeply than a place splitting time across three subjects.',
  },
  {
    title: 'Ask how doubts get cleared',
    description:
      'In a large hall your questions wait. In a small batch you can ask the moment you are stuck, which is how weak areas actually close.',
  },
]

const whyHighSuccessRate = [
  {
    title: 'Small Batch Size',
    description: 'Only 15-20 students per batch. Every student gets personal attention.',
  },
  {
    title: 'AIIMS-Trained Faculty',
    description: 'Dr. Shekhar C Singh (AIIMS Delhi) leads with 15+ years experience.',
  },
  {
    title: 'Biology Specialist',
    description: 'Focused on Biology = deeper coverage than PCB institutes.',
  },
  {
    title: 'Regular Assessment',
    description: 'Weekly tests, monthly mocks, performance tracking.',
  },
]

const faqs = [
  {
    question: "What is Cerebrum's NEET success rate in Gurugram?",
    answer:
      "98% of our students qualify NEET. We keep that meaningful by teaching in small batches of 15-20, where the faculty knows each student's weak areas rather than treating the class as a crowd.",
  },
  {
    question: 'How do I compare NEET coaching honestly?',
    answer:
      'Look past the headline percentage. Ask about batch size, who teaches your class day to day, how deeply Biology is covered, and how quickly you can get a doubt cleared. Those decide your result far more than a number on a poster.',
  },
  {
    question: 'What is a good NEET coaching success rate?',
    answer:
      'A high rate is only useful once you know how it was measured. A strong qualification rate from a small, attentive batch is worth more than the same number averaged across thousands of students. Ask how the figure is calculated before you compare.',
  },
  {
    question: 'Why do small coaching institutes often do well?',
    answer:
      'Smaller batches allow personal attention, quicker doubt clearing, and a lower student-teacher ratio. In a large hall of a hundred-plus students, individual focus is simply harder. That is why we cap our batches at 15-20.',
  },
]

export default function NEETSuccessRateGurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Gurugram',
          'NEET Biology Gurugram',
          'Medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="neet-success-rate-gurugram" />
      {/* Quick Answer Box */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{quickAnswer.question}</h1>
              <p className="text-lg text-purple-100 leading-relaxed">{quickAnswer.answer}</p>
              <div className="mt-4 flex items-center gap-2 text-yellow-300">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">98% of our students qualify NEET</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cerebrum Stats Highlight */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Cerebrum Biology Academy, Gurugram
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {cerebrumStats.map((stat, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-4 text-center">
                <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-purple-700">{stat.value}</p>
                <p className="font-semibold text-gray-800">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Compare */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            How to Compare NEET Coaching in Gurugram
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            A percentage on a poster is easy to print. These are the questions that actually tell
            you whether a coaching will work for you.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {howToCompare.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why High Success Rate */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Cerebrum Reaches a 98% Success Rate
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyHighSuccessRate.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-50">
                  {faq.question}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              href="/neet-result-2024-gurugram"
              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition text-center"
            >
              <h3 className="font-semibold text-green-700">Our Results</h3>
              <p className="text-sm text-gray-600">What our students achieve</p>
            </Link>
            <Link
              href="/neet-topper-interview-gurugram"
              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition text-center"
            >
              <h3 className="font-semibold text-purple-700">Study Strategies</h3>
              <p className="text-sm text-gray-600">Habits that raise scores</p>
            </Link>
            <Link
              href="/neet-coaching-fee-gurugram"
              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition text-center"
            >
              <h3 className="font-semibold text-blue-700">Fees</h3>
              <p className="text-sm text-gray-600">Value for money</p>
            </Link>
            <Link
              href="/neet-coaching-gurugram"
              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition text-center"
            >
              <h3 className="font-semibold text-amber-700">Join Cerebrum</h3>
              <p className="text-sm text-gray-600">Program details</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the 98% Success Rate Coaching</h2>
          <p className="text-xl text-purple-100 mb-8">
            Small batches at our Sector 51 centre. Come in for a diagnostic and see where you stand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              Book Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'NEET Success Rate in Gurugram - How to Compare Coaching',
            description: quickAnswer.answer,
            author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            datePublished: '2026-01-01',
            dateModified: '2026-06-08',
          }),
        }}
      />
    </div>
  )
}
