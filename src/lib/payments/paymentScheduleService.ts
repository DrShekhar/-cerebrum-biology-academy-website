/**
 * Payment Schedule Service
 * Calculates intelligent payment schedules based on admission date and academic calendar
 * Supports: 3 Installments, Alternate Month, Quarterly/Dynamic
 */

import { addDays, addMonths, setDate, differenceInMonths, isAfter, isBefore } from 'date-fns'

export type PaymentScheduleType =
  | 'THREE_INSTALLMENTS'
  | 'ALTERNATE_MONTH'
  | 'QUARTERLY_DYNAMIC'
  | 'CUSTOM'

export interface PaymentSchedule {
  type: PaymentScheduleType
  installments: PaymentInstallment[]
  admissionDate: Date
  academicYear: string
  calculationMethod: string
}

export interface PaymentInstallment {
  number: number
  dueDate: Date
  description: string
}

/**
 * Academic Year in India: April 1 - March 31
 */
const ACADEMIC_YEAR_START_MONTH = 3 // April (0-indexed)
const ACADEMIC_YEAR_END_MONTH = 2 // March (0-indexed)

/**
 * Get current academic year string (e.g., "2026-2027")
 */
function getAcademicYear(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth()

  if (month >= ACADEMIC_YEAR_START_MONTH) {
    return `${year}-${year + 1}`
  } else {
    return `${year - 1}-${year}`
  }
}

/**
 * Get academic year end date for a given date
 */
function getAcademicYearEnd(date: Date): Date {
  const year = date.getFullYear()
  const month = date.getMonth()

  if (month >= ACADEMIC_YEAR_START_MONTH) {
    // If we're in April or later, academic year ends next March 31
    return new Date(year + 1, ACADEMIC_YEAR_END_MONTH, 31)
  } else {
    // If we're in Jan-March, academic year ends this March 31
    return new Date(year, ACADEMIC_YEAR_END_MONTH, 31)
  }
}

/**
 * Calculate months remaining in current academic year
 */
function getMonthsRemainingInAcademicYear(date: Date): number {
  const academicYearEnd = getAcademicYearEnd(date)
  return differenceInMonths(academicYearEnd, date)
}

/**
 * Calculate THREE_INSTALLMENTS schedule
 * Day 1 (admission day), Day 31, Day 61
 */
export function calculateThreeInstallments(admissionDate: Date): PaymentSchedule {
  const installments: PaymentInstallment[] = [
    {
      number: 1,
      dueDate: admissionDate,
      description: 'First installment (Admission day)',
    },
    {
      number: 2,
      dueDate: addDays(admissionDate, 30),
      description: 'Second installment (30 days after admission)',
    },
    {
      number: 3,
      dueDate: addDays(admissionDate, 60),
      description: 'Third installment (60 days after admission)',
    },
  ]

  return {
    type: 'THREE_INSTALLMENTS',
    installments,
    admissionDate,
    academicYear: getAcademicYear(admissionDate),
    calculationMethod: '3 equal installments: Day 1, Day 31, Day 61',
  }
}

/**
 * Calculate ALTERNATE_MONTH schedule
 * 5th of every alternate month starting from admission month
 */
export function calculateAlternateMonth(
  admissionDate: Date,
  numberOfInstallments: number = 4
): PaymentSchedule {
  const installments: PaymentInstallment[] = []

  // First installment on admission day
  installments.push({
    number: 1,
    dueDate: admissionDate,
    description: 'First installment (Admission day)',
  })

  // Remaining installments on 5th of alternate months
  let currentDate = addMonths(admissionDate, 2) // Skip 1 month, start from 2 months later

  for (let i = 2; i <= numberOfInstallments; i++) {
    const installmentDate = setDate(currentDate, 5)

    installments.push({
      number: i,
      dueDate: installmentDate,
      description: `Installment ${i} (5th of ${installmentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`,
    })

    currentDate = addMonths(currentDate, 2) // Move to next alternate month
  }

  return {
    type: 'ALTERNATE_MONTH',
    installments,
    admissionDate,
    academicYear: getAcademicYear(admissionDate),
    calculationMethod: `Alternate month payments on 5th (${numberOfInstallments} installments)`,
  }
}

/**
 * Calculate QUARTERLY_DYNAMIC schedule
 * Complex logic based on academic year and admission date
 */
export function calculateQuarterlyDynamic(admissionDate: Date): PaymentSchedule {
  const month = admissionDate.getMonth()
  const year = admissionDate.getFullYear()
  const day = admissionDate.getDate()

  // Case 1: Join between March 1 - April 10 → Quarterly payments
  const isMarchAdmission = month === 2 // March (0-indexed)
  const isEarlyAprilAdmission = month === 3 && day <= 10 // April 1-10

  if (isMarchAdmission || isEarlyAprilAdmission) {
    return calculateQuarterlySchedule(admissionDate)
  }

  // Case 2: Join after April 10
  const monthsRemaining = getMonthsRemainingInAcademicYear(admissionDate)

  // More than 8 months left → Alternate months
  if (monthsRemaining > 8) {
    return calculateAlternateMonth(admissionDate, Math.ceil(monthsRemaining / 2))
  }

  // Less than or equal to 8 months left → 4 monthly installments
  return calculateFourMonthlyInstallments(admissionDate)
}

/**
 * Calculate Quarterly Schedule (for March 1 - April 10 admissions)
 * First installment on admission day, then June 5, Sept 5, Dec 5
 */
function calculateQuarterlySchedule(admissionDate: Date): PaymentSchedule {
  const year = admissionDate.getFullYear()
  const month = admissionDate.getMonth()

  // Determine which academic year we're in
  let currentYear = year
  if (month < 3) {
    // If admitted in Jan-March, we're still in previous academic year
    currentYear = year
  }

  const installments: PaymentInstallment[] = [
    {
      number: 1,
      dueDate: admissionDate,
      description: 'First installment (Admission day)',
    },
  ]

  // Add June 5, Sept 5, Dec 5 of the current academic year
  const quarterlyDates = [
    new Date(currentYear, 5, 5), // June 5
    new Date(currentYear, 8, 5), // Sept 5
    new Date(currentYear, 11, 5), // Dec 5
  ]

  let installmentNumber = 2
  for (const date of quarterlyDates) {
    // Only add dates that are after admission date
    if (isAfter(date, admissionDate)) {
      installments.push({
        number: installmentNumber++,
        dueDate: date,
        description: `Installment ${installmentNumber - 1} (Quarterly - ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })})`,
      })
    }
  }

  return {
    type: 'QUARTERLY_DYNAMIC',
    installments,
    admissionDate,
    academicYear: getAcademicYear(admissionDate),
    calculationMethod: 'Quarterly schedule (March 1 - April 10 admission)',
  }
}

/**
 * Calculate 4 Monthly Installments
 * Day 1, Day 31, Day 61, Day 91
 */
function calculateFourMonthlyInstallments(admissionDate: Date): PaymentSchedule {
  const installments: PaymentInstallment[] = [
    {
      number: 1,
      dueDate: admissionDate,
      description: 'First installment (Admission day)',
    },
    {
      number: 2,
      dueDate: addDays(admissionDate, 30),
      description: 'Second installment (30 days)',
    },
    {
      number: 3,
      dueDate: addDays(admissionDate, 60),
      description: 'Third installment (60 days)',
    },
    {
      number: 4,
      dueDate: addDays(admissionDate, 90),
      description: 'Fourth installment (90 days)',
    },
  ]

  return {
    type: 'QUARTERLY_DYNAMIC',
    installments,
    admissionDate,
    academicYear: getAcademicYear(admissionDate),
    calculationMethod: '4 monthly installments (less than 8 months remaining in academic year)',
  }
}

/**
 * Main function to calculate payment schedule based on type
 */
export function calculatePaymentSchedule(
  admissionDate: Date,
  scheduleType: PaymentScheduleType,
  numberOfInstallments?: number
): PaymentSchedule {
  switch (scheduleType) {
    case 'THREE_INSTALLMENTS':
      return calculateThreeInstallments(admissionDate)

    case 'ALTERNATE_MONTH':
      return calculateAlternateMonth(admissionDate, numberOfInstallments || 4)

    case 'QUARTERLY_DYNAMIC':
      return calculateQuarterlyDynamic(admissionDate)

    case 'CUSTOM':
      throw new Error('Custom schedules must be defined manually by counselor')

    default:
      throw new Error(`Unknown schedule type: ${scheduleType}`)
  }
}

/**
 * Get upcoming payment reminders (installments due within next N days)
 */
export function getUpcomingPaymentReminders(
  schedule: PaymentSchedule,
  daysAhead: number = 5
): PaymentInstallment[] {
  const now = new Date()
  const futureDate = addDays(now, daysAhead)

  return schedule.installments.filter((installment) => {
    return isAfter(installment.dueDate, now) && isBefore(installment.dueDate, futureDate)
  })
}

/**
 * Get overdue installments
 */
export function getOverdueInstallments(schedule: PaymentSchedule): PaymentInstallment[] {
  const now = new Date()

  return schedule.installments.filter((installment) => isBefore(installment.dueDate, now))
}

/**
 * Format schedule for display
 */
export function formatScheduleForDisplay(schedule: PaymentSchedule): string {
  const lines = [
    `Schedule Type: ${schedule.type}`,
    `Academic Year: ${schedule.academicYear}`,
    `Calculation Method: ${schedule.calculationMethod}`,
    '',
    'Installments:',
  ]

  schedule.installments.forEach((installment) => {
    lines.push(
      `  ${installment.number}. ${installment.dueDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} - ${installment.description}`
    )
  })

  return lines.join('\n')
}

/**
 * Singleton payment schedule service
 */
class PaymentScheduleService {
  calculate(admissionDate: Date, scheduleType: PaymentScheduleType, numberOfInstallments?: number) {
    return calculatePaymentSchedule(admissionDate, scheduleType, numberOfInstallments)
  }

  getUpcomingReminders(schedule: PaymentSchedule, daysAhead: number = 5) {
    return getUpcomingPaymentReminders(schedule, daysAhead)
  }

  getOverdue(schedule: PaymentSchedule) {
    return getOverdueInstallments(schedule)
  }

  formatForDisplay(schedule: PaymentSchedule) {
    return formatScheduleForDisplay(schedule)
  }

  getAcademicYearForDate(date: Date) {
    return getAcademicYear(date)
  }

  getMonthsRemainingInAcademicYear(date: Date) {
    return getMonthsRemainingInAcademicYear(date)
  }
}

export const paymentScheduleService = new PaymentScheduleService()
