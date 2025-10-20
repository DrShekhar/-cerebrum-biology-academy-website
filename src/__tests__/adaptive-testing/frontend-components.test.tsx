/**
 * Tests for Adaptive Testing Frontend Components
 * Testing React components, user interactions, and UI state management
 */

import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import AdaptiveTestInterface from '../../components/adaptive-testing/AdaptiveTestInterface'
import AdaptiveTestResults from '../../components/adaptive-testing/AdaptiveTestResults'

// Mock fetch for API calls
global.fetch = jest.fn()

// Mock timers for component animations and delays
jest.useFakeTimers()

describe('AdaptiveTestInterface Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.MockedFunction<typeof fetch>).mockClear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  const mockSessionConfig = {
    testType: 'formative' as const,
    curriculum: 'NEET',
    grade: '12',
    topics: ['Cell Biology', 'Genetics'],
    termination: {
      minItems: 5,
      maxItems: 20,
      targetSE: 0.3,
      targetInformation: 10,
      timeLimit: 30,
      masteryThreshold: 0.8
    }
  }

  test('should render initial configuration screen', () => {
    render(<AdaptiveTestInterface />)

    expect(screen.getByText(/Adaptive Testing Interface/i)).toBeInTheDocument()
    expect(screen.getByText(/Test Configuration/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Test Type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Curriculum/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Grade/i)).toBeInTheDocument()
    expect(screen.getByText(/Start Test/i)).toBeInTheDocument()
  })

  test('should validate configuration before starting test', async () => {
    const user = userEvent.setup({ delay: null })
    render(<AdaptiveTestInterface />)

    const startButton = screen.getByText(/Start Test/i)
    await user.click(startButton)

    expect(screen.getByText(/Please complete all required fields/i)).toBeInTheDocument()
  })

  test('should create session and start test with valid configuration', async () => {
    const user = userEvent.setup({ delay: null })

    // Mock successful session creation
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          sessionId: 'test_session_123',
          session: { id: 'test_session_123', state: 'initializing' }
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          session: { id: 'test_session_123', state: 'active' },
          firstItem: {
            id: 'item_1',
            question: 'What is the basic unit of life?',
            options: ['Cell', 'Atom', 'Molecule', 'Tissue'],
            difficulty: 0.0,
            estimatedTime: 90
          },
          instructions: ['Read carefully', 'Select best answer']
        })
      } as Response)

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} />)

    const startButton = screen.getByText(/Start Test/i)
    await user.click(startButton)

    await waitFor(() => {
      expect(screen.getByText(/What is the basic unit of life?/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/Cell/i)).toBeInTheDocument()
    expect(screen.getByText(/Atom/i)).toBeInTheDocument()
    expect(screen.getByText(/Molecule/i)).toBeInTheDocument()
    expect(screen.getByText(/Tissue/i)).toBeInTheDocument()
  })

  test('should display real-time analytics during test', async () => {
    const user = userEvent.setup({ delay: null })

    // Mock API responses
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          sessionId: 'test_session_123'
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          firstItem: {
            id: 'item_1',
            question: 'Test question',
            options: ['A', 'B', 'C', 'D']
          }
        })
      } as Response)
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          analytics: {
            performance: {
              currentAbility: 0.5,
              accuracy: 0.75,
              speed: 1.2,
              engagement: 0.8
            },
            progress: {
              itemsCompleted: 3,
              estimatedCompletion: 60,
              timeElapsed: 180
            }
          }
        })
      } as Response)

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} showAnalytics={true} />)

    const startButton = screen.getByText(/Start Test/i)
    await user.click(startButton)

    await waitFor(() => {
      expect(screen.getByText(/Current Ability/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/75%/)).toBeInTheDocument() // Accuracy
    expect(screen.getByText(/3/)).toBeInTheDocument() // Items completed
  })

  test('should handle question response and show next question', async () => {
    const user = userEvent.setup({ delay: null })

    // Mock API responses
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, sessionId: 'test_session_123' })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          firstItem: {
            id: 'item_1',
            question: 'First question?',
            options: ['A', 'B', 'C', 'D']
          }
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          processed: true,
          nextItem: {
            id: 'item_2',
            question: 'Second question?',
            options: ['W', 'X', 'Y', 'Z']
          }
        })
      } as Response)

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} />)

    // Start test
    const startButton = screen.getByText(/Start Test/i)
    await user.click(startButton)

    await waitFor(() => {
      expect(screen.getByText(/First question?/i)).toBeInTheDocument()
    })

    // Select an answer
    const optionA = screen.getByText('A')
    await user.click(optionA)

    // Set confidence
    const confidenceSlider = screen.getByLabelText(/Confidence/i)
    fireEvent.change(confidenceSlider, { target: { value: '4' } })

    // Submit answer
    const submitButton = screen.getByText(/Submit Answer/i)
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Second question?/i)).toBeInTheDocument()
    })

    expect(screen.getByText('W')).toBeInTheDocument()
    expect(screen.getByText('X')).toBeInTheDocument()
  })

  test('should show confidence selector and validate submission', async () => {
    const user = userEvent.setup({ delay: null })

    // Mock minimal API responses
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValue({
        ok: true,
        json: async () => ({ success: true })
      } as Response)

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} />)

    // Start and get to question
    await user.click(screen.getByText(/Start Test/i))

    await waitFor(() => {
      expect(screen.getByLabelText(/Confidence/i)).toBeInTheDocument()
    })

    // Try to submit without selecting answer
    const submitButton = screen.getByText(/Submit Answer/i)
    await user.click(submitButton)

    expect(screen.getByText(/Please select an answer/i)).toBeInTheDocument()

    // Select answer but no confidence
    const optionA = screen.getByText('A')
    await user.click(optionA)
    await user.click(submitButton)

    expect(screen.getByText(/Please indicate your confidence/i)).toBeInTheDocument()
  })

  test('should display timer and handle time limit warnings', async () => {
    jest.useRealTimers() // Use real timers for this test

    const shortTimeConfig = {
      ...mockSessionConfig,
      termination: {
        ...mockSessionConfig.termination,
        timeLimit: 1 // 1 minute
      }
    }

    render(<AdaptiveTestInterface initialConfig={shortTimeConfig} />)

    expect(screen.getByText(/Time Remaining/i)).toBeInTheDocument()

    // Timer should show initial time
    expect(screen.getByText(/01:00/i)).toBeInTheDocument()

    jest.useFakeTimers()
  })

  test('should handle network errors gracefully', async () => {
    const user = userEvent.setup({ delay: null })

    // Mock network error
    ;(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(new Error('Network error'))

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} />)

    const startButton = screen.getByText(/Start Test/i)
    await user.click(startButton)

    await waitFor(() => {
      expect(screen.getByText(/Connection error/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/Try Again/i)).toBeInTheDocument()
  })

  test('should handle session completion', async () => {
    const user = userEvent.setup({ delay: null })

    // Mock API responses ending in completion
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, sessionId: 'test_session_123' })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          firstItem: { id: 'item_1', question: 'Question?', options: ['A', 'B'] }
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          processed: true,
          testCompleted: true,
          completionTrigger: 'time_limit_reached'
        })
      } as Response)

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} />)

    await user.click(screen.getByText(/Start Test/i))
    await waitFor(() => screen.getByText(/Question?/i))

    // Answer question
    await user.click(screen.getByText('A'))
    fireEvent.change(screen.getByLabelText(/Confidence/i), { target: { value: '3' } })
    await user.click(screen.getByText(/Submit Answer/i))

    await waitFor(() => {
      expect(screen.getByText(/Test Completed/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/time limit reached/i)).toBeInTheDocument()
  })
})

describe('AdaptiveTestResults Component', () => {
  const mockResults = {
    sessionId: 'test_session_123',
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
        'Cell Biology': { score: 85, mastery: 0.8, itemsCompleted: 5 },
        'Genetics': { score: 70, mastery: 0.6, itemsCompleted: 4 },
        'Evolution': { score: 80, mastery: 0.75, itemsCompleted: 3 }
      }
    },
    performance: {
      itemsCompleted: 12,
      totalTime: 1200,
      accuracy: 0.75,
      efficiency: 0.82,
      consistency: 0.78
    },
    adaptations: {
      totalAdjustments: 6,
      effectiveness: 88,
      adaptationLog: [
        { type: 'difficulty_increase', timestamp: new Date(), reason: 'strong_performance' },
        { type: 'topic_switch', timestamp: new Date(), reason: 'content_balancing' }
      ]
    },
    gaps: {
      identifiedGaps: [
        {
          topic: 'Genetics',
          severity: 'medium',
          concepts: ['genetic_crosses', 'inheritance_patterns'],
          confidence: 0.7
        }
      ],
      remediationRecommendations: [
        {
          type: 'additional_practice',
          topic: 'Genetics',
          description: 'Focus on Punnett squares and probability calculations',
          estimatedTime: 120,
          priority: 'high'
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
        'Genetics': '2_weeks',
        'Evolution': 'achieved'
      }
    }
  }

  test('should render complete results overview', () => {
    render(<AdaptiveTestResults results={mockResults} />)

    expect(screen.getByText(/Test Results/i)).toBeInTheDocument()
    expect(screen.getByText(/78/)).toBeInTheDocument() // Scaled score
    expect(screen.getByText(/82nd percentile/i)).toBeInTheDocument()
    expect(screen.getByText(/Proficient/i)).toBeInTheDocument()
    expect(screen.getByText(/75%/)).toBeInTheDocument() // Accuracy
  })

  test('should display topic breakdown with visual indicators', () => {
    render(<AdaptiveTestResults results={mockResults} />)

    expect(screen.getByText(/Topic Performance/i)).toBeInTheDocument()
    expect(screen.getByText(/Cell Biology/i)).toBeInTheDocument()
    expect(screen.getByText(/85/)).toBeInTheDocument() // Cell Biology score
    expect(screen.getByText(/Genetics/i)).toBeInTheDocument()
    expect(screen.getByText(/70/)).toBeInTheDocument() // Genetics score
    expect(screen.getByText(/Evolution/i)).toBeInTheDocument()
    expect(screen.getByText(/80/)).toBeInTheDocument() // Evolution score

    // Should show mastery indicators
    expect(screen.getByText(/80%/)).toBeInTheDocument() // Cell Biology mastery
    expect(screen.getByText(/60%/)).toBeInTheDocument() // Genetics mastery
  })

  test('should show identified learning gaps with severity indicators', () => {
    render(<AdaptiveTestResults results={mockResults} />)

    expect(screen.getByText(/Learning Gaps/i)).toBeInTheDocument()
    expect(screen.getByText(/Genetics/i)).toBeInTheDocument()
    expect(screen.getByText(/medium/i)).toBeInTheDocument() // Severity
    expect(screen.getByText(/genetic_crosses/i)).toBeInTheDocument()
    expect(screen.getByText(/inheritance_patterns/i)).toBeInTheDocument()
  })

  test('should display remediation recommendations', () => {
    render(<AdaptiveTestResults results={mockResults} />)

    expect(screen.getByText(/Recommendations/i)).toBeInTheDocument()
    expect(screen.getByText(/additional_practice/i)).toBeInTheDocument()
    expect(screen.getByText(/Punnett squares/i)).toBeInTheDocument()
    expect(screen.getByText(/120 minutes/i)).toBeInTheDocument()
    expect(screen.getByText(/high priority/i)).toBeInTheDocument()
  })

  test('should show performance metrics with visual progress bars', () => {
    render(<AdaptiveTestResults results={mockResults} />)

    expect(screen.getByText(/Performance Metrics/i)).toBeInTheDocument()
    expect(screen.getByText(/12 items/i)).toBeInTheDocument() // Items completed
    expect(screen.getByText(/20 minutes/i)).toBeInTheDocument() // Total time (1200 seconds)
    expect(screen.getByText(/82%/)).toBeInTheDocument() // Efficiency
    expect(screen.getByText(/78%/)).toBeInTheDocument() // Consistency

    // Should have progress bars or visual indicators
    const progressElements = screen.getAllByRole('progressbar')
    expect(progressElements.length).toBeGreaterThan(0)
  })

  test('should display adaptive algorithm insights', () => {
    render(<AdaptiveTestResults results={mockResults} showTechnicalDetails={true} />)

    expect(screen.getByText(/Algorithm Performance/i)).toBeInTheDocument()
    expect(screen.getByText(/6 adaptations/i)).toBeInTheDocument()
    expect(screen.getByText(/88% effectiveness/i)).toBeInTheDocument()

    expect(screen.getByText(/Adaptation Log/i)).toBeInTheDocument()
    expect(screen.getByText(/difficulty_increase/i)).toBeInTheDocument()
    expect(screen.getByText(/strong_performance/i)).toBeInTheDocument()
    expect(screen.getByText(/topic_switch/i)).toBeInTheDocument()
  })

  test('should show future performance predictions', () => {
    render(<AdaptiveTestResults results={mockResults} />)

    expect(screen.getByText(/Future Performance/i)).toBeInTheDocument()
    expect(screen.getByText(/85/)).toBeInTheDocument() // Next assessment prediction
    expect(screen.getByText(/ready_for_advanced/i)).toBeInTheDocument()

    expect(screen.getByText(/Mastery Timeline/i)).toBeInTheDocument()
    expect(screen.getByText(/achieved/i)).toBeInTheDocument() // Cell Biology
    expect(screen.getByText(/2 weeks/i)).toBeInTheDocument() // Genetics
  })

  test('should handle results with no identified gaps', () => {
    const perfectResults = {
      ...mockResults,
      gaps: {
        identifiedGaps: [],
        remediationRecommendations: []
      }
    }

    render(<AdaptiveTestResults results={perfectResults} />)

    expect(screen.getByText(/No significant learning gaps identified/i)).toBeInTheDocument()
    expect(screen.getByText(/Excellent performance/i)).toBeInTheDocument()
  })

  test('should provide export and sharing options', () => {
    render(<AdaptiveTestResults results={mockResults} allowExport={true} />)

    expect(screen.getByText(/Export Results/i)).toBeInTheDocument()
    expect(screen.getByText(/Download PDF/i)).toBeInTheDocument()
    expect(screen.getByText(/Share with Teacher/i)).toBeInTheDocument()
    expect(screen.getByText(/Email Report/i)).toBeInTheDocument()
  })

  test('should handle different mastery levels with appropriate styling', () => {
    const varyingResults = {
      ...mockResults,
      finalResults: {
        ...mockResults.finalResults,
        topicBreakdown: {
          'Cell Biology': { score: 95, mastery: 0.95, itemsCompleted: 5 }, // Excellent
          'Genetics': { score: 45, mastery: 0.3, itemsCompleted: 4 }, // Needs Work
          'Evolution': { score: 75, mastery: 0.7, itemsCompleted: 3 } // Good
        }
      }
    }

    render(<AdaptiveTestResults results={varyingResults} />)

    // Should show different indicators for different mastery levels
    expect(screen.getByText(/95/)).toBeInTheDocument() // High score
    expect(screen.getByText(/45/)).toBeInTheDocument() // Low score

    // Visual indicators should reflect performance levels
    const masteryIndicators = screen.getAllByTestId('mastery-indicator')
    expect(masteryIndicators.length).toBe(3) // One for each topic
  })

  test('should show detailed ability estimate information', () => {
    render(<AdaptiveTestResults results={mockResults} showTechnicalDetails={true} />)

    expect(screen.getByText(/Ability Estimate/i)).toBeInTheDocument()
    expect(screen.getByText(/θ = 0.6/i)).toBeInTheDocument() // Theta value
    expect(screen.getByText(/SE = 0.25/i)).toBeInTheDocument() // Standard error
    expect(screen.getByText(/90% confidence/i)).toBeInTheDocument()
  })

  test('should handle loading state and errors', () => {
    render(<AdaptiveTestResults loading={true} />)

    expect(screen.getByText(/Loading results/i)).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  test('should display error state appropriately', () => {
    render(<AdaptiveTestResults error="Failed to load results" />)

    expect(screen.getByText(/Error loading results/i)).toBeInTheDocument()
    expect(screen.getByText(/Failed to load results/i)).toBeInTheDocument()
    expect(screen.getByText(/Retry/i)).toBeInTheDocument()
  })
})

describe('Component Integration', () => {
  test('should integrate AdaptiveTestInterface with AdaptiveTestResults', async () => {
    const user = userEvent.setup({ delay: null })

    // Mock complete workflow
    ;(fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, sessionId: 'integration_test' })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          firstItem: { id: 'item_1', question: 'Test?', options: ['A', 'B'] }
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          processed: true,
          testCompleted: true
        })
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          results: mockResults
        })
      } as Response)

    const TestWorkflow = () => {
      const [results, setResults] = React.useState(null)

      return (
        <div>
          {!results ? (
            <AdaptiveTestInterface
              initialConfig={mockSessionConfig}
              onTestComplete={setResults}
            />
          ) : (
            <AdaptiveTestResults results={results} />
          )}
        </div>
      )
    }

    render(<TestWorkflow />)

    // Complete the test workflow
    await user.click(screen.getByText(/Start Test/i))
    await waitFor(() => screen.getByText(/Test?/i))
    await user.click(screen.getByText('A'))
    fireEvent.change(screen.getByLabelText(/Confidence/i), { target: { value: '3' } })
    await user.click(screen.getByText(/Submit Answer/i))

    // Should transition to results
    await waitFor(() => {
      expect(screen.getByText(/Test Results/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/78/)).toBeInTheDocument() // Score from mock results
  })

  test('should handle responsive design breakpoints', () => {
    // Mock different viewport sizes
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768 // Tablet size
    })

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} />)

    // Component should adapt to smaller screens
    expect(screen.getByTestId('adaptive-test-container')).toHaveClass('responsive-layout')
  })

  test('should support accessibility features', () => {
    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} />)

    // Should have proper ARIA labels
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByLabelText(/Test Type/i)).toBeInTheDocument()

    // Should support keyboard navigation
    const startButton = screen.getByText(/Start Test/i)
    expect(startButton).toHaveAttribute('tabIndex', '0')
  })

  test('should handle real-time updates and WebSocket connections', async () => {
    // Mock WebSocket for real-time updates
    const mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: WebSocket.OPEN,
      addEventListener: jest.fn()
    }

    ;(global as any).WebSocket = jest.fn(() => mockWebSocket)

    render(<AdaptiveTestInterface initialConfig={mockSessionConfig} realTimeUpdates={true} />)

    // Should establish WebSocket connection for real-time updates
    expect(global.WebSocket).toHaveBeenCalled()
  })
})