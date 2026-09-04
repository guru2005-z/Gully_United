import React from 'react';
import { Zap, Shield, Trophy, Car, Users, Droplets, Home, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacilitiesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FFF00]/10 border border-[#8FFF00]/30 text-[#8FFF00] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Sports & Entertainment Hub
        </div>
        <h1 className="text-4xl font-extrabold text-white font-['Outfit']">
          GULLY UNITED XLV <span className="text-[#8FFF00]">TURF AMENITIES</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Located on SC Boys Residential School Road, Kota. Built with 100x50ft Astro Turf, 14 LED Floodlights & complete player facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 border-t-4 border-t-[#8FFF00] space-y-3">
          <Trophy className="w-8 h-8 text-[#8FFF00]" />
          <h3 className="text-xl font-bold text-white font-['Outfit']">100 x 50 FT Astro Turf</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            High-density artificial turf grass with shock-absorbing underlay. Designed for optimal ball bounce, fast runs, and player safety.
          </p>
        </div>

        <div className="glass-panel p-6 border-t-4 border-t-emerald-400 space-y-3">
          <Zap className="w-8 h-8 text-emerald-400" />
          <h3 className="text-xl font-bold text-white font-['Outfit']">14 LED Floodlights</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Stadium-grade 14 LED floodlight towers providing shadowless light across the entire 100x50ft pitch for night matches (5pm-11pm).
          </p>
        </div>

        <div className="glass-panel p-6 border-t-4 border-t-amber-400 space-y-3">
          <Users className="w-8 h-8 text-amber-400" />
          <h3 className="text-xl font-bold text-white font-['Outfit']">Max 16 Players Capacity</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Ideal for 6v6, 7v7, or 8v8 box cricket matches, team friendlies, and weekend tournament leagues.
          </p>
        </div>
      </div>

      <div className="glass-panel-neon p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white font-['Outfit'] text-center">
          ALL AMENITIES INCLUDED FREE WITH EVERY SLOT
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Car className="w-6 h-6 text-[#8FFF00] shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Vehicle Parking Area</h4>
              <p className="text-slate-400">Dedicated spacious parking for bikes and cars right next to the ground.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Home className="w-6 h-6 text-[#8FFF00] shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Changing Rooms & Washroom</h4>
              <p className="text-slate-400">Clean, hygienic changing rooms and modern washroom facilities for players.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Droplets className="w-6 h-6 text-[#8FFF00] shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Chilled Drinking Water</h4>
              <p className="text-slate-400">Fresh chilled drinking water dispenser available continuously for all teams.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Users className="w-6 h-6 text-[#8FFF00] shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Player Seating Area</h4>
              <p className="text-slate-400">Shaded team dugout benches and spectator seating around the perimeter.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Shield className="w-6 h-6 text-[#8FFF00] shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Bats, Balls & Stumps Included</h4>
              <p className="text-slate-400">Top-quality wooden box bats, heavy tennis balls, and stumps provided free.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Clock className="w-6 h-6 text-[#8FFF00] shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm">Operating Hours (6am - 11pm)</h4>
              <p className="text-slate-400">Open Mon-Sun 6:00 AM to 11:00 PM with 1-hour slots & 7-day advance booking.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="text-center pt-4">
        <Link to="/book" className="btn-neon text-xs py-3.5 px-8 font-extrabold">
          Check Available Slots & Book Now (From ₹299/hr)
        </Link>
      </div>

    </div>
  );
};
