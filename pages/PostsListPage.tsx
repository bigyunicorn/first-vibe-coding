import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPostsByAuthor } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';
import type { Post } from '../types';

const PostsListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchPosts = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const userPosts = await getPostsByAuthor(user.id);
          setPosts(userPosts);
        } catch (err) {
          setError('Failed to fetch posts. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPosts();
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>
         <Link
          to="/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Post
        </Link>
      </div>
      
      {isLoading && <div className="text-center py-10">Loading posts...</div>}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {!isLoading && !error && (
        <>
          {posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Link to={`/posts/${post.id}`} className="block">
                    <h2 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600">{post.title}</h2>
                    <p className="text-sm text-gray-500 mt-2">
                      Published on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-medium text-gray-700">No posts yet.</h2>
              <p className="text-gray-500 mt-2">Why not write your first post?</p>
              <Link
                to="/new"
                className="mt-4 inline-block bg-indigo-500 text-white px-5 py-2.5 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Create Post
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostsListPage;