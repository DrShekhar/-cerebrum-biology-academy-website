'use client'

import { CalendarCheck, ListChecks, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

const steps = [
  {
    number: '1',
    icon: CalendarCheck,
    title: 'Book Free Demo',
    description:
      'Experience our teaching style with a no-obligation demo class. See why parents love our approach.',
    cta: {
      label: 'Book Demo Class',
      variant: 'default' as const,
      className: 'bg-[#facc15] text-slate-900 hover:bg-[#fde047]',
      action: () =>
        trackAndOpenWhatsApp({
          source: 'enrollment-steps-demo',
          message: 'Hi, I would like to book a free demo class for my child.',
        }),
    },
  },
  {
    number: '2',
    icon: ListChecks,
    title: 'Choose Your Plan',
    description:
      'Pick from Pursuit (\u20B945K), Ascent (\u20B960K), or Pinnacle (\u20B990K) based on your goals. EMI available.',
    cta: {
      label: 'View Plans',
      variant: 'outline' as const,
      className: '',
      href: '#pricing',
    },
  },
  {
    number: '3',
    icon: Rocket,
    title: 'Start Learning',
    description:
      'Get instant access to live classes, study materials, MCQ tools, and our community. Your NEET journey begins!',
    cta: {
      label: 'Chat on WhatsApp',
      variant: 'default' as const,
      className: 'bg-green-500 text-white hover:bg-green-600',
      action: () =>
        trackAndOpenWhatsApp({
          source: 'enrollment-steps-start',
          message: 'Hi, I want to start my NEET preparation journey with Cerebrum.',
        }),
    },
  },
]

export default function EnrollmentStepsSection() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="animate-fadeInUp mb-10 text-center text-2xl font-bold text-slate-900 sm:mb-12 sm:text-3xl lg:text-4xl">
          Start Your NEET Journey in 3 Simple Steps
        </h2>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:mb-12 md:grid-cols-3 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative flex flex-col items-center">
                <div className="animate-fadeInUp flex w-full flex-col items-center rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
                    {step.number}
                  </div>
                  <div className="mb-2 text-teal-600">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-center text-lg font-bold text-slate-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mb-6 text-center text-sm leading-relaxed text-slate-600 sm:text-base">
                    {step.description}
                  </p>
                  {'action' in step.cta && step.cta.action ? (
                    <Button
                      size="default"
                      variant={step.cta.variant}
                      className={step.cta.className}
                      onClick={step.cta.action}
                    >
                      {step.cta.label}
                    </Button>
                  ) : (
                    <Button
                      size="default"
                      variant={step.cta.variant}
                      className={step.cta.className}
                      asChild
                    >
                      <a href={'href' in step.cta ? step.cta.href : '#'}>{step.cta.label}</a>
                    </Button>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <span
                    className="my-4 text-3xl text-teal-400 md:absolute md:-right-6 md:top-1/2 md:my-0 md:-translate-y-1/2 lg:-right-7"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <p className="animate-fadeInUp text-center text-sm text-slate-500 sm:text-base">
          Join 15,000+ students who started their NEET journey with Cerebrum
        </p>
      </div>
    </section>
  )
}
