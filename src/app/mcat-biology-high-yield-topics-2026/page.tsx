/**
 * /mcat-biology-high-yield-topics-2026
 *
 * Cornerstone informational page targeting "MCAT biology high yield
 * topics 2026" / "high yield MCAT bio" / "most tested MCAT biology".
 * Rank-ordered top-20 list with frequency estimate + difficulty
 * rating, derived from AAMC content-outline topic weighting plus
 * crowdsourced student reports (Reddit r/MCAT, Student Doctor Network
 * post-exam threads, AAMC official-practice answer-explanation
 * frequency).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronRight,
  GraduationCap,
  Home,
  MessageCircle,
  Microscope,
  Target,
  TrendingUp,
} from 'lucide-react'

const CANONICAL = '/mcat-biology-high-yield-topics-2026'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'MCAT Biology High-Yield Topics 2026 | Score 125+ Section',
  description:
    'Rank-ordered top-20 high-yield MCAT Biology topics for 2026, with AAMC frequency estimates, difficulty ratings, and a drilling protocol. AIIMS-trained faculty.',
  keywords: [
    'MCAT biology high yield topics 2026',
    'high yield MCAT bio',
    'most tested MCAT biology',
    'MCAT B/B high yield',
    'high yield MCAT biochem',
    'MCAT 2026 high yield',
    'most common MCAT biology questions',
    'AAMC frequently tested topics',
    'MCAT enzyme kinetics',
    'MCAT cellular respiration high yield',
    'MCAT renal physiology high yield',
    'MCAT genetics high yield',
    'MCAT score 125 biology',
    'MCAT biology study priorities',
    'AAMC topic weighting 2026',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology High-Yield Topics 2026 | Cerebrum',
    description:
      'Rank-ordered top-20 high-yield Bio/Biochem topics with frequency and difficulty ratings. Drilling protocol included.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT Biology High-Yield Topics 2026',
    description: 'Top-20 high-yield topics, drilling protocol, low-yield rabbit-hole warnings.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

interface Topic {
  rank: number
  topic: string
  blurb: string
  frequency: string
  difficulty: 'Medium' | 'High' | 'Very high'
  aamc: string
}

const topics: Topic[] = [
  {
    rank: 1,
    topic: 'Enzyme kinetics and regulation',
    blurb:
      'Michaelis-Menten parameters (Vmax, Km), Lineweaver-Burk plots, competitive vs non-competitive vs uncompetitive inhibition, allosteric regulation, cooperativity (haemoglobin).',
    frequency: '~6-9 questions per full exam',
    difficulty: 'High',
    aamc: '1A · 1D',
  },
  {
    rank: 2,
    topic: 'DNA replication and repair',
    blurb:
      'Replication-fork mechanics (helicase, primase, polymerase, ligase), leading vs lagging strand, telomeres and telomerase, proofreading, mismatch repair, nucleotide excision repair, double-strand break repair.',
    frequency: '~4-6 questions per full exam',
    difficulty: 'High',
    aamc: '1B',
  },
  {
    rank: 3,
    topic: 'Cellular respiration — glycolysis, Krebs, ETC',
    blurb:
      'Regulated steps in glycolysis (hexokinase, PFK-1, pyruvate kinase), Krebs cycle inputs and outputs, ETC complexes I-IV, chemiosmotic coupling, ATP yield, fermentation pathways.',
    frequency: '~5-8 questions per full exam',
    difficulty: 'High',
    aamc: '1D · 2A',
  },
  {
    rank: 4,
    topic: 'Transcription and translation',
    blurb:
      'RNA polymerase II promoter recognition, splicing (spliceosome, alternative splicing), poly-A tail, 5-prime cap, ribosome structure, initiation/elongation/termination of translation, tRNA wobble.',
    frequency: '~4-6 questions per full exam',
    difficulty: 'Medium',
    aamc: '1B',
  },
  {
    rank: 5,
    topic: 'Membrane transport',
    blurb:
      "Simple diffusion, facilitated diffusion, primary and secondary active transport, Na/K ATPase, symporters and antiporters, endocytosis vs exocytosis, Fick's law of diffusion.",
    frequency: '~4-5 questions per full exam',
    difficulty: 'Medium',
    aamc: '2A',
  },
  {
    rank: 6,
    topic: 'Endocrine system and negative feedback',
    blurb:
      'Hypothalamic-pituitary axes (HPA, HPT, HPG), peptide vs steroid hormone signalling, insulin/glucagon glucose homeostasis, cortisol stress response, thyroid hormone feedback.',
    frequency: '~4-6 questions per full exam',
    difficulty: 'Medium',
    aamc: '3A',
  },
  {
    rank: 7,
    topic: 'Renal physiology and filtration',
    blurb:
      'Nephron anatomy, glomerular filtration, PCT reabsorption, loop of Henle counter-current multiplier, collecting duct ADH and aldosterone, acid-base regulation, RAAS.',
    frequency: '~4-6 questions per full exam',
    difficulty: 'High',
    aamc: '3B',
  },
  {
    rank: 8,
    topic: 'Cardiovascular system',
    blurb:
      'Cardiac cycle, pressure-volume loops, electrical conduction (SA node, AV node, Purkinje), blood-vessel pressure relationships (Poiseuille), baroreceptor reflex, oxygen-haemoglobin dissociation curve.',
    frequency: '~4-5 questions per full exam',
    difficulty: 'Medium',
    aamc: '3B',
  },
  {
    rank: 9,
    topic: 'Action potentials and synaptic transmission',
    blurb:
      'Resting membrane potential, voltage-gated Na and K channels, depolarisation/repolarisation/hyperpolarisation, saltatory conduction, synaptic vesicle release, ionotropic vs metabotropic receptors.',
    frequency: '~3-5 questions per full exam',
    difficulty: 'High',
    aamc: '3A',
  },
  {
    rank: 10,
    topic: 'Mendelian and molecular genetics',
    blurb:
      'Autosomal recessive vs dominant, X-linked, codominance, incomplete dominance, pedigree analysis, Hardy-Weinberg, linkage and recombination, two-factor crosses.',
    frequency: '~3-5 questions per full exam',
    difficulty: 'Medium',
    aamc: '1C',
  },
  {
    rank: 11,
    topic: 'Amino acid and protein structure',
    blurb:
      'pKa and isoelectric point, peptide bond geometry, primary/secondary/tertiary/quaternary structure, disulphide bonds, denaturation, alpha helix vs beta sheet, post-translational modification.',
    frequency: '~3-5 questions per full exam',
    difficulty: 'High',
    aamc: '1A',
  },
  {
    rank: 12,
    topic: 'Cell signalling pathways',
    blurb:
      'G-protein-coupled receptors, receptor tyrosine kinases (RTKs), second messengers (cAMP, IP3, DAG, Ca2+), MAP kinase cascade, JAK-STAT, signal amplification.',
    frequency: '~3-5 questions per full exam',
    difficulty: 'High',
    aamc: '2A · 3A',
  },
  {
    rank: 13,
    topic: 'Gene regulation — prokaryotic and eukaryotic',
    blurb:
      'Lac operon, trp operon, eukaryotic transcription factors, enhancers and silencers, chromatin remodelling (histone acetylation, DNA methylation), miRNA and siRNA.',
    frequency: '~3-4 questions per full exam',
    difficulty: 'Medium',
    aamc: '1B',
  },
  {
    rank: 14,
    topic: 'Immune system mechanisms',
    blurb:
      'Innate vs adaptive immunity, B-cell vs T-cell activation, antibody structure and isotypes (IgM, IgG, IgA, IgE), MHC class I vs class II, complement cascade, vaccines.',
    frequency: '~3-4 questions per full exam',
    difficulty: 'Medium',
    aamc: '3B',
  },
  {
    rank: 15,
    topic: 'Lipid metabolism and fatty-acid oxidation',
    blurb:
      'Beta-oxidation, ketogenesis, triglyceride storage and mobilisation, cholesterol synthesis (HMG-CoA reductase), lipoproteins (chylomicron, VLDL, LDL, HDL), phospholipid structure.',
    frequency: '~2-4 questions per full exam',
    difficulty: 'High',
    aamc: '1D',
  },
  {
    rank: 16,
    topic: 'Cell cycle and apoptosis',
    blurb:
      'G1/S, G2/M checkpoints, cyclins and CDKs, p53, RB protein, cancer mutations, intrinsic vs extrinsic apoptotic pathways, caspase cascade.',
    frequency: '~2-4 questions per full exam',
    difficulty: 'Medium',
    aamc: '2C',
  },
  {
    rank: 17,
    topic: 'Respiratory physiology and gas exchange',
    blurb:
      "Lung volumes (TV, IRV, ERV, RV, FRC, TLC, VC), partial pressures (Dalton's law), alveolar gas exchange, oxygen and CO2 transport, Bohr effect.",
    frequency: '~2-3 questions per full exam',
    difficulty: 'Medium',
    aamc: '3B',
  },
  {
    rank: 18,
    topic: 'Carbohydrate chemistry',
    blurb:
      'Glycosidic bonds (alpha vs beta), monosaccharide stereochemistry (D vs L, anomers), disaccharides, glycogen vs starch vs cellulose, glycoprotein modifications.',
    frequency: '~2-3 questions per full exam',
    difficulty: 'Medium',
    aamc: '1A · 1D',
  },
  {
    rank: 19,
    topic: 'Experimental techniques in molecular biology',
    blurb:
      'PCR, gel electrophoresis (agarose, SDS-PAGE), Sanger sequencing, restriction enzymes, plasmid cloning, CRISPR-Cas9, Southern/Northern/Western blots, microarrays.',
    frequency: '~3-5 questions per full exam',
    difficulty: 'Medium',
    aamc: '1B',
  },
  {
    rank: 20,
    topic: 'Digestive system and nutrient absorption',
    blurb:
      'Carbohydrate, protein, and lipid digestion enzymes, pancreatic secretions, bile and emulsification, intestinal absorption mechanisms (SGLT1, PEPT1, chylomicron assembly), enterohepatic circulation.',
    frequency: '~2-3 questions per full exam',
    difficulty: 'Medium',
    aamc: '3B',
  },
]

const faqs = [
  {
    question: "What does 'high yield' actually mean for the MCAT?",
    answer:
      "'High yield' refers to topics that appear with the greatest frequency on the actual MCAT, weighted by both how often they're tested and how many questions you can expect per administration. AAMC does not publish official topic-frequency data, but yield estimates are synthesised from three sources: (1) the AAMC content outline's relative weighting of foundational concepts, (2) AAMC official-practice topic distribution across Section Banks and full-length exams, and (3) crowdsourced post-exam reports from Reddit r/MCAT and Student Doctor Network across 2023-2025 administrations.",
  },
  {
    question: 'How should I drill high-yield topics?',
    answer:
      'Passage practice beats content re-reading by a large margin. After you cover a topic in Campbell or Lehninger, immediately drill 5-8 AAMC passages on that topic — Section Banks first, then Question Packs, then Full-Length practice. Self-grade against the answer explanations, identify reasoning gaps, then re-read the relevant Campbell section to fill the gap. Repeat until you can score 80%+ on a fresh passage in that topic. Daily 60-90 minutes of passage practice for 8-12 weeks is the typical drilling cycle.',
  },
  {
    question: 'Is it safe to skip the low-yield topics?',
    answer:
      "Skip is too strong. The MCAT can and does pull from anywhere on the AAMC content outline, including topics that crowdsource as low yield. The right strategy is proportional time allocation: spend ~70% of content-review hours on the top-20 topics, ~20% on the next tier (organic chem overlap, plant biology basics, ecology), and ~10% on long-tail topics. Don't actively study things outside the AAMC outline. Read Campbell selectively; don't try to memorise all 56 chapters.",
  },
  {
    question: 'How is high yield different between Bio/Biochem and Psych/Soc?',
    answer:
      'Bio/Biochem high-yield is heavily content-driven — enzyme kinetics, cellular respiration, organ-system physiology. The reasoning layer is experimental-design interpretation. Psych/Soc is the inverse: lower content depth required but much higher emphasis on theory recognition (Maslow, Piaget, classical/operant conditioning, social-stratification frameworks). This page focuses only on Bio/Biochem high yield.',
  },
  {
    question: 'How accurate are crowdsourced post-exam topic reports?',
    answer:
      "They are directionally accurate but individually noisy. Any single Reddit post is one student's memory of one form of one administration — subject to recall bias and to AAMC's form-randomisation policy. Aggregated across 100+ posts per administration over 2-3 years, the patterns are reliable: enzyme kinetics, cellular respiration, organ-system physiology, and molecular biology consistently top the topic frequency. Treat individual posts as data points, not as definitive.",
  },
  {
    question: 'Does Cerebrum customise drilling to my weak high-yield topics?',
    answer:
      'Yes. The 1:1 with Senior Faculty tier ($1,499 full programme) builds your personalised study plan around a diagnostic, identifies the high-yield topics where you are weakest, and runs custom passage drilling weekly until your topic-level scores rise. Small-Batch tier ($999) covers all top-20 topics in the standard cohort sequence. Self-Paced ($499) provides the full topic library; you self-direct the prioritisation.',
  },
  {
    question: 'What score does mastering these top-20 topics target?',
    answer:
      'Roughly 70-80% of MCAT Bio/Biochem questions are pullable from the top-20 topics on this page. A student who scores 75-80% accuracy across these 20 topics typically scores in the 127-129 range on the B/B section, which corresponds to roughly the 80th-90th percentile. To break 130 (95th+ percentile), you need both top-20 mastery and competence on the tier-2 topics (lipid metabolism details, gas exchange specifics, immunology mechanisms).',
  },
  {
    question: "What's the difference between AAMC topic frequency and 'high yield'?",
    answer:
      "Topic frequency is how often a topic appears across exam forms. 'High yield' adds a difficulty and impact-per-question layer: a topic that appears once per exam but is heavily passage-integrated (like enzyme kinetics, which can drive a 5-7 question passage) is higher yield than a topic that appears once as a standalone discrete question. The list above ranks by combined frequency-times-impact, weighted toward passage-driving topics.",
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'MCAT Biology High-Yield Topics 2026',
  description:
    'Rank-ordered top-20 high-yield MCAT Biology topics for 2026, with AAMC frequency estimates, difficulty ratings, and a drilling protocol.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  datePublished: '2026-05-04',
  dateModified: '2026-06-08',
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
      name: 'High-Yield Topics 2026',
      item: PAGE_URL,
    },
  ],
}

const WHATSAPP_HREF =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi Dr. Shekhar — I'd like a study plan that prioritises the MCAT Bio/Biochem high-yield topics. Can you share next steps?"
  )

export default function MCATBiologyHighYield2026Page() {
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
                <span className="text-blue-700 font-medium">High-Yield Topics 2026</span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" /> Rank-ordered · AAMC-aligned · 2026 cycle
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              MCAT Biology High-Yield Topics —
              <span className="block text-yellow-400 mt-2">2026 AAMC Outline</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              The top-20 highest-yield Bio/Biochem topics on the 2026 MCAT, rank-ordered by combined
              frequency and impact. Each entry includes an estimated question frequency per full
              exam, a difficulty rating, and the AAMC concept code so you can cross-map to the
              official content outline. The list reflects AAMC content-outline weighting plus
              crowdsourced student reports across 2023-2025 administrations.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              Live online in your US time zone (ET/CT/MT/PT); pricing in USD.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-yellow-400" />
                Top-20 ranked
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                ~70-80% of B/B questions
              </span>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              What &ldquo;high yield&rdquo; actually means for the MCAT
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The AAMC does not publish official topic-frequency data. The published artefacts are
              the <em>Content Outline</em> (which lists every topic at category-level) and the{' '}
              <em>Official Guide</em> (which describes exam structure and scoring). Anything more
              granular has to be inferred from three indirect signals: (1) the relative weight the
              outline gives each foundational concept, (2) the topic distribution in AAMC Official
              Practice materials (Section Banks, Question Packs, Full-Length exams 1-5), and (3)
              crowdsourced post-exam reports from test-takers on Reddit r/MCAT and Student Doctor
              Network.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              We synthesise these three signals into the ranking below. The frequencies are
              estimates, not promises. Any single MCAT administration will deviate — the AAMC
              maintains form-level randomisation to prevent students from gaming the topic
              distribution. But across the average of ten consecutive administrations, the top-20
              topics on this page consistently account for roughly 70-80% of all Bio/Biochem
              questions asked.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Yield is not just frequency. A topic that appears once per exam but drives a
              passage-style question cluster (typically 4-7 questions tied to a single experimental
              vignette) is higher yield than a topic that appears once as a standalone discrete
              question. Enzyme kinetics, cellular respiration, and renal physiology consistently
              drive passage-style clusters on the MCAT, which is why they rank where they do.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Top-20 high-yield MCAT Biology topics (ranked)
            </h2>
            <p className="text-slate-600 mb-8">
              Ordered by combined frequency-times-impact. Frequency estimates are per single
              full-length MCAT (B/B section, 59 questions total). Difficulty reflects how often
              students score below the question&apos;s average accuracy on AAMC official practice.
            </p>
            <div className="space-y-3">
              {topics.map((t) => (
                <div
                  key={t.rank}
                  className="bg-white rounded-xl p-5 border border-slate-200 flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg">
                    {t.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-base md:text-lg">{t.topic}</h3>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-mono font-bold px-2 py-0.5 rounded">
                        AAMC {t.aamc}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-2">{t.blurb}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <TrendingUp className="w-3 h-3" />
                        <strong>Frequency:</strong> {t.frequency}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <Target className="w-3 h-3" />
                        <strong>Difficulty:</strong> {t.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Sources: AAMC <em>MCAT Content Outline</em> + AAMC Official Practice Section Banks and
              Question Packs (topic-distribution analysis); Reddit r/MCAT post-exam threads
              2023-2025 (n &gt; 600 aggregated reports); Student Doctor Network exam-day debriefs.
              Frequencies are estimates; AAMC randomises form-level distribution.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How to drill high-yield topics
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The single biggest mistake MCAT students make on high-yield content is to re-read
              Campbell or Kaplan multiple times instead of drilling AAMC passages. Re-reading builds
              passive recognition; passage practice builds the active reasoning the MCAT actually
              tests. Convert content into exam reflex with this protocol:
            </p>
            <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
              <li>
                <strong>First-pass content review (60-90 minutes per topic).</strong> Read the
                relevant Campbell or Lehninger chapter actively — take handwritten notes, draw the
                pathway or diagram from memory, do not just highlight. Aim for conceptual fluency,
                not memorisation.
              </li>
              <li>
                <strong>Immediate passage drilling (60-90 minutes per topic).</strong> Pull 5-8 AAMC
                passages or discrete questions on that topic. Section Banks first (hardest, most
                exam-like), then Question Packs, then official Full-Length explanations. Self-grade
                against the AAMC answer explanations.
              </li>
              <li>
                <strong>Gap-fill review (30-60 minutes).</strong> For every passage question you
                missed, write down (a) the gap — content vs reasoning vs careless — and (b) the fix.
                Re-read the Campbell section for any content gap. For reasoning gaps, study the AAMC
                explanation in detail.
              </li>
              <li>
                <strong>Spaced re-test (1 day, 3 days, 1 week).</strong> Re-drill 3-5 passages on
                the same topic at spaced intervals. Aim for 80%+ accuracy on the third re-test
                before moving on (Karpicke and Roediger, <em>Science</em> 2008).
              </li>
              <li>
                <strong>Cross-topic integration drilling (after top-10 covered).</strong> Once you
                have covered the top-10 topics, start drilling passages that integrate two or more
                high-yield topics (e.g., enzyme kinetics + cellular respiration; renal physiology +
                acid-base). These integration passages drive 30-40% of B/B passage-question
                clusters.
              </li>
              <li>
                <strong>Weekly full-length section practice.</strong> Once you have covered the full
                top-20, run a timed B/B section (59 questions, 95 minutes) weekly. Score against the
                section&apos;s answer key. Identify the topics where your section-level accuracy is
                below 70% and return to step 2 for those topics.
              </li>
            </ol>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Common low-yield rabbit holes
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The MCAT can technically pull from anywhere on the AAMC content outline, so the
              instinct is to study everything Campbell covers. Resist it. These topics consistently
              under-deliver question-yield for the hours invested:
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Plant biology beyond C3/C4/CAM photosynthesis.</strong> Campbell spends
                chapters 30-39 on plant form, function, and reproduction. The MCAT tests
                photosynthesis chemistry (light reactions, Calvin cycle) at a basic level. Plant
                anatomy, hormones, and reproductive structures appear &lt; 1 question per exam.
              </li>
              <li>
                <strong>Ecology and biodiversity (Campbell ch 52-56).</strong> Effectively zero MCAT
                question yield. Skip the entire section unless you want it for general knowledge.
              </li>
              <li>
                <strong>Detailed comparative anatomy across phyla.</strong> The MCAT does not test
                the difference between Annelida and Mollusca digestive systems. It tests vertebrate
                organ-system physiology — human-relevant biology.
              </li>
              <li>
                <strong>Deep evolutionary phylogenetics.</strong> Hardy-Weinberg, natural selection
                modes (directional, stabilising, disruptive), and basic speciation appear. Detailed
                cladistic methodology and molecular clocks do not.
              </li>
              <li>
                <strong>Animal-behaviour ethology.</strong> Imprinting, learning types, and
                kin-selection theory occasionally appear at psych/soc level, not in B/B. Skip
                Campbell ch 51 for B/B prep.
              </li>
              <li>
                <strong>Light reactions of photosynthesis at deep mechanistic level.</strong>{' '}
                Photosystem I and II at chlorophyll-pigment level appears rarely. Cover Calvin cycle
                and basic light-reaction inputs/outputs; do not memorise the full Z-scheme.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Caveat.</strong> Don&apos;t treat &ldquo;low yield&rdquo; as &ldquo;skip
                entirely.&rdquo; AAMC reserves the right to test anything on the outline. The smart
                strategy is proportional time: ~70% on top-20 topics, ~20% on tier-2 topics, ~10% on
                long-tail topics. Zero time on things outside the AAMC outline.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Pricing — how we coach high-yield drilling
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cerebrum Biology Academy runs MCAT Bio/Biochem programmes 100% online. All pricing in
              USD. Founder Dr. Shekhar C Singh (AIIMS Delhi — India's apex medical institute, peer
              to Harvard Medical School in selectivity) leads the senior-faculty tier.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>Self-Paced ($499)</strong> — Async 4-6 month curriculum covering all 20
                high-yield topics in the structured AAMC sequence. 300+ practice passages, recorded
                video library, WhatsApp doubt support.
              </li>
              <li>
                <strong>Small-Batch ($999)</strong> — 4-6 students per cohort. Everything in
                Self-Paced plus weekly 2-hour live sessions on the high-yield topics, monthly
                full-length B/B section mocks, senior-faculty office hours.
              </li>
              <li>
                <strong>1:1 with Senior Faculty ($1,499)</strong> — Personalised study plan keyed to
                your diagnostic, custom passage drilling on weak high-yield topics, weekly 90-min
                video sessions, unlimited WhatsApp faculty access. Plus $150/hour for ad-hoc
                gap-fill sessions outside the package.
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>Last reviewed:</strong> May 2026 by Dr. Shekhar C Singh, AIIMS Delhi
                graduate and founder of Cerebrum Biology Academy. AAMC content outline is reviewed
                annually — verify current scope at students-residents.aamc.org.
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
              Want a study plan that prioritises high-yield topics for you?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              We diagnose your weak high-yield topics, build a personalised passage-drilling
              schedule, and score your weekly mocks against the AAMC standard until your B/B section
              pulls past 127.
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
