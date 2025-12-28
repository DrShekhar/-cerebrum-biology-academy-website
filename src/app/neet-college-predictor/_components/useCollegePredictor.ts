'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import type {
  College,
  CollegeResult,
  ToastState,
  SortOption,
  QuotaPreference,
  InputMode,
  SearchMode,
} from './types'
import { marksToRank, getChance, predictCounsellingRound } from './utils'
import { RESULTS_PER_PAGE, MAX_COMPARE, MAX_SEARCH_RESULTS } from './constants'

export function useCollegePredictor() {
  // Core search state
  const [rank, setRank] = useState<string>('')
  const [category, setCategory] = useState<string>('general')
  const [collegeType, setCollegeType] = useState<string>('All')
  const [selectedState, setSelectedState] = useState<string>('All')
  const [feeRange, setFeeRange] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortOption>('cutoff')

  // UI state
  const [showResults, setShowResults] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', count: 0 })

  // Data state
  const [collegesData, setCollegesData] = useState<College[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  // Quota-related states
  const [quotaPreference, setQuotaPreference] = useState<QuotaPreference>('all')
  const [domicileState, setDomicileState] = useState<string>('')
  const [isPwD, setIsPwD] = useState(false)

  // Search by college name feature
  const [searchMode, setSearchMode] = useState<SearchMode>('rank')
  const [collegeSearchQuery, setCollegeSearchQuery] = useState('')
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false)
  const collegeSearchRef = useRef<HTMLDivElement>(null)

  // Input mode: rank or marks
  const [inputMode, setInputMode] = useState<InputMode>('rank')
  const [marks, setMarks] = useState<string>('')

  // Pagination
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE)

  // Saved/Bookmarked colleges
  const [savedColleges, setSavedColleges] = useState<string[]>([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)

  // Comparison
  const [compareList, setCompareList] = useState<CollegeResult[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)

  const resultsRef = useRef<HTMLElement>(null)

  // Auto-convert marks to rank when marks change
  useEffect(() => {
    if (inputMode === 'marks' && marks) {
      const marksNum = parseInt(marks)
      if (!isNaN(marksNum) && marksNum >= 0 && marksNum <= 720) {
        const estimatedRank = marksToRank(marksNum)
        setRank(estimatedRank.toString())
      }
    }
  }, [marks, inputMode])

  // Load saved colleges from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('neet_saved_colleges')
      if (saved) {
        setSavedColleges(JSON.parse(saved))
      }
    }
  }, [])

  // Save to localStorage when savedColleges changes
  useEffect(() => {
    if (typeof window !== 'undefined' && savedColleges.length >= 0) {
      localStorage.setItem('neet_saved_colleges', JSON.stringify(savedColleges))
    }
  }, [savedColleges])

  // Preload states on mount for dropdown
  useEffect(() => {
    const preloadStates = async () => {
      if (!dataLoaded) {
        const data = await import('@/data/colleges.json')
        const colleges = data.default as College[]
        setCollegesData(colleges)
        setDataLoaded(true)
      }
    }
    preloadStates()
  }, [dataLoaded])

  // Click outside handler for college search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (collegeSearchRef.current && !collegeSearchRef.current.contains(event.target as Node)) {
        setShowCollegeDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Computed values
  const allStates = useMemo(
    () => (dataLoaded ? [...new Set(collegesData.map((c) => c.state))].sort() : []),
    [collegesData, dataLoaded]
  )

  const results = useMemo(() => {
    if (!showResults || !rank || !dataLoaded) return []

    const rankNum = parseInt(rank)
    if (isNaN(rankNum) || rankNum < 1) return []

    const resultList: CollegeResult[] = []
    const categoryKey = category as keyof Omit<
      College['aiqCutoffs'],
      'general_pwd' | 'ews_pwd' | 'obc_pwd' | 'sc_pwd' | 'st_pwd'
    >
    const pwdCategoryKey = `${category}_pwd` as keyof College['aiqCutoffs']

    collegesData.forEach((college) => {
      // Apply basic filters
      const typeMatch = collegeType === 'All' || college.type === collegeType
      const stateMatch = selectedState === 'All' || college.state === selectedState

      let feeMatch = true
      if (feeRange === 'low') feeMatch = college.fees <= 100000
      else if (feeRange === 'medium') feeMatch = college.fees > 100000 && college.fees <= 1500000
      else if (feeRange === 'high') feeMatch = college.fees > 1500000

      if (!typeMatch || !stateMatch || !feeMatch) return

      // Get cutoff based on PwD status
      const aiqCutoff = isPwD ? college.aiqCutoffs[pwdCategoryKey] : college.aiqCutoffs[categoryKey]
      const aiqPwdCutoff = college.aiqCutoffs[pwdCategoryKey]

      // Check AIQ eligibility
      if (quotaPreference !== 'state') {
        const inAiqRange = rankNum <= aiqCutoff * 1.15
        if (inAiqRange) {
          resultList.push({
            college,
            quotaType: 'AIQ',
            cutoff: college.aiqCutoffs[categoryKey],
            pwdCutoff: aiqPwdCutoff,
            seats: college.aiqSeats,
          })
        }
      }

      // Check State Quota eligibility
      if (quotaPreference !== 'aiq' && college.quotaType === 'AIQ_State' && college.stateCutoffs) {
        const hasDomicile = domicileState === college.state

        if (hasDomicile || !domicileState) {
          const stateCutoff = isPwD
            ? college.stateCutoffs[pwdCategoryKey]
            : college.stateCutoffs[categoryKey]
          const statePwdCutoff = college.stateCutoffs[pwdCategoryKey]

          const inStateRange = rankNum <= stateCutoff * 1.15
          if (inStateRange) {
            const alreadyAdded = resultList.some(
              (r) => r.college.name === college.name && r.quotaType === 'AIQ'
            )

            if (!alreadyAdded || quotaPreference === 'state') {
              resultList.push({
                college,
                quotaType: 'State',
                cutoff: college.stateCutoffs[categoryKey],
                pwdCutoff: statePwdCutoff,
                seats: college.stateSeats,
              })
            } else if (alreadyAdded) {
              resultList.push({
                college,
                quotaType: 'State',
                cutoff: college.stateCutoffs[categoryKey],
                pwdCutoff: statePwdCutoff,
                seats: college.stateSeats,
              })
            }
          }
        }
      }
    })

    // Sort results
    resultList.sort((a, b) => {
      if (sortBy === 'cutoff') {
        return (isPwD ? a.pwdCutoff : a.cutoff) - (isPwD ? b.pwdCutoff : b.cutoff)
      }
      if (sortBy === 'fees') return a.college.fees - b.college.fees
      if (sortBy === 'tier') return a.college.tier - b.college.tier
      if (sortBy === 'seats') return b.seats - a.seats
      return 0
    })

    return resultList
  }, [
    showResults,
    rank,
    category,
    collegeType,
    selectedState,
    feeRange,
    sortBy,
    collegesData,
    dataLoaded,
    quotaPreference,
    domicileState,
    isPwD,
  ])

  const uniqueColleges = useMemo(() => {
    const seen = new Set<string>()
    return results.filter((r) => {
      if (seen.has(r.college.name)) return false
      seen.add(r.college.name)
      return true
    })
  }, [results])

  const filteredCollegesForSearch = useMemo(() => {
    if (!collegeSearchQuery.trim() || !dataLoaded) return []
    const query = collegeSearchQuery.toLowerCase().trim()
    return collegesData
      .filter((college) => {
        const nameMatch = college.name.toLowerCase().includes(query)
        const stateMatch = college.state.toLowerCase().includes(query)
        return nameMatch || stateMatch
      })
      .slice(0, MAX_SEARCH_RESULTS)
  }, [collegeSearchQuery, collegesData, dataLoaded])

  const visibleResults = useMemo(() => {
    let filtered = results
    if (showSavedOnly) {
      filtered = results.filter((r) => savedColleges.includes(r.college.name))
    }
    return filtered.slice(0, visibleCount)
  }, [results, visibleCount, showSavedOnly, savedColleges])

  // Counts
  const aiqCount = results.filter((r) => r.quotaType === 'AIQ').length
  const stateCount = results.filter((r) => r.quotaType === 'State').length
  const govtCount = uniqueColleges.filter((r) => r.college.type === 'Government').length
  const privateCount = uniqueColleges.filter((r) => r.college.type === 'Private/Deemed').length

  // Callbacks
  const toggleSaveCollege = useCallback((collegeName: string) => {
    setSavedColleges((prev) => {
      if (prev.includes(collegeName)) {
        return prev.filter((c) => c !== collegeName)
      }
      return [...prev, collegeName]
    })
  }, [])

  const isCollegeSaved = useCallback(
    (collegeName: string) => savedColleges.includes(collegeName),
    [savedColleges]
  )

  const toggleCompare = useCallback((result: CollegeResult) => {
    setCompareList((prev) => {
      const exists = prev.some(
        (r) => r.college.name === result.college.name && r.quotaType === result.quotaType
      )
      if (exists) {
        return prev.filter(
          (r) => !(r.college.name === result.college.name && r.quotaType === result.quotaType)
        )
      }
      if (prev.length >= MAX_COMPARE) {
        return prev
      }
      return [...prev, result]
    })
  }, [])

  const isInCompareList = useCallback(
    (result: CollegeResult) =>
      compareList.some(
        (r) => r.college.name === result.college.name && r.quotaType === result.quotaType
      ),
    [compareList]
  )

  const handleCollegeSelect = useCallback((college: College) => {
    setSelectedCollege(college)
    setCollegeSearchQuery(college.name)
    setShowCollegeDropdown(false)
  }, [])

  const loadCollegeData = useCallback(async (): Promise<College[]> => {
    if (dataLoaded) return collegesData
    const data = await import('@/data/colleges.json')
    const colleges = data.default as College[]
    setCollegesData(colleges)
    setDataLoaded(true)
    return colleges
  }, [dataLoaded, collegesData])

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  const showToastMessage = useCallback((count: number) => {
    setToast({
      show: true,
      message:
        count > 0 ? `Found ${count} admission options for you!` : 'No colleges found for your rank',
      count,
    })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 4000)
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }))
  }, [])

  const handlePredict = useCallback(async () => {
    const rankNum = parseInt(rank)
    if (isNaN(rankNum) || rankNum < 1) {
      alert('Please enter a valid rank')
      return
    }

    setIsLoading(true)
    setVisibleCount(RESULTS_PER_PAGE)
    try {
      await loadCollegeData()
      setShowResults(true)
      setHasSearched(true)
    } finally {
      setIsLoading(false)
    }
  }, [rank, loadCollegeData])

  const handleReset = useCallback(() => {
    setRank('')
    setMarks('')
    setInputMode('rank')
    setCategory('general')
    setCollegeType('All')
    setSelectedState('All')
    setFeeRange('All')
    setSortBy('cutoff')
    setShowResults(false)
    setExpandedCard(null)
    setHasSearched(false)
    setToast({ show: false, message: '', count: 0 })
    setQuotaPreference('all')
    setDomicileState('')
    setIsPwD(false)
    setVisibleCount(RESULTS_PER_PAGE)
  }, [])

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + RESULTS_PER_PAGE)
  }, [])

  // Share via WhatsApp
  const shareOnWhatsApp = useCallback(() => {
    const topColleges = results.slice(0, 5)
    const message = `🏥 *NEET College Predictor Results*

📊 My Rank: ${parseInt(rank).toLocaleString()}
📋 Category: ${category.toUpperCase()}${isPwD ? ' (PwD)' : ''}
🎯 Found ${results.length} colleges!

*Top Matches:*
${topColleges.map((r, i) => `${i + 1}. ${r.college.name} (${r.quotaType}) - Cutoff: ${(isPwD ? r.pwdCutoff : r.cutoff).toLocaleString()}`).join('\n')}

✨ Check yours free at:
https://cerebrumbiologyacademy.com/neet-college-predictor

_Powered by Cerebrum Biology Academy_`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }, [results, rank, category, isPwD])

  // Export to PDF
  const exportToPDF = useCallback(() => {
    const topResults = results.slice(0, 50)
    const rankNum = parseInt(rank)
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>NEET College Predictor Results - Rank ${rank}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #2563eb; text-align: center; margin-bottom: 5px; }
          h2 { color: #666; text-align: center; font-size: 14px; margin-top: 0; }
          .info { margin: 20px 0; }
          .info p { margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
          th { background: #2563eb; color: white; padding: 8px; text-align: left; }
          td { padding: 6px 8px; border-bottom: 1px solid #ddd; }
          tr:nth-child(even) { background: #f9f9f9; }
          .footer { margin-top: 20px; text-align: center; font-size: 10px; color: #666; }
          .chance-high { background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; }
          .chance-medium { background: #fef9c3; color: #854d0e; padding: 2px 6px; border-radius: 4px; }
          .chance-low { background: #fed7aa; color: #9a3412; padding: 2px 6px; border-radius: 4px; }
          .chance-verylow { background: #fecaca; color: #991b1b; padding: 2px 6px; border-radius: 4px; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <h1>NEET College Predictor Results</h1>
        <h2>Cerebrum Biology Academy</h2>
        <div class="info">
          <p><strong>Rank:</strong> ${rankNum.toLocaleString()} | <strong>Category:</strong> ${category.toUpperCase()}${isPwD ? ' (PwD)' : ''}</p>
          <p><strong>Quota:</strong> ${quotaPreference === 'all' ? 'All Quotas' : quotaPreference === 'aiq' ? 'AIQ Only' : 'State Only'}${domicileState ? ` | <strong>Domicile:</strong> ${domicileState}` : ''}</p>
          <p><strong>Total Matches:</strong> ${results.length} options in ${uniqueColleges.length} colleges</p>
          <p style="text-align: right; color: #666; font-size: 11px;">Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>College Name</th>
              <th>State</th>
              <th>Quota</th>
              <th>Type</th>
              <th>Cutoff</th>
              <th>Chance</th>
              <th>Est. Round</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            ${topResults
              .map((r, i) => {
                const displayCutoff = isPwD ? r.pwdCutoff : r.cutoff
                const chance = getChance(rankNum, displayCutoff)
                const prediction = predictCounsellingRound(rankNum, displayCutoff)
                const chanceClass =
                  chance.level === 'High'
                    ? 'chance-high'
                    : chance.level === 'Medium'
                      ? 'chance-medium'
                      : chance.level === 'Low'
                        ? 'chance-low'
                        : 'chance-verylow'
                return `<tr>
                <td>${i + 1}</td>
                <td>${r.college.name}</td>
                <td>${r.college.state}</td>
                <td>${r.quotaType}</td>
                <td>${r.college.type === 'Government' ? 'Govt' : 'Pvt'}</td>
                <td>${displayCutoff.toLocaleString()}</td>
                <td><span class="${chanceClass}">${chance.level}</span></td>
                <td>${prediction.round}</td>
                <td>${r.college.feeDisplay}</td>
              </tr>`
              })
              .join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Disclaimer: Predictions based on NEET 2024 data. Actual cutoffs may vary.</p>
          <p>cerebrumbiologyacademy.com</p>
        </div>
      </body>
      </html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 250)
    }
  }, [results, rank, category, isPwD, quotaPreference, domicileState, uniqueColleges.length])

  // Show toast on results
  useEffect(() => {
    if (showResults && dataLoaded && hasSearched) {
      const count = results.length
      showToastMessage(count)
      scrollToResults()
    }
  }, [showResults, dataLoaded, hasSearched, results.length, showToastMessage, scrollToResults])

  return {
    // State
    rank,
    category,
    collegeType,
    selectedState,
    feeRange,
    sortBy,
    showResults,
    expandedCard,
    isLoading,
    hasSearched,
    toast,
    collegesData,
    dataLoaded,
    quotaPreference,
    domicileState,
    isPwD,
    searchMode,
    collegeSearchQuery,
    selectedCollege,
    showCollegeDropdown,
    inputMode,
    marks,
    visibleCount,
    savedColleges,
    showSavedOnly,
    compareList,
    showCompareModal,

    // Refs
    collegeSearchRef,
    resultsRef,

    // Computed
    allStates,
    results,
    uniqueColleges,
    filteredCollegesForSearch,
    visibleResults,
    aiqCount,
    stateCount,
    govtCount,
    privateCount,

    // Setters
    setRank,
    setCategory,
    setCollegeType,
    setSelectedState,
    setFeeRange,
    setSortBy,
    setShowResults,
    setExpandedCard,
    setQuotaPreference,
    setDomicileState,
    setIsPwD,
    setSearchMode,
    setCollegeSearchQuery,
    setSelectedCollege,
    setShowCollegeDropdown,
    setInputMode,
    setMarks,
    setShowSavedOnly,
    setShowCompareModal,
    setCompareList,

    // Callbacks
    toggleSaveCollege,
    isCollegeSaved,
    toggleCompare,
    isInCompareList,
    handleCollegeSelect,
    handlePredict,
    handleReset,
    loadMore,
    hideToast,
    shareOnWhatsApp,
    exportToPDF,
  }
}
