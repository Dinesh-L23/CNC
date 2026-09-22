import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: 'Product Not Found | Marswin Precision Tools',
    };
  }

  return {
    title: `${product.name} | Marswin Precision Tools`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} - CNC Cutting Tools | Marswin Precision Tools`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export const revalidate = 0;

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      slug: { not: slug },
      status: 'published',
    },
    take: 3,
  });

  // Parse applications and specifications safely
  let applications: string[] = [];
  try {
    applications = JSON.parse(product.applications);
  } catch {
    applications = product.applications
      ? product.applications.split('\n').filter(Boolean)
      : ['General Precision CNC Machining'];
  }

  let specifications: Record<string, string> = {};
  try {
    specifications = JSON.parse(product.specifications);
  } catch {
    specifications = {};
  }

  // Ensure default standard keys exist if empty
  const defaultSpecKeys = [
    'Product Type',
    'Diameter Range',
    'Overall Length (OAL)',
    'Cutting Length',
    'Number of Flutes',
    'Material Grade',
    'Coating Options',
    'Tolerance',
    'Regrinding Availability',
  ];

  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="bg-[#040e18] border-b border-[#163655] py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#00C2FF] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Product Hero */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#071A2B]/90 backdrop-blur-md border border-[#163655] text-xs font-semibold text-[#00C2FF]">
                  {product.material}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0B263D] border border-[#163655] flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  CNC Regrinding & Recoating Supported
                </span>
                <span className="text-[#00C2FF] font-semibold">100% Quality Checked</span>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div>
              <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-2">
                Precision Cutting Tool
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-base text-gray-300 leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8 text-xs">
                <div className="p-3 rounded-lg bg-[#0B263D] border border-[#163655]">
                  <span className="text-gray-400 block mb-1">Standard Material</span>
                  <span className="text-white font-semibold">{product.material || 'Solid Carbide'}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0B263D] border border-[#163655]">
                  <span className="text-gray-400 block mb-1">Wear Coating</span>
                  <span className="text-[#00C2FF] font-semibold">{product.coating || 'AlTiN'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 mb-8">
                <Link
                  href={`/request-quote?product=${encodeURIComponent(product.name)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:brightness-110 active:scale-95 transition-all text-center"
                >
                  Request a Quote for {product.name}
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#0B263D] hover:bg-[#163655] border border-[#163655] text-gray-200 text-sm font-semibold transition-colors text-center"
                >
                  Contact Technical Sales
                </Link>
              </div>

              <div className="text-xs text-gray-400">
                Custom tool diameters, flutes, step profiles, and special tolerances can be manufactured to your 2D/3D part drawings.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview, Applications & Specifications */}
      <section className="py-16 bg-[#040e18] border-t border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Detailed Description */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-l-2 border-[#1677FF] pl-3">
              Detailed Overview
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-4xl">
              {product.description}
            </p>
          </div>

          {/* Applications */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-l-2 border-[#00C2FF] pl-3">
              Machining Applications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.map((app, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#071A2B] border border-[#163655] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00C2FF] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Specifications Table */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-l-2 border-[#1677FF] pl-3">
                Technical Specifications
              </h2>
              <span className="text-xs text-gray-400 mt-1 sm:mt-0">
                *Custom specifications manufactured on request
              </span>
            </div>

            <div className="rounded-xl border border-[#163655] overflow-hidden bg-[#071A2B] shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0B263D] border-b border-[#163655] text-xs font-semibold text-[#00C2FF] uppercase tracking-wider">
                      <th className="py-3.5 px-6">Specification Parameter</th>
                      <th className="py-3.5 px-6">Standard Range / Technical Capability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#163655]/60 text-xs sm:text-sm">
                    {/* Render entries from database, or fallback gracefully with 'Available on request' */}
                    {Object.keys(specifications).length > 0 ? (
                      Object.entries(specifications).map(([key, val]) => (
                        <tr key={key} className="hover:bg-[#0B263D]/40 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-gray-200">{key}</td>
                          <td className="py-3.5 px-6 text-gray-300">{val || 'Available on request'}</td>
                        </tr>
                      ))
                    ) : (
                      defaultSpecKeys.map((k) => (
                        <tr key={k} className="hover:bg-[#0B263D]/40 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-gray-200">{k}</td>
                          <td className="py-3.5 px-6 text-gray-400 italic">Available on request</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-12 border-t border-[#163655]">
              <h2 className="text-xl font-bold text-white mb-6">Related Precision Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.slug}`}
                    className="group p-4 rounded-xl bg-[#071A2B] border border-[#163655] hover:border-[#1677FF] transition-all flex items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden relative shrink-0 bg-[#0B263D]">
                      <Image src={rel.image} alt={rel.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00C2FF] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-1">{rel.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
