import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, ExternalLink, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-soft border-t border-border pt-16 pb-8 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Backlinks */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-primary tracking-tighter">NEW SHINE</h3>
            <p className="text-text-muted leading-relaxed">
              Redefining garment care in Lahore with premium technology and eco-friendly processes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-primary hover:border-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-primary hover:border-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-primary hover:border-primary transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-lg font-bold text-text mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Price Estimator'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-text-muted hover:text-primary flex items-center gap-2 group transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Real-time Location */}
          <div>
            <h4 className="text-lg font-bold text-text mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-text-muted">
                <MapPin className="text-primary shrink-0" size={20} />
                <a 
                  href="https://maps.google.com/?q=Babu+Mehar+Town+Lahore" 
                  target="_blank" 
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  Main Market, Babu Mehar Town, Lahore <ExternalLink size={14} />
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-muted">
                <Phone className="text-primary shrink-0" size={20} />
                <a href="tel:+923264500909" className="hover:text-primary transition-colors">+92 326 4500909</a>
              </li>
              <li className="flex items-center gap-3 text-text-muted">
                <Mail className="text-primary shrink-0" size={20} />
                <a href="mailto:info@newshine.com" className="hover:text-primary transition-colors">info@newshine.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Status */}
          <div>
            <h4 className="text-lg font-bold text-text mb-6">Business Hours</h4>
            <div className="space-y-3 bg-surface p-5 rounded-2xl border border-border">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Mon - Sat:</span>
                <span className="text-text font-bold">9:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Friday Break:</span>
                <span className="text-text font-bold">1:00 PM - 3:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Sunday:</span>
                <span className="text-red-500 font-bold tracking-tight">Closed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-sm text-center md:text-left">
            © {currentYear} <span className="text-text font-bold">New Shine Clean & Press</span>. 
            All rights reserved. Designed for excellence.
          </p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-text-muted hover:text-primary text-sm font-bold transition-colors"
            >
              Back to top 
              <ArrowUpCircle className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;