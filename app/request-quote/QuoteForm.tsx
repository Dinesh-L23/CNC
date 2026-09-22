'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  X,
} from 'lucide-react';

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams?.get('product') || '';
  const preselectedService = searchParams?.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    product: preselectedProduct || preselectedService || 'End Mills',
    quantity: '',
    deliveryDate: '',
    material: 'Micrograin Solid Carbide',
    toolDiameter: '',
    application: '',
    drawingUrl: '',
    message: '',
  });

  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({ ...prev, product: preselectedProduct }));
    } else if (preselectedService) {
      setFormData((prev) => ({ ...prev, product: preselectedService }));
    }
  }, [preselectedProduct, preselectedService]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload technical drawing.');
      }

      setFormData((prev) => ({ ...prev, drawingUrl: data.url }));
      setUploadedFileName(file.name);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Upload failed. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit quote request.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        companyName: '',
        email: '',
        phone: '',
        product: 'End Mills',
        quantity: '',
        deliveryDate: '',
        material: 'Micrograin Solid Carbide',
        toolDiameter: '',
        application: '',
        drawingUrl: '',
        message: '',
      });
      setUploadedFileName(null);
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
        <div className="p-5 mb-8 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-emerald-400" />
          <div>
            <p className="font-bold text-base">Quotation Request Received</p>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1">
              Thank you. Our team will review your requirement and contact you shortly.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold">Unable to submit quotation request</p>
            <p className="text-rose-200 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Contact & Company Info */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider">
            1. Customer & Company Information
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Contact Person Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Senthil Murugan"
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Apex Precision Auto Ltd"
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
                placeholder="procurement@company.com"
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Phone / Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 94432 00000"
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Tooling Requirement */}
        <div className="space-y-4 pt-4 border-t border-[#163655]">
          <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider">
            2. Tooling Specifications & Technical Details
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Product / Tool Type *
              </label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              >
                <option value="End Mills">End Mills (Square, Ball, Radius)</option>
                <option value="Drills">Drills (Solid Carbide / Step Drills)</option>
                <option value="Port Cutters">Port Cutters (SAE / ISO / BSPP)</option>
                <option value="Reamers">Reamers (Straight & Spiral Flute)</option>
                <option value="Custom Tooling">Custom Profile Form Tooling</option>
                <option value="Tool Regrinding">Tool Regrinding / Recoating Service</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Quantity Required
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 25 pcs / 50 pcs / Batch"
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Tool Diameter / Size
              </label>
              <input
                type="text"
                value={formData.toolDiameter}
                onChange={(e) => setFormData({ ...formData, toolDiameter: e.target.value })}
                placeholder="e.g. Ø12.0 mm / Step Ø10-Ø16"
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Tool Material
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                placeholder="e.g. Solid Carbide / HSS"
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Required Delivery Date
              </label>
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Machining Application & Workpiece Material
            </label>
            <input
              type="text"
              value={formData.application}
              onChange={(e) => setFormData({ ...formData, application: e.target.value })}
              placeholder="e.g. Die steel H13 (50 HRC) milling, Automotive cylinder block, SS304"
              className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors"
            />
          </div>

          {/* Drawing / File Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Upload Technical Drawing / Specification (PDF, JPG, PNG)
            </label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-[#163655] border-dashed rounded-xl bg-[#071A2B] hover:border-[#1677FF] transition-colors">
              <div className="space-y-1 text-center">
                {uploadedFileName ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-400">
                    <FileText className="w-5 h-5" />
                    <span>{uploadedFileName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedFileName(null);
                        setFormData((prev) => ({ ...prev, drawingUrl: '' }));
                      }}
                      className="p-1 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-[#00C2FF]" />
                    <div className="flex text-xs text-gray-400 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-[#1677FF] hover:text-[#00C2FF] focus-within:outline-none"
                      >
                        <span>Upload a drawing file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          onChange={handleFileUpload}
                          className="sr-only"
                          disabled={uploading}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-[11px] text-gray-500">PDF, PNG, JPG up to 15MB</p>
                  </>
                )}
                {uploading && (
                  <div className="flex items-center justify-center gap-2 text-xs text-[#00C2FF] pt-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading drawing...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Requirements / Message */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Additional Requirements / Special Notes
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Specify coatings, tolerance requirements, shank standards, or delivery schedules..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#071A2B] border border-[#163655] text-white text-sm focus:outline-none focus:border-[#1677FF] transition-colors resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-[#1677FF] to-[#0099FF] text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting RFQ...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Request for Quotation
            </>
          )}
        </button>
      </form>
    </div>
  );
}
