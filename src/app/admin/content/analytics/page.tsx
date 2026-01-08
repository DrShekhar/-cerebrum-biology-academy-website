'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Clock,
  ArrowUpRight,
  MessageCircle,
  Download,
  Users,
  RefreshCw,
} from 'lucide-react'

interface ContentMetric {
  id: string
  title: string
  type: string
  slug: string
  views: number
  uniqueViews: number
  avgTimeOnPage: number
  bounceRate: number
  conversions: {
    whatsapp: number
    downloads: number
    enrollments: number
  }
  engagementScore: number
  trend: 'up' | 'down' | 'stable'
  trendPercent: number
}

interface OverviewStats {
  totalViews: number
  totalConversions: number
  avgEngagement: number
  viewsTrend: number
  conversionsTrend: number
  engagementTrend: number
}

interface ContentTypeStats {
  type: string
  label: string
  count: number
  views: number
  conversions: number
  color: string
}

export default function ContentAnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')
  const [isLoading, setIsLoading] = useState(true)
  const [overview, setOverview] = useState<OverviewStats>({
    totalViews: 0,
    totalConversions: 0,
    avgEngagement: 0,
    viewsTrend: 0,
    conversionsTrend: 0,
    engagementTrend: 0,
  })
  const [topContent, setTopContent] = useState<ContentMetric[]>([])
  const [contentTypeStats, setContentTypeStats] = useState<ContentTypeStats[]>([])

  useEffect(() => {
    loadAnalytics()
  }, [period])

  const loadAnalytics = async () => {
    setIsLoading(true)
    try {
      // In production, fetch from API
      // const res = await fetch(`/api/admin/content/analytics?period=${period}`)
      // const data = await res.json()

      // For now, use placeholder data demonstrating the UI
      await new Promise((resolve) => setTimeout(resolve, 500))

      setOverview({
        totalViews: 12450,
        totalConversions: 347,
        avgEngagement: 72,
        viewsTrend: 15.3,
        conversionsTrend: 8.7,
        engagementTrend: 4.2,
      })

      setTopContent([
        {
          id: '1',
          title: 'NEET 2026 Biology Syllabus Complete Guide',
          type: 'BLOG_POST',
          slug: '/blog/neet-2026-biology-syllabus',
          views: 3240,
          uniqueViews: 2890,
          avgTimeOnPage: 245,
          bounceRate: 32,
          conversions: { whatsapp: 89, downloads: 45, enrollments: 12 },
          engagementScore: 92,
          trend: 'up',
          trendPercent: 23,
        },
        {
          id: '2',
          title: 'Human Reproduction Notes for NEET',
          type: 'BLOG_POST',
          slug: '/blog/human-reproduction-notes',
          views: 2180,
          uniqueViews: 1950,
          avgTimeOnPage: 198,
          bounceRate: 38,
          conversions: { whatsapp: 56, downloads: 32, enrollments: 8 },
          engagementScore: 85,
          trend: 'up',
          trendPercent: 15,
        },
        {
          id: '3',
          title: 'Biology Tuition in Rohini',
          type: 'SEO_LANDING_PAGE',
          slug: '/biology-tuition-rohini',
          views: 1890,
          uniqueViews: 1720,
          avgTimeOnPage: 89,
          bounceRate: 45,
          conversions: { whatsapp: 78, downloads: 0, enrollments: 15 },
          engagementScore: 78,
          trend: 'stable',
          trendPercent: 2,
        },
        {
          id: '4',
          title: 'Genetics Revision Cheat Sheet',
          type: 'LEAD_MAGNET',
          slug: '/resources/genetics-cheat-sheet',
          views: 1560,
          uniqueViews: 1340,
          avgTimeOnPage: 156,
          bounceRate: 28,
          conversions: { whatsapp: 34, downloads: 312, enrollments: 5 },
          engagementScore: 88,
          trend: 'up',
          trendPercent: 45,
        },
        {
          id: '5',
          title: 'NTA Announces NEET 2026 Dates',
          type: 'NEWS_ARTICLE',
          slug: '/news/nta-neet-2026-dates',
          views: 980,
          uniqueViews: 890,
          avgTimeOnPage: 67,
          bounceRate: 52,
          conversions: { whatsapp: 23, downloads: 0, enrollments: 2 },
          engagementScore: 65,
          trend: 'down',
          trendPercent: -12,
        },
      ])

      setContentTypeStats([
        {
          type: 'BLOG_POST',
          label: 'Blog Posts',
          count: 65,
          views: 8420,
          conversions: 198,
          color: 'bg-blue-500',
        },
        {
          type: 'SEO_LANDING_PAGE',
          label: 'Landing Pages',
          count: 459,
          views: 2890,
          conversions: 89,
          color: 'bg-green-500',
        },
        {
          type: 'NEWS_ARTICLE',
          label: 'News Articles',
          count: 12,
          views: 1540,
          conversions: 34,
          color: 'bg-orange-500',
        },
        {
          type: 'LEAD_MAGNET',
          label: 'Lead Magnets',
          count: 8,
          views: 890,
          conversions: 312,
          color: 'bg-purple-500',
        },
      ])
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      BLOG_POST: 'bg-blue-100 text-blue-800',
      SEO_LANDING_PAGE: 'bg-green-100 text-green-800',
      NEWS_ARTICLE: 'bg-orange-100 text-orange-800',
      LEAD_MAGNET: 'bg-purple-100 text-purple-800',
      SOCIAL_POST: 'bg-pink-100 text-pink-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      BLOG_POST: 'Blog',
      SEO_LANDING_PAGE: 'Landing',
      NEWS_ARTICLE: 'News',
      LEAD_MAGNET: 'Lead Magnet',
      SOCIAL_POST: 'Social',
    }
    return labels[type] || type
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Content Analytics</h1>
            <p className="text-gray-600 mt-1">Track content performance and engagement</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    period === p
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={loadAnalytics}
              disabled={isLoading}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${overview.viewsTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {overview.viewsTrend >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(overview.viewsTrend)}%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {overview.totalViews.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Page Views</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MousePointer className="w-5 h-5 text-green-600" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${overview.conversionsTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {overview.conversionsTrend >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(overview.conversionsTrend)}%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {overview.totalConversions.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Conversions</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${overview.engagementTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                {overview.engagementTrend >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {Math.abs(overview.engagementTrend)}%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{overview.avgEngagement}%</p>
            <p className="text-sm text-gray-600 mt-1">Avg Engagement Score</p>
          </div>
        </div>

        {/* Content by Type */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Content Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentTypeStats.map((stat) => (
              <div key={stat.type} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                  <span className="font-medium text-gray-900">{stat.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Content</span>
                    <span className="font-medium">{stat.count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium">{stat.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversions</span>
                    <span className="font-medium">{stat.conversions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Content</h2>
            <p className="text-sm text-gray-600 mt-1">Ranked by engagement score</p>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-3" />
              <p className="text-gray-600">Loading analytics...</p>
            </div>
          ) : topContent.length === 0 ? (
            <div className="p-8 text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No content data available yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Publish content and wait for traffic to see analytics
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {topContent.map((content, index) => (
                <div key={content.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                      {index + 1}
                    </div>

                    {/* Content Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{content.title}</h3>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(content.type)}`}
                        >
                          {getTypeLabel(content.type)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mb-3">{content.slug}</p>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Eye className="w-3 h-3" />
                            Views
                          </div>
                          <p className="font-medium text-gray-900">
                            {content.views.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Clock className="w-3 h-3" />
                            Avg Time
                          </div>
                          <p className="font-medium text-gray-900">
                            {formatTime(content.avgTimeOnPage)}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </div>
                          <p className="font-medium text-gray-900">
                            {content.conversions.whatsapp}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Download className="w-3 h-3" />
                            Downloads
                          </div>
                          <p className="font-medium text-gray-900">
                            {content.conversions.downloads}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Users className="w-3 h-3" />
                            Enrollments
                          </div>
                          <p className="font-medium text-gray-900">
                            {content.conversions.enrollments}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <BarChart3 className="w-3 h-3" />
                            Score
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{content.engagementScore}</p>
                            <div
                              className={`flex items-center gap-0.5 text-xs ${
                                content.trend === 'up'
                                  ? 'text-green-600'
                                  : content.trend === 'down'
                                    ? 'text-red-600'
                                    : 'text-gray-500'
                              }`}
                            >
                              {content.trend === 'up' ? (
                                <ArrowUpRight className="w-3 h-3" />
                              ) : content.trend === 'down' ? (
                                <TrendingDown className="w-3 h-3" />
                              ) : null}
                              {content.trendPercent !== 0 && `${Math.abs(content.trendPercent)}%`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Understanding Engagement Score</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800 mb-2">Score Components:</p>
              <ul className="space-y-1">
                <li>
                  • <strong>Views (10%):</strong> Normalized page views
                </li>
                <li>
                  • <strong>Time on Page (30%):</strong> Target: 3 minutes = 100%
                </li>
                <li>
                  • <strong>Bounce Rate (30%):</strong> Lower is better
                </li>
                <li>
                  • <strong>Conversions (30%):</strong> WhatsApp clicks, downloads
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-2">Score Ranges:</p>
              <ul className="space-y-1">
                <li>
                  • <strong>80-100:</strong> Excellent - Top performer
                </li>
                <li>
                  • <strong>60-79:</strong> Good - Meeting expectations
                </li>
                <li>
                  • <strong>40-59:</strong> Fair - Room for improvement
                </li>
                <li>
                  • <strong>0-39:</strong> Needs attention - Review and optimize
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
