/**
 * /mcat-bb-passage-strategy-guide
 *
 * Cornerstone strategy page with worked examples — distinct from the
 * parallel-agent page at /mcat-biology-passage-strategy (which is
 * more conceptual). This page walks through three paraphrased
 * passage structures (enzyme kinetics, genetic experimental design,
 * metabolism integration), the four-question taxonomy, the time
 * budget, and a drill protocol.
 *
 * IMPORTANT: AAMC passage text is copyrighted. We paraphrase
 * structures only — no verbatim text reproduction.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Clock,
  ChevronRight,
  FileText,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Target,
} from 'lucide-react'

const CANONICAL = '/mcat-bb-passage-strategy-guide'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'MCAT B/B Passage Strategy Guide | Worked Examples | Cerebrum',
  description:
    'Step-by-step MCAT Bio/Biochem passage strategy with three worked passage walkthroughs (enzyme kinetics, genetic design, metabolism integration), question taxonomy, and timing.',
  keywords: [
    'MCAT B/B passage strategy guide',
    'MCAT Bio/Biochem passage walkthrough',
    'MCAT biology passage examples',
    'MCAT enzyme kinetics passage',
    'MCAT experimental design passage',
    'MCAT metabolism passage',
    'MCAT B/B time management',
    'MCAT passage question types',
    'MCAT B/B 90 second',
    'AAMC sample passage strategy',
    'MCAT B/B flag and return',
    'MCAT biology passage drill',
    'how to read MCAT B/B passages',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT B/B Passage Strategy Guide | Worked Examples',
    description:
      'Three paraphrased AAMC-style passages walked through end-to-end, question taxonomy, time budget, drill protocol.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT B/B Passage Strategy — Worked Examples',
    description: 'Three worked passage walkthroughs, 4-question taxonomy, timing, drill protocol.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const faqs = [
  {
    question: 'How is this guide different from a content review or topic-by-topic study plan?',
    answer:
      "This guide is pure strategy — how to read an MCAT B/B passage, identify question types, manage time per question, and decide when to skip. It assumes you already know the underlying biology. Content review tells you what enzyme kinetics is; this guide shows you how to read a 5-paragraph passage about a novel enzyme and answer 5-7 questions about it in 7 minutes flat. If you haven't covered the underlying content yet, pair this with our AAMC outline mapping page first.",
  },
  {
    question: 'How long should I spend reading a B/B passage before attacking the questions?',
    answer:
      'Target 90-120 seconds for an initial active read of a typical 400-600 word B/B passage with one or two figures. Underline data points, mark experimental variables, note the unfamiliar molecule names, and identify the figure(s). Do not try to deeply understand every sentence on the first pass — pass once for structure, then return to specific sentences when each question calls for it. Slower than 120 seconds and your time budget collapses; faster than 90 seconds and you miss the framing.',
  },
  {
    question: 'What are the four MCAT B/B question types and which is hardest?',
    answer:
      'Type 1 is pure recall (no passage information needed) — answered in 30-45 seconds if you know the content. Type 2 is recall + passage detail (you need both) — 60-90 seconds. Type 3 is novel data interpretation (apply biology to a figure or table you have never seen) — 90-120 seconds. Type 4 is experimental design (what should the next experiment be, or what would happen if a variable changed) — 90-150 seconds. Type 3 and Type 4 are hardest because they reward reasoning over recall. Roughly 50-60% of B/B questions are Type 3 or Type 4.',
  },
  {
    question: 'When should I flag a question and come back to it?',
    answer:
      'Flag if a question is taking more than 120 seconds and you are stuck on (a) an unfamiliar term you cannot quickly reverse-engineer from context, (b) a calculation that needs more setup than the question seems to warrant, or (c) a passage paragraph you need to re-read carefully. Make your best guess, flag, move on, and come back in the last 5-7 minutes of the section. The MCAT scoring engine penalises blanks the same as wrong answers, so always guess before flagging.',
  },
  {
    question: 'Are AAMC passages and third-party passages equally useful for drilling?',
    answer:
      'No. AAMC official-practice passages (Section Banks, Question Packs, FL1-FL5) are written by the same item writers who write the real MCAT. The reasoning patterns, distractor logic, and figure styles match the exam. Third-party passages (Kaplan, UWorld, Princeton Review, Blueprint, Altius) are useful for volume and content reinforcement but their question style is consistently shallower than the real exam. Rule of thumb: 60% AAMC, 40% third-party in your passage practice mix.',
  },
  {
    question: 'How does the timing change between Bio/Biochem and Chem/Phys passages?',
    answer:
      "Bio/Biochem passages run slightly longer (more text, more figures) but the per-question time budget is the same: ~95 seconds per question across the 59 B/B questions in 95 minutes. The strategic difference is that B/B passages reward biology pattern recognition (this is an enzyme-kinetics passage, that is a renal-physiology passage), whereas Chem/Phys passages reward formula recall and unit analysis. Read B/B for biological framing first; read Chem/Phys for what's being asked numerically.",
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MCAT B/B Passage Strategy Guide — Worked Examples',
  description:
    'Step-by-step MCAT Bio/Biochem passage strategy with three worked passage walkthroughs, question taxonomy, time budget, and drill protocol.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  datePublished: '2026-05-04',
  dateModified: '2026-05-04',
  author: {
    '@type': 'Person',
    name: 'Dr. Shekhar C Singh',
    url: `${SITE_URL}/faculty`,
    jobTitle: 'Founder, AIIMS Delhi Graduate',
  },
  reviewedBy: { '@type': 'Person', name: 'Dr. Shekhar C Singh' },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.jpg` },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
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
      name: 'B/B Passage Strategy Guide',
      item: PAGE_URL,
    },
  ],
}

const WHATSAPP_HREF =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi Dr. Shekhar — I'd like coaching on MCAT B/B passage strategy. Can you walk me through next steps?"
  )

export default function MCATBBPassageStrategyGuidePage() {
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
                <Link
                  href="/mcat-biology-preparation"
                  className="text-gray-600 hover:text-blue-700"
                >
                  MCAT Biology
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">B/B Passage Strategy Guide</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" /> Worked examples · 4-question taxonomy · timing
              protocol
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              MCAT B/B Passage Strategy —
              <span className="block text-yellow-400 mt-2">Worked Examples</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              Roughly 75% of MCAT Bio/Biochem questions sit inside passages, and the difference
              between a 127 and a 130 on the B/B section is rarely content — it is passage strategy.
              This guide walks step-by-step through three worked passage examples (enzyme kinetics,
              genetic experimental design, metabolism integration), categorises the four B/B
              question types, lays out the per-question time budget, and gives you the drill
              protocol top scorers actually use.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-yellow-400" />3 worked passages
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-yellow-400" />
                ~95 seconds per question
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why this guide is different from a content review
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Most MCAT Bio/Biochem prep falls into two buckets: content review (Campbell,
              Lehninger, Kaplan) and topic drilling (UWorld, Anki, AAMC Question Packs). What
              students typically under-invest in is the meta-layer between content and questions:
              how to read a passage, how to recognise which of four question types is being asked,
              when to spend 60 seconds on a question vs when to flag and return.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Passage strategy is the single highest-leverage skill on B/B because the section is
              dense — 10 passages averaging 4-7 questions each, plus 15 standalone discrete
              questions — and the timing is unforgiving. You have 95 minutes for 59 questions, which
              is roughly 95 seconds per question on average. Subtract 90-120 seconds of passage
              reading per passage and the per-question time falls closer to 75-80 seconds. Students
              who walk in without a strategy run out of time on the last 1-2 passages every single
              time.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The three worked examples below are paraphrased structures, not reproductions, of AAMC
              official-practice passages. Each one walks through (1) what the passage is actually
              doing, (2) what to underline, (3) what each question type wants from you, and (4) how
              long each question should take. Reading these does not replace doing AAMC passage
              practice yourself — but it primes the pattern recognition.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Worked example 1 — Enzyme kinetics passage
            </h2>
            <p className="text-slate-600 mb-6">
              Topic: a novel allosteric enzyme · Question count: 6 · Target time: 7 minutes total.
            </p>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Passage structure (paraphrased)</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Researchers characterise a previously unstudied enzyme (call it
                &ldquo;EnzymeX&rdquo;) from a bacterium. Paragraph 1 introduces the biological
                context — EnzymeX catalyses a reaction in a sugar-metabolism pathway. Paragraph 2
                reports purification and a first Michaelis-Menten experiment with substrate S,
                generating a hyperbolic velocity-versus-substrate curve. Paragraph 3 reports a
                second experiment in which an unrelated metabolite M is added — the curve becomes
                sigmoidal, Km shifts but Vmax does not. Figure 1 shows both v-vs-S curves overlaid.
              </p>
              <h4 className="font-semibold text-slate-900 mb-1">What to underline on first read</h4>
              <ul className="text-sm text-slate-700 leading-relaxed space-y-1 mb-4 list-disc pl-5">
                <li>The enzyme name and its biological context (sugar metabolism)</li>
                <li>The shape change in the v-vs-S curve (hyperbolic → sigmoidal)</li>
                <li>The fact that Km shifts but Vmax does not</li>
                <li>The unrelated metabolite M (this is your allosteric modulator)</li>
                <li>Figure 1 — note both curves, the axis units, and any inflection points</li>
              </ul>
              <h4 className="font-semibold text-slate-900 mb-1">
                What the passage is actually doing
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Paraphrasing into one sentence:{' '}
                <em>
                  EnzymeX is an allosteric enzyme regulated by M as a negative effector
                  (heterotropic, K-class).
                </em>{' '}
                If you recognise this in the 90-second first read, every question below becomes
                30-60 seconds.
              </p>
              <h4 className="font-semibold text-slate-900 mb-2">Question walkthrough</h4>
              <ol className="text-sm text-slate-700 leading-relaxed space-y-3 list-decimal pl-5">
                <li>
                  <strong>(Type 2: recall + passage)</strong> &ldquo;What kinetic parameter changes
                  in Figure 1 when M is added?&rdquo; — Look at Figure 1. Km shifts; Vmax does not.
                  Pick the option that says Km. <em>~45 seconds.</em>
                </li>
                <li>
                  <strong>(Type 1: recall)</strong> &ldquo;What does a sigmoidal v-vs-S curve
                  indicate about an enzyme?&rdquo; — Recall: positive cooperativity, typically
                  oligomeric, allosteric. Pick that option. <em>~30 seconds.</em>
                </li>
                <li>
                  <strong>(Type 3: novel data)</strong> &ldquo;If M is a negative heterotropic
                  effector, what would adding more substrate S accomplish?&rdquo; — Reason: more S
                  drives the equilibrium toward the high-affinity R state, partially overcoming M.
                  Pick the option that says high [S] reverses or overcomes M-mediated inhibition.{' '}
                  <em>~75 seconds.</em>
                </li>
                <li>
                  <strong>(Type 4: experimental design)</strong> &ldquo;Which additional experiment
                  would distinguish a K-class allosteric effect from a V-class effect?&rdquo; —
                  Reason: K-class shifts Km, V-class shifts Vmax. Pick the experiment that varies M
                  and measures the saturation Vmax. <em>~90 seconds.</em>
                </li>
                <li>
                  <strong>(Type 2: recall + passage)</strong> &ldquo;What experimental control would
                  confirm M acts directly on EnzymeX rather than on a contaminating co-purified
                  enzyme?&rdquo; — Reason: use purified-to-homogeneity EnzymeX (SDS-PAGE single
                  band, or recombinant EnzymeX expressed in E. coli). Pick that option.{' '}
                  <em>~75 seconds.</em>
                </li>
                <li>
                  <strong>(Type 3: novel data)</strong> &ldquo;What change to the v-vs-S curve would
                  be expected if M is replaced with a competitive inhibitor of EnzymeX?&rdquo; —
                  Reason: competitive inhibitor raises apparent Km, Vmax unchanged, curve remains
                  hyperbolic (not sigmoidal). <em>~90 seconds.</em>
                </li>
              </ol>
              <p className="text-sm text-slate-700 leading-relaxed mt-4 italic">
                Total time including passage read: roughly 6.5 minutes for 6 questions. Under budget
                by 30 seconds — banked for harder passages later in the section.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Worked example 2 — Genetic experimental design passage
            </h2>
            <p className="text-slate-600 mb-6">
              Topic: identifying the function of an unknown gene · Question count: 5 · Target time:
              6 minutes total.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Passage structure (paraphrased)</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                A researcher identifies an uncharacterised gene (&ldquo;Gene-A&rdquo;) in mice.
                Paragraph 1 describes the gene&apos;s discovery via a genetic screen and its high
                expression in liver. Paragraph 2 describes a knockout-mouse model — homozygous
                knockouts (A-minus / A-minus) show severe weight loss and impaired glucose handling.
                Paragraph 3 describes a complementation experiment — re-introducing Gene-A into the
                knockout via adeno-associated virus rescues the glucose phenotype. Figure 1 shows a
                Western blot of liver tissue across genotypes. Figure 2 shows blood-glucose response
                to a glucose tolerance test in wild-type vs knockout vs rescue mice.
              </p>
              <h4 className="font-semibold text-slate-900 mb-1">What to underline</h4>
              <ul className="text-sm text-slate-700 leading-relaxed space-y-1 mb-4 list-disc pl-5">
                <li>Gene name, tissue of expression (liver), phenotype (glucose handling)</li>
                <li>Knockout system used (homozygous null mouse) and rescue method (AAV)</li>
                <li>Figure 1 Western — what protein bands appear in which lanes</li>
                <li>Figure 2 GTT — the area-under-curve differences between groups</li>
                <li>Any controls mentioned (wild-type littermates, AAV-empty-vector)</li>
              </ul>
              <h4 className="font-semibold text-slate-900 mb-1">
                What the passage is actually doing
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Paraphrasing:{' '}
                <em>
                  Gene-A encodes a liver protein required for normal blood-glucose homeostasis. The
                  knockout-plus-rescue experiment establishes a causal — not just correlational —
                  role for Gene-A.
                </em>{' '}
                This passage is testing the experimental-design layer: necessity (knockout) plus
                sufficiency (rescue) equals causation. Recognise that frame before tackling the
                questions.
              </p>
              <h4 className="font-semibold text-slate-900 mb-2">Question walkthrough</h4>
              <ol className="text-sm text-slate-700 leading-relaxed space-y-3 list-decimal pl-5">
                <li>
                  <strong>(Type 2: passage + recall)</strong> &ldquo;Why is the AAV rescue
                  experiment important for establishing Gene-A&apos;s function?&rdquo; — Reason: it
                  demonstrates sufficiency. Knockout shows necessity; rescue shows sufficiency;
                  together they support a causal role. Pick that option. <em>~75 seconds.</em>
                </li>
                <li>
                  <strong>(Type 3: novel data)</strong> &ldquo;In Figure 2, the rescue mouse
                  glucose-tolerance curve sits between wild-type and knockout. What is the most
                  likely explanation?&rdquo; — Reason: AAV rescue typically restores partial, not
                  full, gene expression because of variable transduction efficiency. Pick the option
                  that says incomplete restoration of liver Gene-A protein levels.{' '}
                  <em>~90 seconds.</em>
                </li>
                <li>
                  <strong>(Type 4: experimental design)</strong> &ldquo;What additional control
                  would strengthen the conclusion that liver Gene-A specifically (not other tissues)
                  regulates glucose homeostasis?&rdquo; — Reason: a tissue-specific knockout
                  (liver-specific Cre-Lox conditional knockout) rules out systemic-elsewhere
                  effects. Pick that option. <em>~90 seconds.</em>
                </li>
                <li>
                  <strong>(Type 1: recall)</strong> &ldquo;Which technique would best identify
                  proteins that bind Gene-A?&rdquo; — Recall: co-immunoprecipitation (co-IP) or
                  yeast-two-hybrid screen. Pick that option. <em>~30 seconds.</em>
                </li>
                <li>
                  <strong>(Type 3: novel data)</strong> &ldquo;If a missense mutation in Gene-A
                  abolished its catalytic activity but not its protein level, what would the Western
                  blot in Figure 1 show?&rdquo; — Reason: Western detects protein quantity, not
                  function. The mutant would still show a normal band. Pick that option.{' '}
                  <em>~75 seconds.</em>
                </li>
              </ol>
              <p className="text-sm text-slate-700 leading-relaxed mt-4 italic">
                Total time including passage read: roughly 6 minutes for 5 questions. On budget.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Worked example 3 — Metabolism integration passage
            </h2>
            <p className="text-slate-600 mb-6">
              Topic: integrating glycolysis, lipid storage, and hormonal signalling · Question
              count: 7 · Target time: 8 minutes total.
            </p>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Passage structure (paraphrased)</h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                A clinical-style passage on insulin resistance. Paragraph 1 frames the biology —
                adipose tissue secretes adipokines, and overnutrition shifts the
                adipokine-to-insulin balance. Paragraph 2 describes a study with two diet groups
                (high-fat-diet vs control), measuring fasting blood glucose, plasma insulin, and
                hepatic triglyceride content over 16 weeks. Paragraph 3 reports findings — HFD mice
                show elevated glucose, elevated insulin, and elevated hepatic triglyceride. Figure 1
                shows glucose-tolerance curves; Figure 2 shows liver lipid quantification. Paragraph
                4 introduces a kinase inhibitor that the researchers test as a potential
                intervention.
              </p>
              <h4 className="font-semibold text-slate-900 mb-1">What to underline</h4>
              <ul className="text-sm text-slate-700 leading-relaxed space-y-1 mb-4 list-disc pl-5">
                <li>The three biological systems integrated — glycolysis, lipid, endocrine</li>
                <li>Diet groups and the dependent variables (glucose, insulin, hepatic TG)</li>
                <li>
                  Direction of changes — elevated glucose + elevated insulin = insulin resistance
                </li>
                <li>The intervention (kinase inhibitor) introduced in paragraph 4</li>
                <li>Figure 2 — quantitative hepatic-TG values across groups</li>
              </ul>
              <h4 className="font-semibold text-slate-900 mb-1">
                What the passage is actually doing
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Paraphrasing:{' '}
                <em>
                  The passage models diet-induced insulin resistance, characterises its biochemical
                  signature (hyperinsulinemia plus hyperglycemia plus hepatic steatosis), and tests
                  whether a kinase inhibitor reverses it.
                </em>{' '}
                This is a three-system integration passage — biochem (glycolysis, lipid synthesis),
                physiology (insulin signalling), and pharmacology (the kinase inhibitor). Each
                question typically targets one system and asks how it interacts with the others.
              </p>
              <h4 className="font-semibold text-slate-900 mb-2">Question walkthrough</h4>
              <ol className="text-sm text-slate-700 leading-relaxed space-y-3 list-decimal pl-5">
                <li>
                  <strong>(Type 1: recall)</strong> &ldquo;What is the immediate consequence of
                  insulin binding the insulin receptor on a hepatocyte?&rdquo; — Recall:
                  autophosphorylation of the receptor tyrosine kinase, then IRS-1 phosphorylation,
                  PI3K activation, Akt activation, GLUT-mediated glucose uptake (in muscle/adipose;
                  liver uses different glucose-handling mechanisms). Pick the option that says
                  receptor autophosphorylation. <em>~45 seconds.</em>
                </li>
                <li>
                  <strong>(Type 2: passage + recall)</strong> &ldquo;Why is the HFD group&apos;s
                  combination of elevated insulin and elevated glucose consistent with insulin
                  resistance?&rdquo; — Reason: in insulin resistance, tissues respond less to
                  insulin, so the pancreas compensates by secreting more — leading to high insulin
                  despite high glucose. Pick that option. <em>~75 seconds.</em>
                </li>
                <li>
                  <strong>(Type 3: novel data)</strong> &ldquo;Hepatic triglyceride content in
                  Figure 2 is roughly 3-fold higher in HFD mice. Which metabolic shift best explains
                  this?&rdquo; — Reason: insulin normally suppresses lipolysis and stimulates
                  lipogenesis; in insulin resistance, lipogenesis remains active (insulin still
                  pushes SREBP-1c in liver) while lipolysis is dysregulated, leading to hepatic TG
                  accumulation. Pick that option. <em>~90 seconds.</em>
                </li>
                <li>
                  <strong>(Type 4: experimental design)</strong> &ldquo;What measurement would best
                  determine whether the kinase inhibitor improves whole-body insulin sensitivity?
                  &rdquo; — Reason: hyperinsulinemic-euglycemic clamp is the gold standard; failing
                  that, a glucose-tolerance test with insulin co-measurement (HOMA-IR). Pick the
                  option that says clamp or insulin-coupled GTT. <em>~90 seconds.</em>
                </li>
                <li>
                  <strong>(Type 3: novel data)</strong> &ldquo;If the kinase inhibitor reduces
                  hepatic triglyceride but does not improve glucose tolerance, what is the most
                  parsimonious interpretation?&rdquo; — Reason: lipid handling and glucose handling
                  are partially decoupled in this model; the kinase inhibitor may act downstream of
                  insulin in lipid synthesis without touching glucose-uptake machinery. Pick that
                  option. <em>~90 seconds.</em>
                </li>
                <li>
                  <strong>(Type 2: passage + recall)</strong> &ldquo;Which adipokine, mentioned in
                  paragraph 1, opposes insulin&apos;s metabolic actions?&rdquo; — Reason: resistin,
                  retinol-binding protein 4 (RBP4), and TNF-alpha are pro-insulin- resistance
                  adipokines; adiponectin is insulin-sensitising. Match to the passage&apos;s
                  mention. <em>~60 seconds.</em>
                </li>
                <li>
                  <strong>(Type 1: recall)</strong> &ldquo;Which enzyme is the rate-limiting step
                  for hepatic gluconeogenesis?&rdquo; — Recall: PEPCK (phosphoenolpyruvate
                  carboxykinase). Pick that option. <em>~30 seconds.</em>
                </li>
              </ol>
              <p className="text-sm text-slate-700 leading-relaxed mt-4 italic">
                Total time including passage read: roughly 8 minutes for 7 questions. On budget.
                Integration passages take longer per question because they span multiple systems —
                budget extra setup time.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Question-type taxonomy — the four B/B question types
            </h2>
            <p className="text-slate-600 mb-6">
              Every B/B question fits one of these four categories. Recognising the type within the
              first 5-10 seconds tells you how long it should take and what to look for.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  type: 'Type 1 — Pure recall',
                  time: '~30-45 seconds',
                  what: 'No passage information needed. Tests content knowledge directly.',
                  example: 'Example: What is the rate-limiting enzyme of glycolysis?',
                  share: '~20-25% of questions',
                },
                {
                  type: 'Type 2 — Recall + passage detail',
                  time: '~60-90 seconds',
                  what: 'Needs both content recall and a specific passage detail.',
                  example:
                    'Example: Why does the enzyme described in paragraph 2 lose activity above 60°C?',
                  share: '~25-30% of questions',
                },
                {
                  type: 'Type 3 — Novel data interpretation',
                  time: '~90-120 seconds',
                  what: 'Apply biology to a figure, table, or experimental result you have never seen.',
                  example:
                    'Example: Predict the effect on Figure 1 if the substrate concentration were doubled.',
                  share: '~30-35% of questions',
                },
                {
                  type: 'Type 4 — Experimental design',
                  time: '~90-150 seconds',
                  what: 'Propose the next experiment, identify a control, predict the outcome of a variable change.',
                  example:
                    'Example: What additional control would distinguish hypothesis A from hypothesis B?',
                  share: '~15-20% of questions',
                },
              ].map((q) => (
                <div key={q.type} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <h3 className="font-bold text-blue-700 mb-2">{q.type}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-2">{q.what}</p>
                  <p className="text-xs text-slate-600 italic mb-2">{q.example}</p>
                  <div className="flex gap-3 text-xs">
                    <span className="text-slate-600">
                      <strong>Target:</strong> {q.time}
                    </span>
                    <span className="text-slate-600">
                      <strong>Share:</strong> {q.share}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Time budget per passage
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The B/B section is 59 questions in 95 minutes, of which 44 questions are in 10
              passages and 15 are standalone discretes. A workable budget:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Standalone discretes:</strong> ~70 seconds each × 15 = 17.5 minutes
              </li>
              <li>
                <strong>Passage read time:</strong> ~100 seconds × 10 passages = 17 minutes
              </li>
              <li>
                <strong>Per-passage question time:</strong> ~80 seconds × 44 questions = 58.5
                minutes
              </li>
              <li>
                <strong>Buffer for flagged questions and reviewing:</strong> ~2 minutes
              </li>
              <li>
                <strong>Total:</strong> ~95 minutes — on the wire.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Most students who fail to finish do so because they spend &gt;120 seconds on a single
              question 5-6 times in the section, which costs them 6-8 minutes — exactly enough to
              fail to attempt the last passage. The fix is the flag-and-return discipline below.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              When to flag and return
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The MCAT scoring engine penalises blanks the same as wrong answers, so always guess
              before flagging. Flag if any of the following apply at the 100-second mark:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                The question involves an unfamiliar term you cannot quickly reverse-engineer from
                the passage or stem context.
              </li>
              <li>
                The question is a Type 4 experimental-design item and you are torn between two
                plausible options.
              </li>
              <li>
                The question requires a calculation that needs more setup than the question seems to
                warrant — suggesting you are missing a simplification.
              </li>
              <li>
                The question references a passage paragraph you need to re-read carefully and the
                re-read will exceed 60 seconds.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Guess your best option, flag, move on. Return in the last 5-7 minutes of the section
              if time allows. Many flagged questions resolve themselves on second read — the act of
              moving on releases the locked-in framing that was blocking you.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Drill protocol — turning strategy into reflex
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Strategy on paper is useless until it is automatic. The drilling protocol:
            </p>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>Block of 4-5 passages at a time.</strong> Time yourself. ~7 minutes per
                passage on average, 30-35 minutes total. Replicates section conditions without the
                full 95-minute fatigue load.
              </li>
              <li>
                <strong>AAMC official material first.</strong> Section Banks (hardest, most exam-
                like) for the bulk of your drilling. Question Packs for content reinforcement. Save
                FL1-FL5 for full-length practice in the last 4-6 weeks.
              </li>
              <li>
                <strong>Error analysis after every block.</strong> For each missed question, log:
                (a) question type (1-4), (b) gap (content vs reasoning vs careless vs time), and (c)
                the fix. Patterns emerge after 4-5 blocks — typically one or two specific question
                types or one or two specific topics dominate your error log.
              </li>
              <li>
                <strong>Third-party passages for volume.</strong> UWorld, Princeton Review,
                Blueprint — useful for content reinforcement and to keep AAMC official material
                fresh for full-length practice. Aim for 60% AAMC, 40% third-party in your overall
                passage mix.
              </li>
              <li>
                <strong>Weekly full-length B/B section.</strong> Once you have completed at least 40
                passages, run a timed full B/B section weekly. Track your section score, your
                per-question time, and the specific question types you miss. The goal is
                section-level rhythm, not just per-passage accuracy.
              </li>
              <li>
                <strong>Re-test the same passages after 4 weeks.</strong> Most students remember the
                answers but not the reasoning. Re-test forces you to reconstruct the reasoning,
                which is what the MCAT actually tests.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Pricing — how we coach passage strategy
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cerebrum Biology Academy runs MCAT B/B programmes 100% online. All pricing in USD.
              Founder Dr. Shekhar C Singh (AIIMS Delhi) leads the senior-faculty tier.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Self-Paced ($499)</strong> — 4-6 month curriculum with 300+ practice
                passages, recorded walkthroughs in the style above, WhatsApp doubt support.
              </li>
              <li>
                <strong>Small-Batch ($999)</strong> — Weekly live passage walkthroughs (typically
                2-3 passages per session), monthly full B/B section mocks, peer error analysis.
              </li>
              <li>
                <strong>1:1 with Senior Faculty ($1,499)</strong> — Personalised passage drilling on
                your weak question types, weekly 90-min video sessions, custom error analysis,
                unlimited WhatsApp access. Plus $150/hour for ad-hoc gap-fill sessions outside the
                package.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> May 2026 by Dr. Shekhar C Singh, AIIMS Delhi
                graduate and founder of Cerebrum Biology Academy.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="bg-white rounded-xl p-5 border border-slate-200 group"
                >
                  <summary className="font-semibold text-slate-900 cursor-pointer">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm text-slate-700 leading-relaxed faq-answer">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Microscope className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a coach who walks every passage with you until strategy is reflex?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Senior-faculty tier sessions are 100% online, weekly, and 1:1. WhatsApp the team to
              start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_HREF}
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Dr. Shekhar
              </a>
              <Link
                href="/mcat-biology-preparation"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <GraduationCap className="w-5 h-5" />
                See the full MCAT Biology programme
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              More MCAT Biology guides
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/mcat-biology-preparation"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">See the full MCAT Biology programme</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Curriculum, faculty, pricing, enrolment.
                </p>
              </Link>
              <Link
                href="/ap-biology-vs-college-bio-mcat-bridge"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-700">AP Biology → College → MCAT bridge</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Honest framing of the pre-med pipeline.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
