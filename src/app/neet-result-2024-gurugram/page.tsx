import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Trophy,
  Award,
  Star,
  TrendingUp,
  Users,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Results Gurugram | 98% Qualify',
  description:
    'Cerebrum Biology Academy Gurugram: 98% of our students qualify NEET. Small batches of 15-20, AIIMS-alumnus faculty, biology-only depth. Book a diagnostic. Call 88264-44334!',
  keywords: [
    'neet results gurugram',
    'neet result gurugram coaching',
    'cerebrum academy neet results',
    'neet coaching gurugram results',
    'best neet coaching gurgaon',
    'neet biology coaching results gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Results Gurugram',
    description:
      '98% of our students qualify NEET. Small batches, AIIMS faculty, biology-only focus.',
    url: 'https://cerebrumbiologyacademy.com/neet-result-2024-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-result-2024-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Results Gurugram | 98% Qualify',
    description:
      'Cerebrum Biology Academy Gurugram: 98% of our students qualify NEET. Small batches of 15-20, AIIMS-alumnus faculty, biology-only depth. Call 88264-44334!',
  },
}

const overallStats = [
  { label: 'Students Qualify NEET', value: '98%', icon: Trophy },
  { label: 'Students per Batch', value: '15-20', icon: Users },
  { label: 'Faculty Experience', value: '15+ yrs', icon: GraduationCap },
  { label: 'Our Focus', value: 'Biology only', icon: Star },
]

const approach = [
  {
    title: 'NCERT mastery',
    description:
      'We go through NCERT Biology line by line, because that is where most NEET Biology questions come from. Nothing gets skipped.',
    icon: Star,
  },
  {
    title: 'Weekly testing',
    description:
      'You sit a test every week. It keeps your revision honest and shows you exactly which chapters still need work.',
    icon: TrendingUp,
  },
  {
    title: 'Per-question review',
    description:
      'After every test we go over the questions you got wrong, one by one, so the same mistake does not cost you twice.',
    icon: Award,
  },
  {
    title: 'Small batches',
    description:
      'Only 15-20 students in a batch. You can ask a doubt the moment you have it, and the teacher knows your weak areas by name.',
    icon: Users,
  },
  {
    title: 'AIIMS-alumnus faculty',
    description:
      'Classes are led by Dr. Shekhar C Singh, an AIIMS alumnus with 15+ years of teaching NEET Biology.',
    icon: GraduationCap,
  },
  {
    title: 'A target that is real for you',
    description:
      'Come in for a diagnostic and we will show you where you stand today and set a target you can actually reach, not a generic promise.',
    icon: Trophy,
  },
]

const faqs = [
  {
    question: "What is Cerebrum's NEET success rate?",
    answer:
      'Across our programmes, 98% of our students qualify NEET. We keep batches small (15-20 students) so every student gets attention on their weak areas rather than being one more face in a large hall.',
  },
  {
    question: 'How will I know if Cerebrum is right for me?',
    answer:
      'Come in for a diagnostic. We will test where you stand in NEET Biology today and show you a realistic target based on your current level, so you know what to expect before you commit.',
  },
  {
    question: 'What makes your Biology teaching different?',
    answer:
      'We teach Biology only, led by Dr. Shekhar C Singh, an AIIMS alumnus with 15+ years of experience. That means deeper NCERT coverage, line by line, with weekly testing and per-question review.',
  },
  {
    question: 'How do you help me improve my score?',
    answer:
      'NCERT mastery, weekly tests, and per-MCQ review. After every test we sit with you on the questions you got wrong so the same mistakes stop repeating. Book a diagnostic and we will map a plan around your gaps.',
  },
]

export default function NEETResult2024Gurugram() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Gurugram',
          'NEET Biology Gurugram',
          'Medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="neet-result-2024-gurugram" />
      <section className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white text-amber-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" />
              98% Qualify
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NEET Results at Cerebrum</h1>
            <p className="text-xl text-amber-100 mb-4">Cerebrum Biology Academy, Gurugram</p>
            <div className="flex items-center justify-center gap-2 text-yellow-200 mb-8">
              <Award className="w-5 h-5" />
              <span className="text-2xl font-bold">98% of our students qualify NEET</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {overallStats.map((stat, index) => (
              <div key={index} className="bg-amber-50 rounded-xl p-4 text-center">
                <stat.icon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-amber-700">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Our NEET Biology Students Achieve
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We do not put invented names and ranks on a wall. Here is the work that actually moves
            your Biology score.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {approach.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <item.icon className="w-8 h-8 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-gray-100">
                  {faq.question}
                  <span className="text-amber-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="px-6 pb-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              href="/neet-topper-interview-gurugram"
              className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition text-center"
            >
              <h3 className="font-semibold text-purple-800">Study Strategies</h3>
              <p className="text-sm text-gray-600">Habits that raise your Biology score</p>
            </Link>
            <Link
              href="/neet-biology-faculty-gurugram"
              className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition text-center"
            >
              <h3 className="font-semibold text-blue-800">Our Faculty</h3>
              <p className="text-sm text-gray-600">Meet our AIIMS-trained teachers</p>
            </Link>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition text-center"
            >
              <h3 className="font-semibold text-green-800">Free Demo Class</h3>
              <p className="text-sm text-gray-600">Experience our teaching style</p>
            </Link>
            <Link
              href="/neet-coaching-gurugram"
              className="bg-amber-50 p-4 rounded-lg hover:bg-amber-100 transition text-center"
            >
              <h3 className="font-semibold text-amber-800">NEET Coaching</h3>
              <p className="text-sm text-gray-600">Complete program details</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Next Batch</h2>
          <p className="text-xl text-amber-100 mb-8">
            Small batches at our Sector 51 centre. Come in for a diagnostic and see where you stand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition"
            >
              <Phone className="w-5 h-5" />
              Call 88264-44334
            </a>
            <Link
              href="/free-neet-demo-class-gurugram"
              className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
            >
              Book a Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'NEET Results at Cerebrum Biology Academy Gurugram',
            description:
              '98% of Cerebrum Biology Academy students qualify NEET. Small batches, AIIMS-alumnus faculty, biology-only depth in Gurugram.',
            author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            publisher: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
            datePublished: '2024-06-15',
            dateModified: '2026-06-08',
          }),
        }}
      />
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
    </div>
  )
}
