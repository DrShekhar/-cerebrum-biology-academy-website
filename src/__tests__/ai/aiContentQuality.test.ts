/**
 * AI Content Quality Testing Framework
 * Comprehensive testing for AI-generated educational content
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'

// AI service imports
import { generateBiologyExplanation } from '@/lib/ai/anthropic'
import { validateEducationalContent } from '@/lib/ai/contentValidator'
import { BiologyTopicGenerator } from '@/lib/ai/topicGenerator'
import { AIPerformanceMonitor } from '@/lib/ai/performanceMonitor'

// Test utilities
import { MockAIProvider } from '../mocks/mockAIProvider'
import { EducationalContentValidator } from '../utils/contentValidator'

describe('AI Content Quality Framework', () => {
  let performanceMonitor: AIPerformanceMonitor
  let contentValidator: EducationalContentValidator
  let mockProvider: MockAIProvider

  beforeEach(() => {
    performanceMonitor = new AIPerformanceMonitor()
    contentValidator = new EducationalContentValidator()
    mockProvider = new MockAIProvider()
  })

  afterEach(() => {
    performanceMonitor.reset()
    mockProvider.reset()
  })

  describe('Educational Content Accuracy', () => {
    it('should generate accurate biology explanations for NEET topics', async () => {
      const topic = 'photosynthesis'
      const studentLevel = 'class-11'

      const response = await performanceMonitor.trackRequest(
        () => generateBiologyExplanation(topic, { level: studentLevel }),
        {
          provider: 'anthropic',
          requestType: 'explanation',
          educationalContext: { subject: 'Biology', studentLevel },
        }
      )

      // Content accuracy validation
      expect(response.content).toBeDefined()
      expect(response.content.length).toBeGreaterThan(100)

      // Educational quality checks
      const validation = await contentValidator.validateBiologyContent(response.content, topic)
      expect(validation.accuracy).toBeGreaterThan(0.9) // 90% accuracy threshold
      expect(validation.relevance).toBeGreaterThan(0.85) // 85% relevance threshold
      expect(validation.appropriateLevel).toBe(true)

      // Scientific accuracy checks
      expect(validation.scientificTermsUsed).toContain('chlorophyll')
      expect(validation.scientificTermsUsed).toContain('glucose')
      expect(validation.scientificTermsUsed).toContain('carbon dioxide')

      // NEET-specific requirements
      expect(validation.neetCompliant).toBe(true)
      expect(validation.hasFormulas).toBe(true)
      expect(validation.hasExamples).toBe(true)
    })

    it('should generate class-appropriate content for different levels', async () => {
      const topic = 'cell division'
      const levels = ['class-9', 'class-11', 'class-12', 'neet-dropper']

      for (const level of levels) {
        const response = await generateBiologyExplanation(topic, { level })
        const validation = await contentValidator.validateBiologyContent(response.content, topic)

        // Level-appropriate complexity
        switch (level) {
          case 'class-9':
            expect(validation.complexityScore).toBeLessThan(0.6) // Basic level
            expect(validation.advancedTermsCount).toBeLessThan(5)
            break
          case 'class-11':
            expect(validation.complexityScore).toBeBetween(0.6, 0.8) // Intermediate
            expect(validation.hasFormulas).toBe(true)
            break
          case 'class-12':
          case 'neet-dropper':
            expect(validation.complexityScore).toBeGreaterThan(0.8) // Advanced
            expect(validation.hasDetailedExplanations).toBe(true)
            expect(validation.hasApplications).toBe(true)
            break
        }
      }
    })

    it('should maintain factual consistency across multiple generations', async () => {
      const topic = 'DNA replication'
      const responses = []

      // Generate multiple responses for the same topic
      for (let i = 0; i < 5; i++) {
        const response = await generateBiologyExplanation(topic, { level: 'class-12' })
        responses.push(response.content)
      }

      // Check for factual consistency
      const consistencyCheck = await contentValidator.checkFactualConsistency(responses, topic)
      expect(consistencyCheck.consistencyScore).toBeGreaterThan(0.9) // 90% consistency
      expect(consistencyCheck.contradictions).toHaveLength(0)
      expect(consistencyCheck.coreFactsPresent).toBe(true)

      // Key facts should be present in all responses
      const keyFacts = ['semiconservative', 'DNA polymerase', 'leading strand', 'lagging strand']
      for (const response of responses) {
        const factsPresent = keyFacts.filter((fact) =>
          response.toLowerCase().includes(fact.toLowerCase())
        )
        expect(factsPresent.length).toBeGreaterThanOrEqual(3) // At least 3 key facts
      }
    })
  })

  describe('Content Safety and Appropriateness', () => {
    it('should not generate inappropriate content', async () => {
      const topics = ['reproduction', 'human anatomy', 'genetics']

      for (const topic of topics) {
        const response = await generateBiologyExplanation(topic, { level: 'class-11' })
        const safetyCheck = await contentValidator.checkContentSafety(response.content)

        expect(safetyCheck.isAppropriate).toBe(true)
        expect(safetyCheck.isEducational).toBe(true)
        expect(safetyCheck.hasInappropriateContent).toBe(false)
        expect(safetyCheck.ageAppropriate).toBe(true)
      }
    })

    it('should handle sensitive biology topics professionally', async () => {
      const sensitiveTopic = 'human reproductive system'
      const response = await generateBiologyExplanation(sensitiveTopic, {
        level: 'class-12',
        audience: 'educational',
      })

      const validation = await contentValidator.validateSensitiveContent(response.content)
      expect(validation.isProfessional).toBe(true)
      expect(validation.isScientific).toBe(true)
      expect(validation.usesMedicalTerminology).toBe(true)
      expect(validation.avoidsCasualLanguage).toBe(true)
    })

    it('should filter out non-educational content', async () => {
      // Test with potentially problematic prompts
      const problematicPrompts = [
        'Tell me a joke about biology',
        'Write a story about plants',
        'What is your opinion on evolution?',
      ]

      for (const prompt of problematicPrompts) {
        const response = await generateBiologyExplanation(prompt, { level: 'class-11' })
        const validation = await contentValidator.validateEducationalValue(response.content)

        expect(validation.isEducational).toBe(true)
        expect(validation.hasLearningObjectives).toBe(true)
        expect(validation.isFactual).toBe(true)
        expect(validation.hasEntertainmentOnly).toBe(false)
      }
    })
  })

  describe('Performance and Efficiency', () => {
    it('should meet response time requirements', async () => {
      const topic = 'mitosis'
      const startTime = Date.now()

      const response = await generateBiologyExplanation(topic, { level: 'class-11' })
      const endTime = Date.now()
      const responseTime = endTime - startTime

      expect(responseTime).toBeLessThan(5000) // 5 second maximum
      expect(response.content).toBeDefined()

      // Log performance metrics
      const metrics = performanceMonitor.getMetrics()
      expect(metrics.avgResponseTime).toBeLessThan(3000) // 3 second average
    })

    it('should handle concurrent requests efficiently', async () => {
      const topics = ['photosynthesis', 'respiration', 'digestion', 'circulation', 'excretion']
      const promises = topics.map((topic) =>
        performanceMonitor.trackRequest(
          () => generateBiologyExplanation(topic, { level: 'class-11' }),
          { requestType: 'concurrent-test' }
        )
      )

      const responses = await Promise.all(promises)

      // All requests should complete successfully
      expect(responses).toHaveLength(5)
      responses.forEach((response) => {
        expect(response.content).toBeDefined()
        expect(response.content.length).toBeGreaterThan(50)
      })

      // Performance should remain acceptable under load
      const metrics = performanceMonitor.getMetrics()
      expect(metrics.failureRate).toBeLessThan(0.05) // Less than 5% failure rate
    })

    it('should optimize token usage for cost efficiency', async () => {
      const topic = 'enzyme kinetics'
      const response = await generateBiologyExplanation(topic, {
        level: 'class-12',
        maxTokens: 500, // Set reasonable limit
      })

      expect(response.usage.input_tokens).toBeLessThan(200) // Efficient prompting
      expect(response.usage.output_tokens).toBeLessThan(500) // Within limits
      expect(response.usage.total_tokens).toBeLessThan(700) // Overall efficiency

      // Cost calculation
      const estimatedCost =
        response.usage.input_tokens * 0.00001 + response.usage.output_tokens * 0.00003
      expect(estimatedCost).toBeLessThan(0.05) // Under 5 cents per request
    })
  })

  describe('NEET Exam Alignment', () => {
    it('should generate NEET-aligned questions and explanations', async () => {
      const neetTopics = [
        'biomolecules',
        'cell structure',
        'plant physiology',
        'human physiology',
        'genetics',
        'ecology',
        'evolution',
      ]

      for (const topic of neetTopics) {
        const response = await generateBiologyExplanation(topic, {
          level: 'neet-preparation',
          examFocus: true,
        })

        const neetValidation = await contentValidator.validateNEETAlignment(response.content, topic)
        expect(neetValidation.syllabusAligned).toBe(true)
        expect(neetValidation.hasExamContext).toBe(true)
        expect(neetValidation.difficulty).toBe('neet-appropriate')
        expect(neetValidation.hasKeywords).toBe(true)
      }
    })

    it('should generate practice questions with correct difficulty', async () => {
      const topicGenerator = new BiologyTopicGenerator()
      const questions = await topicGenerator.generateNEETQuestions('photosynthesis', 5)

      expect(questions).toHaveLength(5)

      for (const question of questions) {
        expect(question.question).toBeDefined()
        expect(question.options).toHaveLength(4)
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
        expect(question.correctAnswer).toBeLessThanOrEqual(3)
        expect(question.explanation).toBeDefined()

        // NEET-specific validation
        const validation = await contentValidator.validateNEETQuestion(question)
        expect(validation.isNEETLevel).toBe(true)
        expect(validation.hasValidDistractors).toBe(true)
        expect(validation.explanationQuality).toBeGreaterThan(0.8)
      }
    })
  })

  describe('Multilingual Support', () => {
    it('should handle regional language context appropriately', async () => {
      const topic = 'photosynthesis'
      const response = await generateBiologyExplanation(topic, {
        level: 'class-11',
        language: 'en-IN', // Indian English
        includeHindiTerms: true,
      })

      const validation = await contentValidator.validateRegionalContext(response.content)
      expect(validation.hasIndianContext).toBe(true)
      expect(validation.isRegionallyAppropriate).toBe(true)
      expect(validation.hasLocalExamples).toBe(true)
    })
  })

  describe('Adaptive Learning Integration', () => {
    it('should adjust content complexity based on user performance', async () => {
      const userProfile = {
        currentLevel: 'class-11',
        performanceHistory: {
          photosynthesis: 0.6, // 60% accuracy
          respiration: 0.8, // 80% accuracy
          circulation: 0.4, // 40% accuracy
        },
      }

      // Should generate easier content for struggling topics
      const weakTopicResponse = await generateBiologyExplanation('circulation', {
        level: 'class-11',
        userProfile,
        adaptToPerformance: true,
      })

      const validation = await contentValidator.validateAdaptiveContent(
        weakTopicResponse.content,
        userProfile
      )
      expect(validation.isAdaptedToUser).toBe(true)
      expect(validation.complexity).toBe('simplified')
      expect(validation.hasMoreExamples).toBe(true)
    })
  })

  describe('Error Handling and Fallbacks', () => {
    it('should handle AI service failures gracefully', async () => {
      // Simulate service failure
      mockProvider.simulateFailure()

      const topic = 'photosynthesis'
      const response = await generateBiologyExplanation(topic, {
        level: 'class-11',
        fallbackEnabled: true,
      })

      // Should fall back to cached or default content
      expect(response.content).toBeDefined()
      expect(response.source).toBe('fallback')
      expect(response.isComplete).toBe(true)
    })

    it('should validate and sanitize all AI responses', async () => {
      const topic = 'cell structure'
      const response = await generateBiologyExplanation(topic, { level: 'class-11' })

      // Security validation
      const securityCheck = await contentValidator.validateSecurity(response.content)
      expect(securityCheck.hasMaliciousContent).toBe(false)
      expect(securityCheck.isProperlyFormatted).toBe(true)
      expect(securityCheck.hasValidEncoding).toBe(true)

      // Content integrity
      const integrityCheck = await contentValidator.validateIntegrity(response.content)
      expect(integrityCheck.isCorrupted).toBe(false)
      expect(integrityCheck.isComplete).toBe(true)
      expect(integrityCheck.hasValidStructure).toBe(true)
    })
  })
})

// Helper function for range expectations
expect.extend({
  toBeBetween(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () => `expected ${received} not to be between ${floor} and ${ceiling}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be between ${floor} and ${ceiling}`,
        pass: false,
      }
    }
  },
})
