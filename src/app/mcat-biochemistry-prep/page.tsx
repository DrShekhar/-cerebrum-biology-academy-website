/**
 * /mcat-biochemistry-prep
 *
 * Section-specific page targeting "MCAT biochemistry prep" — biochem is
 * ~25% of the B/B section and is the area Campbell-only students
 * underperform on. Distinct from /mcat-biology-preparation (broad hub).
 *
 * Server component. Plain WhatsApp anchors. USD pricing only.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Beaker,
  BookOpen,
  ChevronRight,
  Clock,
  Home,
  MessageCircle,
  Target,
  TrendingUp,
} from 'lucide-react'

const CANONICAL = '/mcat-biochemistry-prep'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

const WHATSAPP_HREF = `https://wa.me/918826444334?text=${encodeURIComponent(
  'Hi! I want focused MCAT biochemistry prep (Lehninger-based). Please share the programme details and the biochem-specific diagnostic.'
)}`

export const metadata: Metadata = {
  title: 'MCAT Biochemistry Prep | Lehninger-Based Coaching | Cerebrum',
  description:
    'MCAT biochemistry prep beyond Campbell — Lehninger-based coaching on amino acids, enzyme kinetics, metabolism, and regulation. Biology-specialist faculty, passage drills, USD pricing.',
  keywords: [
    'MCAT biochemistry prep',
    'MCAT biochem',
    'Lehninger biochemistry MCAT',
    'biochemistry on MCAT',
    'MCAT enzyme kinetics',
    'MCAT amino acids',
    'MCAT metabolism prep',
    'MCAT glycolysis Krebs',
    'MCAT biochem study plan',
    'MCAT biochemistry tutor',
    'MCAT biochem section 1',
    'MCAT biochem questions',
    'first-semester biochemistry MCAT',
  ],
  openGraph: {
    title: 'MCAT Biochemistry Prep — Beyond Campbell Biology',
    description:
      'Lehninger-based MCAT biochem coaching. Amino acids, enzymes, metabolism, regulation. Biology-specialist faculty, passage drilling, USD pricing.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT Biochemistry Prep',
    description: 'Lehninger-based MCAT biochem coaching from biology specialists.',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const biochemFAQs = [
  {
    question: 'Do I need to memorise the entire Krebs cycle for the MCAT?',
    answer:
      'Yes, but with focus. AAMC expects you to know the eight intermediates of the citric acid cycle (citrate, isocitrate, alpha-ketoglutarate, succinyl-CoA, succinate, fumarate, malate, oxaloacetate), the three regulated enzymes (citrate synthase, isocitrate dehydrogenase, alpha-ketoglutarate dehydrogenase), the NADH/FADH2/GTP yields per turn, and where carbons leave as CO2. You do not need to memorise every cofactor or every regulatory allosteric site — those are passage-provided when tested. Most B/B Krebs questions integrate the cycle with another concept (e.g., diabetes ketogenesis, pyruvate dehydrogenase deficiency) rather than testing pure recall.',
  },
  {
    question: 'How much biochemistry is on Section 1 (B/B) versus Section 3 (Psych/Soc)?',
    answer:
      'Biochemistry is roughly 25% of the B/B section by question count — about 15 of 59 questions on average. Section 3 (Psychological, Social, and Biological Foundations of Behavior) contains very little classical biochemistry; the biology there is mostly neurobiology, sensory physiology, and behavioural endocrinology. The C/P section (Section 2) overlaps with biochem on acid-base chemistry, thermodynamics of biological reactions, and some enzyme kinetics — roughly 5-10% of C/P questions touch biochem. So in total, ~17-22% of your full MCAT score is biochemistry-dependent, with the bulk concentrated in B/B.',
  },
  {
    question: 'Is Lehninger overkill for the MCAT?',
    answer:
      'No — Lehninger Principles of Biochemistry is the standard first-semester undergraduate biochemistry textbook in the US, and the MCAT explicitly tests at the level of an introductory biochemistry course. The chapters you need are amino acids and proteins, enzymes (kinetics, regulation, inhibition), carbohydrate metabolism (glycolysis, gluconeogenesis, Krebs, ETC), lipid metabolism (beta-oxidation, ketogenesis), amino acid metabolism (urea cycle, transamination), and metabolic integration. The remaining chapters — molecular biology techniques, nucleotide chemistry, signal transduction — overlap with Campbell and don&apos;t need a second pass from Lehninger. We use roughly 12 of Lehninger&apos;s 30 chapters in our MCAT biochem programme.',
  },
  {
    question: 'Lehninger vs Berg vs Stryer — which biochem book should I use?',
    answer:
      'For MCAT prep, Lehninger (Principles of Biochemistry, current edition) is our default recommendation because its problem sets are closer in style to MCAT integrative reasoning and its metabolic pathway diagrams are the clearest. Berg, Tymoczko, Stryer (Biochemistry, current edition) is comparable in content depth and is the better choice if your university uses it — you don&apos;t need both. Stryer alone (older "Stryer" editions) is now historical; use the current Berg/Tymoczko/Stryer volume if you go that route. Marks&apos; Basic Medical Biochemistry is more clinical and less MCAT-aligned. Pick one and stick with it.',
  },
  {
    question: 'Is MCAT biochemistry pure memorisation or applied reasoning?',
    answer:
      'Applied reasoning, primarily. The MCAT does test some foundational recall — amino acid one- and three-letter codes, the pKa values of ionisable side chains, the basic structure of the four major biomolecule classes — but the bulk of biochem questions are passage-based and ask you to apply principles to novel enzymes, pathways, or experimental setups. A typical B/B biochem passage might describe a previously unstudied kinase, give you kinetic data in a Lineweaver-Burk plot, and ask you to predict the effect of a competitive inhibitor. The data is in the passage; the reasoning is what you bring.',
  },
  {
    question: 'I did NEET / IB Biology — how much biochem gap do I have for the MCAT?',
    answer:
      'Substantial, in most cases. NEET Biology covers some biochemistry (enzyme classes, basic metabolism, photosynthesis) but at a much shallower depth than the MCAT requires — enzyme kinetics in NEET is qualitative, while the MCAT tests Lineweaver-Burk plots, Michaelis-Menten kinetics with calculation, and competitive vs non-competitive inhibition patterns. IB Biology HL is closer but still treats biochem as a chapter rather than a half-semester course. Most NEET / IB students need 6-8 weeks of focused biochem build-up before they can drill MCAT biochem passages productively. Our small-batch and 1:1 programmes are calibrated for this.',
  },
]

export default function MCATBiochemistryPrepPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'MCAT Biochemistry Prep — Lehninger-Based Coaching',
    description:
      'Focused MCAT biochemistry preparation beyond Campbell Biology. Lehninger-based coverage of amino acids, enzyme kinetics, metabolism, and regulation with biology-specialist faculty and MCAT-style passage drilling.',
    url: PAGE_URL,
    inLanguage: 'en-US',
    availableLanguage: ['English'],
    educationalLevel: 'Pre-Medical',
    coursePrerequisites: 'Introductory undergraduate biology; general chemistry recommended',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
      sameAs: SITE_URL,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: biochemFAQs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'MCAT Biology',
        item: `${SITE_URL}/mcat-biology-preparation`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Biochemistry Prep',
        item: PAGE_URL,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
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
                <Link
                  href="/mcat-biology-preparation"
                  className="text-gray-600 hover:text-blue-700"
                >
                  MCAT Biology
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">Biochemistry Prep</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Beaker className="w-4 h-4" />
              Biochem is ~25% of the B/B section · the Campbell-only blind spot
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              MCAT Biochemistry Prep —
              <span className="block text-purple-300 mt-2">Beyond Campbell Biology</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              Campbell Biology touches biochemistry lightly. The MCAT tests biochem at the depth of
              a full first-semester undergraduate course. This is the gap. Cerebrum&apos;s biochem
              programme uses Lehninger Principles of Biochemistry, drills MCAT-style metabolism
              passages, and is taught by biology specialists — not generalist test-prep instructors.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-purple-300" />
                6-8 weeks of focused biochem
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-purple-300" />
                Lehninger-based curriculum
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <TrendingUp className="w-4 h-4 text-purple-300" />
                Metabolism passage drills
              </span>
            </div>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Start biochem prep on WhatsApp
            </a>
          </div>
        </section>

        {/* Why biochem trips up MCAT students */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why biochemistry trips up MCAT students
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Most pre-med students arrive at MCAT prep having taken at least one year of
              introductory biology — usually with Campbell Biology as the primary textbook. Campbell
              treats biochemistry as a chapter rather than as a discipline. Its coverage of amino
              acids, enzyme kinetics, glycolysis, and the citric acid cycle is structurally accurate
              but thin compared to what the MCAT actually tests. Students who rely on Campbell alone
              for biochem typically lose 4-8 raw points on the B/B section to biochem-dense passages
              — enough to drop a 127 to a 124.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The fix is straightforward: do a focused pass through first-semester biochemistry
              before drilling B/B passages. AAMC&apos;s content outline explicitly maps to a
              one-semester undergraduate biochemistry course, and US pre-med curricula assume
              students have completed at least one such semester before sitting the MCAT.
              International students (especially those coming from NEET, IB Biology, or A-Level
              biology backgrounds) often skip this step because their secondary-school biology felt
              comprehensive — until they meet AAMC enzyme kinetics passages.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The pattern repeats consistently in diagnostic mocks. Students with strong general
              biology scores plateau on B/B at 124-126 specifically because of biochem-dense
              questions. The plateau breaks when they invest 40-60 hours in Lehninger plus 100+ MCAT
              biochem passages.
            </p>
          </div>
        </section>

        {/* Biochem topics on the MCAT */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Biochemistry topics on the MCAT
            </h2>
            <p className="text-slate-600 mb-8">
              The eight high-yield blocks we drill in our biochem programme. All map to the AAMC
              content outline for Foundational Concepts 1 and 5.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Amino acids & protein structure',
                  body: 'Twenty standard amino acids — names, three-letter codes, one-letter codes, side-chain pKa values, charge at physiological pH. Primary, secondary, tertiary, quaternary structure. Protein folding, denaturation, post-translational modifications. The single most tested biochem block.',
                },
                {
                  title: 'Enzyme kinetics & regulation',
                  body: 'Michaelis-Menten kinetics, Vmax, Km, kcat, catalytic efficiency. Lineweaver-Burk and Eadie-Hofstee plots. Competitive, non-competitive, uncompetitive, mixed inhibition. Allosteric regulation, cooperativity, feedback inhibition. Tested heavily in passages.',
                },
                {
                  title: 'Glycolysis, Krebs, ETC',
                  body: 'The full carbohydrate oxidation pathway. Glycolysis enzymes (especially PFK-1 regulation), pyruvate dehydrogenase complex, citric acid cycle intermediates, electron transport chain complexes I-IV, ATP synthase, chemiosmosis. NADH/FADH2/ATP stoichiometry.',
                },
                {
                  title: 'Fatty acid metabolism',
                  body: 'Beta-oxidation (mitochondrial), fatty acid synthesis (cytosolic), the carnitine shuttle, ketogenesis, ketone body utilisation. Why long-chain fatty acids need carnitine, why ketones spare glucose in starvation. Reciprocal regulation with carbohydrate metabolism.',
                },
                {
                  title: 'Gluconeogenesis & regulation',
                  body: "The four unique gluconeogenic enzymes (pyruvate carboxylase, PEPCK, F-1,6-BPase, G-6-Pase) — why they exist, where they're regulated. Cori cycle, glucose-alanine cycle. Hormonal control by insulin/glucagon/cortisol. Common test integration with diabetes physiology.",
                },
                {
                  title: 'Amino acid catabolism & urea cycle',
                  body: "Transamination, oxidative deamination, the urea cycle's five enzymes, glucogenic vs ketogenic amino acids. Disorders that map to urea cycle defects (e.g., OTC deficiency) — common in B/B clinical passages.",
                },
                {
                  title: 'Lipid & nucleotide metabolism',
                  body: 'Cholesterol synthesis (HMG-CoA reductase as the regulated step), bile acid synthesis, phospholipid metabolism, sphingolipid disorders. Nucleotide salvage vs de novo synthesis, purine and pyrimidine biosynthesis basics, disorders like Lesch-Nyhan and gout.',
                },
                {
                  title: 'Metabolic integration & hormonal regulation',
                  body: 'Fed state vs fasted state vs starvation — which pathways are active, which hormones dominate, where the body sources fuel. Insulin and glucagon signalling cascades. Diabetes, hypoglycaemia, and metabolic acidosis as clinical applications.',
                },
              ].map((t) => (
                <div
                  key={t.title}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lehninger vs Berg vs Stryer */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Lehninger, Berg/Stryer, or another textbook?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We recommend Lehninger Principles of Biochemistry (current edition by Cox, Nelson) as
              the primary reference for MCAT biochem prep. Three reasons: its problem sets are
              closest in style to MCAT integrative reasoning, its metabolic pathway diagrams are the
              clearest of any introductory biochem text, and it is the de facto standard
              first-semester biochemistry textbook at most US universities — so your MCAT reference
              matches your undergraduate course material.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Berg, Tymoczko, Stryer (Biochemistry, current edition) is the obvious alternative.
              Same depth, slightly different chapter order, and arguably better treatment of
              molecular biology topics. If your university uses Berg/Stryer, stay with it — you do
              not need both books. Older standalone Stryer editions are now historical and should
              not be used for current MCAT prep.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Marks&apos; Basic Medical Biochemistry is excellent but pitched at medical-school
              biochemistry, which is more clinical and less MCAT-aligned. Save it for your first
              year of med school. other generalist test-prep brands and other generalist test-prep
              brands biochem review books are condensed summaries — useful for last-month revision,
              not for primary learning.
            </p>
            <p className="text-slate-700 leading-relaxed">
              In our programme, students get a Lehninger chapter map showing which sections are
              AAMC-tested at full depth, which are tested only at passage context level, and which
              can be skipped. This reading guide alone saves roughly 30 hours of unfocused reading.
            </p>
          </div>
        </section>

        {/* Memorisation vs reasoning */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Memorisation versus reasoning on MCAT biochem
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              MCAT biochem is application-heavy, not pure recall. AAMC does expect some baseline
              memorisation — amino acid codes and pKas, the eight Krebs intermediates, the regulated
              enzymes of glycolysis and gluconeogenesis, the broad strokes of beta- oxidation.
              Beyond that baseline, almost everything is passage-driven: a novel enzyme with kinetic
              data, a previously unfamiliar pathway with regulatory arrows, a clinical case with
              metabolic implications.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The test-taking implication is that biochem rewards a different study pattern than
              pure-content subjects. After your baseline memorisation block, every additional study
              hour should be a passage. Reading more biochem chapters past the AAMC outline is low
              ROI. Drilling kinetic plots, predicting inhibition patterns from passage data, and
              tracing regulatory cascades through novel pathways is high ROI.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We measure this in our diagnostic data: students with strong Anki retention on amino
              acid pKas but no passage practice average 11/15 on biochem questions. Students who
              flip the ratio — basic memorisation plus 100+ biochem passages — average 13-14/15.
              Passages are the lever, not flashcards.
            </p>
          </div>
        </section>

        {/* How Cerebrum handles biochem */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How Cerebrum handles biochemistry
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The biochem track inside our B/B programme runs 6-8 weeks for most students. Week one
              is amino acids and protein structure — taught from Lehninger chapters 3-4 with an
              MCAT-focused supplementary worksheet on amino acid pKa reasoning. Week two is enzyme
              kinetics and inhibition — Lehninger chapters 6-7 plus 25 enzyme kinetics passages,
              including Lineweaver-Burk reading and competitive vs non-competitive inhibition
              pattern recognition.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Weeks three and four cover carbohydrate metabolism — glycolysis, the citric acid
              cycle, oxidative phosphorylation, gluconeogenesis, and metabolic regulation — paired
              with 40 metabolism passages and a senior-faculty walkthrough of the metabolic
              integration diagram. Week five is lipid and amino acid catabolism. Weeks six through
              eight (or six through six for fast students) integrate everything via clinical-style
              MCAT passages — diabetes, starvation, lactic acidosis, urea cycle disorders.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Throughout the track, students get weekly senior-faculty office hours and unlimited
              WhatsApp doubt access. Senior faculty review every missed biochem passage with the
              student and diagnose whether the loss was content (memorise this), reasoning (the
              passage gave you the data — extract it), or test-strategy (you spent six minutes on
              one question). This diagnostic loop is where the score gains compound.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              MCAT biochemistry coaching — pricing
            </h2>
            <p className="text-slate-600 mb-8">
              The biochem track is bundled inside the full B/B programme — same three tiers. Ad-hoc
              biochem tutoring outside the programme is $150/hour with senior faculty. USD only.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Self-Paced</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$499</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Async Lehninger-based biochem coverage with AAMC content outline mapping, 100+
                  biochem-specific passages, recorded enzyme-kinetics walkthroughs, WhatsApp doubt
                  access.
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-300 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Small-Batch</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$999</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Everything in Self-Paced plus weekly live biochem sessions (4-6 students), monthly
                  metabolism-pathway problem sets, peer Slack channel, senior faculty office hours.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-1">1:1 Senior Faculty</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$1,499</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Everything in Small-Batch plus weekly 90-minute 1:1 biochem sessions, personalised
                  Lehninger reading map, custom kinetics and metabolism drills, unlimited WhatsApp
                  faculty access.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Ad-hoc tutoring: $150/hour with senior faculty for biochem-only gap-fill sessions.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
              MCAT Biochemistry — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {biochemFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-slate-50 p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-purple-700 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Beaker className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Close the biochem gap before it costs you a B/B point.
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Talk to a Cerebrum biology specialist on WhatsApp. We&apos;ll send a 25-question
              biochem diagnostic before you commit to a programme.
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Start biochem prep on WhatsApp
            </a>
          </div>
        </section>

        {/* Cross-link footer (neutral anchor) */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Link
              href="/mcat-biology-preparation"
              className="text-purple-700 hover:text-purple-900 font-medium underline"
            >
              See the full MCAT Biology programme
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
