import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import {
  Compass,
  RefreshCw,
  Stethoscope,
  Landmark,
  Plane,
  HeartPulse,
  Scale,
  Dna,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calculator,
} from 'lucide-react'
import { FAQSchema, FAQDisplay } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { CEREBRUM_METRICS as M } from '@/lib/constants/metrics'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${BASE_URL}/low-neet-score-options`
const WA = (msg: string) => `https://wa.me/918826444334?text=${encodeURIComponent(msg)}`

export const metadata: Metadata = {
  title: 'Low NEET Score? Your Real Options, Honestly Explained | Cerebrum',
  description:
    'Scored low in NEET or didn’t qualify? An honest, pressure-free guide to every real option — a 2027 drop year, BDS/BAMS/AYUSH, nursing & allied health, private/deemed and abroad MBBS — and how to decide which fits your score. Free counselling, no sales pitch.',
  keywords: [
    'low NEET score options',
    'failed NEET what to do',
    'didn’t qualify NEET',
    'low NEET marks options',
    'what to do after low NEET score',
    'should I drop a year for NEET',
    'NEET alternatives',
    'options after NEET',
  ].join(', '),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Low NEET Score? Your Real Options, Honestly Explained | Cerebrum',
    description:
      'A calm, honest breakdown of every path after a low NEET score — drop year, AYUSH/dental, allied health, private & abroad MBBS — and how to choose.',
    type: 'article',
    locale: 'en_IN',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Low NEET Score? Your Real Options | Cerebrum Biology Academy',
    description:
      'Honest, pressure-free guidance on what to do after a low NEET score — including whether a 2027 drop year is worth it.',
  },
}

const FAQS = [
  {
    question: 'I got a low NEET score — should I drop a year or take another path?',
    answer:
      'It depends on how close you were and why you fell short. If you missed a government MBBS seat by a bridgeable margin and your gaps are fixable (weak Biology, careless errors, exam pressure), a focused drop year usually pays off. If you were very far from the cut-off, or you don’t want another exam year, options like AYUSH (BAMS/BHMS), BDS, allied health or a private/abroad seat may suit you better. The honest way to decide is to look at your actual score band, not fear — that’s what a counselling call is for.',
  },
  {
    question: 'Is a NEET drop year worth it if my score was low?',
    answer:
      'A drop year is worth it when your shortfall is fixable and you’re willing to study differently, not just harder. Droppers who repair weak concepts and drill applied practice — especially in Biology, which is half of NEET — regularly gain 100–150 marks. It is not worth it if you repeat the same routine that produced the low score. No institute can guarantee a selection; be cautious of anyone who claims to.',
  },
  {
    question: 'What can I do after NEET without qualifying / with a low score?',
    answer:
      'Several medical-adjacent degrees don’t depend on a high NEET rank: nursing (B.Sc Nursing), allied and paramedical courses (B.Sc in medical lab technology, radiology, optometry, physiotherapy/BPT), and B.Pharm. Dental (BDS) and AYUSH courses (BAMS, BHMS, BUMS, BNYS) do use NEET but have lower cut-offs than MBBS. Private and deemed MBBS/BDS seats also fill through NEET counselling. Each path has very different fees, duration and career outcomes — weigh them honestly before committing.',
  },
  {
    question: 'Can I get an MBBS seat with a low NEET score?',
    answer:
      'A government MBBS seat needs a competitive rank, so a low score makes it unlikely there. Private and deemed-university MBBS seats have higher fees but lower cut-offs, and studying MBBS abroad is possible if you clear the NEET qualifying percentile — though practising in India later requires the FMGE/NExT licensing exam. If your heart is set on MBBS and you were close, a drop year to lift your rank is often the more reliable route than an expensive lower-tier seat.',
  },
  {
    question: 'How do I know which option is realistic for my marks?',
    answer:
      'Use your marks to estimate a rank, then check which counselling categories that rank realistically reaches. Our NEET college predictor and rank predictor give you a starting estimate, and the official cut-off page shows qualifying trends. Then talk it through — the right choice depends on your rank, your budget, your home state quota and how much you want another attempt.',
  },
  {
    question: 'Why choose a biology-specialist academy if I do decide to drop?',
    answer:
      'Biology is 360 of 720 marks — half of NEET and the most reliable place to gain marks in a drop year. A biology-only academy led by an AIIMS-trained faculty can take your NCERT Biology from “covered” to genuinely mastered, which is exactly where a low-scoring student’s biggest, safest jump comes from. That focus is our specialisation.',
  },
]

const OPTIONS = [
  {
    icon: RefreshCw,
    title: 'A 2027 drop year (if you were close & motivated)',
    verdict: 'Best when your shortfall is fixable',
    body: 'If you missed a government seat by a bridgeable margin and your gaps are clear — weak Biology, careless errors, exam nerves — a structured drop year is usually the highest-return path. The key is studying differently: repair weak concepts first, then drill applied practice. Biology alone is half the paper and the fastest place to recover marks.',
  },
  {
    icon: Stethoscope,
    title: 'BDS & AYUSH (BAMS, BHMS, BUMS, BNYS)',
    verdict: 'NEET-based, lower cut-offs than MBBS',
    body: 'Dental (BDS) and AYUSH courses admit through NEET but with markedly lower cut-offs than MBBS, so they’re reachable at scores that miss MBBS. They’re full, respected clinical careers — worth a genuine look rather than a fallback, provided the field actually interests you.',
  },
  {
    icon: HeartPulse,
    title: 'Nursing, allied health & paramedical',
    verdict: 'Many don’t need a high NEET rank',
    body: 'B.Sc Nursing, physiotherapy (BPT), medical lab technology, radiology, optometry and B.Pharm are strong, in-demand healthcare careers. Several have their own admission routes independent of a high NEET rank — a practical path into medicine-adjacent work without another exam year.',
  },
  {
    icon: Landmark,
    title: 'Private & deemed-university MBBS/BDS',
    verdict: 'Lower cut-off, much higher fees',
    body: 'Private and deemed colleges fill MBBS/BDS seats through NEET counselling at lower cut-offs — but fees run to many times a government seat. Only sensible if the family budget genuinely supports it; otherwise a drop year to earn a government seat is often the wiser use of that money.',
  },
  {
    icon: Plane,
    title: 'MBBS abroad',
    verdict: 'Needs NEET qualifying + FMGE/NExT later',
    body: 'Studying MBBS abroad is possible if you clear the NEET qualifying percentile, at a lower cost than most Indian private colleges. But to practise in India you must later pass the FMGE/NExT licensing exam — so choose a recognised university carefully and go in with eyes open.',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET counselling and career guidance',
          'Options after a low NEET score',
          'NEET dropper coaching',
          'AYUSH, BDS and allied health pathways',
          'NEET-UG Biology',
        ]}
        jobTitle="Founder & Lead NEET Biology Faculty"
      />
      <FAQSchema questions={FAQS} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        showHome={false}
        showSchemaOnly
        items={[
          { label: 'Home', href: '/' },
          {
            label: 'Low NEET Score — Options',
            href: '/low-neet-score-options',
            isCurrentPage: true,
          },
        ]}
      />
      {/* Article schema for AEO / rich understanding */}
      <Script
        id="low-neet-score-options-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Low NEET Score? Your Real Options, Honestly Explained',
            description:
              'An honest, pressure-free guide to every real path after a low NEET score — a 2027 drop year, BDS/AYUSH, nursing and allied health, private and abroad MBBS — and how to decide which fits your marks.',
            url: PAGE_URL,
            inLanguage: 'en',
            author: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: BASE_URL,
            },
            publisher: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: BASE_URL,
            },
            about: 'Options and next steps after a low NEET-UG score',
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 via-emerald-800 to-teal-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Compass className="h-4 w-4" />
            Honest guidance · no sales pitch
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Got a low NEET score? Here are your real options.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            First — breathe. A low score isn’t the end of medicine; it’s a decision point. This is a
            calm, honest look at every genuine path in front of you — including whether a 2027 drop
            year is actually worth it for <em>your</em> marks — with no pressure to enrol in
            anything.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WA(
                'Hi! I got a low NEET score and I’m trying to decide my next step. Can you give me honest guidance on my options?'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <MessageCircle className="h-5 w-5" />
              Free, honest counselling
            </a>
            <Link
              href="/neet-college-predictor"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Calculator className="h-4 w-4" />
              Check what your marks reach
            </Link>
          </div>
        </div>
      </section>

      {/* Don't decide in panic */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Don’t make this decision in panic
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          The worst choices after a low NEET score are made in the first 48 hours — out of
          disappointment, family pressure or fear of “wasting a year”. None of your options
          disappear this week. Take a few days, get your actual marks and an estimated rank in front
          of you, and then decide with information instead of emotion. Two honest questions settle
          most of it: <strong>how close were you to the seat you wanted</strong>, and{' '}
          <strong>were your gaps fixable</strong> (weak concepts, silly mistakes, exam pressure) or
          fundamental?
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Calculator,
              title: 'Know your rank first',
              body: 'Turn your marks into an estimated rank and see which counselling categories it realistically reaches.',
              href: '/neet-rank-predictor',
              cta: 'Rank predictor',
            },
            {
              icon: Landmark,
              title: 'Check the cut-offs',
              body: 'Compare against qualifying and category cut-off trends before you rule anything in or out.',
              href: '/neet-2026-cutoff',
              cta: 'NEET cut-offs',
            },
            {
              icon: Compass,
              title: 'See college options',
              body: 'Map your likely rank to the colleges and courses actually open to you this year.',
              href: '/neet-college-predictor',
              cta: 'College predictor',
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group rounded-xl border border-gray-200 p-6 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
            >
              <div className="flex items-center gap-2 text-emerald-700">
                <c.icon className="h-5 w-5" />
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-700">{c.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                {c.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* The real options */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your real options — laid out honestly
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Every one of these is a legitimate path taken by thousands of students each year. The
            right one depends on your rank, your budget and how much you want to reattempt — not on
            what anyone is trying to sell you.
          </p>
          <div className="mt-8 space-y-4">
            {OPTIONS.map((o) => (
              <div
                key={o.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <o.icon className="h-5 w-5" />
                    <h3 className="text-lg font-semibold text-gray-900">{o.title}</h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                    {o.verdict}
                  </span>
                </div>
                <p className="mt-3 text-gray-700 leading-relaxed">{o.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-gray-500">
            <Scale className="mt-0.5 h-4 w-4 shrink-0" />
            Cut-offs, fees and seat availability change every year and by state/quota. Treat the
            above as a map, not a promise — confirm specifics for your counselling round before
            committing.
          </p>
        </div>
      </section>

      {/* If you decide to drop — the biology wedge → funnel */}
      <section className="mx-auto max-w-4xl px-4 py-14">
        <div className="flex items-center gap-2 text-emerald-700">
          <Dna className="h-6 w-6" />
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            If you decide to drop — make the year count
          </h2>
        </div>
        <p className="mt-4 text-gray-700 leading-relaxed">
          A drop year only works if next year is different from last year. The single biggest, most
          reliable place to recover marks is <strong>Biology — 360 of 720, half of NEET</strong>.
          Students who take their NCERT Biology from “covered” to genuinely mastered, and pair it
          with weak-concept repair and disciplined mock analysis, regularly move 100–150 marks. That
          is exactly the focus of a biology-specialist academy, and it’s why we built a dedicated
          drop-year programme around it.
        </p>
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                NEET Dropper 2027 — the Biology-first drop year
              </h3>
              <p className="mt-1 text-sm text-gray-700">
                Small batches, AIIMS-trained faculty, weak-concept repair and mock-analysis
                mentorship — plus a merit scholarship instead of empty “guarantees”.
              </p>
            </div>
            <Link
              href="/neet-dropper-2027"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              See the dropper program
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <p className="mt-6 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          One honest caution: no institute can guarantee a NEET selection or rank — promising one is
          prohibited under the 2024 coaching guidelines. If a “100% selection” pitch is the main
          reason you’d drop, that’s a red flag, not a reason.
        </p>
      </section>

      {/* Trust strip */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid gap-6 text-center sm:grid-cols-3">
            <div>
              <div className="text-3xl font-bold text-emerald-700">{M.successRateText}</div>
              <div className="mt-1 text-sm text-gray-600">NEET qualification rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-700">{M.topScoreText}</div>
              <div className="mt-1 text-sm text-gray-600">Top student score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-700">{M.facultyExperienceText}</div>
              <div className="mt-1 text-sm text-gray-600">Years of biology teaching</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <FAQDisplay questions={FAQS} title="Low NEET score — your questions, answered" />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-800 to-emerald-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Talk it through before you decide</h2>
          <p className="mt-3 text-emerald-50">
            Tell us your score and where you want to be. We’ll give you an honest read on your
            options — drop year or otherwise — with zero pressure to enrol.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={WA(
                'Hi! I got a low NEET score. Can you help me honestly figure out my best next step?'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
            >
              <MessageCircle className="h-5 w-5" />
              Get honest guidance on WhatsApp
            </a>
            <Link
              href="/neet-dropper-2027"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore the 2027 drop year
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
