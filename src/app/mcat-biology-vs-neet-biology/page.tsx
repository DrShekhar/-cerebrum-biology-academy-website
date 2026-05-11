/**
 * /mcat-biology-vs-neet-biology
 *
 * Cornerstone comparison page for NRI and Indian-American students
 * who studied NEET-pattern biology in India and are considering or
 * preparing for the MCAT for US medical-school admission. Zero
 * existing pages on the site compare these two exams in detail.
 *
 * Frames the comparison honestly: skill differences, content
 * differences, what carries over, what doesn't, and the catch-up
 * curriculum for a NEET-trained student moving to the MCAT.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, GraduationCap, Home, MessageCircle, Microscope, Target } from 'lucide-react'

const CANONICAL = '/mcat-biology-vs-neet-biology'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'MCAT Biology vs NEET Biology | Honest Comparison',
  description:
    "Detailed MCAT Biology vs NEET Biology comparison for NRI and Indian-American students. Skill differences, content overlap, what carries over, what doesn't, and a catch-up curriculum.",
  keywords: [
    'MCAT Biology vs NEET Biology',
    'NEET vs MCAT biology',
    'MCAT for NEET students',
    'NRI MCAT preparation',
    'Indian American MCAT',
    'NEET biology MCAT crossover',
    'difference between NEET and MCAT',
    'MCAT biology Indian students',
    'NEET to MCAT transition',
    'MCAT preparation India',
    'NEET score US medical school',
    'NEET vs MCAT difficulty',
    'AIIMS to MCAT',
    'MCAT in India test centre',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology vs NEET Biology | Honest Comparison',
    description:
      'Detailed comparison for NRI and Indian-American students. Skill differences, content overlap, catch-up curriculum.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT Biology vs NEET Biology — Honest Comparison',
    description:
      'For NRI and Indian-American students bridging from NEET-pattern biology to the MCAT.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const faqs = [
  {
    question: 'Does my NEET score count for US medical school admissions?',
    answer:
      "No. US allopathic (MD) medical schools admit through AMCAS or TMDSAS, which require the MCAT score, US-college coursework, US-context recommendations, and the US-format personal statement. NEET is not part of the AMCAS application. Caribbean medical schools (St. George's, Ross, AUC) also require the MCAT, not NEET. If you scored well on NEET in India, that academic record can support your undergraduate transcript narrative, but the MCAT is a separate, mandatory test for US med school.",
  },
  {
    question: 'Can I take the MCAT in India?',
    answer:
      'No. The AAMC does not administer the MCAT at any Indian test centre. The nearest international Prometric test centres for Indian residents are typically in Singapore, Bangkok, Dubai, Kathmandu, or Colombo. Plan for international travel, accommodation, and time-zone adjustment as part of your test logistics. We coach Indian and NRI students who fly to Singapore or Dubai test centres regularly; the typical recommendation is to arrive 2-3 days before the test for time-zone recovery.',
  },
  {
    question: 'Is AIIMS Delhi biology pedagogy useful preparation for the MCAT?',
    answer:
      'Yes — partially. AIIMS-level biology coaching emphasises depth of understanding, mechanism-level questioning, and integration across body systems, which transfers well to the MCAT. The gaps are biochemistry (NEET and AIIMS prep typically under-cover enzyme kinetics, metabolic regulation at MCAT depth), experimental-design reasoning (NEET is recall-heavy; MCAT is passage-application-heavy), and US-specific clinical framing. AIIMS-trained faculty (including our founder Dr. Shekhar C Singh) understand both syllabi and can bridge effectively.',
  },
  {
    question:
      'How long does it typically take to bridge from NEET-pattern biology to MCAT-level biology?',
    answer:
      'For a student who scored 600+ on NEET biology (180/200 raw) and has solid English-language facility, the typical bridging timeline is 4-6 months of focused study covering: (1) college-level biochemistry depth (Lehninger), (2) MCAT passage strategy (the meta-skill NEET does not test), (3) US-context organ-system framing (Costanzo), and (4) AAMC official practice volume. Students with weaker NEET baselines or limited English-test reading experience may need 6-9 months.',
  },
  {
    question: 'Do I need to retake my Indian undergraduate degree to apply to US med school?',
    answer:
      "For most US allopathic medical schools, yes. Most US med schools require a US-accredited bachelor's degree (or completion of significant US college coursework — typically 60-90 credit hours) before MD admission. Some accept a foreign degree plus a US post-baccalaureate programme or a US master's programme. Caribbean medical schools have more lenient foreign-degree policies. This is independent of MCAT preparation; check each med school's specific foreign-credential policy at their admissions page.",
  },
  {
    question: "What's the single biggest skill difference between NEET and MCAT biology?",
    answer:
      'Reading comprehension under time pressure. NEET Biology is 100 MCQs in 200 minutes — roughly 2 minutes per question, mostly recall, no passages. MCAT Bio/Biochem is 59 questions in 95 minutes — roughly 95 seconds per question, with 75% of questions sitting inside experimental-passage clusters. NEET tests whether you can recall NCERT content; MCAT tests whether you can read a novel research-style passage and reason about it. The skill gap is not biology knowledge — it is timed scientific reading.',
  },
  {
    question:
      'I am an Indian-American student who studied NEET-pattern biology at school in India before moving to the US. Where should I start?',
    answer:
      'Start with a diagnostic AAMC Sample Test (the free practice exam from AAMC). This tells you exactly which AAMC content categories are weakest for you given your NEET background. Most NEET-trained students score high on Concept 1C (Mendelian genetics), Concept 3B (organ-system physiology), and Concept 1B (transcription/translation), but score low on Concept 1A (amino-acid chemistry depth), Concept 1D (metabolic regulation), and Concept 2A (cell signalling mechanism detail). The diagnostic + targeted catch-up + AAMC passage practice is the proven sequence.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MCAT Biology vs NEET Biology — Honest Comparison',
  description:
    "Detailed MCAT Biology vs NEET Biology comparison for NRI and Indian-American students. Skill differences, content overlap, what carries over, what doesn't, and a catch-up curriculum.",
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
      name: 'MCAT Biology vs NEET Biology',
      item: PAGE_URL,
    },
  ],
}

const WHATSAPP_HREF =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi Dr. Shekhar — I studied NEET-pattern biology and am considering the MCAT. Can you help me plan the bridge?'
  )

const comparisonRows = [
  ['Exam length', '3 hr 20 min', '7 hr 30 min (full day, all 4 sections)'],
  [
    'Biology section weight',
    '50% of total (360/720)',
    '~25% of total (Bio/Biochem + Psych/Soc bio)',
  ],
  [
    'Question format',
    'Multiple-choice, 4 options, no passages',
    'Passage-based MCQs + discretes, 4 options',
  ],
  ['Biology questions', '100 questions (zoology + botany)', '59 questions Bio/Biochem section'],
  ['Time per question', '~2 minutes (recall-heavy)', '~95 seconds (passage-reasoning-heavy)'],
  ['Negative marking', 'Yes (-1 for wrong)', 'No negative marking'],
  [
    'Syllabus source',
    'NCERT Class 11 + Class 12 biology',
    'AAMC content outline (US college biology + biochem)',
  ],
  ['Plant biology depth', 'Heavy — Class 11 dominates', 'Light — photosynthesis chemistry only'],
  ['Biochemistry depth', 'Light — overview only', 'Heavy — Lehninger-level mechanism'],
  ['Experimental design', 'Not tested directly', 'Heavily tested in passages'],
  ['Language', 'English, Hindi, regional languages', 'English only'],
  [
    'Test centre access',
    'Across India, ~500 centres',
    'No India centres; Singapore, Dubai, Bangkok nearest',
  ],
  ['Annual administrations', '1 per year (May)', '20+ test dates per year'],
  ['Score scale', '0-720 (no section sub-scores)', '472-528 total, 118-132 per section'],
  ['Score validity', '1 year', '2-3 years (varies by med school)'],
  ['Cost (approx)', 'INR 1,700 (~$20 USD)', '$340 USD + travel for Indian residents'],
]

export default function MCATBiologyVsNEETBiologyPage() {
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
                <span className="text-blue-700 font-medium">MCAT Biology vs NEET Biology</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" /> Built for NRI &amp; Indian-American students · honest
              framing
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              MCAT Biology vs NEET Biology —
              <span className="block text-yellow-400 mt-2">
                What an Indian Student Needs to Know
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              Both tests are biology-heavy medical entrance exams, but they are different exams for
              different purposes. NEET admits you to MBBS programmes in India; the MCAT admits you
              to MD programmes in the US, Canada, and the Caribbean. The biology overlap is real but
              partial — and the skill differences are larger than the content differences. If you
              studied NEET-pattern biology and are now considering the MCAT, this page tells you
              exactly what carries over, what doesn&apos;t, and what to prioritise during the
              bridge.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Both are biology-heavy medical entrance tests
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              NEET (National Eligibility cum Entrance Test) is the gateway exam to MBBS, BDS, and
              allied medical programmes in Indian medical colleges, including AIIMS Delhi, JIPMER,
              CMC Vellore, MAMC Delhi, and the state-government colleges. It is administered by the
              National Testing Agency once a year, typically in May. The biology section is the
              largest single section — 100 questions covering NCERT Class 11 and Class 12 biology —
              and accounts for 50% of the total 720 marks. Without strong biology, NEET is not
              winnable.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              MCAT (Medical College Admission Test) is the gateway exam to MD programmes in the
              United States, Canada, and increasingly Caribbean medical schools. It is administered
              by the AAMC (Association of American Medical Colleges) at Prometric test centres
              internationally — but not in India. The MCAT runs for roughly 7.5 hours across four
              sections, of which the Biological and Biochemical Foundations section (Bio/Biochem,
              also called B/B) and parts of Psychological/Social/Biological Foundations test
              biology. Combined, biology accounts for roughly 25-30% of total MCAT content.
            </p>
            <p className="text-slate-700 leading-relaxed">
              On paper, both exams test biology. In practice, they test very different things — and
              a student who scored 180/200 on NEET biology can still score in the 30th percentile on
              MCAT Bio/Biochem if they go in cold. The reverse is also true: a student scoring 128
              on MCAT B/B may struggle with NEET because NEET&apos;s plant biology and biodiversity
              coverage is denser than what the MCAT tests.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Side-by-side comparison
            </h2>
            <p className="text-slate-600 mb-6">
              The two exams differ across structure, content, skill profile, and logistics.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left bg-white">
                    <th className="py-3 px-3 font-semibold text-slate-900">Dimension</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">NEET Biology</th>
                    <th className="py-3 px-3 font-semibold text-slate-900">MCAT Bio/Biochem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {comparisonRows.map((row) => (
                    <tr key={row[0]} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-medium text-slate-900">{row[0]}</td>
                      <td className="py-3 px-3 text-slate-700">{row[1]}</td>
                      <td className="py-3 px-3 text-slate-700">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Sources: NTA NEET information bulletin (2025-26); AAMC Official Guide to the MCAT Exam
              (2026 cycle); AAMC fees and test-centre listings; Prometric international centre
              directory.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              NEET Biology coverage in depth
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              NEET Biology covers the NCERT Class 11 and Class 12 biology textbooks across two broad
              halves: botany (plant biology) and zoology (animal biology). Within these, the
              syllabus is heavily Indian-context — examples drawn from Indian flora, fauna, and
              ecological systems. The 100-question section is split roughly 50-50 between Class 11
              and Class 12 material, with both sub-sections weighted equally.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Heavy NEET areas:</strong> Plant kingdom diversity, plant anatomy and
              physiology, plant reproduction, photosynthesis (deeper than MCAT requires),
              respiration (overlapping MCAT), morphology of flowering plants, biological
              classification, animal kingdom diversity, structural organisation in animals
              (overlapping MCAT), Indian biodiversity and conservation, ecology in Indian context.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Standard NEET areas:</strong> Cell biology and cell cycle, Mendelian and
              molecular genetics, evolution, human physiology (digestion, breathing, body fluids and
              circulation, excretion, locomotion, neural control, chemical coordination), human
              reproduction, reproductive health, biotechnology and its applications.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The format is recall-heavy multiple choice with no passages, no figures requiring data
              interpretation, and no experimental-design questions. A NEET top-scorer is typically a
              student who has internalised NCERT to the sentence level and can recall specific facts
              in 30-60 seconds per question. Negative marking (-1 for wrong, +4 for right) penalises
              guessing — selectivity matters more than speed.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              MCAT Bio/Biochem coverage in depth
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The MCAT Bio/Biochem section (also called B/B) is 59 questions in 95 minutes,
              organised as 10 passage clusters of 4-7 questions each, plus 15 standalone discrete
              questions. The content is drawn from the AAMC content outline foundational concepts 1
              (biomolecules), 2 (cellular processes), 3 (genetic information transfer), and parts of
              5 (organ systems and homeostasis).
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Heavy MCAT areas:</strong> Enzyme kinetics and regulation, amino-acid and
              protein chemistry depth (pKa, isoelectric point, secondary/tertiary/quaternary
              structure), nucleotide and nucleic-acid chemistry, glycolysis-Krebs-ETC at mechanism
              level, fatty-acid beta-oxidation, cell signalling (GPCRs, RTKs, second messengers, MAP
              kinase cascade), DNA replication and repair mechanism detail, experimental techniques
              in molecular biology (PCR, gel electrophoresis, Sanger sequencing, Western blot,
              CRISPR), cardiovascular and renal physiology integration, endocrine feedback loops,
              neuroscience (action potentials, synaptic transmission, sensory transduction),
              immune-system mechanisms.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Light or absent MCAT areas:</strong> Plant biology beyond C3/C4/CAM
              photosynthesis, plant anatomy and reproduction, deep biodiversity and animal
              classification, ecology and population dynamics, animal behaviour, comparative anatomy
              across phyla.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The format is passage-driven — roughly 75% of B/B questions sit inside experimental
              passages that present novel data (graphs, tables, gel images, study designs) and ask
              you to interpret the data, predict outcomes, design follow-up experiments, and link
              biology to the passage. Negative marking is absent (always guess), but the time
              pressure is severe — 95 seconds per question on average, with passage reading time
              included.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Skill differences — recall vs application
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The largest gap between the two exams is not content — it is the underlying skill.
              NEET is a recall and pattern-recognition test: do you know what NCERT says, and can
              you eliminate distractors quickly. The high-scoring strategy is comprehensive NCERT
              internalisation, daily multiple-choice drilling, and tight time management to clear
              100 questions in 200 minutes.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The MCAT is a scientific-reading and application test. Most passages describe a study
              you have never seen, conducted by researchers you have never read, on a biological
              system you may know only generally. The questions then ask you to interpret figures,
              predict experimental outcomes, identify confounds, design controls, and bridge from
              passage data to underlying biology. Pure recall accounts for only 20-25% of the
              questions. Passage-reasoning accounts for the rest.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The practical implication: a NEET-trained student walking into the MCAT cold will
              underperform their content knowledge by 5-15 percentile points purely because the
              skill is different. They know the biology. They are not yet practised in reading dense
              scientific prose under time pressure and reasoning out novel data. Closing this gap is
              the central work of the bridge.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The good news: the skill is trainable. Roughly 8-12 weeks of dedicated MCAT passage
              drilling (Section Banks, Question Packs, third-party UWorld) typically closes most of
              the gap. Students who already have strong English-language scientific reading
              experience (from US college, or from US-style high school biology in international
              schools) close the gap faster.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Content differences — where each exam goes deeper
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Beyond skill, there are real content gaps to bridge in both directions. A student
              moving from NEET to MCAT will find the following content areas significantly
              under-covered in their NEET preparation:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Biochemistry depth.</strong> NEET&apos;s biochem is essentially Chapter 9 of
                NCERT Class 12. MCAT tests enzyme kinetics quantification (Michaelis-Menten,
                Lineweaver-Burk, inhibition types), full glycolysis-Krebs-ETC at the regulated- step
                level, fatty-acid beta-oxidation, ketogenesis, gluconeogenesis regulation,
                amino-acid catabolism, the urea cycle. Lehninger-level depth required.
              </li>
              <li>
                <strong>Neuroscience.</strong> NEET covers neural control basics. MCAT goes deeper
                into action potential mechanism, voltage-gated channels, ionotropic vs metabotropic
                receptors, sensory transduction (photoreceptors, hair cells, olfactory),
                neurotransmitter classes, drug-receptor interactions.
              </li>
              <li>
                <strong>Immunology mechanisms.</strong> NEET&apos;s immune-system coverage is a
                survey. MCAT tests innate vs adaptive immunity in mechanism detail, B-cell vs T-cell
                activation, antibody isotypes and structure, MHC class I vs II antigen presentation,
                complement cascade.
              </li>
              <li>
                <strong>Experimental design.</strong> NEET tests almost no experimental design. MCAT
                integrates it into 30-40% of passages. Necessity vs sufficiency, controls,
                hypothesis testing, confounders, statistical reasoning at a basic level.
              </li>
              <li>
                <strong>Cell signalling pathways.</strong> NEET touches GPCR signalling at survey
                level. MCAT tests cAMP and IP3/DAG second messengers, MAP kinase cascade, JAK- STAT,
                signal amplification, with passage applications.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-6 mb-4">
              In the other direction — areas where NEET goes deeper than MCAT:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Plant biology.</strong> NEET covers plant kingdom diversity, plant anatomy,
                plant physiology (water transport, mineral nutrition, plant growth and development,
                plant reproduction) at depth. MCAT tests only C3/C4/CAM photosynthesis chemistry;
                the rest is irrelevant.
              </li>
              <li>
                <strong>Biodiversity and ecology.</strong> NEET dedicates a significant unit to
                Indian biodiversity, conservation biology, and ecology in Indian context. MCAT tests
                essentially zero ecology.
              </li>
              <li>
                <strong>Animal classification across phyla.</strong> NEET tests structural
                organisation across animal phyla in some detail. MCAT focuses overwhelmingly on
                vertebrate (specifically human) biology.
              </li>
              <li>
                <strong>Health, biotechnology applications, and public-health context.</strong> NEET
                covers vaccines, public-health programmes, agricultural biotechnology, and related
                applications. MCAT touches some of this in Psych/Soc rather than B/B.
              </li>
            </ul>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              What carries over from NEET to MCAT
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The NEET-trained student starts the MCAT bridge from a real foundation. Areas that
              transfer substantially:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Mendelian genetics.</strong> Pedigrees, autosomal recessive vs dominant,
                X-linked traits, codominance, incomplete dominance, two-factor crosses. NEET covers
                all of this at MCAT-adequate depth.
              </li>
              <li>
                <strong>Basic cellular respiration.</strong> Glycolysis steps, Krebs cycle overview,
                ETC overview, ATP yield. NEET covers the framework; MCAT adds the regulated-step
                depth (PFK-1 regulation, allosteric control), which is a focused add-on rather than
                learning from scratch.
              </li>
              <li>
                <strong>Basic anatomy and organ-system physiology.</strong> Human heart,
                circulation, respiration, digestion, excretion, neural control basics, hormonal
                coordination. NEET covers all of this; MCAT tests the same content with a stronger
                integration-across-systems framing.
              </li>
              <li>
                <strong>DNA structure, replication, transcription, translation basics.</strong>{' '}
                Watson-Crick model, replication-fork actors, the genetic code, ribosome function.
                NEET covers this well.
              </li>
              <li>
                <strong>Cell biology fundamentals.</strong> Organelle structure and function,
                membrane structure, cell cycle phases, mitosis vs meiosis. NEET covers all of this;
                MCAT adds membrane-transport mechanism detail and cell-cycle checkpoint regulation.
              </li>
              <li>
                <strong>Evolution and population genetics.</strong> Hardy-Weinberg, natural
                selection modes, basic speciation. NEET covers; MCAT touches lightly.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              The honest accounting: roughly 50-60% of MCAT Bio/Biochem content overlaps with what a
              strong NEET-prepared student already knows. The remaining 40-50% is genuinely new
              content (biochem depth, neuroscience, immunology mechanisms, experimental design, cell
              signalling pathways) layered on top.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              What an NRI or Indian-American student should know
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The typical student we coach in this category falls into one of three profiles:
            </p>
            <ol className="space-y-4 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>
                  Indian-American who studied US-school biology but had NEET-style supplemental
                  coaching from Indian relatives or weekend tutors.
                </strong>{' '}
                Strong recall foundation; needs MCAT passage-strategy drilling and biochemistry
                depth top-up. Typical bridge: 3-4 months.
              </li>
              <li>
                <strong>
                  NRI student who completed Class 11-12 at an Indian school (CBSE/ICSE) and is now
                  in US college pre-med.
                </strong>{' '}
                Solid biology foundation from NEET-pattern preparation. Needs biochem depth
                (Lehninger), experimental-design framing, and US-college-style passage practice.
                Typical bridge: 4-6 months.
              </li>
              <li>
                <strong>
                  Indian student who took NEET and is now pivoting to US medical school via a US
                  postgraduate or Caribbean MD pathway.
                </strong>{' '}
                Strong NEET biology baseline. Needs the full MCAT bridge (biochem depth, passage
                strategy, US-style scientific English reading practice). Typical bridge: 5-8 months.
                May also need US college credit hours and TOEFL/IELTS depending on the specific
                med-school target.
              </li>
            </ol>
            <p className="text-slate-700 leading-relaxed mt-4">
              In all three profiles, the catch-up curriculum looks similar: 2-3 months of
              biochemistry depth (Lehninger), 2-3 months of passage-strategy drilling (AAMC official
              material), and ongoing weekly full-length MCAT section practice. The biggest single
              intervention is daily passage practice — 60-90 minutes per day, for 8-12 weeks, is
              what converts strong content knowledge into MCAT passage reflex.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Honest framing — NEET passing is not MCAT preparation
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We coach students on both exams and want to be direct: a strong NEET score is a
              valuable academic record, but it does not substitute for MCAT preparation. The
              NEET-trained student who walks into the MCAT after only re-reading NCERT will score
              far below their underlying potential — and may attribute that gap to the MCAT being
              &ldquo;harder&rdquo; when the actual issue is exam-format unfamiliarity.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The MCAT is not harder content; it is harder format. The biology depth that a
              competitive MCAT score requires (515+) is roughly equivalent to AIIMS-level NEET
              preparation, with biochemistry added. The difficulty differential is in the
              passage-reading-under-time-pressure layer, not the biology layer itself.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">Two practical implications:</p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed list-disc pl-5">
              <li>
                <strong>Do not skip dedicated MCAT prep because you scored well on NEET.</strong>{' '}
                Plan for 4-6 months of focused study even if your NEET biology was 180/200.
              </li>
              <li>
                <strong>
                  Do not skip biochemistry depth because you covered &ldquo;biotechnology and its
                  applications&rdquo; in Class 12.
                </strong>{' '}
                The biochem MCAT tests is substantially deeper.
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              The good news: if you walked into NEET prep with strong English-medium science
              schooling, you have most of the language and reading skills needed to bridge to the
              MCAT. The biology overlap is real. With a structured 4-6 month bridge programme, MCAT
              scores in the 510-520 range are achievable for the majority of strong NEET graduates.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Pricing for NRI students
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cerebrum Biology Academy runs MCAT Bio/Biochem programmes 100% online from
              AIIMS-trained faculty. Founder Dr. Shekhar C Singh (AIIMS Delhi) leads the
              senior-faculty tier. We specifically coach NRI and Indian-American students bridging
              from NEET-pattern biology to MCAT-level biology. All pricing in USD.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Self-Paced ($499)</strong> — 4-6 month async curriculum covering biochem
                depth (Lehninger first-semester), AAMC content outline mapping, 300+ practice
                passages, recorded video library, WhatsApp doubt support. Ideal for self-directed
                students.
              </li>
              <li>
                <strong>Small-Batch ($999)</strong> — 4-6 students per cohort, weekly 2-hour live
                sessions (timed for India and US time zones), monthly full-length B/B section mocks,
                peer study group with other NRI students, senior-faculty office hours. Most popular
                tier.
              </li>
              <li>
                <strong>1:1 with Senior Faculty ($1,499)</strong> — Personalised study plan keyed to
                your NEET-vs-MCAT gap diagnostic, weekly 90-min 1:1 video sessions with Dr. Shekhar
                or senior faculty, custom passage drilling on weak topics, mock-exam 1:1 analysis,
                unlimited WhatsApp access. Plus $150/hour for ad-hoc gap-fill sessions outside the
                package.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> May 2026 by Dr. Shekhar C Singh, AIIMS Delhi
                graduate and founder of Cerebrum Biology Academy. AAMC content outline and MCAT
                logistics are reviewed annually; NTA NEET specifications are updated annually.
                Verify current bulletins at students-residents.aamc.org and neet.nta.nic.in.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200 group"
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
              Want a coach who has trained both NEET-toppers and MCAT high-scorers?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Dr. Shekhar C Singh (AIIMS Delhi) understands both syllabi from the inside. The
              senior-faculty tier is built for the NRI and Indian-American bridge. Sessions are 100%
              online — WhatsApp the team to start.
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
                  Honest framing of the US pre-med pipeline.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
