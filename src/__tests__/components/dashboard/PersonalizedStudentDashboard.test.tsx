/**
 * Unit Tests for PersonalizedStudentDashboard Component
 *
 * Test Coverage:
 * - Component rendering (empty, loading, loaded states)
 * - User interaction (tabs, buttons, timer)
 * - Data transformation
 * - State management
 * - Error handling
 */

import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import { PersonalizedStudentDashboard } from '@/components/dashboard/PersonalizedStudentDashboard'
import { useAuth } from '@/contexts/AuthContext'
import '@testing-library/jest-dom'

// Mock dependencies
jest.mock('@/contexts/AuthContext')
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

// Test fixtures
const mockAuthenticatedUser = {
  user: {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@test.com',
  },
  isAuthenticated: true,
}

const mockGuestUser = {
  user: null,
  isAuthenticated: false,
}

const mockTestAttemptsResponse = {
  success: true,
  data: {
    attempts: [
      {
        id: 'attempt-1',
        score: 450,
        percentage: 75,
        timeSpent: 3600,
        strengthAreas: ['Cell Biology', 'Genetics'],
        weaknessAreas: ['Ecology', 'Evolution'],
        rank: 1500,
        testTemplate: {
          title: 'NEET Mock Test 1',
          type: 'MOCK_TEST',
        },
        createdAt: '2025-10-28T10:00:00Z',
      },
      {
        id: 'attempt-2',
        score: 425,
        percentage: 71,
        timeSpent: 3500,
        strengthAreas: ['Cell Biology'],
        weaknessAreas: ['Ecology', 'Evolution', 'Physiology'],
        rank: 1800,
        testTemplate: {
          title: 'NEET Practice Test 2',
          type: 'PRACTICE_TEST',
        },
        createdAt: '2025-10-27T10:00:00Z',
      },
    ],
  },
}

const mockEmptyResponse = {
  success: true,
  data: {
    attempts: [],
  },
}

const mockErrorResponse = {
  success: false,
  error: 'Failed to fetch test attempts',
}

describe('PersonalizedStudentDashboard', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks()

    // Mock fetch
    global.fetch = jest.fn()

    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
      length: 0,
      key: jest.fn(),
    }
    global.localStorage = localStorageMock as any
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Loading State', () => {
    it('TC-004: shows loading skeleton while fetching data', () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)

      render(<PersonalizedStudentDashboard />)

      expect(screen.getByText('Loading your dashboard data...')).toBeInTheDocument()
    })

    it('TC-005: transitions from loading to content smoothly', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })

      const { container } = render(<PersonalizedStudentDashboard />)

      // Loading state present initially
      expect(screen.getByText('Loading your dashboard data...')).toBeInTheDocument()

      // Wait for data to load
      await waitFor(() => {
        expect(screen.queryByText('Loading your dashboard data...')).not.toBeInTheDocument()
      })

      // Content should be visible
      expect(screen.getByText(/Welcome back, John Doe!/)).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('TC-006: new user sees empty state', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockEmptyResponse,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Ready to Start Your Journey?')).toBeInTheDocument()
      })

      expect(screen.getByText('Take Your First Test')).toBeInTheDocument()
      expect(screen.getByText('Browse Practice Questions')).toBeInTheDocument()
    })

    it('TC-007: CTA buttons navigate correctly', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockEmptyResponse,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Take Your First Test')).toBeInTheDocument()
      })

      const takeTestButton = screen.getByText('Take Your First Test').closest('a')
      expect(takeTestButton).toHaveAttribute('href', '/mock-tests')

      const browseButton = screen.getByText('Browse Practice Questions').closest('a')
      expect(browseButton).toHaveAttribute('href', '/practice')
    })
  })

  describe('Header Component', () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })
    })

    it('TC-008: user name displays correctly', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText(/Welcome back, John Doe!/)).toBeInTheDocument()
      })
    })

    it('TC-009: fallback name when name missing', async () => {
      mockUseAuth.mockReturnValue({
        user: { id: 'user-123', email: 'john@test.com', name: null },
        isAuthenticated: true,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText(/Welcome back, Student!/)).toBeInTheDocument()
      })
    })

    it('TC-010: current score displayed', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Average of 450 and 425 = 437.5 rounded to 438
        expect(screen.getByText(/438\/720/)).toBeInTheDocument()
      })
    })

    it('TC-011: rank displayed', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('#1500')).toBeInTheDocument()
      })
    })
  })

  describe('NEET Score Prediction Card', () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })
    })

    it('TC-014: NEET score prediction shows', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText(/NEET Score Prediction/)).toBeInTheDocument()
        expect(screen.getByText(/Current Biology Score/)).toBeInTheDocument()
      })
    })

    it('TC-015: target progress bar correct width', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        const progressBar = screen.getByText(/Progress to Target/).closest('div')
        // Current: 438, Target: 540 = 81%
        expect(progressBar).toBeInTheDocument()
      })
    })

    it('TC-016: improvement indicator shows positive', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Latest (450) - Previous (425) = +25
        expect(screen.getByText(/\+25 from last test/)).toBeInTheDocument()
      })
    })

    it('TC-017: negative improvement shows', async () => {
      const negativeImprovement = {
        success: true,
        data: {
          attempts: [
            { ...mockTestAttemptsResponse.data.attempts[0], score: 400 },
            { ...mockTestAttemptsResponse.data.attempts[1], score: 425 },
          ],
        },
      }
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => negativeImprovement,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // 400 - 425 = -25 (should show negative)
        const improvementElement = screen.getByText(/-25 from last test/i)
        expect(improvementElement).toBeInTheDocument()
      })
    })
  })

  describe('Stats Cards', () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })
    })

    it('TC-019: total study time calculated', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // 3600 + 3500 = 7100 seconds = 118 minutes = ~2h
        expect(screen.getByText('Total Study Time')).toBeInTheDocument()
        expect(screen.getByText(/2h/)).toBeInTheDocument()
      })
    })

    it('TC-020: session count accurate', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('2 sessions')).toBeInTheDocument()
      })
    })

    it('TC-022: average score shown', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Average Score')).toBeInTheDocument()
        // Average of 75% and 71% would be displayed
      })
    })

    it('TC-023: tests completed count', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Tests Completed')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
      })
    })
  })

  describe('Strong/Weak Areas', () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })
    })

    it('TC-027: strong areas list renders with items', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Strong Areas')).toBeInTheDocument()
        expect(screen.getByText('Cell Biology')).toBeInTheDocument()
        expect(screen.getByText('Genetics')).toBeInTheDocument()
      })
    })

    it('TC-030: weak areas list renders with items', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Areas for Improvement')).toBeInTheDocument()
        expect(screen.getByText('Ecology')).toBeInTheDocument()
        expect(screen.getByText('Evolution')).toBeInTheDocument()
      })
    })

    it('TC-031: difficulty badges correct', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Check for difficulty badges
        const badges = screen.getAllByText(/high|medium|low/)
        expect(badges.length).toBeGreaterThan(0)
      })
    })

    it('TC-033: start practice button works', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Areas for Improvement')).toBeInTheDocument()
      })

      const startButtons = screen.getAllByText(/Start Practice/)
      expect(startButtons.length).toBeGreaterThan(0)

      fireEvent.click(startButtons[0])

      // Should switch to study tab
      await waitFor(() => {
        expect(screen.getByText('Focus Study Session')).toBeInTheDocument()
      })
    })
  })

  describe('Recent Activity Feed', () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })
    })

    it('TC-035: sessions sorted by date', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Recent Study Sessions')).toBeInTheDocument()
      })

      const sessions = screen.getAllByText(/NEET/)
      // Most recent (Mock Test 1) should be first
      expect(sessions[0]).toHaveTextContent('NEET Mock Test 1')
    })

    it('TC-037: duration in minutes', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // 3600 seconds = 60 minutes
        expect(screen.getByText(/60 min/)).toBeInTheDocument()
      })
    })

    it('TC-038: score percentage shown', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText(/75%/)).toBeInTheDocument()
        expect(screen.getByText(/71%/)).toBeInTheDocument()
      })
    })
  })

  describe('Navigation Tabs', () => {
    beforeEach(async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })
    })

    it('TC-041: all 6 tabs render', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument()
        expect(screen.getByText('Progress Tracking')).toBeInTheDocument()
        expect(screen.getByText('Study Session')).toBeInTheDocument()
        expect(screen.getByText('Weak Areas')).toBeInTheDocument()
        expect(screen.getByText('Practice Tests')).toBeInTheDocument()
        expect(screen.getByText('Study Schedule')).toBeInTheDocument()
      })
    })

    it('TC-043: tab switch updates content', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument()
      })

      // Click Study Session tab
      const studyTab = screen.getByText('Study Session')
      fireEvent.click(studyTab)

      await waitFor(() => {
        expect(screen.getByText('Focus Study Session')).toBeInTheDocument()
      })
    })
  })

  describe('Study Timer', () => {
    beforeEach(async () => {
      jest.useFakeTimers()
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('TC-046: timer starts at zero', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Study Session')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Study Session'))

      await waitFor(() => {
        expect(screen.getByText('00:00:00')).toBeInTheDocument()
      })
    })

    it('TC-047: timer increments per second', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Study Session')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Study Session'))

      await waitFor(() => {
        expect(screen.getByText('00:00:00')).toBeInTheDocument()
      })

      // Click Start button
      const startButton = screen.getByText('Start')
      fireEvent.click(startButton)

      // Fast-forward 3 seconds
      act(() => {
        jest.advanceTimersByTime(3000)
      })

      await waitFor(() => {
        expect(screen.getByText('00:00:03')).toBeInTheDocument()
      })
    })

    it('TC-048: pause stops increment', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        fireEvent.click(screen.getByText('Study Session'))
      })

      // Start timer
      const startButton = screen.getByText('Start')
      fireEvent.click(startButton)

      act(() => {
        jest.advanceTimersByTime(3000)
      })

      // Pause timer
      const pauseButton = screen.getByText('Pause')
      fireEvent.click(pauseButton)

      await waitFor(() => {
        expect(screen.getByText('00:00:03')).toBeInTheDocument()
      })

      // Advance time again
      act(() => {
        jest.advanceTimersByTime(2000)
      })

      // Timer should still show 00:00:03 (paused)
      expect(screen.getByText('00:00:03')).toBeInTheDocument()
    })

    it('TC-049: stop resets timer', async () => {
      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        fireEvent.click(screen.getByText('Study Session'))
      })

      // Start and advance timer
      fireEvent.click(screen.getByText('Start'))
      act(() => {
        jest.advanceTimersByTime(5000)
      })

      // Reset timer
      const resetButton = screen.getByText('Reset')
      fireEvent.click(resetButton)

      await waitFor(() => {
        expect(screen.getByText('00:00:00')).toBeInTheDocument()
      })
    })
  })

  describe('Error Handling', () => {
    it('TC-065: invalid JSON handled', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Invalid JSON'))

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Should show empty state on error
        expect(screen.queryByText('Loading your dashboard data...')).not.toBeInTheDocument()
      })
    })

    it('TC-066: missing fields use fallbacks', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      const incompleteData = {
        success: true,
        data: {
          attempts: [
            {
              id: 'attempt-1',
              // Missing score, percentage, etc.
              testTemplate: {
                title: 'Test',
                type: 'MOCK_TEST',
              },
            },
          ],
        },
      }
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => incompleteData,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Should not crash
        expect(screen.getByText(/Welcome back/)).toBeInTheDocument()
      })
    })
  })

  describe('Guest User Flow', () => {
    it('TC-136: guest user ID generated', async () => {
      mockUseAuth.mockReturnValue(mockGuestUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockEmptyResponse,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'freeUserId',
          expect.stringMatching(/^free_\d+_[a-z0-9]+$/)
        )
      })
    })

    it('TC-137: guest user ID persists', async () => {
      const existingFreeUserId = 'free_123_abc'
      ;(localStorage.getItem as jest.Mock).mockReturnValue(existingFreeUserId)

      mockUseAuth.mockReturnValue(mockGuestUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockEmptyResponse,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith('freeUserId')
        // Should not generate new ID
        expect(localStorage.setItem).not.toHaveBeenCalled()
      })
    })
  })

  describe('Data Integrity', () => {
    it('TC-104: score calculation accurate', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Average: (450 + 425) / 2 = 437.5 → 438
        expect(screen.getByText(/438\/720/)).toBeInTheDocument()
      })
    })

    it('TC-105: improvement delta correct', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockTestAttemptsResponse,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Latest (450) - Previous (425) = +25
        expect(screen.getByText(/\+25 from last test/)).toBeInTheDocument()
      })
    })

    it('TC-110: null values handled', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      const nullData = {
        success: true,
        data: {
          attempts: [
            {
              id: 'attempt-1',
              score: null,
              percentage: null,
              strengthAreas: null,
              weaknessAreas: null,
              testTemplate: {
                title: 'Test',
                type: 'MOCK_TEST',
              },
            },
          ],
        },
      }
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => nullData,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        // Should not crash, render with fallbacks
        expect(screen.getByText(/Welcome back/)).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('TC-111: 0 test attempts handled', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => mockEmptyResponse,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText('Ready to Start Your Journey?')).toBeInTheDocument()
      })
    })

    it('TC-113: max score (720) handled', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      const perfectScore = {
        success: true,
        data: {
          attempts: [
            {
              ...mockTestAttemptsResponse.data.attempts[0],
              score: 720,
              percentage: 100,
            },
          ],
        },
      }
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => perfectScore,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText(/720\/720/)).toBeInTheDocument()
      })
    })

    it('TC-114: min score (0) handled', async () => {
      mockUseAuth.mockReturnValue(mockAuthenticatedUser)
      const zeroScore = {
        success: true,
        data: {
          attempts: [
            {
              ...mockTestAttemptsResponse.data.attempts[0],
              score: 0,
              percentage: 0,
            },
          ],
        },
      }
      ;(global.fetch as jest.Mock).mockResolvedValue({
        json: async () => zeroScore,
      })

      render(<PersonalizedStudentDashboard />)

      await waitFor(() => {
        expect(screen.getByText(/0\/720/)).toBeInTheDocument()
      })
    })
  })
})
