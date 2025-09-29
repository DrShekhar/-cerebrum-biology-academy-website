/**
 * Enhanced AI Prompt Templates for Superior Biology Question Generation
 * Optimized for NEET pattern, cognitive levels, and educational psychology
 */

export interface PromptTemplate {
  id: string
  name: string
  description: string
  systemPrompt: string
  userPromptTemplate: string
  examples: string[]
  cognitiveLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
  neetRelevance: number
  difficultyOptimization: boolean
}

export interface NEETPatternData {
  previousYearFrequency: Record<string, number>
  topicWeightage: Record<string, number>
  questionDistribution: Record<string, number>
  commonMistakes: string[]
  examTricks: string[]
}

export class EnhancedPromptEngine {
  private readonly neetPatterns: NEETPatternData = {
    previousYearFrequency: {
      'genetics': 0.18,
      'human-physiology': 0.16,
      'plant-physiology': 0.14,
      'cell-biology': 0.12,
      'ecology': 0.10,
      'reproduction': 0.08,
      'evolution': 0.07,
      'biotechnology': 0.06,
      'diversity': 0.05,
      'molecular-biology': 0.04
    },
    topicWeightage: {
      'genetics': 36,
      'human-physiology': 32,
      'plant-physiology': 28,
      'cell-biology': 24,
      'ecology': 20,
      'reproduction': 16,
      'evolution': 14,
      'biotechnology': 12,
      'diversity': 10,
      'molecular-biology': 8
    },
    questionDistribution: {
      'conceptual': 0.45,
      'application': 0.30,
      'analytical': 0.15,
      'factual': 0.10
    },
    commonMistakes: [
      'Confusing similar biological processes',
      'Incorrect application of genetic laws',
      'Misunderstanding enzyme kinetics',
      'Wrong interpretation of physiological mechanisms',
      'Confusion between plant and animal processes'
    ],
    examTricks: [
      'Cross-reference multiple topics in single question',
      'Include recent biological discoveries',
      'Test application in real-world scenarios',
      'Focus on exceptions to general rules',
      'Combine multiple concepts for analysis'
    ]
  }

  private readonly promptTemplates: Record<string, PromptTemplate> = {
    neet_optimized_mcq: {
      id: 'neet_optimized_mcq',
      name: 'NEET-Optimized MCQ Generator',
      description: 'Advanced MCQ generation with NEET pattern analysis and cognitive alignment',
      systemPrompt: `You are NEET Biology Expert Dr. Sharma, with 15+ years of experience in NEET coaching and question paper setting. You have analyzed 10,000+ NEET questions and understand the exact patterns, difficulty progression, and cognitive requirements.

Your expertise includes:
- NEET syllabus mastery (NCERT Class 11 & 12)
- Question pattern analysis (2015-2024)
- Cognitive taxonomy alignment
- Distractor psychology and common student errors
- Time management optimization for NEET Biology

Generate questions that mirror actual NEET standards with scientific accuracy, appropriate difficulty curves, and strategic distractor placement.`,

      userPromptTemplate: `Generate {{questionCount}} NEET Biology MCQs for "{{topic}}" ({{chapter}})

**NEET SPECIFICATION:**
- Difficulty: {{difficulty}} ({{cognitiveLevel}})
- Previous Year Frequency: {{frequency}}%
- Topic Weightage: {{weightage}} marks typically
- Target Time: {{timePerQuestion}} seconds/question

**QUALITY REQUIREMENTS:**
1. **Scientific Accuracy**: Use latest NCERT references and current biological understanding
2. **NEET Pattern Alignment**: Mirror actual NEET question structure and language
3. **Cognitive Targeting**: Focus on {{cognitiveLevel}} level thinking (Bloom's Taxonomy)
4. **Strategic Distractors**: Include common misconceptions and near-correct options
5. **Time Optimization**: Questions solvable within target time by well-prepared students

**CONTENT FOCUS AREAS:**
{{topicDetails}}

**DISTRACTOR STRATEGY:**
- Option A: Correct answer with precise scientific terminology
- Option B: Common misconception or confusion with related concept
- Option C: Partially correct but incomplete understanding
- Option D: Factual error or completely unrelated concept

**EXPLANATION REQUIREMENTS:**
- Step-by-step logical reasoning
- Connection to fundamental principles
- Common mistakes to avoid
- NEET exam tips and shortcuts
- Related concept linkages

**OUTPUT FORMAT:**
{
  "questions": [
    {
      "question": "Clear, concise question text with proper scientific terminology",
      "options": ["A) Precise correct answer", "B) Strategic distractor", "C) Common misconception", "D) Factual error"],
      "correctAnswer": 0,
      "explanation": {
        "reasoning": "Step-by-step logical explanation",
        "conceptConnection": "Link to fundamental principles",
        "examTip": "NEET-specific solving strategy",
        "commonMistakes": "Frequent student errors to avoid"
      },
      "metadata": {
        "cognitiveLevel": "{{cognitiveLevel}}",
        "timeEstimate": {{timePerQuestion}},
        "neetRelevance": "High/Medium/Low",
        "previousYearSimilarity": "2023 Q47, 2021 Q52",
        "conceptDifficulty": 1-10 scale,
        "solvingStrategy": "elimination/direct/calculation"
      }
    }
  ]
}

Generate questions that help students achieve 330+/360 in NEET Biology through strategic practice.`,

      examples: [
        'Which enzyme is responsible for the unwinding of DNA during replication?',
        'In C4 plants, the primary CO2 acceptor in mesophyll cells is:',
        'The phenomenon of heterosis is best explained by which genetic principle?'
      ],
      cognitiveLevel: 'apply',
      neetRelevance: 0.95,
      difficultyOptimization: true
    },

    conceptual_deep_dive: {
      id: 'conceptual_deep_dive',
      name: 'Conceptual Deep Dive Generator',
      description: 'Creates questions that test deep conceptual understanding',
      systemPrompt: `You are Professor Biology, a distinguished educator known for creating questions that reveal true conceptual understanding rather than rote memorization. Your questions identify gaps in student comprehension and build robust knowledge foundations.`,

      userPromptTemplate: `Create {{questionCount}} conceptual questions for "{{topic}}" that test deep understanding.

**CONCEPTUAL FRAMEWORK:**
- Core Principle: {{corePrinciple}}
- Related Concepts: {{relatedConcepts}}
- Common Misconceptions: {{misconceptions}}
- Real-world Applications: {{applications}}

**COGNITIVE DEMAND:**
Target {{cognitiveLevel}} level thinking with emphasis on:
- Principle application in novel contexts
- Causal relationship analysis
- Exception identification and explanation
- Cross-topic integration
- Predictive reasoning

**QUESTION CHARACTERISTICS:**
1. Scenario-based applications
2. "Why" and "How" focused reasoning
3. Multiple concept integration
4. Exception and edge case exploration
5. Predictive and analytical thinking

Generate questions that distinguish between superficial and deep understanding.`,

      examples: [
        'Why does the oxygen-hemoglobin dissociation curve shift right during exercise?',
        'How would photosynthesis be affected if the Calvin cycle occurred in darkness?',
        'Explain why genetic drift has stronger effects in small populations.'
      ],
      cognitiveLevel: 'analyze',
      neetRelevance: 0.85,
      difficultyOptimization: true
    },

    application_synthesis: {
      id: 'application_synthesis',
      name: 'Application & Synthesis Generator',
      description: 'Higher-order thinking questions requiring application and synthesis',
      systemPrompt: `You are Dr. Research, a scientist-educator who creates questions that mirror real research scenarios and clinical applications. Your questions require students to synthesize knowledge across multiple domains and apply principles to solve complex biological problems.`,

      userPromptTemplate: `Generate {{questionCount}} application-synthesis questions for "{{topic}}".

**SYNTHESIS REQUIREMENTS:**
- Integrate concepts from: {{integrationTopics}}
- Real-world scenario: {{scenario}}
- Problem-solving approach: {{approach}}
- Expected reasoning level: {{cognitiveLevel}}

**APPLICATION CONTEXTS:**
1. Clinical/Medical scenarios
2. Environmental problem-solving
3. Biotechnology applications
4. Research methodology
5. Agricultural/Industrial applications

**QUESTION STRUCTURE:**
- Multi-step reasoning required
- Cross-topic knowledge integration
- Real-world problem context
- Multiple valid approaches possible
- Higher-order thinking demands

Create questions that prepare students for scientific thinking and professional applications.`,

      examples: [
        'Design an experiment to test the effectiveness of a new plant growth hormone',
        'Analyze the molecular mechanisms behind cancer cell resistance to chemotherapy',
        'Predict the ecological impact of introducing a new species to an ecosystem'
      ],
      cognitiveLevel: 'create',
      neetRelevance: 0.75,
      difficultyOptimization: true
    },

    assertion_reasoning_advanced: {
      id: 'assertion_reasoning_advanced',
      name: 'Advanced Assertion-Reasoning Generator',
      description: 'Sophisticated assertion-reasoning questions with complex logical relationships',
      systemPrompt: `You are Logic Master, specialized in creating assertion-reasoning questions that test sophisticated logical thinking and causal understanding in biology. Your questions explore complex cause-effect relationships and require students to distinguish between correlation and causation.`,

      userPromptTemplate: `Create {{questionCount}} assertion-reasoning questions for "{{topic}}".

**LOGICAL STRUCTURE:**
- Assertion: Clear biological statement
- Reason: Explanatory statement
- Relationship: {{relationshipType}}
- Complexity Level: {{difficulty}}

**RELATIONSHIP TYPES:**
1. Direct causal (Reason explains Assertion)
2. Correlated but not causal
3. Independent but both true
4. Contradictory statements
5. One true, one false

**COGNITIVE CHALLENGES:**
- Distinguish causation vs correlation
- Identify logical fallacies
- Evaluate evidence strength
- Recognize confounding factors
- Apply deductive reasoning

Generate questions that develop critical thinking and logical reasoning skills essential for scientific literacy.`,

      examples: [
        'Assertion: Plant cells have larger vacuoles than animal cells. Reason: Plants need structural support.',
        'Assertion: Enzymes increase reaction rates. Reason: They lower activation energy.',
        'Assertion: All mutations are harmful. Reason: They change protein structure.'
      ],
      cognitiveLevel: 'evaluate',
      neetRelevance: 0.90,
      difficultyOptimization: true
    }
  }

  /**
   * Generate enhanced prompt using template and context
   */
  generatePrompt(
    templateId: string,
    context: {
      topic: string
      chapter: string
      difficulty: string
      questionCount: number
      cognitiveLevel: string
      timePerQuestion?: number
      [key: string]: any
    }
  ): { systemPrompt: string; userPrompt: string } {
    const template = this.promptTemplates[templateId]
    if (!template) {
      throw new Error(`Template ${templateId} not found`)
    }

    // Enhance context with NEET pattern data
    const enhancedContext = {
      ...context,
      frequency: this.neetPatterns.previousYearFrequency[context.topic] * 100 || 5,
      weightage: this.neetPatterns.topicWeightage[context.topic] || 10,
      timePerQuestion: context.timePerQuestion || this.calculateOptimalTime(context.difficulty),
      topicDetails: this.getTopicDetails(context.topic),
      commonMistakes: this.neetPatterns.commonMistakes.slice(0, 3).join(', '),
      examTricks: this.neetPatterns.examTricks.slice(0, 2).join(', ')
    }

    // Replace template variables
    let userPrompt = template.userPromptTemplate
    Object.entries(enhancedContext).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      userPrompt = userPrompt.replace(regex, String(value))
    })

    return {
      systemPrompt: template.systemPrompt,
      userPrompt
    }
  }

  /**
   * Calculate optimal time per question based on difficulty
   */
  private calculateOptimalTime(difficulty: string): number {
    const timeMap = {
      'easy': 45,
      'medium': 60,
      'moderate': 60,
      'hard': 90,
      'difficult': 90
    }
    return timeMap[difficulty.toLowerCase()] || 60
  }

  /**
   * Get detailed topic information for prompt enhancement
   */
  private getTopicDetails(topic: string): string {
    const topicDetails: Record<string, string> = {
      'genetics': `
- Mendelian inheritance patterns and deviations
- Linkage, crossing over, and chromosome mapping
- Population genetics and Hardy-Weinberg principle
- Molecular genetics: DNA, RNA, protein synthesis
- Gene regulation and epigenetics
- Genetic disorders and pedigree analysis`,

      'human-physiology': `
- Digestive system: enzymatic breakdown and absorption
- Respiratory system: gas exchange and transport
- Circulatory system: heart function and blood pressure regulation
- Excretory system: nephron function and urine formation
- Nervous system: neuron function and reflex mechanisms
- Endocrine system: hormone action and feedback mechanisms`,

      'plant-physiology': `
- Photosynthesis: light and dark reactions, C3/C4/CAM pathways
- Respiration: glycolysis, Krebs cycle, electron transport
- Water relations: transpiration, water potential, osmosis
- Mineral nutrition: macro/micronutrients, deficiency symptoms
- Plant growth regulators: auxins, gibberellins, cytokinins
- Growth and development: photoperiodism, vernalization`,

      'cell-biology': `
- Cell structure: prokaryotic vs eukaryotic organization
- Biomolecules: proteins, carbohydrates, lipids, nucleic acids
- Cell cycle: phases, checkpoints, regulation
- Cell division: mitosis, meiosis, significance
- Cell transport: diffusion, osmosis, active transport
- Enzyme kinetics: factors affecting activity, inhibition`,

      'ecology': `
- Ecosystem structure: biotic and abiotic components
- Energy flow: food chains, food webs, energy pyramids
- Biogeochemical cycles: carbon, nitrogen, phosphorus
- Population dynamics: growth patterns, carrying capacity
- Community interactions: competition, predation, symbiosis
- Biodiversity: conservation strategies, extinction causes`,

      'reproduction': `
- Asexual vs sexual reproduction: advantages and mechanisms
- Human reproductive system: male and female anatomy
- Gametogenesis: spermatogenesis and oogenesis
- Fertilization: process and significance
- Embryonic development: cleavage, gastrulation, organogenesis
- Reproductive health: contraception, STDs, infertility`,

      'evolution': `
- Darwin's theory: natural selection and evidence
- Modern synthesis: population genetics and evolution
- Speciation: allopatric, sympatric, adaptive radiation
- Human evolution: fossil evidence, molecular studies
- Molecular evolution: comparative genomics, molecular clocks
- Evolutionary relationships: phylogeny and classification`,

      'biotechnology': `
- Recombinant DNA technology: tools and techniques
- PCR: principles, process, applications
- Gene cloning: vectors, hosts, selection markers
- Genetic engineering: transgenic organisms, applications
- Bioprocessing: fermentation, downstream processing
- Medical biotechnology: gene therapy, vaccines, diagnostics`,

      'diversity': `
- Classification principles: taxonomic hierarchy, nomenclature
- Kingdom characteristics: Monera, Protista, Fungi, Plantae, Animalia
- Plant diversity: algae, bryophytes, pteridophytes, gymnosperms, angiosperms
- Animal diversity: invertebrates and vertebrates classification
- Biodiversity: species, genetic, ecosystem diversity
- Conservation: in-situ, ex-situ methods`,

      'molecular-biology': `
- DNA structure: double helix, base pairing, packaging
- DNA replication: machinery, process, proofreading
- Transcription: RNA polymerase, promoters, processing
- Translation: ribosomes, tRNA, genetic code
- Gene regulation: operons, transcription factors
- Mutations: types, causes, consequences, repair mechanisms`
    }

    return topicDetails[topic] || `Core concepts and principles related to ${topic}`
  }

  /**
   * Get all available templates
   */
  getAvailableTemplates(): PromptTemplate[] {
    return Object.values(this.promptTemplates)
  }

  /**
   * Get template by cognitive level
   */
  getTemplatesByCognitiveLevel(level: string): PromptTemplate[] {
    return Object.values(this.promptTemplates).filter(
      template => template.cognitiveLevel === level
    )
  }

  /**
   * Get templates by NEET relevance threshold
   */
  getTemplatesByNEETRelevance(minRelevance: number): PromptTemplate[] {
    return Object.values(this.promptTemplates).filter(
      template => template.neetRelevance >= minRelevance
    )
  }
}

// Export singleton instance
export const enhancedPromptEngine = new EnhancedPromptEngine()

// Export template IDs for easy reference
export const TEMPLATE_IDS = {
  NEET_OPTIMIZED_MCQ: 'neet_optimized_mcq',
  CONCEPTUAL_DEEP_DIVE: 'conceptual_deep_dive',
  APPLICATION_SYNTHESIS: 'application_synthesis',
  ASSERTION_REASONING_ADVANCED: 'assertion_reasoning_advanced'
} as const