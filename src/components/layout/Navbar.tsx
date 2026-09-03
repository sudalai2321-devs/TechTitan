import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronRight, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Association', path: '/association' },
    { name: 'Queries', path: '/queries' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "theme-navbar border-b py-3" : "bg-transparent py-5"
    )} style={{ borderColor: scrolled ? 'var(--border-color)' : 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_var(--shadow-glow)] bg-white overflow-hidden border border-brand-blue/30">
              <img src={logoImg} alt="Tech Titans Logo" className="w-full h-full object-cover scale-105" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>TECH TITANS</h1>
              <p className="text-[10px] text-brand-blue tracking-[0.2em] font-medium uppercase hidden sm:block">Create • Code • Conquer</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue",
                  location.pathname === link.path ? "text-brand-blue drop-shadow-[0_0_8px_rgba(0,151,255,0.5)]" : ""
                )}
                style={{ color: location.pathname === link.path ? undefined : 'var(--text-secondary)' }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all hover:bg-brand-blue/10 border"
              style={{ borderColor: 'var(--border-color)' }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: [1, 0.8, 1] }}
                transition={{ duration: 0.4 }}
              >
                {isDark ? <Sun size={18} className="text-brand-gold" /> : <Moon size={18} className="text-brand-blue" />}
              </motion.div>
            </button>
            
            {user ? (
              <div className="flex items-center gap-4 ml-2">
                <Link to="/profile" className="flex items-center gap-2 text-sm transition-colors group" style={{ color: 'var(--text-secondary)' }}>
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:border-brand-blue/50 group-hover:bg-brand-blue/10 transition-all" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}>
                    <User size={16} />
                  </div>
                  <span className="hidden lg:block">{user.name.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 text-brand-red hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all"
              style={{ color: 'var(--text-secondary)' }}
            >
              {isDark ? <Sun size={20} className="text-brand-gold" /> : <Moon size={20} className="text-brand-blue" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-color)' }}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-lg text-base font-medium flex items-center justify-between",
                    location.pathname === link.path ? "bg-brand-blue/20 text-brand-blue" : ""
                  )}
                  style={{ color: location.pathname === link.path ? undefined : 'var(--text-secondary)' }}
                >
                  {link.name}
                  <ChevronRight size={16} style={{ color: location.pathname === link.path ? undefined : 'var(--text-muted)' }} />
                </Link>
              ))}
              
              {user && (
                <>
                  <div className="h-px my-4" style={{ backgroundColor: 'var(--border-color)' }} />
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 rounded-lg text-base font-medium flex items-center justify-between"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <div className="flex items-center gap-3">
                      <User size={18} />
                      My Profile
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-brand-red hover:bg-brand-red/10 flex items-center gap-3"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
