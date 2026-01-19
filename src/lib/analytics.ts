// Analytics utility for tracking admission funnel events
// Supports Google Analytics (gtag) and custom event logging
// Uses types from src/lib/analytics/googleAnalytics.ts

type FunnelEvent =
  | 'page_view'
  | 'quick_inquiry_start'
  | 'quick_inquiry_otp_sent'
  | 'quick_inquiry_complete'
  | 'form_step_1_complete'
  | 'form_step_2_complete'
  | 'form_step_3_complete'
  | 'form_step_4_complete'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'exit_intent_shown'
  | 'exit_intent_converted'
  | 'chat_widget_opened'
  | 'chat_faq_clicked'
  | 'whatsapp_click'
  | 'phone_click'
  | 'batch_selected'
  | 'cta_click'
  // ARIA Sales Agent events
  | 'aria_opened'
  | 'aria_closed'
  | 'aria_message_sent'
  | 'aria_ai_response'
  | 'aria_lead_capture_started'
  | 'aria_lead_captured'
  | 'aria_demo_booked'
  | 'aria_whatsapp_clicked'
  | 'aria_language_changed'
  | 'aria_proactive_shown'
  | 'aria_proactive_accepted'
  | 'aria_proactive_dismissed'
  | 'aria_error'

interface EventParams {
  category?: string
  label?: string
  value?: number
  [key: string]: string | number | boolean | undefined
}

export const trackEvent = (event: FunnelEvent, params?: EventParams) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, params)
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, {
      event_category: params?.category || 'admission_funnel',
      event_label: params?.label,
      value: params?.value,
      ...params,
    })
  }

  // Push to dataLayer for GTM
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: event,
      eventCategory: params?.category || 'admission_funnel',
      eventLabel: params?.label,
      eventValue: params?.value,
      ...params,
    })
  }
}

// Track page view
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  trackEvent('page_view', {
    category: 'navigation',
    label: pagePath,
    page_path: pagePath,
    page_title: pageTitle,
  })
}

// Track form step completion
export const trackFormStep = (step: number) => {
  const stepEvents: Record<number, FunnelEvent> = {
    1: 'form_step_1_complete',
    2: 'form_step_2_complete',
    3: 'form_step_3_complete',
    4: 'form_step_4_complete',
  }

  if (stepEvents[step]) {
    trackEvent(stepEvents[step], {
      category: 'form',
      label: `Step ${step} Complete`,
      value: step,
    })
  }
}

// Track batch selection
export const trackBatchSelection = (batchName: string, price: string) => {
  trackEvent('batch_selected', {
    category: 'selection',
    label: batchName,
    batch_name: batchName,
    batch_price: price,
  })
}

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    category: 'cta',
    label: ctaName,
    cta_name: ctaName,
    cta_location: location,
  })
}

// Track WhatsApp clicks
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    category: 'contact',
    label: source,
    source: source,
  })
}

// Track phone clicks
export const trackPhoneClick = (source: string) => {
  trackEvent('phone_click', {
    category: 'contact',
    label: source,
    source: source,
  })
}

// Track quick inquiry funnel
export const trackQuickInquiry = {
  start: () => trackEvent('quick_inquiry_start', { category: 'quick_inquiry' }),
  otpSent: () => trackEvent('quick_inquiry_otp_sent', { category: 'quick_inquiry' }),
  complete: () => trackEvent('quick_inquiry_complete', { category: 'quick_inquiry' }),
}

// Track exit intent
export const trackExitIntent = {
  shown: () => trackEvent('exit_intent_shown', { category: 'exit_intent' }),
  converted: () => trackEvent('exit_intent_converted', { category: 'exit_intent' }),
}

// Track chat widget
export const trackChatWidget = {
  opened: () => trackEvent('chat_widget_opened', { category: 'chat' }),
  faqClicked: (faqId: string) => trackEvent('chat_faq_clicked', { category: 'chat', label: faqId }),
}

// Track form submission
export const trackFormSubmission = {
  success: () => trackEvent('form_submit_success', { category: 'form' }),
  error: (errorMessage: string) =>
    trackEvent('form_submit_error', { category: 'form', label: errorMessage }),
}

// ARIA Sales Agent Analytics
export const trackAria = {
  opened: (source?: string) =>
    trackEvent('aria_opened', {
      category: 'aria',
      label: source || 'manual',
      source: source || 'manual',
    }),

  closed: () => trackEvent('aria_closed', { category: 'aria' }),

  messageSent: (language: string) =>
    trackEvent('aria_message_sent', {
      category: 'aria',
      label: language,
      language,
    }),

  aiResponse: (responseLength: number, language: string) =>
    trackEvent('aria_ai_response', {
      category: 'aria',
      value: responseLength,
      response_length: responseLength,
      language,
    }),

  leadCaptureStarted: (stage: string) =>
    trackEvent('aria_lead_capture_started', {
      category: 'aria',
      label: stage,
      stage,
    }),

  leadCaptured: (sessionId: string) =>
    trackEvent('aria_lead_captured', {
      category: 'aria',
      label: sessionId,
      session_id: sessionId,
    }),

  demoBooked: (method: string) =>
    trackEvent('aria_demo_booked', {
      category: 'aria',
      label: method,
      booking_method: method,
    }),

  whatsAppClicked: (hasContext: boolean) =>
    trackEvent('aria_whatsapp_clicked', {
      category: 'aria',
      label: hasContext ? 'with_context' : 'no_context',
      has_context: hasContext,
    }),

  languageChanged: (fromLang: string, toLang: string) =>
    trackEvent('aria_language_changed', {
      category: 'aria',
      label: `${fromLang}_to_${toLang}`,
      from_language: fromLang,
      to_language: toLang,
    }),

  proactiveShown: (triggerType: string) =>
    trackEvent('aria_proactive_shown', {
      category: 'aria',
      label: triggerType,
      trigger_type: triggerType,
    }),

  proactiveAccepted: (triggerType: string) =>
    trackEvent('aria_proactive_accepted', {
      category: 'aria',
      label: triggerType,
      trigger_type: triggerType,
    }),

  proactiveDismissed: (triggerType: string, doNotShowAgain: boolean) =>
    trackEvent('aria_proactive_dismissed', {
      category: 'aria',
      label: triggerType,
      trigger_type: triggerType,
      do_not_show_again: doNotShowAgain,
    }),

  error: (errorMessage: string) =>
    trackEvent('aria_error', {
      category: 'aria',
      label: errorMessage,
      error_message: errorMessage,
    }),
}
