import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  Dna,
  Flower2,
  GraduationCap,
  Layers,
  Leaf,
  MessageCircle,
  PawPrint,
  Target,
  Trophy,
} from 'lucide-react'
import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const URL = 'https://cerebrumbiologyacademy.com/usabo-syllabus'

export const metadata: Metadata = {
  title: 'USABO Syllabus | What Is on the USA Biology Olympiad Exam',
  description:
    'The full USABO syllabus and content scope: cell biology, genetics and evolution, plant and animal anatomy and physiology, ethology, ecology, and biosystematics — with approximate IBO-style weightings, the Campbell chapters that map to each area, and how it goes far beyond AP Biology.',
  keywords: [
    'USABO syllabus',
    'what is on the USABO exam',
    'USABO topics',
    'USABO content scope',
    'USABO subject areas',
    'USABO weightings',
    'USABO vs AP Biology',
    'USABO vs IBO syllabus',
    'USABO Campbell chapters',
    'USABO exam coverage',
    'USA Biology Olympiad syllabus',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'USABO Syllabus | What Is on the USA Biology Olympiad Exam',
    description:
      'Every subject area on the USABO exam, with approximate IBO-style weightings and the Campbell chapters that cover each one.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'USABO Syllabus | What Is on the USA Biology Olympiad Exam',
    description:
      'The full USABO content scope with approximate weightings, Campbell chapter mapping, and how it goes beyond AP Biology.',
  },
}

interface SubjectArea {
  name: string
  weight: string
  icon: typeof Dna
  scope: string
  campbell: string
  beyondAp: string
}

// Weightings below are the approximate IBO-style theory weightings that USABO
// content broadly tracks. They are planning figures, not an official per-exam
// breakdown — USABO sets its own emphasis each year. Stated as ranges to avoid
// implying a fixed mark scheme.
const areas: SubjectArea[] = [
  {
    name: 'Cell Biology',
    weight: '~20–25%',
    icon: Layers,
    scope:
      'Membrane structure and transport, organelles, the cytoskeleton, cell signaling, the cell cycle and its control, bioenergetics (respiration and photosynthesis at the mechanistic level), and the chemistry of life — proteins, nucleic acids, enzyme kinetics.',
    campbell: 'Campbell Units 1–3 (chemistry of life, the cell, cellular energetics).',
    beyondAp:
      'AP stops at the overview; USABO probes mechanism — proton gradients, signal-transduction cascades, checkpoint control. Depth here often comes from Alberts and Lehninger.',
  },
  {
    name: 'Genetics & Evolution',
    weight: '~20%',
    icon: Dna,
    scope:
      'Classical and molecular genetics, gene expression and regulation, recombination, mutation, population genetics (Hardy–Weinberg and its assumptions), natural selection, speciation, and molecular evolution.',
    campbell: 'Campbell Units 3–5 (genetics, molecular biology of the gene, evolution).',
    beyondAp:
      'USABO expects you to solve multi-step genetics and population-genetics problems and to reason quantitatively about allele frequencies — well past AP-level recognition.',
  },
  {
    name: 'Plant Anatomy & Physiology',
    weight: '~15%',
    icon: Flower2,
    scope:
      'Plant tissue and organ structure, water and solute transport, transpiration, mineral nutrition, photosynthesis in context, plant hormones, growth, development, and reproduction.',
    campbell: 'Campbell Unit 6 (plant form and function).',
    beyondAp:
      'Plant biology is barely covered in AP but carries real weight in USABO and the IBO. Raven Biology of Plants is the standard reference for the depth required.',
  },
  {
    name: 'Animal Anatomy & Physiology',
    weight: '~25%',
    icon: PawPrint,
    scope:
      'Nutrition and digestion, gas exchange, circulation, osmoregulation and excretion, the endocrine and nervous systems, sensory systems, muscle and movement, immunity, and reproduction and development.',
    campbell: 'Campbell Unit 7 (animal form and function, roughly chapters 40–49).',
    beyondAp:
      'The single largest content block. USABO asks why a mechanism works — countercurrent exchange, the loop of Henle gradient, action-potential dynamics — not merely that it exists.',
  },
  {
    name: 'Ethology',
    weight: '~5%',
    icon: Target,
    scope:
      'Animal behavior: fixed action patterns, learning, communication, kin selection, optimal foraging, mating systems, and the evolutionary logic of behavior.',
    campbell: 'Campbell Unit 8 (chapters on behavioral ecology).',
    beyondAp:
      'Often under-taught entirely in AP. A small but reliably present slice that rewards reading classic behavioral-ecology material.',
  },
  {
    name: 'Ecology',
    weight: '~10%',
    icon: Leaf,
    scope:
      'Population and community ecology, ecosystem energetics and nutrient cycling, biogeochemical cycles, succession, biomes, and conservation biology — plus the statistics to interpret ecological data.',
    campbell: 'Campbell Unit 8 (ecology).',
    beyondAp:
      'USABO ecology questions frequently embed data interpretation — reading population models and significance tests — which AP under-trains.',
  },
  {
    name: 'Biosystematics',
    weight: '~5%',
    icon: BookOpen,
    scope:
      'Phylogenetics, cladistics, reading and building evolutionary trees, taxonomy, and the diversity and defining features of the major groups of life.',
    campbell: 'Campbell diversity-of-life chapters (Units 4–5 evolution/diversity).',
    beyondAp:
      'AP touches phylogeny lightly; USABO expects you to interpret cladograms and recognize defining traits across kingdoms and major clades.',
  },
]

const faqs = [
  {
    question: 'What topics are on the USABO exam?',
    answer:
      'USABO covers the same broad subject areas as the International Biology Olympiad: cell biology; genetics and evolution; plant anatomy and physiology; animal anatomy and physiology; ethology (animal behavior); ecology; and biosystematics. Animal physiology and cell biology carry the most weight, with plant biology, genetics, ecology, ethology, and biosystematics filling out the rest. Every area assumes mechanistic understanding and the ability to interpret experimental data, not just recall.',
  },
  {
    question: 'Is the USABO syllabus like AP Biology or the IBO?',
    answer:
      'It sits between the two in scope but is far closer to the IBO in depth. USABO broadly tracks the IBO subject areas and IBO-style weightings, but at a level a determined US high schooler can reach with the right reading. Compared with AP Biology, USABO goes much deeper on mechanism, adds serious plant biology, ethology, biosystematics, and biostatistics, and expects genuine problem-solving rather than recognition. AP is a useful foundation but covers only a fraction of the USABO scope.',
  },
  {
    question: 'What books cover the USABO syllabus?',
    answer:
      'Campbell Biology is the core text and covers the large majority of the content map. Beyond it, the standard references are Molecular Biology of the Cell (Alberts) for cell and molecular depth, Raven Biology of Plants for plant biology, an animal-physiology reference for that large block, and Lehninger Principles of Biochemistry for metabolism and enzyme kinetics. See our best USABO books guide for what each one is best for and the order to buy them in.',
  },
  {
    question: 'Are the weightings on this page official?',
    answer:
      'No. The percentages shown are approximate, IBO-style planning figures that USABO content broadly tracks — they are not an official per-exam mark scheme. USABO sets its own emphasis each year, and a given Open or Semifinal paper may lean more heavily on some areas than others. Use the weightings to allocate study time sensibly, not to predict an exact question count.',
  },
  {
    question: 'How much of the syllabus does Campbell Biology cover?',
    answer:
      'Campbell Biology covers the large majority of the USABO content map and is the single most important text. It will, however, run out of depth in cell and molecular mechanisms, biochemistry, and plant physiology — which is where reference texts like Alberts, Lehninger, and Raven Biology of Plants take over. Most students master Campbell first, then dig into the references where past papers expose a gap.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'USABO Coaching',
      item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    },
    { '@type': 'ListItem', position: 3, name: 'USABO Syllabus', item: URL },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'USABO Syllabus: What Is on the USA Biology Olympiad Exam',
  url: URL,
  inLanguage: 'en-US',
  datePublished: '2026-06-25',
  dateModified: '2026-06-25',
  author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    logo: { '@type': 'ImageObject', url: 'https://cerebrumbiologyacademy.com/logo.png' },
  },
  about: [
    { '@type': 'Thing', name: 'USABO syllabus' },
    { '@type': 'Thing', name: 'USA Biology Olympiad' },
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType: 'USA-based high school students preparing for the USA Biology Olympiad',
  },
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

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL,
  url: URL,
  name: 'USABO Syllabus',
  inLanguage: 'en-US',
  datePublished: '2026-06-25',
  dateModified: '2026-06-25',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'details p'],
  },
}

export default function USABOSyllabusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <CerebrumPersonSchema
        knowsAbout={[
          'USABO syllabus and content scope',
          'USA Biology Olympiad (USABO)',
          'International Biology Olympiad (IBO) syllabus',
          'Campbell Biology curriculum mapping',
          'Olympiad-level cell biology and physiology',
          'Biology Olympiad coaching',
        ]}
        jobTitle="Founder & Lead Biology Olympiad Coach"
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/usabo-coaching" className="text-gray-600 hover:text-teal-600">
                  USABO Coaching
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">Syllabus</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              What is on the exam
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              USABO Syllabus
              <span className="block text-yellow-400 mt-2">
                The full content scope, area by area
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              The USA Biology Olympiad (USABO), run by the Center for Excellence in Education (CEE),
              draws on the same seven subject areas as the International Biology Olympiad: cell
              biology, genetics and evolution, plant anatomy and physiology, animal anatomy and
              physiology, ethology, ecology, and biosystematics. Below is each area, its approximate
              IBO-style weighting, the Campbell Biology chapters that cover it, and exactly where it
              reaches beyond AP Biology.
            </p>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Live online in your US time zone (ET/CT/MT/PT); pricing in USD.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/usabo-coaching#free-assessment"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                <Target className="w-5 h-5" />
                Book a free assessment
              </Link>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See full programme
              </Link>
            </div>
          </div>
        </section>

        {/* Subject areas */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The seven subject areas
            </h2>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Weightings shown are approximate IBO-style planning figures that USABO content broadly
              tracks — not an official per-exam mark scheme. Use them to allocate study time, not to
              predict an exact question count.
            </p>
            <div className="space-y-5">
              {areas.map((a) => {
                const Icon = a.icon
                return (
                  <div key={a.name} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">{a.name}</h3>
                      </div>
                      <span className="inline-flex items-center text-sm font-medium text-teal-700 bg-teal-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                        {a.weight} of theory
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{a.scope}</p>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <span className="font-semibold text-slate-900">Campbell mapping: </span>
                        <span className="text-slate-700">{a.campbell}</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-200">
                        <span className="font-semibold text-slate-900">Beyond AP: </span>
                        <span className="text-slate-700">{a.beyondAp}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Beyond AP summary */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                How the syllabus goes beyond AP Biology
              </h2>
            </div>
            <p className="text-slate-600 mb-6 max-w-3xl">
              AP Biology is a solid foundation, but the USABO syllabus is broader and far deeper in
              four specific ways:
            </p>
            <ul className="space-y-3">
              {[
                'Depth of mechanism — USABO asks why a process works at the molecular level, where AP asks you to recognize that it happens.',
                'Plant biology, ethology, and biosystematics — barely present in AP, but each carries real weight in USABO and the IBO.',
                'Biostatistics and data interpretation — reading significance tests, p-values, and experimental figures is assumed throughout; AP under-trains this.',
                'Problem-solving over recall — multi-step genetics and population-genetics problems reward reasoning, not memorization.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700"
                >
                  <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-6 max-w-3xl">
              For the resources that cover each area at the right depth, see our{' '}
              <Link
                href="/best-usabo-books"
                className="text-teal-700 underline hover:text-teal-800"
              >
                best USABO books guide
              </Link>
              ; for the exam ladder itself, see{' '}
              <Link
                href="/how-to-qualify-for-usabo"
                className="text-teal-700 underline hover:text-teal-800"
              >
                how to qualify for USABO
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-slate-50 rounded-xl border border-slate-200 open:shadow-md"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer">
                    <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not sure which areas are your weakest?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              A free diagnostic maps your strengths across all seven subject areas and shows where
              to spend your time first. We coach the full syllabus in US time zones.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/usabo-coaching#free-assessment"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                <Target className="w-5 h-5" />
                Book a free assessment
              </Link>
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition">
                <MessageCircle className="w-5 h-5" />
                Ask about the syllabus
              </ContextualWhatsAppLink>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link
                href="/how-to-qualify-for-usabo"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">How to Qualify</h3>
                <p className="text-xs text-slate-600 mt-1">The full exam pathway</p>
              </Link>
              <Link
                href="/best-usabo-books"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">Best USABO Books</h3>
                <p className="text-xs text-slate-600 mt-1">Recommended resources</p>
              </Link>
              <Link
                href="/usabo-coaching"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">USABO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">Full pathway preparation</p>
              </Link>
              <Link
                href="/ap-biology-vs-usabo"
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-teal-700">AP Biology vs USABO</h3>
                <p className="text-xs text-slate-600 mt-1">Bridge for AP-5 students</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
