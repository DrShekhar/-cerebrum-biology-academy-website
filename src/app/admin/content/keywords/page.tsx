'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  RefreshCw,
  ExternalLink,
  Filter,
  Download,
} from 'lucide-react'

interface KeywordRanking {
  id: string
  keyword: string
  currentPosition: number
  previousPosition: number
  searchVolume: number
  difficulty: 'easy' | 'medium' | 'hard'
  url: string
  contentType: string
  trend: 'up' | 'down' | 'stable'
  change: number
  impressions: number
  clicks: number
  ctr: number
  lastUpdated: string
}

interface KeywordGroup {
  name: string
  keywords: KeywordRanking[]
}

export default function KeywordTrackerPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [keywords, setKeywords] = useState<KeywordRanking[]>([])
  const [filter, setFilter] = useState<'all' | 'improving' | 'declining' | 'top10'>('all')
  const [sortBy, setSortBy] = useState<'position' | 'volume' | 'change'>('position')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadKeywords()
  }, [])

  const loadKeywords = async () => {
    setIsLoading(true)
    try {
      // In production, fetch from Google Search Console API or similar
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Placeholder data demonstrating the UI
      setKeywords([
        {
          id: '1',
          keyword: 'neet biology coaching',
          currentPosition: 3,
          previousPosition: 5,
          searchVolume: 12100,
          difficulty: 'hard',
          url: '/courses/intensive-neet-biology',
          contentType: 'Landing Page',
          trend: 'up',
          change: 2,
          impressions: 8450,
          clicks: 634,
          ctr: 7.5,
          lastUpdated: '2026-01-08',
        },
        {
          id: '2',
          keyword: 'biology tuition near me',
          currentPosition: 7,
          previousPosition: 12,
          searchVolume: 8100,
          difficulty: 'medium',
          url: '/biology-tuition-rohini',
          contentType: 'SEO Page',
          trend: 'up',
          change: 5,
          impressions: 4230,
          clicks: 245,
          ctr: 5.8,
          lastUpdated: '2026-01-08',
        },
        {
          id: '3',
          keyword: 'neet 2026 biology syllabus',
          currentPosition: 2,
          previousPosition: 2,
          searchVolume: 22000,
          difficulty: 'medium',
          url: '/blog/neet-2026-biology-syllabus',
          contentType: 'Blog Post',
          trend: 'stable',
          change: 0,
          impressions: 15600,
          clicks: 2340,
          ctr: 15.0,
          lastUpdated: '2026-01-08',
        },
        {
          id: '4',
          keyword: 'human reproduction notes neet',
          currentPosition: 4,
          previousPosition: 6,
          searchVolume: 6600,
          difficulty: 'easy',
          url: '/blog/human-reproduction-notes',
          contentType: 'Blog Post',
          trend: 'up',
          change: 2,
          impressions: 3890,
          clicks: 389,
          ctr: 10.0,
          lastUpdated: '2026-01-08',
        },
        {
          id: '5',
          keyword: 'best biology teacher delhi',
          currentPosition: 11,
          previousPosition: 8,
          searchVolume: 2400,
          difficulty: 'hard',
          url: '/about',
          contentType: 'Page',
          trend: 'down',
          change: -3,
          impressions: 1200,
          clicks: 48,
          ctr: 4.0,
          lastUpdated: '2026-01-08',
        },
        {
          id: '6',
          keyword: 'genetics mcq for neet',
          currentPosition: 6,
          previousPosition: 9,
          searchVolume: 14800,
          difficulty: 'medium',
          url: '/resources/genetics-mcq',
          contentType: 'Resource',
          trend: 'up',
          change: 3,
          impressions: 7840,
          clicks: 627,
          ctr: 8.0,
          lastUpdated: '2026-01-08',
        },
        {
          id: '7',
          keyword: 'cell division notes pdf',
          currentPosition: 15,
          previousPosition: 18,
          searchVolume: 9900,
          difficulty: 'easy',
          url: '/resources/cell-division-notes',
          contentType: 'Lead Magnet',
          trend: 'up',
          change: 3,
          impressions: 2450,
          clicks: 147,
          ctr: 6.0,
          lastUpdated: '2026-01-08',
        },
        {
          id: '8',
          keyword: 'nta neet 2026 dates',
          currentPosition: 8,
          previousPosition: 4,
          searchVolume: 33100,
          difficulty: 'hard',
          url: '/news/nta-neet-2026-dates',
          contentType: 'News',
          trend: 'down',
          change: -4,
          impressions: 12300,
          clicks: 1107,
          ctr: 9.0,
          lastUpdated: '2026-01-08',
        },
      ])
    } catch (error) {
      console.error('Failed to load keywords:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredKeywords = keywords
    .filter((kw) => {
      if (filter === 'improving') return kw.trend === 'up'
      if (filter === 'declining') return kw.trend === 'down'
      if (filter === 'top10') return kw.currentPosition <= 10
      return true
    })
    .filter(
      (kw) =>
        searchQuery === '' ||
        kw.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kw.url.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'position') return a.currentPosition - b.currentPosition
      if (sortBy === 'volume') return b.searchVolume - a.searchVolume
      if (sortBy === 'change') return b.change - a.change
      return 0
    })

  const stats = {
    totalKeywords: keywords.length,
    top10: keywords.filter((k) => k.currentPosition <= 10).length,
    improving: keywords.filter((k) => k.trend === 'up').length,
    declining: keywords.filter((k) => k.trend === 'down').length,
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPositionBadge = (position: number): string => {
    if (position <= 3) return 'bg-green-500 text-white'
    if (position <= 10) return 'bg-blue-500 text-white'
    if (position <= 20) return 'bg-yellow-500 text-white'
    return 'bg-gray-500 text-white'
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Keyword Tracker</h1>
            <p className="text-gray-600 mt-1">Monitor SEO rankings and search performance</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadKeywords}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
              <Plus className="w-4 h-4" />
              Add Keyword
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalKeywords}</p>
                <p className="text-sm text-gray-600">Total Keywords</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.top10}</p>
                <p className="text-sm text-gray-600">Top 10 Rankings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.improving}</p>
                <p className="text-sm text-gray-600">Improving</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.declining}</p>
                <p className="text-sm text-gray-600">Declining</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search keywords or URLs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'top10', label: 'Top 10' },
                { value: 'improving', label: 'Improving' },
                { value: 'declining', label: 'Declining' },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value as typeof filter)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === f.value
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="position">Sort by Position</option>
              <option value="volume">Sort by Volume</option>
              <option value="change">Sort by Change</option>
            </select>
          </div>
        </div>

        {/* Keywords Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-3" />
              <p className="text-gray-600">Loading keyword data...</p>
            </div>
          ) : filteredKeywords.length === 0 ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No keywords found</p>
              <p className="text-sm text-gray-500 mt-1">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Add keywords to track their rankings'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Impressions
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      CTR
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredKeywords.map((kw) => (
                    <tr key={kw.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{kw.keyword}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{kw.contentType}</span>
                            <span className="text-gray-300">•</span>
                            <a
                              href={kw.url}
                              target="_blank" rel="noopener noreferrer"
                              rel="noopener noreferrer"
                              className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                            >
                              {kw.url}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getPositionBadge(kw.currentPosition)}`}
                        >
                          {kw.currentPosition}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div
                          className={`inline-flex items-center gap-1 text-sm font-medium ${
                            kw.trend === 'up'
                              ? 'text-green-600'
                              : kw.trend === 'down'
                                ? 'text-red-600'
                                : 'text-gray-500'
                          }`}
                        >
                          {kw.trend === 'up' ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : kw.trend === 'down' ? (
                            <ArrowDown className="w-4 h-4" />
                          ) : (
                            <Minus className="w-4 h-4" />
                          )}
                          {kw.change !== 0 && Math.abs(kw.change)}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-gray-900">
                          {kw.searchVolume.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(kw.difficulty)}`}
                        >
                          {kw.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-gray-900">
                          {kw.impressions.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-gray-900">{kw.clicks.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-gray-900">{kw.ctr}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-3">Keyword Tracking Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
            <div>
              <p className="font-medium mb-2">Position Color Codes:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded-full" />
                  <strong>Green (1-3):</strong> Top positions, excellent
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-500 rounded-full" />
                  <strong>Blue (4-10):</strong> First page, good visibility
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-yellow-500 rounded-full" />
                  <strong>Yellow (11-20):</strong> Second page, needs work
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-500 rounded-full" />
                  <strong>Gray (21+):</strong> Low visibility, optimize content
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Improvement Strategies:</p>
              <ul className="space-y-1">
                <li>• Add more content around declining keywords</li>
                <li>• Build internal links to pages ranking 11-20</li>
                <li>• Update meta titles/descriptions for low CTR</li>
                <li>• Create supporting blog posts for target keywords</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
