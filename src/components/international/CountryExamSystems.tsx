import { Check } from 'lucide-react'
import { type CountryConfig } from '@/lib/international/countries'

interface CountryExamSystemsProps {
  country: CountryConfig
}

export function CountryExamSystems({ country }: CountryExamSystemsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
          We Cover All {country.name} Exam Systems
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Our expert tutors specialize in the curricula and exam formats specific
          to {country.name}.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {country.examSystems.map((exam) => (
            <div
              key={exam}
              className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900">{exam}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CountryExamSystems
