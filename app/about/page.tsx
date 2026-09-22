import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ShieldCheck, Target, Award, Wrench, Cpu, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Marswin Precision Tools',
  description:
    'Learn about Marswin Precision Tools in Coimbatore. Engineering precision cutting tools, End Mills, Drills, Port Cutters, and tool regrinding solutions.',
};

export const revalidate = 0;

export default async function AboutPage() {
  const companyInfo = await prisma.companyInformation.findFirst();

  const values = [
    {
      title: 'Precision & Accuracy',
      desc: 'Committed to tight micron-level dimensional tolerances on every tool produced.',
      icon: Target,
    },
    {
      title: 'Integrity & Quality',
      desc: 'Rigid quality control across material selection, CNC tool grinding, and final inspection.',
      icon: ShieldCheck,
    },
    {
      title: 'Customer-Centric Engineering',
      desc: 'Tailoring tool profiles, coatings, and flute geometries to solve demanding machining challenges.',
      icon: Wrench,
    },
    {
      title: 'Continuous Innovation',
      desc: 'Embracing multi-axis CNC technology, advanced grinding dynamics, and regrinding methods.',
      icon: Cpu,
    },
  ];

  const journeySteps = [
    {
      year: 'Foundation',
      title: 'Established in Coimbatore',
      desc: 'Marswin Precision Tools was established in Chinnavedampatti, Coimbatore, focusing on high-precision cutting tool solutions.',
    },
    {
      year: 'Technology',
      title: 'Advanced CNC Grinding Expansion',
      desc: 'Invested in multi-axis CNC tool grinding technology to produce complex stepped drills, end mills, and custom port cutters.',
    },
    {
      year: 'Regrinding',
      title: 'Tool Regrinding & Service Excellence',
      desc: 'Introduced professional tool regrinding and recoating programs to deliver tool longevity and significant cost savings for clients.',
    },
    {
      year: 'Present',
      title: 'Precision Tooling Partner',
      desc: 'Serving automotive, die & mold, fluid power, and precision engineering industries across Tamil Nadu and throughout India.',
    },
  ];

  return (
    <div className="bg-[#071A2B] text-white">
      {/* Page Header */}
      <section className="relative py-20 lg:py-24 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              About Marswin Precision Tools
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Engineering Precision. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#1677FF]">
                Delivering Confidence.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Marswin Precision Tools provides precision tooling solutions for modern manufacturing requirements. Our focus is on reliable manufacturing, advanced CNC technology, quality, and customer-oriented tooling solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Overview Section */}
      <section className="py-20 bg-[#071A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Our Heritage & Precision Commitment
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                {companyInfo?.description ||
                  'At Marswin Precision Tools, we focus on delivering reliable and precision-engineered cutting tools for modern manufacturing requirements. Our expertise in CNC tool manufacturing, grinding, regrinding, and advanced machining enables us to provide consistent solutions for demanding industrial applications.'}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Located in Chinnavedampatti, Coimbatore—the engineering hub of South India—we produce solid carbide end mills, step drills, contour port cutters, and reamers for machine shops and manufacturing plants seeking uncompromised tool life and finish.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0" />
                  <span>Ultra-fine submicron solid carbide raw materials</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0" />
                  <span>Advanced multi-axis CNC tool and cutter grinding</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0" />
                  <span>100% optical inspection and micro-geometry edge verification</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#00C2FF] shrink-0" />
                  <span>Comprehensive regrinding services for cost optimization</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#163655] aspect-[4/3] bg-[#0B263D] shadow-2xl">
              <Image
                src="/images/gallery/manufacturing-facility.jpg"
                alt="Marswin Facility"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 bg-[#040e18] border-t border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-[#071A2B] border border-[#163655] relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#1677FF]/20 border border-[#1677FF]/40 text-[#00C2FF] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                To deliver world-class CNC precision cutting tools and regrinding services that elevate our clients' machining productivity, reduce cycle times, and ensure consistent dimensional accuracy across every component machined.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#071A2B] border border-[#163655] relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#00C2FF]/20 border border-[#00C2FF]/40 text-[#00C2FF] flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                To be the most trusted precision cutting tool manufacturer and tool regrinding partner in India, known for engineering integrity, technological agility, and relentless focus on industrial quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#071A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
              Our Principles
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Values That Drive Our Craft
            </h2>
            <p className="text-gray-400 text-sm">
              Precision is not just our product—it is the standard that governs every step of our operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const IconComp = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-xl bg-[#0B263D] border border-[#163655] hover:border-[#1677FF] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#071A2B] border border-[#163655] text-[#00C2FF] flex items-center justify-center mb-5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Journey Timeline */}
      <section className="py-20 bg-[#040e18] border-t border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
              Milestones
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Our Journey in Precision Tooling
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {journeySteps.map((step) => (
              <div
                key={step.year}
                className="p-6 rounded-xl bg-[#071A2B] border border-[#163655] relative"
              >
                <div className="text-xs font-bold text-[#00C2FF] mb-2">{step.year}</div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/request-quote"
              className="inline-flex items-center px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-semibold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Discuss Your Tooling Requirements
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
