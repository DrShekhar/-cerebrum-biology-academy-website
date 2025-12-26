'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Archive,
  Key,
  Users,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface OMRPaper {
  id: string
  paperCode: string
  title: string
  subjectType: string
  targetClass: string
  totalQuestions: number
  totalMarks: number
  examDate: string
  submissionStart: string
  submissionEnd: string
  hasVerifiedKey: boolean
  status: string
  isActive: boolean
  createdAt: string
  _count: {
    answerKeys: number
    submissions: number
  }
}

const SUBJECT_LABELS: Record<string, string> = {
  BIOLOGY_XI: 'BIOLOGY XI',
  BIOLOGY_XII: 'BIOLOGY XII',
  BIOLOGY_XI_XII: 'BIOLOGY XI+XII',
  NEET_MOCK: 'NEET MOCK (PCB)',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  DRAFT: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: Clock },
  ACTIVE: { label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  CLOSED: { label: 'Closed', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  ARCHIVED: { label: 'Archived', color: 'bg-purple-100 text-purple-800', icon: Archive },
}

export default function OMRAdminPage() {
  const [papers, setPapers] = useState<OMRPaper[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [subjectFilter, setSubjectFilter] = useState<string>('')

  useEffect(() => {
    fetchPapers()
  }, [statusFilter, subjectFilter])

  const fetchPapers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (subjectFilter) params.append('subjectType', subjectFilter)

      const res = await fetch(`/api/admin/omr/papers?${params}`)
      const data = await res.json()
      if (data.success) {
        setPapers(data.papers)
      }
    } catch (error) {
      console.error('Failed to fetch papers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPapers = papers.filter(
    (paper) =>
      paper.paperCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: papers.length,
    active: papers.filter((p) => p.status === 'ACTIVE').length,
    withVerifiedKey: papers.filter((p) => p.hasVerifiedKey).length,
    totalSubmissions: papers.reduce((acc, p) => acc + p._count.submissions, 0),
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">OMR Evaluation Tool</h1>
            <p className="text-gray-600">Manage papers, answer keys, and view submissions</p>
          </div>
          <Link href="/admin/omr/papers/new">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Paper
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Papers</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Papers</p>
                <p className="text-xl font-bold">{stats.active}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Key className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Verified Keys</p>
                <p className="text-xl font-bold">{stats.withVerifiedKey}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Submissions</p>
                <p className="text-xl font-bold">{stats.totalSubmissions}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by paper code or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="CLOSED">Closed</option>
              <option value="ARCHIVED">Archived</option>
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Subjects</option>
              <option value="BIOLOGY_XI">Biology XI</option>
              <option value="BIOLOGY_XII">Biology XII</option>
              <option value="BIOLOGY_XI_XII">Biology XI+XII</option>
              <option value="NEET_MOCK">NEET Mock</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading papers...</p>
              </div>
            ) : filteredPapers.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No papers found</p>
                <Link href="/admin/omr/papers/new">
                  <Button variant="outline" className="mt-3">
                    Create your first paper
                  </Button>
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Paper
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Questions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Answer Keys
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Submissions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPapers.map((paper) => {
                    const statusConfig = STATUS_CONFIG[paper.status]
                    const StatusIcon = statusConfig?.icon || Clock

                    return (
                      <tr key={paper.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{paper.paperCode}</p>
                            <p className="text-sm text-gray-500">{paper.title}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">
                            {SUBJECT_LABELS[paper.subjectType] || paper.subjectType}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{paper.totalQuestions}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {paper._count.answerKeys}/{paper.totalQuestions}
                            </span>
                            {paper.hasVerifiedKey ? (
                              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                Verified
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                Unverified
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{paper._count.submissions}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${statusConfig?.color || 'bg-gray-100'}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig?.label || paper.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/omr/papers/${paper.id}`}>
                              <button className="p-1 hover:bg-gray-100 rounded" title="View">
                                <Eye className="w-4 h-4 text-gray-600" />
                              </button>
                            </Link>
                            <Link href={`/admin/omr/papers/${paper.id}/answer-keys`}>
                              <button className="p-1 hover:bg-gray-100 rounded" title="Answer Keys">
                                <Key className="w-4 h-4 text-purple-600" />
                              </button>
                            </Link>
                            <Link href={`/admin/omr/results?paperId=${paper.id}`}>
                              <button className="p-1 hover:bg-gray-100 rounded" title="Results">
                                <Users className="w-4 h-4 text-blue-600" />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
