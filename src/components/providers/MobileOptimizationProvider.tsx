'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { indianMobileOptimizer } from '@/lib/mobile/indianMobileOptimizations'

interface MobileOptimizationContextType {
  isSlowNetwork: boolean
  isLowEndDevice: boolean
  networkType: string
  deviceRAM: number
  shouldReduceAnimations: boolean
  shouldOptimizeImages: boolean
  language: 'en' | 'hi' | 'ta' | 'bn'
  setLanguage: (lang: 'en' | 'hi' | 'ta' | 'bn') => void
  dataMode: 'normal' | 'lite' | 'offline'
  setDataMode: (mode: 'normal' | 'lite' | 'offline') => void
}

const MobileOptimizationContext = createContext<MobileOptimizationContextType | undefined>(
  undefined
)

export function useMobileOptimization() {
  const context = useContext(MobileOptimizationContext)
  if (!context) {
    throw new Error('useMobileOptimization must be used within MobileOptimizationProvider')
  }
  return context
}

interface MobileOptimizationProviderProps {
  children: React.ReactNode
}

export function MobileOptimizationProvider({ children }: MobileOptimizationProviderProps) {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [networkType, setNetworkType] = useState('4g')
  const [deviceRAM, setDeviceRAM] = useState(4)
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta' | 'bn'>('en')
  const [dataMode, setDataMode] = useState<'normal' | 'lite' | 'offline'>('normal')

  // Initialize mobile optimizations
  useEffect(() => {
    const updateNetworkInfo = () => {
      const networkInfo = indianMobileOptimizer.getNetworkInfo()
      const deviceInfo = indianMobileOptimizer.getDeviceInfo()

      if (networkInfo) {
        setNetworkType(networkInfo.effectiveType)
        setIsSlowNetwork(
          networkInfo.effectiveType === '2g' ||
            networkInfo.effectiveType === 'slow-2g' ||
            networkInfo.effectiveType === '3g' ||
            networkInfo.saveData
        )
      }

      if (deviceInfo) {
        setDeviceRAM(deviceInfo.ram)
        setIsLowEndDevice(deviceInfo.ram <= 2 || deviceInfo.cores <= 2)
      }

      // Auto-set data mode based on network conditions
      if (networkInfo?.saveData || networkInfo?.effectiveType === '2g') {
        setDataMode('lite')
      } else if (networkInfo?.effectiveType === '3g' && deviceInfo?.ram <= 2) {
        setDataMode('lite')
      }
    }

    updateNetworkInfo()

    // Listen for network changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      connection.addEventListener('change', updateNetworkInfo)

      return () => {
        connection.removeEventListener('change', updateNetworkInfo)
      }
    }
  }, [])

  // Detect language from browser/device settings
  useEffect(() => {
    const detectLanguage = () => {
      const savedLang = localStorage.getItem('preferred-language') as 'en' | 'hi' | 'ta' | 'bn'
      if (savedLang) {
        setLanguage(savedLang)
        return
      }

      const browserLang = navigator.language.toLowerCase()
      if (browserLang.includes('hi')) setLanguage('hi')
      else if (browserLang.includes('ta')) setLanguage('ta')
      else if (browserLang.includes('bn')) setLanguage('bn')
      else setLanguage('en')
    }

    detectLanguage()
  }, [])

  // Save language preference
  const handleLanguageChange = (newLanguage: 'en' | 'hi' | 'ta' | 'bn') => {
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)

    // Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'language_change', {
        new_language: newLanguage,
        device_type: 'mobile',
        network_type: networkType,
      })
    }
  }

  // Save data mode preference
  const handleDataModeChange = (mode: 'normal' | 'lite' | 'offline') => {
    setDataMode(mode)
    localStorage.setItem('data-mode', mode)

    // Apply CSS optimizations based on data mode
    applyDataModeOptimizations(mode)

    // Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'data_mode_change', {
        data_mode: mode,
        network_type: networkType,
        device_ram: deviceRAM,
      })
    }
  }

  const applyDataModeOptimizations = (mode: 'normal' | 'lite' | 'offline') => {
    const root = document.documentElement

    switch (mode) {
      case 'lite':
        root.style.setProperty('--animation-duration', '0s')
        root.style.setProperty('--image-quality', '50')
        root.style.setProperty('--lazy-threshold', '400px')
        break
      case 'offline':
        root.style.setProperty('--animation-duration', '0s')
        root.style.setProperty('--image-quality', '30')
        root.style.setProperty('--lazy-threshold', '800px')
        break
      default:
        root.style.setProperty('--animation-duration', '0.3s')
        root.style.setProperty('--image-quality', '80')
        root.style.setProperty('--lazy-threshold', '200px')
    }
  }

  // Performance monitoring
  useEffect(() => {
    const measurePerformance = () => {
      const metrics = indianMobileOptimizer.measurePerformance()

      // Send performance data for Indian mobile optimization insights
      if (metrics && process.env.NODE_ENV === 'production') {
        fetch('/api/analytics/mobile-performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...metrics,
            language,
            dataMode,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {
          // Fail silently for analytics
        })
      }
    }

    // Measure performance after page load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', measurePerformance)
      return () => window.removeEventListener('load', measurePerformance)
    }
  }, [language, dataMode])

  // Apply global mobile optimizations
  useEffect(() => {
    if (typeof window === 'undefined') return

    const applyGlobalOptimizations = () => {
      // Disable smooth scrolling on low-end devices
      if (isLowEndDevice) {
        document.documentElement.style.scrollBehavior = 'auto'
      }

      // Reduce animations for slow networks/devices
      if (isSlowNetwork || isLowEndDevice) {
        document.documentElement.style.setProperty('--animation-duration', '0s')
        document.documentElement.style.setProperty('--transition-duration', '0s')
      }

      // Add mobile-specific classes
      document.documentElement.classList.toggle('slow-network', isSlowNetwork)
      document.documentElement.classList.toggle('low-end-device', isLowEndDevice)
      document.documentElement.classList.toggle('lite-mode', dataMode === 'lite')
      document.documentElement.classList.toggle('offline-mode', dataMode === 'offline')

      // Set CSS custom properties for optimization
      document.documentElement.style.setProperty('--network-quality', isSlowNetwork ? '0' : '1')
      document.documentElement.style.setProperty('--device-quality', isLowEndDevice ? '0' : '1')
    }

    applyGlobalOptimizations()
  }, [isSlowNetwork, isLowEndDevice, dataMode])

  const value: MobileOptimizationContextType = {
    isSlowNetwork,
    isLowEndDevice,
    networkType,
    deviceRAM,
    shouldReduceAnimations: isSlowNetwork || isLowEndDevice || dataMode !== 'normal',
    shouldOptimizeImages: isSlowNetwork || dataMode === 'lite',
    language,
    setLanguage: handleLanguageChange,
    dataMode,
    setDataMode: handleDataModeChange,
  }

  return (
    <MobileOptimizationContext.Provider value={value}>
      {children}

      {/* Data Mode Indicator for Development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black text-white text-xs px-2 py-1 rounded z-50">
          <div>Network: {networkType}</div>
          <div>RAM: {deviceRAM}GB</div>
          <div>Mode: {dataMode}</div>
          <div>Lang: {language}</div>
        </div>
      )}
    </MobileOptimizationContext.Provider>
  )
}

// Data mode switcher component
export function DataModeSwitcher() {
  const { dataMode, setDataMode, isSlowNetwork } = useMobileOptimization()

  const modes = [
    {
      value: 'normal' as const,
      label: 'Normal',
      description: 'Full experience',
      icon: '🌟',
    },
    {
      value: 'lite' as const,
      label: 'Lite',
      description: 'Data saver mode',
      icon: '📱',
    },
    {
      value: 'offline' as const,
      label: 'Offline',
      description: 'Minimum data',
      icon: '✈️',
    },
  ]

  // Auto-suggest lite mode for slow networks
  useEffect(() => {
    if (isSlowNetwork && dataMode === 'normal') {
      // Show notification to switch to lite mode
      const shouldSwitch = confirm(
        'Slow network detected. Switch to Lite mode for better performance?'
      )
      if (shouldSwitch) {
        setDataMode('lite')
      }
    }
  }, [isSlowNetwork, dataMode, setDataMode])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 mb-3">Data Mode</h3>
      <div className="space-y-2">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => setDataMode(mode.value)}
            className={`w-full flex items-center p-3 rounded-lg border transition-colors ${
              dataMode === mode.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg mr-3">{mode.icon}</span>
            <div className="text-left">
              <div
                className={`font-medium ${dataMode === mode.value ? 'text-blue-900' : 'text-gray-900'}`}
              >
                {mode.label}
              </div>
              <div className="text-sm text-gray-600">{mode.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Network status indicator
export function NetworkStatusIndicator() {
  const { networkType, isSlowNetwork } = useMobileOptimization()

  if (!isSlowNetwork) return null

  return (
    <div className="flex items-center space-x-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
      <span>{networkType.toUpperCase()} Network</span>
    </div>
  )
}
