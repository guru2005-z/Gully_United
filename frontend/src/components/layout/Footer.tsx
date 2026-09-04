import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUpRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06080d] border-t border-white/10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo1.jpeg" alt="Gully United XLV Logo" className="h-12 w-auto object-contain rounded-lg border border-[#8FFF00]/30" />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Gully United XLV is Kota's premier sports and entertainment hub. 100x50ft Astro Turf, 14 LED floodlights, max 16 players, Mon-Sun 6am to 11pm.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <p className="text-slate-400 flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-[#8FFF00]" /> Turf Management:
              </p>
              <p className="text-white font-bold">Panabaka Pradeep</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-['Outfit'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8FFF00]"></span>
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/" className="hover:text-[#8FFF00] transition-colors">Home Page</Link></li>
              <li><Link to="/book" className="hover:text-[#8FFF00] transition-colors">Check Available Slots (From ₹299/hr)</Link></li>
              <li><Link to="/my-bookings" className="hover:text-[#8FFF00] transition-colors">View My Bookings & QR</Link></li>
              <li><Link to="/facilities" className="hover:text-[#8FFF00] transition-colors">Turf Amenities & Specs</Link></li>
              <li><Link to="/contact" className="hover:text-[#8FFF00] transition-colors">Contact Turf Management</Link></li>
              <li><Link to="/login" className="hover:text-[#8FFF00] transition-colors">Staff / Admin Login</Link></li>
            </ul>
          </div>

          {/* Turf Address & Directions */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-['Outfit'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8FFF00]"></span>
              Turf Location
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8FFF00] shrink-0 mt-0.5" />
                <span>Gully United XLV Turf, SC Boys Residential School Road, Kota Town, Nellore District, Andhra Pradesh - 524411</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8FFF00] shrink-0" />
                <span>Open Mon - Sun: 06:00 AM – 11:00 PM</span>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kota+Nellore+Andhra+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#8FFF00] font-bold hover:underline pt-1"
                >
                  Get Google Maps Directions <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Owner Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-['Outfit'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8FFF00]"></span>
              Support & Bookings
            </h4>
            <ul className="space-y-3 text-xs mb-4">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8FFF00]" />
                <a href="tel:+919390817811" className="hover:text-white transition-colors font-bold text-slate-200">+91 93908 17811 (Call / WhatsApp)</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8FFF00]" />
                <a href="mailto:Gullyunitedxlv@gmail.com" className="hover:text-white transition-colors text-slate-300">Gullyunitedxlv@gmail.com</a>
              </li>
            </ul>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-[11px]">
              <ShieldCheck className="w-6 h-6 text-[#8FFF00] shrink-0" />
              <span>Online, Call or WhatsApp Reservation Supported.</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Gully United XLV Cricket Turf, Kota. Managed by Panabaka Pradeep.</p>
          <p className="flex items-center gap-4">
            <span className="hover:text-slate-400 font-semibold text-[#8FFF00]">Day: ₹299/hr</span>
            <span>•</span>
            <span className="hover:text-slate-400 font-semibold text-amber-400">Night: ₹499/hr</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
