'use client'

import React from 'react'
import { WallOfAchievers } from '@/components/wall-of-achievers/WallOfAchievers'

export default function WallOfAchieversPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <WallOfAchievers />
      </div>
    </div>
  )
}
