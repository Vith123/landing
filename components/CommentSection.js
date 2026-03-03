'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import api from '@/lib/api';
import Link from 'next/link';

const CommentSection = ({ postId, initialComments }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await api.post(`/posts/${postId}/comments`, { content: newComment });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-4 bg-[#0f0f1a] border border-[#2d2d44] rounded-lg focus:border-purple-500 text-white placeholder-gray-500 resize-none transition"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="mt-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Submit Review'}
          </button>
        </form>
      ) : (
        <div className="mb-8 bg-[#0f0f1a] border border-[#2d2d44] p-4 rounded-lg">
          <p className="text-gray-400">
            Please <Link href="/login" className="text-purple-400 hover:text-purple-300">login</Link> to leave a review.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex space-x-4">
              {comment.avatar ? (
                <img src={`${API_URL}${comment.avatar}`} alt={comment.username} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex-shrink-0 flex items-center justify-center text-white font-semibold">
                  {comment.username?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="flex-1">
                <div className="bg-[#0f0f1a] border border-[#2d2d44] rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-white">{comment.username}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {formatDistanceToNow(new Date(comment.created_at || comment.createdAt), { addSuffix: true })}
                      </span>
                      {/* Rating Stars */}
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    {user?.id === comment.user_id && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-400 hover:text-red-300 text-sm transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-gray-300">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
