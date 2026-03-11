export interface BiologyDefinition {
  term: string
  slug: string
  definition: string
  category:
    | 'Cell Biology'
    | 'Genetics'
    | 'Ecology'
    | 'Human Physiology'
    | 'Plant Biology'
    | 'Evolution'
    | 'Biotechnology'
    | 'Microbiology'
  neetRelevance: 'High' | 'Medium' | 'Low'
  class: '11' | '12' | 'Both'
  keyPoints: string[]
  relatedTerms: string[]
  example?: string
  neetYearAsked?: string[]
  commonMistakes?: string[]
  quickRevisionNotes?: string[]
  metaTitle?: string
  metaDescription?: string
}

export const biologyDefinitions: BiologyDefinition[] = [
  {
    term: 'Mitosis',
    slug: 'mitosis',
    definition:
      'Mitosis is a type of cell division in which a single cell divides to produce two genetically identical daughter cells. It is the process by which the body grows and repairs damaged tissues. During mitosis, the chromosomes in the nucleus are separated into two identical sets, each going to one of the two daughter cells.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Produces two genetically identical daughter cells',
      'Consists of 4 phases: Prophase, Metaphase, Anaphase, Telophase',
      'Chromosome number remains the same (2n → 2n)',
      'Important for growth and repair',
      'Occurs in somatic cells only',
    ],
    relatedTerms: ['Meiosis', 'Cell Cycle', 'Cytokinesis', 'Chromosomes'],
    example: 'Skin cells dividing to heal a wound, or plant cells dividing at root tips',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2019'],
    commonMistakes: [
      'Confusing mitosis with meiosis — mitosis produces 2 identical diploid cells, meiosis produces 4 different haploid cells',
      'Thinking cytokinesis is a phase of mitosis — it is a separate process that follows mitosis',
      'Believing mitosis occurs in all cells — it does NOT occur in mature red blood cells or neurons',
    ],
    quickRevisionNotes: [
      'PMAT: Prophase → Metaphase → Anaphase → Telophase (remember as "Please Make Another Taco")',
      'Mitosis = equational division (2n → 2n), Meiosis = reductional (2n → n)',
      'Mitosis occurs in somatic cells for growth and repair; checkpoint control at G1, S, G2',
      'Cancer results from uncontrolled mitosis due to failed cell cycle checkpoints',
    ],
  },
  {
    term: 'Meiosis',
    slug: 'meiosis',
    definition:
      'Meiosis is a specialized type of cell division that reduces the chromosome number by half, resulting in four haploid daughter cells from one diploid parent cell. It occurs in germ cells and is essential for sexual reproduction, introducing genetic variation through crossing over and independent assortment.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Produces four genetically different haploid cells',
      'Involves two divisions: Meiosis I and Meiosis II',
      'Chromosome number is halved (2n → n)',
      'Occurs only in reproductive (germ) cells',
      'Crossing over introduces genetic variation',
    ],
    relatedTerms: ['Mitosis', 'Crossing Over', 'Gametes', 'Synapsis'],
    example: 'Formation of sperm and egg cells in humans',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
    commonMistakes: [
      'Confusing Meiosis I (reductional) with Meiosis II (equational) — crossing over occurs only in Prophase I',
      'Thinking independent assortment happens during Meiosis II — it occurs during Metaphase I',
      'Forgetting that Meiosis II is similar to mitosis but starts with haploid cells',
    ],
    quickRevisionNotes: [
      'Meiosis I: homologous chromosomes separate (reductional); Meiosis II: sister chromatids separate (equational)',
      'Crossing over in Prophase I creates recombinant chromosomes — key source of genetic variation',
      'Synapsis = pairing of homologous chromosomes; Chiasma = physical site of crossing over',
      'Non-disjunction in meiosis causes aneuploidies like Down syndrome (trisomy 21)',
    ],
  },
  {
    term: 'Photosynthesis',
    slug: 'photosynthesis',
    definition:
      'Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose. This process uses carbon dioxide and water as raw materials and releases oxygen as a byproduct. It occurs in chloroplasts and involves light-dependent and light-independent reactions.',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Overall equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂',
      'Occurs in chloroplasts containing chlorophyll',
      'Light reactions occur in thylakoids',
      'Calvin cycle (dark reactions) occurs in stroma',
      'Produces ATP and NADPH in light reactions',
    ],
    relatedTerms: ['Chlorophyll', 'Calvin Cycle', 'Light Reactions', 'C3 Plants', 'C4 Plants'],
    example: 'A leaf converting sunlight into sugars that the plant uses for energy',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Calling dark reactions "light-independent" does NOT mean they occur at night — they need ATP/NADPH from light reactions',
      'Confusing C3 (Calvin cycle in all plants) with C4 pathway (only in C4 plants like maize, sugarcane)',
      'Thinking oxygen comes from CO₂ — it comes from H₂O (proved by Hill reaction with heavy oxygen)',
    ],
    quickRevisionNotes: [
      'Light reactions: H₂O → O₂ + ATP + NADPH (in thylakoids); Calvin cycle: CO₂ → G3P → glucose (in stroma)',
      'PS II (P680) splits water; PS I (P700) reduces NADP⁺ — remember "II before I" in Z-scheme',
      'C4 plants fix CO₂ twice: first into OAA (mesophyll), then into Calvin cycle (bundle sheath)',
      'Factors affecting rate: light intensity, CO₂ concentration, temperature (Blackman law of limiting factors)',
    ],
  },
  {
    term: 'DNA Replication',
    slug: 'dna-replication',
    definition:
      'DNA replication is the biological process by which a DNA molecule makes an identical copy of itself. This semiconservative process ensures that genetic information is accurately transmitted from parent to daughter cells during cell division. Key enzymes include DNA polymerase, helicase, and ligase.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Semiconservative: each new DNA has one old and one new strand',
      "DNA polymerase adds nucleotides only in 5' to 3' direction",
      'Leading strand is synthesized continuously',
      'Lagging strand is synthesized as Okazaki fragments',
      'Helicase unwinds the double helix',
    ],
    relatedTerms: ['DNA Polymerase', 'Helicase', 'Okazaki Fragments', 'Replication Fork'],
    example:
      'DNA copying itself before a cell divides to ensure both daughter cells have complete genetic information',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Thinking replication is conservative — it is semiconservative (proved by Meselson-Stahl experiment)',
      'Confusing leading strand (continuous) with lagging strand (Okazaki fragments joined by ligase)',
      "Forgetting DNA polymerase can only add nucleotides 5'→3' and needs an RNA primer to start",
    ],
    quickRevisionNotes: [
      'Key enzymes: Helicase (unwinds), Primase (RNA primer), DNA Pol III (synthesis), Ligase (joins fragments)',
      'Semiconservative proved by Meselson-Stahl using ¹⁵N heavy nitrogen and CsCl density gradient',
      'Replication fork: leading strand = continuous, lagging strand = Okazaki fragments',
      'Replication is bidirectional from origin of replication (ori) in both prokaryotes and eukaryotes',
    ],
  },
  {
    term: 'Transcription',
    slug: 'transcription',
    definition:
      'Transcription is the first step of gene expression, where a segment of DNA is copied into RNA (specifically mRNA) by the enzyme RNA polymerase. This process occurs in the nucleus in eukaryotes and transfers genetic information from DNA to messenger RNA, which then carries the code to ribosomes for protein synthesis.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      "RNA polymerase synthesizes RNA in 5' to 3' direction",
      "Template strand of DNA is read 3' to 5'",
      'mRNA undergoes processing: capping, splicing, polyadenylation',
      'Occurs in nucleus (eukaryotes) or cytoplasm (prokaryotes)',
      'No primer required unlike DNA replication',
    ],
    relatedTerms: ['Translation', 'RNA Polymerase', 'mRNA', 'Promoter', 'Central Dogma'],
    example: 'The insulin gene being transcribed into mRNA in pancreatic beta cells',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
    commonMistakes: [
      "Confusing template strand (3'→5', read by RNA polymerase) with coding strand (5'→3', same as mRNA)",
      'Thinking transcription requires a primer — unlike replication, RNA polymerase does NOT need a primer',
      'Forgetting that in prokaryotes, transcription and translation are coupled (occur simultaneously)',
    ],
    quickRevisionNotes: [
      'Transcription unit: Promoter → Structural gene → Terminator; RNA Pol binds at promoter',
      "In eukaryotes: pre-mRNA undergoes capping (5'), splicing (intron removal), polyadenylation (3' poly-A tail)",
      'Prokaryotes: single RNA polymerase; Eukaryotes: RNA Pol I (rRNA), II (mRNA), III (tRNA)',
      'Central Dogma: DNA → RNA → Protein (exceptions: reverse transcription, RNA replication)',
    ],
  },
  {
    term: 'Translation',
    slug: 'translation',
    definition:
      'Translation is the process by which ribosomes decode the mRNA sequence into a polypeptide chain (protein). It involves transfer RNA (tRNA) molecules that bring specific amino acids to the ribosome, where they are joined together in the order specified by the mRNA codons. This occurs in the cytoplasm.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Occurs on ribosomes in the cytoplasm',
      'mRNA codons are read by tRNA anticodons',
      'Three phases: Initiation, Elongation, Termination',
      'Start codon is AUG (codes for methionine)',
      'Stop codons: UAA, UAG, UGA',
    ],
    relatedTerms: ['Transcription', 'Ribosomes', 'tRNA', 'Codon', 'Anticodon'],
    example: 'Ribosomes reading mRNA to produce hemoglobin protein in red blood cells',
    neetYearAsked: ['NEET 2024', 'NEET 2022', 'NEET 2020'],
    commonMistakes: [
      'Confusing codons (on mRNA) with anticodons (on tRNA) — they are complementary and antiparallel',
      'Thinking stop codons code for amino acids — UAA, UAG, UGA are termination signals with no tRNA',
      'Forgetting that AUG is both the start codon AND codes for methionine',
    ],
    quickRevisionNotes: [
      'Genetic code: 64 codons total — 61 sense codons + 3 stop codons (UAA, UAG, UGA)',
      'Wobble hypothesis: 3rd base of codon can pair non-standardly, allowing fewer tRNAs than codons',
      'Ribosome: small subunit (30S/40S) reads mRNA, large subunit (50S/60S) has peptidyl transferase',
      'Translation order: Initiation (AUG) → Elongation (peptide bonds) → Termination (stop codon + release factor)',
    ],
  },
  {
    term: 'Enzyme',
    slug: 'enzyme',
    definition:
      'An enzyme is a biological catalyst, typically a protein, that speeds up chemical reactions in living organisms without being consumed in the process. Enzymes lower the activation energy required for reactions and are highly specific, each acting on a particular substrate. They are essential for metabolism and virtually all cellular processes.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Most enzymes are proteins (some are RNA - ribozymes)',
      'Highly specific due to lock-and-key or induced fit model',
      'Have an active site where substrate binds',
      'Affected by pH, temperature, substrate concentration',
      'Can be inhibited competitively or non-competitively',
    ],
    relatedTerms: ['Substrate', 'Active Site', 'Catalyst', 'Activation Energy', 'Km'],
    example: 'Amylase in saliva breaking down starch into sugars',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Thinking enzymes are consumed in reactions — they are catalysts and are reused',
      'Confusing competitive inhibition (binds active site) with non-competitive (binds allosteric site)',
      'Assuming all enzymes are proteins — ribozymes are RNA molecules with catalytic activity',
    ],
    quickRevisionNotes: [
      'Lock-and-key model: rigid active site; Induced fit model: flexible active site molds around substrate',
      'Km (Michaelis constant) = substrate concentration at half Vmax; low Km = high enzyme affinity',
      'Optimal pH: pepsin (pH 2), trypsin (pH 8), salivary amylase (pH 6.8)',
      'Enzyme inhibitors in NEET: competitive (resembles substrate), non-competitive (changes enzyme shape)',
    ],
  },
  {
    term: 'Natural Selection',
    slug: 'natural-selection',
    definition:
      'Natural selection is the process by which organisms with favorable traits are more likely to survive and reproduce, passing these traits to the next generation. First proposed by Charles Darwin, it is the primary mechanism of evolution. Over time, beneficial traits become more common in a population while harmful traits decrease.',
    category: 'Evolution',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Requires variation, heritability, and differential reproduction',
      'Acts on phenotypes, not genotypes',
      'Can be stabilizing, directional, or disruptive',
      'Leads to adaptation and evolution',
      'Different from artificial selection (human-directed)',
    ],
    relatedTerms: ['Evolution', 'Adaptation', 'Fitness', 'Darwin', 'Speciation'],
    example:
      'Peppered moths: dark moths survived better in polluted areas, changing population color',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2020'],
    commonMistakes: [
      'Confusing natural selection with Lamarckism — acquired characters are NOT inherited',
      'Thinking natural selection creates new traits — it only selects from existing genetic variation',
      'Mixing up stabilizing (reduces variation), directional (shifts mean), and disruptive (splits population) selection',
    ],
    quickRevisionNotes: [
      "Darwin's 4 observations: variation exists, more offspring than survive, struggle for existence, survival of fittest",
      'Industrial melanism (peppered moth) is the classic example of directional selection',
      'Natural selection acts on phenotypes but changes genotype frequencies over generations',
      'Fitness = reproductive success, not just survival; measured by number of viable offspring',
    ],
  },
  {
    term: 'Homeostasis',
    slug: 'homeostasis',
    definition:
      'Homeostasis is the ability of an organism or cell to maintain internal stability by adjusting its physiological processes. It involves feedback mechanisms that detect changes and trigger responses to restore optimal conditions. Examples include temperature regulation, blood sugar control, and water balance.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Uses negative feedback loops primarily',
      'Involves receptor, control center, and effector',
      'Maintains stable internal environment despite external changes',
      'Controlled by nervous and endocrine systems',
      'Essential for survival of organisms',
    ],
    relatedTerms: ['Negative Feedback', 'Thermoregulation', 'Osmoregulation', 'Hormones'],
    example: 'Body maintaining 37°C temperature through sweating when hot or shivering when cold',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
    commonMistakes: [
      'Confusing negative feedback (restores normal) with positive feedback (amplifies change) — most homeostasis uses negative feedback',
      'Thinking homeostasis means constant conditions — it means dynamic equilibrium within a range',
      'Forgetting that positive feedback also exists in the body (e.g., blood clotting, childbirth contractions)',
    ],
    quickRevisionNotes: [
      'Negative feedback loop: Stimulus → Receptor → Control center → Effector → Response (opposes stimulus)',
      'Thermoregulation: hypothalamus is the thermostat; sweating/vasodilation (hot), shivering/vasoconstriction (cold)',
      'Blood sugar: insulin (lowers glucose), glucagon (raises glucose) — both from pancreatic islets',
      'Osmoregulation: ADH from posterior pituitary increases water reabsorption in collecting ducts',
    ],
  },
  {
    term: 'Osmosis',
    slug: 'osmosis',
    definition:
      'Osmosis is the movement of water molecules from a region of lower solute concentration to a region of higher solute concentration through a semipermeable membrane. It is a special type of diffusion that only involves water and continues until equilibrium is reached or opposed by other forces.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Water moves from hypotonic to hypertonic solution',
      'Requires a semipermeable membrane',
      'Isotonic solutions have no net water movement',
      'Creates osmotic pressure',
      'Important for plant turgor and cell function',
    ],
    relatedTerms: ['Diffusion', 'Tonicity', 'Turgor Pressure', 'Plasmolysis'],
    example: 'Plant roots absorbing water from soil, or red blood cells swelling in pure water',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2019'],
    commonMistakes: [
      'Confusing osmosis with diffusion — osmosis is specifically water movement through a semipermeable membrane',
      'Mixing up hypertonic (cell shrinks/plasmolysis) and hypotonic (cell swells/turgid) solutions',
      'Thinking osmosis requires energy — it is a passive process driven by water potential gradient',
    ],
    quickRevisionNotes: [
      'Water potential (Ψ) = Solute potential (Ψs) + Pressure potential (Ψp); water moves high Ψ → low Ψ',
      'Plant cell in hypotonic: turgid (wall pressure prevents lysis); Animal cell in hypotonic: lysis (no cell wall)',
      'Plasmolysis: cell membrane pulls away from cell wall in hypertonic solution — reversible (deplasmolysis)',
      'RBC in water: swells and bursts (hemolysis); in salt solution: shrinks (crenation)',
    ],
  },
  {
    term: 'Ecosystem',
    slug: 'ecosystem',
    definition:
      'An ecosystem is a community of living organisms (biotic factors) interacting with each other and their physical environment (abiotic factors) as a system. It includes energy flow through trophic levels and nutrient cycling. Ecosystems can range from a small pond to an entire forest or ocean.',
    category: 'Ecology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Includes biotic (living) and abiotic (non-living) components',
      'Energy flows unidirectionally through food chains',
      'Nutrients cycle through biogeochemical cycles',
      'Has producers, consumers, and decomposers',
      '10% energy transfer between trophic levels',
    ],
    relatedTerms: ['Food Chain', 'Food Web', 'Trophic Levels', 'Biodiversity', 'Biome'],
    example: 'A pond ecosystem with algae, fish, frogs, birds, and bacteria',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Confusing food chain (linear) with food web (interconnected) — real ecosystems have food webs',
      'Thinking 10% law means exactly 10% energy transfer — it is an approximation (Lindeman efficiency)',
      'Forgetting that decomposers act at every trophic level, not just at the end of the food chain',
    ],
    quickRevisionNotes: [
      'Energy flow: Sun → Producers → Primary consumers → Secondary → Tertiary (unidirectional, non-cyclic)',
      '10% rule (Lindeman): only ~10% energy transfers between trophic levels; rest lost as heat',
      'Ecological pyramids: energy pyramid always upright; biomass can be inverted (aquatic ecosystem)',
      'Biogeochemical cycles: carbon, nitrogen, phosphorus, water — nutrients cycle, energy flows',
    ],
  },
  {
    term: 'Biodiversity',
    slug: 'biodiversity',
    definition:
      'Biodiversity refers to the variety of life on Earth at all levels, from genes to ecosystems. It includes species diversity (number and variety of species), genetic diversity (variation within species), and ecosystem diversity (variety of habitats). Biodiversity is crucial for ecosystem stability and human welfare.',
    category: 'Ecology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Three levels: genetic, species, and ecosystem diversity',
      'Measured using alpha, beta, and gamma diversity',
      'Biodiversity hotspots have high endemism',
      'Threatened by habitat loss, pollution, and climate change',
      'India is one of 17 megadiverse countries',
    ],
    relatedTerms: ['Ecosystem', 'Conservation', 'Hotspots', 'Endemic Species', 'Extinction'],
    example: 'The Western Ghats with over 7,400 species of flowering plants',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
    commonMistakes: [
      'Confusing species diversity with genetic diversity — species = variety of species, genetic = variation within a species',
      'Thinking biodiversity hotspots only need high species count — they must also have high endemism AND threat',
      'Forgetting alpha (within habitat), beta (between habitats), and gamma (regional) diversity distinctions',
    ],
    quickRevisionNotes: [
      'India: 4 biodiversity hotspots — Western Ghats, Himalayas, Indo-Burma, Sundaland',
      'Species-area relationship: log S = log C + Z × log A (Z = 0.1–0.2 within continent, 0.6–1.2 for islands)',
      'IUCN Red List categories: Extinct → Critically Endangered → Endangered → Vulnerable → Near Threatened',
      'In-situ conservation: national parks, sanctuaries; Ex-situ: zoos, seed banks, botanical gardens',
    ],
  },
  {
    term: 'Respiration',
    slug: 'respiration',
    definition:
      'Cellular respiration is the metabolic process by which cells break down glucose and other organic molecules to produce ATP (energy). It occurs in three stages: glycolysis, the Krebs cycle, and oxidative phosphorylation. The overall process uses oxygen and produces carbon dioxide and water as byproducts.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Overall equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP',
      'Glycolysis occurs in cytoplasm (produces 2 ATP)',
      'Krebs cycle occurs in mitochondrial matrix',
      'ETC produces most ATP (34 ATP)',
      'Total yield: 36-38 ATP per glucose molecule',
    ],
    relatedTerms: ['ATP', 'Glycolysis', 'Krebs Cycle', 'Mitochondria', 'Fermentation'],
    example: 'Muscle cells breaking down glucose during exercise to produce energy',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Confusing aerobic respiration (with O₂, 36-38 ATP) with anaerobic/fermentation (without O₂, 2 ATP)',
      'Thinking glycolysis requires oxygen — glycolysis is anaerobic and occurs in cytoplasm',
      'Getting total ATP count wrong: 36-38 ATP (not 40) because of shuttle system variations',
    ],
    quickRevisionNotes: [
      'Glycolysis (cytoplasm): Glucose → 2 Pyruvate + 2 ATP + 2 NADH (Embden-Meyerhof pathway)',
      'Krebs cycle (matrix): 2 turns per glucose → 6 NADH + 2 FADH₂ + 2 GTP + 4 CO₂',
      'ETC (inner membrane): NADH → 3 ATP, FADH₂ → 2 ATP via chemiosmosis (ATP synthase)',
      'RQ (Respiratory Quotient): carbs = 1.0, fats = 0.7, proteins = 0.8; RQ = CO₂ evolved / O₂ consumed',
    ],
  },
  {
    term: 'Chlorophyll',
    slug: 'chlorophyll',
    definition:
      'Chlorophyll is the green pigment found in chloroplasts that is essential for photosynthesis. It absorbs light energy, particularly from red and blue wavelengths, and reflects green light (making plants appear green). Chlorophyll a is the primary pigment, while chlorophyll b is an accessory pigment.',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Located in thylakoid membranes of chloroplasts',
      'Chlorophyll a absorbs red (660nm) and blue (430nm) light',
      'Has a porphyrin ring with magnesium at center',
      'Chlorophyll a and b differ in one side group',
      'Works with accessory pigments (carotenoids, xanthophylls)',
    ],
    relatedTerms: ['Photosynthesis', 'Chloroplast', 'Absorption Spectrum', 'Carotenoids'],
    example:
      'Leaves turning yellow in autumn as chlorophyll breaks down and reveals other pigments',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2020'],
    commonMistakes: [
      'Confusing chlorophyll a (primary, blue-green) with chlorophyll b (accessory, yellow-green)',
      'Thinking chlorophyll absorbs green light — it reflects green, absorbs red and blue',
      'Forgetting that carotenoids and xanthophylls are accessory pigments that broaden absorption range',
    ],
    quickRevisionNotes: [
      'Chlorophyll a (P680 in PS II, P700 in PS I) is the primary photosynthetic pigment',
      'Absorption peaks: Chl a = 430nm (blue) + 660nm (red); Chl b = 455nm + 640nm',
      'Porphyrin ring with Mg²⁺ center; phytol tail anchors it in thylakoid membrane',
      'Autumn leaf color: chlorophyll degrades revealing yellow carotenoids and red anthocyanins',
    ],
  },
  {
    term: 'Chromosome',
    slug: 'chromosome',
    definition:
      "A chromosome is a thread-like structure of DNA and protein found in the nucleus of cells that carries genetic information. Humans have 46 chromosomes (23 pairs). During cell division, chromosomes condense and become visible under a microscope. They contain genes that determine an organism's traits.",
    category: 'Genetics',
    neetRelevance: 'High',
    class: 'Both',
    keyPoints: [
      'Made of DNA wrapped around histone proteins',
      'Humans have 46 chromosomes (23 pairs)',
      'Autosomes (44) and sex chromosomes (2)',
      'Each chromosome has a centromere',
      'Homologous chromosomes carry alleles for same genes',
    ],
    relatedTerms: ['DNA', 'Gene', 'Chromatin', 'Karyotype', 'Centromere'],
    example: 'Human sex chromosomes: XX in females, XY in males',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Confusing chromosome number with chromatid number — after S phase, each chromosome has 2 chromatids',
      'Mixing up autosomes (22 pairs) with sex chromosomes (1 pair) — total 23 pairs = 46 chromosomes',
      'Thinking centromere position is the same in all chromosomes — metacentric, submetacentric, acrocentric, telocentric',
    ],
    quickRevisionNotes: [
      'Humans: 46 chromosomes = 44 autosomes + 2 sex chromosomes (XX female, XY male)',
      'Chromatin (interphase, extended) → Chromosome (division, condensed); packaging: DNA → nucleosome → chromatin → chromosome',
      'Karyotype: arranged photograph of chromosomes; used to detect aneuploidies (Down, Turner, Klinefelter)',
      'Centromere types: Metacentric (V-shape), Submetacentric (L-shape), Acrocentric (J-shape), Telocentric (I-shape)',
    ],
  },
  {
    term: 'Mutation',
    slug: 'mutation',
    definition:
      'A mutation is a permanent change in the DNA sequence of an organism. Mutations can occur spontaneously or be induced by mutagens (radiation, chemicals). They can be beneficial, harmful, or neutral. Mutations are the ultimate source of genetic variation and drive evolution.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Can be point mutations or chromosomal mutations',
      'Point mutations: substitution, insertion, deletion',
      'Frameshift mutations change reading frame',
      "Silent mutations don't change amino acid",
      'Can be germline (heritable) or somatic (non-heritable)',
    ],
    relatedTerms: ['DNA', 'Gene', 'Mutagen', 'Evolution', 'Genetic Variation'],
    example: 'Sickle cell anemia caused by a single nucleotide change in hemoglobin gene',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Thinking all mutations are harmful — many are neutral, and some are beneficial (e.g., antibiotic resistance in bacteria)',
      'Confusing point mutations (single nucleotide) with chromosomal mutations (large-scale rearrangements)',
      'Forgetting that silent mutations change the codon but NOT the amino acid due to degeneracy of genetic code',
    ],
    quickRevisionNotes: [
      'Point mutations: Substitution (transition/transversion), Insertion, Deletion',
      'Frameshift: insertion or deletion shifts reading frame — usually more severe than substitution',
      'Sickle cell: GAG→GUG (Glu→Val at position 6 of β-globin) — classic NEET example',
      'Mutagens: UV light (thymine dimers), X-rays (chromosomal breaks), chemicals (base analogs like 5-BU)',
    ],
  },
  {
    term: 'ATP',
    slug: 'atp',
    definition:
      'ATP (Adenosine Triphosphate) is the primary energy currency of all living cells. It consists of adenine, ribose sugar, and three phosphate groups. Energy is released when ATP is hydrolyzed to ADP (adenosine diphosphate) and inorganic phosphate. ATP is continuously recycled in cells.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Made of adenine + ribose + 3 phosphate groups',
      'Energy stored in high-energy phosphate bonds',
      'ATP → ADP + Pi releases about 7.3 kcal/mol',
      'Produced mainly in mitochondria',
      'Used for all cellular work: mechanical, chemical, transport',
    ],
    relatedTerms: ['ADP', 'Respiration', 'Mitochondria', 'Photosynthesis', 'Energy'],
    example: 'Muscle contraction using ATP to power myosin movement along actin filaments',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Calling ATP a "high-energy molecule" — the energy is in the phosphoanhydride bonds, not ATP itself',
      'Confusing ATP (adenine + ribose + 3P) with GTP (guanine + ribose + 3P) — both are energy carriers',
      'Thinking ATP is stored in large amounts — cells contain only seconds worth; it is constantly recycled',
    ],
    quickRevisionNotes: [
      'Structure: Adenine (base) + Ribose (sugar) + 3 Phosphate groups = nucleotide triphosphate',
      'ATP → ADP + Pi releases ~30.5 kJ/mol (or ~7.3 kcal/mol) of free energy',
      'ATP production: substrate-level phosphorylation (glycolysis, Krebs) and oxidative phosphorylation (ETC)',
      'Uses: muscle contraction, active transport (Na⁺/K⁺ pump), biosynthesis, signal transduction',
    ],
  },
  {
    term: 'Antibody',
    slug: 'antibody',
    definition:
      'An antibody (immunoglobulin) is a Y-shaped protein produced by B cells of the immune system in response to foreign substances (antigens). Antibodies specifically recognize and bind to antigens, marking them for destruction by other immune cells. There are five classes: IgG, IgA, IgM, IgE, and IgD.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Y-shaped protein with two heavy and two light chains',
      'Variable region binds specific antigen',
      'Five classes: IgG (most common), IgA, IgM, IgE, IgD',
      'Part of humoral (antibody-mediated) immunity',
      'Produced by plasma cells (differentiated B cells)',
    ],
    relatedTerms: ['Antigen', 'B Cells', 'Immunity', 'Immunoglobulin', 'Vaccination'],
    example: 'IgE antibodies triggering allergic reactions when exposed to pollen',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Confusing antibody (produced by body) with antigen (foreign substance that triggers immune response)',
      'Mixing up humoral immunity (antibodies from B cells) with cell-mediated immunity (T cells)',
      'Thinking IgM is the most abundant — IgG is most abundant in blood; IgM is first to appear in primary response',
    ],
    quickRevisionNotes: [
      'Y-shape: 2 heavy chains + 2 light chains; variable region (antigen binding) + constant region (effector function)',
      'IgG: most abundant, crosses placenta; IgA: in secretions (milk, saliva); IgE: allergies; IgM: first responder (pentamer)',
      'Primary response: slow, low antibody (mainly IgM); Secondary response: fast, high antibody (mainly IgG)',
      'Monoclonal antibodies: produced from single B-cell clone; used in diagnostics and cancer treatment',
    ],
  },
  {
    term: 'Hormone',
    slug: 'hormone',
    definition:
      'A hormone is a chemical messenger produced by endocrine glands and transported through the bloodstream to target organs where it regulates physiological processes. Hormones can be proteins, steroids, or amino acid derivatives. They are essential for growth, metabolism, reproduction, and homeostasis.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Secreted by endocrine glands (ductless glands)',
      'Act on specific target cells with receptors',
      'Three types: peptide, steroid, and amine hormones',
      'Regulated by feedback mechanisms',
      'Examples: insulin, thyroxine, testosterone, estrogen',
    ],
    relatedTerms: ['Endocrine System', 'Gland', 'Receptor', 'Feedback', 'Insulin'],
    example: 'Insulin released by pancreas to lower blood glucose after a meal',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Confusing endocrine (ductless, blood transport) with exocrine (ducted, local secretion) glands',
      'Thinking all hormones are proteins — steroids (testosterone, estrogen) are lipid-derived, not proteins',
      'Mixing up the source glands: e.g., insulin from pancreas (not liver), thyroxine from thyroid (not parathyroid)',
    ],
    quickRevisionNotes: [
      'Peptide hormones: bind surface receptors (second messenger like cAMP); Steroid hormones: enter cell, bind nuclear receptors',
      'Key glands: Pituitary (master gland), Thyroid (T3/T4), Adrenal (cortisol/adrenaline), Pancreas (insulin/glucagon)',
      'Hypothalamus controls pituitary via releasing/inhibiting hormones — the "master of master gland"',
      'Diabetes: Type 1 (no insulin, autoimmune), Type 2 (insulin resistance) — both cause hyperglycemia',
    ],
  },
  {
    term: 'Neuron',
    slug: 'neuron',
    definition:
      'A neuron is a specialized cell that transmits nerve impulses (electrical signals) in the nervous system. It consists of a cell body (soma), dendrites (receive signals), and an axon (transmits signals). Neurons communicate with each other at synapses using neurotransmitters.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Three parts: cell body, dendrites, and axon',
      'Resting potential: -70mV',
      'Action potential propagates along axon',
      'Synaptic transmission uses neurotransmitters',
      'Types: sensory, motor, and interneurons',
    ],
    relatedTerms: ['Synapse', 'Axon', 'Dendrite', 'Neurotransmitter', 'Action Potential'],
    example: 'Motor neurons transmitting signals from brain to muscles for movement',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Confusing dendrites (receive signals) with axons (transmit signals away from cell body)',
      'Thinking nerve impulse is flow of electrons — it is flow of ions (Na⁺ in, K⁺ out) across membrane',
      'Forgetting that signal at synapse is chemical (neurotransmitters), not electrical',
    ],
    quickRevisionNotes: [
      'Resting potential: -70mV (K⁺ leak channels); Action potential: Na⁺ rushes in → depolarization to +30mV',
      'All-or-none principle: neuron either fires fully or not at all — no partial action potential',
      'Synapse: presynaptic → neurotransmitter (ACh, dopamine) → synaptic cleft → postsynaptic receptor',
      'Myelin sheath (Schwann cells in PNS, oligodendrocytes in CNS) → saltatory conduction at nodes of Ranvier',
    ],
  },
  {
    term: 'Plasmid',
    slug: 'plasmid',
    definition:
      'A plasmid is a small, circular, double-stranded DNA molecule found in bacteria and some eukaryotes. It replicates independently of chromosomal DNA. Plasmids are commonly used in genetic engineering as vectors to introduce foreign DNA into host cells and produce recombinant proteins.',
    category: 'Biotechnology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Small circular DNA, separate from chromosomal DNA',
      'Self-replicating (has origin of replication)',
      'Often carries antibiotic resistance genes',
      'Used as vectors in recombinant DNA technology',
      'Examples: pBR322, pUC series',
    ],
    relatedTerms: ['Vector', 'Recombinant DNA', 'Cloning', 'Bacteria', 'Gene Transfer'],
    example: 'pBR322 plasmid used to clone insulin gene for producing human insulin',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Confusing plasmids with chromosomal DNA — plasmids are extrachromosomal, circular, and self-replicating',
      'Thinking all bacteria have plasmids — plasmids are optional, not essential for bacterial survival',
      'Forgetting that plasmid vectors need selectable markers (antibiotic resistance genes) for screening',
    ],
    quickRevisionNotes: [
      'pBR322: first artificial plasmid vector; has ampR and tetR genes + multiple restriction sites',
      'Good vector needs: origin of replication, selectable marker, restriction sites, small size',
      'Insertional inactivation: foreign DNA inserted into antibiotic resistance gene → gene disrupted → screening',
      'Ti plasmid (Agrobacterium): natural plant genetic engineering vector; T-DNA integrates into plant genome',
    ],
  },
  {
    term: 'PCR',
    slug: 'pcr',
    definition:
      'PCR (Polymerase Chain Reaction) is a laboratory technique used to amplify specific DNA segments, creating millions of copies from a small sample. Invented by Kary Mullis in 1983, PCR uses thermal cycling with a heat-stable DNA polymerase (Taq polymerase) and specific primers.',
    category: 'Biotechnology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Three steps: Denaturation (94°C), Annealing (55-65°C), Extension (72°C)',
      'Uses Taq polymerase (from Thermus aquaticus)',
      'Requires primers, dNTPs, and template DNA',
      'Exponential amplification: 2^n copies after n cycles',
      'Applications: diagnosis, forensics, research',
    ],
    relatedTerms: ['DNA Amplification', 'Taq Polymerase', 'Primers', 'Thermal Cycler'],
    example: 'COVID-19 RT-PCR test amplifying viral RNA to detect infection',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Confusing the 3 steps: denaturation (separate strands) ≠ annealing (primers bind) ≠ extension (Taq adds nucleotides)',
      'Thinking any DNA polymerase works in PCR — only Taq polymerase survives the 94°C denaturation step',
      'Forgetting PCR needs TWO primers (forward and reverse) flanking the target sequence',
    ],
    quickRevisionNotes: [
      '3 steps per cycle: Denaturation (94°C) → Annealing (55-65°C) → Extension (72°C); ~30 cycles = 10⁹ copies',
      'Taq polymerase from Thermus aquaticus (hot springs bacterium) — thermostable, works at 72°C',
      'Applications: DNA fingerprinting, disease diagnosis, forensics, paternity testing, gene cloning',
      'RT-PCR: reverse transcriptase first converts RNA → cDNA, then PCR amplifies (used for COVID testing)',
    ],
  },
  {
    term: 'Xylem',
    slug: 'xylem',
    definition:
      'Xylem is the vascular tissue in plants that conducts water and dissolved minerals from roots to stems and leaves. It consists of tracheids, vessel elements, xylem fibers, and xylem parenchyma. The movement of water through xylem is driven by transpiration pull and root pressure.',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Conducts water and minerals upward (unidirectional)',
      'Dead at maturity (except xylem parenchyma)',
      'Tracheids and vessels are conducting elements',
      'Water movement by transpiration pull (cohesion-tension)',
      'Also provides mechanical support',
    ],
    relatedTerms: ['Phloem', 'Transpiration', 'Tracheids', 'Vessel Elements', 'Root Pressure'],
    example: 'Water rising 100+ meters in tall trees through xylem via transpiration pull',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Confusing xylem (water + minerals, upward) with phloem (food/sugars, bidirectional)',
      'Thinking all xylem cells are dead — xylem parenchyma is living',
      'Mixing up tracheids (primitive, all plants) and vessels (advanced, angiosperms only)',
    ],
    quickRevisionNotes: [
      'Components: Tracheids + Vessels (conducting, dead), Xylem parenchyma (living), Xylem fibers (support)',
      'Transpiration pull (cohesion-tension theory): most important force for water ascent in tall trees',
      'Root pressure: pushes water up at night/low transpiration; causes guttation (water droplets on leaf margins)',
      'Xylem is also called wood; secondary xylem = heartwood (dark, non-functional) + sapwood (light, functional)',
    ],
  },
  {
    term: 'Phloem',
    slug: 'phloem',
    definition:
      'Phloem is the vascular tissue that transports organic nutrients (mainly sucrose) from leaves to other parts of the plant. It consists of sieve tubes, companion cells, phloem fibers, and phloem parenchyma. Unlike xylem, phloem can transport in both directions (bidirectional).',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Transports organic food (sugars) - called translocation',
      'Living cells at maturity',
      'Sieve tubes lack nucleus, controlled by companion cells',
      'Bidirectional transport (source to sink)',
      'Movement explained by pressure flow hypothesis',
    ],
    relatedTerms: ['Xylem', 'Translocation', 'Sieve Tubes', 'Companion Cells', 'Source-Sink'],
    example: 'Sugars produced in leaves transported to growing fruits through phloem',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2020'],
    commonMistakes: [
      'Confusing phloem (food transport, bidirectional) with xylem (water transport, unidirectional upward)',
      'Thinking sieve tube elements are dead — they are living but lack nucleus (controlled by companion cells)',
      'Forgetting that phloem transport requires metabolic energy (active process via pressure flow)',
    ],
    quickRevisionNotes: [
      'Components: Sieve tubes + Companion cells (living), Phloem parenchyma (living), Phloem fibers (dead)',
      'Translocation: movement of organic solutes from source (leaves) to sink (roots, fruits, growing tips)',
      'Pressure flow hypothesis (Munch): high pressure at source, low at sink — drives mass flow through sieve tubes',
      'Companion cells have dense cytoplasm and many mitochondria — provide energy for sieve tube function',
    ],
  },
  {
    term: 'Genetic Drift',
    slug: 'genetic-drift',
    definition:
      'Genetic drift is the random change in allele frequencies in a population due to chance events, not natural selection. It has a stronger effect in small populations. Two types are founder effect (new population from few individuals) and bottleneck effect (population size drastically reduced).',
    category: 'Evolution',
    neetRelevance: 'Medium',
    class: '12',
    keyPoints: [
      'Random, non-adaptive evolutionary mechanism',
      'More significant in small populations',
      'Can lead to loss of genetic variation',
      'Founder effect: new colony from few individuals',
      'Bottleneck effect: population drastically reduced',
    ],
    relatedTerms: ['Evolution', 'Natural Selection', 'Allele Frequency', 'Founder Effect'],
    example:
      'Amish community having high frequency of Ellis-van Creveld syndrome due to founder effect',
    neetYearAsked: ['NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Confusing genetic drift (random, non-adaptive) with natural selection (non-random, adaptive)',
      'Thinking genetic drift only removes alleles — it can also fix (increase to 100%) neutral alleles randomly',
      'Mixing up founder effect (colonization) with bottleneck effect (population crash) — both reduce variation',
    ],
    quickRevisionNotes: [
      'Genetic drift is strongest in small populations — large populations are buffered against random changes',
      'Founder effect: Amish community with high Ellis-van Creveld syndrome frequency (classic NEET example)',
      'Bottleneck effect: cheetah population crash → very low genetic diversity today',
      'Hardy-Weinberg equilibrium assumes NO genetic drift (requires large population) — drift violates this',
    ],
  },
  {
    term: 'Nitrogen Fixation',
    slug: 'nitrogen-fixation',
    definition:
      'Nitrogen fixation is the conversion of atmospheric nitrogen (N₂) into ammonia (NH₃) or other usable nitrogen compounds. This can occur biologically (by bacteria like Rhizobium) or abiotically (lightning, industrial processes). It is essential for making nitrogen available to plants.',
    category: 'Ecology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Converts N₂ to NH₃ (ammonia)',
      'Biological fixation by Rhizobium, Azotobacter, cyanobacteria',
      'Rhizobium forms symbiosis with legume roots',
      'Nitrogenase enzyme requires anaerobic conditions',
      'Industrial fixation: Haber-Bosch process',
    ],
    relatedTerms: ['Nitrogen Cycle', 'Rhizobium', 'Legumes', 'Nitrification', 'Ammonia'],
    example: 'Rhizobium bacteria in root nodules of pea plants fixing atmospheric nitrogen',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Confusing nitrogen fixation (N₂ → NH₃) with nitrification (NH₃ → NO₂⁻ → NO₃⁻) — different processes, different bacteria',
      'Thinking all nitrogen-fixing bacteria are symbiotic — Azotobacter and Azospirillum are free-living',
      'Forgetting that nitrogenase enzyme is oxygen-sensitive — leghaemoglobin protects it in root nodules',
    ],
    quickRevisionNotes: [
      'Biological fixation: Rhizobium (symbiotic with legumes), Azotobacter (free-living), Anabaena/Nostoc (cyanobacteria)',
      'Nitrogenase: N₂ + 8H⁺ + 8e⁻ + 16 ATP → 2NH₃ + H₂ + 16 ADP — very energy expensive',
      'Nitrogen cycle: Fixation → Ammonification → Nitrification → Assimilation → Denitrification',
      'Root nodule formation: Rhizobium infects root hair → nod factors → nodule formation → leghemoglobin (pink color)',
    ],
  },
  {
    term: 'Vaccine',
    slug: 'vaccine',
    definition:
      'A vaccine is a biological preparation that provides active acquired immunity against a specific infectious disease. It contains weakened, killed, or parts of the pathogen that stimulate the immune system to produce antibodies and memory cells without causing the disease itself.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Provides active immunity (body makes own antibodies)',
      'Types: live attenuated, inactivated, subunit, mRNA',
      'Creates immunological memory',
      'Primary response followed by stronger secondary response',
      'Examples: polio (Sabin, Salk), COVID-19, MMR',
    ],
    relatedTerms: ['Immunity', 'Antibody', 'Antigen', 'Memory Cells', 'Immunization'],
    example: 'MMR vaccine providing immunity against measles, mumps, and rubella',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Confusing active immunity (vaccination, body makes antibodies) with passive immunity (antibody injection, short-lived)',
      'Thinking vaccines contain live dangerous pathogens — most use killed, attenuated, or subunit forms',
      'Forgetting that vaccines take time to work — immune memory develops over days to weeks',
    ],
    quickRevisionNotes: [
      'Types: Live attenuated (MMR, oral polio), Killed (rabies, injectable polio), Subunit (Hepatitis B), mRNA (COVID)',
      'Primary response: slow, low IgM; Secondary response (booster): fast, high IgG — due to memory B and T cells',
      'Herd immunity: when enough population is vaccinated, even unvaccinated individuals are protected',
      'Edward Jenner: first vaccine (smallpox, 1796, using cowpox) — "vacca" = cow in Latin',
    ],
  },
  {
    term: 'Krebs Cycle',
    slug: 'krebs-cycle',
    definition:
      'The Krebs cycle (citric acid cycle or TCA cycle) is a series of chemical reactions in the mitochondrial matrix that completely oxidizes acetyl-CoA derived from carbohydrates, fats, and proteins. It produces CO₂, NADH, FADH₂, and ATP, connecting glycolysis to oxidative phosphorylation.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Occurs in mitochondrial matrix',
      'Starts with acetyl-CoA + oxaloacetate → citrate',
      'One turn produces: 3 NADH, 1 FADH₂, 1 GTP (ATP), 2 CO₂',
      'Oxaloacetate is regenerated (cycle)',
      'Also called citric acid cycle or TCA cycle',
    ],
    relatedTerms: ['Glycolysis', 'ETC', 'ATP', 'Mitochondria', 'Acetyl-CoA'],
    example: 'Complete oxidation of glucose involves two turns of Krebs cycle (one per pyruvate)',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
    commonMistakes: [
      'Confusing Krebs cycle location (mitochondrial matrix) with ETC (inner mitochondrial membrane)',
      'Getting the products wrong: one turn = 3 NADH + 1 FADH₂ + 1 GTP + 2 CO₂ (per acetyl-CoA)',
      'Forgetting that glucose produces 2 acetyl-CoA, so Krebs cycle runs TWICE per glucose molecule',
    ],
    quickRevisionNotes: [
      'Acetyl-CoA (2C) + Oxaloacetate (4C) → Citrate (6C) → series of reactions → OAA regenerated',
      'Key intermediates: Citrate → Isocitrate → α-Ketoglutarate → Succinyl-CoA → Succinate → Fumarate → Malate → OAA',
      'Per glucose: 2 turns × (3 NADH + 1 FADH₂ + 1 GTP) = 6 NADH + 2 FADH₂ + 2 GTP',
      'Also called TCA (tricarboxylic acid) cycle — citrate has 3 carboxyl groups; discovered by Hans Krebs',
    ],
  },
  {
    term: 'Mendelian Inheritance',
    slug: 'mendelian-inheritance',
    definition:
      'Mendelian inheritance refers to the patterns of inheritance discovered by Gregor Mendel through his pea plant experiments. It includes the Law of Segregation (alleles separate during gamete formation) and the Law of Independent Assortment (genes for different traits are inherited independently).',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Based on experiments with garden peas',
      'Law of Dominance: dominant allele masks recessive',
      'Law of Segregation: alleles separate in gamete formation',
      'Law of Independent Assortment: genes inherited independently',
      'Monohybrid ratio: 3:1, Dihybrid ratio: 9:3:3:1',
    ],
    relatedTerms: ['Allele', 'Dominance', 'Punnett Square', 'Genotype', 'Phenotype'],
    example: 'Tall (TT) × short (tt) pea plants producing all tall F1, and 3:1 ratio in F2',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
    commonMistakes: [
      'Thinking independent assortment applies to linked genes — it only applies to genes on different chromosomes',
      'Confusing genotypic ratio (1:2:1) with phenotypic ratio (3:1) in monohybrid cross',
      "Forgetting that Mendel's laws have exceptions: incomplete dominance, codominance, epistasis, linkage",
    ],
    quickRevisionNotes: [
      'Monohybrid cross: Tt × Tt → 1TT : 2Tt : 1tt (phenotype 3:1); Dihybrid: 9:3:3:1',
      'Test cross: unknown dominant (T?) × homozygous recessive (tt) — if all tall = TT, if 1:1 = Tt',
      'Law of Segregation = alleles separate during gamete formation (Anaphase I of meiosis)',
      'Exceptions to Mendel: Incomplete dominance (1:2:1 pink snapdragons), Codominance (AB blood group), Epistasis',
    ],
  },
]

export function getDefinitionBySlug(slug: string): BiologyDefinition | undefined {
  return biologyDefinitions.find((d) => d.slug === slug)
}

export function getDefinitionsByCategory(
  category: BiologyDefinition['category']
): BiologyDefinition[] {
  return biologyDefinitions.filter((d) => d.category === category)
}

export function getDefinitionsByClass(classLevel: '11' | '12' | 'Both'): BiologyDefinition[] {
  return biologyDefinitions.filter((d) => d.class === classLevel || d.class === 'Both')
}

export function getHighRelevanceDefinitions(): BiologyDefinition[] {
  return biologyDefinitions.filter((d) => d.neetRelevance === 'High')
}

export const categories: BiologyDefinition['category'][] = [
  'Cell Biology',
  'Genetics',
  'Ecology',
  'Human Physiology',
  'Plant Biology',
  'Evolution',
  'Biotechnology',
  'Microbiology',
]
