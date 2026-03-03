'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import api from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/posts');
      setProducts(res.data.posts || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setDeleting(id);
    try {
      await api.delete(`/posts/${id}`);
      setProducts(products.filter(p => p.id !== id && p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-400">{products.length} products in your store</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="game-card p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-white mb-2">No products yet</h3>
          <p className="text-gray-400 mb-6">Start adding products to your store</p>
          <Link href="/dashboard/products/new" className="btn-primary">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="game-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1a1a2e] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {products.map((product) => (
                <tr key={product.id || product._id} className="hover:bg-[#1a1a2e]/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        {product.cover_image ? (
                          <img
                            src={`${API_URL}${product.cover_image}`}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🎮</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{product.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-1">{product.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">
                      {product.category || 'Gaming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {product.price ? `$${product.price}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {formatDistanceToNow(new Date(product.created_at || product.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/post/${product.id || product._id}`}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/dashboard/products/${product.id || product._id}/edit`}
                        className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id || product._id)}
                        disabled={deleting === (product.id || product._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === (product.id || product._id) ? (
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
