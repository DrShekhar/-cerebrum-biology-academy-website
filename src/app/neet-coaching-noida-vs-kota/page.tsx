import { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  Phone,
  ArrowRight,
  Home,
  Plane,
  IndianRupee,
  Users,
  Clock,
  Award,
  MapPin,
  Wifi,
  Heart,
} from 'lucide-react'
import { NoidaPageSchemas, NoidaEventSchema, NOIDA_COMPREHENSIVE_FAQS } from '@/components/seo/NoidaSchemas'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'NEET Coaching: Noida vs Kota 2026 | Which is Better? | Cerebrum',
  description:
    'Noida vs Kota for NEET coaching - complete comparison. Save Rs 2-3 lakh on hostel costs, study from home, get same results. 98% success rate with online coaching from Noida.',
  keywords: [
    'neet coaching noida vs kota',
    'should i go to kota for neet',
    'kota vs noida neet coaching',
    'best neet coaching noida or kota',
    'neet coaching comparison noida kota',
    'stay in noida or go kota neet',
    'online neet coaching noida',
    'kota alternative noida',
    'neet preparation noida vs kota',
  ],
  openGraph: {
    title: 'NEET Coaching: Noida vs Kota - Complete Comparison 2026',
    description: 'Should you go to Kota or stay in Noida for NEET? Complete comparison of costs, results, and lifestyle.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida-vs-kota',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-noida-vs-kota',
  },
}

const comparisonData = [
  {
    factor: 'Total Annual Cost',
    noida: 'Rs 48,000 - 98,000',
    kota: 'Rs 2,50,000 - 4,00,000',
    winner: 'noida',
    details: 'Kota includes hostel (Rs 1-1.5L), food (Rs 50K), travel (Rs 30K)',
  },
  {
    factor: 'Living Situation',
    noida: 'Home with family',
    kota: 'Hostel/PG alone',
    winner: 'noida',
    details: 'Home food, family support, no homesickness',
  },
  {
    factor: 'Batch Size',
    noida: '10-40 students',
    kota: '100-500 students',
    winner: 'noida',
    details: 'Smaller batches = more personal attention',
  },
  {
    factor: 'Faculty Quality',
    noida: 'AIIMS trained (Cerebrum)',
    kota: 'Mixed quality',
    winner: 'tie',
    details: 'Top Kota faculty comparable to AIIMS faculty',
  },
  {
    factor: 'Doubt Resolution',
    noida: 'Instant WhatsApp support',
    kota: 'Queue-based, limited time',
    winner: 'noida',
    details: '7am-11pm doubt support vs scheduled hours',
  },
  {
    factor: 'Study Environment',
    noida: 'Home comfort',
    kota: 'Competitive pressure',
    winner: 'tie',
    details: 'Depends on student personality',
  },
  {
    factor: 'Parents Involvement',
    noida: 'Daily monitoring',
    kota: 'Limited (phone calls)',
    winner: 'noida',
    details: 'Parents can track progress closely',
  },
  {
    factor: 'Health & Nutrition',
    noida: 'Home food',
    kota: 'Mess/outside food',
    winner: 'noida',
    details: 'Better health = better performance',
  },
  {
    factor: 'Success Rate',
    noida: '98% (Cerebrum)',
    kota: '15-40% (varies)',
    winner: 'noida',
    details: 'Small batch coaching has higher success rates',
  },
  {
    factor: 'Flexibility',
    noida: 'Online + Offline hybrid',
    kota: 'Fixed offline only',
    winner: 'noida',
    details: 'Miss a class? Watch recording. Not possible in Kota.',
  },
]

const costBreakdown = {
  kota: [
    { item: 'Coaching Fee', cost: '1,50,000 - 2,50,000' },
    { item: 'Hostel/PG Rent', cost: '1,00,000 - 1,50,000' },
    { item: 'Food & Mess', cost: '48,000 - 60,000' },
    { item: 'Travel (4 trips)', cost: '20,000 - 30,000' },
    { item: 'Books & Material', cost: '15,000 - 20,000' },
    { item: 'Miscellaneous', cost: '20,000 - 30,000' },
  ],
  noida: [
    { item: 'Online Coaching Fee', cost: '48,000 - 98,000' },
    { item: 'Living at Home', cost: '0' },
    { item: 'Food at Home', cost: '0' },
    { item: 'Travel', cost: '0' },
    { item: 'Study Material (included)', cost: '0' },
    { item: 'Internet', cost: '6,000' },
  ],
}

const faqs = [
  {
    question: 'Should I go to Kota or stay in Noida for NEET preparation?',
    answer:
      'Stay in Noida! With online coaching from institutes like Cerebrum (98% success rate), you get Kota-quality teaching without the Rs 2-3 lakh hostel expense. Study from home with family support, home food, and personalized attention in small batches.',
  },
  {
    question: 'Is Kota really better for NEET preparation?',
    answer:
      'Not necessarily. Kota success comes from focused study environment, which you can create at home. The top 10% Kota students succeed, but 60-70% struggle. With online coaching from Noida, you get same syllabus coverage with better doubt support and lower stress.',
  },
  {
    question: 'How much money can I save by staying in Noida instead of Kota?',
    answer:
      'You save Rs 2-3 lakh per year by staying in Noida. Kota total cost: Rs 3.5-4.5 lakh (coaching + hostel + food + travel). Noida online coaching: Rs 48,000-98,000. Use saved money for better resources or future education.',
  },
  {
    question: 'What if I need the competitive environment of Kota?',
    answer:
      'Cerebrum creates competition through: weekly rank tests (compete with 1000+ students), live leaderboards, peer study groups on WhatsApp, and monthly toppers recognition. You get healthy competition without Kota stress.',
  },
  ...NOIDA_COMPREHENSIVE_FAQS.online,
]

export default function NoidaVsKotaPage() {
  const kotaTotal = '3,53,000 - 5,40,000'
  const noidaTotal = '54,000 - 1,04,000'

  return (
    <>
      <NoidaPageSchemas
        area="Noida"
        pageName="NEET Coaching: Noida vs Kota Comparison"
        pageDescription="Complete comparison of NEET coaching in Noida vs Kota. Save Rs 2-3 lakh, study from home, get 98% success rate."
        pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-noida-vs-kota"
        breadcrumbs={[
          { name: 'Home', url: 'https://cerebrumbiologyacademy.com' },
          { name: 'Noida', url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida' },
          { name: 'vs Kota', url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida-vs-kota' },
        ]}
        customFAQs={faqs}
        shortAnswer="Stay in Noida for NEET! Save Rs 2-3 lakh on hostel costs, study from home with family support, get 98% success rate with online coaching. Cerebrum offers AIIMS faculty, small batches (10-40), and instant doubt support - all benefits of Kota without the expense."
      />
      <NoidaEventSchema />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm mb-6">
              <Award className="h-4 w-4" />
              <span>2026 Decision Guide</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="true">
              NEET Coaching: Noida vs Kota
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto hero-description">
              Should you go to Kota or stay in Noida? Complete comparison of costs, results, and
              lifestyle. Make an informed decision for NEET 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="bg-green-500/20 px-4 py-2 rounded-lg">
                <span className="text-green-400">Save Rs 2-3 Lakh</span>
              </div>
              <div className="bg-blue-500/20 px-4 py-2 rounded-lg">
                <span className="text-blue-400">98% Success Rate</span>
              </div>
              <div className="bg-purple-500/20 px-4 py-2 rounded-lg">
                <span className="text-purple-400">Study from Home</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="bg-green-50 border-l-4 border-green-500 py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-bold text-lg text-green-800 mb-2">Quick Answer</h2>
            <p className="text-gray-700 speakable-content" data-speakable="true">
              <strong>Stay in Noida!</strong> With online NEET coaching from Cerebrum (98% success rate),
              you save Rs 2-3 lakh on hostel/food, study with family support, and get AIIMS faculty
              guidance in small batches of 10-40 students. Same results, fraction of the cost.
            </p>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Cost Comparison: Noida vs Kota</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Kota Cost */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <Plane className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">Kota (Per Year)</h3>
                </div>
                <div className="space-y-3">
                  {costBreakdown.kota.map((item, i) => (
                    <div key={i} className="flex justify-between text-gray-700">
                      <span>{item.item}</span>
                      <span className="font-semibold">Rs {item.cost}</span>
                    </div>
                  ))}
                  <div className="border-t border-red-300 pt-3 flex justify-between font-bold text-red-800">
                    <span>Total</span>
                    <span>Rs {kotaTotal}</span>
                  </div>
                </div>
              </div>

              {/* Noida Cost */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-800">Noida (Per Year)</h3>
                </div>
                <div className="space-y-3">
                  {costBreakdown.noida.map((item, i) => (
                    <div key={i} className="flex justify-between text-gray-700">
                      <span>{item.item}</span>
                      <span className="font-semibold">
                        {item.cost === '0' ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `Rs ${item.cost}`
                        )}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-green-300 pt-3 flex justify-between font-bold text-green-800">
                    <span>Total</span>
                    <span>Rs {noidaTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-yellow-800 key-stat" data-speakable="true">
                You Save: Rs 2,49,000 - 4,36,000 per year by staying in Noida
              </p>
              <p className="text-gray-600 mt-2">
                That's enough for a laptop, books, and still have savings!
              </p>
            </div>
          </div>
        </section>

        {/* Factor-by-Factor Comparison */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Factor-by-Factor Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Factor</th>
                    <th className="px-6 py-4 text-left font-semibold text-green-700">Noida</th>
                    <th className="px-6 py-4 text-left font-semibold text-orange-700">Kota</th>
                    <th className="px-6 py-4 text-center font-semibold">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium">{row.factor}</td>
                      <td className="px-6 py-4 text-green-700">{row.noida}</td>
                      <td className="px-6 py-4 text-orange-700">{row.kota}</td>
                      <td className="px-6 py-4 text-center">
                        {row.winner === 'noida' ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            <CheckCircle className="h-4 w-4" /> Noida
                          </span>
                        ) : row.winner === 'kota' ? (
                          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                            <CheckCircle className="h-4 w-4" /> Kota
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            Tie
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl font-bold text-green-700">
                Noida wins in 8 out of 10 factors!
              </p>
            </div>
          </div>
        </section>

        {/* Why Stay in Noida */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Stay in Noida for NEET?</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Family Support',
                  description: 'Home food, emotional support, no homesickness. Parents can monitor progress daily.',
                },
                {
                  icon: IndianRupee,
                  title: 'Save Rs 2-3 Lakh',
                  description: 'No hostel, food, or travel expenses. Invest savings in better resources.',
                },
                {
                  icon: Users,
                  title: 'Small Batches',
                  description: '10-40 students vs 100+ in Kota. More personal attention and doubt resolution.',
                },
                {
                  icon: Wifi,
                  title: 'Flexible Learning',
                  description: 'Miss a class? Watch recording. Revise anytime. Not possible in Kota.',
                },
                {
                  icon: Clock,
                  title: 'Instant Doubt Support',
                  description: 'WhatsApp support 7am-11pm. No waiting in queues like Kota.',
                },
                {
                  icon: Award,
                  title: '98% Success Rate',
                  description: 'Cerebrum students have higher success rate than average Kota student.',
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                )
              })}
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
            <h2 className="text-3xl font-bold mb-4">Stay in Noida. Get Kota Results.</h2>
            <p className="text-gray-300 mb-8">
              Join 1,200+ Noida students who chose smart preparation. Book your FREE demo class today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.number}?text=Hi, I'm comparing Noida vs Kota for NEET. Can you share more details?`}
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
