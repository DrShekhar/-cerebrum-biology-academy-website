/**
 * /gamsat-biology-topics-2026
 *
 * GAMSAT biology topics organised by yield — molecular biology, genetics,
 * physiology, biochemistry, ecology, evolution. Campbell Biology chapter
 * mapping, ACER content descriptors, MCAT B/B overlap comparison.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}/gamsat-biology-topics-2026`

export const metadata: Metadata = {
  title: 'GAMSAT Biology Topics 2026 — High-Yield Section III Biology Content',
  description:
    'Complete GAMSAT biology topic list for 2026 — organised by yield with Campbell Biology chapter mapping, ACER content descriptors, MCAT B/B overlap, and topic-by-topic study tips.',
  keywords: [
    'GAMSAT biology topics',
    'GAMSAT biology topics 2026',
    'GAMSAT Section III topics',
    'GAMSAT high yield biology',
    'GAMSAT biology syllabus',
    'GAMSAT what biology to study',
    'GAMSAT molecular biology',
    'GAMSAT genetics topics',
    'GAMSAT physiology topics',
    'GAMSAT biochemistry topics',
    'GAMSAT Campbell Biology chapters',
    'GAMSAT ACER content descriptors',
    'GAMSAT vs MCAT biology',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'GAMSAT Biology Topics 2026 | Cerebrum Biology Academy',
    description:
      'High-yield GAMSAT biology topics with Campbell chapter mapping, ACER descriptors, study tips.',
    url: PAGE_URL,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAMSAT Biology Topics 2026',
    description: 'Topic list by yield, Campbell mapping, MCAT overlap, study tips per topic.',
  },
}

interface GAMSATTopic {
  topic: string
  yield: 'Very high' | 'High' | 'Medium' | 'Low'
  campbellChapters: string
  description: string
  studyTip: string
}

const topics: GAMSATTopic[] = [
  {
    topic: 'Molecular biology — DNA replication, repair, and recombination',
    yield: 'Very high',
    campbellChapters: 'Ch 16-17',
    description:
      "Replication fork mechanics (helicase, primase, DNA polymerase III, ligase), leading vs lagging strand, Okazaki fragments, telomere replication, proofreading (3' to 5' exonuclease), mismatch repair, nucleotide excision repair, double-strand break repair (NHEJ vs homologous recombination).",
    studyTip:
      'GAMSAT stimuli often present an unfamiliar repair mechanism or a mutant polymerase. Focus on understanding the logic of each step rather than memorising enzyme names — the passage will provide specific details.',
  },
  {
    topic: 'Transcription and gene expression',
    yield: 'Very high',
    campbellChapters: 'Ch 17-19',
    description:
      "RNA polymerase II, promoter recognition, transcription factors, mRNA processing (5' cap, 3' poly-A tail, splicing via spliceosome), alternative splicing, gene regulation in prokaryotes (lac operon, trp operon) and eukaryotes (enhancers, silencers, chromatin remodelling, histone acetylation, DNA methylation), miRNA and siRNA post-transcriptional regulation.",
    studyTip:
      'Gene regulation is a passage-driving topic — expect stimuli describing an unfamiliar operon or regulatory element. Know the general principles (positive vs negative regulation, cis vs trans elements) so you can reason about novel systems.',
  },
  {
    topic: 'Translation and protein processing',
    yield: 'Very high',
    campbellChapters: 'Ch 17',
    description:
      'Ribosome structure (40S/60S in eukaryotes, 30S/50S in prokaryotes), initiation (Shine-Dalgarno in prokaryotes, Kozak in eukaryotes), elongation, termination, tRNA charging and wobble hypothesis, post-translational modifications (phosphorylation, glycosylation, ubiquitination), protein folding and chaperones, proteasome degradation.',
    studyTip:
      'Know the differences between prokaryotic and eukaryotic translation — GAMSAT can present antibiotic mechanisms that target specific ribosomal subunits as stimulus passages.',
  },
  {
    topic: 'Enzyme kinetics and regulation',
    yield: 'Very high',
    campbellChapters: 'Ch 8 + Lehninger Ch 6',
    description:
      'Michaelis-Menten equation (Vmax, Km), Lineweaver-Burk double-reciprocal plots, competitive vs non-competitive vs uncompetitive inhibition (graphical identification), allosteric regulation, cooperativity and Hill coefficient, covalent modification (phosphorylation), zymogen activation, feedback inhibition.',
    studyTip:
      'This topic straddles the biology-chemistry boundary. Be able to read and interpret Lineweaver-Burk plots from stimulus data — GAMSAT frequently provides unfamiliar enzyme data and asks you to identify the inhibition type.',
  },
  {
    topic: 'Metabolic pathways — glycolysis, Krebs, oxidative phosphorylation',
    yield: 'Very high',
    campbellChapters: 'Ch 9 + Lehninger Ch 14-19',
    description:
      'Glycolysis (10 steps, regulated enzymes: hexokinase, PFK-1, pyruvate kinase), pyruvate dehydrogenase complex, citric acid cycle (inputs, outputs, regulation), electron transport chain (Complexes I-IV, ubiquinone, cytochrome c), chemiosmotic coupling (ATP synthase mechanism), substrate-level vs oxidative phosphorylation, ATP yield accounting, anaerobic fermentation (lactate and ethanol pathways), gluconeogenesis.',
    studyTip:
      'Know the net ATP yield and the regulated steps. GAMSAT stimuli often present metabolic poisons (rotenone, cyanide, oligomycin, 2,4-DNP) and ask you to predict the effect on ATP production. Understand each complex so you can reason about novel inhibitors.',
  },
  {
    topic: 'Genetics — Mendelian and molecular',
    yield: 'High',
    campbellChapters: 'Ch 14-15, 23',
    description:
      'Autosomal dominant/recessive inheritance, X-linked inheritance, codominance, incomplete dominance, epistasis, polygenic inheritance, pedigree analysis, Hardy-Weinberg equilibrium (assumptions, equation, application), linkage and recombination, genetic mapping, chi-square test for genetic ratios.',
    studyTip:
      'GAMSAT genetics questions often present a pedigree or cross data and ask you to determine the inheritance pattern. Practice quickly identifying autosomal vs X-linked from pedigree structure. Hardy-Weinberg is straightforward marks if you know the formula and its assumptions.',
  },
  {
    topic: 'Cell biology — membrane transport and cell signalling',
    yield: 'High',
    campbellChapters: 'Ch 7, 11-12',
    description:
      'Phospholipid bilayer structure, integral vs peripheral proteins, simple diffusion, facilitated diffusion (channels and carriers), primary active transport (Na/K ATPase, Ca ATPase), secondary active transport (symporters and antiporters), osmosis and tonicity, endocytosis and exocytosis. Cell signalling: G-protein-coupled receptors, receptor tyrosine kinases, second messengers (cAMP, IP3, DAG, Ca2+), MAPK cascade, cell cycle checkpoints, cyclins and CDKs.',
    studyTip:
      'Membrane transport questions often combine biology with chemistry (concentration gradients, electrochemical potential). Cell signalling passages may present an unfamiliar receptor or pathway — focus on understanding the general logic of signal transduction cascades.',
  },
  {
    topic: 'Cardiovascular physiology',
    yield: 'High',
    campbellChapters: 'Ch 42',
    description:
      'Heart anatomy and blood flow, cardiac cycle (systole/diastole), pressure-volume relationship, electrical conduction system (SA node, AV node, bundle of His, Purkinje fibres), ECG interpretation, blood pressure regulation (baroreceptor reflex, RAAS), oxygen-haemoglobin dissociation curve (Bohr effect, 2,3-BPG), blood vessel structure and function.',
    studyTip:
      'The oxygen-haemoglobin dissociation curve is a GAMSAT favourite — know how pH, temperature, CO2, and 2,3-BPG shift the curve and why. Stimuli may present a clinical scenario with abnormal blood gases.',
  },
  {
    topic: 'Renal physiology',
    yield: 'High',
    campbellChapters: 'Ch 44',
    description:
      'Nephron anatomy (glomerulus, PCT, loop of Henle, DCT, collecting duct), glomerular filtration (GFR, filtration fraction), tubular reabsorption and secretion, counter-current multiplier system (loop of Henle), ADH and water reabsorption, aldosterone and sodium reabsorption, RAAS pathway, acid-base regulation (bicarbonate reabsorption, H+ secretion, ammonium excretion), clearance calculations.',
    studyTip:
      'Renal passages are common and tend to involve data interpretation — clearance calculations, GFR estimation from inulin or creatinine data. Practice working through these quantitatively.',
  },
  {
    topic: 'Respiratory physiology',
    yield: 'High',
    campbellChapters: 'Ch 42',
    description:
      "Lung mechanics (inspiration/expiration, diaphragm and intercostals), lung volumes and capacities (tidal volume, vital capacity, residual volume, FRC, TLC), alveolar gas exchange (partial pressures, Dalton's law, Henry's law), oxygen and CO2 transport in blood, ventilation-perfusion matching, central and peripheral chemoreceptors.",
    studyTip:
      "Gas exchange questions often require you to apply Dalton's law or understand partial pressure gradients. Know the difference between ventilation and perfusion and what happens when they are mismatched.",
  },
  {
    topic: 'Endocrine system',
    yield: 'High',
    campbellChapters: 'Ch 45',
    description:
      'Hypothalamic-pituitary axes (HPA, HPT, HPG), negative feedback mechanisms, peptide vs steroid hormone signalling pathways, insulin and glucagon (glucose homeostasis), cortisol stress response, thyroid hormones (T3/T4 synthesis and regulation), adrenal medulla (adrenaline/noradrenaline), growth hormone, calcium homeostasis (PTH, calcitonin, vitamin D).',
    studyTip:
      'GAMSAT endocrine questions typically present a clinical scenario with hormone level data and ask you to identify the dysfunction. Know the feedback loops well enough to predict what happens when a gland is overactive or underactive.',
  },
  {
    topic: 'Neurophysiology',
    yield: 'Medium',
    campbellChapters: 'Ch 48-49',
    description:
      'Resting membrane potential (Nernst equation, Goldman equation), action potential generation and propagation, voltage-gated Na+ and K+ channels, refractory periods, saltatory conduction in myelinated neurons, synaptic transmission (chemical synapse, neurotransmitter release, receptor types), neuromuscular junction, autonomic nervous system (sympathetic vs parasympathetic).',
    studyTip:
      'Action potential mechanics are well-suited to stimulus-based questions — expect passages presenting novel channel mutations or drug effects and asking you to predict the electrophysiological consequence.',
  },
  {
    topic: 'Immunology',
    yield: 'Medium',
    campbellChapters: 'Ch 43',
    description:
      'Innate immunity (physical barriers, phagocytes, complement system, inflammation), adaptive immunity (B cells and antibody-mediated immunity, T cells and cell-mediated immunity), antibody structure and classes (IgM, IgG, IgA, IgE, IgD), MHC class I vs class II antigen presentation, clonal selection, immunological memory, vaccines, hypersensitivity reactions, autoimmunity basics.',
    studyTip:
      'Immunology passages may describe an unfamiliar immune response or a vaccine mechanism. Know the distinction between innate and adaptive, and between humoral (B cell) and cell-mediated (T cell) immunity.',
  },
  {
    topic: 'Amino acid chemistry and protein structure',
    yield: 'Medium',
    campbellChapters: 'Ch 5 + Lehninger Ch 3-4',
    description:
      'Amino acid classification (nonpolar, polar, charged), pKa and isoelectric point calculations, peptide bond formation and properties, protein structure levels (primary through quaternary), alpha helix and beta sheet, disulphide bonds, hydrophobic interactions, denaturation and renaturation, protein folding diseases (prion diseases, amyloidosis).',
    studyTip:
      'Amino acid chemistry straddles biology and chemistry. Be confident with pKa calculations and predicting charge state at a given pH — this is a frequently tested quantitative skill on GAMSAT.',
  },
  {
    topic: 'Lipid metabolism and fatty acid biochemistry',
    yield: 'Medium',
    campbellChapters: 'Lehninger Ch 17, 21',
    description:
      'Fatty acid structure (saturated, unsaturated, essential), beta-oxidation (cycle, ATP yield per fatty acid), ketogenesis and ketone body metabolism, triglyceride synthesis and storage, cholesterol synthesis pathway (HMG-CoA reductase), lipoproteins (chylomicrons, VLDL, LDL, HDL), phospholipid and membrane structure.',
    studyTip:
      'Beta-oxidation ATP yield calculations occasionally appear. Know the general cycle and be able to calculate ATP yield for a given fatty acid chain length.',
  },
  {
    topic: 'Recombinant DNA technology',
    yield: 'Medium',
    campbellChapters: 'Ch 20-21',
    description:
      'Restriction enzymes and restriction mapping, plasmid vectors and cloning, PCR (primers, Taq polymerase, thermal cycling), gel electrophoresis (agarose for DNA, SDS-PAGE for proteins), Southern blot, Northern blot, Western blot, DNA sequencing (Sanger method), CRISPR-Cas9 genome editing, gene expression analysis (RT-PCR, microarray, RNA-seq).',
    studyTip:
      'Experimental techniques are common stimulus material — expect a passage describing a cloning experiment or a gel result and asking you to interpret the data. Know what each technique tells you and its limitations.',
  },
  {
    topic: 'Evolution and natural selection',
    yield: 'Low',
    campbellChapters: 'Ch 22-25',
    description:
      'Natural selection (directional, stabilising, disruptive), genetic drift, gene flow, speciation (allopatric, sympatric), adaptive radiation, evidence for evolution (comparative anatomy, molecular phylogenetics, fossil record), phylogenetic tree interpretation.',
    studyTip:
      'Evolution questions are less frequent but can appear as multi-question stimulus passages about population genetics or phylogenetic data. Hardy-Weinberg is the highest-yield sub-topic within evolution.',
  },
  {
    topic: 'Ecology',
    yield: 'Low',
    campbellChapters: 'Ch 52-55',
    description:
      'Population growth models (exponential, logistic), carrying capacity, r-selected vs K-selected species, predator-prey dynamics (Lotka-Volterra), competition (competitive exclusion), food webs and trophic levels, energy flow through ecosystems, biogeochemical cycles (carbon, nitrogen, phosphorus).',
    studyTip:
      'Ecology is the lowest-yield biology domain for GAMSAT. Cover population growth models and trophic-level energy transfer at a basic level. Do not invest significant time unless all higher-yield topics are mastered.',
  },
  {
    topic: 'Plant biology',
    yield: 'Low',
    campbellChapters: 'Ch 30-39',
    description:
      'Photosynthesis (light reactions, Calvin cycle, C3/C4/CAM plants), plant hormones (auxin, cytokinin, gibberellin, ethylene, abscisic acid), plant structure (roots, stems, leaves), water transport (transpiration, cohesion-tension theory), mineral nutrition.',
    studyTip:
      'Photosynthesis chemistry (light reactions and Calvin cycle) is the only consistently tested plant topic. Skip detailed plant anatomy and reproduction unless you have completed all higher-yield domains.',
  },
  {
    topic: 'Microbiology',
    yield: 'Low',
    campbellChapters: 'Ch 27-28',
    description:
      'Bacterial cell structure (cell wall, capsule, flagella, plasmid), binary fission, horizontal gene transfer (conjugation, transduction, transformation), viral structure and replication cycles (lytic vs lysogenic), bacteriophages, antibiotic mechanisms and resistance.',
    studyTip:
      'Microbiology stimuli on GAMSAT often involve antibiotic resistance mechanisms or viral replication — understand the principles well enough to reason about novel scenarios presented in the passage.',
  },
]

const faqs = [
  {
    question: 'Which biology topics appear most frequently on GAMSAT Section III?',
    answer:
      'Molecular biology (DNA replication, transcription, translation, gene regulation) and biochemistry (enzyme kinetics, metabolic pathways) are the most frequently tested biology domains, collectively accounting for approximately 50-55% of biology content in Section III. Vertebrate physiology (cardiovascular, renal, respiratory, endocrine) accounts for another 20-25%. These three domains together cover roughly 75-80% of all biology questions.',
  },
  {
    question: 'Do I need to memorise every topic for GAMSAT?',
    answer:
      'No. GAMSAT is a reasoning exam, not a recall exam. You need sufficient content knowledge to understand the stimulus passages, but the answers are derived from the passage combined with foundational principles. Aim for conceptual fluency across the "Very high" and "High" yield topics — you should understand the logic of each process well enough to apply it to an unfamiliar scenario. For "Medium" and "Low" yield topics, surface-level familiarity is sufficient.',
  },
  {
    question: 'How deep is the biochemistry on GAMSAT Section III?',
    answer:
      'GAMSAT tests biochemistry at a first-year university level — roughly equivalent to the first 20 chapters of Lehninger. You need to know enzyme kinetics (Michaelis-Menten, inhibition types), major metabolic pathways (glycolysis, Krebs, oxidative phosphorylation, beta-oxidation), amino acid chemistry, and protein structure. You do not need advanced biochemistry topics like detailed signal transduction cascades, advanced metabolomics, or protein crystallography.',
  },
  {
    question: 'Are genetics questions common on GAMSAT?',
    answer:
      'Yes — genetics questions appear consistently across GAMSAT sittings. Mendelian genetics (pedigree analysis, crosses, probability calculations) and molecular genetics (gene regulation, mutations, recombinant DNA) are both well-represented. Hardy-Weinberg equilibrium is a frequently tested topic that bridges genetics and evolution. Genetics passages are often data-rich, requiring interpretation of cross results, gel images, or sequencing data.',
  },
  {
    question: 'Is evolution tested on GAMSAT Section III?',
    answer:
      'Evolution appears less frequently than molecular biology, biochemistry, or physiology, but it can anchor multi-question stimulus passages. The most commonly tested evolution topics are: natural selection mechanisms, Hardy-Weinberg equilibrium and its assumptions, phylogenetic tree interpretation, and evidence for evolution. Detailed cladistic methodology and molecular clock calculations are rare.',
  },
]

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
      name: 'GAMSAT Section III Biology Prep',
      item: `${SITE_URL}/gamsat-section-3-biology-prep`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Biology Topics 2026',
      item: PAGE_URL,
    },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm preparing for GAMSAT Section III and want guidance on which biology topics to prioritise. Please share programme details."
  )

function yieldBadgeClass(y: string): string {
  switch (y) {
    case 'Very high':
      return 'bg-red-100 text-red-800'
    case 'High':
      return 'bg-orange-100 text-orange-800'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function GAMSATBiologyTopics2026Page() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-purple-900 to-indigo-900 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-purple-300 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/gamsat-section-3-biology-prep" className="hover:text-white">
              GAMSAT Section III Biology Prep
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Biology Topics 2026</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            GAMSAT Biology Topics 2026 — High-Yield Section III Biology Content
          </h1>
          <p className="text-xl text-purple-200 mb-6 max-w-3xl">
            Every biology topic tested on GAMSAT Section III, organised by yield. Each entry
            includes Campbell Biology chapter mapping, key content areas, and a study tip specific
            to how that topic appears in GAMSAT stimulus passages. Covers the full spectrum from
            molecular biology (very high yield) to ecology (low yield).
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +91 88264-44334
            </a>
            <Link
              href="/gamsat-section-3-study-guide"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold"
            >
              16-Week Study Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            GAMSAT Section III biology topics by yield
          </h2>
          <p className="text-slate-600 mb-8">
            Topics are ordered from very high yield to low yield. Yield estimates are based on ACER
            content descriptors and post-exam candidate reports from 2022-2025 sittings. Campbell
            Biology chapter references are to the 12th edition.
          </p>
          <div className="space-y-4">
            {topics.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition"
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 text-base md:text-lg">{t.topic}</h3>
                  <span
                    className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${yieldBadgeClass(t.yield)}`}
                  >
                    {t.yield} yield
                  </span>
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs font-mono font-bold px-2 py-0.5 rounded">
                    {t.campbellChapters}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-2">{t.description}</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong>Study tip:</strong> {t.studyTip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            GAMSAT vs MCAT B/B — topic overlap
          </h2>
          <p>
            GAMSAT Section III and MCAT Biological and Biochemical Foundations of Living Systems
            (B/B) share approximately 70-80% topic overlap at the content level. Both test molecular
            biology, genetics, biochemistry, and vertebrate physiology. The key differences:
          </p>
          <ul>
            <li>
              <strong>MCAT has a published content outline; GAMSAT does not.</strong> MCAT students
              can map every topic to an AAMC concept code. GAMSAT students must infer the syllabus
              from ACER content descriptors and practice materials.
            </li>
            <li>
              <strong>GAMSAT emphasises stimulus-based reasoning more heavily.</strong> MCAT B/B
              also uses passages, but includes more standalone discrete questions that test content
              recall. GAMSAT Section III is almost entirely passage-based — pure content recall
              questions are rare.
            </li>
            <li>
              <strong>GAMSAT includes chemistry and physics in the same section.</strong> MCAT
              separates B/B (biology-focused) from Chemical and Physical Foundations (C/P). GAMSAT
              combines all three sciences in Section III, creating more cross-disciplinary stimulus
              passages.
            </li>
            <li>
              <strong>Depth calibration differs.</strong> MCAT tests at a slightly deeper content
              level for some topics (enzyme kinetics, organ-system physiology) because it has a
              fixed content outline. GAMSAT tests at a broader reasoning level — the passage
              provides specialised information and tests your ability to apply general principles.
            </li>
          </ul>
          <p>
            If you have already prepared for the MCAT B/B section, your biology content base is
            largely sufficient for GAMSAT Section III. The adjustment needed is in reasoning style —
            practice ACER stimulus passages to calibrate your approach.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Diagram and passage interpretation skills
          </h2>
          <p>
            Beyond content knowledge, GAMSAT Section III requires strong scientific reading and data
            interpretation skills. Commonly tested formats include:
          </p>
          <ul>
            <li>
              <strong>Experimental passages</strong> — A 200-300 word description of an experiment
              (often unfamiliar) with a figure or table. Questions ask you to interpret the results,
              identify controls, predict outcomes of modified experiments, or evaluate conclusions.
            </li>
            <li>
              <strong>Graph interpretation</strong> — Line graphs, bar charts, scatter plots, and
              dose-response curves. You must be able to read axes, identify trends, calculate rates
              from slopes, and compare data sets.
            </li>
            <li>
              <strong>Diagram-based reasoning</strong> — Metabolic pathway diagrams, cell diagrams,
              anatomical cross-sections, phylogenetic trees. Questions ask you to trace a process,
              identify the effect of a blockage or mutation, or compare pathways.
            </li>
            <li>
              <strong>Clinical scenarios</strong> — A patient presentation with laboratory data.
              Questions apply physiological principles to diagnose or predict outcomes. These
              combine content knowledge with clinical reasoning.
            </li>
          </ul>
          <p>
            Practise these formats using ACER official materials. Third-party practice materials may
            not match the ACER stimulus style closely enough to build the right reasoning habits.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Related guides</h2>
          <ul>
            <li>
              <Link href="/gamsat-section-3-study-guide" className="text-blue-600 hover:underline">
                GAMSAT Section III Study Guide — 16-week plan
              </Link>
            </li>
            <li>
              <Link href="/gamsat-section-3-biology-prep" className="text-blue-600 hover:underline">
                GAMSAT Section III Biology Prep — full programme details
              </Link>
            </li>
            <li>
              <Link
                href="/gamsat-score-breakdown-biology"
                className="text-blue-600 hover:underline"
              >
                GAMSAT Score Breakdown — Section III biology scoring guide
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">GAMSAT Biology Topics FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg">
                  {f.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get a personalised GAMSAT biology topic plan
          </h2>
          <p className="text-purple-200 mb-8">
            Free 30-minute diagnostic consultation. We assess your strengths across the topic list
            above and build a targeted study plan that prioritises your weakest high-yield areas
            first.
          </p>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>
      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
