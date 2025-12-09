interface ZoomMeetingData {
  topic: string
  type: number // 1 for instant, 2 for scheduled
  start_time: string // ISO 8601 format
  duration: number // in minutes
  timezone: string
  password?: string
  agenda?: string
  settings: {
    host_video: boolean
    participant_video: boolean
    cn_meeting: boolean
    in_meeting: boolean
    join_before_host: boolean
    mute_upon_entry: boolean
    watermark: boolean
    use_pmi: boolean
    approval_type: number
    audio: string
    auto_recording: string
    waiting_room: boolean
  }
}

interface DemoBookingData {
  studentName: string
  email: string
  phone: string
  preferredDate: Date
  preferredTime: string
  courseInterest: string
  studentClass: string
  previousKnowledge: string
  specificTopics?: string[]
}

interface ZoomMeetingResponse {
  id: string
  host_id: string
  topic: string
  type: number
  status: string
  start_time: string
  duration: number
  timezone: string
  agenda: string
  created_at: string
  start_url: string
  join_url: string
  password: string
  h323_password: string
  pstn_password: string
  encrypted_password: string
  uuid: string
}

// OAuth token cache
let cachedAccessToken: string | null = null
let tokenExpiresAt: number = 0

export class ZoomService {
  private apiUrl: string
  private userId: string
  private accountId: string
  private clientId: string
  private clientSecret: string

  constructor() {
    this.apiUrl = process.env.ZOOM_API_URL || 'https://api.zoom.us/v2'
    this.userId = process.env.ZOOM_USER_ID || 'me'
    this.accountId = process.env.ZOOM_ACCOUNT_ID || ''
    this.clientId = process.env.ZOOM_CLIENT_ID || ''
    this.clientSecret = process.env.ZOOM_CLIENT_SECRET || ''
  }

  /**
   * Get OAuth access token using Server-to-Server OAuth
   * Tokens are valid for 1 hour and cached
   */
  private async getAccessToken(): Promise<string | null> {
    // Return cached token if still valid (with 5 min buffer)
    if (cachedAccessToken && Date.now() < tokenExpiresAt - 300000) {
      return cachedAccessToken
    }

    // Check if OAuth credentials are configured
    if (!this.accountId || !this.clientId || !this.clientSecret) {
      console.warn('Zoom OAuth credentials not configured, using simulation mode')
      return null
    }

    try {
      const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')

      const response = await fetch('https://zoom.us/oauth/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'account_credentials',
          account_id: this.accountId,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Zoom OAuth token error:', response.status, errorText)
        return null
      }

      const data = await response.json()
      cachedAccessToken = data.access_token
      // Token expires in 1 hour (3600 seconds)
      tokenExpiresAt = Date.now() + data.expires_in * 1000

      console.log('Zoom OAuth token obtained successfully')
      return cachedAccessToken
    } catch (error) {
      console.error('Error getting Zoom OAuth token:', error)
      return null
    }
  }

  /**
   * Check if Zoom is properly configured
   */
  isConfigured(): boolean {
    return !!(this.accountId && this.clientId && this.clientSecret)
  }

  async createDemoMeeting(bookingData: DemoBookingData): Promise<ZoomMeetingResponse | null> {
    try {
      const meetingData: ZoomMeetingData = {
        topic: `NEET Biology Demo Class - ${bookingData.studentName}`,
        type: 2, // Scheduled meeting
        start_time: this.formatZoomDateTime(bookingData.preferredDate, bookingData.preferredTime),
        duration: 60, // 1 hour demo
        timezone: 'Asia/Kolkata',
        password: this.generateMeetingPassword(),
        agenda: `Demo class for ${bookingData.courseInterest} - Topics: Cell Biology & NEET Strategy`,
        settings: {
          host_video: true,
          participant_video: true,
          cn_meeting: false,
          in_meeting: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0, // Automatically approve
          audio: 'both',
          auto_recording: 'cloud',
          waiting_room: true,
        },
      }

      // Use real Zoom API if OAuth credentials are available, otherwise simulate
      const accessToken = await this.getAccessToken()
      const response = accessToken
        ? await this.createRealZoomMeeting(meetingData, accessToken)
        : await this.simulateZoomAPICall(meetingData)

      if (response) {
        // Store meeting data in database
        await this.saveMeetingData({
          ...bookingData,
          zoomMeetingId: response.id,
          joinUrl: response.join_url,
          startUrl: response.start_url,
          password: response.password,
          scheduledTime: new Date(response.start_time),
        })

        // Send confirmation notifications
        await this.sendDemoConfirmation(bookingData, response)
      }

      return response
    } catch (error) {
      console.error('Error creating Zoom meeting:', error)
      return null
    }
  }

  private async createRealZoomMeeting(
    meetingData: ZoomMeetingData,
    accessToken: string
  ): Promise<ZoomMeetingResponse | null> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${this.userId}/meetings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      })

      if (!response.ok) {
        console.error('Zoom API error:', response.statusText)
        return await this.simulateZoomAPICall(meetingData) // Fallback to simulation
      }

      const zoomResponse = await response.json()
      return zoomResponse as ZoomMeetingResponse
    } catch (error) {
      console.error('Error calling Zoom API:', error)
      return await this.simulateZoomAPICall(meetingData) // Fallback to simulation
    }
  }

  private async simulateZoomAPICall(meetingData: ZoomMeetingData): Promise<ZoomMeetingResponse> {
    // Simulate API call for MVP
    // Replace with actual Zoom API call in production
    return {
      id: `demo_${Date.now()}`,
      host_id: this.userId,
      topic: meetingData.topic,
      type: meetingData.type,
      status: 'waiting',
      start_time: meetingData.start_time,
      duration: meetingData.duration,
      timezone: meetingData.timezone,
      agenda: meetingData.agenda || '',
      created_at: new Date().toISOString(),
      start_url: `https://zoom.us/s/demo_start_${Date.now()}`,
      join_url: `https://zoom.us/j/demo_join_${Date.now()}`,
      password: meetingData.password || '',
      h323_password: '',
      pstn_password: '',
      encrypted_password: '',
      uuid: `uuid_${Date.now()}`,
    }
  }

  private formatZoomDateTime(date: Date, time: string): string {
    // Convert to Zoom API format (ISO 8601)
    const [hours, minutes] = time.split(':')
    const meetingDate = new Date(date)
    meetingDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    return meetingDate.toISOString()
  }

  private generateMeetingPassword(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  async getAvailableSlots(date: Date): Promise<string[]> {
    // Available demo slots (considering Indian timings)
    const availableSlots = [
      '10:00',
      '11:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
    ]

    // In production, check against existing bookings
    // For MVP, return all slots as available
    return availableSlots
  }

  async cancelDemoMeeting(meetingId: string): Promise<boolean> {
    try {
      // In production, call Zoom API to cancel meeting
      console.log('Cancelling Zoom meeting:', meetingId)

      // Update meeting status in database
      await this.updateMeetingStatus(meetingId, 'cancelled')

      return true
    } catch (error) {
      console.error('Error cancelling meeting:', error)
      return false
    }
  }

  async rescheduleDemoMeeting(
    meetingId: string,
    newDate: Date,
    newTime: string
  ): Promise<ZoomMeetingResponse | null> {
    try {
      // In production, call Zoom API to update meeting
      const updatedMeetingData = {
        start_time: this.formatZoomDateTime(newDate, newTime),
      }

      console.log('Rescheduling Zoom meeting:', meetingId, updatedMeetingData)

      // Simulate API response
      const response = await this.simulateZoomAPICall({
        topic: 'NEET Biology Demo Class - Rescheduled',
        type: 2,
        start_time: updatedMeetingData.start_time,
        duration: 60,
        timezone: 'Asia/Kolkata',
        settings: {
          host_video: true,
          participant_video: true,
          cn_meeting: false,
          in_meeting: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: 'both',
          auto_recording: 'cloud',
          waiting_room: true,
        },
      })

      return response
    } catch (error) {
      console.error('Error rescheduling meeting:', error)
      return null
    }
  }

  private async saveMeetingData(data: any) {
    // This would integrate with your database
    // For MVP, we can use a simple storage or log
    console.log('Saving meeting data:', {
      studentName: data.studentName,
      email: data.email,
      phone: data.phone,
      zoomMeetingId: data.zoomMeetingId,
      scheduledTime: data.scheduledTime,
      status: 'scheduled',
    })
  }

  private async updateMeetingStatus(meetingId: string, status: string) {
    // Update meeting status in database
    console.log(`Updating meeting ${meetingId} status to: ${status}`)
  }

  private async sendDemoConfirmation(
    bookingData: DemoBookingData,
    meetingData: ZoomMeetingResponse
  ) {
    // Import Interakt service for WhatsApp
    const { sendWhatsAppMessage, trackUser } = await import('../interakt')

    const meetingDate = new Date(meetingData.start_time)
    const dateStr = meetingDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const timeStr = meetingDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })

    // Track user in Interakt CRM
    await trackUser({
      phone: bookingData.phone,
      userId: `demo_${bookingData.email}`,
      traits: {
        name: bookingData.studentName,
        email: bookingData.email,
        class: bookingData.studentClass,
        courseInterest: bookingData.courseInterest,
        demoBooked: true,
        demoDate: dateStr,
        source: 'demo_booking',
      },
    })

    // Send WhatsApp confirmation using demo_class_confirmation template
    // Template has 3 params: name, datetime, link
    await sendWhatsAppMessage({
      phone: bookingData.phone,
      templateName: 'demo_class_confirmation',
      templateParams: {
        '1': bookingData.studentName,
        '2': `${dateStr} at ${timeStr}`,
        '3': meetingData.join_url,
      },
    })

    // Send email confirmation (to be implemented)
    await this.sendEmailConfirmation(bookingData, meetingData)
  }

  private async sendEmailConfirmation(
    bookingData: DemoBookingData,
    meetingData: ZoomMeetingResponse
  ) {
    // Email confirmation implementation
    console.log('Sending email confirmation to:', bookingData.email, {
      meetingId: meetingData.id,
      joinUrl: meetingData.join_url,
      password: meetingData.password,
      startTime: meetingData.start_time,
    })
  }

  // Automated reminder system
  async sendMeetingReminders() {
    // This would run as a cron job
    // Send reminders 24 hours, 1 hour, and 15 minutes before meeting
    const upcomingMeetings = await this.getUpcomingMeetings()

    for (const meeting of upcomingMeetings) {
      const timeUntilMeeting = new Date(meeting.scheduledTime).getTime() - Date.now()
      const hoursUntilMeeting = timeUntilMeeting / (1000 * 60 * 60)

      if (hoursUntilMeeting <= 24 && hoursUntilMeeting > 23) {
        await this.send24HourReminder(meeting)
      } else if (hoursUntilMeeting <= 1 && hoursUntilMeeting > 0.75) {
        await this.send1HourReminder(meeting)
      } else if (hoursUntilMeeting <= 0.25 && hoursUntilMeeting > 0) {
        await this.send15MinuteReminder(meeting)
      }
    }
  }

  private async getUpcomingMeetings() {
    // Get meetings from database
    // For MVP, return sample data
    return [
      {
        studentName: 'Sample Student',
        phone: '+918826444334',
        email: 'student@example.com',
        joinUrl: 'https://zoom.us/j/sample',
        password: 'DEMO123',
        scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      },
    ]
  }

  private async send24HourReminder(meeting: any) {
    const { sendWhatsAppMessage } = await import('../interakt')

    // Using class_reminder template: name, time_remaining, subject, topic, faculty_name, join_link
    await sendWhatsAppMessage({
      phone: meeting.phone,
      templateName: 'class_reminder',
      templateParams: {
        '1': meeting.studentName,
        '2': '24 hours',
        '3': 'Biology',
        '4': 'Cell Biology & NEET Strategy',
        '5': 'Dr. Priya Sharma',
        '6': meeting.joinUrl,
      },
    })
  }

  private async send1HourReminder(meeting: any) {
    const { sendWhatsAppMessage } = await import('../interakt')

    await sendWhatsAppMessage({
      phone: meeting.phone,
      templateName: 'class_reminder',
      templateParams: {
        '1': meeting.studentName,
        '2': '1 hour',
        '3': 'Biology',
        '4': 'Cell Biology & NEET Strategy',
        '5': 'Dr. Priya Sharma',
        '6': meeting.joinUrl,
      },
    })
  }

  private async send15MinuteReminder(meeting: any) {
    const { sendWhatsAppMessage } = await import('../interakt')

    await sendWhatsAppMessage({
      phone: meeting.phone,
      templateName: 'class_reminder',
      templateParams: {
        '1': meeting.studentName,
        '2': '15 minutes',
        '3': 'Biology',
        '4': 'NEET Demo Class',
        '5': 'Dr. Priya Sharma',
        '6': meeting.joinUrl,
      },
    })
  }
}

export const zoomService = new ZoomService()
