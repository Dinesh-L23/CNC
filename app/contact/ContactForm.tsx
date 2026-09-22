'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        message: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success && (
        <div className="p-4 mb-6 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
          <div className="text-sm">
            <p className="font-semibold">Inquiry Submitted Successfully</p>
            <p className="text-xs text-emerald-200 mt-0.5">
              Thank you. Your message has been received. Our team will get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          <div className="text-sm">
            <p className="font-semibold">Submission Error</p>
            <p className="text-xs text-rose-200 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Senthil Kumar"
              className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Kovai Engineering Works"
              className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98404 00000"
              className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Requirement or Message *
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about the tool types, quantities, materials to be cut, or regrinding inquiries..."
            className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
