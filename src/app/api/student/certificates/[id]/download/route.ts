import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CertificateGenerator } from '@/lib/certificates'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    const certificate = await prisma.certificates.findUnique({
      where: {
        id,
        studentId: session.user.id,
      },
      include: {
        certificate_templates: true,
      },
    })

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    if (certificate.status === 'REVOKED') {
      return NextResponse.json({ error: 'This certificate has been revoked' }, { status: 403 })
    }

    if (certificate.certificatePdfUrl) {
      await prisma.certificates.update({
        where: { id },
        data: {
          downloadCount: {
            increment: 1,
          },
          lastDownloadedAt: new Date(),
        },
      })

      return NextResponse.redirect(certificate.certificatePdfUrl)
    }

    const certificateData = {
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      completionDate: certificate.completionDate,
      issueDate: certificate.issueDate,
      grade: certificate.grade || undefined,
      percentage: certificate.percentage || undefined,
      duration: certificate.duration || undefined,
      instructorNames: (certificate.instructorNames as string[]) || ['Dr. Shekhar C Singh'],
      achievements: (certificate.achievements as string[]) || undefined,
      certificateNumber: certificate.certificateNumber,
      verificationCode: certificate.verificationCode,
    }

    const pdfStream = await CertificateGenerator.generateCertificatePDF(certificateData, {
      // Prisma row shape differs from the generator's CertificateTemplate input type;
      // pass the real row through (runtime shape is compatible).
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      template: (certificate.certificate_templates as any) || undefined,
      includeQRCode: true,
    })

    await prisma.certificates.update({
      where: { id },
      data: {
        downloadCount: {
          increment: 1,
        },
        lastDownloadedAt: new Date(),
      },
    })

    const chunks: Buffer[] = []
    for await (const chunk of pdfStream) {
      chunks.push(Buffer.from(chunk))
    }
    const buffer = Buffer.concat(chunks)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificate-${certificate.certificateNumber}.pdf"`,
        'Cache-Control': 'private, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error downloading certificate:', error)
    return NextResponse.json({ error: 'Failed to download certificate' }, { status: 500 })
  }
}
