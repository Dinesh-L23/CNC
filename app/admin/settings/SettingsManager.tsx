'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Globe, Shield, Bell } from 'lucide-react';

export default function SettingsManager() {
  const [heroHeading, setHeroHeading] = useState('Precision Tools. Engineered for Performance.');
  const [heroSubheading, setHeroSubheading] = useState(
    'Advanced CNC precision tooling solutions manufactured with accuracy, consistency, and engineering excellence.'
  );
  const [siteUrl, setSiteUrl] = useState('https://marswinprecisiontools.in');
  const [emailNotification, setEmailNotification] = useState('sales@marswinprecisiontools.in');

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
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'homepage_hero',
          data: {
            heading: heroHeading,
            subheading: heroSubheading,
            siteUrl,
            emailNotification,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to save settings');

      showToast('success', 'Website configuration saved successfully.');
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
        <h1 className="text-2xl font-bold text-white tracking-tight">Website Settings & CMS</h1>
        <p className="text-xs text-gray-400 mt-1">
          Configure headline copy, notification destinations, and site parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Homepage Hero CMS */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] space-y-4">
          <h2 className="text-sm font-bold text-[#00C2FF] uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4" /> Homepage Hero Copy
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Hero Main Headline</label>
            <input
              type="text"
              required
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Hero Subheading</label>
            <textarea
              rows={3}
              required
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF] resize-none"
            />
          </div>
        </div>

        {/* Notifications & System Settings */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655] space-y-4">
          <h2 className="text-sm font-bold text-[#00C2FF] uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notification Routing
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              RFQ Dispatch Notification Recipient Email
            </label>
            <input
              type="email"
              required
              value={emailNotification}
              onChange={(e) => setEmailNotification(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Incoming RFQ requests and technical drawing notifications will be dispatched here.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Production Canonical URL</label>
            <input
              type="url"
              required
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-bold shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
