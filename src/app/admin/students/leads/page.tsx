'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Clock,
  Star,
  MessageSquare,
  Edit,
  Eye,
  AlertCircle,
  Target,
  PhoneCall,
  Send,
  Filter,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { AddLeadForm } from '@/components/admin/AddLeadForm'
import { EditLeadForm } from '@/components/admin/EditLeadForm'
import { toast } from 'sonner'

// API Lead type (matches database schema)
interface APILead {
  id: string
  studentName: string
  email: string | null
  phone: string
  courseInterest: string
  source: string
  stage: string
  priority: string
  assignedToId: string | null
  nextFollowUpAt: string | null
  lastContactedAt: string | null
  lostReason: string | null
  score: number | null
  createdAt: string
  updatedAt: string
  users?: { id: string; name: string; email: string } | null
  _count?: { activities: number; notes: number; crm_communications: number }
}

// UI Lead type for display
interface Lead {
  id: string
  name: string
  email: string
  phone: string
  courseInterest: string[]
  leadSource: string
  leadStage: string
  priority: string
  assignedCounselor?: string
  assignedToId?: string
  createdAt: string
  lastContactDate?: string
  nextFollowUp?: string
  lostReason?: string
  score?: number
  activitiesCount?: number
  notesCount?: number
  class?: string
  school?: string
  city?: string
  state?: string
  conversionProbability?: number
  expectedValue?: number
}

interface Counselor {
  id: string
  name: string
  email: string
  role: string
  leadCount: number
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface Stats {
  total: number
  byStage: Record<string, number>
}

// Transform API lead to UI lead
function transformLead(apiLead: APILead): Lead {
  return {
    id: apiLead.id,
    name: apiLead.studentName,
    email: apiLead.email || '',
    phone: apiLead.phone,
    courseInterest: apiLead.courseInterest ? [apiLead.courseInterest] : [],
    leadSource: apiLead.source.toLowerCase(),
    leadStage: apiLead.stage.toLowerCase().replace('_', '_'),
    priority: apiLead.priority.toLowerCase(),
    assignedCounselor: apiLead.users?.name,
    assignedToId: apiLead.assignedToId || undefined,
    createdAt: apiLead.createdAt,
    lastContactDate: apiLead.lastContactedAt || undefined,
    nextFollowUp: apiLead.nextFollowUpAt || undefined,
    lostReason: apiLead.lostReason || undefined,
    score: apiLead.score || undefined,
    activitiesCount: apiLead._count?.activities,
    notesCount: apiLead._count?.notes,
  }
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [counselors, setCounselors] = useState<Counselor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [stats, setStats] = useState<Stats>({ total: 0, byStage: {} })
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false)
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Fetch leads from API
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.set('page', pagination.page.toString())
      params.set('limit', pagination.limit.toString())
      if (stageFilter !== 'all') params.set('stage', stageFilter.toUpperCase().replace(' ', '_'))
      if (priorityFilter !== 'all') params.set('priority', priorityFilter.toUpperCase())
      if (searchTerm) params.set('search', searchTerm)

      const response = await fetch(`/api/admin/leads?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch leads')
      }

      const data = await response.json()
      if (data.success) {
        const transformedLeads = data.data.map(transformLead)
        setLeads(transformedLeads)
        setFilteredLeads(transformedLeads)
        setPagination(data.pagination)
        setStats(data.stats)
      } else {
        throw new Error(data.error || 'Failed to fetch leads')
      }
    } catch (err) {
      console.error('Error fetching leads:', err)
      setError(err instanceof Error ? err.message : 'Failed to load leads')
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, stageFilter, priorityFilter, searchTerm])

  // Fetch counselors from API
  const fetchCounselors = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/counselors')
      if (!response.ok) {
        throw new Error('Failed to fetch counselors')
      }

      const data = await response.json()
      if (data.success) {
        setCounselors(data.data)
      }
    } catch (err) {
      console.error('Error fetching counselors:', err)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchLeads()
    fetchCounselors()
  }, [fetchLeads, fetchCounselors])

  // Client-side filtering for source (not in API)
  useEffect(() => {
    let filtered = leads

    if (sourceFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.leadSource === sourceFilter)
    }

    setFilteredLeads(filtered)
  }, [leads, sourceFilter])

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-indigo-100 text-indigo-800'
      case 'qualified':
        return 'bg-purple-100 text-purple-800'
      case 'demo_scheduled':
        return 'bg-orange-100 text-orange-800'
      case 'demo_completed':
        return 'bg-yellow-100 text-yellow-800'
      case 'negotiation':
        return 'bg-pink-100 text-pink-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      case 'lost':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'hot':
        return 'bg-red-100 text-red-800'
      case 'warm':
        return 'bg-yellow-100 text-yellow-800'
      case 'cold':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'website':
        return <Search className="w-3 h-3" />
      case 'referral':
        return <Users className="w-3 h-3" />
      case 'social_media':
        return <MessageSquare className="w-3 h-3" />
      case 'advertisement':
        return <Target className="w-3 h-3" />
      case 'direct':
        return <PhoneCall className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  const statsData = [
    {
      label: 'Total Leads',
      value: stats.total,
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Hot Leads',
      value: leads.filter((l) => l.priority === 'hot').length,
      icon: Star,
      color: 'bg-red-100 text-red-600',
    },
    {
      label: 'Demo Scheduled',
      value: stats.byStage?.DEMO_SCHEDULED || 0,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'New Leads',
      value: stats.byStage?.NEW_LEAD || 0,
      icon: Target,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  // Show loading state
  if (loading && leads.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading leads...</span>
        </div>
      </AdminLayout>
    )
  }

  // Show error state
  if (error && leads.length === 0) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load leads</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => fetchLeads()}>Try Again</Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-600 mt-2">
              Track and convert potential students into enrollments
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-gray-700 border-gray-300">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsAddLeadModalOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl border border-gray-200 animate-fadeInUp"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {loading && <Loader2 className="w-3 h-3 animate-spin text-gray-400 mt-1" />}
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search leads by name, email, phone, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Stages</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="demo_scheduled">Demo Scheduled</option>
                <option value="demo_completed">Demo Completed</option>
                <option value="negotiation">Negotiation</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </select>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social_media">Social Media</option>
                <option value="advertisement">Advertisement</option>
                <option value="direct">Direct</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div
          className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fadeInUp"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source & Interest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <UserPlus className="h-5 w-5 text-yellow-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-500">
                            {lead.class || 'N/A'} • {lead.school || 'School not provided'}
                          </div>
                          <div className="text-xs text-gray-400">
                            Created: {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="w-3 h-3 mr-2 text-gray-400" />
                          {lead.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          {lead.phone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                          {lead.city || 'N/A'}, {lead.state || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStageColor(
                            lead.leadStage
                          )}`}
                        >
                          {lead.leadStage.replace('_', ' ').charAt(0).toUpperCase() +
                            lead.leadStage.replace('_', ' ').slice(1)}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                            lead.priority
                          )}`}
                        >
                          {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          {getSourceIcon(lead.leadSource)}
                          <span className="ml-2 capitalize">
                            {lead.leadSource.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {lead.courseInterest.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.conversionProbability ?? 0}%
                        </div>
                        <div className="text-xs text-gray-500">
                          ₹{(lead.expectedValue ?? 0).toLocaleString()}
                        </div>
                        {lead.nextFollowUp && (
                          <div className="text-xs text-blue-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Follow up: {new Date(lead.nextFollowUp).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-green-600 hover:text-green-900">
                          <PhoneCall className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Send className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          onClick={() => {
                            setSelectedLead(lead)
                            setIsEditLeadModalOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-orange-600 hover:text-orange-900">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
              <p className="mt-1 text-sm text-gray-500">No leads match your current filters.</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={isAddLeadModalOpen}
        onOpenChange={setIsAddLeadModalOpen}
        title="Add New Lead"
        description="Capture details of a prospective student interested in our courses."
        size="lg"
      >
        <AddLeadForm
          counselors={counselors.map(c => ({ id: c.id, name: c.name }))}
          onSuccess={() => {
            setIsAddLeadModalOpen(false)
            fetchLeads()
            toast.success('Lead added successfully')
          }}
          onCancel={() => setIsAddLeadModalOpen(false)}
        />
      </Modal>

      {selectedLead && (
        <Modal
          open={isEditLeadModalOpen}
          onOpenChange={setIsEditLeadModalOpen}
          title="Edit Lead"
          description="Update lead information and status."
          size="xl"
        >
          <EditLeadForm
            lead={{
              id: selectedLead.id,
              studentName: selectedLead.name,
              email: selectedLead.email,
              phone: selectedLead.phone,
              courseInterest: selectedLead.courseInterest.join(', '),
              source: selectedLead.leadSource.toUpperCase().replace(' ', '_'),
              stage: selectedLead.leadStage.toUpperCase().replace('_', '_'),
              priority: selectedLead.priority.toUpperCase(),
              assignedToId: selectedLead.assignedToId || counselors[0]?.id || '',
              nextFollowUpAt: selectedLead.nextFollowUp,
              lostReason: selectedLead.lostReason,
            }}
            counselors={counselors.map(c => ({ id: c.id, name: c.name }))}
            onSuccess={() => {
              setIsEditLeadModalOpen(false)
              setSelectedLead(null)
              fetchLeads()
              toast.success('Lead updated successfully')
            }}
            onCancel={() => {
              setIsEditLeadModalOpen(false)
              setSelectedLead(null)
            }}
          />
        </Modal>
      )}
    </AdminLayout>
  )
}
