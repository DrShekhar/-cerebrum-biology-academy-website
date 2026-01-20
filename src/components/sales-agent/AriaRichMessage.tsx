/**
 * ARIA Sales Agent - Rich Message Renderer
 * Renders cards, carousels, images, and rich content within chat
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Users,
  GraduationCap,
  Award,
} from 'lucide-react'
import type { Language } from '@/lib/aria/types'

// Rich message types
export type RichMessageType = 'card' | 'carousel' | 'image' | 'pdf' | 'success-story' | 'faculty'

export interface RichCard {
  title: string
  description: string
  imageUrl?: string
  price?: string
  features?: string[]
  ctaText?: string
  ctaAction?: () => void
  badge?: string
}

export interface RichCarouselItem extends RichCard {
  id: string
}

export interface RichPDF {
  title: string
  description?: string
  url: string
  thumbnailUrl?: string
}

export interface RichImage {
  url: string
  alt: string
  caption?: string
}

export interface SuccessStory {
  name: string
  photo?: string
  rank: string
  college: string
  quote: string
  batch: string
}

export interface FacultyProfile {
  name: string
  title: string
  photo?: string
  credentials: string[]
  experience: string
}

interface AriaRichMessageProps {
  type: RichMessageType
  language: Language
  data: RichCard | RichCarouselItem[] | RichPDF | RichImage | SuccessStory | FacultyProfile
}

// Course Card Component
function CourseCard({
  card,
  language,
  compact = false,
}: {
  card: RichCard
  language: Language
  compact?: boolean
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ${
        compact ? 'max-w-[200px]' : 'w-full'
      }`}
    >
      {card.imageUrl && (
        <div className="relative h-24 w-full bg-gradient-to-br from-green-500 to-teal-600">
          {card.badge && (
            <span className="absolute right-2 top-2 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-semibold text-yellow-900">
              {card.badge}
            </span>
          )}
          <div className="absolute bottom-2 left-2 right-2">
            <h4 className="text-sm font-semibold text-white drop-shadow">{card.title}</h4>
          </div>
        </div>
      )}

      <div className="p-3">
        {!card.imageUrl && (
          <h4 className="mb-1 text-sm font-semibold text-slate-800">{card.title}</h4>
        )}
        <p className="mb-2 text-xs text-slate-600 line-clamp-2">{card.description}</p>

        {card.features && card.features.length > 0 && (
          <ul className="mb-2 space-y-1">
            {card.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-1 text-[10px] text-slate-500">
                <span className="mt-0.5 text-green-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {card.price && (
          <div className="mb-2 text-sm font-bold text-green-600">{card.price}</div>
        )}

        {card.ctaText && card.ctaAction && (
          <button
            onClick={card.ctaAction}
            className="w-full rounded-md bg-green-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-600"
          >
            {card.ctaText}
          </button>
        )}
      </div>
    </div>
  )
}

// Carousel Component
function Carousel({
  items,
  language,
}: {
  items: RichCarouselItem[]
  language: Language
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((i) => (i + 1) % items.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + items.length) % items.length)

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 px-1">
              <CourseCard card={item} language={language} />
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </button>

          <div className="mt-2 flex justify-center gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-green-500' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// PDF Preview Component
function PDFPreview({ pdf, language }: { pdf: RichPDF; language: Language }) {
  return (
    <a
      href={pdf.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-green-300 hover:bg-green-50"
    >
      <div className="flex h-12 w-10 items-center justify-center rounded bg-red-100 text-red-600">
        <Download className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-slate-800">{pdf.title}</h4>
        {pdf.description && (
          <p className="text-xs text-slate-500">{pdf.description}</p>
        )}
      </div>
      <ExternalLink className="h-4 w-4 text-slate-400" />
    </a>
  )
}

// Rich Image Component
function RichImageDisplay({ image }: { image: RichImage }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="relative h-40 w-full">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 400px) 100vw, 400px"
        />
      </div>
      {image.caption && (
        <div className="bg-slate-50 p-2">
          <p className="text-xs text-slate-600">{image.caption}</p>
        </div>
      )}
    </div>
  )
}

// Success Story Card
function SuccessStoryCard({
  story,
  language,
}: {
  story: SuccessStory
  language: Language
}) {
  return (
    <div className="rounded-lg border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-3">
      <div className="mb-2 flex items-center gap-3">
        {story.photo ? (
          <Image
            src={story.photo}
            alt={story.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-200 text-yellow-700">
            <GraduationCap className="h-5 w-5" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold text-slate-800">{story.name}</h4>
          <div className="flex items-center gap-1 text-xs text-yellow-700">
            <Award className="h-3 w-3" />
            {story.rank}
          </div>
        </div>
      </div>

      <p className="mb-2 text-xs italic text-slate-600">"{story.quote}"</p>

      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>{story.college}</span>
        <span>Batch {story.batch}</span>
      </div>
    </div>
  )
}

// Faculty Profile Card
function FacultyCard({
  faculty,
  language,
}: {
  faculty: FacultyProfile
  language: Language
}) {
  return (
    <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-3">
      <div className="mb-2 flex items-center gap-3">
        {faculty.photo ? (
          <Image
            src={faculty.photo}
            alt={faculty.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700">
            <Users className="h-6 w-6" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold text-slate-800">{faculty.name}</h4>
          <p className="text-xs text-blue-600">{faculty.title}</p>
        </div>
      </div>

      <div className="mb-2 flex flex-wrap gap-1">
        {faculty.credentials.slice(0, 3).map((cred, i) => (
          <span
            key={i}
            className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-700"
          >
            {cred}
          </span>
        ))}
      </div>

      <p className="text-xs text-slate-600">{faculty.experience}</p>
    </div>
  )
}

// Main Rich Message Component
export function AriaRichMessage({ type, language, data }: AriaRichMessageProps) {
  switch (type) {
    case 'card':
      return <CourseCard card={data as RichCard} language={language} />

    case 'carousel':
      return <Carousel items={data as RichCarouselItem[]} language={language} />

    case 'pdf':
      return <PDFPreview pdf={data as RichPDF} language={language} />

    case 'image':
      return <RichImageDisplay image={data as RichImage} />

    case 'success-story':
      return <SuccessStoryCard story={data as SuccessStory} language={language} />

    case 'faculty':
      return <FacultyCard faculty={data as FacultyProfile} language={language} />

    default:
      return null
  }
}
