/**
 * Admin sidebar navigation — the single source of truth.
 *
 * Every /admin page must appear here (verified by scripts/audit-admin-nav.mjs).
 * badgeKey references a count from GET /api/admin/nav-counts; no hardcoded
 * badge numbers, ever.
 */

import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Calendar,
  CalendarClock,
  Users,
  UserCog,
  BookOpen,
  GraduationCap,
  CreditCard,
  MessageSquare,
  MessagesSquare,
  Megaphone,
  BarChart3,
  Settings,
  Bell,
  FileText,
  Upload,
  FolderOpen,
  ClipboardCheck,
  PenTool,
  Image,
  Layers,
  FlaskConical,
  Activity,
  Gauge,
  HelpCircle,
  ListChecks,
  Inbox,
} from 'lucide-react'

export type NavBadgeKey = 'newLeads' | 'pendingDemoBookings' | 'unreadInquiries' | 'pendingPayments'

export interface AdminNavItem {
  id: string
  name: string
  icon: LucideIcon
  href: string
  badgeKey?: NavBadgeKey
  children?: AdminNavItem[]
}

export const ADMIN_NAV: AdminNavItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { id: 'team-chat', name: 'Team Chat', icon: MessagesSquare, href: '/admin/team-chat' },
  {
    id: 'whatsapp-inbox',
    name: 'WhatsApp Inbox',
    icon: MessagesSquare,
    href: '/admin/whatsapp-inbox',
  },
  {
    id: 'demo-bookings',
    name: 'Demo Bookings',
    icon: Calendar,
    href: '/admin/demo-bookings',
    badgeKey: 'pendingDemoBookings',
    children: [
      {
        id: 'demo-bookings-all',
        name: 'All Bookings',
        icon: Calendar,
        href: '/admin/demo-bookings',
      },
      { id: 'demo-slots', name: 'Demo Slots', icon: CalendarClock, href: '/admin/demo-slots' },
    ],
  },
  {
    id: 'students',
    name: 'Students & Leads',
    icon: Users,
    href: '/admin/students',
    badgeKey: 'newLeads',
    children: [
      { id: 'all-students', name: 'All Students', icon: Users, href: '/admin/students' },
      {
        id: 'active-students',
        name: 'Active Students',
        icon: Users,
        href: '/admin/students/active',
      },
      {
        id: 'leads',
        name: 'Leads',
        icon: Users,
        href: '/admin/students/leads',
        badgeKey: 'newLeads',
      },
      {
        id: 'inquiries',
        name: 'Inquiries',
        icon: Inbox,
        href: '/admin/inquiries',
        badgeKey: 'unreadInquiries',
      },
      { id: 'parents', name: 'Parents', icon: Users, href: '/admin/parents' },
      { id: 'groups', name: 'Groups / Batches', icon: Layers, href: '/admin/groups' },
    ],
  },
  {
    id: 'courses',
    name: 'Courses',
    icon: BookOpen,
    href: '/admin/courses',
    children: [
      {
        id: 'course-management',
        name: 'Course Management',
        icon: BookOpen,
        href: '/admin/courses',
      },
      {
        id: 'enrollments',
        name: 'Enrollments',
        icon: GraduationCap,
        href: '/admin/courses/enrollments',
      },
      {
        id: 'performance',
        name: 'Performance',
        icon: BarChart3,
        href: '/admin/courses/performance',
      },
      { id: 'timetable', name: 'Timetable', icon: CalendarClock, href: '/admin/timetable' },
    ],
  },
  {
    id: 'lms',
    name: 'LMS',
    icon: FolderOpen,
    href: '/admin/lms/materials',
    children: [
      { id: 'lms-materials', name: 'Materials', icon: FolderOpen, href: '/admin/lms/materials' },
      {
        id: 'lms-materials-upload',
        name: 'Upload Material',
        icon: Upload,
        href: '/admin/lms/materials/upload',
      },
      {
        id: 'lms-chapters',
        name: 'Chapters & Topics',
        icon: BookOpen,
        href: '/admin/lms/chapters',
      },
      {
        id: 'lms-videos-upload',
        name: 'Upload Video',
        icon: Upload,
        href: '/admin/lms/videos/upload',
      },
      {
        id: 'lms-questions',
        name: 'Question Review',
        icon: ClipboardCheck,
        href: '/admin/lms/questions/review',
      },
      { id: 'lms-analytics', name: 'LMS Analytics', icon: BarChart3, href: '/admin/lms/analytics' },
    ],
  },
  {
    id: 'tests',
    name: 'Tests & MCQ',
    icon: ClipboardCheck,
    href: '/admin/tests',
    children: [
      { id: 'tests-all', name: 'Test Templates', icon: ClipboardCheck, href: '/admin/tests' },
      { id: 'tests-create', name: 'Create Test', icon: PenTool, href: '/admin/tests/create' },
      {
        id: 'tests-analytics',
        name: 'Test Analytics',
        icon: BarChart3,
        href: '/admin/tests/analytics',
      },
      { id: 'mcq-hub', name: 'MCQ Hub', icon: ListChecks, href: '/admin/mcq' },
      {
        id: 'mcq-moderation',
        name: 'MCQ Moderation',
        icon: ClipboardCheck,
        href: '/admin/mcq/moderation',
      },
      {
        id: 'mcq-errors',
        name: 'MCQ Error Reports',
        icon: HelpCircle,
        href: '/admin/mcq/error-reports',
      },
      { id: 'omr', name: 'OMR Evaluation', icon: ClipboardCheck, href: '/admin/omr' },
      { id: 'omr-results', name: 'OMR Results', icon: BarChart3, href: '/admin/omr/results' },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    icon: CreditCard,
    href: '/admin/payments',
    badgeKey: 'pendingPayments',
    children: [
      { id: 'all-payments', name: 'All Payments', icon: CreditCard, href: '/admin/payments' },
      {
        id: 'payments-pending',
        name: 'Pending',
        icon: CreditCard,
        href: '/admin/payments/pending',
        badgeKey: 'pendingPayments',
      },
      { id: 'payments-failed', name: 'Failed', icon: CreditCard, href: '/admin/payments/failed' },
      {
        id: 'payments-refunds',
        name: 'Refunds',
        icon: CreditCard,
        href: '/admin/payments/refunds',
      },
      { id: 'coupons', name: 'Coupons', icon: CreditCard, href: '/admin/coupons' },
      { id: 'fee-plans', name: 'Fee Plans', icon: CreditCard, href: '/admin/fee-plans' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: MessageSquare,
    href: '/admin/marketing',
    children: [
      {
        id: 'campaigns',
        name: 'Campaigns',
        icon: MessageSquare,
        href: '/admin/marketing/campaigns',
      },
      {
        id: 'marketing-whatsapp',
        name: 'WhatsApp',
        icon: MessageSquare,
        href: '/admin/marketing/whatsapp',
      },
      { id: 'marketing-email', name: 'Email', icon: MessageSquare, href: '/admin/marketing/email' },
      {
        id: 'abandoned-carts',
        name: 'Abandoned Carts',
        icon: MessageSquare,
        href: '/admin/marketing/abandoned-carts',
      },
      { id: 'ab-testing', name: 'A/B Testing', icon: FlaskConical, href: '/admin/ab-testing' },
      { id: 'alerts', name: 'Alerts', icon: Bell, href: '/admin/alerts' },
      { id: 'notices', name: 'Announcements', icon: Megaphone, href: '/admin/notices' },
    ],
  },
  {
    id: 'content',
    name: 'Content',
    icon: PenTool,
    href: '/admin/content',
    children: [
      { id: 'content-hub', name: 'Content Hub', icon: PenTool, href: '/admin/content' },
      { id: 'content-drafts', name: 'Drafts', icon: FileText, href: '/admin/content/drafts' },
      {
        id: 'content-analytics',
        name: 'Content Analytics',
        icon: BarChart3,
        href: '/admin/content/analytics',
      },
      {
        id: 'content-keywords',
        name: 'Keywords (GSC)',
        icon: FileText,
        href: '/admin/content/keywords',
      },
      { id: 'gallery', name: 'Gallery', icon: Image, href: '/admin/gallery' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
    children: [
      { id: 'analytics-overview', name: 'Overview', icon: BarChart3, href: '/admin/analytics' },
      {
        id: 'analytics-behavior',
        name: 'Behavior',
        icon: Activity,
        href: '/admin/analytics/behavior',
      },
      {
        id: 'analytics-conversion',
        name: 'Conversion',
        icon: BarChart3,
        href: '/admin/analytics/conversion',
      },
      {
        id: 'analytics-reports',
        name: 'Reports',
        icon: FileText,
        href: '/admin/analytics/reports',
      },
      {
        id: 'analytics-whatsapp',
        name: 'WhatsApp Analytics',
        icon: MessageSquare,
        href: '/admin/analytics/whatsapp',
      },
    ],
  },
  {
    id: 'ops',
    name: 'Operations',
    icon: Gauge,
    href: '/admin/vitals',
    children: [
      { id: 'vitals', name: 'Web Vitals', icon: Gauge, href: '/admin/vitals' },
      { id: 'ai-monitoring', name: 'AI Monitoring', icon: Activity, href: '/admin/ai-monitoring' },
    ],
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    href: '/admin/settings',
    children: [
      { id: 'settings-general', name: 'General', icon: Settings, href: '/admin/settings/general' },
      { id: 'settings-users', name: 'Users', icon: Users, href: '/admin/settings/users' },
      { id: 'settings-faculty', name: 'Faculty', icon: UserCog, href: '/admin/settings/faculty' },
      {
        id: 'settings-notifications',
        name: 'Notifications',
        icon: Bell,
        href: '/admin/settings/notifications',
      },
      {
        id: 'settings-security',
        name: 'Security',
        icon: Settings,
        href: '/admin/settings/security',
      },
      {
        id: 'settings-integrations',
        name: 'Integrations',
        icon: Settings,
        href: '/admin/settings/integrations',
      },
    ],
  },
]
