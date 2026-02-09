/**
 * Payment Webhooks Handler - Secure webhook processing for all payment providers
 * Handles subscription events, payment confirmations, and billing automation
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Type definitions for webhook payloads
type PaymentProvider = 'razorpay' | 'stripe' | 'paypal'

interface RazorpayWebhookPayload {
  event?: {
    id: string
    type: string
  }
  payload: Record<string, unknown>
}

interface StripeWebhookPayload {
  id: string
  type: string
  created: number
  data: {
    object: Record<string, unknown>
  }
}

interface PayPalWebhookPayload {
  id: string
  event_type: string
  create_time: string
  resource: Record<string, unknown>
}

// Webhook event types
interface WebhookEvent {
  id: string
  type: string
  data: WebhookEventData
  created: Date
  provider: PaymentProvider
  signature: string
  processed: boolean
}

interface WebhookEventData {
  id?: string
  customer_id?: string
  subscription_id?: string
  [key: string]: unknown
}

interface PaymentEventMetadata {
  source?: string
  campaign?: string
  [key: string]: string | undefined
}

interface PaymentEvent {
  payment_id: string
  order_id: string
  amount: number
  currency: string
  status: 'captured' | 'failed' | 'refunded'
  method: string
  user_id?: string
  subscription_id?: string
  metadata: PaymentEventMetadata
}

// Result types for processed events
interface ProcessedEventResult {
  status: 'processed' | 'ignored'
  action?: string
  payment_id?: string
  subscription_id?: string
  dispute_id?: string
}

interface SubscriptionEvent {
  subscription_id: string
  user_id: string
  plan_id: string
  status: 'created' | 'active' | 'cancelled' | 'past_due' | 'unpaid'
  current_period_start: Date
  current_period_end: Date
  amount: number
  currency: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('signature') || request.headers.get('x-signature')
    const provider = determineProvider(request)

    console.log(`💳 Webhook received from ${provider}`)

    // Verify webhook signature
    const isValid = await verifyWebhookSignature(body, signature, provider)
    if (!isValid) {
      console.error('❌ Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = parseWebhookEvent(body, provider)

    // Process webhook event
    const result = await processWebhookEvent(event)

    console.log(`✅ Webhook processed: ${event.type}`)

    return NextResponse.json({
      success: true,
      event_id: event.id,
      processed: true,
      timestamp: new Date(),
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

/**
 * Determine payment provider from request headers
 */
function determineProvider(request: NextRequest): 'razorpay' | 'stripe' | 'paypal' {
  const userAgent = request.headers.get('user-agent') || ''
  const webhook = request.headers.get('x-razorpay-event-id')
  const stripeSignature = request.headers.get('stripe-signature')

  if (webhook) return 'razorpay'
  if (stripeSignature) return 'stripe'
  if (userAgent.includes('PayPal')) return 'paypal'

  return 'razorpay' // Default
}

/**
 * Verify webhook signature for security
 */
async function verifyWebhookSignature(
  body: string,
  signature: string | null,
  provider: string
): Promise<boolean> {
  if (!signature) return false

  try {
    switch (provider) {
      case 'razorpay':
        return verifyRazorpaySignature(body, signature)
      case 'stripe':
        return verifyStripeSignature(body, signature)
      case 'paypal':
        return await verifyPayPalSignature(body, signature)
      default:
        return false
    }
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

function verifyRazorpaySignature(body: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) {
    console.error('CRITICAL: RAZORPAY_WEBHOOK_SECRET is not configured')
    return false
  }
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

function verifyStripeSignature(body: string, signature: string): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('CRITICAL: STRIPE_WEBHOOK_SECRET is not configured')
    return false
  }
  const timestamp = signature.split(',')[0].replace('t=', '')
  const signatureHash = signature.split(',')[1].replace('v1=', '')

  const payload = timestamp + '.' + body
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signatureHash), Buffer.from(expectedSignature))
}

async function verifyPayPalSignature(body: string, signature: string): Promise<boolean> {
  // SECURITY: PayPal webhook verification using verify-webhook-signature API
  const webhookId = process.env.PAYPAL_WEBHOOK_ID
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!webhookId || !clientId || !clientSecret) {
    console.error('CRITICAL: PayPal credentials not configured (PAYPAL_WEBHOOK_ID, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET)')
    return false
  }

  if (!signature || signature.length < 32) {
    console.error('PayPal webhook: Invalid signature format')
    return false
  }

  try {
    // Get OAuth token for PayPal API
    const isProduction = process.env.NODE_ENV === 'production'
    const baseUrl = isProduction
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com'

    const authResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    })

    if (!authResponse.ok) {
      console.error('PayPal OAuth failed:', await authResponse.text())
      return false
    }

    const { access_token } = await authResponse.json()

    // Parse the webhook event to get required fields
    const webhookEvent = JSON.parse(body)

    // Verify webhook signature using PayPal API
    const verifyResponse = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        auth_algo: 'SHA256withRSA',
        cert_url: webhookEvent.cert_url || '',
        transmission_id: webhookEvent.transmission_id || '',
        transmission_sig: signature,
        transmission_time: webhookEvent.transmission_time || '',
        webhook_id: webhookId,
        webhook_event: webhookEvent,
      }),
    })

    if (!verifyResponse.ok) {
      console.error('PayPal webhook verification failed:', await verifyResponse.text())
      return false
    }

    const verifyResult = await verifyResponse.json()
    const isValid = verifyResult.verification_status === 'SUCCESS'

    if (!isValid) {
      console.error('PayPal webhook signature invalid:', verifyResult.verification_status)
    }

    return isValid
  } catch (error) {
    console.error('PayPal webhook verification error:', error)
    return false
  }
}

/**
 * Parse webhook event from request body
 */
function parseWebhookEvent(body: string, provider: string): WebhookEvent {
  const data = JSON.parse(body)

  switch (provider) {
    case 'razorpay':
      return parseRazorpayEvent(data)
    case 'stripe':
      return parseStripeEvent(data)
    case 'paypal':
      return parsePayPalEvent(data)
    default:
      throw new Error('Unknown provider')
  }
}

function parseRazorpayEvent(data: RazorpayWebhookPayload): WebhookEvent {
  return {
    id: data.event?.id || `evt_${Date.now()}`,
    type: data.event?.type || 'unknown',
    data: data.payload as WebhookEventData,
    created: new Date(),
    provider: 'razorpay',
    signature: '',
    processed: false,
  }
}

function parseStripeEvent(data: StripeWebhookPayload): WebhookEvent {
  return {
    id: data.id,
    type: data.type,
    data: data.data.object as WebhookEventData,
    created: new Date(data.created * 1000),
    provider: 'stripe',
    signature: '',
    processed: false,
  }
}

function parsePayPalEvent(data: PayPalWebhookPayload): WebhookEvent {
  return {
    id: data.id,
    type: data.event_type,
    data: data.resource as WebhookEventData,
    created: new Date(data.create_time),
    provider: 'paypal',
    signature: '',
    processed: false,
  }
}

/**
 * Process webhook event based on type
 */
async function processWebhookEvent(event: WebhookEvent): Promise<ProcessedEventResult> {
  switch (event.type) {
    // Payment events
    case 'payment.captured':
    case 'payment_intent.succeeded':
      return await handlePaymentSuccess(event)

    case 'payment.failed':
    case 'payment_intent.payment_failed':
      return await handlePaymentFailure(event)

    case 'payment.refunded':
    case 'charge.dispute.created':
      return await handlePaymentRefundOrDispute(event)

    // Subscription events
    case 'subscription.charged':
    case 'invoice.payment_succeeded':
      return await handleSubscriptionPayment(event)

    case 'subscription.cancelled':
    case 'customer.subscription.deleted':
      return await handleSubscriptionCancellation(event)

    case 'subscription.updated':
    case 'customer.subscription.updated':
      return await handleSubscriptionUpdate(event)

    // Customer events
    case 'customer.created':
      return await handleCustomerCreated(event)

    case 'customer.updated':
      return await handleCustomerUpdated(event)

    // Dispute and chargeback events
    case 'dispute.created':
      return await handleDispute(event)

    default:
      console.log(`Unhandled webhook event: ${event.type}`)
      return { status: 'ignored' }
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(event: WebhookEvent): Promise<ProcessedEventResult> {
  const paymentData = event.data

  console.log(`✅ Payment successful: ${paymentData.id}`)

  // Update payment status in database
  await updatePaymentStatus(paymentData.id, 'captured')

  // If it's a subscription payment, update subscription status
  if (paymentData.subscription_id) {
    await updateSubscriptionStatus(paymentData.subscription_id, 'active')
  }

  // Send confirmation email
  await sendPaymentConfirmation(paymentData)

  // Update user's access permissions
  await updateUserAccess(paymentData.customer_id, 'active')

  // Track analytics
  await trackPaymentAnalytics('payment_success', paymentData)

  return {
    status: 'processed',
    action: 'payment_confirmed',
    payment_id: paymentData.id,
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(event: WebhookEvent): Promise<ProcessedEventResult> {
  const paymentData = event.data

  console.log(`❌ Payment failed: ${paymentData.id}`)

  // Update payment status
  await updatePaymentStatus(paymentData.id, 'failed')

  // If it's a subscription payment, handle dunning
  if (paymentData.subscription_id) {
    await handleFailedSubscriptionPayment(paymentData.subscription_id)
  }

  // Send failure notification
  await sendPaymentFailureNotification(paymentData)

  // Track analytics
  await trackPaymentAnalytics('payment_failed', paymentData)

  return {
    status: 'processed',
    action: 'payment_failed_handled',
    payment_id: paymentData.id,
  }
}

/**
 * Handle subscription payment
 */
async function handleSubscriptionPayment(event: WebhookEvent): Promise<ProcessedEventResult> {
  const subscriptionData = event.data

  console.log(`🔄 Subscription payment: ${subscriptionData.id}`)

  // Update subscription billing
  await updateSubscriptionBilling(subscriptionData)

  // Reset usage limits for new billing period
  await resetUsageLimits(subscriptionData.customer_id)

  // Send billing confirmation
  await sendBillingConfirmation(subscriptionData)

  // Update subscription analytics
  await updateSubscriptionAnalytics(subscriptionData)

  return {
    status: 'processed',
    action: 'subscription_billed',
    subscription_id: subscriptionData.id,
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCancellation(event: WebhookEvent): Promise<ProcessedEventResult> {
  const subscriptionData = event.data

  console.log(`❌ Subscription cancelled: ${subscriptionData.id}`)

  // Update subscription status
  await updateSubscriptionStatus(subscriptionData.id, 'cancelled')

  // Schedule access revocation at period end
  await scheduleAccessRevocation(subscriptionData)

  // Send cancellation confirmation
  await sendCancellationConfirmation(subscriptionData)

  // Trigger retention campaign
  await triggerRetentionCampaign(subscriptionData.customer_id)

  // Update churn analytics
  await updateChurnAnalytics(subscriptionData)

  return {
    status: 'processed',
    action: 'subscription_cancelled',
    subscription_id: subscriptionData.id,
  }
}

/**
 * Handle payment refund or dispute
 */
async function handlePaymentRefundOrDispute(event: WebhookEvent): Promise<ProcessedEventResult> {
  const paymentData = event.data

  console.log(`💰 Payment refund/dispute: ${paymentData.id}`)

  // Update payment status
  await updatePaymentStatus(paymentData.id, 'refunded')

  // Handle refund processing
  await processRefund(paymentData)

  // Send refund notification
  await sendRefundNotification(paymentData)

  // Track analytics
  await trackPaymentAnalytics('payment_refunded', paymentData)

  return {
    status: 'processed',
    action: 'refund_processed',
    payment_id: paymentData.id,
  }
}

/**
 * Handle dispute/chargeback
 */
async function handleDispute(event: WebhookEvent): Promise<ProcessedEventResult> {
  const disputeData = event.data

  console.log(`⚠️ Dispute created: ${disputeData.id}`)

  // Create dispute record
  await createDisputeRecord(disputeData)

  // Gather dispute evidence
  await gatherDisputeEvidence(disputeData)

  // Notify finance team
  await notifyFinanceTeam(disputeData)

  // Update risk metrics
  await updateRiskMetrics(disputeData)

  return {
    status: 'processed',
    action: 'dispute_created',
    dispute_id: disputeData.id,
  }
}

// Helper functions — STUB implementations
// TODO: Replace these with real database operations before going live with payments
function warnStub(operation: string, id: string | undefined): void {
  const msg = `[WEBHOOK STUB] ${operation} called for ${id} — no database update performed`
  if (process.env.NODE_ENV === 'production') {
    console.error(msg)
  } else {
    console.warn(msg)
  }
}

async function updatePaymentStatus(paymentId: string | undefined, status: string): Promise<void> {
  warnStub('updatePaymentStatus', paymentId)
}

async function updateSubscriptionStatus(
  subscriptionId: string | undefined,
  status: string
): Promise<void> {
  warnStub('updateSubscriptionStatus', subscriptionId)
}

async function updateSubscriptionBilling(subscriptionData: WebhookEventData): Promise<void> {
  warnStub('updateSubscriptionBilling', subscriptionData.id)
}

async function resetUsageLimits(customerId: string | undefined): Promise<void> {
  warnStub('resetUsageLimits', customerId)
}

async function updateUserAccess(
  customerId: string | undefined,
  accessLevel: string
): Promise<void> {
  warnStub('updateUserAccess', customerId)
}

async function sendPaymentConfirmation(paymentData: WebhookEventData): Promise<void> {
  warnStub('sendPaymentConfirmation', paymentData.id)
}

async function sendPaymentFailureNotification(paymentData: WebhookEventData): Promise<void> {
  warnStub('sendPaymentFailureNotification', paymentData.id)
}

async function sendBillingConfirmation(subscriptionData: WebhookEventData): Promise<void> {
  warnStub('sendBillingConfirmation', subscriptionData.id)
}

async function sendCancellationConfirmation(subscriptionData: WebhookEventData): Promise<void> {
  warnStub('sendCancellationConfirmation', subscriptionData.id)
}

async function handleFailedSubscriptionPayment(subscriptionId: string | undefined): Promise<void> {
  warnStub('handleFailedSubscriptionPayment', subscriptionId)
  // TODO: Implement dunning management
  // 1. Retry payment after 3 days
  // 2. Send payment reminder emails
  // 3. If still failed after 7 days, suspend access
  // 4. If failed after 30 days, cancel subscription
}

async function scheduleAccessRevocation(subscriptionData: WebhookEventData): Promise<void> {
  warnStub('scheduleAccessRevocation', subscriptionData.id)
}

async function triggerRetentionCampaign(customerId: string | undefined): Promise<void> {
  warnStub('triggerRetentionCampaign', customerId)
}

async function createDisputeRecord(disputeData: WebhookEventData): Promise<void> {
  warnStub('createDisputeRecord', disputeData.id)
}

async function gatherDisputeEvidence(disputeData: WebhookEventData): Promise<void> {
  warnStub('gatherDisputeEvidence', disputeData.id)
}

async function notifyFinanceTeam(disputeData: WebhookEventData): Promise<void> {
  warnStub('notifyFinanceTeam', disputeData.id)
}

async function trackPaymentAnalytics(eventType: string, data: WebhookEventData): Promise<void> {
  warnStub('trackPaymentAnalytics', data.id)
}

async function updateSubscriptionAnalytics(data: WebhookEventData): Promise<void> {
  warnStub('updateSubscriptionAnalytics', data.id)
}

async function updateChurnAnalytics(data: WebhookEventData): Promise<void> {
  warnStub('updateChurnAnalytics', data.id)
}

async function updateRiskMetrics(data: WebhookEventData): Promise<void> {
  warnStub('updateRiskMetrics', data.id)
}

async function processRefund(paymentData: WebhookEventData): Promise<void> {
  warnStub('processRefund', paymentData.id)
}

async function sendRefundNotification(paymentData: WebhookEventData): Promise<void> {
  warnStub('sendRefundNotification', paymentData.id)
}

async function handleCustomerCreated(event: WebhookEvent): Promise<ProcessedEventResult> {
  warnStub('handleCustomerCreated', event.data.id)
  return { status: 'processed', action: 'customer_onboarded' }
}

async function handleCustomerUpdated(event: WebhookEvent): Promise<ProcessedEventResult> {
  warnStub('handleCustomerUpdated', event.data.id)
  return { status: 'processed', action: 'customer_updated' }
}

async function handleSubscriptionUpdate(event: WebhookEvent): Promise<ProcessedEventResult> {
  warnStub('handleSubscriptionUpdate', event.data.id)
  return { status: 'processed', action: 'subscription_updated' }
}
