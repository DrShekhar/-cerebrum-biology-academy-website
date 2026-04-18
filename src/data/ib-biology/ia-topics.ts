/**
 * IB Biology Internal Assessment (IA) topic ideas for the 2025 syllabus.
 * Grouped by the four new themes. Each topic includes:
 *  - a research-question template (students refine with their own variable ranges)
 *  - independent / dependent variables
 *  - suggested control variables
 *  - difficulty band (so students pick something their data-collection setup can deliver)
 *  - a note on likely statistical test
 *
 * Sources used for IB Biology 2025 theme structure:
 *  - IB Biology Guide 2025 (themes: Unity & Diversity; Form & Function;
 *    Interaction & Interdependence; Continuity & Change)
 */

export type IATheme =
  | 'Unity and Diversity'
  | 'Form and Function'
  | 'Interaction and Interdependence'
  | 'Continuity and Change'

export type IADifficulty = 'Accessible' | 'Moderate' | 'Challenging'

export interface IATopic {
  theme: IATheme
  title: string
  researchQuestionTemplate: string
  independentVariable: string
  dependentVariable: string
  controlVariables: string[]
  difficulty: IADifficulty
  suggestedStatTest: string
  notes?: string
}

export const iaTopics: IATopic[] = [
  // --- Unity and Diversity ---
  {
    theme: 'Unity and Diversity',
    title: 'Effect of temperature on catalase activity in potato extract',
    researchQuestionTemplate:
      'How does substrate temperature (°C) affect the initial rate of O₂ evolution by catalase extracted from Solanum tuberosum?',
    independentVariable: 'Temperature of H₂O₂ substrate (e.g. 10, 20, 30, 40, 50, 60 °C)',
    dependentVariable:
      'Initial rate of O₂ gas production (cm³ s⁻¹) measured via gas syringe or displacement',
    controlVariables: [
      'Mass of potato extract (g)',
      'Concentration of H₂O₂ (% w/v)',
      'pH of substrate',
      'Volume of substrate (cm³)',
      'Stirring rate',
    ],
    difficulty: 'Accessible',
    suggestedStatTest: 'One-way ANOVA followed by Tukey HSD; report r² from regression',
    notes:
      'Classic, reliable, and shows clear enzyme kinetics — denaturation above ~50 °C gives a strong discussion point.',
  },
  {
    theme: 'Unity and Diversity',
    title: 'Effect of salt concentration on Allium cepa (onion) epidermal cell plasmolysis',
    researchQuestionTemplate:
      'How does the concentration of NaCl solution (mol dm⁻³) affect the percentage of plasmolysed Allium cepa epidermal cells after 15 minutes of immersion?',
    independentVariable: 'NaCl concentration (0.0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0 mol dm⁻³)',
    dependentVariable: '% of plasmolysed cells from a random field of view of ≥50 cells',
    controlVariables: [
      'Immersion time (min)',
      'Epidermal layer position on the bulb',
      'Microscope magnification',
      'Temperature',
      'Cell counting protocol',
    ],
    difficulty: 'Accessible',
    suggestedStatTest:
      'Chi-squared test for goodness of fit; logistic regression for incipient plasmolysis point',
    notes:
      'Allows a strong link to water-potential theory and identification of incipient plasmolysis concentration.',
  },
  {
    theme: 'Unity and Diversity',
    title: 'Comparing amylase activity across germinating and non-germinating seeds',
    researchQuestionTemplate:
      'Does the specific activity of α-amylase differ significantly between germinating and non-germinating Triticum aestivum seeds measured by the iodine starch disappearance assay?',
    independentVariable: 'Seed condition (germinating vs dry)',
    dependentVariable: 'Time (s) for starch-iodine complex to fully disappear at 25 °C',
    controlVariables: [
      'Seed mass (g)',
      'Starch concentration',
      'Temperature (°C)',
      'pH',
      'Extraction protocol',
    ],
    difficulty: 'Moderate',
    suggestedStatTest: 'Two-sample t-test (unequal variances) or Mann-Whitney U',
    notes: 'Good for linking to gibberellin signalling and germination metabolism.',
  },
  {
    theme: 'Unity and Diversity',
    title: 'Biodiversity survey: Simpson index in two contrasting microhabitats',
    researchQuestionTemplate:
      'How does invertebrate Simpson diversity (1−D) differ between a mown lawn and an adjacent untouched grass strip on the school campus?',
    independentVariable: 'Microhabitat (mown vs unmown)',
    dependentVariable: 'Simpson diversity index 1−D',
    controlVariables: [
      'Sampling method (pitfall traps/quadrat)',
      'Sample duration (h)',
      'Time of day',
      'Weather conditions',
    ],
    difficulty: 'Moderate',
    suggestedStatTest: 'Bootstrap confidence intervals on 1−D; Shannon as secondary index',
    notes: 'Strong for ecosystem-scale reasoning; ethical collection protocol required.',
  },

  // --- Form and Function ---
  {
    theme: 'Form and Function',
    title: 'Effect of caffeine concentration on Daphnia heart rate',
    researchQuestionTemplate:
      'How does caffeine concentration (mg dm⁻³) affect the heart rate (beats min⁻¹) of Daphnia magna at 20 °C?',
    independentVariable: 'Caffeine concentration (0, 50, 100, 200, 400 mg dm⁻³)',
    dependentVariable: 'Heart rate (beats min⁻¹) counted from video at ×100',
    controlVariables: [
      'Daphnia body length (mm)',
      'Exposure time (min)',
      'Water temperature (°C)',
      'Light intensity during observation',
    ],
    difficulty: 'Accessible',
    suggestedStatTest: 'ANOVA with post-hoc; Pearson correlation for concentration vs rate',
    notes:
      'Ethics: return organisms to stock tank; use minimum effective doses. Age-match Daphnia to reduce variance.',
  },
  {
    theme: 'Form and Function',
    title: 'Stomatal density vs light exposure in leaves of the same species',
    researchQuestionTemplate:
      'How does sun-versus-shade leaf position affect stomatal density (stomata mm⁻²) on the abaxial surface of Hedera helix leaves?',
    independentVariable: 'Leaf position (full sun vs shaded canopy)',
    dependentVariable: 'Stomatal density per mm²',
    controlVariables: [
      'Leaf maturity (only fully expanded leaves)',
      'Plant species',
      'Location of leaf imprint (mid-lamina)',
      'Microscope calibration',
    ],
    difficulty: 'Accessible',
    suggestedStatTest: 'Two-sample t-test; if non-normal, Mann-Whitney U',
    notes: 'Use nail-varnish peel technique for high-quality imprints; count blind to reduce bias.',
  },
  {
    theme: 'Form and Function',
    title: 'Effect of exercise intensity on lung ventilation rate',
    researchQuestionTemplate:
      'How does exercise intensity (W on a cycle ergometer) affect tidal-volume-corrected minute ventilation (dm³ min⁻¹) in healthy 16–18 year-olds?',
    independentVariable: 'Power output (50, 100, 150, 200 W)',
    dependentVariable: 'Minute ventilation (dm³ min⁻¹)',
    controlVariables: [
      'Participant sex/age bracket',
      'Warm-up protocol',
      'Ambient temperature',
      'Cadence (rpm)',
    ],
    difficulty: 'Moderate',
    suggestedStatTest: 'Repeated-measures ANOVA; regression of MV on workload',
    notes: 'Requires ethics/PAR-Q; uses the physiology ↔ form-and-function link directly.',
  },
  {
    theme: 'Form and Function',
    title: 'Effect of salinity on xylem transport rate in Tradescantia stems',
    researchQuestionTemplate:
      'How does the NaCl concentration of the root medium (mol dm⁻³) affect the dye-ascent rate (mm min⁻¹) in excised Tradescantia stems?',
    independentVariable: 'NaCl concentration (0.00, 0.10, 0.25, 0.50, 0.75 mol dm⁻³)',
    dependentVariable: 'Rate of eosin dye ascent (mm min⁻¹)',
    controlVariables: [
      'Stem diameter (mm)',
      'Stem length (cm)',
      'Humidity',
      'Temperature',
      'Light intensity',
    ],
    difficulty: 'Moderate',
    suggestedStatTest: 'Regression; ANOVA across concentrations',
    notes: 'Links transpiration, water potential and abiotic stress.',
  },

  // --- Interaction and Interdependence ---
  {
    theme: 'Interaction and Interdependence',
    title: 'Allelopathy: effect of Eucalyptus leaf leachate on radish germination',
    researchQuestionTemplate:
      'How does the concentration of Eucalyptus globulus leaf leachate affect the percentage germination of Raphanus sativus seeds over 5 days?',
    independentVariable: 'Leachate concentration (0, 25, 50, 75, 100 %)',
    dependentVariable: '% germination at day 5',
    controlVariables: [
      'Seed batch',
      'Incubation temperature',
      'Light regime',
      'Moisture volume (cm³)',
      'Petri dish size',
    ],
    difficulty: 'Accessible',
    suggestedStatTest: 'Chi-squared; logistic dose-response fit',
    notes: 'Strong interspecies-interaction framing; clear biochemical mechanism to discuss.',
  },
  {
    theme: 'Interaction and Interdependence',
    title: 'Effect of light wavelength on algal (Chlorella) photosynthetic O₂ production',
    researchQuestionTemplate:
      'How does the wavelength of illumination affect the rate of O₂ evolution (measured as % saturation change) in Chlorella vulgaris suspensions of fixed optical density?',
    independentVariable: 'LED wavelength (approx. 450, 525, 590, 625, 660 nm)',
    dependentVariable: 'O₂ % saturation change over 10 minutes',
    controlVariables: [
      'Optical density (600 nm)',
      'Irradiance (μmol m⁻² s⁻¹)',
      'Temperature',
      'CO₂ availability (pH buffer)',
    ],
    difficulty: 'Moderate',
    suggestedStatTest: 'ANOVA; map to absorption spectrum shape',
    notes:
      'Links absorption spectra to action spectra; data-loggers make this realistic at school labs.',
  },
  {
    theme: 'Interaction and Interdependence',
    title: 'Effect of pH on Lactobacillus growth (milk pH drop method)',
    researchQuestionTemplate:
      'How does the starting pH of milk affect the time (h) taken for Lactobacillus bulgaricus cultures to reduce milk pH to 4.5 at 37 °C?',
    independentVariable: 'Initial pH (5.5, 6.0, 6.5, 7.0, 7.5)',
    dependentVariable: 'Time to reach pH 4.5 (h)',
    controlVariables: [
      'Inoculum size',
      'Temperature (°C)',
      'Milk fat content',
      'pH meter calibration',
    ],
    difficulty: 'Moderate',
    suggestedStatTest: 'Regression; ANOVA across pH levels',
    notes: 'Good ecosystem/symbiosis angle — can discuss fermentation and gut microbiota.',
  },

  // --- Continuity and Change ---
  {
    theme: 'Continuity and Change',
    title: 'Effect of UV exposure on yeast (S. cerevisiae) survival',
    researchQuestionTemplate:
      'How does UV-C exposure time (s) affect the viability (% CFU survival) of Saccharomyces cerevisiae on nutrient agar plates?',
    independentVariable: 'UV-C exposure time (0, 10, 30, 60, 120 s)',
    dependentVariable: 'CFU survival (%) normalised to control plate',
    controlVariables: [
      'Cell density at plating',
      'Agar composition',
      'UV-C lamp-to-plate distance',
      'Incubation time/temperature',
    ],
    difficulty: 'Moderate',
    suggestedStatTest: 'ANOVA; log-linear survival curve fit',
    notes: 'Clear link to DNA-damage and repair mechanisms — strong for the mutation section.',
  },
  {
    theme: 'Continuity and Change',
    title: 'Effect of pesticide dose on Drosophila development time',
    researchQuestionTemplate:
      'How does the concentration of a household-grade permethrin solution in the larval medium affect egg-to-adult development time (days) in Drosophila melanogaster at 25 °C?',
    independentVariable: 'Permethrin concentration (0, 0.1, 0.5, 1.0, 2.0 ppm)',
    dependentVariable: 'Mean egg-to-adult development time (days)',
    controlVariables: [
      'Rearing temperature (°C)',
      'Medium composition and volume',
      'Number of eggs per vial',
      'Light/dark cycle',
    ],
    difficulty: 'Challenging',
    suggestedStatTest: 'ANOVA with post-hoc; Kaplan–Meier survival curves for viability',
    notes: 'Strong selection-pressure discussion — links directly to resistance evolution.',
  },
  {
    theme: 'Continuity and Change',
    title: 'Hardy–Weinberg analysis of PTC tasting in a consented volunteer cohort',
    researchQuestionTemplate:
      'Do observed PTC-tasting phenotype frequencies in a sample of ≥80 age-matched volunteers differ significantly from Hardy–Weinberg expectations?',
    independentVariable: 'Phenotype category (taster vs non-taster)',
    dependentVariable: 'Observed vs expected allele and genotype frequencies',
    controlVariables: [
      'Age bracket',
      'Standardised paper-strip protocol',
      'Repeat testing for borderline responders',
    ],
    difficulty: 'Accessible',
    suggestedStatTest: 'Chi-squared goodness of fit against H-W expected',
    notes: 'Zero-apparatus, high-engagement IA; ethics review for taste-testing must be completed.',
  },
  {
    theme: 'Continuity and Change',
    title: 'Database-driven: latitude vs CO₂ concentration anomaly trend',
    researchQuestionTemplate:
      'Does the rate of monthly CO₂ concentration rise (ppm yr⁻¹) in NOAA Mauna Loa data correlate with the latitude-adjusted warming trend between 2000 and 2024?',
    independentVariable: 'Latitude band (equatorial, mid-latitude, high-latitude) — from HadCRUT',
    dependentVariable: 'CO₂ concentration rise rate (ppm yr⁻¹)',
    controlVariables: ['Dataset selection', 'Time window', 'Quality-flag filtering'],
    difficulty: 'Accessible',
    suggestedStatTest: 'Pearson correlation; regression with residual analysis',
    notes:
      'Database IAs are fully accepted under the 2025 guidance. Strong option for students without lab access.',
  },
]

/**
 * Quick lookup helpers
 */
export function iaTopicsByTheme(theme: IATheme): IATopic[] {
  return iaTopics.filter((t) => t.theme === theme)
}

export const iaThemes: IATheme[] = [
  'Unity and Diversity',
  'Form and Function',
  'Interaction and Interdependence',
  'Continuity and Change',
]
