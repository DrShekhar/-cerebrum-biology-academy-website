import { NextResponse } from 'next/server'

export async function GET() {
  const trustMetrics = {
    successRate: 98,
    totalStudents: 2500,
    yearsOfExperience: 10,
    averageRating: 4.9,
    totalReviews: 1800,
    facultyCount: 15,
    citiesServed: 50,
    countriesServed: 14,
    coursesOffered: 6,
    mockTestsAvailable: 500,
    videoLectures: 2000,
    studyMaterials: 5000,
  }

  return NextResponse.json({
    success: true,
    data: trustMetrics,
    timestamp: new Date().toISOString(),
  })
}

export async function POST() {
  return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 })
}
