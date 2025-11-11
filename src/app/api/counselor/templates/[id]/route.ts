/**
 * API Route: Individual Message Template Management
 * PATCH /api/counselor/templates/[id] - Update template
 * DELETE /api/counselor/templates/[id] - Delete template
 */

import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// PATCH handler - Update template
const updateTemplateSchema = z.object({
  name: z.string().min(1).optional(),
  subject: z.string().optional(),
  message: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
})

async function handlePATCH(req: NextRequest, session: any) {
  try {
    const pathParts = req.nextUrl.pathname.split('/')
    const templateId = pathParts[pathParts.length - 1]

    const body = await req.json()
    const validatedData = updateTemplateSchema.parse(body)

    // Check if template exists and belongs to user
    const existingTemplate = await prisma.messageTemplate.findFirst({
      where: {
        id: templateId,
        createdById: session.userId,
      },
    })

    if (!existingTemplate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template not found or unauthorized',
        },
        { status: 404 }
      )
    }

    // Email templates should have a subject
    if (existingTemplate.type === 'EMAIL' && validatedData.subject === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Email templates require a subject',
        },
        { status: 400 }
      )
    }

    const updatedTemplate = await prisma.messageTemplate.update({
      where: { id: templateId },
      data: {
        name: validatedData.name,
        subject: validatedData.subject !== undefined ? validatedData.subject : undefined,
        message: validatedData.message,
        isActive: validatedData.isActive,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedTemplate,
      message: 'Template updated successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Error updating template:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update template',
      },
      { status: 500 }
    )
  }
}

// DELETE handler - Delete template
async function handleDELETE(req: NextRequest, session: any) {
  try {
    const pathParts = req.nextUrl.pathname.split('/')
    const templateId = pathParts[pathParts.length - 1]

    // Check if template exists and belongs to user
    const existingTemplate = await prisma.messageTemplate.findFirst({
      where: {
        id: templateId,
        createdById: session.userId,
      },
    })

    if (!existingTemplate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template not found or unauthorized',
        },
        { status: 404 }
      )
    }

    await prisma.messageTemplate.delete({
      where: { id: templateId },
    })

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete template',
      },
      { status: 500 }
    )
  }
}

export const PATCH = withCounselor(handlePATCH)
export const DELETE = withCounselor(handleDELETE)
