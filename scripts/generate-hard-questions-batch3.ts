/**
 * Generate HARD difficulty NEET Biology questions - Batch 3
 * More application-based and exception questions
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
  // ========== CELL BIOLOGY - APPLICATION ==========
  {
    topic: 'Cell Structure and Function',
    question: 'A drug that blocks ATP synthesis would most directly affect:',
    options: ['Active transport across membranes', 'Facilitated diffusion', 'Osmosis', 'Simple diffusion'],
    correctAnswer: 'A',
    explanation: 'Active transport requires ATP to move substances against concentration gradient. Diffusion and osmosis are passive processes not requiring ATP.',
    source: 'NCERT Class 11, Chapter 11',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'If all mitochondria in a cell are destroyed, which process would be most affected?',
    options: ['Aerobic respiration', 'Glycolysis', 'Protein synthesis', 'DNA replication'],
    correctAnswer: 'A',
    explanation: 'Aerobic respiration (Krebs cycle, ETC) occurs in mitochondria. Glycolysis occurs in cytoplasm and would continue. Protein synthesis uses ribosomes.',
    source: 'NCERT Class 11, Chapter 14',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Lysosomes are absent in:',
    options: ['Red blood cells', 'White blood cells', 'Liver cells', 'Kidney cells'],
    correctAnswer: 'A',
    explanation: 'Mature RBCs lack nucleus and all organelles including lysosomes, mitochondria, and ER. They rely on anaerobic glycolysis for energy.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Nucleolus is the site of:',
    options: ['rRNA synthesis and ribosome assembly', 'mRNA synthesis', 'DNA replication', 'Protein synthesis'],
    correctAnswer: 'A',
    explanation: 'Nucleolus is the factory for ribosome production. rRNA genes are transcribed and ribosomal subunits are assembled here before export to cytoplasm.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'The process by which cells engulf large particles is called:',
    options: ['Phagocytosis', 'Pinocytosis', 'Exocytosis', 'Osmosis'],
    correctAnswer: 'A',
    explanation: 'Phagocytosis (cell eating) is engulfment of large particles like bacteria. Pinocytosis is cell drinking (fluids). Both are forms of endocytosis. Exocytosis is secretion.',
    source: 'NCERT Class 11, Chapter 11',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== GENETICS - EXCEPTIONS ==========
  {
    topic: 'Genetics and Evolution',
    question: 'Which is an exception to Mendels law of independent assortment?',
    options: ['Linkage', 'Dominance', 'Segregation', 'Multiple alleles'],
    correctAnswer: 'A',
    explanation: 'Linked genes on same chromosome do not assort independently, violating the law. Crossing over can separate linked genes partially.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Which amino acid has only one codon?',
    options: ['Methionine (AUG) and Tryptophan (UGG)', 'Leucine', 'Serine', 'Arginine'],
    correctAnswer: 'A',
    explanation: 'Methionine (AUG) and tryptophan (UGG) are coded by single codons. Other amino acids have multiple codons (degeneracy). Leucine, serine, arginine have 6 codons each.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'DNA replication is called semiconservative because:',
    options: ['Each new DNA has one old and one new strand', 'Half the DNA is conserved', 'Only half the bases are replicated', 'Replication is partially accurate'],
    correctAnswer: 'A',
    explanation: 'In semiconservative replication, parental strands separate and each serves as template. Each daughter molecule has one parental (old) and one new strand. Proved by Meselson-Stahl.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Wobble hypothesis explains:',
    options: ['Degeneracy of genetic code', 'Non-overlapping nature of code', 'Universality of code', 'Commaless nature of code'],
    correctAnswer: 'A',
    explanation: 'Wobble hypothesis (Crick) explains how single tRNA can recognize multiple codons. The third base pairing is flexible (wobble), allowing fewer tRNAs for 61 sense codons.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Jumping genes were discovered by:',
    options: ['Barbara McClintock', 'Jacob and Monod', 'Watson and Crick', 'Beadle and Tatum'],
    correctAnswer: 'A',
    explanation: 'Barbara McClintock discovered transposons (jumping genes) in maize in 1940s. She received Nobel Prize in 1983. Transposons can move within genome affecting gene expression.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Which of the following shows cytoplasmic inheritance?',
    options: ['Mitochondrial DNA', 'Autosomal genes', 'X-linked genes', 'Y-linked genes'],
    correctAnswer: 'A',
    explanation: 'Mitochondrial DNA (and chloroplast DNA) shows maternal inheritance as cytoplasm comes mainly from egg. Examples: Leber hereditary optic neuropathy, MELAS syndrome.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== HUMAN PHYSIOLOGY - APPLICATION ==========
  {
    topic: 'Human Physiology',
    question: 'A person with damaged cerebellum would have difficulty in:',
    options: ['Maintaining posture and balance', 'Regulating body temperature', 'Controlling heart rate', 'Processing emotions'],
    correctAnswer: 'A',
    explanation: 'Cerebellum controls motor coordination, posture, balance, and fine movements. Hypothalamus regulates temperature. Medulla controls heart rate. Limbic system processes emotions.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Addisons disease is caused by:',
    options: ['Hyposecretion of adrenal cortex hormones', 'Hypersecretion of growth hormone', 'Hyposecretion of thyroid hormones', 'Hypersecretion of insulin'],
    correctAnswer: 'A',
    explanation: 'Addisons disease results from adrenal cortex insufficiency (low cortisol, aldosterone). Symptoms: weakness, weight loss, hyperpigmentation, low BP. Cushings is hypersecretion.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Jaundice is caused by accumulation of:',
    options: ['Bilirubin', 'Biliverdin', 'Hemoglobin', 'Myoglobin'],
    correctAnswer: 'A',
    explanation: 'Jaundice (yellow coloration) is due to excess bilirubin from hemoglobin breakdown. Caused by liver disease, bile duct obstruction, or excessive RBC destruction.',
    source: 'NCERT Class 11, Chapter 16',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Which vitamin deficiency causes scurvy?',
    options: ['Vitamin C', 'Vitamin A', 'Vitamin D', 'Vitamin K'],
    correctAnswer: 'A',
    explanation: 'Vitamin C (ascorbic acid) deficiency causes scurvy: bleeding gums, poor wound healing, joint pain. Vitamin C is essential for collagen synthesis.',
    source: 'NCERT Class 11, Chapter 16',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Night blindness is caused by deficiency of:',
    options: ['Vitamin A (retinol)', 'Vitamin B12', 'Vitamin C', 'Vitamin E'],
    correctAnswer: 'A',
    explanation: 'Vitamin A deficiency affects rhodopsin regeneration in rod cells, causing night blindness (nyctalopia). Severe deficiency leads to xerophthalmia and keratomalacia.',
    source: 'NCERT Class 11, Chapter 16',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Rh incompatibility during pregnancy can cause:',
    options: ['Erythroblastosis fetalis', 'Hemophilia', 'Sickle cell anemia', 'Thalassemia'],
    correctAnswer: 'A',
    explanation: 'Erythroblastosis fetalis occurs when Rh- mother carries Rh+ fetus. Maternal anti-Rh antibodies attack fetal RBCs. Prevented by Rh immunoglobulin (RhoGAM) injection.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== PLANT PHYSIOLOGY - APPLICATION ==========
  {
    topic: 'Plant Physiology',
    question: 'If a plant is kept in red light followed by far-red light, flowering in short day plants is:',
    options: ['Promoted', 'Inhibited', 'Unaffected', 'First promoted then inhibited'],
    correctAnswer: 'A',
    explanation: 'Far-red light converts Pfr back to Pr. Short day plants need long uninterrupted darkness (low Pfr). Red light followed by far-red mimics continuous darkness, promoting flowering.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Photosystem I has reaction center:',
    options: ['P700', 'P680', 'P870', 'P840'],
    correctAnswer: 'A',
    explanation: 'PS I has P700 (absorbs 700 nm light). PS II has P680 (absorbs 680 nm). P870 is in purple bacteria, P840 in green sulfur bacteria.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Which element is a constituent of chlorophyll?',
    options: ['Magnesium', 'Iron', 'Copper', 'Zinc'],
    correctAnswer: 'A',
    explanation: 'Chlorophyll has Mg2+ at center of porphyrin ring. Iron is in cytochromes and ferredoxin. Copper is in plastocyanin. Zinc is in carbonic anhydrase.',
    source: 'NCERT Class 11, Chapter 12',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Root nodules in legumes contain:',
    options: ['Rhizobium bacteria', 'Azotobacter', 'Nitrosomonas', 'Nitrobacter'],
    correctAnswer: 'A',
    explanation: 'Rhizobium forms symbiotic association with legume roots, fixes N2 in nodules using nitrogenase. Azotobacter is free-living. Nitrosomonas and Nitrobacter are nitrifying bacteria.',
    source: 'NCERT Class 11, Chapter 12',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Which hormone delays senescence?',
    options: ['Cytokinins', 'Abscisic acid', 'Ethylene', 'Salicylic acid'],
    correctAnswer: 'A',
    explanation: 'Cytokinins delay senescence by promoting cell division and chlorophyll retention. ABA and ethylene promote senescence and abscission.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== REPRODUCTION - APPLICATION ==========
  {
    topic: 'Reproduction',
    question: 'Emergency contraceptive pills work primarily by:',
    options: ['Preventing ovulation or implantation', 'Killing sperm', 'Blocking fallopian tubes', 'Thickening endometrium'],
    correctAnswer: 'A',
    explanation: 'Emergency pills (levonorgestrel) mainly prevent or delay ovulation. If taken after ovulation, they may prevent implantation by affecting endometrium.',
    source: 'NCERT Class 12, Chapter 4',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Amniocentesis is used to detect:',
    options: ['Chromosomal abnormalities in fetus', 'Mothers blood group', 'Uterine infections', 'Hormonal imbalance'],
    correctAnswer: 'A',
    explanation: 'Amniocentesis analyzes amniotic fluid cells for chromosomal abnormalities (Down syndrome, etc.) and genetic disorders. Done in second trimester.',
    source: 'NCERT Class 12, Chapter 4',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Parthenocarpy is:',
    options: ['Fruit development without fertilization', 'Seed development without fertilization', 'Multiple embryo formation', 'Vegetative propagation'],
    correctAnswer: 'A',
    explanation: 'Parthenocarpic fruits develop without fertilization and are seedless (banana, grapes). Can be induced by auxins and gibberellins. Apomixis is seed formation without fertilization.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'MTP is legal in India up to:',
    options: ['20 weeks (24 weeks in special cases)', '12 weeks', '8 weeks', '28 weeks'],
    correctAnswer: 'A',
    explanation: 'Medical Termination of Pregnancy Act allows abortion up to 20 weeks (extended to 24 weeks for special categories in 2021 amendment) under medical supervision.',
    source: 'NCERT Class 12, Chapter 4',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'GIFT involves transfer of:',
    options: ['Gametes into fallopian tube', 'Zygote into fallopian tube', 'Embryo into uterus', 'Sperm into uterus'],
    correctAnswer: 'A',
    explanation: 'GIFT (Gamete Intra Fallopian Transfer) transfers collected gametes into fallopian tube for fertilization in vivo. ZIFT transfers zygote. IUI transfers sperm into uterus.',
    source: 'NCERT Class 12, Chapter 4',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== ECOLOGY - APPLICATION ==========
  {
    topic: 'Ecology',
    question: 'Biological oxygen demand (BOD) is a measure of:',
    options: ['Organic pollution in water', 'Dissolved oxygen', 'Industrial effluents', 'Acidity of water'],
    correctAnswer: 'A',
    explanation: 'BOD measures oxygen required by microbes to decompose organic matter. High BOD indicates high organic pollution. Clean water has BOD less than 5 ppm.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Red data book contains list of:',
    options: ['Endangered species', 'All known species', 'Extinct species only', 'Endemic species only'],
    correctAnswer: 'A',
    explanation: 'Red Data Book (IUCN Red List) lists endangered, vulnerable, and threatened species. Categories: Extinct, Critically Endangered, Endangered, Vulnerable, Near Threatened, Least Concern.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'The base of ecological pyramid is formed by:',
    options: ['Producers', 'Primary consumers', 'Secondary consumers', 'Decomposers'],
    correctAnswer: 'A',
    explanation: 'Ecological pyramids have producers at base as they form the first trophic level. Energy flows from producers to consumers. Pyramid may be of numbers, biomass, or energy.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Species richness is highest in:',
    options: ['Tropics near equator', 'Temperate regions', 'Polar regions', 'Mountain tops'],
    correctAnswer: 'A',
    explanation: 'Latitudinal gradient: biodiversity decreases from equator to poles. Tropics have stable climate, high solar energy, longer evolutionary time for speciation.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Sacred groves are examples of:',
    options: ['In-situ conservation', 'Ex-situ conservation', 'Artificial ecosystems', 'Botanical gardens'],
    correctAnswer: 'A',
    explanation: 'Sacred groves are forest patches protected by local communities for religious reasons. They represent traditional in-situ conservation protecting biodiversity.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== BIOTECHNOLOGY - APPLICATION ==========
  {
    topic: 'Biotechnology',
    question: 'Southern blotting is used for detecting:',
    options: ['DNA', 'RNA', 'Proteins', 'Lipids'],
    correctAnswer: 'A',
    explanation: 'Southern blotting (Edwin Southern) detects specific DNA sequences using labeled probes. Northern blotting is for RNA. Western blotting is for proteins.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'DNA fingerprinting is based on:',
    options: ['VNTR (Variable Number Tandem Repeats)', 'Coding sequences', 'Introns only', 'Promoter regions'],
    correctAnswer: 'A',
    explanation: 'DNA fingerprinting uses VNTR/STR polymorphisms - repetitive DNA sequences that vary between individuals. Used in forensics, paternity testing, and identification.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Transgenic organisms contain:',
    options: ['Foreign genes from another species', 'Mutated versions of own genes', 'Multiple copies of own genes', 'Deleted genes'],
    correctAnswer: 'A',
    explanation: 'Transgenic organisms have foreign DNA integrated into genome. Examples: Bt cotton (bacterial gene), Golden rice (genes from daffodil and bacteria).',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Insulin was first produced by rDNA technology using:',
    options: ['E. coli bacteria', 'Yeast', 'Mammalian cells', 'Plant cells'],
    correctAnswer: 'A',
    explanation: 'Human insulin (Humulin) was first produced in E. coli by Eli Lilly in 1982 using recombinant DNA technology. It replaced insulin from pig/cow pancreas.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Gene therapy involves:',
    options: ['Correction of genetic defect by introducing functional gene', 'Removal of defective gene', 'Protein replacement', 'Hormone therapy'],
    correctAnswer: 'A',
    explanation: 'Gene therapy introduces functional copies of defective gene into patients cells. First approved for ADA-SCID. Can be somatic (not inherited) or germline (heritable).',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== DIVERSITY - EXCEPTIONS ==========
  {
    topic: 'Diversity in Living World',
    question: 'Which bryophyte has true roots?',
    options: ['None - bryophytes have rhizoids', 'Funaria', 'Riccia', 'Marchantia'],
    correctAnswer: 'A',
    explanation: 'Bryophytes lack true roots, stems, and leaves. They have rhizoids for anchoring and limited absorption. Absence of vascular tissue limits their size.',
    source: 'NCERT Class 11, Chapter 3',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Whale is classified under:',
    options: ['Mammals (not fish)', 'Fish', 'Amphibians', 'Reptiles'],
    correctAnswer: 'A',
    explanation: 'Whales are marine mammals with lungs (not gills), give birth to live young, produce milk, have hair (sparse), and are warm-blooded. They evolved from land mammals.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Which of the following is a living fossil?',
    options: ['Ginkgo biloba', 'Pinus', 'Cycas', 'All of these'],
    correctAnswer: 'D',
    explanation: 'Living fossils are organisms that have remained virtually unchanged for millions of years. Ginkgo, Cycas, and Limulus (horseshoe crab) are examples.',
    source: 'NCERT Class 11, Chapter 3',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Prions are:',
    options: ['Infectious proteins', 'Small RNA viruses', 'Bacteria', 'Fungi'],
    correctAnswer: 'A',
    explanation: 'Prions are misfolded proteins that cause disease by inducing normal proteins to misfold. Cause mad cow disease (BSE), Creutzfeldt-Jakob disease. No nucleic acid involved.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Euglena is called plant-animal because it:',
    options: ['Has chloroplasts and can also be heterotrophic', 'Has cell wall like plants', 'Has nucleus like animals', 'Reproduces sexually'],
    correctAnswer: 'A',
    explanation: 'Euglena has chloroplasts for photosynthesis but lacks cell wall and can ingest food heterotrophically when light is unavailable. Has flagella for movement.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== STRUCTURAL ORGANISATION - APPLICATION ==========
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Secondary growth occurs in:',
    options: ['Dicots and gymnosperms', 'Monocots', 'All plants', 'Herbaceous plants only'],
    correctAnswer: 'A',
    explanation: 'Secondary growth (lateral growth) occurs in dicots and gymnosperms due to vascular cambium and cork cambium. Most monocots lack cambium and show only primary growth.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Annual rings in trees are formed due to:',
    options: ['Differential activity of vascular cambium', 'Differential photosynthesis', 'Alternating growth and dormancy', 'Formation of bark'],
    correctAnswer: 'A',
    explanation: 'Annual rings reflect seasonal cambial activity: spring wood (large vessels, light) and autumn wood (small vessels, dark). One ring typically equals one year of growth.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Guard cells differ from other epidermal cells in having:',
    options: ['Chloroplasts', 'Nucleus', 'Cell wall', 'Vacuole'],
    correctAnswer: 'A',
    explanation: 'Guard cells are the only epidermal cells with chloroplasts. They photosynthesize and produce ATP for ion pumps controlling stomatal opening and closing.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Pneumatophores are seen in:',
    options: ['Mangrove plants (Rhizophora)', 'Desert plants', 'Aquatic plants', 'Epiphytes'],
    correctAnswer: 'A',
    explanation: 'Pneumatophores are breathing roots in mangroves. They grow upward from waterlogged soil and have lenticels for gas exchange in oxygen-deficient habitat.',
    source: 'NCERT Class 11, Chapter 5',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Tendrils of pea are modifications of:',
    options: ['Leaflets', 'Stipules', 'Stem', 'Roots'],
    correctAnswer: 'A',
    explanation: 'In pea, terminal leaflets are modified into tendrils for climbing. In Passiflora, axillary buds form tendrils. In sweet potato, roots are modified for storage.',
    source: 'NCERT Class 11, Chapter 5',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== HUMAN WELFARE - APPLICATION ==========
  {
    topic: 'Biology and Human Welfare',
    question: 'BCG vaccine provides immunity against:',
    options: ['Tuberculosis', 'Typhoid', 'Cholera', 'Diphtheria'],
    correctAnswer: 'A',
    explanation: 'BCG (Bacillus Calmette-Guerin) is live attenuated vaccine against tuberculosis. TAB vaccine is for typhoid. DPT is for diphtheria, pertussis, tetanus.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Penicillin was discovered by:',
    options: ['Alexander Fleming', 'Louis Pasteur', 'Robert Koch', 'Joseph Lister'],
    correctAnswer: 'A',
    explanation: 'Alexander Fleming discovered penicillin from Penicillium notatum in 1928. Florey and Chain developed it for clinical use. It was first antibiotic (beta-lactam).',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Widal test is used for diagnosis of:',
    options: ['Typhoid fever', 'Malaria', 'Tuberculosis', 'AIDS'],
    correctAnswer: 'A',
    explanation: 'Widal test detects antibodies against Salmonella typhi (O and H antigens) in typhoid fever. Blood smear for malaria, Mantoux/ELISA for TB, ELISA/Western blot for HIV.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Statins are obtained from:',
    options: ['Monascus purpureus (fungus)', 'Streptomyces', 'Penicillium', 'Bacillus'],
    correctAnswer: 'A',
    explanation: 'Lovastatin was first obtained from Monascus purpureus. Statins inhibit HMG-CoA reductase, reducing cholesterol synthesis. Used to treat hypercholesterolemia.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Integrated pest management (IPM) includes:',
    options: ['Biological, cultural, and minimal chemical control', 'Only chemical pesticides', 'Only biological control', 'Only cultural practices'],
    correctAnswer: 'A',
    explanation: 'IPM combines various pest control methods: biological (natural enemies), cultural (crop rotation), mechanical (traps), and minimal chemical (as last resort) for sustainable management.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== MORE DIFFICULT QUESTIONS ==========
  {
    topic: 'Cell Structure and Function',
    question: 'Signal recognition particle (SRP) is involved in:',
    options: ['Targeting proteins to rough ER', 'DNA replication', 'RNA splicing', 'ATP synthesis'],
    correctAnswer: 'A',
    explanation: 'SRP recognizes signal peptide on nascent polypeptide and targets ribosome-mRNA-polypeptide complex to rough ER membrane for secretory/membrane protein synthesis.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Epigenetics involves:',
    options: ['Heritable changes without DNA sequence alteration', 'DNA mutations', 'Chromosomal aberrations', 'Gene amplification'],
    correctAnswer: 'A',
    explanation: 'Epigenetic changes (DNA methylation, histone modification) affect gene expression without changing DNA sequence. They can be inherited but are reversible.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Human Physiology',
    question: 'Troponin and tropomyosin are regulatory proteins in:',
    options: ['Muscle contraction', 'Blood clotting', 'Nerve impulse', 'Hormone action'],
    correctAnswer: 'A',
    explanation: 'Troponin binds Ca2+ and moves tropomyosin to expose myosin-binding sites on actin, enabling cross-bridge formation. This is the basis of sliding filament mechanism.',
    source: 'NCERT Class 11, Chapter 20',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Bundle sheath cells in C4 plants lack:',
    options: ['Grana in chloroplasts', 'Chloroplasts', 'Mitochondria', 'Nucleus'],
    correctAnswer: 'A',
    explanation: 'Bundle sheath chloroplasts in C4 plants are agranal (lack stacking). This prevents oxygen evolution (no PS II) near RuBisCO, minimizing photorespiration.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Reproduction',
    question: 'Endosperm in angiosperms is:',
    options: ['Triploid (3n)', 'Diploid (2n)', 'Haploid (n)', 'Tetraploid (4n)'],
    correctAnswer: 'A',
    explanation: 'Endosperm forms from triple fusion: one male gamete (n) + two polar nuclei (n + n) = triploid (3n). It provides nutrition to developing embryo.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'The formula for calculating Gross Primary Productivity is:',
    options: ['GPP = NPP + Respiration', 'GPP = NPP - Respiration', 'GPP = NPP x Respiration', 'GPP = NPP / Respiration'],
    correctAnswer: 'A',
    explanation: 'GPP (total photosynthesis) = NPP (stored as biomass) + R (used in respiration). NPP = GPP - R. NPP is available to herbivores.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'CRISPR-Cas9 is used for:',
    options: ['Genome editing', 'DNA amplification', 'Protein purification', 'RNA sequencing'],
    correctAnswer: 'A',
    explanation: 'CRISPR-Cas9 is a genome editing tool using guide RNA to direct Cas9 nuclease to specific DNA sequences for precise cutting. Revolutionary for gene therapy.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Archaea differ from bacteria in having:',
    options: ['Ether-linked membrane lipids', 'Peptidoglycan cell wall', '70S ribosomes', 'Circular DNA'],
    correctAnswer: 'A',
    explanation: 'Archaea have ether-linked lipids (not ester), lack peptidoglycan, have unique RNA polymerase. They share some features with eukaryotes. Found in extreme environments.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Cork cambium produces:',
    options: ['Cork (phellem) externally and phelloderm internally', 'Only cork', 'Only phelloderm', 'Secondary xylem and phloem'],
    correctAnswer: 'A',
    explanation: 'Cork cambium (phellogen) produces cork/phellem (dead, suberized) outward and phelloderm (living) inward. Together they form periderm. Vascular cambium produces secondary xylem/phloem.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Monoclonal antibodies are produced by:',
    options: ['Hybridoma technology', 'Transgenic animals', 'PCR', 'Gene cloning'],
    correctAnswer: 'A',
    explanation: 'Hybridoma cells (B cell + myeloma fusion) produce monoclonal antibodies - identical antibodies from single clone. Used in diagnostics, research, and therapy.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
]

async function generateHardQuestions() {
  console.log('Starting HARD question generation (Batch 3)...\n')

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

      if (inserted % 10 === 0) {
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
}

generateHardQuestions()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
