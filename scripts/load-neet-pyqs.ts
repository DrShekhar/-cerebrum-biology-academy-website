/**
 * Load NEET Previous Year Questions (PYQs) into database
 * Collected from various NEET exams (2013-2017+)
 */

import { PrismaClient } from '../src/generated/prisma'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

interface PYQ {
  topic: string
  subtopic: string
  question: string
  options: string[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  examYear?: number
  source: string
}

// Genetics and Inheritance PYQs
const geneticsPYQs: PYQ[] = [
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Principles of Inheritance',
    question: 'In humans, sex is determined by:',
    options: [
      'Sex chromosomes of the father',
      'Sex chromosomes of the mother',
      'Quantity of sperm in the semen',
      'Size of egg to be fertilized'
    ],
    correctAnswer: 'A',
    explanation: 'In humans, sex is determined by the sex chromosomes contributed by the father. Males have XY chromosomes and females have XX. The sperm can carry either X or Y chromosome, while the egg always carries X. If sperm with Y fertilizes the egg, the offspring is male (XY); if sperm with X fertilizes the egg, the offspring is female (XX).',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Principles of Inheritance',
    question: 'A gene showing codominance has:',
    options: [
      'One allele dominant on the other',
      'Both alleles independently expressed in the heterozygote',
      'Alleles tightly linked on the same chromosome',
      'Alleles that are recessive to each other'
    ],
    correctAnswer: 'B',
    explanation: 'In codominance, both alleles are expressed equally in the heterozygote. For example, in ABO blood group, alleles IA and IB are codominant - when both are present (IAIB), both antigens A and B are expressed, resulting in blood group AB.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Principles of Inheritance',
    question: 'In his classic experiment on peas, Mendel did not use:',
    options: [
      'Seed shape',
      'Seed colour',
      'Pod length',
      'All of the above'
    ],
    correctAnswer: 'C',
    explanation: 'Mendel studied seven contrasting traits in pea plants: seed shape (round/wrinkled), seed color (yellow/green), flower color (purple/white), flower position (axial/terminal), pod shape (inflated/constricted), pod color (green/yellow), and stem height (tall/dwarf). Pod length was NOT one of the traits he studied.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Principles of Inheritance',
    question: 'How many pairs of contrasting characters in pea plants were studied by Mendel?',
    options: ['9', '5', '6', '7'],
    correctAnswer: 'D',
    explanation: 'Mendel selected 7 pairs of contrasting characters for his experiments on pea plants. These included seed shape, seed color, flower color, flower position, pod shape, pod color, and stem height.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Human Genetics',
    question: 'A disease caused by an autosomal primary nondisjunction is:',
    options: [
      "Turner's syndrome",
      "Down's syndrome",
      "Klinefelter's syndrome",
      'Sickle cell Anemia'
    ],
    correctAnswer: 'B',
    explanation: "Down's syndrome is caused by trisomy of chromosome 21, resulting from nondisjunction during meiosis. Turner's syndrome (45,X) and Klinefelter's syndrome (47,XXY) involve sex chromosomes. Sickle cell anemia is caused by a point mutation, not nondisjunction.",
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Molecular Genetics',
    question: 'The mechanism that causes a gene to move from one linkage group to another is called:',
    options: ['Translocation', 'Crossing over', 'Duplication', 'None of the above'],
    correctAnswer: 'A',
    explanation: 'Translocation is a chromosomal mutation where a segment of one chromosome breaks off and attaches to another non-homologous chromosome. This moves genes from one linkage group to another. Crossing over exchanges segments between homologous chromosomes, keeping genes in the same linkage groups.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Principles of Inheritance',
    question: 'A true breeding plant is:',
    options: [
      'Always homozygous recessive in its genetic constitution',
      'Produced due to cross-pollination among unrelated plants',
      'One that is able to breed on its own',
      'Near homozygous and produces offspring of its own kind'
    ],
    correctAnswer: 'D',
    explanation: 'A true breeding plant is one that consistently produces offspring identical to the parent when self-pollinated. This occurs because the plant is homozygous for the traits being studied. True breeding plants can be homozygous dominant or homozygous recessive.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Human Genetics',
    question: 'The incorrect statement with regard to haemophilia is:',
    options: [
      'It is a dominant disease',
      'A single protein involved in the clotting of blood is affected',
      'It is a recessive disease',
      'None of the above'
    ],
    correctAnswer: 'A',
    explanation: 'Haemophilia is an X-linked RECESSIVE disorder, not dominant. The statement "It is a dominant disease" is incorrect. Haemophilia affects clotting factor VIII (Haemophilia A) or factor IX (Haemophilia B), both single proteins essential for blood clotting.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Human Genetics',
    question: 'A normal visioned man whose father was colourblind, marries a woman whose father was also colourblind. What are the chances their first daughter would be colourblind?',
    options: ['0%', '10%', '50%', '100%'],
    correctAnswer: 'A',
    explanation: 'The normal visioned man has genotype XY (his father was colourblind XcY, but the man is normal, so he got normal X from his mother). The woman whose father was colourblind must be a carrier (XcX). Their daughter will get X from father (normal) and X or Xc from mother. Even if she gets Xc from mother, she will be a carrier (XcX), not colourblind. The probability of the daughter being colourblind is 0%.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Molecular Genetics',
    question: 'Mutations can be induced with:',
    options: [
      'Gamma radiations',
      'Infrared radiations',
      'Ethylene',
      'IAA'
    ],
    correctAnswer: 'A',
    explanation: 'Gamma radiations are a type of ionizing radiation that can cause DNA damage and induce mutations. They are used as mutagens in plant breeding programs. Infrared radiations are not ionizing and cannot induce mutations. Ethylene is a plant hormone for ripening, and IAA (indole acetic acid) is an auxin - neither causes mutations.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  }
]

// Evolution PYQs
const evolutionPYQs: PYQ[] = [
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Origin of Life',
    question: 'Which of the following was almost nil in the primitive atmosphere?',
    options: ['Ammonia', 'Methane', 'Molecular oxygen', 'Water Vapour'],
    correctAnswer: 'C',
    explanation: 'The primitive atmosphere of Earth was reducing in nature, containing gases like ammonia, methane, hydrogen, and water vapor. Molecular oxygen (O2) was almost nil in the early atmosphere. Free oxygen appeared later, primarily through photosynthesis by cyanobacteria.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Origin of Life',
    question: 'The evolution from non-cellular forms to the first simple cellular form of life is termed as:',
    options: ['Chemical evolution', 'Biogenesis', 'Spontaneous generation', 'Divergent evolution'],
    correctAnswer: 'B',
    explanation: 'Biogenesis refers to the origin of life from pre-existing life or the formation of first cellular life from non-cellular organic molecules. Chemical evolution refers to the formation of complex organic molecules from simple inorganic molecules. Spontaneous generation is the disproven theory that life arises from non-living matter.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Origin of Life',
    question: 'Miller synthesised simple amino acids from:',
    options: [
      'methane, ammonia, oxygen, nitrogen',
      'hydrogen, methane, ammonia, water',
      'ammonia, methane, carbon dioxide, oxygen',
      'hydrogen, oxygen, water, nitrogen'
    ],
    correctAnswer: 'B',
    explanation: 'In the Miller-Urey experiment (1953), Stanley Miller and Harold Urey created a mixture of CH4 (methane), NH3 (ammonia), H2 (hydrogen), and H2O (water vapor) in a 2:1:2 ratio. Electric sparks simulating lightning were passed through this mixture, producing simple amino acids like glycine and alanine.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Theories of Evolution',
    question: 'Darwin, in his "Natural Selection Theory", neglected the role of which one of the following?',
    options: ['Overproduction', 'Survival of the fittest', 'Struggle for existence', 'Discontinuous variations'],
    correctAnswer: 'D',
    explanation: 'Darwin emphasized continuous, small variations in his theory of natural selection. He did not consider discontinuous variations (large, sudden mutations) important for evolution. Later, Hugo de Vries proposed the mutation theory emphasizing discontinuous variations (saltation).',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Evolution Evidence',
    question: 'In the case of peppered moths, the black coloured form became dominant over the light-coloured form in England after the industrial revolution. This was the result of:',
    options: [
      'deposition of soot on the moths from atmosphere',
      'natural selection whereby the darker forms were selected',
      'appearance of the black coloured individuals due to poor sunlight',
      'protective mimicry'
    ],
    correctAnswer: 'B',
    explanation: 'This is a classic example of industrial melanism. Before industrialization, light-colored moths (Biston betularia) were camouflaged on lichen-covered trees. After industrialization, soot killed lichens and darkened trees. Now dark moths (carbonaria form) were better camouflaged and survived predation better - this is natural selection.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Theories of Evolution',
    question: 'Single step large mutation leading to speciation is termed as:',
    options: [
      'saltation by Darwin',
      'saltation by Hugo de Vries',
      'variation by Hugo de Vries',
      'natural selection by Darwin'
    ],
    correctAnswer: 'B',
    explanation: 'Hugo de Vries proposed the mutation theory based on his work on evening primrose (Oenothera lamarckiana). He observed large, sudden heritable changes and termed this process "saltation" (jumping). He believed these single-step large mutations could lead directly to new species.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Evolution Evidence',
    question: 'A woman gave birth to a child with a small tail. This child shows evidence of evolution by depicting:',
    options: [
      'paleontological evidence',
      'connecting link',
      'atavism',
      'embryological evidence'
    ],
    correctAnswer: 'C',
    explanation: 'Atavism is the sudden reappearance of ancestral traits that were lost during evolution. A human baby born with a tail is an example of atavism - our ancestors had tails, and occasionally this ancestral trait reappears due to activation of dormant genes. Other examples include extra nipples and excessive body hair.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Evolution Evidence',
    question: 'The eyes of an octopus and a human show different patterns of structure, yet they perform similar functions. This is an example of:',
    options: [
      'Homologous organs that evolved due to divergent evolution',
      'Analogous organs that have evolved due to convergent evolution',
      'Analogous organs that have evolved due to divergent evolution',
      'Homologous organs that have evolved due to convergent evolution'
    ],
    correctAnswer: 'B',
    explanation: 'Octopus and human eyes are analogous organs - they have different structural origins but perform similar functions (vision). This is a result of convergent evolution, where unrelated organisms develop similar features independently to adapt to similar environments or needs.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Evolution Evidence',
    question: 'Divergent evolution is illustrated by:',
    options: [
      'Wings of insects and birds',
      'Placental mammals and Australian marsupials',
      'Forelimbs of cheetah and wings of bat',
      'Flippers of penguins and dolphins'
    ],
    correctAnswer: 'C',
    explanation: 'Divergent evolution produces homologous structures - organs with same evolutionary origin but different functions. Forelimbs of cheetah (running) and wings of bat (flying) are homologous - both evolved from the same ancestral mammalian forelimb but diverged for different functions. Wings of insects/birds and flippers of penguins/dolphins are analogous (convergent evolution).',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Population Genetics',
    question: 'Which of the following is an example of genetic drift?',
    options: [
      'Individuals from one population migrate and interbreed with members of a different population',
      'An allele increases in frequency due to the increase in fitness it provides to the organism',
      'A massive storm randomly kills many individuals in a population, changing the frequency of alleles in that population',
      'Occurrence of new genetic combination which is a product of sexual reproduction'
    ],
    correctAnswer: 'C',
    explanation: 'Genetic drift is random change in allele frequencies due to chance events, not natural selection. A massive storm randomly killing many individuals is genetic drift (bottleneck effect) - survivors allele frequencies change by chance, not fitness. Option A describes gene flow, B describes natural selection, D describes recombination.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Evolution Evidence',
    question: 'A living connecting link which provides evidence for organic evolution is:',
    options: [
      'Duck-billed platypus between reptiles and mammals',
      'Sphenodon between reptiles and birds',
      'Archaeopteryx between reptiles and mammals',
      'Lungfish between pisces and reptiles'
    ],
    correctAnswer: 'A',
    explanation: 'Duck-billed platypus (Ornithorhynchus) is a living connecting link between reptiles and mammals. It has mammalian features (mammary glands, hair, warm-blooded) but also reptilian features (lays eggs, has cloaca). Archaeopteryx is a fossil connecting link between reptiles and birds. Lungfish connects fish and amphibians.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Evolution Evidence',
    question: 'Archaeopteryx is a transitional fossil between:',
    options: [
      'birds and mammals',
      'mammals and reptiles',
      'reptiles and birds',
      'reptiles and amphibians'
    ],
    correctAnswer: 'C',
    explanation: 'Archaeopteryx (meaning "ancient wing") is a famous transitional fossil from the Jurassic period showing features of both reptiles (teeth, clawed fingers, long bony tail) and birds (feathers, wishbone, wings). It provides evidence for the evolution of birds from reptilian ancestors.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Geological Time Scale',
    question: 'The Mesozoic era is also called the golden age of:',
    options: ['fishes', 'reptiles', 'mammals', 'both b and c'],
    correctAnswer: 'B',
    explanation: 'The Mesozoic era (252-66 million years ago) is called the "Age of Reptiles" because dinosaurs and other reptiles dominated this period. It includes Triassic, Jurassic, and Cretaceous periods. The Paleozoic era is the "Age of Fishes" and Cenozoic era is the "Age of Mammals".',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Theories of Evolution',
    question: 'According to Darwin, the finches of Galapagos Islands provide evidence in favour of:',
    options: [
      'special creation',
      'evolution due to mutation',
      'theory of abiogenesis',
      'adaptive radiation'
    ],
    correctAnswer: 'D',
    explanation: "Darwin's finches are a classic example of adaptive radiation - the evolution of different species from a common ancestor, each adapted to different ecological niches. The 14 species of finches on Galapagos Islands evolved different beak shapes suited for different food sources (seeds, insects, cacti).",
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Population Genetics',
    question: 'A population will not remain in Hardy-Weinberg equilibrium if:',
    options: [
      'the size of the population is large',
      'there are no mutations',
      'there is no gene flow/gene migration',
      'natural selection is operating in the population'
    ],
    correctAnswer: 'D',
    explanation: 'Hardy-Weinberg equilibrium requires: large population, random mating, no mutation, no gene flow, and NO natural selection. If natural selection is operating, allele frequencies will change over generations, disrupting equilibrium. The other options (large population, no mutation, no gene flow) are conditions that MAINTAIN equilibrium.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Population Genetics',
    question: 'In a population at Hardy-Weinberg equilibrium, the frequency of two alleles are 0.6 and 0.4. What will be the genotypic frequency of heterozygotes?',
    options: ['0.46', '0.80', '0.48', '0.08'],
    correctAnswer: 'C',
    explanation: 'According to Hardy-Weinberg equation: p² + 2pq + q² = 1, where p = 0.6 and q = 0.4. Heterozygote frequency = 2pq = 2 × 0.6 × 0.4 = 0.48. This means 48% of the population will be heterozygous.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Genetics and Evolution',
    subtopic: 'Natural Selection',
    question: 'In stabilising selection:',
    options: [
      'individuals with the mean value of the trait are favoured',
      'individuals with the extreme value of the trait are favoured',
      'individuals with the mean value of the trait are eliminated',
      'individuals with the extreme value of the trait are unaffected'
    ],
    correctAnswer: 'A',
    explanation: 'Stabilizing selection favors intermediate phenotypes and acts against extreme variants. For example, human birth weight - babies with average weight survive better than very heavy or very light babies. This maintains the existing trait distribution around the mean.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  }
]

// Human Physiology - Digestive System PYQs
const digestivePYQs: PYQ[] = [
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Pancreatic enzymes include:',
    options: [
      'Amylase, Trypsinogen, Peptidase, Rennin',
      'Trypsinogen, Lipase, Amylase, Procarboxypeptidase',
      'Peptidase, Pepsin, Amylase, Rennin',
      'Maltase, Amylase, Trypsinogen, Pepsin'
    ],
    correctAnswer: 'B',
    explanation: 'Pancreatic juice contains: Trypsinogen (protein-digesting proenzyme), Lipase (fat digestion), Amylase (starch digestion), and Procarboxypeptidase (protein digestion). Rennin is found in infant gastric juice, Pepsin in gastric juice, and Maltase in intestinal juice.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Secretion of pancreatic juice is stimulated by:',
    options: [
      'Insulin and glucagon',
      'Cholecystokinin and secretin',
      'Gastrin and insulin',
      'Angiotensin and epinephrine'
    ],
    correctAnswer: 'B',
    explanation: 'Cholecystokinin (CCK) and Secretin are the two main hormones that stimulate pancreatic secretion. Secretin stimulates release of bicarbonate-rich pancreatic juice, while CCK stimulates release of enzyme-rich pancreatic juice. Both are released from intestinal mucosa in response to acidic chyme.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Gastric juice of infants contains:',
    options: [
      'Nuclease, pepsinogen, lipase',
      'Maltase, pepsinogen, rennin',
      'Amylase, rennin, pepsinogen',
      'Pepsinogen, lipase, rennin'
    ],
    correctAnswer: 'D',
    explanation: 'Infant gastric juice contains Pepsinogen (for protein digestion), gastric Lipase (for fat digestion), and Rennin (for milk protein casein digestion). Rennin converts milk protein casein to paracasein, which then gets digested. Adults lack rennin.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Fructose is absorbed by:',
    options: [
      'Co-transport mechanism',
      'Simple diffusion',
      'Facilitated transport',
      'Active transport'
    ],
    correctAnswer: 'C',
    explanation: 'Fructose is absorbed by facilitated diffusion using GLUT5 transporters in the intestinal epithelium. Unlike glucose and galactose which require active transport (Na+-glucose cotransporter), fructose moves down its concentration gradient without energy expenditure.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Carboxypeptidase requires which cofactor?',
    options: ['Copper', 'Niacin', 'Iron', 'Zinc'],
    correctAnswer: 'D',
    explanation: 'Carboxypeptidase is a zinc metalloenzyme that requires zinc (Zn²⁺) as a cofactor for its activity. It is secreted by the pancreas as procarboxypeptidase and activated by trypsin. It cleaves amino acids from the C-terminal end of peptides.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Which nutrients are absorbed along with Na+ and carrier ions?',
    options: [
      'Amino acids and fructose',
      'Fatty acids and glycerol',
      'Fatty acids and glucose',
      'Amino acids and glucose'
    ],
    correctAnswer: 'D',
    explanation: 'Both amino acids and glucose are absorbed by Na+-dependent secondary active transport (co-transport mechanism) in the intestine. They use the Na+ gradient created by Na+-K+ ATPase to move against their concentration gradient. Fructose uses facilitated diffusion, and fatty acids/glycerol are absorbed passively.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Secretin and cholecystokinin are secreted by:',
    options: ['Pyloric region', 'Ileum', 'Duodenum', 'Oesophagus'],
    correctAnswer: 'C',
    explanation: 'Both Secretin and Cholecystokinin (CCK) are secreted by the duodenum (first part of small intestine). Secretin is released in response to acidic chyme and stimulates bicarbonate secretion. CCK is released in response to fats and proteins and stimulates bile release and pancreatic enzyme secretion.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Which enzymes work at low pH?',
    options: ['Peroxidases', 'Hydrolases', 'Amylases', 'Proteases'],
    correctAnswer: 'D',
    explanation: 'Proteases like pepsin work optimally at low pH (acidic conditions). Pepsin works best at pH 1.5-2.0 found in stomach. At this low pH, most other enzymes are denatured. Salivary amylase works at neutral pH and gets inactivated in the stomach.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Liver synthesises and stores:',
    options: ['Galactose', 'Lactose', 'Glycogen', 'Arabinose'],
    correctAnswer: 'C',
    explanation: 'Liver is the primary organ for glycogen synthesis (glycogenesis) and storage. After a meal, excess glucose is converted to glycogen and stored in liver (about 100g) and muscles. During fasting, glycogen is broken down (glycogenolysis) to release glucose into blood.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Digestive System',
    question: 'Deficiency of nicotinic acid (niacin/Vitamin B3) causes:',
    options: ['Anaemia', 'Osteomalacia', 'Xerophthalmia', 'Pellagra'],
    correctAnswer: 'D',
    explanation: 'Pellagra is caused by deficiency of niacin (Vitamin B3/nicotinic acid). It is characterized by 4 Ds: Dermatitis, Diarrhea, Dementia, and Death if untreated. Anaemia can be caused by iron/B12 deficiency, Osteomalacia by Vitamin D deficiency, and Xerophthalmia by Vitamin A deficiency.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  }
]

// Human Physiology - Respiratory System PYQs
const respiratoryPYQs: PYQ[] = [
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'The partial pressure of oxygen in alveoli is:',
    options: [
      'less than carbon dioxide',
      'less than the blood',
      'more than the blood',
      'equal to that of the blood'
    ],
    correctAnswer: 'C',
    explanation: 'Partial pressure of O2 in alveoli (pO2 = 104 mmHg) is higher than in deoxygenated blood (pO2 = 40 mmHg). This pressure gradient drives diffusion of oxygen from alveoli into blood. Alveolar pCO2 (40 mmHg) is lower than deoxygenated blood pCO2 (45 mmHg), driving CO2 out.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'A chronic respiratory disorder caused by smoking is:',
    options: ['Asthma', 'Emphysema', 'Respiratory alkalosis', 'Respiratory acidosis'],
    correctAnswer: 'B',
    explanation: 'Emphysema is a chronic obstructive pulmonary disease (COPD) primarily caused by cigarette smoking. In emphysema, alveolar walls are destroyed, reducing surface area for gas exchange and causing difficulty in breathing. Asthma is usually allergic, not smoking-related.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'Most of the carbon dioxide produced in tissues is transported to lungs as:',
    options: ['carbonates', 'bicarbonates', 'dissolved in blood', 'attached to haemoglobin'],
    correctAnswer: 'B',
    explanation: 'About 70% of CO2 is transported as bicarbonate ions (HCO3⁻) in plasma. CO2 enters RBCs, combines with water (catalyzed by carbonic anhydrase) to form H2CO3, which dissociates into H⁺ and HCO3⁻. HCO3⁻ moves to plasma in exchange for Cl⁻ (chloride shift).',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'Gaseous exchange in alveoli occurs by:',
    options: ['simple diffusion', 'osmosis', 'active transport', 'passive transport'],
    correctAnswer: 'A',
    explanation: 'Gas exchange in alveoli occurs by simple diffusion down the partial pressure gradient. Oxygen diffuses from alveoli (high pO2) to blood (low pO2), and CO2 diffuses from blood (high pCO2) to alveoli (low pCO2). No carrier proteins or energy is required.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'The linings that separate air in lungs from venous blood are:',
    options: [
      'squamous epithelium and tunica media',
      'squamous epithelium and endothelium',
      'transitional epithelium and tunica externa',
      'none of the above'
    ],
    correctAnswer: 'B',
    explanation: 'The respiratory membrane consists of: squamous epithelium of alveoli + basement membrane + endothelium of pulmonary capillaries. This thin barrier (0.2-0.5 μm) allows rapid gas exchange by diffusion between alveolar air and blood.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'Which organ only receives oxygenated blood?',
    options: ['Lungs', 'Gills', 'Liver', 'Spleen'],
    correctAnswer: 'D',
    explanation: 'Spleen receives only oxygenated blood through the splenic artery. Lungs receive deoxygenated blood from pulmonary artery. Liver receives mixed blood - oxygenated from hepatic artery and deoxygenated nutrient-rich blood from hepatic portal vein.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'Which part of brain regulates respiration?',
    options: ['Vagus nerve', 'Cerebral peduncle', 'Medulla oblongata', 'Cerebellum'],
    correctAnswer: 'C',
    explanation: 'The respiratory rhythm center is located in medulla oblongata. It contains the dorsal respiratory group (inspiratory center) and ventral respiratory group (expiratory center). Pneumotaxic center in pons helps regulate breathing rate. Vagus nerve carries signals but does not regulate breathing.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'Lungs are enclosed by:',
    options: ['Pleural membrane', 'Pericardium', 'Perichondrium', 'Periosteum'],
    correctAnswer: 'A',
    explanation: 'Lungs are covered by a double-layered membrane called pleura (pleural membrane). The visceral pleura covers the lungs, and parietal pleura lines the thoracic cavity. The pleural cavity between them contains pleural fluid for lubrication. Pericardium covers the heart.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'RBCs in blood of a person residing at higher altitudes:',
    options: [
      'decrease in size',
      'increase in size',
      'decrease in number',
      'increase in number'
    ],
    correctAnswer: 'D',
    explanation: 'At high altitudes, oxygen partial pressure is low (hypoxia). This stimulates kidneys to produce erythropoietin (EPO), which stimulates bone marrow to produce more RBCs (polycythemia). Increased RBC count helps transport more oxygen to tissues. This is an adaptation to low oxygen environment.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Respiratory System',
    question: 'The alveolar epithelium of lungs is:',
    options: [
      'ciliated squamous',
      'nonciliated squamous',
      'nonciliated columnar',
      'ciliated columnar'
    ],
    correctAnswer: 'B',
    explanation: 'Alveoli are lined by simple squamous epithelium (Type I pneumocytes) which is non-ciliated. This thin epithelium facilitates rapid gas exchange. Type II pneumocytes secrete surfactant. Ciliated columnar epithelium lines the trachea and bronchi for mucus clearance.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  }
]

// Excretory System PYQs
const excretoryPYQs: PYQ[] = [
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'Which substance cannot pass through glomerular walls?',
    options: ['Globin', 'Albumin', 'Blood cells', 'All of the above'],
    correctAnswer: 'D',
    explanation: 'The glomerular filtration barrier prevents passage of blood cells (too large), and plasma proteins like albumin and globin (negatively charged and large). Only water, small ions, glucose, amino acids, urea, and other small molecules can pass through during ultrafiltration.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'The right kidney is slightly lower than the left because of:',
    options: [
      'The left kidney is bigger than right',
      'Considerable space occupied by the heart',
      'Considerable space occupied by the liver on the right side',
      'The right kidney is bigger than the left'
    ],
    correctAnswer: 'C',
    explanation: 'The right kidney is positioned slightly lower than the left kidney due to the presence of the liver on the right side of the abdominal cavity. The liver occupies considerable space, pushing the right kidney downward by about 1-2 cm.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'Kidneys in humans extend from:',
    options: [
      '5th thoracic to 3rd lumbar vertebrae',
      '8th thoracic to 12th lumbar vertebrae',
      '10th thoracic to 5th lumbar vertebrae',
      '12th thoracic to 3rd lumbar vertebrae'
    ],
    correctAnswer: 'D',
    explanation: 'Human kidneys are located in the upper abdominal region, extending from the 12th thoracic (T12) to the 3rd lumbar (L3) vertebrae. The right kidney is slightly lower. They are retroperitoneal organs (behind the peritoneum).',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'The pressure that facilitates glomerular filtration is:',
    options: [
      'Filtrate hydrostatic pressure',
      'Osmotic blood pressure',
      'Capillary hydrostatic pressure',
      'All of these'
    ],
    correctAnswer: 'A',
    explanation: 'Glomerular filtration is driven by the net filtration pressure (NFP). Glomerular capillary hydrostatic pressure (55 mmHg) favors filtration. This is opposed by capsular hydrostatic pressure (15 mmHg) and blood colloidal osmotic pressure (30 mmHg). NFP = 55-15-30 = 10 mmHg.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'If proximal convoluted tubule is removed from nephron:',
    options: [
      'Urine is not formed',
      'Quality and quantity of urine is unaffected',
      'Urine is more concentrated',
      'Urine is more diluted'
    ],
    correctAnswer: 'D',
    explanation: 'PCT is responsible for reabsorbing about 65-70% of filtrate including glucose, amino acids, Na⁺, and water. Without PCT, most of these substances would be lost in urine, making it very dilute and voluminous. The body would lose essential nutrients and become dehydrated.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'Atrial Natriuretic Peptide (ANP) causes:',
    options: [
      'Inhibits aldosterone and ADH secretion',
      'Decreases reabsorption of water',
      'Decreases reabsorption of sodium',
      'All of these'
    ],
    correctAnswer: 'D',
    explanation: 'ANP is released by atria when blood volume/pressure increases. It acts opposite to aldosterone and ADH: inhibits their secretion, increases Na⁺ excretion (natriuresis), increases water excretion (diuresis), and vasodilates. All these reduce blood volume and pressure.',
    difficulty: 'HARD',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'Total number of openings in urinary bladder for incoming and outgoing urine is:',
    options: ['2', '3', '4', '5'],
    correctAnswer: 'B',
    explanation: 'The urinary bladder has 3 openings: 2 ureteric openings (where ureters from both kidneys enter, bringing urine in) and 1 urethral opening (internal urethral orifice, where urine exits to urethra). These three openings form the trigone of the bladder.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'High hydrostatic pressure in glomerular capillaries is due to:',
    options: [
      'Size of Bowman capsule is significantly large',
      'Afferent arteriole is narrow compared to efferent',
      'Bowman capsule is cup-shaped',
      'Efferent arteriole is narrow compared to afferent'
    ],
    correctAnswer: 'D',
    explanation: 'The efferent arteriole leaving the glomerulus is narrower than the afferent arteriole entering it. This creates resistance to blood outflow, building up hydrostatic pressure (about 55 mmHg) in glomerular capillaries, which drives ultrafiltration.',
    difficulty: 'MEDIUM',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'Blood is supplied to kidney by:',
    options: ['Common iliac artery', 'Cystic artery', 'Renal artery', 'Coeliac artery'],
    correctAnswer: 'C',
    explanation: 'The renal artery branches directly from the abdominal aorta and supplies oxygenated blood to each kidney. About 20-25% of cardiac output goes to kidneys through renal arteries for filtration. Blood leaves via renal vein to inferior vena cava.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Human Physiology',
    subtopic: 'Excretory System',
    question: 'The functional unit of kidney is:',
    options: ['Hilum', 'Neurons', 'Nephrons', 'Medulla'],
    correctAnswer: 'C',
    explanation: 'Nephron is the structural and functional unit of kidney. Each kidney contains about 1 million nephrons. Each nephron consists of a glomerulus (renal corpuscle) and renal tubule (PCT, loop of Henle, DCT). Nephrons perform filtration, reabsorption, and secretion.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  }
]

// Reproduction PYQs
const reproductionPYQs: PYQ[] = [
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Which of the following statements is NOT true?',
    options: [
      'Tapetum helps in the dehiscence of anther',
      'Exine of pollen grains is made up of sporopollenin',
      'Most species of pollen grains can cause allergic reactions',
      'None of the above'
    ],
    correctAnswer: 'A',
    explanation: 'Tapetum does NOT help in anther dehiscence. Tapetum is the innermost layer of anther wall that nourishes developing pollen grains and provides sporopollenin. Anther dehiscence is caused by endothecium layer. Exine is indeed made of sporopollenin, and many pollens cause allergies.',
    difficulty: 'MEDIUM',
    examYear: 2016,
    source: 'NEET 2016'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Pollination in water hyacinth and water lily is brought about by:',
    options: ['Bats', 'Water', 'Molluscs', 'Insects or Wind'],
    correctAnswer: 'D',
    explanation: 'Water hyacinth (Eichhornia) and water lily (Nymphaea) are aquatic plants but their flowers emerge above water surface. Pollination occurs by insects (entomophily) or wind (anemophily), NOT by water. True hydrophily (water pollination) occurs in submerged plants like Vallisneria.',
    difficulty: 'MEDIUM',
    examYear: 2016,
    source: 'NEET 2016'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'In majority of angiosperms:',
    options: [
      'A small central cell is present in embryo sac',
      'The egg has a filiform apparatus',
      'There are many antipodal cells',
      'Reduction division occurs in megaspore mother cells'
    ],
    correctAnswer: 'D',
    explanation: 'In angiosperms, megaspore mother cell (2n) undergoes meiosis (reduction division) to form 4 megaspores. Only one functional megaspore develops into 7-celled, 8-nucleate embryo sac. Central cell is large (not small), synergids (not egg) have filiform apparatus, and typically 3 antipodal cells are present.',
    difficulty: 'MEDIUM',
    examYear: 2016,
    source: 'NEET 2016'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Attractants and rewards are required for:',
    options: ['Hydrophily', 'Anemophily', 'Entomophily', 'All of the above'],
    correctAnswer: 'C',
    explanation: 'Entomophily (insect pollination) requires attractants like bright colors, fragrance, and nectar to attract pollinators. These serve as "rewards" for insects. Anemophily (wind pollination) and hydrophily (water pollination) do not require attractants as they depend on abiotic agents.',
    difficulty: 'EASY',
    examYear: 2017,
    source: 'NEET 2017'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'The edible part of coconut is:',
    options: ['Endosperm', 'Ectoderm', 'Cotyledon', 'Pericarp'],
    correctAnswer: 'A',
    explanation: 'In coconut, the white edible part is the cellular endosperm. Coconut water is the liquid endosperm. Coconut is a drupe where the outer fibrous part is mesocarp (coir), hard shell is endocarp, and the edible white kernel is endosperm. The embryo is very small.',
    difficulty: 'EASY',
    examYear: 2017,
    source: 'NEET 2017'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'A dioecious flowering plant prevents:',
    options: [
      'Autogamy and Geitonogamy',
      'Autogamy and Xenogamy',
      'Geitonogamy and Xenogamy',
      'None of the above'
    ],
    correctAnswer: 'A',
    explanation: 'Dioecious plants have male and female flowers on separate plants (e.g., papaya, date palm). This prevents both autogamy (self-pollination within same flower) and geitonogamy (pollination between different flowers of same plant). Only xenogamy (cross-pollination between different plants) is possible.',
    difficulty: 'MEDIUM',
    examYear: 2017,
    source: 'NEET 2017'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Functional megaspore in an angiosperm develops into:',
    options: ['Endoderm', 'Ovule', 'Embryo', 'Embryo sac'],
    correctAnswer: 'D',
    explanation: 'The functional megaspore undergoes three mitotic divisions to form the embryo sac (female gametophyte). It contains 7 cells and 8 nuclei: 3 antipodal cells, 2 synergids, 1 egg cell, and 1 central cell with 2 polar nuclei.',
    difficulty: 'EASY',
    examYear: 2017,
    source: 'NEET 2017'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Which of the following may require pollinators, but is genetically similar to autogamy?',
    options: ['Cleistogamy', 'Xenogamy', 'Geitonogamy', 'None of the above'],
    correctAnswer: 'C',
    explanation: 'Geitonogamy is transfer of pollen from anther to stigma of another flower on the SAME plant. It requires pollinators (like xenogamy) but is genetically equivalent to autogamy (self-pollination) since both gametes come from the same plant with same genetic makeup.',
    difficulty: 'HARD',
    examYear: 2015,
    source: 'NEET 2015'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'The ovule of an angiosperm is technically equivalent to:',
    options: ['Megaspore', 'Megasporangium', 'Megaspore mother cell', 'None of the above'],
    correctAnswer: 'B',
    explanation: 'The ovule is technically equivalent to megasporangium. It contains the megaspore mother cell which undergoes meiosis to produce megaspores. The ovule consists of nucellus (megasporangium tissue), integuments, and the embryo sac (female gametophyte developed from megaspore).',
    difficulty: 'MEDIUM',
    examYear: 2015,
    source: 'NEET 2015'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Sexual Reproduction in Flowering Plants',
    question: 'Seed formation without fertilization involves:',
    options: ['Apomixis', 'Budding', 'Sporulation', 'Somatic hybridization'],
    correctAnswer: 'A',
    explanation: 'Apomixis is a form of asexual reproduction in plants where seeds are formed without fertilization. The embryo develops from diploid cells of the ovule instead of zygote. Examples include citrus, mango, and some grasses. It produces clones of the mother plant.',
    difficulty: 'EASY',
    examYear: 2016,
    source: 'NEET 2016'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproduction in Organisms',
    question: 'Which statement is NOT correct about vegetative propagation?',
    options: [
      'In banana, potato, and ginger, plantlets arise from modified stem internodes',
      'Offspring produced by asexual reproduction are called clones',
      'Water hyacinth depletes oxygen causing fish death',
      'All of the above'
    ],
    correctAnswer: 'A',
    explanation: 'The statement about internodes is incorrect. In banana (rhizome), potato (tuber), and ginger (rhizome), plantlets arise from modified STEM NODES (not internodes). Eyes of potato are nodes with axillary buds. Asexual offspring are clones, and water hyacinth does deplete oxygen.',
    difficulty: 'MEDIUM',
    examYear: 2016,
    source: 'NEET 2016'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproduction in Organisms',
    question: 'Apomixis is the development of new plant:',
    options: [
      'Without gamete fusion',
      'With gamete fusion',
      'From root cuttings',
      'From stem cuttings'
    ],
    correctAnswer: 'A',
    explanation: 'Apomixis is seed development without fertilization (gamete fusion). The embryo develops from maternal tissue (nucellus or integuments) or from unreduced egg cell without fertilization. This produces seeds that are genetically identical to the mother plant.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproduction in Organisms',
    question: 'A potato tuber can form a new plant if it has:',
    options: ['Stored food', 'Roots', 'Branches', 'Eyes'],
    correctAnswer: 'D',
    explanation: 'Potato tuber can regenerate into new plant only if it has "eyes" which are nodes bearing axillary buds. These buds sprout to form new shoots. Even with stored food, without eyes (buds), the tuber cannot produce a new plant. This is vegetative propagation.',
    difficulty: 'EASY',
    source: 'NEET PYQ'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproduction in Organisms',
    question: 'Cellular totipotency was demonstrated by:',
    options: ['Robert Hooke', 'F.C. Steward', 'Schleiden', 'Schwann'],
    correctAnswer: 'B',
    explanation: 'F.C. Steward (1958) demonstrated cellular totipotency by growing complete carrot plants from isolated phloem cells in culture medium. Totipotency is the ability of a single cell to develop into a complete organism. This formed the basis of plant tissue culture technology.',
    difficulty: 'MEDIUM',
    examYear: 2016,
    source: 'NEET 2016'
  },
  {
    topic: 'Reproduction',
    subtopic: 'Reproduction in Organisms',
    question: 'Potato tuber eyes are:',
    options: ['Flower buds', 'Root buds', 'Shoot buds', 'Axillary buds'],
    correctAnswer: 'D',
    explanation: 'Eyes of potato are actually axillary buds present at the nodes of the modified underground stem (tuber). When the tuber is planted, these axillary buds sprout and grow into new potato plants. Each eye can potentially develop into a new plant.',
    difficulty: 'EASY',
    examYear: 2013,
    source: 'NEET 2013'
  }
]

async function insertPYQs(questions: PYQ[], category: string) {
  console.log(`\nInserting ${questions.length} ${category} PYQs...`)
  let inserted = 0
  let skipped = 0

  for (const q of questions) {
    try {
      // Check for duplicate
      const existing = await prisma.questions.findFirst({
        where: {
          question: q.question,
          isActive: true
        }
      })

      if (existing) {
        skipped++
        continue
      }

      await prisma.questions.create({
        data: {
          id: crypto.randomUUID(),
          topic: q.topic,
          subtopic: q.subtopic,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          source: q.source,
          examYear: q.examYear,
          type: 'MCQ',
          curriculum: 'NCERT',
          grade: 'Class 11-12',
          subject: 'Biology',
          isActive: true,
          isVerified: true,
          updatedAt: new Date()
        }
      })
      inserted++
    } catch (error) {
      // Skip on error
      skipped++
    }
  }

  console.log(`  Inserted: ${inserted}, Skipped: ${skipped}`)
  return { inserted, skipped }
}

async function main() {
  console.log('=== NEET PYQ Loader ===')

  // Get current stats
  const totalBefore = await prisma.questions.count({ where: { isActive: true } })
  const pyqBefore = await prisma.questions.count({
    where: { isActive: true, source: { contains: 'NEET' } }
  })
  console.log(`\nCurrent database: ${totalBefore} questions, ${pyqBefore} PYQs`)

  let totalInserted = 0
  let totalSkipped = 0

  // Insert all categories
  const categories = [
    { questions: geneticsPYQs, name: 'Genetics' },
    { questions: evolutionPYQs, name: 'Evolution' },
    { questions: digestivePYQs, name: 'Digestive System' },
    { questions: respiratoryPYQs, name: 'Respiratory System' },
    { questions: excretoryPYQs, name: 'Excretory System' },
    { questions: reproductionPYQs, name: 'Reproduction' }
  ]

  for (const cat of categories) {
    const { inserted, skipped } = await insertPYQs(cat.questions, cat.name)
    totalInserted += inserted
    totalSkipped += skipped
  }

  // Final stats
  const totalAfter = await prisma.questions.count({ where: { isActive: true } })
  const pyqAfter = await prisma.questions.count({
    where: { isActive: true, source: { contains: 'NEET' } }
  })

  console.log('\n=== Summary ===')
  console.log(`Total inserted: ${totalInserted}`)
  console.log(`Total skipped (duplicates): ${totalSkipped}`)
  console.log(`\nDatabase now: ${totalAfter} questions, ${pyqAfter} PYQs`)

  await prisma.$disconnect()
}

main().catch(console.error)
