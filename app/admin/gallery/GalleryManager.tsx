'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Upload, CheckCircle2, AlertCircle, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export default function GalleryManager({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'CNC Machines',
  });

  const categories = [
    'CNC Machines',
    'Manufacturing',
    'Grinding',
    'Products',
    'Inspection',
    'Facility',
  ];

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload failed');

      setFormData((prev) => ({
        ...prev,
        imageUrl: result.url,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
      }));
      showToast('success', 'Image uploaded successfully.');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      showToast('error', 'Please upload or enter an image URL.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const created = await res.json();
      if (!res.ok) throw new Error(created.error || 'Failed to save item');

      setItems((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: 'CNC Machines',
      });
      showToast('success', 'New gallery item added.');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast('success', 'Gallery item deleted.');
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Facility & Tooling Gallery</h1>
          <p className="text-xs text-gray-400 mt-1">
            Upload workshop, CNC machinery, cutting tool photos, and inspection images.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Gallery Image
        </button>
      </div>

      {/* Grid of gallery items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#0B263D] border border-[#163655] overflow-hidden flex flex-col justify-between shadow-lg group"
          >
            <div>
              <div className="aspect-[4/3] relative overflow-hidden bg-[#071A2B]">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#071A2B]/85 border border-[#163655] text-[10px] font-bold text-[#00C2FF]">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="pt-3 border-t border-[#163655] flex justify-end">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded bg-[#071A2B] text-rose-400 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0B263D] border border-[#163655] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 bg-[#071A2B] border-b border-[#163655] flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Add Gallery Image</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Upload Photo *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/gallery/photo.jpg"
                    className="flex-1 px-3 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
                  />
                  <label className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#1677FF] text-white text-xs font-semibold cursor-pointer hover:bg-[#0099FF] shrink-0">
                    <Upload className="w-3.5 h-3.5" /> File
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="sr-only" disabled={uploading} />
                  </label>
                </div>
                {uploading && <p className="text-[11px] text-[#00C2FF] mt-1">Uploading...</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 5-Axis CNC Tool Grinding Setup"
                  className="w-full px-3 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief caption describing the machinery or tooling..."
                  className="w-full px-3 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs outline-none focus:border-[#1677FF] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#163655] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#071A2B] text-gray-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="px-6 py-2 rounded-lg bg-[#1677FF] text-white text-xs font-bold hover:bg-[#0099FF]"
                >
                  {loading ? 'Saving...' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
