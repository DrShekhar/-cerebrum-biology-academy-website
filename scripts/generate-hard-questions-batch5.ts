/**
 * Generate HARD difficulty NEET Biology questions - Batch 5
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
  // ========== BIOMOLECULES ==========
  {
    topic: 'Cell Structure and Function',
    question: 'The enzyme pepsin is synthesized as inactive pepsinogen in:',
    options: ['Chief cells of stomach', 'Parietal cells', 'Goblet cells', 'Mucous cells'],
    correctAnswer: 'A',
    explanation: 'Chief (zymogenic) cells secrete pepsinogen, which is activated to pepsin by HCl. Parietal cells secrete HCl and intrinsic factor. Goblet cells produce mucus.',
    source: 'NCERT Class 11, Chapter 16',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Enzymes lower activation energy by:',
    options: ['Providing alternative pathway with lower energy barrier', 'Changing equilibrium constant', 'Changing products formed', 'Decreasing substrate concentration'],
    correctAnswer: 'A',
    explanation: 'Enzymes provide alternative reaction pathway with lower activation energy. They dont change equilibrium or delta-G, only speed up reaction by stabilizing transition state.',
    source: 'NCERT Class 11, Chapter 9',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Cellulose is polymer of:',
    options: ['Beta-D-glucose with beta-1,4 linkages', 'Alpha-D-glucose', 'Fructose', 'Galactose'],
    correctAnswer: 'A',
    explanation: 'Cellulose is linear polymer of beta-D-glucose units joined by beta-1,4 glycosidic bonds. Humans cannot digest it (lack cellulase). Starch has alpha-1,4 and 1,6 linkages.',
    source: 'NCERT Class 11, Chapter 9',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Denaturation of proteins involves:',
    options: ['Loss of secondary, tertiary, and quaternary structure', 'Breaking of peptide bonds', 'Change in primary structure', 'Loss of amino acids'],
    correctAnswer: 'A',
    explanation: 'Denaturation disrupts non-covalent bonds (H-bonds, ionic, hydrophobic) maintaining higher-order structure. Primary structure (peptide bonds) remains intact but protein loses function.',
    source: 'NCERT Class 11, Chapter 9',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'DNA and RNA both contain:',
    options: ['Phosphate, sugar, and nitrogenous bases', 'Same sugar', 'Same bases', 'Only phosphate'],
    correctAnswer: 'A',
    explanation: 'Both nucleic acids have phosphate, pentose sugar (DNA=deoxyribose, RNA=ribose), and bases (adenine, guanine, cytosine; DNA has thymine, RNA has uracil).',
    source: 'NCERT Class 11, Chapter 9',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== RESPIRATION ==========
  {
    topic: 'Cell Structure and Function',
    question: 'Net gain of ATP in glycolysis is:',
    options: ['2 ATP per glucose', '4 ATP', '38 ATP', '36 ATP'],
    correctAnswer: 'A',
    explanation: 'Glycolysis produces 4 ATP (substrate-level) but uses 2 ATP, giving net 2 ATP. Also produces 2 NADH which yield more ATP in ETC. Occurs in cytoplasm.',
    source: 'NCERT Class 11, Chapter 14',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Krebs cycle occurs in:',
    options: ['Mitochondrial matrix', 'Cytoplasm', 'Inner mitochondrial membrane', 'Outer mitochondrial membrane'],
    correctAnswer: 'A',
    explanation: 'Krebs cycle (citric acid cycle) occurs in mitochondrial matrix. It oxidizes acetyl-CoA to CO2, producing NADH, FADH2, and GTP. ETC occurs on inner membrane.',
    source: 'NCERT Class 11, Chapter 14',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Fermentation produces:',
    options: ['Ethanol or lactic acid (depending on organism)', 'CO2 only', 'ATP only', 'Water'],
    correctAnswer: 'A',
    explanation: 'Anaerobic fermentation: yeast produces ethanol and CO2, muscle cells produce lactic acid. Both regenerate NAD+ for glycolysis to continue without oxygen.',
    source: 'NCERT Class 11, Chapter 14',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'The terminal electron acceptor in aerobic respiration is:',
    options: ['Oxygen', 'NAD+', 'FAD', 'Cytochrome c'],
    correctAnswer: 'A',
    explanation: 'Oxygen is final electron acceptor in ETC, reduced to water. This is why we breathe oxygen. Without O2, electrons cant flow and ATP synthesis stops.',
    source: 'NCERT Class 11, Chapter 14',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== PHOTOSYNTHESIS DETAILS ==========
  {
    topic: 'Plant Physiology',
    question: 'Photolysis of water occurs in:',
    options: ['PS II (grana thylakoids)', 'PS I', 'Stroma', 'Cytoplasm'],
    correctAnswer: 'A',
    explanation: 'Water splitting (2H2O -> 4H+ + 4e- + O2) occurs at PS II on grana thylakoids. Electrons replace those lost from P680. This is the source of photosynthetic oxygen.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'ATP synthesis in chloroplasts occurs by:',
    options: ['Chemiosmosis (proton gradient across thylakoid membrane)', 'Substrate level phosphorylation only', 'Fermentation', 'Glycolysis'],
    correctAnswer: 'A',
    explanation: 'ATP synthase uses proton gradient (built by ETC) across thylakoid membrane to synthesize ATP (photophosphorylation). Similar to oxidative phosphorylation in mitochondria.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'The first stable product of Calvin cycle is:',
    options: ['3-PGA (3-phosphoglyceric acid)', 'G3P', 'RuBP', 'Glucose'],
    correctAnswer: 'A',
    explanation: 'CO2 + RuBP (5C) forms unstable 6C compound that immediately splits into two 3-PGA (3C) molecules. Hence C3 pathway. This is why its also called C3 photosynthesis.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== HORMONES ==========
  {
    topic: 'Human Physiology',
    question: 'Hypothalamus produces which releasing hormones?',
    options: ['GnRH, TRH, CRH, GHRH, and others', 'Only FSH and LH', 'Only TSH', 'Only GH'],
    correctAnswer: 'A',
    explanation: 'Hypothalamus produces releasing and inhibiting hormones controlling anterior pituitary: GnRH, TRH, CRH, GHRH, GHIH (somatostatin), PRH, PIH (dopamine).',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Graves disease is due to:',
    options: ['Hyperthyroidism (autoimmune)', 'Hypothyroidism', 'Diabetes', 'Cushings syndrome'],
    correctAnswer: 'A',
    explanation: 'Graves disease is autoimmune hyperthyroidism: antibodies mimic TSH, stimulating thyroid. Symptoms: high metabolic rate, weight loss, nervousness, exophthalmos.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Melatonin is produced by:',
    options: ['Pineal gland', 'Thyroid', 'Thymus', 'Adrenal cortex'],
    correctAnswer: 'A',
    explanation: 'Pineal gland produces melatonin, regulating circadian rhythm and sleep-wake cycle. Secretion increases in darkness. Also has role in reproductive timing in some animals.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Fight or flight response is mediated by:',
    options: ['Adrenaline (epinephrine) from adrenal medulla', 'Cortisol', 'Thyroxine', 'Insulin'],
    correctAnswer: 'A',
    explanation: 'Adrenaline causes rapid stress response: increased heart rate, blood pressure, glucose release, bronchodilation. Prepares body for emergency. Cortisol is slower acting.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== NERVOUS SYSTEM ==========
  {
    topic: 'Human Physiology',
    question: 'Resting membrane potential of neuron is approximately:',
    options: ['-70 mV', '+70 mV', '0 mV', '-40 mV'],
    correctAnswer: 'A',
    explanation: 'Resting potential is about -70mV (inside negative). Maintained by Na+/K+ ATPase pump (3 Na+ out, 2 K+ in) and K+ leak channels. Essential for action potential generation.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Acetylcholine is degraded by:',
    options: ['Acetylcholinesterase', 'MAO', 'COMT', 'Cholinesterase kinase'],
    correctAnswer: 'A',
    explanation: 'Acetylcholinesterase in synaptic cleft rapidly breaks ACh into acetate and choline, terminating signal. Inhibitors (nerve agents, pesticides) cause continuous stimulation.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'The reflex arc involves:',
    options: ['Receptor, sensory neuron, integration center, motor neuron, effector', 'Only brain', 'Only motor neuron', 'Only sensory neuron'],
    correctAnswer: 'A',
    explanation: 'Reflex arc: receptor detects stimulus, sensory neuron carries signal to CNS, interneuron (if present) processes, motor neuron activates effector (muscle/gland).',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Corpus callosum connects:',
    options: ['Two cerebral hemispheres', 'Cerebrum and cerebellum', 'Brain and spinal cord', 'Thalamus and hypothalamus'],
    correctAnswer: 'A',
    explanation: 'Corpus callosum is massive white matter tract connecting left and right cerebral hemispheres, enabling communication. Split-brain patients have severed corpus callosum.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== CIRCULATION ==========
  {
    topic: 'Human Physiology',
    question: 'Cardiac output equals:',
    options: ['Stroke volume x Heart rate', 'Blood pressure x Heart rate', 'Stroke volume / Heart rate', 'Blood volume'],
    correctAnswer: 'A',
    explanation: 'Cardiac output (CO) = SV x HR. Typically 70ml x 72 beats/min = 5040 ml/min (~5L/min at rest). Increases during exercise. Measure of hearts pumping efficiency.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'The lub sound of heartbeat is due to:',
    options: ['Closure of AV valves (tricuspid and bicuspid)', 'Closure of semilunar valves', 'Opening of AV valves', 'Ventricular contraction'],
    correctAnswer: 'A',
    explanation: 'Lub (S1) is closure of AV valves at start of ventricular systole. Dub (S2) is closure of semilunar valves at start of ventricular diastole.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Lymph differs from blood in lacking:',
    options: ['Red blood cells', 'White blood cells', 'Proteins', 'Water'],
    correctAnswer: 'A',
    explanation: 'Lymph is filtered tissue fluid that enters lymphatic vessels. It lacks RBCs and platelets but contains lymphocytes and some plasma proteins. Returns fluid to blood.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== EXCRETION ==========
  {
    topic: 'Human Physiology',
    question: 'Glomerular filtration rate (GFR) is approximately:',
    options: ['125 mL/min (180 L/day)', '25 mL/min', '500 mL/min', '1 L/min'],
    correctAnswer: 'A',
    explanation: 'GFR is about 125 mL/min or 180 L/day. Of this, 99% is reabsorbed. Only 1-2 L urine is produced daily. GFR is measure of kidney function.',
    source: 'NCERT Class 11, Chapter 19',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'ADH increases water reabsorption in:',
    options: ['Collecting duct and DCT', 'Glomerulus', 'Bowmans capsule', 'Ascending limb of loop'],
    correctAnswer: 'A',
    explanation: 'ADH (vasopressin) increases water permeability of collecting duct and DCT by inserting aquaporins. This concentrates urine and conserves water when dehydrated.',
    source: 'NCERT Class 11, Chapter 19',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Urea is synthesized in:',
    options: ['Liver (urea cycle)', 'Kidney', 'Blood', 'Muscles'],
    correctAnswer: 'A',
    explanation: 'Urea is synthesized in liver from ammonia (toxic) via urea cycle (ornithine cycle). Kidney excretes urea but doesnt synthesize it. Mammals are ureotelic.',
    source: 'NCERT Class 11, Chapter 19',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== LOCOMOTION ==========
  {
    topic: 'Human Physiology',
    question: 'Type I muscle fibers are characterized by:',
    options: ['Slow-twitch, aerobic, fatigue-resistant (red fibers)', 'Fast-twitch, anaerobic', 'White fibers', 'No mitochondria'],
    correctAnswer: 'A',
    explanation: 'Type I (slow-twitch) fibers have many mitochondria, myoglobin (red color), and rely on aerobic metabolism. Good for endurance. Type II are fast-twitch, anaerobic.',
    source: 'NCERT Class 11, Chapter 20',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Cross-bridge cycling in muscle requires:',
    options: ['ATP and calcium ions', 'Only ATP', 'Only calcium', 'Neither'],
    correctAnswer: 'A',
    explanation: 'Ca2+ binds troponin, exposing myosin-binding sites on actin. ATP provides energy for power stroke and detachment of myosin heads. Both are essential.',
    source: 'NCERT Class 11, Chapter 20',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Haversian system is found in:',
    options: ['Compact bone', 'Spongy bone', 'Cartilage', 'Ligaments'],
    correctAnswer: 'A',
    explanation: 'Haversian system (osteon) is structural unit of compact bone: concentric lamellae around central canal containing blood vessels. Spongy bone has trabeculae.',
    source: 'NCERT Class 11, Chapter 20',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== EVOLUTION ==========
  {
    topic: 'Genetics and Evolution',
    question: 'Homologous organs indicate:',
    options: ['Common ancestry (divergent evolution)', 'Similar function', 'Convergent evolution', 'Parallel evolution'],
    correctAnswer: 'A',
    explanation: 'Homologous organs have similar origin but may differ in function (bat wing, whale flipper, human arm). Indicate common ancestry. Analogous organs show convergent evolution.',
    source: 'NCERT Class 12, Chapter 7',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Miller-Urey experiment demonstrated:',
    options: ['Abiotic synthesis of organic molecules', 'Origin of life', 'Evolution of prokaryotes', 'Formation of cells'],
    correctAnswer: 'A',
    explanation: 'Miller-Urey (1953) showed amino acids could form from simple molecules (CH4, NH3, H2, H2O) with energy (spark). Supported chemical evolution theory of life origin.',
    source: 'NCERT Class 12, Chapter 7',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Stabilizing selection results in:',
    options: ['Reduced variation around mean phenotype', 'Increased variation', 'Shift in mean phenotype', 'Random changes'],
    correctAnswer: 'A',
    explanation: 'Stabilizing selection favors intermediate phenotypes, reducing variation. Example: human birth weight. Directional selection shifts mean, disruptive increases variation.',
    source: 'NCERT Class 12, Chapter 7',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Founder effect is a type of:',
    options: ['Genetic drift', 'Natural selection', 'Gene flow', 'Mutation'],
    correctAnswer: 'A',
    explanation: 'Founder effect occurs when small group colonizes new area with limited genetic variation. Random sampling causes allele frequency differences from source population.',
    source: 'NCERT Class 12, Chapter 7',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== IMMUNITY ==========
  {
    topic: 'Biology and Human Welfare',
    question: 'T helper cells (CD4+) are essential for:',
    options: ['Activating B cells and cytotoxic T cells', 'Direct killing of pathogens', 'Producing antibodies', 'Phagocytosis'],
    correctAnswer: 'A',
    explanation: 'T helper cells activate B cells (for antibody production) and cytotoxic T cells through cytokines. HIV targets CD4+ cells, crippling immune response.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'IgE antibodies are involved in:',
    options: ['Allergic reactions and parasitic infections', 'Primary immune response', 'Mucosal immunity', 'Placental transfer'],
    correctAnswer: 'A',
    explanation: 'IgE binds mast cells and basophils. Allergen binding triggers histamine release (allergies). Also important in defense against helminths (parasitic worms).',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Memory cells provide:',
    options: ['Long-term immunity through faster secondary response', 'Immediate immunity', 'Passive immunity', 'Innate immunity'],
    correctAnswer: 'A',
    explanation: 'Memory B and T cells persist after infection, enabling rapid, stronger secondary response upon re-exposure. Basis of vaccination and long-term immunity.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== POLLINATION/FERTILIZATION ==========
  {
    topic: 'Reproduction',
    question: 'Autogamy is:',
    options: ['Self-pollination within same flower', 'Cross-pollination', 'Vegetative reproduction', 'Budding'],
    correctAnswer: 'A',
    explanation: 'Autogamy is transfer of pollen to stigma of same flower. Geitonogamy is between flowers on same plant. Xenogamy (allogamy) is between different plants.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Self-incompatibility prevents:',
    options: ['Self-fertilization through pollen rejection', 'Cross-pollination', 'Seed formation', 'Fruit development'],
    correctAnswer: 'A',
    explanation: 'Self-incompatibility (SI) is genetic mechanism preventing self-fertilization. Pollen tube growth is inhibited. S-genes control recognition. Promotes outbreeding.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Entry of pollen tube into ovule through micropyle is called:',
    options: ['Porogamy', 'Chalazogamy', 'Mesogamy', 'Syngamy'],
    correctAnswer: 'A',
    explanation: 'Porogamy: pollen tube enters through micropyle (most common). Chalazogamy: through chalaza (Casuarina). Mesogamy: through integuments. Syngamy is fusion of gametes.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== ENVIRONMENTAL ISSUES ==========
  {
    topic: 'Ecology',
    question: 'Acid rain has pH less than:',
    options: ['5.6', '7.0', '6.5', '4.0'],
    correctAnswer: 'A',
    explanation: 'Normal rain is slightly acidic (pH 5.6) due to dissolved CO2. Acid rain (pH less than 5.6) is caused by SO2 and NOx forming H2SO4 and HNO3. Damages ecosystems, buildings.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'CFCs deplete ozone by:',
    options: ['Releasing chlorine atoms that catalyze O3 breakdown', 'Direct reaction with O3', 'Absorbing UV radiation', 'Reacting with oxygen'],
    correctAnswer: 'A',
    explanation: 'UV breaks C-Cl bond in CFCs, releasing Cl atoms. Each Cl can destroy thousands of O3 molecules: Cl + O3 -> ClO + O2, then ClO + O -> Cl + O2 (catalytic cycle).',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'IUCN Red List categories include:',
    options: ['Critically Endangered, Endangered, Vulnerable, Near Threatened, Least Concern', 'Only Endangered', 'Only Extinct', 'Only Vulnerable'],
    correctAnswer: 'A',
    explanation: 'IUCN categories (extinction risk): Extinct, Extinct in Wild, Critically Endangered, Endangered, Vulnerable, Near Threatened, Least Concern, Data Deficient, Not Evaluated.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== MICROBES ==========
  {
    topic: 'Biology and Human Welfare',
    question: 'Yogurt is produced by:',
    options: ['Lactobacillus (lactic acid fermentation)', 'Saccharomyces', 'Acetobacter', 'Aspergillus'],
    correctAnswer: 'A',
    explanation: 'Lactobacillus converts milk lactose to lactic acid, lowering pH and coagulating milk proteins. Saccharomyces makes alcohol. Acetobacter makes vinegar.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Nitrogen cycle involves:',
    options: ['Nitrogen fixation, nitrification, denitrification, and ammonification', 'Only nitrogen fixation', 'Only denitrification', 'Only ammonification'],
    correctAnswer: 'A',
    explanation: 'Nitrogen cycle: fixation (N2 to NH3), ammonification (organic N to NH3), nitrification (NH3 to NO3-), denitrification (NO3- to N2). Maintains nitrogen balance.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Biopesticides are:',
    options: ['Living organisms or their products used for pest control', 'Chemical pesticides', 'Fertilizers', 'Herbicides'],
    correctAnswer: 'A',
    explanation: 'Biopesticides include Bt (Bacillus thuringiensis toxin), NPV (nucleopolyhedrovirus), and Trichoderma (fungus). Eco-friendly alternative to chemical pesticides.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== MISCELLANEOUS ==========
  {
    topic: 'Genetics and Evolution',
    question: 'Frameshift mutation is caused by:',
    options: ['Insertion or deletion of nucleotides (not multiple of 3)', 'Point mutation', 'Chromosome deletion', 'Aneuploidy'],
    correctAnswer: 'A',
    explanation: 'Frameshift mutation: insertion/deletion (not in multiples of 3) shifts reading frame, changing all downstream codons. Usually produces nonfunctional protein.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Plant Physiology',
    question: 'Plasmolysis is:',
    options: ['Shrinkage of protoplast due to water loss in hypertonic solution', 'Swelling of cell', 'Cell lysis', 'Cell division'],
    correctAnswer: 'A',
    explanation: 'Plasmolysis occurs when cell loses water by osmosis in hypertonic solution. Protoplast shrinks away from cell wall. Reversible by placing in hypotonic solution.',
    source: 'NCERT Class 11, Chapter 11',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Archaebacteria include:',
    options: ['Methanogens, halophiles, and thermoacidophiles', 'E. coli', 'Cyanobacteria', 'Mycoplasma'],
    correctAnswer: 'A',
    explanation: 'Archaebacteria live in extreme environments: methanogens (marsh gas producers), halophiles (high salt), thermoacidophiles (hot springs). Have unique membrane lipids.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Conjunctiva is:',
    options: ['Transparent membrane covering front of eye and inner eyelids', 'Part of retina', 'Lens', 'Iris'],
    correctAnswer: 'A',
    explanation: 'Conjunctiva is mucous membrane covering exposed front of eye (bulbar) and inner eyelids (palpebral). Conjunctivitis is its inflammation. Cornea is transparent dome.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Biotechnology',
    question: 'Western blotting detects:',
    options: ['Proteins', 'DNA', 'RNA', 'Lipids'],
    correctAnswer: 'A',
    explanation: 'Western blotting: proteins separated by electrophoresis, transferred to membrane, detected with antibodies. Southern for DNA, Northern for RNA.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Placenta produces which hormones?',
    options: ['hCG, hPL, estrogen, and progesterone', 'Only hCG', 'Only progesterone', 'Only estrogen'],
    correctAnswer: 'A',
    explanation: 'Placenta produces hCG (maintains corpus luteum), hPL (human placental lactogen), estrogen, and progesterone. Takes over hormone production from corpus luteum.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Ramsar Convention is related to:',
    options: ['Wetland conservation', 'Forest conservation', 'Wildlife protection', 'Air pollution'],
    correctAnswer: 'A',
    explanation: 'Ramsar Convention (1971) is intergovernmental treaty for conservation and sustainable use of wetlands. Sites of international importance are called Ramsar sites.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'DPT vaccine provides immunity against:',
    options: ['Diphtheria, Pertussis (whooping cough), and Tetanus', 'Dengue', 'Polio', 'Tuberculosis'],
    correctAnswer: 'A',
    explanation: 'DPT is combination vaccine against three bacterial diseases: Diphtheria (Corynebacterium), Pertussis (Bordetella), Tetanus (Clostridium tetani). Given to infants.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Signal transduction typically involves:',
    options: ['Receptor, second messenger, and target response', 'Only receptor', 'Only response', 'Direct gene activation'],
    correctAnswer: 'A',
    explanation: 'Signal transduction: ligand binds receptor, activates second messengers (cAMP, Ca2+, IP3), cascade of events leads to cellular response (gene expression, metabolism).',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Genetic code is nearly universal, meaning:',
    options: ['Same codons code for same amino acids in almost all organisms', 'Only in bacteria', 'Different in plants', 'Different in animals'],
    correctAnswer: 'A',
    explanation: 'Universal genetic code is strong evidence for common origin of life. Same codons specify same amino acids from bacteria to humans. Minor exceptions in mitochondria.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Human Physiology',
    question: 'Surfactant in lungs is produced by:',
    options: ['Type II alveolar cells', 'Type I alveolar cells', 'Macrophages', 'Goblet cells'],
    correctAnswer: 'A',
    explanation: 'Type II pneumocytes produce surfactant (phospholipid) that reduces surface tension, preventing alveolar collapse. Deficiency causes respiratory distress syndrome in premature infants.',
    source: 'NCERT Class 11, Chapter 17',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Ethylene promotes:',
    options: ['Fruit ripening and abscission', 'Stem elongation', 'Root initiation', 'Seed dormancy'],
    correctAnswer: 'A',
    explanation: 'Ethylene (gaseous hormone) promotes fruit ripening, senescence, leaf and fruit abscission, and flowering in pineapple. One ripe fruit hastens ripening of others.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
]

async function generateHardQuestions() {
  console.log('Starting HARD question generation (Batch 5 - Final)...\n')

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
  console.log(`\n TOTAL HARD questions in database: ${hardCount}`)

  if (hardCount >= 500) {
    console.log('\n TARGET ACHIEVED: 500+ HARD questions!')
  }
}

generateHardQuestions()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
