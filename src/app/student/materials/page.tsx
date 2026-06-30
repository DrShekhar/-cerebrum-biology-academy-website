'use client'

/**
 * Student — Study Materials library.
 *
 * Consumes the (previously UI-less) entitlement-gated /api/student/materials and
 * lets enrolled students open/download their course materials. Documents open
 * via the gated /api/student/materials/[id]/download; video materials link to
 * the secure /learn player when a lecture is attached.
 */

import { useEffect, useState } from 'react'
import { BookOpen, FileText, Video, Download, Loader2, Search } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

interface Material {
  id: string
  title: string
  description?: string | null
  materialType: string
  course?: { id: string; name: string } | null
  chapter?: { id: string; title: string } | null
}

export default function StudentMaterialsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) {
      setLoading(false)
      return
    }
    setLoading(true)
    fetch('/api/student/materials?limit=200')
      .then((r) => r.json())
      .then((j) => setMaterials(j?.success ? j.materials : []))
      .catch(() => setMaterials([]))
      .finally(() => setLoading(false))
  }, [isAuthenticated, authLoading])

  const filtered = materials.filter(
    (m) =>
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.course?.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-blue-500" />
        <h1 className="mt-4 text-xl font-bold text-gray-900">Sign in to view your materials</h1>
        <a
          href="/sign-in"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Sign in
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Study Materials</h1>
        <p className="mb-6 text-gray-600">PDFs, notes and resources for the courses you&apos;re enrolled in.</p>

        <div className="relative mb-6">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials…"
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-8">
              <EmptyState
                icon={BookOpen}
                title={materials.length === 0 ? 'No materials yet' : 'No matches'}
                description={
                  materials.length === 0
                    ? 'Study materials for your enrolled courses will appear here once your teacher publishes them.'
                    : 'Try a different search term.'
                }
                primaryAction={{ label: 'My Courses', href: '/student/courses' }}
                size="md"
                variant="default"
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filtered.map((m) => {
              const isVideo = m.materialType?.toUpperCase().includes('VIDEO')
              return (
                <a
                  key={m.id}
                  href={`/api/student/materials/${m.id}/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    {isVideo ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">{m.title}</p>
                    <p className="truncate text-xs text-gray-500">
                      {[m.course?.name, m.chapter?.title].filter(Boolean).join(' • ') ||
                        m.materialType}
                    </p>
                  </div>
                  <Download className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
