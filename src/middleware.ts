import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Redirect www to non-www (canonical URL)
  if (hostname === 'www.cerebrumbiologyacademy.com') {
    const url = request.nextUrl.clone()
    url.host = 'cerebrumbiologyacademy.com'
    url.protocol = 'https'

    return NextResponse.redirect(url, 301)
  }

  // Set pathname header for layout to detect auth/special routes
  // Headers set on requestHeaders are available in layout via headers()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
}
