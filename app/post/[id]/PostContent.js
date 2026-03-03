'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

export default function PostContent({ post: initialPost }) {
  const [post] = useState(initialPost);
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const postId = post.id || post._id;

  // Handle both Cloudinary URLs (https://) and local uploads (/uploads/)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  const imageUrl = getImageUrl(post.cover_image);

  // Mock price for demo
  const price = (29.99 + (postId?.toString().charCodeAt(0) * 7.5) % 170).toFixed(2);
  const originalPrice = (parseFloat(price) * 1.3).toFixed(2);
  const discount = Math.floor(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-6">
          <Link href="/" className="text-gray-400 hover:text-purple-400 transition">Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">Gaming Accessories</span>
          <span className="text-gray-600">/</span>
          <span className="text-purple-400">{post.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="game-card p-4">
            <div className="relative w-full aspect-square bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] rounded-lg overflow-hidden group">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-contain p-4 transition-all duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 1200px) 100vw, 600px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-30">🎮</span>
                </div>
              )}
              {discount > 15 && (
                <span className="absolute top-4 left-4 badge-sale">{discount}% OFF</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-purple-400 text-sm font-medium uppercase tracking-wide">Gaming Accessories</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                {post.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'} hover:scale-125 transition-transform`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400">4.0</span>
              </div>
            </div>

            {/* Price */}
            <div className="game-card p-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-cyan-400">${price}</span>
                {discount > 15 && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${originalPrice}</span>
                    <span className="text-green-400 font-medium">Save ${(originalPrice - price).toFixed(2)}</span>
                  </>
                )}
              </div>
              <p className="text-green-400 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Stock - Ready to Ship
              </p>
            </div>

            {/* Product Info */}
            <div className="game-card p-4">
              <p className="text-sm text-gray-500">
                Listed {formatDistanceToNow(new Date(post.created_at || post.createdAt), { addSuffix: true })}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="game-card p-3 flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="game-card p-3 flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Warranty Included</span>
              </div>
              <div className="game-card p-3 flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Easy Returns</span>
              </div>
              <div className="game-card p-3 flex items-center space-x-2 text-gray-400">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="game-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Product Description</h2>
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
