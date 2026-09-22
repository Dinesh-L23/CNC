import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  Target,
  Layers,
  Award,
  ChevronRight,
  ClipboardCheck,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quality at Every Stage | Marswin Precision Tools',
  description:
    'Quality is integrated throughout our manufacturing process, from material preparation and tool geometry to final optical inspection in Coimbatore.',
};

export default function QualityPage() {
  const qualityPillars = [
    {
      title: 'Dimensional Inspection',
      desc: 'Accurate verification of shank diameters, flute lengths, overall lengths, and step transitions against client drawings.',
      icon: Target,
    },
    {
      title: 'Tool Geometry Inspection',
      desc: 'High-magnification optical measurement of helix angles, primary and secondary clearance angles, and radial rake geometries.',
      icon: Search,
    },
    {
      title: 'Surface Quality & Edge Hone',
      desc: 'Inspection of surface roughness (Ra) across flutes to ensure frictionless chip flow and uniform micro-edge preparation.',
      icon: Layers,
    },
    {
      title: 'Final Inspection & Runout Check',
      desc: 'Rigid TIR (Total Indicator Reading) radial runout checking in precision collet fixtures before packaging.',
      icon: ShieldCheck,
    },
    {
      title: 'Process Consistency',
      desc: 'Standardized CNC grinding programs, diamond wheel dressing routines, and batch repeatability controls.',
      icon: ClipboardCheck,
    },
  ];

  const checklistItems = [
    'Raw material chemical and grain size verification',
    'Chucking collet precision runout check (< 0.003 mm)',
    'Continuous coolant temperature and filtration monitoring',
    'In-process optical comparator profile verification',
    'Cutting edge micro-hone consistency check',
    'Post-coating surface adhesion and thickness audit',
    'Laser diameter measurement across cutting flutes',
    'Protective wax/tube packaging before dispatch',
  ];

  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              Quality Assurance
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Quality at Every Stage
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Quality is integrated throughout our manufacturing process, from material preparation and tool geometry to final inspection.
            </p>
          </div>
        </div>
      </section>

      {/* Main Inspection Feature */}
      <section className="py-20 bg-[#071A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div>
              <div className="text-xs font-bold text-[#1677FF] uppercase tracking-wider mb-2">
                Metrology & Optical Verification
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Non-Contact Optical & Laser Metrology
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                Cutting tool performance depends directly on edge sharpness, flute consistency, and tight runout. Our quality lab is equipped with optical measurement systems and precision profile projectors to inspect micro-geometry down to single-micron tolerances.
              </p>
              <div className="p-4 rounded-xl bg-[#0B263D] border border-[#163655] space-y-2 text-xs sm:text-sm text-gray-300">
                <p className="font-semibold text-white">Our Inspection Focus:</p>
                <p>• Verification of relief angles, gash geometries, and web thickness.</p>
                <p>• Concentricity and total indicator reading (TIR) verification.</p>
                <p>• Edge honing inspection to prevent chipping during heavy machining.</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] shadow-2xl">
              <Image
                src="/images/gallery/tool-inspection.jpg"
                alt="Optical Tool Metrology Inspection at Marswin"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#071A2B]/90 backdrop-blur-sm border border-[#163655] text-xs text-gray-300">
                High-magnification tool geometry inspection station in Coimbatore.
              </div>
            </div>
          </div>

          {/* 5 Quality Pillars */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Five Pillars of Marswin Quality
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Rigid operational parameters governing our tool and cutter manufacturing process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityPillars.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-xl bg-[#0B263D] border border-[#163655] hover:border-[#00C2FF] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#071A2B] border border-[#163655] text-[#00C2FF] flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Checklist UI */}
      <section className="py-20 bg-[#040e18] border-t border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Manufacturing Quality Checklist
            </h2>
            <p className="text-sm text-gray-400">
              Every production batch undergoes verification across these standard quality checkpoints before shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {checklistItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#071A2B] border border-[#163655] flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Certifications / Standards Placeholder (Admin Editable) */}
      <section className="py-16 bg-[#071A2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 rounded-2xl bg-[#0B263D] border border-[#163655]">
            <Award className="w-10 h-10 text-[#00C2FF] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Quality Certifications & Compliance
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
              Our quality management processes adhere to rigorous industrial engineering standards. Specific company certifications and audit accreditations can be updated and managed directly from our administration portal.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-xs font-semibold text-[#00C2FF] hover:text-white transition-colors"
            >
              Request Quality Documentation & Audit Compliance Details →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
