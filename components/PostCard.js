import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ post }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const postId = post.id || post._id;

  // Handle both Cloudinary URLs (https://) and local uploads (/uploads/)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    // Ensure path starts with /
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${API_URL}${cleanPath}`;
  };

  // Use actual price from post, or default to 0
  const price = parseFloat(post.price) || 0;
  const originalPrice = price > 0 ? (price * 1.3).toFixed(2) : 0;
  const isNew = new Date(post.created_at || post.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const discount = originalPrice > 0 ? Math.floor(((originalPrice - price) / originalPrice) * 100) : 0;

  const imageUrl = getImageUrl(post.cover_image);

  return (
    <article className="gaming-card group relative overflow-hidden border border-purple-500/20 hover:border-purple-500/50">
      {/* Animated Border Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 blur-xl"></div>
      </div>

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && <span className="badge-new pulse-glow">New</span>}
        {discount > 15 && <span className="badge-sale">{discount}% OFF</span>}
      </div>

      {/* Product Image */}
      <Link href={`/post/${postId}`}>
        <div className="relative w-full h-52 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] overflow-hidden">
          {imageUrl ? (
            <div className="relative w-full h-full product-float">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30 floating-slow">🎮</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60"></div>
          
          {/* Scanner Line Effect on Hover */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse top-1/2"></div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 relative z-10">
        {/* Category */}
        <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">Gaming Accessories</span>
        
        {/* Title */}
        <Link href={`/post/${postId}`}>
          <h3 className="text-white font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
            {post.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'} transition-transform group-hover:scale-110`} style={{ transitionDelay: `${i * 50}ms` }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-gray-500 text-xs ml-1">({post.likes_count || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition">
              {price > 0 ? `$${price.toFixed(2)}` : 'Contact for price'}
            </span>
            {discount > 15 && price > 0 && (
              <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4">
          <Link 
            href={`/post/${postId}`}
            className="btn-3d block w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white text-center py-2.5 rounded-lg font-medium text-sm hover:from-purple-500 hover:to-cyan-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
