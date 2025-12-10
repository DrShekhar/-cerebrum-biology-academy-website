/**
 * LMS Video Upload API
 *
 * POST - Create direct upload URL for client-side uploads
 * GET - Get upload status
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { cloudflareStreamService } from '@/lib/lms/cloudflareStream'
import { prisma } from '@/lib/prisma'

// Only teachers and admins can upload
async function checkUploadPermission(): Promise<{
  allowed: boolean
  userId?: string
  error?: string
}> {
  const session = await auth()

  if (!session?.user?.email) {
    return { allowed: false, error: 'Authentication required' }
  }

  const user = await prisma.users.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true },
  })

  if (!user) {
    return { allowed: false, error: 'User not found' }
  }

  if (!['TEACHER', 'ADMIN'].includes(user.role)) {
    return { allowed: false, error: 'Only teachers and admins can upload videos' }
  }

  return { allowed: true, userId: user.id }
}

export async function POST(request: NextRequest) {
  try {
    const permission = await checkUploadPermission()
    if (!permission.allowed) {
      return NextResponse.json({ success: false, error: permission.error }, { status: 403 })
    }

    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case 'create_upload': {
        // Create direct upload URL
        const { maxDuration, title, courseId, chapterId, topicId } = data

        const result = await cloudflareStreamService.createDirectUpload(
          maxDuration || 21600, // 6 hours default
          {
            title: title || 'Untitled Video',
            courseId: courseId || '',
            chapterId: chapterId || '',
            topicId: topicId || '',
            uploadedBy: permission.userId!,
          }
        )

        if (!result.success) {
          return NextResponse.json({ success: false, error: result.error }, { status: 500 })
        }

        // Create study material record
        const studyMaterialId = `material_${Date.now()}_${Math.random().toString(36).slice(2)}`

        await prisma.study_materials.create({
          data: {
            id: studyMaterialId,
            title: title || 'Untitled Video',
            materialType: 'VIDEO',
            fileUrl: '', // Will be updated after processing
            fileName: `${result.videoId}.mp4`,
            fileSize: 0, // Will be updated after processing
            mimeType: 'video/mp4',
            courseId: courseId || null,
            chapterId: chapterId || null,
            topicId: topicId || null,
            uploadedBy: permission.userId!,
            accessLevel: 'ENROLLED',
            updatedAt: new Date(),
          },
        })

        // Create video lecture record
        await cloudflareStreamService.createVideoLecture({
          studyMaterialId,
          cloudflareVideoId: result.videoId!,
          title: title || 'Untitled Video',
        })

        return NextResponse.json({
          success: true,
          uploadUrl: result.uploadUrl,
          videoId: result.videoId,
          studyMaterialId,
          message: 'Upload URL created. Use tus protocol to upload.',
        })
      }

      case 'upload_from_url': {
        // Upload from external URL
        const { url, title, courseId, chapterId, topicId, hasPdfSync, pdfUrl, pdfPageCount } = data

        if (!url) {
          return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 })
        }

        const result = await cloudflareStreamService.uploadFromUrl(url, {
          title: title || 'Untitled Video',
          courseId: courseId || '',
          chapterId: chapterId || '',
          topicId: topicId || '',
          uploadedBy: permission.userId!,
        })

        if (!result.success) {
          return NextResponse.json({ success: false, error: result.error }, { status: 500 })
        }

        // Create study material record
        const studyMaterialId = `material_${Date.now()}_${Math.random().toString(36).slice(2)}`

        await prisma.study_materials.create({
          data: {
            id: studyMaterialId,
            title: title || 'Untitled Video',
            materialType: 'VIDEO',
            fileUrl: url,
            fileName: `${result.videoId}.mp4`,
            fileSize: 0,
            mimeType: 'video/mp4',
            courseId: courseId || null,
            chapterId: chapterId || null,
            topicId: topicId || null,
            uploadedBy: permission.userId!,
            accessLevel: 'ENROLLED',
            updatedAt: new Date(),
          },
        })

        // Create video lecture record
        await cloudflareStreamService.createVideoLecture({
          studyMaterialId,
          cloudflareVideoId: result.videoId!,
          title: title || 'Untitled Video',
          hasPdfSync: !!hasPdfSync,
          syncPdfUrl: pdfUrl,
          syncPdfPageCount: pdfPageCount,
        })

        return NextResponse.json({
          success: true,
          videoId: result.videoId,
          studyMaterialId,
          message: 'Video upload initiated. Processing will begin shortly.',
        })
      }

      case 'add_pdf_sync': {
        // Add PDF sync data to existing video
        const { videoLectureId, pdfUrl, syncPoints } = data

        if (!videoLectureId || !pdfUrl) {
          return NextResponse.json(
            { success: false, error: 'videoLectureId and pdfUrl are required' },
            { status: 400 }
          )
        }

        // Update video lecture
        await prisma.video_lectures.update({
          where: { id: videoLectureId },
          data: {
            hasPdfSync: true,
            syncPdfUrl: pdfUrl,
            syncPdfPageCount: syncPoints?.length || 0,
          },
        })

        // Add sync points if provided
        if (syncPoints && Array.isArray(syncPoints)) {
          for (const point of syncPoints) {
            await prisma.pdf_sync_data.upsert({
              where: {
                videoLectureId_videoTimestamp: {
                  videoLectureId,
                  videoTimestamp: point.timestamp,
                },
              },
              update: {
                pdfPage: point.page,
                sectionTitle: point.title,
              },
              create: {
                videoLectureId,
                videoTimestamp: point.timestamp,
                pdfPage: point.page,
                sectionTitle: point.title,
                isAutoGenerated: false,
              },
            })
          }
        }

        return NextResponse.json({
          success: true,
          message: 'PDF sync data added',
        })
      }

      case 'add_chapters': {
        // Add chapter markers to video
        const { videoLectureId, chapters } = data

        if (!videoLectureId || !chapters || !Array.isArray(chapters)) {
          return NextResponse.json(
            { success: false, error: 'videoLectureId and chapters array are required' },
            { status: 400 }
          )
        }

        // Delete existing chapters
        await prisma.video_chapters.deleteMany({
          where: { videoLectureId },
        })

        // Add new chapters
        for (let i = 0; i < chapters.length; i++) {
          const chapter = chapters[i]
          await prisma.video_chapters.create({
            data: {
              videoLectureId,
              title: chapter.title,
              description: chapter.description,
              startTime: chapter.startTime,
              endTime: chapter.endTime,
              orderIndex: i,
              topicId: chapter.topicId,
            },
          })
        }

        return NextResponse.json({
          success: true,
          message: `${chapters.length} chapters added`,
        })
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            validActions: ['create_upload', 'upload_from_url', 'add_pdf_sync', 'add_chapters'],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('LMS Upload API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
      // Return service status
      const status = cloudflareStreamService.getServiceStatus()
      return NextResponse.json({
        success: true,
        service: 'LMS Video Upload',
        cloudflare: status,
        endpoints: {
          createUpload: 'POST with action="create_upload"',
          uploadFromUrl: 'POST with action="upload_from_url"',
          addPdfSync: 'POST with action="add_pdf_sync"',
          addChapters: 'POST with action="add_chapters"',
        },
      })
    }

    // Get video details from Cloudflare
    const details = await cloudflareStreamService.getVideoDetails(videoId)

    if (!details) {
      return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      video: {
        id: details.uid,
        status: details.status.state,
        progress: details.status.pctComplete,
        duration: details.duration,
        thumbnail: details.thumbnail,
        readyToStream: details.readyToStream,
        resolution: details.input?.height
          ? `${details.input.width}x${details.input.height}`
          : undefined,
      },
    })
  } catch (error) {
    console.error('LMS Upload status error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
