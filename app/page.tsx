import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Settings,
  Target,
  Wrench,
  Search,
  Award,
} from 'lucide-react';

export const revalidate = 0; // Dynamic SSR to reflect admin updates immediately

export default async function HomePage() {
  // Fetch real database records
  const [products, services, companyInfo] = await Promise.all([
    prisma.product.findMany({
      where: { status: 'published' },
      take: 4,
      orderBy: { createdAt: 'asc' },
    }),
    prisma.service.findMany({
      where: { status: 'active' },
      take: 6,
      orderBy: { createdAt: 'asc' },
    }),
    prisma.companyInformation.findFirst(),
  ]);

  const processSteps = [
    { num: '01', title: 'Requirement Analysis', desc: 'Detailed review of component drawings, material hardness, and machining parameters.' },
    { num: '02', title: 'Tool Design', desc: 'Precision 3D modeling of tool profile, clearance angles, rake geometry, and flute dynamics.' },
    { num: '03', title: 'Material Preparation', desc: 'Selection of certified ultra-fine submicron tungsten carbide blanks.' },
    { num: '04', title: 'CNC Grinding / Manufacturing', desc: 'Multi-axis CNC tool grinding with continuous coolant filtration.' },
    { num: '05', title: 'Inspection & Quality Check', desc: 'High-magnification optical and laser metrology verification against tight tolerances.' },
    { num: '06', title: 'Final Finishing & Coating', desc: 'Micro-polishing, edge prep hone, and specialized PVD wear coatings (AlTiN/TiAlN).' },
    { num: '07', title: 'Packing & Delivery', desc: 'Protective individual tool packaging, barcode labelling, and prompt dispatch.' },
  ];

  const whyChooseUs = [
    {
      num: '01',
      title: 'Precision Manufacturing',
      desc: 'We focus on dimensional accuracy, consistency, and reliable manufacturing processes.',
      icon: Target,
    },
    {
      num: '02',
      title: 'Expert Engineering Team',
      desc: 'Our engineering-focused team works toward delivering tooling solutions suited to customer requirements.',
      icon: Wrench,
    },
    {
      num: '03',
      title: 'Advanced Technology',
      desc: 'Advanced CNC and 5-axis technology enables the production of complex and precision tool geometries.',
      icon: Cpu,
    },
    {
      num: '04',
      title: 'Quality Focus',
      desc: 'Every product is manufactured with a strong focus on quality and consistent performance.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-[#071A2B] text-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#163655]">
        {/* Background Image with Dark Blue & Navy Industrial Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/cnc-hero.jpg"
            alt="Marswin CNC Precision Tool Grinding"
            fill
            priority
            className="object-cover object-center opacity-40 scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2B] via-[#071A2B]/85 to-[#071A2B]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-[#040e18]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1677FF]/15 border border-[#1677FF]/40 text-[#00C2FF] text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" />
              Precision Manufacturing | Advanced CNC Technology | Quality Focused
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Precision Tools. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-[#1677FF] to-white">
                Engineered for Performance.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl font-light">
              Advanced CNC precision tooling solutions manufactured with accuracy, consistency, and engineering excellence in Coimbatore.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-95 transition-all text-center"
              >
                Explore Products
                <ChevronRight className="w-5 h-5 ml-1.5" />
              </Link>
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#0B263D] hover:bg-[#103859] border border-[#163655] text-gray-200 font-semibold text-base transition-all hover:text-white text-center"
              >
                Request a Quote
              </Link>
            </div>

            {/* Key Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#163655]/80">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">5-Axis</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">CNC Technology</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#00C2FF] tracking-tight">100%</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Metrology Checked</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Micro</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Grain Carbide</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#1677FF] tracking-tight">Custom</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Tool Regrinding</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CAPABILITY STRIP */}
      <section className="bg-[#040e18] border-b border-[#163655] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Target className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-sm font-semibold tracking-wide text-gray-300">Precision Manufacturing</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Cpu className="w-5 h-5 text-[#1677FF]" />
              <span className="text-sm font-semibold tracking-wide text-gray-300">5-Axis CNC Technology</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <RotateCcw className="w-5 h-5 text-[#00C2FF]" />
              <span className="text-sm font-semibold tracking-wide text-gray-300">Tool Regrinding</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1677FF]" />
              <span className="text-sm font-semibold tracking-wide text-gray-300">Quality Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANY INTRODUCTION */}
      <section className="py-20 lg:py-28 bg-[#071A2B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#163655] shadow-2xl group">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/gallery/tool-inspection.jpg"
                  alt="Marswin Precision Inspection and Manufacturing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B263D]/90 backdrop-blur-md border border-[#163655]">
                <p className="text-xs text-gray-300 font-medium">
                  State-of-the-art optical and laser tool geometry verification in Coimbatore.
                </p>
              </div>
            </div>

            {/* Right Description & Key Statistics */}
            <div>
              <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
                Company Introduction
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                Precision Engineering for Modern Manufacturing
              </h2>
              <p className="text-base text-gray-300 leading-relaxed mb-8">
                {companyInfo?.description ||
                  'At Marswin Precision Tools, we focus on delivering reliable and precision-engineered cutting tools for modern manufacturing requirements. Our expertise in CNC tool manufacturing, grinding, regrinding, and advanced machining enables us to provide consistent solutions for demanding industrial applications.'}
              </p>

              {/* Four Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#0B263D] border border-[#163655]">
                  <div className="text-xl font-bold text-white mb-1">Precision Manufacturing</div>
                  <p className="text-xs text-gray-400">Strict tolerance control and repeatability</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B263D] border border-[#163655]">
                  <div className="text-xl font-bold text-[#00C2FF] mb-1">5-Axis Technology</div>
                  <p className="text-xs text-gray-400">Complex multi-flute contours & forms</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B263D] border border-[#163655]">
                  <div className="text-xl font-bold text-white mb-1">Quality Focused</div>
                  <p className="text-xs text-gray-400">Integrated metrology inspection</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B263D] border border-[#163655]">
                  <div className="text-xl font-bold text-[#1677FF] mb-1">Industrial Solutions</div>
                  <p className="text-xs text-gray-400">Serving automotive, aerospace & dies</p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center text-sm font-semibold text-[#00C2FF] hover:text-white transition-colors group"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS SECTION */}
      <section className="py-20 bg-[#040e18] border-t border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
                Cutting Tools Catalog
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Our Precision Products
              </h2>
              <p className="text-gray-400 mt-2 max-w-xl text-sm">
                Engineered cutting tools designed for accuracy, durability, and consistent machining performance.
              </p>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-[#1677FF] hover:text-[#00C2FF] transition-colors"
            >
              View Full Product Catalog
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-xl bg-[#071A2B] border border-[#163655] overflow-hidden hover:border-[#1677FF] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#0B263D]">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#071A2B]/80 backdrop-blur-sm border border-[#163655] text-[11px] font-semibold text-[#00C2FF]">
                      Solid Carbide
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {prod.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-[#163655]/60 flex items-center justify-between">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-white hover:text-[#00C2FF] transition-colors"
                    >
                      View Product
                      <ChevronRight className="w-3.5 h-3.5 ml-1 text-[#1677FF]" />
                    </Link>
                    <Link
                      href={`/request-quote?product=${encodeURIComponent(prod.name)}`}
                      className="text-xs font-medium text-gray-400 hover:text-white px-2 py-1 rounded bg-[#0B263D] hover:bg-[#163655] transition-colors"
                    >
                      Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="py-20 lg:py-28 bg-[#071A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
              Manufacturing Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Services We Provide
            </h2>
            <p className="text-gray-400 text-sm">
              Comprehensive tooling solutions from raw tungsten carbide rod to customized profiles and performance regrinding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="group relative rounded-xl bg-[#0B263D] border border-[#163655] p-6 hover:border-[#00C2FF]/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#163655] group-hover:text-[#1677FF] transition-colors">
                      0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#071A2B] border border-[#163655] flex items-center justify-center text-[#00C2FF]">
                      <Settings className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00C2FF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#163655]/60">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-xs font-semibold text-[#1677FF] group-hover:text-[#00C2FF] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-20 bg-[#040e18] border-t border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
              Engineering Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Why Choose Marswin Precision Tools?
            </h2>
            <p className="text-gray-400 text-sm">
              We combine advanced multi-axis grinding technology with rigid quality control to deliver dependable tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.num}
                  className="rounded-xl bg-[#071A2B] border border-[#163655] p-6 hover:border-[#1677FF] transition-colors"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#0B263D] text-[#00C2FF] border border-[#163655]">
                      {item.num}
                    </span>
                    <IconComp className="w-6 h-6 text-[#1677FF]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2.5">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. MANUFACTURING PROCESS TIMELINE */}
      <section className="py-20 lg:py-28 bg-[#071A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
              Workflow & Precision Execution
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              7-Step Manufacturing Process
            </h2>
            <p className="text-gray-400 text-sm">
              From engineering drawing consultation to finished cutting tool delivery.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className="relative rounded-xl bg-[#0B263D] border border-[#163655] p-6 flex flex-col justify-between group hover:border-[#00C2FF] transition-colors"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#071A2B] border border-[#163655] text-[#00C2FF] font-bold flex items-center justify-center text-sm mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-[#163655]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. TECHNOLOGY PREVIEW */}
      <section className="py-20 bg-[#040e18] border-t border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
                Machining Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
                Advanced Manufacturing Technology
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#071A2B] border border-[#163655]">
                  <h3 className="text-base font-bold text-white mb-1">CNC Tool Grinding</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Accurate edge preparation, consistent rake angles, and minimal runout using advanced multi-axis grinding.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#071A2B] border border-[#163655]">
                  <h3 className="text-base font-bold text-[#00C2FF] mb-1">5-Axis Technology</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Enables manufacturing of complex stepped forms, intricate ball-nose radii, and specialized porting contours.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#071A2B] border border-[#163655]">
                  <h3 className="text-base font-bold text-white mb-1">Tool Regrinding Technology</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Restoring cutting performance to factory geometry, maximizing tool life and lowering manufacturing cost per component.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/technology"
                  className="inline-flex items-center text-sm font-semibold text-[#1677FF] hover:text-[#00C2FF] transition-colors"
                >
                  Explore Technology Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#163655] aspect-[4/3] bg-[#071A2B]">
              <Image
                src="/images/gallery/cnc-grinding-machine.jpg"
                alt="Marswin 5-Axis CNC Tool Grinder"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040e18] via-transparent to-transparent opacity-70" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION SECTION */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-[#071A2B] to-[#040e18] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1677FF]/20 border border-[#1677FF]/40 text-[#00C2FF] text-xs font-semibold mb-6">
            <CheckCircle2 className="w-4 h-4" /> Ready for Custom Tool Quotations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Have a Precision Tool Requirement?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let's build the right tooling solution for your application. Upload your engineering drawings or contact our technical team in Coimbatore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-bold text-base shadow-xl shadow-blue-500/20 hover:brightness-110 active:scale-95 transition-all text-center"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0B263D] hover:bg-[#103859] border border-[#163655] text-gray-200 font-semibold text-base transition-all text-center"
            >
              Contact Our Coimbatore Facility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
