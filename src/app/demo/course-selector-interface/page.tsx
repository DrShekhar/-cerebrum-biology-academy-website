'use client'

import { motion } from 'framer-motion'
import {
  CourseSelectorProvider,
  useClassSelection,
  usePlanSelection,
  useCardHover,
  useSearchAndFilter,
  useEnrollment,
  CourseSelectorDebugger,
} from '@/contexts/CourseSelectorContext'
import { ClassLevel, SeriesType, PlanType } from '@/types/courseSelector'

// Demo component showing class selection
function ClassSelectionDemo() {
  const { selectedClass, selectClass, isClassSelected } = useClassSelection()

  const classes: Array<{ value: ClassLevel | 'all'; label: string; emoji: string }> = [
    { value: 'all', label: 'All Classes', emoji: '📚' },
    { value: 9, label: 'Class 9', emoji: '🌱' },
    { value: 10, label: 'Class 10', emoji: '🌿' },
    { value: 11, label: 'Class 11', emoji: '🎯' },
    { value: 12, label: 'Class 12', emoji: '🏆' },
    { value: 'Dropper', label: 'Dropper', emoji: '💪' },
  ]

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Class Selection Interface</h3>
      <div className="flex flex-wrap gap-3">
        {classes.map((cls) => (
          <motion.button
            key={cls.value}
            onClick={() => selectClass(cls.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              isClassSelected(cls.value)
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{cls.emoji}</span>
            {cls.label}
          </motion.button>
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-600">
        Selected: <strong>{selectedClass}</strong>
      </div>
    </div>
  )
}

// Demo component showing plan selection
function PlanSelectionDemo() {
  const {
    selectedPlans,
    selectedCourseCount,
    totalEstimatedCost,
    selectPlan,
    clearSelection,
    isPlanSelected,
    getSelectedPlan,
  } = usePlanSelection()

  const series: Array<{ id: SeriesType; name: string; emoji: string }> = [
    { id: 'pinnacle', name: 'Elite Mastery', emoji: '👑' },
    { id: 'ascent', name: 'Advanced Plus', emoji: '⚡' },
    { id: 'pursuit', name: 'Foundation Pro', emoji: '🚀' },
  ]

  const plans: Array<{ id: PlanType; name: string; price: number }> = [
    { id: 'A', name: 'Fast Track', price: 999 },
    { id: 'B', name: 'Standard', price: 699 },
    { id: 'C', name: 'Self-Paced', price: 499 },
  ]

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Plan Selection Interface</h3>

      {/* Series Selection */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {series.map((ser) => (
          <div key={ser.id} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{ser.emoji}</span>
                <span className="font-semibold">{ser.name}</span>
              </div>
              {getSelectedPlan(ser.id) && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => clearSelection(ser.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear
                </motion.button>
              )}
            </div>

            <div className="space-y-2">
              {plans.map((plan) => (
                <motion.button
                  key={`${ser.id}-${plan.id}`}
                  onClick={() => selectPlan(ser.id, plan.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-2 rounded-lg text-sm font-medium transition-all ${
                    isPlanSelected(ser.id, plan.id)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Plan {plan.id} - {plan.name} (₹{plan.price})
                </motion.button>
              ))}
            </div>

            {getSelectedPlan(ser.id) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-2 bg-green-50 rounded-lg text-sm text-green-700"
              >
                ✅ Selected: Plan {getSelectedPlan(ser.id)}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">Total Selections: {selectedCourseCount}</span>
            <div className="text-sm text-gray-600 mt-1">
              Selected Plans:{' '}
              {Object.entries(selectedPlans)
                .map(([series, selection]) => `${series}: Plan ${selection.plan}`)
                .join(', ') || 'None'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              ₹{totalEstimatedCost.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Estimated Cost</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Demo component showing hover states
function HoverStateDemo() {
  const { hoveredCard, setHoveredCard, isCardHovered } = useCardHover()

  const cards = [
    { id: 'pinnacle-card', name: 'Elite Mastery', color: 'from-purple-500 to-pink-500' },
    { id: 'ascent-card', name: 'Advanced Plus', color: 'from-blue-500 to-cyan-500' },
    { id: 'pursuit-card', name: 'Foundation Pro', color: 'from-green-500 to-emerald-500' },
  ]

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Hover State Management</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onHoverStart={() => setHoveredCard(card.id)}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`p-6 rounded-xl bg-gradient-to-br ${card.color} text-white cursor-pointer ${
              isCardHovered(card.id) ? 'shadow-2xl' : 'shadow-lg'
            }`}
          >
            <h4 className="font-bold text-lg mb-2">{card.name}</h4>
            <p className="text-sm opacity-90">
              {isCardHovered(card.id) ? 'Currently Hovered!' : 'Hover over me'}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        Currently Hovered: <strong>{hoveredCard || 'None'}</strong>
      </div>
    </div>
  )
}

// Demo component showing search and filter
function SearchFilterDemo() {
  const {
    searchQuery,
    activeFilters,
    filteredCourses,
    updateSearch,
    updateFilters,
    clearSearch,
    clearFilters,
    hasActiveFilters,
  } = useSearchAndFilter()

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Search & Filter Interface</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">Search Courses</label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <select
            onChange={(e) => {
              const value = e.target.value
              if (value === 'all') {
                updateFilters({ priceRange: undefined })
              } else {
                const [min, max] = value.split('-').map(Number)
                updateFilters({ priceRange: [min, max] })
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Prices</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000-2000">₹1000+</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters() && (
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-medium">Active Filters:</span>
          {searchQuery && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              Search: "{searchQuery}"
            </span>
          )}
          {activeFilters.priceRange && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              Price: ₹{activeFilters.priceRange[0]} - ₹{activeFilters.priceRange[1]}
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-red-600 hover:text-red-800">
            Clear All
          </button>
        </div>
      )}

      {/* Results */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">
          Found <strong>{filteredCourses.length}</strong> courses matching your criteria
        </div>
      </div>
    </div>
  )
}

// Demo component showing enrollment process
function EnrollmentDemo() {
  const { isValidSelection, proceedToEnrollment, canProceedToEnrollment } = useEnrollment()

  const handleEnrollment = () => {
    if (canProceedToEnrollment()) {
      const enrollmentData = proceedToEnrollment()
      console.log('Enrollment Data:', enrollmentData)
      alert('Enrollment process started! Check console for details.')
    }
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Enrollment Interface</h3>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-lg">Ready to Enroll?</h4>
            <p className="text-sm text-gray-600">
              {isValidSelection
                ? 'You have made valid selections and can proceed to enrollment.'
                : 'Please select a class and at least one plan to proceed.'}
            </p>
          </div>
          <div
            className={`w-4 h-4 rounded-full ${isValidSelection ? 'bg-green-500' : 'bg-red-500'}`}
          />
        </div>

        <motion.button
          onClick={handleEnrollment}
          disabled={!canProceedToEnrollment()}
          whileHover={canProceedToEnrollment() ? { scale: 1.02 } : {}}
          whileTap={canProceedToEnrollment() ? { scale: 0.98 } : {}}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            canProceedToEnrollment()
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canProceedToEnrollment() ? 'Proceed to Enrollment' : 'Complete Your Selection First'}
        </motion.button>
      </div>
    </div>
  )
}

// Main demo page component
function CourseSelectorInterfaceContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Course Selector Interface Structure
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete TypeScript interface implementation with state management, event handling, and
            component composition.
          </p>
        </motion.div>

        {/* Interface Demos */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <ClassSelectionDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <PlanSelectionDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <HoverStateDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <SearchFilterDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <EnrollmentDemo />
          </motion.div>
        </div>

        {/* Technical Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">🛠️ Interface Structure Overview</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-green-400 mb-3">State Management</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• useReducer for complex state</li>
                <li>• Context for global access</li>
                <li>• Custom hooks for features</li>
                <li>• Auto-save functionality</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Type Safety</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Comprehensive interfaces</li>
                <li>• Union types for constraints</li>
                <li>• Generic utility types</li>
                <li>• Event handler typing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Architecture</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Component composition</li>
                <li>• Separation of concerns</li>
                <li>• Reusable hook patterns</li>
                <li>• HOC for enhancement</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Debug Panel */}
      <CourseSelectorDebugger />
    </div>
  )
}

// Main export with provider wrapper
export default function CourseSelectorInterfacePage() {
  return (
    <CourseSelectorProvider
      config={{
        enableMultipleSelections: true,
        enableComparison: true,
        enableSearch: true,
        enableFilters: true,
        autoSave: true,
        analyticsTracking: true,
      }}
      onStateChange={(state) => {
        console.log('State changed:', state)
      }}
      onEnrollment={(data) => {
        console.log('Enrollment started:', data)
      }}
    >
      <CourseSelectorInterfaceContent />
    </CourseSelectorProvider>
  )
}
