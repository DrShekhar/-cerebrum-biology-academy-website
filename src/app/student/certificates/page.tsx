import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CertificateList from '@/components/student/CertificateList'
import { Award, TrendingUp, Trophy, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Certificates | Student Dashboard',
  description: 'View and download your earned certificates',
}

async function getCertificates(studentId: string) {
  const certificates = await prisma.certificates.findMany({
    where: {
      studentId,
    },
    include: {
      course: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
      enrollment: {
        select: {
          id: true,
          status: true,
          enrollmentDate: true,
        },
      },
    },
    orderBy: {
      issueDate: 'desc',
    },
  })

  return certificates
}

export default async function StudentCertificatesPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  if (session.user.role !== 'student') {
    redirect('/unauthorized')
  }

  const certificates = await getCertificates(session.user.id)

  const stats = {
    total: certificates.length,
    issued: certificates.filter((cert) => cert.status === 'ISSUED').length,
    byType: certificates.reduce(
      (acc, cert) => {
        acc[cert.certificateType] = (acc[cert.certificateType] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    ),
  }

  const excellenceCertificates = certificates.filter(
    (cert) => cert.certificateType === 'EXCELLENCE'
  ).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-gray-600">View, download, and share your earned certificates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.issued}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Excellence Awards</p>
                <p className="text-2xl font-bold text-gray-900">{excellenceCertificates}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Download className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Course Completions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.byType.COURSE_COMPLETION || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <CertificateList certificates={certificates} />
        </div>
      </div>
    </div>
  )
}
