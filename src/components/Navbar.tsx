import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Github, Twitter, LogOut } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Navbar({ onLoginClick, isAuthenticated, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 font-bold text-2xl">
            Innovate<span className="text-blue-600">Hub</span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                to="/"
                className={`hover:text-blue-600 transition-colors ${
                  location.pathname === '/' ? 'text-blue-600' : ''
                }`}
              >
                Home
              </Link>
              <a href="/#features" className="hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="/#about" className="hover:text-blue-600 transition-colors">
                About
              </a>
              <Link
                to="/blog"
                className={`hover:text-blue-600 transition-colors ${
                  location.pathname.includes('/blog') ? 'text-blue-600' : ''
                }`}
              >
                Blog
              </Link>
              <a href="/#contact" className="hover:text-blue-600 transition-colors">
                Contact
              </a>
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className={`hover:text-blue-600 transition-colors ${
                    location.pathname === '/admin' ? 'text-blue-600' : ''
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center space-x-4">
                <Github className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link to="/" className="block px-3 py-2 hover:text-blue-600">
            Home
          </Link>
          <a href="/#features" className="block px-3 py-2 hover:text-blue-600">
            Features
          </a>
          <a href="/#about" className="block px-3 py-2 hover:text-blue-600">
            About
          </a>
          <Link to="/blog" className="block px-3 py-2 hover:text-blue-600">
            Blog
          </Link>
          <a href="/#contact" className="block px-3 py-2 hover:text-blue-600">
            Contact
          </a>
          {isAuthenticated && (
            <Link to="/admin" className="block px-3 py-2 hover:text-blue-600">
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="block w-full text-left px-3 py-2 text-blue-600 hover:text-blue-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}