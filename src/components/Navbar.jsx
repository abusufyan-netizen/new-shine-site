import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Shirt, Phone } from 'lucide-react';

const Navbar = () => {
  const { isDark, setIsDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '/price-estimate' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 px-6 py-4 ${
        isScrolled 
          ? 'mt-4 mx-auto max-w-5xl rounded-2xl bg-white/70 dark:bg-card/70 backdrop-blur-xl border border-border shadow-lg' 
          : 'bg-transparent mt-0'
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* 1. Logo Section */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl text-white group-hover:rotate-12 transition-transform duration-300">
            <Shirt size={24} fill="currentColor" />
          </div>
          <span className="text-xl font-black tracking-tighter text-text">
            NEW <span className="text-primary">SHINE</span>
          </span>
        </a>

        {/* 2. Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-text-muted hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* 3. Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-surface-soft border border-border text-text hover:border-primary transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* CTA Button */}
          <a 
            href="tel:+923264500909"
            className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Phone size={18} />
            <span className="text-sm">Call Now</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2.5 text-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 overflow-hidden bg-card rounded-2xl border border-border"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-text hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-border" />
              <a href="tel:+923264500909" className="flex items-center gap-3 text-primary font-bold">
                <Phone size={20} /> +92 326 4500909
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;