/**
 * Biology-Specific Question Types for Enhanced NEET Preparation
 * Expanded beyond traditional formats with domain-specific requirements
 */

export interface BiologyQuestionType {
  id: string
  name: string
  description: string
  cognitiveLevel: string[]
  neetFrequency: number
  timeComplexity: 'low' | 'medium' | 'high'
  structure: QuestionStructure
  validationRules: ValidationRule[]
  gradingCriteria: GradingCriteria
}

export interface QuestionStructure {
  requiredFields: string[]
  optionalFields: string[]
  formatSpecification: string
  exampleStructure: any
}

export interface ValidationRule {
  field: string
  rule: string
  errorMessage: string
  severity: 'error' | 'warning'
}

export interface GradingCriteria {
  maxMarks: number
  partialCreditRules: PartialCreditRule[]
  timeBonus: boolean
  penaltyRules: PenaltyRule[]
}

export interface PartialCreditRule {
  condition: string
  creditPercentage: number
  description: string
}

export interface PenaltyRule {
  condition: string
  penaltyPercentage: number
  description: string
}

export class BiologyQuestionTypeRegistry {
  private readonly questionTypes: Record<string, BiologyQuestionType> = {
    // Enhanced Traditional Types
    enhanced_mcq: {
      id: 'enhanced_mcq',
      name: 'Enhanced Multiple Choice',
      description: 'Advanced MCQ with multiple correct answers and weighted scoring',
      cognitiveLevel: ['remember', 'understand', 'apply', 'analyze'],
      neetFrequency: 0.85,
      timeComplexity: 'medium',
      structure: {
        requiredFields: ['question', 'options', 'correctAnswers', 'explanation'],
        optionalFields: ['hints', 'relatedConcepts', 'commonMistakes'],
        formatSpecification: 'Multiple options with one or more correct answers',
        exampleStructure: {
          question: 'Which of the following are characteristics of enzymes?',
          options: [
            'A) Protein in nature',
            'B) Lower activation energy',
            'C) Get consumed in reaction',
            'D) Specific to substrate',
          ],
          correctAnswers: [0, 1, 3],
          explanation:
            'Enzymes are proteins that lower activation energy and are substrate-specific but are not consumed.',
          hints: ['Think about enzyme properties', 'Consider what makes enzymes unique'],
          relatedConcepts: ['protein structure', 'catalysis', 'lock-and-key model'],
          commonMistakes: ['Thinking enzymes are consumed', 'Ignoring specificity'],
        },
      },
      validationRules: [
        {
          field: 'correctAnswers',
          rule: 'array_not_empty',
          errorMessage: 'At least one correct answer required',
          severity: 'error',
        },
        {
          field: 'options',
          rule: 'min_length_4',
          errorMessage: 'Minimum 4 options required',
          severity: 'error',
        },
      ],
      gradingCriteria: {
        maxMarks: 4,
        partialCreditRules: [
          {
            condition: 'some_correct_selected',
            creditPercentage: 50,
            description: 'Partial credit for some correct answers',
          },
        ],
        timeBonus: true,
        penaltyRules: [
          {
            condition: 'incorrect_selected',
            penaltyPercentage: 25,
            description: 'Penalty for selecting incorrect options',
          },
        ],
      },
    },

    diagram_interpretation: {
      id: 'diagram_interpretation',
      name: 'Diagram Interpretation',
      description: 'Questions based on biological diagrams, graphs, and charts',
      cognitiveLevel: ['understand', 'apply', 'analyze'],
      neetFrequency: 0.7,
      timeComplexity: 'high',
      structure: {
        requiredFields: [
          'diagramDescription',
          'question',
          'options',
          'correctAnswer',
          'explanation',
        ],
        optionalFields: ['diagramType', 'labelingRequired', 'measurementData'],
        formatSpecification: 'Text description of diagram with interpretation questions',
        exampleStructure: {
          diagramDescription:
            'A graph showing oxygen dissociation curve with two lines - one normal, one shifted right',
          diagramType: 'graph',
          question:
            'What condition would cause the rightward shift in the oxygen-hemoglobin curve?',
          options: [
            'A) Low temperature',
            'B) High CO2 concentration',
            'C) Low 2,3-BPG',
            'D) Alkaline pH',
          ],
          correctAnswer: 1,
          explanation:
            'High CO2 (Bohr effect) shifts curve right, reducing hemoglobin affinity for oxygen',
          labelingRequired: ['x-axis: pO2', 'y-axis: % saturation'],
          measurementData: { p50_normal: 27, p50_shifted: 35 },
        },
      },
      validationRules: [
        {
          field: 'diagramDescription',
          rule: 'min_length_50',
          errorMessage: 'Diagram description too brief',
          severity: 'warning',
        },
        {
          field: 'diagramType',
          rule: 'valid_type',
          errorMessage: 'Invalid diagram type',
          severity: 'error',
        },
      ],
      gradingCriteria: {
        maxMarks: 4,
        partialCreditRules: [
          {
            condition: 'correct_interpretation_wrong_conclusion',
            creditPercentage: 60,
            description: 'Correct process understanding',
          },
        ],
        timeBonus: false,
        penaltyRules: [],
      },
    },

    experimental_design: {
      id: 'experimental_design',
      name: 'Experimental Design',
      description: 'Questions requiring design or evaluation of biological experiments',
      cognitiveLevel: ['apply', 'analyze', 'evaluate', 'create'],
      neetFrequency: 0.45,
      timeComplexity: 'high',
      structure: {
        requiredFields: ['scenario', 'task', 'expectedResponse', 'evaluationCriteria'],
        optionalFields: ['materials', 'variables', 'controls', 'limitations'],
        formatSpecification: 'Open-ended experimental design or critique',
        exampleStructure: {
          scenario: 'A student wants to test the effect of light intensity on photosynthesis rate',
          task: 'Design an experiment to test this hypothesis',
          expectedResponse: {
            hypothesis:
              'Higher light intensity increases photosynthesis rate up to saturation point',
            variables: {
              independent: 'light intensity',
              dependent: 'O2 production rate',
              controlled: ['temperature', 'CO2 concentration', 'plant species'],
            },
            procedure: 'Step-by-step experimental protocol',
            controls: 'Dark control, multiple light intensities',
            measurements: 'O2 bubbles per minute or O2 concentration',
          },
          evaluationCriteria: [
            'hypothesis clarity',
            'variable identification',
            'control validity',
            'measurement feasibility',
          ],
          materials: ['aquatic plant', 'light source', 'measuring cylinder', 'stopwatch'],
          limitations: [
            'individual plant variation',
            'measurement accuracy',
            'light quality differences',
          ],
        },
      },
      validationRules: [
        {
          field: 'evaluationCriteria',
          rule: 'min_length_3',
          errorMessage: 'Insufficient evaluation criteria',
          severity: 'error',
        },
        {
          field: 'expectedResponse',
          rule: 'object_not_empty',
          errorMessage: 'Expected response structure required',
          severity: 'error',
        },
      ],
      gradingCriteria: {
        maxMarks: 6,
        partialCreditRules: [
          {
            condition: 'correct_hypothesis',
            creditPercentage: 20,
            description: 'Valid hypothesis formation',
          },
          {
            condition: 'variable_identification',
            creditPercentage: 30,
            description: 'Correct variable identification',
          },
          {
            condition: 'procedure_logical',
            creditPercentage: 30,
            description: 'Logical experimental procedure',
          },
          {
            condition: 'controls_appropriate',
            creditPercentage: 20,
            description: 'Appropriate controls identified',
          },
        ],
        timeBonus: false,
        penaltyRules: [],
      },
    },

    process_sequencing: {
      id: 'process_sequencing',
      name: 'Biological Process Sequencing',
      description: 'Questions requiring correct ordering of biological processes or events',
      cognitiveLevel: ['understand', 'apply'],
      neetFrequency: 0.6,
      timeComplexity: 'medium',
      structure: {
        requiredFields: ['process', 'steps', 'correctSequence', 'explanation'],
        optionalFields: ['branchingPoints', 'alternatives', 'regulation'],
        formatSpecification: 'Steps to be arranged in correct biological sequence',
        exampleStructure: {
          process: 'Protein Synthesis',
          steps: [
            'Translation initiation at ribosome',
            'Transcription of mRNA from DNA',
            'mRNA processing and splicing',
            'Polypeptide folding and modification',
            'tRNA brings amino acids to ribosome',
            'Ribosome moves along mRNA',
          ],
          correctSequence: [1, 2, 0, 4, 5, 3],
          explanation: 'Protein synthesis follows central dogma: DNA → RNA → Protein',
          branchingPoints: ['alternative splicing during mRNA processing'],
          regulation: ['transcription factors', 'riboswitches', 'micro RNAs'],
        },
      },
      validationRules: [
        {
          field: 'steps',
          rule: 'min_length_4',
          errorMessage: 'Minimum 4 steps required',
          severity: 'error',
        },
        {
          field: 'correctSequence',
          rule: 'valid_permutation',
          errorMessage: 'Invalid sequence array',
          severity: 'error',
        },
      ],
      gradingCriteria: {
        maxMarks: 3,
        partialCreditRules: [
          {
            condition: 'partial_sequence_correct',
            creditPercentage: 40,
            description: 'Some steps in correct order',
          },
          {
            condition: 'adjacent_pairs_correct',
            creditPercentage: 60,
            description: 'Adjacent step relationships correct',
          },
        ],
        timeBonus: true,
        penaltyRules: [],
      },
    },

    case_study_analysis: {
      id: 'case_study_analysis',
      name: 'Clinical Case Study Analysis',
      description: 'Medical/clinical scenarios requiring biological knowledge application',
      cognitiveLevel: ['apply', 'analyze', 'evaluate'],
      neetFrequency: 0.55,
      timeComplexity: 'high',
      structure: {
        requiredFields: ['case', 'symptoms', 'questions', 'expectedAnalysis'],
        optionalFields: ['labResults', 'treatmentOptions', 'prognosis'],
        formatSpecification: 'Clinical scenario with analytical questions',
        exampleStructure: {
          case: 'A 45-year-old man presents with fatigue, frequent urination, and excessive thirst',
          symptoms: ['polyuria', 'polydipsia', 'fatigue', 'weight loss'],
          labResults: { glucose: '250 mg/dL', HbA1c: '8.5%', ketones: 'present' },
          questions: [
            'What is the most likely diagnosis?',
            'Explain the physiological basis of the symptoms',
            'What hormone deficiency is involved?',
          ],
          expectedAnalysis: {
            diagnosis: 'Type 1 Diabetes Mellitus',
            mechanism: 'Insulin deficiency leads to hyperglycemia and ketogenesis',
            hormone: 'Insulin from pancreatic beta cells',
            physiology: 'Glucose unable to enter cells, osmotic diuresis causes symptoms',
          },
          treatmentOptions: ['insulin therapy', 'dietary modification', 'blood glucose monitoring'],
        },
      },
      validationRules: [
        {
          field: 'case',
          rule: 'min_length_100',
          errorMessage: 'Case description too brief',
          severity: 'warning',
        },
        {
          field: 'questions',
          rule: 'min_length_2',
          errorMessage: 'At least 2 questions required',
          severity: 'error',
        },
      ],
      gradingCriteria: {
        maxMarks: 5,
        partialCreditRules: [
          {
            condition: 'correct_diagnosis',
            creditPercentage: 40,
            description: 'Accurate diagnosis',
          },
          {
            condition: 'mechanism_understanding',
            creditPercentage: 40,
            description: 'Correct physiological mechanism',
          },
          {
            condition: 'symptom_correlation',
            creditPercentage: 20,
            description: 'Symptoms linked to pathophysiology',
          },
        ],
        timeBonus: false,
        penaltyRules: [],
      },
    },

    calculation_problems: {
      id: 'calculation_problems',
      name: 'Biological Calculations',
      description: 'Quantitative problems requiring mathematical analysis',
      cognitiveLevel: ['apply', 'analyze'],
      neetFrequency: 0.4,
      timeComplexity: 'high',
      structure: {
        requiredFields: ['problem', 'givenData', 'formula', 'solution', 'units'],
        optionalFields: ['assumptions', 'alternativeMethods', 'errorAnalysis'],
        formatSpecification: 'Mathematical problem with biological context',
        exampleStructure: {
          problem: 'Calculate the rate of photosynthesis in aquatic plant',
          givenData: {
            bubbles_per_minute: 20,
            bubble_volume: '0.1 mL',
            time_period: '10 minutes',
            temperature: '25°C',
            light_intensity: '1000 lux',
          },
          formula: 'Rate = (Number of bubbles × Volume per bubble) / Time',
          solution: {
            calculation: '(20 × 0.1) / 10 = 0.2 mL/min',
            final_answer: '0.2 mL O2/min',
            interpretation: 'Moderate photosynthesis rate under given conditions',
          },
          units: 'mL O2/min',
          assumptions: ['constant bubble size', 'all gas is O2', 'steady state conditions'],
          alternativeMethods: ['O2 electrode measurement', 'CO2 consumption rate'],
        },
      },
      validationRules: [
        {
          field: 'formula',
          rule: 'not_empty',
          errorMessage: 'Formula required for calculation',
          severity: 'error',
        },
        {
          field: 'units',
          rule: 'appropriate_units',
          errorMessage: 'Appropriate units required',
          severity: 'error',
        },
      ],
      gradingCriteria: {
        maxMarks: 4,
        partialCreditRules: [
          {
            condition: 'correct_formula',
            creditPercentage: 30,
            description: 'Correct formula identification',
          },
          {
            condition: 'correct_substitution',
            creditPercentage: 30,
            description: 'Proper value substitution',
          },
          {
            condition: 'correct_calculation',
            creditPercentage: 30,
            description: 'Accurate mathematical calculation',
          },
          {
            condition: 'correct_units',
            creditPercentage: 10,
            description: 'Appropriate units used',
          },
        ],
        timeBonus: true,
        penaltyRules: [
          {
            condition: 'unit_error',
            penaltyPercentage: 10,
            description: 'Incorrect or missing units',
          },
        ],
      },
    },

    comparative_analysis: {
      id: 'comparative_analysis',
      name: 'Comparative Biology Analysis',
      description: 'Questions comparing biological structures, processes, or organisms',
      cognitiveLevel: ['analyze', 'evaluate'],
      neetFrequency: 0.65,
      timeComplexity: 'medium',
      structure: {
        requiredFields: ['subjects', 'comparisonCriteria', 'analysis', 'conclusion'],
        optionalFields: ['evolutionaryContext', 'functionalSignificance', 'exceptions'],
        formatSpecification: 'Structured comparison with analytical conclusions',
        exampleStructure: {
          subjects: ['C3 plants', 'C4 plants', 'CAM plants'],
          comparisonCriteria: [
            'CO2 fixation pathway',
            'water efficiency',
            'temperature adaptation',
            'energy cost',
          ],
          analysis: {
            CO2_fixation: {
              C3: 'Direct fixation by RuBisCO',
              C4: 'Initial fixation by PEP carboxylase',
              CAM: 'Temporal separation of fixation',
            },
            water_efficiency: {
              C3: 'Low (high water loss)',
              C4: 'High (reduced water loss)',
              CAM: 'Highest (minimal water loss)',
            },
          },
          conclusion: 'C4 and CAM are adaptations to hot, dry environments',
          evolutionaryContext: 'Convergent evolution for water conservation',
          functionalSignificance: 'Survival in different ecological niches',
        },
      },
      validationRules: [
        {
          field: 'subjects',
          rule: 'min_length_2',
          errorMessage: 'At least 2 subjects required for comparison',
          severity: 'error',
        },
        {
          field: 'comparisonCriteria',
          rule: 'min_length_3',
          errorMessage: 'At least 3 criteria needed',
          severity: 'warning',
        },
      ],
      gradingCriteria: {
        maxMarks: 5,
        partialCreditRules: [
          {
            condition: 'accurate_comparisons',
            creditPercentage: 50,
            description: 'Accurate factual comparisons',
          },
          {
            condition: 'logical_analysis',
            creditPercentage: 30,
            description: 'Logical analytical thinking',
          },
          {
            condition: 'valid_conclusion',
            creditPercentage: 20,
            description: 'Valid conclusions drawn',
          },
        ],
        timeBonus: false,
        penaltyRules: [],
      },
    },

    genetics_pedigree: {
      id: 'genetics_pedigree',
      name: 'Genetics Pedigree Analysis',
      description: 'Pedigree charts and inheritance pattern analysis',
      cognitiveLevel: ['apply', 'analyze'],
      neetFrequency: 0.75,
      timeComplexity: 'high',
      structure: {
        requiredFields: ['pedigreeDescription', 'questions', 'inheritancePattern', 'analysis'],
        optionalFields: ['generations', 'probabilities', 'carrierIdentification'],
        formatSpecification: 'Pedigree chart with genetic analysis questions',
        exampleStructure: {
          pedigreeDescription:
            'Three-generation family tree showing affected males in each generation through unaffected females',
          generations: {
            I: { '1': 'unaffected male', '2': 'unaffected female' },
            II: { '1': 'affected male', '2': 'unaffected female', '3': 'unaffected male' },
            III: { '1': 'affected male', '2': 'unaffected female' },
          },
          questions: [
            'What is the most likely inheritance pattern?',
            'What is the probability of III-2 being a carrier?',
            'If III-2 has children with an unaffected male, what is the risk?',
          ],
          inheritancePattern: 'X-linked recessive',
          analysis: {
            evidence: [
              'affected males only',
              'transmission through unaffected females',
              'no male-to-male transmission',
            ],
            carrierFemales: ['I-2', 'II-2'],
            probabilities: { 'III-2_carrier': 0.5, offspring_affected: 0.25 },
          },
        },
      },
      validationRules: [
        {
          field: 'pedigreeDescription',
          rule: 'contains_generations',
          errorMessage: 'Must specify generational information',
          severity: 'error',
        },
        {
          field: 'inheritancePattern',
          rule: 'valid_pattern',
          errorMessage: 'Must specify valid inheritance pattern',
          severity: 'error',
        },
      ],
      gradingCriteria: {
        maxMarks: 6,
        partialCreditRules: [
          {
            condition: 'correct_pattern_identification',
            creditPercentage: 40,
            description: 'Correct inheritance pattern',
          },
          {
            condition: 'accurate_probability_calculation',
            creditPercentage: 30,
            description: 'Accurate probability calculations',
          },
          {
            condition: 'carrier_identification',
            creditPercentage: 20,
            description: 'Correct carrier identification',
          },
          {
            condition: 'reasoning_explanation',
            creditPercentage: 10,
            description: 'Clear reasoning provided',
          },
        ],
        timeBonus: false,
        penaltyRules: [],
      },
    },
  }

  /**
   * Get all available question types
   */
  getAllQuestionTypes(): BiologyQuestionType[] {
    return Object.values(this.questionTypes)
  }

  /**
   * Get question types by cognitive level
   */
  getQuestionTypesByCognitiveLevel(level: string): BiologyQuestionType[] {
    return Object.values(this.questionTypes).filter((type) => type.cognitiveLevel.includes(level))
  }

  /**
   * Get question types by NEET frequency threshold
   */
  getQuestionTypesByNEETFrequency(minFrequency: number): BiologyQuestionType[] {
    return Object.values(this.questionTypes).filter((type) => type.neetFrequency >= minFrequency)
  }

  /**
   * Get question types by time complexity
   */
  getQuestionTypesByTimeComplexity(complexity: 'low' | 'medium' | 'high'): BiologyQuestionType[] {
    return Object.values(this.questionTypes).filter((type) => type.timeComplexity === complexity)
  }

  /**
   * Get question type by ID
   */
  getQuestionType(id: string): BiologyQuestionType | null {
    return this.questionTypes[id] || null
  }

  /**
   * Validate question against type rules
   */
  validateQuestion(questionTypeId: string, questionData: any): ValidationResult {
    const questionType = this.getQuestionType(questionTypeId)
    if (!questionType) {
      return { isValid: false, errors: ['Invalid question type'], warnings: [] }
    }

    const errors: string[] = []
    const warnings: string[] = []

    // Check required fields
    for (const field of questionType.structure.requiredFields) {
      if (!questionData[field]) {
        errors.push(`Required field '${field}' is missing`)
      }
    }

    // Apply validation rules
    for (const rule of questionType.validationRules) {
      const isValid = this.applyValidationRule(questionData[rule.field], rule.rule)
      if (!isValid) {
        if (rule.severity === 'error') {
          errors.push(rule.errorMessage)
        } else {
          warnings.push(rule.errorMessage)
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Apply specific validation rule
   */
  private applyValidationRule(value: any, rule: string): boolean {
    switch (rule) {
      case 'array_not_empty':
        return Array.isArray(value) && value.length > 0
      case 'min_length_4':
        return Array.isArray(value) && value.length >= 4
      case 'min_length_3':
        return Array.isArray(value) && value.length >= 3
      case 'min_length_2':
        return Array.isArray(value) && value.length >= 2
      case 'min_length_50':
        return typeof value === 'string' && value.length >= 50
      case 'min_length_100':
        return typeof value === 'string' && value.length >= 100
      case 'not_empty':
        return value !== null && value !== undefined && value !== ''
      case 'object_not_empty':
        return typeof value === 'object' && Object.keys(value).length > 0
      case 'valid_permutation':
        return Array.isArray(value) && value.every((v) => typeof v === 'number')
      case 'valid_type':
        const validTypes = ['graph', 'chart', 'diagram', 'flowchart', 'tree', 'cycle']
        return validTypes.includes(value)
      case 'appropriate_units':
        return typeof value === 'string' && value.length > 0
      case 'contains_generations':
        return typeof value === 'string' && /generation|Gen|I{1,3}|II{1,3}/.test(value)
      case 'valid_pattern':
        const patterns = [
          'autosomal dominant',
          'autosomal recessive',
          'X-linked dominant',
          'X-linked recessive',
          'Y-linked',
          'mitochondrial',
        ]
        return patterns.includes(value)
      default:
        return true
    }
  }

  /**
   * Calculate question difficulty score
   */
  calculateDifficultyScore(questionTypeId: string, questionData: any): number {
    const questionType = this.getQuestionType(questionTypeId)
    if (!questionType) return 0

    let score = 0

    // Base score from time complexity
    const complexityScores = { low: 2, medium: 5, high: 8 }
    score += complexityScores[questionType.timeComplexity]

    // Cognitive level contribution
    const cognitiveScores = {
      remember: 1,
      understand: 2,
      apply: 4,
      analyze: 6,
      evaluate: 8,
      create: 10,
    }
    const maxCognitiveScore = Math.max(
      ...questionType.cognitiveLevel.map((level) => cognitiveScores[level] || 0)
    )
    score += maxCognitiveScore

    // Question-specific complexity factors
    if (questionData.options && questionData.options.length > 4) score += 1
    if (questionData.multipleCorrect) score += 2
    if (questionData.calculation) score += 3
    if (questionData.analysis) score += 2

    return Math.min(score, 10) // Cap at 10
  }
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// Export singleton instance
export const biologyQuestionRegistry = new BiologyQuestionTypeRegistry()

// Export question type IDs for easy reference
export const BIOLOGY_QUESTION_TYPES = {
  ENHANCED_MCQ: 'enhanced_mcq',
  DIAGRAM_INTERPRETATION: 'diagram_interpretation',
  EXPERIMENTAL_DESIGN: 'experimental_design',
  PROCESS_SEQUENCING: 'process_sequencing',
  CASE_STUDY_ANALYSIS: 'case_study_analysis',
  CALCULATION_PROBLEMS: 'calculation_problems',
  COMPARATIVE_ANALYSIS: 'comparative_analysis',
  GENETICS_PEDIGREE: 'genetics_pedigree',
} as const
