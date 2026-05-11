import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  MessageCircle,
  Phone,
  ShieldAlert,
  Sparkles,
  XCircle,
} from 'lucide-react'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ib-biology-tok-essay-guide'

export const metadata: Metadata = {
  title: 'IB Biology TOK Essay Guide | Knowledge Questions for Biology Students',
  description:
    'How to write the IB TOK essay through a Biology lens — knowledge questions, scientific method, falsifiability, ethics, real-area-of-knowledge examples, and what scores in the rubric.',
  keywords: [
    'IB Biology TOK essay',
    'TOK essay biology examples',
    'theory of knowledge biology',
    'TOK essay natural sciences',
    'IB TOK essay knowledge questions',
    'TOK essay scientific method',
    'TOK essay falsifiability',
    'TOK essay biology areas of knowledge',
    'IB TOK biology rubric',
    'TOK prescribed titles biology',
    'TOK essay 1600 words biology',
    'TOK EE matrix biology',
    'IB diploma 3 points TOK',
    'TOK essay structure biology',
    'TOK essay biology counterclaims',
  ],
  openGraph: {
    title: 'IB Biology TOK Essay Guide — Writing TOK Through a Biology Lens',
    description:
      'Knowledge questions, scientific method, falsifiability, ethics. Strong vs weak Biology examples. How TOK + EE affects your diploma score.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology TOK Essay — Knowledge Questions Through Biology',
    description:
      'How to use Biology as an area of knowledge in your TOK essay — what scores, what does not.',
  },
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      en: PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const tokFAQs = [
  {
    question: 'Can my IB Biology IA topic become a TOK essay?',
    answer:
      'Usually no — the two operate at different epistemic levels. Your IA tests a biological hypothesis (e.g. how does pH affect catalase activity). A TOK essay asks how biologists know what they claim to know — a meta-level question about the methods, assumptions, and limits of biological knowledge itself. The IA generates first-order knowledge; the TOK essay reflects on second-order knowledge claims. The connection is one-directional: the IA can supply a real, lived example for the TOK essay, but the IA question itself is not a TOK question.',
  },
  {
    question: 'How long should the TOK essay be?',
    answer:
      'The maximum word count is 1,600 words. Anything beyond 1,600 words is not read by the examiner. The IB does not impose a minimum, but essays under roughly 1,200 words almost always lose marks for under-developed arguments and counterclaims. Footnotes, in-text citations, and the bibliography are excluded from the word count.',
  },
  {
    question: 'Do I need to use Biology as one of my areas of knowledge?',
    answer:
      'No. The TOK essay does not require any specific area of knowledge — the prescribed titles are open. However, for a Biology student, the natural sciences (and Biology specifically) is usually a strong choice because you have direct, recent, examined experience of the discipline. Most IB students who choose Biology pair it with a contrasting AOK such as history, the arts, or human sciences to generate genuine comparison.',
  },
  {
    question: 'Is the TOK essay graded by my school or externally?',
    answer:
      'The TOK essay is externally marked by IB examiners against the official TOK assessment instrument — your school does not grade it. Your TOK teacher provides up to three formal feedback interactions (the IB-mandated interaction record) before final submission. The essay is graded A to E, then combined with the TOK exhibition grade to give your overall TOK letter grade.',
  },
  {
    question: 'What is the TOK + EE matrix and how does it affect my diploma score?',
    answer:
      'The TOK essay and the Extended Essay are jointly graded on a matrix that awards 0 to 3 bonus points toward your IB Diploma score. An A in both gives 3 points; an E in either is a failing condition for the diploma overall. The 3 TOK + EE points sit on top of your six subject scores (out of 42) to give the IB Diploma total out of 45. These 3 points routinely make the difference between a 38 and a 41 — meaningful for university admission.',
  },
  {
    question: 'Can I cite my own IB Biology textbook in the TOK essay?',
    answer:
      'You can, but it rarely scores well. TOK examiners want examples that show how knowledge is constructed, contested, or revised — not factual recall from a textbook. Citing the Campbell or Oxford IB Biology textbook for the claim "DNA is a double helix" adds nothing to a TOK argument. Citing the history of how Watson, Crick, Franklin, and Wilkins reached that model — including the disputed role of Photo 51 — engages with the construction of knowledge and does score.',
  },
]

const strongExamples = [
  {
    title: 'The CRISPR ethics debate',
    body: 'In 2018, He Jiankui announced the birth of gene-edited twins with disabled CCR5 genes. The scientific community condemned the work despite the underlying technique being technically valid. This illustrates how scientific knowledge is constrained not only by what is true but by what is ethically permissible to discover — a rich knowledge question about the relationship between scientific possibility and scientific legitimacy.',
  },
  {
    title: 'The Replication Crisis in biomedical research',
    body: 'Begley and Ellis (2012) reported that only 11 percent of 53 landmark cancer biology studies could be reproduced. This raises a TOK-grade knowledge question: if a peer-reviewed published finding cannot be reproduced, in what sense is it knowledge at all? Excellent for arguing about the difference between consensus and truth.',
  },
  {
    title: 'Neuroplasticity vs neurobiological determinism',
    body: 'The same brain imaging data is used by some neuroscientists to argue for plasticity (the brain is shaped by experience) and by others to argue for determinism (the brain dictates behaviour). A TOK essay can examine how identical empirical data can support opposing knowledge claims — and what that implies about the role of theoretical framework in scientific observation.',
  },
  {
    title: 'COVID-19 variants and consensus formation',
    body: 'Between 2020 and 2024, mainstream Biology updated its position on mask efficacy, aerosol transmission, and vaccine durability multiple times — each time on the basis of legitimate evidence. This is a powerful example of scientific consensus as a moving target, useful for knowledge questions about the temporal stability of biological knowledge.',
  },
  {
    title: 'Dietary science reversals (saturated fat, salt, eggs)',
    body: 'Nutritional biology has reversed its public guidance on saturated fat, dietary cholesterol, and salt within a single generation. This is a textbook example for the TOK knowledge question: if the experts change their minds, what was the original recommendation made of? Strong for discussions of methodological limits in observational human biology.',
  },
]

const weakExamples = [
  {
    title: 'The vaccine debate (anti-vax framing)',
    body: 'Overused, politically charged, and almost always argued from a one-sided framing. Examiners have seen this example hundreds of times — it rarely demonstrates original TOK thinking. Avoid unless you have a genuinely novel angle, and never frame it as "two equally valid views".',
  },
  {
    title: 'Climate denial as a knowledge question',
    body: 'Politically charged for adolescents, and rarely engages real TOK methodology. Examiners typically read this as polemic rather than genuine knowledge-question analysis. The legitimate TOK question here (how do we evaluate model-based scientific knowledge?) is better illustrated with less inflammatory examples.',
  },
  {
    title: 'Evolution vs creationism as a knowledge debate',
    body: 'This is not a knowledge debate inside Biology — it is a debate between scientific and religious frameworks of knowing. Treating it as a genuine "two valid views" issue misrepresents how scientific knowledge works. Examiners reliably mark this down. The legitimate TOK question (what counts as evidence within a discipline?) belongs in a different example.',
  },
  {
    title: 'Generic textbook biology as "scientific knowledge"',
    body: 'Citing "the structure of DNA" or "the Krebs cycle" as evidence in a TOK essay is treating Biology as a body of facts rather than a method of knowing. The TOK rubric explicitly rewards reflection on the construction and revision of knowledge — not its recall.',
  },
]

const tokDemands = [
  {
    title: 'Understand scientific method as a method, not as a truth-machine',
    body: 'TOK expects you to know that scientific method involves hypothesis, prediction, controlled testing, peer review, and revision. It does not expect you to argue that this method produces capital-T Truth. The 6/7 candidate can articulate where the scientific method is strong (replication, falsifiability) and where it is weaker (historical sciences, complex human systems, ethically constrained domains).',
  },
  {
    title: 'Use falsifiability — but use it correctly',
    body: "Popper's falsifiability principle is the most-cited and most-misused idea in Biology TOK essays. The correct framing: scientific claims are valuable because they make predictions that could in principle be shown wrong. Misuse: claiming non-falsifiable ideas (e.g. evolution as a whole) are unscientific — they are not, because specific evolutionary claims (this allele increases fitness in this environment) are testable and falsifiable.",
  },
  {
    title: 'Engage with the ethics of biological research',
    body: 'Biology is unusual among sciences in that its subjects are often living beings (animal welfare, human participants, gene editing). TOK rewards essays that show how ethical constraints shape what biological knowledge can be produced — not as a side note, but as a structural feature of the discipline.',
  },
  {
    title: 'Distinguish models from reality',
    body: 'A 6/7 TOK essay separates "the Hardy-Weinberg model" from "the actual genetic structure of a population". The Krebs cycle as drawn in textbooks is a simplification. Pedigree charts assume Mendelian inheritance. Strong TOK writing acknowledges that biological knowledge is mediated through models, and models are useful precisely because they leave things out.',
  },
  {
    title: 'Acknowledge the cultural-Western context of "science"',
    body: 'Modern Biology is largely a 19th–21st century European-North American construction. Indigenous and traditional knowledge systems often contain biological knowledge (medicinal plants, ecological relationships, animal behaviour) that Western science later validated. A nuanced TOK essay engages with this without lapsing into "all knowledge is equally valid" relativism.',
  },
]

const commonMistakes = [
  'Using textbook biology as evidence — TOK wants meta-knowledge about how that biology was produced',
  'Confusing scientific consensus with truth — consensus is the best current evidence, not certainty',
  'Treating Biology as one monolithic discipline — molecular biology, ecology, and evolutionary biology generate knowledge in very different ways',
  'Ignoring the role of funding, journals, and institutions in shaping what biological knowledge gets produced',
  'Citing "scientists believe" without naming a specific scientist or study — examiners read this as vague',
  'Forgetting the counterclaim — the TOK rubric explicitly rewards balanced argumentation',
  'Choosing prescribed titles that do not match your strongest examples — title choice is strategy, not luck',
]

function ArticleSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'IB Biology TOK Essay Guide — Writing the Theory of Knowledge Essay Through Biology',
    description:
      'A guide for IB Biology students writing the Theory of Knowledge essay. Covers knowledge questions about scientific method, falsifiability, ethics, models versus reality, strong and weak Biology examples, and how the TOK essay affects the overall IB Diploma score.',
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': PAGE_URL,
    },
    url: PAGE_URL,
    educationalLevel: 'High School',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    about: [
      'IB Theory of Knowledge',
      'IB Biology',
      'Natural sciences as an area of knowledge',
      'Knowledge questions',
      'TOK essay rubric',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const whatsappMessage = encodeURIComponent(
  "Hi! I'm an IB Biology student and I need help with the TOK essay. Please share details."
)
const whatsappUrl = `https://wa.me/918826444334?text=${whatsappMessage}`

export default function IBBiologyTOKEssayGuidePage() {
  return (
    <>
      <ArticleSchema />
      <FAQSchema questions={tokFAQs} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology Resources', href: '/ib-biology-tutor' },
          { label: 'TOK Essay Guide', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16 text-white sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-300">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/ib-biology-tutor" className="hover:text-white">
                    IB Biology Resources
                  </Link>
                </li>
                <li>/</li>
                <li aria-current="page" className="font-medium text-white">
                  TOK Essay Guide
                </li>
              </ol>
            </nav>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300">
              <Sparkles className="h-4 w-4" />
              Theory of Knowledge · Natural Sciences
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Writing the IB TOK Essay Through Biology
            </h1>

            <p className="mb-8 max-w-3xl text-lg text-gray-300 sm:text-xl">
              The TOK essay is the most consistently mishandled piece of the IB Diploma — Biology
              students bring textbook recall to a meta-knowledge task. This guide shows you what TOK
              actually demands of a Biology student, the strong and weak examples examiners see, and
              how the TOK + EE matrix can move your diploma total by 3 points.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-600/25 transition-all hover:bg-purple-700"
              >
                <MessageCircle className="h-5 w-5" />
                Get TOK Coaching on WhatsApp
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white/60"
              >
                <Phone className="h-5 w-5" />
                Call +91 88264-44334
              </a>
            </div>
          </div>
        </section>

        {/* What TOK demands */}
        <section className="border-b border-gray-200 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              What TOK Actually Demands of a Biology Student
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              TOK is not "biology in plain English". It is a meta-discipline that asks how knowledge
              is constructed, defended, and revised inside an area of knowledge. For Biology
              students, that means engaging with five specific demands that textbook study does not
              prepare you for.
            </p>
            <div className="space-y-5">
              {tokDemands.map((item, idx) => (
                <article
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-700">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              How Biology Students Misuse Biology in TOK
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              Across hundreds of TOK essays from Biology students, the same mistakes recur. Each one
              signals to the examiner that the writer has not made the jump from first-order biology
              to second-order knowledge analysis.
            </p>
            <ul className="space-y-3">
              {commonMistakes.map((m) => (
                <li key={m} className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <ShieldAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-700" />
                  <span className="text-gray-800">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prescribed titles */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              TOK Prescribed Titles That Work Well with Biology
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              The IB releases six prescribed essay titles roughly six months before each submission
              deadline. Titles change each session — we deliberately do not fabricate or paraphrase
              recent titles here, because the IB&apos;s wording is precise and matters for marking.
            </p>
            <p className="mb-6 text-lg text-gray-700">
              However, the underlying knowledge-question patterns recur. Below are the generic
              framings most adaptable to a Biology student. When the actual prescribed titles drop,
              you will typically find at least one or two map cleanly to these patterns.
            </p>
            <div className="space-y-5">
              {[
                {
                  title: 'How do biologists know what they claim to know?',
                  body: 'Maps to titles about method, evidence, justification. Lets you bring CRISPR ethics, replication crisis, dietary science reversals, COVID consensus.',
                },
                {
                  title: 'Is the value of knowledge measured by its usefulness?',
                  body: 'Maps to titles about the purpose or application of knowledge. Lets you bring vaccine development, CRISPR therapeutics, conservation biology, antibiotic resistance.',
                },
                {
                  title: 'Are there limits to what biological knowledge can establish?',
                  body: 'Maps to titles about the boundaries of knowledge. Lets you bring consciousness studies, complex systems (ecosystems, epigenetics), ethics-constrained research.',
                },
                {
                  title: 'How does new evidence change biological knowledge?',
                  body: 'Maps to titles about paradigm shifts and revision. Lets you bring the human genome project, the gut microbiome revolution, neuroplasticity, kin selection.',
                },
                {
                  title: 'Who has the right to produce biological knowledge?',
                  body: 'Maps to titles about authority, expertise, and gatekeeping. Lets you bring peer review, citizen science, indigenous knowledge systems, He Jiankui, Open Science.',
                },
              ].map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl border border-purple-200 bg-purple-50 p-6"
                >
                  <h3 className="mb-2 flex items-start gap-2 text-lg font-bold text-purple-900">
                    <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    {t.title}
                  </h3>
                  <p className="text-gray-800">{t.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600">
              When the IB releases the current session&apos;s six prescribed titles, take 48 hours
              to map each title to the examples you already have evidence for — choose the title
              with the strongest example fit, not the title that sounds most interesting.
            </p>
          </div>
        </section>

        {/* Strong examples */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Strong Biology Examples for TOK Essays
            </h2>
            <p className="mb-10 text-lg text-gray-700">
              These examples reward TOK essay writers because they show knowledge in construction,
              dispute, or revision — not just factual recall. Cite the underlying study or event by
              name where possible.
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {strongExamples.map((ex) => (
                <article
                  key={ex.title}
                  className="rounded-2xl border border-green-200 bg-white p-6"
                >
                  <h3 className="mb-2 flex items-start gap-2 text-lg font-bold text-gray-900">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    {ex.title}
                  </h3>
                  <p className="text-gray-700">{ex.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Weak examples */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Weak Biology Examples to Avoid
            </h2>
            <p className="mb-10 text-lg text-gray-700">
              These examples appear in TOK essays so often that examiners read them with fatigue,
              and most are politically charged enough that an adolescent writer tends to fall into
              one-sided argumentation. Avoid unless you have a genuinely novel angle.
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {weakExamples.map((ex) => (
                <article key={ex.title} className="rounded-2xl border border-red-200 bg-white p-6">
                  <h3 className="mb-2 flex items-start gap-2 text-lg font-bold text-gray-900">
                    <XCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
                    {ex.title}
                  </h3>
                  <p className="text-gray-700">{ex.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TOK + EE matrix */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              How TOK Affects Your Overall IB Diploma Score
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              The TOK essay (graded A to E) and the Extended Essay (graded A to E) combine on a
              single matrix that contributes 0 to 3 bonus points toward your IB Diploma score. Those
              points sit on top of your six subject scores (out of 42) for a total out of 45.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">EE grade ↓ / TOK grade →</th>
                    <th className="px-4 py-3 text-center font-semibold">A</th>
                    <th className="px-4 py-3 text-center font-semibold">B</th>
                    <th className="px-4 py-3 text-center font-semibold">C</th>
                    <th className="px-4 py-3 text-center font-semibold">D</th>
                    <th className="px-4 py-3 text-center font-semibold">E</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 text-left font-semibold">A</td>
                    <td className="px-4 py-3 font-bold text-green-700">3</td>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 text-left font-semibold">B</td>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 text-left font-semibold">C</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 text-left font-semibold">D</td>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 text-left font-semibold">E</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                    <td className="px-4 py-3 text-red-700">Fail</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Source: IB Diploma Programme assessment regulations. An E in either component triggers
              a failing condition for the entire Diploma.
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-yellow-900">
                <AlertTriangle className="h-5 w-5" />
                The hidden risk
              </h3>
              <p className="text-gray-800">
                A common Biology-student failure mode is to spend Year 1 of IB heavily on Biology IA
                and EE, treating TOK as an afterthought. An E in TOK fails the entire diploma —
                regardless of how strong your six subject scores are. Treat TOK with the same
                seriousness as the IA.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing / Get help */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              Need Help with the TOK Essay?
            </h2>
            <p className="mb-4 text-lg text-gray-700">
              Cerebrum offers TOK essay coaching specifically for Biology students: prescribed-title
              selection, knowledge-question framing, example sourcing, draft review against the TOK
              assessment instrument, and counterclaim development. Sessions are 1:1, fully online,
              conducted in English.
            </p>
            <p className="mb-6 text-lg text-gray-700">
              For full pricing on 1:1 elite tutoring, group batches, and year-long programmes — see
              the dedicated pricing page.
            </p>
            <Link
              href="/ib-biology-tutor"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
            >
              See full IB Biology pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
              TOK Essay for Biology Students — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {tokFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-purple-600 group-open:rotate-180 transition-transform">
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

        {/* Cross-links */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="mb-4 text-sm uppercase tracking-wide text-gray-500">Related resources</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/ib-biology-extended-essay"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-purple-400 hover:text-purple-700"
              >
                Extended Essay Guide
              </Link>
              <Link
                href="/ib-biology-ee-topics"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-purple-400 hover:text-purple-700"
              >
                EE Topic Ideas
              </Link>
              <Link
                href="/ib-biology-ia-guide"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-purple-400 hover:text-purple-700"
              >
                IA Guide
              </Link>
              <Link
                href="/ib-biology-hl-vs-sl"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-purple-400 hover:text-purple-700"
              >
                HL vs SL Decision Guide
              </Link>
              <Link
                href="/ib-biology-tutor"
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-purple-400 hover:text-purple-700"
              >
                Browse all IB Biology resources
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-700 via-blue-700 to-purple-800 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Book a TOK Essay Review with a Biology Specialist
            </h2>
            <p className="mb-8 text-lg text-purple-100">
              Most TOK essays fail at the meta-knowledge layer, not the writing layer. A
              Biology-specialist review reframes your knowledge questions, sharpens your examples,
              and stress-tests your counterclaims against the assessment instrument.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-purple-700 shadow-lg hover:bg-purple-50"
              >
                <MessageCircle className="h-6 w-6" />
                Book TOK Review on WhatsApp
              </a>
              <a
                href="tel:+918826444334"
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/40 px-8 py-4 text-lg font-semibold text-white hover:border-white/80"
              >
                <Phone className="h-5 w-5" />
                +91 88264-44334
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
