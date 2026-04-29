/**
 * CountryTestimonials — server component.
 * Renders the testimonial cards from the country config. Placeholder data is
 * marked clearly in the config and rendered with reduced visual weight so it
 * doesn't read as a verified claim.
 */

import { Quote } from 'lucide-react'
import type { OlympiadTestimonial } from '@/config/olympiad-countries'

interface CountryTestimonialsProps {
  testimonials: OlympiadTestimonial[]
  countryName: string
}

export function CountryTestimonials({ testimonials, countryName }: CountryTestimonialsProps) {
  if (!testimonials.length) return null

  // Treat any quote that contains "PLACEHOLDER" (case-insensitive) as a stub,
  // so we don't surface them as if they were verified.
  const hasPlaceholders = testimonials.some((t) => /placeholder/i.test(t.quote))

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-4xl">
          {countryName} students who&apos;ve trained with us
        </h2>
        {hasPlaceholders && (
          <p className="mt-3 text-sm italic text-slate-500">
            Placeholder previews — we&apos;ll publish verified {countryName} student testimonials
            here as alumni opt in.
          </p>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => {
            const isPlaceholder = /placeholder/i.test(t.quote)
            return (
              <article
                key={idx}
                className={`rounded-2xl border p-6 ${
                  isPlaceholder
                    ? 'border-dashed border-slate-300 bg-slate-50 text-slate-500'
                    : 'border-slate-200 bg-[#EDE9FF]/40 text-slate-700'
                }`}
              >
                <Quote
                  className={`h-6 w-6 ${isPlaceholder ? 'text-slate-400' : 'text-[#6B5DC6]'}`}
                />
                <blockquote className="mt-3 text-sm italic leading-relaxed">
                  {isPlaceholder ? (
                    <span className="text-xs">{t.quote}</span>
                  ) : (
                    `"${t.quote}"`
                  )}
                </blockquote>
                <div className="mt-4 border-t border-slate-200 pt-3 text-xs">
                  <div
                    className={`font-semibold ${
                      isPlaceholder ? 'text-slate-500' : 'text-[#2C2C2C]'
                    }`}
                  >
                    {t.name}
                  </div>
                  <div className="text-slate-500">{t.context}</div>
                  {t.outcome && (
                    <div
                      className={`mt-1 ${
                        isPlaceholder ? 'text-slate-400' : 'text-[#6B5DC6]'
                      } font-medium`}
                    >
                      {t.outcome}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
