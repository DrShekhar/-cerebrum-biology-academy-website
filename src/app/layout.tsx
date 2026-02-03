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
import { ConditionalHeaderFooter } from '@/components/layout/ConditionalHeaderFooter'
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
  display: 'swap', // PERFORMANCE: 'swap' shows text immediately with fallback, then swaps to custom font for better LCP
  preload: true, // Preload critical font
  adjustFontFallback: true, // Reduce CLS by adjusting fallback font metrics
  weight: ['400', '500', '600', '700'], // Only load weights we actually use
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

        {/* PERFORMANCE: Preload critical chunks to reduce LCP render delay */}
        {/* Priority hints for LCP optimization */}
        <link
          rel="preload"
          href="/_next/static/chunks/webpack.js"
          as="script"
          crossOrigin="anonymous"
        />
        {/* CRITICAL: Preload main CSS to reduce render-blocking time */}
        <link rel="preload" as="style" href="/_next/static/css/app/layout.css" />

        {/* PERFORMANCE: Preload LCP font to reduce render delay on mobile */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/geist/v1/gyByhwU-HdjnYOVuqmc.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

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

        {/* Critical CSS for instant LCP - minimal above-the-fold styles (~4KB) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `*,::before,::after{box-sizing:border-box}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-geist-sans),system-ui,-apple-system,sans-serif}body{margin:0;overflow-x:hidden}header{background:rgba(255,255,255,.95);position:sticky;top:0;z-index:50;backdrop-filter:blur(8px)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.flex{display:flex}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}.px-4{padding-left:1rem;padding-right:1rem}.min-h-screen{min-height:100vh}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.overflow-hidden{overflow:hidden}.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}.from-blue-900{--tw-gradient-from:#1e3a8a;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,#1e3a8a00)}.text-white{color:#fff}.text-yellow-300{color:#fcd34d}.text-green-300{color:#86efac}.text-blue-100{color:#dbeafe}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-2xl{font-size:1.5rem;line-height:2rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-base{font-size:1rem;line-height:1.5rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.hidden{display:none!important}.block{display:block}.sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}@keyframes fade-in-up{from{opacity:.7;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in-up{animation:fade-in-up .4s ease-out forwards}@media(min-width:640px){.sm\\:hidden{display:none!important}.sm\\:block{display:block!important}.sm\\:flex{display:flex!important}}@media(min-width:768px){.md\\:hidden{display:none!important}.md\\:block{display:block!important}.md\\:flex{display:flex!important}.md\\:pb-0{padding-bottom:0}}@media(min-width:1024px){.lg\\:hidden{display:none!important}.lg\\:block{display:block!important}.lg\\:flex{display:flex!important}}`,
          }}
        />

        {/* CSS Script Bug Error Suppression (Next.js bug #75656)
            NOTE: FOUC prevention via opacity:0 was REMOVED because it causes LCP = 0
            The critical CSS inline styles above + font-display:swap handle visual stability */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var o=window.onerror;window.onerror=function(m,u,l,c,e){if(m&&typeof m==='string'&&m.indexOf('MIME type')!==-1&&m.indexOf('.css')!==-1)return true;return o?o.apply(this,arguments):false};var c=console.error;console.error=function(){var a=Array.prototype.slice.call(arguments);if(a.join(' ').indexOf('MIME type')!==-1&&a.join(' ').indexOf('.css')!==-1)return;return c.apply(console,a)}})();`,
          }}
        />

        {/* PERFORMANCE: Yield to main thread for better LCP/TBT
            This script breaks up long tasks by yielding control back to the browser */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window!=='undefined'){window.__scheduleTask=function(fn,priority){if('scheduler'in window&&'postTask'in window.scheduler){return window.scheduler.postTask(fn,{priority:priority||'background'})}else if('requestIdleCallback'in window){return requestIdleCallback(fn)}else{return setTimeout(fn,0)}};}})();`,
          }}
        />
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
