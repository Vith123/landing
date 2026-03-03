'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

  // Helper function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${API_URL}${cleanPath}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/posts');
        // Handle both array and { posts: [] } response format
        const products = Array.isArray(res.data) ? res.data : (res.data.posts || []);
        
        setStats({
          totalProducts: products.length,
          totalViews: products.reduce((acc, p) => acc + (p.views || 0), 0),
          totalLikes: products.reduce((acc, p) => acc + (p.likes_count || p.likesCount || 0), 0),
        });
        
        setRecentProducts(products.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="game-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="game-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Views</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalViews}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="game-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Likes</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalLikes}</p>
            </div>
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="game-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/products/new"
            className="flex flex-col items-center p-4 bg-[#1a1a2e] rounded-lg hover:bg-purple-500/20 transition group"
          >
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-500/30">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm text-gray-300">Add Product</span>
          </Link>

          <Link
            href="/dashboard/products"
            className="flex flex-col items-center p-4 bg-[#1a1a2e] rounded-lg hover:bg-cyan-500/20 transition group"
          >
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-2 group-hover:bg-cyan-500/30">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <span className="text-sm text-gray-300">View Products</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex flex-col items-center p-4 bg-[#1a1a2e] rounded-lg hover:bg-gray-500/20 transition group"
          >
            <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gray-500/30">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-300">Settings</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex flex-col items-center p-4 bg-[#1a1a2e] rounded-lg hover:bg-green-500/20 transition group"
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-500/30">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <span className="text-sm text-gray-300">View Site</span>
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className="game-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Products</h2>
          <Link href="/dashboard/products" className="text-purple-400 hover:text-purple-300 text-sm">
            View All →
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-gray-400">No products yet</p>
            <Link href="/dashboard/products/new" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <div
                key={product.id || product._id}
                className="flex items-center gap-4 p-3 bg-[#1a1a2e] rounded-lg hover:bg-[#1a1a2e]/70 transition"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                  {product.cover_image ? (
                    <img
                      src={getImageUrl(product.cover_image)}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">🎮</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{product.title}</h3>
                  <p className="text-sm text-gray-400">{product.category || 'Gaming'}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{product.price ? `$${product.price}` : '-'}</p>
                </div>
                <Link
                  href={`/dashboard/products/${product.id || product._id}/edit`}
                  className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
