import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Post not found</h2>
      <p className="text-gray-500 mb-6">The post you're looking for doesn't exist or has been deleted.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
