'use client'

// Materials tab (roadmap P1): study materials from /api/student/materials
// (access-gated server-side). PDF cards with open/download, course name and
// a personal-assignment badge.

import React, { useState, useEffect } from 'react'
import { FileText, Download, Lock, FolderOpen, LogIn, UserCheck } from 'lucide-react'
import Link from 'next/link'

interface Material {
  id: string
  title: string
  description: string | null
  fileName: string | null
  fileSize: number | null
  fileUrl: string | null
  requiredTier: string | null
  tierLocked: boolean
  personallyAssigned?: boolean
  materialType: string | null
  category: string | null
  course: { id: string; name: string } | null
  chapter: { id: string; title: string } | null
  publishedAt: string | null
}

function formatFileSize(bytes: number | null): string | null {
  if (!bytes || bytes <= 0) return null
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function MaterialsTab() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    fetch('/api/student/materials?limit=100', { credentials: 'include' })
      .then((r) => {
        if (r.status === 401 || r.status === 403) {
          setUnauthorized(true)
          return null
        }
        return r.ok ? r.json() : null
      })
      .then((d) => {
        if (d?.success) setMaterials(d.materials ?? [])
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (unauthorized) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <LogIn className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Sign in to see materials</h3>
        <p className="text-sm text-gray-600">Study materials are available once you sign in.</p>
      </div>
    )
  }

  if (materials.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FolderOpen className="w-8 h-8 text-teal-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No study materials yet</h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Materials shared by your teachers — notes, worksheets and PDFs — will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {materials.map((m) => {
          const size = formatFileSize(m.fileSize)
          return (
            <div
              key={m.id}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-5 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    m.tierLocked ? 'bg-gray-100' : 'bg-teal-100'
                  }`}
                >
                  {m.tierLocked ? (
                    <Lock className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FileText className="w-5 h-5 text-teal-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {m.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {m.course && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium truncate max-w-[180px]">
                        {m.course.name}
                      </span>
                    )}
                    {m.personallyAssigned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        <UserCheck className="w-3 h-3" /> Assigned to you
                      </span>
                    )}
                    {m.materialType && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {m.materialType.replace(/_/g, ' ').toLowerCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {m.description && (
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3">
                  {m.description}
                </p>
              )}

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400 truncate">
                  {[m.chapter?.title, size].filter(Boolean).join(' • ') || m.fileName || ''}
                </span>
                {m.tierLocked ? (
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-semibold transition-colors flex-shrink-0"
                  >
                    <Lock className="w-3.5 h-3.5" /> Upgrade
                  </Link>
                ) : m.fileUrl ? (
                  <a
                    href={m.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xs font-semibold transition-colors flex-shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" /> Open
                  </a>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
