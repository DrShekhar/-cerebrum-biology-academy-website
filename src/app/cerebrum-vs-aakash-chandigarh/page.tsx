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
  MapPin,
  Calculator,
  Target,
  Building,
  Gift,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faqs = [
  {
    question: 'How is Cerebrum different from Aakash Chandigarh for NEET Biology?',
    answer:
      'Cerebrum offers small batches of 10-15 students compared to Aakash Chandigarh\'s 100+ students per batch. Our faculty is exclusively AIIMS-trained, while Aakash has mixed faculty backgrounds. You get daily 1-on-1 doubt sessions vs crowded doubt counters. Fees are Rs 24K-68K vs Rs 1-3.5 Lakhs at Aakash. Despite being a specialized Biology institute, our 98% success rate rivals Aakash\'s results.',
  },
  {
    question: 'How many Aakash centers are there in Chandigarh Tricity?',
    answer:
      'Aakash Institute has 7 centers across Chandigarh Tricity: Sector 34, Sector 17, Sector 22, Panchkula, Mohali Phase 7, Mohali Sector 70, and Zirakpur. Despite multiple locations, batch sizes remain 100+ students. Cerebrum offers online classes accessible from any Tricity location with significantly smaller batches of 10-15 students.',
  },
  {
    question: 'What is the ANTHE scholarship at Aakash and how does Cerebrum compare?',
    answer:
      'ANTHE (Aakash National Talent Hunt Exam) offers scholarships up to 90% on Aakash fees. However, base fees of Rs 1-3.5 Lakhs mean even with 50% scholarship, you pay Rs 50K-1.75L. Cerebrum offers merit-based discounts on already affordable Rs 24K-68K fees, plus our 7-day trial with money-back guarantee - no scholarship exam needed.',
  },
  {
    question: 'Is Aakash Chandigarh\'s 36+ years experience an advantage?',
    answer:
      'Aakash\'s 36+ years of experience in coaching is indeed valuable. However, experience alone doesn\'t guarantee personalized attention. A 100+ student batch with experienced faculty still means limited individual focus. Cerebrum combines experienced AIIMS faculty with small 10-15 batches - giving you both expertise AND personal attention.',
  },
  {
    question: 'Can I join Cerebrum for Biology while continuing at Aakash Chandigarh for Physics/Chemistry?',
    answer:
      'Absolutely! Many Tricity students take this hybrid approach. Continue Aakash for Physics and Chemistry, but boost your Biology with Cerebrum\'s AIIMS faculty. Our flexible evening and weekend batches complement Aakash\'s schedule. Students who tried this approach improved their Biology scores by 50-80 marks.',
  },
  {
    question: 'Why do students switch from Aakash Chandigarh to Cerebrum?',
    answer:
      'Common reasons include: 1) Large batch sizes (100+) making personal attention impossible, 2) Long wait times at doubt counters, 3) Generic teaching not specialized for Biology, 4) High fees even with ANTHE discounts, 5) Multiple centers but same crowded experience. Students switching to Cerebrum report better conceptual clarity and improved confidence.',
  },
  {
    question: 'What is the batch size comparison between Cerebrum and Aakash Chandigarh?',
    answer:
      'Aakash Chandigarh operates with 100+ students per batch across all 7 centers. Cerebrum strictly limits batches to 10-15 students. This 7-10x smaller batch size means every student gets individual attention, personalized feedback on tests, and guaranteed time with faculty for doubt clearing - regardless of your Tricity location.',
  },
  {
    question: 'How does the fee structure compare between Cerebrum and Aakash Chandigarh?',
    answer:
      'Aakash Chandigarh fees range from Rs 1-3.5 Lakhs per year for different programs. Even with ANTHE scholarship (typically 20-50%), costs remain Rs 50K-2.8L. Cerebrum offers complete NEET Biology at Rs 24K-68K. You save Rs 30K-2.8 Lakhs while getting smaller batches and AIIMS faculty.',
  },
  {
    question: 'Is online coaching from Cerebrum as effective as Aakash Chandigarh offline classes?',
    answer:
      'Our 98% success rate proves online coaching effectiveness. Benefits include: live interactive classes (not recorded), instant doubt clearing via screen share, 7am-11pm WhatsApp support, recorded sessions for revision. Many students prefer focused online learning over traveling to crowded Aakash centers.',
  },
  {
    question: 'How does faculty qualification compare between Cerebrum and Aakash Chandigarh?',
    answer:
      'Cerebrum faculty is exclusively from AIIMS (Dr. Shekhar C Singh leads our team). Aakash has a larger faculty pool with varied backgrounds across their 7 Tricity centers. Our AIIMS-trained teachers bring clinical perspective to Biology, making complex topics easier to understand and remember for NEET.',
  },
  {
    question: 'Which Aakash Chandigarh center is best and how does Cerebrum compare?',
    answer:
      'Among Aakash\'s 7 Tricity centers, Sector 34 and Sector 17 are typically considered their flagship locations. However, all centers follow similar large-batch methodology. Cerebrum\'s online model delivers consistent quality to students across Chandigarh, Panchkula, Mohali without the variability of different center experiences.',
  },
  {
    question: 'Does Cerebrum offer test series like Aakash\'s AIATS?',
    answer:
      'Aakash offers AIATS (All India Aakash Test Series) for competitive benchmarking. Cerebrum provides 50+ Biology-specific mock tests with AI-powered analysis. Our tests focus deeply on Biology with detailed topic-wise feedback, while AIATS covers all subjects. Many students use Cerebrum tests alongside Aakash\'s for comprehensive preparation.',
  },
]

const comparisonData = [
  {
    feature: 'Batch Size',
    cerebrum: '10-15 students',
    aakash: '100+ students',
    winner: 'cerebrum',
  },
  {
    feature: 'Tricity Centers',
    cerebrum: 'Online (Pan-Tricity)',
    aakash: '7 physical centers',
    winner: 'tie',
  },
  {
    feature: 'Faculty Background',
    cerebrum: 'AIIMS-trained (Dr. Shekhar)',
    aakash: 'Mixed faculty pool',
    winner: 'cerebrum',
  },
  {
    feature: 'Annual Fees',
    cerebrum: 'Rs 24,000 - Rs 68,000',
    aakash: 'Rs 1 - 3.5 Lakhs',
    winner: 'cerebrum',
  },
  {
    feature: 'Subject Focus',
    cerebrum: 'Biology Specialized',
    aakash: 'All subjects (PCB)',
    winner: 'tie',
  },
  {
    feature: 'Industry Experience',
    cerebrum: '15+ years',
    aakash: '36+ years',
    winner: 'tie',
  },
  {
    feature: 'Doubt Clearing',
    cerebrum: 'Daily 1-on-1 sessions',
    aakash: 'Crowded doubt counters',
    winner: 'cerebrum',
  },
  {
    feature: 'Personal Attention',
    cerebrum: 'Every student tracked',
    aakash: 'Limited in large batches',
    winner: 'cerebrum',
  },
  {
    feature: 'Scholarship',
    cerebrum: 'Merit discounts + 7-day trial',
    aakash: 'ANTHE (up to 90%)',
    winner: 'tie',
  },
  {
    feature: 'Mock Tests',
    cerebrum: '50+ Biology-specific tests',
    aakash: 'AIATS (all subjects)',
    winner: 'tie',
  },
  {
    feature: 'Parent Updates',
    cerebrum: 'Weekly progress reports',
    aakash: 'Periodic PTMs',
    winner: 'cerebrum',
  },
  {
    feature: 'Test Analysis',
    cerebrum: 'AI-powered weakness detection',
    aakash: 'Basic rank analysis',
    winner: 'cerebrum',
  },
]

const aakashCenters = [
  { name: 'Sector 34 Center', area: 'Chandigarh', type: 'Flagship' },
  { name: 'Sector 17 Center', area: 'Chandigarh', type: 'Main' },
  { name: 'Sector 22 Center', area: 'Chandigarh', type: 'Branch' },
  { name: 'Panchkula Center', area: 'Panchkula', type: 'Branch' },
  { name: 'Phase 7 Center', area: 'Mohali', type: 'Branch' },
  { name: 'Sector 70 Center', area: 'Mohali', type: 'Branch' },
  { name: 'Zirakpur Center', area: 'Zirakpur', type: 'Branch' },
]

const reasonsToSwitch = [
  {
    title: 'Lost in 100+ Student Batches?',
    description:
      "Aakash's 100+ student batches across all 7 Tricity centers mean teachers can't provide individual attention. At Cerebrum, with 10-15 students, you're personally mentored by AIIMS faculty.",
    icon: Users,
  },
  {
    title: 'Biology Needs Medical Insight',
    description:
      'Our AIIMS faculty connects Biology to clinical applications, making topics memorable. Generic coaching across all subjects can\'t provide this specialized medical perspective.',
    icon: BookOpen,
  },
  {
    title: 'ANTHE Doesn\'t Solve Everything',
    description:
      'Even with 50% ANTHE scholarship, Aakash costs Rs 50K-1.75L. Cerebrum\'s base fees of Rs 24K-68K with merit discounts offer better value without competitive scholarship exams.',
    icon: Gift,
  },
  {
    title: 'Quality Over Quantity',
    description:
      'Aakash\'s 36+ years and 7 centers mean scale, not necessarily quality attention. Cerebrum focuses on depth with AIIMS expertise in small batches - proven by 98% success rate.',
    icon: Target,
  },
]

const successStories = [
  {
    name: 'Simran Kaur',
    score: '668/720',
    previousInstitute: 'Ex-Aakash Sector 34',
    location: 'Chandigarh',
    quote:
      'After Class 11 at Aakash Sector 34, I couldn\'t cope with 100+ students competing for teacher attention. Switched to Cerebrum and my Biology improved from 280 to 355. The personal attention made all the difference!',
    improvement: '+75 in Biology',
  },
  {
    name: 'Arjun Mehta',
    score: '645/720',
    previousInstitute: 'Aakash + Cerebrum',
    location: 'Mohali Phase 7',
    quote:
      'I kept Aakash Mohali for Physics/Chemistry but added Cerebrum for Biology. Their AIIMS faculty explained concepts with clinical relevance. Biology became my scoring subject with 340+ marks.',
    improvement: 'Biology strongest subject',
  },
  {
    name: 'Neha Sharma',
    score: '632/720',
    previousInstitute: 'Dropper (Ex-Aakash)',
    location: 'Panchkula',
    quote:
      'First attempt with Aakash Panchkula center - 498 marks. Too many students, too little attention. Cerebrum\'s dropper batch with 15 students and daily mentoring helped me cross 630!',
    improvement: '+134 overall',
  },
]

const savingsBreakdown = [
  { item: 'Course Fee (Without Scholarship)', cerebrum: 'Rs 68,000', aakash: 'Rs 2,50,000', savings: 'Rs 1,82,000' },
  { item: 'Course Fee (With 50% ANTHE)', cerebrum: 'Rs 68,000', aakash: 'Rs 1,25,000', savings: 'Rs 57,000' },
  { item: 'Study Material Cost', cerebrum: 'Included', aakash: 'Rs 15,000', savings: 'Rs 15,000' },
  { item: 'Annual Commute Cost', cerebrum: 'Rs 0 (Online)', aakash: 'Rs 24,000', savings: 'Rs 24,000' },
]

export default function CerebrumVsAakashChandigarhPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'cerebrum-vs-aakash-chandigarh',
      message:
        'Hi! I am comparing Cerebrum vs Aakash Chandigarh for NEET Biology coaching. Please share how Cerebrum is better for Tricity students.',
      campaign: 'aakash-chandigarh-comparison',
    })
  }

  const totalSavings = savingsBreakdown.reduce(
    (acc, item) => acc + parseInt(item.savings.replace(/[^0-9]/g, '')),
    0
  )

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cerebrum vs Aakash Chandigarh NEET Coaching Comparison',
    description:
      'Detailed comparison of Cerebrum Biology Academy vs Aakash Institute Chandigarh for NEET Biology preparation in Chandigarh Tricity',
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
          name: 'Aakash Institute Chandigarh',
          description: 'Large coaching institute with 7 centers in Chandigarh Tricity offering NEET/JEE preparation',
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
        name: 'Cerebrum vs Aakash Chandigarh',
        item: 'https://cerebrumbiologyacademy.com/cerebrum-vs-aakash-chandigarh',
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
              <span className="text-[#1e3a5f] font-medium">Cerebrum vs Aakash</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#1e3a5f] via-[#2d5a87] to-[#3d7ab5] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#4ade80] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building className="w-4 h-4" />
              Vs All 7 Aakash Tricity Centers
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Cerebrum vs Aakash Chandigarh
              <span className="block text-[#4ade80] mt-2">NEET Biology Coaching Comparison</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Compare with all 7 Aakash centers in Chandigarh Tricity. See why 780+ students chose
              personalized AIIMS-faculty coaching over 100+ batch sizes.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-[#4ade80]" />
                <span>10-15 vs 100+ batch</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Building className="w-5 h-5 text-purple-400" />
                <span>Online vs 7 Centers</span>
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
              <p className="text-3xl font-bold text-orange-600">100+</p>
              <p className="text-sm text-gray-600">Aakash Batch Size</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">7</p>
              <p className="text-sm text-gray-600">Aakash Tricity Centers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">Rs 1.8L+</p>
              <p className="text-sm text-gray-600">Potential Annual Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aakash Centers Overview */}
      <section className="py-12 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-8 animate-fadeInUp"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Aakash Institute has 7 Centers in Chandigarh Tricity
            </h2>
            <p className="text-slate-600">
              Same 100+ batch size across all locations. Cerebrum offers better attention online.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {aakashCenters.map((center) => (
              <div key={center.name} className="bg-white rounded-xl p-4 shadow-sm text-center">
                <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-sm text-slate-800">{center.name}</p>
                <p className="text-xs text-slate-500">{center.area}</p>
                <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {center.type}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              <span className="font-semibold">Cerebrum Advantage:</span> One consistent quality online
              experience accessible from any Tricity location
            </p>
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
              Why Chandigarh Students Switch from Aakash to Cerebrum
            </h2>
            <p className="text-xl text-slate-600">
              Common challenges across all 7 Aakash centers that bring students to us
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
              Cerebrum vs Aakash Chandigarh: Detailed Comparison
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
                  <th className="px-6 py-4 text-center font-semibold">Aakash Chandigarh</th>
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
                        <span className="text-slate-600">{row.aakash}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-slate-600">
              <span className="font-bold text-[#1e3a5f]">Cerebrum wins in 7 out of 12 factors</span>{' '}
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
              How Much Can You Save vs Aakash Chandigarh?
            </h2>
            <p className="text-xl text-slate-600">
              Even with ANTHE scholarship, see the real cost comparison
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#1e3a5f] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Expense Item</th>
                    <th className="px-6 py-4 text-center">Cerebrum</th>
                    <th className="px-6 py-4 text-center">Aakash</th>
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
                      <td className="px-6 py-4 text-center text-red-600">{item.aakash}</td>
                      <td className="px-6 py-4 text-center text-green-700 font-bold bg-green-50">
                        {item.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-green-600 text-white">
                  <tr>
                    <td className="px-6 py-4 font-bold text-lg" colSpan={3}>
                      Maximum Annual Savings (Without ANTHE)
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-2xl">
                      Rs {totalSavings.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                About ANTHE Scholarship
              </h3>
              <p className="text-yellow-700 text-sm">
                ANTHE offers up to 90% scholarship, but most students get 20-50% discount. Even with
                50% ANTHE discount, Aakash costs Rs 1.25L+ vs Cerebrum's Rs 68K maximum. Plus, our
                7-day trial with money-back guarantee requires no scholarship exam!
              </p>
            </div>

            <div className="mt-8 text-center">
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
              Ex-Aakash Students Who Made the Switch
            </h2>
            <p className="text-xl text-slate-300">
              Real results from students across different Aakash centers
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
      <section className="py-16 bg-gradient-to-br from-purple-600 to-[#1e3a5f] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
             className="animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't Want to Leave Aakash?
                <br />
                Complement Your Biology!
              </h2>
              <p className="text-xl text-purple-100 mb-6">
                Continue at any of Aakash's 7 Tricity centers for Physics & Chemistry while boosting
                Biology with Cerebrum. Our flexible timing works with any Aakash schedule.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Evening batches after Aakash classes',
                  'Weekend intensive Biology sessions',
                  'Online format - accessible from any center area',
                  'Focus on Biology weak areas',
                  'No schedule conflicts',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demo-booking">
                <Button className="bg-white text-[#1e3a5f] hover:bg-purple-50">
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
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="font-bold">Ak</span>
                  </div>
                  <div>
                    <p className="font-semibold">Aakash (Any Center) for P & C</p>
                    <p className="text-sm text-purple-200">Physics & Chemistry preparation</p>
                  </div>
                </div>
                <div className="text-center text-2xl">+</div>
                <div className="flex items-center gap-4 p-4 bg-[#4ade80]/30 rounded-xl border border-[#4ade80]">
                  <div className="w-12 h-12 bg-[#4ade80] rounded-lg flex items-center justify-center text-[#1e3a5f]">
                    <span className="font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-semibold">Cerebrum for Biology</p>
                    <p className="text-sm text-purple-200">AIIMS faculty, 10-15 batch</p>
                  </div>
                </div>
                <div className="text-center text-2xl">=</div>
                <div className="bg-green-500/30 p-4 rounded-xl border border-green-400 text-center">
                  <p className="font-bold text-lg">Maximum NEET Score!</p>
                  <p className="text-sm text-green-200">Best of both coaching styles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aakash Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              About Aakash Institute Chandigarh
            </h2>
            <p className="text-lg text-slate-600">Fair overview of Aakash's Tricity presence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Aakash Chandigarh Network
              </h3>
              <p className="text-slate-600 mb-4">
                Aakash Institute operates 7 centers across Chandigarh Tricity, covering Chandigarh
                city (Sectors 34, 17, 22), Panchkula, Mohali (Phase 7 & Sector 70), and Zirakpur.
                This extensive network provides accessibility for students across the region.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Note:</strong> Despite multiple locations, batch sizes remain 100+ at all
                  centers, following Aakash's standard large-batch methodology.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Aakash Chandigarh Strengths
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>36+ years experience</strong> - Established national brand
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>ANTHE scholarship</strong> - Up to 90% fee discount possible
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>7 Tricity centers</strong> - Wide accessibility
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    <strong>All-in-one</strong> - PCB under one roof
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Best for:</strong> Students who prefer offline classes, can qualify for
                  ANTHE scholarship, and can thrive in 100+ batch environments.
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
              Common questions about Cerebrum vs Aakash Chandigarh for NEET Biology
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
              href="/cerebrum-vs-allen-chandigarh"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[#1e3a5f]">Cerebrum vs Allen Chandigarh</h3>
              <p className="text-sm text-gray-600">Compare with Allen Sector 34</p>
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
              href="/cerebrum-vs-aakash-neet-coaching"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-[#1e3a5f]">Cerebrum vs Aakash (National)</h3>
              <p className="text-sm text-gray-600">Pan-India comparison</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Cerebrum Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 780+ Tricity students who chose personalized Biology coaching over crowded batches
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
