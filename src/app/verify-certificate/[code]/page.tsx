import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  CheckCircle2,
  XCircle,
  Award,
  Calendar,
  User,
  BookOpen,
  Trophy,
  Download,
  Shield,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Verify Certificate | Cerebrum Biology Academy',
  description: 'Verify the authenticity of a Cerebrum Biology Academy certificate',
}

async function verifyCertificate(code: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'
    const response = await fetch(`${baseUrl}/api/certificates/verify/${code}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying certificate:', error)
    return null
  }
}

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function VerifyCertificatePage({ params }: PageProps) {
  const resolvedParams = await params
  const verificationData = await verifyCertificate(resolvedParams.code)

  if (!verificationData) {
    notFound()
  }

  const { verified, certificate, status, issuer, verifiedAt } = verificationData

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verification</h1>
          <p className="text-gray-600">
            Verify the authenticity of Cerebrum Biology Academy certificates
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div
            className={`px-8 py-6 ${verified ? 'bg-green-600' : 'bg-red-600'}`}
          >
            <div className="flex items-center justify-center gap-3 text-white">
              {verified ? (
                <>
                  <CheckCircle2 className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Certificate Verified</h2>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">
                    Verification {status.isRevoked ? 'Revoked' : 'Failed'}
                  </h2>
                </>
              )}
            </div>
          </div>

          <div className="p-8">
            <div
              className={`mb-8 p-4 rounded-lg border ${verified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex items-start gap-3">
                {verified ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${verified ? 'text-green-900' : 'text-red-900'}`}>
                    {status.message}
                  </p>
                  {status.isRevoked && status.revokedAt && (
                    <p className="text-sm text-red-700 mt-1">
                      Revoked on {formatDate(status.revokedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-1">Certificate Type</p>
                    <p className="font-semibold text-gray-900 truncate">
                      {formatCertificateType(certificate.certificateType)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-1">Student Name</p>
                    <p className="font-semibold text-gray-900 truncate">
                      {certificate.studentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-1">Course Name</p>
                    <p className="font-semibold text-gray-900 truncate">{certificate.courseName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-1">Completion Date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(certificate.completionDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-1">Certificate Number</p>
                  <p className="font-mono text-lg font-bold text-blue-700">
                    {certificate.certificateNumber}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-1">Issue Date</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {formatDate(certificate.issueDate)}
                  </p>
                </div>
              </div>

              {certificate.grade && (
                <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <div>
                    <p className="text-sm text-yellow-900 font-medium">Grade Achieved</p>
                    <p className="text-lg font-bold text-yellow-800">
                      {certificate.grade}
                      {certificate.percentage && ` (${certificate.percentage}%)`}
                    </p>
                  </div>
                </div>
              )}

              {certificate.duration && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Course Duration</p>
                  <p className="font-semibold text-gray-900">{certificate.duration}</p>
                </div>
              )}

              {certificate.achievements &&
                Array.isArray(certificate.achievements) &&
                certificate.achievements.length > 0 && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-900 font-medium mb-3">Special Achievements</p>
                    <div className="flex flex-wrap gap-2">
                      {certificate.achievements.map((achievement: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          <Award className="w-4 h-4" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {certificate.instructorNames &&
                Array.isArray(certificate.instructorNames) &&
                certificate.instructorNames.length > 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Instructors</p>
                    <div className="space-y-1">
                      {certificate.instructorNames.map((name: string, index: number) => (
                        <p key={index} className="font-semibold text-gray-900">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-900">{issuer.name}</p>
                  <a
                    href={issuer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {issuer.website}
                  </a>
                </div>
                <div className="text-right">
                  <p>Verified at</p>
                  <p className="font-medium text-gray-900">
                    {new Date(verifiedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>Visit Cerebrum Biology Academy</span>
            <Download className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
