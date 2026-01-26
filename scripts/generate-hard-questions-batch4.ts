/**
 * Generate HARD difficulty NEET Biology questions - Batch 4 (Final)
 * Advanced questions across all topics to reach 500+ target
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
  // ========== CELL BIOLOGY - MORE ==========
  {
    topic: 'Cell Structure and Function',
    question: 'Dynein and kinesin are motor proteins associated with:',
    options: ['Microtubules', 'Microfilaments', 'Intermediate filaments', 'Ribosomes'],
    correctAnswer: 'A',
    explanation:
      'Dynein moves toward minus end (centrosome), kinesin toward plus end of microtubules. They transport organelles and vesicles. Myosin is associated with microfilaments.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'The spindle fibers are made of:',
    options: ['Tubulin proteins', 'Actin proteins', 'Keratin', 'Collagen'],
    correctAnswer: 'A',
    explanation:
      'Spindle fibers are composed of microtubules (alpha and beta tubulin dimers). They attach to kinetochores and pull chromosomes during cell division.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'G1 and G2 phases are periods of:',
    options: ['Growth and preparation for division', 'DNA replication', 'Mitosis', 'Cytokinesis'],
    correctAnswer: 'A',
    explanation:
      'G1 (Gap 1) is cell growth before S phase. G2 (Gap 2) is growth and preparation for mitosis after DNA replication. S phase is DNA synthesis.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Apoptosis is:',
    options: [
      'Programmed cell death',
      'Uncontrolled cell death (necrosis)',
      'Cell division',
      'Cell differentiation',
    ],
    correctAnswer: 'A',
    explanation:
      'Apoptosis is controlled cell suicide important in development and maintaining tissue homeostasis. Unlike necrosis, it does not cause inflammation.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Histones are proteins associated with:',
    options: [
      'DNA packaging in eukaryotes',
      'Protein synthesis',
      'Cell division',
      'Membrane transport',
    ],
    correctAnswer: 'A',
    explanation:
      'Histones are basic proteins (H1, H2A, H2B, H3, H4) that help package DNA into nucleosomes and chromatin. Prokaryotes lack histones (have HU proteins).',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== GENETICS - MORE ==========
  {
    topic: 'Genetics and Evolution',
    question: 'Test cross is used to determine:',
    options: [
      'Genotype of dominant phenotype individual',
      'Phenotype',
      'Chromosome number',
      'Gene location',
    ],
    correctAnswer: 'A',
    explanation:
      'Test cross (crossing with homozygous recessive) reveals genotype. If all offspring are dominant, parent was homozygous. If 1:1 ratio, parent was heterozygous.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Duplicate genes modify the 9:3:3:1 ratio to:',
    options: ['15:1', '9:7', '12:3:1', '13:3'],
    correctAnswer: 'A',
    explanation:
      'In duplicate gene interaction, two genes have same effect. A_B_, A_bb, aaB_ all produce same phenotype (15), only aabb is different (1).',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Co-dominance is seen in:',
    options: ['ABO blood group', 'Height in pea plants', 'Seed color in pea', 'Eye color'],
    correctAnswer: 'A',
    explanation:
      'In ABO system, IA and IB are codominant - both express in AB blood group. Neither masks the other. Dominance is seen in Rh factor (Rh+ dominant over Rh-).',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Down syndrome is due to:',
    options: ['Trisomy of chromosome 21', 'Monosomy of X', 'Trisomy of X', 'Trisomy of 18'],
    correctAnswer: 'A',
    explanation:
      'Down syndrome (47,+21) results from non-disjunction giving extra chromosome 21. Features: mental retardation, broad palm, epicanthic fold. Risk increases with maternal age.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Turner syndrome has karyotype:',
    options: ['45,X (monosomy X)', '47,XXY', '47,XXX', '45,Y'],
    correctAnswer: 'A',
    explanation:
      'Turner syndrome females have 45,X (one X missing). Features: short stature, webbed neck, infertility. Klinefelter (47,XXY) and Triple X (47,XXX) are trisomies.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Sickle cell anemia is caused by:',
    options: [
      'Point mutation in beta-globin gene',
      'Deletion mutation',
      'Chromosomal aberration',
      'Trisomy',
    ],
    correctAnswer: 'A',
    explanation:
      'Single nucleotide change (GAG to GTG) replaces glutamic acid with valine at position 6 of beta-globin. RBCs become sickle-shaped under low oxygen.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Chargaffs rule states that:',
    options: [
      'A=T and G=C in double-stranded DNA',
      'A=G and T=C',
      'All bases are equal',
      'Purines equal pyrimidines times two',
    ],
    correctAnswer: 'A',
    explanation:
      'Chargaffs rule: adenine pairs with thymine (A=T), guanine with cytosine (G=C) via hydrogen bonds. Total purines (A+G) = total pyrimidines (T+C).',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Pribnow box (TATA box in prokaryotes) is found at:',
    options: ['-10 position of promoter', '+1 position', '-35 position only', 'In coding region'],
    correctAnswer: 'A',
    explanation:
      'Pribnow box (consensus: TATAAT) is at -10 position where DNA melting begins. -35 region helps RNA polymerase recognition. +1 is transcription start site.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Shine-Dalgarno sequence is:',
    options: [
      'Ribosome binding site on prokaryotic mRNA',
      'Stop codon sequence',
      'Promoter element',
      'Origin of replication',
    ],
    correctAnswer: 'A',
    explanation:
      'Shine-Dalgarno sequence (AGGAGG) is upstream of start codon in prokaryotic mRNA. It base pairs with 16S rRNA of 30S subunit for ribosome positioning.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== HUMAN PHYSIOLOGY - MORE ==========
  {
    topic: 'Human Physiology',
    question: 'Parathyroid hormone regulates blood levels of:',
    options: ['Calcium and phosphate', 'Glucose', 'Sodium', 'Potassium'],
    correctAnswer: 'A',
    explanation:
      'PTH increases blood Ca2+ by stimulating osteoclasts, increasing kidney reabsorption, and activating vitamin D. Also decreases phosphate by increasing its excretion.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Stretch receptors in lungs are stimulated during:',
    options: ['Inspiration', 'Expiration', 'Holding breath', 'Coughing'],
    correctAnswer: 'A',
    explanation:
      'Stretch receptors (Hering-Breuer reflex) detect lung expansion during inspiration and send signals to inhibit further inspiration, preventing over-inflation.',
    source: 'NCERT Class 11, Chapter 17',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Pacinian corpuscles detect:',
    options: ['Deep pressure and vibration', 'Light touch', 'Temperature', 'Pain'],
    correctAnswer: 'A',
    explanation:
      'Pacinian corpuscles are deep mechanoreceptors detecting pressure and vibration. Meissner corpuscles detect light touch. Free nerve endings sense pain and temperature.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Saltatory conduction occurs in:',
    options: [
      'Myelinated nerve fibers',
      'Unmyelinated fibers',
      'All neurons equally',
      'Muscle fibers',
    ],
    correctAnswer: 'A',
    explanation:
      'Saltatory conduction is jumping of action potential between nodes of Ranvier in myelinated fibers. It is faster and more energy-efficient than continuous conduction.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Pepsin is active at pH:',
    options: ['1.5-2.5 (acidic)', '7-8 (neutral)', '8-9 (alkaline)', '5-6 (slightly acidic)'],
    correctAnswer: 'A',
    explanation:
      'Pepsin works optimally at pH 1.5-2.5 in stomach (HCl environment). Trypsin works at pH 8. Most enzymes have specific pH optima for activity.',
    source: 'NCERT Class 11, Chapter 16',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Glucagon is antagonistic to:',
    options: ['Insulin', 'Thyroxine', 'Growth hormone', 'Cortisol'],
    correctAnswer: 'A',
    explanation:
      'Glucagon raises blood glucose (glycogenolysis, gluconeogenesis) while insulin lowers it (glucose uptake, glycogenesis). They maintain glucose homeostasis.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'The right lymphatic duct drains lymph from:',
    options: ['Right upper body quadrant', 'Entire body', 'Left body', 'Lower body'],
    correctAnswer: 'A',
    explanation:
      'Right lymphatic duct drains right arm, right thorax, and right head/neck. Thoracic duct drains the rest of body. Both empty into subclavian veins.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== PLANT PHYSIOLOGY - MORE ==========
  {
    topic: 'Plant Physiology',
    question: 'Water potential of pure water at standard conditions is:',
    options: ['Zero (0 MPa)', 'Positive', 'Negative', 'Variable'],
    correctAnswer: 'A',
    explanation:
      'Water potential of pure water at standard temperature and pressure is zero (reference point). Addition of solutes decreases water potential (negative values).',
    source: 'NCERT Class 11, Chapter 11',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Chlorosis (yellowing of leaves) is caused by deficiency of:',
    options: ['Nitrogen, magnesium, iron, or sulfur', 'Carbon only', 'Oxygen only', 'Water only'],
    correctAnswer: 'A',
    explanation:
      'Chlorosis results from reduced chlorophyll. N and Mg are chlorophyll components. Fe is needed for chlorophyll synthesis. S is needed for amino acids in chlorophyll proteins.',
    source: 'NCERT Class 11, Chapter 12',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Vernalization is:',
    options: [
      'Cold treatment to induce flowering',
      'Heat treatment',
      'Light treatment',
      'Hormone treatment',
    ],
    correctAnswer: 'A',
    explanation:
      'Vernalization is low temperature treatment (0-5C) required by some plants (wheat, biennials) for flowering. It affects genes controlling flowering.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Florigen is the hypothetical:',
    options: ['Flowering hormone', 'Growth hormone', 'Rooting hormone', 'Stress hormone'],
    correctAnswer: 'A',
    explanation:
      'Florigen is the proposed flowering stimulus produced in leaves and transported to shoot apex. FT protein is now considered the molecular identity of florigen.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'In cyclic photophosphorylation:',
    options: [
      'Only PS I is involved and only ATP is produced',
      'Both PS I and II are involved',
      'NADPH is produced',
      'Oxygen is evolved',
    ],
    correctAnswer: 'A',
    explanation:
      'Cyclic photophosphorylation involves only PS I. Electrons cycle back to P700 via cytochrome complex, generating ATP but no NADPH or O2. Occurs under low NADP+.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'The compensation point is when:',
    options: [
      'Rate of photosynthesis equals respiration',
      'Photosynthesis is maximum',
      'Respiration is maximum',
      'No gas exchange occurs',
    ],
    correctAnswer: 'A',
    explanation:
      'At compensation point, CO2 fixed by photosynthesis equals CO2 released by respiration. Net gas exchange is zero. Above this, net photosynthesis occurs.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== REPRODUCTION - MORE ==========
  {
    topic: 'Reproduction',
    question: 'Leydig cells produce:',
    options: ['Testosterone', 'Sperms', 'FSH', 'LH'],
    correctAnswer: 'A',
    explanation:
      'Leydig cells (interstitial cells) in testes produce testosterone under LH stimulation. Sertoli cells support spermatogenesis. FSH and LH are pituitary hormones.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Implantation of blastocyst occurs in:',
    options: ['Endometrium of uterus', 'Fallopian tube', 'Ovary', 'Cervix'],
    correctAnswer: 'A',
    explanation:
      'Blastocyst implants in endometrium 6-7 days after fertilization. Trophoblast invades endometrium. Ectopic implantation in fallopian tube is dangerous.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Colostrum is rich in:',
    options: ['Antibodies (IgA)', 'Fat', 'Carbohydrates', 'Minerals'],
    correctAnswer: 'A',
    explanation:
      'Colostrum (first milk) is rich in IgA antibodies providing passive immunity to newborn. It is low in fat compared to mature milk but high in proteins.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Menstrual cycle is regulated by:',
    options: [
      'FSH, LH, estrogen, and progesterone',
      'Only estrogen',
      'Only progesterone',
      'Only FSH',
    ],
    correctAnswer: 'A',
    explanation:
      'Menstrual cycle involves FSH (follicle growth), LH (ovulation), estrogen (follicular phase, endometrium), progesterone (luteal phase, endometrium maintenance).',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Apomixis is:',
    options: [
      'Asexual seed formation',
      'Sexual reproduction',
      'Vegetative propagation',
      'Cross pollination',
    ],
    correctAnswer: 'A',
    explanation:
      'Apomixis is asexual reproduction through seeds without meiosis or fertilization. Embryo develops from unfertilized egg (diploid) or nucellar cells. Found in Citrus, mango.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== ECOLOGY - MORE ==========
  {
    topic: 'Ecology',
    question: 'The ecological pyramid that is always upright is:',
    options: ['Pyramid of energy', 'Pyramid of numbers', 'Pyramid of biomass', 'All pyramids'],
    correctAnswer: 'A',
    explanation:
      'Pyramid of energy is always upright because energy decreases at each trophic level (10% rule). Pyramids of numbers and biomass can be inverted in some ecosystems.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'R-selected species are characterized by:',
    options: [
      'High reproductive rate, short lifespan',
      'Low reproductive rate, long lifespan',
      'Large body size',
      'Extensive parental care',
    ],
    correctAnswer: 'A',
    explanation:
      'R-selected species (insects, bacteria) have many small offspring, minimal parental care, short lifespan. K-selected (elephants) have few large offspring with parental care.',
    source: 'NCERT Class 12, Chapter 13',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Competitive exclusion principle states that:',
    options: [
      'Two species cannot occupy same ecological niche indefinitely',
      'Competition always leads to extinction',
      'All species compete equally',
      'Niche cannot be shared',
    ],
    correctAnswer: 'A',
    explanation:
      'Gauses principle: complete competitors cannot coexist. One species will outcompete and exclude the other. Species coexist by niche differentiation.',
    source: 'NCERT Class 12, Chapter 13',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Eutrophication is caused by:',
    options: [
      'Nutrient enrichment (N, P) in water bodies',
      'Acid rain',
      'Heavy metals',
      'Oil spills',
    ],
    correctAnswer: 'A',
    explanation:
      'Eutrophication: excess nutrients cause algal blooms, then decomposition depletes oxygen (hypoxia), killing fish. Agricultural runoff and sewage are major causes.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Keystone species are:',
    options: [
      'Species with disproportionately large impact on ecosystem',
      'Most abundant species',
      'Largest species',
      'Endemic species',
    ],
    correctAnswer: 'A',
    explanation:
      'Keystone species have impact greater than their abundance suggests. Sea otters (control sea urchins), wolves (trophic cascade), fig trees (food source) are examples.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Anthropogenic extinction is caused by:',
    options: ['Human activities', 'Natural disasters', 'Climate change only', 'Disease outbreaks'],
    correctAnswer: 'A',
    explanation:
      'Anthropogenic (human-caused) extinction results from habitat destruction, overexploitation, pollution, invasive species introduction. Current extinction rate is 100-1000x background.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== BIOTECHNOLOGY - MORE ==========
  {
    topic: 'Biotechnology',
    question: 'Sticky ends produced by restriction enzymes are useful because:',
    options: [
      'They allow easy joining of DNA fragments',
      'They are easier to cut',
      'They prevent DNA degradation',
      'They increase gene expression',
    ],
    correctAnswer: 'A',
    explanation:
      'Sticky ends (cohesive ends) have single-stranded overhangs that base pair with complementary sequences, facilitating ligation of foreign DNA to vector.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Insertional inactivation is used for:',
    options: [
      'Selection of recombinants',
      'DNA amplification',
      'Protein purification',
      'Gene expression',
    ],
    correctAnswer: 'A',
    explanation:
      'In insertional inactivation, foreign DNA inserted into a gene (like lacZ) inactivates it. Recombinants form white colonies (no beta-galactosidase), non-recombinants form blue.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Plasmids are:',
    options: [
      'Extra-chromosomal circular DNA in bacteria',
      'Part of chromosome',
      'Found only in eukaryotes',
      'Linear DNA',
    ],
    correctAnswer: 'A',
    explanation:
      'Plasmids are small, circular, self-replicating DNA molecules in bacteria. They carry genes like antibiotic resistance. Used as cloning vectors in rDNA technology.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Bioreactors are used for:',
    options: [
      'Large-scale production of recombinant products',
      'DNA sequencing',
      'PCR only',
      'Gel electrophoresis',
    ],
    correctAnswer: 'A',
    explanation:
      'Bioreactors provide optimal conditions (temperature, pH, oxygen) for large-scale growth of microorganisms producing recombinant proteins like insulin, vaccines.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'RNA interference (RNAi) is used for:',
    options: ['Gene silencing', 'Gene amplification', 'Gene transfer', 'Protein synthesis'],
    correctAnswer: 'A',
    explanation:
      'RNAi uses double-stranded RNA to silence specific genes by triggering degradation of complementary mRNA. Used in research and potential gene therapy.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== DIVERSITY - MORE ==========
  {
    topic: 'Diversity in Living World',
    question: 'Heterocysts in cyanobacteria are specialized for:',
    options: ['Nitrogen fixation', 'Photosynthesis', 'Reproduction', 'Storage'],
    correctAnswer: 'A',
    explanation:
      'Heterocysts are thick-walled, non-photosynthetic cells that fix nitrogen. They lack PS II (no O2 production) and protect oxygen-sensitive nitrogenase enzyme.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Mycoplasma lacks:',
    options: ['Cell wall', 'Cell membrane', 'Ribosomes', 'DNA'],
    correctAnswer: 'A',
    explanation:
      'Mycoplasma (PPLO) are smallest self-replicating organisms lacking cell wall. They have cell membrane with sterols. Resistant to penicillin. Cause atypical pneumonia.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Pteridophytes are called first land plants with:',
    options: ['Vascular tissue (xylem and phloem)', 'Seeds', 'Flowers', 'Fruits'],
    correctAnswer: 'A',
    explanation:
      'Pteridophytes were first plants with true vascular tissue (tracheophytes). This allowed them to grow taller and colonize land more successfully than bryophytes.',
    source: 'NCERT Class 11, Chapter 3',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Open circulatory system is found in:',
    options: ['Arthropods and most molluscs', 'Annelids', 'Chordates', 'Echinoderms'],
    correctAnswer: 'A',
    explanation:
      'Open circulation: blood (hemolymph) flows through open spaces (sinuses/hemocoel), not confined to vessels. Found in arthropods, most molluscs. Cephalopods have closed system.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Metameric segmentation is characteristic of:',
    options: ['Annelids', 'Nematodes', 'Platyhelminthes', 'Cnidarians'],
    correctAnswer: 'A',
    explanation:
      'Metamerism is serial repetition of body segments, each with similar structures. Well-developed in annelids (earthworm segments). Modified in arthropods.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Notochord is present in all:',
    options: [
      'Chordates at some stage of life',
      'Vertebrates only',
      'Invertebrates only',
      'Mammals only',
    ],
    correctAnswer: 'A',
    explanation:
      'Notochord (flexible rod) is defining feature of phylum Chordata, present in embryo or throughout life. In vertebrates, largely replaced by vertebral column.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== STRUCTURAL ORGANISATION - MORE ==========
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Corm is a modified:',
    options: ['Stem', 'Root', 'Leaf', 'Flower'],
    correctAnswer: 'A',
    explanation:
      'Corm is condensed underground stem (like in Colocasia, Crocus) with food storage. Unlike bulb (fleshy leaves) or tuber (swollen stem end).',
    source: 'NCERT Class 11, Chapter 5',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Phloem loading involves:',
    options: [
      'Active transport of sucrose into sieve tubes',
      'Passive diffusion',
      'Osmosis',
      'Facilitated diffusion',
    ],
    correctAnswer: 'A',
    explanation:
      'Sucrose is actively loaded into sieve elements at source (leaves) using ATP and carrier proteins. This creates pressure that drives mass flow to sinks.',
    source: 'NCERT Class 11, Chapter 11',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Companion cells are associated with:',
    options: ['Sieve tubes in phloem', 'Vessels in xylem', 'Tracheids', 'Fibers'],
    correctAnswer: 'A',
    explanation:
      'Companion cells are closely connected to sieve tube elements via plasmodesmata. They control sieve tube function as mature sieve tubes lack nuclei.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Heartwood differs from sapwood in:',
    options: [
      'Being dead, darker, and nonfunctional in conduction',
      'Actively conducting water',
      'Being lighter in color',
      'Having more vessels',
    ],
    correctAnswer: 'A',
    explanation:
      'Heartwood is older, inner wood with dead elements, deposited tannins (dark color), and no conduction. Sapwood is outer, living, functional wood conducting water.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Neurons are the longest cells in:',
    options: ['Human body', 'Plants', 'Bacteria', 'Fungi'],
    correctAnswer: 'A',
    explanation:
      'Neurons can be over 1 meter long (sciatic nerve from spinal cord to foot). Cell body is in spinal cord but axon extends to muscles.',
    source: 'NCERT Class 11, Chapter 7',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== HUMAN WELFARE - MORE ==========
  {
    topic: 'Biology and Human Welfare',
    question: 'Retroviruses like HIV have:',
    options: [
      'RNA genome and reverse transcriptase',
      'DNA genome only',
      'Double-stranded RNA',
      'No genetic material',
    ],
    correctAnswer: 'A',
    explanation:
      'Retroviruses have RNA genome that is reverse transcribed to DNA by reverse transcriptase. This DNA integrates into host genome (provirus). HIV attacks CD4+ T cells.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Autoimmune diseases are caused by:',
    options: ['Immune system attacking own body cells', 'Bacteria', 'Viruses only', 'Parasites'],
    correctAnswer: 'A',
    explanation:
      'In autoimmune diseases, immune system fails self-tolerance and attacks own tissues. Examples: rheumatoid arthritis, lupus, type 1 diabetes, multiple sclerosis.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Morphine is obtained from:',
    options: [
      'Papaver somniferum (opium poppy)',
      'Cannabis',
      'Erythroxylum coca',
      'Coffea arabica',
    ],
    correctAnswer: 'A',
    explanation:
      'Morphine (opioid) is from opium poppy latex. Cannabis yields marijuana. Coca yields cocaine. Coffee contains caffeine. All are psychoactive substances.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Citric acid is commercially produced using:',
    options: ['Aspergillus niger (fungus)', 'Lactobacillus', 'Acetobacter', 'Saccharomyces'],
    correctAnswer: 'A',
    explanation:
      'Aspergillus niger is used for industrial citric acid production through fermentation. Lactobacillus makes lactic acid. Acetobacter makes acetic acid.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'BOD of clean water should be less than:',
    options: ['5 ppm', '17 ppm', '25 ppm', '50 ppm'],
    correctAnswer: 'A',
    explanation:
      'Clean water has BOD below 5 ppm. Polluted water has BOD above 17 ppm. Higher BOD indicates more organic pollution and oxygen depletion.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== ADDITIONAL QUESTIONS ==========
  {
    topic: 'Cell Structure and Function',
    question: 'Aneuploidy refers to:',
    options: [
      'Abnormal number of chromosomes (2n+1 or 2n-1)',
      'Multiple sets of chromosomes',
      'Normal chromosome number',
      'Deletion of gene',
    ],
    correctAnswer: 'A',
    explanation:
      'Aneuploidy is gain (trisomy 2n+1) or loss (monosomy 2n-1) of individual chromosomes due to non-disjunction. Polyploidy is having extra complete sets (3n, 4n).',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Speciation without geographic isolation is called:',
    options: [
      'Sympatric speciation',
      'Allopatric speciation',
      'Peripatric speciation',
      'Parapatric speciation',
    ],
    correctAnswer: 'A',
    explanation:
      'Sympatric speciation occurs in same area through reproductive isolation (polyploidy, habitat differentiation, behavioral isolation). Allopatric requires geographic barrier.',
    source: 'NCERT Class 12, Chapter 7',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Human Physiology',
    question: 'ACE inhibitors are used to treat:',
    options: ['Hypertension', 'Diabetes', 'Asthma', 'Infections'],
    correctAnswer: 'A',
    explanation:
      'ACE inhibitors block angiotensin-converting enzyme, reducing angiotensin II and aldosterone. This lowers blood pressure by reducing vasoconstriction and sodium retention.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'CAM plants open stomata at:',
    options: ['Night', 'Day', 'Continuously', 'Never'],
    correctAnswer: 'A',
    explanation:
      'CAM plants (cacti, succulents) open stomata at night when evaporation is low. CO2 is fixed as malate, stored, and released for Calvin cycle during day when stomata close.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Reproduction',
    question: 'Vasectomy involves cutting of:',
    options: ['Vas deferens', 'Fallopian tubes', 'Urethra', 'Epididymis'],
    correctAnswer: 'A',
    explanation:
      'Vasectomy (male sterilization) cuts and ties vas deferens, preventing sperm from reaching ejaculate. Tubectomy in females blocks fallopian tubes.',
    source: 'NCERT Class 12, Chapter 4',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Edge effect refers to:',
    options: [
      'Greater species diversity at habitat boundaries',
      'Species loss at edges',
      'Migration at edges',
      'Reduced diversity at edges',
    ],
    correctAnswer: 'A',
    explanation:
      'Edge effect: species from both habitats plus edge specialists increase diversity at boundaries. However, edges can also harbor invasive species and increase predation.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Electroporation is used for:',
    options: [
      'Introducing DNA into cells using electric pulses',
      'Separating DNA fragments',
      'Amplifying DNA',
      'Sequencing DNA',
    ],
    correctAnswer: 'A',
    explanation:
      'Electroporation uses brief electric pulses to create transient pores in cell membrane, allowing DNA entry. Used for transformation of bacteria, plant, and animal cells.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Deuteromycetes are called imperfect fungi because:',
    options: [
      'Sexual reproduction stage is unknown',
      'They lack cell wall',
      'They lack mycelium',
      'They are unicellular',
    ],
    correctAnswer: 'A',
    explanation:
      'Deuteromycetes (Fungi Imperfecti) lack known sexual reproduction (perfect stage). They reproduce only asexually by conidia. Many are reclassified when sexual stage is discovered.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
]

async function generateHardQuestions() {
  console.log('Starting HARD question generation (Batch 4 - Final)...\n')

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
  let errors = 0

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

      if (inserted % 20 === 0) {
        console.log(`Inserted ${inserted} questions...`)
      }
    } catch (error) {
      errors++
    }
  }

  console.log(`\n========== Summary ==========`)
  console.log(`Total: ${hardQuestions.length}`)
  console.log(`Inserted: ${inserted}`)
  console.log(`Duplicates: ${duplicates}`)
  console.log(`Errors: ${errors}`)

  const hardCount = await prisma.questions.count({
    where: { difficulty: 'HARD', isActive: true },
  })
  console.log(`\nTotal HARD questions in database: ${hardCount}`)

  if (hardCount >= 500) {
    console.log('\n TARGET REACHED: 500+ HARD questions!')
  }
}

generateHardQuestions()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
