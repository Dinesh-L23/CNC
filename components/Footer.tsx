'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, ChevronRight, Wrench, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Don't render public footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#040e18] text-gray-400 border-t border-[#163655] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1677FF] to-[#00C2FF] flex items-center justify-center text-white shadow-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">MARSWIN</span>
                <span className="block text-[11px] uppercase tracking-widest text-[#00C2FF] font-semibold">
                  Precision Tools
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Delivering reliable, precision-engineered CNC cutting tools, customized tooling solutions, and professional regrinding services for demanding industrial applications.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium bg-[#071A2B] border border-[#163655] px-3 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-[#00C2FF]" />
              Dimensional Accuracy & Consistency Focused
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#1677FF] pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Products Catalog', href: '/products' },
                { name: 'Services & Capabilities', href: '/services' },
                { name: 'Manufacturing Technology', href: '/technology' },
                { name: 'Quality Standards', href: '/quality' },
                { name: 'Tooling Gallery', href: '/gallery' },
                { name: 'Contact & Location', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#00C2FF] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#00C2FF] transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Precision Products */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#00C2FF] pl-2.5">
              Our Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'End Mills (Square, Ball, Corner Radius)', href: '/products/end-mills' },
                { name: 'Solid Carbide Drills & Step Drills', href: '/products/drills' },
                { name: 'Port Cutters (SAE / ISO / BSPP)', href: '/products/port-cutters' },
                { name: 'Precision Machine Reamers', href: '/products/reamers' },
              ].map((prod) => (
                <li key={prod.name}>
                  <Link
                    href={prod.href}
                    className="hover:text-white transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{prod.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#00C2FF] transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-[#071A2B] border border-[#163655]">
              <p className="text-xs text-gray-400">
                Custom tool geometries manufactured to your component engineering drawings.
              </p>
              <Link
                href="/request-quote"
                className="mt-2 inline-block text-xs font-semibold text-[#00C2FF] hover:underline"
              >
                Request Custom Tool Quote →
              </Link>
            </div>
          </div>

          {/* Column 4: Official Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-[#1677FF] pl-2.5">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
                <span className="text-gray-300 leading-snug">
                  7/1, Sakthi Nagar, Udayampalayam Road, Chinnavedampatti, Coimbatore, Tamil Nadu - 641049, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1677FF] shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <a href="tel:+919655505586" className="block hover:text-[#00C2FF] text-gray-300">
                    Karthikeyan: +91 96555 05586
                  </a>
                  <a href="tel:+919840423024" className="block hover:text-[#00C2FF] text-gray-300">
                    Vikram: +91 98404 23024
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00C2FF] shrink-0 mt-1" />
                <div className="space-y-0.5 text-xs">
                  <a href="mailto:info@marswinprecisiontools.in" className="block hover:text-white">
                    info@marswinprecisiontools.in
                  </a>
                  <a href="mailto:sales@marswinprecisiontools.in" className="block hover:text-white">
                    sales@marswinprecisiontools.in
                  </a>
                  <a href="mailto:marswinprecisiontools@gmail.com" className="block hover:text-white text-gray-400">
                    marswinprecisiontools@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-[#163655]/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Marswin Precision Tools. All Rights Reserved. Coimbatore, India.</p>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              About Marswin
            </Link>
            <span>•</span>
            <Link href="/quality" className="hover:text-gray-300 transition-colors">
              Quality Commitment
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Factory Location
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-white text-gray-400 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
