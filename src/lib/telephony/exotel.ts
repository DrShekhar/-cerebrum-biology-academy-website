/**
 * Exotel click-to-call (PLATFORM_VISION §4.2 Phase 1).
 *
 * Bridge call: Exotel rings the counselor's phone FIRST, then connects the
 * prospect — the CRM never needs a softphone. Recording is on by default at
 * the Exotel account level; the StatusCallback webhook returns the terminal
 * status + RecordingUrl, which we persist on call_logs and surface in the
 * lead timeline.
 *
 * Env (all required to activate; gracefully "not configured" otherwise):
 *  EXOTEL_SID          — account sid (subdomain in the dashboard URL)
 *  EXOTEL_API_KEY      — API key
 *  EXOTEL_API_TOKEN    — API token
 *  EXOTEL_VIRTUAL_NUMBER — the Exophone used as caller id
 *  EXOTEL_WEBHOOK_TOKEN  — shared secret we append to our StatusCallback URL
 *                          (Exotel doesn't sign webhooks)
 *
 * Compliance note (DPDP): configure the Exophone's connect applet to play a
 * "this call may be recorded for quality and training" announcement on the
 * customer leg, and only call inbound leads (consent lane).
 */

const EXOTEL_BASE = 'https://api.in.exotel.com/v1/Accounts'

export interface ExotelConfig {
  sid: string
  apiKey: string
  apiToken: string
  virtualNumber: string
}

export function getExotelConfig(): ExotelConfig | null {
  const sid = process.env.EXOTEL_SID
  const apiKey = process.env.EXOTEL_API_KEY
  const apiToken = process.env.EXOTEL_API_TOKEN
  const virtualNumber = process.env.EXOTEL_VIRTUAL_NUMBER
  if (!sid || !apiKey || !apiToken || !virtualNumber) return null
  return { sid, apiKey, apiToken, virtualNumber }
}

export function isExotelConfigured(): boolean {
  return getExotelConfig() !== null
}

function authHeader(cfg: ExotelConfig): string {
  return `Basic ${Buffer.from(`${cfg.apiKey}:${cfg.apiToken}`).toString('base64')}`
}

export interface InitiateCallResult {
  success: boolean
  callSid?: string
  error?: string
}

/**
 * Connect two numbers: rings `agentNumber` first, then bridges `customerNumber`.
 * A 200 here means Exotel ACCEPTED the request — the real outcome arrives on
 * the StatusCallback webhook.
 */
export async function initiateBridgeCall(params: {
  agentNumber: string
  customerNumber: string
  statusCallbackUrl: string
}): Promise<InitiateCallResult> {
  const cfg = getExotelConfig()
  if (!cfg) return { success: false, error: 'Calling is not configured yet (Exotel keys missing).' }

  const form = new URLSearchParams({
    From: params.agentNumber,
    To: params.customerNumber,
    CallerId: cfg.virtualNumber,
    CallType: 'trans', // transactional: calling back our own inbound leads
    StatusCallback: params.statusCallbackUrl,
    'StatusCallbackEvents[0]': 'terminal',
    Record: 'true',
  })

  try {
    const res = await fetch(`${EXOTEL_BASE}/${cfg.sid}/Calls/connect.json`, {
      method: 'POST',
      headers: {
        Authorization: authHeader(cfg),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    })
    const data = (await res.json().catch(() => null)) as {
      Call?: { Sid?: string }
      RestException?: { Message?: string }
    } | null

    if (!res.ok || !data?.Call?.Sid) {
      const message = data?.RestException?.Message || `Exotel returned ${res.status}`
      console.error('[exotel] connect failed:', message)
      return { success: false, error: message }
    }
    return { success: true, callSid: data.Call.Sid }
  } catch (error) {
    console.error('[exotel] connect error:', error)
    return { success: false, error: 'Could not reach the calling service.' }
  }
}

/**
 * Fetch a recording (Exotel recording URLs require API auth). Used by the
 * playback proxy so counselors stream audio without ever seeing credentials.
 */
export async function fetchRecording(recordingUrl: string): Promise<Response | null> {
  const cfg = getExotelConfig()
  if (!cfg) return null
  try {
    // Only proxy Exotel-owned URLs — never arbitrary ones from the DB.
    const url = new URL(recordingUrl)
    if (!url.hostname.endsWith('.exotel.com') && !url.hostname.endsWith('.exotel.in')) {
      return null
    }
    return await fetch(recordingUrl, { headers: { Authorization: authHeader(cfg) } })
  } catch {
    return null
  }
}
