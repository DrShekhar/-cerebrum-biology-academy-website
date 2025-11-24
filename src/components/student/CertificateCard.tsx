'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Download, Share2, Eye, CheckCircle2, Calendar, Trophy } from 'lucide-react'
import Link from 'next/link'

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

interface CertificateCardProps {
  certificate: Certificate
  onDownload?: (id: string) => void
  onShare?: (id: string) => void
  onView?: (id: string) => void
}

const certificateTypeColors = {
  COURSE_COMPLETION: 'bg-blue-100 text-blue-700 border-blue-200',
  EXCELLENCE: 'bg-purple-100 text-purple-700 border-purple-200',
  PARTICIPATION: 'bg-green-100 text-green-700 border-green-200',
  ACHIEVEMENT: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  APPRECIATION: 'bg-pink-100 text-pink-700 border-pink-200',
  SPECIAL_RECOGNITION: 'bg-indigo-100 text-indigo-700 border-indigo-200',
}

const certificateTypeIcons = {
  COURSE_COMPLETION: Award,
  EXCELLENCE: Trophy,
  PARTICIPATION: CheckCircle2,
  ACHIEVEMENT: Trophy,
  APPRECIATION: Award,
  SPECIAL_RECOGNITION: Trophy,
}

export default function CertificateCard({
  certificate,
  onDownload,
  onShare,
  onView,
}: CertificateCardProps) {
  const typeColor =
    certificateTypeColors[certificate.certificateType as keyof typeof certificateTypeColors] ||
    certificateTypeColors.COURSE_COMPLETION

  const TypeIcon =
    certificateTypeIcons[certificate.certificateType as keyof typeof certificateTypeIcons] || Award

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatCertificateType = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`p-2 rounded-lg ${typeColor} border transition-transform group-hover:scale-110`}
              >
                <TypeIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {formatCertificateType(certificate.certificateType)}
                </h3>
                <p className="text-sm text-gray-500">{certificate.certificateNumber}</p>
              </div>
            </div>
          </div>

          {certificate.status === 'ISSUED' && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-700">Valid</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-1">{certificate.courseName}</h4>
          <p className="text-sm text-gray-600">{certificate.studentName}</p>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Completed: {formatDate(certificate.completionDate)}</span>
          </div>
          {certificate.grade && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-md">
              <Trophy className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-700">Grade: {certificate.grade}</span>
              {certificate.percentage && (
                <span className="text-blue-600">({certificate.percentage}%)</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <Link
            href={`/student/certificates/${certificate.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            onClick={() => onView?.(certificate.id)}
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Link>

          <button
            onClick={() => onDownload?.(certificate.id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            title="Download Certificate"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => onShare?.(certificate.id)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            title="Share Certificate"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500">Issued on {formatDate(certificate.issueDate)}</p>
      </div>
    </motion.div>
  )
}
