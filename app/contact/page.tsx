import React from 'react';
import ContactForm from './ContactForm';
import { MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Marswin Precision Tools - Coimbatore',
  description:
    'Contact Marswin Precision Tools in Chinnavedampatti, Coimbatore. Direct contact numbers for Karthikeyan (+91 96555 05586) & Vikram (+91 98404 23024), emails, and location map.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#071A2B] text-white min-h-screen">
      {/* Header */}
      <section className="py-16 lg:py-20 bg-[#040e18] border-b border-[#163655]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-widest mb-3">
              Get In Touch
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Contact Marswin Precision Tools
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Have a cutting tool inquiry, regrinding requirement, or custom tooling challenge? Contact our technical team in Coimbatore directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Info Cards & Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00C2FF]/15 border border-[#00C2FF]/30 text-[#00C2FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white mb-2">Manufacturing Facility</h2>
                  <address className="not-italic text-sm text-gray-300 leading-relaxed">
                    <strong>Marswin Precision Tools</strong>
                    <br />
                    7/1, Sakthi Nagar,
                    <br />
                    Udayampalayam Road, Chinnavedampatti,
                    <br />
                    Coimbatore, Tamil Nadu - 641049, India
                  </address>
                </div>
              </div>
            </div>

            {/* Direct Phone Numbers */}
            <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1677FF]/15 border border-[#1677FF]/30 text-[#1677FF] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white mb-1">Direct Technical Contacts</h2>
                  <p className="text-xs text-gray-400">Available Monday through Saturday, 8:30 AM to 7:00 PM</p>
                </div>
              </div>
              <div className="space-y-3 pt-2 border-t border-[#163655]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium">Karthikeyan:</span>
                  <a
                    href="tel:+919655505586"
                    className="text-[#00C2FF] font-semibold hover:underline"
                  >
                    +91 96555 05586
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium">Vikram:</span>
                  <a
                    href="tel:+919840423024"
                    className="text-[#00C2FF] font-semibold hover:underline"
                  >
                    +91 98404 23024
                  </a>
                </div>
              </div>

              {/* WhatsApp Direct Button */}
              <div className="mt-5 pt-4 border-t border-[#163655]">
                <a
                  href="https://wa.me/919655505586?text=Hello%20Marswin%20Precision%20Tools,%20I%20have%20a%20cutting%20tool%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp with Technical Sales
                </a>
              </div>
            </div>

            {/* Email Addresses */}
            <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00C2FF]/15 border border-[#00C2FF]/30 text-[#00C2FF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white mb-1">Official Emails</h2>
                  <p className="text-xs text-gray-400">Send drawings & quotation inquiries</p>
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm pt-2 border-t border-[#163655]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Official:</span>
                  <a href="mailto:info@marswinprecisiontools.in" className="text-white hover:text-[#00C2FF]">
                    info@marswinprecisiontools.in
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sales:</span>
                  <a href="mailto:sales@marswinprecisiontools.in" className="text-white hover:text-[#00C2FF]">
                    sales@marswinprecisiontools.in
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">General:</span>
                  <a href="mailto:marswinprecisiontools@gmail.com" className="text-gray-300 hover:text-white">
                    marswinprecisiontools@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0B263D] border border-[#163655] shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Send Us an Inquiry</h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-8">
                Fill out the form below and our technical sales engineering team will respond within 24 business hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-[#163655] bg-[#0B263D] shadow-2xl">
          <div className="p-4 bg-[#071A2B] border-b border-[#163655] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
              <MapPin className="w-4 h-4 text-[#00C2FF]" />
              Marswin Precision Tools Location (Chinnavedampatti, Coimbatore)
            </div>
            <a
              href="https://maps.google.com/?q=Chinnavedampatti,+Coimbatore,+Tamil+Nadu+641049"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#00C2FF] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
          <div className="w-full h-80 bg-[#071A2B]">
            <iframe
              title="Marswin Precision Tools Location Map"
              src="https://maps.google.com/maps?q=Chinnavedampatti,%20Coimbatore,%20Tamil%20Nadu%20641049&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale contrast-125 opacity-85 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
