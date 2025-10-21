/**
 * Comprehensive Tests for Item Response Theory Implementation
 * Testing mathematical accuracy, edge cases, and performance
 */

import {
  irtEngine,
  ItemParameters,
  StudentResponse,
  AbilityEstimate,
} from '../../lib/adaptive-testing/ItemResponseTheory'

describe('Item Response Theory Engine', () => {
  let sampleItems: ItemParameters[]
  let sampleResponses: StudentResponse[]

  beforeEach(() => {
    // Sample items for testing
    sampleItems = [
      {
        id: 'item1',
        difficulty: 0.0, // Average difficulty
        discrimination: 1.0, // Standard discrimination
        guessing: 0.2, // 20% guessing parameter
        upperAsymptote: 1.0,
        topic: 'Cell Biology',
        subtopic: 'Cell Structure',
        bloomsLevel: 'understand',
        estimatedTime: 120,
        keywords: ['cell', 'organelles'],
      },
      {
        id: 'item2',
        difficulty: 1.0, // Hard item
        discrimination: 1.5, // High discrimination
        guessing: 0.1, // Low guessing
        upperAsymptote: 1.0,
        topic: 'Genetics',
        subtopic: 'DNA Structure',
        bloomsLevel: 'apply',
        estimatedTime: 180,
        keywords: ['DNA', 'nucleotides'],
      },
      {
        id: 'item3',
        difficulty: -1.0, // Easy item
        discrimination: 0.8, // Lower discrimination
        guessing: 0.25, // Higher guessing
        upperAsymptote: 1.0,
        topic: 'Evolution',
        subtopic: 'Natural Selection',
        bloomsLevel: 'remember',
        estimatedTime: 90,
        keywords: ['evolution', 'selection'],
      },
    ]

    // Sample responses
    sampleResponses = [
      {
        itemId: 'item1',
        response: true,
        responseTime: 95,
        confidence: 4,
        timestamp: new Date(),
      },
      {
        itemId: 'item2',
        response: false,
        responseTime: 210,
        confidence: 2,
        timestamp: new Date(),
      },
      {
        itemId: 'item3',
        response: true,
        responseTime: 75,
        confidence: 5,
        timestamp: new Date(),
      },
    ]
  })

  describe('Probability Calculations', () => {
    test('should calculate 3PL probability correctly', () => {
      const theta = 0.0
      const difficulty = 0.0
      const discrimination = 1.0
      const guessing = 0.2

      const probability = irtEngine.calculateProbability3PL(
        theta,
        difficulty,
        discrimination,
        guessing
      )

      // For theta = difficulty = 0, with guessing = 0.2, probability should be around 0.6
      expect(probability).toBeCloseTo(0.6, 2)
      expect(probability).toBeGreaterThan(0.2) // Should be greater than guessing parameter
      expect(probability).toBeLessThan(1.0)
    })

    test('should calculate 2PL probability correctly', () => {
      const theta = 1.0
      const difficulty = 0.0
      const discrimination = 1.0

      const probability = irtEngine.calculateProbability2PL(theta, difficulty, discrimination)

      // For theta > difficulty, probability should be high
      expect(probability).toBeGreaterThan(0.7)
      expect(probability).toBeLessThan(1.0)
    })

    test('should calculate 1PL probability correctly', () => {
      const theta = 0.0
      const difficulty = 0.0

      const probability = irtEngine.calculateProbability1PL(theta, difficulty)

      // For theta = difficulty, probability should be 0.5
      expect(probability).toBeCloseTo(0.5, 2)
    })

    test('should bound probabilities correctly', () => {
      // Test extreme values
      const extremeTheta = 10.0
      const extremeDifficulty = -10.0
      const discrimination = 2.0
      const guessing = 0.1

      const probability = irtEngine.calculateProbability3PL(
        extremeTheta,
        extremeDifficulty,
        discrimination,
        guessing
      )

      expect(probability).toBeGreaterThanOrEqual(0.001)
      expect(probability).toBeLessThanOrEqual(0.999)
    })
  })

  describe('Information Functions', () => {
    test('should calculate item information correctly', () => {
      const theta = 0.0
      const item = sampleItems[0]

      const information = irtEngine.calculateInformation(theta, item)

      expect(information).toBeGreaterThan(0)
      expect(Number.isFinite(information)).toBe(true)
    })

    test('should calculate test information as sum of item information', () => {
      const theta = 0.5
      const testInfo = irtEngine.calculateTestInformation(theta, sampleItems)
      const sumInfo = sampleItems.reduce(
        (sum, item) => sum + irtEngine.calculateInformation(theta, item),
        0
      )

      expect(testInfo).toBeCloseTo(sumInfo, 5)
    })

    test('should calculate standard error correctly', () => {
      const theta = 0.0
      const se = irtEngine.calculateStandardError(theta, sampleItems)

      expect(se).toBeGreaterThan(0)
      expect(Number.isFinite(se)).toBe(true)

      // Standard error should decrease with more information
      const moreItems = [...sampleItems, ...sampleItems] // Double the items
      const seLess = irtEngine.calculateStandardError(theta, moreItems)
      expect(seLess).toBeLessThan(se)
    })
  })

  describe('Ability Estimation', () => {
    test('should estimate ability using MLE', () => {
      const estimate = irtEngine.estimateAbilityMLE(sampleResponses, sampleItems)

      expect(Number.isFinite(estimate.theta)).toBe(true)
      expect(estimate.standardError).toBeGreaterThan(0)
      expect(estimate.confidence).toBeGreaterThanOrEqual(0)
      expect(estimate.confidence).toBeLessThanOrEqual(1)
      expect(estimate.estimationMethod).toBe('MLE')
      expect(estimate.iterations).toBeGreaterThan(0)
    })

    test('should estimate ability using EAP', () => {
      const estimate = irtEngine.estimateAbilityEAP(sampleResponses, sampleItems)

      expect(Number.isFinite(estimate.theta)).toBe(true)
      expect(estimate.standardError).toBeGreaterThan(0)
      expect(estimate.confidence).toBeGreaterThanOrEqual(0)
      expect(estimate.confidence).toBeLessThanOrEqual(1)
      expect(estimate.estimationMethod).toBe('EAP')
    })

    test('should handle edge cases in ability estimation', () => {
      // All correct responses
      const allCorrect = sampleResponses.map((r) => ({ ...r, response: true }))
      const estimateHigh = irtEngine.estimateAbilityMLE(allCorrect, sampleItems)
      expect(estimateHigh.theta).toBeGreaterThan(0)

      // All incorrect responses
      const allIncorrect = sampleResponses.map((r) => ({ ...r, response: false }))
      const estimateLow = irtEngine.estimateAbilityMLE(allIncorrect, sampleItems)
      expect(estimateLow.theta).toBeLessThan(0)
    })

    test('should improve precision with more responses', () => {
      // Estimate with fewer responses
      const fewResponses = sampleResponses.slice(0, 1)
      const estimateFew = irtEngine.estimateAbilityMLE(fewResponses, sampleItems.slice(0, 1))

      // Estimate with more responses
      const estimateMore = irtEngine.estimateAbilityMLE(sampleResponses, sampleItems)

      expect(estimateMore.standardError).toBeLessThan(estimateFew.standardError)
      expect(estimateMore.confidence).toBeGreaterThan(estimateFew.confidence)
    })
  })

  describe('Item Selection', () => {
    test('should select next best item', () => {
      const currentAbility: AbilityEstimate = {
        theta: 0.5,
        standardError: 1.0,
        confidence: 0.7,
        informationGained: 5.0,
        estimationMethod: 'MLE',
        convergence: true,
        iterations: 5,
      }

      const selectedItem = irtEngine.selectNextItem(
        currentAbility,
        sampleItems,
        [], // No administered items
        { maxTimePerItem: 300 }
      )

      expect(selectedItem).toBeDefined()
      expect(sampleItems).toContain(selectedItem)
    })

    test('should respect administered items constraint', () => {
      const currentAbility: AbilityEstimate = {
        theta: 0.0,
        standardError: 1.0,
        confidence: 0.5,
        informationGained: 2.0,
        estimationMethod: 'MLE',
        convergence: false,
        iterations: 3,
      }

      const administeredItems = ['item1', 'item2']
      const selectedItem = irtEngine.selectNextItem(currentAbility, sampleItems, administeredItems)

      expect(selectedItem).toBeDefined()
      expect(administeredItems).not.toContain(selectedItem?.id)
    })

    test('should return null when no items available', () => {
      const currentAbility: AbilityEstimate = {
        theta: 0.0,
        standardError: 1.0,
        confidence: 0.5,
        informationGained: 2.0,
        estimationMethod: 'MLE',
        convergence: false,
        iterations: 3,
      }

      const allAdministered = sampleItems.map((item) => item.id)
      const selectedItem = irtEngine.selectNextItem(currentAbility, sampleItems, allAdministered)

      expect(selectedItem).toBeNull()
    })
  })

  describe('Test Termination', () => {
    test('should terminate when minimum items not reached', () => {
      const state = {
        currentAbility: {
          theta: 0.0,
          standardError: 0.2,
          confidence: 0.9,
          informationGained: 15,
          estimationMethod: 'MLE' as const,
          convergence: true,
          iterations: 8,
        },
        administeredItems: ['item1'], // Only 1 item
        responses: sampleResponses.slice(0, 1),
        availableItems: sampleItems,
        testConfiguration: {
          minItems: 5,
          maxItems: 20,
          targetSE: 0.3,
          targetInfo: 10,
          contentBalancing: false,
          timeLimit: 3600,
        },
        performanceMetrics: {
          accuracy: 1.0,
          averageResponseTime: 120,
          difficultyProgression: [0.0],
          informationProgression: [5.0],
        },
      }

      const termination = irtEngine.shouldTerminateTest(state)
      expect(termination.shouldTerminate).toBe(false)
      expect(termination.reason).toBe('Minimum items not reached')
    })

    test('should terminate when maximum items reached', () => {
      const state = {
        currentAbility: {
          theta: 0.5,
          standardError: 0.5,
          confidence: 0.7,
          informationGained: 8,
          estimationMethod: 'MLE' as const,
          convergence: true,
          iterations: 10,
        },
        administeredItems: Array(10)
          .fill(0)
          .map((_, i) => `item${i}`), // 10 items
        responses: Array(10)
          .fill(null)
          .map((_, i) => sampleResponses[0]),
        availableItems: sampleItems,
        testConfiguration: {
          minItems: 5,
          maxItems: 10, // Max reached
          targetSE: 0.3,
          targetInfo: 20,
          contentBalancing: false,
          timeLimit: 3600,
        },
        performanceMetrics: {
          accuracy: 0.8,
          averageResponseTime: 150,
          difficultyProgression: Array(10).fill(0.5),
          informationProgression: Array(10)
            .fill(0)
            .map((_, i) => i + 1),
        },
      }

      const termination = irtEngine.shouldTerminateTest(state)
      expect(termination.shouldTerminate).toBe(true)
      expect(termination.reason).toBe('Maximum items reached')
    })

    test('should terminate when target precision achieved', () => {
      const state = {
        currentAbility: {
          theta: 1.0,
          standardError: 0.2, // Better than target of 0.3
          confidence: 0.9,
          informationGained: 20,
          estimationMethod: 'MLE' as const,
          convergence: true,
          iterations: 8,
        },
        administeredItems: Array(8)
          .fill(0)
          .map((_, i) => `item${i}`),
        responses: Array(8)
          .fill(null)
          .map((_, i) => sampleResponses[0]),
        availableItems: sampleItems,
        testConfiguration: {
          minItems: 5,
          maxItems: 20,
          targetSE: 0.3,
          targetInfo: 10,
          contentBalancing: false,
          timeLimit: 3600,
        },
        performanceMetrics: {
          accuracy: 0.9,
          averageResponseTime: 120,
          difficultyProgression: Array(8).fill(1.0),
          informationProgression: Array(8)
            .fill(0)
            .map((_, i) => (i + 1) * 2.5),
        },
      }

      const termination = irtEngine.shouldTerminateTest(state)
      expect(termination.shouldTerminate).toBe(true)
      expect(termination.reason).toBe('Target precision achieved')
    })
  })

  describe('Ability Change Detection', () => {
    test('should detect significant ability improvement', () => {
      const previousEstimate: AbilityEstimate = {
        theta: 0.0,
        standardError: 0.5,
        confidence: 0.6,
        informationGained: 5,
        estimationMethod: 'MLE',
        convergence: true,
        iterations: 5,
      }

      const currentEstimate: AbilityEstimate = {
        theta: 1.5, // Significant improvement
        standardError: 0.4,
        confidence: 0.8,
        informationGained: 12,
        estimationMethod: 'MLE',
        convergence: true,
        iterations: 8,
      }

      const change = irtEngine.detectAbilityChange(previousEstimate, currentEstimate)

      expect(change.significantChange).toBe(true)
      expect(change.changeDirection).toBe('increase')
      expect(change.changeMagnitude).toBeGreaterThan(1.0)
    })

    test('should detect stable performance', () => {
      const previousEstimate: AbilityEstimate = {
        theta: 0.5,
        standardError: 0.4,
        confidence: 0.7,
        informationGained: 8,
        estimationMethod: 'MLE',
        convergence: true,
        iterations: 6,
      }

      const currentEstimate: AbilityEstimate = {
        theta: 0.52, // Small change
        standardError: 0.3,
        confidence: 0.75,
        informationGained: 10,
        estimationMethod: 'MLE',
        convergence: true,
        iterations: 8,
      }

      const change = irtEngine.detectAbilityChange(previousEstimate, currentEstimate)

      expect(change.changeDirection).toBe('stable')
      expect(change.changeMagnitude).toBeLessThan(0.1)
    })
  })

  describe('Score Report Generation', () => {
    test('should generate comprehensive score report', () => {
      const finalAbility: AbilityEstimate = {
        theta: 0.8,
        standardError: 0.3,
        confidence: 0.85,
        informationGained: 15,
        estimationMethod: 'MLE',
        convergence: true,
        iterations: 10,
      }

      const report = irtEngine.generateScoreReport(finalAbility, sampleResponses, sampleItems)

      expect(report.scaledScore).toBeGreaterThanOrEqual(0)
      expect(report.scaledScore).toBeLessThanOrEqual(100)
      expect(report.percentile).toBeGreaterThanOrEqual(1)
      expect(report.percentile).toBeLessThanOrEqual(99)
      expect(report.abilityLevel).toBeDefined()
      expect(Array.isArray(report.strengths)).toBe(true)
      expect(Array.isArray(report.weaknesses)).toBe(true)
      expect(Array.isArray(report.recommendations)).toBe(true)
    })

    test('should classify ability levels correctly', () => {
      const testCases = [
        { theta: 2.0, expectedLevel: 'Advanced' },
        { theta: 1.0, expectedLevel: 'Proficient' },
        { theta: 0.0, expectedLevel: 'Developing' },
        { theta: -1.0, expectedLevel: 'Beginning' },
        { theta: -2.0, expectedLevel: 'Below Basic' },
      ]

      testCases.forEach(({ theta, expectedLevel }) => {
        const ability: AbilityEstimate = {
          theta,
          standardError: 0.3,
          confidence: 0.8,
          informationGained: 10,
          estimationMethod: 'MLE',
          convergence: true,
          iterations: 8,
        }

        const report = irtEngine.generateScoreReport(ability, sampleResponses, sampleItems)
        expect(report.abilityLevel).toBe(expectedLevel)
      })
    })
  })

  describe('Mathematical Accuracy', () => {
    test('should maintain mathematical consistency', () => {
      const theta = 0.5
      const item = sampleItems[0]

      // Test that P + (1-P) = 1
      const probability = irtEngine.calculateProbability3PL(
        theta,
        item.difficulty,
        item.discrimination,
        item.guessing
      )
      expect(probability + (1 - probability)).toBeCloseTo(1.0, 10)

      // Test that information is always positive
      const information = irtEngine.calculateInformation(theta, item)
      expect(information).toBeGreaterThan(0)

      // Test that standard error decreases with information
      const se = irtEngine.calculateStandardError(theta, [item])
      const seDouble = irtEngine.calculateStandardError(theta, [item, item])
      expect(seDouble).toBeLessThan(se)
    })

    test('should handle numerical edge cases', () => {
      // Test very high ability
      const highTheta = 5.0
      const probability = irtEngine.calculateProbability3PL(highTheta, 0, 1, 0.2)
      expect(probability).toBeLessThan(1.0)
      expect(probability).toBeGreaterThan(0.9)

      // Test very low ability
      const lowTheta = -5.0
      const probabilityLow = irtEngine.calculateProbability3PL(lowTheta, 0, 1, 0.2)
      expect(probabilityLow).toBeGreaterThan(0.0)
      expect(probabilityLow).toBeLessThan(0.3)
    })
  })

  describe('Performance and Efficiency', () => {
    test('should complete ability estimation in reasonable time', () => {
      const startTime = Date.now()

      const estimate = irtEngine.estimateAbilityMLE(sampleResponses, sampleItems)

      const endTime = Date.now()
      const duration = endTime - startTime

      expect(duration).toBeLessThan(1000) // Should complete in less than 1 second
      expect(estimate.convergence).toBe(true)
    })

    test('should handle large item banks efficiently', () => {
      // Create a large item bank
      const largeItemBank: ItemParameters[] = Array(100)
        .fill(null)
        .map((_, i) => ({
          id: `item${i}`,
          difficulty: (Math.random() - 0.5) * 4, // Random difficulty between -2 and 2
          discrimination: 0.5 + Math.random() * 2, // Random discrimination between 0.5 and 2.5
          guessing: 0.1 + Math.random() * 0.2, // Random guessing between 0.1 and 0.3
          upperAsymptote: 1.0,
          topic: `Topic${i % 10}`,
          subtopic: `Subtopic${i % 20}`,
          bloomsLevel: 'understand',
          estimatedTime: 60 + Math.random() * 120,
          keywords: [`keyword${i}`],
        }))

      const startTime = Date.now()

      const testInfo = irtEngine.calculateTestInformation(0.5, largeItemBank)

      const endTime = Date.now()
      const duration = endTime - startTime

      expect(duration).toBeLessThan(100) // Should complete quickly even for large banks
      expect(testInfo).toBeGreaterThan(0)
      expect(Number.isFinite(testInfo)).toBe(true)
    })
  })
})

describe('IRT Integration Tests', () => {
  test('should work end-to-end for a complete adaptive test', () => {
    const items: ItemParameters[] = Array(20)
      .fill(null)
      .map((_, i) => ({
        id: `item${i}`,
        difficulty: (i - 10) * 0.2, // Spread difficulties from -2 to 2
        discrimination: 1.0,
        guessing: 0.2,
        upperAsymptote: 1.0,
        topic: 'Biology',
        subtopic: `Topic${i % 5}`,
        bloomsLevel: 'understand',
        estimatedTime: 120,
        keywords: [`keyword${i}`],
      }))

    let currentAbility: AbilityEstimate = {
      theta: 0.0,
      standardError: 2.0,
      confidence: 0.1,
      informationGained: 0,
      estimationMethod: 'EAP',
      convergence: false,
      iterations: 0,
    }

    const responses: StudentResponse[] = []
    const administeredItems: string[] = []

    // Simulate an adaptive test
    for (let i = 0; i < 10; i++) {
      // Select next item
      const nextItem = irtEngine.selectNextItem(currentAbility, items, administeredItems)
      expect(nextItem).toBeDefined()

      if (!nextItem) break

      // Simulate response (student with ability 0.5)
      const probability = irtEngine.calculateProbability3PL(
        0.5,
        nextItem.difficulty,
        nextItem.discrimination,
        nextItem.guessing
      )
      const isCorrect = Math.random() < probability

      const response: StudentResponse = {
        itemId: nextItem.id,
        response: isCorrect,
        responseTime: 60 + Math.random() * 120,
        confidence: Math.floor(Math.random() * 5) + 1,
        timestamp: new Date(),
      }

      responses.push(response)
      administeredItems.push(nextItem.id)

      // Update ability estimate
      currentAbility = irtEngine.estimateAbilityMLE(responses, items)
    }

    // Verify the adaptive process worked
    expect(responses).toHaveLength(10)
    expect(administeredItems).toHaveLength(10)
    expect(currentAbility.convergence).toBe(true)
    expect(currentAbility.standardError).toBeLessThan(1.0) // Should have improved precision
    expect(Math.abs(currentAbility.theta - 0.5)).toBeLessThan(1.0) // Should be reasonably close to true ability

    // Generate final report
    const report = irtEngine.generateScoreReport(currentAbility, responses, items)
    expect(report.scaledScore).toBeGreaterThanOrEqual(0)
    expect(report.scaledScore).toBeLessThanOrEqual(100)
    expect(report.abilityLevel).toBeDefined()
  })
})
