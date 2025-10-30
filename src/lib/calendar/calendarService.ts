import { createEvent, EventAttributes } from 'ics'

interface BookingData {
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  instructor?: string
  zoomJoinUrl?: string
  zoomPassword?: string
  demoType?: 'FREE' | 'PREMIUM'
}

function parseTime(timeStr: string): { hour: number; minute: number } {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) {
    throw new Error('Invalid time format')
  }

  let hour = parseInt(match[1])
  const minute = parseInt(match[2])
  const period = match[3].toUpperCase()

  if (period === 'PM' && hour !== 12) {
    hour += 12
  } else if (period === 'AM' && hour === 12) {
    hour = 0
  }

  return { hour, minute }
}

export function downloadCalendarEvent(bookingData: BookingData): void {
  try {
    const [year, month, day] = bookingData.preferredDate.split('-').map(Number)
    const timeMatch = bookingData.preferredTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)

    if (!timeMatch) {
      throw new Error('Invalid time format')
    }

    const { hour, minute } = parseTime(timeMatch[0])

    const isDemoTypePremium = bookingData.demoType === 'PREMIUM'
    const durationHours = isDemoTypePremium ? 1.5 : 1

    const description = `Your ${isDemoTypePremium ? 'Premium' : 'Free'} NEET Biology Demo Class with Cerebrum Academy

Join URL: ${bookingData.zoomJoinUrl || 'Will be shared 30 minutes before the session'}
${bookingData.zoomPassword ? `Password: ${bookingData.zoomPassword}` : ''}

What to prepare:
- Notebook and pen for notes
- Any specific questions or topics you want to cover
- Stable internet connection
- Quiet environment for focused learning

${isDemoTypePremium ? 'Premium Demo Benefits:\n- Extended 90-minute session\n- Personalized study plan\n- Free mock test access\n- Session recording provided\n\n' : ''}Contact: +91 88264 44334
Email: support@cerebrumbiologyacademy.com`

    const event: EventAttributes = {
      start: [year, month, day, hour, minute],
      duration: { hours: durationHours },
      title: `${isDemoTypePremium ? 'Premium ' : ''}NEET Biology Demo Class - Cerebrum Academy`,
      description,
      location: 'Online (Zoom)',
      url: bookingData.zoomJoinUrl || 'https://cerebrumbiologyacademy.com',
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: {
        name: 'Cerebrum Biology Academy',
        email: 'support@cerebrumbiologyacademy.com',
      },
      attendees: [
        {
          name: bookingData.studentName,
          email: bookingData.email,
          rsvp: true,
          role: 'REQ-PARTICIPANT',
        },
      ],
      alarms: [
        {
          action: 'display',
          description: 'Reminder: NEET Biology Demo Class starts in 30 minutes',
          trigger: { hours: 0, minutes: 30, before: true },
        },
        {
          action: 'display',
          description: 'Reminder: NEET Biology Demo Class starts in 1 hour',
          trigger: { hours: 1, minutes: 0, before: true },
        },
      ],
    }

    createEvent(event, (error, value) => {
      if (error) {
        console.error('Calendar event creation error:', error)
        throw new Error('Failed to create calendar event')
      }

      const blob = new Blob([value], {
        type: 'text/calendar;charset=utf-8',
      })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `cerebrum-demo-${bookingData.studentName.replace(/\s+/g, '-').toLowerCase()}-${bookingData.preferredDate}.ics`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    })
  } catch (error) {
    console.error('Error generating calendar event:', error)
    throw error
  }
}

export function shareCalendarViaEmail(bookingData: BookingData): string {
  const subject = encodeURIComponent('NEET Biology Demo Class - Cerebrum Academy')
  const body = encodeURIComponent(
    `I've booked a demo class with Cerebrum Academy!

Date: ${bookingData.preferredDate}
Time: ${bookingData.preferredTime}

Join me in exploring NEET Biology preparation with expert teachers.
Book your free demo: https://cerebrumbiologyacademy.com/demo-booking`
  )

  return `mailto:?subject=${subject}&body=${body}`
}

export function shareCalendarViaWhatsApp(bookingData: BookingData): string {
  const message = encodeURIComponent(
    `I've booked a ${bookingData.demoType === 'PREMIUM' ? 'Premium ' : ''}NEET Biology Demo Class with Cerebrum Academy!

📅 Date: ${bookingData.preferredDate}
⏰ Time: ${bookingData.preferredTime}

Join me in preparing for NEET with expert biology teachers.
Book your demo: https://cerebrumbiologyacademy.com/demo-booking`
  )

  return `https://wa.me/?text=${message}`
}

export function addToGoogleCalendar(bookingData: BookingData): string {
  const [year, month, day] = bookingData.preferredDate.split('-').map(Number)
  const { hour, minute } = parseTime(bookingData.preferredTime.split(' - ')[0])

  const startDate = new Date(year, month - 1, day, hour, minute)
  const endDate = new Date(startDate)
  endDate.setHours(endDate.getHours() + (bookingData.demoType === 'PREMIUM' ? 1.5 : 1))

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const details = encodeURIComponent(
    `Your ${bookingData.demoType === 'PREMIUM' ? 'Premium ' : ''}NEET Biology Demo Class

Join URL: ${bookingData.zoomJoinUrl || 'Will be shared before session'}
Contact: +91 88264 44334`
  )

  const location = encodeURIComponent('Online (Zoom)')
  const title = encodeURIComponent(
    `${bookingData.demoType === 'PREMIUM' ? 'Premium ' : ''}NEET Biology Demo - Cerebrum Academy`
  )

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&location=${location}`
}
