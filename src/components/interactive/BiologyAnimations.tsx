'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import {
  Dna,
  Heart,
  Microscope,
  Zap,
  Brain,
  Leaf,
  Droplets,
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
      <div
        className="absolute inset-0 animate-fadeInUp"
      >
        {/* DNA Strands */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-8 flex justify-between items-center animate-fadeInUp"
            style={{ top: `${i * 8}%` }}
          >
            {/* Base Pairs */}
            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg" />
            <div
              className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-red-500 mx-2 animate-fadeInUp"
            />
            <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
          </div>
        ))}
      </div>

      <button
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors animate-fadeInUp"
        onClick={() => setIsAnimating(!isAnimating)}
      >
        {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {isAnimating ? 'Pause' : 'Play'} Animation
      </button>
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
          <div
            className="w-32 h-32 border-4 border-blue-500 rounded-full relative animate-fadeInUp"
          >
            <div
              className="w-8 h-8 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fadeInUp"
            />
          </div>
        )
      case 'telophase':
        return (
          <div className="flex gap-4">
            <div
              className="w-24 h-24 border-4 border-blue-500 rounded-full relative animate-fadeInUp"
            >
              <div className="w-6 h-6 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div
              className="w-24 h-24 border-4 border-blue-500 rounded-full relative animate-fadeInUp"
            >
              <div className="w-6 h-6 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        )
      default:
        return (
          <div
            className="w-32 h-32 border-4 border-blue-500 rounded-full relative animate-fadeInUp"
          >
            <div
              className="w-8 h-8 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fadeInUp"
            />
          </div>
        )
    }
  }

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="mb-8 h-40 flex items-center justify-center">
<div
            key={phase}
           className="animate-fadeInUp">
            {renderCell()}
          </div>
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
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors animate-fadeInUp"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors animate-fadeInUp"
          onClick={() => {
            setPhase('interphase')
            setIsPlaying(false)
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
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
      <div
        className="relative w-48 h-48 mx-auto mb-8 animate-fadeInUp"
      >
        <Heart className="w-full h-full text-red-500 fill-current drop-shadow-lg" />

        {/* Pulse Wave */}
        <div
          className="absolute inset-0 border-2 border-red-300 rounded-full animate-fadeInUp"
        />
      </div>

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
      <div
        className="absolute top-4 right-4 w-16 h-16 animate-fadeInUp"
      >
        <div className="w-full h-full bg-yellow-400 rounded-full relative">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-6 bg-yellow-400 origin-bottom animate-fadeInUp"
              style={{
                left: '50%',
                bottom: '50%',
                transform: `translateX(-50%) rotate(${i * 45}deg)`,
                transformOrigin: '0 100%',
              }}
            />
          ))}
        </div>
      </div>

      {/* Light Rays */}
      <div
        className="absolute top-20 right-20 w-40 h-1 animate-fadeInUp"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-0.5 bg-yellow-300 animate-fadeInUp"
            style={{ top: `${i * 4}px` }}
          />
        ))}
      </div>

      {/* Leaf */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fadeInUp"
      >
        <Leaf className="w-32 h-32 text-green-600 fill-current" />

        {/* CO2 molecules */}
        <div
          className="absolute -left-8 top-8 w-4 h-4 bg-gray-400 rounded-full animate-fadeInUp"
        />

        {/* O2 molecules */}
        <div
          className="absolute -right-8 top-8 w-4 h-4 bg-blue-400 rounded-full animate-fadeInUp"
        />
      </div>

      {/* Water molecules */}
      <div
        className="absolute bottom-4 left-1/4 animate-fadeInUp"
      >
        <Droplets className="w-6 h-6 text-blue-500" />
      </div>

      {/* Control Button */}
      <button
        className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors animate-fadeInUp"
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {isActive ? 'Pause' : 'Start'} Process
      </button>

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
      <div
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-purple-500 rounded-full animate-fadeInUp"
      >
        <Brain className="w-full h-full text-white p-2" />
      </div>

      {/* Axon */}
      <div className="absolute left-24 top-1/2 transform -translate-y-1/2 w-64 h-2 bg-purple-300 rounded-full">
        {/* Action Potential Wave */}
{firing && (
            <div
              className="absolute inset-0 bg-yellow-400 rounded-full animate-fadeInUp"
            />
          )}
</div>

      {/* Synapse */}
      <div
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-green-600 rounded-full animate-fadeInUp"
      >
        <Zap className="w-full h-full text-white p-2" />
      </div>

      {/* Neurotransmitters */}
      <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-fadeInUp"
            style={{
              left: `${i * 4}px`,
              top: `${(i % 2) * 8 - 4}px`,
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2 items-center">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors animate-fadeInUp"
          onClick={() => setFiring(!firing)}
        >
          {firing ? 'Stop' : 'Fire'} Neuron
        </button>

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
      color: 'bg-green-600',
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
      color: 'bg-green-600',
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
          <button
            key={concept.id}
            className={cn(
              'p-4 rounded-2xl text-white text-center transition-all duration-300',
              concept.color,
              selectedConcept.id === concept.id
                ? 'ring-4 ring-blue-300 scale-105'
                : 'hover:scale-102'
            )}
            onClick={() => setSelectedConcept(concept)}
          >
            <concept.icon className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold text-sm">{concept.name}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 min-h-96">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedConcept.name}</h3>
          <p className="text-gray-600">{selectedConcept.description}</p>
        </div>
<div
            key={selectedConcept.id}
           className="animate-fadeInUp">
            {selectedConcept.id === 'dna' && <DNAHelixAnimation />}
            {selectedConcept.id === 'cell' && <CellDivisionAnimation />}
            {selectedConcept.id === 'heart' && <HeartBeatAnimation />}
            {selectedConcept.id === 'photosynthesis' && <PhotosynthesisAnimation />}
            {selectedConcept.id === 'neuron' && <NeuronFiringAnimation />}
          </div>
</div>
    </div>
  )
}
