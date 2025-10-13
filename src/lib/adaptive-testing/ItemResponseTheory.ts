/**
 * Item Response Theory (IRT) Implementation
 * Advanced psychometric modeling for adaptive testing
 *
 * This module implements:
 * - 3-Parameter Logistic Model (3PL)
 * - 2-Parameter Logistic Model (2PL)
 * - 1-Parameter Logistic Model (1PL/Rasch)
 * - Maximum Likelihood Estimation (MLE)
 * - Expected A Posteriori (EAP) ability estimation
 * - Information functions for optimal question selection
 */

export interface ItemParameters {
  id: string
  difficulty: number // b parameter: item difficulty (-4 to +4 logits)
  discrimination: number // a parameter: item discrimination (0.5 to 3.0)
  guessing: number // c parameter: pseudo-guessing (0 to 0.3)
  upperAsymptote?: number // d parameter: upper asymptote (rarely used)
  topic: string
  subtopic: string
  bloomsLevel: string
  estimatedTime: number
  keywords: string[]
}

export interface StudentResponse {
  itemId: string
  response: boolean // true = correct, false = incorrect
  responseTime: number // seconds
  confidence?: number // 1-5 scale
  timestamp: Date
}

export interface AbilityEstimate {
  theta: number // ability level (-4 to +4 logits)
  standardError: number // precision of estimate
  confidence: number // 0-1, how confident we are in this estimate
  informationGained: number // cumulative information
  estimationMethod: 'MLE' | 'EAP' | 'MAP' | 'WLE'
  convergence: boolean // whether estimation converged
  iterations: number // number of iterations to converge
}

export interface ItemInformation {
  itemId: string
  information: number // Fisher information at current ability
  expectedInfo: number // expected information if administered
  probability: number // probability of correct response
  logLikelihood: number // contribution to log-likelihood
}

export interface AdaptiveTestState {
  studentId: string
  currentAbility: AbilityEstimate
  administeredItems: string[]
  responses: StudentResponse[]
  availableItems: ItemParameters[]
  testConfiguration: {
    minItems: number
    maxItems: number
    targetSE: number // target standard error for stopping
    targetInfo: number // target information for stopping
    contentBalancing: boolean
    timeLimit: number
  }
  performanceMetrics: {
    accuracy: number
    averageResponseTime: number
    difficultyProgression: number[]
    informationProgression: number[]
  }
}

class ItemResponseTheory {
  private static instance: ItemResponseTheory

  // Mathematical constants
  private readonly D = 1.7 // scaling constant for normal ogive approximation
  private readonly THETA_MIN = -4.0
  private readonly THETA_MAX = 4.0
  private readonly CONVERGENCE_CRITERION = 0.01
  private readonly MAX_ITERATIONS = 50

  constructor() {
    // Initialize IRT engine
  }

  static getInstance(): ItemResponseTheory {
    if (!ItemResponseTheory.instance) {
      ItemResponseTheory.instance = new ItemResponseTheory()
    }
    return ItemResponseTheory.instance
  }

  /**
   * 3-Parameter Logistic Model (3PL)
   * P(θ) = c + (1-c) * [1 / (1 + exp(-Da(θ-b)))]
   */
  calculateProbability3PL(
    theta: number,
    difficulty: number,
    discrimination: number,
    guessing: number
  ): number {
    const exponent = -this.D * discrimination * (theta - difficulty)
    const probability = guessing + (1 - guessing) / (1 + Math.exp(exponent))
    return Math.max(0.001, Math.min(0.999, probability)) // Bound probabilities
  }

  /**
   * 2-Parameter Logistic Model (2PL)
   * P(θ) = 1 / (1 + exp(-Da(θ-b)))
   */
  calculateProbability2PL(
    theta: number,
    difficulty: number,
    discrimination: number
  ): number {
    return this.calculateProbability3PL(theta, difficulty, discrimination, 0)
  }

  /**
   * 1-Parameter Logistic Model (1PL/Rasch)
   * P(θ) = 1 / (1 + exp(-(θ-b)))
   */
  calculateProbability1PL(theta: number, difficulty: number): number {
    return this.calculateProbability3PL(theta, difficulty, 1, 0)
  }

  /**
   * Fisher Information Function
   * I(θ) = D²a² * [P(θ)(1-P(θ))]² / [P(θ)(1-P(θ)) + c²]
   */
  calculateInformation(
    theta: number,
    item: ItemParameters
  ): number {
    const P = this.calculateProbability3PL(theta, item.difficulty, item.discrimination, item.guessing)
    const Q = 1 - P

    if (item.guessing > 0) {
      // 3PL information function
      const numerator = Math.pow(this.D * item.discrimination, 2) * Math.pow(P - item.guessing, 2) * Q
      const denominator = P * (1 - item.guessing)
      return numerator / denominator
    } else {
      // 2PL information function
      return Math.pow(this.D * item.discrimination, 2) * P * Q
    }
  }

  /**
   * Test Information Function (sum of item information)
   */
  calculateTestInformation(theta: number, items: ItemParameters[]): number {
    return items.reduce((total, item) => total + this.calculateInformation(theta, item), 0)
  }

  /**
   * Standard Error of Measurement
   * SE(θ) = 1 / √I(θ)
   */
  calculateStandardError(theta: number, items: ItemParameters[]): number {
    const information = this.calculateTestInformation(theta, items)
    return information > 0 ? 1 / Math.sqrt(information) : Infinity
  }

  /**
   * Maximum Likelihood Estimation (MLE) of ability
   */
  estimateAbilityMLE(
    responses: StudentResponse[],
    items: ItemParameters[]
  ): AbilityEstimate {
    let theta = 0 // Initial estimate
    let iterations = 0
    let converged = false

    // Create item lookup for faster access
    const itemLookup = new Map(items.map(item => [item.id, item]))

    for (let iter = 0; iter < this.MAX_ITERATIONS; iter++) {
      iterations = iter + 1

      let firstDerivative = 0
      let secondDerivative = 0

      // Calculate derivatives
      for (const response of responses) {
        const item = itemLookup.get(response.itemId)
        if (!item) continue

        const P = this.calculateProbability3PL(theta, item.difficulty, item.discrimination, item.guessing)
        const Q = 1 - P
        const W = this.D * item.discrimination * (P - item.guessing) / (1 - item.guessing)

        // First derivative (score function)
        firstDerivative += W * (response.response ? 1 : 0) - W * P

        // Second derivative (information function)
        secondDerivative -= W * W * P * Q / Math.pow(P, 2)
      }

      // Newton-Raphson update
      if (Math.abs(secondDerivative) < 1e-10) break

      const delta = firstDerivative / (-secondDerivative)
      const newTheta = theta + delta

      // Check convergence
      if (Math.abs(delta) < this.CONVERGENCE_CRITERION) {
        converged = true
        theta = newTheta
        break
      }

      theta = Math.max(this.THETA_MIN, Math.min(this.THETA_MAX, newTheta))
    }

    // Calculate standard error and information
    const administeredItems = responses.map(r => itemLookup.get(r.itemId)).filter(Boolean) as ItemParameters[]
    const standardError = this.calculateStandardError(theta, administeredItems)
    const information = this.calculateTestInformation(theta, administeredItems)

    return {
      theta,
      standardError,
      confidence: converged ? Math.max(0, 1 - standardError) : 0.5,
      informationGained: information,
      estimationMethod: 'MLE',
      convergence: converged,
      iterations
    }
  }

  /**
   * Expected A Posteriori (EAP) estimation with normal prior
   */
  estimateAbilityEAP(
    responses: StudentResponse[],
    items: ItemParameters[],
    priorMean: number = 0,
    priorVariance: number = 1
  ): AbilityEstimate {
    const numQuadraturePoints = 41
    const minTheta = -4
    const maxTheta = 4
    const step = (maxTheta - minTheta) / (numQuadraturePoints - 1)

    const itemLookup = new Map(items.map(item => [item.id, item]))

    let numerator = 0
    let denominator = 0
    let variance = 0

    // Gaussian quadrature approximation
    for (let i = 0; i < numQuadraturePoints; i++) {
      const theta = minTheta + i * step

      // Prior probability (normal distribution)
      const priorProb = Math.exp(-0.5 * Math.pow(theta - priorMean, 2) / priorVariance) /
                       Math.sqrt(2 * Math.PI * priorVariance)

      // Likelihood
      let likelihood = 1
      for (const response of responses) {
        const item = itemLookup.get(response.itemId)
        if (!item) continue

        const P = this.calculateProbability3PL(theta, item.difficulty, item.discrimination, item.guessing)
        likelihood *= response.response ? P : (1 - P)
      }

      const posterior = likelihood * priorProb
      numerator += theta * posterior
      denominator += posterior
      variance += theta * theta * posterior
    }

    const meanTheta = denominator > 0 ? numerator / denominator : 0
    const varianceTheta = denominator > 0 ? (variance / denominator) - meanTheta * meanTheta : 1
    const standardError = Math.sqrt(varianceTheta)

    const administeredItems = responses.map(r => itemLookup.get(r.itemId)).filter(Boolean) as ItemParameters[]
    const information = this.calculateTestInformation(meanTheta, administeredItems)

    return {
      theta: meanTheta,
      standardError,
      confidence: Math.max(0, 1 - standardError),
      informationGained: information,
      estimationMethod: 'EAP',
      convergence: true,
      iterations: 1
    }
  }

  /**
   * Select next best item using Maximum Information criterion
   */
  selectNextItem(
    currentAbility: AbilityEstimate,
    availableItems: ItemParameters[],
    administeredItems: string[],
    contentConstraints?: {
      topicDistribution?: Map<string, number>
      maxTimePerItem?: number
      balanceBloomsLevels?: boolean
    }
  ): ItemParameters | null {
    // Filter out already administered items
    const candidateItems = availableItems.filter(item =>
      !administeredItems.includes(item.id)
    )

    if (candidateItems.length === 0) return null

    // Apply content constraints
    let filteredItems = candidateItems

    if (contentConstraints?.maxTimePerItem) {
      filteredItems = filteredItems.filter(item =>
        item.estimatedTime <= contentConstraints.maxTimePerItem!
      )
    }

    // Calculate information for each candidate item
    const itemsWithInfo = filteredItems.map(item => ({
      item,
      information: this.calculateInformation(currentAbility.theta, item),
      probability: this.calculateProbability3PL(
        currentAbility.theta,
        item.difficulty,
        item.discrimination,
        item.guessing
      )
    }))

    // Apply exposure control (prevent overuse of highly informative items)
    const exposureControlledItems = itemsWithInfo.filter(({ probability }) =>
      probability >= 0.1 && probability <= 0.9 // Avoid items that are too easy or too hard
    )

    if (exposureControlledItems.length === 0) {
      // Fallback to items with best information if no items pass exposure control
      return itemsWithInfo.sort((a, b) => b.information - a.information)[0]?.item || null
    }

    // Content balancing: prefer items from underrepresented topics
    if (contentConstraints?.topicDistribution) {
      // Implementation for topic balancing
      // This would involve tracking topic counts and preferring underrepresented topics
    }

    // Select item with maximum information
    const bestItem = exposureControlledItems.reduce((best, current) =>
      current.information > best.information ? current : best
    )

    return bestItem.item
  }

  /**
   * Determine if test should be terminated
   */
  shouldTerminateTest(state: AdaptiveTestState): {
    shouldTerminate: boolean
    reason: string
    confidence: number
  } {
    const { currentAbility, administeredItems, testConfiguration } = state

    // Minimum items check
    if (administeredItems.length < testConfiguration.minItems) {
      return {
        shouldTerminate: false,
        reason: 'Minimum items not reached',
        confidence: 0
      }
    }

    // Maximum items check
    if (administeredItems.length >= testConfiguration.maxItems) {
      return {
        shouldTerminate: true,
        reason: 'Maximum items reached',
        confidence: currentAbility.confidence
      }
    }

    // Standard error criterion
    if (currentAbility.standardError <= testConfiguration.targetSE) {
      return {
        shouldTerminate: true,
        reason: 'Target precision achieved',
        confidence: currentAbility.confidence
      }
    }

    // Information criterion
    if (currentAbility.informationGained >= testConfiguration.targetInfo) {
      return {
        shouldTerminate: true,
        reason: 'Sufficient information collected',
        confidence: currentAbility.confidence
      }
    }

    // Time limit check (if applicable)
    // This would require tracking test start time

    return {
      shouldTerminate: false,
      reason: 'Continue testing',
      confidence: currentAbility.confidence
    }
  }

  /**
   * Calculate ability change detection
   * Useful for identifying significant shifts in performance
   */
  detectAbilityChange(
    previousEstimate: AbilityEstimate,
    currentEstimate: AbilityEstimate
  ): {
    significantChange: boolean
    changeDirection: 'increase' | 'decrease' | 'stable'
    changeMagnitude: number
    confidence: number
  } {
    const thetaDifference = currentEstimate.theta - previousEstimate.theta
    const pooledSE = Math.sqrt(
      (previousEstimate.standardError ** 2 + currentEstimate.standardError ** 2) / 2
    )

    const changeMagnitude = Math.abs(thetaDifference)
    const zScore = changeMagnitude / pooledSE
    const significantChange = zScore > 1.96 // 95% confidence level

    let changeDirection: 'increase' | 'decrease' | 'stable'
    if (Math.abs(thetaDifference) < 0.1) {
      changeDirection = 'stable'
    } else {
      changeDirection = thetaDifference > 0 ? 'increase' : 'decrease'
    }

    return {
      significantChange,
      changeDirection,
      changeMagnitude,
      confidence: Math.min(previousEstimate.confidence, currentEstimate.confidence)
    }
  }

  /**
   * Generate ability score report
   */
  generateScoreReport(
    finalAbility: AbilityEstimate,
    responses: StudentResponse[],
    items: ItemParameters[]
  ): {
    scaledScore: number // 0-100 scale
    percentile: number // estimated percentile rank
    abilityLevel: string // descriptive level
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
  } {
    // Convert theta to scaled score (mean=50, SD=10)
    const scaledScore = Math.round(50 + 10 * finalAbility.theta)

    // Estimate percentile (assuming normal distribution)
    const percentile = this.normalCDF(finalAbility.theta) * 100

    // Determine ability level
    let abilityLevel: string
    if (finalAbility.theta > 1.5) abilityLevel = 'Advanced'
    else if (finalAbility.theta > 0.5) abilityLevel = 'Proficient'
    else if (finalAbility.theta > -0.5) abilityLevel = 'Developing'
    else if (finalAbility.theta > -1.5) abilityLevel = 'Beginning'
    else abilityLevel = 'Below Basic'

    // Analyze performance by topic/difficulty
    const itemLookup = new Map(items.map(item => [item.id, item]))
    const topicPerformance = new Map<string, { correct: number; total: number }>()

    for (const response of responses) {
      const item = itemLookup.get(response.itemId)
      if (!item) continue

      const topicData = topicPerformance.get(item.topic) || { correct: 0, total: 0 }
      topicData.total++
      if (response.response) topicData.correct++
      topicPerformance.set(item.topic, topicData)
    }

    // Identify strengths and weaknesses
    const strengths: string[] = []
    const weaknesses: string[] = []

    for (const [topic, data] of topicPerformance.entries()) {
      const accuracy = data.correct / data.total
      if (accuracy >= 0.8) strengths.push(topic)
      else if (accuracy <= 0.4) weaknesses.push(topic)
    }

    // Generate recommendations
    const recommendations: string[] = []
    if (weaknesses.length > 0) {
      recommendations.push(`Focus on improving understanding in: ${weaknesses.join(', ')}`)
    }
    if (finalAbility.standardError > 0.5) {
      recommendations.push('Take additional practice tests to improve measurement precision')
    }
    if (strengths.length > 0) {
      recommendations.push(`Build on strengths in: ${strengths.join(', ')}`)
    }

    return {
      scaledScore: Math.max(0, Math.min(100, scaledScore)),
      percentile: Math.max(1, Math.min(99, Math.round(percentile))),
      abilityLevel,
      strengths,
      weaknesses,
      recommendations
    }
  }

  /**
   * Normal cumulative distribution function (for percentile calculation)
   */
  private normalCDF(x: number): number {
    return 0.5 * (1 + this.erf(x / Math.sqrt(2)))
  }

  /**
   * Error function approximation
   */
  private erf(x: number): number {
    // Abramowitz and Stegun approximation
    const a1 =  0.254829592
    const a2 = -0.284496736
    const a3 =  1.421413741
    const a4 = -1.453152027
    const a5 =  1.061405429
    const p  =  0.3275911

    const sign = x >= 0 ? 1 : -1
    x = Math.abs(x)

    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return sign * y
  }
}

export const irtEngine = ItemResponseTheory.getInstance()
export default ItemResponseTheory