export interface BiologyDefinition {
  term: string
  slug: string
  definition: string
  category: 'Cell Biology' | 'Genetics' | 'Ecology' | 'Human Physiology' | 'Plant Biology' | 'Evolution' | 'Biotechnology' | 'Microbiology'
  neetRelevance: 'High' | 'Medium' | 'Low'
  class: '11' | '12' | 'Both'
  keyPoints: string[]
  relatedTerms: string[]
  example?: string
  neetYearAsked?: string[]
  metaTitle?: string
  metaDescription?: string
}

export const biologyDefinitions: BiologyDefinition[] = [
  {
    term: 'Mitosis',
    slug: 'mitosis',
    definition: 'Mitosis is a type of cell division in which a single cell divides to produce two genetically identical daughter cells. It is the process by which the body grows and repairs damaged tissues. During mitosis, the chromosomes in the nucleus are separated into two identical sets, each going to one of the two daughter cells.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Produces two genetically identical daughter cells',
      'Consists of 4 phases: Prophase, Metaphase, Anaphase, Telophase',
      'Chromosome number remains the same (2n → 2n)',
      'Important for growth and repair',
      'Occurs in somatic cells only'
    ],
    relatedTerms: ['Meiosis', 'Cell Cycle', 'Cytokinesis', 'Chromosomes'],
    example: 'Skin cells dividing to heal a wound, or plant cells dividing at root tips',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2019'],
  },
  {
    term: 'Meiosis',
    slug: 'meiosis',
    definition: 'Meiosis is a specialized type of cell division that reduces the chromosome number by half, resulting in four haploid daughter cells from one diploid parent cell. It occurs in germ cells and is essential for sexual reproduction, introducing genetic variation through crossing over and independent assortment.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Produces four genetically different haploid cells',
      'Involves two divisions: Meiosis I and Meiosis II',
      'Chromosome number is halved (2n → n)',
      'Occurs only in reproductive (germ) cells',
      'Crossing over introduces genetic variation'
    ],
    relatedTerms: ['Mitosis', 'Crossing Over', 'Gametes', 'Synapsis'],
    example: 'Formation of sperm and egg cells in humans',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
  },
  {
    term: 'Photosynthesis',
    slug: 'photosynthesis',
    definition: 'Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose. This process uses carbon dioxide and water as raw materials and releases oxygen as a byproduct. It occurs in chloroplasts and involves light-dependent and light-independent reactions.',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Overall equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂',
      'Occurs in chloroplasts containing chlorophyll',
      'Light reactions occur in thylakoids',
      'Calvin cycle (dark reactions) occurs in stroma',
      'Produces ATP and NADPH in light reactions'
    ],
    relatedTerms: ['Chlorophyll', 'Calvin Cycle', 'Light Reactions', 'C3 Plants', 'C4 Plants'],
    example: 'A leaf converting sunlight into sugars that the plant uses for energy',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'DNA Replication',
    slug: 'dna-replication',
    definition: 'DNA replication is the biological process by which a DNA molecule makes an identical copy of itself. This semiconservative process ensures that genetic information is accurately transmitted from parent to daughter cells during cell division. Key enzymes include DNA polymerase, helicase, and ligase.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Semiconservative: each new DNA has one old and one new strand',
      'DNA polymerase adds nucleotides only in 5\' to 3\' direction',
      'Leading strand is synthesized continuously',
      'Lagging strand is synthesized as Okazaki fragments',
      'Helicase unwinds the double helix'
    ],
    relatedTerms: ['DNA Polymerase', 'Helicase', 'Okazaki Fragments', 'Replication Fork'],
    example: 'DNA copying itself before a cell divides to ensure both daughter cells have complete genetic information',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'Transcription',
    slug: 'transcription',
    definition: 'Transcription is the first step of gene expression, where a segment of DNA is copied into RNA (specifically mRNA) by the enzyme RNA polymerase. This process occurs in the nucleus in eukaryotes and transfers genetic information from DNA to messenger RNA, which then carries the code to ribosomes for protein synthesis.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'RNA polymerase synthesizes RNA in 5\' to 3\' direction',
      'Template strand of DNA is read 3\' to 5\'',
      'mRNA undergoes processing: capping, splicing, polyadenylation',
      'Occurs in nucleus (eukaryotes) or cytoplasm (prokaryotes)',
      'No primer required unlike DNA replication'
    ],
    relatedTerms: ['Translation', 'RNA Polymerase', 'mRNA', 'Promoter', 'Central Dogma'],
    example: 'The insulin gene being transcribed into mRNA in pancreatic beta cells',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
  },
  {
    term: 'Translation',
    slug: 'translation',
    definition: 'Translation is the process by which ribosomes decode the mRNA sequence into a polypeptide chain (protein). It involves transfer RNA (tRNA) molecules that bring specific amino acids to the ribosome, where they are joined together in the order specified by the mRNA codons. This occurs in the cytoplasm.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Occurs on ribosomes in the cytoplasm',
      'mRNA codons are read by tRNA anticodons',
      'Three phases: Initiation, Elongation, Termination',
      'Start codon is AUG (codes for methionine)',
      'Stop codons: UAA, UAG, UGA'
    ],
    relatedTerms: ['Transcription', 'Ribosomes', 'tRNA', 'Codon', 'Anticodon'],
    example: 'Ribosomes reading mRNA to produce hemoglobin protein in red blood cells',
    neetYearAsked: ['NEET 2024', 'NEET 2022', 'NEET 2020'],
  },
  {
    term: 'Enzyme',
    slug: 'enzyme',
    definition: 'An enzyme is a biological catalyst, typically a protein, that speeds up chemical reactions in living organisms without being consumed in the process. Enzymes lower the activation energy required for reactions and are highly specific, each acting on a particular substrate. They are essential for metabolism and virtually all cellular processes.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Most enzymes are proteins (some are RNA - ribozymes)',
      'Highly specific due to lock-and-key or induced fit model',
      'Have an active site where substrate binds',
      'Affected by pH, temperature, substrate concentration',
      'Can be inhibited competitively or non-competitively'
    ],
    relatedTerms: ['Substrate', 'Active Site', 'Catalyst', 'Activation Energy', 'Km'],
    example: 'Amylase in saliva breaking down starch into sugars',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Natural Selection',
    slug: 'natural-selection',
    definition: 'Natural selection is the process by which organisms with favorable traits are more likely to survive and reproduce, passing these traits to the next generation. First proposed by Charles Darwin, it is the primary mechanism of evolution. Over time, beneficial traits become more common in a population while harmful traits decrease.',
    category: 'Evolution',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Requires variation, heritability, and differential reproduction',
      'Acts on phenotypes, not genotypes',
      'Can be stabilizing, directional, or disruptive',
      'Leads to adaptation and evolution',
      'Different from artificial selection (human-directed)'
    ],
    relatedTerms: ['Evolution', 'Adaptation', 'Fitness', 'Darwin', 'Speciation'],
    example: 'Peppered moths: dark moths survived better in polluted areas, changing population color',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2020'],
  },
  {
    term: 'Homeostasis',
    slug: 'homeostasis',
    definition: 'Homeostasis is the ability of an organism or cell to maintain internal stability by adjusting its physiological processes. It involves feedback mechanisms that detect changes and trigger responses to restore optimal conditions. Examples include temperature regulation, blood sugar control, and water balance.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Uses negative feedback loops primarily',
      'Involves receptor, control center, and effector',
      'Maintains stable internal environment despite external changes',
      'Controlled by nervous and endocrine systems',
      'Essential for survival of organisms'
    ],
    relatedTerms: ['Negative Feedback', 'Thermoregulation', 'Osmoregulation', 'Hormones'],
    example: 'Body maintaining 37°C temperature through sweating when hot or shivering when cold',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
  },
  {
    term: 'Osmosis',
    slug: 'osmosis',
    definition: 'Osmosis is the movement of water molecules from a region of lower solute concentration to a region of higher solute concentration through a semipermeable membrane. It is a special type of diffusion that only involves water and continues until equilibrium is reached or opposed by other forces.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Water moves from hypotonic to hypertonic solution',
      'Requires a semipermeable membrane',
      'Isotonic solutions have no net water movement',
      'Creates osmotic pressure',
      'Important for plant turgor and cell function'
    ],
    relatedTerms: ['Diffusion', 'Tonicity', 'Turgor Pressure', 'Plasmolysis'],
    example: 'Plant roots absorbing water from soil, or red blood cells swelling in pure water',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2019'],
  },
  {
    term: 'Ecosystem',
    slug: 'ecosystem',
    definition: 'An ecosystem is a community of living organisms (biotic factors) interacting with each other and their physical environment (abiotic factors) as a system. It includes energy flow through trophic levels and nutrient cycling. Ecosystems can range from a small pond to an entire forest or ocean.',
    category: 'Ecology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Includes biotic (living) and abiotic (non-living) components',
      'Energy flows unidirectionally through food chains',
      'Nutrients cycle through biogeochemical cycles',
      'Has producers, consumers, and decomposers',
      '10% energy transfer between trophic levels'
    ],
    relatedTerms: ['Food Chain', 'Food Web', 'Trophic Levels', 'Biodiversity', 'Biome'],
    example: 'A pond ecosystem with algae, fish, frogs, birds, and bacteria',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'Biodiversity',
    slug: 'biodiversity',
    definition: 'Biodiversity refers to the variety of life on Earth at all levels, from genes to ecosystems. It includes species diversity (number and variety of species), genetic diversity (variation within species), and ecosystem diversity (variety of habitats). Biodiversity is crucial for ecosystem stability and human welfare.',
    category: 'Ecology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Three levels: genetic, species, and ecosystem diversity',
      'Measured using alpha, beta, and gamma diversity',
      'Biodiversity hotspots have high endemism',
      'Threatened by habitat loss, pollution, and climate change',
      'India is one of 17 megadiverse countries'
    ],
    relatedTerms: ['Ecosystem', 'Conservation', 'Hotspots', 'Endemic Species', 'Extinction'],
    example: 'The Western Ghats with over 7,400 species of flowering plants',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2021'],
  },
  {
    term: 'Respiration',
    slug: 'respiration',
    definition: 'Cellular respiration is the metabolic process by which cells break down glucose and other organic molecules to produce ATP (energy). It occurs in three stages: glycolysis, the Krebs cycle, and oxidative phosphorylation. The overall process uses oxygen and produces carbon dioxide and water as byproducts.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Overall equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP',
      'Glycolysis occurs in cytoplasm (produces 2 ATP)',
      'Krebs cycle occurs in mitochondrial matrix',
      'ETC produces most ATP (34 ATP)',
      'Total yield: 36-38 ATP per glucose molecule'
    ],
    relatedTerms: ['ATP', 'Glycolysis', 'Krebs Cycle', 'Mitochondria', 'Fermentation'],
    example: 'Muscle cells breaking down glucose during exercise to produce energy',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Chlorophyll',
    slug: 'chlorophyll',
    definition: 'Chlorophyll is the green pigment found in chloroplasts that is essential for photosynthesis. It absorbs light energy, particularly from red and blue wavelengths, and reflects green light (making plants appear green). Chlorophyll a is the primary pigment, while chlorophyll b is an accessory pigment.',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Located in thylakoid membranes of chloroplasts',
      'Chlorophyll a absorbs red (660nm) and blue (430nm) light',
      'Has a porphyrin ring with magnesium at center',
      'Chlorophyll a and b differ in one side group',
      'Works with accessory pigments (carotenoids, xanthophylls)'
    ],
    relatedTerms: ['Photosynthesis', 'Chloroplast', 'Absorption Spectrum', 'Carotenoids'],
    example: 'Leaves turning yellow in autumn as chlorophyll breaks down and reveals other pigments',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2020'],
  },
  {
    term: 'Chromosome',
    slug: 'chromosome',
    definition: 'A chromosome is a thread-like structure of DNA and protein found in the nucleus of cells that carries genetic information. Humans have 46 chromosomes (23 pairs). During cell division, chromosomes condense and become visible under a microscope. They contain genes that determine an organism\'s traits.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: 'Both',
    keyPoints: [
      'Made of DNA wrapped around histone proteins',
      'Humans have 46 chromosomes (23 pairs)',
      'Autosomes (44) and sex chromosomes (2)',
      'Each chromosome has a centromere',
      'Homologous chromosomes carry alleles for same genes'
    ],
    relatedTerms: ['DNA', 'Gene', 'Chromatin', 'Karyotype', 'Centromere'],
    example: 'Human sex chromosomes: XX in females, XY in males',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Mutation',
    slug: 'mutation',
    definition: 'A mutation is a permanent change in the DNA sequence of an organism. Mutations can occur spontaneously or be induced by mutagens (radiation, chemicals). They can be beneficial, harmful, or neutral. Mutations are the ultimate source of genetic variation and drive evolution.',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Can be point mutations or chromosomal mutations',
      'Point mutations: substitution, insertion, deletion',
      'Frameshift mutations change reading frame',
      'Silent mutations don\'t change amino acid',
      'Can be germline (heritable) or somatic (non-heritable)'
    ],
    relatedTerms: ['DNA', 'Gene', 'Mutagen', 'Evolution', 'Genetic Variation'],
    example: 'Sickle cell anemia caused by a single nucleotide change in hemoglobin gene',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'ATP',
    slug: 'atp',
    definition: 'ATP (Adenosine Triphosphate) is the primary energy currency of all living cells. It consists of adenine, ribose sugar, and three phosphate groups. Energy is released when ATP is hydrolyzed to ADP (adenosine diphosphate) and inorganic phosphate. ATP is continuously recycled in cells.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Made of adenine + ribose + 3 phosphate groups',
      'Energy stored in high-energy phosphate bonds',
      'ATP → ADP + Pi releases about 7.3 kcal/mol',
      'Produced mainly in mitochondria',
      'Used for all cellular work: mechanical, chemical, transport'
    ],
    relatedTerms: ['ADP', 'Respiration', 'Mitochondria', 'Photosynthesis', 'Energy'],
    example: 'Muscle contraction using ATP to power myosin movement along actin filaments',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Antibody',
    slug: 'antibody',
    definition: 'An antibody (immunoglobulin) is a Y-shaped protein produced by B cells of the immune system in response to foreign substances (antigens). Antibodies specifically recognize and bind to antigens, marking them for destruction by other immune cells. There are five classes: IgG, IgA, IgM, IgE, and IgD.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Y-shaped protein with two heavy and two light chains',
      'Variable region binds specific antigen',
      'Five classes: IgG (most common), IgA, IgM, IgE, IgD',
      'Part of humoral (antibody-mediated) immunity',
      'Produced by plasma cells (differentiated B cells)'
    ],
    relatedTerms: ['Antigen', 'B Cells', 'Immunity', 'Immunoglobulin', 'Vaccination'],
    example: 'IgE antibodies triggering allergic reactions when exposed to pollen',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'Hormone',
    slug: 'hormone',
    definition: 'A hormone is a chemical messenger produced by endocrine glands and transported through the bloodstream to target organs where it regulates physiological processes. Hormones can be proteins, steroids, or amino acid derivatives. They are essential for growth, metabolism, reproduction, and homeostasis.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Secreted by endocrine glands (ductless glands)',
      'Act on specific target cells with receptors',
      'Three types: peptide, steroid, and amine hormones',
      'Regulated by feedback mechanisms',
      'Examples: insulin, thyroxine, testosterone, estrogen'
    ],
    relatedTerms: ['Endocrine System', 'Gland', 'Receptor', 'Feedback', 'Insulin'],
    example: 'Insulin released by pancreas to lower blood glucose after a meal',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Neuron',
    slug: 'neuron',
    definition: 'A neuron is a specialized cell that transmits nerve impulses (electrical signals) in the nervous system. It consists of a cell body (soma), dendrites (receive signals), and an axon (transmits signals). Neurons communicate with each other at synapses using neurotransmitters.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Three parts: cell body, dendrites, and axon',
      'Resting potential: -70mV',
      'Action potential propagates along axon',
      'Synaptic transmission uses neurotransmitters',
      'Types: sensory, motor, and interneurons'
    ],
    relatedTerms: ['Synapse', 'Axon', 'Dendrite', 'Neurotransmitter', 'Action Potential'],
    example: 'Motor neurons transmitting signals from brain to muscles for movement',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'Plasmid',
    slug: 'plasmid',
    definition: 'A plasmid is a small, circular, double-stranded DNA molecule found in bacteria and some eukaryotes. It replicates independently of chromosomal DNA. Plasmids are commonly used in genetic engineering as vectors to introduce foreign DNA into host cells and produce recombinant proteins.',
    category: 'Biotechnology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Small circular DNA, separate from chromosomal DNA',
      'Self-replicating (has origin of replication)',
      'Often carries antibiotic resistance genes',
      'Used as vectors in recombinant DNA technology',
      'Examples: pBR322, pUC series'
    ],
    relatedTerms: ['Vector', 'Recombinant DNA', 'Cloning', 'Bacteria', 'Gene Transfer'],
    example: 'pBR322 plasmid used to clone insulin gene for producing human insulin',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'PCR',
    slug: 'pcr',
    definition: 'PCR (Polymerase Chain Reaction) is a laboratory technique used to amplify specific DNA segments, creating millions of copies from a small sample. Invented by Kary Mullis in 1983, PCR uses thermal cycling with a heat-stable DNA polymerase (Taq polymerase) and specific primers.',
    category: 'Biotechnology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Three steps: Denaturation (94°C), Annealing (55-65°C), Extension (72°C)',
      'Uses Taq polymerase (from Thermus aquaticus)',
      'Requires primers, dNTPs, and template DNA',
      'Exponential amplification: 2^n copies after n cycles',
      'Applications: diagnosis, forensics, research'
    ],
    relatedTerms: ['DNA Amplification', 'Taq Polymerase', 'Primers', 'Thermal Cycler'],
    example: 'COVID-19 RT-PCR test amplifying viral RNA to detect infection',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Xylem',
    slug: 'xylem',
    definition: 'Xylem is the vascular tissue in plants that conducts water and dissolved minerals from roots to stems and leaves. It consists of tracheids, vessel elements, xylem fibers, and xylem parenchyma. The movement of water through xylem is driven by transpiration pull and root pressure.',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Conducts water and minerals upward (unidirectional)',
      'Dead at maturity (except xylem parenchyma)',
      'Tracheids and vessels are conducting elements',
      'Water movement by transpiration pull (cohesion-tension)',
      'Also provides mechanical support'
    ],
    relatedTerms: ['Phloem', 'Transpiration', 'Tracheids', 'Vessel Elements', 'Root Pressure'],
    example: 'Water rising 100+ meters in tall trees through xylem via transpiration pull',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Phloem',
    slug: 'phloem',
    definition: 'Phloem is the vascular tissue that transports organic nutrients (mainly sucrose) from leaves to other parts of the plant. It consists of sieve tubes, companion cells, phloem fibers, and phloem parenchyma. Unlike xylem, phloem can transport in both directions (bidirectional).',
    category: 'Plant Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Transports organic food (sugars) - called translocation',
      'Living cells at maturity',
      'Sieve tubes lack nucleus, controlled by companion cells',
      'Bidirectional transport (source to sink)',
      'Movement explained by pressure flow hypothesis'
    ],
    relatedTerms: ['Xylem', 'Translocation', 'Sieve Tubes', 'Companion Cells', 'Source-Sink'],
    example: 'Sugars produced in leaves transported to growing fruits through phloem',
    neetYearAsked: ['NEET 2023', 'NEET 2022', 'NEET 2020'],
  },
  {
    term: 'Genetic Drift',
    slug: 'genetic-drift',
    definition: 'Genetic drift is the random change in allele frequencies in a population due to chance events, not natural selection. It has a stronger effect in small populations. Two types are founder effect (new population from few individuals) and bottleneck effect (population size drastically reduced).',
    category: 'Evolution',
    neetRelevance: 'Medium',
    class: '12',
    keyPoints: [
      'Random, non-adaptive evolutionary mechanism',
      'More significant in small populations',
      'Can lead to loss of genetic variation',
      'Founder effect: new colony from few individuals',
      'Bottleneck effect: population drastically reduced'
    ],
    relatedTerms: ['Evolution', 'Natural Selection', 'Allele Frequency', 'Founder Effect'],
    example: 'Amish community having high frequency of Ellis-van Creveld syndrome due to founder effect',
    neetYearAsked: ['NEET 2022', 'NEET 2021'],
  },
  {
    term: 'Nitrogen Fixation',
    slug: 'nitrogen-fixation',
    definition: 'Nitrogen fixation is the conversion of atmospheric nitrogen (N₂) into ammonia (NH₃) or other usable nitrogen compounds. This can occur biologically (by bacteria like Rhizobium) or abiotically (lightning, industrial processes). It is essential for making nitrogen available to plants.',
    category: 'Ecology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Converts N₂ to NH₃ (ammonia)',
      'Biological fixation by Rhizobium, Azotobacter, cyanobacteria',
      'Rhizobium forms symbiosis with legume roots',
      'Nitrogenase enzyme requires anaerobic conditions',
      'Industrial fixation: Haber-Bosch process'
    ],
    relatedTerms: ['Nitrogen Cycle', 'Rhizobium', 'Legumes', 'Nitrification', 'Ammonia'],
    example: 'Rhizobium bacteria in root nodules of pea plants fixing atmospheric nitrogen',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'Vaccine',
    slug: 'vaccine',
    definition: 'A vaccine is a biological preparation that provides active acquired immunity against a specific infectious disease. It contains weakened, killed, or parts of the pathogen that stimulate the immune system to produce antibodies and memory cells without causing the disease itself.',
    category: 'Human Physiology',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Provides active immunity (body makes own antibodies)',
      'Types: live attenuated, inactivated, subunit, mRNA',
      'Creates immunological memory',
      'Primary response followed by stronger secondary response',
      'Examples: polio (Sabin, Salk), COVID-19, MMR'
    ],
    relatedTerms: ['Immunity', 'Antibody', 'Antigen', 'Memory Cells', 'Immunization'],
    example: 'MMR vaccine providing immunity against measles, mumps, and rubella',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'Krebs Cycle',
    slug: 'krebs-cycle',
    definition: 'The Krebs cycle (citric acid cycle or TCA cycle) is a series of chemical reactions in the mitochondrial matrix that completely oxidizes acetyl-CoA derived from carbohydrates, fats, and proteins. It produces CO₂, NADH, FADH₂, and ATP, connecting glycolysis to oxidative phosphorylation.',
    category: 'Cell Biology',
    neetRelevance: 'High',
    class: '11',
    keyPoints: [
      'Occurs in mitochondrial matrix',
      'Starts with acetyl-CoA + oxaloacetate → citrate',
      'One turn produces: 3 NADH, 1 FADH₂, 1 GTP (ATP), 2 CO₂',
      'Oxaloacetate is regenerated (cycle)',
      'Also called citric acid cycle or TCA cycle'
    ],
    relatedTerms: ['Glycolysis', 'ETC', 'ATP', 'Mitochondria', 'Acetyl-CoA'],
    example: 'Complete oxidation of glucose involves two turns of Krebs cycle (one per pyruvate)',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022'],
  },
  {
    term: 'Mendelian Inheritance',
    slug: 'mendelian-inheritance',
    definition: 'Mendelian inheritance refers to the patterns of inheritance discovered by Gregor Mendel through his pea plant experiments. It includes the Law of Segregation (alleles separate during gamete formation) and the Law of Independent Assortment (genes for different traits are inherited independently).',
    category: 'Genetics',
    neetRelevance: 'High',
    class: '12',
    keyPoints: [
      'Based on experiments with garden peas',
      'Law of Dominance: dominant allele masks recessive',
      'Law of Segregation: alleles separate in gamete formation',
      'Law of Independent Assortment: genes inherited independently',
      'Monohybrid ratio: 3:1, Dihybrid ratio: 9:3:3:1'
    ],
    relatedTerms: ['Allele', 'Dominance', 'Punnett Square', 'Genotype', 'Phenotype'],
    example: 'Tall (TT) × short (tt) pea plants producing all tall F1, and 3:1 ratio in F2',
    neetYearAsked: ['NEET 2024', 'NEET 2023', 'NEET 2022', 'NEET 2021'],
  },
]

export function getDefinitionBySlug(slug: string): BiologyDefinition | undefined {
  return biologyDefinitions.find(d => d.slug === slug)
}

export function getDefinitionsByCategory(category: BiologyDefinition['category']): BiologyDefinition[] {
  return biologyDefinitions.filter(d => d.category === category)
}

export function getDefinitionsByClass(classLevel: '11' | '12' | 'Both'): BiologyDefinition[] {
  return biologyDefinitions.filter(d => d.class === classLevel || d.class === 'Both')
}

export function getHighRelevanceDefinitions(): BiologyDefinition[] {
  return biologyDefinitions.filter(d => d.neetRelevance === 'High')
}

export const categories: BiologyDefinition['category'][] = [
  'Cell Biology',
  'Genetics',
  'Ecology',
  'Human Physiology',
  'Plant Biology',
  'Evolution',
  'Biotechnology',
  'Microbiology'
]
