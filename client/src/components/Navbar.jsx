import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useAuth }  from './AuthContext.jsx'; // Import useAuth hook

const Navbar = () => {
  const { authState, logout } = useAuth(); // Get authState and logout function from context

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext to remove token and update state
    window.location.href = '/'; // Optionally, redirect to home after logout
  };

  return (
    <div className="navbar sticky top-10 z-50 bg-white/30 backdrop-blur-md rounded-full shadow-lg md:w-[70vw] mx-auto px-10 py-4 flex items-center justify-between w-[90vw]">
      <div className="flex-1">
        <Link to="/" className="md:text-2xl font-bold text-gray-900 cursor-pointer">KARAMAT TRUST</Link>
      </div>
      <button className="relative z-10 px-4 py-2 md:px-10 md:py-4 md:text-xl md:font-bold text-gray-900 bg-gray-200 rounded-full shadow-lg transition-all duration-250 overflow-hidden hover:text-gray-900 group">
        <span className="absolute top-0 left-0 w-0 h-full bg-green-400 rounded-full transition-all duration-250 group-hover:w-full z-[-1]"></span>
        {authState.isAuthenticated ? (
          <span onClick={handleLogout} className="cursor-pointer">Logout</span> // Show logout button if authenticated
        ) : (
          <Link to="/login">Login</Link> // Show login button if not authenticated
        )}
      </button>
    </div>
  );
};

export default Navbar;
