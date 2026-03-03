'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Editor from '@/components/Editor';
import api from '@/lib/api';

export default function NewProductPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('gaming');
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const categories = [
    { value: 'gaming', label: 'Gaming' },
    { value: 'keyboard', label: 'Keyboards' },
    { value: 'mouse', label: 'Mouse' },
    { value: 'headset', label: 'Headsets' },
    { value: 'controller', label: 'Controllers' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Product name and description are required');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('excerpt', excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150));
      formData.append('price', price);
      formData.append('category', category);
      if (coverImage) {
        formData.append('cover_image', coverImage);
      }

      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      router.push('/dashboard/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/products" className="hover:text-white">Products</Link>
        <span>/</span>
        <span className="text-white">New</span>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Image */}
        <div className="game-card p-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Product Image
          </label>
          <div className="border-2 border-dashed border-[#2d2d44] rounded-lg p-6 text-center hover:border-purple-500/50 transition">
            {preview ? (
              <div className="relative inline-block">
                <img src={preview} alt="Preview" className="max-h-64 rounded-lg" />
                <button
                  type="button"
                  onClick={() => { setCoverImage(null); setPreview(null); }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <div className="text-5xl mb-4">🖼️</div>
                <p className="text-gray-400 mb-2">Click to upload product image</p>
                <p className="text-gray-500 text-sm">PNG, JPG up to 5MB</p>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="game-card p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f0f1a] border border-[#2d2d44] rounded-lg text-white focus:border-purple-500 transition"
                placeholder="e.g., RGB Mechanical Gaming Keyboard"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f0f1a] border border-[#2d2d44] rounded-lg text-white focus:border-purple-500 transition"
                placeholder="99.99"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f1a] border border-[#2d2d44] rounded-lg text-white focus:border-purple-500 transition"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
              Short Description
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f1a] border border-[#2d2d44] rounded-lg text-white focus:border-purple-500 transition"
              placeholder="Brief product highlights"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Description *
            </label>
            <Editor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3 disabled:opacity-50 font-semibold"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : 'Add Product'}
          </button>
          <Link
            href="/dashboard/products"
            className="px-6 py-3 border border-[#2d2d44] text-gray-300 rounded-lg hover:bg-[#2d2d44] transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
