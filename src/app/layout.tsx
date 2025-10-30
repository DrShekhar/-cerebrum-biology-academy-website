import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { StructuredData } from '@/components/seo/StructuredData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import Header from '@/components/layout/Header'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { Footer } from '@/components/layout/Footer'
import { PWAProvider } from '@/components/pwa/PWAProvider'
import { MaintenancePopup } from '@/components/ui/MaintenancePopup'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cerebrumbiologyacademy.com'),
  title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Institute',
  description:
    'Top NEET Biology coaching by AIIMS experts. 98% success rate, 2000+ students mentored. Online & offline classes for Class 11th, 12th & droppers across 50+ countries.',
  keywords:
    'NEET biology coaching, AIIMS faculty, biology coaching institute, NEET preparation, medical entrance coaching, biology classes, NEET 2025, online biology coaching',
  authors: [{ name: 'Cerebrum Biology Academy' }],
  creator: 'Cerebrum Biology Academy',
  publisher: 'Cerebrum Biology Academy',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com',
    siteName: 'Cerebrum Biology Academy',
    title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Institute',
    description:
      'Top NEET Biology coaching by AIIMS experts. 98% success rate, 2000+ students mentored. Online & offline classes for Class 11th, 12th & droppers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - Best NEET Biology Coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Institute',
    description:
      'Top NEET Biology coaching by AIIMS experts. 98% success rate, 2000+ students mentored worldwide.',
    images: ['/og-image.jpg'],
    creator: '@cerebrumbiology',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com',
  },
  category: 'Education',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width, Save-Data" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta httpEquiv="Content-Language" content="en-IN,hi-IN" />
        <meta name="language" content="English,Hindi" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cerebrum Biology" />
        <meta name="application-name" content="Cerebrum Biology Academy" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Brain Logo Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon-32x32.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics />
        <PWAProvider />
        <ErrorBoundary>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[9999] font-medium"
          >
            Skip to main content
          </a>
          <div data-section="navigation" className="priority-immediate">
            <Header />
          </div>
          <main id="main-content" className="min-h-screen pb-16 md:pb-0">
            {children}
          </main>
          <div data-lazy="footer" className="priority-lazy">
            <Footer />
          </div>
          <div data-section="mobile-bottom-nav" className="priority-immediate">
            <MobileBottomNav />
          </div>
        </ErrorBoundary>
        <MaintenancePopup />
      </body>
    </html>
  )
}
