'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Building2, MapPin, Phone, Mail } from 'lucide-react';

interface CompanyInfo {
  id: string;
  companyName: string;
  address: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  email3: string;
  description: string;
}

export default function CompanyManager({ initialCompany }: { initialCompany: CompanyInfo | null }) {
  const [formData, setFormData] = useState({
    companyName: initialCompany?.companyName || 'Marswin Precision Tools',
    address:
      initialCompany?.address ||
      '7/1, Sakthi Nagar, Udayampalayam Road, Chinnavedampatti, Coimbatore, Tamil Nadu - 641049',
    phone1: initialCompany?.phone1 || '+91 96555 05586',
    phone2: initialCompany?.phone2 || '+91 98404 23024',
    email1: initialCompany?.email1 || 'info@marswinprecisiontools.in',
    email2: initialCompany?.email2 || 'sales@marswinprecisiontools.in',
    email3: initialCompany?.email3 || 'marswinprecisiontools@gmail.com',
    description:
      initialCompany?.description ||
      'At Marswin Precision Tools, we focus on delivering reliable and precision-engineered cutting tools for modern manufacturing requirements. Our expertise in CNC tool manufacturing, grinding, regrinding, and advanced machining enables us to provide consistent solutions for demanding industrial applications.',
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update company details');

      showToast('success', 'Company information updated successfully! Changes will appear on the live site.');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border text-xs sm:text-sm font-semibold transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-950 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950 border-rose-500/50 text-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-6 border-b border-[#163655]">
        <h1 className="text-2xl font-bold text-white tracking-tight">Official Company Profile & Contacts</h1>
        <p className="text-xs text-gray-400 mt-1">
          Update the official Coimbatore address, direct engineer phones, emails, and company overview.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Company Profile */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] space-y-4">
          <h2 className="text-sm font-bold text-[#00C2FF] uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Company Name & Overview
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Company Description</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF] resize-none"
            />
          </div>
        </div>

        {/* Address */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] space-y-4">
          <h2 className="text-sm font-bold text-[#00C2FF] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Coimbatore Facility Address
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Full Postal Address</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
            />
          </div>
        </div>

        {/* Phone numbers */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] space-y-4">
          <h2 className="text-sm font-bold text-[#00C2FF] uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4" /> Technical Contact Numbers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Karthikeyan (Phone 1)
              </label>
              <input
                type="text"
                required
                value={formData.phone1}
                onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Vikram (Phone 2)
              </label>
              <input
                type="text"
                required
                value={formData.phone2}
                onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
              />
            </div>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] space-y-4">
          <h2 className="text-sm font-bold text-[#00C2FF] uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4" /> Official Email Addresses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Official Inquiry Email</label>
              <input
                type="email"
                required
                value={formData.email1}
                onChange={(e) => setFormData({ ...formData, email1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Sales & RFQ Email</label>
              <input
                type="email"
                required
                value={formData.email2}
                onChange={(e) => setFormData({ ...formData, email2: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Backup Gmail</label>
              <input
                type="email"
                required
                value={formData.email3}
                onChange={(e) => setFormData({ ...formData, email3: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving Updates...' : 'Save Company Details'}
        </button>
      </form>
    </div>
  );
}
