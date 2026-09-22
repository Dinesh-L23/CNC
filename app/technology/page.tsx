import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Cpu,
  Layers,
  Target,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Manufacturing Technology | Marswin Precision Tools',
  description:
    'Learn about our CNC tool grinding, 5-axis technology, precision manufacturing consistency, and tool regrinding processes in Coimbatore.',
};

export default function TechnologyPage() {
  const processSteps = [
    { num: '01', title: 'Requirement Analysis', desc: 'Detailed review of component drawings, material hardness, and machining parameters.' },
    { num: '02', title: 'Tool Design', desc: 'Precision modeling of tool profile, clearance angles, rake geometry, and flute dynamics.' },
    { num: '03', title: 'Material Preparation', desc: 'Selection of certified ultra-fine submicron tungsten carbide blanks.' },
    { num: '04', title: 'CNC Grinding / Manufacturing', desc: 'Multi-axis CNC tool grinding with continuous coolant filtration.' },
    { num: '05', title: 'Inspection & Quality Check', desc: 'High-magnification optical and laser metrology verification against tight tolerances.' },
    { num: '06', title: 'Final Finishing', desc: 'Micro-polishing, edge prep hone, and specialized wear coatings.' },
    { num: '07', title: 'Packing & Delivery', desc: 'Protective individual tool packaging and prompt dispatch.' },
  ];

  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              Engineering & Capability
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Advanced Manufacturing Technology
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              We leverage modern multi-axis CNC grinding methods, ultra-fine micrograin carbide substrates, and optical metrology inspection to deliver cutting tools engineered for high-precision machining.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Technology Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Tech 1: CNC Tool Grinding */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#1677FF]/20 border border-[#1677FF]/40 text-[#00C2FF] flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              CNC Tool Grinding
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              CNC tool grinding is at the heart of modern precision cutting tool manufacturing. By employing multi-axis computerized tool and cutter grinders, we generate razor-sharp cutting edges, uniform helix angles, and precise radial relief angles.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Precision grinding wheels with micro-diamond abrasives and synthetic temperature-controlled coolant ensure thermal stability throughout grinding, preventing micro-fractures in the tungsten carbide structure and ensuring maximum tool longevity.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Flute gashing and clearance angle grinding
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Controlled micro-edge preparation for chatter suppression
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Smooth chip evacuation flutes for high-speed machining
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] shadow-2xl">
            <Image
              src="/images/gallery/cnc-grinding-machine.jpg"
              alt="CNC Tool Grinding Technology"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tech 2: 5-Axis Technology */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-dense">
          <div className="lg:col-start-2">
            <div className="w-10 h-10 rounded-lg bg-[#00C2FF]/20 border border-[#00C2FF]/40 text-[#00C2FF] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              5-Axis Technology
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              5-axis CNC grinding allows simultaneous interpolation across linear and rotary axes. This capability enables the production of complex cutting tool geometries that are impossible on standard 3-axis machines.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              From variable helix end mills that cancel harmonics during deep pocketing to multi-stepped drills and intricate hydraulic port contours, 5-axis technology ensures that all features are ground in a single clamping setup, eliminating runout and cumulative positioning errors.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Complex helical ball nose and toroidal profiles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Single-setup precision form generation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Unequal flute index spacing for vibration damping
              </li>
            </ul>
          </div>
          <div className="lg:col-start-1 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] shadow-2xl">
            <Image
              src="/images/hero/cnc-hero.jpg"
              alt="5-Axis CNC Tool Grinding"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tech 3: Precision Manufacturing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#1677FF]/20 border border-[#1677FF]/40 text-[#00C2FF] flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Precision Manufacturing: Repeatability & Consistency
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Modern CNC machine shops demand tools that behave identically from tool to tool. Our precision manufacturing framework prioritizes process capability, continuous measurement, and tight dimensional control.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              By maintaining calibrated collet chucking systems, stable thermal shop conditions, and non-contact laser tool inspection, we verify that every tool meets specified tolerances before leaving the manufacturing floor.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Consistent tool life across production runs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Minimized radial runout for high-speed spindles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Dedicated quality checklist at every manufacturing phase
              </li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] shadow-2xl">
            <Image
              src="/images/gallery/tool-inspection.jpg"
              alt="Metrology and Precision Manufacturing"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tech 4: Regrinding Technology */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:grid-flow-dense">
          <div className="lg:col-start-2">
            <div className="w-10 h-10 rounded-lg bg-[#00C2FF]/20 border border-[#00C2FF]/40 text-[#00C2FF] flex items-center justify-center mb-4">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Regrinding Technology
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Solid carbide tooling represents a significant industrial investment. Rather than discarding worn tools, our professional regrinding technology restores cutting edges and flute profiles to near-original factory condition.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Through careful inspection of edge wear, precision end cut-off, re-fluting, point reconstitution, and specialized physical vapor deposition (PVD) recoating, reground tools deliver 85% to 95% of original tool life at a fraction of the replacement cost.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Square and ball nose end mill re-sharpening
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Carbide drill split-point and step regrinding
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                Re-coating with wear-resistant PVD coatings
              </li>
            </ul>
          </div>
          <div className="lg:col-start-1 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] shadow-2xl">
            <Image
              src="/images/gallery/tool-regrinding-process.jpg"
              alt="Tool Regrinding Technology"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Process Timeline Section */}
      <section className="py-20 bg-[#040e18] border-t border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
              Step-by-Step Workflow
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              7-Step Manufacturing Process
            </h2>
            <p className="text-gray-400 text-sm">
              Standardized methodology ensuring precision repeatability from design to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s) => (
              <div
                key={s.num}
                className="p-6 rounded-xl bg-[#071A2B] border border-[#163655] relative group hover:border-[#00C2FF] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B263D] border border-[#163655] text-[#00C2FF] font-bold flex items-center justify-center text-sm mb-4">
                  {s.num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
