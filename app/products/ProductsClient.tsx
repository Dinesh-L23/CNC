'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronRight, Filter, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  material: string;
  coating: string;
  status: string;
}

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Milling', 'Drilling', 'Porting', 'Hole Finishing'];

  const filtered = initialProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      product.material.toLowerCase().includes(search.toLowerCase());

    if (selectedFilter === 'All') return matchesSearch;
    if (selectedFilter === 'Milling') return matchesSearch && product.slug.includes('end-mill');
    if (selectedFilter === 'Drilling') return matchesSearch && product.slug.includes('drill');
    if (selectedFilter === 'Porting') return matchesSearch && product.slug.includes('port');
    if (selectedFilter === 'Hole Finishing') return matchesSearch && product.slug.includes('reamer');

    return matchesSearch;
  });

  return (
    <div>
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#163655]">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tool name, material..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0B263D] border border-[#163655] text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-[#1677FF] text-white shadow-md'
                  : 'bg-[#0B263D] text-gray-300 hover:text-white border border-[#163655]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#0B263D] rounded-xl border border-[#163655]">
          <p className="text-gray-300 text-base">No precision tools match your search criteria.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedFilter('All');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-[#1677FF] text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-[#0B263D] border border-[#163655] overflow-hidden hover:border-[#00C2FF] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] relative overflow-hidden bg-[#071A2B]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#071A2B]/85 backdrop-blur-sm border border-[#163655] text-[11px] font-semibold text-[#00C2FF]">
                    {product.material}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#071A2B]/85 backdrop-blur-sm border border-[#163655] text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Regrinding
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
                    {product.shortDescription}
                  </p>
                  <div className="text-xs text-gray-400 bg-[#071A2B] p-2.5 rounded-lg border border-[#163655]/60 mb-2">
                    <span className="text-gray-300 font-medium">Standard Coating: </span>
                    {product.coating}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#163655] flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#071A2B] hover:bg-[#163655] border border-[#163655] text-white text-xs font-semibold transition-colors"
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5 ml-1 text-[#00C2FF]" />
                  </Link>
                  <Link
                    href={`/request-quote?product=${encodeURIComponent(product.name)}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-semibold hover:brightness-110 active:scale-95 transition-all"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
