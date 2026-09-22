'use client';

import React, { useState } from 'react';
import { Mail, Trash2, CheckCircle2, AlertCircle, Eye, X, Phone, Building } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string | null;
  message: string;
  status: string;
  createdAt: Date | string;
}

export default function MessageManager({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || 'Status update failed');

      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
      if (selectedMessage?.id === id) setSelectedMessage(updated);
      showToast('success', `Message marked as ${status}.`);
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      showToast('success', 'Message deleted.');
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Contact Messages & Inquiries</h1>
          <p className="text-xs text-gray-400 mt-1">
            General inquiries submitted through the public contact form.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#163655] overflow-hidden bg-[#0B263D] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#071A2B] border-b border-[#163655] text-gray-400 uppercase font-semibold tracking-wider">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Message Snippet</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#163655]/60">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                    No contact messages found.
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr key={m.id} className="hover:bg-[#071A2B]/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{m.name}</div>
                      <div className="text-[11px] text-gray-400">{m.email} • {m.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-300">{m.companyName || '-'}</td>
                    <td className="py-3.5 px-4 text-gray-300 max-w-xs truncate">{m.message}</td>
                    <td className="py-3.5 px-4 text-gray-400">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'New'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : m.status === 'Replied'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedMessage(m)}
                          className="px-2.5 py-1 rounded bg-[#071A2B] text-[#00C2FF] hover:text-white border border-[#163655] flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Read
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="p-1 rounded hover:bg-[#071A2B] text-rose-400 hover:text-rose-300"
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

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#0B263D] border border-[#163655] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 bg-[#071A2B] border-b border-[#163655] flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Inquiry from {selectedMessage.name}</h2>
              <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#071A2B] border border-[#163655]">
                <div>
                  <span className="text-gray-400 block">Email:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-[#00C2FF] font-semibold">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">Phone:</span>
                  <a href={`tel:${selectedMessage.phone}`} className="text-[#00C2FF] font-semibold">
                    {selectedMessage.phone}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block">Company:</span>
                  <span className="text-white font-medium">{selectedMessage.companyName || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Received:</span>
                  <span className="text-gray-300">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block mb-1 font-semibold">Customer Message:</span>
                <div className="p-4 rounded-lg bg-[#071A2B] border border-[#163655] text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="pt-3 border-t border-[#163655] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Mark as:</span>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'Read')}
                    className="px-2 py-1 rounded bg-[#071A2B] text-blue-300 border border-[#163655]"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, 'Replied')}
                    className="px-2 py-1 rounded bg-[#071A2B] text-emerald-300 border border-[#163655]"
                  >
                    Replied
                  </button>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded-lg bg-[#1677FF] text-white font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
