'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useCourseSelector } from '@/hooks/useCourseSelector'
import {
  CourseSelector,
  CourseSelectorContextProps,
  CourseSelectorEvents,
  CourseSelectorState,
  EnrollmentData,
  PlanSelection,
  ClassLevel,
  SeriesType,
  PlanType,
} from '@/types/courseSelector'

// Context type combining state and actions
interface CourseSelectorContextType {
  // State
  state: CourseSelectorState

  // Computed values
  filteredCourses: any[]
  selectedCourseCount: number
  totalEstimatedCost: number
  isValidSelection: boolean

  // Actions
  selectClass: (classLevel: ClassLevel | 'all') => void
  hoverCard: (cardId: string | null) => void
  selectPlan: (series: SeriesType, plan: PlanType) => void
  updateSearch: (query: string) => void
  updateFilters: (filters: any) => void
  clearSelection: (series: SeriesType) => void
  reset: () => void

  // Advanced actions
  selectMultiplePlans: (selections: PlanSelection[]) => void
  compareSelections: () => any[]
  proceedToEnrollment: () => EnrollmentData

  // Utilities
  getSeriesConfig: (seriesId: SeriesType) => any
  getPlanConfig: (seriesId: SeriesType, planId: PlanType) => any
  calculateTotalCost: (selections: PlanSelection[]) => number
  validateSelection: (selection: PlanSelection) => boolean
  formatPrice: (price: number) => string
  formatDuration: (duration: string) => string

  // Event handlers
  events: CourseSelectorEvents
}

// Create the context
const CourseSelectorContext = createContext<CourseSelectorContextType | undefined>(undefined)

// Provider component
export function CourseSelectorProvider({
  children,
  initialState,
  config = {},
  onStateChange,
  onEnrollment,
}: CourseSelectorContextProps) {
  const {
    state,
    filteredCourses,
    selectedCourseCount,
    totalEstimatedCost,
    isValidSelection,
    actions,
    utils,
  } = useCourseSelector(initialState)

  // Event handlers that can be overridden by props
  const events: CourseSelectorEvents = {
    onClassChange: (classLevel) => {
      actions.selectClass(classLevel)
      onStateChange?.(state)
    },

    onCardHover: (cardId, isEntering) => {
      actions.hoverCard(isEntering ? cardId : null)
      onStateChange?.(state)
    },

    onPlanSelect: (selection) => {
      actions.selectPlan(selection.series, selection.plan)
      onStateChange?.(state)
    },

    onPlanDeselect: (series) => {
      actions.reset() // Clear selection for specific series
      onStateChange?.(state)
    },

    onSearchChange: (query) => {
      actions.updateSearch(query)
      onStateChange?.(state)
    },

    onFilterChange: (filters) => {
      actions.updateFilters(filters)
      onStateChange?.(state)
    },

    onEnrollmentStart: (data) => {
      onEnrollment?.(data)
    },

    onComparisonRequest: (series) => {
      const comparisons = actions.compareSelections()
      console.log('Comparison requested for series:', series, comparisons)
    },

    onStateChange: (newState) => {
      onStateChange?.(newState)
    },
  }

  const contextValue: CourseSelectorContextType = {
    // State
    state,

    // Computed values
    filteredCourses,
    selectedCourseCount,
    totalEstimatedCost,
    isValidSelection,

    // Actions
    selectClass: actions.selectClass,
    hoverCard: actions.hoverCard,
    selectPlan: actions.selectPlan,
    updateSearch: actions.updateSearch,
    updateFilters: actions.updateFilters,
    clearSelection: (series: SeriesType) => {
      // Custom implementation for clearing specific selection
      actions.reset() // For now, reset all. In full implementation, would clear specific series
    },
    reset: actions.reset,

    // Advanced actions
    selectMultiplePlans: actions.selectMultiplePlans,
    compareSelections: actions.compareSelections,
    proceedToEnrollment: actions.proceedToEnrollment,

    // Utilities
    getSeriesConfig: utils.getSeriesConfig,
    getPlanConfig: utils.getPlanConfig,
    calculateTotalCost: utils.calculateTotalCost,
    validateSelection: utils.validateSelection,
    formatPrice: utils.formatPrice,
    formatDuration: utils.formatDuration,

    // Events
    events,
  }

  return (
    <CourseSelectorContext.Provider value={contextValue}>{children}</CourseSelectorContext.Provider>
  )
}

// Hook to use the course selector context
export function useCourseSelectorContext() {
  const context = useContext(CourseSelectorContext)

  if (context === undefined) {
    throw new Error('useCourseSelectorContext must be used within a CourseSelectorProvider')
  }

  return context
}

// HOC for components that need course selector functionality
export function withCourseSelector<P extends object>(Component: React.ComponentType<P>) {
  return function WrappedComponent(props: P) {
    const courseSelectorContext = useCourseSelectorContext()

    return <Component {...props} courseSelector={courseSelectorContext} />
  }
}

// Custom hooks for specific functionality
export function useClassSelection() {
  const { state, selectClass, events } = useCourseSelectorContext()

  return {
    selectedClass: state.selectedClass,
    selectClass: (classLevel: ClassLevel | 'all') => {
      selectClass(classLevel)
      events.onClassChange(classLevel)
    },
    isClassSelected: (classLevel: ClassLevel | 'all') => state.selectedClass === classLevel,
  }
}

export function usePlanSelection() {
  const { state, selectPlan, clearSelection, events, selectedCourseCount, totalEstimatedCost } =
    useCourseSelectorContext()

  return {
    selectedPlans: state.selectedPlans,
    selectedCourseCount,
    totalEstimatedCost,
    selectPlan: (series: SeriesType, plan: PlanType) => {
      selectPlan(series, plan)
      const selection: PlanSelection = {
        series,
        plan,
        timestamp: Date.now(),
      }
      events.onPlanSelect(selection)
    },
    clearSelection: (series: SeriesType) => {
      clearSelection(series)
      events.onPlanDeselect(series)
    },
    isPlanSelected: (series: SeriesType, plan: PlanType) =>
      state.selectedPlans[series]?.plan === plan,
    getSelectedPlan: (series: SeriesType) => state.selectedPlans[series]?.plan,
  }
}

export function useCardHover() {
  const { state, hoverCard, events } = useCourseSelectorContext()

  return {
    hoveredCard: state.hoveredCard,
    setHoveredCard: (cardId: string | null) => {
      hoverCard(cardId)
      events.onCardHover(cardId, !!cardId)
    },
    isCardHovered: (cardId: string) => state.hoveredCard === cardId,
  }
}

export function useSearchAndFilter() {
  const { state, updateSearch, updateFilters, events, filteredCourses } = useCourseSelectorContext()

  return {
    searchQuery: state.searchQuery,
    activeFilters: state.activeFilters,
    filteredCourses,
    updateSearch: (query: string) => {
      updateSearch(query)
      events.onSearchChange(query)
    },
    updateFilters: (filters: any) => {
      updateFilters(filters)
      events.onFilterChange(filters)
    },
    clearSearch: () => updateSearch(''),
    clearFilters: () => updateFilters({}),
    hasActiveFilters: () =>
      Object.keys(state.activeFilters).length > 0 || state.searchQuery.length > 0,
  }
}

export function useEnrollment() {
  const { proceedToEnrollment, isValidSelection, events } = useCourseSelectorContext()

  return {
    isValidSelection,
    proceedToEnrollment: () => {
      const enrollmentData = proceedToEnrollment()
      events.onEnrollmentStart(enrollmentData)
      return enrollmentData
    },
    canProceedToEnrollment: () => isValidSelection,
  }
}

// Utility component for debugging
export function CourseSelectorDebugger() {
  const context = useCourseSelectorContext()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-sm">
      <div className="font-bold mb-2">Course Selector State</div>
      <div>Class: {context.state.selectedClass}</div>
      <div>Hovered: {context.state.hoveredCard || 'none'}</div>
      <div>Selections: {context.selectedCourseCount}</div>
      <div>Total Cost: {context.formatPrice(context.totalEstimatedCost)}</div>
      <div>Valid: {context.isValidSelection ? 'Yes' : 'No'}</div>
      <div>Search: "{context.state.searchQuery}"</div>
      <div>Last Interaction: {new Date(context.state.lastInteraction).toLocaleTimeString()}</div>
    </div>
  )
}
