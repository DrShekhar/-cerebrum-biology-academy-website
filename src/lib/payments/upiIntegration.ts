// UPI Integration for Indian Mobile Users
// Supports major UPI apps: GPay, PhonePe, Paytm, BHIM, Amazon Pay

interface UPIPaymentData {
  pa: string // UPI ID (Payment Address)
  pn: string // Payee Name
  am: number // Amount
  cu: string // Currency (INR)
  tn: string // Transaction Note
  tr?: string // Transaction Reference ID
  url?: string // URL for additional info
}

interface UPIApp {
  name: string
  packageName: string
  scheme: string
  icon: string
  isInstalled: boolean
  marketShare: number
}

export class UPIPaymentService {
  private readonly merchantUPI = 'cerebrumacademy@okicici' // Example UPI ID
  private readonly merchantName = 'Cerebrum Biology Academy'

  private readonly supportedUPIApps: UPIApp[] = [
    {
      name: 'Google Pay',
      packageName: 'com.google.android.apps.nbu.paisa.user',
      scheme: 'gpay',
      icon: '/icons/payments/gpay.svg',
      isInstalled: false,
      marketShare: 45,
    },
    {
      name: 'PhonePe',
      packageName: 'com.phonepe.app',
      scheme: 'phonepe',
      icon: '/icons/payments/phonepe.svg',
      isInstalled: false,
      marketShare: 35,
    },
    {
      name: 'Paytm',
      packageName: 'net.one97.paytm',
      scheme: 'paytm',
      icon: '/icons/payments/paytm.svg',
      isInstalled: false,
      marketShare: 15,
    },
    {
      name: 'BHIM',
      packageName: 'in.org.npci.upiapp',
      scheme: 'bhim',
      icon: '/icons/payments/bhim.svg',
      isInstalled: false,
      marketShare: 3,
    },
    {
      name: 'Amazon Pay',
      packageName: 'in.amazon.mShop.android.shopping',
      scheme: 'amazonpay',
      icon: '/icons/payments/amazon-pay.svg',
      isInstalled: false,
      marketShare: 2,
    },
  ]

  constructor() {
    this.detectInstalledUPIApps()
  }

  // Detect which UPI apps are installed on the device
  private async detectInstalledUPIApps() {
    if (!('navigator' in window) || !window.navigator.userAgent.includes('Android')) {
      return // UPI deep links work best on Android
    }

    // Check if apps are installed by attempting to open them
    for (const app of this.supportedUPIApps) {
      try {
        app.isInstalled = await this.checkAppInstallation(app.scheme)
      } catch (error) {
        app.isInstalled = false
      }
    }
  }

  private checkAppInstallation(scheme: string): Promise<boolean> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(false), 2000)

      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = `${scheme}://`

      iframe.onload = () => {
        clearTimeout(timeout)
        resolve(true)
        document.body.removeChild(iframe)
      }

      iframe.onerror = () => {
        clearTimeout(timeout)
        resolve(false)
        document.body.removeChild(iframe)
      }

      document.body.appendChild(iframe)
    })
  }

  // Generate UPI payment URL
  generateUPIURL(amount: number, transactionNote: string, transactionId?: string): string {
    const paymentData: UPIPaymentData = {
      pa: this.merchantUPI,
      pn: encodeURIComponent(this.merchantName),
      am: amount,
      cu: 'INR',
      tn: encodeURIComponent(transactionNote),
      tr: transactionId,
    }

    const params = Object.entries(paymentData)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return `upi://pay?${params}`
  }

  // Get available UPI apps sorted by preference
  getAvailableUPIApps(): UPIApp[] {
    return this.supportedUPIApps
      .filter((app) => app.isInstalled)
      .sort((a, b) => b.marketShare - a.marketShare)
  }

  // Get all UPI apps (for display even if not installed)
  getAllUPIApps(): UPIApp[] {
    return [...this.supportedUPIApps].sort((a, b) => b.marketShare - a.marketShare)
  }

  // Initiate UPI payment
  async initiateUPIPayment(
    amount: number,
    courseId: string,
    studentEmail: string,
    preferredApp?: string
  ): Promise<{
    success: boolean
    paymentUrl?: string
    qrCode?: string
    deepLink?: string
    transactionId: string
  }> {
    try {
      // Generate transaction ID
      const transactionId = `CBA${Date.now()}${Math.random().toString(36).substr(2, 9)}`

      // Create transaction note
      const transactionNote = `Cerebrum Biology Academy - Course ${courseId}`

      // Generate UPI URL
      const upiUrl = this.generateUPIURL(amount, transactionNote, transactionId)

      // Log transaction attempt
      await this.logPaymentAttempt(transactionId, amount, courseId, studentEmail)

      // Generate QR code for desktop users
      const qrCode = await this.generateQRCode(upiUrl)

      // Determine best deep link
      let deepLink = upiUrl
      if (preferredApp) {
        const app = this.supportedUPIApps.find((a) => a.scheme === preferredApp)
        if (app && app.isInstalled) {
          deepLink = this.generateAppSpecificURL(app, amount, transactionNote, transactionId)
        }
      }

      return {
        success: true,
        paymentUrl: upiUrl,
        qrCode,
        deepLink,
        transactionId,
      }
    } catch (error) {
      console.error('UPI payment initiation failed:', error)
      return {
        success: false,
        transactionId: '',
      }
    }
  }

  // Generate app-specific UPI URLs for better success rates
  private generateAppSpecificURL(
    app: UPIApp,
    amount: number,
    transactionNote: string,
    transactionId: string
  ): string {
    const baseUrl = this.generateUPIURL(amount, transactionNote, transactionId)

    switch (app.scheme) {
      case 'gpay':
        return `${app.scheme}://upi/pay?${baseUrl.split('?')[1]}`
      case 'phonepe':
        return `${app.scheme}://pay?${baseUrl.split('?')[1]}`
      case 'paytm':
        return `${app.scheme}://upi/pay?${baseUrl.split('?')[1]}`
      default:
        return baseUrl
    }
  }

  // Generate QR code for UPI payment
  private async generateQRCode(upiUrl: string): Promise<string> {
    try {
      // In production, you would use a QR code generation service
      // For now, return a placeholder
      const response = await fetch('/api/payments/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: upiUrl }),
      })

      if (response.ok) {
        const { qrCodeUrl } = await response.json()
        return qrCodeUrl
      }
    } catch (error) {
      console.error('QR code generation failed:', error)
    }

    // Fallback: return UPI URL as text
    return upiUrl
  }

  // Log payment attempt for analytics
  private async logPaymentAttempt(
    transactionId: string,
    amount: number,
    courseId: string,
    studentEmail: string
  ) {
    try {
      await fetch('/api/payments/log-attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId,
          amount,
          courseId,
          studentEmail,
          paymentMethod: 'UPI',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      })
    } catch (error) {
      console.error('Failed to log payment attempt:', error)
    }
  }

  // Check payment status
  async checkPaymentStatus(transactionId: string): Promise<{
    status: 'pending' | 'success' | 'failed' | 'expired'
    amount?: number
    timestamp?: string
  }> {
    try {
      const response = await fetch(`/api/payments/status/${transactionId}`)
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.error('Payment status check failed:', error)
    }

    return { status: 'pending' }
  }

  // Get payment instructions in multiple languages
  getPaymentInstructions(language: 'en' | 'hi' | 'ta' | 'bn' = 'en'): {
    title: string
    steps: string[]
    troubleshooting: string[]
  } {
    const instructions = {
      en: {
        title: 'Complete Your Payment with UPI',
        steps: [
          'Tap on your preferred UPI app below',
          'Review the payment details',
          'Enter your UPI PIN to confirm',
          'You will receive a confirmation message',
          'Return to this page to continue',
        ],
        troubleshooting: [
          'Ensure you have sufficient balance',
          'Check your internet connection',
          'Try a different UPI app if one fails',
          'Contact your bank for UPI-related issues',
        ],
      },
      hi: {
        title: 'UPI से अपना भुगतान पूरा करें',
        steps: [
          'नीचे दिए गए अपने पसंदीदा UPI ऐप पर टैप करें',
          'भुगतान विवरण की समीक्षा करें',
          'पुष्टि के लिए अपना UPI PIN दर्ज करें',
          'आपको एक पुष्टि संदेश मिलेगा',
          'जारी रखने के लिए इस पेज पर वापस आएं',
        ],
        troubleshooting: [
          'सुनिश्चित करें कि आपके पास पर्याप्त बैलेंस है',
          'अपना इंटरनेट कनेक्शन जांचें',
          'यदि एक UPI ऐप फेल हो जाता है तो दूसरे को आजमाएं',
          'UPI संबंधी समस्याओं के लिए अपने बैंक से संपर्क करें',
        ],
      },
      ta: {
        title: 'UPI மூலம் உங்கள் பணம் செலுத்துங்கள்',
        steps: [
          'கீழே உள்ள உங்கள் விருப்பமான UPI ஆப்பில் தட்டவும்',
          'பணம் செலுத்தும் விவரங்களை மதிப்பாய்வு செய்யவும்',
          'உறுதிப்படுத்த உங்கள் UPI PIN ஐ உள்ளிடவும்',
          'உங்களுக்கு ஒரு உறுதிப்படுத்தல் செய்தி கிடைக்கும்',
          'தொடர இந்த பக்கத்திற்கு திரும்பவும்',
        ],
        troubleshooting: [
          'உங்களிடம் போதுமான நிலுவை இருப்பதை உறுதிப்படுத்தவும்',
          'உங்கள் இணைய இணைப்பை சரிபார்க்கவும்',
          'ஒரு UPI ஆப் தோல்வியுற்றால் வேறொன்றை முயற்சிக்கவும்',
          'UPI தொடர்பான பிரச்சினைகளுக்கு உங்கள் வங்கியை தொடர்பு கொள்ளவும்',
        ],
      },
      bn: {
        title: 'UPI দিয়ে আপনার পেমেন্ট সম্পূর্ণ করুন',
        steps: [
          'নিচের আপনার পছন্দের UPI অ্যাপে ট্যাপ করুন',
          'পেমেন্টের বিবরণ পর্যালোচনা করুন',
          'নিশ্চিত করতে আপনার UPI PIN দিন',
          'আপনি একটি নিশ্চিতকরণ বার্তা পাবেন',
          'চালিয়ে যেতে এই পৃষ্ঠায় ফিরে আসুন',
        ],
        troubleshooting: [
          'নিশ্চিত করুন যে আপনার যথেষ্ট ব্যালেন্স আছে',
          'আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন',
          'একটি UPI অ্যাপ ব্যর্থ হলে অন্যটি চেষ্টা করুন',
          'UPI সম্পর্কিত সমস্যার জন্য আপনার ব্যাংকের সাথে যোগাযোগ করুন',
        ],
      },
    }

    return instructions[language]
  }

  // Handle deep link activation
  openUPIApp(appScheme: string, paymentUrl: string): boolean {
    try {
      if ('Android' in window && (window as any).Android) {
        // If running in Android WebView
        ;(window as any).Android.openUPIApp(appScheme, paymentUrl)
        return true
      } else {
        // Standard web approach
        window.location.href = paymentUrl
        return true
      }
    } catch (error) {
      console.error('Failed to open UPI app:', error)
      return false
    }
  }

  // Analytics for UPI usage
  trackUPIUsage(appScheme: string, amount: number) {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'upi_payment_initiated', {
        payment_method: 'UPI',
        upi_app: appScheme,
        value: amount,
        currency: 'INR',
      })
    }
  }
}

// Singleton instance
export const upiPaymentService = new UPIPaymentService()
