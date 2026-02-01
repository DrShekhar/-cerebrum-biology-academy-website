import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Download, Printer, Award, Calendar, CheckCircle2, ExternalLink } from 'lucide-react'
import CertificateShareButtons from '@/components/student/CertificateShareButtons'
import CertificateVerificationBadge from '@/components/student/CertificateVerificationBadge'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Certificate Details | Student Dashboard',
  description: 'View your certificate details',
}

async function getCertificate(id: string, studentId: string) {
  const certificate = await prisma.certificates.findUnique({
    where: {
      id,
      studentId,
    },
    include: {
      course: {
        select: {
          id: true,
          name: true,
          type: true,
          description: true,
        },
      },
      enrollment: {
        select: {
          id: true,
          status: true,
          enrollmentDate: true,
          currentProgress: true,
        },
      },
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      template: true,
    },
  })

  return certificate
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  if (session.user.role !== 'STUDENT') {
    redirect('/unauthorized')
  }

  const certificate = await getCertificate(resolvedParams.id, session.user.id)

  if (!certificate) {
    notFound()
  }

  const formatDate = (date: Date) => {
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

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'}/verify-certificate/${certificate.verificationCode}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/student/certificates"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Certificates
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-center">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <Award className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {formatCertificateType(certificate.certificateType)}
            </h1>
            <p className="text-blue-100">Certificate No: {certificate.certificateNumber}</p>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <CertificateVerificationBadge
                status={certificate.status as any}
                revokeReason={certificate.revokeReason}
                validUntil={certificate.validUntil}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Certificate Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Student Name</p>
                    <p className="font-semibold text-gray-900">{certificate.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course Name</p>
                    <p className="font-semibold text-gray-900">{certificate.courseName}</p>
                  </div>
                  {certificate.grade && (
                    <div>
                      <p className="text-sm text-gray-600">Grade Achieved</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{certificate.grade}</p>
                        {certificate.percentage && (
                          <span className="text-sm text-gray-600">({certificate.percentage}%)</span>
                        )}
                      </div>
                    </div>
                  )}
                  {certificate.duration && (
                    <div>
                      <p className="text-sm text-gray-600">Course Duration</p>
                      <p className="font-semibold text-gray-900">{certificate.duration}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Issue Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Completion Date</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(certificate.completionDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Issue Date</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(certificate.issueDate)}
                      </p>
                    </div>
                  </div>
                  {certificate.instructorNames &&
                    Array.isArray(certificate.instructorNames) &&
                    certificate.instructorNames.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Instructors</p>
                        <div className="space-y-1">
                          {certificate.instructorNames.map((name, index) => (
                            <p key={index} className="font-semibold text-gray-900">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {certificate.achievements &&
              Array.isArray(certificate.achievements) &&
              certificate.achievements.length > 0 && (
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="text-sm font-semibold text-yellow-900 mb-2">
                    Special Achievements
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certificate.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                      >
                        <Award className="w-4 h-4" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Verification
              </h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-blue-900 font-medium mb-1">Verification Code</p>
                  <p className="font-mono text-lg font-bold text-blue-700">
                    {certificate.verificationCode}
                  </p>
                </div>
                <Link
                  href={verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify Online</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <a
                href={`/api/student/certificates/${certificate.id}/download`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                <Printer className="w-5 h-5" />
                <span>Print</span>
              </button>

              <Link
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Verify</span>
              </Link>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <CertificateShareButtons
                certificateId={certificate.id}
                studentName={certificate.studentName}
                courseName={certificate.courseName}
                certificateType={certificate.certificateType}
                verificationCode={certificate.verificationCode}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>This certificate is issued by Cerebrum Biology Academy and can be verified online</p>
        </div>
      </div>
    </div>
  )
}
