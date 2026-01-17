'use client'

import React from 'react'
import { FileText, Star, Archive, FolderOpen } from 'lucide-react'

interface NoteStats {
  total: number
  active: number
  favorites: number
  archived: number
}

interface NoteStatsWidgetProps {
  stats: NoteStats
}

export function NoteStatsWidget({ stats }: NoteStatsWidgetProps) {
  const statItems = [
    {
      icon: FolderOpen,
      label: 'Total Notes',
      value: stats.total,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: FileText,
      label: 'Active',
      value: stats.active,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: Star,
      label: 'Favorites',
      value: stats.favorites,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      icon: Archive,
      label: 'Archived',
      value: stats.archived,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3"
        >
          <div className={`p-2 rounded-lg ${item.bg}`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
