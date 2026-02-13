'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronDown,
  Phone,
  Play,
  Home,
  Users,
  Award,
  BookOpen,
  Star,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  IndianRupee,
  MapPin,
  Calculator,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faqs = [
  {
    question: 'How is Cerebrum different from Allen Chandigarh for NEET Biology?',
    answer:
      'Cerebrum offers small batches of 10-15 students compared to Allen Chandigarh\'s 60-100+ students per batch. Our faculty is exclusively AIIMS-trained, while Allen has mixed faculty backgrounds. You get daily 1-on-1 doubt sessions vs crowded doubt counters. Fees are Rs 24K-68K vs Rs 1.5-2.5 Lakhs at Allen. Our 98% success rate competes with Allen\'s results but with far better personalized attention.',
  },
  {
    question: 'Where is Allen Chandigarh located and how does Cerebrum compare for Tricity students?',
    answer:
      'Allen Chandigarh is located at Sector 34A, Industrial Area Phase 2. Students from Panchkula and Mohali spend 1-2 hours daily commuting to Sector 34. Cerebrum offers live online classes, eliminating commute entirely. Same quality teaching, zero travel time - study from the comfort of your home in any Tricity location.',
  },
  {
    question: 'What are Allen Chandigarh fees compared to Cerebrum for NEET 2026?',
    answer:
      'Allen Chandigarh fees range from Rs 1.5-2.5 Lakhs per year depending on the program. Cerebrum offers NEET Biology coaching at Rs 24,000-68,000 per year. Despite being 60-75% more affordable, Cerebrum provides smaller batches (10-15 vs 60-100+), AIIMS faculty, and dedicated Biology focus. Annual savings of Rs 80,000-1.8 Lakhs!',
  },
  {
    question: 'Did Allen Chandigarh produce AIR 7 in NEET 2025?',
    answer:
      'Yes, Keshav Mittal (AIR 7 in NEET 2025) is from Allen Chandigarh. Allen has proven results in top ranks. However, their model works for self-driven students who can handle large batch sizes. If you need personalized attention and are specifically weak in Biology, Cerebrum\'s specialized approach with AIIMS faculty may suit you better.',
  },
  {
    question: 'Can I join Cerebrum for Biology while continuing at Allen Chandigarh for Physics/Chemistry?',
    answer:
      'Absolutely! This is a popular combination among Tricity students. Continue Allen for Physics and Chemistry, but boost your Biology with Cerebrum\'s specialized coaching. Our flexible evening and weekend batches don\'t clash with Allen\'s schedule. Many students who took this approach improved their Biology scores by 50-80 marks.',
  },
  {
    question: 'Why do students switch from Allen Chandigarh to Cerebrum?',
    answer:
      'Common reasons include: 1) Large batch sizes (60-100+) making personal attention impossible, 2) Long wait times at doubt counters, 3) Difficulty keeping up in crowded classes, 4) High fees with limited Biology depth, 5) Commute stress from Panchkula/Mohali to Sector 34. Students switching to Cerebrum report better understanding and improved confidence.',
  },
  {
    question: 'What is the batch size comparison between Cerebrum and Allen Chandigarh?',
    answer:
      'Allen Chandigarh operates with 60-100+ students per batch in their regular programs. Cerebrum strictly limits batches to 10-15 students. This 6-8x smaller batch size means every student gets individual attention, personalized feedback on tests, and guaranteed time with faculty for doubt clearing.',
  },
  {
    question: 'Is online coaching from Cerebrum as effective as Allen Chandigarh offline classes?',
    answer:
      'Our 98% success rate proves online coaching effectiveness. Benefits include: live interactive classes (not recorded), instant screen sharing for doubt clearing, 7am-11pm WhatsApp support, recorded sessions for revision, no commute stress. Many students prefer our online model over spending 2 hours daily traveling to Sector 34.',
  },
  {
    question: 'How does faculty qualification compare between Cerebrum and Allen Chandigarh?',
    answer:
      'Cerebrum faculty is exclusively from AIIMS (Dr. Shekhar C Singh leads our team). Allen Chandigarh has a larger faculty pool with varied backgrounds - some excellent, some average. Our AIIMS-trained teachers bring real medical perspective to Biology, making concepts clinically relevant and easier to remember.',
  },
  {
    question: 'What study material does Cerebrum provide compared to Allen Chandigarh?',
    answer:
      'Allen provides comprehensive but bulky material covering all subjects. Cerebrum provides focused Biology material: NCERT-aligned notes, 15,000+ MCQ bank, previous year papers (2015-2025), 50+ topic-wise tests, AI-powered weakness analysis. Quality over quantity - our material is specifically designed for Biology mastery.',
  },
  {
    question: 'How much can I save by choosing Cerebrum over Allen Chandigarh?',
    answer:
      'Direct fee savings: Rs 80,000 to Rs 1.8 Lakhs per year. Additional savings: No commute costs (Rs 2,000-5,000/month for Panchkula/Mohali students), no hostel fees for outstation students, no food expenses during long coaching hours. Total annual savings can exceed Rs 2.5 Lakhs for some families.',
  },
  {
    question: 'Does Cerebrum have a physical center in Chandigarh like Allen?',
    answer:
      'Cerebrum operates primarily through live online classes for Chandigarh Tricity. Allen has a physical center at Sector 34A. Our online model provides advantages: no commute, flexible timing, recorded sessions for revision, same AIIMS faculty teaching every batch. Students from Sector 17 to Zirakpur get identical quality coaching.',
  },
]

const comparisonData = [
  {
    feature: 'Batch Size',
    cerebrum: '10-15 students',
    allen: '60-100+ students',
    winner: 'cerebrum',
  },
  {
    feature: 'Faculty Background',
    cerebrum: 'AIIMS-trained (Dr. Shekhar)',
    allen: 'Mixed faculty pool',
    winner: 'cerebrum',
  },
  {
    feature: 'Location',
    cerebrum: 'Online (Tricity-wide)',
    allen: 'Sector 34A, Industrial Area',
    winner: 'cerebrum',
  },
  {
    feature: 'Annual Fees',
    cerebrum: 'Rs 24,000 - Rs 68,000',
    allen: 'Rs 1.5 - 2.5 Lakhs',
    winner: 'cerebrum',
  },
  {
    feature: 'Subject Focus',
    cerebrum: 'Biology Specialized',
    allen: 'All subjects (PCB)',
    winner: 'tie',
  },
  {
    feature: 'Doubt Clearing',
    cerebrum: 'Daily 1-on-1 sessions',
    allen: 'Crowded doubt counters',
    winner: 'cerebrum',
  },
  {
    feature: 'Personal Attention',
    cerebrum: 'Every student tracked',
    allen: 'Limited in large batches',
    winner: 'cerebrum',
  },
  {
    feature: 'Commute Time (Panchkula)',
    cerebrum: 'Zero (Online)',
    allen: '45-60 mins one way',
    winner: 'cerebrum',
  },
  {
    feature: 'Top Results',
    cerebrum: '98% success rate',
    allen: 'AIR 7 (Keshav Mittal 2025)',
    winner: 'tie',
  },
  {
    feature: 'Mock Tests',
    cerebrum: '50+ Biology-specific tests',
    allen: 'Full-length PCB tests',
    winner: 'tie',
  },
  {
    feature: 'Parent Updates',
    cerebrum: 'Weekly progress reports',
    allen: 'Periodic PTMs',
    winner: 'cerebrum',
  },
  {
    feature: 'Test Analysis',
    cerebrum: 'AI-powered weakness detection',
    allen: 'Basic rank analysis',
    winner: 'cerebrum',
  },
]

const reasonsToSwitch = [
  {
    title: 'Lost in 60-100+ Student Batches?',
    description:
      "Allen Chandigarh's large batches mean teachers can't know every student. At Cerebrum, with 10-15 students, you're not just a roll number - you're personally mentored by AIIMS faculty.",
    icon: Users,
  },
  {
    title: 'Biology Needs Specialized Depth',
    description:
      "Biology isn't just memorization. Our AIIMS faculty connects concepts to clinical applications, making topics memorable. Generic coaching can't provide this medical perspective.",
    icon: BookOpen,
  },
  {
    title: 'Tired of Sector 34 Commute?',
    description:
      'Panchkula, Mohali, Zirakpur students spend 1-2 hours daily traveling to Allen. Our online classes save this time for actual studying. Same quality, zero commute.',
    icon: Clock,
  },
  {
    title: 'Save Rs 1+ Lakh Annually',
    description:
      'Allen fees of Rs 1.5-2.5 Lakhs vs Cerebrum Rs 24K-68K. Same success rate, better attention, massive savings. Use the difference for medical college expenses.',
    icon: IndianRupee,
  },
]

const successStories = [
  {
    name: 'Ananya Sharma',
    score: '678/720',
    previousInstitute: 'Ex-Allen Chandigarh',
    location: 'Panchkula',
    quote:
      "Switched from Allen after Class 11 because I couldn't get my doubts cleared in their large batches. Cerebrum's small batch and AIIMS faculty transformed my Biology preparation. Improved from 260 to 350 in Biology!",
    improvement: '+90 in Biology',
  },
  {
    name: 'Rohan Gupta',
    score: '652/720',
    previousInstitute: 'Allen + Cerebrum',
    location: 'Mohali',
    quote:
      'I continued Physics/Chemistry at Allen Sector 34 but joined Cerebrum for Biology. The specialized attention made Biology my strongest subject. No regrets about this combination!',
    improvement: 'Biology strongest subject',
  },
  {
    name: 'Priya Verma',
    score: '635/720',
    previousInstitute: 'Dropper (Ex-Allen)',
    location: 'Chandigarh Sec 35',
    quote:
      "After failing to qualify in my first attempt with Allen, I needed personalized guidance. Cerebrum's dropper batch with daily mentoring helped me improve by 95 marks.",
    improvement: '+95 overall',
  },
]

const savingsBreakdown = [
  { item: 'Course Fee Difference', cerebrum: 'Rs 68,000', allen: 'Rs 2,00,000', savings: 'Rs 1,32,000' },
  { item: 'Annual Commute Cost', cerebrum: 'Rs 0', allen: 'Rs 30,000', savings: 'Rs 30,000' },
  { item: 'Hostel (Outstation)', cerebrum: 'Rs 0', allen: 'Rs 1,20,000', savings: 'Rs 1,20,000' },
  { item: 'Food During Coaching', cerebrum: 'Rs 0', allen: 'Rs 24,000', savings: 'Rs 24,000' },
]

export default function CerebrumVsAllenChandigarhPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [calculatorScore, setCalculatorScore] = useState<number>(550)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'cerebrum-vs-allen-chandigarh',
      message:
        'Hi! I am comparing Cerebrum vs Allen Chandigarh for NEET Biology coaching. Please share how Cerebrum is better for Tricity students.',
      campaign: 'allen-chandigarh-comparison',
    })
  }

  const totalSavings = savingsBreakdown.reduce(
    (acc, item) => acc + parseInt(item.savings.replace(/[^0-9]/g, '')),
    0
  )

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cerebrum vs Allen Chandigarh NEET Coaching Comparison',
    description:
      'Detailed comparison of Cerebrum Biology Academy vs Allen Chandigarh for NEET Biology preparation in Chandigarh Tricity',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'EducationalOrganization',
          position: 1,
          name: 'Cerebrum Biology Academy',
          description:
            'Specialized NEET Biology coaching with small batches (10-15 students) and AIIMS faculty for Chandigarh Tricity',
        },
        {
          '@type': 'EducationalOrganization',
          position: 2,
          name: 'Allen Career Institute Chandigarh',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sector 34A, Industrial Area Phase 2',
            addressLocality: 'Chandigarh',
            addressRegion: 'Chandigarh',
            addressCountry: 'IN',
          },
          description: 'Large coaching institute offering NEET/JEE preparation in Chandigarh',
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Chandigarh',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-chandigarh',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cerebrum vs Allen Chandigarh',
        item: 'https://cerebrumbiologyacademy.com/cerebrum-vs-allen-chandigarh',
      },
    ],
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-[#1e3a5f]">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/neet-coaching-chandigarh" className="text-gray-600 hover:text-[#1e3a5f]">
                Chandigarh
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-[#1e3a5f] font-medium">Cerebrum vs Allen</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#4ade80] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Chandigarh Tricity Comparison 2026
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Cerebrum vs Allen Chandigarh
              <span className="block text-[#4ade80] mt-2">NEET Biology Coaching Comparison</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Honest comparison for Chandigarh, Panchkula & Mohali students. See why 780+ Tricity
              students chose personalized coaching over crowded Sector 34 batches.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-[#4ade80]" />
                <span>10-15 vs 60-100+ batch</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <IndianRupee className="w-5 h-5 text-yellow-400" />
                <span>Save Rs 1+ Lakh/year</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>98% Success Rate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-[#4ade80] text-[#1e3a5f] hover:bg-[#22c55e] font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-4 rounded-xl font-semibold animate-fadeInUp"
              >
                <MessageCircle className="w-5 h-5" />
                Ask Questions on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-[#1e3a5f]/5 border-y border-[#1e3a5f]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-[#1e3a5f]">10-15</p>
              <p className="text-sm text-gray-600">Cerebrum Batch Size</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">60-100+</p>
              <p className="text-sm text-gray-600">Allen Chandigarh Batch</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">Rs 1.3L+</p>
              <p className="text-sm text-gray-600">Annual Savings</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#1e3a5f]">780+</p>
              <p className="text-sm text-gray-600">Tricity Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Switch */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Chandigarh Students Switch from Allen to Cerebrum
            </h2>
            <p className="text-xl text-slate-600">
              Common challenges that bring Tricity students to personalized Biology coaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasonsToSwitch.map((reason, index) => (
              <div
                key={reason.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Cerebrum vs Allen Chandigarh: Detailed Comparison
            </h2>
            <p className="text-xl text-slate-600">
              Side-by-side comparison for NEET Biology preparation in Chandigarh Tricity
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-[#1e3a5f] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Factor</th>
                  <th className="px-6 py-4 text-center bg-[#4ade80]/20 font-semibold">
                    <span className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Cerebrum
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">Allen Chandigarh</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center bg-[#4ade80]/5">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                        <span className="text-slate-800">{row.cerebrum}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center gap-2">
                        {row.winner === 'cerebrum' && (
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                        <span className="text-slate-600">{row.allen}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-slate-600">
              <span className="font-bold text-[#1e3a5f]">Cerebrum wins in 9 out of 12 factors</span>{' '}
              for specialized Biology coaching in Chandigarh
            </p>
          </div>
        </div>
      </section>

      {/* Cost Savings Calculator */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              Annual Savings Calculator
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Much Can You Save vs Allen Chandigarh?
            </h2>
            <p className="text-xl text-slate-600">
              Complete cost comparison including hidden expenses
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#1e3a5f] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Expense Item</th>
                    <th className="px-6 py-4 text-center">Cerebrum</th>
                    <th className="px-6 py-4 text-center">Allen Chandigarh</th>
                    <th className="px-6 py-4 text-center bg-green-600">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  {savingsBreakdown.map((item, index) => (
                    <tr key={item.item} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium">{item.item}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">
                        {item.cerebrum}
                      </td>
                      <td className="px-6 py-4 text-center text-red-600">{item.allen}</td>
                      <td className="px-6 py-4 text-center text-green-700 font-bold bg-green-50">
                        {item.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-green-600 text-white">
                  <tr>
                    <td className="px-6 py-4 font-bold text-lg" colSpan={3}>
                      Total Annual Savings
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-2xl">
                      Rs {totalSavings.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-slate-600 mb-4">
                *Hostel savings applicable for outstation students. Commute savings for
                Panchkula/Mohali students.
              </p>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold animate-fadeInUp"
              >
                <MessageCircle className="w-5 h-5" />
                Get Detailed Fee Comparison on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Real Chandigarh Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tricity Students Who Made the Switch
            </h2>
            <p className="text-xl text-slate-300">
              Real results from Chandigarh, Panchkula, and Mohali students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={story.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-fadeInUp"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#4ade80] rounded-full flex items-center justify-center text-[#1e3a5f] font-bold text-lg">
                      {story.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">{story.name}</p>
                      <p className="text-sm text-slate-400">{story.previousInstitute}</p>
                      <p className="text-xs text-[#4ade80]">{story.location}</p>
                    </div>
                  </div>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {story.score}
                  </div>
                </div>
                <p className="text-slate-300 italic mb-4">"{story.quote}"</p>
                <div className="bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg text-sm font-medium">
                  {story.improvement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complement Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
             className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't Want to Leave Allen Chandigarh?
                <br />
                Complement Your Biology!
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Continue at Allen Sector 34 for Physics & Chemistry while boosting Biology with
                Cerebrum. Our flexible timing works perfectly with Allen's schedule.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Evening batches after Allen classes',
                  'Weekend intensive sessions',
                  'Online format - no extra commute',
                  'Focus on Biology weak areas',
                  'Complement without conflict',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-[#1e3a5f] hover:bg-blue-50">
                  Try a Free Biology Class <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-fadeInUp"
            >
              <h3 className="text-2xl font-bold mb-6">The Winning Chandigarh Combination</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold">Allen Sector 34 for P & C</p>
                    <p className="text-sm text-blue-200">Physics & Chemistry preparation</p>
                  </div>
                </div>
                <div className="text-center text-2xl">+</div>
                <div className="flex items-center gap-4 p-4 bg-[#4ade80]/30 rounded-xl border border-[#4ade80]">
                  <div className="w-12 h-12 bg-[#4ade80] rounded-lg flex items-center justify-center text-[#1e3a5f]">
                    <span className="font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold">Cerebrum for Biology</p>
                    <p className="text-sm text-blue-200">AIIMS faculty, 10-15 batch</p>
                  </div>
                </div>
                <div className="text-center text-2xl">=</div>
                <div className="bg-green-500/30 p-4 rounded-xl border border-green-400 text-center">
                  <p className="font-bold text-lg">Maximum NEET Score!</p>
                  <p className="text-sm text-green-200">Best of both worlds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Allen Chandigarh Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              About Allen Career Institute Chandigarh
            </h2>
            <p className="text-lg text-slate-600">Fair overview of Allen's Chandigarh center</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Allen Chandigarh Location
              </h3>
              <p className="text-slate-600 mb-4">
                <strong>Address:</strong> Sector 34A, Industrial Area Phase 2, Chandigarh
              </p>
              <p className="text-slate-600 mb-4">
                Allen Chandigarh is one of the prominent coaching centers in the Tricity region,
                located in the Industrial Area. Students from across Chandigarh, Panchkula, and
                Mohali commute to this center for NEET and JEE preparation.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Commute Challenge:</strong> Students from Panchkula Sector 15 or Mohali
                  Phase 11 may spend 45-60 minutes each way reaching Sector 34.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Allen Chandigarh Strengths
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>AIR 7 in NEET 2025</strong> - Keshav Mittal achieved top rank
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>Comprehensive preparation</strong> - All three subjects (PCB) covered
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>Brand recognition</strong> - Established national presence
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>Infrastructure</strong> - Large campus with facilities
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Best for:</strong> Self-driven students who can thrive in large batches
                  and need all-subject coaching under one roof.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Tools Widget */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Boost your Biology preparation with AI-powered tools"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="text-center mb-8 animate-fadeInUp"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">
              Common questions about Cerebrum vs Allen Chandigarh for NEET Biology
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm animate-fadeInUp"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Comparisons</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/cerebrum-vs-aakash-chandigarh"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[#1e3a5f]">Cerebrum vs Aakash Chandigarh</h3>
              <p className="text-sm text-gray-600">Compare with Aakash Institute</p>
            </Link>
            <Link
              href="/neet-coaching-chandigarh"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[#1e3a5f]">NEET Coaching Chandigarh</h3>
              <p className="text-sm text-gray-600">Complete Tricity guide</p>
            </Link>
            <Link
              href="/online-vs-offline-neet-coaching"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[#1e3a5f]">Online vs Offline</h3>
              <p className="text-sm text-gray-600">Which mode is better?</p>
            </Link>
            <Link
              href="/cerebrum-vs-allen-neet-coaching"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[#1e3a5f]">Cerebrum vs Allen (National)</h3>
              <p className="text-sm text-gray-600">Pan-India comparison</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Cerebrum Difference in Chandigarh?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 780+ Tricity students who chose personalized Biology coaching for better NEET
            results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-[#4ade80] text-[#1e3a5f] hover:bg-[#22c55e] font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-4 rounded-xl font-semibold animate-fadeInUp"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </button>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-[#1e3a5f]"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: 88264-44334
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
