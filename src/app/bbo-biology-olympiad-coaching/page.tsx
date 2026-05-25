import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { MessageCircle, Trophy, Target, Award, CheckCircle2, BookOpen } from 'lucide-react'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const CANONICAL = 'https://cerebrumbiologyacademy.com/bbo-biology-olympiad-coaching'

export const metadata: Metadata = {
  title: 'BBO Coaching | British Biology Olympiad Preparation | Cerebrum',
  description:
    'British Biology Olympiad (BBO) coaching by AIIMS-trained faculty. Gold/Silver/Bronze targeting, IBO UK team pathway. Online small-batch and 1:1 for UK sixth-form students.',
  keywords: [
    'BBO coaching', 'British Biology Olympiad coaching', 'BBO preparation',
    'BBO tutor', 'BBO online coaching', 'biology olympiad UK',
    'IBO UK team preparation', 'British Biology Olympiad tutor',
    'BBO gold medal coaching', 'UK biology olympiad',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'BBO Coaching | British Biology Olympiad | Cerebrum',
    description: 'British Biology Olympiad coaching — Gold/Silver/Bronze targeting, IBO UK pathway.',
    url: CANONICAL, locale: 'en_GB', type: 'website',
  },
}

const faqs = [
  { question: 'What is the British Biology Olympiad (BBO)?', answer: 'The BBO is run by the Royal Society of Biology (RSBiol). It is the UK national biology competition for A-Level and IB sixth-form students. ~10,000 students enter annually. Top performers earn Gold, Silver, and Bronze awards; the top 15–20 are invited to the UK IBO training programme from which 4 students are selected to represent the UK at the International Biology Olympiad.' },
  { question: 'How is the BBO structured?', answer: 'The BBO is a single 60-minute online multiple-choice exam (typically February). Questions cover A-Level/IB Biology breadth plus university-level extensions in molecular biology, genetics, physiology, ecology, and evolution. Scoring is scaled: Gold (~top 5%), Silver (~top 15%), Bronze (~top 30%). Top performers proceed to the UK IBO selection process.' },
  { question: 'What makes Cerebrum different from UK-based BBO tutors?', answer: 'Cerebrum is led by Dr. Shekhar C Singh (AIIMS Delhi) — a biology-specialist faculty with 12+ years coaching biology olympiad students across NSEB, INBO, USABO, BBO, and IBO simultaneously. This cross-national perspective means UK BBO students benefit from exposure to question patterns from multiple national olympiads, not just past BBO papers.' },
  { question: 'Can IB Biology HL students enter the BBO?', answer: 'Yes — the BBO is open to all sixth-form students in UK schools, including IB Diploma students. IB Biology HL provides strong foundational coverage. Our coaching extends HL content to the university-level depth the BBO requires (molecular biology, population genetics, advanced physiology).' },
  { question: 'When should a student start BBO preparation?', answer: 'September of Year 12 (or IB DP1) for Gold targeting. The BBO exam is typically in February, so 5–6 months of structured preparation is ideal. Students already scoring A*/Level 7 in school biology can start in November for a concentrated 3-month push.' },
  { question: 'What does the BBO coaching programme cost?', answer: 'Small-Batch (4–6 students): £50/hour. 1:1 Senior Faculty: £90/hour. Complete BBO Year Programme: £3,500. All sessions online in GMT evening slots (5–8 PM UK time). Sterling bank transfer, international card, or INR payment accepted.' },
]

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent('Hi — I want to discuss British Biology Olympiad (BBO) coaching for my child. Please share programme details, UK scheduling, and pricing.')

export default function Page() {
  return (
    <>
      <FAQSchema questions={faqs} pageUrl={CANONICAL} />
      <BreadcrumbSchema items={[{ label: 'Biology Olympiad', href: '/biology-olympiad' }, { label: 'BBO (UK)', isCurrentPage: true }]} showSchemaOnly />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-blue-900 to-indigo-900 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <nav className="text-sm text-blue-300 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/biology-olympiad" className="hover:text-white">Biology Olympiad</Link>
              <span className="mx-2">/</span>
              <span className="text-white">BBO (UK)</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300"><Trophy className="h-3.5 w-3.5" />Royal Society of Biology</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-300">IBO UK Pathway</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">British Biology Olympiad (BBO) Coaching</h1>
            <p className="text-xl text-blue-200 mb-6 max-w-3xl" data-speakable="summary">
              Gold/Silver/Bronze targeting for UK sixth-form students. IBO UK team pathway coaching. AIIMS-trained biology-specialist faculty with cross-national olympiad expertise (NSEB + USABO + BBO + IBO). Online small-batch and 1:1, GMT evening sessions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp +91 88264-44334</a>
              <Link href="/ibo-preparation" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold">IBO Preparation</Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What is the BBO?</h2>
            <p>The British Biology Olympiad (BBO) is the UK national biology competition administered by the Royal Society of Biology. Approximately 10,000 A-Level and IB sixth-form students enter annually. The top 15–20 performers are invited to the UK IBO training programme, from which 4 students are selected to represent the UK at the International Biology Olympiad (IBO).</p>
            <p>BBO awards: Gold (~top 5%), Silver (~top 15%), Bronze (~top 30%), Highly Commended (~top 45%), Commended (~top 55%). Gold and Silver BBO awards are highly valued on UCAS personal statements for medicine, biological sciences, and veterinary science applications.</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">BBO Exam Format</h2>
            <ul>
              <li><strong>Duration:</strong> 60 minutes, online</li>
              <li><strong>Format:</strong> Multiple-choice (typically February)</li>
              <li><strong>Scope:</strong> A-Level/IB Biology breadth + university-level extensions</li>
              <li><strong>Key topics:</strong> Molecular biology, genetics, human physiology, plant biology, ecology, evolution, animal behaviour</li>
              <li><strong>Scoring:</strong> Scaled against national cohort — absolute score thresholds vary by year</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">How Cerebrum Coaches BBO</h2>
            <p>Our BBO programme extends A-Level/IB Biology to university-level depth in the 6 key BBO content areas. We use past BBO papers (2015–2025), Campbell Biology (12th edition), Alberts' Molecular Biology of the Cell, and Guyton's Textbook of Medical Physiology as reference materials.</p>
            <p>Coaching is delivered by Dr. Shekhar C Singh (AIIMS Delhi) and senior faculty who simultaneously coach NSEB (India), USABO (USA), BBO (UK), and IBO — giving UK students exposure to cross-national question patterns that pure BBO-paper drilling misses.</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">BBO Coaching Pricing (GBP)</h2>
            <ul>
              <li><strong>BBO Small-Batch (4–6 students) — £50/hour.</strong> Weekly 90-minute sessions, September to February, plus monthly mock BBO papers.</li>
              <li><strong>BBO 1:1 Senior Faculty — £90/hour.</strong> Personalised coaching with AIIMS-trained faculty. Flexible scheduling.</li>
              <li><strong>Complete BBO Year Programme — £3,500.</strong> September–February intensive: weekly live sessions, 6 mock papers, 1:1 gap-fill, IBO bridge for Gold medalists.</li>
            </ul>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">BBO FAQs</h2>
            <div className="space-y-6">
              {faqs.map((f, i) => (
                <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                  <summary className="text-lg font-semibold text-slate-900 cursor-pointer">{f.question}</summary>
                  <p className="mt-4 text-slate-700 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Olympiad Programmes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/ibo-preparation" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition"><p className="font-semibold text-slate-900">IBO Preparation</p><p className="text-sm text-slate-500">International Biology Olympiad</p></Link>
              <Link href="/usabo-coaching" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition"><p className="font-semibold text-slate-900">USABO Coaching</p><p className="text-sm text-slate-500">USA Biology Olympiad</p></Link>
              <Link href="/nseb-coaching" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition"><p className="font-semibold text-slate-900">NSEB Coaching</p><p className="text-sm text-slate-500">India Biology Olympiad (NSEB → INBO)</p></Link>
              <Link href="/ib-biology" className="block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow transition"><p className="font-semibold text-slate-900">IB Biology HL & SL</p><p className="text-sm text-slate-500">IB DP tutoring (BBO cross-prep)</p></Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start BBO Coaching</h2>
            <p className="text-blue-100 mb-8">Free 30-minute diagnostic in a GMT-friendly slot.</p>
            <a href={wa} className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
          </div>
        </section>

        <StickyMobileCTABar waUrl={wa} />
      </main>
    </>
  )
}
