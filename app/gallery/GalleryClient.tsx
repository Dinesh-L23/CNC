'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Filter } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export default function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'CNC Machines',
    'Manufacturing',
    'Grinding',
    'Products',
    'Inspection',
    'Facility',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#163655]">
        <span className="text-xs text-gray-400 flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#1677FF] text-white shadow-md'
                : 'bg-[#0B263D] text-gray-300 hover:text-white border border-[#163655]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#0B263D] rounded-xl border border-[#163655]">
          <p className="text-gray-300 text-sm">No images in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-xl overflow-hidden bg-[#0B263D] border border-[#163655] cursor-pointer hover:border-[#00C2FF] transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#071A2B]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#1677FF]/80 text-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#071A2B]/85 backdrop-blur-sm border border-[#163655] text-[10px] font-semibold text-[#00C2FF]">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#00C2FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0B263D] border border-[#163655] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#071A2B]/80 text-white hover:bg-[#1677FF] transition-colors"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full bg-[#040e18]">
              <Image
                src={activeImage.imageUrl}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-[#071A2B] border-t border-[#163655]">
              <div className="inline-block px-2.5 py-1 rounded bg-[#0B263D] text-[#00C2FF] text-[11px] font-semibold mb-2">
                {activeImage.category}
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{activeImage.title}</h2>
              <p className="text-xs text-gray-300">{activeImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
