import { fetchAPI } from '@/lib/api';
import { notFound } from 'next/navigation';
import PostContent from './PostContent';

export const revalidate = 60;

async function getPost(id) {
  try {
    return await fetchAPI(`/posts/${id}`);
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return {
    title: post.title,
    description: post.excerpt || post.content?.substring(0, 160).replace(/<[^>]*>/g, ''),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at || post.createdAt,
      authors: [post.author_name],
      images: post.cover_image ? [`${API_URL}${post.cover_image}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [`${API_URL}${post.cover_image}`] : [],
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}
