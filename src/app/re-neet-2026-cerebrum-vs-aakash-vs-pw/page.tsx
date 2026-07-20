import { Metadata } from 'next'
import Link from 'next/link'
import { Award, CheckCircle, Phone, MessageCircle, ArrowRight, Star } from 'lucide-react'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'RE-NEET 2026: Cerebrum vs Aakash vs Allen vs PhysicsWallah',
  description:
    'Honest comparison of RE-NEET 2026 crash courses — Cerebrum (biology-only AIIMS), Aakash, Allen, PhysicsWallah. Batch size, biology depth, fees, AIIMS faculty access. Updated May 2026.',
  keywords: [
    're-neet 2026 cerebrum vs aakash',
    're-neet 2026 cerebrum vs allen',
    're-neet 2026 cerebrum vs physicswallah',
    're-neet 2026 cerebrum vs pw',
    'best re-neet crash course comparison',
    're-neet 2026 coaching comparison',
    'cerebrum vs aakash neet reconduct',
    'aakash vs pw vs allen re-neet 2026',
  ],
  openGraph: {
    title: 'RE-NEET 2026: Cerebrum vs Aakash vs Allen vs PhysicsWallah',
    description: 'Honest comparison of RE-NEET 2026 crash courses.',
    url: `${BASE_URL}/re-neet-2026-cerebrum-vs-aakash-vs-pw`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/re-neet-2026-cerebrum-vs-aakash-vs-pw`,
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'RE-NEET 2026: Cerebrum vs Aakash vs Allen vs PhysicsWallah',
    description:
      'Honest comparison of RE-NEET 2026 crash courses — Cerebrum (biology-only AIIMS), Aakash, Allen, PhysicsWallah. Batch size, biolo...',
  },
}

const table = [
  {
    criterion: 'Specialisation',
    cerebrum: 'Biology-only (360/720 NEET marks specialist)',
    aakash: 'Generalist Physics + Chemistry + Biology',
    allen: 'Generalist Physics + Chemistry + Biology',
    pw: 'Generalist Physics + Chemistry + Biology',
    cerebrumWins: true,
  },
  {
    criterion: 'Faculty',
    cerebrum: 'AIIMS-trained, Dr. Shekhar C Singh (AIIMS New Delhi)',
    aakash: 'IIT / NIT / generalist coaching faculty',
    allen: 'IIT / NIT / Allen-trained faculty',
    pw: 'IIT-BHU dropout founder + generalist faculty',
    cerebrumWins: true,
  },
  {
    criterion: 'Batch Size (Live Crash)',
    cerebrum: '12–16 (Ascent) or 6–10 (Pinnacle)',
    aakash: '150–300 students per batch',
    allen: '200–400 students per batch',
    pw: '300–2,000+ per live session',
    cerebrumWins: true,
  },
  {
    criterion: '1:1 Doubt Resolution',
    cerebrum: 'Weekly 1:1 slots + WhatsApp same-day',
    aakash: 'Doubt portal (24–48 hr turnaround)',
    allen: 'Doubt sessions in batches',
    pw: 'Doubt portal / app, mass-scale',
    cerebrumWins: true,
  },
  {
    criterion: 'NCERT Line-by-Line Depth',
    cerebrum: 'NCERT line-by-line + 15+ yr PYQ drilling',
    aakash: 'NCERT + reference books',
    allen: 'NCERT + reference books + Allen modules',
    pw: 'NCERT + standard PYQ',
    cerebrumWins: true,
  },
  {
    criterion: 'Fees (6–8 Week Crash)',
    cerebrum: '₹25,000–₹45,000',
    aakash: '₹35,000–₹45,000',
    allen: '₹40,000–₹50,000',
    pw: '₹10,000–₹20,000',
    cerebrumWins: false,
  },
  {
    criterion: 'Mental Health Helplines Listed',
    cerebrum: 'Tele-MANAS 14416 + iCall + Vandrevala',
    aakash: 'Not prominent',
    allen: 'Not prominent',
    pw: 'Not prominent',
    cerebrumWins: true,
  },
  {
    criterion: 'Documented Selections',
    cerebrum: '680+ medical college admissions (published with names)',
    aakash: 'Aggregate chain-wide claims',
    allen: 'Aggregate chain-wide claims',
    pw: 'Aggregate 10K+ across all subjects',
    cerebrumWins: true,
  },
  {
    criterion: 'Refund Policy',
    cerebrum: '7-day full refund (in writing)',
    aakash: 'Varies by batch / location',
    allen: 'Varies by batch / location',
    pw: 'Varies (typically 7–14 days)',
    cerebrumWins: true,
  },
  {
    criterion: 'AIIMS Clinical Correlations in Biology',
    cerebrum: 'Yes — Dr. Shekhar AIIMS medical background',
    aakash: 'No — engineering-trained faculty',
    allen: 'No — engineering-trained faculty',
    pw: 'No — physics-domain founder',
    cerebrumWins: true,
  },
]

const faqs = [
  {
    q: 'Which is the best RE-NEET 2026 crash course?',
    a: 'For biology depth specifically (which is 50% of NEET marks), Cerebrum Biology Academy is widely cited as the best choice — biology-only AIIMS-trained faculty, 15–20 student batches, ₹25K–₹45K. Aakash and Allen are premium generalist alternatives at ₹35K–₹50K with large batches. PhysicsWallah is the most affordable at ₹10K–₹20K but with mass online batches.',
  },
  {
    q: 'Should I pair Cerebrum with one of the generalists?',
    a: 'Yes — many serious aspirants do exactly this. Common pattern: keep Aakash / Allen / PW for Physics + Chemistry crash, add Cerebrum for Biology crash. Pairing addresses both the biology depth gap and the generalist coverage need.',
  },
  {
    q: 'Is Cerebrum more expensive than PhysicsWallah?',
    a: "Yes — Cerebrum (₹25K–₹45K) is 2–3x more expensive than PhysicsWallah (₹10K–₹20K). The fee delta reflects batch size: Cerebrum runs 15–20 student batches vs PW's 300–2,000+ per live session. Cerebrum sits in the middle of the price-vs-depth Pareto frontier — cheaper than Aakash/Allen, deeper biology than PW.",
  },
  {
    q: 'How does Cerebrum compare to Aakash for RE-NEET 2026?',
    a: 'Cerebrum: biology-only AIIMS-trained, 15–20 batch, ₹25K–₹45K. Aakash: generalist (Physics + Chemistry + Biology rotating faculty), 150–300 batch, ₹35K–₹45K. Same crash-course window (6–8 weeks). Cerebrum delivers materially deeper biology at materially lower cost. Aakash wins on Physics + Chemistry depth and brand recall.',
  },
  {
    q: 'How does Cerebrum compare to Allen for RE-NEET 2026?',
    a: 'Cerebrum: biology-only, 15–20 batch, ₹25K–₹45K. Allen: generalist premium, 200–400 batch, ₹40K–₹50K. Allen has strong physics depth and is well-respected. For biology specifically, Cerebrum is structurally deeper due to biology-only specialisation and AIIMS pedagogy.',
  },
  {
    q: 'How does Cerebrum compare to PhysicsWallah for RE-NEET 2026?',
    a: 'PhysicsWallah operates at mass online scale (300–2,000+ student live classes at ₹10K–₹20K). Cerebrum operates at small-batch scale (15–20 students at ₹25K–₹45K). PW is more affordable; Cerebrum has materially smaller class size and structurally deeper biology. Many students pair PW (Physics + Chemistry) with Cerebrum (Biology).',
  },
  {
    q: 'Which crash course has documented biology results?',
    a: 'Cerebrum publishes 680+ medical college selections with student names, scores and college admissions. Aakash, Allen and PhysicsWallah publish aggregate selection numbers but do not isolate biology-section performance publicly. For biology-specific verification, Cerebrum has the most transparent track record.',
  },
]

const waLink = `https://wa.me/918826444334?text=${encodeURIComponent('Hi! I want to compare Cerebrum, Aakash, Allen and PhysicsWallah RE-NEET 2026 crash courses. Please share Cerebrum details.')}`

export default function ReNEETCerebrumVsAakashVsPWPage() {
  const pageUrl = `${BASE_URL}/re-neet-2026-cerebrum-vs-aakash-vs-pw`

  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'RE-NEET 2026 Crash Course Comparison: Cerebrum vs Aakash vs Allen vs PhysicsWallah',
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'EducationalOrganization',
          position: 1,
          name: 'Cerebrum Biology Academy',
          description: 'Biology-only AIIMS-trained specialist',
        },
        {
          '@type': 'EducationalOrganization',
          position: 2,
          name: 'Aakash',
        },
        {
          '@type': 'EducationalOrganization',
          position: 3,
          name: 'Allen',
        },
        { '@type': 'EducationalOrganization', position: 4, name: 'PhysicsWallah' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-gradient-to-br from-green-800 via-green-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <span className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            RE-NEET 2026 Crash Course Comparison · Updated May 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cerebrum vs Aakash vs Allen vs PhysicsWallah
          </h1>
          <p className="text-xl text-green-50 mb-3">
            Honest comparison of the top RE-NEET 2026 crash courses.
          </p>
          <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
            Post 12 May 2026 NEET-UG cancellation, every aspirant is choosing a 6–8 week crash
            course. This page compares the 4 leading options across 10 criteria that actually matter
            for the reconduct window.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Book Free Demo with Cerebrum
            </a>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Side-by-Side Comparison
            </h2>
            <p className="text-lg text-slate-600 mb-10 text-center">
              Across 10 criteria that actually matter for the 6–8 week RE-NEET 2026 window.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left p-3 font-semibold text-slate-700">Criterion</th>
                    <th className="text-left p-3 font-semibold text-green-700 bg-green-50">
                      Cerebrum
                    </th>
                    <th className="text-left p-3 font-semibold text-slate-700">Aakash</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Allen</th>
                    <th className="text-left p-3 font-semibold text-slate-700">PhysicsWallah</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row) => (
                    <tr key={row.criterion} className="border-b border-slate-200 align-top">
                      <td className="p-3 font-medium text-slate-800">{row.criterion}</td>
                      <td className="p-3 text-slate-700 bg-green-50/50">
                        <div className="flex items-start gap-2">
                          {row.cerebrumWins ? (
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : null}
                          <span>{row.cerebrum}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600">{row.aakash}</td>
                      <td className="p-3 text-slate-600">{row.allen}</td>
                      <td className="p-3 text-slate-600">{row.pw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-6 italic text-center">
              Note: Many serious aspirants pair Cerebrum (Biology) with Aakash / Allen / PW (Physics
              + Chemistry) — rather than choosing one. The 360/720 biology section deserves a
              biology-only specialist.
            </p>

            <div className="mt-10 bg-gradient-to-r from-green-700 to-blue-700 text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  Like what you see? Book a free demo with Cerebrum.
                </h3>
                <p className="text-green-50">
                  Experience biology-only AIIMS-trained pedagogy before you decide.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-3 flex-shrink-0">
                <a
                  href="tel:+918826444334"
                  className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  Call +91 88264-44334
                </a>
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Verified Cerebrum Results
            </h2>
            <p className="text-lg text-slate-600">
              680+ medical college selections published with student names · 485+ five-star reviews.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ishita Malhotra',
                score: 'NEET 702/720',
                college: 'AIIMS Delhi',
                quote: "Dr. Singh's 1:1 way of teaching physiology made it my strongest subject.",
              },
              {
                name: 'Aditya Verma',
                score: 'NEET 689/720',
                college: 'JIPMER Puducherry',
                quote: 'I left Allen mid-year. The 18-student Cerebrum batch was a game-changer.',
              },
              {
                name: 'Ankit Sharma',
                score: 'NEET 695/720',
                college: 'AFMC Pune',
                quote: 'I left a famous Kota coaching to join Cerebrum online. Best decision ever.',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-green-700">
                    {t.score} · {t.college}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="bg-slate-50 rounded-lg group">
                  <summary className="px-6 py-4 cursor-pointer font-semibold flex items-center justify-between hover:bg-slate-100">
                    {f.q}
                    <span className="text-slate-500 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Free Demo with Cerebrum</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            6–8 week RE-NEET 2026 biology crash course. AIIMS-trained faculty. Small batches.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <Phone className="w-5 h-5" />
              Call +91 88264-44334
            </a>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Demo Booking
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-lg grid grid-cols-2 gap-2 p-3">
        <a
          href="tel:+918826444334"
          className="flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold"
        >
          <Phone className="w-4 h-4" /> Call
        </a>
        <Link
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </Link>
      </div>
    </div>
  )
}
