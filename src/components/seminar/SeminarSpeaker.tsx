'use client'

import Image from 'next/image'
import { Award, Users, Clock, BookOpen } from 'lucide-react'
import { SEMINAR_CONFIG } from '@/lib/seminar/config'

export function SeminarSpeaker() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-green-600 font-semibold mb-2">MEET YOUR HOST</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Learn from India's Trusted NEET Biology Expert
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-64 md:h-auto bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl" />
              </div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                <Image
                  src={SEMINAR_CONFIG.speakerImage}
                  alt={SEMINAR_CONFIG.speakerName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {SEMINAR_CONFIG.speakerName}
              </h3>
              <p className="text-green-600 font-semibold mb-4">
                {SEMINAR_CONFIG.speakerTitle}
              </p>
              <p className="text-slate-600 mb-6">{SEMINAR_CONFIG.speakerBio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">15+</p>
                    <p className="text-xs text-slate-500">Years Teaching</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">1,50,000+</p>
                    <p className="text-xs text-slate-500">Students Mentored</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">100+</p>
                    <p className="text-xs text-slate-500">AIR under 1,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">Biology</p>
                    <p className="text-xs text-slate-500">Specialization</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-6 p-4 bg-slate-50 rounded-xl border-l-4 border-green-500">
                <p className="text-slate-700 italic">
                  "NEET success isn't just about the student - it's a family
                  journey. When parents understand their role, students perform
                  better."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeminarSpeaker
