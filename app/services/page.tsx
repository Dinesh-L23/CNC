import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Wrench,
  Cpu,
  RotateCcw,
  Cog,
  Layers,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CNC Tooling & Regrinding Services | Marswin Precision Tools',
  description:
    'Explore our precision tool manufacturing, CNC tool grinding, tool regrinding, custom tool solutions, and 5-axis CNC machining services in Coimbatore.',
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { status: 'active' },
    orderBy: { createdAt: 'asc' },
  });

  const detailedHighlights: Record<string, string[]> = {
    'precision-tool-manufacturing': [
      'Square, ball nose, corner radius, and rougher end mills',
      'Solid carbide twist drills and custom step drills',
      'High-precision machine reamers (straight & spiral flutes)',
      'Hydraulic valve cavity port contour cutters',
      'Manufacturing to close micron tolerances (h6, m7)',
    ],
    'cnc-tool-grinding': [
      'Multi-axis CNC tool and cutter grinding centers',
      'Precision diamond and CBN grinding wheels',
      'Flute geometry, clearance angle, and gash grinding',
      'Controlled edge hone prep for extended edge retention',
      'Consistent batch repeatability and minimal runout',
    ],
    'tool-regrinding': [
      'Complete restoration of cutting edges to OEM geometry',
      'Significant tooling cost reduction (up to 60-70% savings)',
      'Step drill, end mill, and reamer regrinding and recoating',
      'Fast turnaround time for regional Coimbatore machine shops',
      'Quality inspection after regrinding',
    ],
    'custom-tool-solutions': [
      'Tailored tool geometry for difficult-to-machine alloys (Inconel, Titanium, Tool Steels)',
      'Combination tools to merge multiple operations into single pass',
      'Special shank lengths, coolant passages, and reach requirements',
      'Direct engineering support based on customer component CAD drawings',
    ],
    '5-axis-cnc-manufacturing': [
      'Simultaneous 5-axis tool grinding for complex geometries',
      'Variable helix and variable pitch anti-vibration cutters',
      'Custom form cutters with complex profile radii and tapers',
      'Extreme accuracy across multiple clamping axes',
    ],
  };

  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              Capabilities & Services
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Services We Provide
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              From new cutting tool manufacturing to specialized profile grinding and tool regrinding, Marswin Precision Tools offers comprehensive precision engineering services.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {services.map((service, index) => {
          const isEven = index % 2 === 1;
          const highlights =
            detailedHighlights[service.slug] || [
              'Manufactured according to customer requirements',
              'Consistent accuracy and high surface quality',
              'Strict dimensional inspection',
            ];

          return (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                isEven ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`relative rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] aspect-[4/3] shadow-2xl ${isEven ? 'lg:col-start-2' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#071A2B]/90 backdrop-blur-sm border border-[#163655] text-xs font-bold text-[#00C2FF]">
                  Service 0{index + 1}
                </div>
              </div>

              {/* Text Column */}
              <div className={isEven ? 'lg:col-start-1' : ''}>
                <div className="text-xs font-bold text-[#1677FF] uppercase tracking-wider mb-2">
                  Service 0{index + 1}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {service.title}
                </h2>
                <p className="text-base text-gray-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#00C2FF] shrink-0 mt-1" />
                      <span className="text-xs sm:text-sm text-gray-300">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/request-quote?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all"
                  >
                    Inquire About This Service
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-5 py-3 rounded-lg bg-[#0B263D] hover:bg-[#103859] border border-[#163655] text-gray-300 text-xs font-semibold transition-colors"
                  >
                    Contact Engineers
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regrinding Callout Banner */}
      <section className="bg-[#040e18] border-t border-[#163655] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/15 border border-[#00C2FF]/30 text-[#00C2FF] flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Optimize Your Machining Budget with Tool Regrinding
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Send your worn solid carbide end mills and drills to our Coimbatore facility for precision regrinding, re-sharpening, and coating restoration.
          </p>
          <Link
            href="/request-quote"
            className="inline-flex items-center px-7 py-3.5 rounded-lg bg-[#1677FF] text-white text-xs font-semibold shadow-lg hover:bg-[#0099FF] transition-all"
          >
            Schedule Regrinding Evaluation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
