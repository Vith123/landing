'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import api from '@/lib/api';

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  // Verify user with backend to prevent token manipulation
  useEffect(() => {
    const verifyAdmin = async () => {
      if (loading) return;
      
      if (!user) {
        router.push('/admin/dashboard/v1/login');
        return;
      }

      try {
        // Verify token is valid and user is admin
        const res = await api.get('/auth/me');
        if (!res.data.isAdmin) {
          // Not an admin - log out and redirect
          logout();
          router.push('/');
          return;
        }
        setVerified(true);
      } catch (error) {
        // Token invalid or expired - log out
        logout();
        router.push('/admin/dashboard/v1/login');
      } finally {
        setVerifying(false);
      }
    };

    verifyAdmin();
  }, [user, loading, router, logout]);

  if (loading || verifying) {
    return (
      <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user || !verified) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

        {/* Dashboard Footer */}
        <footer className="border-t border-gray-800 px-6 py-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} BayV Admin. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
