/**
 * /how-to-make-us-ibo-team
 *
 * Informational pathway page (Jun 2026) — the aspirational route by which a US
 * high-school student reaches the International Biology Olympiad (IBO) via the
 * USA Biology Olympiad (USABO): Open → Semifinal → National Finals → top 4 =
 * Team USA → IBO. Explains the Finals/team selection, the IBO itself (theory +
 * practical), and a realistic multi-year prep arc.
 * Cross-links /usabo-coaching, /how-to-qualify-for-usabo, /ibo-coaching-usa.
 *
 * HONESTY: no invented exact cutoffs or quotas beyond the well-established
 * structure (USABO is run by CEE; Open → Semifinal → National Finals; the top
 * 4 finalists form Team USA at the IBO). Selection counts at intermediate
 * stages and score cutoffs are NOT fabricated — they are described qualitatively
 * and noted to vary by year.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  ChevronRight,
  FlaskConical,
  Globe2,
  Home,
  MessageCircle,
  Microscope,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/how-to-make-us-ibo-team'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'How to Make the US IBO Team — The USABO Pathway to the Biology Olympiad',
  description:
    'How a US high-school student reaches the International Biology Olympiad (IBO): the USABO ladder run by the Center for Excellence in Education — Open Exam → Semifinal → National Finals, where the top four finalists become Team USA. Covers what the Finals and team selection involve, the IBO theory and practical exams, and a realistic multi-year preparation arc.',
  keywords: [
    'how to make the US IBO team',
    'how to make team USA biology olympiad',
    'USABO to IBO pathway',
    'international biology olympiad team USA',
    'USABO national finals',
    'USABO top 4 team usa',
    'how to qualify for IBO',
    'biology olympiad pathway USA',
    'USABO open exam semifinal finals',
    'IBO theory practical exam',
    'team usa biology olympiad selection',
    'multi-year USABO preparation',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      'en-US': PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'How to Make the US IBO Team — The USABO Pathway to the Biology Olympiad',
    description:
      'The full route from the USABO Open Exam to the International Biology Olympiad: Open → Semifinal → National Finals → top 4 Team USA, what each stage involves, and a realistic multi-year prep arc.',
    url: PAGE_URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'How to Make the US IBO Team — The USABO Pathway to the Biology Olympiad',
    description:
      'Open → Semifinal → National Finals → top 4 Team USA → IBO. What each stage involves and a realistic multi-year preparation arc.',
  },
  robots: 'index, follow, max-image-preview:large',
}

// The pathway stages. The structure (Open → Semifinal → National Finals → top
// 4 Team USA → IBO; USABO run by CEE) is well established. Intermediate
// selection counts and score cutoffs vary year to year and are NOT stated as
// fixed numbers.
const STAGES = [
  {
    icon: BookOpen,
    n: 1,
    title: 'USABO Open Exam',
    when: 'Typically February',
    detail:
      'The entry point, taken at your school after it registers with the Center for Excellence in Education (CEE), which runs USABO. It is a multiple-choice exam covering the breadth of college-level biology. A scoring threshold (which varies by year) advances the top scorers to the Semifinal — there is no fixed published cutoff to plan around, so the goal is simply to score as high as you can.',
  },
  {
    icon: FlaskConical,
    n: 2,
    title: 'USABO Semifinal Exam',
    when: 'Typically March',
    detail:
      'A harder exam that adds free-response and analytical questions to the multiple choice, demanding deeper reasoning and data interpretation rather than recall alone. The top performers nationwide advance to the National Finals. This is the stage where genuine olympiad-level depth (beyond AP Biology) starts to separate students.',
  },
  {
    icon: Microscope,
    n: 3,
    title: 'USABO National Finals',
    when: 'Typically late spring',
    detail:
      'A residential training-and-selection camp for the national finalists. It combines intensive instruction with rigorous theoretical and hands-on laboratory examinations across the IBO discipline areas. Performance across these exams determines the final ranking.',
  },
  {
    icon: Users,
    n: 4,
    title: 'Team USA — the top four',
    when: 'From the Finals',
    detail:
      'The four highest-ranked finalists are selected to represent the United States as Team USA at the International Biology Olympiad. This is the narrow gate of the whole pathway: from a very large national entry pool, only four students make the team each year, which is what makes the achievement so distinctive.',
  },
  {
    icon: Globe2,
    n: 5,
    title: 'International Biology Olympiad (IBO)',
    when: 'Typically July',
    detail:
      'Team USA joins national teams from dozens of countries. The IBO is decided by two long theoretical exams and a set of practical laboratory exams spanning fields such as cell and molecular biology, plant and animal anatomy and physiology, ethology, genetics and evolution, ecology, and biosystematics. Medals (gold, silver, bronze) are awarded by score distribution rather than by a fixed pass mark.',
  },
]

// The IBO discipline areas — standard published scope; safe to list.
const IBO_DISCIPLINES = [
  'Cell biology & biochemistry',
  'Molecular biology & genetics',
  'Plant anatomy & physiology',
  'Animal anatomy & physiology',
  'Ethology (animal behaviour)',
  'Genetics & evolution',
  'Ecology',
  'Biosystematics',
]

// A relative, multi-year arc — not tied to specific grades or calendar dates,
// because students enter at different ages and the path is rarely linear.
const PREP_ARC = [
  {
    label: 'Year 1 — Build the foundation',
    detail:
      'Master college-level general biology cover to cover (Campbell Biology is the standard backbone). Sit the Open Exam to learn the format and set a baseline. Many strong students do not clear far in their first attempt — that is normal and useful.',
  },
  {
    label: 'Year 2 — Add depth & reach the Semifinal',
    detail:
      'Go beyond the survey text into the reference layer where the Semifinal lives — molecular cell biology, biochemistry and metabolism, genetics, and plant and animal physiology in mechanistic depth. Add biostatistics and data-interpretation practice, which AP-level study under-trains. Drill past Open and Semifinal papers.',
  },
  {
    label: 'Year 3 — Finals-level theory & lab skills',
    detail:
      'If you reach the National Finals, the differentiator becomes practical laboratory technique and exam-condition problem solving across all the IBO discipline areas — microscopy, dissection, molecular techniques, and quantitative analysis — alongside continued theory depth.',
  },
  {
    label: 'Throughout — Compete, review, repeat',
    detail:
      'Treat each year as a cycle: compete, analyse exactly where points were lost, and target those gaps. Reaching Team USA almost always takes more than one season, and a student who plans for a multi-year arc rather than a single attempt is far better positioned.',
  },
]

const FAQS = [
  {
    question: 'How does a US student make the IBO team?',
    answer:
      'Through the USA Biology Olympiad (USABO), run by the Center for Excellence in Education (CEE). The ladder is: take the Open Exam at your school, advance on score to the Semifinal Exam, then to the National Finals — a residential camp with theoretical and laboratory exams. The four top-ranked finalists are selected as Team USA and represent the United States at the International Biology Olympiad (IBO). Only four students make the team each year.',
  },
  {
    question: 'What score do I need to advance at each USABO stage?',
    answer:
      'There is no fixed published cutoff to plan around — the score thresholds that advance students from the Open to the Semifinal, and from the Semifinal to the National Finals, vary from year to year depending on the field. The practical goal is simply to score as high as possible at each stage rather than aim at a specific number. We have deliberately not stated exact cutoffs here because they are not fixed.',
  },
  {
    question: 'What happens at the National Finals?',
    answer:
      'The National Finals is a residential training-and-selection camp for the national finalists. It blends intensive instruction with rigorous theoretical exams and hands-on laboratory practicals across the IBO discipline areas. Your combined performance across these exams determines your final ranking, and the top four finalists form Team USA.',
  },
  {
    question: 'What is the IBO itself like?',
    answer:
      'The International Biology Olympiad brings together national teams from dozens of countries. It is decided by two long theoretical exams and a set of practical laboratory exams covering cell and molecular biology, plant and animal anatomy and physiology, ethology, genetics and evolution, ecology, and biosystematics. Medals are awarded based on the distribution of scores rather than a fixed pass mark, so a large share of competitors earn a medal.',
  },
  {
    question: 'How long does it take to make Team USA?',
    answer:
      'Realistically, more than one season. The biology required runs well beyond AP Biology into reference-level depth and laboratory skill, and most students who reach the National Finals or Team USA do so after several attempts. Planning a multi-year arc — foundation first, then Semifinal-level depth, then Finals-level theory and lab technique — is far more effective than treating it as a single exam to cram for.',
  },
  {
    question: 'Is USABO different from the AP Biology exam?',
    answer:
      'Yes, substantially. AP Biology is a solid foundation, but USABO — especially from the Semifinal onward — demands deeper mechanistic understanding, data and statistical interpretation, and (at the Finals and IBO) genuine laboratory skill. Clearing the Open Exam with an AP background is achievable; reaching the Finals and Team USA requires a significant step up in depth.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'USABO Coaching',
      item: `${SITE_URL}/usabo-coaching`,
    },
    { '@type': 'ListItem', position: 3, name: 'How to Make the US IBO Team', item: PAGE_URL },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to make the US team for the International Biology Olympiad',
  description:
    'The pathway by which a US high-school student reaches the International Biology Olympiad via the USA Biology Olympiad: Open Exam, Semifinal Exam, National Finals, and selection as one of the top four for Team USA.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  step: STAGES.map((s) => ({
    '@type': 'HowToStep',
    position: s.n,
    name: s.title,
    text: s.detail,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Make the US IBO Team: The USABO Pathway to the Biology Olympiad',
  url: PAGE_URL,
  inLanguage: 'en-US',
  datePublished: '2026-06-26',
  dateModified: '2026-06-26',
  author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType:
      'USA-based high-school students aiming for the USA Biology Olympiad and International Biology Olympiad',
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'details p'],
  },
}

export default function HowToMakeUsIboTeamPage() {
  const waUrl =
    'https://wa.me/918826444334?text=' +
    encodeURIComponent(
      'Hi — my child is aiming for USABO / the IBO (Grade/Year ___, based in [city, US]). Please share how your coaching maps to the Open → Semifinal → Finals pathway.'
    )

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'USA Biology Olympiad (USABO)',
          'International Biology Olympiad (IBO)',
          'Biology Olympiad Coaching',
          'Olympiad Laboratory Practical Preparation',
          'College-level Biology',
        ]}
        jobTitle="Biology Olympiad Coach — USABO & IBO Preparation"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/usabo-coaching" className="hover:text-blue-700">
                USABO Coaching
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">How to Make the US IBO Team</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-900">
            <Trophy className="h-3.5 w-3.5" />
            The Pathway · USABO → IBO
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            How to make the US IBO team:{' '}
            <span className="text-purple-700">the full USABO pathway.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Representing the United States at the International Biology Olympiad (IBO) runs through
            one ladder: the USA Biology Olympiad (USABO), administered by the Center for Excellence
            in Education. You take the Open Exam, advance on score to the Semifinal, then to the
            National Finals &mdash; and the four top-ranked finalists become Team USA. Only four
            students make the team each year, which is exactly what makes it stand out. Here is what
            each stage involves and a realistic, multi-year way to prepare for it.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/usabo-coaching"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-700 px-5 py-3 text-base font-semibold text-white shadow hover:bg-purple-800"
            >
              <Target className="h-5 w-5" />
              See USABO coaching
            </Link>
            <Link
              href="/how-to-qualify-for-usabo"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-purple-600 px-5 py-3 text-base font-semibold text-purple-700 hover:bg-purple-50"
            >
              <BookOpen className="h-5 w-5" />
              How to qualify for USABO
            </Link>
          </div>

          <p className="mt-3 text-sm font-medium text-slate-600">
            Live online in your US time zone (ET / CT / MT / PT).
          </p>
        </section>

        {/* Stages */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The five stages, Open to IBO
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The structure is fixed; the score thresholds and the number of students advancing at
              each stage vary year to year, so we describe them qualitatively rather than inventing
              cutoffs.
            </p>
            <div className="mt-8 space-y-5">
              {STAGES.map((s) => (
                <div key={s.n} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
                        <h3 className="text-lg font-bold text-slate-900">
                          Stage {s.n}: {s.title}
                        </h3>
                        <span className="text-sm font-medium text-purple-700">{s.when}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IBO disciplines */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What the IBO tests</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The IBO is decided by two long theoretical exams and a set of practical laboratory
              exams. The practical component is what most distinguishes it from a written national
              exam &mdash; and the discipline areas span the full breadth of biology.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {IBO_DISCIPLINES.map((d) => (
                <span
                  key={d}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-purple-700"
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-slate-600">
              Medals (gold, silver, bronze) are awarded by the distribution of scores rather than a
              fixed pass mark, so a substantial share of competitors earn a medal &mdash; but the
              top of the field is genuinely world-class.
            </p>
          </div>
        </section>

        {/* Prep arc */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              A realistic multi-year preparation arc
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Reaching Team USA almost always takes more than one season. This is a relative arc
              &mdash; students enter at different ages and progress is rarely linear &mdash; not a
              fixed timetable.
            </p>
            <div className="mt-8 space-y-4">
              {PREP_ARC.map((p) => (
                <div key={p.label} className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-slate-900">{p.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Making Team USA &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Soft CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Award className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Plan the pathway with a coach</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              The route from the Open Exam to Team USA is long, and the biggest gains come from a
              plan matched to your starting point and from interpreting your past-paper mistakes
              correctly. We coach the full USABO and IBO pathway live, in all US time zones.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-base font-semibold hover:bg-purple-700"
              >
                <Target className="h-5 w-5" />
                See USABO coaching
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp a question
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              WhatsApp works free from the US &mdash; no international call needed.
            </p>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-6 text-center text-xl font-bold text-slate-900">Related guides</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <Link
                href="/usabo-coaching"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-purple-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-purple-700">USABO Coaching</h3>
                <p className="mt-1 text-xs text-slate-600">Full Open + Semifinal pathway</p>
              </Link>
              <Link
                href="/how-to-qualify-for-usabo"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-purple-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-purple-700">How to Qualify for USABO</h3>
                <p className="mt-1 text-xs text-slate-600">Registration and the Open Exam</p>
              </Link>
              <Link
                href="/ibo-coaching-usa"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-purple-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-purple-700">IBO Coaching (USA)</h3>
                <p className="mt-1 text-xs text-slate-600">Theory + practical for the IBO</p>
              </Link>
              <Link
                href="/usabo-6-month-prep-plan"
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-purple-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-purple-700">USABO 6-Month Prep Plan</h3>
                <p className="mt-1 text-xs text-slate-600">Month-by-month Open Exam schedule</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
