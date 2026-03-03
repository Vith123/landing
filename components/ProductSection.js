'use client';
import { Suspense } from 'react';
import ProductFilter from './ProductFilter';

export default function ProductSection({ children, categories, currentCategory, currentSort }) {
  return (
    <section id="products" className="container mx-auto px-4 py-8 pb-16 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Products</h2>
          <p className="text-gray-400 text-sm mt-1">
            {currentCategory && currentCategory !== 'all' 
              ? `Showing ${categories.find(c => c.slug === currentCategory)?.name || currentCategory}`
              : 'Browse our collection'}
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="text-gray-400">Loading filters...</div>}>
        <ProductFilter 
          categories={categories} 
          currentCategory={currentCategory}
          currentSort={currentSort}
        />
      </Suspense>

      {children}
    </section>
  );
}
