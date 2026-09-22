import React, { Suspense } from 'react';
import QuoteForm from './QuoteForm';
import { ShieldCheck, FileCheck2, Clock, Phone, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote (RFQ) | Marswin Precision Tools',
  description:
    'Submit a formal Request for Quotation (RFQ) for custom CNC precision cutting tools, End Mills, Step Drills, Port Cutters, Reamers, and regrinding.',
};

export default function RequestQuotePage() {
  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              Direct B2B Procurement
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Request a Precision Tooling Quote
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Submit your cutting tool specifications, 2D/3D technical drawings, or regrinding quantities. Our engineering estimators in Coimbatore provide fast, competitive technical quotations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Supporting Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0B263D] border border-[#163655] shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Request for Quotation (RFQ)</h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-8">
                Fields marked with an asterisk (<span className="text-rose-400">*</span>) are required.
              </p>
              <Suspense fallback={<div className="text-gray-400 text-sm">Loading RFQ form...</div>}>
                <QuoteForm />
              </Suspense>
            </div>
          </div>

          {/* Right Column: RFQ Guidelines & Direct Support */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655]">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#00C2FF]" />
                Drawing Upload Guidelines
              </h3>
              <ul className="space-y-3 text-xs text-gray-300 leading-relaxed">
                <li>• Accepted formats: <strong>PDF, JPG, PNG, WEBP</strong></li>
                <li>• Max file size: <strong>15 MB</strong></li>
                <li>• Include key tolerances, shank dimensions, and workpiece material specifications where possible.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655]">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1677FF]" />
                Quotation Turnaround
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Standard tool quotation responses are delivered within <strong>4 to 8 business hours</strong>. Custom engineered profiles with special form geometries are quoted within 24 hours.
              </p>
              <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655] text-xs text-[#00C2FF] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                NDA confidential drawing treatment guaranteed.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#071A2B] border border-[#163655]">
              <h3 className="text-sm font-bold text-white mb-2">Prefer Direct Phone Inquiry?</h3>
              <p className="text-xs text-gray-400 mb-4">
                Speak directly with our tooling engineers:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Karthikeyan:</span>
                  <a href="tel:+919655505586" className="text-[#00C2FF] font-semibold">
                    +91 96555 05586
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Vikram:</span>
                  <a href="tel:+919840423024" className="text-[#00C2FF] font-semibold">
                    +91 98404 23024
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
