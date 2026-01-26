/**
 * Generate HARD difficulty questions for Reproduction and Diversity in Living World
 * These are the two topics with lowest HARD question percentage
 *
 * Target: ~30 questions each to bring HARD % to ~12-15%
 */

import { PrismaClient } from '../src/generated/prisma'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

interface HardQuestion {
  topic: string
  subtopic: string
  question: string
  options: string[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  difficulty: 'HARD'
  source: string
  ncertClass?: number
  ncertChapter?: number
  isNeetImportant: boolean
}

// HARD questions for REPRODUCTION topic
const reproductionQuestions: HardQuestion[] = [
  // Sexual Reproduction in Flowering Plants
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question:
      'In angiosperms, the functional megaspore undergoes how many mitotic divisions to form the embryo sac?',
    options: [
      'Two divisions forming 4 nuclei',
      'Three divisions forming 8 nuclei',
      'Four divisions forming 16 nuclei',
      'One division forming 2 nuclei',
    ],
    correctAnswer: 'B',
    explanation:
      'The functional megaspore undergoes 3 successive mitotic divisions to form 8 nuclei. These 8 nuclei are arranged as: 3 at micropylar end (egg apparatus - 1 egg + 2 synergids), 3 at chalazal end (antipodals), and 2 polar nuclei in the center.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Which of the following is NOT a characteristic of wind-pollinated flowers?',
    options: [
      'Feathery stigma',
      'Large quantity of pollen',
      'Presence of nectar',
      'Light and non-sticky pollen',
    ],
    correctAnswer: 'C',
    explanation:
      'Wind-pollinated (anemophilous) flowers do NOT produce nectar as they do not need to attract insects. They have feathery stigma to catch pollen, produce large quantities of light, non-sticky pollen that can be carried by wind.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'The entry of pollen tube into the ovule through the micropyle is called:',
    options: ['Chalazogamy', 'Porogamy', 'Mesogamy', 'Apogamy'],
    correctAnswer: 'B',
    explanation:
      'Porogamy is the most common type of pollen tube entry where the tube enters through the micropyle. Chalazogamy is entry through chalaza (found in Casuarina). Mesogamy is entry through integuments.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'In a typical angiosperm embryo sac, which cells degenerate after fertilization?',
    options: [
      'Egg cell and polar nuclei',
      'Synergids and antipodals',
      'Only antipodals',
      'Central cell only',
    ],
    correctAnswer: 'B',
    explanation:
      'After double fertilization, the synergids (which helped guide the pollen tube) and antipodals (which may have nutritive function) degenerate. The egg cell develops into embryo, and the central cell develops into endosperm.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question:
      'Which type of ovule has the micropyle and chalaza in a straight line with the hilum?',
    options: ['Anatropous', 'Orthotropous', 'Campylotropous', 'Amphitropous'],
    correctAnswer: 'B',
    explanation:
      'In orthotropous (atropous) ovule, the body is erect and the micropyle, chalaza, and hilum lie in one vertical line. In anatropous ovule (most common), the body is inverted 180 degrees.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Parthenocarpy can be induced artificially by application of:',
    options: ['Ethylene only', 'Auxins and gibberellins', 'Abscisic acid', 'Cytokinins only'],
    correctAnswer: 'B',
    explanation:
      'Parthenocarpy (seedless fruit development without fertilization) can be induced by application of auxins (like IAA, 2,4-D) and gibberellins. These hormones mimic the hormonal changes that normally occur after fertilization.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question:
      'The innermost wall layer of microsporangium which nourishes the developing pollen grains is:',
    options: ['Epidermis', 'Endothecium', 'Middle layers', 'Tapetum'],
    correctAnswer: 'D',
    explanation:
      'Tapetum is the innermost nutritive layer of the microsporangium (anther wall). It provides nutrients to developing microspores/pollen grains and produces Ubisch bodies and pollenkitt.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Self-incompatibility in plants is primarily controlled by:',
    options: [
      'Cytoplasmic genes',
      'S-genes (multi-allelic)',
      'Environmental factors',
      'Mitochondrial DNA',
    ],
    correctAnswer: 'B',
    explanation:
      'Self-incompatibility is controlled by S-genes which are multi-allelic. The S-gene products on pollen and pistil interact, and if they match, pollen tube growth is inhibited, preventing self-fertilization.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'In polygonum type of embryo sac development, how many megaspores are functional?',
    options: ['All four', 'Three', 'Two', 'Only one'],
    correctAnswer: 'D',
    explanation:
      'In Polygonum type (most common, monosporic development), only one megaspore out of four is functional (usually chalazal), while three degenerate. This single functional megaspore develops into the 7-celled, 8-nucleate embryo sac.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Xenia refers to the effect of pollen on:',
    options: [
      'Embryo characteristics',
      'Endosperm characteristics',
      'Fruit wall characteristics',
      'Seed coat characteristics',
    ],
    correctAnswer: 'B',
    explanation:
      'Xenia is the immediate effect of pollen on endosperm characteristics (like color, shape). Since endosperm is formed by triple fusion involving one male gamete, pollen genes are expressed.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 2',
    ncertClass: 12,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  // Human Reproduction
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'The acrosomal reaction in human sperm is triggered by:',
    options: [
      'Contact with cervical mucus',
      'Binding to zona pellucida',
      'Entry into fallopian tube',
      'Capacitation in uterus',
    ],
    correctAnswer: 'B',
    explanation:
      'The acrosomal reaction is triggered when the sperm binds to ZP3 glycoprotein of zona pellucida. This causes release of acrosomal enzymes that help the sperm penetrate the zona pellucida.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'Which hormone is responsible for the LH surge that triggers ovulation?',
    options: [
      'High progesterone levels',
      'High estrogen levels',
      'Low FSH levels',
      'High inhibin levels',
    ],
    correctAnswer: 'B',
    explanation:
      'The LH surge is triggered by high estrogen levels (positive feedback). When estrogen reaches a threshold level, it causes a massive release of LH that triggers ovulation within 24-36 hours.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'The hormone hCG (human chorionic gonadotropin) is produced by:',
    options: ['Corpus luteum', 'Endometrium', 'Trophoblast of blastocyst', 'Pituitary gland'],
    correctAnswer: 'C',
    explanation:
      'hCG is produced by the trophoblast (outer layer) of the implanting blastocyst, later by the placenta. It maintains the corpus luteum and prevents menstruation. hCG detection is the basis of pregnancy tests.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'The zona pellucida is secreted by:',
    options: [
      'Granulosa cells only',
      'Oocyte only',
      'Both oocyte and granulosa cells',
      'Theca cells',
    ],
    correctAnswer: 'C',
    explanation:
      'The zona pellucida is secreted by both the oocyte and surrounding granulosa cells during follicular development. It contains glycoproteins ZP1, ZP2, ZP3, and ZP4.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'The process by which the morula transforms into blastocyst is called:',
    options: ['Compaction', 'Cavitation', 'Gastrulation', 'Implantation'],
    correctAnswer: 'B',
    explanation:
      'Cavitation (or blastulation) is the process where fluid accumulates in the intercellular spaces of the morula, forming a cavity called blastocoel. This transforms the solid morula into a hollow blastocyst.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question:
      'The corpus luteum secretes progesterone for approximately how many months if pregnancy occurs?',
    options: ['First month only', 'First 3-4 months', 'Entire pregnancy', 'First 6 months'],
    correctAnswer: 'B',
    explanation:
      'The corpus luteum is maintained by hCG and secretes progesterone for the first 3-4 months of pregnancy. After this, the placenta takes over progesterone production (luteal-placental shift).',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'Which cells in the testes produce testosterone?',
    options: ['Sertoli cells', 'Spermatogonia', 'Leydig cells', 'Primary spermatocytes'],
    correctAnswer: 'C',
    explanation:
      'Leydig cells (interstitial cells) located in the interstitial spaces between seminiferous tubules produce testosterone under LH stimulation. Sertoli cells provide nutrition to developing sperm.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'Menstrual flow occurs due to lack of which hormone(s)?',
    options: ['FSH and LH', 'Estrogen and progesterone', 'hCG only', 'Oxytocin and prolactin'],
    correctAnswer: 'B',
    explanation:
      'Menstrual flow (menstruation) occurs when estrogen and progesterone levels fall due to corpus luteum degeneration. This hormonal withdrawal causes the stratum functionalis of endometrium to break down and shed.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'The hormone responsible for milk ejection (let-down reflex) is:',
    options: ['Prolactin', 'Estrogen', 'Oxytocin', 'Progesterone'],
    correctAnswer: 'C',
    explanation:
      'Oxytocin, released from the posterior pituitary, causes contraction of myoepithelial cells around mammary alveoli, leading to milk ejection. Prolactin stimulates milk production, not ejection.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Human Reproduction',
    question: 'The structure that prevents polyspermy after fertilization is:',
    options: [
      'Acrosome',
      'Corona radiata',
      'Zona pellucida (after cortical reaction)',
      'Vitelline membrane',
    ],
    correctAnswer: 'C',
    explanation:
      'After the first sperm enters, the cortical reaction releases enzymes that modify zona pellucida proteins (ZP2 and ZP3), making it impenetrable to other sperm. This zona reaction is the primary block to polyspermy in mammals.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 3',
    ncertClass: 12,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  // Reproductive Health
  {
    topic: 'Reproduction',
    subtopic: 'Reproductive Health',
    question: 'IUDs like Copper-T primarily prevent pregnancy by:',
    options: [
      'Preventing ovulation',
      'Thickening cervical mucus',
      'Creating hostile environment for sperm and preventing implantation',
      'Blocking fallopian tubes',
    ],
    correctAnswer: 'C',
    explanation:
      'Copper-T releases copper ions that are toxic to sperm (spermicidal effect) and create an inflammatory reaction in the uterus that prevents implantation. It does not prevent ovulation.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 4',
    ncertClass: 12,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproductive Health',
    question: 'Emergency contraceptive pills are effective if taken within:',
    options: [
      '24 hours of unprotected intercourse',
      '72 hours of unprotected intercourse',
      '1 week of unprotected intercourse',
      'Any time before next menstruation',
    ],
    correctAnswer: 'B',
    explanation:
      'Emergency contraceptive pills (like levonorgestrel) are most effective within 72 hours (3 days) of unprotected intercourse, with declining efficacy after. They work by delaying ovulation or preventing implantation.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 4',
    ncertClass: 12,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproductive Health',
    question: 'GIFT (Gamete Intra Fallopian Transfer) differs from ZIFT in that:',
    options: [
      'GIFT uses frozen embryos',
      'In GIFT, fertilization occurs in the fallopian tube',
      'GIFT is used for male infertility only',
      'GIFT requires surrogate mother',
    ],
    correctAnswer: 'B',
    explanation:
      'In GIFT, unfertilized eggs and sperm are transferred to the fallopian tube where fertilization occurs naturally in vivo. In ZIFT, fertilization occurs in vitro and the zygote is transferred to the fallopian tube.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 4',
    ncertClass: 12,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproductive Health',
    question: 'Amniocentesis is a technique used for:',
    options: [
      'Treatment of infertility',
      'Detection of chromosomal abnormalities in fetus',
      'Artificial insemination',
      'In vitro fertilization',
    ],
    correctAnswer: 'B',
    explanation:
      'Amniocentesis involves withdrawing amniotic fluid to analyze fetal cells for chromosomal abnormalities (like Down syndrome), genetic disorders, and neural tube defects. It is a prenatal diagnostic technique.',
    difficulty: 'HARD',
    source: 'NCERT Class 12, Chapter 4',
    ncertClass: 12,
    ncertChapter: 4,
    isNeetImportant: true,
  },
]

// HARD questions for DIVERSITY IN LIVING WORLD topic
const diversityQuestions: HardQuestion[] = [
  // Biological Classification
  {
    topic: 'Diversity in Living World',
    subtopic: 'Biological Classification',
    question: 'Which of the following is NOT a characteristic of Archaebacteria?',
    options: [
      'Presence of peptidoglycan in cell wall',
      'Ability to survive extreme conditions',
      'Different ribosomal RNA sequences',
      'Presence of branched-chain lipids in membrane',
    ],
    correctAnswer: 'A',
    explanation:
      'Archaebacteria lack peptidoglycan in their cell walls (they have pseudopeptidoglycan). This distinguishes them from Eubacteria. They have unique membrane lipids with ether linkages and distinct rRNA sequences.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 2',
    ncertClass: 11,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Biological Classification',
    question: 'Heterocysts in cyanobacteria are specialized for:',
    options: ['Photosynthesis', 'Nitrogen fixation', 'Reproduction', 'Storage'],
    correctAnswer: 'B',
    explanation:
      'Heterocysts are thick-walled, specialized cells in filamentous cyanobacteria that lack PSII (no oxygen evolution) and contain nitrogenase enzyme for nitrogen fixation. The thick wall protects oxygen-sensitive nitrogenase.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 2',
    ncertClass: 11,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Biological Classification',
    question: 'Which of the following fungi belongs to Deuteromycetes (Fungi Imperfecti)?',
    options: ['Rhizopus', 'Penicillium', 'Agaricus', 'Puccinia'],
    correctAnswer: 'B',
    explanation:
      'Deuteromycetes include fungi where sexual reproduction is not known. Penicillium, Alternaria, and Trichoderma are examples. Rhizopus is Zygomycetes, Agaricus is Basidiomycetes, Puccinia is also Basidiomycetes.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 2',
    ncertClass: 11,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Biological Classification',
    question: 'The dikaryotic phase is most prolonged in:',
    options: ['Phycomycetes', 'Zygomycetes', 'Ascomycetes', 'Basidiomycetes'],
    correctAnswer: 'D',
    explanation:
      'In Basidiomycetes, the dikaryotic phase (n+n, two nuclei per cell) is the dominant, most prolonged phase. The dikaryotic mycelium can persist for years. In Ascomycetes, the dikaryotic phase is brief.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 2',
    ncertClass: 11,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Biological Classification',
    question: 'Which of the following protists have siliceous cell walls?',
    options: ['Dinoflagellates', 'Diatoms', 'Euglenoids', 'Slime moulds'],
    correctAnswer: 'B',
    explanation:
      'Diatoms (Chrysophytes) have cell walls made of silica (silicon dioxide), forming a two-part structure called frustule. These siliceous walls form diatomaceous earth deposits. Dinoflagellates have cellulose plates.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 2',
    ncertClass: 11,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Biological Classification',
    question: 'Mesosome in bacteria is associated with:',
    options: [
      'Photosynthesis only',
      'DNA replication and cell division',
      'Protein synthesis',
      'Lipid storage',
    ],
    correctAnswer: 'B',
    explanation:
      'Mesosomes are infoldings of the plasma membrane in bacteria. They are associated with DNA replication, cell wall formation during division, and respiration. They increase membrane surface area for these functions.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 2',
    ncertClass: 11,
    ncertChapter: 2,
    isNeetImportant: true,
  },
  // Plant Kingdom
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question:
      'Which algal group shows oogamous type of sexual reproduction with non-motile female gamete?',
    options: [
      'All Chlorophyceae',
      'All Phaeophyceae',
      'All Rhodophyceae',
      'Some members of all three',
    ],
    correctAnswer: 'C',
    explanation:
      'All Rhodophyceae (red algae) show oogamous reproduction with non-motile male gametes (spermatia) and non-motile female gametes. They completely lack flagellated cells at any stage.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question: 'The main plant body in bryophytes is:',
    options: ['Sporophyte', 'Gametophyte', 'Both equally dominant', 'Neither - it is a thallus'],
    correctAnswer: 'B',
    explanation:
      'In bryophytes, the gametophyte is the dominant, independent, photosynthetic phase. The sporophyte is dependent on the gametophyte for nutrition. This is opposite to higher plants where sporophyte is dominant.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question: 'Elaters are present in the capsule of:',
    options: ['Mosses', 'Liverworts', 'Hornworts', 'All bryophytes'],
    correctAnswer: 'B',
    explanation:
      'Elaters are hygroscopic, elongated cells with spiral thickenings found in liverwort capsules. They help in spore dispersal by their twisting movements. Mosses have peristome teeth instead.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question: 'Which pteridophyte is known as "horse tail"?',
    options: ['Selaginella', 'Lycopodium', 'Equisetum', 'Pteris'],
    correctAnswer: 'C',
    explanation:
      'Equisetum is called horse tail due to its branching pattern resembling a horses tail. It has jointed stems with whorled branches, reduced scale leaves, and rough texture due to silica deposits.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question: 'Heterospory is found in:',
    options: [
      'All pteridophytes',
      'Selaginella and Salvinia',
      'Only gymnosperms',
      'Only angiosperms',
    ],
    correctAnswer: 'B',
    explanation:
      'Heterospory (production of microspores and megaspores) is found in some pteridophytes like Selaginella, Salvinia, Marsilea, and Isoetes. It is a precursor to seed habit.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question: 'The male gametophyte in gymnosperms is represented by:',
    options: [
      'Entire pollen grain',
      'Prothallus',
      'Pollen tube with two male gametes',
      'Microspore mother cell',
    ],
    correctAnswer: 'C',
    explanation:
      'In gymnosperms, the male gametophyte is highly reduced and represented by the pollen grain which develops a pollen tube containing two non-motile male gametes (in most) or motile sperms (in Cycas, Ginkgo).',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question: 'Which of the following gymnosperms has the largest ovule?',
    options: ['Pinus', 'Cycas', 'Ginkgo', 'Ephedra'],
    correctAnswer: 'B',
    explanation:
      'Cycas has the largest ovule among gymnosperms (can be up to 6 cm). Cycas also has the largest egg cell, largest sperm (multiciliated), and shows primitive characters like motile male gametes.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Plant Kingdom',
    question: 'Double fertilization is unique to:',
    options: ['Gymnosperms', 'Pteridophytes', 'Angiosperms', 'All seed plants'],
    correctAnswer: 'C',
    explanation:
      'Double fertilization (syngamy + triple fusion) is unique to angiosperms. One male gamete fuses with egg forming zygote, another fuses with polar nuclei forming primary endosperm nucleus.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 3',
    ncertClass: 11,
    ncertChapter: 3,
    isNeetImportant: true,
  },
  // Animal Kingdom
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Which of the following combinations is correct regarding phylum Porifera?',
    options: [
      'Cellular level organization, intracellular digestion, no coelom',
      'Tissue level organization, extracellular digestion, pseudocoelom',
      'Organ system level, complete digestive system, coelom',
      'Organ level organization, intracellular digestion, coelom',
    ],
    correctAnswer: 'A',
    explanation:
      'Porifera (sponges) show cellular level of organization, intracellular digestion (in choanocytes), and are acoelomate. They have water canal system with ostia, osculum, and spongocoel.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Flame cells are excretory structures found in:',
    options: ['Annelida', 'Platyhelminthes', 'Mollusca', 'Arthropoda'],
    correctAnswer: 'B',
    explanation:
      'Flame cells (protonephridia) are the excretory structures in Platyhelminthes (flatworms). They have cilia that beat like a flickering flame. Annelids have nephridia, Arthropods have Malpighian tubules.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'True coelom is first seen in:',
    options: ['Platyhelminthes', 'Nematoda', 'Annelida', 'Cnidaria'],
    correctAnswer: 'C',
    explanation:
      'True coelom (lined by mesoderm on both sides) is first seen in Annelida. Platyhelminthes are acoelomate, Nematodes are pseudocoelomate. Cnidarians are diploblastic (no mesoderm).',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Which phylum shows metamerism (true segmentation)?',
    options: ['Mollusca', 'Echinodermata', 'Annelida', 'Porifera'],
    correctAnswer: 'C',
    explanation:
      'Annelids show true metamerism - external segmentation corresponding to internal segmentation with repetition of organs. Each segment has similar set of organs.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Which of the following is NOT a characteristic of phylum Arthropoda?',
    options: [
      'Jointed appendages',
      'Chitinous exoskeleton',
      'Open circulatory system',
      'Radial symmetry',
    ],
    correctAnswer: 'D',
    explanation:
      'Arthropods have bilateral symmetry (not radial). They have jointed appendages, chitinous exoskeleton, open circulatory system, and compound eyes. Radial symmetry is seen in adult echinoderms.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'The water vascular system is characteristic of:',
    options: ['Mollusca', 'Arthropoda', 'Echinodermata', 'Hemichordata'],
    correctAnswer: 'C',
    explanation:
      'The water vascular system is unique to Echinodermata (starfish, sea urchins). It consists of madreporite, stone canal, ring canal, radial canals, and tube feet for locomotion and food capture.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Notochord is present throughout life in:',
    options: [
      'All chordates',
      'Protochordata only',
      'Amphioxus (Branchiostoma)',
      'All vertebrates',
    ],
    correctAnswer: 'C',
    explanation:
      'Amphioxus (Branchiostoma), a cephalochordate, retains the notochord throughout life. In vertebrates, the notochord is replaced by vertebral column. In urochordates, it is present only in larval tail.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Which fish has cartilaginous endoskeleton and placoid scales?',
    options: ['Rohu', 'Catla', 'Shark', 'Hilsa'],
    correctAnswer: 'C',
    explanation:
      'Sharks belong to Chondrichthyes (cartilaginous fish) with cartilaginous endoskeleton, placoid scales, and no operculum. Rohu, Catla, and Hilsa are bony fish with bony skeleton and cycloid scales.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Which of the following is an egg-laying mammal?',
    options: ['Kangaroo', 'Platypus', 'Whale', 'Bat'],
    correctAnswer: 'B',
    explanation:
      'Platypus and Echidna are monotremes (Prototheria) - egg-laying mammals. They lay eggs but have mammary glands. Kangaroo is a marsupial, while Whale and Bat are placental mammals.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'Animal Kingdom',
    question: 'Four-chambered heart is found in:',
    options: [
      'Fish and amphibians',
      'Reptiles and birds',
      'Crocodiles, birds, and mammals',
      'All vertebrates except fish',
    ],
    correctAnswer: 'C',
    explanation:
      'Four-chambered heart (complete separation of oxygenated and deoxygenated blood) is found in crocodiles (among reptiles), all birds, and all mammals. Other reptiles have incompletely divided ventricle.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 4',
    ncertClass: 11,
    ncertChapter: 4,
    isNeetImportant: true,
  },
  // Taxonomy
  {
    topic: 'Diversity in Living World',
    subtopic: 'The Living World',
    question:
      'According to binomial nomenclature, the correct way to write the scientific name of mango is:',
    options: ['Mangifera Indica', 'mangifera indica', 'Mangifera indica', 'MANGIFERA INDICA'],
    correctAnswer: 'C',
    explanation:
      'According to ICBN rules, the generic name starts with capital letter and specific epithet with lowercase, both in italics (or underlined when handwritten). So it is Mangifera indica.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 1',
    ncertClass: 11,
    ncertChapter: 1,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'The Living World',
    question:
      'Type specimen that serves as the basis for original published description of a species is called:',
    options: ['Paratype', 'Holotype', 'Syntype', 'Neotype'],
    correctAnswer: 'B',
    explanation:
      'Holotype is the single specimen designated as the type by the original author. Paratype is additional specimen used in original description. Neotype is designated when original type is lost.',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 1',
    ncertClass: 11,
    ncertChapter: 1,
    isNeetImportant: true,
  },
  {
    topic: 'Diversity in Living World',
    subtopic: 'The Living World',
    question: 'The hierarchy of taxonomic categories in descending order is:',
    options: [
      'Kingdom, Phylum, Order, Class, Family, Genus, Species',
      'Kingdom, Phylum, Class, Order, Family, Genus, Species',
      'Kingdom, Division, Order, Class, Family, Genus, Species',
      'Kingdom, Class, Phylum, Order, Family, Species, Genus',
    ],
    correctAnswer: 'B',
    explanation:
      'The correct taxonomic hierarchy is: Kingdom, Phylum (Division for plants), Class, Order, Family, Genus, Species. Memory aid: "King Philip Came Over For Good Soup."',
    difficulty: 'HARD',
    source: 'NCERT Class 11, Chapter 1',
    ncertClass: 11,
    ncertChapter: 1,
    isNeetImportant: true,
  },
]

async function generateQuestionId(question: string): Promise<string> {
  const hash = crypto.createHash('md5').update(question).digest('hex').substring(0, 8)
  const timestamp = Date.now().toString(36)
  return `mcq_hard_${hash}_${timestamp}`
}

async function insertQuestions(questions: HardQuestion[]) {
  let inserted = 0
  let skipped = 0

  for (const q of questions) {
    // Check if similar question exists
    const existing = await prisma.questions.findFirst({
      where: {
        question: {
          contains: q.question.substring(0, 50),
        },
      },
    })

    if (existing) {
      skipped++
      continue
    }

    const id = await generateQuestionId(q.question)

    try {
      await prisma.questions.create({
        data: {
          id,
          topic: q.topic,
          subtopic: q.subtopic,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          source: q.source,
          curriculum: 'CBSE',
          grade: q.ncertClass?.toString() || '12',
          type: 'MCQ',
          isActive: true,
          isVerified: true,
          isNcertBased: true,
          isNeetImportant: q.isNeetImportant,
          ncertClass: q.ncertClass,
          ncertChapter: q.ncertChapter,
          marks: 4,
          timeLimit: 60,
          tags: [q.topic, q.subtopic, 'HARD', 'NEET'],
          totalAttempts: 0,
          correctAttempts: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
      inserted++

      if (inserted % 10 === 0) {
        console.log(`  Inserted ${inserted} questions...`)
      }
    } catch (error) {
      console.error(`Error inserting question: ${q.question.substring(0, 50)}...`)
      skipped++
    }
  }

  return { inserted, skipped }
}

async function main() {
  console.log('=== HARD Question Generator for Reproduction & Diversity ===\n')

  // Check current stats
  const currentStats = await prisma.$queryRaw<{ topic: string; total: bigint; hard: bigint }[]>`
    SELECT topic, COUNT(*) as total, COUNT(*) FILTER (WHERE difficulty = 'HARD') as hard
    FROM questions
    WHERE topic IN ('Reproduction', 'Diversity in Living World')
    GROUP BY topic
  `

  console.log('Current stats:')
  for (const stat of currentStats) {
    const hardPct =
      Number(stat.total) > 0 ? ((Number(stat.hard) / Number(stat.total)) * 100).toFixed(1) : '0'
    console.log(`  ${stat.topic}: ${stat.total} total, ${stat.hard} HARD (${hardPct}%)`)
  }

  console.log(`\nInserting ${reproductionQuestions.length} Reproduction HARD questions...`)
  const repResult = await insertQuestions(reproductionQuestions)
  console.log(`  Inserted: ${repResult.inserted}, Skipped: ${repResult.skipped}`)

  console.log(`\nInserting ${diversityQuestions.length} Diversity HARD questions...`)
  const divResult = await insertQuestions(diversityQuestions)
  console.log(`  Inserted: ${divResult.inserted}, Skipped: ${divResult.skipped}`)

  // Check new stats
  const newStats = await prisma.$queryRaw<{ topic: string; total: bigint; hard: bigint }[]>`
    SELECT topic, COUNT(*) as total, COUNT(*) FILTER (WHERE difficulty = 'HARD') as hard
    FROM questions
    WHERE topic IN ('Reproduction', 'Diversity in Living World')
    GROUP BY topic
  `

  console.log('\nNew stats:')
  for (const stat of newStats) {
    const hardPct =
      Number(stat.total) > 0 ? ((Number(stat.hard) / Number(stat.total)) * 100).toFixed(1) : '0'
    console.log(`  ${stat.topic}: ${stat.total} total, ${stat.hard} HARD (${hardPct}%)`)
  }

  console.log('\nDone!')
  await prisma.$disconnect()
}

main().catch(console.error)
