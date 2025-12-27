import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = () => {
    setIsMobileMenuOpen(false);
    if (searchTerm && location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const navLinks = [
    { to: '/', label: 'Home', onClick: () => { setSearchTerm(''); setIsMobileMenuOpen(false); } },
    { to: '/blog', label: 'Blog', onClick: () => setIsMobileMenuOpen(false) },
    { to: '/about', label: 'About', onClick: () => setIsMobileMenuOpen(false) }
  ];

  const NavLink = ({ to, label, onClick, mobile = false }) => (
    <Link 
      to={to}
      onClick={onClick}
      className={`relative font-medium transition-all duration-200 group ${
        mobile 
          ? 'block px-3 py-3 text-white hover:text-red-400 hover:bg-white/5 rounded-lg' 
          : 'text-gray-300 hover:text-white px-3 py-2'
      }`}
    >
      {label}
      {!mobile && (
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-200 group-hover:w-full" />
      )}
    </Link>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md shadow-2xl' 
        : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Brand */}
          <Link 
            to="/" 
            onClick={() => { setSearchTerm(''); setIsMobileMenuOpen(false); }}
            className="flex items-center space-x-2 sm:space-x-3 transition-transform duration-200 hover:scale-105"
          >
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              CinemaSphere
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </div>
          
          {/* Search & Auth */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Bar - Hidden on mobile */}
            <div className={`relative transition-all duration-300 ${
              isFocused ? 'w-64 sm:w-80' : 'w-48 sm:w-64'
            } hidden sm:block`}>
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 hover:bg-white/15 text-sm sm:text-base"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-8 sm:right-12 pr-2 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Auth Section */}
            <SignedOut>
              <SignInButton 
                mode="modal"
                appearance={{
                  elements: {
                    modalContent: "bg-gray-800 border border-gray-700",
                    headerTitle: "text-white",
                    headerSubtitle: "text-gray-300",
                    socialButtonsBlockButton: "text-white border-gray-600 hover:bg-gray-700",
                    socialButtonsBlockButtonText: "text-white",
                    formFieldLabel: "text-white",
                    formFieldInput: "bg-gray-700 border-gray-600 text-white",
                    footerActionText: "text-gray-300",
                    footerActionLink: "text-white"
                  }
                }}
              >
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-600/25 hover:scale-105 text-sm sm:text-base">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Link 
                to="/profile" 
                className="hidden sm:block text-white hover:text-gray-300 transition-colors duration-200 font-medium"
              >
                Profile
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-gray-800 border border-gray-700",
                    userButtonPopoverText: "text-white",
                    userButtonPopoverActionButton: "text-white hover:bg-gray-700",
                    userButtonPopoverActionButtonText: "text-white"
                  }
                }}
              />
            </SignedIn>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative p-3 rounded-xl bg-transparent text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gradient-to-b from-black/95 via-slate-900/95 to-black/95 backdrop-blur-xl rounded-b-3xl border-t border-gradient-to-r from-red-600/30 to-orange-600/30 shadow-2xl">
            <div className="px-6 py-8 space-y-6">
              
              {/* Mobile Search */}
              <div className="mb-8">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-14 pr-20 py-4 bg-transparent from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 hover:bg-white/15 text-lg shadow-lg focus:shadow-xl"
                  />
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={handleSearchSubmit}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-red-400 transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-full bg-red-600/20 hover:bg-red-600/40 border border-red-600/30 hover:border-red-600/50 transition-all duration-300 hover:scale-110">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </button>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-16 pr-2 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <div className="p-1.5 rounded-full hover:bg-white/10 transition-all duration-300">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={link.onClick}
                    className="group flex items-center px-5 py-4 text-white hover:text-red-400 bg-gradient-to-r from-white/5 to-transparent hover:from-red-600/10 hover:to-orange-600/10 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-red-600/30 backdrop-blur-sm shadow-lg hover:shadow-xl"
                  >
                    <div className="w-10 h-10 mr-4 rounded-xl bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-red-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {index === 0 && <span className="text-red-400 text-xl">🏠</span>}
                      {index === 1 && <span className="text-orange-400 text-xl">📝</span>}
                      {index === 2 && <span className="text-yellow-400 text-xl">ℹ️</span>}
                    </div>
                    <span className="text-lg font-semibold flex-1">{link.label}</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transform group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
              
              {/* Mobile Profile Link */}
              <SignedIn>
                <Link 
                  to="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center px-5 py-4 text-white hover:text-red-400 bg-gradient-to-r from-white/5 to-transparent hover:from-blue-600/10 hover:to-purple-600/10 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-blue-600/30 backdrop-blur-sm shadow-lg hover:shadow-xl"
                >
                  <div className="w-10 h-10 mr-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-blue-400 text-xl">👤</span>
                  </div>
                  <span className="text-lg font-semibold flex-1">Profile</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </SignedIn>

              {/* Decorative Bottom Border */}
              <div className="pt-4 mt-6 border-t border-gradient-to-r from-transparent via-white/20 to-transparent">
                <div className="flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;