'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: 'All Products', href: '/' },
    { name: 'Keyboards', href: '/?category=keyboards' },
    { name: 'Mice', href: '/?category=mice' },
    { name: 'Headsets', href: '/?category=headsets' },
    { name: 'Controllers', href: '/?category=controllers' },
  ];

  return (
    <nav className="bg-[#0a0a14]/95 backdrop-blur-md border-b border-[#2d2d44] sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-center py-1 text-sm font-medium">
        🎮 FREE SHIPPING on orders over $50 | Use code: BAYV20 for 20% OFF
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">BayV</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search gaming gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg text-white placeholder-gray-500 focus:border-purple-500 transition"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/create" className="text-gray-300 hover:text-purple-400 transition font-medium flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Product</span>
                </Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-purple-400 transition font-medium">
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#1a1a2e] transition">
                    {user.avatar ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${user.avatar}`} alt={user.username} className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-semibold">
                        {user.username?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg shadow-xl py-2 hidden group-hover:block z-50">
                    <Link href={`/profile/${user.id}`} className="block px-4 py-2 text-gray-300 hover:bg-[#2d2d44] hover:text-purple-400 transition">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile</span>
                      </div>
                    </Link>
                    <hr className="my-2 border-[#2d2d44]" />
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-[#2d2d44] hover:text-red-400 transition">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Categories - Desktop */}
        <div className="hidden md:flex items-center space-x-6 py-3 border-t border-[#2d2d44]">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="text-sm text-gray-400 hover:text-purple-400 transition font-medium"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2d2d44] bg-[#0a0a14]">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search gaming gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg text-white placeholder-gray-500"
              />
            </form>
            
            {/* Categories */}
            <div className="mb-4 pb-4 border-b border-[#2d2d44]">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="block py-2 text-gray-300 hover:text-purple-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {user ? (
              <>
                <Link href="/create" className="block py-2 text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Add Product
                </Link>
                <Link href="/dashboard" className="block py-2 text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href={`/profile/${user.id}`} className="block py-2 text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block py-2 text-red-400">
                  Logout
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
