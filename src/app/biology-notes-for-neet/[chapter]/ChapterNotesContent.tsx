"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  ChevronDown,
  Lightbulb,
  Zap,
  Brain,
  Target,
  Home,
} from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants/contactInfo"

interface Chapter {
  name: string
  slug: string
  class: 11 | 12
  unit: string
  weightage: number
  difficulty: "Easy" | "Moderate" | "Hard"
  description: string
}

interface ChapterNotesContentProps {
  chapter: Chapter
  slug: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function ChapterNotesContent({
  chapter,
  slug,
}: ChapterNotesContentProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50 border-green-200"
      case "Moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Hard":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const molecularBasisContent = {
    topics: [
      {
        title: "DNA as Genetic Material",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Key Experiments</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Griffith&apos;s Experiment (1928)</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Used <strong>Streptococcus pneumoniae</strong> bacteria. Identified the "transforming principle" that could transfer genetic information from dead smooth strain (S) to live rough strain (R), making R pathogenic.
                </p>
                <p className="text-xs text-gray-600 mt-1 italic">
                  PYQ Pattern: Mechanism of transformation, role of S strain
                </p>
              </div>
              <div>
                <h5 className="font-bold text-blue-900">Avery, MacLeod & McCarty (1944)</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Proved that <strong>DNA</strong> (not protein) is the transforming principle by using enzymes that digested different molecules and testing transformation.
                </p>
                <p className="text-xs text-gray-600 mt-1 italic">
                  Key takeaway: DNA identified as genetic material
                </p>
              </div>
              <div>
                <h5 className="font-bold text-blue-900">Hershey-Chase Experiment (1952)</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Used <strong>T2 bacteriophages</strong> with radioactive labeling (³²P for DNA, ³⁵S for protein). Proved that DNA, not protein, enters the bacterial cell during infection and directs viral replication.
                </p>
                <p className="text-xs text-gray-600 mt-1 italic">
                  Mnemonic: PROtein had S, DNA had P
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "DNA Structure",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Watson-Crick Model (1953)</h4>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded">
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Structure:</strong> Double helix consisting of two antiparallel polynucleotide chains
                </p>
                <p>
                  <strong>Components:</strong> Deoxyribose sugar, phosphate groups, and nitrogenous bases (A, G, C, T)
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <h5 className="font-bold text-blue-900 mb-2">B-DNA Dimensions:</h5>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• <strong>Pitch (Turn):</strong> 3.4 nm (10 bp per turn)</li>
                    <li>• <strong>Diameter:</strong> 2 nm</li>
                    <li>• <strong>Distance between bp:</strong> 0.34 nm</li>
                  </ul>
                </div>
                <p>
                  <strong>Base Pairing:</strong> A-T (2 H-bonds), G-C (3 H-bonds) - Chargaff&apos;s rules
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">DNA vs RNA</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border border-blue-400 p-2 text-left">Feature</th>
                    <th className="border border-blue-400 p-2 text-left">DNA</th>
                    <th className="border border-blue-400 p-2 text-left">RNA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 p-2 font-semibold">Sugar</td>
                    <td className="border border-blue-200 p-2">Deoxyribose</td>
                    <td className="border border-blue-200 p-2">Ribose</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 p-2 font-semibold">Bases</td>
                    <td className="border border-blue-200 p-2">A, G, C, T</td>
                    <td className="border border-blue-200 p-2">A, G, C, U</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 p-2 font-semibold">Structure</td>
                    <td className="border border-blue-200 p-2">Double helix</td>
                    <td className="border border-blue-200 p-2">Single stranded</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 p-2 font-semibold">Stability</td>
                    <td className="border border-blue-200 p-2">Stable</td>
                    <td className="border border-blue-200 p-2">Less stable</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 p-2 font-semibold">Location</td>
                    <td className="border border-blue-200 p-2">Nucleus, mitochondria, chloroplast</td>
                    <td className="border border-blue-200 p-2">Nucleus, cytoplasm, ribosomes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        title: "DNA Packaging (Nucleosome to Chromosome)",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              DNA in eukaryotes is packaged with histone proteins into progressively higher order structures.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded p-4">
              <h4 className="font-bold text-purple-900 mb-3">Levels of DNA Organization:</h4>
              <ol className="space-y-2 text-sm">
                <li>
                  <strong className="text-purple-700">1. Nucleosome:</strong> DNA wrapped around histone octamer (~200 bp of DNA, 2 turns)
                </li>
                <li>
                  <strong className="text-purple-700">2. Chromatin Fiber (30 nm):</strong> Beads-on-a-string structure with histone H1
                </li>
                <li>
                  <strong className="text-purple-700">3. Higher-order Loops:</strong> 300 nm fiber formed by looping of chromatin fiber
                </li>
                <li>
                  <strong className="text-purple-700">4. Metaphase Chromosome:</strong> Condensed chromatin (~1400 nm) visible under light microscope
                </li>
              </ol>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded text-sm">
              <p className="font-semibold text-indigo-900 mb-2">Mnemonic for Histone Octamer:</p>
              <p className="text-gray-700">
                <strong>"Two H4, Two H3, Two H2A, Two H2B"</strong> - forms the core of nucleosome
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "DNA Replication",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Semi-conservative Replication</h4>
            <p className="text-sm text-gray-700">
              Each daughter DNA molecule contains one original strand and one newly synthesized strand.
            </p>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h5 className="font-bold text-green-900 mb-3">Meselson-Stahl Experiment (1958)</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • Used <strong>¹⁵N</strong> (heavy) and <strong>¹⁴N</strong> (light) nitrogen isotopes to label DNA
                </li>
                <li>
                  • After 1st replication: Hybrid DNA (¹⁵N-¹⁴N) - hybrid density
                </li>
                <li>
                  • After 2nd replication: 50% hybrid DNA + 50% light DNA (¹⁴N-¹⁴N)
                </li>
                <li>
                  • Proved semi-conservative mechanism over conservative and dispersive models
                </li>
              </ul>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Enzymes and Proteins Involved</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-2 rounded border border-gray-200">
                <strong className="text-gray-900">DNA Helicase:</strong> Unwinds double helix, breaks hydrogen bonds
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200">
                <strong className="text-gray-900">Primase:</strong> Synthesizes RNA primers to initiate DNA synthesis
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200">
                <strong className="text-gray-900">DNA Polymerase III:</strong> Main enzyme for DNA synthesis (3&apos; to 5&apos;), has 3D exonuclease activity (proofreading)
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200">
                <strong className="text-gray-900">DNA Polymerase I:</strong> Removes RNA primers and fills gaps
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-200">
                <strong className="text-gray-900">DNA Ligase:</strong> Forms phosphodiester bonds between Okazaki fragments
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Leading vs Lagging Strand</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-orange-50 border border-orange-200 p-3 rounded">
                <h5 className="font-bold text-orange-900 mb-2">Leading Strand (3&apos;→5&apos;)</h5>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Continuous synthesis</li>
                  <li>• One primer at origin</li>
                  <li>• 5&apos; to 3&apos; direction</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 p-3 rounded">
                <h5 className="font-bold text-red-900 mb-2">Lagging Strand (5&apos;→3&apos;)</h5>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Discontinuous (Okazaki fragments)</li>
                  <li>• Multiple primers</li>
                  <li>• 1000-2000 bp fragments in prokaryotes</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Central Dogma of Molecular Biology",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Information flows from DNA → RNA → Protein (proposed by Francis Crick)
            </p>

            <div className="bg-gradient-to-r from-indigo-100 to-blue-100 border-2 border-indigo-400 rounded p-4">
              <div className="text-center space-y-2">
                <div className="bg-indigo-600 text-white px-4 py-2 rounded inline-block font-bold">
                  DNA
                </div>
                <div className="text-indigo-700 font-bold">↓ Transcription</div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded inline-block font-bold">
                  RNA (mRNA)
                </div>
                <div className="text-blue-700 font-bold">↓ Translation</div>
                <div className="bg-purple-600 text-white px-4 py-2 rounded inline-block font-bold">
                  PROTEIN
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <p className="font-semibold text-yellow-900 mb-1">
                Reverse Transcription (RNA → DNA):
              </p>
              <p className="text-gray-700">
                Found in retroviruses using reverse transcriptase enzyme
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Transcription",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Process of synthesizing RNA from DNA template. Occurs in nucleus (eukaryotes) and cytoplasm (prokaryotes).
            </p>

            <h4 className="font-semibold text-lg text-blue-900">Key Differences: Prokaryotes vs Eukaryotes</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border border-blue-400 p-2 text-left">Feature</th>
                    <th className="border border-blue-400 p-2 text-left">Prokaryotes</th>
                    <th className="border border-blue-400 p-2 text-left">Eukaryotes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 p-2 font-semibold">RNA Polymerase</td>
                    <td className="border border-blue-200 p-2">Single type (RNAP)</td>
                    <td className="border border-blue-200 p-2">Three types (I, II, III)</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 p-2 font-semibold">Promoter Recognition</td>
                    <td className="border border-blue-200 p-2">Sigma factor</td>
                    <td className="border border-blue-200 p-2">Transcription factors (TFIID)</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 p-2 font-semibold">RNA Processing</td>
                    <td className="border border-blue-200 p-2">No processing</td>
                    <td className="border border-blue-200 p-2">5&apos; cap, 3&apos; poly-A tail, splicing</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 p-2 font-semibold">Introns</td>
                    <td className="border border-blue-200 p-2">Absent</td>
                    <td className="border border-blue-200 p-2">Present</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Steps of Transcription</h4>
            <div className="space-y-2">
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-3 rounded">
                <h5 className="font-bold text-cyan-900">1. Initiation</h5>
                <p className="text-sm text-gray-700 mt-1">
                  RNA Polymerase II recognizes promoter (TATA box at -25), binds with transcription factors, DNA unwinds
                </p>
              </div>
              <div className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded">
                <h5 className="font-bold text-teal-900">2. Elongation</h5>
                <p className="text-sm text-gray-700 mt-1">
                  RNA polymerase moves along template strand (3&apos; to 5&apos;), adds complementary RNA nucleotides (5&apos; to 3&apos;)
                </p>
              </div>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded">
                <h5 className="font-bold text-emerald-900">3. Termination</h5>
                <p className="text-sm text-gray-700 mt-1">
                  RNA polymerase reaches termination signal (AATAAA in eukaryotes), transcript is released
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">RNA Processing (Eukaryotes)</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-pink-50 p-2 rounded border border-pink-200">
                <strong className="text-pink-900">5&apos; Capping:</strong> Addition of 7-methylguanosine cap (m7G) - protection, translation initiation
              </div>
              <div className="bg-pink-50 p-2 rounded border border-pink-200">
                <strong className="text-pink-900">3&apos; Polyadenylation:</strong> Addition of ~200 adenine nucleotides (poly-A tail) - stability, translation, export
              </div>
              <div className="bg-pink-50 p-2 rounded border border-pink-200">
                <strong className="text-pink-900">Splicing:</strong> Removal of introns and joining of exons by snRNPs in spliceosome
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Translation",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Process of synthesizing protein from mRNA template. Occurs on ribosomes (80S in eukaryotes, 70S in prokaryotes).
            </p>

            <h4 className="font-semibold text-lg text-blue-900">Genetic Code Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-purple-50 border border-purple-200 p-3 rounded text-sm">
                <p className="font-bold text-purple-900 mb-2">Triplet Code:</p>
                <p className="text-gray-700">3 nucleotides (codon) specify 1 amino acid</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-3 rounded text-sm">
                <p className="font-bold text-purple-900 mb-2">Degenerate/Redundant:</p>
                <p className="text-gray-700">64 codons for 20 amino acids (multiple codons per amino acid)</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-3 rounded text-sm">
                <p className="font-bold text-purple-900 mb-2">Universal:</p>
                <p className="text-gray-700">Same across most organisms (with rare exceptions in mitochondria)</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-3 rounded text-sm">
                <p className="font-bold text-purple-900 mb-2">Non-overlapping:</p>
                <p className="text-gray-700">Read continuously without overlap</p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Start and Stop Codons</h4>
            <div className="bg-green-50 border border-green-200 p-3 rounded">
              <p className="text-sm">
                <strong className="text-green-900">Start codon:</strong> AUG (codes for Methionine)
              </p>
              <p className="text-sm mt-1">
                <strong className="text-green-900">Stop codons:</strong> UAA (Ochre), UAG (Amber), UGA (Opal)
              </p>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">tRNA Structure and Function</h4>
            <div className="bg-orange-50 border border-orange-200 rounded p-4 space-y-3">
              <p className="text-sm text-gray-700">
                Clover-leaf secondary structure, L-shaped tertiary structure. Contains anticodon and amino acid attachment site.
              </p>
              <div className="bg-white p-2 rounded border border-orange-200 text-xs">
                <p className="font-semibold text-orange-900 mb-1">Wobble Base Pairing:</p>
                <p className="text-gray-700">
                  3rd position of codon pairs with 1st position of anticodon loosely (Crick&apos;s Wobble Hypothesis) - explains degeneracy of genetic code
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Ribosome Structure</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-indigo-50 p-2 rounded border border-indigo-200">
                <strong className="text-indigo-900">Eukaryotic Ribosome (80S):</strong> 60S (large) + 40S (small) subunits
              </div>
              <div className="bg-indigo-50 p-2 rounded border border-indigo-200">
                <strong className="text-indigo-900">Prokaryotic Ribosome (70S):</strong> 50S (large) + 30S (small) subunits
              </div>
              <div className="bg-indigo-50 p-2 rounded border border-indigo-200">
                <strong className="text-indigo-900">Sites on Ribosome:</strong> A (Aminoacyl), P (Peptidyl), E (Exit)
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Steps of Translation</h4>
            <div className="space-y-2">
              <div className="bg-sky-50 border-l-4 border-sky-500 p-3 rounded">
                <h5 className="font-bold text-sky-900">1. Initiation</h5>
                <p className="text-sm text-gray-700 mt-1">
                  mRNA binds 40S ribosomal subunit, initiator tRNA (fMet-tRNA) binds AUG, 60S subunit joins. Initiation complex forms with help of initiation factors.
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <h5 className="font-bold text-blue-900">2. Elongation</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Aminoacyl-tRNA enters A site, peptide bond forms between P and A site tRNAs, ribosome translocates. Repeats until stop codon.
                </p>
              </div>
              <div className="bg-slate-50 border-l-4 border-slate-500 p-3 rounded">
                <h5 className="font-bold text-slate-900">3. Termination</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Stop codon recognized by release factors, polypeptide chain released, ribosomal subunits dissociate from mRNA.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Gene Regulation - Lac Operon Model",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Classical example of prokaryotic gene regulation in E. coli. Demonstrates inducible enzyme system.
            </p>

            <div className="bg-rose-50 border border-rose-200 rounded p-4">
              <h4 className="font-bold text-rose-900 mb-3">Lac Operon Components</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong className="text-rose-700">Structural Genes:</strong> lacZ (β-galactosidase), lacY (permease), lacA (transacetylase)
                </li>
                <li>
                  <strong className="text-rose-700">Regulatory Gene:</strong> lacI (repressor protein)
                </li>
                <li>
                  <strong className="text-rose-700">Control Sites:</strong> Promoter, Operator
                </li>
              </ul>
            </div>

            <h4 className="font-semibold text-lg text-blue-900">Regulation Mechanism</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-red-50 border border-red-200 p-3 rounded">
                <h5 className="font-bold text-red-900 mb-2">Without Lactose (OFF)</h5>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Repressor binds operator</li>
                  <li>• Blocks RNA polymerase</li>
                  <li>• No transcription</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <h5 className="font-bold text-green-900 mb-2">With Lactose (ON)</h5>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Lactose (allolactose) acts as inducer</li>
                  <li>• Repressor inactivated</li>
                  <li>• Transcription occurs</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded text-sm">
              <p className="font-semibold text-amber-900 mb-1">CAP-cAMP (Positive Regulation):</p>
              <p className="text-gray-700">
                In low glucose, cAMP-CAP complex helps RNA polymerase bind promoter efficiently, enhancing transcription
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Human Genome Project",
        pyqFrequency: "Moderate",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="font-bold text-green-900 mb-3">Key Facts</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong className="text-green-700">Duration:</strong> 1990-2003
                </li>
                <li>
                  <strong className="text-green-700">Human DNA:</strong> ~3 billion base pairs, 46 chromosomes
                </li>
                <li>
                  <strong className="text-green-700">Genes:</strong> ~20,000-25,000 protein-coding genes
                </li>
                <li>
                  <strong className="text-green-700">Techniques:</strong> Restriction mapping, DNA sequencing, chromosome walking
                </li>
              </ul>
            </div>

            <h4 className="font-semibold text-lg text-blue-900">Goals Achieved</h4>
            <div className="bg-blue-50 border border-blue-200 rounded p-4 space-y-2 text-sm">
              <p>
                ✓ Complete map of human genome<br />
                ✓ Identification of genes and their functions<br />
                ✓ Understanding gene mutations and variations<br />
                ✓ Discovery of single nucleotide polymorphisms (SNPs)
              </p>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Applications</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                • Gene therapy for genetic disorders
              </div>
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                • Personalized medicine and pharmacogenomics
              </div>
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                • Understanding disease mechanisms
              </div>
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                • Evolutionary and population studies
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "DNA Fingerprinting",
        pyqFrequency: "Moderate",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Technique for identification using highly variable regions of DNA (Variable Number Tandem Repeats).
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded p-4">
              <h4 className="font-bold text-indigo-900 mb-3">VNTRs (Variable Number Tandem Repeats)</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • Repetitive DNA sequences (10-100 bp repeats) that vary in number between individuals
                </li>
                <li>
                  • Located at multiple loci on different chromosomes
                </li>
                <li>
                  • Highly polymorphic - useful for identification
                </li>
              </ul>
            </div>

            <h4 className="font-semibold text-lg text-blue-900">DNA Fingerprinting Steps</h4>
            <ol className="space-y-2 text-sm">
              <li className="bg-orange-50 border-l-4 border-orange-500 p-2 pl-3">
                <strong className="text-orange-900">1. DNA Extraction:</strong> From blood, saliva, hair, semen
              </li>
              <li className="bg-yellow-50 border-l-4 border-yellow-500 p-2 pl-3">
                <strong className="text-yellow-900">2. Restriction Digestion:</strong> Cut DNA with restriction enzymes at VNTR sites
              </li>
              <li className="bg-lime-50 border-l-4 border-lime-500 p-2 pl-3">
                <strong className="text-lime-900">3. Gel Electrophoresis:</strong> Separate DNA fragments by size
              </li>
              <li className="bg-green-50 border-l-4 border-green-500 p-2 pl-3">
                <strong className="text-green-900">4. Southern Blotting:</strong> Transfer to nitrocellulose/nylon membrane
              </li>
              <li className="bg-blue-50 border-l-4 border-blue-500 p-2 pl-3">
                <strong className="text-blue-900">5. Probe Hybridization:</strong> Radiolabeled/fluorescent VNTR probe binds to complementary sequences
              </li>
              <li className="bg-indigo-50 border-l-4 border-indigo-500 p-2 pl-3">
                <strong className="text-indigo-900">6. Detection:</strong> Autoradiography shows band pattern (DNA fingerprint)
              </li>
            </ol>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Applications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-cyan-50 border border-cyan-200 p-3 rounded text-sm">
                <p className="font-bold text-cyan-900 mb-2">Forensic Science:</p>
                <p className="text-gray-700">Criminal investigations, paternity testing</p>
              </div>
              <div className="bg-teal-50 border border-teal-200 p-3 rounded text-sm">
                <p className="font-bold text-teal-900 mb-2">Medical:</p>
                <p className="text-gray-700">Genetic disorders, disease susceptibility</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-sm">
                <p className="font-bold text-emerald-900 mb-2">Conservation:</p>
                <p className="text-gray-700">Wildlife management, breed purity</p>
              </div>
              <div className="bg-violet-50 border border-violet-200 p-3 rounded text-sm">
                <p className="font-bold text-violet-900 mb-2">Immigration:</p>
                <p className="text-gray-700">Relationship verification, identity confirmation</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  }

  const principlesInheritanceContent = {
    topics: [
      {
        title: "Mendel's Laws of Inheritance",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-400 rounded p-4">
              <p className="text-sm text-gray-700 mb-3">
                Based on Mendel&apos;s experiments with <strong>Pisum sativum</strong> (garden pea plant) across 7 traits
              </p>
            </div>

            <h4 className="font-semibold text-lg text-blue-900">Law of Dominance</h4>
            <div className="bg-orange-50 border border-orange-200 p-4 rounded space-y-2 text-sm">
              <p className="font-bold text-orange-900">When two contrasting alleles present, dominant trait expresses in F1.</p>
              <p className="text-gray-700">
                <strong>Example:</strong> Tall (T) × Short (t) → F1 all Tall (Tt shows dominance of T over t)
              </p>
            </div>

            <h4 className="font-semibold text-lg text-blue-900">Law of Segregation</h4>
            <div className="bg-green-50 border border-green-200 p-4 rounded space-y-2 text-sm">
              <p className="font-bold text-green-900">Allelic pairs segregate during gamete formation; each gamete receives only one allele.</p>
              <p className="text-gray-700">
                <strong>Example:</strong> F1 (Tt) × F1 (Tt) → F2 (1 TT : 2 Tt : 1 tt) = 3 Dominant : 1 Recessive
              </p>
            </div>

            <h4 className="font-semibold text-lg text-blue-900">Law of Independent Assortment</h4>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded space-y-2 text-sm">
              <p className="font-bold text-purple-900">Inheritance of one trait is independent of another trait.</p>
              <p className="text-gray-700">
                <strong>Example:</strong> Dihybrid cross: AaBb × AaBb → 9:3:3:1 ratio in F2
              </p>
              <p className="text-gray-700 mt-2 italic">
                (Valid only for genes on different chromosomes)
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <p className="font-bold text-yellow-900 mb-1">Mnemonic - Mendel&apos;s 7 Traits Studied:</p>
              <p className="text-gray-700">
                Seed color, Seed shape, Flower color, Flower position, Pod color, Pod shape, Plant height
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Incomplete Dominance",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Neither allele is completely dominant; heterozygote shows intermediate phenotype.
            </p>

            <div className="bg-pink-50 border border-pink-200 rounded p-4">
              <h4 className="font-bold text-pink-900 mb-3">Snapdragon Flower Colour</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-pink-800">Red (RR) × White (WW) → Pink (RW)</p>
                  <p className="text-gray-700 text-xs mt-1">F1 shows blending of red and white</p>
                </div>
                <div className="bg-white p-2 rounded border border-pink-200">
                  <p className="font-semibold text-pink-800">F2 from F1 (RW) × F1 (RW):</p>
                  <p className="text-gray-700 text-xs mt-1">1 Red (RR) : 2 Pink (RW) : 1 White (WW)</p>
                  <p className="text-gray-700 text-xs mt-1">Genotypic ratio = Phenotypic ratio (1:2:1)</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-3 rounded text-sm">
              <p className="font-bold text-red-900 mb-1">Other Examples:</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>• Chicken feather color (Black × White → Blue)</li>
                <li>• Cattle coat color (Red × White → Roan)</li>
                <li>• Sickle cell trait (HbA/HbS heterozygotes)</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Co-dominance",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Both alleles express fully in heterozygote; no blending occurs.
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded p-4">
              <h4 className="font-bold text-indigo-900 mb-3">ABO Blood Groups</h4>
              <div className="overflow-x-auto text-sm">
                <table className="w-full border-collapse">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="border border-indigo-400 p-2 text-left">Genotype</th>
                      <th className="border border-indigo-400 p-2 text-left">Blood Group</th>
                      <th className="border border-indigo-400 p-2 text-left">RBC Antigens</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-indigo-50">
                      <td className="border border-indigo-200 p-2">I^A I^A or I^A i</td>
                      <td className="border border-indigo-200 p-2 font-semibold">A</td>
                      <td className="border border-indigo-200 p-2">A antigen</td>
                    </tr>
                    <tr>
                      <td className="border border-indigo-200 p-2">I^B I^B or I^B i</td>
                      <td className="border border-indigo-200 p-2 font-semibold">B</td>
                      <td className="border border-indigo-200 p-2">B antigen</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border border-indigo-200 p-2">I^A I^B</td>
                      <td className="border border-indigo-200 p-2 font-semibold">AB</td>
                      <td className="border border-indigo-200 p-2">A and B antigens (Co-dominant)</td>
                    </tr>
                    <tr>
                      <td className="border border-indigo-200 p-2">ii</td>
                      <td className="border border-indigo-200 p-2 font-semibold">O</td>
                      <td className="border border-indigo-200 p-2">No antigens</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">
                Note: I^A and I^B are co-dominant (both express equally in I^A I^B)
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm">
              <p className="font-bold text-blue-900 mb-1">Other Examples:</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>• Human MN blood groups</li>
                <li>• Rh factor (presence of D antigen)</li>
                <li>• Leopard spots (homozygous vs heterozygous patterns)</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Multiple Alleles and Pleiotropy",
        pyqFrequency: "Moderate",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Multiple Alleles</h4>
            <div className="bg-cyan-50 border border-cyan-200 rounded p-4 space-y-3 text-sm">
              <p>
                More than two alleles of a gene exist in a population. Individual has maximum 2 (diploid).
              </p>
              <p className="font-bold text-cyan-900">Example - Human ABO System:</p>
              <p className="text-gray-700">
                Three alleles: I^A, I^B, i - but individual only has 2 of these alleles
              </p>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Pleiotropy</h4>
            <div className="bg-lime-50 border border-lime-200 rounded p-4 space-y-3 text-sm">
              <p>
                One gene affects multiple, often unrelated, characters (pleiotrophic effects).
              </p>
              <p className="font-bold text-lime-900">Example - Phenylketonuria (PKU):</p>
              <p className="text-gray-700">
                Single gene mutation → affects amino acid metabolism → causes intellectual disability, light skin color, musty odor
              </p>
              <p className="font-bold text-lime-900 mt-2">Example - White eye in Drosophila:</p>
              <p className="text-gray-700">
                White eyes, reduced sperm count, shortened lifespan
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Linkage and Recombination",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Deviation from Mendel&apos;s Law of Independent Assortment when genes are located on same chromosome.
            </p>

            <h4 className="font-semibold text-lg text-blue-900">Genetic Linkage</h4>
            <div className="bg-purple-50 border border-purple-200 rounded p-4 space-y-3">
              <p className="text-sm text-gray-700">
                Genes on same chromosome tend to be inherited together. Distance between genes determines likelihood of separation.
              </p>
              <div className="bg-white p-3 rounded border border-purple-200 text-sm">
                <p className="font-bold text-purple-900 mb-2">Measurement Unit:</p>
                <p className="text-gray-700">
                  <strong>Map Unit (centimorgan):</strong> 1% recombination frequency = 1 map unit = 1 cM
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Morgan's Experiments (Drosophila)</h4>
            <div className="bg-orange-50 border border-orange-200 rounded p-4 space-y-3 text-sm">
              <p>
                <strong>Organism:</strong> Fruit fly (Drosophila melanogaster) - small size, short life cycle, easily observed mutations
              </p>
              <p>
                <strong>Cross:</strong> White-eyed (white eye, X^w) × Red-eyed (wild-type, X^+)
              </p>
              <div className="bg-white p-2 rounded border border-orange-200 text-xs space-y-1">
                <p>• All F1 females: red-eyed</p>
                <p>• All F1 males: white-eyed</p>
                <p>• F2 showed unexpected ratios → Genes linked on X chromosome</p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Crossing Over and Recombination</h4>
            <div className="bg-emerald-50 border border-emerald-200 rounded p-4 space-y-3 text-sm">
              <p>
                Exchange of genetic material between homologous chromosomes during prophase I of meiosis.
              </p>
              <p className="font-bold text-emerald-900">Recombinant Gametes:</p>
              <p className="text-gray-700">
                New combinations of alleles produced. Frequency depends on distance between genes.
              </p>
              <p className="font-bold text-emerald-900 mt-2">Three-point Testcross:</p>
              <p className="text-gray-700">
                Uses three linked genes to determine gene order and distances; identifies coefficient of coincidence (COC)
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Sex Determination Systems",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Different organisms use different chromosomal mechanisms to determine sex.
            </p>

            <div className="overflow-x-auto text-sm">
              <table className="w-full border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border border-blue-400 p-2 text-left">System</th>
                    <th className="border border-blue-400 p-2 text-left">Examples</th>
                    <th className="border border-blue-400 p-2 text-left">Male</th>
                    <th className="border border-blue-400 p-2 text-left">Female</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 p-2 font-semibold">XX-XY</td>
                    <td className="border border-blue-200 p-2">Humans, Drosophila, Mammals</td>
                    <td className="border border-blue-200 p-2">XY</td>
                    <td className="border border-blue-200 p-2">XX</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 p-2 font-semibold">ZW-ZZ</td>
                    <td className="border border-blue-200 p-2">Birds, Butterflies, Snakes</td>
                    <td className="border border-blue-200 p-2">ZZ</td>
                    <td className="border border-blue-200 p-2">ZW</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 p-2 font-semibold">Haplo-diploid</td>
                    <td className="border border-blue-200 p-2">Honeybees, Wasps, Ants</td>
                    <td className="border border-blue-200 p-2">Haploid (n)</td>
                    <td className="border border-blue-200 p-2">Diploid (2n)</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 p-2 font-semibold">Environmental</td>
                    <td className="border border-blue-200 p-2">Crocodiles, Some Turtles</td>
                    <td className="border border-blue-200 p-2">Temperature-dependent</td>
                    <td className="border border-blue-200 p-2">Temperature-dependent</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded text-sm mt-4">
              <p className="font-bold text-indigo-900 mb-2">Human Sex Determination (XX-XY System):</p>
              <p className="text-gray-700">
                Y chromosome carries testis-determining factor (TDF/SRY gene) → male development. Without Y chromosome → female development (default pathway)
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Sex-linked Inheritance",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Genes located on sex chromosomes (X or Y) show inheritance patterns different from autosomal genes.
            </p>

            <h4 className="font-semibold text-lg text-blue-900">Colour Blindness (Red-Green)</h4>
            <div className="bg-red-50 border border-red-200 rounded p-4 space-y-3">
              <p className="text-sm text-gray-700">
                <strong>Genotype:</strong> X^B X^B or X^B X^b (female normal), X^b X^b (female colour blind), X^B Y (male normal), X^b Y (male colour blind)
              </p>
              <p className="text-sm text-gray-700">
                <strong>Type:</strong> Recessive, X-linked
              </p>
              <p className="text-sm text-gray-700">
                <strong>Key Point:</strong> More common in males (hemizygous) than females (must be homozygous)
              </p>
              <div className="bg-white p-2 rounded border border-red-200 text-sm">
                <p className="font-bold text-red-900 mb-1">Cross Example: Normal female (X^B X^b) × Colour blind male (X^b Y)</p>
                <p className="text-gray-700 text-xs mt-1">Offspring: 25% X^B X^b (carrier female), 25% X^b X^b (colour blind female), 25% X^B Y (normal male), 25% X^b Y (colour blind male)</p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Haemophilia</h4>
            <div className="bg-orange-50 border border-orange-200 rounded p-4 space-y-3">
              <p className="text-sm text-gray-700">
                <strong>Nature:</strong> Deficiency of clotting factors (VIII or IX), recessive X-linked disorder
              </p>
              <p className="text-sm text-gray-700">
                <strong>Genotypes:</strong> X^H X^H, X^H X^h (female normal/carrier), X^h X^h (female affected), X^H Y (male normal), X^h Y (male affected)
              </p>
              <p className="text-sm text-gray-700">
                <strong>Historical Note:</strong> Queen Victoria was carrier; spread through European royal families
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm mt-4">
              <p className="font-bold text-yellow-900 mb-1">Criss-cross Inheritance Pattern:</p>
              <p className="text-gray-700">
                X-linked recessive traits skip generations, showing pattern: affected male → carrier female → affected male in next generation
              </p>
            </div>
          </div>
        ),
      },
      {
        title: "Pedigree Analysis",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Tracing inheritance patterns of traits/disorders through family generations.
            </p>

            <h4 className="font-semibold text-lg text-blue-900">Key Symbols</h4>
            <div className="bg-pink-50 border border-pink-200 rounded p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                <span>= Normal male</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                <span>= Normal female</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-600 border-2 border-gray-400 rounded"></div>
                <span>= Affected male</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-600 border-2 border-gray-400 rounded-full"></div>
                <span>= Affected female</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-400 rounded" style={{ backgroundImage: "linear-gradient(45deg, transparent 40%, gray 40%, gray 60%, transparent 60%)" }}></div>
                <span>= Carrier (heterozygous)</span>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Analysis Patterns</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <p className="font-bold text-green-900">Autosomal Dominant:</p>
                <p className="text-gray-700">Affected individuals in every generation, both males and females equally, appears in both parents of affected person</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                <p className="font-bold text-blue-900">Autosomal Recessive:</p>
                <p className="text-gray-700">Skips generations, both males and females equally affected, parents usually carriers (unaffected)</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 p-3 rounded">
                <p className="font-bold text-purple-900">X-linked Recessive:</p>
                <p className="text-gray-700">More males affected, criss-cross pattern, carrier mothers have affected sons, affected fathers have carrier daughters</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Chromosomal Disorders",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Abnormalities in chromosome number or structure causing genetic disorders.
            </p>

            <h4 className="font-semibold text-lg text-blue-900">Aneuploidy (Abnormal Chromosome Number)</h4>

            <div className="bg-red-50 border border-red-200 rounded p-4 space-y-3">
              <h5 className="font-bold text-red-900">Down Syndrome (Trisomy 21)</h5>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Karyotype:</strong> 2n+1 (47 chromosomes, three copies of chromosome 21)
                </p>
                <p>
                  <strong>Incidence:</strong> ~1 in 700 births (increases with maternal age)
                </p>
                <p>
                  <strong>Symptoms:</strong> Intellectual disability, flat face, short stature, characteristic palm crease, congenital heart defects
                </p>
                <p>
                  <strong>Cause:</strong> Nondisjunction during meiosis (usually maternal meiosis I)
                </p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded p-4 space-y-3">
              <h5 className="font-bold text-orange-900">Turner Syndrome (Monosomy X)</h5>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Karyotype:</strong> 45, XO (only one X chromosome, 45 total chromosomes)
                </p>
                <p>
                  <strong>Sex:</strong> Female
                </p>
                <p>
                  <strong>Symptoms:</strong> Short stature, streak gonads (infertile), webbed neck, cardiovascular abnormalities, intellectual disability mild to moderate
                </p>
                <p>
                  <strong>Incidence:</strong> ~1 in 2500 female births
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 space-y-3">
              <h5 className="font-bold text-yellow-900">Klinefelter Syndrome (Trisomy X)</h5>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Karyotype:</strong> 47, XXY (two X chromosomes and Y chromosome)
                </p>
                <p>
                  <strong>Sex:</strong> Male (Y chromosome determines maleness)
                </p>
                <p>
                  <strong>Symptoms:</strong> Tall stature, small testes, reduced testosterone, infertility (azoospermia), gynecomastia (breast development)
                </p>
                <p>
                  <strong>Incidence:</strong> ~1 in 1000 male births
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Structural Abnormalities</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                <strong className="text-purple-900">Deletion:</strong> Loss of chromosome segment (loss of genes)
              </div>
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                <strong className="text-purple-900">Duplication:</strong> Repetition of chromosome segment (extra gene copies)
              </div>
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                <strong className="text-purple-900">Inversion:</strong> Reversal of chromosome segment (gene order changed)
              </div>
              <div className="bg-purple-50 p-2 rounded border border-purple-200">
                <strong className="text-purple-900">Translocation:</strong> Transfer of segment to non-homologous chromosome
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Mendelian Disorders",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Genetic disorders following Mendelian inheritance patterns due to single gene mutations.
            </p>

            <div className="bg-red-50 border border-red-200 rounded p-4 space-y-3">
              <h5 className="font-bold text-red-900">Sickle Cell Anaemia</h5>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Gene:</strong> β-globin gene on chromosome 11
                </p>
                <p>
                  <strong>Mutation:</strong> Glutamic acid → Valine at position 6 (CTG → CAG)
                </p>
                <p>
                  <strong>Genotype & Phenotype:</strong>
                </p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• HbA HbA = Normal (no anemia)</li>
                  <li>• HbA HbS = Sickle cell trait (carrier, mild symptoms under stress)</li>
                  <li>• HbS HbS = Sickle cell disease (severe symptoms)</li>
                </ul>
                <p className="mt-2">
                  <strong>Result:</strong> Hemoglobin polymerizes under low oxygen → RBCs become sickle-shaped → hemolysis, pain, organ damage
                </p>
                <p className="mt-2">
                  <strong>Geographic Note:</strong> Common in Africa, Mediterranean, Middle East (heterozygote advantage against malaria)
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4 space-y-3">
              <h5 className="font-bold text-blue-900">Phenylketonuria (PKU)</h5>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Gene:</strong> Phenylalanine hydroxylase (PAH) enzyme deficiency
                </p>
                <p>
                  <strong>Type:</strong> Autosomal recessive
                </p>
                <p>
                  <strong>Biochemistry:</strong> Phenylalanine cannot be converted to tyrosine → accumulates in blood and tissues
                </p>
                <p>
                  <strong>Symptoms:</strong> Intellectual disability (if untreated), light skin, blonde hair, characteristic "mousy" odor of sweat/urine
                </p>
                <p>
                  <strong>Treatment:</strong> Phenylalanine-restricted diet from infancy → normal development (newborn screening)
                </p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded p-4 space-y-3">
              <h5 className="font-bold text-purple-900">Thalassaemia</h5>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Type:</strong> Autosomal recessive disorder of hemoglobin synthesis
                </p>
                <p>
                  <strong>Mutation:</strong> Defects in α or β-globin genes (β-thalassemia more common)
                </p>
                <p>
                  <strong>Result:</strong> Reduced or absent hemoglobin production → hemolytic anemia, splenomegaly, facial bone deformities
                </p>
                <p>
                  <strong>Severity:</strong>
                </p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• Thalassemia major: Severe anemia, requires blood transfusions</li>
                  <li>• Thalassemia minor (trait): Heterozygotes, mild symptoms</li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded text-sm mt-4">
              <p className="font-bold text-indigo-900 mb-2">Other Mendelian Disorders:</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>• Cystic fibrosis (autosomal recessive)</li>
                <li>• Haemophilia (X-linked recessive)</li>
                <li>• Duchenne muscular dystrophy (X-linked recessive)</li>
                <li>• Huntington disease (autosomal dominant)</li>
                <li>• Achondroplasia (autosomal dominant)</li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
  }

  const humanPhysiologyContent = {
    topics: [
      {
        title: "Digestion and Absorption",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Alimentary Canal and Digestive Glands</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Human Digestive System</h5>
                <p className="text-sm text-gray-700 mt-1">
                  The alimentary canal is a continuous muscular tube (~9 metres) running from the <strong>mouth to the anus</strong>. It includes the buccal cavity, pharynx, oesophagus, stomach, small intestine (duodenum, jejunum, ileum), large intestine (caecum, colon, rectum), and anal canal.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-blue-900">Digestive Glands</h5>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Salivary glands</strong> (parotid, sublingual, submandibular) secrete saliva with <strong>salivary amylase</strong> (pH 6.8). <strong>Liver</strong> is the largest gland, secretes bile (no enzymes, emulsifies fats). <strong>Pancreas</strong> is a mixed gland secreting pancreatic juice with trypsinogen, chymotrypsinogen, lipase, amylase, and nucleases.
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Digestion in Different Parts</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border border-gray-200 rounded">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-3 py-2 text-left">Region</th>
                    <th className="px-3 py-2 text-left">Enzyme</th>
                    <th className="px-3 py-2 text-left">Substrate</th>
                    <th className="px-3 py-2 text-left">Product</th>
                    <th className="px-3 py-2 text-left">pH</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-3 py-2">Mouth</td><td className="px-3 py-2">Salivary amylase</td><td className="px-3 py-2">Starch</td><td className="px-3 py-2">Maltose</td><td className="px-3 py-2">6.8</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-3 py-2">Stomach</td><td className="px-3 py-2">Pepsin</td><td className="px-3 py-2">Proteins</td><td className="px-3 py-2">Peptones</td><td className="px-3 py-2">1.8</td></tr>
                  <tr className="border-t"><td className="px-3 py-2">Duodenum</td><td className="px-3 py-2">Trypsin</td><td className="px-3 py-2">Proteins</td><td className="px-3 py-2">Peptides</td><td className="px-3 py-2">7.8</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-3 py-2">Duodenum</td><td className="px-3 py-2">Pancreatic lipase</td><td className="px-3 py-2">Fats</td><td className="px-3 py-2">Fatty acids + Glycerol</td><td className="px-3 py-2">7.8</td></tr>
                  <tr className="border-t"><td className="px-3 py-2">Intestine</td><td className="px-3 py-2">Maltase, Lactase, Sucrase</td><td className="px-3 py-2">Disaccharides</td><td className="px-3 py-2">Monosaccharides</td><td className="px-3 py-2">7.8</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border border-green-200 p-3 rounded text-sm mt-4">
              <p className="font-bold text-green-900 mb-2">Absorption of Nutrients</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>&#8226; <strong>Small intestine</strong> is the principal site of absorption (villi and microvilli increase surface area)</li>
                <li>&#8226; Glucose and amino acids: Active transport into blood capillaries</li>
                <li>&#8226; Fatty acids and glycerol: Absorbed into lacteals as chylomicrons</li>
                <li>&#8226; Water absorption: Mainly in large intestine (by osmosis)</li>
              </ul>
            </div>
            <p className="text-xs text-gray-600 italic">
              PYQ Pattern: Enzyme-substrate matching, absorption mechanisms, role of HCl in stomach
            </p>
          </div>
        ),
      },
      {
        title: "Breathing and Exchange of Gases",
        pyqFrequency: "Moderate",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Respiratory System and Mechanism of Breathing</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Human Respiratory System</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Consists of nostrils, nasal passages, pharynx, larynx, trachea, bronchi, bronchioles, and <strong>alveoli</strong> (about 300 million per lung). Lungs are covered by a double-layered <strong>pleural membrane</strong> with pleural fluid between them.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-blue-900">Mechanism of Breathing</h5>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Inspiration</strong>: Diaphragm contracts (flattens) + external intercostal muscles contract → thoracic volume increases → intrapulmonary pressure decreases → air rushes in.
                  <strong> Expiration</strong>: Diaphragm relaxes (dome-shaped) + internal intercostal muscles contract → thoracic volume decreases → air is expelled.
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Lung Volumes and Capacities</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border border-gray-200 rounded">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-3 py-2 text-left">Parameter</th>
                    <th className="px-3 py-2 text-left">Value (approx.)</th>
                    <th className="px-3 py-2 text-left">Definition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-3 py-2 font-bold">Tidal Volume (TV)</td><td className="px-3 py-2">500 mL</td><td className="px-3 py-2">Air inhaled/exhaled in normal breathing</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-3 py-2 font-bold">IRV</td><td className="px-3 py-2">2500-3000 mL</td><td className="px-3 py-2">Extra air inhaled after normal inspiration</td></tr>
                  <tr className="border-t"><td className="px-3 py-2 font-bold">ERV</td><td className="px-3 py-2">1000-1100 mL</td><td className="px-3 py-2">Extra air exhaled after normal expiration</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-3 py-2 font-bold">Residual Volume (RV)</td><td className="px-3 py-2">1100-1200 mL</td><td className="px-3 py-2">Air remaining after forceful expiration</td></tr>
                  <tr className="border-t"><td className="px-3 py-2 font-bold">Vital Capacity (VC)</td><td className="px-3 py-2">3400-4800 mL</td><td className="px-3 py-2">TV + IRV + ERV</td></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Transport of Gases</h4>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <p className="font-bold text-yellow-900 mb-2">Oxygen Transport</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>&#8226; ~97% bound to <strong>haemoglobin</strong> as oxyhaemoglobin (HbO&#8322;)</li>
                <li>&#8226; ~3% dissolved in plasma</li>
                <li>&#8226; Each Hb binds 4 O&#8322; molecules (cooperative binding = sigmoidal curve)</li>
                <li>&#8226; Factors shifting O&#8322; dissociation curve RIGHT: &#8593;pCO&#8322;, &#8593;H&#8314;, &#8593;temp (Bohr effect)</li>
              </ul>
              <p className="font-bold text-yellow-900 mb-2 mt-3">CO&#8322; Transport</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>&#8226; ~70% as bicarbonate ions (HCO&#8323;&#8315;) in plasma</li>
                <li>&#8226; ~23% as carbaminohaemoglobin (HbCO&#8322;)</li>
                <li>&#8226; ~7% dissolved in plasma</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-3 rounded text-sm mt-3">
              <p className="font-bold text-purple-900">Mnemonic: "70-23-7" for CO&#8322; transport</p>
              <p className="text-xs text-gray-700">70% bicarbonate, 23% carbaminohaemoglobin, 7% dissolved</p>
            </div>
            <p className="text-xs text-gray-600 italic">
              PYQ Pattern: Lung volume calculations, O&#8322; dissociation curve, Bohr effect, chloride shift
            </p>
          </div>
        ),
      },
      {
        title: "Body Fluids and Circulation",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Blood Composition and Formed Elements</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Blood Components</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Blood is a connective tissue (~5-5.5 litres in adults). It consists of <strong>plasma</strong> (~55%) and <strong>formed elements</strong> (~45%). Plasma contains water (90-92%), proteins (albumin, globulin, fibrinogen), and minerals.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border border-gray-200 rounded">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-3 py-2 text-left">Cell Type</th>
                    <th className="px-3 py-2 text-left">Count</th>
                    <th className="px-3 py-2 text-left">Function</th>
                    <th className="px-3 py-2 text-left">Key Feature</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-3 py-2 font-bold">RBCs</td><td className="px-3 py-2">5-5.5 million/mm&#179;</td><td className="px-3 py-2">O&#8322; transport</td><td className="px-3 py-2">Enucleated, biconcave, 120-day lifespan</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-3 py-2 font-bold">WBCs</td><td className="px-3 py-2">6000-8000/mm&#179;</td><td className="px-3 py-2">Defence and immunity</td><td className="px-3 py-2">Nucleated, 5 types (N,E,B,L,M)</td></tr>
                  <tr className="border-t"><td className="px-3 py-2 font-bold">Platelets</td><td className="px-3 py-2">1.5-3.5 lakh/mm&#179;</td><td className="px-3 py-2">Blood clotting</td><td className="px-3 py-2">Cell fragments, no nucleus</td></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Human Heart and Cardiac Cycle</h4>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-red-900">Heart Structure</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Four-chambered heart (2 atria + 2 ventricles). <strong>Left ventricle</strong> has the thickest wall (pumps blood to the entire body). Valves prevent backflow: <strong>tricuspid</strong> (right AV), <strong>bicuspid/mitral</strong> (left AV), and two semilunar valves (pulmonary and aortic).
                </p>
              </div>
              <div>
                <h5 className="font-bold text-red-900">Cardiac Cycle (~0.8 seconds)</h5>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Atrial systole</strong> (0.1s) → <strong>Ventricular systole</strong> (0.3s) → <strong>Joint diastole</strong> (0.4s). Cardiac output = Stroke volume x Heart rate = ~70 mL x 72 = ~5040 mL/min (~5 litres/min).
                </p>
              </div>
              <div>
                <h5 className="font-bold text-red-900">Conduction System (SA Node → AV Node → Bundle of His → Purkinje Fibres)</h5>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>SA node</strong> (pacemaker) generates ~72 impulses/min. Located in the right atrial wall. The heart is <strong>myogenic</strong> (impulse originates from muscle itself, not nerve).
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Blood Groups and Coagulation</h4>
            <div className="bg-green-50 border border-green-200 p-3 rounded text-sm">
              <p className="font-bold text-green-900 mb-2">ABO Blood Grouping</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border border-gray-200 rounded mt-1">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-2 py-1 text-left">Group</th>
                      <th className="px-2 py-1 text-left">Antigen</th>
                      <th className="px-2 py-1 text-left">Antibody</th>
                      <th className="px-2 py-1 text-left">Can Donate To</th>
                      <th className="px-2 py-1 text-left">Can Receive From</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-2 py-1 font-bold">A</td><td className="px-2 py-1">A</td><td className="px-2 py-1">Anti-B</td><td className="px-2 py-1">A, AB</td><td className="px-2 py-1">A, O</td></tr>
                    <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">B</td><td className="px-2 py-1">B</td><td className="px-2 py-1">Anti-A</td><td className="px-2 py-1">B, AB</td><td className="px-2 py-1">B, O</td></tr>
                    <tr className="border-t"><td className="px-2 py-1 font-bold">AB</td><td className="px-2 py-1">A &amp; B</td><td className="px-2 py-1">None</td><td className="px-2 py-1">AB only</td><td className="px-2 py-1">All (universal acceptor)</td></tr>
                    <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">O</td><td className="px-2 py-1">None</td><td className="px-2 py-1">Anti-A &amp; Anti-B</td><td className="px-2 py-1">All (universal donor)</td><td className="px-2 py-1">O only</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-2 text-xs">
                <strong>Rh factor:</strong> Rh+ (antigen present) vs Rh- (absent). Erythroblastosis fetalis occurs when Rh- mother carries Rh+ foetus (second pregnancy onward).
              </p>
            </div>
            <p className="text-xs text-gray-600 italic">
              PYQ Pattern: Cardiac cycle timings, SA node function, blood group compatibility, ECG wave interpretation
            </p>
          </div>
        ),
      },
      {
        title: "Excretory Products and their Elimination",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Kidney Structure and Nephron</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Human Excretory System</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Consists of a pair of <strong>kidneys</strong> (bean-shaped, ~11 cm), ureters, urinary bladder, and urethra. Each kidney has an outer <strong>cortex</strong> and inner <strong>medulla</strong> with renal pyramids. The functional unit is the <strong>nephron</strong> (about 1 million per kidney).
                </p>
              </div>
              <div>
                <h5 className="font-bold text-blue-900">Types of Nephrons</h5>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Cortical nephrons</strong> (~85%): Short loop of Henle, in cortex. <strong>Juxtamedullary nephrons</strong> (~15%): Long loop of Henle extending deep into medulla, essential for concentrating urine.
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Urine Formation</h4>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <p className="font-bold text-yellow-900 mb-2">Three Steps of Urine Formation</p>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="bg-white p-2 rounded border border-yellow-100">
                  <p><strong>1. Glomerular Filtration (Ultrafiltration)</strong></p>
                  <p>Blood filtered in <strong>Bowman&#39;s capsule</strong> under high pressure. GFR = ~125 mL/min (~180 L/day). Filters all plasma components except proteins and blood cells.</p>
                </div>
                <div className="bg-white p-2 rounded border border-yellow-100">
                  <p><strong>2. Tubular Reabsorption</strong></p>
                  <p>~99% of filtrate reabsorbed. PCT: glucose, amino acids, Na&#8314;, HCO&#8323;&#8315; (obligatory reabsorption). Loop of Henle: countercurrent mechanism. DCT &amp; CD: facultative reabsorption (ADH-dependent).</p>
                </div>
                <div className="bg-white p-2 rounded border border-yellow-100">
                  <p><strong>3. Tubular Secretion</strong></p>
                  <p>H&#8314;, K&#8314;, urea, and certain drugs secreted from peritubular capillaries into tubular fluid. Helps maintain blood pH and ionic balance.</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Countercurrent Mechanism</h4>
            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded text-sm">
              <p className="font-bold text-indigo-900 mb-2">Concentrating Urine</p>
              <p className="text-xs text-gray-700">
                The <strong>loop of Henle</strong> and <strong>vasa recta</strong> operate as a countercurrent system. The descending limb is permeable to water but not NaCl. The ascending limb is impermeable to water but actively transports NaCl out. This creates a hyperosmotic medullary interstitium (300 to 1200 mOsmol/L), allowing water reabsorption from collecting ducts under ADH influence.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-3 rounded text-sm mt-3">
              <p className="font-bold text-purple-900 mb-2">Hormonal Regulation of Kidney Function</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>&#8226; <strong>ADH (Vasopressin)</strong>: Increases water reabsorption in DCT and collecting duct</li>
                <li>&#8226; <strong>Aldosterone</strong>: Increases Na&#8314; reabsorption in DCT (RAAS pathway)</li>
                <li>&#8226; <strong>ANF (Atrial Natriuretic Factor)</strong>: Decreases Na&#8314; reabsorption → increases urine output</li>
              </ul>
            </div>
            <p className="text-xs text-gray-600 italic">
              PYQ Pattern: GFR values, countercurrent mechanism, ADH function, nephron structure
            </p>
          </div>
        ),
      },
      {
        title: "Locomotion and Movement",
        pyqFrequency: "Moderate",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Types of Muscles and Skeletal System</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Types of Muscles</h5>
                <div className="overflow-x-auto mt-2">
                  <table className="min-w-full text-xs border border-gray-200 rounded">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-2 py-1 text-left">Feature</th>
                        <th className="px-2 py-1 text-left">Skeletal</th>
                        <th className="px-2 py-1 text-left">Smooth</th>
                        <th className="px-2 py-1 text-left">Cardiac</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t"><td className="px-2 py-1">Striation</td><td className="px-2 py-1">Striated</td><td className="px-2 py-1">Non-striated</td><td className="px-2 py-1">Striated</td></tr>
                      <tr className="border-t bg-gray-50"><td className="px-2 py-1">Control</td><td className="px-2 py-1">Voluntary</td><td className="px-2 py-1">Involuntary</td><td className="px-2 py-1">Involuntary</td></tr>
                      <tr className="border-t"><td className="px-2 py-1">Nuclei</td><td className="px-2 py-1">Multinucleated</td><td className="px-2 py-1">Uninucleated</td><td className="px-2 py-1">Uninucleated</td></tr>
                      <tr className="border-t bg-gray-50"><td className="px-2 py-1">Intercalated discs</td><td className="px-2 py-1">Absent</td><td className="px-2 py-1">Absent</td><td className="px-2 py-1">Present</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Sliding Filament Theory of Muscle Contraction</h4>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <p className="font-bold text-yellow-900 mb-2">Steps of Muscle Contraction</p>
              <ol className="text-gray-700 space-y-1 text-xs list-decimal list-inside">
                <li>Neural signal releases <strong>acetylcholine</strong> at neuromuscular junction</li>
                <li>Action potential spreads along sarcolemma and T-tubules</li>
                <li>Ca&#178;&#8314; released from <strong>sarcoplasmic reticulum</strong></li>
                <li>Ca&#178;&#8314; binds troponin → tropomyosin shifts → exposes actin binding sites</li>
                <li>Myosin heads bind actin (cross-bridge formation) using ATP</li>
                <li><strong>Power stroke</strong>: Myosin pulls actin towards centre (A-band stays same, I-band and H-zone narrow)</li>
                <li>ATP binds myosin → cross-bridge detaches → cycle repeats</li>
              </ol>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Human Skeletal System</h4>
            <div className="bg-green-50 border border-green-200 p-3 rounded text-sm">
              <p className="font-bold text-green-900 mb-2">Total bones: 206</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>&#8226; <strong>Axial skeleton</strong> (80 bones): Skull (22), Vertebral column (26), Sternum (1), Ribs (24), Hyoid (1), Ear ossicles (6)</li>
                <li>&#8226; <strong>Appendicular skeleton</strong> (126 bones): Pectoral girdle (4), Upper limbs (60), Pelvic girdle (2), Lower limbs (60)</li>
                <li>&#8226; Smallest bone: <strong>Stapes</strong> (middle ear)</li>
                <li>&#8226; Longest bone: <strong>Femur</strong> (thigh)</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded text-sm mt-3">
              <p className="font-bold text-indigo-900 mb-2">Types of Joints</p>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>&#8226; <strong>Fibrous (immovable)</strong>: Skull sutures</li>
                <li>&#8226; <strong>Cartilaginous (slightly movable)</strong>: Vertebrae, pubic symphysis</li>
                <li>&#8226; <strong>Synovial (freely movable)</strong>: Ball-and-socket (hip, shoulder), Hinge (knee, elbow), Pivot (atlas-axis), Gliding (wrist), Saddle (thumb)</li>
              </ul>
            </div>
            <p className="text-xs text-gray-600 italic">
              PYQ Pattern: Sliding filament mechanism, sarcomere structure, types of joints, bone count
            </p>
          </div>
        ),
      },
      {
        title: "Neural Control and Coordination",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Nervous System Overview</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Neuron Structure</h5>
                <p className="text-sm text-gray-700 mt-1">
                  The structural and functional unit of the nervous system. Consists of <strong>cell body</strong> (cyton), <strong>dendrites</strong> (receive impulses), and <strong>axon</strong> (transmits impulses away from cell body). Axon is covered by <strong>myelin sheath</strong> (Schwann cells in PNS, oligodendrocytes in CNS) with gaps called <strong>Nodes of Ranvier</strong>.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-blue-900">Nerve Impulse Transmission</h5>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Resting potential</strong>: -70 mV (inside negative due to Na&#8314;/K&#8314; ATPase pump: 3 Na&#8314; out, 2 K&#8314; in).
                  <strong> Depolarisation</strong>: Na&#8314; channels open → Na&#8314; rushes in → inside becomes +30 mV.
                  <strong> Repolarisation</strong>: K&#8314; channels open → K&#8314; moves out → membrane returns to -70 mV.
                  <strong> Saltatory conduction</strong>: Impulse jumps between Nodes of Ranvier in myelinated neurons (faster).
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Synapse and Neurotransmission</h4>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <p className="font-bold text-yellow-900 mb-2">Chemical Synapse</p>
              <p className="text-xs text-gray-700">
                When action potential reaches the <strong>synaptic knob</strong>, Ca&#178;&#8314; enters → synaptic vesicles fuse with presynaptic membrane → <strong>neurotransmitter</strong> (e.g. acetylcholine) released into synaptic cleft → binds receptors on postsynaptic membrane → new action potential generated. Neurotransmitter is then broken down by enzymes (e.g. acetylcholinesterase).
              </p>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Human Brain</h4>
            <div className="bg-red-50 border border-red-200 p-3 rounded text-sm">
              <p className="font-bold text-red-900 mb-2">Major Parts and Functions</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border border-gray-200 rounded mt-1">
                  <thead className="bg-red-100">
                    <tr>
                      <th className="px-2 py-1 text-left">Part</th>
                      <th className="px-2 py-1 text-left">Location</th>
                      <th className="px-2 py-1 text-left">Key Functions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t"><td className="px-2 py-1 font-bold">Cerebrum</td><td className="px-2 py-1">Forebrain</td><td className="px-2 py-1">Intelligence, memory, speech, voluntary movements, sensory processing</td></tr>
                    <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Thalamus</td><td className="px-2 py-1">Forebrain</td><td className="px-2 py-1">Relay station for sensory signals (except smell)</td></tr>
                    <tr className="border-t"><td className="px-2 py-1 font-bold">Hypothalamus</td><td className="px-2 py-1">Forebrain</td><td className="px-2 py-1">Body temperature, hunger, thirst, circadian rhythms, pituitary control</td></tr>
                    <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Cerebellum</td><td className="px-2 py-1">Hindbrain</td><td className="px-2 py-1">Balance, posture, coordination of voluntary movements</td></tr>
                    <tr className="border-t"><td className="px-2 py-1 font-bold">Medulla oblongata</td><td className="px-2 py-1">Hindbrain</td><td className="px-2 py-1">Breathing, heart rate, blood pressure, vomiting, swallowing</td></tr>
                    <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Pons</td><td className="px-2 py-1">Hindbrain</td><td className="px-2 py-1">Relay between cerebrum and cerebellum, sleep regulation</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 p-3 rounded text-sm mt-3">
              <p className="font-bold text-green-900 mb-2">Reflex Arc</p>
              <p className="text-xs text-gray-700">
                <strong>Receptor → Afferent (sensory) neuron → Integration centre (spinal cord) → Efferent (motor) neuron → Effector (muscle/gland)</strong>. Reflex actions are involuntary, automatic responses. Example: knee-jerk reflex (monosynaptic), withdrawal reflex (polysynaptic).
              </p>
            </div>
            <p className="text-xs text-gray-600 italic">
              PYQ Pattern: Action potential mechanism, synapse transmission, brain parts and functions, reflex arc, cranial nerves
            </p>
          </div>
        ),
      },
      {
        title: "Chemical Coordination and Integration",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-blue-900">Endocrine Glands and Hormones</h4>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
              <div>
                <h5 className="font-bold text-blue-900">Endocrine System</h5>
                <p className="text-sm text-gray-700 mt-1">
                  Endocrine glands are ductless glands that secrete <strong>hormones</strong> directly into the blood. Hormones act on specific <strong>target organs</strong> via receptors. They regulate metabolism, growth, reproduction, and homeostasis.
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Major Endocrine Glands and Their Hormones</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border border-gray-200 rounded">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-2 py-1 text-left">Gland</th>
                    <th className="px-2 py-1 text-left">Hormone</th>
                    <th className="px-2 py-1 text-left">Function</th>
                    <th className="px-2 py-1 text-left">Disorder</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-2 py-1 font-bold">Pituitary (anterior)</td><td className="px-2 py-1">GH</td><td className="px-2 py-1">Growth of bones and tissues</td><td className="px-2 py-1">Gigantism / Dwarfism / Acromegaly</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Pituitary (anterior)</td><td className="px-2 py-1">TSH, ACTH, FSH, LH, Prolactin</td><td className="px-2 py-1">Regulate other endocrine glands</td><td className="px-2 py-1">Various</td></tr>
                  <tr className="border-t"><td className="px-2 py-1 font-bold">Pituitary (posterior)</td><td className="px-2 py-1">ADH (Vasopressin)</td><td className="px-2 py-1">Water reabsorption in kidneys</td><td className="px-2 py-1">Diabetes insipidus</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Pituitary (posterior)</td><td className="px-2 py-1">Oxytocin</td><td className="px-2 py-1">Uterine contractions, milk ejection</td><td className="px-2 py-1">-</td></tr>
                  <tr className="border-t"><td className="px-2 py-1 font-bold">Thyroid</td><td className="px-2 py-1">T&#8323; and T&#8324;</td><td className="px-2 py-1">BMR regulation, growth</td><td className="px-2 py-1">Goitre / Cretinism / Myxoedema / Graves&apos;</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Thyroid</td><td className="px-2 py-1">Calcitonin (TCT)</td><td className="px-2 py-1">Lowers blood Ca&#178;&#8314;</td><td className="px-2 py-1">-</td></tr>
                  <tr className="border-t"><td className="px-2 py-1 font-bold">Parathyroid</td><td className="px-2 py-1">PTH (Parathormone)</td><td className="px-2 py-1">Raises blood Ca&#178;&#8314;</td><td className="px-2 py-1">Osteoporosis (hypo)</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Adrenal cortex</td><td className="px-2 py-1">Cortisol, Aldosterone</td><td className="px-2 py-1">Stress response, Na&#8314;/K&#8314; balance</td><td className="px-2 py-1">Addison&apos;s / Cushing&apos;s / Conn&apos;s syndrome</td></tr>
                  <tr className="border-t"><td className="px-2 py-1 font-bold">Adrenal medulla</td><td className="px-2 py-1">Adrenaline, Noradrenaline</td><td className="px-2 py-1">Fight-or-flight response</td><td className="px-2 py-1">-</td></tr>
                  <tr className="border-t bg-gray-50"><td className="px-2 py-1 font-bold">Pancreas (Islets)</td><td className="px-2 py-1">Insulin (β-cells)</td><td className="px-2 py-1">Lowers blood glucose</td><td className="px-2 py-1">Diabetes mellitus (Type I)</td></tr>
                  <tr className="border-t"><td className="px-2 py-1 font-bold">Pancreas (Islets)</td><td className="px-2 py-1">Glucagon (α-cells)</td><td className="px-2 py-1">Raises blood glucose</td><td className="px-2 py-1">-</td></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold text-lg text-blue-900 mt-4">Mechanism of Hormone Action</h4>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <div className="space-y-2 text-xs text-gray-700">
                <div className="bg-white p-2 rounded border border-yellow-100">
                  <p><strong>Peptide/Protein Hormones (Water-soluble)</strong></p>
                  <p>Cannot enter cell. Bind to <strong>membrane receptors</strong> → activate secondary messengers (cAMP, IP&#8323;, Ca&#178;&#8314;) → cellular response. Examples: Insulin, GH, TSH, ADH.</p>
                </div>
                <div className="bg-white p-2 rounded border border-yellow-100">
                  <p><strong>Steroid Hormones (Lipid-soluble)</strong></p>
                  <p>Enter cell and bind <strong>intracellular receptors</strong> → hormone-receptor complex acts as transcription factor → gene expression changes. Examples: Cortisol, Aldosterone, Testosterone, Estrogen.</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-3 rounded text-sm mt-3">
              <p className="font-bold text-purple-900">Mnemonic: Feedback Mechanisms</p>
              <p className="text-xs text-gray-700">
                Most hormones regulated by <strong>negative feedback</strong> (e.g. high T&#8323;/T&#8324; → inhibits TSH release from pituitary). <strong>Positive feedback</strong> is rare (e.g. oxytocin during labour, LH surge during ovulation).
              </p>
            </div>
            <p className="text-xs text-gray-600 italic">
              PYQ Pattern: Hormone-gland matching, disorders, mechanism of action (second messenger vs intracellular), feedback loops
            </p>
          </div>
        ),
      },
    ],
  }

  const evolutionContent = {
    topics: [
      {
        title: "Origin of Life",
        pyqFrequency: "Medium",
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Oparin-Haldane Hypothesis</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>Proposed by:</strong> A.I. Oparin (1924) &amp; J.B.S. Haldane (1928)</p>
                <p><strong>Theory:</strong> Life originated from non-living matter through chemical evolution</p>
                <p><strong>Key Idea:</strong> Early Earth had reducing atmosphere with inorganic molecules that gradually formed organic compounds</p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Miller-Urey Experiment (1953)</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>Objective:</strong> Simulate primitive Earth atmosphere in laboratory</p>
                <p><strong>Setup:</strong> Flask containing CH₄ (methane), NH₃ (ammonia), H₂ (hydrogen), H₂O (water vapor)</p>
                <p><strong>Conditions:</strong> Electric sparks &amp; heat to simulate lightning &amp; UV radiation</p>
                <p><strong>Result:</strong> Synthesized amino acids (5 types initially), sugars, and other organic compounds</p>
                <p><strong>Significance:</strong> Proved that organic molecules could form from inorganic precursors under early Earth conditions</p>
              </div>
              <p className="text-xs text-gray-600 mt-1 italic">PYQ Hint: Questions often ask about setup, raw materials, or what was synthesized</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Stages of Chemical Evolution</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>Stage 1:</strong> Formation of simple inorganic molecules (H₂O, CH₄, NH₃, H₂S)</p>
                <p><strong>Stage 2:</strong> Formation of simple organic molecules (amino acids, nucleotides, sugars)</p>
                <p><strong>Stage 3:</strong> Formation of complex molecules (proteins, nucleic acids)</p>
                <p><strong>Stage 4:</strong> Formation of self-replicating molecules (RNA) &amp; protocells</p>
                <p><strong>Stage 5:</strong> Origin of first cells (chemoheterotrophic prokaryotes)</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Evidences for Evolution",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Homologous Organs vs Analogous Organs</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Feature</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Homologous Organs</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Analogous Organs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Origin</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Same embryological origin</td>
                    <td className="border border-gray-200 px-3 py-2">Different embryological origin</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Function</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Different functions</td>
                    <td className="border border-gray-200 px-3 py-2">Similar/same functions</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Examples</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Human arm, whale flipper, bat wing</td>
                    <td className="border border-gray-200 px-3 py-2">Butterfly wing &amp; bird wing</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Evolution</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Divergent evolution</td>
                    <td className="border border-gray-200 px-3 py-2">Convergent evolution</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Identify whether given organs are homologous or analogous</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Vestigial Organs in Humans</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>Nictitating membrane (3rd eyelid):</strong> Vestigial in humans, functional in birds &amp; reptiles</p>
                <p><strong>Wisdom teeth (3rd molars):</strong> Reduced in size, often impacted</p>
                <p><strong>Vermiform appendix:</strong> Involved in cellulose digestion in herbivorous ancestors</p>
                <p><strong>Coccyx (tailbone):</strong> Fused vertebrae; remnant of ancestral tail</p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Embryological &amp; Biogeographical Evidence</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>Von Baer&apos;s Law:</strong> Embryos of different vertebrates are more similar at early stages; differences appear gradually</p>
                <p><strong>Darwin&apos;s Finches:</strong> ~14 species evolved from single ancestor on Galapagos Islands with different beak shapes adapted to different food sources — classic example of adaptive radiation</p>
                <p><strong>Marsupials in Australia:</strong> Isolated continent led to unique fauna; evolved independently from placental mammals</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Darwin's Theory & Natural Selection",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Key Concepts of Darwinian Evolution</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>1. Variation:</strong> Individuals within a population show differences (genetic variation)</p>
                <p><strong>2. Struggle for Existence:</strong> Competition for limited resources (food, space, mates)</p>
                <p><strong>3. Survival of the Fittest:</strong> Organisms best adapted to environment survive &amp; reproduce</p>
                <p><strong>4. Natural Selection:</strong> Differential reproductive success based on adaptation</p>
                <p><strong>5. Speciation:</strong> Over time, isolated populations accumulate different traits forming new species</p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Types of Natural Selection</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Type</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Description</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Effect on Population</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Stabilizing</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Average phenotype favored; extremes eliminated</td>
                    <td className="border border-gray-200 px-3 py-2">Reduces variation; maintains status quo</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Directional</strong></td>
                    <td className="border border-gray-200 px-3 py-2">One extreme phenotype favored</td>
                    <td className="border border-gray-200 px-3 py-2">Shifts population in one direction</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Disruptive</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Both extremes favored; average eliminated</td>
                    <td className="border border-gray-200 px-3 py-2">Increases variation at extremes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Industrial Melanism: Biston betularia</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>Pre-Industrial:</strong> Light-colored moths dominant on lichen-covered bark</p>
                <p><strong>Industrial Revolution:</strong> Pollution darkened bark with soot; dark moths survived better (directional selection)</p>
                <p><strong>Result:</strong> Dark form increased from &lt;1% to &gt;90% in Manchester in 50 years</p>
                <p><strong>After Clean Air Act:</strong> Pollution decreased, light moths increased again</p>
                <p><strong>Significance:</strong> Direct evidence of natural selection in real-time</p>
              </div>
              <p className="text-xs text-gray-600 mt-1 italic">PYQ Hint: Explain this example to demonstrate natural selection driven by environmental change</p>
            </div>
          </div>
        ),
      },
      {
        title: "Mechanism of Evolution",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Hardy-Weinberg Principle</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-3">
                <p><strong>Definition:</strong> In absence of evolutionary forces, allele &amp; genotype frequencies remain constant across generations</p>
                <p className="bg-gray-100 p-2 rounded font-mono text-xs font-semibold">
                  Allele frequency: p + q = 1<br/>
                  Genotype frequency: p² + 2pq + q² = 1
                </p>
                <p><strong>Where:</strong> p = frequency of dominant allele (A), q = frequency of recessive allele (a), p² = AA, 2pq = Aa, q² = aa</p>
                <p><strong>Assumptions:</strong> No mutations, random mating, no gene flow, no genetic drift (large population), no natural selection</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Calculate allele/genotype frequencies; identify which factor violated H-W equilibrium</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">5 Factors Affecting Hardy-Weinberg Equilibrium</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Factor</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Mechanism</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Effect</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Mutation</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Spontaneous DNA changes create new alleles</td>
                    <td className="border border-gray-200 px-3 py-2">Introduces variation</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Gene Flow</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Migration of individuals between populations</td>
                    <td className="border border-gray-200 px-3 py-2">Homogenizes populations</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Genetic Drift</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Random changes in small populations</td>
                    <td className="border border-gray-200 px-3 py-2">Reduces variation; can fix/lose alleles</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Natural Selection</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Differential reproductive success</td>
                    <td className="border border-gray-200 px-3 py-2">Changes allele frequencies toward adaptive alleles</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Non-random Mating</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Inbreeding, assortative mating</td>
                    <td className="border border-gray-200 px-3 py-2">Changes genotype frequencies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Genetic Drift</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>Founder Effect:</strong> Small group establishes new population; carries only subset of genetic variation from source. Example: Amish population in Pennsylvania</p>
                <p><strong>Bottleneck Effect:</strong> Large population suddenly reduces in size; survivors carry fraction of genetic variation. Example: Northern elephant seal (hunted to ~20 individuals)</p>
                <p><strong>Key Point:</strong> Drift is stronger in small populations; negligible in large populations</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Human Evolution",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Timeline of Human Evolution</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Species</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Time Period</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Brain (cc)</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Dryopithecus</strong></td>
                    <td className="border border-gray-200 px-3 py-2">25-20 MYA</td>
                    <td className="border border-gray-200 px-3 py-2">~400</td>
                    <td className="border border-gray-200 px-3 py-2">Ape-like; arboreal</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Ramapithecus</strong></td>
                    <td className="border border-gray-200 px-3 py-2">14-10 MYA</td>
                    <td className="border border-gray-200 px-3 py-2">~400-500</td>
                    <td className="border border-gray-200 px-3 py-2">Transitional; possibly bipedal</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Australopithecus</strong></td>
                    <td className="border border-gray-200 px-3 py-2">4-1 MYA</td>
                    <td className="border border-gray-200 px-3 py-2">400-500</td>
                    <td className="border border-gray-200 px-3 py-2">Bipedal; small brain; no tools</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Homo habilis</strong></td>
                    <td className="border border-gray-200 px-3 py-2">2.4-1.4 MYA</td>
                    <td className="border border-gray-200 px-3 py-2">600-700</td>
                    <td className="border border-gray-200 px-3 py-2">Tool maker; omnivorous</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Homo erectus</strong></td>
                    <td className="border border-gray-200 px-3 py-2">1.8-0.4 MYA</td>
                    <td className="border border-gray-200 px-3 py-2">900-1100</td>
                    <td className="border border-gray-200 px-3 py-2">Used fire; hand axes; migrated out of Africa</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Homo neanderthalensis</strong></td>
                    <td className="border border-gray-200 px-3 py-2">250K-40K YA</td>
                    <td className="border border-gray-200 px-3 py-2">1200-1600</td>
                    <td className="border border-gray-200 px-3 py-2">Stocky; burial of dead; ice age adapted</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Homo sapiens</strong></td>
                    <td className="border border-gray-200 px-3 py-2">200K-present</td>
                    <td className="border border-gray-200 px-3 py-2">1300-1400</td>
                    <td className="border border-gray-200 px-3 py-2">Language; culture; art; agriculture</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Arrange species chronologically; identify trends (bipedalism, brain size, tool use)</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold mb-3 text-sm">Major Evolutionary Trends</h4>
              <div className="bg-white p-3 rounded border border-blue-200 text-sm space-y-2">
                <p><strong>1. Bipedalism:</strong> Earliest distinguishing feature (Australopithecus); freed hands for tool use; structural changes in spine, pelvis</p>
                <p><strong>2. Brain Size Increase:</strong> 400 cc (Dryopithecus) → 1400 cc (Homo sapiens); enabled complex cognition, language</p>
                <p><strong>3. Tool Development:</strong> Stone choppers (habilis) → hand axes/fire (erectus) → complex weapons (neanderthalensis) → sophisticated tools/art (sapiens)</p>
                <p><strong>4. Facial Reduction:</strong> Smaller face, teeth, jaw from ape-like to modern human form</p>
                <p><strong>5. Language:</strong> Proto-language (erectus) → limited vocal communication (neanderthalensis) → complex grammar &amp; abstract thought (sapiens)</p>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mt-3">
              <p className="text-sm"><strong>Mnemonic:</strong> DRAHHNS — Dryopithecus, Ramapithecus, Australopithecus, Habilis, (H.) erectus, Neanderthalensis, Sapiens</p>
            </div>
          </div>
        ),
      },
    ],
  }

  const ecologyContent = {
    topics: [
      {
        title: "Organisms and Populations",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Responses to Abiotic Factors</h4>
              <div className="bg-white p-3 rounded border border-green-200">
                <ul className="text-sm space-y-2 text-gray-700">
                  <li><strong>Regulate:</strong> Maintain constant internal conditions (homeostasis) — e.g., humans regulating body temperature</li>
                  <li><strong>Conform:</strong> Internal conditions match external environment — e.g., cold-blooded reptiles</li>
                  <li><strong>Migrate:</strong> Move to more favorable habitats — e.g., bird migration</li>
                  <li><strong>Suspend:</strong> Reduce metabolic activity — Dormancy (seeds), Hibernation (winter), Aestivation (summer, e.g., lungfish)</li>
                </ul>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Ecological Rules</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>Allen&apos;s Rule:</strong> Animals in colder climates have shorter limbs and ears to reduce heat loss</p>
                <p><strong>Bergmann&apos;s Rule:</strong> Animals in colder regions are larger to reduce surface area-to-volume ratio and conserve heat</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Population Growth Models</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Model</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Equation</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Curve</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Exponential</strong></td>
                    <td className="border border-gray-200 px-3 py-2">dN/dt = rN</td>
                    <td className="border border-gray-200 px-3 py-2">J-shaped</td>
                    <td className="border border-gray-200 px-3 py-2">Unlimited resources; no constraints</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Logistic</strong></td>
                    <td className="border border-gray-200 px-3 py-2">dN/dt = rN(K-N)/K</td>
                    <td className="border border-gray-200 px-3 py-2">S-shaped</td>
                    <td className="border border-gray-200 px-3 py-2">Limited resources; slows at carrying capacity K</td>
                  </tr>
                </tbody>
              </table>
              <div className="bg-white p-3 rounded border border-green-200 text-sm mt-2">
                <p><strong>r</strong> = intrinsic rate of natural increase &nbsp;|&nbsp; <strong>K</strong> = carrying capacity &nbsp;|&nbsp; <strong>N</strong> = population size</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Compare curves and explain why real populations follow logistic model</p>
            </div>
          </div>
        ),
      },
      {
        title: "Population Interactions",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Types of Population Interactions</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Interaction</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">A</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">B</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Mutualism</strong></td>
                    <td className="border border-gray-200 px-3 py-2">+</td>
                    <td className="border border-gray-200 px-3 py-2">+</td>
                    <td className="border border-gray-200 px-3 py-2">Lichen (algae + fungus), Mycorrhizae, Fig-wasp</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Competition</strong></td>
                    <td className="border border-gray-200 px-3 py-2">-</td>
                    <td className="border border-gray-200 px-3 py-2">-</td>
                    <td className="border border-gray-200 px-3 py-2">Gause&apos;s competitive exclusion (Paramecium)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Predation</strong></td>
                    <td className="border border-gray-200 px-3 py-2">+</td>
                    <td className="border border-gray-200 px-3 py-2">-</td>
                    <td className="border border-gray-200 px-3 py-2">Lion-zebra; controls prey population</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Parasitism</strong></td>
                    <td className="border border-gray-200 px-3 py-2">+</td>
                    <td className="border border-gray-200 px-3 py-2">-</td>
                    <td className="border border-gray-200 px-3 py-2">Tapeworm; Cuckoo brood parasitism</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Commensalism</strong></td>
                    <td className="border border-gray-200 px-3 py-2">+</td>
                    <td className="border border-gray-200 px-3 py-2">0</td>
                    <td className="border border-gray-200 px-3 py-2">Orchid on mango tree; Cattle egret</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Amensalism</strong></td>
                    <td className="border border-gray-200 px-3 py-2">-</td>
                    <td className="border border-gray-200 px-3 py-2">0</td>
                    <td className="border border-gray-200 px-3 py-2">Penicillium inhibiting bacteria</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Key Details</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>Gause&apos;s Competitive Exclusion:</strong> Two species competing for identical niche cannot coexist; one eliminates the other</p>
                <p><strong>Ectoparasites vs Endoparasites:</strong> Ectoparasites live on surface (lice, ticks); endoparasites live inside host (tapeworm, malaria parasite)</p>
                <p><strong>Brood Parasitism:</strong> Cuckoo lays eggs in other birds&apos; nests; host bird raises cuckoo chick at expense of own offspring</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Identify interaction type from given scenario; very frequently tested</p>
            </div>
          </div>
        ),
      },
      {
        title: "Ecosystem Structure & Function",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Ecosystem Productivity</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>GPP (Gross Primary Productivity):</strong> Total carbon fixed by plants via photosynthesis</p>
                <p><strong>NPP (Net Primary Productivity):</strong> GPP minus plant respiration; available for consumers. Formula: NPP = GPP - Respiration</p>
                <p><strong>Secondary Productivity:</strong> Energy fixed by consumers (herbivores, carnivores)</p>
                <p><strong>Global NPP:</strong> ~170 billion tons of organic matter/year</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Decomposition Process (5 Steps)</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>1. Fragmentation:</strong> Physical breakdown by detritivores (earthworms, termites)</p>
                <p><strong>2. Leaching:</strong> Water-soluble substances wash out into soil</p>
                <p><strong>3. Catabolism:</strong> Bacterial &amp; fungal enzymes break down organic compounds</p>
                <p><strong>4. Humification:</strong> Partially decomposed matter forms humus (dark, stable compound)</p>
                <p><strong>5. Mineralization:</strong> Release of inorganic nutrients available for plants</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Energy Flow &amp; Trophic Levels</h4>
              <p className="text-sm text-gray-800 mb-2"><strong>Lindeman&apos;s 10% Law:</strong> Only ~10% of energy passes to next trophic level; 90% lost as heat</p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Trophic Level</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Organisms</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Energy</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>T1</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Producers</td>
                    <td className="border border-gray-200 px-3 py-2">100%</td>
                    <td className="border border-gray-200 px-3 py-2">Grass, algae</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>T2</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Herbivores</td>
                    <td className="border border-gray-200 px-3 py-2">10%</td>
                    <td className="border border-gray-200 px-3 py-2">Rabbit, deer</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>T3</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Carnivores</td>
                    <td className="border border-gray-200 px-3 py-2">1%</td>
                    <td className="border border-gray-200 px-3 py-2">Frog, fox</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>T4</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Top carnivores</td>
                    <td className="border border-gray-200 px-3 py-2">0.1%</td>
                    <td className="border border-gray-200 px-3 py-2">Hawk, lion</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Explain why food chains rarely exceed 4-5 levels</p>
            </div>
          </div>
        ),
      },
      {
        title: "Ecological Pyramids",
        pyqFrequency: "High",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Comparison of Three Pyramids</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Feature</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Numbers</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Biomass</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Energy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Terrestrial</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Upright</td>
                    <td className="border border-gray-200 px-3 py-2">Upright</td>
                    <td className="border border-gray-200 px-3 py-2">Upright</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Aquatic</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Often inverted</td>
                    <td className="border border-gray-200 px-3 py-2">Inverted</td>
                    <td className="border border-gray-200 px-3 py-2">Upright</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Can be inverted?</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Yes</td>
                    <td className="border border-gray-200 px-3 py-2">Yes</td>
                    <td className="border border-gray-200 px-3 py-2">NO (never)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Key Points</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>Pyramid of Numbers:</strong> Upright in grassland; inverted in tree ecosystem (one tree supports many insects)</p>
                <p><strong>Pyramid of Biomass:</strong> Inverted in aquatic (phytoplankton biomass &lt; zooplankton due to fast turnover)</p>
                <p><strong>Pyramid of Energy:</strong> ALWAYS upright — follows 2nd law of thermodynamics; energy lost as heat at each level</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Explain why pyramid of energy can never be inverted</p>
            </div>
          </div>
        ),
      },
      {
        title: "Nutrient Cycling & Ecosystem Services",
        pyqFrequency: "Medium",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Carbon vs Phosphorus Cycles</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Feature</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Carbon Cycle</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Phosphorus Cycle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Type</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Gaseous cycle</td>
                    <td className="border border-gray-200 px-3 py-2">Sedimentary cycle</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Atmosphere?</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Yes (CO₂)</td>
                    <td className="border border-gray-200 px-3 py-2">No gaseous phase</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>Reservoir</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Atmosphere &amp; oceans (71% dissolved)</td>
                    <td className="border border-gray-200 px-3 py-2">Earth&apos;s crust (rocks)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Key process</strong></td>
                    <td className="border border-gray-200 px-3 py-2">Photosynthesis &amp; respiration</td>
                    <td className="border border-gray-200 px-3 py-2">Weathering &amp; sedimentation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Ecosystem Services</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p>Pollination, oxygen production, nutrient cycling, water purification, climate regulation, genetic resources for medicine</p>
                <p><strong>Robert Costanza (1997):</strong> Global ecosystem services estimated at ~$33 trillion/year</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Biodiversity & Conservation",
        pyqFrequency: "Very High",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Species Diversity &amp; Species-Area Relationship</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>Alpha (α):</strong> Diversity within a single community</p>
                <p><strong>Beta (β):</strong> Diversity between communities (species turnover)</p>
                <p><strong>Gamma (γ):</strong> Total regional diversity</p>
                <p className="bg-gray-100 p-2 rounded font-mono text-xs font-semibold mt-2">
                  Species-Area: log S = log C + Z log A
                </p>
                <p><strong>Z values:</strong> 0.1-0.2 (within continents) | 0.6-1.2 (islands — steeper slope)</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Latitudinal Gradient &amp; Causes of Loss</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>Pattern:</strong> Tropics have highest diversity (40% of species in 10% of area); richness decreases toward poles</p>
                <p><strong>HIPPO — Causes of biodiversity loss:</strong></p>
                <p><strong>H</strong>abitat loss (#1 threat) | <strong>I</strong>nvasive species | <strong>P</strong>ollution | <strong>P</strong>opulation growth | <strong>O</strong>verexploitation</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">Conservation: In-situ vs Ex-situ</h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Approach</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Methods</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2"><strong>In-situ</strong> (in natural habitat)</td>
                    <td className="border border-gray-200 px-3 py-2">National parks, sanctuaries, biosphere reserves, sacred groves, hotspots</td>
                    <td className="border border-gray-200 px-3 py-2">Jim Corbett, Kaziranga, Western Ghats</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2"><strong>Ex-situ</strong> (outside habitat)</td>
                    <td className="border border-gray-200 px-3 py-2">Zoos, botanical gardens, seed banks, cryopreservation</td>
                    <td className="border border-gray-200 px-3 py-2">IARI seed bank, captive breeding programs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-3">India&apos;s Biodiversity</h4>
              <div className="bg-white p-3 rounded border border-green-200 text-sm space-y-2">
                <p><strong>Status:</strong> One of 12 mega-diversity nations (7-8% of world&apos;s species on 2% land)</p>
                <p><strong>4 Biodiversity Hotspots:</strong> Western Ghats, Himalayas, Indo-Burma, Sundaland (Andaman/Nicobar)</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">PYQ Hint: Name conservation areas; explain HIPPO; species-area relationship calculations</p>
            </div>
          </div>
        ),
      },
    ],
  }

  const cellUnitOfLifeContent = {
  topics: [
    { title: "Cell Theory & Cell Discovery", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><div className="bg-blue-50 border-l-4 border-blue-400 p-3"><p className="font-semibold text-blue-900">Cell Theory (3 postulates):</p><ul className="list-disc pl-6 mt-2 text-sm"><li>All living organisms are composed of cells</li><li>Cell is the basic unit of life</li><li>All cells arise from pre-existing cells (Virchow — Omnis cellula e cellula)</li></ul></div><table className="w-full border-collapse border border-gray-300 my-4 text-sm"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Scientist</th><th className="border border-gray-300 p-2 text-left">Contribution</th><th className="border border-gray-300 p-2 text-left">Year</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2">Robert Hooke</td><td className="border border-gray-300 p-2">Discovered & named "cells" (cork)</td><td className="border border-gray-300 p-2">1665</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Leeuwenhoek</td><td className="border border-gray-300 p-2">Observed living cells</td><td className="border border-gray-300 p-2">1670s</td></tr><tr><td className="border border-gray-300 p-2">Schleiden</td><td className="border border-gray-300 p-2">All plants made of cells</td><td className="border border-gray-300 p-2">1838</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Schwann</td><td className="border border-gray-300 p-2">All animals made of cells</td><td className="border border-gray-300 p-2">1839</td></tr><tr><td className="border border-gray-300 p-2">Virchow</td><td className="border border-gray-300 p-2">Cells from pre-existing cells</td><td className="border border-gray-300 p-2">1858</td></tr></tbody></table><p className="font-semibold text-green-800">Exceptions: Viruses (non-cellular), Mycoplasma (smallest cell, no wall), Muscle fibers (multinucleate syncytium)</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Virchow's principle is high priority. Focus on exceptions — frequently tested.</p></div></div>) },
    { title: "Prokaryotic vs Eukaryotic Cells", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Feature</th><th className="border border-gray-300 p-2 text-left">Prokaryotic</th><th className="border border-gray-300 p-2 text-left">Eukaryotic</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Size</td><td className="border border-gray-300 p-2">0.5–5 μm</td><td className="border border-gray-300 p-2">10–100 μm</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Nucleus</td><td className="border border-gray-300 p-2">Absent; nucleoid</td><td className="border border-gray-300 p-2">Present; double membrane</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">DNA</td><td className="border border-gray-300 p-2">Circular; no histones</td><td className="border border-gray-300 p-2">Linear; histone-wrapped</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Membrane organelles</td><td className="border border-gray-300 p-2">Absent</td><td className="border border-gray-300 p-2">Present</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Ribosomes</td><td className="border border-gray-300 p-2">70S (50S+30S)</td><td className="border border-gray-300 p-2">80S (60S+40S)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Cell wall</td><td className="border border-gray-300 p-2">Peptidoglycan</td><td className="border border-gray-300 p-2">Cellulose/Chitin/Absent</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Division</td><td className="border border-gray-300 p-2">Binary fission</td><td className="border border-gray-300 p-2">Mitosis/Meiosis</td></tr></tbody></table><p className="font-semibold text-green-800">Bacterial structure: Capsule → Cell wall (peptidoglycan) → Plasma membrane → Nucleoid (circular DNA) + Plasmids + 70S ribosomes + Pili/Fimbriae</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: 70S = prokaryotes & mitochondria/plastids; 80S = eukaryotic cytoplasm. Comparison questions appear almost every exam.</p></div></div>) },
    { title: "Cell Organelles", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Nucleus: Double membrane with ~3000 pores. Chromatin (heterochromatin vs euchromatin). Nucleolus: rRNA synthesis.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">ER Type</th><th className="border border-gray-300 p-2 text-left">Structure</th><th className="border border-gray-300 p-2 text-left">Function</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">RER</td><td className="border border-gray-300 p-2">Ribosomes attached</td><td className="border border-gray-300 p-2">Protein synthesis (secretory proteins)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">SER</td><td className="border border-gray-300 p-2">No ribosomes; tubular</td><td className="border border-gray-300 p-2">Lipid synthesis, detoxification, Ca²⁺ storage</td></tr></tbody></table><p className="font-semibold text-green-800">Golgi: cis→medial→trans cisternae. Modifies/packages proteins; forms lysosomes.</p><p className="font-semibold text-green-800">Lysosomes: Acid hydrolases (pH ~4.8). Autophagy, phagocytosis, apoptosis. Absent in plant cells.</p><p className="font-semibold text-green-800">Mitochondria: Double membrane (cristae). Matrix: 70S ribosomes, circular mtDNA (~16.5 kb). Semi-autonomous, maternally inherited.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Plastid</th><th className="border border-gray-300 p-2 text-left">Pigments</th><th className="border border-gray-300 p-2 text-left">Function</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Chloroplasts</td><td className="border border-gray-300 p-2">Chlorophyll a,b; carotenoids</td><td className="border border-gray-300 p-2">Photosynthesis</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Chromoplasts</td><td className="border border-gray-300 p-2">Carotenoids</td><td className="border border-gray-300 p-2">Color in fruits/flowers</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Leucoplasts</td><td className="border border-gray-300 p-2">None</td><td className="border border-gray-300 p-2">Storage (starch, oils)</td></tr></tbody></table><p className="font-semibold text-green-800">Ribosomes: 70S (prokaryotes/mitochondria/plastids) vs 80S (eukaryotic cytoplasm). Centrioles: 9×3 microtubules; absent in higher plants.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: "DNA found besides nucleus?" → Mitochondria & plastids. Know all organelle functions.</p></div></div>) },
    { title: "Endomembrane System", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm">Interconnected organelles: ER → Golgi → Lysosomes → Plasma membrane (excludes mitochondria & plastids)</p><div className="bg-gray-100 p-4 rounded border-l-4 border-green-600 text-sm font-semibold text-center"><p>NUCLEUS → RER (translation) → GOLGI (modification) → PLASMA MEMBRANE/LYSOSOMES</p></div><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Component</th><th className="border border-gray-300 p-2 text-left">Role</th><th className="border border-gray-300 p-2 text-left">Connection</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Nuclear envelope</td><td className="border border-gray-300 p-2">mRNA export</td><td className="border border-gray-300 p-2">Continuous with RER</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">RER</td><td className="border border-gray-300 p-2">Protein synthesis</td><td className="border border-gray-300 p-2">Connected to nuclear envelope</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Golgi</td><td className="border border-gray-300 p-2">Sorting & packaging</td><td className="border border-gray-300 p-2">Receives from ER</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Lysosomes</td><td className="border border-gray-300 p-2">Digestion</td><td className="border border-gray-300 p-2">From Golgi (animals)</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: "Protein from RER next moves to..." → Golgi. Know the complete pathway.</p></div></div>) },
    { title: "Cell Membrane & Fluid Mosaic Model", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Fluid Mosaic Model (Singer & Nicolson, 1972): Phospholipid bilayer with embedded proteins.</p><ul className="list-disc pl-6 text-sm"><li>Amphipathic phospholipids: heads outward, tails inward; ~7.5 nm thick</li><li>Integral proteins: span bilayer (channels, receptors); Peripheral: surface only</li><li>Cholesterol modulates fluidity</li></ul><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Transport</th><th className="border border-gray-300 p-2 text-left">Energy</th><th className="border border-gray-300 p-2 text-left">Direction</th><th className="border border-gray-300 p-2 text-left">Mechanism</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Diffusion</td><td className="border border-gray-300 p-2">No</td><td className="border border-gray-300 p-2">High→Low</td><td className="border border-gray-300 p-2">Random motion</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Osmosis</td><td className="border border-gray-300 p-2">No</td><td className="border border-gray-300 p-2">Hypotonic→Hypertonic</td><td className="border border-gray-300 p-2">Water via aquaporins</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Facilitated</td><td className="border border-gray-300 p-2">No</td><td className="border border-gray-300 p-2">High→Low</td><td className="border border-gray-300 p-2">Channel/carrier proteins</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Active transport</td><td className="border border-gray-300 p-2">Yes (ATP)</td><td className="border border-gray-300 p-2">Low→High</td><td className="border border-gray-300 p-2">Na⁺/K⁺-ATPase (3Na⁺ out, 2K⁺ in)</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Endocytosis</td><td className="border border-gray-300 p-2">Yes</td><td className="border border-gray-300 p-2">Bulk in</td><td className="border border-gray-300 p-2">Phagocytosis/Pinocytosis</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Transport tested every year. O₂/CO₂ cross freely; glucose/ions need carriers.</p></div></div>) },
  ],
  }

  const biomoleculesContent = {
  topics: [
    { title: "Carbohydrates", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Organic compounds: (CH₂O)n — C:H:O = 1:2:1</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Disaccharide</th><th className="border border-gray-300 p-2 text-left">Composition</th><th className="border border-gray-300 p-2 text-left">Bond</th><th className="border border-gray-300 p-2 text-left">Source</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2">Maltose</td><td className="border border-gray-300 p-2">Glucose + Glucose</td><td className="border border-gray-300 p-2">α(1→4)</td><td className="border border-gray-300 p-2">Starch breakdown</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Sucrose</td><td className="border border-gray-300 p-2">Glucose + Fructose</td><td className="border border-gray-300 p-2">α(1→2)</td><td className="border border-gray-300 p-2">Table sugar; plant transport</td></tr><tr><td className="border border-gray-300 p-2">Lactose</td><td className="border border-gray-300 p-2">Glucose + Galactose</td><td className="border border-gray-300 p-2">β(1→4)</td><td className="border border-gray-300 p-2">Milk sugar</td></tr></tbody></table><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Polysaccharide</th><th className="border border-gray-300 p-2 text-left">Bond</th><th className="border border-gray-300 p-2 text-left">Type</th><th className="border border-gray-300 p-2 text-left">Function</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2">Starch</td><td className="border border-gray-300 p-2">α-glycosidic</td><td className="border border-gray-300 p-2">Storage</td><td className="border border-gray-300 p-2">Plant energy (amylose + amylopectin)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Glycogen</td><td className="border border-gray-300 p-2">α-glycosidic</td><td className="border border-gray-300 p-2">Storage</td><td className="border border-gray-300 p-2">Animal energy (liver, muscles)</td></tr><tr><td className="border border-gray-300 p-2">Cellulose</td><td className="border border-gray-300 p-2">β-glycosidic</td><td className="border border-gray-300 p-2">Structural</td><td className="border border-gray-300 p-2">Plant cell wall; indigestible</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Chitin</td><td className="border border-gray-300 p-2">β(1→4)</td><td className="border border-gray-300 p-2">Structural</td><td className="border border-gray-300 p-2">Arthropod exoskeleton; fungi</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: α-glycosidic easily hydrolyzed; β-glycosidic needs cellulase (humans lack it). Sucrose = non-reducing sugar.</p></div></div>) },
    { title: "Amino Acids & Protein Structure", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Amino acids: -NH₂ + -COOH + R-group on α-carbon. Peptide bond: C-N covalent (dehydration).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">ESSENTIAL AAs MNEMONIC: "PVT TIM HaLL" = Phe, Val, Thr, Trp, Ile, Met, His, Leu, Lys (9 total)</p></div><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Level</th><th className="border border-gray-300 p-2 text-left">Definition</th><th className="border border-gray-300 p-2 text-left">Bonds</th><th className="border border-gray-300 p-2 text-left">Example</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Primary (1°)</td><td className="border border-gray-300 p-2">Linear AA sequence</td><td className="border border-gray-300 p-2">Peptide bonds</td><td className="border border-gray-300 p-2">Insulin (51 aa)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Secondary (2°)</td><td className="border border-gray-300 p-2">α-helix, β-sheet</td><td className="border border-gray-300 p-2">H-bonds (backbone)</td><td className="border border-gray-300 p-2">α-helix: 3.6 res/turn</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Tertiary (3°)</td><td className="border border-gray-300 p-2">Overall 3D shape</td><td className="border border-gray-300 p-2">H-bonds, ionic, S-S, hydrophobic</td><td className="border border-gray-300 p-2">Lysozyme</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Quaternary (4°)</td><td className="border border-gray-300 p-2">Multi-subunit</td><td className="border border-gray-300 p-2">Non-covalent</td><td className="border border-gray-300 p-2">Hemoglobin (2α,2β)</td></tr></tbody></table><p className="font-semibold text-green-800">Classification: Simple (fibrous—collagen, keratin; globular—enzymes), Conjugated (lipoproteins, glycoproteins), Derived (hydrolysis products)</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET: Disulfide bonds between cysteine residues. Denaturation disrupts 2°/3° but NOT 1° structure.</p></div></div>) },
    { title: "Enzymes", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Biological catalysts lowering activation energy. Lock-and-key (Fischer) vs Induced fit (Koshland—modern).</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Class</th><th className="border border-gray-300 p-2 text-left">Reaction</th><th className="border border-gray-300 p-2 text-left">Example</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">EC 1: Oxidoreductases</td><td className="border border-gray-300 p-2">Redox</td><td className="border border-gray-300 p-2">Cytochrome oxidase</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">EC 2: Transferases</td><td className="border border-gray-300 p-2">Group transfer</td><td className="border border-gray-300 p-2">Hexokinase</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">EC 3: Hydrolases</td><td className="border border-gray-300 p-2">Hydrolysis</td><td className="border border-gray-300 p-2">Amylase, Lipase</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">EC 4: Lyases</td><td className="border border-gray-300 p-2">Non-hydrolytic cleavage</td><td className="border border-gray-300 p-2">Decarboxylase</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">EC 5: Isomerases</td><td className="border border-gray-300 p-2">Isomerization</td><td className="border border-gray-300 p-2">Glucose isomerase</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">EC 6: Ligases</td><td className="border border-gray-300 p-2">Bond formation (ATP)</td><td className="border border-gray-300 p-2">DNA ligase</td></tr></tbody></table><p className="font-semibold text-green-800">Cofactors (Mg²⁺, Zn²⁺, Fe²⁺) | Coenzymes (NAD⁺, FAD, CoA—vitamin-derived)</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Inhibition</th><th className="border border-gray-300 p-2 text-left">Mechanism</th><th className="border border-gray-300 p-2 text-left">Km</th><th className="border border-gray-300 p-2 text-left">Vmax</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Competitive</td><td className="border border-gray-300 p-2">Competes for active site</td><td className="border border-gray-300 p-2">↑</td><td className="border border-gray-300 p-2">Unchanged</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Non-competitive</td><td className="border border-gray-300 p-2">Binds allosteric site</td><td className="border border-gray-300 p-2">Unchanged</td><td className="border border-gray-300 p-2">↓</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET: Feedback inhibition, cyanide blocks cytochrome oxidase, penicillin inhibits peptidoglycan synthesis. Enzyme classification very frequent.</p></div></div>) },
    { title: "Lipids", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Hydrophobic molecules; 9 kcal/g (2× carbohydrates).</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Type</th><th className="border border-gray-300 p-2 text-left">Structure</th><th className="border border-gray-300 p-2 text-left">Key Facts</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Saturated FA</td><td className="border border-gray-300 p-2">Single C-C bonds</td><td className="border border-gray-300 p-2">Solid at RT; butter, lard</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Unsaturated FA</td><td className="border border-gray-300 p-2">C=C double bonds</td><td className="border border-gray-300 p-2">Liquid at RT; olive oil</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Triglycerides</td><td className="border border-gray-300 p-2">Glycerol + 3 FA</td><td className="border border-gray-300 p-2">Primary energy storage (adipose)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Phospholipids</td><td className="border border-gray-300 p-2">Glycerol + 2 FA + PO₄</td><td className="border border-gray-300 p-2">Amphipathic; cell membranes</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Steroids</td><td className="border border-gray-300 p-2">4 fused rings</td><td className="border border-gray-300 p-2">Cholesterol → hormones</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET: Phospholipids are amphipathic (form bilayer). Linoleic acid = essential FA. Cholesterol = steroid hormone precursor.</p></div></div>) },
    { title: "Nucleic Acids", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Nucleotide = Base + Sugar + Phosphate. Linked by phosphodiester bonds (3′→5′).</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Feature</th><th className="border border-gray-300 p-2 text-left">DNA</th><th className="border border-gray-300 p-2 text-left">RNA</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Sugar</td><td className="border border-gray-300 p-2">Deoxyribose</td><td className="border border-gray-300 p-2">Ribose</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Bases</td><td className="border border-gray-300 p-2">A, G, C, T</td><td className="border border-gray-300 p-2">A, G, C, U</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Structure</td><td className="border border-gray-300 p-2">Double helix</td><td className="border border-gray-300 p-2">Single strand</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Pairing</td><td className="border border-gray-300 p-2">A-T (2 H-bonds), G-C (3)</td><td className="border border-gray-300 p-2">A-U in hairpins</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Types</td><td className="border border-gray-300 p-2">One type</td><td className="border border-gray-300 p-2">mRNA (3-5%), rRNA (80-85%), tRNA (10-15%)</td></tr></tbody></table><p className="font-semibold text-green-800">Purines (2 rings): A, G | Pyrimidines (1 ring): C, T, U. Chargaff: A=T, G=C. DNA: 20Å diameter, 34Å pitch, 10bp/turn.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET: "PURe As Gold" — Purines have 2 rings. Chargaff's rules calculations frequent. rRNA = most abundant RNA.</p></div></div>) },
    { title: "Metabolic Basis of Living", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Feature</th><th className="border border-gray-300 p-2 text-left">Primary Metabolites</th><th className="border border-gray-300 p-2 text-left">Secondary Metabolites</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Examples</td><td className="border border-gray-300 p-2">Glucose, amino acids, lipids</td><td className="border border-gray-300 p-2">Alkaloids, antibiotics, pigments</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Presence</td><td className="border border-gray-300 p-2">Universal</td><td className="border border-gray-300 p-2">Species-specific</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Function</td><td className="border border-gray-300 p-2">Essential for survival</td><td className="border border-gray-300 p-2">Defense, signaling</td></tr></tbody></table><p className="font-semibold text-green-800">Anabolism (ATP-consuming: photosynthesis, protein synthesis) vs Catabolism (ATP-producing: glycolysis, respiration). Acetyl-CoA = central metabolic hub.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET: Primary vs secondary metabolite distinction is a direct MCQ topic.</p></div></div>) },
  ],
  }

  const cellDivisionContent = {
  topics: [
    { title: "Cell Cycle Phases", pyqFrequency: "High" as const, content: (<div className="space-y-4"><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Phase</th><th className="border border-gray-300 p-2 text-left">Duration</th><th className="border border-gray-300 p-2 text-left">Events</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">G1</td><td className="border border-gray-300 p-2">~8-10h</td><td className="border border-gray-300 p-2">Growth, enzyme synthesis. G1/S checkpoint (p53 checks DNA damage)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">S Phase</td><td className="border border-gray-300 p-2">~6-8h</td><td className="border border-gray-300 p-2">DNA replication, histone synthesis, centrosome duplication (2n→4n)</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">G2</td><td className="border border-gray-300 p-2">~4-6h</td><td className="border border-gray-300 p-2">Protein synthesis. G2/M checkpoint verifies replication</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">M Phase</td><td className="border border-gray-300 p-2">~1-2h</td><td className="border border-gray-300 p-2">Mitosis + cytokinesis → two daughter cells</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">G0</td><td className="border border-gray-300 p-2">Variable</td><td className="border border-gray-300 p-2">Quiescent (neurons, muscle). Can re-enter G1</td></tr></tbody></table><p className="font-semibold text-green-800">Cyclin-CDK: G1/S → Cyclin E-CDK2; G2/M → Cyclin B-CDK1. p53 = "guardian of the genome"</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: G1 is longest phase. p53 at G1/S checkpoint. Cyclin B-CDK1 triggers mitosis entry.</p></div></div>) },
    { title: "Mitosis", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="text-sm">Equational division: 2n → two identical 2n cells. In somatic cells for growth/repair.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Stage</th><th className="border border-gray-300 p-2 text-left">Events</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Prophase</td><td className="border border-gray-300 p-2">Chromatin→chromosomes. Nuclear envelope breaks down. Spindle forms</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Metaphase</td><td className="border border-gray-300 p-2">Chromosomes align at metaphase plate. Kinetochores attach to spindle</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Anaphase</td><td className="border border-gray-300 p-2">Sister chromatids separate at centromere → opposite poles</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Telophase</td><td className="border border-gray-300 p-2">Chromosomes decondense. Nuclear envelopes reform. Nucleoli reappear</td></tr></tbody></table><p className="font-semibold text-green-800">Cytokinesis: Animal = cleavage furrow (actin-myosin); Plant = cell plate (Golgi vesicles)</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Metaphase = aligned; Anaphase = separating. Plant vs animal cytokinesis HIGH-frequency.</p></div></div>) },
    { title: "Meiosis", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="text-sm">Reductional: 2n → four unique n gametes. Meiosis I (reductional) + Meiosis II (equational).</p><p className="font-semibold text-green-800">Prophase I Substages:</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Substage</th><th className="border border-gray-300 p-2 text-left">Events</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Leptotene</td><td className="border border-gray-300 p-2">Chromosomes visible as thin threads</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Zygotene</td><td className="border border-gray-300 p-2">Synapsis: bivalents form; synaptonemal complex</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Pachytene</td><td className="border border-gray-300 p-2">CROSSING OVER → chiasmata. Longest substage</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Diplotene</td><td className="border border-gray-300 p-2">Homologs connected only via chiasmata</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Diakinesis</td><td className="border border-gray-300 p-2">Final condensation; nuclear envelope breaks</td></tr></tbody></table><p className="text-sm"><span className="font-semibold">MI:</span> Bivalents align (independent assortment). Homologs separate (centromeres intact). <span className="font-semibold">MII:</span> Sister chromatids separate.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2 text-left">Feature</th><th className="border border-gray-300 p-2 text-left">Mitosis</th><th className="border border-gray-300 p-2 text-left">Meiosis</th></tr></thead><tbody><tr><td className="border border-gray-300 p-2 font-semibold">Location</td><td className="border border-gray-300 p-2">Somatic</td><td className="border border-gray-300 p-2">Germ cells</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Ploidy</td><td className="border border-gray-300 p-2">2n→2n</td><td className="border border-gray-300 p-2">2n→n</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Divisions</td><td className="border border-gray-300 p-2">One</td><td className="border border-gray-300 p-2">Two</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Crossing over</td><td className="border border-gray-300 p-2">Absent</td><td className="border border-gray-300 p-2">Present (pachytene)</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Daughter cells</td><td className="border border-gray-300 p-2">2 identical</td><td className="border border-gray-300 p-2">4 unique haploid</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Purpose</td><td className="border border-gray-300 p-2">Growth, repair</td><td className="border border-gray-300 p-2">Gametes, variation</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Crossing over = PACHYTENE (not zygotene). MI has bivalents; MII has individual chromosomes. Two sources of variation: crossing over + independent assortment.</p></div></div>) },
    { title: "Significance of Cell Division", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Mitosis: Growth, tissue repair (skin 2-4 weeks, RBCs ~120 days), asexual reproduction, chromosome maintenance (2n→2n).</p><p className="font-semibold text-green-800 mt-2">Meiosis: Gamete formation (n), genetic variation (crossing over + independent assortment), prevents chromosome doubling, raw material for evolution.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Why meiosis essential? → Genetic variation + chromosome reduction. Without it: 2n→4n→8n each generation.</p></div></div>) },
  ],
  }

  const reproductionContent = {
  topics: [
    { title: "Reproduction in Organisms", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><div><p className="font-semibold text-green-800">Asexual vs Sexual Reproduction</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead className="bg-green-50"><tr><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Asexual</th><th className="border border-gray-300 p-2">Sexual</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Number of Parents</td><td className="border border-gray-300 p-2">One</td><td className="border border-gray-300 p-2">Two</td></tr><tr><td className="border border-gray-300 p-2">Gamete Formation</td><td className="border border-gray-300 p-2">No</td><td className="border border-gray-300 p-2">Yes</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Genetic Variation</td><td className="border border-gray-300 p-2">Low/None</td><td className="border border-gray-300 p-2">High</td></tr><tr><td className="border border-gray-300 p-2">Mitosis/Meiosis</td><td className="border border-gray-300 p-2">Mitosis</td><td className="border border-gray-300 p-2">Meiosis</td></tr></tbody></table></div><div><p className="font-semibold text-green-800">Types of Asexual Reproduction</p><p className="text-sm"><span className="font-semibold text-green-800">Binary fission:</span> Division into two equal halves (bacteria, Amoeba). <span className="font-semibold text-green-800">Budding:</span> Outgrowth develops into new organism (Hydra, yeast). <span className="font-semibold text-green-800">Fragmentation:</span> Body breaks into fragments, each regenerates (Spirogyra, starfish). <span className="font-semibold text-green-800">Sporulation:</span> Formation of spores (Rhizopus). <span className="font-semibold text-green-800">Vegetative propagation:</span> From vegetative parts (potato tubers, runners in strawberry).</p></div><div><p className="font-semibold text-green-800">Events in Sexual Reproduction</p><p className="text-sm"><span className="font-semibold text-green-800">Pre-fertilisation:</span> Gametogenesis, gamete transfer. <span className="font-semibold text-green-800">Fertilisation:</span> Fusion of male and female gametes forming zygote. <span className="font-semibold text-green-800">Post-fertilisation:</span> Embryo development, organogenesis, growth.</p></div><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Zoospores are motile asexual spores with flagella. Conidia are non-motile asexual spores. Meiocytes are always 2n diploid cells that undergo meiosis to produce n haploid gametes.</p></div></div>) },
    { title: "Sexual Reproduction in Flowering Plants", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><div><p className="font-semibold text-green-800">Microsporogenesis &amp; Megasporogenesis</p><p className="text-sm"><span className="font-semibold text-green-800">Microsporogenesis:</span> Microspore mother cell (2n) undergoes meiosis → 4 microspores (n) → develops into pollen grain with vegetative and generative cells. <span className="font-semibold text-green-800">Megasporogenesis:</span> Megaspore mother cell (2n) undergoes meiosis → 4 megaspores (n) → usually 3 degenerate, 1 functional megaspore develops into embryo sac.</p></div><div><p className="font-semibold text-green-800">Mature Embryo Sac (7 cells, 8 nuclei)</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Component</th><th className="border border-gray-300 p-2">Number</th><th className="border border-gray-300 p-2">Function</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Egg apparatus (micropylar end)</td><td className="border border-gray-300 p-2">3 cells (1 egg + 2 synergids)</td><td className="border border-gray-300 p-2">Gamete reception, fertilisation</td></tr><tr><td className="border border-gray-300 p-2">Central cell</td><td className="border border-gray-300 p-2">2 polar nuclei</td><td className="border border-gray-300 p-2">Triple fusion with male gamete</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Antipodal cells (chalazal end)</td><td className="border border-gray-300 p-2">3 cells</td><td className="border border-gray-300 p-2">Nutrition, degenerate after fertilisation</td></tr></tbody></table></div><div><p className="font-semibold text-green-800">Pollination Types</p><p className="text-sm"><span className="font-semibold text-green-800">Autogamy:</span> Same flower self-pollination. <span className="font-semibold text-green-800">Geitonogamy:</span> Different flower, same plant (genetically self-pollination). <span className="font-semibold text-green-800">Xenogamy:</span> Cross-pollination between different plants (promotes genetic variation).</p></div><div><p className="font-semibold text-green-800">Double Fertilisation</p><p className="text-sm"><span className="font-semibold text-green-800">Syngamy:</span> Male gamete + egg cell (n + n = 2n zygote) → embryo. <span className="font-semibold text-green-800">Triple fusion:</span> Male gamete + 2 polar nuclei (n + n + n = 3n) → endosperm. Endosperm types: Nuclear (coconut), Cellular, Helobial.</p></div><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Megaspore mother cell (2n) → 4 megaspores (n) → only 1 functional. Double fertilisation (syngamy + triple fusion) is UNIQUE to angiosperms. Always remember: 7 cells, 8 nuclei in mature embryo sac.</p></div></div>) },
    { title: "Human Reproduction — Male System", pyqFrequency: "High" as const, content: (<div className="space-y-4"><div><p className="font-semibold text-green-800">Male Reproductive Anatomy</p><p className="text-sm"><span className="font-semibold text-green-800">Testes:</span> Paired organs in scrotum (2-3°C below body temp), produce sperm + testosterone. <span className="font-semibold text-green-800">Epididymis:</span> Sperm storage and maturation. <span className="font-semibold text-green-800">Vas deferens:</span> Sperm transport. <span className="font-semibold text-green-800">Accessory glands:</span> Seminal vesicles (fructose), prostate (enzymes), bulbourethral glands (mucus).</p></div><div><p className="font-semibold text-green-800">Spermatogenesis</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Stage</th><th className="border border-gray-300 p-2">Cell Type</th><th className="border border-gray-300 p-2">Ploidy</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Mitotic multiplication</td><td className="border border-gray-300 p-2">Spermatogonium</td><td className="border border-gray-300 p-2">2n</td></tr><tr><td className="border border-gray-300 p-2">Growth phase</td><td className="border border-gray-300 p-2">Primary spermatocyte</td><td className="border border-gray-300 p-2">2n</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Meiosis I</td><td className="border border-gray-300 p-2">Secondary spermatocyte</td><td className="border border-gray-300 p-2">n</td></tr><tr><td className="border border-gray-300 p-2">Meiosis II</td><td className="border border-gray-300 p-2">Spermatid</td><td className="border border-gray-300 p-2">n</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Spermiogenesis</td><td className="border border-gray-300 p-2">Mature sperm</td><td className="border border-gray-300 p-2">n</td></tr></tbody></table></div><div><p className="font-semibold text-green-800">Sperm Structure</p><p className="text-sm"><span className="font-semibold text-green-800">Head:</span> Nucleus + acrosome (enzymes for egg penetration). <span className="font-semibold text-green-800">Neck:</span> Centrioles. <span className="font-semibold text-green-800">Middle piece:</span> Mitochondrial helix (ATP). <span className="font-semibold text-green-800">Tail:</span> Flagellum for motility.</p></div><div><p className="font-semibold text-green-800">Hormonal Control</p><p className="text-sm">Hypothalamus → GnRH → Anterior pituitary → FSH (spermatogenesis via Sertoli cells) + LH (testosterone via Leydig cells). Testosterone: secondary sexual characters + negative feedback.</p></div><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Sertoli cells = nutrition/support to developing sperm. Leydig cells = testosterone secretion. Spermatogenesis starts at puberty, continues throughout life. Scrotum = 2-3°C below body temperature.</p></div></div>) },
    { title: "Human Reproduction — Female System & Development", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><div><p className="font-semibold text-green-800">Oogenesis</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Stage</th><th className="border border-gray-300 p-2">Cell Type</th><th className="border border-gray-300 p-2">Ploidy</th><th className="border border-gray-300 p-2">Arrest Point</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Before puberty</td><td className="border border-gray-300 p-2">Oogonium</td><td className="border border-gray-300 p-2">2n</td><td className="border border-gray-300 p-2">Mitotic division</td></tr><tr><td className="border border-gray-300 p-2">Growth phase</td><td className="border border-gray-300 p-2">Primary oocyte</td><td className="border border-gray-300 p-2">2n</td><td className="border border-gray-300 p-2">Prophase I (until ovulation)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Meiosis I</td><td className="border border-gray-300 p-2">Secondary oocyte</td><td className="border border-gray-300 p-2">n</td><td className="border border-gray-300 p-2">Metaphase II (until fertilisation)</td></tr><tr><td className="border border-gray-300 p-2">Meiosis II</td><td className="border border-gray-300 p-2">Mature ovum</td><td className="border border-gray-300 p-2">n</td><td className="border border-gray-300 p-2">Only if fertilised</td></tr></tbody></table></div><div><p className="font-semibold text-green-800">Menstrual Cycle (28 days)</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Phase</th><th className="border border-gray-300 p-2">Days</th><th className="border border-gray-300 p-2">Events</th><th className="border border-gray-300 p-2">Hormones</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Menstrual</td><td className="border border-gray-300 p-2">1-5</td><td className="border border-gray-300 p-2">Endometrial shedding</td><td className="border border-gray-300 p-2">Low estrogen, progesterone</td></tr><tr><td className="border border-gray-300 p-2">Follicular</td><td className="border border-gray-300 p-2">5-13</td><td className="border border-gray-300 p-2">Follicle growth</td><td className="border border-gray-300 p-2">Rising FSH, estrogen</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Ovulatory</td><td className="border border-gray-300 p-2">13-15</td><td className="border border-gray-300 p-2">LH surge → ovulation (day 14)</td><td className="border border-gray-300 p-2">Peak LH, estrogen</td></tr><tr><td className="border border-gray-300 p-2">Luteal</td><td className="border border-gray-300 p-2">15-28</td><td className="border border-gray-300 p-2">Corpus luteum → progesterone</td><td className="border border-gray-300 p-2">High progesterone</td></tr></tbody></table></div><div><p className="font-semibold text-green-800">Fertilisation, Implantation &amp; Embryo Development</p><p className="text-sm">Fertilisation in ampulla of fallopian tube (12-24 hrs post-ovulation). Zygote → cleavage → blastocyst reaches uterus day 5-6. Implantation day 7-12. hCG from trophoblast maintains corpus luteum. Placenta: O<sub>2</sub>/nutrient transfer, hormone production (progesterone after week 8). Parturition: oxytocin → uterine contractions. Lactation: prolactin → milk; colostrum rich in IgA antibodies.</p></div><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Ovulation = Day 14 (LH surge). Corpus luteum → progesterone. hCG detected in pregnancy tests. Primary oocyte arrested in Prophase I until ovulation. Gestation ~266 days from fertilisation.</p></div></div>) },
    { title: "Reproductive Health", pyqFrequency: "High" as const, content: (<div className="space-y-4"><div><p className="font-semibold text-green-800">Birth Control Methods</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Method</th><th className="border border-gray-300 p-2">Examples</th><th className="border border-gray-300 p-2">Efficacy</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Natural</td><td className="border border-gray-300 p-2">Rhythm method, coitus interruptus</td><td className="border border-gray-300 p-2">Low (70-90%)</td></tr><tr><td className="border border-gray-300 p-2">Barrier</td><td className="border border-gray-300 p-2">Condom, diaphragm, cervical cap</td><td className="border border-gray-300 p-2">Moderate (82-95%)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">IUD</td><td className="border border-gray-300 p-2">Copper T, LNG-IUS</td><td className="border border-gray-300 p-2">High (99%+)</td></tr><tr><td className="border border-gray-300 p-2">Hormonal</td><td className="border border-gray-300 p-2">Oral pills, patches, injections</td><td className="border border-gray-300 p-2">High (91-99%)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Surgical</td><td className="border border-gray-300 p-2">Tubectomy (female), Vasectomy (male)</td><td className="border border-gray-300 p-2">Very high (&gt;99%)</td></tr></tbody></table></div><div><p className="font-semibold text-green-800">STDs (Sexually Transmitted Diseases)</p><p className="text-sm"><span className="font-semibold text-green-800">Bacterial:</span> Gonorrhoea (Neisseria), Syphilis (Treponema pallidum). <span className="font-semibold text-green-800">Viral:</span> HIV/AIDS (retrovirus, CD4<sup>+</sup> T cells), Hepatitis B, Genital herpes (HSV-2). Prevention: safe sex, condoms, awareness.</p></div><div><p className="font-semibold text-green-800">Infertility &amp; ART</p><p className="text-sm"><span className="font-semibold text-green-800">IVF:</span> Fertilisation outside body, embryo transferred to uterus. <span className="font-semibold text-green-800">ZIFT:</span> Zygote transferred to fallopian tube. <span className="font-semibold text-green-800">GIFT:</span> Gametes placed in fallopian tube. <span className="font-semibold text-green-800">ICSI:</span> Single sperm injected into egg. <span className="font-semibold text-green-800">AI:</span> Semen introduced into female tract. Amniocentesis: detects chromosomal abnormalities (banned for sex determination).</p></div><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: IVF = in vitro (outside body). ZIFT = zygote in fallopian tube. GIFT = gametes in fallopian tube. Remember: GIFT (unfertilised) → ZIFT (zygote) → IVF (embryo). Amniocentesis banned for sex determination in India.</p></div></div>) },
  ],
}

  const biotechnologyContent = {
  topics: [
    { title: "Genetic Engineering Tools", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Restriction Enzymes:</span> EcoRI recognizes palindromic sequence 5&apos;-GAATTC-3&apos;; produces sticky ends (preferred for cloning). Nomenclature: E (genus Escherichia) + co (species coli) + R (strain RY13) + I (first enzyme).</p><div><p className="font-semibold text-green-800">Cloning Vectors</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Vector</th><th className="border border-gray-300 p-2">Features</th><th className="border border-gray-300 p-2">Use</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">pBR322</td><td className="border border-gray-300 p-2">ori, amp<sup>R</sup>, tet<sup>R</sup>, restriction sites</td><td className="border border-gray-300 p-2">E. coli cloning</td></tr><tr><td className="border border-gray-300 p-2">Ti plasmid</td><td className="border border-gray-300 p-2">T-DNA integrates into plant genome</td><td className="border border-gray-300 p-2">Plant transformation</td></tr></tbody></table></div><p className="text-sm"><span className="font-semibold text-green-800">Tools:</span> DNA ligase (joins fragments), DNA polymerase (synthesizes DNA), Reverse transcriptase (RNA → cDNA). <span className="font-semibold text-green-800">Insertional inactivation:</span> Foreign DNA inserted into antibiotic resistance gene → loss of resistance identifies recombinants.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: EcoRI = E.coli RY13, first enzyme (I). Palindromic sequences read same 5&apos;→3&apos; on both strands. Sticky ends preferred — they base-pair easily with compatible ends.</p></div></div>) },
    { title: "Recombinant DNA Technology Process", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="font-semibold text-green-800">Steps of rDNA Technology</p><p className="text-sm">(1) DNA isolation → (2) Restriction enzyme cutting → (3) PCR amplification → (4) Ligation with vector → (5) Transfer into host → (6) Screening and selection.</p><div><p className="font-semibold text-green-800">PCR (Polymerase Chain Reaction)</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Step</th><th className="border border-gray-300 p-2">Temperature</th><th className="border border-gray-300 p-2">Event</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Denaturation</td><td className="border border-gray-300 p-2">94°C</td><td className="border border-gray-300 p-2">DNA strands separate</td></tr><tr><td className="border border-gray-300 p-2">Annealing</td><td className="border border-gray-300 p-2">55-65°C</td><td className="border border-gray-300 p-2">Primers bind target</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Extension</td><td className="border border-gray-300 p-2">72°C</td><td className="border border-gray-300 p-2">Taq polymerase synthesizes new strand</td></tr></tbody></table></div><p className="text-sm"><span className="font-semibold text-green-800">Gel Electrophoresis:</span> DNA fragments separated by size in agarose gel; smaller fragments move faster; ethidium bromide staining under UV. <span className="font-semibold text-green-800">Bioreactors:</span> Stirred tank bioreactors for large-scale recombinant protein production.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: PCR = 3 steps repeated 30+ cycles. Taq polymerase from Thermus aquaticus (thermostable). DNA is negatively charged — smaller fragments migrate faster in gel electrophoresis.</p></div></div>) },
    { title: "Biotechnology in Agriculture", pyqFrequency: "High" as const, content: (<div className="space-y-4"><div><p className="font-semibold text-green-800">Bt Crops</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Crop</th><th className="border border-gray-300 p-2">Gene</th><th className="border border-gray-300 p-2">Target Pest</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Bt cotton</td><td className="border border-gray-300 p-2">cry1Ac, cry2Ab</td><td className="border border-gray-300 p-2">Lepidopteran bollworm</td></tr><tr><td className="border border-gray-300 p-2">Bt corn</td><td className="border border-gray-300 p-2">cry1Ab</td><td className="border border-gray-300 p-2">European corn borer</td></tr></tbody></table></div><p className="text-sm"><span className="font-semibold text-green-800">Cry Protein Mechanism:</span> Inactive protoxin → activated in alkaline insect midgut → pore formation in epithelial cells → cell lysis → insect death. Harmless to humans (requires pH &gt;9).</p><p className="text-sm"><span className="font-semibold text-green-800">RNA Interference (RNAi):</span> dsRNA triggers gene silencing. Meloidogyne incognita (root-knot nematode) controlled in transgenic tobacco using nematode-specific dsRNA.</p><p className="text-sm"><span className="font-semibold text-green-800">Golden Rice:</span> Transgenic rice enriched with beta-carotene (provitamin A) to address vitamin A deficiency.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Bt = Bacillus thuringiensis. cry genes encode crystal proteins. Bt toxin requires alkaline pH — safe for mammals. RNAi = targeted gene silencing without DNA modification.</p></div></div>) },
    { title: "Biotechnology in Medicine", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Genetically Engineered Insulin (Humulin):</span> Human insulin gene inserted into E. coli. Synthesized as proinsulin (single chain) → cleaved to mature insulin (A chain + B chain joined by disulfide bonds).</p><p className="text-sm"><span className="font-semibold text-green-800">Gene Therapy:</span> ADA deficiency (adenosine deaminase) → SCID. First successful gene therapy: ex vivo approach (patient cells modified outside body, reintroduced).</p><div><p className="font-semibold text-green-800">Molecular Diagnostics</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Technique</th><th className="border border-gray-300 p-2">Principle</th><th className="border border-gray-300 p-2">Use</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">ELISA</td><td className="border border-gray-300 p-2">Antigen-antibody binding</td><td className="border border-gray-300 p-2">HIV detection, pregnancy tests</td></tr><tr><td className="border border-gray-300 p-2">PCR</td><td className="border border-gray-300 p-2">DNA amplification</td><td className="border border-gray-300 p-2">Pathogen detection</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">DNA Probes</td><td className="border border-gray-300 p-2">Hybridization</td><td className="border border-gray-300 p-2">Genetic disorder screening</td></tr></tbody></table></div><p className="text-sm"><span className="font-semibold text-green-800">Transgenic Animals:</span> Used for gene regulation studies, therapeutic protein production (pharming), toxicity testing, disease modeling.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Humulin = first genetically engineered human insulin from E. coli. ADA-SCID = adenosine deaminase deficiency. ELISA = antigen-antibody quantification. PCR enables rapid disease diagnosis.</p></div></div>) },
    { title: "Bioethics and Biopiracy", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Ethical Issues:</span> GMO safety (allergenicity, toxicity), biopiracy (unauthorized commercial use of biological resources), patent monopolies on biological resources.</p><div><p className="font-semibold text-green-800">Indian Biopiracy Cases</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Case</th><th className="border border-gray-300 p-2">Resource</th><th className="border border-gray-300 p-2">Outcome</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Turmeric patent</td><td className="border border-gray-300 p-2">Curcumin (anti-inflammatory)</td><td className="border border-gray-300 p-2">Challenged and revoked</td></tr><tr><td className="border border-gray-300 p-2">Neem patent</td><td className="border border-gray-300 p-2">Pesticidal properties</td><td className="border border-gray-300 p-2">Revoked</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Basmati rice</td><td className="border border-gray-300 p-2">Breeding patent by RiceTec</td><td className="border border-gray-300 p-2">Challenged</td></tr></tbody></table></div><p className="text-sm"><span className="font-semibold text-green-800">GEAC</span> (Genetic Engineering Appraisal Committee): Reviews GMO research, approves releases in India. <span className="font-semibold text-green-800">Traditional Knowledge Digital Library (TKDL):</span> Documents Indian traditional knowledge to prevent biopiracy patents.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: GEAC = regulatory body for GMO biosafety in India. India fights biopiracy through TKDL. Benefit-sharing required under Convention on Biological Diversity (CBD).</p></div></div>) },
  ],
}

  const biologicalClassificationContent = {
  topics: [
    { title: "Five Kingdom Classification", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="text-sm">Whittaker's classification (1969) uses five criteria: <span className="font-semibold text-green-800">cell structure, body organisation, mode of nutrition, reproduction, and phylogenetic relationships</span>.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Kingdom</th><th className="border border-gray-300 p-2">Cell Type</th><th className="border border-gray-300 p-2">Cell Wall</th><th className="border border-gray-300 p-2">Nutrition</th><th className="border border-gray-300 p-2">Examples</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Monera</td><td className="border border-gray-300 p-2">Prokaryotic</td><td className="border border-gray-300 p-2">Present</td><td className="border border-gray-300 p-2">Autotrophic/Heterotrophic</td><td className="border border-gray-300 p-2">Bacteria, Cyanobacteria</td></tr><tr><td className="border border-gray-300 p-2">Protista</td><td className="border border-gray-300 p-2">Eukaryotic</td><td className="border border-gray-300 p-2">Absent/Present</td><td className="border border-gray-300 p-2">Autotrophic/Heterotrophic</td><td className="border border-gray-300 p-2">Diatoms, Euglena, Amoeba</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Fungi</td><td className="border border-gray-300 p-2">Eukaryotic</td><td className="border border-gray-300 p-2">Chitin</td><td className="border border-gray-300 p-2">Heterotrophic</td><td className="border border-gray-300 p-2">Mushroom, Yeast, Mold</td></tr><tr><td className="border border-gray-300 p-2">Plantae</td><td className="border border-gray-300 p-2">Eukaryotic</td><td className="border border-gray-300 p-2">Cellulose</td><td className="border border-gray-300 p-2">Autotrophic</td><td className="border border-gray-300 p-2">Ferns, Flowering Plants</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Animalia</td><td className="border border-gray-300 p-2">Eukaryotic</td><td className="border border-gray-300 p-2">Absent</td><td className="border border-gray-300 p-2">Heterotrophic</td><td className="border border-gray-300 p-2">Insects, Mammals, Fish</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Two-kingdom vs Five-kingdom:</span> Old two-kingdom system grouped bacteria and fungi with plants. Five-kingdom separates them based on cell structure and nutrition mode.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Whittaker proposed 5 kingdoms in 1969. Classification criteria: cell structure, nutrition mode, body organization, reproduction, and phylogenetic relationships.</p></div></div>) },
    { title: "Kingdom Monera", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Bacteria shapes:</span> Cocci (spherical), Bacilli (rod), Vibrio (comma), Spirillum (spiral).</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Gram Positive</th><th className="border border-gray-300 p-2">Gram Negative</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Cell Wall</td><td className="border border-gray-300 p-2">Thick peptidoglycan</td><td className="border border-gray-300 p-2">Thin peptidoglycan + Outer membrane</td></tr><tr><td className="border border-gray-300 p-2">Gram Stain</td><td className="border border-gray-300 p-2">Purple/Blue</td><td className="border border-gray-300 p-2">Pink/Red</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Example</td><td className="border border-gray-300 p-2">Bacillus, Streptococcus</td><td className="border border-gray-300 p-2">E. coli, Salmonella</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Nutritional types:</span> Photoautotroph (light + CO<sub>2</sub>), Chemoautotroph (chemical energy), Photoheterotroph (light + organic), Chemoheterotroph (organic compounds).</p><p className="text-sm"><span className="font-semibold text-green-800">Archaebacteria:</span> Methanogens (produce CH<sub>4</sub>), Halophiles (extreme salt), Thermoacidophiles (hot acidic). <span className="font-semibold text-green-800">Cyanobacteria:</span> Photosynthetic prokaryotes with heterocysts for N<sub>2</sub> fixation. <span className="font-semibold text-green-800">Mycoplasma:</span> Smallest living organism, no cell wall, pathogenic.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Archaebacteria thrive in extreme environments. Mycoplasma = smallest cell, lacks cell wall. Cyanobacteria = photosynthetic prokaryotes with heterocysts for nitrogen fixation.</p></div></div>) },
    { title: "Kingdom Protista", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Chrysophytes:</span> Diatoms (diatomaceous earth, silica shells), Desmids. <span className="font-semibold text-green-800">Dinoflagellates:</span> Cause red tides, bioluminescent (Noctiluca). <span className="font-semibold text-green-800">Euglenoids:</span> Mixotrophic (Euglena), pellicle not cell wall. <span className="font-semibold text-green-800">Slime moulds:</span> Saprophytic, form spores.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Protozoan Class</th><th className="border border-gray-300 p-2">Locomotion</th><th className="border border-gray-300 p-2">Example</th><th className="border border-gray-300 p-2">Notes</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Sarcodina</td><td className="border border-gray-300 p-2">Pseudopodia</td><td className="border border-gray-300 p-2">Amoeba</td><td className="border border-gray-300 p-2">False feet</td></tr><tr><td className="border border-gray-300 p-2">Ciliata</td><td className="border border-gray-300 p-2">Cilia</td><td className="border border-gray-300 p-2">Paramecium</td><td className="border border-gray-300 p-2">Hair-like structures</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Sporozoa</td><td className="border border-gray-300 p-2">Absent</td><td className="border border-gray-300 p-2">Plasmodium</td><td className="border border-gray-300 p-2">Causes malaria</td></tr><tr><td className="border border-gray-300 p-2">Flagellata</td><td className="border border-gray-300 p-2">Flagella</td><td className="border border-gray-300 p-2">Trypanosoma</td><td className="border border-gray-300 p-2">Whip-like tail</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Diatoms = &quot;chief producers in oceans&quot;. Euglena = plant-animal link (autotrophic + heterotrophic). Plasmodium = Sporozoan causing malaria.</p></div></div>) },
    { title: "Kingdom Fungi", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">General features:</span> Heterotrophic, chitin cell wall, glycogen storage.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Phylum</th><th className="border border-gray-300 p-2">Spore Type</th><th className="border border-gray-300 p-2">Examples</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Phycomycetes</td><td className="border border-gray-300 p-2">Zoospores, Conidia</td><td className="border border-gray-300 p-2">Mucor, Rhizopus</td></tr><tr><td className="border border-gray-300 p-2">Ascomycetes</td><td className="border border-gray-300 p-2">Ascospores</td><td className="border border-gray-300 p-2">Yeast, Aspergillus, Neurospora</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Basidiomycetes</td><td className="border border-gray-300 p-2">Basidiospores</td><td className="border border-gray-300 p-2">Agaricus, Ustilago, Puccinia</td></tr><tr><td className="border border-gray-300 p-2">Deuteromycetes</td><td className="border border-gray-300 p-2">Conidia only</td><td className="border border-gray-300 p-2">Alternaria, Colletotrichum, Trichoderma</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Asexual reproduction:</span> Zoospores, conidia, budding. <span className="font-semibold text-green-800">Sexual:</span> Plasmogamy → Karyogamy → Meiosis. <span className="font-semibold text-green-800">Lichens:</span> Algae (phycobiont) + Fungi (mycobiont) symbiosis. <span className="font-semibold text-green-800">Mycorrhiza:</span> Fungal association with plant roots.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Deuteromycetes = &quot;imperfect fungi&quot; (no sexual stage known). Lichens = pollution indicators. Neurospora = genetics model organism.</p></div></div>) },
    { title: "Viruses, Viroids and Prions", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Virus structure:</span> Nucleic acid (DNA/RNA) + Protein coat (capsid). Show both living and non-living characters.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Type</th><th className="border border-gray-300 p-2">Nucleic Acid</th><th className="border border-gray-300 p-2">Example</th><th className="border border-gray-300 p-2">Characteristics</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">TMV</td><td className="border border-gray-300 p-2">ssRNA</td><td className="border border-gray-300 p-2">Tobacco Mosaic Virus</td><td className="border border-gray-300 p-2">Plant pathogen</td></tr><tr><td className="border border-gray-300 p-2">Bacteriophage</td><td className="border border-gray-300 p-2">dsDNA</td><td className="border border-gray-300 p-2">Lambda phage</td><td className="border border-gray-300 p-2">Infects bacteria</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">HIV</td><td className="border border-gray-300 p-2">ssRNA</td><td className="border border-gray-300 p-2">Retrovirus</td><td className="border border-gray-300 p-2">Causes AIDS</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Viroids:</span> Free RNA without protein coat (Potato Spindle Tuber Viroid). <span className="font-semibold text-green-800">Prions:</span> Misfolded proteins, no nucleic acid (Mad Cow Disease, Creutzfeldt-Jakob Disease).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Viroids discovered by Diener (1971). Prions identified by Stanley Prusiner. TMV discovered by Ivanowsky (1892), crystallised by Stanley (1935).</p></div></div>) },
  ],
}

  const theLivingWorldContent = {
  topics: [
    { title: "What is Living?", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><div><p className="font-semibold text-green-800">Properties of Living Organisms</p><p className="text-sm"><span className="font-semibold text-green-800">Growth:</span> Increase in mass/number. Plants have open growth (throughout life), animals have closed growth (to a point). <span className="font-semibold text-green-800">Reproduction:</span> Not a defining feature (mules, worker bees don&apos;t reproduce). <span className="font-semibold text-green-800">Metabolism:</span> SUM of all chemical reactions — most defining feature of life. <span className="font-semibold text-green-800">Cellular Organization:</span> All living things are made of cells. <span className="font-semibold text-green-800">Consciousness:</span> Response to stimuli — most defining property (even plants respond).</p></div><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Metabolism is the DEFINING property of life. Growth alone doesn&apos;t define life (crystals grow). Reproduction is NOT universal (mules are sterile). Consciousness/irritability is shown by all living organisms.</p></div></div>) },
    { title: "Biodiversity and Need for Classification", pyqFrequency: "Medium" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Biodiversity:</span> Approximately 1.7-1.8 million species described on Earth.</p><p className="text-sm"><span className="font-semibold text-green-800">Nomenclature:</span> ICBN (International Code of Botanical Nomenclature) for plants; ICZN (International Code of Zoological Nomenclature) for animals.</p><p className="text-sm"><span className="font-semibold text-green-800">Binomial Nomenclature (Linnaeus):</span> Genus + species. Italicized, genus capitalized. Rules: Latin/derived from Latin, printed in italics, handwritten underlined separately, author name at end.</p><p className="text-sm">Identification, classification, and nomenclature are the three steps of taxonomy.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Binomial nomenclature = Carolus Linnaeus. ICBN for plants, ICZN for animals. Scientific names are ALWAYS in italics or underlined separately.</p></div></div>) },
    { title: "Taxonomic Hierarchy", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Rank</th><th className="border border-gray-300 p-2">Human Example</th><th className="border border-gray-300 p-2">Wheat Example</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Kingdom</td><td className="border border-gray-300 p-2">Animalia</td><td className="border border-gray-300 p-2">Plantae</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Phylum/Division</td><td className="border border-gray-300 p-2">Chordata</td><td className="border border-gray-300 p-2">Angiospermae</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Class</td><td className="border border-gray-300 p-2">Mammalia</td><td className="border border-gray-300 p-2">Monocotyledonae</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Order</td><td className="border border-gray-300 p-2">Primates</td><td className="border border-gray-300 p-2">Poales</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Family</td><td className="border border-gray-300 p-2">Hominidae</td><td className="border border-gray-300 p-2">Poaceae</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Genus</td><td className="border border-gray-300 p-2">Homo</td><td className="border border-gray-300 p-2">Triticum</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Species</td><td className="border border-gray-300 p-2">sapiens</td><td className="border border-gray-300 p-2">aestivum</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Species</span> is the BASIC unit of classification. As we go from species → kingdom: common characters DECREASE, number of organisms INCREASE.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Mnemonic: &quot;King Philip Came Over For Good Spaghetti&quot;. Species is the basic unit. Moving up hierarchy = fewer shared characters, more organisms.</p></div></div>) },
    { title: "Taxonomic Aids", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Herbarium:</span> Dried, pressed plant specimens on sheets with collection data. <span className="font-semibold text-green-800">Botanical Gardens:</span> Living plant collections (Kew Gardens London, Indian Botanical Garden Kolkata). <span className="font-semibold text-green-800">Museum:</span> Preserved specimens in jars with formalin. <span className="font-semibold text-green-800">Zoological Parks:</span> Wild animals in captivity for study and conservation.</p><p className="text-sm"><span className="font-semibold text-green-800">Taxonomic Keys:</span> Paired contrasting characters (couplets) for identification. Based on dichotomous choice. <span className="font-semibold text-green-800">Taxonomic Literature:</span> Flora (plants of area), Fauna (animals of area), Monograph (detailed study of one group), Manual (identification guide).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Keys use DICHOTOMOUS (two contrasting) characters in couplets. Herbarium = dried pressed plants. Flora = plants of region. Manual = practical identification guide.</p></div></div>) },
    { title: "Taxonomy and Systematics", pyqFrequency: "Low" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Taxonomy:</span> Study of principles of identification, nomenclature, and classification. <span className="font-semibold text-green-800">Systematics:</span> Study of diversity and evolutionary relationships of organisms (broader than taxonomy).</p><p className="text-sm"><span className="font-semibold text-green-800">Processes:</span> Characterization → Identification → Nomenclature → Classification. <span className="font-semibold text-green-800">New Systematics/Biosystematics:</span> Considers morphological + ecological + genetic data (molecular, chromosomal).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Taxonomy = classification. Systematics = evolutionary relationships. New systematics considers ALL types of data (morphology, ecology, genetics).</p></div></div>) },
  ],
}

  const plantKingdomContent = {
  topics: [
    { title: "Algae", pyqFrequency: "High" as const, content: (<div className="space-y-4"><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Chlorophyceae (Green)</th><th className="border border-gray-300 p-2">Phaeophyceae (Brown)</th><th className="border border-gray-300 p-2">Rhodophyceae (Red)</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Examples</td><td className="border border-gray-300 p-2">Chlamydomonas, Spirogyra, Ulva</td><td className="border border-gray-300 p-2">Fucus, Laminaria, Sargassum</td><td className="border border-gray-300 p-2">Polysiphonia, Porphyra, Gracilaria</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Pigments</td><td className="border border-gray-300 p-2">Chlorophyll a &amp; b</td><td className="border border-gray-300 p-2">Chlorophyll a &amp; c, Fucoxanthin</td><td className="border border-gray-300 p-2">Chlorophyll a &amp; d, r-Phycoerythrin</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Storage</td><td className="border border-gray-300 p-2">Starch</td><td className="border border-gray-300 p-2">Mannitol &amp; Laminarin</td><td className="border border-gray-300 p-2">Floridean Starch</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Cell Wall</td><td className="border border-gray-300 p-2">Cellulose</td><td className="border border-gray-300 p-2">Cellulose &amp; Algin</td><td className="border border-gray-300 p-2">Cellulose &amp; Pectin</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Habitat</td><td className="border border-gray-300 p-2">Mostly Freshwater</td><td className="border border-gray-300 p-2">Marine</td><td className="border border-gray-300 p-2">Marine (Deep Water)</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Economic:</span> Agar from Gelidium/Gracilaria (red algae). Algin from brown algae. <span className="font-semibold text-green-800">Reproduction:</span> Vegetative (fragmentation), Asexual (zoospores), Sexual (isogamous, anisogamous, oogamous).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Chlorophyceae = green (freshwater). Phaeophyceae = brown (marine). Rhodophyceae = red (marine, deepest). Agar from red algae. Oogamy = large non-motile egg + small motile sperm.</p></div></div>) },
    { title: "Bryophytes", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">&quot;Amphibians of plant kingdom&quot;</span> — need water for fertilisation. Dominant phase: gametophyte (n). Sporophyte dependent on gametophyte.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Liverworts</th><th className="border border-gray-300 p-2">Mosses</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Body</td><td className="border border-gray-300 p-2">Thalloid (Marchantia)</td><td className="border border-gray-300 p-2">Leafy with stem-like structure</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Protonema</td><td className="border border-gray-300 p-2">Absent</td><td className="border border-gray-300 p-2">Present</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Rhizoids</td><td className="border border-gray-300 p-2">Unicellular</td><td className="border border-gray-300 p-2">Multicellular</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Examples</td><td className="border border-gray-300 p-2">Marchantia, Riccia</td><td className="border border-gray-300 p-2">Funaria, Sphagnum</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Alternation of generations:</span> Haploid gametophyte (n) → gametes → fertilisation → diploid sporophyte (2n) → spores → gametophyte.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Bryophytes = &quot;amphibians of plant kingdom&quot;. Gametophyte DOMINANT. Mosses show protonema stage. Sphagnum = peat moss.</p></div></div>) },
    { title: "Pteridophytes", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">First vascular plants</span> (xylem + phloem). Dominant phase: sporophyte (2n).</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Division</th><th className="border border-gray-300 p-2">Example</th><th className="border border-gray-300 p-2">Features</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Psilopsida</td><td className="border border-gray-300 p-2">Psilotum</td><td className="border border-gray-300 p-2">Most primitive</td></tr><tr><td className="border border-gray-300 p-2">Lycopsida</td><td className="border border-gray-300 p-2">Selaginella, Lycopodium</td><td className="border border-gray-300 p-2">Club mosses</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Sphenopsida</td><td className="border border-gray-300 p-2">Equisetum</td><td className="border border-gray-300 p-2">Horsetails</td></tr><tr><td className="border border-gray-300 p-2">Pteropsida</td><td className="border border-gray-300 p-2">Dryopteris, Adiantum</td><td className="border border-gray-300 p-2">True ferns</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Heterosporous:</span> Selaginella produces microspores + megaspores → precursor to seed habit. Sporangia in sori on underside of fronds. Life cycle: sporophyte → spores → prothallus (gametophyte) → gametes → sporophyte.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Pteridophytes = first vascular cryptogams. Sporophyte DOMINANT. Selaginella = heterosporous (forerunner of seed habit). Prothallus = independent gametophyte.</p></div></div>) },
    { title: "Gymnosperms", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">&quot;Naked seeds&quot;</span> — ovules not enclosed in ovary. Examples: Cycas (coralloid roots with cyanobacteria for N<sub>2</sub> fixation), Pinus, Ginkgo (living fossil), Sequoia (tallest tree), Cedrus.</p><p className="text-sm"><span className="font-semibold text-green-800">Heterosporous:</span> Male cones (microsporangia → pollen). Female cones (megasporangia → ovules). Pollination by wind (anemophily). Pollen tube → siphonogamy (no water needed).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Gymnosperms = &quot;naked seeds&quot;. Sequoia = tallest. Cycas has coralloid roots (N<sub>2</sub> fixation). Pollen tube = siphonogamy. Endosperm is haploid (n) in gymnosperms vs triploid (3n) in angiosperms.</p></div></div>) },
    { title: "Angiosperms and Alternation of Generations", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">&quot;Enclosed seeds&quot;</span> — ovules inside ovary → fruit. Double fertilisation unique to angiosperms.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Dicots</th><th className="border border-gray-300 p-2">Monocots</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Cotyledons</td><td className="border border-gray-300 p-2">2</td><td className="border border-gray-300 p-2">1</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Root</td><td className="border border-gray-300 p-2">Tap root</td><td className="border border-gray-300 p-2">Fibrous root</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Venation</td><td className="border border-gray-300 p-2">Reticulate</td><td className="border border-gray-300 p-2">Parallel</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Flower parts</td><td className="border border-gray-300 p-2">4 or 5</td><td className="border border-gray-300 p-2">3 or multiples</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Vascular bundles</td><td className="border border-gray-300 p-2">Open, ring</td><td className="border border-gray-300 p-2">Closed, scattered</td></tr></tbody></table><p className="text-sm"><span className="font-semibold text-green-800">Life cycle types:</span> Haplontic (dominant gametophyte, algae), Diplontic (dominant sporophyte, gymnosperms/angiosperms), Haplo-diplontic (bryophytes/pteridophytes).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Double fertilisation UNIQUE to angiosperms. Haplontic = dominant gametophyte. Diplontic = dominant sporophyte. Dicot vs Monocot differences are HIGH-frequency NEET questions.</p></div></div>) },
  ],
}

  const animalKingdomContent = {
  topics: [
    { title: "Basis of Classification", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Levels of Organisation:</span> Cellular (Porifera), Tissue (Cnidaria), Organ (Platyhelminthes), Organ system (Annelida onwards). <span className="font-semibold text-green-800">Symmetry:</span> Asymmetrical (sponges), Radial (Cnidaria, Echinodermata), Bilateral (most animals).</p><p className="text-sm"><span className="font-semibold text-green-800">Germ Layers:</span> Diploblastic = 2 layers (Cnidaria). Triploblastic = 3 layers (Platyhelminthes onwards). <span className="font-semibold text-green-800">Coelom:</span> Acoelomate (Platyhelminthes), Pseudocoelomate (Aschelminthes), Coelomate (Annelida onwards).</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Diploblastic = Cnidaria ONLY. Pseudocoelom = derived from blastocoel. True coelom = lined by mesoderm. Echinoderms have radial symmetry as adults but bilateral larvae.</p></div></div>) },
    { title: "Non-Chordata: Porifera to Ctenophora", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Porifera:</span> Pore-bearing, choanocytes (collar cells), spicules. Examples: Sycon, Euspongia, Spongilla. <span className="font-semibold text-green-800">Cnidaria:</span> Cnidocytes/nematocysts, polyp &amp; medusa forms. Examples: Hydra, Obelia, Aurelia, coral. <span className="font-semibold text-green-800">Ctenophora:</span> Comb plates (ctenes), bioluminescence. Examples: Pleurobrachia.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Porifera</th><th className="border border-gray-300 p-2">Cnidaria</th><th className="border border-gray-300 p-2">Ctenophora</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Symmetry</td><td className="border border-gray-300 p-2">Asymmetrical</td><td className="border border-gray-300 p-2">Radial</td><td className="border border-gray-300 p-2">Bilateral</td></tr><tr><td className="border border-gray-300 p-2">Germ Layers</td><td className="border border-gray-300 p-2">—</td><td className="border border-gray-300 p-2">Diploblastic</td><td className="border border-gray-300 p-2">Diploblastic</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Special Feature</td><td className="border border-gray-300 p-2">Choanocytes, spicules</td><td className="border border-gray-300 p-2">Cnidocytes</td><td className="border border-gray-300 p-2">Comb plates</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Porifera = cellular level. Cnidaria = tissue level. Cnidocytes UNIQUE to Cnidaria. Corals = colonial cnidarians with CaCO<sub>3</sub> skeleton.</p></div></div>) },
    { title: "Platyhelminthes to Aschelminthes", pyqFrequency: "High" as const, content: (<div className="space-y-4"><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Platyhelminthes</th><th className="border border-gray-300 p-2">Aschelminthes</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Coelom</td><td className="border border-gray-300 p-2">Acoelomate</td><td className="border border-gray-300 p-2">Pseudocoelomate</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Digestive system</td><td className="border border-gray-300 p-2">Incomplete (1 opening)</td><td className="border border-gray-300 p-2">Complete (2 openings)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Excretion</td><td className="border border-gray-300 p-2">Flame cells</td><td className="border border-gray-300 p-2">Excretory glands</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Examples</td><td className="border border-gray-300 p-2">Taenia, Fasciola, Planaria</td><td className="border border-gray-300 p-2">Ascaris, Wuchereria, Ancylostoma</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Flatworms = ACOELOMATE + incomplete gut. Roundworms = PSEUDOCOELOMATE + complete gut. Flame cells = excretory in Platyhelminthes. Wuchereria causes filariasis/elephantiasis.</p></div></div>) },
    { title: "Annelida to Arthropoda", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Feature</th><th className="border border-gray-300 p-2">Annelida</th><th className="border border-gray-300 p-2">Mollusca</th><th className="border border-gray-300 p-2">Arthropoda</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Segmentation</td><td className="border border-gray-300 p-2">Yes (metameric)</td><td className="border border-gray-300 p-2">No</td><td className="border border-gray-300 p-2">Yes</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Circulatory</td><td className="border border-gray-300 p-2">Closed</td><td className="border border-gray-300 p-2">Open</td><td className="border border-gray-300 p-2">Open (haemocoel)</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2 font-semibold">Excretion</td><td className="border border-gray-300 p-2">Nephridia</td><td className="border border-gray-300 p-2">Kidney</td><td className="border border-gray-300 p-2">Malpighian tubules</td></tr><tr><td className="border border-gray-300 p-2 font-semibold">Examples</td><td className="border border-gray-300 p-2">Pheretima, Hirudinaria</td><td className="border border-gray-300 p-2">Pila, Octopus, Pinctada</td><td className="border border-gray-300 p-2">Apis, Bombyx, Limulus</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Arthropoda = LARGEST phylum. Open circulation in Arthropoda &amp; Mollusca (haemocoel). Closed circulation in Annelida. Malpighian tubules = excretory in Arthropoda.</p></div></div>) },
    { title: "Echinodermata to Hemichordata", pyqFrequency: "High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">Echinodermata:</span> Spiny skin, water vascular system (tube feet), radial symmetry (adults), bilateral (larvae), endoskeleton of calcareous ossicles. Examples: Asterias, Echinus, Antedon, Cucumaria, Ophiura.</p><p className="text-sm"><span className="font-semibold text-green-800">Hemichordata:</span> Stomochord (rudimentary notochord-like), gill slits. Examples: Balanoglossus, Saccoglossus. Previously classified with Chordates, now separate.</p><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Water vascular system UNIQUE to Echinoderms. Echinoderms = ONLY non-chordate coelomates with radial symmetry. Hemichordata has stomochord (NOT true notochord).</p></div></div>) },
    { title: "Phylum Chordata", pyqFrequency: "Very High" as const, content: (<div className="space-y-4"><p className="text-sm"><span className="font-semibold text-green-800">3 Defining Features:</span> Notochord, dorsal hollow nerve cord, pharyngeal gill slits. <span className="font-semibold text-green-800">Subphyla:</span> Urochordata (Ascidia), Cephalochordata (Amphioxus), Vertebrata.</p><table className="w-full border-collapse border border-gray-300 my-4 text-xs"><thead><tr className="bg-green-50"><th className="border border-gray-300 p-2">Class</th><th className="border border-gray-300 p-2">Key Features</th><th className="border border-gray-300 p-2">Heart</th><th className="border border-gray-300 p-2">Examples</th></tr></thead><tbody><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Cyclostomata</td><td className="border border-gray-300 p-2">Jawless, circular mouth</td><td className="border border-gray-300 p-2">2-chambered</td><td className="border border-gray-300 p-2">Petromyzon (lamprey)</td></tr><tr><td className="border border-gray-300 p-2">Chondrichthyes</td><td className="border border-gray-300 p-2">Cartilaginous, fins, gills</td><td className="border border-gray-300 p-2">2-chambered</td><td className="border border-gray-300 p-2">Sharks, Rays</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Osteichthyes</td><td className="border border-gray-300 p-2">Bony, lateral line</td><td className="border border-gray-300 p-2">2-chambered</td><td className="border border-gray-300 p-2">Labeo, Hippocampus</td></tr><tr><td className="border border-gray-300 p-2">Amphibia</td><td className="border border-gray-300 p-2">Moist skin, metamorphosis</td><td className="border border-gray-300 p-2">3-chambered</td><td className="border border-gray-300 p-2">Rana, Bufo, Salamandra</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Reptilia</td><td className="border border-gray-300 p-2">Dry scaly skin, eggs</td><td className="border border-gray-300 p-2">3 (4 in croc)</td><td className="border border-gray-300 p-2">Chelone, Naja, Crocodilus</td></tr><tr><td className="border border-gray-300 p-2">Aves</td><td className="border border-gray-300 p-2">Feathers, pneumatic bones</td><td className="border border-gray-300 p-2">4-chambered</td><td className="border border-gray-300 p-2">Corvus, Struthio</td></tr><tr className="bg-gray-50"><td className="border border-gray-300 p-2">Mammalia</td><td className="border border-gray-300 p-2">Mammary glands, diaphragm</td><td className="border border-gray-300 p-2">4-chambered</td><td className="border border-gray-300 p-2">Macropus, Balaenoptera, Homo</td></tr></tbody></table><div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3"><p className="font-semibold text-yellow-800 text-sm">NEET TIP: Crocodile = ONLY reptile with 4-chambered heart. Whale = mammal (NOT fish). Platypus &amp; Echidna = egg-laying mammals (Prototheria). Ostrich = largest living bird (flightless).</p></div></div>) },
  ],
}

  const morphologyContent = {
  topics: [
    {
      title: "Root System",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <p>
            Roots are classified into two main types based on plant type: <span className="font-semibold text-green-800">Tap roots</span> (found in dicots like mustard and mango) develop from a single primary root, while <span className="font-semibold text-green-800">Fibrous roots</span> (found in monocots like wheat and rice) consist of many fine, thread-like roots of similar size.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <strong>NEET TIP:</strong> Sweet potato is a modified <span className="font-semibold">ADVENTITIOUS root</span> (not tap root). Carrot and turnip are modified <span className="font-semibold">TAP roots</span>. Pneumatophores have lenticels for gas exchange.
          </div>

          <p><strong>Root Modifications:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Pneumatophores</span> (Rhizophora mangrove) - aerial roots that breathe through lenticels</li>
            <li><span className="font-semibold text-green-800">Prop roots</span> (Banyan tree) - provide mechanical support</li>
            <li><span className="font-semibold text-green-800">Stilt roots</span> (Maize, Sugarcane) - adventitious roots extending from stem for support</li>
            <li><span className="font-semibold text-green-800">Storage roots</span> - conical (Carrot), napiform (Turnip), fusiform (Radish), tuberous/adventitious (Sweet potato)</li>
          </ul>

          <p><strong>Regions of Root (from apex to base):</strong></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Region</th>
                <th className="border border-gray-300 p-2 text-left">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Root cap</span></td>
                <td className="border border-gray-300 p-2">Protects root apex from mechanical injury</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Meristematic zone</span></td>
                <td className="border border-gray-300 p-2">Cell division and formation of new cells</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Elongation zone</span></td>
                <td className="border border-gray-300 p-2">Cells elongate; root extends downward</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Maturation zone</span></td>
                <td className="border border-gray-300 p-2">Root hairs develop; water &amp; nutrient absorption</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Root Modifications Table:</strong></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Modification Type</th>
                <th className="border border-gray-300 p-2 text-left">Example</th>
                <th className="border border-gray-300 p-2 text-left">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Pneumatophore</td>
                <td className="border border-gray-300 p-2">Rhizophora</td>
                <td className="border border-gray-300 p-2">Aeration in waterlogged soil</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Prop root</td>
                <td className="border border-gray-300 p-2">Banyan</td>
                <td className="border border-gray-300 p-2">Support &amp; anchorage</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Stilt root</td>
                <td className="border border-gray-300 p-2">Maize, Sugarcane</td>
                <td className="border border-gray-300 p-2">Mechanical support</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Storage root (conical)</td>
                <td className="border border-gray-300 p-2">Carrot</td>
                <td className="border border-gray-300 p-2">Food storage</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Storage root (napiform)</td>
                <td className="border border-gray-300 p-2">Turnip</td>
                <td className="border border-gray-300 p-2">Food storage</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Storage root (tuberous)</td>
                <td className="border border-gray-300 p-2">Sweet potato</td>
                <td className="border border-gray-300 p-2">Food storage (adventitious root)</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Stem Modifications",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <p>
            <span className="font-semibold text-green-800">Stem modifications</span> are adaptations of stems to perform specialized functions like storage, support, or protection. They are classified based on their position relative to the ground.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <strong>NEET TIP:</strong> Potato is a modified <span className="font-semibold">STEM</span> (has nodes/eyes/buds). Sweet potato is a modified <span className="font-semibold">ROOT</span> (no nodes). Thorn of Bougainvillea is an axillary bud modified as a thorn. Spine of cactus is a modified <span className="font-semibold">LEAF</span>.
          </div>

          <p><strong>Underground Stem Modifications:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Rhizome</span> (Ginger) - horizontal underground stem with nodes and internodes</li>
            <li><span className="font-semibold text-green-800">Tuber</span> (Potato) - swollen underground stem; eyes are nodes containing buds</li>
            <li><span className="font-semibold text-green-800">Bulb</span> (Onion) - underground stem surrounded by fleshy leaf bases</li>
            <li><span className="font-semibold text-green-800">Corm</span> (Colocasia) - short, solid, underground stem</li>
          </ul>

          <p><strong>Aerial Stem Modifications:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Tendril</span> (Grape vine) - modified stem for climbing support</li>
            <li><span className="font-semibold text-green-800">Thorn</span> (Bougainvillea) - axillary bud modified for protection</li>
            <li><span className="font-semibold text-green-800">Phylloclade</span> (Opuntia) - flattened stem for photosynthesis; functions as leaf</li>
          </ul>

          <p><strong>Sub-aerial Stem Modifications (Runners &amp; Stolons):</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Runner</span> (Grass) - horizontal stem growing along ground with long internodes</li>
            <li><span className="font-semibold text-green-800">Stolon</span> (Strawberry) - prostrate stem with short internodes, produces plantlets at nodes</li>
            <li><span className="font-semibold text-green-800">Offset</span> (Water hyacinth/Eichhornia) - short lateral branch for vegetative reproduction</li>
            <li><span className="font-semibold text-green-800">Sucker</span> (Mint) - underground lateral stem that produces adventitious roots and shoots</li>
          </ul>

          <p><strong>Stem Modifications Comparison Table:</strong></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">Example</th>
                <th className="border border-gray-300 p-2 text-left">Characteristics</th>
                <th className="border border-gray-300 p-2 text-left">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Rhizome</td>
                <td className="border border-gray-300 p-2">Ginger</td>
                <td className="border border-gray-300 p-2">Horizontal, underground, fleshy</td>
                <td className="border border-gray-300 p-2">Storage &amp; vegetative reproduction</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Tuber</td>
                <td className="border border-gray-300 p-2">Potato</td>
                <td className="border border-gray-300 p-2">Swollen, eyes/nodes with buds</td>
                <td className="border border-gray-300 p-2">Storage &amp; vegetative reproduction</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Bulb</td>
                <td className="border border-gray-300 p-2">Onion</td>
                <td className="border border-gray-300 p-2">Underground, fleshy leaf bases</td>
                <td className="border border-gray-300 p-2">Storage &amp; survival during dormancy</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Corm</td>
                <td className="border border-gray-300 p-2">Colocasia</td>
                <td className="border border-gray-300 p-2">Short, solid, underground stem</td>
                <td className="border border-gray-300 p-2">Storage &amp; vegetative reproduction</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Phylloclade</td>
                <td className="border border-gray-300 p-2">Opuntia</td>
                <td className="border border-gray-300 p-2">Flattened, green, aerial</td>
                <td className="border border-gray-300 p-2">Photosynthesis in xerophytes</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Leaf Morphology and Modifications",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <p>
            <span className="font-semibold text-green-800">Leaves</span> are the primary photosynthetic organs. A typical leaf consists of a <span className="font-semibold text-green-800">lamina</span> (blade), <span className="font-semibold text-green-800">petiole</span> (stalk), and <span className="font-semibold text-green-800">leaf base</span>.
          </p>

          <p><strong>Venation Patterns:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Reticulate venation</span> - net-like vein pattern; found in dicots</li>
            <li><span className="font-semibold text-green-800">Parallel venation</span> - parallel veins; found in monocots</li>
          </ul>

          <p><strong>Leaf Types:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Simple leaves</span> - single lamina (e.g., mango)</li>
            <li><span className="font-semibold text-green-800">Compound leaves</span> - lamina divided into leaflets
              <ul className="list-circle list-inside ml-4 space-y-1">
                <li>Pinnately compound - leaflets arranged on central axis (Neem)</li>
                <li>Palmately compound - leaflets arranged from single point (Silk cotton)</li>
              </ul>
            </li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <strong>NEET TIP:</strong> Spines of cactus are modified <span className="font-semibold">LEAVES</span>. Thorns of Bougainvillea are modified <span className="font-semibold">STEM</span> (axillary bud). Tendrils of pea are modified <span className="font-semibold">LEAF</span>. Tendrils of grape are modified <span className="font-semibold">STEM</span>. <span className="font-semibold">Very frequently confused in NEET!</span>
          </div>

          <p><strong>Phyllotaxy (Leaf Arrangement):</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Alternate</span> - one leaf per node on alternate sides (Sunflower)</li>
            <li><span className="font-semibold text-green-800">Opposite</span> - two leaves per node on opposite sides (Calotropis)</li>
            <li><span className="font-semibold text-green-800">Whorled</span> - three or more leaves per node (Alstonia)</li>
          </ul>

          <p><strong>Leaf Modifications:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Tendril</span> (Pea) - modified leaf for climbing; terminal leaflet becomes tendril</li>
            <li><span className="font-semibold text-green-800">Spine</span> (Cactus) - modified leaf for protection; reduces transpiration in xerophytes</li>
            <li><span className="font-semibold text-green-800">Storage leaves</span> (Onion) - fleshy leaves storing food &amp; water</li>
            <li><span className="font-semibold text-green-800">Phyllode</span> (Australian Acacia) - petiole becomes flattened &amp; leaf-like; performs photosynthesis</li>
            <li><span className="font-semibold text-green-800">Insectivorous leaves:</span>
              <ul className="list-circle list-inside ml-4 space-y-1">
                <li>Pitcher plant (Nepenthes) - pitcher-shaped leaf for insect trapping</li>
                <li>Venus flytrap (Dionaea) - sensitive lobes that snap shut</li>
                <li>Sundew (Drosera) - sticky glandular hairs trap insects</li>
                <li>Bladderwort (Utricularia) - bladder-shaped traps with trigger hairs</li>
              </ul>
            </li>
          </ul>

          <p><strong>Leaf Modifications Comparison Table:</strong></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Modification</th>
                <th className="border border-gray-300 p-2 text-left">Example</th>
                <th className="border border-gray-300 p-2 text-left">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Tendril</td>
                <td className="border border-gray-300 p-2">Pea</td>
                <td className="border border-gray-300 p-2">Climbing &amp; support</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Spine</td>
                <td className="border border-gray-300 p-2">Cactus</td>
                <td className="border border-gray-300 p-2">Protection &amp; reduce transpiration</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Storage leaf</td>
                <td className="border border-gray-300 p-2">Onion</td>
                <td className="border border-gray-300 p-2">Food &amp; water storage</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Phyllode</td>
                <td className="border border-gray-300 p-2">Australian Acacia</td>
                <td className="border border-gray-300 p-2">Photosynthesis (modified petiole)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Pitcher (insectivorous)</td>
                <td className="border border-gray-300 p-2">Nepenthes</td>
                <td className="border border-gray-300 p-2">Nutrient absorption from insects</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Inflorescence and Flower Structure",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p>
            <span className="font-semibold text-green-800">Inflorescence</span> is the arrangement of flowers on the main axis of the plant. <span className="font-semibold text-green-800">Flower</span> is the reproductive organ containing male &amp; female parts.
          </p>

          <p><strong>Types of Inflorescence:</strong></p>
          <p><span className="font-semibold text-green-800">Racemose Inflorescence</span> (main axis shows unlimited growth):</p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Raceme</span> - flowers on pedicels arising from main axis (mustard)</li>
            <li><span className="font-semibold text-green-800">Spike</span> - flowers sessile on main axis (wheat)</li>
            <li><span className="font-semibold text-green-800">Umbel</span> - pedicels arise from same point on axis (carrot, fennel)</li>
            <li><span className="font-semibold text-green-800">Capitulum</span> - flat receptacle with many sessile flowers (Sunflower) - <span className="font-semibold">NOT a single flower</span></li>
          </ul>

          <p><span className="font-semibold text-green-800">Cymose Inflorescence</span> (main axis shows limited growth):</p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Monochasial cyme</span> - one lateral branch at each node</li>
            <li><span className="font-semibold text-green-800">Dichasial cyme</span> - two lateral branches at each node</li>
            <li><span className="font-semibold text-green-800">Polychasial cyme</span> - more than two lateral branches at each node</li>
          </ul>

          <p><strong>Parts of a Flower:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Calyx</span> - outermost whorl; consists of sepals (protective function)</li>
            <li><span className="font-semibold text-green-800">Corolla</span> - second whorl; consists of petals (colorful, attracts pollinators)</li>
            <li><span className="font-semibold text-green-800">Androecium</span> - third whorl; male reproductive organ consisting of stamens (filament + anther)</li>
            <li><span className="font-semibold text-green-800">Gynoecium</span> - fourth whorl; female reproductive organ consisting of pistil (stigma + style + ovary)</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <strong>NEET TIP:</strong> Capitulum is an <span className="font-semibold">INFLORESCENCE</span> of sunflower, not a single flower. Pea flower has <span className="font-semibold">vexillary aestivation</span> (papilionaceous). Placentation types are <span className="font-semibold">HIGH FREQUENCY</span>. Mustard = parietal, Pea = marginal, Lemon = axile.
          </div>

          <p><strong>Aestivation (Arrangement of Floral Parts in Bud):</strong></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">Example</th>
                <th className="border border-gray-300 p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Valvate</span></td>
                <td className="border border-gray-300 p-2">Calotropis</td>
                <td className="border border-gray-300 p-2">Parts just touch at edges, do not overlap</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Twisted</span></td>
                <td className="border border-gray-300 p-2">China rose</td>
                <td className="border border-gray-300 p-2">Parts overlap in spiral manner</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Imbricate</span></td>
                <td className="border border-gray-300 p-2">Cassia, Gulmohar</td>
                <td className="border border-gray-300 p-2">Parts overlap like roof tiles</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Vexillary</span></td>
                <td className="border border-gray-300 p-2">Pea (Papilionaceous)</td>
                <td className="border border-gray-300 p-2">One large petal overlaps two lateral petals, which overlap keel petals</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Placentation Types (Position of Ovules in Ovary):</strong></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">Example</th>
                <th className="border border-gray-300 p-2 text-left">Position of Ovules</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Marginal</span></td>
                <td className="border border-gray-300 p-2">Pea</td>
                <td className="border border-gray-300 p-2">Along margin/ventral suture of unilocular carpel</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Axile</span></td>
                <td className="border border-gray-300 p-2">China rose, Tomato, Lemon</td>
                <td className="border border-gray-300 p-2">On placenta along central axis in multilocular ovary</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Parietal</span></td>
                <td className="border border-gray-300 p-2">Mustard</td>
                <td className="border border-gray-300 p-2">On inner wall of unilocular ovary; two placentae</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Free central</span></td>
                <td className="border border-gray-300 p-2">Dianthus, Primrose</td>
                <td className="border border-gray-300 p-2">On free central placenta in center of ovary</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Basal</span></td>
                <td className="border border-gray-300 p-2">Sunflower, Marigold</td>
                <td className="border border-gray-300 p-2">Single ovule at base of unilocular ovary</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Families: Fabaceae, Solanaceae, Liliaceae",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p>
            NEET frequently tests the <span className="font-semibold text-green-800">key characteristics, floral formulae, and economic importance</span> of these three major flowering plant families. All three family details are <span className="font-semibold">EXTREMELY HIGH frequency in NEET.</span>
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <strong>NEET TIP:</strong> Fabaceae has <span className="font-semibold">MARGINAL placentation + diadelphous (9+1) stamens</span>. Solanaceae has <span className="font-semibold">AXILE placentation + epipetalous stamens</span>. Liliaceae is <span className="font-semibold">TRIMEROUS (3-merous)</span>. Remember the distinguishing features for quick identification!
          </div>

          <p><strong>Comprehensive Family Comparison Table:</strong></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Character</th>
                <th className="border border-gray-300 p-2 text-left">Fabaceae</th>
                <th className="border border-gray-300 p-2 text-left">Solanaceae</th>
                <th className="border border-gray-300 p-2 text-left">Liliaceae</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Examples</span></td>
                <td className="border border-gray-300 p-2">Pea (Pisum), Gram (Cicer)</td>
                <td className="border border-gray-300 p-2">Potato (Solanum), Tomato, Tobacco (Nicotiana)</td>
                <td className="border border-gray-300 p-2">Lily, Onion (Allium), Garlic, Aloe</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Floral Formula</span></td>
                <td className="border border-gray-300 p-2">K5 C5 A9+1 G1</td>
                <td className="border border-gray-300 p-2">K(5) C(5) A5 G(2)</td>
                <td className="border border-gray-300 p-2">P3+3 A3+3 G(3)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Leaf Venation</span></td>
                <td className="border border-gray-300 p-2">Reticulate (dicot)</td>
                <td className="border border-gray-300 p-2">Reticulate (dicot)</td>
                <td className="border border-gray-300 p-2">Parallel (monocot)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Root Type</span></td>
                <td className="border border-gray-300 p-2">Tap root system</td>
                <td className="border border-gray-300 p-2">Tap root system</td>
                <td className="border border-gray-300 p-2">Fibrous root system</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Flower Symmetry</span></td>
                <td className="border border-gray-300 p-2">Zygomorphic</td>
                <td className="border border-gray-300 p-2">Actinomorphic</td>
                <td className="border border-gray-300 p-2">Actinomorphic/Trimerous</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Corolla Type</span></td>
                <td className="border border-gray-300 p-2">Papilionaceous (2 petals + 2 lateral + 2 keel)</td>
                <td className="border border-gray-300 p-2">Fused/Gamopetalous</td>
                <td className="border border-gray-300 p-2">Perianth (tepals 6, not differentiated into calyx &amp; corolla)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Stamen Arrangement</span></td>
                <td className="border border-gray-300 p-2">Diadelphous (9+1) - one separate, nine fused</td>
                <td className="border border-gray-300 p-2">Epipetalous (attached to petals); free</td>
                <td className="border border-gray-300 p-2">6 stamens (2 whorls of 3); hypogynous</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Anther Type</span></td>
                <td className="border border-gray-300 p-2">Bithecous (2 chambers)</td>
                <td className="border border-gray-300 p-2">Dithecous (2-lobed)</td>
                <td className="border border-gray-300 p-2">Dithecous</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Placentation</span></td>
                <td className="border border-gray-300 p-2">Marginal - ovules along margin of carpel</td>
                <td className="border border-gray-300 p-2">Axile - ovules on central axis (multilocular)</td>
                <td className="border border-gray-300 p-2">Axile - ovules on central axis</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Aestivation</span></td>
                <td className="border border-gray-300 p-2">Vexillary (pea-like arrangement)</td>
                <td className="border border-gray-300 p-2">Valvate</td>
                <td className="border border-gray-300 p-2">Valvate</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Fruit Type</span></td>
                <td className="border border-gray-300 p-2">Legume (pod)</td>
                <td className="border border-gray-300 p-2">Berry</td>
                <td className="border border-gray-300 p-2">Capsule</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Seed Type</span></td>
                <td className="border border-gray-300 p-2">Dicotyledonous</td>
                <td className="border border-gray-300 p-2">Dicotyledonous</td>
                <td className="border border-gray-300 p-2">Monocotyledonous</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Economic Importance:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold text-green-800">Fabaceae:</span> Pulses (pea, gram, lentil), nitrogen fixation through root nodules, animal feed, edible oils (groundnut)</li>
            <li><span className="font-semibold text-green-800">Solanaceae:</span> Food crops (potato, tomato, eggplant), condiments (chili, black pepper), medicinal plants (Belladonna), alkaloid production (tobacco)</li>
            <li><span className="font-semibold text-green-800">Liliaceae:</span> Vegetables (onion, garlic), spices (asafoetida), medicinal uses (Aloe vera), ornamental flowers (lily, tulip)</li>
          </ul>

          <p><strong>Key Distinguishing Features for NEET:</strong></p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Fabaceae vs Others:</strong> Diadelphous stamens (9+1) + Marginal placentation = unique to Fabaceae</li>
            <li><strong>Solanaceae vs Liliaceae:</strong> Solanaceae is dicot (reticulate venation, tap root); Liliaceae is monocot (parallel venation, fibrous root)</li>
            <li><strong>Solanaceae vs Fabaceae:</strong> Axile placentation (Solanaceae) vs Marginal placentation (Fabaceae); Epipetalous stamens (Solanaceae) vs Diadelphous stamens (Fabaceae)</li>
            <li><strong>Liliaceae Feature:</strong> Trimerous flowers (3-merous) - 6 tepals, 6 stamens, 3 carpels (or multiples of 3)</li>
          </ul>
        </div>
      ),
    },
  ],
};
  const anatomyContent = {
  topics: [
    {
      title: "Meristematic and Permanent Tissues",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-green-800">Meristematic Tissues:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li><span className="font-semibold text-green-800">Apical meristem:</span> Root and shoot tips — primary growth</li>
              <li><span className="font-semibold text-green-800">Lateral meristem:</span> Vascular cambium (secondary xylem/phloem) &amp; cork cambium</li>
              <li><span className="font-semibold text-green-800">Intercalary meristem:</span> Base of internodes in grasses</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Simple Permanent Tissues:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li><span className="font-semibold text-green-800">Parenchyma:</span> Thin walls, living, storage &amp; photosynthesis</li>
              <li><span className="font-semibold text-green-800">Collenchyma:</span> Corner thickening, flexible, below epidermis</li>
              <li><span className="font-semibold text-green-800">Sclerenchyma:</span> Uniformly thick, lignified, dead (fibres &amp; sclereids)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Complex Permanent Tissues:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li><span className="font-semibold text-green-800">Xylem:</span> Tracheids, vessels, xylem parenchyma, xylem fibres — water transport</li>
              <li><span className="font-semibold text-green-800">Phloem:</span> Sieve tubes, companion cells, phloem parenchyma, phloem fibres — food transport</li>
            </ul>
          </div>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Parenchyma</th>
                <th className="border border-gray-300 p-2 text-left">Collenchyma</th>
                <th className="border border-gray-300 p-2 text-left">Sclerenchyma</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Cell Wall</td>
                <td className="border border-gray-300 p-2">Thin, cellulose</td>
                <td className="border border-gray-300 p-2">Corner thickening</td>
                <td className="border border-gray-300 p-2">Uniformly thick, lignified</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Living/Dead</td>
                <td className="border border-gray-300 p-2">Living</td>
                <td className="border border-gray-300 p-2">Living</td>
                <td className="border border-gray-300 p-2">Dead</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Function</td>
                <td className="border border-gray-300 p-2">Storage, photosynthesis</td>
                <td className="border border-gray-300 p-2">Support, flexibility</td>
                <td className="border border-gray-300 p-2">Mechanical strength</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Location</td>
                <td className="border border-gray-300 p-2">Ground tissue</td>
                <td className="border border-gray-300 p-2">Below epidermis</td>
                <td className="border border-gray-300 p-2">Fibres, sclereids</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800 text-sm">
            <span className="font-semibold">NEET TIP:</span> Xylem = dead (except xylem parenchyma). Phloem = living (except phloem fibres). Vessels absent in gymnosperms (only tracheids). Companion cells UNIQUE to angiosperms.
          </div>
        </div>
      ),
    },
    {
      title: "Dicot and Monocot Root Anatomy",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-green-800">Dicot Root Transverse Section:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Epidermis (with root hairs) → Cortex (parenchyma) → Endodermis (Casparian strips) → Pericycle → Vascular bundles (radial, xylem 2–6 = diarch to hexarch) → Pith (small/absent)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Monocot Root Transverse Section:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Epidermis → Cortex → Endodermis (Casparian strips) → Pericycle → Vascular bundles (radial, xylem polyarch = many protoxylem points) → Pith (large)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Key Features:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li><span className="font-semibold text-green-800">Casparian strip:</span> Waterproof suberin barrier in endodermis, forces water through symplastic pathway</li>
              <li><span className="font-semibold text-green-800">Passage cells:</span> Thin-walled endodermal cells opposite protoxylem for water passage</li>
            </ul>
          </div>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Dicot Root</th>
                <th className="border border-gray-300 p-2 text-left">Monocot Root</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Xylem Arms</td>
                <td className="border border-gray-300 p-2">2–6 (diarch-hexarch)</td>
                <td className="border border-gray-300 p-2">Many (polyarch)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Pith</td>
                <td className="border border-gray-300 p-2">Small/absent</td>
                <td className="border border-gray-300 p-2">Large</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Secondary Growth</td>
                <td className="border border-gray-300 p-2">Yes (vascular cambium)</td>
                <td className="border border-gray-300 p-2">No</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Endodermis</td>
                <td className="border border-gray-300 p-2">Casparian strips present</td>
                <td className="border border-gray-300 p-2">Casparian strips present</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800 text-sm">
            <span className="font-semibold">NEET TIP:</span> Dicot root = 2–6 xylem arms (diarch-hexarch). Monocot = polyarch (many arms). Casparian strips force water into symplast. Secondary growth ONLY in dicot roots (vascular cambium).
          </div>
        </div>
      ),
    },
    {
      title: "Dicot and Monocot Stem Anatomy",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-green-800">Dicot Stem Transverse Section:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Epidermis → Cortex (collenchyma + parenchyma) → Endodermis → Pericycle → Vascular bundles (conjoint, collateral, OPEN = cambium present, ring arrangement) → Pith (central)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Monocot Stem Transverse Section:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Epidermis → Hypodermis (sclerenchyma) → Ground tissue → Vascular bundles (conjoint, collateral, CLOSED = no cambium, SCATTERED, surrounded by sclerenchyma sheath) → No distinct pith</li>
            </ul>
          </div>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Dicot Stem</th>
                <th className="border border-gray-300 p-2 text-left">Monocot Stem</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Bundle Arrangement</td>
                <td className="border border-gray-300 p-2">Ring arrangement</td>
                <td className="border border-gray-300 p-2">Scattered throughout</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Bundle Type</td>
                <td className="border border-gray-300 p-2">Open (cambium present)</td>
                <td className="border border-gray-300 p-2">Closed (no cambium)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Cambium</td>
                <td className="border border-gray-300 p-2">Present (intrafascicular &amp; interfascicular)</td>
                <td className="border border-gray-300 p-2">Absent</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Secondary Growth</td>
                <td className="border border-gray-300 p-2">Yes</td>
                <td className="border border-gray-300 p-2">No</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Hypodermis</td>
                <td className="border border-gray-300 p-2">Absent/parenchymatous</td>
                <td className="border border-gray-300 p-2">Sclerenchymatous (strong)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Pith</td>
                <td className="border border-gray-300 p-2">Central, large</td>
                <td className="border border-gray-300 p-2">Not distinct</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800 text-sm">
            <span className="font-semibold">NEET TIP:</span> Dicot stem = OPEN bundles (cambium) + RING arrangement → secondary growth. Monocot = CLOSED bundles + SCATTERED → NO secondary growth. MOST asked anatomy topic.
          </div>
        </div>
      ),
    },
    {
      title: "Secondary Growth",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-green-800">Vascular Cambium Activity:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li><span className="font-semibold text-green-800">Intrafascicular cambium:</span> Within vascular bundles</li>
              <li><span className="font-semibold text-green-800">Interfascicular cambium:</span> Between bundles → forms complete cambium ring</li>
              <li>Produces secondary xylem (inward) + secondary phloem (outward). More xylem than phloem produced</li>
              <li><span className="font-semibold text-green-800">Heartwood &amp; Sapwood:</span> Heartwood = dark, dead, filled with tannins/resins (central). Sapwood = light, living, functional (peripheral)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Cork Cambium (Phellogen):</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Forms from cortex (or elsewhere in old stems)</li>
              <li>Produces phellem (cork, outer, dead) + phelloderm (secondary cortex, inner, living)</li>
              <li>Together called <span className="font-semibold text-green-800">Periderm</span> (replaces epidermis)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Annual Rings:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li><span className="font-semibold text-green-800">Spring wood:</span> Large vessels, light colour (rapid growth)</li>
              <li><span className="font-semibold text-green-800">Autumn wood:</span> Small vessels, dark colour (slow growth)</li>
              <li>One ring = one year</li>
            </ul>
          </div>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Heartwood</th>
                <th className="border border-gray-300 p-2 text-left">Sapwood</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Colour</td>
                <td className="border border-gray-300 p-2">Dark</td>
                <td className="border border-gray-300 p-2">Light</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Living/Dead</td>
                <td className="border border-gray-300 p-2">Dead</td>
                <td className="border border-gray-300 p-2">Living</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Function</td>
                <td className="border border-gray-300 p-2">Non-functional, support</td>
                <td className="border border-gray-300 p-2">Functional (water transport)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Position</td>
                <td className="border border-gray-300 p-2">Central</td>
                <td className="border border-gray-300 p-2">Peripheral</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Durability</td>
                <td className="border border-gray-300 p-2">Highly durable</td>
                <td className="border border-gray-300 p-2">Prone to decay</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800 text-sm">
            <span className="font-semibold">NEET TIP:</span> Vascular cambium produces secondary xylem INWARD and secondary phloem OUTWARD. More xylem than phloem. Annual rings = spring wood + autumn wood. Heartwood = non-functional but durable. Bark = all tissues outside vascular cambium.
          </div>
        </div>
      ),
    },
    {
      title: "Leaf Anatomy (Dorsiventral vs Isobilateral)",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-green-800">Dorsiventral Leaf (Dicot):</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Upper epidermis (few/no stomata) → <span className="font-semibold text-green-800">Palisade mesophyll</span> (elongated, tightly packed, more chloroplasts) → <span className="font-semibold text-green-800">Spongy mesophyll</span> (loosely packed, intercellular air spaces) → Lower epidermis (more stomata)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Isobilateral Leaf (Monocot):</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Stomata on BOTH surfaces (amphistomatic)</li>
              <li>Mesophyll NOT differentiated (palisade &amp; spongy not distinct)</li>
              <li><span className="font-semibold text-green-800">Bulliform cells:</span> Large motor cells present, cause leaf rolling in drought</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-800">Kranz Anatomy (C4 Plants):</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li>Found in maize, sugarcane</li>
              <li><span className="font-semibold text-green-800">Bundle sheath cells:</span> Large, contain chloroplasts</li>
              <li>Mesophyll + bundle sheath = dimorphic (two-celled types)</li>
              <li>Special feature for C4 photosynthetic pathway</li>
            </ul>
          </div>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Dorsiventral (Dicot)</th>
                <th className="border border-gray-300 p-2 text-left">Isobilateral (Monocot)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Stomata Distribution</td>
                <td className="border border-gray-300 p-2">Mainly lower surface</td>
                <td className="border border-gray-300 p-2">Both surfaces (amphistomatic)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Mesophyll</td>
                <td className="border border-gray-300 p-2">Palisade &amp; spongy (differentiated)</td>
                <td className="border border-gray-300 p-2">Not differentiated</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Palisade Cells</td>
                <td className="border border-gray-300 p-2">Elongated, ordered</td>
                <td className="border border-gray-300 p-2">Absent</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Bulliform Cells</td>
                <td className="border border-gray-300 p-2">Absent</td>
                <td className="border border-gray-300 p-2">Present (motor function)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2 font-semibold">Bundle Sheath</td>
                <td className="border border-gray-300 p-2">Parenchymatous</td>
                <td className="border border-gray-300 p-2">Sclerenchymatous sheath</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800 text-sm">
            <span className="font-semibold">NEET TIP:</span> Dicot = dorsiventral (stomata mainly lower). Monocot = isobilateral (stomata both sides). Bulliform cells UNIQUE to monocots (leaf rolling in drought). Kranz anatomy = C4 plants ONLY.
          </div>
        </div>
      ),
    },
  ],
};
  const structuralOrgContent = {
  topics: [
    {
      title: "Epithelial Tissue",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p>Epithelial tissues form protective, absorptive, and secretory surfaces throughout the body.</p>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Epithelial Type</th>
                <th className="border border-gray-300 p-2 text-left">Location</th>
                <th className="border border-gray-300 p-2 text-left">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Simple Squamous</span></td>
                <td className="border border-gray-300 p-2">Blood vessels (endothelium), body cavities (mesothelium), alveoli</td>
                <td className="border border-gray-300 p-2">Diffusion, filtration</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Simple Cuboidal</span></td>
                <td className="border border-gray-300 p-2">Kidney tubules, ducts</td>
                <td className="border border-gray-300 p-2">Secretion, absorption</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Simple Columnar</span></td>
                <td className="border border-gray-300 p-2">Intestine, stomach</td>
                <td className="border border-gray-300 p-2">Absorption, secretion</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Ciliated Columnar</span></td>
                <td className="border border-gray-300 p-2">Trachea, oviduct, bronchi</td>
                <td className="border border-gray-300 p-2">Movement of particles</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Pseudostratified</span></td>
                <td className="border border-gray-300 p-2">Trachea, nasal cavity</td>
                <td className="border border-gray-300 p-2">Protection, secretion</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Stratified Squamous</span></td>
                <td className="border border-gray-300 p-2">Skin, buccal cavity, oesophagus</td>
                <td className="border border-gray-300 p-2">Protection</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Transitional</span></td>
                <td className="border border-gray-300 p-2">Urinary bladder</td>
                <td className="border border-gray-300 p-2">Stretching, protection</td>
              </tr>
            </tbody>
          </table>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Glandular Epithelium:</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Exocrine glands:</span> Have ducts, secrete to surface (sweat glands, salivary glands, sebaceous glands)</li>
              <li><span className="font-semibold text-green-800">Endocrine glands:</span> Ductless, secrete hormones directly to blood (thyroid, pituitary, adrenal)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Key Features:</span> Cells tightly packed with minimal intercellular matrix, rest on basement membrane, avascular (no blood vessels)</p>
            <p><span className="font-semibold text-green-800">Functions:</span> Protection, secretion, absorption, filtration</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Simple squamous in blood vessels = ENDOTHELIUM; in body cavities = MESOTHELIUM. Transitional epithelium = stretches (urinary bladder). Compound epithelium = protection; Simple = secretion/absorption.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Connective Tissue",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p>Connective tissues are the most abundant tissues, providing structural support with cells embedded in a matrix of ground substance and fibres.</p>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">Characteristics</th>
                <th className="border border-gray-300 p-2 text-left">Location/Function</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Areolar (Loose)</span></td>
                <td className="border border-gray-300 p-2">Loosely packed fibres, abundant ground substance</td>
                <td className="border border-gray-300 p-2">Under skin, around organs, binding tissues</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Adipose (Loose)</span></td>
                <td className="border border-gray-300 p-2">Fat cells (lipocytes) with lipid droplets</td>
                <td className="border border-gray-300 p-2">Fat storage, insulation, heat production</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Tendons (Dense)</span></td>
                <td className="border border-gray-300 p-2">Tightly packed collagen fibres, inelastic</td>
                <td className="border border-gray-300 p-2">Connect muscle to bone</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Ligaments (Dense)</span></td>
                <td className="border border-gray-300 p-2">Dense, elastic fibres, flexible</td>
                <td className="border border-gray-300 p-2">Connect bone to bone, support joints</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Cartilage</span></td>
                <td className="border border-gray-300 p-2">Chondrocytes in chondrin matrix, avascular</td>
                <td className="border border-gray-300 p-2">Support, reduce friction, shape maintenance</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Bone</span></td>
                <td className="border border-gray-300 p-2">Osteocytes in lacunae, Haversian system, vascular</td>
                <td className="border border-gray-300 p-2">Support, protection, movement</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Blood</span></td>
                <td className="border border-gray-300 p-2">Plasma (55%) + RBCs, WBCs, Platelets</td>
                <td className="border border-gray-300 p-2">Transport, immunity, clotting</td>
              </tr>
            </tbody>
          </table>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Blood Composition:</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Plasma (55%):</span> Water, proteins (albumin, globulins, fibrinogen), dissolved substances</li>
              <li><span className="font-semibold text-green-800">RBCs (Erythrocytes):</span> No nucleus in mammals, biconcave disc, contain haemoglobin for O₂ transport</li>
              <li><span className="font-semibold text-green-800">WBCs (Leukocytes):</span> Granulocytes (neutrophils, eosinophils, basophils) &amp; agranulocytes (lymphocytes, monocytes)</li>
              <li><span className="font-semibold text-green-800">Platelets (Thrombocytes):</span> Cell fragments involved in blood clotting</li>
            </ul>
          </div>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Cartilage</th>
                <th className="border border-gray-300 p-2 text-left">Bone</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Cell type</td>
                <td className="border border-gray-300 p-2">Chondrocytes</td>
                <td className="border border-gray-300 p-2">Osteocytes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Matrix</td>
                <td className="border border-gray-300 p-2">Chondrin (flexible)</td>
                <td className="border border-gray-300 p-2">Ossein + minerals (rigid)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Blood supply</td>
                <td className="border border-gray-300 p-2">Avascular</td>
                <td className="border border-gray-300 p-2">Vascular (Haversian canals)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Function</td>
                <td className="border border-gray-300 p-2">Support, flexibility</td>
                <td className="border border-gray-300 p-2">Support, protection, movement</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Tendon = muscle to bone (inelastic); Ligament = bone to bone (elastic). RBCs lack nucleus in mammals. Cartilage = avascular; Bone = vascular (Haversian canals). Adipose tissue stores fat in white (energy) &amp; brown (heat) forms.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Muscle Tissue",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <p>Muscle tissues are specialized for contraction, enabling movement and force generation.</p>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Skeletal</th>
                <th className="border border-gray-300 p-2 text-left">Smooth</th>
                <th className="border border-gray-300 p-2 text-left">Cardiac</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Appearance</td>
                <td className="border border-gray-300 p-2">Striated</td>
                <td className="border border-gray-300 p-2">Non-striated</td>
                <td className="border border-gray-300 p-2">Striated</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Control</td>
                <td className="border border-gray-300 p-2">Voluntary</td>
                <td className="border border-gray-300 p-2">Involuntary</td>
                <td className="border border-gray-300 p-2">Involuntary</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Nuclei</td>
                <td className="border border-gray-300 p-2">Multinucleated</td>
                <td className="border border-gray-300 p-2">Uninucleated</td>
                <td className="border border-gray-300 p-2">Uninucleated</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Shape</td>
                <td className="border border-gray-300 p-2">Elongated</td>
                <td className="border border-gray-300 p-2">Spindle-shaped (fusiform)</td>
                <td className="border border-gray-300 p-2">Branched with striations</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Location</td>
                <td className="border border-gray-300 p-2">Attached to bones</td>
                <td className="border border-gray-300 p-2">Viscera, blood vessels</td>
                <td className="border border-gray-300 p-2">Heart</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Special feature</td>
                <td className="border border-gray-300 p-2">—</td>
                <td className="border border-gray-300 p-2">—</td>
                <td className="border border-gray-300 p-2">Intercalated discs</td>
              </tr>
            </tbody>
          </table>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Sarcomere Structure (Basic Contractile Unit):</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Z-line (Z-disc):</span> Boundaries of sarcomere</li>
              <li><span className="font-semibold text-green-800">A-band (Anisotropic):</span> Dark band containing thick myosin filaments &amp; partial thin actin filaments</li>
              <li><span className="font-semibold text-green-800">I-band (Isotropic):</span> Light band containing only thin actin filaments</li>
              <li><span className="font-semibold text-green-800">H-zone (Hensen's zone):</span> Central region of A-band with only myosin</li>
              <li><span className="font-semibold text-green-800">M-line:</span> Centre of H-zone with thick filaments</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Intercalated Discs (Cardiac muscle only):</span> Specialized junctions containing gap junctions &amp; desmosomes that allow synchronized contraction between cardiac cells</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Cardiac muscle = striated BUT involuntary (unique combination). Intercalated discs = ONLY in cardiac muscle. Skeletal = only VOLUNTARY muscle. Smooth muscle = fusiform shape, spindle-shaped cells. Contraction: Thin (actin) &amp; thick (myosin) filaments slide over each other.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Neural Tissue",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <p>Neural tissue is specialized for electrical signaling and rapid communication throughout the body.</p>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Neuron Structure:</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Cell body (Soma/Cyton):</span> Contains nucleus, organelles, produces neurotransmitters</li>
              <li><span className="font-semibold text-green-800">Dendrites:</span> Multiple, short, branched processes that receive impulses from other neurons</li>
              <li><span className="font-semibold text-green-800">Axon:</span> Single, long process that transmits impulses away from cell body to other neurons/muscles</li>
              <li><span className="font-semibold text-green-800">Myelin sheath:</span> Insulating layer formed by Schwann cells (PNS) or oligodendrocytes (CNS)</li>
              <li><span className="font-semibold text-green-800">Nodes of Ranvier:</span> Gaps in myelin sheath between Schwann cells</li>
              <li><span className="font-semibold text-green-800">Synaptic knob (Terminal):</span> Enlarged end of axon containing neurotransmitter vesicles</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Neuron Types by Function:</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Sensory neurons (Afferent):</span> Carry impulses from receptors to CNS</li>
              <li><span className="font-semibold text-green-800">Motor neurons (Efferent):</span> Carry impulses from CNS to effectors (muscles/glands)</li>
              <li><span className="font-semibold text-green-800">Interneurons (Association neurons):</span> Connect sensory &amp; motor neurons in CNS</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Neuron Types by Structure:</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Unipolar:</span> Single process from cell body (sensory neurons)</li>
              <li><span className="font-semibold text-green-800">Bipolar:</span> Two processes, one dendrite &amp; one axon (retina, olfactory epithelium)</li>
              <li><span className="font-semibold text-green-800">Multipolar:</span> Many dendrites &amp; one axon (most common, cerebral cortex, motor neurons)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Neuroglia (Support cells, ~50% of CNS cells):</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Astrocytes:</span> Provide structural &amp; metabolic support, control extracellular K⁺</li>
              <li><span className="font-semibold text-green-800">Oligodendrocytes:</span> Form myelin in CNS (one cell myelinates multiple axons)</li>
              <li><span className="font-semibold text-green-800">Microglia:</span> Immune cells, phagocytose pathogens &amp; debris</li>
              <li><span className="font-semibold text-green-800">Ependymal cells:</span> Produce cerebrospinal fluid</li>
              <li><span className="font-semibold text-green-800">Schwann cells:</span> Form myelin in PNS (one cell for one segment)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Synapse:</span> Junction between neurons allowing impulse transmission</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Presynaptic membrane:</span> Axon terminal of transmitting neuron with neurotransmitter vesicles</li>
              <li><span className="font-semibold text-green-800">Synaptic cleft:</span> 20 nm gap between neurons</li>
              <li><span className="font-semibold text-green-800">Postsynaptic membrane:</span> Membrane of receiving neuron with receptors</li>
              <li><span className="font-semibold text-green-800">Common neurotransmitters:</span> Acetylcholine (skeletal muscle), Dopamine (movement), GABA (inhibitory), Glutamate (excitatory)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Myelinated axons = faster conduction (saltatory conduction). Nodes of Ranvier = gaps in myelin sheath. Most neurons are multipolar. Schwann cells form myelin in PNS; oligodendrocytes in CNS (one oligodendrocyte myelinates multiple axons). Synapse is ONE-WAY transmission.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Cockroach Morphology &amp; Anatomy",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p>The cockroach is a commonly studied arthropod specimen representing insect external &amp; internal anatomy.</p>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">External Morphology:</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-semibold text-green-800">Head:</span> Compound eyes (facets for vision), pair of antennae (long, segmented, sensory), mouthparts (labrum, mandibles for cutting, maxillae with palps, labium)</li>
              <li><span className="font-semibold text-green-800">Thorax:</span> 3 segments, each with pair of jointed legs, first 2 segments with wings (tegmina = leathery forewings, membranous hindwings)</li>
              <li><span className="font-semibold text-green-800">Abdomen:</span> 10 visible segments, 11th segment reduced, anal cerci (paired posterior appendages), males have anal styles</li>
            </ul>
          </div>

          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Organ System</th>
                <th className="border border-gray-300 p-2 text-left">Components &amp; Functions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Digestive</span></td>
                <td className="border border-gray-300 p-2">Foregut (mouth, oesophagus, crop) → Midgut (stomach) → Hindgut (rectum); Hepatic caeca (6-8, at foregut-midgut junction, absorb nutrients)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Circulatory</span></td>
                <td className="border border-gray-300 p-2">Open system, haemolymph (colourless, NO respiratory pigment like haemoglobin); 13-chambered heart (dorsal, pumps haemolymph)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Respiratory</span></td>
                <td className="border border-gray-300 p-2">Tracheal system (tube network throughout body), 10 pairs spiracles (2 thoracic + 8 abdominal) for air entry</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Excretory</span></td>
                <td className="border border-gray-300 p-2">Malpighian tubules (blind tubes from hindgut junction, absorb water &amp; nitrogenous wastes), URICOTELIC (excretes uric acid)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Nervous</span></td>
                <td className="border border-gray-300 p-2">Supra-oesophageal ganglion (brain above oesophagus), ventral nerve cord with ganglia in each segment</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold text-green-800">Reproductive</span></td>
                <td className="border border-gray-300 p-2">Males: testes with vas deferens, females: ovaries with oviducts; external genitalia dimorphic</td>
              </tr>
            </tbody>
          </table>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Haemolymph (Insect Blood):</span> Colourless fluid WITHOUT respiratory pigments (no haemoglobin), does NOT transport oxygen; oxygen transport via direct tracheae to tissues</p>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-green-800">Distinguishing Features:</span></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Body covered with chitinous exoskeleton (rigid protection)</li>
              <li>Open circulatory system with haemolymph bathing organs directly</li>
              <li>Tracheal respiration for direct gas exchange with cells</li>
              <li>Uricotelic excretion (conserves water, important for terrestrial life)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Cockroach is URICOTELIC (excretes uric acid). Blood = haemolymph (NO haemoglobin, NO O₂ transport). 10 pairs spiracles (2 thoracic + 8 abdominal). Malpighian tubules for excretion. Males have anal styles (females lack). Hepatic caeca = 6-8 at junction of foregut-midgut. Compound eyes, long antennae for sensory input. Tegmina + membranous wings on thorax.</p>
          </div>
        </div>
      ),
    },
  ],
}

  const plantPhysiologyContent = {
  topics: [
    {
      title: "Light Reactions of Photosynthesis",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p><span className="font-semibold text-green-800">Location:</span> Thylakoid membrane (grana lamellae) of chloroplasts.</p>

          <p><span className="font-semibold text-green-800">Photosystems:</span> <span className="font-semibold text-green-800">Photosystem II (P680)</span> absorbs light at 680 nm wavelength. <span className="font-semibold text-green-800">Photosystem I (P700)</span> absorbs light at 700 nm wavelength. PS II is involved in photolysis of water &amp; occurs on the lumen side.</p>

          <p><span className="font-semibold text-green-800">Photolysis of Water:</span> 2H<sub>2</sub>O → 4H<sup>+</sup> + 4e<sup>−</sup> + O<sub>2</sub>. Occurs at PS II through the <span className="font-semibold text-green-800">Oxygen Evolving Complex (OEC)</span>. O<sub>2</sub> is released as a byproduct (Hill proved O<sub>2</sub> comes from water, not CO<sub>2</sub>).</p>

          <p><span className="font-semibold text-green-800">Electron Transport Chain:</span> PS II → Plastoquinone (PQ) → Cytochrome b<sub>6</sub>f complex → Plastocyanin (PC) → PS I → Ferredoxin (Fd) → NADP<sup>+</sup> reductase → NADPH formation.</p>

          <p><span className="font-semibold text-green-800">Cyclic vs Non-cyclic Photophosphorylation:</span></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Cyclic</th>
                <th className="border border-gray-300 p-2 text-left">Non-cyclic</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Photosystems involved</td>
                <td className="border border-gray-300 p-2">Only PS I</td>
                <td className="border border-gray-300 p-2">PS II + PS I</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Products</td>
                <td className="border border-gray-300 p-2">ATP only</td>
                <td className="border border-gray-300 p-2">ATP + NADPH + O<sub>2</sub></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Water photolysis</td>
                <td className="border border-gray-300 p-2">No</td>
                <td className="border border-gray-300 p-2">Yes</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Location in stroma</td>
                <td className="border border-gray-300 p-2">Low light</td>
                <td className="border border-gray-300 p-2">High light</td>
              </tr>
            </tbody>
          </table>

          <p><span className="font-semibold text-green-800">Chemiosmosis &amp; ATP Synthesis:</span> H<sup>+</sup> ions accumulate in thylakoid lumen creating a proton gradient (electrochemical gradient). This gradient drives ATP synthase (CF<sub>0</sub>-CF<sub>1</sub>) to phosphorylate ADP into ATP. This process is called photophosphorylation.</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> O<sub>2</sub> comes from WATER (not CO<sub>2</sub>) — proved by Hill &amp; Ruben. PS II has P680, PS I has P700. Cyclic photophosphorylation produces ONLY ATP, no NADPH, no O<sub>2</sub>. Non-cyclic produces both ATP &amp; NADPH. Photolysis occurs at PS II lumen side with the OEC. Photolysis: 2H<sub>2</sub>O → O<sub>2</sub> + 4e<sup>−</sup> + 4H<sup>+</sup>.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Calvin Cycle (C3 Pathway)",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p><span className="font-semibold text-green-800">Location &amp; Discovery:</span> Occurs in the stroma of chloroplasts. Discovered by <span className="font-semibold text-green-800">Melvin Calvin</span> (also called the Calvin-Benson cycle or reductive pentose phosphate cycle).</p>

          <p><span className="font-semibold text-green-800">Three Phases of Calvin Cycle:</span></p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li><span className="font-semibold text-green-800">Carbon Fixation:</span> CO<sub>2</sub> combines with RuBP (ribulose-1,5-bisphosphate) via the enzyme <span className="font-semibold text-green-800">RuBisCO</span> to form 3-phosphoglycerate (3-PGA, 3C compound). Reaction: CO<sub>2</sub> + RuBP (5C) → 2 × 3-PGA (3C).</li>
            <li><span className="font-semibold text-green-800">Reduction Phase:</span> 3-PGA is phosphorylated to 1,3-bisphosphoglycerate (ATP used) then reduced to glyceraldehyde-3-phosphate (G3P) using NADPH. Energy required: 2 ATP + 2 NADPH per 3-PGA.</li>
            <li><span className="font-semibold text-green-800">Regeneration of RuBP:</span> 5 G3P molecules (15C) regenerate 3 RuBP molecules (15C) using ATP. For every 1 G3P that exits the cycle, 5 G3P must be regenerated.</li>
          </ul>

          <p><span className="font-semibold text-green-800">ATP &amp; NADPH Consumption per Glucose:</span> To produce 1 glucose (6C), the cycle must turn 6 times, fixing 6 CO<sub>2</sub> molecules. This requires: <span className="font-semibold text-green-800">18 ATP + 12 NADPH</span>.</p>

          <p><span className="font-semibold text-green-800">RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase):</span> Most abundant enzyme on Earth. Has dual enzymatic activity: <span className="font-semibold text-green-800">carboxylase activity</span> (fixes CO<sub>2</sub> in Calvin cycle) &amp; <span className="font-semibold text-green-800">oxygenase activity</span> (uses O<sub>2</sub> instead, initiates photorespiration).</p>

          <p><span className="font-semibold text-green-800">C3 vs C4 Pathway Comparison:</span></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">C3 Plants</th>
                <th className="border border-gray-300 p-2 text-left">C4 Plants</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">First stable product</td>
                <td className="border border-gray-300 p-2">3-PGA (3C)</td>
                <td className="border border-gray-300 p-2">Oxaloacetate (OAA, 4C)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Photosynthetic pathway</td>
                <td className="border border-gray-300 p-2">Only Calvin cycle</td>
                <td className="border border-gray-300 p-2">Hatch-Slack + Calvin cycle</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Photorespiration</td>
                <td className="border border-gray-300 p-2">High (inefficient)</td>
                <td className="border border-gray-300 p-2">Low (very efficient)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Leaf anatomy</td>
                <td className="border border-gray-300 p-2">No Kranz anatomy</td>
                <td className="border border-gray-300 p-2">Kranz anatomy present</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Climate adaptation</td>
                <td className="border border-gray-300 p-2">Temperate regions</td>
                <td className="border border-gray-300 p-2">Tropical/hot, dry regions</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Examples</td>
                <td className="border border-gray-300 p-2">Wheat, rice, pea, sunflower</td>
                <td className="border border-gray-300 p-2">Maize, sugarcane, sorghum</td>
              </tr>
            </tbody>
          </table>

          <p><span className="font-semibold text-green-800">C4 Mechanism:</span> CO<sub>2</sub> is first fixed in mesophyll cells via <span className="font-semibold text-green-800">PEP carboxylase</span> (more efficient than RuBisCO) to form OAA, then transported to bundle sheath cells where Calvin cycle operates. This concentrates CO<sub>2</sub> around RuBisCO, reducing oxygenase activity.</p>

          <p><span className="font-semibold text-green-800">CAM Plants (Crassulacean Acid Metabolism):</span> Succulent plants like <span className="font-semibold text-green-800">Opuntia (prickly pear), pineapple, agave</span>. Stomata open at NIGHT to fix CO<sub>2</sub> into malic acid &amp; stored in vacuoles. Calvin cycle operates during the DAY using stored CO<sub>2</sub>. Adaptation to xeric (dry) conditions.</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> RuBisCO = both carboxylase + oxygenase enzyme. C3 first product = 3-PGA (3-carbon compound). C4 first product = OAA (4-carbon oxaloacetate). C4 plants have special <span className="font-semibold">Kranz anatomy</span> with bundle sheath cells surrounding veins. Photorespiration = wasteful process using O<sub>2</sub>, releases CO<sub>2</sub>, consumes ATP, produces no useful products. C4 &amp; CAM plants minimize photorespiration. CAM = nocturnal stomatal opening.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Glycolysis and Fermentation",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <p><span className="font-semibold text-green-800">Location &amp; Universality:</span> Occurs in the cytoplasm/cytosol. Universal pathway common to ALL organisms (both aerobic &amp; anaerobic). Does NOT require oxygen.</p>

          <p><span className="font-semibold text-green-800">Overall Reaction:</span> Glucose (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>) → 2 Pyruvate (C<sub>3</sub>H<sub>4</sub>O<sub>3</sub>). Net yield: <span className="font-semibold text-green-800">2 ATP + 2 NADH</span> per glucose.</p>

          <p><span className="font-semibold text-green-800">Key Steps &amp; Enzymes (10 reactions):</span></p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li><span className="font-semibold text-green-800">Glucose activation:</span> Glucose → Glucose-6-phosphate (enzyme: hexokinase, uses 1 ATP)</li>
            <li><span className="font-semibold text-green-800">Isomerization:</span> Glucose-6-phosphate → Fructose-6-phosphate</li>
            <li><span className="font-semibold text-green-800">Second phosphorylation:</span> Fructose-6-phosphate → Fructose-1,6-bisphosphate (enzyme: <span className="font-semibold text-green-800">phosphofructokinase (PFK)</span> — rate-limiting enzyme, uses 1 ATP)</li>
            <li><span className="font-semibold text-green-800">Cleavage:</span> Fructose-1,6-bisphosphate → 2 × Glyceraldehyde-3-phosphate (G3P)</li>
            <li><span className="font-semibold text-green-800">Oxidation &amp; phosphorylation:</span> 2 × G3P → 2 × 1,3-bisphosphoglycerate (uses NADH, produces 2 NADH)</li>
            <li><span className="font-semibold text-green-800">First ATP formation:</span> 2 × 1,3-bisphosphoglycerate → 2 × 3-phosphoglycerate (produces 2 ATP)</li>
            <li><span className="font-semibold text-green-800">Phosphoryl group shift:</span> 2 × 3-phosphoglycerate → 2 × 2-phosphoglycerate</li>
            <li><span className="font-semibold text-green-800">Dehydration:</span> 2 × 2-phosphoglycerate → 2 × Phosphoenolpyruvate (PEP)</li>
            <li><span className="font-semibold text-green-800">Second ATP formation:</span> 2 × PEP → 2 × Pyruvate (enzyme: pyruvate kinase, produces 2 ATP)</li>
          </ul>

          <p><span className="font-semibold text-green-800">ATP Summary:</span> Investment phase = 2 ATP used. Payoff phase = 4 ATP produced. <span className="font-semibold text-green-800">Net ATP gain = 2 ATP per glucose</span>.</p>

          <p><span className="font-semibold text-green-800">Fermentation (Anaerobic Respiration):</span> Process that regenerates NAD<sup>+</sup> from NADH to allow glycolysis to continue without oxygen.</p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li><span className="font-semibold text-green-800">Alcoholic Fermentation:</span> Occurs in yeast &amp; some bacteria. Pyruvate → Ethanol + CO<sub>2</sub>. Enzymes: pyruvate decarboxylase (removes CO<sub>2</sub>) &amp; alcohol dehydrogenase (reduces acetaldehyde to ethanol). Used in bread-making, beer &amp; wine production.</li>
            <li><span className="font-semibold text-green-800">Lactic Acid Fermentation:</span> Occurs in muscle cells &amp; lactobacilli. Pyruvate → Lactic acid. Enzyme: lactate dehydrogenase. Occurs during intense exercise when O<sub>2</sub> is insufficient.</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Glycolysis = 10 sequential steps, universally conserved. 2 ATP invested (priming phase), 4 ATP produced (payoff phase), NET = 2 ATP gain. <span className="font-semibold">PFK (phosphofructokinase)</span> is the rate-limiting/key regulatory enzyme. Fermentation = incomplete oxidation, occurs in cytoplasm WITHOUT oxygen. Alcoholic fermentation used in bread/beer making (produces CO<sub>2</sub>). Lactic acid fermentation causes muscle fatigue during intense exercise.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Krebs Cycle and Electron Transport Chain",
      pyqFrequency: "Very High" as const,
      content: (
        <div className="space-y-4">
          <p><span className="font-semibold text-green-800">Pyruvate Oxidation (Link Reaction):</span> Pyruvate (3C) enters mitochondrial matrix where enzyme <span className="font-semibold text-green-800">pyruvate dehydrogenase complex</span> converts it to Acetyl CoA (2C) + CO<sub>2</sub> + NADH. Produces 1 NADH per pyruvate. For 1 glucose: 2 Acetyl CoA formed.</p>

          <p><span className="font-semibold text-green-800">Krebs Cycle (Citric Acid Cycle/TCA Cycle):</span> Occurs in mitochondrial matrix. Circular pathway where Acetyl CoA (2C) combines with Oxaloacetate (4C) to form Citrate (6C), which is progressively oxidized, releasing 2 CO<sub>2</sub> molecules, regenerating Oxaloacetate.</p>

          <p><span className="font-semibold text-green-800">Krebs Cycle Steps:</span></p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li>Acetyl CoA + Oxaloacetate → Citrate (enzyme: citrate synthase)</li>
            <li>Citrate → Isocitrate (enzyme: aconitase)</li>
            <li>Isocitrate → α-Ketoglutarate + CO<sub>2</sub> + NADH (enzyme: isocitrate dehydrogenase)</li>
            <li>α-Ketoglutarate → Succinyl CoA + CO<sub>2</sub> + NADH (enzyme: α-ketoglutarate dehydrogenase)</li>
            <li>Succinyl CoA → Succinate + GTP (or ATP) (enzyme: succinyl CoA synthetase) — only substrate-level phosphorylation in Krebs</li>
            <li>Succinate → Fumarate + FADH<sub>2</sub> (enzyme: succinate dehydrogenase)</li>
            <li>Fumarate → Malate (enzyme: fumarase)</li>
            <li>Malate → Oxaloacetate + NADH (enzyme: malate dehydrogenase)</li>
          </ul>

          <p><span className="font-semibold text-green-800">Products per Acetyl CoA:</span> 3 NADH + 1 FADH<sub>2</sub> + 1 GTP (≈ATP) + 2 CO<sub>2</sub>. Per glucose (2 Acetyl CoA): 6 NADH + 2 FADH<sub>2</sub> + 2 GTP + 4 CO<sub>2</sub>.</p>

          <p><span className="font-semibold text-green-800">Electron Transport Chain (ETC):</span> Located on inner mitochondrial membrane (cristae). Series of protein complexes transfer electrons &amp; pump H<sup>+</sup> ions.</p>

          <p><span className="font-semibold text-green-800">ETC Complexes:</span></p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li><span className="font-semibold text-green-800">Complex I (NADH dehydrogenase):</span> NADH → Ubiquinone (UQ). Pumps 4 H<sup>+</sup></li>
            <li><span className="font-semibold text-green-800">Complex II (Succinate dehydrogenase):</span> FADH<sub>2</sub> → Ubiquinone. Pumps 0 H<sup>+</sup> (only transfers electrons)</li>
            <li><span className="font-semibold text-green-800">Complex III (Cytochrome bc<sub>1</sub>):</span> Ubiquinone → Cytochrome c. Pumps 4 H<sup>+</sup></li>
            <li><span className="font-semibold text-green-800">Complex IV (Cytochrome c oxidase):</span> Cytochrome c → O<sub>2</sub>. Pumps 2 H<sup>+</sup>. O<sub>2</sub> is final electron acceptor forming H<sub>2</sub>O</li>
            <li><span className="font-semibold text-green-800">Complex V (ATP synthase):</span> H<sup>+</sup> gradient → ATP synthesis via chemiosmosis</li>
          </ul>

          <p><span className="font-semibold text-green-800">Electron Transport Sequence:</span> NADH → Complex I → UQ → Complex III → Cyt c → Complex IV → O<sub>2</sub> (forms H<sub>2</sub>O). FADH<sub>2</sub> enters at Complex II, bypassing Complex I (fewer H<sup>+</sup> pumped).</p>

          <p><span className="font-semibold text-green-800">Oxidative Phosphorylation &amp; Chemiosmosis:</span> H<sup>+</sup> gradient (high in matrix, low in intermembrane space) created by electron transport drives ATP synthase to phosphorylate ADP + Pi → ATP. Gradient is dissipated through ATP synthase channel.</p>

          <p><span className="font-semibold text-green-800">ATP Yield Summary (UPDATED):</span></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Stage</th>
                <th className="border border-gray-300 p-2 text-left">Direct ATP</th>
                <th className="border border-gray-300 p-2 text-left">NADH × 2.5</th>
                <th className="border border-gray-300 p-2 text-left">FADH<sub>2</sub> × 1.5</th>
                <th className="border border-gray-300 p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Glycolysis</td>
                <td className="border border-gray-300 p-2">2</td>
                <td className="border border-gray-300 p-2">2 NADH = 5</td>
                <td className="border border-gray-300 p-2">—</td>
                <td className="border border-gray-300 p-2">7</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Link (Pyruvate oxidation)</td>
                <td className="border border-gray-300 p-2">—</td>
                <td className="border border-gray-300 p-2">2 NADH = 5</td>
                <td className="border border-gray-300 p-2">—</td>
                <td className="border border-gray-300 p-2">5</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Krebs Cycle</td>
                <td className="border border-gray-300 p-2">2</td>
                <td className="border border-gray-300 p-2">6 NADH = 15</td>
                <td className="border border-gray-300 p-2">2 FADH<sub>2</sub> = 3</td>
                <td className="border border-gray-300 p-2">20</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold">TOTAL per Glucose</span></td>
                <td className="border border-gray-300 p-2"><span className="font-semibold">4</span></td>
                <td className="border border-gray-300 p-2"><span className="font-semibold">10 NADH = 25</span></td>
                <td className="border border-gray-300 p-2"><span className="font-semibold">2 FADH<sub>2</sub> = 3</span></td>
                <td className="border border-gray-300 p-2"><span className="font-semibold">~30-32 ATP</span></td>
              </tr>
            </tbody>
          </table>

          <p><span className="font-semibold text-green-800">Amphibolic Pathway:</span> Krebs cycle serves dual roles: <span className="font-semibold text-green-800">Catabolic</span> (breaks down carbon compounds for energy) &amp; <span className="font-semibold text-green-800">Anabolic</span> (intermediates used for synthesis of amino acids, nucleotides, fatty acids, chlorophyll).</p>

          <p><span className="font-semibold text-green-800">Respiratory Quotient (RQ):</span> RQ = CO<sub>2</sub> released / O<sub>2</sub> consumed. For carbohydrates: RQ = 1. For fats: RQ &lt; 1 (≈0.7). For proteins: RQ ≈ 0.8-0.9.</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Total ATP per glucose = <span className="font-semibold">~30-32 ATP</span> (NOT 36-38 — older calculation). O<sub>2</sub> is the final electron acceptor in ETC, producing H<sub>2</sub>O. Krebs cycle is <span className="font-semibold">AMPHIBOLIC</span> (both catabolic &amp; anabolic). Each NADH yields ~2.5 ATP, each FADH<sub>2</sub> yields ~1.5 ATP (accounting for P/O ratios &amp; transport costs). Complex I pumps most H<sup>+</sup> (4). Complex II enters at UQ, bypasses Complex I. ATP synthase needs ~3 H<sup>+</sup> per ATP.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Plant Growth and Hormones",
      pyqFrequency: "High" as const,
      content: (
        <div className="space-y-4">
          <p><span className="font-semibold text-green-800">Phases of Plant Growth:</span></p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li><span className="font-semibold text-green-800">Meristematic Phase:</span> Active cell division in meristems. Cells are small, isodiametric, with dense cytoplasm.</li>
            <li><span className="font-semibold text-green-800">Elongation Phase:</span> Cells increase in size through vacuolation &amp; water uptake. Cell wall expands.</li>
            <li><span className="font-semibold text-green-800">Maturation/Differentiation Phase:</span> Cells specialize &amp; develop specific structure &amp; function. Growth ceases.</li>
          </ul>

          <p><span className="font-semibold text-green-800">Growth Rate Patterns:</span></p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li><span className="font-semibold text-green-800">Arithmetic Growth:</span> Constant/linear increase in size. Length = a + bt (straight line graph). Example: root elongation.</li>
            <li><span className="font-semibold text-green-800">Geometric/Exponential Growth:</span> Doubling of size in equal time intervals. Length = ae<sup>rt</sup> (exponential curve). Example: bacterial population, fungal growth.</li>
          </ul>

          <p><span className="font-semibold text-green-800">Plant Growth Regulators (Hormones):</span></p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-xs">
            <thead className="bg-green-50">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Hormone</th>
                <th className="border border-gray-300 p-2 text-left">Source</th>
                <th className="border border-gray-300 p-2 text-left">Key Functions</th>
                <th className="border border-gray-300 p-2 text-left">Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold">Auxins (IAA)</span></td>
                <td className="border border-gray-300 p-2">Shoot apex, young leaves</td>
                <td className="border border-gray-300 p-2">Apical dominance, phototropism, cell elongation, promotes root initiation</td>
                <td className="border border-gray-300 p-2">Indole-3-acetic acid (IAA)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold">Gibberellins (GA)</span></td>
                <td className="border border-gray-300 p-2">Shoot apex, young leaves, roots, seeds</td>
                <td className="border border-gray-300 p-2">Stem elongation, bolting, seed germination, flower initiation</td>
                <td className="border border-gray-300 p-2">GA<sub>3</sub>, GA<sub>4</sub>, GA<sub>7</sub></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold">Cytokinins</span></td>
                <td className="border border-gray-300 p-2">Root tips, seeds</td>
                <td className="border border-gray-300 p-2">Cell division, delay leaf senescence, apical dominance antagonism</td>
                <td className="border border-gray-300 p-2">Kinetin, 6-benzylaminopurine (BAP)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><span className="font-semibold">Abscisic Acid (ABA)</span></td>
                <td className="border border-gray-300 p-2">All tissues (stress-induced)</td>
                <td className="border border-gray-300 p-2">Stress responses, stomatal closure, seed dormancy, inhibits growth</td>
                <td className="border border-gray-300 p-2">Dormin</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2"><span className="font-semibold">Ethylene (C<sub>2</sub>H<sub>4</sub>)</span></td>
                <td className="border border-gray-300 p-2">All tissues (especially ripening fruit)</td>
                <td className="border border-gray-300 p-2">Fruit ripening, senescence, leaf abscission, triple response</td>
                <td className="border border-gray-300 p-2">Gaseous hormone</td>
              </tr>
            </tbody>
          </table>

          <p><span className="font-semibold text-green-800">Auxin Details:</span> Indole-3-acetic acid (IAA) is primary natural auxin. Produced at shoot apex, transported basipetally (downward) in a polar manner. Promotes cell wall loosening via <span className="font-semibold text-green-800">acid growth theory</span> (H<sup>+</sup> efflux acidifies cell wall, activating expansins that loosen cellulose). <span className="font-semibold text-green-800">Low concentration promotes growth, high concentration inhibits growth</span>.</p>

          <p><span className="font-semibold text-green-800">Gibberellin Function:</span> GA<sub>3</sub> (gibberellic acid) is most abundant. Promotes <span className="font-semibold text-green-800">bolting</span> in rosette plants (sudden elongation before flowering). Overcomes seed dormancy. Induces enzyme production for seed germination (α-amylase for starch breakdown).</p>

          <p><span className="font-semibold text-green-800">Cytokinin Role:</span> Promotes cell division (cytokinesis). Delays leaf senescence (promotes chlorophyll synthesis). Antagonizes apical dominance (promotes lateral bud growth when applied).</p>

          <p><span className="font-semibold text-green-800">ABA as Stress Hormone:</span> Accumulates during stress (drought, cold, salinity). Closes stomata by increasing turgor loss in guard cells (reduces water loss). Induces dormancy in seeds &amp; buds. Inhibits growth.</p>

          <p><span className="font-semibold text-green-800">Ethylene Characteristics:</span> ONLY gaseous hormone (C<sub>2</sub>H<sub>4</sub>). Promotes fruit ripening (climacteric fruits like mango, banana). Triggers senescence &amp; leaf abscission (leaf fall in autumn). Shows <span className="font-semibold text-green-800">triple response</span> in seedlings: inhibition of elongation, radial swelling, horizontal growth.</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> <span className="font-semibold">Auxins</span> = low concentration promotes, high inhibits. <span className="font-semibold">ABA</span> = "stress hormone," closes stomata in drought, maintains seed dormancy. <span className="font-semibold">Ethylene</span> = ONLY gaseous hormone, promotes ripening &amp; senescence. <span className="font-semibold">Gibberellins</span> cause bolting (sudden stem elongation in rosette plants). <span className="font-semibold">Cytokinins</span> delay leaf senescence, promote lateral bud growth. <span className="font-semibold">Apical dominance</span> = suppression of lateral growth by auxin from apex; broken by cytokinins.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Photoperiodism and Vernalisation",
      pyqFrequency: "Medium" as const,
      content: (
        <div className="space-y-4">
          <p><span className="font-semibold text-green-800">Photoperiodism:</span> Physiological response of plants to the relative length of day &amp; night (photoperiod). Controls flowering, dormancy, growth form. <span className="font-semibold text-green-800">Photoreceptor:</span> <span className="font-semibold text-green-800">Phytochrome</span> (blue &amp; red light receptor).</p>

          <p><span className="font-semibold text-green-800">Phytochrome &amp; Its Forms:</span> Reversible pigment with two interconvertible forms. <span className="font-semibold text-green-800">Pr (red-light absorbing form):</span> Inactive form. <span className="font-semibold text-green-800">Pfr (far-red light absorbing form):</span> Active form (Pfr is the physiologically active form). Red light converts Pr → Pfr (day). Far-red light converts Pfr → Pr (night/darkness). Pfr accumulates during day, decays in darkness.</p>

          <p><span className="font-semibold text-green-800">Categories Based on Critical Photoperiod:</span></p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li><span className="font-semibold text-green-800">Short Day Plants (SDP):</span> Flower when day length is LESS than critical photoperiod (actually requires long night). Examples: rice, tobacco, chrysanthemum, soybean, cotton. Also called "long-night plants."</li>
            <li><span className="font-semibold text-green-800">Long Day Plants (LDP):</span> Flower when day length is MORE than critical photoperiod (requires short night). Examples: wheat, barley, radish, spinach, lettuce. Temperate zone plants.</li>
            <li><span className="font-semibold text-green-800">Day Neutral Plants:</span> Flowering independent of photoperiod (respond to other factors like age). Examples: tomato, cucumber, maize, sunflower.</li>
          </ul>

          <p><span className="font-semibold text-green-800">Photoperiodic Response Mechanism:</span> Critical dark period is actually the determining factor (not day length). Interrupting long dark period with a brief light flash (red light creating Pfr) prevents SDP from flowering. This demonstrates Pfr is the active form monitoring night length.</p>

          <p><span className="font-semibold text-green-800">Vernalisation:</span> Exposure to prolonged cold temperatures (low temperature for specific period, typically 4-10°C for weeks) required to induce/accelerate flowering. Breaking dormancy to allow flowering.</p>

          <p><span className="font-semibold text-green-800">Vernalisation Examples &amp; Effect:</span></p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li><span className="font-semibold text-green-800">Winter wheat:</span> Requires cold (winter vernalisation) to flower. Biennial becomes annual after cold treatment.</li>
            <li><span className="font-semibold text-green-800">Cabbage, carrot:</span> Root vegetables requiring cold for bolting (flowering). Prevents premature flowering in warm seasons.</li>
            <li><span className="font-semibold text-green-800">Effect:</span> Cold induces formation of flowering hormone(s), increases Gibberellins levels, or causes epigenetic changes in FLC (FLOWERING LOCUS C) gene, allowing flowering genes to be expressed.</li>
          </ul>

          <p><span className="font-semibold text-green-800">Proposed Vernalisation Hormone:</span> <span className="font-semibold text-green-800">Vernalin</span> (still hypothetical) — proposed to be produced in cold-exposed leaves &amp; transported to shoot apex to trigger flowering.</p>

          <p><span className="font-semibold text-green-800">Seed Dormancy:</span> State of metabolic inactivity &amp; arrested growth. <span className="font-semibold text-green-800">Maintenance:</span> ABA maintains dormancy (prevents germination). <span className="font-semibold text-green-800">Breaking dormancy:</span> Gibberellins (GA<sub>3</sub>) breaks dormancy. Stratification (cold moist treatment, mimics winter) overcomes dormancy. Some seeds require light (photoblastism).</p>

          <p><span className="font-semibold text-green-800">Stratification:</span> Exposure of seeds to cold moist conditions (0-5°C for days/weeks) to break dormancy. Mimics natural winter conditions. Softens seed coat, activates enzymes for germination.</p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-3 text-yellow-800">
            <p><span className="font-semibold">NEET TIP:</span> Critical <span className="font-semibold">photoperiod is determined by dark period length</span> (not day length). SDP = actually "long-night plants" (flower with long nights). Interrupting dark period with red light flash prevents SDP flowering (Pfr = active form). <span className="font-semibold">Phytochrome:</span> Pr (inactive) ↔ Pfr (active). Red light (day) → Pfr. Far-red light (night) → Pr. Pfr decays in darkness. Vernalisation = cold exposure induces flowering. <span className="font-semibold">ABA maintains dormancy, GA breaks it.</span> Stratification = cold moist treatment breaks seed dormancy. Winter wheat becomes capable of flowering after vernalisation.</p>
          </div>
        </div>
      ),
    },
  ],
}

  const getContentForChapter = () => {
    if (slug === "molecular-basis-of-inheritance") {
      return molecularBasisContent
    } else if (slug === "principles-of-inheritance-and-variation") {
      return principlesInheritanceContent
    } else if (slug === "human-physiology") {
      return humanPhysiologyContent
    } else if (slug === "evolution") {
      return evolutionContent
    } else if (slug === "ecology") {
      return ecologyContent
    } else if (slug === "cell-the-unit-of-life") {
      return cellUnitOfLifeContent
    } else if (slug === "biomolecules") {
      return biomoleculesContent
    } else if (slug === "cell-cycle-and-cell-division") {
      return cellDivisionContent
    } else if (slug === "reproduction") {
      return reproductionContent
    } else if (slug === "biotechnology") {
      return biotechnologyContent
    } else if (slug === "biological-classification") {
      return biologicalClassificationContent
    } else if (slug === "the-living-world") {
      return theLivingWorldContent
    } else if (slug === "plant-kingdom") {
      return plantKingdomContent
    } else if (slug === "animal-kingdom") {
      return animalKingdomContent
    } else if (slug === "morphology-of-flowering-plants") {
      return morphologyContent
    } else if (slug === "anatomy-of-flowering-plants") {
      return anatomyContent
    } else if (slug === "structural-organisation-in-animals") {
      return structuralOrgContent
    } else if (slug === "plant-physiology") {
      return plantPhysiologyContent
    }
    return { topics: [] }
  }

  const content = getContentForChapter()

  return (
    <div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100"
    >
      {/* Breadcrumb Navigation */}
      <nav
        className="bg-white border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm overflow-x-auto">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              <Home size={16} />
              Home
            </Link>
            <ChevronDown size={14} className="text-gray-400 rotate-90" />
            <Link href="/biology-notes-for-neet" className="text-blue-600 hover:text-blue-800 font-medium">
              Biology Notes for NEET
            </Link>
            <ChevronDown size={14} className="text-gray-400 rotate-90" />
            <span className="text-gray-600 font-medium whitespace-nowrap">{chapter.name}</span>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={24} />
                <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                  Class {chapter.class} - {chapter.unit}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{chapter.name}</h1>
              <p className="text-blue-100 text-lg max-w-2xl">{chapter.description}</p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-3">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-center">
                <p className="text-blue-100 text-sm">Weightage</p>
                <p className="text-3xl font-bold">{chapter.weightage} Marks</p>
              </div>
              <div className={`${getDifficultyColor(chapter.difficulty).replace("text-", "").replace("bg-", "").replace("border-", "bg-")} rounded-lg p-4 text-center border`}>
                <p className="text-sm font-semibold">Difficulty</p>
                <p className="text-xl font-bold">{chapter.difficulty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Topics Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Topics Covered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.topics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(topic.title)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  activeSection === topic.title
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      PYQ Frequency: <span className="font-bold">{topic.pyqFrequency}</span>
                    </p>
                  </div>
                  {activeSection === topic.title && (
                    <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Content */}
        <div className="space-y-8">
          {content.topics.map((topic, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-lg border-2 overflow-hidden ${
                activeSection === null || activeSection === topic.title ? "border-blue-200" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setExpandedTopic(expandedTopic === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 text-left">
                  <Target className="text-blue-600 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{topic.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Frequently asked in PYQs: <span className="font-bold text-blue-600">{topic.pyqFrequency}</span>
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-gray-600 transition-transform ${
                    expandedTopic === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedTopic === idx && (
                <div
                  className="border-t border-gray-200 px-6 py-6 bg-gradient-to-b from-white to-slate-50"
                >
                  {topic.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8 mt-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Need Expert Guidance?</h2>
            <p className="text-indigo-100 text-lg">
              Master these concepts with our NEET Biology coaching experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="bg-white text-indigo-600 font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
            >
              <Phone size={20} />
              Call {CONTACT_INFO.phone.display.primary}
            </a>

            <a
              href={CONTACT_INFO.whatsapp.linkWithMessage(
                `Hi! I'm interested in NEET Biology coaching. Can you help me with ${chapter.name}?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          </div>

          <p className="text-center text-indigo-100 text-sm mt-6">
            Available Monday-Saturday: 7 AM - 9 PM | Sunday: 9 AM - 6 PM
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div
        className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-600 text-sm">
            These comprehensive notes are aligned with NCERT curriculum and NEET exam patterns.
            <br />
            Regular updates are made to ensure accuracy and relevance for current examination standards.
          </p>
        </div>
      </div>
    </div>
  )
}
