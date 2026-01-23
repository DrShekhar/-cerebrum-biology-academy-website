'use client'

import React, { useState } from 'react'
import CertificateCard from './CertificateCard'
import { Search, Filter, Award } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Certificate {
  id: string
  certificateNumber: string
  certificateType: string
  studentName: string
  courseName: string
  completionDate: Date
  issueDate: Date
  grade?: string | null
  percentage?: number | null
  status: string
  certificatePdfUrl?: string | null
  course?: {
    name: string
    type: string
  }
}

interface CertificateListProps {
  certificates: Certificate[]
}

export default function CertificateList({ certificates }: CertificateListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'date' | 'type'>('date')

  const handleDownload = async (id: string) => {
    try {
      const response = await fetch(`/api/student/certificates/${id}/download`)

      if (!response.ok) {
        throw new Error('Failed to download certificate')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `certificate-${id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('Certificate downloaded successfully')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download certificate')
    }
  }

  const handleShare = async (id: string) => {
    const certificate = certificates.find((cert) => cert.id === id)
    if (!certificate) return

    const shareData = {
      title: `${certificate.certificateType} Certificate`,
      text: `I have earned a certificate in ${certificate.courseName} from Cerebrum Biology Academy!`,
      url: `${window.location.origin}/student/certificates/${id}`,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast.success('Certificate shared successfully')
      } else {
        await navigator.clipboard.writeText(shareData.url)
        toast.success('Certificate link copied to clipboard')
      }
    } catch (error) {
      console.error('Share error:', error)
      toast.error('Failed to share certificate')
    }
  }

  const filteredCertificates = certificates
    .filter((cert) => {
      const matchesSearch =
        cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = filterType === 'ALL' || cert.certificateType === filterType

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
      }
      return a.certificateType.localeCompare(b.certificateType)
    })

  const certificateTypes = ['ALL', ...new Set(certificates.map((cert) => cert.certificateType))]

  if (certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Award className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
        <p className="text-gray-600 max-w-md">
          Complete your courses to earn certificates. Certificates will appear here once you
          successfully finish a course.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
            >
              {certificateTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'ALL'
                    ? 'All Types'
                    : type
                        .split('_')
                        .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                        .join(' ')}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'type')}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
          >
            <option value="date">Sort by Date</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
      </div>

      {filteredCertificates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No certificates found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600">
            Showing {filteredCertificates.length} of {certificates.length} certificates
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onDownload={handleDownload}
                onShare={handleShare}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
