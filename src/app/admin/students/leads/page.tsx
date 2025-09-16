'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  MapPin,
  TrendingUp,
  Clock,
  Star,
  MessageSquare,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Target,
  ThumbsUp,
  ThumbsDown,
  PhoneCall,
  Send,
  Filter,
  ArrowRight,
} from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  whatsappNumber?: string
  dateOfBirth?: string
  class: string
  school?: string
  city: string
  state: string
  leadSource: 'website' | 'referral' | 'social_media' | 'advertisement' | 'direct'
  courseInterest: string[]
  leadStage:
    | 'new'
    | 'contacted'
    | 'qualified'
    | 'demo_scheduled'
    | 'demo_completed'
    | 'negotiation'
    | 'converted'
    | 'lost'
  priority: 'hot' | 'warm' | 'cold'
  assignedCounselor?: string
  createdAt: string
  lastContactDate?: string
  nextFollowUp?: string
  parentName?: string
  parentPhone?: string
  notes?: string
  interactions: LeadInteraction[]
  conversionProbability: number
  expectedValue: number
  lostReason?: string
}

interface LeadInteraction {
  id: string
  type: 'call' | 'email' | 'whatsapp' | 'demo' | 'meeting'
  date: string
  duration?: number
  outcome: 'positive' | 'neutral' | 'negative'
  notes: string
  nextAction?: string
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 9876543214',
    whatsappNumber: '+91 9876543214',
    dateOfBirth: '2005-08-10',
    class: 'Dropper',
    school: "St. Xavier's School",
    city: 'Ahmedabad',
    state: 'Gujarat',
    leadSource: 'social_media',
    courseInterest: ['NEET Biology Dropper'],
    leadStage: 'demo_scheduled',
    priority: 'hot',
    assignedCounselor: 'Dr. Priya Sharma',
    createdAt: '2025-01-10T09:15:00Z',
    lastContactDate: '2025-01-14T15:30:00Z',
    nextFollowUp: '2025-01-18T10:00:00Z',
    parentName: 'Kiran Patel',
    parentPhone: '+91 9876543215',
    notes: 'Very motivated student, scored 580 in NEET. Looking for intensive coaching.',
    conversionProbability: 85,
    expectedValue: 65000,
    interactions: [
      {
        id: '1',
        type: 'call',
        date: '2025-01-14T15:30:00Z',
        duration: 25,
        outcome: 'positive',
        notes: 'Interested in dropper program. Demo scheduled for Jan 18.',
        nextAction: 'Conduct demo class',
      },
    ],
  },
  {
    id: '2',
    name: 'Kavya Sharma',
    email: 'kavya.sharma@email.com',
    phone: '+91 9876543217',
    class: '11th',
    school: 'Ryan International School',
    city: 'Bangalore',
    state: 'Karnataka',
    leadSource: 'website',
    courseInterest: ['NEET Biology Class 11', 'Foundation Biology'],
    leadStage: 'qualified',
    priority: 'warm',
    assignedCounselor: 'Dr. Rajesh Kumar',
    createdAt: '2025-01-12T14:20:00Z',
    lastContactDate: '2025-01-15T11:45:00Z',
    nextFollowUp: '2025-01-17T16:00:00Z',
    parentName: 'Manoj Sharma',
    parentPhone: '+91 9876543218',
    notes: 'Strong academic background. Parents are comparing with other institutes.',
    conversionProbability: 65,
    expectedValue: 35000,
    interactions: [
      {
        id: '1',
        type: 'email',
        date: '2025-01-15T11:45:00Z',
        outcome: 'neutral',
        notes: 'Sent course details and fee structure. Awaiting response.',
        nextAction: 'Follow up call in 2 days',
      },
    ],
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@email.com',
    phone: '+91 9876543219',
    class: '12th',
    city: 'Pune',
    state: 'Maharashtra',
    leadSource: 'referral',
    courseInterest: ['NEET Biology Class 12'],
    leadStage: 'new',
    priority: 'cold',
    createdAt: '2025-01-16T08:30:00Z',
    notes: 'Initial inquiry through referral. Need to contact.',
    conversionProbability: 30,
    expectedValue: 40000,
    interactions: [],
  },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads)
  const [searchTerm, setSearchTerm] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')

  useEffect(() => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.phone.includes(searchTerm) ||
          lead.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (stageFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.leadStage === stageFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.priority === priorityFilter)
    }

    if (sourceFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.leadSource === sourceFilter)
    }

    setFilteredLeads(filtered)
  }, [leads, searchTerm, stageFilter, priorityFilter, sourceFilter])

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
      value: leads.length,
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600',
      trend: '+15%',
    },
    {
      label: 'Hot Leads',
      value: leads.filter((l) => l.priority === 'hot').length,
      icon: Star,
      color: 'bg-red-100 text-red-600',
      trend: '+8%',
    },
    {
      label: 'Conversion Rate',
      value: '24.5%',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      trend: '+3.2%',
    },
    {
      label: 'Expected Value',
      value: `₹${(leads.reduce((acc, l) => acc + l.expectedValue, 0) / 1000).toFixed(0)}K`,
      icon: Target,
      color: 'bg-purple-100 text-purple-600',
      trend: '+12%',
    },
  ]

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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.trend} from last month</p>
                </div>
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
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
                            {lead.class} • {lead.school || 'School not provided'}
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
                          {lead.city}, {lead.state}
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
                          {lead.conversionProbability}%
                        </div>
                        <div className="text-xs text-gray-500">
                          ₹{lead.expectedValue.toLocaleString()}
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
                        <button className="text-gray-600 hover:text-gray-900">
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
        </motion.div>
      </div>
    </AdminLayout>
  )
}
