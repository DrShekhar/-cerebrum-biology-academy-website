import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, ShieldX, Award, GraduationCap } from 'lucide-react'
import { prisma } from '@/lib/prisma'

/**
 * Public certificate verification — anyone with a certificate's verification
 * code (printed/QR'd on the certificate) can confirm it's genuine. Thinkific
 * needs a paid third party (Accredible) for this; ours is native.
 */

export const metadata: Metadata = {
  title: 'Certificate Verification | Cerebrum Biology Academy',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params

  let certificate: {
    certificateNumber: string
    studentName: string
    courseName: string
    completionDate: Date
    issueDate: Date
    validUntil: Date | null
    grade: string | null
    percentage: number | null
    certificateType: string
  } | null = null

  try {
    certificate = await prisma.certificates.findUnique({
      where: { verificationCode: code },
      select: {
        certificateNumber: true,
        studentName: true,
        courseName: true,
        completionDate: true,
        issueDate: true,
        validUntil: true,
        grade: true,
        percentage: true,
        certificateType: true,
      },
    })
  } catch {
    certificate = null
  }

  const expired = certificate?.validUntil ? certificate.validUntil.getTime() < Date.now() : false

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-teal-50 px-4 py-12">
      <div className="w-full max-w-xl">
        {certificate ? (
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div
              className={`px-6 py-5 text-white ${expired ? 'bg-amber-600' : 'bg-gradient-to-r from-green-700 to-teal-700'}`}
            >
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
                <BadgeCheck className="h-5 w-5" />
                {expired ? 'Certificate found — validity period ended' : 'Verified certificate'}
              </p>
              <h1 className="mt-1 text-2xl font-bold">{certificate.studentName}</h1>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-100">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{certificate.courseName}</p>
                  <p className="text-sm text-gray-500">
                    {certificate.certificateType.replace(/_/g, ' ').toLowerCase()}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-400">Certificate no.</dt>
                  <dd className="font-mono font-semibold text-gray-800">
                    {certificate.certificateNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-400">Completed on</dt>
                  <dd className="font-semibold text-gray-800">{fmt(certificate.completionDate)}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Issued on</dt>
                  <dd className="font-semibold text-gray-800">{fmt(certificate.issueDate)}</dd>
                </div>
                {certificate.grade && (
                  <div>
                    <dt className="text-gray-400">Grade</dt>
                    <dd className="font-semibold text-gray-800">
                      {certificate.grade}
                      {certificate.percentage != null ? ` (${certificate.percentage}%)` : ''}
                    </dd>
                  </div>
                )}
                {certificate.validUntil && (
                  <div>
                    <dt className="text-gray-400">Valid until</dt>
                    <dd className={`font-semibold ${expired ? 'text-amber-700' : 'text-gray-800'}`}>
                      {fmt(certificate.validUntil)}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="mt-6 rounded-xl bg-gray-50 p-4 text-xs text-gray-500">
                This certificate was issued by Cerebrum Biology Academy and verified against our
                records. Verification code: <span className="font-mono">{code}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl">
            <ShieldX className="mx-auto h-12 w-12 text-red-400" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Certificate not found</h1>
            <p className="mt-2 text-gray-600">
              No certificate matches this verification code. Check the code on the certificate and
              try again — codes are case-sensitive.
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          <GraduationCap className="mb-0.5 mr-1 inline h-4 w-4" />
          <Link href="/" className="font-semibold text-green-700 underline">
            Cerebrum Biology Academy
          </Link>{' '}
          — NEET Biology coaching by AIIMS-trained faculty
        </p>
      </div>
    </main>
  )
}
