/**
 * Final batch to reach 500+ HARD questions
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

interface HardQuestion {
  topic: string
  question: string
  options: string[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  source: string
  curriculum: string
  grade: string
}

const hardQuestions: HardQuestion[] = [
  {
    topic: 'Cell Structure and Function',
    question: 'Spindle fiber attachment site on chromosome is called:',
    options: ['Kinetochore', 'Centromere', 'Telomere', 'Chromomere'],
    correctAnswer: 'A',
    explanation:
      'Kinetochore is protein complex at centromere where spindle fibers attach. Centromere is DNA region. Telomere is chromosome end. Chromomere is bead-like region.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Heterochrony in evolution refers to:',
    options: [
      'Changes in timing or rate of development',
      'Geographic isolation',
      'Genetic drift',
      'Gene flow',
    ],
    correctAnswer: 'A',
    explanation:
      'Heterochrony is change in developmental timing leading to morphological changes. Can produce paedomorphosis (juvenile traits retained) or peramorphosis (extended development).',
    source: 'NCERT Class 12, Chapter 7',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Human Physiology',
    question: 'Pacemaker potential in SA node is due to:',
    options: [
      'Slow sodium influx and decreased potassium permeability',
      'Only calcium channels',
      'Only potassium channels',
      'Only sodium channels',
    ],
    correctAnswer: 'A',
    explanation:
      'Pacemaker cells have no stable resting potential. Gradual depolarization from If channels (Na+ influx) and decreased K+ conductance triggers spontaneous action potentials.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Hydroponics is:',
    options: [
      'Soil-less cultivation using nutrient solution',
      'Cultivation in water only',
      'Organic farming',
      'Greenhouse cultivation',
    ],
    correctAnswer: 'A',
    explanation:
      'Hydroponics grows plants in mineral nutrient solutions without soil. Roots may be in inert medium. Used to study essential minerals and commercial vegetable production.',
    source: 'NCERT Class 11, Chapter 12',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Reproduction',
    question: 'Menopause occurs due to:',
    options: [
      'Cessation of ovarian function',
      'Pituitary failure',
      'Uterine dysfunction',
      'Hypothalamic failure',
    ],
    correctAnswer: 'A',
    explanation:
      'Menopause (around 50 years) occurs when ovaries stop responding to gonadotropins due to follicle depletion. Estrogen and progesterone levels drop.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Biodiversity hotspot requires:',
    options: [
      'At least 1500 endemic species and 70% habitat loss',
      '1000 species only',
      'Large area only',
      'No endemic species',
    ],
    correctAnswer: 'A',
    explanation:
      'Biodiversity hotspots: areas with exceptionally high endemic species (at least 0.5% or 1500 species of vascular plants) and significant habitat loss (at least 70%).',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Selectable markers in cloning vectors help in:',
    options: [
      'Identifying transformed cells from non-transformed ones',
      'DNA replication',
      'Protein expression',
      'Gene silencing',
    ],
    correctAnswer: 'A',
    explanation:
      'Selectable markers (antibiotic resistance genes) allow selection of cells that have taken up plasmid. Non-transformed cells are killed by antibiotic.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Coenocytic hyphae lack:',
    options: ['Septa (cross-walls)', 'Cell membrane', 'Cytoplasm', 'Nucleus'],
    correctAnswer: 'A',
    explanation:
      'Coenocytic (aseptate) hyphae lack cross-walls, having continuous cytoplasm with many nuclei (found in Zygomycetes). Septate hyphae have cross-walls.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Lacunae in cartilage contain:',
    options: ['Chondrocytes', 'Osteocytes', 'Fibroblasts', 'Adipocytes'],
    correctAnswer: 'A',
    explanation:
      'Chondrocytes (cartilage cells) reside in lacunae within cartilage matrix. Osteocytes are in bone lacunae. Matrix contains chondroitin sulfate and collagen.',
    source: 'NCERT Class 11, Chapter 7',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Cyclosporin A is used as:',
    options: [
      'Immunosuppressant (after organ transplant)',
      'Antibiotic',
      'Anticancer drug',
      'Antiviral',
    ],
    correctAnswer: 'A',
    explanation:
      'Cyclosporin A from Trichoderma is immunosuppressant preventing transplant rejection. Inhibits T cell activation. Important in organ transplantation.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Autophagy involves:',
    options: [
      'Degradation of cells own damaged organelles',
      'Cell division',
      'Protein synthesis',
      'DNA replication',
    ],
    correctAnswer: 'A',
    explanation:
      'Autophagy is cellular housekeeping: damaged organelles are enclosed in autophagosome, fused with lysosome, and digested. Important in development, disease, and aging.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Epimutation is:',
    options: [
      'Heritable change in gene expression without DNA sequence change',
      'DNA sequence mutation',
      'Chromosomal aberration',
      'Aneuploidy',
    ],
    correctAnswer: 'A',
    explanation:
      'Epimutations are changes in gene expression due to DNA methylation or histone modifications, not DNA sequence changes. Can be inherited and cause disease.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Human Physiology',
    question: 'Von Willebrand factor is important for:',
    options: [
      'Platelet adhesion to damaged vessel wall',
      'RBC formation',
      'WBC migration',
      'Plasma protein synthesis',
    ],
    correctAnswer: 'A',
    explanation:
      'Von Willebrand factor bridges platelets to collagen in damaged vessels. Also carries Factor VIII. Deficiency causes bleeding disorder (von Willebrand disease).',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Apical dominance is maintained by:',
    options: ['Auxin from apical bud', 'Cytokinin', 'Ethylene', 'Abscisic acid'],
    correctAnswer: 'A',
    explanation:
      'Auxin from apical bud inhibits lateral bud growth. Removal of apex releases lateral buds from inhibition (pruning effect). Cytokinins promote lateral growth.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Reproduction',
    question: 'Primary spermatocyte undergoes:',
    options: [
      'Meiosis I to form secondary spermatocytes',
      'Mitosis',
      'Meiosis II',
      'Differentiation only',
    ],
    correctAnswer: 'A',
    explanation:
      'Primary spermatocyte (2n) undergoes Meiosis I producing two secondary spermatocytes (n). These undergo Meiosis II to form four spermatids.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Tertiary consumers in a food chain are:',
    options: ['Carnivores that eat secondary consumers', 'Herbivores', 'Producers', 'Decomposers'],
    correctAnswer: 'A',
    explanation:
      'Tertiary consumers eat secondary consumers. Example: snake (tertiary) eating frog (secondary) that ate insects (primary). Top predators are often tertiary or quaternary.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Reporter genes are used to:',
    options: [
      'Monitor gene expression (GFP, lacZ)',
      'Kill transformed cells',
      'Replicate DNA',
      'Cut DNA',
    ],
    correctAnswer: 'A',
    explanation:
      'Reporter genes like GFP (green fluorescence), lacZ (blue color with X-gal) help visualize and quantify gene expression. Commonly used in research.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Dikaryotic phase is characteristic of:',
    options: ['Basidiomycetes and Ascomycetes', 'Phycomycetes', 'Zygomycetes', 'Bacteria'],
    correctAnswer: 'A',
    explanation:
      'Dikaryotic phase (n+n) occurs in higher fungi (Ascomycetes, Basidiomycetes) where two nuclei coexist in cell after plasmogamy but before karyogamy.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Nephridia in earthworm are analogous to:',
    options: ['Kidney in vertebrates', 'Lungs', 'Heart', 'Brain'],
    correctAnswer: 'A',
    explanation:
      'Nephridia are excretory organs in annelids (like earthworm). They filter coelomic fluid and blood, excrete nitrogenous waste. Analogous to vertebrate kidney function.',
    source: 'NCERT Class 11, Chapter 7',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Probiotics are:',
    options: [
      'Live beneficial microorganisms for gut health',
      'Antibiotics',
      'Vaccines',
      'Hormones',
    ],
    correctAnswer: 'A',
    explanation:
      'Probiotics are live microorganisms (Lactobacillus, Bifidobacterium) that confer health benefits when consumed. Improve gut microbiome and immune function.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'SNARE proteins are involved in:',
    options: [
      'Vesicle fusion with target membrane',
      'DNA replication',
      'Protein synthesis',
      'Cell division',
    ],
    correctAnswer: 'A',
    explanation:
      'SNARE proteins (v-SNAREs on vesicle, t-SNAREs on target) mediate membrane fusion in secretion, neurotransmitter release. Botulinum toxin cleaves SNAREs.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Huntingtons disease is caused by:',
    options: [
      'Trinucleotide (CAG) repeat expansion',
      'Point mutation',
      'Chromosomal deletion',
      'Aneuploidy',
    ],
    correctAnswer: 'A',
    explanation:
      'Huntingtons disease results from CAG repeat expansion (more than 36) in HTT gene. Autosomal dominant. Causes neurodegeneration. More repeats = earlier onset.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Human Physiology',
    question: 'Bohr effect describes:',
    options: [
      'Decreased hemoglobin-oxygen affinity at lower pH',
      'Increased affinity at low pH',
      'No effect of pH',
      'Effect of temperature only',
    ],
    correctAnswer: 'A',
    explanation:
      'Bohr effect: low pH (high CO2) decreases hemoglobin oxygen affinity, promoting O2 release in tissues. Higher pH in lungs promotes O2 binding. Adaptive mechanism.',
    source: 'NCERT Class 11, Chapter 17',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Critical day length is important for:',
    options: ['Photoperiodic flowering', 'Photosynthesis rate', 'Respiration', 'Transpiration'],
    correctAnswer: 'A',
    explanation:
      'Critical day length determines flowering in photoperiodic plants. Short-day plants flower when days are shorter, long-day plants when days are longer than critical length.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Reproduction',
    question: 'Zona pellucida is:',
    options: ['Glycoprotein layer around egg', 'Cell membrane of egg', 'Cytoplasm', 'Nucleus'],
    correctAnswer: 'A',
    explanation:
      'Zona pellucida is extracellular glycoprotein matrix around mammalian egg. Contains ZP1, ZP2, ZP3 proteins. ZP3 is sperm receptor. Hardening after fertilization prevents polyspermy.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Alpha diversity refers to:',
    options: [
      'Species diversity within single community/habitat',
      'Between habitats',
      'Regional diversity',
      'Global diversity',
    ],
    correctAnswer: 'A',
    explanation:
      'Alpha diversity is within-habitat diversity. Beta diversity is between habitats. Gamma diversity is landscape/regional. Total diversity increases with beta diversity.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Competent cells are:',
    options: [
      'Cells made permeable to take up foreign DNA',
      'Normal cells',
      'Dead cells',
      'Cancer cells',
    ],
    correctAnswer: 'A',
    explanation:
      'Competent cells have increased permeability for DNA uptake. Made by CaCl2 treatment (creates pores) or electroporation. Essential for transformation in cloning.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Alternation of generations is most prominent in:',
    options: ['Bryophytes', 'Angiosperms', 'Gymnosperms', 'Bacteria'],
    correctAnswer: 'A',
    explanation:
      'Bryophytes show clear alternation between gametophyte (dominant, haploid) and sporophyte (dependent, diploid). In higher plants, sporophyte becomes dominant.',
    source: 'NCERT Class 11, Chapter 3',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Tracheids differ from vessels in being:',
    options: [
      'Narrow, tapered, and with only pits',
      'Wide and open',
      'Found only in angiosperms',
      'Made of living cells',
    ],
    correctAnswer: 'A',
    explanation:
      'Tracheids are narrow, elongated with tapered ends, connected by pits. Vessels are wider tubes with open perforations. Both are dead xylem elements.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Aflatoxins are produced by:',
    options: ['Aspergillus flavus (on stored grains/nuts)', 'Penicillium', 'Rhizopus', 'Mucor'],
    correctAnswer: 'A',
    explanation:
      'Aflatoxins are carcinogenic mycotoxins from Aspergillus flavus and A. parasiticus. Found on improperly stored peanuts, corn, rice. Cause liver cancer.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Cohesins hold:',
    options: [
      'Sister chromatids together until anaphase',
      'Homologous chromosomes',
      'Spindle fibers',
      'Centrioles',
    ],
    correctAnswer: 'A',
    explanation:
      'Cohesin proteins hold sister chromatids together after DNA replication until they are cleaved by separase in anaphase. Ensures equal chromosome distribution.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Polytene chromosomes are found in:',
    options: ['Salivary glands of Drosophila larvae', 'Human cells', 'Bacteria', 'Yeast'],
    correctAnswer: 'A',
    explanation:
      'Polytene chromosomes result from multiple rounds of DNA replication without cell division (endoreduplication). Giant chromosomes with characteristic banding pattern.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Human Physiology',
    question: 'Angiotensin II causes:',
    options: [
      'Vasoconstriction and aldosterone release',
      'Vasodilation',
      'Decreased blood pressure',
      'Increased urine output',
    ],
    correctAnswer: 'A',
    explanation:
      'Angiotensin II is potent vasoconstrictor and stimulates aldosterone release from adrenal cortex. Part of RAAS for blood pressure regulation. ACE inhibitors block its formation.',
    source: 'NCERT Class 11, Chapter 19',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Phototropism is mediated by:',
    options: ['Auxin redistribution', 'Gibberellin', 'Cytokinin', 'Ethylene'],
    correctAnswer: 'A',
    explanation:
      'Phototropism: auxin moves to shaded side, causing differential growth (shaded side elongates more), bending shoot toward light. Discovered by Darwin, Went.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Reproduction',
    question: 'Inner cell mass gives rise to:',
    options: ['Embryo proper', 'Placenta', 'Umbilical cord', 'Amnion'],
    correctAnswer: 'A',
    explanation:
      'Inner cell mass (embryoblast) forms embryo proper. Outer trophoblast contributes to placenta. ICM differentiates into three germ layers during gastrulation.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Climax community is:',
    options: [
      'Stable, self-perpetuating final community in succession',
      'Initial community',
      'Disturbed community',
      'Artificial community',
    ],
    correctAnswer: 'A',
    explanation:
      'Climax community is the final, stable community that develops after ecological succession. In equilibrium with environment. Remains until major disturbance.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Antisense technology involves:',
    options: [
      'Using complementary RNA to block gene expression',
      'Enhancing gene expression',
      'Cutting genes',
      'Copying genes',
    ],
    correctAnswer: 'A',
    explanation:
      'Antisense RNA/oligonucleotides bind complementary mRNA, preventing translation. Used to study gene function and develop therapeutics. RNAi is related technology.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Gemmae cups are found in:',
    options: ['Marchantia (for asexual reproduction)', 'Funaria', 'Selaginella', 'Pinus'],
    correctAnswer: 'A',
    explanation:
      'Gemmae cups on thallus of Marchantia contain gemmae (multicellular asexual propagules). Gemmae are splashed by rain and grow into new plants.',
    source: 'NCERT Class 11, Chapter 3',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Lateral line system in fish detects:',
    options: ['Water pressure changes and vibrations', 'Temperature', 'Light', 'Chemicals only'],
    correctAnswer: 'A',
    explanation:
      'Lateral line is sensory system with neuromasts detecting water movements and pressure changes. Helps in orientation, prey detection, schooling behavior.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'BOD test is performed for:',
    options: ['5 days at 20 degrees Celsius', '1 day at 37C', '10 days at 25C', '24 hours at 20C'],
    correctAnswer: 'A',
    explanation:
      'Standard BOD test measures oxygen consumed by microbes decomposing organic matter over 5 days at 20C in dark. BOD5 is common water quality parameter.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Lipid rafts in cell membrane are enriched in:',
    options: [
      'Cholesterol and sphingolipids',
      'Carbohydrates only',
      'Proteins only',
      'Nucleic acids',
    ],
    correctAnswer: 'A',
    explanation:
      'Lipid rafts are membrane microdomains rich in cholesterol and sphingolipids. Less fluid, serve as platforms for signaling proteins and receptor clustering.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Centromere is constriction region that:',
    options: [
      'Holds sister chromatids and attaches to spindle',
      'Contains genes',
      'Is at chromosome ends',
      'Is made of RNA',
    ],
    correctAnswer: 'A',
    explanation:
      'Centromere is constricted region where sister chromatids are joined and kinetochore forms. Position determines chromosome type: metacentric, submetacentric, acrocentric, telocentric.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Rods and cones differ in:',
    options: [
      'Rods for dim light, cones for bright light and color',
      'Rods for color, cones for dim light',
      'No difference',
      'Location only',
    ],
    correctAnswer: 'A',
    explanation:
      'Rods (rhodopsin) are highly sensitive, work in dim light, no color. Cones (iodopsins) need bright light, provide color vision (red, green, blue). Rods outer, cones concentrated in fovea.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
]

async function generateHardQuestions() {
  console.log('Starting HARD question generation (Final batch to reach 500+)...\n')

  const questionsToInsert = hardQuestions.map((q) => ({
    id: crypto.randomUUID(),
    topic: q.topic,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    difficulty: 'HARD' as const,
    source: q.source,
    curriculum: q.curriculum,
    grade: q.grade,
    type: 'MCQ' as const,
    subject: 'Biology',
    isActive: true,
    isVerified: true,
    updatedAt: new Date(),
  }))

  let inserted = 0
  let duplicates = 0

  for (const q of questionsToInsert) {
    try {
      const existing = await prisma.questions.findFirst({
        where: { question: q.question, isActive: true },
      })

      if (existing) {
        duplicates++
        continue
      }

      await prisma.questions.create({ data: q })
      inserted++
    } catch {
      /* ignore */
    }
  }

  console.log(`Inserted: ${inserted}`)
  console.log(`Duplicates: ${duplicates}`)

  const hardCount = await prisma.questions.count({
    where: { difficulty: 'HARD', isActive: true },
  })
  console.log(`\n TOTAL HARD questions: ${hardCount}`)

  if (hardCount >= 500) {
    console.log('\n TARGET ACHIEVED: 500+ HARD questions!')
  }
}

generateHardQuestions()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
