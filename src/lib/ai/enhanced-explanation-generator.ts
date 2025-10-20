/**
 * Enhanced Answer Explanation Generator
 * Generates comprehensive, step-by-step explanations for biology questions
 */

export interface ExplanationRequest {
  questionId: string
  question: string
  questionType: string
  correctAnswer: string | number | string[]
  options?: string[]
  topic: string
  difficulty: string
  cognitiveLevel: string
  studentLevel: 'beginner' | 'intermediate' | 'advanced'
  explanationStyle: ExplanationStyle
  includeVisualAids: boolean
  includeMnemonics: boolean
  includeCommonMistakes: boolean
}

export interface ExplanationStyle {
  type: 'detailed' | 'concise' | 'visual' | 'step_by_step' | 'conceptual'
  tone: 'formal' | 'conversational' | 'encouraging'
  complexity: 'simple' | 'moderate' | 'advanced'
  examples: boolean
  analogies: boolean
  realWorldConnections: boolean
}

export interface GeneratedExplanation {
  mainExplanation: string
  stepByStepSolution: ExplanationStep[]
  conceptualFramework: ConceptualFramework
  visualAids: VisualAid[]
  mnemonics: Mnemonic[]
  commonMistakes: CommonMistake[]
  relatedConcepts: RelatedConcept[]
  practiceQuestions: string[]
  furtherReading: string[]
  keyTakeaways: string[]
  confidenceScore: number
  adaptiveHints: AdaptiveHint[]
}

export interface ExplanationStep {
  stepNumber: number
  title: string
  content: string
  reasoning: string
  keyPoint: string
  commonErrors: string[]
  visualSupport?: string
  checkpointQuestion?: string
}

export interface ConceptualFramework {
  coreConcept: string
  prerequisites: string[]
  buildingBlocks: BuildingBlock[]
  connections: ConceptConnection[]
  applications: string[]
  implications: string[]
}

export interface BuildingBlock {
  concept: string
  importance: number
  explanation: string
  examples: string[]
}

export interface ConceptConnection {
  fromConcept: string
  toConcept: string
  relationship: string
  strength: number
  explanation: string
}

export interface VisualAid {
  type: 'diagram' | 'flowchart' | 'graph' | 'table' | 'concept_map'
  title: string
  description: string
  textRepresentation: string
  purpose: string
  keyElements: string[]
}

export interface Mnemonic {
  type: 'acronym' | 'rhyme' | 'story' | 'visualization' | 'word_association'
  content: string
  explanation: string
  applicableConcepts: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface CommonMistake {
  mistake: string
  frequency: number
  explanation: string
  correction: string
  preventionTip: string
  exampleScenario: string
}

export interface RelatedConcept {
  concept: string
  relationship: string
  relevance: number
  briefExplanation: string
  connectionPoint: string
}

export interface AdaptiveHint {
  level: number
  trigger: string
  hint: string
  type: 'conceptual' | 'procedural' | 'strategic'
}

export class EnhancedExplanationGenerator {
  private readonly explanationTemplates: Record<string, ExplanationTemplate> = {
    mcq_biology: {
      structure: [
        'question_analysis',
        'concept_identification',
        'option_evaluation',
        'correct_answer_reasoning',
        'elimination_strategy',
      ],
      cognitivePrompts: {
        remember: 'Focus on key facts and definitions',
        understand: 'Explain the underlying principles',
        apply: 'Show how concepts work in practice',
        analyze: 'Break down complex relationships',
        evaluate: 'Compare and judge different options',
        create: 'Synthesize knowledge for new situations',
      },
    },

    calculation_biology: {
      structure: [
        'problem_understanding',
        'formula_identification',
        'step_by_step_calculation',
        'unit_analysis',
        'result_interpretation',
      ],
      cognitivePrompts: {
        apply: 'Apply mathematical concepts to biological scenarios',
        analyze: 'Analyze the relationship between variables',
        evaluate: 'Assess the reasonableness of results',
      },
    },

    diagram_interpretation: {
      structure: [
        'diagram_analysis',
        'component_identification',
        'process_explanation',
        'relationship_mapping',
        'biological_significance',
      ],
      cognitivePrompts: {
        understand: 'Interpret visual biological information',
        analyze: 'Analyze structural-functional relationships',
        evaluate: 'Evaluate the biological significance',
      },
    },

    experimental_design: {
      structure: [
        'hypothesis_formation',
        'variable_identification',
        'methodology_design',
        'control_analysis',
        'result_prediction',
      ],
      cognitivePrompts: {
        apply: 'Apply scientific method principles',
        analyze: 'Analyze experimental components',
        evaluate: 'Evaluate experimental validity',
        create: 'Design scientific investigations',
      },
    },
  }

  private readonly biologicalConcepts = {
    cellBiology: {
      keyTerms: ['cell', 'organelle', 'membrane', 'nucleus', 'cytoplasm', 'mitochondria'],
      processes: ['respiration', 'photosynthesis', 'osmosis', 'diffusion', 'active transport'],
      principles: ['cell theory', 'selective permeability', 'surface area to volume ratio'],
    },
    genetics: {
      keyTerms: ['gene', 'allele', 'chromosome', 'DNA', 'RNA', 'protein'],
      processes: ['replication', 'transcription', 'translation', 'inheritance', 'mutation'],
      principles: ['central dogma', "Mendel's laws", 'Hardy-Weinberg principle'],
    },
    physiology: {
      keyTerms: ['organ', 'system', 'homeostasis', 'hormone', 'enzyme', 'feedback'],
      processes: ['digestion', 'circulation', 'respiration', 'excretion', 'coordination'],
      principles: ['feedback mechanisms', 'enzyme kinetics', 'transport mechanisms'],
    },
    ecology: {
      keyTerms: ['ecosystem', 'population', 'community', 'niche', 'habitat', 'biodiversity'],
      processes: ['energy flow', 'nutrient cycling', 'succession', 'evolution', 'adaptation'],
      principles: ['energy pyramid', 'competitive exclusion', 'natural selection'],
    },
  }

  /**
   * Generate comprehensive explanation for a biology question
   */
  async generateExplanation(request: ExplanationRequest): Promise<GeneratedExplanation> {
    // Analyze question context
    const questionContext = this.analyzeQuestionContext(request)

    // Generate main explanation
    const mainExplanation = await this.generateMainExplanation(request, questionContext)

    // Create step-by-step solution
    const stepByStepSolution = this.generateStepByStepSolution(request, questionContext)

    // Build conceptual framework
    const conceptualFramework = this.buildConceptualFramework(request, questionContext)

    // Generate visual aids
    const visualAids = this.generateVisualAids(request, questionContext)

    // Create mnemonics
    const mnemonics = this.generateMnemonics(request, questionContext)

    // Identify common mistakes
    const commonMistakes = this.identifyCommonMistakes(request, questionContext)

    // Find related concepts
    const relatedConcepts = this.findRelatedConcepts(request, questionContext)

    // Generate practice questions
    const practiceQuestions = this.generatePracticeQuestions(request, questionContext)

    // Create adaptive hints
    const adaptiveHints = this.createAdaptiveHints(request, questionContext)

    return {
      mainExplanation,
      stepByStepSolution,
      conceptualFramework,
      visualAids,
      mnemonics,
      commonMistakes,
      relatedConcepts,
      practiceQuestions,
      furtherReading: this.generateFurtherReading(request),
      keyTakeaways: this.extractKeyTakeaways(mainExplanation, conceptualFramework),
      confidenceScore: this.calculateConfidenceScore(request, questionContext),
      adaptiveHints,
    }
  }

  /**
   * Generate explanation optimized for specific learning objectives
   */
  generateTargetedExplanation(
    request: ExplanationRequest,
    learningObjectives: string[],
    studentWeaknesses: string[]
  ): Promise<GeneratedExplanation> {
    // Customize explanation based on objectives and weaknesses
    const customizedRequest = this.customizeRequest(request, learningObjectives, studentWeaknesses)
    return this.generateExplanation(customizedRequest)
  }

  /**
   * Generate multi-modal explanation with different representation styles
   */
  generateMultiModalExplanation(request: ExplanationRequest): Promise<MultiModalExplanation> {
    return Promise.all([
      this.generateTextualExplanation(request),
      this.generateVisualExplanation(request),
      this.generateAnalogicalExplanation(request),
      this.generateNarrativeExplanation(request),
    ]).then(([textual, visual, analogical, narrative]) => ({
      textual,
      visual,
      analogical,
      narrative,
      synthesized: this.synthesizeExplanations([textual, visual, analogical, narrative]),
    }))
  }

  /**
   * Private helper methods
   */
  private analyzeQuestionContext(request: ExplanationRequest): QuestionContext {
    const template =
      this.explanationTemplates[`${request.questionType}_biology`] ||
      this.explanationTemplates.mcq_biology

    const topicArea = this.identifyTopicArea(request.topic)
    const conceptualDepth = this.assessConceptualDepth(request.question, request.difficulty)
    const cognitiveRequirements = this.analyzeCognitiveRequirements(request.cognitiveLevel)

    return {
      template,
      topicArea,
      conceptualDepth,
      cognitiveRequirements,
      questionComplexity: this.assessQuestionComplexity(request),
    }
  }

  private async generateMainExplanation(
    request: ExplanationRequest,
    context: QuestionContext
  ): Promise<string> {
    // Use the enhanced prompt system for generating main explanation
    const prompt = this.buildExplanationPrompt(request, context)

    // Simulate AI generation (replace with actual AI call)
    return this.generateWithAI(prompt, request.explanationStyle)
  }

  private generateStepByStepSolution(
    request: ExplanationRequest,
    context: QuestionContext
  ): ExplanationStep[] {
    const steps: ExplanationStep[] = []
    const template = context.template

    template.structure.forEach((stepType, index) => {
      const step = this.createExplanationStep(stepType, index + 1, request, context)
      steps.push(step)
    })

    return steps
  }

  private createExplanationStep(
    stepType: string,
    stepNumber: number,
    request: ExplanationRequest,
    context: QuestionContext
  ): ExplanationStep {
    const stepGenerators = {
      question_analysis: () => this.generateQuestionAnalysisStep(request, stepNumber),
      concept_identification: () => this.generateConceptIdentificationStep(request, stepNumber),
      option_evaluation: () => this.generateOptionEvaluationStep(request, stepNumber),
      correct_answer_reasoning: () => this.generateCorrectAnswerReasoningStep(request, stepNumber),
      elimination_strategy: () => this.generateEliminationStrategyStep(request, stepNumber),
      problem_understanding: () => this.generateProblemUnderstandingStep(request, stepNumber),
      formula_identification: () => this.generateFormulaIdentificationStep(request, stepNumber),
      step_by_step_calculation: () => this.generateCalculationStep(request, stepNumber),
      unit_analysis: () => this.generateUnitAnalysisStep(request, stepNumber),
      result_interpretation: () => this.generateResultInterpretationStep(request, stepNumber),
    }

    const generator = stepGenerators[stepType as keyof typeof stepGenerators]
    return generator ? generator() : this.generateGenericStep(stepType, stepNumber, request)
  }

  private buildConceptualFramework(
    request: ExplanationRequest,
    context: QuestionContext
  ): ConceptualFramework {
    const topicData =
      this.biologicalConcepts[context.topicArea as keyof typeof this.biologicalConcepts]

    const coreConcept = this.identifyCoreConcept(request.question, topicData)
    const prerequisites = this.identifyPrerequisites(coreConcept, request.difficulty)
    const buildingBlocks = this.identifyBuildingBlocks(coreConcept, topicData)
    const connections = this.mapConceptConnections(coreConcept, buildingBlocks)

    return {
      coreConcept,
      prerequisites,
      buildingBlocks,
      connections,
      applications: this.findApplications(coreConcept),
      implications: this.findImplications(coreConcept),
    }
  }

  private generateVisualAids(request: ExplanationRequest, context: QuestionContext): VisualAid[] {
    if (!request.includeVisualAids) return []

    const visualAids: VisualAid[] = []

    // Generate topic-specific visual aids
    switch (context.topicArea) {
      case 'cellBiology':
        visualAids.push(this.generateCellDiagram(request))
        break
      case 'genetics':
        visualAids.push(this.generateGeneticsDiagram(request))
        break
      case 'physiology':
        visualAids.push(this.generatePhysiologyFlowchart(request))
        break
      case 'ecology':
        visualAids.push(this.generateEcologyConceptMap(request))
        break
    }

    return visualAids
  }

  private generateMnemonics(request: ExplanationRequest, context: QuestionContext): Mnemonic[] {
    if (!request.includeMnemonics) return []

    const mnemonics: Mnemonic[] = []

    // Generate topic-specific mnemonics
    const topicMnemonics = this.getTopicSpecificMnemonics(request.topic)
    const customMnemonics = this.createCustomMnemonics(request.question, context)

    mnemonics.push(...topicMnemonics, ...customMnemonics)

    return mnemonics
  }

  private identifyCommonMistakes(
    request: ExplanationRequest,
    context: QuestionContext
  ): CommonMistake[] {
    if (!request.includeCommonMistakes) return []

    // Database of common mistakes by topic and question type
    const mistakeDatabase = this.getCommonMistakeDatabase()
    const relevantMistakes = mistakeDatabase.filter(
      (mistake) => mistake.topic === request.topic && mistake.questionType === request.questionType
    )

    return relevantMistakes.map((mistake) => ({
      mistake: mistake.description,
      frequency: mistake.frequency,
      explanation: mistake.explanation,
      correction: mistake.correction,
      preventionTip: mistake.preventionTip,
      exampleScenario: mistake.exampleScenario,
    }))
  }

  private findRelatedConcepts(
    request: ExplanationRequest,
    context: QuestionContext
  ): RelatedConcept[] {
    const conceptMap = this.buildConceptMap(request.topic)
    const coreConcept = context.conceptualDepth.primaryConcept

    return conceptMap
      .filter((concept) => concept.id !== coreConcept)
      .map((concept) => ({
        concept: concept.name,
        relationship: concept.relationshipTo(coreConcept),
        relevance: concept.calculateRelevance(coreConcept),
        briefExplanation: concept.briefExplanation,
        connectionPoint: concept.connectionPoint,
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5)
  }

  private generatePracticeQuestions(
    request: ExplanationRequest,
    context: QuestionContext
  ): string[] {
    // Generate similar practice questions
    const practiceQuestions = []

    // Generate questions at same difficulty level
    practiceQuestions.push(this.generateSimilarQuestion(request, 'same_difficulty'))

    // Generate slightly easier question for reinforcement
    practiceQuestions.push(this.generateSimilarQuestion(request, 'easier'))

    // Generate slightly harder question for challenge
    practiceQuestions.push(this.generateSimilarQuestion(request, 'harder'))

    return practiceQuestions
  }

  private createAdaptiveHints(
    request: ExplanationRequest,
    context: QuestionContext
  ): AdaptiveHint[] {
    const hints: AdaptiveHint[] = []

    // Level 1: Gentle nudge
    hints.push({
      level: 1,
      trigger: 'student_confused',
      hint: this.generateGentleHint(request),
      type: 'conceptual',
    })

    // Level 2: More specific guidance
    hints.push({
      level: 2,
      trigger: 'repeated_incorrect_attempts',
      hint: this.generateSpecificHint(request),
      type: 'procedural',
    })

    // Level 3: Strategic guidance
    hints.push({
      level: 3,
      trigger: 'significant_struggle',
      hint: this.generateStrategicHint(request),
      type: 'strategic',
    })

    return hints
  }

  // Implementation of specific step generators
  private generateQuestionAnalysisStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return {
      stepNumber,
      title: 'Analyze the Question',
      content: `Let's break down what this question is asking: ${this.analyzeQuestionComponents(request.question)}`,
      reasoning:
        'Understanding the question structure helps identify what knowledge we need to apply.',
      keyPoint: 'Identify the main topic and what specific aspect is being tested.',
      commonErrors: ['Misreading the question', 'Focusing on irrelevant details'],
      checkpointQuestion: 'What is the main biological concept being tested here?',
    }
  }

  private generateConceptIdentificationStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    const concepts = this.extractConcepts(request.question, request.topic)

    return {
      stepNumber,
      title: 'Identify Key Concepts',
      content: `The main biological concepts involved are: ${concepts.join(', ')}`,
      reasoning:
        'Identifying relevant concepts helps focus our thinking on the right biological principles.',
      keyPoint: `The primary concept is ${concepts[0]}`,
      commonErrors: ['Confusing related concepts', 'Missing key terminology'],
      checkpointQuestion: `How does ${concepts[0]} relate to the question being asked?`,
    }
  }

  private generateOptionEvaluationStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return {
      stepNumber,
      title: 'Evaluate Each Option',
      content: this.generateOptionAnalysis(request.options || []),
      reasoning:
        'Systematic evaluation of each option helps identify the correct answer and understand why others are incorrect.',
      keyPoint: 'Look for the option that best matches the biological principle being tested.',
      commonErrors: [
        'Choosing the first plausible option',
        'Not eliminating obviously wrong answers',
      ],
      checkpointQuestion: 'Which option can you eliminate immediately and why?',
    }
  }

  private generateCorrectAnswerReasoningStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return {
      stepNumber,
      title: 'Reasoning for Correct Answer',
      content: this.generateCorrectAnswerReasoning(request.correctAnswer, request.question),
      reasoning:
        'Understanding why the correct answer is right reinforces the underlying biological principle.',
      keyPoint: 'The correct answer aligns with established biological facts and principles.',
      commonErrors: [
        'Accepting the answer without understanding',
        'Confusing correlation with causation',
      ],
      checkpointQuestion: 'Can you explain this concept to someone else in your own words?',
    }
  }

  private generateEliminationStrategyStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return {
      stepNumber,
      title: 'Elimination Strategy',
      content: this.generateEliminationGuidance(request.options || []),
      reasoning:
        'Process of elimination is a powerful test-taking strategy that improves accuracy.',
      keyPoint: 'Eliminate options that contradict known biological facts.',
      commonErrors: ['Not using elimination effectively', 'Second-guessing after elimination'],
      checkpointQuestion: 'What biological principle helps you eliminate the wrong options?',
    }
  }

  // Additional helper methods for explanation generation
  private buildExplanationPrompt(request: ExplanationRequest, context: QuestionContext): string {
    return `Generate a ${request.explanationStyle.type} explanation for this ${request.questionType} biology question:

Question: ${request.question}
Topic: ${request.topic}
Difficulty: ${request.difficulty}
Student Level: ${request.studentLevel}

The explanation should:
1. Be appropriate for ${request.studentLevel} level students
2. Use a ${request.explanationStyle.tone} tone
3. Include ${request.explanationStyle.complexity} complexity
4. ${request.explanationStyle.examples ? 'Include examples' : 'Focus on concepts'}
5. ${request.explanationStyle.analogies ? 'Use analogies where helpful' : 'Avoid analogies'}
6. ${request.explanationStyle.realWorldConnections ? 'Connect to real-world applications' : 'Focus on theoretical aspects'}

Focus on ${context.cognitiveRequirements.primaryLevel} level thinking.`
  }

  private generateWithAI(prompt: string, style: ExplanationStyle): Promise<string> {
    // Placeholder for AI generation - replace with actual AI service call
    return Promise.resolve(`Generated explanation based on prompt: ${prompt.substring(0, 100)}...`)
  }

  // Additional placeholder methods for completeness
  private identifyTopicArea(topic: string): string {
    const topicMap: Record<string, string> = {
      cell: 'cellBiology',
      genetics: 'genetics',
      physiology: 'physiology',
      ecology: 'ecology',
    }

    for (const [key, area] of Object.entries(topicMap)) {
      if (topic.toLowerCase().includes(key)) {
        return area
      }
    }

    return 'general'
  }

  private assessConceptualDepth(question: string, difficulty: string): ConceptualDepth {
    return {
      primaryConcept: 'placeholder',
      secondaryConcepts: [],
      depth: difficulty === 'hard' ? 'deep' : difficulty === 'medium' ? 'moderate' : 'surface',
      complexity: 0.5,
    }
  }

  private analyzeCognitiveRequirements(cognitiveLevel: string): CognitiveRequirements {
    return {
      primaryLevel: cognitiveLevel,
      secondaryLevels: [],
      thinkingTypes: [],
      mentalModels: [],
    }
  }

  private assessQuestionComplexity(request: ExplanationRequest): number {
    // Assess based on question length, terminology, and cognitive level
    let complexity = 0.5

    if (request.question.length > 100) complexity += 0.1
    if (request.cognitiveLevel === 'analyze' || request.cognitiveLevel === 'evaluate')
      complexity += 0.2
    if (request.difficulty === 'hard') complexity += 0.2

    return Math.min(1, complexity)
  }

  // Stub implementations for missing methods
  private analyzeQuestionComponents(question: string): string {
    return 'Question components analyzed'
  }
  private extractConcepts(question: string, topic: string): string[] {
    return ['concept1', 'concept2']
  }
  private generateOptionAnalysis(options: string[]): string {
    return 'Option analysis'
  }
  private generateCorrectAnswerReasoning(
    answer: string | number | string[],
    question: string
  ): string {
    return 'Correct answer reasoning'
  }
  private generateEliminationGuidance(options: string[]): string {
    return 'Elimination guidance'
  }
  private identifyCoreConcept(question: string, topicData: any): string {
    return 'core concept'
  }
  private identifyPrerequisites(concept: string, difficulty: string): string[] {
    return []
  }
  private identifyBuildingBlocks(concept: string, topicData: any): BuildingBlock[] {
    return []
  }
  private mapConceptConnections(concept: string, blocks: BuildingBlock[]): ConceptConnection[] {
    return []
  }
  private findApplications(concept: string): string[] {
    return []
  }
  private findImplications(concept: string): string[] {
    return []
  }
  private generateCellDiagram(request: ExplanationRequest): VisualAid {
    return {} as VisualAid
  }
  private generateGeneticsDiagram(request: ExplanationRequest): VisualAid {
    return {} as VisualAid
  }
  private generatePhysiologyFlowchart(request: ExplanationRequest): VisualAid {
    return {} as VisualAid
  }
  private generateEcologyConceptMap(request: ExplanationRequest): VisualAid {
    return {} as VisualAid
  }
  private getTopicSpecificMnemonics(topic: string): Mnemonic[] {
    return []
  }
  private createCustomMnemonics(question: string, context: QuestionContext): Mnemonic[] {
    return []
  }
  private getCommonMistakeDatabase(): any[] {
    return []
  }
  private buildConceptMap(topic: string): any[] {
    return []
  }
  private generateSimilarQuestion(request: ExplanationRequest, level: string): string {
    return 'Practice question'
  }
  private generateGentleHint(request: ExplanationRequest): string {
    return 'Gentle hint'
  }
  private generateSpecificHint(request: ExplanationRequest): string {
    return 'Specific hint'
  }
  private generateStrategicHint(request: ExplanationRequest): string {
    return 'Strategic hint'
  }
  private generateFurtherReading(request: ExplanationRequest): string[] {
    return []
  }
  private extractKeyTakeaways(explanation: string, framework: ConceptualFramework): string[] {
    return []
  }
  private calculateConfidenceScore(request: ExplanationRequest, context: QuestionContext): number {
    return 0.8
  }
  private customizeRequest(
    request: ExplanationRequest,
    objectives: string[],
    weaknesses: string[]
  ): ExplanationRequest {
    return request
  }
  private generateTextualExplanation(request: ExplanationRequest): Promise<string> {
    return Promise.resolve('')
  }
  private generateVisualExplanation(request: ExplanationRequest): Promise<string> {
    return Promise.resolve('')
  }
  private generateAnalogicalExplanation(request: ExplanationRequest): Promise<string> {
    return Promise.resolve('')
  }
  private generateNarrativeExplanation(request: ExplanationRequest): Promise<string> {
    return Promise.resolve('')
  }
  private synthesizeExplanations(explanations: string[]): string {
    return ''
  }
  private generateGenericStep(
    stepType: string,
    stepNumber: number,
    request: ExplanationRequest
  ): ExplanationStep {
    return {
      stepNumber,
      title: stepType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      content: `Step ${stepNumber} content for ${stepType}`,
      reasoning: `Reasoning for ${stepType}`,
      keyPoint: `Key point for ${stepType}`,
      commonErrors: [`Common error in ${stepType}`],
    }
  }
  private generateProblemUnderstandingStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return this.generateGenericStep('problem_understanding', stepNumber, request)
  }
  private generateFormulaIdentificationStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return this.generateGenericStep('formula_identification', stepNumber, request)
  }
  private generateCalculationStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return this.generateGenericStep('calculation', stepNumber, request)
  }
  private generateUnitAnalysisStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return this.generateGenericStep('unit_analysis', stepNumber, request)
  }
  private generateResultInterpretationStep(
    request: ExplanationRequest,
    stepNumber: number
  ): ExplanationStep {
    return this.generateGenericStep('result_interpretation', stepNumber, request)
  }
}

// Supporting interfaces
export interface ExplanationTemplate {
  structure: string[]
  cognitivePrompts: Record<string, string>
}

export interface QuestionContext {
  template: ExplanationTemplate
  topicArea: string
  conceptualDepth: ConceptualDepth
  cognitiveRequirements: CognitiveRequirements
  questionComplexity: number
}

export interface ConceptualDepth {
  primaryConcept: string
  secondaryConcepts: string[]
  depth: 'surface' | 'moderate' | 'deep'
  complexity: number
}

export interface CognitiveRequirements {
  primaryLevel: string
  secondaryLevels: string[]
  thinkingTypes: string[]
  mentalModels: string[]
}

export interface MultiModalExplanation {
  textual: string
  visual: string
  analogical: string
  narrative: string
  synthesized: string
}

// Export singleton instance
export const enhancedExplanationGenerator = new EnhancedExplanationGenerator()
