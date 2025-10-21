
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeLinkClass = "text-indigo-500 font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-indigo-500 transition-colors";
  
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeLinkClass : inactiveLinkClass;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600">
            MyBlog
          </NavLink>
          <nav className="flex items-center space-x-6">
            {user ? (
              <>
                <NavLink to="/posts" className={getNavLinkClass}>My Posts</NavLink>
                <NavLink to="/new" className={getNavLinkClass}>Write a Post</NavLink>
                <span className="text-gray-500">Hi, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
