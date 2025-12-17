/**
 * Generate HARD difficulty NEET Biology questions - Batch 2
 * Based on actual NEET PYQ patterns and NCERT content
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

// More HARD questions across all topics
const hardQuestions: HardQuestion[] = [
  // ========== CELL BIOLOGY ==========
  {
    topic: 'Cell Structure and Function',
    question: 'The primary cell wall of plants is mainly composed of:',
    options: ['Cellulose, hemicellulose, and pectin', 'Lignin and suberin', 'Chitin and glucan', 'Murein and teichoic acid'],
    correctAnswer: 'A',
    explanation: 'Primary cell wall contains cellulose microfibrils embedded in matrix of hemicellulose, pectin, and proteins. Secondary wall has lignin. Chitin is in fungi, murein in bacteria.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Which of the following statements about peroxisomes is INCORRECT?',
    options: ['They contain oxidases that produce H2O2', 'They contain catalase that degrades H2O2', 'They are involved in photorespiration', 'They have 80S ribosomes for protein synthesis'],
    correctAnswer: 'D',
    explanation: 'Peroxisomes have no ribosomes; proteins are imported post-translationally. They contain oxidases producing H2O2 and catalase degrading it. They are involved in photorespiration in plants.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'In the fluid mosaic model of cell membrane, which component provides fluidity?',
    options: ['Unsaturated fatty acids in phospholipids', 'Cholesterol only', 'Integral proteins', 'Glycocalyx'],
    correctAnswer: 'A',
    explanation: 'Unsaturated fatty acids have kinks (cis double bonds) that prevent tight packing of phospholipids, increasing fluidity. Cholesterol modulates fluidity. Proteins float in the bilayer.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'The Golgi complex is responsible for all EXCEPT:',
    options: ['ATP synthesis', 'Protein modification and packaging', 'Formation of lysosomes', 'Glycosylation of proteins'],
    correctAnswer: 'A',
    explanation: 'ATP synthesis occurs in mitochondria (oxidative phosphorylation) and chloroplasts (photophosphorylation). Golgi modifies, packages proteins, forms lysosomes, and glycosylates proteins.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Which stage of mitosis is characterized by chromosomes aligning at the metaphase plate?',
    options: ['Metaphase', 'Anaphase', 'Prophase', 'Telophase'],
    correctAnswer: 'A',
    explanation: 'In metaphase, chromosomes align at the cell equator (metaphase plate). Spindle fibers attach to kinetochores. This ensures equal chromosome distribution in anaphase.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Prokaryotic ribosomes are:',
    options: ['70S (30S + 50S)', '80S (40S + 60S)', '70S (40S + 30S)', '80S (30S + 50S)'],
    correctAnswer: 'A',
    explanation: 'Prokaryotic ribosomes are 70S consisting of 30S (small) + 50S (large) subunits. Eukaryotic cytoplasmic ribosomes are 80S (40S + 60S). S is Svedberg unit.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== GENETICS ==========
  {
    topic: 'Genetics and Evolution',
    question: 'In incomplete dominance, a cross between red (RR) and white (rr) flowers produces pink (Rr). The F2 ratio is:',
    options: ['1 red : 2 pink : 1 white', '3 red : 1 white', '1 red : 1 pink : 1 white : 1 red', '2 red : 1 pink : 1 white'],
    correctAnswer: 'A',
    explanation: 'In incomplete dominance, heterozygotes show intermediate phenotype. F1 (Rr x Rr) produces: RR (red) : Rr (pink) : rr (white) = 1:2:1. Phenotypic ratio equals genotypic ratio.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Sex-linked genes located on Y chromosome are called:',
    options: ['Holandric genes', 'Hemizygous genes', 'X-linked genes', 'Autosomal genes'],
    correctAnswer: 'A',
    explanation: 'Holandric genes are on Y chromosome and passed only from father to son. Examples include SRY gene. X-linked genes are on X chromosome. Hemizygous refers to single copy of gene.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Crossing over occurs during which stage of meiosis?',
    options: ['Pachytene of Prophase I', 'Zygotene of Prophase I', 'Diplotene of Prophase I', 'Diakinesis of Prophase I'],
    correctAnswer: 'A',
    explanation: 'Crossing over (recombination) occurs during pachytene when bivalents form synaptonemal complex. Recombination nodules appear. Chiasmata become visible in diplotene.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'The codon AUG codes for:',
    options: ['Methionine and acts as start codon', 'Tryptophan', 'Stop signal', 'Leucine'],
    correctAnswer: 'A',
    explanation: 'AUG is the universal start codon coding for methionine (formyl-methionine in prokaryotes). It initiates translation. UGG codes for tryptophan. UAA, UAG, UGA are stop codons.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Point mutation that changes one amino acid to another is called:',
    options: ['Missense mutation', 'Nonsense mutation', 'Silent mutation', 'Frameshift mutation'],
    correctAnswer: 'A',
    explanation: 'Missense mutation changes codon to code for different amino acid. Nonsense creates stop codon. Silent mutation codes for same amino acid. Frameshift alters reading frame.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Operon concept was proposed by:',
    options: ['Jacob and Monod', 'Watson and Crick', 'Nirenberg and Khorana', 'Beadle and Tatum'],
    correctAnswer: 'A',
    explanation: 'Jacob and Monod proposed the lac operon model in 1961 explaining gene regulation in E. coli. Watson-Crick proposed DNA structure. Nirenberg-Khorana decoded genetic code.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== HUMAN PHYSIOLOGY ==========
  {
    topic: 'Human Physiology',
    question: 'Which blood group is called universal recipient?',
    options: ['AB positive', 'O positive', 'A positive', 'B negative'],
    correctAnswer: 'A',
    explanation: 'AB positive has both A and B antigens, no antibodies, and Rh antigen. Can receive from all blood types. O negative is universal donor (no antigens).',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'The hormone responsible for milk ejection (let-down reflex) is:',
    options: ['Oxytocin', 'Prolactin', 'Estrogen', 'Progesterone'],
    correctAnswer: 'A',
    explanation: 'Oxytocin from posterior pituitary causes contraction of myoepithelial cells around alveoli, ejecting milk. Prolactin stimulates milk production. Estrogen develops mammary ducts.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Vitamin K is essential for:',
    options: ['Blood clotting (prothrombin synthesis)', 'Night vision', 'Calcium absorption', 'Antioxidant function'],
    correctAnswer: 'A',
    explanation: 'Vitamin K is essential for synthesis of clotting factors (II, VII, IX, X) including prothrombin. Vitamin A for vision, D for calcium, E for antioxidant.',
    source: 'NCERT Class 11, Chapter 16',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Myelin sheath is formed by which cells in CNS?',
    options: ['Oligodendrocytes', 'Schwann cells', 'Astrocytes', 'Microglia'],
    correctAnswer: 'A',
    explanation: 'Oligodendrocytes form myelin in CNS. Schwann cells myelinate in PNS. Astrocytes provide support and BBB. Microglia are immune cells of CNS.',
    source: 'NCERT Class 11, Chapter 21',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'The deficiency of iodine causes:',
    options: ['Goiter', 'Diabetes mellitus', 'Acromegaly', 'Tetany'],
    correctAnswer: 'A',
    explanation: 'Iodine deficiency reduces thyroid hormone synthesis, causing compensatory TSH increase and thyroid enlargement (goiter). Diabetes from insulin, acromegaly from GH, tetany from low Ca.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Heparin, a natural anticoagulant, is secreted by:',
    options: ['Mast cells and basophils', 'Platelets', 'Liver', 'Bone marrow'],
    correctAnswer: 'A',
    explanation: 'Heparin is secreted by mast cells and basophils. It inhibits thrombin and factor X, preventing clot formation. Liver produces most clotting factors. Platelets release thromboplastin.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== PLANT PHYSIOLOGY ==========
  {
    topic: 'Plant Physiology',
    question: 'The enzyme RuBisCO is involved in:',
    options: ['Carbon fixation in Calvin cycle', 'Glycolysis', 'Light reactions', 'Nitrogen fixation'],
    correctAnswer: 'A',
    explanation: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase) fixes CO2 to RuBP forming 2 molecules of 3-PGA. It is the most abundant enzyme on Earth.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Photorespiration occurs in:',
    options: ['C3 plants', 'C4 plants', 'CAM plants', 'All plants equally'],
    correctAnswer: 'A',
    explanation: 'Photorespiration is significant in C3 plants where RuBisCO also acts as oxygenase. C4 plants minimize it through spatial separation, CAM through temporal separation.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Gibberellins promote:',
    options: ['Stem elongation and bolting', 'Root initiation', 'Stomatal closure', 'Fruit ripening'],
    correctAnswer: 'A',
    explanation: 'Gibberellins cause stem elongation (internodal growth), bolting in rosette plants, and promote flowering in long-day plants. Auxin initiates roots, ABA closes stomata, ethylene ripens fruit.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'The process of mineral uptake against concentration gradient is called:',
    options: ['Active absorption', 'Passive absorption', 'Facilitated diffusion', 'Osmosis'],
    correctAnswer: 'A',
    explanation: 'Active absorption requires ATP and carrier proteins to move minerals against concentration gradient. Passive absorption follows gradient. Facilitated needs carriers but not energy.',
    source: 'NCERT Class 11, Chapter 12',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Phytochrome is involved in:',
    options: ['Photoperiodism and photomorphogenesis', 'Photosynthesis', 'Photorespiration', 'Photolysis of water'],
    correctAnswer: 'A',
    explanation: 'Phytochrome is a photoreceptor pigment (Pr and Pfr forms) regulating flowering (photoperiodism), seed germination, and developmental responses (photomorphogenesis).',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Transpiration pull is based on:',
    options: ['Cohesion-tension theory', 'Root pressure theory', 'Imbibition', 'Active transport'],
    correctAnswer: 'A',
    explanation: 'Cohesion-tension theory explains water ascent in xylem. Transpiration creates negative pressure, water molecules cohere and adhere to vessel walls, pulling water column up.',
    source: 'NCERT Class 11, Chapter 11',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== REPRODUCTION ==========
  {
    topic: 'Reproduction',
    question: 'In humans, fertilization normally occurs in:',
    options: ['Ampulla of fallopian tube', 'Uterus', 'Ovary', 'Cervix'],
    correctAnswer: 'A',
    explanation: 'Fertilization occurs in ampulla-isthmus junction of fallopian tube within 24 hours of ovulation. Zygote travels to uterus for implantation over 5-7 days.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'The hormone that maintains pregnancy is:',
    options: ['Progesterone', 'Estrogen', 'FSH', 'LH'],
    correctAnswer: 'A',
    explanation: 'Progesterone from corpus luteum (later placenta) maintains endometrium, suppresses uterine contractions, and prevents further ovulation during pregnancy.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Sperm gains fertilizing capacity in the female reproductive tract through:',
    options: ['Capacitation', 'Spermiogenesis', 'Spermiation', 'Acrosomal reaction'],
    correctAnswer: 'A',
    explanation: 'Capacitation occurs in female tract where sperm membrane changes enable acrosomal reaction and fertilization. Spermiogenesis is sperm formation, spermiation is release from Sertoli cells.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Which structure in pollen grain contains male gametes?',
    options: ['Generative cell (later two male gametes)', 'Vegetative cell', 'Exine', 'Intine'],
    correctAnswer: 'A',
    explanation: 'Generative cell divides to form two male gametes. Vegetative cell forms pollen tube. Exine is outer wall with sporopollenin. Intine is inner pectin-cellulose wall.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'The hormone hCG is produced by:',
    options: ['Trophoblast of developing embryo', 'Corpus luteum', 'Anterior pituitary', 'Ovary'],
    correctAnswer: 'A',
    explanation: 'hCG (human chorionic gonadotropin) is produced by trophoblast after implantation. It maintains corpus luteum and is used in pregnancy tests. Corpus luteum produces progesterone.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Polyembryony is commonly seen in:',
    options: ['Citrus (orange, lemon)', 'Mango', 'Apple', 'Banana'],
    correctAnswer: 'A',
    explanation: 'Polyembryony (multiple embryos from single seed) occurs in citrus due to nucellar embryony. Nucellar cells develop into embryos alongside sexual embryo.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== ECOLOGY ==========
  {
    topic: 'Ecology',
    question: 'Primary productivity is highest in:',
    options: ['Tropical rainforests', 'Temperate grasslands', 'Tundra', 'Deserts'],
    correctAnswer: 'A',
    explanation: 'Tropical rainforests have highest NPP due to optimal temperature, rainfall, and light year-round. They produce 1000-3500 g/m2/year of dry biomass.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Ecological succession on bare rock is called:',
    options: ['Primary succession (lithosere)', 'Secondary succession', 'Hydrosere', 'Psammosere'],
    correctAnswer: 'A',
    explanation: 'Primary succession on bare rock (lithosere) starts with pioneer species like lichens. Hydrosere is in water bodies, psammosere on sand. Secondary succession occurs after disturbance.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'In logistic growth model, carrying capacity is represented by:',
    options: ['K', 'r', 'N', 'dN/dt'],
    correctAnswer: 'A',
    explanation: 'K represents carrying capacity (maximum population size environment can support). r is intrinsic growth rate, N is population size, dN/dt is population growth rate.',
    source: 'NCERT Class 12, Chapter 13',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Endemic species are:',
    options: ['Found only in a particular geographic region', 'Widely distributed species', 'Introduced species', 'Endangered species'],
    correctAnswer: 'A',
    explanation: 'Endemic species are native and restricted to a particular area. Western Ghats and Eastern Himalayas are biodiversity hotspots with high endemism. Not all endemic species are endangered.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'The greenhouse gas with highest global warming potential is:',
    options: ['Chlorofluorocarbons (CFCs)', 'Carbon dioxide', 'Methane', 'Nitrous oxide'],
    correctAnswer: 'A',
    explanation: 'CFCs have 10,000-20,000 times more GWP than CO2. However, CO2 contributes most to global warming due to higher atmospheric concentration despite lower GWP per molecule.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'The Montreal Protocol is related to:',
    options: ['Ozone layer protection', 'Climate change mitigation', 'Biodiversity conservation', 'Wetland conservation'],
    correctAnswer: 'A',
    explanation: 'Montreal Protocol (1987) aims to phase out ozone-depleting substances like CFCs. Kyoto Protocol is for climate change, CBD for biodiversity, Ramsar for wetlands.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== BIOTECHNOLOGY ==========
  {
    topic: 'Biotechnology',
    question: 'Restriction enzymes cut DNA at:',
    options: ['Specific palindromic sequences', 'Random sites', 'Only at origins of replication', 'Promoter regions only'],
    correctAnswer: 'A',
    explanation: 'Restriction endonucleases recognize specific palindromic sequences (read same on both strands 5 to 3). Example: EcoRI recognizes GAATTC. They produce sticky or blunt ends.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'The first step in recombinant DNA technology is:',
    options: ['Isolation of genetic material (DNA)', 'Cutting DNA with restriction enzymes', 'Ligation of DNA insert to vector', 'Transformation of host cell'],
    correctAnswer: 'A',
    explanation: 'rDNA technology steps: isolation of DNA, cutting with restriction enzymes, ligation to vector, transformation into host, selection and screening of recombinants.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Gel electrophoresis separates DNA fragments based on:',
    options: ['Size (molecular weight)', 'Charge only', 'Color', 'Sequence'],
    correctAnswer: 'A',
    explanation: 'DNA fragments migrate through agarose gel based on size. Smaller fragments move faster and farther. All DNA has uniform negative charge due to phosphate backbone.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'The enzyme used to synthesize cDNA from mRNA is:',
    options: ['Reverse transcriptase', 'DNA polymerase', 'RNA polymerase', 'Primase'],
    correctAnswer: 'A',
    explanation: 'Reverse transcriptase from retroviruses synthesizes DNA from RNA template (reverse of normal transcription). Used to make cDNA from mRNA for cloning eukaryotic genes.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Bt toxin is effective against:',
    options: ['Lepidopteran pests (caterpillars)', 'All insects equally', 'Viruses', 'Fungi'],
    correctAnswer: 'A',
    explanation: 'Different Cry proteins target different insects. Cry1Ac and Cry2Ab are effective against lepidopteran larvae (bollworm). Cry3Bb targets coleopteran pests.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'GEAC in India stands for:',
    options: ['Genetic Engineering Approval Committee', 'Gene Expression Analysis Center', 'Genome Editing Assessment Committee', 'Genetic Enhancement Advisory Council'],
    correctAnswer: 'A',
    explanation: 'GEAC (Genetic Engineering Approval Committee, now GEAC: Genetic Engineering Appraisal Committee) is the regulatory body in India for GMO approval under Ministry of Environment.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== DIVERSITY ==========
  {
    topic: 'Diversity in Living World',
    question: 'Binomial nomenclature was introduced by:',
    options: ['Carolus Linnaeus', 'Charles Darwin', 'Aristotle', 'Robert Hooke'],
    correctAnswer: 'A',
    explanation: 'Linnaeus introduced binomial nomenclature in Species Plantarum (1753). Two-part Latin names: genus (capitalized) + species (lowercase), both italicized.',
    source: 'NCERT Class 11, Chapter 1',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Mushrooms belong to which division of fungi?',
    options: ['Basidiomycota', 'Ascomycota', 'Zygomycota', 'Deuteromycota'],
    correctAnswer: 'A',
    explanation: 'Mushrooms are basidiomycetes producing basidiospores on club-shaped basidia. Examples: Agaricus (button mushroom), Polyporus. Ascomycetes produce ascospores in asci.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Which group of plants is called vascular cryptogams?',
    options: ['Pteridophytes', 'Bryophytes', 'Gymnosperms', 'Angiosperms'],
    correctAnswer: 'A',
    explanation: 'Pteridophytes (ferns) are vascular cryptogams having vascular tissue (xylem, phloem) but no seeds (spore reproduction). Bryophytes lack vascular tissue. Gymnosperms and angiosperms have seeds.',
    source: 'NCERT Class 11, Chapter 3',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Radial symmetry is found in:',
    options: ['Coelenterates (Cnidaria)', 'Arthropods', 'Annelids', 'Molluscs'],
    correctAnswer: 'A',
    explanation: 'Cnidarians (Hydra, jellyfish) show radial symmetry - body can be divided into similar halves through any plane passing through central axis. Most animals are bilaterally symmetrical.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'True coelom is found in:',
    options: ['Annelids, Arthropods, Molluscs, Echinoderms, Chordates', 'Nematodes only', 'Platyhelminthes', 'Cnidarians'],
    correctAnswer: 'A',
    explanation: 'True coelom (eucoelom) is body cavity lined by mesoderm. Nematodes are pseudocoelomates, platyhelminthes are acoelomates, cnidarians have gastrovascular cavity.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Pteridophyte gametophyte is:',
    options: ['Independent, photosynthetic prothallus', 'Dependent on sporophyte', 'Dominant generation', 'Part of the sporophyte'],
    correctAnswer: 'A',
    explanation: 'Pteridophyte gametophyte (prothallus) is small, independent, photosynthetic, and bears antheridia and archegonia. Sporophyte is the dominant generation in pteridophytes.',
    source: 'NCERT Class 11, Chapter 3',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== STRUCTURAL ORGANISATION ==========
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Meristematic tissue is characterized by:',
    options: ['Actively dividing cells with dense cytoplasm', 'Dead cells with thick walls', 'Cells with large vacuoles', 'Cells with intercellular spaces'],
    correctAnswer: 'A',
    explanation: 'Meristematic cells are thin-walled, contain dense cytoplasm, prominent nuclei, no vacuoles, and undergo active cell division. They are found at root and shoot tips.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Xylem elements include all EXCEPT:',
    options: ['Sieve tubes', 'Tracheids', 'Vessels', 'Xylem parenchyma'],
    correctAnswer: 'A',
    explanation: 'Xylem contains tracheids, vessels, xylem parenchyma, and xylem fibers. Sieve tubes are phloem elements. Xylem conducts water, phloem transports food.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'The type of vascular bundle in monocot stem is:',
    options: ['Conjoint, collateral, closed', 'Conjoint, collateral, open', 'Radial', 'Concentric'],
    correctAnswer: 'A',
    explanation: 'Monocot stem has closed vascular bundles (no cambium) scattered in ground tissue. Dicot stem has open bundles (with cambium) in a ring. Roots have radial arrangement.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Pericycle gives rise to:',
    options: ['Lateral roots', 'Root hairs', 'Root cap', 'Epidermis'],
    correctAnswer: 'A',
    explanation: 'Lateral roots originate from pericycle (endogenous origin). Root hairs are extensions of epidermal cells. Root cap protects root apex. Pericycle also forms vascular cambium in secondary growth.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'In frogs, respiration occurs through:',
    options: ['Skin, lungs, and buccal cavity', 'Gills only', 'Lungs only', 'Trachea'],
    correctAnswer: 'A',
    explanation: 'Frogs are amphibians with multiple respiratory surfaces. Cutaneous respiration through moist skin is important. Buccal-pharyngeal respiration supplements lung respiration.',
    source: 'NCERT Class 11, Chapter 7',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Malpighian tubules are excretory organs in:',
    options: ['Insects', 'Earthworms', 'Humans', 'Frogs'],
    correctAnswer: 'A',
    explanation: 'Malpighian tubules are excretory organs in insects (arthropods). They remove nitrogenous waste as uric acid. Earthworms have nephridia. Vertebrates have kidneys.',
    source: 'NCERT Class 11, Chapter 7',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== HUMAN WELFARE ==========
  {
    topic: 'Biology and Human Welfare',
    question: 'The causative agent of ringworm is:',
    options: ['Fungi (dermatophytes)', 'Bacteria', 'Virus', 'Protozoa'],
    correctAnswer: 'A',
    explanation: 'Ringworm is caused by dermatophyte fungi (Microsporum, Trichophyton, Epidermophyton). Despite the name, no worm is involved. It affects skin, nails, and hair.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Primary lymphoid organs include:',
    options: ['Bone marrow and thymus', 'Spleen and lymph nodes', 'Tonsils and Peyers patches', 'MALT and appendix'],
    correctAnswer: 'A',
    explanation: 'Primary lymphoid organs (bone marrow, thymus) are sites of lymphocyte maturation. B cells mature in bone marrow, T cells in thymus. Secondary organs (spleen, lymph nodes) are sites of immune response.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Active immunity is:',
    options: ['Produced by host in response to antigens', 'Transfer of antibodies from another individual', 'Temporary', 'Requires repeated doses'],
    correctAnswer: 'A',
    explanation: 'Active immunity is produced by body in response to pathogen/vaccine. It develops slowly but provides long-lasting memory. Passive immunity (antibody transfer) is immediate but temporary.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Single cell protein (SCP) can be produced using:',
    options: ['Spirulina and Methylophilus', 'Only bacteria', 'Only fungi', 'Only algae'],
    correctAnswer: 'A',
    explanation: 'SCP is produced from microorganisms as protein-rich food. Spirulina (cyanobacteria), Methylophilus (bacteria), Candida (yeast), Fusarium (fungi) are used. Rich in proteins, vitamins.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Biogas mainly contains:',
    options: ['Methane and carbon dioxide', 'Only methane', 'Only carbon dioxide', 'Nitrogen and hydrogen'],
    correctAnswer: 'A',
    explanation: 'Biogas contains 50-70% methane, 30-40% CO2, traces of H2S and H2. Produced by anaerobic decomposition of organic matter by methanogenic bacteria in biogas plants.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Biological control of pests includes using:',
    options: ['Predators, parasites, and pathogens', 'Chemical pesticides', 'Radiation', 'Mechanical traps only'],
    correctAnswer: 'A',
    explanation: 'Biological control uses natural enemies: predators (ladybird beetles eat aphids), parasitoids (Trichogramma), and pathogens (Bt, Baculoviruses). Its eco-friendly alternative to chemicals.',
    source: 'NCERT Class 12, Chapter 10',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== MORE GENETICS ==========
  {
    topic: 'Genetics and Evolution',
    question: 'Griffiths transformation experiment proved:',
    options: ['DNA is the genetic material', 'Protein is genetic material', 'RNA is genetic material', 'Lipids carry genetic information'],
    correctAnswer: 'A',
    explanation: 'Griffiths experiment (1928) showed transformation principle but did not identify it as DNA. Avery, MacLeod, McCarty (1944) proved DNA is transforming principle.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Okazaki fragments are formed during:',
    options: ['Lagging strand synthesis', 'Leading strand synthesis', 'Transcription', 'Translation'],
    correctAnswer: 'A',
    explanation: 'Lagging strand is synthesized discontinuously as Okazaki fragments (1000-2000 nt in prokaryotes, 100-200 in eukaryotes) due to 5 to 3 direction of DNA polymerase.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'RNA polymerase in prokaryotes:',
    options: ['Is a single enzyme for all RNA types', 'Requires primer to start', 'Reads in 5 to 3 direction', 'Has three different types'],
    correctAnswer: 'A',
    explanation: 'Prokaryotes have single RNA polymerase (holoenzyme with sigma factor) for mRNA, tRNA, rRNA synthesis. Eukaryotes have three (RNA pol I, II, III). RNA polymerase reads template 3 to 5.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Human genome has approximately:',
    options: ['20000-25000 genes', '100000 genes', '5000 genes', '50000 genes'],
    correctAnswer: 'A',
    explanation: 'Human Genome Project revealed ~20000-25000 genes, much less than expected. Only ~2% of genome codes for proteins. Rest includes introns, regulatory sequences, repetitive DNA.',
    source: 'NCERT Class 12, Chapter 6',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== MORE ECOLOGY ==========
  {
    topic: 'Ecology',
    question: 'Which is the correct food chain?',
    options: ['Grass - Grasshopper - Frog - Snake - Eagle', 'Grass - Snake - Frog - Eagle - Grasshopper', 'Eagle - Snake - Frog - Grasshopper - Grass', 'Frog - Grasshopper - Grass - Snake - Eagle'],
    correctAnswer: 'A',
    explanation: 'Food chain shows energy flow from producers to consumers. Grass (producer) - Grasshopper (primary consumer) - Frog (secondary) - Snake (tertiary) - Eagle (quaternary).',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Detritus food chain starts with:',
    options: ['Dead organic matter', 'Living plants', 'Herbivores', 'Carnivores'],
    correctAnswer: 'A',
    explanation: 'Detritus food chain: dead organic matter - decomposers/detritivores - consumers. Grazing food chain starts with living plants. Detritus chain is major in forests.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Ex-situ conservation includes:',
    options: ['Zoos, botanical gardens, seed banks', 'National parks', 'Wildlife sanctuaries', 'Biosphere reserves'],
    correctAnswer: 'A',
    explanation: 'Ex-situ conservation is outside natural habitat: zoos, aquaria, botanical gardens, seed/gene banks. In-situ conservation is in natural habitat: national parks, sanctuaries, biosphere reserves.',
    source: 'NCERT Class 12, Chapter 15',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== MORE REPRODUCTION ==========
  {
    topic: 'Reproduction',
    question: 'Corpus luteum secretes:',
    options: ['Progesterone mainly', 'Estrogen mainly', 'FSH', 'LH'],
    correctAnswer: 'A',
    explanation: 'Corpus luteum forms from follicle after ovulation and secretes progesterone (and some estrogen) to maintain endometrium. If pregnancy occurs, it persists; otherwise degenerates.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'IVF stands for:',
    options: ['In Vitro Fertilization', 'In Vivo Fertilization', 'Internal Vaginal Fertilization', 'Induced Viable Fertilization'],
    correctAnswer: 'A',
    explanation: 'IVF is assisted reproductive technology where fertilization occurs outside body (in vitro = in glass). Embryo is then transferred to uterus. First test tube baby: Louise Brown (1978).',
    source: 'NCERT Class 12, Chapter 4',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== MORE PLANT PHYSIOLOGY ==========
  {
    topic: 'Plant Physiology',
    question: 'The site of dark reaction in photosynthesis is:',
    options: ['Stroma of chloroplast', 'Grana thylakoids', 'Outer membrane', 'Intermembrane space'],
    correctAnswer: 'A',
    explanation: 'Dark reaction (Calvin cycle) occurs in stroma where CO2 fixation by RuBisCO and sugar synthesis happen. Light reactions occur on thylakoid membranes.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Guttation occurs through:',
    options: ['Hydathodes', 'Stomata', 'Lenticels', 'Cuticle'],
    correctAnswer: 'A',
    explanation: 'Guttation is loss of liquid water through hydathodes (water stomata) at leaf margins when transpiration is low but root pressure is high. Occurs in herbaceous plants.',
    source: 'NCERT Class 11, Chapter 11',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Nitrogen fixation is carried out by:',
    options: ['Rhizobium, Azotobacter, cyanobacteria', 'All bacteria', 'All plants', 'Animals'],
    correctAnswer: 'A',
    explanation: 'Nitrogen fixation (N2 to NH3) is done by diazotrophs: symbiotic (Rhizobium in legumes) and free-living (Azotobacter, Clostridium, cyanobacteria). They have nitrogenase enzyme.',
    source: 'NCERT Class 11, Chapter 12',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== MORE HUMAN PHYSIOLOGY ==========
  {
    topic: 'Human Physiology',
    question: 'Insulin is secreted by:',
    options: ['Beta cells of Islets of Langerhans', 'Alpha cells of Islets', 'Acinar cells', 'Delta cells'],
    correctAnswer: 'A',
    explanation: 'Pancreatic beta cells secrete insulin (lowers blood glucose). Alpha cells secrete glucagon (raises glucose). Delta cells secrete somatostatin. Acinar cells produce digestive enzymes.',
    source: 'NCERT Class 11, Chapter 22',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'The functional unit of muscle contraction is:',
    options: ['Sarcomere', 'Myofibril', 'Muscle fiber', 'Myofilament'],
    correctAnswer: 'A',
    explanation: 'Sarcomere is the contractile unit between two Z-lines. Contains overlapping actin (thin) and myosin (thick) filaments. Shortening of sarcomeres causes muscle contraction.',
    source: 'NCERT Class 11, Chapter 20',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Bile is produced by:',
    options: ['Liver', 'Gall bladder', 'Pancreas', 'Small intestine'],
    correctAnswer: 'A',
    explanation: 'Bile is produced by hepatocytes in liver, stored and concentrated in gall bladder, released into duodenum. It emulsifies fats but contains no digestive enzymes.',
    source: 'NCERT Class 11, Chapter 16',
    curriculum: 'CBSE',
    grade: '11',
  },
]

async function generateHardQuestions() {
  console.log('Starting HARD question generation (Batch 2)...\n')

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
  let errors = 0
  let duplicates = 0

  for (const q of questionsToInsert) {
    try {
      const existing = await prisma.questions.findFirst({
        where: {
          question: q.question,
          isActive: true,
        },
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
  console.log(`Total questions: ${hardQuestions.length}`)
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
