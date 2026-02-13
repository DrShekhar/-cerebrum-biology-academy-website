'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Download, TrendingUp, Users, Award, BarChart3 } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface Submission {
  id: string
  studentName: string
  studentPhone: string
  studentEmail: string | null
  studentClass: string
  totalCorrect: number
  totalWrong: number
  totalUnattempted: number
  marksObtained: number
  maxMarks: number
  percentage: number
  useVerifiedKey: boolean
  submittedAt: string
  paper: {
    paperCode: string
    title: string
    subjectType: string
  }
}

interface Stats {
  totalSubmissions: number
  avgPercentage: number
  avgMarks: number
  highestPercentage: number | null
  lowestPercentage: number | null
}

const SUBJECT_LABELS: Record<string, string> = {
  BIOLOGY_XI: 'BIOLOGY XI',
  BIOLOGY_XII: 'BIOLOGY XII',
  BIOLOGY_XI_XII: 'BIOLOGY XI+XII',
  NEET_MOCK: 'NEET MOCK',
}

export default function OMRResultsPage() {
  const searchParams = useSearchParams()
  const paperId = searchParams.get('paperId')

  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchSubmissions()
  }, [paperId, classFilter, page])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (paperId) params.append('paperId', paperId)
      if (classFilter) params.append('studentClass', classFilter)
      if (searchQuery) params.append('search', searchQuery)
      params.append('page', page.toString())
      params.append('limit', '25')

      const res = await fetch(`/api/admin/omr/submissions?${params}`)
      const data = await res.json()

      if (data.success) {
        setSubmissions(data.submissions)
        setStats(data.stats)
        setTotalPages(data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchSubmissions()
  }

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Phone', 'Class', 'Paper', 'Marks', 'Percentage', 'Key Type', 'Submitted At'].join(
        ','
      ),
      ...submissions.map((s) =>
        [
          s.studentName,
          s.studentPhone,
          s.studentClass,
          s.paper.paperCode,
          `${s.marksObtained}/${s.maxMarks}`,
          `${s.percentage}%`,
          s.useVerifiedKey ? 'Verified' : 'Unverified',
          new Date(s.submittedAt).toLocaleString(),
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `omr-results-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">OMR Results</h1>
            <p className="text-gray-600">View all student submissions and results</p>
          </div>
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div
              className="bg-white p-4 rounded-lg shadow-sm border animate-fadeInUp"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Submissions</p>
                  <p className="text-xl font-bold">{stats.totalSubmissions}</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow-sm border animate-fadeInUp"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Percentage</p>
                  <p className="text-xl font-bold">{stats.avgPercentage}%</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow-sm border animate-fadeInUp"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Marks</p>
                  <p className="text-xl font-bold">{stats.avgMarks}</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow-sm border animate-fadeInUp"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Highest</p>
                  <p className="text-xl font-bold">{stats.highestPercentage || 0}%</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-lg shadow-sm border animate-fadeInUp"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lowest</p>
                  <p className="text-xl font-bold">{stats.lowestPercentage || 0}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Classes</option>
              <option value="11th">Class 11th</option>
              <option value="12th">Class 12th</option>
              <option value="Dropper">Dropper</option>
            </select>

            <Button variant="outline" onClick={handleSearch}>
              Search
            </Button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading results...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No submissions found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Class
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Paper
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      C/W/U
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Key
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{submission.studentName}</p>
                          <p className="text-sm text-gray-500">{submission.studentPhone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{submission.studentClass}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium">{submission.paper.paperCode}</p>
                          <p className="text-xs text-gray-500">
                            {SUBJECT_LABELS[submission.paper.subjectType] ||
                              submission.paper.subjectType}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold">
                            {submission.marksObtained}/{submission.maxMarks}
                          </p>
                          <p
                            className={`text-sm font-medium ${
                              submission.percentage >= 80
                                ? 'text-green-600'
                                : submission.percentage >= 60
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                            }`}
                          >
                            {submission.percentage}%
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">
                          <span className="text-green-600">{submission.totalCorrect}</span>/
                          <span className="text-red-600">{submission.totalWrong}</span>/
                          <span className="text-gray-400">{submission.totalUnattempted}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            submission.useVerifiedKey
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {submission.useVerifiedKey ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-500">
                          {new Date(submission.submittedAt).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
