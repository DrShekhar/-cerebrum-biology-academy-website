/**
 * OlympiadHero — server component, props-driven.
 * Used by /programs/biology-olympiad and /programs/biology-olympiad/[country].
 *
 * Brand constants: #6B5DC6 (purple), #2C2C2C (dark), #EDE9FF (light purple).
 */

import Link from 'next/link'
import { GraduationCap, MessageCircle, Phone, Sparkles, Users } from 'lucide-react'
import type { OlympiadCountry } from '@/config/olympiad-countries'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface OlympiadHeroProps {
  /** Optional — when present, renders the per-country hero. Otherwise the global hub hero. */
  country?: OlympiadCountry
}

export function OlympiadHero({ country }: OlympiadHeroProps) {
  const isCountry = !!country

  const headline = isCountry
    ? `Biology Olympiad & IBO Coaching for ${country!.name} Students`
    : 'Biology Olympiad & IBO Coaching — Live Online, Globally'

  const subhead = isCountry
    ? country!.heroAngle
    : 'AIIMSonian-led, biology-only coaching for olympiad-aspirant students at international schools worldwide. Small batches (4–6 students), live online in your time zone, with a 99%+ NCERT-aligned foundation that doubles as Pre-Med preparation.'

  const counsellingMessage = isCountry
    ? `Hi! I want to book a free counselling call for the Biology Olympiad & IBO programme. I am in ${country!.name}. Please share available slots in ${country!.timezone}.`
    : 'Hi! I want to book a free counselling call for the Biology Olympiad & IBO programme.'

  const counsellingHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(counsellingMessage)}`

  return (
    <section className="relative overflow-hidden bg-[#2C2C2C] py-20 md:py-28">
      {/* Decorative background — no images required */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#6B5DC6] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#EDE9FF] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        {/* AIIMSonian's Initiative tagline */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-[#EDE9FF] backdrop-blur">
          <Sparkles className="h-4 w-4 text-[#EDE9FF]" />
          <span className="font-medium">An AIIMSonian&apos;s Initiative</span>
          {isCountry && country!.flag && (
            <>
              <span className="opacity-50">·</span>
              <span aria-hidden="true">{country!.flag}</span>
              <span className="font-medium">{country!.name}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {headline}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">{subhead}</p>

        {/* Trust strip — credentials, batch size, time zone */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white">
            <GraduationCap className="h-4 w-4 text-[#EDE9FF]" />
            AIIMS-trained faculty
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white">
            <Users className="h-4 w-4 text-[#EDE9FF]" />
            4–6 students / batch
          </span>
          {isCountry && (
            <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white">
              <Sparkles className="h-4 w-4 text-[#EDE9FF]" />
              {country!.timezone}
            </span>
          )}
        </div>

        {/* Banner — for canonical-hub countries (USA / UK / Canada / Singapore / Australia) */}
        {isCountry && country!.canonicalHubUrl && country!.canonicalHubLabel && (
          <div className="mt-6 rounded-xl border border-[#EDE9FF]/30 bg-[#EDE9FF]/10 p-4 text-sm text-white/90 backdrop-blur">
            <strong className="text-[#EDE9FF]">
              Is your child enrolled at a {country!.name} host-country school?
            </strong>{' '}
            Our dedicated{' '}
            <Link
              href={country!.canonicalHubUrl}
              className="underline decoration-[#EDE9FF] underline-offset-2 hover:text-[#EDE9FF]"
            >
              {country!.canonicalHubLabel} programme
            </Link>{' '}
            is the better fit — it specifically prepares students for {country!.nationalOlympiad}{' '}
            eligibility. This page is for international-school families instead.
          </div>
        )}

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={counsellingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6B5DC6] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#5a4fb0]"
          >
            <MessageCircle className="h-5 w-5" />
            Book a free counselling call
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone.primary}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
          >
            <Phone className="h-5 w-5" />
            +91 88264 44334
          </a>
        </div>
      </div>
    </section>
  )
}
