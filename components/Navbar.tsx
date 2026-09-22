'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronRight, ShieldCheck, Wrench } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Technology', href: '/technology' },
    { name: 'Quality', href: '/quality' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  // Don't render public navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#040e18] text-gray-300 text-xs py-1.5 px-4 border-b border-[#163655]/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Coimbatore Precision Tool Manufacturing & Regrinding Center
            </span>
            <span className="text-gray-600">|</span>
            <a
              href="tel:+919655505586"
              className="flex items-center gap-1.5 hover:text-[#00C2FF] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1677FF]" />
              +91 96555 05586
            </a>
            <a
              href="mailto:info@marswinprecisiontools.in"
              className="flex items-center gap-1.5 hover:text-[#00C2FF] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#1677FF]" />
              info@marswinprecisiontools.in
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00C2FF]" />
              Quality Focused
            </span>
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-white transition-colors text-[11px] underline underline-offset-2"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#071A2B]/95 backdrop-blur-md shadow-xl border-b border-[#163655]'
            : 'bg-[#071A2B] border-b border-[#163655]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1677FF] to-[#00C2FF] flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                  MARSWIN
                  <span className="text-[#00C2FF] text-xs font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#1677FF]/20 border border-[#1677FF]/40">
                    PRECISION
                  </span>
                </span>
                <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium -mt-0.5">
                  Cutting Tools & Manufacturing
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'text-[#00C2FF] bg-[#0B263D] border border-[#163655]'
                        : 'text-gray-300 hover:text-white hover:bg-[#0B263D]/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Primary Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/request-quote"
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all bg-gradient-to-r from-[#1677FF] to-[#0099FF] rounded-lg shadow-md hover:shadow-cyan-500/20 hover:brightness-110 active:scale-95"
              >
                Request a Quote
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#0B263D] focus:outline-none border border-[#163655]"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#071A2B] border-b border-[#163655] shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#00C2FF] bg-[#0B263D] border-l-4 border-[#00C2FF]'
                      : 'text-gray-300 hover:text-white hover:bg-[#0B263D]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#163655] mt-4 space-y-3">
              <Link
                href="/request-quote"
                className="w-full flex items-center justify-center px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#1677FF] to-[#0099FF] rounded-lg shadow-lg"
              >
                Request a Quote
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Link>
              <div className="text-xs text-gray-400 space-y-1.5 px-2 pt-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#00C2FF]" />
                  +91 96555 05586 / +91 98404 23024
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#00C2FF]" />
                  info@marswinprecisiontools.in
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
