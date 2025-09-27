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

export class ZoomService {
  private apiUrl: string
  private jwtToken: string
  private userId: string

  constructor() {
    this.apiUrl = process.env.ZOOM_API_URL || 'https://api.zoom.us/v2'
    this.jwtToken = process.env.ZOOM_JWT_TOKEN || ''
    this.userId = process.env.ZOOM_USER_ID || 'me'
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

      // Use real Zoom API if credentials are available, otherwise simulate
      const response = this.jwtToken
        ? await this.createRealZoomMeeting(meetingData)
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
    meetingData: ZoomMeetingData
  ): Promise<ZoomMeetingResponse | null> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${this.userId}/meetings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
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
    // Import WhatsApp service
    const { whatsappService } = await import('../whatsapp/whatsappService')

    // Send WhatsApp confirmation
    await whatsappService.sendDemoBookingConfirmation(
      bookingData.phone,
      bookingData.studentName,
      new Date(meetingData.start_time)
    )

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
        phone: '+919876543210',
        email: 'student@example.com',
        joinUrl: 'https://zoom.us/j/sample',
        password: 'DEMO123',
        scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      },
    ]
  }

  private async send24HourReminder(meeting: any) {
    const { whatsappService } = await import('../whatsapp/whatsappService')

    const message = `🔔 Reminder: Your NEET Biology demo class is tomorrow at ${new Date(meeting.scheduledTime).toLocaleTimeString()}
    
📚 Topic: Cell Biology & NEET Strategy
👩‍🏫 Faculty: Dr. Priya Sharma (AIIMS Graduate)

📱 Join URL: ${meeting.joinUrl}
🔐 Password: ${meeting.password}

📝 What to prepare:
• Notebook & pen
• Basic biology questions
• NEET preparation doubts

See you tomorrow! 🌟`

    await whatsappService.sendMessage({
      phone: meeting.phone,
      message,
    })
  }

  private async send1HourReminder(meeting: any) {
    const { whatsappService } = await import('../whatsapp/whatsappService')

    const message = `⏰ Your NEET Biology demo class starts in 1 HOUR!

📚 Topic: Cell Biology & NEET Strategy
🕐 Time: ${new Date(meeting.scheduledTime).toLocaleTimeString()}

📱 Join Now: ${meeting.joinUrl}
🔐 Password: ${meeting.password}

Ready? Let's crack NEET together! 🚀`

    await whatsappService.sendMessage({
      phone: meeting.phone,
      message,
    })
  }

  private async send15MinuteReminder(meeting: any) {
    const { whatsappService } = await import('../whatsapp/whatsappService')

    const message = `🚨 STARTING SOON! Your demo class begins in 15 minutes!

📱 Join URL: ${meeting.joinUrl}
🔐 Password: ${meeting.password}

Click the link now to join! 👆`

    await whatsappService.sendMessage({
      phone: meeting.phone,
      message,
    })
  }
}

export const zoomService = new ZoomService()
