/**
 * PYQ Framing Skill
 *
 * Question framing patterns extracted from NEET PYQs (2008-2025).
 * Used to generate authentic NEET-style questions that match
 * real exam patterns, difficulty levels, and questioning styles.
 */

export interface QuestionFramingTemplate {
  type: string
  weight: number // Percentage of NEET questions using this type
  stemTemplates: string[]
  optionStructure: string
  distractorStrategy: string[]
  examples?: string[]
}

export interface TopicFramingGuide {
  topic: string
  preferredTypes: string[]
  commonMisconceptions: string[]
  keyNCERTStatements: string[]
  diagramReferences?: string[]
}

// NEET Question Types with weights based on PYQ analysis
export const NEET_QUESTION_TYPES: Record<string, QuestionFramingTemplate> = {
  DIRECT_FACTUAL: {
    type: 'DIRECT_FACTUAL',
    weight: 35,
    stemTemplates: [
      'Which of the following is {property} of {subject}?',
      'The {feature} of {subject} is:',
      '{Subject} is characterized by:',
      'Which one of the following statements about {topic} is correct?',
      'The function of {structure} is:',
      '{Term} is defined as:',
      'In {process}, the {component} is responsible for:',
    ],
    optionStructure: 'Four distinct factual options, one clearly correct from NCERT',
    distractorStrategy: [
      'Use commonly confused terms',
      'Include related but incorrect facts',
      'Add options from nearby NCERT sections',
      'Use variations of similar structures/functions',
    ],
  },

  CONCEPTUAL: {
    type: 'CONCEPTUAL',
    weight: 40,
    stemTemplates: [
      'Consider the following statements:\n(i) {statement1}\n(ii) {statement2}\n(iii) {statement3}\nWhich of the above is/are correct?',
      'Read the following statements and select the correct option:\nStatement I: {s1}\nStatement II: {s2}',
      'Which of the following statements is/are correct regarding {topic}?\n(A) {s1}\n(B) {s2}\n(C) {s3}\n(D) {s4}',
      'Select the correct statement(s) about {subject}:',
      'Which of the following is NOT correct about {topic}?',
      'All of the following statements about {topic} are correct EXCEPT:',
    ],
    optionStructure:
      'Combination options like (i) and (ii), (ii) and (iii), (i), (ii) and (iii), etc.',
    distractorStrategy: [
      'Mix true and false statements',
      'Use partially correct statements',
      'Include common misconceptions',
      'Create tricky combinations',
    ],
  },

  ASSERTION_REASON: {
    type: 'ASSERTION_REASON',
    weight: 10,
    stemTemplates: [
      'Assertion (A): {assertion}\nReason (R): {reason}\n\nSelect the correct option:',
    ],
    optionStructure: `(a) Both A and R are true and R is the correct explanation of A
(b) Both A and R are true but R is not the correct explanation of A
(c) A is true but R is false
(d) A is false but R is true`,
    distractorStrategy: [
      'Ensure assertion and reason are logically related but may not explain each other',
      'Use NCERT verbatim statements',
      'Test deeper understanding of cause-effect relationships',
    ],
  },

  MATCH_FOLLOWING: {
    type: 'MATCH_FOLLOWING',
    weight: 8,
    stemTemplates: [
      'Match Column I with Column II and select the correct option:\n\nColumn I          Column II\n(a) {item1}       (i) {match1}\n(b) {item2}       (ii) {match2}\n(c) {item3}       (iii) {match3}\n(d) {item4}       (iv) {match4}',
      'Match the following {category1} with their {category2}:',
    ],
    optionStructure:
      'Four options with different matching combinations like (a)-(i), (b)-(ii), etc.',
    distractorStrategy: [
      'Create plausible mismatches based on similar categories',
      'Use items from same NCERT chapter',
      'Include one obviously correct and one obviously wrong match',
    ],
  },

  DIAGRAM_BASED: {
    type: 'DIAGRAM_BASED',
    weight: 5,
    stemTemplates: [
      'In the given diagram, identify the part labelled as "{label}":',
      'The diagram shows {process/structure}. Identify the correct option:',
      'Study the diagram and answer: {question}',
      'The part marked as X in the given figure represents:',
      'In the diagram of {structure}, the arrows indicate:',
    ],
    optionStructure: 'Four options identifying specific parts or processes shown',
    distractorStrategy: [
      'Include adjacent/related structures',
      'Use commonly confused parts',
      'Reference NCERT figure numbers',
    ],
  },

  APPLICATION: {
    type: 'APPLICATION',
    weight: 2,
    stemTemplates: [
      'A student observed that {observation}. This is because:',
      'In an experiment, when {condition} was applied, {result} was observed. This demonstrates:',
      'A farmer noticed that {scenario}. The most likely reason is:',
      'In a medical case, {symptoms} were observed. This indicates:',
      'During a laboratory experiment on {topic}, {observation}. The conclusion is:',
    ],
    optionStructure: 'Four explanatory options relating observation to biological concept',
    distractorStrategy: [
      'Include plausible but scientifically incorrect explanations',
      'Use common misunderstandings',
      'Add options that are true but not relevant',
    ],
  },
}

// Topic-specific framing guides based on NEET patterns
export const TOPIC_FRAMING_GUIDES: TopicFramingGuide[] = [
  {
    topic: 'Genetics and Evolution',
    preferredTypes: ['CONCEPTUAL', 'DIRECT_FACTUAL', 'MATCH_FOLLOWING'],
    commonMisconceptions: [
      'Confusing dominance with codominance',
      'Mixing up Mendelian ratios',
      'Confusing DNA replication with transcription',
      'Hardy-Weinberg equilibrium conditions',
    ],
    keyNCERTStatements: [
      'Law of Dominance',
      'Law of Segregation',
      'Law of Independent Assortment',
      'Central Dogma of Molecular Biology',
      'Semi-conservative replication',
    ],
  },
  {
    topic: 'Human Physiology',
    preferredTypes: ['DIRECT_FACTUAL', 'DIAGRAM_BASED', 'CONCEPTUAL'],
    commonMisconceptions: [
      'Confusing hormones with enzymes',
      'Mixing up systemic and pulmonary circulation',
      'Confusing inspiration and expiration muscles',
      'Glomerular filtration vs tubular reabsorption',
    ],
    keyNCERTStatements: [
      'Cardiac output calculation',
      'Vital capacity definition',
      'Counter current mechanism',
      'Reflex arc components',
    ],
    diagramReferences: [
      'Heart structure',
      'Nephron diagram',
      'Respiratory system',
      'Brain regions',
    ],
  },
  {
    topic: 'Cell Structure and Function',
    preferredTypes: ['DIAGRAM_BASED', 'DIRECT_FACTUAL', 'CONCEPTUAL'],
    commonMisconceptions: [
      'Confusing cell organelle functions',
      'Mixing up prokaryotic and eukaryotic features',
      'Cell membrane composition errors',
    ],
    keyNCERTStatements: [
      'Cell theory',
      'Fluid mosaic model',
      'Mitochondria as powerhouse',
      '9+2 arrangement in cilia',
    ],
    diagramReferences: ['Cell organelles', 'Mitochondria', 'Nucleus', 'Cell membrane'],
  },
  {
    topic: 'Plant Physiology',
    preferredTypes: ['CONCEPTUAL', 'DIRECT_FACTUAL', 'APPLICATION'],
    commonMisconceptions: [
      'Confusing C3 and C4 pathways',
      'Mixing up photorespiration and respiration',
      'Transpiration pull mechanism',
    ],
    keyNCERTStatements: [
      'Photosynthesis equation',
      'Kranz anatomy',
      'Calvin cycle steps',
      'Pressure flow hypothesis',
    ],
  },
  {
    topic: 'Reproduction',
    preferredTypes: ['DIRECT_FACTUAL', 'DIAGRAM_BASED', 'CONCEPTUAL'],
    commonMisconceptions: [
      'Confusing male and female reproductive structures',
      'Mixing up stages of meiosis',
      'Fertilization process steps',
    ],
    keyNCERTStatements: [
      'Double fertilization',
      'Spermatogenesis vs oogenesis',
      'Menstrual cycle phases',
      'Placenta functions',
    ],
    diagramReferences: [
      'Male reproductive system',
      'Female reproductive system',
      'Flower structure',
    ],
  },
  {
    topic: 'Ecology',
    preferredTypes: ['CONCEPTUAL', 'DIRECT_FACTUAL', 'APPLICATION'],
    commonMisconceptions: [
      'Confusing food chain and food web',
      'Mixing up ecological pyramids',
      'Succession stages confusion',
    ],
    keyNCERTStatements: [
      '10% law of energy transfer',
      'Ecological pyramids types',
      'Biogeochemical cycles',
      'Population growth curves',
    ],
  },
  {
    topic: 'Biotechnology',
    preferredTypes: ['DIRECT_FACTUAL', 'CONCEPTUAL', 'APPLICATION'],
    commonMisconceptions: [
      'Confusing restriction enzymes',
      'Mixing up cloning vectors',
      'PCR steps confusion',
    ],
    keyNCERTStatements: [
      'Restriction enzymes and their sources',
      'Ti plasmid',
      'PCR components and steps',
      'Bt toxin mechanism',
    ],
  },
]

// Difficulty calibration based on NEET standards
export const DIFFICULTY_CALIBRATION = {
  EASY: {
    characteristics: [
      'Direct NCERT recall',
      'Single concept testing',
      'Clear, unambiguous options',
      'No negative marking trap',
    ],
    stemComplexity: 'Simple, single-clause question',
    optionLength: 'Short (1-10 words per option)',
    timeExpected: 30, // seconds
  },
  MEDIUM: {
    characteristics: [
      'Conceptual understanding required',
      'May combine 2 concepts',
      'Requires analysis of options',
      'May have tricky distractors',
    ],
    stemComplexity: 'Moderate, may have 2-3 statements',
    optionLength: 'Medium (10-25 words per option)',
    timeExpected: 60, // seconds
  },
  HARD: {
    characteristics: [
      'Multi-concept integration',
      'Application to new scenarios',
      'Complex statement analysis',
      'Requires deep NCERT knowledge',
    ],
    stemComplexity: 'Complex, multiple statements or scenarios',
    optionLength: 'Long (may include sub-options)',
    timeExpected: 90, // seconds
  },
}

// Generate question using framing skill
export function generateQuestionPrompt(
  type: keyof typeof NEET_QUESTION_TYPES,
  topic: string,
  difficulty: 'EASY' | 'MEDIUM' | 'HARD',
  ncertContent?: string
): string {
  const template = NEET_QUESTION_TYPES[type]
  const difficultyGuide = DIFFICULTY_CALIBRATION[difficulty]
  const topicGuide = TOPIC_FRAMING_GUIDES.find((t) => t.topic === topic)

  return `Generate a NEET Biology ${type} question with the following specifications:

QUESTION TYPE: ${template.type}
WEIGHT IN NEET: ${template.weight}%

STEM TEMPLATES (use one as reference):
${template.stemTemplates.map((s, i) => `${i + 1}. ${s}`).join('\n')}

OPTION STRUCTURE:
${template.optionStructure}

DISTRACTOR STRATEGIES:
${template.distractorStrategy.map((s) => `- ${s}`).join('\n')}

DIFFICULTY: ${difficulty}
${difficultyGuide.characteristics.map((c) => `- ${c}`).join('\n')}
Stem Complexity: ${difficultyGuide.stemComplexity}
Option Length: ${difficultyGuide.optionLength}

TOPIC: ${topic}
${
  topicGuide
    ? `
Common Misconceptions to Test:
${topicGuide.commonMisconceptions.map((m) => `- ${m}`).join('\n')}

Key NCERT Statements to Reference:
${topicGuide.keyNCERTStatements.map((s) => `- ${s}`).join('\n')}
${topicGuide.diagramReferences ? `\nDiagram References: ${topicGuide.diagramReferences.join(', ')}` : ''}`
    : ''
}

${ncertContent ? `NCERT CONTENT TO BASE QUESTION ON:\n${ncertContent}` : ''}

Generate a single high-quality NEET-style question following this exact format:
{
  "question": "...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correctAnswer": "The exact correct option text",
  "explanation": "Detailed explanation with NCERT page reference",
  "difficulty": "${difficulty}",
  "type": "${type}"
}
`
}

// Validate question against NEET standards
export function validateQuestionAgainstNEETStandards(question: {
  question: string
  options: string[]
  correctAnswer: string
  difficulty: string
}): { isValid: boolean; issues: string[] } {
  const issues: string[] = []

  // Check question length
  if (question.question.length < 30) {
    issues.push('Question stem too short for NEET standard')
  }

  // Check options
  if (question.options.length !== 4) {
    issues.push('NEET requires exactly 4 options')
  }

  // Check correct answer is in options
  if (!question.options.includes(question.correctAnswer)) {
    issues.push('Correct answer not found in options')
  }

  // Check for option uniqueness
  const uniqueOptions = new Set(question.options)
  if (uniqueOptions.size !== question.options.length) {
    issues.push('Duplicate options detected')
  }

  // Check for appropriate difficulty indicators
  const diffCalib =
    DIFFICULTY_CALIBRATION[question.difficulty as keyof typeof DIFFICULTY_CALIBRATION]
  if (diffCalib) {
    const avgOptionLength = question.options.reduce((sum, o) => sum + o.split(' ').length, 0) / 4

    if (question.difficulty === 'EASY' && avgOptionLength > 15) {
      issues.push('Options too long for EASY difficulty')
    }
    if (question.difficulty === 'HARD' && avgOptionLength < 5) {
      issues.push('Options too short for HARD difficulty')
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  }
}

// Get recommended question types for a topic
export function getRecommendedTypesForTopic(topic: string): string[] {
  const guide = TOPIC_FRAMING_GUIDES.find((t) =>
    topic.toLowerCase().includes(t.topic.toLowerCase())
  )
  return guide?.preferredTypes || ['DIRECT_FACTUAL', 'CONCEPTUAL']
}

// Calculate question type distribution for a batch
export function calculateTypeDistribution(batchSize: number): Map<string, number> {
  const distribution = new Map<string, number>()

  for (const [type, template] of Object.entries(NEET_QUESTION_TYPES)) {
    const count = Math.round((template.weight / 100) * batchSize)
    if (count > 0) {
      distribution.set(type, count)
    }
  }

  // Ensure we hit exact batch size
  let total = Array.from(distribution.values()).reduce((sum, c) => sum + c, 0)
  while (total < batchSize) {
    distribution.set('CONCEPTUAL', (distribution.get('CONCEPTUAL') || 0) + 1)
    total++
  }

  return distribution
}
