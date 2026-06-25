/**
 * /ap-biology-vs-college-bio-mcat-bridge
 *
 * Honest pre-med funnel framing. Most tutoring competitors oversell
 * AP Biology as a "med school prep" — it isn't. AP Bio doesn't satisfy
 * MCAT prereqs and most med schools don't accept AP credit for the
 * biology requirement. We frame it as foundation, not substitute,
 * which is both more truthful and more credible.
 *
 * Targets the long-tail "is AP Biology good for pre-med" /
 * "AP Biology MCAT" / "does AP Biology count for medical school".
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import {
  ChevronRight,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Stethoscope,
} from 'lucide-react'

const CANONICAL = '/ap-biology-vs-college-bio-mcat-bridge'
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology vs College Bio vs MCAT — The Pre-Med Pipeline · Cerebrum',
  description:
    "Honest framing: AP Biology is foundation, not substitute. What AP Bio covers, what it doesn't, MCAT prereq reality, and BS/MD vs traditional pre-med pathways.",
  keywords: [
    'AP Biology pre-med',
    'is AP Biology good for medical school',
    'AP Biology MCAT',
    'does AP Biology count for medical school',
    'AP Bio vs college biology',
    'AP Biology BS/MD',
    'AP Biology pre-med pathway',
    'AP Bio vs MCAT prep',
    'AP Biology medical school admissions',
    'AP Biology Brown PLME',
    'AP Biology Northwestern HPME',
  ],
  canonical: CANONICAL,
})

export default function APBiologyVsCollegeBioMCATBridgePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'AP Biology vs College Bio vs MCAT — The honest pre-med pipeline',
    description:
      'AP Biology is a strong baseline signal but does not satisfy medical school prerequisites. Honest framing of what AP Bio covers vs college biology vs MCAT prep.',
    url: `${SITE_URL}${CANONICAL}`,
    inLanguage: 'en-US',
    datePublished: '2026-04-30',
    dateModified: '2026-06-08',
    author: { '@type': 'Person', name: 'Dr. Shekhar C Singh', url: `${SITE_URL}/faculty` },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${CANONICAL}` },
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${CANONICAL}#webpage`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]'],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AP Biology Tutoring',
        item: `${SITE_URL}/ap-biology-tutor`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AP Bio → College Bio → MCAT',
        item: `${SITE_URL}${CANONICAL}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-700">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/ap-biology-tutor" className="text-gray-600 hover:text-blue-700">
                  AP Biology Tutoring
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">AP Bio → College Bio → MCAT</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Stethoscope className="w-4 h-4" /> Honest framing · cited sources · no medical-school
              promises
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6" data-speakable="title">
              AP Biology vs College Bio vs MCAT —
              <span className="block text-yellow-400 mt-2">The Pre-Med Pipeline, Honestly</span>
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed"
              data-speakable="summary"
            >
              The pre-med tutoring industry oversells AP Biology as &ldquo;medical school
              prep.&rdquo; It isn&apos;t — and pretending otherwise misleads families. AP Biology
              doesn&apos;t satisfy MCAT prerequisites, most medical schools don&apos;t accept AP
              credit for biology, and BS/MD pipelines value sustained science depth over any single
              AP score. AP Biology is a <em>foundation</em>, not a substitute. This guide says what
              AP Bio actually does and doesn&apos;t do for the pre-med pathway.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Three myths worth dispelling first
            </h2>
            <ol className="space-y-5 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>&ldquo;A 5 in AP Biology gets me out of college biology.&rdquo;</strong>{' '}
                Sometimes — but rarely if you&apos;re going pre-med. Many universities
                <em> do</em> grant general biology credit for an AP-5 (8 credits at most public
                universities, varying at privates). However, most pre-med advisors recommend taking
                college biology anyway, because medical schools nearly universally require{' '}
                <em>two semesters of college-level biology with lab</em> as a prerequisite. AP
                credit is typically not accepted toward this prerequisite by medical schools —
                including all of the top 30 by USNWR, per Kaplan&apos;s med-school prerequisite
                reference. So even if your university accepts AP-5 for credit, you&apos;ll likely
                retake college biology to satisfy med school admissions.
              </li>
              <li>
                <strong>&ldquo;AP Biology is sufficient prep for the MCAT.&rdquo;</strong> No. The
                MCAT&apos;s biological and biochemical foundations section assumes college-level
                biology, biochemistry, and basic organic chemistry — significantly deeper than AP
                Bio. AP Bio covers ~60% of MCAT-relevant biology content but at a shallower level
                than the MCAT requires; biochemistry (which AP Bio touches lightly) is heavily
                tested on the MCAT. Most successful MCAT takers report 200+ hours of dedicated MCAT
                prep on top of completed college coursework.
              </li>
              <li>
                <strong>&ldquo;AP Biology determines BS/MD admissions.&rdquo;</strong> Also no.
                BS/MD programmes (Brown PLME, Northwestern HPME, NYU Honors / Stony Brook BS-MD,
                Baylor 8-Year, etc.) are highly selective and look at sustained science depth,
                research portfolio, recommendations, essays, and interviews. AP-5 is a baseline
                signal, not a differentiator. USABO Semifinalist standing — which AP-5 students
                often pursue in parallel — is a much stronger differentiator for these competitive
                admissions.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              What AP Biology covers vs College Bio vs MCAT
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left bg-white">
                    <th className="py-3 px-3 font-semibold">Topic area</th>
                    <th className="py-3 px-3 font-semibold">AP Biology</th>
                    <th className="py-3 px-3 font-semibold">College Bio</th>
                    <th className="py-3 px-3 font-semibold">MCAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {[
                    ['Cell biology', 'Strong (Unit 2)', 'Strong + lab', 'Tested heavily'],
                    [
                      'Cellular respiration',
                      'Strong (Unit 3)',
                      'Stronger + biochemistry',
                      'Tested + integration with biochem',
                    ],
                    [
                      'Genetics',
                      'Strong (Units 5–6)',
                      'Strong + molecular techniques',
                      'Tested + clinical genetics',
                    ],
                    ['Evolution', 'Strong (Unit 7)', 'Stronger', 'Light coverage'],
                    ['Ecology', 'Strong (Unit 8)', 'Stronger', 'Not tested'],
                    ['Biochemistry', 'Light', 'Separate semester', 'Tested heavily'],
                    ['Anatomy + physiology', 'Light', 'Stronger', 'Tested heavily (organ systems)'],
                    [
                      'Lab techniques (PCR, gel, microscopy)',
                      'Conceptual',
                      'Hands-on (lab section)',
                      'Tested + experimental design',
                    ],
                    [
                      'Organic chemistry',
                      'Not covered',
                      'Separate course',
                      'Tested + reaction mechanisms',
                    ],
                  ].map((row) => (
                    <tr key={row[0]} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-medium text-slate-900">{row[0]}</td>
                      <td className="py-3 px-3 text-slate-700">{row[1]}</td>
                      <td className="py-3 px-3 text-slate-700">{row[2]}</td>
                      <td className="py-3 px-3 text-slate-700">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Sources: AP Biology Course and Exam Description (College Board, 2024–25); AAMC MCAT
              content outline; Kaplan med-school prerequisites reference.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              So what does AP Biology actually do for pre-med?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Real, specific things — none of which are guarantees, but all of which compound:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Stronger college biology grade.</strong> Pre-meds who arrive at college with
                AP-5-level baseline routinely pull As in introductory biology without overwhelming
                effort, freeing time for organic chem, biochem, and the MCAT prep cycle. A higher
                college biology GPA is a real, measurable input to med-school AMCAS applications.
              </li>
              <li>
                <strong>MCAT runway, not MCAT prep.</strong> AP Bio gives you the conceptual
                vocabulary (enzyme kinetics, signal transduction, gene regulation, evolution
                mechanisms) that the MCAT assumes. You still need the dedicated 200+ hour MCAT prep
                cycle, but you start it from a stronger position.
              </li>
              <li>
                <strong>Research-readiness for high-school + college labs.</strong> Strong AP Bio
                students can productively shadow or assist in research labs (Fred Hutch, Memorial
                Sloan Kettering, Stanford SCI, NIH summer programmes) at ages where weaker biology
                baselines wouldn&apos;t let them engage with the technical content. Research
                experience is a major signal in BS/MD and pre-med admissions.
              </li>
              <li>
                <strong>Olympiad pathway.</strong> AP-5 students with biology depth ambition
                naturally pivot to USABO, where Semifinalist standing is a national-tier credential
                routinely cited in successful Ivy / MIT / Stanford / Johns Hopkins STEM
                applications. This is the strongest differentiator for the competitive BS/MD
                pipelines.
              </li>
              <li>
                <strong>College-application signal.</strong> A 5 on AP Biology, especially paired
                with related sciences (AP Chem 5, AP Physics 5), reads as biology- serious to
                admissions committees. It doesn&apos;t guarantee admission. It does mean your
                transcript reads correctly for STEM majors and pre-med tracks.
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The honest pre-med stack
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Here&apos;s the actual sequence we coach toward, with no overselling:
            </p>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>
                  High school: AP Bio 5 + AP Chem 5 + AP Physics 5 + USABO Open / Semifinal
                </strong>{' '}
                — builds a strong STEM transcript and a national-tier biology credential. Valuable
                for top-college admissions; valuable for BS/MD pipelines; valuable as foundation for
                college coursework.
              </li>
              <li>
                <strong>Undergrad year 1: Intro biology + intro chemistry (with labs)</strong> —
                takes AP Bio foundation and builds it to college depth. Med schools require this; AP
                credit is rarely accepted as substitute.
              </li>
              <li>
                <strong>Undergrad year 2: Organic chemistry + biochemistry</strong> — prerequisites
                for the MCAT and for medical school. AP Bio doesn&apos;t cover organic chem and only
                lightly covers biochem.
              </li>
              <li>
                <strong>
                  Undergrad year 3: Physics + advanced biology (genetics, cell biology, physiology)
                </strong>{' '}
                — remaining MCAT prerequisites. Sustained research engagement during this period.
              </li>
              <li>
                <strong>Late undergrad: 200+ hours of dedicated MCAT prep</strong> — strong AP Bio +
                strong college biology shortens this cycle but doesn&apos;t replace it.
              </li>
              <li>
                <strong>
                  AMCAS application: GPA + MCAT + research + recommendations + essays + interviews
                </strong>{' '}
                — AP Bio shows up nowhere directly. Your college biology grade does, indirectly
                through GPA.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Sources we cite</h2>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>AAMC (Association of American Medical Colleges).</strong> MCAT content
                outline + matriculant data — the authoritative source on what medical schools
                actually expect.
              </li>
              <li>
                <strong>Kaplan med-school prerequisites guide.</strong> Synthesised reference on
                whether AP credit satisfies med-school biology / chemistry / physics requirements at
                top programmes (overwhelmingly: it does not).
              </li>
              <li>
                <strong>College Board AP Biology CED.</strong> Defines exactly what AP Bio tests;
                useful for the comparison table above.
              </li>
              <li>
                <strong>BS/MD programme pages</strong> (Brown PLME, Northwestern HPME, NYU Honors /
                Stony Brook, Baylor 8-Year). Each programme&apos;s admissions page describes what
                they value — sustained science depth + research, not single AP scores.
              </li>
              <li>
                <strong>USNWR Best Medical Schools rankings</strong> + per-programme MCAT score
                distributions for matriculants. Shows the realistic MCAT range for top med-school
                admits.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> April 2026 by Dr. Shekhar C Singh, AIIMS graduate
                &amp; founder of Cerebrum Biology Academy. AAMC and AP CED guidance changes annually
                — verify current requirements with the programmes you target.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Microscope className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We coach AP Bio. We coach USABO. We don&apos;t oversell either.
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              If your child is pre-med-ambitious and wants the strongest realistic foundation, the
              integrated AP-5 + USABO Semifinal track is the highest- value combination — and we run
              it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ap-biology-tutor"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <GraduationCap className="w-5 h-5" />
                See AP Biology programme
              </Link>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <MessageCircle className="w-5 h-5" />
                See USABO programme
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More AP Biology guides
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/ap-biology-frq-rubric-mastery"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">FRQ Rubric Mastery</h3>
                <p className="text-xs text-slate-600 mt-1">Annotated College Board rubrics</p>
              </Link>
              <Link
                href="/ap-biology-score-5-study-guide"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">Score-5 Study Guide</h3>
                <p className="text-xs text-slate-600 mt-1">8-week unit-weighted plan</p>
              </Link>
              <Link
                href="/usabo-past-papers-archive"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">USABO Past Papers</h3>
                <p className="text-xs text-slate-600 mt-1">Annotated archive 2010–2025</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
