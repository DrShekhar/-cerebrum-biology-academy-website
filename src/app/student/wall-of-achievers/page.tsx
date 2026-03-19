'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Trophy, Star, TrendingUp, Award, GraduationCap, ChevronRight } from 'lucide-react'
import { successStoriesData } from '@/data/successStories'

const galleryImages = [
  '/images/gallery/img-2854.jpg',
  '/images/gallery/teachers-day-mgr.png',
  '/images/gallery/shekhar-sir-dean-south-city.png',
  '/images/gallery/shekhar-sir-welcome-mgr.png',
  '/images/gallery/untitled-design-7.png',
  '/images/gallery/untitled-design-8.png',
  '/images/gallery/untitled-design-11.png',
  '/images/gallery/untitled-design-16.png',
  '/images/gallery/untitled-design-17.png',
  '/images/gallery/warm-welcome-by-mgr-staff.png',
]

function AutoScrollBanner() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let position = 0
    const speed = 0.5

    function animate() {
      position += speed
      if (position >= el!.scrollWidth / 2) {
        position = 0
      }
      el!.scrollLeft = position
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const doubledImages = [...galleryImages, ...galleryImages]

  return (
    <div className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-10 pointer-events-none" />
      <div
        ref={scrollRef}
        className="flex gap-3 py-4 overflow-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {doubledImages.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-48 h-32 md:w-64 md:h-40 relative rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={`Cerebrum Academy moment ${(i % galleryImages.length) + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const categoryIcons: Record<string, { icon: typeof Trophy; color: string; bg: string }> = {
  topper: { icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
  improvement: { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
  dropper: { icon: Award, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  repeater: { icon: Star, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
}

function AchieverCard({ story }: { story: (typeof successStoriesData)[0] }) {
  const config = categoryIcons[story.category] || categoryIcons.topper
  const Icon = config.icon

  return (
    <div className={`rounded-2xl border-2 p-6 transition-all hover:shadow-xl hover:-translate-y-1 ${config.bg}`}>
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {story.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          {story.rank <= 500 && (
            <span className="absolute -top-1 -right-1 text-2xl">
              {story.rank <= 100 ? '🥇' : story.rank <= 300 ? '🥈' : '🥉'}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900">{story.studentName}</h3>
            {story.featured && (
              <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">STAR</span>
            )}
          </div>
          <p className="text-sm font-semibold text-blue-700 mb-1">{story.college}</p>
          <p className="text-xs text-gray-500 mb-3">{story.school} | {story.year}</p>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center p-2 bg-white/70 rounded-xl">
              <div className="text-lg font-bold text-gray-900">{story.neetScore}</div>
              <div className="text-xs text-gray-500">NEET Score</div>
            </div>
            <div className="text-center p-2 bg-white/70 rounded-xl">
              <div className="text-lg font-bold text-gray-900">AIR {story.rank}</div>
              <div className="text-xs text-gray-500">Rank</div>
            </div>
            <div className="text-center p-2 bg-white/70 rounded-xl">
              <div className="text-lg font-bold text-green-600">+{story.improvement}</div>
              <div className="text-xs text-gray-500">Improvement</div>
            </div>
          </div>

          <blockquote className="text-sm text-gray-600 italic border-l-3 border-gray-300 pl-3 line-clamp-2">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className={`w-4 h-4 ${config.color}`} />
          <span className={`text-xs font-medium ${config.color} capitalize`}>{story.category}</span>
        </div>
        <span className="text-xs text-gray-400">{story.achievement}</span>
      </div>
    </div>
  )
}

export default function StudentWallOfAchieversPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [apiAchievers, setApiAchievers] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/wall-of-achievers?limit=50')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.achievers?.length > 0) {
          setApiAchievers(d.data.achievers)
        }
      })
      .catch(() => {})
  }, [])

  const stories = selectedCategory
    ? successStoriesData.filter((s) => s.category === selectedCategory)
    : successStoriesData

  const categories = ['topper', 'improvement', 'dropper', 'repeater']

  const stats = [
    { label: 'Top Rankers', value: '180+', icon: Trophy, color: 'text-yellow-500' },
    { label: 'Avg Biology Score', value: '330+/360', icon: TrendingUp, color: 'text-green-500' },
    { label: 'AIIMS Selections', value: '67+', icon: GraduationCap, color: 'text-blue-500' },
    { label: 'Years of Excellence', value: '12+', icon: Award, color: 'text-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Auto-scrolling photo banner */}
      <AutoScrollBanner />

      {/* Hero */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white -mt-1">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-1.5 text-sm font-medium text-yellow-300 mb-4">
            <Trophy className="w-4 h-4" />
            Celebrating Excellence
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Wall of <span className="text-yellow-400">Achievers</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Meet the students who turned their NEET dreams into reality with Cerebrum Biology Academy.
            Every score, every rank — a story of dedication.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({successStoriesData.length})
            </button>
            {categories.map((cat) => {
              const config = categoryIcons[cat]
              const count = successStoriesData.filter((s) => s.category === cat).length
              if (count === 0) return null
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <config.icon className="w-4 h-4" />
                  <span className="capitalize">{cat}s ({count})</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achiever Cards */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <AchieverCard key={story.id} story={story} />
            ))}
          </div>

          {stories.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <Trophy className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No achievers in this category yet</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Name Could Be Here Next</h2>
          <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
            Join 680+ students who achieved their NEET dreams with Cerebrum. Start with a free demo class today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/book-free-demo"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              Book Free Demo
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              Call: 88264-44334
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
