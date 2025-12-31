'use client'

import Link from 'next/link'
import {
  Search,
  Building2,
  TrendingUp,
  MapPin,
  Award,
  Globe,
  Home,
  Accessibility,
  HelpCircle,
  ArrowDown,
  X,
  CheckCircle,
  Share2,
  Download,
  Info,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  Heart,
  Scale,
  IndianRupee,
  Star,
  Loader2,
} from 'lucide-react'

import {
  useCollegePredictor,
  Toast,
  HeroSection,
  CollegeCard,
  CompareModal,
  FloatingCompareBar,
  QuotaExplanationSection,
  DataSourceSection,
  ExploreSection,
  CTASection,
  getMarksFromRank,
  generateSlug,
  type QuotaPreference,
  type SortOption,
} from './_components'

export default function NEETCollegePredictorPage() {
  const {
    rank,
    setRank,
    marks,
    setMarks,
    category,
    setCategory,
    isPwD,
    setIsPwD,
    domicileState,
    setDomicileState,
    quotaPreference,
    setQuotaPreference,
    collegeType,
    setCollegeType,
    selectedState,
    setSelectedState,
    feeRange,
    setFeeRange,
    sortBy,
    setSortBy,
    inputMode,
    setInputMode,
    searchMode,
    setSearchMode,
    collegeSearchQuery,
    setCollegeSearchQuery,
    selectedCollege,
    setSelectedCollege,
    showCollegeDropdown,
    setShowCollegeDropdown,
    showResults,
    isLoading,
    hasSearched,
    visibleCount,
    expandedCard,
    setExpandedCard,
    toast,
    hideToast,
    compareList,
    setCompareList,
    showCompareModal,
    setShowCompareModal,
    collegeSearchRef,
    resultsRef,
    allStates,
    results,
    filteredCollegesForSearch,
    uniqueColleges,
    aiqCount,
    stateCount,
    govtCount,
    privateCount,
    handlePredict,
    handleReset,
    loadMore,
    handleCollegeSelect,
    isCollegeSaved,
    toggleSaveCollege,
    isInCompareList,
    toggleCompare,
    shareOnWhatsApp,
    exportToPDF,
  } = useCollegePredictor()

  const getButtonText = () => {
    if (isLoading)
      return (
        <>
          <Loader2 className="h-5 w-5 animate-spin" /> Searching...
        </>
      )
    if (hasSearched)
      return (
        <>
          <Search className="h-5 w-5" /> Update Results
        </>
      )
    return (
      <>
        <Search className="h-5 w-5" /> Find Colleges
      </>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'NEET College Predictor 2026',
            description:
              'Free tool to find medical colleges based on your NEET rank. Comprehensive database of 470+ Government and Private/Deemed medical colleges with AIQ and State Quota cutoffs.',
            url: 'https://cerebrumbiologyacademy.com/neet-college-predictor',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      <Toast toast={toast} onClose={hideToast} />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <HeroSection />

        {/* Calculator Section */}
        <section className="relative z-10 -mt-16 px-4 sm:px-6 md:-mt-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl">
              <div id="search-form" className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Find Your Medical Colleges</h2>
                  <p className="text-gray-600">
                    Enter your NEET AIR to see colleges with AIQ & State Quota options
                  </p>
                </div>

                {/* Search Mode Toggle */}
                <div className="mb-6">
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-xl bg-gray-100 p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchMode('rank')
                          setSelectedCollege(null)
                          setCollegeSearchQuery('')
                        }}
                        className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                          searchMode === 'rank'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <TrendingUp className="h-4 w-4" />
                        Search by Rank
                      </button>
                      <button
                        type="button"
                        onClick={() => setSearchMode('college')}
                        className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                          searchMode === 'college'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Building2 className="h-4 w-4" />
                        Search by College
                      </button>
                    </div>
                  </div>
                </div>

                {searchMode === 'college' ? (
                  <CollegeSearchForm
                    collegeSearchRef={collegeSearchRef}
                    collegeSearchQuery={collegeSearchQuery}
                    setCollegeSearchQuery={setCollegeSearchQuery}
                    showCollegeDropdown={showCollegeDropdown}
                    setShowCollegeDropdown={setShowCollegeDropdown}
                    filteredCollegesForSearch={filteredCollegesForSearch}
                    handleCollegeSelect={handleCollegeSelect}
                    selectedCollege={selectedCollege}
                    setSelectedCollege={setSelectedCollege}
                    getMarksFromRank={getMarksFromRank}
                  />
                ) : (
                  <RankSearchForm
                    rank={rank}
                    setRank={setRank}
                    marks={marks}
                    setMarks={setMarks}
                    inputMode={inputMode}
                    setInputMode={setInputMode}
                    category={category}
                    setCategory={setCategory}
                    domicileState={domicileState}
                    setDomicileState={setDomicileState}
                    quotaPreference={quotaPreference}
                    setQuotaPreference={setQuotaPreference}
                    isPwD={isPwD}
                    setIsPwD={setIsPwD}
                    collegeType={collegeType}
                    setCollegeType={setCollegeType}
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    feeRange={feeRange}
                    setFeeRange={setFeeRange}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    allStates={allStates}
                    isLoading={isLoading}
                    hasSearched={hasSearched}
                    showResults={showResults}
                    handlePredict={handlePredict}
                    handleReset={handleReset}
                    getButtonText={getButtonText}
                    results={results}
                    uniqueColleges={uniqueColleges}
                    aiqCount={aiqCount}
                    stateCount={stateCount}
                    govtCount={govtCount}
                    privateCount={privateCount}
                    shareOnWhatsApp={shareOnWhatsApp}
                    exportToPDF={exportToPDF}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && (
          <section ref={resultsRef} className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              {results.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                    <Search className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">No Colleges Found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or enter a different rank.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Your College Options ({results.length})
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Showing {Math.min(visibleCount, results.length)} results</span>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {results.slice(0, visibleCount).map((result, index) => (
                      <CollegeCard
                        key={`${result.college.name}-${result.quotaType}-${index}`}
                        result={result}
                        index={index}
                        rank={rank}
                        isPwD={isPwD}
                        expandedCard={expandedCard}
                        setExpandedCard={setExpandedCard}
                        isCollegeSaved={isCollegeSaved}
                        toggleSaveCollege={toggleSaveCollege}
                        isInCompareList={isInCompareList}
                        toggleCompare={toggleCompare}
                        compareListLength={compareList.length}
                      />
                    ))}
                  </div>

                  {visibleCount < results.length && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={loadMore}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700"
                      >
                        <ArrowDown className="h-5 w-5" />
                        Load More ({results.length - visibleCount} remaining)
                      </button>
                      <p className="mt-2 text-sm text-gray-500">
                        Showing {visibleCount} of {results.length} results
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        <QuotaExplanationSection />
        <DataSourceSection />
        <ExploreSection
          onCollegeSearchClick={() => {
            setSearchMode('college')
            document.getElementById('search-form')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <CTASection />

        {/* Floating Compare Bar */}
        {compareList.length > 0 && !showCompareModal && (
          <FloatingCompareBar
            compareList={compareList}
            onCompareClick={() => setShowCompareModal(true)}
            onClear={() => setCompareList([])}
            toggleCompare={toggleCompare}
          />
        )}

        {/* Compare Modal */}
        {showCompareModal && (
          <CompareModal
            compareList={compareList}
            category={category}
            isPwD={isPwD}
            rank={rank}
            onClose={() => setShowCompareModal(false)}
            onClear={() => setCompareList([])}
            toggleCompare={toggleCompare}
          />
        )}
      </main>
    </>
  )
}

/* ============================================
   Inline Form Components
   ============================================ */

import type { College, InputMode, SearchMode } from './_components/types'

interface CollegeSearchFormProps {
  collegeSearchRef: React.RefObject<HTMLDivElement | null>
  collegeSearchQuery: string
  setCollegeSearchQuery: (value: string) => void
  showCollegeDropdown: boolean
  setShowCollegeDropdown: (value: boolean) => void
  filteredCollegesForSearch: College[]
  handleCollegeSelect: (college: College) => void
  selectedCollege: College | null
  setSelectedCollege: (college: College | null) => void
  getMarksFromRank: (rank: number) => number
}

function CollegeSearchForm({
  collegeSearchRef,
  collegeSearchQuery,
  setCollegeSearchQuery,
  showCollegeDropdown,
  setShowCollegeDropdown,
  filteredCollegesForSearch,
  handleCollegeSelect,
  selectedCollege,
  setSelectedCollege,
  getMarksFromRank,
}: CollegeSearchFormProps) {
  return (
    <div className="space-y-6">
      <div ref={collegeSearchRef} className="relative">
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Search College by Name
        </label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={collegeSearchQuery}
            onChange={(e) => {
              setCollegeSearchQuery(e.target.value)
              setShowCollegeDropdown(true)
              if (!e.target.value.trim()) setSelectedCollege(null)
            }}
            onFocus={() => setShowCollegeDropdown(true)}
            placeholder="Type college name e.g. AIIMS Delhi, KMC Manipal..."
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {showCollegeDropdown && filteredCollegesForSearch.length > 0 && (
          <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
            {filteredCollegesForSearch.map((college) => (
              <button
                key={college.name}
                type="button"
                onClick={() => handleCollegeSelect(college)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50"
              >
                <Building2 className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-900">{college.name}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {college.state}
                    <span
                      className={`rounded px-1.5 py-0.5 ${college.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}
                    >
                      {college.type === 'Government' ? 'Govt' : 'Private'}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCollege && (
        <div className="rounded-xl border border-blue-200 bg-gray-50 p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{selectedCollege.name}</h3>
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedCollege.state}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${selectedCollege.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}
                >
                  {selectedCollege.type}
                </span>
                {selectedCollege.nirfRank && (
                  <span className="flex items-center gap-1 text-yellow-600">
                    <Award className="h-4 w-4" />
                    NIRF #{selectedCollege.nirfRank}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCollege(null)}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded-lg bg-white p-3">
              <div className="text-gray-500">Total Seats</div>
              <div className="text-lg font-bold text-gray-900">{selectedCollege.totalSeats}</div>
            </div>
            <div className="rounded-lg bg-white p-3">
              <div className="text-gray-500">AIQ Seats</div>
              <div className="text-lg font-bold text-blue-600">{selectedCollege.aiqSeats}</div>
            </div>
            <div className="rounded-lg bg-white p-3">
              <div className="text-gray-500">State Seats</div>
              <div className="text-lg font-bold text-green-600">{selectedCollege.stateSeats}</div>
            </div>
            <div className="rounded-lg bg-white p-3">
              <div className="text-gray-500">Annual Fees</div>
              <div className="text-lg font-bold text-gray-900">{selectedCollege.feeDisplay}</div>
            </div>
          </div>

          <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            NEET 2024 Closing Ranks (AIQ)
          </h4>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { key: 'general', label: 'General', color: 'bg-blue-100 text-blue-800' },
              { key: 'ews', label: 'EWS', color: 'bg-amber-100 text-yellow-800' },
              { key: 'obc', label: 'OBC', color: 'bg-green-100 text-green-800' },
              { key: 'sc', label: 'SC', color: 'bg-purple-100 text-purple-800' },
              { key: 'st', label: 'ST', color: 'bg-orange-100 text-orange-800' },
            ].map(({ key, label, color }) => {
              const cutoffRank =
                selectedCollege.aiqCutoffs[key as keyof typeof selectedCollege.aiqCutoffs]
              const estimatedMarks = getMarksFromRank(cutoffRank)
              return (
                <div key={key} className="rounded-lg bg-white p-3 shadow-sm">
                  <div className="mb-1 flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
                      {label}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    Rank {cutoffRank.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">~{estimatedMarks} marks needed</div>
                </div>
              )
            })}
          </div>

          {selectedCollege.stateCutoffs && (
            <>
              <h4 className="mb-3 mt-6 flex items-center gap-2 font-semibold text-gray-900">
                <Home className="h-4 w-4 text-green-600" />
                NEET 2024 Closing Ranks (State Quota - {selectedCollege.state})
              </h4>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { key: 'general', label: 'General', color: 'bg-blue-100 text-blue-800' },
                  { key: 'ews', label: 'EWS', color: 'bg-amber-100 text-yellow-800' },
                  { key: 'obc', label: 'OBC', color: 'bg-green-100 text-green-800' },
                  { key: 'sc', label: 'SC', color: 'bg-purple-100 text-purple-800' },
                  { key: 'st', label: 'ST', color: 'bg-orange-100 text-orange-800' },
                ].map(({ key, label, color }) => {
                  const cutoffRank =
                    selectedCollege.stateCutoffs![key as keyof typeof selectedCollege.stateCutoffs]
                  const estimatedMarks = getMarksFromRank(cutoffRank)
                  return (
                    <div key={key} className="rounded-lg bg-white p-3 shadow-sm">
                      <div className="mb-1 flex items-center justify-between">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
                          {label}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        Rank {cutoffRank.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">~{estimatedMarks} marks needed</div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-100 p-3 text-sm text-blue-800">
            <Info className="h-4 w-4" />
            <span>Cutoffs based on NEET 2024 MCC counselling data. 2025 cutoffs may vary.</span>
          </div>

          <Link
            href={`/neet-college-predictor/college/${generateSlug(selectedCollege.name)}`}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View Full College Details
          </Link>
        </div>
      )}
    </div>
  )
}

interface RankSearchFormProps {
  rank: string
  setRank: (value: string) => void
  marks: string
  setMarks: (value: string) => void
  inputMode: InputMode
  setInputMode: (value: InputMode) => void
  category: string
  setCategory: (value: string) => void
  domicileState: string
  setDomicileState: (value: string) => void
  quotaPreference: QuotaPreference
  setQuotaPreference: (value: QuotaPreference) => void
  isPwD: boolean
  setIsPwD: (value: boolean) => void
  collegeType: string
  setCollegeType: (value: string) => void
  selectedState: string
  setSelectedState: (value: string) => void
  feeRange: string
  setFeeRange: (value: string) => void
  sortBy: SortOption
  setSortBy: (value: SortOption) => void
  allStates: string[]
  isLoading: boolean
  hasSearched: boolean
  showResults: boolean
  handlePredict: () => void
  handleReset: () => void
  getButtonText: () => React.ReactNode
  results: { quotaType: string; college: { type: string } }[]
  uniqueColleges: { college: { name: string } }[]
  aiqCount: number
  stateCount: number
  govtCount: number
  privateCount: number
  shareOnWhatsApp: () => void
  exportToPDF: () => void
}

function RankSearchForm({
  rank,
  setRank,
  marks,
  setMarks,
  inputMode,
  setInputMode,
  category,
  setCategory,
  domicileState,
  setDomicileState,
  quotaPreference,
  setQuotaPreference,
  isPwD,
  setIsPwD,
  collegeType,
  setCollegeType,
  selectedState,
  setSelectedState,
  feeRange,
  setFeeRange,
  sortBy,
  setSortBy,
  allStates,
  isLoading,
  hasSearched,
  showResults,
  handlePredict,
  handleReset,
  getButtonText,
  results,
  uniqueColleges,
  aiqCount,
  stateCount,
  govtCount,
  privateCount,
  shareOnWhatsApp,
  exportToPDF,
}: RankSearchFormProps) {
  return (
    <div className="space-y-6">
      {/* Rank/Marks Toggle */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">Enter your NEET Score *</label>
          <div className="flex rounded-full bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setInputMode('rank')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                inputMode === 'rank' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              By Rank
            </button>
            <button
              type="button"
              onClick={() => setInputMode('marks')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                inputMode === 'marks' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              By Marks
            </button>
          </div>
        </div>

        {inputMode === 'rank' ? (
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            min="1"
            placeholder="Enter your All India Rank (AIR)"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        ) : (
          <div className="space-y-2">
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              min="0"
              max="720"
              placeholder="Enter your marks (out of 720)"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {marks && parseInt(marks) >= 0 && parseInt(marks) <= 720 && (
              <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">
                  Estimated Rank: <strong>{parseInt(rank).toLocaleString()}</strong>
                </span>
                <span className="text-blue-600">(based on NEET 2024)</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Primary Inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
            Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="general">General</option>
            <option value="ews">EWS</option>
            <option value="obc">OBC (NCL)</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>
        </div>

        <div>
          <label htmlFor="domicile" className="mb-2 block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-1">
              Your Domicile State
              <span title="Required for State Quota eligibility">
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </span>
            </span>
          </label>
          <select
            id="domicile"
            value={domicileState}
            onChange={(e) => setDomicileState(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select domicile state</option>
            {allStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quota Selection */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <label className="mb-3 block text-sm font-semibold text-blue-900">Quota Preference</label>
        <div className="flex flex-wrap gap-3">
          {(['all', 'aiq', 'state'] as const).map((q) => (
            <label
              key={q}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                quotaPreference === q
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <input
                type="radio"
                name="quota"
                value={q}
                checked={quotaPreference === q}
                onChange={(e) => setQuotaPreference(e.target.value as QuotaPreference)}
                className="hidden"
              />
              {q === 'state' ? <Home className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
              {q === 'all'
                ? 'All Quotas'
                : q === 'aiq'
                  ? 'All India Quota (15%)'
                  : 'State Quota (85%)'}
            </label>
          ))}
        </div>
        {quotaPreference === 'state' && !domicileState && (
          <p className="mt-2 text-sm text-yellow-700">
            Please select your domicile state above to see State Quota options
          </p>
        )}
      </div>

      {/* PwD Checkbox */}
      <div className="flex items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={isPwD}
            onChange={(e) => setIsPwD(e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <div>
            <span className="flex items-center gap-2 font-medium text-purple-900">
              <Accessibility className="h-5 w-5" />
              PwD Candidate (5% Horizontal Reservation)
            </span>
            <span className="text-sm text-purple-700">
              Check this if you have 40%+ benchmark disability
            </span>
          </div>
        </label>
      </div>

      {/* Additional Filters */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="type" className="mb-2 block text-sm font-medium text-gray-700">
            College Type
          </label>
          <select
            id="type"
            value={collegeType}
            onChange={(e) => setCollegeType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="All">All Types</option>
            <option value="Government">Government (incl. AIIMS, JIPMER)</option>
            <option value="Private/Deemed">Private & Deemed Universities</option>
          </select>
        </div>

        <div>
          <label htmlFor="state" className="mb-2 block text-sm font-medium text-gray-700">
            College Location
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="All">All States</option>
            {allStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="feeRange" className="mb-2 block text-sm font-medium text-gray-700">
            Fee Range (Annual)
          </label>
          <select
            id="feeRange"
            value={feeRange}
            onChange={(e) => setFeeRange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="All">All Fees</option>
            <option value="low">Below ₹1 Lakh (Govt)</option>
            <option value="medium">₹1 - ₹15 Lakhs</option>
            <option value="high">Above ₹15 Lakhs</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="mb-2 block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="cutoff">Cutoff Rank (Low to High)</option>
            <option value="fees">Fees (Low to High)</option>
            <option value="tier">College Tier</option>
            <option value="seats">Seats (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePredict}
          disabled={isLoading}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg font-semibold text-white transition-all disabled:opacity-70 ${
            hasSearched
              ? 'bg-green-600 hover:from-green-700 hover:to-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {getButtonText()}
        </button>
        {showResults && (
          <button
            onClick={handleReset}
            className="rounded-lg border-2 border-gray-300 px-6 py-4 font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Reset
          </button>
        )}
      </div>

      {/* Success Summary */}
      {showResults && results.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gradient-to-r from-green-50 to-green-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-800">
                Found {results.length} admission options in {uniqueColleges.length} colleges!
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-green-600">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" /> {aiqCount} AIQ
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Home className="h-3 w-3" /> {stateCount} State
                </span>
                <span>•</span>
                <span>{govtCount} Govt</span>
                <span>•</span>
                <span>{privateCount} Private</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={shareOnWhatsApp}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
