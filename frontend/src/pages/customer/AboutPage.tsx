import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-[#8FFF00]/10 border border-[#8FFF00]/30 text-[#8FFF00] text-xs font-extrabold uppercase tracking-wider">
          Sports & Entertainment Hub
        </span>
        <h1 className="text-4xl font-extrabold text-white font-['Outfit']">
          ABOUT GULLY UNITED <span className="text-[#8FFF00]">XLV</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Kota's premier box cricket turf arena managed by Panabaka Pradeep. Designed for high-octane 6v6 to 8v8 matches under 14 LED floodlight towers.
        </p>
      </div>

      <div className="glass-panel-neon p-6 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-black text-white font-['Outfit']">
              OUR MISSION & TURF INFRASTRUCTURE
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Gully United XLV was established to provide Kota and surrounding Nellore areas with a top-grade sports and entertainment hub. Featuring a 100x50ft Astro artificial turf pitch, players enjoy true ball bounce, injury reduction, and non-stop action.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Whether playing early morning matches at ₹299/hr or night floodlight matches at ₹499/hr, every booking includes free wooden bats, tennis balls, stumps, vehicle parking, changing rooms, and chilled drinking water.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8FFF00]" />
                <span>100 x 50 FT Astro Turf</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8FFF00]" />
                <span>14 LED High Floodlights</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8FFF00]" />
                <span>Max 16 Players Capacity</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8FFF00]" />
                <span>Mon-Sun 6:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 glass-panel p-6 space-y-4 text-xs">
            <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#8FFF00]" /> Quick Turf Details
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400">Ground Name:</span>
                <strong className="text-white">Gully United XLV</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400">Address:</span>
                <strong className="text-white text-right">SC Boys Residential School Road, Kota</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400">Management:</span>
                <strong className="text-[#8FFF00]">Panabaka Pradeep</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400">Day Price (6am-5pm):</span>
                <strong className="text-[#8FFF00]">₹299 / Hour</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400">Night Price (5pm-11pm):</span>
                <strong className="text-amber-400">₹499 / Hour</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-slate-400">Bookings:</span>
                <strong className="text-white">Online, Call or WhatsApp (+91 93908 17811)</strong>
              </div>
            </div>

            <Link to="/book" className="btn-neon w-full py-3 text-center text-xs block font-bold mt-2">
              Book Time Slot Now
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};
