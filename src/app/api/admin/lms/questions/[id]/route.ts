/**
 * Admin/Teacher LMS — verify / edit / delete a question (review actions).
 *  - PATCH { verify:true } → mark verified (promotes AI question to trusted).
 *  - PATCH { question?, options?, correctAnswer?, explanation? } → edit, then it
 *    can be verified.
 *  - DELETE → reject a bad generated question.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

async function requireStaff() {
  const session = await auth()
  if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) return null
  return session
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireStaff()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const data: Record<string, unknown> = { updatedAt: new Date() }

    if (typeof body.question === 'string' && body.question.trim()) data.question = body.question.trim()
    if (Array.isArray(body.options)) data.options = body.options
    if (typeof body.correctAnswer === 'string' && body.correctAnswer.trim())
      data.correctAnswer = body.correctAnswer.trim()
    if (typeof body.explanation === 'string') data.explanation = body.explanation.trim() || null

    if (body.verify === true) {
      data.isVerified = true
      data.verifiedBy = session.user.id
      data.category = 'PRACTICE'
    }

    const question = await prisma.questions.update({ where: { id: params.id }, data })
    return NextResponse.json({ success: true, question })
  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json({ success: false, error: 'Failed to update question' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireStaff()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }
    await prisma.questions.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting question:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete question' }, { status: 500 })
  }
}
