'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

const DashboardHeader = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  // Get page title based on pathname
  const getPageTitle = () => {
    const paths = {
      '/dashboard': 'Dashboard',
      '/dashboard/products': 'Products',
      '/dashboard/products/new': 'Add New Product',
      '/dashboard/categories': 'Categories',
      '/dashboard/settings': 'Settings',
    };
    
    // Check for edit product page
    if (pathname.includes('/dashboard/products/') && pathname.includes('/edit')) {
      return 'Edit Product';
    }
    
    return paths[pathname] || 'Dashboard';
  };

  return (
    <header className="bg-[#12121f] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">{getPageTitle()}</h1>
          <p className="text-sm text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 pl-10 bg-[#1a1a2e] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
