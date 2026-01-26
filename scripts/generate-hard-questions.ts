/**
 * Generate HARD difficulty NEET Biology questions
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

// HARD questions by topic - following NEET PYQ patterns
const hardQuestions: HardQuestion[] = [
  // ========== CELL STRUCTURE AND FUNCTION ==========
  {
    topic: 'Cell Structure and Function',
    question:
      'The inner membrane of mitochondria is folded into cristae which increases surface area for:',
    options: [
      'ATP synthase and electron transport chain components',
      'Krebs cycle enzymes only',
      'DNA replication machinery',
      'Lipid synthesis enzymes',
    ],
    correctAnswer: 'A',
    explanation:
      'Cristae contain ATP synthase (F0-F1 particles) and electron transport chain complexes (I-IV). The increased surface area allows more ATP production. Krebs cycle occurs in the matrix, not on cristae.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Which of the following is NOT a function of the smooth endoplasmic reticulum?',
    options: [
      'Protein synthesis',
      'Lipid synthesis',
      'Detoxification',
      'Calcium storage in muscle cells',
    ],
    correctAnswer: 'A',
    explanation:
      'Protein synthesis occurs on rough ER (with ribosomes). SER is involved in lipid/steroid synthesis, detoxification of drugs and poisons, and calcium storage (sarcoplasmic reticulum in muscles).',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question:
      'During the formation of the cell plate in plant cell division, vesicles from which organelle fuse?',
    options: ['Endoplasmic reticulum', 'Golgi complex', 'Lysosomes', 'Peroxisomes'],
    correctAnswer: 'B',
    explanation:
      'During cytokinesis in plant cells, vesicles from the Golgi complex (trans-Golgi network) fuse to form the cell plate, which develops into the middle lamella and primary cell wall.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question:
      'The semi-autonomous nature of mitochondria and chloroplasts is supported by all EXCEPT:',
    options: [
      'Presence of 80S ribosomes',
      'Presence of circular DNA',
      'Ability to divide by fission',
      'Presence of double membrane',
    ],
    correctAnswer: 'A',
    explanation:
      'Mitochondria and chloroplasts have 70S ribosomes (like prokaryotes), not 80S. Their circular DNA, ability to self-replicate, and double membrane support the endosymbiotic theory.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Cell Structure and Function',
    question: 'Centrioles are composed of which arrangement of microtubules?',
    options: ['9+2 arrangement', '9+0 arrangement', '9+3 arrangement', '8+2 arrangement'],
    correctAnswer: 'B',
    explanation:
      'Centrioles have a 9+0 arrangement (9 peripheral triplets, no central microtubules). Cilia and flagella have 9+2 arrangement (9 peripheral doublets + 2 central singlets).',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== GENETICS AND EVOLUTION ==========
  {
    topic: 'Genetics and Evolution',
    question:
      'In a dihybrid cross AaBb x AaBb, the phenotypic ratio of 9:3:3:1 is modified to 9:7 when:',
    options: [
      'Complementary genes are involved',
      'Duplicate genes are involved',
      'Epistatic genes are involved',
      'Multiple alleles are involved',
    ],
    correctAnswer: 'A',
    explanation:
      'In complementary gene interaction, two dominant non-allelic genes complement each other. A_B_ produces one phenotype (9) while A_bb, aaB_, and aabb together produce another (3+3+1=7).',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Hardy-Weinberg equilibrium is disturbed by all EXCEPT:',
    options: ['Random mating', 'Genetic drift', 'Gene flow', 'Natural selection'],
    correctAnswer: 'A',
    explanation:
      'Random mating is a prerequisite for Hardy-Weinberg equilibrium, not a factor that disturbs it. Genetic drift, gene flow, natural selection, and mutation all disturb the equilibrium.',
    source: 'NCERT Class 12, Chapter 7',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'The chromosome number in meiosis is reduced from diploid to haploid during:',
    options: ['Anaphase I', 'Anaphase II', 'Metaphase I', 'Telophase II'],
    correctAnswer: 'A',
    explanation:
      'During Anaphase I, homologous chromosomes separate and move to opposite poles, reducing the chromosome number from 2n to n. Anaphase II separates sister chromatids.',
    source: 'NCERT Class 11, Chapter 10',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Genetics and Evolution',
    question:
      'A cross between yellow round (YyRr) and green wrinkled (yyrr) pea plants will produce:',
    options: [
      'Four phenotypes in 1:1:1:1 ratio',
      'Two phenotypes in 1:1 ratio',
      'One phenotype only',
      'Four phenotypes in 9:3:3:1 ratio',
    ],
    correctAnswer: 'A',
    explanation:
      'This is a test cross. YyRr x yyrr produces YyRr (yellow round), Yyrr (yellow wrinkled), yyRr (green round), and yyrr (green wrinkled) in equal proportions (1:1:1:1).',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Genetics and Evolution',
    question: 'Pleiotropy is best described as:',
    options: [
      'One gene affecting multiple phenotypic traits',
      'Multiple genes affecting one trait',
      'One gene having multiple alleles',
      'Multiple genes having one allele each',
    ],
    correctAnswer: 'A',
    explanation:
      'Pleiotropy is when one gene affects multiple traits. Example: sickle cell gene affects RBC shape, causes anemia, and provides malaria resistance. Epistasis is gene-gene interaction.',
    source: 'NCERT Class 12, Chapter 5',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== HUMAN PHYSIOLOGY ==========
  {
    topic: 'Human Physiology',
    question: 'The sequence of impulse conduction through the heart is:',
    options: [
      'SA node, AV node, Bundle of His, Purkinje fibers',
      'AV node, SA node, Bundle of His, Purkinje fibers',
      'SA node, Bundle of His, AV node, Purkinje fibers',
      'Purkinje fibers, SA node, AV node, Bundle of His',
    ],
    correctAnswer: 'A',
    explanation:
      'Cardiac impulse originates at SA node (pacemaker), spreads through atrial muscles, AV node (0.1s delay), Bundle of His, right and left bundle branches, Purkinje fibers, ventricular muscles.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question:
      'During forceful expiration, the volume of air that can be exhaled after normal expiration is called:',
    options: [
      'Inspiratory reserve volume',
      'Expiratory reserve volume',
      'Residual volume',
      'Tidal volume',
    ],
    correctAnswer: 'B',
    explanation:
      'ERV is the additional air that can be forcefully exhaled after normal expiration (~1000-1100 mL). IRV is extra air inhaled, RV is air remaining after forceful expiration, TV is normal breath volume.',
    source: 'NCERT Class 11, Chapter 17',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Which correctly describes the counter-current mechanism in the kidney?',
    options: [
      'Flow of filtrate in opposite direction to blood in vasa recta',
      'Flow of filtrate in same direction as blood in vasa recta',
      'Flow of blood through glomerulus and Bowmans capsule',
      'Flow of urine through collecting duct and ureter',
    ],
    correctAnswer: 'A',
    explanation:
      'Counter-current mechanism involves filtrate flowing in loop of Henle opposite to blood flow in vasa recta. This maintains medullary concentration gradient for urine concentration.',
    source: 'NCERT Class 11, Chapter 19',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'The P wave in an ECG represents:',
    options: [
      'Atrial depolarization',
      'Ventricular depolarization',
      'Atrial repolarization',
      'Ventricular repolarization',
    ],
    correctAnswer: 'A',
    explanation:
      'P wave represents atrial depolarization. QRS complex represents ventricular depolarization. T wave represents ventricular repolarization. Atrial repolarization is masked by QRS.',
    source: 'NCERT Class 11, Chapter 18',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Human Physiology',
    question: 'Juxtaglomerular apparatus secretes which hormone in response to low blood pressure?',
    options: ['Renin', 'Erythropoietin', 'Aldosterone', 'ADH'],
    correctAnswer: 'A',
    explanation:
      'JGA cells detect low blood pressure and secrete renin, which converts angiotensinogen to angiotensin I. This activates RAAS, leading to aldosterone release and sodium retention.',
    source: 'NCERT Class 11, Chapter 19',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== PLANT PHYSIOLOGY ==========
  {
    topic: 'Plant Physiology',
    question: 'In C4 plants, the primary CO2 acceptor is:',
    options: [
      'Phosphoenolpyruvate (PEP)',
      'Ribulose bisphosphate (RuBP)',
      'Oxaloacetate (OAA)',
      '3-phosphoglyceric acid (3-PGA)',
    ],
    correctAnswer: 'A',
    explanation:
      'In C4 plants, CO2 is first fixed in mesophyll cells by PEP carboxylase using PEP as acceptor to form OAA (4-carbon). RuBP is the acceptor in bundle sheath cells (Calvin cycle).',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Which pigment is directly involved in the light reactions of photosynthesis?',
    options: ['Chlorophyll a', 'Chlorophyll b', 'Xanthophyll', 'Carotenoids'],
    correctAnswer: 'A',
    explanation:
      'Only chlorophyll a is directly involved in light reactions at reaction centers (P680, P700). Other pigments (chl b, carotenoids, xanthophylls) are accessory pigments that transfer energy to chl a.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Kranz anatomy is characteristic of:',
    options: ['C4 plants', 'C3 plants', 'CAM plants', 'All photosynthetic plants'],
    correctAnswer: 'A',
    explanation:
      'Kranz anatomy features dimorphic chloroplasts in bundle sheath (agranal) and mesophyll (granal) cells with wreath-like arrangement. It is characteristic of C4 plants like maize, sugarcane.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'Abscisic acid is known as stress hormone because it:',
    options: [
      'Induces stomatal closure during water stress',
      'Promotes fruit ripening under stress',
      'Accelerates cell division in wounded tissues',
      'Stimulates root growth in waterlogged soil',
    ],
    correctAnswer: 'A',
    explanation:
      'ABA induces stomatal closure during water stress by causing K+ efflux from guard cells, leading to loss of turgor. It also inhibits growth and promotes dormancy during adverse conditions.',
    source: 'NCERT Class 11, Chapter 15',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Plant Physiology',
    question: 'The correct sequence of electron flow in non-cyclic photophosphorylation is:',
    options: [
      'PS II, plastoquinone, cytochrome complex, plastocyanin, PS I, ferredoxin, NADP+',
      'PS I, plastoquinone, cytochrome complex, plastocyanin, PS II, ferredoxin, NADP+',
      'PS II, ferredoxin, cytochrome complex, plastocyanin, PS I, plastoquinone, NADP+',
      'PS I, ferredoxin, PS II, plastoquinone, cytochrome complex, NADP+',
    ],
    correctAnswer: 'A',
    explanation:
      'In Z-scheme: water splits at PS II (P680), electrons flow through PQ, Cyt b6f, PC, PS I (P700), Fd, and finally reduce NADP+ to NADPH via NADP reductase.',
    source: 'NCERT Class 11, Chapter 13',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== REPRODUCTION ==========
  {
    topic: 'Reproduction',
    question: 'The embryo sac in angiosperms is usually:',
    options: [
      '7-celled with 8 nuclei',
      '8-celled with 8 nuclei',
      '7-celled with 7 nuclei',
      '8-celled with 7 nuclei',
    ],
    correctAnswer: 'A',
    explanation:
      'Mature embryo sac has 7 cells: 3 antipodals, 2 synergids, 1 egg cell, and 1 central cell. The central cell has 2 polar nuclei, making total 8 nuclei.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Double fertilization in angiosperms involves fusion of:',
    options: [
      'One male gamete with egg and another with polar nuclei',
      'Both male gametes with egg cell',
      'One male gamete with synergid and another with egg',
      'Both male gametes with polar nuclei',
    ],
    correctAnswer: 'A',
    explanation:
      'In double fertilization: one male gamete fuses with egg (syngamy) to form diploid zygote, another fuses with 2 polar nuclei (triple fusion) to form triploid primary endosperm nucleus.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'Sertoli cells in the testis are responsible for:',
    options: [
      'Nourishment of developing sperms',
      'Production of testosterone',
      'Production of FSH',
      'Production of LH',
    ],
    correctAnswer: 'A',
    explanation:
      'Sertoli cells (nurse cells) provide nutrition to developing spermatozoa and secrete inhibin. Leydig cells produce testosterone. FSH and LH are produced by anterior pituitary.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'During oogenesis, the first meiotic division is completed:',
    options: [
      'Just before ovulation',
      'At puberty',
      'During fertilization',
      'During fetal development',
    ],
    correctAnswer: 'A',
    explanation:
      'Primary oocyte arrests at prophase I during fetal development. Meiosis I completes just before ovulation forming secondary oocyte. Meiosis II completes only after sperm entry.',
    source: 'NCERT Class 12, Chapter 3',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Reproduction',
    question: 'The correct sequence of development of parts from the ovule after fertilization:',
    options: [
      'Integuments become seed coat, ovule wall becomes testa',
      'Nucellus becomes perisperm, outer integument becomes testa',
      'Outer integument becomes tegmen, inner integument becomes testa',
      'Inner integument becomes testa, outer integument becomes tegmen',
    ],
    correctAnswer: 'B',
    explanation:
      'After fertilization: outer integument becomes testa (outer seed coat), inner integument becomes tegmen (inner seed coat), nucellus may persist as perisperm in some seeds.',
    source: 'NCERT Class 12, Chapter 2',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== ECOLOGY ==========
  {
    topic: 'Ecology',
    question: 'In an ecosystem, 10% law of energy transfer was proposed by:',
    options: ['Lindeman', 'Odum', 'Elton', 'Tansley'],
    correctAnswer: 'A',
    explanation:
      'Lindeman (1942) proposed the 10% law stating only 10% of energy is transferred from one trophic level to the next. Tansley coined ecosystem, Elton proposed ecological pyramids.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'The pyramid of numbers is inverted in:',
    options: ['Tree ecosystem', 'Grassland ecosystem', 'Pond ecosystem', 'Desert ecosystem'],
    correctAnswer: 'A',
    explanation:
      'In tree ecosystem, one tree supports many herbivores (insects, birds) which support more parasites. So number increases at higher trophic levels, giving inverted pyramid of numbers.',
    source: 'NCERT Class 12, Chapter 14',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Mycorrhiza is an example of:',
    options: ['Mutualism', 'Parasitism', 'Commensalism', 'Amensalism'],
    correctAnswer: 'A',
    explanation:
      'Mycorrhiza is mutualistic association between fungus and plant roots. Fungus gets sugars from plant, plant gets enhanced nutrient (especially P) and water absorption from fungus.',
    source: 'NCERT Class 12, Chapter 13',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'The zone of atmosphere where ozone is found is:',
    options: ['Stratosphere', 'Troposphere', 'Mesosphere', 'Thermosphere'],
    correctAnswer: 'A',
    explanation:
      'Ozone layer is in stratosphere (15-35 km altitude) with maximum concentration at 23 km. It absorbs harmful UV-B radiation. Troposphere is where weather occurs.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Ecology',
    question: 'Biomagnification refers to:',
    options: [
      'Increase in concentration of toxicants at successive trophic levels',
      'Increase in number of organisms at higher trophic levels',
      'Increase in biomass at successive trophic levels',
      'Increase in energy at successive trophic levels',
    ],
    correctAnswer: 'A',
    explanation:
      'Biomagnification is the increase in concentration of non-degradable toxicants (DDT, heavy metals) at each trophic level in food chain. Top predators have highest concentration.',
    source: 'NCERT Class 12, Chapter 16',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== BIOTECHNOLOGY ==========
  {
    topic: 'Biotechnology',
    question: 'The enzyme used to join DNA fragments in recombinant DNA technology is:',
    options: ['DNA ligase', 'DNA polymerase', 'Restriction endonuclease', 'Reverse transcriptase'],
    correctAnswer: 'A',
    explanation:
      'DNA ligase joins DNA fragments by forming phosphodiester bonds between 3-OH and 5-phosphate ends. Restriction enzymes cut DNA, polymerase synthesizes DNA, reverse transcriptase makes DNA from RNA.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Ti plasmid is found in:',
    options: [
      'Agrobacterium tumefaciens',
      'Escherichia coli',
      'Bacillus thuringiensis',
      'Thermus aquaticus',
    ],
    correctAnswer: 'A',
    explanation:
      'Ti (tumor-inducing) plasmid is found in Agrobacterium tumefaciens. T-DNA from Ti plasmid integrates into plant genome. It is used as vector for plant genetic engineering.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'PCR technique requires:',
    options: ['Thermostable DNA polymerase', 'RNA polymerase', 'Restriction enzymes', 'Ligases'],
    correctAnswer: 'A',
    explanation:
      'PCR requires thermostable Taq polymerase (from Thermus aquaticus) that withstands high denaturation temperatures (~95C). Also needs primers, dNTPs, template DNA, and buffer.',
    source: 'NCERT Class 12, Chapter 11',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Golden rice is enriched with:',
    options: ['Beta-carotene (Vitamin A precursor)', 'Vitamin C', 'Iron', 'Protein'],
    correctAnswer: 'A',
    explanation:
      'Golden rice contains genes for beta-carotene biosynthesis (from daffodil/maize) in endosperm, giving golden color. Beta-carotene is converted to Vitamin A in the body, addressing VAD.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biotechnology',
    question: 'Cry proteins in Bt crops are toxic to insects because they:',
    options: [
      'Create pores in the gut lining of insects',
      'Inhibit protein synthesis in insects',
      'Block nerve impulses in insects',
      'Prevent metamorphosis in insects',
    ],
    correctAnswer: 'A',
    explanation:
      'Cry proteins (from Bacillus thuringiensis) become active in alkaline insect gut, bind to receptors, and form pores in midgut epithelium causing cell lysis and insect death.',
    source: 'NCERT Class 12, Chapter 12',
    curriculum: 'CBSE',
    grade: '12',
  },

  // ========== DIVERSITY IN LIVING WORLD ==========
  {
    topic: 'Diversity in Living World',
    question: 'The five-kingdom classification was proposed by:',
    options: ['R.H. Whittaker', 'Carl Linnaeus', 'Ernst Haeckel', 'Carl Woese'],
    correctAnswer: 'A',
    explanation:
      'R.H. Whittaker (1969) proposed five kingdom classification: Monera, Protista, Fungi, Plantae, Animalia based on cell structure, body organization, nutrition, reproduction, and phylogeny.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Lichens are indicators of:',
    options: [
      'Air pollution (specifically SO2)',
      'Water pollution',
      'Soil fertility',
      'Heavy metal contamination',
    ],
    correctAnswer: 'A',
    explanation:
      'Lichens are highly sensitive to SO2 pollution and die in polluted areas. Their absence indicates high air pollution. They are used as bioindicators of air quality.',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Which of the following is a characteristic feature of Cyanobacteria?',
    options: [
      'They can fix atmospheric nitrogen',
      'They have membrane-bound nucleus',
      'They reproduce sexually',
      'They lack photosynthetic pigments',
    ],
    correctAnswer: 'A',
    explanation:
      'Cyanobacteria (blue-green algae) can fix atmospheric N2 using nitrogenase in heterocysts. They are prokaryotic, reproduce asexually, and have photosynthetic pigments (chlorophyll a, phycocyanin).',
    source: 'NCERT Class 11, Chapter 2',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'Metagenesis is observed in:',
    options: [
      'Obelia (Cnidaria)',
      'Ascaris (Nematoda)',
      'Earthworm (Annelida)',
      'Cockroach (Arthropoda)',
    ],
    correctAnswer: 'A',
    explanation:
      'Metagenesis (alternation of generations) is seen in Obelia where asexual polyp and sexual medusa stages alternate. This is characteristic of many cnidarians.',
    source: 'NCERT Class 11, Chapter 4',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Diversity in Living World',
    question: 'The correct sequence of taxonomic categories is:',
    options: [
      'Species, Genus, Family, Order, Class, Phylum, Kingdom',
      'Kingdom, Phylum, Family, Order, Class, Genus, Species',
      'Species, Family, Genus, Order, Class, Phylum, Kingdom',
      'Species, Genus, Order, Family, Class, Phylum, Kingdom',
    ],
    correctAnswer: 'A',
    explanation:
      'Correct hierarchy from lower to higher: Species, Genus, Family, Order, Class, Phylum, Kingdom. Remember: King Philip Came Over For Good Soup.',
    source: 'NCERT Class 11, Chapter 1',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== STRUCTURAL ORGANISATION ==========
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Intercalary meristem is found in:',
    options: ['Grasses (at base of internodes)', 'Root tips', 'Shoot apices', 'Vascular cambium'],
    correctAnswer: 'A',
    explanation:
      'Intercalary meristem is found at base of internodes and leaf bases in grasses. It helps in regeneration of parts removed by grazing. Root/shoot tips have apical meristem.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Collenchyma differs from sclerenchyma in having:',
    options: [
      'Living cells with thickened corners',
      'Dead cells with lignified walls',
      'Living cells with thin walls',
      'Dead cells with cellulose walls',
    ],
    correctAnswer: 'A',
    explanation:
      'Collenchyma has living cells with unevenly thickened corners (pectin and cellulose). Sclerenchyma has dead cells with uniformly thick, lignified walls. Both provide mechanical support.',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'Casparian strips are found in the:',
    options: ['Endodermis of roots', 'Epidermis of leaves', 'Cortex of stem', 'Pith of roots'],
    correctAnswer: 'A',
    explanation:
      'Casparian strips are bands of suberin in radial and transverse walls of endodermal cells in roots. They regulate water and mineral movement into the stele (apoplast barrier).',
    source: 'NCERT Class 11, Chapter 6',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'In cockroach, the respiratory system consists of:',
    options: [
      'Tracheae opening through spiracles',
      'Gills for aquatic respiration',
      'Book lungs as in spiders',
      'Skin for diffusion',
    ],
    correctAnswer: 'A',
    explanation:
      'Cockroach has tracheal system for respiration. Air enters through 10 pairs of spiracles, passes through tracheae, tracheoles, and reaches tissues directly. No blood involvement in gas transport.',
    source: 'NCERT Class 11, Chapter 7',
    curriculum: 'CBSE',
    grade: '11',
  },
  {
    topic: 'Structural Organisation in Animals and Plants',
    question: 'The gizzard in cockroach is modified for:',
    options: [
      'Grinding food',
      'Absorption of nutrients',
      'Secretion of enzymes',
      'Storage of food',
    ],
    correctAnswer: 'A',
    explanation:
      'Gizzard (proventriculus) has thick cuticle and teeth for grinding food. Crop stores food. Midgut (hepatic caeca) secretes enzymes and absorbs nutrients.',
    source: 'NCERT Class 11, Chapter 7',
    curriculum: 'CBSE',
    grade: '11',
  },

  // ========== BIOLOGY AND HUMAN WELFARE ==========
  {
    topic: 'Biology and Human Welfare',
    question: 'Which of the following is caused by a protozoan?',
    options: ['Malaria', 'Typhoid', 'Tuberculosis', 'Common cold'],
    correctAnswer: 'A',
    explanation:
      'Malaria is caused by Plasmodium (protozoan). Typhoid by Salmonella typhi (bacteria), TB by Mycobacterium tuberculosis (bacteria), common cold by rhinovirus (virus).',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'ELISA test is used for detecting:',
    options: ['HIV antibodies', 'Blood glucose', 'Hemoglobin levels', 'Cholesterol'],
    correctAnswer: 'A',
    explanation:
      'ELISA (Enzyme-Linked Immunosorbent Assay) detects HIV antibodies in blood. It uses enzyme-linked antibodies for detection. Western blot confirms HIV diagnosis after positive ELISA.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'The causative organism of elephantiasis is:',
    options: [
      'Wuchereria bancrofti',
      'Plasmodium vivax',
      'Entamoeba histolytica',
      'Ascaris lumbricoides',
    ],
    correctAnswer: 'A',
    explanation:
      'Elephantiasis (filariasis) is caused by Wuchereria bancrofti/W. malayi transmitted by Culex mosquito. Parasites block lymphatic vessels causing limb swelling.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Interferons are:',
    options: [
      'Antiviral proteins produced by virus-infected cells',
      'Antibodies against bacteria',
      'Toxins produced by pathogens',
      'Enzymes that digest pathogens',
    ],
    correctAnswer: 'A',
    explanation:
      'Interferons are cytokines produced by virus-infected cells that protect nearby uninfected cells from viral infection. They do not kill viruses directly but make cells resistant.',
    source: 'NCERT Class 12, Chapter 8',
    curriculum: 'CBSE',
    grade: '12',
  },
  {
    topic: 'Biology and Human Welfare',
    question: 'Biofortification involves:',
    options: [
      'Breeding crops with higher nutrients',
      'Adding fertilizers to crops',
      'Genetic modification using foreign genes',
      'Organic farming practices',
    ],
    correctAnswer: 'A',
    explanation:
      'Biofortification is breeding crops for improved nutritional quality: higher vitamins, minerals, proteins. Examples: iron-fortified rice, protein-rich maize, vitamin A-rich golden rice (also GM).',
    source: 'NCERT Class 12, Chapter 9',
    curriculum: 'CBSE',
    grade: '12',
  },
]

async function generateHardQuestions() {
  console.log('Starting HARD question generation...\n')

  // Generate UUIDs and add required fields
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

  for (const q of questionsToInsert) {
    try {
      // Check for duplicates
      const existing = await prisma.questions.findFirst({
        where: {
          question: q.question,
          isActive: true,
        },
      })

      if (existing) {
        console.log(`Skipping duplicate: ${q.question.substring(0, 50)}...`)
        continue
      }

      await prisma.questions.create({
        data: q,
      })

      inserted++
      console.log(`Inserted: ${q.topic} - ${q.question.substring(0, 40)}...`)
    } catch (error) {
      console.error(`Error inserting: ${q.question.substring(0, 50)}...`, error)
      errors++
    }
  }

  console.log(`\n========== Summary ==========`)
  console.log(`Total questions: ${hardQuestions.length}`)
  console.log(`Inserted: ${inserted}`)
  console.log(`Errors: ${errors}`)
  console.log(`Skipped (duplicates): ${hardQuestions.length - inserted - errors}`)

  // Get new HARD count
  const hardCount = await prisma.questions.count({
    where: {
      difficulty: 'HARD',
      isActive: true,
    },
  })

  console.log(`\nTotal HARD questions in database: ${hardCount}`)
}

generateHardQuestions()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
