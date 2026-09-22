'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Package,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  applications: string;
  specifications: string;
  material: string;
  coating: string;
  status: string;
}

export default function ProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    image: '/images/products/end-mill.jpg',
    material: 'Micro-grain Solid Carbide (WC + Co)',
    coating: 'AlTiN',
    status: 'published',
    applications: '',
    specifications: '',
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      image: '/images/products/end-mill.jpg',
      material: 'Micro-grain Solid Carbide (WC + Co)',
      coating: 'AlTiN',
      status: 'published',
      applications: 'CNC milling\nDie and mould manufacturing\nAutomotive components',
      specifications: JSON.stringify(
        {
          'Diameter Range': '1.0 mm - 25.0 mm',
          'Overall Length (OAL)': '50 mm - 150 mm',
          'Number of Flutes': '2, 3, 4 Flutes',
          'Tolerance': 'h6',
        },
        null,
        2
      ),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);

    let appsFormatted = prod.applications;
    try {
      const parsed = JSON.parse(prod.applications);
      if (Array.isArray(parsed)) appsFormatted = parsed.join('\n');
    } catch {}

    let specsFormatted = prod.specifications;
    try {
      const parsed = JSON.parse(prod.specifications);
      specsFormatted = JSON.stringify(parsed, null, 2);
    } catch {}

    setFormData({
      name: prod.name,
      slug: prod.slug,
      shortDescription: prod.shortDescription,
      description: prod.description,
      image: prod.image,
      material: prod.material,
      coating: prod.coating,
      status: prod.status,
      applications: appsFormatted,
      specifications: specsFormatted,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setFormData((prev) => ({ ...prev, image: result.url }));
      showToast('success', 'Image uploaded successfully');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appArray = formData.applications.split('\n').map((s) => s.trim()).filter(Boolean);
      let specsJson: Record<string, string> = {};
      try {
        specsJson = JSON.parse(formData.specifications);
      } catch {
        specsJson = { Details: formData.specifications };
      }

      const payload = {
        ...formData,
        applications: JSON.stringify(appArray),
        specifications: JSON.stringify(specsJson),
      };

      if (editingProduct) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        if (!res.ok) throw new Error(updated.error || 'Failed to update product');

        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        showToast('success', `Product "${updated.name}" updated successfully.`);
      } else {
        // Create
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        if (!res.ok) throw new Error(created.error || 'Failed to create product');

        setProducts((prev) => [created, ...prev]);
        showToast('success', `Product "${created.name}" created successfully.`);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (prod: Product) => {
    const nextStatus = prod.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/products/${prod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || 'Status update failed');

      setProducts((prev) => prev.map((p) => (p.id === prod.id ? { ...p, status: nextStatus } : p)));
      showToast('success', `Product status set to ${nextStatus}.`);
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      showToast('success', 'Product deleted successfully.');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border text-xs sm:text-sm font-semibold transition-all animate-in slide-in-from-bottom-5 ${
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Product Catalog Management</h1>
          <p className="text-xs text-gray-400 mt-1">
            Add, update specifications, upload tool photos, and publish cutting tools.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-[#163655] overflow-hidden bg-[#0B263D] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#071A2B] border-b border-[#163655] text-gray-400 uppercase font-semibold tracking-wider">
                <th className="py-3.5 px-4">Tool</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Material</th>
                <th className="py-3.5 px-4">Coating</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#163655]/60">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                    No products found. Click "Add New Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#071A2B]/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-[#071A2B] shrink-0 border border-[#163655]">
                          <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{prod.name}</div>
                          <div className="text-[11px] text-gray-400 line-clamp-1">{prod.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-300 text-[11px]">/products/{prod.slug}</td>
                    <td className="py-3.5 px-4 text-gray-300">{prod.material}</td>
                    <td className="py-3.5 px-4 text-[#00C2FF] font-semibold">{prod.coating}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          prod.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/40'
                        }`}
                      >
                        {prod.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => togglePublishStatus(prod)}
                          title={prod.status === 'published' ? 'Unpublish' : 'Publish'}
                          className="p-1.5 rounded-md hover:bg-[#071A2B] text-gray-400 hover:text-white transition-colors"
                        >
                          {prod.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-400" />}
                        </button>
                        <button
                          onClick={() => openEditModal(prod)}
                          title="Edit Product"
                          className="p-1.5 rounded-md hover:bg-[#071A2B] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          title="Delete Product"
                          className="p-1.5 rounded-md hover:bg-[#071A2B] text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#0B263D] border border-rose-500/40 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Delete Product?</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Are you sure you want to permanently delete this product? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-[#071A2B] text-gray-300 text-xs hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full my-8 bg-[#0B263D] border border-[#163655] rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-[#071A2B] border-b border-[#163655] flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Precision Tool'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        name,
                        slug: prev.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      }));
                    }}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs font-mono focus:border-[#1677FF] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none resize-none"
                />
              </div>

              {/* Image Upload Field */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Product Photo URL or Upload</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1677FF] text-white text-xs font-bold cursor-pointer hover:bg-[#0099FF] transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    Upload File
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" disabled={uploading} />
                  </label>
                </div>
                {uploading && <p className="text-[11px] text-[#00C2FF] mt-1">Uploading image...</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Material</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Coating</label>
                  <input
                    type="text"
                    value={formData.coating}
                    onChange={(e) => setFormData({ ...formData, coating: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Applications (One application per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.applications}
                  onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none font-mono resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Specifications Table (JSON key-value format)
                </label>
                <textarea
                  rows={4}
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-xs focus:border-[#1677FF] outline-none font-mono resize-none"
                />
              </div>

              <div className="pt-4 border-t border-[#163655] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#071A2B] text-gray-300 text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white text-xs font-bold hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
