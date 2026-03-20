import { Metadata } from 'next'
import Link from 'next/link'

const PHONE = '88264-44334'
const WA_LINK = 'https://wa.me/918826444334?text=Hi%2C%20I%20want%20to%20know%20about%20CBSE%20Biology%20Board%20coaching'

export const metadata: Metadata = {
  title: 'Score 95+ in CBSE Biology Boards 2026 | Board Coaching by AIIMS Faculty',
  description:
    'CBSE Biology board coaching — our students average 94%. NCERT mastery, diagram practice, 10 mock boards, answer writing workshop. ₹4K/month. Call 88264-44334.',
  keywords:
    'CBSE biology board coaching, biology 12th board coaching, CBSE biology class 12 preparation, board exam biology coaching, how to score 95 in biology boards, CBSE biology tuition, biology board exam coaching delhi',
  openGraph: {
    title: 'Score 95+ in CBSE Biology Boards 2026 | Board Coaching by AIIMS Faculty',
    description:
      'CBSE Biology board coaching — our students average 94%. NCERT mastery, diagram practice, 10 mock boards, answer writing workshop. ₹4K/month. Call 88264-44334.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/cbse-biology-board-coaching',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Score 95+ in CBSE Biology Boards 2026 | Board Coaching by AIIMS Faculty',
    description:
      'CBSE Biology board coaching — our students average 94%. NCERT mastery, diagram practice, 10 mock boards, answer writing workshop. ₹4K/month.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cbse-biology-board-coaching',
  },
}

const faqs = [
  {
    q: 'How to score 95+ in CBSE Biology boards?',
    a: 'Focus exclusively on NCERT — every line, diagram, and activity. Practice answer writing with keyword-based marking schemes. Attempt at least 10 full mock board papers under timed conditions. Join Cerebrum for structured board prep with AIIMS faculty guidance.',
  },
  {
    q: 'Is NCERT enough for CBSE Biology board exam?',
    a: 'Yes, 100% of CBSE Biology board questions come from NCERT. The problem is most students read NCERT superficially. At Cerebrum, we do line-by-line NCERT analysis so students understand every concept deeply enough to answer any question framing.',
  },
  {
    q: 'What are the fees for CBSE Biology board coaching?',
    a: 'Cerebrum charges ₹4,000/month which includes study material, 10 mock board papers, answer writing workshops, diagram mastery sessions, and daily doubt clearing. Compare this to private tutors who charge ₹8,000+ without any test series.',
  },
  {
    q: 'How many mock tests are needed for board exam preparation?',
    a: 'We recommend a minimum of 10 full mock board papers. Our students attempt 10 mock boards plus 5 sectional tests. Each paper is evaluated with detailed feedback on answer writing, diagrams, and keyword usage — exactly how CBSE evaluators mark.',
  },
  {
    q: 'Can I prepare for CBSE boards and NEET together?',
    a: 'Absolutely. 70% of NEET Biology syllabus overlaps with Class 12 CBSE. At Cerebrum, our integrated approach covers both — NCERT mastery for boards + MCQ practice for NEET. Most of our board toppers also crack NEET.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'CBSE Biology Board Coaching',
          item: 'https://cerebrumbiologyacademy.com/cbse-biology-board-coaching',
        },
      ],
    },
  ],
}

export default function CBSEBiologyBoardCoachingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
            CBSE Biology Board Coaching 2026
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Your Child Can Score <span className="text-yellow-400">95+</span> in CBSE Biology Boards
          </h1>
          <p className="mb-8 text-lg text-slate-300">
            Our students average <strong className="text-white">94%</strong> in Biology boards. Taught by AIIMS faculty with 15+ years of board exam expertise.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-free-demo"
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Book FREE Board Prep Demo
            </Link>
            <a
              href={`tel:+91${PHONE.replace(/-/g, '')}`}
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-slate-900"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Fear Stat */}
      <section className="bg-red-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-3xl font-bold text-slate-900">
            68% of Class 12 Students Score Below 80 in Biology
          </h2>
          <p className="mb-10 text-center text-lg text-slate-600">Here are the 3 mistakes they make:</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Studying guides, not NCERT', desc: 'Board papers are set 100% from NCERT. Guides add confusion and miss key lines that examiners look for.' },
              { title: 'Skipping diagrams', desc: 'Diagrams carry 15-20 marks. Most students draw rough sketches instead of labelled, exam-ready diagrams.' },
              { title: 'No answer-writing practice', desc: 'Knowing the answer and writing a 5-mark answer with keywords are two different skills. Most never practice this.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-red-200 bg-white p-6 shadow-lg">
                <div className="mb-3 text-3xl">&#10060;</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Weightage */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            CBSE Biology Chapter Weightage — Know Where the Marks Are
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4 text-center">Marks</th>
                  <th className="px-6 py-4 text-center">Cerebrum Coverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Genetics & Evolution', '20'],
                  ['Reproduction', '16'],
                  ['Biotechnology', '12'],
                  ['Human Welfare', '12'],
                  ['Ecology', '10'],
                ].map(([unit, marks]) => (
                  <tr key={unit} className="border-b border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">{unit}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-900">{marks}</td>
                    <td className="px-6 py-4 text-center text-2xl text-green-500">&#10004;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Before/After Scores */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Real Score Transformations
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Rohit K.', school: 'DPS Dwarka', before: '62%', after: '94%' },
              { name: 'Priya S.', school: 'Modern School, Barakhamba', before: '71%', after: '97%' },
              { name: 'Ankit M.', school: 'Ryan International, Vasant Kunj', before: '58%', after: '91%' },
            ].map((s) => (
              <div key={s.name} className="rounded-xl bg-white p-6 text-center shadow-xl">
                <p className="mb-1 text-lg font-bold text-slate-900">{s.name}</p>
                <p className="mb-4 text-sm text-slate-500">{s.school}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="rounded-lg bg-red-100 px-4 py-2 text-xl font-bold text-red-600">{s.before}</span>
                  <span className="text-2xl text-slate-400">&rarr;</span>
                  <span className="rounded-lg bg-green-100 px-4 py-2 text-xl font-bold text-green-600">{s.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            What You Get at Cerebrum Board Coaching
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              'NCERT line-by-line coverage — every diagram, activity, and summary',
              'Diagram mastery class — learn to draw all 40+ exam diagrams perfectly',
              '10 full mock board papers — evaluated with CBSE marking scheme',
              'Answer writing workshop — keyword technique for 3 and 5-mark answers',
              'Practical & viva preparation — covers the full 30 marks',
              'Daily doubt clearing — WhatsApp support till 10 PM',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span className="mt-0.5 text-xl text-green-500">&#10004;</span>
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="bg-teal-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">
            Private Tutor vs Cerebrum — The Math Is Clear
          </h2>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4">Feature</th>
                  <th className="px-6 py-4 text-center">Private Tutor</th>
                  <th className="px-6 py-4 text-center">Cerebrum</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly Fee', '₹8,000+', '₹4,000'],
                  ['Mock Board Papers', 'None', '10 full papers'],
                  ['Study Material', 'Not included', 'Included'],
                  ['Answer Writing Workshop', 'No', 'Yes'],
                  ['Diagram Practice', 'Rare', 'Every week'],
                  ['Doubt Support', 'Class hours only', 'WhatsApp till 10 PM'],
                ].map(([feature, tutor, cerebrum]) => (
                  <tr key={feature} className="border-b border-slate-100 bg-white">
                    <td className="px-6 py-3 font-medium text-slate-900">{feature}</td>
                    <td className="px-6 py-3 text-center text-red-600">{tutor}</td>
                    <td className="px-6 py-3 text-center font-semibold text-green-600">{cerebrum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-14 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-3 text-3xl font-bold">Board Exam: March 27, 2026</h2>
          <p className="mb-6 text-lg">
            Next crash batch starts <strong>April 2026</strong>. Limited to <strong>15 seats</strong> per batch.
          </p>
          <Link
            href="/book-free-demo"
            className="inline-block rounded-lg bg-yellow-400 px-10 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
          >
            Reserve Your Seat Now
          </Link>
        </div>
      </section>

      {/* Parent Testimonial */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="rounded-xl bg-slate-50 p-10 shadow-lg">
            <p className="mb-4 text-xl italic text-slate-700">
              &ldquo;My daughter went from 67% to 96% in Biology. I wish I had found Cerebrum earlier. The answer writing workshops alone are worth the fee.&rdquo;
            </p>
            <p className="font-bold text-slate-900">Mrs. Sharma</p>
            <p className="text-sm text-slate-500">Parent, GK-II, New Delhi</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl bg-white shadow-md">
                <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-slate-900">
                  {faq.q}
                </summary>
                <p className="px-6 pb-5 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Start Your 95+ Journey Today</h2>
          <p className="mb-8 text-lg text-slate-300">One call can change your board exam result.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:+91${PHONE.replace(/-/g, '')}`}
              className="rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              Call {PHONE}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-green-400"
            >
              WhatsApp Us
            </a>
            <Link
              href="/book-free-demo"
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-slate-900"
            >
              Book Free Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            <Link href="/pricing" className="underline hover:text-white">
              View full pricing
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-3 shadow-2xl md:hidden">
        <div className="flex items-center justify-center gap-3">
          <a
            href={`tel:+91${PHONE.replace(/-/g, '')}`}
            className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-900"
          >
            Call {PHONE}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-500 px-5 py-3 text-sm font-bold text-white"
          >
            WhatsApp
          </a>
          <Link href="/book-free-demo" className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white">
            Free Demo
          </Link>
        </div>
      </div>
    </>
  )
}
