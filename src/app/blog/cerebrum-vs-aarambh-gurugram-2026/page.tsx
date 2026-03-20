import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cerebrum vs Aarambh Coaching Gurugram 2026 | Fees, Results, Faculty',
  description:
    'Detailed comparison of Cerebrum Biology Academy vs Aarambh Coaching Gurugram for NEET 2026. Compare fees, batch size, faculty, results, teaching methods. Honest review.',
  keywords: [
    'cerebrum vs aarambh',
    'aarambh coaching gurugram',
    'cerebrum biology academy gurugram',
    'neet coaching comparison gurugram',
    'aarambh vs cerebrum neet',
    'best small batch neet coaching gurugram',
    'aarambh coaching fees',
    'cerebrum coaching fees',
  ],
  openGraph: {
    title: 'Cerebrum vs Aarambh Coaching Gurugram 2026 | Fees, Results, Faculty',
    description:
      'Detailed comparison of Cerebrum Biology Academy vs Aarambh Coaching for NEET in Gurugram. Fees, batch size, faculty, success rates.',
    url: 'https://cerebrumbiologyacademy.com/blog/cerebrum-vs-aarambh-gurugram-2026',
    type: 'article',
    publishedTime: '2026-03-20',
    modifiedTime: '2026-03-20',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum vs Aarambh Coaching Gurugram 2026',
    description: 'Head-to-head NEET coaching comparison in Gurugram. Fees, faculty, results.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/blog/cerebrum-vs-aarambh-gurugram-2026',
  },
}

const comparisonData = [
  {
    feature: 'Subject Focus',
    cerebrum: 'Biology Specialist (NEET Biology only)',
    aarambh: 'All Subjects (Physics, Chemistry, Biology)',
    winner: 'depends',
    note: 'Cerebrum wins for Biology mastery; Aarambh for all-subject coverage',
  },
  {
    feature: 'Annual Fees',
    cerebrum: '₹48,000 – ₹98,000',
    aarambh: '₹60,000 – ₹1,20,000',
    winner: 'cerebrum',
    note: 'Cerebrum is 20-40% more affordable',
  },
  {
    feature: 'Batch Size',
    cerebrum: '15–20 students',
    aarambh: '10–15 students',
    winner: 'aarambh',
    note: 'Aarambh has slightly smaller batches',
  },
  {
    feature: 'Faculty Background',
    cerebrum: 'AIIMS Senior Faculty (Dr. Shekhar Singh)',
    aarambh: 'IIT/NIT Alumni',
    winner: 'cerebrum',
    note: 'For Biology, AIIMS background is directly relevant to NEET',
  },
  {
    feature: 'Success Rate (Biology)',
    cerebrum: '98% students score 300+ in Biology',
    aarambh: '~85% overall NEET qualification',
    winner: 'cerebrum',
    note: 'Cerebrum has higher Biology-specific results',
  },
  {
    feature: 'Teaching Methodology',
    cerebrum: 'NCERT-first approach with AIIMS clinical examples',
    aarambh: 'Concept-based with IIT problem-solving approach',
    winner: 'cerebrum',
    note: 'NEET Biology is NCERT-heavy; Cerebrum aligns better',
  },
  {
    feature: 'Online Classes',
    cerebrum: 'Yes — live interactive + recorded lectures',
    aarambh: 'Limited online options',
    winner: 'cerebrum',
    note: 'Cerebrum offers full online mode with same faculty',
  },
  {
    feature: 'Doubt Clearing',
    cerebrum: 'Daily 1-on-1 with faculty (not TAs)',
    aarambh: 'Regular doubt sessions',
    winner: 'cerebrum',
    note: 'Faculty-led doubt clearing is rarer and more effective',
  },
  {
    feature: 'Study Material',
    cerebrum: 'AIIMS-curated Biology notes, 19,000+ MCQs',
    aarambh: 'Comprehensive PCB material',
    winner: 'cerebrum',
    note: 'Cerebrum has deeper Biology question bank',
  },
  {
    feature: 'Test Series',
    cerebrum: 'Weekly Biology tests + NEET mock papers',
    aarambh: 'Regular full-length NEET mocks',
    winner: 'tie',
    note: 'Both offer strong test practice',
  },
  {
    feature: 'Google Rating',
    cerebrum: '5.0 (100+ reviews)',
    aarambh: '4.5 (50+ reviews)',
    winner: 'cerebrum',
    note: 'Cerebrum has perfect rating with more reviews',
  },
  {
    feature: 'Established Since',
    cerebrum: '2018',
    aarambh: '2020',
    winner: 'cerebrum',
    note: 'Cerebrum has longer track record in Gurugram',
  },
]

const faqs = [
  {
    question: 'Is Cerebrum or Aarambh better for NEET Biology in Gurugram?',
    answer:
      'Cerebrum Biology Academy is better for NEET Biology specifically. It is a Biology-specialist institute with AIIMS-trained faculty, while Aarambh covers all three subjects with IIT/NIT faculty. If Biology is your weak subject or you want Biology mastery, Cerebrum is the clear choice. If you need all-subject coaching under one roof, Aarambh is a solid option.',
  },
  {
    question: 'What is the fee difference between Cerebrum and Aarambh?',
    answer:
      'Cerebrum charges ₹48,000-98,000 per year while Aarambh charges ₹60,000-1,20,000. Cerebrum is 20-40% more affordable. Many students join Cerebrum for Biology and a separate coaching for Physics/Chemistry, and the total cost is still comparable to Aarambh alone.',
  },
  {
    question: 'Which has better faculty — Cerebrum or Aarambh?',
    answer:
      'For Biology, Cerebrum has superior faculty. Dr. Shekhar Singh is an AIIMS Senior Faculty member with 15+ years of medical teaching. Aarambh has IIT/NIT alumni who are strong in Physics and Maths but lack medical background for Biology. Since Biology carries 360/720 marks in NEET, this faculty difference matters significantly.',
  },
  {
    question: 'Can I join both Cerebrum and Aarambh?',
    answer:
      'Yes, some students join Cerebrum for Biology and Aarambh for Physics/Chemistry. This hybrid approach gives you specialist expertise in Biology (the highest-weightage subject) while maintaining all-subject coverage. Check batch timings to ensure no conflicts.',
  },
  {
    question: 'Which coaching has smaller batches?',
    answer:
      'Aarambh has slightly smaller batches (10-15 students) compared to Cerebrum (15-20 students). However, both are far smaller than large institutes like Aakash (60-120) or Allen (80-150). The practical difference between 15 and 10 students per batch is minimal — both allow genuine personal attention.',
  },
  {
    question: 'How do I decide between Cerebrum and Aarambh for NEET 2026?',
    answer:
      'Ask yourself: (1) Is Biology your weakest subject? Choose Cerebrum. (2) Do you need all subjects under one roof? Consider Aarambh. (3) Is budget important? Cerebrum is 20-40% cheaper. (4) Do you value medical-background faculty for Biology? Cerebrum wins. We recommend attending a free demo at both before deciding — call 88264-44334 for a Cerebrum demo.',
  },
]

export default function CerebrumVsAarambhPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Cerebrum vs Aarambh: Which Gurugram NEET Coaching is Better?',
    description:
      'Detailed comparison of Cerebrum Biology Academy vs Aarambh Coaching Gurugram for NEET 2026.',
    author: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    mainEntityOfPage:
      'https://cerebrumbiologyacademy.com/blog/cerebrum-vs-aarambh-gurugram-2026',
  }

  const faqSchema = {
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
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://cerebrumbiologyacademy.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cerebrum vs Aarambh Gurugram 2026',
        item: 'https://cerebrumbiologyacademy.com/blog/cerebrum-vs-aarambh-gurugram-2026',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="max-w-4xl mx-auto px-4 pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-green-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-green-600">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Cerebrum vs Aarambh 2026</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
              Comparison
            </span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
              Updated March 2026
            </span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">8 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Cerebrum vs Aarambh: Which Gurugram NEET Coaching is Better?
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Both Cerebrum Biology Academy and Aarambh Coaching are among the top small-batch NEET
            coaching institutes in Gurugram. But they take fundamentally different approaches —
            Cerebrum is a Biology specialist with AIIMS faculty, while Aarambh covers all NEET
            subjects with IIT/NIT-trained teachers. This honest, data-driven comparison covers fees,
            batch size, faculty credentials, success rates, teaching methodology, and student
            support to help you make the right choice for NEET 2026.
          </p>
        </header>

        {/* Quick Verdict */}
        <section className="max-w-4xl mx-auto px-4 pb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Verdict</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-5 border border-green-200">
                <div className="font-bold text-green-700 text-lg mb-2">
                  Choose Cerebrum if...
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    Biology is your weak subject or you want 300+ in Biology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    You value AIIMS-trained faculty for medical entrance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    Budget matters — 20-40% lower fees
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    You want online + offline flexibility
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5 border border-blue-200">
                <div className="font-bold text-blue-700 text-lg mb-2">
                  Choose Aarambh if...
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                    You need all three subjects (PCB) under one roof
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                    You prefer the absolute smallest batch (10-15)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
                    You value IIT/NIT teaching methodology for Physics/Chemistry
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Head-to-Head Comparison — 12 Parameters
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Parameter</th>
                  <th className="px-4 py-3 font-semibold text-green-700">Cerebrum</th>
                  <th className="px-4 py-3 font-semibold text-blue-700">Aarambh</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Winner</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.feature}</td>
                    <td
                      className={`px-4 py-3 ${row.winner === 'cerebrum' ? 'text-green-700 font-semibold' : 'text-gray-700'}`}
                    >
                      {row.cerebrum}
                    </td>
                    <td
                      className={`px-4 py-3 ${row.winner === 'aarambh' ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}
                    >
                      {row.aarambh}
                    </td>
                    <td className="px-4 py-3">
                      {row.winner === 'cerebrum' && (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          Cerebrum
                        </span>
                      )}
                      {row.winner === 'aarambh' && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          Aarambh
                        </span>
                      )}
                      {row.winner === 'tie' && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
                          Tie
                        </span>
                      )}
                      {row.winner === 'depends' && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          Depends
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Cerebrum wins 8 of 12 parameters. Aarambh wins 1 (batch size). 1 tie. 2 depend on
            student needs.
          </p>
        </section>

        {/* Detailed Analysis Sections */}
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Detailed Analysis — Key Differences
          </h2>

          {/* Fees */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Fees Comparison</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cerebrum charges ₹48,000-98,000 per year for Biology-focused NEET coaching, while
              Aarambh charges ₹60,000-1,20,000 for all-subject coaching. On the surface, Aarambh
              appears to offer more subjects for a slightly higher price. However, the per-subject
              cost tells a different story: Aarambh&apos;s Biology teaching costs roughly ₹20,000-40,000
              per subject, whereas Cerebrum dedicates the entire fee to Biology mastery with
              AIIMS-level depth.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Many students combine Cerebrum (₹48K-98K for Biology) with a separate
              Physics/Chemistry coaching (₹30K-60K), bringing the total to ₹78K-1.58L — comparable
              to Aarambh but with specialist expertise in Biology, which carries 360 of 720 NEET
              marks.
            </p>
          </div>

          {/* Faculty */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Faculty Credentials</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              This is where the biggest difference lies. Cerebrum is led by Dr. Shekhar Singh, an
              AIIMS Senior Faculty member with 15+ years of teaching Biology to medical students.
              His clinical background means students learn Biology with real-world medical context —
              exactly what NEET examiners test. Every Biology concept is connected to its medical
              application.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aarambh&apos;s faculty comes from IIT/NIT backgrounds, which is excellent for Physics and
              Mathematics but not directly aligned with medical entrance Biology. For NEET, where
              Biology is the highest-weightage subject (360/720 marks), having a faculty member who
              has taught at India&apos;s top medical college is a significant advantage.
            </p>
          </div>

          {/* Teaching Methodology */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Teaching Methodology</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cerebrum follows an NCERT-first methodology, which is critical because 90%+ of NEET
              Biology questions come directly from NCERT. Each NCERT line is taught with AIIMS-level
              depth, clinical examples, and previous year question mapping. This approach has resulted
              in students consistently scoring 300+ in Biology.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Aarambh uses a concept-based approach rooted in IIT problem-solving methodology. While
              this works well for Physics, Biology requires a different approach — memorization of
              facts, understanding of diagrams, and NCERT alignment. The IIT-style analytical
              approach is less aligned with how NEET Biology is actually tested.
            </p>
          </div>

          {/* Student Support */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">4. Student Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Both institutes offer strong student support due to small batch sizes. Cerebrum
              provides daily 1-on-1 doubt-clearing sessions directly with faculty (not teaching
              assistants), weekly performance tracking, parent-teacher meetings, and personalized
              study plans. Aarambh offers regular doubt sessions and mentoring. Both are far superior
              to large institutes where students are just numbers.
            </p>
          </div>

          {/* Online Availability */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3">5. Online Availability</h3>
            <p className="text-gray-600 leading-relaxed">
              Cerebrum offers fully functional online classes with the same AIIMS faculty, live
              interactive sessions, recorded lecture access, and digital study material. This is
              valuable for students in Gurugram sectors far from the center, or those who prefer
              hybrid learning. Aarambh has limited online options, making it primarily an
              offline-only choice.
            </p>
          </div>
        </section>

        {/* Scorecard */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Scorecard</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Cerebrum Biology Academy
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Biology Faculty</span>
                    <span className="font-bold text-green-700">10/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fees (Value)</span>
                    <span className="font-bold text-green-700">9/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-bold text-green-700">10/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Study Material</span>
                    <span className="font-bold text-green-700">9/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Online Mode</span>
                    <span className="font-bold text-green-700">9/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subject Coverage</span>
                    <span className="font-bold text-yellow-600">6/10</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Overall</span>
                    <span className="font-bold text-green-700 text-lg">8.8/10</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
                <h3 className="text-xl font-bold text-blue-700 mb-4">Aarambh Coaching</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Biology Faculty</span>
                    <span className="font-bold text-blue-700">7/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fees (Value)</span>
                    <span className="font-bold text-blue-700">7/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-bold text-blue-700">8/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Study Material</span>
                    <span className="font-bold text-blue-700">7/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Online Mode</span>
                    <span className="font-bold text-blue-700">5/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subject Coverage</span>
                    <span className="font-bold text-blue-700">9/10</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Overall</span>
                    <span className="font-bold text-blue-700 text-lg">7.2/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions — Cerebrum vs Aarambh
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Experience the Cerebrum Difference — Free Demo Class
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Still not sure? Attend a free Biology demo class at Cerebrum. See the AIIMS-faculty
              teaching style, small batch environment, and decide for yourself.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/book-free-demo"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors text-lg"
              >
                Book Free Demo
              </Link>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white border border-green-400 px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors text-lg"
              >
                Call 88264-44334
              </a>
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20read%20the%20Cerebrum%20vs%20Aarambh%20comparison.%20I%20want%20to%20book%20a%20demo."
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white border border-green-400 px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors text-lg"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/neet-coaching-gurugram"
              className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="font-medium text-gray-900">NEET Coaching Gurugram</div>
              <p className="text-sm text-gray-500 mt-1">Complete Gurugram coaching guide</p>
            </Link>
            <Link
              href="/blog/top-10-neet-coaching-gurugram-2026"
              className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Top 10 NEET Coaching 2026</div>
              <p className="text-sm text-gray-500 mt-1">All 10 institutes ranked</p>
            </Link>
            <Link
              href="/courses"
              className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Our Courses</div>
              <p className="text-sm text-gray-500 mt-1">Biology courses for NEET 2026</p>
            </Link>
            <Link
              href="/book-free-demo"
              className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Book Free Demo</div>
              <p className="text-sm text-gray-500 mt-1">Try a class before enrolling</p>
            </Link>
            <Link
              href="/neet-coaching-fees-gurugram"
              className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="font-medium text-gray-900">NEET Coaching Fees</div>
              <p className="text-sm text-gray-500 mt-1">Detailed fee breakdown</p>
            </Link>
            <Link
              href="/cerebrum-vs-aakash"
              className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="font-medium text-gray-900">Cerebrum vs Aakash</div>
              <p className="text-sm text-gray-500 mt-1">Another head-to-head comparison</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}
