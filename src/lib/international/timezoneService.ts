'use client'

export interface TimezoneInfo {
  id: string
  name: string
  offset: string
  utcOffset: number
  region: string
  country: string
  isBusinessHour: boolean
  nextBusinessHour?: string
}

export interface ClassSchedule {
  id: string
  name: string
  timezone: string
  startTime: string
  endTime: string
  days: string[]
  capacity: number
  enrolled: number
  instructor: string
  language: 'english' | 'hindi' | 'mixed'
  level: 'foundation' | 'intermediate' | 'advanced'
  isRecording: boolean
}

export interface BusinessHours {
  timezone: string
  days: {
    monday: { open: string; close: string; isOpen: boolean }
    tuesday: { open: string; close: string; isOpen: boolean }
    wednesday: { open: string; close: string; isOpen: boolean }
    thursday: { open: string; close: string; isOpen: boolean }
    friday: { open: string; close: string; isOpen: boolean }
    saturday: { open: string; close: string; isOpen: boolean }
    sunday: { open: string; close: string; isOpen: boolean }
  }
}

class TimezoneService {
  // Major timezone groups for international students
  static readonly TIMEZONE_GROUPS = {
    // Asia Pacific
    ASIA_PACIFIC: [
      'Asia/Kolkata', // India (IST)
      'Asia/Singapore', // Singapore (SGT)
      'Asia/Dubai', // UAE (GST)
      'Asia/Hong_Kong', // Hong Kong (HKT)
      'Asia/Tokyo', // Japan (JST)
    ],
    // Australia & New Zealand
    OCEANIA: [
      'Australia/Sydney', // AEDT/AEST
      'Australia/Melbourne', // AEDT/AEST
      'Australia/Perth', // AWST
      'Pacific/Auckland', // NZDT/NZST
    ],
    // Europe
    EUROPE: [
      'Europe/London', // GMT/BST
      'Europe/Berlin', // CET/CEST
      'Europe/Paris', // CET/CEST
      'Europe/Rome', // CET/CEST
      'Europe/Amsterdam', // CET/CEST
    ],
    // North America
    NORTH_AMERICA: [
      'America/New_York', // EST/EDT
      'America/Chicago', // CST/CDT
      'America/Denver', // MST/MDT
      'America/Los_Angeles', // PST/PDT
      'America/Toronto', // EST/EDT
      'America/Vancouver', // PST/PDT
    ],
  }

  // Country to primary timezone mapping
  static readonly COUNTRY_TIMEZONES: Record<string, string> = {
    // Asia
    IN: 'Asia/Kolkata',
    SG: 'Asia/Singapore',
    AE: 'Asia/Dubai',
    HK: 'Asia/Hong_Kong',
    JP: 'Asia/Tokyo',

    // Australia & New Zealand
    AU: 'Australia/Sydney',
    NZ: 'Pacific/Auckland',

    // Europe
    GB: 'Europe/London',
    UK: 'Europe/London',
    DE: 'Europe/Berlin',
    FR: 'Europe/Paris',
    IT: 'Europe/Rome',
    NL: 'Europe/Amsterdam',
    ES: 'Europe/Madrid',

    // North America
    US: 'America/New_York', // Default to Eastern
    CA: 'America/Toronto', // Default to Eastern
  }

  static getTimezoneInfo(timezone: string): TimezoneInfo {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: timezone,
      timeZoneName: 'long',
    })

    const parts = formatter.formatToParts(now)
    const timezoneName = parts.find((part) => part.type === 'timeZoneName')?.value || timezone

    // Get UTC offset
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
    const utcOffset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60)

    // Format offset string
    const offsetHours = Math.floor(Math.abs(utcOffset))
    const offsetMinutes = Math.abs(utcOffset % 1) * 60
    const offsetSign = utcOffset >= 0 ? '+' : '-'
    const offset = `GMT${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`

    return {
      id: timezone,
      name: timezoneName,
      offset,
      utcOffset,
      region: this.getRegionByTimezone(timezone),
      country: this.getCountryByTimezone(timezone),
      isBusinessHour: this.isBusinessHours(timezone),
      nextBusinessHour: this.getNextBusinessHour(timezone),
    }
  }

  private static getRegionByTimezone(timezone: string): string {
    if (timezone.startsWith('Asia/')) return 'Asia'
    if (timezone.startsWith('Australia/') || timezone.startsWith('Pacific/')) return 'Oceania'
    if (timezone.startsWith('Europe/')) return 'Europe'
    if (timezone.startsWith('America/')) return 'Americas'
    return 'Other'
  }

  private static getCountryByTimezone(timezone: string): string {
    const countryMap: Record<string, string> = {
      'Asia/Kolkata': 'India',
      'Asia/Singapore': 'Singapore',
      'Asia/Dubai': 'UAE',
      'Australia/Sydney': 'Australia',
      'Australia/Melbourne': 'Australia',
      'Pacific/Auckland': 'New Zealand',
      'Europe/London': 'United Kingdom',
      'Europe/Berlin': 'Germany',
      'Europe/Paris': 'France',
      'America/New_York': 'United States',
      'America/Los_Angeles': 'United States',
      'America/Toronto': 'Canada',
    }

    return countryMap[timezone] || 'Unknown'
  }

  static getTimezoneByCountry(countryCode: string): string {
    return this.COUNTRY_TIMEZONES[countryCode?.toUpperCase()] || 'Asia/Kolkata'
  }

  static isBusinessHours(timezone: string): boolean {
    const now = new Date()
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
    const hour = localTime.getHours()
    const day = localTime.getDay()

    // Business hours: Monday-Saturday, 9 AM - 8 PM
    return day >= 1 && day <= 6 && hour >= 9 && hour < 20
  }

  static getNextBusinessHour(timezone: string): string {
    if (this.isBusinessHours(timezone)) {
      return 'Available now'
    }

    const now = new Date()
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
    const hour = localTime.getHours()
    const day = localTime.getDay()

    if (day === 0) {
      // Sunday
      return 'Monday 9:00 AM'
    } else if (hour < 9) {
      return 'Today 9:00 AM'
    } else if (hour >= 20) {
      return day === 6 ? 'Monday 9:00 AM' : 'Tomorrow 9:00 AM'
    }

    return 'Next business day 9:00 AM'
  }

  static getLocalTime(timezone: string, format24Hour: boolean = false): string {
    const now = new Date()

    return now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: !format24Hour,
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  static getLocalDate(timezone: string): string {
    const now = new Date()

    return now.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get class schedules suitable for a timezone
  static getRecommendedSchedules(timezone: string): ClassSchedule[] {
    const schedules: ClassSchedule[] = [
      // IST Classes (India)
      {
        id: 'ist-morning',
        name: 'IST Morning Batch',
        timezone: 'Asia/Kolkata',
        startTime: '09:00',
        endTime: '11:00',
        days: ['Monday', 'Wednesday', 'Friday'],
        capacity: 50,
        enrolled: 38,
        instructor: 'Dr. Priya Sharma',
        language: 'hindi',
        level: 'intermediate',
        isRecording: true,
      },
      {
        id: 'ist-evening',
        name: 'IST Evening Batch',
        timezone: 'Asia/Kolkata',
        startTime: '18:00',
        endTime: '20:00',
        days: ['Tuesday', 'Thursday', 'Saturday'],
        capacity: 40,
        enrolled: 32,
        instructor: 'Dr. Rajesh Kumar',
        language: 'mixed',
        level: 'advanced',
        isRecording: true,
      },
      // GMT Classes (UK/Europe)
      {
        id: 'gmt-evening',
        name: 'GMT Evening Batch',
        timezone: 'Europe/London',
        startTime: '19:00',
        endTime: '21:00',
        days: ['Monday', 'Wednesday', 'Friday'],
        capacity: 25,
        enrolled: 18,
        instructor: 'Dr. Sarah Wilson',
        language: 'english',
        level: 'intermediate',
        isRecording: true,
      },
      // EST Classes (US/Canada East)
      {
        id: 'est-weekend',
        name: 'EST Weekend Intensive',
        timezone: 'America/New_York',
        startTime: '10:00',
        endTime: '13:00',
        days: ['Saturday', 'Sunday'],
        capacity: 30,
        enrolled: 22,
        instructor: 'Dr. Michael Chen',
        language: 'english',
        level: 'advanced',
        isRecording: true,
      },
      // AEDT Classes (Australia)
      {
        id: 'aedt-morning',
        name: 'AEDT Morning Batch',
        timezone: 'Australia/Sydney',
        startTime: '08:00',
        endTime: '10:00',
        days: ['Tuesday', 'Thursday', 'Saturday'],
        capacity: 20,
        enrolled: 15,
        instructor: 'Dr. Emma Taylor',
        language: 'english',
        level: 'foundation',
        isRecording: true,
      },
      // SGT Classes (Singapore/SEA)
      {
        id: 'sgt-evening',
        name: 'SGT Evening Batch',
        timezone: 'Asia/Singapore',
        startTime: '20:00',
        endTime: '22:00',
        days: ['Monday', 'Wednesday', 'Friday'],
        capacity: 25,
        enrolled: 19,
        instructor: 'Dr. Lee Wei Ming',
        language: 'english',
        level: 'intermediate',
        isRecording: true,
      },
    ]

    // Filter schedules that work well for the user's timezone
    return schedules.filter((schedule) => {
      const userTzInfo = this.getTimezoneInfo(timezone)
      const scheduleTzInfo = this.getTimezoneInfo(schedule.timezone)

      // Calculate time difference
      const timeDiff = Math.abs(userTzInfo.utcOffset - scheduleTzInfo.utcOffset)

      // Return schedules within 6 hours difference or same region
      return timeDiff <= 6 || userTzInfo.region === scheduleTzInfo.region
    })
  }

  static convertScheduleToTimezone(schedule: ClassSchedule, targetTimezone: string): ClassSchedule {
    // Create a date object for the schedule time
    const scheduleDate = new Date(`2024-01-01T${schedule.startTime}:00`)
    const endDate = new Date(`2024-01-01T${schedule.endTime}:00`)

    // Convert times to target timezone
    const convertedStart = new Date(
      scheduleDate.toLocaleString('en-US', { timeZone: targetTimezone })
    )
    const convertedEnd = new Date(endDate.toLocaleString('en-US', { timeZone: targetTimezone }))

    return {
      ...schedule,
      startTime: convertedStart.toTimeString().slice(0, 5),
      endTime: convertedEnd.toTimeString().slice(0, 5),
      timezone: targetTimezone,
    }
  }

  static getBusinessHours(timezone: string): BusinessHours {
    return {
      timezone,
      days: {
        monday: { open: '09:00', close: '20:00', isOpen: true },
        tuesday: { open: '09:00', close: '20:00', isOpen: true },
        wednesday: { open: '09:00', close: '20:00', isOpen: true },
        thursday: { open: '09:00', close: '20:00', isOpen: true },
        friday: { open: '09:00', close: '20:00', isOpen: true },
        saturday: { open: '09:00', close: '20:00', isOpen: true },
        sunday: { open: '00:00', close: '00:00', isOpen: false },
      },
    }
  }

  static getTimezoneSelectOptions(): { value: string; label: string; region: string }[] {
    const allTimezones = [
      ...this.TIMEZONE_GROUPS.ASIA_PACIFIC,
      ...this.TIMEZONE_GROUPS.OCEANIA,
      ...this.TIMEZONE_GROUPS.EUROPE,
      ...this.TIMEZONE_GROUPS.NORTH_AMERICA,
    ]

    return allTimezones.map((tz) => ({
      value: tz,
      label: this.getTimezoneDisplayName(tz),
      region: this.getRegionByTimezone(tz),
    }))
  }

  private static getTimezoneDisplayName(timezone: string): string {
    const info = this.getTimezoneInfo(timezone)
    const city = timezone.split('/').pop()?.replace('_', ' ') || timezone
    return `${city} (${info.offset})`
  }

  static getUserTimezone(): string {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch {
      return 'Asia/Kolkata' // Fallback to IST
    }
  }

  static isOptimalStudyTime(timezone: string): {
    isOptimal: boolean
    reason: string
    nextOptimalTime?: string
  } {
    const now = new Date()
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
    const hour = localTime.getHours()

    // Optimal study hours: 6-10 AM and 6-10 PM
    const isMorningOptimal = hour >= 6 && hour < 10
    const isEveningOptimal = hour >= 18 && hour < 22

    if (isMorningOptimal) {
      return {
        isOptimal: true,
        reason: 'Perfect morning study time - your brain is fresh and focused!',
      }
    }

    if (isEveningOptimal) {
      return {
        isOptimal: true,
        reason: 'Great evening study time - ideal for revision and practice!',
      }
    }

    // Suggest next optimal time
    let nextOptimalTime = ''
    if (hour < 6) {
      nextOptimalTime = 'Today 6:00 AM'
    } else if (hour >= 10 && hour < 18) {
      nextOptimalTime = 'Today 6:00 PM'
    } else {
      nextOptimalTime = 'Tomorrow 6:00 AM'
    }

    return {
      isOptimal: false,
      reason: 'Consider studying during peak focus hours (6-10 AM or 6-10 PM)',
      nextOptimalTime,
    }
  }
}

export { TimezoneService }
