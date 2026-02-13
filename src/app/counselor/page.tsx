'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sun,
  Moon,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Zap,
  Star,
  PhoneCall,
} from 'lucide-react'
import { format, isToday, isPast, formatDistanceToNow } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface DashboardData {
  greeting: string
  todayTasks: any[]
  overdueFollowUps: any[]
  upcomingFollowUps: any[]
  todayStats: {
    callsMade: number
    whatsappsSent: number
    leadsContacted: number
    tasksCompleted: number
    newLeads: number
  }
  weeklyKPIs: {
    conversions: number
    conversionRate: number
    revenue: number
    demosCompleted: number
  }
  recentLeads: any[]
  pendingPayments: any[]
}

// ─── Greeting Helper ─────────────────────────────────────────────────────────

function getGreeting(): { text: string; icon: React.ReactNode; gradient: string } {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Good Morning', icon: <Sun className="w-6 h-6" />, gradient: 'from-amber-500 to-orange-500' }
  if (hour < 17) return { text: 'Good Afternoon', icon: <Sun className="w-6 h-6" />, gradient: 'from-blue-500 to-indigo-500' }
  return { text: 'Good Evening', icon: <Moon className="w-6 h-6" />, gradient: 'from-indigo-600 to-purple-600' }
}

// ─── Quick Action Card ───────────────────────────────────────────────────────

function QuickAction({
  icon: Icon,
  label,
  value,
  href,
  color,
  bgColor,
}: {
  icon: any
  label: string
  value: string | number
  href: string
  color: string
  bgColor: string
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
      </div>
    </Link>
  )
}

// ─── Task Item ───────────────────────────────────────────────────────────────

function TaskItem({
  task,
  onComplete,
}: {
  task: any
  onComplete: (id: string) => void
}) {
  const isOverdue = isPast(new Date(task.dueDate)) && task.status !== 'COMPLETED'
  const priorityColors: Record<string, string> = {
    URGENT: 'bg-red-500',
    HIGH: 'bg-orange-500',
    MEDIUM: 'bg-yellow-500',
    LOW: 'bg-gray-400',
  }

  return (
    <div className={`flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 ${isOverdue ? 'bg-red-50/50 -mx-3 px-3 rounded-lg' : ''}`}>
      <button
        onClick={() => onComplete(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors hover:bg-green-100 ${
          task.status === 'COMPLETED'
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {task.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-white" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${priorityColors[task.priority] || 'bg-gray-400'}`} />
          <p className={`text-sm font-medium ${task.status === 'COMPLETED' ? 'line-through text-gray-400' : 'text-gray-900'} truncate`}>
            {task.title}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {task.lead && (
            <Link href={`/counselor/leads/${task.lead.id}`} className="text-xs text-indigo-600 hover:underline">
              {task.lead.studentName}
            </Link>
          )}
          <span className={`text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
            {isOverdue ? 'Overdue' : format(new Date(task.dueDate), 'h:mm a')}
          </span>
        </div>
      </div>
      {task.lead?.phone && (
        <a
          href={`tel:${task.lead.phone}`}
          className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}

// ─── Follow-Up Card ──────────────────────────────────────────────────────────

function FollowUpCard({ lead }: { lead: any }) {
  const isOverdue = lead.nextFollowUpAt && isPast(new Date(lead.nextFollowUpAt))

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${isOverdue ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
      <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        {lead.studentName?.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/counselor/leads/${lead.id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600 truncate block">
          {lead.studentName}
        </Link>
        <p className={`text-xs ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
          {isOverdue
            ? `Overdue ${formatDistanceToNow(new Date(lead.nextFollowUpAt), { addSuffix: false })}`
            : lead.nextFollowUpAt
              ? format(new Date(lead.nextFollowUpAt), 'MMM d, h:mm a')
              : 'No date set'}
        </p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <a
          href={`https://wa.me/91${lead.phone?.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 hover:bg-green-50 rounded-lg text-gray-400 hover:text-green-600 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </a>
        <a
          href={`tel:${lead.phone}`}
          className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

export default function CounselorDashboard() {
  const [tasks, setTasks] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [kpis, setKpis] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      setLoading(true)

      // Fetch tasks, leads, and KPIs in parallel
      const [tasksRes, leadsRes, kpisRes] = await Promise.allSettled([
        fetch('/api/counselor/tasks', { credentials: 'include' }),
        fetch('/api/counselor/leads', { credentials: 'include' }),
        fetch('/api/counselor/kpis?period=weekly', { credentials: 'include' }),
      ])

      if (tasksRes.status === 'fulfilled' && tasksRes.value.ok) {
        const data = await tasksRes.value.json()
        setTasks(data.data || [])
      }

      if (leadsRes.status === 'fulfilled' && leadsRes.value.ok) {
        const data = await leadsRes.value.json()
        setLeads(data.data || [])
      }

      if (kpisRes.status === 'fulfilled' && kpisRes.value.ok) {
        const data = await kpisRes.value.json()
        setKpis(data.data || null)
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCompleteTask(taskId: string) {
    try {
      const res = await fetch(`/api/counselor/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'COMPLETED' }),
      })
      if (res.ok) {
        setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: 'COMPLETED' } : t)))
        showToast.success('Task completed!')
      }
    } catch {
      showToast.error('Failed to complete task')
    }
  }

  const greeting = getGreeting()
  const todayTasks = tasks.filter((t) => isToday(new Date(t.dueDate)) && t.status !== 'COMPLETED')
  const overdueTasks = tasks.filter((t) => isPast(new Date(t.dueDate)) && !isToday(new Date(t.dueDate)) && t.status !== 'COMPLETED')
  const completedToday = tasks.filter((t) => isToday(new Date(t.dueDate)) && t.status === 'COMPLETED')
  const overdueFollowUps = leads.filter((l: any) => l.nextFollowUpAt && isPast(new Date(l.nextFollowUpAt)))
  const upcomingFollowUps = leads
    .filter((l: any) => l.nextFollowUpAt && !isPast(new Date(l.nextFollowUpAt)))
    .sort((a: any, b: any) => new Date(a.nextFollowUpAt).getTime() - new Date(b.nextFollowUpAt).getTime())
    .slice(0, 5)
  const newLeadsToday = leads.filter((l: any) => isToday(new Date(l.createdAt)))
  const hotLeads = leads.filter((l: any) => l.priority === 'HOT' && l.stage !== 'ENROLLED' && l.stage !== 'LOST')

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ─── Greeting Banner ─── */}
      <div className={`bg-gradient-to-r ${greeting.gradient} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {greeting.icon}
              <h1 className="text-2xl font-bold">{greeting.text}!</h1>
            </div>
            <p className="text-white/80 text-sm">
              {format(new Date(), 'EEEE, MMMM d, yyyy')} •{' '}
              {todayTasks.length + overdueTasks.length} tasks pending
              {overdueFollowUps.length > 0 && ` • ${overdueFollowUps.length} overdue follow-ups`}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <p className="text-white/60 text-xs">Completed Today</p>
              <p className="text-3xl font-bold">{completedToday.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Quick Stats ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction
          icon={AlertTriangle}
          label="Overdue Tasks"
          value={overdueTasks.length}
          href="/counselor/tasks"
          color="text-red-600"
          bgColor="bg-red-100"
        />
        <QuickAction
          icon={Users}
          label="New Leads Today"
          value={newLeadsToday.length}
          href="/counselor/leads"
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <QuickAction
          icon={Zap}
          label="Hot Leads"
          value={hotLeads.length}
          href="/counselor/leads"
          color="text-orange-600"
          bgColor="bg-orange-100"
        />
        <QuickAction
          icon={Target}
          label="Weekly Conversions"
          value={kpis?.metrics?.leadsConverted || 0}
          href="/counselor/analytics"
          color="text-green-600"
          bgColor="bg-green-100"
        />
      </div>

      {/* ─── Main Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overdue Tasks Alert */}
          {overdueTasks.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-sm font-bold text-red-800">
                  {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''}
                </h2>
              </div>
              <div className="space-y-0">
                {overdueTasks.slice(0, 5).map((task) => (
                  <TaskItem key={task.id} task={task} onComplete={handleCompleteTask} />
                ))}
              </div>
              {overdueTasks.length > 5 && (
                <Link href="/counselor/tasks" className="text-xs text-red-600 hover:underline mt-2 inline-block">
                  View all {overdueTasks.length} overdue tasks →
                </Link>
              )}
            </div>
          )}

          {/* Today's Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">Today&apos;s Tasks</h2>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                  {todayTasks.length}
                </span>
              </div>
              <Link href="/counselor/tasks" className="text-xs text-indigo-600 hover:underline font-medium">
                View All →
              </Link>
            </div>

            {todayTasks.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">All caught up for today!</p>
              </div>
            ) : (
              <div>
                {todayTasks.slice(0, 8).map((task) => (
                  <TaskItem key={task.id} task={task} onComplete={handleCompleteTask} />
                ))}
              </div>
            )}
          </div>

          {/* Weekly KPIs Summary */}
          {kpis?.metrics && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">This Week&apos;s Performance</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-700">{kpis.metrics.callsMade || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Calls Made</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-700">{kpis.metrics.whatsappsSent || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">WhatsApps</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-purple-700">{kpis.metrics.demosCompleted || 0}</p>
                  <p className="text-xs text-gray-500 mt-1">Demos Done</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-emerald-700">
                    ₹{((kpis.metrics.revenueGenerated || 0) / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Revenue</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Follow-ups + Hot Leads */}
        <div className="space-y-6">
          {/* Overdue Follow-ups */}
          {overdueFollowUps.length > 0 && (
            <div className="bg-white rounded-xl border border-red-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-bold text-red-800">Overdue Follow-ups</h3>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                  {overdueFollowUps.length}
                </span>
              </div>
              <div className="space-y-2">
                {overdueFollowUps.slice(0, 5).map((lead: any) => (
                  <FollowUpCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Follow-ups */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-gray-700">Upcoming Follow-ups</h3>
            </div>
            {upcomingFollowUps.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No upcoming follow-ups</p>
            ) : (
              <div className="space-y-2">
                {upcomingFollowUps.map((lead: any) => (
                  <FollowUpCard key={lead.id} lead={lead} />
                ))}
              </div>
            )}
          </div>

          {/* Hot Leads */}
          {hotLeads.length > 0 && (
            <div className="bg-white rounded-xl border border-orange-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-orange-500" />
                <h3 className="text-sm font-bold text-orange-800">Hot Leads</h3>
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                  {hotLeads.length}
                </span>
              </div>
              <div className="space-y-2">
                {hotLeads.slice(0, 5).map((lead: any) => (
                  <FollowUpCard key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
