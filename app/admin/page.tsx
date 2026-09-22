import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  Package,
  Wrench,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Plus,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalProducts,
    totalServices,
    totalQuotes,
    newQuotes,
    totalMessages,
    totalGallery,
    recentQuotes,
    recentMessages,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.service.count(),
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: 'New' } }),
    prisma.contactMessage.count(),
    prisma.gallery.count(),
    prisma.quoteRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      sub: 'Catalog items',
      icon: Package,
      href: '/admin/products',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      label: 'New RFQ Quotes',
      value: newQuotes,
      sub: `${totalQuotes} total quotes`,
      icon: FileText,
      href: '/admin/quotes',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      label: 'Inquiries / Messages',
      value: totalMessages,
      sub: 'Contact submissions',
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Active Services',
      value: totalServices,
      sub: 'Manufacturing capabilities',
      icon: Wrench,
      href: '/admin/services',
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Gallery Images',
      value: totalGallery,
      sub: 'Facility & products',
      icon: ImageIcon,
      href: '/admin/gallery',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#163655]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Manufacturing Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time activity and content management for Marswin Precision Tools.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1677FF] text-white text-xs font-semibold hover:bg-[#0099FF] transition-colors shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
          <Link
            href="/admin/quotes"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0B263D] border border-[#163655] text-gray-200 text-xs font-semibold hover:text-white transition-colors"
          >
            Review Quotes ({newQuotes})
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const IconComp = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-5 rounded-xl bg-[#0B263D] border border-[#163655] hover:border-[#00C2FF] transition-all hover:shadow-xl hover:shadow-blue-500/5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-[#071A2B] border border-[#163655] flex items-center justify-center text-[#00C2FF]">
                  <IconComp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white group-hover:text-[#00C2FF] transition-colors">
                {stat.value}
              </div>
              <div className="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
                <span>{stat.sub}</span>
                <ArrowRight className="w-3 h-3 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Visual Analytics Summary: Quote Activity & Product Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quote Activity Chart Card */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0B263D] border border-[#163655]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Quotation Requests Activity</h2>
              <p className="text-xs text-gray-400">Monthly RFQ incoming volume</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#071A2B] text-emerald-400 border border-[#163655] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +28% this quarter
            </span>
          </div>

          {/* Clean CSS Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-[#163655]/60 pb-2">
            {[
              { month: 'Apr', count: 18, height: '40%' },
              { month: 'May', count: 24, height: '55%' },
              { month: 'Jun', count: 32, height: '70%' },
              { month: 'Jul', count: 28, height: '62%' },
              { month: 'Aug', count: 39, height: '85%' },
              { month: 'Sep', count: 45, height: '100%' },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-semibold text-[#00C2FF]">{bar.count}</span>
                <div
                  style={{ height: bar.height }}
                  className="w-full max-w-[42px] rounded-t-md bg-gradient-to-t from-[#1677FF] to-[#00C2FF] transition-all hover:brightness-125"
                />
                <span className="text-[11px] text-gray-400 mt-1">{bar.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>Aggregated across Coimbatore regional manufacturing clusters</span>
            <span className="text-[#00C2FF]">Target: 50+ RFQs/mo</span>
          </div>
        </div>

        {/* Product Demand Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0B263D] border border-[#163655]">
          <h2 className="text-base font-bold text-white mb-1">Product Demand Share</h2>
          <p className="text-xs text-gray-400 mb-6">RFQ inquiries by tool category</p>

          <div className="space-y-4">
            {[
              { name: 'End Mills (Square & Ball)', pct: '42%', color: 'bg-[#1677FF]' },
              { name: 'Drills & Step Drills', pct: '28%', color: 'bg-[#00C2FF]' },
              { name: 'Port Cutters (SAE/ISO)', pct: '18%', color: 'bg-emerald-400' },
              { name: 'Reamers & Custom Form', pct: '12%', color: 'bg-purple-400' },
            ].map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-medium">{item.name}</span>
                  <span className="text-white font-bold">{item.pct}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#071A2B] overflow-hidden">
                  <div
                    style={{ width: item.pct }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#163655] text-center">
            <Link
              href="/admin/quotes"
              className="text-xs font-semibold text-[#00C2FF] hover:underline"
            >
              View Detailed RFQ Log →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent RFQs & Inquiries Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quote Requests */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Recent RFQ Quotes</h2>
            <Link href="/admin/quotes" className="text-xs text-[#00C2FF] hover:underline">
              View All ({totalQuotes})
            </Link>
          </div>

          {recentQuotes.length === 0 ? (
            <p className="text-xs text-gray-400 py-4">No quote requests yet.</p>
          ) : (
            <div className="divide-y divide-[#163655]/60">
              {recentQuotes.map((q) => (
                <div key={q.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-white">{q.name}</h3>
                    <p className="text-[11px] text-gray-400">
                      {q.companyName} • <span className="text-[#00C2FF]">{q.product}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        q.status === 'New'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : q.status === 'Quoted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}
                    >
                      {q.status}
                    </span>
                    <span className="block text-[10px] text-gray-500 mt-0.5">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contact Inquiries */}
        <div className="p-6 rounded-2xl bg-[#0B263D] border border-[#163655]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs text-[#00C2FF] hover:underline">
              View All ({totalMessages})
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-xs text-gray-400 py-4">No contact messages yet.</p>
          ) : (
            <div className="divide-y divide-[#163655]/60">
              {recentMessages.map((m) => (
                <div key={m.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-white">{m.name}</h3>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{m.message}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#071A2B] text-gray-300 border border-[#163655]">
                      {m.status}
                    </span>
                    <span className="block text-[10px] text-gray-500 mt-0.5">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
