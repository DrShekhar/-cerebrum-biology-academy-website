import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addSecurityHeaders } from '@/lib/auth/config'
import crypto from 'crypto'

/**
 * Firebase Auth Webhook Handler
 *
 * This endpoint receives webhooks from Firebase Auth when users are deleted.
 * It syncs the deletion to our database to maintain consistency.
 *
 * Setup in Firebase Console:
 * 1. Go to Firebase Console > Authentication > Settings > User Actions
 * 2. Enable "Blocking functions" or use Cloud Functions to trigger this webhook
 * 3. Set the webhook URL to: https://yourdomain.com/api/webhooks/firebase
 * 4. Store the shared secret in FIREBASE_WEBHOOK_SECRET env var
 *
 * Alternative: Use Firebase Extensions or Cloud Functions:
 * exports.onUserDeleted = functions.auth.user().onDelete(async (user) => {
 *   await fetch('https://yourdomain.com/api/webhooks/firebase', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'X-Firebase-Webhook-Secret': process.env.WEBHOOK_SECRET,
 *     },
 *     body: JSON.stringify({ event: 'user.deleted', uid: user.uid }),
 *   });
 * });
 */

interface FirebaseWebhookPayload {
  event: 'user.deleted' | 'user.created' | 'user.updated'
  uid: string
  phoneNumber?: string
  email?: string
  timestamp?: string
}

/**
 * Verify webhook signature using HMAC-SHA256
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false

  const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.FIREBASE_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('[Firebase Webhook] FIREBASE_WEBHOOK_SECRET not configured')
      return addSecurityHeaders(
        NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
      )
    }

    // Get raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('x-firebase-webhook-signature')

    // Verify webhook authenticity
    if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
      console.warn('[Firebase Webhook] Invalid signature - possible tampering')
      return addSecurityHeaders(NextResponse.json({ error: 'Invalid signature' }, { status: 401 }))
    }

    const payload: FirebaseWebhookPayload = JSON.parse(rawBody)
    const { event, uid, phoneNumber } = payload

    console.log(`[Firebase Webhook] Received event: ${event} for uid: ${uid}`)

    switch (event) {
      case 'user.deleted': {
        // Find and handle user deletion
        const user = await prisma.users.findFirst({
          where: { firebaseUid: uid },
          select: { id: true, email: true, phone: true },
        })

        if (user) {
          // Option 1: Soft delete - mark as deleted but preserve data
          // await prisma.users.update({
          //   where: { id: user.id },
          //   data: {
          //     firebaseUid: null, // Unlink Firebase
          //     deletedAt: new Date(),
          //     profile: { ...user.profile, deletedFromFirebase: true },
          //   },
          // })

          // Option 2: Hard delete - remove user completely
          // Warning: This will cascade delete related records based on your schema
          // For now, we just unlink the Firebase UID to allow re-registration
          await prisma.users.update({
            where: { id: user.id },
            data: {
              firebaseUid: null,
              profile: {
                firebaseDeletedAt: new Date().toISOString(),
                firebaseDeletedUid: uid,
              },
            },
          })

          console.log(`[Firebase Webhook] Unlinked Firebase UID for user: ${user.id}`)
        } else {
          console.log(`[Firebase Webhook] No user found with Firebase UID: ${uid}`)
        }

        return addSecurityHeaders(
          NextResponse.json({
            success: true,
            message: 'User deletion processed',
          })
        )
      }

      case 'user.created': {
        // Optional: Handle new user creation from Firebase Console
        // This is useful if admins create users directly in Firebase
        console.log(`[Firebase Webhook] User created in Firebase: ${uid}, phone: ${phoneNumber}`)

        return addSecurityHeaders(
          NextResponse.json({
            success: true,
            message: 'User creation acknowledged',
          })
        )
      }

      case 'user.updated': {
        // Optional: Sync user updates (e.g., phone number changes)
        if (phoneNumber) {
          const user = await prisma.users.findFirst({
            where: { firebaseUid: uid },
          })

          if (user) {
            const normalizedPhone = phoneNumber.startsWith('+')
              ? phoneNumber
              : `+91${phoneNumber.replace(/\D/g, '').slice(-10)}`

            await prisma.users.update({
              where: { id: user.id },
              data: { phone: normalizedPhone },
            })

            console.log(`[Firebase Webhook] Updated phone for user: ${user.id}`)
          }
        }

        return addSecurityHeaders(
          NextResponse.json({
            success: true,
            message: 'User update processed',
          })
        )
      }

      default:
        console.log(`[Firebase Webhook] Unknown event type: ${event}`)
        return addSecurityHeaders(
          NextResponse.json({
            success: true,
            message: 'Event acknowledged but not processed',
          })
        )
    }
  } catch (error) {
    console.error('[Firebase Webhook] Error:', error)
    return addSecurityHeaders(
      NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    )
  }
}

// Health check for webhook endpoint
export async function GET() {
  return addSecurityHeaders(
    NextResponse.json({
      status: 'ok',
      endpoint: 'Firebase Auth Webhook',
      supportedEvents: ['user.deleted', 'user.created', 'user.updated'],
    })
  )
}
