'use client'

import { useState, useEffect } from 'react'
import { Target, TrendingUp, ArrowDown, Calendar, CheckCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ConversionData {
  funnel: Array<{ stage: string; count: number; dropoff: number }>
  demoToEnrollment: { total: number; converted: number; rate: number }
}

export default function ConversionPage() {
  const [data, setData] = useState<ConversionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/analytics?timeframe=${dateRange}`)
      const json = await res.json()
      if (json.success) {
        const d = json.data
        setData({
          funnel: [
            { stage: 'Website Visitors', count: d.traffic?.totalPageViews || 0, dropoff: 0 },
            { stage: 'Demo Bookings', count: d.demos?.totalBookings || 0, dropoff: 0 },
            { stage: 'Demo Completed', count: d.demos?.completed || 0, dropoff: 0 },
            { stage: 'Enrollments', count: d.courses?.totalEnrollments || 0, dropoff: 0 },
          ],
          demoToEnrollment: {
            total: d.demos?.totalBookings || 0,
            converted: d.demos?.conversionRate
              ? Math.round(((d.demos?.conversionRate || 0) / 100) * (d.demos?.totalBookings || 0))
              : 0,
            rate: d.demos?.conversionRate || 0,
          },
        })
      }
    } catch (error) {
      console.error('Failed to fetch conversion data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Conversion Analytics</h1>
            <p className="text-gray-600 mt-1">Track funnel performance and conversion rates</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline" className="text-gray-700 border-gray-300" onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading conversion data...</p>
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Demo to Enrollment</p>
                    <p className="text-2xl font-bold text-green-600">
                      {data.demoToEnrollment.rate.toFixed(1)}%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                    <Target className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Demos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.demoToEnrollment.total}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Enrolled</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.demoToEnrollment.converted}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
              <div className="space-y-4">
                {data.funnel.map((stage, i) => {
                  const maxCount = data.funnel[0]?.count || 1
                  const pct = (stage.count / maxCount) * 100
                  const prevCount = i > 0 ? data.funnel[i - 1].count : stage.count
                  const dropoff = prevCount > 0 ? ((prevCount - stage.count) / prevCount) * 100 : 0
                  return (
                    <div key={stage.stage}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-bold text-gray-900">
                            {stage.count.toLocaleString()}
                          </span>
                          {i > 0 && dropoff > 0 && (
                            <span className="text-xs text-red-500 flex items-center">
                              <ArrowDown className="w-3 h-3 mr-1" />
                              {dropoff.toFixed(1)}% drop
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-8">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${Math.max(pct, 3)}%` }}
                        >
                          {pct > 10 && (
                            <span className="text-xs text-white font-medium">
                              {pct.toFixed(0)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No conversion data</h3>
            <p className="mt-1 text-sm text-gray-500">
              Conversion data will populate as demos and enrollments come in.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
