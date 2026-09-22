import React from 'react';
import { prisma } from '@/lib/prisma';
import GalleryClient from './GalleryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CNC Manufacturing & Tooling Gallery | Marswin Precision Tools',
  description:
    'Browse our facility, 5-axis CNC grinding machines, precision cutting tools, and metrology inspection gallery in Coimbatore.',
};

export const revalidate = 0;

export default async function GalleryPage() {
  const galleryItems = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              Visual Showcase
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Precision Tooling Gallery
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Explore our CNC grinding operations, solid carbide tooling, inspection metrology, and manufacturing facility in Coimbatore.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GalleryClient initialItems={galleryItems} />
      </div>
    </div>
  );
}
