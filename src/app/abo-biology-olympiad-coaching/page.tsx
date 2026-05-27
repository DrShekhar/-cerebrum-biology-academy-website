import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { MessageCircle, Trophy } from 'lucide-react'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const CANONICAL = 'https://cerebrumbiologyacademy.com/abo-biology-olympiad-coaching'

export const metadata: Metadata = {
  title: 'ABO Coaching | Australian Biology Olympiad Preparation | Cerebrum',
  description:
    'Australian Biology Olympiad (ABO) coaching by AIIMS-trained faculty. ICAS Science + ABO pathway, IBO Australia team preparation. Online small-batch and 1:1 for Australian secondary students.',
  keywords: [
    'ABO coaching', 'Australian Biology Olympiad coaching', 'ABO preparation',
    'ABO tutor', 'ABO online coaching', 'biology olympiad Australia',
    'IBO Australia team preparation', 'Australian Biology Olympiad tutor',
    'ICAS Science to ABO pathway', 'Australian Science Olympiad biology',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'ABO Coaching | Australian Biology Olympiad | Cerebrum',
    description: 'Australian Biology Olympiad coaching — IBO Australia team pathway.',
    url: CANONICAL, locale: 'en_AU', type: 'website',
  },

  twitter: { card: 'summary_large_image' as const },
}

const faqs = [
  { question: 'What is the Australian Biology Olympiad (ABO)?', answer: 'The ABO is run by Australian Science Innovations (ASI) as part of the Australian Science Olympiad programme. It identifies the top biology students in Australia for the national training programme, from which 4 students are selected to represent Australia at the International Biology Olympiad (IBO). The pathway is: ICAS Science / school nomination → ABO qualifying exam → National training → IBO team selection.' },
  { question: 'How is the ABO structured?', answer: 'The ABO qualifying exam is a 2-hour written exam (typically March–April). Questions cover Year 11–12 biology breadth plus university-level extensions in molecular biology, genetics, physiology, ecology, and evolution. Top performers (~50 students) are invited to ASI Biology Camp for intensive IBO-level training.' },
  { question: 'What makes Cerebrum different from Australian biology tutors?', answer: 'Cerebrum coaches biology olympiad students across NSEB (India), USABO (USA), BBO (UK), and ABO (Australia) simultaneously. This cross-national exposure means Australian students practise against question patterns from 4 national olympiad traditions — not just past ABO papers. Our AIIMS-trained faculty brings clinical + research depth that pure school-teacher tutors lack.' },
  { question: 'Can IB Biology HL students at Australian international schools enter the ABO?', answer: 'Yes — the ABO is open to all secondary students in Australian schools, including IB Diploma students at international schools (e.g., Caulfield Grammar IB, Carey Grammar IB, Wesley College IB). IB Biology HL provides strong foundational coverage; our coaching extends to the university-level depth the ABO and IBO require.' },
  { question: 'When should a student start ABO preparation?', answer: 'January of Year 11 for serious IBO-track ambitions. The ABO qualifying exam is typically in March–April, so 3–4 months of concentrated preparation (January–April) is the standard timeline. Students with strong Year 10 biology foundations can start later (February) for a compressed 2-month push.' },
  { question: 'What does ABO coaching cost?', answer: 'Three annual tiers: ABO — Pursuit A$2,500/yr (group batch, qualifying exam targeting), ABO — Ascent A$4,500/yr (bi-weekly 1:1, Summer School targeting), ABO — Pinnacle A$6,000/yr (weekly 1:1, IBO Australia team pathway). All sessions online in AEST evening slots. AUD bank transfer, international card, or INR accepted.' },
]

const wa = 'https://wa.me/918826444334?text=' + encodeURIComponent('Hi — I want to discuss Australian Biology Olympiad (ABO) coaching for my child. Please share programme details, AEST scheduling, and pricing.')

export default function Page() {
  return (
    <>
      <FAQSchema questions={faqs} pageUrl={CANONICAL} />
      <BreadcrumbSchema items={[{ label: 'Biology Olympiad', href: '/biology-olympiad' }, { label: 'ABO (Australia)', isCurrentPage: true }]} showSchemaOnly />

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-green-900 to-emerald-900 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <nav className="text-sm text-green-300 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/biology-olympiad" className="hover:text-white">Biology Olympiad</Link>
              <span className="mx-2">/</span>
              <span className="text-white">ABO (Australia)</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300"><Trophy className="h-3.5 w-3.5" />Australian Science Innovations</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-300">IBO Australia Pathway</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-speakable="title">Australian Biology Olympiad (ABO) Coaching</h1>
            <p className="text-xl text-green-200 mb-6 max-w-3xl" data-speakable="summary">
              IBO Australia team pathway coaching for secondary students. AIIMS-trained biology-specialist faculty with cross-national olympiad expertise (NSEB + USABO + BBO + ABO + IBO). Online small-batch and 1:1, AEST evening sessions. A$60–A$100/hour.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={wa} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp +91 88264-44334</a>
              <Link href="/ibo-preparation" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold">IBO Preparation</Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What is the ABO?</h2>
            <p>The Australian Biology Olympiad is run by Australian Science Innovations (ASI), a non-profit supported by the Australian Government Department of Education. It is the national pathway to IBO team selection for Australia. The top ~50 students from the qualifying exam are invited to the ASI Biology Summer School, where intensive IBO-level training narrows the pool to 4 team members.</p>
            <p>ABO participation is highly valued on Australian university applications, particularly for medicine (University of Melbourne MD, University of Sydney MD, Monash, UNSW) and biological sciences (ANU, UQ, UWA). Gold and Silver ABO awards distinguish candidates in the competitive medical-school numerus fixus process.</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">ABO Exam Format</h2>
            <ul>
              <li><strong>Duration:</strong> 2 hours, written exam</li>
              <li><strong>Format:</strong> Multiple-choice + short-answer (typically March–April)</li>
              <li><strong>Scope:</strong> Year 11–12 biology + university-level extensions</li>
              <li><strong>Key topics:</strong> Molecular biology, genetics, human physiology, plant biology, ecology, evolution, animal behaviour, biostatistics</li>
              <li><strong>Pathway:</strong> School nomination / ICAS → ABO qualifying → ASI Summer School → IBO team</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">How Cerebrum Coaches ABO</h2>
            <p>Our ABO programme extends Year 11–12 biology to university-level depth in the 6 key ABO content areas. We use Campbell Biology (12th edition), Alberts&apos; Molecular Biology of the Cell, and past ABO + IBO papers (2015–2025) as reference materials.</p>
            <p>Australian students benefit from our cross-national coaching model: we simultaneously prepare students for NSEB (India), USABO (USA), BBO (UK), and ABO (Australia). This exposes ABO candidates to question patterns from multiple olympiad traditions — significantly broader preparation than ABO-paper-only drilling.</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">ABO Coaching Pricing (AUD)</h2>
            <ul>
              <li><strong>ABO — Pursuit: A$2,500/yr.</strong> Group batch, qualifying exam targeting, weekend sessions, recorded content, monthly 1:1.</li>
              <li><strong>ABO — Ascent: A$4,500/yr.</strong> Bi-weekly 1:1, ASI Summer School targeting, monthly mocks, January–April intensive.</li>
              <li><strong>ABO — Pinnacle: A$6,000/yr.</strong> Weekly 1:1 with senior faculty, IBO Australia team pathway, cross-national paper practice.</li>
            </ul>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">ABO FAQs</h2>
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
              <Link href="/ibo-preparation" className="block p-4 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow transition"><p className="font-semibold text-slate-900">IBO Preparation</p><p className="text-sm text-slate-500">International Biology Olympiad</p></Link>
              <Link href="/bbo-biology-olympiad-coaching" className="block p-4 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow transition"><p className="font-semibold text-slate-900">BBO Coaching (UK)</p><p className="text-sm text-slate-500">British Biology Olympiad</p></Link>
              <Link href="/usabo-coaching" className="block p-4 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow transition"><p className="font-semibold text-slate-900">USABO Coaching</p><p className="text-sm text-slate-500">USA Biology Olympiad</p></Link>
              <Link href="/nseb-coaching" className="block p-4 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow transition"><p className="font-semibold text-slate-900">NSEB Coaching (India)</p><p className="text-sm text-slate-500">India Biology Olympiad pathway</p></Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start ABO Coaching</h2>
            <p className="text-green-100 mb-8">Free 30-minute diagnostic in an AEST-friendly slot.</p>
            <a href={wa} className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg" target="_blank" rel="noopener noreferrer">WhatsApp +91 88264-44334</a>
          </div>
        </section>

        <StickyMobileCTABar waUrl={wa} />
      </main>
    </>
  )
}
