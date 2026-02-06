'use client'

import React, { useMemo, useState } from 'react'
import { Calendar } from 'lucide-react'

interface StudySession {
  id: string
  duration: number
  date: string
}

interface StudyHeatmapProps {
  sessions: StudySession[]
}

function getDayData(sessions: StudySession[]): Map<string, number> {
  const map = new Map<string, number>()
  sessions.forEach((s) => {
    const dateKey = new Date(s.date).toISOString().split('T')[0]
    map.set(dateKey, (map.get(dateKey) || 0) + s.duration)
  })
  return map
}

function getIntensityLevel(minutes: number): number {
  if (minutes === 0) return 0
  if (minutes < 15) return 1
  if (minutes < 60) return 2
  if (minutes < 120) return 3
  return 4
}

const INTENSITY_COLORS = [
  'bg-gray-100',
  'bg-green-200',
  'bg-green-400',
  'bg-green-600',
  'bg-green-800',
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

export function StudyHeatmap({ sessions }: StudyHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  const { grid, monthLabels, totalDays, activeDays, totalMinutes } = useMemo(() => {
    const dayData = getDayData(sessions)
    const today = new Date()
    const weeks = 26 // ~6 months of data
    const totalCells = weeks * 7

    // Find the start date (go back totalCells days from today, align to start of week)
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - totalCells + 1)
    // Align to Monday
    const startDay = startDate.getDay()
    const alignOffset = startDay === 0 ? -6 : 1 - startDay
    startDate.setDate(startDate.getDate() + alignOffset)

    const gridData: { date: string; minutes: number; level: number; dayOfWeek: number }[][] = []
    const labels: { month: string; weekIndex: number }[] = []
    let lastMonth = -1
    let active = 0
    let total = 0

    for (let w = 0; w < weeks; w++) {
      const week: typeof gridData[0] = []
      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(startDate)
        cellDate.setDate(cellDate.getDate() + w * 7 + d)
        const dateKey = cellDate.toISOString().split('T')[0]
        const minutes = dayData.get(dateKey) || 0
        const isFuture = cellDate > today

        if (cellDate.getMonth() !== lastMonth && !isFuture) {
          lastMonth = cellDate.getMonth()
          labels.push({ month: MONTHS[lastMonth], weekIndex: w })
        }

        week.push({
          date: dateKey,
          minutes: isFuture ? -1 : minutes,
          level: isFuture ? -1 : getIntensityLevel(minutes),
          dayOfWeek: d,
        })

        if (!isFuture && minutes > 0) {
          active++
          total += minutes
        }
      }
      gridData.push(week)
    }

    return {
      grid: gridData,
      monthLabels: labels,
      totalDays: totalCells,
      activeDays: active,
      totalMinutes: total,
    }
  }, [sessions])

  const cellSize = 12
  const gap = 2
  const leftPadding = 28
  const topPadding = 16

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-green-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Study Activity</h3>
        </div>
        <div className="text-xs text-gray-500">
          {activeDays} active days • {Math.round(totalMinutes / 60)}h total
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="relative" style={{ minWidth: grid.length * (cellSize + gap) + leftPadding }}>
          {/* Month Labels */}
          <div className="flex" style={{ paddingLeft: leftPadding, marginBottom: 4 }}>
            {monthLabels.map((label, idx) => (
              <span
                key={`${label.month}-${idx}`}
                className="text-[10px] text-gray-400 absolute"
                style={{ left: leftPadding + label.weekIndex * (cellSize + gap) }}
              >
                {label.month}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-px" style={{ paddingTop: topPadding }}>
            {/* Day labels */}
            <div className="flex flex-col" style={{ gap, width: leftPadding - 4 }}>
              {DAYS_LABELS.map((label, idx) => (
                <div
                  key={idx}
                  className="text-[9px] text-gray-400 flex items-center justify-end pr-1"
                  style={{ height: cellSize }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {grid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col" style={{ gap }}>
                {week.map((cell) => (
                  <div
                    key={cell.date}
                    className={`rounded-sm transition-colors ${
                      cell.level === -1
                        ? 'bg-gray-50'
                        : INTENSITY_COLORS[cell.level]
                    } ${cell.level >= 0 ? 'cursor-pointer hover:ring-1 hover:ring-gray-400' : ''}`}
                    style={{ width: cellSize, height: cellSize }}
                    onMouseEnter={(e) => {
                      if (cell.level < 0) return
                      const rect = e.currentTarget.getBoundingClientRect()
                      setTooltip({
                        text:
                          cell.minutes > 0
                            ? `${cell.minutes} min on ${new Date(cell.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                            : `No activity on ${new Date(cell.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      })
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[10px] text-gray-400">Less</span>
        {INTENSITY_COLORS.map((color, idx) => (
          <div
            key={idx}
            className={`rounded-sm ${color}`}
            style={{ width: cellSize, height: cellSize }}
          />
        ))}
        <span className="text-[10px] text-gray-400">More</span>
      </div>

      {/* Tooltip (positioned fixed so it works inside overflow) */}
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}
