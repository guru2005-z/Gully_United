import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Ticket, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#090c12]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-xl border border-[#8FFF00]/40 shadow-[0_0_15px_rgba(143,255,0,0.3)] group-hover:scale-105 transition-transform bg-black">
              <img src="/logo1.jpeg" alt="Gully United Logo" className="h-12 w-auto object-contain" />
            </div>
            <div>
              <p className="text-[10px] text-[#8FFF00] tracking-widest font-semibold uppercase">Kota • Nellore • AP</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/') ? 'text-[#8FFF00] bg-[#8FFF00]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/about') ? 'text-[#8FFF00] bg-[#8FFF00]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </Link>
            <Link
              to="/facilities"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/facilities') ? 'text-[#8FFF00] bg-[#8FFF00]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Facilities
            </Link>
            <Link
              to="/gallery"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/gallery') ? 'text-[#8FFF00] bg-[#8FFF00]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/book"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/book') ? 'text-[#8FFF00] bg-[#8FFF00]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#8FFF00]" />
              Book Slot
            </Link>
            <Link
              to="/my-bookings"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/my-bookings') ? 'text-[#8FFF00] bg-[#8FFF00]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Ticket className="w-4 h-4 text-emerald-400" />
              My Bookings
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/contact') ? 'text-[#8FFF00] bg-[#8FFF00]/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {localStorage.getItem('gully_auth_token') || localStorage.getItem('gully_customer_phone') ? (
              <button
                onClick={() => {
                  localStorage.removeItem('gully_auth_token');
                  localStorage.removeItem('gully_customer_name');
                  localStorage.removeItem('gully_customer_phone');
                  localStorage.removeItem('gully_customer_email');
                  window.location.href = '/login';
                }}
                className="px-3 py-2 rounded-lg text-xs font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 py-2 rounded-lg text-xs font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-[#8FFF00]/40 transition-all">
                Login
              </Link>
            )}
            <Link to="/book" className="btn-neon text-xs py-2.5 px-4">
              <Sparkles className="w-4 h-4 fill-black" />
              Book Turf
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/book" className="btn-neon text-[11px] py-2 px-3">
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e131f] border-b border-white/10 px-4 pt-2 pb-6 space-y-3 text-sm font-medium">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-white">Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-white">About</Link>
          <Link to="/facilities" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-white">Facilities</Link>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-white">Gallery</Link>
          <Link to="/book" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-[#8FFF00]">Book Time Slot</Link>
          <Link to="/my-bookings" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-emerald-400">My Bookings</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-white">Contact Us</Link>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-400">Login / Staff Access</Link>
        </div>
      )}
    </nav>
  );
};
