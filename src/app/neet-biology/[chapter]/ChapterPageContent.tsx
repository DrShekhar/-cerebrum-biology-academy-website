'use client'

import Link from 'next/link'
import {
  Phone,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Target,
  FileText,
  Brain,
} from 'lucide-react'
import type { ChapterData } from '@/data/neet-biology-chapters'

export { type ChapterData }

export default function ChapterPageContent({
  chapter,
  chapterSlug,
}: {
  chapter: ChapterData
  chapterSlug: string
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-[#4a5d4a] text-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/neet-biology"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Chapters
          </Link>

          <div className="max-w-4xl animate-fadeInUp">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Class {chapter.class}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{chapter.unit}</span>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium">
                {chapter.weightage} Weightage
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{chapter.name} - NEET Biology</h1>

            <p className="text-lg text-green-100 mb-6 max-w-3xl">{chapter.description}</p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo-booking"
                className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Join Expert Classes
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-xl font-bold text-gray-800">{chapter.weightage}</div>
                <div className="text-gray-600 text-sm">NEET Weightage</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-xl font-bold text-gray-800">{chapter.questionsPerYear}</div>
                <div className="text-gray-600 text-sm">Questions/Year</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-xl font-bold text-gray-800">Class {chapter.class}</div>
                <div className="text-gray-600 text-sm">NCERT Level</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Brain className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-xl font-bold text-gray-800">{chapter.keyTopics.length}</div>
                <div className="text-gray-600 text-sm">Key Topics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Topics */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fadeInUp">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Key Topics in {chapter.name}
                </h2>
                <ul className="space-y-2">
                  {chapter.keyTopics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Concepts */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fadeInUp">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  Important Concepts for NEET
                </h2>
                <div className="flex flex-wrap gap-2">
                  {chapter.importantConcepts.map((concept, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* NEET Tips */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-100 animate-fadeInUp">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  NEET Preparation Tips for {chapter.name}
                </h2>
                <ul className="space-y-3">
                  {chapter.neetTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-[#4a5d4a] rounded-xl p-6 text-white animate-fadeInUp">
                <h3 className="font-bold text-lg mb-3">Master {chapter.name}</h3>
                <p className="text-green-100 text-sm mb-4">
                  Join our expert-led classes for in-depth understanding and guaranteed NEET success.
                </p>
                <Link
                  href="/demo-booking"
                  className="block w-full bg-white text-green-700 py-3 rounded-lg font-semibold text-center hover:bg-green-50 transition-colors"
                >
                  Book Free Demo
                </Link>
                <Link
                  href="tel:+918826444334"
                  className="flex items-center justify-center gap-2 mt-3 text-green-100 hover:text-white"
                >
                  <Phone className="w-4 h-4" />
                  Call: 8826444334
                </Link>
              </div>

              {/* Related Chapters */}
              {chapter.relatedChapters.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fadeInUp">
                  <h3 className="font-bold text-gray-800 mb-4">Related Chapters</h3>
                  <div className="space-y-2">
                    {chapter.relatedChapters.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/neet-biology/${related.slug}`}
                        className="block p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors group"
                      >
                        <span className="text-gray-700 group-hover:text-green-700 font-medium">
                          {related.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fadeInUp">
                <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/neet-biology"
                    className="block p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    All Biology Chapters
                  </Link>
                  <Link
                    href="/neet-2025-preparation"
                    className="block p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    NEET 2026 Preparation
                  </Link>
                  <Link
                    href="/courses"
                    className="block p-3 bg-gray-50 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    Our Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need Help with {chapter.name}?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our expert faculty can help you master this chapter and score high in NEET Biology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo-booking"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Book Free Demo Class
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/neet-biology"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-green-200"
            >
              <ArrowLeft className="w-5 h-5" />
              All Chapters
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
