import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/postService';
import type { Post } from '../types';
import { useAuth } from '../contexts/AuthContext';

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  useEffect(() => {
    if (id && user) {
      const fetchPost = async () => {
        try {
          const foundPost = await getPostById(id);
          if (foundPost) {
            if (foundPost.authorId === user.id) {
              setPost(foundPost);
            } else {
              setError("You don't have permission to view this post.");
            }
          } else {
            setError('Post not found.');
          }
        } catch (err) {
          setError('Failed to load post.');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id, user]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Link to="/posts" className="text-indigo-600 hover:underline mt-4 inline-block">
          Back to My Posts
        </Link>
      </div>
    );
  }

  if (!post) {
    return null; // Or a fallback component
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-lg">
      <article className="prose lg:prose-xl max-w-none">
        <div className="border-b pb-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            {post.title}
          </h1>
          <p className="text-base text-gray-500 mt-2">
            Published on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <div className="mt-12 pt-6 border-t">
        <Link to="/posts" className="text-indigo-600 hover:text-indigo-800 transition-colors">
          &larr; Back to all posts
        </Link>
      </div>
    </div>
  );
};

export default PostDetailPage;