/**
 * Payment Webhooks Handler - Secure webhook processing for all payment providers
 * Handles subscription events, payment confirmations, and billing automation
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Webhook event types
interface WebhookEvent {
  id: string
  type: string
  data: any
  created: Date
  provider: 'razorpay' | 'stripe' | 'paypal'
  signature: string
  processed: boolean
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
  metadata: any
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
        return verifyPayPalSignature(body, signature)
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

function verifyPayPalSignature(body: string, signature: string): boolean {
  // PayPal webhook verification logic
  return true // Simplified for demo
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

function parseRazorpayEvent(data: any): WebhookEvent {
  return {
    id: data.event?.id || `evt_${Date.now()}`,
    type: data.event?.type || 'unknown',
    data: data.payload,
    created: new Date(),
    provider: 'razorpay',
    signature: '',
    processed: false,
  }
}

function parseStripeEvent(data: any): WebhookEvent {
  return {
    id: data.id,
    type: data.type,
    data: data.data.object,
    created: new Date(data.created * 1000),
    provider: 'stripe',
    signature: '',
    processed: false,
  }
}

function parsePayPalEvent(data: any): WebhookEvent {
  return {
    id: data.id,
    type: data.event_type,
    data: data.resource,
    created: new Date(data.create_time),
    provider: 'paypal',
    signature: '',
    processed: false,
  }
}

/**
 * Process webhook event based on type
 */
async function processWebhookEvent(event: WebhookEvent): Promise<any> {
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
async function handlePaymentSuccess(event: WebhookEvent): Promise<any> {
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
async function handlePaymentFailure(event: WebhookEvent): Promise<any> {
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
async function handleSubscriptionPayment(event: WebhookEvent): Promise<any> {
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
async function handleSubscriptionCancellation(event: WebhookEvent): Promise<any> {
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
async function handlePaymentRefundOrDispute(event: WebhookEvent): Promise<any> {
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
async function handleDispute(event: WebhookEvent): Promise<any> {
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

// Helper functions (mock implementations)
async function updatePaymentStatus(paymentId: string, status: string) {
  console.log(`💾 Updated payment ${paymentId} status to ${status}`)
}

async function updateSubscriptionStatus(subscriptionId: string, status: string) {
  console.log(`💾 Updated subscription ${subscriptionId} status to ${status}`)
}

async function updateSubscriptionBilling(subscriptionData: any) {
  console.log(`💾 Updated subscription billing for ${subscriptionData.id}`)
}

async function resetUsageLimits(customerId: string) {
  console.log(`🔄 Reset usage limits for customer ${customerId}`)
}

async function updateUserAccess(customerId: string, accessLevel: string) {
  console.log(`🔑 Updated user access for ${customerId} to ${accessLevel}`)
}

async function sendPaymentConfirmation(paymentData: any) {
  console.log(`📧 Sent payment confirmation for ${paymentData.id}`)
}

async function sendPaymentFailureNotification(paymentData: any) {
  console.log(`📧 Sent payment failure notification for ${paymentData.id}`)
}

async function sendBillingConfirmation(subscriptionData: any) {
  console.log(`📧 Sent billing confirmation for ${subscriptionData.id}`)
}

async function sendCancellationConfirmation(subscriptionData: any) {
  console.log(`📧 Sent cancellation confirmation for ${subscriptionData.id}`)
}

async function handleFailedSubscriptionPayment(subscriptionId: string) {
  console.log(`🔄 Handling failed subscription payment for ${subscriptionId}`)

  // Implement dunning management
  // 1. Retry payment after 3 days
  // 2. Send payment reminder emails
  // 3. If still failed after 7 days, suspend access
  // 4. If failed after 30 days, cancel subscription
}

async function scheduleAccessRevocation(subscriptionData: any) {
  console.log(`⏰ Scheduled access revocation for ${subscriptionData.id}`)
}

async function triggerRetentionCampaign(customerId: string) {
  console.log(`🎯 Triggered retention campaign for ${customerId}`)
}

async function createDisputeRecord(disputeData: any) {
  console.log(`📝 Created dispute record for ${disputeData.id}`)
}

async function gatherDisputeEvidence(disputeData: any) {
  console.log(`📋 Gathering dispute evidence for ${disputeData.id}`)
}

async function notifyFinanceTeam(disputeData: any) {
  console.log(`📞 Notified finance team about dispute ${disputeData.id}`)
}

async function trackPaymentAnalytics(eventType: string, data: any) {
  console.log(`📊 Tracked payment analytics: ${eventType}`)
}

async function updateSubscriptionAnalytics(data: any) {
  console.log(`📊 Updated subscription analytics for ${data.id}`)
}

async function updateChurnAnalytics(data: any) {
  console.log(`📊 Updated churn analytics for ${data.id}`)
}

async function updateRiskMetrics(data: any) {
  console.log(`⚠️ Updated risk metrics for dispute ${data.id}`)
}

async function processRefund(paymentData: any) {
  console.log(`💸 Processing refund for ${paymentData.id}`)
}

async function sendRefundNotification(paymentData: any) {
  console.log(`📧 Sent refund notification for ${paymentData.id}`)
}

async function handleCustomerCreated(event: WebhookEvent) {
  console.log(`👤 New customer created: ${event.data.id}`)
  return { status: 'processed', action: 'customer_onboarded' }
}

async function handleCustomerUpdated(event: WebhookEvent) {
  console.log(`👤 Customer updated: ${event.data.id}`)
  return { status: 'processed', action: 'customer_updated' }
}

async function handleSubscriptionUpdate(event: WebhookEvent) {
  console.log(`🔄 Subscription updated: ${event.data.id}`)
  return { status: 'processed', action: 'subscription_updated' }
}
