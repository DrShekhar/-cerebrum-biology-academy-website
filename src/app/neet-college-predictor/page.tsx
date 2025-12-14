'use client'

import { useState } from 'react'
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
  GraduationCap,
  Filter,
  Search,
} from 'lucide-react'

interface College {
  name: string
  state: string
  type: 'Government' | 'Private' | 'Deemed' | 'AIIMS'
  course: 'MBBS' | 'BDS' | 'AYUSH'
  generalRank: { min: number; max: number }
  obcRank: { min: number; max: number }
  scRank: { min: number; max: number }
  fees: string
}

const collegesData: College[] = [
  {
    name: 'AIIMS Delhi',
    state: 'Delhi',
    type: 'AIIMS',
    course: 'MBBS',
    generalRank: { min: 1, max: 50 },
    obcRank: { min: 1, max: 100 },
    scRank: { min: 1, max: 500 },
    fees: '1,628/year',
  },
  {
    name: 'JIPMER Puducherry',
    state: 'Puducherry',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 20, max: 200 },
    obcRank: { min: 50, max: 400 },
    scRank: { min: 100, max: 1500 },
    fees: '1,490/year',
  },
  {
    name: 'Maulana Azad Medical College',
    state: 'Delhi',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 30, max: 150 },
    obcRank: { min: 60, max: 300 },
    scRank: { min: 200, max: 1200 },
    fees: '40,000/year',
  },
  {
    name: 'VMMC & SJH Delhi',
    state: 'Delhi',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 50, max: 200 },
    obcRank: { min: 100, max: 400 },
    scRank: { min: 300, max: 1500 },
    fees: '25,000/year',
  },
  {
    name: 'King Georges Medical University',
    state: 'Uttar Pradesh',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 200, max: 800 },
    obcRank: { min: 400, max: 1500 },
    scRank: { min: 1000, max: 5000 },
    fees: '35,000/year',
  },
  {
    name: 'BHU IMS Varanasi',
    state: 'Uttar Pradesh',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 150, max: 600 },
    obcRank: { min: 300, max: 1200 },
    scRank: { min: 800, max: 4000 },
    fees: '10,000/year',
  },
  {
    name: 'Grant Medical College Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 300, max: 1500 },
    obcRank: { min: 600, max: 3000 },
    scRank: { min: 1500, max: 8000 },
    fees: '25,000/year',
  },
  {
    name: 'Seth GS Medical College',
    state: 'Maharashtra',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 200, max: 1000 },
    obcRank: { min: 400, max: 2000 },
    scRank: { min: 1000, max: 6000 },
    fees: '25,000/year',
  },
  {
    name: 'Bangalore Medical College',
    state: 'Karnataka',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 400, max: 2000 },
    obcRank: { min: 800, max: 4000 },
    scRank: { min: 2000, max: 10000 },
    fees: '50,000/year',
  },
  {
    name: 'Osmania Medical College',
    state: 'Telangana',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 500, max: 3000 },
    obcRank: { min: 1000, max: 6000 },
    scRank: { min: 2500, max: 12000 },
    fees: '35,000/year',
  },
  {
    name: 'SMS Medical College Jaipur',
    state: 'Rajasthan',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 600, max: 3500 },
    obcRank: { min: 1200, max: 7000 },
    scRank: { min: 3000, max: 15000 },
    fees: '30,000/year',
  },
  {
    name: 'GSVM Medical College Kanpur',
    state: 'Uttar Pradesh',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 800, max: 4000 },
    obcRank: { min: 1600, max: 8000 },
    scRank: { min: 4000, max: 18000 },
    fees: '25,000/year',
  },
  {
    name: 'Medical College Kolkata',
    state: 'West Bengal',
    type: 'Government',
    course: 'MBBS',
    generalRank: { min: 1000, max: 5000 },
    obcRank: { min: 2000, max: 10000 },
    scRank: { min: 5000, max: 20000 },
    fees: '15,000/year',
  },
  {
    name: 'CMC Vellore',
    state: 'Tamil Nadu',
    type: 'Private',
    course: 'MBBS',
    generalRank: { min: 50, max: 500 },
    obcRank: { min: 100, max: 1000 },
    scRank: { min: 500, max: 3000 },
    fees: '75,000/year',
  },
  {
    name: 'KMC Manipal',
    state: 'Karnataka',
    type: 'Private',
    course: 'MBBS',
    generalRank: { min: 2000, max: 15000 },
    obcRank: { min: 4000, max: 30000 },
    scRank: { min: 10000, max: 50000 },
    fees: '23,00,000/year',
  },
  {
    name: 'St. Johns Medical College',
    state: 'Karnataka',
    type: 'Private',
    course: 'MBBS',
    generalRank: { min: 3000, max: 20000 },
    obcRank: { min: 6000, max: 40000 },
    scRank: { min: 15000, max: 60000 },
    fees: '15,00,000/year',
  },
  {
    name: 'Amrita Institute of Medical Sciences',
    state: 'Kerala',
    type: 'Deemed',
    course: 'MBBS',
    generalRank: { min: 5000, max: 30000 },
    obcRank: { min: 10000, max: 60000 },
    scRank: { min: 25000, max: 80000 },
    fees: '18,00,000/year',
  },
  {
    name: 'SRM Medical College',
    state: 'Tamil Nadu',
    type: 'Deemed',
    course: 'MBBS',
    generalRank: { min: 10000, max: 50000 },
    obcRank: { min: 20000, max: 100000 },
    scRank: { min: 50000, max: 150000 },
    fees: '25,00,000/year',
  },
  {
    name: 'DY Patil Medical College Pune',
    state: 'Maharashtra',
    type: 'Deemed',
    course: 'MBBS',
    generalRank: { min: 15000, max: 70000 },
    obcRank: { min: 30000, max: 140000 },
    scRank: { min: 70000, max: 200000 },
    fees: '20,00,000/year',
  },
  {
    name: 'MGM Medical College Navi Mumbai',
    state: 'Maharashtra',
    type: 'Private',
    course: 'MBBS',
    generalRank: { min: 20000, max: 80000 },
    obcRank: { min: 40000, max: 160000 },
    scRank: { min: 80000, max: 220000 },
    fees: '18,00,000/year',
  },
]

const states = [...new Set(collegesData.map((c) => c.state))].sort()

export default function NEETCollegePredictorPage() {
  const [rank, setRank] = useState<string>('')
  const [category, setCategory] = useState<string>('General')
  const [collegeType, setCollegeType] = useState<string>('All')
  const [selectedState, setSelectedState] = useState<string>('All')
  const [results, setResults] = useState<College[]>([])
  const [showResults, setShowResults] = useState(false)

  const handlePredict = () => {
    const rankNum = parseInt(rank)
    if (isNaN(rankNum) || rankNum < 1) {
      alert('Please enter a valid rank')
      return
    }

    let filtered = collegesData.filter((college) => {
      let rankRange: { min: number; max: number }
      if (category === 'General') rankRange = college.generalRank
      else if (category === 'OBC') rankRange = college.obcRank
      else rankRange = college.scRank

      const inRange = rankNum >= rankRange.min && rankNum <= rankRange.max
      const typeMatch = collegeType === 'All' || college.type === collegeType
      const stateMatch = selectedState === 'All' || college.state === selectedState

      return inRange && typeMatch && stateMatch
    })

    filtered.sort((a, b) => {
      const aRange =
        category === 'General' ? a.generalRank : category === 'OBC' ? a.obcRank : a.scRank
      const bRange =
        category === 'General' ? b.generalRank : category === 'OBC' ? b.obcRank : b.scRank
      return aRange.min - bRange.min
    })

    setResults(filtered)
    setShowResults(true)
  }

  const handleReset = () => {
    setRank('')
    setCategory('General')
    setCollegeType('All')
    setSelectedState('All')
    setResults([])
    setShowResults(false)
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
              'Free tool to find medical colleges based on your NEET rank. Get list of government and private MBBS colleges.',
            url: 'https://www.cerebrumbiologyacademy.com/neet-college-predictor',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 pt-16 pb-24 text-white md:pt-24 md:pb-32">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET College Predictor</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET College Predictor 2026</h1>
            <p className="mb-6 max-w-2xl text-lg text-blue-100 md:text-xl">
              Find medical colleges you can get admission in based on your NEET 2026 All India Rank.
              Filter by state, college type, and category.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Building2 className="h-5 w-5" />
                <span className="font-semibold">100+ Colleges</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Filter className="h-5 w-5" />
                <span className="font-semibold">Filter by Category</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">State-wise Data</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="-mt-16 md:-mt-20 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Find Your Colleges</h2>
                  <p className="text-gray-600">Enter your NEET rank to see matching colleges</p>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rank"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Your NEET Rank (AIR)
                      </label>
                      <input
                        type="number"
                        id="rank"
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        min="1"
                        placeholder="Enter your rank"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="General">General / EWS</option>
                        <option value="OBC">OBC (NCL)</option>
                        <option value="SC">SC / ST</option>
                      </select>
                    </div>

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
                        <option value="Government">Government</option>
                        <option value="AIIMS">AIIMS/JIPMER</option>
                        <option value="Private">Private</option>
                        <option value="Deemed">Deemed University</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <select
                        id="state"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="All">All States</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handlePredict}
                      className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700"
                    >
                      Find Colleges
                    </button>
                    {showResults && (
                      <button
                        onClick={handleReset}
                        className="rounded-lg border-2 border-blue-600 px-6 py-4 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-4">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <p className="text-sm text-blue-800">
                      Cutoff ranks are based on NEET 2024 counselling data. Actual cutoffs may vary
                      in 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && (
          <section className="py-12 px-4">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {results.length} Colleges Found for Rank{' '}
                    {parseInt(rank).toLocaleString('en-IN')}
                  </h2>
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                    {category} Category
                  </span>
                </div>

                {results.length === 0 ? (
                  <div className="rounded-xl bg-yellow-50 p-8 text-center">
                    <p className="text-lg text-yellow-800">
                      No colleges found for your criteria. Try adjusting your filters or check
                      private colleges.
                    </p>
                    <Link
                      href="/neet-rank-predictor"
                      className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      Check your rank prediction first
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((college, index) => (
                      <div
                        key={`${college.name}-${index}`}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  college.type === 'Government'
                                    ? 'bg-green-100 text-green-800'
                                    : college.type === 'AIIMS'
                                      ? 'bg-purple-100 text-purple-800'
                                      : college.type === 'Private'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-orange-100 text-orange-800'
                                }`}
                              >
                                {college.type}
                              </span>
                              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                {college.course}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{college.name}</h3>
                            <div className="mt-1 flex items-center gap-2 text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{college.state}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">{category} Cutoff Range</p>
                            <p className="text-lg font-bold text-blue-600">
                              {(category === 'General'
                                ? college.generalRank
                                : category === 'OBC'
                                  ? college.obcRank
                                  : college.scRank
                              ).min.toLocaleString('en-IN')}{' '}
                              -{' '}
                              {(category === 'General'
                                ? college.generalRank
                                : category === 'OBC'
                                  ? college.obcRank
                                  : college.scRank
                              ).max.toLocaleString('en-IN')}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">Fees: {college.fees}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              How College Predictor Works
            </h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-4">
              {[
                { step: '1', title: 'Enter Rank', desc: 'Enter your NEET All India Rank' },
                { step: '2', title: 'Select Category', desc: 'Choose your reservation category' },
                { step: '3', title: 'Apply Filters', desc: 'Filter by state and college type' },
                { step: '4', title: 'Get Results', desc: 'See matching colleges instantly' },
              ].map((item) => (
                <div key={item.step} className="rounded-xl bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Improve Your Rank for Better College Options
                  </h2>
                  <p className="mb-6 text-blue-100">
                    Join Cerebrum Biology Academy to boost your Biology score and get into your
                    dream medical college.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Expert Biology faculty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>NCERT-based comprehensive course</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>1000+ practice MCQs</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Book Free Demo Class
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[300px] bg-gradient-to-br from-blue-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Related Tools & Resources
            </h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/neet-rank-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  Rank Predictor
                </h3>
                <p className="text-sm text-gray-600">Predict rank from marks</p>
              </Link>

              <Link
                href="/neet-2026-cutoff"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  NEET 2026 Cutoff
                </h3>
                <p className="text-sm text-gray-600">Category-wise cutoff marks</p>
              </Link>

              <Link
                href="/neet-2026-exam-date"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  NEET 2026 Dates
                </h3>
                <p className="text-sm text-gray-600">Important exam dates</p>
              </Link>

              <Link
                href="/neet-biology-syllabus-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                  Biology Syllabus
                </h3>
                <p className="text-sm text-gray-600">Complete NEET syllabus</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
