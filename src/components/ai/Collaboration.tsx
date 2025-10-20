'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  UserPlus,
  MessageSquare,
  Eye,
  GitBranch,
  History,
  CheckCircle,
  Share2,
  Crown,
  Clock,
  Bell,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Send,
  Edit3,
  Trash2,
  Plus,
  X,
  Download,
  Upload,
  Settings,
  Filter,
  Search,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Award,
  BookOpen,
  Target,
  Zap,
  Brain,
  Shield,
  Activity,
  RefreshCw,
  Save,
  Play,
  Pause,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Star,
  Flag,
  Copy,
  ExternalLink
} from 'lucide-react'

// Types and Interfaces
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'editor' | 'reviewer' | 'viewer'
  department: string
  expertise: string[]
  status: 'online' | 'offline' | 'away'
  lastActive: string
  permissions: Permission[]
}

interface Permission {
  action: 'create' | 'edit' | 'delete' | 'review' | 'approve' | 'comment' | 'share'
  scope: 'all' | 'own' | 'department' | 'assigned'
}

interface Invitation {
  id: string
  recipientEmail: string
  recipientName: string
  role: User['role']
  permissions: Permission[]
  invitedBy: string
  invitedAt: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  message?: string
  expiresAt: string
}

interface Comment {
  id: string
  questionId: string
  authorId: string
  authorName: string
  authorAvatar?: string
  content: string
  type: 'general' | 'suggestion' | 'concern' | 'approval' | 'rejection'
  createdAt: string
  updatedAt?: string
  replies: Comment[]
  reactions: {
    [userId: string]: 'like' | 'dislike' | 'helpful' | 'flag'
  }
  status: 'open' | 'resolved' | 'archived'
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

interface Review {
  id: string
  questionId: string
  reviewerId: string
  reviewerName: string
  status: 'pending' | 'approved' | 'rejected' | 'needs_changes'
  score: number // 1-5 rating
  comments: string
  checklist: {
    [criteria: string]: boolean
  }
  submittedAt: string
  decidedAt?: string
}

interface Version {
  id: string
  questionId: string
  version: number
  content: any
  authorId: string
  authorName: string
  createdAt: string
  changes: string[]
  description: string
  status: 'draft' | 'review' | 'approved' | 'published'
  parentVersion?: string
  mergedFrom?: string[]
}

interface WorkflowStep {
  id: string
  name: string
  description: string
  assigneeRole: User['role']
  requiredApprovals: number
  autoAdvance: boolean
  timeLimit?: number
  conditions: string[]
}

interface ApprovalWorkflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  isDefault: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface QuestionShare {
  id: string
  questionId: string
  sharedBy: string
  sharedWith: string[]
  shareType: 'view' | 'collaborate' | 'copy'
  permissions: Permission[]
  expiresAt?: string
  createdAt: string
  accessCount: number
  shareLink?: string
}

const Collaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invitations' | 'reviews' | 'comments' | 'versions' | 'history' | 'workflow' | 'sharing'>('invitations')

  // Sample data for demonstration
  const [collaborators, setCollaborators] = useState<User[]>([
    {
      id: 'user1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      avatar: undefined,
      role: 'admin',
      department: 'Biology Department',
      expertise: ['Cell Biology', 'Genetics', 'Molecular Biology'],
      status: 'online',
      lastActive: new Date().toISOString(),
      permissions: [
        { action: 'create', scope: 'all' },
        { action: 'edit', scope: 'all' },
        { action: 'delete', scope: 'all' },
        { action: 'approve', scope: 'all' }
      ]
    },
    {
      id: 'user2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      role: 'editor',
      department: 'Biology Department',
      expertise: ['Plant Physiology', 'Ecology', 'Evolution'],
      status: 'online',
      lastActive: new Date(Date.now() - 300000).toISOString(),
      permissions: [
        { action: 'create', scope: 'department' },
        { action: 'edit', scope: 'own' },
        { action: 'review', scope: 'department' }
      ]
    },
    {
      id: 'user3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
      role: 'reviewer',
      department: 'Quality Assurance',
      expertise: ['Assessment Design', 'Quality Control', 'Statistics'],
      status: 'away',
      lastActive: new Date(Date.now() - 1800000).toISOString(),
      permissions: [
        { action: 'review', scope: 'all' },
        { action: 'comment', scope: 'all' }
      ]
    }
  ])

  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: 'inv1',
      recipientEmail: 'new.reviewer@university.edu',
      recipientName: 'Dr. James Wilson',
      role: 'reviewer',
      permissions: [{ action: 'review', scope: 'department' }],
      invitedBy: 'user1',
      invitedAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'pending',
      message: 'We would like you to join our biology test review team',
      expiresAt: new Date(Date.now() + 604800000).toISOString()
    }
  ])

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comment1',
      questionId: 'q1',
      authorId: 'user2',
      authorName: 'Prof. Michael Chen',
      content: 'This question seems too difficult for the target audience. Consider simplifying the language.',
      type: 'suggestion',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      replies: [
        {
          id: 'reply1',
          questionId: 'q1',
          authorId: 'user1',
          authorName: 'Dr. Sarah Johnson',
          content: 'Good point. I\'ll revise the wording to make it more accessible.',
          type: 'general',
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          replies: [],
          reactions: {},
          status: 'open',
          priority: 'medium',
          tags: []
        }
      ],
      reactions: { 'user1': 'like', 'user3': 'helpful' },
      status: 'open',
      priority: 'medium',
      tags: ['difficulty', 'language']
    }
  ])

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'review1',
      questionId: 'q1',
      reviewerId: 'user3',
      reviewerName: 'Dr. Emily Rodriguez',
      status: 'approved',
      score: 4,
      comments: 'Well-structured question with clear learning objectives. Minor suggestions for improvement.',
      checklist: {
        'Clear question stem': true,
        'Appropriate difficulty': true,
        'Correct answer key': true,
        'Grammar and spelling': false,
        'Aligned with objectives': true
      },
      submittedAt: new Date(Date.now() - 7200000).toISOString(),
      decidedAt: new Date(Date.now() - 3600000).toISOString()
    }
  ])

  const [versions, setVersions] = useState<Version[]>([
    {
      id: 'v1',
      questionId: 'q1',
      version: 1,
      content: { question: 'Original question content...', options: ['A', 'B', 'C', 'D'] },
      authorId: 'user1',
      authorName: 'Dr. Sarah Johnson',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      changes: ['Initial creation'],
      description: 'Initial version of cell biology question',
      status: 'published'
    },
    {
      id: 'v2',
      questionId: 'q1',
      version: 2,
      content: { question: 'Revised question content...', options: ['A', 'B', 'C', 'D'] },
      authorId: 'user1',
      authorName: 'Dr. Sarah Johnson',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      changes: ['Simplified language', 'Updated explanation'],
      description: 'Revised based on peer feedback',
      status: 'approved',
      parentVersion: 'v1'
    }
  ])

  const [workflows, setWorkflows] = useState<ApprovalWorkflow[]>([
    {
      id: 'workflow1',
      name: 'Standard Biology Question Review',
      description: 'Default workflow for biology question approval',
      isDefault: true,
      createdBy: 'user1',
      createdAt: new Date(Date.now() - 2592000000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      steps: [
        {
          id: 'step1',
          name: 'Peer Review',
          description: 'Subject matter expert review',
          assigneeRole: 'editor',
          requiredApprovals: 1,
          autoAdvance: false,
          timeLimit: 48,
          conditions: ['Content accuracy', 'Difficulty appropriateness']
        },
        {
          id: 'step2',
          name: 'Quality Review',
          description: 'Quality assurance check',
          assigneeRole: 'reviewer',
          requiredApprovals: 1,
          autoAdvance: false,
          timeLimit: 24,
          conditions: ['Grammar and spelling', 'Format consistency']
        },
        {
          id: 'step3',
          name: 'Final Approval',
          description: 'Department head approval',
          assigneeRole: 'admin',
          requiredApprovals: 1,
          autoAdvance: true,
          conditions: ['All previous steps completed']
        }
      ]
    }
  ])

  const [shares, setShares] = useState<QuestionShare[]>([
    {
      id: 'share1',
      questionId: 'q1',
      sharedBy: 'user1',
      sharedWith: ['external1@partner.edu', 'external2@partner.edu'],
      shareType: 'view',
      permissions: [{ action: 'review', scope: 'assigned' }],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      accessCount: 3,
      shareLink: 'https://platform.com/shared/abc123'
    }
  ])

  const [newInvitation, setNewInvitation] = useState({
    email: '',
    name: '',
    role: 'reviewer' as User['role'],
    message: ''
  })

  const [newComment, setNewComment] = useState({
    questionId: 'q1',
    content: '',
    type: 'general' as Comment['type'],
    priority: 'medium' as Comment['priority']
  })

  // Event Handlers
  const sendInvitation = () => {
    if (!newInvitation.email || !newInvitation.name) return

    const invitation: Invitation = {
      id: `inv_${Date.now()}`,
      recipientEmail: newInvitation.email,
      recipientName: newInvitation.name,
      role: newInvitation.role,
      permissions: getDefaultPermissions(newInvitation.role),
      invitedBy: 'user1',
      invitedAt: new Date().toISOString(),
      status: 'pending',
      message: newInvitation.message,
      expiresAt: new Date(Date.now() + 604800000).toISOString()
    }

    setInvitations(prev => [invitation, ...prev])
    setNewInvitation({ email: '', name: '', role: 'reviewer', message: '' })
  }

  const getDefaultPermissions = (role: User['role']): Permission[] => {
    const permissionMap = {
      admin: [
        { action: 'create' as const, scope: 'all' as const },
        { action: 'edit' as const, scope: 'all' as const },
        { action: 'delete' as const, scope: 'all' as const },
        { action: 'approve' as const, scope: 'all' as const }
      ],
      editor: [
        { action: 'create' as const, scope: 'department' as const },
        { action: 'edit' as const, scope: 'own' as const },
        { action: 'review' as const, scope: 'department' as const }
      ],
      reviewer: [
        { action: 'review' as const, scope: 'all' as const },
        { action: 'comment' as const, scope: 'all' as const }
      ],
      viewer: [
        { action: 'comment' as const, scope: 'assigned' as const }
      ]
    }
    return permissionMap[role]
  }

  const addComment = () => {
    if (!newComment.content.trim()) return

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      questionId: newComment.questionId,
      authorId: 'user1',
      authorName: 'Dr. Sarah Johnson',
      content: newComment.content,
      type: newComment.type,
      createdAt: new Date().toISOString(),
      replies: [],
      reactions: {},
      status: 'open',
      priority: newComment.priority,
      tags: []
    }

    setComments(prev => [comment, ...prev])
    setNewComment({ questionId: 'q1', content: '', type: 'general', priority: 'medium' })
  }

  const createShareLink = (questionId: string, shareType: QuestionShare['shareType']) => {
    const share: QuestionShare = {
      id: `share_${Date.now()}`,
      questionId,
      sharedBy: 'user1',
      sharedWith: [],
      shareType,
      permissions: shareType === 'view' ? [{ action: 'review', scope: 'assigned' }] : [{ action: 'edit', scope: 'assigned' }],
      createdAt: new Date().toISOString(),
      accessCount: 0,
      shareLink: `https://platform.com/shared/${Math.random().toString(36).substring(2)}`
    }

    setShares(prev => [share, ...prev])
    return share.shareLink
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'yellow',
      approved: 'green',
      rejected: 'red',
      needs_changes: 'orange',
      online: 'green',
      offline: 'gray',
      away: 'yellow',
      open: 'blue',
      resolved: 'green',
      archived: 'gray'
    }
    return colors[status as keyof typeof colors] || 'gray'
  }

  const getRoleIcon = (role: User['role']) => {
    const icons = {
      admin: Crown,
      editor: Edit3,
      reviewer: Eye,
      viewer: Users
    }
    return icons[role]
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Team Collaboration
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Collaborative test development with peer review, version control, approval workflows,
          and seamless team communication
        </p>
      </div>

      {/* Team Overview */}
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Active Collaborators ({collaborators.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collaborators.map((user) => {
            const RoleIcon = getRoleIcon(user.role)
            return (
              <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-${getStatusColor(user.status)}-500 border-2 border-white rounded-full`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-800 truncate">{user.name}</h4>
                      <RoleIcon className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize bg-${getStatusColor(user.role)}-100 text-${getStatusColor(user.role)}-700`}>
                        {user.role}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize bg-${getStatusColor(user.status)}-100 text-${getStatusColor(user.status)}-700`}>
                        {user.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{user.department}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {user.expertise.slice(0, 2).map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {user.expertise.length > 2 && (
                        <span className="text-xs text-gray-500">+{user.expertise.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'invitations', label: 'Invitations', icon: UserPlus },
            { id: 'reviews', label: 'Peer Review', icon: Eye },
            { id: 'comments', label: 'Comments', icon: MessageSquare },
            { id: 'versions', label: 'Versions', icon: GitBranch },
            { id: 'history', label: 'History', icon: History },
            { id: 'workflow', label: 'Workflow', icon: CheckCircle },
            { id: 'sharing', label: 'Sharing', icon: Share2 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Co-author Invitations */}
        {activeTab === 'invitations' && (
          <motion.div
            key="invitations"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Invite New Collaborator */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Invite New Collaborator
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newInvitation.email}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="colleague@university.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newInvitation.name}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dr. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={newInvitation.role}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, role: e.target.value as User['role'] }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={newInvitation.message}
                    onChange={(e) => setNewInvitation(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Welcome to our biology test development team!"
                  />
                </div>
              </div>

              <button
                onClick={sendInvitation}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Invitation
              </button>
            </div>

            {/* Pending Invitations */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                Pending Invitations ({invitations.filter(i => i.status === 'pending').length})
              </h3>

              {invitations.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No invitations sent yet</p>
                  <p className="text-sm">Invite team members to start collaborating</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <div key={invitation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-800">{invitation.recipientName}</h4>
                          <p className="text-sm text-gray-600">{invitation.recipientEmail}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium bg-${getStatusColor(invitation.status)}-100 text-${getStatusColor(invitation.status)}-700`}>
                            {invitation.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium bg-${getStatusColor(invitation.role)}-100 text-${getStatusColor(invitation.role)}-700`}>
                            {invitation.role}
                          </span>
                        </div>
                      </div>

                      {invitation.message && (
                        <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-2 rounded">
                          {invitation.message}
                        </p>
                      )}

                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Invited {new Date(invitation.invitedAt).toLocaleDateString()}</span>
                        <span>Expires {new Date(invitation.expiresAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Resend
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Peer Review System */}
        {activeTab === 'reviews' && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Review Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 border text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {reviews.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-yellow-800">Pending Reviews</div>
              </div>
              <div className="bg-white rounded-xl p-4 border text-center">
                <div className="text-2xl font-bold text-green-600">
                  {reviews.filter(r => r.status === 'approved').length}
                </div>
                <div className="text-sm text-green-800">Approved</div>
              </div>
              <div className="bg-white rounded-xl p-4 border text-center">
                <div className="text-2xl font-bold text-red-600">
                  {reviews.filter(r => r.status === 'rejected').length}
                </div>
                <div className="text-sm text-red-800">Rejected</div>
              </div>
              <div className="bg-white rounded-xl p-4 border text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {reviews.filter(r => r.status === 'needs_changes').length}
                </div>
                <div className="text-sm text-orange-800">Needs Changes</div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                Recent Reviews
              </h3>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">Question {review.questionId}</h4>
                        <p className="text-sm text-gray-600">Reviewed by {review.reviewerName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-${getStatusColor(review.status)}-100 text-${getStatusColor(review.status)}-700`}>
                          {review.status.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.score ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{review.comments}</p>

                    {/* Review Checklist */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                      {Object.entries(review.checklist).map(([criteria, passed]) => (
                        <div key={criteria} className="flex items-center gap-2 text-sm">
                          {passed ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-red-600" />
                          )}
                          <span className={passed ? 'text-green-700' : 'text-red-700'}>
                            {criteria}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Submitted {new Date(review.submittedAt).toLocaleString()}</span>
                      {review.decidedAt && (
                        <span>Decided {new Date(review.decidedAt).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {reviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No reviews submitted yet</p>
                  <p className="text-sm">Reviews will appear here as team members evaluate questions</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Comments & Feedback */}
        {activeTab === 'comments' && (
          <motion.div
            key="comments"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Add New Comment */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Add Comment
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question ID
                    </label>
                    <select
                      value={newComment.questionId}
                      onChange={(e) => setNewComment(prev => ({ ...prev, questionId: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="q1">Question 1</option>
                      <option value="q2">Question 2</option>
                      <option value="q3">Question 3</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment Type
                    </label>
                    <select
                      value={newComment.type}
                      onChange={(e) => setNewComment(prev => ({ ...prev, type: e.target.value as Comment['type'] }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="general">General</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="concern">Concern</option>
                      <option value="approval">Approval</option>
                      <option value="rejection">Rejection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newComment.priority}
                      onChange={(e) => setNewComment(prev => ({ ...prev, priority: e.target.value as Comment['priority'] }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your feedback or comment..."
                  />
                </div>

                <button
                  onClick={addComment}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Recent Comments ({comments.length})
              </h3>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {comment.authorName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{comment.authorName}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Q{comment.questionId}</span>
                            <span>•</span>
                            <span>{new Date(comment.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-${getStatusColor(comment.type)}-100 text-${getStatusColor(comment.type)}-700`}>
                          {comment.type}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-${getStatusColor(comment.priority)}-100 text-${getStatusColor(comment.priority)}-700`}>
                          {comment.priority}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{comment.content}</p>

                    {/* Reactions */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{Object.values(comment.reactions).filter(r => r === 'like').length}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{Object.values(comment.reactions).filter(r => r === 'dislike').length}</span>
                        </button>
                        <button className="text-sm text-gray-500 hover:text-green-600">
                          Reply
                        </button>
                        <button className="text-sm text-gray-500 hover:text-orange-600">
                          Flag
                        </button>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-6 space-y-3 border-l-2 border-gray-100 pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {reply.authorName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium">{reply.authorName}</span>
                              <span className="text-gray-500">{new Date(reply.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-700">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No comments yet</p>
                  <p className="text-sm">Start the conversation by adding a comment</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Version Control */}
        {activeTab === 'versions' && (
          <motion.div
            key="versions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-purple-600" />
                Version History
              </h3>

              <div className="space-y-4">
                {versions.map((version, index) => (
                  <div key={version.id} className="relative">
                    {/* Version Line */}
                    {index < versions.length - 1 && (
                      <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200" />
                    )}

                    <div className="flex gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        version.status === 'published' ? 'bg-green-500' :
                        version.status === 'approved' ? 'bg-blue-500' :
                        version.status === 'review' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}>
                        v{version.version}
                      </div>

                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              Version {version.version} - {version.description}
                            </h4>
                            <p className="text-sm text-gray-600">
                              by {version.authorName} • {new Date(version.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium bg-${getStatusColor(version.status)}-100 text-${getStatusColor(version.status)}-700`}>
                              {version.status}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-800 text-sm">
                              Compare
                            </button>
                            {version.status !== 'published' && (
                              <button className="text-red-600 hover:text-red-800 text-sm">
                                Revert
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Changes */}
                        <div className="space-y-1">
                          {version.changes.map((change, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              <span className="text-gray-700">{change}</span>
                            </div>
                          ))}
                        </div>

                        {/* Branch info */}
                        {version.parentVersion && (
                          <div className="mt-2 text-xs text-gray-500">
                            Branched from {version.parentVersion}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Change History */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-orange-600" />
                Activity Timeline
              </h3>

              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    action: 'Question approved',
                    user: 'Dr. Emily Rodriguez',
                    timestamp: new Date(Date.now() - 3600000),
                    details: 'Question Q1 approved with minor suggestions',
                    type: 'approval'
                  },
                  {
                    id: '2',
                    action: 'Comment added',
                    user: 'Prof. Michael Chen',
                    timestamp: new Date(Date.now() - 7200000),
                    details: 'Suggested simplifying the language in Q1',
                    type: 'comment'
                  },
                  {
                    id: '3',
                    action: 'Version created',
                    user: 'Dr. Sarah Johnson',
                    timestamp: new Date(Date.now() - 10800000),
                    details: 'Created version 2 with revised content',
                    type: 'version'
                  },
                  {
                    id: '4',
                    action: 'Review submitted',
                    user: 'Dr. Emily Rodriguez',
                    timestamp: new Date(Date.now() - 14400000),
                    details: 'Submitted review for Q1 with score 4/5',
                    type: 'review'
                  },
                  {
                    id: '5',
                    action: 'Question shared',
                    user: 'Dr. Sarah Johnson',
                    timestamp: new Date(Date.now() - 18000000),
                    details: 'Shared Q1 with external reviewers',
                    type: 'share'
                  }
                ].map((activity, index) => (
                  <div key={activity.id} className="relative">
                    {index < 4 && (
                      <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200" />
                    )}

                    <div className="flex gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                        activity.type === 'approval' ? 'bg-green-500' :
                        activity.type === 'comment' ? 'bg-blue-500' :
                        activity.type === 'version' ? 'bg-purple-500' :
                        activity.type === 'review' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}>
                        {activity.type === 'approval' ? <CheckCircle className="w-4 h-4" /> :
                         activity.type === 'comment' ? <MessageSquare className="w-4 h-4" /> :
                         activity.type === 'version' ? <GitBranch className="w-4 h-4" /> :
                         activity.type === 'review' ? <Eye className="w-4 h-4" /> :
                         <Share2 className="w-4 h-4" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-800">{activity.action}</h4>
                          <span className="text-sm text-gray-500">
                            {activity.timestamp.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">by {activity.user}</p>
                        <p className="text-sm text-gray-700">{activity.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Approval Workflow */}
        {activeTab === 'workflow' && (
          <motion.div
            key="workflow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Workflow Overview */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Approval Workflows
              </h3>

              <div className="space-y-6">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-gray-800 flex items-center gap-2">
                          {workflow.name}
                          {workflow.isDefault && (
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Default</span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">{workflow.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm">
                          Duplicate
                        </button>
                      </div>
                    </div>

                    {/* Workflow Steps */}
                    <div className="space-y-4">
                      {workflow.steps.map((step, index) => (
                        <div key={step.id} className="relative">
                          {index < workflow.steps.length - 1 && (
                            <div className="absolute left-4 top-12 w-0.5 h-8 bg-gray-300" />
                          )}

                          <div className="flex gap-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>

                            <div className="flex-1 bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-start mb-2">
                                <h5 className="font-medium text-gray-800">{step.name}</h5>
                                <div className="flex items-center gap-2">
                                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                                    {step.assigneeRole}
                                  </span>
                                  {step.timeLimit && (
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                                      {step.timeLimit}h
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                              <div className="text-xs text-gray-500">
                                Requires {step.requiredApprovals} approval(s) •
                                Auto-advance: {step.autoAdvance ? 'Yes' : 'No'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Question Sharing */}
        {activeTab === 'sharing' && (
          <motion.div
            key="sharing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Create Share Link */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-teal-600" />
                Share Questions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="q1">Question 1 - Cell Biology</option>
                    <option value="q2">Question 2 - Genetics</option>
                    <option value="q3">Question 3 - Evolution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Type
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="view">View Only</option>
                    <option value="collaborate">Collaborate</option>
                    <option value="copy">Copy & Edit</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => createShareLink('q1', 'view')}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Create Link
                  </button>
                </div>
              </div>
            </div>

            {/* Active Shares */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-600" />
                Active Shares ({shares.length})
              </h3>

              <div className="space-y-4">
                {shares.map((share) => (
                  <div key={share.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">Question {share.questionId}</h4>
                        <p className="text-sm text-gray-600">
                          Shared {new Date(share.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-${getStatusColor(share.shareType)}-100 text-${getStatusColor(share.shareType)}-700`}>
                          {share.shareType}
                        </span>
                        <span className="text-sm text-gray-500">
                          {share.accessCount} views
                        </span>
                      </div>
                    </div>

                    {share.shareLink && (
                      <div className="bg-gray-50 rounded p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="flex-1 text-sm bg-white p-2 rounded border">
                            {share.shareLink}
                          </code>
                          <button
                            onClick={() => navigator.clipboard.writeText(share.shareLink!)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {share.sharedWith.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Shared with:</p>
                        <div className="flex flex-wrap gap-2">
                          {share.sharedWith.map((email, index) => (
                            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                              {email}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit Permissions
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        View Analytics
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Revoke Access
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {shares.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Share2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No questions shared yet</p>
                  <p className="text-sm">Create share links to collaborate with external partners</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Collaboration Tools</h3>
            <p className="text-gray-600">
              Streamline your team's test development workflow
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Activity
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Team Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collaboration