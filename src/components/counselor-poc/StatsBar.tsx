'use client'

import React from 'react'

interface StatCardProps {
  icon: string
  label: string
  value: string | number
  color: string
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div className="flex-1">
          <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">{label}</div>
          <div className="text-2xl font-bold text-gray-900 mt-0.5">{value}</div>
        </div>
      </div>
    </div>
  )
}

export function StatsBar() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📊 Today&apos;s Overview
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">Real-time performance metrics</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Welcome back,</p>
          <p className="text-lg font-semibold text-indigo-600">Rashmi 👋</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🆕" label="New Leads" value={5} color="text-blue-600" />
        <StatCard icon="🎯" label="Demos Today" value={3} color="text-purple-600" />
        <StatCard icon="✅" label="Tasks Due" value={8} color="text-orange-600" />
        <StatCard icon="💰" label="Revenue Today" value="₹45K" color="text-green-600" />
      </div>
    </div>
  )
}
