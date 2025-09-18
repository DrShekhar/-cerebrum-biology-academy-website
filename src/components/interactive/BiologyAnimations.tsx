'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Atom,
  Dna,
  Heart,
  Microscope,
  Activity,
  Zap,
  Waves,
  Brain,
  Eye,
  Leaf,
  Droplets,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'

// DNA Double Helix Animation Component
export const DNAHelixAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const [isAnimating, setIsAnimating] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false })

  return (
    <div ref={ref} className={cn('relative w-64 h-96 mx-auto', className)}>
      <motion.div
        className="absolute inset-0"
        animate={isAnimating && inView ? { rotateY: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        {/* DNA Strands */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-8 flex justify-between items-center"
            style={{ top: `${i * 8}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            {/* Base Pairs */}
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg" />
            <motion.div
              className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 mx-2"
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        onClick={() => setIsAnimating(!isAnimating)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {isAnimating ? 'Pause' : 'Play'} Animation
      </motion.button>
    </div>
  )
}

// Cell Division Animation
export const CellDivisionAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const [phase, setPhase] = useState<
    'interphase' | 'prophase' | 'metaphase' | 'anaphase' | 'telophase'
  >('interphase')
  const [isPlaying, setIsPlaying] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false })

  const phases = ['interphase', 'prophase', 'metaphase', 'anaphase', 'telophase'] as const

  useEffect(() => {
    if (!isPlaying || !inView) return

    const interval = setInterval(() => {
      setPhase((current) => {
        const currentIndex = phases.indexOf(current)
        return phases[(currentIndex + 1) % phases.length]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isPlaying, inView])

  const renderCell = () => {
    switch (phase) {
      case 'interphase':
        return (
          <motion.div
            className="w-32 h-32 border-4 border-blue-500 rounded-full relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-8 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )
      case 'telophase':
        return (
          <div className="flex gap-4">
            <motion.div
              className="w-24 h-24 border-4 border-blue-500 rounded-full relative"
              initial={{ scale: 0, x: 20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-6 h-6 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
            <motion.div
              className="w-24 h-24 border-4 border-blue-500 rounded-full relative"
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-6 h-6 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>
        )
      default:
        return (
          <motion.div
            className="w-32 h-32 border-4 border-blue-500 rounded-full relative"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-8 h-8 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )
    }
  }

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="mb-8 h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCell()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mb-4">
        <div className="text-lg font-semibold text-gray-900 mb-2 capitalize">
          {phase.replace(/([A-Z])/g, ' $1')}
        </div>
        <div className="text-sm text-gray-600">
          {phase === 'interphase' && 'Cell grows and duplicates its DNA'}
          {phase === 'prophase' && 'Chromosomes condense and become visible'}
          {phase === 'metaphase' && 'Chromosomes align at the cell center'}
          {phase === 'anaphase' && 'Sister chromatids separate and move apart'}
          {phase === 'telophase' && 'Two new nuclei form around separated chromosomes'}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <motion.button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>
        <motion.button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
          onClick={() => {
            setPhase('interphase')
            setIsPlaying(false)
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </motion.button>
      </div>
    </div>
  )
}

// Heart Beat Animation for Cardiovascular System
export const HeartBeatAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const [bpm, setBpm] = useState(72)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false })

  const beatDuration = 60 / bpm

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <motion.div
        className="relative w-48 h-48 mx-auto mb-8"
        animate={
          inView
            ? {
                scale: [1, 1.2, 1],
                filter: ['hue-rotate(0deg)', 'hue-rotate(20deg)', 'hue-rotate(0deg)'],
              }
            : {}
        }
        transition={{
          duration: beatDuration,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <Heart className="w-full h-full text-red-500 fill-current drop-shadow-lg" />

        {/* Pulse Wave */}
        <motion.div
          className="absolute inset-0 border-2 border-red-300 rounded-full"
          animate={
            inView
              ? {
                  scale: [1, 2, 2.5],
                  opacity: [0.7, 0.3, 0],
                }
              : {}
          }
          transition={{
            duration: beatDuration,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-red-600 mb-2">{bpm} BPM</div>
        <div className="text-sm text-gray-600">Normal resting heart rate: 60-100 BPM</div>
      </div>

      <div className="flex items-center gap-4 justify-center">
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
          onClick={() => setBpm(Math.max(30, bpm - 10))}
        >
          -10
        </button>
        <span className="text-sm font-medium">Heart Rate</span>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
          onClick={() => setBpm(Math.min(200, bpm + 10))}
        >
          +10
        </button>
      </div>
    </div>
  )
}

// Photosynthesis Process Animation
export const PhotosynthesisAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const [isActive, setIsActive] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false })

  return (
    <div ref={ref} className={cn('relative w-full h-64', className)}>
      {/* Sun */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16"
        animate={isActive && inView ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full bg-yellow-400 rounded-full relative">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-6 bg-yellow-400 origin-bottom"
              style={{
                left: '50%',
                bottom: '50%',
                transform: `translateX(-50%) rotate(${i * 45}deg)`,
                transformOrigin: '0 100%',
              }}
              animate={isActive && inView ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Light Rays */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-1"
        animate={isActive && inView ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-0.5 bg-yellow-300"
            style={{ top: `${i * 4}px` }}
            animate={isActive && inView ? { x: [-20, 40] } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>

      {/* Leaf */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={isActive && inView ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Leaf className="w-32 h-32 text-green-500 fill-current" />

        {/* CO2 molecules */}
        <motion.div
          className="absolute -left-8 top-8 w-4 h-4 bg-gray-400 rounded-full"
          animate={isActive && inView ? { x: [0, 40], opacity: [1, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* O2 molecules */}
        <motion.div
          className="absolute -right-8 top-8 w-4 h-4 bg-blue-400 rounded-full"
          animate={isActive && inView ? { x: [0, -40], opacity: [0, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>

      {/* Water molecules */}
      <motion.div
        className="absolute bottom-4 left-1/4"
        animate={isActive && inView ? { y: [0, -20], opacity: [1, 0] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Droplets className="w-6 h-6 text-blue-500" />
      </motion.div>

      {/* Control Button */}
      <motion.button
        className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
        onClick={() => setIsActive(!isActive)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {isActive ? 'Pause' : 'Start'} Process
      </motion.button>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 text-xs text-gray-600">
        <div>H₂O + CO₂ + Sunlight → C₆H₁₂O₆ + O₂</div>
      </div>
    </div>
  )
}

// Interactive Neuron Firing Animation
export const NeuronFiringAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const [firing, setFiring] = useState(false)
  const [frequency, setFrequency] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (!firing || !inView) return

    const interval = setInterval(() => {
      // Trigger action potential
    }, 1000 / frequency)

    return () => clearInterval(interval)
  }, [firing, frequency, inView])

  return (
    <div ref={ref} className={cn('relative w-full h-48', className)}>
      {/* Neuron Body */}
      <motion.div
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-purple-500 rounded-full"
        animate={firing && inView ? { scale: [1, 1.2, 1] } : {}}
        transition={{
          duration: 0.3,
          repeat: firing ? Infinity : 0,
          repeatDelay: 1 / frequency - 0.3,
        }}
      >
        <Brain className="w-full h-full text-white p-2" />
      </motion.div>

      {/* Axon */}
      <div className="absolute left-24 top-1/2 transform -translate-y-1/2 w-64 h-2 bg-purple-300 rounded-full">
        {/* Action Potential Wave */}
        <AnimatePresence>
          {firing && (
            <motion.div
              className="absolute inset-0 bg-yellow-400 rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0, originX: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 / frequency - 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Synapse */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-green-500 rounded-full"
        animate={
          firing && inView
            ? {
                scale: [1, 1.3, 1],
                backgroundColor: ['#10B981', '#F59E0B', '#10B981'],
              }
            : {}
        }
        transition={{
          duration: 0.3,
          repeat: firing ? Infinity : 0,
          repeatDelay: 1 / frequency - 0.3,
          delay: 0.5,
        }}
      >
        <Zap className="w-full h-full text-white p-2" />
      </motion.div>

      {/* Neurotransmitters */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full"
            style={{
              left: `${i * 4}px`,
              top: `${(i % 2) * 8 - 4}px`,
            }}
            animate={
              firing && inView
                ? {
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              repeat: firing ? Infinity : 0,
              repeatDelay: 1 / frequency - 0.6,
              delay: 0.5 + i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2 items-center">
        <motion.button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          onClick={() => setFiring(!firing)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {firing ? 'Stop' : 'Fire'} Neuron
        </motion.button>

        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm">Frequency: {frequency} Hz</span>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>
    </div>
  )
}

// Biology Concept Explorer with 3D-like visualization
export const BiologyConceptExplorer: React.FC<{ className?: string }> = ({ className }) => {
  const concepts = [
    {
      id: 'dna',
      name: 'DNA Structure',
      icon: Dna,
      color: 'bg-blue-500',
      description: 'Explore the double helix structure and base pairing',
    },
    {
      id: 'cell',
      name: 'Cell Division',
      icon: Microscope,
      color: 'bg-green-500',
      description: 'Understand mitosis and meiosis processes',
    },
    {
      id: 'heart',
      name: 'Cardiovascular',
      icon: Heart,
      color: 'bg-red-500',
      description: 'Learn about heart function and circulation',
    },
    {
      id: 'photosynthesis',
      name: 'Photosynthesis',
      icon: Leaf,
      color: 'bg-emerald-500',
      description: 'Discover how plants convert light to energy',
    },
    {
      id: 'neuron',
      name: 'Neural Activity',
      icon: Brain,
      color: 'bg-purple-500',
      description: 'Examine neuron firing and signal transmission',
    },
  ]

  const [selectedConcept, setSelectedConcept] = useState(concepts[0])

  return (
    <div className={cn('w-full', className)}>
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {concepts.map((concept) => (
          <motion.button
            key={concept.id}
            className={cn(
              'p-4 rounded-2xl text-white text-center transition-all duration-300',
              concept.color,
              selectedConcept.id === concept.id
                ? 'ring-4 ring-blue-300 scale-105'
                : 'hover:scale-102'
            )}
            onClick={() => setSelectedConcept(concept)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <concept.icon className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold text-sm">{concept.name}</div>
          </motion.button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 min-h-96">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedConcept.name}</h3>
          <p className="text-gray-600">{selectedConcept.description}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedConcept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedConcept.id === 'dna' && <DNAHelixAnimation />}
            {selectedConcept.id === 'cell' && <CellDivisionAnimation />}
            {selectedConcept.id === 'heart' && <HeartBeatAnimation />}
            {selectedConcept.id === 'photosynthesis' && <PhotosynthesisAnimation />}
            {selectedConcept.id === 'neuron' && <NeuronFiringAnimation />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
