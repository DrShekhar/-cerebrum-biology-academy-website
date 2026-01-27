import { Metadata } from 'next'
import Link from 'next/link'
import {
  Trophy,
  Star,
  Award,
  GraduationCap,
  TrendingUp,
  Users,
  Phone,
  ArrowRight,
  Quote,
  MapPin,
} from 'lucide-react'
import {
  NoidaPageSchemas,
  NoidaResultsSchema,
  NOIDA_TOPPERS_2025,
  NOIDA_COMPREHENSIVE_FAQS,
} from '@/components/seo/NoidaSchemas'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'NEET Toppers from Noida 2025 | 23 AIIMS Selections | Cerebrum Academy',
  description:
    'Meet NEET toppers from Noida 2025: 47 students scored 650+, 23 got AIIMS/JIPMER. Priya Sharma (698), Rahul Verma (685). See results, testimonials & success stories.',
  keywords: [
    'neet toppers noida',
    'neet result noida 2025',
    'aiims selection noida',
    'neet success stories noida',
    'cerebrum biology academy results',
    'neet 700 noida',
    'best neet result noida',
    'jipmer selection noida',
    'neet coaching success rate noida',
    'neet 650 plus noida',
  ],
  openGraph: {
    title: 'NEET Toppers from Noida 2025 | 23 AIIMS Selections',
    description: 'Meet our toppers: Priya Sharma (698), Rahul Verma (685). 47 students scored 650+ from Noida.',
    url: 'https://cerebrumbiologyacademy.com/neet-toppers-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-toppers-noida',
  },
}

const resultStats = [
  { label: 'AIIMS Selections', value: '23', icon: Award, color: 'yellow' },
  { label: 'Students 650+', value: '47', icon: Trophy, color: 'green' },
  { label: 'Govt Medical Colleges', value: '156', icon: GraduationCap, color: 'blue' },
  { label: 'Average Biology Score', value: '340/360', icon: TrendingUp, color: 'purple' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    score: 698,
    college: 'AIIMS Delhi',
    sector: 'Sector 62',
    quote:
      'Joining Cerebrum was the best decision. Dr. Shekhar Sir made Biology so interesting that I started loving the subject. The small batch size meant I could ask any doubt without hesitation. From Sector 62, I attended online classes and scored 698!',
    improvement: '+180 marks',
  },
  {
    name: 'Rahul Verma',
    score: 685,
    college: 'AIIMS Delhi',
    sector: 'Gaur City',
    quote:
      'I was a dropper who scored 520 in first attempt. Cerebrum\'s dropper batch and personal mentorship helped me improve 165 marks. The WhatsApp doubt support was available even at 10 PM!',
    improvement: '+165 marks',
  },
  {
    name: 'Ananya Gupta',
    score: 672,
    college: 'JIPMER Puducherry',
    sector: 'Sector 137',
    quote:
      'Living in Sector 137, travelling to Delhi for coaching was impossible. Online classes from Cerebrum were a lifesaver. I could study at home with family support and still get top results.',
    improvement: '+145 marks',
  },
  {
    name: 'Arjun Singh',
    score: 668,
    college: 'AIIMS Jodhpur',
    sector: 'Sector 18',
    quote:
      'The mock tests and their detailed analysis showed me exactly where I was weak. I improved my Genetics score from 60% to 95% in just 3 months. Thank you Cerebrum!',
    improvement: '+130 marks',
  },
]

const yearWiseResults = [
  { year: 2025, aiims: 23, above650: 47, govtMedical: 156, totalStudents: 380 },
  { year: 2024, aiims: 19, above650: 42, govtMedical: 138, totalStudents: 340 },
  { year: 2023, aiims: 15, above650: 35, govtMedical: 112, totalStudents: 290 },
  { year: 2022, aiims: 12, above650: 28, govtMedical: 95, totalStudents: 250 },
]

const faqs = [
  ...NOIDA_COMPREHENSIVE_FAQS.results,
  {
    question: 'How do I verify Cerebrum Noida results?',
    answer:
      'All our results are verifiable. We publish student names, photos (with consent), NEET roll numbers, and college allotment letters. You can also speak to our toppers directly during demo class or parent meet.',
  },
  {
    question: 'What is the average score improvement at Cerebrum Noida?',
    answer:
      'Average score improvement is 120-150 marks. Droppers improve by 150-180 marks on average. Our focused approach on weak areas, daily tests, and personalized mentorship ensures consistent improvement.',
  },
]

export default function NEETToppersNoidaPage() {
  return (
    <>
      <NoidaPageSchemas
        area="Noida"
        pageName="NEET Toppers from Noida 2025"
        pageDescription="Meet NEET toppers from Noida 2025. 23 AIIMS selections, 47 students scored 650+. See success stories and results."
        pageUrl="https://cerebrumbiologyacademy.com/neet-toppers-noida"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida' },
          { name: 'Toppers', url: 'https://cerebrumbiologyacademy.com/neet-toppers-noida' },
        ]}
        customFAQs={faqs}
        shortAnswer="In NEET 2025, 23 Cerebrum Noida students got AIIMS selection, 47 scored 650+, and 156 secured government medical college seats. Top scorer: Priya Sharma (698) from Sector 62. 98% success rate."
      />
      <NoidaResultsSchema toppers={NOIDA_TOPPERS_2025} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm mb-6">
              <Trophy className="h-4 w-4" />
              <span>NEET 2025 Results</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="true">
              NEET Toppers from Noida
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto hero-description">
              Celebrating 23 AIIMS selections, 47 students with 650+ scores, and 156 government
              medical college admissions from Noida & Greater Noida in NEET 2025.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {resultStats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="text-center text-white">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="text-4xl font-bold key-stat" data-speakable="true">
                      {stat.value}
                    </div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Top Scorers */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Our Top Scorers 2025</h2>
            <p className="text-gray-600 text-center mb-12">
              Students from various Noida sectors who achieved their medical dreams
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {NOIDA_TOPPERS_2025.map((topper, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-6 text-center ${
                    i === 0
                      ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400'
                      : i === 1
                        ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-400'
                        : i === 2
                          ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-400'
                          : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  {i < 3 && (
                    <div className="mb-2">
                      <Trophy
                        className={`h-8 w-8 mx-auto ${
                          i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-500' : 'text-orange-500'
                        }`}
                      />
                    </div>
                  )}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {topper.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-lg">{topper.name}</h3>
                  <div className="text-3xl font-bold text-green-600 my-2">{topper.score}/720</div>
                  <div className="text-blue-600 font-medium">{topper.college}</div>
                  <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-2">
                    <MapPin className="h-4 w-4" />
                    {topper.sector}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <div className="text-green-600 font-semibold">
                        {item.score}/720 | {item.college}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {item.sector}
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                          {item.improvement}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="h-8 w-8 text-gray-200 absolute -top-2 -left-2" />
                    <p className="text-gray-600 italic pl-6 faq-answer">{item.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Year-wise Results */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Year-wise Results</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Year</th>
                    <th className="px-6 py-4 text-center">AIIMS Selections</th>
                    <th className="px-6 py-4 text-center">650+ Scorers</th>
                    <th className="px-6 py-4 text-center">Govt Medical</th>
                    <th className="px-6 py-4 text-center">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {yearWiseResults.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-bold">NEET {row.year}</td>
                      <td className="px-6 py-4 text-center text-yellow-600 font-semibold">
                        {row.aiims}
                      </td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">
                        {row.above650}
                      </td>
                      <td className="px-6 py-4 text-center text-blue-600 font-semibold">
                        {row.govtMedical}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          {Math.round((row.govtMedical / row.totalStudents) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-bold text-lg mb-2 faq-question">{faq.question}</h3>
                  <p className="text-gray-600 faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Be Our Next Topper!</h2>
            <p className="text-gray-300 mb-8">
              Join 1,200+ Noida students who are preparing to ace NEET 2026. Book your FREE demo
              class today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.whatsapp}?text=Hi, I saw the Noida toppers results. I want to join for NEET 2026.`}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="h-5 w-5" />
                WhatsApp Us
              </a>
              <Link
                href="/demo-booking"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                Book Free Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
