import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email,
        role: session.user?.role,
        image: session.user?.image,
      },
      expires: session.expires,
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json({ error: 'Failed to get session' }, { status: 500 })
  }
}
