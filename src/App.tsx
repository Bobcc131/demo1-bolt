import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';
import AdminDashboard from './components/admin/AdminDashboard';
import AuthModal from './components/auth/AuthModal';

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar
          onLoginClick={() => setIsAuthModalOpen(true)}
          isAuthenticated={isAuthenticated}
          onLogout={() => {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <About />
                <Contact />
              </>
            }
          />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          {isAuthenticated && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
        </Routes>
        <Footer />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </Router>
  );
};

export default App;