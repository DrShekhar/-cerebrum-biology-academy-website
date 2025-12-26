'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Building2,
  MapPin,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Info,
  BookOpen,
  Search,
  TrendingUp,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Star,
  Loader2,
  PartyPopper,
  X,
  ArrowDown,
  Globe,
  Home,
  Accessibility,
  HelpCircle,
  Share2,
  Heart,
  Download,
  Scale,
  Calendar,
} from 'lucide-react'

interface College {
  name: string
  state: string
  type: 'Government' | 'Private/Deemed'
  quotaType: 'AIQ_Only' | 'AIQ_State' | 'Deemed'
  tier: 1 | 2 | 3
  totalSeats: number
  aiqSeats: number
  stateSeats: number
  nirfRank: number | null
  aiqCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
    general_pwd: number
    ews_pwd: number
    obc_pwd: number
    sc_pwd: number
    st_pwd: number
  }
  stateCutoffs: {
    general: number
    ews: number
    obc: number
    sc: number
    st: number
    general_pwd: number
    ews_pwd: number
    obc_pwd: number
    sc_pwd: number
    st_pwd: number
  } | null
  fees: number
  feeDisplay: string
}

type SortOption = 'cutoff' | 'fees' | 'tier' | 'seats'
type QuotaPreference = 'all' | 'aiq' | 'state'

interface ToastState {
  show: boolean
  message: string
  count: number
}

interface CollegeResult {
  college: College
  quotaType: 'AIQ' | 'State'
  cutoff: number
  pwdCutoff: number
  seats: number
}

export default function NEETCollegePredictorPage() {
  const [rank, setRank] = useState<string>('')
  const [category, setCategory] = useState<string>('general')
  const [collegeType, setCollegeType] = useState<string>('All')
  const [selectedState, setSelectedState] = useState<string>('All')
  const [feeRange, setFeeRange] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortOption>('cutoff')
  const [showResults, setShowResults] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [collegesData, setCollegesData] = useState<College[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', count: 0 })

  // New quota-related states
  const [quotaPreference, setQuotaPreference] = useState<QuotaPreference>('all')
  const [domicileState, setDomicileState] = useState<string>('')
  const [isPwD, setIsPwD] = useState(false)

  // Search by college name feature
  const [searchMode, setSearchMode] = useState<'rank' | 'college'>('rank')
  const [collegeSearchQuery, setCollegeSearchQuery] = useState('')
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false)
  const collegeSearchRef = useRef<HTMLDivElement>(null)

  // Input mode: rank or marks
  const [inputMode, setInputMode] = useState<'rank' | 'marks'>('rank')
  const [marks, setMarks] = useState<string>('')

  // Marks to Rank conversion formula (based on NEET 2024 data)
  const marksToRank = (score: number): number => {
    if (score >= 720) return 1
    if (score >= 715) return Math.round(1 + (720 - score) * 2)
    if (score >= 700) return Math.round(10 + (715 - score) * 6)
    if (score >= 680) return Math.round(100 + (700 - score) * 50)
    if (score >= 650) return Math.round(1100 + (680 - score) * 130)
    if (score >= 600) return Math.round(5000 + (650 - score) * 400)
    if (score >= 550) return Math.round(25000 + (600 - score) * 900)
    if (score >= 500) return Math.round(70000 + (550 - score) * 1600)
    if (score >= 450) return Math.round(150000 + (500 - score) * 3000)
    if (score >= 400) return Math.round(300000 + (450 - score) * 4000)
    if (score >= 350) return Math.round(500000 + (400 - score) * 5000)
    return Math.round(750000 + (350 - score) * 6000)
  }

  // Generate URL-friendly slug from college name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

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

  // Pagination for performance
  const [visibleCount, setVisibleCount] = useState(12)
  const RESULTS_PER_PAGE = 12

  // Phase 1: Saved/Bookmarked colleges (localStorage)
  const [savedColleges, setSavedColleges] = useState<string[]>([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)

  // Phase 2: College comparison
  const [compareList, setCompareList] = useState<CollegeResult[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)
  const MAX_COMPARE = 3

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

  const resultsRef = useRef<HTMLElement>(null)

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

  const allStates = useMemo(
    () => (dataLoaded ? [...new Set(collegesData.map((c) => c.state))].sort() : []),
    [collegesData, dataLoaded]
  )

  const getChance = (
    userRank: number,
    cutoff: number
  ): { level: 'High' | 'Medium' | 'Low' | 'Very Low'; color: string } => {
    const ratio = userRank / cutoff
    if (ratio <= 0.7) return { level: 'High', color: 'bg-green-100 text-green-800' }
    if (ratio <= 0.9) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
    if (ratio <= 1.0) return { level: 'Low', color: 'bg-orange-100 text-orange-800' }
    return { level: 'Very Low', color: 'bg-red-100 text-red-800' }
  }

  // Phase 1: Toggle bookmark
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

  // Phase 2: Toggle compare
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

  // Phase 3: Counselling Round Predictor
  const predictCounsellingRound = useCallback(
    (cutoff: number): { round: string; confidence: string; color: string } => {
      const rankNum = parseInt(rank)
      if (isNaN(rankNum)) return { round: '-', confidence: '', color: '' }

      const ratio = rankNum / cutoff
      if (ratio <= 0.5)
        return { round: 'Round 1', confidence: 'Very High', color: 'bg-green-100 text-green-800' }
      if (ratio <= 0.7)
        return { round: 'Round 1-2', confidence: 'High', color: 'bg-green-100 text-green-800' }
      if (ratio <= 0.85)
        return { round: 'Round 2', confidence: 'Good', color: 'bg-blue-100 text-blue-800' }
      if (ratio <= 0.95)
        return { round: 'Round 2-3', confidence: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
      if (ratio <= 1.05)
        return { round: 'Round 3', confidence: 'Possible', color: 'bg-orange-100 text-orange-800' }
      if (ratio <= 1.15)
        return { round: 'Mop-up', confidence: 'Low', color: 'bg-red-100 text-red-800' }
      return { round: 'Unlikely', confidence: 'Very Low', color: 'bg-gray-100 text-gray-600' }
    },
    [rank]
  )

  const loadCollegeData = useCallback(async (): Promise<College[]> => {
    if (dataLoaded) return collegesData
    const data = await import('@/data/colleges.json')
    const colleges = data.default as College[]
    setCollegesData(colleges)
    setDataLoaded(true)
    return colleges
  }, [dataLoaded, collegesData])

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

      // Check State Quota eligibility (only if college has state quota and user has domicile)
      if (quotaPreference !== 'aiq' && college.quotaType === 'AIQ_State' && college.stateCutoffs) {
        // For state quota, user must have domicile in that state
        const hasDomicile = domicileState === college.state

        if (hasDomicile || !domicileState) {
          const stateCutoff = isPwD
            ? college.stateCutoffs[pwdCategoryKey]
            : college.stateCutoffs[categoryKey]
          const statePwdCutoff = college.stateCutoffs[pwdCategoryKey]

          const inStateRange = rankNum <= stateCutoff * 1.15
          if (inStateRange) {
            // Don't add duplicate if already added via AIQ (same college)
            const alreadyAdded = resultList.some(
              (r) => r.college.name === college.name && r.quotaType === 'AIQ'
            )

            // Only add state quota result if it gives better chance or AIQ not added
            if (!alreadyAdded || quotaPreference === 'state') {
              resultList.push({
                college,
                quotaType: 'State',
                cutoff: college.stateCutoffs[categoryKey],
                pwdCutoff: statePwdCutoff,
                seats: college.stateSeats,
              })
            } else if (alreadyAdded) {
              // Add state quota as additional option
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

  // Filtered colleges for search by college name
  const filteredCollegesForSearch = useMemo(() => {
    if (!collegeSearchQuery.trim() || !dataLoaded) return []
    const query = collegeSearchQuery.toLowerCase().trim()
    return collegesData
      .filter((college) => {
        const nameMatch = college.name.toLowerCase().includes(query)
        const stateMatch = college.state.toLowerCase().includes(query)
        return nameMatch || stateMatch
      })
      .slice(0, 10) // Limit to 10 results for performance
  }, [collegeSearchQuery, collegesData, dataLoaded])

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

  // Handle college selection
  const handleCollegeSelect = useCallback((college: College) => {
    setSelectedCollege(college)
    setCollegeSearchQuery(college.name)
    setShowCollegeDropdown(false)
  }, [])

  // Get cutoff rank needed for selected college
  const getMarksFromRank = (rankNum: number): number => {
    if (rankNum <= 1) return 720
    if (rankNum <= 10) return 720 - Math.round((rankNum - 1) / 2)
    if (rankNum <= 100) return 715 - Math.round((rankNum - 10) / 6)
    if (rankNum <= 1100) return 700 - Math.round((rankNum - 100) / 50)
    if (rankNum <= 5000) return 680 - Math.round((rankNum - 1100) / 130)
    if (rankNum <= 25000) return 650 - Math.round((rankNum - 5000) / 400)
    if (rankNum <= 70000) return 600 - Math.round((rankNum - 25000) / 900)
    if (rankNum <= 150000) return 550 - Math.round((rankNum - 70000) / 1600)
    if (rankNum <= 300000) return 500 - Math.round((rankNum - 150000) / 3000)
    if (rankNum <= 500000) return 450 - Math.round((rankNum - 300000) / 4000)
    if (rankNum <= 750000) return 400 - Math.round((rankNum - 500000) / 5000)
    return Math.max(0, 350 - Math.round((rankNum - 750000) / 6000))
  }

  const aiqCount = results.filter((r) => r.quotaType === 'AIQ').length
  const stateCount = results.filter((r) => r.quotaType === 'State').length
  const govtCount = uniqueColleges.filter((r) => r.college.type === 'Government').length
  const privateCount = uniqueColleges.filter((r) => r.college.type === 'Private/Deemed').length

  // Phase 1: Share via WhatsApp (FREE - uses wa.me link)
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

  // Phase 2: Export to PDF (uses browser print dialog - "Save as PDF")
  const exportToPDF = useCallback(() => {
    // Create a printable HTML content
    const topResults = results.slice(0, 50)
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
          <p><strong>Rank:</strong> ${parseInt(rank).toLocaleString()} | <strong>Category:</strong> ${category.toUpperCase()}${isPwD ? ' (PwD)' : ''}</p>
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
                const chance = getChance(parseInt(rank), displayCutoff)
                const prediction = predictCounsellingRound(displayCutoff)
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

    // Open print window
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
      }, 250)
    }
  }, [
    results,
    rank,
    category,
    isPwD,
    quotaPreference,
    domicileState,
    uniqueColleges.length,
    getChance,
    predictCounsellingRound,
  ])

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  const showToast = useCallback((count: number) => {
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

  const handlePredict = async () => {
    const rankNum = parseInt(rank)
    if (isNaN(rankNum) || rankNum < 1) {
      alert('Please enter a valid rank')
      return
    }

    setIsLoading(true)
    setVisibleCount(RESULTS_PER_PAGE) // Reset pagination for new search
    try {
      await loadCollegeData()
      setShowResults(true)
      setHasSearched(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (showResults && dataLoaded && hasSearched) {
      const count = results.length
      showToast(count)
      scrollToResults()
    }
  }, [showResults, dataLoaded, hasSearched, results.length, showToast, scrollToResults])

  const handleReset = () => {
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
  }

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + RESULTS_PER_PAGE)
  }, [])

  const visibleResults = useMemo(() => {
    let filtered = results
    if (showSavedOnly) {
      filtered = results.filter((r) => savedColleges.includes(r.college.name))
    }
    return filtered.slice(0, visibleCount)
  }, [results, visibleCount, showSavedOnly, savedColleges])

  const getButtonText = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Searching Colleges...
        </>
      )
    }
    if (hasSearched) {
      return (
        <>
          <Search className="h-5 w-5" />
          Search Again
        </>
      )
    }
    return (
      <>
        <Search className="h-5 w-5" />
        Find Colleges
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
            url: 'https://www.cerebrumbiologyacademy.com/neet-college-predictor',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      {/* Success Toast */}
      <div
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transform transition-all duration-500 ${
          toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        <div
          className={`flex items-center gap-3 rounded-full px-6 py-3 shadow-lg ${
            toast.count > 0
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
              : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
          }`}
        >
          {toast.count > 0 ? <PartyPopper className="h-5 w-5" /> : <Info className="h-5 w-5" />}
          <span className="font-semibold">{toast.message}</span>
          {toast.count > 0 && (
            <span className="flex items-center gap-1 text-sm opacity-90">
              <ArrowDown className="h-4 w-4 animate-bounce" />
              Scroll down
            </span>
          )}
          <button
            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
            className="ml-2 rounded-full p-1 hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 pt-16 pb-24 text-white md:pt-24 md:pb-32">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/neet-tools" className="hover:underline">
                NEET Tools
              </Link>
              <span className="mx-2">/</span>
              <span>College Predictor</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET College Predictor 2026</h1>
            <p className="mb-6 max-w-2xl text-lg text-blue-100 md:text-xl">
              India&apos;s most comprehensive NEET college predictor with 470+ medical colleges. Now
              with <strong>All India Quota & State Quota</strong> cutoffs and{' '}
              <strong>PwD reservation</strong> support.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Building2 className="h-5 w-5" />
                <span className="font-semibold">470+ Colleges</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Globe className="h-5 w-5" />
                <span className="font-semibold">AIQ + State Quota</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Accessibility className="h-5 w-5" />
                <span className="font-semibold">PwD Cutoffs</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">2024 Data</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="-mt-16 relative z-10 px-4 sm:px-6 lg:px-8 md:-mt-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
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
                  /* College Search Mode */
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

                      {/* Dropdown */}
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
                                <div className="truncate font-medium text-gray-900">
                                  {college.name}
                                </div>
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

                    {/* Selected College Details */}
                    {selectedCollege && (
                      <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {selectedCollege.name}
                            </h3>
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
                                <span className="flex items-center gap-1 text-amber-600">
                                  <Award className="h-4 w-4" />
                                  NIRF #{selectedCollege.nirfRank}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCollege(null)
                              setCollegeSearchQuery('')
                            }}
                            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                          <div className="rounded-lg bg-white p-3">
                            <div className="text-gray-500">Total Seats</div>
                            <div className="text-lg font-bold text-gray-900">
                              {selectedCollege.totalSeats}
                            </div>
                          </div>
                          <div className="rounded-lg bg-white p-3">
                            <div className="text-gray-500">AIQ Seats</div>
                            <div className="text-lg font-bold text-blue-600">
                              {selectedCollege.aiqSeats}
                            </div>
                          </div>
                          <div className="rounded-lg bg-white p-3">
                            <div className="text-gray-500">State Seats</div>
                            <div className="text-lg font-bold text-green-600">
                              {selectedCollege.stateSeats}
                            </div>
                          </div>
                          <div className="rounded-lg bg-white p-3">
                            <div className="text-gray-500">Annual Fees</div>
                            <div className="text-lg font-bold text-gray-900">
                              {selectedCollege.feeDisplay}
                            </div>
                          </div>
                        </div>

                        <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          NEET 2024 Closing Ranks (AIQ)
                        </h4>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {[
                            {
                              key: 'general',
                              label: 'General',
                              color: 'bg-blue-100 text-blue-800',
                            },
                            { key: 'ews', label: 'EWS', color: 'bg-amber-100 text-amber-800' },
                            { key: 'obc', label: 'OBC', color: 'bg-green-100 text-green-800' },
                            { key: 'sc', label: 'SC', color: 'bg-purple-100 text-purple-800' },
                            { key: 'st', label: 'ST', color: 'bg-orange-100 text-orange-800' },
                          ].map(({ key, label, color }) => {
                            const cutoffRank =
                              selectedCollege.aiqCutoffs[
                                key as keyof typeof selectedCollege.aiqCutoffs
                              ]
                            const estimatedMarks = getMarksFromRank(cutoffRank)
                            return (
                              <div key={key} className="rounded-lg bg-white p-3 shadow-sm">
                                <div className="mb-1 flex items-center justify-between">
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
                                  >
                                    {label}
                                  </span>
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  Rank {cutoffRank.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ~{estimatedMarks} marks needed
                                </div>
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
                                {
                                  key: 'general',
                                  label: 'General',
                                  color: 'bg-blue-100 text-blue-800',
                                },
                                { key: 'ews', label: 'EWS', color: 'bg-amber-100 text-amber-800' },
                                { key: 'obc', label: 'OBC', color: 'bg-green-100 text-green-800' },
                                { key: 'sc', label: 'SC', color: 'bg-purple-100 text-purple-800' },
                                { key: 'st', label: 'ST', color: 'bg-orange-100 text-orange-800' },
                              ].map(({ key, label, color }) => {
                                const cutoffRank =
                                  selectedCollege.stateCutoffs![
                                    key as keyof typeof selectedCollege.stateCutoffs
                                  ]
                                const estimatedMarks = getMarksFromRank(cutoffRank)
                                return (
                                  <div key={key} className="rounded-lg bg-white p-3 shadow-sm">
                                    <div className="mb-1 flex items-center justify-between">
                                      <span
                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
                                      >
                                        {label}
                                      </span>
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">
                                      Rank {cutoffRank.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      ~{estimatedMarks} marks needed
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </>
                        )}

                        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-100 p-3 text-sm text-blue-800">
                          <Info className="h-4 w-4" />
                          <span>
                            Cutoffs based on NEET 2024 MCC counselling data. 2025 cutoffs may vary.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Rank/Marks Toggle */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-700">
                          Enter your NEET Score *
                        </label>
                        <div className="flex rounded-full bg-white p-1 shadow-sm">
                          <button
                            type="button"
                            onClick={() => setInputMode('rank')}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                              inputMode === 'rank'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            By Rank
                          </button>
                          <button
                            type="button"
                            onClick={() => setInputMode('marks')}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                              inputMode === 'marks'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            By Marks
                          </button>
                        </div>
                      </div>

                      {inputMode === 'rank' ? (
                        <div>
                          <input
                            type="number"
                            id="rank"
                            value={rank}
                            onChange={(e) => setRank(e.target.value)}
                            min="1"
                            placeholder="Enter your All India Rank (AIR)"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="number"
                            id="marks"
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
                        <label
                          htmlFor="category"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
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
                        <label
                          htmlFor="domicile"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
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
                      <label className="mb-3 block text-sm font-semibold text-blue-900">
                        Quota Preference
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <label
                          className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            quotaPreference === 'all'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quota"
                            value="all"
                            checked={quotaPreference === 'all'}
                            onChange={(e) => setQuotaPreference(e.target.value as QuotaPreference)}
                            className="hidden"
                          />
                          <Globe className="h-4 w-4" />
                          All Quotas
                        </label>
                        <label
                          className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            quotaPreference === 'aiq'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quota"
                            value="aiq"
                            checked={quotaPreference === 'aiq'}
                            onChange={(e) => setQuotaPreference(e.target.value as QuotaPreference)}
                            className="hidden"
                          />
                          <Globe className="h-4 w-4" />
                          All India Quota (15%)
                        </label>
                        <label
                          className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            quotaPreference === 'state'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quota"
                            value="state"
                            checked={quotaPreference === 'state'}
                            onChange={(e) => setQuotaPreference(e.target.value as QuotaPreference)}
                            className="hidden"
                          />
                          <Home className="h-4 w-4" />
                          State Quota (85%)
                        </label>
                      </div>
                      {quotaPreference === 'state' && !domicileState && (
                        <p className="mt-2 text-sm text-amber-700">
                          ⚠️ Please select your domicile state above to see State Quota options
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
                        <label
                          htmlFor="type"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
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
                        <label
                          htmlFor="state"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
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
                        <label
                          htmlFor="feeRange"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
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
                        <label
                          htmlFor="sortBy"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
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
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
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
                              Found {results.length} admission options in {uniqueColleges.length}{' '}
                              colleges!
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
                        <button
                          onClick={scrollToResults}
                          className="flex items-center gap-1 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                        >
                          View Results
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {showResults && results.length === 0 && (
                      <div className="flex items-center gap-3 rounded-lg bg-yellow-50 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                          <Info className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-800">
                            No matching colleges found
                          </p>
                          <p className="text-sm text-yellow-600">
                            Try adjusting your rank, quota preference, or other filters
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-4">
                      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <div className="text-sm text-blue-800">
                        <p className="mb-1">
                          <strong>AIQ (15%):</strong> All India Quota seats open to all states.{' '}
                          <strong>State Quota (85%):</strong> Reserved for state domicile holders
                          (cutoffs are generally more relaxed).
                        </p>
                        <p>Data based on NEET 2024 MCC counselling. Actual cutoffs may vary.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && (
          <section ref={resultsRef} className="scroll-mt-4 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      {results.length > 0
                        ? `Found ${results.length} Options in ${uniqueColleges.length} Colleges for Rank ${rank}`
                        : 'No Colleges Found'}
                    </h2>
                    {results.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
                          <Globe className="h-4 w-4" /> {aiqCount} AIQ Options
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-800">
                          <Home className="h-4 w-4" /> {stateCount} State Quota
                        </span>
                        <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-800">
                          {govtCount} Government
                        </span>
                        <span className="rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-800">
                          {privateCount} Private/Deemed
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {results.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Show Saved Only Toggle */}
                      {savedColleges.length > 0 && (
                        <button
                          onClick={() => setShowSavedOnly(!showSavedOnly)}
                          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            showSavedOnly
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${showSavedOnly ? 'fill-red-500' : ''}`} />
                          Saved ({savedColleges.length})
                        </button>
                      )}

                      {/* Compare Button */}
                      {compareList.length > 0 && (
                        <button
                          onClick={() => setShowCompareModal(true)}
                          className="flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-200"
                        >
                          <Scale className="h-4 w-4" />
                          Compare ({compareList.length})
                        </button>
                      )}

                      {/* Share on WhatsApp */}
                      <button
                        onClick={shareOnWhatsApp}
                        className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 transition-all hover:bg-green-200"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>

                      {/* Export to PDF */}
                      <button
                        onClick={exportToPDF}
                        className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-200"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {results.length === 0 ? (
                <div className="rounded-xl bg-yellow-50 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                    <Info className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">No Matches Found</h3>
                  <p className="text-gray-600">
                    Try adjusting your rank, quota preference, or filters to see more results.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visibleResults.map((result, index) => {
                      const { college, quotaType, cutoff, pwdCutoff, seats } = result
                      const displayCutoff = isPwD ? pwdCutoff : cutoff
                      const chance = getChance(parseInt(rank), displayCutoff)
                      const isExpanded = expandedCard === `${college.name}-${quotaType}`

                      return (
                        <div
                          key={`${college.name}-${quotaType}-${index}`}
                          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="p-6">
                            <div className="mb-4 flex items-start justify-between">
                              <div className="flex-1">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  {/* Quota Badge */}
                                  <span
                                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                      quotaType === 'AIQ'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-orange-100 text-orange-800'
                                    }`}
                                  >
                                    {quotaType === 'AIQ' ? (
                                      <Globe className="h-3 w-3" />
                                    ) : (
                                      <Home className="h-3 w-3" />
                                    )}
                                    {quotaType === 'AIQ' ? 'All India' : 'State Quota'}
                                  </span>
                                  <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                      college.type === 'Government'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-purple-100 text-purple-800'
                                    }`}
                                  >
                                    {college.type}
                                  </span>
                                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                    Tier {college.tier}
                                  </span>
                                  {college.nirfRank && (
                                    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                                      <Star className="h-3 w-3" />
                                      NIRF #{college.nirfRank}
                                    </span>
                                  )}
                                </div>
                                <Link
                                  href={`/neet-college-predictor/college/${generateSlug(college.name)}`}
                                  className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                  {college.name}
                                </Link>
                                <div className="mt-1 flex items-center gap-1 text-gray-600">
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-sm">{college.state}</span>
                                </div>
                              </div>

                              {/* Action Icons - Bookmark & Compare */}
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => toggleSaveCollege(college.name)}
                                  className={`rounded-full p-2 transition-all ${
                                    isCollegeSaved(college.name)
                                      ? 'bg-red-100 text-red-600'
                                      : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                                  }`}
                                  title={
                                    isCollegeSaved(college.name)
                                      ? 'Remove from saved'
                                      : 'Save college'
                                  }
                                >
                                  <Heart
                                    className={`h-4 w-4 ${isCollegeSaved(college.name) ? 'fill-red-500' : ''}`}
                                  />
                                </button>
                                <button
                                  onClick={() => toggleCompare(result)}
                                  disabled={
                                    !isInCompareList(result) && compareList.length >= MAX_COMPARE
                                  }
                                  className={`rounded-full p-2 transition-all ${
                                    isInCompareList(result)
                                      ? 'bg-indigo-100 text-indigo-600'
                                      : compareList.length >= MAX_COMPARE
                                        ? 'cursor-not-allowed bg-gray-50 text-gray-300'
                                        : 'bg-gray-100 text-gray-400 hover:bg-indigo-50 hover:text-indigo-500'
                                  }`}
                                  title={
                                    isInCompareList(result)
                                      ? 'Remove from compare'
                                      : compareList.length >= MAX_COMPARE
                                        ? 'Max 3 colleges'
                                        : 'Add to compare'
                                  }
                                >
                                  <Scale className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <div className="mb-4 grid grid-cols-3 gap-2">
                              <div className="rounded-lg bg-gray-50 p-3">
                                <div className="text-xs text-gray-500">
                                  Cutoff ({category.toUpperCase()}
                                  {isPwD ? '-PwD' : ''})
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                  {displayCutoff.toLocaleString()}
                                </div>
                              </div>
                              <div className="rounded-lg bg-gray-50 p-3">
                                <div className="text-xs text-gray-500">Your Chance</div>
                                <div
                                  className={`inline-block rounded-full px-2 py-1 text-sm font-semibold ${chance.color}`}
                                >
                                  {chance.level}
                                </div>
                              </div>
                              <div className="rounded-lg bg-gray-50 p-3">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Calendar className="h-3 w-3" />
                                  Est. Round
                                </div>
                                {(() => {
                                  const prediction = predictCounsellingRound(displayCutoff)
                                  return (
                                    <div
                                      className={`inline-block rounded-full px-2 py-1 text-sm font-semibold ${prediction.color}`}
                                      title={`Confidence: ${prediction.confidence}`}
                                    >
                                      {prediction.round}
                                    </div>
                                  )
                                })()}
                              </div>
                            </div>

                            <div className="mb-4 flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1 text-gray-600">
                                <Users className="h-4 w-4" />
                                <span>
                                  {seats} {quotaType} seats
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <IndianRupee className="h-4 w-4" />
                                <span>{college.feeDisplay}</span>
                              </div>
                            </div>

                            <button
                              onClick={() =>
                                setExpandedCard(isExpanded ? null : `${college.name}-${quotaType}`)
                              }
                              className="flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              {isExpanded ? (
                                <>
                                  Hide Details <ChevronUp className="h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Show All Cutoffs <ChevronDown className="h-4 w-4" />
                                </>
                              )}
                            </button>

                            {isExpanded && (
                              <div className="mt-4 space-y-3 border-t pt-4">
                                <h4 className="text-sm font-semibold text-gray-700">
                                  {quotaType} Cutoffs - {isPwD ? 'PwD' : 'Regular'} (2024):
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {['general', 'ews', 'obc', 'sc', 'st'].map((cat) => {
                                    const cutoffs =
                                      quotaType === 'AIQ'
                                        ? college.aiqCutoffs
                                        : college.stateCutoffs
                                    if (!cutoffs) return null
                                    const key = isPwD ? `${cat}_pwd` : cat
                                    return (
                                      <div
                                        key={cat}
                                        className={`flex justify-between rounded bg-gray-50 px-3 py-2 ${cat === 'st' ? 'col-span-2' : ''}`}
                                      >
                                        <span className="text-gray-600">
                                          {cat.toUpperCase()}
                                          {isPwD ? '-PwD' : ''}:
                                        </span>
                                        <span className="font-semibold">
                                          {(
                                            cutoffs[key as keyof typeof cutoffs] as number
                                          )?.toLocaleString() || 'N/A'}
                                        </span>
                                      </div>
                                    )
                                  })}
                                </div>
                                {!isPwD && (
                                  <div className="mt-2">
                                    <p className="text-xs font-semibold text-purple-700">
                                      PwD Cutoffs:
                                    </p>
                                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-purple-600">
                                      {['general', 'obc', 'sc'].map((cat) => {
                                        const cutoffs =
                                          quotaType === 'AIQ'
                                            ? college.aiqCutoffs
                                            : college.stateCutoffs
                                        if (!cutoffs) return null
                                        const key = `${cat}_pwd` as keyof typeof cutoffs
                                        return (
                                          <span
                                            key={cat}
                                            className="rounded bg-purple-50 px-2 py-1"
                                          >
                                            {cat.toUpperCase()}:{' '}
                                            {(cutoffs[key] as number)?.toLocaleString()}
                                          </span>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Load More Button */}
                  {visibleCount < results.length && (
                    <div className="mt-8 text-center">
                      <button
                        onClick={loadMore}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700"
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

        {/* Quota Explanation Section */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Understanding NEET Quotas
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">All India Quota (15%)</h3>
                <p className="text-sm text-gray-600">
                  15% seats in government colleges are filled through MCC counselling. Open to
                  students from any state. AIIMS, JIPMER & Central universities have 100% AIQ.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <Home className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">State Quota (85%)</h3>
                <p className="text-sm text-gray-600">
                  85% seats reserved for state domicile holders. Counselling by respective state
                  authorities. Cutoffs are generally more relaxed than AIQ.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Accessibility className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">PwD Reservation (5%)</h3>
                <p className="text-sm text-gray-600">
                  5% horizontal reservation across all categories for candidates with 40%+ benchmark
                  disability. Cutoffs are relaxed for PwD candidates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Source Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">About Our Data</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Data Source:</strong> AIQ cutoffs are based on NEET 2024 MCC counselling
                  Round 3 closing ranks. State quota cutoffs are estimated based on historical
                  patterns.
                </p>
                <p>
                  <strong>Coverage:</strong> 470+ medical colleges including all 20 AIIMS, JIPMER,
                  ESIC, top government and private/deemed universities with both AIQ and State Quota
                  data.
                </p>
                <p>
                  <strong>PwD Data:</strong> PwD cutoffs are calculated based on 5% horizontal
                  reservation policy across all categories.
                </p>
                <p>
                  <strong>Disclaimer:</strong> This tool provides predictions based on historical
                  data. Actual cutoffs may vary. Always verify with official MCC/State counselling
                  portals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Explore More Section - SEO Pages */}
        <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Explore Medical Colleges
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
              Browse curated lists of medical colleges by category
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Government Medical Colleges */}
              <Link
                href="/neet-college-predictor/government-medical-colleges"
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  Government Medical Colleges
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Complete list of 324+ government medical colleges in India with fees under ₹1
                  lakh/year
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  View All <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              {/* Low Fees Medical Colleges */}
              <Link
                href="/neet-college-predictor/low-fees-medical-colleges"
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <IndianRupee className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-green-600">
                  Low Fees Medical Colleges
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Affordable MBBS options with annual fees under ₹5 lakh including private colleges
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                  View All <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              {/* Top Colleges by State */}
              <Link
                href="#college-search"
                onClick={(e) => {
                  e.preventDefault()
                  setSearchMode('college')
                  document.getElementById('search-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                  Search by College Name
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Find specific colleges by name and view detailed cutoffs, fees, and seat
                  information
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-purple-600">
                  Search Now <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

            {/* Additional Links */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/neet-rank-predictor"
                className="text-gray-600 underline-offset-2 hover:text-blue-600 hover:underline"
              >
                NEET Rank Predictor
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/neet-tools"
                className="text-gray-600 underline-offset-2 hover:text-blue-600 hover:underline"
              >
                All NEET Tools
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/neet-coaching-fees-comparison"
                className="text-gray-600 underline-offset-2 hover:text-blue-600 hover:underline"
              >
                Coaching Fees Comparison
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Need Help with NEET Preparation?</h2>
            <p className="mb-8 text-lg text-blue-100">
              Join Cerebrum Biology Academy for expert NEET Biology guidance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/neet-tools"
                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                <BookOpen className="h-5 w-5" />
                Explore All NEET Tools
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Floating Comparison Bar */}
        {compareList.length > 0 && !showCompareModal && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 shadow-lg">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-indigo-600" />
                  <span className="font-semibold text-indigo-900">
                    Compare ({compareList.length}/{MAX_COMPARE})
                  </span>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  {compareList.map((r) => (
                    <div
                      key={`${r.college.name}-${r.quotaType}`}
                      className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm"
                    >
                      <span className="max-w-[150px] truncate font-medium text-gray-700">
                        {r.college.name.split(',')[0]}
                      </span>
                      <button
                        onClick={() => toggleCompare(r)}
                        className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCompareList([])}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Compare Modal */}
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Scale className="h-6 w-6 text-indigo-600" />
                  College Comparison
                </h3>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6">
                {compareList.length === 0 ? (
                  <p className="py-8 text-center text-gray-500">
                    No colleges selected for comparison. Click the compare icon on college cards to
                    add them.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left text-sm font-semibold text-gray-600">
                            Feature
                          </th>
                          {compareList.map((r) => (
                            <th
                              key={`${r.college.name}-${r.quotaType}`}
                              className="p-3 text-left text-sm font-semibold text-gray-900"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="max-w-[180px] truncate">{r.college.name}</div>
                                  <span
                                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${
                                      r.quotaType === 'AIQ'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-orange-100 text-orange-700'
                                    }`}
                                  >
                                    {r.quotaType}
                                  </span>
                                </div>
                                <button
                                  onClick={() => toggleCompare(r)}
                                  className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 text-sm font-medium text-gray-600">Type</td>
                          {compareList.map((r) => (
                            <td
                              key={`type-${r.college.name}-${r.quotaType}`}
                              className="p-3 text-sm"
                            >
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                  r.college.type === 'Government'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {r.college.type}
                              </span>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b bg-gray-50">
                          <td className="p-3 text-sm font-medium text-gray-600">State</td>
                          {compareList.map((r) => (
                            <td
                              key={`state-${r.college.name}-${r.quotaType}`}
                              className="p-3 text-sm text-gray-900"
                            >
                              {r.college.state}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm font-medium text-gray-600">Tier</td>
                          {compareList.map((r) => (
                            <td
                              key={`tier-${r.college.name}-${r.quotaType}`}
                              className="p-3 text-sm text-gray-900"
                            >
                              Tier {r.college.tier}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b bg-gray-50">
                          <td className="p-3 text-sm font-medium text-gray-600">NIRF Rank</td>
                          {compareList.map((r) => (
                            <td
                              key={`nirf-${r.college.name}-${r.quotaType}`}
                              className="p-3 text-sm text-gray-900"
                            >
                              {r.college.nirfRank ? `#${r.college.nirfRank}` : 'N/A'}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm font-medium text-gray-600">
                            Cutoff ({category.toUpperCase()}
                            {isPwD ? '-PwD' : ''})
                          </td>
                          {compareList.map((r) => {
                            const displayCutoff = isPwD ? r.pwdCutoff : r.cutoff
                            return (
                              <td
                                key={`cutoff-${r.college.name}-${r.quotaType}`}
                                className="p-3 text-sm font-bold text-gray-900"
                              >
                                {displayCutoff.toLocaleString()}
                              </td>
                            )
                          })}
                        </tr>
                        <tr className="border-b bg-gray-50">
                          <td className="p-3 text-sm font-medium text-gray-600">Your Chance</td>
                          {compareList.map((r) => {
                            const displayCutoff = isPwD ? r.pwdCutoff : r.cutoff
                            const chance = getChance(parseInt(rank), displayCutoff)
                            return (
                              <td
                                key={`chance-${r.college.name}-${r.quotaType}`}
                                className="p-3 text-sm"
                              >
                                <span
                                  className={`rounded-full px-2 py-1 font-semibold ${chance.color}`}
                                >
                                  {chance.level}
                                </span>
                              </td>
                            )
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm font-medium text-gray-600">Est. Round</td>
                          {compareList.map((r) => {
                            const displayCutoff = isPwD ? r.pwdCutoff : r.cutoff
                            const prediction = predictCounsellingRound(displayCutoff)
                            return (
                              <td
                                key={`round-${r.college.name}-${r.quotaType}`}
                                className="p-3 text-sm"
                              >
                                <span
                                  className={`rounded-full px-2 py-1 font-semibold ${prediction.color}`}
                                >
                                  {prediction.round}
                                </span>
                              </td>
                            )
                          })}
                        </tr>
                        <tr className="border-b bg-gray-50">
                          <td className="p-3 text-sm font-medium text-gray-600">Seats</td>
                          {compareList.map((r) => (
                            <td
                              key={`seats-${r.college.name}-${r.quotaType}`}
                              className="p-3 text-sm text-gray-900"
                            >
                              {r.seats}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 text-sm font-medium text-gray-600">Annual Fees</td>
                          {compareList.map((r) => (
                            <td
                              key={`fees-${r.college.name}-${r.quotaType}`}
                              className="p-3 text-sm text-gray-900"
                            >
                              {r.college.feeDisplay}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 border-t bg-gray-50 p-4">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setCompareList([])}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
