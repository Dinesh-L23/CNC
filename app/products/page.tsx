import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductsClient from './ProductsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Precision Cutting Tools Catalog | Marswin Precision Tools',
  description:
    'Explore our catalog of CNC solid carbide cutting tools: End Mills, Drills, Port Cutters, and Reamers manufactured in Coimbatore.',
};

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Page Header */}
      <section className="py-16 lg:py-20 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              Precision Tooling Catalog
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Our Precision Products
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Engineered cutting tools designed for accuracy, durability, and consistent machining performance. Manufactured using ultra-fine micrograin carbide and advanced CNC grinding technology.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Products Grid with Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductsClient initialProducts={products} />
      </div>
    </div>
  );
}
