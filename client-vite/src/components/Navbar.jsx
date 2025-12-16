import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left - Website Name */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            CinemaSphere
          </Link>
          
          {/* Middle - Navigation Links */}
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-800">
              Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
          </div>
          
          {/* Right - Search and Auth */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Link to="/profile" className="text-gray-600 hover:text-gray-800">
                Profile
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;