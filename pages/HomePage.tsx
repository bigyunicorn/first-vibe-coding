
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Welcome back, {user?.username}!
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Ready to share your thoughts? Create a new post or view your existing ones.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/new"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Write a new post
        </Link>
        <Link to="/posts" className="text-sm font-semibold leading-6 text-gray-900">
          View my posts <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
