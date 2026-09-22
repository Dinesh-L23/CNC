import React from 'react';
import Link from 'next/link';
import { Wrench, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#071A2B] text-white px-4">
      <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#0B263D] border border-[#163655] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#1677FF]/20 border border-[#1677FF]/40 text-[#00C2FF] flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-8 h-8" />
        </div>
        <div className="text-4xl font-extrabold text-white mb-2">404</div>
        <h1 className="text-xl font-bold text-gray-200 mb-3">Page or Product Not Found</h1>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-8">
          The page or precision tool product you're looking for may have been removed, renamed, or is currently unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="px-5 py-2.5 rounded-lg bg-[#1677FF] text-white text-xs font-semibold hover:bg-[#0099FF] transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Wrench className="w-4 h-4" />
            View All Products
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-gray-300 text-xs font-semibold hover:text-white transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
