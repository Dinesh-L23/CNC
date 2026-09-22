'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, X, Loader2, Wrench } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  status: string;
}

export default function ServiceManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image: '/images/services/cnc-grinding.jpg',
    icon: 'Wrench',
    status: 'active',
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      image: '/images/services/cnc-grinding.jpg',
      icon: 'Wrench',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setFormData({
      title: s.title,
      slug: s.slug,
      description: s.description,
      image: s.image,
      icon: s.icon,
      status: s.status,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingService) {
        const res = await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        if (!res.ok) throw new Error(updated.error || 'Failed to update service');

        setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        showToast('success', 'Service capability updated.');
      } else {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        if (!res.ok) throw new Error(created.error || 'Failed to create service');

        setServices((prev) => [...prev, created]);
        showToast('success', 'New service added.');
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setServices((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmId(null);
      showToast('success', 'Service deleted.');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Failed to delete service');
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#163655]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Manufacturing Services Management</h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage precision tooling services, grinding capabilities, and descriptions.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={service.id}
            className="rounded-2xl bg-[#0B263D] border border-[#163655] overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="aspect-[16/9] relative overflow-hidden bg-[#071A2B]">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#071A2B]/85 border border-[#163655] text-[11px] font-bold text-[#00C2FF]">
                  0{idx + 1}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">{service.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-[#163655] flex items-center justify-between">
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#071A2B] text-emerald-400 border border-[#163655]">
                  {service.status}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="p-1.5 rounded bg-[#071A2B] text-blue-400 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(service.id)}
                    className="p-1.5 rounded bg-[#071A2B] text-rose-400 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#0B263D] border border-rose-500/40 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Delete Service?</h3>
            <p className="text-xs text-gray-300">Are you sure you want to delete this service entry?</p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-[#071A2B] text-gray-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0B263D] border border-[#163655] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 bg-[#071A2B] border-b border-[#163655] flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {editingService ? 'Edit Service' : 'Add Manufacturing Service'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
                />
              </div>

              <div className="pt-4 border-t border-[#163655] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#071A2B] text-gray-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-[#1677FF] text-white text-xs font-bold hover:bg-[#0099FF]"
                >
                  {loading ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
