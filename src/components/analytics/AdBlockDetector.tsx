'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * AdBlockDetector - Detects ad blockers and shows a polite notification
 * requesting users to whitelist the site for Google Ads to function properly.
 *
 * Detection method: Attempts to load a small bait script that ad blockers
 * typically block, then checks if Google Ads tag loaded successfully.
 */
export default function AdBlockDetector() {
  const [adBlockDetected, setAdBlockDetected] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [checked, setChecked] = useState(false)

  const detectAdBlock = useCallback(async () => {
    // Skip if already dismissed this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('adblock-dismissed')) {
      setDismissed(true)
      setChecked(true)
      return
    }

    try {
      // Method 1: Try to fetch a Google Ads-like resource
      const testUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      const response = await fetch(testUrl, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      })
      // If we get here without error, ads are likely not blocked
      // But no-cors makes it hard to tell, so also check Method 2
    } catch {
      // Fetch blocked = ad blocker detected
      setAdBlockDetected(true)
      setChecked(true)
      return
    }

    // Method 2: Create a bait element that ad blockers target
    const baitElement = document.createElement('div')
    baitElement.className = 'adsbox ad-placement ad-banner textads sponsor'
    baitElement.setAttribute('data-ad-slot', 'test')
    baitElement.style.cssText = 'position:absolute;top:-999px;left:-999px;width:1px;height:1px;'
    baitElement.innerHTML = '&nbsp;'
    document.body.appendChild(baitElement)

    // Wait a moment for ad blockers to hide/remove the element
    await new Promise((resolve) => setTimeout(resolve, 200))

    const isBlocked =
      baitElement.offsetParent === null ||
      baitElement.offsetHeight === 0 ||
      baitElement.offsetWidth === 0 ||
      baitElement.clientHeight === 0 ||
      getComputedStyle(baitElement).display === 'none' ||
      getComputedStyle(baitElement).visibility === 'hidden'

    // Clean up
    if (baitElement.parentNode) {
      baitElement.parentNode.removeChild(baitElement)
    }

    if (isBlocked) {
      setAdBlockDetected(true)
    }

    // Method 3: Check if gtag / Google Ads actually loaded
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const gtagExists = typeof (window as Record<string, unknown>).gtag === 'function'
        const dataLayerExists = Array.isArray((window as Record<string, unknown>).dataLayer)
        if (!gtagExists && !dataLayerExists) {
          setAdBlockDetected(true)
        }
      }
      setChecked(true)
    }, 5000) // Check after 5 seconds (GA loads lazily)
  }, [])

  useEffect(() => {
    // Delay detection to not interfere with page load performance
    const timer = setTimeout(detectAdBlock, 8000) // Wait 8 seconds after mount
    return () => clearTimeout(timer)
  }, [detectAdBlock])

  const handleDismiss = () => {
    setDismissed(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('adblock-dismissed', 'true')
    }
  }

  // Don't render anything until check is complete, or if dismissed, or no ad block detected
  if (!checked || dismissed || !adBlockDetected) {
    return null
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        maxWidth: '480px',
        width: 'calc(100% - 32px)',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '20px 24px',
        boxShadow: '0 20px 60px rgba(37, 99, 235, 0.3), 0 8px 24px rgba(0, 0, 0, 0.2)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        animation: 'slideUpFadeIn 0.5s ease-out',
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideUpFadeIn {
              from { opacity: 0; transform: translateX(-50%) translateY(30px); }
              to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `,
        }}
      />

      {/* Close button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss ad blocker notification"
        style={{
          position: 'absolute',
          top: '8px',
          right: '12px',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '4px 8px',
          lineHeight: 1,
        }}
      >
        ✕
      </button>

      {/* Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}
        >
          🛡️
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '16px', lineHeight: 1.3 }}>
            Ad Blocker Detected
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
            Some features may not work properly
          </div>
        </div>
      </div>

      {/* Message */}
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.6,
          margin: '0 0 16px 0',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        We use Google Ads to keep our educational resources{' '}
        <strong>free and accessible</strong> for NEET aspirants. Please consider whitelisting{' '}
        <strong>cerebrumbiologyacademy.com</strong> in your ad blocker.
      </p>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            window.open(
              'https://support.google.com/chrome/answer/7632919?hl=en',
              '_blank',
              'noopener,noreferrer'
            )
          }}
          style={{
            flex: 1,
            minWidth: '140px',
            padding: '10px 16px',
            background: '#ffffff',
            color: '#1e3a5f',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          How to Whitelist
        </button>
        <button
          onClick={handleDismiss}
          style={{
            flex: 1,
            minWidth: '100px',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.15)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '10px',
            fontWeight: 500,
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Maybe Later
        </button>
      </div>
    </div>
  )
}
