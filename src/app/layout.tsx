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
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
    languages: {
      en: 'https://cerebrumbiologyacademy.com',
      'en-IN': 'https://cerebrumbiologyacademy.com',
      hi: 'https://cerebrumbiologyacademy.com/hi',
      'hi-IN': 'https://cerebrumbiologyacademy.com/hi',
      ta: 'https://cerebrumbiologyacademy.com/ta',
      'ta-IN': 'https://cerebrumbiologyacademy.com/ta',
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

        {/* hreflang tags — only languages with actual pages */}
        <link rel="alternate" hrefLang="en" href="https://cerebrumbiologyacademy.com" />
        <link rel="alternate" hrefLang="en-IN" href="https://cerebrumbiologyacademy.com" />
        <link rel="alternate" hrefLang="hi" href="https://cerebrumbiologyacademy.com/hi" />
        <link rel="alternate" hrefLang="hi-IN" href="https://cerebrumbiologyacademy.com/hi" />
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

        {/* Critical CSS for instant LCP - hero section styles for immediate paint */}
        {/* EXPANDED: Includes hero background, text, layout, and CTA for sub-2s LCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `*,::before,::after{box-sizing:border-box}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:system-ui,-apple-system,sans-serif}body{margin:0;overflow-x:hidden}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.min-h-screen{min-height:100vh}.relative{position:relative}.absolute{position:absolute}.inset-0{inset:0}.overflow-hidden{overflow:hidden}.text-white{color:#fff}.text-yellow-300{color:#fcd34d}.text-yellow-200{color:#fef08a}.text-green-300{color:#86efac}.text-green-100{color:#dcfce7}.text-blue-100{color:#dbeafe}.font-bold{font-weight:700}.font-semibold{font-weight:600}.font-medium{font-weight:500}.hidden{display:none}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.items-center{align-items:center}.justify-center{justify-content:center}.w-full{width:100%}.max-w-7xl{max-width:80rem}.mx-auto{margin-left:auto;margin-right:auto}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-6{margin-bottom:1.5rem}.pt-24{padding-top:6rem}.pb-20{padding-bottom:5rem}.gap-2{gap:.5rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.bg-indigo-600{background-color:#4f46e5}.bg-green-500{background-color:#22c55e}.bg-green-600\\/20{background-color:rgb(22 163 74/.2)}.text-xs{font-size:.75rem;line-height:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-2xl{font-size:1.5rem;line-height:2rem}.leading-tight{line-height:1.25}.break-words{word-wrap:break-word}.-mt-16{margin-top:-4rem}.shadow-xl{box-shadow:0 20px 25px -5px rgb(0 0 0/.1),0 8px 10px -6px rgb(0 0 0/.1)}.border{border-width:1px}.border-green-400{border-color:#4ade80}.border-green-300\\/30{border-color:rgb(134 239 172/.3)}.backdrop-blur-sm{backdrop-filter:blur(4px)}.contain-strict{contain:strict}.pointer-events-none{pointer-events:none}.lcp-critical{content-visibility:visible}@media(min-width:640px){.sm\\:hidden{display:none!important}.sm\\:block{display:block!important}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}@media(min-width:768px){.md\\:hidden{display:none!important}.md\\:block{display:block!important}.md\\:pb-0{padding-bottom:0}.md\\:text-3xl{font-size:1.875rem;line-height:2.25rem}.md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}}@media(min-width:1024px){.lg\\:hidden{display:none!important}.lg\\:flex{display:flex!important}.lg\\:block{display:block!important}.lg\\:px-8{padding-left:2rem;padding-right:2rem}.lg\\:pt-28{padding-top:7rem}.lg\\:-mt-20{margin-top:-5rem}.lg\\:text-5xl{font-size:3rem;line-height:1}}`,
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
                  enableTrustBadges={true}
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
