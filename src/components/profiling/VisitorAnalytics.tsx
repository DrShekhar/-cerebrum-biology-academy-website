'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { UserProfileService } from '@/lib/profiling/userProfileService'

interface VisitorAnalyticsProps {
  children: React.ReactNode
}

function VisitorAnalyticsInner({ children }: VisitorAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page visit
    const startTime = Date.now()
    UserProfileService.trackPageVisit(pathname)

    // Track UTM parameters and traffic sources
    const utmSource = searchParams.get('utm_source')
    const utmMedium = searchParams.get('utm_medium')
    const utmCampaign = searchParams.get('utm_campaign')
    const ref = searchParams.get('ref')

    if (utmSource || utmMedium || utmCampaign || ref) {
      const trafficData = {
        source: utmSource || ref || 'direct',
        medium: utmMedium || 'organic',
        campaign: utmCampaign || 'none',
        page: pathname,
        timestamp: new Date().toISOString(),
      }

      // Store traffic source data
      const existingTraffic = JSON.parse(localStorage.getItem('cerebrum_traffic_sources') || '[]')
      existingTraffic.push(trafficData)
      localStorage.setItem('cerebrum_traffic_sources', JSON.stringify(existingTraffic.slice(-10))) // Keep last 10
    }

    // Infer user preferences from URL patterns
    inferPreferencesFromURL(pathname, searchParams)

    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      UserProfileService.trackPageVisit(pathname, timeSpent)
    }

    // Track time on page when navigating within app
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        UserProfileService.trackPageVisit(pathname, timeSpent)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      // Track final time on page
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      if (timeSpent > 5) {
        // Only track if user spent more than 5 seconds
        UserProfileService.trackPageVisit(pathname, timeSpent)
      }
    }
  }, [pathname, searchParams])

  useEffect(() => {
    // Track scroll behavior
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      maxScroll = Math.max(maxScroll, scrollPercent)
    }

    const trackScrollOnUnload = () => {
      if (maxScroll > 25) {
        // User scrolled more than 25%
        UserProfileService.trackCTAClick('scroll_engagement', `${maxScroll}%`)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', trackScrollOnUnload)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', trackScrollOnUnload)
    }
  }, [])

  useEffect(() => {
    // Track device and browser info for personalization
    const deviceInfo = {
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      isTablet: /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
    }

    // Store device info for personalization
    localStorage.setItem('cerebrum_device_info', JSON.stringify(deviceInfo))

    // Infer study preferences from device and time
    const currentHour = new Date().getHours()
    let preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night'

    if (currentHour >= 6 && currentHour < 12) {
      preferredStudyTime = 'morning'
    } else if (currentHour >= 12 && currentHour < 17) {
      preferredStudyTime = 'afternoon'
    } else if (currentHour >= 17 && currentHour < 22) {
      preferredStudyTime = 'evening'
    } else {
      preferredStudyTime = 'night'
    }

    // Update study time preference if not already set
    const profile = UserProfileService.getProfile()
    if (!profile.preferences.studyTime) {
      UserProfileService.updatePreference('studyTime', preferredStudyTime)
    }
  }, [])

  return <>{children}</>
}

export function VisitorAnalytics({ children }: VisitorAnalyticsProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <VisitorAnalyticsInner>{children}</VisitorAnalyticsInner>
    </Suspense>
  )
}

// Infer user preferences from URL patterns
function inferPreferencesFromURL(pathname: string, searchParams: URLSearchParams) {
  // Infer class from URL
  if (pathname.includes('class-11') || pathname.includes('/11')) {
    UserProfileService.updatePreference('class', '11')
  } else if (pathname.includes('class-12') || pathname.includes('/12')) {
    UserProfileService.updatePreference('class', '12')
  } else if (pathname.includes('dropper') || pathname.includes('gap-year')) {
    UserProfileService.updatePreference('class', 'dropper')
  } else if (
    pathname.includes('foundation') ||
    pathname.includes('class-9') ||
    pathname.includes('class-10')
  ) {
    UserProfileService.updatePreference('class', 'foundation')
  }

  // Infer interests from URL
  if (pathname.includes('neet')) {
    UserProfileService.addInterest('examTypes', 'NEET')
  }
  if (pathname.includes('aiims')) {
    UserProfileService.addInterest('examTypes', 'AIIMS')
  }
  if (pathname.includes('jipmer')) {
    UserProfileService.addInterest('examTypes', 'JIPMER')
  }

  // Infer location from search params
  const location = searchParams.get('location') || searchParams.get('city')
  if (location) {
    UserProfileService.updatePreference('location', location)
  }

  // Infer target score from search params
  const target = searchParams.get('target') || searchParams.get('score')
  if (target && !isNaN(Number(target))) {
    UserProfileService.updatePreference('targetScore', Number(target))
  }

  // Track topic interests from URL
  const biologyTopics = [
    'cell-biology',
    'genetics',
    'ecology',
    'evolution',
    'plant-physiology',
    'human-physiology',
    'biotechnology',
    'reproduction',
    'photosynthesis',
    'respiration',
    'circulation',
    'excretion',
    'coordination',
    'inheritance',
  ]

  biologyTopics.forEach((topic) => {
    if (pathname.includes(topic)) {
      UserProfileService.addInterest('topics', topic.replace('-', ' '))
    }
  })
}

// Hook for tracking user interactions
export function useVisitorTracking() {
  const trackCTAClick = (ctaId: string, context?: string) => {
    UserProfileService.trackCTAClick(ctaId, context)

    // Track conversion funnel stage
    const conversionStages = {
      hero_cta: 'awareness',
      course_enroll: 'consideration',
      demo_book: 'intent',
      payment_start: 'purchase',
      enrollment_complete: 'conversion',
    }

    const stage = conversionStages[ctaId as keyof typeof conversionStages]
    if (stage) {
      localStorage.setItem('cerebrum_funnel_stage', stage)
    }
  }

  const trackVideoEngagement = (videoId: string, watchTime: number, totalDuration: number) => {
    const engagementPercent = Math.round((watchTime / totalDuration) * 100)
    UserProfileService.trackVideoWatch(videoId, watchTime)

    // Update content preference based on video engagement
    if (engagementPercent > 75) {
      const profile = UserProfileService.getProfile()
      if (!profile.contentPersonalization.preferredContentType) {
        UserProfileService.updatePreference('preferredContentType' as any, 'video')
      }
    }
  }

  const trackResourceDownload = (resourceId: string, resourceType: string) => {
    UserProfileService.trackResourceDownload(resourceId, resourceType)

    // Update engagement status
    if (resourceType === 'notes' || resourceType === 'study-material') {
      UserProfileService.updateEngagement('downloadedResources' as any, true)
    }
  }

  const trackFormSubmission = (formType: string, data: any) => {
    // Track engagement based on form type
    switch (formType) {
      case 'email_signup':
        UserProfileService.updateEngagement('emailProvided', true)
        break
      case 'phone_submission':
        UserProfileService.updateEngagement('phoneProvided', true)
        break
      case 'demo_booking':
        UserProfileService.updateEngagement('demoBooked', true)
        break
      case 'course_enrollment':
        UserProfileService.updateEngagement('courseEnrolled', true)
        break
      case 'whatsapp_optin':
        UserProfileService.updateEngagement('whatsappOptIn', true)
        break
    }

    // Extract demographic data from form
    if (data.age) UserProfileService.updateDemographics({ age: data.age })
    if (data.gender) UserProfileService.updateDemographics({ gender: data.gender })
    if (data.school_type) UserProfileService.updateDemographics({ schoolType: data.school_type })

    UserProfileService.trackCTAClick(`form_submit_${formType}`, 'form_interaction')
  }

  const getPersonalizationData = () => {
    const profile = UserProfileService.getProfile()
    const recommendations = UserProfileService.getRecommendations()
    const segment = UserProfileService.getUserSegment()

    return {
      profile,
      recommendations,
      segment,
      deviceInfo: JSON.parse(localStorage.getItem('cerebrum_device_info') || '{}'),
      trafficSources: JSON.parse(localStorage.getItem('cerebrum_traffic_sources') || '[]'),
      funnelStage: localStorage.getItem('cerebrum_funnel_stage') || 'awareness',
    }
  }

  return {
    trackCTAClick,
    trackVideoEngagement,
    trackResourceDownload,
    trackFormSubmission,
    getPersonalizationData,
  }
}
