/**
 * Complete NCERT Biology Diagram Requirements
 * Based on NCERT Class 11 & 12 Biology Textbooks
 * Mapped to NEET Exam importance
 */

interface DiagramRequirement {
  name: string
  ncertFigure?: string  // e.g., "Fig 8.4"
  ncertPage?: number
  importance: 'HIGH' | 'MEDIUM' | 'LOW'  // NEET frequency
  status?: 'HAVE' | 'NEED' | 'PARTIAL'
}

interface ChapterDiagrams {
  chapter: number
  chapterName: string
  unit: string
  diagrams: DiagramRequirement[]
}

// ==================== CLASS 11 BIOLOGY ====================

export const CLASS_11_DIAGRAMS: ChapterDiagrams[] = [
  // UNIT I: DIVERSITY IN THE LIVING WORLD
  {
    chapter: 1,
    chapterName: 'The Living World',
    unit: 'Diversity in Living World',
    diagrams: [
      { name: 'Taxonomic Hierarchy', ncertFigure: 'Fig 1.1', importance: 'MEDIUM' },
      { name: 'Taxonomic Categories Example (Housefly/Wheat)', importance: 'LOW' },
    ]
  },
  {
    chapter: 2,
    chapterName: 'Biological Classification',
    unit: 'Diversity in Living World',
    diagrams: [
      { name: 'Five Kingdom Classification', ncertFigure: 'Fig 2.1', importance: 'HIGH' },
      { name: 'Bacteria Cell Structure', ncertFigure: 'Fig 2.2', importance: 'HIGH', status: 'HAVE' },
      { name: 'Bacterial Shapes (Cocci, Bacilli, Spirilla)', importance: 'MEDIUM' },
      { name: 'Bacteriophage Structure', ncertFigure: 'Fig 2.3', importance: 'HIGH', status: 'HAVE' },
      { name: 'TMV (Tobacco Mosaic Virus)', importance: 'MEDIUM' },
      { name: 'Amoeba Structure', importance: 'MEDIUM' },
      { name: 'Paramecium Structure', importance: 'MEDIUM' },
      { name: 'Euglena Structure', importance: 'LOW' },
      { name: 'Plasmodium Life Cycle', importance: 'HIGH' },
      { name: 'Fungal Hyphae Types', importance: 'MEDIUM' },
      { name: 'Rhizopus Life Cycle', importance: 'MEDIUM' },
      { name: 'Penicillium Structure', importance: 'LOW' },
      { name: 'Agaricus (Mushroom) Structure', importance: 'LOW' },
      { name: 'Lichen Types', importance: 'LOW' },
    ]
  },
  {
    chapter: 3,
    chapterName: 'Plant Kingdom',
    unit: 'Diversity in Living World',
    diagrams: [
      { name: 'Algae Types (Chlamydomonas, Volvox, Ulothrix, Spirogyra)', importance: 'MEDIUM' },
      { name: 'Life Cycle of Moss (Funaria)', ncertFigure: 'Fig 3.3', importance: 'HIGH' },
      { name: 'Marchantia Structure', importance: 'MEDIUM' },
      { name: 'Fern (Pteris) Life Cycle', ncertFigure: 'Fig 3.5', importance: 'HIGH' },
      { name: 'Gymnosperm Cone Structure', importance: 'MEDIUM' },
      { name: 'Pinus Life Cycle', importance: 'MEDIUM' },
      { name: 'Alternation of Generations', ncertFigure: 'Fig 3.6', importance: 'HIGH' },
    ]
  },
  {
    chapter: 4,
    chapterName: 'Animal Kingdom',
    unit: 'Diversity in Living World',
    diagrams: [
      { name: 'Levels of Organization', importance: 'MEDIUM' },
      { name: 'Body Symmetry Types', ncertFigure: 'Fig 4.1', importance: 'HIGH' },
      { name: 'Coelom Types (Acoelomate, Pseudocoelomate, Coelomate)', ncertFigure: 'Fig 4.2', importance: 'HIGH' },
      { name: 'Porifera (Sponge) Canal System', importance: 'MEDIUM' },
      { name: 'Hydra Structure', importance: 'HIGH' },
      { name: 'Obelia Life Cycle', importance: 'MEDIUM' },
      { name: 'Planaria Structure', importance: 'MEDIUM' },
      { name: 'Ascaris Structure', importance: 'MEDIUM' },
      { name: 'Earthworm External Features', importance: 'HIGH' },
      { name: 'Earthworm Internal Anatomy', importance: 'HIGH' },
      { name: 'Cockroach External Features', importance: 'HIGH' },
      { name: 'Cockroach Digestive System', importance: 'HIGH' },
      { name: 'Cockroach Respiratory System', importance: 'MEDIUM' },
      { name: 'Starfish (Echinoderm) Structure', importance: 'MEDIUM' },
      { name: 'Fish Anatomy', importance: 'MEDIUM' },
      { name: 'Frog External Features', importance: 'HIGH' },
      { name: 'Frog Internal Anatomy', importance: 'HIGH' },
    ]
  },

  // UNIT II: STRUCTURAL ORGANISATION IN PLANTS AND ANIMALS
  {
    chapter: 5,
    chapterName: 'Morphology of Flowering Plants',
    unit: 'Structural Organisation',
    diagrams: [
      { name: 'Root Types (Tap root, Fibrous root)', ncertFigure: 'Fig 5.1', importance: 'HIGH' },
      { name: 'Root Modifications', ncertFigure: 'Fig 5.2', importance: 'HIGH' },
      { name: 'Stem Modifications', ncertFigure: 'Fig 5.4', importance: 'HIGH' },
      { name: 'Leaf Types and Venation', ncertFigure: 'Fig 5.5-5.7', importance: 'HIGH' },
      { name: 'Leaf Modifications', importance: 'MEDIUM' },
      { name: 'Inflorescence Types', ncertFigure: 'Fig 5.10', importance: 'HIGH' },
      { name: 'Flower Parts (Complete Flower)', ncertFigure: 'Fig 5.11', importance: 'HIGH', status: 'HAVE' },
      { name: 'Aestivation Types', ncertFigure: 'Fig 5.13', importance: 'HIGH' },
      { name: 'Placentation Types', ncertFigure: 'Fig 5.14', importance: 'HIGH' },
      { name: 'Fruit Types', importance: 'MEDIUM' },
      { name: 'Seed Structure (Dicot and Monocot)', ncertFigure: 'Fig 5.16', importance: 'HIGH' },
      { name: 'Floral Diagram (Solanaceae/Liliaceae)', importance: 'HIGH' },
      { name: 'Floral Formula Examples', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 6,
    chapterName: 'Anatomy of Flowering Plants',
    unit: 'Structural Organisation',
    diagrams: [
      { name: 'Plant Tissue Types', importance: 'HIGH' },
      { name: 'Meristematic Tissue Types', ncertFigure: 'Fig 6.1', importance: 'HIGH' },
      { name: 'Simple Permanent Tissues', ncertFigure: 'Fig 6.2', importance: 'HIGH' },
      { name: 'Complex Tissues (Xylem & Phloem)', ncertFigure: 'Fig 6.3', importance: 'HIGH' },
      { name: 'T.S. of Dicot Root', ncertFigure: 'Fig 6.5', importance: 'HIGH' },
      { name: 'T.S. of Monocot Root', ncertFigure: 'Fig 6.6', importance: 'HIGH' },
      { name: 'T.S. of Dicot Stem', ncertFigure: 'Fig 6.7', importance: 'HIGH' },
      { name: 'T.S. of Monocot Stem', ncertFigure: 'Fig 6.8', importance: 'HIGH' },
      { name: 'T.S. of Dicot Leaf', ncertFigure: 'Fig 6.9', importance: 'HIGH' },
      { name: 'T.S. of Monocot Leaf', importance: 'MEDIUM' },
      { name: 'Secondary Growth in Dicot Stem', ncertFigure: 'Fig 6.10', importance: 'HIGH' },
      { name: 'Annual Rings', importance: 'MEDIUM' },
      { name: 'Stomata Structure', importance: 'HIGH' },
    ]
  },
  {
    chapter: 7,
    chapterName: 'Structural Organisation in Animals',
    unit: 'Structural Organisation',
    diagrams: [
      { name: 'Epithelial Tissue Types', ncertFigure: 'Fig 7.1', importance: 'HIGH' },
      { name: 'Connective Tissue Types', ncertFigure: 'Fig 7.2', importance: 'HIGH' },
      { name: 'Muscle Tissue Types', ncertFigure: 'Fig 7.3', importance: 'HIGH' },
      { name: 'Neuron Structure', ncertFigure: 'Fig 7.4', importance: 'HIGH', status: 'HAVE' },
      { name: 'Frog Digestive System', importance: 'MEDIUM' },
      { name: 'Frog Circulatory System', importance: 'MEDIUM' },
      { name: 'Frog Nervous System', importance: 'MEDIUM' },
      { name: 'Frog Reproductive System', importance: 'MEDIUM' },
    ]
  },

  // UNIT III: CELL STRUCTURE AND FUNCTION
  {
    chapter: 8,
    chapterName: 'Cell: The Unit of Life',
    unit: 'Cell Structure and Function',
    diagrams: [
      { name: 'Prokaryotic Cell', ncertFigure: 'Fig 8.1', importance: 'HIGH', status: 'HAVE' },
      { name: 'Animal Cell (Ultrastructure)', ncertFigure: 'Fig 8.3', importance: 'HIGH', status: 'HAVE' },
      { name: 'Plant Cell (Ultrastructure)', ncertFigure: 'Fig 8.4', importance: 'HIGH', status: 'HAVE' },
      { name: 'Cell Membrane (Fluid Mosaic Model)', ncertFigure: 'Fig 8.5', importance: 'HIGH', status: 'HAVE' },
      { name: 'Endoplasmic Reticulum', ncertFigure: 'Fig 8.6', importance: 'HIGH', status: 'HAVE' },
      { name: 'Golgi Apparatus', ncertFigure: 'Fig 8.7', importance: 'HIGH', status: 'HAVE' },
      { name: 'Mitochondrion Structure', ncertFigure: 'Fig 8.8', importance: 'HIGH', status: 'HAVE' },
      { name: 'Chloroplast Structure', ncertFigure: 'Fig 8.9', importance: 'HIGH', status: 'HAVE' },
      { name: 'Nucleus Structure', ncertFigure: 'Fig 8.10', importance: 'HIGH', status: 'HAVE' },
      { name: 'Ribosome Structure', importance: 'MEDIUM' },
      { name: 'Centriole Structure', importance: 'MEDIUM' },
      { name: 'Cilia and Flagella (9+2 arrangement)', ncertFigure: 'Fig 8.11', importance: 'HIGH' },
    ]
  },
  {
    chapter: 9,
    chapterName: 'Biomolecules',
    unit: 'Cell Structure and Function',
    diagrams: [
      { name: 'Amino Acid Structure', importance: 'HIGH' },
      { name: 'Peptide Bond Formation', importance: 'HIGH' },
      { name: 'Protein Structure Levels (1°, 2°, 3°, 4°)', ncertFigure: 'Fig 9.4', importance: 'HIGH' },
      { name: 'Monosaccharide Structures', importance: 'MEDIUM' },
      { name: 'Polysaccharide Structure (Starch, Cellulose)', importance: 'MEDIUM' },
      { name: 'Lipid Structure', importance: 'MEDIUM' },
      { name: 'Nucleotide Structure', ncertFigure: 'Fig 9.6', importance: 'HIGH' },
      { name: 'DNA Double Helix', importance: 'HIGH', status: 'HAVE' },
      { name: 'Enzyme Action (Lock and Key)', ncertFigure: 'Fig 9.8', importance: 'HIGH' },
      { name: 'Enzyme Kinetics Graph', importance: 'MEDIUM' },
      { name: 'ATP Structure', importance: 'HIGH' },
    ]
  },
  {
    chapter: 10,
    chapterName: 'Cell Cycle and Cell Division',
    unit: 'Cell Structure and Function',
    diagrams: [
      { name: 'Cell Cycle Phases', ncertFigure: 'Fig 10.1', importance: 'HIGH' },
      { name: 'Mitosis Stages', ncertFigure: 'Fig 10.2', importance: 'HIGH', status: 'HAVE' },
      { name: 'Meiosis I Stages', ncertFigure: 'Fig 10.3', importance: 'HIGH', status: 'HAVE' },
      { name: 'Meiosis II Stages', importance: 'HIGH' },
      { name: 'Crossing Over (Chiasma)', ncertFigure: 'Fig 10.4', importance: 'HIGH' },
      { name: 'Chromosome Structure', importance: 'HIGH' },
      { name: 'Spindle Apparatus', importance: 'MEDIUM' },
      { name: 'Cytokinesis (Plant vs Animal)', importance: 'MEDIUM' },
    ]
  },

  // UNIT IV: PLANT PHYSIOLOGY
  {
    chapter: 11,
    chapterName: 'Transport in Plants',
    unit: 'Plant Physiology',
    diagrams: [
      { name: 'Water Potential Diagram', importance: 'HIGH' },
      { name: 'Plasmolysis Stages', ncertFigure: 'Fig 11.3', importance: 'HIGH' },
      { name: 'Xylem Transport Pathway', ncertFigure: 'Fig 11.4', importance: 'HIGH' },
      { name: 'Root Pressure Demonstration', importance: 'MEDIUM' },
      { name: 'Transpiration Pull', importance: 'HIGH' },
      { name: 'Stomatal Opening Mechanism', ncertFigure: 'Fig 11.7', importance: 'HIGH' },
      { name: 'Phloem Transport (Mass Flow)', ncertFigure: 'Fig 11.9', importance: 'HIGH' },
      { name: 'Guttation', importance: 'LOW' },
    ]
  },
  {
    chapter: 12,
    chapterName: 'Mineral Nutrition',
    unit: 'Plant Physiology',
    diagrams: [
      { name: 'Hydroponics Setup', importance: 'MEDIUM' },
      { name: 'Nitrogen Cycle', ncertFigure: 'Fig 12.2', importance: 'HIGH', status: 'HAVE' },
      { name: 'Root Nodule Structure', ncertFigure: 'Fig 12.3', importance: 'HIGH' },
      { name: 'Deficiency Symptoms Chart', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 13,
    chapterName: 'Photosynthesis in Higher Plants',
    unit: 'Plant Physiology',
    diagrams: [
      { name: 'Chloroplast Structure', importance: 'HIGH', status: 'HAVE' },
      { name: 'Light Reactions (Z-scheme)', ncertFigure: 'Fig 13.4', importance: 'HIGH' },
      { name: 'Photosystem I and II', ncertFigure: 'Fig 13.5', importance: 'HIGH' },
      { name: 'Cyclic Photophosphorylation', importance: 'HIGH' },
      { name: 'Non-cyclic Photophosphorylation', importance: 'HIGH' },
      { name: 'Calvin Cycle', ncertFigure: 'Fig 13.6', importance: 'HIGH', status: 'HAVE' },
      { name: 'C4 Pathway (Hatch-Slack)', ncertFigure: 'Fig 13.8', importance: 'HIGH' },
      { name: 'Kranz Anatomy', ncertFigure: 'Fig 13.9', importance: 'HIGH' },
      { name: 'CAM Pathway', importance: 'MEDIUM' },
      { name: 'Photorespiration', importance: 'MEDIUM' },
      { name: 'Absorption Spectrum of Chlorophyll', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 14,
    chapterName: 'Respiration in Plants',
    unit: 'Plant Physiology',
    diagrams: [
      { name: 'Glycolysis Pathway', ncertFigure: 'Fig 14.1', importance: 'HIGH' },
      { name: 'Krebs Cycle (TCA Cycle)', ncertFigure: 'Fig 14.3', importance: 'HIGH', status: 'HAVE' },
      { name: 'Electron Transport Chain', ncertFigure: 'Fig 14.4', importance: 'HIGH' },
      { name: 'ATP Synthesis (Chemiosmosis)', importance: 'HIGH' },
      { name: 'Fermentation Pathways', ncertFigure: 'Fig 14.5', importance: 'MEDIUM' },
      { name: 'Respirometer Setup', importance: 'LOW' },
    ]
  },
  {
    chapter: 15,
    chapterName: 'Plant Growth and Development',
    unit: 'Plant Physiology',
    diagrams: [
      { name: 'Phases of Growth Curve', ncertFigure: 'Fig 15.2', importance: 'HIGH' },
      { name: 'Auxin Distribution in Phototropism', importance: 'HIGH' },
      { name: 'Gibberellin Effects', importance: 'MEDIUM' },
      { name: 'Seed Germination Stages', importance: 'MEDIUM' },
      { name: 'Photoperiodism (SDP, LDP)', ncertFigure: 'Fig 15.7', importance: 'HIGH' },
      { name: 'Vernalization', importance: 'MEDIUM' },
    ]
  },

  // UNIT V: HUMAN PHYSIOLOGY
  {
    chapter: 16,
    chapterName: 'Digestion and Absorption',
    unit: 'Human Physiology',
    diagrams: [
      { name: 'Human Digestive System', ncertFigure: 'Fig 16.1', importance: 'HIGH', status: 'HAVE' },
      { name: 'Tooth Structure', ncertFigure: 'Fig 16.2', importance: 'MEDIUM' },
      { name: 'Stomach Structure', ncertFigure: 'Fig 16.3', importance: 'HIGH' },
      { name: 'Small Intestine Structure (Villi)', ncertFigure: 'Fig 16.4', importance: 'HIGH' },
      { name: 'Large Intestine Structure', importance: 'MEDIUM' },
      { name: 'Liver and Pancreas', importance: 'HIGH' },
      { name: 'Digestion and Absorption Summary', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 17,
    chapterName: 'Breathing and Exchange of Gases',
    unit: 'Human Physiology',
    diagrams: [
      { name: 'Human Respiratory System', ncertFigure: 'Fig 17.1', importance: 'HIGH', status: 'HAVE' },
      { name: 'Lungs and Alveoli', ncertFigure: 'Fig 17.2', importance: 'HIGH' },
      { name: 'Diaphragm Movement (Inspiration/Expiration)', ncertFigure: 'Fig 17.3', importance: 'HIGH' },
      { name: 'Oxygen Dissociation Curve', ncertFigure: 'Fig 17.6', importance: 'HIGH' },
      { name: 'Transport of CO2', importance: 'HIGH' },
      { name: 'Lung Volumes and Capacities', importance: 'HIGH' },
    ]
  },
  {
    chapter: 18,
    chapterName: 'Body Fluids and Circulation',
    unit: 'Human Physiology',
    diagrams: [
      { name: 'Blood Cells Types', ncertFigure: 'Fig 18.1', importance: 'HIGH' },
      { name: 'Human Heart (External)', ncertFigure: 'Fig 18.2', importance: 'HIGH', status: 'HAVE' },
      { name: 'Human Heart (Internal/Sectional)', ncertFigure: 'Fig 18.3', importance: 'HIGH' },
      { name: 'Cardiac Cycle', ncertFigure: 'Fig 18.4', importance: 'HIGH' },
      { name: 'ECG Waveform', ncertFigure: 'Fig 18.5', importance: 'HIGH' },
      { name: 'Double Circulation', ncertFigure: 'Fig 18.6', importance: 'HIGH' },
      { name: 'Blood Vessel Structure (Artery/Vein)', importance: 'HIGH' },
      { name: 'Lymphatic System', importance: 'MEDIUM' },
      { name: 'Conducting System of Heart', importance: 'HIGH' },
    ]
  },
  {
    chapter: 19,
    chapterName: 'Excretory Products and their Elimination',
    unit: 'Human Physiology',
    diagrams: [
      { name: 'Human Excretory System', ncertFigure: 'Fig 19.1', importance: 'HIGH' },
      { name: 'Kidney (L.S.)', ncertFigure: 'Fig 19.2', importance: 'HIGH' },
      { name: 'Nephron Structure', ncertFigure: 'Fig 19.3', importance: 'HIGH', status: 'HAVE' },
      { name: 'Urine Formation Process', ncertFigure: 'Fig 19.4', importance: 'HIGH' },
      { name: 'Counter Current Mechanism', ncertFigure: 'Fig 19.5', importance: 'HIGH' },
      { name: 'Regulation of Kidney Function', importance: 'HIGH' },
      { name: 'Dialysis Machine (Hemodialysis)', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 20,
    chapterName: 'Locomotion and Movement',
    unit: 'Human Physiology',
    diagrams: [
      { name: 'Human Skeleton', ncertFigure: 'Fig 20.1', importance: 'HIGH' },
      { name: 'Skull Bones', importance: 'MEDIUM' },
      { name: 'Vertebral Column', importance: 'MEDIUM' },
      { name: 'Types of Joints', ncertFigure: 'Fig 20.3', importance: 'HIGH' },
      { name: 'Synovial Joint Structure', ncertFigure: 'Fig 20.4', importance: 'HIGH' },
      { name: 'Muscle Types', importance: 'HIGH' },
      { name: 'Skeletal Muscle Structure', ncertFigure: 'Fig 20.5', importance: 'HIGH' },
      { name: 'Sarcomere Structure', ncertFigure: 'Fig 20.6', importance: 'HIGH', status: 'HAVE' },
      { name: 'Sliding Filament Mechanism', ncertFigure: 'Fig 20.7', importance: 'HIGH' },
      { name: 'Muscle Contraction Cycle', importance: 'HIGH' },
    ]
  },
  {
    chapter: 21,
    chapterName: 'Neural Control and Coordination',
    unit: 'Human Physiology',
    diagrams: [
      { name: 'Neuron Structure', ncertFigure: 'Fig 21.1', importance: 'HIGH', status: 'HAVE' },
      { name: 'Types of Neurons', importance: 'MEDIUM' },
      { name: 'Reflex Arc', ncertFigure: 'Fig 21.2', importance: 'HIGH' },
      { name: 'Action Potential', ncertFigure: 'Fig 21.3', importance: 'HIGH' },
      { name: 'Synapse Structure', ncertFigure: 'Fig 21.4', importance: 'HIGH', status: 'HAVE' },
      { name: 'Human Brain (Sagittal Section)', ncertFigure: 'Fig 21.5', importance: 'HIGH', status: 'HAVE' },
      { name: 'Human Brain (Lateral View)', importance: 'HIGH' },
      { name: 'Spinal Cord (T.S.)', ncertFigure: 'Fig 21.6', importance: 'HIGH' },
      { name: 'Human Eye', ncertFigure: 'Fig 21.7', importance: 'HIGH', status: 'HAVE' },
      { name: 'Retina Structure', importance: 'MEDIUM' },
      { name: 'Human Ear', ncertFigure: 'Fig 21.8', importance: 'HIGH', status: 'HAVE' },
      { name: 'Cochlea (Internal Structure)', importance: 'HIGH' },
      { name: 'Organ of Corti', importance: 'HIGH' },
    ]
  },
  {
    chapter: 22,
    chapterName: 'Chemical Coordination and Integration',
    unit: 'Human Physiology',
    diagrams: [
      { name: 'Endocrine Glands Location', ncertFigure: 'Fig 22.1', importance: 'HIGH' },
      { name: 'Hypothalamus-Pituitary Axis', ncertFigure: 'Fig 22.2', importance: 'HIGH' },
      { name: 'Thyroid Gland', importance: 'MEDIUM' },
      { name: 'Adrenal Gland Structure', importance: 'HIGH' },
      { name: 'Pancreas (Islets of Langerhans)', importance: 'HIGH' },
      { name: 'Mechanism of Hormone Action', ncertFigure: 'Fig 22.3', importance: 'HIGH' },
      { name: 'Feedback Mechanism', importance: 'HIGH' },
    ]
  },
]

// ==================== CLASS 12 BIOLOGY ====================

export const CLASS_12_DIAGRAMS: ChapterDiagrams[] = [
  // UNIT VI: REPRODUCTION
  {
    chapter: 1,
    chapterName: 'Reproduction in Organisms',
    unit: 'Reproduction',
    diagrams: [
      { name: 'Asexual Reproduction Types', importance: 'MEDIUM' },
      { name: 'Binary Fission', importance: 'HIGH' },
      { name: 'Budding in Yeast', importance: 'MEDIUM' },
      { name: 'Vegetative Propagation Methods', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 2,
    chapterName: 'Sexual Reproduction in Flowering Plants',
    unit: 'Reproduction',
    diagrams: [
      { name: 'Flower Structure (L.S.)', ncertFigure: 'Fig 2.1', importance: 'HIGH', status: 'HAVE' },
      { name: 'Stamen Structure', ncertFigure: 'Fig 2.2', importance: 'HIGH' },
      { name: 'Microsporogenesis', ncertFigure: 'Fig 2.3', importance: 'HIGH' },
      { name: 'Pollen Grain Structure', ncertFigure: 'Fig 2.4', importance: 'HIGH' },
      { name: 'Pistil Structure', ncertFigure: 'Fig 2.5', importance: 'HIGH' },
      { name: 'Megasporogenesis', ncertFigure: 'Fig 2.6', importance: 'HIGH' },
      { name: 'Embryo Sac (7-celled, 8-nucleate)', ncertFigure: 'Fig 2.7', importance: 'HIGH', status: 'HAVE' },
      { name: 'Pollination Types', importance: 'HIGH' },
      { name: 'Pollen-Pistil Interaction', ncertFigure: 'Fig 2.10', importance: 'HIGH' },
      { name: 'Double Fertilization', ncertFigure: 'Fig 2.11', importance: 'HIGH' },
      { name: 'Embryo Development Stages', ncertFigure: 'Fig 2.12', importance: 'HIGH' },
      { name: 'Seed Structure (Dicot/Monocot)', ncertFigure: 'Fig 2.13', importance: 'HIGH' },
      { name: 'Fruit Development', importance: 'MEDIUM' },
      { name: 'Apomixis', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 3,
    chapterName: 'Human Reproduction',
    unit: 'Reproduction',
    diagrams: [
      { name: 'Male Reproductive System', ncertFigure: 'Fig 3.1', importance: 'HIGH' },
      { name: 'Testis (T.S.)', ncertFigure: 'Fig 3.2', importance: 'HIGH' },
      { name: 'Spermatogenesis', ncertFigure: 'Fig 3.3', importance: 'HIGH' },
      { name: 'Sperm Structure', ncertFigure: 'Fig 3.4', importance: 'HIGH', status: 'HAVE' },
      { name: 'Female Reproductive System', ncertFigure: 'Fig 3.5', importance: 'HIGH' },
      { name: 'Ovary (T.S.)', ncertFigure: 'Fig 3.6', importance: 'HIGH' },
      { name: 'Oogenesis', ncertFigure: 'Fig 3.7', importance: 'HIGH' },
      { name: 'Graafian Follicle', importance: 'HIGH' },
      { name: 'Menstrual Cycle', ncertFigure: 'Fig 3.8', importance: 'HIGH', status: 'HAVE' },
      { name: 'Fertilization Process', importance: 'HIGH' },
      { name: 'Cleavage Stages', ncertFigure: 'Fig 3.9', importance: 'HIGH' },
      { name: 'Blastocyst Structure', ncertFigure: 'Fig 3.10', importance: 'HIGH' },
      { name: 'Implantation', importance: 'HIGH' },
      { name: 'Placenta Structure', ncertFigure: 'Fig 3.11', importance: 'HIGH' },
      { name: 'Embryonic Development', importance: 'HIGH' },
    ]
  },
  {
    chapter: 4,
    chapterName: 'Reproductive Health',
    unit: 'Reproduction',
    diagrams: [
      { name: 'Contraceptive Methods', importance: 'MEDIUM' },
      { name: 'IUD Types', importance: 'MEDIUM' },
      { name: 'Vasectomy and Tubectomy', importance: 'MEDIUM' },
      { name: 'IVF Process', importance: 'MEDIUM' },
      { name: 'Amniocentesis', importance: 'LOW' },
    ]
  },

  // UNIT VII: GENETICS AND EVOLUTION
  {
    chapter: 5,
    chapterName: 'Principles of Inheritance and Variation',
    unit: 'Genetics and Evolution',
    diagrams: [
      { name: 'Monohybrid Cross', ncertFigure: 'Fig 5.1', importance: 'HIGH' },
      { name: 'Dihybrid Cross', ncertFigure: 'Fig 5.4', importance: 'HIGH' },
      { name: 'Incomplete Dominance', ncertFigure: 'Fig 5.5', importance: 'HIGH' },
      { name: 'Co-dominance (Blood Groups)', importance: 'HIGH' },
      { name: 'Sex Determination (XY system)', ncertFigure: 'Fig 5.9', importance: 'HIGH' },
      { name: 'Sex-linked Inheritance', importance: 'HIGH' },
      { name: 'Pedigree Analysis Symbols', ncertFigure: 'Fig 5.11', importance: 'HIGH' },
      { name: 'Pedigree Charts (Various disorders)', importance: 'HIGH' },
      { name: 'Chromosomal Disorders (Karyotypes)', importance: 'HIGH' },
      { name: 'Linkage and Recombination', importance: 'HIGH' },
    ]
  },
  {
    chapter: 6,
    chapterName: 'Molecular Basis of Inheritance',
    unit: 'Genetics and Evolution',
    diagrams: [
      { name: 'DNA Double Helix Structure', ncertFigure: 'Fig 6.1', importance: 'HIGH', status: 'HAVE' },
      { name: 'DNA Packaging in Chromosome', ncertFigure: 'Fig 6.4', importance: 'HIGH' },
      { name: 'DNA Replication (Semi-conservative)', ncertFigure: 'Fig 6.5', importance: 'HIGH', status: 'HAVE' },
      { name: 'Replication Fork', ncertFigure: 'Fig 6.6', importance: 'HIGH' },
      { name: 'Transcription Process', ncertFigure: 'Fig 6.8', importance: 'HIGH' },
      { name: 'mRNA Processing (Splicing)', importance: 'HIGH' },
      { name: 'Genetic Code Table', importance: 'HIGH' },
      { name: 'Translation Process', ncertFigure: 'Fig 6.10', importance: 'HIGH', status: 'HAVE' },
      { name: 'tRNA Structure', ncertFigure: 'Fig 6.9', importance: 'HIGH' },
      { name: 'Lac Operon', ncertFigure: 'Fig 6.12', importance: 'HIGH', status: 'HAVE' },
      { name: 'Human Genome Project', importance: 'MEDIUM' },
      { name: 'DNA Fingerprinting', ncertFigure: 'Fig 6.14', importance: 'HIGH' },
    ]
  },
  {
    chapter: 7,
    chapterName: 'Evolution',
    unit: 'Genetics and Evolution',
    diagrams: [
      { name: 'Miller-Urey Experiment', importance: 'HIGH' },
      { name: 'Homologous Organs', ncertFigure: 'Fig 7.3', importance: 'HIGH' },
      { name: 'Analogous Organs', ncertFigure: 'Fig 7.4', importance: 'HIGH' },
      { name: 'Adaptive Radiation (Darwin Finches)', ncertFigure: 'Fig 7.5', importance: 'HIGH' },
      { name: 'Human Evolution Timeline', ncertFigure: 'Fig 7.8', importance: 'HIGH' },
      { name: 'Hardy-Weinberg Principle', importance: 'HIGH' },
      { name: 'Types of Natural Selection', ncertFigure: 'Fig 7.9', importance: 'HIGH' },
      { name: 'Speciation', importance: 'MEDIUM' },
    ]
  },

  // UNIT VIII: BIOLOGY AND HUMAN WELFARE
  {
    chapter: 8,
    chapterName: 'Human Health and Disease',
    unit: 'Biology and Human Welfare',
    diagrams: [
      { name: 'Plasmodium Life Cycle', ncertFigure: 'Fig 8.1', importance: 'HIGH' },
      { name: 'Entamoeba Life Cycle', importance: 'MEDIUM' },
      { name: 'Ascaris Life Cycle', importance: 'MEDIUM' },
      { name: 'Wuchereria Life Cycle', importance: 'MEDIUM' },
      { name: 'HIV Structure', ncertFigure: 'Fig 8.3', importance: 'HIGH' },
      { name: 'HIV Replication Cycle', importance: 'HIGH' },
      { name: 'Immune System Components', importance: 'HIGH' },
      { name: 'Antibody Structure', ncertFigure: 'Fig 8.4', importance: 'HIGH' },
      { name: 'B-cell and T-cell Response', importance: 'HIGH' },
      { name: 'Cancer Cell vs Normal Cell', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 9,
    chapterName: 'Strategies for Enhancement in Food Production',
    unit: 'Biology and Human Welfare',
    diagrams: [
      { name: 'Plant Breeding Steps', importance: 'MEDIUM' },
      { name: 'Tissue Culture Process', ncertFigure: 'Fig 9.2', importance: 'HIGH' },
      { name: 'Somatic Hybridization', importance: 'MEDIUM' },
      { name: 'Artificial Insemination', importance: 'LOW' },
      { name: 'MOET Technique', importance: 'LOW' },
    ]
  },
  {
    chapter: 10,
    chapterName: 'Microbes in Human Welfare',
    unit: 'Biology and Human Welfare',
    diagrams: [
      { name: 'Biogas Plant', ncertFigure: 'Fig 10.2', importance: 'HIGH' },
      { name: 'Sewage Treatment Process', ncertFigure: 'Fig 10.3', importance: 'HIGH' },
      { name: 'BOD vs Time Graph', importance: 'MEDIUM' },
    ]
  },

  // UNIT IX: BIOTECHNOLOGY
  {
    chapter: 11,
    chapterName: 'Biotechnology: Principles and Processes',
    unit: 'Biotechnology',
    diagrams: [
      { name: 'Restriction Enzyme Action', ncertFigure: 'Fig 11.1', importance: 'HIGH' },
      { name: 'Cloning Vector (pBR322)', ncertFigure: 'Fig 11.2', importance: 'HIGH' },
      { name: 'rDNA Technology Steps', ncertFigure: 'Fig 11.3', importance: 'HIGH' },
      { name: 'PCR Process', ncertFigure: 'Fig 11.5', importance: 'HIGH', status: 'HAVE' },
      { name: 'Gel Electrophoresis', ncertFigure: 'Fig 11.6', importance: 'HIGH', status: 'HAVE' },
      { name: 'Bioreactor', ncertFigure: 'Fig 11.7', importance: 'HIGH' },
      { name: 'Gene Gun', importance: 'MEDIUM' },
      { name: 'Ti Plasmid', importance: 'HIGH' },
    ]
  },
  {
    chapter: 12,
    chapterName: 'Biotechnology and its Applications',
    unit: 'Biotechnology',
    diagrams: [
      { name: 'Bt Cotton (Cry Gene)', ncertFigure: 'Fig 12.1', importance: 'HIGH' },
      { name: 'RNA Interference', ncertFigure: 'Fig 12.2', importance: 'HIGH' },
      { name: 'Gene Therapy', ncertFigure: 'Fig 12.3', importance: 'HIGH' },
      { name: 'Transgenic Animals', importance: 'MEDIUM' },
      { name: 'ELISA Technique', importance: 'MEDIUM' },
    ]
  },

  // UNIT X: ECOLOGY
  {
    chapter: 13,
    chapterName: 'Organisms and Populations',
    unit: 'Ecology',
    diagrams: [
      { name: 'Population Growth Curves (J and S)', ncertFigure: 'Fig 13.4', importance: 'HIGH' },
      { name: 'Age Pyramids', ncertFigure: 'Fig 13.5', importance: 'HIGH' },
      { name: 'Logistic Growth Equation', importance: 'HIGH' },
      { name: 'Species Interactions', importance: 'HIGH' },
    ]
  },
  {
    chapter: 14,
    chapterName: 'Ecosystem',
    unit: 'Ecology',
    diagrams: [
      { name: 'Ecosystem Structure', ncertFigure: 'Fig 14.1', importance: 'HIGH' },
      { name: 'Food Chain Types', importance: 'HIGH' },
      { name: 'Food Web', ncertFigure: 'Fig 14.2', importance: 'HIGH', status: 'HAVE' },
      { name: 'Ecological Pyramids', ncertFigure: 'Fig 14.3', importance: 'HIGH' },
      { name: 'Energy Flow (10% Law)', ncertFigure: 'Fig 14.4', importance: 'HIGH' },
      { name: 'Carbon Cycle', ncertFigure: 'Fig 14.5', importance: 'HIGH', status: 'HAVE' },
      { name: 'Phosphorus Cycle', ncertFigure: 'Fig 14.6', importance: 'HIGH' },
      { name: 'Ecological Succession', importance: 'HIGH' },
      { name: 'Nutrient Cycling', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 15,
    chapterName: 'Biodiversity and Conservation',
    unit: 'Ecology',
    diagrams: [
      { name: 'Species-Area Relationship', ncertFigure: 'Fig 15.1', importance: 'HIGH' },
      { name: 'Biodiversity Hotspots Map', importance: 'MEDIUM' },
      { name: 'Rivet Popper Hypothesis', importance: 'MEDIUM' },
      { name: 'In-situ and Ex-situ Conservation', importance: 'MEDIUM' },
    ]
  },
  {
    chapter: 16,
    chapterName: 'Environmental Issues',
    unit: 'Ecology',
    diagrams: [
      { name: 'Greenhouse Effect', importance: 'HIGH' },
      { name: 'Ozone Layer Depletion', importance: 'HIGH' },
      { name: 'Biomagnification', importance: 'HIGH' },
      { name: 'Eutrophication', importance: 'MEDIUM' },
      { name: 'Sewage Treatment Flow', importance: 'MEDIUM' },
    ]
  },
]

// Summary function
function generateSummary() {
  const allDiagrams = [...CLASS_11_DIAGRAMS, ...CLASS_12_DIAGRAMS]

  let totalRequired = 0
  let haveCount = 0
  let highPriority = 0
  let highPriorityMissing = 0

  const missingHigh: string[] = []
  const missingMedium: string[] = []

  allDiagrams.forEach(chapter => {
    chapter.diagrams.forEach(d => {
      totalRequired++
      if (d.status === 'HAVE') haveCount++
      if (d.importance === 'HIGH') {
        highPriority++
        if (d.status !== 'HAVE') {
          highPriorityMissing++
          missingHigh.push(`${d.name} (Ch.${chapter.chapter})`)
        }
      }
      if (d.importance === 'MEDIUM' && d.status !== 'HAVE') {
        missingMedium.push(`${d.name} (Ch.${chapter.chapter})`)
      }
    })
  })

  console.log('\n========== NCERT DIAGRAM REQUIREMENTS SUMMARY ==========\n')
  console.log(`Total diagrams required: ${totalRequired}`)
  console.log(`Currently have: ${haveCount}`)
  console.log(`Missing: ${totalRequired - haveCount}`)
  console.log(`\nHigh priority diagrams: ${highPriority}`)
  console.log(`High priority missing: ${highPriorityMissing}`)

  console.log('\n\n========== HIGH PRIORITY MISSING DIAGRAMS ==========\n')
  missingHigh.forEach((d, i) => console.log(`${i+1}. ${d}`))

  console.log('\n\n========== MEDIUM PRIORITY MISSING DIAGRAMS ==========\n')
  missingMedium.slice(0, 50).forEach((d, i) => console.log(`${i+1}. ${d}`))
  if (missingMedium.length > 50) {
    console.log(`... and ${missingMedium.length - 50} more`)
  }
}

generateSummary()
