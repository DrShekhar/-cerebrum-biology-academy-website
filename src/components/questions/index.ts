/**
 * Advanced NEET Biology Question Components
 * Comprehensive set of UI components for different question types
 */

// Question Components
export { default as AssertionReasonQuestion } from './AssertionReasonQuestion'
export { default as MatchTheFollowingQuestion } from './MatchTheFollowingQuestion'
export { default as DiagramBasedQuestion } from './DiagramBasedQuestion'
export { default as MultipleCorrectQuestion } from './MultipleCorrectQuestion'
export { default as NumericalQuestion } from './NumericalQuestion'
export { default as StatementBasedQuestion } from './StatementBasedQuestion'

// Main Question Renderer
export { default as AdvancedQuestionRenderer } from '../test-generator/AdvancedQuestionRenderer'

// Accessibility Components
export { default as QuestionAccessibility, useQuestionAccessibility, useHighContrastMode } from '../accessibility/QuestionAccessibility'

// Analytics Components
export { default as QuestionTypeAnalytics } from '../analytics/QuestionTypeAnalytics'

// Types
export type {
  NEETQuestion,
  AssertionReasonQuestion as AssertionReasonQuestionType,
  MatchFollowingQuestion as MatchFollowingQuestionType,
  DiagramBasedQuestion as DiagramBasedQuestionType,
  MultipleCorrectQuestion as MultipleCorrectQuestionType,
  NumericalQuestion as NumericalQuestionType,
  StatementBasedQuestion as StatementBasedQuestionType
} from '../../data/neetQuestionBank'

// Question Data
export {
  allQuestionBanks,
  allAdvancedQuestions,
  advancedQuestionStats
} from '../../data/neetQuestionBank'

export {
  allAdvancedQuestions as advancedQuestionData
} from '../../data/advancedQuestions'

/**
 * Question Type Registry
 * Maps question types to their respective components
 */
export const QUESTION_TYPE_COMPONENTS = {
  'assertion-reason': 'AssertionReasonQuestion',
  'match-following': 'MatchTheFollowingQuestion',
  'diagram-based': 'DiagramBasedQuestion',
  'multiple-correct': 'MultipleCorrectQuestion',
  'numerical': 'NumericalQuestion',
  'statement-based': 'StatementBasedQuestion',
  'single-correct': 'SingleCorrectQuestion' // handled by AdvancedQuestionRenderer
} as const

/**
 * Question Type Metadata
 * Provides information about each question type
 */
export const QUESTION_TYPE_METADATA = {
  'single-correct': {
    label: 'Single Correct',
    description: 'Choose one correct answer from multiple options',
    color: 'blue',
    icon: '○',
    difficulty: 'Easy to Medium',
    timeRange: '30-60 seconds',
    markingScheme: '+4 for correct, -1 for incorrect',
    tips: ['Read all options carefully', 'Eliminate obviously wrong choices', 'Look for keywords']
  },
  'assertion-reason': {
    label: 'Assertion-Reason',
    description: 'Evaluate the relationship between assertion and reason statements',
    color: 'purple',
    icon: 'A-R',
    difficulty: 'Medium to Hard',
    timeRange: '60-120 seconds',
    markingScheme: '+4 for correct, -1 for incorrect',
    tips: ['Check if both statements are true', 'Determine causal relationship', 'Read carefully']
  },
  'match-following': {
    label: 'Match the Following',
    description: 'Match items from two columns correctly',
    color: 'orange',
    icon: '⟷',
    difficulty: 'Medium',
    timeRange: '90-150 seconds',
    markingScheme: '+4 for correct, -1 for incorrect',
    tips: ['Match obvious pairs first', 'Use process of elimination', 'Check all combinations']
  },
  'diagram-based': {
    label: 'Diagram Based',
    description: 'Answer questions based on diagrams and illustrations',
    color: 'cyan',
    icon: '📊',
    difficulty: 'Medium to Hard',
    timeRange: '60-120 seconds',
    markingScheme: '+4 for correct, -1 for incorrect',
    tips: ['Study the diagram carefully', 'Identify key structures', 'Relate structure to function']
  },
  'multiple-correct': {
    label: 'Multiple Correct',
    description: 'Select all correct options from the given choices',
    color: 'emerald',
    icon: '☑',
    difficulty: 'Hard',
    timeRange: '90-150 seconds',
    markingScheme: '+4 for all correct, +2 for partial, -1 for any wrong',
    tips: ['Evaluate each option independently', 'Avoid negative marking', 'Be conservative']
  },
  'numerical': {
    label: 'Numerical',
    description: 'Calculate and enter numerical answers',
    color: 'indigo',
    icon: '123',
    difficulty: 'Medium to Hard',
    timeRange: '120-180 seconds',
    markingScheme: '+4 for correct, 0 for incorrect',
    tips: ['Double-check calculations', 'Watch for units', 'Use approximations when helpful']
  },
  'statement-based': {
    label: 'Statement Based',
    description: 'Evaluate multiple statements and choose the correct combination',
    color: 'teal',
    icon: '✓✗',
    difficulty: 'Medium to Hard',
    timeRange: '90-150 seconds',
    markingScheme: '+4 for correct, -1 for incorrect',
    tips: ['Evaluate each statement separately', 'Check logical relationships', 'Read options carefully']
  }
} as const

/**
 * Question Type Statistics
 * Usage and performance data for different question types
 */
export const QUESTION_TYPE_STATS = {
  distribution: {
    'single-correct': 70, // percentage in typical NEET
    'assertion-reason': 15,
    'match-following': 5,
    'diagram-based': 5,
    'multiple-correct': 3,
    'numerical': 1,
    'statement-based': 1
  },
  averageTime: {
    'single-correct': 45,
    'assertion-reason': 90,
    'match-following': 120,
    'diagram-based': 85,
    'multiple-correct': 110,
    'numerical': 140,
    'statement-based': 100
  },
  difficultyDistribution: {
    easy: 40,
    medium: 40,
    hard: 20
  }
} as const

/**
 * Accessibility Features
 * Lists all accessibility features implemented
 */
export const ACCESSIBILITY_FEATURES = [
  'Screen reader support with ARIA labels',
  'Keyboard navigation (Arrow keys, Tab, Space)',
  'High contrast mode detection',
  'Focus management and skip links',
  'Live announcements for selections',
  'Keyboard shortcuts for quick navigation',
  'Alternative text for all images',
  'Proper heading structure',
  'Color-blind friendly design',
  'Scalable text and UI elements'
] as const