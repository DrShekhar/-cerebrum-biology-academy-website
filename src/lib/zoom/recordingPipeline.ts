/**
 * Zoom -> Cloudflare Stream recordings pipeline.
 *
 * Consumed by POST /api/zoom/webhook on `recording.completed`:
 *   1. Pick the best MP4 from the meeting's recording_files.
 *   2. Match the Zoom meeting to a class_sessions row.
 *   3. Copy the recording into Cloudflare Stream (server-side /copy — no
 *      download through our infra) and create study_materials + video_lectures
 *      rows so enrolled students see it in their Videos tab and /learn player.
 *   4. Link the session (videoLectureId + recordingUrl=/learn/<id>).
 *
 * MATCH STRATEGY (first hit wins):
 *   a. class_sessions.meetingId equals the Zoom meeting id (digits-only compare,
 *      teachers often paste "824 5551 1111").
 *   b. class_sessions.meetingLink contains the meeting id (zoom.us/j/<id> links).
 *   c. host_id -> teacher (users.profile JSON `zoomUserId`, the P3 concurrent-
 *      Zoom mapping) -> that teacher's nearest un-linked session whose startTime
 *      is within ±6h of the recording's start_time.
 *   Unmatched recordings are logged and skipped (nothing is created) — the raw
 *   Zoom links stay available in the Zoom account.
 *
 * IDEMPOTENCY: keyed on the Zoom meeting UUID (unique per occurrence, survives
 * webhook re-delivery) stored in video_lectures.metadata.zoomMeetingUuid.
 * A re-delivered webhook finds the existing lecture, re-asserts the session
 * link and exits without touching Cloudflare again.
 *
 * FAIL-SOFT: if the Cloudflare copy fails (bad creds, quota, ...), the raw Zoom
 * play/download URL is written to class_sessions.recordingUrl and the full
 * recording context is preserved in class_sessions.metadata.zoomRecording for a
 * later manual re-run — students still get a watchable link, nothing is lost.
 */

import { prisma } from '@/lib/prisma'
import { cloudflareStreamService } from '@/lib/lms/cloudflareStream'

export interface ZoomRecordingFile {
  id?: string
  file_type?: string
  file_extension?: string
  file_size?: number
  recording_type?: string
  recording_start?: string
  recording_end?: string
  download_url?: string
  play_url?: string
  status?: string
}

export interface ZoomRecordingMeeting {
  id: number | string
  uuid: string
  host_id?: string
  topic?: string
  start_time?: string
  duration?: number
  recording_files?: ZoomRecordingFile[]
}

export interface RecordingPipelineResult {
  status:
    | 'processed'
    | 'already_processed'
    | 'no_session_match'
    | 'no_recording_file'
    | 'cloudflare_failed'
    | 'error'
  sessionId?: string
  videoLectureId?: string
  detail?: string
}

const digitsOnly = (value: string | number | undefined | null): string =>
  String(value ?? '').replace(/\D/g, '')

/** Prefer the speaker-view MP4 Zoom produces for classes; else the largest MP4. */
export function pickBestRecordingFile(
  files: ZoomRecordingFile[] | undefined
): ZoomRecordingFile | null {
  if (!files || files.length === 0) return null
  const mp4s = files.filter(
    (f) => (f.file_type || '').toUpperCase() === 'MP4' && (f.download_url || f.play_url)
  )
  if (mp4s.length === 0) return null
  const speakerView = mp4s.find((f) => f.recording_type === 'shared_screen_with_speaker_view')
  if (speakerView) return speakerView
  return mp4s.reduce((best, f) => ((f.file_size || 0) > (best.file_size || 0) ? f : best), mp4s[0])
}

/** Match a Zoom meeting to its class_sessions row. See MATCH STRATEGY above. */
async function matchClassSession(meeting: ZoomRecordingMeeting) {
  const meetingIdDigits = digitsOnly(meeting.id)

  // (a) exact meetingId column (compare digits-only to tolerate spacing)
  if (meetingIdDigits) {
    const byMeetingId = await prisma.class_sessions.findFirst({
      where: {
        OR: [
          { meetingId: String(meeting.id) },
          { meetingId: meetingIdDigits },
          { meetingId: meeting.uuid },
        ],
      },
      orderBy: { startTime: 'desc' },
    })
    if (byMeetingId) return byMeetingId

    // (b) meetingLink contains the meeting id (zoom.us/j/<id>?pwd=...)
    const byLink = await prisma.class_sessions.findFirst({
      where: { meetingLink: { contains: meetingIdDigits } },
      orderBy: { startTime: 'desc' },
    })
    if (byLink) return byLink
  }

  // (c) host_id -> teacher (users.profile.zoomUserId) + ±6h time window
  if (meeting.host_id && meeting.start_time) {
    const teacher = await prisma.users.findFirst({
      where: {
        role: 'TEACHER',
        profile: { path: ['zoomUserId'], equals: meeting.host_id },
      },
      select: { id: true },
    })
    if (teacher) {
      const start = new Date(meeting.start_time)
      if (!Number.isNaN(start.getTime())) {
        const windowMs = 6 * 60 * 60 * 1000
        const candidates = await prisma.class_sessions.findMany({
          where: {
            teacherId: teacher.id,
            videoLectureId: null,
            status: { not: 'CANCELLED' },
            startTime: {
              gte: new Date(start.getTime() - windowMs),
              lte: new Date(start.getTime() + windowMs),
            },
          },
          orderBy: { startTime: 'asc' },
        })
        if (candidates.length > 0) {
          return candidates.reduce((best, c) =>
            Math.abs(new Date(c.startTime).getTime() - start.getTime()) <
            Math.abs(new Date(best.startTime).getTime() - start.getTime())
              ? c
              : best
          )
        }
      }
    }
  }

  return null
}

function formatSessionDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date)
}

async function linkSessionToLecture(sessionId: string, videoLectureId: string): Promise<void> {
  await prisma.class_sessions.update({
    where: { id: sessionId },
    data: {
      videoLectureId,
      recordingUrl: `/learn/${videoLectureId}`,
      updatedAt: new Date(),
    },
  })
}

/**
 * Main entry: handle a verified `recording.completed` event.
 * `downloadToken` is the webhook body's top-level `download_token` — appended
 * as ?access_token= so Cloudflare can fetch the (otherwise auth-gated) MP4.
 */
export async function processRecordingCompleted(
  meeting: ZoomRecordingMeeting,
  downloadToken?: string
): Promise<RecordingPipelineResult> {
  try {
    if (!meeting?.uuid) {
      return { status: 'error', detail: 'Missing meeting uuid in payload' }
    }

    // Idempotency: has this meeting occurrence already been ingested?
    const existing = await prisma.video_lectures.findFirst({
      where: { metadata: { path: ['zoomMeetingUuid'], equals: meeting.uuid } },
      select: { id: true },
    })

    const session = await matchClassSession(meeting)

    if (existing) {
      // Re-delivered webhook: just make sure the session link is in place.
      if (session && session.videoLectureId !== existing.id) {
        await linkSessionToLecture(session.id, existing.id)
      }
      return { status: 'already_processed', sessionId: session?.id, videoLectureId: existing.id }
    }

    const file = pickBestRecordingFile(meeting.recording_files)
    if (!file) {
      console.warn('[zoom-recording] No MP4 recording file for meeting', meeting.uuid)
      return { status: 'no_recording_file' }
    }

    if (!session) {
      console.warn(
        '[zoom-recording] No class_sessions match for Zoom meeting',
        meeting.id,
        meeting.uuid,
        meeting.topic
      )
      return { status: 'no_session_match' }
    }

    const downloadUrl = file.download_url
      ? downloadToken
        ? `${file.download_url}${file.download_url.includes('?') ? '&' : '?'}access_token=${downloadToken}`
        : file.download_url
      : null

    const title = `${session.title} — ${formatSessionDate(new Date(session.startTime))} (Recording)`

    // Cloudflare Stream server-side copy (existing capability; no bytes
    // through our infra). Fail-soft below if this errors.
    const copyResult = downloadUrl
      ? await cloudflareStreamService.uploadFromUrl(downloadUrl, {
          name: title,
          source: 'zoom-recording',
          zoomMeetingUuid: meeting.uuid,
          sessionId: session.id,
          courseId: session.courseId || '',
        })
      : { success: false as const, error: 'Recording file has no download_url' }

    if (!copyResult.success || !copyResult.videoId) {
      // FAIL-SOFT: keep the raw Zoom link on the session so students still
      // get the recording; preserve context for a manual re-run.
      const fallbackUrl = file.play_url || file.download_url || null
      const priorMetadata =
        session.metadata && typeof session.metadata === 'object' && !Array.isArray(session.metadata)
          ? (session.metadata as Record<string, unknown>)
          : {}
      await prisma.class_sessions.update({
        where: { id: session.id },
        data: {
          ...(fallbackUrl && !session.recordingUrl?.startsWith('/learn/')
            ? { recordingUrl: fallbackUrl }
            : {}),
          metadata: {
            ...priorMetadata,
            zoomRecording: {
              zoomMeetingId: String(meeting.id),
              zoomMeetingUuid: meeting.uuid,
              playUrl: file.play_url || null,
              downloadUrl: file.download_url || null,
              cloudflareError: copyResult.error || 'unknown',
              failedAt: new Date().toISOString(),
            },
          },
          updatedAt: new Date(),
        },
      })
      console.error(
        '[zoom-recording] Cloudflare copy failed for meeting',
        meeting.uuid,
        copyResult.error
      )
      return { status: 'cloudflare_failed', sessionId: session.id, detail: copyResult.error }
    }

    // Create the study_materials + video_lectures pair (same shape as the
    // admin upload_from_url flow) so the existing enrollment gate applies.
    const studyMaterialId = `material_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    const videoLectureId = `vidlec_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    await prisma.$transaction([
      prisma.study_materials.create({
        data: {
          id: studyMaterialId,
          title,
          description: `Class recording: ${session.title}`,
          materialType: 'VIDEO',
          fileUrl: '',
          fileName: `${copyResult.videoId}.mp4`,
          fileSize: file.file_size && file.file_size <= 2147483647 ? file.file_size : 0,
          mimeType: 'video/mp4',
          courseId: session.courseId || null,
          uploadedBy: session.teacherId,
          accessLevel: 'ENROLLED',
          category: 'Class Recordings',
          // Published immediately: the student Videos tab filters on
          // isPublished — this is what makes the recording "land in their
          // account" without an admin touch.
          isPublished: true,
          publishedAt: new Date(),
          updatedAt: new Date(),
        },
      }),
      prisma.video_lectures.create({
        data: {
          id: videoLectureId,
          studyMaterialId,
          cloudflareVideoId: copyResult.videoId,
          title,
          description: `Recording of "${session.title}" (${session.topic || 'class session'})`,
          duration: (meeting.duration || session.duration || 0) * 60,
          uploadStatus: 'PROCESSING',
          playbackPolicy: 'SIGNED_URL',
          metadata: {
            source: 'zoom-recording',
            zoomMeetingId: String(meeting.id),
            zoomMeetingUuid: meeting.uuid,
            zoomHostId: meeting.host_id || null,
            sessionId: session.id,
          },
          updatedAt: new Date(),
        },
      }),
    ])

    await linkSessionToLecture(session.id, videoLectureId)

    console.log(
      '[zoom-recording] Ingested recording for session',
      session.id,
      '-> lecture',
      videoLectureId,
      '(CF video',
      copyResult.videoId,
      ')'
    )
    // The existing Cloudflare webhook (/api/lms/webhook) flips uploadStatus to
    // READY when Stream finishes processing — no polling needed here.
    return { status: 'processed', sessionId: session.id, videoLectureId }
  } catch (error) {
    console.error('[zoom-recording] Pipeline error:', error)
    return {
      status: 'error',
      detail: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
