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
  class: 12
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

  const getContentForChapter = () => {
    if (slug === "molecular-basis-of-inheritance") {
      return molecularBasisContent
    } else if (slug === "principles-of-inheritance-and-variation") {
      return principlesInheritanceContent
    } else if (slug === "human-physiology") {
      return humanPhysiologyContent
    }
    return { topics: [] }
  }

  const content = getContentForChapter()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100"
    >
      {/* Breadcrumb Navigation */}
      <motion.nav
        variants={itemVariants}
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
      </motion.nav>

      {/* Header Section */}
      <motion.div
        variants={itemVariants}
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
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={itemVariants}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Topics Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Topics Covered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.topics.map((topic, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detailed Content */}
        <div className="space-y-8">
          {content.topics.map((topic, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={activeSection === null || activeSection === topic.title ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
              transition={{ duration: 0.3 }}
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
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 px-6 py-6 bg-gradient-to-b from-white to-slate-50"
                >
                  {topic.content}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={itemVariants}
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
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="bg-white text-indigo-600 font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
            >
              <Phone size={20} />
              Call {CONTACT_INFO.phone.display.primary}
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={CONTACT_INFO.whatsapp.linkWithMessage(
                `Hi! I'm interested in NEET Biology coaching. Can you help me with ${chapter.name}?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={20} />
              WhatsApp Us
            </motion.a>
          </div>

          <p className="text-center text-indigo-100 text-sm mt-6">
            Available Monday-Saturday: 7 AM - 9 PM | Sunday: 9 AM - 6 PM
          </p>
        </div>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        variants={itemVariants}
        className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-600 text-sm">
            These comprehensive notes are aligned with NCERT curriculum and NEET exam patterns.
            <br />
            Regular updates are made to ensure accuracy and relevance for current examination standards.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
