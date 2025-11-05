import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

const biologyTopics = [
  {
    title: 'Cell Biology: Structure and Function of Cell Membrane',
    slug: 'cell-membrane-structure-function',
    curriculum: 'NEET',
    grade: 'CLASS_11',
    chapter: 'Cell: The Unit of Life',
    difficulty: 'Medium',
    metaTitle: 'Cell Membrane Structure & Function | NEET Biology Notes | Cerebrum Academy',
    metaDescription:
      'Complete notes on cell membrane structure, fluid mosaic model, selective permeability, and transport mechanisms. Written by AIIMS faculty for NEET preparation.',
    keywords: [
      'cell membrane',
      'fluid mosaic model',
      'phospholipid bilayer',
      'NEET biology',
      'cell structure',
      'membrane proteins',
      'selective permeability',
      'active transport',
      'passive transport',
    ],
    excerpt:
      'Learn about the fluid mosaic model, membrane structure, selective permeability, and various transport mechanisms across cell membranes.',
    content: `# Cell Membrane: Structure and Function

## Introduction

The cell membrane, also called the plasma membrane, is a vital structure that separates the cell's internal environment from the external surroundings. It is selectively permeable and controls the movement of substances in and out of the cell.

## Fluid Mosaic Model

Proposed by **Singer and Nicolson (1972)**, the fluid mosaic model describes the structure of the cell membrane:

### Key Features:
- **Phospholipid Bilayer**: Forms the basic framework
  - Hydrophilic (water-loving) heads face outward
  - Hydrophobic (water-fearing) tails face inward

- **Membrane Proteins**: Embedded within the bilayer
  - **Integral proteins**: Span the entire membrane
  - **Peripheral proteins**: Attached to the surface

- **Cholesterol**: Maintains membrane fluidity
- **Carbohydrates**: Form glycoproteins and glycolipids
  - Important for cell recognition
  - Act as receptors

## Chemical Composition

1. **Lipids (40-50%)**
   - Phospholipids (most abundant)
   - Cholesterol
   - Glycolipids

2. **Proteins (50-60%)**
   - Transport proteins
   - Receptor proteins
   - Enzymatic proteins
   - Structural proteins

3. **Carbohydrates (1-10%)**
   - Always found on outer surface
   - Form glycocalyx

## Functions of Cell Membrane

### 1. Selective Permeability
Controls what enters and exits the cell based on:
- Size of molecules
- Charge
- Solubility in lipids

### 2. Transport Mechanisms

**Passive Transport** (No energy required):
- Simple diffusion
- Facilitated diffusion
- Osmosis

**Active Transport** (Energy required):
- Protein pumps (e.g., Na⁺-K⁺ pump)
- Endocytosis (taking in substances)
- Exocytosis (releasing substances)

### 3. Cell Recognition
Through glycoproteins and glycolipids on the cell surface

### 4. Signal Transduction
Receptor proteins receive chemical signals and trigger cellular responses

## Important NEET Points

1. The fluid mosaic model is the most accepted model of membrane structure
2. Membrane proteins can move laterally within the bilayer (fluidity)
3. Cholesterol regulates membrane fluidity at different temperatures
4. The Na⁺-K⁺ pump maintains the electrochemical gradient (3 Na⁺ out, 2 K⁺ in)
5. Aquaporins are water channel proteins for facilitated diffusion of water

## Key Differences

| Feature | Active Transport | Passive Transport |
|---------|-----------------|-------------------|
| Energy | Required (ATP) | Not required |
| Direction | Against concentration gradient | Along concentration gradient |
| Proteins | Always required | May or may not be required |
| Speed | Faster | Slower |

## Clinical Relevance

- **Cystic fibrosis**: Defective chloride channel protein
- **Cholera**: Affects water transport across intestinal cells
- **Drug resistance**: Enhanced active transport pumps out antibiotics

## Practice Questions

1. What is the role of cholesterol in the cell membrane?
2. Explain the fluid mosaic model with a diagram
3. Differentiate between facilitated diffusion and active transport
4. How does the Na⁺-K⁺ pump maintain the resting membrane potential?

## Conclusion

The cell membrane is a dynamic, selectively permeable barrier that controls cellular communication, transport, and maintains cellular integrity. Understanding its structure and function is crucial for NEET Biology.

---

**Prepared by**: Dr. Shekhar C Singh, AIIMS Alumnus
**For**: NEET Biology Class 11 Preparation`,
  },
  {
    title: 'Photosynthesis: Light and Dark Reactions Explained',
    slug: 'photosynthesis-light-dark-reactions',
    curriculum: 'NEET',
    grade: 'CLASS_11',
    chapter: 'Photosynthesis in Higher Plants',
    difficulty: 'Hard',
    metaTitle: 'Photosynthesis Light & Dark Reactions | Complete NEET Notes',
    metaDescription:
      'Master photosynthesis with detailed notes on light reactions, dark reactions, Calvin cycle, and factors affecting photosynthesis for NEET.',
    keywords: [
      'photosynthesis',
      'light reactions',
      'dark reactions',
      'Calvin cycle',
      'NEET biology',
      'chloroplast',
      'photosystems',
      'C3 cycle',
      'C4 pathway',
    ],
    excerpt:
      'Comprehensive guide to photosynthesis covering light-dependent and light-independent reactions, Calvin cycle, and photosynthetic pathways.',
    content: `# Photosynthesis: Light and Dark Reactions

## Introduction

Photosynthesis is the process by which green plants convert light energy into chemical energy (glucose) using carbon dioxide and water.

**Overall Equation**:
\`\`\`
6CO₂ + 12H₂O + Light energy → C₆H₁₂O₆ + 6O₂ + 6H₂O
\`\`\`

## Site of Photosynthesis

**Chloroplast** - Double membrane-bound organelle containing:
- **Grana**: Stacks of thylakoids (site of light reactions)
- **Stroma**: Fluid-filled matrix (site of dark reactions)

## Light Reactions (Light-Dependent)

Occur in **thylakoid membranes** of grana

### Photosystems
1. **Photosystem II (P680)**: Absorbs light at 680nm
2. **Photosystem I (P700)**: Absorbs light at 700nm

### Z-Scheme (Non-cyclic Photophosphorylation)

**Steps**:
1. **Light absorption** by PS II
2. **Water splitting** (Photolysis):
   \`\`\`
   2H₂O → 4H⁺ + 4e⁻ + O₂
   \`\`\`
3. **Electron transport** through cytochrome b₆f complex
4. **ATP synthesis** via chemiosmosis
5. **Light absorption** by PS I
6. **NADPH formation** (reduction of NADP⁺)

**Products**: ATP, NADPH, O₂

### Cyclic Photophosphorylation
- Only PS I is involved
- Electrons return to PS I
- Only ATP is produced (no NADPH or O₂)

## Dark Reactions (Light-Independent)

Occur in **stroma** of chloroplast

### Calvin Cycle (C3 Cycle)

Discovered by **Melvin Calvin**

**Three Stages**:

#### 1. Carbon Fixation
- CO₂ combines with RuBP (5-carbon)
- Catalyzed by **RuBisCO** enzyme
- Forms 3-PGA (3-carbon compound)

#### 2. Reduction
- 3-PGA reduced to G3P (glyceraldehyde-3-phosphate)
- Uses ATP and NADPH from light reactions

#### 3. Regeneration
- RuBP is regenerated from G3P
- Requires ATP

**Net Equation** (for 1 glucose):
\`\`\`
6CO₂ + 18ATP + 12NADPH → C₆H₁₂O₆ + 18ADP + 18Pi + 12NADP⁺
\`\`\`

## C4 Pathway (Hatch-Slack Pathway)

Found in plants like maize, sugarcane, sorghum

### Adaptations:
- **Kranz anatomy**: Bundle sheath cells + mesophyll cells
- **CO₂ fixation**: Forms 4-carbon oxaloacetic acid (OAA)
- **Primary CO₂ acceptor**: PEP (phosphoenolpyruvate)
- **Enzyme**: PEP carboxylase (no photorespiration)

### Advantages:
- More efficient in hot, dry conditions
- No photorespiration
- Better water use efficiency

## CAM Pathway (Crassulacean Acid Metabolism)

Found in succulents (cacti, pineapple)

### Mechanism:
- **Night**: Stomata open, CO₂ fixed to form malic acid
- **Day**: Stomata closed, malic acid releases CO₂ for Calvin cycle

### Advantages:
- Minimal water loss
- Adapted to arid conditions

## Factors Affecting Photosynthesis

### 1. Light Intensity
- Rate increases with intensity up to saturation point
- Beyond saturation: no further increase

### 2. CO₂ Concentration
- Rate increases up to 0.1% CO₂
- Normal atmospheric CO₂: 0.03-0.04%

### 3. Temperature
- Optimum: 25-35°C
- Enzymes denature at high temperatures

### 4. Water
- Essential for photolysis
- Deficiency closes stomata

### 5. Chlorophyll
- More chlorophyll = higher rate

## Photorespiration

**Definition**: Uptake of O₂ and release of CO₂ in light

**Occurs when**:
- High O₂ concentration
- Low CO₂ concentration
- High temperature

**Impact**: Reduces photosynthetic efficiency (wastes ATP)

## Blackman's Law of Limiting Factors

"Rate of photosynthesis is limited by the factor present in minimum quantity"

## Important NEET Points

1. RuBisCO is the most abundant enzyme on Earth
2. PS II functions before PS I (despite numbering)
3. C4 plants have higher productivity than C3 plants
4. CAM plants show temporal separation of CO₂ fixation
5. Light compensation point: When photosynthesis = respiration

## Comparison Table

| Feature | C3 Plants | C4 Plants | CAM Plants |
|---------|-----------|-----------|------------|
| CO₂ acceptor | RuBP (5C) | PEP (3C) | PEP (3C) |
| First product | 3-PGA (3C) | OAA (4C) | OAA (4C) |
| Cell type | Mesophyll only | Mesophyll + Bundle sheath | Mesophyll |
| Photorespiration | High | Negligible | Negligible |
| Water efficiency | Low | High | Very high |
| Example | Rice, wheat | Maize, sugarcane | Cacti, pineapple |

## Conclusion

Photosynthesis is the foundation of all life on Earth, converting solar energy into chemical energy. Understanding both light and dark reactions is crucial for NEET preparation.

---

**Prepared by**: Dr. Shekhar C Singh, AIIMS Alumnus
**For**: NEET Biology Class 11 Preparation`,
  },
  {
    title: 'DNA Replication: Mechanism and Enzymes',
    slug: 'dna-replication-mechanism-enzymes',
    curriculum: 'NEET',
    grade: 'CLASS_12',
    chapter: 'Molecular Basis of Inheritance',
    difficulty: 'Hard',
    metaTitle: 'DNA Replication Mechanism & Enzymes | NEET Biology Notes',
    metaDescription:
      'Complete guide to DNA replication: semi-conservative mechanism, enzymes involved, Okazaki fragments, and replication process for NEET.',
    keywords: [
      'DNA replication',
      'semi-conservative replication',
      'DNA polymerase',
      'Okazaki fragments',
      'NEET biology',
      'leading strand',
      'lagging strand',
      'DNA helicase',
      'primase',
    ],
    excerpt:
      'Detailed notes on DNA replication mechanism, enzymes, leading and lagging strand synthesis, and experimental evidence.',
    content: `# DNA Replication: Mechanism and Enzymes

## Introduction

DNA replication is the process by which a DNA molecule makes an exact copy of itself. This is essential for cell division and genetic continuity.

## Semi-Conservative Replication

### Meselson-Stahl Experiment (1958)

**Proved**: DNA replication is semi-conservative

**Method**:
1. Grew *E. coli* in ¹⁵N medium (heavy nitrogen)
2. Transferred to ¹⁴N medium (normal nitrogen)
3. Analyzed DNA density using cesium chloride gradient

**Results**:
- **Generation 1**: Hybrid DNA (one heavy, one light strand)
- **Generation 2**: 50% hybrid, 50% light DNA

**Conclusion**: Each new DNA molecule has one old strand and one new strand

## Replication in Prokaryotes

### Origin of Replication (oriC)
- Single origin in circular bacterial chromosome
- Replication is **bidirectional**

### Enzymes Involved

#### 1. DNA Helicase
- **Function**: Unwinds the DNA double helix
- Creates replication fork

#### 2. Single-Strand Binding Proteins (SSB)
- **Function**: Prevent re-annealing of separated strands
- Stabilize single-stranded DNA

#### 3. Topoisomerase (DNA Gyrase)
- **Function**: Relieves tension created by unwinding
- Prevents supercoiling

#### 4. Primase
- **Function**: Synthesizes RNA primers (8-12 nucleotides)
- Provides 3'-OH group for DNA polymerase

#### 5. DNA Polymerase III
- **Function**: Main replicating enzyme
- Synthesizes new DNA strand (5' → 3' direction)
- Has 3' → 5' exonuclease activity (proofreading)

#### 6. DNA Polymerase I
- **Function**: Removes RNA primers
- Fills gaps with DNA nucleotides

#### 7. DNA Ligase
- **Function**: Seals nicks between Okazaki fragments
- Forms phosphodiester bonds

## Mechanism of Replication

### Step-by-Step Process

#### 1. Initiation
- DnaA protein binds to oriC
- Helicase unwinds DNA
- SSB proteins stabilize single strands
- Primase synthesizes RNA primers

#### 2. Elongation

**Leading Strand**:
- Synthesized **continuously** in 5' → 3' direction
- Only one RNA primer needed
- DNA Pol III adds nucleotides continuously

**Lagging Strand**:
- Synthesized **discontinuously** in 5' → 3' direction
- Multiple RNA primers needed
- Forms **Okazaki fragments** (1000-2000 nucleotides in prokaryotes)

#### 3. Termination
- Replication forks meet
- RNA primers removed by DNA Pol I
- Gaps filled by DNA Pol I
- DNA ligase seals nicks

## Replication in Eukaryotes

### Key Differences from Prokaryotes

| Feature | Prokaryotes | Eukaryotes |
|---------|------------|------------|
| Chromosome | Circular | Linear |
| Origins | Single | Multiple |
| Speed | ~1000 bp/sec | ~50 bp/sec |
| Okazaki fragments | 1000-2000 bp | 100-200 bp |
| DNA Polymerase | Pol III (main) | Pol δ (lagging), Pol ε (leading) |
| Primers | RNA | RNA |
| Location | Cytoplasm | Nucleus |

### Telomere Replication

**Problem**: DNA polymerase cannot replicate the very ends of linear chromosomes

**Solution**: Telomerase enzyme
- Adds repetitive sequences (TTAGGG in humans) to 3' end
- Contains RNA template
- Active in germ cells and stem cells
- Inactive in most somatic cells (leads to aging)

## Energy Requirement

**Per nucleotide added**:
- 2 high-energy phosphate bonds broken
- 1 from dNTP → dNMP + PPi
- 1 from PPi → 2 Pi

**Total**: ~2 ATP equivalents per nucleotide

## Proofreading and Repair

### 3' → 5' Exonuclease Activity
- DNA polymerase checks newly added nucleotide
- Removes incorrect nucleotide
- Adds correct nucleotide
- Error rate: 1 in 10⁷ nucleotides

### Mismatch Repair
- Additional repair system
- Identifies and corrects errors after replication
- Final error rate: 1 in 10⁹ to 10¹⁰ nucleotides

## Important NEET Points

1. DNA replication is **semi-conservative** (Meselson-Stahl)
2. Replication is **bidirectional** in both prokaryotes and eukaryotes
3. DNA synthesis occurs only in **5' → 3' direction**
4. **Leading strand** is continuous, **lagging strand** is discontinuous
5. **Okazaki fragments** are part of lagging strand synthesis
6. DNA polymerase requires a **primer** (cannot start synthesis de novo)
7. DNA polymerase has **proofreading ability** (3' → 5' exonuclease)
8. **Telomerase** solves the end-replication problem in eukaryotes

## Clinical Relevance

1. **Cancer**: Telomerase reactivation in cancer cells (immortality)
2. **Aging**: Telomere shortening in somatic cells
3. **Antibiotics**: Target bacterial DNA gyrase (e.g., fluoroquinolones)
4. **Genetic disorders**: Mutations in DNA repair genes (e.g., BRCA1/2)

## Practice Questions

1. Explain the Meselson-Stahl experiment
2. Why is DNA replication called semi-conservative?
3. What is the role of DNA ligase in replication?
4. Differentiate between leading and lagging strand synthesis
5. Why are Okazaki fragments formed?

## Conclusion

DNA replication is a highly accurate and complex process involving multiple enzymes working in coordination. Understanding this mechanism is crucial for molecular biology and NEET preparation.

---

**Prepared by**: Dr. Shekhar C Singh, AIIMS Alumnus
**For**: NEET Biology Class 12 Preparation`,
  },
  {
    title: 'Human Digestive System: Anatomy and Physiology',
    slug: 'human-digestive-system-anatomy-physiology',
    curriculum: 'NEET',
    grade: 'CLASS_11',
    chapter: 'Digestion and Absorption',
    difficulty: 'Medium',
    metaTitle: 'Human Digestive System | Complete Anatomy & Physiology for NEET',
    metaDescription:
      'Master human digestive system anatomy, enzymes, digestion process, and absorption mechanisms. Comprehensive NEET biology notes.',
    keywords: [
      'digestive system',
      'digestion',
      'absorption',
      'alimentary canal',
      'NEET biology',
      'digestive enzymes',
      'stomach',
      'small intestine',
      'liver',
    ],
    excerpt:
      'Complete notes on human digestive system covering anatomy, digestive enzymes, chemical digestion, and nutrient absorption.',
    content: `# Human Digestive System: Anatomy and Physiology

## Introduction

The digestive system breaks down food into absorbable nutrients, which are then utilized by the body for energy, growth, and repair.

## Components of Digestive System

### 1. Alimentary Canal (9m long)
- Mouth → Pharynx → Esophagus → Stomach → Small Intestine → Large Intestine → Rectum → Anus

### 2. Accessory Organs
- Salivary glands
- Liver
- Gallbladder
- Pancreas

## Detailed Anatomy

### Mouth (Buccal Cavity)

**Structures**:
- Teeth (32 in adults)
- Tongue (muscular organ with taste buds)
- Salivary glands (3 pairs)

**Functions**:
- Mechanical digestion (chewing/mastication)
- Chemical digestion begins
- Formation of bolus

**Saliva Components**:
- **Water**: 99.5%
- **Salivary amylase**: Digests starch → maltose
- **Lysozyme**: Antibacterial enzyme
- **Mucin**: Lubricates food
- **pH**: 6.8 (slightly acidic)

### Esophagus

**Structure**: Muscular tube (~25 cm)

**Function**:
- Transport food via **peristalsis**
- No digestion occurs here

**Sphincters**:
- Upper esophageal sphincter
- Lower esophageal sphincter (prevents acid reflux)

### Stomach

**Structure**:
- J-shaped muscular organ
- Capacity: ~1.5-2 liters

**Regions**:
1. Cardiac region
2. Fundus
3. Body
4. Pyloric region

**Gastric Glands Secrete**:
- **HCl**: pH 1.5-2.0 (kills bacteria, activates pepsinogen)
- **Pepsinogen**: Inactive form → Pepsin (by HCl)
- **Mucus**: Protects stomach lining
- **Intrinsic factor**: Required for vitamin B12 absorption

**Functions**:
- Mechanical mixing (churning)
- Chemical digestion of proteins
- Forms **chyme** (semi-liquid food)
- Limited absorption (water, alcohol, some drugs)

### Small Intestine

**Longest part**: ~6-7 meters

**Three Regions**:
1. **Duodenum** (25 cm): Most digestion occurs here
2. **Jejunum** (2.5 m): Nutrient absorption
3. **Ileum** (3.5 m): Vitamin B12 and bile salt absorption

**Structural Adaptations**:
- **Villi**: Finger-like projections (increase surface area)
- **Microvilli**: On epithelial cells (brush border)
- **Plicae circulares**: Circular folds
- Total surface area: ~250 m²

**Secretions**:
- **Intestinal juice** (succus entericus)
- **Brush border enzymes**

### Large Intestine (Colon)

**Length**: ~1.5 meters

**Regions**:
- Cecum (with appendix)
- Ascending colon
- Transverse colon
- Descending colon
- Sigmoid colon
- Rectum

**Functions**:
- Water absorption (~90%)
- Electrolyte absorption
- Vitamin synthesis by gut bacteria (K, B12, thiamine)
- Formation of feces
- Storage and elimination

## Accessory Organs

### Liver

**Largest gland**: ~1.5 kg

**Functions**:
1. **Bile production** (500-1000 ml/day)
   - Emulsifies fats
   - No enzymes in bile
   - Contains bile salts, bile pigments (bilirubin)
2. Detoxification
3. Glycogen storage
4. Protein synthesis
5. Vitamin storage (A, D, E, K)

### Gallbladder

**Function**: Stores and concentrates bile (10x)

**Bile Release**: Triggered by **CCK** (cholecystokinin) hormone

### Pancreas

**Dual Function**:
1. **Exocrine**: Secretes pancreatic juice (1.5 L/day)
2. **Endocrine**: Secretes insulin and glucagon

**Pancreatic Juice Contains**:
- **Trypsinogen** → Trypsin (by enterokinase)
- **Chymotrypsinogen** → Chymotrypsin
- **Procarboxypeptidase** → Carboxypeptidase
- **Pancreatic amylase**: Starch → maltose
- **Pancreatic lipase**: Fats → fatty acids + glycerol
- **Nucleases**: DNA and RNA digestion
- **Bicarbonate**: Neutralizes acidic chyme (pH 7.8)

## Digestion Process

### Carbohydrate Digestion

| Location | Enzyme | Action | Product |
|----------|--------|--------|---------|
| Mouth | Salivary amylase | Starch → | Maltose |
| Small intestine | Pancreatic amylase | Starch → | Maltose |
| Small intestine | Maltase | Maltose → | Glucose |
| Small intestine | Sucrase | Sucrose → | Glucose + Fructose |
| Small intestine | Lactase | Lactose → | Glucose + Galactose |

### Protein Digestion

| Location | Enzyme | Action | Product |
|----------|--------|--------|---------|
| Stomach | Pepsin | Proteins → | Peptones + Proteoses |
| Small intestine | Trypsin | Peptones → | Polypeptides |
| Small intestine | Chymotrypsin | Proteins → | Polypeptides |
| Small intestine | Carboxypeptidase | Polypeptides → | Amino acids |
| Small intestine | Aminopeptidase | Polypeptides → | Amino acids |
| Small intestine | Dipeptidase | Dipeptides → | Amino acids |

### Fat Digestion

| Location | Enzyme | Action | Product |
|----------|--------|--------|---------|
| Small intestine | Bile salts | Emulsification | Fat droplets |
| Small intestine | Pancreatic lipase | Fats → | Fatty acids + Glycerol |

## Absorption

### Small Intestine

**Carbohydrates**: Absorbed as monosaccharides (glucose, fructose, galactose)
- Via **active transport** and **facilitated diffusion**

**Proteins**: Absorbed as amino acids
- Via **active transport**

**Fats**: Absorbed as fatty acids and glycerol
- Form **micelles** with bile salts
- Enter epithelial cells by **diffusion**
- Re-formed into **chylomicrons**
- Enter **lacteals** (lymphatic vessels)

**Water**: Absorbed by **osmosis** (8-10 liters/day)

**Vitamins**:
- Fat-soluble (A, D, E, K): With fats
- Water-soluble (B, C): By diffusion/active transport

**Minerals**: Active transport (Ca²⁺, Fe²⁺, Na⁺, K⁺)

## Important NEET Points

1. **Longest part**: Small intestine (6-7 m)
2. **Largest gland**: Liver
3. **pH of stomach**: 1.5-2.0 (highly acidic)
4. **pH of pancreatic juice**: 7.8 (alkaline)
5. **Bile**: No enzymes, only emulsifies fats
6. **Trypsinogen activation**: By enterokinase
7. **Vitamin B12 absorption**: Requires intrinsic factor
8. **Water absorption**: Mainly in large intestine

## Clinical Relevance

1. **Peptic ulcer**: Erosion of stomach lining
2. **Diarrhea**: Reduced water absorption in colon
3. **Constipation**: Slow movement through colon
4. **Jaundice**: Bile pigment accumulation
5. **Lactose intolerance**: Lactase deficiency

## Conclusion

The human digestive system is a complex coordinated system involving mechanical and chemical digestion, followed by absorption of nutrients essential for life.

---

**Prepared by**: Dr. Shekhar C Singh, AIIMS Alumnus
**For**: NEET Biology Class 11 Preparation`,
  },
  {
    title: "Mendel's Laws of Inheritance and Genetic Principles",
    slug: 'mendels-laws-inheritance-genetics',
    curriculum: 'NEET',
    grade: 'CLASS_12',
    chapter: 'Principles of Inheritance and Variation',
    difficulty: 'Medium',
    metaTitle: "Mendel's Laws of Inheritance | Complete Genetics Guide for NEET",
    metaDescription:
      "Master Mendel's laws, monohybrid and dihybrid crosses, test cross, back cross, and inheritance patterns for NEET Biology.",
    keywords: [
      'Mendel laws',
      'genetics',
      'inheritance',
      'monohybrid cross',
      'dihybrid cross',
      'NEET biology',
      'test cross',
      'law of segregation',
      'law of independent assortment',
    ],
    excerpt:
      'Complete guide to Mendelian genetics covering laws of inheritance, monohybrid and dihybrid crosses, and genetic problem-solving.',
    content: `# Mendel's Laws of Inheritance and Genetic Principles

## Introduction

**Gregor Johann Mendel** (1822-1884), the "Father of Genetics," conducted experiments on garden pea (*Pisum sativum*) and discovered fundamental laws of inheritance.

## Why Mendel Chose Pea Plants?

### Advantages:
1. **Easy to grow** and maintain
2. **Short life cycle** (one season)
3. **High fertility** (many seeds)
4. **Distinct contrasting traits**
5. **Naturally self-pollinating** (pure lines)
6. **Cross-pollination possible**
7. **Bisexual flowers**

### Seven Contrasting Traits Studied

| Character | Dominant Trait | Recessive Trait |
|-----------|---------------|-----------------|
| Stem height | Tall (T) | Dwarf (t) |
| Flower color | Violet (V) | White (v) |
| Flower position | Axial (A) | Terminal (a) |
| Pod shape | Inflated (I) | Constricted (i) |
| Pod color | Green (G) | Yellow (g) |
| Seed shape | Round (R) | Wrinkled (r) |
| Seed color | Yellow (Y) | Green (y) |

## Mendel's Experimental Approach

1. **Selected pure lines** (homozygous)
2. **Cross-pollination** between contrasting traits
3. **Self-pollination** of F₁ generation
4. **Counted and analyzed** F₂ ratios
5. **Conducted test crosses** for verification

## Mendel's Law of Dominance

**Statement**: "When two contrasting alleles are present together, one expresses itself (dominant) while the other remains suppressed (recessive)."

### Monohybrid Cross Example: Tall × Dwarf

**P generation**: TT (Tall) × tt (Dwarf)

**F₁ generation**:
- Genotype: 100% Tt
- Phenotype: 100% Tall
- *Conclusion*: Tallness is dominant

**F₁ × F₁ cross**: Tt × Tt

**F₂ generation**:
- Genotypic ratio: **1 TT : 2 Tt : 1 tt** (1:2:1)
- Phenotypic ratio: **3 Tall : 1 Dwarf** (3:1)

### Key Terminology

- **Alleles**: Alternative forms of a gene (T and t)
- **Homozygous**: Both alleles same (TT or tt)
- **Heterozygous**: Alleles different (Tt)
- **Dominant**: Allele that expresses in heterozygous condition (T)
- **Recessive**: Allele that expresses only in homozygous condition (t)
- **Genotype**: Genetic makeup (TT, Tt, tt)
- **Phenotype**: Physical appearance (Tall, Dwarf)

## Mendel's Law of Segregation

**Statement**: "During gamete formation, paired alleles separate so that each gamete receives only one allele for each trait."

**Also called**: Law of Purity of Gametes

### Evidence:
- F₁ plants (Tt) produce two types of gametes: T and t (50% each)
- These gametes combine randomly during fertilization
- Produces F₂ ratio of 3:1

### Modern Explanation:
- Occurs during **anaphase I of meiosis**
- Homologous chromosomes separate
- Each gamete gets one allele

## Mendel's Law of Independent Assortment

**Statement**: "During gamete formation, alleles of one gene assort independently of alleles of other genes."

### Dihybrid Cross Example: Round Yellow × Wrinkled Green

**P generation**: RRYY × rryy

**F₁ generation**:
- Genotype: 100% RrYy
- Phenotype: 100% Round Yellow

**F₁ × F₁ cross**: RrYy × RrYy

**F₁ gametes**: RY, Ry, rY, ry (in equal proportions)

**F₂ generation**:
- **Phenotypic ratio**: 9:3:3:1
  - 9 Round Yellow
  - 3 Round Green
  - 3 Wrinkled Yellow
  - 1 Wrinkled Green

- **Genotypic ratio**: 1:2:2:4:1:2:1:2:1

### Punnett Square for Dihybrid Cross

\`\`\`
        RY      Ry      rY      ry
RY    RRYY    RRYy    RrYY    RrYy
Ry    RRYy    RRyy    RrYy    Rryy
rY    RrYY    RrYy    rrYY    rrYy
ry    RrYy    Rryy    rrYy    rryy
\`\`\`

### Modern Explanation:
- Occurs during **metaphase I of meiosis**
- Independent alignment of chromosome pairs
- Only true for genes on **different chromosomes**

## Test Cross

**Purpose**: To determine the genotype of a dominant phenotype

**Cross**: Unknown genotype × Homozygous recessive

**Example**: Tall plant (T?) × Dwarf plant (tt)

**Results**:
- If all offspring are tall → Unknown was TT
- If 50% tall, 50% dwarf → Unknown was Tt

## Back Cross

**Definition**: F₁ hybrid crossed with either parent

**Types**:
1. **Dominant back cross**: F₁ × Dominant parent
2. **Recessive back cross**: F₁ × Recessive parent (= Test cross)

## Incomplete Dominance

**Definition**: Neither allele is completely dominant; heterozygote shows intermediate phenotype

**Example**: Snapdragon flower color
- RR = Red
- rr = White
- Rr = Pink (intermediate)

**F₂ ratio**: 1 Red : 2 Pink : 1 White (1:2:1)

**Note**: Genotypic and phenotypic ratios are the same

## Co-dominance

**Definition**: Both alleles express equally in heterozygote

**Example**: Human ABO blood groups
- I^A and I^B are co-dominant
- I^A I^B = AB blood type (both antigens present)

## Multiple Alleles

**Definition**: More than two allelic forms of a gene in a population

**Example**: ABO blood group system
- Three alleles: I^A, I^B, i
- Possible genotypes: 6
- Possible phenotypes: 4 (A, B, AB, O)

## Important NEET Points

1. **Monohybrid F₂ ratio**: 3:1 (phenotypic), 1:2:1 (genotypic)
2. **Dihybrid F₂ ratio**: 9:3:3:1 (phenotypic)
3. **Test cross ratio**: 1:1 (if heterozygous)
4. **Incomplete dominance F₂**: 1:2:1 (both ratios same)
5. **Number of gamete types**: 2ⁿ (where n = number of heterozygous gene pairs)
6. **Number of phenotypes in F₂**: 2ⁿ (for n genes)
7. **Number of genotypes in F₂**: 3ⁿ (for n genes)

## Formulas and Calculations

### Probability Rules

**Product Rule (AND)**: P(A and B) = P(A) × P(B)

**Sum Rule (OR)**: P(A or B) = P(A) + P(B)

### Example Problem

**Question**: In a dihybrid cross (RrYy × RrYy), what is the probability of getting RrYy offspring?

**Solution**:
- P(Rr) = 1/2
- P(Yy) = 1/2
- P(RrYy) = 1/2 × 1/2 = 1/4

## Exceptions to Mendel's Laws

1. **Linkage**: Genes on same chromosome (violates independent assortment)
2. **Incomplete dominance**: Blending of traits
3. **Co-dominance**: Both alleles express
4. **Epistasis**: One gene masks another
5. **Pleiotropy**: One gene affects multiple traits
6. **Polygenic inheritance**: Multiple genes affect one trait

## Practice Problems

1. In pea plants, tall (T) is dominant over dwarf (t). What will be the phenotypic ratio in F₂ generation of a monohybrid cross?

2. A test cross of a tall pea plant gave 50% tall and 50% dwarf offspring. What is the genotype of the tall parent?

3. In a dihybrid cross, how many different phenotypes appear in the F₂ generation?

4. What is the probability of getting a homozygous recessive offspring from a cross between two heterozygotes?

## Conclusion

Mendel's laws form the foundation of classical genetics. Understanding these principles is crucial for solving genetic problems and predicting inheritance patterns in NEET Biology.

---

**Prepared by**: Dr. Shekhar C Singh, AIIMS Alumnus
**For**: NEET Biology Class 12 Preparation`,
  },
]

export async function POST() {
  try {
    const results = {
      success: [] as string[],
      failed: [] as string[],
    }

    for (const topic of biologyTopics) {
      try {
        const created = await prisma.biologyTopic.create({
          data: {
            ...topic,
            isPublished: true,
            publishedAt: new Date(),
          },
        })
        results.success.push(created.title)
      } catch (error) {
        console.error(`Failed to create topic: ${topic.title}`, error)
        results.failed.push(topic.title)
      }
    }

    return NextResponse.json({
      message: 'Seeding completed',
      results,
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ error: 'Seeding failed', details: error }, { status: 500 })
  }
}
