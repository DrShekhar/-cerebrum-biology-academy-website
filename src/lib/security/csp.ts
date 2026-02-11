import { NextResponse } from 'next/server'

/**
 * Content Security Policy headers
 * Kept in a lightweight module so Edge middleware does not import server-only deps.
 */
export function addCSPHeaders(response: NextResponse): NextResponse {
  const isDevelopment = process.env.NODE_ENV === 'development'

  const cspDirectives = [
    "default-src 'self'",
    // Next.js App Router needs inline bootstrap scripts for hydration.
    // Keep unsafe-eval only in development.
    `script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel.app https://www.googletagmanager.com https://www.google-analytics.com https://checkout.razorpay.com https://*.razorpay.com https://*.sentry.io https://browser.sentry-cdn.com https://*.firebaseapp.com${isDevelopment ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob: https://*.googleusercontent.com",
    "media-src 'self' https: blob:",
    "connect-src 'self' https://cerebrumbiologyacademy.com https://api.cerebrumbiologyacademy.com https://www.google-analytics.com https://*.razorpay.com https://api.razorpay.com https://*.sentry.io https://*.ingest.sentry.io https://firebaseinstallations.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://vitals.vercel-insights.com https://*.vercel.app https://*.firebaseio.com wss://*.firebaseio.com",
    "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://api.razorpay.com https://*.razorpay.com https://challenges.cloudflare.com https://*.firebaseapp.com",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://*.razorpay.com",
    "frame-ancestors 'self'",
    "manifest-src 'self'",
    ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
  ]

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))
  return response
}
