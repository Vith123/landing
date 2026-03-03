'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProductFilter({ categories, currentCategory, currentSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset to page 1 when filtering
    router.push(`/?${params.toString()}#products`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters('search', search);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-10 bg-[#1a1a2e] border border-[#2d2d44] rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          type="submit"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition font-medium"
        >
          Search
        </button>
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilters('category', 'all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !currentCategory || currentCategory === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-[#1a1a2e] border border-[#2d2d44] text-gray-300 hover:border-purple-500'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilters('category', cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                currentCategory === cat.slug
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#1a1a2e] border border-[#2d2d44] text-gray-300 hover:border-purple-500'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="ml-auto">
          <select
            value={currentSort || 'newest'}
            onChange={(e) => updateFilters('sort', e.target.value)}
            className="px-4 py-2 bg-[#1a1a2e] border border-[#2d2d44] rounded-xl text-gray-300 focus:border-purple-500 focus:outline-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(currentCategory && currentCategory !== 'all') || searchParams.get('search') ? (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Active filters:</span>
          {currentCategory && currentCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300">
              {categories.find(c => c.slug === currentCategory)?.name || currentCategory}
              <button 
                onClick={() => updateFilters('category', 'all')}
                className="hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          {searchParams.get('search') && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-600/20 border border-cyan-500/30 rounded-full text-cyan-300">
              "{searchParams.get('search')}"
              <button 
                onClick={() => {
                  setSearch('');
                  updateFilters('search', '');
                }}
                className="hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}
          <button
            onClick={() => router.push('/#products')}
            className="text-gray-400 hover:text-white underline"
          >
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}
