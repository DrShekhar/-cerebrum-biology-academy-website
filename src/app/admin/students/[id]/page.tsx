'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { StudentAcademicsSection } from '@/components/counselor/StudentAcademicsSection'

/**
 * Admin student drill-down (roadmap P3 staff academic visibility).
 * Renders the consolidated academics payload from
 * GET /api/counselor/students/[id]/academics (ADMIN allowed) — grade/courses,
 * test scores, homework + teacher feedback, attendance, enrollments and
 * payments — for the student picked on /admin/students.
 */
export default function AdminStudentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span>/</span>
          <Link href="/admin/students" className="hover:text-blue-600 transition-colors">
            Students
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Detail</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Details</h1>
          <p className="text-gray-600 mt-1">
            Academic snapshot — courses, test scores, homework feedback, attendance and payments
          </p>
        </div>

        {id && <StudentAcademicsSection userId={id} showPayments />}
      </div>
    </AdminLayout>
  )
}
