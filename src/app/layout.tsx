import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { StructuredData } from '@/components/seo/StructuredData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import Header from '@/components/layout/Header'
import { MobileNavigation } from '@/components/navigation/MobileNavigation'
import { Footer } from '@/components/layout/Footer'
import { PWAProvider } from '@/components/pwa/PWAProvider'
import { MaintenancePopup } from '@/components/ui/MaintenancePopup'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/components/ui/Toast'
import { TrialBannerWrapper } from '@/components/trial/TrialBannerWrapper'
import { TrustProvider } from '@/components/providers/TrustProvider'
import { SkipToContent } from '@/components/accessibility/SkipToContent'
import { FocusVisibleStyles } from '@/components/accessibility/FocusVisibleStyles'
import { FloatingCTA } from '@/components/common/FloatingCTA'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true, // Preload critical font
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Not used on initial render
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

        {/* Performance: Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//checkout.razorpay.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Performance: Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

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
        <FocusVisibleStyles />
        <AuthProvider>
          <ToastProvider>
            <TrustProvider
              enableSocialProof={false}
              enableTrustBadges={true}
              enableRealTimeUpdates={true}
            >
              <ErrorBoundary>
                <SkipToContent />
                <div data-section="navigation" className="priority-immediate" role="banner">
                  <Header />
                </div>
                <TrialBannerWrapper />
                <main id="main-content" role="main" className="min-h-screen pb-16 md:pb-0">
                  {children}
                </main>
                <div data-lazy="footer" className="priority-lazy" role="contentinfo">
                  <Footer />
                </div>
                <div data-section="mobile-navigation" className="priority-immediate">
                  <MobileNavigation />
                </div>
                <FloatingCTA />
              </ErrorBoundary>
            </TrustProvider>
          </ToastProvider>
        </AuthProvider>
        {/* <MaintenancePopup /> */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
