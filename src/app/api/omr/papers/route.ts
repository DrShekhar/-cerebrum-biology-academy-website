import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { OMRPaperStatus, OMRSubjectType } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subjectType = searchParams.get('subjectType') as OMRSubjectType | null
    const targetClass = searchParams.get('targetClass')

    const now = new Date()

    const where: Record<string, unknown> = {
      status: OMRPaperStatus.ACTIVE,
      isActive: true,
    }

    if (subjectType) where.subjectType = subjectType
    if (targetClass) where.targetClass = targetClass

    const papers = await prisma.omr_papers.findMany({
      where,
      select: {
        id: true,
        paperCode: true,
        title: true,
        description: true,
        subjectType: true,
        targetClass: true,
        totalQuestions: true,
        totalMarks: true,
        sections: true,
        examDate: true,
        submissionStart: true,
        submissionEnd: true,
        hasVerifiedKey: true,
      },
      orderBy: { examDate: 'desc' },
    })

    const papersWithStatus = papers.map((paper) => {
      const isSubmissionOpen =
        now >= new Date(paper.submissionStart) && now <= new Date(paper.submissionEnd)

      return {
        ...paper,
        isSubmissionOpen,
        verifiedKeyStatus: paper.hasVerifiedKey ? 'Available' : 'Not Available (Not uploaded yet)',
      }
    })

    return NextResponse.json({ success: true, papers: papersWithStatus })
  } catch (error) {
    console.error('Error fetching OMR papers:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch papers' }, { status: 500 })
  }
}
