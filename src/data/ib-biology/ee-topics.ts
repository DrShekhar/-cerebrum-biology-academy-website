/**
 * IB Biology Extended Essay (EE) research-question templates.
 *
 * The EE is an independent 4,000-word research paper. Biology EEs are
 * graded A-E; combined with TOK they can yield up to 3 bonus Diploma
 * points. Topics here are grouped by the four 2025 themes.
 *
 * Each entry is a refined research question plus the experimental
 * scope needed to keep the EE feasible for a secondary-school student.
 */

import type { IATheme } from './ia-topics'

export interface EETopic {
  theme: IATheme
  title: string
  researchQuestion: string
  scope: string
  practicality: 'High' | 'Medium' | 'Low'
  keyChallenges: string[]
}

export const eeTopics: EETopic[] = [
  // Unity and Diversity
  {
    theme: 'Unity and Diversity',
    title: 'Ethanol tolerance across yeast strains',
    researchQuestion:
      'To what extent does ethanol concentration affect the population growth rate of three Saccharomyces cerevisiae strains (brewing, baking, and wild-type)?',
    scope: '5 ethanol levels (0–15 % v/v), OD600 every 2 h for 24 h, 3 strains × 5 replicates.',
    practicality: 'High',
    keyChallenges: [
      'Maintaining constant temperature over 24 hours',
      'Accurate OD600 readings at low cell densities',
    ],
  },
  {
    theme: 'Unity and Diversity',
    title: 'Biodiversity index sensitivity to sampling effort',
    researchQuestion:
      'How does quadrat sample size influence the Simpson diversity index in a temperate grassland community?',
    scope:
      'Quadrats of 0.25, 0.5, 1, 2, 4 m² at 10 replicates each in a standardised grassland plot.',
    practicality: 'High',
    keyChallenges: [
      'Consistent species identification at species level',
      'Handling edge effects in larger quadrats',
    ],
  },
  {
    theme: 'Unity and Diversity',
    title: 'Antibiotic synergy in Gram-negative vs Gram-positive bacteria',
    researchQuestion:
      'Does the synergy between two common antibiotics differ between Escherichia coli and Staphylococcus epidermidis (school-safe strain)?',
    scope:
      'Checkerboard assay with fractional inhibitory concentration index on 2 species, 2 antibiotics, 8 × 8 dilution matrix.',
    practicality: 'Medium',
    keyChallenges: [
      'Sterile technique and ethics approval for bacterial culture',
      'Access to a spectrophotometer for consistent readings',
    ],
  },

  // Form and Function
  {
    theme: 'Form and Function',
    title: 'Leaf stomatal density and altitude in a single species',
    researchQuestion:
      'How does elevation affect the stomatal density and guard-cell length of Rhododendron arboreum leaves along a 1000 m altitudinal gradient?',
    scope: '5 altitudes × 10 leaves each, nail-varnish peels at ×400 magnification.',
    practicality: 'High',
    keyChallenges: [
      'Consistent leaf-position selection (sun leaves only)',
      'Controlling for microclimate differences beyond altitude',
    ],
  },
  {
    theme: 'Form and Function',
    title: 'Pulse-rate recovery in trained vs untrained cohorts',
    researchQuestion:
      'How does regular endurance training (≥5 hours per week) affect the rate of post-exercise heart-rate recovery in 16–18 year-olds?',
    scope:
      '10 trained + 10 untrained consenting volunteers; standardised step protocol; HR sampled every 30 s for 5 min post-exercise.',
    practicality: 'Medium',
    keyChallenges: [
      'Ethics approval and PAR-Q screening',
      'Matching cohorts on confounders (age, BMI, sex)',
    ],
  },
  {
    theme: 'Form and Function',
    title: 'Plant root architecture under variable phosphate supply',
    researchQuestion:
      'To what extent does available phosphate affect primary root length, lateral root density, and root-to-shoot biomass ratio in Arabidopsis thaliana seedlings?',
    scope: '5 [Pi] levels, hydroponic culture, 14-day growth period, n = 20 per treatment.',
    practicality: 'Medium',
    keyChallenges: [
      'Maintaining nutrient solutions at constant concentration',
      'Root architecture imaging (ImageJ measurement consistency)',
    ],
  },

  // Interaction and Interdependence
  {
    theme: 'Interaction and Interdependence',
    title: 'Allelopathy of invasive plants on native seedling growth',
    researchQuestion:
      'How do aqueous extracts of Lantana camara leaves affect the germination rate and seedling biomass of two native grassland species in Delhi NCR?',
    scope:
      '5 extract concentrations × 2 recipient species × 20 seeds per treatment; 21-day growth.',
    practicality: 'High',
    keyChallenges: [
      'Controlling for osmotic effects of the extracts',
      'Species identification in field collection of recipient seeds',
    ],
  },
  {
    theme: 'Interaction and Interdependence',
    title: 'Photosynthesis rate vs canopy light dynamics',
    researchQuestion:
      'How do diurnal changes in canopy light intensity affect the measured photosynthesis rate (leaf-disc method) in Ficus religiosa leaves?',
    scope: 'Sampling at 5 time points over one day in 3 seasons; 10 leaf discs per sample.',
    practicality: 'Medium',
    keyChallenges: [
      'Weather-dependent light intensity variability',
      'Accessing the same tree over multiple seasons',
    ],
  },
  {
    theme: 'Interaction and Interdependence',
    title: 'Soil microbial respiration and nitrogen cycling',
    researchQuestion:
      'How does incubation temperature affect CO₂ efflux from soil of three different land uses (forest, agricultural, urban) in a temperate climate?',
    scope:
      '3 soil types × 4 temperatures × 5 replicates; 7-day CO₂ evolution by alkali trap or sensor.',
    practicality: 'Medium',
    keyChallenges: [
      'Soil homogenisation before incubation',
      'Temperature-controlled incubator access',
    ],
  },

  // Continuity and Change
  {
    theme: 'Continuity and Change',
    title: 'Mutation accumulation in Drosophila under UV stress',
    researchQuestion:
      'To what extent does a single-generation UV-C exposure increase the frequency of visible mutations in F2 Drosophila melanogaster offspring?',
    scope:
      'UV doses (0, 30, 60, 120 s) × parental generation; F1 self-cross; phenotypic screen on ≥500 F2 flies per treatment.',
    practicality: 'Low',
    keyChallenges: [
      '12+ week experimental timeline',
      'Phenotypic screening accuracy across thousands of flies',
    ],
  },
  {
    theme: 'Continuity and Change',
    title: 'Climate-change-linked phenology in a local species',
    researchQuestion:
      'To what extent does mean March temperature (1990–2024) correlate with first-flowering date in three Delhi NCR tree species, using iNaturalist and local herbarium records?',
    scope:
      'Database analysis; ≥300 observations per species; statistical regression with multi-year weather data.',
    practicality: 'High',
    keyChallenges: [
      'Cleaning and validating citizen-science observations',
      'Accessing matched local weather station records',
    ],
  },
  {
    theme: 'Continuity and Change',
    title: 'Hardy-Weinberg violation in taste-sensitivity alleles',
    researchQuestion:
      'Does the observed allele frequency for PTC tasting in a sample of 200 consenting Indian expatriate students in three cities deviate significantly from Hardy-Weinberg equilibrium?',
    scope:
      '3 cities × ≥60 volunteers each; standardised paper-strip protocol; chi-squared against H-W expected.',
    practicality: 'Medium',
    keyChallenges: [
      'Ethics consent for genetic phenotype testing',
      'Representative sampling within each city cohort',
    ],
  },
]

export const eeMeta = {
  wordLimit: 4000,
  subject: 'Biology',
  gradeScale: 'A–E',
  diplomaBonusPoints: 'Up to 3 (combined with TOK)',
  typicalTimeline: '8–12 months (Year 1 to mid-Year 2)',
  submissionFormat: 'IB submits digitally via the Programme Resource Centre',
} as const
