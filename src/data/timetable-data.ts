export type ClassType = 'CLASS_11' | 'CLASS_12' | 'DROPPERS' | 'PINNACLE_ZA'
export type Location = 'GURUGRAM' | 'SOUTH_EXT' | 'ROHINI'
export type BatchStatus = 'AVAILABLE' | 'FULL'

export interface Batch {
  id: string
  classType: ClassType
  batchNumber: number
  days: string[]
  startTime: string
  endTime: string
  offlineLocation: Location
  hasOnline: boolean
  status: BatchStatus
}

export interface NeetClass {
  classType: 'CLASS_11' | 'CLASS_12'
  optionA: { day: string; time: string }
  optionB: { day: string; time: string }
}

export interface TestSchedule {
  classType: 'CLASS_11' | 'CLASS_12'
  day: string
  time: string
  mode: string
}

export const locationLabels: Record<Location, string> = {
  GURUGRAM: 'Gurugram',
  SOUTH_EXT: 'South Delhi (South Ext)',
  ROHINI: 'Rohini',
}

export const classTypeLabels: Record<ClassType, string> = {
  CLASS_11: 'Class 11th',
  CLASS_12: 'Class 12th',
  DROPPERS: 'Droppers',
  PINNACLE_ZA: 'Pinnacle ZA',
}

export interface BatchCombination {
  id: string
  class11Batch: Batch
  class12Batch: Batch
  combinationType: 'different_days' | 'same_days_sequential'
  description: string
}

// Class 11th Batches
const class11Batches: Batch[] = [
  {
    id: 'c11-b1',
    classType: 'CLASS_11',
    batchNumber: 1,
    days: ['Mon', 'Wed'],
    startTime: '18:00',
    endTime: '19:30',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'c11-b2',
    classType: 'CLASS_11',
    batchNumber: 2,
    days: ['Sat', 'Sun'],
    startTime: '09:30',
    endTime: '11:00',
    offlineLocation: 'SOUTH_EXT',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'c11-b3',
    classType: 'CLASS_11',
    batchNumber: 3,
    days: ['Sat', 'Sun'],
    startTime: '15:30',
    endTime: '17:00',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'c11-b4',
    classType: 'CLASS_11',
    batchNumber: 4,
    days: ['Tue', 'Thu'],
    startTime: '16:15',
    endTime: '17:45',
    offlineLocation: 'ROHINI',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'c11-b5',
    classType: 'CLASS_11',
    batchNumber: 5,
    days: ['Sat', 'Sun'],
    startTime: '19:30',
    endTime: '21:00',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
]

// Class 12th Batches
const class12Batches: Batch[] = [
  {
    id: 'c12-b1',
    classType: 'CLASS_12',
    batchNumber: 1,
    days: ['Mon', 'Wed'],
    startTime: '16:15',
    endTime: '17:45',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'c12-b2',
    classType: 'CLASS_12',
    batchNumber: 2,
    days: ['Sat', 'Sun'],
    startTime: '08:00',
    endTime: '09:30',
    offlineLocation: 'SOUTH_EXT',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'c12-b3',
    classType: 'CLASS_12',
    batchNumber: 3,
    days: ['Sat', 'Sun'],
    startTime: '14:00',
    endTime: '15:30',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'c12-b4',
    classType: 'CLASS_12',
    batchNumber: 4,
    days: ['Tue', 'Thu'],
    startTime: '18:00',
    endTime: '19:30',
    offlineLocation: 'ROHINI',
    hasOnline: true,
    status: 'AVAILABLE',
  },
]

// Droppers Batches (longer duration classes)
const droppersBatches: Batch[] = [
  {
    id: 'drop-b1',
    classType: 'DROPPERS',
    batchNumber: 1,
    days: ['Mon', 'Wed'],
    startTime: '16:15',
    endTime: '19:30',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'drop-b2',
    classType: 'DROPPERS',
    batchNumber: 2,
    days: ['Sat', 'Sun'],
    startTime: '08:00',
    endTime: '11:00',
    offlineLocation: 'SOUTH_EXT',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'drop-b3',
    classType: 'DROPPERS',
    batchNumber: 3,
    days: ['Sat', 'Sun'],
    startTime: '14:00',
    endTime: '17:00',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'drop-b4',
    classType: 'DROPPERS',
    batchNumber: 4,
    days: ['Tue', 'Thu'],
    startTime: '16:15',
    endTime: '19:30',
    offlineLocation: 'ROHINI',
    hasOnline: true,
    status: 'AVAILABLE',
  },
  {
    id: 'drop-b5',
    classType: 'DROPPERS',
    batchNumber: 5,
    days: ['Sat', 'Sun'],
    startTime: '19:30',
    endTime: '21:00',
    offlineLocation: 'GURUGRAM',
    hasOnline: true,
    status: 'AVAILABLE',
  },
]

export const batches: Batch[] = [...class11Batches, ...class12Batches, ...droppersBatches]

export const neetClasses: NeetClass[] = [
  {
    classType: 'CLASS_11',
    optionA: { day: 'Wednesday', time: '7:30 - 8:30 PM' },
    optionB: { day: 'Sunday', time: '6:15 - 7:15 PM' },
  },
  {
    classType: 'CLASS_12',
    optionA: { day: 'Wednesday', time: '8:30 - 9:30 PM' },
    optionB: { day: 'Sunday', time: '5:15 - 6:15 PM' },
  },
]

export const testSchedules: TestSchedule[] = [
  {
    classType: 'CLASS_11',
    day: 'Monday',
    time: '8:30 - 9:30 PM',
    mode: 'Online (can request offline or custom time)',
  },
  {
    classType: 'CLASS_12',
    day: 'Monday',
    time: '9:30 - 10:30 PM',
    mode: 'Online (can request offline or custom time)',
  },
]

export const locations: Location[] = ['GURUGRAM', 'SOUTH_EXT', 'ROHINI']

export function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`
}

export function getBatchesByClassType(classType: ClassType): Batch[] {
  return batches.filter((batch) => batch.classType === classType)
}

export function filterBatches(
  classType: ClassType,
  location: Location | 'ALL' | 'ONLINE'
): Batch[] {
  // Always return ALL batches for the class type
  // The UI will mark batches differently based on whether they match the selected location
  return getBatchesByClassType(classType)
}

export function getNeetClassByType(classType: 'CLASS_11' | 'CLASS_12'): NeetClass | undefined {
  return neetClasses.find((nc) => nc.classType === classType)
}

export function getTestScheduleByType(
  classType: 'CLASS_11' | 'CLASS_12'
): TestSchedule | undefined {
  return testSchedules.find((ts) => ts.classType === classType)
}

// Helper to check if two time ranges overlap
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function doTimesOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
  const s1 = timeToMinutes(start1)
  const e1 = timeToMinutes(end1)
  const s2 = timeToMinutes(start2)
  const e2 = timeToMinutes(end2)
  return s1 < e2 && s2 < e1
}

// Check if two batches have overlapping schedules
function doBatchesConflict(batch1: Batch, batch2: Batch): boolean {
  // Check if any days overlap
  const commonDays = batch1.days.filter((day) => batch2.days.includes(day))
  if (commonDays.length === 0) {
    return false // Different days, no conflict
  }
  // Same days - check if times overlap
  return doTimesOverlap(batch1.startTime, batch1.endTime, batch2.startTime, batch2.endTime)
}

// Generate all valid Class 11th + Class 12th combinations for Pinnacle ZA
export function generateBatchCombinations(): BatchCombination[] {
  const class11 = batches.filter((b) => b.classType === 'CLASS_11')
  const class12 = batches.filter((b) => b.classType === 'CLASS_12')
  const combinations: BatchCombination[] = []

  for (const b11 of class11) {
    for (const b12 of class12) {
      if (!doBatchesConflict(b11, b12)) {
        const commonDays = b11.days.filter((day) => b12.days.includes(day))
        const isDifferentDays = commonDays.length === 0

        let description: string
        if (isDifferentDays) {
          description = `11th: ${b11.days.join('/')} | 12th: ${b12.days.join('/')}`
        } else {
          description = `${commonDays.join('/')}: 11th then 12th (back-to-back)`
        }

        combinations.push({
          id: `combo-${b11.id}-${b12.id}`,
          class11Batch: b11,
          class12Batch: b12,
          combinationType: isDifferentDays ? 'different_days' : 'same_days_sequential',
          description,
        })
      }
    }
  }

  return combinations
}

// Export class-specific batches for easy access
export { class11Batches, class12Batches, droppersBatches }
