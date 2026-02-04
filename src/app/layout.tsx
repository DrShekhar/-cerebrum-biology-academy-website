import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { StructuredData } from '@/components/seo/StructuredData'
import { PageErrorBoundary } from '@/components/ErrorBoundary'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import FacebookPixel from '@/components/analytics/FacebookPixel'
import { WebVitalsReporter } from '@/components/analytics/WebVitalsReporter'
// PERFORMANCE: Using hybrid header for faster mobile LCP
// Server-rendered shell with lazy-loaded interactivity
import { HeaderHybrid } from '@/components/layout/HeaderHybrid'
import { AuthProvider } from '@/contexts/AuthContext'
import { I18nProvider } from '@/contexts/I18nContext'
import { ToastProvider } from '@/components/ui/Toast'
import { TrackingProvider } from '@/components/tracking/TrackingProvider'
import { TrustProvider } from '@/components/providers/TrustProvider'
import { PersonalizationProvider } from '@/components/providers/PersonalizationProvider'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { SkipToContent } from '@/components/accessibility/SkipToContent'
import { FocusVisibleStyles } from '@/components/accessibility/FocusVisibleStyles'
import { ConditionalHeaderFooter, ConditionalHeaderFooterProvider } from '@/components/layout/ConditionalHeaderFooter'
import { Suspense } from 'react'
import { RouteChangeIndicator } from '@/components/navigation/RouteChangeIndicator'
import {
  FloatingCTA,
  GlobalExitIntent,
  ChatbotWrapper,
  SalesAgentWidget,
  DynamicFooter,
  DynamicMobileNavigation,
  DynamicPWAProvider,
  DynamicTrialBanner,
  DynamicMaintenancePopup,
} from '@/components/layout/DynamicComponents'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'optional', // PERFORMANCE: 'optional' = use font if cached, otherwise skip swap - faster LCP
  preload: true, // Preload critical font
  adjustFontFallback: true, // Reduce CLS by adjusting fallback font metrics
  weight: ['400', '600', '700'], // Reduced from 4 to 3 weights for faster load
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Not used on initial render
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cerebrumbiologyacademy.com'),
  title: {
    default: 'Best NEET Biology Coaching Delhi NCR | Cerebrum Academy',
    template: '%s | Cerebrum Biology Academy',
  },
  description:
    'Top NEET Biology coaching Delhi NCR. AIIMS Trained faculty, 98% success, 500+ selections. Class 11-12 & droppers. FREE demo!',
  keywords:
    'NEET biology coaching, NEET coaching India, best NEET coaching Delhi NCR, NEET coaching Laxmi Nagar, NEET coaching Dwarka, NEET coaching Noida, NEET coaching Gurgaon, online NEET coaching India, NEET coaching Kota alternative, NEET coaching Hyderabad, NEET coaching Bangalore, NEET coaching Mumbai, NEET coaching Chennai, AIIMS faculty, biology coaching institute, NEET preparation, medical entrance coaching Delhi, biology classes Delhi, NEET 2026 coaching, NEET 2026 coaching, online biology coaching, zoology coaching, botany coaching, human physiology, genetics coaching, ecology NEET, best biology teacher India, biology online classes India, NEET crash course, NEET dropper batch, Class 11 biology coaching, Class 12 biology coaching, affordable NEET coaching, small batch NEET coaching, NEET mock tests, NEET study material, NCERT biology NEET, NEET coaching near me, top 10 NEET coaching India, best NEET coaching 2025',
  authors: [{ name: 'Cerebrum Biology Academy' }],
  creator: 'Cerebrum Biology Academy',
  publisher: 'Cerebrum Biology Academy',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com',
    siteName: 'Cerebrum Biology Academy',
    title: 'Best NEET Biology Coaching Delhi NCR | Cerebrum Academy',
    description:
      'Top NEET Biology coaching Delhi NCR. AIIMS Trained faculty, 98% success, 500+ selections. Class 11-12 & droppers. FREE demo!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - #1 NEET Biology Coaching with 98% Success Rate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Biology Coaching Delhi NCR | Cerebrum',
    description:
      'Top NEET Biology coaching Delhi NCR. AIIMS Trained faculty, 98% success, 500+ selections. Class 11-12 & droppers. FREE demo!',
    images: ['/og-image.jpg'],
    creator: '@cerebrumbiologyacademy',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com',
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
    languages: {
      en: 'https://cerebrumbiologyacademy.com',
      'en-IN': 'https://cerebrumbiologyacademy.com',
      hi: 'https://cerebrumbiologyacademy.com/hi',
      'hi-IN': 'https://cerebrumbiologyacademy.com/hi',
      bn: 'https://cerebrumbiologyacademy.com/bn',
      ta: 'https://cerebrumbiologyacademy.com/ta',
      te: 'https://cerebrumbiologyacademy.com/te',
      mr: 'https://cerebrumbiologyacademy.com/mr',
      kn: 'https://cerebrumbiologyacademy.com/kn',
      ml: 'https://cerebrumbiologyacademy.com/ml',
      de: 'https://cerebrumbiologyacademy.com/de',
      es: 'https://cerebrumbiologyacademy.com/es',
      fr: 'https://cerebrumbiologyacademy.com/fr',
      it: 'https://cerebrumbiologyacademy.com/it',
      ja: 'https://cerebrumbiologyacademy.com/ja',
      nl: 'https://cerebrumbiologyacademy.com/nl',
      pl: 'https://cerebrumbiologyacademy.com/pl',
      pt: 'https://cerebrumbiologyacademy.com/pt',
      ru: 'https://cerebrumbiologyacademy.com/ru',
      'x-default': 'https://cerebrumbiologyacademy.com',
    },
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

        {/* Google Ads is loaded by GoogleAnalytics component with lazyOnload strategy - no need for duplicate here */}

        <meta
          name="google-site-verification"
          content="L6c1LAGqVg_qEAtFGDcbzqeMzqFdEwT7kKFDgfn2-Sc"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width, Save-Data" />

        {/* PERFORMANCE: Next.js handles chunk preloading automatically - removed invalid static paths */}
        {/* Using modulepreload for modern browsers on actual chunks is handled by Next.js */}

        {/* Performance: Preconnect to critical domains - ORDER MATTERS */}
        {/* Google Fonts - CRITICAL for reducing render blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Self-origin preconnect for faster CSS/JS loading */}
        <link rel="preconnect" href="https://cerebrumbiologyacademy.com" />
        <link rel="preconnect" href="https://cerebrumbiologyacademy.com" crossOrigin="anonymous" />
        {/* Vercel CDN for static assets */}
        <link rel="preconnect" href="https://vercel.live" />
        {/* Third-party services - PERFORMANCE: GTM preconnect removed since script uses lazyOnload */}
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="//checkout.razorpay.com" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="dns-prefetch" href="//giscus.app" />
        <link rel="dns-prefetch" href="//i.ytimg.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//assets.zyrosite.com" />

        {/* Fonts are handled by next/font/google - no manual preload needed */}
        {/* Logo preloading is handled by Next.js Image priority prop in HeaderHybrid */}

        <meta httpEquiv="Content-Language" content="en-IN,hi-IN" />
        <meta name="language" content="English,Hindi" />

        {/* Comprehensive hreflang tags for 17 languages + x-default */}
        <link rel="alternate" hrefLang="en" href="https://cerebrumbiologyacademy.com" />
        <link rel="alternate" hrefLang="en-IN" href="https://cerebrumbiologyacademy.com" />
        <link rel="alternate" hrefLang="hi" href="https://cerebrumbiologyacademy.com/hi" />
        <link rel="alternate" hrefLang="hi-IN" href="https://cerebrumbiologyacademy.com/hi" />
        <link rel="alternate" hrefLang="bn" href="https://cerebrumbiologyacademy.com/bn" />
        <link rel="alternate" hrefLang="ta" href="https://cerebrumbiologyacademy.com/ta" />
        <link rel="alternate" hrefLang="te" href="https://cerebrumbiologyacademy.com/te" />
        <link rel="alternate" hrefLang="mr" href="https://cerebrumbiologyacademy.com/mr" />
        <link rel="alternate" hrefLang="kn" href="https://cerebrumbiologyacademy.com/kn" />
        <link rel="alternate" hrefLang="ml" href="https://cerebrumbiologyacademy.com/ml" />
        <link rel="alternate" hrefLang="de" href="https://cerebrumbiologyacademy.com/de" />
        <link rel="alternate" hrefLang="es" href="https://cerebrumbiologyacademy.com/es" />
        <link rel="alternate" hrefLang="fr" href="https://cerebrumbiologyacademy.com/fr" />
        <link rel="alternate" hrefLang="it" href="https://cerebrumbiologyacademy.com/it" />
        <link rel="alternate" hrefLang="ja" href="https://cerebrumbiologyacademy.com/ja" />
        <link rel="alternate" hrefLang="nl" href="https://cerebrumbiologyacademy.com/nl" />
        <link rel="alternate" hrefLang="pl" href="https://cerebrumbiologyacademy.com/pl" />
        <link rel="alternate" hrefLang="pt" href="https://cerebrumbiologyacademy.com/pt" />
        <link rel="alternate" hrefLang="ru" href="https://cerebrumbiologyacademy.com/ru" />
        <link rel="alternate" hrefLang="x-default" href="https://cerebrumbiologyacademy.com" />
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

        {/* Critical CSS for instant LCP - minimal above-the-fold styles (~2KB) */}
        {/* OPTIMIZED: Removed animations from critical CSS - they load from main CSS after LCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `*,::before,::after{box-sizing:border-box}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:system-ui,-apple-system,sans-serif}body{margin:0;overflow-x:hidden}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.min-h-screen{min-height:100vh}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.overflow-hidden{overflow:hidden}.text-white{color:#fff}.text-yellow-300{color:#fcd34d}.text-green-300{color:#86efac}.font-bold{font-weight:700}.font-semibold{font-weight:600}.hidden{display:none!important}.block{display:block}@media(min-width:640px){.sm\\:hidden{display:none!important}.sm\\:block{display:block!important}}@media(min-width:768px){.md\\:hidden{display:none!important}.md\\:block{display:block!important}.md\\:pb-0{padding-bottom:0}}@media(min-width:1024px){.lg\\:hidden{display:none!important}.lg\\:block{display:block!important}}`,
          }}
        />

        {/* PERFORMANCE: Removed inline scripts that were blocking parsing
            - CSS MIME error suppression moved to error boundary
            - Task scheduler now handled by browser native APIs */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* PERFORMANCE: Analytics moved after main content for better LCP */}
        {/* These scripts use lazyOnload strategy but still benefit from being after content */}
        <DynamicPWAProvider />
        <FocusVisibleStyles />
        <I18nProvider>
          <AuthProvider>
            <TrackingProvider>
              <ToastProvider>
                <TrustProvider
                  enableSocialProof={false}
                  enableTrustBadges={false}
                  enableRealTimeUpdates={false}
                >
                  <PersonalizationProvider>
                    <MotionProvider>
                      <PageErrorBoundary>
                        {/* Navigation progress indicator - prevents FOUC during page transitions */}
                        <Suspense fallback={null}>
                          <RouteChangeIndicator />
                        </Suspense>
                        {/* Single provider for all ConditionalHeaderFooter instances - prevents multiple pathname subscriptions */}
                        <ConditionalHeaderFooterProvider>
                        <ConditionalHeaderFooter>
                          <SkipToContent />
                        </ConditionalHeaderFooter>
                        <ConditionalHeaderFooter>
                          <div
                            data-section="navigation"
                            className="priority-immediate"
                            role="banner"
                          >
                            <HeaderHybrid />
                          </div>
                        </ConditionalHeaderFooter>
                        <ConditionalHeaderFooter>
                          <DynamicTrialBanner />
                        </ConditionalHeaderFooter>
                        <main id="main-content" role="main" className="min-h-screen pb-[var(--mobile-nav-safe-height)] md:pb-0">
                          {children}
                        </main>
                        <ConditionalHeaderFooter>
                          <div data-lazy="footer" className="priority-lazy" role="contentinfo">
                            <DynamicFooter />
                          </div>
                        </ConditionalHeaderFooter>
                        <ConditionalHeaderFooter>
                          <div data-section="mobile-navigation" className="priority-deferred">
                            <DynamicMobileNavigation />
                          </div>
                        </ConditionalHeaderFooter>
                        <ConditionalHeaderFooter>
                          <FloatingCTA />
                        </ConditionalHeaderFooter>
                        <ConditionalHeaderFooter>
                          <GlobalExitIntent />
                        </ConditionalHeaderFooter>
                        <ConditionalHeaderFooter>
                          <ChatbotWrapper />
                        </ConditionalHeaderFooter>
                        {/* ARIA Sales Agent - positioned on right side */}
                        <ConditionalHeaderFooter>
                          <SalesAgentWidget />
                        </ConditionalHeaderFooter>
                        <ConditionalHeaderFooter>
                          <DynamicMaintenancePopup />
                        </ConditionalHeaderFooter>
                        </ConditionalHeaderFooterProvider>
                        {/* PERFORMANCE: Analytics after main content for better LCP */}
                        <GoogleAnalytics />
                        <FacebookPixel />
                        <WebVitalsReporter />
                      </PageErrorBoundary>
                    </MotionProvider>
                  </PersonalizationProvider>
                </TrustProvider>
              </ToastProvider>
            </TrackingProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
// Build: 1765944827
