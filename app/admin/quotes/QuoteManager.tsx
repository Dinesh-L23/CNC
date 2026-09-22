'use client';

import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  Clock,
  Phone,
  Mail,
  Building,
} from 'lucide-react';

interface Quote {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  deliveryDate: string;
  material: string;
  toolDiameter: string;
  application: string;
  drawingUrl: string | null;
  message: string;
  status: string;
  adminNotes: string | null;
  createdAt: Date | string;
}

export default function QuoteManager({ initialQuotes }: { initialQuotes: Quote[] }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const filtered = quotes.filter((q) => {
    const matchesSearch =
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.companyName.toLowerCase().includes(search.toLowerCase()) ||
      q.product.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase());

    if (filterStatus === 'All') return matchesSearch;
    return matchesSearch && q.status === filterStatus;
  });

  const openDetailsModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setAdminNotes(quote.adminNotes || '');
    setCurrentStatus(quote.status);
  };

  const handleUpdateStatusAndNotes = async () => {
    if (!selectedQuote) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/quotes/${selectedQuote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: currentStatus,
          adminNotes,
        }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || 'Update failed');

      setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
      setSelectedQuote(updated);
      showToast('success', `Quote status updated to "${currentStatus}".`);
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;

    try {
      const res = await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setQuotes((prev) => prev.filter((q) => q.id !== id));
      if (selectedQuote?.id === id) setSelectedQuote(null);
      showToast('success', 'Quote request removed.');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#163655]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">RFQ Quotation Requests</h1>
          <p className="text-xs text-gray-400 mt-1">
            Review incoming cutting tool requirements, drawings, and track quotation stages.
          </p>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, company, tool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0B263D] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'New', 'Contacted', 'Quoted', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-[#1677FF] text-white'
                  : 'bg-[#0B263D] text-gray-300 hover:text-white border border-[#163655]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* RFQ Data Table */}
      <div className="rounded-2xl border border-[#163655] overflow-hidden bg-[#0B263D] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#071A2B] border-b border-[#163655] text-gray-400 uppercase font-semibold tracking-wider">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#163655]/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 text-xs">
                    No quotation requests match your search or filter.
                  </td>
                </tr>
              ) : (
                filtered.map((quote) => (
                  <tr key={quote.id} className="hover:bg-[#071A2B]/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{quote.name}</div>
                      <div className="text-[11px] text-gray-400">{quote.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-300 font-medium">{quote.companyName}</td>
                    <td className="py-3.5 px-4 text-[#00C2FF] font-semibold">{quote.product}</td>
                    <td className="py-3.5 px-4 text-gray-300">{quote.quantity || '-'}</td>
                    <td className="py-3.5 px-4 text-gray-400">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          quote.status === 'New'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : quote.status === 'Contacted'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : quote.status === 'Quoted'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/40'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetailsModal(quote)}
                          className="px-2.5 py-1.5 rounded bg-[#071A2B] text-[#00C2FF] hover:text-white border border-[#163655] text-xs font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        <button
                          onClick={() => handleDelete(quote.id)}
                          className="p-1.5 rounded hover:bg-[#071A2B] text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Details & Internal Notes Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full my-8 bg-[#0B263D] border border-[#163655] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-[#071A2B] border-b border-[#163655] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#00C2FF] font-bold uppercase tracking-wider">
                  RFQ ID: {selectedQuote.id.slice(-8)}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  Quotation Request: {selectedQuote.companyName}
                </h2>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              {/* Customer summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#071A2B] border border-[#163655]">
                <div>
                  <span className="text-gray-400 block mb-0.5">Customer Name:</span>
                  <span className="text-white font-semibold">{selectedQuote.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Company:</span>
                  <span className="text-white font-semibold">{selectedQuote.companyName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Email:</span>
                  <a href={`mailto:${selectedQuote.email}`} className="text-[#00C2FF] hover:underline">
                    {selectedQuote.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Phone:</span>
                  <a href={`tel:${selectedQuote.phone}`} className="text-[#00C2FF] hover:underline">
                    {selectedQuote.phone}
                  </a>
                </div>
              </div>

              {/* Technical Requirements */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Product Type</span>
                    <span className="text-white font-semibold">{selectedQuote.product}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Quantity</span>
                    <span className="text-white font-semibold">{selectedQuote.quantity || 'Not specified'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Diameter / Size</span>
                    <span className="text-white font-semibold">{selectedQuote.toolDiameter || 'Standard'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Material</span>
                    <span className="text-white font-semibold">{selectedQuote.material || 'Solid Carbide'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Required Date</span>
                    <span className="text-white font-semibold">{selectedQuote.deliveryDate || 'Standard Delivery'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Submission Date</span>
                    <span className="text-white font-semibold">{new Date(selectedQuote.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {selectedQuote.application && (
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Application:</span>
                    <span className="text-gray-200">{selectedQuote.application}</span>
                  </div>
                )}

                {selectedQuote.message && (
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                    <span className="text-gray-400 block mb-0.5">Additional Notes:</span>
                    <span className="text-gray-200">{selectedQuote.message}</span>
                  </div>
                )}

                {/* Drawing Attachment Link */}
                {selectedQuote.drawingUrl ? (
                  <div className="p-3 rounded-lg bg-[#071A2B] border border-[#1677FF] flex items-center justify-between">
                    <span className="text-gray-300 font-medium">Customer Drawing Attached:</span>
                    <a
                      href={selectedQuote.drawingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded bg-[#1677FF] text-white font-semibold flex items-center gap-1.5 hover:bg-[#0099FF]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View / Download Drawing
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No drawing was uploaded with this request.</p>
                )}
              </div>

              {/* Status Update & Internal Notes */}
              <div className="pt-4 border-t border-[#163655] space-y-4">
                <h3 className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider">
                  Admin Quotation Workflow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Status Stage</label>
                    <select
                      value={currentStatus}
                      onChange={(e) => setCurrentStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted Customer</option>
                      <option value="Quoted">Quotation Sent</option>
                      <option value="Closed">Closed / PO Received</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Internal Estimation Notes</label>
                  <textarea
                    rows={3}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Enter pricing notes, carbide blank costs, grinding cycle estimate, or customer callback logs..."
                    className="w-full px-3 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF] resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#163655] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-2 rounded-lg bg-[#071A2B] text-gray-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdateStatusAndNotes}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-bold hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
