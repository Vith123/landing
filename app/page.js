import PostCard from '@/components/PostCard';
import Features3D from '@/components/Features3D';
import Hero3D from '@/components/Hero3D';
import ProductSection from '@/components/ProductSection';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getPosts(page = 1, category = '', search = '', sort = 'newest') {
  try {
    let url = `/posts?page=${page}&limit=12`;
    if (category && category !== 'all') url += `&category=${category}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (sort) url += `&sort=${sort}`;
    return await fetchAPI(url);
  } catch (error) {
    return { posts: [], pagination: { page: 1, pages: 1, total: 0 } };
  }
}

async function getCategories() {
  try {
    const data = await fetchAPI('/categories');
    return data.categories || [];
  } catch (error) {
    return [];
  }
}

// Default categories if none exist in database
const defaultCategories = [
  { 
    name: 'Keyboards', 
    slug: 'keyboards',
    count: 0, 
    gradient: 'from-purple-600 to-indigo-600',
    icon: 'M6 2H18C19.1046 2 20 2.89543 20 4V8C20 9.10457 19.1046 10 18 10H6C4.89543 10 4 9.10457 4 8V4C4 2.89543 4.89543 2 6 2ZM6 4V8H18V4H6ZM2 14H6V18H2V14ZM8 14H12V18H8V14ZM14 14H22V18H14V14Z'
  },
  { 
    name: 'Gaming Mice', 
    slug: 'mice',
    count: 0, 
    gradient: 'from-cyan-500 to-blue-600',
    icon: 'M12 14L12 8M8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V6ZM12 18V22M8 22H16'
  },
  { 
    name: 'Headsets', 
    slug: 'headsets',
    count: 0, 
    gradient: 'from-pink-500 to-rose-600',
    icon: 'M9 19V21M15 19V21M5 17V11C5 7.13401 8.13401 4 12 4C15.866 4 19 7.13401 19 11V17M5 14V17H7V14H5ZM17 14V17H19V14H17Z'
  },
  { 
    name: 'Controllers', 
    slug: 'controllers',
    count: 0, 
    gradient: 'from-orange-500 to-red-600',
    icon: 'M6 9L6 11M9 8L9 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 9.5H17M16 8.5V10.5M15 13H17M9 13H11'
  },
  { 
    name: 'Accessories', 
    slug: 'accessories',
    count: 0, 
    gradient: 'from-green-500 to-teal-600',
    icon: 'M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12'
  },
];

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const category = searchParams?.category || '';
  const search = searchParams?.search || '';
  const sort = searchParams?.sort || 'newest';

  const [postsData, categoriesData] = await Promise.all([
    getPosts(page, category, search, sort),
    getCategories()
  ]);

  const { posts, pagination } = postsData;
  const categories = categoriesData.length > 0 ? categoriesData : defaultCategories;

  // Build pagination URL with current filters
  const buildPageUrl = (pageNum) => {
    const params = new URLSearchParams();
    params.set('page', pageNum);
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (sort && sort !== 'newest') params.set('sort', sort);
    return `/?${params.toString()}#products`;
  };

  return (
    <div className="bg-[#0f0f1a]">
      {/* Hero Section - 3D */}
      <Hero3D />

      {/* Features - 3D Scroll Effect */}
      <Features3D />

      {/* Categories */}
      <section id="categories" className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Shop by Category</h2>
          <p className="text-gray-400">Find exactly what you need</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug || i}
              href={`/?category=${cat.slug}#products`}
              className="group relative overflow-hidden rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`}></div>
              
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-base md:text-lg mb-1">{cat.name}</h3>
                <p className="text-white/70 text-sm flex items-center">
                  {cat.count} Products
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products with Filters */}
      <ProductSection 
        categories={categories}
        currentCategory={category}
        currentSort={sort}
      >
        {posts.length === 0 ? (
          <div className="text-center py-20 game-card">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {search ? 'No Results Found' : 'No Products Yet'}
            </h2>
            <p className="text-gray-400 mb-6">
              {search 
                ? `No products match "${search}". Try a different search term.`
                : 'Be the first to add gaming gear to showcase!'}
            </p>
            {!search && (
              <Link href="/create" className="btn-primary inline-block">
                Add First Product
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map(post => (
                <PostCard key={post.id || post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                <Link
                  href={buildPageUrl(Math.max(1, page - 1))}
                  className={`px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2d2d44] text-gray-300 hover:border-purple-500 transition ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  Previous
                </Link>
                {[...Array(Math.min(pagination.pages, 5))].map((_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (pagination.pages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= pagination.pages - 2) {
                    pageNum = pagination.pages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <Link
                      key={i}
                      href={buildPageUrl(pageNum)}
                      className={`px-4 py-2 rounded-lg transition ${
                        page === pageNum
                          ? 'bg-purple-600 text-white'
                          : 'bg-[#1a1a2e] border border-[#2d2d44] text-gray-300 hover:border-purple-500'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
                <Link
                  href={buildPageUrl(Math.min(pagination.pages, page + 1))}
                  className={`px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#2d2d44] text-gray-300 hover:border-purple-500 transition ${page === pagination.pages ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  Next
                </Link>
              </div>
            )}

            {/* Results info */}
            <div className="text-center mt-6 text-gray-400 text-sm">
              Showing {(page - 1) * 12 + 1} - {Math.min(page * 12, pagination.total)} of {pagination.total} products
            </div>
          </>
        )}
      </ProductSection>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-y border-[#2d2d44]">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Gaming Community</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Subscribe to get exclusive deals, early access to new products, and pro gaming tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-[#1a1a2e] border border-[#2d2d44] rounded-lg text-white placeholder-gray-500 focus:border-purple-500"
            />
            <button type="submit" className="btn-accent whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
