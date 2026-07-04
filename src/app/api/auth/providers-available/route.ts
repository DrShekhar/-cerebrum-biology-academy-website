import { NextResponse } from 'next/server'
import { isGoogleAuthConfigured, isFacebookAuthConfigured } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Tells the sign-in/sign-up UI which social providers are actually configured
// so OAuth buttons only render when clicking them can work.
export async function GET() {
  return NextResponse.json({
    success: true,
    google: isGoogleAuthConfigured,
    facebook: isFacebookAuthConfigured,
  })
}
