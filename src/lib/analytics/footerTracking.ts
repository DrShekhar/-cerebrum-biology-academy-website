export function trackFooterLinkClick(linkText: string, linkUrl: string, sectionName: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'footer_link_click', {
      link_text: linkText,
      link_url: linkUrl,
      section_name: sectionName,
      event_category: 'Footer',
    })
  }
}

export function trackFooterSectionToggle(sectionName: string, isOpen: boolean) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'footer_section_toggle', {
      section_name: sectionName,
      action: isOpen ? 'open' : 'close',
      event_category: 'Footer',
    })
  }
}

export function trackFooterSubscribe(method: 'email' | 'whatsapp' | 'both') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'footer_subscribe', {
      method,
      event_category: 'Footer',
    })
  }
}
