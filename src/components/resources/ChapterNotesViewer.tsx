'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  Bookmark,
  ShareIcon,
  Search,
  Star,
  Clock,
  Download,
} from 'lucide-react'
import { Bookmark as BookmarkSolidIcon } from 'lucide-react'

interface ChapterNote {
  id: string
  title: string
  curriculum: string
  grade: string
  chapter: string
  topic: string
  content: string // Markdown content
  summary: string
  keyPoints: string[]
  diagrams: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  estimatedTime: number // minutes
  downloadCount: number
  viewCount: number
  rating: number
  tags: string[]
  isBookmarked?: boolean
}

interface ChapterNotesViewerProps {
  className?: string
}

const ChapterNotesViewer = ({ className }: ChapterNotesViewerProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCurriculum, setSelectedCurriculum] = useState('All')
  const [selectedGrade, setSelectedGrade] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Sample data - in real implementation, this would come from API
  const sampleNotes: ChapterNote[] = [
    {
      id: '1',
      title: 'Cell Structure and Function',
      curriculum: 'NEET',
      grade: 'CLASS_11',
      chapter: 'The Cell',
      topic: 'Cell Biology',
      content:
        '# Cell Structure and Function\n\n## Introduction\nThe cell is the basic structural and functional unit of life...',
      summary: 'Comprehensive overview of cell structure, organelles, and their functions',
      keyPoints: [
        'Cell membrane controls entry and exit of substances',
        'Nucleus contains DNA and controls cell activities',
        'Mitochondria are powerhouses of the cell',
        'Ribosomes synthesize proteins',
      ],
      diagrams: ['/images/cell-structure.jpg', '/images/organelles.jpg'],
      difficulty: 'Medium',
      estimatedTime: 25,
      downloadCount: 1250,
      viewCount: 5420,
      rating: 4.8,
      tags: ['cell', 'organelles', 'membrane', 'nucleus'],
      isBookmarked: true,
    },
    {
      id: '2',
      title: 'Photosynthesis Process',
      curriculum: 'CBSE',
      grade: 'CLASS_12',
      chapter: 'Plant Physiology',
      topic: 'Plant Biology',
      content:
        '# Photosynthesis\n\n## Light Reactions\nPhotosynthesis occurs in two main phases...',
      summary: 'Detailed explanation of photosynthesis process and its significance',
      keyPoints: [
        'Light reactions occur in thylakoids',
        'Calvin cycle happens in stroma',
        'Chlorophyll captures light energy',
        'ATP and NADPH are produced',
      ],
      diagrams: ['/images/photosynthesis.jpg', '/images/calvin-cycle.jpg'],
      difficulty: 'Hard',
      estimatedTime: 35,
      downloadCount: 980,
      viewCount: 3200,
      rating: 4.6,
      tags: ['photosynthesis', 'chloroplast', 'light reactions', 'calvin cycle'],
    },
    {
      id: '3',
      title: 'DNA Replication',
      curriculum: 'NEET',
      grade: 'CLASS_12',
      chapter: 'Genetics',
      topic: 'Molecular Biology',
      content:
        '# DNA Replication\n\n## Overview\nDNA replication is a semi-conservative process...',
      summary: 'Step-by-step process of DNA replication and key enzymes involved',
      keyPoints: [
        'DNA replication is semi-conservative',
        'DNA helicase unwinds the double helix',
        'DNA polymerase synthesizes new strands',
        'Okazaki fragments form on lagging strand',
      ],
      diagrams: ['/images/dna-replication.jpg', '/images/replication-fork.jpg'],
      difficulty: 'Hard',
      estimatedTime: 40,
      downloadCount: 1500,
      viewCount: 4800,
      rating: 4.9,
      tags: ['dna', 'replication', 'helicase', 'polymerase'],
    },
  ]

  const curriculums = ['All', 'NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE']
  const grades = ['All', 'CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12']
  const difficulties = ['All', 'Easy', 'Medium', 'Hard']

  const filteredNotes = sampleNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCurriculum = selectedCurriculum === 'All' || note.curriculum === selectedCurriculum
    const matchesGrade = selectedGrade === 'All' || note.grade === selectedGrade
    const matchesDifficulty = selectedDifficulty === 'All' || note.difficulty === selectedDifficulty

    return matchesSearch && matchesCurriculum && matchesGrade && matchesDifficulty
  })

  const handleBookmark = (noteId: string) => {
    // In real implementation, this would call API
    console.log('Bookmark toggled for note:', noteId)
  }

  const handleDownload = (note: ChapterNote) => {
    // In real implementation, this would generate PDF
    console.log('Downloading note:', note.title)
  }

  const handleShare = (note: ChapterNote) => {
    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: note.summary,
        url: `${window.location.origin}/resources/notes/${note.id}`,
      })
    }
  }

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Header */}
      <div className="bg-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">📚 Chapter Notes Library</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Access comprehensive Biology notes with key points, diagrams, and quick revision
              summaries
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes by title or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                List
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum</label>
              <select
                value={selectedCurriculum}
                onChange={(e) => setSelectedCurriculum(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {curriculums.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade === 'All' ? grade : grade.replace('CLASS_', 'Class ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="downloads">Most Downloaded</option>
                <option value="views">Most Viewed</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">Showing {filteredNotes.length} notes</div>
        </div>

        {/* Notes Grid/List */}
        <div
          className={cn(
            viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
          )}
        >
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {viewMode === 'grid' ? (
                // Grid View
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          {note.curriculum}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                          {note.grade.replace('CLASS_', 'Class ')}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{note.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{note.summary}</p>
                    </div>

                    <button
                      onClick={() => handleBookmark(note.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {note.isBookmarked ? (
                        <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Bookmark className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {note.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {note.estimatedTime}m
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {note.downloadCount}
                    </div>
                  </div>

                  {/* Key Points Preview */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Key Points:</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {note.keyPoints.slice(0, 2).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {point}
                        </li>
                      ))}
                      {note.keyPoints.length > 2 && (
                        <li className="text-blue-600 font-medium">
                          +{note.keyPoints.length - 2} more points...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {note.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(note)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </button>
                    <button
                      onClick={() => handleShare(note)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ShareIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                // List View
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          {note.curriculum}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                          {note.grade.replace('CLASS_', 'Class ')}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {note.rating}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{note.title}</h3>
                      <p className="text-gray-600 mb-3">{note.summary}</p>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {note.estimatedTime} min read
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {note.downloadCount} downloads
                        </div>
                        <div>{note.viewCount} views</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleBookmark(note.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {note.isBookmarked ? (
                          <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Bookmark className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDownload(note)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Download className="h-5 w-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleShare(note)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ShareIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChapterNotesViewer
