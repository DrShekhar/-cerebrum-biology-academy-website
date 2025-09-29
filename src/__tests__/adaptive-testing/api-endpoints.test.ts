/**
 * Tests for Adaptive Testing API Endpoints
 * Testing API routes, request/response handling, and integration
 */

import { NextRequest } from 'next/server'
import { POST as createSession } from '../../app/api/adaptive-testing/create-session/route'
import { POST as startSession } from '../../app/api/adaptive-testing/[sessionId]/start/route'
import { POST as processResponse } from '../../app/api/adaptive-testing/[sessionId]/response/route'
import { GET as getAnalytics } from '../../app/api/adaptive-testing/[sessionId]/analytics/route'
import { POST as completeSession } from '../../app/api/adaptive-testing/[sessionId]/complete/route'

// Mock the adaptive testing engine
jest.mock('../../lib/adaptive-testing/AdaptiveTestingEngine', () => ({
  adaptiveTestingEngine: {
    createSession: jest.fn(),
    startSession: jest.fn(),
    processResponse: jest.fn(),
    getRealTimeAnalytics: jest.fn(),
    completeSession: jest.fn(),
    getSessionStatus: jest.fn()
  }
}))

describe('Adaptive Testing API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/adaptive-testing/create-session', () => {
    test('should create a new adaptive testing session', async () => {
      const mockSession = {
        id: 'session_123',
        studentId: 'student_456',
        state: 'initializing',
        configuration: {
          testType: 'formative',
          curriculum: 'NEET',
          grade: '12',
          topics: ['Cell Biology']
        },
        timestamps: {
          created: new Date(),
          started: null,
          completed: null
        }
      }

      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.createSession.mockResolvedValue(mockSession)

      const requestBody = {
        studentId: 'student_456',
        configuration: {
          testType: 'formative',
          curriculum: 'NEET',
          grade: '12',
          topics: ['Cell Biology'],
          termination: {
            minItems: 10,
            maxItems: 30,
            targetSE: 0.3,
            targetInformation: 10,
            timeLimit: 60,
            masteryThreshold: 0.8
          }
        }
      }

      const request = new NextRequest('http://localhost/api/adaptive-testing/create-session', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await createSession(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.sessionId).toBe('session_123')
      expect(data.session).toEqual(mockSession)
      expect(adaptiveTestingEngine.createSession).toHaveBeenCalledWith(
        'student_456',
        requestBody.configuration
      )
    })

    test('should validate required fields', async () => {
      const invalidRequestBody = {
        studentId: 'student_456'
        // Missing configuration
      }

      const request = new NextRequest('http://localhost/api/adaptive-testing/create-session', {
        method: 'POST',
        body: JSON.stringify(invalidRequestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await createSession(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('required')
    })

    test('should handle engine errors gracefully', async () => {
      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.createSession.mockRejectedValue(new Error('Engine error'))

      const requestBody = {
        studentId: 'student_456',
        configuration: {
          testType: 'formative',
          curriculum: 'NEET',
          grade: '12',
          topics: ['Cell Biology']
        }
      }

      const request = new NextRequest('http://localhost/api/adaptive-testing/create-session', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await createSession(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Failed to create session')
    })
  })

  describe('POST /api/adaptive-testing/[sessionId]/start', () => {
    test('should start an adaptive testing session', async () => {
      const mockStartResult = {
        session: {
          id: 'session_123',
          state: 'active',
          timestamps: {
            started: new Date()
          }
        },
        firstItem: {
          id: 'item_1',
          question: 'What is the basic unit of life?',
          options: ['Cell', 'Atom', 'Molecule', 'Tissue'],
          difficulty: 0.0,
          estimatedTime: 90
        },
        instructions: [
          'Read each question carefully',
          'Select the best answer',
          'Indicate your confidence level'
        ]
      }

      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.startSession.mockResolvedValue(mockStartResult)

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await startSession(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.session.state).toBe('active')
      expect(data.firstItem).toBeDefined()
      expect(data.instructions).toBeDefined()
      expect(adaptiveTestingEngine.startSession).toHaveBeenCalledWith('session_123')
    })

    test('should handle invalid session ID', async () => {
      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.startSession.mockRejectedValue(new Error('Session not found'))

      const request = new NextRequest('http://localhost/api/adaptive-testing/invalid_session/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await startSession(request, { params: { sessionId: 'invalid_session' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error).toContain('not found')
    })
  })

  describe('POST /api/adaptive-testing/[sessionId]/response', () => {
    test('should process student response', async () => {
      const mockProcessResult = {
        processed: true,
        nextItem: {
          id: 'item_2',
          question: 'Which organelle is responsible for cellular respiration?',
          options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'],
          difficulty: 0.3,
          estimatedTime: 120
        },
        abilityUpdate: {
          theta: 0.2,
          standardError: 0.8,
          confidence: 0.6
        },
        adaptations: [
          {
            type: 'difficulty_adjustment',
            description: 'Increased difficulty based on correct response',
            confidence: 0.8
          }
        ],
        recommendations: [
          {
            type: 'continue_current_level',
            description: 'Student is performing well at current difficulty',
            priority: 'medium'
          }
        ],
        insights: {
          responsePattern: 'consistent_correct',
          estimatedMastery: 0.7,
          nextTopicRecommendation: 'Cell Biology'
        }
      }

      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.processResponse.mockResolvedValue(mockProcessResult)

      const requestBody = {
        itemId: 'item_1',
        response: true,
        responseTime: 95,
        confidence: 4
      }

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/response', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await processResponse(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.processed).toBe(true)
      expect(data.nextItem).toBeDefined()
      expect(data.abilityUpdate).toBeDefined()
      expect(data.adaptations).toBeDefined()
      expect(adaptiveTestingEngine.processResponse).toHaveBeenCalledWith(
        'session_123',
        'item_1',
        true,
        95,
        4
      )
    })

    test('should validate response data', async () => {
      const invalidRequestBody = {
        itemId: 'item_1',
        response: true,
        responseTime: -10, // Invalid negative time
        confidence: 4
      }

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/response', {
        method: 'POST',
        body: JSON.stringify(invalidRequestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await processResponse(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('validation')
    })

    test('should handle missing required fields', async () => {
      const incompleteRequestBody = {
        itemId: 'item_1'
        // Missing response, responseTime, confidence
      }

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/response', {
        method: 'POST',
        body: JSON.stringify(incompleteRequestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await processResponse(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('required')
    })
  })

  describe('GET /api/adaptive-testing/[sessionId]/analytics', () => {
    test('should return real-time analytics', async () => {
      const mockAnalytics = {
        performance: {
          currentAbility: 0.5,
          accuracy: 0.75,
          speed: 1.2,
          engagement: 0.8,
          consistency: 0.7
        },
        progress: {
          itemsCompleted: 8,
          estimatedCompletion: 75,
          timeElapsed: 480,
          milestones: ['basic_concepts_mastered']
        },
        adaptations: {
          totalAdjustments: 3,
          effectiveness: 85,
          recentChanges: [
            {
              type: 'difficulty_increase',
              timestamp: new Date(),
              reason: 'strong_performance'
            }
          ]
        },
        predictions: {
          finalScore: 82,
          timeToCompletion: 360,
          masteryProbability: 0.85
        },
        recommendations: [
          {
            type: 'maintain_pace',
            priority: 'medium',
            description: 'Continue at current difficulty level'
          }
        ]
      }

      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.getRealTimeAnalytics.mockReturnValue(mockAnalytics)

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/analytics')

      const response = await getAnalytics(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.analytics).toEqual(mockAnalytics)
      expect(data.analytics.performance.currentAbility).toBe(0.5)
      expect(data.analytics.progress.itemsCompleted).toBe(8)
      expect(adaptiveTestingEngine.getRealTimeAnalytics).toHaveBeenCalledWith('session_123')
    })

    test('should handle session not found', async () => {
      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.getRealTimeAnalytics.mockImplementation(() => {
        throw new Error('Session not found')
      })

      const request = new NextRequest('http://localhost/api/adaptive-testing/invalid_session/analytics')

      const response = await getAnalytics(request, { params: { sessionId: 'invalid_session' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error).toContain('not found')
    })
  })

  describe('POST /api/adaptive-testing/[sessionId]/complete', () => {
    test('should complete adaptive testing session', async () => {
      const mockCompletionResult = {
        sessionId: 'session_123',
        studentId: 'student_456',
        finalResults: {
          scaledScore: 78,
          percentileRank: 82,
          masteryLevel: 'Proficient',
          abilityEstimate: {
            theta: 0.6,
            standardError: 0.25,
            confidence: 0.9
          },
          topicBreakdown: {
            'Cell Biology': { score: 85, mastery: 0.8 },
            'Genetics': { score: 70, mastery: 0.6 }
          }
        },
        performance: {
          itemsCompleted: 15,
          totalTime: 1200,
          accuracy: 0.73,
          efficiency: 0.82,
          consistency: 0.75
        },
        adaptations: {
          totalAdjustments: 8,
          effectiveness: 88,
          adaptationLog: []
        },
        gaps: {
          identifiedGaps: [
            {
              topic: 'Genetics',
              severity: 'medium',
              concepts: ['genetic_crosses']
            }
          ],
          remediationRecommendations: [
            {
              type: 'additional_practice',
              topic: 'Genetics',
              estimatedTime: 120
            }
          ]
        },
        predictions: {
          futurePerformance: {
            nextAssessment: 85,
            readinessLevel: 'ready_for_advanced'
          },
          masteryTimeline: {
            'Cell Biology': 'achieved',
            'Genetics': '2_weeks'
          }
        },
        diagnostics: {
          algorithmPerformance: {
            accuracy: 0.92,
            efficiency: 0.89
          },
          adaptationEffectiveness: 0.85
        }
      }

      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.completeSession.mockResolvedValue(mockCompletionResult)

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await completeSession(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.results).toEqual(mockCompletionResult)
      expect(data.results.finalResults.scaledScore).toBe(78)
      expect(data.results.performance.itemsCompleted).toBe(15)
      expect(data.results.gaps.identifiedGaps).toBeDefined()
      expect(adaptiveTestingEngine.completeSession).toHaveBeenCalledWith('session_123')
    })

    test('should handle premature completion', async () => {
      const mockPrematureResult = {
        sessionId: 'session_123',
        studentId: 'student_456',
        finalResults: {
          scaledScore: 45,
          percentileRank: 25,
          masteryLevel: 'Developing',
          abilityEstimate: {
            theta: -0.2,
            standardError: 1.2,
            confidence: 0.4
          }
        },
        performance: {
          itemsCompleted: 3,
          totalTime: 300,
          accuracy: 0.33,
          efficiency: 0.45,
          consistency: 0.3
        },
        warnings: [
          'Session completed with insufficient data',
          'Results may be unreliable due to limited responses'
        ]
      }

      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.completeSession.mockResolvedValue(mockPrematureResult)

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await completeSession(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.results.warnings).toBeDefined()
      expect(data.results.warnings.length).toBeGreaterThan(0)
      expect(data.results.performance.itemsCompleted).toBeLessThan(5)
    })

    test('should handle session completion errors', async () => {
      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')
      adaptiveTestingEngine.completeSession.mockRejectedValue(new Error('Cannot complete session in current state'))

      const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await completeSession(request, { params: { sessionId: 'session_123' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('complete')
    })
  })

  describe('Error Handling and Edge Cases', () => {
    test('should handle malformed JSON requests', async () => {
      const request = new NextRequest('http://localhost/api/adaptive-testing/create-session', {
        method: 'POST',
        body: 'invalid json{',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await createSession(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Invalid JSON')
    })

    test('should handle missing Content-Type header', async () => {
      const request = new NextRequest('http://localhost/api/adaptive-testing/create-session', {
        method: 'POST',
        body: JSON.stringify({ studentId: 'test' })
        // Missing Content-Type header
      })

      const response = await createSession(request)

      // Should still process the request but may have different behavior
      expect(response.status).toBeDefined()
    })

    test('should handle very large request bodies', async () => {
      const largeRequestBody = {
        studentId: 'student_456',
        configuration: {
          testType: 'formative',
          curriculum: 'NEET',
          grade: '12',
          topics: Array(1000).fill('Biology'),
          metadata: 'x'.repeat(10000) // Very large string
        }
      }

      const request = new NextRequest('http://localhost/api/adaptive-testing/create-session', {
        method: 'POST',
        body: JSON.stringify(largeRequestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await createSession(request)

      // Should handle gracefully (either process or reject appropriately)
      expect([200, 201, 400, 413]).toContain(response.status) // OK, Created, Bad Request, or Payload Too Large
    })

    test('should handle concurrent requests to same session', async () => {
      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')

      // Mock a delay in processing
      adaptiveTestingEngine.processResponse.mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve({ processed: true }), 100))
      )

      const requestBody = {
        itemId: 'item_1',
        response: true,
        responseTime: 95,
        confidence: 4
      }

      const requests = Array(3).fill(null).map(() => {
        const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/response', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return processResponse(request, { params: { sessionId: 'session_123' } })
      })

      const responses = await Promise.all(requests)

      // All requests should be handled appropriately
      responses.forEach(response => {
        expect([200, 409, 429]).toContain(response.status) // OK, Conflict, or Too Many Requests
      })
    })
  })

  describe('Request Validation', () => {
    test('should validate session ID format', async () => {
      const invalidSessionIds = ['', '   ', 'invalid/id', 'id with spaces', null, undefined]

      for (const sessionId of invalidSessionIds) {
        const request = new NextRequest(`http://localhost/api/adaptive-testing/${sessionId}/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await startSession(request, { params: { sessionId } })

        // Should reject invalid session IDs
        expect([400, 404]).toContain(response.status)
      }
    })

    test('should validate response time bounds', async () => {
      const invalidResponseTimes = [-1, 0, 10000, NaN, Infinity, -Infinity]

      for (const responseTime of invalidResponseTimes) {
        const requestBody = {
          itemId: 'item_1',
          response: true,
          responseTime,
          confidence: 4
        }

        const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/response', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await processResponse(request, { params: { sessionId: 'session_123' } })

        if (responseTime < 1 || responseTime > 3600 || !isFinite(responseTime)) {
          expect(response.status).toBe(400)
        }
      }
    })

    test('should validate confidence levels', async () => {
      const invalidConfidenceLevels = [0, 6, -1, 10, NaN, Infinity]

      for (const confidence of invalidConfidenceLevels) {
        const requestBody = {
          itemId: 'item_1',
          response: true,
          responseTime: 95,
          confidence
        }

        const request = new NextRequest('http://localhost/api/adaptive-testing/session_123/response', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const response = await processResponse(request, { params: { sessionId: 'session_123' } })

        if (confidence < 1 || confidence > 5 || !Number.isInteger(confidence)) {
          expect(response.status).toBe(400)
        }
      }
    })
  })

  describe('Performance and Load Testing', () => {
    test('should handle multiple simultaneous session creations', async () => {
      const { adaptiveTestingEngine } = require('../../lib/adaptive-testing/AdaptiveTestingEngine')

      // Mock successful session creation with unique IDs
      adaptiveTestingEngine.createSession.mockImplementation((studentId) =>
        Promise.resolve({
          id: `session_${Date.now()}_${Math.random()}`,
          studentId,
          state: 'initializing'
        })
      )

      const requests = Array(10).fill(null).map((_, i) => {
        const requestBody = {
          studentId: `student_${i}`,
          configuration: {
            testType: 'formative',
            curriculum: 'NEET',
            grade: '12',
            topics: ['Biology']
          }
        }

        const request = new NextRequest('http://localhost/api/adaptive-testing/create-session', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        return createSession(request)
      })

      const startTime = Date.now()
      const responses = await Promise.all(requests)
      const endTime = Date.now()

      expect(endTime - startTime).toBeLessThan(5000) // Should complete within 5 seconds
      responses.forEach(response => {
        expect([200, 201]).toContain(response.status)
      })
    })
  })
})