'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, BookOpen, Video, Award, Target, Sparkles } from 'lucide-react'

interface PremiumDemoCardProps {
  selected: 'FREE' | 'PREMIUM'
  onSelect: (type: 'FREE' | 'PREMIUM') => void
  referralDiscount?: number
}

export function PremiumDemoCard({
  selected,
  onSelect,
  referralDiscount = 0,
}: PremiumDemoCardProps) {
  const premiumPrice = 99 - referralDiscount
  const isPremiumFree = premiumPrice <= 0

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <motion.button
        onClick={() => onSelect('FREE')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
          selected === 'FREE'
            ? 'border-blue-500 bg-blue-50 shadow-lg'
            : 'border-gray-200 bg-white hover:border-blue-300'
        }`}
      >
        {selected === 'FREE' && (
          <div className="absolute top-4 right-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Free Demo</h3>
          <p className="text-3xl font-bold text-blue-600">₹0</p>
        </div>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">45-minute session</span>
          </li>
          <li className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Introduction to NEET Biology</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Basic study materials</span>
          </li>
          <li className="flex items-start gap-3">
            <Video className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">Live interactive session</span>
          </li>
        </ul>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Perfect for first-time users</p>
        </div>
      </motion.button>

      <motion.button
        onClick={() => onSelect('PREMIUM')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative p-6 rounded-2xl border-2 transition-all text-left overflow-hidden ${
          selected === 'PREMIUM'
            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl'
            : 'border-purple-200 bg-white hover:border-purple-400'
        }`}
      >
        <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          PREMIUM
        </div>

        {selected === 'PREMIUM' && (
          <div className="absolute top-4 left-4">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
        )}

        <div className="mb-4 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Premium Demo</h3>
          <div className="flex items-baseline gap-2">
            {referralDiscount > 0 && !isPremiumFree && (
              <span className="text-xl text-gray-500 line-through">₹99</span>
            )}
            <p className="text-3xl font-bold text-purple-600">
              {isPremiumFree ? 'FREE' : `₹${premiumPrice}`}
            </p>
          </div>
          {referralDiscount > 0 && !isPremiumFree && (
            <p className="text-sm text-green-600 font-medium mt-1">
              Save ₹{referralDiscount} with referral code!
            </p>
          )}
          {isPremiumFree && (
            <p className="text-sm text-green-600 font-medium mt-1">
              100% off with your referral code! 🎉
            </p>
          )}
        </div>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">90-minute extended session</span>
          </li>
          <li className="flex items-start gap-3">
            <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">Advanced topics & strategies</span>
          </li>
          <li className="flex items-start gap-3">
            <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">Personalized study plan</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">Free mock test access (₹500 value)</span>
          </li>
          <li className="flex items-start gap-3">
            <Video className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">Recording provided for revision</span>
          </li>
          <li className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">Premium study materials pack</span>
          </li>
        </ul>

        <div className="mt-6 pt-4 border-t border-purple-200">
          <p className="text-sm text-purple-700 font-medium">
            Best value - Most comprehensive demo experience!
          </p>
        </div>
      </motion.button>
    </div>
  )
}
