'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wrench, Lock, Mail, AlertCircle, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Successful login
      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@marswinprecisiontools.in');
    setPassword('Admin@Marswin2026!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040e18] px-4 py-12 relative overflow-hidden">
      {/* Subtle tech background radial */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-md w-full bg-[#071A2B] border border-[#163655] rounded-2xl shadow-2xl p-8 sm:p-10 z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1677FF] to-[#00C2FF] flex items-center justify-center text-white shadow-lg mx-auto mb-4">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Marswin Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manufacturing & Tooling Management System
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@marswinprecisiontools.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0B263D] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0B263D] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors placeholder-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick-Fill helper */}
        <div className="mt-8 pt-6 border-t border-[#163655] text-center">
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-xs text-[#00C2FF] hover:underline flex items-center justify-center gap-1.5 mx-auto"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Fill Default Seed Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
